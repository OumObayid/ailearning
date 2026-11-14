'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  // Simulateur interactif de l'Audit d'Équipe TaskFlow
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const tpSteps = [
    {
      num: 1,
      title: "Étape 1 — Observer l'IDE Antigravity",
      objective: "Repérer les composants fondamentaux (Workspace, Chat, Terminal, Git).",
      icon: "eye",
      work: "Dans Google Antigravity, localiser les zones de travail : l'éditeur de fichiers (React/Express), la console terminal d'exécution, l'explorateur d'arborescence et l'interface de conversation avec l'IA.",
      questions: [
        "Quels sont les composants clés visibles dans l'environnement ?",
        "Où peut-on échanger avec les agents et où exécuter les commandes shell ?"
      ],
      solution: "L'IDE rassemble au même endroit l'éditeur de code, l'explorateur, le terminal et la conversation IA, permettant un pilotage centralisé sans dispersion."
    },
    {
      num: 2,
      title: "Étape 2 — Classifier les intervenants IA",
      objective: "Distinguer Assistant, Agent autonome et Sous-agent délégué.",
      icon: "users",
      work: "Pour TaskFlow, définir le rôle précis de l'assistant (support), des agents spécialisés (Backend, Frontend, QA) et des sous-agents d'analyse.",
      questions: [
        "Quelle différence fondamentale entre l'assistant et l'agent ?",
        "Pourquoi l'agent Backend peut-il déléguer à un sous-agent ?"
      ],
      solution: "L'assistant dialogue et conseille ; l'agent prend en charge une mission outillée de bout en bout ; le sous-agent soulage l'agent sur une sous-tâche ciblée."
    },
    {
      num: 3,
      title: "Étape 3 — Préparer le contexte partagé",
      objective: "Identifier le socle de connaissances indispensables pour TaskFlow.",
      icon: "file-text",
      work: "Formaliser les informations indispensables : stack Node/React/TS, stockage mémoire sans base SQL, format des routes API et contrats de données.",
      questions: [
        "Quelles informations doivent être partagées à tous les agents ?",
        "Que risque un agent Frontend qui ne reçoit pas le contrat d'API ?"
      ],
      solution: "Le socle commun (règles AGENTS.md, stack imposée, contrats de données) évite que les agents développent des briques incompatibles."
    },
    {
      num: 4,
      title: "Étape 4 — Définir la matrice de permissions",
      objective: "Appliquer le moindre privilège sur les outils (fichiers, terminal, Git).",
      icon: "shield-check",
      work: "Définir les droits : l'Architecte en lecture seule, le Backend/Frontend en écriture sur leur sous-dossier, et verrouiller strictement les merges Git pour le PM.",
      questions: [
        "Pourquoi un agent ne doit-il pas pouvoir merger sur main ?",
        "Quels outils attribuer au profil QA ?"
      ],
      solution: "Le principe de moindre privilège bride chaque agent à son espace immédiat. Le PM humain garde le monopole absolu sur les fusions Git."
    },
    {
      num: 5,
      title: "Étape 5 — Ordonnancer les missions (Hybride)",
      objective: "Cartographier les dépendances et planifier les chantiers parallèles.",
      icon: "workflow",
      work: "Structurer le sprint : Phase 1 Cadrage (Architecte), Phase 2 Développement simultané (Backend + Frontend + QA scénarios), Phase 3 Intégration.",
      questions: [
        "Pourquoi le contrat d'API doit-il précéder le dev parallèle ?",
        "À quel moment l'agent QA peut-il commencer son travail ?"
      ],
      solution: "L'approche hybride fige le contrat d'abord, accélère en parallèle sur les chantiers indépendants, et sécurise la livraison finale."
    },
    {
      num: 6,
      title: "Étape 6 — Livrable : Fiche d'Analyse Finale",
      objective: "Rédiger la synthèse d'organisation de référence pour TaskFlow.",
      icon: "check-circle",
      work: "Consigner l'organigramme de l'équipe (PM humain, Team Leader IA, 5 agents spécialisés) et les règles d'escalade.",
      questions: [
        "Comment s'organisent les responsabilités complémentaires QA vs Reviewer ?",
        "Quels arbitrages restent sous la responsabilité exclusive du PM ?"
      ],
      solution: "Le livrable final acte la charte collaborative de l'équipe. L'apprenant dispose d'un plan d'action prêt à l'emploi pour le projet TaskFlow."
    }
  ];

  const curr = tpSteps[activeStep - 1];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU TP
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="rocket" className="w-4 h-4 text-indigo-800" />
            <span>Travail Pratique de Synthèse • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Durée estimée : ~45 min</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 8 — TP Pratique : Analyser un environnement multi-agents et concevoir la charte de collaboration
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Mise en situation concrète dans la peau du Project Manager humain sur le projet <strong>TaskFlow</strong> : analysez votre IDE Google Antigravity, structurez l&apos;équipe d&apos;agents IA, définissez la matrice des permissions et planifiez le premier sprint de développement.
        </p>

        {/* Objectifs du TP */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Auditer les composants de l&apos;IDE</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Définir l&apos;organigramme de l&apos;équipe</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Rédiger la fiche de synthèse TaskFlow</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : CADRAGE DU TP ET CAHIER DES CHARGES TASKFLOW
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 1 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Mise en situation : Le projet TaskFlow</h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Vous prenez la direction du projet <strong>TaskFlow</strong>, une application de gestion de tâches épurée et performante.
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
          <h3 className="font-black text-slate-950 text-base flex items-center gap-2">
            <Icon name="file-code" className="w-5 h-5 text-indigo-600" />
            <span>Fiche technique officielle de TaskFlow</span>
          </h3>
          <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full text-xs sm:text-sm">
            <div className="flex flex-wrap items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 gap-2">
              <span className="font-bold text-indigo-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                Frontend :
              </span>
              <p className="text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere]">React 19, Vite, TypeScript, Tailwind CSS.</p>
            </div>
            <div className="flex flex-wrap items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 gap-2">
              <span className="font-bold text-indigo-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                Backend :
              </span>
              <p className="text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere]">Node.js 22, Express, TypeScript, validation Zod.</p>
            </div>
            <div className="flex flex-wrap items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 gap-2">
              <span className="font-bold text-indigo-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                Stockage :
              </span>
              <p className="text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere]">En mémoire (TaskService avec Map/Array) — <em>Pas de base SQL</em>.</p>
            </div>
            <div className="flex flex-wrap items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 gap-2">
              <span className="font-bold text-indigo-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0"></span>
                Tests & Qualité :
              </span>
              <p className="text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere]">Vitest, Supertest, couverture de code &gt; 80%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : SIMULATEUR DE PARCOURS DU TP (6 ÉTAPES GUIDÉES)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 2 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Guide d&apos;exécution pas à pas du TP</h2>
        </div>

        {/* Timeline des étapes : 2 boutons par ligne en petite largeur, 3 boutons par ligne avec sidebar repliée ou en plein écran */}
        <div className="p-5 sm:p-7 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {tpSteps.map((st) => (
              <button
                key={st.num}
                type="button"
                onClick={() => {
                  setActiveStep(st.num);
                  setShowSolution(false);
                }}
                className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-2xl text-center border-2 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[68px] sm:min-h-[74px] ${
                  activeStep === st.num
                    ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100 font-semibold'
                }`}
              >
                <div
                  className={`text-[11px] font-bold uppercase tracking-wider mb-0.5 ${
                    activeStep === st.num ? 'text-indigo-100' : 'text-indigo-600'
                  }`}
                >
                  Étape {st.num}
                </div>
                <div className="text-xs sm:text-sm font-bold leading-snug">
                  {st.title.split('—')[1]?.trim() || st.title}
                </div>
              </button>
            ))}
          </div>

          {/* Carte de travail active */}
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-indigo-200 w-full min-w-0 max-w-full bg-indigo-50/60 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200/80 pb-3">
              <div className="flex items-center gap-2.5">
                <Icon name={curr.icon} className="w-5 h-5 text-indigo-700" />
                <h3 className="text-lg font-black text-indigo-950">{curr.title}</h3>
              </div>
              <span className="text-xs font-bold text-indigo-900 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-300">
                {curr.objective}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Travail à accomplir :</span>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed bg-white/80 p-3.5 rounded-xl border border-slate-200">
                {curr.work}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Questions de guidage :</span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                {curr.questions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold shrink-0 mt-0.5">?</span>
                    <span className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bouton pour afficher la solution / correction officielle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm hover:bg-indigo-700 transition cursor-pointer flex items-center gap-2"
              >
                <Icon name="check-circle" className="w-4 h-4" />
                <span>{showSolution ? 'Masquer le corrigé de référence' : 'Consulter le corrigé de référence'}</span>
              </button>
            </div>

            {showSolution && (
              <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-xs sm:text-sm text-emerald-950 space-y-1.5 animate-fadeIn">
                <strong className="flex items-center gap-1.5 text-emerald-900 font-bold">
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
                  Corrigé de référence (Étape {curr.num}) :
                </strong>
                <p className="font-medium leading-relaxed">{curr.solution}</p>
              </div>
            )}
          </div>

        
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : GRILLE D'ÉVALUATION DU LIVRABLE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 3 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Grille d&apos;auto-évaluation du TP (Critères de réussite)</h2>
        </div>

        <div className="overflow-x-auto w-full min-w-0 max-w-full -mx-1 sm:mx-0">
          <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Critère</th>
                <th className="p-3.5">Attendu opérationnel</th>
                <th className="p-3.5">Statut de validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
              <tr>
                <td className="p-3.5 font-bold">1. Environnement IDE</td>
                <td className="p-3.5">Les 5 zones (Editor, Tree, Chat, Terminal, VCS) sont clairement identifiées.</td>
                <td className="p-3.5 text-emerald-700 font-bold">✓ Conforme</td>
              </tr>
              <tr className="bg-indigo-50/20">
                <td className="p-3.5 font-bold">2. Typologie des intervenants</td>
                <td className="p-3.5">La distinction Assistant vs Agent vs Sous-agent est parfaitement maîtrisée.</td>
                <td className="p-3.5 text-emerald-700 font-bold">✓ Conforme</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">3. Matrice de permissions</td>
                <td className="p-3.5">Moindre privilège appliqué ; interdiction stricte de merge/push aux agents.</td>
                <td className="p-3.5 text-emerald-700 font-bold">✓ Conforme</td>
              </tr>
              <tr className="bg-indigo-50/20">
                <td className="p-3.5 font-bold">4. Ordonnancement</td>
                <td className="p-3.5">Modèle hybride retenu avec contrat d&apos;API préalable au parallélisme.</td>
                <td className="p-3.5 text-emerald-700 font-bold">✓ Conforme</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">5. Souveraineté PM</td>
                <td className="p-3.5">Le Project Manager humain conserve l&apos;exclusivité des validations stratégiques.</td>
                <td className="p-3.5 text-emerald-700 font-bold">✓ Conforme</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : QUIZ RÉCAPITULATIF DU TP
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Quiz de clôture du TP Pratique (5 questions)</h2>
        </div>

        <QuickQuiz
          title="Validation finale du TP du Module 1"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle central du Team Leader IA dans l'équipe TaskFlow ?",
              options: [
                "Remplacer le Project Manager humain pour toutes les décisions",
                "Coordonner les missions opérationnelles, suivre l'avancement et agréger les résultats des agents spécialisés",
                "Réaliser l'intégralité du code frontend et backend seul",
                "Supprimer les branches Git des autres développeurs"
              ],
              correctIndex: 1,
              explanation: "Le Team Leader assure la gestion opérationnelle et le lien entre les agents sans se substituer au PM."
            },
            {
              id: 2,
              question: "Pourquoi est-il indispensable de figer le contrat d'API avant de lancer le dev parallèle du Frontend et du Backend ?",
              options: [
                "Pour que les deux agents développent des composants immédiatement compatibles sur les formats d'échange",
                "Pour éviter d'avoir à exécuter des tests unitaires",
                "Pour supprimer le besoin d'utiliser TypeScript",
                "Pour empêcher l'agent QA de travailler"
              ],
              correctIndex: 0,
              explanation: "Le contrat d'API définit les routes, statuts et réponses partagées par le frontend et le backend."
            },
            {
              id: 3,
              question: "Quelle est la responsabilité propre à l'agent QA par rapport à l'agent Reviewer ?",
              options: [
                "Le QA valide seul la mise en production du site",
                "Le QA conçoit et exécute les scénarios de test (Vitest/Supertest), tandis que le Reviewer audite la structure du code et le respect des normes",
                "Le QA réécrit entièrement l'application en Python",
                "Le QA et le Reviewer sont deux dénominations pour la même tâche de documentation"
              ],
              correctIndex: 1,
              explanation: "Le QA teste les comportements applicatifs tandis que le Reviewer audite la qualité et la propreté du code."
            },
            {
              id: 4,
              question: "Pourquoi un agent ne doit-il jamais recevoir l'autorisation d'effectuer un git push ou git merge direct sur la branche principale ?",
              options: [
                "Pour préserver l'intégrité du dépôt sous le contrôle souverain du Project Manager humain",
                "Parce que Git bloque techniquement toutes les requêtes venant d'une IA",
                "Pour forcer l'agent à abandonner sa mission en cours",
                "Parce qu'un agent ne sait pas utiliser la commande git"
              ],
              correctIndex: 0,
              explanation: "La validation et la livraison de code sur les branches de production relèvent de la responsabilité humaine."
            },
            {
              id: 5,
              question: "Quel est le bilan d'apprentissage majeur de ce premier module ?",
              options: [
                "Qu'il faut laisser les agents IA coder en totale autonomie sans jamais intervenir",
                "Qu'une collaboration multi-agents réussie dépend avant tout de l'organisation, du cadrage des permissions et de la supervision humaine",
                "Que les IDE classiques sont désormais inutilisables",
                "Qu'un projet ne doit jamais utiliser plus d'un seul fichier source"
              ],
              correctIndex: 1,
              explanation: "L'orchestration est une discipline d'organisation et de gouvernance avant d'être une affaire d'outils."
            }
          ]}
        />
      </section>
    </div>
  );
};
