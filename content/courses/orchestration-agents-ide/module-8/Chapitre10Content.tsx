'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  // Simulateur interactif : Banc d'Atelier de Recette & Coordination du TP
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [anomaliesState, setAnomaliesState] = useState<Record<string, 'open' | 'fixing' | 'resolved'>>({
    'AN-01': 'resolved',
    'AN-02': 'resolved',
    'AN-03': 'open'
  });

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du TP */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400 shrink-0">
            Module 8 • TP Final Pratique
          </span>
          <span className="text-xs text-muted-foreground">1 h 30 d'atelier pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          TP — Contrôler les livrables d'une équipe d'agents et organiser leur vérification et leur correction
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Mettez-vous dans le rôle du <strong>Team Leader IA</strong> d'un projet réel (TaskFlow). Coordonnez les agents Backend, Frontend, QA et Reviewer pour auditer une fonctionnalité critique (mise à jour du statut des tâches), identifier les régressions, piloter la boucle de correction et préparer le dossier de validation souveraine pour le Project Manager humain.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance absolue pour le TP</p>
        <p className="text-sm leading-relaxed">
          Dans le cadre de ce TP, <strong>aucun agent ni Team Leader n'est autorisé à exécuter git merge, git rebase ou git push</strong> sans l'accord écrit explicite du Project Manager humain. La validation technique d'un livrable ne dispense jamais de cette règle fondamentale.
        </p>
      </Callout>

      {/* Présentation du contexte de la mission */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="briefcase" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Mise en situation : La fonctionnalité « Task Status Update »</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            L'équipe TaskFlow a été chargée d'implémenter le changement dynamique d'état d'une tâche. Deux agents ont travaillé sur des branches distinctes :
          </p>
          <div className="grid grid-cols-1 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
              <span className="font-bold text-blue-400 font-mono">Agent Backend (branche: feature/task-status-backend)</span>
              <p className="text-muted-foreground">Devait implémenter la route <code>PATCH /api/tasks/:id</code>, accepter les statuts <code>todo</code>, <code>in_progress</code>, <code>done</code>, renvoyer HTTP 200, ou refuser avec HTTP 400 (statut invalide) et 404 (ID inconnu).</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex flex-col gap-1">
              <span className="font-bold text-purple-400 font-mono">Agent Frontend (branche: feature/task-status-frontend)</span>
              <p className="text-muted-foreground">Devait intégrer le menu déroulant de statut dans chaque carte de tâche, appeler l'API lors du clic et mettre à jour le compteur dynamique du tableau de bord sans recharger la page.</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Les deux agents ont annoncé leur tâche « terminée ». En tant que Team Leader, vous devez orchestrer la vérification complète avant toute intégration.
          </p>
        </div>
      </div>

      {/* Déroulé guidé en 9 étapes */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="list" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>1. Atelier Interactif — Les 9 Étapes du Contrôle Qualité</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          {/* Navigation entre les 9 étapes */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-xs font-semibold text-muted-foreground">Sélectionnez une étape de l'atelier :</span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`py-2 px-3 text-center rounded font-semibold text-xs transition-all ${
                    activeStep === step
                      ? 'bg-emerald-500 text-white shadow'
                      : 'bg-muted/40 text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Étape {step}
                </button>
              ))}
            </div>
          </div>

          {/* Contenu de l'étape active */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs leading-relaxed">
            {activeStep === 1 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Étape 1 — Analyser les exigences et préparer les critères d'acceptation</span>
                <p className="text-muted-foreground">
                  Avant tout contrôle, vous listez les 5 critères d'acceptation stricts extraits des spécifications :
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                  <li><strong>CRIT-01 :</strong> Route PATCH acceptant les statuts 'todo', 'in_progress', 'done' avec retour HTTP 200 et objet mis à jour.</li>
                  <li><strong>CRIT-02 :</strong> Tout statut inconnu ou interdit doit être rejeté avec HTTP 400 Bad Request.</li>
                  <li><strong>CRIT-03 :</strong> Un identifiant inexistant doit retourner HTTP 404 Not Found sans lever d'exception.</li>
                  <li><strong>CRIT-04 :</strong> L'interface utilisateur reflète le nouveau statut immédiatement et met à jour le compteur global.</li>
                  <li><strong>CRIT-05 :</strong> Aucune régression TypeScript (zéro 'any', zéro warning de build).</li>
                </ul>
              </div>
            )}

            {activeStep === 2 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Étape 2 — Examiner les livrables des agents avec Git</span>
                <p className="text-muted-foreground">
                  Vous auditez les modifications des deux branches avec <code>git status</code> et <code>git diff</code> :
                </p>
                <div className="p-3 rounded bg-black/60 font-mono text-[11px] text-sky-300">
                  $ git status<br />
                  # Backend : 2 fichiers modifiés (taskController.ts, taskStore.ts) + 1 fichier de test.<br />
                  # Frontend : 3 composants modifiés (TaskCard.tsx, TaskList.tsx, DashboardCounters.tsx).<br />
                  # ⚠️ Détection d'un fichier parasite non suivi : backend/src/temp-scratch.js (à supprimer).
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Étape 3 — Organiser les vérifications fonctionnelles avec l'agent QA</span>
                <p className="text-muted-foreground">
                  Vous mandatez l'agent QA pour concevoir et lancer les tests Vitest + Supertest :
                </p>
                <div className="p-3 rounded bg-black/60 font-mono text-[11px] text-emerald-400">
                  [QA EXECUTION REPORT]<br />
                  ✓ QA-01 : PATCH statut nominal &rarr; 200 OK (SUCCÈS)<br />
                  ✖ QA-02 : PATCH statut invalide &rarr; 200 OK au lieu de 400 ! (ÉCHEC &rarr; AN-01)<br />
                  ✓ QA-03 : PATCH ID inexistant &rarr; 404 Not Found (SUCCÈS)<br />
                  ✓ QA-04 : Intégrité des autres champs &rarr; Préservés (SUCCÈS)<br />
                  ✖ QA-05 : Actualisation dynamique du compteur &rarr; Non réactif (ÉCHEC &rarr; AN-02)
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Étape 4 — Organiser la revue technique avec l'agent Reviewer</span>
                <p className="text-muted-foreground">
                  L'agent Reviewer audite le code source et relève une observation technique :
                </p>
                <div className="p-3 rounded bg-black/60 font-mono text-[11px] text-amber-300">
                  [REVIEW REPORT]<br />
                  - backend/src/controllers/taskController.ts : Typage strict respecté.<br />
                  - backend/src/controllers/taskController.ts : Observation (Faible) &rarr; Le message d'erreur HTTP 400 est générique 'Bad Request' sans spécifier les valeurs attendues (AN-03).<br />
                  - frontend/src/components/TaskCard.tsx : Composant bien découpé, hooks propres.<br />
                  Verdict Reviewer : Corrections demandées (sur AN-01) et amélioration recommandée (sur AN-03).
                </div>
              </div>
            )}

            {activeStep === 5 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Étape 5 — Identifier et classer les anomalies</span>
                <p className="text-muted-foreground">
                  Vous consolidez les 3 fiches d'anomalies officielles du projet :
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
                    <div>
                      <strong className="text-rose-400">AN-01 : Statut invalide accepté</strong>
                      <p className="text-[11px] text-muted-foreground">Backend accepte n'importe quelle chaîne au lieu de renvoyer 400.</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">Majeure / P1</span>
                  </div>

                  <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <strong className="text-amber-400">AN-02 : Compteur UI non réactif</strong>
                      <p className="text-[11px] text-muted-foreground">Le compteur de tâches faites ne s'actualise pas sans refresh global.</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">Moyenne / P2</span>
                  </div>

                  <div className="p-2.5 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
                    <div>
                      <strong className="text-blue-400">AN-03 : Message d'erreur 400 peu explicite</strong>
                      <p className="text-[11px] text-muted-foreground">L'erreur ne mentionne pas la liste des statuts autorisés.</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">Mineure / P3</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 6 && (
              <div className="flex flex-col gap-2 min-w-0 max-w-full">
                <span className="font-bold text-foreground text-sm">Étape 6 — Organiser les demandes de correction ciblées</span>
                <p className="text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere]">
                  Vous rédigez les prompts de correction assignés respectivement au Backend et au Frontend avec périmètre confiné :
                </p>
                <div className="p-3 rounded bg-black font-mono text-[11px] text-white leading-relaxed border border-slate-800 min-w-0 max-w-full">
                  <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
{`// Demande adressée à l'Agent Backend pour AN-01 :
Contexte : Validation des statuts autorisés sur PATCH /api/tasks/:id
Anomalie : Statuts invalides acceptés avec HTTP 200.
Consigne : Ajouter une liste blanche stricte ['todo', 'in_progress', 'done'].
Si invalide, renvoyer HTTP 400 avec {"error": "Invalid status"}.
Fichier autorisé : backend/src/controllers/taskController.ts uniquement.
Validation : Le test QA-02 doit passer à 100%.`}
                  </div>
                </div>
              </div>
            )}

            {activeStep === 7 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Étape 7 — Vérifier les corrections (Re-test & Non-régression)</span>
                <p className="text-muted-foreground">
                  L'agent QA relance l'ensemble de la suite automatisée :
                </p>
                <div className="p-3 rounded bg-black/60 font-mono text-[11px] text-emerald-400">
                  $ npx vitest run<br />
                  ✓ tests/taskStatus.test.ts (5 tests passés, 0 échec)<br />
                  ✓ tests/dashboardCounters.test.ts (2 tests passés, 0 échec)<br />
                  Résultat : AN-01 et AN-02 sont résolues et vérifiées. AN-03 reste ouverte en amélioration.
                </div>
              </div>
            )}

            {activeStep === 8 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Étape 8 — Préparer le rapport global de contrôle qualité</span>
                <p className="text-muted-foreground">
                  Vous rédigez la synthèse factuelle reprenant les résultats des tests, l'analyse Git, les corrections vérifiées et l'état des critères d'acceptation.
                </p>
              </div>
            )}

            {activeStep === 9 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Étape 9 — Préparer la proposition de validation pour le Project Manager</span>
                <p className="text-muted-foreground">
                  Vous formulez la recommandation finale soumise à l'arbitrage du responsable humain :
                </p>
                <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <strong>Proposition du Team Leader :</strong> Avis Favorable pour la validation du livrable.<br />
                  Les critères critiques et majeurs sont tous satisfaits avec preuves au vert. L'anomalie mineure AN-03 est reportée dans le backlog de polish.<br />
                  <em>Rappel impératif : La décision de merge sur origin/main est soumise à la décision souveraine du PM humain.</em>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grille d'évaluation officielle sur 100 points */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="award" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Barème & Grille d'évaluation officielle (100 Points)</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">1. Analyse des exigences</strong>
                <p className="text-muted-foreground">Compréhension du périmètre et pertinence des critères d'acceptation</p>
              </div>
              <span className="font-bold text-emerald-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">2. Examen des livrables</strong>
                <p className="text-muted-foreground">Analyse des contributions et inspection rigoureuse des modifications Git</p>
              </div>
              <span className="font-bold text-emerald-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">3. Organisation QA</strong>
                <p className="text-muted-foreground">Qualité des scénarios, exécution réelle et pertinence des assertions</p>
              </div>
              <span className="font-bold text-emerald-400 shrink-0">15 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">4. Revue technique</strong>
                <p className="text-muted-foreground">Pertinence des contrôles statiques et observations du Reviewer</p>
              </div>
              <span className="font-bold text-emerald-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">5. Gestion des anomalies</strong>
                <p className="text-muted-foreground">Identification, classification (gravité vs priorité) et traçabilité</p>
              </div>
              <span className="font-bold text-emerald-400 shrink-0">15 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">6. Organisation des corrections</strong>
                <p className="text-muted-foreground">Qualité des demandes structurées, confinement et attribution ciblée</p>
              </div>
              <span className="font-bold text-emerald-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">7. Vérification des corrections</strong>
                <p className="text-muted-foreground">Re-test effectif et contrôle approfondi des régressions</p>
              </div>
              <span className="font-bold text-emerald-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">8. Rapport global</strong>
                <p className="text-muted-foreground">Clarté, exhaustivité et exploitation factuelle des preuves d'exécution</p>
              </div>
              <span className="font-bold text-emerald-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">9. Décision de validation</strong>
                <p className="text-muted-foreground">Cohérence de la recommandation et respect souverain du PM</p>
              </div>
              <span className="font-bold text-emerald-400 shrink-0">10 pts</span>
            </div>
          </div>

          <div className="mt-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex flex-col gap-1 text-xs">
            <span className="font-bold text-rose-400">⚠️ Fautes éliminatoires (justifiant une révision indépendamment du score) :</span>
            <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
              <li>Déclarer un test réussi sans preuve d'exécution réelle</li>
              <li>Ignorer une anomalie bloquante confirmée</li>
              <li>Présenter une recommandation de Team Leader comme une décision finale sans accord du PM</li>
              <li>Effectuer ou ordonner une opération Git sensible (merge, rebase, push) non autorisée</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Corrigé type complet dépliable */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all text-left"
        >
          <span className="font-bold text-foreground text-sm flex items-center gap-2">
            <Icon name="file-text" className="w-5 h-5 text-emerald-500 shrink-0" />
            Consulter le Corrigé Détaillé de Référence du TP
          </span>
          <span className="text-xs text-emerald-500 font-semibold">{showSolution ? 'Masquer le corrigé' : 'Afficher le corrigé'}</span>
        </button>

        {showSolution && (
          <div className="p-5 rounded-xl border border-emerald-500/30 bg-card flex flex-col gap-4 text-xs leading-relaxed">
            <h3 className="font-bold text-base text-foreground">Dossier de Recette Final — Recommandation du Team Leader</h3>

            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">1. Bilan d'exécution des tests</span>
                <p className="text-muted-foreground">
                  Suite Vitest exécutée : 7 scénarios exécutés, 7 passés avec succès.<br />
                  Le scénario critique QA-02 (rejet des statuts invalides) a été re-testé après correction : le code HTTP 400 Bad Request est bien renvoyé. Le scénario QA-05 (réactivité du compteur UI) est validé sur le composant React.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">2. État du suivi des anomalies</span>
                <p className="text-muted-foreground">
                  - <strong>AN-01 (Majeure) :</strong> Résolue et vérifiée côté Backend.<br />
                  - <strong>AN-02 (Moyenne) :</strong> Résolue et vérifiée côté Frontend.<br />
                  - <strong>AN-03 (Mineure) :</strong> Reportée en amélioration (message 400 plus détaillé). Ne bloque pas la livraison.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">3. Recommandation formelle</span>
                <p className="text-muted-foreground">
                  Avis Favorable sous réserve de clôture du ticket AN-03 dans le sprint suivant. Le livrable est qualifié de <em>Conforme</em> et prêt pour arbitrage de validation finale par le <strong>Project Manager humain</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz de synthèse du TP */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Évaluation de synthèse du TP</span>
        </h2>
        <QuickQuiz
          title="Évaluation des compétences — TP Module 8 : Contrôle qualité et validation"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif premier d'un plan de recette exécuté par le Team Leader ?",
              options: [
                "Pousser le code en production le plus vite possible.",
                "Rassembler des preuves objectives de conformité par rapport aux critères d'acceptation.",
                "Remplacer les tests automatisés par une inspection rapide du README.",
                "Démontrer que tous les agents ont écrit le même nombre de lignes de code."
              ],
              correctIndex: 1,
              explanation: "Le Team Leader doit collecter des preuves factuelles (tests, diff, logs) pour mesurer l'adéquation exacte aux critères d'acceptation."
            },
            {
              id: 2,
              question: "Lors de l'étape 2, un fichier temporaire 'scratch.js' non suivi est détecté par git status. Que devez-vous faire ?",
              options: [
                "L'ignorer et faire le commit immédiatement.",
                "Le commiter dans le dépôt principal pour garder une trace.",
                "Le supprimer ou l'ajouter au .gitignore avant tout commit.",
                "Renommer le fichier en .env."
              ],
              correctIndex: 2,
              explanation: "Les fichiers temporaires d'expérimentation des agents doivent être impérativement nettoyés avant de valider le lot."
            },
            {
              id: 3,
              question: "L'anomalie AN-01 concerne l'acceptation d'un statut non autorisé avec un code 200. Quelle est sa gravité ?",
              options: [
                "Faible / Mineure",
                "Majeure (Violation de contrat et risque d'incohérence de données)",
                "Cosmétique",
                "Nulle car le client ne se trompera jamais"
              ],
              correctIndex: 1,
              explanation: "Une absence de validation sur une mutation d'état corrompt les données en base et constitue une anomalie majeure."
            },
            {
              id: 4,
              question: "Quel rôle joue l'agent Reviewer dans ce TP ?",
              options: [
                "Il relit statiquement le code pour s'assurer du respect des conventions, de la sécurité et du typage strict.",
                "Il fusionne les branches sur main.",
                "Il développe l'API Backend à la place du développeur.",
                "Il pilote le déploiement sur le serveur cloud."
              ],
              correctIndex: 0,
              explanation: "Le Reviewer examine la structure statique, la typographie TypeScript et la conformité architecturale."
            },
            {
              id: 5,
              question: "Pourquoi le prompt de correction adressé au Backend pour AN-01 doit-il borner les fichiers modifiables ?",
              options: [
                "Pour empêcher l'agent d'introduire des régressions sur d'autres modules hors de son périmètre.",
                "Pour ralentir le temps de réponse de l'agent.",
                "Parce que Git l'interdit techniquement.",
                "Pour forcer l'agent à réécrire la base de données."
              ],
              correctIndex: 0,
              explanation: "Le confinement strict évite la dérive de périmètre (scope creep) et protège les fichiers non concernés par le bug."
            },
            {
              id: 6,
              question: "Après qu'un agent a annoncé avoir corrigé un bug, que doit obligatoirement faire l'agent QA ?",
              options: [
                "Le croire sur parole et valider le ticket.",
                "Rejouer le test ciblé ET l'ensemble de la suite de non-régression.",
                "Supprimer le test pour éviter qu'il n'échoue à nouveau.",
                "Faire un git push direct."
              ],
              correctIndex: 1,
              explanation: "Un re-test vérifie la résolution effective et la suite complète s'assure qu'aucun effet de bord n'a été introduit."
            },
            {
              id: 7,
              question: "L'anomalie mineure AN-03 (message d'erreur peu explicite) reste ouverte en fin de TP. Quelle décision de validation est appropriée ?",
              options: [
                "Bloquer le projet pour six mois.",
                "Avis favorable sous réserve : les critères critiques sont satisfaits et l'anomalie mineure est inscrite au backlog.",
                "Déclarer que l'anomalie n'existe pas.",
                "Supprimer le composant entier."
              ],
              correctIndex: 1,
              explanation: "Une anomalie mineure n'empêche pas l'acceptation opérationnelle si elle est tracée et que les critères critiques sont validés."
            },
            {
              id: 8,
              question: "Quelle est la responsabilité du Team Leader lors de la phase finale de validation ?",
              options: [
                "Décider souverainement du merge sans consulter personne.",
                "Rédiger le rapport consolidé de contrôle et soumettre une recommandation motivée au PM humain.",
                "Supprimer la branche de travail.",
                "Remplacer le Project Manager humain."
              ],
              correctIndex: 1,
              explanation: "Le Team Leader prépare le dossier de preuves et soumet une proposition ; seul le PM humain prend la décision souveraine."
            },
            {
              id: 9,
              question: "Un apprenant décide de fusionner la branche de fonctionnalité sur main de son propre chef. Quel est le verdict pédagogique ?",
              options: [
                "Excellente initiative autonome.",
                "Faute éliminatoire de gouvernance : violation de la souveraineté du Project Manager.",
                "Toléré si les tests unitaires passent.",
                "Recommandé en méthodologie agile."
              ],
              correctIndex: 1,
              explanation: "L'interdiction de merge sauvage sans accord explicite du PM est une règle fondamentale et éliminatoire."
            },
            {
              id: 10,
              question: "Que garantit un dossier de recette complet et approuvé ?",
              options: [
                "Que le livrable a été vérifié sur des preuves réelles et satisfait les critères d'acceptation convenus.",
                "Que le code ne comportera plus jamais de bug pendant 10 ans.",
                "Que les agents n'auront plus besoin d'être managés.",
                "Que l'on peut supprimer tous les tests automatisés."
              ],
              correctIndex: 0,
              explanation: "Un dossier de recette certifie la conformité objective du livrable par rapport aux exigences du cahier des charges."
            }
          ]}
        />
      </div>
    </div>
  );
};
