'use client';

import React, { useState } from 'react';

interface TicketPreset {
  id: string;
  label: string;
  email: string;
  subject: string;
  content: string;
  expectedResult: {
    category: string;
    priority: 'CRITICAL' | 'NORMAL' | 'LOW';
    sentiment: 'angry' | 'neutral' | 'spam';
    summary: string;
  };
}

const TICKET_PRESETS: TicketPreset[] = [
  {
    id: 'crit-incident',
    label: 'Incident Critique Serveur (Urgence)',
    email: 'cto@megacorp.com',
    subject: 'URGENCE : Panne complète de l\'API en production',
    content: 'Notre système est totalement à l\'arrêt depuis 15 minutes ! Les paiements échouent tous avec une erreur 502. Merci d\'intervenir immédiatement !',
    expectedResult: {
      category: 'technical_incident',
      priority: 'CRITICAL',
      sentiment: 'angry',
      summary: 'Panne bloquante 502 sur l\'API de paiement en production signalée par le CTO.',
    },
  },
  {
    label: 'Demande Facturation Standard',
    id: 'billing-req',
    email: 'compta@acme.fr',
    subject: 'Question concernant la facture #2026-03-B',
    content: 'Bonjour, nous souhaiterions obtenir un duplicata de notre facture de mars avec le détail des taxes intracommunautaires. Cordialement.',
    expectedResult: {
      category: 'billing',
      priority: 'NORMAL',
      sentiment: 'neutral',
      summary: 'Demande de duplicata de facture avec ventilation TVA intracommunautaire.',
    },
  },
  {
    label: 'Spam Publicitaire Non Sollicité',
    id: 'spam-ad',
    email: 'promo-deals@spammer-network.net',
    subject: 'Gagnez 10 000 abonnés Instagram en 48 heures !',
    content: 'Offre exclusive réservée aux entreprises dynamiques. Cliquez ici pour réclamer vos crédits gratuits avant ce soir minuit.',
    expectedResult: {
      category: 'spam',
      priority: 'LOW',
      sentiment: 'spam',
      summary: 'Publicité non sollicitée pour achat d\'abonnés réseaux sociaux.',
    },
  },
];

export const GeminiClassifierWorkflowLab: React.FC = () => {
  const [selectedTicketId, setSelectedTicketId] = useState<string>('crit-incident');
  const [activeNode, setActiveNode] = useState<number>(0); // 0: idle, 1: webhook, 2: gemini, 3: if, 4: branch
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const currentTicket = TICKET_PRESETS.find((t) => t.id === selectedTicketId) || TICKET_PRESETS[0];

  const runWorkflow = async () => {
    setIsRunning(true);
    setActiveNode(1); // Webhook

    await new Promise((r) => setTimeout(r, 600));
    setActiveNode(2); // Gemini

    await new Promise((r) => setTimeout(r, 1000));
    setActiveNode(3); // IF condition

    await new Promise((r) => setTimeout(r, 700));
    setActiveNode(4); // Routing
    setIsRunning(false);
  };

  const isCritical = currentTicket.expectedResult.priority === 'CRITICAL';

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Workflow n8n &amp; Classification IA avec Gemini
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez l&apos;orchestration visuelle d&apos;un workflow n8n analysant et routant dynamiquement les tickets entrants.
          </p>
        </div>
      </div>

      {/* Choix du message à classifier */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Sélectionnez un ticket entrant à injecter dans le flux :
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {TICKET_PRESETS.map((ticket) => (
            <button
              key={ticket.id}
              disabled={isRunning}
              onClick={() => {
                setSelectedTicketId(ticket.id);
                setActiveNode(0);
              }}
              className={`rounded-lg border p-3 text-left transition ${
                selectedTicketId === ticket.id
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
              }`}
            >
              <div className="font-semibold text-sm">{ticket.label}</div>
              <div className="mt-1 font-mono text-sm line-clamp-1 italic text-slate-600 dark:text-slate-400">
                {ticket.subject}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message brut */}
      <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex justify-between text-sm text-slate-500 mb-1">
          <span>De : <strong>{currentTicket.email}</strong></span>
          <span>Objet : <strong>{currentTicket.subject}</strong></span>
        </div>
        <p className="font-mono text-sm text-slate-800 dark:text-slate-200 mt-1">
          &ldquo;{currentTicket.content}&rdquo;
        </p>
      </div>

      {/* Bouton de déclenchement */}
      <div className="mb-6">
        <button
          onClick={runWorkflow}
          disabled={isRunning}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {isRunning ? 'Exécution du workflow en cours...' : '▶ Déclencher le Workflow n8n'}
        </button>
      </div>

      {/* Représentation visuelle des nœuds n8n */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-4">
        {/* Nœud 1 : Webhook */}
        <div
          className={`rounded-lg border p-3.5 transition ${
            activeNode === 1
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 ring-2 ring-indigo-500 shadow'
              : activeNode > 1
              ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm">1. Webhook</span>
            <span className="text-sm font-mono">POST</span>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Ingère l&apos;e-mail client et génère un ticketId
          </div>
          {activeNode >= 1 && (
            <span className="mt-2 inline-block rounded bg-emerald-100 px-2 py-0.5 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
              Payload reçu ✓
            </span>
          )}
        </div>

        {/* Nœud 2 : Gemini AI Chain */}
        <div
          className={`rounded-lg border p-3.5 transition ${
            activeNode === 2
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 ring-2 ring-indigo-500 shadow animate-pulse'
              : activeNode > 2
              ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm">2. Gemini 2.5 Flash</span>
            <span className="text-sm font-mono">AI Model</span>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Analyse cognitive &amp; inférence structurée
          </div>
          {activeNode >= 2 && (
            <span className="mt-2 inline-block rounded bg-indigo-100 px-2 py-0.5 text-sm font-semibold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-400">
              JSON Typé généré ✓
            </span>
          )}
        </div>

        {/* Nœud 3 : IF Logic Node */}
        <div
          className={`rounded-lg border p-3.5 transition ${
            activeNode === 3
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 ring-2 ring-indigo-500 shadow'
              : activeNode > 3
              ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm">3. Nœud IF</span>
            <span className="text-sm font-mono">Condition</span>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <code>priority === &apos;CRITICAL&apos;</code>
          </div>
          {activeNode >= 3 && (
            <span
              className={`mt-2 inline-block rounded px-2 py-0.5 text-sm font-semibold ${
                isCritical
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400'
                  : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Branche : {isCritical ? 'TRUE (Urgence)' : 'FALSE (Standard)'}
            </span>
          )}
        </div>

        {/* Nœud 4 : Branche Finale */}
        <div
          className={`rounded-lg border p-3.5 transition ${
            activeNode === 4
              ? isCritical
                ? 'border-rose-500 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30 ring-2 ring-rose-500'
                : 'border-emerald-500 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 ring-2 ring-emerald-500'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm">4. Action Finale</span>
            <span className="text-sm font-mono">{isCritical ? 'Slack Alert' : 'MySQL Save'}</span>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {isCritical ? 'Alerte astreinte Slack + Pager' : 'Archivage ticket MySQL + e-mail'}
          </div>
          {activeNode === 4 && (
            <span className="mt-2 inline-block rounded bg-emerald-100 px-2 py-0.5 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
              Action exécutée ✓
            </span>
          )}
        </div>
      </div>

      {/* Données d'inspection */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sortie JSON produite par Gemini */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <span className="text-sm font-bold text-slate-900 dark:text-white block mb-2">
            Sortie structurée de Gemini (Structured Output Parser) :
          </span>
          {activeNode >= 2 ? (
            <pre className="rounded bg-slate-950 p-3 font-mono text-sm text-indigo-300 overflow-x-auto">
              {JSON.stringify(currentTicket.expectedResult, null, 2)}
            </pre>
          ) : (
            <div className="text-sm text-slate-500 italic py-6 text-center">
              Lancez le workflow pour voir la sortie de Gemini.
            </div>
          )}
        </div>

        {/* Décision et impact métier */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <span className="font-mono text-sm font-semibold text-slate-300 mb-2">
            Bilan d&apos;exécution du Workflow n8n :
          </span>

          {activeNode === 4 ? (
            <div className="space-y-3">
              <div
                className={`rounded p-3 text-sm font-semibold ${
                  isCritical
                    ? 'bg-rose-950/60 text-rose-300 border border-rose-800'
                    : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                }`}
              >
                {isCritical
                  ? '🚨 Alerte P0 Slack envoyée sur le canal #oncall-engineers avec notification mobile.'
                  : '✅ Ticket persisté en base MySQL (table support_tickets) avec statut "processing".'}
              </div>

              <div className="text-sm text-slate-400 space-y-1">
                <div><strong>Catégorie déduite :</strong> {currentTicket.expectedResult.category}</div>
                <div><strong>Priorité calculée :</strong> {currentTicket.expectedResult.priority}</div>
                <div><strong>Sentiment détecté :</strong> {currentTicket.expectedResult.sentiment}</div>
                <div><strong>Résumé généré :</strong> {currentTicket.expectedResult.summary}</div>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 italic py-6 text-center text-sm">
              En attente d&apos;achèvement du workflow...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

