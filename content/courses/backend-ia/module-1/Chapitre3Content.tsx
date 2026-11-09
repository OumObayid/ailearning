'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Programmation synchrone, asynchrone et opérations non bloquantes avec Node.js
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
            <span>Comprendre la différence entre programmation synchrone et asynchrone.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer une opération bloquante d&apos;une opération non bloquante.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Utiliser rigoureusement <code className="bg-slate-200 px-1 rounded text-indigo-950">async</code>, <code className="bg-slate-200 px-1 rounded text-indigo-950">await</code> et les <code className="bg-slate-200 px-1 rounded text-indigo-950">Promises</code>.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Paralléliser des appels avec <code className="bg-slate-200 px-1 rounded text-indigo-950 font-bold">Promise.all()</code>.</span>
          </li>
        </ul>
      </section>

      {/* 2. Synchrone vs Asynchrone */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Synchrone vs Asynchrone : Les analogies clés
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Approche Synchrone (Attente en file)</h3>
            <p className="text-base font-medium text-slate-900 leading-relaxed">
              Dans une boulangerie traditionnelle : vous commandez, le boulanger prépare votre pain devant vous. Vous restez figé au comptoir, et personne derrière vous ne peut commander avant que vous ayez payé et récupéré votre commande.
            </p>
            <div className="rounded-xl bg-slate-100 p-3 font-mono text-sm text-slate-900 font-bold">
              Instruction 1 →  Attend fin →  Instruction 2
            </div>
          </div>

          <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/50 p-5 space-y-3">
            <h3 className="text-lg font-black text-indigo-950">Approche Asynchrone (Le ticket / Beeper)</h3>
            <p className="text-base font-medium text-slate-900 leading-relaxed">
              Dans un restaurant moderne : vous commandez, on vous donne un ticket ou un beeper (la Promise). Vous allez vous asseoir et lire un livre. Dès que la commande est prête, le beeper sonne et vous récupérez votre plateau. Le comptoir a pu servir 50 autres clients pendant ce temps !
            </p>
            <div className="rounded-xl bg-white p-3 font-mono text-sm text-indigo-950 font-bold border border-indigo-200">
              Démarre opération →  Reçoit Promise →  Poursuit l&apos;exécution
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comprendre les Promises & async/await */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Anatomie d&apos;une Promise et syntaxe moderne
        </h2>

        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            3.1 Les 3 états d&apos;une Promise
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
              <span className="text-xs uppercase font-black text-amber-950">État 1</span>
              <p className="text-xl font-black text-amber-950 mt-1">Pending</p>
              <span className="text-xs font-semibold text-amber-900">En cours de traitement</span>
            </div>
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
              <span className="text-xs uppercase font-black text-emerald-950">État 2</span>
              <p className="text-xl font-black text-emerald-950 mt-1">Fulfilled (Resolved)</p>
              <span className="text-xs font-semibold text-emerald-900">Succès avec valeur</span>
            </div>
            <div className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4">
              <span className="text-xs uppercase font-black text-rose-950">État 3</span>
              <p className="text-xl font-black text-rose-950 mt-1">Rejected</p>
              <span className="text-xs font-semibold text-rose-900">Échec avec erreur</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            3.2 De .then() à async / await
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
              <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} Avec .then() et .catch()</span>
              <pre className="font-mono text-xs leading-relaxed text-indigo-100 overflow-x-auto">
{`function chargerUtilisateurs() {
  return fetch("https://api.test/users")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}`}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
              <span className="text-xs font-mono uppercase text-emerald-300 font-bold block mb-2">{'//'} Avec async / await moderne</span>
              <pre className="font-mono text-xs leading-relaxed text-emerald-100 overflow-x-auto">
{`async function chargerUtilisateurs() {
  try {
    const res = await fetch("https://api.test/users");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}`}
              </pre>
            </div>
          </div>

          <Callout type="warning" title="Le piège à ne jamais oublier">
            <p>
              1. Le mot-clé <code className="font-bold">async</code> <strong>ne crée aucun thread parallèle</strong>. Il indique simplement que la fonction retourne une Promise.<br />
              2. Placer une boucle de calcul lourd de 10 milliards d&apos;itérations dans une fonction <code className="font-bold">async</code> <strong>bloquera quand même tout votre serveur</strong>, car le calcul s&apos;exécute sur le même Call Stack JavaScript !
            </p>
          </Callout>
        </div>
      </section>

      {/* 4. Tableau comparatif : Synchrone, Asynchrone, Bloquant, Non bloquant */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La matrice officielle des comportements
        </h2>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Instruction</th>
                <th className="p-3.5">Typologie</th>
                <th className="p-3.5">Impact sur le serveur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">console.log()</td>
                <td className="p-3.5">Synchrone</td>
                <td className="p-3.5">Quasi-instantané, non problématique</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-rose-700">fs.readFileSync()</td>
                <td className="p-3.5">Synchrone &amp; Bloquant</td>
                <td className="p-3.5">⚠️ Bloque tout le serveur pendant la lecture disque</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-emerald-700">fs.readFile()</td>
                <td className="p-3.5">Asynchrone &amp; Non bloquant</td>
                <td className="p-3.5">Délégué à libuv, le serveur reste 100% disponible</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-emerald-700">await fetch(&apos;https://gemini...&apos;)</td>
                <td className="p-3.5">Asynchrone &amp; Non bloquant</td>
                <td className="p-3.5">Suspend la fonction, le serveur traite les autres requêtes</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-rose-700">for(let i=0; i&lt;1e9; i++)</td>
                <td className="p-3.5">Synchrone &amp; Bloquant</td>
                <td className="p-3.5">⚠️ Monopolise le processeur à 100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Parallélisation avec Promise.all() */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Paralléliser avec Promise.all() : Gain x3 de vitesse
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Imaginez que votre API IA doive charger 3 informations indépendantes pour composer un prompt :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5 space-y-2">
            <span className="inline-flex rounded-lg bg-rose-200 px-2.5 py-0.5 text-xs font-black text-rose-950">Séquentiel (Lent)</span>
            <h3 className="text-base font-black text-rose-950">Attente en série (~3 secondes)</h3>
            <pre className="font-mono text-xs leading-relaxed text-rose-950 bg-white p-3 rounded-xl border border-rose-200 overflow-x-auto">
{`// 1s + 1s + 1s = 3 secondes au total !
const user = await chargerUser();
const history = await chargerHistory();
const params = await chargerParams();`}
            </pre>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5 space-y-2">
            <span className="inline-flex rounded-lg bg-emerald-200 px-2.5 py-0.5 text-xs font-black text-emerald-950">Parallèle (Optimal)</span>
            <h3 className="text-base font-black text-emerald-950">Promise.all() (~1 seconde)</h3>
            <pre className="font-mono text-xs leading-relaxed text-emerald-950 bg-white p-3 rounded-xl border border-emerald-200 overflow-x-auto">
{`// Lancés ensemble : temps total = le plus long (~1s) !
const [user, history, params] = await Promise.all([
  chargerUser(),
  chargerHistory(),
  chargerParams()
]);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 6. Exercices pratiques interactifs */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Exercices pratiques interactifs
        </h2>

        <QuickQuiz
          title="Exercice 1 — Prédire l'ordre avec async/await"
          question={`Observez ce code :
console.log("A");
async function test() {
  console.log("B");
  await Promise.resolve();
  console.log("C");
}
test();
console.log("D");

Quel résultat obtiendrez-vous ?`}
          options={[
            "A, B, C, D",
            "A, B, D, C",
            "A, D, B, C",
            "A, C, B, D"
          ]}
          correctIndex={1}
          explanation="1. 'A' s'exécute. 2. test() est appelée de façon synchrone et affiche 'B'. 3. 'await Promise.resolve()' suspend la fonction test et place la suite en microtâche. 4. Le script principal reprend et affiche 'D'. 5. Le Call Stack étant vide, la microtâche reprend et affiche 'C'. Résultat : A, B, D, C."
        />

        <QuickQuiz
          title="Exercice 2 — Le piège du calcul dans une fonction async"
          question={`Soit cette route Express :
app.get("/calcul", async (req, res) => {
  let total = 0;
  for (let i = 0; i < 10000000000; i++) total += i;
  res.json({ total });
});

Pourquoi le serveur reste-t-il totalement figé malgré le mot-clé async ?`}
          options={[
            "Parce que la fonction async est mal formulée",
            "Parce qu'une boucle CPU pure s'exécute sur le Call Stack JavaScript sans jamais céder la main à l'Event Loop",
            "Parce qu'Express interdit les boucles de plus de 1000 itérations"
          ]}
          correctIndex={1}
          explanation="async ne crée aucun thread d'arrière-plan. Tant que du code JavaScript synchrone tourne dans une boucle for/while, le thread unique reste captif à 100%."
        />

        <QuickQuiz
          title="Exercice 3 — Requêtes vers 3 microservices d'IA"
          question="Vous devez interroger 3 modèles d'IA indépendants (Gemini, analyseur sémantique, base vectorielle). Quelle structure offre la plus faible latence totale ?"
          options={[
            "Trois appels consécutifs avec await l'un après l'autre",
            "Promise.all([appel1(), appel2(), appel3()])",
            "Une boucle while qui teste si chaque requête a répondu"
          ]}
          correctIndex={1}
          explanation="Promise.all() déclenche immédiatement les 3 requêtes réseau sans attendre la réponse de la première. Le temps total sera égal à la durée du service le plus lent au lieu de la somme des trois."
        />
      </section>

      {/* 7. Checklist bilan */}
      <InteractiveChecklist
        title="7. Validation des compétences du Chapitre 3"
        items={[
          "Je sais différencier précisément synchrone et asynchrone.",
          "Je comprends la différence fondamentale entre opération bloquante et non bloquante.",
          "Je sais manier Promise, .then()/.catch() et la syntaxe moderne async/await.",
          "Je comprends pourquoi async ne rend pas magiquement une boucle CPU non bloquante.",
          "Je sais utiliser Promise.all() pour paralléliser des appels d'IA indépendants.",
          "J'ai compris l'impact sur le temps de réponse total perçu par l'utilisateur."
        ]}
      />
    </div>
  );
};

