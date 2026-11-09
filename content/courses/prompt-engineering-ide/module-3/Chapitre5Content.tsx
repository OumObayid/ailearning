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
          Chapitre 5 — Role Prompting
        </h1>
      </div>

      {/* 1. Une même demande, 3 regards */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. L&apos;impact du rôle sur l&apos;orientation de l&apos;analyse
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Face à un même fichier source <code>server.js</code>, l&apos;attribution du rôle modifie radicalement les priorités et l&apos;angle d&apos;examen :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Rôle 1 : Développeur Backend</span>
            <p className="text-xs text-slate-700">Examine l&apos;asynchronisme, la modularité des contrôleurs, le respect des promesses et la propreté du code.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Rôle 2 : Auditeur Sécurité</span>
            <p className="text-xs text-slate-700">Recherche les injections SQL, les variables sensibles exposées, les failles CORS et l&apos;absence de validation.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Rôle 3 : Testeur QA</span>
            <p className="text-xs text-slate-700">Identifie les cas limites, les valeurs nulles/undefined, les codes de retour HTTP 400/500 et les scénarios de test.</p>
          </div>
        </div>
      </section>

      {/* 2. Les 6 composantes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les six piliers d&apos;un rôle professionnel
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-2 text-sm text-slate-800 font-medium">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-disc list-inside">
            <li><strong>Identité :</strong> Métier exercé (ex: Ingénieur logiciel senior).</li>
            <li><strong>Expertise :</strong> Technologies ciblées (React, Node.js, OWASP).</li>
            <li><strong>Responsabilités :</strong> Missions dévolues (analyser, alerter, proposer).</li>
            <li><strong>Méthode :</strong> Démarche critique et justifiée par des preuves.</li>
            <li><strong>Limites :</strong> Actions formellement exclues (ne rien modifier).</li>
            <li><strong>Format :</strong> Structure et gabarit des livrables exigés.</li>
          </ul>
        </div>

        <Callout type="warning" title="Avertissement méthodologique">
          Écrire « Tu es le meilleur expert du monde » ne confère aucune intelligence magique au modèle. La qualité de la réponse découle de la précision des responsabilités, des contraintes et de la méthode imposée.
        </Callout>
      </section>

      {/* 3. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz Role Prompting
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Fonction réelle du rôle"
            question="Quel est l'effet technique premier d'un Role Prompting bien formulé ?"
            options={[
              'Augmenter la vitesse de calcul du GPU',
              'Orienter le vocabulaire, les critères de jugement et la profondeur d’analyse du modèle',
            ]}
            correctIndex={1}
            explanation="Le rôle active des sous-espaces sémantiques ciblés dans le réseau pour adopter la posture professionnelle demandée."
          />

          <QuickQuiz
            title="Question 2 — Rôle vs Pouvoir d'action"
            question="Attribuer le rôle « Administrateur système de production » autorise-t-il l'agent à effacer des bases de données ?"
            options={[
              'Oui, car le rôle d’administrateur possède tous les droits',
              'Non, le rôle oriente le raisonnement mais ne confère aucune autorisation technique d’action',
            ]}
            correctIndex={1}
            explanation="Le rôle professionnel est strictement décorrelé des permissions d'exécution accordées dans l'IDE."
          />
        </div>
      </section>
    </div>
  );
};

