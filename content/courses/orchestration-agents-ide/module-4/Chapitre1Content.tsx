'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  // Simulateur interactif de l'architecture Git Worktrees
  const [selectedWorktree, setSelectedWorktree] = useState<'main' | 'backend' | 'frontend'>('backend');

  const worktreeDetails = {
    main: {
      name: "taskflow (Répertoire Principal)",
      path: "/projects/taskflow",
      branch: "main",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
      role: "Espace de coordination sous la supervision du Team Leader IA et du PM humain.",
      workingTreeFiles: ["package.json", "README.md", "taskflow-contract.md"],
      indexStatus: "Propre (Working tree clean)",
      headCommit: "a1b2c3d (chore: initialiser le projet TaskFlow)"
    },
    backend: {
      name: "taskflow-backend (Worktree Secondaire)",
      path: "/projects/taskflow-backend",
      branch: "feature/backend-api",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      role: "Espace de développement autonome de l'Agent Backend pour concevoir l'API REST.",
      workingTreeFiles: ["package.json", "README.md", "backend/src/routes.ts (modifié non commité)"],
      indexStatus: "1 fichier modifié non préparé (non visible par les autres)",
      headCommit: "a1b2c3d &rarr; prêt pour commit de mission"
    },
    frontend: {
      name: "taskflow-frontend (Worktree Secondaire)",
      path: "/projects/taskflow-frontend",
      branch: "feature/frontend-ui",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      role: "Espace de développement autonome de l'Agent Frontend pour les composants React.",
      workingTreeFiles: ["package.json", "README.md", "frontend/src/TaskList.tsx (en cours)"],
      indexStatus: "1 fichier nouveau non suivi (untracked)",
      headCommit: "a1b2c3d &rarr; prêt pour commit de mission"
    }
  };

  const current = worktreeDetails[selectedWorktree];

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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 1 — Comprendre le fonctionnement de Git Worktrees
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Lorsque plusieurs agents IA interviennent en même temps sur un projet comme <strong>TaskFlow</strong>, le modèle traditionnel à un seul répertoire de travail devient un goulet d'étranglement critique : changer de branche écrase les fichiers en cours et empêche la compilation simultanée. <strong>Git Worktrees</strong> résout ce défi en associant plusieurs répertoires de travail physiques à un même dépôt Git partagé.
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
              1. Identifier le problème du travail parallèle classique
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprendre pourquoi un répertoire de travail unique empêche deux agents de développer simultanément sans collision de fichiers.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Comprendre l'architecture de Git Worktrees
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguer ce qui est partagé (la base d'objets <code>.git</code> et les commits) de ce qui est isolé (répertoires physiques, zones de staging et pointeurs HEAD).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Connaître les limites et règles fondamentales
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Intégrer qu'une branche locale ne peut être active que dans un seul Worktree à la fois et que l'isolation physique ne dispense pas du contrôle PM.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1.1 & 1.2 : LE PROBLÈME ET LA SOLUTION WORKTREES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.1
            </span>
            Le problème du répertoire unique et la solution Git Worktrees
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Passer de la navigation séquentielle au développement multi-espaces simultané
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Dans une organisation classique, un dépôt Git ne possède qu'un seul <strong>répertoire de travail (Working Tree)</strong>. Si l'Agent Backend travaille sur les routes API et que l'Agent Frontend veut développer l'interface, exécuter <code>git switch</code> modifie physiquement tous les fichiers sur le disque. Si des fichiers non commités existent, Git bloque l'opération ou risque d'écraser du travail.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                <Icon name="folder-plus" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                La solution : Plusieurs répertoires pour un seul dépôt .git
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Git Worktrees</strong> permet d'attacher plusieurs répertoires indépendants sur le disque à une unique base de données Git. L'Agent Backend travaille dans <code>taskflow-backend/</code> sur la branche <code>feature/backend-api</code>, pendant que l'Agent Frontend code dans <code>taskflow-frontend/</code> sur <code>feature/frontend-ui</code>. Aucun fichier ne se mélange, et chaque agent peut lancer ses serveurs locaux et tests en toute indépendance.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1.4 & 1.5 : CE QUI EST PARTAGÉ VS ISOLÉ
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.4
            </span>
            Architecture interne : Ce qui est partagé vs Ce qui est isolé
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Comprendre l'étanchéité des espaces et la centralisation des commits
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-900 font-bold">
              <tr>
                <th className="pb-3 pr-4">Composant Git</th>
                <th className="pb-3 pr-4">Nature</th>
                <th className="pb-3">Comportement multi-worktrees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Base d'objets (.git/objects)</td>
                <td className="py-2.5 pr-4">PARTAGÉE</td>
                <td className="py-2.5">Tous les commits, blobs et trees sont mutualisés. Un commit créé dans un worktree est instantanément lisible par les autres.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Historique global</td>
                <td className="py-2.5 pr-4">PARTAGÉ</td>
                <td className="py-2.5">Tous les worktrees voient le même graphe de branches et peuvent inspecter l'historique commun.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Répertoire de travail (Fichiers)</td>
                <td className="py-2.5 pr-4">TOTALEMENT ISOLÉ</td>
                <td className="py-2.5">Chaque dossier sur le disque est indépendant. Une modification non enregistrée reste invisible aux autres.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Zone de préparation (Index / Staging)</td>
                <td className="py-2.5 pr-4">TOTALEMENT ISOLÉE</td>
                <td className="py-2.5">Chaque worktree possède son propre fichier index. <code>git add</code> ne prépare que les fichiers de cet espace précis.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Pointeur HEAD</td>
                <td className="py-2.5 pr-4">TOTALEMENT ISOLÉ</td>
                <td className="py-2.5">Chaque worktree a son propre HEAD pointant sur sa branche dédiée.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF MULTI-WORKTREES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Interactif — Organisation Multi-Worktrees TaskFlow
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              1 Dépôt .git &bull; 3 Répertoires Physiques
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Sélectionnez un espace de travail pour inspecter son chemin physique, sa branche active, ses fichiers disques et son état d'index :
          </p>

          {/* Boutons sélecteurs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedWorktree('main')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedWorktree === 'main'
                  ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📁 taskflow (main)
            </button>
            <button
              onClick={() => setSelectedWorktree('backend')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedWorktree === 'backend'
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📁 taskflow-backend (Backend)
            </button>
            <button
              onClick={() => setSelectedWorktree('frontend')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedWorktree === 'frontend'
                  ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📁 taskflow-frontend (Frontend)
            </button>
          </div>

          {/* Panneau de détail */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800/90 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold border ${current.badgeColor}`}>
                  Branche active : {current.branch}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-2">
                  {current.name}
                </h4>
              </div>
              <div className="text-right font-mono text-xs text-indigo-300">
                Chemin disque : <span className="text-slate-200">{current.path}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200">
              {current.role}
            </p>

            <div className="grid grid-cols-1 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-xs font-bold text-indigo-300 block mb-1">
                  📄 Fichiers présents physiquement dans ce répertoire :
                </span>
                <ul className="text-xs font-mono text-slate-300 list-disc list-inside">
                  {current.workingTreeFiles.map((file, idx) => (
                    <li key={idx}>{file}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-xs font-bold text-amber-300 block mb-1">
                  ⚡ État de l'Index (Staging Area) & HEAD :
                </span>
                <div className="text-xs text-slate-300 font-mono">
                  Index : {current.indexStatus}<br/>
                  HEAD : {current.headCommit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1.7 : LES LIMITES DE GIT WORKTREES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.7
            </span>
            Les limites fondamentales de Git Worktrees
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Ce que les Worktrees ne peuvent pas faire
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              1. Règle stricte d'exclusivité de branche
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Git <strong>interdit d'associer la même branche locale à deux Worktrees actifs simultanément</strong>. Cette restriction empêche deux agents d'avancer le même pointeur de branche en même temps, ce qui détruirait la cohérence de l'historique.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              2. Ce n'est pas une machine virtuelle ni un conteneur étanche
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Un Worktree est un dossier sur votre système d'exploitation. Si l'Agent Backend et l'Agent Frontend tentent tous les deux de lancer un serveur web sur le port <code>3000</code>, un conflit réseau surviendra. Les variables d'environnement et les ports doivent être coordonnés.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              3. Les conflits de code restent possibles lors du merge
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Les Worktrees isolent l'écriture sur le disque, mais si les agents modifient la même ligne dans <code>src/types/task.ts</code>, un conflit Git se déclenchera inévitablement lors de l'intégration finale dans <code>main</code>.
            </p>
          </div>
        </div>

        <Callout type="danger" title="Règle d'or de souveraineté PM">
          <p className="text-xs sm:text-sm leading-relaxed">
            Même si chaque agent dispose de son propre Worktree et avance en toute autonomie sur sa branche, <strong>aucun merge, rebase ou push ne doit être exécuté sans l'autorisation formelle du Project Manager humain</strong>. Les Worktrees organisent la production parallèle ; l'intégration reste soumise à la gouvernance humaine.
          </p>
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 1.11 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 1
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez votre compréhension des bases de Git Worktrees (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal de Git Worktrees ?",
              options: [
                "Créer plusieurs dépôts Git totalement indépendants sur Internet",
                "Associer plusieurs espaces de travail physiques à un même dépôt Git partagé",
                "Remplacer purement et simplement les branches Git",
                "Fusionner automatiquement toutes les modifications en temps réel"
              ],
              correctIndex: 1,
              explanation: "Git Worktrees permet d'ouvrir plusieurs dossiers de travail simultanés rattachés à un même dossier .git central."
            },
            {
              id: 2,
              question: "Que partagent les Worktrees issus d'un même dépôt ?",
              options: [
                "Uniquement les fichiers du répertoire principal",
                "La base des objets Git (.git/objects) et l'historique complet des commits",
                "Les modifications non enregistrées sur le disque",
                "Les mêmes dossiers physiques"
              ],
              correctIndex: 1,
              explanation: "Tous les worktrees puisent dans la même base d'objets immuables et le même historique de commits."
            },
            {
              id: 3,
              question: "Chaque Worktree possède-t-il sa propre zone de préparation (Index / Staging) ?",
              options: [
                "Oui, chaque worktree possède son index indépendant",
                "Non, l'index est partagé par tous les répertoires"
              ],
              correctIndex: 0,
              explanation: "Chaque worktree dispose de son propre fichier index, permettant de préparer des commits sans affecter les autres."
            },
            {
              id: 4,
              question: "Un agent Backend peut-il modifier un fichier dans son Worktree sans impacter immédiatement les fichiers de l'agent Frontend ?",
              options: [
                "Oui, car leurs répertoires de travail physiques sont hermétiquement séparés",
                "Non, Git réplique instantanément chaque frappe de clavier dans tous les dossiers"
              ],
              correctIndex: 0,
              explanation: "Tant qu'une modification n'est pas commitée et fusionnée, elle n'existe que dans le répertoire physique de son auteur."
            },
            {
              id: 5,
              question: "Que se passe-t-il lorsqu'un agent enregistre un commit dans son Worktree ?",
              options: [
                "Le commit est stocké dans un dépôt totalement indépendant",
                "Le commit est enregistré dans la base d'objets du dépôt Git partagé et devient accessible aux autres références",
                "Le commit est immédiatement fusionné sur la branche principale main",
                "Tous les autres worktrees sont détruits"
              ],
              correctIndex: 1,
              explanation: "Le commit intègre la base commune du dépôt .git partagé, même s'il ne fait avancer que la branche du worktree actif."
            },
            {
              id: 6,
              question: "Peut-on associer la même branche locale active à deux Worktrees différents simultanément ?",
              options: [
                "Oui, sans aucune restriction",
                "Non, Git interdit formellement d'avoir la même branche locale active dans deux worktrees à la fois",
                "Oui, à condition d'utiliser Linux",
                "Non, car Git Worktrees n'utilise pas de branches"
              ],
              correctIndex: 1,
              explanation: "Cette règle évite que deux répertoires modifient concurremment le même pointeur de branche."
            },
            {
              id: 7,
              question: "Quelle commande permet de consulter la liste des Worktrees attachés au dépôt ?",
              options: [
                "git branch -a",
                "git status",
                "git worktree list",
                "git log"
              ],
              correctIndex: 2,
              explanation: "git worktree list liste tous les chemins de worktrees avec leur commit et branche associés."
            },
            {
              id: 8,
              question: "L'utilisation de Git Worktrees élimine-t-elle tout risque de conflit de code ?",
              options: [
                "Oui, les conflits deviennent impossibles",
                "Non, des conflits de fusion peuvent toujours survenir lors de l'intégration dans main"
              ],
              correctIndex: 1,
              explanation: "Les worktrees séparent les disques de travail, mais si deux agents modifient les mêmes lignes, le merge génèrera un conflit."
            },
            {
              id: 9,
              question: "Git Worktrees constitue-t-il une isolation de sécurité (sandbox) étanche ?",
              options: [
                "Oui, chaque worktree s'exécute dans une machine virtuelle dédiée",
                "Non, il sépare simplement les dossiers sur le système de fichiers sans isolation de sécurité"
              ],
              correctIndex: 1,
              explanation: "Un worktree n'est qu'un dossier ordinaire partageant les ressources système et les droits de la session utilisateur."
            },
            {
              id: 10,
              question: "Quel est le rôle du Project Manager humain dans une organisation basée sur les Worktrees ?",
              options: [
                "Laisser les agents merger et pusher en totale autonomie",
                "Conserver la gouvernance, arbitrer les priorités et valider formellement les opérations d'intégration",
                "Créer obligatoirement un compte GitHub distinct pour chaque agent",
                "Remplacer l'éditeur de code"
              ],
              correctIndex: 1,
              explanation: "Le PM humain est le garant souverain de l'architecture et valide les opérations critiques d'intégration."
            }
          ]}
        />
      </section>
    </div>
  );
};
