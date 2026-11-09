'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { ContextWindowSimulator } from '@/components/interactive/ContextWindowSimulator';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Tokens et fenêtre de contexte
        </h1>
      </div>

      {/* 1. Qu'est-ce qu'un token ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Qu&apos;est-ce qu&apos;un token ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un <strong>token</strong> est l&apos;unité atomique de texte utilisée par un modèle d&apos;IA pour découper, analyser et générer des données. Contrairement à une idée reçue, un token ne correspond pas strictement à un mot ou à un caractère.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Mots fréquents</span>
            <p className="text-sm font-semibold text-slate-900">1 mot = 1 token</p>
            <p className="text-xs text-slate-600">Ex: « table », « code », « create »</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Mots complexes ou accentués</span>
            <p className="text-sm font-semibold text-slate-900">1 mot = plusieurs tokens</p>
            <p className="text-xs text-slate-600">Ex: « développement » découpe en 2 à 3 fragments</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Code &amp; Syntaxe</span>
            <p className="text-sm font-semibold text-slate-900">Identifiants, camelCase, symboles</p>
            <p className="text-xs text-slate-600">Ex: <code>getUserById()</code> génère 4 à 5 tokens</p>
          </div>
        </div>
      </section>

      {/* 2. La Fenêtre de Contexte */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. La fenêtre de contexte (Context Window)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          La fenêtre de contexte représente le volume maximal de tokens qu&apos;un modèle peut ingérer et maintenir actif lors d&apos;une inférence unique.
        </p>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 space-y-3">
          <p className="text-sm font-black text-slate-900 uppercase">Ce que contient la fenêtre de contexte dans votre IDE :</p>
          <ul className="space-y-2 text-sm text-slate-800">
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
              <span><strong>Instructions système &amp; règles d&apos;agent :</strong> Vos fichiers de configuration et consignes globales.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
              <span><strong>Historique de la conversation :</strong> Tous les échanges précédents dans la session active.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shrink-0" />
              <span><strong>Fichiers et extraits de code injectés :</strong> Contenu des fichiers ouverts, @mentions et recherches sémantiques.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span><strong>Retours d&apos;outils et logs :</strong> Sorties de terminal, erreurs de tests et listes de répertoires.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Pourquoi les agents oublient */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Pourquoi un agent IA oublie-t-il des consignes ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-black uppercase text-rose-700">1. Surcharge du contexte</span>
            <p className="text-sm text-slate-800 font-medium">
              Si trop de fichiers volumineux sont injectés, les instructions initiales sortent du champ d&apos;attention optimal du modèle.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-black uppercase text-rose-700">2. Résumés &amp; Tronquage d&apos;historique</span>
            <p className="text-sm text-slate-800 font-medium">
              L&apos;IDE résume automatiquement les vieux messages pour faire de la place, entraînant la perte des détails d&apos;origine.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-black uppercase text-rose-700">3. Dilution de l&apos;attention</span>
            <p className="text-sm text-slate-800 font-medium">
              Dans de très longs prompts verbeux, les règles capitales sont noyées au milieu de formulations secondaires.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-black uppercase text-rose-700">4. Instructions contradictoires</span>
            <p className="text-sm text-slate-800 font-medium">
              Deux ordres incompatibles forcent l&apos;agent à ignorer l&apos;un des deux au hasard des probabilités d&apos;échantillonnage.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Simulateur Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Simulateur interactif de fenêtre de contexte
        </h2>
        <ContextWindowSimulator />
      </section>

      {/* 5. Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz de validation
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Nature d'un token"
            question="Un token correspond-il toujours à un mot entier dans toutes les langues ?"
            options={['Oui, 1 mot = exactement 1 token', 'Non, un token peut être un fragment de mot, un mot ou un symbole']}
            correctIndex={1}
            explanation="Les modèles utilisent des algorithmes de sous-mots (ex: Byte-Pair Encoding). Les mots rares, le code et les accents sont scindés en plusieurs tokens."
          />

          <QuickQuiz
            title="Question 2 — Capacité de la fenêtre"
            question="Que représente la fenêtre de contexte d'un LLM ?"
            options={[
              'La mémoire permanente stockée sur le disque dur',
              "La quantité maximale de tokens pris en compte simultanément lors d'une requête",
              "Le nombre maximal de fichiers présents dans le workspace de l'IDE",
            ]}
            correctIndex={1}
            explanation="La fenêtre de contexte est la capacité de travail éphémère du modèle pour traiter prompt, historique et code en une seule passe."
          />

          <QuickQuiz
            title="Question 3 — Optimisation de contexte"
            question="Quelle pratique permet de prévenir efficacement la saturation de la fenêtre de contexte ?"
            options={[
              'Injecter systématiquement tous les fichiers du projet dans chaque prompt',
              'Fournir uniquement les fichiers et extraits ciblés nécessaires à la mission',
              'Répéter trois fois toutes les instructions dans chaque message',
            ]}
            correctIndex={1}
            explanation="Isoler le contexte pertinent permet d'économiser les tokens et de maintenir l'attention maximale du modèle sur le problème."
          />
        </div>
      </section>
    </div>
  );
};
