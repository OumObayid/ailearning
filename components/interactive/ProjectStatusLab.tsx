'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface ProjectStatusLabProps {
  initialBackendState?: 'running' | 'stopped';
}

export const ProjectStatusLab: React.FC<ProjectStatusLabProps> = ({
  initialBackendState = 'running',
}) => {
  const [backendState, setBackendState] = useState<'running' | 'stopped'>(initialBackendState);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'network' | 'code'>('preview');

  // Terminal & Response simulation
  const [responseLog, setResponseLog] = useState<{
    status: number;
    body: { success: boolean; message: string; status: string; application?: string; version?: string } | null;
    error?: string;
    durationMs: number;
  }>({
    status: 200,
    body: {
      success: true,
      message: 'Backend IA opérationnel',
      status: 'running',
      application: 'Backend IA optimisé',
      version: '1.0.0',
    },
    durationMs: 4.2,
  });

  const handleTestConnection = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (backendState === 'running') {
        setResponseLog({
          status: 200,
          body: {
            success: true,
            message: 'Backend IA opérationnel',
            status: 'running',
            application: 'Backend IA optimisé',
            version: '1.0.0',
          },
          durationMs: Number((Math.random() * 3 + 2).toFixed(1)),
        });
      } else {
        setResponseLog({
          status: 0,
          body: null,
          error: 'TypeError: Failed to fetch (Serveur Express non joignable sur http://localhost:3000)',
          durationMs: 0,
        });
      }
      setIsLoading(false);
    }, 350);
  };

  const toggleBackendServer = () => {
    const nextState = backendState === 'running' ? 'stopped' : 'running';
    setBackendState(nextState);
    if (nextState === 'stopped') {
      setResponseLog({
        status: 0,
        body: null,
        error: 'TypeError: Failed to fetch (ECONNREFUSED 127.0.0.1:3000)',
        durationMs: 0,
      });
    } else {
      setResponseLog({
        status: 200,
        body: {
          success: true,
          message: 'Backend IA opérationnel',
          status: 'running',
          application: 'Backend IA optimisé',
          version: '1.0.0',
        },
        durationMs: 3.8,
      });
    }
  };

  return (
    <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header with status badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-700 tracking-wider">
            <Icon name="sparkles" className="w-4 h-4 text-indigo-600" />
            <span>Simulateur d&apos;Intégration • Étape 1</span>
          </div>
          <h3 className="text-xl font-black text-slate-950 mt-1">
            Communication Frontend React ↔ Backend Express
          </h3>
        </div>

        {/* Server Toggle Button */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700">État du serveur Node :</span>
          <button
            onClick={toggleBackendServer}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition ${
              backendState === 'running'
                ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
                : 'bg-rose-600 text-white hover:bg-rose-500 shadow-sm'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                backendState === 'running' ? 'bg-emerald-200 animate-pulse' : 'bg-rose-200'
              }`}
            />
            <span>{backendState === 'running' ? 'Serveur 3000 ACTIF' : 'Serveur 3000 ARRÊTÉ'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
            activeTab === 'preview'
              ? 'bg-indigo-700 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Icon name="layout" className="w-3.5 h-3.5" />
          <span>Aperçu Écran React (:5173)</span>
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
            activeTab === 'network'
              ? 'bg-indigo-700 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Icon name="cpu" className="w-3.5 h-3.5" />
          <span>Inspecteur Réseau HTTP (:3000)</span>
        </button>
      </div>

      {/* TAB 1: Preview React UI */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-slate-300 bg-slate-100 p-6 shadow-inner space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-amber-400 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-emerald-400 inline-block"></span>
                <span className="ml-2 font-mono">http://localhost:5173</span>
              </span>
              <span>React 18 + Vite</span>
            </div>

            {/* Simulated React App Component */}
            <main className="rounded-xl border border-slate-300 bg-white p-6 shadow-sm space-y-4">
              <h1 className="text-2xl font-black text-slate-950">
                Application d&apos;analyse intelligente
              </h1>

              {responseLog.body && (
                <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/70 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <Icon name="check" className="w-4 h-4 text-emerald-600" />
                    <span>Liaison établie avec succès</span>
                  </div>
                  <p className="text-slate-900 font-bold text-base">
                    Backend : <span className="text-emerald-800">{responseLog.body.message}</span>
                  </p>
                  <div className="flex gap-4 text-xs font-semibold text-slate-700 pt-1">
                    <span>Application : <strong>{responseLog.body.application}</strong></span>
                    <span>Version : <strong>{responseLog.body.version}</strong></span>
                    <span>Statut : <strong>{responseLog.body.status}</strong></span>
                  </div>
                </div>
              )}

              {responseLog.error && (
                <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                    <Icon name="x-mark" className="w-4 h-4 text-rose-600" />
                    <span>Échec de connexion réseau</span>
                  </div>
                  <p className="text-rose-800 font-bold text-sm">
                    Erreur : {responseLog.error}
                  </p>
                  <p className="text-xs text-rose-700">
                    Le frontend fonctionne, mais le serveur Express sur le port 3000 est injoignable ou arrêté.
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleTestConnection}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-600 transition disabled:opacity-50"
                >
                  <Icon name="arrow-right" className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Interrogation...' : 'Re-tester fetch(/api/status)'}</span>
                </button>
                <span className="text-xs font-semibold text-slate-500">
                  Temps d&apos;aller-retour : {responseLog.durationMs} ms
                </span>
              </div>
            </main>
          </div>
        </div>
      )}

      {/* TAB 2: Network Inspector */}
      {activeTab === 'network' && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-slate-300 bg-slate-950 p-5 font-mono text-xs text-slate-100 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">GET http://localhost:3000/api/status</span>
              <span className={responseLog.status === 200 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {responseLog.status === 200 ? 'HTTP 200 OK' : 'ERR_CONNECTION_REFUSED'}
              </span>
            </div>

            <div className="space-y-1 text-slate-300">
              <div className="text-slate-400">{'// En-têtes de réponse (CORS vérifié) :'}</div>
              <div>Access-Control-Allow-Origin: *</div>
              <div>Content-Type: application/json; charset=utf-8</div>
              <div>X-Powered-By: Express</div>
            </div>

            <div className="border-t border-slate-800 pt-2 space-y-1">
              <div className="text-slate-400">{'// Corps de la réponse JSON :'}</div>
              <pre className="text-emerald-300 overflow-x-auto">
                {responseLog.body ? JSON.stringify(responseLog.body, null, 2) : '// Aucune donnée reçue (serveur éteint)'}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

