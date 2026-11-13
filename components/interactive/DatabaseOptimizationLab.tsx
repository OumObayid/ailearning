'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

export const DatabaseOptimizationLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explain' | 'pagination' | 'pool'>('explain');

  // TAB 1: Explain & Index simulator
  const [selectedQuery, setSelectedQuery] = useState<'by_user' | 'by_user_and_date' | 'by_date_only' | 'like_wildcard'>('by_user');
  const [activeIndexes, setActiveIndexes] = useState<{ simpleUser: boolean; compositeUserDate: boolean }>({
    simpleUser: false,
    compositeUserDate: false,
  });

  // TAB 2: Pagination simulator
  const [pageDepth, setPageDepth] = useState<number>(1);
  const [paginationMethod, setPaginationMethod] = useState<'offset' | 'cursor'>('offset');

  // TAB 3: Connection Pool simulator
  const [poolLimit, setPoolLimit] = useState<number>(5);
  const [activeConnections, setActiveConnections] = useState<number>(0);
  const [waitingQueue, setWaitingQueue] = useState<number>(0);
  const [txState, setTxState] = useState<'idle' | 'running' | 'committed' | 'rolledBack'>('idle');

  // Calculate Explain simulation results
  const getExplainOutput = () => {
    if (selectedQuery === 'by_user') {
      if (activeIndexes.compositeUserDate) {
        return { type: 'ref', key: 'idx_user_date', rows: 100, timeMs: 0.8, extra: 'Using index condition', status: 'optimal' };
      }
      if (activeIndexes.simpleUser) {
        return { type: 'ref', key: 'idx_user_id', rows: 100, timeMs: 1.1, extra: 'Using where', status: 'optimal' };
      }
      return { type: 'ALL', key: 'NULL', rows: 100000, timeMs: 245.0, extra: 'Using where', status: 'slow' };
    }

    if (selectedQuery === 'by_user_and_date') {
      if (activeIndexes.compositeUserDate) {
        return { type: 'ref', key: 'idx_user_date', rows: 20, timeMs: 0.6, extra: 'Using index condition', status: 'optimal' };
      }
      if (activeIndexes.simpleUser) {
        return { type: 'ref', key: 'idx_user_id', rows: 100, timeMs: 3.5, extra: 'Using where; Using filesort', status: 'medium' };
      }
      return { type: 'ALL', key: 'NULL', rows: 100000, timeMs: 260.0, extra: 'Using where; Using filesort', status: 'slow' };
    }

    if (selectedQuery === 'by_date_only') {
      // Leftmost prefix rule fails for (user_id, created_at) when user_id is absent!
      return { type: 'ALL', key: 'NULL', rows: 100000, timeMs: 230.0, extra: 'Using where', status: 'slow', note: 'Règle du préfixe gauche : idx_user_date est ignoré car user_id est absent.' };
    }

    // Like wildcard %Node%
    return { type: 'ALL', key: 'NULL', rows: 100000, timeMs: 275.0, extra: 'Using where', status: 'slow', note: 'LIKE %...% avec joker initial empêche l\'utilisation d\'un index B-Tree ordinaire.' };
  };

  const explainResult = getExplainOutput();

  // Handlers Tab 3: Pool
  const simulateBurstRequests = (count: number) => {
    const newActive = Math.min(count, poolLimit);
    const newWaiting = Math.max(0, count - poolLimit);
    setActiveConnections(newActive);
    setWaitingQueue(newWaiting);

    setTimeout(() => {
      setActiveConnections(0);
      setWaitingQueue(0);
    }, 1800);
  };

  const runTransactionSimulation = (shouldFail: boolean) => {
    setTxState('running');
    setActiveConnections(1);

    setTimeout(() => {
      if (shouldFail) {
        setTxState('rolledBack');
      } else {
        setTxState('committed');
      }
      setActiveConnections(0);
    }, 1200);
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-900 border border-emerald-400">
            Laboratoire Interactif · Module 4
          </span>
          <h3 className="mt-1 text-2xl font-black text-slate-950">
            Simulateur d&apos;Optimisation SQL, Indexation &amp; Pool
          </h3>
          <p className="text-sm font-semibold text-slate-800">
            Testez l&apos;impact de vos choix d&apos;indexation et observez les métriques de requêtes en direct.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex rounded-lg border-2 border-slate-900 bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab('explain')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-black transition-all ${
              activeTab === 'explain'
                ? 'bg-slate-950 text-white shadow'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <Icon name="search" className="h-4 w-4" />
            Index &amp; EXPLAIN
          </button>
          <button
            onClick={() => setActiveTab('pagination')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-black transition-all ${
              activeTab === 'pagination'
                ? 'bg-slate-950 text-white shadow'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <Icon name="layers" className="h-4 w-4" />
            OFFSET vs Curseur
          </button>
          <button
            onClick={() => setActiveTab('pool')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-black transition-all ${
              activeTab === 'pool'
                ? 'bg-slate-950 text-white shadow'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <Icon name="server" className="h-4 w-4" />
            Pool &amp; Transactions
          </button>
        </div>
      </div>

      {/* TAB 1: EXPLAIN & INDEX */}
      {activeTab === 'explain' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-indigo-950">
              Scénario : Optimisation d&apos;une table de 100 000 conversations IA
            </h4>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Activez des index et choisissez votre requête pour voir comment l&apos;optimiseur MySQL réagit instantanément.
            </p>
          </div>

          {/* Controls: Select Query and Toggle Indexes */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase text-slate-800">
                1. Sélectionner la requête SQL testée
              </label>
              <select
                value={selectedQuery}
                onChange={(e) => setSelectedQuery(e.target.value as 'by_user' | 'by_user_and_date' | 'by_date_only' | 'like_wildcard')}
                className="w-full rounded-lg border-2 border-slate-900 bg-white p-2.5 text-sm font-bold text-slate-950"
              >
                <option value="by_user">SELECT * FROM conversations WHERE user_id = 12</option>
                <option value="by_user_and_date">WHERE user_id = 12 ORDER BY created_at DESC LIMIT 20</option>
                <option value="by_date_only">WHERE created_at &gt;= &apos;2026-10-01&apos; (sans user_id)</option>
                <option value="like_wildcard">WHERE titre LIKE &apos;%Node.js%&apos;</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-black uppercase text-slate-800">
                2. Définir les index présents sur la table
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeIndexes.simpleUser}
                    onChange={(e) => setActiveIndexes({ ...activeIndexes, simpleUser: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-400 text-indigo-600"
                  />
                  <span>INDEX simple : idx_user_id (user_id)</span>
                </label>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeIndexes.compositeUserDate}
                    onChange={(e) => setActiveIndexes({ ...activeIndexes, compositeUserDate: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-400 text-indigo-600"
                  />
                  <span>INDEX composite : idx_user_date (user_id, created_at)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Explain Output Card */}
          <div className="rounded-xl border-2 border-slate-900 bg-slate-950 p-5 font-mono text-sm shadow-inner">
            <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2 text-xs text-slate-400">
              <span className="font-bold text-emerald-400">Plan d&apos;Exécution EXPLAIN généré par MySQL</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">InnoDB Engine</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-slate-400">
                  <tr>
                    <th className="p-2">table</th>
                    <th className="p-2">type</th>
                    <th className="p-2">possible_keys</th>
                    <th className="p-2">key</th>
                    <th className="p-2">rows</th>
                    <th className="p-2">Extra</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 text-slate-200">conversations</td>
                    <td className={`p-2 font-black ${explainResult.type === 'ALL' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {explainResult.type}
                    </td>
                    <td className="p-2 text-slate-300">
                      {explainResult.key === 'NULL' ? 'NULL' : explainResult.key}
                    </td>
                    <td className="p-2 font-bold text-yellow-300">{explainResult.key}</td>
                    <td className={`p-2 font-black ${explainResult.rows > 1000 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {explainResult.rows.toLocaleString()}
                    </td>
                    <td className="p-2 text-slate-300">{explainResult.extra}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {explainResult.note && (
              <p className="mt-3 rounded border border-amber-500/30 bg-amber-950/40 p-2 text-xs text-amber-300">
                ⚠️ Note de l&apos;analyseur : {explainResult.note}
              </p>
            )}
          </div>

          {/* Metric gauges - Max 2 cartes par ligne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">Temps SQL Estimé</span>
              <p className={`text-2xl font-black ${explainResult.timeMs > 50 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {explainResult.timeMs} ms
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">Lignes Balayées</span>
              <p className={`text-2xl font-black ${explainResult.rows > 1000 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {explainResult.rows.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0 sm:col-span-2">
              <span className="text-xs font-bold uppercase text-slate-600 block">Verdict Performance</span>
              <p className={`text-2xl font-black uppercase ${explainResult.status === 'slow' ? 'text-rose-600' : 'text-emerald-600'}`}>
                {explainResult.status === 'slow' ? 'Full Scan (Lent)' : 'Optimal (Index)'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAGINATION */}
      {activeTab === 'pagination' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-amber-950">
              Scénario : Pagination sur une table d&apos;un million d&apos;enregistrements
            </h4>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Sélectionnez une profondeur de page pour observer le phénomène d&apos;explosion du coût avec OFFSET vs la stabilité absolue du curseur.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase text-slate-700">Choisir la profondeur de la page :</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {[1, 50, 500, 2000, 10000].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPageDepth(p)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-black transition-all ${
                      pageDepth === p ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    Page {p.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-black uppercase text-slate-700">Méthode de pagination :</span>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setPaginationMethod('offset')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-black transition-all ${
                    paginationMethod === 'offset' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  LIMIT 10 OFFSET {(pageDepth - 1) * 10}
                </button>
                <button
                  onClick={() => setPaginationMethod('cursor')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-black transition-all ${
                    paginationMethod === 'cursor' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  Curseur (created_at, id)
                </button>
              </div>
            </div>
          </div>

          {/* Simulation stats comparison - Max 2 cartes par ligne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">Lignes parcourues puis jetées</span>
              <p className="text-3xl font-black text-rose-600">
                {paginationMethod === 'offset' ? ((pageDepth - 1) * 10).toLocaleString() : '0 (saut B+Tree)'}
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">Temps de réponse SQL</span>
              <p className="text-3xl font-black text-slate-950">
                {paginationMethod === 'offset'
                  ? `${Math.max(1, Math.round(pageDepth * 0.055 * 10) / 10)} ms`
                  : '1.2 ms'}
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 text-center break-words [overflow-wrap:anywhere] min-w-0 sm:col-span-2">
              <span className="text-xs font-bold uppercase text-slate-600 block">Impact Mémoire &amp; CPU</span>
              <p className={`text-3xl font-black ${paginationMethod === 'offset' && pageDepth > 500 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {paginationMethod === 'offset' && pageDepth > 500 ? 'Élevé (Gaspillage)' : 'Optimal O(1)'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONNECTION POOL */}
      {activeTab === 'pool' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-sky-950">
              Scénario : Gestion de la concurrence avec un pool MySQL de taille {poolLimit}
            </h4>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Déclenchez une rafale de requêtes simultanées ou simulez une transaction atomique (commit vs rollback).
            </p>
          </div>

          {/* Sliders and trigger buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase text-slate-800">Taille du pool (connectionLimit) :</span>
              <input
                type="range"
                min="3"
                max="15"
                value={poolLimit}
                onChange={(e) => setPoolLimit(Number(e.target.value))}
                className="cursor-pointer"
              />
              <span className="font-mono text-sm font-black text-indigo-700">{poolLimit} connexions</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => simulateBurstRequests(4)}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-black text-white hover:bg-indigo-700"
              >
                Rafale 4 requêtes
              </button>
              <button
                onClick={() => simulateBurstRequests(12)}
                className="rounded-lg bg-indigo-900 px-3 py-1.5 text-xs font-black text-white hover:bg-indigo-800"
              >
                Rafale 12 requêtes (Saturation)
              </button>
            </div>
          </div>

          {/* Sockets representation */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-slate-700">Sockets physiques du pool :</span>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {Array.from({ length: poolLimit }).map((_, i) => {
                const isBusy = i < activeConnections;
                return (
                  <div
                    key={i}
                    className={`rounded-lg border-2 p-2.5 text-center font-mono text-xs font-black transition-all ${
                      isBusy
                        ? 'border-rose-500 bg-rose-100 text-rose-800'
                        : 'border-emerald-500 bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    #{i + 1}
                    <div className="mt-1 text-[10px]">{isBusy ? 'OCCUPÉE' : 'LIBRE'}</div>
                  </div>
                );
              })}
            </div>
            {waitingQueue > 0 && (
              <p className="text-xs font-bold text-amber-700">
                ⏳ {waitingQueue} requête(s) HTTP en file d&apos;attente (queueLimit) car toutes les connexions sont réservées.
              </p>
            )}
          </div>

          {/* Transaction test */}
          <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-800">
              Test de Transaction Atomique (beginTransaction $\rightarrow$ commit / rollback)
            </h4>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => runTransactionSimulation(false)}
                disabled={txState === 'running'}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 disabled:bg-slate-300"
              >
                Simuler Transaction Réussie (COMMIT)
              </button>
              <button
                onClick={() => runTransactionSimulation(true)}
                disabled={txState === 'running'}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-black text-white hover:bg-rose-700 disabled:bg-slate-300"
              >
                Simuler Incident &amp; Annulation (ROLLBACK)
              </button>
            </div>

            {txState !== 'idle' && (
              <div className="rounded border bg-white p-3 font-mono text-xs">
                {txState === 'running' && <span className="text-indigo-600 font-bold">Transaction en cours sur socket dédiée...</span>}
                {txState === 'committed' && <span className="text-emerald-700 font-bold">✔ COMMIT validé : Débit &amp; Crédit synchronisés avec succès. Connexion libérée via connection.release().</span>}
                {txState === 'rolledBack' && <span className="text-rose-700 font-bold">✘ Erreur simulée : ROLLBACK exécuté. Aucune modification partielle résiduelle. Connexion libérée.</span>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
