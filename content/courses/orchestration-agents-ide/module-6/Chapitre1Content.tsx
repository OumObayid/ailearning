'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  // Simulateur interactif : Banc d'Analyse et de Tri du Besoin Logiciel
  const [selectedCase, setSelectedCase] = useState<'create_task' | 'auth_request' | 'clear_errors' | 'database_request'>('create_task');

  const cases = {
    create_task: {
      userPhrase: "« Je veux pouvoir créer une nouvelle tâche avec un titre et la retrouver dans ma liste. »",
      nature: "Besoin Fonctionnel (Inclus dans le périmètre)",
      triType: "DEMANDE CONVERGENTE AVEC LE BESOIN",
      statutInfo: "Confirmée",
      action: "Retenir dans le cahier des charges initial de TaskFlow. Définir le statut initial par défaut ('todo') et la validation du titre obligatoire."
    },
    auth_request: {
      userPhrase: "« Est-ce qu'on peut ajouter un écran de connexion avec mot de passe et gestion de profils ? »",
      nature: "Besoin Hors Périmètre Initial",
      triType: "DEMANDE D'EXTENSION TECHNIQUE",
      statutInfo: "Hors périmètre",
      action: "Écarter du périmètre v1 de TaskFlow. Signaler au Project Manager humain. Les agents ne doivent pas développer d'authentification sans arbitrage écrit."
    },
    clear_errors: {
      userPhrase: "« Si je clique sur valider sans mettre de titre, je veux un message rouge clair au lieu d'un écran blanc ou d'un crash. »",
      nature: "Besoin Non Fonctionnel (Qualité & Ergonomie)",
      triType: "EXIGENCE DE ROBUSTESSE & RETOUR UTILISATEUR",
      statutInfo: "Confirmée",
      action: "Intégrer comme contrainte non fonctionnelle. L'API doit retourner HTTP 400 Bad Request et l'interface React doit afficher un message d'erreur explicite."
    },
    database_request: {
      userPhrase: "« Je veux sauvegarder mes tâches dans PostgreSQL ou MongoDB pour qu'elles restent pour toujours. »",
      nature: "Solution Technique Hors Contrainte",
      triType: "CONFUSION BESOIN / SOLUTION TECHNIQUE",
      statutInfo: "Contrainte violée",
      action: "Refuser la base externe. La contrainte technique arrêtée pour TaskFlow est le stockage en mémoire. Le besoin de persistance est noté pour une future version."
    }
  };

  const activeCaseData = cases[selectedCase];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 6 &bull; Chapitre 1
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Cadrage & Spécification Préalable
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          6.1 — Analyser un besoin logiciel
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Avant de confier une mission à un agent IA, il est indispensable de comprendre le problème à résoudre. Une demande formulée par un utilisateur n'est pas une spécification technique : elle est souvent incomplète, floue ou mêlée d'idées de solutions prématurées. Le rôle du Team Leader est d'analyser cette demande, de dégager le besoin réel, de fixer le périmètre et de lever toute ambiguïté avant d'engager l'équipe d'agents.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle fondamentale d'orchestration :</p>
        <p>
          Ne distribuez jamais de mission à partir d'une demande mal comprise ou d'une intuition non vérifiée. L'agent IA exécutera à la lettre ce qu'il interprète, ce qui risque d'engendrer du code inutile, des conflits d'architecture ou des régressions. De plus, <strong>aucun agent ne doit réaliser de <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans autorisation explicite du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1.1 : Demande, Besoin et Solution */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="light-bulb" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Distinguer la Demande, le Besoin et la Solution</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour cadrer efficacement le travail des agents IA, il est essentiel de différencier ces trois niveaux d'abstraction :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. La Demande (Ce que l'utilisateur exprime)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-mono shrink-0">Expression brute</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              « Je veux mieux suivre mes tâches et savoir ce qui est terminé. » &rarr; C'est l'énoncé informel de l'utilisateur. Il ne décrit pas les règles métiers, les champs ni les flux techniques.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Le Besoin (Le problème ou résultat à satisfaire)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-mono shrink-0">Problème réel</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              « Disposer d'un état d'avancement clair pour chaque tâche (à faire, en cours, terminée) et pouvoir filtrer la liste. » &rarr; C'est l'objectif fonctionnel indépendant de toute implémentation particulière.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. La Solution (La réponse logicielle concrète)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 font-mono shrink-0">Implémentation</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Une application web avec une API REST Express, des composants React modulaires, un stockage en mémoire typé en TypeScript et des compteurs réactifs.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1.4 : Besoins fonctionnels vs non fonctionnels */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="adjustments-horizontal" className="w-5 h-5 text-indigo-600 shrink-0" /> 2. Besoins Fonctionnels vs Besoins Non Fonctionnels</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Un projet réussi ne se limite pas à cocher des fonctionnalités : il doit respecter des critères de qualité rigoureux.
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-bold text-sm text-emerald-800 dark:text-emerald-300">Besoins Fonctionnels : « Que doit faire le logiciel ? »</span>
            <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              Exemples TaskFlow : Créer une tâche avec un titre obligatoire, lister les tâches enregistrées, modifier un statut existant, supprimer une tâche, compter les tâches par statut.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50/50 dark:bg-blue-950/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-bold text-sm text-blue-800 dark:text-blue-300">Besoins Non Fonctionnels : « Comment le logiciel doit-il fonctionner ? »</span>
            <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              Exemples TaskFlow : Présenter clairement les erreurs de saisie à l'utilisateur, garantir la maintenabilité avec un typage strict TypeScript sans <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">any</code>, structurer des échanges REST prévisibles, assurer la testabilité avec Vitest.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1.5 & 1.7 : Contraintes et Périmètre (Inclus vs Hors Périmètre) */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="shield-check" className="w-5 h-5 text-rose-600 shrink-0" /> 3. Contraintes et Délimitation Stricte du Périmètre</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Délimiter le périmètre évite que les agents n'ajoutent spontanément du code superflu ou des dépendances non prévues :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Icon name="check-circle" className="w-4 h-4 shrink-0" />
              Périmètre Initial Inclus (TaskFlow v1)
            </span>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
              <li>Création, affichage, modification et suppression de tâches.</li>
              <li>Changement de statut parmi les 3 valeurs autorisées : <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">todo</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">in_progress</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">done</code>.</li>
              <li>Calcul dynamique du nombre de tâches par statut.</li>
              <li>Stockage en mémoire avec interface typée.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <Icon name="x-circle" className="w-4 h-4 shrink-0" />
              Éléments Hors Périmètre (Exclus sans arbitrage PM)
            </span>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
              <li>Authentification et comptes utilisateurs.</li>
              <li>Base de données externe (SQL / NoSQL).</li>
              <li>Notifications en temps réel et websockets.</li>
              <li>Partage de tâches collaboratif entre comptes distincts.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Atelier Interactif &bull; Cadrage du Team Leader
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Banc d'Analyse et de Tri du Besoin Logiciel
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Sélectionnez une demande formulée par un utilisateur et découvrez comment le Team Leader doit la qualifier avant d'envisager toute mission.
          </p>
        </div>

        {/* Sélection des cas */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Demande utilisateur reçue :</span>
          {(Object.keys(cases) as Array<keyof typeof cases>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCase(key)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                selectedCase === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {cases[key].userPhrase}
            </button>
          ))}
        </div>

        {/* Détails de la qualification */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Nature de l'exigence :</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 shrink-0">
              {activeCaseData.nature}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Typage d'analyse :</span>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
              {activeCaseData.triType}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Décision & Action du Team Leader :
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              {activeCaseData.action}
            </p>
          </div>
        </div>
      </div>

      {/* Fiche de Synthèse TaskFlow */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="document-text" className="w-5 h-5 text-emerald-600 shrink-0" /> 4. Fiche de Synthèse du Besoin TaskFlow</h2>
        <div className="p-4 rounded-xl font-mono text-xs md:text-sm bg-slate-900 text-slate-100 max-w-full min-w-0">
          <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
{`## Fiche de Synthèse : TaskFlow v1
- Problème : Manque de visibilité centralisée sur les tâches quotidiennes et leur état.
- Utilisateur cible : Développeur ou collaborateur individuel.
- Besoins fonctionnels : Créer, Lister, Modifier, Supprimer, Changer statut, Compter par statut.
- Besoins non fonctionnels : Ergonomie réactive, gestion d'erreur 400/404 propre, robustesse des tests.
- Contraintes techniques : React/Vite/TS (Frontend), Node/Express/TS (Backend), REST, Stockage mémoire.
- Hors périmètre : Pas d'auth, pas de base de données, pas de websockets.
- Gouvernance Git : AUCUN merge/push sans l'accord explicite du PM humain.`}
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
            Quiz de validation du Chapitre 1
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre maîtrise de l'analyse du besoin, du périmètre et de la distinction fonctionnel/non-fonctionnel.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la première étape avant de confier une mission à un agent ?",
              options: [
                "Choisir immédiatement l'agent le plus compétent.",
                "Comprendre et analyser le besoin.",
                "Rédiger directement le prompt technique.",
                "Créer une branche Git."
              ],
              correctIndex: 1,
              explanation: "Il faut d'abord comprendre le besoin. Distribuer une mission sans avoir identifié le problème à résoudre risque de produire un travail inutile ou incorrect."
            },
            {
              id: 2,
              question: "Quelle différence existe entre une demande et un besoin ?",
              options: [
                "La demande exprime une attente, tandis que le besoin décrit le problème ou le résultat à satisfaire.",
                "La demande est toujours technique, tandis que le besoin est toujours fonctionnel.",
                "Le besoin correspond uniquement à une solution technique.",
                "Les deux notions sont strictement identiques."
              ],
              correctIndex: 0,
              explanation: "La demande correspond à ce que l'utilisateur exprime. Le besoin représente le problème ou le résultat auquel le logiciel doit répondre."
            },
            {
              id: 3,
              question: "Laquelle de ces propositions correspond à un besoin fonctionnel de TaskFlow ?",
              options: [
                "Le code doit être maintenable.",
                "Les erreurs doivent être clairement affichées.",
                "L'application doit permettre de supprimer une tâche.",
                "Le projet doit utiliser TypeScript."
              ],
              correctIndex: 2,
              explanation: "La suppression d'une tâche correspond à un comportement que l'application doit proposer. C'est donc un besoin fonctionnel."
            },
            {
              id: 4,
              question: "Laquelle de ces propositions correspond à un besoin non fonctionnel ?",
              options: [
                "Créer une tâche.",
                "Modifier le statut d'une tâche.",
                "Afficher la liste des tâches.",
                "Présenter clairement les erreurs à l'utilisateur."
              ],
              correctIndex: 3,
              explanation: "La présentation claire des erreurs concerne la qualité d'utilisation et la robustesse de l'application. Il s'agit d'une exigence non fonctionnelle."
            },
            {
              id: 5,
              question: "Pourquoi faut-il identifier les utilisateurs concernés ?",
              options: [
                "Pour ajouter automatiquement des comptes utilisateurs.",
                "Pour comprendre les personnes qui utiliseront la fonctionnalité et leurs attentes.",
                "Pour déterminer automatiquement les agents à supprimer.",
                "Pour éviter de définir les besoins fonctionnels."
              ],
              correctIndex: 1,
              explanation: "Identifier les utilisateurs permet de comprendre leurs attentes réelles et d'éviter d'inventer des rôles ou des fonctionnalités superflus."
            },
            {
              id: 6,
              question: "Que doit faire le Team Leader lorsqu'une information importante est ambiguë ?",
              options: [
                "Choisir l'interprétation qui lui semble la plus simple.",
                "Laisser chaque agent décider séparément.",
                "Demander une clarification avant de poursuivre sur le point concerné.",
                "Ignorer l'information."
              ],
              correctIndex: 2,
              explanation: "Une ambiguïté importante doit être clarifiée avec le PM humain. L'agent ne doit pas inventer une règle qui pourrait fausser le produit."
            },
            {
              id: 7,
              question: "Quel est le rôle du périmètre d'un besoin ?",
              options: [
                "Définir les éléments inclus et exclus du travail demandé.",
                "Déterminer le nombre exact d'agents du projet.",
                "Définir uniquement les technologies utilisées.",
                "Remplacer les critères d'acceptation."
              ],
              correctIndex: 0,
              explanation: "Le périmètre définit précisément ce qui fait partie du travail et ce qui en est exclu, limitant ainsi les ajouts anarchiques de code."
            },
            {
              id: 8,
              question: "L'authentification n'est pas prévue dans le périmètre initial de TaskFlow. Un agent propose de l'ajouter spontanément. Quelle conduite adopter ?",
              options: [
                "Accepter automatiquement l'ajout.",
                "Ajouter la fonctionnalité uniquement dans le Frontend.",
                "Demander à l'agent de développer cette fonctionnalité sans validation.",
                "Signaler cette proposition et demander une décision avant d'élargir le périmètre."
              ],
              correctIndex: 3,
              explanation: "L'ajout d'authentification élargit le périmètre. Le Project Manager humain doit décider si cette évolution est souhaitée avant tout développement."
            },
            {
              id: 9,
              question: "Quel est le rôle de la synthèse du besoin ?",
              options: [
                "Remplacer toutes les instructions des agents.",
                "Établir une compréhension commune du besoin et de ses contraintes.",
                "Décrire uniquement les commandes Git.",
                "Définir directement tous les fichiers à modifier."
              ],
              correctIndex: 1,
              explanation: "La synthèse rassemble les informations essentielles pour que tous les agents partagent la même vision avant la décomposition en tâches."
            },
            {
              id: 10,
              question: "Le Team Leader doit-il bloquer toute analyse lorsqu'une information secondaire manque ?",
              options: [
                "Oui, toutes les informations doivent être connues avant toute analyse.",
                "Oui, même si l'information n'a aucun impact sur le travail.",
                "Non, il doit distinguer les informations indispensables des précisions secondaires.",
                "Non, il doit laisser les agents inventer les informations manquantes."
              ],
              correctIndex: 2,
              explanation: "Il faut distinguer les informations indispensables des détails secondaires. Seules les incertitudes qui empêchent une analyse fiable doivent suspendre le travail."
            }
          ]}
        />
      </div>
    </div>
  );
};
