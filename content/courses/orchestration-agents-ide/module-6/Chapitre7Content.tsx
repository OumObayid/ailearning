'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // Simulateur interactif : Tableau de recette et statut des critères
  const [activeCriterion, setActiveCriterion] = useState<'ca_valid_patch' | 'ca_invalid_status' | 'ca_counters' | 'ca_untested'>('ca_valid_patch');

  const criteriaData = {
    ca_valid_patch: {
      id: "CA-1",
      title: "Mise à jour d'un statut valide",
      statement: "Une requête PATCH /api/tasks/:id/status avec un statut valide ('in_progress') retourne HTTP 200 et la tâche mise à jour.",
      status: "SATISFAIT",
      proof: "Test d'intégration Supertest 'should update task status to in_progress' exécuté avec succès (200 OK reçu, objet vérifié).",
      statusClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300"
    },
    ca_invalid_status: {
      id: "CA-2",
      title: "Rejet d'un statut invalide",
      statement: "Une requête PATCH avec un statut hors liste (ex: 'archived') doit être rejetée avec le code HTTP 400 Bad Request et un message explicatif.",
      status: "NON SATISFAIT",
      proof: "Échec du test : L'API a retourné HTTP 500 au lieu de HTTP 400 en raison d'une exception non gérée dans le validateur. Anomalie signalée au Backend.",
      statusClass: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300"
    },
    ca_counters: {
      id: "CA-3",
      title: "Actualisation cohérente des compteurs",
      statement: "Les compteurs de statut (todo, in_progress, done) sont recalculés dynamiquement à partir de la collection des tâches sans dérive.",
      status: "SATISFAIT",
      proof: "Test fonctionnel frontend et test backend : après passage d'une tâche de 'todo' à 'done', le compteur todo passe de 4 à 3 et done de 3 à 4.",
      statusClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300"
    },
    ca_untested: {
      id: "CA-4",
      title: "Comportement sur tâche inexistante (404)",
      statement: "Une requête sur un identifiant introuvable (/api/tasks/999/status) retourne HTTP 404 Not Found.",
      status: "NON VÉRIFIÉ",
      proof: "Attention : L'agent affirme que la 404 est gérée, mais aucun test automatisé n'a été exécuté pour le prouver. Le critère reste à l'état 'Non vérifié' !",
      statusClass: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300"
    }
  };

  const currentCriterion = criteriaData[activeCriterion];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 6 &bull; Chapitre 7
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Conditions de Succès & Preuves de Recette
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          6.7 — Définir les critères d'acceptation
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Comment savoir avec certitude qu'une mission a été correctement accomplie ? Sans critères précis et mesurables, le contrôle du travail devient arbitraire ou superficiel. Un critère d'acceptation définit les conditions exactes et vérifiables qu'un livrable doit satisfaire pour être validé. Découvrez comment structurer ces critères et exiger des preuves objectives.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Distinguer conformité technique et validation souveraine :</p>
        <p>
          Ce n'est pas parce que tous les tests passent et que les critères d'acceptation techniques sont satisfaits qu'un agent peut clore un sprint ou fusionner sa branche : <strong>seul le Project Manager humain prononce la recette définitive et autorise un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code></strong>.
        </p>
      </Callout>

      {/* Section 7.2 : Objectif vs Résultat attendu vs Critère d'acceptation */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="check-badge" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Objectif, Résultat Attendu et Critère d'Acceptation</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour maîtriser le cycle de vie d'une tâche, conjuguez ces trois notions :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. L'Objectif : « Pourquoi ? »</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              « Permettre à l'utilisateur de modifier le statut d'une tâche existante. » &rarr; Intention fonctionnelle globale.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Le Résultat Attendu : « Quoi ? »</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              « Une route Express PATCH /api/tasks/:id/status et une fonction de contrôleur. » &rarr; L'artefact concret produit.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. Le Critère d'Acceptation : « Comment vérifier ? »</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              « Une requête contenant un statut valide ('in_progress') retourne HTTP 200 avec la tâche mise à jour ; une requête avec un statut inconnu retourne HTTP 400. » &rarr; La condition normative testable.
            </p>
          </div>
        </div>
      </div>

      {/* Section 7.4 : Les 5 catégories de critères d'acceptation */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="tag" className="w-5 h-5 text-indigo-600 shrink-0" /> 2. Les 5 Catégories de Critères d'Acceptation</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour évaluer exhaustivement un livrable, structurez les critères selon ces cinq axes :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">1. Critères Fonctionnels</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Vérifient le comportement métier : l'utilisateur peut sélectionner un statut parmi les 3 valeurs autorisées, la mise à jour s'affiche dans l'UI, les compteurs s'ajustent.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">2. Critères Techniques</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Vérifient la conformité d'implémentation : utilisation stricte de TypeScript sans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">any</code>, méthode HTTP PATCH respectée, persistance en mémoire conforme.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-purple-700 dark:text-purple-400">3. Critères de Qualité & Robustesse</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Vérifient la gestion des cas limites et erreurs : requête invalide rejetée avec HTTP 400, identifiant inexistant retournant HTTP 404, aucune régression sur les autres routes.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-amber-700 dark:text-amber-400">4. Critères de Test</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Vérifient la couverture de tests : tests automatisés exécutés sous Vitest avec succès, vérification des cas passants et non passants avec Supertest.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-indigo-700 dark:text-indigo-400">5. Critères Documentaires</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Vérifient la traçabilité : documentation de la nouvelle route dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">api-contracts.md</code>, rapport de revue rédigé dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">reports/reviews/</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire de Recette &bull; Preuves de Conformité
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur d'Audit des Critères d'Acceptation TaskFlow
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Distinguez un critère <strong>Satisfait</strong> (avec preuve), <strong>Non satisfait</strong> (anomalie prouvée) et <strong>Non vérifié</strong> (affirmation sans test).
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Critère d'acceptation audité :</span>
          {(Object.keys(criteriaData) as Array<keyof typeof criteriaData>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCriterion(key)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                activeCriterion === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {criteriaData[key].id} — {criteriaData[key].title}
            </button>
          ))}
        </div>

        {/* Diagnostic du critère */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Énoncé du critère :</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentCriterion.statusClass} shrink-0`}>
              {currentCriterion.status}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
            {currentCriterion.statement}
          </p>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Audit de Preuve Observée :
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              {currentCriterion.proof}
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
            Quiz de validation du Chapitre 7
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Vérifiez que vous savez formuler des critères précis, associer des méthodes de vérification et évaluer objectivement les preuves.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "À quoi sert principalement un critère d'acceptation ?",
              options: [
                "À définir une condition permettant de vérifier qu'un résultat est acceptable.",
                "À attribuer automatiquement une mission à un agent.",
                "À remplacer la description du projet.",
                "À déterminer la durée exacte de chaque mission."
              ],
              correctIndex: 0,
              explanation: "Un critère d'acceptation décrit une condition précise permettant de déterminer objectivement si un livrable satisfait les attentes."
            },
            {
              id: 2,
              question: "Quelle formulation constitue un critère d'acceptation précis ?",
              options: [
                "L'API doit être performante.",
                "L'API doit être agréable à utiliser.",
                "Une requête valide retourne une réponse HTTP 201 contenant la tâche créée.",
                "L'API doit être moderne."
              ],
              correctIndex: 2,
              explanation: "Cette formulation précise un comportement observable, une requête valide et une réponse HTTP 201 vérifiable par un test."
            },
            {
              id: 3,
              question: "Quelle est la différence entre un objectif et un critère d'acceptation ?",
              options: [
                "L'objectif décrit le résultat recherché, tandis que le critère précise une condition vérifiable.",
                "L'objectif décrit uniquement le code, tandis que le critère décrit uniquement l'interface.",
                "Les deux notions désignent exactement la même chose.",
                "Le critère d'acceptation remplace toujours l'objectif."
              ],
              correctIndex: 0,
              explanation: "L'objectif exprime la finalité que l'on vise. Le critère d'acceptation fixe la condition précise pour mesurer si l'objectif est atteint."
            },
            {
              id: 4,
              question: "Quel élément constitue un critère fonctionnel pour TaskFlow ?",
              options: [
                "Le projet utilise TypeScript.",
                "Une tâche peut être supprimée.",
                "Le code respecte une convention de nommage.",
                "Les tests sont exécutés avec Vitest."
              ],
              correctIndex: 1,
              explanation: "La suppression d'une tâche est une capacité fonctionnelle proposée à l'utilisateur."
            },
            {
              id: 5,
              question: "Quelle méthode permet de vérifier qu'une API rejette un titre vide ?",
              options: [
                "Examiner uniquement le nom de la route.",
                "Lire uniquement les instructions du Backend.",
                "Envoyer une requête contenant un titre vide et vérifier le résultat.",
                "Vérifier uniquement la structure des dossiers."
              ],
              correctIndex: 2,
              explanation: "L'envoi d'une requête avec une donnée non valide (titre vide) permet de contrôler que l'API renvoie bien une réponse d'erreur 400."
            },
            {
              id: 6,
              question: "Que signifie un critère non vérifié ?",
              options: [
                "Une vérification a démontré que le critère est incorrect.",
                "Aucune preuve suffisante ne permet encore de déterminer s'il est satisfait.",
                "Le critère est automatiquement accepté.",
                "Le critère doit être supprimé."
              ],
              correctIndex: 1,
              explanation: "Un critère est non vérifié lorsqu'aucune exécution de test ou examen de code n'a encore apporté la preuve de son fonctionnement."
            },
            {
              id: 7,
              question: "Pourquoi faut-il associer une méthode de vérification aux critères ?",
              options: [
                "Pour déterminer comment obtenir une preuve de conformité.",
                "Pour augmenter automatiquement le nombre de tests.",
                "Pour éviter de documenter les résultats.",
                "Pour remplacer la responsabilité du QA."
              ],
              correctIndex: 0,
              explanation: "La méthode de vérification explicite la procédure pour obtenir une preuve tangible et indiscutable de conformité."
            },
            {
              id: 8,
              question: "Une mission satisfait ses critères techniques, mais nécessite une approbation humaine. Que faut-il faire ?",
              options: [
                "Considérer automatiquement la décision humaine comme inutile.",
                "Demander à l'agent de valider lui-même la décision.",
                "Respecter la procédure de validation humaine prévue.",
                "Supprimer les critères techniques."
              ],
              correctIndex: 2,
              explanation: "La conformité technique ne se substitue pas à la décision du Project Manager humain. La procédure de validation humaine doit être scrupuleusement respectée."
            },
            {
              id: 9,
              question: "Quel est le rôle du Team Leader lorsqu'un critère n'est pas satisfait ?",
              options: [
                "Ignorer le résultat et déclarer la mission terminée.",
                "Identifier le problème et organiser les corrections nécessaires.",
                "Modifier automatiquement le périmètre du projet.",
                "Supprimer les résultats produits par l'agent."
              ],
              correctIndex: 1,
              explanation: "Le Team Leader qualifie l'anomalie, l'attribue à l'agent responsable et replanifie une vérification après correction."
            },
            {
              id: 10,
              question: "Que doit contenir une fiche de mission permettant de vérifier un livrable ?",
              options: [
                "Uniquement le nom de l'agent.",
                "Uniquement une date de fin.",
                "L'objectif, le résultat attendu, les critères d'acceptation et les méthodes de vérification.",
                "Uniquement une description générale du projet."
              ],
              correctIndex: 2,
              explanation: "Ces quatre éléments permettent de cadrer précisément le livrable et d'en assurer la recette objective."
            }
          ]}
        />
      </div>
    </div>
  );
};
