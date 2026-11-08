'use client';

import React, { useState } from 'react';

interface EnvConfig {
  port: string;
  geminiKey: string;
  dbHost: string;
  dbUser: string;
  dbName: string;
  dbPort: string;
}

export const EnvZodFailFastSimulator: React.FC = () => {
  const [config, setConfig] = useState<EnvConfig>({
    port: '3000',
    geminiKey: 'AIzaSyD-x984KlmQ928374z',
    dbHost: 'localhost',
    dbUser: 'root',
    dbName: 'backend_ia',
    dbPort: '3306',
  });

  const [serverState, setServerState] = useState<'stopped' | 'starting' | 'running' | 'crashed'>('stopped');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const applyPreset = (preset: 'valid' | 'missing_key' | 'bad_port' | 'missing_db') => {
    setServerState('stopped');
    setConsoleLogs([]);
    setValidationErrors([]);

    switch (preset) {
      case 'valid':
        setConfig({
          port: '3000',
          geminiKey: 'AIzaSyD-x984KlmQ928374z',
          dbHost: 'localhost',
          dbUser: 'root',
          dbName: 'backend_ia',
          dbPort: '3306',
        });
        break;
      case 'missing_key':
        setConfig({
          port: '3000',
          geminiKey: '',
          dbHost: 'localhost',
          dbUser: 'root',
          dbName: 'backend_ia',
          dbPort: '3306',
        });
        break;
      case 'bad_port':
        setConfig({
          port: 'trois-mille',
          geminiKey: 'AIzaSyD-x984KlmQ928374z',
          dbHost: 'localhost',
          dbUser: 'root',
          dbName: 'backend_ia',
          dbPort: '3306',
        });
        break;
      case 'missing_db':
        setConfig({
          port: '3000',
          geminiKey: 'AIzaSyD-x984KlmQ928374z',
          dbHost: 'localhost',
          dbUser: 'root',
          dbName: '',
          dbPort: '3306',
        });
        break;
    }
  };

  const handleStartServer = () => {
    setServerState('starting');
    setConsoleLogs(['[boot] Exécution de tsx watch src/server.ts...', '[boot] Chargement de dotenv/config...']);
    setValidationErrors([]);

    setTimeout(() => {
      const errors: string[] = [];

      // Simulation de la validation Zod
      const parsedPort = Number(config.port);
      if (!config.port || isNaN(parsedPort) || parsedPort <= 0) {
        errors.push('PORT: Doit être un entier positif (reçu: "' + config.port + '")');
      }

      if (!config.geminiKey || config.geminiKey.trim() === '') {
        errors.push('API_KEY_GEMINI: Clé d\'API Google Gemini obligatoire pour initialiser le SDK');
      }

      if (!config.dbName || config.dbName.trim() === '') {
        errors.push('DB_NAME: Nom de la base de données relationnelle requis');
      }

      const parsedDbPort = Number(config.dbPort);
      if (!config.dbPort || isNaN(parsedDbPort)) {
        errors.push('DB_PORT: Port MySQL invalide');
      }

      if (errors.length > 0) {
        setServerState('crashed');
        setValidationErrors(errors);
        setConsoleLogs((prev) => [
          ...prev,
          '[zod:error] ❌ Échec critique de validation du schéma envSchema :',
          ...errors.map((e) => '   ↳ ' + e),
          '[process] 🛑 process.exit(1) déclenché immédiatement (Fail-Fast).',
          '[process] Le serveur a refusé de démarrer avec une configuration corrompue.',
        ]);
      } else {
        setServerState('running');
        setConsoleLogs((prev) => [
          ...prev,
          '[zod:ok] ✅ Schéma envSchema validé avec succès.',
          '[db] Connexion au pool MySQL établie sur ' + config.dbHost + ':' + config.dbPort + '/' + config.dbName,
          '[gemini] SDK Google Gen AI initialisé avec succès.',
          '🚀 [Server] En écoute sur http://localhost:' + config.port + ' (Prêt pour les requêtes)',
        ]);
      }
    }, 600);
  };

  const handleStopServer = () => {
    setServerState('stopped');
    setConsoleLogs((prev) => [...prev, '[server] Arrêt propre du serveur (SIGTERM).']);
  };

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Validation Fail-Fast avec Zod (.env)
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez comment le pattern Fail-Fast bloque le démarrage du serveur Node.js dès la moindre anomalie de configuration.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset('valid')}
            className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400"
          >
            Config Valide
          </button>
          <button
            onClick={() => applyPreset('missing_key')}
            className="rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400"
          >
            Clé Gemini Absente
          </button>
          <button
            onClick={() => applyPreset('bad_port')}
            className="rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400"
          >
            Port Invalide
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Éditeur de variables .env */}
        <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              📄 Fichier local <code>.env</code>
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">Édition en direct</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                PORT (Attendu: number)
              </label>
              <input
                type="text"
                value={config.port}
                onChange={(e) => setConfig({ ...config, port: e.target.value })}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                placeholder="ex: 3000"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                API_KEY_GEMINI (Attendu: string non vide)
              </label>
              <input
                type="text"
                value={config.geminiKey}
                onChange={(e) => setConfig({ ...config, geminiKey: e.target.value })}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                placeholder="AIzaSy..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  DB_HOST
                </label>
                <input
                  type="text"
                  value={config.dbHost}
                  onChange={(e) => setConfig({ ...config, dbHost: e.target.value })}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  DB_PORT
                </label>
                <input
                  type="text"
                  value={config.dbPort}
                  onChange={(e) => setConfig({ ...config, dbPort: e.target.value })}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                DB_NAME (Nom base MySQL)
              </label>
              <input
                type="text"
                value={config.dbName}
                onChange={(e) => setConfig({ ...config, dbName: e.target.value })}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            {serverState === 'running' ? (
              <button
                onClick={handleStopServer}
                className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700"
              >
                Arrêter le serveur (SIGTERM)
              </button>
            ) : (
              <button
                onClick={handleStartServer}
                disabled={serverState === 'starting'}
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                {serverState === 'starting' ? 'Démarrage...' : '▶ Démarrer le serveur (npm run dev)'}
              </button>
            )}
          </div>
        </div>

        {/* Console Node.js & Zod */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 font-mono text-sm font-semibold text-slate-400">Terminal Node.js (stdout/stderr)</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  serverState === 'running'
                    ? 'bg-emerald-400 animate-pulse'
                    : serverState === 'crashed'
                    ? 'bg-rose-500'
                    : serverState === 'starting'
                    ? 'bg-amber-400'
                    : 'bg-slate-600'
                }`}
              />
              <span className="text-sm font-medium capitalize text-slate-400">{serverState}</span>
            </div>
          </div>

          <div className="flex-1 min-h-[220px] overflow-y-auto font-mono text-sm space-y-1.5 p-2 bg-slate-900/60 rounded">
            {consoleLogs.length === 0 ? (
              <p className="text-slate-500 italic">Serveur arrêté. Cliquez sur &quot;Démarrer le serveur&quot; pour tester la validation Zod.</p>
            ) : (
              consoleLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes('❌') || log.includes('error') || log.includes('Échec') || log.includes('process.exit')
                      ? 'text-rose-400 font-semibold'
                      : log.includes('✅') || log.includes('🚀')
                      ? 'text-emerald-400 font-semibold'
                      : log.includes('boot')
                      ? 'text-slate-400'
                      : 'text-indigo-300'
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>

          {validationErrors.length > 0 && (
            <div className="mt-3 rounded-md border border-rose-900/60 bg-rose-950/40 p-3 text-sm text-rose-300">
              <div className="font-semibold text-rose-200 mb-1">Pourquoi ce comportement est-il salutaire ?</div>
              <p>
                Sans Zod, le serveur démarrerait avec succès, mais planterait des heures plus tard en pleine requête client lors du premier appel à Gemini. Le Fail-Fast protège la stabilité applicative dès l&apos;amorçage.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

