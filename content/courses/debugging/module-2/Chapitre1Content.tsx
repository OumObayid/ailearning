'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Présentation des outils de débogage
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <p className="text-base text-slate-800 font-medium">
          À la fin de ce chapitre, vous serez capable de :
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les principaux outils du développeur professionnel.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le rôle précis et la couche de chaque outil.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Choisir l&apos;outil adapté selon le type de problème rencontré.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer les outils d&apos;inspection, de diagnostic, de traçage et de correction.</span>
          </li>
        </ul>
      </section>

      {/* 2. Pourquoi utiliser des outils */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Pourquoi utiliser des outils de débogage ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsqu&apos;une application présente un dysfonctionnement, lire uniquement le code source ne suffit pas toujours.
        </p>
        <p className="text-base text-slate-800 font-medium">
          Prenons un exemple concret : vous développez une application React qui communique avec une API Node.js et une base de données MySQL. Un utilisateur clique sur le bouton <strong>Se connecter</strong>, mais rien ne se passe.
        </p>
        <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-300 space-y-2">
          <div className="text-sm font-bold text-amber-950">Plusieurs anomalies techniques sont possibles :</div>
          <ul className="list-disc pl-5 text-sm text-slate-800 font-medium space-y-1">
            <li>Un événement JavaScript ne se déclenche pas côté navigateur.</li>
            <li>Une erreur JavaScript non gérée interrompt l&apos;exécution du composant React.</li>
            <li>Une requête HTTP n&apos;est pas envoyée ou est bloquée par CORS.</li>
            <li>L&apos;API Node.js retourne un code d&apos;erreur HTTP 500.</li>
            <li>La connexion entre Node.js et MySQL échoue ou expire (timeout).</li>
            <li>Le backend retourne une réponse JSON avec une structure inattendue.</li>
            <li>Le frontend ne traite pas correctement le payload de réponse.</li>
          </ul>
        </div>
        <p className="text-base text-slate-800 font-medium">
          Sans outils de débogage, vous risquez de modifier plusieurs fichiers au hasard en espérant un miracle. Avec les bons outils, vous observez le comportement réel, isolez la couche défaillante et remontez méthodiquement jusqu&apos;à la cause racine.
        </p>
        <Callout type="tip" title="Principe fondamental">
          Un outil de débogage permet d&apos;observer, de mesurer et d&apos;analyser l&apos;exécution dynamique d&apos;un programme afin de comprendre son comportement réel, au-delà de la simple lecture statique du code source.
        </Callout>
      </section>

      {/* 3. Les grandes catégories d'outils */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les grandes catégories d&apos;outils de débogage
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Il existe plusieurs catégories d&apos;outils complémentaires qu&apos;un développeur professionnel combine au quotidien.
        </p>

        {/* 3.1 Chrome DevTools */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            3.1. Les outils de développement du navigateur (Chrome DevTools)
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Intégré directement à Google Chrome, DevTools permet d&apos;inspecter le frontend en direct :
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-800 font-medium space-y-1">
            <li>Examiner et modifier le DOM (HTML) et les règles CSS.</li>
            <li>Consulter les erreurs JavaScript et exécuter des commandes dans la Console.</li>
            <li>Analyser les requêtes et réponses HTTP dans l&apos;onglet Network.</li>
            <li>Placer des points d&apos;arrêt (Breakpoints) et inspecter la mémoire.</li>
          </ul>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image1.jpeg"
              alt="Interface de Chrome DevTools avec panneau Sources et Breakpoints"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.1.1 — Chrome DevTools : panneau Sources avec fichiers (1), éditeur (2) et volet de débogage (3).
            </div>
          </div>
        </div>

        {/* 3.2 IDE VS Code */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            3.2. Les environnements de développement intégrés (VS Code Debugger)
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Visual Studio Code intègre un débogueur puissant particulièrement adapté pour examiner le fonctionnement interne du backend Node.js :
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-800 font-medium space-y-1">
            <li>Définir des breakpoints sur des lignes de code backend.</li>
            <li>Exécuter le code pas à pas (Step Over, Step Into, Step Out).</li>
            <li>Inspecter les variables locales, globales et closures.</li>
            <li>Analyser la Call Stack des fonctions Express et microservices.</li>
          </ul>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image2.jpeg"
              alt="Débogueur de Visual Studio Code avec Call Stack et Variables"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.1.2 — Débogueur VS Code : variables locales, pile d&apos;appels (Call Stack) et contrôles d&apos;exécution.
            </div>
          </div>
        </div>

        {/* 3.3 Postman */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            3.3. Les outils de test d&apos;API (Postman)
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Postman permet de tester directement les API sans dépendre de l&apos;interface frontend :
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-800 font-medium space-y-1">
            <li>Envoyer des requêtes HTTP personnalisées (GET, POST, PUT, DELETE, PATCH).</li>
            <li>Examiner le statut HTTP retourné (200, 400, 401, 404, 500) et les en-têtes.</li>
            <li>Inspecter la structure brute du payload JSON de réponse.</li>
            <li>Isoler un bug : déterminer immédiatement si la défaillance provient de l&apos;API backend ou du composant React.</li>
          </ul>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image3.jpeg"
              alt="Interface de test Postman avec requête HTTP et réponse JSON"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.1.3 — Postman : envoi d&apos;une requête GET avec en-têtes et analyse de la réponse JSON 200 OK.
            </div>
          </div>
        </div>

        {/* 3.4 Logging */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            3.4. Les outils de journalisation (Logging)
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Les instructions de logging enregistrent des informations chronologiques sur l&apos;état applicatif :
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-800 font-medium space-y-1">
            <li><code className="text-emerald-700 bg-slate-100 px-1 py-0.5 rounded font-mono">console.log()</code> : afficher une information générale d&apos;exécution.</li>
            <li><code className="text-emerald-700 bg-slate-100 px-1 py-0.5 rounded font-mono">console.warn()</code> : signaler un avertissement non bloquant.</li>
            <li><code className="text-emerald-700 bg-slate-100 px-1 py-0.5 rounded font-mono">console.error()</code> : consigner une erreur critique et sa stack trace.</li>
            <li><code className="text-emerald-700 bg-slate-100 px-1 py-0.5 rounded font-mono">console.table()</code> : formater des tableaux d&apos;objets sous forme tabulaire lisible.</li>
            <li>Bibliothèques Node.js professionnelles pour la production : <strong>Winston</strong>, <strong>Pino</strong>.</li>
          </ul>
        </div>

        {/* 3.5 Bases de données */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            3.5. Les outils de débogage de bases de données (MySQL Workbench)
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Permet d&apos;inspecter l&apos;état réel des données persistées et les erreurs SQL :
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-800 font-medium space-y-1">
            <li>Exécuter manuellement des requêtes SQL pour vérifier les résultats.</li>
            <li>Vérifier la structure des tables, colonnes, types et contraintes de clés étrangères.</li>
            <li>Analyser les plans d&apos;exécution de requêtes avec <code className="text-emerald-700 bg-slate-100 px-1 py-0.5 rounded font-mono">EXPLAIN</code> pour identifier les lenteurs.</li>
          </ul>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image4.jpeg"
              alt="MySQL Workbench avec requête SQL SELECT et grille de résultats"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.1.4 — MySQL Workbench : exécution d&apos;un SELECT sur la table employees et grille de données.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tableau comparatif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Matrice comparative des outils professionnels
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Outil</th>
                <th className="p-3.5">Domaine principal</th>
                <th className="p-3.5">Problèmes recherchés</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Chrome DevTools</td>
                <td className="p-3.5">Frontend (Navigateur)</td>
                <td className="p-3.5">Erreurs JavaScript, DOM, CSS, réseau HTTP</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">VS Code Debugger</td>
                <td className="p-3.5">Frontend et Backend</td>
                <td className="p-3.5">Exécution pas à pas, variables, Call Stack, logique Node.js</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Postman</td>
                <td className="p-3.5">API REST / HTTP</td>
                <td className="p-3.5">Contrats d&apos;API, payloads JSON, statuts HTTP, latence</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Console / Logging</td>
                <td className="p-3.5">Frontend et Backend</td>
                <td className="p-3.5">Traces chronologiques, stack traces, états d&apos;objets</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">MySQL Workbench</td>
                <td className="p-3.5">Base de données relationnelle</td>
                <td className="p-3.5">Erreurs SQL, intégrité des données, indexation, performances</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Callout type="warning" title="Attention aux faux raccourcis">
          Ces outils ne sont pas interchangeables ! Postman, par exemple, ne permet pas d&apos;inspecter la valeur d&apos;une variable locale dans une fonction React. Pour cela, un débogueur avec point d&apos;arrêt est indispensable.
        </Callout>
      </section>

      {/* 5. Démarche professionnelle par couche */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Où utiliser chaque outil dans une application Web ?
        </h2>
        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-3">
          <div className="text-emerald-400 font-bold"># Architecture &amp; Points d&apos;intervention :</div>
          <div>[FRONTEND - React / Next.js]  → Chrome DevTools (Console, Elements, Network)</div>
          <div className="text-slate-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Requête HTTP Fetch / Axios)</div>
          <div>[API GATEWAY &amp; ENDPOINTS]       → Postman (Test autonome de contrat API)</div>
          <div className="text-slate-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
          <div>[BACKEND - Node.js / Express]   → VS Code Debugger (Breakpoints, Call Stack, Scope)</div>
          <div className="text-slate-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Requête SQL)</div>
          <div>[PERSISTANCE - MySQL / Redis]   → MySQL Workbench (Vérification structure &amp; données)</div>
        </div>
        <p className="text-base text-slate-800 font-medium">
          Imaginons qu&apos;un utilisateur clique sur un bouton de commande et obtienne une erreur :
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-800 font-medium">
          <li><strong>Chrome DevTools — Console :</strong> vérifier immédiatement si une exception JavaScript frontend a interrompu le clic.</li>
          <li><strong>Chrome DevTools — Network :</strong> vérifier si la requête HTTP part, inspecter son URL, sa méthode et son code de réponse.</li>
          <li><strong>Postman :</strong> reproduire la requête avec le même payload pour tester l&apos;endpoint indépendamment de l&apos;interface.</li>
          <li><strong>VS Code Debugger :</strong> poser un breakpoint dans le contrôleur backend Express pour examiner les variables à la volée.</li>
          <li><strong>MySQL Workbench :</strong> vérifier si la table et les colonnes interrogées existent et contiennent des données valides.</li>
        </ol>
      </section>

      {/* 6. Fonctionnalités d'un débogueur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Les fonctionnalités fondamentales d&apos;un débogueur moderne
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-emerald-700">Breakpoint</span>
            <p className="text-slate-700 text-xs mt-1">Suspendre l&apos;exécution à une ligne de code précise avant son évaluation.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-emerald-700">Step Into</span>
            <p className="text-slate-700 text-xs mt-1">Entrer à l&apos;intérieur d&apos;une fonction appelée pour observer son implémentation.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-emerald-700">Step Over</span>
            <p className="text-slate-700 text-xs mt-1">Exécuter la ligne courante sans entrer dans les sous-fonctions appelées.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-emerald-700">Step Out</span>
            <p className="text-slate-700 text-xs mt-1">Terminer l&apos;exécution de la fonction courante et revenir à son appelant.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-emerald-700">Watch</span>
            <p className="text-slate-700 text-xs mt-1">Surveiller en continu la valeur d&apos;une expression ou d&apos;une variable complexe.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-emerald-700">Call Stack</span>
            <p className="text-slate-700 text-xs mt-1">Examiner la chaîne hiérarchique des appels de fonctions ayant conduit à la ligne active.</p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.1
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel outil permet d'inspecter les requêtes HTTP envoyées par une application Web ?",
              options: [
                "MySQL Workbench",
                "Chrome DevTools — Panneau Network",
                "Windows Explorer",
                "npm run start"
              ],
              correctIndex: 1,
              explanation: "Le panneau Network de Chrome DevTools consigne l'ensemble des échanges HTTP/HTTPS (URL, headers, payload, statut, temps de réponse) entre le navigateur et le serveur."
            },
            {
              id: 2,
              question: "Quel outil permet de suspendre l'exécution d'une fonction Node.js et d'inspecter ses variables ?",
              options: [
                "Postman",
                "MySQL Workbench",
                "VS Code Debugger",
                "Google Search"
              ],
              correctIndex: 2,
              explanation: "Le débogueur intégré de Visual Studio Code s'attache au processus Node.js pour poser des points d'arrêt, inspecter le scope des variables et avancer pas à pas."
            },
            {
              id: 3,
              question: "Quel outil permet de tester une API REST indépendamment de l'interface frontend ?",
              options: [
                "Postman",
                "Chrome Elements",
                "MySQL Workbench",
                "CSS Grid"
              ],
              correctIndex: 0,
              explanation: "Postman permet de forger et d'envoyer des requêtes HTTP directement au backend pour tester les endpoints sans aucune dépendance envers l'interface utilisateur."
            },
            {
              id: 4,
              question: "À quoi sert principalement un Breakpoint dans un débogueur ?",
              options: [
                "À supprimer automatiquement une erreur dans le code",
                "À arrêter temporairement l'exécution du programme à un endroit précis pour inspecter son état",
                "À modifier automatiquement la valeur d'une variable en production",
                "À redémarrer le serveur HTTP"
              ],
              correctIndex: 1,
              explanation: "Un breakpoint fige l'exécution du code sur une ligne donnée avant son évaluation, permettant au développeur d'inspecter les variables et la pile d'appels à cet instant T."
            },
            {
              id: 5,
              question: "Une erreur SQL indique qu'une colonne est inconnue. Quel outil est particulièrement adapté pour vérifier la structure réelle de la table ?",
              options: [
                "Postman",
                "Chrome DevTools",
                "MySQL Workbench",
                "React DevTools"
              ],
              correctIndex: 2,
              explanation: "MySQL Workbench permet d'inspecter le schéma relationnel, les colonnes réelles, leurs types et d'exécuter des requêtes de diagnostic directement sur la base."
            }
          ]}
        />
      </section>
    </div>
  );
};
