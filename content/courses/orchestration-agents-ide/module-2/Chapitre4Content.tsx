'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  // Simulateur interactif des 5 agents spécialisés
  const [selectedAgent, setSelectedAgent] = useState<'architect' | 'backend' | 'frontend' | 'qa' | 'reviewer'>('backend');

  const specializedAgents = {
    architect: {
      name: "Agent Architect",
      badge: "Conception & Spécifications",
      color: "border-cyan-300 bg-cyan-50/70 text-cyan-950",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
      icon: "cpu",
      mission: "Analyse des besoins techniques, conception de l'architecture générale, modélisation des modèles TypeScript et rédaction des contrats d'API REST.",
      inputs: "Cahier des charges fonctionnel du PM humain, contraintes de pile imposées (Node.js, Express, React, Vite).",
      outputs: "Contrats d'API formels, modèle TypeScript de données (Task), schéma des dossiers et conventions de nommage.",
      tools: "read_file, list_dir, write_file (uniquement sur docs/ et types/), search_files.",
      taskflowExample: "Définit le type Task { id: string; title: string; status: TaskStatus; priority: TaskPriority; createdAt: string } et documente les routes de TaskFlow.",
      limits: "Ne modifie pas les objectifs fonctionnels sans accord PM. Ne modifie pas le code applicatif du backend ou du frontend."
    },
    backend: {
      name: "Agent Backend",
      badge: "Serveur & Logique Métier",
      color: "border-emerald-300 bg-emerald-50/70 text-emerald-950",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      icon: "server",
      mission: "Développement de l'API REST avec Express, implémentation des règles de gestion métier, validation des données d'entrée (Zod) et persistance en mémoire.",
      inputs: "Contrat d'API et types TypeScript fournis par l'Architect, consignes du Team Leader.",
      outputs: "Routes Express, contrôleurs, services de gestion des tâches (TaskService), suites de tests unitaires Vitest côté serveur.",
      tools: "read_file, write_file, edit_file (sur backend/), run_command (npm run test:backend).",
      taskflowExample: "Implémente la route PATCH /api/tasks/:id/status qui met à jour l'état d'une tâche dans le Map en mémoire et renvoie 400 si le statut est invalide.",
      limits: "Doit respecter scrupuleusement le contrat d'API. Ne modifie pas les composants React du frontend. Ne crée pas de base SQL non autorisée."
    },
    frontend: {
      name: "Agent Frontend",
      badge: "Interface Utilisateur & Expérience",
      color: "border-blue-300 bg-blue-50/70 text-blue-950",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      icon: "layout",
      mission: "Développement des vues React 19, création des formulaires interactifs, affichage dynamique des tâches, gestion des états et appels asynchrones à l'API.",
      inputs: "Contrat d'API, endpoints REST, maquette fonctionnelle et consignes du Team Leader.",
      outputs: "Composants React, hooks personnalisés de communication HTTP, interfaces utilisateur Tailwind CSS, tests de composants.",
      tools: "read_file, write_file, edit_file (sur frontend/), run_command (npm run build/test:frontend).",
      taskflowExample: "Crée le composant TaskCard avec sélecteur de statut déroulant et formulaire TaskModal permettant de modifier le titre avec validation côté client.",
      limits: "Ne modifie pas le code du serveur backend. N'invente pas des champs de données absents du contrat d'API."
    },
    qa: {
      name: "Agent QA (Quality Assurance)",
      badge: "Validation & Tests Automatisés",
      color: "border-purple-300 bg-purple-50/70 text-purple-950",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      icon: "check-circle",
      mission: "Préparation des scénarios de test basés sur les exigences, rédaction des tests d'intégration (Supertest) et unitaires (Vitest), injection de cas d'erreur et détection d'anomalies.",
      inputs: "Spécifications fonctionnelles, contrat d'API, code produit par Backend et Frontend.",
      outputs: "Suites de tests automatisés, rapports d'exécution Vitest, fiches d'anomalies détaillées avec étapes de reproduction.",
      tools: "read_file, write_file, edit_file (sur tests/), run_command (npm test, npx vitest run).",
      taskflowExample: "Injecte un titre de plus de 100 caractères ou une chaîne vide pour vérifier que le backend renvoie bien un code HTTP 400 avec message d'erreur explicite.",
      limits: "Ne modifie pas les règles fonctionnelles du projet. Ne corrige pas le code de production lui-même sans mission explicite : il documente et transmet."
    },
    reviewer: {
      name: "Agent Reviewer",
      badge: "Audit de Code & Sécurité",
      color: "border-rose-300 bg-rose-50/70 text-rose-950",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      icon: "shield-check",
      mission: "Inspection minutieuse des modifications de code (diffs), détection des problèmes de lisibilité, fuites mémoire, promesses orphelines, failles de sécurité et conformité aux standards.",
      inputs: "Fichiers modifiés par les agents de développement, directives du projet AGENTS.md, historique Git.",
      outputs: "Rapport d'audit de code, recommandations de refactoring, avis de conformité technique avant examen par le PM.",
      tools: "read_file, git_diff, git_log, search_files.",
      taskflowExample: "Repère qu'un contrôleur Express omet de gérer le cas où une tâche introuvable renvoie undefined au lieu de déclencher un return res.status(404).",
      limits: "Ne modifie pas directement le code sans mission spécifique. Ne remplace pas le QA : son audit est statique et qualitatif, pas dynamique."
    }
  };

  const current = specializedAgents[selectedAgent];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="sparkles" className="w-4 h-4 text-indigo-800" />
            <span>Organisation d&apos;Équipe • Module 2</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 4 — Définir le rôle des agents spécialisés
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Explorer en détail les responsabilités, missions, livrables et limites strictes des cinq profils spécialisés : Architect, Backend, Frontend, QA et Reviewer.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Comprendre le principe d&apos;instructions et de périmètres dédiés</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Maîtriser les livrables et les limites de chaque spécialiste</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Analyser le flux d&apos;interactions sur le cas concret TaskFlow</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : LE PRINCIPE D'UN AGENT SPÉCIALISÉ
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">1</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            4.1 & 4.2 — Comment fonctionne la spécialisation d&apos;un agent ?
          </h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Un agent spécialisé ne requiert pas nécessairement un modèle d&apos;IA différent. Dans Google Antigravity, l&apos;Agent Backend et l&apos;Agent QA peuvent tout à fait s&apos;appuyer sur le même modèle sous-jacent (ex: Gemini 2.5).
        </p>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Ce qui transforme une IA brute en un spécialiste opérationnel, c&apos;est la combinaison de trois éléments fondamentaux :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-2">
          {/* Composant 1 : Instructions */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">1</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Ses instructions système (Rôle & Règles)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Charte
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Définit sa casquette, sa mission prioritaire, ses normes de développement et ses interdits stricts (ex: interdiction formelle pour le Frontend de modifier les contrôleurs backend).
            </p>
          </div>

          {/* Composant 2 : Contexte ciblé */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">2</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Son contexte documentaire dédié
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Matière
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Chaque agent ne reçoit que les spécifications indispensables à son intervention : le contrat d&apos;API pour le Backend, les maquettes pour le Frontend, les cas d&apos;usage pour le QA.
            </p>
          </div>

          {/* Composant 3 : Outillage restreint */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">3</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Ses outils et permissions d&apos;environnement
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Capacités
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              L&apos;Architect n&apos;a besoin que d&apos;éditer des fichiers Markdown et TypeScript dans docs/, tandis que le QA dispose de la commande shell pour lancer Vitest dans le terminal.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : SIMULATEUR DE MATRICE D'EXPERTS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">2</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            4.3 à 4.7 — Fiches complètes des 5 profils spécialisés
          </h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Sélectionnez un agent pour examiner ses missions, ses prérequis, ses livrables et ses limites sur TaskFlow :
        </p>

        {/* Simulateur */}
        <div className="p-5 sm:p-7 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-6">
          <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sélectionnez un expert :</span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(['architect', 'backend', 'frontend', 'qa', 'reviewer'] as const).map((key) => {
                const item = specializedAgents[key];
                const isSelected = selectedAgent === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedAgent(key)}
                    className={`px-3 py-1.5 rounded-xl border-2 text-xs font-black transition cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {item.name.replace('Agent ', '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fiche détaillée */}
          <div className={`p-5 sm:p-6 rounded-2xl border-2 ${current.color} space-y-4 w-full min-w-0 max-w-full`}>
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-current/20">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-white shadow-xs text-indigo-700 shrink-0">
                  <Icon name={current.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-black leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  {current.name}
                </h3>
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${current.badgeColor}`}>
                {current.badge}
              </span>
            </div>

            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Mission principale :</span>
                <p className="text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{current.mission}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Exemple concret sur TaskFlow :</span>
                <p className="text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{current.taskflowExample}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Livrables produits :</span>
                <p className="text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{current.outputs}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Outils autorisés :</span>
                <p className="font-mono text-indigo-900 text-[11px] leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{current.tools}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1">
                <span className="font-bold text-rose-950">Limites strictes :</span>
                <p className="text-rose-900 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{current.limits}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : COMPARAISON & FLUX D'INTERACTIONS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">3</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            4.8 & 4.9 — Tableau comparatif et schéma d&apos;interactions
          </h2>
        </div>

        <div className="overflow-x-auto w-full min-w-0 max-w-full -mx-1 sm:mx-0">
          <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Agent</th>
                <th className="p-3.5">Responsabilité principale</th>
                <th className="p-3.5">Livrable principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
              <tr>
                <td className="p-3.5 font-bold text-cyan-950">Architect</td>
                <td className="p-3.5">Concevoir la structure technique et les contrats</td>
                <td className="p-3.5 text-cyan-700 font-bold">Spécifications & Contrats d&apos;API</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-emerald-950">Backend</td>
                <td className="p-3.5">Développer le serveur Express et la logique métier</td>
                <td className="p-3.5 text-emerald-700 font-bold">Routes API & Tests Vitest</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-blue-950">Frontend</td>
                <td className="p-3.5">Développer l&apos;interface utilisateur React 19</td>
                <td className="p-3.5 text-blue-700 font-bold">Composants React & Formulaires</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-purple-950">QA</td>
                <td className="p-3.5">Vérifier le comportement fonctionnel et dynamique</td>
                <td className="p-3.5 text-purple-700 font-bold">Suites Vitest / Supertest & Anomalies</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-rose-950">Reviewer</td>
                <td className="p-3.5">Auditer la qualité statique, la lisibilité et la sécurité</td>
                <td className="p-3.5 text-rose-700 font-bold">Rapport de revue & Risques techniques</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Exemple répartition : Modifier le titre d'une tâche */}
        <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-200/80">
            <h3 className="text-base sm:text-lg font-bold text-indigo-950">
              Exemple concret TaskFlow : « Modifier le titre d&apos;une tâche »
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-200">
              Cas Réel
            </span>
          </div>

          <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <strong className="text-cyan-950">1. Architect : </strong>
              <span className="text-slate-700 font-medium">Spécifie le payload PATCH /api/tasks/:id avec {"{ title: string }"} et les contraintes de longueur (1 à 100 car.).</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <strong className="text-emerald-950">2. Backend : </strong>
              <span className="text-slate-700 font-medium">Implémente la méthode updateTaskTitle dans TaskService avec gestion des erreurs 404 et 400.</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <strong className="text-blue-950">3. Frontend : </strong>
              <span className="text-slate-700 font-medium">Ajoute le mode d&apos;édition inline du titre dans TaskCard avec sauvegarde sur touche Entrée et bouton Annuler.</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <strong className="text-purple-950">4. QA : </strong>
              <span className="text-slate-700 font-medium">Teste la modification avec un titre valide, teste le rejet avec un titre vide (400), et vérifie la persistance après rafraîchissement.</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <strong className="text-rose-950">5. Reviewer : </strong>
              <span className="text-slate-700 font-medium">Vérifie l&apos;assainissement des données pour éviter les failles XSS dans le rendu React et confirme l&apos;absence de fuite mémoire.</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <strong className="text-indigo-950">6. Team Leader : </strong>
              <span className="text-slate-700 font-medium">Compile les comptes rendus des 5 agents et prépare la note de synthèse globale.</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <strong className="text-amber-950">7. Project Manager : </strong>
              <span className="text-slate-800 font-medium">Examine la démonstration, approuve le livrable et valide formellement l&apos;intégration Git.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>4.12 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          La spécialisation des agents est le moteur de la productivité multi-agents : chaque profil (Architect, Backend, Frontend, QA, Reviewer) se concentre sur son domaine d&apos;excellence avec des outils adaptés. En respectant strictement les contrats d&apos;interface et les périmètres d&apos;écriture de chacun, l&apos;équipe élimine les conflits de code et livre un projet TaskFlow robuste et facile à maintenir.
        </p>
      </section>

      {/* =========================================================================
          SECTION 5 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            4.13 — Quiz de validation des connaissances (10 questions)
          </h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Définir le rôle des agents spécialisés"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal de l'Architect ?",
              options: [
                "Développer exclusivement les composants React",
                "Concevoir l'organisation technique et les contrats d'API du projet",
                "Exécuter uniquement les tests automatisés",
                "Supprimer les fichiers de configuration"
              ],
              correctIndex: 1,
              explanation: "L'Architect analyse les besoins techniques et conçoit une organisation technique cohérente pour le projet."
            },
            {
              id: 2,
              question: "Quel agent développe principalement les routes de l'API REST ?",
              options: [
                "Backend",
                "Reviewer",
                "Frontend",
                "Architect"
              ],
              correctIndex: 0,
              explanation: "Le Backend développe principalement le serveur, la logique métier et les routes de l'API REST."
            },
            {
              id: 3,
              question: "Quel est le rôle de l'agent Frontend ?",
              options: [
                "Définir les objectifs du projet",
                "Examiner uniquement les modifications Git",
                "Développer l'interface utilisateur et les interactions",
                "Configurer la base de données SQL"
              ],
              correctIndex: 2,
              explanation: "Le Frontend développe les composants d'interface React et gère les interactions avec les utilisateurs."
            },
            {
              id: 4,
              question: "Quel agent prépare et exécute les tests dynamiques ?",
              options: [
                "Architect",
                "QA",
                "Team Leader",
                "Reviewer"
              ],
              correctIndex: 1,
              explanation: "Le QA prépare les scénarios de test, exécute les vérifications automatisées et signale les anomalies."
            },
            {
              id: 5,
              question: "Quel est le rôle du Reviewer ?",
              options: [
                "Examiner les modifications et signaler les problèmes de qualité et de sécurité",
                "Remplacer le Project Manager humain",
                "Développer seul toute l'application",
                "Lancer les commandes git push"
              ],
              correctIndex: 0,
              explanation: "Le Reviewer examine les modifications pour identifier les problèmes de lisibilité, de sécurité et de conformité."
            },
            {
              id: 6,
              question: "Pourquoi le Backend et le Frontend doivent-ils respecter le contrat de l'API ?",
              options: [
                "Pour éviter toute communication entre les deux parties",
                "Pour supprimer le besoin d'écrire des tests",
                "Pour garantir la cohérence et l'interopérabilité de leurs échanges",
                "Pour empêcher le PM de voir le code"
              ],
              correctIndex: 2,
              explanation: "Le contrat de l'API définit les règles d'échange communes, garantissant que le frontend et le backend s'intègrent sans heurt."
            },
            {
              id: 7,
              question: "Que doit faire un agent spécialisé lorsqu'il ne dispose pas des informations nécessaires ?",
              options: [
                "Inventer les informations manquantes au hasard",
                "Signaler le problème et demander les précisions nécessaires au Team Leader",
                "Modifier les objectifs du projet unilatéralement",
                "Fermer la session et abandonner la mission"
              ],
              correctIndex: 1,
              explanation: "Un agent doit signaler les données manquantes plutôt que d'émettre des suppositions risquées."
            },
            {
              id: 8,
              question: "Quel est le rôle du Team Leader dans les interactions entre agents ?",
              options: [
                "Coordonner les missions et organiser la transmission des résultats",
                "Remplacer tous les agents spécialisés",
                "Valider seul toutes les décisions importantes",
                "Réécrire le code de chaque agent"
              ],
              correctIndex: 0,
              explanation: "Le Team Leader organise le flux des missions et facilite les passages de relais entre agents spécialisés."
            },
            {
              id: 9,
              question: "Un Reviewer détecte un problème dans le code. Quelle est la meilleure démarche ?",
              options: [
                "Ignorer le problème s'il n'empêche pas la compilation",
                "Modifier automatiquement toutes les fonctionnalités sans en parler",
                "Documenter le problème et transmettre ses observations aux intervenants concernés",
                "Arrêter l'exécution de tout le système"
              ],
              correctIndex: 2,
              explanation: "Le Reviewer doit documenter ses observations et signaler les risques à l'agent concerné et au Team Leader."
            },
            {
              id: 10,
              question: "Pourquoi faut-il définir formellement les responsabilités des agents ?",
              options: [
                "Pour empêcher toute collaboration",
                "Pour clarifier les missions et limiter les chevauchements et conflits de code",
                "Pour supprimer le rôle du Team Leader",
                "Pour ralentir le travail de l'équipe"
              ],
              correctIndex: 1,
              explanation: "Définir les responsabilités évite que deux agents modifient les mêmes fichiers ou se marchent sur les pieds."
            }
          ]}
        />
      </section>
    </div>
  );
};
