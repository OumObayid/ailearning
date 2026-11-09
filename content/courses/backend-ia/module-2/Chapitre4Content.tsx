'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { WorkerThreadsLab } from '@/components/interactive/WorkerThreadsLab';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Transfert de données et SharedArrayBuffer
        </h1>
      </div>

      {/* 1. ArrayBuffer et TypedArray */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Comprendre ArrayBuffer et les vues TypedArray
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Un <strong>ArrayBuffer</strong> représente un bloc continu d&apos;octets bruts en mémoire. Pour lire ou écrire des valeurs numériques dans ce bloc sans recopie, nous posons dessus une vue typée (<strong>TypedArray</strong> ou <strong>DataView</strong>) :
        </p>

        {/* IMAGE 11 : TypedArray backing store views */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/typedarray-backing-store-views.jpeg"
              alt="Architecture mémoire binaire : Backing store Buffer view, Uint8Array view et DataView view"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.11 — Mémoire binaire sous-jacente (Backing store) : différentes vues (Uint8, Int32, DataView) accédant aux mêmes octets sans duplication de mémoire.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Vue typée</th>
                <th className="p-3.5">Taille par élément</th>
                <th className="p-3.5">Cas d&apos;usage typique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">Uint8Array</td>
                <td className="p-3.5">1 octet (0 à 255)</td>
                <td className="p-3.5">Images, flux réseau, fichiers binaires</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">Int32Array</td>
                <td className="p-3.5">4 octets (entiers signés)</td>
                <td className="p-3.5">Compteurs, index de recherche, calculs mathématiques</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">Float32Array / Float64Array</td>
                <td className="p-3.5">4 à 8 octets</td>
                <td className="p-3.5">Vecteurs d&apos;embeddings IA, coordonnées géométriques</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. SharedArrayBuffer */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. SharedArrayBuffer : Le partage physique de la mémoire
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Contrairement à l&apos;ArrayBuffer qui nécessite un transfert exclusif, le <strong>SharedArrayBuffer</strong> permet au Parent et aux Workers d&apos;écrire directement dans les mêmes cellules de mémoire vive :
        </p>

        {/* IMAGE 12 : SharedArrayBuffer Architecture */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/sharedarraybuffer-architecture.jpeg"
              alt="Shared Memory Space avec SharedArrayBuffer entre threads multiples"
              width={800}
              height={400}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.12 — Espace mémoire partagé : aucun message ni copie requise, lecture/écriture ultra-rapide à coût zéro.
          </p>
        </div>
      </section>

      {/* 3. Le problème des Race Conditions */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Le piège mortel : Les conditions de concurrence (Race Conditions)
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Lorsque deux threads incrémentent une variable partagée en même temps avec <code className="font-mono bg-slate-200 px-1 py-0.5 rounded font-bold">compteur[0]++</code>, l&apos;opération n&apos;est <strong>pas atomique</strong>. Elle se décompose en 3 sous-étapes au niveau processeur :
        </p>

        {/* IMAGE 13 : Race condition diagram */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/race-condition-concurrency-bug.jpeg"
              alt="Condition de concurrence : Thread 1 et Thread 2 lisent la même valeur et écrasent leur incrément respectif"
              width={800}
              height={500}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.13 — Collision de concurrence : Thread 1 et Thread 2 lisent simultanément la valeur 5. Chacun calcule 6 et l&apos;écrit en mémoire. Le résultat final vaut 6 au lieu de 7 (un incrément définitivement perdu !).
          </p>
        </div>
      </section>

      {/* Laboratoire interactif */}
      <WorkerThreadsLab />

      {/* 4. La solution Atomics */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La solution : Les opérations atomiques avec Atomics
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          L&apos;objet natif <code className="font-mono font-bold text-indigo-700">Atomics</code> fournit des instructions matérielles garanties indivisibles : aucun autre thread ne peut interrompre le cycle lecture-modification-écriture :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4.5 space-y-1.5">
            <h3 className="text-base font-black text-indigo-950">Atomics.add()</h3>
            <p className="text-sm font-semibold text-slate-800">
              Incrémente une cellule de mémoire atomiquement sans perte d&apos;opération.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4.5 space-y-1.5">
            <h3 className="text-base font-black text-indigo-950">Atomics.load()</h3>
            <p className="text-sm font-semibold text-slate-800">
              Lecture atomique garantie même si un autre thread est en train d&apos;écrire.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4.5 space-y-1.5">
            <h3 className="text-base font-black text-indigo-950">Atomics.store()</h3>
            <p className="text-sm font-semibold text-slate-800">
              Écriture atomique avec barrière de synchronisation mémoire.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
          <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} Démonstration Atomics.add() dans un Worker</span>
          <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const { parentPort } = require("node:worker_threads");

parentPort.on("message", (sharedBuffer) => {
  const compteur = new Int32Array(sharedBuffer);

  for (let i = 0; i < 100000; i++) {
    // AU LIEU DE : compteur[0]++ (Dangereux !)
    // UTILISER :
    Atomics.add(compteur, 0, 1); // Garanti indivisible
  }

  parentPort.postMessage("Terminé");
});`}
          </pre>
        </div>

        <Callout type="warning" title="Attention à Atomics.wait()">
          <p>
            <code className="font-bold">Atomics.wait(view, index, value)</code> bloque le thread jusqu&apos;à notification. <strong>Ne l&apos;utilisez jamais sur le thread principal de Node.js</strong>, car cela paralyserait tout votre serveur ! Cette fonction est réservée aux Worker Threads.
          </p>
        </Callout>
      </section>

      {/* 5. TP Pratique : 2 Workers sur un compteur partagé */}
      <PracticalWork
        title="5. TP Pratique : Deux Workers incrémentant le même compteur partagé"
        objective="Faire tourner 2 Workers en concurrence sur un SharedArrayBuffer et vérifier le résultat exact de 200 000"
        steps={[
          "Créer un SharedArrayBuffer de 4 octets et une vue Int32Array",
          "Lancer deux instances simultanées de worker.js",
          "Attendre les deux notifications et vérifier avec Atomics.load()"
        ]}
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} server.js (Coordination)</span>
            <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const { Worker } = require("node:worker_threads");

const shared = new SharedArrayBuffer(4);
const compteur = new Int32Array(shared);

const w1 = new Worker("./worker.js");
const w2 = new Worker("./worker.js");

let termines = 0;
function verifier() {
  termines++;
  if (termines === 2) {
    console.log("Valeur finale exacte :", Atomics.load(compteur, 0)); // 200 000 !
    w1.terminate();
    w2.terminate();
  }
}

w1.on("message", verifier);
w2.on("message", verifier);

w1.postMessage(shared);
w2.postMessage(shared);`}
            </pre>
          </div>
        </div>
      </PracticalWork>

      {/* 6. Exercices interactifs */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Exercices de validation des acquis
        </h2>

        <QuickQuiz
          title="Question 1 — Capacité d'un Int32Array"
          question="Un ArrayBuffer de 32 octets est manipulé à travers une vue Int32Array. Combien d'éléments numériques contient-il ?"
          options={[
            "4 éléments",
            "8 éléments (32 octets / 4 octets par entier = 8)",
            "32 éléments"
          ]}
          correctIndex={1}
          explanation="Un entier 32 bits (Int32) occupe exactement 4 octets. 32 octets divisés par 4 octets = 8 éléments."
        />

        <QuickQuiz
          title="Question 2 — Cause d'une Race Condition"
          question="Pourquoi deux threads écrivant en même temps avec 'compteur[0]++' perdent-ils des incréments ?"
          options={[
            "Parce que le processeur surchauffe",
            "Parce que l'opération se décompose en lecture, calcul et écriture non synchronisées qui s'écrasent mutuellement",
            "Parce que JavaScript n'a pas le droit de compter au-delà de 10 000"
          ]}
          correctIndex={1}
          explanation="L'opération ++ n'est pas indivisible. Deux cœurs CPU peuvent lire la même valeur initiale avant que le premier n'ait eu le temps d'écrire son résultat, écrasant la mise à jour."
        />

        <QuickQuiz
          title="Question 3 — Utilisation d'Atomics.wait"
          question="Pourquoi est-il formellement interdit d'appeler Atomics.wait() sur le thread principal de Node.js ?"
          options={[
            "Parce que cela provoque une fuite de mémoire",
            "Parce que cette méthode bloque de manière synchrone le thread, ce qui figerait l'Event Loop et tout le serveur",
            "Parce que Atomics ne fonctionne que sous Linux"
          ]}
          correctIndex={1}
          explanation="Atomics.wait() suspend immédiatement le thread appelant en attente de notification. Sur le thread principal, cela gèlerait toutes les requêtes de tous les utilisateurs."
        />
      </section>

      {/* 7. Checklist bilan */}
      <InteractiveChecklist
        title="7. Validation des acquis du Chapitre 4"
        items={[
          "Je comprends le fonctionnement d'ArrayBuffer et des vues numériques TypedArray.",
          "Je sais allouer et partager un SharedArrayBuffer entre plusieurs threads.",
          "Je comprends la cause fondamentale d'une condition de concurrence (race condition).",
          "Je sais utiliser Atomics.add(), Atomics.load() et Atomics.store() pour sécuriser la mémoire.",
          "Je sais pourquoi Atomics.wait() ne doit jamais être exécuté sur le thread principal."
        ]}
      />
    </div>
  );
};

