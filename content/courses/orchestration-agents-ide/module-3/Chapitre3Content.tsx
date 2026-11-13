'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur interactif de pointeurs de branches et HEAD
  const [activeBranch, setActiveBranch] = useState<'main' | 'feature' | 'fix'>('main');
  const [featureCommitsCount, setFeatureCommitsCount] = useState<number>(1);

  const branchesState = {
    main: {
      name: "main",
      color: "border-indigo-300 bg-indigo-50/70",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
      pointedCommit: "Commit B (chore: base taskflow structure)",
      role: "Branche principale protégée. Référence stable du projet TaskFlow.",
      canCommitDirectly: false,
      cliCommand: "git switch main"
    },
    feature: {
      name: "feature/task-creation",
      color: "border-blue-300 bg-blue-50/70",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      pointedCommit: featureCommitsCount === 1 ? "Commit C (feat: add task creation form)" : "Commit D (feat: add zod validation)",
      role: "Branche de mission pour l'Agent Frontend. Travail isolé sans perturber main.",
      canCommitDirectly: true,
      cliCommand: "git switch feature/task-creation"
    },
    fix: {
      name: "fix/task-display",
      color: "border-amber-300 bg-amber-50/70",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      pointedCommit: "Commit E (fix: correct task badge color)",
      role: "Branche de correction rapide d'un bug d'affichage.",
      canCommitDirectly: true,
      cliCommand: "git switch fix/task-display"
    }
  };

  const curr = branchesState[activeBranch];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 3 — Maîtrise de Git pour le multi-agents
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 3 — Comprendre les branches
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Lorsqu'une équipe développe plusieurs fonctionnalités simultanément sur <strong>TaskFlow</strong>, travailler tous sur la même ligne de code conduit inévitablement à des réécritures destructrices. Les <strong>branches Git</strong> permettent d'isoler chaque chantier dans un espace hermétique, en utilisant un mécanisme de pointeurs mobiles extrêmement léger et performant.
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
              1. Comprendre la nature d'une branche (Pointeur mobile)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dépasser le mythe de la copie intégrale de dossier : une branche Git est simplement une étiquette mobile de 40 octets pointant vers un commit.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Manipuler les commandes modernes : git switch et HEAD
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Créer et changer de branche avec <code>git switch -c</code> et comprendre le rôle du pointeur spécial <code>HEAD</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Distinguer branches locales et branches de suivi distantes
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprendre la différence entre votre branche locale de travail et la référence <code>origin/nom-de-branche</code>.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3.2 : QU'EST-CE QU'UNE BRANCHE GIT ?
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              3.2
            </span>
            Qu'est-ce qu'une branche Git ? Le concept de pointeur mobile
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Une étiquette légère qui avance automatiquement à chaque nouveau commit
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Contrairement aux anciens systèmes de versioning (comme SVN) qui dupliquaient l'intégralité des fichiers sur le disque, <strong>une branche Git est simplement un pointeur mobile vers un commit</strong>. Créer une branche ne consomme quasiment aucun espace disque et s'exécute de façon instantanée.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Comment avance une branche ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Lorsque vous créez un commit, Git crée l'objet commit, lie ce commit à son parent, puis <strong>déplace automatiquement le pointeur de la branche active</strong> vers ce nouveau commit. Les autres branches restent immobiles sur leur propre commit.
            </p>
            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-1">
              <div className="text-slate-400"># État initial : main et feature pointent sur A</div>
              <div className="text-indigo-400">A &larr; main, feature/task-creation (HEAD)</div>
              <div className="text-slate-400 mt-2"># Nouveau commit B créé sur feature/task-creation :</div>
              <div className="text-indigo-400">A &larr; main</div>
              <div className="text-indigo-400">&darr;</div>
              <div className="text-emerald-400">B &larr; feature/task-creation (HEAD)</div>
            </div>
          </div>
        </div>

        {/* SIMULATEUR DE BRANCHES ET HEAD */}
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Interactif — Arbre de Branches et Pointeur HEAD
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Isolation Multi-Agents TaskFlow
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Cliquez sur une branche pour déplacer le pointeur <code>HEAD</code> et observer l'état du dépôt :
          </p>

          {/* Sélecteur de branche active */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveBranch('main')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeBranch === 'main'
                  ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🌿 main (Protégée)
            </button>
            <button
              onClick={() => setActiveBranch('feature')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeBranch === 'feature'
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🌿 feature/task-creation
            </button>
            <button
              onClick={() => setActiveBranch('fix')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeBranch === 'fix'
                  ? 'bg-amber-600 text-white shadow-lg ring-2 ring-amber-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🌿 fix/task-display
            </button>
          </div>

          {/* Visualiseur de HEAD et de la branche */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800/90 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold border ${curr.badgeColor}`}>
                  HEAD &rarr; {curr.name}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-2">
                  Commit actif pointé : <span className="font-mono text-indigo-300">{curr.pointedCommit}</span>
                </h4>
              </div>
              <div className="text-right font-mono text-xs text-slate-400">
                Commande exécutée : <span className="text-emerald-400">{curr.cliCommand}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {curr.role}
            </p>

            {/* Interaction supplémentaire sur la branche feature */}
            {activeBranch === 'feature' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-indigo-300 block">
                  Action de l'Agent Frontend :
                </span>
                <p className="text-xs text-slate-300">
                  L'agent code et commit en toute sécurité. Cliquez ci-dessous pour simuler un commit additionnel et observer le pointeur avancer :
                </p>
                <button
                  onClick={() => setFeatureCommitsCount(prev => (prev === 1 ? 2 : 1))}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-700 hover:bg-indigo-600 text-white transition-colors"
                >
                  {featureCommitsCount === 1 ? "+ Créer Commit D (Validation Zod)" : "↺ Revenir à 1 commit"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3.7 & 3.8 : LES COMMANDES MODERNES (GIT SWITCH)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              3.7
            </span>
            Manipuler les branches avec les commandes modernes
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Privilégier <code>git switch</code> plutôt que l'ancien <code>git checkout</code>
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pendant de nombreuses années, la commande <code>git checkout</code> servait à la fois à changer de branche, à créer des branches et à restaurer des fichiers supprimés. Pour clarifier ces opérations, Git a introduit deux commandes dédiées : <code>git switch</code> (pour naviguer entre les branches) et <code>git restore</code> (pour restaurer des fichiers).
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm font-bold text-slate-900">
                1. Créer ET basculer sur une nouvelle branche en une seule commande
              </h4>
              <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                Recommandé
              </span>
            </div>
            <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg">
              $ git switch -c feature/task-creation
            </div>
            <p className="text-xs text-slate-600 mt-2">
              L'option <code>-c</code> (create) crée la branche et positionne immédiatement <code>HEAD</code> dessus.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm font-bold text-slate-900">
                2. Basculer sur une branche existante
              </h4>
              <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-md bg-blue-100 text-blue-800 shrink-0">
                Navigation
              </span>
            </div>
            <div className="p-2.5 bg-slate-900 text-indigo-400 font-mono text-xs rounded-lg">
              $ git switch main
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Attention : Git peut refuser de changer de branche si des modifications non commitées risquent d'être écrasées.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm font-bold text-slate-900">
                3. Supprimer une branche locale terminée
              </h4>
              <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-md bg-rose-100 text-rose-800 shrink-0">
                Nettoyage
              </span>
            </div>
            <div className="p-2.5 bg-slate-900 text-rose-300 font-mono text-xs rounded-lg">
              $ git branch -d feature/task-creation
            </div>
            <p className="text-xs text-slate-600 mt-2">
              L'option <code>-d</code> refuse la suppression si les commits ne sont pas encore fusionnés. L'option <code>-D</code> force la suppression (à utiliser avec grande prudence).
            </p>
          </div>
        </div>

        <Callout type="warning" title="Important : Une branche n'est pas un espace de fichiers isolé">
          <p className="text-xs sm:text-sm leading-relaxed">
            Lorsque vous exécutez <code>git switch</code> dans un répertoire de travail, Git remplace physiquement les fichiers de votre dossier pour afficher ceux de la branche cible. <strong>Deux agents ne peuvent donc pas travailler simultanément dans le même dossier en changeant constamment de branche !</strong> Pour travailler en parallèle réel sans conflit de fichiers, on utilise les <strong>Git Worktrees</strong> (étudiés en détail dans le Module 4).
          </p>
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 3.15 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 3
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Vérifiez votre maîtrise des branches Git et du pointeur HEAD (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal d'une branche Git ?",
              options: [
                "Sauvegarder automatiquement le projet sur un serveur cloud",
                "Suivre une évolution du projet indépendamment des autres branches",
                "Exécuter la suite de tests automatisés",
                "Remplacer les commits dans l'historique"
              ],
              correctIndex: 1,
              explanation: "Une branche permet d'isoler une ligne d'évolution sans impacter le code de la branche principale ou des autres agents."
            },
            {
              id: 2,
              question: "Techniquement, qu'est-ce qu'une branche Git ?",
              options: [
                "Une copie complète et indépendante de tous les fichiers du disque",
                "Un dossier physique du système d'exploitation",
                "Un pointeur mobile très léger vers un commit",
                "Un script de fusion automatique"
              ],
              correctIndex: 2,
              explanation: "Une branche n'est qu'un simple fichier contenant l'identifiant (hash) de 40 caractères du dernier commit."
            },
            {
              id: 3,
              question: "Quel est le nom de la branche principale utilisé dans cette formation pour TaskFlow ?",
              options: [
                "develop",
                "origin",
                "main",
                "feature"
              ],
              correctIndex: 2,
              explanation: "La convention moderne adoptée dans cette formation est 'main'."
            },
            {
              id: 4,
              question: "Quelle commande permet de consulter la liste des branches locales disponibles ?",
              options: [
                "git branch",
                "git status",
                "git commit",
                "git push"
              ],
              correctIndex: 0,
              explanation: "git branch liste les branches locales et indique la branche active par un astérisque (*)."
            },
            {
              id: 5,
              question: "Quelle commande permet de créer une branche sans basculer dessus ?",
              options: [
                "git switch",
                "git branch nom-de-la-branche",
                "git push",
                "git fetch"
              ],
              correctIndex: 1,
              explanation: "git branch nom-de-la-branche crée le pointeur mais laisse HEAD positionné sur la branche courante."
            },
            {
              id: 6,
              question: "Quelle commande moderne permet de créer une branche et de la sélectionner immédiatement ?",
              options: [
                "git branch -d",
                "git switch",
                "git switch -c nom-de-la-branche",
                "git status -c"
              ],
              correctIndex: 2,
              explanation: "L'option -c de git switch crée et bascule instantanément sur la nouvelle branche."
            },
            {
              id: 7,
              question: "À quoi sert le pointeur spécial HEAD dans le fonctionnement habituel de Git ?",
              options: [
                "À identifier la branche ou la position actuellement sélectionnée dans l'historique",
                "À supprimer les commits obsolètes",
                "À envoyer les modifications sur GitHub",
                "À créer automatiquement un commit toutes les 5 minutes"
              ],
              correctIndex: 0,
              explanation: "HEAD pointe vers la branche active, indiquant à Git où rattacher le prochain commit qui sera créé."
            },
            {
              id: 8,
              question: "Que représente la référence origin/main ?",
              options: [
                "Une branche locale nommée origin",
                "Une référence locale représentant l'état connu de la branche main sur le dépôt distant origin",
                "Un commit d'annulation spécial",
                "Le répertoire de travail principal sur le disque dur"
              ],
              correctIndex: 1,
              explanation: "origin/main est une branche de suivi distant mise à jour lors d'un git fetch."
            },
            {
              id: 9,
              question: "Que se passe-t-il dans le répertoire de travail lorsqu'on exécute 'git switch main' ?",
              options: [
                "Git crée un nouveau sous-dossier autonome",
                "Les fichiers du répertoire de travail sont actualisés pour refléter l'état de la branche main",
                "Tous les commits de la branche précédente sont supprimés",
                "Le serveur GitHub est automatiquement mis à jour"
              ],
              correctIndex: 1,
              explanation: "Git modifie les fichiers sur le disque pour qu'ils correspondent au commit pointé par la branche sélectionnée."
            },
            {
              id: 10,
              question: "Quelle précaution faut-il impérativement prendre avant de supprimer une branche locale avec 'git branch -d' ?",
              options: [
                "Vérifier si ses commits sont conservés ou intégrés ailleurs pour ne pas perdre de travail",
                "Supprimer d'abord le compte GitHub",
                "Effacer tous les fichiers du disque dur",
                "Créer obligatoirement un nouveau dépôt"
              ],
              correctIndex: 0,
              explanation: "Supprimer une branche non fusionnée rend ses commits orphelins et difficiles à retrouver."
            }
          ]}
        />
      </section>
    </div>
  );
};
