'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // Simulateur interactif : Diagnostic et Résolution de Blocages
  const [selectedBlocker, setSelectedBlocker] = useState<'dep_wait' | 'infinite_loop' | 'sandbox_ask' | 'contract_conflict'>('sandbox_ask');

  const blockers = {
    dep_wait: {
      title: "1. Blocage de Dépendance (En attente du contrat)",
      symptom: "L'Agent Backend est inactif ou hésite à coder l'endpoint PATCH car l'Architect n'a pas validé les codes d'erreur.",
      cause: "Dépendance bloquante non satisfaite (attend M1).",
      action: "Le Team Leader priorise la mission de l'Architect et interdit au Backend d'inventer une solution provisoire.",
      badge: "Dépendance"
    },
    infinite_loop: {
      title: "2. Exécution en Boucle Infinie (Retry infructueux)",
      symptom: "Un sous-agent exécute la même commande en échec depuis 10 minutes en répétant la même erreur de syntaxe.",
      cause: "Perte d'orientation de l'agent dans sa tentative de correction.",
      action: "Interrompre l'exécution (touche 'K' dans /agents), analyser l'erreur et relancer avec une instruction ciblée.",
      badge: "Boucle critique"
    },
    sandbox_ask: {
      title: "3. Blocage d'Autorisation Sandbox (Règle 'Ask')",
      symptom: "L'Agent Backend est figé à l'état 'running' en attendant une validation pour installer un nouveau package npm.",
      cause: "Règle de sécurité Sandbox : l'accès réseau extérieur exige une approbation.",
      action: "Le Team Leader examine la demande dans le panneau /agents : approuver ('A') ou refuser ('D') après analyse.",
      badge: "Sécurité"
    },
    contract_conflict: {
      title: "4. Conflit de Spécification Inter-Agents",
      symptom: "Le Backend renvoie directement l'objet { id, status }, tandis que le Frontend attendait { task: { id, status } }.",
      cause: "Divergence d'interprétation du contrat d'interface.",
      action: "Arbitrage immédiat : l'Architect clarifie la structure officielle et le Team Leader met à jour api-contracts.md.",
      badge: "Conflit"
    }
  };

  const currentBlocker = blockers[selectedBlocker];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 7 &bull; Chapitre 7
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Résolution d'Incidents & Arbitrage
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          7.7 — Identifier et traiter les blocages
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Au cours d'un sprint multi-agents, les incidents sont inévitables : dépendance en retard, permission Sandbox en attente, boucle infinie de retry ou désaccord sur un format de données. Le Team Leader ne doit pas ordonner à l'agent de recommencer au hasard : il doit poser un diagnostic précis, identifier la cause racine et appliquer le levier de déblocage approprié.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle d'or en cas de blocage Git :</p>
        <p>
          Même face à un blocage urgent, <strong>le Team Leader et les agents ont interdiction formelle de contourner les règles de sécurité ou d'exécuter un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans autorisation expresse du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 7.1.1 : Difficulté vs Blocage vs Échec */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="exclamation-circle" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Distinguer Difficulté, Blocage et Échec</h2>
        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">1. La Difficulté : L'agent cherche une solution</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent explore plusieurs implémentations ou ajuste son algorithme. Il avance de façon autonome sans nécessiter d'intervention immédiate.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-amber-700 dark:text-amber-400">2. Le Blocage : La progression est stoppée</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent est immobilisé : il attend une décision humaine, une validation Sandbox, un contrat technique manquant ou tourne en rond dans une boucle.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-rose-700 dark:text-rose-400">3. L'Échec : L'opération a avorté</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Le processus a planté (erreur terminale dans le CLI), le test échoue irrémédiablement ou la tâche est compromise. Une réorientation est requise.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire de Résolution &bull; Déblocage Opérationnel
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur de Traitement des Blocages TaskFlow
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Sélectionnez une typologie d'incident pour examiner son symptôme, sa cause sous-jacente et l'arbitrage du Team Leader.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Type d'incident constaté :</span>
          {(Object.keys(blockers) as Array<keyof typeof blockers>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedBlocker(key as keyof typeof blockers)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                selectedBlocker === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {blockers[key].title}
            </button>
          ))}
        </div>

        {/* Diagnostic du blocage */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Nature :</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 shrink-0">
              {currentBlocker.badge}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Symptôme observé :</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {currentBlocker.symptom}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cause racine :</span>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
              {currentBlocker.cause}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <strong>Plan d'action du Team Leader :</strong> {currentBlocker.action}
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
            Quiz de validation du Chapitre 7
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre maîtrise du diagnostic des blocages, de l'usage des commandes Antigravity et des règles d'escalade.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la première démarche à effectuer lorsqu'un agent signale un blocage ?",
              options: [
                "Arrêter immédiatement tous les agents.",
                "Identifier précisément le problème et recueillir les informations nécessaires.",
                "Réattribuer automatiquement la mission à un autre agent.",
                "Demander à l'agent de recommencer toute sa mission."
              ],
              correctIndex: 1,
              explanation: "Il faut d'abord poser un diagnostic précis et recueillir les faits avant de décider d'une action corrective."
            },
            {
              id: 2,
              question: "Un agent Backend attend le contrat API défini par l'Architect. De quel type de blocage s'agit-il principalement ?",
              options: [
                "Un blocage lié à une permission.",
                "Un blocage lié à une erreur de compilation.",
                "Un blocage lié à une dépendance.",
                "Un blocage lié à une suppression de fichier."
              ],
              correctIndex: 2,
              explanation: "Le Backend a besoin d'un livrable préalable (le contrat de l'Architect) : c'est un blocage classique de dépendance."
            },
            {
              id: 3,
              question: "Dans Antigravity CLI, quelle commande permet de consulter les sous-agents et leurs états d'exécution ?",
              options: [
                "/agents",
                "/tasks",
                "/context",
                "/resume"
              ],
              correctIndex: 0,
              explanation: "La commande /agents ouvre la console de gestion des sous-agents dans le CLI d'Antigravity."
            },
            {
              id: 4,
              question: "Dans le panneau /agents du CLI, que signifie l'état error ?",
              options: [
                "Le sous-agent attend simplement une réponse de l'utilisateur.",
                "Le sous-agent a terminé avec un résultat automatiquement validé.",
                "Le sous-agent a été arrêté volontairement.",
                "Le sous-agent a rencontré une erreur terminale pendant son exécution."
              ],
              correctIndex: 3,
              explanation: "L'état error signale l'arrêt du sous-agent sur une erreur terminale non interceptée."
            },
            {
              id: 5,
              question: "Un agent ne peut pas exécuter une commande parce qu'une approbation est nécessaire. Quelle est la bonne démarche ?",
              options: [
                "Modifier automatiquement les permissions pour tout autoriser.",
                "Examiner l'opération demandée et obtenir l'approbation appropriée avant de poursuivre.",
                "Demander à l'agent de contourner la restriction.",
                "Supprimer les règles de sécurité du projet."
              ],
              correctIndex: 1,
              explanation: "Une demande d'approbation Sandbox doit être auditée : vérifier l'utilité de la commande, ses risques et approuver ou refuser en connaissance de cause."
            },
            {
              id: 6,
              question: "Le Backend et le Frontend utilisent deux formats différents pour le même champ de l'API. Quelle est la meilleure démarche du Team Leader ?",
              options: [
                "Laisser chaque agent conserver son propre format.",
                "Choisir arbitrairement le format du premier agent.",
                "Faire examiner les propositions, obtenir une décision sur le contrat commun et informer les agents concernés.",
                "Demander au QA de modifier directement les deux implémentations."
              ],
              correctIndex: 2,
              explanation: "Le Team Leader sollicite l'Architect pour trancher la référence officielle et aligner les deux implémentations sur le même contrat."
            },
            {
              id: 7,
              question: "Vrai ou faux : dans Antigravity CLI, l'état done d'un sous-agent signifie que le résultat de sa mission est automatiquement validé.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. L'état done indique la fin du processus technique, jamais la conformité fonctionnelle du code produit."
            },
            {
              id: 8,
              question: "Quand le Project Manager humain doit-il intervenir ?",
              options: [
                "Lorsqu'une décision dépasse le périmètre du Team Leader ou nécessite une autorisation qui lui est réservée.",
                "À chaque erreur de compilation, même si l'agent responsable peut la corriger.",
                "À chaque question technique mineure.",
                "Uniquement lorsque tous les agents ont terminé leurs missions."
              ],
              correctIndex: 0,
              explanation: "Le PM humain intervient sur les décisions stratégiques, les changements de périmètre et les autorisations réservées (ex: Git push/merge)."
            },
            {
              id: 9,
              question: "Quel est l'intérêt de conserver une trace d'un blocage résolu ?",
              options: [
                "Remplacer les tests techniques.",
                "Éviter de transmettre les décisions aux autres agents.",
                "Supprimer les comptes rendus des agents.",
                "Comprendre la difficulté rencontrée, la solution appliquée et prévenir sa répétition."
              ],
              correctIndex: 3,
              explanation: "La traçabilité documente la solution actée et empêche la réapparition des mêmes ambiguïtés dans les sprints futurs."
            },
            {
              id: 10,
              question: "Vrai ou faux : une mission peut être remise à l'état « En cours » dès que l'agent annonce qu'il peut reprendre, sans vérifier que la cause du blocage a été traitée.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Le Team Leader doit s'assurer que le prérequis manquant a été réellement fourni avant de relancer l'agent."
            }
          ]}
        />
      </div>
    </div>
  );
};
