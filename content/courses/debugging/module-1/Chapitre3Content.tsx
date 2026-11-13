'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { DebuggingConsoleSimulator } from '@/components/interactive/DebuggingConsoleSimulator';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';

export const Chapitre3Content: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'syntax' | 'logic' | 'runtime'>('syntax');

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-lime-200 bg-gradient-to-br from-lime-50/90 via-emerald-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider bg-lime-100/80 px-3 py-1 rounded-full border border-lime-300">
            <Icon name="bug" className="w-4 h-4 text-lime-800" />
            <span>Ingénierie du Débogage • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Lecture accessible : ~12 min</span>
          </div>
        </div>

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere] mb-3">
          Chapitre 3 — Différence entre erreur de syntaxe, logique et d&apos;exécution
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          Savoir identifier instantanément à quelle famille appartient une erreur est le super-pouvoir qui sépare un développeur débutant désorienté d&apos;un ingénieur méthodique.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Identifier le moment de la panne</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Déchiffrer une Stack Trace</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Traquer les erreurs logiques invisibles</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : L'ANALOGIE CULINAIRE (LA RECETTE DE CUISINE)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;analogie de la Recette : Comprendre les 3 familles d&apos;erreurs
          </h2>
        </div>

        <p className="text-base text-slate-800 font-medium">
          Imaginez que vous suiviez une recette pour préparer un gâteau au chocolat :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Syntaxe */}
          <div className="p-5 rounded-2xl bg-white border-2 border-rose-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-black text-sm">
              <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">1</span>
              <span>L&apos;Erreur de Syntaxe</span>
            </div>
            <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-200 text-xs font-medium text-slate-800 italic">
              « Verser 200g de dans le avec le four »
            </div>
            <p className="text-xs text-slate-700 font-medium">
              La phrase est incomplète, incompréhensible. Vous ne pouvez <strong>même pas commencer</strong> la préparation ! En programmation, le moteur refuse de démarrer le code.
            </p>
          </div>

          {/* Runtime */}
          <div className="p-5 rounded-2xl bg-white border-2 border-purple-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-purple-700 font-black text-sm">
              <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs">2</span>
              <span>L&apos;Erreur d&apos;Exécution (Runtime)</span>
            </div>
            <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-200 text-xs font-medium text-slate-800 italic">
              « Étape 3 : Ouvrir le tiroir magique et prendre la poudre d&apos;or »
            </div>
            <p className="text-xs text-slate-700 font-medium">
              La phrase est bien écrite en français, la préparation a commencé, mais le tiroir n&apos;existe pas ! <strong>Crash en plein milieu de la recette</strong> (Exception).
            </p>
          </div>

          {/* Logique */}
          <div className="p-5 rounded-2xl bg-white border-2 border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-black text-sm">
              <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs">3</span>
              <span>L&apos;Erreur Logique (Sémantique)</span>
            </div>
            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-xs font-medium text-slate-800 italic">
              « Ajouter 200g de sel fin au lieu du sucre en poudre »
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Aucune alarme ne sonne, le gâteau sort du four magnifiquement doré... mais à la dégustation, c&apos;est immangeable ! <strong>Le pire cas car aucun message d&apos;erreur ne vous alerte.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : L'ERREUR DE SYNTAXE (SYNTAX ERROR)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-950">
            1. Erreur de Syntaxe (Syntax Error) : Bloquante avant le démarrage
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Une erreur de syntaxe se produit lorsque vous écrivez du code qui ne respecte pas les règles grammaticales strictes du langage. L&apos;analyseur du moteur (le <em>parser</em>) est incapable de comprendre le fichier pour le transformer en instructions exécutables.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-bold text-rose-600 mb-1 flex items-center gap-1.5">
              <Icon name="x" className="w-4 h-4" />
              <span>❌ Code invalide : Accolade fermante oubliée</span>
            </div>
            <CodeBlock
              language="javascript"
              filename="calcul.js"
              code={`function calculerTotal(prix, quantite) {
  return prix * quantite;
// ❌ Oubli de l'accolade fermante '}' à la fin !`}
            />
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-900 font-mono">
              SyntaxError: Unexpected end of input
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-1.5">
              <Icon name="check" className="w-4 h-4" />
              <span>✅ Code valide : Grammaire respectée</span>
            </div>
            <CodeBlock
              language="javascript"
              filename="calcul.js"
              code={`function calculerTotal(prix, quantite) {
  return prix * quantite;
} // ✅ Accolade présente : le parser valide le fichier`}
            />
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 font-medium">
              Le compilateur peut lire le code et le transformer en arbre syntaxique (AST).
            </div>
          </div>
        </div>

        <Callout type="tip" title="La bonne nouvelle pour les débutants">
          Les erreurs de syntaxe sont les plus faciles à résoudre ! Votre éditeur de code moderne (VS Code) les surligne immédiatement en rouge avec une petite vaguelette sous la ligne fautive, et des outils comme <strong>ESLint</strong> ou <strong>TypeScript</strong> vous alertent avant même d&apos;enregistrer votre fichier.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 3 : L'ERREUR D'EXÉCUTION & DÉCRYPTAGE D'UNE STACK TRACE
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">3</span>
          <h2 className="text-xl font-bold text-slate-950">
            2. Erreur d&apos;Exécution (Runtime Error) &amp; Anatomie d&apos;une Stack Trace
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Ici, la grammaire est parfaite, le programme démarre et tourne... jusqu&apos;au moment où une ligne demande une action impossible au processeur : essayer de lire les propriétés d&apos;une variable qui vaut <code>null</code> ou <code>undefined</code>, appeler une fonction qui n&apos;existe pas, ou tenter d&apos;accéder à un serveur déconnecté.
        </p>

        {/* Anatomie d'une Stack Trace */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl border-2 border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Icon name="document-text" className="w-4 h-4" />
              <span>Comment lire une Stack Trace sans paniquer (Le guide en 3 points)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Node.js / Navigateur</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800 leading-relaxed">
            <p className="text-rose-400 font-bold">
              TypeError: Cannot read properties of null (reading &apos;commandes&apos;)
            </p>
            <p className="text-slate-400 pl-4">
              at afficherPanier (<span className="text-amber-300 font-bold">services/panier.js:42:15</span>) &lt;-- 🎯 VOS LIGNES DE CODE !
            </p>
            <p className="text-slate-500 pl-4">
              at processTicksAndRejections (node:internal/process/task_queues:95:5) &lt;-- Interne Node (À ignorer)
            </p>
            <p className="text-slate-500 pl-4">
              at async handleRequest (node_modules/express/lib/router.js:130:10) &lt;-- Bibliothèques tierces (À ignorer)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <strong className="text-rose-400 block mb-1">1. Le type &amp; message :</strong>
              Quelle interdiction a été violée ? (Ex: tenter de lire <code>.commandes</code> sur une valeur <code>null</code>).
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <strong className="text-amber-400 block mb-1">2. Votre fichier et ligne :</strong>
              Repérer la <strong>première ligne</strong> qui mentionne votre propre projet (<code className="text-white">panier.js:42</code>). C&apos;est là qu&apos;il faut regarder !
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <strong className="text-emerald-400 block mb-1">3. Ignorer le bruit :</strong>
              Toutes les lignes contenant <code className="text-white">node_modules/</code> ou <code className="text-white">node:internal/</code> ne sont pas coupables, ce ne sont que des rouages intermédiaires.
            </div>
          </div>
        </div>

        {/* Image 2 from Word Doc */}
        <div className="space-y-2 pt-2">
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image2.jpeg"
              alt="Analyse d'une Stack Trace Node.js lors d'une ReferenceError"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.2 — Décomposition réelle d&apos;une Stack Trace Node.js : type de l&apos;exception, message explicite, fichier source et chaîne des fonctions appelantes.
            </div>
          </div>
        </div>

        {/* Protection avec try catch */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900">
            Comment éviter le crash brutal d&apos;une application en production : <code className="text-purple-700 font-mono">try...catch</code>
          </h3>
          <CodeBlock
            language="typescript"
            filename="databaseService.ts"
            code={`async function chargerDonneesClient(clientId: string) {
  try {
    // Opération à risque : appel réseau ou requête SQL
    const client = await api.getClient(clientId);
    return client.commandes;
  } catch (error: any) {
    // Interception propre : l'application ne crash pas !
    console.error("Impossible de récupérer les commandes :", error.message);
    return []; // On renvoie une valeur de secours sécurisée
  }
}`}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : L'ERREUR LOGIQUE (LOGICAL ERROR)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">4</span>
          <h2 className="text-xl font-bold text-slate-950">
            3. Erreur Logique (Logical Error) : L&apos;ennemi invisible
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          C&apos;est la catégorie qui donne des sueurs froides aux développeurs : le code est parfaitement écrit, démarre sans sourciller, ne déclenche aucun message rouge dans la console, mais <strong>le résultat calculé est faux</strong>.
        </p>

        <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
            <Icon name="info" className="w-4 h-4 text-amber-600" />
            <span>Exemple classique : Le piège de l&apos;opérateur strict</span>
          </div>
          <CodeBlock
            language="javascript"
            filename="controleAge.js"
            code={`// ❌ ERREUR LOGIQUE : L'opérateur strict > exclut les personnes de 18 ans pile !
function verifierMajorite(age) {
  if (age > 18) { 
    return "Majeur";
  }
  return "Mineur";
}

console.log(verifierMajorite(18)); // Affiche "Mineur" alors que 18 ans est l'âge de la majorité !`}
          />
          <p className="text-xs text-amber-900 font-medium">
            La correction consiste simplement à remplacer <code className="bg-amber-100 font-mono px-1 py-0.5 rounded">&gt;</code> par <code className="bg-emerald-100 font-mono px-1 py-0.5 rounded text-emerald-800 font-bold">&gt;=</code>.
          </p>
        </div>

        {/* Comment traquer une erreur logique avec le Débogueur VS Code */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-950">
            Comment traquer une erreur logique sans message d&apos;erreur ? (Le Débogueur VS Code)
          </h3>
          <p className="text-sm text-slate-700 font-medium">
            Comme il n&apos;y a aucun message d&apos;erreur dans la console pour vous guider, la méthode reine consiste à poser un <strong>Breakpoint (Point d&apos;arrêt)</strong> pour figer l&apos;exécution du programme et inspecter la valeur des variables à chaque pas :
          </p>

          {/* Image 1 from Word Doc */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image1.jpeg"
              alt="Débogage de variables et inspection pas à pas avec VS Code Debugger"
              width={1200}
              height={750}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.1 — Utilisation des Breakpoints (points rouges) et du panneau de variables dans VS Code pour suivre les valeurs en temps réel.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : TABLEAU COMPARATIF INTERACTIF
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">5</span>
          <h2 className="text-xl font-bold text-slate-950">
            Comparatif synthétique des 3 familles d&apos;erreurs
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-950 border-b-2 border-slate-200">
              <tr>
                <th className="p-3 font-black">Critère d&apos;évaluation</th>
                <th className="p-3 font-black text-rose-800 bg-rose-50/50">Syntaxe</th>
                <th className="p-3 font-black text-purple-800 bg-purple-50/50">Exécution (Runtime)</th>
                <th className="p-3 font-black text-amber-800 bg-amber-50/50">Logique (Sémantique)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr>
                <td className="p-3 font-bold text-slate-900 bg-slate-50">Moment de découverte</td>
                <td className="p-3 text-rose-700 font-semibold">À la compilation / parsing</td>
                <td className="p-3 text-purple-700 font-semibold">Pendant l&apos;exécution</td>
                <td className="p-3 text-amber-700 font-semibold">À l&apos;utilisation ou aux tests</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 bg-slate-50">Le programme démarre-t-il ?</td>
                <td className="p-3 text-rose-700 font-semibold">Non (refuse de démarrer)</td>
                <td className="p-3 text-purple-700 font-semibold">Oui (jusqu&apos;au crash)</td>
                <td className="p-3 text-emerald-700 font-semibold">Oui (fonctionne en continu)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 bg-slate-50">Y a-t-il un message d&apos;erreur ?</td>
                <td className="p-3 text-rose-700 font-semibold">Oui (SyntaxError)</td>
                <td className="p-3 text-purple-700 font-semibold">Oui (TypeError, etc.)</td>
                <td className="p-3 text-amber-700 font-semibold">Non (silencieux !)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 bg-slate-50">Outils de diagnostic</td>
                <td className="p-3">ESLint, TypeScript, IDE</td>
                <td className="p-3">Stack Trace, DevTools, try/catch</td>
                <td className="p-3">Breakpoints, Tests automatisés</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 : LABORATOIRE INTERACTIF
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">6</span>
          <h2 className="text-xl font-bold text-slate-950">
            Laboratoire Interactif : Testez les 3 comportements
          </h2>
        </div>

        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDemo('syntax')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
                selectedDemo === 'syntax'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              1. Erreur de Syntaxe
            </button>
            <button
              onClick={() => setSelectedDemo('runtime')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
                selectedDemo === 'runtime'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              2. Erreur d&apos;Exécution
            </button>
            <button
              onClick={() => setSelectedDemo('logic')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
                selectedDemo === 'logic'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              3. Erreur Logique
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-3">
            {selectedDemo === 'syntax' && (
              <>
                <div className="text-xs text-rose-400 font-bold uppercase tracking-wider"># Cas Syntaxe : Accolade fermante manquante</div>
                <pre className="text-rose-200 bg-slate-950 p-3 rounded-lg">{`function addition(a, b) {\n  return a + b;\n// Accolade manquante !`}</pre>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-rose-400 font-bold">Conséquence :</span> <code className="text-rose-300">SyntaxError: Unexpected end of input</code>. Le moteur JavaScript refuse catégoriquement d&apos;exécuter la moindre ligne.
                </div>
              </>
            )}
            {selectedDemo === 'runtime' && (
              <>
                <div className="text-xs text-purple-400 font-bold uppercase tracking-wider"># Cas Exécution : Accès à une propriété sur null</div>
                <pre className="text-purple-200 bg-slate-950 p-3 rounded-lg">{`const client = null;\nconsole.log(client.commandes[0]);`}</pre>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-purple-400 font-bold">Conséquence :</span> <code className="text-purple-300">TypeError: Cannot read properties of null</code>. Le programme démarre mais crash brutalement sur cette ligne précise.
                </div>
              </>
            )}
            {selectedDemo === 'logic' && (
              <>
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider"># Cas Logique : Calcul défaillant sans aucune exception</div>
                <pre className="text-amber-200 bg-slate-950 p-3 rounded-lg">{`function calculerRemise(prix, pourcentage) {\n  return prix - pourcentage; // Erreur : il fallait prix * (pourcentage / 100)\n}\ncalculerRemise(100, 20); // Retourne 80 au lieu de 20 €`}</pre>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-amber-400 font-bold">Conséquence :</span> Zéro message d&apos;erreur. Tout s&apos;exécute sans bruit, mais les finances de l&apos;entreprise sont faussées !
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 : ARBRE DE DÉCISION DU DÉBOGUEUR
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">7</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;Arbre de décision : Que faire face à un bug ?
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dès qu&apos;une anomalie se présente, suivez cette méthode en 3 questions successives :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border-2 border-rose-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 font-black text-xs flex items-center justify-center">1</span>
            <h3 className="text-sm font-bold text-slate-900">Le code démarre-t-il ?</h3>
            <p className="text-xs text-slate-600 font-medium">
              <strong>Si NON :</strong> C&apos;est une erreur de syntaxe ou un import manquant. Regardez les soulignements rouges dans votre éditeur de code.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-purple-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center">2</span>
            <h3 className="text-sm font-bold text-slate-900">Y a-t-il un message rouge dans la console ?</h3>
            <p className="text-xs text-slate-600 font-medium">
              <strong>Si OUI :</strong> C&apos;est une erreur d&apos;exécution (Runtime). Lisez la première ligne de la Stack Trace pour trouver le fichier et le numéro de ligne.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-amber-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center">3</span>
            <h3 className="text-sm font-bold text-slate-900">Le code tourne mais le résultat est faux ?</h3>
            <p className="text-xs text-slate-600 font-medium">
              <strong>Si OUI :</strong> C&apos;est une erreur de logique. Posez un Breakpoint dans VS Code et observez vos variables étape par étape.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 : SIMULATEUR PRATIQUE DE CONSOLE (DEVTOOLS / NODE)
         ========================================================================= */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="code" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-slate-950">
            Simulateur Pratique : Manipuler les erreurs en Console (DevTools / Node.js)
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Entraînez-vous ci-dessous à injecter des exceptions (Stack Trace), afficher des collections avec <code className="text-emerald-700 font-mono font-bold">console.table()</code>, ou filtrer les logs par niveau de gravité :
        </p>
        <DebuggingConsoleSimulator />
      </section>

      {/* =========================================================================
          SECTION 9 : SYNTHÈSE DES POINTS CLÉS
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">8</span>
          <h2 className="text-xl font-bold text-slate-950">
            Synthèse du Chapitre 3
          </h2>
        </div>
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-lime-500/10 to-teal-500/10 border-2 border-emerald-300 space-y-2 text-sm sm:text-base font-medium text-slate-900">
          <p>• <strong>Erreur de syntaxe :</strong> Enfreint la grammaire du langage ; bloque le programme avant même son démarrage.</p>
          <p>• <strong>Erreur d&apos;exécution (Runtime) :</strong> Plante en cours de route avec une Stack Trace détaillée indiquant la ligne du crash.</p>
          <p>• <strong>Erreur de logique :</strong> Tourne sans aucun message d&apos;erreur mais produit un résultat faux ; nécessite des Breakpoints ou des tests automatisés.</p>
          <p>• Toujours qualifier la famille d&apos;erreur en premier pour choisir immédiatement le bon outil de diagnostic.</p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 : QUIZ D'AUTO-ÉVALUATION
         ========================================================================= */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Auto-évaluation — Classifier et résoudre les types d'erreurs"
          questions={[
            {
              id: 1,
              question: "Une parenthèse fermante manque dans une fonction JavaScript. Quelle est la catégorie exacte ?",
              options: [
                "Une erreur logique.",
                "Une erreur de syntaxe (SyntaxError).",
                "Une erreur de base de données.",
                "Une erreur de performance réseau.",
              ],
              correctIndex: 1,
              explanation: "Exact ! Le compilateur ou parser ne peut pas déchiffrer la grammaire du fichier : c'est une SyntaxError qui empêche tout démarrage.",
            },
            {
              id: 2,
              question: "Une fonction retourne 15 au lieu de 50 à cause d'une mauvaise formule mathématique. De quoi s'agit-il ?",
              options: [
                "D'une erreur logique (ou sémantique).",
                "D'une erreur de syntaxe.",
                "D'une coupure de serveur.",
                "D'un crash du compilateur.",
              ],
              correctIndex: 0,
              explanation: "Parfait ! Le code tourne parfaitement sans lever aucune exception, mais le calcul mathématique est erroné : c'est une erreur logique.",
            },
            {
              id: 3,
              question: "JavaScript affiche dans la console : TypeError: Cannot read properties of undefined. Quelle est la catégorie ?",
              options: [
                "Une erreur de compilation CSS.",
                "Une erreur d'exécution (Runtime Error).",
                "Une simple suggestion cosmétique.",
                "Une erreur de syntaxe au parsing.",
              ],
              correctIndex: 1,
              explanation: "Bien joué ! L'opération a été tentée au cours de l'exécution et le moteur a interrompu le processus en émettant une exception.",
            },
            {
              id: 4,
              question: "Quel type d'erreur est considéré comme le plus pernicieux car il ne produit AUCUN message d'alerte ?",
              options: [
                "L'erreur logique.",
                "L'erreur de syntaxe.",
                "L'erreur de port réseau fermé.",
                "L'erreur de mémoire saturée.",
              ],
              correctIndex: 0,
              explanation: "Tout à fait ! Comme aucun message rouge n'apparaît, seuls des tests automatisés ou des utilisateurs vigilants peuvent la démasquer.",
            },
            {
              id: 5,
              question: "Quel outil est le plus efficace pour traquer pas à pas une erreur logique sans message d'erreur ?",
              options: [
                "Un outil de retouche d'image.",
                "Le débogueur de VS Code avec des points d'arrêt (Breakpoints) pour inspecter les variables.",
                "Désinstaller et réinstaller Node.js.",
                "Fermer le terminal sans enregistrer.",
              ],
              correctIndex: 1,
              explanation: "Excellente réponse ! Les breakpoints permettent de figer le programme pour observer l'évolution de chaque valeur en mémoire pas à pas.",
            },
          ]}
        />
      </section>
    </div>
  );
};
