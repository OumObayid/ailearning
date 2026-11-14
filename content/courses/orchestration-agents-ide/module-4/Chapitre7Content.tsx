'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // Simulateur de résolution de conflit entre Worktrees
  const [resolutionStep, setResolutionStep] = useState<'detected' | 'arbitrated' | 'resolved'>('detected');

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
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 7 — Gérer les modifications et les conflits entre espaces de travail
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Travailler dans des répertoires Worktrees hermétiques élimine les écrasements directs de fichiers pendant le sprint. Mais les branches continuent de partager le même dépôt Git. Dès lors que deux agents modifient les mêmes déclarations dans un fichier commun, la réconciliation de leurs travaux lors de l'intégration déclenche des <strong>conflits Git</strong> ou des <strong>incompatibilités fonctionnelles</strong> qu'il faut savoir arbitrer avec méthode.
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
              1. Identifier les modifications concurrentes entre Worktrees
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Utiliser <code>git diff main...branche</code> pour repérer les fichiers communs touchés par plusieurs agents en parallèle.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Distinguer conflit textuel Git et incompatibilité fonctionnelle
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprendre pourquoi une fusion sans conflit peut quand même casser l'application si les contrats de routes sont divergents.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Conduire la résolution méthodique en 6 étapes
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supprimer les marqueurs de conflit, unifier les structures de données selon l'arbitrage du PM et sceller la fusion avec <code>git merge --continue</code>.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 7.4 : CONFLIT GIT VS INCOMPATIBILITÉ FONCTIONNELLE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Conflit textuel Git vs Incompatibilité fonctionnelle
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pourquoi le feu vert de Git ne suffit jamais à certifier la validité du projet
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                1. Le Conflit Git (Erreur d'intégration de texte)
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-rose-100 text-rose-800 shrink-0">
                Bloquant Git
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Survient lorsque deux branches ont modifié exactement les mêmes lignes de code d'un fichier. Git interrompt l'opération et insère des marqueurs (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>) pour demander un choix explicite.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                2. L'Incompatibilité fonctionnelle (Bug logique invisible à Git)
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-100 text-amber-800 shrink-0">
                Pervers & Subtil
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              Survient lorsque l'Agent Backend renomme l'endpoint en <code>/api/v1/tasks</code> et que l'Agent Frontend appelle <code>/api/tasks</code>. Comme ils touchent des fichiers différents, <strong>Git fusionne à 100% sans aucun conflit</strong>. Cependant, l'application est totalement cassée au runtime !
            </p>
            <div className="p-2.5 bg-amber-50 rounded-lg text-xs text-amber-900 font-semibold">
              Règle : Seuls les tests d'intégration du QA et l'audit du Reviewer permettent de déceler les incompatibilités fonctionnelles.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF D'ARBITRAGE DE CONFLIT
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Atelier Résolution — Conflit sur taskflow-contract.md
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Arbitrage Métier
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Backend a proposé <code>todo, in_progress, done</code> dans son Worktree, tandis que Frontend a proposé <code>À faire, En cours, Terminée</code> dans le sien. Expérimentez la résolution :
          </p>

          {/* Stepper */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setResolutionStep('detected')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${resolutionStep === 'detected' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              1. Conflit détecté lors du merge
            </button>
            <button
              onClick={() => setResolutionStep('arbitrated')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${resolutionStep === 'arbitrated' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              2. Arbitrage fonctionnel (PM)
            </button>
            <button
              onClick={() => setResolutionStep('resolved')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${resolutionStep === 'resolved' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              3. Fichier résolu & Commit scellé
            </button>
          </div>

          {/* Panneau de résolution */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 font-mono text-xs text-slate-300 space-y-4">
            {resolutionStep === 'detected' && (
              <div className="space-y-3">
                <div className="text-rose-400 font-bold">CONFLICT (content): Merge conflict in taskflow-contract.md</div>
                <div className="p-3 bg-slate-900 rounded-lg border border-rose-500/40 text-slate-200">
                  <span className="text-rose-400 font-bold">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Backend)</span><br />
                  <span>Statuts autorisés : todo, in_progress, done.</span><br />
                  <span className="text-slate-500 font-bold">=======</span><br />
                  <span>Statuts autorisés : À faire, En cours, Terminée.</span><br />
                  <span className="text-blue-400 font-bold">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/frontend-ui</span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Git est bloqué car les deux agents ont remplacé la même ligne par deux contenus incompatibles.
                </p>
              </div>
            )}

            {resolutionStep === 'arbitrated' && (
              <div className="space-y-3 font-sans">
                <span className="text-amber-300 font-bold text-xs block">
                  Décision d'Architecture du Project Manager humain :
                </span>
                <p className="text-xs text-slate-300">
                  Les deux propositions sont justifiées ! Il faut dissocier les <strong>valeurs techniques</strong> (utilisées par l'API et la base) des <strong>libellés d'affichage</strong> (affichés aux utilisateurs dans l'interface React).
                </p>
                <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-300 border border-indigo-700">
                  # taskflow-contract.md (Version arbitrée)<br />
                  Valeurs techniques : todo | in_progress | done<br />
                  Libellés UI :<br />
                  - todo : "À faire"<br />
                  - in_progress : "En cours"<br />
                  - done : "Terminée"
                </div>
              </div>
            )}

            {resolutionStep === 'resolved' && (
              <div className="space-y-2">
                <div className="text-emerald-400 font-bold">$ git add taskflow-contract.md && git merge --continue</div>
                <div className="text-slate-300">
                  ✓ Conflit résolu sans perte d'intention métier !<br />
                  Commit de fusion enregistré sur <code>main</code> avec la bénédiction formelle du PM humain.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.15 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 7
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez vos réflexes sur la gestion des conflits entre Worktrees (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Que partagent les Worktrees attachés à un même dépôt Git ?",
              options: [
                "Leurs répertoires de travail physiques",
                "Les objets Git (.git/objects) et les références communes du dépôt",
                "Leurs fichiers modifiés non commités",
                "Leurs terminaux shell"
              ],
              correctIndex: 1,
              explanation: "Les worktrees partagent la base centrale de commits et d'objets, mais isolent l'index et les fichiers disques."
            },
            {
              id: 2,
              question: "Les modifications non enregistrées d'un Worktree apparaissent-elles automatiquement dans les autres Worktrees ?",
              options: [
                "Oui, immédiatement",
                "Non, elles restent strictement confinées au répertoire de travail physique concerné",
                "Oui, après un git status",
                "Uniquement si l'agent est connecté à Internet"
              ],
              correctIndex: 1,
              explanation: "Tant qu'un fichier n'est pas commité, il n'existe que dans le répertoire physique de son auteur."
            },
            {
              id: 3,
              question: "Deux agents travaillant dans des Worktrees hermétiques peuvent-ils provoquer un conflit Git lors de l'intégration ?",
              options: [
                "Oui, lors de la fusion de leurs branches respectives s'ils ont modifié les mêmes lignes d'un fichier commun",
                "Non, les Worktrees empêchent définitivement tous les conflits"
              ],
              correctIndex: 0,
              explanation: "L'isolation au moment de coder n'empêche pas les conflits logiques lorsque Git tente de réunir les deux branches."
            },
            {
              id: 4,
              question: "Quelle affirmation distingue correctement un conflit Git d'une incompatibilité fonctionnelle ?",
              options: [
                "Les deux termes désignent rigoureusement la même chose",
                "Une incompatibilité fonctionnelle peut survenir même si Git fusionne à 100% sans conflit textuel",
                "Un conflit Git ne survient que sur des fichiers images",
                "Une fusion sans conflit garantit toujours que le logiciel fonctionne"
              ],
              correctIndex: 1,
              explanation: "Deux agents peuvent modifier des fichiers différents (donc 0 conflit Git) mais produire un bug logique de communication."
            },
            {
              id: 5,
              question: "Que compare la commande 'git diff main...feature/backend-api' ?",
              options: [
                "Tous les fichiers du serveur GitHub",
                "Les modifications introduites par la branche Backend depuis son ancêtre commun avec main",
                "Les fichiers de la corbeille",
                "Deux dépôts indépendants"
              ],
              correctIndex: 1,
              explanation: "La syntaxe triple-points est l'outil de référence pour inspecter les livrables d'une branche sans pollution."
            },
            {
              id: 6,
              question: "Que symbolise le marqueur '=======' dans un fichier en conflit Git classique ?",
              options: [
                "Le début du fichier",
                "La fin de l'application",
                "La frontière de séparation entre les deux propositions concurrentes",
                "La validation de la fusion"
              ],
              correctIndex: 2,
              explanation: "Le marqueur '=======' sépare le code provenant de HEAD du code provenant de la branche fusionnée."
            },
            {
              id: 7,
              question: "Après avoir résolu le code d'un fichier en conflit pendant un merge, quelle commande prépare sa validation ?",
              options: [
                "git fetch",
                "git add chemin/du/fichier",
                "git branch",
                "git clone"
              ],
              correctIndex: 1,
              explanation: "git add indique à Git que le conflit est résolu pour ce fichier."
            },
            {
              id: 8,
              question: "Quelle commande permet de reprendre le rebase après avoir résolu un conflit intermédiaire ?",
              options: [
                "git merge --continue",
                "git rebase --continue",
                "git rebase --abort",
                "git worktree remove"
              ],
              correctIndex: 1,
              explanation: "git rebase --continue poursuit l'application séquentielle des commits suivants."
            },
            {
              id: 9,
              question: "Que réalise la commande 'git rebase --skip' ?",
              options: [
                "Elle ignore le commit en cours en perdant définitivement ses modifications dans l'historique réécrit",
                "Elle supprime tous les Worktrees",
                "Elle fusionne toutes les branches",
                "Elle redémarre l'ordinateur"
              ],
              correctIndex: 0,
              explanation: "git rebase --skip abandonne le commit courant sans l'appliquer. Cela peut détruire du code sans avertissement."
            },
            {
              id: 10,
              question: "Avant de supprimer un Worktree achevé avec 'git worktree remove', que faut-il impérativement vérifier ?",
              options: [
                "Uniquement le nom de la machine",
                "Que le serveur distant est éteint",
                "Que toutes les modifications importantes sont bien commitées et que l'espace n'est plus utilisé par un agent actif",
                "Que tous les autres worktrees sont également supprimés"
              ],
              correctIndex: 2,
              explanation: "Supprimer un worktree sans vérifier git status détruirait définitivement les modifications locales non commitées."
            }
          ]}
        />
      </section>
    </div>
  );
};
