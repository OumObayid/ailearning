'use client';

import React, { useState } from 'react';

interface TierTrace {
  tierNumber: number;
  tierName: string;
  technology: string;
  action: string;
  latencyMs: number;
  status: 'pending' | 'active' | 'success';
}

export const EndToEndPlatformSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTierIndex, setActiveTierIndex] = useState<number>(-1);
  const [streamedText, setStreamedText] = useState<string>('');

  const initialTiers: TierTrace[] = [
    {
      tierNumber: 1,
      tierName: 'Tier 1 : Frontend UI',
      technology: 'Next.js 16 + Tailwind CSS',
      action: 'Émission de la requête POST /api/chat avec token Bearer JWT et écoute du flux SSE.',
      latencyMs: 14,
      status: 'pending',
    },
    {
      tierNumber: 2,
      tierName: 'Tier 2 : Passerelle API',
      technology: 'Node.js + Express + Zod',
      action: 'Vérification signature HMAC JWT, contrôle RBAC et validation de forme Zod.',
      latencyMs: 6,
      status: 'pending',
    },
    {
      tierNumber: 3,
      tierName: 'Tier 3 : Double Stockage',
      technology: 'MySQL 8.x + Qdrant Vector DB',
      action: 'Vérification des droits en MySQL + Recherche sémantique top-3 chunks dans Qdrant.',
      latencyMs: 38,
      status: 'pending',
    },
    {
      tierNumber: 4,
      tierName: 'Tier 4 : Cognition IA',
      technology: 'Google Gemini 2.5 + LangGraph',
      action: 'Inférence générative guidée par le contexte RAG et streaming temps réel des tokens.',
      latencyMs: 980,
      status: 'pending',
    },
    {
      tierNumber: 5,
      tierName: 'Tier 5 : Automatisation',
      technology: 'n8n Webhook Asynchrone',
      action: 'Déclenchement du webhook asynchrone pour archivage légal et alerte métriques Slack.',
      latencyMs: 25,
      status: 'pending',
    },
  ];

  const [tiers, setTiers] = useState<TierTrace[]>(initialTiers);

  const finalMessage =
    'Conformément à la politique d\'entreprise 2026, le télétravail est autorisé jusqu\'à 2 jours par semaine pour les salariés justifiant de plus de 6 mois d\'ancienneté. Les titres restaurant sont intégralement maintenus.';

  const runFullPipeline = async () => {
    setIsRunning(true);
    setStreamedText('');
    setTiers(initialTiers);

    for (let i = 0; i < initialTiers.length; i++) {
      setActiveTierIndex(i);
      setTiers((prev) =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'active' } : t))
      );

      // Simulation spécifique du streaming au Tier 4
      if (i === 3) {
        // Stream text progressively
        const words = finalMessage.split(' ');
        for (let w = 0; w < words.length; w++) {
          setStreamedText((curr) => (curr ? curr + ' ' + words[w] : words[w]));
          await new Promise((r) => setTimeout(r, 40));
        }
      } else {
        await new Promise((r) => setTimeout(r, 450));
      }

      setTiers((prev) =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'success' } : t))
      );
    }

    setIsRunning(false);
  };

  const totalLatency = tiers.reduce((acc, t) => acc + t.latencyMs, 0);

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Traçage de Requête de Bout en Bout à 5 Tiers
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez la propagation complète d&apos;une requête documentaire traversant l&apos;intégralité des 5 tiers industriels.
          </p>
        </div>
        <button
          onClick={runFullPipeline}
          disabled={isRunning}
          className="self-start rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {isRunning ? 'Traçage en direct...' : '▶ Lancer le Traçage Complet'}
        </button>
      </div>

      {/* Cartographie séquentielle des 5 tiers */}
      <div className="mb-6 space-y-3">
        {tiers.map((t, idx) => {
          const isActive = activeTierIndex === idx && isRunning;
          const isDone = t.status === 'success';

          return (
            <div
              key={t.tierNumber}
              className={`rounded-lg border p-3.5 transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                isActive
                  ? 'border-indigo-500 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/40 ring-2 ring-indigo-500 shadow-sm'
                  : isDone
                  ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
                  : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isActive
                      ? 'bg-indigo-600 text-white animate-pulse'
                      : 'bg-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {isDone ? '✓' : t.tierNumber}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {t.tierName}
                    </span>
                    <span className="rounded bg-slate-200 px-2 py-0.5 text-sm font-mono text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {t.technology}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                    {t.action}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                <span className="font-mono text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {t.latencyMs} ms
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-sm font-bold ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                      : isActive
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {isDone ? 'COMPLÉTÉ' : isActive ? 'EN COURS...' : 'EN ATTENTE'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rendu temps réel pour l'utilisateur final */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Écran Client React (Tier 1 — Streaming SSE)
            </span>
            {streamedText && (
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-sm font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                Tokens en cours
              </span>
            )}
          </div>

          <div className="rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-800 dark:bg-slate-950 dark:text-slate-200 min-h-[90px] border border-slate-200 dark:border-slate-800">
            {streamedText ? (
              <p className="leading-relaxed">{streamedText}</p>
            ) : (
              <span className="text-slate-400 italic">En attente de réception du flux de tokens...</span>
            )}
          </div>
        </div>

        {/* Bilan télémétrique consolidé */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-sm font-semibold text-slate-300">
              Bilan Télémétrique OpenTelemetry
            </span>
            <span className="text-sm text-emerald-400 font-bold">
              Total : {totalLatency} ms
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Temps de Premier Token (TTFT) :</span>
              <span className="text-emerald-400">58 ms (Double stockage)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Calcul Inférence Gemini :</span>
              <span className="text-indigo-400">980 ms (Streaming fluide)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Découplage Asynchrone n8n :</span>
              <span className="text-emerald-400">Non bloquant (0 ms impact client)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Statut HTTP final :</span>
              <span className="text-emerald-400 font-bold">200 OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

