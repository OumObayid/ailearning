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
          Chapitre 4 — Prompt Decomposition
        </h1>
      </div>

      {/* 1. Les 4 Méthodes de décomposition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 4 méthodes de décomposition de requêtes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">1. Décomposition séquentielle</span>
            <p className="text-sm font-bold text-slate-950">Chaque étape dépend du résultat précédent</p>
            <p className="text-xs text-slate-700">Comprendre le projet &rarr; Extraire les routes &rarr; Auditer la sécurité &rarr; Dresser le rapport.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">2. Décomposition parallèle</span>
            <p className="text-sm font-bold text-slate-950">Sous-tâches indépendantes traitées en même temps</p>
            <p className="text-xs text-slate-700">Auditer l&apos;authentification, auditer la base SQL et auditer les styles CSS simultanément.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">3. Décomposition hiérarchique</span>
            <p className="text-sm font-bold text-slate-950">Objectif global &rarr; Lots &rarr; Tâches unitaires</p>
            <p className="text-xs text-slate-700">Application complète divisée en Backend Express, Frontend React et Pipeline CI/CD.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">4. Décomposition conditionnelle</span>
            <p className="text-sm font-bold text-slate-950">L&apos;étape suivante varie selon le résultat obtenu</p>
            <p className="text-xs text-slate-700">Si erreur de syntaxe &rarr; alerter immédiatement. Si syntaxe valide &rarr; analyser la sécurité.</p>
          </div>
        </div>
      </section>

      {/* 2. Exemple de pipeline séquentiel */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 6 éléments indispensables d&apos;une sous-tâche
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-2 text-sm text-slate-800 font-medium">
          <ul className="space-y-1.5 list-disc list-inside">
            <li><strong>L&apos;objectif général :</strong> Le but final du système complet.</li>
            <li><strong>Le sous-objectif :</strong> Le périmètre exact dévolu à ce prompt unique.</li>
            <li><strong>Les données d&apos;entrée :</strong> Le texte ou code transmis (sans invention).</li>
            <li><strong>Le livrable attendu :</strong> Structure du résultat intermédiaire.</li>
            <li><strong>Les critères de validation :</strong> Règles prouvant que l&apos;étape est réussie.</li>
            <li><strong>La condition de passage :</strong> Interdiction de continuer si l&apos;étape précédente a échoué.</li>
          </ul>
        </div>
      </section>

      {/* 3. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz de décomposition
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Risque des prompts monolithiques"
            question="Quel est le risque majeur d'un prompt unique demandant : « Comprends, audite, corrige, réorganise et teste mon application » ?"
            options={[
              'L’IA refuse d’exécuter le prompt par manque de tokens',
              'L’IA mélange l’analyse et l’exécution, oublie des contraintes et propage des erreurs non détectées',
            ]}
            correctIndex={1}
            explanation="La surcharge d'objectifs hétérogènes empêche le contrôle des étapes intermédiaires et multiplie les hallucinations."
          />

          <QuickQuiz
            title="Question 2 — Condition de passage"
            question="Dans une décomposition séquentielle, que doit faire le système si l'étape d'extraction des routes ne renvoie aucun fichier ?"
            options={[
              'Inventer des routes probables pour continuer l’audit',
              'Arrêter le passage à l’étape suivante et signaler l’absence des données nécessaires',
            ]}
            correctIndex={1}
            explanation="Une condition de passage stricte gèle la chaîne pour éviter que les prompts suivants ne travaillent sur du vide."
          />
        </div>
      </section>
    </div>
  );
};

