'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  // Simulateur interactif des espaces de personnalisation Antigravity
  const [activeCategory, setActiveCategory] = useState<'rules' | 'workflows' | 'scope'>('rules');

  const customConfigs = {
    rules: {
      title: "Rules (Règles persistantes)",
      location: ".agents/rules/ ou AGENTS.md",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      description: "Définit des contraintes durables que tous les agents doivent respecter en permanence dans TaskFlow.",
      example: `---
trigger: always_on
---
# Conventions de Code
- Utiliser TypeScript avec typage strict (aucun 'any' implicite).
- Persistance des tâches en mémoire (Map<string, Task>), aucune base SQL.
- Aucun push ou merge sur main sans accord du PM humain.`
    },
    workflows: {
      title: "Workflows (Procédures réutilisables)",
      location: ".agents/workflows/nom-workflow.md",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      description: "Décrit une séquence pas-à-pas d'actions déclenchables à la demande pour standardiser une opération répétitive.",
      example: `### Workflow : Audit de Pull Request
1. Exécuter 'git diff main...feature' pour analyser le patch.
2. Vérifier la conformité du contrat d'API REST.
3. Lancer la suite de tests avec 'npm test'.
4. Compiler le projet avec 'npm run build'.
5. Rédiger le compte rendu d'audit pour le Team Leader.`
    },
    scope: {
      title: "Portée : Globale vs Projet",
      location: "~/.gemini/ (Global) vs taskflow/ (Projet)",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      description: "Distingue les préférences utilisateur valables pour tous vos projets des contraintes architecturales spécifiques à TaskFlow.",
      example: `# Configuration Projet (taskflow/AGENTS.md) :
- Stack imposée : React + Vite (Frontend) et Express (Backend).
- Tests obligatoires avec Vitest et Supertest.
- Règle souveraine du verrou Git réservé au PM.`
    }
  };

  const curr = customConfigs[activeCategory];

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
          Chapitre 1 — Découvrir la configuration des agents dans Google Antigravity
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Google Antigravity permet de travailler avec des agents IA capables d'inspecter un code source, d'exécuter des commandes et de concevoir des architectures complètes. Cependant, un agent ne devine pas spontanément les règles et conventions de votre application <strong>TaskFlow</strong>. Sans un cadrage rigoureux combinant <strong>Rules</strong>, <strong>Workflows</strong> et <strong>Permissions</strong>, les agents risquent de produire du code incohérent ou d'outrepasser leur périmètre.
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
              1. Identifier les mécanismes de configuration d'Antigravity
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguer les paramètres d'environnement, les Rules persistantes, les Workflows réutilisables et les profils de permissions.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Séparer Configuration Globale et Configuration de Projet
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conserver les préférences utilisateur générales dans l'environnement global et ancrer la stack technique de TaskFlow à la racine du projet.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Comprendre les limites fondamentales de la configuration
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Intégrer qu'une instruction textuelle ne remplace jamais les tests automatisés ni la gouvernance souveraine du Project Manager humain.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1.2 : LES MÉCANISMES DE PERSONNALISATION
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.2
            </span>
            Les mécanismes de configuration dans Google Antigravity
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Les outils mis à disposition pour adapter l'IA aux exigences de TaskFlow
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-900 font-bold">
              <tr>
                <th className="pb-3 pr-4">Mécanisme</th>
                <th className="pb-3 pr-4">Nature</th>
                <th className="pb-3">Rôle dans le projet TaskFlow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Rules (Règles)</td>
                <td className="py-2.5 pr-4">Directives persistantes</td>
                <td className="py-2.5">Imposer TypeScript strict, interdire l'ajout de bases de données SQL externes.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Workflows</td>
                <td className="py-2.5 pr-4">Procédures séquentielles</td>
                <td className="py-2.5">Décrire la recette d'audit d'une fonctionnalité avant proposition de merge.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">AGENTS.md</td>
                <td className="py-2.5 pr-4">Socle documentaire central</td>
                <td className="py-2.5">Fichier racine découvert automatiquement, définissant la stack et le verrou Git.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Permissions</td>
                <td className="py-2.5 pr-4">Contrôle d'accès technique</td>
                <td className="py-2.5">Encadrer l'accès au terminal shell, au réseau et aux fichiers hors workspace.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DU PANNEAU CUSTOMIZATIONS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur — Panneau Customizations d'Antigravity
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Agent Settings
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Sélectionnez un onglet pour examiner son emplacement sur le disque, sa syntaxe et son impact sur les décisions des agents :
          </p>

          {/* Boutons d'exploration */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory('rules')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'rules' ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              1. Rules (Règles)
            </button>
            <button
              onClick={() => setActiveCategory('workflows')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'workflows' ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              2. Workflows (Procédures)
            </button>
            <button
              onClick={() => setActiveCategory('scope')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'scope' ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              3. Portée (Globale vs Projet)
            </button>
          </div>

          {/* Panneau de détail */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800/90 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold border ${curr.badgeColor}`}>
                  {curr.title}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-2">
                  Emplacement sur le disque : <code className="text-emerald-400">{curr.location}</code>
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200">
              {curr.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold block mb-1">Exemple concret TaskFlow :</span>
              <pre className="whitespace-pre-wrap">{curr.example}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1.7 : DISTINGUER GLOBAL ET PROJET
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.7
            </span>
            Distinguer la configuration globale de la configuration de projet
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              1. Configuration Globale (~/.gemini/ ou Paramètres Utilisateur)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              S'applique à <strong>tous vos projets</strong> sur votre machine. Idéale pour vos préférences personnelles de communication (ex: style de réponse concis, langue française, formatage des commits). Ne doit jamais contenir de règles spécifiques à TaskFlow.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              2. Configuration de Projet (taskflow/AGENTS.md)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Strictement ancrée dans le dépôt Git de TaskFlow. Elle impose la stack (React + Express + TypeScript), la persistance en mémoire, les routes d'API et le verrou Git souverain du PM.
            </p>
          </div>
        </div>

        <Callout type="danger" title="Règle d'or : La configuration ne remplace pas la validation">
          <p className="text-xs sm:text-sm leading-relaxed">
            Même avec un fichier d'instructions parfait, un agent peut mal interpréter un cas limite ou halluciner une dépendance. <strong>Le Project Manager humain conserve la décision finale et valide formellement chaque livraison.</strong>
          </p>
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 1.12 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 1
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez vos connaissances sur la configuration des agents dans Google Antigravity (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif premier de la configuration des agents dans un projet logiciel ?",
              options: [
                "Augmenter magiquement la vitesse du processeur",
                "Adapter le comportement des agents aux exigences, conventions et règles architecturales du projet",
                "Remplacer les tests unitaires et la relecture de code",
                "Supprimer tout besoin de supervision humaine"
              ],
              correctIndex: 1,
              explanation: "Configurer un agent permet d'encadrer ses décisions pour qu'il respecte les conventions du projet."
            },
            {
              id: 2,
              question: "Quelle distinction fondamentale existe-t-il entre un Agent et une Conversation dans Antigravity ?",
              options: [
                "L'agent est l'acteur IA intervenant, tandis que la conversation conserve le fil d'échange et son contexte",
                "L'agent est un fichier physique et la conversation une branche Git",
                "L'agent représente GitHub et la conversation le disque dur",
                "Les deux termes sont synonymes"
              ],
              correctIndex: 0,
              explanation: "L'agent est l'entité intelligente opérant dans un contexte d'échange délimité par la session de conversation."
            },
            {
              id: 3,
              question: "Dans Google Antigravity, quel est le rôle premier des Rules ?",
              options: [
                "Créer automatiquement des branches Git",
                "Lancer les tests en continu à chaque frappe",
                "Définir des consignes, conventions et contraintes persistantes pour les agents",
                "Supprimer les fichiers temporaires"
              ],
              correctIndex: 2,
              explanation: "Les Rules fournissent des directives permanentes que l'agent intègre dans son contexte de décision."
            },
            {
              id: 4,
              question: "Quel est le rôle principal d'un Workflow dans Antigravity ?",
              options: [
                "Décrire une procédure séquentielle réutilisable pour standardiser une opération",
                "Définir les mots de passe de la base de données",
                "Remplacer le dépôt Git",
                "Créer une nouvelle machine virtuelle"
              ],
              correctIndex: 0,
              explanation: "Un Workflow formalise une suite ordonnée d'étapes (ex: recette d'audit de Pull Request)."
            },
            {
              id: 5,
              question: "Une règle configurée au niveau Global (~/.gemini/) s'applique à :",
              options: [
                "Un seul fichier JavaScript",
                "Une seule conversation de chat",
                "L'ensemble des projets ouverts dans l'environnement de l'utilisateur",
                "Uniquement à l'agent Backend"
              ],
              correctIndex: 2,
              explanation: "La portée globale couvre tous les workspaces gérés par l'utilisateur."
            },
            {
              id: 6,
              question: "Où doit-on placer la règle imposant TypeScript et la persistance en mémoire pour TaskFlow ?",
              options: [
                "Dans la configuration globale de tous vos projets",
                "Dans la configuration propre au projet TaskFlow (taskflow/AGENTS.md)",
                "Dans un fichier temporaire de la corbeille",
                "Dans un message de commit Git"
              ],
              correctIndex: 1,
              explanation: "Les choix techniques spécifiques à une application doivent être scellés au niveau du projet."
            },
            {
              id: 7,
              question: "Pourquoi est-il nécessaire de distinguer les consignes générales des consignes spécialisées par rôle ?",
              options: [
                "Pour supprimer toute responsabilité aux agents",
                "Pour permettre à chaque agent de coder dans un langage différent",
                "Pour appliquer un cadre commun à tous tout en précisant le mandat exact de chaque spécialiste",
                "Pour interdire aux agents de communiquer"
              ],
              correctIndex: 2,
              explanation: "Les règles générales garantissent l'harmonie globale et les règles de rôles évitent les chevauchements."
            },
            {
              id: 8,
              question: "La configuration d'un agent garantit-elle que son code produit sera infaillible à 100% ?",
              options: [
                "Oui, dès lors qu'il y a plus de 5 règles",
                "Oui, si l'on utilise un Workflow",
                "Non, des erreurs ou mauvaises interprétations restent possibles ; la supervision et les tests restent indispensables",
                "Oui, pour les projets TypeScript uniquement"
              ],
              correctIndex: 2,
              explanation: "La configuration guide l'agent mais ne remplace ni les tests automatisés ni le contrôle humain."
            },
            {
              id: 9,
              question: "Dans l'équipe TaskFlow, qui conserve la responsabilité souveraine des validations et arbitrages ?",
              options: [
                "L'Agent Backend",
                "L'Agent QA",
                "Le Project Manager humain",
                "Le compilateur Vite"
              ],
              correctIndex: 2,
              explanation: "Le PM humain est le garant souverain des décisions critiques et des fusions sur la branche main."
            },
            {
              id: 10,
              question: "Quelle méthode est la plus saine pour configurer une équipe multi-agents spécialisée ?",
              options: [
                "Donner exactement le même prompt monolithique de 50 pages à tous les agents",
                "Définir un socle commun (AGENTS.md) complété par des fiches de rôles et des règles de périmètre ciblées",
                "Laisser chaque agent inventer sa propre architecture",
                "Ne configurer que l'agent Backend"
              ],
              correctIndex: 1,
              explanation: "Structurer un socle commun complété par des règles spécialisées garantit clarté et maintenabilité."
            }
          ]}
        />
      </section>
    </div>
  );
};
