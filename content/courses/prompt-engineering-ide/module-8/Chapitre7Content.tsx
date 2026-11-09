'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Organiser le cycle de développement React + Node.js
        </h1>
      </div>

      {/* 1. Les 6 phases du cycle de développement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 6 phases d&apos;ingénierie d&apos;une fonctionnalité
        </h2>
        <p className="text-slate-700">
          Pour développer une fonctionnalité complète (par exemple, la création d&apos;un projet avec persistance MySQL), l&apos;escouade applique un cycle méthodique en 6 temps :
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 1 — Analyse du besoin (Cadrage)</span>
              <span className="text-xs font-mono font-bold text-purple-700">Coordinateur</span>
            </div>
            <p className="text-slate-600">Comprendre les exigences, identifier les composants nécessaires et délimiter les contours du CRUD.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 2 — Préparation technique &amp; Audits préalables</span>
              <span className="text-xs font-mono font-bold text-purple-700">Développeur + Sécurité + QA</span>
            </div>
            <p className="text-slate-600">Le développeur prépare le diff en texte ; l&apos;agent sécurité scrute les risques (SQLi) et le testeur bâtit les scénarios de test.</p>
          </div>

          <div className="p-4 bg-white border-2 border-purple-300 rounded-xl space-y-1 shadow-xs bg-purple-50/20">
            <div className="flex justify-between items-center">
              <span className="font-bold text-purple-950">PHASE 3 — Validation Humaine Souveraine (HITL)</span>
              <span className="text-xs font-mono font-bold text-purple-800">Développeur Humain</span>
            </div>
            <p className="text-slate-700">Examen du diff, des risques et du plan de test. Accord formel d&apos;écriture accordé par l&apos;utilisateur.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 4 — Développement autorisé</span>
              <span className="text-xs font-mono font-bold text-purple-700">Développeur</span>
            </div>
            <p className="text-slate-600">Application du diff unifié sur le disque (formulaire React et route Express). Aucun autre fichier n&apos;est touché.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 5 — Contrôle de recette &amp; Vérification factuelle</span>
              <span className="text-xs font-mono font-bold text-purple-700">Testeur + Sécurité</span>
            </div>
            <p className="text-slate-600">Exécution des tests autorisés, collecte des preuves matérielles et confirmation de non-régression.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 6 — Documentation finale &amp; Synthèse</span>
              <span className="text-xs font-mono font-bold text-purple-700">Documentaliste + Coordinateur</span>
            </div>
            <p className="text-slate-600">Rédaction des spécifications OpenAPI confirmées et rapport d&apos;achèvement remis à l&apos;utilisateur.</p>
          </div>
        </div>
      </section>

      {/* 2. Pourquoi pas tout le monde en même temps ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Parallélisme sélectif vs Séquençage strict
        </h2>
        <p className="text-slate-700">
          Certaines activités gagnent à être menées en parallèle, tandis que d&apos;autres exigent un ordre séquentiel absolu :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <span className="font-bold text-emerald-900">Parallélisme autorisé (Gain de temps)</span>
            <p className="text-slate-700">Pendant que le développeur conçoit la route Express en texte, l&apos;agent sécurité examine les risques d&apos;injection et le testeur rédige ses cas de test.</p>
          </div>
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-900">Séquençage obligatoire (Sécurité)</span>
            <p className="text-slate-700">L&apos;écriture de code sur le disque ne peut JAMAIS précéder l&apos;accord humain. Les tests finaux ne peuvent JAMAIS précéder la disponibilité réelle du code.</p>
          </div>
        </div>

        <Callout type="tip" title="Unicité de responsabilité">
          Si deux agents tentent d&apos;éditer simultanément le même fichier (par exemple, l&apos;agent sécurité qui corrige une ligne pendant que le développeur refactorise la fonction), le risque de conflit Git et de régression est maximal. <strong>Le développeur est le seul auteur habilité</strong>.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Cycle de développement
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'agent testeur ne peut-il pas déclarer une fonctionnalité comme validée dès la phase de conception technique ?",
              options: [
                "Parce qu'il n'aime pas le JavaScript",
                "Parce que la fonctionnalité n'a pas encore été développée sur le disque ni matériellement testée avec des preuves d'exécution",
                "Parce que le coordinateur est absent",
                "Parce que le navigateur web est fermé"
              ],
              correctIndex: 1,
              explanation: "Le testeur peut préparer ses scénarios en amont, mais la validation définitive exige l'exécution matérielle du code développé."
            },
            {
              id: 2,
              question: "Quelle phase s'intercale obligatoirement entre la proposition de code du développeur et son application effective sur le disque ?",
              options: [
                "La suppression des logs",
                "La validation humaine explicite (Phase 3 HITL)",
                "Le redémarrage du serveur MySQL",
                "L'envoi d'un tweet"
              ],
              correctIndex: 1,
              explanation: "Toute écriture sur le disque requiert l'examen préalable du diff par le développeur humain et son accord formel."
            }
          ]}
        />
      </section>
    </div>
  );
};

