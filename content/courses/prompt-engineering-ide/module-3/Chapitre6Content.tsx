'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Contextual Prompting
        </h1>
      </div>

      {/* 1. Les 8 Composants du Contexte */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 8 composants d&apos;un contexte professionnel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="font-black text-indigo-700 uppercase">1. Contexte général</span>
            <p className="text-slate-600">Type d&apos;application (SaaS commercial, outil interne).</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="font-black text-indigo-700 uppercase">2. Contexte technique</span>
            <p className="text-slate-600">Stack : React 19, Node.js 22, Express, MySQL.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="font-black text-indigo-700 uppercase">3. Contexte fonctionnel</span>
            <p className="text-slate-600">Rôle métier : gestion des commandes et factures.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="font-black text-indigo-700 uppercase">4. Contexte utilisateur</span>
            <p className="text-slate-600">Cible de restitution : ingénieur senior ou débutant.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="font-black text-indigo-700 uppercase">5. Contexte mission</span>
            <p className="text-slate-600">Objet immédiat : audit de la route /api/login.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="font-black text-indigo-700 uppercase">6. Contexte données</span>
            <p className="text-slate-600">Éléments réellement fournis dans le prompt.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="font-black text-indigo-700 uppercase">7. Contexte contraintes</span>
            <p className="text-slate-600">Limites : lecture seule, zéro modification.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="font-black text-indigo-700 uppercase">8. Contexte temporel</span>
            <p className="text-slate-600">Version du code et état d&apos;avancement.</p>
          </div>
        </div>
      </section>

      {/* 2. Distinction tripartite */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Distinguer Contexte, Instruction et Données
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Élément</th>
                <th className="p-3.5 border border-slate-200">Rôle</th>
                <th className="p-3.5 border border-slate-200">Exemple</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Contexte</td>
                <td className="p-3.5 border border-slate-200">Explique la situation et l&apos;environnement</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">« Application e-commerce React + Express »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Instruction</td>
                <td className="p-3.5 border border-slate-200">Prescrit l&apos;action à accomplir</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">« Auditer la validation des entrées »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Données</td>
                <td className="p-3.5 border border-slate-200">Fournit le matériel source à traiter</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">L&apos;extrait de code source de la route</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="note" title="Règle essentielle">
          Le contexte n&apos;est pas une autorisation d&apos;agir. Dire à un agent « Tu travailles sur mon projet » ne lui donne aucune permission d&apos;explorer librement le disque ou de modifier les fichiers.
        </Callout>
      </section>

      {/* 3. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz Contexte
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Contexte absent"
            question="Vous demandez : « Améliore la gestion des utilisateurs ». Pourquoi cette demande sans contexte est-elle fragile ?"
            options={[
              'L’IA refuse de répondre aux requêtes de moins de 100 tokens',
              'L’IA ignore s’il s’agit d’un portfolio, d’un e-commerce ou d’un CRM et peut proposer une architecture inadaptée',
            ]}
            correctIndex={1}
            explanation="Sans contexte fonctionnel et technique, le modèle comble les vides par des hypothèses statistiques souvent inadaptées."
          />

          <QuickQuiz
            title="Question 2 — Informations contradictoires dans le contexte"
            question="Si le contexte indique Express.js mais que le code transmis importe Fastify, quelle doit être la réaction de l'agent ?"
            options={[
              'Choisir Express.js sans rien dire',
              'Signaler la contradiction et demander confirmation de la technologie réellement utilisée',
            ]}
            correctIndex={1}
            explanation="Un agent professionnel ne choisit jamais arbitrairement entre deux sources divergentes : il demande une clarification."
          />
        </div>
      </section>
    </div>
  );
};

