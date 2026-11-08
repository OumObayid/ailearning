'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Déboguer les problèmes de connexion à la base de données
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chapitre 6.7 — Déboguer les problèmes de connexion à la base de données
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Objectifs du chapitre
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        À la fin de ce chapitre, vous serez capable de :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les causes d&apos;échec de connexion entre Node.js et MySQL.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre les erreurs d&apos;authentification, de réseau et de configuration.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Diagnostiquer les problèmes de pool de connexions.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Analyser les timeouts et les connexions interrompues.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser les logs et les outils MySQL pour trouver la cause racine.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre en place une connexion robuste et surveillée.</span>
          </li>
        </ul>
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Comprendre la connexion entre Backend et Base de données
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans une application Web, le Backend communique avec la Base de données pour lire, ajouter, modifier ou supprimer des informations.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple d&apos;architecture :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        React, Node.js Express, MySQL Architecture
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        jsxcode.com
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le fonctionnement classique :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le Frontend envoie une requête HTTP.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Express reçoit la demande.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Node.js demande une connexion à MySQL.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>MySQL authentifie le client.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>La requête SQL est exécutée.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>MySQL retourne les résultats.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Express construit la réponse HTTP.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un problème à n&apos;importe quelle étape peut empêcher l&apos;application de fonctionner correctement.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        1.1. Les symptômes fréquents
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Symptôme</th>
              <th className="px-4 py-3">Cause possible</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">API retourne une erreur 500</td>
              <td className="px-4 py-2.5 font-medium">Erreur de connexion ou erreur SQL</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">ECONNREFUSED</td>
              <td className="px-4 py-2.5 font-medium">Serveur MySQL inaccessible ou port incorrect</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">ER_ACCESS_DENIED_ERROR</td>
              <td className="px-4 py-2.5 font-medium">Identifiants incorrects ou permissions insuffisantes</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">ETIMEDOUT</td>
              <td className="px-4 py-2.5 font-medium">Délai de connexion dépassé</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Too many connections</td>
              <td className="px-4 py-2.5 font-medium">Limite de connexions MySQL atteinte</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">PROTOCOL_CONNECTION_LOST</td>
              <td className="px-4 py-2.5 font-medium">Connexion interrompue</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Requêtes qui restent en attente</td>
              <td className="px-4 py-2.5 font-medium">Pool épuisé ou requête bloquée</td>
            </tr>
          </tbody>
        </table>
      </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Diagnostiquer les erreurs de connexion
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        2.1. ECONNREFUSED
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Error: connect ECONNREFUSED 127.0.0.1:3306`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cela signifie que Node.js n&apos;arrive pas à établir une connexion TCP avec le serveur à cette adresse et sur ce port.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Causes possibles :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>MySQL n&apos;est pas démarré.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le port est incorrect.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le serveur n&apos;écoute pas sur l&apos;adresse demandée.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Un pare-feu bloque la connexion.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Diagnostic sous Windows :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ouvrez PowerShell :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Get-Service *mysql*`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vérifiez si le service MySQL est démarré.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour tester le port :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Test-NetConnection localhost -Port 3306
Si TcpTestSucceeded vaut False, la connexion TCP n'est pas établie.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Sous Linux :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`sudo systemctl status mysql`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Puis :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`ss -lntp | grep 3306`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        2.2. ER_ACCESS_DENIED_ERROR
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`ER_ACCESS_DENIED_ERROR:
Access denied for user 'app_user'@'localhost'`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le serveur MySQL est accessible, mais refuse l&apos;authentification ou l&apos;accès demandé.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vérifiez :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le nom d&apos;utilisateur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le mot de passe.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>L&apos;hôte autorisé.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les privilèges de l&apos;utilisateur.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour examiner les comptes :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`SELECT user, host
FROM mysql.user;`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour examiner les permissions :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`SHOW GRANTS FOR 'app_user'@'localhost';`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple d&apos;attribution de droits limités :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`GRANT SELECT, INSERT, UPDATE, DELETE
ON my_database.*
TO 'app_user'@'localhost';
Évitez d'utiliser le compte root pour une application en production.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        2.3. ETIMEDOUT
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`connect ETIMEDOUT 192.168.1.20:3306`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La connexion n&apos;a pas pu être établie dans le délai autorisé.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Causes possibles :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Serveur distant indisponible.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Réseau instable.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Pare-feu.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mauvaise configuration réseau.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Serveur trop chargé.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour diagnostiquer, vérifiez d&apos;abord la connectivité réseau, puis le port et enfin la disponibilité du service MySQL.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comprendre les problèmes de Pool de connexions
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Notion importante
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un Connection Pool est un ensemble de connexions à la Base de données réutilisables par l&apos;application.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Sans pool, l&apos;application pourrait ouvrir une nouvelle connexion pour chaque requête HTTP.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cela augmente les coûts de connexion et peut rapidement dépasser les limites de MySQL.
      </p>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image12.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.1. Exemple sans pool
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`const mysql = require("mysql2/promise");

app.get("/products", async (req, res) =&gt; {
const connection = await mysql.createConnection({
host: "localhost",
user: "root",
password: "password",
database: "shop"
});

const [rows] = await connection.query(
"SELECT * FROM products"
);

await connection.end();

res.json(rows);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Problèmes :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une connexion est créée à chaque requête.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>L&apos;ouverture et la fermeture ont un coût.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une forte charge peut provoquer trop de connexions.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une mauvaise gestion des erreurs peut laisser des ressources ouvertes.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.2. Exemple avec un pool
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installez le connecteur :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npm install mysql2
Créez database.js :
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
host: "localhost",
user: "app_user",
password: process.env.DB_PASSWORD,
database: "shop",

waitForConnections: true,
connectionLimit: 10,
queueLimit: 50
});

module.exports = pool;`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Utilisation dans Express :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`const db = require("./database");

app.get("/products", async (req, res) =&gt; {
try {
const [rows] = await db.query(
"SELECT id, name, price FROM products"
);

res.json(rows);

} catch (error) {
console.error("Erreur SQL :", error.code);

res.status(500).json({
message: "Erreur lors de la récupération des produits"
});
}
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le pool réutilise les connexions disponibles.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.3. Comprendre les paramètres du pool
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Paramètre</th>
              <th className="px-4 py-3">Rôle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">waitForConnections</td>
              <td className="px-4 py-2.5 font-medium">Attend qu&apos;une connexion soit disponible</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">connectionLimit</td>
              <td className="px-4 py-2.5 font-medium">Nombre maximal de connexions du pool</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">queueLimit</td>
              <td className="px-4 py-2.5 font-medium">Nombre maximal de demandes en attente ; 0 signifie illimité</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Callout type="warning" title="Attention ">
        <p className="text-xs sm:text-sm">le nombre de connexions doit être adapté à la capacité de MySQL.</p>
      </Callout>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Si vous avez 5 instances Node.js avec connectionLimit: 20, elles peuvent potentiellement ouvrir jusqu'à 100 connexions.`}</code></pre>
      </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Identifier les connexions perdues
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une connexion peut être interrompue pendant le fonctionnement de l&apos;application.
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`PROTOCOL_CONNECTION_LOST`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Causes possibles :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Redémarrage du serveur MySQL.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Coupure réseau.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Fermeture d&apos;une connexion inactive.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Timeout côté serveur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Problème d&apos;infrastructure.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.1. Vérifier les paramètres MySQL
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`SHOW VARIABLES LIKE 'wait_timeout';

SHOW VARIABLES LIKE 'max_connections';
wait_timeout : durée d'inactivité avant la fermeture de certaines connexions non interactives.
max_connections : nombre maximal de connexions simultanées autorisées.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Avec un pool, le connecteur gère généralement la réutilisation des connexions. Cependant, il faut prévoir la gestion des erreurs et des interruptions.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.2. Gérer les erreurs proprement
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`try {
const [rows] = await db.query(
"SELECT * FROM products"
);

console.log(rows);

} catch (error) {
console.error({
code: error.code,
message: error.message
});
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ne tentez pas de relancer aveuglément toutes les requêtes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une erreur de connexion temporaire peut justifier une nouvelle tentative, mais une erreur SQL de syntaxe ou de permission ne sera généralement pas corrigée par une répétition.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour les opérations qui modifient des données, prévoyez également l&apos;idempotence avant toute nouvelle tentative.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Diagnostiquer un pool épuisé
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un pool est épuisé lorsque toutes ses connexions sont occupées et que de nouvelles requêtes doivent attendre.
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Pool limit: 10 connections

Requêtes simultanées :
1, 2, 3, 4, 5, 6, 7, 8, 9, 10

Nouvelle requête :
11 → attente`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        5.1. Cause fréquente : connexion non libérée
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Avec getConnection(), vous devez libérer la connexion après utilisation.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Mauvaise pratique :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`const connection = await pool.getConnection();

const [rows] = await connection.query(
"SELECT * FROM products"
);

// Connexion jamais libérée !`}</code></pre>
      </div>
      <Callout type="tip" title="Bonne pratique ">
        <p className="text-xs sm:text-sm"></p>
      </Callout>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`const connection = await pool.getConnection();

try {
const [rows] = await connection.query(
"SELECT * FROM products"
);

console.log(rows);

} finally {
connection.release();
}
Le bloc finally garantit la libération même si une erreur survient.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        5.2. Examiner les connexions MySQL
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour examiner les connexions :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`SHOW PROCESSLIST;`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour connaître le nombre de connexions actuellement ouvertes :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`SHOW STATUS LIKE 'Threads_connected';`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour connaître le nombre maximal de connexions configurées :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`SHOW VARIABLES LIKE 'max_connections';`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ces commandes permettent de vérifier si le nombre de connexions est anormalement élevé.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Utiliser les logs pour identifier les problèmes
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les logs permettent de suivre les erreurs et leur fréquence.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple de journalisation :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`app.use(async (req, res, next) =&gt; {
const start = Date.now();

res.on("finish", () =&gt; {
console.log({
method: req.method,
url: req.originalUrl,
status: res.statusCode,
duration: Date.now() - start
});
});

next();
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour les erreurs MySQL :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`try {
const [rows] = await db.query(
"SELECT * FROM products"
);

res.json(rows);

} catch (error) {
console.error("DATABASE_ERROR", {
code: error.code,
timestamp: new Date().toISOString()
});

res.status(500).json({
message: "Erreur interne du serveur"
});
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        En production, utilisez un outil de journalisation structuré comme Pino ou Winston.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ne transmettez jamais les détails techniques de l&apos;erreur SQL au Frontend.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Travaux pratiques — Diagnostiquer une connexion MySQL
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TP pratique
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Node.js + Express + MySQL
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Objectif
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créer une API connectée à MySQL, simuler une erreur de connexion et diagnostiquer un problème de pool.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 1 — Préparer la base de données
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans MySQL :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`CREATE DATABASE debug_db;

USE debug_db;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100)
);

INSERT INTO users (name)
VALUES
('Ali'),
('Sara'),
('Youssef');`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créez un utilisateur applicatif :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`CREATE USER 'app_user'@'localhost'
IDENTIFIED BY 'StrongPassword123!';

GRANT SELECT, INSERT, UPDATE, DELETE
ON debug_db.*
TO 'app_user'@'localhost';`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 2 — Créer le projet Node.js
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`mkdir mysql-debug
cd mysql-debug

npm init -y
npm install express mysql2 dotenv
Créez .env :
DB_HOST=localhost
DB_USER=app_user
DB_PASSWORD=StrongPassword123!
DB_NAME=debug_db
DB_PORT=3306
Ajoutez .env à .gitignore :
node_modules/
.env`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 3 — Configurer le pool
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Créez database.js :
require("dotenv").config();

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
host: process.env.DB_HOST,
port: Number(process.env.DB_PORT),
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,

waitForConnections: true,
connectionLimit: 2,
queueLimit: 5
});

module.exports = pool;`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 4 — Créer l&apos;API
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Créez server.js :
const express = require("express");
const db = require("./database");

const app = express();

app.get("/users", async (req, res) =&gt; {
try {
const [rows] = await db.query(
"SELECT * FROM users"
);

res.json(rows);

} catch (error) {
console.error("Erreur DB :", error.code);

res.status(500).json({
message: "Erreur de base de données"
});
}
});

app.get("/health/db", async (req, res) =&gt; {
try {
await db.query("SELECT 1");

res.json({
database: "connected"
});

} catch (error) {
res.status(503).json({
database: "unavailable"
});
}
});

app.listen(3000, () =&gt; {
console.log("Serveur démarré sur le port 3000");
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 5 — Tester les connexions
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Démarrez :
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
        Testez :
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`GET http://localhost:3000/health/db
GET http://localhost:3000/users`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Résultat attendu :
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
"database": "connected"
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 6 — Simuler des erreurs
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Effectuez les tests suivants séparément :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Modification</th>
              <th className="px-4 py-3">Erreur attendue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">1</td>
              <td className="px-4 py-2.5 font-medium">Mauvais port MySQL</td>
              <td className="px-4 py-2.5 font-medium">ECONNREFUSED ou erreur réseau</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">2</td>
              <td className="px-4 py-2.5 font-medium">Mauvais mot de passe</td>
              <td className="px-4 py-2.5 font-medium">ER_ACCESS_DENIED_ERROR</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">3</td>
              <td className="px-4 py-2.5 font-medium">Mauvais nom de base</td>
              <td className="px-4 py-2.5 font-medium">ER_BAD_DB_ERROR</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">4</td>
              <td className="px-4 py-2.5 font-medium">MySQL arrêté</td>
              <td className="px-4 py-2.5 font-medium">Connexion impossible</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Après chaque test, rétablissez la bonne configuration.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 7 — Simuler un problème de pool
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Modifiez temporairement la route /users :
app.get("/users", async (req, res) =&gt; {
const connection = await db.getConnection();

// Simulation : connexion conservée trop longtemps
await new Promise(resolve =&gt;
setTimeout(resolve, 15000)
);

const [rows] = await connection.query(
"SELECT * FROM users"
);

connection.release();

res.json(rows);
});
Avec connectionLimit: 2, envoyez plusieurs requêtes simultanément.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Certaines requêtes vont attendre qu&apos;une connexion se libère.
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
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Attention : cette route est volontairement incorrecte : en cas d'erreur avant release(), la connexion pourrait rester occupée. Ne conservez pas ce code dans votre application.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Corrigé du TP
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Observation</th>
              <th className="px-4 py-3">Diagnostic</th>
              <th className="px-4 py-3">Correction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">ECONNREFUSED</td>
              <td className="px-4 py-2.5 font-medium">MySQL inaccessible</td>
              <td className="px-4 py-2.5 font-medium">Vérifier le service et le port</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">ER_ACCESS_DENIED_ERROR</td>
              <td className="px-4 py-2.5 font-medium">Authentification refusée</td>
              <td className="px-4 py-2.5 font-medium">Vérifier compte et permissions</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">ER_BAD_DB_ERROR</td>
              <td className="px-4 py-2.5 font-medium">Base inexistante ou nom incorrect</td>
              <td className="px-4 py-2.5 font-medium">Vérifier DB_NAME</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Requêtes en attente</td>
              <td className="px-4 py-2.5 font-medium">Pool épuisé</td>
              <td className="px-4 py-2.5 font-medium">Libérer les connexions et adapter le pool</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Connexion perdue</td>
              <td className="px-4 py-2.5 font-medium">Incident réseau ou serveur</td>
              <td className="px-4 py-2.5 font-medium">Gérer les erreurs et les reprises</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Conclusion : une erreur de connexion doit être diagnostiquée à partir de son code, de la configuration et de l&apos;état réel du serveur MySQL.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Mettre en place une surveillance professionnelle
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans une application réelle, ne vous contentez pas de vérifier la connexion lorsqu&apos;un utilisateur rencontre une erreur.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Mettez en place :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Un endpoint de santé de la Base de données.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une surveillance des connexions actives.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Des logs structurés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Des alertes sur les erreurs répétitives.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une mesure du temps d&apos;exécution des requêtes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une gestion des interruptions et des reprises.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Des limites adaptées au pool de connexions.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Health Check et Readiness Check
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il est utile de distinguer deux notions :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Contrôle</th>
              <th className="px-4 py-3">Objectif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Liveness</td>
              <td className="px-4 py-2.5 font-medium">Vérifier que le processus Node.js fonctionne</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Readiness</td>
              <td className="px-4 py-2.5 font-medium">Vérifier que l&apos;application est prête à recevoir du trafic, notamment avec ses dépendances essentielles</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une API peut fonctionner au niveau du processus Node.js tout en étant incapable d&apos;accéder à MySQL.
      </p>
      </section>

      {/* Quiz de révision */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de révision — Chapitre 6.7"
          questions={[
            {
              id: 1,
              question: "Que signifie ECONNREFUSED ?",
              options: ["La connexion réseau est refusée.", "La requête SQL est trop rapide.", "Le mot de passe est toujours correct."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 2,
              question: "Quel est le rôle d'un Connection Pool ?",
              options: ["Stocker les images du Frontend.", "Réutiliser des connexions à la"],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 3,
              question: "Quelle erreur peut indiquer un pool épuisé ?",
              options: ["Une erreur", "Une erreur de syntaxe HTML."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 4,
              question: "Quelle méthode libère une connexion obtenue avec pool.getConnection() ?",
              options: ["connection.release()", "connection.delete()", "connection.remove()"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 5,
              question: "Quelle commande permet d'examiner les connexions MySQL ?",
              options: ["SHOW PRO", "SHOW HTML", "SHOW ROUTES"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 6,
              question: "Quel fichier ne doit pas être envoyé sur GitHub lorsqu'il contient les secrets de connexion ?",
              options: [".env", "server.js", "package.json"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 7,
              question: "Quelle différence existe entre Liveness et Readiness ?",
              options: ["Liveness vérifie le fonctionnement du processus ; Readiness vérifie sa capacité à recevoir du trafic.", "Les deux vérifient uniquement le", "Liveness vérifie MySQL et Readiness vérifie uniquement le Frontend."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
          ]}
        />
      </div>
    </div>
  );
};
