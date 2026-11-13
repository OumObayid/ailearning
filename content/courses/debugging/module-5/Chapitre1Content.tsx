'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type LatencyScenarioKey =
  | 'database_bottleneck'
  | 'cpu_event_loop_block'
  | 'network_transatlantic'
  | 'frontend_long_task';

interface LatencyScenario {
  title: string;
  badge: string;
  badgeColor: string;
  totalTimeMs: number;
  breakdown: { network: number; backend: number; database: number; clientDom: number };
  waterfallSymptom: string;
  rootCause: string;
  remedyAction: string[];
}

const LATENCY_SCENARIOS: Record<LatencyScenarioKey, LatencyScenario> = {
  database_bottleneck: {
    title: '1. Goulot Base de Données (Full Table Scan)',
    badge: 'TTFB Serveur Élevé',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    totalTimeMs: 1450,
    breakdown: { network: 35, backend: 15, database: 1380, clientDom: 20 },
    waterfallSymptom: 'Dans Chrome DevTools Network : barre "Waiting for server response (TTFB)" vert foncé étirée sur 1,4 seconde.',
    rootCause: 'La requête SQL SELECT * FROM orders WHERE customer_email = ? parcourt 800 000 lignes sur le disque sans index B-Tree.',
    remedyAction: [
      'Ajouter un index composite sur les colonnes filtrées : CREATE INDEX idx_orders_email ON orders(customer_email);',
      'Examiner le plan d\'exécution avec EXPLAIN pour passer du type ALL au type ref.',
      'Mettre en cache les résultats stables dans Redis pour éviter de solliciter MySQL à chaque requête.'
    ]
  },
  cpu_event_loop_block: {
    title: '2. Goulot CPU Node.js (Event Loop Saturée)',
    badge: 'Event Loop Freeze',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    totalTimeMs: 820,
    breakdown: { network: 25, backend: 760, database: 15, clientDom: 20 },
    waterfallSymptom: 'Le TTFB est catastrophique pour TOUS les clients simultanés, même ceux appelant des routes légères (/ping).',
    rootCause: 'Un traitement lourd et synchrone (hachage bcrypt avec 16 rounds ou JSON.parse d\'un fichier de 50 Mo) monopolise le thread principal.',
    remedyAction: [
      'Déporter les calculs intensifs vers des Worker Threads (piscina, worker_threads).',
      'Utiliser stream-json pour parser les flux volumineux sans saturer la boucle d\'événements.',
      'Surveiller la métrique monitorEventLoopDelay() pour alerter dès que le lag dépasse 20 ms.'
    ]
  },
  network_transatlantic: {
    title: '3. Goulot Réseau & Négociation TLS (Distance Géographique)',
    badge: 'Latence Réseau RTT',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    totalTimeMs: 640,
    breakdown: { network: 580, backend: 25, database: 15, clientDom: 20 },
    waterfallSymptom: 'Dans DevTools : barres "DNS Lookup" (120ms), "Initial Connection" (180ms) et "SSL" (280ms) occupent 90% du temps total.',
    rootCause: 'L\'utilisateur est à Singapour tandis que le serveur unique est hébergé en Virginie (USA). La vitesse de la lumière dans la fibre impose 4 allers-retours (RTT).',
    remedyAction: [
      'Déployer un CDN (Cloudflare, Fastly, CloudFront) avec terminaison TLS en bordure (Edge).',
      'Activer HTTP/3 (QUIC) pour réduire le handshake de connexion à 1 seul RTT.',
      'Activer les en-têtes HTTP Keep-Alive et le Connection Pooling pour réutiliser les sockets TLS existants.'
    ]
  },
  frontend_long_task: {
    title: '4. Goulot Rendu React (Long Task & Dom Bloquant)',
    badge: 'Long Task > 50ms',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    totalTimeMs: 950,
    breakdown: { network: 40, backend: 30, database: 20, clientDom: 860 },
    waterfallSymptom: 'Le réseau a fini en 90 ms mais l\'écran reste figé pendant près d\'une seconde avec une barre rouge "Long Task" dans DevTools Performance.',
    rootCause: 'Le composant React génère 5 000 éléments de liste DOM non virtualisés d\'un coup, bloquant le thread d\'affichage UI.',
    remedyAction: [
      'Mettre en œuvre la virtualisation de liste avec react-window ou @tanstack/react-virtual.',
      'Différer les calculs de filtrage secondaires avec useDeferredValue ou startTransition.',
      'Vérifier avec le profiler React DevTools les composants qui subissent des re-renders en cascade.'
    ]
  }
};

export const Chapitre1Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<LatencyScenarioKey>('database_bottleneck');
  const scenario = LATENCY_SCENARIOS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 5 • Chapitre 1 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Performance Engineering Foundations
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Comprendre les performances d&apos;une application : Métriques clés, percentiles P50/P95/P99, TTFB et Chrome DevTools
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          La performance logicielle s&apos;apparente au débit d&apos;un aqueduc industriel :
          si l&apos;eau coule au goutte-à-goutte au robinet de l&apos;utilisateur, le problème peut se situer au réservoir (MySQL),
          dans la turbine principale (l&apos;Event Loop Node.js), le réseau de canalisations (TCP/TLS) ou le mousseur du robinet (le moteur de rendu React).
          Diagnostiquer la performance consiste à <strong>mesurer le débit et la pression à chaque vanne</strong> sans jamais spéculer.
        </p>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Objectifs d&apos;apprentissage du chapitre
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Décomposer la trajectoire d&apos;une transaction en 4 compartiments : Réseau, Node.js, Base de données, Rendu client.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre pourquoi la moyenne arithmétique est trompeuse et maîtriser les percentiles P50, P95 et P99.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier et décoder le TTFB (Time to First Byte) dans l&apos;onglet Network de Chrome DevTools.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Traquer les Long Tasks (&gt; 50 ms) bloquantes avec le panneau Performance et instrumenter avec <code>Server-Timing</code>.</span>
          </li>
        </ul>
      </section>

      {/* 2. Trajectoire d'une transaction et 4 compartiments */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Trajectoire d&apos;exécution et localisation des lenteurs
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Lorsqu&apos;un utilisateur clique sur un bouton dans une application full-stack moderne,
          le temps perçu est la somme cumulée de 4 compartiments distincts :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-purple-700 tracking-wider">Étape 1</div>
            <div className="font-bold text-slate-950 text-sm">1. Réseau &amp; TLS</div>
            <p className="text-slate-600 leading-relaxed">
              Résolution DNS, Handshake TCP 3-way, négociation des clés TLS 1.3 et latence physique RTT liée à la distance.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-emerald-800 tracking-wider">Étape 2</div>
            <div className="font-bold text-emerald-950 text-sm">2. Node.js Backend</div>
            <p className="text-emerald-900 leading-relaxed">
              Disponibilité de l&apos;Event Loop, exécution des middlewares Express, validation Zod et sérialisation JSON.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-blue-300 bg-blue-50/50 shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-blue-800 tracking-wider">Étape 3</div>
            <div className="font-bold text-blue-950 text-sm">3. Base MySQL</div>
            <p className="text-blue-900 leading-relaxed">
              Attente d&apos;un socket disponible dans le pool, verrouillage de lignes, scan de table et lecture disque I/O.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50/50 shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-amber-800 tracking-wider">Étape 4</div>
            <div className="font-bold text-amber-950 text-sm">4. Rendu React</div>
            <p className="text-amber-900 leading-relaxed">
              Parsing du flux JSON, réconciliation du Virtual DOM, calculs de styles CSS, Layout et opérations de Paint.
            </p>
          </div>
        </div>

        <Callout type="warning" title="Règle d'or absolue de l'ingénieur de performance">
          <p className="text-xs sm:text-sm">
            <strong>&quot;Ne commencez jamais à optimiser avant d&apos;avoir mesuré.&quot;</strong>
            Passer deux jours à optimiser un composant React alors que 95% du temps est perdu dans un <code>SELECT</code> MySQL sans index
            est la marque d&apos;un développeur impulsif. Isolez d&apos;abord le compartiment coupable.
          </p>
        </Callout>
      </section>

      {/* 3. L'illusion de la moyenne : Les percentiles P50, P95, P99 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            L&apos;escroquerie statistique de la moyenne : La rigueur des Percentiles
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          En ingénierie de production, <strong>la moyenne arithmétique ne sert à rien</strong>.
          Imaginez un échantillon de 100 requêtes utilisateurs :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 space-y-2">
            <div className="font-bold text-rose-950 text-sm">Le piège de la Moyenne arithmétique (~150 ms)</div>
            <p className="text-xs text-rose-900 leading-relaxed">
              99 requêtes répondent en <strong>50 ms</strong> (ultra-rapide), mais 1 requête bloque pendant <strong>10 000 ms</strong> (10 secondes) suite à un verrou de transaction.
              La moyenne calculée affiche <code>(99 × 50 + 10000) / 100 = 149.5 ms</code>.
              Le tableau de bord est vert, alors qu&apos;un utilisateur sur 100 subit une expérience inadmissible.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 space-y-2">
            <div className="font-bold text-emerald-950 text-sm">La vérité révélée par les Percentiles</div>
            <ul className="text-xs text-emerald-950 space-y-1">
              <li>• <strong>P50 (Médiane) = 50 ms :</strong> 50% de vos utilisateurs bénéficient d&apos;une expérience instantanée.</li>
              <li>• <strong>P95 = 50 ms :</strong> 95% de la population est sous les 50 ms.</li>
              <li>• <strong>P99 = 10 000 ms :</strong> Alerte rouge immédiate ! La requête traînante est démasquée et isolée.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Chrome DevTools Performance & Network (Images préservées) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Inspection visuelle avec Chrome DevTools : Panneaux Performance et Network
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Les outils de profilage de Chrome permettent d&apos;ausculter l&apos;exécution avec une précision chirurgicale :
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Image 1 */}
          <div className="rounded-3xl border-2 border-slate-300 overflow-hidden bg-slate-950 p-3 sm:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="font-bold text-lime-400">Figure 6.1.A — Enregistrement DevTools Performance</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Flame Chart</span>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 flex justify-center p-2">
              <Image
                src="/images/cours/debugging/module-5/image1.jpeg"
                alt="Chrome DevTools Performance panel overview"
                width={1000}
                height={500}
                className="rounded-xl w-full h-auto object-contain max-h-[320px]"
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center italic">
              Vue d&apos;ensemble de la ligne temporelle : synchronisation des captures d&apos;écran avec les pics d&apos;activité CPU et les micro-tâches.
            </p>
          </div>

          {/* Image 2 */}
          <div className="rounded-3xl border-2 border-slate-300 overflow-hidden bg-slate-950 p-3 sm:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="font-bold text-rose-400">Figure 6.1.B — Détection des Long Tasks (&gt; 50 ms)</span>
              <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300">Alerte UI Freeze</span>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 flex justify-center p-2">
              <Image
                src="/images/cours/debugging/module-5/image2.jpeg"
                alt="Chrome DevTools Long Task timeline"
                width={1000}
                height={500}
                className="rounded-xl w-full h-auto object-contain max-h-[320px]"
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center italic">
              Les barres hachurées en rouge identifient les tâches JavaScript qui dépassent 50 ms et provoquent des blocages de l&apos;interface (Jank).
            </p>
          </div>
        </div>
      </section>

      {/* 5. Laboratoire Interactif : Simulateur de décomposition de latence */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Simulateur de Décomposition de Latence de Transaction
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Sélectionnez un profil de lenteur pour visualiser le segment incriminé sur la barre d&apos;exécution temporelle :
        </p>

        {/* Boutons Sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(Object.keys(LATENCY_SCENARIOS) as LatencyScenarioKey[]).map((key) => {
            const item = LATENCY_SCENARIOS[key];
            const isSelected = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`p-3 text-left rounded-xl border text-xs font-bold transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className={`text-[10px] px-1.5 py-0.5 rounded w-fit mb-1.5 ${
                  isSelected ? 'bg-lime-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 font-bold'
                }`}>
                  {item.badge}
                </span>
                <span className="truncate text-xs font-semibold leading-snug">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Panneau de détail */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-950">{scenario.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
              </div>
            </div>
            <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-300">
              Temps Total Perçu : <span className="text-rose-600 font-black">{scenario.totalTimeMs} ms</span>
            </div>
          </div>

          {/* Barre de répartition horizontale de latence */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Répartition des temps consommés :</span>
              <span className="font-mono text-slate-500">100% de la transaction</span>
            </div>

            <div className="h-7 w-full rounded-xl overflow-hidden flex font-mono text-[11px] font-bold text-white shadow-inner">
              <div
                style={{ width: `${(scenario.breakdown.network / scenario.totalTimeMs) * 100}%` }}
                className="bg-purple-600 flex items-center justify-center truncate px-1"
                title={`Réseau / TLS: ${scenario.breakdown.network}ms`}
              >
                {scenario.breakdown.network > 60 && `Réseau ${scenario.breakdown.network}ms`}
              </div>
              <div
                style={{ width: `${(scenario.breakdown.backend / scenario.totalTimeMs) * 100}%` }}
                className="bg-emerald-600 flex items-center justify-center truncate px-1"
                title={`Node.js: ${scenario.breakdown.backend}ms`}
              >
                {scenario.breakdown.backend > 60 && `Node.js ${scenario.breakdown.backend}ms`}
              </div>
              <div
                style={{ width: `${(scenario.breakdown.database / scenario.totalTimeMs) * 100}%` }}
                className="bg-blue-600 flex items-center justify-center truncate px-1"
                title={`MySQL: ${scenario.breakdown.database}ms`}
              >
                {scenario.breakdown.database > 60 && `MySQL ${scenario.breakdown.database}ms`}
              </div>
              <div
                style={{ width: `${(scenario.breakdown.clientDom / scenario.totalTimeMs) * 100}%` }}
                className="bg-amber-600 flex items-center justify-center truncate px-1"
                title={`React DOM: ${scenario.breakdown.clientDom}ms`}
              >
                {scenario.breakdown.clientDom > 60 && `React DOM ${scenario.breakdown.clientDom}ms`}
              </div>
            </div>

            {/* Légende */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold pt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-purple-600" />
                <span>Réseau / TLS ({scenario.breakdown.network} ms)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>Node.js CPU ({scenario.breakdown.backend} ms)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span>Base MySQL ({scenario.breakdown.database} ms)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-600" />
                <span>Rendu React ({scenario.breakdown.clientDom} ms)</span>
              </div>
            </div>
          </div>

          {/* Diagnostic et Symptôme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">Symptôme dans DevTools :</span>
              <p className="text-slate-700 leading-relaxed">{scenario.waterfallSymptom}</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
              <span className="font-bold text-rose-950 block uppercase tracking-wider text-[11px]">Cause Racine (RCA) :</span>
              <p className="text-rose-900 leading-relaxed">{scenario.rootCause}</p>
            </div>
          </div>

          {/* Actions correctives */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
              <span>Plan d&apos;Action Correctif Immédiat</span>
            </div>
            <ul className="text-xs text-slate-800 space-y-1">
              {scenario.remedyAction.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">▸</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. TP : Instrumentation Haute Précision avec Server-Timing */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            6
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Exposer les temps internes avec l&apos;en-tête Server-Timing
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          L&apos;en-tête standard W3C <code>Server-Timing</code> permet à votre serveur Express de transmettre
          la décomposition exacte de ses temps de calcul directement au navigateur.
          Chrome DevTools affiche alors ces barres dans son onglet Network sans avoir à ouvrir les logs du serveur :
        </p>

        <CodeBlock
          language="typescript"
          code={`import express, { Request, Response, NextFunction } from 'express';
import { performance } from 'node:perf_hooks';

const app = express();

// Middleware d'instrumentation de performance haute précision
app.use((req: Request, res: Response, next: NextFunction) => {
  const startTotal = performance.now();
  const timings: { name: string; dur: number; desc: string }[] = [];

  // Helper pour mesurer des blocs internes
  (req as any).measure = async <T>(name: string, desc: string, fn: () => Promise<T>): Promise<T> => {
    const start = performance.now();
    try {
      return await fn();
    } finally {
      timings.push({ name, dur: performance.now() - start, desc });
    }
  };

  res.on('finish', () => {
    const totalDuration = performance.now() - startTotal;
    timings.push({ name: 'total', dur: totalDuration, desc: 'Temps total Node.js' });

    // Formatage selon la spécification W3C : Server-Timing: db;dur=45.2;desc="MySQL", auth;dur=5.1
    const serverTimingHeader = timings
      .map(t => \`\${t.name};dur=\${t.dur.toFixed(1)};desc="\${t.desc}"\`)
      .join(', ');

    // Remarque : l'en-tête doit être défini avant d'envoyer la réponse
    console.log(\`[SERVER-TIMING] \${req.method} \${req.originalUrl} -> \${serverTimingHeader}\`);
  });

  next();
});

// Exemple dans une route de catalogue :
app.get('/api/v1/products', async (req, res) => {
  // Mesure isolée de la base de données :
  const products = await (req as any).measure('sql', 'Requête catalogue MySQL', async () => {
    return await db.query('SELECT * FROM products LIMIT 20');
  });

  res.setHeader('Server-Timing', 'sql;dur=12.4;desc="MySQL", render;dur=1.2');
  res.json(products);
});`}
        />
      </section>

      {/* 7. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            7
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 5.1
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Évaluez votre maîtrise des concepts de performance et du profilage d&apos;application :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'utilisation de la moyenne arithmétique pour mesurer le temps de réponse d'une API est-elle considérée comme une erreur critique en ingénierie de production ?",
              options: [
                "Parce que la moyenne arithmétique ne fonctionne qu'avec des nombres entiers.",
                "Parce que la moyenne masque les requêtes traînantes extrêmes (outliers) subies par un sous-ensemble d'utilisateurs, donnant une illusion de rapidité.",
                "Parce que les serveurs Linux refusent de calculer des moyennes.",
                "Parce que la moyenne est toujours égale au P50."
              ],
              correctIndex: 1,
              explanation: "Si 99 requêtes prennent 20 ms et une seule prend 10 secondes, la moyenne sera d'environ 120 ms, ce qui paraît acceptable sur un graphique alors qu'un utilisateur a attendu 10 secondes. Les percentiles P95 et P99 permettent d'isoler ces cas graves."
            },
            {
              id: 2,
              question: "Que mesure exactement le TTFB (Time to First Byte) dans l'onglet Network de Chrome DevTools ?",
              options: [
                "Le temps nécessaire pour télécharger le fichier image le plus lourd.",
                "Le délai écoulé entre l'émission de la requête HTTP par le navigateur et la réception du tout premier octet de réponse renvoyé par le serveur.",
                "Le temps de compilation du code JavaScript par le moteur V8.",
                "La vitesse de rotation du disque dur du client."
              ],
              correctIndex: 1,
              explanation: "Le TTFB englobe la latence réseau aller, le temps de traitement interne du serveur backend (Node.js + requêtes SQL) et le retour du premier paquet TCP. Un TTFB élevé pointe généralement vers un goulot serveur (BDD ou calcul)."
            },
            {
              id: 3,
              question: "Dans le panneau Performance de Chrome DevTools, qu'indique un bloc hachuré en rouge désigné comme 'Long Task' ?",
              options: [
                "Une erreur de syntaxe HTML.",
                "Une tâche d'exécution JavaScript qui a monopolisé le thread principal du navigateur pendant plus de 50 millisecondes, figeant temporairement l'interface utilisateur.",
                "Une défaillance de la batterie de l'ordinateur.",
                "Une attaque par déni de service."
              ],
              correctIndex: 1,
              explanation: "Le standard W3C définit une 'Long Task' comme toute exécution de script dépassant 50 ms. Durant cet intervalle, le navigateur ne peut ni traiter les clics, ni scroller, ni rafraîchir l'écran à 60 images par seconde (Jank)."
            },
            {
              id: 4,
              question: "Quel composant d'une architecture full-stack est le plus susceptible de provoquer un pic soudain de latence sur le 99e percentile (P99) sous forte charge ?",
              options: [
                "Le câble HDMI de l'écran.",
                "Une requête SQL effectuant un scan complet de table (type ALL) ou un verrouillage de ligne concurrentiel dans MySQL.",
                "Le fichier favicon.ico.",
                "La version du compilateur TypeScript."
              ],
              correctIndex: 1,
              explanation: "Les requêtes de base de données non indexées ou les contentions de verrous (deadlocks/row locks) explosent de manière exponentielle dès que la concurrence augmente, créant les requêtes traînantes qui dégradent le P99."
            },
            {
              id: 5,
              question: "À quoi sert l'en-tête HTTP standardisé 'Server-Timing' (ex: Server-Timing: db;dur=120) ?",
              options: [
                "À régler l'horloge interne de l'ordinateur client.",
                "À communiquer au navigateur la décomposition des temps passés sur le backend (BDD, auth, cache) afin de les afficher directement dans l'inspecteur réseau de DevTools.",
                "À planifier un redémarrage du serveur à une heure précise.",
                "À limiter le temps de session d'un utilisateur."
              ],
              correctIndex: 1,
              explanation: "L'en-tête W3C Server-Timing permet au frontend et aux profilers DevTools de lire la durée des segments serveur sans avoir besoin d'accéder aux logs privés du backend."
            },
            {
              id: 6,
              question: "Si l'Event Loop de Node.js est bloquée par un calcul lourd de 800 ms, quel impact cela a-t-il sur les autres utilisateurs du site ?",
              options: [
                "Aucun impact, Node.js exécute chaque requête dans un thread CPU indépendant.",
                "Toutes les autres requêtes arrivant pendant ces 800 ms sont gelées en attente, car Node.js traite l'Event Loop sur un thread JavaScript unique.",
                "Les autres requêtes sont automatiquement redirigées vers Google.",
                "Le serveur supprime les données de session des autres utilisateurs."
              ],
              correctIndex: 1,
              explanation: "Node.js est mono-thread pour l'exécution du code JavaScript. Bloquer l'Event Loop par un calcul synchrone suspend l'ensemble du trafic du serveur pour tous les clients connectés pendant cette durée."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre1Content;
