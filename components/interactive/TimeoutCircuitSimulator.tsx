'use client';

import React, { useState, useRef, useEffect } from 'react';

export const TimeoutCircuitSimulator: React.FC = () => {
  const [timeoutLimit, setTimeoutLimit] = useState<number>(4000); // 4000ms
  const [simulatedLatency, setSimulatedLatency] = useState<number>(2500); // 2500ms
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [requestResult, setRequestResult] = useState<{
    status: number;
    duration: number;
    outcome: 'success' | 'timeout';
    message: string;
    telemetryLog: Record<string, unknown>;
  } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startRace = () => {
    setIsRunning(true);
    setElapsedTime(0);
    setRequestResult(null);
    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const currentElapsed = Date.now() - startTimeRef.current;
      setElapsedTime(currentElapsed);

      // Condition de timeout
      if (currentElapsed >= timeoutLimit && timeoutLimit <= simulatedLatency) {
        clearInterval(interval);
        setIsRunning(false);
        setElapsedTime(timeoutLimit);
        setRequestResult({
          status: 504,
          duration: timeoutLimit,
          outcome: 'timeout',
          message: '504 Gateway Timeout — Requête interrompue par AbortSignal.timeout(). Le backend a libéré ses ressources.',
          telemetryLog: {
            timestamp: new Date().toISOString(),
            method: 'POST',
            endpoint: '/api/ai/generate',
            status: 504,
            durationMs: `${timeoutLimit}ms`,
            error: 'AI_PROVIDER_TIMEOUT_EXCEEDED',
            aborted: true,
          },
        });
      }
      // Condition de succès (la réponse arrive avant le timeout)
      else if (currentElapsed >= simulatedLatency && simulatedLatency < timeoutLimit) {
        clearInterval(interval);
        setIsRunning(false);
        setElapsedTime(simulatedLatency);
        setRequestResult({
          status: 200,
          duration: simulatedLatency,
          outcome: 'success',
          message: '200 OK — Réponse générée et transmise au client avec succès avant expiration du délai.',
          telemetryLog: {
            timestamp: new Date().toISOString(),
            method: 'POST',
            endpoint: '/api/ai/generate',
            status: 200,
            durationMs: `${simulatedLatency}ms`,
            model: 'gemini-2.5-flash',
            tokens: 312,
            aborted: false,
          },
        });
      }
    }, 40);

    timerRef.current = interval;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const progressPercent = Math.min(
    100,
    (elapsedTime / Math.max(timeoutLimit, simulatedLatency)) * 100
  );

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Course de Timeout &amp; Télémétrie API
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez la course critique entre le temps de réponse de l&apos;IA et le garde-fou <code>AbortSignal.timeout</code>.
          </p>
        </div>
      </div>

      {/* Paramètres de la simulation */}
      <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-slate-50 p-4 md:grid-cols-2 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              ⏱️ Timeout configuré (Backend Express) :
            </label>
            <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {timeoutLimit} ms
            </span>
          </div>
          <input
            type="range"
            min="2000"
            max="8000"
            step="500"
            value={timeoutLimit}
            disabled={isRunning}
            onChange={(e) => setTimeoutLimit(Number(e.target.value))}
            className="w-full cursor-pointer accent-indigo-600"
          />
          <div className="mt-1 flex justify-between text-sm text-slate-500">
            <span>2000 ms</span>
            <span>5000 ms</span>
            <span>8000 ms</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              ☁️ Latence réseau du fournisseur IA (Gemini) :
            </label>
            <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
              {simulatedLatency} ms
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="8000"
            step="500"
            value={simulatedLatency}
            disabled={isRunning}
            onChange={(e) => setSimulatedLatency(Number(e.target.value))}
            className="w-full cursor-pointer accent-amber-600"
          />
          <div className="mt-1 flex justify-between text-sm text-slate-500">
            <span>1000 ms (Rapide)</span>
            <span>4000 ms</span>
            <span>8000 ms (Congestion)</span>
          </div>
        </div>
      </div>

      {/* Presets rapides */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Scénarios préconfigurés :</span>
        <button
          disabled={isRunning}
          onClick={() => {
            setTimeoutLimit(5000);
            setSimulatedLatency(2000);
          }}
          className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400"
        >
          Cas Normal (2s &lt; 5s Timeout)
        </button>
        <button
          disabled={isRunning}
          onClick={() => {
            setTimeoutLimit(3000);
            setSimulatedLatency(6000);
          }}
          className="rounded-lg bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400"
        >
          Panne / Congestion Cloud (6s &gt; 3s Timeout)
        </button>
      </div>

      {/* Bouton de lancement */}
      <div className="mb-6">
        <button
          onClick={startRace}
          disabled={isRunning}
          className="w-full md:w-auto rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {isRunning ? '⏳ Course en cours...' : '🚀 Émettre la requête (POST /api/ai/generate)'}
        </button>
      </div>

      {/* Barre de progression de la course */}
      <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-2 flex justify-between items-center text-sm">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Progression temporelle : {elapsedTime} ms écoulées
          </span>
          <span className="font-mono text-sm text-slate-500">
            Timeout cible : {timeoutLimit} ms | Arrivée IA cible : {simulatedLatency} ms
          </span>
        </div>

        <div className="relative h-6 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className={`h-full transition-all duration-75 ${
              requestResult?.outcome === 'timeout'
                ? 'bg-rose-500'
                : requestResult?.outcome === 'success'
                ? 'bg-emerald-500'
                : 'bg-indigo-600'
            }`}
            style={{ width: `${isRunning ? progressPercent : requestResult ? 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Résultat et Télémétrie */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Synthèse du résultat */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <span className="text-sm font-semibold text-slate-900 dark:text-white block mb-3 border-b border-slate-200 pb-2 dark:border-slate-800">
            Bilan de la requête HTTP
          </span>

          {requestResult ? (
            <div className="space-y-3">
              <div
                className={`rounded-lg p-3 text-sm font-semibold ${
                  requestResult.outcome === 'success'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-900'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-300 dark:border-rose-900'
                }`}
              >
                {requestResult.message}
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <div><strong>Statut HTTP retourné :</strong> {requestResult.status}</div>
                <div><strong>Durée totale mesurée :</strong> {requestResult.duration} ms</div>
                <div>
                  <strong>Sécurité système :</strong>{' '}
                  {requestResult.outcome === 'timeout'
                    ? 'Le serveur a interrompu la socket réseau pour ne pas asphyxier le pool de threads.'
                    : 'Le client a reçu sa charge utile dans les limites de tolérance accordées.'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-500 italic py-6 text-center">
              Lancez une requête pour visualiser l&apos;issue de la course.
            </div>
          )}
        </div>

        {/* Console JSON de journalisation structurée */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-sm font-semibold text-slate-400">
              Journal d&apos;observabilité structuré (logger.middleware.ts)
            </span>
          </div>

          <div className="flex-1 min-h-[140px] font-mono text-sm p-3 bg-slate-900/60 rounded">
            {requestResult ? (
              <pre className="text-emerald-400 overflow-x-auto">
                {JSON.stringify(requestResult.telemetryLog, null, 2)}
              </pre>
            ) : (
              <p className="text-slate-500 italic">En attente de télémétrie...</p>
            )}
          </div>

          <div className="mt-3 rounded-md border border-slate-800 bg-slate-900/80 p-2 text-sm text-slate-300">
            <span className="font-semibold text-indigo-400">Pourquoi la télémétrie ?</span> Les logs structurés en JSON permettent aux outils d&apos;observabilité (Datadog, Grafana, CloudWatch) d&apos;alerter immédiatement si le taux d&apos;erreurs 504 dépasse 1%.
          </div>
        </div>
      </div>
    </div>
  );
};

