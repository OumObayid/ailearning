'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Comprendre les messages d&apos;erreur et les Stack Traces
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
            <span>Identifier le type d&apos;erreur (TypeError, ReferenceError, RangeError, etc.).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Repérer le fichier, le numéro de ligne et la colonne de l&apos;incident.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Remonter la chaîne des fonctions appelantes dans la Stack Trace.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer le point de crash de l&apos;origine causale des données corrompues.</span>
          </li>
        </ul>
      </section>

      {/* 2. Anatomie d'un message d'erreur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Anatomie détaillée d&apos;un message d&apos;erreur
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Considérons le message standard retourné par Chrome DevTools :
        </p>
        <div className="p-4 rounded-xl bg-rose-950/80 border-2 border-rose-500/40 text-rose-200 font-mono text-xs space-y-1">
          <div className="font-bold text-rose-300">Uncaught TypeError: Cannot read properties of null (reading &apos;email&apos;)</div>
          <div className="pl-4 text-slate-300">at getUserEmail (app.js:12:18)</div>
          <div className="pl-4 text-slate-300">at displayProfile (app.js:25:5)</div>
          <div className="pl-4 text-slate-300">at HTMLButtonElement.&lt;anonymous&gt; (app.js:40:3)</div>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Élément</th>
                <th className="p-3.5">Valeur dans l&apos;exemple</th>
                <th className="p-3.5">Signification technique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Statut d&apos;interception</td>
                <td className="p-3.5 font-mono text-rose-700">Uncaught</td>
                <td className="p-3.5">L&apos;exception n&apos;a été capturée par aucun bloc try/catch et a fait crasher le contexte.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Type d&apos;erreur</td>
                <td className="p-3.5 font-mono text-rose-700">TypeError</td>
                <td className="p-3.5">Incompatibilité entre une opération et le type réel de la valeur.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Description</td>
                <td className="p-3.5 font-mono text-slate-800">Cannot read properties of null</td>
                <td className="p-3.5">Tentative d&apos;accéder à une propriété sur une valeur nulle.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Fichier et position</td>
                <td className="p-3.5 font-mono text-emerald-700">app.js:12:18</td>
                <td className="p-3.5">Fichier app.js, ligne 12, colonne 18.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Structure d'une Stack Trace */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Structure et lecture d&apos;une Stack Trace
        </h2>
        <p className="text-base text-slate-800 font-medium">
          La Stack Trace (trace de la pile d&apos;appels) représente l&apos;historique vertical des fonctions empilées au moment exact du crash :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image18.jpeg"
            alt="Stack trace dans Chrome DevTools montrant la cascade des fonctions baz, bar et foo"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.4.1 — Stack trace dans Sources : cascade baz (ligne 2) appelée par bar (ligne 6) appelée par foo (ligne 10).
          </div>
        </div>

        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image19.jpeg"
            alt="Console DevTools avec erreurs multiples et traces de fonctions imbriquées"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.4.2 — Visualisation des stack traces dans la console : repérage instantané des fichiers et lignes sources cliquables.
          </div>
        </div>
      </section>

      {/* 4. Lieu de l'erreur vs Cause Racine */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La règle d&apos;or : Lieu du crash ≠ Cause racine
        </h2>
        <p className="text-base text-slate-800 font-medium">
          C&apos;est le piège numéro 1 du développeur débutant : modifier la ligne de code où l&apos;erreur survient sans comprendre d&apos;où vient la donnée viciée.
        </p>
        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-3">
          <div className="text-emerald-400 font-bold"># Exemple illustratif :</div>
          <pre className="text-slate-300">{`function getUser() {
  return null; // ⚠️ Cause racine potentielle : pourquoi l'utilisateur est-il null ?
}

function displayUser() {
  const user = getUser();
  console.log(user.name); // 💥 Lieu du crash (TypeError: Cannot read properties of null)
}

displayUser();`}</pre>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Niveau</th>
                <th className="p-3.5">Manifestation</th>
                <th className="p-3.5">Action professionnelle requise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Symptôme</td>
                <td className="p-3.5">Écran blanc pour l&apos;utilisateur</td>
                <td className="p-3.5">Qualifier la sévérité et collecter l&apos;environnement.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Lieu du crash</td>
                <td className="p-3.5">Ligne <code className="text-rose-700">user.name</code> dans <code className="text-rose-700">displayUser()</code></td>
                <td className="p-3.5">Poser un breakpoint pour inspecter l&apos;état de <code className="text-slate-800">user</code>.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-emerald-700">Cause racine</td>
                <td className="p-3.5">L&apos;API ou la base n&apos;a trouvé aucun enregistrement</td>
                <td className="p-3.5">Gérer défensivement l&apos;absence de données ou corriger la requête d&apos;extraction.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Erreurs asynchrones */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Pièges des erreurs asynchrones et Fetch API
        </h2>
        <Callout type="warning" title="Piège critique de fetch()">
          L&apos;API native <code className="font-mono">fetch()</code> ne rejette <strong>JAMAIS</strong> sa Promise lors de codes d&apos;erreur HTTP 404, 401 ou 500 ! La Promise n&apos;est rejetée qu&apos;en cas de panne réseau physique ou blocage CORS. Il est impératif de contrôler explicitement <code className="font-mono">response.ok</code> ou <code className="font-mono">response.status</code>.
        </Callout>

        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
          <div className="text-emerald-400 font-bold"># Pattern robuste de traitement d&apos;API asynchrone :</div>
          <pre className="text-slate-300">{`async function loadUserProfile(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    // 1. Contrôle du code de statut HTTP :
    if (!response.ok) {
      throw new Error(\`Erreur HTTP \${response.status} : \${response.statusText}\`);
    }

    const payload = await response.json();
    
    // 2. Contrôle du contrat de données :
    if (!payload?.user?.email) {
      throw new Error("Contrat d'API invalide : champ 'email' absent du payload");
    }

    return payload.user;
  } catch (error) {
    console.error("Échec dans loadUserProfile :", error.message);
    console.error("Stack trace complète :", error.stack);
    throw error; // Propager ou notifier l'UI
  }
}`}</pre>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.4
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Que signifie précisément l'exception TypeError en JavaScript ?",
              options: [
                "Une panne matérielle de connexion réseau",
                "Une opération incompatible avec le type ou la valeur courante (ex: appeler un non-fonction, lire une propriété sur null)",
                "Une erreur de syntaxe dans la déclaration d'une variable",
                "Une requête SQL syntaxiquement invalide"
              ],
              correctIndex: 1,
              explanation: "Une TypeError survient lorsqu'une opération est effectuée sur une valeur dont le type ne le permet pas (comme accéder à une propriété sur null ou undefined)."
            },
            {
              id: 2,
              question: "Dans une Stack Trace, quelle ligne indique le point initial de l'exception ?",
              options: [
                "La toute dernière ligne tout en bas",
                "Le premier emplacement pertinent situé en haut de la trace (premier cadre de pile)",
                "La ligne contenant le mot-clé import",
                "La première ligne du fichier HTML hôte"
              ],
              correctIndex: 1,
              explanation: "Le sommet de la trace (première ligne de fonction listée sous le titre) correspond à la fonction où l'exception s'est effectivement produite."
            },
            {
              id: 3,
              question: "Une fonction getUser() retourne null, puis displayUser() plante en lisant user.name. Quelle affirmation est correcte ?",
              options: [
                "La ligne de lecture est obligatoirement la cause racine",
                "Le retour null de getUser() est une piste causale essentielle à investiguer",
                "La stack trace est inutile dans ce cas",
                "Il s'agit forcément d'une SyntaxError"
              ],
              correctIndex: 1,
              explanation: "Le plantage survient sur la lecture de user.name, mais la cause racine réside dans le fait que getUser() n'a pas retourné l'objet attendu."
            },
            {
              id: 4,
              question: "Une requête HTTP avec statut 404 déclenche-t-elle automatiquement une exception dans un bloc try/catch avec fetch() ?",
              options: [
                "Oui, toujours immédiatement",
                "Non, fetch() résout la Promise normalement, il faut vérifier response.ok ou response.status",
                "Oui, mais uniquement dans React",
                "Non, car fetch() convertit les 404 en 200"
              ],
              correctIndex: 1,
              explanation: "fetch() ne rejette sa Promise qu'en cas d'erreur réseau bas niveau (DNS, offline, CORS). Les codes 4xx et 5xx doivent être testés manuellement via response.ok."
            }
          ]}
        />
      </section>
    </div>
  );
};
