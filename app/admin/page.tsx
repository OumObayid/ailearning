'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CourseService } from '@/services/courseService';
import { Icon } from '@/components/common/Icon';
import { AuthModal } from '@/components/auth/AuthModal';
import { cn } from '@/lib/utils';

type AdminTab = 'overview' | 'users' | 'exams' | 'settings' | 'courses';

interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  totalStudents: number;
  totalAttempts: number;
  passedAttempts: number;
  passRate: number;
  avgScore: number;
  avgTimeSpent: number;
}

interface CourseStat {
  courseId: string;
  totalAttempts: number;
  passedAttempts: number;
  avgScore: number;
  passRate: number;
}

interface ActivityItem {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  courseId: string;
  moduleId: string;
  score: number;
  passed: boolean;
  timeSpentSeconds: number;
  createdAt: string;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string | null;
  createdAt: string;
  totalExams: number;
  passedExams: number;
  lastExamAt: string | null;
}

interface AdminExamItem {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  userRole?: string;
  courseId: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  passed: boolean;
  timeSpentSeconds: number;
  createdAt: string;
}

const COURSE_META: Record<string, { label: string; badge: string; color: string; border: string }> = {
  'ai-engineering': {
    label: 'AI Engineering',
    badge: 'bg-blue-100 text-blue-900 border-blue-200',
    color: 'bg-blue-500',
    border: 'border-blue-300',
  },
  'backend-ia': {
    label: 'Backend IA',
    badge: 'bg-amber-100 text-amber-950 border-amber-300',
    color: 'bg-amber-500',
    border: 'border-amber-400',
  },
  'prompt-engineering-ide': {
    label: 'Prompt Engineering IDE',
    badge: 'bg-purple-100 text-purple-950 border-purple-200',
    color: 'bg-purple-500',
    border: 'border-purple-300',
  },
  'debugging': {
    label: 'Ingénierie du Débogage',
    badge: 'bg-lime-100 text-lime-950 border-lime-300',
    color: 'bg-lime-500',
    border: 'border-lime-300',
  },
};

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return 'Moins d’1 min';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} s`;
  if (secs === 0) return `${mins} min`;
  return `${mins} min ${secs} s`;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

function formatShortDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function getModuleTitle(courseId: string, moduleId: string): string {
  const norm = moduleId.startsWith('module-') ? moduleId : `module-${moduleId}`;
  const internalId =
    courseId === 'prompt-engineering-ide'
      ? `prompt-engineering-${norm}`
      : courseId === 'backend-ia'
        ? `backend-ia-${norm}`
        : courseId === 'debugging'
          ? `debugging-${norm}`
          : norm;
  const mod = CourseService.getModuleById(internalId);
  return mod ? `Module ${mod.order} : ${mod.title}` : norm.toUpperCase();
}

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as AdminTab | null;

  const { user, isLoading: authLoading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const VALID_TABS: AdminTab[] = ['overview', 'users', 'exams', 'courses', 'settings'];
  const activeTab: AdminTab = tabParam && VALID_TABS.includes(tabParam) ? tabParam : 'overview';

  const handleSelectTab = (tab: AdminTab) => {
    router.replace(`/admin?tab=${tab}`, { scroll: false });
  };

  // État Stats
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [courseStats, setCourseStats] = useState<CourseStat[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  // État Utilisateurs
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'admin' | 'student'>('all');

  // État Examens
  const [exams, setExams] = useState<AdminExamItem[]>([]);
  const [examsLoading, setExamsLoading] = useState(false);
  const [examSearch, setExamSearch] = useState('');
  const [examCourseFilter, setExamCourseFilter] = useState<string>('all');
  const [examStatusFilter, setExamStatusFilter] = useState<'all' | 'passed' | 'failed'>('all');

  // État Paramètres
  const [settings, setSettings] = useState({
    default_passing_score: '80',
    default_duration_minutes: '40',
    max_anti_cheat_strikes: '3',
    maintenance_mode: 'false',
  });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState('');

  // Notification d'action globale
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modales Utilisateur (Voir & Modifier)
  const [viewingUser, setViewingUser] = useState<AdminUser | null>(null);
  const [userExamsList, setUserExamsList] = useState<AdminExamItem[]>([]);
  const [userExamsLoading, setUserExamsLoading] = useState(false);

  // Modale Examen (Voir détails complets)
  const [viewingExam, setViewingExam] = useState<AdminExamItem | null>(null);

  const [editingUser, setEditingUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string;
    password?: string;
  } | null>(null);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // Modale de Confirmation personnalisée (remplaçant window.confirm)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    details?: string;
    confirmLabel?: string;
    variant?: 'danger' | 'warning';
    onConfirm: () => void | Promise<void>;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  // Fermeture des modales par la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (confirmModal.isOpen) {
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        } else if (viewingExam) {
          setViewingExam(null);
        } else if (editingUser) {
          setEditingUser(null);
        } else if (viewingUser) {
          setViewingUser(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmModal.isOpen, viewingExam, editingUser, viewingUser]);

  // 1. Chargement des statistiques
  const fetchStats = useCallback(async () => {
    if (!user || user.role !== 'admin') return;
    try {
      const res = await fetch('/api/admin/stats', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setCourseStats(data.courseStats || []);
        setRecentActivity(data.recentActivity || []);
        if (data.systemSettings) {
          setSettings(data.systemSettings);
        }
      }
    } catch (err) {
      console.error('Erreur chargement stats admin:', err);
    } finally {
      setStatsLoading(false);
    }
  }, [user]);

  // 2. Chargement des utilisateurs
  const fetchUsers = useCallback(async () => {
    if (!user || user.role !== 'admin') return;
    try {
      const res = await fetch('/api/admin/users', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Erreur chargement utilisateurs admin:', err);
    } finally {
      setUsersLoading(false);
    }
  }, [user]);

  // 3. Chargement des examens
  const fetchExams = useCallback(async () => {
    if (!user || user.role !== 'admin') return;
    try {
      const params = new URLSearchParams();
      if (examCourseFilter !== 'all') params.set('courseId', examCourseFilter);
      if (examStatusFilter !== 'all') params.set('status', examStatusFilter);
      if (examSearch.trim()) params.set('search', examSearch.trim());

      const res = await fetch(`/api/admin/exams?${params.toString()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setExams(data.exams || []);
      }
    } catch (err) {
      console.error('Erreur chargement examens admin:', err);
    } finally {
      setExamsLoading(false);
    }
  }, [user, examCourseFilter, examStatusFilter, examSearch]);

  // 4. Chargement des paramètres système
  const fetchSettings = useCallback(async () => {
    if (!user || user.role !== 'admin') return;
    try {
      const res = await fetch('/api/admin/settings', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      }
    } catch (err) {
      console.error('Erreur chargement paramètres:', err);
    } finally {
      setSettingsLoading(false);
    }
  }, [user]);

  const handleRefreshStats = () => {
    setStatsLoading(true);
    void fetchStats();
  };

  const handleRefreshUsers = () => {
    setUsersLoading(true);
    void fetchUsers();
  };

  const handleRefreshExams = () => {
    setExamsLoading(true);
    void fetchExams();
  };

  const handleRefreshSettings = () => {
    setSettingsLoading(true);
    void fetchSettings();
  };

  useEffect(() => {
    let ignore = false;
    if (user && user.role === 'admin') {
      fetch('/api/admin/stats', { cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!ignore && data) {
            setStats(data.stats);
            setCourseStats(data.courseStats || []);
            setRecentActivity(data.recentActivity || []);
            if (data.systemSettings) {
              setSettings(data.systemSettings);
            }
          }
        })
        .catch((err) => console.error('Erreur chargement stats admin:', err))
        .finally(() => {
          if (!ignore) setStatsLoading(false);
        });
    }
    return () => {
      ignore = true;
    };
  }, [user]);

  useEffect(() => {
    let ignore = false;
    if (!user || user.role !== 'admin') return;

    if (activeTab === 'users') {
      fetch('/api/admin/users', { cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!ignore && data) setUsers(data.users || []);
        })
        .catch((err) => console.error('Erreur chargement utilisateurs admin:', err))
        .finally(() => {
          if (!ignore) setUsersLoading(false);
        });
    } else if (activeTab === 'exams') {
      const params = new URLSearchParams();
      if (examCourseFilter !== 'all') params.set('courseId', examCourseFilter);
      if (examStatusFilter !== 'all') params.set('status', examStatusFilter);
      if (examSearch.trim()) params.set('search', examSearch.trim());

      fetch(`/api/admin/exams?${params.toString()}`, { cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!ignore && data) setExams(data.exams || []);
        })
        .catch((err) => console.error('Erreur chargement examens admin:', err))
        .finally(() => {
          if (!ignore) setExamsLoading(false);
        });
    } else if (activeTab === 'settings') {
      fetch('/api/admin/settings', { cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!ignore && data?.settings) setSettings(data.settings);
        })
        .catch((err) => console.error('Erreur chargement paramètres:', err))
        .finally(() => {
          if (!ignore) setSettingsLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, [activeTab, user, examCourseFilter, examStatusFilter, examSearch]);

  // Action utilisateur : Changement de Rôle avec confirmation personnalisée
  const handleRoleChange = (targetUser: AdminUser, newRole: string) => {
    if (targetUser.role === newRole) return;
    if (user?.id === targetUser.id) {
      showNotification('Vous ne pouvez pas modifier votre propre rôle.', 'error');
      return;
    }

    const roleName = newRole === 'admin' ? 'Administrateur' : 'Étudiant';
    const actionVerb = newRole === 'admin' ? 'promouvoir' : 'rétrograder';

    setConfirmModal({
      isOpen: true,
      title: 'Confirmer le changement de rôle',
      message: `Voulez-vous vraiment ${actionVerb} ${targetUser.name} au rang de ${roleName} ?`,
      details:
        newRole === 'admin'
          ? 'Ce compte aura un accès complet au panneau de gestion et à la supervision.'
          : 'Ce compte perdra tous les privilèges d’accès à la console d’administration.',
      confirmLabel: `Changer en ${roleName}`,
      variant: 'warning',
      onConfirm: async () => {
        try {
          const res = await fetch('/api/admin/users', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: targetUser.id, role: newRole }),
          });
          const data = await res.json();
          if (res.ok) {
            showNotification(data.message || `Rôle changé en ${roleName}.`);
            fetchUsers();
            fetchStats();
          } else {
            showNotification(data.error || 'Erreur mise à jour rôle.', 'error');
          }
        } catch {
          showNotification('Erreur réseau.', 'error');
        } finally {
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  // Action utilisateur : Supprimer compte avec confirmation personnalisée
  const handleDeleteUser = (targetUser: AdminUser) => {
    if (user?.id === targetUser.id) {
      showNotification('Vous ne pouvez pas supprimer votre propre compte.', 'error');
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Supprimer définitivement le compte',
      message: `Êtes-vous sûr de vouloir supprimer le compte de ${targetUser.name} (${targetUser.email}) ?`,
      details: 'Cette action est irréversible. Toutes ses tentatives d’examen et données associées seront définitivement supprimées.',
      confirmLabel: 'Supprimer le compte',
      variant: 'danger',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/users?id=${targetUser.id}`, { method: 'DELETE' });
          const data = await res.json();
          if (res.ok) {
            showNotification(data.message || 'Utilisateur supprimé.');
            fetchUsers();
            fetchStats();
          } else {
            showNotification(data.error || 'Erreur suppression.', 'error');
          }
        } catch {
          showNotification('Erreur réseau.', 'error');
        } finally {
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  // Action utilisateur : Voir profil et historique
  const handleViewUser = async (targetUser: AdminUser) => {
    setViewingUser(targetUser);
    setUserExamsLoading(true);
    setUserExamsList([]);
    try {
      const res = await fetch(`/api/admin/exams?userId=${targetUser.id}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const exams: AdminExamItem[] = data.exams || [];
        setUserExamsList(exams);
        const realPassedCount = exams.filter((e) => e.score >= 80).length;
        setViewingUser((prev) =>
          prev ? { ...prev, totalExams: exams.length, passedExams: realPassedCount } : null
        );
      }
    } catch (err) {
      console.error('Erreur chargement examens utilisateur:', err);
    } finally {
      setUserExamsLoading(false);
    }
  };

  // Action utilisateur : Modifier profil
  const handleEditUser = (targetUser: AdminUser) => {
    setEditingUser({
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
      role: targetUser.role,
      password: '',
    });
    setShowEditPassword(false);
  };

  // Action utilisateur : Enregistrer modification
  const handleSaveEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (editingUser.password && editingUser.password.trim().length > 0 && editingUser.password.trim().length < 6) {
      showNotification('Le mot de passe doit comporter au moins 6 caractères.', 'error');
      return;
    }
    setEditLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: editingUser.id,
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
          ...(editingUser.password && editingUser.password.trim().length > 0
            ? { password: editingUser.password.trim() }
            : {}),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(data.message || 'Utilisateur modifié avec succès.');
        setEditingUser(null);
        fetchUsers();
        fetchStats();
      } else {
        showNotification(data.error || 'Erreur lors de la modification.', 'error');
      }
    } catch {
      showNotification('Erreur réseau.', 'error');
    } finally {
      setEditLoading(false);
    }
  };

  // Action examen : Supprimer tentative avec confirmation personnalisée
  const handleDeleteExam = (examId: number) => {
    setConfirmModal({
      isOpen: true,
      title: 'Supprimer l’épreuve',
      message: 'Voulez-vous supprimer définitivement cet enregistrement d’examen ?',
      details: 'Cette épreuve sera retirée des statistiques et de l’historique du candidat.',
      confirmLabel: 'Supprimer',
      variant: 'danger',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/exams?id=${examId}`, { method: 'DELETE' });
          const data = await res.json();
          if (res.ok) {
            showNotification(data.message || 'Tentative supprimée.');
            fetchExams();
            fetchStats();
          } else {
            showNotification(data.error || 'Erreur suppression.', 'error');
          }
        } catch {
          showNotification('Erreur réseau.', 'error');
        } finally {
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  // Action paramètres : Sauvegarde
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSavedMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (res.ok) {
        setSettingsSavedMessage('✓ Paramètres enregistrés avec succès.');
        showNotification('Paramètres système mis à jour.');
      } else {
        showNotification(data.error || 'Erreur enregistrement.', 'error');
      }
    } catch {
      showNotification('Erreur réseau lors de la sauvegarde.', 'error');
    }
  };

  // Filtrage local utilisateurs
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
      const matchSearch =
        !userSearch.trim() ||
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase());
      return matchRole && matchSearch;
    });
  }, [users, userRoleFilter, userSearch]);

  // Vérification des droits d'accès
  if (authLoading) {
    return (
      <div className="py-20 text-center text-base font-bold text-slate-600">
        Vérification des droits d&apos;accès administratifs...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center text-3xl font-black">
          🛡️
        </div>
        <h1 className="text-2xl font-black text-slate-950">Accès Restreint — Administration</h1>
        <p className="text-base text-slate-700 font-medium">
          Vous devez être authentifié avec un compte administrateur pour accéder à cet espace de supervision.
        </p>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="rounded-xl bg-indigo-700 px-6 py-3 text-sm font-black text-white hover:bg-indigo-800 transition shadow cursor-pointer"
        >
          Se connecter en tant qu&apos;Administrateur
        </button>
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => setAuthModalOpen(false)}
        />
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 mx-auto flex items-center justify-center text-3xl font-black">
          🚫
        </div>
        <h1 className="text-2xl font-black text-rose-950">Accès Refusé (Rôle Étudiant)</h1>
        <p className="text-base text-slate-700 font-medium">
          Votre compte <strong className="text-slate-950">{user.email}</strong> dispose du rôle Étudiant. L&apos;accès au panneau de contrôle est strictement réservé aux administrateurs.
        </p>
        <div className="pt-2">
          <Link
            href="/profil"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition cursor-pointer"
          >
            ← Retour à mon Espace Membre
          </Link>
        </div>
      </div>
    );
  }

  const allCourses = CourseService.getAllCourses();

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto select-text">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl text-sm font-black transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-800 text-white border-2 border-emerald-600'
              : 'bg-rose-800 text-white border-2 border-rose-600'
          }`}
        >
          <span>{notification.type === 'success' ? '✓' : '⚠️'}</span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* ONGLET 1 : VUE D'ENSEMBLE & ANALYTICS                       */}
      {/* ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* En-tête de section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-black text-slate-950 tracking-tight">
                Vue d&apos;Ensemble &amp; Analytique
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Indicateurs de performance globale, taux de réussite et flux d&apos;activité des épreuves en temps réel.
              </p>
            </div>
            <button
              onClick={handleRefreshStats}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
            >
              <span>Actualiser ↻</span>
            </button>
          </div>

          {/* Barre de Statut du Système & Paramètres Actifs */}
          <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold">Plateforme :</span>
                {settings.maintenance_mode === 'true' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    Maintenance Active (Examens suspendus)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Opérationnelle (Examens ouverts)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-bold">Seuil de réussite :</span>
                <span className="font-mono font-black text-white px-2 py-0.5 rounded bg-white/10">
                  {settings.default_passing_score}%
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-bold">Durée épreuve :</span>
                <span className="font-mono font-black text-white px-2 py-0.5 rounded bg-white/10">
                  {settings.default_duration_minutes} min
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-bold">Anti-triche :</span>
                <span className="font-mono font-black text-white px-2 py-0.5 rounded bg-white/10">
                  Max {settings.max_anti_cheat_strikes} alertes
                </span>
              </div>
            </div>

            <button
              onClick={() => handleSelectTab('settings')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black border border-white/20 transition whitespace-nowrap cursor-pointer shrink-0"
            >
              <span>Ajuster les règles →</span>
            </button>
          </div>

          {/* 4 KPIs Clés */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1 : Membres Inscrits */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Membres Inscrits</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-sm">👥</span>
                </div>
                <div className="text-3xl font-black text-slate-950 font-mono">
                  {statsLoading ? '...' : stats?.totalUsers || 0}
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  {stats?.totalStudents || 0} étudiant(s) • {stats?.totalAdmins || 0} admin(s)
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleSelectTab('users')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer flex items-center gap-1"
                >
                  <span>Gérer les membres</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* KPI 2 : Tentatives d'Épreuves */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Tentatives d&apos;Épreuves</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 text-sm">📝</span>
                </div>
                <div className="text-3xl font-black text-slate-950 font-mono">
                  {statsLoading ? '...' : stats?.totalAttempts || 0}
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  Temps moyen : {formatDuration(stats?.avgTimeSpent || 0)}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleSelectTab('exams')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer flex items-center gap-1"
                >
                  <span>Voir les épreuves</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* KPI 3 : Taux de Réussite Global */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Taux de Réussite</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-sm">🎯</span>
                </div>
                <div className="text-3xl font-black text-emerald-700 font-mono">
                  {statsLoading ? '...' : `${stats?.passRate || 0}%`}
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  Moyenne des scores : {stats?.avgScore || 0}%
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 text-xs font-medium text-slate-500">
                Taux global de réussite (score ≥ 80%)
              </div>
            </div>

            {/* KPI 4 : Épreuves Réussies */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Épreuves Réussies</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 text-sm">🏆</span>
                </div>
                <div className="text-3xl font-black text-slate-950 font-mono">
                  {statsLoading ? '...' : stats?.passedAttempts || 0}
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  Seuil de réussite fixé à {settings.default_passing_score}%
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleSelectTab('exams')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer flex items-center gap-1"
                >
                  <span>Inspecter les réussites</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grille : Performance par Cursus & Flux en Direct */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Performance par Cursus */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
                  <span>📊</span>
                  <span>Performances par Cursus</span>
                </h2>
                <button
                  onClick={() => handleSelectTab('courses')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                >
                  Gérer les formations →
                </button>
              </div>

              <div className="space-y-3.5 pt-1">
                {courseStats.map((cs) => {
                  const meta = COURSE_META[cs.courseId] || {
                    label: cs.courseId,
                    badge: 'bg-slate-100 text-slate-800',
                    color: 'bg-slate-500',
                  };
                  return (
                    <div key={cs.courseId} className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between text-sm font-black">
                        <span className="text-slate-950">{meta.label}</span>
                        <span className="text-slate-900 font-mono">
                          {cs.totalAttempts > 0 ? `${cs.passRate}% succès` : '0 épreuve'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${meta.color}`}
                          style={{ width: `${cs.totalAttempts > 0 ? cs.passRate : 0}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                        <span>
                          {cs.totalAttempts} épreuve(s) • {cs.passedAttempts} réussie(s)
                        </span>
                        <span>
                          Score moyen : {cs.totalAttempts > 0 ? `${cs.avgScore}%` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Flux d'activité récent en direct */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
                  <span>⚡</span>
                  <span>Activité Récente en Direct</span>
                </h2>
                <button
                  onClick={() => handleSelectTab('exams')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                >
                  Voir tout l&apos;historique →
                </button>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {recentActivity.length === 0 ? (
                  <div className="py-12 text-center text-sm font-semibold text-slate-500">
                    Aucune épreuve passée pour le moment.
                  </div>
                ) : (
                  recentActivity.map((act) => {
                    const meta = COURSE_META[act.courseId];
                    const moduleTitle = getModuleTitle(act.courseId, act.moduleId);
                    return (
                      <div
                        key={act.id}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 transition flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="min-w-0 space-y-0.5">
                          <div className="font-black text-slate-950 truncate">
                            {act.userName}
                          </div>
                          <div className="text-xs text-slate-700 font-semibold truncate" title={moduleTitle}>
                            {moduleTitle}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                            <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-black border ${meta?.badge || 'bg-slate-200'}`}>
                              {meta?.label || act.courseId}
                            </span>
                            <span>•</span>
                            <span>{formatDate(act.createdAt)}</span>
                            {act.timeSpentSeconds > 0 && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-slate-600">⏱️ {formatDuration(act.timeSpentSeconds)}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-base font-black font-mono text-slate-950">
                            {act.score}%
                          </div>
                          <span
                            className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-full border ${
                              act.score >= 80
                                ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                                : 'bg-amber-100 text-amber-950 border-amber-300'
                            }`}
                          >
                            {act.score >= 80 ? '✓ Réussi' : 'Échoué'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ONGLET 2 : GESTION DES UTILISATEURS                       */}
      {/* ========================================================= */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* En-tête de section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-black text-slate-950 tracking-tight">
                Gestion des Membres &amp; Rôles
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Administration des comptes inscrits ({filteredUsers.length} affichés), modification des permissions et statuts.
              </p>
            </div>
            <button
              onClick={handleRefreshUsers}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
            >
              <span>Actualiser ↻</span>
            </button>
          </div>

          <div className="space-y-6 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            {/* Barre d'outils & filtres */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b-2 border-slate-100 pb-5">
              <span className="text-sm font-bold text-slate-700">Filtrer la liste des comptes :</span>

              <div className="flex flex-wrap items-center gap-3">
                {/* Recherche */}
                <input
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="px-3.5 py-2 text-sm rounded-xl border-2 border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600 font-medium min-w-[220px]"
                />

                {/* Filtre Rôle */}
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value as 'all' | 'admin' | 'student')}
                  className="px-3 py-2 text-sm rounded-xl border-2 border-slate-300 bg-slate-50 focus:outline-none font-bold text-slate-800"
                >
                  <option value="all">Tous les rôles</option>
                  <option value="student">Étudiants uniquement</option>
                  <option value="admin">Administrateurs</option>
                </select>
              </div>
            </div>

          {/* Table Utilisateurs */}
          {usersLoading ? (
            <div className="py-12 text-center text-sm font-bold text-slate-500">
              Chargement des utilisateurs...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-12 text-center text-sm font-bold text-slate-500">
              Aucun utilisateur trouvé selon ces critères.
            </div>
          ) : (
            <div className="w-full overflow-hidden">
              <table className="w-full table-fixed text-left border-collapse text-sm">
                <colgroup>
                  <col className="w-[36%]" />
                  <col className="w-[18%]" />
                  <col className="w-[18%]" />
                  <col className="w-[14%]" />
                  <col className="w-[14%]" />
                </colgroup>
                <thead>
                  <tr className="border-b-2 border-slate-200 text-xs font-black uppercase text-slate-500 tracking-wider">
                    <th className="py-3 px-3">Membre</th>
                    <th className="py-3 px-2">Rôle</th>
                    <th className="py-3 px-2 text-center">Épreuves</th>
                    <th className="py-3 px-2 text-center">Inscription</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredUsers.map((u) => {
                    const isCurrentUser = user.id === u.id;
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition">
                        {/* 1. Membre (Nom & Email sans badge d'avatar) */}
                        <td className="py-3 px-3">
                          <div className="min-w-0 truncate">
                            <div className="font-black text-slate-950 truncate text-sm flex items-center gap-1.5" title={u.name}>
                              <span className="truncate">{u.name}</span>
                              {isCurrentUser && (
                                <span className="text-[10px] bg-indigo-100 text-indigo-900 px-1.5 py-0.2 rounded font-black shrink-0">
                                  Vous
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 truncate" title={u.email}>{u.email}</div>
                          </div>
                        </td>

                        {/* 2. Rôle interactif avec sélecteur onChange */}
                        <td className="py-3 px-2">
                          <select
                            value={u.role}
                            disabled={isCurrentUser}
                            onChange={(e) => handleRoleChange(u, e.target.value)}
                            className={cn(
                              "text-xs font-black rounded-lg px-2.5 py-1.5 border transition cursor-pointer focus:outline-none focus:ring-2 truncate w-full max-w-[130px]",
                              u.role === 'admin'
                                ? "bg-purple-100 text-purple-950 border-purple-300 focus:ring-purple-400"
                                : "bg-slate-100 text-slate-800 border-slate-300 focus:ring-indigo-400",
                              isCurrentUser && "opacity-75 cursor-not-allowed"
                            )}
                            title={isCurrentUser ? "Vous ne pouvez pas modifier votre propre rôle" : "Changer le rôle"}
                          >
                            <option value="student">Étudiant</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>

                        {/* 3. Épreuves passées & réussies */}
                        <td className="py-3 px-2 text-center whitespace-nowrap">
                          <span className="font-mono font-black text-slate-950 text-sm">
                            {u.totalExams}
                          </span>
                          <span className="text-xs text-slate-500 font-medium ml-1">
                            ({u.passedExams} réussie{u.passedExams > 1 ? 's' : ''})
                          </span>
                        </td>

                        {/* 4. Date d'inscription */}
                        <td className="py-3 px-2 text-center text-slate-600 text-xs font-mono whitespace-nowrap">
                          {formatShortDate(u.createdAt)}
                        </td>

                        {/* 5. Actions sans label (Voir, Modifier, Supprimer) */}
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Bouton Voir */}
                            <button
                              type="button"
                              onClick={() => handleViewUser(u)}
                              className="h-8 w-8 rounded-lg border border-blue-200 bg-blue-50/80 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-xs transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                              title="Voir le profil et l'historique d'examens"
                              aria-label="Voir le profil et l'historique d'examens"
                            >
                              <Icon name="eye" className="w-4 h-4" />
                            </button>

                            {/* Bouton Modifier */}
                            <button
                              type="button"
                              onClick={() => handleEditUser(u)}
                              className="h-8 w-8 rounded-lg border border-amber-200 bg-amber-50/80 text-amber-700 hover:bg-amber-600 hover:text-white hover:border-amber-600 hover:shadow-xs transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                              title="Modifier les informations du compte"
                              aria-label="Modifier les informations du compte"
                            >
                              <Icon name="pencil" className="w-4 h-4" />
                            </button>

                            {/* Bouton Supprimer */}
                            {!isCurrentUser ? (
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(u)}
                                className="h-8 w-8 rounded-lg border border-rose-200 bg-rose-50/80 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-xs transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                                title="Supprimer définitivement le compte"
                                aria-label="Supprimer définitivement le compte"
                              >
                                <Icon name="trash" className="w-4 h-4" />
                              </button>
                            ) : (
                              <div
                                className="h-8 w-8 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 flex items-center justify-center cursor-not-allowed opacity-40"
                                title="Action non disponible sur votre propre compte"
                              >
                                <Icon name="trash" className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ONGLET 3 : SUPERVISION & HISTORIQUE DES EXAMENS           */}
      {/* ========================================================= */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          {/* En-tête de section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-black text-slate-950 tracking-tight">
                Surveillance &amp; Modération des Examens
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Historique des épreuves ({exams.length} enregistrements), détection des alertes anti-triche et modération.
              </p>
            </div>
            <button
              onClick={handleRefreshExams}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
            >
              <span>Actualiser ↻</span>
            </button>
          </div>

          <div className="space-y-6 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            {/* Outils & Filtres (sans le texte "Filtrer les épreuves") */}
            <div className="flex flex-wrap items-center gap-3 border-b-2 border-slate-100 pb-5">
              {/* Recherche */}
              <input
                type="text"
                placeholder="Filtrer par étudiant ou module..."
                value={examSearch}
                onChange={(e) => setExamSearch(e.target.value)}
                className="px-3.5 py-2 text-sm rounded-xl border-2 border-slate-300 bg-slate-50 focus:bg-white focus:outline-none font-medium min-w-[220px]"
              />

              {/* Filtre Cursus */}
              <select
                value={examCourseFilter}
                onChange={(e) => setExamCourseFilter(e.target.value)}
                className="px-3.5 py-2 text-sm rounded-xl border-2 border-slate-300 bg-slate-50 font-bold text-slate-800 focus:outline-none"
              >
                <option value="all">Tous les cursus</option>
                <option value="ai-engineering">AI Engineering</option>
                <option value="backend-ia">Backend IA</option>
                <option value="prompt-engineering-ide">Prompt Engineering IDE</option>
                <option value="debugging">Ingénierie du Débogage</option>
              </select>

              {/* Filtre Statut / Résultat */}
              <select
                value={examStatusFilter}
                onChange={(e) => setExamStatusFilter(e.target.value as 'all' | 'passed' | 'failed')}
                className="px-3.5 py-2 text-sm rounded-xl border-2 border-slate-300 bg-slate-50 font-bold text-slate-800 focus:outline-none"
              >
                <option value="all">Tous les résultats</option>
                <option value="passed">Réussis (≥ 80%)</option>
                <option value="failed">Échoués (&lt; 80%)</option>
              </select>
            </div>

            {/* Table Examens Minimisée */}
            {examsLoading ? (
              <div className="py-12 text-center text-sm font-bold text-slate-500">
                Chargement des épreuves...
              </div>
            ) : exams.length === 0 ? (
              <div className="py-12 text-center text-sm font-bold text-slate-500">
                Aucune épreuve trouvée selon ces filtres.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-xs font-black uppercase text-slate-500 tracking-wider">
                      <th className="py-3 px-3">Candidat</th>
                      <th className="py-3 px-3">Cursus &amp; Module</th>
                      <th className="py-3 px-3 text-center">Score</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {exams.map((ex) => {
                      const meta = COURSE_META[ex.courseId];
                      const modTitle = getModuleTitle(ex.courseId, ex.moduleId);
                      return (
                        <tr key={ex.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3">
                            <div className="font-black text-slate-950">{ex.userName}</div>
                            <div className="text-xs text-slate-600">{ex.userEmail}</div>
                          </td>

                          <td className="py-3 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-black border ${meta?.badge || 'bg-slate-100'}`}>
                              {meta?.label || ex.courseId}
                            </span>
                            <div className="text-xs font-bold text-slate-800 truncate max-w-[280px]" title={modTitle}>
                              {modTitle}
                            </div>
                          </td>

                          <td className="py-3 px-3 text-center">
                            <span className={cn(
                              "font-black font-mono text-base",
                              ex.score >= 80 ? "text-emerald-700" : "text-amber-700"
                            )}>
                              {ex.score}%
                            </span>
                            <div className="text-[11px] text-slate-500">{ex.correctAnswersCount}/{ex.totalQuestions}</div>
                          </td>

                          <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                            {/* Bouton icône Voir détails */}
                            <button
                              type="button"
                              onClick={() => setViewingExam(ex)}
                              className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-950 transition cursor-pointer"
                              title="Voir les détails complets de l'épreuve"
                              aria-label="Voir l'examen"
                            >
                              <Icon name="eye" className="w-4 h-4" />
                            </button>

                            {/* Bouton icône Supprimer */}
                            <button
                              type="button"
                              onClick={() => handleDeleteExam(ex.id)}
                              className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-950 transition cursor-pointer"
                              title="Supprimer cette épreuve"
                              aria-label="Supprimer l'examen"
                            >
                              <Icon name="trash" className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ONGLET 4 : CATALOGUE & SUPERVISION DES FORMATIONS         */}
      {/* ========================================================= */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* En-tête de section */}
          <div className="border-b-2 border-slate-200 pb-5">
            <h1 className="text-2xl sm:text-[28px] font-black text-slate-950 tracking-tight">
              Supervision des Formations &amp; Modules
            </h1>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Catalogue officiel des 4 parcours certifiants et structure académique des épreuves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allCourses.map((c) => {
              const meta = COURSE_META[c.id];
              return (
                <div
                  key={c.id}
                  className={`rounded-2xl border-2 p-6 bg-white shadow-sm space-y-4 ${meta?.border || 'border-slate-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black border ${meta?.badge}`}>
                      {c.title}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      Cursus Actif
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {c.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block">Modules officiels :</span>
                      <span className="text-base font-black text-slate-950 font-mono">{c.modulesCount} modules</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block">Épreuves certifiantes :</span>
                      <span className="text-base font-black text-indigo-700 font-mono">{c.modulesCount} examens</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <Link
                      href={c.href}
                      className="text-xs font-bold text-slate-700 hover:text-slate-950 underline"
                    >
                      Voir le programme des cours →
                    </Link>
                    <Link
                      href={`/examens/${c.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold border border-indigo-200 transition"
                    >
                      <span>Examens du cursus</span>
                      <Icon name="arrow-right" className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ONGLET 5 : PANNEAU DE CONFIGURATION SYSTÈME               */}
      {/* ========================================================= */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* En-tête de section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-black text-slate-950 tracking-tight">
                Configuration Système &amp; Évaluation
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Ajustez les seuils académiques, les durées réglementaires, la tolérance anti-triche et le mode maintenance.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRefreshSettings}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
            >
              <span>Actualiser ↻</span>
            </button>
          </div>

          <div className="max-w-2xl rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            {settingsLoading ? (
              <div className="py-8 text-center text-sm font-bold text-slate-500">
                Chargement des paramètres...
              </div>
            ) : (
              <form onSubmit={handleSaveSettings} className="space-y-5">
              {/* Seuil de Réussite */}
              <div className="space-y-1.5">
                <label className="text-sm font-black text-slate-900 block">
                  Seuil minimal d&apos;obtention de la certification (%) :
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={settings.default_passing_score}
                    onChange={(e) => setSettings({ ...settings, default_passing_score: e.target.value })}
                    className="w-32 px-4 py-2.5 rounded-xl border-2 border-slate-300 font-mono font-black text-base text-slate-950 focus:border-indigo-600 focus:outline-none"
                  />
                  <span className="text-sm font-medium text-slate-600">
                    Standard recommandé : <strong>80%</strong> (32 bonnes réponses sur 40).
                  </span>
                </div>
              </div>

              {/* Durée Chronométrée */}
              <div className="space-y-1.5">
                <label className="text-sm font-black text-slate-900 block">
                  Durée officielle par épreuve (minutes) :
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="15"
                    max="120"
                    value={settings.default_duration_minutes}
                    onChange={(e) => setSettings({ ...settings, default_duration_minutes: e.target.value })}
                    className="w-32 px-4 py-2.5 rounded-xl border-2 border-slate-300 font-mono font-black text-base text-slate-950 focus:border-indigo-600 focus:outline-none"
                  />
                  <span className="text-sm font-medium text-slate-600">
                    Durée allouée pour les 20 à 40 questions (par défaut : <strong>40 min</strong>).
                  </span>
                </div>
              </div>

              {/* Tolérance Anti-Triche */}
              <div className="space-y-1.5">
                <label className="text-sm font-black text-slate-900 block">
                  Avertissements anti-triche avant disqualification immédiate :
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={settings.max_anti_cheat_strikes}
                    onChange={(e) => setSettings({ ...settings, max_anti_cheat_strikes: e.target.value })}
                    className="w-32 px-4 py-2.5 rounded-xl border-2 border-slate-300 font-mono font-black text-base text-slate-950 focus:border-indigo-600 focus:outline-none"
                  />
                  <span className="text-sm font-medium text-slate-600">
                    Sorties de plein écran / pertes de focus autorisées (standard : <strong>3</strong>).
                  </span>
                </div>
              </div>

              {/* Mode Maintenance */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-sm font-black text-slate-900 block">
                  Accès aux épreuves d&apos;examen :
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-800">
                    <input
                      type="radio"
                      name="maintenance"
                      checked={settings.maintenance_mode === 'false'}
                      onChange={() => setSettings({ ...settings, maintenance_mode: 'false' })}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Examens Ouverts (Normal)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-800">
                    <input
                      type="radio"
                      name="maintenance"
                      checked={settings.maintenance_mode === 'true'}
                      onChange={() => setSettings({ ...settings, maintenance_mode: 'true' })}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Maintenance (Suspendre les passages)</span>
                  </label>
                </div>
              </div>

              {settingsSavedMessage && (
                <div className="rounded-xl bg-emerald-100 border border-emerald-300 p-3 text-sm font-black text-emerald-950">
                  {settingsSavedMessage}
                </div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-700 px-7 py-3 text-sm font-black text-white hover:bg-indigo-800 transition shadow cursor-pointer"
                >
                  Enregistrer les paramètres système
                </button>
              </div>
            </form>
          )}
          </div>
        </div>
      )}

      {/* 1. Modale sophistiquée : Voir profil et historique utilisateur (sans scrollbar vertical) */}
      {viewingUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewingUser(null);
          }}
        >
          <div className="w-full max-w-2xl lg:max-w-3xl rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-2xl space-y-3.5 animate-in zoom-in-95 duration-150">
            {/* Entête avec profil à gauche et les 3 stats à droite (zéro encombrement vertical) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-950 truncate" title={viewingUser.name}>
                    {viewingUser.name}
                  </h3>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-black border shrink-0",
                      viewingUser.role === 'admin'
                        ? "bg-purple-100 text-purple-950 border-purple-300"
                        : "bg-slate-100 text-slate-800 border-slate-300"
                    )}
                  >
                    {viewingUser.role === 'admin' ? '🛡️ Admin' : 'Étudiant'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 truncate flex items-center gap-2">
                  <span className="truncate">{viewingUser.email}</span>
                  <span className="text-slate-300">•</span>
                  <span className="shrink-0 text-slate-400">Inscrit le {formatShortDate(viewingUser.createdAt)}</span>
                </div>
              </div>

              {/* 3 mini stats compactes en ligne + bouton fermer */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {(() => {
                  const total = userExamsLoading ? viewingUser.totalExams : userExamsList.length;
                  const passed = userExamsLoading
                    ? viewingUser.passedExams
                    : userExamsList.filter((e) => e.score >= 80).length;
                  const rate = total > 0 ? Math.round((passed / total) * 100) : 0;
                  return (
                    <>
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-center">
                        <span className="text-[10px] font-black uppercase text-slate-500">Épreuves</span>
                        <span className="text-xs font-black text-slate-950 font-mono">{total}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 text-center">
                        <span className="text-[10px] font-black uppercase text-emerald-700">Réussies</span>
                        <span className="text-xs font-black text-emerald-800 font-mono">{passed}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 rounded-lg px-2.5 py-1 text-center">
                        <span className="text-[10px] font-black uppercase text-indigo-700">Succès</span>
                        <span className="text-xs font-black text-indigo-800 font-mono">{rate}%</span>
                      </div>
                    </>
                  );
                })()}

                <button
                  type="button"
                  onClick={() => setViewingUser(null)}
                  className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition flex items-center justify-center cursor-pointer ml-1"
                  aria-label="Fermer"
                  title="Fermer (Échap)"
                >
                  <Icon name="x" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Historique des examens compact */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span>📝 Historique des épreuves</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                    {userExamsList.length}
                  </span>
                </h4>
                {viewingUser.lastExamAt && (
                  <span className="text-[11px] text-slate-400">
                    Dernière tentative : {formatShortDate(viewingUser.lastExamAt)}
                  </span>
                )}
              </div>

              {userExamsLoading ? (
                <div className="py-6 text-center text-xs font-bold text-slate-500">Chargement de l&apos;historique...</div>
              ) : userExamsList.length === 0 ? (
                <div className="py-5 text-center text-xs font-semibold text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                  Cet utilisateur n&apos;a passé aucune épreuve pour le moment.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[175px] overflow-y-auto pr-0.5">
                  {userExamsList.map((exam) => {
                    const meta = COURSE_META[exam.courseId];
                    const modTitle = getModuleTitle(exam.courseId, exam.moduleId);
                    return (
                      <div
                        key={exam.id}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100/80 transition flex items-center justify-between gap-2.5 text-xs"
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-black border shrink-0 ${meta?.badge || 'bg-slate-200'}`}>
                            {meta?.label || exam.courseId}
                          </span>
                          <span className="font-bold text-slate-900 truncate" title={modTitle}>{modTitle}</span>
                          <span className="text-[11px] text-slate-400 shrink-0 hidden sm:inline">• {formatShortDate(exam.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-black text-slate-950 font-mono text-xs">{exam.score}%</span>
                          <span
                            className={cn(
                              "inline-block text-[10px] font-black px-2 py-0.2 rounded-full border",
                              exam.score >= 80
                                ? "bg-emerald-100 text-emerald-950 border-emerald-300"
                                : "bg-amber-100 text-amber-950 border-amber-300"
                            )}
                          >
                            {exam.score >= 80 ? '✓ Réussi' : 'Échoué'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pied de modale */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewingUser(null)}
                className="rounded-xl border-2 border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modale sophistiquée : Modifier les informations de l'utilisateur (zéro scrollbar, agencement optimisé) */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            {/* Entête compact */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black shrink-0">
                  <Icon name="pencil" className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 leading-tight">Modifier le Membre</h3>
                  <p className="text-xs font-semibold text-slate-500">Mettre à jour le profil, le rôle ou le mot de passe</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition flex items-center justify-center cursor-pointer"
                title="Fermer"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            {/* Formulaire en grille 2 colonnes sans barre de défilement */}
            <form onSubmit={handleSaveEditUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Nom complet */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-bold text-xs text-slate-950 focus:border-indigo-600 focus:outline-none transition"
                    placeholder="Prénom et Nom"
                  />
                </div>

                {/* 2. Adresse email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-bold text-xs text-slate-950 focus:border-indigo-600 focus:outline-none transition"
                    placeholder="email@exemple.com"
                  />
                </div>

                {/* 3. Rôle du compte */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block">
                      Rôle du compte
                    </label>
                    {user.id === editingUser.id && (
                      <span className="text-[10px] text-amber-700 font-bold">Votre compte</span>
                    )}
                  </div>
                  <select
                    disabled={user.id === editingUser.id}
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-black text-xs text-slate-950 focus:border-indigo-600 focus:outline-none bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    <option value="student">Étudiant (Membre standard)</option>
                    <option value="admin">Administrateur (Gestion complète)</option>
                  </select>
                </div>

                {/* 4. Changer le mot de passe */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block">
                      Nouveau mot de passe
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">Optionnel</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showEditPassword ? 'text' : 'password'}
                      value={editingUser.password || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                      placeholder="Laisser vide si inchangé"
                      minLength={6}
                      className="w-full pl-3 pr-9 py-2 rounded-xl border-2 border-slate-200 font-bold text-xs text-slate-950 focus:border-indigo-600 focus:outline-none transition placeholder:text-slate-400 placeholder:font-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEditPassword(!showEditPassword)}
                      tabIndex={-1}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                      title={showEditPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      <Icon name={showEditPassword ? 'eye-off' : 'eye'} className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Pied de modale compact */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="rounded-xl bg-indigo-700 px-5 py-2 text-xs font-black text-white hover:bg-indigo-800 transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {editLoading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2.5 Modale d'inspection complète d'une épreuve candidat */}
      {viewingExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            {/* En-tête */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-black text-slate-950">
                  Détails de l&apos;examen
                </h3>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border",
                    viewingExam.score >= 80
                      ? "bg-emerald-100 text-emerald-950 border-emerald-300"
                      : "bg-amber-100 text-amber-950 border-amber-300"
                  )}
                >
                  {viewingExam.score >= 80 ? '✓ Réussi (≥ 80%)' : 'Échoué (< 80%)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setViewingExam(null)}
                className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition flex items-center justify-center cursor-pointer"
                aria-label="Fermer"
                title="Fermer (Échap)"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            {/* Informations Candidat & Formation (Grille 2 colonnes harmonieuse) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Candidat */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  👤 Candidat
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-950 text-sm truncate">{viewingExam.userName}</span>
                  <span
                    className={cn(
                      "inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-black border shrink-0",
                      viewingExam.userRole === 'admin'
                        ? "bg-purple-100 text-purple-950 border-purple-300"
                        : "bg-slate-200 text-slate-800 border-slate-300"
                    )}
                  >
                    {viewingExam.userRole === 'admin' ? '🛡️ Admin' : 'Étudiant'}
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium truncate" title={viewingExam.userEmail}>
                  {viewingExam.userEmail}
                </div>
              </div>

              {/* Formation & Module */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  📚 Formation &amp; Module
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black border shrink-0 ${COURSE_META[viewingExam.courseId]?.badge || 'bg-slate-200 text-slate-800 border-slate-300'}`}
                  >
                    {COURSE_META[viewingExam.courseId]?.label || viewingExam.courseId}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 truncate" title={getModuleTitle(viewingExam.courseId, viewingExam.moduleId)}>
                  {getModuleTitle(viewingExam.courseId, viewingExam.moduleId)}
                </div>
              </div>
            </div>

            {/* 4 Métriques compactes */}
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white text-center">
                <span className="text-[10px] font-black uppercase text-slate-500 block">Score</span>
                <span
                  className={cn(
                    "text-base sm:text-lg font-black font-mono block mt-0.5",
                    viewingExam.score >= 80 ? "text-emerald-700" : "text-amber-700"
                  )}
                >
                  {viewingExam.score}%
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white text-center">
                <span className="text-[10px] font-black uppercase text-slate-500 block">Réussite</span>
                <span className="text-base sm:text-lg font-black font-mono text-slate-900 block mt-0.5">
                  {viewingExam.correctAnswersCount}/{viewingExam.totalQuestions}
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white text-center">
                <span className="text-[10px] font-black uppercase text-slate-500 block">Temps</span>
                <span className="text-xs sm:text-sm font-black font-mono text-slate-900 block mt-1">
                  {formatDuration(viewingExam.timeSpentSeconds)}
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white text-center">
                <span className="text-[10px] font-black uppercase text-slate-500 block">Date</span>
                <span className="text-xs font-bold text-slate-900 block mt-1 truncate" title={formatDate(viewingExam.createdAt)}>
                  {formatShortDate(viewingExam.createdAt)}
                </span>
              </div>
            </div>

            {/* Pied de modal avec actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  const exId = viewingExam.id;
                  setViewingExam(null);
                  handleDeleteExam(exId);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-950 transition text-xs font-bold cursor-pointer"
              >
                <Icon name="trash" className="w-3.5 h-3.5" />
                <span>Supprimer cette épreuve</span>
              </button>

              <button
                type="button"
                onClick={() => setViewingExam(null)}
                className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modale sophistiquée de confirmation personnalisée (remplaçant confirm navigateur) */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-xs",
                  confirmModal.variant === 'danger'
                    ? "bg-rose-100 text-rose-700 border border-rose-200"
                    : "bg-amber-100 text-amber-800 border border-amber-200"
                )}
              >
                {confirmModal.variant === 'danger' ? '🗑️' : '⚠️'}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-slate-950 leading-tight">
                  {confirmModal.title}
                </h3>
                <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                  {confirmModal.message}
                </p>
              </div>
            </div>

            {confirmModal.details && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600 font-medium leading-relaxed">
                {confirmModal.details}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="w-full sm:w-auto rounded-xl border-2 border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => confirmModal.onConfirm()}
                className={cn(
                  "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black text-white shadow-sm transition cursor-pointer",
                  confirmModal.variant === 'danger'
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-indigo-700 hover:bg-indigo-800"
                )}
              >
                <span>{confirmModal.confirmLabel || 'Confirmer'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <React.Suspense
      fallback={
        <div className="py-20 text-center text-base font-bold text-slate-600">
          Chargement de la console d&apos;administration...
        </div>
      }
    >
      <AdminContent />
    </React.Suspense>
  );
}

