'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Déboguer async / await
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
            <span>Comprendre pourquoi toute fonction async retourne invariablement une Promise.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Diagnostiquer les propriétés undefined causées par un oubli de await.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier pourquoi un bloc try/catch synchrone ne capture rien sans await.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Transformer les cascades de requêtes séquentielles en exécutions parallèles.</span>
          </li>
        </ul>
      </section>

      {/* 2. Les 2 règles fondamentales */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les deux lois fondamentales du moteur V8
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 space-y-2">
            <h3 className="font-black text-emerald-900 text-base">Règle 1 : async encapsule toujours en Promise</h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Même si votre fonction fait <code className="font-mono">return 42;</code>, le fait d&apos;ajouter <code className="font-mono font-bold">async</code> transforme la valeur de retour en <code className="font-mono">Promise&#123;&lt;fulfilled&gt;: 42&#125;</code>.
            </p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-teal-200 bg-teal-50/70 space-y-2">
            <h3 className="font-black text-teal-950 text-base">Règle 2 : await ne bloque JAMAIS le thread</h3>
            <p className="text-xs text-teal-900 leading-relaxed">
              <code className="font-mono font-bold">await</code> suspend uniquement le contexte local de la fonction courante, rendant immédiatement la main à l&apos;Event Loop pour traiter d&apos;autres requêtes HTTP ou timers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Les 3 anomalies critiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les anomalies critiques les plus fréquentes
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-xs font-mono space-y-2">
            <span className="font-bold text-rose-400 font-sans uppercase">Anomalie 1 : Oubli de await (Objet contenant une Promise)</span>
            <pre className="text-slate-300">{`// ❌ Code erroné :
async function main() {
  const user = getUser(); // Oubli du await !
  console.log(user.name); // 💥 undefined (car user est un objet Promise, pas l'utilisateur !)
}

// ✓ Correction :
async function main() {
  const user = await getUser();
  console.log(user.name); // "Ali" ✓
}`}</pre>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-xs font-mono space-y-2">
            <span className="font-bold text-rose-400 font-sans uppercase">Anomalie 2 : try/catch sans await (Fuite d&apos;exception non interceptée)</span>
            <pre className="text-slate-300">{`// ❌ Code erroné : Le try/catch se termine AVANT que la Promise ne rejette !
async function main() {
  try {
    saveToDatabase(); // Non attendu !
  } catch (err) {
    console.error("Intercepté :", err); // 💥 Ne s'exécutera JAMAIS ici !
  }
}

// ✓ Correction : Lier impérativement await dans le bloc try :
async function main() {
  try {
    await saveToDatabase();
  } catch (err) {
    console.error("Intercepté avec succès :", err.message);
  }
}`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Séquentiel vs Parallèle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Piège de performance : Cascade séquentielle vs Parallélisme
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Enchaîner des <code className="text-emerald-700 font-mono font-bold">await</code> successifs sur des opérations qui ne dépendent pas les unes des autres est un goulot d&apos;étranglement majeur :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-rose-950/40 text-rose-200 border border-rose-900/60">
            <span className="font-bold text-rose-400 font-sans uppercase">Séquentiel lent (~3 secondes) :</span>
            <pre className="mt-2 text-slate-300">{`// Chaque appel attend 1s la fin du précédent :
const user = await getUser();         // 1s
const orders = await getOrders();     // 1s
const payments = await getPayments(); // 1s
// Durée totale = 3000ms !`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/40 text-emerald-200 border border-emerald-900/60">
            <span className="font-bold text-emerald-400 font-sans uppercase">Parallèle rapide (~1 seconde) :</span>
            <pre className="mt-2 text-slate-300">{`// Les 3 appels démarrent ensemble immédiatement :
const [user, orders, payments] = await Promise.all([
  getUser(),
  getOrders(),
  getPayments()
]);
// Durée totale = 1000ms (gain x3 !)`}</pre>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.6
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Que retourne TOUJOURS une fonction préfixée par le mot-clé async ?",
              options: [
                "Un objet JSON",
                "Une Promise",
                "Une valeur synchrone",
                "Un générateur"
              ],
              correctIndex: 1,
              explanation: "Toute fonction async renvoie obligatoirement une Promise résolue avec la valeur de son return, ou rejetée en cas d'exception."
            },
            {
              id: 2,
              question: "Pourquoi le code suivant affiche-t-il 'undefined' ? const user = getUser(); console.log(user.name); (où getUser est async)",
              options: [
                "user n'existe pas",
                "user contient une Promise non résolue au lieu de l'objet utilisateur",
                "console.log ne sait pas lire les objets",
                "JavaScript bloque l'exécution"
              ],
              correctIndex: 1,
              explanation: "Faute de await, user stocke l'instance de la Promise en cours, dont la propriété .name est naturellement undefined."
            },
            {
              id: 3,
              question: "Pourquoi un try/catch n'intercepte-t-il pas une exception asynchrone si l'appel n'est pas précédé de await ?",
              options: [
                "Le bloc try se termine avant que l'opération asynchrone ne rejette",
                "try/catch est réservé au langage C++",
                "Node.js désactive les exceptions",
                "Le mot-clé throw est interdit dans async"
              ],
              correctIndex: 0,
              explanation: "Le fil d'exécution synchrone sort immédiatement du bloc try. Lorsque la Promise rejette ultérieurement, le catch n'est plus actif sur la pile d'appels."
            },
            {
              id: 4,
              question: "Comment lancer 2 requêtes API indépendantes en parallèle avec async/await ?",
              options: [
                "Avec deux instructions await successives",
                "Via Promise.all([api1(), api2()]) précédé de await",
                "Avec une boucle while",
                "En utilisant setInterval"
              ],
              correctIndex: 1,
              explanation: "await Promise.all([p1, p2]) initialise les deux tâches simultanément sur l'Event Loop et suspend la fonction jusqu'à la complétion des deux."
            }
          ]}
        />
      </section>
    </div>
  );
};
