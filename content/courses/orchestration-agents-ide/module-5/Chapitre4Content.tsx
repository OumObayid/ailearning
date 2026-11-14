'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  // Simulateur interactif des 6 fiches d'instructions spécialisées
  const [activeRole, setActiveRole] = useState<'leader' | 'architect' | 'backend' | 'frontend' | 'qa' | 'reviewer'>('backend');

  const specialistProfiles = {
    leader: {
      name: "Team Leader IA",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
      role: "Coordonnateur tactique de l'équipe d'agents IA",
      mission: "Traduire les directives du PM en missions techniques, ordonnancer les dépendances et consolider les rapports.",
      scope: "Supervision globale, tickets de backlog, documentation de sprint. (Aucune écriture de code applicatif).",
      deliverable: "Plan de découpage, tableau de suivi Kanban, synthèse d'avancement.",
      gate: "Vérifier que les livrables sont auditables avant de les présenter au PM.",
      collaboration: "Communique avec tous les agents spécialisés et rend compte au PM humain."
    },
    architect: {
      name: "Agent Architect",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      role: "Garant de la cohérence technique et de la structure de TaskFlow",
      mission: "Définir la modélisation de données, l'architecture globale et les contrats d'API partagés.",
      scope: "docs/architecture/, shared/types.ts. (Interdiction de modifier les contrôleurs ou les composants UI).",
      deliverable: "Schémas de composants, interfaces TypeScript, spécifications des routes REST.",
      gate: "Validation des contrats préalable indispensable avant le développement parallèle.",
      collaboration: "Fournit les types au Backend et au Frontend ; valide les propositions techniques."
    },
    backend: {
      name: "Agent Backend",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      role: "Développeur de l'API REST et de la logique serveur",
      mission: "Implémenter les routes Express, la persistance mémoire et les tests unitaires/HTTP.",
      scope: "backend/src/, backend/tests/. (Interdiction stricte de toucher au frontend ou aux bases externes).",
      deliverable: "Contrôleurs Express, services métier, tests Vitest/Supertest, compte rendu.",
      gate: "Toutes les routes doivent répondre avec les codes HTTP appropriés et passer les tests.",
      collaboration: "Informe le Frontend des formats de réponse et le QA des scénarios de test."
    },
    frontend: {
      name: "Agent Frontend",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      role: "Développeur de l'interface utilisateur React / Next.js",
      mission: "Intégrer les composants graphiques, les formulaires, les états de chargement et les appels API.",
      scope: "frontend/src/, frontend/public/. (Interdiction de modifier les routes serveur ou d'inventer des endpoints).",
      deliverable: "Composants React, hooks personnalisés, styles Tailwind, tests frontend.",
      gate: "L'interface doit refléter fidèlement les données de l'API et gérer les erreurs visuellement.",
      collaboration: "Consomme les routes validées par l'Architect et le Backend ; s'aligne avec le QA."
    },
    qa: {
      name: "Agent QA",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      role: "Ingénieur d'assurance qualité et de validation fonctionnelle",
      mission: "Concevoir les scénarios de test, éprouver les cas limites et documenter les anomalies reproductibles.",
      scope: "tests/, scenarios/. (Interdiction absolue de modifier le code de production pour contourner un échec).",
      deliverable: "Plan de tests, rapports d'exécution automatisés, bug reports structurés.",
      gate: "Distinction formelle entre tests exécutés avec succès et tests non réalisés.",
      collaboration: "Alerte le Team Leader et l'agent auteur dès qu'un test échoue."
    },
    reviewer: {
      name: "Agent Reviewer",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      role: "Auditeur de code, de sécurité et de maintenabilité",
      mission: "Examiner chaque git diff avant intégration pour détecter la dette technique, les failles et le hors-périmètre.",
      scope: "Inspection en lecture seule de l'ensemble du projet. (Aucune modification directe du code examiné).",
      deliverable: "Rapport de revue argumenté, matrice de sévérité, recommandations d'optimisation.",
      gate: "Émet un avis consultatif (Favorable / Corrections requises) sans pouvoir de merge.",
      collaboration: "Transmet ses observations techniques au Team Leader et à l'agent auteur."
    }
  };

  const curr = specialistProfiles[activeRole];

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
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 4 — Rédiger les instructions propres à chaque agent
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Si les instructions générales d'AGENTS.md forment la constitution commune de <strong>TaskFlow</strong>, chaque agent doit disposer de sa propre <strong>fiche de mission spécialisée</strong>. Donner les mêmes consignes à tous les agents conduit immanquablement à des empiétements de périmètre, des doublons de code et une dilution complète des responsabilités.
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
              1. Structurer les 7 éléments d'une fiche de rôle
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Définir le rôle, les objectifs, les responsabilités, le périmètre de fichiers, les livrables, les critères d'achèvement et les interactions.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Délimiter les rôles complémentaires (QA vs Reviewer)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguer l'exécution dynamique des scénarios (QA) de l'analyse statique de la maintenabilité et de la sécurité du code (Reviewer).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Verrouiller les limites et interdictions strictes
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interdire à un agent Backend de toucher au frontend, et rappeler le verrou absolu interdisant tout merge ou push sans accord du PM humain.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DE LA MATRICE DES SPÉCIALISTES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Interactif — Fiches de Rôles Spécialisés TaskFlow
              </h3>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold border ${curr.badgeColor}`}>
              {curr.name}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Sélectionnez un profil pour inspecter sa fiche d'instructions détaillée et ses limites opérationnelles :
          </p>

          {/* Sélecteurs de profil */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveRole('leader')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeRole === 'leader' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              1. Team Leader IA
            </button>
            <button
              onClick={() => setActiveRole('architect')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeRole === 'architect' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              2. Architect
            </button>
            <button
              onClick={() => setActiveRole('backend')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeRole === 'backend' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              3. Backend
            </button>
            <button
              onClick={() => setActiveRole('frontend')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeRole === 'frontend' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              4. Frontend
            </button>
            <button
              onClick={() => setActiveRole('qa')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeRole === 'qa' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              5. QA
            </button>
            <button
              onClick={() => setActiveRole('reviewer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeRole === 'reviewer' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              6. Reviewer
            </button>
          </div>

          {/* Fiche d'instructions */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800/90 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {curr.name} — {curr.role}
                </h4>
                <p className="text-xs text-indigo-300 mt-1">{curr.mission}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-xs font-bold text-emerald-300 block mb-1">
                  📁 Périmètre de fichiers autorisé :
                </span>
                <span className="text-xs text-slate-200 font-mono">{curr.scope}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-xs font-bold text-indigo-300 block mb-1">
                  🎯 Livrables concrets attendus :
                </span>
                <span className="text-xs text-slate-200">{curr.deliverable}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-xs font-bold text-amber-300 block mb-1">
                  🏁 Critères stricts d'achèvement :
                </span>
                <span className="text-xs text-slate-200">{curr.gate}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-xs font-bold text-purple-300 block mb-1">
                  🤝 Modalités de collaboration :
                </span>
                <span className="text-xs text-slate-200">{curr.collaboration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4.14 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 4
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez vos connaissances sur la rédaction des fiches spécialisées d'agents (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il indispensable de rédiger des instructions propres à chaque agent ?",
              options: [
                "Pour donner exactement les mêmes responsabilités à tout le monde",
                "Pour préciser le rôle, les livrables attendus et les limites de chaque spécialiste afin d'éviter les doublons et les conflits",
                "Pour supprimer définitivement le fichier AGENTS.md",
                "Pour autoriser les agents à modifier librement tous les fichiers du projet"
              ],
              correctIndex: 1,
              explanation: "Des fiches spécialisées permettent à chaque agent de savoir exactement où intervenir sans déborder sur le travail d'autrui."
            },
            {
              id: 2,
              question: "Quel élément d'une fiche d'instruction décrit les résultats concrets et vérifiables attendus d'un agent ?",
              options: [
                "Son pseudonyme",
                "Ses livrables (fichiers de code, tests, documentation, compte rendu)",
                "Sa conversation",
                "Son historique de chat"
              ],
              correctIndex: 1,
              explanation: "Les livrables sont les artéfacts tangibles évaluables par le Reviewer et le Team Leader."
            },
            {
              id: 3,
              question: "Quelle est la responsabilité première du Team Leader IA ?",
              options: [
                "Développer lui-même l'intégralité du code frontend et backend",
                "Coordonner les agents, organiser les missions et superviser l'avancement",
                "Remplacer le Project Manager humain",
                "Fusionner automatiquement les branches sur main"
              ],
              correctIndex: 1,
              explanation: "Le Team Leader est le chef d'orchestre tactique qui découpe et assigne les tâches."
            },
            {
              id: 4,
              question: "Quel est le rôle fondamental de l'Agent Architect dans TaskFlow ?",
              options: [
                "Définir la cohérence technique, les contrats d'API et l'architecture générale",
                "Exécuter uniquement les tests fonctionnels",
                "Concevoir les boutons CSS",
                "Gérer les mots de passe des utilisateurs"
              ],
              correctIndex: 0,
              explanation: "L'Architect fige les contrats d'interface permettant le travail en parallèle sans collision."
            },
            {
              id: 5,
              question: "Quelle mission relève exclusivement du mandat de l'Agent Backend ?",
              options: [
                "Concevoir les scénarios de recette utilisateur finale",
                "Développer les composants React et les styles Tailwind",
                "Développer les routes de l'API REST, la logique serveur et les tests unitaires/HTTP",
                "Effectuer le merge de la Pull Request"
              ],
              correctIndex: 2,
              explanation: "Le Backend est le maître d'œuvre côté serveur (Express / Node.js)."
            },
            {
              id: 6,
              question: "Quelle mission relève exclusivement du mandat de l'Agent Frontend ?",
              options: [
                "Gérer la persistance en mémoire sur le serveur Express",
                "Concevoir l'interface utilisateur React et assurer les interactions avec l'API REST",
                "Changer l'architecture du projet de manière unilatérale",
                "Pousser le code directement sur main"
              ],
              correctIndex: 1,
              explanation: "Le Frontend conçoit l'expérience visuelle et consomme les endpoints de l'API."
            },
            {
              id: 7,
              question: "Quelle différence majeure distingue le rôle de l'Agent QA de celui de l'Agent Reviewer ?",
              options: [
                "Le QA code le backend et le Reviewer code le frontend",
                "Le QA teste dynamiquement le comportement fonctionnel de l'application, tandis que le Reviewer audite statiquement la qualité et la sécurité du code source",
                "Ils font exactement la même chose au même moment",
                "Le Reviewer est un bot Discord"
              ],
              correctIndex: 1,
              explanation: "QA = exécution des scénarios et tests ; Reviewer = audit statique du patch de code."
            },
            {
              id: 8,
              question: "Si l'Agent Backend souhaite modifier un contrat d'API partagé avec le Frontend, que doit-il faire ?",
              options: [
                "Modifier le fichier en silence sans prévenir personne",
                "Coordonner la modification avec l'Architect, le Team Leader et l'Agent Frontend",
                "Exiger que le Frontend s'adapte sans discussion",
                "Supprimer l'API"
              ],
              correctIndex: 1,
              explanation: "Un contrat partagé engage plusieurs intervenants : toute modification doit être concertée."
            },
            {
              id: 9,
              question: "Quelle affirmation concernant les fiches d'instructions spécialisées est exacte ?",
              options: [
                "Tous les agents doivent avoir des instructions strictement identiques",
                "Les fiches spécialisées annulent et remplacent toutes les règles d'AGENTS.md",
                "Les fiches spécialisées complètent le socle commun d'AGENTS.md en précisant le périmètre propre à chaque métier",
                "Une fiche d'instructions confère automatiquement les droits d'administrateur système"
              ],
              correctIndex: 2,
              explanation: "Les instructions spécifiques s'emboîtent parfaitement sur le socle commun sans le contredire."
            },
            {
              id: 10,
              question: "L'Agent Backend a terminé son développement et ses tests sont au vert. A-t-il le droit d'exécuter un 'git push' sans accord du PM humain ?",
              options: [
                "Oui, dès que les tests réussissent il peut pusher",
                "Oui, si le Team Leader lui demande d'aller vite",
                "Oui, si le Reviewer a validé le code",
                "Non, le push sur une branche protégée exige toujours l'accord explicite et formel du Project Manager humain"
              ],
              correctIndex: 3,
              explanation: "La réussite des tests ne vaut pas autorisation de publication. Seul le PM humain autorise le push."
            }
          ]}
        />
      </section>
    </div>
  );
};
