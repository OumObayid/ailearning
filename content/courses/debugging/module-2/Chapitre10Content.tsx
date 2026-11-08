'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Utilisation du débogueur de Visual Studio Code
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
            <span>Maîtriser la vue Run and Debug (Ctrl + Shift + D) de VS Code.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Créer et configurer des profils de débogage dans .vscode/launch.json.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déboguer une API Express en interceptant des requêtes POST envoyées par Postman.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Attacher le débogueur à un processus Node.js externe via le port 9229.</span>
          </li>
        </ul>
      </section>

      {/* 2. Vue Run and Debug */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. La vue Run and Debug dans VS Code
        </h2>
        <p className="text-base text-slate-800 font-medium">
          VS Code intègre un débogueur JavaScript complet qui se connecte au runtime Node.js via le protocole Chrome DevTools.
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image40.jpeg"
            alt="Interface Run and Debug de VS Code avec volets Variables, Watch, Call Stack et Breakpoints"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.10.1 — Interface de débogage VS Code : variables locales, expressions surveillées, Call Stack et points d&apos;arrêt actifs.
          </div>
        </div>
      </section>

      {/* 3. Barre d'outils du débogueur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La barre d&apos;outils flottante de VS Code
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dès qu&apos;une session de débogage est active, VS Code affiche une barre de commandes flottante au sommet de l&apos;éditeur :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image41.jpeg"
            alt="Barre d'outils du débogueur VS Code : Continue, Step Over, Step Into, Step Out, Restart, Stop"
            width={1200}
            height={400}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.10.2 — Barre de commandes flottante : Continue (F5), Step Over (F10), Step Into (F11), Step Out (Shift+F11), Restart (Ctrl+Shift+F5), Stop (Shift+F5).
          </div>
        </div>
      </section>

      {/* 4. Configuration launch.json */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Configuration professionnelle du fichier <code className="font-mono text-emerald-700">launch.json</code>
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dans un projet d&apos;entreprise avec serveur Express, TypeScript ou fichiers d&apos;environnement <code className="font-mono text-emerald-700">.env</code>, le fichier <code className="font-mono text-emerald-700">.vscode/launch.json</code> centralise la configuration de lancement :
        </p>

        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
          <div className="text-emerald-400 font-bold"># Configuration type pour API Express backend :</div>
          <pre className="text-slate-300">{`{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Déboguer API Express",
      "program": "\${workspaceFolder}/src/server.js",
      "envFile": "\${workspaceFolder}/.env",
      "skipFiles": [
        "<node_internals>/**"
      ]
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Attacher à Node (port 9229)",
      "port": 9229,
      "restart": true
    }
  ]
}`}</pre>
        </div>

        <Callout type="warning" title="Sécurité et confidentialité">
          Le fichier <code className="font-mono">.vscode/launch.json</code> est généralement partagé dans le dépôt Git d&apos;équipe. N&apos;y inscrivez <strong>JAMAIS</strong> de vraies clés d&apos;API ou de mots de passe en dur ! Utilisez la propriété <code className="font-mono">&quot;envFile&quot;: &quot;&#36;&#123;workspaceFolder&#125;/.env&quot;</code> et assurez-vous que <code className="font-mono">.env</code> figure dans votre fichier <code className="font-mono">.gitignore</code>.
        </Callout>
      </section>

      {/* 5. Attachement à un processus */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Attachement à un processus en cours d&apos;exécution (Attach Process)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsque votre serveur est déjà démarré dans un terminal avec <code className="font-mono text-emerald-700">node --inspect</code> ou via un container Docker :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image42.jpeg"
            alt="Terminal VS Code avec notification Debugger attached"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.10.3 — Terminal intégré VS Code confirmant : &quot;Debugger attached&quot;.
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.10
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel raccourci clavier ouvre la vue Run and Debug dans Visual Studio Code ?",
              options: [
                "Ctrl + Shift + P",
                "Ctrl + Shift + D",
                "Ctrl + Alt + D",
                "Ctrl + F"
              ],
              correctIndex: 1,
              explanation: "Ctrl + Shift + D (ou Cmd + Shift + D sur Mac) ouvre immédiatement la barre latérale Run and Debug de VS Code."
            },
            {
              id: 2,
              question: "Quelle propriété indique le point d'entrée exécutable dans le fichier launch.json ?",
              options: [
                "program",
                "request",
                "type",
                "version"
              ],
              correctIndex: 0,
              explanation: "La clé 'program' indique le chemin du fichier JavaScript de départ (ex: '${workspaceFolder}/src/server.js')."
            },
            {
              id: 3,
              question: "Quelle est la différence entre les modes 'launch' et 'attach' dans launch.json ?",
              options: [
                "Aucune différence, ce sont des synonymes",
                "'launch' démarre un nouveau processus sous contrôle du débogueur, tandis qu''attach' se connecte à un processus Node.js déjà en cours d'exécution",
                "'attach' est réservé au HTML et 'launch' au CSS",
                "'launch' supprime les breakpoints"
              ],
              correctIndex: 1,
              explanation: "launch démarre le programme à partir de zéro, alors qu'attach se greffe sur un processus actif qui écoute sur le port d'inspection (généralement 9229)."
            },
            {
              id: 4,
              question: "À quoi sert la directive 'skipFiles': ['<node_internals>/**'] ?",
              options: [
                "À supprimer les fichiers de configuration du projet",
                "À empêcher le débogueur d'entrer dans les fichiers du cœur interne de Node.js lors de la navigation pas à pas",
                "À désactiver la gestion des erreurs HTTP",
                "À accélérer le téléchargement des packages npm"
              ],
              correctIndex: 1,
              explanation: "skipFiles indique au débogueur d'ignorer les modules internes de Node.js lors des commandes Step Into pour rester concentré sur votre propre code applicatif."
            }
          ]}
        />
      </section>
    </div>
  );
};
