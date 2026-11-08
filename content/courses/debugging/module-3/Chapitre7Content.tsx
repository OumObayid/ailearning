'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Erreurs de synchronisation et Race Conditions
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre pourquoi l&apos;ordre de fin diffère de l&apos;ordre de lancement.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier une condition de concurrence (Race Condition) lors d&apos;accès simultanés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Appliquer des requêtes conditionnelles atomiques en base de données.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Sérialiser des opérations concurrentes avec une file d&apos;attente (Promise Queue).</span>
          </li>
        </ul>
      </section>

      {/* 2. L'ordre de terminaison */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Non-déterminisme de l&apos;ordre de terminaison
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Si trois opérations asynchrones sont initiées dans l&apos;ordre <code className="font-mono font-bold">A, B, C</code> avec des latences variables (3s, 1s, 2s), les résultats arriveront inévitablement dans l&apos;ordre <code className="font-mono font-bold text-emerald-700">B, C, A</code> :
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-emerald-400 font-bold">{`// Démonstration d'inversion d'arrivée :`}</div>
          <div>{`operation("A", 3000); // Démarre en premier
operation("B", 1000); // Démarre en deuxième
operation("C", 2000); // Démarre en troisième

// Sortie console réelle :
// > B (1s)
// > C (2s)
// > A (3s)`}</div>
        </div>
      </section>

      {/* 3. Anatomie d'une Race Condition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Anatomie d&apos;une Race Condition sur stock e-commerce
        </h2>
        <Callout type="danger">
          <strong>Le piège de la lecture séparée de l&apos;écriture :</strong> Une boutique a un stock initial de <strong>10 unités</strong>. Deux clients commandent simultanément <strong>7 unités</strong> chacun. Si le code lit le stock disponible (<code className="font-mono">10 &gt;= 7</code>), attend une Promise (<code className="font-mono">await delay()</code>), puis soustrait, les deux transactions valident la commande et acceptent <strong>14 unités</strong> au total !
        </Callout>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-rose-400 font-bold">{`// Chronologie du crash de cohérence :`}</div>
          <div>{`// Client 1 : lit stock = 10 (10 >= 7 -> valide)
// Client 2 : lit stock = 10 (10 >= 7 -> valide aussi !)
// Client 1 : écrit stock = 10 - 7 = 3
// Client 2 : écrit stock = 10 - 7 = 3
// 💥 Résultat : 14 articles vendus pour 10 en stock réel !`}</div>
        </div>
      </section>

      {/* 4. Solutions : Atomicité et File d'attente */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Stratégies de sécurisation : Atomicité SQL &amp; File Promise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
            <span className="font-bold text-cyan-400 font-sans uppercase">Solution 1 : Mise à jour conditionnelle SQL</span>
            <pre className="text-slate-300">{`UPDATE products 
SET stock = stock - 7 
WHERE id = 1 AND stock >= 7;

// Vérifier les lignes affectées :
// affectedRows === 1 -> Vente confirmée
// affectedRows === 0 -> Rejet automatique`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
            <span className="font-bold text-emerald-400 font-sans uppercase">Solution 2 : File de sérialisation en mémoire</span>
            <pre className="text-slate-300">{`let queue = Promise.resolve();

function reserver(qty) {
  queue = queue.then(async () => {
    // Opération strictement sérialisée :
    if (stock >= qty) {
      stock -= qty;
      return true;
    }
    return false;
  });
  return queue;
}`}</pre>
          </div>
        </div>
      </section>

      {/* 5. TP Réservation de places */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          5. Travaux Pratiques — Corriger un système de billetterie concurrent
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Soit un stock de 5 places. Deux requêtes parallèles demandent 4 places chacune. Sans file d&apos;attente, les deux passent (8 places attribuées). Avec la file de Promises, la première est validée et la seconde est immédiatement rejetée :
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm">
          <pre className="text-emerald-300">{`let placesDisponibles = 5;
let file = Promise.resolve();

function reserver(user, places) {
  const operation = file.then(() => {
    if (placesDisponibles >= places) {
      placesDisponibles -= places;
      console.log(\`\${user} : réservation acceptée (reste \${placesDisponibles})\`);
    } else {
      console.log(\`\${user} : réservation refusée (stock insuffisant)\`);
    }
  });
  file = operation.catch(() => {});
  return operation;
}

// Test :
await Promise.all([
  reserver("Ali", 4),
  reserver("Sara", 4)
]);
// Sortie garantie :
// Ali : réservation acceptée (reste 1)
// Sara : réservation refusée (stock insuffisant)`}</pre>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.7
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'une Race Condition (condition de concurrence) ?",
              options: [
                "Une erreur de syntaxe dans une boucle for",
                "Une anomalie où le résultat dépend de l'ordre imprévisible d'accès concurrents à une même donnée",
                "Un dépassement de mémoire dans le heap",
                "Un bug causé par la vitesse du processeur"
              ],
              correctIndex: 1,
              explanation: "Une Race Condition survient lorsque plusieurs opérations asynchrones lisent et modifient une ressource partagée sans synchronisation mutuelle."
            },
            {
              id: 2,
              question: "Comment garantir au niveau base de données SQL qu'un stock ne devienne jamais négatif sous forte charge ?",
              options: [
                "Ajouter un setTimeout(500) avant la requête",
                "Utiliser une mise à jour conditionnelle atomique (UPDATE ... WHERE stock >= demande)",
                "Désactiver les index de la table",
                "Recharger le serveur Node.js"
              ],
              correctIndex: 1,
              explanation: "La mise à jour conditionnelle avec contrôle atomique de clause WHERE évite les doublons de vente en confiant le verrou de ligne au moteur SQL."
            },
            {
              id: 3,
              question: "Comment sérialiser l'exécution de réservations asynchrones dans une instance Node.js unique ?",
              options: [
                "En enchaînant chaque opération sur une Promise partagée formant une file d'attente",
                "En supprimant le mot-clé async",
                "En utilisant while(true)",
                "En augmentant le nombre de threads libuv"
              ],
              correctIndex: 0,
              explanation: "Enregistrer file = file.then(...) garantit que chaque nouveau traitement attendra rigoureusement la résolution du précédent."
            }
          ]}
        />
      </section>
    </div>
  );
};
