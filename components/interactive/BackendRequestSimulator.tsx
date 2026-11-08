'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type Scenario = 'valid' | 'zod_error' | 'rate_limit';

export const BackendRequestSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario>('valid');

  const scenarios: Record<
    Scenario,
    {
      title: string;
      desc: string;
      status: number;
      statusText: string;
      steps: {
        layer: string;
        action: string;
        state: 'pass' | 'fail' | 'blocked';
        detail: string;
      }[];
      responsePayload: string;
    }
  > = {
    valid: {
      title: 'Scénario 1 : Requête Légitime Conforme',
      desc: 'Prompt valide, quota disponible, appel Gemini exécuté et message persisté dans MySQL.',
      status: 200,
      statusText: 'OK',
      steps: [
        {
          layer: '1. Helmet & CORS',
          action: 'Vérification origine & en-têtes',
          state: 'pass',
          detail: 'Origine https://app.example.com autorisée, en-têtes sécurisés injectés.',
        },
        {
          layer: '2. express-rate-limit',
          action: 'Contrôle du débit IP',
          state: 'pass',
          detail: 'Consommation : 4 / 100 requêtes dans la fenêtre de 15 minutes.',
        },
        {
          layer: '3. Zod validateBody',
          action: 'Validation du schéma JSON',
          state: 'pass',
          detail: 'generateSchema.safeParse() réussi : prompt présent (48 caractères).',
        },
        {
          layer: '4. Gemini Service',
          action: 'Appel @google/genai',
          state: 'pass',
          detail: 'Interactions API exécutée avec succès (182 tokens consommés).',
        },
        {
          layer: '5. MySQL Pool',
          action: 'Persistance de la conversation',
          state: 'pass',
          detail: 'Requête préparée INSERT INTO messages exécutée (message_id #142).',
        },
      ],
      responsePayload: `{
  "success": true,
  "result": "Node.js est un environnement d'exécution JavaScript asynchrone...",
  "conversationId": 12,
  "messageId": 142
}`,
    },
    zod_error: {
      title: 'Scénario 2 : Rejet Précoce par Zod (Erreur 400)',
      desc: 'Prompt vide ou trop volumineux. La requête est rejetée net SANS consommer de quota Gemini !',
      status: 400,
      statusText: 'Bad Request',
      steps: [
        {
          layer: '1. Helmet & CORS',
          action: 'Vérification origine',
          state: 'pass',
          detail: 'Origine autorisée.',
        },
        {
          layer: '2. express-rate-limit',
          action: 'Contrôle du débit',
          state: 'pass',
          detail: 'Quota de requêtes valide.',
        },
        {
          layer: '3. Zod validateBody',
          action: 'Validation du schéma JSON',
          state: 'fail',
          detail: 'Validation échouée : prompt vide ou manquant. Interception immédiate !',
        },
        {
          layer: '4. Gemini Service',
          action: 'Appel @google/genai',
          state: 'blocked',
          detail: 'ÉTAPES COURT-CIRCUITÉE : Zéro coût Gemini et zéro appel réseau externe.',
        },
        {
          layer: '5. MySQL Pool',
          action: 'Persistance BDD',
          state: 'blocked',
          detail: 'Aucune insertion en base de données.',
        },
      ],
      responsePayload: `{
  "success": false,
  "message": "Données invalides.",
  "errors": {
    "fieldErrors": {
      "prompt": ["Le prompt est obligatoire."]
    }
  }
}`,
    },
    rate_limit: {
      title: 'Scénario 3 : Limitation de Débit (Erreur 429)',
      desc: 'Trop de requêtes successives en peu de temps. Protection contre le déni de service et les coûts.',
      status: 429,
      statusText: 'Too Many Requests',
      steps: [
        {
          layer: '1. Helmet & CORS',
          action: 'Vérification origine',
          state: 'pass',
          detail: 'Origine autorisée.',
        },
        {
          layer: '2. express-rate-limit',
          action: 'Contrôle du débit IP',
          state: 'fail',
          detail: 'Seuil dépassé : 101 requêtes émises. Blocage automatique activé.',
        },
        {
          layer: '3. Zod validateBody',
          action: 'Validation',
          state: 'blocked',
          detail: 'Non exécuté.',
        },
        {
          layer: '4. Gemini Service',
          action: 'Appel @google/genai',
          state: 'blocked',
          detail: 'Non exécuté.',
        },
        {
          layer: '5. MySQL Pool',
          action: 'Persistance BDD',
          state: 'blocked',
          detail: 'Non exécuté.',
        },
      ],
      responsePayload: `{
  "success": false,
  "message": "Trop de requêtes. Veuillez patienter 15 minutes."
}`,
    },
  };

  const current = scenarios[activeScenario];

  return (
    <div className="my-8 rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm">
            <Icon name="server" className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Laboratoire Interactif : Cheminement d&apos;une Requête dans le Backend IA
            </h4>
            <p className="text-sm text-slate-500">
              Visualisez le cycle complet à travers les couches de sécurité, de validation Zod, de service LLM et de base MySQL
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200">
          Architecture Express
        </span>
      </div>

      {/* Scenario switcher */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveScenario('valid')}
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
            activeScenario === 'valid'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          ✓ 1. Requête Valide (HTTP 200)
        </button>
        <button
          type="button"
          onClick={() => setActiveScenario('zod_error')}
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
            activeScenario === 'zod_error'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          ✗ 2. Erreur Validation Zod (HTTP 400)
        </button>
        <button
          type="button"
          onClick={() => setActiveScenario('rate_limit')}
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
            activeScenario === 'rate_limit'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          ⚠ 3. Dépassement Quota (HTTP 429)
        </button>
      </div>

      <p className="text-sm text-slate-600 font-medium">{current.desc}</p>

      {/* Layers traversal display */}
      <div className="space-y-3">
        {current.steps.map((step, idx) => {
          let badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
          let statusText = '✓ Validé';
          if (step.state === 'fail') {
            badgeColor = 'bg-rose-100 text-rose-900 border-rose-300';
            statusText = '✗ Interception';
          } else if (step.state === 'blocked') {
            badgeColor = 'bg-slate-100 text-slate-500 border-slate-200';
            statusText = '— Ignoré';
          }

          return (
            <div
              key={idx}
              className={`rounded-xl border p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm ${
                step.state === 'pass'
                  ? 'border-slate-200 bg-slate-50/70'
                  : step.state === 'fail'
                  ? 'border-rose-200 bg-rose-50/50'
                  : 'border-slate-100 bg-slate-50/30 opacity-60'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{step.layer}</span>
                  <span className="text-slate-500">({step.action})</span>
                </div>
                <p className="text-slate-600 font-normal">{step.detail}</p>
              </div>
              <span className={`shrink-0 rounded-md border px-2.5 py-1 text-sm font-bold uppercase tracking-wider ${badgeColor}`}>
                {statusText}
              </span>
            </div>
          );
        })}
      </div>

      {/* HTTP JSON Response output */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm space-y-2">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
          <span>Réponse HTTP JSON renvoyée au frontend React</span>
          <span
            className={`font-bold ${
              current.status === 200
                ? 'text-emerald-400'
                : current.status === 400
                ? 'text-rose-400'
                : 'text-amber-400'
            }`}
          >
            HTTP {current.status} {current.statusText}
          </span>
        </div>
        <pre className="text-indigo-300 leading-relaxed overflow-x-auto whitespace-pre">
          {current.responsePayload}
        </pre>
      </div>
    </div>
  );
};

