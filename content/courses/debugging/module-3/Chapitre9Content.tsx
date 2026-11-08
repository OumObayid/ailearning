'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { StepDebuggerSandbox } from '@/components/interactive/StepDebuggerSandbox';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — Débogage Node.js avec l&apos;inspecteur intégré
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Activer l&apos;inspecteur V8 de Node.js avec --inspect et --inspect-brk.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Régler la configuration de débogage avancée dans .vscode/launch.json.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Naviguer au pas à pas dans une API Express déclenchée depuis Postman.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ignorer les modules natifs internes avec la directive skipFiles.</span>
          </li>
        </ul>
      </section>

      {/* 2. Démarrage de l'inspecteur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Activer l&apos;inspecteur V8 intégré à Node.js
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Node.js implémente en natif le protocole <strong>Chrome DevTools Protocol (CDP)</strong>. Il ouvre un serveur WebSocket dédié sur le port <code className="font-mono font-bold text-emerald-700">9229</code> :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 font-sans uppercase">Mode standard : node --inspect</span>
            <p className="text-slate-400 font-sans text-xs">
              Démarre l&apos;application immédiatement. Le débogueur peut s&apos;y attacher en cours de route.
            </p>
            <pre className="text-emerald-300">{`$ node --inspect app.js
Debugger listening on ws://127.0.0.1:9229/...
Serveur démarré sur le port 3000`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 font-sans uppercase">Mode suspension : node --inspect-brk</span>
            <p className="text-slate-400 font-sans text-xs">
              Suspend l&apos;exécution à la toute première ligne avant d&apos;exécuter le code. Idéal pour les bugs d&apos;initialisation.
            </p>
            <pre className="text-amber-300">{`$ node --inspect-brk app.js
Debugger listening on ws://127.0.0.1:9229/...
(En attente d'attachement du débogueur...)`}</pre>
          </div>
        </div>
      </section>

      {/* 3. Breakpoints et Capture d'écran réelle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les points d&apos;arrêt (Breakpoints) dans VS Code
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Un point d&apos;arrêt ordonne au moteur V8 de figer le thread d&apos;exécution à une instruction précise. Lorsque la ligne est atteinte, la ligne active est mise en valeur en jaune et tous les registres de mémoire sont inspectables :
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
      </section>

      {/* 4. Configuration launch.json */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Configuration professionnelle du fichier .vscode/launch.json
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Pour lancer vos sessions en un clic avec la touche <code className="font-mono font-bold text-emerald-700">F5</code> sans taper de commandes dans le terminal, configurez votre projet comme suit :
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-emerald-400 font-bold">{`// .vscode/launch.json :`}</div>
          <div>{`{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Serveur Express",
      "program": "\${workspaceFolder}/app.js",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}`}</div>
        </div>

        <Callout type="tip">
          La directive <code className="font-mono font-bold">&quot;&lt;node_internals&gt;/**&quot;</code> dans <code className="font-mono font-bold">skipFiles</code> est fondamentale : elle empêche le bouton <strong>Step Into (F11)</strong> de vous perdre dans les fichiers internes de Node.js (<code className="font-mono">node:events</code>, <code className="font-mono">node:http</code>).
        </Callout>
      </section>

      {/* 5. Bac à Sable Débogueur Pas à Pas */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="code" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            Bac à Sable Débogueur : Pratiquez les touches de Step (F10 / F11 / Shift+F11)
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Entraînez-vous à inspecter les variables locales, poser des points d&apos;arrêt et tester l&apos;empilement de la Call Stack :
        </p>
        <StepDebuggerSandbox />
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.9
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle commande permet de lancer un script Node.js en suspendant son exécution à la première ligne ?",
              options: [
                "node --debug app.js",
                "node --inspect-brk app.js",
                "node --inspect app.js",
                "node --pause app.js"
              ],
              correctIndex: 1,
              explanation: "--inspect-brk ordonne à Node.js de démarrer le protocole CDP et de faire une pause immédiate avant d'exécuter la moindre instruction."
            },
            {
              id: 2,
              question: "À quoi sert la directive 'skipFiles' dans la configuration launch.json de VS Code ?",
              options: [
                "À supprimer les fichiers temporaires",
                "À éviter d'entrer dans les fichiers internes de Node.js lors de l'utilisation de Step Into (F11)",
                "À masquer les erreurs dans la console",
                "À ignorer les fichiers CSS"
              ],
              correctIndex: 1,
              explanation: "skipFiles empêche le débogueur d'ouvrir les fichiers natifs du runtime Node.js, vous maintenant dans votre code applicatif."
            },
            {
              id: 3,
              question: "Quelle touche raccourci standard permet d'exécuter la ligne courante sans entrer dans les sous-fonctions appelées ?",
              options: [
                "Step Over (F10)",
                "Step Into (F11)",
                "Continue (F5)",
                "Step Out (Shift + F11)"
              ],
              correctIndex: 0,
              explanation: "Step Over (F10) évalue l'instruction complète et suspend le programme à la ligne suivante dans le contexte actuel."
            }
          ]}
        />
      </section>
    </div>
  );
};
