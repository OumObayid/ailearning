'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type ScenarioKey = 'urgent_incident' | 'billing_inquiry' | 'product_feedback' | 'invalid_secret';

interface StepDetail {
  id: string;
  name: string;
  nodeType: string;
  status: 'success' | 'warning' | 'error' | 'skipped';
  inputData: Record<string, unknown>;
  outputData: Record<string, unknown>;
  executionTimeMs: number;
}

export const WorkflowSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('urgent_incident');
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const scenarios: Record<
    ScenarioKey,
    {
      label: string;
      description: string;
      payload: {
        headers: Record<string, string>;
        body: Record<string, unknown>;
      };
      steps: StepDetail[];
    }
  > = {
    urgent_incident: {
      label: '1. Incident critique (Production dégradée)',
      description: 'Webhook valide reçu depuis une application Express. Routage prioritaire immédiat.',
      payload: {
        headers: {
          'content-type': 'application/json',
          'x-webhook-secret': 'whsec_prod_live_894f2a',
        },
        body: {
          ticketId: 'TCK-9402',
          customerEmail: 'cto@acme-enterprise.com',
          userMessage: 'ALERTE : API renvoie 500 en continu depuis 15 minutes sur le checkout !',
          timestamp: '2026-11-04T18:10:00Z',
        },
      },
      steps: [
        {
          id: 'step_1',
          name: 'Webhook Trigger',
          nodeType: 'n8n-nodes-base.webhook',
          status: 'success',
          executionTimeMs: 12,
          inputData: {
            httpMethod: 'POST',
            path: '/webhook/incoming-support',
          },
          outputData: {
            headers: { 'x-webhook-secret': 'whsec_prod_live_894f2a' },
            body: {
              ticketId: 'TCK-9402',
              userMessage: 'ALERTE : API renvoie 500 en continu...',
            },
          },
        },
        {
          id: 'step_2',
          name: 'Verify Secret (Code Node)',
          nodeType: 'n8n-nodes-base.code',
          status: 'success',
          executionTimeMs: 4,
          inputData: {
            receivedSecret: 'whsec_prod_live_894f2a',
            expectedSecret: 'whsec_prod_live_894f2a',
          },
          outputData: {
            authorized: true,
            authMethod: 'header_bearer_hash',
          },
        },
        {
          id: 'step_3',
          name: 'Gemini 2.5 Flash (Analyse IA)',
          nodeType: '@n8n/n8n-nodes-langchain.chainLlm',
          status: 'success',
          executionTimeMs: 380,
          inputData: {
            prompt: 'Analyse le ticket client et renvoie un JSON { category, priority, sentiment, summary }',
          },
          outputData: {
            category: 'technical_incident',
            priority: 'CRITICAL',
            sentiment: 'frustrated',
            summary: 'Panne critique du tunnel d achat (erreurs HTTP 500 continues)',
          },
        },
        {
          id: 'step_4',
          name: 'Switch (Routage logique)',
          nodeType: 'n8n-nodes-base.switch',
          status: 'success',
          executionTimeMs: 2,
          inputData: {
            value1: 'technical_incident',
            condition: 'equal',
          },
          outputData: {
            activeBranch: 'Branch 0: Urgent Incident Escalation',
          },
        },
        {
          id: 'step_5',
          name: 'MySQL Insert & Slack Alert',
          nodeType: 'n8n-nodes-base.mySql',
          status: 'success',
          executionTimeMs: 45,
          inputData: {
            query: 'INSERT INTO support_tickets (id, status, priority, summary) VALUES (?, ?, ?, ?)',
            params: ['TCK-9402', 'open', 'CRITICAL', 'Panne critique checkout'],
          },
          outputData: {
            affectedRows: 1,
            slackNotificationSent: true,
            channel: '#oncall-engineers',
          },
        },
      ],
    },
    billing_inquiry: {
      label: '2. Facturation client (Demande de reçu)',
      description: 'Demande standard de relevé de facturation. Routage comptabilité sans alerte astreinte.',
      payload: {
        headers: {
          'content-type': 'application/json',
          'x-webhook-secret': 'whsec_prod_live_894f2a',
        },
        body: {
          ticketId: 'TCK-9403',
          customerEmail: 'finance@startup-hub.io',
          userMessage: 'Bonjour, pouvez-vous me faire parvenir la facture acquittée du mois d octobre ?',
          timestamp: '2026-11-04T18:12:00Z',
        },
      },
      steps: [
        {
          id: 'step_1',
          name: 'Webhook Trigger',
          nodeType: 'n8n-nodes-base.webhook',
          status: 'success',
          executionTimeMs: 10,
          inputData: { httpMethod: 'POST', path: '/webhook/incoming-support' },
          outputData: { ticketId: 'TCK-9403', userMessage: 'Bonjour, pouvez-vous me faire parvenir...' },
        },
        {
          id: 'step_2',
          name: 'Verify Secret (Code Node)',
          nodeType: 'n8n-nodes-base.code',
          status: 'success',
          executionTimeMs: 3,
          inputData: { authorized: true },
          outputData: { authorized: true },
        },
        {
          id: 'step_3',
          name: 'Gemini 2.5 Flash (Analyse IA)',
          nodeType: '@n8n/n8n-nodes-langchain.chainLlm',
          status: 'success',
          executionTimeMs: 310,
          inputData: { model: 'gemini-2.5-flash', task: 'ticket_classification' },
          outputData: {
            category: 'billing',
            priority: 'NORMAL',
            sentiment: 'neutral',
            summary: 'Demande de duplicata de facture mensuelle (octobre)',
          },
        },
        {
          id: 'step_4',
          name: 'Switch (Routage logique)',
          nodeType: 'n8n-nodes-base.switch',
          status: 'success',
          executionTimeMs: 2,
          inputData: { value1: 'billing' },
          outputData: { activeBranch: 'Branch 1: Billing Department Queue' },
        },
        {
          id: 'step_5',
          name: 'MySQL Insert & Email Template',
          nodeType: 'n8n-nodes-base.mySql',
          status: 'success',
          executionTimeMs: 32,
          inputData: {
            query: 'INSERT INTO support_tickets (id, status, priority, category) VALUES (?, ?, ?, ?)',
            params: ['TCK-9403', 'assigned_billing', 'NORMAL', 'billing'],
          },
          outputData: {
            affectedRows: 1,
            emailDraftCreated: true,
            template: 'tpl_invoice_receipt_v2',
          },
        },
      ],
    },
    product_feedback: {
      label: '3. Suggestion produit (Feature Request)',
      description: 'L utilisateur suggère une amélioration. Synchronisation backlog sans sollicitation humaine.',
      payload: {
        headers: {
          'content-type': 'application/json',
          'x-webhook-secret': 'whsec_prod_live_894f2a',
        },
        body: {
          ticketId: 'TCK-9404',
          customerEmail: 'dev@partner.net',
          userMessage: 'Ce serait formidable si vous ajoutiez l export CSV pour les métriques de trafic.',
          timestamp: '2026-11-04T18:14:00Z',
        },
      },
      steps: [
        {
          id: 'step_1',
          name: 'Webhook Trigger',
          nodeType: 'n8n-nodes-base.webhook',
          status: 'success',
          executionTimeMs: 11,
          inputData: { httpMethod: 'POST', path: '/webhook/incoming-support' },
          outputData: { ticketId: 'TCK-9404' },
        },
        {
          id: 'step_2',
          name: 'Verify Secret (Code Node)',
          nodeType: 'n8n-nodes-base.code',
          status: 'success',
          executionTimeMs: 3,
          inputData: { authorized: true },
          outputData: { authorized: true },
        },
        {
          id: 'step_3',
          name: 'Gemini 2.5 Flash (Analyse IA)',
          nodeType: '@n8n/n8n-nodes-langchain.chainLlm',
          status: 'success',
          executionTimeMs: 295,
          inputData: { model: 'gemini-2.5-flash' },
          outputData: {
            category: 'feature_request',
            priority: 'LOW',
            sentiment: 'positive',
            summary: 'Demande export CSV dans le dashboard statistiques',
          },
        },
        {
          id: 'step_4',
          name: 'Switch (Routage logique)',
          nodeType: 'n8n-nodes-base.switch',
          status: 'success',
          executionTimeMs: 2,
          inputData: { value1: 'feature_request' },
          outputData: { activeBranch: 'Branch 2: Product Backlog Sync' },
        },
        {
          id: 'step_5',
          name: 'HTTP Request (Jira/Linear API)',
          nodeType: 'n8n-nodes-base.httpRequest',
          status: 'success',
          executionTimeMs: 110,
          inputData: {
            method: 'POST',
            endpoint: 'https://api.linear.app/graphql',
            issueTitle: '[Feedback] Export CSV métriques de trafic',
          },
          outputData: {
            issueCreated: true,
            issueKey: 'PROD-1892',
            slackSync: false,
          },
        },
      ],
    },
    invalid_secret: {
      label: '4. Rejet de sécurité (Secret Header incorrect)',
      description: 'Tentative d appel non autorisée bloquée dès le nœud de vérification.',
      payload: {
        headers: {
          'content-type': 'application/json',
          'x-webhook-secret': 'bad_token_12345',
        },
        body: {
          ticketId: 'TCK-9999',
          customerEmail: 'attacker@unknown.domain',
          userMessage: 'Requête non authentifiée',
          timestamp: '2026-11-04T18:15:00Z',
        },
      },
      steps: [
        {
          id: 'step_1',
          name: 'Webhook Trigger',
          nodeType: 'n8n-nodes-base.webhook',
          status: 'success',
          executionTimeMs: 12,
          inputData: { httpMethod: 'POST', path: '/webhook/incoming-support' },
          outputData: {
            headers: { 'x-webhook-secret': 'bad_token_12345' },
            body: { ticketId: 'TCK-9999' },
          },
        },
        {
          id: 'step_2',
          name: 'Verify Secret (Code Node)',
          nodeType: 'n8n-nodes-base.code',
          status: 'error',
          executionTimeMs: 2,
          inputData: {
            receivedSecret: 'bad_token_12345',
            expectedSecret: 'whsec_prod_live_894f2a',
          },
          outputData: {
            error: '403 Forbidden : Signature de webhook invalide',
            executionHalted: true,
          },
        },
        {
          id: 'step_3',
          name: 'Gemini 2.5 Flash (Analyse IA)',
          nodeType: '@n8n/n8n-nodes-langchain.chainLlm',
          status: 'skipped',
          executionTimeMs: 0,
          inputData: { status: 'Non exécuté (flux interrompu au nœud précédent)' },
          outputData: {},
        },
        {
          id: 'step_4',
          name: 'Switch (Routage logique)',
          nodeType: 'n8n-nodes-base.switch',
          status: 'skipped',
          executionTimeMs: 0,
          inputData: { status: 'Non exécuté' },
          outputData: {},
        },
        {
          id: 'step_5',
          name: 'Action de sortie',
          nodeType: 'n8n-nodes-base.mySql',
          status: 'skipped',
          executionTimeMs: 0,
          inputData: { status: 'Non exécuté' },
          outputData: {},
        },
      ],
    },
  };

  const currentScenario = scenarios[activeScenario];
  const activeStep = currentScenario.steps[selectedStepIndex] || currentScenario.steps[0];

  const handleSimulateExecution = () => {
    setIsExecuting(true);
    setSelectedStepIndex(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < currentScenario.steps.length) {
        setSelectedStepIndex(step);
      } else {
        clearInterval(interval);
        setIsExecuting(false);
      }
    }, 600);
  };

  return (
    <div className="my-8 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-100 shadow-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30">
            <Icon name="cpu" className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Simulateur de Workflow n8n — Orchestration & Routage IA
            </h3>
            <p className="text-sm text-slate-400">
              Visualisez le cycle d exécution nœud par nœud, le typage des items et les expressions n8n
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateExecution}
          disabled={isExecuting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-orange-500 disabled:opacity-50"
        >
          <Icon name="refresh-cw" className={`h-4 w-4 ${isExecuting ? 'animate-spin' : ''}`} />
          <span>{isExecuting ? 'Exécution en cours...' : 'Exécuter le workflow'}</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Scenario selector */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">
            Sélectionnez un scénario de test :
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(Object.keys(scenarios) as ScenarioKey[]).map((key) => {
              const item = scenarios[key];
              const isSelected = activeScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveScenario(key);
                    setSelectedStepIndex(0);
                  }}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-orange-950/30 text-white shadow-sm'
                      : 'border-slate-700/80 bg-slate-800/40 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="text-sm font-semibold text-orange-300">{item.label}</div>
                  <div className="text-sm text-slate-400 mt-1 line-clamp-1">{item.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workflow Diagram Nodes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Pipeline des Nœuds n8n (Cliquez sur un nœud pour inspecter $json) :
            </span>
            <span className="text-sm text-slate-400">
              Temps total cumulé :{' '}
              <strong className="text-slate-200">
                {currentScenario.steps.reduce((acc, s) => acc + s.executionTimeMs, 0)} ms
              </strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {currentScenario.steps.map((step, idx) => {
              const isSelected = selectedStepIndex === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`relative p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-orange-400 bg-orange-950/40 ring-2 ring-orange-500/50 shadow-md'
                      : 'border-slate-700 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-sm font-bold text-slate-300">#{idx + 1}</span>
                    <span
                      className={`text-sm px-2 py-0.5 rounded-full font-medium ${
                        step.status === 'success'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : step.status === 'error'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : step.status === 'skipped'
                          ? 'bg-slate-600/30 text-slate-400 border border-slate-600/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {step.status === 'success' && 'Succès'}
                      {step.status === 'error' && 'Bloqué'}
                      {step.status === 'skipped' && 'Ignoré'}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-slate-100 line-clamp-1">{step.name}</div>
                  <div className="text-sm text-slate-400 font-mono mt-1">
                    {step.executionTimeMs > 0 ? `${step.executionTimeMs} ms` : '—'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Inspector Panel */}
        <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <span className="text-sm font-mono text-orange-400 font-semibold">
                Nœud sélectionné : {activeStep.name}
              </span>
              <div className="text-sm text-slate-400 font-mono">Type : {activeStep.nodeType}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-300">Statut :</span>
              <span
                className={`text-sm font-semibold ${
                  activeStep.status === 'success'
                    ? 'text-emerald-400'
                    : activeStep.status === 'error'
                    ? 'text-rose-400'
                    : 'text-slate-400'
                }`}
              >
                {activeStep.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Data */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Icon name="terminal" className="h-4 w-4 text-slate-400" />
                <span>Données d&apos;entrée ($json input)</span>
              </div>
              <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm font-mono text-slate-300 overflow-x-auto max-h-48">
                {JSON.stringify(activeStep.inputData, null, 2)}
              </pre>
            </div>

            {/* Output Data */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 text-emerald-400" />
                <span>Données produites ($json output)</span>
              </div>
              <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm font-mono text-emerald-300 overflow-x-auto max-h-48">
                {JSON.stringify(activeStep.outputData, null, 2)}
              </pre>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 text-sm text-blue-200">
            <strong className="text-blue-300">Principe fondamental n8n :</strong> Les données circulent d un nœud
            à l autre sous forme de tableaux d objets JSON (<code className="text-blue-100 font-mono">Array&lt;{`{ json: ... }`}&gt;</code>).
            Tout nœud ultérieur peut référencer une propriété en amont via l expression syntaxique{' '}
            <code className="text-blue-100 font-mono">{'{{ $(\'NomDuNoeud\').item.json.maCle }}'}</code>.
          </div>
        </div>
      </div>
    </div>
  );
};
