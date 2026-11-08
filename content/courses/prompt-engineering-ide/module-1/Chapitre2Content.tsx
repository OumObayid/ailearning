'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Anatomie d&apos;un prompt professionnel
        </h1>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base font-semibold text-slate-950">
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre l&apos;architecture globale d&apos;un prompt professionnel.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier et maîtriser les 7 composants indispensables.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Organiser les instructions dans un ordre logique d&apos;exécution.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Construire un prompt adapté à un agent dans Antigravity.</span>
          </li>
        </ul>
      </section>

      {/* 2. Les 7 composants */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 7 composants fondamentaux
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">01</span>
              <span>RÔLE (ROLE)</span>
            </div>
            <p className="text-slate-800 text-sm font-medium">Définir l&apos;expertise technique, la posture et la fonction exacte de l&apos;agent.</p>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">02</span>
              <span>CONTEXTE (CONTEXT)</span>
            </div>
            <p className="text-slate-800 text-sm font-medium">Présenter l&apos;environnement technique (stack, packages, architecture).</p>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">03</span>
              <span>OBJECTIF (OBJECTIVE)</span>
            </div>
            <p className="text-slate-800 text-sm font-medium">Définir le résultat final à atteindre de façon mesurable.</p>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">04</span>
              <span>TÂCHES (TASKS)</span>
            </div>
            <p className="text-slate-800 text-sm font-medium">Décomposer le travail en une série d&apos;opérations concrètes et ordonnées.</p>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">05</span>
              <span>CONTRAINTES (CONSTRAINTS)</span>
            </div>
            <p className="text-slate-800 text-sm font-medium">Définir les règles de sécurité, interdictions et limites d&apos;accès.</p>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">06</span>
              <span>MÉTHODE (WORKFLOW)</span>
            </div>
            <p className="text-slate-800 text-sm font-medium">Spécifier l&apos;ordre précis des étapes et les points d&apos;arrêt (validation humaine).</p>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">07</span>
              <span>FORMAT DE SORTIE (OUTPUT)</span>
            </div>
            <p className="text-slate-800 text-sm font-medium">Spécifier la structure exacte du rapport, des schémas ou des livrables attendus.</p>
          </div>
        </div>
      </section>

      {/* 3. Exemple complet de prompt professionnel */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Exemple d&apos;application : Prompt d&apos;Audit Technique
        </h2>
        <div className="rounded-2xl border-2 border-slate-300 bg-slate-900 text-slate-100 p-6 space-y-4 font-mono text-sm">
          <p className="text-xs uppercase font-extrabold text-indigo-400 tracking-wider">[PROMPT PROFESSIONNEL — AUDIT TECHNIQUE ANTIGRAVITY]</p>
          <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
{`[RÔLE]
Tu es un ingénieur logiciel spécialisé en React, Node.js et sécurité informatique.

[CONTEXTE]
Je travaille sur une application existante utilisant React, Vite et Node.js.

[OBJECTIF]
Réaliser un audit technique du projet afin d'identifier les anomalies potentielles.

[TÂCHES]
1. Examiner l'architecture du projet.
2. Identifier les principaux composants.
3. Examiner les échanges frontend/backend.
4. Repérer les problèmes techniques.
5. Proposer des améliorations.

[CONTRAINTES]
- Ne modifier aucun fichier.
- Ne supprimer aucun fichier.
- Ne pas sortir du dossier du projet.
- Ne pas consulter les fichiers .env.
- Ne pas installer de dépendances.
- Ne pas exécuter de commandes sans autorisation.

[MÉTHODE]
1. Analyser les éléments accessibles.
2. Identifier les anomalies.
3. Documenter les observations.
4. Préparer les recommandations.
5. Attendre ma validation avant toute autre étape.

[FORMAT DE SORTIE]
Produire un rapport structuré comprenant :
- Architecture observée.
- Anomalies identifiées.
- Risques éventuels.
- Solutions recommandées.
- Conclusion.`}
          </pre>
        </div>
        <Callout type="warning" title="Remarque de sécurité fondamentale">
          Les instructions textuelles ne garantissent pas à elles seules le blocage technique absolu des actions. Dans un IDE comme Google Antigravity, il convient d&apos;activer en parallèle les permissions du bac à sable et les confirmations humaines pour l&apos;exécution d&apos;outils.
        </Callout>
      </section>

      {/* 4. Erreurs fréquentes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Erreurs fréquentes et conséquences
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Composant négligé</th>
                <th className="p-3.5 border border-slate-200">Erreur commise</th>
                <th className="p-3.5 border border-slate-200">Conséquence directe</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Rôle</td>
                <td className="p-3.5 border border-slate-200">Rôle imprécis (« Tu es un expert »)</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Réponse mal orientée ou trop vague</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Contexte</td>
                <td className="p-3.5 border border-slate-200">Contexte technique absent ou partiel</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Mauvaises hypothèses sur la stack ou les versions</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Objectif</td>
                <td className="p-3.5 border border-slate-200">Objectif flou (« Améliore le code »)</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Résultat impossible à mesurer ou évaluer</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Contraintes</td>
                <td className="p-3.5 border border-slate-200">Contraintes omises</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Modifications destructrices ou non souhaitées</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Méthode</td>
                <td className="p-3.5 border border-slate-200">Aucun workflow imposé</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Exécution anarchique et désorganisée</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Format</td>
                <td className="p-3.5 border border-slate-200">Structure de sortie libre</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Réponse verbeuse et difficile à parser</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Travaux pratiques & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz de validation
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Identifier l'expertise de l'agent"
            question="Quel composant structurel définit l'expertise et la fonction de l'agent IA ?"
            options={['Le Contexte', 'Le Rôle', "L'Objectif", 'Le Format de sortie']}
            correctIndex={1}
            explanation="Le composant RÔLE (Role) attribue la casquette, l'identité et le niveau d'expertise attendu."
          />

          <QuickQuiz
            title="Question 2 — Spécifier le résultat final"
            question="Quel composant décrit le résultat final recherché à la fin de la mission ?"
            options={["L'Objectif", 'Les Tâches', 'La Méthode', 'Les Contraintes']}
            correctIndex={0}
            explanation="L'OBJECTIF (Objective) définit le but mesurable à atteindre, tandis que les tâches décrivent le chemin pour y parvenir."
          />

          <QuickQuiz
            title="Question 3 — Définir les interdictions"
            question="Dans quel composant indique-t-on les fichiers que l'agent ne doit surtout pas modifier ni supprimer ?"
            options={['Le Format de sortie', 'Les Contraintes', 'Le Contexte', 'Les Tâches']}
            correctIndex={1}
            explanation="Les CONTRAINTES (Constraints) bornent l'action de l'agent en spécifiant les interdictions et limites de sécurité."
          />

          <QuickQuiz
            title="Question 4 — Ordonnancer les étapes"
            question="Quel composant définit l'ordre d'exécution des opérations et les étapes de validation ?"
            options={['La Méthode (Workflow)', 'Le Rôle', "L'Objectif", 'Le Format de sortie']}
            correctIndex={0}
            explanation="La MÉTHODE (Workflow) structure l'ordre d'intervention pas à pas pour éviter les sauts d'étapes non validés."
          />

          <QuickQuiz
            title="Question 5 — Structurer la restitution"
            question="Où définit-on la forme, les sections obligatoires et la présentation du rapport final ?"
            options={['Les Tâches', 'Le Contexte', 'Le Format de sortie (Output)', 'Le Rôle']}
            correctIndex={2}
            explanation="Le FORMAT DE SORTIE (Output) précise le gabarit du livrable (rapport markdown, tableau, code, etc.)."
          />
        </div>
      </section>
    </div>
  );
};
