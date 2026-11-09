'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { NodeMemoryEventLoopLab } from '@/components/interactive/NodeMemoryEventLoopLab';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Event Loop, phases d&apos;exécution, Microtasks et Macrotasks
        </h1>
      </div>

      {/* 1. Pourquoi Node.js a besoin de l'Event Loop ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi Node.js a-t-il besoin de l&apos;Event Loop ?
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Imaginez une API backend IA recevant 3 requêtes simultanément :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4.5">
            <span className="text-xs uppercase font-black text-indigo-700">Requête 1</span>
            <h3 className="text-base font-bold text-slate-950 mt-1">Génération Gemini</h3>
            <p className="text-sm font-semibold text-slate-700 mt-1">Appel HTTPS vers le modèle de langage distant Google.</p>
          </div>
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4.5">
            <span className="text-xs uppercase font-black text-indigo-700">Requête 2</span>
            <h3 className="text-base font-bold text-slate-950 mt-1">Recherche MySQL</h3>
            <p className="text-sm font-semibold text-slate-700 mt-1">Lecture relationnelle dans un pool de connexions.</p>
          </div>
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4.5">
            <span className="text-xs uppercase font-black text-indigo-700">Requête 3</span>
            <h3 className="text-base font-bold text-slate-950 mt-1">Listing de projets</h3>
            <p className="text-sm font-semibold text-slate-700 mt-1">Accès disque ou sérialisation JSON en mémoire.</p>
          </div>
        </div>

        <Callout type="info" title="Le secret d'architecture de Node.js">
          <p>
            Comment un serveur mono-threadé peut-il traiter ces 3 requêtes en même temps sans créer 3 threads lourds ?<br />
            <strong>Réponse :</strong> JavaScript délègue les opérations I/O (réseau, base de données, système de fichiers) au noyau de l&apos;OS et au threadpool libuv. Pendant l&apos;attente, le thread principal JavaScript reste libre. Lorsque l&apos;OS signale que la réponse est prête, <strong>l&apos;Event Loop</strong> planifie le retour du callback sur le Call Stack.
          </p>
        </Callout>
      </section>

      {/* 2. Les 4 notions fondamentales */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 notions fondamentales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 space-y-2">
            <span className="inline-flex rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-950">1. Call Stack</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">La pile d&apos;exécution synchrone</h3>
            <p className="text-base font-medium text-slate-900 leading-relaxed">
              Exécute le code JavaScript de manière stricte (LIFO). Une fonction doit terminer son exécution pour être dépilée.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 space-y-2">
            <span className="inline-flex rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-950">2. Callback</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Fonction de rappel différée</h3>
            <p className="text-base font-medium text-slate-900 leading-relaxed">
              Fonction transmise en argument, enregistrée par le moteur pour être déclenchée lorsqu&apos;un événement ou délai survient.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5 space-y-2">
            <span className="inline-flex rounded-lg bg-emerald-200 px-2.5 py-1 text-xs font-black text-emerald-950">3. Microtasks (Priorité MAX)</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Microtâches immédiates</h3>
            <p className="text-base font-medium text-slate-900 leading-relaxed">
              Callbacks de Promises (<code className="font-bold">.then()</code>, <code className="font-bold">.catch()</code>, continuation de <code className="font-bold">await</code>) et <code className="font-bold">process.nextTick()</code>. Exécutées <strong>dès que le Call Stack est vide</strong>, avant toute phase de l&apos;Event Loop !
            </p>
          </div>

          <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/50 p-5 space-y-2">
            <span className="inline-flex rounded-lg bg-indigo-200 px-2.5 py-1 text-xs font-black text-indigo-950">4. Macrotasks (Phases libuv)</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Tâches événementielles</h3>
            <p className="text-base font-medium text-slate-900 leading-relaxed">
              Tâches planifiées dans les phases de l&apos;Event Loop : timers (<code className="font-bold">setTimeout</code>), I/O réseau, callbacks de fermeture, ou phase check (<code className="font-bold">setImmediate</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Visualiseur interactif */}
      <NodeMemoryEventLoopLab />

      {/* 3. Phases de l'Event Loop dans Node.js */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 6 phases officielles de l&apos;Event Loop dans Node.js
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Node.js utilise la librairie C <strong>libuv</strong>. ì chaque tour de boucle (*tick*), l&apos;Event Loop traverse séquentiellement ces phases :
        </p>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Phase libuv</th>
                <th className="p-3.5">Opérations traitées</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">1. Timers</td>
                <td className="p-3.5">Exécute les callbacks de <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">setTimeout()</code> et <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">setInterval()</code> arrivés à échéance.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">2. Pending Callbacks</td>
                <td className="p-3.5">Traite les callbacks d&apos;erreurs système différés de la phase précédente (ex: erreurs TCP ECONNREFUSED).</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">3. Idle / Prepare</td>
                <td className="p-3.5">Usage interne réservé à libuv pour préparer la suite du cycle.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">4. Poll (Le cœur)</td>
                <td className="p-3.5">Récupère et traite les nouveaux événements I/O (lecture disque, sockets entrants). Si la file est vide, la boucle peut s&apos;y mettre en sommeil contrôlé.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">5. Check</td>
                <td className="p-3.5">Exécute immédiatement les callbacks planifiés par <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">setImmediate()</code>.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">6. Close Callbacks</td>
                <td className="p-3.5">Gère la fermeture des ressources (ex: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">socket.on(&apos;close&apos;, ...)</code>).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            3.1 Différence cruciale : setTimeout vs setImmediate
          </h3>
          <p className="text-base font-medium text-slate-900 leading-relaxed">
            Dans un callback d&apos;E/S (phase Poll), <code className="font-mono font-bold text-indigo-700">setImmediate()</code> passe <strong>toujours avant</strong> <code className="font-mono font-bold text-indigo-700">setTimeout(0)</code> :
          </p>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => console.log("Timeout"), 0);
  setImmediate(() => console.log("Immediate"));
});

// SORTIE GARANTIE DANS LE CONTEXTE D'I/O :
// Immediate  (exécuté dès la phase Check suivante)
// Timeout    (exécuté lors de la phase Timers du tour suivant)`}
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Démonstration pratique Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Démonstration pratique : La hiérarchie complète
        </h2>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
          <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} event-loop.js</span>
          <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`console.log("1 - Début du programme");

setTimeout(() => {
  console.log("2 - Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Promise");
});

process.nextTick(() => {
  console.log("4 - NextTick");
});

setImmediate(() => {
  console.log("5 - Immediate");
});

console.log("6 - Fin du programme");`}
          </pre>
        </div>

        <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/70 p-5">
          <h3 className="text-lg font-black text-indigo-950 mb-2">Ordre officiel produit par Node.js moderne :</h3>
          <ol className="list-decimal list-inside space-y-1.5 font-mono text-base font-bold text-slate-950">
            <li>1 - Début du programme <span className="text-slate-600 font-sans font-normal">(Synchrone 1)</span></li>
            <li>6 - Fin du programme <span className="text-slate-600 font-sans font-normal">(Synchrone 2)</span></li>
            <li>4 - NextTick <span className="text-slate-600 font-sans font-normal">(File spéciale nextTick prioritaire)</span></li>
            <li>3 - Promise <span className="text-slate-600 font-sans font-normal">(File des microtâches)</span></li>
            <li>2 - Timer <span className="text-slate-600 font-sans font-normal">(Phase Timers libuv)</span></li>
            <li>5 - Immediate <span className="text-slate-600 font-sans font-normal">(Phase Check libuv)</span></li>
          </ol>
        </div>
      </section>

      {/* 5. Travaux Pratiques */}
      <PracticalWork
        title="5. Travaux pratiques : Tests de concurrence dans Express"
        objective="Valider que la fin d'un timer long n'empêche pas les autres routes de répondre"
        steps={[
          "Observer le non-blocage des requêtes simultanées",
          "Valider que la fin d'un timer long n'empêche pas les autres routes de répondre",
          "Démontrer la puissance du modèle asynchrone pour les passerelles Backend IA"
        ]}
      >
        <div className="space-y-4">
          <p className="text-base font-semibold text-slate-900">
            Implémentez ces deux routes dans votre serveur Express :
          </p>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`app.get("/task-a", (req, res) => {
  console.log("Début A");
  setTimeout(() => {
    console.log("Fin du timer de 5s pour A");
  }, 5000);
  res.send("Requête A prise en compte");
});

app.get("/task-b", (req, res) => {
  console.log("Requête B exécutée immédiatement");
  res.send("Réponse B");
});`}
            </pre>
          </div>

          <Callout type="tip" title="Expérience à réaliser">
            <p>
              1. Ouvrez un onglet sur <code className="font-bold">/task-a</code>.<br />
              2. Ouvrez instantanément un deuxième onglet sur <code className="font-bold">/task-b</code>.<br />
              <strong>Constat :</strong> La route B répond instantanément dans votre navigateur, sans attendre les 5 secondes du timer de A !
            </p>
          </Callout>
        </div>
      </PracticalWork>

      {/* 6. Mini-évaluation */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Mini-évaluation interactive
        </h2>

        <QuickQuiz
          title="Question 1 — Rôle de l'Event Loop"
          question="Quel est le rôle principal de l'Event Loop dans Node.js ?"
          options={[
            "Allouer la mémoire dynamique dans le Heap",
            "Coordonner l'exécution des callbacks et ordonnancer les tâches asynchrones",
            "Créer un thread système par requête HTTP reçue"
          ]}
          correctIndex={1}
          explanation="L'Event Loop est l'arbitre et l'ordonnanceur central de libuv qui vérifie en permanence les files d'attente d'événements et pousse les callbacks prêts sur le Call Stack."
        />

        <QuickQuiz
          title="Question 2 — Priorité d'exécution"
          question="Quelle tâche est exécutée en priorité absolue dès que le code synchrone courant s'achève ?"
          options={[
            "Les callbacks de process.nextTick() puis les microtasks (Promises)",
            "Le callback de setTimeout(..., 0)",
            "Le callback de setImmediate()"
          ]}
          correctIndex={0}
          explanation="Les microtâches (nextTick et Promises) ne font pas partie des phases de libuv : elles s'exécutent immédiatement dès que le Call Stack est libre, avant même d'entrer dans la phase suivante de l'Event Loop."
        />

        <QuickQuiz
          title="Question 3 — await et le thread principal"
          question="Le mot-clé await bloque-t-il le thread principal pendant une requête réseau vers Gemini ?"
          options={[
            "Oui, le serveur entier est immobilisé",
            "Non, la fonction async est suspendue et l'Event Loop traite les autres requêtes",
            "Oui, sauf si on installe une bibliothèque tierce"
          ]}
          correctIndex={1}
          explanation="await transforme l'exécution en suspension asynchrone non-bloquante. Le Call Stack est libéré pour traiter les autres événements pendant que le réseau attend les octets de Gemini."
        />
      </section>

      {/* 7. Checklist bilan */}
      <InteractiveChecklist
        title="7. Validation des acquis du Chapitre 2"
        items={[
          "Je sais expliquer précisément le rôle et le fonctionnement de l'Event Loop.",
          "Je distingue clairement Call Stack, Callbacks, Microtasks et Macrotasks.",
          "Je connais l'ordre de priorité : synchrone > nextTick > Promise > phases libuv.",
          "Je comprends la différence d'ordonnancement entre setTimeout(0) et setImmediate().",
          "Je comprends pourquoi await libère le thread pendant une attente d'API d'IA."
        ]}
      />
    </div>
  );
};

