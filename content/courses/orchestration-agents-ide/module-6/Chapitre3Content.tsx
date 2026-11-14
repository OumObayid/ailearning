'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur interactif : Matrice des 4 natures de résultats attendus
  const [activeCategory, setActiveCategory] = useState<'functional' | 'technical' | 'quality' | 'documentary'>('functional');

  const categories = {
    functional: {
      title: "1. Résultats Fonctionnels (Comportement métier visible)",
      definition: "Décrivent les actions concrètes que l'application permet à l'utilisateur de réaliser.",
      taskflowExample: "L'utilisateur peut saisir un titre dans le formulaire et cliquer sur « Ajouter » pour voir sa tâche apparaître instantanément dans la liste avec le statut 'todo'.",
      verification: "Test d'interaction de bout en bout ou vérification visuelle dans l'interface React.",
      badge: "Comportement"
    },
    technical: {
      title: "2. Résultats Techniques (Composants, routes et modèles)",
      definition: "Correspondent aux briques logicielles nécessaires au fonctionnement de l'application.",
      taskflowExample: "Création de la route 'POST /api/tasks' dans backend/src/routes/taskRoutes.ts et implémentation du contrôleur avec persistance dans le store mémoire.",
      verification: "Examen du code source, compilation TypeScript 'tsc --noEmit' sans erreur et requêtes HTTP testées avec Supertest.",
      badge: "Implémentation"
    },
    quality: {
      title: "3. Résultats Qualité (Robustesse, typage et tests)",
      definition: "Garantissent que le livrable répond aux exigences de rigueur, de sécurité et de maintenabilité.",
      taskflowExample: "Rejet d'une requête sans titre avec HTTP 400 Bad Request, typage strict 'Task' sans 'any', et suite de 5 tests unitaires Vitest au vert.",
      verification: "Exécution de la suite de tests automatisés 'npm test' et audit de couverture.",
      badge: "Robustesse"
    },
    documentary: {
      title: "4. Résultats Documentaires (Traçabilité et contrats)",
      definition: "Assurent le partage d'informations indispensables à la collaboration entre les agents.",
      taskflowExample: "Documentation de la spécification de la route dans docs/architecture/api-contracts.md précisant le format JSON de payload et les codes HTTP.",
      verification: "Revue de la documentation par le Reviewer et validation par l'Architect.",
      badge: "Traçabilité"
    }
  };

  const activeCategoryData = categories[activeCategory];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 6 &bull; Chapitre 3
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Livrables, Spécifications & Vérifiabilité
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          6.3 — Définir les objectifs et les résultats attendus
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Après avoir décomposé le projet en tâches, il est indispensable de préciser ce que chaque tâche doit permettre d'obtenir. Une tâche décrit une activité ; l'objectif exprime la finalité recherchée, tandis que le résultat attendu décrit les artefacts tangibles et vérifiables que l'agent doit produire. Découvrez comment définir des livrables sans ambiguïté.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle de vérification objective :</p>
        <p>
          Ne considérez jamais une tâche comme terminée sur la seule déclaration d'un agent IA affirmant « J'ai terminé ». Exigez des <strong>résultats observables et testables</strong> (code source, tests au vert, rapport d'exécution). Rappel absolu : <strong>aucun agent n'est autorisé à exécuter un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> sans validation humaine écrite</strong>.
        </p>
      </Callout>

      {/* Section 3.1 : Objectif vs Résultat attendu */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="crosshair" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Distinguer l'Objectif du Résultat Attendu</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Bien que complémentaires, ces deux concepts répondent à des questions différentes :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. L'Objectif : « Pourquoi réaliser cette tâche ? »</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-mono shrink-0">Intention</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              « Permettre à l'utilisateur d'enregistrer une nouvelle tâche par une requête HTTP. » &rarr; Exprime la finalité fonctionnelle sans préjuger de l'implémentation détaillée.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Le Résultat Attendu : « Que doit-on livrer concrètement ? »</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-mono shrink-0">Production concrète</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Une route Express opérationnelle (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">POST /api/tasks</code>), une validation de schéma Zod, l'enregistrement en mémoire avec statut initial 'todo', une réponse HTTP 201 en JSON et des tests d'intégration Vitest.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif : Les 4 natures de résultats */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire de Spécification &bull; Team Leader Workbench
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Les 4 Natures de Résultats Attendus dans TaskFlow
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Sélectionnez une catégorie pour découvrir sa définition, son exemple concret dans TaskFlow et ses méthodes de vérification.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Catégorie de résultat :</span>
          {(Object.keys(categories) as Array<keyof typeof categories>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                activeCategory === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {categories[key].title}
            </button>
          ))}
        </div>

        {/* Détail du résultat */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Nature :</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 shrink-0">
              {activeCategoryData.badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
            {activeCategoryData.definition}
          </p>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Exemple TaskFlow :</span>
            <p className="text-xs sm:text-sm italic font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-normal break-words [overflow-wrap:anywhere]">
              {activeCategoryData.taskflowExample}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <strong>Moyen de vérification :</strong> {activeCategoryData.verification}
          </div>
        </div>
      </div>

      {/* Section 3.7 : Adapter les résultats attendus au rôle */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="users" className="w-5 h-5 text-purple-600 shrink-0" /> 2. Adapter les Résultats Attendus au Domaine de Responsabilité</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Chaque agent expert produit des artefacts spécifiques à son périmètre :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">Architect</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Livrables : Schéma d'architecture, contrat technique d'API (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">api-contracts.md</code>), interfaces TypeScript communes. Ne livre aucun composant React ni de contrôleur Express.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">Backend</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Livrables : Routes Express, validateurs de schéma, store en mémoire, tests d'intégration avec Supertest. Ne modifie aucun fichier de l'interface utilisateur.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-purple-700 dark:text-purple-400">Frontend</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Livrables : Composants React avec classes Tailwind, appels fetch conformes au contrat, gestion des états (loading, error, success).
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-amber-700 dark:text-amber-400">QA (Quality Assurance)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Livrables : Scénarios de test aux limites, suites de tests automatisés, rapports d'anomalies (bug reports) documentés avec étapes de reproduction.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-rose-700 dark:text-rose-400">Reviewer</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Livrables : Compte rendu de revue de code indépendant, identification des risques de sécurité ou de typage, recommandations sans modification directe du code.
            </p>
          </div>
        </div>
      </div>

      {/* Fiche modèle : T4 TaskFlow */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="document-check" className="w-5 h-5 text-emerald-600 shrink-0" /> 3. Modèle de Fiche Objectif & Résultats Attendus (Tâche T4)</h2>
        <div className="p-4 rounded-xl font-mono text-xs md:text-sm bg-slate-900 text-slate-100 max-w-full min-w-0">
          <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
{`## Fiche de Spécification de Tâche : T4
- Identifiant : T4
- Intitulé : Développer l'API REST de création d'une tâche
- Domaine : Backend (Agent Backend)
- Objectif : Permettre la création d'une tâche par une requête HTTP POST.
- Résultats attendus :
  1. Route Express POST /api/tasks disponible et typée.
  2. Validation du titre obligatoire (rejet HTTP 400 si vide).
  3. Attribution d'un identifiant unique (UUID ou incrémentiel) et statut initial 'todo'.
  4. Enregistrement dans le store mémoire avec retour HTTP 201 en JSON.
  5. Tests unitaires et d'intégration validés sous Vitest.
- Périmètre : backend/src/controllers/ et backend/src/routes/.
- Hors périmètre : Interface React, persistance SQL, authentification.`}
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
            Quiz de validation du Chapitre 3
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre maîtrise de la formulation d'objectifs précis, des résultats vérifiables et de l'adaptation au rôle des agents.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la différence entre un objectif et un résultat attendu ?",
              options: [
                "L'objectif indique le résultat recherché, tandis que le résultat attendu précise ce qui doit être produit.",
                "L'objectif désigne un fichier, tandis que le résultat attendu désigne un agent.",
                "Les deux expressions désignent exactement la même chose.",
                "L'objectif concerne uniquement les tests."
              ],
              correctIndex: 0,
              explanation: "L'objectif exprime la finalité que l'on cherche à accomplir. Le résultat attendu précise les productions concrètes nécessaires pour atteindre cet objectif."
            },
            {
              id: 2,
              question: "Quel exemple correspond à un objectif fonctionnel ?",
              options: [
                "Créer un fichier TypeScript.",
                "Permettre à l'utilisateur de modifier une tâche.",
                "Ajouter une dépendance au projet.",
                "Écrire un test unitaire."
              ],
              correctIndex: 1,
              explanation: "Permettre à l'utilisateur de modifier une tâche décrit un comportement attendu de l'application vis-à-vis du métier."
            },
            {
              id: 3,
              question: "Lequel constitue un résultat technique attendu pour le Backend ?",
              options: [
                "Une interface de navigation.",
                "Un composant React.",
                "Une route Express de création d'une tâche.",
                "Une maquette graphique."
              ],
              correctIndex: 2,
              explanation: "Une route Express appartient au backend et constitue un artefact technique serveur."
            },
            {
              id: 4,
              question: "Pourquoi faut-il préciser le périmètre d'une tâche ?",
              options: [
                "Pour autoriser l'agent à modifier tout le projet.",
                "Pour éviter les travaux hors sujet et les modifications non demandées.",
                "Pour supprimer les résultats attendus.",
                "Pour remplacer les instructions générales du projet."
              ],
              correctIndex: 1,
              explanation: "Le périmètre délimite le travail demandé afin d'éviter qu'un agent n'ajoute spontanément du code non prévu ou n'empiète sur un autre domaine."
            },
            {
              id: 5,
              question: "Quel résultat attendu est le plus concret pour une tâche de création ?",
              options: [
                "Le système doit être amélioré.",
                "Le code doit être satisfaisant.",
                "Une tâche est créée, enregistrée en mémoire et retournée dans la réponse HTTP.",
                "Le backend doit être optimisé."
              ],
              correctIndex: 2,
              explanation: "Cette formulation décrit des éléments concrets, observables et testables : création, enregistrement en mémoire et réponse HTTP."
            },
            {
              id: 6,
              question: "Quel élément permet de vérifier qu'un résultat a été obtenu ?",
              options: [
                "Une affirmation de l'agent sans élément observable.",
                "Un moyen de vérification adapté, comme l'examen du code ou l'exécution de tests.",
                "Le nombre de conversations de l'agent.",
                "La durée de génération du code."
              ],
              correctIndex: 1,
              explanation: "L'examen du code source, l'audit de tests automatisés et les preuves observables permettent de contrôler objectivement les livrables."
            },
            {
              id: 7,
              question: "À quel domaine appartient principalement la création d'un composant React ?",
              options: [
                "Backend.",
                "Frontend.",
                "Gestion Git.",
                "Architecture réseau."
              ],
              correctIndex: 1,
              explanation: "React sert à construire l'interface utilisateur interactive, relevant du domaine exclusif du Frontend."
            },
            {
              id: 8,
              question: "Quel résultat correspond principalement au travail d'un agent QA ?",
              options: [
                "Une route Express de création.",
                "Un formulaire React.",
                "Des tests et un compte rendu des anomalies identifiées.",
                "Une décision sur l'organisation des dossiers."
              ],
              correctIndex: 2,
              explanation: "L'agent QA est garant de l'assurance qualité : ses productions consistent en des scénarios de tests, leur exécution et des rapports d'anomalies."
            },
            {
              id: 9,
              question: "Pourquoi faut-il adapter les résultats attendus au rôle de chaque agent ?",
              options: [
                "Pour respecter les responsabilités et les limites de chaque intervenant.",
                "Pour permettre à tous les agents de modifier tous les fichiers.",
                "Pour éviter de définir des objectifs.",
                "Pour supprimer la coordination."
              ],
              correctIndex: 0,
              explanation: "Chaque agent possède un profil et un périmètre de responsabilité. Adapter les livrables garantit une architecture saine et prévisible."
            },
            {
              id: 10,
              question: "Les critères d'acceptation et les résultats attendus sont-ils identiques ?",
              options: [
                "Oui, ils désignent toujours exactement les mêmes éléments.",
                "Non, les résultats attendus décrivent les productions à obtenir, tandis que les critères d'acceptation définissent les conditions permettant de les accepter.",
                "Oui, ils concernent uniquement le code source.",
                "Non, les résultats attendus ne peuvent jamais être vérifiés."
              ],
              correctIndex: 1,
              explanation: "Les résultats attendus décrivent ce qui doit être produit (l'artefact). Les critères d'acceptation précisent les conditions qualitatives et normatives pour valider cet artefact."
            }
          ]}
        />
      </div>
    </div>
  );
};
