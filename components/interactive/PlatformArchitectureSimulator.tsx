'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type PlatformScenario = 'rag_citation' | 'agent_hitl' | 'doc_ingestion';

interface TierLog {
  tierName: string;
  badge: string;
  action: string;
  payload: Record<string, unknown>;
  latencyMs: number;
}

export const PlatformArchitectureSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<PlatformScenario>('rag_citation');
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const scenarioSuites: Record<
    PlatformScenario,
    {
      title: string;
      description: string;
      userAction: string;
      tiers: TierLog[];
      finalResult: string;
      kpis: {
        totalLatencyMs: number;
        sqlQueriesCount: number;
        vectorMatchesCount: number;
        n8nWebhookTriggered: boolean;
      };
    }
  > = {
    rag_citation: {
      title: '1. Recherche RAG avec Citation des Sources',
      description: 'L utilisateur interroge un document interne. Le système retrouve les fragments, cite la page et répond avec ancrage strict.',
      userAction: '« Quels sont les délais de résiliation prévus au contrat cadre 2026 ? »',
      finalResult: 'Selon l article 14.2 du contrat cadre 2026 (Page 18, Chro-491), le délai de résiliation est de 3 mois calendaires avant la date d anniversaire.',
      kpis: {
        totalLatencyMs: 840,
        sqlQueriesCount: 2,
        vectorMatchesCount: 3,
        n8nWebhookTriggered: false,
      },
      tiers: [
        {
          tierName: 'Tier 1 : Frontend React & Next.js',
          badge: 'UI / UX',
          action: 'Capture du prompt utilisateur et émission de la requête HTTP vers la passerelle',
          latencyMs: 12,
          payload: {
            endpoint: '/api/conversations/conv_9042/messages',
            method: 'POST',
            body: {
              prompt: 'Quels sont les délais de résiliation prévus au contrat cadre 2026 ?',
            },
            auth: 'Bearer eyJhbGciOiJIUzI1NiIs...',
          },
        },
        {
          tierName: 'Tier 2 : Passerelle API Express',
          badge: 'Auth & Zod',
          action: 'Validation JWT, sanitisation Zod et injection du Correlation ID',
          latencyMs: 18,
          payload: {
            authenticatedUser: { userId: 42, role: 'collaborator' },
            correlationId: 'req_89f02a_live',
            zodValidation: 'PASSED',
            sanitizedPromptLength: 68,
          },
        },
        {
          tierName: 'Tier 3 : Moteur RAG (Qdrant & MySQL)',
          badge: 'Vector & SQL',
          action: 'Embedding Gemini, recherche de similarité Qdrant et extraction des métadonnées MySQL',
          latencyMs: 310,
          payload: {
            embeddingModel: 'text-embedding-004',
            qdrantMatches: [
              { pointId: 'chunk_1804', score: 0.93, document: 'contrat_cadre_2026.pdf', page: 18 },
            ],
            sqlDocumentCheck: 'SELECT title, original_filename FROM documents WHERE id = 12 AND user_id = 42',
          },
        },
        {
          tierName: 'Tier 4 : Modèle Google Gemini',
          badge: 'Inférence IA',
          action: 'Génération de la réponse ancrée avec interdiction formelle d hallucination',
          latencyMs: 480,
          payload: {
            model: 'gemini-2.5-flash',
            temperature: 0.1,
            sourcesCited: ['contrat_cadre_2026.pdf#page=18'],
            tokensGenerated: 46,
          },
        },
        {
          tierName: 'Tier 5 : Persistance & Sortie',
          badge: 'MySQL2',
          action: 'Sauvegarde du message et de la table d audit message_sources',
          latencyMs: 20,
          payload: {
            savedMessageId: 10482,
            sourcesLinked: [{ chunkId: 'chunk_1804', relevance: 0.93 }],
            status: 'COMPLETED',
          },
        },
      ],
    },
    agent_hitl: {
      title: '2. Agent Autonome avec Validation Humaine (HITL)',
      description: 'L utilisateur demande une modification de contrat. LangGraph suspend le flux (interrupt) et attend l approbation du responsable.',
      userAction: '« Modifie la clause de renouvellement du contrat #402 et notifie le client par email. »',
      finalResult: 'L action a été suspendue (interrupt). Suite à l approbation de l administrateur, le contrat a été mis à jour et l email a été envoyé.',
      kpis: {
        totalLatencyMs: 1250,
        sqlQueriesCount: 4,
        vectorMatchesCount: 1,
        n8nWebhookTriggered: true,
      },
      tiers: [
        {
          tierName: 'Tier 1 : Frontend React',
          badge: 'UI / UX',
          action: 'Soumission de la commande d agent et affichage de la bannière de suspension',
          latencyMs: 15,
          payload: {
            action: 'run_agent_task',
            intent: 'contract_amendment',
          },
        },
        {
          tierName: 'Tier 2 : Passerelle Express',
          badge: 'Auth & RBAC',
          action: 'Contrôle des privilèges : l utilisateur possède le rôle "gestionnaire"',
          latencyMs: 22,
          payload: {
            userId: 18,
            role: 'manager',
            requiredPermission: 'contracts:modify',
            authorized: true,
          },
        },
        {
          tierName: 'Tier 3 : Orchestrateur LangGraph.js',
          badge: 'StateGraph',
          action: 'Évaluation des étapes, détection d une mutation critique et déclenchement de interrupt()',
          latencyMs: 420,
          payload: {
            currentNode: 'approval_node',
            suspended: true,
            interruptPrompt: 'Confirmez-vous la modification de la clause de renouvellement du contrat #402 ?',
          },
        },
        {
          tierName: 'Tier 4 : Reprise après Décision Humaine',
          badge: 'Command Resume',
          action: 'L administrateur clique sur [Approuver] : reprise du graphe sur le même thread_id',
          latencyMs: 380,
          payload: {
            threadId: 'thread_amendment_402',
            resumedWith: { approved: true },
            mysqlUpdated: 'UPDATE contracts SET clause = ? WHERE id = 402',
          },
        },
        {
          tierName: 'Tier 5 : Automatisation n8n',
          badge: 'Webhook Externe',
          action: 'Déclenchement du workflow de notification client via webhook sécurisé',
          latencyMs: 413,
          payload: {
            webhookUrl: 'https://n8n.internal.net/webhook/notify-client',
            headers: { 'X-Webhook-Secret': 'whsec_prod_live_894f2a' },
            emailDispatched: true,
          },
        },
      ],
    },
    doc_ingestion: {
      title: '3. Ingestion Documentaire & Pipeline Vectoriel',
      description: 'Téléversement d un PDF interne : extraction du texte, découpage en chunks, embeddings Gemini et indexation Qdrant.',
      userAction: 'Téléversement du fichier : « politique_confidentialite_2026.pdf » (1.4 Mo)',
      finalResult: 'Document indexé avec succès : 42 fragments générés et synchronisés dans Qdrant et MySQL.',
      kpis: {
        totalLatencyMs: 1950,
        sqlQueriesCount: 43,
        vectorMatchesCount: 0,
        n8nWebhookTriggered: true,
      },
      tiers: [
        {
          tierName: 'Tier 1 : Frontend React Uploader',
          badge: 'Multi-part Upload',
          action: 'Upload par glisser-déposer avec barre de progression temps réel',
          latencyMs: 120,
          payload: {
            fileName: 'politique_confidentialite_2026.pdf',
            sizeBytes: 1420800,
            mimeType: 'application/pdf',
          },
        },
        {
          tierName: 'Tier 2 : Passerelle Express & Storage',
          badge: 'Validation Fichier',
          action: 'Validation du type MIME réel, stockage hors web-root et génération du document_id',
          latencyMs: 85,
          payload: {
            documentId: 108,
            storagePath: '/secure_storage/uploads/doc_108_uuid.pdf',
            status: 'processing',
          },
        },
        {
          tierName: 'Tier 3 : Extraction & Chunking',
          badge: 'Text Extractor',
          action: 'Extraction page par page et découpage en blocs de 600 tokens avec overlap de 100 tokens',
          latencyMs: 420,
          payload: {
            totalPages: 8,
            totalChunksGenerated: 42,
            averageChunkLengthWords: 110,
          },
        },
        {
          tierName: 'Tier 4 : Vectorisation & Qdrant Upsert',
          badge: 'Embeddings Gemini',
          action: 'Génération des vecteurs 768-D via text-embedding-004 et insertion par lot dans Qdrant',
          latencyMs: 980,
          payload: {
            collection: 'enterprise_knowledge',
            vectorsInserted: 42,
            dimension: 768,
          },
        },
        {
          tierName: 'Tier 5 : Synchro MySQL & Webhook n8n',
          badge: 'Finalisation',
          action: 'Mise à jour du statut à "indexed" et notification n8n de fin d indexation',
          latencyMs: 345,
          payload: {
            mysqlStatus: 'indexed',
            indexedAt: '2026-11-04T18:55:00Z',
            n8nExecutionId: 'exec_wf_doc_sync_819',
          },
        },
      ],
    },
  };

  const currentSuite = scenarioSuites[activeScenario];
  const activeTier = currentSuite.tiers[selectedTierIndex] || currentSuite.tiers[0];

  const handleSimulateRun = () => {
    setIsRunning(true);
    setSelectedTierIndex(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < currentSuite.tiers.length) {
        setSelectedTierIndex(step);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 600);
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-700 bg-slate-900/95 text-slate-100 shadow-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30">
            <Icon name="rocket" className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Simulateur d&apos;Architecture 5-Tiers — Plateforme Documentaire Globale
            </h3>
            <p className="text-sm text-slate-400">
              Traçabilité end-to-end : React, Express, Qdrant, MySQL, Gemini, LangGraph & n8n
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateRun}
          disabled={isRunning}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-500 disabled:opacity-50 transition"
        >
          <Icon name="refresh-cw" className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Simulation en cours...' : 'Exécuter le scénario'}</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Scenario Selection */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Sélectionnez un scénario d&apos;architecture de synthèse :
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(Object.keys(scenarioSuites) as PlatformScenario[]).map((key) => {
              const item = scenarioSuites[key];
              const isSelected = activeScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveScenario(key);
                    setSelectedTierIndex(0);
                  }}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-orange-950/40 text-white ring-1 ring-orange-500 shadow-sm'
                      : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-sm font-bold text-orange-300">{item.title}</div>
                  <div className="text-sm text-slate-400 mt-1 line-clamp-2">{item.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* User Action Trigger */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
          <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Événement Déclencheur Utilisateur :</span>
          <p className="text-sm font-medium text-slate-200 italic">{currentSuite.userAction}</p>
        </div>

        {/* 5-Tiers Pipeline Stepper */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Traversée des 5 Tiers Applicatifs :
            </span>
            <span className="text-sm text-slate-400">
              Latence cumulée : <strong className="text-slate-100">{currentSuite.kpis.totalLatencyMs} ms</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {currentSuite.tiers.map((tier, idx) => {
              const isSelected = selectedTierIndex === idx;
              return (
                <button
                  key={tier.tierName}
                  onClick={() => setSelectedTierIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-orange-400 bg-orange-950/50 ring-2 ring-orange-500/60 shadow-lg'
                      : 'border-slate-700 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-400 font-mono">T#{idx + 1}</span>
                    <span className="text-sm px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-medium">
                      {tier.badge}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-100 line-clamp-1">{tier.tierName}</div>
                  <div className="text-sm text-orange-300 font-mono mt-2">{tier.latencyMs} ms</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Tier Inspector */}
        <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <span className="text-sm font-mono text-orange-400 font-semibold">
                Niveau actif : {activeTier.tierName}
              </span>
              <div className="text-sm text-slate-300 mt-0.5">{activeTier.action}</div>
            </div>
            <span className="text-sm font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              Durée d exécution : <strong className="text-slate-200">{activeTier.latencyMs} ms</strong>
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Icon name="terminal" className="h-4 w-4 text-slate-400" />
              <span>Charge utile et métadonnées sérialisées :</span>
            </span>
            <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-sm font-mono text-orange-200 overflow-x-auto max-h-52">
              {JSON.stringify(activeTier.payload, null, 2)}
            </pre>
          </div>

          {/* KPI Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-sm text-slate-400">Latence Totale</span>
              <p className="text-base font-bold text-slate-100 mt-0.5">{currentSuite.kpis.totalLatencyMs} ms</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-sm text-slate-400">Requêtes SQL</span>
              <p className="text-base font-bold text-slate-100 mt-0.5">{currentSuite.kpis.sqlQueriesCount} queries</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-sm text-slate-400">Vecteurs Qdrant</span>
              <p className="text-base font-bold text-slate-100 mt-0.5">{currentSuite.kpis.vectorMatchesCount} chunks</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-sm text-slate-400">Automatisation n8n</span>
              <p className="text-base font-bold text-emerald-400 mt-0.5">
                {currentSuite.kpis.n8nWebhookTriggered ? 'DÉCLENCHÉE' : 'NON REQUISE'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-sm">
            <strong className="text-slate-300">Résultat final consolidé : </strong>
            <span className="text-slate-200 font-medium">{currentSuite.finalResult}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

