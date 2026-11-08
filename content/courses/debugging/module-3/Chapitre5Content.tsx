'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Déboguer les Promises
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre les transitions d&apos;état irréversibles d&apos;une Promise.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les retours manquants brisant la chaîne de transmission .then().</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Démystifier le faux rejet de fetch() sur les statuts HTTP 404 et 500.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Choisir rigoureusement entre Promise.all() et Promise.allSettled().</span>
          </li>
        </ul>
      </section>

      {/* 2. Les 3 États d'une Promise */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les trois états d&apos;une Promise et transitions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-800 uppercase">État 1</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            </div>
            <h3 className="font-black text-amber-950 text-base">PENDING</h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              L&apos;opération I/O est en cours (lecture disque, requête réseau, attente d&apos;événement). La promesse n&apos;est ni réussie ni échouée.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-700 uppercase">État 2</span>
              <span className="text-emerald-600 font-black text-xs">✓</span>
            </div>
            <h3 className="font-black text-emerald-900 text-base">FULFILLED</h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              L&apos;opération a réussi avec succès via <code className="font-mono">resolve(val)</code>. La valeur est figée et transmise aux <code className="font-mono">.then()</code>.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-rose-300 bg-rose-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-rose-800 uppercase">État 3</span>
              <span className="text-rose-600 font-black text-xs">✕</span>
            </div>
            <h3 className="font-black text-rose-950 text-base">REJECTED</h3>
            <p className="text-xs text-rose-900 leading-relaxed">
              L&apos;opération a échoué via <code className="font-mono">reject(err)</code> ou une exception non interceptée. Le motif est transmis aux <code className="font-mono">.catch()</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pièges du chaînage .then() */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Oublier de retourner une valeur dans .then()
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Chaque bloc <code className="text-emerald-700 font-mono font-bold">.then()</code> génère lui-même une nouvelle Promise. Si vous omettez de retourner une valeur, la promise suivante recevra inévitablement <code className="text-slate-900 font-mono font-bold">undefined</code> :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800">
            <span className="font-bold text-rose-400 font-sans uppercase">Code défectueux (Perte de valeur) :</span>
            <pre className="mt-2 text-slate-300">{`getUser()
  .then(user => {
    console.log(user); 
    // 💥 Oubli de return user !
  })
  .then(user => {
    console.log(user.name); 
    // 💥 TypeError: Cannot read properties of undefined
  });`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800">
            <span className="font-bold text-emerald-400 font-sans uppercase">Code corrigé :</span>
            <pre className="mt-2 text-slate-300">{`getUser()
  .then(user => {
    console.log(user);
    return user; // Transmission explicite !
  })
  .then(user => {
    console.log(user.name); // "Ahmed" ✓
  });`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Le piège de fetch() et response.ok */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le piège universel de l&apos;API fetch()
        </h2>
        <Callout type="danger">
          <strong>fetch() NE REJETTE PAS sur les codes HTTP 404 ou 500 :</strong> Pour l&apos;API fetch du navigateur et de Node.js, une réponse HTTP 404 (Not Found) ou 500 (Internal Server Error) est une transaction réseau réussie ! Elle résout donc la Promise dans le <code className="font-mono font-bold">.then()</code>. fetch() ne rejette que sur des échecs de transport réseau purs (coupure DNS, absence de connexion, blocage CORS).
        </Callout>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-emerald-400 font-bold">{`// Patron de consommation défensif de fetch() :`}</div>
          <div>{`fetch("https://api.shop.com/v1/orders/123")
  .then(response => {
    // Contrôle impératif du booléen response.ok (vrai uniquement si status 200 à 299) :
    if (!response.ok) {
      throw new Error(\`Erreur HTTP serveur : \${response.status} (\${response.statusText})\`);
    }
    return response.json();
  })
  .then(data => console.log("Commande reçue :", data))
  .catch(error => console.error("Échec intercepté :", error.message))
  .finally(() => console.log("Nettoyage des spinners de chargement"));`}</div>
        </div>
      </section>

      {/* 5. Promise.all vs Promise.allSettled */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Comparaison critique : Promise.all() vs Promise.allSettled()
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Méthode</th>
                <th className="p-3.5 border-b border-slate-200">Comportement en cas d&apos;erreur unique</th>
                <th className="p-3.5 border-b border-slate-200">Cas d&apos;usage recommandé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-purple-800 font-bold">Promise.all()</td>
                <td className="p-3.5 text-rose-700 font-bold">Échec immédiat (Fail-Fast) dès le premier rejet.</td>
                <td className="p-3.5">Toutes les requêtes sont interdépendantes (ex: utilisateur + panier obligatoire).</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Promise.allSettled()</td>
                <td className="p-3.5 text-emerald-700 font-bold">Attend TOUTES les promesses sans jamais rejeter.</td>
                <td className="p-3.5">Tableaux de bord multi-widgets, agrégation où les échecs partiels sont acceptables.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.5
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quels sont les trois états possibles d'une Promise JavaScript ?",
              options: [
                "Start, Progress, Finish",
                "Pending, Fulfilled, Rejected",
                "Ready, Set, Go",
                "Open, Active, Closed"
              ],
              correctIndex: 1,
              explanation: "Une Promise débute à l'état PENDING, puis bascule de façon irréversible vers FULFILLED (succès) ou REJECTED (échec)."
            },
            {
              id: 2,
              question: "L'appel fetch('/api/user') reçoit un code HTTP 404 du serveur. Que se passe-t-il ?",
              options: [
                "La promesse est automatiquement rejetée vers le .catch()",
                "La promesse est résolue avec succès dans le .then(), response.ok vaut false",
                "Le script s'arrête immédiatement",
                "Le navigateur recharge la page"
              ],
              correctIndex: 1,
              explanation: "fetch() ne rejette jamais sur les statuts 4xx ou 5xx. Il résout la réponse, et c'est au développeur de tester response.ok."
            },
            {
              id: 3,
              question: "Que reçoit le second .then() si le premier .then() effectue console.log() sans return ?",
              options: [
                "La valeur initiale de la Promise",
                "null",
                "undefined",
                "Une TypeError"
              ],
              correctIndex: 2,
              explanation: "Sans return explicite, la fonction fléchée retourne undefined, qui devient la valeur transmise au maillon suivant."
            },
            {
              id: 4,
              question: "Quelle méthode permet d'exécuter 3 requêtes et de récupérer les résultats réussis même si l'une échoue ?",
              options: [
                "Promise.all()",
                "Promise.allSettled()",
                "Promise.race()",
                "Promise.any()"
              ],
              correctIndex: 1,
              explanation: "Promise.allSettled() attend l'achèvement de toutes les opérations et retourne un tableau d'objets décrivant leur issue { status: 'fulfilled' | 'rejected' }."
            }
          ]}
        />
      </section>
    </div>
  );
};
