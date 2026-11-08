'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface LogEntry {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error' | 'table';
  timestamp: string;
  source: string;
  content: string | number | boolean | Record<string, unknown> | Array<Record<string, unknown>>;
  stackTrace?: string[];
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'log-1',
    type: 'info',
    timestamp: '14:20:01.104',
    source: 'app.js:12',
    content: '[Init] Serveur Express démarré sur le port 3000 (PID: 14820)',
  },
  {
    id: 'log-2',
    type: 'log',
    timestamp: '14:20:04.220',
    source: 'cartService.js:45',
    content: 'Calcul de la commande #88392 pour client "DevExpert"',
  },
  {
    id: 'log-3',
    type: 'table',
    timestamp: '14:20:04.225',
    source: 'cartService.js:48',
    content: [
      { id: 'SKU-01', nom: 'Clavier Mécanique', prix: 120, remise: '10%' },
      { id: 'SKU-02', nom: 'Écran 4K 144Hz', prix: 450, remise: '0%' },
      { id: 'SKU-03', nom: 'Câble USB-C TB4', prix: 29, remise: '15%' },
    ],
  },
  {
    id: 'log-4',
    type: 'warn',
    timestamp: '14:20:05.890',
    source: 'authMiddleware.js:28',
    content: '[Auth] Token JWT proche de l\'expiration (reste 120s) - renouvellement recommandé',
  },
  {
    id: 'log-5',
    type: 'error',
    timestamp: '14:20:07.412',
    source: 'paymentProcessor.js:103',
    content: 'TypeError: Cannot read properties of undefined (reading \'stripeCustomerId\')',
    stackTrace: [
      'at processPayment (paymentProcessor.js:103:24)',
      'at handleCheckout (checkoutController.js:67:12)',
      'at Layer.handle [as handle_request] (express/router/layer.js:95:5)',
      'at next (express/router/route.js:144:13)',
    ],
  },
];

export const DebuggingConsoleSimulator: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<'all' | 'log' | 'warn' | 'error' | 'table'>('all');
  const [commandInput, setCommandInput] = useState<string>('');

  const now = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;
  };

  const handleRunCommand = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    if (cmd === 'clear' || cmd === 'console.clear()') {
      setLogs([]);
      setCommandInput('');
      return;
    }

    if (cmd === 'help') {
      const helpLog: LogEntry = {
        id: `log-${Date.now()}`,
        type: 'info',
        timestamp: now(),
        source: 'REPL:1',
        content: 'Commandes disponibles : console.log(...), console.table(items), console.error(...), console.warn(...), clear, demo:table, demo:error, demo:perf',
      };
      setLogs((prev) => [...prev, helpLog]);
      setCommandInput('');
      return;
    }

    if (cmd === 'demo:table' || cmd.includes('console.table')) {
      const tableLog: LogEntry = {
        id: `log-${Date.now()}`,
        type: 'table',
        timestamp: now(),
        source: 'REPL:1',
        content: [
          { status: '200 OK', endpoint: '/api/v1/users', tempsMs: 42, cache: 'HIT' },
          { status: '201 Created', endpoint: '/api/v1/orders', tempsMs: 128, cache: 'MISS' },
          { status: '500 Error', endpoint: '/api/v1/pay', tempsMs: 512, cache: 'BYPASS' },
        ],
      };
      setLogs((prev) => [...prev, tableLog]);
      setCommandInput('');
      return;
    }

    if (cmd === 'demo:error' || cmd.includes('throw') || cmd.includes('console.error')) {
      const errorLog: LogEntry = {
        id: `log-${Date.now()}`,
        type: 'error',
        timestamp: now(),
        source: 'orderService.js:84',
        content: 'ReferenceError: orderSummary is not defined',
        stackTrace: [
          'at calculateInvoice (orderService.js:84:18)',
          'at generateReceipt (pdfGenerator.js:32:9)',
          'at processTicksAndRejections (node:internal/process/task_queues:95:5)',
        ],
      };
      setLogs((prev) => [...prev, errorLog]);
      setCommandInput('');
      return;
    }

    if (cmd === 'demo:perf') {
      const perfLog: LogEntry = {
        id: `log-${Date.now()}`,
        type: 'info',
        timestamp: now(),
        source: 'profiler.js:15',
        content: '⏱️ [Timer: Requête SQL Produits] 342.18ms - Index manquant détecté sur category_id',
      };
      setLogs((prev) => [...prev, perfLog]);
      setCommandInput('');
      return;
    }

    // Default simulated evaluation
    const userLog: LogEntry = {
      id: `log-${Date.now()}`,
      type: cmd.includes('warn') ? 'warn' : cmd.includes('error') ? 'error' : 'log',
      timestamp: now(),
      source: 'REPL:1',
      content: cmd.startsWith('console.log') ? cmd.replace(/^console\.log\((.*)\)$/, '$1') : `> ${cmd}`,
    };
    setLogs((prev) => [...prev, userLog]);
    setCommandInput('');
  };

  const handleInjectQuick = (cmd: string) => {
    setCommandInput(cmd);
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === 'all') return true;
    return log.type === filter;
  });

  const countByType = (type: LogEntry['type']) => logs.filter((l) => l.type === type).length;

  return (
    <div className="rounded-3xl border-2 border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden font-sans my-8">
      {/* DevTools Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 ml-2">
            Simulateur DevTools Console (Chrome / Node.js)
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLogs([])}
            title="Effacer la console"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1 font-mono"
          >
            <Icon name="x" className="w-3.5 h-3.5" />
            <span>Effacer</span>
          </button>
          <button
            onClick={() => setLogs(INITIAL_LOGS)}
            title="Réinitialiser les logs"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1 font-mono"
          >
            <Icon name="clock" className="w-3.5 h-3.5" />
            <span>Exemples</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Quick Injections */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
              filter === 'all'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tous ({logs.length})
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`px-2.5 py-1 rounded-md font-bold transition-colors flex items-center gap-1 ${
              filter === 'error'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'text-rose-400/70 hover:text-rose-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Erreurs ({countByType('error')})
          </button>
          <button
            onClick={() => setFilter('warn')}
            className={`px-2.5 py-1 rounded-md font-bold transition-colors flex items-center gap-1 ${
              filter === 'warn'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-amber-400/70 hover:text-amber-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Avertissements ({countByType('warn')})
          </button>
          <button
            onClick={() => setFilter('table')}
            className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
              filter === 'table'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'text-cyan-400/70 hover:text-cyan-300'
            }`}
          >
            Tableaux ({countByType('table')})
          </button>
        </div>

        {/* Quick injection buttons */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-500 uppercase font-mono hidden sm:inline">Tester :</span>
          <button
            onClick={() => handleInjectQuick('demo:table')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition-colors"
          >
            console.table()
          </button>
          <button
            onClick={() => handleInjectQuick('demo:error')}
            className="px-2 py-0.5 rounded bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-[11px] font-mono border border-rose-800/40 transition-colors"
          >
            Stack Trace
          </button>
          <button
            onClick={() => handleInjectQuick('demo:perf')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition-colors"
          >
            Timer
          </button>
        </div>
      </div>

      {/* Terminal View */}
      <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-2 max-h-[380px] overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-10 text-slate-500 italic">
            Console vide. Tapez une commande ci-dessous ou cliquez sur un exemple ci-dessus.
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isError = log.type === 'error';
            const isWarn = log.type === 'warn';
            const isTable = log.type === 'table';

            return (
              <div
                key={log.id}
                className={`rounded-lg p-2.5 transition-colors border ${
                  isError
                    ? 'bg-rose-950/30 border-rose-900/50 text-rose-200'
                    : isWarn
                    ? 'bg-amber-950/20 border-amber-900/40 text-amber-200'
                    : isTable
                    ? 'bg-slate-900/80 border-cyan-900/40 text-slate-200'
                    : 'bg-slate-900/40 border-slate-800/60 text-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1 overflow-x-auto">
                    {/* Status icon */}
                    <span className="font-bold select-none pt-0.5">
                      {isError && <span className="text-rose-400">⛔</span>}
                      {isWarn && <span className="text-amber-400">⚠️</span>}
                      {log.type === 'info' && <span className="text-blue-400">ℹ️</span>}
                      {log.type === 'log' && <span className="text-emerald-400">›</span>}
                      {isTable && <span className="text-cyan-400">▦</span>}
                    </span>

                    {/* Content Display */}
                    <div className="flex-1 space-y-1">
                      {isTable && Array.isArray(log.content) ? (
                        <div className="overflow-x-auto my-1.5">
                          <table className="w-full text-left text-xs border border-slate-700 rounded overflow-hidden">
                            <thead className="bg-slate-800 text-slate-300 font-bold uppercase text-[10px]">
                              <tr>
                                <th className="p-1.5 border-b border-r border-slate-700">(index)</th>
                                {Object.keys(log.content[0] || {}).map((key) => (
                                  <th key={key} className="p-1.5 border-b border-r border-slate-700">
                                    {key}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {log.content.map((row, index) => (
                                <tr key={index} className="hover:bg-slate-800/50 border-b border-slate-800">
                                  <td className="p-1.5 text-slate-400 border-r border-slate-700 font-semibold">
                                    {index}
                                  </td>
                                  {Object.values(row).map((val, cellIdx) => (
                                    <td key={cellIdx} className="p-1.5 border-r border-slate-700 text-emerald-300">
                                      {String(val)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="font-mono text-xs sm:text-sm whitespace-pre-wrap">
                          {typeof log.content === 'object' ? JSON.stringify(log.content, null, 2) : String(log.content)}
                        </div>
                      )}

                      {/* Stack Trace Collapsible */}
                      {log.stackTrace && log.stackTrace.length > 0 && (
                        <div className="mt-2 pl-4 border-l-2 border-rose-500/50 space-y-0.5 text-[11px] text-rose-300/80 font-mono">
                          {log.stackTrace.map((frame, fIdx) => (
                            <div key={fIdx} className="hover:text-rose-100 hover:underline cursor-pointer">
                              {frame}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metadata: source & timestamp */}
                  <div className="text-right text-[10px] text-slate-500 font-mono whitespace-nowrap select-none">
                    <span className="text-emerald-400/80 hover:underline cursor-pointer">{log.source}</span>
                    <span className="ml-2 hidden sm:inline">{log.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Interactive Command Prompt (REPL) */}
      <form onSubmit={handleRunCommand} className="bg-slate-900 border-t border-slate-800 p-2.5 flex items-center gap-2">
        <span className="text-emerald-400 font-mono font-black pl-2 select-none">❯</span>
        <input
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          placeholder="Tapez une commande (ex: help, console.table(), demo:error, clear)..."
          className="flex-1 bg-transparent border-0 outline-none font-mono text-xs sm:text-sm text-slate-100 placeholder-slate-500"
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1"
        >
          <span>Exécuter</span>
          <Icon name="arrow-right" className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
