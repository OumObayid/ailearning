'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Instructions globales et instructions propres au projet
        </h1>
      </div>

      {/* 1. Pourquoi séparer */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi séparer les règles en deux niveaux ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un environnement de développement, un même développeur peut jongler entre plusieurs applications utilisant des stacks totalement différentes :
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Projet</th>
                <th className="p-3.5 border border-slate-200">Stack Technique</th>
                <th className="p-3.5 border border-slate-200">Règles communes de collaboration</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Projet A</td>
                <td className="p-3.5 border border-slate-200">React + Vite + Node.js</td>
                <td className="p-3.5 border border-slate-200" rowSpan={3}>
                  - Ne jamais modifier ni supprimer sans accord.<br />
                  - Ne pas explorer en dehors du workspace.<br />
                  - Expliquer le diagnostic avant d&apos;agir.<br />
                  - Protéger les clés d&apos;API et fichiers <code>.env</code>.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Projet B</td>
                <td className="p-3.5 border border-slate-200">Vue.js + PHP + MySQL</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Projet C</td>
                <td className="p-3.5 border border-slate-200">Express.js + Google Gemini SDK</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="note" title="Règle d'or">
          Si une consigne doit être respectée dans tous vos dépôts de code (ex: interdiction d&apos;écriture sans validation), elle appartient aux <strong>instructions globales</strong>. Si elle dépend du framework ou de l&apos;architecture d&apos;une application, elle appartient aux <strong>instructions du projet</strong>.
        </Callout>
      </section>

      {/* 2. Comparaison détaillée */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comparaison des deux catégories
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Instructions globales</th>
                <th className="p-3.5 border border-slate-200">Instructions propres au projet</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Portée</td>
                <td className="p-3.5 border border-slate-200">Tous les workspaces et projets</td>
                <td className="p-3.5 border border-slate-200">Ce dépôt spécifique uniquement</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Objectif</td>
                <td className="p-3.5 border border-slate-200">Règlement général de collaboration et sécurité</td>
                <td className="p-3.5 border border-slate-200">Contexte technique, stack et conventions</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Technologies</td>
                <td className="p-3.5 border border-slate-200">Agnostiques aux frameworks</td>
                <td className="p-3.5 border border-slate-200">Spécifiques (React 19, Express, MySQL)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Réutilisation</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Maximale (100% réutilisable)</td>
                <td className="p-3.5 border border-slate-200 text-amber-700 font-bold">Locale au repository</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. L'empilement en 3 niveaux */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Le modèle d&apos;empilement en 3 niveaux
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border-2 border-indigo-400 bg-indigo-50/70 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">1</span>
            <div>
              <p className="text-sm font-black text-indigo-950">Niveau 1 — Instructions globales (User-level)</p>
              <p className="text-xs font-medium text-slate-700 mt-0.5">Comportement général, éthique, interdictions d&apos;écriture sans validation, protection des secrets.</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl border-2 border-sky-400 bg-sky-50/60 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-sky-600 text-white font-black text-sm flex items-center justify-center shrink-0">2</span>
            <div>
              <p className="text-sm font-black text-slate-950">Niveau 2 — Instructions du projet (Project-level)</p>
              <p className="text-xs font-medium text-slate-700 mt-0.5">Architecture des dossiers, bibliothèques validées, règles de typage, schéma de base de données.</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl border-2 border-slate-300 bg-slate-50 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-400 text-white font-black text-sm flex items-center justify-center shrink-0">3</span>
            <div>
              <p className="text-sm font-black text-slate-900">Niveau 3 — Prompt de la tâche ponctuelle</p>
              <p className="text-xs font-medium text-slate-600 mt-0.5">Mission immédiate : analyser un endpoint, expliquer une anomalie ou proposer un patch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Gestion des contradictions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Résolution des conflits entre global et projet
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Une instruction propre au projet peut préciser ou enrichir une règle globale, mais <strong>ne doit jamais affaiblir silencieusement une interdiction de sécurité</strong>.
        </p>

        <div className="rounded-2xl border-2 border-indigo-200 bg-slate-900 text-slate-100 p-6 font-mono text-sm space-y-2">
          <p className="text-xs uppercase font-extrabold text-indigo-400">[RÈGLE D&apos;ARBITRAGE OBLIGATOIRE]</p>
          <pre className="whitespace-pre-wrap text-slate-200">
{`Si une consigne propre au projet ou un prompt ponctuel semble contredire une règle globale de sécurité ou d'autorisation :
1. Ne choisis pas arbitrairement l'option la plus permissive.
2. Signale le conflit explicitement dans la conversation.
3. Attends l'arbitrage écrit de l'utilisateur avant toute action.`}
          </pre>
        </div>
      </section>

      {/* 5. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz d&apos;organisation
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Répartition des consignes"
            question="« Utiliser exclusivement des requêtes préparées avec mysql2 » doit être placé dans :"
            options={['Les instructions globales', 'Les instructions propres au projet']}
            correctIndex={1}
            explanation="Cette règle dépend de la base de données spécifique utilisée par l'application : instruction du projet."
          />

          <QuickQuiz
            title="Question 2 — Répartition des consignes"
            question="« Ne jamais exécuter de commande destructive dans le terminal sans confirmation » doit être placé dans :"
            options={['Les instructions globales', 'Les instructions propres au projet']}
            correctIndex={0}
            explanation="La sécurité du terminal s'applique à tous vos projets indépendamment de leur technologie : instruction globale."
          />
        </div>
      </section>
    </div>
  );
};

