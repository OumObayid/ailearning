'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type LaunchConfigType = 'standard' | 'nodemon' | 'docker-attach';

export const Chapitre10Content: React.FC = () => {
  const [configType, setConfigType] = useState<LaunchConfigType>('standard');
  const [isSimulatedPaused, setIsSimulatedPaused] = useState<boolean>(true);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Boîte à Outils Fondamentale</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Utilisation du débogueur de Visual Studio Code
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi quitter son éditeur de code pour aller inspecter son backend ailleurs ? Visual Studio Code intègre l&apos;un des débogueurs les plus puissants au monde. Apprenez le secret du terminal magique zéro configuration, la maîtrise du fichier <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">launch.json</code>, et l&apos;interception en direct de requêtes envoyées par Postman.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          <span>1. Objectifs d&apos;apprentissage opérationnels</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-800">
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Le Terminal de débogage JavaScript :</strong>
              <span>Démarrer une session de débogage instantanée sans écrire une seule ligne de configuration JSON.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Profils d&apos;équipe dans launch.json :</strong>
              <span>Configurer les profils <code className="font-mono">launch</code> et <code className="font-mono">attach</code> avec prise en charge de <code className="font-mono">.env</code> et Nodemon.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Attachement à distance (Port 9229) :</strong>
              <span>Connecter VS Code à un container Docker ou un processus Node.js autonome via le protocole V8.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Scénario d&apos;ingénierie Postman + VS Code :</strong>
              <span>Déclencher une requête HTTP depuis Postman et intercepter les données dans la route Express.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pourquoi le débogueur VS Code change la vie */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. L&apos;astuce secrète : Le &quot;JavaScript Debug Terminal&quot; (Zéro config)
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Beaucoup de développeurs débutants abandonnent l&apos;idée de déboguer dans VS Code parce qu&apos;ils sont effrayés à l&apos;idée de créer un fichier de configuration <code className="font-mono text-slate-900">launch.json</code>.
          Pourtant, VS Code propose une solution magique en un clic : le <strong>JavaScript Debug Terminal</strong>.
        </p>

        <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2">
          <div className="font-bold text-emerald-950 text-sm flex items-center gap-2">
            <Icon name="sparkles" className="w-4 h-4 text-emerald-700" />
            <span>Le protocole en 3 clics :</span>
          </div>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-800 font-medium">
            <li>Ouvrez le menu Terminal de VS Code et choisissez <strong>&quot;Create New JavaScript Debug Terminal&quot;</strong>.</li>
            <li>Posez un point d&apos;arrêt d&apos;un clic dans la marge gauche de votre fichier <code className="font-mono text-emerald-800">server.js</code>.</li>
            <li>Dans ce terminal, tapez simplement <code className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-900 font-bold">node server.js</code> ou <code className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-900 font-bold">npm run dev</code>.</li>
          </ol>
          <p className="text-xs text-emerald-950 font-bold pt-1">
            👉 C&apos;est tout ! Dès qu&apos;une requête arrive, VS Code fige l&apos;exécution sur votre ligne, sans avoir touché au moindre fichier de configuration !
          </p>
        </div>
      </section>

      {/* 3. La vue Run and Debug */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. La vue Run and Debug dans VS Code (Ctrl + Shift + D)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Accessible via le raccourci <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 font-mono">Ctrl + Shift + D</kbd> (ou <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 font-mono">Cmd + Shift + D</kbd> sur Mac), le panneau latéral regroupe les 4 piliers du débogage moderne :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image40.jpeg"
            alt="Interface Run and Debug de VS Code avec volets Variables, Watch, Call Stack et Breakpoints"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.10.1 — Interface de débogage VS Code : variables locales (Variables), expressions surveillées (Watch), pile d&apos;appels (Call Stack) et liste des points d&apos;arrêt (Breakpoints).
          </div>
        </div>
      </section>

      {/* 4. Barre d'outils flottante */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. La barre d&apos;outils flottante de VS Code
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dès qu&apos;une session de débogage est active, VS Code affiche une barre de commandes flottante au sommet de l&apos;éditeur :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
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

        {/* Tableau des 6 boutons */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Bouton</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Raccourci</th>
                <th className="p-3.5">Rôle opérationnel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-emerald-700">▶ Continue</td>
                <td className="p-3.5">Reprendre l&apos;exécution</td>
                <td className="p-3.5 font-mono">F5</td>
                <td className="p-3.5 text-xs text-slate-600">Laisse filer le programme jusqu&apos;au prochain breakpoint.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-blue-700">↷ Step Over</td>
                <td className="p-3.5">Passer à la ligne suivante</td>
                <td className="p-3.5 font-mono">F10</td>
                <td className="p-3.5 text-xs text-slate-600">Exécute la ligne en bloc sans entrer dans ses sous-fonctions.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-indigo-700">⤓ Step Into</td>
                <td className="p-3.5">Descendre dans la fonction</td>
                <td className="p-3.5 font-mono">F11</td>
                <td className="p-3.5 text-xs text-slate-600">Plonge à l&apos;intérieur de la fonction appelée pour inspecter son corps.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-amber-700">⤒ Step Out</td>
                <td className="p-3.5">Remonter chez l&apos;appelant</td>
                <td className="p-3.5 font-mono">Shift + F11</td>
                <td className="p-3.5 text-xs text-slate-600">Termine la fonction courante et remonte dans la fonction appelante.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-cyan-700">↻ Restart</td>
                <td className="p-3.5">Redémarrer la session</td>
                <td className="p-3.5 font-mono">Ctrl + Shift + F5</td>
                <td className="p-3.5 text-xs text-slate-600">Relance le processus sans avoir à fermer et rouvrir VS Code.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-rose-700">■ Stop</td>
                <td className="p-3.5">Arrêter le débogage</td>
                <td className="p-3.5 font-mono">Shift + F5</td>
                <td className="p-3.5 text-xs text-slate-600">Tue le processus ou détache le débogueur.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Configuration launch.json */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Configuration professionnelle du fichier <code className="font-mono text-emerald-700">.vscode/launch.json</code>
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dans un projet d&apos;équipe, on configure un fichier partagé <code className="font-mono text-slate-900">.vscode/launch.json</code> pour que tous les développeurs puissent lancer le serveur avec les bonnes variables d&apos;environnement :
        </p>

        {/* CodeBlock launch.json */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-700">Exemple de configuration industrielle :</span>
          <CodeBlock
            language="json"
            code={`{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "🚀 Lancer API Express (avec .env)",
      "program": "\${workspaceFolder}/src/server.js",
      "envFile": "\${workspaceFolder}/.env",
      "restart": true,
      "skipFiles": [
        "<node_internals>/**",
        "\${workspaceFolder}/node_modules/**"
      ]
    },
    {
      "type": "node",
      "request": "attach",
      "name": "🔌 Attacher au container Docker (port 9229)",
      "port": 9229,
      "restart": true
    }
  ]
}`}
          />
        </div>

        <Callout type="warning" title="Sécurité et bonnes pratiques Git">
          <p className="text-sm leading-relaxed">
            Le fichier <code className="font-mono">launch.json</code> est versionné dans Git. N&apos;y écrivez <strong>JAMAIS</strong> de mots de passe de base de données ou de clés Stripe en clair ! 
            Utilisez toujours la propriété <code className="font-mono">&quot;envFile&quot;: &quot;&#36;&#123;workspaceFolder&#125;/.env&quot;</code> pour charger votre fichier local secret, et vérifiez que votre <code className="font-mono">.env</code> figure bien dans votre fichier <code className="font-mono">.gitignore</code>.
          </p>
        </Callout>
      </section>

      {/* 6. Attachement à un processus externe */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          6. Attachement à un processus en cours d&apos;exécution (Attach Process)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsque votre serveur est déjà démarré dans un terminal avec <code className="font-mono text-emerald-700">node --inspect</code> ou via un container Docker :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image42.jpeg"
            alt="Terminal VS Code avec notification Debugger attached"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.10.3 — Terminal intégré VS Code confirmant l&apos;attachement sur le port 9229 : &quot;Debugger attached&quot;.
          </div>
        </div>
      </section>

      {/* 7. Simulateur interactif launch.json Builder */}
      <section className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>Générateur Interactif</span>
          </div>
          <h2 className="text-[22px] font-black text-slate-950 tracking-tight">
            7. Atelier interactif : Générateur de configuration launch.json
          </h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Sélectionnez votre type d&apos;architecture pour observer la structure de configuration recommandée et tester la barre de débogage :
          </p>
        </div>

        {/* Config Mode Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setConfigType('standard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              configType === 'standard'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1. API Node.js / Express Classique (Launch)
          </button>
          <button
            onClick={() => setConfigType('nodemon')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              configType === 'nodemon'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            2. Développement avec Nodemon (Auto-restart)
          </button>
          <button
            onClick={() => setConfigType('docker-attach')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              configType === 'docker-attach'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            3. Container Docker / Processus Externe (Attach)
          </button>
        </div>

        {/* Interactive Workspace */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-6 shadow-sm">
          {/* Simulated Floating Control Bar */}
          <div className="flex flex-wrap items-center justify-between p-3 rounded-2xl bg-slate-900 text-white text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isSimulatedPaused ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
              <span className="font-bold">
                {isSimulatedPaused ? 'VS CODE FIGÉ SUR LE POINT D\'ARRÊT' : 'SERVEUR EN ATTENTE DE REQUÊTE HTTP'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSimulatedPaused(!isSimulatedPaused)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold"
              >
                {isSimulatedPaused ? '▶ F5 (Continue)' : '⏸ Pause'}
              </button>
              <button
                onClick={() => alert('Step Over F10 simulé : avance à la ligne suivante dans Express.')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold"
              >
                ↷ F10 (Step Over)
              </button>
            </div>
          </div>

          {/* JSON Display */}
          <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 space-y-2 border border-slate-800">
            <div className="text-slate-400 border-b border-slate-800 pb-2">
              {'// .vscode/launch.json'}
            </div>
            {configType === 'standard' && (
              <pre className="text-emerald-400">{JSON.stringify(
                {
                  version: '0.2.0',
                  configurations: [
                    {
                      type: 'node',
                      request: 'launch',
                      name: 'Lancer API Express',
                      program: '${workspaceFolder}/src/server.js',
                      envFile: '${workspaceFolder}/.env',
                      skipFiles: ['<node_internals>/**', '${workspaceFolder}/node_modules/**'],
                    },
                  ],
                },
                null,
                2
              )}</pre>
            )}
            {configType === 'nodemon' && (
              <pre className="text-cyan-400">{JSON.stringify(
                {
                  version: '0.2.0',
                  configurations: [
                    {
                      type: 'node',
                      request: 'launch',
                      name: 'API Express avec Nodemon',
                      runtimeExecutable: 'nodemon',
                      program: '${workspaceFolder}/src/server.js',
                      restart: true,
                      console: 'integratedTerminal',
                      skipFiles: ['<node_internals>/**'],
                    },
                  ],
                },
                null,
                2
              )}</pre>
            )}
            {configType === 'docker-attach' && (
              <pre className="text-indigo-400">{JSON.stringify(
                {
                  version: '0.2.0',
                  configurations: [
                    {
                      type: 'node',
                      request: 'attach',
                      name: 'Attacher au container Docker',
                      address: 'localhost',
                      port: 9229,
                      localRoot: '${workspaceFolder}',
                      remoteRoot: '/usr/src/app',
                      restart: true,
                    },
                  ],
                },
                null,
                2
              )}</pre>
            )}
          </div>
        </div>
      </section>

      {/* 8. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>8. Quiz de validation — Chapitre 10</span>
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
              question: "Comment lancer un débogage Node.js instantané dans VS Code sans créer aucun fichier launch.json ?",
              options: [
                "En renommant le fichier en .debug",
                "En ouvrant un 'JavaScript Debug Terminal' dans VS Code et en exécutant 'node server.js'",
                "En redémarrant Windows",
                "Ce n'est pas possible, launch.json est obligatoire"
              ],
              correctIndex: 1,
              explanation: "Le JavaScript Debug Terminal de VS Code active automatiquement l'inspecteur sur tous les scripts Node.js exécutés dedans, sans aucune configuration."
            },
            {
              id: 3,
              question: "Quelle est la différence fondamentale entre les modes 'launch' et 'attach' dans launch.json ?",
              options: [
                "Aucune différence, ce sont des synonymes",
                "'launch' démarre un nouveau processus sous le contrôle du débogueur, alors qu''attach' se connecte à un processus Node.js déjà en cours d'exécution (ex: Docker, port 9229)",
                "'attach' est réservé au code CSS",
                "'launch' supprime les breakpoints"
              ],
              correctIndex: 1,
              explanation: "launch démarre le programme à partir de zéro, tandis qu'attach se greffe sur un processus actif qui écoute sur le port d'inspection (généralement 9229)."
            },
            {
              id: 4,
              question: "À quoi sert la directive 'skipFiles': ['<node_internals>/**'] dans launch.json ?",
              options: [
                "À supprimer les fichiers de configuration du projet",
                "À empêcher le débogueur d'entrer dans les fichiers du cœur interne de Node.js lors de la navigation pas à pas",
                "À désactiver la gestion des erreurs HTTP",
                "À accélérer le téléchargement des packages npm"
              ],
              correctIndex: 1,
              explanation: "skipFiles indique au débogueur d'ignorer les modules internes de Node.js lors des commandes Step Into pour rester concentré sur votre propre code applicatif."
            },
            {
              id: 5,
              question: "Quelle propriété permet de charger automatiquement un fichier de variables d'environnement dans launch.json sans exposer de secrets dans Git ?",
              options: [
                "envFile: '${workspaceFolder}/.env'",
                "secretPassword: '123'",
                "loadAllSecrets: true",
                "gitHidden: true"
              ],
              correctIndex: 0,
              explanation: "envFile permet de pointer vers le fichier .env local (qui est listé dans .gitignore), évitant d'exposer des mots de passe dans le launch.json partagé."
            },
            {
              id: 6,
              question: "Quel raccourci permet de relancer immédiatement (Restart) une session de débogage dans VS Code ?",
              options: [
                "F5",
                "Ctrl + Shift + F5",
                "Shift + F5",
                "F10"
              ],
              correctIndex: 1,
              explanation: "Ctrl + Shift + F5 (ou l'icône de flèche circulaire verte) redémarre instantanément le processus sans couper l'éditeur."
            }
          ]}
        />
      </section>
    </div>
  );
};
