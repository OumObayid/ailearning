'use client';

import React, { useState } from 'react';

interface Scenario {
  id: string;
  title: string;
  prompt: string;
  involvedAgents: ('security' | 'billing' | 'tech')[];
  plans: {
    agent: 'security' | 'billing' | 'tech';
    task: string;
    output: string;
  }[];
  finalSynthesis: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'refund-audit',
    title: 'Litige Financier & Audit de Sécurité',
    prompt: 'Je demande un dédommagement de 90€ pour l\'interruption du 14 mars et je veux savoir quel administrateur a révoqué ma clé API.',
    involvedAgents: ['billing', 'security'],
    plans: [
      {
        agent: 'billing',
        task: 'Vérifier l\'éligibilité au crédit de service SLA pour le 14 mars (90€).',
        output: 'Incident #INC-892 confirmé le 14 mars (durée 4h12). Éligibilité SLA validée : avoir de 90,00 € émis sur la prochaine facture.',
      },
      {
        agent: 'security',
        task: 'Inspecter les logs d\'audit IAM du 14 mars concernant la clé API du client.',
        output: 'Révocation effectuée le 14/03 à 14:22 UTC par l\'utilisateur "security-bot@corp" suite à 5 tentatives d\'authentification échouées.',
      },
    ],
    finalSynthesis: 'Votre demande a été traitée avec succès. Un avoir de 90,00 € a été crédité sur votre compte conformément à notre SLA. Concernant votre clé API, celle-ci a été révoquée par mesure de sécurité automatisée suite à des échecs d\'authentification suspects.',
  },
  {
    id: 'stripe-error-tech',
    title: 'Échec Webhook Stripe & Diagnostic Technique',
    prompt: 'Mon paiement de 49€ a été débité mais mon compte reste bloqué avec une erreur HTTP 500 sur le webhook.',
    involvedAgents: ['billing', 'tech'],
    plans: [
      {
        agent: 'billing',
        task: 'Interroger Stripe pour vérifier le statut de la transaction de 49€.',
        output: 'Paiement Stripe #ch_9941a réussi le 02/04 pour 49,00 €. Statut : "succeeded".',
      },
      {
        agent: 'tech',
        task: 'Analyser les traces de la passerelle de webhook lors de la notification Stripe.',
        output: 'Exception Timeout détectée sur le microservice d\'activation de compte (base MySQL saturée pendant 8 secondes).',
      },
    ],
    finalSynthesis: 'Nous avons confirmé la bonne réception de votre paiement de 49,00 €. L\'incident provenait d\'une congestion temporaire lors du traitement du webhook. Votre compte a été réactivé manuellement par le superviseur.',
  },
];

export const MultiAgentSupervisorSimulator: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [step, setStep] = useState<'idle' | 'routing' | 'delegating' | 'synthesizing' | 'completed'>('idle');

  const currentScenario = SCENARIOS[selectedScenarioIndex];

  const runSimulation = async () => {
    setStep('routing');
    await new Promise((r) => setTimeout(r, 600));

    setStep('delegating');
    await new Promise((r) => setTimeout(r, 1000));

    setStep('synthesizing');
    await new Promise((r) => setTimeout(r, 700));

    setStep('completed');
  };

  const agentMeta = {
    billing: { name: 'Agent Facturation & Stripe', icon: '💳', color: 'border-blue-300 bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-900' },
    security: { name: 'Agent Sécurité & Audit IAM', icon: '🛡️', color: 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900' },
    tech: { name: 'Agent Diagnostic Technique', icon: '🛠️', color: 'border-purple-300 bg-purple-50 text-purple-900 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-900' },
  };

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Coordinateur Hiérarchique Multi-Agents
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez comment un agent Superviseur décompose une requête complexe et orchestre plusieurs sous-agents spécialisés.
          </p>
        </div>
      </div>

      {/* Sélection du cas d'usage */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Sélectionnez une requête multi-domaine :
        </label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioIndex(idx);
                setStep('idle');
              }}
              className={`rounded-lg border p-3 text-left transition ${
                selectedScenarioIndex === idx
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
              }`}
            >
              <div className="font-semibold text-sm">{sc.title}</div>
              <div className="mt-1 font-mono text-sm line-clamp-1 italic text-slate-600 dark:text-slate-400">
                &ldquo;{sc.prompt}&rdquo;
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lancement de l'orchestration */}
      <div className="mb-6">
        <button
          onClick={runSimulation}
          disabled={step !== 'idle' && step !== 'completed'}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {step === 'routing' || step === 'delegating' || step === 'synthesizing'
            ? 'Coordination en cours...'
            : '▶ Lancer l\'Orchestrateur Superviseur'}
        </button>
      </div>

      {/* Schéma visuel d'orchestration */}
      <div className="mb-6 space-y-4">
        {/* Nœud Superviseur Central */}
        <div
          className={`rounded-xl border p-4 text-center transition ${
            step === 'routing' || step === 'synthesizing'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 ring-2 ring-indigo-500 shadow-md animate-pulse'
              : 'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-950'
          }`}
        >
          <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <span>🧠 AGENT SUPERVISEUR (LangGraph StateGraph Router)</span>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {step === 'idle'
              ? 'En attente de la requête utilisateur...'
              : step === 'routing'
              ? 'Analyse sémantique et routage vers les sous-agents compétents...'
              : step === 'delegating'
              ? 'Supervise la progression des sous-agents en parallèle...'
              : 'Agrégation des réponses partielles et rédaction de la synthèse finale.'}
          </p>
        </div>

        {/* Flèches et sous-agents activés */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {currentScenario.plans.map((p, idx) => {
            const meta = agentMeta[p.agent];
            const isSubAgentActive = step === 'delegating' || step === 'synthesizing' || step === 'completed';

            return (
              <div
                key={idx}
                className={`rounded-lg border p-4 transition ${meta.color} ${
                  isSubAgentActive ? 'shadow-sm opacity-100' : 'opacity-40'
                }`}
              >
                <div className="flex items-center justify-between mb-2 border-b border-current/20 pb-1.5">
                  <span className="font-bold text-sm flex items-center gap-1.5">
                    <span>{meta.icon}</span> {meta.name}
                  </span>
                  <span className="text-sm font-semibold">
                    {step === 'delegating' ? '⏳ En cours...' : isSubAgentActive ? 'Terminé ✓' : 'En attente'}
                  </span>
                </div>

                <div className="text-sm font-medium mb-2">
                  <strong>Mission confiée :</strong> {p.task}
                </div>

                {isSubAgentActive && (
                  <div className="rounded bg-white/70 dark:bg-black/40 p-2.5 font-mono text-sm">
                    <strong>Résultat d&apos;inférence :</strong>
                    <div className="mt-1">{p.output}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Synthèse finale remise à l'utilisateur */}
      {step === 'completed' && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2 mb-2 font-bold text-sm text-emerald-900 dark:text-emerald-300">
            <span>✨ Réponse globale consolidée par le Superviseur :</span>
          </div>
          <p className="font-mono text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            &ldquo;{currentScenario.finalSynthesis}&rdquo;
          </p>
          <div className="mt-3 text-sm text-emerald-800 dark:text-emerald-400 italic">
            💡 Bénéfice architectural : Chaque sous-agent est resté dans son périmètre strict d&apos;outils, évitant tout risque d&apos;hallucination ou de mauvaise exécution SQL.
          </div>
        </div>
      )}
    </div>
  );
};

