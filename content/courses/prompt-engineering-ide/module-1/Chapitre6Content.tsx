'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Gestion des ambiguïtés
        </h1>
      </div>

      {/* 1. Définition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Qu&apos;est-ce qu&apos;une ambiguïté dans un prompt ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une <strong>ambiguïté</strong> apparaît lorsqu&apos;une consigne peut être interprétée de plusieurs façons divergentes par le modèle d&apos;intelligence artificielle.
        </p>
        <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/50 space-y-2">
          <span className="text-xs font-black uppercase text-amber-800">Exemple d&apos;instruction lourdement ambiguë :</span>
          <p className="font-mono text-sm bg-white p-3 rounded-xl border border-amber-300 text-slate-900">
            « Améliore mon application et corrige les problèmes. »
          </p>
          <p className="text-xs text-slate-700 leading-relaxed">
            Quels problèmes ? Performance ? Sécurité ? Typographie ? Faut-il installer des dépendances ? Modifier la base de données ? Supprimer des fichiers ? Faute d&apos;encadrement, l&apos;agent comble les vides en prenant des décisions arbitraires.
          </p>
        </div>
        <Callout type="note" title="Principe fondamental">
          Une instruction courte n&apos;est pas nécessairement une instruction claire. La concision ne doit jamais être obtenue au détriment de l&apos;exactitude des limites.
        </Callout>
      </section>

      {/* 2. Les 4 grandes formes d'ambiguïté */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les principales formes d&apos;ambiguïtés
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <h3 className="text-base font-black text-slate-950">1. Ambiguïté sur l&apos;objectif</h3>
            <p className="text-xs text-slate-700">« Optimise mon site web. »</p>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
              <strong>Corrigé :</strong> « Analyse les temps de rendu des composants React et dresse un diagnostic des re-renders inutiles sans toucher au code. »
            </div>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <h3 className="text-base font-black text-slate-950">2. Ambiguïté sur le périmètre</h3>
            <p className="text-xs text-slate-700">« Analyse les fichiers de mon projet. »</p>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
              <strong>Corrigé :</strong> « Analyse uniquement les fichiers du dossier <code>src/</code>. Ignore les dossiers <code>node_modules/</code>, <code>dist/</code> et tout fichier <code>.env</code>. »
            </div>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <h3 className="text-base font-black text-slate-950">3. Ambiguïté sur les autorisations</h3>
            <p className="text-xs text-slate-700">« Répare les erreurs de mon application. »</p>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
              <strong>Corrigé :</strong> « Tu es autorisé à lire les logs et le code pour diagnostiquer. Tu n&apos;es pas autorisé à modifier les fichiers avant validation écrite de ton diagnostic. »
            </div>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <h3 className="text-base font-black text-slate-950">4. Ambiguïté sur le résultat</h3>
            <p className="text-xs text-slate-700">« Fais un audit de sécurité. »</p>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
              <strong>Corrigé :</strong> « Fournis un rapport markdown avec : faille détectée, fichier/ligne, gravité (OWASP), explication et recommandation de correction. »
            </div>
          </div>
        </div>
      </section>

      {/* 3. Verbes d'action à risques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les verbes à risques et leurs alternatives précises
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Verbe imprécis</th>
                <th className="p-3.5 border border-slate-200">Interprétations hasardeuses</th>
                <th className="p-3.5 border border-slate-200">Formulation opérationnelle recommandée</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-rose-700">Améliorer</td>
                <td className="p-3.5 border border-slate-200">Design, perfs, lisibilité, réécriture ?</td>
                <td className="p-3.5 border border-slate-200">« Optimiser le temps de réponse », « Typographie »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-rose-700">Nettoyer</td>
                <td className="p-3.5 border border-slate-200">Supprimer des fichiers, reformater, renommer ?</td>
                <td className="p-3.5 border border-slate-200">« Repérer les variables et imports inutilisés »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-rose-700">Sécuriser</td>
                <td className="p-3.5 border border-slate-200">Changer de protocole, bloquer des routes ?</td>
                <td className="p-3.5 border border-slate-200">« Ajouter la validation Zod sur le body de la requête »</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Bloc réutilisable Antigravity */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Règle réutilisable pour vos instructions d&apos;agent
        </h2>
        <div className="rounded-2xl border-2 border-indigo-200 bg-slate-900 text-slate-100 p-6 space-y-3 font-mono text-sm">
          <p className="text-xs uppercase font-extrabold text-indigo-400 tracking-wider">[GESTION SYSTÉMATIQUE DES AMBIGUÏTÉS]</p>
          <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
{`Avant de commencer toute tâche :
1. Analyse toutes les consignes reçues.
2. Identifie les informations manquantes et les termes à double sens.
3. Vérifie que le périmètre et les autorisations sont explicites.

Si une ambiguïté concerne le périmètre ou les autorisations de modification :
- Ne fais aucune supposition.
- Ne commence pas l'action concernée.
- Pose une question précise et attends ma réponse avant d'agir.

Ne considère jamais une absence d'interdiction comme une autorisation automatique.`}
          </pre>
        </div>
      </section>

      {/* 5. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Distinguer Ambiguïté et Contradiction
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Qualifier l'instruction"
            question="« Améliore mon projet et corrige les bugs » est un exemple de :"
            options={['Une ambiguïté', 'Une contradiction']}
            correctIndex={0}
            explanation="Cette instruction souffre d'un manque de précision sur ce qu'il faut faire et où : c'est une ambiguïté."
          />

          <QuickQuiz
            title="Question 2 — Qualifier l'instruction"
            question="« Ne modifie aucun fichier. Corrige directement le bug dans auth.js » est un exemple de :"
            options={['Une ambiguïté', 'Une contradiction']}
            correctIndex={1}
            explanation="Deux exigences strictement incompatibles s'opposent (interdiction de modifier vs ordre de corriger) : c'est une contradiction."
          />

          <QuickQuiz
            title="Question 3 — Réaction attendue de l'agent"
            question="Face à une ambiguïté majeure sur une suppression de fichiers, que doit faire un agent professionnel ?"
            options={[
              'Supposer ce qui semble logique et effacer les fichiers',
              'Suspendre immédiatement l’action et demander des clarifications précises',
              'Ignorer silencieusement la consigne sans rien dire',
            ]}
            correctIndex={1}
            explanation="Un agent professionnel ne devine jamais une autorisation destructrice : il suspend l'action et pose une question ciblée."
          />
        </div>
      </section>
    </div>
  );
};
