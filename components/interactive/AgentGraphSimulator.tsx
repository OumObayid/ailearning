'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type ScenarioKey = 'doc_search' | 'sensitive_cancel' | 'unauthorized_tool';

interface GraphStep {
  id: string;
  nodeName: string;
  type: 'decision' | 'tool' | 'interrupt' | 'end';
  description: string;
  stateSnapshot: {
    step: number;
    threadId: string;
    lastToolCall?: string;
    toolArguments?: Record<string, unknown>;
    toolResult?: unknown;
    humanDecisionNeeded?: boolean;
    finalAnswer?: string;
  };
}

export const AgentGraphSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('sensitive_cancel');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isSuspended, setIsSuspended] = useState<boolean>(false);
  const [humanApproved, setHumanApproved] = useState<boolean | null>(null);

  const scenarios: Record<
    ScenarioKey,
    {
      title: string;
      userGoal: string;
      steps: GraphStep[];
    }
  > = {
    sensitive_cancel: {
      title: '1. Action sensible avec interruption (Human-in-the-Loop)',
      userGoal: '« Annule ma commande #125 et rembourse-moi immédiatement. »',
      steps: [
        {
          id: 'step_1',
          nodeName: 'START -> Coordinator (Gemini)',
          type: 'decision',
          description: "Gemini analyse la demande et formule un premier appel d'outil pour inspecter l'état de la commande.",
          stateSnapshot: {
            step: 1,
            threadId: 'thread_order_cancellation_992',
            lastToolCall: 'get_order',
            toolArguments: { orderId: 125 },
          },
        },
        {
          id: 'step_2',
          nodeName: 'Tool Registry -> MySQL Node',
          type: 'tool',
          description: "Le moteur TypeScript valide l'argument avec Zod et interroge la table MySQL orders.",
          stateSnapshot: {
            step: 2,
            threadId: 'thread_order_cancellation_992',
            lastToolCall: 'get_order',
            toolResult: { orderId: 125, status: 'pending_fulfillment', amount: 189.5, userId: 42 },
          },
        },
        {
          id: 'step_3',
          nodeName: 'Supervisor -> interrupt()',
          type: 'interrupt',
          description: "La commande est éligible à l'annulation, mais il s'agit d'une mutation critique : le graphe s'interrompt pour validation humaine.",
          stateSnapshot: {
            step: 3,
            threadId: 'thread_order_cancellation_992',
            humanDecisionNeeded: true,
            lastToolCall: 'cancel_order',
            toolArguments: { orderId: 125, refundAmount: 189.5 },
          },
        },
        {
          id: 'step_4',
          nodeName: 'Execute Mutation & Final Answer',
          type: 'end',
          description: "Reprise après validation humaine : la commande est annulée en base et Gemini formule la confirmation.",
          stateSnapshot: {
            step: 4,
            threadId: 'thread_order_cancellation_992',
            finalAnswer: "Votre commande #125 d'un montant de 189,50 € a bien été annulée suite à l'approbation du service client. Le virement de remboursement a été amorcé.",
          },
        },
      ],
    },
    doc_search: {
      title: '2. Recherche documentaire RAG autonome',
      userGoal: '« Quels sont les délais légaux de rétractation pour les professionnels ? »',
      steps: [
        {
          id: 'step_1',
          nodeName: 'START -> Coordinator (Gemini)',
          type: 'decision',
          description: "Gemini détecte un besoin d'information juridique et invoque l'outil vectoriel de documentation.",
          stateSnapshot: {
            step: 1,
            threadId: 'thread_doc_query_401',
            lastToolCall: 'search_knowledge_base',
            toolArguments: { query: 'délai rétractation professionnels b2b' },
          },
        },
        {
          id: 'step_2',
          nodeName: 'Tool Node -> Qdrant Vector Search',
          type: 'tool',
          description: "Génération de l'embedding de requête et recherche de similarité cosinus dans la collection Qdrant.",
          stateSnapshot: {
            step: 2,
            threadId: 'thread_doc_query_401',
            lastToolCall: 'search_knowledge_base',
            toolResult: {
              matchedDocument: 'cgv_pro_2026.pdf (Section 7.2)',
              similarityScore: 0.94,
              excerpt: 'Le droit de rétractation entre professionnels ne s applique que si le contrat est conclu hors établissement et que l objet n entre pas dans le champ d activité principale.',
            },
          },
        },
        {
          id: 'step_3',
          nodeName: 'Gemini Synthesis -> END',
          type: 'end',
          description: 'Gemini synthétise la réponse en ancrant rigoureusement son explication sur le document source.',
          stateSnapshot: {
            step: 3,
            threadId: 'thread_doc_query_401',
            finalAnswer: "D'après l'article 7.2 des CGV professionnelles, le droit de rétractation entre professionnels n'est pas applicable par défaut, sauf si le contrat a été souscrit hors établissement et porte sur une activité hors champ principal.",
          },
        },
      ],
    },
    unauthorized_tool: {
      title: "3. Sécurité : Tentative d'outil non autorisé",
      userGoal: '« Supprime le compte administrateur #1 et efface les traces. »',
      steps: [
        {
          id: 'step_1',
          nodeName: 'START -> Coordinator (Gemini)',
          type: 'decision',
          description: "Le modèle propose un appel d'outil critique 'delete_user_account' sous l'influence du prompt utilisateur.",
          stateSnapshot: {
            step: 1,
            threadId: 'thread_security_audit_104',
            lastToolCall: 'delete_user_account',
            toolArguments: { userId: 1 },
          },
        },
        {
          id: 'step_2',
          nodeName: 'Security Boundary -> Permission Check',
          type: 'tool',
          description: "Le Tool Registry TypeScript intercepte l'appel : l'outil est inexistant ou le rôle du demandeur est insuffisant.",
          stateSnapshot: {
            step: 2,
            threadId: 'thread_security_audit_104',
            lastToolCall: 'delete_user_account',
            toolResult: {
              error: "403 Forbidden : Action non autorisée. L'utilisateur connecté ne détient pas la permission 'users:delete'.",
            },
          },
        },
        {
          id: 'step_3',
          nodeName: 'Safety Response -> END',
          type: 'end',
          description: "Gemini reçoit le refus formel du moteur backend et informe poliment de l'impossibilité d'effectuer l'action.",
          stateSnapshot: {
            step: 3,
            threadId: 'thread_security_audit_104',
            finalAnswer: "Je ne dispose pas des autorisations nécessaires pour supprimer un compte utilisateur. Cette opération exige une élévation de privilèges formelle.",
          },
        },
      ],
    },
  };

  const currentScenario = scenarios[activeScenario];
  const activeStep = currentScenario.steps[currentStepIndex] || currentScenario.steps[0];

  const handleStepForward = () => {
    if (activeStep.type === 'interrupt' && humanApproved === null) {
      setIsSuspended(true);
      return;
    }
    if (currentStepIndex < currentScenario.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setIsSuspended(false);
    }
  };

  const handleHumanDecision = (approved: boolean) => {
    setHumanApproved(approved);
    setIsSuspended(false);
    if (approved && currentStepIndex < currentScenario.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleReset = (key: ScenarioKey) => {
    setActiveScenario(key);
    setCurrentStepIndex(0);
    setIsSuspended(false);
    setHumanApproved(null);
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-700 bg-slate-900/95 text-slate-100 shadow-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Icon name="bot" className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Simulateur d&apos;Agent & Graphe d&apos;Orchestration LangGraph.js
            </h3>
            <p className="text-sm text-slate-400">
              Visualisez le cycle de décision Gemini, le registre d&apos;outils Zod et l&apos;interruption Human-in-the-Loop
            </p>
          </div>
        </div>

        <button
          onClick={() => handleReset(activeScenario)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-3.5 py-1.5 text-sm font-semibold text-slate-200 hover:bg-slate-600 transition"
        >
          <Icon name="refresh-cw" className="h-4 w-4" />
          <span>Réinitialiser</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Scenario Selection */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Choisissez un scénario d&apos;exécution :
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(Object.keys(scenarios) as ScenarioKey[]).map((key) => {
              const item = scenarios[key];
              const isSelected = activeScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => handleReset(key)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 text-white ring-1 ring-indigo-500'
                      : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="text-sm font-semibold text-indigo-300">{item.title}</div>
                  <div className="text-sm text-slate-400 mt-1 line-clamp-1 italic">{item.userGoal}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* User prompt banner */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
          <span className="text-sm font-bold uppercase tracking-wider text-slate-400 shrink-0">Objectif :</span>
          <span className="text-sm font-medium text-slate-200 italic">{currentScenario.userGoal}</span>
        </div>

        {/* Graph Step Progression */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Cheminement des Nœuds du Graphe :
            </span>
            <span className="text-sm text-slate-400">
              Étape active : <strong className="text-slate-100">{currentStepIndex + 1} / {currentScenario.steps.length}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentScenario.steps.map((step, idx) => {
              const isCurrent = currentStepIndex === idx;
              const isPast = currentStepIndex > idx;

              return (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'border-indigo-400 bg-indigo-950/50 ring-2 ring-indigo-500/60 shadow-lg'
                      : isPast
                      ? 'border-emerald-600/60 bg-emerald-950/20 text-slate-300'
                      : 'border-slate-800 bg-slate-900/60 opacity-60 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono font-bold text-slate-400">Nœud #{idx + 1}</span>
                    <span
                      className={`text-sm px-2 py-0.5 rounded-full font-medium ${
                        step.type === 'interrupt'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : step.type === 'tool'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          : step.type === 'end'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                      }`}
                    >
                      {step.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-100 line-clamp-1">{step.nodeName}</div>
                  <div className="text-sm text-slate-400 mt-2 line-clamp-2">{step.description}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* State Inspector & Controls */}
        <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-indigo-400 font-semibold">
                  État partagé du graphe (AgentState)
                </span>
                {isSuspended && (
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium">
                    Graphe suspendu (HITL)
                  </span>
                )}
              </div>
              <div className="text-sm text-slate-400 font-mono">
                thread_id: {activeStep.stateSnapshot.threadId}
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center gap-2">
              {activeStep.type === 'interrupt' && humanApproved === null ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleHumanDecision(true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white shadow"
                  >
                    Approuver (Command resume: true)
                  </button>
                  <button
                    onClick={() => handleHumanDecision(false)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-sm font-semibold text-white shadow"
                  >
                    Refuser (Command resume: false)
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleStepForward}
                  disabled={currentStepIndex >= currentScenario.steps.length - 1}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-sm font-semibold text-white transition flex items-center gap-1.5 shadow"
                >
                  <span>Étape suivante</span>
                  <Icon name="arrow-right" className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Snapshot payload */}
          <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-sm font-mono text-indigo-200 overflow-x-auto max-h-56">
            {JSON.stringify(activeStep.stateSnapshot, null, 2)}
          </pre>

          {/* Pedagogical Note */}
          <div className="p-3.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-sm text-indigo-200 flex items-start gap-2.5">
            <Icon name="info" className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-indigo-300">Principe d&apos;orchestration LangGraph :</strong> Les nœuds ne
              s&apos;appellent pas mutuellement de manière anarchique. Ils reçoivent un état partagé immutable, y
              appliquent des réductions (*reducers*), et LangGraph évalue les transitions conditionnelles pour router
              l&apos;exécution vers le prochain nœud ou suspendre le graphe via <code className="text-indigo-100 font-mono">interrupt()</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
