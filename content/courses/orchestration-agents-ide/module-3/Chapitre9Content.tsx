'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  // Simulateur interactif de l'Atelier Pratique Git Multi-Agents
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const tpSteps = [
    {
      num: 1,
      title: "Étape 1 & 2 — Initialisation de l'environnement TaskFlow",
      objective: "Vérifier Git, créer l'arborescence et initialiser le dépôt local.",
      icon: "terminal",
      work: "Créer le dossier `taskflow-git-training`, initialiser le dépôt Git avec `git init`, renommer la branche principale en `main` si nécessaire, ajouter le fichier `README.md` et enregistrer le premier commit.",
      cli: `mkdir taskflow-git-training && cd taskflow-git-training
mkdir backend frontend tests
git init
git branch -M main
echo "# TaskFlow - Entraînement Git" > README.md
git add README.md
git commit -m "docs: initialize TaskFlow training project"`,
      questions: [
        "Pourquoi les dossiers vides 'backend/' et 'frontend/' ne sont-ils pas visibles dans 'git status' ?",
        "Comment s'assurer que la branche principale est bien nommée 'main' ?"
      ],
      solution: `Git ne suit pas les dossiers vides. Un dossier n'apparaît dans l'index que lorsqu'au moins un fichier y est créé et ajouté.
La commande 'git branch -M main' garantit que la branche par défaut s'appelle 'main'.`
    },
    {
      num: 2,
      title: "Étape 3 & 4 — Création des branches de mission",
      objective: "Isoler les chantiers des agents Backend, Frontend et QA.",
      icon: "git-branch",
      work: "Créer les 3 branches de mission à partir de 'main' : `feature/backend-structure`, `feature/frontend-structure` et `test/initial-checks`. Vérifier la liste avec `git branch`.",
      cli: `git branch feature/backend-structure
git branch feature/frontend-structure
git branch test/initial-checks
git branch`,
      questions: [
        "La commande 'git branch nom' bascule-t-elle automatiquement sur la nouvelle branche ?",
        "Pourquoi ces 3 branches pointent-elles initialement vers le même commit A ?"
      ],
      solution: `Non, 'git branch' crée le pointeur mais laisse HEAD sur la branche active.
Les 3 branches pointent sur le commit initial car aucun travail n'a encore été commité sur ces lignes de développement.`
    },
    {
      num: 3,
      title: "Étape 5 — Simulation du travail de l'Agent Backend",
      objective: "Enregistrer la structure initiale de l'API Node/Express.",
      icon: "server",
      work: "Basculez sur la branche Backend avec `git switch`, créez le fichier `backend/README.md` décrivant la stack Node.js/Express/TypeScript, vérifiez l'état et créez le commit conventionnel.",
      cli: `git switch feature/backend-structure
echo "# Backend TaskFlow - Node.js / Express / TS" > backend/README.md
git status
git add backend/README.md
git commit -m "docs: define backend structure"`,
      questions: [
        "Pourquoi 'git diff' n'affiche-t-il pas le contenu d'un fichier nouveau avant 'git add' ?",
        "Où se trouve désormais le pointeur HEAD ?"
      ],
      solution: `'git diff' sans option compare uniquement les fichiers déjà suivis. Pour un fichier nouveau (untracked), il faut l'ajouter ou utiliser 'git diff --staged' après 'git add'.
HEAD pointe vers le nouveau commit B sur la branche feature/backend-structure.`
    },
    {
      num: 4,
      title: "Étape 6 & 7 — Simulation des travaux Frontend et QA",
      objective: "Créer des contributions indépendantes sur des branches parallèles.",
      icon: "layers",
      work: "Basculez successivement sur `feature/frontend-structure` pour commiter `frontend/README.md`, puis sur `test/initial-checks` pour commiter `tests/README.md`.",
      cli: `git switch feature/frontend-structure
echo "# Frontend TaskFlow - React / Vite / TS" > frontend/README.md
git add frontend/README.md
git commit -m "docs: define frontend structure"

git switch test/initial-checks
echo "# Vérifications TaskFlow - Scénarios QA" > tests/README.md
git add tests/README.md
git commit -m "test: define initial TaskFlow checks"`,
      questions: [
        "Le fichier 'backend/README.md' est-il visible lorsque vous êtes sur la branche Frontend ?",
        "Quelle commande permet d'observer les 3 branches diverger sur le même graphique ?"
      ],
      solution: `Non ! Le répertoire de travail est réactualisé lors du switch : le fichier de la branche Backend n'existe pas sur la branche Frontend.
La commande 'git log --oneline --graph --decorate --all' affiche le graphe complet des divergences.`
    },
    {
      num: 5,
      title: "Étape 8 & 9 — Simulation d'un conflit entre Backend et Frontend",
      objective: "Provoquer un conflit d'ajout concurrent sur un fichier commun 'taskflow-rules.md'.",
      icon: "alert-triangle",
      work: "Sur `main`, créez `taskflow-rules.md` avec 'status: todo'. Sur `feature/backend-structure`, modifiez-le avec 'status: pending'. Sur `feature/frontend-structure`, modifiez-le avec 'status: todo / libellé: à faire'. Comparez les diffs.",
      cli: `git switch main
echo "status: todo" > taskflow-rules.md
git add taskflow-rules.md && git commit -m "docs: define initial task rules"

git switch feature/backend-structure
echo "status: pending" > taskflow-rules.md
git add taskflow-rules.md && git commit -m "docs: define backend task status"

git switch feature/frontend-structure
echo "status: todo (affiché: à faire)" > taskflow-rules.md
git add taskflow-rules.md && git commit -m "docs: define frontend task status label"`,
      questions: [
        "Pourquoi un conflit apparaîtra-t-il si l'on fusionne ces deux branches ?",
        "Peut-on résoudre ce conflit de manière purement technique sans concertation métier ?"
      ],
      solution: `Un conflit survient parce que deux historiques distincts ont modifié le même fichier avec des valeurs contradictoires ('pending' vs 'todo').
Non, la résolution nécessite un arbitrage métier du PM : quelle valeur technique est retenue pour l'API et quel libellé pour l'interface.`
    },
    {
      num: 6,
      title: "Étape 10 — Analyse comparative : Merge vs Rebase",
      objective: "Évaluer l'intégration des branches sans exécuter d'opération interdite.",
      icon: "git-merge",
      work: "Analysez l'impact d'un 'git merge' (préservation des identifiants et commit 3-way) par rapport à un 'git rebase' (réécriture linéaire des SHA). Rappelez la consigne de verrouillage PM.",
      cli: `# CONSEIL : Ne lancez pas de merge sans accord !
# Option A : git switch main && git merge feature/... (Commit explicite)
# Option B : git switch feature/... && git rebase main (Historique linéaire)`,
      questions: [
        "Pourquoi le rebase est-il déconseillé si la branche a déjà été partagée avec le QA ?",
        "Quelle autorité a le droit de valider l'opération de fusion ?"
      ],
      solution: `Le rebase modifie les hashs SHA. Si l'Agent QA a déjà cloné l'ancien commit, ses références divergeront et provoqueront des erreurs.
Seul le Project Manager humain détient le pouvoir souverain d'autoriser la fusion.`
    },
    {
      num: 7,
      title: "Étape 11 — Audit et Revue des contributions par le Reviewer",
      objective: "Examiner les 3 branches avec la notation triple-points.",
      icon: "shield-check",
      work: "Exécutez `git diff main...branche` pour chaque mission. Rédigez l'avis du Reviewer pour le Backend, le Frontend et le QA.",
      cli: `git diff main...feature/backend-structure
git diff main...feature/frontend-structure
git diff main...test/initial-checks`,
      questions: [
        "Pourquoi la contribution Backend initiale est-elle favorable mais nécessite une réserve sur taskflow-rules.md ?",
        "Les tests fonctionnels de l'application peuvent-ils être déclarés réussis à ce stade ?"
      ],
      solution: `La structure README est propre, mais la modification concurrente du statut exige un arbitrage avant intégration.
Non ! Aucune application réelle n'étant encore codée, seuls les tests de documentation sont audités.`
    },
    {
      num: 8,
      title: "Étape 12 — Rapport de Synthèse & Décision d'Intégration",
      objective: "Rédiger le compte rendu officiel de contrôle des contributions Git.",
      icon: "file-text",
      work: "Consolidez l'état du dépôt, le graphe de commits, l'analyse du conflit et le statut d'autorisation de chaque branche (En attente de validation PM).",
      cli: `git log --oneline --graph --decorate --all`,
      questions: [
        "Quelle mention obligatoire doit figurer dans la décision d'intégration ?",
        "Où le rapport de contrôle doit-il être archivé ?"
      ],
      solution: `La mention 'Intégration en attente d'autorisation formelle du PM humain' est obligatoire.
Le rapport est consigné dans la documentation du projet sous docs/audit/COMPTE_RENDU_GIT_TASKFLOW.md.`
    }
  ];

  const curr = tpSteps[activeStep - 1];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU TP
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="rocket" className="w-4 h-4 text-indigo-800" />
            <span>Travail Pratique de Fin de Module • Module 3</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Durée estimée : ~1 h 30 min</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          TP de fin de module : Simulation de contributions Git multi-agents
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Dans ce travail pratique complet, vous incarnez le Project Manager d'une équipe composée de trois agents (Backend, Frontend et QA). Vous allez initialiser le dépôt du projet <strong>TaskFlow</strong>, créer des branches de mission, enregistrer des commits atomiques, simuler un conflit d'édition concurrent, et réaliser l'audit rigoureux du code avant d'ordonnancer les fusions.
        </p>
      </div>

      {/* =========================================================================
          CADRE DU TP & CONTEXTE TASKFLOW
         ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Icon name="info" className="w-5 h-5 text-indigo-600" />
          Contexte du TP : Projet taskflow-git-training
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
          Vous devez mettre en place le dépôt d'entraînement et simuler le travail des 3 agents spécialisés. L'objectif est de maîtriser les commandes d'inspection et de gestion des branches sans jamais exécuter d'opération destructive ou non concertée.
        </p>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/60">
            <span className="text-xs font-bold text-indigo-900 block mb-1">
              Règle absolue de sécurité du TP :
            </span>
            <p className="text-xs text-indigo-800 leading-relaxed">
              Aucune opération de <code>git merge</code>, <code>git rebase</code> ou <code>git push</code> ne doit être effectuée sans autorisation explicite du Project Manager humain. Vous allez analyser et préparer les décisions d'intégration, mais sans forcer les fusions.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          WORKBENCH INTERACTIF DU TP (8 PHASES GUIDÉES)
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-slate-800 bg-slate-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-lg font-black text-indigo-200">
              Atelier Guidé — Les 8 Étapes du TP
            </h3>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
            Étape {activeStep} sur {tpSteps.length}
          </span>
        </div>

        {/* Stepper des 8 étapes */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tpSteps.map(step => (
            <button
              key={step.num}
              onClick={() => {
                setActiveStep(step.num);
                setShowSolution(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeStep === step.num
                  ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeStep === step.num ? 'bg-emerald-300' : 'bg-slate-400'}`} />
              Phase {step.num}
            </button>
          ))}
        </div>

        {/* Conteneur de l'étape active */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Mission de l'étape
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mb-2">
              {curr.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {curr.objective}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-300 block">
              Travail à réaliser :
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {curr.work}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800 space-y-1">
            <span className="text-slate-400 block mb-1 font-sans font-bold text-xs">Commandes Shell & Git recommandées :</span>
            <pre className="whitespace-pre-wrap">{curr.cli}</pre>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-300 block">
              Questions d'analyse :
            </span>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              {curr.questions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>

          {/* Bouton de révélation du corrigé */}
          <div className="pt-2">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-700 hover:bg-indigo-600 text-white transition-colors flex items-center gap-2 shadow-sm"
            >
              <Icon name={showSolution ? 'eye-off' : 'eye'} className="w-4 h-4" />
              <span>{showSolution ? 'Masquer la solution' : 'Consulter le corrigé officiel de cette étape'}</span>
            </button>
          </div>

          {/* Bloc Corrigé */}
          {showSolution && (
            <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-slate-200 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                <span>Corrigé de l'Étape {curr.num}</span>
              </div>
              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-200">
                {curr.solution}
              </div>
            </div>
          )}

          {/* Navigation dans les étapes */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={activeStep === 1}
              onClick={() => {
                setActiveStep(prev => Math.max(1, prev - 1));
                setShowSolution(false);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
            >
              ← Étape précédente
            </button>
            <span className="text-xs text-slate-400">
              {activeStep} / {tpSteps.length}
            </span>
            <button
              disabled={activeStep === tpSteps.length}
              onClick={() => {
                setActiveStep(prev => Math.min(tpSteps.length, prev + 1));
                setShowSolution(false);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
            >
              Étape suivante →
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          GRILLE D'ÉVALUATION DU TP (SUR 100 POINTS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="award" className="w-6 h-6 text-indigo-600" />
            Grille d'évaluation du TP (100 points)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Barème de notation officiel du Module 3
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                1. Initialisation correcte du dépôt Git
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                10 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Initialisation avec <code>git init</code>, branche principale <code>main</code> et premier commit propre.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                2. Création et organisation des 3 branches
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                10 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Nommage conventionnel respecté : <code>feature/backend-structure</code>, <code>feature/frontend-structure</code>, <code>test/initial-checks</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                3. Simulation des contributions indépendantes
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                15 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Commits bien attribués à chaque branche respective sans polluer la branche <code>main</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                4. Création et qualité des commits
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                10 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Messages au format conventionnel (<code>docs:</code>, <code>test:</code>) et commits atomiques.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                5. Compréhension et diagnostic des conflits
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                20 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Identification des modifications concurrentes sur <code>taskflow-rules.md</code> et proposition d'un arbitrage métier.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                6. Comparaison argumentée Merge vs Rebase
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                15 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Justification du choix d'intégration et explicitation des risques de réécriture de SHA sur les branches partagées.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                7. Qualité du compte rendu et respect du verrou PM
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                20 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Rapport de contrôle exhaustif avec statut <em>'En attente d'autorisation formelle du PM'</em> scrupuleusement respecté.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          QUIZ DE SYNTHÈSE DU TP (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz de synthèse du TP — Module 3
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez votre assimilation de l'ensemble des mécanismes Git multi-agents (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi les dossiers vides 'backend/' et 'frontend/' ne sont-ils pas enregistrés lors du premier commit ?",
              options: [
                "Parce que Git ne suit jamais les dossiers, mais uniquement les fichiers et leur chemin",
                "Parce qu'il faut obligatoirement payer une licence GitHub",
                "Parce que le système de fichiers Windows interdit les dossiers vides",
                "Parce qu'il fallait utiliser la commande 'git add --folders'"
              ],
              correctIndex: 0,
              explanation: "Git stocke des blobs de fichiers. Un dossier vide n'a pas de contenu et n'est pas pris en compte dans l'arbre d'objets."
            },
            {
              id: 2,
              question: "Quelle commande permet d'afficher l'arbre complet de toutes les branches et commits de manière compacte et graphique ?",
              options: [
                "git show --all",
                "git log --oneline --graph --decorate --all",
                "git status --tree",
                "git branch --graph"
              ],
              correctIndex: 1,
              explanation: "Cette combinaison d'options est la plus puissante pour visualiser les embranchements et fusions du projet."
            },
            {
              id: 3,
              question: "Dans le TP, que constate-t-on sur la branche Backend par rapport à la branche Frontend ?",
              options: [
                "Elles partagent exactement le même dossier physique à chaque seconde",
                "Leurs commits B et C sont totalement indépendants et ne sont visibles que sur leur branche respective",
                "Git a automatiquement supprimé la branche Backend",
                "Les deux branches ont été fusionnées sans intervention"
              ],
              correctIndex: 1,
              explanation: "Chaque branche isole son historique : le commit Backend n'apparaît pas sur la branche Frontend."
            },
            {
              id: 4,
              question: "Quelle commande permet d'examiner les commits présents sur la branche Frontend mais absents de main ?",
              options: [
                "git log main..feature/frontend-structure --oneline",
                "git diff main",
                "git branch --diff",
                "git push origin main"
              ],
              correctIndex: 0,
              explanation: "La syntaxe 'brancheA..brancheB' liste les commits accessibles depuis B mais pas depuis A."
            },
            {
              id: 5,
              question: "Lors de la simulation du conflit sur 'taskflow-rules.md', quelle en est l'origine exacte ?",
              options: [
                "Un bug interne de l'IDE",
                "Les deux branches ont ajouté et modifié le même fichier avec des valeurs différentes ('pending' vs 'todo') depuis leur ancêtre commun",
                "Une panne du réseau local",
                "L'absence de fichier .gitignore"
              ],
              correctIndex: 1,
              explanation: "Deux modifications divergentes sur la même ligne empêchent Git d'arbitrer automatiquement."
            },
            {
              id: 6,
              question: "Comment doit être résolu le conflit sur la valeur du statut d'une tâche ?",
              options: [
                "En choisissant au hasard la version du Frontend",
                "Par un arbitrage fonctionnel du PM concertant le Backend (statut technique) et le Frontend (libellé d'affichage)",
                "En supprimant le fichier taskflow-rules.md",
                "En désactivant Git"
              ],
              correctIndex: 1,
              explanation: "La résolution d'un conflit de données est une décision produit et métier, pas un simple choix technique arbitraire."
            },
            {
              id: 7,
              question: "Pourquoi est-il strictement interdit d'effectuer un rebase sur une branche partagée avec un autre agent ?",
              options: [
                "Parce que le rebase crée de nouveaux hashs SHA, brisant la synchronisation avec le clone de l'autre agent",
                "Parce que Git bloque l'exécution sur Windows",
                "Parce que le rebase efface le code source",
                "Parce que les commits deviennent anonymes"
              ],
              correctIndex: 0,
              explanation: "Réécrire des commits publics force les collaborateurs à gérer des conflits artificiels complexes."
            },
            {
              id: 8,
              question: "Dans le compte rendu de revue, que doit indiquer le Reviewer si une branche a modifié un fichier hors de sa mission ?",
              options: [
                "Valider immédiatement sans poser de question",
                "Émettre un avis défavorable ou 'Corrections demandées' exigeant la justification ou le retrait de la modification hors périmètre",
                "Supprimer le compte de l'agent",
                "Fusionner de force sur main"
              ],
              correctIndex: 1,
              explanation: "Toute modification non mandatée (hors périmètre) doit être contestée avant intégration pour préserver l'étanchéité."
            },
            {
              id: 9,
              question: "Pourquoi le compte rendu final doit-il mentionner 'Autorisation d'intégration : En attente' ?",
              options: [
                "Parce que le projet est abandonné",
                "Parce que seule la validation formelle et souveraine du Project Manager humain peut autoriser la fusion dans main",
                "Parce que Git est trop lent",
                "Parce que les tests n'ont pas de valeur"
              ],
              correctIndex: 1,
              explanation: "L'avis consultatif du Reviewer ne vaut pas autorisation : le PM humain est le seul décisionnaire de la livraison."
            },
            {
              id: 10,
              question: "Quelle est la leçon essentielle de ce TP d'orchestration Git ?",
              options: [
                "Les agents IA peuvent gérer le dépôt en toute autonomie sans supervision humaine",
                "Git est le socle technique indispensable, mais la sécurité du projet repose sur la rigueur du contrôle, des tests et de la gouvernance humaine",
                "Il vaut mieux ne pas utiliser de branches",
                "Un commit suffit pour certifier qu'une application est exempte de bugs"
              ],
              correctIndex: 1,
              explanation: "Git fournit les outils d'isolation et d'audit, mais l'arbitrage et le verrouillage restent la responsabilité humaine."
            }
          ]}
        />
      </section>
    </div>
  );
};
