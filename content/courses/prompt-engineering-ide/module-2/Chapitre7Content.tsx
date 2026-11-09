'use client';

import React from 'react';
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
          Chapitre 7 — Règles de communication avec l&apos;utilisateur
        </h1>
      </div>

      {/* 1. Les 5 Moments de communication */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 5 moments clés de la communication
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 font-black text-xs inline-flex items-center justify-center">1</span>
            <p className="text-xs font-black text-slate-950">Réception</p>
            <p className="text-[11px] text-slate-600">Identifier le but réel</p>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 font-black text-xs inline-flex items-center justify-center">2</span>
            <p className="text-xs font-black text-slate-950">Clarification</p>
            <p className="text-[11px] text-slate-600">Questionner si bloquant</p>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 font-black text-xs inline-flex items-center justify-center">3</span>
            <p className="text-xs font-black text-slate-950">Annonce</p>
            <p className="text-[11px] text-slate-600">Exposer le plan d&apos;action</p>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 font-black text-xs inline-flex items-center justify-center">4</span>
            <p className="text-xs font-black text-slate-950">En cours</p>
            <p className="text-[11px] text-slate-600">Signaler les blocages</p>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 font-black text-xs inline-flex items-center justify-center">5</span>
            <p className="text-xs font-black text-slate-950">Bilan</p>
            <p className="text-[11px] text-slate-600">Restitution honnête</p>
          </div>
        </div>
      </section>

      {/* 2. Règle d'honnêteté et formulations */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Règle d&apos;or : Ne jamais affirmer une action non réalisée
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">État réel de l&apos;intervention</th>
                <th className="p-3.5 border border-slate-200">Formulation professionnelle exigée</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Simple recommandation</td>
                <td className="p-3.5 border border-slate-200">« Je recommande cette correction dans le code. »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Modification préparée (non appliquée)</td>
                <td className="p-3.5 border border-slate-200">« Voici la proposition de code. Le fichier n&apos;a pas été modifié. »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Modification appliquée mais non testée</td>
                <td className="p-3.5 border border-slate-200">« Le fichier a été modifié. Le fonctionnement reste à tester. »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Test exécuté avec échec</td>
                <td className="p-3.5 border border-slate-200">« Le test Vitest a échoué avec l&apos;erreur suivante : ... »</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Structure d'analyse technique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La structure d&apos;analyse en 6 points
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 font-mono text-sm space-y-2 text-slate-900">
          <p><strong>1. Contexte :</strong> Ce qui a été examiné dans le périmètre autorisé.</p>
          <p><strong>2. Constat :</strong> Ce qui a été directement observé dans le code source.</p>
          <p><strong>3. Problème :</strong> Anomalie technique, faille de sécurité ou bug potentiel.</p>
          <p><strong>4. Explication :</strong> Raison d&apos;être sous-jacente du problème.</p>
          <p><strong>5. Recommandation :</strong> Action conseillée pour corriger le point.</p>
          <p><strong>6. Statut :</strong> Diagnostic établi, modification non appliquée, tests en attente.</p>
        </div>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz de communication
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Honnêteté technique"
            question="L'agent a écrit un snippet de code corrigé dans le chat mais n'a pas touché au fichier du projet. Que doit-il indiquer ?"
            options={[
              '« Tout est corrigé et fonctionne parfaitement »',
              '« Voici la correction proposée. Le fichier n’a pas été modifié dans le projet »',
            ]}
            correctIndex={1}
            explanation="La transparence est obligatoire : l'agent doit distinguer le code affiché dans le chat d'une modification appliquée sur le disque."
          />

          <QuickQuiz
            title="Question 2 — Signalement des imprévus"
            question="Lors d'une analyse d'API, l'agent repère une faille d'authentification hors périmètre. Que doit-il faire ?"
            options={[
              'Corriger immédiatement la faille sans rien demander',
              'Signaler l’anomalie dans le rapport sans intervenir sur ce module sans autorisation',
            ]}
            correctIndex={1}
            explanation="Signaler une découverte est pertinent, mais intervenir sur un élément hors mission exige un accord explicite."
          />
        </div>
      </section>
    </div>
  );
};
