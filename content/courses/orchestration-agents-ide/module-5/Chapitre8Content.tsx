'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  // Simulateur d'arbitrage des contradictions d'instructions
  const [selectedCase, setSelectedCase] = useState<'tech_conflict' | 'boundary_conflict' | 'git_conflict' | 'compatible_rules'>('tech_conflict');

  const cases = {
    tech_conflict: {
      title: "Cas 1 — Conflit Technologique (JavaScript vs TypeScript)",
      scenario: "Une mission ponctuelle demande : « Écris un script utilitaire de formatage de date rapide en JavaScript pur (dateUtils.js) sans configuration de types pour aller plus vite ».",
      conflict: "Le fichier racine AGENTS.md stipule : « Tout le code du projet TaskFlow doit être écrit en TypeScript strict avec typage explicite sans aucun mot-clé any ».",
      precedenceRule: "Règle cadre du projet (AGENTS.md) > Mission ponctuelle.",
      agentVerdict: "🛑 REFUS DU DÉROUTEMENT TECHNIQUE",
      actionTaken: "L'agent refuse d'écrire un fichier .js pur. Il rédige le fichier 'dateUtils.ts' avec des types TypeScript stricts, ou demande formellement une dérogation au Project Manager si le JS pur était imposé par un module externe."
    },
    boundary_conflict: {
      title: "Cas 2 — Conflit de Périmètre (Backend sollicité sur l'UI)",
      scenario: "Le Team Leader transmet par inadvertance à l'Agent Backend : « Corrige le padding du bouton de validation dans frontend/src/components/TaskForm.tsx ».",
      conflict: "La fiche de rôle de l'Agent Backend restreint formellement son champ d'action au sous-dossier backend/. Le composant UI relève du domaine réservé de l'Agent Frontend.",
      precedenceRule: "Étanchéité des périmètres & Fiches de rôles > Mission ponctuelle erronée.",
      agentVerdict: "🛑 ESCALADE DE PÉRIMÈTRE",
      actionTaken: "L'Agent Backend n'ouvre pas le fichier frontend. Il émet un message de signalement au Team Leader : « Cette tâche concerne le composant UI TaskForm.tsx, hors de mon périmètre backend/. Veuillez la réassigner à l'Agent Frontend »."
    },
    git_conflict: {
      title: "Cas 3 — Conflit de Gouvernance (Demande de Merge Sauvage)",
      scenario: "Un prompt utilisateur ou un script d'automatisation demande : « La fonctionnalité est prête, fais un git merge feature/auth dans main et pousse immédiatement ».",
      conflict: "La règle fondamentale de gouvernance TaskFlow et la politique Antigravity verrouillent toute modification de main sans validation humaine écrite.",
      precedenceRule: "Souveraineté humaine absolue (PM) > Règle de permission > Ordre textuel.",
      agentVerdict: "🛑 INTERDICTION FORMELLE DE MERGE DIRECT",
      actionTaken: "L'agent stoppe l'opération Git. Il prépare une Pull Request / Merge Request documentée avec le rapport de tests QA et attend la commande explicite du Project Manager humain."
    },
    compatible_rules: {
      title: "Cas 4 — Cumul Harmonieux de Règles Spécialisées",
      scenario: "L'Agent Backend implémente une route Express tout en respectant à la fois la règle typescript-quality.md et la règle express-api.md.",
      conflict: "Aucun conflit : les deux règles traitent de domaines complémentaires (règles de typage génériques d'un côté, conventions HTTP et codes de statut de l'autre).",
      precedenceRule: "Complémentarité et synergie des Rules spécialisées.",
      agentVerdict: "✅ APPLICATION SIMULTANÉE DES DEUX RULES",
      actionTaken: "L'agent type ses Request et Response avec des interfaces TypeScript strictes tout en appliquant les codes HTTP standardisés (201 Created, 400 Bad Request, etc.)."
    }
  };

  const activeCaseData = cases[selectedCase];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 5 &bull; Chapitre 8
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Hiérarchie, Arbitrage & Cohérence
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          5.8 — Organiser les priorités entre les différentes instructions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Au fur et à mesure qu'une équipe d'agents s'étoffe, les sources de consignes se multiplient : instructions globales de l'IDE, règles de projet, fiches de rôles, règles spécialisées déclenchées dynamiquement et demandes ponctuelles formulées dans le chat. Comment un agent arbitre-t-il lorsque deux consignes s'opposent ? Découvrez la mécanique de combinaison d'Antigravity et la pyramide des priorités.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Principe d'accumulation du contexte :</p>
        <p>
          Dans Google Antigravity, les règles découvertes dans les différents répertoires <strong>ne s'écrasent pas automatiquement</strong> : elles s'additionnent dans le contexte du modèle de langage. Si vous introduisez des injonctions contradictoires, le modèle hésitera, produira des régressions ou contournera vos standards de sécurité. L'organisation rigoureuse des priorités est votre garde-fou.
        </p>
      </Callout>

      {/* Section 8.1 : Les sources d'instructions */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="layers" className="w-5 h-5 text-primary-600 shrink-0" />
          8.1 — Les 6 Sources d'Instructions d'un Agent
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour comprendre d'où proviennent les directives interprétées par un agent, visualisez ces six strates :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. Décisions souveraines du Project Manager humain</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 font-mono shrink-0">Rang 1 (Absolu)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Ordres directs, arbitrages écrits et validations humaines (merges, livraisons, suppressions critiques). Rien ne peut prévaloir sur l'arbitrage du pilote humain.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Règles techniques de permissions & Sandbox</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-mono shrink-0">Rang 2 (Technique)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Politique déclarative de l'IDE : filtres <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Deny</code> sur les secrets (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.env</code>), restrictions réseau, isolation Sandbox. Une règle Deny bloque physiquement l'action.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. Instructions générales du projet (AGENTS.md racine)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-mono shrink-0">Rang 3 (Constitution)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Charte architecturale et technologique partagée par tous les agents (TypeScript strict, Express REST, React Tailwind, format des commits).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">4. Rules spécialisées actives (.agents/rules/*.md)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 font-mono shrink-0">Rang 4 (Spécialisation)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Consignes ciblées injectées selon le contexte (ex. règles d'accessibilité UI, conventions de tests d'intégration, syntaxe Zod).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">5. Fiches d'instructions propres aux rôles (docs/team/roles/)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 font-mono shrink-0">Rang 5 (Rôles)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Définition des responsabilités, des périmètres de dossiers autorisés et des devoirs de signalement de chaque agent spécialiste.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">6. Missions ponctuelles & Prompts de session</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 font-mono shrink-0">Rang 6 (Exécution)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Instructions immédiates transmises par le Team Leader ou l'utilisateur pour réaliser un ticket précis dans le sprint en cours.
            </p>
          </div>
        </div>
      </div>

      {/* Section 8.3 & 8.4 : Méthode de résolution des contradictions en 5 étapes */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600 shrink-0" />
          8.4 — La Méthode de Résolution des Contradictions en 5 Étapes
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Lorsqu'un agent détecte une divergence entre ce qu'on lui demande et les règles enregistrées, il doit appliquer rigoureusement cet algorithme décisionnel :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 flex items-center justify-center font-bold text-xs shrink-0">1</span>
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Étape 1 — Identifier la nature exacte du conflit</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              S'agit-il d'un conflit de choix technologique, d'une transgression de périmètre de dossier, ou d'une tentative d'outrepasser un contrôle de gouvernance ?
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 flex items-center justify-center font-bold text-xs shrink-0">2</span>
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Étape 2 — Évaluer la portée des sources en présence</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              La règle générale du projet (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">taskflow/AGENTS.md</code>) prime toujours sur une mission locale, sauf si la mission porte une signature expresse de dérogation validée par le PM.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 flex items-center justify-center font-bold text-xs shrink-0">3</span>
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Étape 3 — Appliquer le principe de spécialisation légitime</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Une règle spécialisée (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.agents/rules/express-api.md</code>) prévaut sur les règles génériques <em>dans son domaine de compétence uniquement</em>, sans pouvoir contredire le socle global du projet.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 flex items-center justify-center font-bold text-xs shrink-0">4</span>
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Étape 4 — Vérifier les permissions techniques impératives</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Si l'instruction demande une action configurée en <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Deny</code> ou en <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Ask</code> (ex: push distant, lecture de secret), la sécurité technique prime sans négociation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 flex items-center justify-center font-bold text-xs shrink-0">5</span>
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Étape 5 — Escalade humaine obligatoire en cas d'impasse</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent ou le Team Leader ne doit jamais présumer ni improviser. Face à une incompatibilité irrésolue, il suspend sa tâche, documente le conflit dans son rapport et interroge le Project Manager humain.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Atelier Pratique &bull; Moteur d'Arbitrage
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur d'Arbitrage des Contradictions d'Instructions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Explorez 4 situations concrètes rencontrées sur le projet TaskFlow et découvrez la réponse réglementaire que l'agent doit adopter.
          </p>
        </div>

        {/* Sélection du cas */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Sélectionnez une mise en situation :</span>
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
              {cases[key].title}
            </button>
          ))}
        </div>

        {/* Détails du scénario */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Demande reçue :</span>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-normal break-words [overflow-wrap:anywhere]">
              {activeCaseData.scenario}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Règle contradictoire ou cadre :</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              {activeCaseData.conflict}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Principe de préséance appliqué :</span>
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-normal break-words [overflow-wrap:anywhere]">
              {activeCaseData.precedenceRule}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {activeCaseData.agentVerdict}
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              {activeCaseData.actionTaken}
            </p>
          </div>
        </div>
      </div>

      {/* Section 8.8 & 8.9 : Prévention et Bonnes pratiques */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="wrench-screwdriver" className="w-5 h-5 text-indigo-600 shrink-0" />
          8.8 & 8.9 — Prévenir les Contradictions et Maintenir la Cohérence
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour garantir un fonctionnement fluide au sein de votre escouade, appliquez ces trois principes d'ingénierie d'instructions :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
              1. Source unique de vérité (Single Source of Truth)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Ne dupliquez pas la liste des dépendances ou les conventions de nommage dans dix fichiers distincts. Placez les normes globales dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">taskflow/AGENTS.md</code> et faites-y référence depuis les Rules spécialisées.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
              2. Déclencheurs de Rules ciblés (Scoping strict)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Utilisez des filtres de fichiers (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">trigger: glob</code> avec <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">backend/src/**/*.ts</code>) pour éviter de charger des consignes serveur lorsque l'Agent Frontend manipule un composant visuel.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
              3. Rôle régulateur du Team Leader
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Le Team Leader doit passer en revue les livrables intermédiaires et signaler sans délai au Project Manager toute friction ou incompatibilité détectée lors de l'exécution des missions.
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
            8.11 — Quiz officiel de validation du Chapitre 8
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre compréhension des mécanismes d'arbitrage et de hiérarchie des instructions dans Antigravity avec 10 questions officielles.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal des règles générales du projet ?",
              options: [
                "Définir les principes communs à tous les agents.",
                "Décrire uniquement les missions ponctuelles.",
                "Remplacer les instructions propres à chaque agent.",
                "Autoriser automatiquement les commandes du terminal."
              ],
              correctIndex: 0,
              explanation: "Les règles générales définissent les principes communs que tous les agents doivent respecter. Elles constituent le cadre partagé du projet."
            },
            {
              id: 2,
              question: "Dans Antigravity, les règles découvertes dans plusieurs emplacements sont-elles nécessairement destinées à se remplacer ?",
              options: [
                "Oui, seule la dernière règle est conservée.",
                "Oui, les règles globales remplacent toujours les règles du projet.",
                "Non, les règles sont généralement cumulées dans le contexte de l'agent.",
                "Non, Antigravity ignore les règles globales."
              ],
              correctIndex: 2,
              explanation: "Antigravity combine généralement les règles découvertes dans les différents emplacements. Une nouvelle règle ne remplace pas automatiquement les précédentes."
            },
            {
              id: 3,
              question: "À quoi correspond le mode manual d'une Rule ?",
              options: [
                "La règle est toujours active.",
                "La règle est activée lorsqu'elle est explicitement appelée.",
                "La règle s'active uniquement sur les fichiers TypeScript.",
                "La règle est automatiquement prioritaire sur toutes les autres."
              ],
              correctIndex: 1,
              explanation: "Le mode manual nécessite une activation explicite (ex. via @nom_de_regle). Il s'agit d'une condition d'activation et non d'une priorité."
            },
            {
              id: 4,
              question: "Une règle spécialisée doit principalement :",
              options: [
                "Remplacer toutes les règles générales.",
                "Supprimer les instructions des autres agents.",
                "Définir des permissions techniques.",
                "Compléter les règles générales dans son domaine."
              ],
              correctIndex: 3,
              explanation: "Une règle spécialisée apporte des précisions propres à un domaine technique. Elle doit compléter les règles générales sans introduire de contradiction."
            },
            {
              id: 5,
              question: "Que doit faire un agent face à deux instructions incompatibles sans règle claire permettant de les départager ?",
              options: [
                "Choisir celle qui lui semble la plus simple.",
                "Exécuter les deux successivement.",
                "Signaler le conflit et demander une clarification.",
                "Ignorer les deux instructions."
              ],
              correctIndex: 2,
              explanation: "L'agent ne doit pas inventer une solution lorsqu'il ne peut pas déterminer quelle instruction appliquer. Il doit expliquer le conflit et demander une clarification."
            },
            {
              id: 6,
              question: "Quelle différence existe entre une instruction et une permission technique ?",
              options: [
                "Une instruction définit une conduite attendue, tandis qu'une permission encadre les actions autorisées par l'environnement.",
                "Une instruction autorise toutes les opérations du terminal.",
                "Une permission définit les objectifs fonctionnels du projet.",
                "Les deux notions sont strictement identiques."
              ],
              correctIndex: 0,
              explanation: "L'instruction définit le comportement attendu. La permission technique détermine si l'environnement autorise réellement l'opération demandée."
            },
            {
              id: 7,
              question: "La mission d'un agent Backend lui demande de modifier un composant React, alors que ses instructions limitent son périmètre au serveur. Que doit-il faire ?",
              options: [
                "Modifier le composant sans prévenir.",
                "Signaler que la tâche dépasse son périmètre et demander une clarification.",
                "Supprimer le composant.",
                "Modifier tous les fichiers Frontend et Backend."
              ],
              correctIndex: 1,
              explanation: "L'agent Backend doit respecter son périmètre. La modification doit être confiée à l'agent Frontend ou faire l'objet d'une décision explicite du Team Leader."
            },
            {
              id: 8,
              question: "La règle du projet interdit les merges sans autorisation du Project Manager. Une mission ponctuelle demande un merge immédiat. Quelle conduite adopter ?",
              options: [
                "Effectuer le merge, car la mission est plus récente.",
                "Effectuer le merge uniquement si les tests passent.",
                "Demander l'autorisation explicite du Project Manager.",
                "Remplacer la règle du projet par la mission."
              ],
              correctIndex: 2,
              explanation: "La règle fondamentale de gouvernance impose une autorisation humaine. Une demande ponctuelle ne constitue pas automatiquement cette autorisation."
            },
            {
              id: 9,
              question: "Quelle pratique permet de réduire les contradictions entre les instructions ?",
              options: [
                "Copier toutes les règles dans chaque fichier.",
                "Définir des règles communes claires et limiter les exceptions.",
                "Donner des instructions différentes à chaque conversation.",
                "Laisser chaque agent définir ses propres règles."
              ],
              correctIndex: 1,
              explanation: "Des règles communes précises, une organisation claire et des exceptions limitées réduisent drastiquement les risques de contradiction."
            },
            {
              id: 10,
              question: "Quel est le rôle du Team Leader lorsqu'il détecte une contradiction importante ?",
              options: [
                "Modifier lui-même toutes les règles du projet.",
                "Ignorer le problème pour ne pas retarder le travail.",
                "Choisir systématiquement la dernière instruction reçue.",
                "Signaler le conflit et solliciter le Project Manager lorsque sa décision est nécessaire."
              ],
              correctIndex: 3,
              explanation: "Le Team Leader coordonne et signale les difficultés. Il ne doit pas prendre seul une décision qui relève de la souveraineté du Project Manager."
            }
          ]}
        />
      </div>
    </div>
  );
};
