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
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Fondations Système</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 3 — Programmation synchrone, asynchrone et opérations non bloquantes
        </h1>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-700">
          Maîtriser les promesses JavaScript, la syntaxe moderne async/await et la parallélisation de requêtes avec Promise.all().
        </p>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-semibold text-slate-950">
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre intuitivement la différence entre code synchrone et asynchrone.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer une opération bloquante d&apos;une attente non-bloquante.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Manipuler sans hésitation les <code className="bg-slate-200 px-1 rounded text-indigo-950">Promises</code> et la syntaxe <code className="bg-slate-200 px-1 rounded text-indigo-950">async/await</code>.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Diviser par 3 vos temps de chargement grâce à <code className="bg-slate-200 px-1 rounded text-indigo-950 font-bold">Promise.all()</code>.</span>
          </div>
        </div>
      </section>

      {/* 2. Synchrone vs Asynchrone */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Synchrone vs Asynchrone : Les deux visions du monde
        </h2>

        {/* Max 2 cartes par ligne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 space-y-3 break-words shadow-sm">
            <h3 className="text-base font-bold text-slate-900">Le Synchrone (La file d&apos;attente)</h3>
            <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              Pensez à un guichet unique : chaque client attend devant le guichetier que le dossier du précédent soit totalement terminé.
            </p>
            <div className="rounded-xl bg-slate-100 p-3 font-mono text-xs text-slate-900 font-bold">
              Ligne 1 → Attend la fin → Ligne 2
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Si la ligne 1 prend 10 secondes, le programme reste figé pendant 10 secondes.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/50 p-5 space-y-3 break-words shadow-sm">
            <h3 className="text-base font-bold text-indigo-950">L&apos;Asynchrone (Le bipeur de commande)</h3>
            <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              Dans un restaurant : vous commandez, on vous confie un bipeur électronique (la Promise), et vous partez vous asseoir pour discuter.
            </p>
            <div className="rounded-xl bg-white p-3 font-mono text-xs text-indigo-950 font-bold border border-indigo-200">
              Lance la tâche → Reçoit le bipeur → Poursuit son travail
            </div>
            <p className="text-xs text-indigo-800 font-medium">
              Quand le plat est prêt, le bipeur vibre et vous allez le chercher. Le comptoir a pu servir 50 autres personnes !
            </p>
          </div>
        </div>
      </section>

      {/* 3. Comprendre les Promises & async/await */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Anatomie d&apos;une Promise et syntaxe moderne
        </h2>

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            3.1 Les 3 états de vie d&apos;une Promise
          </h3>
          <p className="text-base font-medium text-slate-800 leading-relaxed">
            Une <strong>Promise</strong> (promesse) est un objet JavaScript qui représente le résultat futur d&apos;une opération asynchrone :
          </p>

          {/* Règle respectée : MAX 2 cartes par ligne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 space-y-1 break-words shadow-sm">
              <span className="text-xs uppercase font-black text-amber-950">État 1</span>
              <p className="text-lg font-black text-amber-950">Pending (En cours)</p>
              <p className="text-xs sm:text-sm font-semibold text-amber-900">
                L&apos;opération externe est lancée mais pas encore terminée. Nous attendons la réponse.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 space-y-1 break-words shadow-sm">
              <span className="text-xs uppercase font-black text-emerald-950">État 2</span>
              <p className="text-lg font-black text-emerald-950">Fulfilled (Succès / Résolue)</p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-900">
                La tâche s&apos;est terminée avec succès et fournit les données attendues (ex: réponse de Gemini).
              </p>
            </div>

            <div className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4 space-y-1 break-words shadow-sm sm:col-span-2">
              <span className="text-xs uppercase font-black text-rose-950">État 3</span>
              <p className="text-lg font-black text-rose-950">Rejected (Échec / Rejetée)</p>
              <p className="text-xs sm:text-sm font-semibold text-rose-900">
                Une anomalie est survenue (coupure de réseau, mauvaise clé d&apos;API). La promesse renvoie une erreur à intercepter.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            3.2 L&apos;évolution syntaxique : Des callbacks à async / await
          </h3>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white break-words">
              <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} L&apos;ancienne façon (.then / .catch)</span>
              <div className="font-mono text-xs leading-relaxed text-indigo-100 overflow-x-auto">
                <pre>{`function interrogerIA() {
  fetch("https://api.ia.test/prompt")
    .then(reponse => reponse.json())
    .then(data => {
      console.log(data.texte);
    })
    .catch(erreur => {
      console.error("Problème:", erreur);
    });
}`}</pre>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white break-words">
              <span className="text-xs font-mono uppercase text-emerald-300 font-bold block mb-2">{'//'} La façon moderne (async / await)</span>
              <div className="font-mono text-xs leading-relaxed text-emerald-100 overflow-x-auto">
                <pre>{`async function interrogerIA() {
  try {
    const reponse = await fetch("https://api.ia.test/prompt");
    const data = await reponse.json();
    console.log(data.texte);
  } catch (erreur) {
    console.error("Problème:", erreur);
  }
}`}</pre>
              </div>
            </div>
          </div>

          <Callout type="warning" title="La règle essentielle à retenir">
            <p>
              Le mot-clé <code className="font-bold">await</code> ne peut être utilisé qu&apos;à l&apos;intérieur d&apos;une fonction marquée comme <code className="font-bold">async</code>. Il suspend l&apos;exécution locale de la fonction jusqu&apos;à ce que la promesse soit résolue, sans jamais bloquer le reste de votre serveur Node.js !
            </p>
          </Callout>
        </div>
      </section>

      {/* 4. Tableau comparatif : Synchrone vs Asynchrone */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La matrice officielle des comportements
        </h2>

        {/* Table responsive : desktop view */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Instruction</th>
                <th className="p-3.5">Nature</th>
                <th className="p-3.5">Impact sur le serveur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-mono text-indigo-700">console.log()</td>
                <td className="p-3.5">Synchrone</td>
                <td className="p-3.5">Instantané, aucun impact perceptible</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-rose-700">fs.readFileSync()</td>
                <td className="p-3.5">Synchrone &amp; Bloquant</td>
                <td className="p-3.5">⚠️ Immobilise tout le serveur pendant la lecture disque</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-emerald-700">fs.readFile()</td>
                <td className="p-3.5">Asynchrone &amp; Non bloquant</td>
                <td className="p-3.5">Délégué à libuv, le serveur reste disponible à 100%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-emerald-700">await fetch(&apos;https://gemini...&apos;)</td>
                <td className="p-3.5">Asynchrone &amp; Non bloquant</td>
                <td className="p-3.5">Suspend la fonction locale, libère l&apos;Event Loop</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono text-rose-700">while (date &lt; fin) {`{}`}</td>
                <td className="p-3.5">Synchrone &amp; Bloquant</td>
                <td className="p-3.5">⚠️ Monopolise le CPU à 100% et paralyse le serveur</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile cards view */}
        <div className="sm:hidden grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-mono text-xs font-bold text-rose-700">fs.readFileSync()</span>
            <p className="text-xs text-rose-900 font-semibold">Synchrone &amp; Bloquant : fige le serveur le temps de lire le disque.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-mono text-xs font-bold text-emerald-700">await fetch(&apos;https://gemini...&apos;)</span>
            <p className="text-xs text-emerald-900 font-semibold">Asynchrone &amp; Non bloquant : libère le thread pendant l&apos;attente réseau.</p>
          </div>
        </div>
      </section>

      {/* 5. Parallélisation avec Promise.all() */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Paralléliser avec Promise.all() : Diviser par 3 vos temps de réponse
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Dans une application d&apos;intelligence artificielle, vous devez souvent rassembler 3 informations avant de poser une question au modèle :
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5 space-y-2 break-words shadow-sm">
            <span className="inline-flex rounded-lg bg-rose-200 px-2.5 py-0.5 text-xs font-black text-rose-950">Approche Séquentielle (Lente)</span>
            <h3 className="text-base font-black text-rose-950">L&apos;un après l&apos;autre (~3 secondes)</h3>
            <div className="font-mono text-xs leading-relaxed text-rose-950 bg-white p-3 rounded-xl border border-rose-200 overflow-x-auto">
              <pre>{`// 1s + 1s + 1s = 3 secondes d'attente totale !
const utilisateur = await chargerProfil();
const historique = await chargerHistorique();
const configuration = await chargerConfig();`}</pre>
            </div>
            <p className="text-xs text-rose-800 font-medium">
              Chaque requête attend bêtement la fin de la précédente alors qu&apos;elles sont indépendantes.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5 space-y-2 break-words shadow-sm">
            <span className="inline-flex rounded-lg bg-emerald-200 px-2.5 py-0.5 text-xs font-black text-emerald-950">Approche Parallèle (Optimale)</span>
            <h3 className="text-base font-black text-emerald-950">Promise.all() (~1 seconde)</h3>
            <div className="font-mono text-xs leading-relaxed text-emerald-950 bg-white p-3 rounded-xl border border-emerald-200 overflow-x-auto">
              <pre>{`// Les 3 requêtes partent en même temps !
const [utilisateur, historique, configuration] = 
  await Promise.all([
    chargerProfil(),
    chargerHistorique(),
    chargerConfig()
  ]);`}</pre>
            </div>
            <p className="text-xs text-emerald-800 font-medium">
              Le temps total n&apos;est plus l&apos;addition des 3, mais simplement la durée de la plus lente (~1s) !
            </p>
          </div>
        </div>
      </section>

      {/* 6. Exercices pratiques interactifs */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Exercices pratiques interactifs
        </h2>

        <QuickQuiz
          title="Exercice 1 — Prédire l'ordre avec async / await"
          question={`Observez attentivement ce code :
console.log("A");
async function tester() {
  console.log("B");
  await Promise.resolve();
  console.log("C");
}
tester();
console.log("D");

Quel affichage obtiendrez-vous dans la console ?`}
          options={[
            "A, B, C, D",
            "A, B, D, C",
            "A, D, B, C",
            "A, C, B, D"
          ]}
          correctIndex={1}
          explanation="1. 'A' s'affiche. 2. tester() démarre de façon synchrone et affiche 'B'. 3. 'await' suspend la suite de la fonction sous forme de microtâche. 4. Le script principal reprend et affiche 'D'. 5. Dès que le code synchrone s'achève, la microtâche reprend et affiche 'C'. Résultat : A, B, D, C."
        />

        <QuickQuiz
          title="Exercice 2 — Le faux ami du mot-clé async"
          question="Une fonction async contenant une lourde boucle de calcul de 5 milliards d'itérations rend-elle le calcul non-bloquant pour le serveur ?"
          options={[
            "Oui, le mot-clé async lance automatiquement un thread sur un autre cœur CPU",
            "Non, le code synchrone s'exécute toujours sur le thread unique et monopolisera le serveur",
            "Oui, si on ajoute un try / catch"
          ]}
          correctIndex={1}
          explanation="Le mot-clé async ne crée aucun thread d'arrière-plan. Une boucle CPU synchrone monopolise le Call Stack jusqu'à son achèvement complet."
        />

        <QuickQuiz
          title="Exercice 3 — Choix d'architecture pour 3 microservices"
          question="Vous devez interroger simultanément 3 modèles d'IA (Gemini pour le texte, un modèle pour les images, et une base vectorielle). Quelle structure garantit le délai de réponse le plus court ?"
          options={[
            "Trois instructions await consécutives les unes après les autres",
            "Promise.all([appel1(), appel2(), appel3()])",
            "Une boucle for avec un setTimeout interne"
          ]}
          correctIndex={1}
          explanation="Promise.all() déclenche les requêtes réseau simultanément. L'attente totale correspond uniquement à la durée du service le plus lent au lieu de cumuler leurs temps de réponse."
        />
      </section>

      {/* 7. Checklist bilan */}
      <InteractiveChecklist
        title="7. Validation des compétences du Chapitre 3"
        items={[
          "Je sais différencier précisément synchrone et asynchrone grâce à l'analogie du bipeur.",
          "Je comprends les 3 états d'une Promise (Pending, Fulfilled, Rejected).",
          "Je maîtrise l'écriture moderne async / await avec gestion d'erreurs par try / catch.",
          "Je comprends pourquoi une boucle de calcul lourd dans une fonction async reste bloquante.",
          "Je sais utiliser Promise.all() pour paralléliser des requêtes d'IA indépendantes."
        ]}
      />
    </div>
  );
};
