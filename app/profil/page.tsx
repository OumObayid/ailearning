'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@/components/common/Icon';
import { AuthModal } from '@/components/auth/AuthModal';
import { UserProgressionView } from '@/components/progression/UserProgressionView';
import { UserProfileSettings } from '@/components/profile/UserProfileSettings';
import type { UserProgressionResponse } from '@/services/progressionService';

function ProfilePageContent() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const activeTab: 'progression' | 'profile' = tabParam === 'profile' ? 'profile' : 'progression';

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [progressionData, setProgressionData] = useState<UserProgressionResponse | null>(null);
  const [loadingProgression, setLoadingProgression] = useState<boolean>(false);
  const [progressionError, setProgressionError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let isMounted = true;

    const fetchProgression = async () => {
      setLoadingProgression(true);
      try {
        const res = await fetch('/api/user/progression', { cache: 'no-store' });
        if (res.ok && isMounted) {
          const json: UserProgressionResponse = await res.json();
          setProgressionData(json);
        } else {
          const err = await res.json().catch(() => ({}));
          if (isMounted) setProgressionError(err.error || 'Erreur lors du chargement de la progression.');
        }
      } catch (err) {
        if (isMounted) setProgressionError((err as Error).message || 'Erreur réseau.');
      } finally {
        if (isMounted) setLoadingProgression(false);
      }
    };

    fetchProgression();
    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 select-text">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-950">
            {activeTab === 'progression' ? 'Ma progression' : 'Mon Profil'}
          </h1>
          <p className="text-sm text-slate-600 font-semibold mt-0.5">
            {activeTab === 'progression'
              ? 'Suivez vos scores d’épreuves, vos moyennes générales par cursus et l’avancement de vos certifications.'
              : 'Gérez vos informations de compte, modifiez votre adresse email et votre mot de passe en toute sécurité.'}
          </p>
        </div>

        {user && (
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-3.5 py-2 text-xs font-black text-white hover:bg-purple-800 transition shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Icon name="shield-check" className="w-4 h-4 shrink-0" />
                <span>Panneau Admin</span>
              </Link>
            )}
            <button
              onClick={() => logout()}
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>

      {/* Si non connecté */}
      {!authLoading && !user && (
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 sm:p-12 text-center space-y-4 shadow-sm max-w-2xl mx-auto my-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold">
            🎓
          </div>
          <h2 className="text-2xl font-black text-slate-950">
            Connectez-vous pour accéder à votre espace
          </h2>
          <p className="text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
            Consultez votre progression complète, vos notes d&apos;examens et gérez les paramètres de votre compte.
          </p>
          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setAuthModalOpen(true);
              }}
              className="rounded-xl bg-indigo-700 px-6 py-2.5 text-xs font-black text-white hover:bg-indigo-800 transition shadow-xs cursor-pointer"
            >
              Se connecter
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
              className="rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition cursor-pointer shadow-2xs"
            >
              Créer un compte
            </button>
          </div>
        </div>
      )}

      {/* Onglet 1 : Ma progression */}
      {user && activeTab === 'progression' && (
        <>
          {(loadingProgression || authLoading) && !progressionData && (
            <div className="py-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-xs animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
                <span>Chargement de votre progression...</span>
              </div>
            </div>
          )}

          {progressionError && !progressionData && (
            <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-6 text-center space-y-2">
              <div className="text-2xl">⚠️</div>
              <h3 className="text-base font-black text-rose-950">Impossible de charger votre progression</h3>
              <p className="text-xs font-medium text-rose-800">{progressionError}</p>
            </div>
          )}

          {progressionData && (
            <UserProgressionView data={progressionData} isAdminView={false} />
          )}
        </>
      )}

      {/* Onglet 2 : Mon Profil (changement email & mot de passe) */}
      {user && activeTab === 'profile' && (
        <UserProfileSettings />
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

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-xs font-bold text-slate-500">
          Chargement...
        </div>
      }
    >
      <ProfilePageContent />
    </Suspense>
  );
}
