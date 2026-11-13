'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // Simulateur interactif : Comparateur États Organisationnels vs États Techniques
  const [selectedView, setSelectedView] = useState<'project_flow' | 'technical_cli'>('project_flow');

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 7 &bull; Chapitre 5
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Supervision & Métriques de Progression
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          7.5 — Suivre l'avancement des missions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Le suivi opérationnel ne consiste pas à interroger les agents en boucle pour leur demander s'ils ont terminé. Il repose sur un tableau de bord factuel, la collecte de preuves tangibles et la distinction essentielle entre une tâche achevée techniquement par un agent et une tâche formellement validée par la recette.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Distinguer achèvement technique et validation humaine :</p>
        <p>
          Ce n'est pas parce qu'un sous-agent affiche le statut <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">done</code> dans le CLI d'Antigravity que son livrable est correct. L'achèvement précède l'audit de recette : <strong>aucun agent ne peut s'auto-valider, et seul le Project Manager humain prononce la recette définitive et autorise un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code></strong>.
        </p>
      </Callout>

      {/* Section 5.2 : Avancement, Achèvement et Validation */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="chart-bar" className="w-5 h-5 text-primary-600 shrink-0" />
          5.2 — Distinguer l'Avancement, l'Achèvement et la Validation
        </h2>
        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">1. L'Avancement (En cours d'exécution)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              La mission est en cours de traitement. L'agent explore le code ou rédige les fonctions, mais le résultat attendu n'est pas encore complet.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-amber-700 dark:text-amber-400">2. L'Achèvement (Déclaration de l'agent)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent annonce avoir terminé sa mission et transmet son compte rendu. Cela signale au Team Leader que les fichiers sont prêts pour l'audit.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">3. La Validation (Recette objective et formelle)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Les critères d'acceptation sont vérifiés par les tests automatisés, la revue du Reviewer est favorable et le Project Manager humain valide le livrable.
            </p>
          </div>
        </div>
      </div>

      {/* Section 5.6 : Commandes de supervision Antigravity */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="command-line" className="w-5 h-5 text-indigo-600 shrink-0" />
          5.6 — Outils de Supervision dans Google Antigravity
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Panneau <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">/agents</code> (CLI)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Supervise les sous-agents d'arrière-plan avec leurs 4 états techniques : <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">running</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">done</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">error</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">killed</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Commande <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">/tasks</code> (CLI)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Suit les opérations système d'arrière-plan non-agentiques (longues suites de tests, compilations, serveurs locaux) distinctes des sous-agents.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Artifacts & Walkthroughs</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Rendus visuels structurés (plans d'implémentation, diffs de code, diagrammes) facilitant le contrôle du Team Leader sans lire des milliers de logs bruts.</p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Console de Monitoring &bull; Comparateur de Statuts
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur de Suivi : États Métier Projet vs États Techniques IDE
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Basculez entre le tableau de suivi organisationnel de TaskFlow et la vue technique des sous-agents Antigravity CLI.
          </p>
        </div>

        {/* Boutons de bascule */}
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => setSelectedView('project_flow')}
            className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
              selectedView === 'project_flow'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            📋 Vue Organisationnelle TaskFlow (8 états : À préparer &rarr; Validée)
          </button>
          <button
            onClick={() => setSelectedView('technical_cli')}
            className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
              selectedView === 'technical_cli'
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            💻 Vue Technique Antigravity CLI (/agents & /tasks)
          </button>
        </div>

        {/* Diagnostic du tableau */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          {selectedView === 'project_flow' ? (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">
                Tableau de Suivi de Projet TaskFlow :
              </span>
              <div className="overflow-x-auto font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <pre>{`| Mission          | Responsable | État        | Livrable disponible               |
|------------------|-------------|-------------|-----------------------------------|
| M1 - Contrat API | Architect   | Validée     | docs/architecture/api-contracts.md|
| M2 - Backend API | Backend     | À vérifier  | taskRoutes.ts + tests unitaires   |
| M3 - Frontend UI | Frontend    | En cours    | TaskItem.tsx (appel API en cours) |
| M4 - Plan Tests  | QA          | Terminée    | Scénarios de tests documentés     |
| M5 - Recette QA  | QA          | En attente  | Attend la livraison du Frontend   |
| M6 - Revue Code  | Reviewer    | En attente  | Attend les modifications finales  |`}</pre>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                La mission M2 est passée à l'état <strong>À vérifier</strong> : le Backend a terminé son développement, mais le code doit être recetté avant toute validation.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wide">
                Console Technique Antigravity CLI (/agents) :
              </span>
              <div className="overflow-x-auto font-mono text-xs text-slate-100 bg-slate-900 p-3 rounded-lg">
                <pre>{`[subagent:backend]   status: DONE    (exit: 0, executionTime: 42s)
[subagent:frontend]  status: RUNNING (step: 3/5, editing TaskItem.tsx)
[subagent:qa]        status: IDLE    (waiting for new prompt trigger)
[task:npm-test-bg]   status: DONE    (18 passed, 0 failed)`}</pre>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Attention au piège :</strong> Le statut technique <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">DONE</code> du sous-agent Backend signifie seulement que le processus a terminé son exécution sans planter. Il ne préjuge pas de la conformité du livrable !
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
            Quiz de validation du Chapitre 7.5
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Vérifiez votre compréhension de la surveillance de progression, des commandes /agents et /tasks, et des indicateurs fiables.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la différence entre une mission terminée et une mission validée ?",
              options: [
                "Une mission terminée est automatiquement validée.",
                "Une mission terminée a été déclarée achevée par l'agent ; une mission validée a satisfait les contrôles prévus.",
                "Une mission validée ne nécessite aucun résultat.",
                "Il n'existe aucune différence."
              ],
              correctIndex: 1,
              explanation: "L'agent peut déclarer son travail achevé (terminé), mais sa conformité doit être démontrée par la recette pour être validée."
            },
            {
              id: 2,
              question: "Quel élément constitue une information utile pour suivre une mission ?",
              options: [
                "Le nombre de messages envoyés par l'agent uniquement.",
                "Le nom du modèle utilisé uniquement.",
                "Les résultats disponibles, le travail restant et les éventuels blocages.",
                "La durée de chaque réponse de l'agent uniquement."
              ],
              correctIndex: 2,
              explanation: "Les résultats concrets produits, les étapes restantes et les obstacles permettent de mesurer objectivement la situation réelle."
            },
            {
              id: 3,
              question: "Dans Antigravity CLI, que signifie l'état running d'un sous-agent ?",
              options: [
                "Le sous-agent est en train d'exécuter sa mission.",
                "Le sous-agent a terminé et son résultat est validé.",
                "Le sous-agent a été supprimé définitivement.",
                "Le sous-agent attend obligatoirement une validation du Project Manager."
              ],
              correctIndex: 0,
              explanation: "L'état running indique que le sous-agent est actif, exécute des actions système ou génère du code."
            },
            {
              id: 4,
              question: "À quoi sert la commande /tasks dans Antigravity CLI ?",
              options: [
                "À modifier les permissions de tous les agents.",
                "À valider automatiquement les livrables.",
                "À créer des branches Git.",
                "À suivre certaines opérations d'arrière-plan qui ne sont pas des sous-agents."
              ],
              correctIndex: 3,
              explanation: "/tasks permet de surveiller les processus de fond non-agentiques (compilations, suites de tests, serveurs)."
            },
            {
              id: 5,
              question: "Quel est l'intérêt principal des Artifacts dans Antigravity ?",
              options: [
                "Remplacer toutes les conversations entre agents.",
                "Présenter des livrables structurés qui facilitent le suivi et la revue du travail.",
                "Garantir que toutes les modifications sont correctes.",
                "Supprimer la nécessité de vérifier les résultats."
              ],
              correctIndex: 1,
              explanation: "Les Artifacts structurent les livrables (plans, diffs, diagrammes) sous un format visuel directement auditable."
            },
            {
              id: 6,
              question: "Pourquoi faut-il interpréter avec prudence le pourcentage d'avancement d'une mission ?",
              options: [
                "Parce qu'un pourcentage ne peut jamais être calculé.",
                "Parce qu'il dépend uniquement du nombre de messages échangés.",
                "Parce que les différentes étapes peuvent représenter des charges de travail très différentes.",
                "Parce que toutes les missions doivent obligatoirement avancer au même rythme."
              ],
              correctIndex: 2,
              explanation: "Avoir accompli 2 sous-tâches sur 4 ne signifie pas être à 50% de l'effort si les deux dernières étapes sont bien plus complexes."
            },
            {
              id: 7,
              question: "Une mission reste indiquée « En cours », mais aucun résultat n'a été transmis depuis un certain temps. Que doit faire le Team Leader ?",
              options: [
                "Demander un compte rendu précis et identifier une éventuelle difficulté.",
                "La déclarer automatiquement terminée.",
                "La supprimer du tableau de suivi.",
                "Considérer que l'agent ne travaille plus sans demander de précision."
              ],
              correctIndex: 0,
              explanation: "Le Team Leader sollicite un compte rendu intermédiaire factuel pour savoir si l'agent est bloqué par une dépendance ou tourne en boucle."
            },
            {
              id: 8,
              question: "Vrai ou faux : l'état done d'un sous-agent dans Antigravity CLI signifie que la mission a satisfait tous ses critères d'acceptation.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. L'état done indique seulement la fin de l'exécution du processus d'arrière-plan, sans garantir l'exactitude fonctionnelle du code."
            },
            {
              id: 9,
              question: "Que doit contenir un compte rendu d'avancement utile au Project Manager ?",
              options: [
                "Uniquement une affirmation selon laquelle le projet avance bien.",
                "La totalité des échanges internes sans synthèse.",
                "Les préférences personnelles des agents.",
                "La situation des missions, les résultats disponibles, les blocages et les décisions attendues."
              ],
              correctIndex: 3,
              explanation: "Une synthèse destinée au PM humain doit être synthétique, factuelle et orientée vers la prise de décision."
            },
            {
              id: 10,
              question: "Vrai ou faux : le tableau de suivi TaskFlow doit obligatoirement utiliser les mêmes états que le panneau /agents d'Antigravity CLI.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Le tableau TaskFlow suit les états organisationnels du projet (À vérifier, Validée), tandis que /agents suit le cycle technique du processus (running, done)."
            }
          ]}
        />
      </div>
    </div>
  );
};
