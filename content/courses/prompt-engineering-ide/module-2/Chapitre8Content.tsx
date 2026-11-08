'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Conditions d&apos;autorisation avant exécution
        </h1>
      </div>

      {/* 1. Les 4 Composantes d'une demande d'autorisation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Anatomie d&apos;une demande d&apos;autorisation professionnelle
        </h2>
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-6 space-y-4 font-mono text-sm">
          <p className="text-xs uppercase font-extrabold text-indigo-900 tracking-wider">[GABARIT DE VALIDATION PRÉALABLE]</p>
          <div className="bg-white p-4 rounded-xl border border-indigo-200 space-y-2 text-slate-900">
            <p><strong>1. Action envisagée :</strong> Modification du fichier de service Gemini.</p>
            <p><strong>2. Cible exacte :</strong> <code>src/services/gemini.js</code> (lignes 12 à 25).</p>
            <p><strong>3. Objectif :</strong> Remplacer l&apos;initialisation dépréciée par le SDK <code>@google/genai</code>.</p>
            <p><strong>4. Conséquences &amp; Risques :</strong> Le fichier sera modifié sur disque. Aucun autre composant n&apos;est affecté.</p>
            <p className="text-indigo-800 font-bold pt-2">Demande : Souhaitez-vous autoriser cette modification ?</p>
          </div>
        </div>
      </section>

      {/* 2. Gestion des réponses ambiguës */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Traitement des réponses utilisateur ambiguës
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Réponse de l&apos;utilisateur</th>
                <th className="p-3.5 border border-slate-200">Statut de validation</th>
                <th className="p-3.5 border border-slate-200">Conduite de l&apos;agent</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">« Oui, applique cette modification »</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Valable</td>
                <td className="p-3.5 border border-slate-200">Exécute uniquement la modification ciblée.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">« Fais ce qu&apos;il faut, je te fais confiance »</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">Invalide (trop vague)</td>
                <td className="p-3.5 border border-slate-200">Refuse l&apos;action et demande une validation explicite de l&apos;opération.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">« Corrige tout mon projet »</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">Invalide (portée infinie)</td>
                <td className="p-3.5 border border-slate-200">Présente la liste des fichiers à corriger et demande confirmation lot par lot.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="note" title="Règle fondamentale">
          Une autorisation ponctuelle accordée pour un fichier donné expire dès la fin de l&apos;opération. Elle ne devient jamais une permission permanente pour les tâches suivantes.
        </Callout>
      </section>

      {/* 3. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz des autorisations
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Portée d'une autorisation"
            question="Vous autorisez l'agent à modifier server.js. Pendant son travail, il réalise qu'il doit aussi modifier auth.js. Que doit-il faire ?"
            options={[
              'Modifier auth.js directement car c’est lié au même problème',
              'Suspendre l’action sur auth.js et demander une nouvelle autorisation spécifique',
            ]}
            correctIndex={1}
            explanation="L'autorisation est strictement limitée aux ressources désignées. Tout fichier supplémentaire exige un nouvel accord."
          />

          <QuickQuiz
            title="Question 2 — Formule de confiance"
            question="L'utilisateur répond : « Je te fais confiance, gère tout ». L'agent doit-il lancer immédiatement npm install et réécrire le code ?"
            options={[
              'Oui, car l’utilisateur a manifesté son accord',
              'Non, une marque de confiance générale ne constitue pas une permission technique valide',
            ]}
            correctIndex={1}
            explanation="L'agent professionnel refuse de transformer une formule d'encouragement vague en autorisation destructrice."
          />
        </div>
      </section>
    </div>
  );
};

