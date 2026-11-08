'use client';

import React, { useState, useEffect, useRef } from 'react';

export const DebounceAbortLab: React.FC = () => {
  const [typedInput, setTypedInput] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [debounceDelay, setDebounceDelay] = useState<number>(500); // 500ms
  const [keystrokeCount, setKeystrokeCount] = useState<number>(0);
  const [requestCount, setRequestCount] = useState<number>(0);
  const [isRequestInFlight, setIsRequestInFlight] = useState<boolean>(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'in_flight' | 'completed' | 'aborted'>('idle');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Gestion du Debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypedInput(val);
    setKeystrokeCount((prev) => prev + 1);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(val);
      if (val.trim()) {
        triggerNetworkCall();
      }
    }, debounceDelay);
  };

  // Déclenchement de la requête annulable
  const triggerNetworkCall = () => {
    // Annulation de la requête précédente si elle est encore active
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setRequestCount((prev) => prev + 1);
    setIsRequestInFlight(true);
    setRequestStatus('in_flight');

    // Simulation d'une latence réseau de 1.8s
    const timer = setTimeout(() => {
      if (!controller.signal.aborted) {
        setIsRequestInFlight(false);
        setRequestStatus('completed');
      }
    }, 1800);

    controller.signal.addEventListener('abort', () => {
      clearTimeout(timer);
      setIsRequestInFlight(false);
      setRequestStatus('aborted');
    });
  };

  const handleManualAbort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const resetLab = () => {
    setTypedInput('');
    setDebouncedQuery('');
    setKeystrokeCount(0);
    setRequestCount(0);
    setIsRequestInFlight(false);
    setRequestStatus('idle');
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-0.5 text-sm font-bold text-amber-800">
              Lab Optimisation Réseau
            </span>
            <span className="inline-flex items-center rounded-md bg-cyan-50 px-2.5 py-0.5 text-sm font-bold text-cyan-800">
              Debounce & AbortController
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
            Simulateur d&apos;Économie d&apos;Appels API & Annulation Instantanée
          </h4>
        </div>

        <button
          onClick={resetLab}
          className="px-3 py-1.5 text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
        >
          🔄 Réinitialiser
        </button>
      </div>

      {/* Métriques comparatives Frappes vs Requêtes */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
          <span className="text-sm font-bold text-slate-500 block">Frappes clavier</span>
          <span className="text-2xl font-extrabold font-mono text-slate-900 mt-1 block">
            {keystrokeCount}
          </span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
          <span className="text-sm font-bold text-slate-500 block">Requêtes HTTP envoyées</span>
          <span className="text-2xl font-extrabold font-mono text-indigo-600 mt-1 block">
            {requestCount}
          </span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
          <span className="text-sm font-bold text-slate-500 block">Économie d&apos;appels</span>
          <span className="text-2xl font-extrabold font-mono text-emerald-600 mt-1 block">
            {keystrokeCount > 0 ? `${Math.round(((keystrokeCount - requestCount) / keystrokeCount) * 100)} %` : '100 %'}
          </span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
          <span className="text-sm font-bold text-slate-500 block">Délai Debounce</span>
          <span className="text-2xl font-extrabold font-mono text-purple-700 mt-1 block">
            {debounceDelay} ms
          </span>
        </div>
      </div>

      {/* Champ de frappe et contrôle du délai */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4 rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">
              Tapez rapidement un texte de recherche (ex: &quot;intelligence artificielle&quot;) :
            </label>
            <input
              type="text"
              value={typedInput}
              onChange={handleInputChange}
              placeholder="Commencez à taper pour observer le debounce..."
              className="w-full p-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-600">Réglage du délai de temporisation :</span>
              <span className="font-mono font-bold text-slate-800">{debounceDelay} ms</span>
            </div>
            <input
              type="range"
              min="200"
              max="1000"
              step="100"
              value={debounceDelay}
              onChange={(e) => setDebounceDelay(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <p className="text-sm text-slate-500">
              Une requête n&apos;est émise que lorsque l&apos;utilisateur s&apos;arrête de taper pendant {debounceDelay} ms.
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={handleManualAbort}
              disabled={!isRequestInFlight}
              className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-rose-600/20"
            >
              🛑 Couper la requête (AbortController)
            </button>
          </div>
        </div>

        {/* Console d'inspection réseau simulée */}
        <div className="rounded-2xl border border-slate-200 p-5 bg-slate-900 text-slate-100 flex flex-col justify-between shadow-inner min-h-[220px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-sm font-mono font-bold text-slate-400">Inspecteur Réseau (DevTools Network)</span>
              <span className="text-sm font-mono text-amber-400">API Gateway</span>
            </div>

            <div className="space-y-2 text-sm font-mono">
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="text-slate-400 block text-sm">Valeur stabilisée (Debounced) :</span>
                <span className="text-emerald-400 font-bold">
                  {debouncedQuery ? `"${debouncedQuery}"` : '<En attente de pause de frappe>'}
                </span>
              </div>

              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-sm">Statut de la connexion HTTP :</span>
                  <span className={`font-bold ${
                    requestStatus === 'in_flight'
                      ? 'text-amber-400 animate-pulse'
                      : requestStatus === 'completed'
                      ? 'text-emerald-400'
                      : requestStatus === 'aborted'
                      ? 'text-rose-400'
                      : 'text-slate-400'
                  }`}>
                    {requestStatus === 'in_flight' && '⚡ Requête en vol (Pending)...'}
                    {requestStatus === 'completed' && '✅ 200 OK — Réponse reçue'}
                    {requestStatus === 'aborted' && '🛑 (Canceled) — Annulée par le client'}
                    {requestStatus === 'idle' && 'IDLE — En attente'}
                  </span>
                </div>
                {isRequestInFlight && (
                  <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800 text-sm text-slate-500 flex justify-between">
            <span>Sans debounce : {keystrokeCount} requêtes</span>
            <span className="text-emerald-400 font-bold">Avec debounce : {requestCount} requête(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

