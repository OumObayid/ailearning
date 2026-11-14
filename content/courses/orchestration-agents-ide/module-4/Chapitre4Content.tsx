'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  // Simulateur de terminal de création de Worktrees
  const [createdWorktrees, setCreatedWorktrees] = useState<string[]>(['main']);
  const [lastLog, setLastLog] = useState<string>('Dépôt initialisé sur main. Prêt pour création de Worktrees.');

  const handleAddBackend = () => {
    if (createdWorktrees.includes('backend')) {
      setLastLog("fatal: '/projects/taskflow-backend' already exists");
      return;
    }
    setCreatedWorktrees([...createdWorktrees, 'backend']);
    setLastLog("Preparing worktree (new branch 'feature/backend-api')\nHEAD is now at a1b2c3d chore: initialiser le projet TaskFlow\nCreated worktree: /projects/taskflow-backend");
  };

  const handleAddFrontend = () => {
    if (createdWorktrees.includes('frontend')) {
      setLastLog("fatal: '/projects/taskflow-frontend' already exists");
      return;
    }
    setCreatedWorktrees([...createdWorktrees, 'frontend']);
    setLastLog("Preparing worktree (new branch 'feature/frontend-ui')\nHEAD is now at a1b2c3d chore: initialiser le projet TaskFlow\nCreated worktree: /projects/taskflow-frontend");
  };

  const handleReset = () => {
    setCreatedWorktrees(['main']);
    setLastLog("Worktrees réinitialisés. Seul le répertoire principal 'taskflow' est actif.");
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 4 — Git Worktrees et parallélisme
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 4 — Créer un Worktree
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Après avoir assimilé les principes théoriques de Git Worktrees, il est temps de passer à la pratique. Git propose une syntaxe simple et robuste articulée autour de <code>git worktree add</code>. Dans ce chapitre, nous allons créer pas-à-pas les répertoires physiques de <strong>TaskFlow</strong> et vérifier leur bon rattachement au dépôt central.
        </p>
      </div>

      {/* =========================================================================
          OBJECTIFS D'APPRENTISSAGE
         ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="target" className="w-5 h-5 text-indigo-600" />
          Objectifs d'apprentissage du chapitre
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              1. Maîtriser la syntaxe de git worktree add
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Savoir rattacher un dossier à une branche existante ou créer simultanément une branche et son dossier avec l'option <code>-b</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Comprendre les chemins relatifs et absolus
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Savoir pourquoi l'utilisation de <code>../nom-dossier</code> permet de placer les espaces de travail frères côte-à-côte proprement.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Inspecter et vérifier avec git worktree list
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Contrôler que chaque chemin pointe vers le bon commit et la bonne branche de mission.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4.2 & 4.4 : SYNTAXE DE CRÉATION
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            La commande git worktree add : Forme générale et variantes
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Les deux approches standards pour initialiser un nouvel espace de travail
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                Approche A : Associer une branche existante
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-slate-100 text-slate-800 shrink-0">
                Branche existante
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Si la branche <code>feature/backend-api</code> a déjà été créée au préalable :
            </p>
            <div className="p-3 bg-slate-900 text-indigo-400 font-mono text-xs rounded-xl">
              $ git worktree add ../taskflow-backend feature/backend-api
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Git crée le dossier <code>taskflow-backend</code> au niveau supérieur et checkout automatiquement les fichiers de la branche.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                Approche B : Créer la branche ET le Worktree en un seul coup (-b)
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                Méthode recommandée
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Crée une nouvelle branche à partir d'une branche de référence (ex: <code>main</code>) et monte immédiatement le dossier :
            </p>
            <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl">
              $ git worktree add -b feature/frontend-ui ../taskflow-frontend main
            </div>
            <p className="text-xs text-slate-500 mt-2">
              L'option <code>-b</code> garantit que la branche est instanciée immédiatement à partir de l'état actuel de <code>main</code>.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DE CRÉATION DE WORKTREES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl min-w-0 max-w-full overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Console Shell — Création de Worktrees en direct
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Terminal TaskFlow
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Exécutez les commandes pour créer les espaces Backend et Frontend, puis examinez le retour de <code>git worktree list</code> :
          </p>

          {/* Boutons d'action CLI */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={handleAddBackend}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors text-left whitespace-normal break-words [overflow-wrap:anywhere] max-w-full cursor-pointer"
            >
              $ git worktree add -b feature/backend-api ../taskflow-backend main
            </button>
            <button
              onClick={handleAddFrontend}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors text-left whitespace-normal break-words [overflow-wrap:anywhere] max-w-full cursor-pointer"
            >
              $ git worktree add -b feature/frontend-ui ../taskflow-frontend main
            </button>
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              ↺ Réinitialiser
            </button>
          </div>

          {/* Rendu Terminal */}
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-3 mb-6 min-w-0 max-w-full">
            <div className="text-indigo-400 font-bold">$ Output de la commande :</div>
            <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] text-emerald-300 min-w-0 max-w-full font-mono text-xs sm:text-sm leading-relaxed">
              {lastLog}
            </div>

            <div className="pt-2 border-t border-slate-800 text-indigo-400 font-bold">$ git worktree list</div>
            <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] text-slate-200 min-w-0 max-w-full font-mono text-xs sm:text-sm leading-relaxed">
              {`/projects/taskflow             a1b2c3d [main]
${createdWorktrees.includes('backend') ? '/projects/taskflow-backend     a1b2c3d [feature/backend-api]\n' : ''}${createdWorktrees.includes('frontend') ? '/projects/taskflow-frontend    a1b2c3d [feature/frontend-ui]\n' : ''}`}
            </div>
          </div>

          {/* Arborescence résultante */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2 min-w-0 max-w-full overflow-hidden">
            <span className="text-xs font-bold text-indigo-300 block">
              📁 Arborescence physique sur votre disque :
            </span>
            <div className="font-mono text-xs text-slate-300 space-y-1 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              <div>projects/</div>
              <div className="pl-4 text-emerald-400 whitespace-normal break-words [overflow-wrap:anywhere]">├── taskflow/ (Dépôt Git principal - main)</div>
              {createdWorktrees.includes('backend') && (
                <div className="pl-4 text-blue-400 whitespace-normal break-words [overflow-wrap:anywhere]">├── taskflow-backend/ (Espace Agent Backend)</div>
              )}
              {createdWorktrees.includes('frontend') && (
                <div className="pl-4 text-purple-400 whitespace-normal break-words [overflow-wrap:anywhere]">└── taskflow-frontend/ (Espace Agent Frontend)</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4.12 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 4
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez vos connaissances sur la création et la gestion des Worktrees (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle commande Git permet d'ajouter un nouvel espace de travail lié au dépôt ?",
              options: [
                "git branch add",
                "git worktree add",
                "git clone worktree",
                "git init worktree"
              ],
              correctIndex: 1,
              explanation: "git worktree add est la commande dédiée à la création d'un worktree."
            },
            {
              id: 2,
              question: "Dans la commande 'git worktree add ../taskflow-backend feature/backend-api', que représente le premier argument ?",
              options: [
                "Le nom du commit parent",
                "Le chemin du nouveau répertoire de travail à créer sur le disque",
                "L'URL du dépôt distant",
                "Le pseudonyme de l'agent"
              ],
              correctIndex: 1,
              explanation: "Le premier argument indique à Git où monter physiquement les fichiers sur le disque dur."
            },
            {
              id: 3,
              question: "Quelle option permet de créer une nouvelle branche en même temps que le Worktree ?",
              options: [
                "-d",
                "-f",
                "-b",
                "-l"
              ],
              correctIndex: 2,
              explanation: "L'option -b crée la branche et la rattache directement au nouveau répertoire."
            },
            {
              id: 4,
              question: "Dans 'git worktree add -b feature/frontend-ui ../taskflow-frontend main', quelle est la branche de départ servant de base ?",
              options: [
                "feature/frontend-ui",
                "main",
                "Aucune branche",
                "origin/main obligatoirement"
              ],
              correctIndex: 1,
              explanation: "Le dernier argument spécifie la branche de référence qui fournit le commit initial de la nouvelle branche."
            },
            {
              id: 5,
              question: "Quelle commande permet d'afficher la liste de tous les Worktrees associés au dépôt ?",
              options: [
                "git worktree list",
                "git branch -a",
                "git status --all",
                "git log --worktree"
              ],
              correctIndex: 0,
              explanation: "git worktree list affiche les chemins physiques, les hashs de commits et les branches de chaque espace."
            },
            {
              id: 6,
              question: "Peut-on associer une branche locale déjà active dans un autre Worktree à un nouveau Worktree ?",
              options: [
                "Oui, sans restriction",
                "Non, Git refuse pour éviter des modifications concurrentes du pointeur de branche",
                "Oui, si le dossier est vide",
                "Non, car Git interdit d'avoir plus d'un Worktree"
              ],
              correctIndex: 1,
              explanation: "Git empêche formellement de partager une même branche locale entre deux worktrees actifs."
            },
            {
              id: 7,
              question: "Que réalise l'option '--detach' lors de la création d'un Worktree ?",
              options: [
                "Elle supprime le dépôt central",
                "Elle crée un Worktree directement sur un commit spécifique sans y associer de branche locale active",
                "Elle fusionne deux branches",
                "Elle efface les anciens commits"
              ],
              correctIndex: 1,
              explanation: "L'option --detach crée un état detached HEAD sur le worktree (utile pour auditer un tag ou un ancien commit sans créer de branche)."
            },
            {
              id: 8,
              question: "Que signifie le chemin relatif '../taskflow-backend' exécuté depuis '/projects/taskflow' ?",
              options: [
                "Un dossier à l'intérieur de taskflow",
                "Un dossier situé au niveau supérieur, côte-à-côte avec taskflow dans /projects",
                "Un serveur GitHub distant",
                "Un fichier de configuration .git"
              ],
              correctIndex: 1,
              explanation: "Le préfixe '..' remonte d'un cran dans l'arborescence pour créer le dossier frère."
            },
            {
              id: 9,
              question: "La commande 'git worktree add' lance-t-elle automatiquement un agent IA dans l'IDE ?",
              options: [
                "Oui, toujours",
                "Non, elle crée uniquement le dossier sur le disque ; l'affectation et le prompt relèvent de l'orchestration"
              ],
              correctIndex: 1,
              explanation: "Git est un outil système de gestion de versions. Le lancement de l'agent est opéré par l'IDE."
            },
            {
              id: 10,
              question: "Pourquoi est-il crucial de vérifier l'état des Worktrees avec 'git worktree list' après leur création ?",
              options: [
                "Pour vérifier que chaque chemin et branche ont été créés conformément au plan de mission",
                "Pour fusionner automatiquement dans main",
                "Pour supprimer les commits inutiles",
                "Pour publier le projet sur Internet"
              ],
              correctIndex: 0,
              explanation: "Une vérification systématique évite d'assigner un agent à un dossier mal configuré ou pointant sur la mauvaise branche."
            }
          ]}
        />
      </section>
    </div>
  );
};
