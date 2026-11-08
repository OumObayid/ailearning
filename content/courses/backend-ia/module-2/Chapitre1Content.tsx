'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { WorkerThreadsLab } from '@/components/interactive/WorkerThreadsLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Processus, threads et fonctionnement du thread principal
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base font-semibold text-slate-950">
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Définir précisément un processus et un thread.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le fonctionnement du thread principal de Node.js.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Expliquer comment Node.js traite plusieurs requêtes sans créer un thread par requête.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier les situations où il est impératif d&apos;utiliser des Worker Threads.</span>
          </li>
        </ul>
      </section>

      {/* 2. Comprendre le processus */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comprendre le processus
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Un <strong>processus</strong> est une instance d&apos;un programme en cours d&apos;exécution gérée par le système d&apos;exploitation (OS). Lorsque vous tapez <code className="font-mono bg-slate-200 px-1.5 py-0.5 rounded font-bold text-indigo-950">node server.js</code>, l&apos;OS alloue un processus dédié disposant de sa propre mémoire hermétique :
        </p>

        {/* IMAGE 1 : Isolation des processus */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/process-memory-isolation.jpeg"
              alt="Isolation des processus dans le système d'exploitation avec Code, Data, Stack et Heap"
              width={800}
              height={550}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.1 � Isolation des processus : chaque processus dispose de son propre espace d&apos;adressage (Code, Data, Stack, Heap).
          </p>
        </div>

        <Callout type="warning" title="Isolation stricte de la mémoire">
          <p>
            Si vous lancez <code className="font-bold">node server1.js</code> et <code className="font-bold">node server2.js</code> dans deux terminaux, une variable globale déclarée dans le premier ne sera <strong>jamais accessible</strong> dans le second. Pour échanger des données entre deux processus distincts, il faut utiliser le réseau (HTTP, WebSockets) ou une base de données comme MySQL / Redis.
          </p>
        </Callout>
      </section>

      {/* 3. Comprendre un thread */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comprendre un thread
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Un <strong>thread</strong> est un fil d&apos;exécution à l&apos;intérieur d&apos;un processus. Plusieurs threads vivant au sein du même processus partagent la même mémoire (Heap, variables globales), tout en disposant de leur propre Call Stack et registres :
        </p>

        {/* IMAGE 2 : Threads partageant des ressources */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/multiple-threads-shared-resources.jpeg"
              alt="Multiple threads sharing process resources within single process address space"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.2 � Multithreading dans un même processus : ressources partagées (Code, Data, Heap) et contextes privés (Registers, Stack).
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Critère</th>
                <th className="p-3.5">Processus</th>
                <th className="p-3.5">Thread</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Définition</td>
                <td className="p-3.5">Programme complet en cours d&apos;exécution</td>
                <td className="p-3.5">Fil d&apos;exécution d&apos;instructions au sein d&apos;un processus</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Mémoire</td>
                <td className="p-3.5">Espace d&apos;adressage totalement isolé</td>
                <td className="p-3.5">Partage la Heap du processus hôte</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Communication</td>
                <td className="p-3.5">Inter-Processus (IPC), sockets, réseau</td>
                <td className="p-3.5">Messages mémoire, SharedArrayBuffer ultra-rapide</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Coût système</td>
                <td className="p-3.5">Lourd en mémoire et temps de création</td>
                <td className="p-3.5">Plus léger, partage les ressources parentes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Pourquoi Node.js peut traiter plusieurs requêtes ? */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. L&apos;architecture asynchrone de Node.js
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Le moteur JavaScript de Node.js n&apos;utilise qu&apos;un seul thread principal. Comment peut-il alors recevoir des centaines de connexions simultanées sans bloquer ?
        </p>

        {/* IMAGE 3 : Architecture Event Loop Node.js */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/nodejs-event-loop-architecture.jpeg"
              alt="Architecture asynchrone Node.js avec Event Queue, Event Loop et Kernel Threads"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.3 � Architecture I/O non-bloquante de Node.js : l&apos;Event Loop délègue les tâches lourdes au noyau (Kernel) et au threadpool libuv.
          </p>
        </div>
      </section>

      {/* Laboratoire interactif */}
      <WorkerThreadsLab />

      {/* 5. Le problème : Les calculs CPU-bound */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Le goulot d&apos;étranglement : Les opérations CPU-bound
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Tant qu&apos;une opération est I/O (attendre Gemini ou lire une base de données), Node.js excelle. Mais si votre code exécute un <strong>calcul mathématique synchrone lourd</strong>, l&apos;Event Loop est totalement prise en otage :
        </p>

        {/* IMAGE 4 : Blocage CPU */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/cpu-bound-blocking-event-loop.jpeg"
              alt="Blocage de l'Event Loop par un calcul intensif CPU-bound"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.4 � Goulot d&apos;étranglement CPU : un calcul intensif sur le thread principal fige l&apos;Event Loop et met toutes les autres requêtes en attente.
          </p>
        </div>

        {/* IMAGE 5 : Délégation aux Worker Threads */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/main-thread-to-worker-threads.jpeg"
              alt="Optimisation par délégation : le thread principal confie les calculs aux Worker Threads"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.5 � Solution d&apos;optimisation : le Main Thread délègue la tâche CPU à un Worker Thread indépendant pour préserver sa fluidité.
          </p>
        </div>
      </section>

      {/* 6. Exercices pratiques interactifs */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Exercices de validation des concepts
        </h2>

        <QuickQuiz
          title="Question 1 � Exécution de node server.js"
          question="Lorsque vous exécutez 'node server.js' dans un terminal, que démarre le système d'exploitation ?"
          options={[
            "Un simple thread léger",
            "Un processus complet disposant de son propre espace mémoire et de ressources système",
            "Une simple fonction asynchrone"
          ]}
          correctIndex={1}
          explanation="Le système d'exploitation crée un processus complet isolé, doté de sa propre mémoire RAM (Code, Data, Stack, Heap) et d'un thread principal d'exécution."
        />

        <QuickQuiz
          title="Question 2 � Attente d'une réponse de Gemini avec await"
          question="Votre serveur Node.js appelle l'API Google Gemini avec 'await fetch(...)'. De quelle nature est cette opération ?"
          options={[
            "Une opération CPU-bound bloquant le thread principal",
            "Une opération réseau asynchrone non-bloquante (I/O-bound)",
            "Un Worker Thread système obligatoire"
          ]}
          correctIndex={1}
          explanation="C'est une opération I/O réseau. L'inférence du modèle d'IA s'effectue sur les serveurs distants de Google. Node.js ne fait qu'attendre la réponse réseau sans consommer de CPU."
        />

        <QuickQuiz
          title="Question 3 � Quand utiliser un Worker Thread ?"
          question="Dans quelle situation l'utilisation d'un Worker Thread est-elle particulièrement recommandée dans une API IA ?"
          options={[
            "Pour chaque requête HTTP GET basique",
            "Pour attendre une requête SQL SELECT dans MySQL",
            "Pour exécuter un calcul mathématique ou un traitement d'image lourd en JavaScript local"
          ]}
          correctIndex={2}
          explanation="Les calculs intensifs locaux monopolisent le CPU. Déléguer ce traitement à un Worker Thread permet au thread principal de continuer à recevoir et servir toutes les autres requêtes des utilisateurs."
        />
      </section>

      {/* 7. Checklist bilan */}
      <InteractiveChecklist
        title="7. Validation des acquis du Chapitre 1"
        items={[
          "Je sais définir précisément un processus et un thread.",
          "Je comprends l'isolation mémoire stricte entre deux processus Node.js.",
          "Je comprends le rôle du thread principal et comment il sert plusieurs requêtes.",
          "Je distingue clairement une opération I/O-bound d'une opération CPU-bound.",
          "Je sais identifier les cas d'usage où un Worker Thread est indispensable."
        ]}
      />
    </div>
  );
};

