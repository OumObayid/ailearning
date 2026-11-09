'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { NodeMemoryEventLoopLab } from '@/components/interactive/NodeMemoryEventLoopLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Gestion de la mémoire, Garbage Collector, fuites mémoire et optimisation de Node.js
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
            <span>Comprendre comment Node.js gère et recycle la mémoire RAM.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le fonctionnement exact du Garbage Collector (GC) V8.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier et neutraliser les fuites de mémoire (Memory Leaks).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Prendre et comparer des Heap Snapshots avec Chrome DevTools.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 md:col-span-2">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Exploiter les <strong>Streams Node.js</strong> pour traiter des documents volumineux sans surcharger la mémoire.</span>
          </li>
        </ul>
      </section>

      {/* 2. Rappel et architecture des espaces V8 */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comment fonctionne la mémoire sous V8 ?
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Le moteur V8 divise la mémoire en plusieurs sous-espaces pour optimiser la vitesse de nettoyage :
        </p>

        {/* IMAGE 1 : Espaces V8 */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-1/v8-generational-spaces.jpeg"
              alt="Architecture mémoire V8 : New Space Nursery et Old Space Tenured"
              width={900}
              height={900}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 1.1 — Organisation générationnelle de la mémoire V8 : New Space (Nursery) et promotion vers l&apos;Old Space (Tenured).
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Zone mémoire</th>
                <th className="p-3.5">Rôle et caractéristiques</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Stack (Pile)</td>
                <td className="p-3.5">Pointeurs, variables primitives locales et frames d&apos;exécution des fonctions.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">New Space (Nursery)</td>
                <td className="p-3.5">Là où naissent tous les nouveaux objets. Nettoyé très vite par le <em>Minor GC (Scavenger)</em>.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Old Space (Tenured)</td>
                <td className="p-3.5">Objets qui ont survécu à plusieurs cycles du Minor GC. Nettoyé par le <em>Major GC (Mark-Sweep-Compact)</em>.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">RSS (Resident Set Size)</td>
                <td className="p-3.5">Mémoire physique totale réquisitionnée par le processus auprès du système d&apos;exploitation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Le Garbage Collector et Mark-and-Sweep */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Fonctionnement du Garbage Collector : L&apos;algorithme Mark-and-Sweep
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          En JavaScript, vous ne faites pas de <code className="font-mono bg-slate-200 px-1 py-0.5 rounded font-bold">free()</code> manuel. V8 utilise l&apos;algorithme de marquage et balayage (<strong>Mark-and-Sweep</strong>) :
        </p>

        {/* IMAGE 2 : Mark-and-Sweep */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-1/mark-and-sweep-algorithm.jpeg"
              alt="Algorithme Mark and Sweep : objets racines, marquage et libération des objets orphelins"
              width={850}
              height={600}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 1.2 — Fonctionnement du Mark-and-Sweep : parcours depuis les racines (Root Objects) et recyclage des zones orphelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4.5 space-y-1.5">
            <h3 className="text-base font-black text-indigo-950">1. Mark (Marquage)</h3>
            <p className="text-sm font-semibold text-slate-800">
              V8 part des racines (variables globales, Call Stack, closures actives) et marque tous les objets atteignables comme « vivants ».
            </p>
          </div>
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4.5 space-y-1.5">
            <h3 className="text-base font-black text-indigo-950">2. Sweep (Balayage)</h3>
            <p className="text-sm font-semibold text-slate-800">
              Le moteur parcourt le Heap : tout objet qui n&apos;a pas reçu de marque est considéré orphelin et sa mémoire est rendue disponible.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4.5 space-y-1.5">
            <h3 className="text-base font-black text-indigo-950">3. Compact (Compactage)</h3>
            <p className="text-sm font-semibold text-slate-800">
              Certaines zones sont défragmentées pour regrouper les objets et éviter le gaspillage de mémoire vive.
            </p>
          </div>
        </div>
      </section>

      {/* Laboratoire interactif */}
      <NodeMemoryEventLoopLab />

      {/* 4. Diagnostiquer une fuite mémoire avec Chrome DevTools */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Détecter et diagnostiquer une fuite mémoire (Memory Leak)
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Une fuite mémoire se caractérise par une croissance continue et ininterrompue de la mémoire vive au fil des requêtes :
        </p>

        {/* IMAGE 3 : Courbe de fuite mémoire */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-1/memory-leak-progression-graph.jpeg"
              alt="Graphique de fuite mémoire : courbe ascendante de la mémoire vive au cours du temps"
              width={700}
              height={500}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 1.3 — Profil caractéristique d&apos;une fuite mémoire : ascension persistante malgré les cycles du Garbage Collector.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            Utilisation du profilage avec Chrome DevTools (<code className="font-mono text-indigo-700">node --inspect</code>)
          </h3>
          <p className="text-base font-medium text-slate-900 leading-relaxed">
            Pour trouver l&apos;objet exact qui provoque la fuite, lancez votre serveur en mode inspection :
          </p>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white font-mono text-sm">
            node --inspect server.js
          </div>

          <p className="text-base font-medium text-slate-900 leading-relaxed">
            Ouvrez <code className="font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded text-indigo-950">chrome://inspect</code> dans votre navigateur, cliquez sur <em>Inspect</em>, puis réalisez un <strong>Heap Snapshot</strong> :
          </p>

          {/* IMAGE 4 : Heap Snapshot DevTools */}
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
              <Image
                src="/images/cours/backend-ia/module-1/devtools-heap-snapshot.jpeg"
                alt="Chrome DevTools Memory Profiler : comparaison de deux Heap Snapshots avec Delta d'allocation"
                width={1000}
                height={700}
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="text-center text-sm font-bold text-slate-800">
              Figure 1.4 — Analyse de Snapshot dans DevTools : comparaison avant/après requêtes pour isoler les constructeurs orphelins (Delta).
            </p>
          </div>
        </div>
      </section>

      {/* 5. Optimisation mémoire pour les architectures d'IA (Streams) */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Optimisation majeure pour le Backend IA : Les Streams
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Lorsqu&apos;un utilisateur envoie un document volumineux de 100 Mo pour analyse vectorielle ou extraction par IA, charger l&apos;intégralité du fichier en RAM est une erreur critique :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5 space-y-2">
            <h3 className="text-base font-black text-rose-950">❌ Charge brute en mémoire (Saturation)</h3>
            <pre className="font-mono text-xs leading-relaxed text-rose-950 bg-white p-3 rounded-xl border border-rose-200 overflow-x-auto">
{`// Dangereux : charge 100 Mo d'un coup par requête
const fs = require("fs");

app.get("/analyse", (req, res) => {
  const document = fs.readFileSync("gros_doc.pdf");
  // 10 requêtes simultanées = 1 Go de RAM saturée !
  res.send("Fait");
});`}
            </pre>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5 space-y-2">
            <h3 className="text-base font-black text-emerald-950">✅ Lecture par flux (Streams &amp; Chunks)</h3>
            <pre className="font-mono text-xs leading-relaxed text-emerald-950 bg-white p-3 rounded-xl border border-emerald-200 overflow-x-auto">
{`// Optimal : lecture par morceaux (64 Ko à la fois)
const fs = require("fs");

app.get("/analyse", (req, res) => {
  const stream = fs.createReadStream("gros_doc.pdf");
  stream.on("data", chunk => {
    // Traitement fragmenté pour Gemini / Qdrant
  });
  stream.on("end", () => res.json({ ok: true }));
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* 6. Travaux Pratiques & Évaluation Finale */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Évaluation finale de validation du Module 1
        </h2>

        <QuickQuiz
          title="Question 1 — Garbage Collector & Tableaux globaux"
          question="Le Garbage Collector peut-il libérer la mémoire d'un objet qui est encore stocké dans un tableau déclaré au niveau global ?"
          options={[
            "Oui, automatiquement au bout de 5 secondes",
            "Non, tant que l'objet reste accessible via la référence du tableau global, il est immunisé contre le ramassage",
            "Oui, si on appelle process.memoryUsage()"
          ]}
          correctIndex={1}
          explanation="Le moteur V8 garantit l'intégrité de vos données : il a l'interdiction formelle de détruire un objet auquel votre code peut encore accéder par une variable vivante."
        />

        <QuickQuiz
          title="Question 2 — Comportement de RSS après nettoyage"
          question="Après avoir vidé un tableau avec donnees = [], pourquoi l'indicateur RSS (mémoire physique totale) ne redescend-il pas immédiatement ?"
          options={[
            "Parce que le Garbage Collector a planté",
            "Parce que V8 conserve fréquemment la mémoire allouée auprès du système d'exploitation pour la réutiliser lors de futures requêtes",
            "Parce qu'il faut obligatoirement redémarrer le serveur"
          ]}
          correctIndex={1}
          explanation="Demander de la mémoire à l'OS est une opération coûteuse. V8 conserve la mémoire libérée dans son pool interne (heapTotal / RSS) pour accélérer les allocations futures."
        />

        <QuickQuiz
          title="Question 3 — Architecture pour 20 documents lourds en parallèle"
          question="Votre API d'intelligence artificielle reçoit 20 requêtes simultanées contenant chacune un fichier de 50 Mo. Quelle est la bonne pratique de production ?"
          options={[
            "Charger les 20 fichiers intégralement dans des chaînes de caractères en RAM",
            "Utiliser des Streams, limiter la taille maximale des payloads et découper le traitement en morceaux (chunks)",
            "Stocker les 20 fichiers dans un tableau d'historique en mémoire"
          ]}
          correctIndex={1}
          explanation="Les Streams permettent de traiter les données au fil de l'eau avec une empreinte mémoire quasi-constante (quelques Mo au lieu de plusieurs Go), garantissant la résilience du serveur."
        />
      </section>

      {/* 7. Checklist de clôture du Module 1 */}
      <InteractiveChecklist
        title="7. Clôture officielle du Module 1 (Fondations Système)"
        items={[
          "Je maîtrise le cycle de vie de la mémoire V8 (New Space, Old Space, Tenured).",
          "Je comprends le mécanisme Mark-and-Sweep du Garbage Collector.",
          "Je sais identifier les 7 causes majeures de fuites mémoire en production.",
          "Je sais profiler un serveur Node.js avec chrome://inspect et comparer des Heap Snapshots.",
          "Je maîtrise l'utilisation des Streams pour protéger ma RAM face aux fichiers volumineux d'IA.",
          "J'ai validé l'ensemble des 4 chapitres de ce Module 1."
        ]}
      />
    </div>
  );
};

