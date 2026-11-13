'use client';

import React from 'react';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans min-w-0 w-full max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words [overflow-wrap:anywhere] min-w-0">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Projet Fil Rouge d&apos;Intégration</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 6 — Traitements parallèles avec Worker Threads
        </h1>
      </div>

      {/* 1. Objectifs du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Node.js utilise principalement un thread JavaScript principal. Lorsqu&apos;un traitement CPU intensif monopolise ce thread, toutes les autres requêtes peuvent être ralenties. Nous allons utiliser les Worker Threads pour déléguer ces calculs.
        </p>
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            À la fin du chapitre, vous serez capable de :
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Comprendre le problème de saturation du thread principal.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Différencier rigoureusement opérations I/O et opérations CPU.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Créer un Worker avec le module natif node:worker_threads.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Échanger des messages avec parentPort et workerData.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Intégrer les Workers dans une route d&apos;API Express.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Mesurer l&apos;impact sur les temps de réponse et l&apos;Event Loop.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Problème du thread principal */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comprendre le problème du thread principal
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Si une boucle synchrone de calcul lourd s&apos;exécute sur le thread principal, Node.js ne peut plus dépiler la moindre requête entrante :
        </p>
        <CodeBlock
          filename="Exemple bloquant (À ne pas faire sur le main thread)"
          language="typescript"
          code={`function heavyCalculation() {
  let result = 0;
  for (let i = 0; i < 10_000_000_000; i++) {
    result += i;
  }
  return result;
}`}
        />
      </section>

      {/* 3. I/O vs CPU */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Différence entre I/O et CPU intensif
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Traitement</th>
                <th className="py-2.5 px-4">Nature</th>
                <th className="py-2.5 px-4">Solution technique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Requête SQL MySQL</td>
                <td className="py-2 px-4">I/O réseau</td>
                <td className="py-2 px-4">Asynchrone non-bloquant (async/await)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Appel API Gemini</td>
                <td className="py-2 px-4">I/O réseau</td>
                <td className="py-2 px-4">Asynchrone non-bloquant (async/await)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Calcul mathématique lourd</td>
                <td className="py-2 px-4 text-rose-700 font-bold">CPU intensif</td>
                <td className="py-2 px-4 font-bold text-emerald-700">Worker Threads</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Nettoyage regex &amp; hashing</td>
                <td className="py-2 px-4 text-rose-700 font-bold">CPU intensif</td>
                <td className="py-2 px-4 font-bold text-emerald-700">Worker Threads</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Architecture des Workers */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Architecture des Workers
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-1">
          <p className="text-amber-400">{'// Délégation multithread Node.js :'}</p>
          <p>       Thread principal (Express HTTP)</p>
          <p>               |</p>
          <p>       Message envoyé (workerData)</p>
          <p>          /         \\</p>
          <p>         v           v</p>
          <p>     Worker 1     Worker 2 (Isolats V8 indépendants)</p>
          <p>         |           |</p>
          <p>       Calcul      Calcul</p>
          <p>         \\           /</p>
          <p>       parentPort.postMessage()</p>
          <p>               v</p>
          <p>       Thread principal -&gt; Réponse JSON</p>
        </div>
      </section>

      {/* 5. Créer le Worker */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Créer un Worker Thread
        </h2>
        <CodeBlock
          filename="backend/src/workers/calculation.worker.ts"
          language="typescript"
          code={`import { parentPort, workerData } from "node:worker_threads";

const { limit } = workerData as { limit: number };
let result = 0;

for (let i = 0; i <= limit; i++) {
  result += i;
}

parentPort?.postMessage(result);`}
        />
      </section>

      {/* 6. Service Worker */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Créer le service Worker
        </h2>
        <CodeBlock
          filename="backend/src/services/worker.service.ts"
          language="typescript"
          code={`import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";

export function calculateInWorker(limit: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      fileURLToPath(new URL("../workers/calculation.worker.js", import.meta.url)),
      { workerData: { limit } }
    );

    worker.once("message", (result: number) => resolve(result));
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        reject(new Error(\`Worker terminé avec le code \${code}\`));
      }
    });
  });
}`}
        />
      </section>

      {/* 7. Route Express */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Intégrer le Worker dans Express et mesurer les gains
        </h2>
        <CodeBlock
          filename="backend/src/routes/compute.routes.ts"
          language="typescript"
          code={`import { Router } from "express";
import { calculateInWorker } from "../services/worker.service.js";

const router = Router();

router.get("/calculate", async (req, res) => {
  try {
    const start = performance.now();
    const result = await calculateInWorker(100_000_000);
    const duration = performance.now() - start;

    res.json({ success: true, result, durationMs: Math.round(duration) });
  } catch (error) {
    res.status(500).json({ error: "Erreur de calcul" });
  }
});

export default router;`}
        />
      </section>

      {/* 8. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Travaux pratiques
        </h2>
        <PracticalWork
          title="Délestage multithread avec Worker Threads"
          objective="Comparer la latence du serveur sous calcul lourd avec et sans Worker."
          duration="45 min"
          steps={[
            "Implémentez calculation.worker.ts et worker.service.ts.",
            "Ajoutez la route /calculate et comparez avec un endpoint synchrone ordinaire.",
            "Lancez plusieurs requêtes simultanées et constatez que le serveur continue de répondre immédiatement sur /api/health.",
            "Exercice supplémentaire : Créez un Worker calculant la moyenne, le min et le max d'un tableau d'un million d'entrées."
          ]}
        />
      </section>

      {/* 9. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Synthèse
        </h2>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-2 text-sm text-slate-900 font-medium">
          <p>⬢ Le thread principal ne doit jamais exécuter de boucles CPU bloquantes.</p>
          <p>⬢ Les Worker Threads créent de vrais threads système isolés.</p>
          <p>⬢ Les échanges se font par copie mémoire via <code className="font-mono font-bold">postMessage</code>.</p>
          <p>⬢ Les requêtes I/O réseau (Gemini, MySQL) n&apos;ont pas besoin de Workers.</p>
        </div>
      </section>
    </div>
  );
};

