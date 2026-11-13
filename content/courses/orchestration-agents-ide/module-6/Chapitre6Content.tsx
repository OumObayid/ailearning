'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  // Simulateur interactif : Matrice RACI & Rôles des Agents
  const [selectedTask, setSelectedTask] = useState<'contract' | 'backend_route' | 'frontend_ui' | 'qa_test' | 'code_review'>('contract');

  const taskAssignments = {
    contract: {
      name: "T1 : Définir le contrat REST de changement de statut",
      responsable: "Architect",
      contributeurs: "Backend & Frontend (consultés)",
      validateur: "Project Manager humain (arbitrage final)",
      perimetre: "docs/architecture/api-contracts.md",
      explication: "L'Architect conçoit la structure des données et l'API. Les développeurs sont consultés pour faisabilité, mais l'arbitrage engage le PM humain."
    },
    backend_route: {
      name: "T2 : Développer la route PATCH /api/tasks/:id/status",
      responsable: "Backend",
      contributeurs: "Architect (pour questions de contrat)",
      validateur: "Reviewer (revue technique) & QA (recette)",
      perimetre: "backend/src/routes/ et backend/src/controllers/",
      explication: "L'Agent Backend implémente la route Express en mémoire selon le contrat sans déborder sur l'UI ni sur les types partagés."
    },
    frontend_ui: {
      name: "T3 : Développer le sélecteur de statut dans l'interface",
      responsable: "Frontend",
      contributeurs: "Architect (contrat API)",
      validateur: "Reviewer & QA",
      perimetre: "frontend/src/components/TaskItem.tsx",
      explication: "L'Agent Frontend crée les contrôles React et gère les états visuels. Il ne touche pas aux fichiers du serveur."
    },
    qa_test: {
      name: "T5 : Exécuter la suite de tests d'intégration",
      responsable: "QA",
      contributeurs: "Backend & Frontend (pour correction d'anomalies)",
      validateur: "Team Leader (consolidation) & PM humain",
      perimetre: "tests/integration/ et reports/qa-reports.md",
      explication: "L'Agent QA vérifie objectivement les comportements réels et documente les anomalies sans modifier le code de production."
    },
    code_review: {
      name: "T6 : Examiner les modifications de code produites",
      responsable: "Reviewer",
      contributeurs: "Backend & Frontend (auteurs du code)",
      validateur: "Project Manager humain",
      perimetre: "reports/reviews/code-review.md",
      explication: "Le Reviewer fournit un avis consultatif indépendant sur la qualité, la sécurité et les conventions, sans appliquer les corrections lui-même."
    }
  };

  const activeTaskData = taskAssignments[selectedTask];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 6 &bull; Chapitre 6
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Matrice RACI & Rôles Spécialisés
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          6.6 — Attribuer les missions aux agents
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Après avoir découpé le projet en tâches, défini les livrables et analysé les dépendances, le Team Leader doit attribuer chaque mission à l'agent dont le rôle, les compétences et le périmètre correspondent au travail demandé. Une mauvaise distribution engendre des doublons, des chevauchements de code et des conflits de responsabilité.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle des responsabilités et validation souveraine :</p>
        <p>
          Un agent est responsable de réaliser sa mission et de livrer un résultat conforme. Cependant, aucun agent ne s'auto-valide et aucun agent ne valide les décisions stratégiques : <strong>seul le Project Manager humain est habilité à valider les Pull Requests et autoriser un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code></strong>.
        </p>
      </Callout>

      {/* Section 6.2 : Les 6 profils experts TaskFlow */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="users" className="w-5 h-5 text-primary-600 shrink-0" />
          6.2 — Les Responsabilités des 6 Agents de l'Équipe TaskFlow
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Chaque agent possède une vocation précise au sein de l'organisation :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-indigo-700 dark:text-indigo-400">Team Leader (Coordination & Orchestration)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Découpe les besoins en tâches, rédige les prompts de mission, surveille le graphe de dépendances, synchronise les agents et prépare les synthèses pour le PM humain. Ne modifie pas le code source.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">Architect (Architecture & Contrats)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Conçoit l'architecture applicative, documente les contrats d'API (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">api-contracts.md</code>) et définit les interfaces TypeScript partagées.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">Backend (API & Logique Serveur)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Développe les routes Express, les middlewares de validation de données et la persistance mémoire dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">backend/src/</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-purple-700 dark:text-purple-400">Frontend (Interface Utilisateur React)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Crée les composants d'interface, formulaires et indicateurs avec React et Tailwind CSS dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">frontend/src/</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-amber-700 dark:text-amber-400">QA (Quality Assurance & Recette)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Prépare les scénarios de tests, exécute les tests automatisés et consigne les anomalies détectées dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">tests/</code> et <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">reports/</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-rose-700 dark:text-rose-400">Reviewer (Audit de Code & Conformité)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Examine les modifications de code, vérifie le respect des conventions du projet et rédige un avis consultatif dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">reports/reviews/</code> sans modifier directement le code.
            </p>
          </div>
        </div>
      </div>

      {/* Section 6.4 : Responsable, Contributeur et Validateur */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="briefcase" className="w-5 h-5 text-emerald-600 shrink-0" />
          6.4 — Distinguer Responsable, Contributeur et Validateur
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour éviter toute ambiguïté sur une même tâche, appliquez cette distinction :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Le Responsable (R - Responsible)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent unique qui réalise la tâche et produit le livrable dans son périmètre (ex: l'Agent Backend pour la route Express).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Le Contributeur (C - Consulted / Contributor)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent qui apporte des informations ou une expertise complémentaire (ex: l'Architect apportant des précisions sur le contrat).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Le Validateur (A - Accountable / Approver)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'autorité qui prononce l'acceptation définitive. Dans TaskFlow, le <strong>Project Manager humain</strong> est le validateur final des livrables et des merges Git.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire RACI &bull; Dispatching des Tâches
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur d'Attribution RACI pour TaskFlow
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Sélectionnez une tâche du sprint TaskFlow pour visualiser l'attribution des rôles et l'étanchéité des périmètres.
          </p>
        </div>

        {/* Sélection des tâches */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tâche à attribuer :</span>
          {(Object.keys(taskAssignments) as Array<keyof typeof taskAssignments>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedTask(key)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                selectedTask === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {taskAssignments[key].name}
            </button>
          ))}
        </div>

        {/* Détails de l'attribution */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Agent Responsable :</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shrink-0">
              {activeTaskData.responsable}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contributeurs :</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {activeTaskData.contributeurs}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Validateur :</span>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
              {activeTaskData.validateur}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Périmètre de dossiers exclusif :</span>
            <p className="text-xs font-mono text-indigo-700 dark:text-indigo-300">
              {activeTaskData.perimetre}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {activeTaskData.explication}
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
            Quiz de validation du Chapitre 6.6
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre maîtrise de la répartition des tâches, de la matrice de responsabilités et de l'étanchéité des compétences.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal de l'attribution des missions ?",
              options: [
                "Confier chaque mission à l'agent dont le rôle correspond au travail demandé.",
                "Confier toutes les missions au Team Leader.",
                "Permettre à chaque agent de modifier toutes les parties du projet.",
                "Remplacer les objectifs par des noms d'agents."
              ],
              correctIndex: 0,
              explanation: "L'attribution consiste à confier chaque mission à l'agent expert dont le rôle, les compétences et le périmètre correspondent au livrable demandé."
            },
            {
              id: 2,
              question: "Quel agent est principalement responsable du développement des routes API dans TaskFlow ?",
              options: [
                "Frontend.",
                "Reviewer.",
                "Backend.",
                "QA."
              ],
              correctIndex: 2,
              explanation: "L'Agent Backend prend en charge la logique serveur, les routes Express et la gestion des données."
            },
            {
              id: 3,
              question: "Quel est le rôle principal du Team Leader ?",
              options: [
                "Développer toutes les fonctionnalités.",
                "Coordonner les missions et suivre le travail des agents.",
                "Remplacer le Project Manager humain.",
                "Réaliser uniquement les tests."
              ],
              correctIndex: 1,
              explanation: "Le Team Leader orchestre l'équipe, distribue les prompts de mission, suit les dépendances et prépare les synthèses sans coder lui-même."
            },
            {
              id: 4,
              question: "Quelle est la différence entre un responsable et un contributeur ?",
              options: [
                "Le responsable réalise la mission, tandis que le contributeur apporte une aide complémentaire.",
                "Le responsable valide toutes les décisions humaines.",
                "Le contributeur remplace systématiquement le responsable.",
                "Les deux rôles sont toujours identiques."
              ],
              correctIndex: 0,
              explanation: "Le responsable porte la charge et la responsabilité du livrable final. Le contributeur est consulté pour enrichir la solution."
            },
            {
              id: 5,
              question: "Quel agent est principalement chargé de vérifier les fonctionnalités et d'identifier les anomalies ?",
              options: [
                "Architect.",
                "QA.",
                "Team Leader.",
                "Frontend."
              ],
              correctIndex: 1,
              explanation: "L'Agent QA vérifie objectivement le comportement du logiciel, rédige les tests et documente les anomalies constatées."
            },
            {
              id: 6,
              question: "Pourquoi faut-il désigner un responsable principal pour une mission ?",
              options: [
                "Pour éviter les doublons et clarifier les responsabilités.",
                "Pour empêcher toute collaboration.",
                "Pour supprimer les contributeurs.",
                "Pour éviter les tests."
              ],
              correctIndex: 0,
              explanation: "Un responsable unique évite les zones grises, les conflits de réécriture et garantit qu'un agent déterminé rend compte de la complétion."
            },
            {
              id: 7,
              question: "Une mission possède une dépendance non satisfaite. Que doit faire le Team Leader ?",
              options: [
                "Lancer immédiatement la mission sans tenir compte du blocage.",
                "Vérifier les prérequis et organiser le démarrage au moment approprié.",
                "Supprimer automatiquement la mission.",
                "Confier la mission à tous les agents."
              ],
              correctIndex: 1,
              explanation: "Le Team Leader doit constater la dépendance bloquante, synchroniser la livraison du prérequis et ne déclencher la mission qu'au moment opportun."
            },
            {
              id: 8,
              question: "Quel agent est principalement chargé d'examiner les modifications produites par les autres agents ?",
              options: [
                "Reviewer.",
                "Frontend.",
                "Backend.",
                "Team Leader."
              ],
              correctIndex: 0,
              explanation: "Le Reviewer effectue un audit de code indépendant, vérifie les conventions, la maintenabilité et la sécurité."
            },
            {
              id: 9,
              question: "Pourquoi faut-il adapter l'attribution des missions au travail en parallèle ?",
              options: [
                "Pour lancer simultanément des tâches compatibles en respectant leurs dépendances.",
                "Pour obliger tous les agents à travailler sur les mêmes fichiers.",
                "Pour supprimer les contrats techniques.",
                "Pour éviter toute coordination."
              ],
              correctIndex: 0,
              explanation: "L'attribution doit tenir compte des tâches indépendantes pour faire travailler les spécialistes simultanément dès que le contrat est figé."
            },
            {
              id: 10,
              question: "Qui conserve les décisions et validations importantes dans l'organisation TaskFlow ?",
              options: [
                "Le Reviewer.",
                "Le Backend.",
                "Le Project Manager humain.",
                "Le QA."
              ],
              correctIndex: 2,
              explanation: "La gouvernance de TaskFlow repose sur la souveraineté humaine : le Project Manager humain conserve le pouvoir décisionnel et de validation."
            }
          ]}
        />
      </div>
    </div>
  );
};
