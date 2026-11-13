'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  // Simulateur interactif comparant l'exécution Séquentielle vs Parallèle vs Hybride
  const [workflowMode, setWorkflowMode] = useState<'sequential' | 'parallel' | 'hybrid'>('hybrid');

  const workflows = {
    sequential: {
      title: "Mode Séquentiel Strict (En cascade)",
      badge: "Séquence Linéaire",
      color: "border-blue-300 bg-blue-50/70 text-blue-950",
      duration: "100 minutes au total",
      risk: "Faible risque de conflit Git, mais délai plus long",
      steps: [
        { name: "1. Architect", task: "Spécifie l'API & le modèle Task", time: "25 min", status: "Actif d'abord" },
        { name: "2. Backend", task: "Développe routes et contrôleurs", time: "35 min", status: "Attend l'Architect" },
        { name: "3. Frontend", task: "Crée les composants React UI", time: "25 min", status: "Attend le Backend" },
        { name: "4. QA", task: "Écrit et lance tous les tests", time: "15 min", status: "Attend le Frontend" }
      ],
      desc: "Chaque agent attend sagement que le précédent ait terminé et livré son travail. Idéal lorsque les dépendances sont absolues."
    },
    parallel: {
      title: "Mode Parallèle Total (Simultané)",
      badge: "Exécution Concurrente",
      color: "border-purple-300 bg-purple-50/70 text-purple-950",
      duration: "40 minutes au total (théorique)",
      risk: "Très fort risque de désynchronisation sans contrat préalable",
      steps: [
        { name: "Backend", task: "Développe l'API en devançant l'architecture", time: "35 min", status: "En parallèle" },
        { name: "Frontend", task: "Développe l'UI en devinant les routes API", time: "25 min", status: "En parallèle" },
        { name: "QA", task: "Prépare les tests sur des hypothèses", time: "20 min", status: "En parallèle" }
      ],
      desc: "Tous les agents démarrent en même temps. Sans contrat d'API validé en amont, les composants ne s'assemblent pas et l'intégration échoue."
    },
    hybrid: {
      title: "Mode Hybride Recommandé (Le Standard TaskFlow)",
      badge: "Organisation Professionnelle",
      color: "border-emerald-300 bg-emerald-50/70 text-emerald-950",
      duration: "55 minutes au total",
      risk: "Risque maîtrisé grâce au contrat d'interface partagé",
      steps: [
        { name: "Phase 1 : Cadrage (Séquentiel)", task: "L'Architect rédige le contrat d'API précis (POST /api/tasks, statuts valides).", time: "15 min", status: "Socle initial" },
        { name: "Phase 2 : Sprint (Parallèle)", task: "Backend (route Express) + Frontend (composant React) + QA (scénarios) travaillent simultanément sur le contrat.", time: "30 min", status: "Travail simultané" },
        { name: "Phase 3 : Intégration (Séquentiel)", task: "Assemblage, tests de bout en bout et validation finale par le PM humain.", time: "10 min", status: "Contrôle final" }
      ],
      desc: "Le meilleur des deux mondes : un cadrage séquentiel pour figer les règles, un développement parallèle rapide, puis un contrôle séquentiel d'intégration."
    }
  };

  const activeWf = workflows[workflowMode];

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

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 6 — Comprendre le travail séquentiel et le travail en parallèle
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Apprendre à orchestrer le flux de travail de l&apos;équipe : cartographie des dépendances bloquantes, conditions de parallélisation saine et maîtrise du workflow hybride standard sur TaskFlow.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Distinguer séquentiel et parallèle</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Identifier les dépendances bloquantes</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Maîtriser le modèle hybride</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : LES DEUX MODES D'ORGANISATION
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">1</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            6.1 à 6.3 — Séquentiel vs Parallèle : Principes et compromis
          </h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Dans une équipe de développement multi-agents, vous disposez de deux manières d&apos;ordonnancer les tâches :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-2">
          {/* Séquentiel */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-blue-50/70 border-2 border-blue-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-blue-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                  <Icon name="arrow-right" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-blue-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Le Travail Séquentiel (Étape par étape)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-blue-700 border border-blue-200 shrink-0">
                Linéaire & Sécurisé
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-normal break-words [overflow-wrap:anywhere]">
              Les missions s&apos;exécutent les unes après les autres. Chaque agent démarre uniquement lorsque l&apos;agent précédent a produit et validé son livrable.
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white/80 border border-blue-200 text-slate-700">
                <strong className="text-blue-950">Atout majeur : </strong> Clarté absolue, traçabilité irréprochable et risque de conflit Git strictement nul.
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-blue-200 text-slate-700">
                <strong className="text-amber-800">Inconvénient : </strong> Vitesse d&apos;exécution plus lente car les agents restent inactifs en attente de leur tour.
              </div>
            </div>
          </div>

          {/* Parallèle */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-purple-50/70 border-2 border-purple-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-purple-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700 shrink-0">
                  <Icon name="workflow" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-purple-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Le Travail en Parallèle (Simultané)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-purple-700 border border-purple-200 shrink-0">
                Simultané & Rapide
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-normal break-words [overflow-wrap:anywhere]">
              Plusieurs agents interviennent au même moment sur des périmètres distincts (ex: Agent Frontend sur React et Agent QA sur les tests Vitest).
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white/80 border border-purple-200 text-slate-700">
                <strong className="text-purple-950">Atout majeur : </strong> Gain de productivité massif et réduction drastique du délai total de livraison du sprint.
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-purple-200 text-slate-700">
                <strong className="text-amber-800">Inconvénient : </strong> Exige un contrat d&apos;interface figeant les types et l&apos;isolation des branches de travail (Git Worktrees).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LA NOTION CRUCIALE DE DÉPENDANCE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">2</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            6.4 — Dépendance bloquante vs Information utile
          </h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Pour décider si deux agents peuvent travailler en même temps, le Team Leader IA doit impérativement classifier les relations entre leurs tâches :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Bloquante */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-rose-50/70 border-2 border-rose-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800 shrink-0">
                  <Icon name="alert-triangle" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Dépendance Bloquante (Séquentiel Obligatoire)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Séquentiel Strict
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-normal break-words [overflow-wrap:anywhere]">
              Une tâche ne peut techniquement pas être compilée ni testée sans le résultat exact de la précédente.
            </p>
            <div className="p-3 rounded-xl bg-white/80 border border-rose-200 text-xs text-slate-700 font-medium">
              <strong className="text-rose-950">Exemple TaskFlow : </strong> Impossible d&apos;exécuter les tests HTTP Supertest tant que le serveur Express n&apos;a pas configuré les routes.
            </div>
          </div>

          {/* Non Bloquante */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-emerald-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Icon name="check-circle" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Information Utile (Parallélisation sous Contrat)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-emerald-700 border border-emerald-200 shrink-0">
                Parallélisable
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-normal break-words [overflow-wrap:anywhere]">
              La tâche peut progresser de façon autonome dès lors qu&apos;un <strong>contrat d&apos;interface</strong> a été partagé entre les intervenants.
            </p>
            <div className="p-3 rounded-xl bg-white/80 border border-emerald-200 text-xs text-slate-700 font-medium">
              <strong className="text-emerald-950">Exemple TaskFlow : </strong> Le Frontend crée l&apos;UI React pendant que le Backend développe la route si le contrat <code>Task</code> est documenté.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : SIMULATEUR INTERACTIF - COMPARAISON DES WORKFLOWS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">3</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            6.5 & 6.6 — Simulateur : Comparer Séquentiel, Parallèle et Hybride
          </h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Testez ci-dessous l&apos;impact de chaque mode d&apos;organisation sur le développement d&apos;une fonctionnalité de TaskFlow :
        </p>

        {/* Simulateur interactif */}
        <div className="p-5 sm:p-7 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Choisissez une organisation :</span>
            <div className="flex flex-wrap gap-2">
              {(['sequential', 'parallel', 'hybrid'] as const).map((mode) => {
                const isSel = workflowMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setWorkflowMode(mode)}
                    className={`px-3 sm:px-4 py-2 rounded-xl border-2 text-xs font-bold transition cursor-pointer ${
                      isSel
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {workflows[mode].title.split('(')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fiche active */}
          <div className={`p-5 rounded-2xl border-2 ${activeWf.color} space-y-4`}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300/60 pb-3">
              <h3 className="text-base sm:text-lg font-black text-slate-950">{activeWf.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-white px-3 py-1 rounded-full border border-slate-300">
                  ⏱️ {activeWf.duration}
                </span>
                <span className="text-xs font-bold text-slate-700 bg-white/90 px-2.5 py-1 rounded-md border border-slate-300">
                  {activeWf.badge}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              {activeWf.desc}
            </p>

            {/* Étapes du workflow */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Déroulement des interventions :</span>
              <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full">
                {activeWf.steps.map((st, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-black text-slate-900">
                      <span>{st.name}</span>
                      <span className="text-indigo-600 font-mono text-[11px]">{st.time}</span>
                    </div>
                    <p className="text-slate-600 font-medium leading-snug">{st.task}</p>
                    <div className="text-[10px] font-bold text-slate-500 pt-1 border-t border-slate-100">{st.status}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs font-bold text-slate-700 pt-1">
              <strong>Niveau de risque :</strong> {activeWf.risk}
            </div>
          </div>
        </div>

        <Callout type="tip" title="La règle d'or du Team Leader IA">
          Ne cherchez jamais à lancer le maximum d&apos;agents simultanément pour « aller plus vite ». <strong>Une équipe de 3 agents bien coordonnés autour d&apos;un contrat d&apos;API surpasse systématiquement 6 agents lâchés en parallèle sans cadre précis</strong>.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 4 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>6.10 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Le travail séquentiel garantit la sûreté en traitant les étapes dépendantes les unes après les autres. Le travail en parallèle maximise l&apos;efficacité sur les chantiers indépendants. <strong>L&apos;orchestration moderne repose sur le modèle hybride</strong> : une conception séquentielle pour figer le contrat d&apos;API, un développement en parallèle du frontend et du backend, puis une intégration et une validation contrôlées sous l&apos;égide du Project Manager humain.
        </p>
      </section>

      {/* =========================================================================
          SECTION 5 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            6.11 — Quiz de compréhension (10 questions)
          </h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Travail séquentiel et travail en parallèle"
          questions={[
            {
              id: 1,
              question: "Qu'est-ce que le travail séquentiel dans une équipe d'agents IA ?",
              options: [
                "Tous les agents travaillent simultanément sur le même fichier",
                "Les missions sont réalisées les unes après les autres dans un ordre prédéfini",
                "Les agents travaillent sans jamais recevoir d'instructions",
                "Toutes les missions sont obligatoirement confiées à un seul agent unique"
              ],
              correctIndex: 1,
              explanation: "Le travail séquentiel organise les interventions de façon chronologique, étape par étape."
            },
            {
              id: 2,
              question: "Dans quelle situation le travail en parallèle est-il particulièrement indiqué ?",
              options: [
                "Lorsque chaque tâche dépend obligatoirement du résultat de la précédente",
                "Lorsque plusieurs missions peuvent avancer indépendamment sur des périmètres distincts",
                "Lorsque les agents doivent tous modifier exactement la même ligne de code",
                "Lorsque les résultats ne doivent faire l'objet d'aucune vérification"
              ],
              correctIndex: 1,
              explanation: "Le parallélisme s'applique aux chantiers découplés disposant de leurs prérequis."
            },
            {
              id: 3,
              question: "Quel est l'un des avantages majeurs du travail séquentiel ?",
              options: [
                "Il supprime automatiquement tous les bugs du code",
                "Il ne nécessite aucune planification",
                "Il facilite le suivi des étapes et permet d'auditer les résultats intermédiaires",
                "Il garantit dans 100% des cas le temps d'exécution le plus court"
              ],
              correctIndex: 2,
              explanation: "Le déroulement linéaire permet de vérifier chaque bloc avant de passer au suivant."
            },
            {
              id: 4,
              question: "Quel risque majeur guette une équipe multi-agents lancée en parallèle sans précaution ?",
              options: [
                "Les agents ne peuvent plus appeler d'outils",
                "Des conflits de code sévères si plusieurs agents modifient les mêmes fichiers simultanément",
                "La suppression automatique des conversations de chat",
                "Le blocage irréversible du logiciel Git"
              ],
              correctIndex: 1,
              explanation: "L'intervention simultanée non coordonnée sur des fichiers partagés crée des conflits de fusion."
            },
            {
              id: 5,
              question: "Qu'est-ce qu'une « dépendance bloquante » entre deux tâches ?",
              options: [
                "Une tâche qui ne peut pas démarrer ou réussir tant qu'elle n'a pas reçu le livrable d'une autre tâche",
                "Une situation où deux agents portent le même nom",
                "Une simple permission accordée par l'administrateur",
                "Une commande Git abandonnée"
              ],
              correctIndex: 0,
              explanation: "Une dépendance bloquante impose un ordre chronologique strict entre les tâches."
            },
            {
              id: 6,
              question: "Qu'appelle-t-on l'organisation de travail « hybride » ?",
              options: [
                "Un travail effectué exclusivement par un développeur humain",
                "Un modèle où les agents changent de rôle toutes les 5 minutes",
                "Une combinaison harmonieuse de phases séquentielles (cadrage/intégration) et de phases parallèles (développement)",
                "Un projet qui n'utilise aucun gestionnaire de versions"
              ],
              correctIndex: 2,
              explanation: "L'hybride combine la sécurité du séquentiel et la vélocité du parallèle."
            },
            {
              id: 7,
              question: "Quel est le rôle du Team Leader IA dans l'ordonnancement du travail ?",
              options: [
                "Exécuter l'intégralité du code lui-même sans rien déléguer",
                "Analyser les dépendances, répartir les missions et coordonner les interventions",
                "Remplacer toutes les validations du Project Manager humain",
                "Autoriser seul les merges sur la branche principale"
              ],
              correctIndex: 1,
              explanation: "Le Team Leader structure le plan de vol opérationnel et évite les collisions."
            },
            {
              id: 8,
              question: "Pourquoi est-il indispensable de formaliser un contrat d'API avant de lancer le dev Backend et Frontend en parallèle ?",
              options: [
                "Pour que les deux agents travaillent sur des bases techniques et des formats JSON compatibles",
                "Pour interdire à l'agent Frontend d'utiliser des composants React",
                "Pour supprimer définitivement le besoin d'écrire des tests",
                "Pour éviter de devoir documenter le code"
              ],
              correctIndex: 0,
              explanation: "Le contrat fige les routes, les paramètres et les réponses, évitant l'incompatibilité à l'intégration."
            },
            {
              id: 9,
              question: "Le travail en parallèle est-il systématiquement plus rapide que le travail séquentiel ?",
              options: [
                "Oui, absolument toujours et sur tous les projets",
                "Non, car le surcoût de coordination, les conflits éventuels et les dépendances peuvent annuler le gain",
                "Oui, mais uniquement si on utilise TypeScript",
                "Non, car deux agents IA ne peuvent jamais travailler en même temps"
              ],
              correctIndex: 1,
              explanation: "Un parallélisme mal cadré entraîne des conflits et des pertes de temps considérables."
            },
            {
              id: 10,
              question: "Dans le projet TaskFlow, qui conserve l'autorité pour autoriser un merge, un rebase ou un push Git ?",
              options: [
                "L'agent Backend",
                "L'agent Frontend",
                "Le Project Manager humain",
                "N'importe quel agent de l'équipe sans distinction"
              ],
              correctIndex: 2,
              explanation: "Le PM humain est le seul garant de l'intégration finale sur les branches maîtresses."
            }
          ]}
        />
      </section>
    </div>
  );
};
