'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useExamProgress } from '@/context/ExamProgressContext';
import { CourseService } from '@/services/courseService';
import { Icon } from '@/components/common/Icon';
import { AuthModal } from '@/components/auth/AuthModal';

interface ExamHistoryItem {
  id: number;
  courseId: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  passed: boolean;
  timeSpentSeconds: number;
  createdAt: string;
}

const COURSE_BADGES: Record<string, { label: string; bg: string; text: string; border: string }> = {
  'ai-engineering': { label: 'AI Engineering', bg: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300' },
  'backend-ia': { label: 'Backend IA', bg: 'bg-amber-100', text: 'text-amber-950', border: 'border-amber-400' },
  'prompt-engineering-ide': { label: 'Prompt Engineering IDE', bg: 'bg-purple-100', text: 'text-purple-950', border: 'border-purple-300' },
  'debugging': { label: 'Ingénierie du Débogage', bg: 'bg-lime-100', text: 'text-lime-950', border: 'border-lime-300' },
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

function getModuleLabel(courseId: string, moduleId: string): string {
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

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const { passedModules, passedCourses } = useExamProgress();
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [history, setHistory] = useState<ExamHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);

  const totalPassedCount = Object.values(passedModules).reduce((acc, curr) => acc + curr.length, 0);

  useEffect(() => {
    let isMounted = true;
    if (!user) {
      setHistory([]);
      setHistoryLoading(false);
      return;
    }

    const fetchHistory = async () => {
      setHistoryLoading(true);
      try {
        const res = await fetch('/api/exams/history', { cache: 'no-store' });
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.history) {
            setHistory(data.history);
          }
        }
      } catch (err) {
        console.error('Erreur chargement historique examens:', err);
      } finally {
        if (isMounted) setHistoryLoading(false);
      }
    };

    fetchHistory();
    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-300 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Espace Membre</h1>
          <p className="text-base text-slate-900 font-semibold mt-1">
            Gérez vos informations de compte, consultez votre progression et vos attestations officielles.
          </p>
        </div>

        {user && (
          <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-base font-black text-white hover:bg-purple-800 transition shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Icon name="shield-check" className="w-5 h-5 shrink-0" />
                <span className="whitespace-nowrap">Panneau Admin</span>
              </Link>
            )}
            <Link
              href="/examens"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-5 py-2.5 text-base font-black text-white hover:bg-indigo-800 transition shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Icon name="academic-cap" className="w-5 h-5 shrink-0" />
              <span className="whitespace-nowrap">Passer l&apos;examen</span>
            </Link>
            <button
              onClick={() => logout()}
              className="rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-base font-bold text-slate-950 hover:bg-slate-100 transition whitespace-nowrap shrink-0 cursor-pointer"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>

      {/* Si non connecté */}
      {!isLoading && !user && (
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">
            Connectez-vous à votre Espace Membre
          </h2>
          <p className="text-base text-slate-900 font-semibold max-w-md mx-auto leading-relaxed">
            Connectez-vous pour accéder à vos informations personnelles, consulter vos scores d&apos;examens et télécharger vos certificats de réussite.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setAuthMode('login');
                setAuthModalOpen(true);
              }}
              className="rounded-xl bg-indigo-700 px-6 py-3 text-base font-black text-white hover:bg-indigo-800 transition shadow-md cursor-pointer"
            >
              Se connecter
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
              className="rounded-xl border-2 border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-950 hover:bg-slate-100 transition cursor-pointer"
            >
              Créer un compte
            </button>
          </div>
        </div>
      )}

      {/* Si connecté */}
      {user && (
        <div className="space-y-6">
          {/* Fiche profil */}
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-2xl border-2 border-indigo-200 shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-black text-slate-950 truncate">{user.name}</div>
                <div className="text-base text-slate-700 font-semibold truncate">{user.email}</div>
                <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                  <span>Rôle :</span>
                  <span className="capitalize">{user.role || 'Étudiant'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-slate-100">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-sm font-bold text-slate-600">Statut du compte</div>
                <div className="text-base font-black text-emerald-700 mt-0.5">Actif • Espace Membre</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-sm font-bold text-slate-600">Examens validés</div>
                <div className="text-base font-black text-indigo-700 mt-0.5">
                  {totalPassedCount} module{totalPassedCount > 1 ? 's' : ''} réussi{totalPassedCount > 1 ? 's' : ''}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-sm font-bold text-slate-600">Cursus complétés</div>
                <div className="text-base font-black text-purple-700 mt-0.5">
                  {passedCourses.length} formation{passedCourses.length > 1 ? 's' : ''} validée{passedCourses.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Détails par cours des modules validés */}
            {totalPassedCount > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-black text-slate-950">Modules d&apos;examen validés :</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50 space-y-2">
                    <span className="text-xs font-black uppercase text-blue-900 block">AI Engineering</span>
                    <div className="text-sm font-bold text-slate-800">
                      {(passedModules['ai-engineering'] || []).length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(passedModules['ai-engineering'] || []).map((m) => (
                            <span key={m} className="inline-flex items-center gap-1 rounded-md bg-white border border-blue-300 px-2 py-0.5 text-xs font-black text-blue-950 shadow-xs">
                              <Icon name="check-circle" className="w-3 h-3 text-emerald-600" />
                              {m.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Aucun examen validé</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50/50 space-y-2">
                    <span className="text-xs font-black uppercase text-amber-900 block">Backend IA</span>
                    <div className="text-sm font-bold text-slate-800">
                      {(passedModules['backend-ia'] || []).length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(passedModules['backend-ia'] || []).map((m) => (
                            <span key={m} className="inline-flex items-center gap-1 rounded-md bg-white border border-amber-300 px-2 py-0.5 text-xs font-black text-amber-950 shadow-xs">
                              <Icon name="check-circle" className="w-3 h-3 text-emerald-600" />
                              {m.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Aucun examen validé</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50/50 space-y-2">
                    <span className="text-xs font-black uppercase text-purple-900 block">Prompt Engineering IDE</span>
                    <div className="text-sm font-bold text-slate-800">
                      {(passedModules['prompt-engineering-ide'] || []).length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(passedModules['prompt-engineering-ide'] || []).map((m) => (
                            <span key={m} className="inline-flex items-center gap-1 rounded-md bg-white border border-purple-300 px-2 py-0.5 text-xs font-black text-purple-950 shadow-xs">
                              <Icon name="check-circle" className="w-3 h-3 text-emerald-600" />
                              {m.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Aucun examen validé</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-lime-200 bg-lime-50/50 space-y-2">
                    <span className="text-xs font-black uppercase text-lime-900 block">Ingénierie Débogage</span>
                    <div className="text-sm font-bold text-slate-800">
                      {(passedModules['debugging'] || []).length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(passedModules['debugging'] || []).map((m) => (
                            <span key={m} className="inline-flex items-center gap-1 rounded-md bg-white border border-lime-300 px-2 py-0.5 text-xs font-black text-lime-950 shadow-xs">
                              <Icon name="check-circle" className="w-3 h-3 text-emerald-600" />
                              {m.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Aucun examen validé</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section Historique des Examens Passés */}
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-xl font-bold">
                  📜
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-950">Historique des Examens Passés</h2>
                  <p className="text-sm font-semibold text-slate-600">
                    Retrouvez l&apos;ensemble de vos tentatives, scores obtenus et validations officielles.
                  </p>
                </div>
              </div>

              {history.length > 0 && (
                <span className="inline-flex items-center rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-black text-indigo-900 shrink-0 self-start sm:self-auto">
                  {history.length} tentative{history.length > 1 ? 's' : ''} enregistrée{history.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {historyLoading ? (
              <div className="py-8 text-center text-sm font-bold text-slate-500">
                Chargement de votre historique d&apos;examens...
              </div>
            ) : history.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center space-y-3">
                <div className="text-3xl">🎯</div>
                <h3 className="text-base font-black text-slate-950">Aucun examen passé pour le moment</h3>
                <p className="text-sm font-medium text-slate-600 max-w-md mx-auto">
                  Vos tentatives, notes, temps passés et attestations de compétences apparaîtront ici dès que vous aurez passé votre première épreuve.
                </p>
                <div className="pt-2">
                  <Link
                    href="/examens"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white hover:bg-indigo-800 transition shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span className="whitespace-nowrap">Passer l&apos;examen</span>
                    <Icon name="arrow-right" className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                  <div className="col-span-3">Date &amp; Temps</div>
                  <div className="col-span-4">Cursus &amp; Module</div>
                  <div className="col-span-2 text-center">Score</div>
                  <div className="col-span-2 text-center">Statut</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>

                <div className="divide-y divide-slate-200">
                  {history.map((item) => {
                    const courseBadge = COURSE_BADGES[item.courseId] || {
                      label: item.courseId,
                      bg: 'bg-slate-100',
                      text: 'text-slate-800',
                      border: 'border-slate-300',
                    };
                    const moduleTitle = getModuleLabel(item.courseId, item.moduleId);
                    const examHref = `/examens/${item.courseId}/${item.moduleId}`;

                    return (
                      <div
                        key={item.id}
                        className="py-4 px-3 sm:px-4 rounded-xl hover:bg-slate-50 transition flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-3 items-start md:items-center"
                      >
                        {/* Date & Temps */}
                        <div className="col-span-3 space-y-0.5">
                          <div className="text-sm font-bold text-slate-900 whitespace-nowrap">
                            {formatDate(item.createdAt)}
                          </div>
                          <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                            <Icon name="clock" className="w-3.5 h-3.5" />
                            <span>{formatDuration(item.timeSpentSeconds)}</span>
                          </div>
                        </div>

                        {/* Cursus & Module */}
                        <div className="col-span-4 space-y-1 min-w-0 w-full">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-black border ${courseBadge.bg} ${courseBadge.text} ${courseBadge.border}`}
                          >
                            {courseBadge.label}
                          </span>
                          <div className="text-sm font-black text-slate-950 truncate" title={moduleTitle}>
                            {moduleTitle}
                          </div>
                        </div>

                        {/* Score */}
                        <div className="col-span-2 text-left md:text-center">
                          <span className="text-base font-black text-slate-950">
                            {item.score}%
                          </span>
                          <span className="text-xs text-slate-500 font-semibold block">
                            {item.correctAnswersCount} / {item.totalQuestions} rép.
                          </span>
                        </div>

                        {/* Statut */}
                        <div className="col-span-2 text-left md:text-center">
                          {item.passed ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-black text-emerald-950 shadow-2xs whitespace-nowrap">
                              <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600" />
                              Validé
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-xs font-black text-amber-950 shadow-2xs whitespace-nowrap">
                              Non validé
                            </span>
                          )}
                        </div>

                        {/* Action */}
                        <div className="col-span-1 text-left md:text-right w-full md:w-auto pt-1 md:pt-0">
                          <Link
                            href={examHref}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-800 border border-slate-300 hover:border-indigo-300 px-2.5 py-1 text-xs font-bold text-slate-700 transition whitespace-nowrap"
                          >
                            <span>Refaire</span>
                            <Icon name="arrow-right" className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal d'Authentification */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
