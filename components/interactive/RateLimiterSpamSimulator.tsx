'use client';

import React, { useState, useEffect } from 'react';

interface RequestLog {
  id: number;
  time: string;
  status: 200 | 429;
  remaining: number;
  message: string;
}

export const RateLimiterSpamSimulator: React.FC = () => {
  const maxRequests = 5;
  const windowSeconds = 60;

  const [remainingQuota, setRemainingQuota] = useState<number>(maxRequests);
  const [secondsUntilReset, setSecondsUntilReset] = useState<number>(windowSeconds);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [blockedAttempts, setBlockedAttempts] = useState<number>(0);
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const [lastResponse, setLastResponse] = useState<{
    status: number;
    headers: Record<string, string>;
    body: Record<string, unknown>;
  } | null>(null);

  // Décompte du temps de la fenêtre
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsUntilReset((prev) => {
        if (prev <= 1) {
          // Réinitialisation du quota
          setRemainingQuota(maxRequests);
          return windowSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [maxRequests, windowSeconds]);

  const sendSingleRequest = () => {
    setTotalAttempts((prev) => prev + 1);
    const now = new Date().toLocaleTimeString();

    if (remainingQuota > 0) {
      const nextRemaining = remainingQuota - 1;
      setRemainingQuota(nextRemaining);

      const resp = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'RateLimit-Limit': `${maxRequests}`,
          'RateLimit-Remaining': `${nextRemaining}`,
          'RateLimit-Reset': `${secondsUntilReset}s`,
        },
        body: {
          success: true,
          model: 'gemini-2.5-flash',
          message: 'Analyse IA générée avec succès.',
          tokensUsed: 142,
        },
      };

      setLastResponse(resp);
      setLogs((prev) => [
        {
          id: Date.now() + Math.random(),
          time: now,
          status: 200,
          remaining: nextRemaining,
          message: '200 OK — Requête traitée et facturée',
        },
        ...prev.slice(0, 8),
      ]);
    } else {
      setBlockedAttempts((prev) => prev + 1);

      const resp = {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': `${secondsUntilReset}`,
          'X-RateLimit-Limit': `${maxRequests}`,
          'X-RateLimit-Remaining': '0',
        },
        body: {
          error: 'Too Many Requests',
          message: `Trop de requêtes générées depuis cette adresse IP. Veuillez patienter ${secondsUntilReset}s.`,
          statusCode: 429,
        },
      };

      setLastResponse(resp);
      setLogs((prev) => [
        {
          id: Date.now() + Math.random(),
          time: now,
          status: 429,
          remaining: 0,
          message: `429 Too Many Requests — Bloqué par express-rate-limit (Reset dans ${secondsUntilReset}s)`,
        },
        ...prev.slice(0, 8),
      ]);
    }
  };

  const simulateSpamAttack = () => {
    // Émission de 10 requêtes instantanées
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        sendSingleRequest();
      }, i * 60);
    }
  };

  const resetSimulator = () => {
    setRemainingQuota(maxRequests);
    setSecondsUntilReset(windowSeconds);
    setTotalAttempts(0);
    setBlockedAttempts(0);
    setLogs([]);
    setLastResponse(null);
  };

  // Coût évité estimé (0.003$ par requête IA abusive bloquée)
  const savedCost = (blockedAttempts * 0.003).toFixed(3);

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Rate Limiting &amp; Protection Financière (HTTP 429)
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez la limitation de débit en action et la barrière anti-dépassement de coûts sur votre API IA.
          </p>
        </div>
        <button
          onClick={resetSimulator}
          className="self-start rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          Réinitialiser la fenêtre
        </button>
      </div>

      {/* Métriques clés */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Quota Restant</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold ${
                remainingQuota > 2
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : remainingQuota > 0
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {remainingQuota} / {maxRequests}
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Reset de Fenêtre</span>
          <div className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {secondsUntilReset}s
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Requêtes Bloquées (429)</span>
          <div className="mt-1 text-2xl font-bold text-rose-600 dark:text-rose-400">
            {blockedAttempts}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Budget GPU Préservé</span>
          <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            ${savedCost}
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={sendSingleRequest}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          ▶ Émettre 1 requête client (POST /api/ai/generate)
        </button>
        <button
          onClick={simulateSpamAttack}
          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700"
        >
          💣 Simuler attaque scriptée (10 requêtes instantanées)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* En-têtes HTTP et Réponse reçue */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              Réponse HTTP retournée au client
            </span>
            {lastResponse && (
              <span
                className={`rounded px-2 py-0.5 text-sm font-bold ${
                  lastResponse.status === 200
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400'
                }`}
              >
                HTTP {lastResponse.status}
              </span>
            )}
          </div>

          {lastResponse ? (
            <div className="space-y-3">
              <div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  En-têtes de réponse (Headers) :
                </span>
                <div className="rounded bg-slate-950 p-2 font-mono text-sm text-slate-300">
                  {Object.entries(lastResponse.headers).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-indigo-400">{key}:</span> {val}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Corps JSON (Payload) :
                </span>
                <pre className="rounded bg-slate-950 p-2 font-mono text-sm text-emerald-400 overflow-x-auto">
                  {JSON.stringify(lastResponse.body, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-500 italic py-8 text-center">
              Cliquez sur un bouton ci-dessus pour observer les en-têtes et le comportement du middleware de limitation.
            </div>
          )}
        </div>

        {/* Historique des requêtes */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-sm font-semibold text-slate-400">
              Journal d&apos;interception Express (Rate Limiter)
            </span>
            <span className="text-sm text-slate-500">{totalAttempts} requêtes émises</span>
          </div>

          <div className="flex-1 min-h-[220px] overflow-y-auto font-mono text-sm space-y-1.5 p-2 bg-slate-900/60 rounded">
            {logs.length === 0 ? (
              <p className="text-slate-500 italic">Prêt. Aucune requête reçue.</p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-center justify-between p-1.5 rounded ${
                    log.status === 200
                      ? 'bg-emerald-950/30 text-emerald-300'
                      : 'bg-rose-950/40 text-rose-300 font-semibold'
                  }`}
                >
                  <span className="text-slate-400">{log.time}</span>
                  <span className="truncate mx-2">{log.message}</span>
                  <span className="text-sm">{log.status}</span>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 rounded-md border border-slate-800 bg-slate-900/80 p-2.5 text-sm text-slate-300">
            <span className="font-semibold text-rose-400">Protection financière :</span> Les requêtes rejetées en 429 sont interceptées en mémoire en moins d&apos;une milliseconde et <strong>ne sollicitent aucunement l&apos;API Google Gemini</strong>, évitant ainsi toute consommation indue de tokens.
          </div>
        </div>
      </div>
    </div>
  );
};

