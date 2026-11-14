'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  // Simulateur interactif d'audit de PR et détection d'anomalies
  const [selectedVerdict, setSelectedVerdict] = useState<'none' | 'approve' | 'reject'>('none');
  const [activeTab, setActiveTab] = useState<'diff' | 'scope' | 'tests'>('diff');

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 3 — Maîtrise de Git pour le multi-agents
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 8 — Contrôler les modifications réalisées par les agents
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Un agent d'intelligence artificielle est capable de générer des centaines de lignes de code en quelques secondes. Mais rapidité ne signifie pas justesse. Sans un protocole de revue rigoureux basé sur les commandes <code>git diff</code>, <code>git show</code> et les tests automatisés, des régressions subtiles, des modifications hors périmètre ou des failles de sécurité peuvent s'infiltrer dans votre projet.
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
              1. Auditer les branches avec git diff triple-points (main...feature)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Examiner précisément les modifications introduites par une branche de travail depuis son point exact de divergence avec <code>main</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Détecter les modifications hors périmètre et les failles
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vérifier l'étanchéité de la mission (absence de modification de fichiers système, secrets hardcodés ou altération de tests).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Structurer la décision de revue (Favorable vs Corrections demandées)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguer l'avis consultatif de l'Agent Reviewer de l'autorisation d'intégration souveraine réservée au Project Manager humain.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 8.2 & 8.5 : LA MÉTHODE D'INSPECTION GIT DIFF TRIPLE-POINTS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Examiner les modifications entre deux branches : La notation triple-points
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Isoler le travail de l'agent sans être pollué par les évolutions de main
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour auditer une branche de mission avant toute fusion, Git offre une commande spécialement adaptée aux revues de code :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900 font-mono">
                git diff main...feature/task-api
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                Triple-points (...)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Compare la branche de travail avec son <strong>point de divergence</strong> (l'ancêtre commun) par rapport à <code>main</code>. Elle n'affiche que les modifications apportées par l'agent, ignorant les commits ajoutés sur <code>main</code> par les autres membres de l'équipe entre-temps.
            </p>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300">
              $ git log main..feature/task-api --oneline<br />
              <span className="text-emerald-400">a8f31c2 feat(backend): add task creation controller</span><br />
              <span className="text-emerald-400">7c21d90 test(api): add task endpoint tests</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DE REVUE DE CODE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Atelier Audit — Contrôler la PR #12 de l'Agent Backend
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Rôle : Agent Reviewer & PM
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            L'agent Backend a soumis la branche <code>feature/task-api</code> avec la mission : <em>"Créer l'API REST de gestion des tâches sans modifier le frontend ni la configuration générale"</em>. Inspectez les onglets pour détecter les éventuelles anomalies :
          </p>

          {/* Onglets d'audit */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('diff')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'diff' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              1. git diff main...feature (Code)
            </button>
            <button
              onClick={() => setActiveTab('scope')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'scope' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              2. Périmètre des fichiers touchés
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'tests' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              3. Résultats des vérifications (Tests & Build)
            </button>
          </div>

          {/* Panneau de l'onglet actif */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 font-mono text-xs text-slate-300 space-y-3 mb-6">
            {activeTab === 'diff' && (
              <div className="space-y-3">
                <div className="text-slate-400 font-bold">--- a/src/controllers/task.controller.ts</div>
                <div className="text-emerald-400">+ export async function createTask(req: Request, res: Response) &#123;</div>
                <div className="text-emerald-400">+   const task = await taskService.create(req.body);</div>
                <div className="text-emerald-400">+   return res.status(201).json(task);</div>
                <div className="text-emerald-400">+ &#125;</div>

                <div className="text-slate-400 font-bold mt-3">--- a/src/config/security.ts</div>
                <div className="text-rose-400 font-bold bg-rose-950/40 p-2 rounded border border-rose-800/60">
                  + const STRIPE_SECRET = "sk_live_98374289347923487293"; // Clé secrète hardcodée !
                </div>
              </div>
            )}

            {activeTab === 'scope' && (
              <div className="space-y-2">
                <span className="text-indigo-300 font-bold block mb-1">
                  Fichiers modifiés dans cette branche (git diff --name-only main...feature) :
                </span>
                <div className="text-emerald-400">✓ src/controllers/task.controller.ts (Dans le périmètre backend)</div>
                <div className="text-emerald-400">✓ src/services/task.service.ts (Dans le périmètre backend)</div>
                <div className="text-rose-400 font-bold bg-rose-950/40 p-2 rounded border border-rose-800/60">
                  ❌ vite.config.ts (HORS PÉRIMÈTRE ! L'agent a touché à la configuration globale frontend)
                </div>
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="space-y-2">
                <div className="text-emerald-400">✓ Vitest : 6/6 tests unitaires backend passés</div>
                <div className="text-amber-400">⚠️ TypeScript : 1 warning de type 'any' non explicite dans task.service.ts:24</div>
                <div className="text-rose-400 font-bold bg-rose-950/40 p-2 rounded border border-rose-800/60">
                  ❌ Git Audit : Clé d'API sensible détectée dans les fichiers du repo
                </div>
              </div>
            )}
          </div>

          {/* Formuler la décision */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
            <span className="text-xs font-bold text-white block">
              En tant que Reviewer / PM humain, quelle décision prenez-vous ?
            </span>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedVerdict('approve')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
              >
                Valider et autoriser le merge (Revue favorable)
              </button>
              <button
                onClick={() => setSelectedVerdict('reject')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600 text-white transition-colors"
              >
                Rejeter avec demande de corrections précises
              </button>
            </div>

            {selectedVerdict === 'approve' && (
              <div className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs">
                🚨 <strong>ERREUR GRAVE D'AUDIT :</strong> Vous avez validé une Pull Request contenant une clé secrète hardcodée (faille de sécurité critique) et une modification de <code>vite.config.ts</code> qui n'avait rien à faire dans cette mission !
              </div>
            )}

            {selectedVerdict === 'reject' && (
              <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs space-y-1">
                ✓ <strong>EXCELLENT RÉFLEXE D'AUDIT :</strong> Vous avez bloqué la fusion. L'Agent Backend doit obligatoirement :
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>Supprimer la clé secrète et utiliser des variables d'environnement (<code>.env</code>).</li>
                  <li>Annuler la modification de <code>vite.config.ts</code> qui sortait de son mandat.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8.16 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 8
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez votre méthodologie de contrôle des contributions d'agents IA (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il indispensable de contrôler scrupuleusement les modifications produites par un agent IA ?",
              options: [
                "Pour supprimer automatiquement les erreurs sans intervention",
                "Pour vérifier que le travail respecte la mission, ne déborde pas du périmètre et ne provoque aucune régression",
                "Pour éviter d'avoir à utiliser Git dans l'équipe",
                "Pour remplacer complètement les tests unitaires"
              ],
              correctIndex: 1,
              explanation: "Un agent IA peut produire du code syntaxiquement correct mais comportant des erreurs logiques, des failles ou des modifications hors périmètre."
            },
            {
              id: 2,
              question: "Quelle commande donne une vue d'ensemble rapide de l'état du dépôt ?",
              options: [
                "git status",
                "git clone",
                "git push",
                "git init"
              ],
              correctIndex: 0,
              explanation: "git status indique la branche courante, les fichiers modifiés et l'état de la zone de staging."
            },
            {
              id: 3,
              question: "Quelle commande affiche les modifications qui ne sont PAS encore préparées dans le staging ?",
              options: [
                "git diff --staged",
                "git log",
                "git diff",
                "git show"
              ],
              correctIndex: 2,
              explanation: "git diff sans paramètre compare le répertoire de travail avec la zone de préparation."
            },
            {
              id: 4,
              question: "Quelle commande permet d'examiner précisément ce qui va faire partie du prochain commit ?",
              options: [
                "git diff --staged",
                "git status --branch",
                "git branch",
                "git pull"
              ],
              correctIndex: 0,
              explanation: "git diff --staged examine les fichiers placés dans l'index via git add."
            },
            {
              id: 5,
              question: "Que permet généralement d'examiner la commande 'git diff main...feature/task-api' ?",
              options: [
                "Les différences de contenu introduites par la branche de travail depuis son point exact de divergence avec main",
                "Tous les fichiers du dépôt distant GitHub",
                "Les commits supprimés de la corbeille Git",
                "Le rapport des tests automatisés"
              ],
              correctIndex: 0,
              explanation: "La syntaxe triple-points est la référence pour auditer les changements propres à une branche de fonctionnalité."
            },
            {
              id: 6,
              question: "Pourquoi faut-il comparer la liste des fichiers modifiés avec la mission initiale confiée à l'agent ?",
              options: [
                "Pour compter le nombre exact de caractères",
                "Pour s'assurer que l'agent a respecté le périmètre et n'a pas altéré des fichiers hors de son mandat (ex: config, autres modules)",
                "Pour supprimer automatiquement tous les fichiers tiers",
                "Pour se dispenser de toute relecture"
              ],
              correctIndex: 1,
              explanation: "Un agent Backend qui modifie des fichiers frontend sans consigne doit immédiatement être interrogé avant toute fusion."
            },
            {
              id: 7,
              question: "Un build réussi (ex: 'npm run build' passe) garantit-il que le code de l'agent est exempt de défauts ?",
              options: [
                "Oui, la compilation prouve que l'application est parfaite",
                "Non, il vérifie simplement la validité syntaxique et la construction des paquets, mais ne garantit pas la conformité fonctionnelle",
                "Oui, si le code a été rédigé en TypeScript",
                "Non, car le build ne sert à rien dans un projet logiciel"
              ],
              correctIndex: 1,
              explanation: "La compilation n'évalue ni la logique métier, ni les failles de sécurité, ni les régressions fonctionnelles."
            },
            {
              id: 8,
              question: "Quel est le rôle précis de l'Agent Reviewer dans l'organisation ?",
              options: [
                "Autoriser tous les merges sans consulter le PM",
                "Remplacer le travail des développeurs",
                "Examiner le code, analyser les risques, auditer les diffs et émettre une recommandation argumentée",
                "Gérer seul le serveur distant"
              ],
              correctIndex: 2,
              explanation: "Le Reviewer a un rôle d'audit et de conseil critique. Il n'a pas le pouvoir de valider la livraison finale."
            },
            {
              id: 9,
              question: "Que doit faire un Reviewer lorsqu'il manque des résultats de tests ou des spécifications d'API ?",
              options: [
                "Valider aveuglément pour ne pas bloquer le sprint",
                "Ignorer ces éléments",
                "Déclarer la revue impossible à conclure et exiger les pièces manquantes avant de trancher",
                "Supprimer immédiatement la branche"
              ],
              correctIndex: 2,
              explanation: "Une revue ne peut être favorable par défaut. Sans preuve d'exécution des tests, la décision reste suspendue."
            },
            {
              id: 10,
              question: "Dans l'organisation TaskFlow, qui conserve la responsabilité souveraine de l'autorisation d'intégration finale dans main ?",
              options: [
                "L'Agent Backend",
                "L'Agent QA",
                "L'Agent Reviewer",
                "Le Project Manager humain"
              ],
              correctIndex: 3,
              explanation: "Le PM humain est le seul habilité à valider définitivement la livraison et à signer l'opération de fusion."
            }
          ]}
        />
      </section>
    </div>
  );
};
