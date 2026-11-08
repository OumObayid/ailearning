'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre12Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 12 — Mettre en place une stratégie de surveillance et de prévention
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chapitre 6.12 — Mettre en place une stratégie de surveillance et de prévention
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
            <span>Comprendre la différence entre surveillance, détection et prévention.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Surveiller les performances et la disponibilité d&apos;une application.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Centraliser les métriques et les logs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Configurer des alertes en cas d&apos;anomalie.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Détecter les incidents avant qu&apos;ils ne deviennent critiques.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre en place une stratégie de surveillance pour un backend Node.js / Express.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comprendre la surveillance d&apos;une application
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La surveillance (Monitoring) consiste à observer continuellement l&apos;état d&apos;une application pour détecter les anomalies et anticiper les incidents.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Elle repose sur trois éléments complémentaires :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Monitoring
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Mesurer
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Alerting
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Alerter
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Prevention
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Protéger
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Monitoring : observer les métriques et les événements.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Alerting : signaler les situations anormales.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Prevention : réduire les risques et éviter les incidents.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un backend reçoit soudainement trop de requêtes.
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le monitoring détecte une augmentation du nombre de requêtes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le système d&apos;alertes signale une saturation possible.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les mécanismes de prévention limitent le trafic et protègent les ressources.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les indicateurs à surveiller
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une stratégie efficace ne consiste pas à surveiller toutes les données disponibles. Il faut choisir les indicateurs qui permettent de détecter les problèmes importants.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.1. Métriques de performance
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Indicateur</th>
              <th className="px-4 py-3">Ce qu&apos;il permet de surveiller</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">CPU Usage</td>
              <td className="px-4 py-2.5 font-medium">Utilisation du processeur.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Memory Usage</td>
              <td className="px-4 py-2.5 font-medium">Consommation mémoire.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Response Time</td>
              <td className="px-4 py-2.5 font-medium">Durée des réponses HTTP.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">P95 / P99</td>
              <td className="px-4 py-2.5 font-medium">Temps de réponse des requêtes les plus lentes.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Throughput</td>
              <td className="px-4 py-2.5 font-medium">Nombre de requêtes traitées par seconde.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Error Rate</td>
              <td className="px-4 py-2.5 font-medium">Pourcentage de requêtes en erreur.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Event Loop Delay</td>
              <td className="px-4 py-2.5 font-medium">Retard de traitement de la boucle événementielle.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.2. Métriques de disponibilité
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Disponibilité du serveur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>État de la base de données.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>État des services externes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Nombre d&apos;échecs de connexion.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>État des files de traitement.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Deux notions sont importantes :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Liveness : le processus fonctionne-t-il encore ?</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Readiness : l&apos;application est-elle prête à recevoir du trafic ?</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un serveur peut être vivant, mais indisponible parce que sa base de données ne répond plus.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.3. Métriques de sécurité
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Nombre d&apos;échecs d&apos;authentification.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Nombre de refus d&apos;accès 403.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Nombre de requêtes suspectes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Modifications de permissions.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Erreurs de validation répétées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Activités inhabituelles sur les comptes administrateurs.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il faut interpréter ces indicateurs dans leur contexte : une augmentation des erreurs 403 n&apos;indique pas automatiquement une attaque.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Les trois piliers de l&apos;observabilité
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        L&apos;observabilité (Observability) permet de comprendre l&apos;état interne d&apos;un système à partir des informations qu&apos;il expose.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Elle repose principalement sur trois piliers.
      </p>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image18.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Metrics — Métriques
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Mesures numériques : CPU, RAM, latence, taux d&apos;erreurs.
      </p>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image16.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Logs — Journaux
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Événements détaillés : erreurs SQL, connexions, refus d&apos;accès.
      </p>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image19.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Traces — Traçabilité
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Suivi d&apos;une requête à travers plusieurs services.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : une requête /api/orders prend quatre secondes.
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>La métrique indique une augmentation de la latence.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le log révèle une erreur ou une requête SQL lente.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>La trace montre que trois secondes sont consommées par l&apos;appel à MySQL.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les trois informations permettent d&apos;identifier plus précisément la cause racine.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Les outils de surveillance
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Voici les principaux outils à connaître pour un environnement Node.js.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Outil</th>
              <th className="px-4 py-3">Fonction principale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Prometheus</td>
              <td className="px-4 py-2.5 font-medium">Collecter et stocker les métriques.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Grafana</td>
              <td className="px-4 py-2.5 font-medium">Créer des tableaux de bord.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">OpenTelemetry</td>
              <td className="px-4 py-2.5 font-medium">Instrumenter les applications.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Sentry</td>
              <td className="px-4 py-2.5 font-medium">Détecter et analyser les erreurs.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Uptime Kuma</td>
              <td className="px-4 py-2.5 font-medium">Vérifier la disponibilité des services.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">OWASP ZAP</td>
              <td className="px-4 py-2.5 font-medium">Tester la sécurité des applications.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image20.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image21.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image22.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il n&apos;est pas nécessaire d&apos;installer tous ces outils. Le choix dépend de la taille du projet et des besoins de surveillance.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Mettre en place la surveillance dans Node.js / Express
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Nous allons ajouter trois mécanismes à un backend :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mesurer les performances.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier la disponibilité.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Enregistrer les événements importants.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        6.1. Collecter les métriques avec Prometheus
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installer la bibliothèque :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install prom-client
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créer metrics.js :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        import client from &quot;prom-client&quot;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const register = new client.Registry();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        client.collectDefaultMetrics(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        register
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {"//"} Mesurer la durée des requêtes HTTP
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const httpDuration = new client.Histogram(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        name: &quot;http_request_duration_seconds&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        help: &quot;Durée des requêtes HTTP&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        labelNames: [&quot;method&quot;, &quot;route&quot;, &quot;status&quot;],
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        register.registerMetric(httpDuration);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        export &#123; register, httpDuration &#125;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les métriques par défaut comprennent notamment des informations sur la mémoire et le processus Node.js.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans server.js :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        import express from &quot;express&quot;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        import &#123; register, httpDuration &#125; from &quot;./metrics.js&quot;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const app = express();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use((req, res, next) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const end = httpDuration.startTimer();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.on(&quot;finish&quot;, () =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        end(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        method: req.method,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        route: req.route?.path || &quot;unmatched&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        status: String(res.statusCode)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        next();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {"//"} Endpoint réservé à la collecte des métriques
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/metrics&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.set(&quot;Content-Type&quot;, register.contentType);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.end(await register.metrics());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/api/products&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json([&#123; id: 1, name: &quot;Clavier&quot; &#125;]);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.listen(3000);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Tester dans le navigateur :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        http://localhost:3000/metrics
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous obtiendrez des mesures que Prometheus pourra collecter.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Remarque : en production, l&apos;endpoint /metrics doit être protégé ou rendu accessible uniquement au réseau de monitoring. Évitez également les labels contenant des identifiants utilisateurs ou des URL dynamiques : ils peuvent produire un nombre excessif de séries temporelles.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        6.2. Mettre en place des Health Checks
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un Health Check permet de vérifier si une application ou un service fonctionne correctement.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Liveness :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vérifie que le processus Node.js est vivant.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/health/live&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.status(200).json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        status: &quot;alive&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Readiness :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vérifie si l&apos;application peut réellement traiter des requêtes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple avec MySQL :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/health/ready&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        try &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        await db.query(&quot;SELECT 1&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.status(200).json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        status: &quot;ready&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        database: &quot;connected&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125; catch (error) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.status(503).json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        status: &quot;not_ready&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Endpoint</th>
              <th className="px-4 py-3">Vérification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">/ health /live</td>
              <td className="px-4 py-2.5 font-medium">Le processus fonctionne.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">/ health / ready</td>
              <td className="px-4 py-2.5 font-medium">L&apos;application est prête à recevoir du trafic.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans un environnement avec orchestrateur, ces deux vérifications peuvent servir à redémarrer un processus défaillant ou à le retirer temporairement du trafic.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Configurer les alertes
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le monitoring devient réellement utile lorsqu&apos;il peut signaler une anomalie.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une alerte peut être déclenchée lorsque :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le CPU dépasse un seuil.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>La mémoire augmente anormalement.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le taux d&apos;erreurs HTTP devient élevé.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le temps de réponse P95 devient trop important.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>La base de données devient indisponible.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les échecs d&apos;authentification se multiplient.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        7.1. Exemple de règle Prometheus
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créer un fichier alerts.yml :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        groups:
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        - name: application-alerts
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        rules:
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        - alert: HighHttpErrorRate
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        expr: |
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        sum(rate(http_requests_total&#123;status=~&quot;5..&quot;&#125;[5m]))
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        /
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        clamp_min(sum(rate(http_requests_total[5m])), 0.001)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &amp;gt; 0.05
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        for: 2m
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        labels:
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        severity: warning
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        annotations:
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        summary: &quot;Taux d&apos;erreurs HTTP élevé&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cette règle déclenche une alerte si plus de 5 % des requêtes HTTP échouent en erreur serveur pendant deux minutes.
      </p>
      <Callout type="warning" title="Attention ">
        <p className="text-xs sm:text-sm">cette règle suppose que la métrique http_requests_total est effectivement exposée avec les labels indiqués. Il faut adapter son nom à l&apos;instrumentation utilisée.</p>
      </Callout>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        7.2. Comprendre les seuils
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les seuils doivent être adaptés à l&apos;application. Voici des exemples pédagogiques, et non des valeurs universelles :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Indicateur</th>
              <th className="px-4 py-3">Exemple de seuil d&apos;alerte</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">CPU</td>
              <td className="px-4 py-2.5 font-medium">Supérieur à 85 % pendant 5 minutes.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Mémoire</td>
              <td className="px-4 py-2.5 font-medium">Hausse continue ou utilisation supérieure à 85 %.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Erreurs HTTP 5xx</td>
              <td className="px-4 py-2.5 font-medium">Supérieures à 5 % pendant 2 minutes.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Latence P95</td>
              <td className="px-4 py-2.5 font-medium">Supérieure à 1 seconde.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Base de données</td>
              <td className="px-4 py-2.5 font-medium">Échec répété du Health Check.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un seuil isolé peut générer de fausses alertes. Il faut tenir compte de la durée, du trafic habituel et de l&apos;impact sur les utilisateurs.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Mettre en place une stratégie de prévention
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Surveiller les incidents ne suffit pas : il faut aussi réduire leur probabilité et leur impact.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Voici les principales protections à intégrer dans un backend Node.js.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        8.1. Limiter le nombre de requêtes
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le Rate Limiting permet de limiter le nombre de requêtes envoyées par un client pendant une période donnée.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installation :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install express-rate-limit
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Configuration :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        import rateLimit from &quot;express-rate-limit&quot;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const limiter = rateLimit(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        windowMs: 15 * 60 * 1000,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        limit: 100,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Trop de requêtes&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(&quot;/api/&quot;, limiter);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cette configuration limite les requêtes à 100 par fenêtre de 15 minutes par client, selon l&apos;identification utilisée par le middleware.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour une application distribuée sur plusieurs instances, un stockage partagé est nécessaire pour appliquer correctement les limites entre les serveurs.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        8.2. Protéger les headers HTTP
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installer Helmet :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install helmet
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        import helmet from &quot;helmet&quot;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(helmet());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Helmet configure plusieurs headers HTTP qui contribuent à réduire certains risques liés au navigateur.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        8.3. Sécuriser les données et les accès
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser des requêtes SQL préparées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Valider les entrées avec Zod.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier les permissions côté serveur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Stocker les secrets dans des variables d&apos;environnement.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser HTTPS.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre à jour les dépendances.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Effectuer des sauvegardes régulières.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Limiter les privilèges des comptes système et SQL.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        8.4. Prévoir une stratégie de sauvegarde
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une sauvegarde permet de récupérer les données après une erreur, une suppression accidentelle ou un incident de sécurité.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il faut prévoir :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Des sauvegardes régulières.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une copie isolée du serveur principal.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une durée de conservation adaptée.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Des tests de restauration.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une sauvegarde qui n&apos;a jamais été testée ne garantit pas que les données pourront être récupérées.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Construire une stratégie complète de surveillance
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Voici une architecture simplifiée pour un backend Node.js avec MySQL.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Utilisateurs / Frontend React
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Requêtes HTTP
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Backend Node.js / Express
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Sécurité
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation, auth, rate limiting
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Monitoring
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CPU, RAM, latence, erreurs
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Logs
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Winston, événements
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Health Checks
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Disponibilité des services
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        MySQL
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Données et transactions
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Plateforme de surveillance
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Prometheus
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Collecte des métriques
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Grafana
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Tableaux de bord
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Loki
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Recherche des logs
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Alerting
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Notifications et incidents
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        L&apos;objectif est de pouvoir répondre rapidement à quatre questions :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>L&apos;application fonctionne-t-elle ?</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ses performances sont-elles normales ?</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Y a-t-il une activité suspecte ?</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Quelle est la cause de l&apos;incident ?</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. TP pratique — Mettre en place une surveillance minimale d&apos;une API Express
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TP pratique
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Difficulté : intermédiaire
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Objectif : construire une petite API qui expose ses métriques, vérifie son état et limite les requêtes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 1 — Préparer le projet
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        mkdir monitoring-api
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        cd monitoring-api
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm init -y
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install express prom-client helmet express-rate-limit
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans package.json, ajouter :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;type&quot;: &quot;module&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 2 — Créer le serveur
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créer server.js :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        import express from &quot;express&quot;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        import helmet from &quot;helmet&quot;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        import rateLimit from &quot;express-rate-limit&quot;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        import client from &quot;prom-client&quot;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const app = express();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(express.json());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(helmet());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {"//"} Limitation des requêtes
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(&quot;/api/&quot;, rateLimit(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        windowMs: 15 * 60 * 1000,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        limit: 100
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;));
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {"//"} Métriques Prometheus
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const register = new client.Registry();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        client.collectDefaultMetrics(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        register
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const requests = new client.Counter(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        name: &quot;api_requests_total&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        help: &quot;Nombre de requêtes API&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        labelNames: [&quot;method&quot;, &quot;status&quot;]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        register.registerMetric(requests);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {"//"} Middleware de mesure
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use((req, res, next) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.on(&quot;finish&quot;, () =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        requests.inc(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        method: req.method,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        status: String(res.statusCode)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        next();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {"//"} Liveness
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/health/live&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123; status: &quot;alive&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {"//"} Route API
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/api/products&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json([
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#123; id: 1, name: &quot;Clavier&quot; &#125;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#123; id: 2, name: &quot;Souris&quot; &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ]);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {"//"} Métriques
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/metrics&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.set(&quot;Content-Type&quot;, register.contentType);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.end(await register.metrics());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.listen(3000, () =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        console.log(&quot;API démarrée sur le port 3000&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 3 — Tester les endpoints
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Démarrer :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        node server.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Tester les trois adresses :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">URL</th>
              <th className="px-4 py-3">Résultat attendu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">http://localhost:3000/health/live</td>
              <td className="px-4 py-2.5 font-medium">État du serveur.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">http://localhost:3000/api/products</td>
              <td className="px-4 py-2.5 font-medium">Liste des produits.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">http://localhost:3000/metrics</td>
              <td className="px-4 py-2.5 font-medium">Métriques Prometheus .</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 4 — Simuler une charge
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans PowerShell, exécuter plusieurs requêtes :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        1..150 | ForEach-Object &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Invoke-WebRequest http://localhost:3000/api/products
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Selon la configuration et la durée d&apos;exécution, certaines requêtes seront limitées.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous pourrez ensuite consulter :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        http://localhost:3000/metrics
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Rechercher la métrique :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        api_requests_total
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Elle permet de compter les requêtes traitées par code HTTP.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 5 — Analyser les résultats
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Répondre aux questions suivantes :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le serveur est-il toujours vivant après les tests ?</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Combien de requêtes ont été traitées ?</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les requêtes ont-elles été limitées ?</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Quel code HTTP est retourné lorsque la limite est dépassée ?</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comment ajouter un Health Check qui vérifie aussi MySQL ?</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Corrigé attendu
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le serveur reste disponible tant que son processus fonctionne.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>api_requests_total permet d&apos;observer les requêtes enregistrées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le Rate Limiting limite le trafic selon sa configuration.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les requêtes refusées par le middleware reçoivent généralement 429 Too Many Requests.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Pour vérifier MySQL, ajouter un endpoint Readiness qui exécute une requête simple comme SELECT 1.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Limite du TP : il s&apos;agit d&apos;une instrumentation minimale. Pour un véritable monitoring, il faudra connecter Prometheus, créer des tableaux de bord Grafana et configurer les alertes.
      </p>
      </section>

      {/* Quiz de révision */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de révision — Chapitre 6.12"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle du monitoring ?",
              options: ["Supprimer automatiquement toutes les erreurs.", "Observer l'état et les performances d'une application.", "Remplacer le backend."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 2,
              question: "Quels sont les trois piliers principaux de l'observabilité ?",
              options: ["Metrics, Logs, Traces.", "HTML,"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 3,
              question: "Quelle différence existe entre Liveness et Readiness ?",
              options: ["Liveness vérifie que le processus fonctionne ; Readiness vérifie qu'il peut recevoir du trafic.", "Les deux sont identiques.", "Readiness vérifie uniquement la mémoire."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 4,
              question: "Quel outil collecte les métriques dans l'architecture étudiée ?",
              options: ["Prometheus.", "React.", "MySQL Workbench."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 5,
              question: "Quel est le rôle du Rate Limiting ?",
              options: ["Limiter le nombre de requêtes envoyées par un client.", "Supprimer les logs."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 6,
              question: "Pourquoi tester régulièrement les sauvegardes ?",
              options: ["Pour vérifier que les données peuvent réellement être restaurées.", "Pour réduire le nombre de requêtes HTTP.", "Pour désactiver les permissions."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 7,
              question: "Une application peut-elle être vivante mais non prête ?",
              options: ["Non.", "Oui, par exemple lorsque sa base de données est indisponible.", "Uniquement si React est arrêté."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
          ]}
        />
      </div>
    </div>
  );
};
