'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur de la matrice quadruple
  const [selectedAgent, setSelectedAgent] = useState<'backend' | 'frontend' | 'qa' | 'architect'>('backend');

  const matrix = {
    backend: {
      role: "Agent Backend",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      conversation: "Mission API TaskFlow #14",
      branch: "feature/backend-api",
      worktree: "/projects/taskflow-backend",
      scope: "backend/src/routes/, backend/src/controllers/, backend/src/services/",
      forbidden: "frontend/, package.json root, .git/ config",
      deliverable: "backend-api.md + routes Express testées"
    },
    frontend: {
      role: "Agent Frontend",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      conversation: "Mission Interface TaskFlow #15",
      branch: "feature/frontend-ui",
      worktree: "/projects/taskflow-frontend",
      scope: "frontend/src/components/, frontend/src/hooks/, frontend/public/",
      forbidden: "backend/, package.json root, types partagés sans accord",
      deliverable: "frontend-ui.md + composants React interactifs"
    },
    qa: {
      role: "Agent QA",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      conversation: "Mission Tests TaskFlow #16",
      branch: "test/taskflow-tests",
      worktree: "/projects/taskflow-qa",
      scope: "tests/, __tests__/, scenarios/",
      forbidden: "Modification directe du code applicatif backend ou frontend",
      deliverable: "test-plan.md + suites de tests Vitest / Supertest"
    },
    architect: {
      role: "Agent Architect",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      conversation: "Mission Architecture TaskFlow #17",
      branch: "docs/architecture",
      worktree: "/projects/taskflow-architecture",
      scope: "docs/, types partagés shared/types.ts",
      forbidden: "Implémentation directe de code UI ou serveur",
      deliverable: "architecture.md + contrats d'interface TypeScript"
    }
  };

  const curr = matrix[selectedAgent];

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
          Chapitre 3 — Comprendre le lien entre agent, conversation, branche et espace de travail
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour orchestrer une équipe d'agents IA dans un IDE comme Google Antigravity, il ne suffit pas de taper des commandes au hasard. Il faut maîtriser la relation rigoureuse entre <strong>quatre piliers fondamentaux</strong> : l'intervenant (Agent), son contexte d'échange (Conversation), sa ligne de commits (Branche Git) et son répertoire physique sur le disque (Worktree).
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
              1. Définir les 4 piliers de l'orchestration
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguer clairement qui réalise le travail (Agent), dans quel contexte (Conversation), sur quel historique (Branche) et dans quel dossier (Worktree).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Comprendre les avantages de la dissociation
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Permettre le remplacement d'un agent ou la reprise d'une conversation interrompue sans jamais perdre les commits ni corrompre l'espace physique.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Structurer une Fiche de Mission complète
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fournir à chaque agent un cadrage sans équivoque avec périmètres autorisés et interdits.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3.2 : LES 4 PILIERS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              3.2
            </span>
            La matrice des 4 éléments fondamentaux
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Chaque élément répond à une question précise du cycle de développement
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">1. L'Agent IA — "Qui réalise le travail ?"</h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-blue-100 text-blue-800 shrink-0">Acteur</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Le modèle ou rôle spécialisé (ex: Agent Backend) doté de compétences spécifiques et outillé pour lire et modifier du code.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">2. La Conversation — "Quel est le contexte de la mission ?"</h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-purple-100 text-purple-800 shrink-0">Contexte</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Le fil de discussion dans l'IDE contenant le prompt initial, les spécifications, les questions de clarification et les comptes rendus.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">3. La Branche Git — "Sur quelle ligne d'historique enregistrer ?"</h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800 shrink-0">Historique</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Le pointeur de référence qui accumule les commits atomiques créés pour la mission (ex: <code>feature/backend-api</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900">4. Le Worktree — "Dans quel répertoire physique travailler ?"</h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-amber-100 text-amber-800 shrink-0">Système de fichiers</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Le dossier physique sur le disque où l'agent inspecte et édite le code source sans perturber les autres chantiers (ex: <code>/projects/taskflow-backend</code>).
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DE LA MATRICE QUADRUPLE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Console d'Orchestration — Matrice Quadruple TaskFlow
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Alignement Opérationnel
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Sélectionnez un rôle pour inspecter sa configuration complète :
          </p>

          {/* Boutons sélecteurs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedAgent('backend')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAgent === 'backend' ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              1. Agent Backend
            </button>
            <button
              onClick={() => setSelectedAgent('frontend')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAgent === 'frontend' ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              2. Agent Frontend
            </button>
            <button
              onClick={() => setSelectedAgent('qa')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAgent === 'qa' ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              3. Agent QA
            </button>
            <button
              onClick={() => setSelectedAgent('architect')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAgent === 'architect' ? 'bg-amber-600 text-white shadow-lg ring-2 ring-amber-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              4. Agent Architect
            </button>
          </div>

          {/* Fiche de mission interactive */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800/90 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold border ${curr.badgeColor}`}>
                  {curr.role}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-2">
                  Session : {curr.conversation}
                </h4>
              </div>
              <div className="text-right font-mono text-xs text-indigo-300">
                Branche active : <span className="text-emerald-400">{curr.branch}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-xs font-bold text-indigo-300 block mb-1">
                  📁 Répertoire physique Worktree assigné :
                </span>
                <span className="text-xs font-mono text-slate-200">{curr.worktree}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-xs font-bold text-emerald-300 block mb-1">
                  ✓ Périmètre de fichiers autorisés :
                </span>
                <span className="text-xs font-mono text-slate-300">{curr.scope}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-rose-900/60">
                <span className="text-xs font-bold text-rose-300 block mb-1">
                  ❌ Périmètre strictement interdit :
                </span>
                <span className="text-xs font-mono text-rose-200">{curr.forbidden}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-xs font-bold text-amber-300 block mb-1">
                  🎯 Livrable attendu en fin de mission :
                </span>
                <span className="text-xs text-slate-200">{curr.deliverable}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3.12 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 3
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez votre maîtrise de la matrice Agent / Conversation / Branche / Worktree (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel élément réalise concrètement les actions et écrit le code ?",
              options: [
                "La branche Git",
                "Le Worktree",
                "L'Agent IA",
                "Le dépôt distant"
              ],
              correctIndex: 2,
              explanation: "L'Agent IA est l'acteur qui analyse la tâche et manipule les fichiers avec ses outils."
            },
            {
              id: 2,
              question: "Quel est le rôle fondamental de la Conversation dans l'IDE ?",
              options: [
                "Créer automatiquement une branche Git",
                "Conserver les instructions, le prompt de cadrage et le contexte d'échange de la mission",
                "Stocker physiquement les fichiers du projet",
                "Remplacer le système de fichiers"
              ],
              correctIndex: 1,
              explanation: "La conversation maintient le contexte textuel et la mémoire des décisions de l'agent."
            },
            {
              id: 3,
              question: "Quel élément représente la ligne d'évolution dans l'historique Git ?",
              options: [
                "La conversation",
                "L'agent",
                "Le Worktree",
                "La branche"
              ],
              correctIndex: 3,
              explanation: "La branche est la référence Git qui trace la suite chronologique des commits."
            },
            {
              id: 4,
              question: "Dans quel élément l'agent consulte-t-il et modifie-t-il physiquement les fichiers du projet ?",
              options: [
                "Dans son Worktree sur le disque dur",
                "Dans sa conversation de chat",
                "Dans le nom de sa branche",
                "Dans son compte rendu final"
              ],
              correctIndex: 0,
              explanation: "Le Worktree est le répertoire physique concret où le code source réside sur le disque."
            },
            {
              id: 5,
              question: "Ouvrir une nouvelle conversation dans l'IDE crée-t-il automatiquement une branche Git ?",
              options: [
                "Oui, toujours",
                "Non, la création de branche est une opération Git explicite qui doit être ordonnée"
              ],
              correctIndex: 1,
              explanation: "Une session de chat ne crée aucune branche par magie ; cela relève des commandes Git."
            },
            {
              id: 6,
              question: "Git Worktrees oriente-t-il automatiquement un agent IA vers son répertoire sans configuration ?",
              options: [
                "Oui, dans tous les IDE sans exception",
                "Non, l'accès au bon dossier doit être organisé par l'IDE et spécifié dans les instructions de la mission"
              ],
              correctIndex: 1,
              explanation: "L'agent doit être explicitement lancé dans le dossier du worktree ou guidé par son prompt."
            },
            {
              id: 7,
              question: "Quelle organisation est la plus rigoureuse pour 3 agents travaillant en parallèle ?",
              options: [
                "Trois agents dans le même dossier et sur la même branche",
                "Trois missions clairement définies avec des branches et des Worktrees distincts",
                "Une conversation unique sans séparation des tâches",
                "Trois dépôts payants sur trois machines distinctes"
              ],
              correctIndex: 1,
              explanation: "Dissocier 1 mission = 1 branche = 1 worktree garantit l'absence totale de collisions."
            },
            {
              id: 8,
              question: "Un nouvel agent peut-il reprendre une mission commencée par un autre agent ?",
              options: [
                "Oui, si le contexte, la branche et l'état du Worktree lui sont clairement transmis",
                "Non, une mission appartient à vie au premier modèle instancié"
              ],
              correctIndex: 0,
              explanation: "Comme les commits et les fichiers sont sur le worktree, un nouvel agent peut reprendre le travail."
            },
            {
              id: 9,
              question: "Quel est le rôle du Team Leader IA dans cette matrice ?",
              options: [
                "Remplacer le logiciel Git",
                "Coordonner les missions, vérifier les dépendances et affecter les agents aux espaces de travail",
                "Autoriser automatiquement les merges sur main",
                "Supprimer les conversations des développeurs"
              ],
              correctIndex: 1,
              explanation: "Le Team Leader est le chef d'orchestre tactique qui répartit les missions et surveille les statuts."
            },
            {
              id: 10,
              question: "Quel est le rôle souverain du Project Manager humain ?",
              options: [
                "Écrire lui-même chaque ligne de code",
                "Conserver le contrôle des décisions stratégiques et valider les autorisations d'intégration",
                "Laisser les agents décider seuls des livraisons en production",
                "Remplacer les tests unitaires"
              ],
              correctIndex: 1,
              explanation: "Le PM humain est le garant final du produit et le seul à autoriser les fusions sur main."
            }
          ]}
        />
      </section>
    </div>
  );
};
