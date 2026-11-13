'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // Simulateur interactif de cycle de vie et coordination d'une tâche
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [hasSimulatedBlock, setHasSimulatedBlock] = useState<boolean>(false);

  const workflowStages = [
    {
      id: 'todo',
      status: '1. À faire (Todo)',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      owner: 'Team Leader IA & PM humain',
      action: 'Découpage et cadrage de la mission',
      description: "La mission 'Suppression sécurisée d'une tâche dans TaskFlow' est rédigée dans le backlog avec ses critères d'acceptation, ses dépendances et son périmètre de fichiers.",
      gate: "Validation du périmètre par le PM avant distribution.",
      gitState: "Branche dédiée 'feature/task-deletion' créée à partir de 'develop'."
    },
    {
      id: 'inprogress',
      status: '2. En cours (In Progress)',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      owner: 'Agent Backend & Agent Frontend',
      action: 'Implémentation isolée sous contrat',
      description: "Le Backend développe la route DELETE /api/tasks/:id avec code HTTP 200/204. En parallèle, le Frontend prépare le dialogue de confirmation UI en se basant sur le contrat d'API.",
      gate: "Auto-vérification locale obligatoire par chaque agent avant soumission.",
      gitState: "Commits atomiques locaux avec messages conventionnels (ex: 'feat(backend): add DELETE route')."
    },
    {
      id: 'waiting',
      status: '3. En attente (Waiting)',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      owner: 'Agent Frontend (en pause)',
      action: 'Attente du contrat validé ou mock serveur',
      description: "Le Frontend a terminé la maquette du composant DeleteModal mais attend que le Backend fournisse les types d'erreur TypeScript pour finaliser la gestion des cas limites.",
      gate: "Déblocage immédiat dès que l'Agent Backend livre l'interface de réponse.",
      gitState: "Branche locale gelée, aucune modification sans contrat."
    },
    {
      id: 'blocked',
      status: '4. Bloquée (Blocked - Cas d\'incident)',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      owner: 'Team Leader IA (Arbitrage)',
      action: 'Gestion d\'une anomalie ou d\'un conflit de droits',
      description: "L'Agent Backend tente de modifier un fichier partagé de configuration centrale sans autorisation. Le système bloque la tentative. Le Team Leader analyse l'incident et rappelle la règle.",
      gate: "Résolution sans contournement : correction ciblée ou escalade au PM humain.",
      gitState: "Verrouillage Git actif : aucun commit non autorisé sur la branche principale."
    },
    {
      id: 'done',
      status: '5. Terminée (Done - Agent)',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      owner: 'Agents Spécialisés',
      action: 'Livrables produits et auto-vérifiés',
      description: "Les codes Backend et Frontend sont écrits, les tests unitaires locaux passent à 100%. L'agent rédige son compte rendu formel et transmet la mission au Team Leader.",
      gate: "Livrable complet + compte rendu rédigé = éligible à la vérification qualité.",
      gitState: "Branche prête pour audit, 'git push' strictement sous contrôle."
    },
    {
      id: 'review',
      status: '6. À vérifier (Review & QA)',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      owner: 'Agent QA & Agent Reviewer',
      action: 'Tests automatisés, audit de code et conformité',
      description: "Le QA exécute la suite de tests d'intégration (Supertest + React Testing Library). Le Reviewer audite la lisibilité, les fuites de mémoire, l'immutabilité et le respect des conventions.",
      gate: "Double feu vert obligatoire (QA = 0 régression, Reviewer = code propre).",
      gitState: "Pull Request #18 ouverte en lecture seule pour audit."
    },
    {
      id: 'accepted',
      status: '7. Validée (Accepted & Clôturée)',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      owner: 'Project Manager humain (Souverain)',
      action: 'Validation finale et intégration Git autorisée',
      description: "Le Team Leader synthétise le rapport d'audit. Le PM humain valide la fonctionnalité TaskFlow et autorise formellement l'opération 'git merge feature/task-deletion into develop'.",
      gate: "Seul le PM humain possède le pouvoir de signer la livraison définitive.",
      gitState: "Merge exécuté avec succès, branche de travail archivée."
    }
  ];

  const currentStage = workflowStages[activeStageIndex];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 2 — Organisation d'une équipe IA
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 7 — Définir les règles de coordination et de validation
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Dans une équipe multi-agents, l'efficacité ne dépend pas uniquement de la vitesse à laquelle les agents écrivent du code. Elle repose sur des <strong>règles strictes de coordination, de suivi et de validation</strong>. Sans un protocole rigoureux, les agents risquent de travailler sur des versions incompatibles, d'écraser des fichiers ou de déclarer une tâche terminée alors qu'elle contient des régressions majeures.
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
              1. Maîtriser le cycle de vie à 7 statuts d'une mission
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprendre la signification et la transition rigoureuse entre chaque statut : <em>À faire</em>, <em>En cours</em>, <em>En attente</em>, <em>Bloquée</em>, <em>Terminée</em>, <em>À vérifier</em> et <em>Validée</em>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Orchestrer la chaîne de validation en 4 niveaux
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Articuler l'auto-vérification du développeur, les tests de non-régression du QA, la revue de code du Reviewer et l'acceptation finale par le PM humain.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Verrouiller les opérations Git sensibles
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Faire respecter la règle fondamentale : aucun agent ni Team Leader ne peut exécuter <code>git merge</code>, <code>git rebase</code> ou <code>git push</code> sans accord explicite du PM.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 7.2 : POURQUOI COORDONNER ET VALIDER ?
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              7.2
            </span>
            La coordination d'une équipe multi-agents
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Garantir la cohérence globale d'un projet distribué
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Travailler avec plusieurs agents IA permet de paralléliser les efforts, mais introduit une complexité organisationnelle immédiate. Sans règles explicites de coordination, deux agents peuvent développer des fonctionnalités concurrentes avec des structures de données incompatibles, ou l'un peut commencer à coder avant que l'autre n'ait défini l'architecture indispensable.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                <Icon name="git-branch" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                La synchronisation temporelle (Séquentiel vs Parallèle)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Certaines missions sont strictement séquentielles : l'Agent Backend ne peut pas implémenter un contrôleur avant que l'Architect n'ait formalisé le modèle de données. D'autres sont parallélisables : l'intégration CSS d'un bouton et l'optimisation d'une requête SQL peuvent avancer simultanément, à condition qu'elles ne touchent aucun fichier commun.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                <Icon name="layers" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                La prévention des conflits de code
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              La coordination impose qu'aucun agent ne travaille dans le répertoire d'un autre sans contrat formalisé. Cela évite les écrasements intempestifs de commits et garantit que chaque modification s'intègre harmonieusement dans l'arbre Git du projet.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <Icon name="shield-check" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Le maintien de la qualité continue
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Une tâche n'est jamais déclarée terminée par simple affirmation de l'agent qui l'a codée. Elle doit franchir un sas de vérification indépendant (QA pour l'exécution et Reviewer pour l'audit du code source).
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.3 : RÈGLES DE LANCEMENT DES MISSIONS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              7.3
            </span>
            Les règles de lancement d'une mission
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Les prérequis non négociables avant toute exécution
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Avant de basculer une tâche au statut <code>En cours</code>, le Team Leader IA doit impérativement vérifier trois conditions préalables. Si l'une de ces conditions manque, la mission doit être mise <code>En attente</code>.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border-l-4 border-l-blue-500 border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                Condition 1 : Clarté absolue de l'objectif
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-800 shrink-0">
                Spécification
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              L'énoncé de la mission ne doit laisser place à aucune ambiguïté. Il doit spécifier la fonctionnalité exacte, le comportement attendu et les critères de réussite mesurables.
            </p>
            <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700">
              Exemple : "Créer le endpoint DELETE /api/tasks/:id renvoyant HTTP 200 avec la tâche supprimée ou HTTP 404 si l'id n'existe pas."
            </div>
          </div>

          <div className="p-5 rounded-2xl border-l-4 border-l-purple-500 border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                Condition 2 : Disponibilité de toutes les données et dépendances
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-purple-100 text-purple-800 shrink-0">
                Dépendances
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              L'agent ne doit pas démarrer tant que les fichiers prérequis ne sont pas disponibles. Si l'Agent Frontend doit consommer une API, les types TypeScript d'interface doivent être préalablement rédigés ou simulés.
            </p>
            <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700">
              Règle : "Si le type Task n'est pas exporté par l'Architect, la mission Frontend reste au statut En attente."
            </div>
          </div>

          <div className="p-5 rounded-2xl border-l-4 border-l-emerald-500 border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                Condition 3 : Périmètre et permissions strictement délimités
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                Sécurité
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              La mission doit explicitement lister les dossiers dans lesquels l'agent est autorisé à écrire. Toute modification en dehors de ce périmètre constituera une violation de protocole.
            </p>
            <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700">
              Périmètre autorisé : backend/src/controllers/ et backend/src/services/ (Interdit : frontend/, package.json, .git/).
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.4 & 7.5 : LES 7 STATUTS NORMALISÉS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              7.5
            </span>
            Le cycle de vie d'une mission en 7 statuts
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Un tableau d'avancement transparent et sans ambiguïté
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour éviter que des agents ne se marchent sur les pieds ou que le Project Manager perde la visibilité sur l'état réel du code, chaque tâche transite obligatoirement par <strong>7 statuts normalisés</strong>.
        </p>

        {/* SIMULATEUR INTERACTIF DU WORKFLOW */}
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Interactif — Cycle de Vie d'une Tâche TaskFlow
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900/80 text-indigo-300 border border-indigo-700">
              Feature : Suppression de tâche
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Sélectionnez une étape du cycle de vie pour examiner le rôle actif, l'état de la branche Git, les critères de validation et le comportement attendu de l'équipe :
          </p>

          {/* Stepper des 7 statuts */}
          <div className="flex flex-wrap gap-2 mb-6">
            {workflowStages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 ${
                  activeStageIndex === idx
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  stage.id === 'blocked' ? 'bg-rose-400' :
                  stage.id === 'accepted' ? 'bg-emerald-400' :
                  stage.id === 'review' ? 'bg-purple-400' :
                  stage.id === 'inprogress' ? 'bg-blue-400' :
                  stage.id === 'waiting' ? 'bg-amber-400' :
                  'bg-slate-400'
                }`} />
                {stage.status.split(' ')[1]}
              </button>
            ))}
          </div>

          {/* Carte de détail de l'étape sélectionnée */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800/90 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold border ${currentStage.badgeColor}`}>
                  {currentStage.status}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-2">
                  Action : {currentStage.action}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Responsable actif</span>
                <span className="text-xs sm:text-sm font-semibold text-indigo-300">
                  {currentStage.owner}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
                <p className="text-slate-200 leading-relaxed">
                  <strong className="text-indigo-300">Description : </strong>
                  {currentStage.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-indigo-950/60 border border-indigo-800/40">
                  <span className="text-xs font-bold text-indigo-300 block mb-1">
                    🎯 Sas de contrôle & Critère de sortie :
                  </span>
                  <span className="text-xs text-slate-300">{currentStage.gate}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/40">
                  <span className="text-xs font-bold text-amber-300 block mb-1">
                    🔒 Statut Git & Politiques de branche :
                  </span>
                  <span className="text-xs text-slate-300 font-mono">{currentStage.gitState}</span>
                </div>
              </div>
            </div>

            {/* Navigation rapide dans le stepper */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/80">
              <button
                disabled={activeStageIndex === 0}
                onClick={() => setActiveStageIndex(prev => Math.max(0, prev - 1))}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
              >
                ← Statut précédent
              </button>
              <span className="text-xs text-slate-400">
                Étape {activeStageIndex + 1} / {workflowStages.length}
              </span>
              <button
                disabled={activeStageIndex === workflowStages.length - 1}
                onClick={() => setActiveStageIndex(prev => Math.min(workflowStages.length - 1, prev + 1))}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
              >
                Statut suivant →
              </button>
            </div>
          </div>
        </div>

        {/* Détails complémentaires sur les statuts */}
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Pourquoi distinguer "Terminée" et "Validée" ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              C'est la distinction cardinale d'un système multi-agents fiable. Un agent qui déclare sa tâche "Terminée" indique seulement qu'il a fini d'écrire son code. La tâche n'est <strong>Validée</strong> qu'après audit indépendant et feu vert du Project Manager humain.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.6 & 7.7 : PROCESSUS DE VALIDATION EN 4 NIVEAUX
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              7.7
            </span>
            Le processus de validation en 4 niveaux
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Une chaîne de contrôle sans faille avant toute intégration
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour qu'une modification rejoigne la branche principale (<code>develop</code> ou <code>main</code>), elle doit franchir successivement <strong>quatre niveaux de validation</strong>. Aucun niveau ne peut être sauté.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Niveau 1 */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Niveau 1 — Auto-vérification par l'Agent Développeur
                </h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-800 shrink-0">
                Backend / Frontend
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              L'agent qui produit le code doit impérativement exécuter une vérification locale avant de passer la main :
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside bg-slate-50 p-3 rounded-xl border border-slate-200">
              <li>Compilation TypeScript sans aucune erreur (<code>tsc --noEmit</code>).</li>
              <li>Exécution réussie des tests unitaires locaux liés à la tâche.</li>
              <li>Vérification que seuls les fichiers du périmètre autorisé ont été touchés (<code>git status</code>).</li>
            </ul>
          </div>

          {/* Niveau 2 */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Niveau 2 — Tests fonctionnels et non-régression par l'Agent QA
                </h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-purple-100 text-purple-800 shrink-0">
                Agent QA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              L'Agent QA applique un regard critique externe et indépendant du développeur :
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside bg-purple-50/50 p-3 rounded-xl border border-purple-200">
              <li>Exécution de la suite complète de tests de non-régression du projet.</li>
              <li>Test des cas limites (ID introuvable, données malformées, chaînes vides, caractères spéciaux).</li>
              <li>Vérification du respect strict des critères d'acceptation du cahier des charges.</li>
            </ul>
          </div>

          {/* Niveau 3 */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Niveau 3 — Audit de code et sécurité par l'Agent Reviewer
                </h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-rose-100 text-rose-800 shrink-0">
                Agent Reviewer
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Le Reviewer ne fait pas que regarder si le code compile, il en évalue la pérennité :
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside bg-rose-50/50 p-3 rounded-xl border border-rose-200">
              <li>Lisibilité du code, absence de duplication (DRY) et modularité.</li>
              <li>Respect des conventions de nommage et typage strict sans abus de <code>any</code>.</li>
              <li>Absence de failles évidentes (injections, fuites mémoires, variables globales).</li>
            </ul>
          </div>

          {/* Niveau 4 */}
          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Niveau 4 — Acceptation souveraine et fusion Git par le PM Humain
                </h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-200 text-emerald-900 shrink-0">
                PM Humain
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              Le Team Leader IA présente la synthèse globale au Project Manager. Ce dernier est le seul habilité à :
            </p>
            <ul className="text-xs sm:text-sm text-slate-800 space-y-1.5 list-disc list-inside bg-white p-3 rounded-xl border border-emerald-300">
              <li>Valider formellement la mission au statut <code>Validée</code>.</li>
              <li>Donner l'accord final pour le <code>git merge</code> dans la branche de développement.</li>
              <li>Autoriser le déploiement ou l'intégration continue.</li>
            </ul>
          </div>
        </div>

        <Callout type="danger" title="Règle d'or absolue : Le verrou Git">
          <p className="text-xs sm:text-sm leading-relaxed">
            <strong>Aucun agent IA (y compris le Team Leader) ne possède le droit d'exécuter <code>git merge</code>, <code>git rebase</code> ou <code>git push origin</code> sans accord explicite et écrit du Project Manager humain.</strong> Toute tentative d'écrasement ou de merge autonome est une anomalie critique d'orchestration.
          </p>
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 7.12 : EXEMPLE COMPLET TASKFLOW (PAS-À-PAS EN 9 ÉTAPES)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              7.12
            </span>
            Exemple pas-à-pas complet : Suppression d'une tâche dans TaskFlow
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Les 9 étapes chronologiques de la coordination en situation réelle
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour concrétiser ces principes, examinons le déroulement exact de la fonctionnalité <strong>Suppression d'une tâche</strong> dans notre application TaskFlow :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="text-sm font-bold text-slate-900">PM humain → Team Leader IA</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Le PM demande l'ajout de la suppression sécurisée d'une tâche avec dialogue de confirmation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="text-sm font-bold text-slate-900">Team Leader → Architect</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              L'Architect spécifie la route <code>DELETE /api/tasks/:id</code> et confirme le contrat d'interface TypeScript.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="text-sm font-bold text-slate-900">Team Leader → Agent Backend</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              L'Agent Backend implémente la suppression dans le service et le contrôleur avec gestion de l'erreur 404.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">4</span>
              <h4 className="text-sm font-bold text-slate-900">Agent Backend → Team Leader (Done)</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              L'Agent Backend transmet son rapport : route fonctionnelle, tests unitaires passés à 100%. Statut : <em>Terminée</em>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">5</span>
              <h4 className="text-sm font-bold text-slate-900">Team Leader → Agent Frontend</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              L'Agent Frontend intègre l'icône de corbeille et le dialogue de confirmation sur <code>TaskCard.tsx</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">6</span>
              <h4 className="text-sm font-bold text-slate-900">Team Leader → Agent QA</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              L'Agent QA vérifie que la suppression d'une tâche met à jour le compteur global et que l'annulation ferme la modale sans supprimer.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">7</span>
              <h4 className="text-sm font-bold text-slate-900">Team Leader → Agent Reviewer</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Le Reviewer audite le code produit et valide la propreté des hooks React et la sécurité des paramètres d'URL.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">8</span>
              <h4 className="text-sm font-bold text-slate-900">Team Leader → PM humain (Rapport de synthèse)</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Le Team Leader soumet le bilan consolidé avec tous les feux au vert pour décision.
            </p>
          </div>

          <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/40 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">9</span>
              <h4 className="text-sm font-bold text-emerald-950">PM humain : Validation formelle & Merge</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Le PM signe la livraison : statut <code>Validée</code>. Le merge Git dans <code>develop</code> est autorisé et exécuté.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.13 & 7.14 : BONNES PRATIQUES & SYNTHÈSE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              7.14
            </span>
            Synthèse des règles d'or de coordination
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/60">
            <h4 className="text-sm font-bold text-indigo-950 mb-1">
              1. Clarté dès le lancement
            </h4>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Ne lancez jamais un agent sans contrat d'interface formalisé et sans périmètre de fichiers strictement verrouillé.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/60">
            <h4 className="text-sm font-bold text-purple-950 mb-1">
              2. Séparation de la production et du contrôle
            </h4>
            <p className="text-xs text-purple-900 leading-relaxed">
              L'agent qui code ne valide jamais lui-même son travail. La vérification appartient au QA et au Reviewer.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60">
            <h4 className="text-sm font-bold text-emerald-950 mb-1">
              3. Souveraineté du PM humain sur Git
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Le merge et le push sur les branches principales sont réservés à l'autorisation explicite du Project Manager humain.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.15 : QUIZ DE VALIDATION (12 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 7
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez votre maîtrise des règles de coordination et de validation (12 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi la coordination est-elle indispensable dans une équipe multi-agents ?",
              options: [
                "Pour obliger les agents à attendre sans raison",
                "Pour éviter les conflits de code, les régressions et les incohérences techniques",
                "Pour supprimer le besoin d'un Project Manager",
                "Pour ralentir volontairement le projet"
              ],
              correctIndex: 1,
              explanation: "Sans coordination, les agents travaillent sur des versions incompatibles et risquent d'écraser mutuellement leur code."
            },
            {
              id: 2,
              question: "Quels sont les prérequis obligatoires avant de passer une mission au statut 'En cours' ?",
              options: [
                "Clarté de l'objectif, dépendances disponibles et périmètre de fichiers délimité",
                "Aucun prérequis, l'agent improvise",
                "Avoir déjà fusionné la branche principale",
                "L'absence totale de documentation"
              ],
              correctIndex: 0,
              explanation: "Une mission ne peut démarrer que si elle est spécifiée, sans dépendance bloquante et avec un périmètre clair."
            },
            {
              id: 3,
              question: "Quelle est la différence fondamentale entre le statut 'Terminée' et le statut 'Validée' ?",
              options: [
                "Il n'existe aucune différence",
                "'Terminée' signifie que le développeur a fini son code ; 'Validée' signifie qu'elle a franchi l'audit et reçu l'acceptation formelle du PM",
                "'Terminée' est réservé au PM et 'Validée' aux agents",
                "'Validée' signifie que le code contient encore des bugs"
              ],
              correctIndex: 1,
              explanation: "Un agent ne fait que déclarer sa tâche terminée. Seule la validation formelle après tests et revue clôture la mission."
            },
            {
              id: 4,
              question: "Que doit faire un agent dont la tâche passe au statut 'Bloquée' ?",
              options: [
                "Modifier les permissions de force pour continuer",
                "Supprimer les tests unitaires qui échouent",
                "Alerter le Team Leader et attendre la résolution sans contourner les règles",
                "Inventer de fausses données"
              ],
              correctIndex: 2,
              explanation: "Le respect des règles prime. Un blocage doit être remonté au Team Leader ou au PM sans tentative de contournement."
            },
            {
              id: 5,
              question: "Qui compose le deuxième niveau de la chaîne de validation ?",
              options: [
                "L'Agent Backend seul",
                "L'Agent QA avec les tests fonctionnels et de non-régression",
                "Le client final uniquement",
                "L'Architect système"
              ],
              correctIndex: 1,
              explanation: "Le niveau 2 est assuré par le QA pour vérifier la non-régression et le respect des critères fonctionnels."
            },
            {
              id: 6,
              question: "Quel rôle assure le niveau 3 de validation (audit de code et sécurité) ?",
              options: [
                "L'Agent Reviewer",
                "Le stagiaire",
                "Le compilateur seul",
                "L'Agent Frontend"
              ],
              correctIndex: 0,
              explanation: "L'Agent Reviewer contrôle la propreté, la maintenabilité, le typage strict et la sécurité du code."
            },
            {
              id: 7,
              question: "Quelle autorité possède le droit exclusif de valider la livraison finale et d'autoriser le 'git merge' ?",
              options: [
                "L'Agent Backend",
                "L'Agent QA",
                "Le Project Manager humain",
                "N'importe quel agent de l'équipe"
              ],
              correctIndex: 2,
              explanation: "Le PM humain est souverain. Aucun merge vers la branche principale n'a lieu sans son feu vert explicite."
            },
            {
              id: 8,
              question: "Que stipule la règle du 'Verrou Git' pour les agents IA ?",
              options: [
                "Les agents peuvent pusher sur main à tout moment",
                "Aucun agent ni Team Leader ne peut faire de git merge ou push sans accord explicite du PM",
                "Git est interdit dans les projets multi-agents",
                "Les agents doivent supprimer le dossier .git"
              ],
              correctIndex: 1,
              explanation: "Le verrou Git protège la branche principale des écrasements et des dégradations non contrôlées."
            },
            {
              id: 9,
              question: "Dans l'exemple de suppression de tâche TaskFlow, pourquoi l'Agent Frontend intervient-il après l'Architect et le Backend ?",
              options: [
                "Parce qu'il a besoin du contrat d'interface API validé pour typer son composant et appeler la route",
                "Parce que le Frontend travaille plus lentement",
                "Parce qu'il n'aime pas le code Backend",
                "C'est un choix purement aléatoire"
              ],
              correctIndex: 0,
              explanation: "Le Frontend s'appuie sur le contrat d'API et les types créés par l'Architect et le Backend pour intégrer l'interface."
            },
            {
              id: 10,
              question: "À quel statut se trouve une mission dont les spécifications attendent la fin d'une autre tâche ?",
              options: [
                "En cours",
                "En attente (Waiting)",
                "Validée",
                "Terminée"
              ],
              correctIndex: 1,
              explanation: "Le statut 'En attente' signale explicitement qu'une dépendance extérieure bloque le démarrage de la mission."
            },
            {
              id: 11,
              question: "Que doit contenir le compte rendu d'un développeur pour que sa tâche passe au statut 'À vérifier' ?",
              options: [
                "Un simple message 'C'est bon'",
                "La liste des fichiers modifiés, les résultats des tests unitaires et les vérifications effectuées",
                "Le code source entier collé dans le chat",
                "Une demande de congés"
              ],
              correctIndex: 1,
              explanation: "Un compte rendu factuel et structuré est indispensable pour que le QA et le Reviewer puissent faire leur audit."
            },
            {
              id: 12,
              question: "Si l'Agent QA découvre qu'une tâche supprime une note sans demander confirmation, que se passe-t-il ?",
              options: [
                "Il valide quand même la tâche",
                "Il rejette la validation, rédige un rapport de bug et la tâche repasse au statut En cours pour correction",
                "Il supprime l'application",
                "Il modifie lui-même le code frontend"
              ],
              correctIndex: 1,
              explanation: "Le non-respect d'un critère d'acceptation entraîne un rejet QA et un retour au statut En cours pour correction par le spécialiste compétent."
            }
          ]}
        />
      </section>
    </div>
  );
};