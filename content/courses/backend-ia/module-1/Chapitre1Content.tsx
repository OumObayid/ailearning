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
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Fondations Système</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Mémoire (RAM), Stack, Heap et Event Loop avec Node.js
        </h1>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-700">
          Comprendre ce qui se passe sous le capot de votre serveur Node.js lorsqu&apos;il exécute du code et reçoit des requêtes.
        </p>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <p className="text-base sm:text-lg font-medium text-slate-900">
          À l&apos;issue de ce premier chapitre, vous serez capable de :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-semibold text-slate-950">
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Expliquer avec des mots simples la différence entre la RAM, la Stack et le Heap.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le rôle du Call Stack et pourquoi Node.js est dit &quot;mono-threadé&quot;.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer une opération instantanée d&apos;une opération asynchrone non-bloquante.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre pourquoi un calcul mathématique trop lourd peut paralyser tout un serveur.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:col-span-2 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Mesurer et surveiller la mémoire d&apos;un serveur en direct avec <code className="bg-slate-200 px-1.5 py-0.5 rounded text-indigo-900 font-bold">process.memoryUsage()</code>.</span>
          </div>
        </div>
      </section>

      {/* 2. Comprendre la mémoire */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comprendre la mémoire d&apos;un serveur
        </h2>

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            2.1 La RAM : l&apos;espace de travail temporaire
          </h3>
          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            La <strong>RAM (Random Access Memory)</strong> est la mémoire ultra-rapide de votre machine. Dès que vous lancez un serveur Node.js, le système d&apos;exploitation lui réserve un espace dans cette RAM pour y déposer son code, ses variables et les requêtes des utilisateurs en cours de traitement.
          </p>

          <Callout type="info" title="L'analogie du bureau de travail (très facile à visualiser)">
            <p className="leading-relaxed">
              Pour visualiser clairement le rôle de chaque composant de votre ordinateur :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 font-semibold text-slate-900">
              <li><strong>Le disque dur (SSD) :</strong> C&apos;est comme une <em>armoire d&apos;archivage</em>. Vos fichiers y sont rangés pour toujours, même quand la machine s&apos;éteint, mais aller chercher un dossier prend un certain temps.</li>
              <li><strong>La mémoire vive (RAM) :</strong> C&apos;est la <em>surface de votre bureau</em>. Vous y posez les dossiers ouverts dont vous avez besoin immédiatement. C&apos;est ultra rapide d&apos;accès, mais quand on range le bureau (arrêt du serveur), tout ce qui n&apos;a pas été rangé dans l&apos;armoire disparaît.</li>
              <li><strong>Le processeur (CPU) :</strong> C&apos;est la <em>personne assise au bureau</em>. Elle lit les documents posés sur la table, calcule les résultats et prend des décisions.</li>
            </ul>
          </Callout>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            2.2 Stack et Heap : les deux compartiments de Node.js
          </h3>
          <p className="text-base font-medium text-slate-900 leading-relaxed">
            Le moteur JavaScript <strong>V8</strong> (le cerveau de Node.js développé par Google) découpe la mémoire en deux zones bien distinctes ayant chacune une mission précise :
          </p>

          {/* Max 2 cartes par ligne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-indigo-200 bg-white p-5 space-y-2 break-words shadow-sm">
              <span className="inline-flex rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-950">Compartiment 1</span>
              <h4 className="text-lg font-black text-slate-950">La Stack (La Pile)</h4>
              <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                Imaginez une <strong>pile d&apos;assiettes</strong> : vous ne pouvez ajouter ou retirer qu&apos;une assiette au sommet (principe <em>LIFO : Dernier arrivé, premier sorti</em>).
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm font-semibold text-slate-700 space-y-1">
                <li>Elle retient la fonction qui tourne en ce moment.</li>
                <li>Elle garde les petites variables simples (nombres, booléens).</li>
                <li>Dès qu&apos;une fonction se termine, elle est retirée immédiatement.</li>
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-indigo-200 bg-white p-5 space-y-2 break-words shadow-sm">
              <span className="inline-flex rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-950">Compartiment 2</span>
              <h4 className="text-lg font-black text-slate-950">Le Heap (Le Tas)</h4>
              <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                Imaginez un <strong>grand entrepôt de stockage</strong> pour les objets volumineux ou dont la taille peut grandir avec le temps.
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm font-semibold text-slate-700 space-y-1">
                <li>Elle stocke les objets, les tableaux et les longues chaînes.</li>
                <li>La Stack ne garde qu&apos;une petite &quot;étiquette d&apos;adresse&quot; (référence) qui pointe vers cet entrepôt.</li>
                <li>Le nettoyage automatique est assuré par le <em>Garbage Collector</em>.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white break-words">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} Exemple concret : Qui va où dans la mémoire ?</span>
            <div className="font-mono text-xs sm:text-sm leading-relaxed text-indigo-100 overflow-x-auto">
              <pre>{`function preparerReponseIA() {
  const codeHttp = 200;           // Type simple -> Reste bien au chaud dans la Stack
  const utilisateur = {           // L'adresse est dans la Stack...
    prenom: "Sarah",              // ...mais tout le contenu de l'objet
    role: "Admin"                 // réside physiquement dans le Heap !
  };

  console.log("Statut:", codeHttp);
  console.log("Utilisateur:", utilisateur.prenom);
}

preparerReponseIA(); // 1. La fonction entre sur la Stack -> 2. s'exécute -> 3. se vide aussitôt`}</pre>
            </div>
          </div>
        </div>

        {/* 2.3 Fuite mémoire vulgarisée */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            2.3 Le piège n°1 en Backend : La fuite de mémoire (Memory Leak)
          </h3>
          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            Pourquoi un serveur Node.js peut-il planter au bout de 2 jours alors que le code semble fonctionner ? À cause d&apos;une <strong>accumulation invisible</strong>.
          </p>

          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/70 p-5 break-words space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-xs uppercase tracking-wider">
              <Icon name="warning" className="w-4 h-4 text-rose-700 shrink-0" />
              <span>Exemple d&apos;erreur classique de débutant</span>
            </div>
            <div className="font-mono text-xs sm:text-sm leading-relaxed text-rose-950 bg-white/90 p-4 rounded-xl border border-rose-200 overflow-x-auto">
              <pre>{`// ❌ MAUVAISE PRATIQUE : un tableau déclaré tout en haut du fichier
const historiqueMessages = []; 

app.post("/chat", (req, res) => {
  // À chaque message d'un visiteur, on ajoute un objet dans le tableau
  historiqueMessages.push({
    prompt: req.body.prompt,
    date: new Date()
  });
  
  res.json({ confirmation: "Message enregistré" });
});`}</pre>
            </div>
            <div className="text-sm font-semibold text-rose-900 leading-relaxed">
              <strong>Ce qui se produit :</strong> Le tableau <code className="bg-rose-200/60 px-1 py-0.5 rounded font-bold text-rose-950">historiqueMessages</code> ne se vide jamais. Au bout de 50 000 requêtes, la RAM du serveur est saturée et le système d&apos;exploitation coupe brutalement le serveur avec un message <em>&quot;JavaScript heap out of memory&quot;</em>.
            </div>
          </div>
        </div>
      </section>

      {/* Laboratoire interactif */}
      <NodeMemoryEventLoopLab />

      {/* 3. Démonstration pratique Node.js */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Démonstration pratique : Mesurer la mémoire en direct
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Node.js intègre un outil natif très simple pour surveiller sa santé en temps réel : la fonction <code className="font-mono font-bold bg-slate-200 text-indigo-950 px-1.5 py-0.5 rounded">process.memoryUsage()</code>.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white break-words">
          <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} server.js — Détecter la mémoire avec Express</span>
          <div className="font-mono text-xs sm:text-sm leading-relaxed text-indigo-100 overflow-x-auto">
            <pre>{`const express = require("express");
const app = express();
const PORT = 3000;

// Tableau de test pour simuler une consommation
const cacheTemporaire = [];

// 1. Route pour lire l'état de la mémoire
app.get("/memory", (req, res) => {
  const m = process.memoryUsage();
  res.json({
    // RSS : Mémoire totale occupée sur la machine (en Mo)
    rss: (m.rss / 1024 / 1024).toFixed(2) + " MB",
    // heapUsed : Mémoire réellement consommée par nos objets
    heapUsed: (m.heapUsed / 1024 / 1024).toFixed(2) + " MB",
    // heapTotal : Taille totale actuellement réservée pour le Heap
    heapTotal: (m.heapTotal / 1024 / 1024).toFixed(2) + " MB"
  });
});

// 2. Route pour injecter des données et observer l'effet
app.get("/ajouter", (req, res) => {
  for (let i = 0; i < 10000; i++) {
    cacheTemporaire.push({
      id: i,
      texte: "Donnée de test n°" + i,
      date: new Date()
    });
  }
  res.json({ message: "10 000 objets ajoutés !", total: cacheTemporaire.length });
});

app.listen(PORT, () => console.log(\`Serveur prêt sur http://localhost:\${PORT}\`));`}</pre>
          </div>
        </div>

        {/* Tableau explicatif responsive : desktop table + mobile cards */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Adresse à tester</th>
                <th className="p-3.5">Action réalisée</th>
                <th className="p-3.5">Ce que vous observez</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">GET /memory</td>
                <td className="p-3.5">Premier relevé au repos</td>
                <td className="p-3.5">Le <code className="font-bold">heapUsed</code> est bas (environ 5 à 12 Mo).</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">GET /ajouter</td>
                <td className="p-3.5">Création de 10 000 objets en RAM</td>
                <td className="p-3.5">Les objets s&apos;installent dans le Heap.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">GET /memory</td>
                <td className="p-3.5">Deuxième relevé de contrôle</td>
                <td className="p-3.5">Le <code className="font-bold">heapUsed</code> a nettement augmenté.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Version mobile en cartes (max 2 cartes par ligne) */}
        <div className="sm:hidden grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 break-words">
            <span className="font-mono text-xs font-bold text-indigo-700">GET /memory</span>
            <p className="text-sm font-bold text-slate-900">Relevé initial au repos</p>
            <p className="text-xs text-slate-700">Le heapUsed se situe entre 5 et 12 Mo.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 break-words">
            <span className="font-mono text-xs font-bold text-indigo-700">GET /ajouter</span>
            <p className="text-sm font-bold text-slate-900">Injection de 10 000 objets</p>
            <p className="text-xs text-slate-700">Les données remplissent immédiatement le Heap.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 break-words">
            <span className="font-mono text-xs font-bold text-indigo-700">GET /memory</span>
            <p className="text-sm font-bold text-slate-900">Relevé après injection</p>
            <p className="text-xs text-slate-700">Le heapUsed grimpe en flèche.</p>
          </div>
        </div>
      </section>

      {/* 4. Call Stack & Mono-thread */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le Call Stack et la nature &quot;mono-threadée&quot; de Node.js
        </h2>

        <div className="space-y-4">
          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            Dire que Node.js est <strong>mono-threadé</strong> signifie une chose capitale : <strong>il ne possède qu&apos;un seul ouvrier principal</strong> pour exécuter vos lignes de code JavaScript l&apos;une après l&apos;autre.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 space-y-2 break-words shadow-sm">
              <h3 className="text-base font-black text-slate-950">Ce que fait le Call Stack</h3>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                Il enregistre à quel endroit du code nous nous trouvons. Si vous appelez la fonction <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">A()</code>, puis qu&apos;elle appelle <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">B()</code>, la Stack empile d&apos;abord A, puis B par-dessus.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 space-y-2 break-words shadow-sm">
              <h3 className="text-base font-black text-slate-950">Le danger d&apos;un blocage</h3>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                Tant que l&apos;ouvrier est occupé à faire un calcul complexe sur une fonction, la Stack est bloquée. <strong>Aucun autre utilisateur ne peut recevoir de réponse pendant ce temps !</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Comparaison : Bloquant vs Non-Bloquant */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Comparaison pratique : Bloquer ou libérer Node.js
        </h2>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5 space-y-3 break-words shadow-sm">
            <div className="flex items-center gap-2 text-rose-950 font-black text-base">
              <Icon name="x-circle" className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Route bloquante (Calcul lourd)</span>
            </div>
            <div className="font-mono text-xs leading-relaxed text-rose-950 bg-white p-3 rounded-xl border border-rose-200 overflow-x-auto">
              <pre>{`app.get("/calcul-lourd", (req, res) => {
  const fin = Date.now() + 5000;
  // Boucle synchrone de 5 secondes
  while (Date.now() < fin) {
    // Le processeur tourne à 100%
  }
  res.send("Calcul terminé");
});`}</pre>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-rose-900 leading-relaxed">
              ⚠️ <strong>Catastrophe :</strong> Pendant ces 5 secondes, le serveur ne répond à personne. Même un utilisateur ouvrant la page d&apos;accueil reste bloqué devant un écran blanc !
            </p>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5 space-y-3 break-words shadow-sm">
            <div className="flex items-center gap-2 text-emerald-950 font-black text-base">
              <Icon name="check-circle" className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Route asynchrone (Attente IA)</span>
            </div>
            <div className="font-mono text-xs leading-relaxed text-emerald-950 bg-white p-3 rounded-xl border border-emerald-200 overflow-x-auto">
              <pre>{`app.get("/appel-ia", async (req, res) => {
  // Attente non-bloquante (ex: réponse Gemini)
  await new Promise(resolve => {
    setTimeout(resolve, 5000);
  });
  res.send("Réponse IA prête");
});`}</pre>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-emerald-900 leading-relaxed">
              ✅ <strong>Parfait :</strong> Pendant l&apos;attente des 5 secondes, l&apos;ouvrier Node.js est libre comme l&apos;air ! Il peut répondre instantanément à des centaines d&apos;autres visiteurs.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Travaux Pratiques avec React */}
      <PracticalWork
        title="6. Démonstration Frontend : Mesurer la latence et le blocage"
        objective="Constater visuellement la différence entre une API bloquante et une API asynchrone depuis une interface React"
        steps={[
          "Créer deux boutons de test dans votre interface React",
          "Mesurer le temps de réponse avec la méthode standard window.performance.now()",
          "Constater comment une seule requête mal conçue peut geler l'expérience de tous vos utilisateurs"
        ]}
      >
        <div className="space-y-4 break-words">
          <p className="text-base font-semibold text-slate-900">
            Copiez ce composant simple dans votre application React pour expérimenter le test :
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white break-words">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} TesteurDeLatence.jsx</span>
            <div className="font-mono text-xs sm:text-sm leading-relaxed text-indigo-100 overflow-x-auto">
              <pre>{`import { useState } from "react";

export function TesteurDeLatence() {
  const [etat, setEtat] = useState("En attente de test");
  const [enChargement, setEnChargement] = useState(false);

  async function tester(endpoint) {
    setEnChargement(true);
    setEtat("Requête envoyée...");
    const debut = performance.now();
    try {
      const rep = await fetch("http://localhost:3000/" + endpoint);
      const texte = await rep.text();
      const tempsTotal = (performance.now() - debut).toFixed(0);
      setEtat(\`\${texte} en \${tempsTotal} ms\`);
    } catch (e) {
      setEtat("Erreur de connexion");
    } finally {
      setEnChargement(false);
    }
  }

  return (
    <div className="p-6 rounded-2xl border-2 border-slate-200 bg-white space-y-4">
      <h3 className="text-lg font-bold">Laboratoire de test Backend</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => tester("calcul-lourd")}
          disabled={enChargement}
          className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 disabled:opacity-50"
        >
          Tester route bloquante
        </button>
        <button
          onClick={() => tester("appel-ia")}
          disabled={enChargement}
          className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:opacity-50"
        >
          Tester route asynchrone
        </button>
      </div>
      <p className="font-mono text-sm font-bold text-indigo-950 bg-slate-100 p-3 rounded-lg">
        {enChargement ? "⏳ Chargement en cours..." : etat}
      </p>
    </div>
  );
}`}</pre>
            </div>
          </div>
        </div>
      </PracticalWork>

      {/* 7. Exercices interactifs de validation */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Exercices interactifs de validation
        </h2>

        <QuickQuiz
          title="Exercice 1 — La Stack et le Heap"
          question="Où est stocké le contenu complet d'un objet utilisateur volumineux en JavaScript ?"
          options={[
            "Dans la Stack exclusivement",
            "Dans le Heap, la Stack ne conservant qu'une référence vers cet objet",
            "Directement sur le disque dur SSD"
          ]}
          correctIndex={1}
          explanation="La Stack est dédiée aux variables simples et aux pointeurs d'exécution. Les objets et tableaux dynamiques résident physiquement dans le Heap."
        />

        <QuickQuiz
          title="Exercice 2 — Identifier la cause d'une fuite mémoire"
          question="Pourquoi l'ajout continu d'éléments dans un tableau global provoque-t-il une fuite de mémoire ?"
          options={[
            "Parce que Node.js ne dispose d'aucun système de nettoyage de mémoire",
            "Parce que les objets restent rattachés à une variable vivante et le Garbage Collector n'a pas le droit de les détruire",
            "Parce qu'Express recharge le serveur à chaque requête"
          ]}
          correctIndex={1}
          explanation="Le Garbage Collector a pour règle d'or de ne jamais supprimer un objet auquel votre code peut encore accéder. Une variable globale restant vivante en permanence, tout ce qu'elle contient est conservé indéfiniment."
        />

        <QuickQuiz
          title="Exercice 3 — Comprendre le mono-thread"
          question="Si une route exécute une boucle 'while' bloquante pendant 8 secondes, que ressent un deuxième utilisateur voulant consulter la page d'accueil ?"
          options={[
            "Il reçoit la page d'accueil instantanément car Node.js crée un processus par utilisateur",
            "Sa requête est suspendue et patiente pendant 8 secondes avant d'être traitée",
            "Le serveur redémarre instantanément sans prévenir"
          ]}
          correctIndex={1}
          explanation="Le thread JavaScript principal est unique. Tant qu'il est coincé dans une boucle synchrone, aucune autre requête ne peut entrer sur le Call Stack."
        />
      </section>

      {/* 8. Synthèse récapitulative */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Synthèse : Les 4 règles d&apos;or à retenir
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4.5 space-y-1.5 break-words shadow-sm">
            <span className="text-xs font-black uppercase text-indigo-700">Règle n°1</span>
            <h3 className="text-base font-bold text-slate-950">RAM = Bureau de travail</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              La RAM héberge vos données en cours d&apos;utilisation. Elle est ultra-rapide mais limitée.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4.5 space-y-1.5 break-words shadow-sm">
            <span className="text-xs font-black uppercase text-indigo-700">Règle n°2</span>
            <h3 className="text-base font-bold text-slate-950">Stack vs Heap</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              La Stack gère les fonctions empilées (LIFO). Le Heap stocke les objets et les tableaux.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4.5 space-y-1.5 break-words shadow-sm">
            <span className="text-xs font-black uppercase text-indigo-700">Règle n°3</span>
            <h3 className="text-base font-bold text-slate-950">Pas de variables globales infinies</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Tout tableau global qui grossit sans arrêt finira par faire crasher le serveur (Memory Leak).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4.5 space-y-1.5 break-words shadow-sm">
            <span className="text-xs font-black uppercase text-indigo-700">Règle n°4</span>
            <h3 className="text-base font-bold text-slate-950">Ne jamais bloquer le thread</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Déléguez les calculs lourds et utilisez l&apos;asynchrone pour les opérations réseaux et IA.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Lien avec le Backend IA */}
      <section className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/50 p-6 sm:p-8 space-y-3 break-words">
        <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider">
          <Icon name="sparkles" className="w-4 h-4 text-indigo-700 shrink-0" />
          <span>Pourquoi est-ce crucial pour une application d&apos;IA ?</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black text-slate-950">
          Le lien direct avec votre futur Backend IA
        </h2>
        <p className="text-base font-medium text-slate-900 leading-relaxed">
          Lorsqu&apos;un utilisateur pose une question à un modèle d&apos;IA (comme Google Gemini), la réponse met souvent entre 1 et 3 secondes à être générée. Grâce à l&apos;architecture non-bloquante de Node.js :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base font-semibold text-slate-900">
          <li>Votre serveur Node.js envoie la requête à l&apos;API de Google et <strong>libère immédiatement son ouvrier</strong>.</li>
          <li>Pendant les 2 secondes d&apos;attente, ce même serveur peut accueillir 200 autres visiteurs sans aucun ralentissement.</li>
          <li>Dès que Google a terminé, l&apos;Event Loop réveille le callback et envoie la réponse au client.</li>
        </ul>
      </section>

      {/* 10. Checklist de validation */}
      <InteractiveChecklist
        title="10. Validation des compétences du Chapitre 1"
        items={[
          "Je sais expliquer la métaphore du bureau de travail (SSD, RAM, CPU).",
          "Je distingue la Stack (pile rapide) du Heap (entrepôt des objets).",
          "Je comprends pourquoi un tableau global non vidé provoque une fuite de mémoire.",
          "Je sais pourquoi une boucle de calcul synchrone paralyse le serveur pour tous les utilisateurs.",
          "Je sais utiliser process.memoryUsage() pour surveiller la santé d'un serveur."
        ]}
      />
    </div>
  );
};
