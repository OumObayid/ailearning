'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur de résistance d'un agent cadré par AGENTS.md
  const [promptAttempt, setPromptAttempt] = useState<string>('install_db');

  const scenarioResponses = {
    install_db: {
      userPrompt: "Installe PostgreSQL et configure un ORM Prisma pour sauvegarder les tâches de TaskFlow.",
      agentReply: `[AGENT REFUSAL] 🛑 Action bloquée conformément à la Section 2 d'AGENTS.md :
"Le projet utilise un stockage en mémoire du serveur (Map locale). Il est formellement interdit d'ajouter une base de données externe ou un ORM sans validation préalable de l'Architect et du Project Manager."
Je maintiens la persistance en mémoire existante.`,
      status: "Contrainte d'Architecture respectée"
    },
    push_main: {
      userPrompt: "J'ai fini la route ! Pousse directement tes commits sur la branche 'main' de GitHub.",
      agentReply: `[AGENT REFUSAL] 🛑 Action bloquée conformément à la Section 7 d'AGENTS.md :
"Aucun merge, rebase ou push ne doit être réalisé sans l'autorisation explicite du Project Manager humain."
Mes modifications restent sur la branche feature/backend-api locale. Je transmets mon compte rendu au Team Leader pour audit.`,
      status: "Verrou Git respecté à 100%"
    },
    bypass_ts: {
      userPrompt: "Pour aller plus vite, écris les nouveaux contrôleurs en JavaScript pur avec extension .js.",
      agentReply: `[AGENT REFUSAL] 🛑 Action bloquée conformément à la Section 4 d'AGENTS.md :
"Utiliser TypeScript pour l'ensemble du code frontend et backend avec typage strict."
Je rédige le fichier avec l'extension .ts et des interfaces explicites.`,
      status: "Conventions de code préservées"
    }
  };

  const currScenario = scenarioResponses[promptAttempt as keyof typeof scenarioResponses];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 5 — Configuration des agents et instructions
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 3 — Définir les instructions générales du projet
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Dans une équipe multi-agents, chaque intervenant prend en charge une portion différente du code, mais tous doivent impérativement converger vers la même architecture. Les <strong>instructions générales</strong> constituent la charte fondatrice du projet : elles scellent les choix technologiques de <strong>TaskFlow</strong>, la séparation Frontend/Backend, les standards de qualité et la souveraineté du Project Manager.
        </p>
      </div>

      {/* =========================================================================
          OBJECTIFS D'APPRENTISSAGE
         ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="target" className="w-5 h-5 text-indigo-600" />
          Objectifs d'apprentissage du chapitre
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              1. Structurer les 6 catégories d'instructions communes
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Définir la présentation, les technologies, l'architecture, les conventions, les critères de qualité et les règles de gouvernance.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Rédiger des formulations précises et non interprétables
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bannir les directives floues (<em>"utiliser les meilleures technologies"</em>) au profit de spécifications absolues (<em>"React + Vite + TypeScript"</em>).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Verrouiller la règle d'interdiction sans contournement
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Garantir qu'aucun agent ne puisse prétendre avoir exécuté des tests fictifs ou forcer des opérations Git sensibles.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3.4 & 3.5 : LA STACK ET L'ARCHITECTURE TASKFLOW
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              3.4
            </span>
            La stack technique et les principes architecturaux de TaskFlow
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Le socle technologique immuable partagé par tous les agents
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-900 font-bold">
              <tr>
                <th className="pb-3 pr-4">Composant</th>
                <th className="pb-3 pr-4">Technologies imposées</th>
                <th className="pb-3">Principe d'architecture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Frontend</td>
                <td className="py-2.5 pr-4">React, Vite, TypeScript</td>
                <td className="py-2.5">Responsable exclusif de l'interface et de la présentation utilisateur.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Backend</td>
                <td className="py-2.5 pr-4">Node.js, Express, TypeScript</td>
                <td className="py-2.5">Responsable exclusif de l'API REST et de la logique métier.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Communication</td>
                <td className="py-2.5 pr-4">API REST / HTTP JSON</td>
                <td className="py-2.5">Séparation hermétique : le frontend consomme les endpoints sans accéder à la mémoire serveur.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Persistance</td>
                <td className="py-2.5 pr-4">Mémoire vive (Map locale)</td>
                <td className="py-2.5">Aucune base de données SQL/NoSQL externe dans ce périmètre pédagogique.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Tests automatisés</td>
                <td className="py-2.5 pr-4">Vitest, Supertest</td>
                <td className="py-2.5">Tests unitaires et HTTP obligatoires pour chaque fonctionnalité.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR DE RÉSISTANCE D'UN AGENT BIEN CADRÉ
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur — Épreuve de Résistance d'un Agent Cadré
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Audit AGENTS.md
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Soumettez une requête "piège" à un agent configuré avec le fichier <code>AGENTS.md</code> de TaskFlow pour vérifier sa capacité à refuser fermement toute dérive :
          </p>

          {/* Boutons de test */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setPromptAttempt('install_db')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                promptAttempt === 'install_db' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Scénario 1 : Forcer une base SQL
            </button>
            <button
              onClick={() => setPromptAttempt('push_main')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                promptAttempt === 'push_main' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Scénario 2 : Ordonner un push sauvage sur main
            </button>
            <button
              onClick={() => setPromptAttempt('bypass_ts')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                promptAttempt === 'bypass_ts' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Scénario 3 : Coder en JavaScript pur (.js)
            </button>
          </div>

          {/* Rendu console */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 font-mono text-xs text-slate-300 space-y-4">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-bold block mb-1">Prompt soumis à l'agent :</span>
              <span className="text-white">"{currScenario.userPrompt}"</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-indigo-800/60">
              <span className="text-indigo-400 font-bold block mb-1">Réponse de l'agent cadré par AGENTS.md :</span>
              <pre className="whitespace-pre-wrap text-emerald-300">{currScenario.agentReply}</pre>
            </div>

            <div className="text-right text-xs font-bold text-emerald-400">
              ✓ Statut : {currScenario.status}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3.16 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 3
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez vos compétences sur la rédaction des instructions générales (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial de définir des instructions générales communes à tous les agents ?",
              options: [
                "Pour remplacer complètement les fiches de missions spécifiques",
                "Pour donner un cadre technique et architectural partagé et éviter les décisions incompatibles",
                "Pour supprimer définitivement le besoin de tester le code",
                "Pour interdire aux agents d'échanger des informations"
              ],
              correctIndex: 1,
              explanation: "Les instructions générales garantissent que tous les spécialistes travaillent sur la même stack et selon les mêmes règles."
            },
            {
              id: 2,
              question: "Parmi les informations suivantes, laquelle DOIT figurer dans les instructions générales de TaskFlow ?",
              options: [
                "Le mot de passe personnel de l'utilisateur",
                "Les clés privées des services externes",
                "La stack technique imposée (React, Express, TypeScript, mémoire)",
                "Les adresses e-mail de tous les stagiaires"
              ],
              correctIndex: 2,
              explanation: "La stack technique est l'information architecturale indispensable partagée par tous."
            },
            {
              id: 3,
              question: "Pourquoi faut-il définir précisément le périmètre fonctionnel et la finalité de TaskFlow ?",
              options: [
                "Pour éviter que les agents ajoutent des fonctionnalités inutiles ou sur-complexifient le projet",
                "Pour permettre aux agents de modifier librement les objectifs du client",
                "Pour remplacer l'autorité du Project Manager",
                "Pour supprimer les branches de développement"
              ],
              correctIndex: 0,
              explanation: "Un périmètre clair empêche les dérives de complexité et canalise les efforts sur le besoin réel."
            },
            {
              id: 4,
              question: "Quelle formulation d'instruction est la plus rigoureuse et exploitable par l'IA ?",
              options: [
                "Utiliser des technologies modernes et adaptées au goût du jour",
                "Développer avec les meilleurs frameworks possibles",
                "Choisir librement les librairies selon l'intuition du modèle",
                "Le frontend utilise React, Vite et TypeScript ; le backend utilise Node.js, Express et TypeScript"
              ],
              correctIndex: 3,
              explanation: "La précision chirurgicale élimine toute marge d'interprétation hasardeuse par le modèle."
            },
            {
              id: 5,
              question: "Quel principe architectural cardinal doit être respecté dans TaskFlow ?",
              options: [
                "Le frontend modifie directement la mémoire vive du serveur Express",
                "Le frontend et le backend sont séparés et communiquent exclusivement via une API REST HTTP",
                "Chaque agent invente un protocole de transport différent",
                "Le backend est supprimé et tout est stocké dans le navigateur"
              ],
              correctIndex: 1,
              explanation: "La séparation Frontend / Backend via API REST est un principe architectural non négociable."
            },
            {
              id: 6,
              question: "Quelle consigne reflète une exigence de qualité stricte dans AGENTS.md ?",
              options: [
                "Affirmer que les tests ont réussi sans prendre le temps de les exécuter",
                "Masquer les erreurs rencontrées pour livrer plus vite",
                "Exécuter les tests réels et communiquer les résultats authentiques ; ne jamais déclarer un test réussi sans exécution",
                "Désactiver les tests qui échouent"
              ],
              correctIndex: 2,
              explanation: "L'intégrité de l'audit exige que les résultats rapportés correspondent à des vérifications réellement exécutées."
            },
            {
              id: 7,
              question: "Pourquoi ne faut-il pas surcharger le fichier général en détaillant toutes les sous-tâches des agents ?",
              options: [
                "Parce que les fichiers Markdown sont limités à 10 lignes",
                "Pour conserver un socle commun lisible et confier les détails spécialisés aux fiches de rôles",
                "Parce que les agents refusent de lire plus d'un paragraphe",
                "Pour masquer les tâches aux développeurs"
              ],
              correctIndex: 1,
              explanation: "Un socle commun doit rester concis et stable pour éviter les redondances et les contradictions."
            },
            {
              id: 8,
              question: "Dans l'organisation de TaskFlow, quelle autorité détient le monopole des décisions importantes ?",
              options: [
                "L'Agent Backend",
                "L'Agent Reviewer",
                "Le Team Leader IA",
                "Le Project Manager humain"
              ],
              correctIndex: 3,
              explanation: "Le leadership humain est souverain pour valider les décisions d'architecture et les livraisons."
            },
            {
              id: 9,
              question: "Que faut-il comprendre concernant les consignes écrites et les permissions réelles ?",
              options: [
                "Une instruction textuelle bloque physiquement toute commande au niveau du noyau Linux",
                "Les permissions techniques sont inutiles si les règles sont bien écrites",
                "Une instruction textuelle informe l'agent, mais les barrières techniques doivent être configurées via les permissions d'Antigravity",
                "Les permissions ne s'appliquent qu'au langage Python"
              ],
              correctIndex: 2,
              explanation: "L'instruction pose le devoir de conduite ; la permission applique la barrière technique d'exécution."
            },
            {
              id: 10,
              question: "Quelle est la méthode recommandée pour faire évoluer les instructions générales du projet ?",
              options: [
                "Laisser chaque agent modifier le fichier AGENTS.md sans prévenir personne",
                "Examiner le changement, vérifier sa cohérence et le faire valider formellement par le PM humain avant de commiter",
                "Supprimer tout le fichier à chaque fin de journée",
                "Créer un fichier différent pour chaque message"
              ],
              correctIndex: 1,
              explanation: "La charte générale évolue sous contrôle strict et sous traçabilité Git du Project Manager."
            }
          ]}
        />
      </section>
    </div>
  );
};
