import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';

export const metadata = {
  title: 'Site en Maintenance — AiLearning',
  description: 'Notre plateforme est temporairement en maintenance pour améliorer vos conditions d\'apprentissage.',
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Halo d'ambiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full bg-slate-950/80 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative z-10 text-center space-y-6">
        {/* Icône d'alerte */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-400">
          <Icon name="exclamation-triangle" className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
        </div>

        {/* Titre et statut */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-400/10 text-amber-300 border border-amber-400/30">
            Maintenance Programmée
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Plateforme temporairement indisponible
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Nous effectuons actuellement des opérations de maintenance et d&apos;optimisation sur nos serveurs et nos cours IA.
          </p>
        </div>

        {/* Bloc d'informations */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 text-left space-y-2 text-xs sm:text-sm text-slate-400">
          <div className="flex items-start gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Vos progressions, cours et certifications sont sécurisés.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-amber-400 font-bold">⏱</span>
            <span>Les services seront rétablis dans les plus brefs délais.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-indigo-400 font-bold">🔒</span>
            <span>L&apos;accès administrateur reste disponible pour la gestion technique.</span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition shadow-lg shadow-amber-500/20"
          >
            <span>Réessayer ↻</span>
          </Link>
          <Link
            href="/admin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition"
          >
            <span>Espace Administrateur →</span>
          </Link>
        </div>
      </div>

      <p className="mt-8 text-xs font-semibold text-slate-500 text-center">
        AiLearning Platform &bull; Maintenance Système
      </p>
    </div>
  );
}

