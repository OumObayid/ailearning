'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  // Simulateur interactif : Les 4 Phases du Sprint TaskFlow
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | 4>(2);

  const sprintPhases = {
    1: {
      title: "Phase 1 — Cadrage & Spécification (Séquentielle)",
      activeAgents: "Architect (Action principale) & Team Leader",
      waitingAgents: "Backend, Frontend, QA (En attente du contrat)",
      description: "L'Architect explore le besoin et rédige docs/architecture/api-contracts.md. Aucune implémentation de code n'est lancée afin de ne pas travailler sur des hypothèses fragiles.",
      deliverable: "Contrat REST validé (PATCH /api/tasks/:id/status, payload JSON, codes 200, 400, 404).",
      checkpoint: "Point de contrôle 1 : Validation formelle du contrat par le Team Leader."
    },
    2: {
      title: "Phase 2 — Développement Parallèle (Simultanée & Isolée)",
      activeAgents: "Backend, Frontend, QA (En exécution simultanée)",
      waitingAgents: "Reviewer (Attend les livrables d'implémentation)",
      description: "Le contrat est figé. Backend implémente la route en mémoire (Worktree 1), Frontend crée le sélecteur React (Worktree 2) et QA rédige les scénarios de test Vitest (Worktree 3).",
      deliverable: "Routes Express + Composants UI React + Suite de tests automatisés.",
      checkpoint: "Point de contrôle 2 : Vérification que les deux équipes utilisent la même version du contrat."
    },
    3: {
      title: "Phase 3 — Intégration, Recette & Audit (Convergence)",
      activeAgents: "QA (Tests d'intégration) & Reviewer (Audit de code)",
      waitingAgents: "Backend, Frontend (En attente des retours de recette)",
      description: "Le QA exécute les tests de bout en bout et vérifie la synchronisation des compteurs. Le Reviewer audite la qualité du code et l'absence de régression.",
      deliverable: "Rapport d'intégration QA + Rapport d'audit de code du Reviewer.",
      checkpoint: "Point de contrôle 3 : Traitement des éventuelles anomalies constatées."
    },
    4: {
      title: "Phase 4 — Synthèse & Escalade PM (Clôture)",
      activeAgents: "Team Leader (Consolidation) & Project Manager Humain",
      waitingAgents: "Tous les agents spécialistes (Missions closes)",
      description: "Le Team Leader consolide l'ensemble des résultats factuels, vérifie les critères d'acceptation et soumet la demande formelle d'autorisation au PM humain.",
      deliverable: "Rapport de synthèse final & Demande d'autorisation de merge/push.",
      checkpoint: "Point de contrôle 4 : Validation souveraine par le Project Manager humain."
    }
  };

  const currentPhaseData = sprintPhases[activePhase];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 7 &bull; Chapitre 4
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Ordonnancement, Synchronisation & Worktrees
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          7.4 — Coordonner les travaux séquentiels et parallèles
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          L'orchestration d'une équipe d'agents IA est un jeu d'équilibriste entre rigueur séquentielle et accélération parallèle. Si certaines phases exigent un passage de relais strict, d'autres tirent parti de la simultanéité sur des espaces de travail isolés. Découvrez comment articuler ces modes et synchroniser les agents aux points de convergence.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle de fin de parallélisme :</p>
        <p>
          Faire avancer les agents en parallèle sur des Git Worktrees accélère le développement, mais la phase d'intégration finale reste sous le contrôle exclusif de l'humain. <strong>Aucun agent ne doit réaliser de <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans autorisation expresse du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 4.1 & 4.2 : Séquentiel vs Parallèle */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="arrows-right-left" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Les Deux Modes d'Ordonnancement Complémentaires</h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">Le Travail Séquentiel : Sécuriser les Fondations</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Les tâches s'enchaînent l'une après l'autre. Indispensable pour poser les bases : clarification du besoin &rarr; contrat REST rédigé par l'Architect &rarr; validation du modèle. Évite que les agents ne développent sur des suppositions contradictoires.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">Le Travail Parallèle : Accélérer la Réalisation</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Dès que le contrat commun est acté, Backend, Frontend et QA progressent en simultané dans des espaces de travail isolés (Git Worktrees), divisant le temps de cycle de la fonctionnalité par deux.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4.7 : Prévenir les 4 pièges du parallélisme */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="exclamation-triangle" className="w-5 h-5 text-amber-600 shrink-0" /> 2. Prévenir les 4 Risques Majeurs du Travail Parallèle</h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">1. Modifications concurrentes sur les mêmes fichiers</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Prévention : Attribuer des zones de travail étanches et utiliser des branches/Worktrees dédiés.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">2. Résultats incompatibles par divergence d'énumérations</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Prévention : Partager la même version du contrat (ex: <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">"in_progress"</code> et non <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">"in-progress"</code>).</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">3. Changement de spécification en cours de vol non communiqué</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Prévention : Le Team Leader répercute immédiatement toute modification aux agents impactés.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">4. Surcharge de coordination</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Prévention : Ne pas multiplier les sous-agents pour des micro-tâches de quelques lignes.</p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Console de Déroulement &bull; Cycle de Vie TaskFlow
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur d'Ordonnancement et Synchronisation de Sprint
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Naviguez entre les 4 phases pour visualiser les agents mobilisés, les livrables attendus et les points de contrôle du Team Leader.
          </p>
        </div>

        {/* Boutons de sélection de phase */}
        <div className="flex flex-wrap gap-2 w-full">
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              onClick={() => setActivePhase(p as 1 | 2 | 3 | 4)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                activePhase === p
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              Phase {p}
            </button>
          ))}
        </div>

        {/* Diagnostic de la phase */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
            {currentPhaseData.title}
          </h4>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Agents actifs :</span>
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              {currentPhaseData.activeAgents}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Agents en attente :</span>
            <p className="text-xs sm:text-sm text-slate-500">
              {currentPhaseData.waitingAgents}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
            {currentPhaseData.description}
          </p>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {currentPhaseData.checkpoint}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Livrable : {currentPhaseData.deliverable}
            </p>
          </div>
        </div>
      </div>

      {/* Quiz officiel */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Évaluation des connaissances
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de validation du Chapitre 4
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Testez votre compréhension du travail séquentiel, du parallélisme avec Worktrees et des points de synchronisation.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'un travail séquentiel ?",
              options: [
                "Plusieurs agents réalisent exactement la même mission.",
                "Toutes les missions commencent au même moment.",
                "Les missions sont exécutées dans un ordre déterminé en fonction de leurs dépendances.",
                "Les agents travaillent sans coordination."
              ],
              correctIndex: 2,
              explanation: "Le travail séquentiel consiste à respecter un ordre strict entre les missions. Une tâche débute lorsque les résultats préalables sont stabilisés."
            },
            {
              id: 2,
              question: "Dans quel cas deux missions peuvent-elles être réalisées en parallèle ?",
              options: [
                "Lorsqu'elles peuvent avancer indépendamment et que leurs dépendances sont satisfaites.",
                "Lorsqu'elles modifient obligatoirement les mêmes fichiers.",
                "Lorsqu'aucun contrat technique n'est disponible.",
                "Lorsque les agents utilisent des instructions différentes."
              ],
              correctIndex: 0,
              explanation: "Deux missions peuvent avancer en parallèle si elles ne dépendent pas d'un livrable encore indisponible et si leurs périmètres sont étanches."
            },
            {
              id: 3,
              question: "Dans TaskFlow, pourquoi Backend et Frontend doivent-ils utiliser le même contrat API ?",
              options: [
                "Pour leur permettre de modifier les mêmes fichiers.",
                "Pour éviter de réaliser des tests.",
                "Pour supprimer les dépendances entre les missions.",
                "Pour garantir que leurs développements respectent les mêmes règles de communication."
              ],
              correctIndex: 3,
              explanation: "Le contrat API fixe les formats des requêtes, réponses et codes HTTP : les deux agents doivent s'y conformer pour que l'intégration fonctionne."
            },
            {
              id: 4,
              question: "Que doit faire le Team Leader lorsqu'une dépendance indispensable n'est pas satisfaite ?",
              options: [
                "Demander à l'agent d'inventer le résultat manquant.",
                "Attendre le résultat nécessaire ou limiter la mission à une préparation indépendante.",
                "Lancer tous les agents simultanément.",
                "Supprimer la dépendance du tableau de suivi."
              ],
              correctIndex: 1,
              explanation: "Le Team Leader doit respecter les dépendances critiques. Il attend le prérequis ou n'autorise qu'une exploration sans impact."
            },
            {
              id: 5,
              question: "À quoi sert un diagramme de dépendances ?",
              options: [
                "À mesurer la vitesse de chaque agent.",
                "À afficher les conversations ouvertes dans Antigravity.",
                "À représenter les relations et l'ordre nécessaire entre les missions.",
                "À remplacer les critères d'acceptation."
              ],
              correctIndex: 2,
              explanation: "Le diagramme de dépendances visualise le graphe acyclique des missions et met en relief le chemin critique."
            },
            {
              id: 6,
              question: "Quel est le principal intérêt d'un Worktree dans un travail parallèle ?",
              options: [
                "Il permet d'isoler les modifications dans un espace de travail distinct.",
                "Il supprime automatiquement toutes les dépendances techniques.",
                "Il garantit que les modifications de plusieurs agents seront toujours compatibles.",
                "Il remplace les vérifications avant intégration."
              ],
              correctIndex: 0,
              explanation: "Un Git Worktree fournit un répertoire physique distinct associé au même dépôt, évitant les collisions de fichiers sur disque."
            },
            {
              id: 7,
              question: "Deux agents doivent modifier simultanément un même fichier partagé. Quelle est la meilleure réaction ?",
              options: [
                "Les laisser travailler sans leur transmettre d'informations.",
                "Leur demander d'utiliser des noms de variables différents uniquement.",
                "Considérer que Git empêchera tous les problèmes.",
                "Organiser les responsabilités et les modalités de modification avant de poursuivre."
              ],
              correctIndex: 3,
              explanation: "Des écritures concurrentes sur un même fichier provoquent des conflits : il faut clarifier les responsabilités et sérialiser les modifications."
            },
            {
              id: 8,
              question: "Vrai ou faux : dans Google Antigravity, les sous-agents reçoivent automatiquement tout l'historique de conversation de leur agent parent.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Les sous-agents Antigravity débutent avec un contexte indépendant et ne reçoivent pas automatiquement l'historique de l'agent parent."
            },
            {
              id: 9,
              question: "Quel travail QA peut-il commencer pendant que Backend et Frontend développent leurs contributions ?",
              options: [
                "Valider définitivement le fonctionnement de l'application sans exécution.",
                "Fusionner les branches des deux agents.",
                "Préparer les scénarios de test à partir des exigences et du contrat disponible.",
                "Modifier librement les fichiers Backend et Frontend."
              ],
              correctIndex: 2,
              explanation: "L'Agent QA peut préparer et documenter l'ensemble de ses scénarios de test dès que le contrat technique est arrêté."
            },
            {
              id: 10,
              question: "Vrai ou faux : lancer davantage d'agents en parallèle garantit toujours une meilleure productivité.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Multiplier excessivement les agents augmente le coût de coordination et les risques de divergence sans bénéfice proportionnel."
            }
          ]}
        />
      </div>
    </div>
  );
};
