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
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 w-full max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words [overflow-wrap:anywhere] min-w-0">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Concurrence &amp; Multithreading</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Processus, threads et fonctionnement du thread principal
        </h1>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-700 break-words [overflow-wrap:anywhere]">
          Distinguer le processus système du thread d&apos;exécution, comprendre l&apos;isolation de la mémoire et les limites du thread principal dans Node.js.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4 min-w-0">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 break-words">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-semibold text-slate-950 min-w-0">
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words [overflow-wrap:anywhere] min-w-0">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Définir précisément ce qu&apos;est un processus par rapport à un thread.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words [overflow-wrap:anywhere] min-w-0">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le rôle du thread principal de Node.js et son isolation mémoire.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words [overflow-wrap:anywhere] min-w-0">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Expliquer comment Node.js sert des milliers d&apos;utilisateurs sans créer un thread par client.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words [overflow-wrap:anywhere] min-w-0">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier avec certitude les situations nécessitant le recours aux Worker Threads.</span>
          </div>
        </div>
      </section>

      {/* 2. Comprendre le processus */}
      <section className="space-y-6 min-w-0">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 break-words">
          2. Comprendre le processus
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed break-words [overflow-wrap:anywhere]">
          Un <strong>processus</strong> est une instance d&apos;un programme en cours d&apos;exécution gérée par le système d&apos;exploitation (OS). Lorsque vous tapez <code className="font-mono bg-slate-200 px-1.5 py-0.5 rounded font-bold text-indigo-950">node server.js</code>, l&apos;OS alloue un processus dédié disposant de sa propre mémoire hermétique :
        </p>

        {/* IMAGE 1 : Isolation des processus */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3 min-w-0">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/process-memory-isolation.jpeg"
              alt="Isolation des processus dans le système d'exploitation avec Code, Data, Stack et Heap"
              width={800}
              height={550}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-xs sm:text-sm font-bold text-slate-800 break-words [overflow-wrap:anywhere]">
            Figure 2.1 — Isolation des processus : chaque processus dispose de son propre espace d&apos;adressage (Code, Data, Stack, Heap).
          </p>
        </div>

        <Callout type="warning" title="Isolation stricte de la mémoire">
          <p className="break-words [overflow-wrap:anywhere]">
            Si vous lancez <code className="font-bold">node server1.js</code> et <code className="font-bold">node server2.js</code> dans deux terminaux, une variable globale déclarée dans le premier ne sera <strong>jamais accessible</strong> dans le second. Pour échanger des données entre deux processus distincts, il faut utiliser le réseau (HTTP, WebSockets) ou une base de données comme MySQL / Redis.
          </p>
        </Callout>
      </section>

      {/* 3. Comprendre un thread */}
      <section className="space-y-6 min-w-0">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 break-words">
          3. Comprendre un thread
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed break-words [overflow-wrap:anywhere]">
          Un <strong>thread</strong> est un fil d&apos;exécution à l&apos;intérieur d&apos;un processus. Plusieurs threads vivant au sein du même processus partagent la même mémoire (Heap, variables globales), tout en disposant de leur propre Call Stack et de leurs propres registres :
        </p>

        {/* IMAGE 2 : Threads partageant des ressources */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3 min-w-0">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/multiple-threads-shared-resources.jpeg"
              alt="Multiple threads sharing process resources within single process address space"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-xs sm:text-sm font-bold text-slate-800 break-words [overflow-wrap:anywhere]">
            Figure 2.2 — Multithreading dans un même processus : ressources partagées (Code, Data, Heap) et contextes privés (Registers, Stack).
          </p>
        </div>

        {/* Tableau responsive avec wrapping automatique et table-fixed sans débordement */}
        <div className="hidden sm:block rounded-2xl border-2 border-slate-300 bg-white overflow-hidden min-w-0 max-w-full">
          <table className="w-full table-fixed text-left border-collapse text-xs sm:text-sm">
            <colgroup>
              <col className="w-[28%]" />
              <col className="w-[36%]" />
              <col className="w-[36%]" />
            </colgroup>
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3">Critère</th>
                <th className="p-3">Processus</th>
                <th className="p-3">Thread</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900">
              <tr>
                <td className="p-3 font-bold text-indigo-700 align-top break-words [overflow-wrap:anywhere]">Définition</td>
                <td className="p-3 align-top break-words [overflow-wrap:anywhere]">Programme complet autonome en cours d&apos;exécution.</td>
                <td className="p-3 align-top break-words [overflow-wrap:anywhere]">Fil d&apos;instructions exécuté au sein d&apos;un processus parent.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700 align-top break-words [overflow-wrap:anywhere]">Mémoire</td>
                <td className="p-3 align-top break-words [overflow-wrap:anywhere]">Espace d&apos;adressage totalement privé et étanche.</td>
                <td className="p-3 align-top break-words [overflow-wrap:anywhere]">Partage le Heap et les données du processus hôte.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700 align-top break-words [overflow-wrap:anywhere]">Communication</td>
                <td className="p-3 align-top break-words [overflow-wrap:anywhere]">Inter-Processus (IPC), sockets réseau, fichiers.</td>
                <td className="p-3 align-top break-words [overflow-wrap:anywhere]">Échange de messages ou mémoire partagée (<code className="font-mono text-xs break-all">SharedArrayBuffer</code>).</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700 align-top break-words [overflow-wrap:anywhere]">Coût système</td>
                <td className="p-3 align-top break-words [overflow-wrap:anywhere]">Lourd en mémoire RAM et plus lent à démarrer.</td>
                <td className="p-3 align-top break-words [overflow-wrap:anywhere]">Léger, démarrage rapide et mutualisation des ressources.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Version mobile en cartes (max 2 cartes par ligne) */}
        <div className="sm:hidden grid grid-cols-1 gap-3 min-w-0">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="font-bold text-indigo-700 text-sm">Processus</span>
            <p className="text-xs text-slate-800">Programme complet disposant d&apos;un espace mémoire totalement hermétique. Démarrage plus lourd.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="font-bold text-indigo-700 text-sm">Thread</span>
            <p className="text-xs text-slate-800">Fil d&apos;exécution partageant la mémoire de son processus parent. Très rapide et léger.</p>
          </div>
        </div>
      </section>

      {/* 4. Pourquoi Node.js peut traiter plusieurs requêtes ? */}
      <section className="space-y-6 min-w-0">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 break-words">
          4. L&apos;architecture asynchrone de Node.js
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed break-words [overflow-wrap:anywhere]">
          Le moteur JavaScript de Node.js n&apos;utilise qu&apos;un seul thread principal. Comment peut-il alors recevoir des centaines de connexions simultanées sans bloquer ?
        </p>

        {/* IMAGE 3 : Architecture Event Loop Node.js */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3 min-w-0">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/nodejs-event-loop-architecture.jpeg"
              alt="Architecture asynchrone Node.js avec Event Queue, Event Loop et Kernel Threads"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-xs sm:text-sm font-bold text-slate-800 break-words [overflow-wrap:anywhere]">
            Figure 2.3 — Architecture I/O non-bloquante de Node.js : l&apos;Event Loop délègue les tâches au noyau (Kernel) et au threadpool libuv.
          </p>
        </div>
      </section>

      {/* Laboratoire interactif */}
      <WorkerThreadsLab />

      {/* 5. Le problème : Les calculs CPU-bound */}
      <section className="space-y-6 min-w-0">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 break-words">
          5. Le goulot d&apos;étranglement : Les opérations CPU-bound
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed break-words [overflow-wrap:anywhere]">
          Tant qu&apos;une opération est I/O (attendre Gemini ou lire une base de données), Node.js excelle. Mais si votre code exécute un <strong>calcul mathématique synchrone lourd</strong>, l&apos;Event Loop est totalement prise en otage :
        </p>

        {/* Max 2 cartes par ligne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
          {/* Card 1 : Blocage CPU */}
          <div className="rounded-3xl border-2 border-rose-200 bg-white p-5 shadow-sm space-y-3 break-words [overflow-wrap:anywhere] min-w-0">
            <div className="relative mx-auto overflow-hidden rounded-xl border border-rose-100 bg-rose-50/50">
              <Image
                src="/images/cours/backend-ia/module-2/cpu-bound-blocking-event-loop.jpeg"
                alt="Blocage de l'Event Loop par un calcul intensif CPU-bound"
                width={900}
                height={450}
                className="h-auto w-full object-contain"
              />
            </div>
            <h3 className="text-base font-bold text-rose-950">Goulot d&apos;étranglement CPU</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
              Un calcul intensif synchrone fige le Main Thread. Les requêtes des autres visiteurs s&apos;accumulent sans réponse.
            </p>
          </div>

          {/* Card 2 : Délégation Worker Threads */}
          <div className="rounded-3xl border-2 border-emerald-200 bg-white p-5 shadow-sm space-y-3 break-words [overflow-wrap:anywhere] min-w-0">
            <div className="relative mx-auto overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/50">
              <Image
                src="/images/cours/backend-ia/module-2/main-thread-to-worker-threads.jpeg"
                alt="Optimisation par délégation : le thread principal confie les calculs aux Worker Threads"
                width={900}
                height={450}
                className="h-auto w-full object-contain"
              />
            </div>
            <h3 className="text-base font-bold text-emerald-950">Solution par délégation</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
              Le Main Thread délègue le travail CPU lourd à un Worker Thread dédié et reste immédiatement disponible.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Exercices pratiques interactifs */}
      <section className="space-y-6 min-w-0">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 break-words">
          6. Exercices de validation des concepts
        </h2>

        <QuickQuiz
          title="Question 1 — Exécution de node server.js"
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
          title="Question 2 — Attente d'une réponse de Gemini avec await"
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
          title="Question 3 — Quand utiliser un Worker Thread ?"
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
