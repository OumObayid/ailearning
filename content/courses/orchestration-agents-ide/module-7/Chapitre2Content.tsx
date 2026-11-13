'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  // Simulateur interactif : Diagnostic de Délégation & Test de Reformulation
  const [activeScenario, setActiveScenario] = useState<'backend_drift' | 'frontend_contract' | 'qa_scope'>('backend_drift');

  const scenarios = {
    backend_drift: {
      agent: "Agent Backend",
      mandat: "Mission M2 : Développer la route PATCH /api/tasks/:id/status.",
      agentResponse: "« Compris. Je vais implémenter la route pour changer le statut, et j'en profite pour ajouter la modification du titre et de la description dans la même route pour aller plus vite. »",
      diagnosis: "⚠️ DÉRIVE DE PÉRIMÈTRE DÉTECTÉE LORS DE LA REFORMULATION !",
      resolution: "Le Team Leader recadre immédiatement : « Non. Ta mission est strictement restreinte au champ 'status'. Le titre et la description doivent rester inchangés conformément au périmètre validé. »",
      statusClass: "bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/30 dark:border-rose-800/40 dark:text-rose-200"
    },
    frontend_contract: {
      agent: "Agent Frontend",
      mandat: "Mission M3 : Développer le sélecteur de statut dans TaskItem.tsx.",
      agentResponse: "« J'ai bien reçu le contrat REST docs/architecture/api-contracts.md. Je vais envoyer une requête PATCH vers /api/tasks/:id/status avec { status: 'in_progress' } et gérer l'état de chargement ainsi que l'erreur 400. »",
      diagnosis: "✅ MISSION PARFAITEMENT COMPRISE ET CONFORME.",
      resolution: "Le Team Leader valide le lancement de la mission : l'agent s'appuie sur le contrat partagé sans altérer les composants backend.",
      statusClass: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-200"
    },
    qa_scope: {
      agent: "Agent QA",
      mandat: "Mission M4 : Préparer et exécuter les tests de transition de statut.",
      agentResponse: "« Je vais préparer les scénarios pour les statuts valides, tester l'erreur 400 sur un statut inconnu et l'erreur 404 sur tâche inexistante. Si je trouve un bug dans le contrôleur, je le corrigerai moi-même. »",
      diagnosis: "⚠️ CHEVAUCHEMENT DE RÔLE IDENTIFIÉ !",
      resolution: "Le Team Leader rappelle la règle d'étanchéité : « Ton rôle est de consigner l'anomalie dans un rapport de test, pas de modifier le code serveur. C'est l'Agent Backend qui appliquera le correctif. »",
      statusClass: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800/40 dark:text-amber-200"
    }
  };

  const currentScenario = scenarios[activeScenario];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 7 &bull; Chapitre 2
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Passage de Relais & Cadrage
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          7.2 — Déléguer les missions aux agents spécialisés
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Déléguer ne consiste pas à jeter un prompt dans un chat en espérant que l'agent devine le contexte. Une délégation efficace exige de choisir l'expert adéquat, de lui transmettre explicitement les informations de référence, de circonscrire son périmètre et de vérifier sa bonne compréhension par une reformulation préalable.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Rappel de souveraineté des autorisations :</p>
        <p>
          La délégation d'une mission technique ne confère aucune autorisation managériale implicite. <strong>Aucun agent ne peut exécuter de <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans la validation expresse et écrite du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 2.1 & 2.4 : Les piliers d'une délégation structurée */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="arrow-right-circle" className="w-5 h-5 text-primary-600 shrink-0" />
          2.1 & 2.4 — Les Informations Clés à Transmettre lors de la Délégation
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Un agent ne dispose pas automatiquement de l'historique des autres conversations. Chaque passage de relais doit réunir :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. Le Rôle & la Vocation de l'Agent</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Rappeler son identité technique (« Tu es l'Agent Backend ») afin qu'il s'abstienne d'intervenir sur les fichiers React ou sur l'architecture globale.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. L'Objectif Précis & les Fichiers Cibles</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Formuler un résultat observable sans équivoque et lister les fichiers concernés (ex: <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">backend/src/routes/taskRoutes.ts</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. Les Documents de Référence Actés</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Transmettre le contrat technique REST validé (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">docs/architecture/api-contracts.md</code>) et les types partagés.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">4. Les Limites, Critères & Modalités de Compte Rendu</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Énoncer les interdits, les critères d'acceptation normatifs et exiger un rapport mentionnant les fichiers modifiés et les commandes de test réellement exécutées.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2.7 : Délégation Complète vs Délégation Partielle */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="scale" className="w-5 h-5 text-indigo-600 shrink-0" />
          2.7 — Délégation Complète vs Délégation Partielle
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-bold text-sm text-emerald-800 dark:text-emerald-300">Délégation Complète : Autonomie Totale dans le Périmètre</span>
            <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent dispose de l'ensemble des prérequis, du contrat d'interface et des autorisations nécessaires. Il réalise sa mission jusqu'aux tests unitaires sans interruption.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-bold text-sm text-amber-800 dark:text-amber-300">Délégation Partielle : Cadrage Préparatoire Sous Réserve</span>
            <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              Une partie du travail peut débuter (ex: explorer le modèle existant ou préparer la structure d'un composant), mais certaines décisions restent en attente de validation. L'agent a l'interdiction de figer les détails en suspens.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire de Recadrage &bull; Contrôle de Prise en Charge
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur de Diagnostic de Délégation & Reformulation
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Observez la réponse d'un agent recevant sa mission et vérifiez si le Team Leader doit recadrer un chevauchement ou valider le démarrage.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Scénario de délégation testé :</span>
          {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveScenario(key)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                activeScenario === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {scenarios[key].agent} — {scenarios[key].mandat}
            </button>
          ))}
        </div>

        {/* Diagnostic du scénario */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reformulation de l'agent :</span>
            <p className="text-xs sm:text-sm italic font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-normal break-words [overflow-wrap:anywhere]">
              {currentScenario.agentResponse}
            </p>
          </div>

          <div className="p-3 rounded-lg border text-xs sm:text-sm font-semibold whitespace-normal break-words [overflow-wrap:anywhere] flex items-center gap-2">
            <span>{currentScenario.diagnosis}</span>
          </div>

          <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <strong>Action immédiate du Team Leader :</strong> {currentScenario.resolution}
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
            Quiz de validation du Chapitre 7.2
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre maîtrise du processus de délégation, de la transmission des informations et du contrôle de prise en charge.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal de la délégation ?",
              options: [
                "Confier une mission précise à un agent adapté.",
                "Donner toutes les missions à un seul agent.",
                "Supprimer le rôle du Team Leader.",
                "Éviter de définir les résultats attendus."
              ],
              correctIndex: 0,
              explanation: "La délégation permet de répartir le travail selon les responsabilités des agents. Elle nécessite un objectif, un périmètre et des résultats attendus."
            },
            {
              id: 2,
              question: "Qui doit principalement développer une route API dans TaskFlow ?",
              options: [
                "Le Reviewer.",
                "Le Backend.",
                "Le Project Manager humain.",
                "Le QA."
              ],
              correctIndex: 1,
              explanation: "Le Backend est responsable du développement serveur, notamment des routes API et de la logique métier."
            },
            {
              id: 3,
              question: "Quelle différence existe-t-il entre un responsable et un contributeur ?",
              options: [
                "Le contributeur possède toujours l'autorité finale.",
                "Le responsable ne réalise pas de travail.",
                "Le responsable porte la réalisation de la mission, tandis que le contributeur apporte une aide complémentaire.",
                "Il n'existe aucune différence."
              ],
              correctIndex: 2,
              explanation: "Le responsable est directement chargé du travail demandé. Un contributeur apporte des informations ou une assistance sans devenir automatiquement responsable."
            },
            {
              id: 4,
              question: "Quelle information est indispensable dans une mission bien préparée ?",
              options: [
                "Uniquement le nom de l'agent.",
                "Uniquement la date de lancement.",
                "Uniquement le nombre de fichiers du projet.",
                "Un objectif et des résultats attendus clairement définis."
              ],
              correctIndex: 3,
              explanation: "L'agent doit savoir ce qu'il doit réaliser et ce qu'il doit fournir. Sans ces éléments, le travail est difficile à orienter et à contrôler."
            },
            {
              id: 5,
              question: "L'Architect doit définir le contrat API avant le développement Backend et Frontend. Que doit faire le Team Leader ?",
              options: [
                "Lancer les développements avec des contrats différents.",
                "Attendre le contrat commun avant les travaux qui en dépendent.",
                "Demander au QA de remplacer l'Architect.",
                "Autoriser chaque agent à inventer son propre format."
              ],
              correctIndex: 1,
              explanation: "Le Backend et le Frontend doivent utiliser une référence technique commune. Le Team Leader peut organiser des préparations indépendantes, mais ne doit pas laisser les développements dépendants avancer sur des hypothèses incompatibles."
            },
            {
              id: 6,
              question: "Quand une délégation est-elle partielle ?",
              options: [
                "Lorsque l'agent peut commencer une partie du travail, mais que certains éléments restent en attente.",
                "Lorsque l'agent reçoit toutes les informations et peut réaliser toute sa mission.",
                "Lorsque la mission est déjà terminée.",
                "Lorsque le Team Leader ne connaît pas le responsable."
              ],
              correctIndex: 0,
              explanation: "Une délégation partielle autorise uniquement le travail dont les conditions sont réunies. Les éléments nécessitant une clarification ou une décision doivent rester en attente."
            },
            {
              id: 7,
              question: "Pourquoi demander à un agent de reformuler sa mission ?",
              options: [
                "Pour lui faire répéter inutilement le prompt.",
                "Pour remplacer les critères d'acceptation.",
                "Pour vérifier qu'il a compris l'objectif, les contraintes et les livrables.",
                "Pour lui transférer les responsabilités du Project Manager."
              ],
              correctIndex: 2,
              explanation: "La reformulation permet de détecter les incompréhensions avant le début du travail et de clarifier les limites de la mission."
            },
            {
              id: 8,
              question: "Le Backend prévoit de modifier le titre et la description alors que sa mission concerne uniquement le statut. Que doit faire le Team Leader ?",
              options: [
                "Accepter les modifications supplémentaires sans examen.",
                "Demander au Frontend de corriger le Backend.",
                "Ignorer le problème.",
                "Clarifier le périmètre et rappeler les limites de la mission."
              ],
              correctIndex: 3,
              explanation: "L'agent doit respecter le périmètre défini. Une modification supplémentaire doit être examinée et autorisée avant d'être intégrée à la mission."
            },
            {
              id: 9,
              question: "Quelle affirmation concernant la transmission d'une mission dans Antigravity est correcte ?",
              options: [
                "L'envoi du prompt garantit automatiquement la réussite du travail.",
                "La transmission doit être suivie d'un examen des résultats et des livrables.",
                "L'agent peut toujours accéder à tous les fichiers sans restriction.",
                "Le Team Leader n'a plus de responsabilité après l'envoi du prompt."
              ],
              correctIndex: 1,
              explanation: "L'envoi d'un prompt constitue le lancement d'une mission, pas une preuve de réussite. Le Team Leader doit examiner les résultats obtenus."
            },
            {
              id: 10,
              question: "Que doit faire le Team Leader lorsqu'une mission nécessite une autorisation qui relève du Project Manager humain ?",
              options: [
                "Effectuer l'opération immédiatement.",
                "Demander à un autre agent de décider.",
                "Suspendre l'action concernée et demander l'autorisation nécessaire.",
                "Considérer que la délégation vaut autorisation."
              ],
              correctIndex: 2,
              explanation: "La délégation ne donne pas automatiquement le droit d'effectuer une opération sensible. Les autorisations réservées au Project Manager humain doivent être respectées."
            }
          ]}
        />
      </div>
    </div>
  );
};
