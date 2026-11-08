'use client';

import React, { useState, useEffect, useRef } from 'react';

export const StreamVsBatchSimulator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'batch' | 'stream'>('stream');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [outputTokens, setOutputTokens] = useState<string[]>([]);
  const [ttftMs, setTtftMs] = useState<number | null>(null);

  const sampleTokens = [
    'Le', 'développement', 'frontend', 'moderne', 'intégrant', "l'intelligence",
    'artificielle', 'repose', 'sur', 'trois', 'piliers', 'fondamentaux', ':',
    '1.', 'Le', 'streaming', 'de', 'tokens', 'temps', 'réel', 'qui', 'réduit', 'la', 'latence', 'perçue', ';',
    '2.', 'La', 'validation', 'stricte', 'des', 'sorties', 'JSON', 'via', 'Zod', ';',
    '3.', 'La', 'gestion', 'robuste', 'des', 'annulations', 'grâce', 'à', 'AbortController.'
  ];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSimulation = () => {
    setIsRunning(true);
    setElapsedMs(0);
    setOutputTokens([]);
    setTtftMs(null);

    const startTime = Date.now();

    if (activeMode === 'batch') {
      // Mode Monobloc (Batch) : attente de 3.5s puis affichage complet d'un bloc
      timerRef.current = setInterval(() => {
        const current = Date.now() - startTime;
        setElapsedMs(current);
        if (current >= 3500) {
          clearInterval(timerRef.current!);
          setOutputTokens(sampleTokens);
          setTtftMs(3500);
          setIsRunning(false);
        }
      }, 50);
    } else {
      // Mode Streaming : premier token en 350ms, puis émission régulière toutes les 90ms
      let tokenIdx = 0;
      let ttftRecorded = false;

      timerRef.current = setInterval(() => {
        const current = Date.now() - startTime;
        setElapsedMs(current);

        if (current >= 350 && !ttftRecorded) {
          ttftRecorded = true;
          setTtftMs(350);
        }

        if (current >= 350 && tokenIdx < sampleTokens.length) {
          setOutputTokens((prev) => [...prev, sampleTokens[tokenIdx]]);
          tokenIdx++;
        }

        if (tokenIdx >= sampleTokens.length) {
          clearInterval(timerRef.current!);
          setIsRunning(false);
        }
      }, 90);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-cyan-50 px-2.5 py-0.5 text-sm font-bold text-cyan-700">
              Lab Performance Frontend
            </span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-0.5 text-sm font-bold text-indigo-700">
              UX & Latence Perçue
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
            Simulateur Comparatif : Streaming SSE versus Requête Monobloc (Batch)
          </h4>
        </div>

        {/* Sélecteur de mode */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => { setActiveMode('stream'); setOutputTokens([]); setElapsedMs(0); setTtftMs(null); }}
            className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${
              activeMode === 'stream'
                ? 'bg-white text-cyan-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Streaming SSE (Recommandé)
          </button>
          <button
            onClick={() => { setActiveMode('batch'); setOutputTokens([]); setElapsedMs(0); setTtftMs(null); }}
            className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${
              activeMode === 'batch'
                ? 'bg-white text-amber-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monobloc Synchrone (Batch)
          </button>
        </div>
      </div>

      {/* Métriques d'expérience utilisateur */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
          <span className="text-sm font-bold text-slate-500 block">Temps écoulé total</span>
          <span className="text-2xl font-extrabold font-mono text-slate-900 mt-1 block">
            {(elapsedMs / 1000).toFixed(2)} s
          </span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
          <span className="text-sm font-bold text-slate-500 block">Premier token affiché (TTFT)</span>
          <span className={`text-2xl font-extrabold font-mono mt-1 block ${
            ttftMs ? (ttftMs < 1000 ? 'text-emerald-600' : 'text-amber-600') : 'text-slate-400'
          }`}>
            {ttftMs ? `${ttftMs} ms` : '—'}
          </span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
          <span className="text-sm font-bold text-slate-500 block">Tokens restitués</span>
          <span className="text-2xl font-extrabold font-mono text-slate-900 mt-1 block">
            {outputTokens.length} / {sampleTokens.length}
          </span>
        </div>
      </div>

      {/* Zone de visualisation du texte */}
      <div className="mt-6 rounded-2xl border border-slate-200 p-5 bg-slate-900 text-slate-100 min-h-[140px] flex flex-col justify-between shadow-inner">
        <div className="text-sm leading-relaxed font-sans">
          {outputTokens.length > 0 ? (
            outputTokens.map((tok, idx) => (
              <span key={idx} className="inline-block mr-1.5 animate-fadeIn">
                {tok}
              </span>
            ))
          ) : (
            <span className="text-slate-500 italic">
              {isRunning
                ? (activeMode === 'batch'
                    ? "⏳ Requête en cours sur le serveur... L'utilisateur attend devant un écran figé..."
                    : "⚡ Connexion SSE établie... Réception des premiers fragments...")
                : "Cliquez sur 'Lancer la simulation' pour comparer l'expérience vécue par l'utilisateur."}
            </span>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-sm text-slate-400">
          <span>Mode sélectionné : {activeMode === 'stream' ? 'Server-Sent Events (SSE)' : 'JSON Monobloc'}</span>
          {isRunning && (
            <span className="inline-flex items-center gap-2 text-cyan-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Transfert en cours...
            </span>
          )}
        </div>
      </div>

      {/* Bouton de contrôle */}
      <div className="mt-5 flex justify-end">
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-500/20"
        >
          {isRunning ? 'Simulation en cours...' : 'Lancer la simulation de génération'}
        </button>
      </div>
    </div>
  );
};

