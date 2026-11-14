'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  // Simulateur de granularité et méthode de décomposition
  const [selectedGranularity, setSelectedGranularity] = useState<'coarse' | 'optimal' | 'micro'>('optimal');
  const [activeMethod, setActiveMethod] = useState<'functional' | 'layer' | 'deliverable'>('layer');

  const granularityScenarios = {
    coarse: {
      title: "1. Granularité Trop Grossière (« Monolithique »)",
      taskExample: "« Développer toute la gestion des tâches de TaskFlow de A à Z. »",
      verdict: "❌ INEXPLOITABLE PAR UN AGENT IA",
      diagnosis: "Englobe backend, frontend, tests et persistance. L'agent va rapidement saturer sa fenêtre de contexte, faire des suppositions risquées et produire du code fragmenté difficile à valider.",
      recommendation: "Découper impérativement en sous-tâches par domaine technique ou par livrable."
    },
    optimal: {
      title: "2. Granularité Optimale (Idéale pour Agents Spécialisés)",
      taskExample: "« T4 : Développer la route Express POST /api/tasks avec validation du titre et persistance en mémoire. »",
      verdict: "✅ GRANULARITÉ RECOMMANDÉE",
      diagnosis: "Périmètre circonscrit à un domaine (Backend), livrable clairement défini (contrôleur + route + tests unitaires), vérifiable par un rapport de test et revue de code sans ambiguïté.",
      recommendation: "Ce niveau de tâche permet une attribution nette à l'Agent Backend avec une mission chirurgicale."
    },
    micro: {
      title: "3. Granularité Trop Détaillée (« Micro-Management »)",
      taskExample: "« Ouvrir taskRoutes.ts &rarr; importer express &rarr; taper router.post &rarr; enregistrer le fichier. »",
      verdict: "⚠️ SURCHARGE ORGANISATIONNELLE INUTILE",
      diagnosis: "Multiplication disproportionnée des tickets. Le coût de coordination et de prompts devient plus lourd que le travail lui-même sans apporter de sécurité supplémentaire.",
      recommendation: "Laisser l'agent exécuter la séquence d'implémentation logique à l'intérieur d'une tâche bien délimitée."
    }
  };

  const activeGranularityData = granularityScenarios[selectedGranularity];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 6 &bull; Chapitre 2
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Décomposition WBS & Granularité
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          6.2 — Décomposer un projet en tâches
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Une fois le besoin logiciel analysé, il est impossible de confier le développement d'un bloc monolithique à un seul agent IA sans risquer l'échec. La décomposition consiste à fractionner le travail en unités plus petites, cohérentes et traçables. Apprenez à distinguer l'objectif, la tâche et la mission, et découvrez le juste calibrage de granularité.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Rappel de gouvernance Git :</p>
        <p>
          Même lors du découpage fin en tâches techniques, gardez à l'esprit qu'aucune tâche ne doit autoriser un agent à faire un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code>. Ces actions relèvent exclusivement de la souveraineté du <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 2.2 : Objectif, Tâche et Mission */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="layers" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Distinguer l'Objectif, la Tâche et la Mission</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Ces trois notions articulent l'organisation du projet à des niveaux de détail complémentaires :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. L'Objectif (Où l'on veut aller)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-mono shrink-0">Vision globale</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              « Permettre à l'utilisateur de gérer ses tâches et suivre leur progression dans TaskFlow. » &rarr; Décrit le résultat d'ensemble attendu au terme de l'itération.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. La Tâche (L'unité de travail délimitée)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 font-mono shrink-0">Brique élémentaire</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              « T4 : Développer l'API REST de création d'une tâche. » &rarr; Représente une part identifiable du travail concourant à l'objectif.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. La Mission (Les consignes complètes confiées à l'agent)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-mono shrink-0">Prompt & Contexte</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Le prompt structuré adressé à l'Agent Backend avec le contexte, le contrat d'API, les fichiers cibles, les contraintes et les critères d'acceptation.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2.3 : Les 3 Méthodes de Décomposition */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="squares-plus" className="w-5 h-5 text-indigo-600 shrink-0" /> 2. Les 3 Méthodes de Décomposition d'un Projet</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Selon la phase du projet, le Team Leader peut appréhender le découpage sous trois angles complémentaires :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. Décomposition par Fonctionnalité</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Organise le travail selon les capacités offertes à l'utilisateur : Créer une tâche, Afficher la liste, Modifier le statut, Compter par statut. Idéal au lancement du projet pour cadrer le besoin métier.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Décomposition par Couche Technique</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Sépare le travail selon les domaines d'ingénierie : Backend (API Express), Frontend (UI React), Tests (Vitest/Supertest), Architecture. Très efficace pour attribuer les tâches aux agents spécialistes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. Décomposition par Livrable</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Cible la production d'artefacts tangibles : Modèle TypeScript partagé, Routes REST opérationnelles, Composant formulaire, Suite de tests de non-régression. Facilite le contrôle qualité et la recette.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif : Calibrage de Granularité */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire de Granularité &bull; Team Leader Workbench
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur de Granularité des Tâches pour Agents IA
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Évaluez l'impact d'une tâche trop large, optimale ou excessivement détaillée sur le comportement des agents.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Niveau de décomposition testé :</span>
          {(Object.keys(granularityScenarios) as Array<keyof typeof granularityScenarios>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedGranularity(key)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                selectedGranularity === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {granularityScenarios[key].title}
            </button>
          ))}
        </div>

        {/* Diagnostic */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Formulation de la tâche :</span>
            <p className="text-xs sm:text-sm italic font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-normal break-words [overflow-wrap:anywhere]">
              {activeGranularityData.taskExample}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Verdict technique :</span>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {activeGranularityData.verdict}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
            {activeGranularityData.diagnosis}
          </p>

          <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <strong>Recommandation :</strong> {activeGranularityData.recommendation}
          </div>
        </div>
      </div>

      {/* Section 2.7 : Liste structurée des 19 tâches TaskFlow */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="clipboard-document-list" className="w-5 h-5 text-emerald-600 shrink-0" /> 3. La Décomposition Structurée des Tâches TaskFlow</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Le périmètre initial de TaskFlow est découpé en 19 tâches cohérentes réparties sur 4 domaines techniques :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">Domaine 1 — Structure & Modèle (Architect)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              <strong>T1 :</strong> Définir le modèle TypeScript d'une tâche &bull; <strong>T2 :</strong> Définir les 3 statuts autorisés &bull; <strong>T3 :</strong> Définir les règles de validation des données.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">Domaine 2 — API & Logique Serveur (Backend)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              <strong>T4 :</strong> API de création (POST) &bull; <strong>T5 :</strong> API de consultation (GET) &bull; <strong>T6 :</strong> API de modification (PUT) &bull; <strong>T7 :</strong> API de suppression (DELETE) &bull; <strong>T8 :</strong> API de changement de statut (PATCH) &bull; <strong>T9 :</strong> Calcul des compteurs par statut.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-purple-700 dark:text-purple-400">Domaine 3 — Interface Utilisateur (Frontend)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              <strong>T10 :</strong> Affichage de la liste de tâches &bull; <strong>T11 :</strong> Formulaire de création &bull; <strong>T12 :</strong> Modal de modification &bull; <strong>T13 :</strong> Bouton de suppression &bull; <strong>T14 :</strong> Contrôle de changement de statut &bull; <strong>T15 :</strong> Badges de compteurs réactifs.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-amber-700 dark:text-amber-400">Domaine 4 — Assurance Qualité & Intégration (QA)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              <strong>T16 :</strong> Tests automatisés des routes backend &bull; <strong>T17 :</strong> Tests des règles de transition de statut &bull; <strong>T18 :</strong> Tests des interactions UI React &bull; <strong>T19 :</strong> Vérification de cohérence globale de l'intégration.
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
            Quiz de validation du Chapitre 2
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Testez votre compréhension de la décomposition des tâches, des méthodes WBS et du calibrage optimal de granularité.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal de la décomposition des tâches ?",
              options: [
                "Remplacer l'analyse du besoin.",
                "Transformer le travail en unités plus petites et structurées.",
                "Désigner immédiatement tous les agents.",
                "Définir directement les permissions Git."
              ],
              correctIndex: 1,
              explanation: "La décomposition transforme le travail à réaliser en unités plus petites et structurées. Elle facilite l'organisation, le suivi et la préparation des missions."
            },
            {
              id: 2,
              question: "Quelle affirmation décrit correctement une tâche ?",
              options: [
                "Elle représente une unité de travail délimitée.",
                "Elle correspond toujours à un projet complet.",
                "Elle désigne uniquement une instruction générale.",
                "Elle représente nécessairement un agent."
              ],
              correctIndex: 0,
              explanation: "Une tâche est une unité de travail délimitée représentant une part identifiable d'effort nécessaire pour atteindre un objectif."
            },
            {
              id: 3,
              question: "Quelle est la différence entre un objectif et une tâche ?",
              options: [
                "L'objectif décrit un résultat à atteindre, tandis que la tâche représente une partie du travail.",
                "L'objectif désigne un fichier, tandis que la tâche désigne un agent.",
                "L'objectif et la tâche sont deux termes strictement identiques.",
                "L'objectif décrit uniquement les tests."
              ],
              correctIndex: 0,
              explanation: "L'objectif décrit le résultat global recherché. La tâche correspond à une partie du travail permettant de progresser vers ce résultat."
            },
            {
              id: 4,
              question: "Quelle méthode consiste à organiser le travail selon les fonctionnalités proposées aux utilisateurs ?",
              options: [
                "La décomposition par couche technique.",
                "La décomposition par fonctionnalité.",
                "La décomposition par permission.",
                "La décomposition par conversation."
              ],
              correctIndex: 1,
              explanation: "La décomposition par fonctionnalité organise les tâches selon les capacités métier proposées aux utilisateurs (ex: création, suppression)."
            },
            {
              id: 5,
              question: "Quel est l'intérêt d'une décomposition par livrable ?",
              options: [
                "Elle permet d'identifier les résultats concrets à produire.",
                "Elle supprime le besoin de tests.",
                "Elle impose de confier tout le travail à un seul agent.",
                "Elle remplace la définition des objectifs."
              ],
              correctIndex: 0,
              explanation: "Un livrable est un résultat concret et tangible qui peut être examiné et audité, ce qui facilite la recette."
            },
            {
              id: 6,
              question: "Quel exemple correspond à une tâche suffisamment précise ?",
              options: [
                "Développer toute l'application.",
                "Faire le nécessaire pour le backend.",
                "Développer les routes REST de gestion des tâches.",
                "Améliorer globalement le projet."
              ],
              correctIndex: 2,
              explanation: "Développer les routes REST de gestion des tâches définit un domaine et un travail identifiables sans ambiguïté."
            },
            {
              id: 7,
              question: "Pourquoi faut-il éviter une décomposition trop détaillée ?",
              options: [
                "Parce qu'elle empêche de créer des tâches.",
                "Parce qu'elle peut multiplier inutilement les unités de travail.",
                "Parce qu'elle supprime les responsabilités des agents.",
                "Parce qu'elle interdit les tests automatisés."
              ],
              correctIndex: 1,
              explanation: "Une décomposition excessive multiplie les petites unités de travail et alourdit le coût de suivi et de prompts."
            },
            {
              id: 8,
              question: "Dans l'organisation TaskFlow, quelle tâche appartient principalement au domaine Frontend ?",
              options: [
                "Développer l'API de suppression.",
                "Définir le modèle de données.",
                "Créer le composant d'affichage de la liste des tâches.",
                "Tester les routes REST."
              ],
              correctIndex: 2,
              explanation: "Le composant d'affichage appartient à l'interface utilisateur React, relevant ainsi du Frontend."
            },
            {
              id: 9,
              question: "À quoi sert une structure hiérarchique de tâches ?",
              options: [
                "À regrouper les tâches liées et faciliter leur lecture.",
                "À remplacer les branches Git.",
                "À imposer un agent par ligne de code.",
                "À supprimer les domaines techniques."
              ],
              correctIndex: 0,
              explanation: "Une hiérarchie permet de regrouper les tâches par domaine et sous-domaine pour conserver une vue d'ensemble claire."
            },
            {
              id: 10,
              question: "Une liste de tâches est créée. Faut-il nécessairement y intégrer dès maintenant les dépendances et les agents responsables ?",
              options: [
                "Oui, ces informations doivent toujours être définies pendant la première décomposition.",
                "Non, la décomposition peut être préparée avant l'étude des dépendances et l'attribution des missions.",
                "Oui, chaque tâche doit être confiée à plusieurs agents.",
                "Non, les tâches ne doivent jamais être attribuées à des agents."
              ],
              correctIndex: 1,
              explanation: "La première décomposition sert à identifier et structurer les tâches. L'analyse des dépendances et l'attribution aux agents interviennent dans les étapes suivantes."
            }
          ]}
        />
      </div>
    </div>
  );
};
