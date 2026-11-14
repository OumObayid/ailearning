'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // Simulateur interactif : Séquentiel vs Parallèle & Worktrees
  const [executionMode, setExecutionMode] = useState<'sequential' | 'parallel'>('parallel');

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 6 &bull; Chapitre 5
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Parallélisme & Git Worktrees
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          6.5 — Déterminer les tâches réalisables en parallèle
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Dans une équipe de plusieurs agents IA, le parallélisme est le principal levier d'accélération du développement. Dès lors que le contrat d'interface est figé, l'Agent Backend, l'Agent Frontend et l'Agent QA peuvent travailler simultanément sans se bloquer. Découvrez comment organiser ces chantiers parallèles, prévenir les conflits de code et exploiter les Git Worktrees.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle de synchronisation et fin de parallélisme :</p>
        <p>
          Faire travailler des agents en parallèle sur des branches distinctes ne signifie pas qu'ils peuvent intégrer leur travail de façon autonome. <strong>Aucun agent ne doit réaliser de <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans autorisation expresse et écrite du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 5.1 & 5.2 : Séquentiel vs Parallèle */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="bolt" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Comparer l'Approche Séquentielle et l'Approche Parallèle</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Un projet logiciel équilibré alterne intelligemment phases séquentielles de cadrage et phases d'exécution parallèle :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. Le Travail Séquentiel (Successif)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-mono shrink-0">Ordre strict</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Chaque tâche attend l'achèvement de la précédente. Indispensable pour la phase de cadrage : Définir le modèle de données &rarr; Établir le contrat d'API &rarr; Validation PM. La coordination est simple, mais la durée totale est l'addition arithmétique de toutes les durées.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Le Travail Parallèle (Simultané)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-mono shrink-0">Simultanéité</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Plusieurs agents avancent en même temps sur des périmètres étanches dès que le contrat d'API est figé : Backend (routes Express), Frontend (composants React) et QA (scénarios de tests). Réduit fortement le délai global de livraison.
            </p>
          </div>
        </div>
      </div>

      {/* Section 5.4 & 5.6 : Contrats Partagés et Git Worktrees */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="cube-transparent" className="w-5 h-5 text-indigo-600 shrink-0" /> 2. Le Contrat d'Interface et l'Isolation par Git Worktrees</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour que le parallélisme fonctionne sans cacophonie, deux piliers techniques sont indispensables :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Le Contrat d'Interface (API Contract) : Le Référentiel Commun</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Défini par l'Architect dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">docs/architecture/api-contracts.md</code>. Il verrouille les formats des requêtes, les énumérations (ex: <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">"in_progress"</code> et non <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">"processing"</code>) et les codes d'erreur HTTP. C'est lui qui décorrèle le Backend du Frontend.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Git Worktrees : L'Isolation Physique des Répertoires</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Permet à chaque agent de disposer de son propre sous-dossier de travail lié au même dépôt Git :
              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">worktrees/backend-api/</code> sur branche <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">feat/backend</code>, et <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">worktrees/frontend-ui/</code> sur branche <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">feat/frontend</code>. Évite les verrous d'écriture et les écrasements de fichiers.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire de Chronométrage &bull; Ordonnancement TaskFlow
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur d'Exécution : Séquentiel vs Parallèle Multi-Agents
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Comparez le temps de cycle et l'organisation du sprint TaskFlow pour développer la fonctionnalité de changement de statut.
          </p>
        </div>

        {/* Boutons de sélection du mode */}
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => setExecutionMode('parallel')}
            className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
              executionMode === 'parallel'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            ⚡ Mode Parallèle (Recommandé avec Contrat API) : ~35 minutes
          </button>
          <button
            onClick={() => setExecutionMode('sequential')}
            className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
              executionMode === 'sequential'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            ⏳ Mode Séquentiel Strict : ~85 minutes
          </button>
        </div>

        {/* Diagnostic du mode */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          {executionMode === 'parallel' ? (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                Déroulement Parallèle Optimisé :
              </span>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5">
                <li><strong>Phase 1 (10 min) :</strong> L'Architect définit le contrat API dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">api-contracts.md</code>.</li>
                <li><strong>Phase 2 Parallèle (15 min) :</strong>
                  <div className="pl-4 border-l-2 border-emerald-500 my-1 space-y-0.5">
                    <p>&bull; Backend implémente <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">PATCH /api/tasks/:id/status</code> (Worktree 1)</p>
                    <p>&bull; Frontend code le sélecteur de statut dans TaskItem (Worktree 2)</p>
                    <p>&bull; QA rédige les scénarios de test d'intégration Vitest (Worktree 3)</p>
                  </div>
                </li>
                <li><strong>Phase 3 (10 min) :</strong> Revue par le Reviewer & tests d'intégration par le QA.</li>
              </ul>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Gain net : +59% de rapidité tout en éliminant les risques de collisions de branches.
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                Déroulement Séquentiel Linéaire :
              </span>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5">
                <li>Architect définit le contrat (10 min).</li>
                <li>Puis Backend attend, commence et livre sa route (25 min).</li>
                <li>Puis Frontend attend le Backend, teste en direct et livre l'UI (25 min).</li>
                <li>Puis QA attend le Frontend et écrit les tests (15 min).</li>
                <li>Puis Reviewer examine l'ensemble (10 min).</li>
              </ul>
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-xs font-semibold text-blue-800 dark:text-blue-300">
                Temps total : 85 min. Les agents passent plus de la moitié de leur temps en attente passive.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 5.8 : Quand NE PAS travailler en parallèle */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="exclamation-triangle" className="w-5 h-5 text-amber-600 shrink-0" /> 3. Quand Faut-il Proscrire le Parallélisme ?</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Le travail en parallèle n'est pas une fin en soi. Il devient contre-productif dans 4 situations critiques :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. Décision d'architecture non validée</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Si le modèle de données ou le contrat REST est encore en discussion, lancer le Frontend et le Backend amènera les deux agents à faire des suppositions divergentes.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Dépendance physique stricte</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Le test d'intégration de bout en bout ne peut pas être parallélisé avant que le Backend et le Frontend ne soient livrés et testables.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. Fichiers partagés uniques sans Worktree</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Deux agents modifiant simultanément le même fichier de configuration (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">package.json</code> ou <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">shared/types.ts</code>) provoqueront des conflits d'écrasement.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">4. Surcoût de coordination excessif</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Pour une micro-tâche de 3 lignes de code, orchestrer trois agents génère plus d'efforts de prompts que de coder la correction en direct.
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
            Quiz de validation du Chapitre 5
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Testez vos réflexes sur l'identification des tâches parallélisables, l'usage des contrats et les limites de la simultanéité.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Qu'est-ce que le travail en parallèle ?",
              options: [
                "Réaliser plusieurs tâches simultanément lorsque leurs conditions de réalisation le permettent.",
                "Réaliser toutes les tâches dans un ordre strict.",
                "Confier toutes les tâches à un seul agent.",
                "Supprimer les dépendances entre les tâches."
              ],
              correctIndex: 0,
              explanation: "Le travail en parallèle consiste à faire progresser plusieurs tâches simultanément lorsque leurs dépendances et conditions techniques le permettent."
            },
            {
              id: 2,
              question: "Quelle condition favorise le travail parallèle entre Backend et Frontend ?",
              options: [
                "Chaque agent utilise un contrat API différent.",
                "Le contrat API commun est défini et partagé.",
                "Le Backend modifie directement tous les composants React.",
                "Le Frontend attend la fin complète du projet."
              ],
              correctIndex: 1,
              explanation: "Le contrat API commun fournit une référence partagée permettant au Backend et au Frontend de coder indépendamment."
            },
            {
              id: 3,
              question: "Quelle situation nécessite généralement une organisation séquentielle ?",
              options: [
                "Deux tâches indépendantes utilisent des fichiers différents.",
                "Une tâche nécessite le résultat préalable d'une autre.",
                "Deux agents disposent d'un contrat commun.",
                "Deux tâches peuvent être réalisées sans dépendance."
              ],
              correctIndex: 1,
              explanation: "Lorsqu'une tâche a un besoin physique du résultat préalable d'une autre, l'exécution séquentielle s'impose."
            },
            {
              id: 4,
              question: "Quel est le principal risque de deux agents qui modifient le même fichier simultanément ?",
              options: [
                "Une amélioration automatique du code.",
                "Une suppression des dépendances.",
                "Des modifications incompatibles ou des conflits lors de l'intégration.",
                "Une augmentation automatique de la couverture de tests."
              ],
              correctIndex: 2,
              explanation: "Des écritures concurrentes sur un même fichier provoquent des écrasements et de violents conflits d'intégration de branches."
            },
            {
              id: 5,
              question: "Quel est le rôle d'un contrat partagé dans le travail parallèle ?",
              options: [
                "Permettre aux agents de travailler avec des règles communes.",
                "Remplacer les tests automatisés.",
                "Supprimer le besoin de coordination.",
                "Autoriser chaque agent à modifier librement toutes les parties du projet."
              ],
              correctIndex: 0,
              explanation: "Le contrat partagé garantit que les payloads JSON, les statuts et les routes sont harmonisés entre tous les agents."
            },
            {
              id: 6,
              question: "Quel est l'intérêt de Git Worktrees dans une équipe multi-agents ?",
              options: [
                "Supprimer automatiquement les conflits Git.",
                "Fournir plusieurs espaces de travail associés au même dépôt.",
                "Remplacer les branches Git.",
                "Garantir que tous les agents travaillent sur les mêmes fichiers."
              ],
              correctIndex: 1,
              explanation: "Git Worktrees permet à chaque agent de disposer de son propre espace de travail physique isolé sans dupliquer le dépôt."
            },
            {
              id: 7,
              question: "Pourquoi faut-il éviter de multiplier inutilement les tâches parallèles ?",
              options: [
                "Parce que le travail parallèle est toujours interdit.",
                "Parce que la coordination peut devenir plus complexe que le travail réalisé.",
                "Parce que les agents ne peuvent pas travailler simultanément.",
                "Parce que les contrats API empêchent le travail parallèle."
              ],
              correctIndex: 1,
              explanation: "La démultiplication anarchique de tâches parallèles surcharge le Team Leader et accroît les risques d'incohérence."
            },
            {
              id: 8,
              question: "Dans TaskFlow, après la définition du contrat API, quelles tâches peuvent progresser simultanément ?",
              options: [
                "Développer l'API et créer le formulaire React.",
                "Tester l'intégration finale avant tout développement.",
                "Supprimer le modèle de données et développer l'interface.",
                "Modifier le contrat sans coordination."
              ],
              correctIndex: 0,
              explanation: "Une fois le contrat validé, le Backend développe la route Express pendant que le Frontend crée le formulaire React."
            },
            {
              id: 9,
              question: "Quel est le rôle du Team Leader dans le travail parallèle ?",
              options: [
                "Réaliser toutes les tâches techniques.",
                "Lancer les agents sans suivre leurs résultats.",
                "Coordonner les tâches, suivre l'avancement et identifier les blocages.",
                "Remplacer les décisions du Project Manager humain."
              ],
              correctIndex: 2,
              explanation: "Le Team Leader supervise le respect des contrats, synchronise les livraisons et gère le passage à la phase d'intégration."
            },
            {
              id: 10,
              question: "Le travail parallèle garantit-il une réduction du temps de développement ?",
              options: [
                "Oui, dans tous les cas.",
                "Non, il peut aussi entraîner des coûts de coordination et des difficultés d'intégration.",
                "Oui, dès que deux agents sont disponibles.",
                "Non, parce que plusieurs agents ne peuvent pas partager un objectif."
              ],
              correctIndex: 1,
              explanation: "Le gain de temps n'est pas automatique : des conflits ou une mauvaise coordination peuvent anéantir les bénéfices du parallélisme."
            }
          ]}
        />
      </div>
    </div>
  );
};
