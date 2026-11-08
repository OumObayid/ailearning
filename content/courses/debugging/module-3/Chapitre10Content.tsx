'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Analyse des logs et des erreurs serveur
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre les 5 niveaux standards de logs (ERROR, WARN, INFO, DEBUG, TRACE).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre en place des journaux structurés en JSON avec la bibliothèque Winston.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tracer les flux de requêtes asynchrones grâce à un Request ID unique (UUID).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Diagnostiquer les codes d&apos;erreurs système Node.js (EADDRINUSE, ECONNREFUSED).</span>
          </li>
        </ul>
      </section>

      {/* 2. Niveaux de logs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Hiérarchie des niveaux de journalisation
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Niveau</th>
                <th className="p-3.5 border-b border-slate-200">Gravité</th>
                <th className="p-3.5 border-b border-slate-200">Exemple d&apos;événement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-rose-700">ERROR</td>
                <td className="p-3.5 font-bold text-rose-800">Critique (Alerte On-call)</td>
                <td className="p-3.5">Échec de transaction bancaire, déconnexion de base de données.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-amber-700">WARN</td>
                <td className="p-3.5">Dégradation / Anomalie</td>
                <td className="p-3.5">Quota API externe à 90%, pic inhabituel de tentatives de login.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-emerald-700">INFO</td>
                <td className="p-3.5">Événement normal majeur</td>
                <td className="p-3.5">Serveur démarré sur port 3000, commande #482 validée.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-blue-700">DEBUG</td>
                <td className="p-3.5">Détail technique</td>
                <td className="p-3.5">Contenu du payload avant validation, calcul d&apos;un hash de cache.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Winston et Logs Structurés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Winston : Logs structurés JSON et multi-transports
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Un log brut de type texte est impossible à filtrer automatiquement. Les logs structurés en format JSON permettent à des plateformes comme Datadog, ELK ou CloudWatch d&apos;indexer instantanément les requêtes :
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-emerald-400 font-bold">{`// Configuration robuste de Winston (logger.js) :`}</div>
          <div>{`const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Sortie 100% JSON structurée
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

module.exports = logger;`}</div>
        </div>
      </section>

      {/* 4. Traçage par Request ID */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Corrélation de requêtes concurrentes via Request ID
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Lorsqu&apos;un serveur traite des dizaines de requêtes par seconde, les logs s&apos;entremêlent. Associez un UUID unique à chaque requête HTTP pour reconstituer l&apos;intégralité de son parcours de traitement :
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-cyan-400 font-bold">{`// Middleware de traçabilité Express :`}</div>
          <div>{`const { randomUUID } = require("node:crypto");

app.use((req, res, next) => {
  req.requestId = randomUUID();
  const start = Date.now();

  logger.info("Requête reçue", {
    requestId: req.requestId,
    method: req.method,
    path: req.path
  });

  res.on("finish", () => {
    logger.info("Requête terminée", {
      requestId: req.requestId,
      statusCode: res.statusCode,
      durationMs: Date.now() - start
    });
  });

  next();
});`}</div>
        </div>
      </section>

      {/* 5. Codes d'erreurs serveur fréquents */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Décoder les erreurs système Node.js
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
            <span className="font-bold text-amber-400 font-sans uppercase">EADDRINUSE (Port occupé) :</span>
            <p className="text-slate-400 font-sans text-xs">Un autre processus utilise déjà le port 3000.</p>
            <pre className="text-slate-300">{`# Windows PowerShell :
netstat -ano | findstr :3000
taskkill /PID <PID_TROUVÉ> /F`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
            <span className="font-bold text-rose-400 font-sans uppercase">ECONNREFUSED (Connexion rejetée) :</span>
            <p className="text-slate-400 font-sans text-xs">Le serveur distant (MySQL, Redis) est éteint ou le port est faux.</p>
            <pre className="text-slate-300">{`// Vérifier :
// 1. Service démarré ?
// 2. Host et port valides ?
// 3. Pare-feu / Firewall ?`}</pre>
          </div>
        </div>

        <Callout type="danger">
          <strong>Règle d&apos;or de sécurité des journaux :</strong> Ne loguez JAMAIS de mots de passe, tokens JWT, clés d&apos;API Stripe ou données personnelles sensibles (RGPD). Utilisez toujours une fonction de masquage ou de filtrage avant d&apos;envoyer un payload aux transports de logs.
        </Callout>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.10
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi privilégie-t-on les logs au format JSON structuré en production ?",
              options: [
                "Ils prennent moins de place sur le disque",
                "Ils permettent d'indexer, de filtrer et de requêter facilement les champs (statut, requestId, durée)",
                "Ils remplacent les sauvegardes de bases de données",
                "Ils évitent d'écrire des tests unitaires"
              ],
              correctIndex: 1,
              explanation: "Le JSON structuré permet aux outils d'observabilité de rechercher précisément les logs par utilisateur, statut HTTP ou temps de réponse."
            },
            {
              id: 2,
              question: "À quoi sert un Request ID dans une API Node.js ?",
              options: [
                "À crypter la base de données",
                "À corréler tous les événements de journalisation émis par une même requête concurrente",
                "À remplacer le mot de passe de l'utilisateur",
                "À réduire la charge du CPU"
              ],
              correctIndex: 1,
              explanation: "Le Request ID est un identifiant unique (UUID) rattaché à chaque log d'un même cycle de requête, permettant de reconstituer l'enquête en cas de bug."
            },
            {
              id: 3,
              question: "Que signifie l'erreur système Node.js 'Error: listen EADDRINUSE: address already in use :::3000' ?",
              options: [
                "L'adresse IP du serveur est invalide",
                "Le port réseau 3000 est déjà occupé par un autre processus actif",
                "Le disque dur est saturé",
                "La base de données a refusé la connexion"
              ],
              correctIndex: 1,
              explanation: "EADDRINUSE indique qu'un processus système (souvent une précédente instance de Node.js) écoute déjà sur le port spécifié."
            }
          ]}
        />
      </section>
    </div>
  );
};
