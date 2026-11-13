'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  // Simulateur interactif du TP Worktrees Multi-Agents
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const tpSteps = [
    {
      num: 1,
      title: "Étape 1 — Préparation et initialisation du dépôt principal",
      objective: "Initialiser taskflow-worktrees-training et sceller le contrat initial.",
      icon: "terminal",
      work: "Créer le répertoire principal, initialiser le dépôt Git sur la branche `main`, ajouter `README.md` et `taskflow-contract.md` ('Statuts autorisés : à faire, en cours, terminée'), puis sceller le premier commit.",
      cli: `mkdir taskflow-worktrees-training && cd taskflow-worktrees-training
git init -b main
echo "TaskFlow - Environnement de formation Git Worktrees" > README.md
echo "Statuts autorisés : à faire, en cours, terminée." > taskflow-contract.md
git add README.md taskflow-contract.md
git commit -m "chore: initialiser le projet TaskFlow"`,
      questions: [
        "Quelle commande confirme que le répertoire de travail est propre ?",
        "Sur quelle branche doit pointer le commit initial ?"
      ],
      solution: `La commande 'git status' doit afficher 'nothing to commit, working tree clean'.
Le commit initial est scellé sur la branche de référence 'main'.`
    },
    {
      num: 2,
      title: "Étape 2 — Création des 4 Worktrees pour les agents",
      objective: "Monter 4 répertoires physiques distincts rattachés à main.",
      icon: "folder-plus",
      work: "Depuis taskflow-worktrees-training, exécuter les 4 commandes `git worktree add -b` pour créer les répertoires frères Backend, Frontend, QA et Architect.",
      cli: `git worktree add -b feature/backend-api ../taskflow-backend-training main
git worktree add -b feature/frontend-ui ../taskflow-frontend-training main
git worktree add -b test/taskflow-tests ../taskflow-qa-training main
git worktree add -b docs/architecture ../taskflow-architecture-training main
git worktree list`,
      questions: [
        "Pourquoi utilise-t-on le préfixe '../' dans les chemins ?",
        "Pourquoi les 5 Worktrees affichent-ils initialement le même hash SHA ?"
      ],
      solution: `Le préfixe '../' crée les dossiers au même niveau que le dossier principal dans le dossier parent 'projects'.
Les 5 worktrees partagent le même commit initial 'a1b2c3d' car aucun agent n'a encore commité de nouveau code.`
    },
    {
      num: 3,
      title: "Étape 3 — Sanity Check des 4 environnements",
      objective: "Vérifier le chemin physique et la branche active de chaque espace.",
      icon: "check-circle",
      work: "Naviguez dans chaque répertoire pour exécuter `pwd`, `git branch --show-current` et `git status`. Assurez-vous que chaque espace est propre.",
      cli: `cd ../taskflow-backend-training && pwd && git branch --show-current
cd ../taskflow-frontend-training && pwd && git branch --show-current
cd ../taskflow-qa-training && pwd && git branch --show-current
cd ../taskflow-architecture-training && pwd && git branch --show-current
cd ../taskflow-worktrees-training`,
      questions: [
        "Quelle branche doit être active dans taskflow-backend-training ?",
        "Quel est l'état du répertoire principal taskflow-worktrees-training ?"
      ],
      solution: `La branche 'feature/backend-api' est active sur le Backend.
Le répertoire principal reste positionné sur 'main' avec un working tree propre.`
    },
    {
      num: 4,
      title: "Étape 4 & 5 — Affectation et création des livrables",
      objective: "Rédiger les fichiers de spécification dans les Worktrees dédiés.",
      icon: "file-text",
      work: "Créer `backend-api.md` dans taskflow-backend-training, `frontend-ui.md` dans taskflow-frontend-training, `test-plan.md` dans taskflow-qa-training, et `architecture.md` dans taskflow-architecture-training.",
      cli: `# Dans taskflow-backend-training :
echo "API TaskFlow: GET, POST, PUT, DELETE, PATCH /status" > backend-api.md

# Dans taskflow-frontend-training :
echo "Interface TaskFlow: TaskList, TaskForm, TaskItem, TaskFilters" > frontend-ui.md

# Dans taskflow-qa-training :
echo "Plan de tests TaskFlow: Création, Affichage, Suppression, Statut" > test-plan.md

# Dans taskflow-architecture-training :
echo "Architecture TaskFlow: React, Express, REST, Vitest" > architecture.md`,
      questions: [
        "Le fichier 'backend-api.md' apparaît-il dans le dossier taskflow-frontend-training ?",
        "Pourquoi cette étanchéité est-elle essentielle pour les agents IA ?"
      ],
      solution: `Non, le fichier n'existe que dans le dossier physique Backend.
Cette étanchéité empêche les agents de modifier accidentellement les fichiers des autres chantiers en parallèle.`
    },
    {
      num: 5,
      title: "Étape 6 — Enregistrement des commits par chaque agent",
      objective: "Sceller les contributions atomiques sur chaque branche respective.",
      icon: "git-commit",
      work: "Dans chaque Worktree, préparez le fichier avec `git add` et scellez le commit avec un message conventionnel explicite.",
      cli: `cd ../taskflow-backend-training && git add backend-api.md && git commit -m "feat: décrire les routes de l'API"
cd ../taskflow-frontend-training && git add frontend-ui.md && git commit -m "feat: décrire les composants de l'interface"
cd ../taskflow-qa-training && git add test-plan.md && git commit -m "test: préparer le plan de tests"
cd ../taskflow-architecture-training && git add architecture.md && git commit -m "docs: décrire l'architecture TaskFlow"`,
      questions: [
        "Où sont enregistrés ces 4 nouveaux commits ?",
        "La branche 'main' a-t-elle avancé d'un commit ?"
      ],
      solution: `Les commits sont scellés dans la base d'objets du dépôt partagé (.git).
Non, 'main' est restée sur son commit initial ; seules les 4 branches de mission ont avancé chacune d'un commit.`
    },
    {
      num: 6,
      title: "Étape 7 — Simulation de modifications concurrentes",
      objective: "Provoquer une divergence sur le contrat commun taskflow-contract.md.",
      icon: "alert-triangle",
      work: "Dans taskflow-backend-training, remplacez le statut par `todo, in_progress, done`. Dans taskflow-frontend-training, remplacez indépendamment par `À faire, En cours, Terminée`. Commitez les deux modifications.",
      cli: `cd ../taskflow-backend-training
echo "Statuts autorisés : todo, in_progress, done." > taskflow-contract.md
git add taskflow-contract.md && git commit -m "feat: proposer les statuts techniques des tâches"

cd ../taskflow-frontend-training
echo "Statuts autorisés : À faire, En cours, Terminée." > taskflow-contract.md
git add taskflow-contract.md && git commit -m "feat: proposer les libellés des statuts"`,
      questions: [
        "Pourquoi ces deux commits vont-ils entrer en conflit lors du merge ?",
        "S'agit-il d'un conflit technique insoluble ou d'une divergence de besoin ?"
      ],
      solution: `Un conflit de fusion surviendra car les deux branches ont remplacé la même ligne du fichier depuis leur ancêtre commun.
C'est une divergence de besoin : le backend a pensé aux valeurs de base de données et le frontend aux libellés d'affichage.`
    },
    {
      num: 7,
      title: "Étape 8 — Audit des branches depuis le dépôt principal",
      objective: "Inspecter les diffs avec la syntaxe triple-points.",
      icon: "search",
      work: "Revenez dans taskflow-worktrees-training et comparez chaque branche avec main en utilisant `git diff main...branche`.",
      cli: `cd ../taskflow-worktrees-training
git diff main...feature/backend-api -- taskflow-contract.md
git diff main...feature/frontend-ui -- taskflow-contract.md
git log --oneline main..feature/backend-api`,
      questions: [
        "Combien de commits propres à sa branche possède l'Agent Backend ?",
        "Que met en évidence la comparaison des deux diffs ?"
      ],
      solution: `L'Agent Backend possède 2 commits propres (livrable d'API + modification du contrat).
Les diffs prouvent que la même ligne est modifiée avec deux intentions métier complémentaires.`
    },
    {
      num: 8,
      title: "Étape 9 — Plan d'arbitrage fonctionnel & Verrou PM",
      objective: "Proposer la résolution unifiée sans lancer d'opération de fusion.",
      icon: "shield-check",
      work: "Rédigez la proposition de contrat unifié conciliant valeurs techniques (todo, in_progress, done) et libellés d'interface. Rappelez l'interdiction de merger sans accord formel du PM.",
      cli: `# RÈGLE DE SÉCURITÉ : Ne lancez pas de merge ni de rebase dans ce TP !
# Contrat unifié préparé pour arbitrage PM :
# Valeurs internes : todo | in_progress | done
# Libellés affichés : À faire | En cours | Terminée`,
      questions: [
        "Pourquoi les fusions sont-elles interdites dans cet exercice ?",
        "Qui doit valider la proposition d'arbitrage du contrat ?"
      ],
      solution: `Cette restriction fait respecter la règle de gouvernance : le PM humain est le seul garant de l'intégrité de la branche main.
Le Team Leader consulte Backend et Frontend, et soumet le contrat au PM humain pour validation formelle.`
    },
    {
      num: 9,
      title: "Étape 10 — Bilan de cycle de vie et maintenance",
      objective: "Vérifier la pérennité des Worktrees et formuler les règles de suppression.",
      icon: "trash-2",
      work: "Exécutez `git worktree list`. Expliquez pourquoi les 4 Worktrees doivent être conservés tant que les arbitrages PM ne sont pas signés, et détaillez l'usage futur de `git worktree remove`.",
      cli: `git worktree list
git status`,
      questions: [
        "Pourquoi ne faut-il pas supprimer les Worktrees immédiatement ?",
        "Que ferait la commande 'git worktree prune' si un dossier était déplacé manuellement ?"
      ],
      solution: `Les espaces doivent être conservés car les contributions n'ont pas encore été fusionnées dans main et peuvent nécessiter des ajustements.
'git worktree prune' nettoierait les métadonnées obsolètes orphelines dans .git/worktrees/.`
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
            <span>Travail Pratique de Fin de Module • Module 4</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Durée estimée : ~1 h 30 min</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          TP de fin de module : Organiser plusieurs espaces de travail Git pour simuler le développement parallèle
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Dans cet atelier guidé, vous allez mettre en place l'architecture complète de <strong>Git Worktrees</strong> pour l'équipe TaskFlow. Vous initialiserez le dépôt principal, déploierez quatre espaces de travail indépendants (Backend, Frontend, QA, Architect), simulerez un conflit d'édition concurrent sur le contrat commun et préparerez la stratégie d'arbitrage sans enfreindre le verrou de sécurité du Project Manager humain.
        </p>
      </div>

      {/* =========================================================================
          CADRE DU TP
         ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Icon name="info" className="w-5 h-5 text-indigo-600" />
          Organisation physique du laboratoire (Dossier parent /projects/)
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
          Vous manipulez 5 répertoires reliés au même dépôt Git : le répertoire central <code>taskflow-worktrees-training</code> (sur <code>main</code>) et 4 répertoires de mission secondaires.
        </p>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/60">
            <span className="text-xs font-bold text-indigo-900 block mb-1">
              Règle souveraine du TP :
            </span>
            <p className="text-xs text-indigo-800 leading-relaxed">
              Toutes les contributions sont préparées et auditées avec rigueur. <strong>Aucun merge, rebase ou push n'est exécuté dans ce TP sans l'autorisation explicite du PM humain.</strong> Vous démontrez votre capacité d'analyse et de diagnostic d'architecte.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          WORKBENCH GUIDÉ (9 PHASES)
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-slate-800 bg-slate-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-lg font-black text-indigo-200">
              Atelier Guidé — Les 9 Jalons du TP
            </h3>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
            Jalon {activeStep} sur {tpSteps.length}
          </span>
        </div>

        {/* Stepper */}
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
              Jalon {step.num}
            </button>
          ))}
        </div>

        {/* Conteneur de l'étape active */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Objectif opérationnel
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
              Instructions détaillées :
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {curr.work}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800 space-y-1">
            <span className="text-slate-400 block mb-1 font-sans font-bold text-xs">Commandes Shell & Git du jalon :</span>
            <pre className="whitespace-pre-wrap">{curr.cli}</pre>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-300 block">
              Questions de contrôle :
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
              <span>{showSolution ? 'Masquer la solution' : 'Consulter le corrigé officiel de ce jalon'}</span>
            </button>
          </div>

          {/* Bloc Corrigé */}
          {showSolution && (
            <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-slate-200 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                <span>Corrigé officiel du Jalon {curr.num}</span>
              </div>
              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-200">
                {curr.solution}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={activeStep === 1}
              onClick={() => {
                setActiveStep(prev => Math.max(1, prev - 1));
                setShowSolution(false);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
            >
              ← Jalon précédent
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
              Jalon suivant →
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
            Barème officiel de certification Module 4
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                1. Initialisation propre du dépôt et premier commit
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                10 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Dépôt initialisé sur <code>main</code> avec <code>README.md</code> et <code>taskflow-contract.md</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                2. Création et vérification des 4 Worktrees
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                15 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Emplacements physiques corrects (<code>../nom-dossier</code>) et branches bien associées.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                3. Affectation cohérente des missions
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                15 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Rôles, chemins physiques, branches et mandats d'instructions clairement formalisés.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                4. Création des livrables et commits atomiques
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                25 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              4 fichiers rédigés dans les bons dossiers et 4 commits de livrables scellés sur les branches respectives.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                5. Analyse des modifications concurrentes et plan de résolution
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                25 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Diagnostic précis de la divergence sur le contrat commun et proposition d'arbitrage unifiant valeurs techniques et libellés UI.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                6. Bilan de maintenance et respect du verrou PM
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                10 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Maîtrise du cycle de vie des Worktrees et respect absolu de l'interdiction de merger sans accord du PM humain.
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
            Quiz de synthèse du TP — Module 4
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez votre assimilation de l'orchestration multi-worktrees (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi les 5 Worktrees créés dans le TP affichent-ils initialement le même hash de commit dans 'git worktree list' ?",
              options: [
                "Parce que Git est tombé en panne",
                "Parce que les 4 nouvelles branches ont été instanciées directement à partir du commit initial de main sans nouveau commit",
                "Parce que les Worktrees dupliquent les commits",
                "Parce qu'il n'y a qu'un seul fichier sur le disque"
              ],
              correctIndex: 1,
              explanation: "Tant qu'aucun agent n'a créé de nouveau commit, toutes les branches pointent sur le même commit de départ."
            },
            {
              id: 2,
              question: "Lorsqu'un agent crée 'backend-api.md' dans taskflow-backend-training, pourquoi ce fichier n'est-il pas visible dans taskflow-frontend-training ?",
              options: [
                "Parce que les deux espaces sont des répertoires physiques hermétiquement isolés sur le disque",
                "Parce que le système d'exploitation a caché le fichier",
                "Parce qu'il faut obligatoirement taper git push",
                "Parce que le Frontend a refusé le fichier"
              ],
              correctIndex: 0,
              explanation: "C'est l'atout majeur des Worktrees : chaque agent dispose de son propre disque sans interférence."
            },
            {
              id: 3,
              question: "Dans le TP, combien de commits propres possède la branche Backend après l'étape 7 ?",
              options: [
                "1 commit",
                "2 commits (le livrable backend-api.md et la modification du contrat)",
                "0 commit",
                "5 commits"
              ],
              correctIndex: 1,
              explanation: "L'Agent Backend a créé 2 commits successifs sur sa branche dédiée."
            },
            {
              id: 4,
              question: "Quelle commande permet d'examiner spécifiquement les modifications apportées à taskflow-contract.md par l'Agent Frontend ?",
              options: [
                "git diff main...feature/frontend-ui -- taskflow-contract.md",
                "git log --all",
                "git branch --show",
                "git worktree prune"
              ],
              correctIndex: 0,
              explanation: "La syntaxe avec '-- nom-fichier' isole les modifications propres à ce fichier précis."
            },
            {
              id: 5,
              question: "Quelle est la cause exacte du conflit d'édition simulé à l'étape 7 ?",
              options: [
                "L'Agent Backend et l'Agent Frontend ont tous deux remplacé la même ligne du fichier commun avec des valeurs différentes",
                "Une panne réseau entre les deux répertoires",
                "Une mauvaise syntaxe dans package.json",
                "La suppression accidentelle de la branche main"
              ],
              correctIndex: 0,
              explanation: "Modifier la même ligne à partir d'un ancêtre commun crée un conflit lors du merge."
            },
            {
              id: 6,
              question: "Comment le Team Leader IA et le PM humain résolvent-ils ce conflit de contrat de manière intelligente ?",
              options: [
                "En supprimant la version Frontend",
                "En dissociant les valeurs techniques internes (API/DB) des libellés conviviaux d'affichage (UI)",
                "En choisissant au hasard la version Backend",
                "En abandonnant le projet TaskFlow"
              ],
              correctIndex: 1,
              explanation: "Une résolution d'architecte réconcilie les deux besoins au lieu d'en sacrifier un."
            },
            {
              id: 7,
              question: "Pourquoi est-il formellement interdit d'exécuter 'git merge' ou 'git push' pendant ce TP ?",
              options: [
                "Parce que Git bloque les fusions sur Windows",
                "Pour respecter la règle d'or de gouvernance : le PM humain est le seul habilité à autoriser formellement l'intégration",
                "Parce que les disques durs sont pleins",
                "Parce que les tests n'ont aucune utilité"
              ],
              correctIndex: 1,
              explanation: "La séparation entre production autonome et intégration validée est le fondement du cours."
            },
            {
              id: 8,
              question: "Pourquoi les 4 Worktrees doivent-ils être conservés à la fin du TP plutôt que d'être supprimés immédiatement ?",
              options: [
                "Parce que Git interdit d'effacer des dossiers",
                "Parce que les contributions n'ont pas encore été fusionnées dans main et peuvent nécessiter des corrections",
                "Parce qu'ils prennent 0 octet",
                "Pour faire joli dans l'explorateur"
              ],
              correctIndex: 1,
              explanation: "On ne supprime un espace qu'après fusion définitive et archivage complet de la mission."
            },
            {
              id: 9,
              question: "Quelle est la commande appropriée pour nettoyer les informations orphelines si un dossier de Worktree a été effacé manuellement ?",
              options: [
                "git worktree prune",
                "git worktree add",
                "git branch -D",
                "git log"
              ],
              correctIndex: 0,
              explanation: "git worktree prune nettoie la base administrative .git/worktrees/ des répertoires disparus."
            },
            {
              id: 10,
              question: "Quelle est la conclusion majeure de ce TP sur l'orchestration multi-agents ?",
              options: [
                "Git Worktrees suffit à lui seul sans aucune organisation humaine",
                "Git Worktrees résout l'isolation physique des fichiers, mais la cohérence repose sur les contrats d'interface et l'arbitrage humain souverain",
                "Il ne faut jamais faire travailler plus d'un agent",
                "Un bon agent doit toujours forcer les merges"
              ],
              correctIndex: 1,
              explanation: "L'outil technique (Worktrees) offre l'isolation ; l'orchestration humaine garantit la cohérence du produit."
            }
          ]}
        />
      </section>
    </div>
  );
};
