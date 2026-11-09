'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Définition des limites d&apos;intervention
        </h1>
      </div>

      {/* 1. Les 3 Niveaux d'action */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les trois régimes d&apos;intervention
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 space-y-2">
            <span className="text-xs font-black uppercase text-emerald-800">Niveau 1 — Actions Autorisées</span>
            <p className="text-sm font-bold text-slate-950">Exécution libre dans le périmètre</p>
            <p className="text-xs text-slate-700">Lire un composant, analyser les routes Express, dresser un diagnostic, rédiger un rapport dans le chat.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/50 space-y-2">
            <span className="text-xs font-black uppercase text-amber-800">Niveau 2 — Actions Conditionnelles</span>
            <p className="text-sm font-bold text-slate-950">Validation préalable requise</p>
            <p className="text-xs text-slate-700">Modifier un fichier de code, installer un package npm, exécuter une commande terminal, migrer la base.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-rose-300 bg-rose-50/50 space-y-2">
            <span className="text-xs font-black uppercase text-rose-800">Niveau 3 — Actions Interdites</span>
            <p className="text-sm font-bold text-slate-950">Exclues catégoriquement</p>
            <p className="text-xs text-slate-700">Explorer les dossiers personnels, chercher des documents hors workspace, divulguer des clés secrètes .env.</p>
          </div>
        </div>
      </section>

      {/* 2. Tableau de classification */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Grille opérationnelle de classification des opérations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Opération concrète</th>
                <th className="p-3.5 border border-slate-200">Classification</th>
                <th className="p-3.5 border border-slate-200">Règle applicable</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Lire et analyser un fichier React</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Autorisée</td>
                <td className="p-3.5 border border-slate-200">Directement dans le workspace du projet.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Proposer un diff de correction</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Autorisée</td>
                <td className="p-3.5 border border-slate-200">Dans la réponse du chat uniquement.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Modifier le code d&apos;un fichier</td>
                <td className="p-3.5 border border-slate-200 text-amber-700 font-bold">Conditionnelle</td>
                <td className="p-3.5 border border-slate-200">Présentation du plan &rarr; Accord explicite.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Installer une dépendance npm</td>
                <td className="p-3.5 border border-slate-200 text-amber-700 font-bold">Conditionnelle</td>
                <td className="p-3.5 border border-slate-200">Explication de l&apos;utilité &rarr; Validation humaine.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Explorer C:\Users\Documents</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">Interdite</td>
                <td className="p-3.5 border border-slate-200">Refus immédiat : transmission manuelle requise.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Procédure d'arrêt */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Procédure d&apos;arrêt face à un dépassement de limite
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-900 text-slate-100 p-6 font-mono text-sm space-y-2">
          <p className="text-xs uppercase font-extrabold text-indigo-400">[PROTOCOLE D&apos;ARRÊT IMMÉDIAT]</p>
          <pre className="whitespace-pre-wrap text-slate-200">
{`Lorsqu'une tâche nécessite une action dépassant tes autorisations :
1. Gèle immédiatement l'opération concernée.
2. Explique précisément pourquoi cette action dépasse le cadre initial.
3. Désigne les fichiers ou dépendances affectés.
4. Présente les risques potentiels.
5. Attends une autorisation explicite et ciblée avant de reprendre.`}
          </pre>
        </div>

        <Callout type="warning" title="Principe du moindre privilège">
          Moins l&apos;agent possède de permissions superflues, plus le risque d&apos;accident irréversible est réduit. Ne lui accordez que les accès strictement requis par sa mission.
        </Callout>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz des limites
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Dépassement de mission"
            question="Vous demandez : « Analyse les perfs de mon app React ». L'agent découvre un composant lent. Que doit-il faire ?"
            options={[
              'Réécrire immédiatement le composant pour optimiser le temps de rendu',
              'Présenter son diagnostic et proposer l’optimisation sans modifier le code',
            ]}
            correctIndex={1}
            explanation="La demande portait sur l'analyse. Passer à l'exécution nécessite une proposition puis un accord préalable."
          />

          <QuickQuiz
            title="Question 2 — Formule carte blanche"
            question="Si un utilisateur impatient écrit : « Fais tout ce qu'il faut, tu as carte blanche », l'agent peut-il explorer d'autres projets sur le disque ?"
            options={[
              'Oui, car carte blanche annule toutes les restrictions',
              'Non, une formule vague ne constitue jamais une autorisation de violer les interdictions de périmètre',
            ]}
            correctIndex={1}
            explanation="Les autorisations doivent être précises, ciblées et limitées dans leur objet. Une consigne vague ne lève pas les sécurités."
          />
        </div>
      </section>
    </div>
  );
};

