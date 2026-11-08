'use client';

import React, { useState } from 'react';

interface CacheEntry {
  id: string;
  query: string;
  response: string;
  tokens: number;
}

interface RequestRecord {
  id: number;
  query: string;
  cacheType: 'EXACT_HIT' | 'SEMANTIC_HIT' | 'MISS';
  latencyMs: number;
  costDollar: number;
  similarity?: number;
}

const PRESET_QUERIES = [
  {
    label: 'Requête Initiale (Tarifs)',
    query: 'Quels sont les tarifs de votre formule SaaS Pro ?',
    isSimilarToInitial: true,
  },
  {
    label: 'Requête Identique (Exact Match)',
    query: 'Quels sont les tarifs de votre formule SaaS Pro ?',
    isSimilarToInitial: true,
  },
  {
    label: 'Reformulation Sémantique (Synonymes)',
    query: 'Quel est le prix de l\'abonnement SaaS Pro mensuel ?',
    isSimilarToInitial: true,
  },
  {
    label: 'Sujet Totalement Différent',
    query: 'Comment réinitialiser mon mot de passe oublié ?',
    isSimilarToInitial: false,
  },
];

export const SemanticCacheSimulator: React.FC = () => {
  const [cacheMode, setCacheMode] = useState<'exact_only' | 'semantic'>('semantic');
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [history, setHistory] = useState<RequestRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleExecuteQuery = (queryText: string) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // 1. Recherche par correspondance exacte (Exact Hash)
      const exactMatch = cacheEntries.find(
        (c) => c.query.trim().toLowerCase() === queryText.trim().toLowerCase()
      );

      if (exactMatch) {
        setHistory((prev) => [
          {
            id: Date.now() + Math.random(),
            query: queryText,
            cacheType: 'EXACT_HIT',
            latencyMs: 2,
            costDollar: 0.0,
            similarity: 1.0,
          },
          ...prev,
        ]);
        return;
      }

      // 2. Recherche sémantique par similarité vectorielle (si activée)
      if (cacheMode === 'semantic') {
        const hasSemanticMatch = cacheEntries.some((c) =>
          c.query.includes('SaaS Pro') && queryText.includes('SaaS Pro')
        );

        if (hasSemanticMatch) {
          setHistory((prev) => [
            {
              id: Date.now() + Math.random(),
              query: queryText,
              cacheType: 'SEMANTIC_HIT',
              latencyMs: 5,
              costDollar: 0.0,
              similarity: 0.94,
            },
            ...prev,
          ]);
          return;
        }
      }

      // 3. Cache MISS : Appel réel simulé vers Google Gemini
      const newEntry: CacheEntry = {
        id: `cache_${Date.now()}`,
        query: queryText,
        response: queryText.includes('SaaS Pro')
          ? 'La formule SaaS Pro s\'élève à 49 € HT par mois et comprend 10 sièges utilisateurs.'
          : 'Pour réinitialiser votre mot de passe, rendez-vous sur la page de connexion et cliquez sur "Mot de passe oublié".',
        tokens: 180,
      };

      setCacheEntries((prev) => [newEntry, ...prev]);
      setHistory((prev) => [
        {
          id: Date.now() + Math.random(),
          query: queryText,
          cacheType: 'MISS',
          latencyMs: 1420,
          costDollar: 0.0036,
          similarity: 0.32,
        },
        ...prev,
      ]);
    }, 400);
  };

  const resetAll = () => {
    setCacheEntries([]);
    setHistory([]);
  };

  // Statistiques d'optimisation
  const totalRequests = history.length;
  const hits = history.filter((h) => h.cacheType !== 'MISS').length;
  const hitRate = totalRequests > 0 ? Math.round((hits / totalRequests) * 100) : 0;
  const savedDollars = (hits * 0.0036).toFixed(4);
  const savedTimeMs = hits * 1415;

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Cache Sémantique Vectoriel (Redis + Embeddings)
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez comment le cache sémantique intercepte les questions reformulées avant d&apos;atteindre le LLM.
          </p>
        </div>
        <button
          onClick={resetAll}
          className="self-start rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          Vider le Cache
        </button>
      </div>

      {/* Mode de cache */}
      <div className="mb-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-bold text-sm text-slate-900 dark:text-white block">
            Algorithme d&apos;interception du Cache :
          </span>
          <span className="text-sm text-slate-500">
            Comparez le cache traditionnel par clé exacte et le cache sémantique par similarité cosinus.
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCacheMode('exact_only')}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              cacheMode === 'exact_only'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
            }`}
          >
            Hash Exact Uniquement (MD5/SHA256)
          </button>
          <button
            onClick={() => setCacheMode('semantic')}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              cacheMode === 'semantic'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
            }`}
          >
            ⚡ Cache Sémantique (Embeddings &ge; 0.90)
          </button>
        </div>
      </div>

      {/* Boutons d'émission de questions */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Cliquez pour soumettre une question cliente à l&apos;API :
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              disabled={isProcessing}
              onClick={() => handleExecuteQuery(preset.query)}
              className="rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-500 hover:bg-indigo-50/40 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-600"
            >
              <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                {preset.label}
              </div>
              <div className="mt-1 font-mono text-sm text-slate-800 dark:text-slate-200">
                &ldquo;{preset.query}&rdquo;
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tableau de bord d'optimisation financière */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Taux de Cache Hit</span>
          <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {hitRate} %
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Temps Latence Épargné</span>
          <div className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {(savedTimeMs / 1000).toFixed(2)} s
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Économie Facturation API</span>
          <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            ${savedDollars}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Entrées en Cache Redis</span>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {cacheEntries.length}
          </div>
        </div>
      </div>

      {/* Journal des requêtes en direct */}
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
        <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-mono text-sm font-semibold text-slate-300">
            Journal de télémétrie de la passerelle API
          </span>
          <span className="text-sm text-slate-500">{totalRequests} requêtes traitées</span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto font-mono text-sm">
          {history.length === 0 ? (
            <div className="text-slate-500 italic py-6 text-center">
              Aucune requête émise pour l&apos;instant. Cliquez sur une question ci-dessus pour tester.
            </div>
          ) : (
            history.map((record) => (
              <div
                key={record.id}
                className={`flex items-center justify-between p-2 rounded ${
                  record.cacheType === 'EXACT_HIT'
                    ? 'bg-blue-950/40 text-blue-300 border border-blue-900/60'
                    : record.cacheType === 'SEMANTIC_HIT'
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900/60 font-semibold'
                    : 'bg-rose-950/40 text-rose-300 border border-rose-900/60'
                }`}
              >
                <div className="truncate flex-1 mr-3">
                  <span className="font-bold mr-2">
                    {record.cacheType === 'SEMANTIC_HIT'
                      ? '⚡ SEMANTIC HIT'
                      : record.cacheType === 'EXACT_HIT'
                      ? '🎯 EXACT HIT'
                      : '❌ CACHE MISS (LLM Call)'}
                  </span>
                  <span>&ldquo;{record.query}&rdquo;</span>
                </div>
                <div className="flex items-center gap-4 text-sm shrink-0">
                  <span>{record.latencyMs} ms</span>
                  <span className="font-bold">${record.costDollar.toFixed(4)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

