'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Instructions positives et négatives
        </h1>
      </div>

      {/* 1. Instructions Positives */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les instructions positives (ce qu&apos;il faut faire)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une <strong>instruction positive</strong> prescrit une action explicite, une posture ou un livrable concret. Elle oriente l&apos;exécution du modèle dans une direction définie.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Domaine</th>
                <th className="p-3.5 border border-slate-200">Instruction positive professionnelle</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Analyse de code</td>
                <td className="p-3.5 border border-slate-200">Examine uniquement les fichiers désignés et identifie les anomalies.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Développement</td>
                <td className="p-3.5 border border-slate-200">Réutilise exclusivement les composants React du dossier <code>src/components/common/</code>.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Sécurité</td>
                <td className="p-3.5 border border-slate-200">Vérifie la validation stricte de tous les schémas avec Zod avant la base de données.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Documentation</td>
                <td className="p-3.5 border border-slate-200">Présente les résultats d&apos;audit sous forme de tableau markdown ordonné par gravité.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Instructions Négatives */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les instructions négatives (ce qu&apos;il ne faut pas faire)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une <strong>instruction négative</strong> délimite les bornes d&apos;intervention en posant des interdictions strictes. Dans un IDE connecté au terminal et aux fichiers, elles évitent les actions irréversibles.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border-2 border-rose-200 bg-rose-50/40 space-y-2">
            <span className="text-xs font-black uppercase text-rose-700">Sécurité &amp; Fichiers critiques</span>
            <ul className="text-xs space-y-1 text-slate-800 font-semibold list-disc list-inside">
              <li>Ne supprime aucun fichier ni répertoire du projet.</li>
              <li>Ne consulte jamais les fichiers <code>.env*</code> ni les clés d&apos;API.</li>
              <li>Ne modifie aucun code source pendant les phases d&apos;audit.</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border-2 border-rose-200 bg-rose-50/40 space-y-2">
            <span className="text-xs font-black uppercase text-rose-700">Terminal &amp; Environnement</span>
            <ul className="text-xs space-y-1 text-slate-800 font-semibold list-disc list-inside">
              <li>N&apos;exécute aucune commande dans le terminal sans accord préalable.</li>
              <li>N&apos;installe aucune nouvelle dépendance npm/yarn.</li>
              <li>Ne sors jamais de la racine du workspace du projet.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Transformer les consignes vagues */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Transformer une interdiction vague en règle opérationnelle
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-rose-700">Formulation vague (inefficace)</span>
            <p className="font-mono text-sm bg-white p-3 rounded-xl border border-rose-200 text-slate-900">
              « Ne fais rien de dangereux dans mon projet. »
            </p>
            <p className="text-xs text-slate-600">L&apos;agent ignore ce que vous qualifiez de dangereux selon votre contexte.</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-emerald-700">Règles opérationnelles précises (professionnelles)</span>
            <pre className="font-mono text-sm bg-white p-4 rounded-xl border border-emerald-300 text-slate-900 whitespace-pre-wrap">
{`- Ne supprime aucun fichier du projet.
- Ne modifie aucun fichier sans validation préalable de mon côté.
- Ne lance aucune commande bash/powershell destructive (ex: rm, git reset --hard).
- Demande mon autorisation écrite dès qu'une action dépasse la simple lecture d'audit.`}
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Combiner Positif et Négatif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le modèle combiné : Autorisations + Interdictions + Gestion du doute
        </h2>
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-6 space-y-3 font-mono text-sm">
          <p className="text-xs uppercase font-extrabold text-indigo-700 tracking-wider">[ACTIONS AUTORISÉES]</p>
          <p className="text-slate-800">- Analyser les composants de <code>src/</code>.</p>
          <p className="text-slate-800">- Présenter les erreurs détectées et les causes possibles.</p>

          <p className="text-xs uppercase font-extrabold text-rose-700 tracking-wider mt-4">[ACTIONS INTERDITES]</p>
          <p className="text-slate-800">- Ne modifier aucun fichier.</p>
          <p className="text-slate-800">- Ne pas exécuter de script sans accord.</p>

          <p className="text-xs uppercase font-extrabold text-amber-700 tracking-wider mt-4">[COMPORTEMENT EN CAS DE DOUTE]</p>
          <p className="text-slate-800">- Si une information est incomplète, poser une question précise avant d&apos;agir.</p>
          <p className="text-slate-800">- Si une intervention non prévue est souhaitable, l&apos;expliquer et attendre mon accord.</p>
        </div>

        <Callout type="warning" title="Consigne textuelle vs Restriction technique">
          Une instruction « Ne supprime rien » écrite dans un prompt guide le modèle mais ne constitue pas une barrière infaillible au niveau système. Combinez toujours vos prompts avec le mode lecture seule ou les garde-fous d&apos;exécution d&apos;outils de l&apos;IDE.
        </Callout>
      </section>

      {/* 5. Travaux pratiques & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Distinguer consignes positives et négatives
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Qualifier l'instruction"
            question="« Examine uniquement le fichier auth.js. » est une consigne :"
            options={['Positive', 'Négative']}
            correctIndex={0}
            explanation="Elle prescrit l'action à réaliser (examiner un fichier désigné) : c'est une instruction positive."
          />

          <QuickQuiz
            title="Question 2 — Qualifier l'instruction"
            question="« Ne supprime aucun fichier. » est une consigne :"
            options={['Positive', 'Négative']}
            correctIndex={1}
            explanation="Elle pose une interdiction stricte de comportement : c'est une instruction négative."
          />

          <QuickQuiz
            title="Question 3 — Qualifier l'instruction"
            question="« Présente les erreurs dans un tableau markdown. » est une consigne :"
            options={['Positive', 'Négative']}
            correctIndex={0}
            explanation="Elle prescrit la forme et la méthode de restitution des livrables : instruction positive."
          />

          <QuickQuiz
            title="Question 4 — Qualifier l'instruction"
            question="« N'installe aucune dépendance supplémentaire sans mon accord. » est une consigne :"
            options={['Positive', 'Négative']}
            correctIndex={1}
            explanation="Elle interdit l'ajout de packages dans le package.json : instruction négative."
          />
        </div>
      </section>
    </div>
  );
};
