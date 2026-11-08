'use client';

import React, { useState } from 'react';

interface ToolCallStep {
  stepNumber: number;
  actor: 'User' | 'Node.js Backend' | 'Gemini 2.5' | 'Zod & Database';
  title: string;
  description: string;
  payload?: Record<string, unknown> | string;
}

export const FunctionCallingProtocolLab: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [userQuery] = useState<string>(
    'Quel est le solde du compte client #8412 et a-t-il des factures impayées ?'
  );

  const steps: ToolCallStep[] = [
    {
      stepNumber: 1,
      actor: 'User',
      title: 'Question en langage naturel',
      description: 'L\'utilisateur formule sa demande nécessitant des données privées en direct.',
      payload: userQuery,
    },
    {
      stepNumber: 2,
      actor: 'Node.js Backend',
      title: 'Envoi du prompt et des schémas d\'outils',
      description: 'Le serveur transmet le prompt accompagné de la déclaration formelle des outils disponibles.',
      payload: {
        tools: [
          {
            name: 'getAccountBalance',
            description: 'Récupère le solde comptable actuel d\'un compte client',
            parameters: { type: 'object', properties: { accountId: { type: 'number' } }, required: ['accountId'] },
          },
          {
            name: 'getUnpaidInvoices',
            description: 'Vérifie si le client possède des factures échues impayées',
            parameters: { type: 'object', properties: { accountId: { type: 'number' } }, required: ['accountId'] },
          },
        ],
      },
    },
    {
      stepNumber: 3,
      actor: 'Gemini 2.5',
      title: 'Détection du besoin & Émission du Function Call',
      description: 'Gemini suspend la réponse textuelle et émet un appel de fonction structuré en JSON.',
      payload: {
        functionCalls: [
          {
            name: 'getAccountBalance',
            args: { accountId: 8412 },
          },
        ],
      },
    },
    {
      stepNumber: 4,
      actor: 'Zod & Database',
      title: 'Validation Zod & Exécution SQL Sécurisée',
      description: 'Node.js valide le type de l\'argument accountId avec Zod et exécute la fonction TypeScript liée.',
      payload: {
        sqlQuery: 'SELECT balance, currency FROM accounts WHERE id = ?',
        params: [8412],
        result: { accountId: 8412, balance: 2450.75, currency: 'EUR', status: 'active' },
      },
    },
    {
      stepNumber: 5,
      actor: 'Node.js Backend',
      title: 'Transmission du résultat à Gemini',
      description: 'Le serveur renvoie la charge utile SQL dans un message de rôle "function_response".',
      payload: {
        role: 'tool',
        response: {
          name: 'getAccountBalance',
          content: { accountId: 8412, balance: 2450.75, currency: 'EUR' },
        },
      },
    },
    {
      stepNumber: 6,
      actor: 'Gemini 2.5',
      title: 'Deuxième appel d\'outil (Factures impayées)',
      description: 'Gemini constate qu\'il lui manque la seconde information pour répondre complètement.',
      payload: {
        functionCalls: [
          {
            name: 'getUnpaidInvoices',
            args: { accountId: 8412 },
          },
        ],
      },
    },
    {
      stepNumber: 7,
      actor: 'Zod & Database',
      title: 'Résolution du second outil',
      description: 'Interrogation de la table des factures échues.',
      payload: {
        sqlQuery: 'SELECT COUNT(*) as unpaidCount FROM invoices WHERE account_id = ? AND status = "overdue"',
        result: { unpaidCount: 0, overdueTotal: 0 },
      },
    },
    {
      stepNumber: 8,
      actor: 'Gemini 2.5',
      title: 'Synthèse finale rédigée pour l\'utilisateur',
      description: 'Toutes les données étant rassemblées, Gemini formule sa réponse finale en langage naturel.',
      payload:
        'Le compte client #8412 dispose actuellement d\'un solde créditeur de 2 450,75 €. Aucune facture n\'est en retard de paiement.',
    },
  ];

  const currentStep = steps[currentStepIndex];

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Le Protocole Function Calling de Gemini
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Parcourez pas à pas les 8 étapes du dialogue bidirectionnel entre le LLM et votre backend Node.js.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentStepIndex(0)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            Recommencer
          </button>
        </div>
      </div>

      {/* Barre de navigation des 8 étapes */}
      <div className="mb-6 grid grid-cols-4 gap-2 md:grid-cols-8">
        {steps.map((st, idx) => (
          <button
            key={st.stepNumber}
            onClick={() => setCurrentStepIndex(idx)}
            className={`rounded-lg border p-2 text-center transition ${
              currentStepIndex === idx
                ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-950/50 dark:text-white ring-2 ring-indigo-500 shadow-sm'
                : currentStepIndex > idx
                ? 'border-emerald-300 bg-emerald-50/50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300'
                : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-950'
            }`}
          >
            <div className="text-sm font-bold">Étape {st.stepNumber}</div>
            <div className="truncate text-sm opacity-80">{st.actor}</div>
          </button>
        ))}
      </div>

      {/* Visualisation de l'étape active */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="rounded bg-indigo-600 px-2 py-0.5 text-sm font-bold text-white">
              Étape {currentStep.stepNumber} / 8
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {currentStep.title}
            </span>
          </div>
          <span className="rounded-full bg-slate-200 px-3 py-0.5 text-sm font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
            Acteur : {currentStep.actor}
          </span>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          {currentStep.description}
        </p>

        {/* Charge utile échangée */}
        <div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Données de protocole transitant :
          </span>
          {typeof currentStep.payload === 'string' ? (
            <div className="rounded bg-slate-950 p-3 font-mono text-sm text-emerald-400">
              &ldquo;{currentStep.payload}&rdquo;
            </div>
          ) : (
            <pre className="rounded bg-slate-950 p-3 font-mono text-sm text-indigo-300 overflow-x-auto">
              {JSON.stringify(currentStep.payload, null, 2)}
            </pre>
          )}
        </div>
      </div>

      {/* Commandes Pas à pas */}
      <div className="flex justify-between items-center">
        <button
          disabled={currentStepIndex === 0}
          onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          ← Étape Précédente
        </button>

        <span className="text-sm font-medium text-slate-500">
          {currentStepIndex + 1} sur {steps.length}
        </span>

        {currentStepIndex < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            Étape Suivante →
          </button>
        ) : (
          <button
            onClick={() => setCurrentStepIndex(0)}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
          >
            Terminer &amp; Rejouer ✓
          </button>
        )}
      </div>
    </div>
  );
};
