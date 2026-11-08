'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Comprendre les performances d&apos;une application
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre les composantes des performances d&apos;une application Web.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Différencier précisément les goulots d&apos;étranglement Frontend, Backend et Base de données.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mesurer les indicateurs clés : Response Time, TTFB, Latence et Percentiles P50/P95/P99.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser Chrome DevTools (Network, Performance, Lighthouse) et performance.now() dans Node.js.</span>
          </li>
        </ul>
      </section>

      {/* 2. Comprendre les performances */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Trajectoire d&apos;exécution et localisation des lenteurs
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
          Les performances représentent la capacité d&apos;une application à exécuter ses opérations rapidement, efficacement et de manière stable sous différentes charges. Prenons une architecture classique (React, Express, MySQL) :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <div className="text-xl">💻</div>
            <div className="font-bold text-slate-950 font-sans">1. Client React</div>
            <p className="text-slate-600 font-sans text-[11px]">Scripting JS &amp; DOM</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <div className="text-xl">🌐</div>
            <div className="font-bold text-slate-950 font-sans">2. Réseau</div>
            <p className="text-slate-600 font-sans text-[11px]">DNS, TCP, TLS, TTFB</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border-2 border-emerald-300 bg-emerald-50/50 space-y-1">
            <div className="text-xl">⚡</div>
            <div className="font-bold text-emerald-900 font-sans">3. Node.js</div>
            <p className="text-slate-600 font-sans text-[11px]">Event Loop &amp; CPU</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <div className="text-xl">🗄️</div>
            <div className="font-bold text-slate-950 font-sans">4. MySQL</div>
            <p className="text-slate-600 font-sans text-[11px]">Scan tables, Index</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <div className="text-xl">📱</div>
            <div className="font-bold text-slate-950 font-sans">5. Rendu React</div>
            <p className="text-slate-600 font-sans text-[11px]">Re-renders &amp; Paint</p>
          </div>
        </div>

        <Callout type="warning" title="Règle d'or du diagnostic de performance">
          Ne concluez jamais qu&apos;une application est lente avant d&apos;avoir mesuré et identifié avec certitude à quelle étape de la chaîne le temps est consommé.
        </Callout>
      </section>

      {/* 3. Les trois catégories de performances */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les trois catégories de performances
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white space-y-2">
            <span className="font-bold text-sm text-slate-950 block">3.1. Performances Frontend</span>
            <ul className="space-y-1.5 text-slate-700">
              <li>• Bundles JavaScript trop volumineux.</li>
              <li>• Re-rendus inutiles de composants React.</li>
              <li>• Calculs synchrones répétés lors de chaque render.</li>
              <li>• Ressources bloquant l&apos;affichage initial (CSS/Fonts).</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 space-y-2">
            <span className="font-bold text-sm text-emerald-900 block">3.2. Performances Backend</span>
            <ul className="space-y-1.5 text-slate-700">
              <li>• Boucles synchrones bloquant l&apos;Event Loop.</li>
              <li>• Traitements de hachage CPU intensifs sur le main thread.</li>
              <li>• Appels API externes synchronisés en cascade.</li>
              <li>• Saturation de la mémoire Heap V8.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white space-y-2">
            <span className="font-bold text-sm text-slate-950 block">3.3. Base de données</span>
            <ul className="space-y-1.5 text-slate-700">
              <li>• Requêtes sans index (Full Table Scan `ALL`).</li>
              <li>• Problème N+1 requêtes au lieu de jointures SQL.</li>
              <li>• Récupération massive (`SELECT *` sans pagination).</li>
              <li>• Épuisement du pool de connexions (`mysql2`).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Indicateurs & Percentiles */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Indicateurs essentiels &amp; Percentiles P50, P95, P99
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black border-b border-slate-300">
              <tr>
                <th className="p-3">Indicateur</th>
                <th className="p-3">Signification &amp; Impact</th>
                <th className="p-3">Seuil indicatif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-700">TTFB (Time to First Byte)</td>
                <td className="p-3">Délai avant réception du 1er octet (réseau + temps serveur Backend)</td>
                <td className="p-3">&lt; 200 ms (idéal)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-700">Response Time</td>
                <td className="p-3">Temps total nécessaire pour terminer la transaction HTTP complète</td>
                <td className="p-3">&lt; 500 ms</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-700">Throughput (RPS)</td>
                <td className="p-3">Nombre de requêtes traitées par seconde avec succès</td>
                <td className="p-3">Dépend de la capacité</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-700">P95 / P99</td>
                <td className="p-3">Temps sous lequel 95% / 99% des requêtes se terminent (isole les requêtes traînantes)</td>
                <td className="p-3">Évite l&apos;illusion de la moyenne</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="info" title="Pourquoi la moyenne est trompeuse">
          Sur 100 requêtes, 99 répondent en 50 ms et 1 seule prend 10 secondes. La moyenne donne ~150 ms (semblant acceptable), alors que le 99e percentile (P99 = 10 000 ms) révèle une anomalie critique subie par vos utilisateurs.
        </Callout>
      </section>

      {/* 5. Chrome DevTools */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Mesurer les performances avec Chrome DevTools
        </h2>
        <p className="text-xs sm:text-sm text-slate-800">
          L&apos;onglet <strong>Performance</strong> de Chrome DevTools permet d&apos;enregistrer une trace temporelle détaillée des calculs JavaScript, des micro-tâches, des calculs de style et des opérations de peinture (Paint).
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-slate-300 overflow-hidden bg-slate-900 p-2">
            <Image
              src="/images/cours/debugging/module-6/image1.jpeg"
              alt="Chrome DevTools Performance panel overview"
              width={1000}
              height={500}
              className="rounded-xl w-full h-auto"
            />
            <p className="text-[11px] text-slate-400 text-center mt-2 font-mono">
              Figure 6.1.A — Enregistrement d&apos;une trace d&apos;exécution complète dans Chrome DevTools Performance.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 overflow-hidden bg-slate-900 p-2">
            <Image
              src="/images/cours/debugging/module-6/image2.jpeg"
              alt="Chrome DevTools Long Task timeline"
              width={1000}
              height={500}
              className="rounded-xl w-full h-auto"
            />
            <p className="text-[11px] text-slate-400 text-center mt-2 font-mono">
              Figure 6.1.B — Détection d&apos;une Long Task rouge (&gt; 50 ms) bloquant le thread principal du navigateur.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TP rapide */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. TP d&apos;application : Mesure de temps Express avec performance.now()
        </h2>
        <div className="rounded-2xl bg-slate-950 p-4 text-xs font-mono text-slate-200 space-y-2">
          <div className="text-emerald-400 font-bold">{`// server.js — Middleware de profilage de temps d'exécution`}</div>
          <pre className="text-slate-300 overflow-x-auto whitespace-pre">
{`const express = require('express');
const { performance } = require('node:perf_hooks');
const app = express();

app.use((req, res, next) => {
  const start = performance.now();
  res.on('finish', () => {
    const duration = performance.now() - start;
    console.log({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: \`\${duration.toFixed(2)} ms\`
    });
  });
  next();
});`}
          </pre>
        </div>
      </section>

      {/* Quiz */}
      <QuickQuiz
        question="Que permet d'isoler l'indicateur P99 par rapport à une simple moyenne arithmétique ?"
        options={[
          "La consommation totale de RAM du processus serveur.",
          "Le temps d'exécution maximal sous lequel se terminent 99% des requêtes, isolant les requêtes les plus lentes.",
          "Le taux d'erreurs 500 sur le réseau uniquement.",
          "La bande passante totale consommée par les fichiers statiques."
        ]}
        correctIndex={1}
        explanation="Le P99 (99e percentile) isole les 1% des requêtes les plus lentes qui sont souvent masquées par une moyenne arithmétique rassurante."
      />
    </div>
  );
};

