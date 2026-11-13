'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { StepDebuggerSandbox } from '@/components/interactive/StepDebuggerSandbox';
import { Icon } from '@/components/common/Icon';

type LaunchConfigPresetKey = 'express_standard' | 'attach_docker' | 'typescript_tsnode' | 'inspect_brk_init';

interface LaunchConfigPreset {
  label: string;
  category: string;
  badgeColor: string;
  description: string;
  jsonContent: string;
  keyDirectives: { directive: string; role: string }[];
}

const LAUNCH_PRESETS: Record<LaunchConfigPresetKey, LaunchConfigPreset> = {
  express_standard: {
    label: 'Serveur Express (Launch)',
    category: 'Node.js JavaScript',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Configuration idéale pour lancer et déboguer votre serveur Express en appuyant simplement sur F5.',
    jsonContent: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Lancer API Express",
      "program": "\${workspaceFolder}/server.js",
      "restart": true,
      "skipFiles": [
        "<node_internals>/**",
        "**/node_modules/**"
      ],
      "console": "integratedTerminal"
    }
  ]
}`,
    keyDirectives: [
      { directive: '"request": "launch"', role: 'VS Code démarre lui-même le processus Node.js et attache le débogueur instantanément.' },
      { directive: '"skipFiles": ["<node_internals>/**"]', role: 'Évite d\'entrer dans le code interne de Node.js (events.js, http.js) lors de Step Into (F11).' },
      { directive: '"restart": true', role: 'Redémarre automatiquement la session si nodemon ou tsx relance le serveur lors d\'un fichier modifié.' }
    ]
  },
  attach_docker: {
    label: 'Processus Externe / Docker (Attach)',
    category: 'Docker & Conteneurs',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Attache le débogueur VS Code à un processus Node.js déjà démarré dans un conteneur Docker ou un terminal externe.',
    jsonContent: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attacher à Node (Port 9229)",
      "port": 9229,
      "address": "localhost",
      "localRoot": "\${workspaceFolder}",
      "remoteRoot": "/usr/src/app",
      "restart": true,
      "skipFiles": [
        "<node_internals>/**"
      ]
    }
  ]
}`,
    keyDirectives: [
      { directive: '"request": "attach"', role: 'Se connecte au socket CDP WebSocket déjà ouvert sur le port 9229 sans redémarrer le serveur.' },
      { directive: '"localRoot" & "remoteRoot"', role: 'Mappe les chemins de vos fichiers locaux sur les chemins absolus du conteneur Linux Docker.' }
    ]
  },
  typescript_tsnode: {
    label: 'Projet TypeScript (Source Maps)',
    category: 'TypeScript & ts-node',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Pose des points d\'arrêt directement dans vos fichiers .ts tout en déboguant le JavaScript exécuté.',
    jsonContent: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TypeScript API",
      "runtimeExecutable": "npx",
      "runtimeArgs": ["ts-node", "--transpile-only"],
      "program": "\${workspaceFolder}/src/index.ts",
      "sourceMaps": true,
      "outFiles": ["\${workspaceFolder}/dist/**/*.js"],
      "skipFiles": [
        "<node_internals>/**",
        "**/node_modules/**"
      ]
    }
  ]
}`,
    keyDirectives: [
      { directive: '"sourceMaps": true', role: 'Lit les fichiers .map pour corréler la ligne exécutée en JavaScript avec votre code TypeScript original.' },
      { directive: '"runtimeArgs": ["ts-node"]', role: 'Permet d\'exécuter directement les fichiers .ts sans étape préalable manuelle de compilation tsc.' }
    ]
  },
  inspect_brk_init: {
    label: 'Suspension au Démarrage (--inspect-brk)',
    category: 'Diagnostic Boot',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Fige le moteur V8 à la ligne 1 avant même le chargement des variables d\'environnement ou de la base de données.',
    jsonContent: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Initialisation Boot",
      "program": "\${workspaceFolder}/app.js",
      "stopOnEntry": true,
      "skipFiles": [
        "<node_internals>/**"
      ]
    }
  ]
}`,
    keyDirectives: [
      { directive: '"stopOnEntry": true', role: 'Équivalent graphique de --inspect-brk : fige le moteur avant d\'évaluer la moindre instruction de démarrage.' },
      { directive: 'Idéal pour :', role: 'Déboguer les erreurs de parsing .env, les échecs de connexion SQL précoces ou les crashs d\'imports cycliques.' }
    ]
  }
};

export const Chapitre9Content: React.FC = () => {
  const [activePresetKey, setActivePresetKey] = useState<LaunchConfigPresetKey>('express_standard');
  const activePreset = LAUNCH_PRESETS[activePresetKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 9 — Débogage Node.js avec l&apos;inspecteur V8 intégré et VS Code
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Comment le protocole <em>Chrome DevTools Protocol</em> (CDP) sur le port WebSocket <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">9229</code> permet-il de déboguer un serveur backend aussi facilement qu&apos;une page web ? Quelle est la différence cruciale entre <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">--inspect</code> et <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">--inspect-brk</code> ? Comment configurer <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">.vscode/launch.json</code> pour poser des points d&apos;arrêt dans du TypeScript et ignorer les entrailles internes de Node.js ? Devenez maître du débogage serveur.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre l&apos;architecture du protocole CDP de V8 et le rôle du port WebSocket 9229.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser les drapeaux CLI <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">--inspect</code> (en vol) et <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">--inspect-brk</code> (gel au démarrage).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Générer et régler des configurations professionnelles dans <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">launch.json</code> (Launch vs Attach, Docker, Source Maps).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Blackboxer les fichiers système avec <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">skipFiles</code> et déboguer une requête Express déclenchée depuis Postman.</span>
          </div>
        </div>
      </section>

      {/* 2. Architecture de l'inspecteur V8 */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. L&apos;architecture de l&apos;inspecteur V8 et le protocole CDP (Port 9229)
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Sous le capot, Node.js embarque le même moteur d&apos;exécution que Google Chrome : <strong>le moteur V8</strong>. Lorsque vous activez l&apos;inspecteur, Node.js ouvre un serveur WebSocket local communiquant au format JSON-RPC via le standard <strong>Chrome DevTools Protocol (CDP)</strong> sur le port par défaut <code className="font-mono text-xs font-bold text-emerald-800">9229</code>.
        </p>

        {/* Comparatif --inspect vs --inspect-brk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-emerald-400 uppercase text-xs">node --inspect</span>
              <span className="text-[11px] text-emerald-300 font-bold">Démarrage immédiat</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">
              L&apos;application démarre et écoute sur son port HTTP (ex: 3000). Le débogueur peut s&apos;y connecter à tout moment sans interrompre le trafic.
            </p>
            <pre className="text-emerald-300 overflow-x-auto">{`$ node --inspect app.js
Debugger listening on ws://127.0.0.1:9229/abc-123
Serveur Express prêt sur http://localhost:3000`}</pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-amber-400 uppercase text-xs">node --inspect-brk</span>
              <span className="text-[11px] text-amber-300 font-bold">Gel à la ligne 1</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">
              Fige l&apos;exécution à la toute première ligne de code avant même de charger les modules. Indispensable pour déboguer les crashs au démarrage.
            </p>
            <pre className="text-amber-300 overflow-x-auto">{`$ node --inspect-brk app.js
Debugger listening on ws://127.0.0.1:9229/abc-123
(En attente de connexion du client de débogage...)`}</pre>
          </div>
        </div>

        {/* Alerte de sécurité sur le port 9229 */}
        <Callout type="danger" title="Alerte Sécurité Majeure : Ne liez JAMAIS 0.0.0.0:9229 en production !">
          <p className="text-sm leading-relaxed">
            Le protocole Chrome DevTools Protocol n&apos;a <strong>aucun mécanisme d&apos;authentification par mot de passe</strong>. Quiconque peut se connecter à votre port WebSocket 9229 peut exécuter du code arbitraire avec les droits du processus Node.js via la commande <code className="font-mono font-bold">Runtime.evaluate</code>. Laissez toujours l&apos;inspecteur lié à <code className="font-mono font-bold">127.0.0.1</code> et utilisez un tunnel SSH (<code className="font-mono">ssh -L 9229:localhost:9229 user@serveur</code>) pour le débogage à distance.
          </p>
        </Callout>
      </section>

      {/* 3. Les Breakpoints et Capture d'écran réelle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Session active de débogage dans Visual Studio Code
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Lorsqu&apos;un point d&apos;arrêt (Breakpoint) est atteint sous Visual Studio Code, le fil d&apos;exécution se fige en surbrillance jaune. Vous pouvez inspecter la totalité des registres de mémoire dans le volet latéral : variables locales, closures, pile d&apos;appels (Call Stack) et expressions espionnes (Watch) :
        </p>

        {/* Real Extracted Image from Word Document */}
        <div className="rounded-2xl border-2 border-slate-800 overflow-hidden shadow-2xl my-6 bg-slate-950">
          <Image
            src="/images/cours/debugging/module-3/image1.jpeg"
            alt="Inspecteur de débogage Node.js dans Visual Studio Code - Breakpoints et Call Stack"
            width={1000}
            height={680}
            className="w-full h-auto object-contain bg-slate-950"
            priority
          />
          <div className="bg-slate-900 px-4 py-2.5 text-xs text-slate-400 border-t border-slate-800 text-center font-mono flex items-center justify-center gap-2">
            <Icon name="search" className="w-4 h-4 text-emerald-400" />
            <span>Figure 3.1 : Session de débogage Node.js sous VS Code — Breakpoint actif (ligne 13), variables locales et call stack.</span>
          </div>
        </div>

        {/* Raccourcis de navigation indispensables */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="font-bold text-emerald-700 block text-sm">F5</span>
            <span className="text-slate-600 font-sans">Continuer (Continue)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="font-bold text-sky-700 block text-sm">F10</span>
            <span className="text-slate-600 font-sans">Pas à pas principal (Step Over)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="font-bold text-purple-700 block text-sm">F11</span>
            <span className="text-slate-600 font-sans">Entrer dans fonction (Step Into)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="font-bold text-amber-700 block text-sm">Shift + F11</span>
            <span className="text-slate-600 font-sans">Sortir de fonction (Step Out)</span>
          </div>
        </div>
      </section>

      {/* 4. Simulateur Interactif : Générateur de Configuration launch.json */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5 text-lime-700" />
              <span>4. Laboratoire Interactif : Générateur de Configurations .vscode/launch.json</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sélectionnez votre type d&apos;environnement backend pour générer une recette de débogage professionnelle prête à l&apos;emploi.
            </p>
          </div>
        </div>

        {/* Boutons sélecteurs de configurations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {(Object.keys(LAUNCH_PRESETS) as LaunchConfigPresetKey[]).map((key) => {
            const preset = LAUNCH_PRESETS[key];
            const isSelected = activePresetKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActivePresetKey(key)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-lime-300 border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border inline-block mb-1 ${preset.badgeColor}`}>
                  {preset.category}
                </span>
                <div className="text-xs font-mono font-bold truncate">{preset.label}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'inspection en direct */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Recette active :</span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activePreset.label}
              </h3>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${activePreset.badgeColor}`}>
              {activePreset.category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-medium font-sans">
            {activePreset.description}
          </p>

          {/* Grille JSON vs Rôle des directives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Fichier .vscode/launch.json généré :
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-lime-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {activePreset.jsonContent}
              </pre>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Rôle des directives clés :
              </span>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-sans text-xs">
                {activePreset.keyDirectives.map((item, idx) => (
                  <div key={idx} className="space-y-0.5 border-b border-slate-800/80 pb-2 last:border-0 last:pb-0">
                    <code className="text-amber-300 font-mono text-xs font-bold block">{item.directive}</code>
                    <p className="text-slate-300 text-xs leading-relaxed">{item.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bac à Sable Débogueur Pas-à-Pas */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="code" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            5. Bac à Sable Débogueur : Pratiquez les commandes F10 / F11 / Shift+F11
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Exécutez ce simulateur interactif pour observer comment le pointeur de ligne jaune avance, inspecter les variables du scope local et vérifier l&apos;évolution de la Call Stack :
        </p>
        <StepDebuggerSandbox />
      </section>

      {/* 6. Travaux Pratiques : Session d'investigation en direct Postman + VS Code */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            6. Travaux Pratiques — Investigation d&apos;un bogue JWT avec Postman et VS Code
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Dans cette mise en situation d&apos;ingénierie, une route Express sécurisée <code className="font-mono text-xs font-bold">POST /api/admin/promote</code> renvoie mystérieusement une erreur <code className="font-mono text-xs font-bold">403 Forbidden</code> alors que le client envoie un jeton JWT apparemment valide.
        </p>

        {/* Déroulement de la session de débogage */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Étape 1 : Point d&apos;arrêt</span>
            <p className="text-xs text-slate-700">Ouvrez le fichier du middleware d&apos;authentification et cliquez dans la marge à gauche de la ligne <code className="font-mono">jwt.verify(...)</code> pour poser un point rouge.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Étape 2 : Lancer F5</span>
            <p className="text-xs text-slate-700">Appuyez sur <code className="font-mono font-bold">F5</code> dans VS Code. La barre d&apos;état passe à l&apos;orange : le débogueur écoute sur le port WebSocket 9229.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Étape 3 : Tir Postman</span>
            <p className="text-xs text-slate-700">Envoyez la requête HTTP depuis Postman avec le header <code className="font-mono">Authorization: Bearer &lt;token&gt;</code>. Postman reste en attente de réponse.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Étape 4 : Inspection REPL</span>
            <p className="text-xs text-slate-700">VS Code passe au premier plan, ligne surlignée en jaune ! Tapez <code className="font-mono">decodedPayload</code> dans le <em>Debug Console REPL</em> pour inspecter les claims.</p>
          </div>
        </div>

        {/* Code source du bogue résolu */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Le bogue identifié lors de l&apos;arrêt et sa correction défensive</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="auth-middleware-debugged.ts"
            code={`import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserJwtClaims {
  userId: string;
  role: string; // En BDD : "ADMIN", mais l'ancien token portait "admin" en minuscules !
}

export function verifyAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Jeton manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserJwtClaims;

    // 💥 BOGUE IDENTIFIÉ DANS LA CONSOLE DE DÉBOGAGE :
    // decoded.role valait "admin" (minuscule), mais la comparaison testait === "ADMIN" !
    // console.log(decoded.role === "ADMIN") -> false !

    // ✅ CORRECTION SÉCURISÉE ET INSENSIBLE À LA CASSE :
    if (decoded.role?.toUpperCase() !== "ADMIN") {
      return res.status(403).json({ message: "Privilèges administrateur requis" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Jeton invalide ou expiré" });
  }
}`}
          />
        </div>
      </section>

      {/* 7. Synthèse : La Check-list du Débogage Node.js Pro */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Synthèse : Les 4 Règles d&apos;Or du Débogage Node.js
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : Toujours blackboxer avec skipFiles</span>
            <p className="text-xs text-slate-700">Indiquez <code className="font-mono font-bold">&quot;&lt;node_internals&gt;/**&quot;</code> et <code className="font-mono font-bold">&quot;**/node_modules/**&quot;</code> dans votre <code className="font-mono">launch.json</code> pour ne jamais être dérouté dans le code natif lors de Step Into (F11).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : --inspect-brk pour les crashs au boot</span>
            <p className="text-xs text-slate-700">Si votre serveur Node.js plante instantanément au démarrage avant que vous ayez pu attacher un débogueur, lancez-le avec <code className="font-mono font-bold">--inspect-brk</code> pour le figer à la ligne 1.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : Source Maps pour TypeScript</span>
            <p className="text-xs text-slate-700">En TypeScript, activez <code className="font-mono font-bold">&quot;sourceMap&quot;: true</code> dans votre <code className="font-mono">tsconfig.json</code> et configurez <code className="font-mono">sourceMaps: true</code> dans VS Code pour poser des breakpoints dans les fichiers .ts.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : Isoler le port 9229</span>
            <p className="text-xs text-slate-700">Ne liez jamais l&apos;inspecteur à <code className="font-mono">0.0.0.0</code> sur un serveur public. Utilisez toujours un tunnel SSH chiffré pour vos sessions distantes.</p>
          </div>
        </div>
      </section>

      {/* 8. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          8. Quiz de validation — Chapitre 3.9
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel protocole et quel port par défaut sont utilisés par l'inspecteur V8 de Node.js ?",
              options: [
                "Protocole HTTP REST sur le port 8080",
                "Chrome DevTools Protocol (CDP) via WebSocket sur le port 9229",
                "Protocole FTP sur le port 21",
                "Protocole gRPC sur le port 50051"
              ],
              correctIndex: 1,
              explanation: "Node.js expose l'inspecteur V8 via le Chrome DevTools Protocol (CDP) en WebSocket sur le port 9229, permettant aux clients comme VS Code ou Chrome de communiquer en JSON-RPC."
            },
            {
              id: 2,
              question: "Quelle est la différence fondamentale entre 'node --inspect' et 'node --inspect-brk' ?",
              options: [
                "--inspect-brk est réservé à TypeScript",
                "--inspect-brk suspend l'exécution du code à la toute première ligne avant d'évaluer le script, tandis que --inspect lance le programme immédiatement",
                "--inspect désactive la gestion des erreurs",
                "--inspect-brk supprime les logs console"
              ],
              correctIndex: 1,
              explanation: "--inspect-brk met le moteur V8 en pause à la ligne 1, ce qui est idéal pour déboguer les erreurs de configuration ou de chargement de modules survenant à l'initialisation."
            },
            {
              id: 3,
              question: "À quoi sert la directive 'skipFiles: [\"<node_internals>/**\"]' dans launch.json ?",
              options: [
                "À empêcher l'exécution des tests unitaires",
                "À empêcher la commande Step Into (F11) de rentrer dans les fichiers internes natifs de Node.js (events, http, stream)",
                "À masquer les erreurs de compilation",
                "À supprimer le dossier node_modules"
              ],
              correctIndex: 1,
              explanation: "skipFiles indique au débogueur d'ignorer les fichiers système internes du runtime Node.js, garantissant que vos pas-à-pas restent concentrés sur votre code applicatif."
            },
            {
              id: 4,
              question: "Quelle configuration permet de déboguer directement du code TypeScript avec des points d'arrêt posés dans les fichiers .ts ?",
              options: [
                "Désactiver le compilateur tsc",
                "Activer sourceMap: true dans tsconfig.json et faire correspondre les sourceMaps dans launch.json",
                "Renommer les fichiers en .js",
                "Utiliser la commande node --ts app.ts"
              ],
              correctIndex: 1,
              explanation: "Les Source Maps établissent une table de correspondance ligne par ligne entre le JavaScript exécuté et le TypeScript source, permettant à VS Code d'aligner les points d'arrêt."
            },
            {
              id: 5,
              question: "Pourquoi est-il dangereux d'exécuter 'node --inspect=0.0.0.0:9229' sur un serveur en production accessible publiquement ?",
              options: [
                "Parce que cela ralentit la bande passante",
                "Parce que le protocole CDP ne dispose d'aucune authentification et permet à tout attaquant connecté d'exécuter du code arbitraire avec les droits de Node.js",
                "Parce que cela invalide les certificats SSL",
                "Parce que cela vide le cache Redis"
              ],
              correctIndex: 1,
              explanation: "Lier l'inspecteur à 0.0.0.0 ouvre le WebSocket au monde entier sans mot de passe, ouvrant une faille d'exécution de code à distance (RCE) critique."
            },
            {
              id: 6,
              question: "Quelle touche raccourci permet d'exécuter la ligne courante sans entrer dans les sous-fonctions appelées ?",
              options: [
                "Step Over (F10)",
                "Step Into (F11)",
                "Step Out (Shift + F11)",
                "Continue (F5)"
              ],
              correctIndex: 0,
              explanation: "Step Over (F10) évalue l'instruction complète de la ligne courante et suspend l'exécution à la ligne suivante dans le contexte actuel."
            }
          ]}
        />
      </section>
    </div>
  );
};
