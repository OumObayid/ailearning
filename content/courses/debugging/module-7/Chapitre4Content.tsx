'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface LogEntry {
  id: string;
  correlationId: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  component: 'FRONTEND' | 'API_GATEWAY' | 'ORDER_SERVICE' | 'MYSQL_DB' | 'GEMINI_AI';
  message: string;
  metadata?: Record<string, unknown>;
}

const CAPSTONE_LOG_STREAM: LogEntry[] = [
  {
    id: 'l1',
    correlationId: 'req-98b1-42fa',
    timestamp: '2026-11-09T08:14:22.104Z',
    level: 'info',
    component: 'FRONTEND',
    message: 'Soumission du formulaire de commande par l\'utilisateur',
    metadata: { userId: 42, orderItemsCount: 3 }
  },
  {
    id: 'l2',
    correlationId: 'req-98b1-42fa',
    timestamp: '2026-11-09T08:14:22.128Z',
    level: 'info',
    component: 'API_GATEWAY',
    message: 'POST /api/orders reçu avec Authorization Bearer',
    metadata: { ip: '192.168.1.45', userAgent: 'Chrome/131.0' }
  },
  {
    id: 'l3',
    correlationId: 'req-98b1-42fa',
    timestamp: '2026-11-09T08:14:22.135Z',
    level: 'debug',
    component: 'ORDER_SERVICE',
    message: 'Acquisition d\'une connexion dans le pool MySQL',
    metadata: { poolActive: 39, poolMax: 40 }
  },
  {
    id: 'l4',
    correlationId: 'req-98b1-42fa',
    timestamp: '2026-11-09T08:14:22.190Z',
    level: 'warn',
    component: 'MYSQL_DB',
    message: 'Slow query détectée sur table orders : table scan complet sans index',
    metadata: { durationMs: 1420, query: 'SELECT * FROM orders WHERE tenant_id = 14' }
  },
  {
    id: 'l5',
    correlationId: 'req-98b1-42fa',
    timestamp: '2026-11-09T08:14:24.210Z',
    level: 'error',
    component: 'ORDER_SERVICE',
    message: 'Échec de transaction : connection pool timeout après 2000ms',
    metadata: {
      error: 'TimeoutError: ResourceRequest timed out',
      stack: 'at Pool.acquireConnection (src/backend/config/database.ts:44:11)'
    }
  },
  {
    id: 'l6',
    correlationId: 'req-98b1-42fa',
    timestamp: '2026-11-09T08:14:24.215Z',
    level: 'error',
    component: 'API_GATEWAY',
    message: 'Réponse HTTP 504 renvoyée au client',
    metadata: { status: 504, latencyTotalMs: 2087 }
  }
];

export const Chapitre4Content: React.FC = () => {
  const [selectedCorrelationId, setSelectedCorrelationId] = useState<string>('req-98b1-42fa');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const filteredLogs = CAPSTONE_LOG_STREAM.filter((log) => {
    const matchesCorr = selectedCorrelationId === 'ALL' || log.correlationId === selectedCorrelationId;
    const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel;
    return matchesCorr && matchesLevel;
  });

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.4</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Collecte, Traçabilité et Analyse des Logs Multicouches
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Le <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-mono">console.log()</code> informel est l&apos;ennemi juré du débogage d&apos;entreprise. Apprenez à exploiter la journalisation structurée JSON (Pino), à propager les <strong>Correlation IDs</strong> à travers toutes vos couches et à isoler les anomalies dans les Slow Query Logs MySQL et les stack traces V8.
        </p>
      </div>

      {/* Section 1: Journalisation Structurée vs Logs Informels */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Standard d&apos;Observabilité</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. De la chaîne de caractères brute au document JSON structuré
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans un environnement cloud ou conteneurisé (Docker / Kubernetes), les logs sont ingérés par des agrégateurs (Datadog, Grafana Loki, CloudWatch). Un message texte informe est impossible à filtrer ou à indexer par machine :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs">
            <div className="text-xs font-bold text-rose-700 uppercase mb-2">❌ Journalisation artisanale (Anti-pattern)</div>
            <CodeBlock language="typescript">{`// console.log informel et non parsable
console.log("Erreur commande pour l'utilisateur " + userId + " : " + err.message);
// Sortie console :
// "Erreur commande pour l'utilisateur 42 : Pool is closed"`}</CodeBlock>
            <p className="text-xs text-rose-800 mt-2">
              Impossible à requêter par gravité, sans timestamp standardisé, sans stack trace exploitable.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs">
            <div className="text-xs font-bold text-emerald-700 uppercase mb-2"> Journalisation structurée JSON (Pino)</div>
            <CodeBlock language="typescript">{`logger.error({
  reqId: req.id,
  userId: user.id,
  orderId: order.id,
  err: error
}, "Échec de création de transaction bancaire");`}</CodeBlock>
            <p className="text-xs text-emerald-800 mt-2">
              Indexation immédiate de chaque clé (<code className="text-xs font-mono">reqId</code>, <code className="text-xs font-mono">userId</code>) avec niveau de log strict.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Le Correlation ID (Traçabilité Distribuée) */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Fil d&apos;Ariane Technique</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Le Request/Correlation ID : un fil conducteur universel
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Lorsqu&apos;une application reçoit 2 000 requêtes par minute, retrouver les logs d&apos;une transaction échouée relève de l&apos;impossible sans <strong>Correlation ID</strong>. Ce jeton unique (ex: UUID v4) est généré dès l&apos;entrée de la requête et propagé dans chaque couche :
        </p>

        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs shadow-md">
          <div className="text-emerald-400 font-bold mb-2">{`// Propagation du Correlation ID dans l'API Express :`}</div>
          <CodeBlock language="typescript">{`import crypto from 'node:crypto';

export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const correlationId = (req.headers['x-correlation-id'] as string) || crypto.randomUUID();
  req.id = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);
  req.log = logger.child({ correlationId }); // Logger dédié avec contexte automatique
  next();
}`}</CodeBlock>
        </div>

        <Callout type="info" title="L'anonymisation des secrets dans les logs (Data Redaction)">
          N&apos;enregistrez jamais de mots de passe, tokens JWT ou numéros de cartes bancaires dans vos journaux. Configurez Pino avec la clause <code className="text-xs font-mono bg-white px-1 py-0.5 rounded border border-slate-200">redact: [&apos;req.headers.authorization&apos;, &apos;password&apos;, &apos;creditCard&apos;]</code> pour masquer automatiquement ces données sensibles sous la chaîne <code className="text-xs font-mono">[REDACTED]</code>.
        </Callout>
      </section>

      {/* Section 3: Simulateur Interactif - Reconstitution de Trace */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Banc d&apos;Investigation Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier : Reconstituer le Parcours d&apos;une Requête Échouée (Log Trace Viewer)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Voici le journal d&apos;événements réel capturé lors d&apos;un crash de commande dans le projet Capstone. Observez comment le Correlation ID <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono font-bold text-slate-900">req-98b1-42fa</code> permet de reconstituer toute la chaîne de causalité entre React, Express, MySQL et le pool de connexions :
        </p>

        {/* Contrôles de filtre */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Filtrer par sévérité :</span>
            {['ALL', 'info', 'warn', 'error'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterLevel === lvl
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {lvl.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Tracer :</span>
            {['req-98b1-42fa', 'ALL'].map((id) => (
              <button
                key={id}
                onClick={() => setSelectedCorrelationId(id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedCorrelationId === id
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Visualiseur de logs */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 text-white overflow-hidden shadow-lg">
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs font-mono border-b border-slate-800">
            <span className="text-slate-400">Journal d&apos;audit distribué ({filteredLogs.length} événements)</span>
            <span className="text-emerald-400 font-bold">STREAM LIVE</span>
          </div>

          <div className="divide-y divide-slate-900 p-3 space-y-2">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-900/60 font-mono text-xs space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      log.level === 'error'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : log.level === 'warn'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : log.level === 'info'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-emerald-400 font-bold">[{log.component}]</span>
                    <span className="text-slate-200">{log.message}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{log.timestamp.slice(11, 23)}</span>
                </div>

                {log.metadata && (
                  <div className="p-2 rounded bg-black/50 text-[11px] text-slate-400 overflow-x-auto">
                    {JSON.stringify(log.metadata)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Validation des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Quiz : Collecte et analyse des logs en production
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.4 — Traçabilité, Structured Logging et Analyse de Traces"
          questions={[
            {
              id: 1,
              question: "Pourquoi les loggers structurés JSON (comme Pino ou Winston) sont-ils indispensables dans les architectures Node.js d'entreprise ?",
              options: [
                "Parce qu'ils prennent moins de place sur l'écran des développeurs.",
                "Parce qu'ils sérialisent chaque événement en objet JSON indexable par les outils d'observabilité (Datadog, Loki, Elastic), permettant des filtres instantanés par statut, identifiant et temps de réponse.",
                "Parce que Node.js interdit formellement l'utilisation de console.log() en production.",
                "Pour forcer le formatage automatique avec Prettier."
              ],
              correctIndex: 1,
              explanation: "Les logs JSON permettent aux moteurs d'agrégation d'indexer chaque métadonnée (durée, ID utilisateur, code HTTP) pour des analyses et des alertes automatiques à grande échelle."
            },
            {
              id: 2,
              question: "À quoi sert principalement un Request ID / Correlation ID transmis dans l'en-tête 'X-Correlation-ID' ?",
              options: [
                "À vérifier si l'utilisateur a payé son abonnement mensuel.",
                "À relier de manière univoque l'ensemble des journaux générés par une même transaction à travers les différentes couches (React, API Gateway, microservices, base de données).",
                "À accélérer la vitesse de calcul des requêtes MySQL.",
                "À compresser les paquets réseau en format gzip."
              ],
              correctIndex: 1,
              explanation: "Le Correlation ID est le fil d'Ariane : parmi des millions de logs mélangés, il permet d'isoler en une fraction de seconde la trajectoire exacte d'une requête spécifique."
            },
            {
              id: 3,
              question: "Quelle configuration est indispensable pour respecter le RGPD et la sécurité des données lors de la journalisation des requêtes HTTP ?",
              options: [
                "La suppression des logs toutes les 3 secondes.",
                "Le masquage automatique (Data Redaction) des données sensibles et secrets (Authorization Bearer, mots de passe, numéros de cartes) avant l'écriture des logs.",
                "L'obligation de traduire tous les logs en anglais.",
                "L'arrêt du serveur pendant les heures de nuit."
              ],
              correctIndex: 1,
              explanation: "Les journaux d'application ne doivent jamais contenir de credentials ou de données à caractère personnel non masquées, sous peine de fuite critique de données."
            },
            {
              id: 4,
              question: "Quel outil de télémétrie de base de données permet d'identifier précisément les requêtes SQL responsables de latences élevées ou d'absences d'index ?",
              options: [
                "Le Slow Query Log de MySQL (avec configuration de 'long_query_time').",
                "Le panneau Styles de Google Chrome.",
                "L'utilitaire Windows Paint.",
                "Le compilateur TypeScript."
              ],
              correctIndex: 0,
              explanation: "Le Slow Query Log consigne automatiquement toutes les requêtes dont l'exécution dépasse le seuil configuré (ex: 1.0s) ou qui n'exploitent aucun index (log_queries_not_using_indexes)."
            },
            {
              id: 5,
              question: "Lorsqu'une Stack Trace V8 affiche 'at Object.<anonymous> (/dist/server.js:1:4502)', comment remonter au fichier TypeScript d'origine ?",
              options: [
                "En devinant le nom du fichier au hasard.",
                "En s'assurant que les Source Maps (fichiers .map) sont générées et activées lors du build de production (ex: flag --enable-source-maps sous Node.js).",
                "En recompilant le projet en C++.",
                "En supprimant le dossier /dist."
              ],
              correctIndex: 1,
              explanation: "Les Source Maps traduisent les coordonnées du code compilé minifié vers la ligne et le fichier source TypeScript d'origine exacts."
            },
            {
              id: 6,
              question: "Quelle est la règle d'or lors de la transmission de logs à un agent IA pour diagnostic ?",
              options: [
                "Lui transmettre l'intégralité du disque dur C:\\.",
                "Lui transmettre un extrait ciblé contenant les événements corrélés par Correlation ID, la stack trace complète et la charge utile anonymisée, sans secrets d'API.",
                "Lui demander de réécrire le serveur Express en Python.",
                "Effacer tous les timestamps pour réduire la taille du texte."
              ],
              correctIndex: 1,
              explanation: "Un log contextualisé et expurgé de secrets permet à l'agent de comprendre la chaîne de causalité sans compromettre la sécurité du système."
            }
          ]}
        />
      </section>
    </div>
  );
};
