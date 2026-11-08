'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre11Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 11 — Analyser les logs de sécurité
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chapitre 6.11 — Analyser les logs de sécurité
      </p>
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        À la fin de ce chapitre, vous devez être capable de :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le rôle des logs dans la sécurité d&apos;une application.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les événements suspects dans les journaux.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Détecter les tentatives d&apos;accès non autorisées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre en place des logs structurés avec Node.js et Express.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Analyser les erreurs d&apos;authentification et les comportements inhabituels.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer les logs techniques des logs de sécurité.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comprendre les logs de sécurité
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un log (journal) est un enregistrement d&apos;un événement qui s&apos;est produit dans une application ou un système informatique.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les logs de sécurité permettent de suivre les événements qui peuvent représenter un risque pour l&apos;application.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un utilisateur tente de se connecter avec un mot de passe incorrect.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        L&apos;application peut enregistrer :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`2026-11-07 10:15:30
EVENT: LOGIN_FAILED
USER: alice@test.com
IP: 192.168.1.15
STATUS: 401`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ce journal permet de savoir :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Quand la tentative a eu lieu.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Quel compte était concerné.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Quelle adresse IP a effectué la demande.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Quel événement s&apos;est produit.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les logs sont particulièrement utiles pour comprendre un incident après sa survenue, mais aussi pour détecter des comportements suspects en temps réel.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les différents types de logs
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une application Web peut produire plusieurs catégories de journaux.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Informations enregistrées</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Application Logs</td>
              <td className="px-4 py-2.5 font-medium">Événements internes de l&apos;application.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Access Logs</td>
              <td className="px-4 py-2.5 font-medium">Requêtes HTTP reçues par le serveur.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Authentication Logs</td>
              <td className="px-4 py-2.5 font-medium">Connexions, échecs, déconnexions.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Authorization Logs</td>
              <td className="px-4 py-2.5 font-medium">Refus d&apos;accès et permissions insuffisantes.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Database Logs</td>
              <td className="px-4 py-2.5 font-medium">Erreurs et événements liés à la base de données.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">System Logs</td>
              <td className="px-4 py-2.5 font-medium">Événements du système d&apos;exploitation.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Audit Logs</td>
              <td className="px-4 py-2.5 font-medium">Actions importantes réalisées par les utilisateurs.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple de différence :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Access Log : un utilisateur a appelé /api/admin/users.`}</code></pre>
      </div>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Authentication Log : l&apos;utilisateur s&apos;est authentifié.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Authorization Log : son accès à la route administrateur a été refusé.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Audit Log : un administrateur a modifié le rôle d&apos;un utilisateur.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ces journaux répondent à des questions différentes et sont complémentaires.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Identifier les événements suspects
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Certains comportements doivent attirer l&apos;attention lors de l&apos;analyse des logs.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.1. Tentatives répétées de connexion
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`LOGIN_FAILED user=admin@test.com ip=10.0.0.5
LOGIN_FAILED user=admin@test.com ip=10.0.0.5
LOGIN_FAILED user=admin@test.com ip=10.0.0.5
LOGIN_FAILED user=admin@test.com ip=10.0.0.5`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cela peut indiquer une attaque par force brute : plusieurs mots de passe sont essayés pour trouver le bon.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Diagnostic :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier le nombre de tentatives.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les comptes concernés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Examiner les adresses IP.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier si une connexion réussie suit les échecs.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.2. Tentatives d&apos;accès non autorisées
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`GET /api/admin/users 403
GET /api/admin/settings 403
GET /api/admin/reports 403`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un utilisateur tente d&apos;accéder à plusieurs ressources administratives.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cela peut être un comportement normal ou une tentative d&apos;exploration des permissions. Il faut examiner le contexte.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.3. Requêtes inhabituelles
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Beaucoup de requêtes en quelques secondes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Accès répétés à des URL inexistantes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Paramètres anormalement longs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tentatives d&apos;injection SQL ou de Path Traversal.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Nombreux changements de compte ou de permissions.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.4. Activités inhabituelles sur les comptes
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Connexion depuis une nouvelle adresse IP.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Modification du mot de passe suivie d&apos;un changement d&apos;adresse email.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Création inattendue de comptes administrateurs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Modification de permissions sans justification.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un événement isolé n&apos;est pas nécessairement une attaque. L&apos;analyse doit tenir compte de la fréquence, du contexte et des autres événements associés.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Construire des logs structurés avec Node.js et Express
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour faciliter l&apos;analyse automatique, il est préférable d&apos;utiliser des logs structurés au format JSON.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installation de Winston :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npm install winston`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Winston est une bibliothèque de journalisation pour Node.js.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        5.1. Créer un logger
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Créer logger.js :
import winston from "winston";

const logger = winston.createLogger({
level: "info",

format: winston.format.combine(
winston.format.timestamp(),
winston.format.json()
),

transports: [
new winston.transports.Console(),

new winston.transports.File({
filename: "logs/security.log"
})
]
});

export default logger;
Créer le dossier logs avant de démarrer le serveur.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les niveaux courants sont :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Niveau</th>
              <th className="px-4 py-3">Utilisation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">error</td>
              <td className="px-4 py-2.5 font-medium">Erreur critique.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">warn</td>
              <td className="px-4 py-2.5 font-medium">Situation anormale.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">info</td>
              <td className="px-4 py-2.5 font-medium">Événement important.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">debug</td>
              <td className="px-4 py-2.5 font-medium">Informations détaillées de diagnostic.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        5.2. Enregistrer les tentatives de connexion
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple de route Express :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import logger from "./logger.js";

app.post("/api/login", async (req, res) =&gt; {
const { email, password } = req.body;

const user = await findUserByEmail(email);

if (!user || !(await verifyPassword(password, user.password))) {
logger.warn("LOGIN_FAILED", {
email,
ip: req.ip
});

return res.status(401).json({
message: "Identifiants incorrects"
});
}

logger.info("LOGIN_SUCCESS", {
userId: user.id,
ip: req.ip
});

res.json({
message: "Connexion réussie"
});
});`}</code></pre>
      </div>
      <Callout type="warning" title="Attention ">
        <p className="text-xs sm:text-sm">ne jamais enregistrer le mot de passe, même lorsque la connexion échoue. L&apos;exemple ne journalise que l&apos;adresse email et l&apos;adresse IP, qui doivent elles-mêmes être protégées conformément aux règles de confidentialité applicables.</p>
      </Callout>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        5.3. Enregistrer les refus d&apos;accès
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`function requireAdmin(req, res, next) {
if (req.user.role !== "admin") {

logger.warn("ACCESS_DENIED", {
userId: req.user.id,
route: req.originalUrl,
ip: req.ip
});

return res.status(403).json({
message: "Accès interdit"
});
}

next();
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cela permet de retrouver les tentatives d&apos;accès à des ressources protégées.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Analyser les logs HTTP avec un middleware
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un middleware Express peut enregistrer les requêtes reçues par le serveur.
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import logger from "./logger.js";

app.use((req, res, next) =&gt; {
const start = Date.now();

res.on("finish", () =&gt; {
logger.info("HTTP_REQUEST", {
method: req.method,
path: req.path,
status: res.statusCode,
duration: Date.now() - start,
ip: req.ip
});
});

next();
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple de log obtenu :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`{
"level": "info",
"message": "HTTP_REQUEST",
"method": "GET",
"path": "/api/users",
"status": 200,
"duration": 35,
"ip": "127.0.0.1"
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        On peut ainsi détecter :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les routes les plus sollicitées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les erreurs HTTP répétées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les requêtes anormalement longues.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les adresses IP à l&apos;origine de comportements inhabituels.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il faut éviter de journaliser systématiquement les corps complets des requêtes ou les headers contenant des tokens.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Détecter les attaques à partir des logs
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Voici quelques scénarios typiques.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Événement observé</th>
              <th className="px-4 py-3">Hypothèse à examiner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Plusieurs LOGIN_FAILED sur un même compte</td>
              <td className="px-4 py-2.5 font-medium">Force brute.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Nombreux 403 sur des routes administratives</td>
              <td className="px-4 py-2.5 font-medium">Tentatives d&apos;accès non autorisées.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Beaucoup de requêtes en très peu de temps</td>
              <td className="px-4 py-2.5 font-medium">Automatisation ou surcharge.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Paramètres contenant .. /</td>
              <td className="px-4 py-2.5 font-medium">Tentative possible de Path Traversal .</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Entrées SQL inhabituelles</td>
              <td className="px-4 py-2.5 font-medium">Tentative possible d&apos;injection SQL.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Création répétée de comptes</td>
              <td className="px-4 py-2.5 font-medium">Abus de l&apos;inscription.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Changements de rôle inattendus</td>
              <td className="px-4 py-2.5 font-medium">Compromission ou mauvaise utilisation d&apos;un compte privilégié.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Callout type="warning" title="Important ">
        <p className="text-xs sm:text-sm">les logs fournissent des indices. Ils ne permettent pas toujours de confirmer seuls une attaque.</p>
      </Callout>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        7.1. Corréler plusieurs événements
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La corrélation consiste à rapprocher plusieurs événements pour comprendre un incident.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`10:00:01 LOGIN_FAILED user=admin@test.com
10:00:03 LOGIN_FAILED user=admin@test.com
10:00:05 LOGIN_SUCCESS user=admin@test.com
10:00:08 ACCESS_DENIED route=/api/admin/users
10:00:10 PASSWORD_CHANGED user=admin@test.com`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pris séparément, chaque événement peut sembler normal.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ensemble, ils peuvent révéler une activité suspecte nécessitant une investigation.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        7.2. Centraliser les logs
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans une application de production, les logs peuvent être envoyés vers une plateforme centralisée.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Quelques solutions :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>ELK Stack : collecte, recherche et visualisation des journaux.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Grafana Loki : centralisation et consultation des logs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Splunk : recherche et analyse des événements.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Winston : production de logs dans le backend.</span>
          </li>
        </ul>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image15.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image16.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image17.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La centralisation permet de rechercher des événements provenant de plusieurs serveurs et de conserver une vision globale de l&apos;activité.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Protéger les logs eux-mêmes
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les logs contiennent parfois des informations sensibles. Ils doivent donc être protégés.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Règles essentielles :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne jamais enregistrer les mots de passe.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas enregistrer les tokens d&apos;authentification ou les clés API.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Masquer les données personnelles qui ne sont pas nécessaires.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Limiter l&apos;accès aux fichiers de logs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Prévoir une durée de conservation adaptée.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Protéger les logs contre la modification et la suppression non autorisées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre en place une rotation des fichiers pour éviter une croissance illimitée.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple de rotation avec Winston :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npm install winston-daily-rotate-file
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const securityTransport = new DailyRotateFile({
filename: "logs/security-%DATE%.log",
datePattern: "YYYY-MM-DD",
maxSize: "20m",
maxFiles: "14d"
});

const logger = winston.createLogger({
level: "info",
format: winston.format.combine(
winston.format.timestamp(),
winston.format.json()
),
transports: [
new winston.transports.Console(),
securityTransport
]
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cette configuration crée des fichiers journaliers, limite leur taille et conserve les fichiers pendant une période définie.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. TP pratique — Détecter les tentatives de connexion suspectes
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TP pratique
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Difficulté : intermédiaire
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Objectif : créer un système de journalisation qui enregistre les tentatives de connexion et détecte les échecs répétés sur un même compte.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 1 — Préparer le projet
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`mkdir debug-security-logs
cd debug-security-logs

npm init -y
npm install express winston
Dans package.json, ajouter :
"type": "module"`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créer cette structure :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`debug-security-logs/
├── server.js
├── logger.js
└── logs/`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 2 — Créer le logger
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Dans logger.js :
import winston from "winston";

const logger = winston.createLogger({
level: "info",

format: winston.format.combine(
winston.format.timestamp(),
winston.format.json()
),

transports: [
new winston.transports.Console(),

new winston.transports.File({
filename: "logs/security.log"
})
]
});

export default logger;`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 3 — Créer le serveur
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Dans server.js :
import express from "express";
import logger from "./logger.js";

const app = express();

app.use(express.json());

const users = [
{
email: "admin@test.com",
password: "123456"
}
];

const failedAttempts = new Map();

app.post("/api/login", (req, res) =&gt; {
const { email, password } = req.body;

const user = users.find(u =&gt; u.email === email);

if (!user || user.password !== password) {

const attempts = (failedAttempts.get(email) || 0) + 1;

failedAttempts.set(email, attempts);

logger.warn("LOGIN_FAILED", {
email,
attempts,
ip: req.ip
});

if (attempts &gt;= 3) {
logger.error("SUSPICIOUS_LOGIN_ACTIVITY", {
email,
attempts,
ip: req.ip
});
}

return res.status(401).json({
message: "Identifiants incorrects"
});
}

failedAttempts.delete(email);

logger.info("LOGIN_SUCCESS", {
email,
ip: req.ip
});

res.json({
message: "Connexion réussie"
});
});

app.listen(3000, () =&gt; {
console.log("Serveur démarré sur le port 3000");
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Remarque : ce code est un exercice pédagogique. Les mots de passe sont volontairement simplifiés et stockés en clair : ce système ne doit pas être utilisé en production. Le compteur en mémoire ne fonctionne que dans un processus unique et peut être contourné par un redémarrage. En production, il faut utiliser un stockage partagé, une politique de limitation des tentatives et un mécanisme de protection des comptes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 4 — Tester avec Postman
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Démarrer :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`node server.js`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Envoyer trois fois une requête incorrecte :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`POST http://localhost:3000/api/login
Content-Type: application/json
{
"email": "admin@test.com",
"password": "incorrect"
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Résultat HTTP :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`401 Unauthorized
Après trois tentatives, un événement SUSPICIOUS_LOGIN_ACTIVITY doit apparaître dans les logs.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 5 — Examiner le fichier de logs
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ouvrir :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`logs/security.log`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple de contenu :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`{
"level": "warn",
"message": "LOGIN_FAILED",
"email": "admin@test.com",
"attempts": 1,
"ip": "::1"
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Puis rechercher :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`SUSPICIOUS_LOGIN_ACTIVITY`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Résultat attendu : les tentatives répétées sont identifiées et enregistrées avec leur contexte.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 6 — Amélioration du TP
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour aller plus loin, ajouter :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une limitation des tentatives de connexion.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Un délai progressif entre les tentatives.</span>
          </li>
        </ul>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Un identifiant unique pour chaque requête (requestId).`}</code></pre>
      </div>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une alerte lorsqu&apos;un seuil est dépassé.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une conservation des événements dans une base de données ou une plateforme centralisée.</span>
          </li>
        </ul>
      </section>

      {/* Quiz de révision */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de révision — Chapitre 6.11"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle des logs de sécurité ?",
              options: ["Enregistrer et analyser les événements liés à la sécurité.", "Remplacer les tests unitaires."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 2,
              question: "Une succession de LOGIN_FAILED peut indiquer :",
              options: ["Une tentative de force brute.", "Une fuite mémoire.", "Une erreur"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 3,
              question: "Pourquoi utiliser des logs au format JSON ?",
              options: ["Pour faciliter leur recherche et leur analyse automatique.", "Pour supprimer les erreurs.", "Pour chiffrer automatiquement les données."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 4,
              question: "Quelle information ne doit jamais être enregistrée dans les logs ?",
              options: ["La date d'une requête.", "Le code HTTP.", "Le mot de passe d'un utilisateur."],
              correctIndex: 2,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 5,
              question: "Quel est l'intérêt de centraliser les logs ?",
              options: ["Supprimer les fichiers temporaires.", "Modifier les permissions MySQL."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 6,
              question: "Une erreur HTTP 403 répétée prouve-t-elle une attaque ?",
              options: ["Oui, systématiquement.", "Non, elle constitue un indice à examiner dans son contexte.", "Oui, si elle vient d'un navigateur."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
          ]}
        />
      </div>
    </div>
  );
};
