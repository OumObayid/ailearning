'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Rôle, objectif, contraintes et résultats attendus
        </h1>
      </div>

      {/* 1. Le Rôle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Le rôle (Role) : posture et spécialisation
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le rôle définit la fonction, la spécialisation et la posture professionnelle que l&apos;on demande au modèle d&apos;adopter. Il oriente le vocabulaire, la rigueur critique et la profondeur d&apos;analyse.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Élément du rôle</th>
                <th className="p-3.5 border border-slate-200">Fonction pédagogique</th>
                <th className="p-3.5 border border-slate-200">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Identité</td>
                <td className="p-3.5 border border-slate-200">Définir la fonction de l&apos;agent</td>
                <td className="p-3.5 border border-slate-200">« Tu es un auditeur de code... »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Spécialisation</td>
                <td className="p-3.5 border border-slate-200">Délimiter le domaine d&apos;expertise</td>
                <td className="p-3.5 border border-slate-200">« ...spécialisé en architectures React &amp; Node.js »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Compétences</td>
                <td className="p-3.5 border border-slate-200">Préciser les connaissances attendues</td>
                <td className="p-3.5 border border-slate-200">« Sécurité OWASP, API REST, performance V8 »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Posture</td>
                <td className="p-3.5 border border-slate-200">Définir l&apos;attitude professionnelle</td>
                <td className="p-3.5 border border-slate-200">« Adopte une approche méthodique et critique »</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="note" title="Règle d'or">
          Le rôle oriente le modèle, mais ne lui attribue pas magiquement des permissions ou des outils supplémentaires dans le système.
        </Callout>
      </section>

      {/* 2. L'Objectif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. L&apos;objectif (Objective) : la destination
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          L&apos;objectif décrit précisément ce que l&apos;agent doit accomplir. Il répond à la question : <em>« Quel résultat final voulons-nous obtenir ? »</em>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 space-y-2">
            <span className="text-xs font-black uppercase text-rose-700">Formulation vague (à bannir)</span>
            <p className="text-slate-900 font-mono text-sm bg-white p-3 rounded-xl border border-rose-200">
              « Améliore mon application. »
            </p>
            <p className="text-xs text-rose-800">
              L&apos;agent ne sait pas s&apos;il doit modifier le style, refactoriser, optimiser la base ou corriger des bugs.
            </p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 space-y-2">
            <span className="text-xs font-black uppercase text-emerald-700">Formulation professionnelle (précise)</span>
            <p className="text-slate-900 font-mono text-sm bg-white p-3 rounded-xl border border-emerald-200">
              « Identifier les failles de sécurité de l&apos;API Node.js, évaluer leur criticité et proposer des patchs. »
            </p>
            <p className="text-xs text-emerald-800">
              L&apos;objectif est délimité, mesurable et vérifiable par des critères clairs.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-5">
          <h3 className="text-base font-black text-indigo-950 mb-1">Ne pas confondre Objectif et Tâches</h3>
          <p className="text-sm font-medium text-slate-800">
            <strong>L&apos;objectif</strong> indique la <em>destination finale</em> (ex: évaluer la conformité de l&apos;API).
            <br />
            <strong>Les tâches</strong> définissent le <em>chemin d&apos;exécution</em> (ex: 1. inspecter les routes, 2. tester les validations, 3. auditer le JWT).
          </p>
        </div>
      </section>

      {/* 3. Les Contraintes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les contraintes (Constraints) : les barrières de protection
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un IDE où l&apos;agent dispose d&apos;outils de manipulation de fichiers et d&apos;accès au terminal, les contraintes sont des gardes-fous capitaux.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Périmètre &amp; Lecture</span>
            <p className="text-xs text-slate-700">« Ne pas sortir du dossier <code>src/</code>. Ne jamais consulter les fichiers <code>.env*</code>. »</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Modification &amp; Delete</span>
            <p className="text-xs text-slate-700">« Ne modifier aucun fichier. Ne supprimer aucun composant existant. »</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Terminal &amp; Packages</span>
            <p className="text-xs text-slate-700">« N&apos;exécuter aucune commande système. Ne pas installer de dépendances npm. »</p>
          </div>
        </div>
      </section>

      {/* 4. Les Résultats attendus */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Les résultats attendus (Expected Output)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Pour rendre les audits exploitables et fiables, imposez une structure récurrente comprenant la <strong>preuve technique</strong> :
        </p>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 font-mono text-sm space-y-1 text-slate-900">
          <p><strong>PROBLÈME :</strong> Description concise de l&apos;anomalie.</p>
          <p><strong>FICHIER :</strong> Chemin relatif et numéro de ligne concerné.</p>
          <p><strong>GRAVITÉ :</strong> Faible | Moyenne | Élevée | Critique.</p>
          <p><strong>CAUSE :</strong> Explication technique rigoureuse du mécanisme sous-jacent.</p>
          <p><strong>SOLUTION :</strong> Snippet ou proposition de correction sans application directe.</p>
          <p><strong>PREUVE :</strong> Extrait de code exact justifiant le diagnostic.</p>
        </div>
      </section>

      {/* 5. Travaux pratiques & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Identifier les quatre composants
        </h2>

        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Qualifier l'instruction"
            question="À quelle catégorie appartient : « Tu es un architecte logiciel spécialisé en microservices » ?"
            options={['Rôle', 'Objectif', 'Contrainte', 'Résultat attendu']}
            correctIndex={0}
            explanation="Cette instruction attribue le titre, le profil et la posture professionnelle : c'est un RÔLE."
          />

          <QuickQuiz
            title="Question 2 — Qualifier l'instruction"
            question="À quelle catégorie appartient : « Identifier les problèmes de performance de l'application » ?"
            options={['Rôle', 'Objectif', 'Contrainte', 'Résultat attendu']}
            correctIndex={1}
            explanation="Cette consigne définit le but et la destination de la mission : c'est l'OBJECTIF."
          />

          <QuickQuiz
            title="Question 3 — Qualifier l'instruction"
            question="À quelle catégorie appartient : « Ne modifier aucun fichier sans mon autorisation explicite » ?"
            options={['Rôle', 'Objectif', 'Contrainte', 'Résultat attendu']}
            correctIndex={2}
            explanation="Cette consigne pose une interdiction et une limite stricte d'intervention : c'est une CONTRAINTE."
          />

          <QuickQuiz
            title="Question 4 — Qualifier l'instruction"
            question="À quelle catégorie appartient : « Produire un rapport avec les anomalies, les preuves et les solutions » ?"
            options={['Rôle', 'Objectif', 'Contrainte', 'Résultat attendu']}
            correctIndex={3}
            explanation="Cette consigne spécifie la nature et la forme du livrable final : c'est le RÉSULTAT ATTENDU."
          />
        </div>
      </section>
    </div>
  );
};
