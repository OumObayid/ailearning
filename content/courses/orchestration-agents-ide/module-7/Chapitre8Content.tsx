'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  // Simulateur interactif : Audit de Preuves Factuelles
  const [selectedReportType, setSelectedReportType] = useState<'vague_claim' | 'fact_based'>('fact_based');

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 7 &bull; Chapitre 8
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Auditabilité, Artifacts & Recette
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          7.8 — Organiser les rapports et les livrables des agents
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          À la fin d'une mission, un agent ne doit pas se contenter d'affirmer « Tout fonctionne ». Le Team Leader exige des livrables concrets (fichiers de code, tests, documentation d'API) et des comptes rendus factuels accompagnés de preuves observables. Découvrez comment structurer ces artefacts et exploiter les Artifacts et Walkthroughs d'Antigravity.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle d'exigence des preuves :</p>
        <p>
          Un rapport affirmant que « tous les tests sont passés » sans fournir la commande exécutée et la sortie exacte doit être rejeté à l'état <strong>À vérifier</strong>. De plus, <strong>l'approbation technique des tests ne constitue jamais une autorisation de merge : seul le Project Manager humain autorise un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code></strong>.
        </p>
      </Callout>

      {/* Section 8.1 : Rapport vs Livrable */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="document-text" className="w-5 h-5 text-primary-600 shrink-0" />
          8.1 — Distinguer le Rapport du Livrable Concret
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">Le Rapport : L'explication et la traçabilité</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Documente les démarches entreprises, les décisions prises, les difficultés surmontées et les commandes exécutées. C'est le journal de bord de la mission.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">Le Livrable : L'artefact logiciel produit</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Le code source (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">taskRoutes.ts</code>), les tests (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">taskStatus.test.ts</code>) ou le contrat (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">api-contracts.md</code>). C'est l'objet physique auditable.
            </p>
          </div>
        </div>
      </div>

      {/* Section 8.4 : Les Artifacts d'Antigravity */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="cube" className="w-5 h-5 text-indigo-600 shrink-0" />
          8.4 — Les 4 Types d'Artifacts Structurés dans Google Antigravity
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">1. Implementation Plan</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Plan d'action détaillant les fichiers impactés et la démarche d'implémentation avant de modifier le code.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">2. Diff de Code</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Vue comparative des lignes ajoutées/supprimées permettant une relecture visuelle instantanée des altérations.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">3. Task List</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Checklist interactive des étapes prévues permettant de suivre l'avancement jalon par jalon.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">4. Walkthrough de Synthèse</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Document de démonstration guidée résumant l'usage de la nouvelle fonctionnalité et les preuves associées.</p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire de Recette &bull; Audit de Compte Rendu
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur d'Audit : Affirmation Vague vs Rapport Factuel
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Comparez un rapport irrecevable et un rapport rigoureux d'Agent Backend lors de la clôture de la mission.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => setSelectedReportType('fact_based')}
            className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
              selectedReportType === 'fact_based'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            ✅ Rapport Factuel avec Preuves d'Exécution (Recevable)
          </button>
          <button
            onClick={() => setSelectedReportType('vague_claim')}
            className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
              selectedReportType === 'vague_claim'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            ❌ Déclaration Informelle sans Preuve (Rejetée pour audit)
          </button>
        </div>

        {/* Diagnostic du rapport */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          {selectedReportType === 'fact_based' ? (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                Exemple de compte rendu factuel certifié :
              </span>
              <div className="overflow-x-auto font-mono text-xs text-slate-100 bg-slate-900 p-3 rounded-lg">
                <pre>{`MISSION : M2 - Changement de statut Backend
LIVRABLES :
- backend/src/routes/taskRoutes.ts (ligne 45: router.patch('/:id/status'))
- backend/tests/status.test.ts
COMMANDES EXÉCUTÉES & PREUVES :
$ npm test backend/tests/status.test.ts
✓ should update status to in_progress (12ms)
✓ should return 400 for invalid status (8ms)
✓ should return 404 for unknown task (6ms)
Tests: 3 passed, 3 total | Exit code: 0
POINTS RESTANTS : Attente de recette intégration par le QA.`}</pre>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ce rapport mentionne les fichiers exacts, la commande exécutée et la sortie standard. Il permet un contrôle immédiat.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">
                Exemple de compte rendu irrecevable :
              </span>
              <div className="overflow-x-auto font-mono text-xs text-slate-800 dark:text-slate-200 bg-rose-50 dark:bg-rose-950/30 p-3 rounded-lg border border-rose-200 dark:border-rose-800/40">
                <pre>{`« C'est bon, j'ai tout terminé ! La route est prête et tous les tests passent sans problème. Tu peux merger sur main ! »`}</pre>
              </div>
              <p className="text-xs text-rose-700 dark:text-rose-300">
                Aucun fichier cité, aucune preuve de test, invitation au merge non autorisée : rejet immédiat à l'état « À vérifier ».
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quiz officiel */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Évaluation des connaissances
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de validation du Chapitre 7.8
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Testez vos connaissances sur la standardisation des livrables, l'usage des Artifacts et le contrôle d'audit.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la principale différence entre un rapport et un livrable ?",
              options: [
                "Le rapport contient uniquement du code, tandis que le livrable contient uniquement du texte.",
                "Le rapport explique le travail réalisé, tandis que le livrable fournit un résultat concret de la mission.",
                "Le rapport est toujours validé, tandis que le livrable ne peut jamais l'être.",
                "Les deux termes désignent exactement la même chose."
              ],
              correctIndex: 1,
              explanation: "Le rapport relate la démarche, les choix et les résultats. Le livrable est l'artefact concret (fichier, test, schéma)."
            },
            {
              id: 2,
              question: "Pourquoi faut-il définir les livrables attendus avant le lancement d'une mission ?",
              options: [
                "Pour éviter que l'agent ait à communiquer avec le Team Leader.",
                "Pour obliger tous les agents à produire les mêmes fichiers.",
                "Pour supprimer les vérifications après la mission.",
                "Pour préciser les résultats attendus et les conditions de livraison."
              ],
              correctIndex: 3,
              explanation: "Définir les livrables en amont permet à l'agent de savoir exactement ce qui est attendu pour clore sa mission."
            },
            {
              id: 3,
              question: "Quel est le rôle principal d'un Implementation Plan dans Antigravity ?",
              options: [
                "Présenter les modifications techniques envisagées pour réaliser une mission.",
                "Prouver que tous les tests ont été exécutés avec succès.",
                "Remplacer les fichiers de code du projet.",
                "Valider automatiquement le travail de l'agent."
              ],
              correctIndex: 0,
              explanation: "L'Implementation Plan détaille la démarche et les fichiers impactés avant l'écriture effective du code."
            },
            {
              id: 4,
              question: "Que permet principalement un diff ?",
              options: [
                "D'afficher uniquement le rapport final de l'agent.",
                "De présenter la liste des conversations ouvertes.",
                "De visualiser les différences entre deux versions d'un fichier.",
                "De confirmer automatiquement la conformité du code."
              ],
              correctIndex: 2,
              explanation: "Un diff affiche les lignes modifiées, ajoutées ou retirées pour contrôler précisément les impacts de l'agent."
            },
            {
              id: 5,
              question: "Dans Teamwork, quel document permet de suivre les jalons et l'avancement du projet ?",
              options: [
                "Le Request Artifact.",
                "Le Progress Artifact.",
                "Le fichier AGENTS.md.",
                "Le prompt ponctuel du Backend."
              ],
              correctIndex: 1,
              explanation: "Le Progress Artifact centralise les jalons achevés, en cours et restant à planifier dans Teamwork."
            },
            {
              id: 6,
              question: "Quelle information doit apparaître dans un compte rendu technique fiable ?",
              options: [
                "Uniquement l'affirmation que le travail est terminé.",
                "Le nombre de messages échangés avec l'agent.",
                "Une déclaration générale indiquant que tout fonctionne.",
                "Les commandes exécutées, les résultats obtenus et les vérifications qui restent à effectuer."
              ],
              correctIndex: 3,
              explanation: "Un compte rendu exploitable apporte des preuves tangibles : commandes jouées, résultats obtenus et limites."
            },
            {
              id: 7,
              question: "Vrai ou faux : un Walkthrough généré par Antigravity suffit à prouver que tous les critères d'acceptation sont satisfaits.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Le Walkthrough illustre la fonctionnalité, mais ne remplace pas l'audit des tests automatisés et des critères d'acceptation."
            },
            {
              id: 8,
              question: "Un agent transmet tous les fichiers attendus, mais les tests n'ont pas été exécutés. Quel est l'état le plus approprié ?",
              options: [
                "Validé.",
                "Refusé définitivement.",
                "À vérifier.",
                "Terminé et accepté sans contrôle."
              ],
              correctIndex: 2,
              explanation: "Les fichiers sont livrés, mais la preuve du bon fonctionnement reste à apporter : l'état 'À vérifier' est requis."
            },
            {
              id: 9,
              question: "Quel est le rôle du Team Leader lorsqu'il reçoit les rapports de plusieurs agents ?",
              options: [
                "Les consolider, identifier les incohérences et préparer une synthèse générale.",
                "Les conserver séparément sans les examiner.",
                "Les remplacer par un unique message de l'agent Backend.",
                "Considérer automatiquement toutes les missions comme validées."
              ],
              correctIndex: 0,
              explanation: "Le Team Leader rassemble les contributions, croise leur cohérence et produit une synthèse pour le PM humain."
            },
            {
              id: 10,
              question: "Vrai ou faux : un rapport qui indique que les tests ont réussi constitue à lui seul une preuve suffisante de la qualité et de la conformité de l'ensemble du projet.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Un rapport de tests unitaires locaux n'atteste pas de l'intégration globale, des performances ni de l'absence de régression."
            }
          ]}
        />
      </div>
    </div>
  );
};
