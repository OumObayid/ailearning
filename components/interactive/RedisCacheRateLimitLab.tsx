'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/common/Icon';

interface RedisCacheRateLimitLabProps {
  initialTab?: 'cache' | 'hashKey' | 'rateLimit';
}

export const RedisCacheRateLimitLab: React.FC<RedisCacheRateLimitLabProps> = ({
  initialTab = 'cache',
}) => {
  const [activeTab, setActiveTab] = useState<'cache' | 'hashKey' | 'rateLimit'>(initialTab);

  // TAB 1: Cache-Aside & Gemini simulation
  const [promptInput, setPromptInput] = useState('Explique-moi simplement le fonctionnement de Node.js en 5 lignes');
  const [cacheStorage, setCacheStorage] = useState<{ [key: string]: { text: string; ttl: number } }>({});
  const [cacheStatus, setCacheStatus] = useState<{ source: string; timeMs: number; status: 'hit' | 'miss' | 'idle' }>({
    source: '',
    timeMs: 0,
    status: 'idle',
  });
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [responseText, setResponseText] = useState('');

  // Countdown timer for Redis TTL simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCacheStorage((prev) => {
        const next: { [key: string]: { text: string; ttl: number } } = {};
        for (const [k, v] of Object.entries(prev)) {
          if (v.ttl > 1) {
            next[k] = { ...v, ttl: v.ttl - 1 };
          }
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendPrompt = () => {
    if (!promptInput.trim() || isCallingApi) return;
    const normalizedKey = promptInput.trim().toLowerCase();

    // Check Redis cache
    if (cacheStorage[normalizedKey]) {
      setCacheStatus({
        source: 'Redis (Cache Hit)',
        timeMs: 2.1,
        status: 'hit',
      });
      setResponseText(cacheStorage[normalizedKey].text);
      return;
    }

    // Cache Miss -> call Gemini
    setIsCallingApi(true);
    setCacheStatus({ source: 'Gemini (Inférence en cours...)', timeMs: 0, status: 'miss' });
    setResponseText('');

    const start = performance.now();
    setTimeout(() => {
      const generated = `Node.js est un environnement d'exécution JavaScript côté serveur bâti sur le moteur V8 de Google Chrome. Il utilise une boucle d'événements (Event Loop) non bloquante et mono-threadée, ce qui lui confère une efficacité remarquable pour gérer des milliers de connexions concurrentes. Idéal pour les flux temps réel et les microservices d'IA !`;
      const elapsed = Math.round(performance.now() - start);

      setCacheStorage((prev) => ({
        ...prev,
        [normalizedKey]: { text: generated, ttl: 45 },
      }));
      setCacheStatus({
        source: 'Google Gemini (Cache Miss)',
        timeMs: elapsed + 1450,
        status: 'miss',
      });
      setResponseText(generated);
      setIsCallingApi(false);
    }, 800);
  };

  const handleInvalidateCache = () => {
    setCacheStorage({});
    setCacheStatus({ source: 'Cache vidé', timeMs: 0, status: 'idle' });
  };

  // TAB 2: Hash Key Generator
  const [hashPrompt, setHashPrompt] = useState('Analyse ce document financier');
  const [hashModel, setHashModel] = useState('gemini-2.5-flash');
  const [hashTemp, setHashTemp] = useState('0.7');

  // Simple pseudo SHA-256 generator for UI demonstration
  const computeDemoHash = () => {
    const raw = `${hashPrompt}|${hashModel}|${hashTemp}|v1`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const char = raw.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `ai:response:${hex}f8a7e2b109c4d5e6`;
  };

  // TAB 3: Rate Limiting simulation
  const [quotaLimit] = useState(5);
  const [requestsUsed, setRequestsUsed] = useState(0);
  const [rateLimitTtl, setRateLimitTtl] = useState(60);
  const [rateLimitMessage, setRateLimitMessage] = useState<{ status: number; text: string } | null>(null);
  const rlTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    rlTimerRef.current = setInterval(() => {
      setRateLimitTtl((prev) => {
        if (prev <= 1) {
          setRequestsUsed(0);
          setRateLimitMessage(null);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (rlTimerRef.current) clearInterval(rlTimerRef.current);
    };
  }, []);

  const handleMakeRateLimitedRequest = () => {
    if (requestsUsed >= quotaLimit) {
      setRateLimitMessage({
        status: 429,
        text: `HTTP 429 Too Many Requests — Quota de ${quotaLimit} req/min dépassé. Réessayez dans ${rateLimitTtl}s (Retry-After).`,
      });
      return;
    }

    const nextCount = requestsUsed + 1;
    setRequestsUsed(nextCount);
    setRateLimitMessage({
      status: 200,
      text: `HTTP 200 OK — Requête acceptée (${nextCount}/${quotaLimit}). Restant : ${quotaLimit - nextCount}`,
    });
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-900 border border-emerald-400">
            Laboratoire Interactif · Module 5
          </span>
          <h3 className="mt-1 text-2xl font-black text-slate-950">
            Simulateur de Cache Redis, Hash SHA-256 &amp; Rate Limiting
          </h3>
          <p className="text-sm font-semibold text-slate-800">
            Expérimentez en direct le gain du Cache-Aside et testez la protection par limitation de fréquence.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex rounded-lg border-2 border-slate-900 bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab('cache')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-black transition-all ${
              activeTab === 'cache'
                ? 'bg-slate-950 text-white shadow'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <Icon name="zap" className="h-4 w-4" />
            Cache-Aside Gemini
          </button>
          <button
            onClick={() => setActiveTab('hashKey')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-black transition-all ${
              activeTab === 'hashKey'
                ? 'bg-slate-950 text-white shadow'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <Icon name="key" className="h-4 w-4" />
            Clé SHA-256
          </button>
          <button
            onClick={() => setActiveTab('rateLimit')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-black transition-all ${
              activeTab === 'rateLimit'
                ? 'bg-slate-950 text-white shadow'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <Icon name="shield" className="h-4 w-4" />
            Rate Limiting 429
          </button>
        </div>
      </div>

      {/* TAB 1: CACHE-ASIDE GEMINI */}
      {activeTab === 'cache' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-indigo-950">
              Scénario : Mise en cache des inférences Gemini avec TTL de 45 secondes
            </h4>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Cliquez une première fois sur &quot;Envoyer le Prompt&quot; (Cache Miss : 1 500 ms d&apos;inférence), puis recliquez immédiatement avec le même prompt (Cache Hit : 2 ms depuis Redis).
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-black uppercase text-slate-800">Prompt d&apos;inférence</label>
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-full rounded-lg border-2 border-slate-900 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSendPrompt}
              disabled={isCallingApi}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-black text-white hover:bg-indigo-700 disabled:bg-slate-300 shadow-md"
            >
              {isCallingApi ? 'Inférence en cours...' : 'Envoyer le Prompt (POST /api/generate)'}
            </button>
            <button
              onClick={handleInvalidateCache}
              className="rounded-lg border-2 border-slate-900 px-4 py-2.5 text-sm font-black text-slate-900 hover:bg-slate-100"
            >
              Vider le Cache Redis (DEL *)
            </button>
          </div>

          {/* Metrics bar - Max 2 cartes par ligne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">Source de la réponse</span>
              <p className={`text-xl font-black ${cacheStatus.status === 'hit' ? 'text-emerald-700' : 'text-amber-700'}`}>
                {cacheStatus.source || 'En attente'}
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">Temps de réponse total</span>
              <p className={`text-2xl font-black ${cacheStatus.timeMs < 10 ? 'text-emerald-700' : 'text-slate-950'}`}>
                {cacheStatus.timeMs > 0 ? `${cacheStatus.timeMs} ms` : '-'}
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0 sm:col-span-2">
              <span className="text-xs font-bold uppercase text-slate-600 block">TTL restant de la clé</span>
              <p className="text-2xl font-black text-indigo-700">
                {cacheStorage[promptInput.trim().toLowerCase()]
                  ? `${cacheStorage[promptInput.trim().toLowerCase()].ttl} s`
                  : 'Non cachée'}
              </p>
            </div>
          </div>

          {/* Response text box */}
          {responseText && (
            <div className="rounded-xl border-2 border-slate-900 bg-slate-950 p-4 font-mono text-sm text-emerald-400">
              <div className="mb-2 text-xs text-slate-400 border-b border-slate-800 pb-2">
                Payload retourné au client React :
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{responseText}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HASH KEY GENERATOR */}
      {activeTab === 'hashKey' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-sky-950">
              Scénario : Construction d&apos;une clé de cache déterministe avec SHA-256
            </h4>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Modifiez le texte du prompt, le modèle ou la température. Observez comment l&apos;empreinte cryptographique change intégralement pour empêcher les collisions de contexte.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="space-y-2 min-w-0">
              <label className="text-xs font-black uppercase text-slate-800 block">Prompt</label>
              <input
                type="text"
                value={hashPrompt}
                onChange={(e) => setHashPrompt(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-900 px-3 py-2 text-sm font-semibold text-slate-950"
              />
            </div>
            <div className="space-y-2 min-w-0">
              <label className="text-xs font-black uppercase text-slate-800 block">Modèle LLM</label>
              <select
                value={hashModel}
                onChange={(e) => setHashModel(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-900 px-3 py-2 text-sm font-bold text-slate-950"
              >
                <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                <option value="gemini-3.8-flash">gemini-3.8-flash</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro</option>
              </select>
            </div>
            <div className="space-y-2 min-w-0 sm:col-span-2">
              <label className="text-xs font-black uppercase text-slate-800 block">Température : {hashTemp}</label>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={hashTemp}
                onChange={(e) => setHashTemp(e.target.value)}
                className="w-full cursor-pointer"
              />
            </div>
          </div>

          <div className="rounded-xl border-2 border-slate-900 bg-slate-950 p-5 font-mono text-sm shadow-inner space-y-3">
            <span className="text-xs uppercase text-slate-400 block border-b border-slate-800 pb-2">
              Clé Redis générée (crypto.createHash(&apos;sha256&apos;)) :
            </span>
            <p className="text-lg font-black text-amber-300 break-all">{computeDemoHash()}</p>
            <p className="text-xs text-slate-400 pt-2">
              Payload sérialisé : {JSON.stringify({ prompt: hashPrompt, model: hashModel, temp: hashTemp, version: 'v1' })}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: RATE LIMITING */}
      {activeTab === 'rateLimit' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-rose-950">
              Scénario : Protection d&apos;API par Rate Limiting (Fenêtre fixe de 60 secondes)
            </h4>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Quota configuré : <strong>{quotaLimit} requêtes maximum par minute</strong>. Envoyez des requêtes rapides pour déclencher le blocage HTTP 429.
            </p>
          </div>

          {/* Status bar - Max 2 cartes par ligne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">Requêtes consommées</span>
              <p className={`text-3xl font-black ${requestsUsed >= quotaLimit ? 'text-rose-600' : 'text-slate-950'}`}>
                {requestsUsed} / {quotaLimit}
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">RateLimit-Remaining</span>
              <p className="text-3xl font-black text-emerald-700">{Math.max(0, quotaLimit - requestsUsed)}</p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0 sm:col-span-2">
              <span className="text-xs font-bold uppercase text-slate-600 block">Réinitialisation (Reset TTL)</span>
              <p className="text-3xl font-black text-indigo-700">{rateLimitTtl} s</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleMakeRateLimitedRequest}
              className="rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-black text-white hover:bg-slate-800 shadow-md"
            >
              Envoyer une requête à l&apos;API
            </button>
          </div>

          {rateLimitMessage && (
            <div
              className={`rounded-xl border p-4 text-xs font-bold font-mono ${
                rateLimitMessage.status === 429
                  ? 'border-rose-300 bg-rose-50 text-rose-900'
                  : 'border-emerald-300 bg-emerald-50 text-emerald-900'
              }`}
            >
              {rateLimitMessage.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
