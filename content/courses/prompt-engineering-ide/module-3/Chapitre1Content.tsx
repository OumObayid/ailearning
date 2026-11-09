'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Zero-shot Prompting
        </h1>
      </div>

      {/* 1. Définition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Qu&apos;est-ce que le Zero-shot Prompting ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le <strong>Zero-shot Prompting</strong> est une technique fondamentale qui consiste à demander à un grand modèle linguistique (LLM) d&apos;accomplir une tâche sans lui montrer aucune démonstration ni exemple préalable de résultat à imiter.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">1. Utilisateur</span>
            <p className="text-xs text-slate-700">Formule une instruction, un contexte et des contraintes sans exemple.</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">2. Modèle d&apos;IA</span>
            <p className="text-xs text-slate-700">Interprète la demande à partir de ses connaissances paramétriques.</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">3. Résultat</span>
            <p className="text-xs text-slate-700">Génère la réponse de manière autonome selon les directives fournies.</p>
          </div>
        </div>
      </section>

      {/* 2. Exemple Professionnel d'Audit */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Exemple professionnel : Audit technique Zero-shot
        </h2>
        <div className="rounded-2xl border-2 border-slate-300 bg-slate-900 text-slate-100 p-6 font-mono text-xs sm:text-sm space-y-2">
          <p className="text-xs uppercase font-extrabold text-indigo-400">[PROMPT ZERO-SHOT D&apos;AUDIT NODE.JS]</p>
          <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
{`RÔLE : Tu es un auditeur technique spécialisé dans Node.js et Express.js.
OBJECTIF : Réaliser un audit de sécurité et de robustesse du code transmis.
CONTEXTE : API backend de gestion de sessions utilisateurs.
ANALYSE ATTENDUE :
- Identifier les erreurs de logique et les failles de sécurité.
- Examiner la validation des données d'entrée et la gestion des exceptions.
- Vérifier la configuration des variables d'environnement.
CONTRAINTES :
- Ne pas inventer de problèmes non étayés par le code.
- Justifier chaque anomalie par l'extrait de code exact.
- Ne modifier aucun fichier et n'exécuter aucune commande.
FORMAT DE SORTIE :
Pour chaque anomalie : [Problème] • [Extrait source] • [Explication] • [Gravité] • [Recommandation].`}
          </pre>
        </div>

        <Callout type="tip" title="Économie de tokens">
          Le Zero-shot est la technique la plus économique en tokens car le prompt n&apos;est pas encombré par de longs exemples de démonstration.
        </Callout>
      </section>

      {/* 3. Zero-shot simple vs structuré */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Zero-shot simple vs Zero-shot structuré
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white space-y-2">
            <span className="text-xs font-black uppercase text-slate-700">A. Zero-shot simple (Texte libre)</span>
            <p className="font-mono text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-900">
              « Classe ces messages selon leur intention : information, réclamation ou assistance. »
            </p>
            <p className="text-xs text-slate-600">Rapide à écrire, mais la réponse textuelle est difficile à parser automatiquement par un backend.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-white space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">B. Zero-shot structuré (JSON strict)</span>
            <pre className="font-mono text-xs bg-indigo-50/50 p-3 rounded-xl border border-indigo-200 text-slate-900 whitespace-pre-wrap">
{`Classe le message dans l'une des catégories :
INFORMATION | RECLAMATION | ASSISTANCE
Retourne un JSON strict :
{"categorie": "...", "justification": "..."}`}
            </pre>
            <p className="text-xs text-slate-600">Directement consommable par une API Node.js ou une interface React.</p>
          </div>
        </div>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz Zero-shot
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Définition exacte"
            question="Qu'est-ce qui caractérise intrinsèquement un prompt Zero-shot ?"
            options={[
              'Il doit contenir moins de 10 mots',
              'Il ne fournit aucun exemple de réponse préalable au modèle',
              'Il nécessite un réentraînement des poids du réseau de neurones',
            ]}
            correctIndex={1}
            explanation="Zero-shot signifie « zéro exemple » dans le prompt. Le prompt peut être très long et détaillé du moment qu'il n'inclut aucune démonstration de résultat."
          />

          <QuickQuiz
            title="Question 2 — Limites du Zero-shot"
            question="Quelle est la principale faiblesse du Zero-shot sur des tâches métier complexes ?"
            options={[
              'Il consomme trop de tokens',
              'Le modèle peut varier sa formulation et interpréter librement la méthode attendue sans modèle de référence',
            ]}
            correctIndex={1}
            explanation="Sans exemple pour calibrer le format et la granularité, les sorties peuvent fluctuer d'une requête à l'autre."
          />
        </div>
      </section>
    </div>
  );
};

