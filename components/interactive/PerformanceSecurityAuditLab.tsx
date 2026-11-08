'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

export const PerformanceSecurityAuditLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'memory' | 'concurrency' | 'security'>('memory');

  // Tab 1: Memory Leak Simulator
  const [heapMb, setHeapMb] = useState<number>(35);
  const [cacheCount, setCacheCount] = useState<number>(0);
  const [memoryMode, setMemoryMode] = useState<'leaky' | 'bounded'>('leaky');
  const [memoryLogs, setMemoryLogs] = useState<string[]>([
    'System: Processus Node.js démarré — Heap initial: 35.00 Mo',
  ]);

  // Tab 2: Concurrency Simulator
  const [stock, setStock] = useState<number>(1);
  const [concurrencyMode, setConcurrencyMode] = useState<'unsafe' | 'safe'>('unsafe');
  const [clientAResult, setClientAResult] = useState<string | null>(null);
  const [clientBResult, setClientBResult] = useState<string | null>(null);
  const [isSimulatingConcurrency, setIsSimulatingConcurrency] = useState(false);

  // Tab 3: Security Payload Inspector
  const [testPayload, setTestPayload] = useState<string>("' OR '1'='1' --");
  const [payloadType, setPayloadType] = useState<'sql' | 'traversal'>('sql');

  // Handlers for Memory
  const handleAllocateMemory = () => {
    if (memoryMode === 'leaky') {
      const addedMb = 25;
      const newHeap = Math.min(250, heapMb + addedMb);
      const newCount = cacheCount + 10000;
      setHeapMb(newHeap);
      setCacheCount(newCount);
      setMemoryLogs((prev) => [
        `[LEAK] +10 000 objets conservés dans cache global. Heap: ${newHeap.toFixed(1)} Mo (${newCount} entrées)`,
        ...prev.slice(0, 4),
      ]);
    } else {
      const newHeap = Math.min(65, 38 + Math.random() * 5);
      setHeapMb(newHeap);
      setCacheCount(100);
      setMemoryLogs((prev) => [
        `[SAFE] Traitement par lot exécuté. Cache borné (100 max). Heap: ${newHeap.toFixed(1)} Mo (GC stable)`,
        ...prev.slice(0, 4),
      ]);
    }
  };

  const handleGarbageCollect = () => {
    if (memoryMode === 'leaky') {
      // In leaky mode, objects are retained by global variable, so GC cannot free them!
      setMemoryLogs((prev) => [
        `[GC] Garbage Collection exécutée : ÉCHEC. ${cacheCount} objets toujours retenus par 'global.cache'`,
        ...prev.slice(0, 4),
      ]);
    } else {
      setHeapMb(35);
      setCacheCount(0);
      setMemoryLogs((prev) => [
        '[GC] Garbage Collection réussie : mémoire libérée. Heap revenu à 35.00 Mo',
        ...prev.slice(0, 4),
      ]);
    }
  };

  // Handlers for Concurrency
  const handleSimulateConcurrency = async () => {
    setIsSimulatingConcurrency(true);
    setClientAResult('Requête Client A émise...');
    setClientBResult('Requête Client B émise...');

    await new Promise((r) => setTimeout(r, 600));

    if (concurrencyMode === 'unsafe') {
      // Both read stock = 1 before update
      setStock(-1);
      setClientAResult('200 OK — Achat accepté (Client A a validé son panier)');
      setClientBResult('200 OK — Achat accepté (Client B a aussi validé son panier !)');
    } else {
      // Atomic UPDATE WHERE stock > 0
      setStock(0);
      setClientAResult('200 OK — Achat accepté (1 produit décrété avec succès)');
      setClientBResult('409 Conflict — Stock insuffisant (décrémentation refusée)');
    }
    setIsSimulatingConcurrency(false);
  };

  const handleResetStock = () => {
    setStock(1);
    setClientAResult(null);
    setClientBResult(null);
  };

  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-black">
            <Icon name="sparkles" className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-950">
              Lab Interactif — Diagnostic &amp; Audit de Performances &amp; Sécurité
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Simulez en direct les fuites mémoire, conditions de concurrence et injections.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('memory')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              activeTab === 'memory'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
            )}
          >
            1. Fuite Mémoire
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('concurrency')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              activeTab === 'concurrency'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
            )}
          >
            2. Concurrence (Race Condition)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              activeTab === 'security'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
            )}
          >
            3. Audit Sécurité
          </button>
        </div>
      </div>

      {/* TAB 1: MEMORY LEAK SIMULATOR */}
      {activeTab === 'memory' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mode selection */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                Mode de gestion mémoire
              </span>
              <div className="space-y-2 text-xs font-bold">
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-slate-300">
                  <input
                    type="radio"
                    name="memoryMode"
                    checked={memoryMode === 'leaky'}
                    onChange={() => setMemoryMode('leaky')}
                    className="accent-rose-600"
                  />
                  <span>Cache Global non borné (Fuite)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-slate-300">
                  <input
                    type="radio"
                    name="memoryMode"
                    checked={memoryMode === 'bounded'}
                    onChange={() => setMemoryMode('bounded')}
                    className="accent-emerald-600"
                  />
                  <span>Cache local borné (Sécurisé)</span>
                </label>
              </div>
            </div>

            {/* Heap gauge */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 md:col-span-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">Consommation Heap V8 (RAM utilisée)</span>
                <span
                  className={cn(
                    'font-mono font-black text-sm',
                    heapMb > 150 ? 'text-rose-600' : heapMb > 80 ? 'text-amber-600' : 'text-emerald-700'
                  )}
                >
                  {heapMb.toFixed(1)} Mo / 250 Mo max
                </span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    heapMb > 150 ? 'bg-rose-500' : heapMb > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                  )}
                  style={{ width: `${(heapMb / 250) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold pt-1">
                <span>Objets retenus : {cacheCount.toLocaleString()}</span>
                <span>
                  {heapMb > 200 ? ' ALERTE OOM (Out Of Memory imminente)' : heapMb > 80 ? ' Consommation anormale' : ' Heap nominal'}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleAllocateMemory}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white font-bold text-xs px-4 py-2 hover:bg-slate-800 active:scale-95 transition shadow-sm"
            >
              <Icon name="server" className="w-4 h-4 text-emerald-400" />
              <span>Simuler +10 000 requêtes entrantes</span>
            </button>

            <button
              type="button"
              onClick={handleGarbageCollect}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white text-slate-800 font-bold text-xs px-4 py-2 hover:bg-slate-100 active:scale-95 transition shadow-sm"
            >
              <Icon name="sparkles" className="w-4 h-4 text-indigo-600" />
              <span>Déclencher Garbage Collector (GC)</span>
            </button>
          </div>

          {/* Console logs */}
          <div className="rounded-xl bg-slate-950 p-3.5 text-xs font-mono text-slate-300 space-y-1">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
              Console de télémétrie mémoire :
            </div>
            {memoryLogs.map((log, i) => (
              <div
                key={i}
                className={cn(
                  log.includes('[LEAK]')
                    ? 'text-rose-400'
                    : log.includes('[SAFE]')
                    ? 'text-emerald-400'
                    : 'text-indigo-300'
                )}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CONCURRENCY & RACE CONDITIONS */}
      {activeTab === 'concurrency' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mode selection */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                Stratégie de modification du stock
              </span>
              <div className="space-y-2 text-xs font-bold">
                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-slate-300">
                  <input
                    type="radio"
                    name="concurrencyMode"
                    checked={concurrencyMode === 'unsafe'}
                    onChange={() => setConcurrencyMode('unsafe')}
                    className="accent-rose-600"
                  />
                  <div>
                    <div className="text-slate-900 font-extrabold">Lecture puis UPDATE séparé (Vulnérable)</div>
                    <div className="text-slate-500 text-[11px] font-normal">
                      SELECT stock ... if (stock &gt; 0) UPDATE stock = stock - 1
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-slate-300">
                  <input
                    type="radio"
                    name="concurrencyMode"
                    checked={concurrencyMode === 'safe'}
                    onChange={() => setConcurrencyMode('safe')}
                    className="accent-emerald-600"
                  />
                  <div>
                    <div className="text-slate-900 font-extrabold">UPDATE atomique conditionnel (Sécurisé)</div>
                    <div className="text-slate-500 text-[11px] font-normal">
                      UPDATE products SET stock = stock - 1 WHERE stock &gt; 0
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Current stock status */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                  État du stock en base de données
                </span>
                <div className="mt-2 flex items-baseline gap-3">
                  <span
                    className={cn(
                      'text-3xl font-black font-mono',
                      stock < 0 ? 'text-rose-600' : stock === 0 ? 'text-amber-600' : 'text-emerald-700'
                    )}
                  >
                    {stock} unité{stock !== 1 ? 's' : ''}
                  </span>
                  {stock < 0 && (
                    <span className="text-xs font-black text-rose-600 uppercase bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Survente critique (Oversell) !
                    </span>
                  )}
                  {stock === 0 && (
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Rupture de stock
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={isSimulatingConcurrency}
                  onClick={handleSimulateConcurrency}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 active:scale-95 transition shadow-sm disabled:opacity-50"
                >
                  <Icon name="rocket" className="w-4 h-4" />
                  <span>Lancer 2 achats simultanés</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetStock}
                  className="rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2 transition"
                >
                  Réinitialiser (Stock = 1)
                </button>
              </div>
            </div>
          </div>

          {/* Results display */}
          {(clientAResult || clientBResult) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="font-bold text-slate-700 font-sans">Client A (Requête 1) :</span>
                <div
                  className={cn(
                    'font-bold',
                    clientAResult?.includes('200') ? 'text-emerald-700' : 'text-rose-600'
                  )}
                >
                  {clientAResult}
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="font-bold text-slate-700 font-sans">Client B (Requête 2, t+2ms) :</span>
                <div
                  className={cn(
                    'font-bold',
                    clientBResult?.includes('409')
                      ? 'text-amber-700'
                      : clientBResult?.includes('200') && stock < 0
                      ? 'text-rose-600 font-black'
                      : 'text-emerald-700'
                  )}
                >
                  {clientBResult}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SECURITY PAYLOAD INSPECTOR */}
      {activeTab === 'security' && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setPayloadType('sql');
                setTestPayload("' OR '1'='1' --");
              }}
              className={cn(
                'px-3 py-1.5 rounded-lg border transition',
                payloadType === 'sql'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-black'
                  : 'border-slate-200 bg-white text-slate-700'
              )}
            >
              Test Injection SQL
            </button>
            <button
              type="button"
              onClick={() => {
                setPayloadType('traversal');
                setTestPayload('../../private/secret.txt');
              }}
              className={cn(
                'px-3 py-1.5 rounded-lg border transition',
                payloadType === 'traversal'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-black'
                  : 'border-slate-200 bg-white text-slate-700'
              )}
            >
              Test Path Traversal
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Entrée utilisateur simulée :
            </label>
            <input
              type="text"
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Vulnerable handling */}
            <div className="p-4 rounded-xl border border-rose-300 bg-rose-50/50 space-y-2">
              <span className="font-bold text-rose-800 font-sans uppercase text-[11px]">
                ✕ Traitement vulnérable (Concaténation) :
              </span>
              <pre className="text-rose-950 whitespace-pre-wrap break-all text-[11px] bg-white p-2.5 rounded-lg border border-rose-200">
                {payloadType === 'sql'
                  ? `SELECT * FROM users WHERE email = '${testPayload}';\n--> FAIL: Condition SQL modifiée par l'entrée utilisateur !`
                  : `path.join('/app/uploads', '${testPayload}')\n--> FAIL: Résout vers /app/private/secret.txt (Fuite fichier)`}
              </pre>
            </div>

            {/* Secure handling */}
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-2">
              <span className="font-bold text-emerald-800 font-sans uppercase text-[11px]">
                ✓ Traitement sécurisé (Requête préparée / Whitelist) :
              </span>
              <pre className="text-emerald-950 whitespace-pre-wrap break-all text-[11px] bg-white p-2.5 rounded-lg border border-emerald-200">
                {payloadType === 'sql'
                  ? `db.execute('SELECT * FROM users WHERE email = ?', ['${testPayload}'])\n--> SECURE: Traité strictement comme chaîne littérale.`
                  : `path.resolve(uploadDir, file).startsWith(uploadDir + path.sep)\n--> SECURE: 403 Forbidden car chemin en dehors de uploads/`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

