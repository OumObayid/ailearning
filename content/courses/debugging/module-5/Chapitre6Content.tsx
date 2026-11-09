'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type LoadArchitecture = 'single_unprotected' | 'rate_limited' | 'load_balanced_cluster' | 'event_queue_decoupled';

interface LoadProfile {
  title: string;
  badge: string;
  badgeColor: string;
  simulatedRps: number;
  p99LatencyMs: number;
  cpuPercent: number;
  httpStatusDistribution: string;
  serverState: 'CRASHED_CASCADE' | 'THROTTLED_HEALTHY' | 'STABLE_SCALED' | 'HIGH_THROUGHPUT_OPTIMAL';
  summary: string;
  bottleneckAnalysis: string;
  solutionArchitecture: string;
}

const LOAD_PROFILES: Record<LoadArchitecture, LoadProfile> = {
  single_unprotected: {
    title: '1. Instance Unique sans Protection (Monolithe Brut)',
    badge: 'Crash en Cascade (502 / 504)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    simulatedRps: 2500,
    p99LatencyMs: 9400,
    cpuPercent: 100,
    httpStatusDistribution: '20% 200 OK | 45% 504 Timeout | 35% 502 Bad Gateway',
    serverState: 'CRASHED_CASCADE',
    summary: 'Le serveur Node.js monothread reçoit 2 500 requêtes/seconde. La file d\'attente TCP du noyau Linux (backlog) déborde. L\'Event Loop s\'arrête, le pool de connexions SQL est asphyxié et Nginx renvoie des 502/504 en cascade.',
    bottleneckAnalysis: 'Saturation conjointe du CPU (1 cœur physique à 100%), épuisement des descripteurs de fichiers sockets (ulimit) et blocage de toutes les requêtes en attente.',
    solutionArchitecture: `// ❌ CONFIGURATION VULNÉRABLE : Traitement synchrone direct sans garde-fou
app.post('/api/generate-report', async (req, res) => {
  // Chaque requête lance immédiatement un calcul lourd de 3 secondes en BDD !
  const report = await generatePdfAndExcel(req.body);
  res.json({ report });
});`,
  },
  rate_limited: {
    title: '2. Protection par Rate Limiting (Fenêtre Glissante Redis)',
    badge: 'Protection Active (HTTP 429)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    simulatedRps: 2500,
    p99LatencyMs: 24,
    cpuPercent: 42,
    httpStatusDistribution: '15% 200 OK (Trafic Légitime) | 85% 429 Too Many Requests',
    serverState: 'THROTTLED_HEALTHY',
    summary: 'Le serveur rejette instantanément l\'excédent de trafic avec un code HTTP 429 (Too Many Requests). Le CPU reste à 42% et les utilisateurs prioritaires continuent d\'être servis en 24 ms sans ralentissement.',
    bottleneckAnalysis: 'Le serveur ne sature plus, mais les utilisateurs légitimes dépassant le quota sont temporairement bridés. C\'est un bouclier de survie indispensable contre le déni de service.',
    solutionArchitecture: `// ✅ PROTECTION RATE LIMITING AVEC EXPRESS-RATE-LIMIT & REDIS
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from './redis';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limite chaque IP à 100 requêtes par minute
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({ sendCommand: (...args: string[]) => redisClient.sendCommand(args) }),
  message: { error: 'Trop de requêtes. Veuillez réessayer dans une minute (HTTP 429).' }
});

app.use('/api/', limiter);`,
  },
  load_balanced_cluster: {
    title: '3. Cluster Multi-Processus & Load Balancer (PM2 / Nginx)',
    badge: 'Scale Horizontal (x4 Cœurs)',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    simulatedRps: 2500,
    p99LatencyMs: 65,
    cpuPercent: 68,
    httpStatusDistribution: '99.8% 200 OK | 0.2% 499 Closed Request',
    serverState: 'STABLE_SCALED',
    summary: 'La charge est distribuée de manière équitable (Round-Robin ou Least Connections) sur 4 processus Node.js indépendants tournant sur 4 cœurs physiques dédiés.',
    bottleneckAnalysis: 'La capacité de traitement est multipliée par 4. Si le trafic double encore (5 000 RPS), la base de données SQL sous-jacente deviendra le nouveau goulot d\'étranglement.',
    solutionArchitecture: `// ecosystem.config.js (PM2 Cluster Mode)
module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/server.js',
    instances: 'max', // Lance 1 instance par cœur CPU physique
    exec_mode: 'cluster',
    max_memory_restart: '800M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};`,
  },
  event_queue_decoupled: {
    title: '4. Architecture Asynchrone Découplée (API Gateway + BullMQ)',
    badge: 'Découplage Asynchrone Idéal',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    simulatedRps: 5000,
    p99LatencyMs: 12,
    cpuPercent: 35,
    httpStatusDistribution: '100% 202 Accepted (Envoi immédiat au Worker)',
    serverState: 'HIGH_THROUGHPUT_OPTIMAL',
    summary: 'L\'API HTTP n\'effectue aucun traitement lourd : elle enregistre la demande dans une file Redis ultra-rapide et renvoie immédiatement `202 Accepted` avec un ID de job. Un pool de Workers séparés dépile les travaux au rythme maximal toléré par le matériel.',
    bottleneckAnalysis: 'Aucun goulot d\'étranglement sur l\'API web. Le système absorbe des pics de trafic gigantesques sans aucune dégradation de la latence utilisateur.',
    solutionArchitecture: `// ✅ API ROUTE : Réponse instantanée en 8 ms
import { Queue } from 'bullmq';
const reportQueue = new Queue('reports', { connection: redisConfig });

app.post('/api/reports', async (req, res) => {
  const job = await reportQueue.add('generate', req.body);
  // 202 Accepted : La demande est en file d'attente
  res.status(202).json({ jobId: job.id, status: 'QUEUED' });
});

// ✅ WORKER ISOLÉ (worker.js) : Traite le job en tâche de fond
import { Worker } from 'bullmq';
new Worker('reports', async (job) => {
  await heavyPdfComputation(job.data);
}, { connection: redisConfig, concurrency: 5 });`,
  },
};

export const Chapitre6Content: React.FC = () => {
  const [selectedArch, setSelectedArch] = useState<LoadArchitecture>('single_unprotected');
  const profile = LOAD_PROFILES[selectedArch];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="activity" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Problèmes de Charge, Saturation Serveur & Architectures Résilientes
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Diagnostiquer les pannes de capacité sous fort trafic, exécuter des tirs de charge réalistes avec <code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">autocannon</code>, configurer le Load Balancing Nginx/PM2 et découpler les traitements lourds avec les files d&apos;attente BullMQ.
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
            <span>Comprendre les mécanismes physiques de la saturation (CPU, RAM OOMKiller, Socket Exhaustion).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Mener des audits de charge reproductibles avec Autocannon et k6 (mesure des P95, P99 et RPS).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Différencier le Scaling Vertical (Scale Up) du Scaling Horizontal (Cluster / Load Balancer).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Mettre en œuvre le modèle asynchrone découplé avec Redis et BullMQ pour éliminer les timeouts HTTP.</span>
          </div>
        </div>
      </section>

      {/* 1. Pourquoi un serveur sature-t-il ? */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-octagon" className="w-5 h-5 text-rose-600" />
          1. Anatomie de la Saturation : Le Cercle Vicieux du Crash en Cascade
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Une application qui répond en 30 millisecondes sous une charge de 50 requêtes par seconde ne répond pas simplement en 300 millisecondes sous 500 requêtes par seconde. 
          Lorsqu&apos;un système atteint son <strong>point de rupture</strong> (knee point), le comportement devient non-linéaire : les temps de réponse explosent et le système s&apos;effondre brutalement.
        </p>

        {/* Figure 6.6.A - Preserving image8.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image8.jpeg"
              alt="Surveillance de la saturation système dans le Gestionnaire des tâches et le moniteur de ressources (Figure 6.6.A)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 6.6.A — Observation de la saturation des ressources : Surcharge processeur et mémoire sous stress intensif.
          </div>
        </div>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Ressource saturée</th>
                <th className="px-4 py-3">Mécanisme sous-jacent</th>
                <th className="px-4 py-3">Conséquence côté client</th>
                <th className="px-4 py-3">Code HTTP typique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-rose-700">File TCP (Backlog)</td>
                <td className="px-4 py-2.5 font-medium">Le noyau Linux n&apos;arrive plus à accepter les nouvelles connexions TCP</td>
                <td className="px-4 py-2.5 font-medium">Le navigateur attend dans le vide jusqu&apos;à expiration</td>
                <td className="px-4 py-2.5 font-bold font-mono">ERR_CONNECTION_TIMED_OUT</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-amber-700">Event Loop Lag</td>
                <td className="px-4 py-2.5 font-medium">L&apos;Event Loop met plus de 30 secondes à dépiler les callbacks HTTP</td>
                <td className="px-4 py-2.5 font-medium">Le reverse proxy Nginx abandonne l&apos;attente du backend</td>
                <td className="px-4 py-2.5 font-bold font-mono text-amber-700">504 Gateway Timeout</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-indigo-700">Pool BDD Surchargé</td>
                <td className="px-4 py-2.5 font-medium">Toutes les connexions MySQL du pool (ex: 10/10) sont occupées</td>
                <td className="px-4 py-2.5 font-medium">Les requêtes s&apos;empilent en mémoire jusqu&apos;à l&apos;OOM</td>
                <td className="px-4 py-2.5 font-bold font-mono">500 Internal Server Error</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-purple-700">Processus Crash (OOM)</td>
                <td className="px-4 py-2.5 font-medium">Le noyau Linux tue le processus Node.js avec SIGKILL (OOMKilled)</td>
                <td className="px-4 py-2.5 font-medium">Nginx ne trouve aucun serveur en écoute sur le port 3000</td>
                <td className="px-4 py-2.5 font-bold font-mono text-rose-700">502 Bad Gateway</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Outils de test de charge : Autocannon & k6 */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="zap" className="w-5 h-5 text-amber-600" />
          2. Tester la Résistance sous Charge avec Autocannon & k6
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          On ne découvre jamais la capacité maximale d&apos;une application en production le jour du lancement. 
          Des outils comme <strong>Autocannon</strong> (écrit en Node.js pour benchmark HTTP/1.1 ultra-rapide) et <strong>k6</strong> (écrit en Go pour des scénarios de test complets) permettent de stresser votre API en préproduction :
        </p>

        {/* Figure 6.6.B - Preserving image9.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image9.jpeg"
              alt="Outils de test de charge et benchmark HTTP tels que k6 et Autocannon (Figure 6.6.B)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 6.6.B — Exécution d&apos;un tir de charge HTTP automatisé pour déterminer le seuil d&apos;engorgement de l&apos;API.
          </div>
        </div>

        <CodeBlock
          code={`# Lancer un tir de charge avec 100 connexions concurrentes pendant 20 secondes
npx autocannon -c 100 -d 20 -p 10 --renderStatusCodes http://localhost:3000/api/products

# Exemple de rapport généré :
# ┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
# │ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
# ├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
# │ Latency │ 12 ms  │ 28 ms  │ 412 ms │ 890 ms │ 52.4 ms   │ 84.1 ms  │ 2100 ms│
# └─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
# 38k requests in 20.05s, 42.1 MB read
# 1k 2xx responses, 37k non-2xx responses (502/504) -> ALERTE SATURATION !`}
          language="bash"
        />
      </section>

      {/* 3. Load Balancing & Scaling Horizontal */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-indigo-600" />
          3. Répartir la Charge : Load Balancing & Mode Cluster
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Le <strong>Scaling Vertical</strong> consiste à acheter une machine avec plus de RAM et un processeur plus puissant. Mais dans Node.js, comme chaque processus n&apos;utilise qu&apos;un seul cœur CPU, une machine 64 cœurs restera bridée à 1 cœur si vous ne faites pas de <strong>Scaling Horizontal</strong>.
        </p>

        {/* Figure 6.6.C - Preserving image10.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image10.jpeg"
              alt="Architecture de répartition de charge avec un Load Balancer Nginx distribuant vers plusieurs instances de serveurs (Figure 6.6.C)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 6.6.C — Schéma d&apos;architecture en Load Balancing : Nginx distribuant les flux HTTP vers un cluster de serveurs applicatifs.
          </div>
        </div>

        <CodeBlock
          code={`# Configuration Nginx (nginx.conf) pour un Load Balancing optimal
upstream nodejs_cluster {
    least_conn; # Envoie chaque nouvelle requête au serveur ayant le moins de connexions actives
    server 127.0.0.1:3001 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3002 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3003 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3004 max_fails=3 fail_timeout=10s;
    keepalive 64; # Maintient des connexions TCP ouvertes avec les backends
}

server {
    listen 80;
    server_name api.monsite.com;

    location / {
        proxy_pass http://nodejs_cluster;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_connect_timeout 2s;
        proxy_read_timeout 10s;
    }
}`}
          language="nginx"
        />

        <Callout type="tip" title="Stateless Architecture : La règle d'or du Scaling Horizontal">
          <p className="text-xs sm:text-sm">
            Pour qu&apos;un Load Balancer puisse distribuer les requêtes sans encombre, vos serveurs d&apos;API doivent être strictement <strong>sans état (Stateless)</strong>. 
            Ne stockez jamais les sessions utilisateurs dans la mémoire RAM du processus Node.js : déportez les sessions et jetons d&apos;authentification dans un magasin centralisé comme Redis.
          </p>
        </Callout>
      </section>

      {/* 4. Découplage Asynchrone avec Message Queues */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-emerald-600" />
          4. Le Bouclier Ultime : Découplage Asynchrone avec BullMQ & Redis
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Pourquoi forcer un client HTTP à maintenir une connexion ouverte pendant 15 secondes pour générer un rapport financier ou analyser un document avec une IA ? 
          L&apos;architecture la plus résiliente au monde consiste à <strong>séparer la réception de la commande de son exécution</strong> :
        </p>

        {/* Figure 6.6.D - Preserving image11.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image11.jpeg"
              alt="Architecture de file d'attente asynchrone avec API Gateway, Redis Queue et pool de Workers (Figure 6.6.D)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 6.6.D — Modèle Producteur / Consommateur avec File d&apos;Attente (Message Queue) : Isolation complète entre l&apos;API web et les workers d&apos;arrière-plan.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-900 text-xs block mb-1">Rôle du Serveur Web (Producteur) :</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Ne fait aucun calcul lourd. Il valide les données reçues, insère une tâche dans la file Redis en 2 ms et répond immédiatement au client <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-xs">202 Accepted</code>. Le serveur peut ainsi encaisser 10 000 requêtes/sec sans faiblir.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-900 text-xs block mb-1">Rôle des Workers (Consommateurs) :</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Tournent sur des serveurs séparés. Ils dépilent les travaux à leur propre rythme sans risque de crash. Si la file contient 100 000 jobs, ils ne plantent pas : ils les traitent méthodiquement un par un selon la capacité matérielle disponible.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Simulateur Interactif : LoadSaturationSimulatorLab */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          5. Simulateur Interactif : Laboratoire de Saturation & Résilience
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Simulez un pic de trafic massif (2 500 à 5 000 requêtes/seconde) sur différentes architectures logicielles pour observer l&apos;état des ressources et le taux de succès :
        </p>

        {/* Boutons de sélection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(LOAD_PROFILES) as LoadArchitecture[]).map((arch) => {
            const p = LOAD_PROFILES[arch];
            const isSelected = selectedArch === arch;
            return (
              <button
                key={arch}
                type="button"
                onClick={() => setSelectedArch(arch)}
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
                  RPS: {p.simulatedRps} | P99: {p.p99LatencyMs} ms
                </div>
              </button>
            );
          })}
        </div>

        {/* Tableau de bord */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Architecture Testée</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{profile.title}</h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${profile.badgeColor}`}>
              État : {profile.serverState}
            </span>
          </div>

          {/* Jauges télémétriques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Charge Simulée</div>
              <div className="text-lg sm:text-xl font-mono font-black text-slate-900">
                {profile.simulatedRps} req/s
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Tir de charge k6</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Latence P99</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${profile.p99LatencyMs > 1000 ? 'text-rose-600' : profile.p99LatencyMs > 100 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {profile.p99LatencyMs} ms
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Seuil SLA: &lt; 200 ms</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">CPU Cluster</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${profile.cpuPercent >= 95 ? 'text-rose-600' : 'text-slate-900'}`}>
                {profile.cpuPercent}%
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full ${profile.cpuPercent >= 95 ? 'bg-rose-500' : profile.cpuPercent > 60 ? 'bg-indigo-500' : 'bg-emerald-500'}`}
                  style={{ width: `${profile.cpuPercent}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Distribution Codes HTTP</div>
              <div className="text-xs font-mono font-bold text-slate-800 mt-1">
                {profile.httpStatusDistribution.split('|')[0]}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">{profile.httpStatusDistribution.split('|')[1] || 'Sain'}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1.5">
            <div>
              <span className="font-bold text-slate-900">Comportement sous stress : </span>
              <span className="text-slate-700">{profile.summary}</span>
            </div>
            <div>
              <span className="font-bold text-rose-800">Diagnostic d&apos;ingénierie : </span>
              <span className="text-slate-700">{profile.bottleneckAnalysis}</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Icon name="code" className="w-3.5 h-3.5 text-indigo-600" />
              <span>Pattern architectural recommandé :</span>
            </div>
            <CodeBlock code={profile.solutionArchitecture} language="typescript" />
          </div>
        </div>
      </section>

      {/* 6. Cas Réel Entreprise : La Panne Nationale de FlashDrop */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          6. Étude de Cas Réelle : La Panne en Cascade (Retry Storm) de FlashDrop
        </h2>
        <div className="border-2 border-rose-200 bg-rose-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-1 rounded-md">
              Incident Majeur en Cascade
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Interruption : 2h15</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>Le Déclencheur :</strong> Lors d&apos;une vente flash de baskets en édition limitée, la base de données PostgreSQL a connu un micro-ralentissement de 800 ms. L&apos;application mobile cliente, configurée avec un timeout agressif de 1 seconde et une politique de <strong>5 retries immédiats</strong> sans backoff exponentiel, a renvoyé 5 fois chaque requête échouée.
            </p>
            <p>
              <strong>Le Phénomène (Retry Storm) :</strong> Le volume de requêtes est instantanément passé de 2 000 RPS à 14 000 RPS en moins de 3 secondes. Les serveurs Node.js ont vu leur Event Loop se figer complètement. Même après la récupération de PostgreSQL, l&apos;avalanche de requêtes en attente a continué de saturer le réseau (Thundering Herd).
            </p>
            <p>
              <strong>Remédiation :</strong> Mise en place immédiate d&apos;un <strong>Circuit Breaker</strong> (bibliothèque Opossum) qui coupe les appels dès 50% d&apos;échecs, ajout d&apos;un <strong>Jitter + Backoff exponentiel</strong> sur les clients mobiles, et déploiement d&apos;un Rate Limiting strict au niveau de la passerelle Cloudflare.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Charge Serveur & Résilience (Chapitre 5.6)"
          questions={[
            {
              id: 1,
              question: "Pourquoi ajouter un processeur à 32 cœurs ne résout-il pas la saturation d'un serveur Node.js démarré avec la simple commande 'node server.js' ?",
              options: [
                "Parce que le système d'exploitation Windows bride systématiquement Node.js à 500 MHz.",
                "Parce que Node.js exécute le code JavaScript sur un thread unique par processus : sans mode cluster (PM2 ou multi-instances), il n'utilisera jamais qu'un seul cœur CPU.",
                "Parce que les câbles réseau Ethernet ne peuvent acheminer les données que vers un seul processeur à la fois.",
                "Parce que la licence Open Source de Node.js interdit le multi-cœur."
              ],
              correctIndex: 1,
              explanation: "Par conception, chaque instance de Node.js n'utilise qu'un seul thread pour l'Event Loop V8. Pour exploiter les 32 cœurs d'un serveur, vous devez démarrer 32 processus distincts coordonnés par un Load Balancer ou un gestionnaire de processus comme PM2.",
            },
            {
              id: 2,
              question: "Qu'est-ce qu'une tempête de réessais (Retry Storm) et comment provoque-t-elle un crash en cascade ?",
              options: [
                "Une attaque météorologique sur les câbles sous-marins de télécommunication.",
                "Lorsque des clients dont la requête a expiré réémettent tous immédiatement de nouvelles requêtes sans délai d'attente, multipliant la charge sur un serveur déjà agonisant jusqu'à son crash total.",
                "Une boucle infinie dans un composant React useEffect.",
                "Une tentative infructueuse de reconnexion au Wi-Fi."
              ],
              correctIndex: 1,
              explanation: "Si des milliers de clients réessaient immédiatement une requête dès qu'elle ralentit, le trafic est multiplié par 3 ou 5 pile au moment où le serveur avait besoin de souffler pour dépiler ses requêtes en cours.",
            },
            {
              id: 3,
              question: "Quel code de statut HTTP standard une API doit-elle renvoyer lorsqu'un client dépasse le quota de requêtes autorisé par le Rate Limiter ?",
              options: [
                "404 Not Found",
                "429 Too Many Requests",
                "500 Internal Server Error",
                "401 Unauthorized"
              ],
              correctIndex: 1,
              explanation: "Le code HTTP 429 Too Many Requests (RFC 6585) indique explicitement au client qu'il a dépassé sa limite de requêtes dans la fenêtre temporelle définie et qu'il doit attendre avant de réessayer (en-tête Retry-After).",
            },
            {
              id: 4,
              question: "Quel est l'avantage architectural déterminant d'une file d'attente asynchrone (ex: BullMQ + Redis) pour des traitements lourds (génération PDF, IA, envoi de mails) ?",
              options: [
                "Elle permet de ne plus payer d'hébergement serveur.",
                "Elle découple l'API web (qui répond immédiatement 202 Accepted) des Workers d'arrière-plan qui traitent les tâches à leur propre rythme sans saturer l'Event Loop.",
                "Elle crypte les disques durs contre les rançongiciels.",
                "Elle transforme le code JavaScript en binaire C++ compilé."
              ],
              correctIndex: 1,
              explanation: "La Message Queue transforme des pics de charge brutaux en un flux régulier et contrôlé. L'API ne subit aucun timeout HTTP car elle délègue immédiatement le travail aux workers en tâche de fond.",
            },
            {
              id: 5,
              question: "Que mesure précisément la métrique de latence P99 (99e percentile) lors d'un tir de charge avec Autocannon ?",
              options: [
                "La moyenne arithmétique de toutes les requêtes du test.",
                "Le seuil de temps sous lequel 99% des requêtes ont été traitées (et au-dessus duquel se trouvent les 1% de requêtes les plus lentes).",
                "Le pourcentage de requêtes qui ont échoué avec un code 500.",
                "La durée d'attente du signal de synchronisation NTP."
              ],
              correctIndex: 1,
              explanation: "Le percentile 99 (P99) isole les pires cas vécus par les utilisateurs (les 1% les plus malchanceux), ce que la moyenne arithmétique masque totalement en cas de micro-blocages occasionnels.",
            },
            {
              id: 6,
              question: "Comment le pattern 'Circuit Breaker' (Coupe-circuit) protège-t-il une architecture de microservices en cas de défaillance d'une dépendance ?",
              options: [
                "En coupant physiquement l'alimentation électrique du datacenter.",
                "En cessant temporairement d'appeler un service distant défaillant dès qu'un seuil d'erreurs est atteint, renvoyant un échec immédiat (fallback) sans engorger les threads du serveur appelant.",
                "En redémarrant le serveur toutes les 10 minutes.",
                "En doublant la taille du pool de connexions SQL."
              ],
              correctIndex: 1,
              explanation: "Comme un disjoncteur électrique, le Circuit Breaker 's'ouvre' dès que le service tiers échoue trop souvent, évitant que des centaines de requêtes ne restent suspendues en timeout et ne paralysent tout le système en cascade.",
            },
          ]}
        />
      </div>
    </div>
  );
};
