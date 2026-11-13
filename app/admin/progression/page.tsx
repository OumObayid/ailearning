'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@/components/common/Icon';
import { UserProgressionView } from '@/components/progression/UserProgressionView';
import type { UserProgressionResponse } from '@/services/progressionService';

function AdminProgressionContent() {
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [data, setData] = useState<UserProgressionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !currentUser || currentUser.role !== 'admin' || !userId) {
      return;
    }

    let isMounted = true;
    const loadProgression = async () => {
      try {
        const res = await fetch(`/api/admin/user-progression?userId=${userId}`, { cache: 'no-store' });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Erreur lors du chargement de la progression.');
        }
        const json: UserProgressionResponse = await res.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        if (isMounted) setError((err as Error).message || 'Erreur réseau.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProgression();
    return () => {
      isMounted = false;
    };
  }, [authLoading, currentUser, userId]);

  if (!authLoading && (!currentUser || currentUser.role !== 'admin')) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-6 text-center space-y-4">
          <div className="text-3xl">⚠️</div>
          <h2 className="text-lg font-black text-rose-950">Accès réservé aux administrateurs</h2>
          <p className="text-sm font-semibold text-rose-800">
            Vous devez être connecté avec un compte administrateur pour voir cette page.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              <Icon name="arrow-left" className="w-4 h-4" />
              <span>Retour à l&apos;accueil</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!authLoading && !userId) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 text-center space-y-4">
          <div className="text-3xl">⚠️</div>
          <h2 className="text-lg font-black text-amber-950">Identifiant utilisateur manquant</h2>
          <p className="text-sm font-semibold text-amber-800">
            Veuillez sélectionner un utilisateur depuis la liste des utilisateurs.
          </p>
          <div>
            <Link
              href="/admin?tab=users"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              <Icon name="arrow-left" className="w-4 h-4" />
              <span>Retour aux Utilisateurs</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || authLoading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-xs animate-pulse">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
          <span>Chargement de la progression de l’utilisateur...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-6 text-center space-y-4">
          <div className="text-3xl">⚠️</div>
          <h2 className="text-lg font-black text-rose-950">Impossible d&apos;afficher la page</h2>
          <p className="text-sm font-semibold text-rose-800">{error || 'Erreur inconnue.'}</p>
          <div>
            <Link
              href="/admin?tab=users"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              <Icon name="arrow-left" className="w-4 h-4" />
              <span>Retour aux utilisateurs</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full pb-8 select-text overflow-x-hidden">
      {/* En-tête administrateur avec bouton de retour */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-500">Supervision Administrateur</span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-black bg-purple-100 text-purple-950 border border-purple-300">
              ID #{data.user.id}
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-950 tracking-tight mt-0.5">
            Progression de {data.user.name}
          </h1>
        </div>

        <Link
          href="/admin?tab=users"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-2xs cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Icon name="arrow-left" className="w-3.5 h-3.5" />
          <span>Retour aux Utilisateurs</span>
        </Link>
      </div>

      {/* Vue de progression complète */}
      <UserProgressionView data={data} isAdminView={true} />
    </div>
  );
}

export default function AdminProgressionPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-xs font-bold text-slate-500">
          Chargement de la progression...
        </div>
      }
    >
      <AdminProgressionContent />
    </Suspense>
  );
}
