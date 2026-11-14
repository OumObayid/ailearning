'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  // Simulateur interactif des formats d'échanges inter-agents
  const [selectedExchange, setSelectedExchange] = useState<number>(0);

  const exchangeTypes = [
    {
      title: "1. Transmission d'une Mission",
      sender: "Team Leader IA",
      receiver: "Agent Backend",
      badge: "Assignation",
      color: "border-indigo-300 bg-indigo-50/70",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
      icon: "arrow-right",
      desc: "Transmission formelle d'une tâche technique avec contexte, périmètre, contraintes et livrables attendus.",
      template: `Destinataire : Agent Backend
Sujet : Développement route PATCH /api/tasks/:id/status
Contexte : TaskFlow doit permettre la modification d'état d'une tâche.
Périmètre : backend/src/controllers/ et backend/src/services/
Contraintes :
- Utiliser le type TaskStatus validé par l'Architect.
- Persistance en mémoire (TaskService Map).
- Pas de modification de code frontend.
Livrables attendus :
- Route opérationnelle et tests unitaires Vitest au vert.
- Compte rendu structuré.`
    },
    {
      title: "2. Demande de Clarification Technique",
      sender: "Agent Frontend",
      receiver: "Team Leader IA / Architect",
      badge: "Clarification",
      color: "border-blue-300 bg-blue-50/70",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      icon: "info",
      desc: "Demande formulée par un agent dès qu'une information essentielle est manquante ou ambiguë dans la spécification.",
      template: `Émetteur : Agent Frontend
Destinataire : Team Leader IA (cc Architect)
Sujet : Clarification format réponse PATCH /api/tasks/:id/status
Question :
Le composant TaskCard doit-il recevoir l'objet Task complet mis à jour dans { success: true, data: Task } ou seulement le nouveau statut ?
Impact :
Conditionne le typage du hook React useTaskMutations et le re-render de la liste des tâches.`
    },
    {
      title: "3. Signalement d'Anomalie (Bug Report)",
      sender: "Agent QA",
      receiver: "Team Leader IA",
      badge: "Alerte Qualité",
      color: "border-purple-300 bg-purple-50/70",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      icon: "bug",
      desc: "Rapport d'échec de test avec étapes de reproduction, résultat attendu vs résultat observé et niveau de sévérité.",
      template: `Émetteur : Agent QA
Destinataire : Team Leader IA
Sujet : Échec test validation statut invalide (Supertest)
Comportement attendu :
PATCH /api/tasks/1/status avec { status: 'INVALID' } doit renvoyer HTTP 400 Bad Request.
Comportement observé :
Le serveur renvoie HTTP 500 avec erreur non interceptée : "TypeError: status is not in enum".
Fichier incriminé : backend/src/controllers/taskController.ts:42
Action requise : Correction par Agent Backend avec middleware Zod.`
    },
    {
      title: "4. Recommandation d'Optimisation",
      sender: "Agent Reviewer",
      receiver: "Team Leader IA / Backend",
      badge: "Revue de Code",
      color: "border-rose-300 bg-rose-50/70",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      icon: "shield-check",
      desc: "Observation technique constructive sur la maintenabilité, la lisibilité ou la sécurité, sans valeur d'ordre direct.",
      template: `Émetteur : Agent Reviewer
Destinataire : Team Leader IA (pour transmission Backend)
Sujet : Audit de code PR #14 - Gestion des statuts TaskFlow
Observation :
La méthode updateStatus dans taskService.ts parcourt tout le tableau au lieu d'utiliser l'index de la Map en mémoire (complexité O(n) au lieu de O(1)).
Recommandation :
Utiliser tasksMap.get(id) pour garantir des performances optimales lors de la montée en charge.
Risque : Faible mais amélioration souhaitable.`
    },
    {
      title: "5. Compte Rendu de Fin de Mission",
      sender: "Agent Backend",
      receiver: "Team Leader IA",
      badge: "Clôture de Tâche",
      color: "border-emerald-300 bg-emerald-50/70",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      icon: "check-circle",
      desc: "Rapport d'achèvement listant les fichiers modifiés, les vérifications exécutées et les points restant à valider.",
      template: `Émetteur : Agent Backend
Destinataire : Team Leader IA
Mission : PATCH /api/tasks/:id/status
Statut : Terminée (À vérifier)
Travail réalisé :
- Contrôleur Express et service mis à jour avec validation Zod.
- Gestion explicite des erreurs 400 et 404.
Fichiers modifiés :
- backend/src/controllers/taskController.ts
- backend/src/services/taskService.ts
Tests : 6/6 tests unitaires passés avec succès.
Prochaine étape : Examen par QA et Reviewer.`
    }
  ];

  const currentExchange = exchangeTypes[selectedExchange];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="arrow-right" className="w-4 h-4 text-indigo-800" />
            <span>Organisation d&apos;Équipe • Module 2</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 6 — Organiser les échanges entre les agents
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Structurer la circulation des flux d&apos;informations entre agents spécialisés : formats normalisés de messages, typologie des échanges, centralisation par le Team Leader et gestion des désaccords.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Maîtriser les 5 types de messages inter-agents</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Appliquer les gabarits de consigne, compte rendu et bug report</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Gérer les dépendances d&apos;échanges et arbitrer les contradictions</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : LES 5 TYPES D'ÉCHANGES
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 1 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Les 5 types d&apos;échanges fondamentaux au sein de l&apos;équipe</h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Une équipe multi-agents ne communique pas de façon informelle ou improvisée. Chaque échange répond à une finalité précise et doit véhiculer des informations structurées pour préserver la fenêtre de contexte de chacun :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-2">
          {/* Type 1 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">1</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  La Transmission de Mission (Dispatch)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 shrink-0">
                Team Leader → Agent
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le Team Leader formalise l&apos;objectif, fournit le contrat technique, délimite les fichiers modifiables et liste les critères de réussite attendus.
            </p>
          </div>

          {/* Type 2 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-xs font-black shrink-0">2</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  La Demande de Clarification
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 shrink-0">
                Agent → Team Leader
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Dès qu&apos;une ambiguïté surgit, l&apos;agent stoppe ses suppositions et interroge son coordinateur pour obtenir une réponse normative sans inventer de règles métier.
            </p>
          </div>

          {/* Type 3 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100 text-purple-700 text-xs font-black shrink-0">3</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Le Signalement d&apos;Anomalie (Bug Report)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 shrink-0">
                QA → Team Leader
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le QA documente précisément les tests échoués avec les codes HTTP obtenus, les traces d&apos;erreurs et l&apos;impact fonctionnel constaté.
            </p>
          </div>

          {/* Type 4 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-rose-700 text-xs font-black shrink-0">4</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  La Recommandation d&apos;Audit
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 shrink-0">
                Reviewer → Équipe
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le Reviewer formule des conseils d&apos;optimisation ou alerte sur des failles de sécurité, distincts des ordres directs d&apos;exécution.
            </p>
          </div>

          {/* Type 5 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black shrink-0">5</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Le Compte Rendu de Fin de Mission
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                Agent → Team Leader
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Rapport d&apos;achèvement détaillant les fichiers touchés, les tests validés et les points d&apos;attention pour les agents en aval.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : SIMULATEUR DE FORMATS DE COMMUNICATION
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 2 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Simulateur : Gabarits réutilisables de messages inter-agents</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Cliquez sur les 5 modèles de messages pour observer leur structure standardisée et la manière dont ils circulent sur TaskFlow :
        </p>

        {/* Simulateur */}
        <div className="p-5 sm:p-7 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-6">
          <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sélectionnez un format d&apos;échange :</span>
            <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
              {exchangeTypes.map((item, index) => {
                const isSelected = selectedExchange === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedExchange(index)}
                    className={`w-full p-3 sm:p-3.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-normal break-words min-w-0 flex-1">
                      {item.title}
                    </span>
                    <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full border shrink-0 ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fiche active */}
          <div className={`p-5 sm:p-6 rounded-2xl border-2 ${currentExchange.color} space-y-3.5 w-full min-w-0 max-w-full`}>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-current/20">
              <div className="flex items-center gap-2 min-w-0">
                <Icon name={currentExchange.icon} className="w-5 h-5 shrink-0" />
                <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                  Flux : {currentExchange.sender} → {currentExchange.receiver}
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 border border-current/30 shrink-0">
                {currentExchange.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {currentExchange.desc}
            </p>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Exemple de message formaté :</span>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full border border-slate-800">
                {currentExchange.template}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : DÉPENDANCES ET GESTION DES DÉSACCORDS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 3 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Dépendances d&apos;échanges et arbitrage des contradictions</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Deux agents peuvent parfois formuler des recommandations techniques divergentes : par exemple, l&apos;Architect préconise une route générique, tandis que le Backend souhaite deux routes distinctes pour des raisons de performance.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-base">
              <Icon name="info" className="w-5 h-5 text-amber-700" />
              <span>Protocole d&apos;arbitrage en cas de désaccord technique</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 text-xs font-black shrink-0 mt-0.5">1</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-amber-950 font-bold">Interdiction d&apos;imposer : </strong>
                  <span>Aucun agent n&apos;a le pouvoir d&apos;imposer unilatéralement sa solution à un collègue.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 text-xs font-black shrink-0 mt-0.5">2</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-amber-950 font-bold">Instruction par le Team Leader : </strong>
                  <span>Le Team Leader examine les deux arguments techniques, évalue l&apos;impact sur le sprint et formule une synthèse.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 text-xs font-black shrink-0 mt-0.5">3</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-amber-950 font-bold">Escalade au PM si impact majeur : </strong>
                  <span>Si le désaccord modifie les exigences ou les délais, le PM humain tranche de façon souveraine.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>6.12 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          La qualité d&apos;une organisation multi-agents ne se mesure pas au nombre de messages échangés, mais à leur clarté et à leur pertinence. En adoptant des gabarits normalisés pour les consignes, les clarifications, les signalements d&apos;anomalies et les comptes rendus, l&apos;équipe élimine les quiproquos, évite la saturation du contexte et permet au Project Manager de suivre l&apos;avancement de TaskFlow avec sérénité.
        </p>
      </section>

      {/* =========================================================================
          SECTION 5 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Quiz de validation des connaissances (10 questions)</h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Organiser les échanges entre les agents"
          questions={[
            {
              id: 1,
              question: "Pourquoi faut-il organiser rigoureusement les échanges entre les agents ?",
              options: [
                "Pour augmenter artificiellement le nombre de messages dans le chat",
                "Pour garantir une bonne circulation de l'information et synchroniser les dépendances",
                "Pour empêcher les agents de travailler en parallèle",
                "Pour forcer l'effacement de l'historique"
              ],
              correctIndex: 1,
              explanation: "Une communication organisée garantit que les informations parviennent aux bons experts sans bruit ni dispersion."
            },
            {
              id: 2,
              question: "Quel est le rôle principal du Team Leader dans la communication ?",
              options: [
                "Coordonner les échanges, filtrer les bruits et transmettre les informations utiles aux agents concernés",
                "Réaliser toutes les missions spécialisées lui-même",
                "Remplacer le Project Manager humain",
                "Supprimer tous les rapports écrits"
              ],
              correctIndex: 0,
              explanation: "Le Team Leader centralise, formate et achemine les informations aux seuls agents impactés par une tâche."
            },
            {
              id: 3,
              question: "Que doit obligatoirement contenir une transmission de mission ?",
              options: [
                "Uniquement le nom de l'agent",
                "Uniquement le résultat final souhaité",
                "L'objectif, le contexte, le périmètre de fichiers, les contraintes et les livrables attendus",
                "Le code source de tout le projet"
              ],
              correctIndex: 2,
              explanation: "Une mission claire et non ambiguë définit le cadre précis de l'intervention sans laisser de place aux suppositions."
            },
            {
              id: 4,
              question: "Que doit faire un agent lorsqu'une information importante est ambiguë ou incomplète ?",
              options: [
                "Inventer une interprétation selon son intuition",
                "Demander immédiatement une clarification au Team Leader",
                "Ignorer l'information et coder à l'aveugle",
                "Abandonner définitivement le projet"
              ],
              correctIndex: 1,
              explanation: "Formuler une demande de clarification évite de produire du code incompatible avec le reste du système."
            },
            {
              id: 5,
              question: "Quelle différence existe entre un compte rendu et une recommandation ?",
              options: [
                "Le compte rendu décrit le travail réalisé et les résultats vérifiés, tandis que la recommandation propose une amélioration possible",
                "Il n'existe aucune différence",
                "Une recommandation constitue toujours une décision validée obligatoire",
                "Un compte rendu ne contient jamais de texte"
              ],
              correctIndex: 0,
              explanation: "Le compte rendu dresse un état factuel du travail accompli ; la recommandation propose une amélioration qualitative."
            },
            {
              id: 6,
              question: "Pourquoi faut-il identifier les dépendances entre les missions avant de transmettre ?",
              options: [
                "Pour empêcher les agents de collaborer",
                "Pour multiplier les interventions inutiles",
                "Pour s'assurer que chaque agent dispose des livrables indispensables avant d'entamer son code",
                "Pour obliger le PM à coder"
              ],
              correctIndex: 2,
              explanation: "Identifier les dépendances évite qu'un agent démarre sans disposer du contrat d'API ou des spécifications nécessaires."
            },
            {
              id: 7,
              question: "Le Frontend a besoin de connaître le format de réponse de l'API. Quel agent peut lui fournir cette information technique ?",
              options: [
                "Le QA uniquement",
                "L'Agent Backend ou l'Architect, en s'appuyant sur le contrat d'API validé",
                "Le Reviewer uniquement",
                "Aucun agent"
              ],
              correctIndex: 1,
              explanation: "L'Architect et le Backend détiennent les spécifications des routes et fournissent les types TypeScript au Frontend."
            },
            {
              id: 8,
              question: "Deux agents proposent des solutions techniques contradictoires. Quelle est la démarche à suivre ?",
              options: [
                "Laisser chaque agent appliquer sa solution unilatéralement",
                "Choisir au hasard la proposition du dernier agent qui a parlé",
                "Faire examiner les arguments par le Team Leader, avec arbitrage souverain du PM humain si nécessaire",
                "Arrêter immédiatement le serveur"
              ],
              correctIndex: 2,
              explanation: "Les propositions sont comparées par le Team Leader, et les arbitrages majeurs sont tranchés par le Project Manager humain."
            },
            {
              id: 9,
              question: "Tous les agents doivent-ils obligatoirement communiquer uniquement via le Team Leader pour chaque détail ?",
              options: [
                "Non, des échanges directs ciblés entre spécialistes sont tolérés si les règles de coordination et de traçabilité sont respectées",
                "Oui, dans tous les environnements et pour chaque question unitaire",
                "Oui, même pour vérifier le nom d'une variable",
                "Non, le Team Leader ne doit jamais être informé"
              ],
              correctIndex: 0,
              explanation: "Les clarifications techniques directes (ex: Frontend demandant une précision de type au Backend) sont saines si les décisions restent tracées."
            },
            {
              id: 10,
              question: "Quel est le principal bénéfice d'une communication structurée par gabarits ?",
              options: [
                "Rendre les missions plus longues et verbeuses",
                "Limiter les malentendus, éliminer les réécritures inutiles et faciliter le pilotage",
                "Supprimer tous les comptes rendus écrits",
                "Interdire aux agents de poser des questions"
              ],
              correctIndex: 1,
              explanation: "Des formats de communication uniformes réduisent les erreurs d'interprétation et rendent les bilans immédiatement exploitables."
            }
          ]}
        />
      </section>
    </div>
  );
};
