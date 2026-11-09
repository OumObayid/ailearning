'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { WorkerThreadsLab } from '@/components/interactive/WorkerThreadsLab';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Web Workers et Worker Threads
        </h1>
      </div>

      {/* 1. Pourquoi des Workers ? */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi avons-nous besoin de Workers ?
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Lorsqu&apos;une application React ou une API Node.js exécute un traitement mathématique ou une analyse de plusieurs millions de lignes directement sur son thread principal, l&apos;expérience s&apos;effondre : l&apos;interface utilisateur gèle, les boutons ne répondent plus et le serveur ne peut plus traiter aucune requête :
        </p>

        {/* IMAGE 6 : Frozen UI vs Responsive UI */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/frozen-ui-vs-responsive-ui.jpeg"
              alt="Comparaison Frozen UI sans Web Workers contre Responsive UI avec Web Workers"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.6 � Impact d&apos;un Worker : à gauche, le thread principal saturé fige l&apos;UI ; à droite, le Worker traite la tâche en tâche de fond et garde l&apos;interface 100% fluide.
          </p>
        </div>
      </section>

      {/* 2. Web Workers dans React */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les Web Workers : Les threads dans le navigateur (Frontend React)
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Un <strong>Web Worker</strong> s&apos;exécute dans un thread d&apos;arrière-plan isolé dans le navigateur. Il communique avec React via le passage de messages sérialisés (<code className="font-mono font-bold text-indigo-700">postMessage</code>) :
        </p>

        {/* IMAGE 7 : Web Workers Message Passing */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/web-workers-message-passing.jpeg"
              alt="Architecture Web Workers dans le navigateur avec Main Thread et Worker Threads"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.7 � Communication asynchrone par messages entre le Main Thread (DOM, événements, rendu) et le Web Worker (calculs lourds).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} src/workers/calculWorker.js</span>
            <pre className="font-mono text-xs leading-relaxed text-indigo-100 overflow-x-auto">
{`self.onmessage = (event) => {
  const nombre = event.data;
  let resultat = 0;
  for (let i = 0; i < nombre; i++) {
    resultat += i;
  }
  self.postMessage(resultat);
};`}
            </pre>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-emerald-300 font-bold block mb-2">{'//'} src/App.jsx (React)</span>
            <pre className="font-mono text-xs leading-relaxed text-emerald-100 overflow-x-auto">
{`import { useState } from "react";

export default function App() {
  const [resultat, setResultat] = useState(null);

  const lancerCalcul = () => {
    const worker = new Worker(
      new URL("./workers/calculWorker.js", import.meta.url),
      { type: "module" }
    );
    worker.postMessage(100000000);
    worker.onmessage = (e) => {
      setResultat(e.data);
      worker.terminate();
    };
  };

  return <button onClick={lancerCalcul}>Calculer</button>;
}`}
            </pre>
          </div>
        </div>

        <Callout type="info" title="Règle d'or des Web Workers">
          <p>
            Un Web Worker <strong>n&apos;a aucun accès au DOM</strong> (pas de <code className="font-bold">window</code>, ni <code className="font-bold">document</code>). C&apos;est le composant React qui, recevant la réponse via <code className="font-bold">onmessage</code>, met à jour le state et déclenche le re-rendu de l&apos;interface.
          </p>
        </Callout>
      </section>

      {/* Laboratoire interactif */}
      <WorkerThreadsLab />

      {/* 3. Worker Threads dans Node.js */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les Worker Threads : Les threads dans Node.js (Backend)
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Côté serveur, Node.js propose le module natif <code className="font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded text-indigo-950">node:worker_threads</code>. Contrairement aux Web Workers, les Worker Threads ont accès au moteur d&apos;E/S de Node.js et peuvent exécuter des tâches CPU de fond en utilisant les capacités multi-c�urs du processeur :
        </p>

        {/* IMAGE 8 : Worker Threads Backend Server */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/worker-threads-backend-server.jpeg"
              alt="Serveur backend Node.js avec processeur multi-c�urs et base de données"
              width={800}
              height={400}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.8 � Worker Threads côté serveur : exploitation directe des c�urs CPU pour traiter les calculs sans bloquer l&apos;Event Loop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} calculWorker.js (Backend)</span>
            <pre className="font-mono text-xs leading-relaxed text-indigo-100 overflow-x-auto">
{`const { parentPort } = require("node:worker_threads");

parentPort.on("message", (nombre) => {
  let resultat = 0;
  for (let i = 0; i < nombre; i++) {
    resultat += i;
  }
  parentPort.postMessage(resultat);
});`}
            </pre>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-emerald-300 font-bold block mb-2">{'//'} server.js (Main Thread)</span>
            <pre className="font-mono text-xs leading-relaxed text-emerald-100 overflow-x-auto">
{`const { Worker } = require("node:worker_threads");

console.log("Thread principal actif");
const worker = new Worker("./calculWorker.js");

worker.postMessage(100000000);
worker.on("message", (res) => {
  console.log("Résultat calculé :", res);
});

console.log("Le serveur continue de servir !");`}
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Tableau comparatif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Tableau comparatif : Web Workers vs Worker Threads
        </h2>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Caractéristique</th>
                <th className="p-3.5">Web Worker (Frontend)</th>
                <th className="p-3.5">Worker Thread (Backend)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Environnement</td>
                <td className="p-3.5">Navigateur web (Chromium, Firefox, Safari)</td>
                <td className="p-3.5">Runtime Node.js (Serveur)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Canal de réception</td>
                <td className="p-3.5"><code className="font-mono bg-slate-100 px-1 py-0.5 rounded">self.onmessage</code></td>
                <td className="p-3.5"><code className="font-mono bg-slate-100 px-1 py-0.5 rounded">parentPort.on(&apos;message&apos;)</code></td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Accès aux modules système</td>
                <td className="p-3.5">Non (sandbox navigateur)</td>
                <td className="p-3.5">Oui (<code className="font-mono">fs</code>, <code className="font-mono">crypto</code>, <code className="font-mono">mysql</code>...)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Accès au DOM</td>
                <td className="p-3.5">Non (interdit)</td>
                <td className="p-3.5">Non (inapplicable côté serveur)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. TP Pratique : API Express */}
      <PracticalWork
        title="5. TP Pratique : API Express avec délégation par Worker Thread"
        objective="Créer une route /calcul déléguée à un Worker et valider que /bonjour répond instantanément"
        steps={[
          "Créer le fichier calculWorker.js avec écoute parentPort.on('message')",
          "Dans server.js, instancier new Worker('./calculWorker.js')",
          "Tester l'appel simultané de /calcul et /bonjour dans deux onglets"
        ]}
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} server.js</span>
            <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const express = require("express");
const { Worker } = require("node:worker_threads");
const app = express();

app.get("/calcul", (req, res) => {
  const worker = new Worker("./calculWorker.js");
  worker.postMessage(100000000);
  worker.on("message", (resultat) => {
    res.json({ success: true, resultat });
    worker.terminate();
  });
  worker.on("error", (err) => res.status(500).json({ error: err.message }));
});

app.get("/bonjour", (req, res) => {
  res.send("Bonjour ! Le serveur reste 100% disponible.");
});

app.listen(3000, () => console.log("Serveur démarré sur :3000"));`}
            </pre>
          </div>
        </div>
      </PracticalWork>

      {/* 6. Exercices interactifs */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Exercices de validation des connaissances
        </h2>

        <QuickQuiz
          title="Question 1 � Environnement des Web Workers"
          question="Dans quel environnement fonctionne un Web Worker ?"
          options={[
            "Dans le moteur interne de Node.js uniquement",
            "Dans le navigateur web client (ex: React)",
            "Dans le serveur de base de données MySQL"
          ]}
          correctIndex={1}
          explanation="Les Web Workers sont une spécification W3C/HTML5 conçue pour exécuter des scripts d'arrière-plan dans les navigateurs sans bloquer le rendu graphique de la page."
        />

        <QuickQuiz
          title="Question 2 � Canal de communication du Worker Thread"
          question="Comment un Worker Thread dans Node.js renvoie-t-il son résultat au thread principal ?"
          options={[
            "parentPort.postMessage(resultat)",
            "res.send(resultat)",
            "window.postMessage(resultat)"
          ]}
          correctIndex={0}
          explanation="parentPort est l'objet natif de node:worker_threads permettant au thread enfant d'envoyer des messages vers le thread créateur."
        />

        <QuickQuiz
          title="Question 3 � Accès direct au DOM"
          question="Un Web Worker ou un Worker Thread peut-il manipuler directement le DOM d'une application ?"
          options={[
            "Oui, sans aucune restriction",
            "Non, ils ne partagent pas le contexte d'interface et doivent communiquer par messages",
            "Oui, uniquement avec React 19"
          ]}
          correctIndex={1}
          explanation="Ni les Web Workers ni les Worker Threads n'ont d'accès direct au DOM pour des raisons fondamentales de thread-safety et de synchronisation d'affichage."
        />
      </section>

      {/* 7. Checklist bilan */}
      <InteractiveChecklist
        title="7. Validation des acquis du Chapitre 2"
        items={[
          "Je comprends le rôle des Workers pour éviter le gel d'interface et le blocage d'API.",
          "Je sais créer et exploiter un Web Worker dans une application React.",
          "Je sais instancier un Worker Thread Node.js avec parentPort et postMessage.",
          "Je maîtrise les différences fondamentales entre Web Workers et Worker Threads.",
          "J'ai testé l'API Express avec Worker Thread et vérifié la disponibilité de /bonjour."
        ]}
      />
    </div>
  );
};

