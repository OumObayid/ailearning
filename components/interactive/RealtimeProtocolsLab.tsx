'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/common/Icon';

export const RealtimeProtocolsLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'polling' | 'websocket' | 'sse'>('sse');

  // TAB 1: Polling simulation
  const [taskStatus, setTaskStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [pollingRequests, setPollingRequests] = useState<Array<{ id: number; time: string; status: string; code: number }>>([]);
  const [taskProgress, setTaskProgress] = useState<number>(0);
  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // TAB 2: WebSocket simulation
  const [wsConnected, setWsConnected] = useState<boolean>(false);
  const [wsInput, setWsInput] = useState<string>('');
  const [wsMessages, setWsMessages] = useState<Array<{ sender: 'client' | 'server' | 'system'; text: string; time: string }>>([]);

  // TAB 3: SSE & Streaming simulation
  const [streamPrompt, setStreamPrompt] = useState<string>('Explique-moi le fonctionnement des streams Node.js');
  const [streamText, setStreamText] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamStats, setStreamStats] = useState<{ tokens: number; chars: number; durationMs: number }>({ tokens: 0, chars: 0, durationMs: 0 });
  const streamAbortRef = useRef<boolean>(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
    };
  }, []);

  // --- Handlers Tab 1: Polling ---
  const startPollingSimulation = (mode: 'short' | 'long') => {
    setTaskStatus('running');
    setTaskProgress(0);
    setPollingRequests([]);

    let currentProgress = 0;
    let reqId = 1;

    const makeRequest = () => {
      currentProgress += mode === 'short' ? 25 : 50;
      setTaskProgress(Math.min(currentProgress, 100));

      const now = new Date().toLocaleTimeString();
      const isDone = currentProgress >= 100;

      setPollingRequests((prev) => [
        ...prev,
        {
          id: reqId++,
          time: now,
          status: isDone ? 'completed (200 OK)' : 'processing (202 Accepted)',
          code: isDone ? 200 : 202,
        },
      ]);

      if (isDone) {
        setTaskStatus('completed');
        if (pollingTimerRef.current) clearTimeout(pollingTimerRef.current);
      } else {
        pollingTimerRef.current = setTimeout(makeRequest, mode === 'short' ? 1200 : 2400);
      }
    };

    makeRequest();
  };

  const resetPolling = () => {
    if (pollingTimerRef.current) clearTimeout(pollingTimerRef.current);
    setTaskStatus('idle');
    setTaskProgress(0);
    setPollingRequests([]);
  };

  // --- Handlers Tab 2: WebSocket ---
  const toggleWsConnection = () => {
    if (wsConnected) {
      setWsConnected(false);
      setWsMessages((prev) => [
        ...prev,
        { sender: 'system', text: 'Connexion fermée (WebSocket.CLOSED)', time: new Date().toLocaleTimeString() },
      ]);
    } else {
      // Simulate Handshake
      setWsMessages((prev) => [
        ...prev,
        { sender: 'system', text: 'Handshake HTTP : GET /chat Upgrade: websocket', time: new Date().toLocaleTimeString() },
        { sender: 'system', text: 'Réponse Serveur : HTTP/1.1 101 Switching Protocols', time: new Date().toLocaleTimeString() },
      ]);
      setTimeout(() => {
        setWsConnected(true);
        setWsMessages((prev) => [
          ...prev,
          { sender: 'server', text: 'Bienvenue sur le salon WebSocket ! Connexion persistante active.', time: new Date().toLocaleTimeString() },
        ]);
      }, 600);
    }
  };

  const sendWsMessage = () => {
    if (!wsInput.trim() || !wsConnected) return;
    const userMsg = wsInput;
    const now = new Date().toLocaleTimeString();

    setWsMessages((prev) => [...prev, { sender: 'client', text: userMsg, time: now }]);
    setWsInput('');

    // Simulate instant server response or broadcast
    setTimeout(() => {
      setWsMessages((prev) => [
        ...prev,
        {
          sender: 'server',
          text: `[Echo Serveur Node.js] Reçu : "${userMsg}" (diffusé sans nouvelle poignée de main HTTP)`,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 400);
  };

  // --- Handlers Tab 3: SSE Streaming ---
  const startSseStream = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamText('');
    streamAbortRef.current = false;

    const sampleTokens = [
      'Dans ', 'Node.js, ', 'les ', 'streams ', 'permettent ', 'de ', 'traiter ', 'des ', 'flux ',
      'de ', 'données ', 'morceau ', 'par ', 'morceau ', '(chunks) ', 'sans ', 'charger ',
      'l\'intégralité ', 'du ', 'fichier ', 'en ', 'mémoire ', 'RAM.\n\n',
      'Avec ', 'l\'API ', 'Gemini, ', 'le ', 'mode ', 'stream: ', 'true ', 'génère ', 'les ',
      'tokens ', 'en ', 'temps ', 'réel. ', 'Express ', 'retransmet ', 'chaque ', 'fragment ',
      'au ', 'client ', 'React ', 'via ', 'le ', 'protocole ', 'SSE ', '(Server-Sent ', 'Events) ',
      'grâce ', 'à ', 'l\'en-tête ', 'Content-Type: ', 'text/event-stream.'
    ];

    let index = 0;
    let accumulated = '';
    const startTime = performance.now();

    const interval = setInterval(() => {
      if (streamAbortRef.current || index >= sampleTokens.length) {
        clearInterval(interval);
        setIsStreaming(false);
        return;
      }

      accumulated += sampleTokens[index];
      setStreamText(accumulated);
      index++;

      const dur = performance.now() - startTime;
      setStreamStats({
        tokens: index,
        chars: accumulated.length,
        durationMs: Math.round(dur),
      });
    }, 90);
  };

  const abortSseStream = () => {
    streamAbortRef.current = true;
    setIsStreaming(false);
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div>
          <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-indigo-900 border border-indigo-400">
            Laboratoire Interactif · Module 3
          </span>
          <h3 className="mt-1 text-2xl font-black text-slate-950">
            Simulateur des Protocoles de Communication Temps Réel
          </h3>
          <p className="text-sm font-semibold text-slate-800">
            Expérimentez la différence concrète entre Polling, WebSocket et SSE (Streaming Gemini).
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex rounded-lg border-2 border-slate-900 bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab('sse')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-black transition-all ${
              activeTab === 'sse'
                ? 'bg-slate-950 text-white shadow'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <Icon name="zap" className="h-4 w-4" />
            SSE & Streaming IA
          </button>
          <button
            onClick={() => setActiveTab('websocket')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-black transition-all ${
              activeTab === 'websocket'
                ? 'bg-slate-950 text-white shadow'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <Icon name="repeat" className="h-4 w-4" />
            WebSocket Duplex
          </button>
          <button
            onClick={() => setActiveTab('polling')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-black transition-all ${
              activeTab === 'polling'
                ? 'bg-slate-950 text-white shadow'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <Icon name="refresh-cw" className="h-4 w-4" />
            Polling HTTP
          </button>
        </div>
      </div>

      {/* TAB 1: SSE & STREAMING GEMINI */}
      {activeTab === 'sse' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-indigo-950">
              Scénario : Streaming Unidirectionnel Serveur → Client (text/event-stream)
            </h4>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Observez comment les tokens générés par Gemini sont transmis instantanément au client React sans attendre la fin du calcul global.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">Tokens reçus</span>
              <p className="text-2xl font-black text-slate-950">{streamStats.tokens}</p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-bold uppercase text-slate-600 block">Caractères décodés</span>
              <p className="text-2xl font-black text-slate-950">{streamStats.chars}</p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-center break-words [overflow-wrap:anywhere] min-w-0 sm:col-span-2">
              <span className="text-xs font-bold uppercase text-slate-600 block">Débit & Vitesse</span>
              <p className="text-2xl font-black text-emerald-800">
                {streamStats.durationMs > 0
                  ? `${Math.round((streamStats.tokens / (streamStats.durationMs / 1000)) || 0)} tok/s`
                  : '0 tok/s'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-black uppercase text-slate-800">
              Prompt envoyé à Gemini via POST /api/generate
            </label>
            <input
              type="text"
              value={streamPrompt}
              onChange={(e) => setStreamPrompt(e.target.value)}
              className="w-full rounded-lg border-2 border-slate-900 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={startSseStream}
              disabled={isStreaming}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-black transition-all ${
                isStreaming
                  ? 'cursor-not-allowed bg-slate-300 text-slate-600'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
              }`}
            >
              <Icon name="play" className="h-4 w-4" />
              {isStreaming ? 'Streaming en cours...' : 'Lancer le Streaming SSE'}
            </button>
            <button
              onClick={abortSseStream}
              disabled={!isStreaming}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-black transition-all ${
                !isStreaming
                  ? 'cursor-not-allowed bg-slate-200 text-slate-400'
                  : 'bg-rose-600 text-white hover:bg-rose-700 shadow-md'
              }`}
            >
              <Icon name="x-circle" className="h-4 w-4" />
              Annuler (AbortController)
            </button>
          </div>

          {/* Terminal / Live Text Display */}
          <div className="rounded-xl border-2 border-slate-900 bg-slate-950 p-4 font-mono text-sm shadow-inner">
            <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${isStreaming ? 'animate-pulse bg-emerald-400' : 'bg-slate-600'}`} />
                Flux SSE Reconstitué (React TextDecoder)
              </span>
              <span>event: token | data: &#123;&quot;text&quot;: &quot;...&quot;&#125;</span>
            </div>
            <div className="min-h-[140px] whitespace-pre-wrap text-emerald-400 font-medium leading-relaxed">
              {streamText || <span className="text-slate-600 italic">En attente du lancement du stream...</span>}
              {isStreaming && <span className="inline-block h-4 w-2 animate-pulse bg-emerald-400 ml-1" />}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WEBSOCKET DUPLEX */}
      {activeTab === 'websocket' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-sky-950">
              Scénario : Connexion Full-Duplex Permanente (ws:// ou wss://)
            </h4>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Une fois la négociation initiale HTTP 101 effectuée, le client et le serveur s&apos;échangent des messages bidirectionnels instantanés sans surcoût d&apos;en-têtes HTTP répétitifs.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full ${wsConnected ? 'bg-emerald-600' : 'bg-rose-500'}`} />
              <div>
                <p className="text-sm font-black text-slate-950">
                  État du Socket : {wsConnected ? 'OPEN (Prêt pour échanges)' : 'CLOSED (Déconnecté)'}
                </p>
                <p className="text-xs font-semibold text-slate-600">
                  {wsConnected ? 'ws://localhost:3000/chat' : 'Aucune connexion active'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleWsConnection}
              className={`rounded-lg px-4 py-2 text-xs font-black transition-all ${
                wsConnected
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {wsConnected ? 'Fermer la connexion (close())' : 'Établir Handshake (new WebSocket())'}
            </button>
          </div>

          {/* Messages list */}
          <div className="h-60 overflow-y-auto rounded-xl border-2 border-slate-900 bg-slate-950 p-4 font-mono text-xs text-slate-200 space-y-2">
            {wsMessages.length === 0 ? (
              <p className="text-slate-600 italic">Aucun événement réseau. Cliquez sur &quot;Établir Handshake&quot; pour démarrer.</p>
            ) : (
              wsMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border ${
                    m.sender === 'client'
                      ? 'border-indigo-600 bg-indigo-950/40 text-indigo-300 ml-8'
                      : m.sender === 'server'
                      ? 'border-emerald-600 bg-emerald-950/40 text-emerald-300 mr-8'
                      : 'border-slate-800 bg-slate-900 text-slate-400 italic'
                  }`}
                >
                  <div className="flex justify-between text-[10px] font-bold opacity-75">
                    <span>{m.sender.toUpperCase()}</span>
                    <span>{m.time}</span>
                  </div>
                  <p className="mt-1 font-semibold text-sm">{m.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Input message */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={wsConnected ? 'Écrire un message en direct...' : 'Connectez le WebSocket pour écrire...'}
              value={wsInput}
              disabled={!wsConnected}
              onChange={(e) => setWsInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendWsMessage()}
              className="flex-1 rounded-lg border-2 border-slate-900 px-4 py-2 text-sm font-semibold text-slate-950 disabled:bg-slate-100"
            />
            <button
              onClick={sendWsMessage}
              disabled={!wsConnected || !wsInput.trim()}
              className="flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-2 text-sm font-black text-white hover:bg-slate-800 disabled:bg-slate-300"
            >
              <Icon name="send" className="h-4 w-4" />
              Envoyer (socket.send())
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: POLLING */}
      {activeTab === 'polling' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-amber-950">
              Scénario : Suivi de Tâche Asynchrone (Short Polling vs Long Polling)
            </h4>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Le client envoie des requêtes HTTP GET successives pour surveiller l&apos;avancement d&apos;un traitement lourd. Observez le nombre de requêtes requises !
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Progression du traitement asynchrone côté serveur</span>
              <span>{taskProgress}%</span>
            </div>
            <div className="h-4 w-full rounded-full border border-slate-900 bg-slate-100 p-0.5">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-300"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => startPollingSimulation('short')}
              disabled={taskStatus === 'running'}
              className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-black text-white hover:bg-amber-700 disabled:bg-slate-300"
            >
              Simuler Short Polling (toutes les 1.2s)
            </button>
            <button
              onClick={() => startPollingSimulation('long')}
              disabled={taskStatus === 'running'}
              className="rounded-lg bg-orange-600 px-4 py-2 text-xs font-black text-white hover:bg-orange-700 disabled:bg-slate-300"
            >
              Simuler Long Polling (réponse différée)
            </button>
            <button
              onClick={resetPolling}
              className="rounded-lg border-2 border-slate-900 px-4 py-2 text-xs font-black text-slate-900 hover:bg-slate-100"
            >
              Réinitialiser
            </button>
          </div>

          {/* Requests table */}
          <div className="overflow-x-auto rounded-xl border border-slate-300">
            <table className="w-full text-left text-xs font-medium">
              <thead className="border-b border-slate-300 bg-slate-100 text-slate-800">
                <tr>
                  <th className="p-2.5">Req #</th>
                  <th className="p-2.5">Heure</th>
                  <th className="p-2.5">Endpoint</th>
                  <th className="p-2.5">Statut HTTP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {pollingRequests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-slate-500 italic">
                      Aucune requête enregistrée. Lancez une simulation ci-dessus.
                    </td>
                  </tr>
                ) : (
                  pollingRequests.map((r) => (
                    <tr key={r.id}>
                      <td className="p-2.5 font-bold text-slate-900">GET #{r.id}</td>
                      <td className="p-2.5 text-slate-700">{r.time}</td>
                      <td className="p-2.5 font-mono text-slate-800">/api/tasks/task-9812</td>
                      <td className="p-2.5">
                        <span
                          className={`rounded px-2 py-0.5 text-[11px] font-black ${
                            r.code === 200 ? 'bg-emerald-100 text-emerald-900 border border-emerald-400' : 'bg-amber-100 text-amber-900 border border-amber-400'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

