'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { WorkerThreadsLab } from '@/components/interactive/WorkerThreadsLab';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Traitements CPU intensifs et optimisation des performances
        </h1>
      </div>

      {/* 1. CPU-bound vs I/O-bound */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Distinguer les traitements CPU-bound et I/O-bound
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Avant de dégainer des Workers, il est capital d&apos;analyser la nature réelle du traitement :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 : CPU-bound */}
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-4">
            <div className="relative mx-auto overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
              <Image
                src="/images/cours/backend-ia/module-2/cpu-bound-intensive-chip.jpeg"
                alt="Processeur en calcul intensif CPU-bound"
                width={600}
                height={350}
                className="h-auto w-full object-contain"
              />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">CPU-Bound (Limité par le calcul)</h3>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              Le programme passe 100% de son temps à faire tourner des calculs sur les transistors du processeur : cryptographie, compression, calculs matriciels, rendu 3D. <strong>Nécessite des Worker Threads</strong>.
            </p>
          </div>

          {/* Card 2 : I/O-bound */}
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-4">
            <div className="relative mx-auto overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
              <Image
                src="/images/cours/backend-ia/module-2/io-bound-web-server-network.jpeg"
                alt="Serveur en attente réseau et base de données I/O-bound"
                width={600}
                height={350}
                className="h-auto w-full object-contain"
              />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">I/O-Bound (Limité par les entrées/sorties)</h3>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              Le programme attend le réseau ou le disque : appel API Gemini, requête MySQL, lecture de fichier. <strong>Géré nativement par l&apos;Event Loop sans Worker</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Pourquoi un calcul lourd bloque-t-il Node.js ? */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comment un calcul lourd paralyse l&apos;Event Loop
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Toutes les requêtes HTTP entrantes passent par une file d&apos;événements unique. Lorsqu&apos;une requête déclenche une boucle synchrone, aucune autre requête ne peut être dépilée :
        </p>

        {/* IMAGE 16 : Event loop blocking queue */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/event-loop-blocking-queue.png"
              alt="File d'attente d'événements bloquée par une opération synchrone lourde"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.14 — Blocage en chaîne : l&apos;opération synchrone monopolise la roue de l&apos;Event Loop, empêchant le traitement des requêtes légères en attente dans l&apos;Event Queue.
          </p>
        </div>
      </section>

      {/* 3. Métrologie avancée : monitorEventLoopDelay */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Mesurer scientifiquement le retard de l&apos;Event Loop
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Node.js fournit l&apos;outil d&apos;observabilité officiel <code className="font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded text-indigo-950">monitorEventLoopDelay()</code> dans le module natif <code className="font-mono">node:perf_hooks</code> :
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
          <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} Mesure en continu des retards de l&apos;Event Loop</span>
          <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const { monitorEventLoopDelay } = require("node:perf_hooks");

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setInterval(() => {
  // Conversion des nanosecondes en millisecondes :
  const retardMoyen = (histogram.mean / 1e6).toFixed(2);
  const retardMax = (histogram.max / 1e6).toFixed(2);

  console.log(\`Retard moyen Event Loop : \${retardMoyen} ms | Max : \${retardMax} ms\`);
  histogram.reset();
}, 5000);`}
          </pre>
        </div>

        <Callout type="tip" title="Interprétation des métriques">
          <p>
            Sur un serveur sain et fluide, le retard moyen doit être proche de <strong>0 à 2 ms</strong>. Si vos métriques grimpent à 500 ms ou 5 000 ms, vous avez un blocage CPU synchrone ou une surcharge sévère.
          </p>
        </Callout>
      </section>

      {/* Laboratoire interactif */}
      <WorkerThreadsLab />

      {/* 4. Pourquoi limiter le nombre de Workers ? */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Combien de Workers créer ? (Le piège de la sur-allocation)
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Créer 50 ou 100 Workers sur une machine à 4 cœurs dégrade dramatiquement les performances en raison du coût de changement de contexte (*context switching*) :
        </p>

        {/* IMAGE 17 : Worker pool optimal cores */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/worker-pool-optimal-cores.jpeg"
              alt="Optimisation : 2 Worker Threads pour 4 cœurs vs congestion avec 8 Worker Threads pour 4 cœurs"
              width={800}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.15 — Allocation optimale contre congestion : la formule recommandée est <code className="font-bold">Math.max(1, os.availableParallelism() - 1)</code> pour réserver un cœur au thread principal.
          </p>
        </div>
      </section>

      {/* 5. Le Worker Pool : Architecture professionnelle */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. L&apos;architecture industrielle : Le Worker Pool
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Au lieu d&apos;instancier un Worker pour chaque requête (très coûteux en RAM et CPU), le <strong>Worker Pool</strong> pré-alloue un nombre fixe de Workers réutilisables avec une file d&apos;attente :
        </p>

        {/* IMAGE 18 : Worker Pool Architecture */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/nodejs-thread-pool-architecture.jpeg"
              alt="Architecture Worker Pool Node.js avec Main Thread, Task Queue, Worker Manager et 5 Workers"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.16 — Architecture du Worker Pool : le Worker Manager distribue les tâches entrantes aux Workers inactifs et file les requêtes excédentaires.
          </p>
        </div>
      </section>

      {/* 6. TP Pratique : Implémenter un Worker Pool */}
      <PracticalWork
        title="6. TP Pratique : Implémentation d'un Worker Pool complet dans Express"
        objective="Créer la classe WorkerPool avec file d'attente FIFO et l'intégrer dans un endpoint Express"
        steps={[
          "Créer workerPool.js avec initialisation de os.availableParallelism() - 1 workers",
          "Gérer les promesses de retour et le recyclage des instances après achèvement",
          "Valider la résilience sous un flux de 20 requêtes simultanées"
        ]}
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} workerPool.js (Architecture simplifiée)</span>
            <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const { Worker } = require("node:worker_threads");

class WorkerPool {
  constructor(size, workerPath) {
    this.workers = [];
    this.queue = [];

    for (let i = 0; i < size; i++) {
      const worker = new Worker(workerPath);
      const slot = { worker, free: true };

      worker.on("message", (res) => {
        const task = slot.task;
        slot.task = null;
        slot.free = true;
        task.resolve(res);
        this.dispatch();
      });

      this.workers.push(slot);
    }
  }

  run(payload) {
    return new Promise((resolve, reject) => {
      this.queue.push({ payload, resolve, reject });
      this.dispatch();
    });
  }

  dispatch() {
    const slot = this.workers.find(w => w.free);
    if (!slot || this.queue.length === 0) return;

    const task = this.queue.shift();
    slot.free = false;
    slot.task = task;
    slot.worker.postMessage(task.payload);
  }
}

module.exports = WorkerPool;`}
            </pre>
          </div>
        </div>
      </PracticalWork>

      {/* 7. Exercices interactifs & Évaluation finale */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Évaluation finale de validation du Module 2
        </h2>

        <QuickQuiz
          title="Question 1 — Diagnostic CPU-bound vs I/O-bound"
          question="Une API de génération RAG attend la réponse HTTP d'un modèle Gemini hébergé par Google. De quel type de charge s'agit-il ?"
          options={[
            "I/O-bound (l'Event Loop est disponible, aucun Worker Thread n'est requis)",
            "CPU-bound intensif nécessitant 10 Workers",
            "Une condition de concurrence Atomics obligatoire"
          ]}
          correctIndex={0}
          explanation="C'est une opération d'entrée/sortie (I/O). Node.js n'effectue aucun calcul lourd : il attend la fin de la transmission des octets sur le socket réseau."
        />

        <QuickQuiz
          title="Question 2 — Rôle du Worker Pool"
          question="Pourquoi utilise-t-on un Worker Pool plutôt que d'instancier 'new Worker()' à chaque requête HTTP ?"
          options={[
            "Pour contourner les permissions de l'OS",
            "Pour éviter le coût très lourd de démarrage d'un moteur V8 et borner le nombre de threads aux cœurs physiques",
            "Parce que Node.js interdit plus de 3 fichiers .js"
          ]}
          correctIndex={1}
          explanation="Démarrer un thread V8 consomme de la mémoire vive et du temps CPU. Un Worker Pool préchauffe les Workers et les réutilise indéfiniment."
        />

        <QuickQuiz
          title="Question 3 — Mesure du blocage de l'Event Loop"
          question="Quelle méthode officielle de 'node:perf_hooks' permet d'observer les retards d'ordonnancement de l'Event Loop en millisecondes ?"
          options={[
            "monitorEventLoopDelay()",
            "process.checkLag()",
            "Atomics.waitLag()"
          ]}
          correctIndex={0}
          explanation="monitorEventLoopDelay enregistre les micro-retards d'échantillonnage de libuv sous forme d'histogramme percentile haute fidélité."
        />
      </section>

      {/* 8. Checklist bilan de clôture du Module 2 */}
      <InteractiveChecklist
        title="8. Clôture officielle du Module 2 (Concurrence & Multithreading)"
        items={[
          "Je sais différencier les processus OS et les threads partagés.",
          "Je maîtrise l'usage des Web Workers (frontend React) et des Worker Threads (Node.js).",
          "Je comprends le clonage structuré et le transfert d'ArrayBuffer sans copie.",
          "Je sais sécuriser la mémoire partagée avec SharedArrayBuffer et Atomics.",
          "Je sais dimensionner et implémenter un Worker Pool pour traiter les charges lourdes d'IA.",
          "J'ai validé l'intégralité des 5 chapitres du Module 2."
        ]}
      />
    </div>
  );
};

