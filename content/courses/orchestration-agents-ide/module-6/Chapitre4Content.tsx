'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  // Simulateur interactif : Détecteur & Résolveur de Dépendances Circulaires
  const [activeWorkflow, setActiveWorkflow] = useState<'healthy_dag' | 'circular_deadlock'>('healthy_dag');

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 6 &bull; Chapitre 4
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Graphes DAG & Dépendances
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          6.4 — Identifier les dépendances entre les tâches
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Certaines tâches ne peuvent démarrer qu'une fois d'autres achevées : c'est la notion de dépendance. Une mauvaise identification des prérequis engendre des blocages, des suppositions erronées et des réécritures coûteuses. Découvrez comment cartographier les dépendances techniques, fonctionnelles et contractuelles, et neutraliser les dépendances circulaires.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle de synchronisation et souveraineté Git :</p>
        <p>
          Identifier les dépendances permet de synchroniser les agents sans friction. Cependant, la fin d'une tâche d'implémentation n'autorise jamais un agent à fusionner son code : <strong>toute intégration finale par <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> nécessite l'approbation humaine expresse du Project Manager</strong>.
        </p>
      </Callout>

      {/* Section 4.1 & 4.3 : Les 4 types de dépendances */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="arrows-right-left" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Les 4 Familles de Dépendances</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour planifier judicieusement le travail d'une escouade d'agents, classez chaque lien de dépendance :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. Dépendance Technique</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-mono shrink-0">Code / Types</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Une tâche a besoin d'un artefact technique préalable. Exemple : L'Agent Backend ne peut implémenter la validation Zod que si les interfaces TypeScript communes ont été définies par l'Architect.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Dépendance Fonctionnelle</span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 font-mono shrink-0">Règles métier</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Une tâche découle d'une règle fonctionnelle. Exemple : Le changement de statut ne peut être codé qu'une fois la liste finie des trois statuts autorisés (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">todo</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">in_progress</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">done</code>) actée.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. Dépendance Liée à un Contrat d'Interface (API Contract)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-mono shrink-0">Contrat partagé</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Règle pivot d'orchestration : Dès que l'Architect fige le contrat REST (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">PATCH /api/tasks/:id/status</code>), le Frontend et le Backend peuvent commencer leurs développements respectifs sans attendre l'achèvement de l'autre !
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">4. Dépendance Liée à la Validation Humaine</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 font-mono shrink-0">Gouvernance PM</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Certaines étapes imposent le feu vert écrit du Project Manager humain (ex. validation d'un nouveau schéma de stockage, autorisation de déploiement ou merge de Pull Request).
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif : DAG vs Dépendance Circulaire */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire Graphique &bull; DAG & Détection de Deadlock
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur de Topologie de Dépendances TaskFlow
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Basculez entre une organisation saine (Graphe Acyclique Dirigé - DAG) et un cas pathologique de dépendance circulaire (Deadlock).
          </p>
        </div>

        {/* Boutons de bascule */}
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => setActiveWorkflow('healthy_dag')}
            className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
              activeWorkflow === 'healthy_dag'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            ✅ Topologie Saine : Graphe Acyclique (DAG avec Contrat API)
          </button>
          <button
            onClick={() => setActiveWorkflow('circular_deadlock')}
            className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
              activeWorkflow === 'circular_deadlock'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            ❌ Piège Mortel : Dépendance Circulaire (Deadlock inter-agents)
          </button>
        </div>

        {/* Diagnostic du graphe */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          {activeWorkflow === 'healthy_dag' ? (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                Graphe Dirigé Acyclique (DAG) — Flux d'exécution fluide :
              </span>
              <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs min-w-0 max-w-full">
                <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
{`T1 (Modèle Task) → T2 (Contrat API REST)
                       └┬── T3 (Backend API)  ┌──> T6 (Tests Intégration QA)
                       └┴── T4 (Frontend UI)  ┘
T2 (Contrat API) ──────────> T5 (Plan de tests QA)`}
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
                Grâce au contrat d'interface <strong>T2</strong>, le Backend et le Frontend avancent en parallèle sans se bloquer mutuellement. L'intégration <strong>T6</strong> ne s'exécute qu'une fois les deux briques disponibles.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">
                Boucle de blocage circulaire détectée :
              </span>
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-200 font-mono text-xs min-w-0 max-w-full">
                <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
{`T_Backend attend le formulaire Frontend pour connaître les noms de champs.
   ↑                                                                 ↓
   └───────── T_Frontend attend la route Backend pour coder l'appel ─┘`}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                <strong>Solution du Team Leader :</strong> Briser la boucle en introduisant une tâche préalable d'Architecte (T_Contrat). Dès que le contrat est validé, la dépendance circulaire disparaît.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 4.6 : Tableau des dépendances TaskFlow */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="table-cells" className="w-5 h-5 text-indigo-600 shrink-0" /> 2. Matrice des Dépendances de Référence TaskFlow</h2>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4 min-w-0 max-w-full overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              <tr>
                <th className="pb-3 pr-2 w-12 font-mono">ID</th>
                <th className="pb-3 pr-3 font-semibold">Tâche</th>
                <th className="pb-3 pr-3 font-semibold">Dépend de</th>
                <th className="pb-3 font-semibold">Justification technique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-2.5 pr-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">T1</td>
                <td className="py-2.5 pr-3 font-medium text-slate-900 dark:text-slate-100 break-words [overflow-wrap:anywhere]">Définir le modèle TypeScript Task</td>
                <td className="py-2.5 pr-3 text-slate-500 dark:text-slate-400">Aucune</td>
                <td className="py-2.5 break-words [overflow-wrap:anywhere] leading-relaxed">Tâche racine : structure fondamentale</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">T2</td>
                <td className="py-2.5 pr-3 font-medium text-slate-900 dark:text-slate-100 break-words [overflow-wrap:anywhere]">Définir le contrat REST (API)</td>
                <td className="py-2.5 pr-3 font-mono text-indigo-600 dark:text-indigo-400 font-semibold">T1</td>
                <td className="py-2.5 break-words [overflow-wrap:anywhere] leading-relaxed">Le contrat référence les types Task</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">T3</td>
                <td className="py-2.5 pr-3 font-medium text-slate-900 dark:text-slate-100 break-words [overflow-wrap:anywhere]">Développer l'API REST de création</td>
                <td className="py-2.5 pr-3 font-mono text-indigo-600 dark:text-indigo-400 font-semibold">T1, T2</td>
                <td className="py-2.5 break-words [overflow-wrap:anywhere] leading-relaxed">Requiert les types et les endpoints validés</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">T4</td>
                <td className="py-2.5 pr-3 font-medium text-slate-900 dark:text-slate-100 break-words [overflow-wrap:anywhere]">Créer le formulaire React</td>
                <td className="py-2.5 pr-3 font-mono text-indigo-600 dark:text-indigo-400 font-semibold">T2</td>
                <td className="py-2.5 break-words [overflow-wrap:anywhere] leading-relaxed">Requiert le contrat API (routes et payload)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">T5</td>
                <td className="py-2.5 pr-3 font-medium text-slate-900 dark:text-slate-100 break-words [overflow-wrap:anywhere]">Préparer les scénarios de test QA</td>
                <td className="py-2.5 pr-3 font-mono text-indigo-600 dark:text-indigo-400 font-semibold">T1, T2</td>
                <td className="py-2.5 break-words [overflow-wrap:anywhere] leading-relaxed">Se base sur les spécifications du contrat</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">T6</td>
                <td className="py-2.5 pr-3 font-medium text-slate-900 dark:text-slate-100 break-words [overflow-wrap:anywhere]">Exécuter les tests d'intégration</td>
                <td className="py-2.5 pr-3 font-mono text-indigo-600 dark:text-indigo-400 font-semibold">T3, T4, T5</td>
                <td className="py-2.5 break-words [overflow-wrap:anywhere] leading-relaxed">Requiert le backend, l'UI et les tests</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quiz officiel */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Évaluation des connaissances
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de validation du Chapitre 4
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre maîtrise de la cartographie des dépendances, de la distinction obligatoire/organisationnelle et de la résolution des blocages.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'une dépendance entre deux tâches ?",
              options: [
                "Une relation indiquant qu'une tâche nécessite le résultat d'une autre.",
                "Une relation indiquant que deux tâches doivent être confiées au même agent.",
                "Une obligation de réaliser toutes les tâches simultanément.",
                "Une relation qui interdit de modifier le code."
              ],
              correctIndex: 0,
              explanation: "Une dépendance indique qu'une tâche a besoin d'un livrable ou d'un résultat préalable pour pouvoir être exécutée correctement."
            },
            {
              id: 2,
              question: "Dans la représentation T1 → T2, que signifie cette relation ?",
              options: [
                "T1 dépend de T2.",
                "T2 dépend de T1.",
                "T1 et T2 sont indépendantes.",
                "T1 et T2 doivent être fusionnées."
              ],
              correctIndex: 1,
              explanation: "La flèche T1 &rarr; T2 signifie que T2 dépend de T1 : le résultat de T1 doit être disponible avant que T2 ne démarre."
            },
            {
              id: 3,
              question: "Quel exemple représente une dépendance technique ?",
              options: [
                "Définir le modèle de données avant de développer une fonction qui l'utilise.",
                "Choisir la couleur d'un bouton.",
                "Organiser une réunion de suivi.",
                "Modifier le nom d'un agent."
              ],
              correctIndex: 0,
              explanation: "Le modèle de données fournit la structure TypeScript sur laquelle s'appuient les fonctions d'implémentation."
            },
            {
              id: 4,
              question: "Qu'est-ce qu'un contrat d'interface entre le frontend et le backend ?",
              options: [
                "Une liste de permissions Git.",
                "Un document qui définit les règles d'échange entre les deux parties.",
                "Une conversation privée entre deux agents.",
                "Un planning de développement."
              ],
              correctIndex: 1,
              explanation: "Le contrat d'interface fige les routes, méthodes HTTP, formats JSON et codes d'erreur échangés entre le client et le serveur."
            },
            {
              id: 5,
              question: "Quelle situation représente une dépendance circulaire ?",
              options: [
                "T1 précède T2 et T2 précède T3.",
                "T1 et T2 sont indépendantes.",
                "T1 dépend de T2, T2 dépend de T3 et T3 dépend de T1.",
                "Trois tâches sont confiées à trois agents."
              ],
              correctIndex: 2,
              explanation: "Dans une boucle T1 &rarr; T2 &rarr; T3 &rarr; T1, chaque tâche attend le résultat de la suivante : aucune ne peut débuter, provoquant un blocage absolu."
            },
            {
              id: 6,
              question: "Quelle est la différence entre une dépendance obligatoire et une dépendance organisationnelle ?",
              options: [
                "La dépendance obligatoire correspond à un besoin réel de résultat préalable ; la dépendance organisationnelle relève d'un choix d'organisation.",
                "La dépendance obligatoire concerne uniquement le frontend.",
                "La dépendance organisationnelle interdit le travail en parallèle.",
                "Les deux types ont toujours exactement les mêmes conséquences."
              ],
              correctIndex: 0,
              explanation: "La dépendance obligatoire est imposée par la logique technique/fonctionnelle. L'organisationnelle relève d'un choix de planification modifiable."
            },
            {
              id: 7,
              question: "Pourquoi faut-il représenter les dépendances dans un tableau ou un diagramme ?",
              options: [
                "Pour remplacer les missions des agents.",
                "Pour visualiser les relations et faciliter l'organisation des travaux.",
                "Pour éviter de définir des objectifs.",
                "Pour supprimer les tâches techniques."
              ],
              correctIndex: 1,
              explanation: "Un tableau ou graphe visuel met en évidence le chemin critique, les prérequis bloquants et les opportunités de travail simultané."
            },
            {
              id: 8,
              question: "Une tâche nécessite les résultats de T2 et T3. Comment faut-il représenter cette dépendance ?",
              options: [
                "T2 → T3, sans autre relation.",
                "T2 + T3 → T4, si T4 est la tâche concernée.",
                "T4 → T2 uniquement.",
                "T2 et T3 doivent être supprimées."
              ],
              correctIndex: 1,
              explanation: "La notation T2 + T3 &rarr; T4 indique que T4 a pour prérequis obligatoires les résultats conjoints de T2 et T3."
            },
            {
              id: 9,
              question: "Une tâche peut-elle commencer avant que toutes les autres tâches du projet soient terminées ?",
              options: [
                "Non, toutes les tâches doivent toujours être exécutées dans un ordre unique.",
                "Oui, si les résultats préalables nécessaires sont disponibles.",
                "Non, un agent doit toujours attendre la fin du projet.",
                "Oui, même si les informations indispensables sont absentes."
              ],
              correctIndex: 1,
              explanation: "Dès lors que ses prérequis stricts sont satisfaits, une tâche peut être lancée sans attendre l'achèvement de pans entiers non liés."
            },
            {
              id: 10,
              question: "Quel est le rôle du Team Leader concernant les dépendances ?",
              options: [
                "Ignorer les tâches bloquées.",
                "Supprimer automatiquement les tâches qui prennent du retard.",
                "Suivre les résultats préalables, les blocages et l'état des tâches.",
                "Réaliser personnellement toutes les tâches techniques."
              ],
              correctIndex: 2,
              explanation: "Le Team Leader supervise le graphe de dépendances, débloque les goulots d'étranglement et ordonnance le passage de relais entre agents."
            }
          ]}
        />
      </div>
    </div>
  );
};
