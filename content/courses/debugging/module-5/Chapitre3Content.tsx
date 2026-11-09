'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type WorkloadType = 'io_async' | 'sync_cpu_block' | 'redos_regex' | 'worker_thread_pool';

interface WorkloadProfile {
  title: string;
  badge: string;
  badgeColor: string;
  cpuPercent: number;
  eventLoopDelayMs: number;
  heapUsedMb: number;
  rssMb: number;
  throughputReqSec: number;
  status: 'OPTIMAL' | 'DANGER_EVENT_LOOP_FROZEN' | 'CRITICAL_REDOS';
  description: string;
  bottleneckExplanation: string;
  remediationCode: string;
}

const WORKLOAD_PROFILES: Record<WorkloadType, WorkloadProfile> = {
  io_async: {
    title: '1. Trafic I/O Asynchrone Standard (Base de Données / API)',
    badge: 'Sain & Fluide',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    cpuPercent: 18,
    eventLoopDelayMs: 2.4,
    heapUsedMb: 68,
    rssMb: 112,
    throughputReqSec: 3200,
    status: 'OPTIMAL',
    description: 'Le serveur traite des requêtes non-bloquantes (requêtes SQL asynchrones, appels HTTP distants avec async/await). L\'Event Loop délègue les opérations I/O au système d\'exploitation (via libuv/epoll/IOCP) et reprend le contrôle dès la réception des événements.',
    bottleneckExplanation: 'Aucun goulot d\'étranglement CPU. Le thread principal JavaScript est disponible 95% du temps pour orchestrer les callbacks. L\'Event Loop Delay reste sous le seuil critique de 20 ms.',
    remediationCode: `// ✅ Code asynchrone non-bloquant classique
app.get('/api/users', async (req, res) => {
  // L'opération d'E/S est confiée au driver réseau/BDD non-bloquant
  const users = await db.query('SELECT id, name, email FROM users LIMIT 50');
  res.json({ success: true, data: users });
});`,
  },
  sync_cpu_block: {
    title: '2. Calcul Mathématique Lourd sur le Main Thread (Boucle Synchrone)',
    badge: 'Event Loop Bloquée',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    cpuPercent: 99,
    eventLoopDelayMs: 1420,
    heapUsedMb: 75,
    rssMb: 125,
    throughputReqSec: 8,
    status: 'DANGER_EVENT_LOOP_FROZEN',
    description: 'Une route exécute un traitement mathématique ou un parsing lourd directement dans la pile d\'exécution du thread unique Node.js (ex: 50 millions d\'itérations Math.sqrt ou un hashage CPU-intensif).',
    bottleneckExplanation: 'Le processeur est à 100% sur un seul cœur. L\'Event Loop est totalement figée pendant 1,4 seconde : toutes les autres requêtes entrantes s\'entassent dans la file d\'attente TCP du système et expirent en Timeout (504 Gateway Timeout).',
    remediationCode: `// ❌ CODE VULNÉRABLE : Bloque le thread principal Node.js
app.get('/api/compute-stats', (req, res) => {
  let accumulator = 0;
  // Cette boucle monopolise le thread JavaScript pendant 1 400 ms !
  for (let i = 0; i < 50_000_000; i++) {
    accumulator += Math.sqrt(i);
  }
  res.json({ accumulator });
});`,
  },
  redos_regex: {
    title: '3. Déni de Service par Expression Régulière (ReDoS Catastrophique)',
    badge: 'ReDoS Catastrophique',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    cpuPercent: 100,
    eventLoopDelayMs: 5800,
    heapUsedMb: 82,
    rssMb: 135,
    throughputReqSec: 0,
    status: 'CRITICAL_REDOS',
    description: 'Une expression régulière vulnérable avec chevauchement et répétition imbriquée (backtracking exponentiel `(a+)+$`) tente de valider une charge utile utilisateur malveillante de 30 caractères.',
    bottleneckExplanation: 'Le moteur RegExp de V8 effectue jusqu\'à 2^30 tentatives de backtracking. L\'Event Loop s\'arrête net pendant plusieurs secondes par requête. Deux requêtes simultanées suffisent à paralyser complètement un cluster Node.js.',
    remediationCode: `// ❌ REGEX VULNÉRABLE (Complexité exponentielle O(2^n)) :
const evilRegex = /^([a-zA-Z0-9_.-]+)+@([a-zA-Z0-9-]+)+(\\.[a-zA-Z0-9-.]+)+$/;

// ✅ SOLUTION SÉCURISÉE : Valider avec une RegExp linéaire sans backtracking
// ou déléguer à une bibliothèque spécialisée comme 'validator'
import validator from 'validator';

app.post('/api/validate-email', (req, res) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Format d\\'email invalide' });
  }
  res.json({ valid: true });
});`,
  },
  worker_thread_pool: {
    title: '4. Déportation vers un Worker Thread Pool (piscina / node:worker_threads)',
    badge: 'Architecture Optimisée',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    cpuPercent: 78,
    eventLoopDelayMs: 4.1,
    heapUsedMb: 94,
    rssMb: 180,
    throughputReqSec: 2850,
    status: 'OPTIMAL',
    description: 'Le calcul lourd est extrait du thread principal et envoyé à un pool de Worker Threads s\'exécutant sur des cœurs CPU dédiés en arrière-plan. Le thread principal reste instantanément disponible pour servir les requêtes entrantes.',
    bottleneckExplanation: 'La charge CPU est équilibrée sur plusieurs cœurs physiques. L\'Event Loop Delay reste minime (4 ms) car le thread principal n\'effectue que l\'envoi de messages via MessageChannel et la réception de la promesse résolue.',
    remediationCode: `// ✅ ARCHITECTURE MULTI-THREAD AVEC PISCINA :
// worker.js
module.exports = ({ iterations }) => {
  let acc = 0;
  for (let i = 0; i < iterations; i++) acc += Math.sqrt(i);
  return acc;
};

// server.js
import Piscina from 'piscina';
const pool = new Piscina({ filename: new URL('./worker.js', import.meta.url).href });

app.get('/api/compute-stats', async (req, res) => {
  // Exécuté dans un thread séparé en C++/V8 isolé
  const result = await pool.run({ iterations: 50_000_000 });
  res.json({ result });
});`,
  },
};

export const Chapitre3Content: React.FC = () => {
  const [selectedWorkload, setSelectedWorkload] = useState<WorkloadType>('io_async');
  const activeProfile = WORKLOAD_PROFILES[selectedWorkload];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="activity" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Analyser la consommation CPU, Mémoire et Event Loop Lag
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Distinguer une saturation CPU d&apos;une famine d&apos;Event Loop, maîtriser le profilage V8 (<code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">.cpuprofile</code>), exploiter <code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">monitorEventLoopDelay()</code> et déporter les calculs intensifs.
        </p>
      </div>

      {/* Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Comprendre le modèle monothread de Node.js et l&apos;impact direct des opérations synchrones sur l&apos;Event Loop.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Déchiffrer avec précision <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">process.memoryUsage()</code> (RSS, HeapTotal, HeapUsed, External, ArrayBuffers).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Mesurer le retard d&apos;ordonnancement avec <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">perf_hooks.monitorEventLoopDelay()</code>.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Générer et lire un fichier <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">.cpuprofile</code> (Self Time vs Total Time, Flame Charts).</span>
          </div>
        </div>
      </section>

      {/* 1. Différence fondamentale : CPU, RAM et Event Loop */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-600" />
          1. Le Trilemme de Performance : CPU, RAM et Event Loop
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Dans la plupart des architectures traditionnelles (Java, PHP-FPM, multi-processus), une tâche consommatrice en calcul n&apos;impacte qu&apos;un seul thread ou processus utilisateur pendant que les autres continuent d&apos;être servis. 
          Dans <strong>Node.js</strong>, le code applicatif JavaScript s&apos;exécute sur <strong>un seul et unique thread d&apos;exécution</strong>. Un calcul lourd bloque le cœur même du moteur :
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Ressource</th>
                <th className="px-4 py-3">Rôle & Mécanisme</th>
                <th className="px-4 py-3">Symptôme d&apos;alerte</th>
                <th className="px-4 py-3">Exemple de faute en production</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-indigo-700">CPU (Calcul)</td>
                <td className="px-4 py-2.5 font-medium">Exécution séquentielle des opcodes V8 et calculs arithmétiques</td>
                <td className="px-4 py-2.5 font-medium">Un cœur CPU à 100%, ventilateur serveur, P99 explose</td>
                <td className="px-4 py-2.5 font-medium">Chiffrement bcrypt synchrone, compression gzip non-streamée</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-emerald-700">RAM (Mémoire)</td>
                <td className="px-4 py-2.5 font-medium">Rétention des objets, Buffers, contextes de fermeture et caches</td>
                <td className="px-4 py-2.5 font-medium">RSS grandissant, GC répété (Scavenge/Mark-Sweep), Crash OOM</td>
                <td className="px-4 py-2.5 font-medium">Chargement d&apos;un fichier CSV de 500 Mo avec <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">fs.readFileSync()</code></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-amber-700">Event Loop Lag</td>
                <td className="px-4 py-2.5 font-medium">Capacité du thread principal à dépiler les callbacks I/O et timers</td>
                <td className="px-4 py-2.5 font-medium">CPU parfois moyen (25%), mais latence HTTP supérieure à 2000 ms</td>
                <td className="px-4 py-2.5 font-medium">Regex ReDoS avec backtracking catastrophique, JSON.parse géant</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="Le piège du CPU Multi-Cœurs">
          <p className="text-xs sm:text-sm">
            Si votre serveur de production possède 8 cœurs CPU et que vous observez une charge globale de seulement <strong>12.5%</strong> dans votre monitoring CloudWatch ou Datadog, ne concluez pas trop vite que tout va bien ! 
            Dans une instance Node.js non-clusterisée (sans PM2 cluster ou Workers), <strong>12.5% = 1 cœur physique saturé à 100%</strong>. Le thread principal de votre processus est paralysé.
          </p>
        </Callout>
      </section>

      {/* 2. Démystifier process.memoryUsage() */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="database" className="w-5 h-5 text-emerald-600" />
          2. Décomposition chirurgicale de process.memoryUsage()
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          La mémoire rapportée par le système d&apos;exploitation (RSS) diffère fondamentalement de celle gérée par le ramasse-miettes de V8 (<code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">heapUsed</code>). 
          Voici l&apos;anatomie exacte des 5 métriques clés retournées par Node.js :
        </p>

        <CodeBlock
          code={`// Diagnostiquer l'empreinte mémoire exacte du processus Node.js
const mem = process.memoryUsage();

console.log({
  rss: \`\${(mem.rss / 1024 / 1024).toFixed(2)} Mo\`,
  heapTotal: \`\${(mem.heapTotal / 1024 / 1024).toFixed(2)} Mo\`,
  heapUsed: \`\${(mem.heapUsed / 1024 / 1024).toFixed(2)} Mo\`,
  external: \`\${(mem.external / 1024 / 1024).toFixed(2)} Mo\`,
  arrayBuffers: \`\${(mem.arrayBuffers / 1024 / 1024).toFixed(2)} Mo\`
});`}
          language="typescript"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 shadow-xs">
            <span className="font-mono font-bold text-indigo-700 text-xs block mb-1">1. rss (Resident Set Size)</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              La quantité totale de RAM allouée par le système d&apos;exploitation au processus Node.js (pages de code exécutable C++, pile d&apos;appels, Heap V8 et mémoire allouée hors-tas). C&apos;est la valeur surveillée par Kubernetes pour tuer un conteneur en cas d&apos;OOMKilled.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 shadow-xs">
            <span className="font-mono font-bold text-emerald-700 text-xs block mb-1">2. heapTotal & heapUsed</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>heapTotal</strong> est la réserve de mémoire demandée par V8 au système. <strong>heapUsed</strong> est la portion actuellement occupée par vos objets, tableaux et fermetures JavaScript vivants.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 shadow-xs">
            <span className="font-mono font-bold text-amber-700 text-xs block mb-1">3. external</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Mémoire liée à des objets C++ externes exposés à JavaScript (fichiers ouverts, sockets réseau, bindings natifs comme Sharp ou SQLite). Si <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">external</code> explose mais pas le Heap, le problème réside dans un module natif C++.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 shadow-xs">
            <span className="font-mono font-bold text-rose-700 text-xs block mb-1">4. arrayBuffers</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Mémoire allouée pour les instances de <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">Buffer</code> et <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">ArrayBuffer</code>. Les Buffers Node.js sont alloués en C++ hors du Heap V8 pour des raisons d&apos;efficacité réseau/disque.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Détecter l'Event Loop Lag avec perf_hooks */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="clock" className="w-5 h-5 text-amber-600" />
          3. Mesurer l&apos;Event Loop Lag avec monitorEventLoopDelay()
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Comment savoir avec certitude si votre application Node.js commence à étouffer sous la charge ? 
          Le module standard <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">node:perf_hooks</code> fournit un histogramme natif de haute précision qui échantillonne le retard de l&apos;ordonnanceur de timers :
        </p>

        <CodeBlock
          code={`import { monitorEventLoopDelay } from 'node:perf_hooks';

// Échantillonnage avec une résolution de 20 millisecondes
const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

// Surveillance périodique toutes les 5 secondes
setInterval(() => {
  const p50Ms = (histogram.percentile(50) / 1e6).toFixed(2);
  const p95Ms = (histogram.percentile(95) / 1e6).toFixed(2);
  const p99Ms = (histogram.percentile(99) / 1e6).toFixed(2);
  const maxMs = (histogram.max / 1e6).toFixed(2);

  console.log(\`[EVENT LOOP DELAY] P50: \${p50Ms}ms | P95: \${p95Ms}ms | P99: \${p99Ms}ms | Max: \${maxMs}ms\`);

  // Seuil d'alerte en production :
  if (histogram.percentile(99) > 100_000_000) { // > 100 ms
    console.error('⚠️ ALERTE CRITIQUE : Event Loop saturée ! Risque de timeouts HTTP imminents.');
  }

  // Réinitialiser les compteurs pour la prochaine fenêtre de 5 secondes
  histogram.reset();
}, 5000);`}
          language="typescript"
        />

        <Callout type="tip" title="Normes d'exploitabilité en Production">
          <p className="text-xs sm:text-sm">
            En production, un serveur sain présente un <strong>P95 sous les 10 ms</strong>. Si votre P99 dépasse <strong>50 ms</strong>, les utilisateurs commencent à percevoir des micro-gels. 
            Au-delà de <strong>1 000 ms</strong>, votre serveur est en état d&apos;asphyxie fonctionnelle (famine d&apos;Event Loop).
          </p>
        </Callout>
      </section>

      {/* 4. Simulateur Interactif : CpuEventLoopSimulatorLab */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          4. Simulateur Interactif : Laboratoire de Charge CPU & Event Loop
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Sélectionnez un profil d&apos;exécution pour observer en direct l&apos;impact d&apos;un goulot d&apos;étranglement sur les métriques clés de Node.js (CPU %, Event Loop Delay, Débit de requêtes et Empreinte Mémoire) :
        </p>

        {/* Boutons de sélection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(WORKLOAD_PROFILES) as WorkloadType[]).map((key) => {
            const p = WORKLOAD_PROFILES[key];
            const isSelected = selectedWorkload === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedWorkload(key)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-lime-500 bg-lime-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${p.badgeColor} inline-block mb-1`}>
                    {p.badge}
                  </span>
                  <div className="text-xs font-bold text-slate-950 leading-tight">
                    {p.title.split('(')[0]}
                  </div>
                </div>
                <div className="mt-2 text-[11px] font-mono text-slate-600">
                  CPU: {p.cpuPercent}% | Delay: {p.eventLoopDelayMs}ms
                </div>
              </button>
            );
          })}
        </div>

        {/* Dashboard de télémétrie simulée */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scénario actif</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{activeProfile.title}</h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${activeProfile.badgeColor}`}>
              Statut : {activeProfile.status}
            </span>
          </div>

          {/* Jauges télémétriques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">CPU Main Thread</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${activeProfile.cpuPercent > 90 ? 'text-rose-600' : 'text-slate-900'}`}>
                {activeProfile.cpuPercent}%
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full ${activeProfile.cpuPercent > 90 ? 'bg-rose-500' : activeProfile.cpuPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${activeProfile.cpuPercent}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Event Loop Delay</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${activeProfile.eventLoopDelayMs > 100 ? 'text-rose-600' : activeProfile.eventLoopDelayMs > 20 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {activeProfile.eventLoopDelayMs} ms
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Normal: &lt; 20 ms</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Débit HTTP</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${activeProfile.throughputReqSec < 50 ? 'text-rose-600' : 'text-slate-900'}`}>
                {activeProfile.throughputReqSec} req/s
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Capacité serveur</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Mémoire (RSS / Heap)</div>
              <div className="text-base sm:text-lg font-mono font-black text-slate-900">
                {activeProfile.rssMb} / {activeProfile.heapUsedMb} Mo
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">RSS physique</div>
            </div>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-slate-900">Comportement observé : </span>
              <span className="text-slate-700">{activeProfile.description}</span>
            </div>
            <div>
              <span className="font-bold text-rose-800">Analyse de la saturation : </span>
              <span className="text-slate-700">{activeProfile.bottleneckExplanation}</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Icon name="terminal" className="w-3.5 h-3.5 text-lime-600" />
              <span>Implémentation & Correction architecturale :</span>
            </div>
            <CodeBlock code={activeProfile.remediationCode} language="typescript" />
          </div>
        </div>
      </section>

      {/* 5. Générer et lire un .cpuprofile */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="search" className="w-5 h-5 text-indigo-600" />
          5. Profilage CPU Avancé : node --cpu-prof et Flame Graphs
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Lorsque vous constatez qu&apos;un processus consomme trop de CPU, comment identifier <strong>la fonction exacte</strong> responsable du coût sans insérer des dizaines de <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono">console.time()</code> ? 
          Node.js intègre nativement le profileur d&apos;échantillonnage de V8 :
        </p>

        <CodeBlock
          code={`# 1. Démarrer votre serveur avec le profileur CPU V8 actif
node --cpu-prof --cpu-prof-name=prod-audit.cpuprofile server.js

# 2. Exécuter un tir de charge avec autocannon pendant 15 secondes
npx autocannon -c 50 -d 15 http://localhost:3000/api/heavy-route

# 3. Arrêter le serveur avec Ctrl+C (ou kill -SIGINT)
# Node.js écrit alors le fichier 'prod-audit.cpuprofile' sur le disque.`}
          language="bash"
        />

        <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 space-y-3">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <Icon name="layers" className="w-4 h-4 text-indigo-600" />
            Comment lire et interpréter les deux métriques d&apos;un Profil CPU ?
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-800">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-black">▶</span>
              <div>
                <strong>Self Time (Temps Propre) :</strong> Le temps pendant lequel le processeur était en train d&apos;exécuter les instructions de <em>cette fonction spécifique</em>, à l&apos;exclusion du temps passé dans les fonctions qu&apos;elle appelle. Une fonction avec un Self Time élevé est un goulot d&apos;étranglement direct (ex: une boucle for, un algorithme de tri, un calcul de somme).
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-black">▶</span>
              <div>
                <strong>Total Time (Temps Global) :</strong> Le temps total écoulé entre l&apos;entrée dans la fonction et sa sortie, incluant tous ses sous-appels. Si une fonction a un Total Time élevé mais un Self Time très bas, elle n&apos;est pas lente en soi : elle ne fait qu&apos;attendre le retour d&apos;autres fonctions enfants.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 6. Cas Réel Entreprise : Incident #402 */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          6. Étude de Cas Réelle : L&apos;Incident #402 chez FinCorp Solutions
        </h2>
        <div className="border-2 border-rose-200 bg-rose-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-1 rounded-md">
              Incident Production P1
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Durée : 42 minutes</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>Contexte :</strong> Tous les vendredis à 17h00, l&apos;application FinCorp génère 25 000 factures PDF et chiffre les bulletins de paie des collaborateurs. Dès le lancement du job, la passerelle Nginx renvoie des erreurs <code className="bg-rose-100 text-rose-900 px-1 py-0.5 rounded font-mono font-bold text-xs">504 Gateway Timeout</code> sur l&apos;ensemble de l&apos;API de paiement.
            </p>
            <p>
              <strong>Diagnostic :</strong> La commande <code className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">top</code> montre que le processus Node.js tourne à 100% sur un seul cœur CPU. Le fichier <code className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.cpuprofile</code> révèle que la fonction <code className="font-mono text-rose-800 font-bold">bcrypt.hashSync()</code> occupe 84% du Self Time sur le main thread !
            </p>
            <p>
              <strong>Solution appliquée :</strong> Remplacement immédiat par la version asynchrone non-bloquante <code className="font-mono text-emerald-800 font-bold">bcrypt.hash()</code> (déléguée au thread pool libuv) et migration de la génération PDF vers un pool de Worker Threads isolés (<code className="font-mono text-emerald-800 font-bold">piscina</code>). La latence API est revenue instantanément de 8 400 ms à 38 ms.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Analyse CPU & Mémoire (Chapitre 5.3)"
          questions={[
            {
              id: 1,
              question: "Pourquoi une boucle for synchrone de 100 millions d'itérations fait-elle grimper la latence de TOUTES les requêtes HTTP dans Node.js ?",
              options: [
                "Parce qu'elle consomme toute la bande passante de la carte réseau physique.",
                "Parce que Node.js exécute le code JavaScript sur un thread unique : tant que la boucle tourne, l'Event Loop ne peut dépiler aucune requête entrante.",
                "Parce que le moteur V8 désactive automatiquement Express en cas de surcharge processeur.",
                "Parce que les disques durs s'arrêtent temporairement pour économiser l'énergie."
              ],
              correctIndex: 1,
              explanation: "Node.js repose sur un modèle d'E/S non-bloquant mais monothread pour l'exécution JavaScript. Un calcul synchrone bloque le thread principal, ce qui empêche l'Event Loop de traiter les callbacks des autres requêtes en attente.",
            },
            {
              id: 2,
              question: "Dans process.memoryUsage(), que représente la métrique 'arrayBuffers' ?",
              options: [
                "La mémoire totale consommée par l'historique des requêtes Git.",
                "La mémoire allouée hors du Heap V8 pour les structures de données binaires telles que Buffer et ArrayBuffer.",
                "Le cache des requêtes SQL MySQL préparées.",
                "La mémoire vive allouée par le navigateur Chrome du client."
              ],
              correctIndex: 1,
              explanation: "Les objets Buffer et ArrayBuffer sont alloués en C++ en dehors du tas V8 (Off-Heap) afin de permettre des transferts de données à haut débit (fichiers, sockets) sans pénaliser le ramasse-miettes.",
            },
            {
              id: 3,
              question: "Dans un rapport de profilage .cpuprofile, que signifie le fait qu'une fonction affiche un faible Self Time mais un fort Total Time ?",
              options: [
                "La fonction contient elle-même un algorithme de calcul extrêmement lourd.",
                "La fonction ne consomme pas beaucoup de CPU directement : sa durée s'explique par les fonctions filles qu'elle appelle.",
                "La fonction a provoqué une fuite mémoire critique.",
                "La fonction a été ignorée par le compilateur Just-In-Time (JIT) de V8."
              ],
              correctIndex: 1,
              explanation: "Le Self Time ne comptabilise que le temps passé dans les instructions propres de la fonction. Un Total Time élevé avec un Self Time minime prouve que la lenteur vient d'une fonction sous-jacente appelée dans sa pile.",
            },
            {
              id: 4,
              question: "Quelle méthode native de Node.js permet de mesurer précisément l'engorgement et le retard d'ordonnancement de l'Event Loop ?",
              options: [
                "console.timeEventLoop()",
                "perf_hooks.monitorEventLoopDelay()",
                "process.getSystemLoadAverage()",
                "v8.getHeapSpaceStatistics()"
              ],
              correctIndex: 1,
              explanation: "monitorEventLoopDelay() du module 'node:perf_hooks' échantillonne continuellement le délai réel entre l'expiration théorique d'un timer et son exécution effective par l'Event Loop.",
            },
            {
              id: 5,
              question: "Quelle est la meilleure stratégie d'ingénierie pour exécuter un calcul cryptographique ou mathématique intensif dans une API Node.js ?",
              options: [
                "Augmenter simplement la valeur de setTimeout() dans le contrôleur.",
                "Déléguer le traitement à un pool de Worker Threads (ex: biblioteca Piscina ou node:worker_threads) ou à un microservice asynchrone.",
                "Exécuter le calcul dans un hook React useEffect() côté serveur.",
                "Désactiver le ramasse-miettes de Node.js avec --expose-gc."
              ],
              correctIndex: 1,
              explanation: "Les Worker Threads exécutent le calcul sur un thread système séparé et sur un autre cœur CPU, laissant le thread principal de Node.js 100% disponible pour répondre aux requêtes HTTP avec un Event Loop Delay quasi-nul.",
            },
            {
              id: 6,
              question: "Comment un problème de ReDoS (Regular Expression Denial of Service) paralyse-t-il un serveur Node.js ?",
              options: [
                "En saturant le disque dur avec des logs d'erreurs regex géants.",
                "En provoquant un backtracking exponentiel O(2^n) dans le moteur V8, monopolisant le processeur pendant des secondes ou des minutes par requête.",
                "En injectant du code SQL malveillant à travers la regex.",
                "En fermant prématurément le port TCP 80 du serveur."
              ],
              correctIndex: 1,
              explanation: "Des expressions régulières contenant des répétitions imbriquées ou ambiguës entraînent un backtracking catastrophique lorsque l'entrée utilisateur ne correspond pas au motif, bloquant intégralement le thread V8.",
            },
          ]}
        />
      </div>
    </div>
  );
};
