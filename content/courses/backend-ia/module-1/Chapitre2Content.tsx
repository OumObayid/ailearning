'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { NodeMemoryEventLoopLab } from '@/components/interactive/NodeMemoryEventLoopLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Fondations Système</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Event Loop, phases d&apos;exécution, Microtasks et Macrotasks
        </h1>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-700">
          Découvrez le chef d&apos;orchestre de Node.js qui lui permet de gérer des milliers de connexions simultanées sans jamais s&apos;emmêler les pinceaux.
        </p>
      </div>

      {/* 1. Pourquoi Node.js a besoin de l'Event Loop ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi Node.js a-t-il besoin de l&apos;Event Loop ?
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Imaginez un serveur Backend d&apos;IA recevant simultanément plusieurs demandes de clients :
        </p>

        {/* Règle respectée : MAX 2 cartes par ligne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4.5 break-words shadow-sm">
            <span className="text-xs uppercase font-black text-indigo-700">Requête A</span>
            <h3 className="text-base font-bold text-slate-950 mt-1">Appel à l&apos;API Gemini</h3>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              Requête réseau externe qui met 2 secondes à répondre depuis les serveurs Google.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4.5 break-words shadow-sm">
            <span className="text-xs uppercase font-black text-indigo-700">Requête B</span>
            <h3 className="text-base font-bold text-slate-950 mt-1">Lecture en Base de Données</h3>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              Recherche dans une base PostgreSQL qui prend 50 millisecondes.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4.5 break-words shadow-sm">
            <span className="text-xs uppercase font-black text-indigo-700">Requête C</span>
            <h3 className="text-base font-bold text-slate-950 mt-1">Affichage du profil</h3>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              Opération simple en mémoire vive qui prend seulement 2 millisecondes.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 p-4.5 break-words shadow-sm">
            <span className="text-xs uppercase font-black text-emerald-800">Le rôle de l&apos;Event Loop</span>
            <h3 className="text-base font-bold text-slate-950 mt-1">Ordonnancement intelligent</h3>
            <p className="text-sm font-semibold text-emerald-950 mt-1">
              Elle sert C instantanément, n&apos;attend pas Gemini les bras croisés, et reprend A dès que Google répond !
            </p>
          </div>
        </div>

        <Callout type="info" title="L'analogie de la gare ferroviaire (l'aiguilleur)">
          <p className="leading-relaxed">
            Considérez Node.js comme une gare avec <strong>une seule voie d&apos;embarquement principale</strong> (le Call Stack) :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1.5 font-semibold text-slate-900">
            <li><strong>L&apos;Event Loop est le chef d&apos;aiguillage :</strong> Il vérifie continuellement si la voie principale est libre.</li>
            <li><strong>La bibliothèque libuv est la zone de garage :</strong> Pendant qu&apos;un train fait le plein de carburant (attente réseau vers Gemini ou lecture de fichier sur le disque), il est mis sur une voie de garage pour ne pas encombrer le quai.</li>
            <li>Dès que le train est prêt, l&apos;aiguilleur le fait entrer sur la voie principale pour faire descendre les passagers (exécuter le callback).</li>
          </ul>
        </Callout>
      </section>

      {/* 2. Les 4 notions fondamentales */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 notions clés à maîtriser
        </h2>

        {/* Max 2 cartes par ligne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 space-y-2 break-words shadow-sm">
            <span className="inline-flex rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-950">1. Call Stack</span>
            <h3 className="text-base font-bold text-slate-900">Le quai d&apos;exécution synchrone</h3>
            <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              Exécute vos lignes de code immédiatement. Une fonction doit impérativement se terminer pour libérer la place à la suivante.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 space-y-2 break-words shadow-sm">
            <span className="inline-flex rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-950">2. Callback</span>
            <h3 className="text-base font-bold text-slate-900">La fonction de rappel</h3>
            <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              C&apos;est la fonction que vous donnez à Node.js en disant : <em>&quot;Quand cette tâche externe est terminée, exécute ce bloc de code.&quot;</em>
            </p>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5 space-y-2 break-words shadow-sm">
            <span className="inline-flex rounded-lg bg-emerald-200 px-2.5 py-1 text-xs font-black text-emerald-950">3. Microtasks (Priorité Absolue)</span>
            <h3 className="text-base font-bold text-slate-900">Les tâches urgentes prioritaires</h3>
            <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              Les promesses résolues (<code className="font-bold">.then()</code>, suite de <code className="font-bold">await</code>) et <code className="font-bold">process.nextTick()</code>. Elles passent <strong>avant tout le reste</strong> dès que la Stack se vide !
            </p>
          </div>

          <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/50 p-5 space-y-2 break-words shadow-sm">
            <span className="inline-flex rounded-lg bg-indigo-200 px-2.5 py-1 text-xs font-black text-indigo-950">4. Macrotasks (Phases libuv)</span>
            <h3 className="text-base font-bold text-slate-900">Les tâches événementielles</h3>
            <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              Les événements planifiés par l&apos;OS et les timers (<code className="font-bold">setTimeout</code>, <code className="font-bold">setInterval</code>, <code className="font-bold">setImmediate</code>) qui attendent leur tour dans le cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Visualiseur interactif */}
      <NodeMemoryEventLoopLab />

      {/* 3. Phases de l'Event Loop dans Node.js */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Le circuit de l&apos;Event Loop : les phases libuv
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          À chaque tour de piste (appelé un <strong>tick</strong>), l&apos;Event Loop traverse les phases suivantes :
        </p>

        {/* Table responsive : desktop view */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Étape du circuit</th>
                <th className="p-3.5">Mission de la phase</th>
                <th className="p-3.5">Exemple typique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">1. Timers</td>
                <td className="p-3.5">Vérifie si des décomptes sont arrivés à échéance.</td>
                <td className="p-3.5 font-mono text-xs text-slate-700">setTimeout(), setInterval()</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">2. Pending Callbacks</td>
                <td className="p-3.5">Traite les retours d&apos;erreurs système différés.</td>
                <td className="p-3.5 font-mono text-xs text-slate-700">Erreur TCP de connexion réseau</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">3. Poll (Le cœur battant)</td>
                <td className="p-3.5">Récupère les nouvelles requêtes entrantes et lectures disque.</td>
                <td className="p-3.5 font-mono text-xs text-slate-700">Lecture fs.readFile(), requêtes HTTP</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">4. Check</td>
                <td className="p-3.5">Exécute les rappels demandés immédiatement après l&apos;I/O.</td>
                <td className="p-3.5 font-mono text-xs text-slate-700">setImmediate()</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">5. Close Callbacks</td>
                <td className="p-3.5">Nettoie les connexions et sockets fermés.</td>
                <td className="p-3.5 font-mono text-xs text-slate-700">socket.on(&apos;close&apos;)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Version mobile en cartes (max 2 cartes par ligne) */}
        <div className="sm:hidden grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-bold text-indigo-700 text-sm">1. Timers</span>
            <p className="text-xs text-slate-800">Exécute les timers arrivés à échéance (<code className="font-bold">setTimeout</code>).</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-bold text-indigo-700 text-sm">2. Pending Callbacks</span>
            <p className="text-xs text-slate-800">Rappels système différés et erreurs réseau.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-bold text-indigo-700 text-sm">3. Poll (Le cœur)</span>
            <p className="text-xs text-slate-800">Réception des requêtes HTTP et fichiers prêts.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-bold text-indigo-700 text-sm">4. Check</span>
            <p className="text-xs text-slate-800">Rappels planifiés par <code className="font-bold">setImmediate()</code>.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-bold text-indigo-700 text-sm">5. Close Callbacks</span>
            <p className="text-xs text-slate-800">Nettoyage des ressources fermées.</p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            3.1 La nuance pratique : setTimeout(0) vs setImmediate()
          </h3>
          <p className="text-base font-medium text-slate-900 leading-relaxed">
            Dans un contexte de lecture de fichier ou d&apos;entrée/sortie (phase Poll), <code className="font-mono font-bold text-indigo-700">setImmediate()</code> est conçu pour passer <strong>avant</strong> un timer même réglé à 0 milliseconde :
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white break-words">
            <div className="font-mono text-xs sm:text-sm leading-relaxed text-indigo-100 overflow-x-auto">
              <pre>{`const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => console.log("2. Timer (tour suivant)"), 0);
  setImmediate(() => console.log("1. Immediate (dans la foulée de l'I/O)"));
});`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Démonstration pratique : La hiérarchie complète */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Démonstration pratique : L&apos;ordre officiel de priorité
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Voici le test de référence pour visualiser précisément qui passe devant qui :
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white break-words">
          <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} hierarchie-priorites.js</span>
          <div className="font-mono text-xs sm:text-sm leading-relaxed text-indigo-100 overflow-x-auto">
            <pre>{`console.log("1 - Code Synchrone n°1");

setTimeout(() => {
  console.log("5 - Timer (Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("4 - Promise.then (Microtask standard)");
});

process.nextTick(() => {
  console.log("3 - NextTick (Microtask prioritaire)");
});

setImmediate(() => {
  console.log("6 - SetImmediate (Phase Check)");
});

console.log("2 - Code Synchrone n°2");`}</pre>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 p-5 break-words">
          <h3 className="text-base sm:text-lg font-black text-indigo-950 mb-3">La règle de lecture à retenir par cœur :</h3>
          <ol className="list-decimal list-inside space-y-2 font-mono text-xs sm:text-sm font-bold text-slate-950">
            <li>Code synchrone direct <span className="font-sans font-normal text-slate-700">(S&apos;exécute sans attendre sur la Stack)</span></li>
            <li>process.nextTick() <span className="font-sans font-normal text-slate-700">(Passe immédiatement dès que la Stack se vide)</span></li>
            <li>Promises résolues (.then) <span className="font-sans font-normal text-slate-700">(File des microtâches classiques)</span></li>
            <li>Timers &amp; Macrotasks <span className="font-sans font-normal text-slate-700">(Quand l&apos;Event Loop entame ses phases libuv)</span></li>
          </ol>
        </div>
      </section>

      {/* 5. Travaux Pratiques */}
      <PracticalWork
        title="5. Travaux pratiques : Prouver le non-blocage dans Express"
        objective="Constater qu'une tâche longue en arrière-plan ne ralentit pas les autres requêtes utilisateurs"
        steps={[
          "Lancer un serveur Express avec deux routes d'accès",
          "Déclencher une route avec attente longue dans un premier onglet",
          "Ouvrir instantanément un second onglet pour vérifier la réactivité immédiate du serveur"
        ]}
      >
        <div className="space-y-4 break-words">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white break-words">
            <div className="font-mono text-xs sm:text-sm leading-relaxed text-indigo-100 overflow-x-auto">
              <pre>{`const express = require("express");
const app = express();

// Route A : Simule un appel lent à un service tiers (5 secondes)
app.get("/tache-lente", (req, res) => {
  setTimeout(() => {
    console.log("Fin du travail pour la tâche lente");
  }, 5000);
  res.send("Requête lente prise en charge !");
});

// Route B : Requête instantanée
app.get("/tache-rapide", (req, res) => {
  res.send("Réponse ultra-rapide en 1 milliseconde !");
});

app.listen(3000, () => console.log("Serveur démarré sur le port 3000"));`}</pre>
            </div>
          </div>

          <Callout type="tip" title="Résultat de l'expérience">
            <p>
              Même si 10 utilisateurs appellent en même temps <code className="font-bold">/tache-lente</code>, la route <code className="font-bold">/tache-rapide</code> continue de répondre en un éclair. C&apos;est précisément la force de Node.js pour bâtir des passerelles d&apos;IA.
            </p>
          </Callout>
        </div>
      </PracticalWork>

      {/* 6. Mini-évaluation interactive */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Mini-évaluation interactive
        </h2>

        <QuickQuiz
          title="Question 1 — Le rôle fondamental de l'Event Loop"
          question="Quelle est la fonction principale de l'Event Loop dans Node.js ?"
          options={[
            "Créer un thread système différent pour chaque visiteur",
            "Vérifier si le Call Stack est libre et y transférer les callbacks prêts des événements passés",
            "Réécrire le code JavaScript en langage C++ à la volée"
          ]}
          correctIndex={1}
          explanation="L'Event Loop est l'aiguilleur central. Il surveille en permanence la pile d'exécution et y pousse les fonctions de rappel dès qu'un travail externe s'achève."
        />

        <QuickQuiz
          title="Question 2 — Qui passe en premier ?"
          question="Entre une Promise résolue (.then) et un setTimeout(..., 0), qui s'exécute en premier ?"
          options={[
            "La Promise (.then), car c'est une microtâche prioritaire traitée avant les macrotâches",
            "Le setTimeout car le délai est fixé à zéro milliseconde",
            "C'est choisi au hasard par le système d'exploitation"
          ]}
          correctIndex={0}
          explanation="Les microtâches (Promises) sont vidées immédiatement dès que le Call Stack est libre, avant même que l'Event Loop ne commence ou ne poursuive son tour de phases."
        />

        <QuickQuiz
          title="Question 3 — L'effet du mot-clé await"
          question="Lorsque votre code exécute 'await appelerGemini()', que devient le serveur pendant les 2 secondes d'attente ?"
          options={[
            "Le serveur est totalement gelé et rejette les connexions entrantes",
            "La fonction en cours est mise en pause et le thread principal reste disponible pour servir les autres requêtes",
            "Le serveur plante avec un dépassement de pile (Stack Overflow)"
          ]}
          correctIndex={1}
          explanation="Le mot-clé await suspend uniquement la fonction locale sous forme de Promise. L'ouvrier JavaScript est immédiatement libéré pour répondre à toutes les autres requêtes entrantes."
        />
      </section>

      {/* 7. Checklist bilan */}
      <InteractiveChecklist
        title="7. Validation des acquis du Chapitre 2"
        items={[
          "Je comprends le rôle de l'aiguilleur (Event Loop) et de la voie de triage (libuv).",
          "Je distingue clairement Call Stack synchrone, Callbacks, Microtasks et Macrotasks.",
          "Je connais l'ordre de priorité : synchrone > nextTick > Promises > phases timers/I-O.",
          "Je comprends pourquoi une attente asynchrone ne bloque jamais les autres visiteurs.",
          "J'ai compris comment Node.js traite plusieurs requêtes d'IA en parallèle sur un thread unique."
        ]}
      />
    </div>
  );
};
