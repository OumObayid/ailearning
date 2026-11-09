'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { NodeMemoryEventLoopLab } from '@/components/interactive/NodeMemoryEventLoopLab';
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
          Chapitre 1 — Mémoire (RAM), Stack, Heap et Event Loop avec Node.js
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <p className="text-base sm:text-lg font-medium text-slate-900">
          A l&apos;issue de ce premier chapitre, vous serez capable de :
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base font-semibold text-slate-950">
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Expliquer simplement la différence entre RAM, Stack et Heap.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le rôle du Call Stack et de l&apos;Event Loop.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer une opération synchrone d&apos;une opération asynchrone.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre pourquoi un calcul CPU trop lourd peut paralyser Node.js.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 md:col-span-2">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Mesurer et observer en direct la consommation mémoire avec <code className="bg-slate-200 px-1.5 py-0.5 rounded text-indigo-900 font-bold">process.memoryUsage()</code>.</span>
          </li>
        </ul>
      </section>

      {/* 2. Comprendre la mémoire */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comprendre la mémoire
        </h2>

        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            2.1 La RAM : l&apos;espace de travail temporaire
          </h3>
          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            La <strong>RAM (Random Access Memory)</strong> est la mémoire ultra-rapide utilisée par votre machine pour stocker temporairement les instructions et données des programmes en cours d&apos;exécution.
          </p>

          <Callout type="info" title="L'analogie du bureau de travail">
            <p>
              Imaginez votre ordinateur comme un bureau de travail :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 font-semibold text-slate-900">
              <li><strong>Le disque dur (SSD)</strong> est une armoire où vous rangez vos dossiers de façon permanente.</li>
              <li><strong>La RAM</strong> est la surface de votre table où vous posez les dossiers ouverts dont vous avez besoin immédiatement.</li>
              <li><strong>Le processeur (CPU)</strong> est la personne assise au bureau qui lit et traite ces dossiers.</li>
            </ul>
          </Callout>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            2.2 Stack et Heap : deux zones fondamentales de V8
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 space-y-2">
              <span className="inline-flex rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-950">Zone 1</span>
              <h4 className="text-lg font-black text-slate-950">La Stack (La Pile)</h4>
              <p className="text-base font-medium text-slate-900 leading-relaxed">
                Elle conserve les <strong>frames d&apos;exécution des fonctions</strong> et les variables locales primitives (nombres, booléens). Les fonctions s&apos;empilent (push) lors de l&apos;appel puis se dépilent (pop) dès qu&apos;elles se terminent. Accès ultra-rapide et taille stricte.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 space-y-2">
              <span className="inline-flex rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-950">Zone 2</span>
              <h4 className="text-lg font-black text-slate-950">Le Heap (Le Tas)</h4>
              <p className="text-base font-medium text-slate-900 leading-relaxed">
                C&apos;est le vaste espace de stockage dynamique où JavaScript alloue les <strong>objets, tableaux, closures et instances</strong>. Sa taille varie dynamiquement, et les données y subsistent tant qu&apos;elles restent référencées.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} Exemple d&apos;allocation en mémoire</span>
            <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`function calculer() {
  const nombre = 10; // Primitive -> Stockée directement dans la Stack
  const utilisateur = { // Référence dans la Stack -> Objet stocké dans le Heap
    nom: "Amine",
    age: 25
  };
  console.log(nombre);
  console.log(utilisateur.nom);
}

calculer(); // Entrée dans la Stack, puis retrait dès la fin d'exécution`}
            </pre>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            2.3 Pourquoi la mémoire peut-elle poser problème ? (Fuite mémoire)
          </h3>
          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            Observez attentivement cette mauvaise pratique fréquente dans une API backend :
          </p>

          <div className="rounded-2xl border border-rose-300 bg-rose-50/50 p-5">
            <span className="text-xs font-mono uppercase text-rose-800 font-bold block mb-1">⚠️ Risque de fuite mémoire (Memory Leak)</span>
            <pre className="font-mono text-sm leading-relaxed text-rose-950 overflow-x-auto">
{`const utilisateurs = []; // Tableau global qui ne se vide JAMAIS

app.get("/ajouter", (req, res) => {
  utilisateurs.push({
    nom: "Utilisateur",
    date: new Date()
  });
  res.json({ total: utilisateurs.length });
});`}
            </pre>
            <p className="mt-3 text-sm font-semibold text-rose-900">
              ì chaque appel de <code className="bg-rose-200/60 px-1 py-0.5 rounded font-bold text-rose-950">/ajouter</code>, un objet est accumulé dans le tableau global. Le Garbage Collector ne peut jamais le libérer car la référence reste active indéfiniment.
            </p>
          </div>
        </div>
      </section>

      {/* Laboratoire interactif */}
      <NodeMemoryEventLoopLab />

      {/* 3. Démonstration pratique Node.js */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Démonstration pratique Node.js : observer la mémoire
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Créons une API Express minimale pour inspecter les indicateurs réels de Node.js via <code className="font-mono font-bold bg-slate-200 text-indigo-950 px-1.5 py-0.5 rounded">process.memoryUsage()</code>.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
          <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} server.js</span>
          <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const express = require("express");
const app = express();
const PORT = 3000;

// Tableau qui conserve volontairement les données
const utilisateurs = [];

app.get("/", (req, res) => {
  res.send("Serveur Node.js opérationnel !");
});

// Afficher la consommation mémoire en direct
app.get("/memory", (req, res) => {
  const memory = process.memoryUsage();
  res.json({
    rss: (memory.rss / 1024 / 1024).toFixed(2) + " MB",
    heapUsed: (memory.heapUsed / 1024 / 1024).toFixed(2) + " MB",
    heapTotal: (memory.heapTotal / 1024 / 1024).toFixed(2) + " MB"
  });
});

// Ajouter 10 000 objets en RAM
app.get("/add", (req, res) => {
  for (let i = 0; i < 10000; i++) {
    utilisateurs.push({
      id: utilisateurs.length + 1,
      nom: "Utilisateur " + i,
      email: \`user\${i}@test.com\`
    });
  }
  res.json({
    message: "Données ajoutées",
    total: utilisateurs.length
  });
});

app.listen(PORT, () => {
  console.log(\`Serveur démarré sur http://localhost:\${PORT}\`);
});`}
          </pre>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Adresse de test</th>
                <th className="p-3.5">Action réalisée</th>
                <th className="p-3.5">Résultat à observer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">http://localhost:3000/</td>
                <td className="p-3.5">Vérifie l&apos;état du serveur</td>
                <td className="p-3.5">Message de bienvenue</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">http://localhost:3000/memory</td>
                <td className="p-3.5">Relevé de référence</td>
                <td className="p-3.5">heapUsed initial (ex: ~12 MB)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">http://localhost:3000/add</td>
                <td className="p-3.5">Ajout de 10 000 objets</td>
                <td className="p-3.5">Allocation dans le Heap</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">http://localhost:3000/memory</td>
                <td className="p-3.5">Relevé après ajout</td>
                <td className="p-3.5">heapUsed grimpe significativement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Call Stack & Event Loop */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Comprendre le Call Stack et l&apos;Event Loop
        </h2>

        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            4.1 Le Call Stack (Pile d&apos;exécution)
          </h3>
          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            Le Call Stack suit les fonctions en cours d&apos;exécution selon la règle LIFO (Last In, First Out). JavaScript est <strong>mono-threadé</strong> : il n&apos;exécute qu&apos;une seule instruction à la fois sur ce Call Stack.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            4.2 L&apos;Event Loop et les Microtâches
          </h3>
          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            Considérez ce cas d&apos;école :
          </p>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`console.log("Début");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("Fin");

// RÉSULTAT OBTENU :
// Début
// Fin
// Promise
// Timer`}
            </pre>
          </div>

          <Callout type="warning" title="La règle absolue de priorité">
            <p>
              1. Le code synchrone s&apos;exécute immédiatement (<code className="font-bold">Début</code>, puis <code className="font-bold">Fin</code>).<br />
              2. La file des <strong>microtâches (Promises)</strong> est intégralement vidée avant de passer aux timers.<br />
              3. Le callback de <code className="font-bold">setTimeout(0)</code> n&apos;est exécuté que lorsque le Call Stack est libre ET que les microtâches sont achevées.
            </p>
          </Callout>
        </div>
      </section>

      {/* 5. Bloquer ou ne pas bloquer Node.js */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Démonstration : Bloquer ou ne pas bloquer Node.js
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5 space-y-3">
            <h3 className="text-lg font-black text-rose-950">❌ Route CPU bloquante</h3>
            <pre className="font-mono text-xs leading-relaxed text-rose-950 bg-white/80 p-3 rounded-xl border border-rose-200 overflow-x-auto">
{`app.get("/block", (req, res) => {
  const debut = Date.now();
  // Boucle synchrone lourde
  while (Date.now() - debut < 10000) {
    // Monopolise le thread à 100%
  }
  res.send("Terminé");
});`}
            </pre>
            <p className="text-sm font-semibold text-rose-900 leading-relaxed">
              Pendant 10 secondes, le thread unique est figé. Plus aucune autre requête HTTP (même un simple <code className="font-bold">/</code>) ne peut être traitée pour aucun utilisateur !
            </p>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5 space-y-3">
            <h3 className="text-lg font-black text-emerald-950">✅ Route asynchrone non-bloquante</h3>
            <pre className="font-mono text-xs leading-relaxed text-emerald-950 bg-white/80 p-3 rounded-xl border border-emerald-200 overflow-x-auto">
{`app.get("/async", async (req, res) => {
  // Attente non-bloquante (ex: appel API IA)
  await new Promise(resolve => {
    setTimeout(resolve, 10000);
  });
  res.send("Attente terminée");
});`}
            </pre>
            <p className="text-sm font-semibold text-emerald-900 leading-relaxed">
              Pendant l&apos;attente, Node.js délègue le timer à libuv et libère le Call Stack pour répondre instantanément à toutes les autres requêtes entrantes.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TP Pratique : Frontend React & Chronomètre */}
      <PracticalWork
        title="6. Démonstration React : Mesurer la latence et le blocage"
        objective="Observer la différence d'expérience utilisateur entre route bloquante et asynchrone avec performance.now()"
        steps={[
          "Observer la différence d'expérience utilisateur entre route bloquante et asynchrone",
          "Mesurer le temps de réponse avec window.performance.now()",
          "Comprendre le comportement de l'interface client face à un thread backend saturé"
        ]}
      >
        <div className="space-y-4">
          <p className="text-base font-semibold text-slate-900">
            Intégrez ce composant dans votre frontend React pour envoyer des requêtes concurrentes à votre serveur Express :
          </p>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} App.jsx (React)</span>
            <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`import { useState } from "react";

function App() {
  const [resultat, setResultat] = useState("");
  const [chargement, setChargement] = useState(false);

  async function testerRoute(route) {
    setChargement(true);
    setResultat("Traitement en cours...");
    const debut = performance.now();
    try {
      const response = await fetch(\`http://localhost:3000/\${route}\`);
      const data = await response.text();
      const duree = (performance.now() - debut).toFixed(0);
      setResultat(\`\${data} | Durée : \${duree} ms\`);
    } catch (error) {
      setResultat("Erreur : " + error.message);
    } finally {
      setChargement(false);
    }
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Test du serveur Node.js</h1>
      <div className="space-x-3">
        <button onClick={() => testerRoute("block")} className="px-4 py-2 bg-rose-600 text-white rounded-lg">
          Tester route bloquante
        </button>
        <button onClick={() => testerRoute("async")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
          Tester route asynchrone
        </button>
      </div>
      <p className="text-lg font-bold">{chargement ? "Chargement..." : resultat}</p>
    </main>
  );
}`}
            </pre>
          </div>
        </div>
      </PracticalWork>

      {/* 7. Exercices interactifs */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Exercices pratiques interactifs
        </h2>

        <QuickQuiz
          title="Exercice 1 — Prédire l'ordre d'exécution"
          question={`Considérez ce code sans l'exécuter :
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
Promise.resolve().then(() => console.log("4"));
console.log("5");

Quelle sera la séquence exacte affichée dans la console ?`}
          options={[
            "1, 2, 3, 4, 5",
            "1, 3, 5, 4, 2",
            "1, 3, 4, 2, 5",
            "1, 5, 3, 2, 4"
          ]}
          correctIndex={1}
          explanation="Le code synchrone s'exécute d'abord (1, 3, 5). Ensuite la file des microtâches (Promise 4) est traitée avant les macrotâches/timers (setTimeout 2). La réponse est donc 1, 3, 5, 4, 2."
        />

        <QuickQuiz
          title="Exercice 2 — Identifier un risque de fuite mémoire"
          question={`Soit le code suivant :
const historique = [];
app.get("/historique", (req, res) => {
  historique.push({ date: new Date(), message: "Demande IA" });
  res.json({ total: historique.length });
});

Pourquoi ce code provoque-t-il une croissance infinie de la mémoire RAM ?`}
          options={[
            "Parce que chaque requête instancie un nouveau serveur Express",
            "Parce que les objets restent référencés dans le tableau global et le Garbage Collector ne peut pas les libérer",
            "Parce que Node.js ne dispose pas de ramasse-miettes"
          ]}
          correctIndex={1}
          explanation="Les objets restent rattachés à une variable vivante en portée globale. Tant qu'un chemin de référence existe, le Garbage Collector (V8) a l'obligation stricte de conserver la mémoire allouée."
        />

        <QuickQuiz
          title="Exercice 3 — Comprendre le blocage CPU"
          question="Si une route /analyse effectue un calcul synchrone lourd de 10 secondes sur le thread principal, que se passe-t-il pour un autre utilisateur appelant la route légère /status ?"
          options={[
            "/status répond toujours immédiatement car Node.js crée un thread par requête",
            "/status est bloquée en file d'attente et ne répond qu'après la fin des 10 secondes de calcul",
            "Node.js stoppe automatiquement le processus avec une erreur 500"
          ]}
          correctIndex={1}
          explanation="JavaScript s'exécute sur un seul thread. Une boucle synchrone occupe le Call Stack sans interruption, empêchant l'Event Loop de dépiler le callback de la requête /status."
        />
      </section>

      {/* 8. Tableau de synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Synthèse : Les concepts clés à retenir
        </h2>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Notion</th>
                <th className="p-3.5">Ce qu&apos;il faut impérativement retenir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">RAM</td>
                <td className="p-3.5">Mémoire vive temporaire utilisée par le processus Node.js pour son exécution.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Stack (Pile)</td>
                <td className="p-3.5">Gère les appels de fonctions et les variables locales primitives (très rapide).</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Heap (Tas)</td>
                <td className="p-3.5">Zone dynamique où résident les objets, tableaux et structures complexes.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Garbage Collector</td>
                <td className="p-3.5">Programme interne de V8 qui recycle automatiquement les objets devenus inaccessibles.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Event Loop</td>
                <td className="p-3.5">Ordonnanceur de libuv coordonnant les callbacks asynchrones quand le Call Stack se vide.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Calcul bloquant</td>
                <td className="p-3.5">Une boucle CPU intensive bloque tout le serveur s&apos;il n&apos;est pas délégué à un Worker.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. Lien avec le Backend IA */}
      <section className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900">
          9. Le lien avec votre futur Backend IA
        </h2>
        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Dans une architecture moderne combinant <strong>React → Node.js Express → Google Gemini</strong> :
        </p>
        <ul className="list-disc list-inside space-y-2 text-base font-semibold text-slate-900">
          <li><strong>React</strong> s&apos;exécute dans le navigateur client et utilise la mémoire de la machine cliente.</li>
          <li><strong>Node.js</strong> agit comme passerelle sécurisée : il reçoit la requête, valide les données et appelle l&apos;API Gemini via HTTPS.</li>
          <li><strong>Gemini</strong> exécute l&apos;inférence sur les serveurs de Google. Cette attente réseau est <strong>asynchrone et non bloquante</strong> : pendant les 2 secondes d&apos;inférence de Gemini, Node.js peut répondre à des dizaines d&apos;autres requêtes !</li>
        </ul>
      </section>

      {/* 10. Checklist de validation */}
      <InteractiveChecklist
        title="10. Validation des compétences du Chapitre 1"
        items={[
          "Je sais expliquer simplement la différence entre RAM, Stack et Heap.",
          "Je comprends pourquoi un tableau global non purgé provoque une fuite mémoire.",
          "Je sais expliquer le rôle du Call Stack et de l'Event Loop.",
          "Je distingue clairement une attente réseau asynchrone d'un calcul CPU synchrone bloquant.",
          "J'ai testé et observé les routes /memory, /add, /block et /async."
        ]}
      />
    </div>
  );
};

