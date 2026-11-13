'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type LogFilterKey = 'all' | 'req-98f2' | 'req-44a1' | 'req-e309';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  requestId: string;
  message: string;
  context: Record<string, unknown>;
}

const SAMPLE_LOGS: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-11-09T08:30:00.120Z',
    level: 'info',
    requestId: 'req-98f2',
    message: 'Requête HTTP entrante',
    context: { method: 'POST', path: '/api/v1/orders', clientIp: '192.168.1.45' }
  },
  {
    id: 'log-2',
    timestamp: '2026-11-09T08:30:00.125Z',
    level: 'info',
    requestId: 'req-44a1',
    message: 'Requête HTTP entrante',
    context: { method: 'GET', path: '/api/v1/products', clientIp: '192.168.1.88' }
  },
  {
    id: 'log-3',
    timestamp: '2026-11-09T08:30:00.132Z',
    level: 'debug',
    requestId: 'req-98f2',
    message: 'Jeton JWT décodé avec succès',
    context: { userId: '104', role: 'member' }
  },
  {
    id: 'log-4',
    timestamp: '2026-11-09T08:30:00.145Z',
    level: 'warn',
    requestId: 'req-e309',
    message: 'Tentative d\'accès non autorisée',
    context: { method: 'DELETE', path: '/api/v1/users/1', role: 'guest', action: 'blocked_by_rbac' }
  },
  {
    id: 'log-5',
    timestamp: '2026-11-09T08:30:00.150Z',
    level: 'debug',
    requestId: 'req-44a1',
    message: 'Requête SQL exécutée',
    context: { sql: 'SELECT * FROM products LIMIT ? OFFSET ?', durationMs: 4 }
  },
  {
    id: 'log-6',
    timestamp: '2026-11-09T08:30:00.162Z',
    level: 'info',
    requestId: 'req-44a1',
    message: 'Réponse transmise',
    context: { status: 200, durationMs: 37 }
  },
  {
    id: 'log-7',
    timestamp: '2026-11-09T08:30:00.170Z',
    level: 'error',
    requestId: 'req-98f2',
    message: 'Conflit d\'intégrité lors de la réservation de commande',
    context: {
      code: 'ER_DUP_ENTRY',
      sqlMessage: "Duplicate entry 'ORD-2026-001' for key 'orders.reference'",
      cardData: { cardNumber: '**** **** **** 4242', cvv: '[REDACTED]' }
    }
  },
  {
    id: 'log-8',
    timestamp: '2026-11-09T08:30:00.185Z',
    level: 'info',
    requestId: 'req-98f2',
    message: 'Réponse transmise',
    context: { status: 409, durationMs: 65 }
  }
];

export const Chapitre12Content: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<LogFilterKey>('all');

  const filteredLogs = selectedFilter === 'all'
    ? SAMPLE_LOGS
    : SAMPLE_LOGS.filter((l) => l.requestId === selectedFilter);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 12 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Backend Logging &amp; Observability
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Gestion et centralisation des logs Backend : Winston, Pino, Request ID et conformité RGPD
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Les logs constituent la <strong>boîte noire</strong> de votre application de production.
          En cas d&apos;incident critique à 3 heures du matin, un message laconique <code>console.log(&quot;error&quot;)</code> sans horodatage
          ni contexte équivaut à piloter un avion avec les instruments éteints.
          Une architecture de journalisation industrielle repose sur trois piliers :
          le format JSON structuré (Winston/Pino), l&apos;identifiant de corrélation (<strong>Request ID</strong>)
          et le masquage systématique des secrets (RGPD).
        </p>
      </div>

      {/* 1. Niveaux de sévérité RFC 5424 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <Icon name="document-text" className="w-5 h-5 text-emerald-600" />
            <span>La hiérarchie des niveaux de journalisation (RFC 5424)</span>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Chaque message émis doit être typé avec précision pour permettre un filtrage par seuil de sévérité :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl border-2 border-rose-300 bg-rose-50/60 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-rose-800 tracking-wider">Niveau 1</span>
              <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 text-xs font-black font-mono">ERROR</span>
            </div>
            <div className="font-bold text-rose-950 text-sm">Échec bloquant</div>
            <p className="text-xs text-rose-900 leading-relaxed">
              Panne MySQL, crash non catché (500), échec de paiement Stripe, indisponibilité d&apos;un service tiers critique.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/60 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-800 tracking-wider">Niveau 2</span>
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-xs font-black font-mono">WARN</span>
            </div>
            <div className="font-bold text-amber-950 text-sm">Anomalie tolérée</div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Quota d&apos;appels à 85%, retry réseau automatique, tentative de login échouée, token bientôt expiré.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-blue-300 bg-blue-50/60 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-blue-800 tracking-wider">Niveau 3</span>
              <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 text-xs font-black font-mono">INFO</span>
            </div>
            <div className="font-bold text-blue-950 text-sm">Cycle de vie nominal</div>
            <p className="text-xs text-blue-900 leading-relaxed">
              Démarrage du serveur, validation d&apos;une commande, cron exécuté avec succès, connexion d&apos;un utilisateur.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-slate-300 bg-slate-50 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Niveau 4</span>
              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-xs font-black font-mono">DEBUG</span>
            </div>
            <div className="font-bold text-slate-950 text-sm">Diagnostic d&apos;ingénierie</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Détails exhaustifs réservés au développement : paramètres SQL compilés, en-têtes HTTP bruts, calculs de hash.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Pourquoi bannir console.log en production */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les 4 défauts rédhibitoires de console.log en production
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1.5">
            <div className="font-bold text-slate-950 text-sm text-rose-700">1. Format texte non indexable</div>
            <p className="text-slate-600 leading-relaxed">
              Les outils d&apos;observabilité (Datadog, CloudWatch, Grafana Loki) exigent du <strong>JSON structuré</strong> pour filtrer par statut, durée ou utilisateur.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1.5">
            <div className="font-bold text-slate-950 text-sm text-amber-700">2. Absence d&apos;horodatage ISO</div>
            <p className="text-slate-600 leading-relaxed">
              <code>console.log()</code> n&apos;intègre nativement ni date UTC ni millisecondes, rendant impossible la corrélation temporelle avec vos métriques de CPU ou BDD.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1.5">
            <div className="font-bold text-slate-950 text-sm text-blue-700">3. Blocage synchrone I/O</div>
            <p className="text-slate-600 leading-relaxed">
              Sous Node.js (particulièrement sous Windows), l&apos;écriture vers <code>stdout</code> peut devenir synchrone et bloquer la boucle d&apos;événements (Event Loop).
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1.5">
            <div className="font-bold text-slate-950 text-sm text-purple-700">4. Aucun routage multi-flux</div>
            <p className="text-slate-600 leading-relaxed">
              Impossible avec <code>console.log</code> d&apos;envoyer les erreurs vers un fichier dédié avec rotation automatique (DailyRotateFile) tout en loguant le reste sur la console.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Laboratoire Interactif : Filtrage par Correlation ID (Request ID) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Traçage distribué par Correlation ID (Request ID)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          En production, des dizaines de requêtes concurrentes s&apos;entrecroisent chaque seconde.
          Sélectionnez un <strong>Request ID</strong> pour isoler la séquence chronologique d&apos;une transaction du middleware jusqu&apos;à MySQL :
        </p>

        {/* Boutons de filtre */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'req-98f2', 'req-44a1', 'req-e309'] as LogFilterKey[]).map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                selectedFilter === f
                  ? 'bg-slate-950 text-lime-400 shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f === 'all' ? 'Afficher toutes les requêtes (Logs entremêlés)' : `Filtrer : [${f}]`}
            </button>
          ))}
        </div>

        {/* Visualiseur de flux de logs */}
        <div className="rounded-3xl border-2 border-slate-300 bg-slate-950 p-4 sm:p-6 shadow-sm space-y-2 text-xs font-mono overflow-x-auto">
          {filteredLogs.map((log) => {
            const levelColor =
              log.level === 'error'
                ? 'text-rose-400 font-black'
                : log.level === 'warn'
                ? 'text-amber-400 font-bold'
                : log.level === 'info'
                ? 'text-sky-300'
                : 'text-slate-400';

            return (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-500 text-[11px]">{log.timestamp.slice(11, 23)}</span>
                  <span className={`uppercase text-[11px] px-1.5 py-0.5 rounded bg-slate-800 ${levelColor}`}>
                    {log.level}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-300 font-bold text-[11px]">
                    [{log.requestId}]
                  </span>
                  <span className="text-slate-200 font-sans text-xs">{log.message}</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate max-w-sm">
                  {JSON.stringify(log.context)}
                </div>
              </div>
            );
          })}
        </div>

        <Callout type="info" title="L'importance de renvoyer le Request ID au client">
          <p className="text-xs sm:text-sm">
            En envoyant l&apos;en-tête <code>X-Request-Id: req-98f2</code> au navigateur, lorsqu&apos;un utilisateur rencontre un bug,
            il lui suffit de vous fournir son identifiant de requête. Vous pouvez alors retrouver la transaction exacte
            dans vos logs en 1 seconde parmi 50 millions de lignes.
          </p>
        </Callout>
      </section>

      {/* 4. Masquage PII et conformité RGPD */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Confidentialité et masquage des données sensibles (RGPD / PCI-DSS)
          </h2>
        </div>

        <Callout type="danger" title="Alerte Légale : Les logs en clair sont des failles RGPD majeures">
          <p className="text-xs sm:text-sm">
            Consigner des mots de passe en clair, des numéros de carte de crédit (PAN), des tokens JWT complets
            ou des informations médicales dans des fichiers de log constitue une violation grave du RGPD (peine pouvant atteindre 4% du CA mondial)
            et de la norme de sécurité bancaire PCI-DSS.
            Ces données doivent être <strong>masquées (redacted)</strong> avant toute sérialisation.
          </p>
        </Callout>

        <CodeBlock
          language="typescript"
          code={`// Fonction de masquage récursif de sécurité (Sanitization)
const SENSITIVE_KEYS = new Set([
  'password',
  'passwordconfirmation',
  'token',
  'accesstoken',
  'refreshtoken',
  'cardnumber',
  'cvv',
  'secret'
]);

export function sanitizeLogData(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeLogData);
  }

  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_KEYS.has(lowerKey)) {
      sanitized[key] = '[***REDACTED***]';
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeLogData(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}`}
        />
      </section>

      {/* 5. TP : Architecture Winston de Production Complète */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Implémenter le Logger Winston Professionnel avec Request ID
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Cette configuration prête pour la production formate les logs en JSON structuré,
          injecte le <code>requestId</code>, masque les secrets et sépare les erreurs vers un fichier persistant :
        </p>

        <CodeBlock
          language="typescript"
          code={`import express, { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import winston from 'winston';

// 1. Initialisation de Winston avec format JSON et masquage
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
    winston.format.json()
  ),
  defaultMeta: { service: 'eshop-api', env: process.env.NODE_ENV || 'development' },
  transports: [
    new winston.transports.Console({
      format: process.env.NODE_ENV === 'production'
        ? winston.format.json()
        : winston.format.combine(winston.format.colorize(), winston.format.simple())
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

const app = express();

// 2. Middleware d'injection et de traçage du Request ID
app.use((req: Request, res: Response, next: NextFunction) => {
  const reqId = (req.headers['x-request-id'] as string) || randomUUID();
  (req as any).id = reqId;
  res.setHeader('X-Request-Id', reqId);

  const startTime = Date.now();

  // Log à la terminaison de la réponse
  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    logger.info('Requête HTTP traitée', {
      requestId: reqId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs,
      userAgent: req.headers['user-agent']
    });
  });

  next();
});`}
        />
      </section>

      {/* 6. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            6
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.12
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Évaluez votre maîtrise de la centralisation des logs backend et des pratiques d&apos;observabilité :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial de générer et d'injecter un 'Request ID' (Correlation ID) dès l'entrée de chaque requête Express ?",
              options: [
                "Pour accélérer la vitesse de calcul du processeur.",
                "Pour pouvoir corréler et regrouper tous les logs générés par une même transaction au milieu de milliers d'autres requêtes concurrentes entremêlées.",
                "Pour chiffrer le mot de passe de l'utilisateur.",
                "Pour satisfaire une contrainte obligatoire du protocole HTTP."
              ],
              correctIndex: 1,
              explanation: "En production sous forte charge, des dizaines de requêtes écrivent dans les logs en même temps. Sans Request ID unique, il est impossible de savoir quelle ligne de log appartient à quelle requête."
            },
            {
              id: 2,
              question: "Pourquoi l'utilisation de console.log() doit-elle être bannie au profit d'un logger structuré comme Winston ou Pino en production ?",
              options: [
                "Parce que console.log() ne fonctionne pas sous Linux.",
                "Parce que console.log() produit du texte brut non indexable par les outils d'observabilité (Datadog, CloudWatch), n'a pas d'horodatage précis et peut bloquer l'Event Loop lors de gros volumes d'E/S.",
                "Parce que console.log() est payant.",
                "Parce que console.log() ferme la connexion HTTP."
              ],
              correctIndex: 1,
              explanation: "Winston et Pino produisent du JSON structuré avec métadonnées (timestamp ISO-8601, niveau de sévérité, correlation ID), permettant aux moteurs de logs de faire des recherches et des agrégations ultra-rapides."
            },
            {
              id: 3,
              question: "À quel niveau de journalisation RFC 5424 doit être consignée une erreur de connexion MySQL qui empêche le traitement d'une commande ?",
              options: [
                "DEBUG",
                "INFO",
                "ERROR",
                "TRACE"
              ],
              correctIndex: 2,
              explanation: "ERROR désigne une panne qui empêche une opération métier légitime d'aboutir. C'est le niveau qui doit déclencher des alertes auprès des équipes d'astreinte."
            },
            {
              id: 4,
              question: "Pourquoi est-il interdit de consigner des mots de passe en clair ou des numéros de carte de paiement dans les logs ?",
              options: [
                "Pour économiser de l'espace disque.",
                "Pour respecter les normes RGPD et PCI-DSS : les fichiers de logs sont partagés et stockés, et leur fuite exposerait directement les données sensibles des clients.",
                "Parce que les logs refusent les caractères non numériques.",
                "Pour éviter les lenteurs de réseau."
              ],
              correctIndex: 1,
              explanation: "Consigner des données sensibles non masquées (PII) constitue une faute juridique majeure passible de lourdes sanctions par la CNIL et les régulateurs bancaires. Tout secret doit être masqué (redacted)."
            },
            {
              id: 5,
              question: "Quel en-tête HTTP standardisé est recommandé pour renvoyer le Request ID au client afin de faciliter le support technique ?",
              options: [
                "X-Request-Id",
                "Content-Disposition",
                "Authorization",
                "Cache-Control"
              ],
              correctIndex: 0,
              explanation: "L'en-tête X-Request-Id permet au navigateur ou au support client de citer l'identifiant exact de la transaction ayant échoué pour que les développeurs retrouvent la trace dans leurs logs."
            },
            {
              id: 6,
              question: "Comment configure-t-on le niveau de log dans une application de production pour éviter de saturer les disques tout en conservant les alertes essentielles ?",
              options: [
                "En mettant LOG_LEVEL=debug",
                "En désactivant tous les logs",
                "En configurant LOG_LEVEL=info (ou warn/error), ce qui filtre automatiquement tous les messages verbeux de debug",
                "En écrivant les logs sur une clé USB"
              ],
              correctIndex: 2,
              explanation: "Définir le seuil à 'info' permet de tracer le cycle de vie de l'application et les alertes (warn/error) sans générer les millions de lignes verbeuses de debug qui consomment inutilement l'espace disque."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre12Content;
