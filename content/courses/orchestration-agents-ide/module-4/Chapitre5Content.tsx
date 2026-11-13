'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // Simulateur de prompt de cadrage et vérification d'espace
  const [selectedAgentRole, setSelectedAgentRole] = useState<'backend' | 'frontend' | 'qa'>('backend');
  const [verificationDone, setVerificationDone] = useState<boolean>(false);

  const rolesConfig = {
    backend: {
      title: "Agent Backend",
      color: "bg-blue-100 text-blue-800 border-blue-300",
      worktreePath: "/projects/taskflow-backend",
      branch: "feature/backend-api",
      scope: "backend/src/routes/, backend/src/services/",
      forbidden: "frontend/, package.json, main branch",
      deliverable: "backend-api.md + routes Express"
    },
    frontend: {
      title: "Agent Frontend",
      color: "bg-purple-100 text-purple-800 border-purple-300",
      worktreePath: "/projects/taskflow-frontend",
      branch: "feature/frontend-ui",
      scope: "frontend/src/components/, frontend/src/hooks/",
      forbidden: "backend/, shared/types.ts sans accord",
      deliverable: "frontend-ui.md + composants React"
    },
    qa: {
      title: "Agent QA",
      color: "bg-emerald-100 text-emerald-800 border-emerald-300",
      worktreePath: "/projects/taskflow-qa",
      branch: "test/taskflow-tests",
      scope: "tests/, scenarios/",
      forbidden: "Code applicatif backend ou frontend",
      deliverable: "test-plan.md + suites de tests"
    }
  };

  const curr = rolesConfig[selectedAgentRole];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 4 — Git Worktrees et parallélisme
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 5 — Associer un agent à son espace de travail
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Disposer de plusieurs dossiers Worktrees sur son disque ne sert à rien si les agents IA ne savent pas exactement où intervenir. Affecter un agent à un espace de travail consiste à lui injecter un <strong>cadrage d'instructions strict</strong> définissant son dossier racine physique, sa branche active, les répertoires autorisés et les barrières infranchissables de sécurité.
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
              1. Structurer la Fiche d'Affectation de Mission
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rédiger un mandat clair contenant le chemin absolu du Worktree, la branche Git, les autorisations et les interdictions formelles.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Vérifier l'ancrage de l'agent (pwd & branch)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Exécuter un sanity check (<code>pwd</code> et <code>git branch --show-current</code>) avant d'autoriser la première modification de code.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Gérer la transmission ou reprise de mission
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transférer un Worktree à un nouvel agent sans perdre les modifications non commitées ni altérer l'historique de la branche.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 5.6 : LE GABARIT D'INSTRUCTION OFFICIEL
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              5.6
            </span>
            Gabarit officiel d'instructions pour affectation de Worktree
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Le modèle d'instructions injecté dans le prompt système de chaque agent
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour éviter toute ambiguïté, l'environnement de développement ou le Team Leader IA transmet ce gabarit structuré à l'agent lors de son initialisation :
        </p>

        {/* SIMULATEUR DE FICHE DE MISSION ET SANITY CHECK */}
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Générateur de Mandat & Sanity Check
              </h3>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold border ${curr.color}`}>
              {curr.title}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Choisissez un rôle d'agent pour générer sa fiche de mission et lancer la vérification de son ancrage physique dans l'IDE :
          </p>

          {/* Sélecteur de rôle */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => { setSelectedAgentRole('backend'); setVerificationDone(false); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAgentRole === 'backend' ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Agent Backend
            </button>
            <button
              onClick={() => { setSelectedAgentRole('frontend'); setVerificationDone(false); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAgentRole === 'frontend' ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Agent Frontend
            </button>
            <button
              onClick={() => { setSelectedAgentRole('qa'); setVerificationDone(false); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAgentRole === 'qa' ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Agent QA
            </button>
          </div>

          {/* Mandat généré */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 font-mono text-xs text-slate-300 space-y-2 mb-6">
            <div className="text-indigo-400 font-bold uppercase tracking-wider"># MANDAT D'AFFECTATION OFFICIEL</div>
            <div><strong>RÔLE :</strong> {curr.title}</div>
            <div><strong>ESPACE PHYSIQUE ASSIGNÉ :</strong> <span className="text-emerald-400">{curr.worktreePath}</span></div>
            <div><strong>BRANCHE GIT ACTIVE :</strong> <span className="text-indigo-300">{curr.branch}</span></div>
            <div><strong>PÉRIMÈTRE AUTORISÉ :</strong> {curr.scope}</div>
            <div className="text-rose-400"><strong>INTERDICTIONS STRICTES :</strong> {curr.forbidden} | Aucun merge/rebase/push sans accord PM.</div>
            <div><strong>LIVRABLE ATTENDU :</strong> {curr.deliverable}</div>
          </div>

          {/* Test d'ancrage */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-white">
                Vérification d'ancrage par l'agent (Sanity Check CLI) :
              </span>
              <button
                onClick={() => setVerificationDone(true)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Exécuter pwd & git branch
              </button>
            </div>

            {verificationDone && (
              <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-400 border border-emerald-800/40 space-y-1">
                <div>$ pwd &rarr; {curr.worktreePath}</div>
                <div>$ git branch --show-current &rarr; {curr.branch}</div>
                <div className="text-slate-300 pt-1">
                  ✓ Ancrage validé à 100% : L'agent intervient dans le bon répertoire sans risque de pollution croisée.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5.13 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 5
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez vos compétences sur l'affectation et le contrôle des espaces de travail (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il indispensable d'associer un Worktree précis à chaque agent ?",
              options: [
                "Pour créer automatiquement un dépôt distant",
                "Pour donner à chaque agent un répertoire de travail clairement délimité et éviter les écrasements de fichiers",
                "Pour supprimer définitivement le besoin de branches",
                "Pour remplacer les conversations de chat"
              ],
              correctIndex: 1,
              explanation: "Attribuer un worktree précis permet à chaque agent d'éditer ses fichiers sans perturber le répertoire d'un autre agent."
            },
            {
              id: 2,
              question: "Quelle information permet à l'agent d'identifier sans équivoque son répertoire de travail ?",
              options: [
                "Le nom du modèle IA uniquement",
                "Le chemin complet (absolu ou relatif) du Worktree sur le disque dur",
                "Le lien de la documentation officielle de React",
                "Le message du dernier commit uniquement"
              ],
              correctIndex: 1,
              explanation: "Le chemin complet évite toute confusion lorsque plusieurs dossiers ou fenêtres de projet sont ouverts."
            },
            {
              id: 3,
              question: "Quelle commande shell permet à l'agent de vérifier son répertoire de travail courant ?",
              options: [
                "git status",
                "git log",
                "pwd",
                "git branch"
              ],
              correctIndex: 2,
              explanation: "pwd (print working directory) affiche le chemin absolu du dossier actif."
            },
            {
              id: 4,
              question: "Quelle commande Git permet d'afficher directement le nom de la branche active sans détails superflus ?",
              options: [
                "git branch --show-current",
                "git worktree remove",
                "git clone",
                "git diff"
              ],
              correctIndex: 0,
              explanation: "git branch --show-current retourne uniquement le nom textuel de la branche active."
            },
            {
              id: 5,
              question: "Git Worktrees affecte-t-il automatiquement chaque agent IA à son répertoire sans intervention humaine ou système ?",
              options: [
                "Oui, toujours de façon autonome",
                "Non, l'affectation doit être configurée dans l'environnement de développement et stipulée dans le prompt"
              ],
              correctIndex: 1,
              explanation: "Git crée les dossiers physiques ; l'IDE et les instructions d'orchestration dirigent l'agent vers le bon espace."
            },
            {
              id: 6,
              question: "Que doit contenir une instruction d'affectation rigoureuse pour un agent ?",
              options: [
                "Uniquement son pseudonyme",
                "La mission, le chemin du Worktree, la branche, les limites de périmètre et les livrables attendus",
                "Uniquement le nom de la branche principale main",
                "Une formule de politesse uniquement"
              ],
              correctIndex: 1,
              explanation: "Une fiche de cadrage complète élimine les ambiguïtés et verrouille le périmètre d'action de l'agent."
            },
            {
              id: 7,
              question: "Avant de transférer une mission à un autre agent dans le même Worktree, que faut-il vérifier en priorité ?",
              options: [
                "Uniquement la couleur de fond de l'IDE",
                "L'état des modifications en cours, les commits existants et le contexte de la mission pour ne rien perdre",
                "Le nombre de fichiers dans la corbeille",
                "Le nom du serveur web"
              ],
              correctIndex: 1,
              explanation: "Transférer un worktree sans vérifier git status risque de faire écraser des modifications non commitées par le nouvel agent."
            },
            {
              id: 8,
              question: "Quelle commande permet de consulter rapidement les 5 derniers commits d'une branche de travail ?",
              options: [
                "git status",
                "pwd",
                "git log --oneline -5",
                "git worktree add"
              ],
              correctIndex: 2,
              explanation: "L'option -5 de git log limite l'affichage aux cinq commits les plus récents."
            },
            {
              id: 9,
              question: "Quel est le rôle du Team Leader IA dans l'affectation des Worktrees ?",
              options: [
                "Coordonner les missions, affecter les espaces et veiller au respect des périmètres",
                "Remplacer les développeurs en codant tout lui-même",
                "Autoriser les merges sans supervision",
                "Effacer les fichiers de test"
              ],
              correctIndex: 0,
              explanation: "Le Team Leader centralise l'attribution et assure la cohérence d'ensemble."
            },
            {
              id: 10,
              question: "Qui conserve le contrôle souverain des décisions importantes et des autorisations d'intégration ?",
              options: [
                "L'Agent Backend",
                "L'Agent QA",
                "Le Project Manager humain",
                "Git Worktrees"
              ],
              correctIndex: 2,
              explanation: "Le PM humain est le seul garant légitime de l'architecture et valide formellement la livraison finale."
            }
          ]}
        />
      </section>
    </div>
  );
};
