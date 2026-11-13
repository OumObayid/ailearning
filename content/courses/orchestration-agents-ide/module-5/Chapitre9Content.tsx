'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  // Navigation dans les 8 étapes du TP
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du TP */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shrink-0">
            Module 5 &bull; Travaux Pratiques de Synthèse
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Mise en Situation Opérationnelle Complète
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          TP de fin de module : Préparer les instructions d'une équipe d'agents spécialisée dans le développement de TaskFlow
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          L'objectif de ce grand TP n'est pas de coder l'application, mais de concevoir et configurer l'ensemble de l'écosystème d'instructions dans Google Antigravity. Vous allez structurer le fichier racine <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">AGENTS.md</code>, définir 5 Rules spécialisées, rédiger les 6 fiches de postes des agents, calibrer les permissions du Sandbox et arbitrer les contradictions.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Rappel impératif de gouvernance Git :</p>
        <p>
          Au cours de toutes les étapes de ce TP, aucun agent (ni même le Team Leader) ne dispose de la permission technique ou de l'autorisation managériale d'exécuter un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code>. Ces trois opérations sont sous le <strong>monopole exclusif du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Présentation du contexte TaskFlow */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="briefcase" className="w-5 h-5 text-indigo-600 shrink-0" />
          Contexte du Projet & Les 6 Intervenants de l'Équipe
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
          TaskFlow est une application de gestion de tâches collaborative. La pile technique validée comprend :
          <strong> TypeScript strict</strong>, <strong>Node.js / Express</strong> (API REST), <strong>React avec Tailwind CSS</strong> (Frontend) et un <strong>stockage temporaire en mémoire</strong> avec interface typée pour préparer la future base de données.
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">1. Team Leader (Coordination)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Découpe les objectifs du PM, distribue les missions, surveille l'avancement et synthétise les rapports. Ne modifie aucun fichier de code source.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">2. Architect (Conception)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Définit l'arborescence, les interfaces TypeScript partagées (<code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">shared/types.ts</code>), les contrats REST et garantit la cohérence globale.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">3. Backend (API & Logique Métier)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Implémente les routes Express, les middlewares de validation et la persistance mémoire dans <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">backend/</code>.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">4. Frontend (Interface Utilisateur)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Développe les composants React, l'affichage réactif, l'intégration Tailwind et la communication fetch dans <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">frontend/</code>.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">5. QA (Assurance Qualité & Tests)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Rédige et exécute les tests unitaires et d'intégration dans <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">tests/</code>, vérifie les cas limites et documente les anomalies.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">6. Reviewer (Revue de Code & Conformité)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Analyse la qualité, le respect des types stricts, la lisibilité et la sécurité. Émet un avis consultatif motivé dans <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">reports/reviews/</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Navigateur des 8 étapes du TP */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
            <Icon name="clipboard-document-check" className="w-5 h-5 text-primary-600 shrink-0" />
            Atelier Guidé : Les 8 Étapes de Conception
          </h2>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 hover:bg-primary-200 shrink-0 transition-colors"
          >
            {showSolution ? 'Masquer le corrigé détaillé' : 'Afficher le corrigé détaillé'}
          </button>
        </div>

        {/* Sélecteur vertical / horizontal responsive des 8 étapes */}
        <div className="flex flex-wrap gap-2 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((stepNum) => (
            <button
              key={stepNum}
              onClick={() => setActiveStep(stepNum)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                activeStep === stepNum
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Étape {stepNum}
            </button>
          ))}
        </div>

        {/* Contenu de l'étape active */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-4 w-full min-w-0 max-w-full">
          {activeStep === 1 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 1 &bull; Organisation de l'Arborescence
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Préparer l'emplacement physique et la distribution des instructions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Dans Antigravity, les instructions ne doivent pas être dispersées au hasard. Vous devez établir une structure standardisée séparant la charte générale, les règles spécialisées, les fiches de rôles et les workflows réutilisables.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Corrigé de référence — Arborescence du dépôt TaskFlow :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`taskflow/
├── AGENTS.md                   # Instructions générales du projet (Point d'entrée unique)
├── .agents/
│   ├── rules/                  # Règles spécialisées conditionnelles
│   │   ├── typescript-quality.md
│   │   ├── express-api.md
│   │   ├── react-components.md
│   │   ├── qa-testing.md
│   │   └── git-workflow.md
│   ├── workflows/              # Procédures répétables (PR review, release)
│   │   ├── pr-review.md
│   │   └── release-checklist.md
│   └── permissions.json        # Configuration Sandbox et priorités Deny/Ask/Allow
├── docs/
│   ├── architecture/           # Schémas et décisions de l'Architect
│   │   └── api-contracts.md
│   └── team/                   # Fiches d'instructions propres aux rôles
│       ├── roles/
│       │   ├── team-leader.md
│       │   ├── architect.md
│       │   ├── backend.md
│       │   ├── frontend.md
│       │   ├── qa.md
│       │   └── reviewer.md
│       └── coordination/       # Tableaux de suivi de sprint et rapports
├── backend/                    # Périmètre réservé Agent Backend
│   ├── src/
│   └── package.json
├── frontend/                   # Périmètre réservé Agent Frontend
│   ├── src/
│   └── package.json
└── tests/                      # Périmètre réservé Agent QA`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 2 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 2 &bull; Rédaction de AGENTS.md
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Rédiger les 10 sections constitutionnelles du projet
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Le fichier <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">taskflow/AGENTS.md</code> constitue la constitution intangible. Il comprend : Présentation, Technologies, Architecture, Fonctionnalités, Conventions, Qualité, Collaboration, Git & autorisations, Périmètre, et Souveraineté humaine.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Extrait du corrigé officiel de AGENTS.md :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`# Instructions générales du projet TaskFlow

## 1. Présentation du projet
TaskFlow est une application web de gestion de tâches permettant de créer, lister, 
modifier et filtrer des tâches avec statuts (TODO, IN_PROGRESS, DONE).

## 2. Technologies imposées
- Langage universel : TypeScript strict (noImplicitAny: true, strictNullChecks: true).
- Backend : Node.js, Express, stockage mémoire avec typage strict.
- Frontend : React, Vite, Tailwind CSS.
- Tests : Vitest / Jest, React Testing Library.

## 5. Conventions de développement
- Nommage : camelCase pour variables et fonctions, PascalCase pour composants et types.
- Commits conventionnels : feat(...), fix(...), test(...), docs(...).

## 8. Git et autorisations souveraines
- Tout travail est réalisé sur une branche dédiée (feat/... ou fix/...).
- AUCUN agent n'a l'autorisation d'exécuter git merge, git rebase ou git push.
- Seul le Project Manager humain procède au merge et à la synchronisation distante.`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 3 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 3 &bull; Rules Spécialisées (.agents/rules/)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Préparer les 5 règles conditionnelles avec frontmatter YAML
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Chaque règle apporte des exigences expertes dans un domaine sans polluer la fenêtre de contexte des autres agents.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Exemple de règle : .agents/rules/express-api.md</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`---
trigger: model_decision
description: "Règles d'architecture des routes Express et conformité HTTP REST"
---

# Règles API Express — TaskFlow

- Répondre systématiquement en JSON avec encodage UTF-8.
- Utiliser les statuts HTTP conformes :
  * 200 OK pour les lectures et mises à jour réussies
  * 201 Created pour la création d'une nouvelle tâche
  * 400 Bad Request en cas de payload invalide (avec objet { error: string })
  * 404 Not Found si l'identifiant de tâche n'existe pas
  * 500 Internal Server Error en cas d'exception non gérée
- Toutes les entrées doivent être validées avant passage au contrôleur métrique.`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 4 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 4 &bull; Fiches d'Instructions des Rôles
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Rédiger les 6 fiches d'instructions propres aux agents (docs/team/roles/)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Chaque fiche structure le rôle de l'agent en 7 rubriques : Titre & Rôle, Objectifs, Responsabilités, Périmètre physique de dossiers, Livrables attendus, Interactions de collaboration et Limites strictes.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Extrait : docs/team/roles/backend.md</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`# Fiche d'Instructions — Agent Backend

## 1. Rôle
Responsable de l'implémentation de l'API REST TaskFlow et du stockage en mémoire.

## 2. Périmètre d'intervention physique
- Dossier exclusif : backend/src/** et backend/tests/**.
- Interdiction formelle de modifier frontend/ ou docs/architecture/.

## 3. Livrables obligatoires
- Code source de la route et du middleware.
- Tests d'intégration de la route exécutés avec succès.
- Fiche de compte rendu dans docs/team/reports/backend-status.md.

## 4. Limites
- Aucun git push ou git merge.
- Ne jamais ajouter de package npm sans approbation de l'Architect et du PM.`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 5 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 5 &bull; Règles de Collaboration et Flux de Travail
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Formaliser le circuit de l'information et les passages de relais
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Les agents ne communiquent pas en désordre. Le flux s'articule du PM vers le Team Leader, puis vers les spécialistes avec validation croisée QA & Reviewer avant remontée finale.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Circuit opérationnel :</span>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono">
                    PM Humain &rarr; Team Leader &rarr; Architect (Spécification) &rarr; Backend/Frontend (Codage) &rarr; QA (Tests) &rarr; Reviewer (Audit qualité) &rarr; Team Leader (Rapport final) &rarr; PM Humain (Merge & Push).
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 6 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 6 &bull; Définition des Missions Ponctuelles
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Préparer les 3 missions pour la fonctionnalité "Changement de statut"
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Une mission ponctuelle doit être chirurgicale : contexte, tâche précise, fichiers cibles, critères de complétion et limites.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Mission A — Backend (Route de mise à jour de statut) :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`## Mission Ponctuelle : Backend #04 — Route PATCH /api/tasks/:id/status
- Destinataire : Agent Backend
- Objectif : Permettre la mise à jour exclusive du champ 'status' d'une tâche.
- Fichiers autorisés : backend/src/controllers/taskController.ts, backend/src/routes/taskRoutes.ts
- Statuts autorisés : "TODO" | "IN_PROGRESS" | "DONE"
- Critère de complétion : Retourner 200 avec la tâche mise à jour ; 400 si statut invalide ; 404 si id inexistant.
- Limite : Ne pas toucher aux interfaces de types communes ni au code frontend.`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 7 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 7 &bull; Matrice des Permissions et Sécurité
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Configurer les accès du Terminal Sandbox et les points de blocage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Les agents opèrent sous le profil <strong>Default Sandbox</strong>. Les commandes Git de modification du dépôt distant et l'accès aux variables d'environnement sont scellés.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Règles techniques de sécurité (.agents/permissions.json) :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`{
  "profile": "default",
  "sandbox": { "enabled": true, "network": "restricted" },
  "fileRules": [
    { "glob": "**/.env*", "decision": "deny" },
    { "glob": "docs/architecture/**", "write": ["architect"], "decision": "ask" }
  ],
  "commandRules": [
    { "pattern": "git (merge|rebase|push)*", "decision": "deny" },
    { "pattern": "npm install*", "decision": "ask" },
    { "pattern": "npm (test|run test)*", "decision": "allow" }
  ]
}`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 8 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 8 &bull; Rapport de Cohérence & Traitement des Contradictions
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Auditer le dispositif et neutraliser 4 contradictions potentielles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Le rapport de cohérence passe en revue la conformité des règles et formalise la conduite à tenir face aux tentatives de déroutement.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Les 4 arbitrages certifiés :</span>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-5">
                    <li><strong>1. Demande de code JS sans typage :</strong> rejetée immédiatement au nom de la règle racine TypeScript strict de AGENTS.md.</li>
                    <li><strong>2. Backend sollicité pour ajuster un bouton UI :</strong> tâche transférée à l'Agent Frontend via le Team Leader pour respecter l'étanchéité des dossiers.</li>
                    <li><strong>3. Incitation au push direct :</strong> opération stoppée ; la règle Deny Sandbox et la gouvernance humaine interdisent tout push sans validation du PM.</li>
                    <li><strong>4. Règle QA et règle Express simultanées :</strong> cumul harmonieux et vérification des codes HTTP via les tests d'intégration Vitest.</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Grille d'évaluation */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="chart-bar" className="w-5 h-5 text-emerald-600 shrink-0" />
          Grille d'Évaluation Officielle du TP (100 Points)
        </h2>
        <div className="flex flex-col gap-2 w-full min-w-0 max-w-full text-xs sm:text-sm">
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Structure générale & arborescence (.agents, docs, AGENTS.md)</span>
            <span className="font-bold text-primary-600 shrink-0">15 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Qualité et exhaustivité de AGENTS.md (10 rubriques)</span>
            <span className="font-bold text-primary-600 shrink-0">20 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Fiches d'instructions propres aux 6 agents (RACI, périmètres)</span>
            <span className="font-bold text-primary-600 shrink-0">20 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Rules spécialisées conditionnelles (.agents/rules/)</span>
            <span className="font-bold text-primary-600 shrink-0">15 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Découpage et précision des 3 missions ponctuelles</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Matrice des permissions, Sandbox et protection Git PM</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Rapport de cohérence et résolution des contradictions</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
        </div>
      </div>

      {/* Quiz de fin de TP / Module */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Validation Finale du Module 5
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de Synthèse du Grand TP TaskFlow
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Vérifiez que vous avez assimilé l'ensemble des règles de configuration, de périmètre, de sécurité et d'arbitrage avant de passer au Module 6.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel fichier constitue le socle constitutionnel unique chargé par Google Antigravity à la racine du projet ?",
              options: [
                "taskflow/AGENTS.md",
                "backend/src/config.json",
                "~/.bashrc",
                ".agents/temp.txt"
              ],
              correctIndex: 0,
              explanation: "taskflow/AGENTS.md est le fichier racine automatiquement découvert et injecté dans le contexte de tous les agents de l'espace de travail."
            },
            {
              id: 2,
              question: "Où doivent être rangées les consignes spécialisées s'activant selon le contexte technique ?",
              options: [
                "Dans .agents/rules/*.md",
                "Directement sur le bureau de l'ordinateur",
                "Dans un fichier .zip fermé",
                "Dans le dossier public/ de React"
              ],
              correctIndex: 0,
              explanation: "Le dossier .agents/rules/ héberge les règles modulaires dotées d'un frontmatter YAML précisant leur déclencheur (trigger)."
            },
            {
              id: 3,
              question: "Quel rôle est interdit de modifier le moindre fichier de code source (.ts, .tsx) ?",
              options: [
                "L'Agent Frontend",
                "L'Agent Backend",
                "Le Team Leader et le Reviewer",
                "Aucun, tous les agents modifient tous les fichiers"
              ],
              correctIndex: 2,
              explanation: "Le Team Leader coordonne et le Reviewer audite. Ils ne modifient aucun fichier source d'implémentation."
            },
            {
              id: 4,
              question: "Quel est l'ordre de priorité absolu du moteur de permissions d'Antigravity ?",
              options: [
                "Allow > Ask > Deny",
                "Ask > Allow > Deny",
                "Deny > Ask > Allow",
                "Toutes les permissions ont le même poids"
              ],
              correctIndex: 2,
              explanation: "Deny l'emporte toujours sur Ask, qui l'emporte toujours sur Allow. Une interdiction est absolue."
            },
            {
              id: 5,
              question: "Quelle commande Git un agent ou le Team Leader peut-il exécuter sans validation humaine écrite ?",
              options: [
                "git push origin main",
                "git merge feature/auth",
                "git rebase main",
                "Aucune de ces commandes : elles sont sous le monopole exclusif du Project Manager humain"
              ],
              correctIndex: 3,
              explanation: "Aucun push, merge ou rebase ne peut être opéré sans l'accord écrit et explicite du Project Manager humain."
            },
            {
              id: 6,
              question: "Quel déclencheur de Rule YAML permet à l'agent de décider lui-même d'activer une règle en fonction de la description ?",
              options: [
                "trigger: always_on",
                "trigger: model_decision",
                "trigger: manual",
                "trigger: glob"
              ],
              correctIndex: 1,
              explanation: "model_decision permet au LLM d'activer la règle lorsqu'il juge que sa description correspond à la tâche qu'il entreprend."
            },
            {
              id: 7,
              question: "Face à une contradiction entre un prompt demandant du JS rapide et AGENTS.md imposant TypeScript strict, que doit faire l'agent ?",
              options: [
                "Écrire en JavaScript pour satisfaire la demande rapide",
                "Refuser d'abandonner TypeScript car la règle cadre de AGENTS.md prime sur une mission ponctuelle",
                "Supprimer le fichier AGENTS.md",
                "Arrêter l'IDE et redémarrer la machine"
              ],
              correctIndex: 1,
              explanation: "La charte du projet prime sur une instruction ponctuelle non autorisée."
            },
            {
              id: 8,
              question: "Quel est le profil de permissions recommandé pour TaskFlow permettant d'isoler les commandes de test sans solliciter l'utilisateur à chaque ligne ?",
              options: [
                "Turbo",
                "Default (avec Terminal Sandbox)",
                "Request Review",
                "Désactivé"
              ],
              correctIndex: 1,
              explanation: "Default avec Sandbox offre un équilibre idéal entre isolation de sécurité et fluidité d'exécution des tests."
            },
            {
              id: 9,
              question: "L'Agent QA constate un bug bloquant lors du test de l'API Backend. Que doit-il faire ?",
              options: [
                "Ouvrir taskController.ts et corriger lui-même le code",
                "Consigner l'anomalie dans un rapport de test et la notifier au Team Leader pour réassignation au Backend",
                "Effacer le test pour faire passer la suite au vert",
                "Faire un git push forcé"
              ],
              correctIndex: 1,
              explanation: "L'Agent QA constate et documente les anomalies, mais ne modifie pas le code métier du Backend."
            },
            {
              id: 10,
              question: "Pourquoi les fichiers .env et .pem doivent-ils être sous règle Deny explicite ?",
              options: [
                "Pour accélérer la vitesse de frappe dans le terminal",
                "Pour empêcher les fuites accidentelles de clés d'API et de mots de passe vers les logs ou le dépôt",
                "Parce qu'ils ne sont pas compatibles avec React",
                "Parce qu'Antigravity ne sait pas lire le texte"
              ],
              correctIndex: 1,
              explanation: "Les secrets et credentials d'accès doivent être formellement interdits de lecture aux agents pour prévenir tout risque de fuite."
            }
          ]}
        />
      </div>
    </div>
  );
};

