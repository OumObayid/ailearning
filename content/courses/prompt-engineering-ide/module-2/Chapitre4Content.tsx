'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Définition des responsabilités
        </h1>
      </div>

      {/* 1. Les 5 Catégories de responsabilités */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 5 catégories de responsabilités
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">01. Analyse</span>
            <p className="text-xs text-slate-700">Examiner, comprendre, comparer et diagnostiquer (ex: routes API, fuites mémoire).</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">02. Conception</span>
            <p className="text-xs text-slate-700">Concevoir une architecture, structurer un schéma Zod ou planifier une refactorisation.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">03. Production</span>
            <p className="text-xs text-slate-700">Rédiger du code source, générer des tests Vitest ou produire des types TypeScript.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">04. Vérification</span>
            <p className="text-xs text-slate-700">Contrôler la cohérence, auditer les retours HTTP et valider les cas d&apos;erreurs.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1 sm:col-span-2 lg:col-span-2">
            <span className="text-xs font-black uppercase text-indigo-700">05. Compte rendu</span>
            <p className="text-xs text-slate-700">Restituer un rapport honnête avec localisation des anomalies, preuves et statut des tests.</p>
          </div>
        </div>
      </section>

      {/* 2. Distinction tripartite */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Distinguer Responsabilité, Tâche et Autorisation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Notion</th>
                <th className="p-3.5 border border-slate-200">Question résolue</th>
                <th className="p-3.5 border border-slate-200">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Responsabilité</td>
                <td className="p-3.5 border border-slate-200">De quoi doit-il s&apos;occuper durablement ?</td>
                <td className="p-3.5 border border-slate-200">« Garantir la sécurité et la conformité des routes API »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Tâche</td>
                <td className="p-3.5 border border-slate-200">Que doit-il faire maintenant ?</td>
                <td className="p-3.5 border border-slate-200">« Examiner la route /api/login dans auth.js »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Autorisation</td>
                <td className="p-3.5 border border-slate-200">Qu&apos;a-t-il le droit de faire concrètement ?</td>
                <td className="p-3.5 border border-slate-200">« Lire le fichier, sans modifier le code source »</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Responsabilités vérifiables */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Rendre une responsabilité vérifiable
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-3">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-rose-700">Consigne invérifiable :</span>
            <p className="font-mono text-sm bg-white p-3 rounded-xl border border-rose-200 text-slate-900">
              « Vérifie la sécurité du projet. »
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-emerald-700">Responsabilité vérifiable (professionnelle) :</span>
            <pre className="font-mono text-sm bg-white p-4 rounded-xl border border-emerald-300 text-slate-900 whitespace-pre-wrap">
{`Pour chaque endpoint examiné, indique :
- Chemin d'accès et méthode HTTP
- Contrôles de validation Zod observés
- Mécanismes d'authentification identifiés
- Risques de fuite de données
- Recommandation d'atténuation`}
            </pre>
          </div>
        </div>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz des responsabilités
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Responsabilité vs Autorisation"
            question="Être responsable d'identifier les failles de sécurité donne-t-il le droit d'appliquer immédiatement les patchs sur le code ?"
            options={[
              'Oui, car la responsabilité implique le pouvoir de modifier',
              'Non, la responsabilité d’analyse est distincte de l’autorisation de modifier',
            ]}
            correctIndex={1}
            explanation="La responsabilité définit ce dont l'agent doit s'occuper, tandis que l'autorisation borne les actions qu'il a le droit d'exécuter."
          />

          <QuickQuiz
            title="Question 2 — Priorité des responsabilités"
            question="Que doit faire un agent lorsque ses responsabilités secondaires entrent en conflit avec sa responsabilité principale ?"
            options={[
              'Donner la priorité absolue à sa responsabilité principale',
              'Traiter les tâches secondaires en premier pour aller plus vite',
            ]}
            correctIndex={0}
            explanation="Les responsabilités secondaires complètent l'agent mais ne doivent jamais détourner son attention de sa mission prioritaire."
          />
        </div>
      </section>
    </div>
  );
};
