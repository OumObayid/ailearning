'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';

interface ToolDiagnosticCase {
  id: string;
  symptom: string;
  recommendedTool: string;
  toolBadge: string;
  badgeColor: string;
  explanation: string;
  whyNotOthers: string;
}

export const Chapitre1Content: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('api');

  const diagnosticCases: ToolDiagnosticCase[] = [
    {
      id: 'api',
      symptom: 'Le bouton « Se connecter » ne réagit pas. Vous voulez savoir si le problème vient de l\'interface React ou de l\'API Node.js.',
      recommendedTool: 'Postman (ou curl)',
      toolBadge: 'TEST D\'API INDÉPENDANT',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      explanation: 'Postman permet d\'envoyer directement le login et mot de passe à l\'API backend sans passer par l\'écran React. Si l\'API renvoie 200 OK avec le jeton, le backend est innocent et vous savez que le bug se cache dans le composant React !',
      whyNotOthers: 'MySQL Workbench ne testerait que la base (trop loin). Le débogueur VS Code nécessiterait de figer tout le serveur avant même de savoir si la requête arrive.',
    },
    {
      id: 'crash-backend',
      symptom: 'Le serveur Node.js lève l\'erreur « Cannot read properties of null » au milieu d\'une fonction complexe de 80 lignes.',
      recommendedTool: 'VS Code Debugger (Point d\'arrêt / Breakpoint)',
      toolBadge: 'DÉBOGAGE PAS À PAS',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      explanation: 'Poser un Breakpoint dans VS Code fige le serveur juste avant la ligne du crash. Vous pouvez survoler chaque variable avec la souris et voir instantanément laquelle vaut null, sans ajouter un seul console.log !',
      whyNotOthers: 'Postman ne verra qu\'une erreur HTTP 500 sans savoir quelle variable était null. DevTools ne voit pas le code exécuté côté serveur.',
    },
    {
      id: 'cors',
      symptom: 'Le navigateur affiche un message rouge dans la console : « Access to fetch has been blocked by CORS policy ».',
      recommendedTool: 'Chrome DevTools — Panneau Network',
      toolBadge: 'INSPECTION RÉSEAU HTTP',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      explanation: 'L\'onglet Network de Chrome DevTools montre la requête en rouge, avec les en-têtes exacts envoyés et les en-têtes manquants (Access-Control-Allow-Origin). C\'est l\'outil n°1 pour démasquer les problèmes de communication entre frontend et backend.',
      whyNotOthers: 'Postman ne bloque jamais les requêtes CORS (car CORS est une sécurité imposée exclusivement par les navigateurs web !). Tester dans Postman masquerait complètement le bug !',
    },
    {
      id: 'sql-slow',
      symptom: 'La page d\'historique des commandes met 9 secondes à charger pour les anciens clients ayant beaucoup d\'achats.',
      recommendedTool: 'MySQL Workbench (Commande EXPLAIN)',
      toolBadge: 'BASE DE DONNÉES & INDEX',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      explanation: 'En exécutant la requête dans MySQL Workbench précédée de EXPLAIN, vous visualisez si le moteur SQL parcourt 10 lignes avec un index ou s\'il lit 1 million de lignes sur le disque dur (Full Table Scan).',
      whyNotOthers: 'DevTools et VS Code ne feront que chronométrer l\'attente sans vous expliquer pourquoi le moteur de stockage est ralenti.',
    },
  ];

  const activeCase = diagnosticCases.find((c) => c.id === selectedCaseId) || diagnosticCases[0];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-lime-200 bg-gradient-to-br from-lime-50/90 via-emerald-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider bg-lime-100/80 px-3 py-1 rounded-full border border-lime-300">
            <Icon name="bug" className="w-4 h-4 text-lime-800" />
            <span>Ingénierie du Débogage • Module 2</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Lecture accessible : ~12 min</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-3">
          Chapitre 1 — Présentation des outils de débogage
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          Pourquoi lire du code à l&apos;œil nu ne suffit plus : découvrez la panoplie des 5 grands instruments de mesure d&apos;un développeur moderne (DevTools, VS Code, Postman, Logs et Workbench).
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Choisir le bon outil selon la couche</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dépasser les limites de console.log()</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Maîtriser les 5 fonctionnalités clefs</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : POURQUOI DES OUTILS ? L'ANALOGIE DU MÉDECIN
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-950">
            Pourquoi lire son code à l&apos;écran ne suffit plus ?
          </h2>
        </div>

        <p className="text-base text-slate-800 font-medium">
          Quand vous regardez un fichier de code sur votre écran, vous ne voyez que du texte figé (une analyse <em>statique</em>). Mais quand l&apos;application tourne, des millions de données circulent en temps réel, des requêtes réseau partent et reviennent, et la mémoire change à chaque milliseconde (l&apos;exécution <em>dynamique</em>).
        </p>

        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-black text-base">
            <Icon name="sparkles" className="w-5 h-5 text-amber-700" />
            <span>L&apos;analogie médicale : Les instruments de mesure du médecin</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
            Un médecin ne devine pas une fracture en regardant la peau d&apos;un patient à l&apos;œil nu. Il utilise une panoplie d&apos;outils spécialisés :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-800">
              <strong className="text-amber-900 block mb-1">Stéthoscope (Console DevTools) :</strong>
              Écouter les battements du frontend et capturer les alertes en direct.
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-800">
              <strong className="text-blue-900 block mb-1">Scanner / IRM (VS Code Debugger) :</strong>
              Figer le corps au ralenti et regarder l&apos;état exact des organes (variables).
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-800">
              <strong className="text-purple-900 block mb-1">Prise de sang (Postman) :</strong>
              Isoler un échantillon en laboratoire et tester sa réaction chimique sans le patient.
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-800">
              <strong className="text-emerald-900 block mb-1">Dossier médical (MySQL) :</strong>
              Vérifier l&apos;historique enregistré pour s&apos;assurer qu&apos;aucune donnée n&apos;est corrompue.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LE MATCH : CONSOLE.LOG() VS VRAI DÉBOGUEUR
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le Match des Titans : console.log() vs Débogueur avec Breakpoints
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Tous les débutants adorent <code className="text-emerald-700 font-mono font-bold bg-slate-100 px-1 py-0.5 rounded">console.log()</code>. Mais pourquoi les développeurs seniors privilégient-ils un débogueur professionnel ?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center font-mono">log</span>
              <span>L&apos;approche console.log() (Ses forces &amp; limites)</span>
            </h3>
            <ul className="text-xs sm:text-sm text-slate-700 font-medium space-y-2 list-disc list-inside">
              <li><strong>Force :</strong> Immédiat, simple, ne nécessite aucune configuration.</li>
              <li><strong>Inconvénient 1 :</strong> Modifie le code source (risque d&apos;oublier des logs vulgaires en prod !).</li>
              <li><strong>Inconvénient 2 :</strong> Nécessite de relancer l&apos;application à chaque fois qu&apos;on veut voir une nouvelle variable.</li>
              <li><strong>Inconvénient 3 :</strong> Inonde le terminal de milliers de lignes illisibles.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-emerald-300 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-emerald-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center font-mono">●</span>
              <span>Le Débogueur avec Breakpoints (Le super-pouvoir pro)</span>
            </h3>
            <ul className="text-xs sm:text-sm text-slate-700 font-medium space-y-2 list-disc list-inside">
              <li><strong>Zéro modification du code :</strong> Il suffit de cliquer sur le numéro de ligne pour poser un point rouge.</li>
              <li><strong>Inspection omnisciente :</strong> Vous voyez l&apos;intégralité des variables en mémoire en même temps en survolant la souris.</li>
              <li><strong>Évaluation en direct :</strong> Vous pouvez taper du code dans la console de débogage pour tester des calculs à chaud.</li>
              <li><strong>Contrôle du temps :</strong> Vous pouvez avancer ligne par ligne ou remonter la chaîne des fonctions (Call Stack).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : LES 5 GRANDS OUTILS PROFESSIONNELS (IMAGES DU COURS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">3</span>
          <h2 className="text-xl font-bold text-slate-950">
            La Boîte à Outils de l&apos;Ingénieur : Tour d&apos;horizon
          </h2>
        </div>

        {/* 3.1 Chrome DevTools */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-900 font-black text-xs">CHROME DEVTOOLS</span>
              <span>1. L&apos;Inspection Frontend en direct</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Navigateur Web</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Intégré directement dans Google Chrome (touche F12), il permet de voir ce que fait le navigateur : modifier le HTML/CSS à chaud, lire les erreurs rouges dans la Console, inspecter les requêtes dans l&apos;onglet Network et placer des breakpoints dans l&apos;onglet Sources :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image1.jpeg"
              alt="Interface de Chrome DevTools avec panneau Sources et Breakpoints"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 2.1.1 — Chrome DevTools : explorateur de fichiers (1), éditeur avec breakpoint (2) et volet de contrôle pas à pas (3).
            </div>
          </div>
        </div>

        {/* 3.2 VS Code Debugger */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-black text-xs">VS CODE DEBUGGER</span>
              <span>2. L&apos;Examen chirurgical du Backend Node.js</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">IDE &amp; Serveur</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Le débogueur de Visual Studio Code s&apos;attache au processus Node.js pour suspendre le serveur sur une route Express, inspecter la variable <code className="text-blue-700 font-mono">req.body</code> et analyser la pile d&apos;appels (Call Stack) :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image2.jpeg"
              alt="Débogueur de Visual Studio Code avec Call Stack et Variables"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 2.1.2 — Débogueur VS Code : panneau des variables locales, pile d&apos;appels (Call Stack) et boutons de contrôle d&apos;exécution.
            </div>
          </div>
        </div>

        {/* 3.3 Postman */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-600 text-white font-black text-xs">POSTMAN</span>
              <span>3. Le Test d&apos;API autonome sans interface</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Contrats HTTP &amp; JSON</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Permet d&apos;envoyer des requêtes HTTP personnalisées (GET, POST, PUT, DELETE) avec n&apos;importe quel payload JSON pour vérifier immédiatement si l&apos;API fonctionne sans dépendre de l&apos;écran React :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image3.jpeg"
              alt="Interface de test Postman avec requête HTTP et réponse JSON"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 2.1.3 — Postman : envoi d&apos;une requête GET avec en-têtes et analyse du payload JSON retourné avec statut 200 OK.
            </div>
          </div>
        </div>

        {/* 3.4 Logging */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
              <span>4. Le Logging Professionnel (Traces chronologiques)</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Production &amp; Serveur</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            En production, vous ne pouvez pas brancher un écran ou mettre en pause le serveur des clients ! On utilise des bibliothèques de logs structurés comme <strong>Winston</strong> ou <strong>Pino</strong> pour enregistrer des événements horodatés :
          </p>
          <CodeBlock
            language="typescript"
            filename="logger.ts"
            code={`import pino from 'pino';

const logger = pino();

// Enregistrement d'un événement structuré avec contexte
logger.info({ userId: 42, action: 'CHECKOUT_STARTED' }, 'Commande initiée');

// Enregistrement d'une erreur critique avec sa stack trace complète
logger.error({ err, orderId: 991 }, 'Échec de paiement Stripe');`}
          />
        </div>

        {/* 3.5 MySQL Workbench */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-black text-xs">MYSQL WORKBENCH</span>
              <span>5. L&apos;Inspection directe de la base de données relationnelle</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">SQL &amp; Schéma</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Permet de vérifier directement dans les tables si les données sont bien enregistrées, si les clés étrangères sont respectées, et d&apos;analyser les lenteurs de requêtes avec la commande <code className="text-emerald-700 font-mono font-bold">EXPLAIN</code> :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image4.jpeg"
              alt="MySQL Workbench avec requête SQL SELECT et grille de résultats"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 2.1.4 — MySQL Workbench : exécution d&apos;une requête SQL et affichage des lignes dans la grille de résultats.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : QUEL OUTIL OUVRIR EN PREMIER ? (SIMULATEUR DE DÉCISION)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">4</span>
          <h2 className="text-xl font-bold text-slate-950">
            Guide Décisionnel : Quel outil ouvrir face à une panne ?
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Cliquez sur chaque cas de panne courante pour découvrir quel outil ouvrir en premier sans perdre de temps :
        </p>

        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-white overflow-hidden shadow-xl">
          {/* Header tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-800 divide-x divide-slate-800 bg-slate-950 text-xs font-bold">
            {diagnosticCases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`p-3 text-center transition-colors ${
                  selectedCaseId === c.id
                    ? 'bg-emerald-600/30 text-emerald-300 border-b-2 border-emerald-400 font-black'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {c.id === 'api' && '1. Isoler API vs Front'}
                {c.id === 'crash-backend' && '2. Crash Node.js'}
                {c.id === 'cors' && '3. Blocage CORS'}
                {c.id === 'sql-slow' && '4. Lenteur SQL'}
              </button>
            ))}
          </div>

          {/* Details */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[11px] font-black uppercase text-slate-400 block mb-1">Situation constatée :</span>
              <p className="text-sm font-semibold text-white">{activeCase.symptom}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-bold uppercase">Outil recommandé :</span>
              <span className={`text-xs font-black uppercase px-3 py-1 rounded-full border ${activeCase.badgeColor}`}>
                {activeCase.recommendedTool} ({activeCase.toolBadge})
              </span>
            </div>

            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl space-y-1">
              <strong className="text-emerald-400 text-xs uppercase block">Pourquoi cet outil en premier :</strong>
              <p className="text-xs sm:text-sm text-emerald-200 font-medium">{activeCase.explanation}</p>
            </div>

            <div className="p-4 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-1">
              <strong className="text-rose-400 text-xs uppercase block">Pourquoi les autres outils sont inadaptés ici :</strong>
              <p className="text-xs sm:text-sm text-rose-200 font-medium">{activeCase.whyNotOthers}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : LES 6 COMMANDES FONDAMENTALES DU DÉBOGUEUR
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">5</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le Lexique des 6 commandes fondamentales d&apos;un débogueur
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <span className="font-mono font-bold text-emerald-700">Breakpoint (Point d&apos;arrêt)</span>
            <p className="text-slate-600 text-xs font-medium">Suspendre l&apos;exécution à une ligne de code précise avant son évaluation.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <span className="font-mono font-bold text-emerald-700">Step Over (F10)</span>
            <p className="text-slate-600 text-xs font-medium">Avancer d&apos;une ligne dans le fichier sans entrer dans les détails de la fonction appelée.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <span className="font-mono font-bold text-emerald-700">Step Into (F11)</span>
            <p className="text-slate-600 text-xs font-medium">Plonger à l&apos;intérieur d&apos;une fonction appelée pour suivre sa première ligne.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <span className="font-mono font-bold text-emerald-700">Step Out (Shift+F11)</span>
            <p className="text-slate-600 text-xs font-medium">Finir la fonction actuelle d&apos;un coup et remonter à la fonction parente.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <span className="font-mono font-bold text-emerald-700">Watch (Espion)</span>
            <p className="text-slate-600 text-xs font-medium">Surveiller en continu la valeur d&apos;une expression ou d&apos;une variable complexe.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <span className="font-mono font-bold text-emerald-700">Call Stack (Pile d&apos;appels)</span>
            <p className="text-slate-600 text-xs font-medium">Examiner la chaîne hiérarchique des fonctions ayant mené à l&apos;instruction active.</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 : SYNTHÈSE DES POINTS CLÉS
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">6</span>
          <h2 className="text-xl font-bold text-slate-950">
            Synthèse du Chapitre 2.1
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-lime-500/10 to-teal-500/10 border-2 border-emerald-300 space-y-2 text-sm sm:text-base font-medium text-slate-900">
          <p>• <strong>Les outils ne sont pas interchangeables :</strong> Postman teste les API brutes, DevTools inspecte le navigateur, VS Code scrute la mémoire Node.js, et Workbench ausculte SQL.</p>
          <p>• <strong>CORS ne se teste pas dans Postman :</strong> La politique CORS n&apos;existe que dans les navigateurs web ; seul l&apos;onglet Network de DevTools permet de la voir.</p>
          <p>• <strong>Privilégier les Breakpoints à console.log :</strong> Moins intrusifs, plus puissants et sans risque de polluer le code source en production.</p>
          <p>• <strong>En production :</strong> Utiliser des bibliothèques de logs structurés (Winston, Pino) pour conserver des traces horodatées exploitables.</p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 : QUIZ D'AUTO-ÉVALUATION
         ========================================================================= */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <QuickQuiz
          title="Auto-évaluation — La Boîte à Outils de Débogage"
          questions={[
            {
              id: 1,
              question: "Quel outil permet d'inspecter les requêtes HTTP réelles (URL, headers, payload, statut) envoyées par une application Web dans le navigateur ?",
              options: [
                "MySQL Workbench",
                "Chrome DevTools — Panneau Network",
                "Windows Explorer",
                "La calculatrice Windows",
              ],
              correctIndex: 1,
              explanation: "Exact ! Le panneau Network de Chrome DevTools consigne l'ensemble des échanges HTTP/HTTPS entre le navigateur et les serveurs avec leurs statuts (200, 404, 500) et temps de réponse.",
            },
            {
              id: 2,
              question: "Quel outil permet de suspendre l'exécution d'une fonction Node.js sur le serveur et d'examiner ses variables en direct ?",
              options: [
                "Postman",
                "MySQL Workbench",
                "VS Code Debugger (avec Breakpoints)",
                "Google Chrome",
              ],
              correctIndex: 2,
              explanation: "Parfait ! Le débogueur intégré de Visual Studio Code s'attache au processus Node.js pour poser des points d'arrêt, inspecter les variables locales et avancer pas à pas.",
            },
            {
              id: 3,
              question: "Quel outil permet de tester une API REST indépendamment de l'interface graphique frontend ?",
              options: [
                "Postman",
                "Chrome Elements",
                "CSS Grid",
                "Photoshop",
              ],
              correctIndex: 0,
              explanation: "Bravo ! Postman permet d'envoyer des requêtes HTTP brutes directement au serveur pour vérifier son bon fonctionnement sans aucune dépendance envers l'interface React.",
            },
            {
              id: 4,
              question: "Pourquoi est-il impossible de reproduire une erreur de blocage CORS dans Postman ?",
              options: [
                "Parce que Postman est trop lent.",
                "Parce que la politique CORS est une sécurité imposée exclusivement par les navigateurs web, que Postman n'applique pas.",
                "Parce que Postman ne supporte pas JavaScript.",
                "Parce que CORS ne concerne que les bases de données SQL.",
              ],
              correctIndex: 1,
              explanation: "Excellente réponse ! CORS (Cross-Origin Resource Sharing) est un mécanisme de sécurité strict du navigateur. Postman n'étant pas un navigateur, la requête passera sans blocage !",
            },
            {
              id: 5,
              question: "Une erreur SQL indique qu'une colonne est inconnue dans la table. Quel outil est le plus adapté pour vérifier la structure réelle de la table ?",
              options: [
                "Postman",
                "Chrome DevTools",
                "MySQL Workbench",
                "React DevTools",
              ],
              correctIndex: 2,
              explanation: "Tout à fait ! MySQL Workbench permet d'inspecter directement le schéma relationnel, les colonnes réelles, leurs types et d'exécuter des requêtes de diagnostic directement sur la base.",
            },
          ]}
        />
      </section>
    </div>
  );
};
