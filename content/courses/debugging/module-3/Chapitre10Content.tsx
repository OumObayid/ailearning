'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type LogIncidentKey = 'econnrefused' | 'eaddrinuse' | 'request_correlation' | 'emfile_leak';

interface LogIncident {
  title: string;
  errorCode: string;
  level: 'ERROR' | 'WARN' | 'INFO';
  badgeColor: string;
  rawJsonLog: string;
  contextAnalysis: string;
  terminalCommand: string;
  resolution: string;
}

const LOG_INCIDENTS: Record<LogIncidentKey, LogIncident> = {
  econnrefused: {
    title: '1. Échec de poignée de main TCP : ECONNREFUSED',
    errorCode: 'ECONNREFUSED',
    level: 'ERROR',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    rawJsonLog: JSON.stringify({
      timestamp: '2026-11-09T08:14:22.104Z',
      level: 'error',
      service: 'payment-service',
      requestId: 'req-8f4b2a19-9c21',
      message: 'connect ECONNREFUSED 127.0.0.1:5432',
      error: {
        code: 'ECONNREFUSED',
        errno: -111,
        syscall: 'connect',
        address: '127.0.0.1',
        port: 5432
      }
    }, null, 2),
    contextAnalysis: 'L\'application Node.js a tenté d\'ouvrir un socket TCP vers PostgreSQL sur 127.0.0.1:5432, mais le système d\'exploitation distant a explicitement rejeté la connexion (aucun processus n\'écoute sur ce port ou service arrêté).',
    terminalCommand: '# Vérifier si le conteneur ou service tourne :\ndocker ps | grep postgres\n# Ou sous Linux/macOS :\nsudo systemctl status postgresql',
    resolution: 'Vérifiez que le serveur PostgreSQL ou Redis est bien démarré, que le port 5432 est correct dans vos variables d\'environnement (.env), et qu\'aucun pare-feu ne bloque les paquets SYN.'
  },
  eaddrinuse: {
    title: '2. Conflit de port au démarrage : EADDRINUSE',
    errorCode: 'EADDRINUSE',
    level: 'ERROR',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    rawJsonLog: JSON.stringify({
      timestamp: '2026-11-09T08:15:01.442Z',
      level: 'error',
      service: 'api-gateway',
      message: 'listen EADDRINUSE: address already in use :::3000',
      error: {
        code: 'EADDRINUSE',
        errno: -98,
        syscall: 'listen',
        address: '::',
        port: 3000
      }
    }, null, 2),
    contextAnalysis: 'Node.js a tenté de lier un serveur HTTP sur le port 3000, mais ce port est déjà accaparé par un autre processus système (souvent une précédente instance de nodemon ou de Next.js restée zombie en arrière-plan).',
    terminalCommand: '# Sous Windows PowerShell :\nnetstat -ano | findstr :3000\ntaskkill /PID <PID_TROUVÉ> /F\n\n# Sous Linux/macOS :\nlsof -i :3000\nkill -9 <PID>',
    resolution: 'Tuez le processus orphelin occupant le port ou configurez une variable d\'environnement dynamique PORT=3001.'
  },
  request_correlation: {
    title: '3. Traçabilité d\'un incident distribué via Request ID',
    errorCode: 'CORRELATION_OK',
    level: 'WARN',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    rawJsonLog: JSON.stringify({
      timestamp: '2026-11-09T08:16:45.312Z',
      level: 'warn',
      service: 'checkout-service',
      requestId: 'req-6c99e2a1-bf88-4e31',
      userId: 'usr-10492',
      action: 'PROCESS_ORDER',
      durationMs: 1420,
      metadata: {
        cartTotal: 159.99,
        retryCount: 2,
        warning: 'Passerelle bancaire lente : timeout à 1500ms évité de justesse'
      }
    }, null, 2),
    contextAnalysis: 'Sur un serveur traitant des centaines de requêtes concurrentes, le champ "requestId" permet de corréler l\'ensemble des journaux d\'une même transaction depuis la requête entrante jusqu\'à la réponse HTTP finale.',
    terminalCommand: '# Filtrer tous les logs liés à cette transaction unique avec jq :\ncat logs/app.json | jq \'select(.requestId == "req-6c99e2a1-bf88-4e31")\'',
    resolution: 'Injectez le Request ID dans tous vos logs applicatifs via AsyncLocalStorage pour reconstituer l\'historique complet d\'un utilisateur sans polluer la signature des fonctions.'
  },
  emfile_leak: {
    title: '4. Épuisement des descripteurs de fichiers : EMFILE',
    errorCode: 'EMFILE',
    level: 'ERROR',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    rawJsonLog: JSON.stringify({
      timestamp: '2026-11-09T08:18:12.890Z',
      level: 'error',
      service: 'document-exporter',
      requestId: 'req-fa2109e8-7711',
      message: 'EMFILE: too many open files, open "/tmp/report_982.pdf"',
      error: {
        code: 'EMFILE',
        errno: -24,
        syscall: 'open',
        path: '/tmp/report_982.pdf'
      }
    }, null, 2),
    contextAnalysis: 'Le processus Node.js a atteint la limite maximale de descripteurs de fichiers autorisés par le système d\'exploitation (ulimit -n). Cela résulte presque toujours d\'une boucle de lecture ou de sockets réseau ouverts sans fermeture (finally).',
    terminalCommand: '# Vérifier la limite de descripteurs du système sous Linux/macOS :\nulimit -n\n# Compter le nombre de fichiers ouverts par le processus Node :\nlsof -p <NODE_PID> | wc -l',
    resolution: 'Fermez toujours les flux de lecture (fs.createReadStream) et les descripteurs de fichiers dans un bloc finally, ou utilisez fs.readFile qui libère le descripteur automatiquement.'
  }
};

export const Chapitre10Content: React.FC = () => {
  const [activeIncidentKey, setActiveIncidentKey] = useState<LogIncidentKey>('econnrefused');
  const activeIncident = LOGIC_INCIDENTS_RESOLVER(activeIncidentKey);

  function LOGIC_INCIDENTS_RESOLVER(key: LogIncidentKey): LogIncident {
    return LOG_INCIDENTS[key];
  }

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Analyse des logs d&apos;erreurs serveur et observabilité avancée
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi les simples <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">console.log()</code> en texte brut sont-ils proscrits en production ? Comment corréler des centaines de requêtes asynchrones concurrentes avec un <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">Request ID</code> unique grâce à <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">AsyncLocalStorage</code> ? Que signifient les codes système cryptiques de Node.js (<code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">EADDRINUSE</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">ECONNREFUSED</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">EMFILE</code>) et comment les résoudre ? Maîtrisez les techniques de diagnostic serveur.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser les 5 niveaux standards de journalisation (ERROR, WARN, INFO, DEBUG, TRACE) et le filtrage dynamique.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Structurer ses journaux en JSON standardisé pour ingestion dans Datadog, ELK ou Grafana Loki.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Corréler les flux asynchrones avec <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">AsyncLocalStorage</code> sans polluer la signature des fonctions.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Décrypter instantanément les codes d&apos;erreurs système POSIX de Node.js (<code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">EADDRINUSE</code>, <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">ECONNREFUSED</code>, <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">EMFILE</code>).</span>
          </div>
        </div>
      </section>

      {/* 2. Hiérarchie des niveaux de logs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Hiérarchie des 5 niveaux de journalisation et ségrégation des flux
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          En production, enregistrer chaque opération en niveau verbeux saturerait vos disques durs en quelques heures et ferait exploser vos factures d&apos;observabilité cloud. Les niveaux de log établissent une <strong>échelle de sévérité stricte</strong> permettant de filtrer les données selon l&apos;environnement d&apos;exécution.
        </p>

        {/* Tableau comparatif des niveaux */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Niveau</th>
                <th className="p-3.5 border-b border-slate-200">Sévérité &amp; Impact</th>
                <th className="p-3.5 border-b border-slate-200">Exemple d&apos;événement serveur</th>
                <th className="p-3.5 border-b border-slate-200">Activé en production ?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-rose-700">ERROR</td>
                <td className="p-3.5 font-bold text-rose-800">Panne critique (Alerte On-Call)</td>
                <td className="p-3.5">Échec de paiement bancaire, base de données inaccessible, exception non interceptée.</td>
                <td className="p-3.5 text-emerald-700 font-bold">Toujours (100%)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-amber-700">WARN</td>
                <td className="p-3.5">Dégradation anormale / Seuil limite</td>
                <td className="p-3.5">Quota d&apos;API tierce consommé à 85%, pic anormal de tentatives de connexion échouées.</td>
                <td className="p-3.5 text-emerald-700 font-bold">Toujours (100%)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-emerald-700">INFO</td>
                <td className="p-3.5">Événement métier nominal majeur</td>
                <td className="p-3.5">Démarrage du serveur sur port 3000, commande #9042 confirmée, webhook reçu.</td>
                <td className="p-3.5 text-emerald-700 font-bold">Oui (Par défaut)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-sky-700">DEBUG</td>
                <td className="p-3.5">Détail technique pour développeurs</td>
                <td className="p-3.5">Contenu du payload JSON avant validation, calcul d&apos;un hash de cache Redis.</td>
                <td className="p-3.5 text-slate-500 font-semibold">Non (Dev/Staging uniquement)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-purple-700">TRACE</td>
                <td className="p-3.5">Granularité microscopique</td>
                <td className="p-3.5">Paquets réseau bruts TCP, requêtes SQL complètes générées par l&apos;ORM.</td>
                <td className="p-3.5 text-rose-600 font-semibold">Jamais en prod (Trop verbeux)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="danger" title="Règle d'or de sécurité des journaux (Conformité RGPD)">
          <p className="text-sm leading-relaxed">
            Ne loguez <strong>JAMAIS</strong> de mots de passe, tokens JWT, clés d&apos;API secrètes ou données personnelles sensibles (numéros de sécurité sociale, coordonnées bancaires) en clair. Utilisez toujours un module d&apos;assainissement récursif (Redactor) avant sérialisation.
          </p>
        </Callout>
      </section>

      {/* 3. Logs structurés en JSON et Corrélation AsyncLocalStorage */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Logs structurés JSON et corrélation automatique avec AsyncLocalStorage
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Lorsqu&apos;un serveur traite simultanément des dizaines de requêtes dans l&apos;Event Loop, les messages <code className="font-mono text-xs">console.log()</code> s&apos;entremêlent de façon illisible. La solution moderne en ingénierie logicielle repose sur deux piliers :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 font-mono text-xs uppercase text-emerald-800 block">Pilier 1 : Format JSON Structuré</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Chaque entrée de journal est un objet JSON autonome avec des métadonnées strictes : <code className="font-mono">timestamp</code> ISO, <code className="font-mono">level</code>, <code className="font-mono">requestId</code>, <code className="font-mono">userId</code>, et les détails de l&apos;erreur avec la stack trace complète.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 font-mono text-xs uppercase text-emerald-800 block">Pilier 2 : AsyncLocalStorage</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le module natif Node.js <code className="font-mono font-bold">node:async_hooks</code> fournit <code className="font-mono font-bold">AsyncLocalStorage</code>. Il propage automatiquement le contexte (Request ID, IP client) à travers tous les appels asynchrones (BDD, API externe) <strong>sans avoir à passer req en paramètre de chaque fonction !</strong>
            </p>
          </div>
        </div>

        {/* Code d'implémentation professionnelle */}
        <div className="space-y-2 mt-4">
          <h3 className="text-base font-bold text-slate-900">
            Architecture de journalisation avec AsyncLocalStorage et Winston / Pino :
          </h3>
          <CodeBlock
            language="typescript"
            filename="logger-with-context.ts"
            code={`import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";
import { Request, Response, NextFunction } from "express";

// 1. Contexte asynchrone partagé sans passage d'arguments
interface RequestContext {
  requestId: string;
  userId?: string;
}

export const requestContextStorage = new AsyncLocalStorage<RequestContext>();

// 2. Middleware Express d'initialisation du contexte
export function traceMiddleware(req: Request, res: Response, next: NextFunction) {
  // Récupérer le header X-Request-ID ou en générer un nouveau (UUIDv4)
  const requestId = (req.headers["x-request-id"] as string) || randomUUID();
  res.setHeader("X-Request-ID", requestId);

  const context: RequestContext = { requestId };

  // Exécute la suite de la requête dans ce périmètre isolé
  requestContextStorage.run(context, () => {
    next();
  });
}

// 3. Fonction de log universelle : attache automatiquement le requestId !
export function logInfo(message: string, metadata: Record<string, unknown> = {}) {
  const context = requestContextStorage.getStore();
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: "info",
    requestId: context?.requestId || "SYSTEM",
    message,
    ...metadata
  };

  console.log(JSON.stringify(logEntry));
}`}
          />
        </div>
      </section>

      {/* 4. Simulateur Interactif : Explorateur et Décodeur de Logs Serveur */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5 text-lime-700" />
              <span>4. Laboratoire Interactif : Décodeur d&apos;Erreurs Système Node.js</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sélectionnez une anomalie serveur classique pour inspecter son log JSON réel, analyser son code POSIX et exécuter la commande de résolution.
            </p>
          </div>
        </div>

        {/* Boutons sélecteurs d'incidents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {(Object.keys(LOG_INCIDENTS) as LogIncidentKey[]).map((key) => {
            const inc = LOG_INCIDENTS[key];
            const isSelected = activeIncidentKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveIncidentKey(key)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-lime-300 border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border inline-block mb-1 ${inc.badgeColor}`}>
                  {inc.errorCode}
                </span>
                <div className="text-xs font-mono font-bold truncate">{inc.title}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'inspection en direct */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Incident inspecté :</span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activeIncident.title}
              </h3>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${activeIncident.badgeColor}`}>
              Niveau : {activeIncident.level}
            </span>
          </div>

          {/* Grille Log JSON brut vs Analyse */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Extrait de journal JSON structuré :
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {activeIncident.rawJsonLog}
              </pre>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                  Diagnostic système de la panne :
                </span>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  {activeIncident.contextAnalysis}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block font-sans">
                  Commande Terminal de diagnostic :
                </span>
                <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-200 overflow-x-auto">
                  {activeIncident.terminalCommand}
                </pre>
              </div>
            </div>
          </div>

          {/* Remède recommandé */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-1">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <Icon name="check" className="w-4 h-4 text-emerald-400" />
              <span>Protocole de remédiation :</span>
            </div>
            <p className="text-xs text-emerald-200 font-sans leading-relaxed">
              {activeIncident.resolution}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Travaux Pratiques : Assainissement et Anonymisation PII (RGPD) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            5. Travaux Pratiques — Audit de conformité RGPD et masquage PII dans les logs
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Un développeur a configuré le logger d&apos;inscription pour enregistrer l&apos;intégralité de <code className="font-mono text-xs">req.body</code>. En cas d&apos;audit de conformité ou de fuite de logs, l&apos;entreprise encourt de lourdes sanctions légales car les mots de passe en clair, les numéros de cartes de crédit et les numéros de sécurité sociale sont inscrits en texte brut dans les fichiers de logs.
        </p>

        {/* Code défaillant */}
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase text-rose-700 flex items-center gap-2">
            <Icon name="alert" className="w-4 h-4 text-rose-600" />
            <span>Code non conforme (Fuite de données sensibles PII)</span>
          </h3>
          <CodeBlock
            language="javascript"
            filename="insecure-logging.js"
            code={`// 💥 FAUTE MAJEURE DE SÉCURITÉ :
app.post("/api/register", async (req, res) => {
  // Ce log envoie le mot de passe en clair et le numéro de carte bancaire
  // directement sur la console et dans les fichiers de logs CloudWatch !
  logger.info("Tentative d'inscription utilisateur", { payload: req.body });

  await authService.register(req.body);
  res.json({ success: true });
});`}
          />
        </div>

        {/* Code sécurisé avec masqueur automatique */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Solution professionnelle avec masqueur de données sensibles (Redactor)</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="safe-redaction-logger.ts"
            code={`// Liste des clés interdites dans les journaux d'audit
const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "authorization",
  "creditcard",
  "cvv",
  "secret",
  "ssn"
]);

// Fonction pure d'assainissement récursif (Deep Masking)
export function sanitizeLogData<T>(data: T): T {
  if (data === null || data === undefined || typeof data !== "object") {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitizeLogData(item)) as unknown as T;
  }

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      sanitized[key] = "[REDACTED_CONFIDENTIAL]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeLogData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

// Utilisation sécurisée dans le contrôleur :
app.post("/api/register", async (req, res) => {
  const safePayload = sanitizeLogData(req.body);

  // ✅ Le mot de passe et le numéro de carte sont masqués par [REDACTED_CONFIDENTIAL]
  logger.info("Tentative d'inscription utilisateur sécurisée", { payload: safePayload });

  await authService.register(req.body);
  res.json({ success: true });
});`}
          />
        </div>
      </section>

      {/* 6. Synthèse : La Check-list d'Or des Logs Serveur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Synthèse : Les 4 Règles d&apos;Or de l&apos;Observabilité Serveur
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : 100% JSON en production</span>
            <p className="text-xs text-slate-700">Bannissez le texte libre non structuré. Le format JSON standardisé permet aux agrégateurs d&apos;indexer instantanément les champs clés.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : Request ID et AsyncLocalStorage</span>
            <p className="text-xs text-slate-700">Associez un UUID unique à chaque requête HTTP et propagez-le automatiquement via <code className="font-mono font-bold">AsyncLocalStorage</code> pour corréler tous les événements.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : Anonymisation stricte des PII (RGPD)</span>
            <p className="text-xs text-slate-700">Masquez impérativement les mots de passe, tokens JWT et numéros de cartes bancaires (<code className="font-mono">[REDACTED]</code>) avant sérialisation.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : Décoder les codes POSIX</span>
            <p className="text-xs text-slate-700">Reconnaissez immédiatement les codes d&apos;erreurs système natifs : <code className="font-mono font-bold">EADDRINUSE</code> (port occupé), <code className="font-mono font-bold">ECONNREFUSED</code> (cible éteinte) et <code className="font-mono font-bold">EMFILE</code> (fuite de descripteurs).</p>
          </div>
        </div>
      </section>

      {/* 7. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          7. Quiz de validation — Chapitre 3.10
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi les logs au format JSON structuré sont-ils impératifs en environnement de production ?",
              options: [
                "Ils s'affichent plus vite dans le terminal que le texte brut",
                "Ils permettent aux plateformes d'observabilité (Datadog, Elastic, Loki) d'indexer et filtrer précisément chaque champ (statusCode, requestId, durationMs)",
                "Ils évitent d'avoir à gérer les exceptions",
                "Ils réduisent la consommation mémoire du processeur"
              ],
              correctIndex: 1,
              explanation: "Le JSON structuré transforme chaque ligne de log en un document interrogeable par requêtes analytiques (ex: afficher toutes les requêtes de plus de 500ms en erreur 500 pour l'utilisateur X)."
            },
            {
              id: 2,
              question: "Quel module natif de Node.js permet de propager un Request ID à travers tous les appels asynchrones sans passer req en argument ?",
              options: [
                "node:fs",
                "node:crypto",
                "node:async_hooks via AsyncLocalStorage",
                "node:cluster"
              ],
              correctIndex: 2,
              explanation: "AsyncLocalStorage (issu de node:async_hooks) permet de stocker un état contextuel qui persiste à travers les continuations asynchrones de l'Event Loop."
            },
            {
              id: 3,
              question: "Que signifie l'erreur système Node.js 'Error: connect ECONNREFUSED 127.0.0.1:6379' ?",
              options: [
                "Le mot de passe de Redis est incorrect",
                "Aucun processus n'écoute sur le port 6379 (le serveur Redis est éteint ou le port est erroné)",
                "Le disque dur est plein",
                "Le port 6379 est bloqué par le navigateur"
              ],
              correctIndex: 1,
              explanation: "ECONNREFUSED est renvoyé par le noyau du système d'exploitation lorsque la machine cible refuse la négociation TCP parce qu'aucun serveur n'écoute sur ce port."
            },
            {
              id: 4,
              question: "Que provoque l'erreur système Node.js 'Error: EMFILE, too many open files' ?",
              options: [
                "Le code source du projet dépasse 1000 lignes",
                "Le processus a atteint la limite maximale de descripteurs de fichiers (sockets, fichiers) autorisée par le système d'exploitation",
                "Le fichier package.json est introuvable",
                "La base de données MySQL est saturée"
              ],
              correctIndex: 1,
              explanation: "EMFILE indique un épuisement de descripteurs de fichiers (souvent causé par des flux ou connexions non fermés dans un bloc finally)."
            },
            {
              id: 5,
              question: "Quel est le risque de consigner req.body dans les logs lors d'un appel à l'endpoint /api/login ?",
              options: [
                "Le serveur HTTP renvoie une erreur 400",
                "Une violation critique de sécurité et de conformité RGPD due à l'inscription en clair des mots de passe dans les fichiers de logs",
                "Une boucle infinie dans Express",
                "Une désynchronisation du cache Redis"
              ],
              correctIndex: 1,
              explanation: "Consigner des données personnelles sensibles (PII) telles que les mots de passe, cartes bancaires ou tokens est une faille de sécurité majeure et une infraction directe au RGPD."
            },
            {
              id: 6,
              question: "Quel niveau de log doit être utilisé pour enregistrer un incident de quota API à 90% ne bloquant pas encore le service ?",
              options: [
                "ERROR",
                "WARN",
                "DEBUG",
                "TRACE"
              ],
              correctIndex: 1,
              explanation: "Le niveau WARN signale une dégradation ou une anomalie non bloquante qui requiert l'attention des équipes avant de se transformer en incident critique (ERROR)."
            }
          ]}
        />
      </section>
    </div>
  );
};
