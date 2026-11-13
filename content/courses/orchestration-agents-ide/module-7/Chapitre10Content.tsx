'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  // Navigation dans les 10 étapes du TP
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du TP */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shrink-0">
            Module 7 &bull; Grand TP de Synthèse
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Pilotage & Orchestration de Sprint en Direct
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          TP de fin de module : Orchestrer une équipe d'agents sur un ensemble de tâches interdépendantes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Dans ce grand TP d'orchestration, vous prenez les commandes du projet TaskFlow en tant que <strong>Team Leader IA</strong>. Vous allez piloter l'exécution de bout en bout de la fonctionnalité « Changement de statut d'une tâche », cadencer l'Architecte, lancer en parallèle le Backend et le Frontend dans des espaces isolés, piloter la recette QA, arbitrer un blocage réel et préparer le dossier de validation pour le Project Manager humain.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle d'or de la gouvernance et de la souveraineté Git :</p>
        <p>
          Ce TP simule l'orchestration complète d'une escouade d'agents. À aucune étape, un agent ou le Team Leader ne peut effectuer de fusion ou d'envoi distant : <strong>tout <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> relève du monopole souverain et écrit du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Présentation du contexte TaskFlow & Les 6 intervenants */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="briefcase" className="w-5 h-5 text-indigo-600 shrink-0" />
          Rappel du Contexte TaskFlow & Les 6 Rôles Opérationnels
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
          TaskFlow gère des tâches avec les statuts <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">todo</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">in_progress</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">done</code>. La nouvelle fonctionnalité doit permettre de basculer une tâche d'un état à un autre via une route <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">PATCH /api/tasks/:id/status</code>, d'actualiser l'affichage React et de recalculer dynamiquement les compteurs.
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-indigo-700 dark:text-indigo-400">Team Leader (Vous)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Ordonnancement, supervision du tableau de bord, levée des blocages et consolidation pour le PM.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-blue-700 dark:text-blue-400">Architect</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Définit le contrat d'interface REST (M1) servant de socle commun au Backend et au Frontend.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-emerald-700 dark:text-emerald-400">Backend</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Développe la route PATCH Express et valide le store mémoire (M2).
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-purple-700 dark:text-purple-400">Frontend</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Intègre le sélecteur dans le composant React TaskItem et synchronise les compteurs (M3).
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-amber-700 dark:text-amber-400">QA</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Rédige les scénarios QA-01 à QA-08 et teste l'intégration de bout en bout (M4).
            </p>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-rose-700 dark:text-rose-400">Reviewer</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Audite les diffs de code, vérifie le typage strict et rédige le rapport de revue (M5).
            </p>
          </div>
        </div>
      </div>

      {/* Navigateur des 10 étapes du TP */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
            <Icon name="clipboard-document-check" className="w-5 h-5 text-primary-600 shrink-0" />
            Atelier Guidé : Les 10 Étapes de l'Orchestration
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
                Étape 1 &bull; Analyse du Besoin & Cadrage Initial
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Formaliser le besoin, les règles métiers et le périmètre strict
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                L'utilisateur doit pouvoir changer le statut d'une tâche. Si elle passe de todo à done, le compteur todo baisse de 1 et done augmente de 1. Les erreurs 400 (statut invalide) et 404 (tâche inexistante) doivent être gérées.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Extrait du livrable 01-analyse-besoin.md :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`- Fonctionnalité : Modification du statut d'une tâche existante depuis l'interface.
- Règles de calcul : Déplacement unitaire entre catégories de statut (total constant).
- Inclus : Route PATCH serveur, sélection UI React, gestion erreurs 400/404, recalcul compteurs.
- Exclus : Pas d'authentification, pas de persistance SQL, pas de websockets.`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 2 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 2 &bull; Décomposer en 5 Missions Clés
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Structurer les 5 fiches de mission avec objectifs et livrables
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                M1 (Architect), M2 (Backend), M3 (Frontend), M4 (QA) et M5 (Reviewer).
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Attribution des 5 missions :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`| ID | Mission              | Agent     | Livrable attendu                    |
|----|----------------------|-----------|-------------------------------------|
| M1 | Contrat technique    | Architect | docs/architecture/api-contracts.md  |
| M2 | Modification statut  | Backend   | backend/src/routes/ + tests unitaires|
| M3 | Interface sélection  | Frontend  | frontend/src/components/TaskItem.tsx|
| M4 | Recette d'intégration| QA        | reports/qa-report.md (QA-01 à QA-08)|
| M5 | Audit de conformité  | Reviewer  | reports/reviews/reviewer-report.md  |`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 3 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 3 &bull; Cartographier les Dépendances (DAG)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Ordonnancer le graphe acyclique et synchroniser les passages de relais
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                M1 alimente simultanément M2, M3 et la préparation M4. Puis M2 et M3 convergent vers la recette M4 et l'audit M5.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Graphe d'ordonnancement de sprint :</span>
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                    <pre>{`M1 (Contrat REST)
   &boxur;&boxdr;&boxh;&boxh; M2 (Backend API)  &boxdr;&boxh;&boxh;&gt; M4 (Tests Intégration QA) &boxh;&boxh;&gt; M5 (Revue de Code)
   &boxur;&boxdl;&boxh;&boxh; M3 (Frontend UI)  &boxdl;
   &boxur;&boxh;&boxh;&boxh;&boxh; M4 (Préparation QA)`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 4 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 4 &bull; Lancer la Mission M1 (Architecte)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Figer le contrat d'API REST de référence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                L'Architecte analyse le modèle et produit le contrat <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">api-contracts.md</code>.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Contrat acté par l'Architecte :</span>
                  <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs bg-slate-900 text-slate-100 max-w-full min-w-0">
                    <pre>{`PATCH /api/tasks/:id/status
Headers: Content-Type: application/json
Payload: { "status": "in_progress" }  // todo | in_progress | done
Réponse 200 OK : { "id": "task-1", "title": "...", "status": "in_progress" }
Erreur 400 : { "error": "Invalid status value" }
Erreur 404 : { "error": "Task not found" }`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 5 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 5 &bull; Coordonner le Travail Parallèle Backend & Frontend
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Lancer en simultané dans des Git Worktrees étanches
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Chaque agent opère sur sa branche et dans son répertoire dédié sans se bloquer mutuellement.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Dispatching parallèle :</span>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5">
                    <li>Backend dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">worktrees/backend-api/</code> sur branche <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">feat/backend-status</code>.</li>
                    <li>Frontend dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">worktrees/frontend-ui/</code> sur branche <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">feat/frontend-status</code>.</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeStep === 6 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 6 &bull; Dérouler la Recette QA (Scénarios QA-01 à QA-08)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Exécuter les tests fonctionnels et vérifier la cohérence des compteurs
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                QA-01 à QA-03 (transitions valides), QA-04 (rejet 400), QA-05 (erreur 404), QA-06 (recalcul compteurs), QA-07 (affichage UI), QA-08 (erreur réseau).
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Résultats du rapport QA :</span>
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                    <pre>{`QA-01 (todo &rarr; in_progress) : SUCCÈS
QA-02 (in_progress &rarr; done) : SUCCÈS
QA-03 (done &rarr; todo)        : SUCCÈS
QA-04 (statut invalide)    : SUCCÈS (HTTP 400 Bad Request retourné)
QA-05 (id inexistant)      : SUCCÈS (HTTP 404 Not Found retourné)
QA-06 (compteurs)          : SUCCÈS (déplacement unitaire sans dérive)`}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 7 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 7 &bull; Traiter le Blocage de Format de Réponse
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Résoudre le désaccord Backend vs Frontend sur le payload JSON
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Frontend attendait <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">{`{ task: { ... } }`}</code> tandis que Backend renvoyait directement la tâche. Le Team Leader rappelle la conformité au contrat de l'Architecte.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Arbitrage B-01 documenté :</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    Le contrat <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">api-contracts.md</code> fait foi : la réponse retourne directement la tâche. L'Agent Frontend adapte sa méthode de désérialisation. Blocage résolu en 5 minutes.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeStep === 8 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 8 &bull; Organiser la Revue Indépendante de Code (Reviewer)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Auditer la propreté TypeScript, la sécurité et l'absence de régression
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Le Reviewer examine les diffs et confirme le respect des types stricts et des conventions sans aucun mot-clé <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">any</code>.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Avis du Reviewer :</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    Recommandation favorable : code propre, couverture de tests satisfaisante, zéro régression sur les routes GET existantes. Livrable prêt pour présentation au Project Manager humain.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeStep === 9 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 9 &bull; Préparer la Demande d'Autorisation de Push
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Respecter scrupuleusement la souveraineté du Project Manager
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Le Backend demande à pousser sur le dépôt distant. Le Team Leader instruit la demande sans l'exécuter.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Demande formelle instruite :</span>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                    « Tous les tests sont au vert. La branche feat/status est prête. Sollicitation du Project Manager humain pour autorisation écrite d'effectuer le push et le merge. Opération en attente. »
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 10 && (
            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Étape 10 &bull; Clôturer l'Orchestration & Synthèse Finale
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
                Bilan d'orchestration, traçabilité documentaire et capitalisation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Vérification que les 11 livrables sont archivés dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">docs/tp-module-7/</code> et que le tableau de suivi est soldé.
              </p>

              {showSolution && (
                <div className="flex flex-col gap-2 mt-2 w-full min-w-0 max-w-full">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Bilan d'orchestration certifié :</span>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5">
                    <li>Contrat REST respecté à 100% par le Backend et le Frontend.</li>
                    <li>Parallélisme parfaitement fluide sans collision de fichiers grâce aux Worktrees.</li>
                    <li>Résolution rapide du blocage B-01 par référence à la source de vérité.</li>
                    <li>Souveraineté humaine respectée : zéro merge/push non autorisé.</li>
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
            <span>Analyse du besoin et préparation de l'orchestration</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Décomposition et attribution des 5 missions</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Identification des dépendances (Graphe DAG)</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Lancement et coordination des agents</span>
            <span className="font-bold text-primary-600 shrink-0">15 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Organisation du travail parallèle (Git Worktrees)</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Suivi de l'avancement et métriques fiables</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Gestion et arbitrage d'un blocage réel</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Organisation de la revue des livrables (Reviewer)</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Intervention du Project Manager et respect des autorisations</span>
            <span className="font-bold text-primary-600 shrink-0">10 pts</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <span>Qualité du bilan final et traçabilité</span>
            <span className="font-bold text-primary-600 shrink-0">5 pts</span>
          </div>
        </div>
      </div>

      {/* Quiz de fin de TP / Module */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Validation Finale du Module 7
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de Synthèse du Grand TP TaskFlow
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez que vous maîtrisez la totalité des responsabilités d'orchestration, de supervision et d'escalade d'une équipe d'agents IA.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel rôle assure le pilotage opérationnel et la synchronisation des agents sans coder lui-même ?",
              options: [
                "L'Agent Backend",
                "Le Team Leader IA",
                "L'Agent QA",
                "L'Agent Reviewer"
              ],
              correctIndex: 1,
              explanation: "Le Team Leader orchestre les missions, suit les dépendances et supervise l'avancement sans réaliser l'implémentation de code."
            },
            {
              id: 2,
              question: "Quelle condition technique permet au Backend et au Frontend d'avancer en simultané sans se bloquer ?",
              options: [
                "L'isolation par Git Worktrees et le partage d'un contrat REST validé",
                "L'utilisation d'une base de données SQL commune",
                "La modification du même fichier component.tsx",
                "L'absence de règles dans AGENTS.md"
              ],
              correctIndex: 0,
              explanation: "Le contrat REST fige les spécifications, et les Git Worktrees fournissent des répertoires étanches sur disque pour travailler simultanément."
            },
            {
              id: 3,
              question: "Face à une tentative d'un agent d'exécuter un git push sans accord préalable, que doit faire le système ?",
              options: [
                "Exécuter le push automatiquement si les tests passent",
                "Bloquer l'opération et exiger la signature souveraine du Project Manager humain",
                "Demander l'avis du Frontend",
                "Supprimer la branche distante"
              ],
              correctIndex: 1,
              explanation: "Toute écriture sur le dépôt distant est formellement verrouillée sous le monopole souverain du Project Manager humain."
            },
            {
              id: 4,
              question: "Quelle est la différence fondamentale entre une mission déclarée 'terminée' et une mission 'validée' ?",
              options: [
                "Aucune, les deux termes sont rigoureusement identiques",
                "'Terminée' est une annonce de l'agent ; 'validée' est le résultat d'un contrôle de recette formel",
                "'Validée' signifie que le code a été supprimé",
                "'Terminée' concerne uniquement le chef de projet"
              ],
              correctIndex: 1,
              explanation: "L'achèvement est une déclaration de fin d'activité ; la validation est l'acceptation formelle après démonstration des preuves."
            },
            {
              id: 5,
              question: "Lorsqu'un désaccord survient entre Backend et Frontend sur le format de réponse JSON, que fait le Team Leader ?",
              options: [
                "Il laisse chaque agent coder son format",
                "Il consulte l'Architecte, rappelle la référence api-contracts.md et aligne les deux équipes",
                "Il supprime la route API",
                "Il confie le projet à un seul agent"
              ],
              correctIndex: 1,
              explanation: "Le Team Leader tranche en s'appuyant sur l'Architecte et la source unique de vérité documentaire."
            },
            {
              id: 6,
              question: "Quelle commande Antigravity CLI permet de surveiller l'état technique (running, done, error, killed) des sous-agents ?",
              options: [
                "/agents",
                "/tasks",
                "/context",
                "/exit"
              ],
              correctIndex: 0,
              explanation: "Le panneau /agents affiche la console des sous-agents d'arrière-plan."
            },
            {
              id: 7,
              question: "Pourquoi l'Agent QA ne doit-il pas corriger lui-même le code lorsqu'il détecte un bug serveur ?",
              options: [
                "Parce qu'il ne connaît pas le langage TypeScript",
                "Pour préserver l'étanchéité des responsabilités : l'anomalie doit être consignée et résolue par le Backend",
                "Parce que les tests ne sont jamais exécutés",
                "Pour accélérer le projet"
              ],
              correctIndex: 1,
              explanation: "L'assurance qualité constate et documente objectivement les anomalies ; la correction relève du périmètre du développeur responsable."
            },
            {
              id: 8,
              question: "Dans le cycle de calcul des compteurs de TaskFlow, que provoque le passage d'une tâche de 'todo' à 'done' ?",
              options: [
                "La création d'une nouvelle tâche dupliquée",
                "La décrémentation de todo (-1), l'incrémentation de done (+1), le total restant inchangé",
                "La remise à zéro de tous les compteurs",
                "Une erreur de serveur 500"
              ],
              correctIndex: 1,
              explanation: "Il s'agit d'un déplacement unitaire d'état : les compteurs reflètent la redistribution sans altérer le nombre total de tâches."
            },
            {
              id: 9,
              question: "Que doit comporter un compte rendu d'agent recevable par le Team Leader ?",
              options: [
                "Une simple phrase disant que tout marche",
                "La liste des fichiers modifiés, les commandes exactes exécutées et les sorties de tests réelles",
                "Le code source complet recopié dans le chat",
                "Le mot de passe de l'utilisateur"
              ],
              correctIndex: 1,
              explanation: "La recevabilité d'un rapport repose sur l'auditabilité : fichiers touchés, commandes jouées et statuts factuels."
            },
            {
              id: 10,
              question: "Quelle est la priorité absolue des règles de décision dans le moteur unifié de permissions d'Antigravity ?",
              options: [
                "Allow > Ask > Deny",
                "Ask > Allow > Deny",
                "Deny > Ask > Allow",
                "Toutes les permissions ont le même niveau"
              ],
              correctIndex: 2,
              explanation: "Deny l'emporte toujours sur Ask, qui l'emporte toujours sur Allow. Une interdiction reste souveraine."
            }
          ]}
        />
      </div>
    </div>
  );
};
