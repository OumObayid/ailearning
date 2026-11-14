'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { useCourseDisplay } from '@/context/CourseDisplayContext';
import { cn } from '@/lib/utils';

export const Chapitre1Content: React.FC = () => {
  const { isFullWidth } = useCourseDisplay();

  // Simulateur interactif de l'anatomie d'un IDE avec Agent IA (démarré sur le composant 1)
  const [activePane, setActivePane] = useState<'editor' | 'tree' | 'chat' | 'terminal' | 'vcs'>('editor');

  const paneDetails = {
    editor: {
      title: "1. L'Éditeur de Code (Workspace)",
      badge: "Cœur de production",
      color: "border-blue-300 bg-blue-50/70 text-blue-950",
      icon: "file-code",
      desc: "Zone d'affichage et d'édition directe des fichiers sources (TypeScript, React, Express). L'agent peut y lire le code ou y appliquer des modifications sous forme de diff.",
      example: "// taskController.ts\nexport const getTasks = async (req: Request, res: Response) => {\n  const tasks = await taskService.findAll();\n  res.json({ success: true, data: tasks });\n};",
      agentRole: "L'agent consulte les fonctions, repère les signatures de type et génère les modifications avec précision sans toucher au code hors périmètre."
    },
    tree: {
      title: "2. L'Explorateur de Fichiers (Project Tree)",
      badge: "Cartographie du projet",
      color: "border-emerald-300 bg-emerald-50/70 text-emerald-950",
      icon: "folder",
      desc: "Visualisation de l'arborescence des dossiers et fichiers du projet. Permet de repérer les frontières entre les composants frontend, l'API backend et les tests.",
      example: "taskflow/\n├── frontend/\n│   ├── src/components/\n│   └── package.json\n├── backend/\n│   ├── src/controllers/\n│   └── package.json\n└── tests/\n    └── api.test.ts",
      agentRole: "L'agent explore la structure du projet pour localiser rapidement les fichiers cibles sans scanner inutilement l'intégralité du disque."
    },
    chat: {
      title: "3. L'Espace de Conversation & Pilotage IA",
      badge: "Centre d'orchestration",
      color: "border-indigo-300 bg-indigo-50/70 text-indigo-950",
      icon: "bot",
      desc: "Interface d'échange direct entre le développeur humain et les agents. Permet d'envoyer les missions, d'ajuster le contexte et de consulter les comptes rendus.",
      example: "Human PM > @Backend Développe la route POST /api/tasks avec validation Zod.\nAgent Backend > Analyse du modèle Task terminée. Fichiers cibles identifiés. Je démarre l'implémentation.",
      agentRole: "Reçoit les directives, pose des questions de clarification et restitue une synthèse claire de ses actions et des tests réalisés."
    },
    terminal: {
      title: "4. Le Terminal Intégré (CLI & Runtime)",
      badge: "Exécution & validation",
      color: "border-purple-300 bg-purple-50/70 text-purple-950",
      icon: "terminal",
      desc: "Ligne de commande intégrée permettant de lancer les compilateurs, démarrer les serveurs de dev, installer les paquets et exécuter les suites de tests.",
      example: "$ npm run test:backend\n ✓ taskController.test.ts (4 tests passés)\n ✓ taskService.test.ts (6 tests passés)\nTests: 10 passés, 10 total",
      agentRole: "L'agent y exécute les commandes autorisées (npm test, build) pour auto-vérifier son code avant de déclarer sa mission terminée."
    },
    vcs: {
      title: "5. Contrôle de Versions & Diagnostics (Git & Linter)",
      badge: "Gouvernance & Sécurité",
      color: "border-amber-300 bg-amber-50/70 text-amber-950",
      icon: "git-branch",
      desc: "Outils de diagnostic TypeScript (erreurs de typage en temps réel) et interface Git (branches isolées, commits, examen des diffs avant intégration).",
      example: "git status\nSur la branche feat/backend-task-api\nFichiers modifiés non indexés :\n  (modifié) backend/src/controllers/taskController.ts\n  (nouveau) backend/src/routes/taskRoutes.ts",
      agentRole: "Permet de vérifier qu'aucune régression de typage n'est introduite et de tracer chaque changement sur une branche dédiée."
    }
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="users" className="w-4 h-4 text-indigo-800" />
            <span>Orchestration Multi-Agents • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 1 — Découvrir les IDE intégrant des agents IA
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Comprendre l&apos;architecture des environnements de développement modernes, identifier les composants clés et découvrir comment les agents IA s&apos;articulent au cœur de votre flux de travail logiciel.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Comprendre le rôle d&apos;un IDE moderne</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Explorer les 5 composants fondamentaux</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Comparer Antigravity, VS Code, Cursor & Windsurf</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : INTRODUCTION & COMPRÉHENSION D'UN IDE
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 1 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Qu&apos;est-ce qu&apos;un IDE et pourquoi évolue-t-il avec l&apos;IA ?</h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Le développement logiciel s&apos;effectue généralement dans un environnement appelé <strong>IDE</strong> (<em>Integrated Development Environment</em>), ou environnement de développement intégré.
        </p>
        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          À l&apos;origine, un simple éditeur de texte permettait de taper du code. Cependant, pour compiler, tester, naviguer entre des centaines de fichiers et surveiller les erreurs, le développeur devait constamment jongler entre plusieurs fenêtres indépendantes. L&apos;IDE est né pour rassembler tous ces outils en un tableau de bord unifié.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-2">
          {/* Carte 1 : Les fonctions classiques d'un IDE */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-slate-200/80 text-slate-700 shrink-0">
                  <Icon name="file-code" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les fonctions classiques d&apos;un IDE
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-200 shrink-0">
                Modèle Traditionnel
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Dans un flux traditionnel, le développeur pilote chaque action manuellement en alternant entre plusieurs panneaux indépendants :
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs font-black shrink-0 mt-0.5">•</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-slate-900 font-bold">Édition & Coloration : </strong>
                  <span>Créer et modifier les fichiers sources avec coloration syntaxique et autocomplétion basique.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs font-black shrink-0 mt-0.5">•</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-slate-900 font-bold">Arborescence : </strong>
                  <span>Naviguer et organiser manuellement les dossiers et fichiers du projet.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs font-black shrink-0 mt-0.5">•</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-slate-900 font-bold">Recherche globale : </strong>
                  <span>Rechercher manuellement des symboles, fonctions et occurrences de variables.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs font-black shrink-0 mt-0.5">•</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-slate-900 font-bold">Terminal & Compilation : </strong>
                  <span>Taper manuellement les commandes de build, de démarrage de serveur et de tests.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs font-black shrink-0 mt-0.5">•</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-slate-900 font-bold">Diagnostics visuels : </strong>
                  <span>Observer les soulignements rouges pour repérer les erreurs de syntaxe et de types.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Carte 2 : La révolution des IDE intégrant des agents IA */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-indigo-200/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                  <Icon name="sparkles" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-indigo-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  La révolution des IDE intégrant des agents IA
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-indigo-700 border border-indigo-200 shrink-0">
                Nouvelle Génération
              </span>
            </div>

            <p className="text-xs sm:text-sm text-indigo-900 font-medium leading-relaxed">
              L&apos;IA ne se contente plus de suggérer la fin d&apos;une ligne : elle devient un équipier autonome capable d&apos;interagir avec tous les composants de l&apos;IDE :
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Dépassement du Copilot : </strong>
                  <span>L&apos;IA passe d&apos;une aide contextuelle mono-ligne à la conduite de missions complètes.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Accès outillé complet : </strong>
                  <span>L&apos;agent peut lire l&apos;arborescence, inspecter les fichiers, rechercher des symboles et éditer le code.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Conception & Planification : </strong>
                  <span>Capacité d&apos;analyser l&apos;architecture globale et d&apos;établir un plan d&apos;action avant de coder.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Édition multi-fichiers : </strong>
                  <span>Synchroniser les modifications entre les routes backend, le frontend et les types partagés.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Auto-vérification en boucle : </strong>
                  <span>Exécuter les tests unitaires et le linter dans le terminal intégré pour corriger ses propres erreurs.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Callout type="info" title="Exemple concret : le projet TaskFlow">
          Dans notre fil rouge <strong>TaskFlow</strong>, un développeur travaillant seul dans un IDE classique doit lui-même basculer entre le code React du frontend, les routes Express du backend, ouvrir un terminal pour lancer Vitest et inspecter Git. Dans un IDE à agents, il peut confier la création de l&apos;API à un <em>Agent Backend</em> pendant qu&apos;un <em>Agent QA</em> prépare les tests unitaires.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 2 : SCHÉMA INTERACTIF - LES COMPOSANTS D'UN IDE À AGENTS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 2 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Les 5 composants fondamentaux d&apos;un environnement à agents</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Pour piloter efficacement des agents logiciels, vous devez appréhender la disposition et le rôle de chaque zone de travail. Cliquez sur les différents panneaux ci-dessous pour inspecter leur fonctionnement et la manière dont les agents IA y interagissent :
        </p>

        {/* Simulateur interactif de poste de travail IDE */}
        <div
          className="@container rounded-3xl border-2 border-slate-300 bg-slate-900 p-4 sm:p-6 shadow-md text-white space-y-5"
          style={{ containerType: 'inline-size' }}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span>
              <span className="h-3 w-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block"></span>
              <span className="ml-2 text-xs font-mono text-slate-400">TaskFlow — Google Antigravity Studio</span>
            </div>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-500/30 font-bold">
              Simulateur d&apos;environnement
            </span>
          </div>

          {/* Boutons sélecteurs de composants — Ordonnés 1 à 5, 1 colonne sur petite largeur, 2 colonnes si sidebar replié ou plein écran */}
          <div
            className={cn(
              "grid grid-cols-1 ide-components-2col gap-2.5 min-w-0 max-w-full",
              isFullWidth && "sm:grid-cols-2"
            )}
          >
            {(['editor', 'tree', 'chat', 'terminal', 'vcs'] as const).map((key) => {
              const item = paneDetails[key];
              const isSelected = activePane === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePane(key)}
                  className={`w-full flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer min-w-0 max-w-full ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-600/35 text-white shadow-md ring-1 ring-indigo-400/50'
                      : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:text-slate-100 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-indigo-500 text-white shadow-xs' : 'bg-slate-900 text-slate-400'}`}>
                      <Icon name={item.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-white whitespace-normal break-words leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate hidden sm:block">
                        {item.badge}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full border shrink-0 ${
                    isSelected ? 'bg-indigo-500/40 text-indigo-200 border-indigo-400' : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}>
                    {isSelected ? 'Actif' : 'Sélectionner'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panneau de détails dynamique */}
          <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Icon name={paneDetails[activePane].icon} className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">{paneDetails[activePane].title}</h3>
              </div>
              <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                {paneDetails[activePane].badge}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              {paneDetails[activePane].desc}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Exemple concret d&apos;affichage :</span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                {paneDetails[activePane].example}
              </pre>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs sm:text-sm text-indigo-200 flex items-start gap-2.5">
              <Icon name="bot" className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Rôle de l&apos;agent IA dans cette zone :</strong> {paneDetails[activePane].agentRole}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : PANORAMA COMPARATIF DES ENVIRONNEMENTS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 3 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Panorama comparatif : Antigravity, VS Code, Cursor & Windsurf</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Le paysage des outils de développement à base d&apos;agents a considérablement évolué. Tous les éditeurs ne partagent pas la même philosophie d&apos;exécution :
        </p>

        <div className="overflow-x-auto w-full min-w-0 max-w-full -mx-1 sm:mx-0">
          <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Environnement</th>
                <th className="p-3.5">Approche clé</th>
                <th className="p-3.5">Gestion multi-agents</th>
                <th className="p-3.5">Exécution Terminal</th>
                <th className="p-3.5">Usage dans ce cours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
              <tr className="bg-indigo-50/40">
                <td className="p-3.5 font-bold text-indigo-950 flex items-center gap-1.5">
                  <Icon name="sparkles" className="w-4 h-4 text-indigo-600" />
                  Google Antigravity
                </td>
                <td className="p-3.5">Plateforme d&apos;agents autonomes, pilotage d&apos;équipe et outillage système étendu (CLI, subagents, swarm).</td>
                <td className="p-3.5 text-emerald-700 font-bold">Natif (sous-agents, rôles dédiés, protocoles)</td>
                <td className="p-3.5">Intégré et contrôlé par permissions</td>
                <td className="p-3.5 text-indigo-700 font-bold">Support principal</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-950">VS Code + IA</td>
                <td className="p-3.5">Éditeur généraliste enrichi par extensions (GitHub Copilot, Cline, Continue).</td>
                <td className="p-3.5 text-slate-600">Partiel (dépend des extensions tierces installées)</td>
                <td className="p-3.5">Exécution selon les extensions</td>
                <td className="p-3.5 text-slate-500">Référence d&apos;écosystème</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-950">Cursor</td>
                <td className="p-3.5">Fork VS Code avec mode <em>Agent</em> natif pour l&apos;exploration et la réécriture multi-fichiers.</td>
                <td className="p-3.5 text-slate-600">Principalement agent solo itératif</td>
                <td className="p-3.5">Oui (mode terminal autorisé)</td>
                <td className="p-3.5 text-slate-500">Comparaison méthodologique</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-950">Windsurf / Devin Desktop</td>
                <td className="p-3.5">Environnement axé sur le flux <em>Cascade</em> et la prise en charge d&apos;actions séquentielles.</td>
                <td className="p-3.5 text-slate-600">Orchestration centralisée du flux Cascade</td>
                <td className="p-3.5">Oui, intégré au flux</td>
                <td className="p-3.5 text-slate-500">Comparaison méthodologique</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="Ne pas confondre capacité technique et autorisation organisationnelle">
          Même si un outil comme Antigravity ou Cursor est techniquement capable de lancer des commandes shell destructives ou de pousser du code en production, <strong>l&apos;organisation de l&apos;équipe impose que le Project Manager humain garde le monopole des décisions critiques</strong> (merge, rebase, push, suppression de bases de données).
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 4 : INTÉRÊT ET LIMITES DE L'APPROCHE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 4 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Avantages clés et limites incontournables</h2>
        </div>

        <div className="flex flex-col gap-5 w-full min-w-0 max-w-full">
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-emerald-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les 5 grands atouts des IDE à agents
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-emerald-700 border border-emerald-200 shrink-0">
                Gains Opérationnels
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">1</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Centralisation totale : </strong>
                  <span>Plus besoin de copier-coller du code entre le navigateur et votre IDE. Tout le flux reste intégré dans un espace de travail unique.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">2</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Automatisation des tâches laborieuses : </strong>
                  <span>Création de boilerplate, génération de tests rébarbatifs, refactoring de types et conformité aux standards.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">3</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Analyse accélérée du projet : </strong>
                  <span>Compréhension immédiate d&apos;une base de code inconnue ou d&apos;une architecture complexe grâce à la lecture automatisée de l&apos;arborescence.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">4</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Spécialisation des missions : </strong>
                  <span>Déléguer l&apos;UI au Frontend et la sécurité d&apos;API au Backend pour diviser l&apos;effort sans surcharge cognitive.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">5</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Auto-vérification en boucle : </strong>
                  <span>L&apos;agent compile et teste son propre code dans le terminal intégré avant de restituer la main au développeur.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-rose-50/70 border-2 border-rose-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800 shrink-0">
                  <Icon name="shield-check" className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les 5 limites critiques à surveiller
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Vigilance Requise
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Risque d&apos;erreurs silencieuses : </strong>
                  <span>Un code élégant en apparence peut contenir des bugs logiques, des failles de sécurité ou des régressions subtiles.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Dérive de contexte : </strong>
                  <span>Dans une session trop longue, l&apos;agent peut oublier les contraintes initiales et commencer à halluciner.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Périmètre des permissions : </strong>
                  <span>Un agent ne peut agir que dans le cadre des outils configurés. Sans droits d&apos;écriture ou terminal, son action est bridée.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Hallucinations de dépendances : </strong>
                  <span>L&apos;agent peut tenter d&apos;importer des bibliothèques inexistantes ou des API non prises en charge.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Responsabilité juridique & humaine : </strong>
                  <span>Le développeur reste le seul responsable légal et technique des livrables finaux livrés au client.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>1.9 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Un IDE intégrant des agents IA transforme votre environnement de travail en un véritable studio collaboratif. En regroupant l&apos;éditeur de code, l&apos;arborescence, la conversation de pilotage, le terminal d&apos;exécution et les outils de versioning Git, il permet de déléguer des missions concrètes aux agents. Toutefois, cette puissance exige une discipline de fer : <strong>les agents assistent et exécutent, mais le Project Manager humain conserve le contrôle stratégique et la validation finale des résultats</strong>.
        </p>
      </section>

      {/* =========================================================================
          SECTION 6 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Quiz de compréhension (9 questions)</h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Découverte des IDE intégrant des agents IA"
          questions={[
            {
              id: 1,
              question: "Que signifie le sigle IDE en informatique ?",
              options: [
                "Integrated Development Environment",
                "Intelligent Data Engine",
                "Internal Development Extension",
                "Interactive Debugging Ecosystem"
              ],
              correctIndex: 0,
              explanation: "IDE est l'abréviation de Integrated Development Environment (Environnement de Développement Intégré)."
            },
            {
              id: 2,
              question: "Quel est le rôle principal d'un IDE dans le travail d'un développeur ?",
              options: [
                "Remplacer le système d'exploitation de la machine",
                "Regrouper les outils indispensables au développement (éditeur, terminal, explorateur, tests)",
                "Héberger automatiquement toutes les applications sur Internet",
                "Générer l'intégralité du code sans intervention humaine"
              ],
              correctIndex: 1,
              explanation: "L'IDE rassemble au même endroit plusieurs outils qui nécessiteraient autrement des logiciels séparés."
            },
            {
              id: 3,
              question: "À quoi sert principalement l'explorateur de fichiers dans l'IDE ?",
              options: [
                "À exécuter les tests automatisés du projet",
                "À afficher et naviguer dans l'arborescence des dossiers et fichiers du projet",
                "À compiler automatiquement le code TypeScript",
                "À gérer les conflits de fusion Git"
              ],
              correctIndex: 1,
              explanation: "L'explorateur de fichiers structure la vue du projet et permet de retrouver rapidement les modules et composants."
            },
            {
              id: 4,
              question: "Quel est le rôle fondamental du terminal dans un IDE à agents ?",
              options: [
                "Permettre d'exécuter des commandes (installation, serveur, tests, Git)",
                "Afficher exclusivement les conversations avec l'IA",
                "Remplacer l'éditeur de code pour écrire les fichiers",
                "Stocker de façon permanente la base de données"
              ],
              correctIndex: 0,
              explanation: "Le terminal permet de lancer des commandes de compilation, d'installation de paquets et de suite de tests."
            },
            {
              id: 5,
              question: "Quel est l'intérêt d'intégrer des agents IA directement au cœur de l'IDE ?",
              options: [
                "Supprimer tout besoin de relire ou vérifier le code",
                "Permettre aux agents d'intervenir sur le projet selon leurs capacités et autorisations",
                "Garantir qu'aucune erreur ne sera jamais commise",
                "Remplacer obligatoirement tous les membres de l'équipe"
              ],
              correctIndex: 1,
              explanation: "L'intégration permet à l'agent d'accéder au contexte du projet et d'agir directement sur les fichiers et le terminal dans un cadre contrôlé."
            },
            {
              id: 6,
              question: "Quel environnement servira de support principal tout au long des travaux pratiques de ce cours ?",
              options: [
                "Google Antigravity",
                "Microsoft Excel",
                "Adobe Photoshop",
                "Sublime Text 2"
              ],
              correctIndex: 0,
              explanation: "Google Antigravity est la plateforme retenue pour le pilotage d'agents et les projets pratiques du cursus."
            },
            {
              id: 7,
              question: "Un agent IA peut-il systématiquement modifier tous les fichiers d'un dépôt sans restriction ?",
              options: [
                "Oui, car l'IA a toujours tous les droits sur l'ordinateur",
                "Non, ses possibilités d'action dépendent strictement des outils et des autorisations accordées",
                "Oui, dès lors qu'il reçoit un message de l'utilisateur",
                "Non, un agent ne peut jamais modifier de fichier sous aucun prétexte"
              ],
              correctIndex: 1,
              explanation: "Les actions de l'agent sont encadrées par son environnement technique et les permissions définies (moindre privilège)."
            },
            {
              id: 8,
              question: "Pourquoi est-il indispensable de contrôler le travail produit par un agent IA ?",
              options: [
                "Parce que l'agent peut produire des erreurs, des régressions ou des résultats incomplets",
                "Parce que l'agent ne peut jamais exécuter de code",
                "Parce que les tests automatisés sont devenus inutiles",
                "Parce que l'agent supprime toujours les fichiers après son travail"
              ],
              correctIndex: 0,
              explanation: "Le code généré par IA peut contenir des hallucinations ou des incohérences qui exigent une vérification rigoureuse."
            },
            {
              id: 9,
              question: "Dans notre organisation multi-agents, quelle est la responsabilité du Project Manager humain ?",
              options: [
                "Laisser les agents prendre toutes les décisions en totale autonomie",
                "Réaliser obligatoirement toutes les tâches techniques manuellement",
                "Conserver la responsabilité des décisions stratégiques et des validations importantes",
                "Écrire tous les fichiers de configuration de A à Z"
              ],
              correctIndex: 2,
              explanation: "Le PM humain conserve la gouvernance, valide les étapes charnières et autorise les opérations sensibles comme les fusions Git."
            }
          ]}
        />
      </section>
    </div>
  );
};
