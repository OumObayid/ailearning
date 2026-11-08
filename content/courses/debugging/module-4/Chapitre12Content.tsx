import React from "react";
import { Icon } from "@/components/common/Icon";

export const Chapitre12Content: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-300">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 12 — Gestion et centralisation des logs Backend
        </h1>
      </div>

      {/* 1. Niveaux de sévérité RFC 5424 */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-emerald-400" />
          1. Hiérarchie des niveaux de journalisation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/10">
            <span className="font-bold text-red-400 text-sm block mb-1">ERROR</span>
            <p className="text-slate-400">Échec bloquant : panne MySQL, exception non interceptée, crash de service tiers.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/10">
            <span className="font-bold text-amber-400 text-sm block mb-1">WARN</span>
            <p className="text-slate-400">Comportement anormal non fatal : quota API à 90%, retry réseau, token bientôt expiré.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-sky-500/30 bg-sky-950/10">
            <span className="font-bold text-sky-400 text-sm block mb-1">INFO</span>
            <p className="text-slate-400">Cycle de vie normal : démarrage serveur, création d&apos;une commande, cron exécuté.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-700 bg-slate-900/50">
            <span className="font-bold text-slate-300 text-sm block mb-1">DEBUG</span>
            <p className="text-slate-500">Détails d&apos;ingénierie : payload de requête, paramètres SQL, temps de calcul internes.</p>
          </div>
        </div>
      </div>

      {/* 2. Pourquoi bannir console.log en production */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-emerald-400" />
          2. Les limites critiques de console.log
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
            <span className="font-bold text-red-400 block">Absence de métadonnées</span>
            <p className="text-slate-400 leading-relaxed">
              <code className="text-slate-200">console.log(&quot;Erreur&quot;)</code> ne contient ni horodatage ISO-8601, ni niveau de sévérité, ni environnement, rendant le tri impossible dans des millions de lignes.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
            <span className="font-bold text-amber-400 block">Format texte non indexable</span>
            <p className="text-slate-400 leading-relaxed">
              Les plateformes d&apos;observabilité (Datadog, AWS CloudWatch, Elasticsearch) exigent un format <strong>JSON structuré</strong> pour pouvoir filtrer par <code className="text-slate-200">userId</code>, <code className="text-slate-200">status</code> ou <code className="text-slate-200">durationMs</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
            <span className="font-bold text-sky-400 block">Pas de routage de flux</span>
            <p className="text-slate-400 leading-relaxed">
              Impossible de diriger les erreurs vers un fichier d&apos;alerte ou un webhook Slack tout en affichant les logs généraux sur la sortie standard (stdout).
            </p>
          </div>
        </div>
      </div>

      {/* 3. Corrélation avec Request ID et Winston */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="sparkles" className="w-5 h-5 text-emerald-400" />
          3. Traçage distribué : Le Correlation ID (Request ID)
        </h3>
        <p className="leading-relaxed">
          Lorsque 50 requêtes concurrentes frappent l&apos;API chaque seconde, leurs logs s&apos;entrecroisent. Attribuer un identifiant unique (UUID v4) à chaque requête dès son entrée permet de filtrer instantanément toute la trace d&apos;une transaction du middleware jusqu&apos;à MySQL :
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
          <div className="text-slate-400 font-sans font-bold text-sm mb-1">Architecture de journalisation structurée Winston + Request ID :</div>
          <pre className="text-emerald-300 overflow-x-auto">
{`const express = require("express");
const { randomUUID } = require("crypto");
const winston = require("winston");

// 1. Configuration du Logger structuré JSON
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

const app = express();

// 2. Middleware d'injection de Request ID
app.use((req, res, next) => {
  req.id = req.headers["x-request-id"] || randomUUID();
  res.setHeader("X-Request-Id", req.id);
  
  logger.info("Requête entrante", {
    requestId: req.id,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });
  next();
});`}
          </pre>
        </div>
      </div>

      {/* 4. Règle d'or : Masquage des données sensibles */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-emerald-400" />
          4. Confidentialité et masquage des secrets (Sanitization)
        </h3>
        <p className="leading-relaxed">
          Les fichiers de logs sont souvent accessibles à plusieurs équipes et peuvent être exportés dans des outils d&apos;analyse cloud. Ne consignez <strong>jamais</strong> de mots de passe bruts, numéros de cartes de paiement, clés secrètes ou tokens d&apos;authentification.
        </p>

        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-2">
          <span className="font-bold text-emerald-400 text-sm">Fonction d&apos;épuration des données sensibles :</span>
          <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-slate-200 overflow-x-auto">
{`function sanitizePayload(body) {
  if (!body || typeof body !== "object") return body;
  const sanitized = { ...body };
  const sensitiveKeys = ["password", "token", "secret", "creditCard", "cvv"];
  
  sensitiveKeys.forEach((key) => {
    if (key in sanitized) {
      sanitized[key] = "[MASQUÉ / REDACTED]";
    }
  });
  return sanitized;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};
export default Chapitre12Content;
