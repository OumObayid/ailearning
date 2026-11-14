'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  // Simulateur interactif : Générateur et Structure des 10 Blocs de Prompt
  const [selectedAgentPrompt, setSelectedAgentPrompt] = useState<'backend' | 'frontend' | 'qa' | 'architect' | 'reviewer'>('backend');

  const prompts = {
    backend: {
      role: "Agent Backend",
      title: "Mission : Développer l'API REST de changement de statut",
      targetFiles: "backend/src/routes/taskRoutes.ts, backend/src/controllers/taskController.ts",
      summary: "Implémenter la route PATCH /api/tasks/:id/status selon le contrat défini, valider le statut parmi les 3 valeurs autorisées et persister en mémoire.",
      limits: "Ne pas toucher au frontend, ne pas installer de base de données, interdiction de git push/merge sans le PM humain."
    },
    frontend: {
      role: "Agent Frontend",
      title: "Mission : Développer le sélecteur de statut dans l'interface React",
      targetFiles: "frontend/src/components/TaskItem.tsx, frontend/src/services/taskService.ts",
      summary: "Créer un contrôle de sélection HTML/Tailwind proposant todo, in_progress, done, appeler l'API PATCH et actualiser l'affichage et les compteurs.",
      limits: "Ne pas modifier le code backend, respecter les conventions de design Tailwind, aucun git push/merge autonome."
    },
    qa: {
      role: "Agent QA",
      title: "Mission : Vérifier les scénarios de transition de statut et cas limites",
      targetFiles: "tests/integration/taskStatus.test.ts, reports/qa-status-report.md",
      summary: "Rédiger et exécuter les tests pour transitions valides, rejets de statuts invalides (400) et identifiants inconnus (404).",
      limits: "Ne pas modifier le code de production pour corriger un bug, consigner les résultats réels observés."
    },
    architect: {
      role: "Agent Architect",
      title: "Mission : Spécifier le contrat REST de changement de statut",
      targetFiles: "docs/architecture/api-contracts.md",
      summary: "Documenter les routes, verbes HTTP, formats JSON de requête et de réponse, énumérations de statut et codes d'erreur.",
      limits: "Ne pas développer le code d'implémentation backend/frontend, soumettre les choix majeurs au PM."
    },
    reviewer: {
      role: "Agent Reviewer",
      title: "Mission : Auditer les modifications de code produites sur la branche",
      targetFiles: "reports/reviews/review-status-feature.md",
      summary: "Examiner la conformité au contrat d'API, le typage strict TypeScript sans 'any', et la qualité des tests.",
      limits: "Ne pas modifier directement le code examiné, émettre un avis consultatif motivé."
    }
  };

  const currentPrompt = prompts[selectedAgentPrompt];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 6 &bull; Chapitre 8
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Ingénierie de Prompt & Délégation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          6.8 — Rédiger un prompt de mission complet
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Le prompt de mission est le vecteur opérationnel qui transmet à l'agent IA les consignes indispensables pour exécuter son travail sans équivoque. Une instruction trop vague engendre des extrapolations risquées ; un prompt structuré en 10 sections précises garantit une exécution chirurgicale, étanche et conforme aux attentes du projet.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Clause obligatoire dans chaque prompt de mission :</p>
        <p>
          Chaque prompt de mission adressé à un agent doit explicitement comporter la clause de gouvernance : <strong>« Interdiction formelle d'exécuter un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code>. Seul le Project Manager humain est souverain pour valider et synchroniser le dépôt distant. »</strong>
        </p>
      </Callout>

      {/* Section 8.3 : L'anatomie des 10 blocs d'un prompt parfait */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="bars-3-bottom-left" className="w-5 h-5 text-primary-600 shrink-0" /> 1. L'Anatomie en 10 Sections d'un Prompt de Mission Idéal</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour ne rien omettre et guider l'agent avec une clarté maximale, structurez vos consignes selon cette architecture standardisée :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">1</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Contexte du Projet</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Rappelle la stack technique, l'état actuel du projet et les documents de référence.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">2</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Rôle de l'Agent</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Confirme l'identité de l'agent (« Tu interviens en tant qu'agent Backend ») pour borner son champ d'action.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">3</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Objectif de la Mission</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">L'intention principale à accomplir formulée en une phrase sans ambiguïté.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">4</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Travail à Réaliser</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Séquence logique des actions précises à entreprendre sur les fichiers du projet.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">5</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Ressources & Dépendances</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Indique le contrat d'interface, les interfaces TypeScript et les fichiers préalables à consulter.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">6</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Contraintes Techniques</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Stack imposée (TypeScript strict, Express REST, React), absence de base externe.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">7</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Résultats Attendus (Livrables)</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Liste exhaustive des fichiers à créer/modifier et des tests automatisés associés.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">8</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Critères d'Acceptation</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Conditions observables pour valider le livrable (codes HTTP, statuts, affichage UI).</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 flex items-center justify-center font-bold text-xs shrink-0">9</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Limites & Autorisations</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Interdictions strictes : ne pas déborder sur un autre dossier, aucun push sans accord PM.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">10</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Compte Rendu Final Attendu</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Format de restitution : fichiers modifiés, tests réellement exécutés, critères vérifiés.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire de Délégation &bull; Dispatching de Prompts
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Générateur de Prompts de Mission par Spécialiste
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Sélectionnez un rôle pour visualiser le calibrage de son prompt de mission opérationnel.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Sélectionnez le destinataire du prompt :</span>
          {(Object.keys(prompts) as Array<keyof typeof prompts>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedAgentPrompt(key)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                selectedAgentPrompt === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {prompts[key].role} — {prompts[key].title}
            </button>
          ))}
        </div>

        {/* Diagnostic du prompt */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Destinataire :</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 shrink-0">
              {currentPrompt.role}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Périmètre de fichiers cibles :</span>
            <p className="text-xs font-mono text-indigo-700 dark:text-indigo-300">
              {currentPrompt.targetFiles}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Synthèse du mandat :</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              {currentPrompt.summary}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 text-xs sm:text-sm text-rose-900 dark:text-rose-200">
            <strong>Limites strictes :</strong> {currentPrompt.limits}
          </div>
        </div>
      </div>

      {/* Exemple complet TaskFlow : Prompt Backend */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="document-text" className="w-5 h-5 text-emerald-600 shrink-0" /> 2. Exemple Complet de Prompt de Mission (Agent Backend)</h2>
        <div className="p-4 rounded-xl font-mono text-xs md:text-sm bg-slate-900 text-slate-100 max-w-full min-w-0">
          <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
{`## Prompt de Mission — Agent Backend

### 1. Contexte
TaskFlow est une application de gestion de tâches développée en Node.js, Express et TypeScript.
Les données sont conservées en mémoire. Le contrat API de changement de statut est disponible dans docs/architecture/api-contracts.md.

### 2. Rôle
Tu interviens en tant qu'agent Backend. Tu es responsable du code serveur dans backend/src/.

### 3. Objectif
Développer la route permettant de modifier le statut d'une tâche existante.

### 4. Travail à réaliser
1. Implémenter la route PATCH /api/tasks/:id/status dans backend/src/routes/taskRoutes.ts.
2. Valider le corps de requête : { "status": "todo" | "in_progress" | "done" }.
3. Si la tâche n'existe pas : retourner HTTP 404 { "error": "Task not found" }.
4. Si le statut est invalide : retourner HTTP 400 { "error": "Invalid status" }.
5. Si valide : mettre à jour la tâche en mémoire et retourner HTTP 200 avec la tâche mise à jour.
6. Écrire les tests d'intégration avec Supertest dans backend/tests/status.test.ts.

### 5. Ressources et dépendances
Contrat REST : docs/architecture/api-contracts.md & Interfaces : shared/types.ts.

### 6. Contraintes
TypeScript strict sans 'any', persistance en mémoire exclusive, pas de dépendance externe.

### 7. Critères d'acceptation
- PATCH avec statut valide retourne HTTP 200 et la tâche actualisée.
- PATCH avec id inexistant retourne HTTP 404.
- PATCH avec statut erroné retourne HTTP 400.
- Les tests backend Vitest s'exécutent avec succès.

### 8. Limites et autorisations
- Interdiction d'intervenir sur frontend/ ou de modifier api-contracts.md.
- Interdiction formelle de git merge, git rebase ou git push sans accord du PM humain.

### 9. Compte rendu final attendu
Indique les fichiers modifiés, la commande exacte exécutée pour lancer les tests, le résultat observé et la liste des critères d'acceptation vérifiés.`}
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
            Quiz de validation du Chapitre 8
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre maîtrise de la rédaction des prompts de mission, de la structure des consignes et du compte rendu final.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal d'un prompt de mission ?",
              options: [
                "Transmettre à un agent un travail structuré avec les informations nécessaires à sa réalisation.",
                "Remplacer toutes les instructions du projet.",
                "Définir automatiquement l'architecture de l'application.",
                "Autoriser toutes les opérations techniques."
              ],
              correctIndex: 0,
              explanation: "Le prompt de mission transforme une tâche préparée en consignes chirurgicales directement exploitables par l'agent IA."
            },
            {
              id: 2,
              question: "Quelle information décrit le travail général que la mission cherche à accomplir ?",
              options: [
                "Le compte rendu final.",
                "L'objectif.",
                "La liste des fichiers modifiés.",
                "La méthode de vérification."
              ],
              correctIndex: 1,
              explanation: "L'objectif résume l'intention fondamentale et la finalité de la mission."
            },
            {
              id: 3,
              question: "Quelle est la différence entre les instructions permanentes et un prompt de mission ?",
              options: [
                "Les instructions permanentes définissent des règles durables, tandis que le prompt décrit un travail ponctuel.",
                "Les instructions permanentes sont toujours facultatives, tandis que le prompt est toujours technique.",
                "Le prompt remplace automatiquement les règles du projet.",
                "Les deux éléments sont toujours identiques."
              ],
              correctIndex: 0,
              explanation: "Les instructions permanentes (AGENTS.md) fixent les règles intangibles du dépôt, tandis que le prompt formule une mission circonscrite."
            },
            {
              id: 4,
              question: "Pourquoi faut-il préciser le rôle de l'agent dans un prompt ?",
              options: [
                "Pour lui permettre de modifier toutes les parties du projet.",
                "Pour éviter de définir des résultats attendus.",
                "Pour rappeler ses responsabilités et limiter les interventions hors périmètre.",
                "Pour remplacer les permissions techniques."
              ],
              correctIndex: 2,
              explanation: "Rappeler le rôle (ex: Agent Backend) borne l'agent à sa sphère d'action et empêche les dérives vers l'interface ou l'architecture."
            },
            {
              id: 5,
              question: "Un agent doit développer une route API. Quelle information est particulièrement importante à lui transmettre ?",
              options: [
                "Le contrat API à respecter.",
                "Les préférences personnelles de tous les utilisateurs.",
                "Le contenu de fonctionnalités hors périmètre.",
                "Les instructions d'un autre projet sans rapport."
              ],
              correctIndex: 0,
              explanation: "Le contrat API fige les verbes HTTP, endpoints, schémas de payload et statuts que le backend doit rigoureusement implémenter."
            },
            {
              id: 6,
              question: "Que doit faire un agent lorsqu'une information indispensable à sa mission manque ?",
              options: [
                "Inventer une règle et poursuivre sans signalement.",
                "Modifier librement le périmètre.",
                "Signaler l'information manquante et demander une clarification si nécessaire.",
                "Déclarer immédiatement la mission terminée."
              ],
              correctIndex: 2,
              explanation: "L'agent ne doit jamais improviser une décision stratégique : il suspend son travail et demande un arbitrage au Team Leader."
            },
            {
              id: 7,
              question: "Pourquoi faut-il inclure des critères d'acceptation dans un prompt ?",
              options: [
                "Pour permettre de vérifier si le résultat répond aux attentes.",
                "Pour imposer une durée fixe à l'agent.",
                "Pour remplacer les tests.",
                "Pour éviter de décrire le travail demandé."
              ],
              correctIndex: 0,
              explanation: "Les critères d'acceptation fournissent à l'agent et au Team Leader le standard objectif d'évaluation pour valider le livrable."
            },
            {
              id: 8,
              question: "Quelle information doit figurer dans le compte rendu final de l'agent ?",
              options: [
                "Uniquement son avis sur la mission.",
                "Les travaux réalisés, les fichiers modifiés et les tests réellement exécutés.",
                "Uniquement la date de début.",
                "Les résultats imaginés pour les tests non exécutés."
              ],
              correctIndex: 1,
              explanation: "Le compte rendu doit contenir des preuves factuelles et auditables : fichiers altérés, commandes exécutées et statuts des tests."
            },
            {
              id: 9,
              question: "Que faut-il faire avant de transmettre un prompt à un agent ?",
              options: [
                "Vérifier que les informations, contraintes et résultats attendus sont suffisamment précis.",
                "Supprimer les critères d'acceptation.",
                "Confier systématiquement la mission à tous les agents.",
                "Ignorer les dépendances."
              ],
              correctIndex: 0,
              explanation: "Le Team Leader doit contrôler que le prompt ne comporte aucune ambiguïté et que toutes les dépendances requises sont prêtes."
            },
            {
              id: 10,
              question: "Une mission est terminée selon l'agent. Que doit faire le Team Leader ?",
              options: [
                "Considérer automatiquement le résultat comme accepté.",
                "Examiner les livrables, les vérifications et les critères d'acceptation.",
                "Effectuer automatiquement un merge.",
                "Supprimer le compte rendu de l'agent."
              ],
              correctIndex: 1,
              explanation: "La parole de l'agent ne constitue pas une preuve : le Team Leader examine les livrables, les rapports de test et la conformité aux critères."
            }
          ]}
        />
      </div>
    </div>
  );
};
