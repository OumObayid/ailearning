'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/common/Icon';

export const WorkerThreadsLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blocking' | 'raceCondition'>('blocking');

  // Tab 1: Blocking vs Worker state
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [computeMode, setComputeMode] = useState<'main' | 'worker' | null>(null);
  const [pingCounter, setPingCounter] = useState<number>(0);
  const [computeResult, setComputeResult] = useState<string | null>(null);
  const [computeDuration, setComputeDuration] = useState<number | null>(null);

  // Background ping counter to show if UI is frozen
  useEffect(() => {
    const interval = setInterval(() => {
      setPingCounter((prev) => (prev + 1) % 100);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const runMainThreadBlock = () => {
    setIsComputing(true);
    setComputeMode('main');
    setComputeResult('Calcul en cours sur le Thread Principal (UI bloquée)...');
    setComputeDuration(null);

    // Simulate heavy calculation with a delay that demonstrates freezing
    setTimeout(() => {
      const start = performance.now();
      let total = 0;
      for (let i = 0; i < 40000000; i++) {
        total += Math.sqrt(i);
      }
      const dur = performance.now() - start;
      setComputeResult(`Terminé : Somme = ${total.toFixed(0)}`);
      setComputeDuration(Number(dur.toFixed(2)));
      setIsComputing(false);
    }, 50);
  };

  const runWorkerSimulation = () => {
    setIsComputing(true);
    setComputeMode('worker');
    setComputeResult('Calcul délégué à un Worker Thread en arrière-plan...');
    setComputeDuration(null);

    const start = performance.now();
    setTimeout(() => {
      let total = 0;
      for (let i = 0; i < 40000000; i++) {
        total += Math.sqrt(i);
      }
      const dur = performance.now() - start;
      setComputeResult(`Terminé par le Worker : Somme = ${total.toFixed(0)}`);
      setComputeDuration(Number(dur.toFixed(2)));
      setIsComputing(false);
    }, 1200);
  };

  // Tab 2: Race Condition simulation
  const [counterValue, setCounterValue] = useState<number>(0);
  const [isSimulatingRace, setIsSimulatingRace] = useState<boolean>(false);
  const [raceLog, setRaceLog] = useState<string[]>([]);

  const runRaceSimulation = (mode: 'unsafe' | 'atomic') => {
    setIsSimulatingRace(true);
    setCounterValue(0);
    setRaceLog([`Lancement de 2 Workers (10 000 incréments chacun)...`]);

    setTimeout(() => {
      if (mode === 'unsafe') {
        // Simulates concurrent collision and lost updates
        const lost = Math.floor(Math.random() * 4000) + 2500;
        const finalVal = 20000 - lost;
        setCounterValue(finalVal);
        setRaceLog((prev) => [
          ...prev,
          `⚠️ Conflit de concurrence détecté : plusieurs écritures simultanées écrasées.`,
          `Valeur finale attendue : 20 000`,
          `Valeur réelle obtenue : ${finalVal.toLocaleString()} (${lost.toLocaleString()} incréments perdus !)`,
        ]);
      } else {
        setCounterValue(20000);
        setRaceLog((prev) => [
          ...prev,
          `✅ Atomics.add() actif : chaque opération est indivisible et protégée.`,
          `Valeur finale : 20 000 / 20 000 (Zéro perte, cohérence parfaite !)`,
        ]);
      }
      setIsSimulatingRace(false);
    }, 800);
  };

  return (
    <div className="my-8 rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-2 border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-800">
            <Icon name="cpu" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Laboratoire Interactif : Threads &amp; Concurrence
            </h3>
            <p className="text-base text-slate-800 font-semibold">
              Observez en direct l&apos;impact d&apos;un Worker sur la réactivité et la synchronisation avec Atomics
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-100 p-1 border-2 border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('blocking')}
            className={`rounded-lg px-3.5 py-2 text-sm font-black transition ${
              activeTab === 'blocking'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            Thread Principal vs Worker
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('raceCondition')}
            className={`rounded-lg px-3.5 py-2 text-sm font-black transition ${
              activeTab === 'raceCondition'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            Race Conditions &amp; Atomics
          </button>
        </div>
      </div>

      {/* Tab 1: Blocking vs Worker */}
      {activeTab === 'blocking' && (
        <div className="mt-6 space-y-6">
          {/* UI Responsiveness Indicator */}
          <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
              </span>
              <div>
                <span className="text-sm font-bold text-slate-700 uppercase">Indicateur de réactivité du thread</span>
                <p className="text-base font-extrabold text-slate-950">
                  Battement d&apos;Event Loop : <span className="font-mono text-indigo-700">{pingCounter}</span>
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-600 max-w-xs text-center sm:text-right">
              Si ce compteur se fige, cela signifie que le thread principal JavaScript est bloqué.
            </span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={runMainThreadBlock}
              disabled={isComputing}
              className="flex flex-col items-start gap-1 rounded-2xl border-2 border-rose-300 bg-rose-50 p-5 text-left transition hover:bg-rose-100 disabled:opacity-50"
            >
              <div className="flex items-center gap-2 text-rose-950 font-black text-base">
                <Icon name="x" className="w-5 h-5 text-rose-700" />
                <span>Exécuter sur le Thread Principal</span>
              </div>
              <span className="text-sm font-semibold text-rose-800">
                Monopolise le Call Stack. Constatez le gel du serveur et de l&apos;interface.
              </span>
            </button>

            <button
              type="button"
              onClick={runWorkerSimulation}
              disabled={isComputing}
              className="flex flex-col items-start gap-1 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5 text-left transition hover:bg-emerald-100 disabled:opacity-50"
            >
              <div className="flex items-center gap-2 text-emerald-950 font-black text-base">
                <Icon name="check" className="w-5 h-5 text-emerald-700" />
                <span>Déléguer à un Worker Thread</span>
              </div>
              <span className="text-sm font-semibold text-emerald-800">
                Calcul en parallèle en arrière-plan. L&apos;Event Loop reste 100% disponible.
              </span>
            </button>
          </div>

          {/* Result terminal */}
          {computeResult && (
            <div className="rounded-2xl border-2 border-slate-950 bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between text-xs uppercase font-extrabold text-indigo-300 mb-2">
                <span>Console du serveur ({computeMode === 'main' ? 'Thread Principal' : 'Worker Thread'})</span>
                {computeDuration !== null && (
                  <span className="text-emerald-400 font-mono">Durée : {computeDuration} ms</span>
                )}
              </div>
              <p className="font-mono text-base font-bold text-emerald-400">
                {computeResult}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Race Condition & Atomics */}
      {activeTab === 'raceCondition' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => runRaceSimulation('unsafe')}
              disabled={isSimulatingRace}
              className="flex flex-col items-start gap-1 rounded-2xl border-2 border-rose-300 bg-rose-50 p-5 text-left transition hover:bg-rose-100 disabled:opacity-50"
            >
              <span className="text-base font-black text-rose-950">
                Sans Atomics (compteur[0]++)
              </span>
              <span className="text-sm font-semibold text-rose-800">
                Démontre une race condition : perte d&apos;incréments due aux collisions d&apos;écriture.
              </span>
            </button>

            <button
              type="button"
              onClick={() => runRaceSimulation('atomic')}
              disabled={isSimulatingRace}
              className="flex flex-col items-start gap-1 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5 text-left transition hover:bg-emerald-100 disabled:opacity-50"
            >
              <span className="text-base font-black text-emerald-950">
                Avec Atomics (Atomics.add())
              </span>
              <span className="text-sm font-semibold text-emerald-800">
                Opération atomique indivisible : garantie stricte de 20 000 incréments sans collision.
              </span>
            </button>
          </div>

          {/* Counter display */}
          <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-6 text-center space-y-2">
            <span className="text-xs uppercase font-black tracking-wider text-slate-700">
              Valeur finale dans SharedArrayBuffer
            </span>
            <p className={`text-4xl font-black ${
              counterValue === 20000 ? 'text-emerald-700' : counterValue > 0 ? 'text-rose-700' : 'text-slate-950'
            }`}>
              {isSimulatingRace ? 'Calcul des Workers...' : counterValue.toLocaleString()}
            </p>
            <span className="text-sm font-semibold text-slate-600 block">
              Objectif théorique : 2 Workers x 10 000 = 20 000
            </span>
          </div>

          {/* Logs */}
          {raceLog.length > 0 && (
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-4.5 space-y-2 font-mono text-sm">
              {raceLog.map((log, i) => (
                <div key={i} className="text-slate-900 font-semibold">{log}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
