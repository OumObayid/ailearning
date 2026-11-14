'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur interactif de décomposition de mission par le Team Leader
  const [activeStep, setActiveStep] = useState<number>(0);

  const decompositionWorkflow = [
    {
      title: "1. Réception de l'objectif PM",
      agent: "Team Leader IA",
      badge: "Cadrage initial",
      color: "border-indigo-300 bg-indigo-50/70 text-indigo-950",
      icon: "bot",
      desc: "Le PM humain demande : « Permettre à l'utilisateur de modifier le statut d'une tâche dans TaskFlow (TODO, IN_PROGRESS, DONE) avec validation et mise à jour de l'interface. »",
      action: "Le Team Leader analyse le besoin, vérifie que les contraintes technologiques (TypeScript, Express, React) sont respectées et prépare le découpage opérationnel."
    },
    {
      title: "2. Spécification & Contrat d'Interface",
      agent: "Agent Architect",
      badge: "Dépendance bloquante",
      color: "border-cyan-300 bg-cyan-50/70 text-cyan-950",
      icon: "cpu",
      desc: "Mission : Spécifier la route PATCH /api/tasks/:id/status et définir le type énuméré TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'.",
      action: "L'Architect publie le contrat d'API TypeScript partagé. Tant que ce contrat n'est pas validé, le Backend et le Frontend ne peuvent pas coder sur des bases fiables."
    },
    {
      title: "3. Développement en Parallèle",
      agent: "Agents Backend & Frontend",
      badge: "Parallélisme sous contrat",
      color: "border-emerald-300 bg-emerald-50/70 text-emerald-950",
      icon: "server",
      desc: "Backend : Implémente le contrôleur PATCH, la validation Zod et la mutation en mémoire. Frontend : Conçoit le sélecteur visuel de statut sur les cartes de tâches.",
      action: "Les deux agents travaillent simultanément sur des branches isolées grâce au contrat d'interface partagé, réduisant le délai de développement par deux."
    },
    {
      title: "4. Vérifications & Audit Croisé",
      agent: "Agents QA & Reviewer",
      badge: "Contrôle qualité",
      color: "border-purple-300 bg-purple-50/70 text-purple-950",
      icon: "check-circle",
      desc: "QA : Exécute les tests Supertest pour valider les statuts licites et vérifier le rejet des statuts invalides (400 Bad Request). Reviewer : Audite la propreté du code et l'absence de fuites.",
      action: "Le QA confirme 100% de tests au vert. Le Reviewer valide la conformité du code avec les standards du projet TaskFlow."
    },
    {
      title: "5. Consolidation & Rapport pour le PM",
      agent: "Team Leader IA",
      badge: "Compte rendu de clôture",
      color: "border-amber-300 bg-amber-50/70 text-amber-950",
      icon: "document-text",
      desc: "Le Team Leader rassemble les livrables, compile les résultats des tests et rédige la synthèse finale pour le Project Manager humain.",
      action: "Le PM reçoit un rapport complet (fichiers modifiés, tests réussis, statut 'À valider') et peut autoriser formellement le merge Git vers la branche principale."
    }
  ];

  const currentWorkflowStep = decompositionWorkflow[activeStep];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="bot" className="w-4 h-4 text-indigo-800" />
            <span>Organisation d&apos;Équipe • Module 2</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 3 — Définir le rôle du Team Leader IA
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Maîtriser les responsabilités opérationnelles du chef d&apos;équipe IA : décomposition méthodique des objectifs, répartition des fiches de mission, gestion des dépendances et consolidation des comptes rendus.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Comprendre le rôle d&apos;orchestrateur opérationnel du Team Leader IA</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Distinguer coordination centrale et exécution technique spécialisée</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Maîtriser les 5 statuts de suivi et la gestion des blocages</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : INTRODUCTION & COMPRÉHENSION DU RÔLE
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 1 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Le Team Leader IA : Le pivot opérationnel de l&apos;équipe</h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Dans une équipe multi-agents, le Project Manager humain ne doit pas s&apos;épuiser à rédiger manuellement 20 prompts distincts pour chaque sous-tâche. Il transmet son intention globale à un agent coordinateur : le <strong>Team Leader IA</strong>.
        </p>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Le Team Leader IA fait le pont entre la vision stratégique humaine et l&apos;exécution technique des agents spécialistes. Il décompose le besoin en missions atomiques, identifie l&apos;ordre logique de réalisation, mandate les bons experts et consolide les retours.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-2">
          {/* Carte Rôle Team Leader */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-indigo-200/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                  <Icon name="bot" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-indigo-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Ce que prend en charge le Team Leader IA
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-indigo-700 border border-indigo-200 shrink-0">
                Chef d&apos;Orchestre
              </span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Décomposition d&apos;objectifs : </strong>
                  <span>Transformer un besoin utilisateur général en une série de missions techniques concrètes.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Distribution ciblée : </strong>
                  <span>Affecter chaque mission à l&apos;agent expert compétent (Architect, Backend, Frontend, QA, Reviewer).</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Gestion des dépendances : </strong>
                  <span>Séquencer les étapes indispensables et autoriser le travail en parallèle dès que les contrats sont prêts.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Synthèse pour le PM : </strong>
                  <span>Présenter un bilan clair, structuré et sans jargon superflu au Project Manager humain.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : SIMULATEUR DE DÉCOMPOSITION ET DISPATCHING
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 2 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Simulateur : Le cycle de décomposition et de pilotage d&apos;une mission</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Parcourez ci-dessous les 5 étapes franchies par le Team Leader IA pour orchestrer la fonctionnalité de changement de statut dans TaskFlow :
        </p>

        {/* Simulateur */}
        <div className="p-5 sm:p-7 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-6">
          {/* Sélecteur vertical full-width */}
          <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Parcours des étapes d&apos;orchestration :</span>
            <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
              {decompositionWorkflow.map((item, index) => {
                const isSelected = activeStep === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={`w-full p-3 sm:p-3.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        {index + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-normal break-words min-w-0">
                        {item.title}
                      </span>
                    </div>
                    <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full border shrink-0 ${isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'}`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fiche de l'étape active */}
          <div className={`p-5 sm:p-6 rounded-2xl border-2 ${currentWorkflowStep.color} space-y-3 w-full min-w-0 max-w-full`}>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-current/20">
              <div className="flex items-center gap-2 min-w-0">
                <Icon name={currentWorkflowStep.icon} className="w-5 h-5 shrink-0" />
                <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                  Intervenant : {currentWorkflowStep.agent}
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 border border-current/30 shrink-0">
                {currentWorkflowStep.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              {currentWorkflowStep.desc}
            </p>

            <div className="p-3 rounded-xl bg-white/90 border border-slate-200 text-xs text-slate-700 font-medium space-y-1">
              <strong className="text-slate-900">Rôle d&apos;orchestration du Team Leader : </strong>
              <span>{currentWorkflowStep.action}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : COORDINATION VS EXÉCUTION & LES 5 STATUTS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 3 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Coordination vs Exécution et les 5 statuts de suivi</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Une règle essentielle : <strong>le Team Leader ne doit pas exécuter lui-même toutes les tâches techniques</strong>. S&apos;il code tout le backend et le frontend, il sature sa mémoire et perd sa capacité de supervision globale.
        </p>

        {/* Tableau comparatif */}
        <div className="overflow-x-auto w-full min-w-0 max-w-full -mx-1 sm:mx-0">
          <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Activité</th>
                <th className="p-3.5">Team Leader IA</th>
                <th className="p-3.5">Agent Spécialisé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
              <tr>
                <td className="p-3.5 font-bold">Définition & Découpage</td>
                <td className="p-3.5 text-indigo-700 font-bold">Responsable principal</td>
                <td className="p-3.5 text-slate-600">Reçoit et applique sa fiche</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Production du code / Tests</td>
                <td className="p-3.5 text-slate-600">Supervise et relit</td>
                <td className="p-3.5 text-emerald-700 font-bold">Responsable de son périmètre</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Gestion des blocages</td>
                <td className="p-3.5 text-indigo-700 font-bold">Arbitre ou escalade au PM</td>
                <td className="p-3.5 text-slate-600">Signale immédiatement l&apos;anomalie</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Consolidation du rapport</td>
                <td className="p-3.5 text-indigo-700 font-bold">Rédige la synthèse globale</td>
                <td className="p-3.5 text-slate-600">Fournit son compte rendu unitaire</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Les 5 statuts de suivi */}
        <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-950 pb-2 border-b border-slate-200">
            La nomenclature des 5 statuts de mission
          </h3>
          <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full text-xs sm:text-sm">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 gap-2">
              <span className="font-bold text-slate-800">1. À faire</span>
              <span className="text-slate-600 font-medium">Mission définie et consignée, en attente de lancement.</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200 gap-2">
              <span className="font-bold text-blue-950">2. En cours</span>
              <span className="text-blue-800 font-medium">L&apos;agent assigné travaille activement sur son périmètre.</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 gap-2">
              <span className="font-bold text-amber-950">3. En attente</span>
              <span className="text-amber-800 font-medium">Bloqué par une dépendance externe ou une clarification en cours.</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 border border-purple-200 gap-2">
              <span className="font-bold text-purple-950">4. À vérifier</span>
              <span className="text-purple-800 font-medium">Livrable produit, transmis pour suite de tests QA ou revue de code.</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 gap-2">
              <span className="font-bold text-emerald-950">5. Terminée</span>
              <span className="text-emerald-800 font-medium">Critères techniques satisfaits, prête pour validation finale du PM.</span>
            </div>
          </div>
        </div>

        <Callout type="info" title="Distinction fondamentale : 'Terminée' vs 'Validée'">
          Le statut <strong>Terminée</strong> atteste que l&apos;agent spécialisé a produit son code et passé les tests unitaires prévus. Seul le Project Manager humain détient l&apos;autorité pour déclarer une fonctionnalité <strong>Validée</strong> et prête pour le déploiement ou l&apos;intégration dans la branche de production.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 4 : MODÈLE TYPE D'UNE FICHE DE MISSION
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 4 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Structure type d&apos;une consigne et d&apos;un compte rendu</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Pour éviter toute ambiguïté, le Team Leader communique avec chaque agent via des gabarits stricts et normalisés :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Gabarit consigne */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Gabarit d&apos;une fiche de mission (Team Leader → Agent)</h3>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">Modèle</span>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full border border-slate-800">
{`Destinataire : Agent Backend
Mission : Implémenter la route PATCH /api/tasks/:id/status
Objectif : Permettre la mise à jour du statut d'une tâche existante.
Contraintes :
- Valider le statut avec Zod (TODO, IN_PROGRESS, DONE).
- Renvoyer 404 si la tâche n'existe pas, 400 si le statut est invalide.
- Respecter le stockage en mémoire de TaskService.
- Ne pas modifier les composants du frontend.
Livrables attendus :
- taskController.ts mis à jour.
- Suite de tests unitaires Vitest associée.
- Compte rendu d'intervention formalisé.`}
            </pre>
          </div>

          {/* Gabarit compte rendu */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Gabarit de compte rendu (Agent → Team Leader)</h3>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Modèle</span>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full border border-slate-800">
{`Agent : Agent Backend
Mission : PATCH /api/tasks/:id/status
Statut : Terminée (prête pour vérification QA)
Modifications réalisées :
- Ajout de la méthode updateStatus dans taskService.ts.
- Création du contrôleur et branchement sur router.patch.
Fichiers concernés :
- backend/src/controllers/taskController.ts
- backend/src/services/taskService.ts
Tests & vérifications :
- 6 tests unitaires exécutés et passés avec succès (Vitest).
Difficultés & points d'attention :
- Vérifier que l'UI frontend envoie bien le champ "status" en majuscules.`}
            </pre>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>3.9 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Le Team Leader IA est le chef d&apos;orchestre opérationnel : il traduit la vision du Project Manager humain en tâches techniques précises pour chaque agent spécialisé, gère l&apos;ordonnancement des dépendances et suit l&apos;avancement à travers des statuts formalisés. Il ne remplace jamais l&apos;autorité humaine et ne s&apos;éparpille pas dans l&apos;écriture de tout le code : <strong>son excellence repose sur la clarté de sa coordination et la rigueur de ses synthèses</strong>.
        </p>
      </section>

      {/* =========================================================================
          SECTION 6 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Quiz de validation des connaissances (10 questions)</h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Définir le rôle du Team Leader IA"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal du Team Leader IA ?",
              options: [
                "Remplacer le Project Manager humain",
                "Coordonner les missions et les agents spécialisés",
                "Réaliser seul toutes les tâches techniques",
                "Supprimer tous les tests unitaires"
              ],
              correctIndex: 1,
              explanation: "Le Team Leader organise les missions, gère les dépendances et coordonne l'équipe d'agents spécialisés."
            },
            {
              id: 2,
              question: "Que doit faire le Team Leader lorsqu'il reçoit un objectif général ?",
              options: [
                "Le transmettre directement à tous les agents sans analyse",
                "Commencer immédiatement à modifier le code de tous les fichiers",
                "Le comprendre et le décomposer en missions organisées et ciblées",
                "Attendre la fin du projet"
              ],
              correctIndex: 2,
              explanation: "Il doit d'abord analyser le besoin, clarifier les ambiguïtés et le découper en fiches de missions atomiques."
            },
            {
              id: 3,
              question: "Sur quels critères le Team Leader répartit-il les missions ?",
              options: [
                "Sur le rôle, les compétences et le domaine d'intervention de chaque agent",
                "Sur le nombre de conversations ouvertes dans l'IDE",
                "Sur le choix aléatoire d'un agent disponible",
                "En donnant toutes les missions au premier agent qui répond"
              ],
              correctIndex: 0,
              explanation: "Les missions doivent correspondre strictement au domaine d'intervention de chaque profil (Architect, Backend, Frontend, QA, Reviewer)."
            },
            {
              id: 4,
              question: "Pourquoi faut-il identifier les dépendances entre les missions ?",
              options: [
                "Pour empêcher les agents de travailler ensemble",
                "Pour organiser correctement l'ordre des travaux et les possibilités de parallélisation",
                "Pour supprimer les étapes de vérification",
                "Pour forcer une exécution 100% séquentielle"
              ],
              correctIndex: 1,
              explanation: "Identifier les dépendances permet de savoir quelles tâches doivent précéder les autres et quand le travail en parallèle est sécurisé."
            },
            {
              id: 5,
              question: "Que doit faire le Team Leader lorsqu'un agent rencontre un problème technique ou un blocage ?",
              options: [
                "Ignorer le problème et fermer la session",
                "Valider automatiquement le résultat sans test",
                "Identifier la difficulté, organiser une réponse adaptée ou escalader au PM si un arbitrage est requis",
                "Remplacer immédiatement tous les agents"
              ],
              correctIndex: 2,
              explanation: "Le Team Leader diagnostique le blocage, apporte les informations manquantes ou sollicite l'arbitrage du PM humain."
            },
            {
              id: 6,
              question: "Que signifie l'état « À vérifier » dans le suivi des missions ?",
              options: [
                "La mission n'a pas encore commencé",
                "Le travail a été transmis par l'agent et doit être examiné (QA ou Reviewer)",
                "Le livrable a été définitivement validé par le PM",
                "Le code a été supprimé"
              ],
              correctIndex: 1,
              explanation: "L'état « À vérifier » indique que l'agent a terminé sa part et que le livrable entre dans la phase de test ou de revue."
            },
            {
              id: 7,
              question: "Quelle décision doit impérativement être transmise au Project Manager humain ?",
              options: [
                "Une modification importante de l'architecture ou des choix techniques",
                "La correction d'une faute de frappe sans conséquence",
                "La simple consultation d'un fichier en lecture seule",
                "L'exécution d'une commande npm test"
              ],
              correctIndex: 0,
              explanation: "Toute décision modifiant l'architecture générale, la pile technologique ou le contrat de l'application relève du PM humain."
            },
            {
              id: 8,
              question: "Pourquoi le Team Leader doit-il examiner les résultats des agents avant de poursuivre ?",
              options: [
                "Pour remplacer systématiquement tous les agents spécialisés",
                "Pour éviter de transmettre des informations au Project Manager",
                "Pour détecter les problèmes et incompatibilités avant que d'autres agents ne s'appuient sur un travail incorrect",
                "Pour récrire tout le code lui-même"
              ],
              correctIndex: 2,
              explanation: "Vérifier les livrables évite de propager une anomalie aux agents en aval (ex: Frontend qui coderait sur une API buggée)."
            },
            {
              id: 9,
              question: "Quelle opération nécessite une autorisation explicite du Project Manager dans notre organisation ?",
              options: [
                "Lire un fichier source",
                "Effectuer un push ou un merge sur une branche Git",
                "Préparer un compte rendu de mission",
                "Lancer les tests Vitest dans le terminal"
              ],
              correctIndex: 1,
              explanation: "Dans notre organisation, aucun push ni merge ne peut être effectué sans autorisation explicite du Project Manager humain."
            },
            {
              id: 10,
              question: "Quelle est la relation correcte entre le Team Leader et le Project Manager ?",
              options: [
                "Le Team Leader remplace le Project Manager sur tout le projet",
                "Le Project Manager réalise toutes les missions techniques quotidiennes",
                "Le Team Leader coordonne les agents opérationnels et rend compte au Project Manager, qui conserve les arbitrages et validations finales",
                "Il n'y a aucun échange entre eux"
              ],
              correctIndex: 2,
              explanation: "Le Team Leader assure l'orchestration opérationnelle et rend compte au PM humain, qui conserve la souveraineté stratégique."
            }
          ]}
        />
      </section>
    </div>
  );
};
