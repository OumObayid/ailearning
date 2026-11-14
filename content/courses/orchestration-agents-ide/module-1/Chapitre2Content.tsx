'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';

export const Chapitre2Content: React.FC = () => {
  // Simulateur interactif du cycle de mission d'un Agent IA (Boucle Perception - Décision - Action - Vérification)
  const [currentStep, setCurrentStep] = useState<number>(1);

  const missionCycle = [
    {
      step: 1,
      title: "1. Réception de la mission",
      role: "Prise de consigne",
      icon: "inbox",
      color: "border-blue-400 bg-blue-50/80 text-blue-950",
      action: "L'agent prend connaissance du prompt envoyé par le Project Manager ou le Team Leader :",
      code: "Mission : « Développer la route DELETE /api/tasks/:id dans TaskFlow avec code 204 et gestion d'erreur 404 si ID inconnu. »",
      detail: "L'agent identifie l'objectif cible, les contraintes imposées et les formats de sortie requis."
    },
    {
      step: 2,
      title: "2. Analyse & Exploration",
      role: "Perception & Contexte",
      icon: "search",
      color: "border-emerald-400 bg-emerald-50/80 text-emerald-950",
      action: "L'agent explore le projet pour cartographier les éléments existants sans rien modifier :",
      code: "Outil read_file -> backend/src/controllers/taskController.ts\nOutil read_file -> backend/src/services/taskService.ts\nConstat : Le service possède déjà deleteTask(id: string), il ne manque que la route Express et le contrôleur.",
      detail: "Le modèle analyse le contexte, évite les réinventions inutiles et vérifie les signatures TypeScript."
    },
    {
      step: 3,
      title: "3. Planification",
      role: "Stratégie d'exécution",
      icon: "list-ordered",
      color: "border-amber-400 bg-amber-50/80 text-amber-950",
      action: "L'agent séquence mentalement les sous-tâches avant de modifier les fichiers :",
      code: "Plan d'action :\n1. Ajouter la méthode deleteTask dans taskController.ts\n2. Déclarer router.delete('/:id', deleteTask) dans taskRoutes.ts\n3. Rédiger le test unitaire dans task.test.ts\n4. Lancer les tests Vitest dans le terminal",
      detail: "Découpe la mission en actions élémentaires afin de maintenir le cap et de ne pas se disperser."
    },
    {
      step: 4,
      title: "4. Exécution Outillée",
      role: "Action sur l'environnement",
      icon: "terminal",
      color: "border-indigo-400 bg-indigo-50/80 text-indigo-950",
      action: "L'agent appelle les outils appropriés dans les limites de ses autorisations :",
      code: "Outil edit_file -> Modifie taskController.ts (+12 lignes)\nOutil edit_file -> Modifie taskRoutes.ts (+1 ligne)\nOutil edit_file -> Ajoute le scénario de test 404 & 204 dans task.test.ts",
      detail: "Applique les modifications de code chirurgicalement, en respectant les conventions TypeScript du projet."
    },
    {
      step: 5,
      title: "5. Vérification & Contrôle",
      role: "Auto-évaluation",
      icon: "check-circle",
      color: "border-purple-400 bg-purple-50/80 text-purple-950",
      action: "L'agent auto-teste son travail avec le terminal avant de prétendre avoir terminé :",
      code: "Outil run_command -> npm test -- task.test.ts\n✓ DELETE /api/tasks/:id supprime une tâche existante (204) (18ms)\n✓ DELETE /api/tasks/:id renvoie 404 si la tâche n'existe pas (12ms)\nTests: 2 passed, 2 total",
      detail: "Si un test échoue, l'agent rectifie immédiatement son code au lieu de livrer une régression."
    },
    {
      step: 6,
      title: "6. Compte Rendu",
      role: "Restitution au PM",
      icon: "file-text",
      color: "border-slate-400 bg-slate-50/90 text-slate-950",
      action: "L'agent rédige une synthèse claire des modifications et des résultats obtenus :",
      code: "Rapport de mission :\n• Fichiers modifiés : taskController.ts, taskRoutes.ts, task.test.ts\n• Route DELETE /api/tasks/:id opérationnelle\n• Tests unitaires : 2/2 réussis\n• Statut : Prêt pour relecture par le Reviewer.",
      detail: "La boucle est bouclée. Le Team Leader ou le PM humain peut valider le livrable en toute connaissance de cause."
    }
  ];

  const current = missionCycle[currentStep - 1];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="users" className="w-4 h-4 text-indigo-800" />
            <span>Orchestration Multi-Agents • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 2 — Comprendre ce qu&apos;est un agent IA
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Démystifier le fonctionnement interne d&apos;un agent IA : modèle sous-jacent, instructions, contexte, outillage et décortiquer les 6 étapes de réalisation d&apos;une mission logicielle.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Définir précisément un agent IA</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Maîtriser les 5 piliers de son fonctionnement</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Distinguer action unitaire et mission globale</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : DÉFINITION FORMELLE D'UN AGENT IA
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 1 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Définition : Qu&apos;est-ce qui différencie un agent d&apos;un simple LLM ?</h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Un modèle de langage (LLM comme Gemini ou Claude) est un <strong>générateur de texte probabiliste</strong> : il reçoit un prompt et produit une réponse textuelle en une passe, puis s&apos;arrête.
        </p>
        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          À l&apos;inverse, un <strong>agent IA</strong> est un système complet qui utilise ce modèle comme un « moteur de raisonnement » au sein d&apos;une <strong>boucle perception-décision-action</strong>. L&apos;agent poursuit activement un objectif en explorant son environnement, en appelant des outils et en ajustant sa démarche face aux résultats obtenus.
        </p>

        <div className="p-5 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200 space-y-3">
          <div className="flex items-center gap-2 text-indigo-950 font-bold text-base">
            <Icon name="cpu" className="w-5 h-5 text-indigo-600" />
            <span>Formule conceptuelle de l&apos;Agent IA</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-indigo-200 font-mono text-sm sm:text-sm text-red-950 text-center font-bold">
            Agent IA = Moteur IA (LLM) + Instructions (Rôle) + Contexte (Mémoire) + Outils (Actions) + Orchestration
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            Sans outils, l&apos;agent peut concevoir une solution mais ne peut rien appliquer. Sans contexte, il produit du code hors-sol. Sans instructions, il divague. C&apos;est l&apos;assemblage de ces 5 composants qui lui donne sa capacité opérationnelle.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LES 5 PILIERS DU FONCTIONNEMENT D'UN AGENT
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 2 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Les 5 éléments nécessaires au fonctionnement d&apos;un agent</h2>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Pilier 1 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">1</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Le Modèle d&apos;IA (LLM)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                Moteur Analytique
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le cerveau analytique du système. Il interprète les consignes en langage naturel, décompose la problématique, analyse la syntaxe du code et décide des prochains appels d&apos;outils à effectuer.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
              <strong className="text-slate-900">Application TaskFlow : </strong> Choisir Gemini 2.5 Flash pour les tâches rapides de diagnostic et Gemini Pro pour la conception d&apos;architecture complexe.
            </div>
          </div>

          {/* Pilier 2 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">2</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les Instructions Système (Rôle & Règles)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                Charte de Gouvernance
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              La feuille de route comportementale de l&apos;agent : son rôle spécialisé (ex: Backend, Frontend, QA), son périmètre d&apos;intervention autorisé, les conventions de code et ses interdictions strictes.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
              <strong className="text-slate-900">Application TaskFlow : </strong> Les directives du fichier <code>AGENTS.md</code> interdisant à l&apos;agent Backend de modifier les composants React du frontend.
            </div>
          </div>

          {/* Pilier 3 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">3</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Le Contexte (Mémoire & Documents)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                Matière Première
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              L&apos;ensemble des données injectées dans la fenêtre de tokens à l&apos;instant T : arborescence des dossiers, contenu des fichiers ouverts, historique immédiat et spécifications fonctionnelles.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
              <strong className="text-slate-900">Application TaskFlow : </strong> Les contrats d&apos;interface TypeScript décrivant la structure d&apos;une tâche (id, title, status, priority).
            </div>
          </div>

          {/* Pilier 4 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">4</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les Outils (Tools & Capacités)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                Bras Armé
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Les fonctions exécutables mises à disposition par l&apos;IDE : lire un fichier sur disque, réécrire un bloc de code, lancer une recherche textuelle ou exécuter une commande shell.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
              <strong className="text-slate-900">Application TaskFlow : </strong> L&apos;outil <code>run_command</code> permettant à l&apos;agent QA de lancer <code>npm run test</code> pour valider la non-régression.
            </div>
          </div>

          {/* Pilier 5 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">5</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Le Runtime & Orchestration
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                Sécurité & Boucle
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le moteur d&apos;exécution qui gère la communication entre le modèle et l&apos;environnement hôte : vérification des autorisations de sécurité, gestion des erreurs et préservation de l&apos;état du projet.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
              <strong className="text-slate-900">Application TaskFlow : </strong> Le mécanisme de bac à sable qui empêche un agent de modifier les fichiers de configuration système ou de pousser sur Git sans accord.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : SIMULATEUR INTERACTIF - LES 6 ÉTAPES D'UNE MISSION
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 3 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Déroulement d&apos;une mission logicielle étape par étape</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Pour mener à bien un développement sans commettre d&apos;erreurs, un agent bien configuré ne saute jamais directement sur l&apos;écriture du code. Il suit un protocole méthodique en 6 phases. Cliquez sur les étapes ci-dessous pour voir ce qui se déroule sous le capot :
        </p>

        {/* Simulateur interactif du cycle */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          {/* Timeline de sélection : 2 boutons par ligne en petite largeur, 3 boutons par ligne avec sidebar repliée ou en plein écran */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {missionCycle.map((item) => (
              <button
                key={item.step}
                type="button"
                onClick={() => setCurrentStep(item.step)}
                className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-2xl text-center border-2 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[68px] sm:min-h-[74px] ${
                  currentStep === item.step
                    ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100 font-semibold'
                }`}
              >
                <div
                  className={`text-[11px] font-bold uppercase tracking-wider mb-0.5 ${
                    currentStep === item.step ? 'text-indigo-100' : 'text-indigo-600'
                  }`}
                >
                  Étape {item.step}
                </div>
                <div className="text-xs sm:text-sm font-bold leading-snug">
                  {item.step === 6 ? 'Compte Rendu' : item.title.split('.')[1].trim()}
                </div>
              </button>
            ))}
          </div>

          {/* Carte de l'étape active */}
          <div className={`p-5 sm:p-6 rounded-2xl border-2 ${current.color} space-y-4 min-w-0 max-w-full overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300/60 pb-3">
              <div className="flex items-center gap-2.5">
                <Icon name={current.icon} className="w-5 h-5 text-indigo-700" />
                <h3 className="text-lg font-black">{current.title}</h3>
              </div>
              <span className="text-xs font-black uppercase bg-white/90 px-3 py-1 rounded-full border border-slate-300">
                {current.role}
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              {current.action}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] sm:text-xs leading-relaxed font-mono text-emerald-400 whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] min-w-0 max-w-full">
              <code>{current.code}</code>
            </div>

            <div className="text-xs sm:text-sm font-medium text-slate-700 pt-1 whitespace-normal break-words [overflow-wrap:anywhere]">
              <strong>À retenir :</strong> {current.detail}
            </div>
          </div>

         
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : DISTINCTION MISSION VS ACTION & DEGRÉS D'AUTONOMIE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 4 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Mission vs Action & Les 3 degrés d&apos;autonomie</h2>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Carte 1 : Une Mission */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-amber-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <Icon name="workflow" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-amber-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Une Mission (Objectif Métier Global)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-amber-800 border border-amber-200 shrink-0">
                Macro-Niveau
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-normal break-words [overflow-wrap:anywhere]">
              Représente un <strong>but final observable</strong> demandé par le PM ou le Team Leader : orientée valeur fonctionnelle, elle nécessite généralement une succession coordonnée d&apos;actions élémentaires et un compte rendu de clôture.
            </p>
            <div className="p-3 rounded-xl bg-white/90 border border-amber-200 text-xs text-slate-700 font-medium space-y-1">
              <div className="font-bold text-amber-950">Exemple dans TaskFlow :</div>
              <div className="text-slate-600">« Ajouter la possibilité de modifier le statut d&apos;une tâche (TODO &gt; IN_PROGRESS &gt; DONE) avec persistance et validation des données. »</div>
            </div>
          </div>

          {/* Carte 2 : Une Action */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-indigo-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                  <Icon name="terminal" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-indigo-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Une Action (Opération Élémentaire Unitaire)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-indigo-700 border border-indigo-200 shrink-0">
                Micro-Niveau
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-normal break-words [overflow-wrap:anywhere]">
              Représente <strong>un appel d&apos;outil individuel</strong> exécuté par l&apos;agent pour contribuer à la mission : lire un fichier source, insérer une fonction, lancer une commande de test, corriger un import.
            </p>
            <div className="p-3 rounded-xl bg-white/90 border border-indigo-200 text-xs text-slate-700 font-medium space-y-1">
              <div className="font-bold text-indigo-950">Exemple dans TaskFlow :</div>
              <div className="font-mono text-indigo-900 bg-indigo-100/50 p-2 rounded-lg text-[11px] overflow-x-auto whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                edit_file(path: &quot;backend/src/controllers/taskController.ts&quot;, target: &quot;...&quot;, replacement: &quot;...&quot;)
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des degrés d'autonomie */}
        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-bold text-slate-950">Classification des degrés d&apos;autonomie</h3>
          <div className="overflow-x-auto w-full min-w-0 max-w-full -mx-1 sm:mx-0">
            <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
              <thead className="bg-slate-100 text-slate-900 font-extrabold border-b-2 border-slate-200">
                <tr>
                  <th className="p-3.5">Niveau</th>
                  <th className="p-3.5">Comportement</th>
                  <th className="p-3.5">Validation humaine</th>
                  <th className="p-3.5">Cas d&apos;usage typique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
                <tr>
                  <td className="p-3.5 font-bold text-slate-950">1. Agent assisté</td>
                  <td className="p-3.5">Propose des suggestions ou des diffs sans jamais écrire sur le disque.</td>
                  <td className="p-3.5 text-amber-700 font-bold">Systématique avant chaque ligne</td>
                  <td className="p-3.5">Refactoring délicat ou apprentissage</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-950">2. Agent semi-autonome</td>
                  <td className="p-3.5">Modifie les fichiers du périmètre, mais demande validation pour les commandes système ou l&apos;installation de paquets.</td>
                  <td className="p-3.5 text-blue-700 font-bold">Sur actions sensibles</td>
                  <td className="p-3.5">Développement quotidien standard</td>
                </tr>
                <tr className="bg-indigo-50/30">
                  <td className="p-3.5 font-bold text-indigo-950">3. Autonome dans son périmètre</td>
                  <td className="p-3.5">Enchaîne lecture, écriture et exécution de tests sans interruption tant qu&apos;il reste dans son espace de travail.</td>
                  <td className="p-3.5 text-indigo-700 font-bold">En fin de mission (Livrable)</td>
                  <td className="p-3.5">Orchestration multi-agents dans TaskFlow</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>2.9 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Un agent IA est un système outillé capable d&apos;accomplir une mission logicielle en boucle fermée (réception, analyse, planification, exécution, vérification et compte rendu). Son autonomie est toujours bornée par les permissions configurées. <strong>Dans TaskFlow, l&apos;agent Backend peut coder et auto-tester son API en totale autonomie technique, mais seul le Project Manager humain conserve l&apos;autorité pour approuver le résultat final et déclencher l&apos;intégration</strong>.
        </p>
      </section>

      {/* =========================================================================
          SECTION 6 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Quiz de compréhension (10 questions)</h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Comprendre ce qu'est un agent IA"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal d'un agent IA dans un projet logiciel ?",
              options: [
                "Afficher uniquement des informations statiques à l'écran",
                "Poursuivre un objectif en utilisant des instructions, un contexte et éventuellement des outils",
                "Remplacer systématiquement le développeur humain pour toutes les décisions",
                "Exécuter toutes les commandes sans aucune autorisation préalable"
              ],
              correctIndex: 1,
              explanation: "Un agent IA poursuit activement un objectif à partir d'instructions, de contexte et d'outils."
            },
            {
              id: 2,
              question: "Quel élément constitue le moteur de raisonnement d'un agent IA ?",
              options: [
                "Le terminal de commandes",
                "Le système de fichiers",
                "Le modèle d'intelligence artificielle (LLM)",
                "Le dépôt Git distant"
              ],
              correctIndex: 2,
              explanation: "Le modèle d'intelligence artificielle assure l'interprétation, le traitement et le raisonnement logique."
            },
            {
              id: 3,
              question: "À quoi servent les instructions données à un agent ?",
              options: [
                "À définir son rôle, sa mission, ses responsabilités et les règles à respecter",
                "À augmenter automatiquement ses permissions système",
                "À remplacer l'explorateur de fichiers de l'IDE",
                "À supprimer le besoin de lui transmettre un contexte"
              ],
              correctIndex: 0,
              explanation: "Les instructions fixent le cadre d'intervention, les objectifs et les interdictions de l'agent."
            },
            {
              id: 4,
              question: "Que désigne le contexte d'un agent IA lors d'une session ?",
              options: [
                "Uniquement le nom du dossier racine du projet",
                "L'ensemble des informations nécessaires pour comprendre et accomplir sa mission",
                "La liste de tous les utilisateurs inscrits en base de données",
                "Uniquement l'historique des commandes bash exécutées"
              ],
              correctIndex: 1,
              explanation: "Le contexte regroupe les fichiers pertinents, l'historique des échanges et les règles du projet."
            },
            {
              id: 5,
              question: "À quoi servent principalement les outils (tools) mis à disposition d'un agent ?",
              options: [
                "À remplacer son modèle d'intelligence artificielle",
                "À lui permettre d'interagir concrètement avec son environnement (fichiers, terminal, git)",
                "À garantir mathématiquement l'absence d'erreurs de code",
                "À désactiver ses instructions permanentes"
              ],
              correctIndex: 1,
              explanation: "Les outils permettent à l'agent d'agir sur le système de fichiers, d'exécuter des tests et de lire du code."
            },
            {
              id: 6,
              question: "Dans le cycle d'une mission, quelle étape consiste à examiner et tester les résultats obtenus ?",
              options: [
                "La réception de la consigne",
                "La planification initiale",
                "La vérification (tests)",
                "La définition du persona"
              ],
              correctIndex: 2,
              explanation: "La phase de vérification consiste à exécuter les tests et à traquer les régressions avant de conclure."
            },
            {
              id: 7,
              question: "Que signifie la notion d'agent « autonome dans un périmètre défini » ?",
              options: [
                "L'agent peut réaliser les actions autorisées sans validation humaine systématique à chaque étape",
                "L'agent a le droit de supprimer tout le projet sans restriction",
                "L'agent n'a plus besoin d'instructions ni de prompt",
                "L'agent prend toutes les décisions stratégiques à la place du PM"
              ],
              correctIndex: 0,
              explanation: "L'autonomie reste strictement circonscrite aux permissions et au répertoire de travail accordés."
            },
            {
              id: 8,
              question: "Quelle est la différence fondamentale entre une mission et une action ?",
              options: [
                "Une mission est un appel d'outil technique et une action est un but abstrait",
                "Une mission représente l'objectif global à atteindre, tandis qu'une action est une opération élémentaire y contribuant",
                "Les deux termes sont de parfaits synonymes interchangeables",
                "Une action contient systématiquement plusieurs missions complètes"
              ],
              correctIndex: 1,
              explanation: "La mission est l'objectif métier (ex: créer l'API de suppression) et les actions sont les étapes (lire, éditer, tester)."
            },
            {
              id: 9,
              question: "Pourquoi est-il indispensable de vérifier systématiquement le travail d'un agent IA ?",
              options: [
                "Parce qu'un agent ne sait jamais utiliser d'outils",
                "Parce que ses réponses sont systématiquement incomplètes",
                "Parce qu'il peut commettre des erreurs techniques, des régressions ou mal interpréter une demande",
                "Parce qu'un agent ne comprend aucun langage informatique"
              ],
              correctIndex: 2,
              explanation: "L'agent peut halluciner une bibliothèque, oublier un cas limite ou introduire une régression subtile."
            },
            {
              id: 10,
              question: "Dans le projet TaskFlow, qui conserve la responsabilité finale des décisions et validations importantes ?",
              options: [
                "L'agent Backend",
                "L'agent QA",
                "Le Project Manager humain",
                "Le terminal d'exécution"
              ],
              correctIndex: 2,
              explanation: "Le Project Manager humain conserve l'autorité souveraine pour valider les livrables et autoriser les fusions."
            }
          ]}
        />
      </section>
    </div>
  );
};
