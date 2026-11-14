'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  // Navigation dans les 10 étapes du TP
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du TP */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shrink-0">
            Module 6 &bull; Travaux Pratiques de Synthèse
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Orchestration & Délégation Opérationnelle
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          TP de fin de module : Décomposer une fonctionnalité logicielle et préparer les prompts des agents
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Dans ce grand TP, vous incarnez le <strong>Team Leader IA</strong>. Votre mission : prendre en charge le besoin fonctionnel exprimé par le Project Manager humain (« Permettre à l'utilisateur de changer le statut d'une tâche existante depuis l'interface TaskFlow ») et le transformer en une organisation de travail complète, jalonnée en 10 étapes méthodiques avec les 5 prompts de délégation prêts pour l'équipe d'agents.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle d'or de la gouvernance Git :</p>
        <p>
          Ce TP porte exclusivement sur l'ingénierie de spécification, la décomposition et la préparation des missions. Vous ne devez pas développer le code vous-même. Rappel impératif : <strong>aucun agent ne possède l'autorisation d'exécuter un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans la validation expresse et écrite du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Présentation du contexte TaskFlow & Les 6 intervenants */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="briefcase" className="w-5 h-5 text-indigo-600 shrink-0" />
          Contexte du Projet & Les 6 Agents de l'Équipe
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
          TaskFlow est une application web développée en <strong>TypeScript strict</strong>, <strong>Node.js / Express</strong> (API REST), <strong>React / Vite / Tailwind CSS</strong> (Frontend) et un <strong>stockage temporaire en mémoire</strong>. Chaque tâche possède un <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">id</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">title</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">description</code> et <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">status</code> (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">todo</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">in_progress</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">done</code>).
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-indigo-700 dark:text-indigo-400">Team Leader (Vous)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Organise les missions, découpe les besoins, surveille les dépendances et prépare les synthèses. Ne code pas.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-blue-700 dark:text-blue-400">Architect</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Spécifie le contrat REST partagé (route, payload JSON, codes HTTP) dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">docs/architecture/api-contracts.md</code>.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-emerald-700 dark:text-emerald-400">Backend</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Implémente la route PATCH Express, valide le statut et met à jour la mémoire dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">backend/src/</code>.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-purple-700 dark:text-purple-400">Frontend</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Développe le sélecteur de statut dans le composant React <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">TaskItem.tsx</code> et actualise les compteurs.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-amber-700 dark:text-amber-400">QA</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Prépare les scénarios de test (transitions valides, erreurs 400 et 404) et valide la cohérence d'intégration.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-rose-700 dark:text-rose-400">Reviewer</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Audite le code produit, contrôle le respect du contrat d'API et émet un rapport critique indépendant.
            </p>
          </div>
        </div>
      </div>

      {/* Navigateur des 10 étapes du TP */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
            <Icon name="clipboard-document-check" className="w-5 h-5 text-primary-600 shrink-0" />
            Atelier Guidé : Les 10 Étapes de la Démarche
          </h2>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 hover:bg-primary-200 shrink-0 transition-colors"
          >
            {showSolution ? 'Masquer le corrigé détaillé' : 'Afficher le corrigé détaillé'}
          </button>
        </div>

        {/* Sélecteur des 10 étapes */}
        <div className="flex flex-wrap gap-2 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((stepNum) => (
            <button
              key={stepNum}
              onClick={() => setActiveStep(stepNum)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                activeStep === stepNum
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Étape {stepNum}
            </button>
          ))}
        </div>

        {/* Panneau de l'étape active */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-4 w-full min-w-0 max-w-full">
          {activeStep === 1 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 1 &bull; Analyser le Besoin Logiciel
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Qualifier la demande, borner le périmètre et identifier les contraintes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                L'utilisateur souhaite modifier le statut d'une tâche et voir les compteurs mis à jour. L'analyse sépare le problème, le périmètre inclus (sélection UI, requête PATCH, validation, compteurs) et le hors-périmètre (pas de base externe, pas d'auth).
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Extrait du corrigé officiel — Fiche d'Analyse du Besoin :</span>
                  <div className="p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
{`- Problème : L'utilisateur ne peut pas faire évoluer l'état de traitement d'une tâche.
- Besoin : Sélectionner un nouveau statut (todo, in_progress, done), enregistrer en mémoire, actualiser l'UI et les compteurs.
- Inclus : Contrôle React de sélection, endpoint PATCH backend, validation du statut, gestion des erreurs 400 et 404.
- Hors périmètre : Pas d'auth, pas de base de données, pas de notification, pas d'historique de statut.
- Contraintes : TypeScript strict, Express, React, REST, Vitest/Supertest.`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 2 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 2 &bull; Décomposer la Fonctionnalité en Tâches
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Structurer les 8 tâches cohérentes du sprint
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Fractionner le travail en unités délimitées couvrant l'architecture, le backend, le frontend, les tests, la revue et la consolidation.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Les 8 tâches du sprint TaskFlow :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`T1 : Définir le contrat technique REST (Architect)
T2 : Développer la modification du statut côté serveur (Backend)
T3 : Développer l'interface de changement de statut (Frontend)
T4 : Préparer les scénarios et le plan de test (QA)
T5 : Exécuter la suite de tests d'intégration (QA)
T6 : Examiner le code et la conformité au contrat (Reviewer)
T7 : Traiter les anomalies éventuelles (Agent concerné)
T8 : Consolider les résultats et préparer la synthèse (Team Leader)`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 3 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 3 &bull; Définir Objectifs, Résultats Attendus et Livrables
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Spécifier des artefacts vérifiables pour chaque intervenant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Distinguer l'objectif fonctionnel, le résultat attendu et le livrable physique (fichier créé/modifié).
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Matrice des livrables :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`| Tâche | Objectif                             | Résultat attendu             | Livrable concret                         |
|-------|--------------------------------------|------------------------------|------------------------------------------|
| T1    | Établir la référence commune         | Contrat REST documenté       | docs/architecture/api-contracts.md       |
| T2    | Modifier le statut côté serveur      | API Express fonctionnelle    | backend/src/routes/taskRoutes.ts + tests |
| T3    | Permettre la modification dans l'UI  | Contrôle React dans TaskItem | frontend/src/components/TaskItem.tsx     |
| T4    | Cadrer les vérifications             | Plan de test exhaustif       | docs/qa/status-test-plan.md              |
| T5    | Recetter l'intégration de bout en bout| Preuves de test exécutées    | reports/qa-integration-report.md         |
| T6    | Auditer la qualité et le typage      | Recommandations de revue     | reports/reviews/status-review.md         |`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 4 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 4 &bull; Identifier les Dépendances (Graphe DAG)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Représenter l'enchaînement logique et prévenir les blocages
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Le contrat T1 est le pivot : dès qu'il est validé, T2 (Backend), T3 (Frontend) et T4 (QA) peuvent démarrer indépendamment.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Graphe de dépendances (DAG) :</span>
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                    <pre>{`Analyse du besoin &rarr; T1 (Contrat API)
                         &boxur;&boxdr;&boxh;&boxh; T2 (Backend)  &boxdr;&boxh;&boxh;&gt; T5 (Tests Intégration)
                         &boxur;&boxdl;&boxh;&boxh; T3 (Frontend) &boxdl;         &darr;
                         &boxur;&boxh;&boxh;&boxh;&boxh; T4 (Plan QA) &boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxj;    T6 (Revue de Code)
                                                      &darr;
                                                T7 (Corrections éventuelles)
                                                      &darr;
                                                T8 (Consolidation Team Leader)`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 5 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 5 &bull; Organiser le Travail en Parallèle
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Planifier les 4 phases du sprint et isoler les espaces de travail
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                La phase 2 réunit le Backend, le Frontend et le QA en simultané, chacun dans son Git Worktree dédié pour éviter toute collision de fichiers.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Les 4 phases de déroulement :</span>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5">
                    <li><strong>Phase 1 — Cadrage :</strong> Analyse du besoin et rédaction du contrat API par l'Architect (T1).</li>
                    <li><strong>Phase 2 — Parallélisme :</strong> Développement de la route backend (T2), création du sélecteur React (T3) et préparation des scénarios QA (T4).</li>
                    <li><strong>Phase 3 — Intégration & Revue :</strong> Recette d'intégration par le QA (T5) et audit de code indépendant par le Reviewer (T6).</li>
                    <li><strong>Phase 4 — Clôture :</strong> Traitement des anomalies (T7) et synthèse pour le PM humain (T8).</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeStep === 6 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 6 &bull; Attribuer les Missions aux Agents (Matrice RACI)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Attribuer les tâches aux profils experts sans chevauchement
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Chaque mission a un responsable unique. Le Project Manager humain est le validateur exclusif.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Matrice de responsabilités TaskFlow :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`| Tâche             | Responsable | Contributeurs         | Validateur Final |
|-------------------|-------------|-----------------------|------------------|
| T1 - Contrat REST | Architect   | Backend, Frontend     | PM Humain        |
| T2 - Backend API  | Backend     | Architect             | Reviewer & QA    |
| T3 - Frontend UI  | Frontend    | Architect             | Reviewer & QA    |
| T4 - Plan tests   | QA          | Backend, Frontend     | Team Leader      |
| T5 - Tests intégr.| QA          | Backend, Frontend     | Team Leader / PM |
| T6 - Revue code   | Reviewer    | Auteurs du code       | PM Humain        |`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 7 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 7 &bull; Définir les Critères d'Acceptation
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Établir les critères fonctionnels (CA), techniques (CT) et qualité (CQ)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Chaque critère doit être associé à une méthode de vérification concrète et auditable.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Critères d'acceptation certifiés :</span>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5">
                    <li><strong>CA1 :</strong> L'utilisateur peut sélectionner l'un des 3 statuts autorisés (todo, in_progress, done).</li>
                    <li><strong>CA2 :</strong> Une sélection valide déclenche une requête HTTP PATCH vers <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">/api/tasks/:id/status</code>.</li>
                    <li><strong>CA3 :</strong> Le statut est mis à jour sans altérer le titre ni la description de la tâche.</li>
                    <li><strong>CA4 :</strong> Un statut invalide retourne HTTP 400 Bad Request.</li>
                    <li><strong>CA5 :</strong> Une tâche inexistante retourne HTTP 404 Not Found.</li>
                    <li><strong>CA6 :</strong> Les compteurs par statut sont recalculés dynamiquement et restent fidèles aux données.</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeStep === 8 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 8 &bull; Rédiger les 5 Prompts de Mission
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Produire les 5 prompts opérationnels basés sur le même contrat API
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Rédiger les prompts pour l'Architect, le Backend, le Frontend, le QA et le Reviewer avec les 10 sections obligatoires et l'interdiction de merge/push.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Contrat REST commun partagé dans tous les prompts :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`Endpoint : PATCH /api/tasks/:id/status
Content-Type : application/json
Payload : { "status": "in_progress" }  // todo | in_progress | done
Réponse 200 OK : { "id": "123", "title": "...", "description": "...", "status": "in_progress" }
Erreur 400 : { "error": "Invalid status value" }
Erreur 404 : { "error": "Task not found" }`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 9 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 9 &bull; Préparer le Tableau de Suivi du Team Leader
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Suivre l'avancement avec les 6 états normalisés
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                États : À préparer &rarr; En attente &rarr; En cours &rarr; Bloquée &rarr; À vérifier &rarr; Terminée.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Tableau de bord opérationnel :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`| ID | Mission            | Agent     | Dépendance        | État       | Livrable audité                      |
|----|--------------------|-----------|-------------------|------------|--------------------------------------|
| T1 | Contrat REST       | Architect | Analyse du besoin | À préparer | docs/architecture/api-contracts.md   |
| T2 | Route Backend      | Backend   | T1                | En attente | backend/src/controllers/task...      |
| T3 | Sélecteur Frontend | Frontend  | T1                | En attente | frontend/src/components/TaskItem.tsx |
| T4 | Scénarios QA       | QA        | T1                | En attente | docs/qa/status-test-plan.md          |
| T5 | Tests Intégration  | QA        | T2, T3, T4        | En attente | reports/qa-integration-report.md     |
| T6 | Revue de Code      | Reviewer  | T2, T3            | En attente | reports/reviews/status-review.md     |`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 10 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 10 &bull; Vérification Globale de la Cohérence
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Auditer les 5 axes de cohérence avant de transmettre les missions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Vérifier la cohérence fonctionnelle, technique, organisationnelle, des critères d'acceptation et des prompts.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Synthèse de validation documentaire :</span>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5">
                    <li><strong>Cohérence fonctionnelle :</strong> Le besoin est entièrement couvert, sans fonctionnalités superflues hors périmètre.</li>
                    <li><strong>Cohérence technique :</strong> Tous les agents utilisent la même route <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">PATCH /api/tasks/:id/status</code> et la même structure JSON.</li>
                    <li><strong>Cohérence organisationnelle :</strong> Aucun agent n'intervient hors de ses dossiers dédiés.</li>
                    <li><strong>Souveraineté Git :</strong> Aucun prompt n'autorise de push ou de merge. Le Project Manager humain conserve le contrôle exclusif.</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Grille d'évaluation sur 100 points */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="chart-bar" className="w-5 h-5 text-emerald-600 shrink-0" />
          Grille d'Évaluation Officielle du TP (100 Points)
        </h2>
        <div className="flex flex-col gap-2 w-full min-w-0 max-w-full text-xs sm:text-sm">
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Analyse du besoin et délimitation du périmètre</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Décomposition cohérente en tâches</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Définition des objectifs et résultats attendus</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Identification correcte des dépendances (DAG)</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Organisation du travail séquentiel et parallèle</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Attribution cohérente des missions (Matrice RACI)</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Définition de critères d'acceptation vérifiables</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Qualité et complétude des 5 prompts de mission</span>
            <span className="font-bold text-primary-600 shrink-0">15 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Organisation du suivi des missions</span>
            <span className="font-bold text-primary-600 shrink-0">5 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Vérification globale de la cohérence</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
        </div>
      </div>

      {/* Quiz de fin de TP / Module */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Validation Finale du Module 6
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de Synthèse du Grand TP TaskFlow
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez que vous maîtrisez l'ensemble de la chaîne de préparation, d'analyse, d'ordonnancement et de délégation aux agents IA.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel artefact permet de déconnecter le développement Frontend et Backend pour les faire travailler en parallèle ?",
              options: [
                "Le contrat d'API REST partagé et validé",
                "Le fichier package.json",
                "Une conversation de chat informelle",
                "Le terminal système"
              ],
              correctIndex: 0,
              explanation: "Le contrat d'API fige les routes, méthodes HTTP et schémas JSON, permettant aux deux développeurs de travailler simultanément sans se bloquer."
            },
            {
              id: 2,
              question: "Quelle méthode HTTP est la plus adaptée pour modifier uniquement le statut d'une tâche existante ?",
              options: [
                "PATCH",
                "POST",
                "GET",
                "DELETE"
              ],
              correctIndex: 0,
              explanation: "PATCH permet d'appliquer une modification partielle à une ressource existante (ici le champ 'status')."
            },
            {
              id: 3,
              question: "Quel rôle est interdit d'écrire ou de modifier du code source de production ?",
              options: [
                "Le Team Leader et le Reviewer",
                "L'Agent Frontend",
                "L'Agent Backend",
                "Tous les agents peuvent modifier tous les fichiers"
              ],
              correctIndex: 0,
              explanation: "Le Team Leader coordonne et le Reviewer audite : ils ne modifient pas directement le code source d'implémentation."
            },
            {
              id: 4,
              question: "Que doit faire un agent lorsqu'une exigence essentielle manque dans son prompt de mission ?",
              options: [
                "Inventer la solution la plus rapide sans prévenir",
                "Suspendre la tâche et demander une clarification au Team Leader",
                "Supprimer les tests unitaires",
                "Modifier le contrat API sans coordination"
              ],
              correctIndex: 1,
              explanation: "Un agent ne doit jamais supposer une règle métier manquante : il doit solliciter un arbitrage auprès du Team Leader."
            },
            {
              id: 5,
              question: "Que signifie un critère d'acceptation à l'état 'Non vérifié' ?",
              options: [
                "Qu'il a échoué à un test automatisé",
                "Qu'aucune preuve suffisante ou test n'a encore été produit pour attester de son fonctionnement",
                "Qu'il est automatiquement validé",
                "Qu'il doit être supprimé du cahier des charges"
              ],
              correctIndex: 1,
              explanation: "Un critère non vérifié signifie qu'aucun test ni audit n'a encore apporté la preuve formelle de sa conformité."
            },
            {
              id: 6,
              question: "Pourquoi l'utilisation de Git Worktrees est-elle particulièrement recommandée lors de l'exécution parallèle ?",
              options: [
                "Elle supprime tous les bugs de code",
                "Elle offre à chaque agent son propre répertoire physique isolé sur sa branche dédiée",
                "Elle remplace l'interpréteur TypeScript",
                "Elle permet de contourner les validations humaines"
              ],
              correctIndex: 1,
              explanation: "Git Worktrees isole les espaces de travail physique sur disque, évitant ainsi les verrous de fichiers et écrasements concurrents."
            },
            {
              id: 7,
              question: "Qui est le validateur final souverain de toute Pull Request ou merge dans la branche principale ?",
              options: [
                "L'Agent Reviewer",
                "Le Team Leader",
                "Le Project Manager humain",
                "L'Agent QA"
              ],
              correctIndex: 2,
              explanation: "La gouvernance de TaskFlow repose sur le monopole souverain du Project Manager humain pour toute opération Git sensible."
            },
            {
              id: 8,
              question: "Combien de sections clés composent l'anatomie d'un prompt de mission idéal ?",
              options: [
                "3 sections",
                "10 sections",
                "Une seule phrase suffit",
                "25 sections"
              ],
              correctIndex: 1,
              explanation: "L'anatomie complète comprend 10 sections progressives garantissant la clarté du mandat et le respect du périmètre."
            },
            {
              id: 9,
              question: "Face à une demande utilisateur suggérant d'ajouter une base PostgreSQL dans TaskFlow, que doit faire le Team Leader ?",
              options: [
                "Installer immédiatement PostgreSQL",
                "Rejeter la demande comme hors périmètre v1 et la signaler au PM humain",
                "Confier l'installation au Frontend",
                "Arrêter le projet TaskFlow"
              ],
              correctIndex: 1,
              explanation: "La contrainte technique validée est le stockage en mémoire. Toute extension externe relève d'une décision souveraine du PM humain."
            },
            {
              id: 10,
              question: "Quelle est la meilleure approche pour garantir la cohérence des compteurs de statut dans TaskFlow ?",
              options: [
                "Maintenir des variables indépendantes incrémentées manuellement",
                "Calculer dynamiquement les compteurs à partir de la collection des tâches enregistrées",
                "Afficher des valeurs fixes aléatoires",
                "Supprimer les compteurs pour simplifier l'application"
              ],
              correctIndex: 1,
              explanation: "Calculer les compteurs à partir de la collection réelle des tâches évite toute désynchronisation ou dérive d'état."
            }
          ]}
        />
      </div>
    </div>
  );
};
