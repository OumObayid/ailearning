'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type GoldenSignalKey = 'nominal_traffic' | 'db_latency_spike' | 'error_5xx_storm' | 'memory_saturation';

interface TelemetryState {
  title: string;
  badge: string;
  badgeColor: string;
  p95LatencyMs: number;
  trafficRps: number;
  errorRatePercent: number;
  saturationCpuMem: number;
  healthStatus: 'HEALTHY' | 'LATENCY_DEGRADED' | 'HIGH_ERROR_RATE' | 'CRITICAL_OOM_RISK';
  diagnosis: string;
  alertManagerAction: string;
}

const TELEMETRY_STATES: Record<GoldenSignalKey, TelemetryState> = {
  nominal_traffic: {
    title: '1. Régime Nominal (SLA Respecté & Performance Idéale)',
    badge: 'Système Sain (Tous Voyants Verts)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    p95LatencyMs: 24,
    trafficRps: 1450,
    errorRatePercent: 0.02,
    saturationCpuMem: 34,
    healthStatus: 'HEALTHY',
    diagnosis: 'Les 4 Golden Signals sont parfaitement équilibrés. La latence P95 reste bien en-deçà du seuil critique de 200 ms et le taux d\'erreur 5xx est quasi-nul.',
    alertManagerAction: 'Aucune alerte. Métriques exportées vers Prometheus toutes les 15 secondes pour archivage.',
  },
  db_latency_spike: {
    title: '2. Dégradation de Latence (Goulot d\'Étranglement Base de Données)',
    badge: 'Alerte Latence (P95 > 2 500 ms)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    p95LatencyMs: 2850,
    trafficRps: 820,
    errorRatePercent: 1.4,
    saturationCpuMem: 68,
    healthStatus: 'LATENCY_DEGRADED',
    diagnosis: 'Le temps de réponse P95 s\'est effondré à 2,8 secondes suite à un Full Table Scan sur une table de commandes sans index. Le débit chute car les connexions restent bloquées.',
    alertManagerAction: 'Alerte Slack P2 : "HighLatencyAlert : route /api/orders p95 > 2s pendant 3 minutes consécutives". Déclenchement de l\'auto-scaling préventif.',
  },
  error_5xx_storm: {
    title: '3. Tempête d\'Erreurs 5xx (Microservice Tiers en Défaillance)',
    badge: 'Violation Error Budget (14.2% 5xx)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    p95LatencyMs: 85,
    trafficRps: 1200,
    errorRatePercent: 14.2,
    saturationCpuMem: 45,
    healthStatus: 'HIGH_ERROR_RATE',
    diagnosis: 'Une passerelle de paiement tierce renvoie des erreurs 500 en rafale. L\'API Node.js échoue rapidement (Fast Fail), ce qui maintient une latence basse mais détruit le taux de succès.',
    alertManagerAction: 'Alerte PagerDuty P1 : "ErrorBudgetExhausted : Taux de 5xx > 5%". Activation automatique du Circuit Breaker pour isoler le service défaillant.',
  },
  memory_saturation: {
    title: '4. Saturation Mémoire Critique (Risque OOMKilled Imminent)',
    badge: 'Alerte Mémoire (94% RAM)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    p95LatencyMs: 640,
    trafficRps: 450,
    errorRatePercent: 5.8,
    saturationCpuMem: 94,
    healthStatus: 'CRITICAL_OOM_RISK',
    diagnosis: 'La mémoire RAM du conteneur atteint 94% de sa limite Kubernetes (1,88 Go / 2 Go). Le Garbage Collector V8 tourne à plein régime, volant 60% du temps CPU.',
    alertManagerAction: 'Alerte Critique SOC : "PodMemoryThreshold90 : Risque de crash SIGKILL imminent". Capture automatique d\'un Heap Snapshot avant redémarrage.',
  },
};

export const Chapitre12Content: React.FC = () => {
  const [selectedSignalKey, setSelectedSignalKey] = useState<GoldenSignalKey>('nominal_traffic');
  const signal = TELEMETRY_STATES[selectedSignalKey];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="activity" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 12 — Observabilité, Surveillance & Prévention Proactive (Prometheus & Grafana)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Maîtriser les 3 piliers (Metrics, Logs, Traces), instrumenter une API Express avec <code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">prom-client</code>, surveiller les 4 Golden Signals de Google SRE et concevoir des alertes prédictives sans fatigue cognitive.
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
            <span>Comprendre les 3 piliers de l&apos;observabilité moderne : Métriques, Journaux et Traces distribuées.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Surveiller les 4 Golden Signals SRE : Latence, Trafic (RPS), Taux d&apos;erreurs et Saturation.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Exposer des métriques Prometheus natives dans Node.js avec <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">prom-client</code> sur <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">/metrics</code>.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Définir des politiques d&apos;alerting prédictives évitant la fatigue d&apos;alerte (Alert Fatigue).</span>
          </div>
        </div>
      </section>

      {/* 1. Les Trois Piliers de l'Observabilité */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-indigo-600" />
          1. Les Trois Piliers de l&apos;Observabilité Moderne
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Le monitoring classique se contentait de vérifier si un port réseau était ouvert. 
          L&apos;<strong>Observabilité</strong> moderne permet de déduire l&apos;état interne d&apos;un système complexe à partir de ses données télémétriques externes réparties en 3 piliers complémentaires :
        </p>

        {/* Figure 6.12.A - Preserving image18.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image18.jpeg"
              alt="Les trois piliers fondamentaux de l'observabilité : Métriques, Logs et Traces distribuées (Figure 6.12.A)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 6.12.A — Les trois piliers de l&apos;observabilité : Corrélation entre Métriques numériques, Journaux textuels et Traces d&apos;exécution.
          </div>
        </div>

        {/* Figures 6.12.B, C - Preserving image16.jpeg (Metrics) and image19.jpeg (Logs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="border border-slate-200 rounded-2xl bg-white p-4 shadow-xs flex flex-col justify-between">
            <div className="relative w-full h-56 sm:h-64">
              <Image
                src="/images/cours/debugging/module-5/image16.jpeg"
                alt="Tableau de bord de métriques temporelles avec graphiques CPU, requêtes par seconde et mémoire (Figure 6.12.B)"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 text-center text-xs font-bold text-slate-700">
              Figure 6.12.B — Métriques (Metrics) : Séries temporelles numériques (Prometheus / Grafana).
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl bg-white p-4 shadow-xs flex flex-col justify-between">
            <div className="relative w-full h-56 sm:h-64">
              <Image
                src="/images/cours/debugging/module-5/image19.jpeg"
                alt="Exploration de journaux textuels d'événements et stack traces d'erreurs (Figure 6.12.C)"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 text-center text-xs font-bold text-slate-700">
              Figure 6.12.C — Journaux (Logs) : Enregistrement textuel granulaire d&apos;événements (Loki / ELK).
            </div>
          </div>
        </div>
      </section>

      {/* 2. Les Outils Majeurs de l'Observabilité */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="tool" className="w-5 h-5 text-emerald-600" />
          2. L&apos;Écosystème des Outils de Surveillance
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          L&apos;industrie cloud s&apos;est standardisée autour de solutions spécialisées hautement performantes :
        </p>

        {/* Figures 6.12.D, E, F - Preserving image20, image21, image22 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border border-slate-200 rounded-2xl bg-white p-3 shadow-xs flex flex-col justify-between">
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src="/images/cours/debugging/module-5/image20.jpeg"
                alt="Tableau de bord de requêtes et métriques Prometheus (Figure 6.12.D)"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 text-center text-xs font-bold text-slate-700">
              Figure 6.12.D — Prometheus : Base de données de séries temporelles et moteur de scraping.
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl bg-white p-3 shadow-xs flex flex-col justify-between">
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src="/images/cours/debugging/module-5/image21.jpeg"
                alt="Tableaux de bord visuels et graphiques dans Grafana (Figure 6.12.E)"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 text-center text-xs font-bold text-slate-700">
              Figure 6.12.E — Grafana : Plateforme de visualisation unifiée de métriques et traces.
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl bg-white p-3 shadow-xs flex flex-col justify-between">
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src="/images/cours/debugging/module-5/image22.jpeg"
                alt="Outils de surveillance d'erreurs et de disponibilité : Sentry, OpenTelemetry, Uptime Kuma (Figure 6.12.F)"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 text-center text-xs font-bold text-slate-700">
              Figure 6.12.F — Suites Spécialisées : Sentry (Erreurs), OpenTelemetry (Traces) et Uptime Kuma (Sonde externe).
            </div>
          </div>
        </div>
      </section>

      {/* 3. Instrumenter Node.js avec prom-client */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-indigo-600" />
          3. Implémenter l&apos;Exportateur de Métriques Prometheus avec prom-client
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Prometheus fonctionne sur un <strong>modèle Pull</strong> : il interroge périodiquement chaque instance de votre application via une requête HTTP sur <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">GET /metrics</code>. 
          Voici l&apos;implémentation standard en Node.js Express :
        </p>

        <CodeBlock
          code={`import express from 'express';
import client from 'prom-client';

const app = express();

// 1. Collecte automatique des métriques système Node.js (CPU, Heap, Event Loop Lag, GC)
client.collectDefaultMetrics({ prefix: 'nodejs_app_' });

// 2. Compteur du nombre total de requêtes HTTP
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP reçues',
  labelNames: ['method', 'route', 'status_code']
});

// 3. Histogramme de la latence des requêtes (en secondes)
const httpRequestDurationHistogram = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durée d\\'exécution des requêtes HTTP en secondes',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5] // Buckets pour calcul précis des P50, P95, P99
});

// Middleware d'interception télémétrique
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationInSeconds = seconds + nanoseconds / 1e9;
    const route = req.route ? req.route.path : req.path;

    httpRequestCounter.inc({ method: req.method, route, status_code: res.statusCode });
    httpRequestDurationHistogram.observe({ method: req.method, route, status_code: res.statusCode }, durationInSeconds);
  });
  next();
});

// Endpoint exposé au scraper Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});`}
          language="typescript"
        />

        <Callout type="tip" title="Sécurité de l'endpoint /metrics">
          <p className="text-xs sm:text-sm">
            L&apos;endpoint <code className="font-mono text-xs font-bold text-slate-900">/metrics</code> ne doit jamais être exposé publiquement sur Internet sans protection. 
            Configurez votre reverse proxy Nginx pour n&apos;autoriser l&apos;accès à <code className="font-mono text-xs font-bold text-slate-900">/metrics</code> que depuis l&apos;adresse IP interne du serveur Prometheus ou via un token d&apos;authentification basique.
          </p>
        </Callout>
      </section>

      {/* 4. Simulateur Interactif : ObservabilityDashboardSimulator */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          4. Simulateur Interactif : Tableau de Bord SRE & Détection d&apos;Anomalies
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Observez en direct les 4 Golden Signals de Google SRE (Latence, Trafic, Erreurs et Saturation) et l&apos;action de remédiation automatisée :
        </p>

        {/* Boutons sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(TELEMETRY_STATES) as GoldenSignalKey[]).map((key) => {
            const sc = TELEMETRY_STATES[key];
            const isSelected = selectedSignalKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedSignalKey(key)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-lime-500 bg-lime-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${sc.badgeColor} inline-block mb-1`}>
                    {sc.badge}
                  </span>
                  <div className="text-xs font-bold text-slate-950 leading-tight">
                    {sc.title.split('(')[0]}
                  </div>
                </div>
                <div className="mt-2 text-[11px] font-mono text-slate-600">
                  P95: {sc.p95LatencyMs} ms | Erreurs: {sc.errorRatePercent}%
                </div>
              </button>
            );
          })}
        </div>

        {/* Panneau de télémétrie Grafana-style */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Télémétrie en Temps Réel (4 Golden Signals SRE)</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{signal.title}</h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${signal.badgeColor}`}>
              État : {signal.healthStatus}
            </span>
          </div>

          {/* Jauges télémétriques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">1. Latence P95</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${signal.p95LatencyMs > 1000 ? 'text-rose-600' : signal.p95LatencyMs > 200 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {signal.p95LatencyMs} ms
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">SLA &lt; 200 ms</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">2. Trafic (RPS)</div>
              <div className="text-lg sm:text-xl font-mono font-black text-slate-900">
                {signal.trafficRps} req/s
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Débit serveur actif</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">3. Taux d&apos;Erreurs 5xx</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${signal.errorRatePercent > 5 ? 'text-rose-600' : signal.errorRatePercent > 1 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {signal.errorRatePercent}%
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Seuil alerte: &gt; 1%</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">4. Saturation CPU/RAM</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${signal.saturationCpuMem > 90 ? 'text-rose-600' : signal.saturationCpuMem > 70 ? 'text-amber-600' : 'text-slate-900'}`}>
                {signal.saturationCpuMem}%
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full ${signal.saturationCpuMem > 90 ? 'bg-rose-500' : signal.saturationCpuMem > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${signal.saturationCpuMem}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
            <div>
              <span className="font-bold text-slate-900">Diagnostic SRE : </span>
              <span className="text-slate-700">{signal.diagnosis}</span>
            </div>
            <div>
              <span className="font-bold text-indigo-900">Déclencheur Alertmanager / Action : </span>
              <span className="font-mono text-xs text-indigo-800 font-semibold">{signal.alertManagerAction}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Cas Réel Entreprise : L'Alerte Prédictive Sauveuse */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          5. Étude de Cas Réelle : L&apos;Alerte Prédictive chez BourseDirect Cloud
        </h2>
        <div className="border-2 border-emerald-200 bg-emerald-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-2.5 py-1 rounded-md">
              Incident Majeur Évité avec Succès
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Gain estimé : 1,2 M€</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>Le Contexte :</strong> Lors de l&apos;ouverture des marchés financiers à 09h00, l&apos;afflux d&apos;ordres de bourse a commencé à saturer le pool de connexions MySQL de l&apos;API de trading.
            </p>
            <p>
              <strong>L&apos;Alerte Prédictive Prometheus :</strong> Plutôt que d&apos;attendre que le pool soit saturé à 100% (moment où les utilisateurs auraient commencé à voir des erreurs 500), une règle Prometheus surveillait le ratio : <br />
              <code className="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded font-mono text-xs">
                (mysql_global_status_threads_connected / mysql_global_variables_max_connections) &gt; 0.85
              </code> pendant plus de 60 secondes.
            </p>
            <p>
              <strong>L&apos;Intervention Automatisée :</strong> L&apos;alerte a déclenché en amont le déploiement de 4 répliques de lecture MySQL supplémentaires (Read Replicas) et a dérouté automatiquement 70% des requêtes de consultation vers ces répliques. 
              Résultat : <strong>zéro interruption de service</strong>, zéro ordre perdu et les traders n&apos;ont perçu aucun ralentissement.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Observabilité & Surveillance (Chapitre 5.12)"
          questions={[
            {
              id: 1,
              question: "Quels sont les trois piliers fondamentaux de l'observabilité logicielle moderne ?",
              options: [
                "HTML, CSS et JavaScript.",
                "Métriques (Metrics), Journaux (Logs) et Traces distribuées (Traces).",
                "Frontend, Backend et Base de données.",
                "CPU, RAM et Disque dur."
              ],
              correctIndex: 1,
              explanation: "Les métriques donnent la vision quantitative chiffrée (combien/quand), les logs fournissent le contexte granulaire textuel (pourquoi), et les traces distribuées suivent le parcours d'une requête à travers l'infrastructure (où).",
            },
            {
              id: 2,
              question: "Quels sont les 4 signaux dorés (Four Golden Signals) définis par Google SRE pour surveiller un service en production ?",
              options: [
                "Vitesse du ventilateur, Température, Humidité et Poussière.",
                "Latence, Trafic (RPS), Taux d'erreurs et Saturation.",
                "Nombre d'abonnés, Chiffre d'affaires, Clics et Likes.",
                "Version de Node.js, Port TCP, Système d'exploitation et Langue."
              ],
              correctIndex: 1,
              explanation: "Les 4 Golden Signals résument parfaitement la santé d'un service orienté utilisateur : la latence vécue, la charge reçue, la proportion d'échecs et l'épuisement des capacités matérielles.",
            },
            {
              id: 3,
              question: "Pourquoi utilise-t-on un 'Histogram' plutôt qu'un simple 'Gauge' pour mesurer la latence des requêtes dans Prometheus ?",
              options: [
                "Parce qu'un Histogramme est plus joli à afficher sur un écran 4K.",
                "Parce qu'un histogramme répartit les durées dans des plages prédéfinies (buckets), permettant à Prometheus de calculer fidèlement les percentiles P50, P90 et P99 sans être faussé par les moyennes arithmétiques.",
                "Parce que les jauges (Gauges) sont interdites en production.",
                "Parce que l'histogramme supprime automatiquement les requêtes lentes."
              ],
              correctIndex: 1,
              explanation: "Une moyenne arithmétique masque les anomalies extrêmes. Les histogrammes à buckets permettent à la fonction PromQL 'histogram_quantile()' d'extraire la latence P99 subie par les utilisateurs.",
            },
            {
              id: 4,
              question: "Qu'est-ce que le phénomène de 'Fatigue d'Alerte' (Alert Fatigue) et comment l'éviter ?",
              options: [
                "La fatigue physique des serveurs qui chauffent la nuit.",
                "L'état où les ingénieurs reçoivent tellement de fausses alertes ou de notifications non critiques qu'ils finissent par ignorer tous les avertissements, y compris les véritables pannes majeures.",
                "Une panne de batterie sur le smartphone de l'administrateur système.",
                "L'épuisement du quota de SMS mensuels."
              ],
              correctIndex: 1,
              explanation: "Une alerte ne doit se déclencher que si une action humaine immédiate est requise pour préserver le service utilisateur. Tout le reste relève du tableau de bord consultatif.",
            },
            {
              id: 5,
              question: "Comment le serveur Prometheus collecte-t-il les métriques de votre application Node.js ?",
              options: [
                "Votre application Node.js envoie des e-mails à Prometheus toutes les heures.",
                "Prometheus interroge périodiquement (scraping HTTP GET) l'endpoint '/metrics' exposé par prom-client sur votre application.",
                "Prometheus lit directement la mémoire vive du processeur via un câble spécial.",
                "Prometheus analyse le code source sur GitHub."
              ],
              correctIndex: 1,
              explanation: "Prometheus utilise une architecture 'Pull' : son moteur de collecte exécute des requêtes HTTP régulières vers les endpoints `/metrics` déclarés dans son fichier de configuration.",
            },
            {
              id: 6,
              question: "Pourquoi est-il primordial de tester régulièrement la restauration réelle des sauvegardes de base de données (Disaster Recovery) ?",
              options: [
                "Pour accélérer les requêtes SQL SELECT.",
                "Parce qu'une sauvegarde dont la procédure de restauration n'a jamais été testée avec succès en conditions réelles ne constitue pas une sauvegarde, mais un simple espoir qui risque d'échouer lors d'une crise.",
                "Pour libérer de l'espace disque sur le serveur primaire.",
                "Pour réinitialiser les identifiants administrateurs."
              ],
              correctIndex: 1,
              explanation: "D'innombrables entreprises ont découvert lors d'un sinistre que leurs fichiers de backup étaient corrompus, incomplets ou incompatibles avec la version du moteur de stockage, rendant la restauration impossible.",
            },
          ]}
        />
      </div>
    </div>
  );
};
