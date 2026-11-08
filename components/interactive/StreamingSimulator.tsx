'use client';

import React, { useState, useRef } from 'react';
import { Icon } from '@/components/common/Icon';

export const StreamingSimulator: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitted' | 'streaming' | 'ready' | 'aborted'>('idle');
  const [streamedText, setStreamedText] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('Explique en détail le fonctionnement du streaming SSE.');
  const abortRef = useRef(false);

  const sampleAnswer =
    "Le streaming avec Server-Sent Events (SSE) permet au serveur d'envoyer des fragments de texte au fur et à mesure de leur génération par Gemini. Côté frontend, le hook useChat reçoit chaque chunk sans attendre la fin du calcul, réduisant drastiquement le Time-To-First-Token (TTFT) et offrant une sensation de fluidité immédiate.";

  const startStreaming = () => {
    abortRef.current = false;
    setStreamedText('');
    setStatus('submitted');

    setTimeout(() => {
      if (abortRef.current) return;
      setStatus('streaming');
      const words = sampleAnswer.split(' ');
      let currentIdx = 0;

      const interval = setInterval(() => {
        if (abortRef.current) {
          clearInterval(interval);
          setStatus('aborted');
          return;
        }

        if (currentIdx < words.length) {
          setStreamedText((prev) => (prev ? prev + ' ' + words[currentIdx] : words[currentIdx]));
          currentIdx++;
        } else {
          clearInterval(interval);
          setStatus('ready');
        }
      }, 70);
    }, 400);
  };

  const handleStop = () => {
    abortRef.current = true;
    setStatus('aborted');
  };

  const handleReset = () => {
    abortRef.current = true;
    setStatus('idle');
    setStreamedText('');
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm">
            <Icon name="sparkles" className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Laboratoire Interactif : Simulation de Streaming & AbortController
            </h4>
            <p className="text-sm text-slate-500">
              Visualisez la réception progressive de tokens et l&apos;interruption immédiate via stop()
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-200">
          Vercel AI SDK • useChat
        </span>
      </div>

      {/* Prompt Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700">Demande utilisateur (Prompt) :</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={selectedPrompt}
            onChange={(e) => setSelectedPrompt(e.target.value)}
            disabled={status === 'streaming'}
            className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {status !== 'streaming' ? (
            <button
              type="button"
              onClick={startStreaming}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              <Icon name="arrow-right" className="w-4 h-4" />
              <span>Générer</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 transition"
            >
              <span>Arrêter (stop)</span>
            </button>
          )}
        </div>
      </div>

      {/* Stream Response Box */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700">Réponse de l&apos;assistant :</span>
            {status === 'streaming' && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                Streaming actif...
              </span>
            )}
            {status === 'aborted' && (
              <span className="text-sm font-bold text-rose-600">
                [Interrompu par AbortController]
              </span>
            )}
            {status === 'ready' && (
              <span className="text-sm font-bold text-emerald-600">
                ✓ Génération terminée
              </span>
            )}
          </div>
          <span className="text-sm font-mono text-slate-500">status: &quot;{status}&quot;</span>
        </div>

        <div className="min-h-24 rounded-lg bg-white p-4 border border-slate-200 text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
          {streamedText ? (
            <p>
              {streamedText}
              {status === 'streaming' && <span className="inline-block w-2 h-4 bg-indigo-600 ml-1 animate-pulse" />}
            </p>
          ) : (
            <p className="text-slate-400 italic">
              Cliquez sur « Générer » pour démarrer la réception du flux en temps réel...
            </p>
          )}
        </div>
      </div>

      {/* Action footer */}
      {status !== 'idle' && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            Réinitialiser la simulation
          </button>
        </div>
      )}
    </div>
  );
};
