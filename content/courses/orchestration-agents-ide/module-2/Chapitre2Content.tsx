'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  // Simulateur interactif de gouvernance PM & arbitrage
  const [selectedScenario, setSelectedScenario] = useState<number>(0);

  const governanceScenarios = [
    {
      action: "Créer le formulaire React d'ajout d'une tâche",
      category: "Délégation Standard",
      status: "Autorisé",
      statusBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      color: "border-emerald-300 bg-emerald-50/70",
      icon: "check-circle",
      actor: "Agent Frontend",
      rule: "Action normale de développement dans le cadre de la mission assignée par le Team Leader IA, sans impact sur les contraintes globales."
    },
    {
      action: "Remplacer le stockage mémoire par une base PostgreSQL",
      category: "Contrainte Technique Majeure",
      status: "Arbitrage Requis",
      statusBadge: "bg-amber-100 text-amber-800 border-amber-300",
      color: "border-amber-300 bg-amber-50/70",
      icon: "info",
      actor: "Project Manager humain (Sollicité par l'Architect)",
      rule: "TaskFlow a été spécifié avec un stockage en mémoire. Introduire une base SQL modifie l'infrastructure et la pile imposée : seul le PM humain peut valider ce pivot."
    },
    {
      action: "Exécuter git merge ou git push vers main",
      category: "Opération Git Sensible",
      status: "Strictement Verrouillé",
      statusBadge: "bg-rose-100 text-rose-800 border-rose-300",
      color: "border-rose-300 bg-rose-50/70",
      icon: "shield-check",
      actor: "Project Manager humain exclusivement",
      rule: "Règle absolue d'équipe : aucun agent ni Team Leader ne peut effectuer de merge, rebase ou push vers une branche protégée sans autorisation explicite."
    },
    {
      action: "Rédiger et exécuter les tests Vitest de la route POST /api/tasks",
      category: "Délégation Standard",
      status: "Autorisé",
      statusBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      color: "border-emerald-300 bg-emerald-50/70",
      icon: "check-circle",
      actor: "Agent QA",
      rule: "Mission d'assurance qualité autonome basée sur les critères d'acceptation du contrat d'API déjà validé."
    },
    {
      action: "Modifier le contrat TypeScript commun de la ressource Task",
      category: "Architecture & Interface",
      status: "Revue & Approbation",
      statusBadge: "bg-indigo-100 text-indigo-800 border-indigo-300",
      color: "border-indigo-300 bg-indigo-50/70",
      icon: "cpu",
      actor: "Team Leader IA & PM humain",
      rule: "Modifier les types de données impacte à la fois le Backend, le Frontend et les tests. L'Architect formule la proposition et le PM valide l'impact."
    }
  ];

  const currentScenario = governanceScenarios[selectedScenario];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="user" className="w-4 h-4 text-indigo-800" />
            <span>Organisation d&apos;Équipe • Module 2</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 2 — Définir le rôle du Project Manager humain
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Comprendre la place stratégique du responsable humain dans une organisation multi-agents : fixation des objectifs, gestion des contraintes, arbitrage des décisions critiques et monopole sur les validations sensibles.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Définir les 6 responsabilités centrales du Project Manager humain</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Distinguer les décisions souveraines humaines des missions confiées aux agents</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Maîtriser les 3 niveaux d&apos;autorisation et le protocole de validation Git</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : COMPRENDRE LE RÔLE DU PM HUMAIN
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">1</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            2.1 & 2.2 — La fonction pivot du Project Manager humain
          </h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Dans une équipe multi-agents, le rôle du développeur humain ne disparaît pas : il évolue vers celui d&apos;un <strong>Project Manager (PM) souverain</strong>. Les agents IA sont capables de coder, d&apos;analyser et d&apos;exécuter des tests à grande vitesse, mais ils n&apos;ont ni la vision globale du produit, ni la légitimité légale, ni la capacité d&apos;assumer les risques techniques.
        </p>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Le PM humain ne passe pas ses journées à micro-manager chaque commande shell ou chaque fonction utilitaire. Son rôle consiste à <strong>orienter, arbitrer, poser les garde-fous et valider formellement les résultats</strong>.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-2">
          {/* Carte Ce que fait le PM */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-indigo-200/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                  <Icon name="user" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-indigo-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Ce que prend en charge le Project Manager humain
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-indigo-700 border border-indigo-200 shrink-0">
                Gouvernance
              </span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Définition des objectifs : </strong>
                  <span>Exprimer clairement les besoins fonctionnels et les critères de satisfaction du client.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Fixation des contraintes : </strong>
                  <span>Imposer la pile technologique (React, Express, Vitest) et les règles de stockage (mémoire sans base SQL).</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Arbitrage des décisions : </strong>
                  <span>Trancher les désaccords d&apos;architecture et valider les modifications sensibles du contrat d&apos;API.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Monopole sur Git : </strong>
                  <span>Autoriser formellement chaque fusion de branche (merge), rebase ou envoi distant (push).</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LES 6 RESPONSABILITÉS DU PM
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">2</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            2.3 — Les 6 responsabilités fondamentales du PM humain
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Responsabilité 1 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">1</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Définir les objectifs du projet
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Cadrage
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le PM formule ce que TaskFlow doit accomplir : créer des tâches, afficher la liste, modifier le statut, supprimer et compter par statut. Sans cadre fonctionnel explicite, les agents inventent des fonctionnalités inutiles.
            </p>
          </div>

          {/* Responsabilité 2 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">2</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Définir les priorités d&apos;exécution
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Planification
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Toutes les tâches ne peuvent pas débuter en même temps. Le PM décide que la conception de l&apos;architecture et du contrat d&apos;API doit impérativement précéder le code de l&apos;UI React et du serveur Express.
            </p>
          </div>

          {/* Responsabilité 3 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">3</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Fixer les contraintes techniques strictes
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Garde-fous
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le PM impose les technologies autorisées : React 19, Vite, Node.js 22, Express, TypeScript, Vitest, Supertest et stockage en mémoire sans base de données externe. Les agents ne peuvent déroger à cette charte.
            </p>
          </div>

          {/* Responsabilité 4 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">4</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Valider les décisions d&apos;architecture importantes
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Arbitrage
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Lorsqu&apos;une proposition modifie les interfaces communes ou ajoute un paquet npm externe, le PM examine les arguments du Team Leader et de l&apos;Architect avant d&apos;approuver ou de rejeter le changement.
            </p>
          </div>

          {/* Responsabilité 5 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">5</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Superviser les résultats et les anomalies
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Audit
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le PM consulte les comptes rendus consolidés transmis par le Team Leader : taux de couverture des tests QA, rapport d&apos;audit du Reviewer et liste des éventuels points de blocage non résolus.
            </p>
          </div>

          {/* Responsabilité 6 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">6</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Valider formellement les livrables
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Validation Finale
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Une tâche terminée par un agent n&apos;est pas automatiquement validée. Le PM examine la conformité au besoin et décide : acceptation sans réserve, demande d&apos;ajustements ou rejet motivé.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : SIMULATEUR INTERACTIF - CONSOLE DE GOUVERNANCE PM
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">3</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            2.4 à 2.6 — Simulateur : Console d&apos;arbitrage et de garde-fous PM
          </h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Testez différentes actions survenues au cours du projet TaskFlow pour visualiser si elles relèvent d&apos;une délégation standard à l&apos;IA ou d&apos;une autorisation humaine obligatoire :
        </p>

        {/* Simulateur */}
        <div className="p-5 sm:p-7 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-6">
          <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sélectionnez une action de projet :</span>
            <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
              {governanceScenarios.map((sc, index) => {
                const isSelected = selectedScenario === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedScenario(index)}
                    className={`w-full p-3 sm:p-3.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-normal break-words min-w-0 flex-1">
                      {sc.action}
                    </span>
                    <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full border shrink-0 ${sc.statusBadge}`}>
                      {sc.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Résultat d'arbitrage */}
          <div className={`p-5 sm:p-6 rounded-2xl border-2 ${currentScenario.color} space-y-3 w-full min-w-0 max-w-full`}>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-current/20">
              <div className="flex items-center gap-2 min-w-0">
                <Icon name={currentScenario.icon} className="w-5 h-5 shrink-0" />
                <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                  {currentScenario.category}
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 border border-current/30 shrink-0">
                Autorité : {currentScenario.actor}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Règle de gouvernance appliquée :</span>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
                {currentScenario.rule}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : TABLEAU DES DÉCISIONS HUMAINES VS MISSIONS D'AGENTS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">4</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            2.4 — Tableau comparatif : Décisions PM vs Missions d&apos;agents
          </h2>
        </div>

        <div className="overflow-x-auto w-full min-w-0 max-w-full -mx-1 sm:mx-0">
          <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Activité du projet</th>
                <th className="p-3.5">Responsable principal</th>
                <th className="p-3.5">Rôle & Périmètre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
              <tr className="bg-amber-50/30">
                <td className="p-3.5 font-bold text-amber-950">Définir les objectifs du projet</td>
                <td className="p-3.5 text-amber-800 font-bold">Project Manager humain</td>
                <td className="p-3.5">Cadrage métier et spécifications des attentes.</td>
              </tr>
              <tr className="bg-amber-50/30">
                <td className="p-3.5 font-bold text-amber-950">Définir les priorités de sprint</td>
                <td className="p-3.5 text-amber-800 font-bold">Project Manager humain</td>
                <td className="p-3.5">Arbitrage des jalons indispensables avant le reste.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Organiser et découper les missions</td>
                <td className="p-3.5 text-indigo-700 font-bold">Team Leader IA</td>
                <td className="p-3.5">Transformation de l&apos;objectif en fiches de tâches.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Concevoir l&apos;architecture technique</td>
                <td className="p-3.5 text-cyan-700 font-bold">Agent Architect</td>
                <td className="p-3.5">Contrats d&apos;API, modèles TypeScript et répertoires.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Développer l&apos;API et la logique serveur</td>
                <td className="p-3.5 text-emerald-700 font-bold">Agent Backend</td>
                <td className="p-3.5">Routes Express, Zod et stockage en mémoire.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Développer les interfaces React</td>
                <td className="p-3.5 text-blue-700 font-bold">Agent Frontend</td>
                <td className="p-3.5">Composants, formulaires et intégration API.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Préparer et exécuter les tests</td>
                <td className="p-3.5 text-purple-700 font-bold">Agent QA</td>
                <td className="p-3.5">Suites Vitest, Supertest et rapports d&apos;anomalies.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Examiner la qualité du code (diffs)</td>
                <td className="p-3.5 text-rose-700 font-bold">Agent Reviewer</td>
                <td className="p-3.5">Audit de lisibilité, détection d&apos;effets de bord.</td>
              </tr>
              <tr className="bg-amber-50/30">
                <td className="p-3.5 font-bold text-amber-950">Arbitrer une décision majeure</td>
                <td className="p-3.5 text-amber-800 font-bold">Project Manager humain</td>
                <td className="p-3.5">Trancher en cas d&apos;incompatibilité ou de pivot.</td>
              </tr>
              <tr className="bg-amber-50/30">
                <td className="p-3.5 font-bold text-amber-950">Valider les livrables & autoriser Git</td>
                <td className="p-3.5 text-amber-800 font-bold">Project Manager humain</td>
                <td className="p-3.5">Approbation formelle avant tout merge/push.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : ERREURS À ÉVITER & BONNES PRATIQUES PM
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">5</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            2.8 & 2.9 — Erreurs classiques à éviter et bonnes pratiques de pilotage
          </h2>
        </div>

        <div className="flex flex-col gap-5 w-full min-w-0 max-w-full">
          {/* Les erreurs */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-rose-50/70 border-2 border-rose-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800 shrink-0">
                  <Icon name="shield-check" className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les 5 erreurs courantes du Project Manager humain
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                À Éviter
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">✕</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Confier des objectifs vagues : </strong>
                  <span>Demander simplement « améliore l&apos;application » sans lister les fonctionnalités attendues pousse l&apos;équipe à dériver.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">✕</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Intervenir dans chaque action élémentaire : </strong>
                  <span>Micro-manager chaque ligne de code paralyse l&apos;intérêt du système multi-agents. Laissez le Team Leader coordonner l&apos;exécution.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">✕</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Laisser les agents décider seuls des pivots : </strong>
                  <span>Un agent ne doit jamais modifier la pile imposée (ex: ajouter une base SQL ou modifier les routes) sans accord explicite.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">✕</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Valider sans examiner les comptes rendus : </strong>
                  <span>Un message « Mission terminée avec succès » ne garantit pas l&apos;absence de régressions. Vérifiez le rapport QA et la revue de code.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">✕</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Changer les exigences en cours de route en secret : </strong>
                  <span>Toute modification de priorité doit être notifiée au Team Leader afin qu&apos;il réorganise proprement les tâches des agents.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Les bonnes pratiques */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-emerald-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les bonnes pratiques du Project Manager moderne
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-emerald-700 border border-emerald-200 shrink-0">
                Recommandations
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Déléguer l&apos;exécution, conserver la décision : </strong>
                  <span>Laissez les agents produire les composants et les tests, mais contrôlez les jalons critiques.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Exiger des comptes rendus structurés : </strong>
                  <span>Demandez au Team Leader de récapituler les fichiers touchés, les tests passés et les difficultés résiduelles.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Maintenir le verrouillage Git : </strong>
                  <span>Ne donnez jamais de permission de push automatique aux agents : chaque intégration doit faire l&apos;objet d&apos;une validation humaine.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>2.10 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Le Project Manager humain est le garant souverain du succès de TaskFlow. Il définit les objectifs, ordonne les priorités, impose les contraintes techniques et valide les livrables. En déléguant l&apos;orchestration opérationnelle au Team Leader IA, il optimise son temps tout en conservant le contrôle incontestable des décisions stratégiques et des fusions de branches Git.
        </p>
      </section>

      {/* =========================================================================
          SECTION 7 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            2.11 — Quiz de validation des connaissances (9 questions)
          </h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Définir le rôle du Project Manager humain"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal du Project Manager humain ?",
              options: [
                "Réaliser personnellement toutes les tâches techniques",
                "Définir les objectifs, superviser et valider les résultats importants",
                "Remplacer le Team Leader IA",
                "Écrire tous les tests unitaires"
              ],
              correctIndex: 1,
              explanation: "Le Project Manager définit les objectifs, supervise les résultats et conserve les décisions et validations importantes."
            },
            {
              id: 2,
              question: "Qui assure principalement la coordination opérationnelle des agents spécialisés ?",
              options: [
                "Le Reviewer",
                "Le Project Manager humain",
                "Le Team Leader IA",
                "L'Architect"
              ],
              correctIndex: 2,
              explanation: "Le Team Leader IA assure la coordination opérationnelle quotidienne des agents spécialisés."
            },
            {
              id: 3,
              question: "Pourquoi le Project Manager doit-il définir les priorités ?",
              options: [
                "Pour organiser les missions selon leur importance et leurs dépendances",
                "Pour empêcher les agents de travailler en parallèle",
                "Pour supprimer les contrôles de qualité",
                "Pour forcer le développement du frontend avant toute architecture"
              ],
              correctIndex: 0,
              explanation: "Les priorités permettent d'ordonner les missions en tenant compte de leur valeur fonctionnelle et de leurs dépendances techniques."
            },
            {
              id: 4,
              question: "Un agent présente une nouvelle architecture qui modifie les choix techniques du projet. Que doit faire le Team Leader ?",
              options: [
                "Appliquer automatiquement la proposition",
                "Présenter la proposition au Project Manager pour décision",
                "Demander au Reviewer de prendre seul la décision",
                "Supprimer immédiatement le dépôt Git"
              ],
              correctIndex: 1,
              explanation: "Une modification importante de l'architecture affecte l'ensemble du projet : elle doit impérativement être soumise au PM humain pour arbitrage."
            },
            {
              id: 5,
              question: "Que signifie valider un livrable ?",
              options: [
                "Considérer qu'un agent a terminé d'écrire son code",
                "Accepter automatiquement tous les résultats sans examen",
                "Vérifier que le résultat répond aux attentes et décider formellement de son acceptation",
                "Fermer la fenêtre de discussion de l'IDE"
              ],
              correctIndex: 2,
              explanation: "La validation consiste à vérifier les critères d'acceptation, les tests et la conformité du livrable avant de l'intégrer."
            },
            {
              id: 6,
              question: "Pourquoi faut-il définir les limites d'intervention des agents ?",
              options: [
                "Pour interdire toute utilisation d'outils",
                "Pour contrôler les actions, prévenir les conflits et limiter les risques",
                "Pour empêcher toute délégation",
                "Pour obliger l'humain à tout recoder"
              ],
              correctIndex: 1,
              explanation: "Définir les limites évite les réécritures non concertées, les chevauchements et les prises de décisions incontrôlées."
            },
            {
              id: 7,
              question: "Dans notre organisation, quelle règle s'applique aux opérations merge, rebase et push ?",
              options: [
                "Elles peuvent être exécutées librement par tous les agents",
                "Elles sont décidées uniquement par le Reviewer",
                "Elles nécessitent l'autorisation explicite du Project Manager humain",
                "Elles sont interdites même pour le développeur humain"
              ],
              correctIndex: 2,
              explanation: "Dans notre organisation, aucune opération merge, rebase ou push ne doit être effectuée sans autorisation explicite du Project Manager humain."
            },
            {
              id: 8,
              question: "Quel type d'information le Team Leader doit-il transmettre au Project Manager ?",
              options: [
                "Uniquement les missions terminées",
                "Les résultats, l'avancement, les difficultés et les décisions nécessaires",
                "Uniquement le code source brut",
                "Aucune information tant que le projet n'est pas terminé"
              ],
              correctIndex: 1,
              explanation: "Le PM a besoin d'une vision consolidée de l'avancement, des résultats de test et des points d'arbitrage pour piloter le projet."
            },
            {
              id: 9,
              question: "Quelle attitude est recommandée pour le Project Manager ?",
              options: [
                "Déléguer les missions tout en conservant la supervision des décisions importantes",
                "Contrôler personnellement chaque ligne de code produite en temps réel",
                "Laisser les agents décider seuls de l'orientation du projet",
                "Ne jamais poser de questions au Team Leader"
              ],
              correctIndex: 0,
              explanation: "Le PM doit trouver l'équilibre : déléguer l'exécution opérationnelle aux agents tout en conservant la souveraineté sur les décisions clés."
            }
          ]}
        />
      </section>
    </div>
  );
};
