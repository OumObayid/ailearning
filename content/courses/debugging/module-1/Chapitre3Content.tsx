'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { DebuggingConsoleSimulator } from '@/components/interactive/DebuggingConsoleSimulator';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'syntax' | 'logic' | 'runtime'>('syntax');

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Différence entre erreur de syntaxe, logique et d&apos;exécution
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les trois grandes catégories d&apos;erreurs
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsqu&apos;un développeur conçoit une application, les problèmes peuvent survenir à différents stades : avant l&apos;exécution (au parsing), pendant l&apos;exécution (au runtime), ou insidieusement dans le résultat produit sans qu&apos;aucun message d&apos;erreur n&apos;apparaisse.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-rose-300 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-rose-800">1. Bloquante au parsing</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Erreur de syntaxe</h3>
            <p className="text-xs text-slate-700 font-medium">Non-respect de la grammaire du langage. Détectée avant même que le code ne commence à s&apos;exécuter.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border-2 border-amber-300 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-amber-800">2. Silencieuse &amp; Trompeuse</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Erreur logique</h3>
            <p className="text-xs text-slate-700 font-medium">Le code compile et s&apos;exécute sans exception, mais le résultat calculé est incorrect.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border-2 border-purple-300 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-purple-800">3. Crash à l&apos;exécution</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Erreur d&apos;exécution</h3>
            <p className="text-xs text-slate-700 font-medium">Syntaxe valide, mais l&apos;opération échoue au runtime (accès à null, ressource absente, réseau coupé).</p>
          </div>
        </div>
      </section>

      {/* 2. Erreur de syntaxe */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Erreur de syntaxe (Syntax Error)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Une erreur de syntaxe se produit lorsque le code enfreint les règles grammaticales du langage. Le moteur d&apos;analyse (parser) est incapable d&apos;interpréter le texte pour construire l&apos;arbre syntaxique abstrait (AST).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-rose-800">Code incorrect :</span>
            <pre className="font-mono text-xs bg-white p-3 rounded-lg text-slate-900">
{`function calculerTotal(prix, quantite) {
  return prix * quantite
// Accolade fermante manquante !`}
            </pre>
            <p className="text-xs text-rose-700 font-mono">SyntaxError: Unexpected end of input</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-emerald-700">Code corrigé :</span>
            <pre className="font-mono text-xs bg-white p-3 rounded-lg text-slate-900">
{`function calculerTotal(prix, quantite) {
  return prix * quantite;
}`}
            </pre>
            <p className="text-xs text-emerald-700 font-semibold">Le code est analysé et compilé avec succès.</p>
          </div>
        </div>
        <Callout type="info" title="Outils de détection précoce">
          Les erreurs de syntaxe sont désormais repérées en temps réel par les éditeurs modernes comme <strong>VS Code</strong>, ainsi que par les linters comme <strong>ESLint</strong> et les compilateurs TypeScript avant même de lancer l&apos;application.
        </Callout>
      </section>

      {/* 3. Erreur logique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Erreur logique (Logical Error)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          L&apos;erreur logique est particulièrement pernicieuse : le programme est syntaxiquement irréprochable, démarre sans problème et ne déclenche aucune exception visible dans les logs. Pourtant, le résultat produit est faux.
        </p>
        <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
          <p className="text-xs font-black uppercase text-amber-800">Exemple de condition logique incorrecte :</p>
          <pre className="font-mono text-xs bg-white p-3.5 rounded-xl border border-slate-200 text-slate-900 overflow-x-auto">
{`function verifierAge(age) {
  if (age > 18) { // BUG : l'opérateur > exclut les personnes de 18 ans pile !
    return "Accès autorisé";
  }
  return "Accès refusé";
}

console.log(verifierAge(18)); // Affiche "Accès refusé" au lieu d'"Accès autorisé"`}
          </pre>
          <p className="text-xs font-black uppercase text-emerald-700">Correction logique :</p>
          <pre className="font-mono text-xs bg-white p-3.5 rounded-xl border border-slate-200 text-slate-900 overflow-x-auto">
{`function verifierAge(age) {
  if (age >= 18) { // Correction de l'opérateur de comparaison
    return "Accès autorisé";
  }
  return "Accès refusé";
}`}
          </pre>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Inspection des erreurs logiques avec le Débogueur VS Code
          </h3>
          <p className="text-sm text-slate-800 font-medium">
            Pour diagnostiquer une erreur logique sans message d&apos;erreur explicite, la méthode reine consiste à poser un <strong>Breakpoint</strong> et à inspecter l&apos;état exact des variables pas à pas :
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
              Figure 1.1 — Utilisation des Breakpoints et du panneau de variables dans le débogueur VS Code pour traquer les erreurs logiques.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Erreur d'exécution */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Erreur d&apos;exécution (Runtime Error)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Une erreur d&apos;exécution survient en cours de fonctionnement lorsque le programme tente d&apos;exécuter une instruction que le moteur ne peut pas mener à bien : lecture d&apos;une propriété sur <code>null</code> ou <code>undefined</code>, appel d&apos;une fonction inexistante, ou coupure de connexion base de données.
        </p>

        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Analyse de la Stack Trace lors d&apos;un crash de runtime
          </h3>
          <p className="text-sm text-slate-800 font-medium">
            Lorsqu&apos;une erreur d&apos;exécution survient, le runtime génère une <strong>Stack Trace</strong> détaillée indiquant le fichier exact, la ligne, la colonne et la suite d&apos;appels de fonctions ayant mené à l&apos;échec :
          </p>
          {/* Image 2 from Word Doc */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image2.jpeg"
              alt="Analyse d'une Stack Trace Node.js lors d'une ReferenceError"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.2 — Décomposition d&apos;une Stack Trace Node.js : type d&apos;erreur, message explicite, fichier et chaîne des fonctions appelantes.
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 space-y-2">
          <p className="text-xs uppercase font-extrabold text-purple-700">Sécuriser les opérations à risque avec try...catch :</p>
          <pre className="font-mono text-xs bg-white p-3.5 rounded-xl border border-slate-200 text-slate-900 overflow-x-auto">
{`const mysql = require("mysql2/promise");

async function connecterBD() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.DB_PASSWORD,
      database: "boutique"
    });
    console.log("Connexion MySQL établie avec succès");
    return connection;
  } catch (error) {
    // Interception de l'erreur d'exécution et production d'un log diagnostique exploitable
    console.error("Échec de connexion MySQL :", error.message);
    throw error;
  }
}`}
          </pre>
        </div>
      </section>

      {/* 5. Tableau comparatif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Comparaison des trois catégories
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-100 text-slate-950 border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5 font-black">Critère</th>
                <th className="p-3.5 font-black text-rose-800">Syntaxe</th>
                <th className="p-3.5 font-black text-amber-800">Logique</th>
                <th className="p-3.5 font-black text-purple-800">Exécution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr>
                <td className="p-3.5 font-black bg-slate-50">Code syntaxiquement valide</td>
                <td className="p-3.5 text-rose-700">Non</td>
                <td className="p-3.5 text-emerald-700">Oui</td>
                <td className="p-3.5 text-emerald-700">Oui</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black bg-slate-50">Le programme peut-il démarrer ?</td>
                <td className="p-3.5 text-rose-700">Non (échec au parsing)</td>
                <td className="p-3.5 text-emerald-700">Oui</td>
                <td className="p-3.5 text-amber-700">Oui (jusqu&apos;au crash)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black bg-slate-50">Résultat incorrect produit</td>
                <td className="p-3.5">Non exécuté</td>
                <td className="p-3.5 text-rose-700">Oui (silencieux)</td>
                <td className="p-3.5">Interruption</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black bg-slate-50">Exception obligatoire levée</td>
                <td className="p-3.5">Oui (SyntaxError)</td>
                <td className="p-3.5 text-amber-700">Non (aucune alerte)</td>
                <td className="p-3.5 text-rose-700">Oui (TypeError, ReferenceError)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black bg-slate-50">Outils de diagnostic</td>
                <td className="p-3.5">Compilateur, ESLint, IDE</td>
                <td className="p-3.5">Breakpoints, Tests unitaires</td>
                <td className="p-3.5">Stack Trace, Logs, DevTools</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Laboratoire interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Démonstration interactive : Classifier l&apos;erreur
        </h2>
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDemo('syntax')}
              className={`px-4 py-2 rounded-xl text-sm font-black transition ${
                selectedDemo === 'syntax'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              1. Erreur de Syntaxe
            </button>
            <button
              onClick={() => setSelectedDemo('logic')}
              className={`px-4 py-2 rounded-xl text-sm font-black transition ${
                selectedDemo === 'logic'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              2. Erreur Logique
            </button>
            <button
              onClick={() => setSelectedDemo('runtime')}
              className={`px-4 py-2 rounded-xl text-sm font-black transition ${
                selectedDemo === 'runtime'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              3. Erreur d&apos;Exécution
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-sm space-y-3">
            {selectedDemo === 'syntax' && (
              <>
                <div className="text-xs text-rose-400 font-bold uppercase"># Cas Syntaxe : Accolade fermante manquante</div>
                <pre className="text-rose-200">{`function addition(a, b) {\n  return a + b;`}</pre>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-rose-400 font-bold">Conséquence :</span> SyntaxError au chargement. Le moteur refuse de parser le fichier.
                </div>
              </>
            )}
            {selectedDemo === 'logic' && (
              <>
                <div className="text-xs text-amber-400 font-bold uppercase"># Cas Logique : Calcul défaillant sans aucune exception</div>
                <pre className="text-amber-200">{`function calculerRemise(prix, pourcentage) {\n  return prix - pourcentage; // Erreur : il fallait prix * (pourcentage / 100)\n}\ncalculerRemise(100, 20); // Retourne 80 au lieu de 20`}</pre>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-amber-400 font-bold">Conséquence :</span> Aucun message d&apos;erreur. Le calcul passe inaperçu jusqu&apos;à la réclamation client.
                </div>
              </>
            )}
            {selectedDemo === 'runtime' && (
              <>
                <div className="text-xs text-purple-400 font-bold uppercase"># Cas Exécution : Accès à une propriété sur null</div>
                <pre className="text-purple-200">{`const client = null;\nconsole.log(client.commandes[0]);`}</pre>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-purple-400 font-bold">Conséquence :</span> TypeError: Cannot read properties of null au moment exact où la ligne est exécutée.
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 7. Arbre de décision */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Arbre de décision diagnostique
        </h2>
        <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-4">
          <p className="text-sm font-semibold text-slate-800">
            Protocole professionnel de qualification dès la détection d&apos;un problème :
          </p>
          <div className="space-y-3 text-sm font-medium">
            <div className="p-3.5 rounded-xl bg-white border border-slate-300">
              <strong>Question 1 :</strong> Le code démarre-t-il et passe-t-il l&apos;étape du parsing ?<br />
              <span className="text-rose-700 font-bold">➔ NON :</span> Inspecter la syntaxe, les parenthèses, accolades et imports.
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-300">
              <strong>Question 2 :</strong> Une exception ou une alerte console est-elle émise à l&apos;exécution ?<br />
              <span className="text-purple-700 font-bold">➔ OUI :</span> Analyser la Stack Trace, la ligne responsable et les valeurs <code>null/undefined</code>.
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-300">
              <strong>Question 3 :</strong> Le programme tourne sans erreur mais le résultat diffère du besoin ?<br />
              <span className="text-amber-700 font-bold">➔ OUI :</span> Rechercher une erreur logique via Breakpoints et tests unitaires de non-régression.
            </div>
          </div>
        </div>
      </section>

      {/* 8. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Synthèse du chapitre
        </h2>
        <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-slate-900 space-y-2 text-base font-medium">
          <p>• <strong>Erreur de syntaxe :</strong> Enfreint les règles d&apos;écriture ; bloque l&apos;analyse avant tout démarrage.</p>
          <p>• <strong>Erreur logique :</strong> Syntaxe parfaite, mais raisonnement défaillant ; silencieuse et sans alerte native.</p>
          <p>• <strong>Erreur d&apos;exécution :</strong> L&apos;opération bute sur une impossibilité au runtime ; produit une stack trace précise.</p>
          <p>• Toujours qualifier la nature de l&apos;erreur avant de choisir l&apos;outil de diagnostic approprié.</p>
        </div>
      </section>

      {/* Simulateur Interactif de Console */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="code" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            Simulateur Pratique : Observer les erreurs en Console (DevTools / Node.js)
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Manipulez directement la console émulée ci-dessous pour injecter des exceptions (Stack Trace), afficher des collections avec <code className="text-emerald-700 font-mono font-bold">console.table()</code>, ou filtrer les logs par sévérité :
        </p>
        <DebuggingConsoleSimulator />
      </section>

      {/* 9. Quiz */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Quiz d'auto-évaluation — Catégorisation des Erreurs"
          questions={[
            {
              id: 1,
              question: "Une parenthèse fermante manque dans une fonction JavaScript. Quelle est la catégorie exacte ?",
              options: [
                "Une erreur logique.",
                "Une erreur de syntaxe.",
                "Une erreur de base de données.",
                "Une erreur de performance.",
              ],
              correctIndex: 1,
              explanation: "Le parser ne peut pas analyser le fichier : il s'agit d'une SyntaxError.",
            },
            {
              id: 2,
              question: "Une fonction retourne 15 au lieu de 50 à cause d'une mauvaise formule mathématique. De quoi s'agit-il ?",
              options: [
                "D'une erreur logique.",
                "D'une erreur de syntaxe.",
                "D'une erreur réseau.",
                "D'un crash du compilateur.",
              ],
              correctIndex: 0,
              explanation: "Le code tourne parfaitement mais produit un résultat mathématique erroné : c'est une erreur logique.",
            },
            {
              id: 3,
              question: "JavaScript affiche ReferenceError: user is not defined. Quelle est la catégorie ?",
              options: [
                "Une erreur logique.",
                "Une erreur d'exécution (Runtime Error).",
                "Une simple anomalie CSS.",
                "Une erreur de bundling.",
              ],
              correctIndex: 1,
              explanation: "L'instruction tente d'accéder à une variable inexistante au moment de son exécution.",
            },
            {
              id: 4,
              question: "Quel type d'erreur peut ne produire AUCUN message d'erreur tout en générant des données fausses ?",
              options: [
                "L'erreur logique.",
                "L'erreur de syntaxe.",
                "L'erreur de parsing.",
                "L'erreur d'import de module.",
              ],
              correctIndex: 0,
              explanation: "Les erreurs logiques s'exécutent sans exception, ce qui les rend particulièrement trompeuses.",
            },
            {
              id: 5,
              question: "Quel outil permet d'inspecter l'état exact des variables pas à pas pour traquer une erreur logique ?",
              options: [
                "Un outil de retouche d'image.",
                "Le débogueur de VS Code avec points d'arrêt (Breakpoints).",
                "Un simple visualiseur de base de données.",
                "Un formateur de texte.",
              ],
              correctIndex: 1,
              explanation: "Les breakpoints permettent de suspendre l'exécution et d'examiner chaque variable en mémoire.",
            },
          ]}
        />
      </section>
    </div>
  );
};
