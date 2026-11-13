'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  // Simulateur interactif : Matrice d'Arbitrage et d'Escalade vers le PM
  const [selectedIncident, setSelectedIncident] = useState<'syntax_fix' | 'add_auth' | 'git_push_req' | 'internal_conflict'>('git_push_req');

  const incidents = {
    syntax_fix: {
      title: "1. Correction d'une erreur de syntaxe TypeScript",
      situation: "L'Agent Backend a oublié une virgule dans un objet de configuration et le compilateur signale une erreur.",
      level: "DÉCISION AUTONOME AGENT / TEAM LEADER",
      action: "L'Agent Backend corrige la syntaxe de lui-même sans déranger le Project Manager. Aucun changement de périmètre.",
      escaladeRequise: false,
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
    },
    internal_conflict: {
      title: "2. Désaccord sur le nom d'un paramètre de route",
      situation: "Le Backend suggère '/api/tasks/:id/status' et le Frontend préfère '/api/tasks/status/:id'.",
      level: "ARBITRAGE DE COORDINATION TEAM LEADER / ARCHITECT",
      action: "L'Architect tranche en faveur de la convention REST canonique '/:id/status'. Le Team Leader met à jour api-contracts.md.",
      escaladeRequise: false,
      badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300"
    },
    add_auth: {
      title: "3. Proposition d'ajouter une authentification complète",
      situation: "L'Agent Backend suggère d'ajouter des tokens JWT et une table utilisateurs dans TaskFlow.",
      level: "ESCALADE HUMAINE OBLIGATOIRE (Changement de Périmètre)",
      action: "Le Team Leader bloque l'initiative et prépare une fiche d'arbitrage pour le PM humain : l'authentification est hors périmètre v1.",
      escaladeRequise: true,
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
    },
    git_push_req: {
      title: "4. Demande d'autorisation de Push vers 'origin/main'",
      situation: "La route de statut est codée et testée. Le Backend demande l'autorisation d'envoyer le code sur GitHub.",
      level: "ESCALADE SOUVERAINE PROJECT MANAGER (Monopole Git)",
      action: "Opération formellement verrouillée. Le Team Leader prépare le dossier de recette et attend la signature écrite du PM humain.",
      escaladeRequise: true,
      badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
    }
  };

  const currentIncident = incidents[selectedIncident];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 7 &bull; Chapitre 9
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Escalade, Arbitrage & Souveraineté Humaine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          7.9 — Déterminer quand le Project Manager doit intervenir
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Une équipe multi-agents autonome n'est pas une équipe livrée à elle-même. Si le Team Leader gère le déroulement opérationnel quotidien, le Project Manager humain conserve la souveraineté absolue sur la trajectoire stratégique, les évolutions de périmètre et les opérations sensibles sur le dépôt Git.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle de séparation des pouvoirs :</p>
        <p>
          Le Team Leader prépare les faits et instruit les dossiers, mais ne tranche jamais à la place de l'humain. En particulier : <strong>aucun agent ne peut exécuter de <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans l'autorisation écrite et souveraine du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 9.1 & 9.2 : Décisions autonomes vs coordination vs escalade PM */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="shield-check" className="w-5 h-5 text-primary-600 shrink-0" />
          9.2 — Les 3 Niveaux de Décision dans l'Orchestration
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">Niveau 1 — Décisions Autonomes de l'Agent</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Ajustement syntaxique, refactoring interne d'une méthode, typage d'une variable selon les règles du projet. Ne requiert aucune validation extérieure.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-indigo-700 dark:text-indigo-400">Niveau 2 — Coordination du Team Leader</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Ordonnancement des tâches, synchronisation des Worktrees, réassignation d'une anomalie au Backend ou clarification du contrat technique avec l'Architect.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-rose-700 dark:text-rose-400">Niveau 3 — Escalade vers le Project Manager Humain</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Modification du périmètre fonctionnel (ex: auth, base de données), ajout d'une règle métier majeure (4ème statut), arbitrage de désaccord critique et autorisations Git de merge/push.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Matrice de Gouvernance &bull; Test d'Escalade
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur d'Arbitrage et d'Escalade vers le Project Manager
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Sélectionnez une situation rencontrée sur TaskFlow pour déterminer si le Team Leader doit trancher en autonomie ou escalader vers le PM humain.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Situation survenue :</span>
          {(Object.keys(incidents) as Array<keyof typeof incidents>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedIncident(key as keyof typeof incidents)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                selectedIncident === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {incidents[key].title}
            </button>
          ))}
        </div>

        {/* Diagnostic de l'arbitrage */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Niveau d'autorité :</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${currentIncident.badgeColor} shrink-0`}>
              {currentIncident.level}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contexte :</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {currentIncident.situation}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Protocole appliqué par le Team Leader :
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {currentIncident.action}
            </p>
          </div>
        </div>
      </div>

      {/* Section 9.5 : Fiche d'arbitrage modèle */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="document-check" className="w-5 h-5 text-emerald-600 shrink-0" />
          9.5 — Modèle de Fiche d'Arbitrage pour le Project Manager Humain
        </h2>
        <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs md:text-sm bg-slate-900 text-slate-100 max-w-full min-w-0">
          <pre>{`## Fiche d'Arbitrage Décisionnel — TaskFlow
- Objet : Proposition d'ajout d'un 4ème statut 'cancelled' (Annulée).
- Demandeur : Agent Backend.
- Périmètre initial validé : 3 statuts uniquement (todo, in_progress, done).
- Analyse d'impact :
  * Backend : adaptation de l'énumération TypeScript et des validateurs Zod.
  * Frontend : ajout d'une 4ème option et d'un 4ème badge de compteur.
  * QA : ajout de 4 scénarios de test supplémentaires.
- Options proposées au PM :
  * Option A : Conserver strictement les 3 statuts prévus pour la v1.
  * Option B : Valider l'extension fonctionnelle vers 4 statuts.
- Décision attendue : Choix souverain du Project Manager humain.`}</pre>
        </div>
      </div>

      {/* Quiz officiel */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Évaluation des connaissances
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de validation du Chapitre 7.9
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre compréhension des critères d'escalade, des niveaux d'autorité et des autorisations souveraines du PM.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal du Project Manager humain dans une équipe d'agents IA ?",
              options: [
                "Exécuter toutes les tâches techniques.",
                "Remplacer le Team Leader dans toutes les conversations.",
                "Définir les orientations, prendre les décisions importantes et valider les résultats qui relèvent de sa responsabilité.",
                "Contrôler chaque ligne de code produite par les agents."
              ],
              correctIndex: 2,
              explanation: "Le PM humain est le pilote souverain : il cadre les orientations, valide les changements de périmètre et prononce la recette finale."
            },
            {
              id: 2,
              question: "Quelle situation nécessite normalement une décision du Project Manager dans TaskFlow ?",
              options: [
                "Ajouter l'authentification, qui ne fait pas partie du périmètre initial.",
                "Corriger une erreur de syntaxe dans une fonction.",
                "Renommer une variable selon les conventions du projet.",
                "Ajouter un test prévu dans les critères d'acceptation."
              ],
              correctIndex: 0,
              explanation: "L'authentification modifie le périmètre fonctionnel initial de TaskFlow : seul le PM humain peut acter cette extension."
            },
            {
              id: 3,
              question: "Quel est le rôle du Team Leader lorsqu'une décision importante doit être prise ?",
              options: [
                "Décider automatiquement à la place du Project Manager.",
                "Demander à chaque agent de choisir sa propre solution.",
                "Arrêter toutes les missions sans analyser la situation.",
                "Préparer le contexte, les faits, les options et la décision attendue."
              ],
              correctIndex: 3,
              explanation: "Le Team Leader instruit le dossier : il clarifie les faits, mesure les impacts et soumet les options au PM humain."
            },
            {
              id: 4,
              question: "Quelle est la différence entre une autorisation et une validation ?",
              options: [
                "Une autorisation signifie que le projet est terminé.",
                "Une autorisation permet d'effectuer une opération, tandis qu'une validation accepte un résultat après examen.",
                "Une validation permet uniquement d'exécuter une commande.",
                "Les deux notions sont identiques."
              ],
              correctIndex: 1,
              explanation: "L'autorisation habilite une opération à s'exécuter. La validation intervient après examen objectif du livrable pour le déclarer conforme."
            },
            {
              id: 5,
              question: "Dans TaskFlow, quelle opération nécessite l'autorisation explicite du Project Manager humain ?",
              options: [
                "Corriger une faute de frappe dans un commentaire.",
                "Ajouter un test unitaire prévu.",
                "Effectuer un push.",
                "Lire un fichier du workspace autorisé."
              ],
              correctIndex: 2,
              explanation: "Toute synchronisation distante (push, merge, rebase) est sous le monopole exclusif du Project Manager humain."
            },
            {
              id: 6,
              question: "Que signifie la politique Request Review dans le processus de revue des plans d'Antigravity ?",
              options: [
                "L'agent attend une approbation humaine avant de poursuivre les étapes concernées.",
                "L'agent exécute automatiquement toutes les modifications sans contrôle.",
                "Le Project Manager n'a plus besoin d'examiner les résultats.",
                "L'agent supprime automatiquement les modifications non validées."
              ],
              correctIndex: 0,
              explanation: "Request Review suspend l'agent après la présentation du plan ou du diff pour attendre le feu vert explicite de l'humain."
            },
            {
              id: 7,
              question: "Vrai ou faux : une opération autorisée par les permissions techniques d'Antigravity est automatiquement conforme aux responsabilités définies dans le projet.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Une capacité technique n'équivaut jamais à une autorisation organisationnelle : la charte du projet prime toujours."
            },
            {
              id: 8,
              question: "Quel est le meilleur moment pour demander un arbitrage sur un changement important de périmètre ?",
              options: [
                "Après que tous les agents ont terminé le développement de la fonctionnalité supplémentaire.",
                "Uniquement après la livraison finale.",
                "Après avoir intégré les modifications dans la branche principale.",
                "Avant de lancer les missions qui dépendent de ce changement."
              ],
              correctIndex: 3,
              explanation: "Il faut arbitrer avant d'engager le travail pour éviter de produire du code hors sujet qui devra être jeté."
            },
            {
              id: 9,
              question: "Quelle information doit être conservée après une décision importante du Project Manager ?",
              options: [
                "Uniquement le nom de l'agent qui a posé la question.",
                "Le sujet, le contexte, la décision, la personne qui l'a validée et les missions concernées.",
                "Uniquement la dernière réponse de la conversation.",
                "Le nombre de messages échangés pendant l'arbitrage."
              ],
              correctIndex: 1,
              explanation: "La traçabilité de la décision garantit que tous les agents alignent leurs futurs développements sur la référence actée."
            },
            {
              id: 10,
              question: "Vrai ou faux : le Team Leader peut valider une opération de push à la place du Project Manager lorsque cette autorisation lui est explicitement réservée.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Le push étant réservé au Project Manager humain, le Team Leader ne peut en aucun cas s'auto-attribuer cette prérogative."
            }
          ]}
        />
      </div>
    </div>
  );
};
