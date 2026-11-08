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
          Chapitre 8 — Instructions permanentes et ponctuelles
        </h1>
      </div>

      {/* 1. Définitions et Comparaison */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Comparaison fondamentale : Cadre vs Mission
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Instruction Permanente</th>
                <th className="p-3.5 border border-slate-200">Instruction Ponctuelle</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Rôle</td>
                <td className="p-3.5 border border-slate-200">Définit le comportement général et durable</td>
                <td className="p-3.5 border border-slate-200">Définit une mission précise et immédiate</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Portée</td>
                <td className="p-3.5 border border-slate-200">S&apos;applique à toutes les tâches futures</td>
                <td className="p-3.5 border border-slate-200">S&apos;applique uniquement au prompt courant</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Contenu</td>
                <td className="p-3.5 border border-slate-200">Périmètre, sécurité, autorisations, posture</td>
                <td className="p-3.5 border border-slate-200">Fichiers ciblés, opération à faire, livrable</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Fréquence</td>
                <td className="p-3.5 border border-slate-200">Évolue rarement (configurée une fois)</td>
                <td className="p-3.5 border border-slate-200">Change à chaque nouveau message</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. L'architecture en 8 parties */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. L&apos;architecture professionnelle en 8 parties des instructions permanentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Partie 1 — Identité &amp; Rôle</span>
            <p className="text-xs text-slate-700">Spécialité technique de l&apos;agent (ex: ingénieur fullstack React / Node.js).</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Partie 2 — Mission Générale</span>
            <p className="text-xs text-slate-700">Responsabilité globale (analyser, diagnostiquer et accompagner sans casser).</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Partie 3 — Périmètre de travail</span>
            <p className="text-xs text-slate-700">Restrictions géographiques strictes (uniquement le workspace du projet ouvert).</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Partie 4 — Gestion des documents</span>
            <p className="text-xs text-slate-700">Attendre que l&apos;utilisateur transmette les pièces, ne jamais chercher sur tout le disque.</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Partie 5 — Autorisations</span>
            <p className="text-xs text-slate-700">Actions permises en lecture vs interdiction d&apos;écriture/delete sans accord explicite.</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Partie 6 — Méthode de travail</span>
            <p className="text-xs text-slate-700">Workflow obligatoire : Diagnostic &rarr; Proposition &rarr; Validation humaine &rarr; Action.</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Partie 7 — Ambiguïtés &amp; Conflits</span>
            <p className="text-xs text-slate-700">Interdiction de deviner une permission en cas de doute ; suspension et clarification.</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Partie 8 — Format des réponses</span>
            <p className="text-xs text-slate-700">Gabarit uniforme de restitution (problème, fichier/ligne, criticité, solution, preuve).</p>
          </div>
        </div>
      </section>

      {/* 3. Organisation dans Antigravity */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Structure modulaire des règles dans le projet
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-900 text-slate-100 p-6 font-mono text-sm space-y-2">
          <p className="text-xs uppercase font-extrabold text-indigo-400">[ARBORESCENCE RECOMMANDÉE]</p>
          <pre className="whitespace-pre-wrap text-slate-300">
{`mon-projet/
├── .agent/
│   └── rules/
│       ├── general.md       # Rôle, posture et méthode générale
│       ├── security.md      # Permissions, interdictions et terminal
│       └── development.md   # Conventions TypeScript, React et styling
├── src/
├── package.json
└── README.md`}
          </pre>
        </div>
        <Callout type="tip" title="Bénéfice immédiat">
          Cette séparation évite de polluer chaque prompt de chat avec 40 lignes de règles de sécurité. Vos prompts ponctuels restent courts, ciblés et consomment un minimum de tokens.
        </Callout>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Identifier le type d&apos;instruction
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Qualifier la consigne"
            question="« Ne modifie aucun fichier sans autorisation explicite » doit être placé dans :"
            options={['Les instructions permanentes', 'Les instructions ponctuelles']}
            correctIndex={0}
            explanation="C'est une règle de sécurité durable qui s'applique à toutes les interventions de l'agent : instruction permanente."
          />

          <QuickQuiz
            title="Question 2 — Qualifier la consigne"
            question="« Analyse le composant Login.jsx et vérifie la validation Zod » doit être placé dans :"
            options={['Les instructions permanentes', 'Les instructions ponctuelles']}
            correctIndex={1}
            explanation="Cette consigne cible une tâche spécifique sur un fichier précis à un instant T : instruction ponctuelle."
          />
        </div>
      </section>
    </div>
  );
};
