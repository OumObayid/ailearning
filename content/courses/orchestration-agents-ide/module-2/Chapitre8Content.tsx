'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  // Simulateur interactif du TP d'Organisation TaskFlow
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const tpSteps = [
    {
      num: 1,
      title: "Étape 1 — Définir l'organisation générale de l'équipe",
      objective: "Structurer la hiérarchie entre le PM humain, le Team Leader IA et les agents spécialisés.",
      icon: "users",
      work: "Pour le projet TaskFlow, formalisez l'organigramme de l'équipe. Précisez la place du Project Manager humain au sommet de la gouvernance, le rôle du Team Leader IA comme intermédiaire central d'orchestration, et les 5 agents spécialisés (Architect, Backend, Frontend, QA, Reviewer). Justifiez pourquoi un agent spécialisé ne doit jamais recevoir d'ordre direct d'un autre agent sans passer par le chef d'équipe.",
      questions: [
        "Quelle est l'autorité suprême en cas de désaccord technique ?",
        "Pourquoi le Team Leader IA est-il l'unique point de contact opérationnel du PM humain ?"
      ],
      solution: `### Extrait de la Charte — Organisation Générale TaskFlow
- **Gouvernance Humaine (Niveau Stratégique)** : Le Project Manager humain est le garant du produit, du budget et des décisions d'architecture critiques. Il détient le monopole exclusif des fusions Git sur les branches protégées.
- **Orchestration IA (Niveau Tactique)** : Le Team Leader IA reçoit les objectifs du PM, les décompose en missions techniques, assigne les tâches et centralise le suivi.
- **Exécution Spécialisée (Niveau Opérationnel)** : Cinq agents aux compétences cloisonnées (Architect, Backend, Frontend, QA, Reviewer) travaillent sous contrat sans modifier de code en dehors de leur périmètre.`
    },
    {
      num: 2,
      title: "Étape 2 — Définir les responsabilités de chaque intervenant",
      objective: "Attribuer une mission précise et non ambiguë à chacun des 7 membres de l'équipe.",
      icon: "target",
      work: "Rédigez la fiche de poste de chaque intervenant. Pour chacun, listez sa responsabilité principale, ses livrables types et ce qu'il ne doit JAMAIS faire.",
      questions: [
        "Quelle différence de mission existe entre l'Agent QA et l'Agent Reviewer ?",
        "Pourquoi le Team Leader IA ne doit-il pas coder lui-même les fonctionnalités ?"
      ],
      solution: `### Extrait de la Charte — Fiches de Rôles
1. **PM Humain** : Définit les fonctionnalités, arbitre les arbitrages et valide les livraisons. (Ne code pas au jour le jour).
2. **Team Leader IA** : Découpe, planifie, coordonne et consolide les statuts. (Ne modifie aucun code source applicatif).
3. **Architect** : Modélise les schémas, les types TypeScript partagés et les contrats de routes d'API. (N'implémente pas l'UI ni la logique métier).
4. **Agent Backend** : Développe l'API Express, les contrôleurs et les services de persistance en mémoire. (Ne modifie jamais le code React).
5. **Agent Frontend** : Intègre les composants React/Next.js et les styles Tailwind. (Ne modifie jamais les routes Express ni la persistance).
6. **Agent QA** : Écrit et exécute les tests fonctionnels et de non-régression. (Ne corrige pas lui-même le code en échec).
7. **Agent Reviewer** : Audite la sécurité, le typage strict et la maintenabilité du code. (N'a aucun pouvoir d'ordre direct).`
    },
    {
      num: 3,
      title: "Étape 3 — Définir les règles de répartition d'une mission",
      objective: "Appliquer le découpage ordonné pour la feature : 'Création d'une tâche avec tag et priorité'.",
      icon: "workflow",
      work: "Découpez cette fonctionnalité en sous-tâches interdépendantes. Identifiez l'agent responsable de chaque sous-tâche, les prérequis nécessaires avant son lancement, et l'ordre chronologique strict à respecter.",
      questions: [
        "Pourquoi l'Agent Frontend ne peut-il pas démarrer avant la formalisation de l'Architect ?",
        "À quel moment l'Agent QA commence-t-il la rédaction de ses tests ?"
      ],
      solution: `### Découpage de la Mission 'Création Tâche avec Tag et Priorité'
1. **Sous-tâche 1 (Architect)** : Définir l'énumération TaskPriority ('LOW'|'MEDIUM'|'HIGH') et le champ tags: string[] dans shared/types.ts.
2. **Sous-tâche 2 (Backend)** : Prérequis = Sous-tâche 1. Implémenter POST /api/tasks avec validation Zod et stockage dans la Map.
3. **Sous-tâche 3 (Frontend)** : Prérequis = Sous-tâche 1 (types disponibles). Développer les sélecteurs de tags et de priorité dans TaskForm.tsx.
4. **Sous-tâche 4 (QA)** : Prérequis = Sous-tâches 2 et 3 terminées. Écrire et lancer les tests Supertest et tests d'intégration React.
5. **Sous-tâche 5 (Reviewer)** : Prérequis = Sous-tâche 4 au vert. Auditer la PR #21 (sécurité, fuites de mémoire, modularité).`
    },
    {
      num: 4,
      title: "Étape 4 — Définir les limites et permissions (Matrice d'accès)",
      objective: "Établir la cartographie des répertoires et verrouiller les droits Git.",
      icon: "shield-check",
      work: "Construisez la matrice des permissions pour chaque agent sur les dossiers du projet TaskFlow (`backend/`, `frontend/`, `docs/`, `tests/`, `package.json`, `.git/`). Formulez la règle d'or concernant les opérations Git sensibles.",
      questions: [
        "Un agent Backend a-t-il le droit d'installer un package npm dans le frontend ?",
        "Qui a le droit d'exécuter 'git merge' et 'git push origin main' ?"
      ],
      solution: `### Matrice de Permissions TaskFlow
| Rôle | backend/ | frontend/ | docs/ | tests/ | git merge / push |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Architect** | Lecture | Lecture | Écriture | Lecture | Interdit |
| **Backend** | Écriture | Interdit | Lecture | Tests backend | Interdit |
| **Frontend** | Interdit | Écriture | Lecture | Tests frontend | Interdit |
| **QA** | Lecture | Lecture | Lecture | Écriture tests | Interdit |
| **Reviewer** | Lecture | Lecture | Lecture | Lecture | Interdit |
| **Team Leader** | Lecture | Lecture | Rapports | Lecture | Interdit |
| **PM Humain** | Tous droits | Tous droits | Tous droits | Tous droits | AUTORISÉ EXCLUSIF |

**Règle du Verrou Git** : Aucun agent IA n'a la permission d'exécuter des fusions ou poussées de branches protégées sans ordre écrit explicite du PM.`
    },
    {
      num: 5,
      title: "Étape 5 — Organiser les échanges entre les agents (Gabarits)",
      objective: "Rédiger les modèles types pour chaque scénario de communication.",
      icon: "message-square",
      work: "Rédigez les 5 gabarits de communication standardisés de l'équipe TaskFlow : (1) Assignation de mission, (2) Demande de clarification, (3) Signalement d'anomalie QA, (4) Recommandation de revue de code, et (5) Compte rendu de fin de mission.",
      questions: [
        "Pourquoi un compte rendu doit-il toujours mentionner les tests passés ?",
        "Quels éléments obligatoires doivent figurer dans un rapport de bug QA ?"
      ],
      solution: `### Gabarits Standards de Communication
- **Assignation** : Destinataire, Objectif précis, Périmètre de fichiers, Contraintes imposées, Livrables attendus.
- **Clarification** : Émetteur, Contexte de blocage, Question fermée formulée, Impact technique sur la tâche en cours.
- **Rapport QA** : Comportement attendu, Comportement observé, Étapes de reproduction, Fichier/ligne en cause, Sévérité.
- **Recommandation Reviewer** : Fichier audité, Observation (lisibilité/sécurité/perf), Proposition concrète d'amélioration.
- **Compte Rendu** : Mission traitée, Statut ('À vérifier'), Fichiers modifiés, Résultats des tests unitaires (nombre et % réussite).`
    },
    {
      num: 6,
      title: "Étape 6 — Définir les règles de coordination et de suivi",
      objective: "Modéliser le cycle de vie d'une tâche à travers les 7 statuts normalisés.",
      icon: "git-branch",
      work: "Détaillez le fonctionnement des statuts : À faire, En cours, En attente, Bloquée, Terminée, À vérifier, Validée. Définissez la règle stricte à appliquer lorsqu'un agent rencontre une erreur de droits ou une incohérence de spécification.",
      questions: [
        "Pourquoi est-il interdit à un agent de contourner une règle en cas d'erreur de permission ?",
        "Quelle est la condition obligatoire pour passer d'une tâche 'Terminée' à 'Validée' ?"
      ],
      solution: `### Règles de Coordination et Cycle de Vie
- **Transitions** : Une tâche passe d'abord par 'En cours', puis 'Terminée' (développeur), puis 'À vérifier' (QA/Reviewer), et enfin 'Validée' (PM humain).
- **Gestion des Blocages** : Dès qu'une permission refuse une écriture ou qu'une anomalie bloque le code, la tâche bascule au statut 'Bloquée'. L'agent alerte immédiatement le Team Leader.
- **Interdiction Formelle** : Aucun contournement n'est toléré (interdiction de forcer les permissions, de supprimer un test ou d'écrire dans un dossier non autorisé).`
    },
    {
      num: 7,
      title: "Étape 7 — Définir les règles de validation en 4 niveaux",
      objective: "Formaliser la chaîne de contrôle qualité avant tout merge de code.",
      icon: "check-circle",
      work: "Décrivez les contrôles requis à chaque niveau de validation (Niveau 1 Développeur, Niveau 2 QA, Niveau 3 Reviewer, Niveau 4 PM humain). Rédigez les critères d'acceptation de la fonctionnalité de création de tâche TaskFlow.",
      questions: [
        "Que se passe-t-il si les tests QA échouent au niveau 2 ?",
        "Quel document le Team Leader soumet-il au PM pour le niveau 4 ?"
      ],
      solution: `### Chaîne de Validation en 4 Niveaux
- **N1 Développeur** : Compilation TypeScript zéro erreur + tests unitaires locaux réussis.
- **N2 QA** : Exécution de la suite complète de non-régression + validation des critères d'acceptation fonctionnels.
- **N3 Reviewer** : Audit de code, détection de régressions potentielles, absence d'injections et conformité des types.
- **N4 PM Humain** : Approbation formelle du rapport consolidé du Team Leader et signature du 'git merge'.

**Critères d'acceptation pour la création de tâche** :
1. Une tâche créée sans tag reçoit un tableau vide \`[]\` par défaut.
2. Si la priorité n'est pas précisée, elle vaut \`'MEDIUM'\`.
3. Une priorité invalide renvoie une erreur HTTP 400 Bad Request avec message explicatif.`
    },
    {
      num: 8,
      title: "Étape 8 — Rédiger la Charte d'Équipe Multi-Agents TaskFlow",
      objective: "Consolider l'ensemble des règles dans le document de référence officiel du projet.",
      icon: "file-text",
      work: "Rassemblez les résultats des étapes précédentes dans un document unique et structuré intitulé 'CHARTE_MULTIAGENTS_TASKFLOW.md'. Ce document servira d'instructions de base (System Prompt / Context) pour l'ensemble des agents du projet TaskFlow.",
      questions: [
        "Où doit être stockée la charte d'équipe dans l'arborescence du projet ?",
        "Pourquoi chaque nouvel agent invoqué doit-il charger cette charte dès son initialisation ?"
      ],
      solution: `### Document Final : CHARTE_MULTIAGENTS_TASKFLOW.md
Le document consolidé doit être placé à la racine du projet dans \`docs/CHARTE_MULTIAGENTS_TASKFLOW.md\`.
Il contient :
1. Organigramme des 7 intervenants et chaîne hiérarchique.
2. Matrice d'accès et répertoires autorisés.
3. Règle absolue du Verrou Git.
4. Les 7 statuts du cycle de vie des tâches.
5. Les gabarits obligatoires de communication.
6. La procédure de validation à 4 niveaux.
Chaque agent nouvellement instancié lit ce fichier pour connaître immédiatement ses limites et son mode opératoire.`
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
            <span>Travail Pratique de Fin de Module • Module 2</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Durée estimée : ~1 h 30 min</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          TP de fin de module : Concevoir l'organisation d'une équipe d'agents IA
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Dans ce travail pratique complet, vous allez concevoir et formaliser l'organisation d'une équipe multi-agents dédiée au développement de l'application <strong>TaskFlow</strong>. Vous définirez les rôles, les responsabilités, la matrice des permissions, les formats d'échanges standardisés, le cycle de vie des tâches et la chaîne de validation humaine finale.
        </p>
      </div>

      {/* =========================================================================
          CADRE DU TP & PROJET TASKFLOW
         ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Icon name="info" className="w-5 h-5 text-indigo-600" />
          Contexte du Projet Fil Rouge : TaskFlow
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
          TaskFlow est une application de gestion de projets collaborative. Elle se compose d'un backend REST développé avec Node.js, Express et TypeScript (stockage en mémoire sous forme de Map), d'un frontend moderne avec React, Next.js et Tailwind CSS, et d'une suite de tests automatisés avec Vitest et Supertest.
        </p>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/60">
            <span className="text-xs font-bold text-indigo-900 block mb-1">
              Votre mission en tant que Concepteur d'Organisation :
            </span>
            <p className="text-xs text-indigo-800 leading-relaxed">
              Avant de confier le développement des fonctionnalités aux agents IA, vous devez concevoir leur cadre opérationnel strict. En 8 étapes guidées, vous allez produire la <strong>Charte de Collaboration Multi-Agents</strong> qui sera injectée dans le contexte du projet.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          WORKBENCH INTERACTIF DU TP (8 ÉTAPES)
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-slate-800 bg-slate-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-lg font-black text-indigo-200">
              Atelier Guidé — Les 8 Étapes de Conception
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
              Étape {step.num}
            </button>
          ))}
        </div>

        {/* Conteneur de l'étape active */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Objectif de l'étape
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
              Travail à réaliser par l'apprenant :
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {curr.work}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-300 block">
              Questions clés à résoudre :
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
              <span>{showSolution ? 'Masquer la solution de référence' : 'Consulter le corrigé et extrait de charte'}</span>
            </button>
          </div>

          {/* Bloc Corrigé */}
          {showSolution && (
            <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-slate-200 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                <span>Corrigé officiel de l'Étape {curr.num}</span>
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
            Critères d'appréciation pour valider la conception de l'organisation
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                1. Structure hiérarchique et rôles des 7 intervenants
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                15 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Clarté de la séparation entre gouvernance humaine, orchestration IA et spécialistes d'exécution.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                2. Découpage fonctionnel et gestion des dépendances
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                15 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Ordonnancement logique des sous-tâches pour la création de tâche avec tags et gestion du contrat d'interface préalable.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                3. Matrice de permissions et étanchéité des dossiers
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                20 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Verrouillage strict des répertoires de code et application rigoureuse de la règle d'or du verrou Git.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                4. Gabarits de communication inter-agents
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                15 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Précision des modèles types (assignation, alerte bug QA, rapport reviewer, compte rendu factuel).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                5. Règles de coordination (7 statuts) et gestion des blocages
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                15 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Définition rigoureuse du passage de statut et interdiction absolue de tout contournement de sécurité.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">
                6. Processus de validation en 4 niveaux et document consolidé
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                20 points
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Exhaustivité de la chaîne de contrôle et qualité rédactionnelle de la Charte finale intégrable au projet TaskFlow.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          QUIZ DE VALIDATION DU TP (10 QUESTIONS DE SYNTHÈSE)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz de synthèse du TP — Module 2
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez votre assimilation des concepts clés de l'organisation d'une équipe multi-agents (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial de formaliser la charte d'équipe AVANT de lancer les agents sur le code de TaskFlow ?",
              options: [
                "Pour faire patienter le client",
                "Pour éviter les collisions de fichiers, les ambiguïtés de responsabilités et les régressions non maîtrisées",
                "Parce que les agents refusent de travailler sans contrat de travail",
                "Ce n'est pas nécessaire, les agents s'auto-organisent spontanément sans aucune règle"
              ],
              correctIndex: 1,
              explanation: "Sans charte explicite, chaque agent risque d'interpréter le projet à sa manière, écrasant les fichiers des autres et cassant l'architecture."
            },
            {
              id: 2,
              question: "Quel rôle au sein de l'équipe est l'intermédiaire opérationnel exclusif entre le PM humain et les développeurs spécialisés ?",
              options: [
                "L'Agent Frontend",
                "L'Agent QA",
                "Le Team Leader IA",
                "L'Agent Reviewer"
              ],
              correctIndex: 2,
              explanation: "Le Team Leader IA centralise les directives du PM, les découpe en missions et pilote les agents spécialisés."
            },
            {
              id: 3,
              question: "Dans le cadre de TaskFlow, quel agent a le droit d'écrire dans le dossier 'backend/src/' ?",
              options: [
                "L'Agent Frontend uniquement",
                "L'Agent Backend",
                "Tous les agents sans restriction",
                "Le Reviewer uniquement"
              ],
              correctIndex: 1,
              explanation: "Seul l'Agent Backend possède les droits d'écriture sur le code applicatif du backend."
            },
            {
              id: 4,
              question: "Lorsqu'un nouveau champ est ajouté à une ressource (ex: priority), quel agent doit intervenir en premier ?",
              options: [
                "L'Architect pour formaliser les types et le contrat de route",
                "L'Agent Frontend pour dessiner le bouton",
                "L'Agent QA pour tester une API qui n'existe pas encore",
                "Le stagiaire"
              ],
              correctIndex: 0,
              explanation: "L'Architect fige le modèle et le contrat d'interface TypeScript, servant de socle commun au Backend et au Frontend."
            },
            {
              id: 5,
              question: "Que doit faire un agent spécialisé si un test échoue lors de son développement ?",
              options: [
                "Supprimer le fichier de test pour afficher un succès",
                "Déclarer la tâche Validée",
                "Analyser l'erreur, corriger son code et relancer le test jusqu'à ce qu'il passe au vert",
                "Modifier le code d'un autre agent sans prévenir"
              ],
              correctIndex: 2,
              explanation: "L'agent effectue son auto-vérification locale (Niveau 1) et résout ses erreurs avant de soumettre son livrable."
            },
            {
              id: 6,
              question: "Qui a le droit d'effectuer un 'git merge' de la branche de fonctionnalité dans la branche 'develop' ?",
              options: [
                "L'Agent QA",
                "Le Team Leader IA de manière autonome",
                "Le Project Manager humain exclusivement",
                "N'importe quel agent après les tests"
              ],
              correctIndex: 2,
              explanation: "Le verrou Git réserve les fusions sur les branches principales à la validation souveraine du PM humain."
            },
            {
              id: 7,
              question: "Quel est l'objectif de l'Agent Reviewer comparé à l'Agent QA ?",
              options: [
                "L'Agent QA exécute les tests fonctionnels et de régression ; le Reviewer audite la structure, la sécurité et la lisibilité du code source",
                "Ils font exactement le même travail",
                "Le Reviewer teste les interfaces graphiques et le QA lit le code",
                "Le Reviewer est un bot Discord"
              ],
              correctIndex: 0,
              explanation: "QA = exécution des tests et conformité fonctionnelle ; Reviewer = audit statique de propreté, sécurité et maintenabilité."
            },
            {
              id: 8,
              question: "Si l'Agent Frontend constate qu'un type de données manque dans la spécification, quel gabarit doit-il utiliser ?",
              options: [
                "Un compte rendu de fin de mission",
                "Une demande de clarification technique adressée au Team Leader IA",
                "Un rapport de bug critique",
                "Aucun gabarit, il invente le type lui-même"
              ],
              correctIndex: 1,
              explanation: "La demande de clarification permet d'obtenir l'information officielle sans bloquer le projet par des hypothèses erronées."
            },
            {
              id: 9,
              question: "Qu'indique le statut 'Bloquée' dans le cycle de vie à 7 étapes ?",
              options: [
                "Que le projet est définitivement annulé",
                "Qu'une contrainte technique, un manque d'information ou un refus de permission empêche l'avancement sans possibilité de contournement",
                "Que la tâche est prête à être livrée en production",
                "Que l'agent est en pause déjeuner"
              ],
              correctIndex: 1,
              explanation: "Le statut Bloquée alerte immédiatement la coordination pour lever l'obstacle sans risquer de contournement dangereux."
            },
            {
              id: 10,
              question: "Pourquoi la Charte d'Équipe doit-elle être intégrée dans le répertoire du projet (ex: docs/CHARTE_MULTIAGENTS_TASKFLOW.md) ?",
              options: [
                "Pour faire joli dans l'explorateur de fichiers",
                "Pour servir de source unique de vérité et d'instructions système chargeables par tous les agents",
                "Pour empêcher Git d'enregistrer des commits",
                "Pour cacher le code source au PM"
              ],
              correctIndex: 1,
              explanation: "Conserver la charte dans le référentiel permet à tous les agents (présents et futurs) de disposer d'un contexte commun immuable."
            }
          ]}
        />
      </section>
    </div>
  );
};