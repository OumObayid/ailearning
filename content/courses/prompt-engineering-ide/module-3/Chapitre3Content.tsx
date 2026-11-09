'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Chain of Thought et raisonnement structuré
        </h1>
      </div>

      {/* 1. Les 5 Méthodes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 5 techniques de raisonnement structuré
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">A. Step-by-step Prompting</span>
            <p className="text-xs text-slate-700">Imposer une séquence d&apos;exécution ordonnée pas-à-pas (Étape 1 &rarr; Étape 2 &rarr; Étape 3).</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">B. Task Decomposition</span>
            <p className="text-xs text-slate-700">Scinder un problème tentaculaire en sous-tâches isolées et indépendantes.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">C. Self-Verification</span>
            <p className="text-xs text-slate-700">Obliger le modèle à contrôler la véracité de ses conclusions avant de restituer la réponse.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">D. Evidence-based Reasoning</span>
            <p className="text-xs text-slate-700">Conditionner chaque anomalie annoncée à la citation d&apos;un extrait source observable.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1 md:col-span-2 lg:col-span-2">
            <span className="text-xs font-black uppercase text-indigo-700">E. Decision-based Reasoning</span>
            <p className="text-xs text-slate-700">Établir des grilles d&apos;évaluation objectives pour classifier la gravité (Critique, Élevé, Moyen, Faible).</p>
          </div>
        </div>
      </section>

      {/* 2. Exemple de prompt CoT d'audit */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Exemple de prompt d&apos;audit avec raisonnement structuré
        </h2>
        <div className="rounded-2xl border-2 border-slate-300 bg-slate-900 text-slate-100 p-6 font-mono text-xs sm:text-sm space-y-2">
          <p className="text-xs uppercase font-extrabold text-indigo-400">[PROMPT D&apos;AUDIT STRUCTURÉ EN 6 ÉTAPES]</p>
          <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
{`MÉTHODE OBLIGATOIRE DE TRAVAIL :
1. Compréhension : Identifier le rôle du code et les bibliothèques importées.
2. Analyse de sécurité : Vérifier la validation des entrées (Zod) et les injections SQL/XSS.
3. Analyse de robustesse : Examiner la gestion des exceptions et les codes HTTP retournés.
4. Identification des anomalies : Pour chaque point, citer l'extrait exact et expliquer le risque.
5. Vérification des preuves : Si un problème ne peut être confirmé par le code fourni, indiquer "NON CONFIRMÉ".
6. Restitution : Présenter le rapport final ordonné par niveau de priorité avec justification.`}
          </pre>
        </div>

        <Callout type="note" title="Précision méthodologique">
          Exiger un raisonnement structuré ne consiste pas à demander « montre-moi tes pensées privées », mais à imposer une démarche scientifique et vérifiable.
        </Callout>
      </section>

      {/* 3. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz Chain of Thought
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Utilité première du CoT"
            question="Pourquoi le raisonnement étape par étape améliore-t-il la précision des modèles sur les calculs ou l'audit ?"
            options={[
              'Il accélère le temps de réponse du GPU',
              'Il décompose la complexité et réduit les sauts logiques erronés en matérialisant les étapes intermédiaires',
            ]}
            correctIndex={1}
            explanation="En générant les étapes intermédiaires, le modèle utilise ses propres calculs précédents dans sa fenêtre d'attention pour converger vers la bonne conclusion."
          />

          <QuickQuiz
            title="Question 2 — Raisonnement fondé sur les preuves"
            question="Que doit répondre un agent soumis au Evidence-based Reasoning si le code fourni n'affiche pas la connexion à la base ?"
            options={[
              'Affirmer que la base est mal sécurisée par précaution',
              'Indiquer explicitement « Information non confirmée dans l’extrait fourni » sans spéculer',
            ]}
            correctIndex={1}
            explanation="L'Evidence-based Reasoning interdit toute affirmation sans preuve observable directement dans la source."
          />
        </div>
      </section>
    </div>
  );
};

