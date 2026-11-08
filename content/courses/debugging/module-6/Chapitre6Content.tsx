'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Comprendre les problèmes de charge et de saturation serveur
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chapitre 6.6 — Comprendre les problèmes de charge et de saturation serveur
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
            <span>Comprendre pourquoi un serveur devient lent ou indisponible.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les signes de saturation CPU, RAM, réseau et connexions.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Analyser le comportement d&apos;un serveur sous forte charge.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser des outils de surveillance et de test de charge.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le rôle du Load Balancing, du Scaling et du Rate Limiting.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Diagnostiquer et corriger les problèmes de capacité d&apos;un serveur Node.js.</span>
          </li>
        </ul>
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Comprendre la charge d&apos;un serveur
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La charge serveur représente le volume de travail qu&apos;un serveur doit traiter pendant une période donnée.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une application peut fonctionner normalement avec 10 utilisateurs, mais rencontrer des difficultés avec 1 000 utilisateurs simultanés.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : une plateforme e-commerce reçoit soudainement 5 000 visiteurs après une campagne publicitaire.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chaque utilisateur peut déclencher plusieurs opérations :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Charger les produits.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Consulter les catégories.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ajouter un produit au panier.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier le stock.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Effectuer un paiement.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le serveur doit traiter toutes ces requêtes, parfois simultanément.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La saturation serveur apparaît lorsque les ressources disponibles ne permettent plus de traiter correctement la charge reçue.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        How to solve a system failure during a big event? | by TFM | Jun, 2026 | Medium
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        medium.com
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        1.1. Comprendre les indicateurs de charge
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Indicateur</th>
              <th className="px-4 py-3">Signification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Requests per Second (RPS)</td>
              <td className="px-4 py-2.5 font-medium">Nombre de requêtes reçues par seconde</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Concurrent Users</td>
              <td className="px-4 py-2.5 font-medium">Nombre d&apos;utilisateurs actifs simultanément</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">CPU Usage</td>
              <td className="px-4 py-2.5 font-medium">Utilisation du processeur</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Memory Usage</td>
              <td className="px-4 py-2.5 font-medium">Consommation mémoire</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Response Time</td>
              <td className="px-4 py-2.5 font-medium">Temps de réponse</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Error Rate</td>
              <td className="px-4 py-2.5 font-medium">Pourcentage de requêtes en erreur</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Throughput</td>
              <td className="px-4 py-2.5 font-medium">Quantité de travail traitée pendant une période</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Mesure</th>
              <th className="px-4 py-3">Situation normale</th>
              <th className="px-4 py-3">Saturation possible</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">CPU</td>
              <td className="px-4 py-2.5 font-medium">25 %</td>
              <td className="px-4 py-2.5 font-medium">98 %</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">RAM</td>
              <td className="px-4 py-2.5 font-medium">40 %</td>
              <td className="px-4 py-2.5 font-medium">95 %</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Response Time</td>
              <td className="px-4 py-2.5 font-medium">150 ms</td>
              <td className="px-4 py-2.5 font-medium">5 000 ms</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Error Rate</td>
              <td className="px-4 py-2.5 font-medium">0,1 %</td>
              <td className="px-4 py-2.5 font-medium">15 %</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ces valeurs sont illustratives. Un serveur peut être saturé sans atteindre 100 % de CPU, par exemple lorsqu&apos;il attend des connexions à la base de données.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Identifier les causes de saturation
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        2.1. Saturation CPU
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le processeur ne dispose plus d&apos;assez de capacité pour exécuter les traitements demandés.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Causes fréquentes :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Calculs intensifs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Boucles coûteuses.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Algorithmes inefficaces.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Traitement massif de fichiers.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Trop de traitements simultanés.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptômes :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>CPU proche de 100 %.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Temps de réponse qui augmente.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Event Loop retardée dans Node.js.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Requêtes qui s&apos;accumulent.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        2.2. Saturation mémoire
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le serveur manque de RAM disponible.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Causes possibles :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Fuites mémoire.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Cache trop volumineux.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Trop de données conservées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Trop de processus.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Chargement de fichiers volumineux en mémoire.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptômes :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mémoire presque entièrement utilisée.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Garbage Collector très actif.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Erreurs JavaScript heap out of memory.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Processus arrêté par le système.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        2.3. Saturation des connexions
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un serveur peut disposer de suffisamment de CPU et de RAM, mais manquer de connexions disponibles vers une ressource.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Pool de connexions MySQL épuisé.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Trop de connexions HTTP simultanées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Limite de connexions atteinte sur le serveur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Requêtes qui attendent la libération d&apos;une connexion.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        2.4. Saturation réseau
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les ressources réseau peuvent également devenir un goulot d&apos;étranglement.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Bande passante insuffisante.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Réponses HTTP trop volumineuses.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Trop de transferts simultanés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Latence importante entre le Backend et la Base de données.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comprendre la différence entre charge et capacité
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un serveur possède une capacité limitée.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Imaginons qu&apos;une API puisse traiter 200 requêtes par seconde dans des conditions données.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple de capacité
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        150 RPS
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Charge reçue : 100 requêtes par seconde
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Charge reçue : 150 requêtes par seconde
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Charge reçue : 250 requêtes par seconde
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple pédagogique : la charge dépasse la capacité mesurée de 200 RPS.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Lorsque les requêtes arrivent plus rapidement que le serveur ne peut les traiter, une file d&apos;attente peut se former.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Conséquences :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les requêtes attendent plus longtemps.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les temps de réponse augmentent.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les clients peuvent subir des délais d&apos;attente.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Certaines requêtes échouent.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le serveur peut devenir indisponible.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Notion importante : la capacité réelle n&apos;est pas un nombre fixe. Elle dépend de la complexité des requêtes, des ressources disponibles, de la Base de données et des objectifs de temps de réponse.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Diagnostiquer une saturation serveur
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le diagnostic doit permettre de déterminer quelle ressource est responsable.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.1. Examiner les ressources système
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Sous Windows :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ouvrez le Gestionnaire des tâches.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Examinez les colonnes CPU, Mémoire, Disque et Réseau.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifiez les processus qui consomment le plus de ressources.</span>
          </li>
        </ul>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image8.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Sous Linux :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        top
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        htop
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        free -h
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour examiner les connexions réseau :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ss -s
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour afficher les connexions TCP :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ss -tan
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.2. Surveiller Node.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous pouvez réutiliser les mesures des chapitres précédents :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const memory = process.memoryUsage();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const cpu = process.cpuUsage();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        console.log(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        rss: (memory.rss / 1024 / 1024).toFixed(2) + &quot; MB&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        heapUsed: (memory.heapUsed / 1024 / 1024).toFixed(2) + &quot; MB&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        cpu
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour surveiller les retards de l&apos;Event Loop :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        monitorEventLoopDelay
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125; = require(&quot;node:perf_hooks&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const histogram = monitorEventLoopDelay(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        resolution: 20
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        histogram.enable();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        setInterval(() =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        console.log(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        eventLoopDelay:
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        (histogram.mean / 1e6).toFixed(2) + &quot; ms&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        histogram.reset();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;, 5000);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ces mesures permettent de détecter certaines formes de saturation, mais elles doivent être associées aux métriques système et aux temps de réponse HTTP.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Tester la capacité d&apos;un serveur avec un outil de charge
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour comprendre le comportement d&apos;une application sous forte charge, il faut simuler plusieurs utilisateurs.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        On parle de Load Testing (test de charge).
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Quelques outils connus :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Apache JMeter
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Permet de simuler des utilisateurs et des requêtes HTTP avec des scénarios de test.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Permet de créer des scénarios de charge en JavaScript.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Documentation officielle
      </p>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image9.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Autocannon
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Outil simple pour tester les performances d&apos;une API HTTP.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Documentation GitHub
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        5.1. Exemple avec Autocannon
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installez Autocannon :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install -g autocannon
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Démarrez votre serveur Express, puis exécutez :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        autocannon -c 50 -d 30 http://localhost:3000/api/products
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Signification :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>-c 50 : 50 connexions simultanées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>-d 30 : durée du test de 30 secondes.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les résultats permettent notamment d&apos;observer :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le nombre de requêtes traitées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le débit en requêtes par seconde.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les temps de réponse.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les erreurs éventuelles.</span>
          </li>
        </ul>
      <Callout type="warning" title="Attention ">
        <p className="text-xs sm:text-sm">50 connexions ne représentent pas nécessairement 50 utilisateurs réels. Il s&apos;agit d&apos;une configuration de génération de charge.</p>
      </Callout>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Comprendre les solutions à la saturation
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        6.1. Optimiser le code
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Avant d&apos;ajouter des serveurs, examinez les causes du problème :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Optimiser les algorithmes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Réduire les traitements inutiles.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser les index SQL.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Éviter les requêtes répétitives.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre en cache les données pertinentes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déporter les calculs CPU intensifs vers des Worker Threads.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        6.2. Utiliser le Load Balancing
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le Load Balancer répartit les requêtes entre plusieurs serveurs.
      </p>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image10.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Utilisateurs
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        |
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        v
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Load Balancer
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        /    |    \
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        v     v     v
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Serveur  Serveur  Serveur
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        1       2       3
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        \     |     /
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        v
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Base SQL
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Avantages :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Répartition de la charge.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Meilleure capacité globale.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Possibilité de maintenir plusieurs instances.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Amélioration de la disponibilité si la configuration est adaptée.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        6.3. Comprendre le Scaling
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il existe deux grandes stratégies.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Principe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Vertical Scaling</td>
              <td className="px-4 py-2.5 font-medium">Augmenter les ressources d&apos;un serveur</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Horizontal Scaling</td>
              <td className="px-4 py-2.5 font-medium">Ajouter plusieurs serveurs ou instances</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Horizontal vs Vertical Scaling: Which Strategy is Right for You?
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vertical Scaling
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Augmenter CPU, RAM ou capacité d&apos;une machine.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Software scalability: 6 dev and operations factors to consider for meeting high demands
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Horizontal Scaling
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ajouter des instances pour répartir le travail.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        6.4. Utiliser le Rate Limiting
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le Rate Limiting limite le nombre de requêtes qu&apos;un client peut envoyer pendant une période donnée.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : limiter un client à 100 requêtes par minute.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Avec Express, vous pouvez utiliser express-rate-limit :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install express-rate-limit
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const rateLimit = require(&quot;express-rate-limit&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const limiter = rateLimit(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        windowMs: 60 * 1000,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        limit: 100,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Trop de requêtes, réessayez plus tard.&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(&quot;/api&quot;, limiter);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cela protège notamment les routes contre les appels excessifs.
      </p>
      <Callout type="warning" title="Attention ">
        <p className="text-xs sm:text-sm">avec plusieurs instances de serveur, un stockage partagé est nécessaire pour appliquer une limite cohérente entre les instances. Redis peut notamment être utilisé.</p>
      </Callout>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Comprendre les files d&apos;attente et les traitements asynchrones
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Certaines opérations ne doivent pas être exécutées directement pendant une requête HTTP.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Génération de rapports volumineux.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Traitement d&apos;images.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Envoi massif d&apos;e-mails.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Analyse de documents avec Gemini.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Export de fichiers Excel ou PDF.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une solution consiste à utiliser une Queue (file d&apos;attente).
      </p>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image11.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Principe :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le Backend reçoit la demande.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Il ajoute un travail dans une file d&apos;attente.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Un Worker récupère le travail.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Il exécute le traitement.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le résultat est enregistré ou transmis à l&apos;utilisateur.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Technologies possibles :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Redis + BullMQ.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>RabbitMQ.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Apache Kafka pour certains systèmes distribués.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cela permet de séparer les requêtes HTTP des traitements longs.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Travaux pratiques — Simuler la saturation d&apos;une API Express
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TP pratique
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Node.js + Express + Autocannon
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Objectif
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créer une API avec deux routes :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une route rapide.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une route qui effectue un calcul CPU intensif.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Puis comparer leur comportement sous charge.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 1 — Créer le projet
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        mkdir server-load-test
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        cd server-load-test
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm init -y
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install express
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install -g autocannon
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 2 — Créer le serveur
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créez server.js :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const express = require(&quot;express&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const app = express();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/api/fast&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Réponse rapide&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/api/slow&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        let result = 0;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        for (let i = 0; i &amp;lt; 50000000; i++) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        result += Math.sqrt(i);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Calcul terminé&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        result
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.listen(3000, () =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        console.log(&quot;Serveur sur le port 3000&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 3 — Tester la route rapide
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Démarrez le serveur :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        node server.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans un autre terminal :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        autocannon -c 20 -d 15 http://localhost:3000/api/fast
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Observez :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le débit.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les temps de réponse.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les erreurs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>La consommation CPU.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 4 — Tester la route lente
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        autocannon -c 20 -d 15 http://localhost:3000/api/slow
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Comparez les résultats avec la route rapide.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous devriez observer que les calculs CPU intensifs ralentissent fortement le traitement des requêtes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 5 — Observer le serveur
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Sous Windows :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ouvrez le Gestionnaire des tâches.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifiez node.exe.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Observez sa consommation CPU et mémoire.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Sous Linux :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        top
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Observez également les temps de réponse et les éventuelles erreurs.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 6 — Corriger le problème
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La route /api/slow effectue un calcul synchrone sur le thread principal.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour une véritable correction, déplacez le calcul dans un Worker Thread.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Architecture cible :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Requête HTTP
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        |
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        v
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Serveur Express
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        |
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        v
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Worker Thread
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        |
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        v
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Calcul intensif
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        |
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        v
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Résultat
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        |
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        v
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Réponse HTTP
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous pouvez également créer un pool de Workers plutôt que de créer un nouveau thread pour chaque requête.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Corrigé du TP
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Observation</th>
              <th className="px-4 py-3">Diagnostic</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">/api/fast répond rapidement</td>
              <td className="px-4 py-2.5 font-medium">Traitement léger</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">/api/slow consomme beaucoup de CPU</td>
              <td className="px-4 py-2.5 font-medium">Calcul intensif</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Les requêtes rapides ralentissent pendant /api/slow</td>
              <td className="px-4 py-2.5 font-medium">Event Loop bloquée</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">CPU élevé</td>
              <td className="px-4 py-2.5 font-medium">Saturation CPU possible</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Worker Thread</td>
              <td className="px-4 py-2.5 font-medium">Permet de déporter le calcul</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Conclusion : un serveur peut devenir lent même si les routes HTTP sont simples, lorsqu&apos;un traitement CPU intensif bloque le thread principal de Node.js.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Bonnes pratiques professionnelles
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mesurer le comportement de l&apos;application sous charge.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Surveiller CPU, RAM, réseau et connexions.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Définir des objectifs de performance (SLO).</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Optimiser le code avant d&apos;augmenter les ressources.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser un pool de connexions MySQL adapté.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déporter les traitements longs vers des Workers ou des files d&apos;attente.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre en place un Rate Limiting.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser un Load Balancer lorsque plusieurs instances sont nécessaires.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Prévoir des mécanismes de reprise après panne.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Effectuer les tests de charge dans un environnement contrôlé.</span>
          </li>
        </ul>
      <Callout type="warning" title="Attention ">
        <p className="text-xs sm:text-sm">ne lancez pas un test de charge important sur un serveur de production sans autorisation et sans définir de limites. Vous pourriez rendre le service indisponible pour les utilisateurs.</p>
      </Callout>
      </section>

      {/* Quiz de révision */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de révision — Chapitre 6.6"
          questions={[
            {
              id: 1,
              question: "Qu'est-ce que la saturation serveur ?",
              options: ["Un serveur qui reçoit une seule requête.", "Un serveur dont les ressources ne suffisent plus à traiter correctement la charge.", "Un problème uniquement lié au"],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 2,
              question: "Que signifie RPS ?",
              options: ["Requests Per Second.", "R", "Response Processing System."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 3,
              question: "Quel mécanisme répartit les requêtes entre plusieurs serveurs ?",
              options: ["Garbage", "Load", "LocalStorage."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 4,
              question: "Quelle est la différence entre Scaling vertical et horizontal ?",
              options: ["Vertical : augmenter les ressources d'une machine ; horizontal : ajouter des instances.", "Vertical : ajouter des utilisateurs ; horizontal : supprimer la R", "Les deux sont identiques."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 5,
              question: "Quel outil permet de simuler une charge HTTP avec Node.js ?",
              options: ["Prettier.", "Nodemon."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 6,
              question: "Quel est le rôle du Rate Limiting ?",
              options: ["Limiter le nombre de requêtes autorisées pendant une période.", "Supprimer les transactions SQL."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 7,
              question: "Pourquoi utiliser une file d'attente pour un traitement long ?",
              options: ["Pour séparer les traitements longs des requêtes HTTP.", "Pour désactiver la", "Pour supprimer le"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
          ]}
        />
      </div>
    </div>
  );
};
