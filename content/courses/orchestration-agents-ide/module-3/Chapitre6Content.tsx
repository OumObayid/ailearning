'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  // Simulateur interactif de fusion et résolution de conflit
  const [mergeState, setMergeState] = useState<'idle' | 'conflict' | 'resolved' | 'merged'>('idle');
  const [selectedResolution, setSelectedResolution] = useState<'head' | 'incoming' | 'contract'>('contract');

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
          Chapitre 6 — Comprendre la fusion des branches (merge)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Une fois les missions des agents achevées et auditées, vient l'étape clé de l'intégration : réunir les modifications d'une branche de travail dans la branche principale du projet. Cette opération, exécutée via <code>git merge</code>, peut s'effectuer de façon transparente (<em>fast-forward</em>) ou nécessiter un arbitrage explicite lorsqu'un <strong>conflit de fusion</strong> est détecté.
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
              1. Identifier la branche source et la branche de destination
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprendre l'ordre rigoureux des commandes : se positionner d'abord sur la cible avec <code>git switch main</code> avant de fusionner la source avec <code>git merge feature/...</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Distinguer Fast-Forward et 3-Way Merge Commit
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Savoir quand Git peut simplement avancer un pointeur et quand il doit générer un commit de fusion ayant deux commits parents.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Diagnostiquer et résoudre sereinement un conflit Git
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Décoder les marqueurs <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> et <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>, arbitrer selon le besoin métier et sceller la fusion avec <code>git merge --continue</code>.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 6.2 & 6.4 : FAST-FORWARD VS MERGE COMMIT
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Les deux types majeurs de fusion : Fast-Forward vs 3-Way Merge
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Déplacement direct de pointeur ou création d'un commit à double parent
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Lorsque vous demandez à Git de fusionner deux branches, il analyse leur historique commun pour déterminer la méthode d'intégration :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                1. Fusion Fast-Forward (Avance rapide)
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                0 commit de fusion
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Se produit lorsque la branche de destination (<code>main</code>) n'a reçu <strong>aucun nouveau commit</strong> depuis que la branche de fonctionnalité a été créée. Git déplace simplement le pointeur de <code>main</code> vers le dernier commit de la branche source.
            </p>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300">
              A (main initial) &rarr; B &rarr; C (feature)<br />
              Après merge : A &rarr; B &rarr; C (main & feature pointent ici)
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                2. Fusion 3-Way avec Commit de Merge
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-purple-100 text-purple-800 shrink-0">
                Nouveau commit créé
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Se produit lorsque les deux branches ont divergé (<code>main</code> a avancé avec un commit B pendant que la feature avançait avec un commit C). Git réunit les deux historiques en créant un <strong>commit de merge (M)</strong> qui possède deux ancêtres.
            </p>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&rarr; B (main) &mdash;&mdash;&mdash;&mdash;&mdash;\<br />
              A &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&rarr; M (Commit de Merge)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&rarr; C (feature) &mdash;&mdash;&mdash;&mdash;&mdash;/
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DE CONFLIT ET RÉSOLUTION
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Interactif — Résolution de Conflit Git dans TaskFlow
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Fichier : src/types/task.ts
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            L'agent Backend a modifié le statut dans sa branche (<code>taskStatus = "todo"</code>), tandis qu'un correctif a été fusionné sur <code>main</code> (<code>taskStatus = "pending"</code>). Expérimentez le cycle complet de détection et résolution :
          </p>

          {/* Stepper des états */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setMergeState('idle')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${mergeState === 'idle' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              1. État initial (Divergence)
            </button>
            <button
              onClick={() => setMergeState('conflict')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${mergeState === 'conflict' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              2. Déclenchement du conflit
            </button>
            <button
              onClick={() => setMergeState('resolved')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${mergeState === 'resolved' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              3. Arbitrage & Choix du code
            </button>
            <button
              onClick={() => setMergeState('merged')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${mergeState === 'merged' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
            >
              4. Fusion finalisée (Commit M)
            </button>
          </div>

          {/* Console d'affichage */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 font-mono text-xs text-slate-300 space-y-4">
            {mergeState === 'idle' && (
              <div>
                <div className="text-indigo-400 font-bold">$ git switch main && git merge feature/task-status</div>
                <div className="text-slate-400 mt-2">Prêt pour la tentative de fusion. Cliquez sur "2. Déclenchement du conflit" pour lancer l'opération.</div>
              </div>
            )}

            {mergeState === 'conflict' && (
              <div className="space-y-3">
                <div className="text-rose-400 font-bold">Auto-merging src/types/task.ts</div>
                <div className="text-rose-300">CONFLICT (content): Merge conflict in src/types/task.ts</div>
                <div className="text-slate-400">Automatic merge failed; fix conflicts and then commit the result.</div>
                <div className="p-3 bg-slate-900 rounded-lg border border-rose-500/40 text-slate-200 mt-2">
                  <span className="text-rose-400 font-bold">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (main)</span><br />
                  <span>const taskStatus = "pending";</span><br />
                  <span className="text-slate-500 font-bold">=======</span><br />
                  <span>const taskStatus = "todo";</span><br />
                  <span className="text-blue-400 font-bold">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/task-status</span>
                </div>
              </div>
            )}

            {mergeState === 'resolved' && (
              <div className="space-y-3">
                <span className="text-amber-300 font-bold block">
                  🎯 Choisissez la résolution fonctionnelle attendue pour TaskFlow :
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded bg-slate-900 border border-slate-800">
                    <input
                      type="radio"
                      name="res"
                      checked={selectedResolution === 'head'}
                      onChange={() => setSelectedResolution('head')}
                    />
                    <span>Garder la version HEAD : <code>const taskStatus = "pending";</code> (Rejet feature)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded bg-slate-900 border border-slate-800">
                    <input
                      type="radio"
                      name="res"
                      checked={selectedResolution === 'incoming'}
                      onChange={() => setSelectedResolution('incoming')}
                    />
                    <span>Garder la version Feature : <code>const taskStatus = "todo";</code> (Écrase main)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded bg-slate-900 border border-indigo-700 text-indigo-300">
                    <input
                      type="radio"
                      name="res"
                      checked={selectedResolution === 'contract'}
                      onChange={() => setSelectedResolution('contract')}
                    />
                    <span><strong>(Recommandé) Typage union :</strong> <code>type TaskStatus = 'todo' | 'pending';</code></span>
                  </label>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setMergeState('merged')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    git add src/types/task.ts && git merge --continue
                  </button>
                </div>
              </div>
            )}

            {mergeState === 'merged' && (
              <div className="space-y-2">
                <div className="text-emerald-400 font-bold">✓ Fusion validée et enregistrée avec succès !</div>
                <div className="text-slate-300">
                  Commit de merge : <code>7f1a92e Merge branch 'feature/task-status' into main</code><br />
                  Parents : <code>B (main)</code> & <code>C (feature/task-status)</code><br />
                  Répertoire de travail propre (working tree clean).
                </div>
              </div>
            )}
          </div>

          {/* Bouton d'abandon en cours */}
          {mergeState === 'conflict' && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setMergeState('idle')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-800/40"
              >
                git merge --abort (Annuler et revenir à l'état propre)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6.16 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 6
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez vos réflexes sur la fusion des branches et la résolution des conflits (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal de la commande 'git merge' ?",
              options: [
                "Supprimer une branche locale",
                "Intégrer les modifications d'une branche source dans la branche actuellement sélectionnée",
                "Envoyer automatiquement les commits sur GitHub",
                "Créer un nouveau dépôt Git vierge"
              ],
              correctIndex: 1,
              explanation: "git merge intègre la branche spécifiée dans la branche active (HEAD)."
            },
            {
              id: 2,
              question: "Dans la séquence suivante, quelle est la branche de destination qui recevra les modifications ?\n\ngit switch main\ngit merge feature/task-creation",
              options: [
                "feature/task-creation",
                "main",
                "origin",
                "Aucune des deux"
              ],
              correctIndex: 1,
              explanation: "Comme HEAD est positionné sur main (via git switch main), c'est main qui reçoit les modifications."
            },
            {
              id: 3,
              question: "Qu'est-ce qu'une fusion de type 'fast-forward' ?",
              options: [
                "Une fusion qui supprime l'intégralité de l'historique",
                "Une fusion qui déplace simplement le pointeur de la branche de destination sans créer de nouveau commit de merge",
                "Une fusion qui échoue toujours avec conflit",
                "Une fusion réservée aux plateformes cloud"
              ],
              correctIndex: 1,
              explanation: "Le fast-forward ne crée aucun commit additionnel : il avance simplement le pointeur de la branche cible."
            },
            {
              id: 4,
              question: "Quand Git crée-t-il obligatoirement un commit de merge à deux parents ?",
              options: [
                "Lorsque les deux branches ont évolué indépendamment depuis leur point de divergence (historiques divergents)",
                "À chaque modification d'un fichier TypeScript",
                "Dès qu'un agent crée une branche",
                "Lorsqu'un fichier est supprimé"
              ],
              correctIndex: 0,
              explanation: "Si main a reçu de nouveaux commits pendant que la feature avançait, Git doit créer un commit 3-way pour réunir les deux branches."
            },
            {
              id: 5,
              question: "Pourquoi un conflit de fusion apparaît-il ?",
              options: [
                "Parce que Git interdit formellement le travail en parallèle",
                "Parce que deux branches contiennent des modifications incompatibles sur les mêmes lignes qu'aucun algorithme ne peut arbitrer automatiquement",
                "Parce qu'un commit possède toujours deux parents",
                "Parce que le dépôt distant est hors ligne"
              ],
              correctIndex: 1,
              explanation: "Un conflit survient lorsque deux intervenants modifient la même zone de code différemment à partir d'un même ancêtre."
            },
            {
              id: 6,
              question: "Quelle commande permet d'identifier la liste exacte des fichiers en conflit ?",
              options: [
                "git branch",
                "git status",
                "git log",
                "git push"
              ],
              correctIndex: 1,
              explanation: "git status indique clairement la section 'Unmerged paths: both modified'."
            },
            {
              id: 7,
              question: "Que faut-il faire lorsqu'un fichier présente les marqueurs '<<<<<<< HEAD' et '>>>>>>>' ?",
              options: [
                "Supprimer systématiquement la première version",
                "Conserver systématiquement la deuxième version",
                "Examiner le contexte métier, choisir le code attendu, supprimer les marqueurs puis préparer le fichier",
                "Supprimer purement et simplement le fichier du projet"
              ],
              correctIndex: 2,
              explanation: "Résoudre un conflit demande une décision métier réfléchie pour conserver la cohérence de l'application."
            },
            {
              id: 8,
              question: "Quelle commande permet de signaler à Git qu'un fichier en conflit a été résolu ?",
              options: [
                "git add chemin/du/fichier",
                "git branch -d",
                "git fetch",
                "git clone"
              ],
              correctIndex: 0,
              explanation: "git add indique à Git que le conflit est résolu et que le fichier est prêt pour le commit de finalisation."
            },
            {
              id: 9,
              question: "À quoi sert la commande 'git merge --abort' ?",
              options: [
                "À supprimer définitivement la branche source",
                "À abandonner une fusion en cours de conflit et restaurer l'état exact précédant la commande de merge",
                "À annuler tous les commits de l'année",
                "À forcer la fusion sans résoudre les conflits"
              ],
              correctIndex: 1,
              explanation: "git merge --abort permet de sortir proprement d'un conflit complexe et de retrouver un working tree sain."
            },
            {
              id: 10,
              question: "Une fusion terminée sans conflit garantit-elle que l'application TaskFlow fonctionne parfaitement ?",
              options: [
                "Oui, Git vérifie automatiquement tous les comportements d'exécution",
                "Oui, si aucun conflit n'est survenu le code est infaillible",
                "Non, Git ne vérifie que le texte ; des tests automatisés et une vérification fonctionnelle restent indispensables",
                "Non, car Git ne conserve jamais les fichiers fusionnés"
              ],
              correctIndex: 2,
              explanation: "Git assemble du texte sans comprendre la logique métier. Seuls les tests et la QA valident le bon fonctionnement."
            }
          ]}
        />
      </section>
    </div>
  );
};
