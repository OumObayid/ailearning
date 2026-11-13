'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // Simulateur interactif de cycle de commit
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [committedCount, setCommittedCount] = useState<number>(1);
  const [activeView, setActiveView] = useState<'status' | 'diff' | 'stagedDiff' | 'log'>('status');

  const handleStageFile = (file: string) => {
    if (stagedFiles.includes(file)) {
      setStagedFiles(stagedFiles.filter(f => f !== file));
    } else {
      setStagedFiles([...stagedFiles, file]);
    }
  };

  const handleCommit = () => {
    if (stagedFiles.length === 0) return;
    setCommittedCount(prev => prev + 1);
    setStagedFiles([]);
    setActiveView('log');
  };

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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 5 — Créer des commits et consulter l'historique
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Le <strong>commit</strong> est l'unité fondamentale de mesure et de traçabilité dans Git. Pour qu'une équipe multi-agents fonctionne sans bruit ni régression, chaque agent doit produire des commits <em>atomiques</em>, accompagnés de messages clairs et compréhensibles. Ce chapitre détaille le cycle complet de préparation (<code>git add</code>), d'inspection (<code>git diff</code>), de scellement (<code>git commit</code>) et de consultation d'historique (<code>git log</code>).
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
              1. Maîtriser le cycle de préparation en 5 étapes
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Exécuter avec méthode : <code>git status</code> &rarr; <code>git diff</code> &rarr; <code>git add</code> &rarr; <code>git diff --staged</code> &rarr; <code>git commit</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Rédiger des messages de commits conventionnels
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adopter les préfixes standardisés (<code>feat:</code>, <code>fix:</code>, <code>test:</code>, <code>docs:</code>) pour rendre le journal immédiatement lisible par les reviewers.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Naviguer dans l'historique et inspecter les patches
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Utiliser <code>git log --oneline --graph</code> et <code>git show [SHA]</code> pour vérifier le travail produit par chaque agent.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 5.4 : GIT DIFF VS GIT DIFF --STAGED
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              5.4
            </span>
            Examiner les modifications : git diff vs git diff --staged
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Distinguer ce qui a été modifié sur le disque de ce qui est prêt pour le commit
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Avant d'enregistrer quoi que ce soit, un développeur ou un agent doit systématiquement vérifier ce qu'il s'apprête à commiter. Git propose deux commandes complémentaires :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900 font-mono">
                git diff
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-100 text-amber-800 shrink-0">
                Non préparé
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              Compare le <strong>répertoire de travail</strong> avec la <strong>zone de préparation</strong>. Il affiche les modifications qui n'ont pas encore été ajoutées avec <code>git add</code>.
            </p>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200">
              <span className="text-rose-400">- const status = "pending";</span><br/>
              <span className="text-emerald-400">+ const status = "todo";</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900 font-mono">
                git diff --staged (ou --cached)
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-purple-100 text-purple-800 shrink-0">
                Prêt à commiter
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              Compare la <strong>zone de préparation</strong> avec le <strong>dernier commit</strong> de la branche courante. Il affiche exactement ce qui sera scellé si vous exécutez <code>git commit</code> à cet instant.
            </p>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200">
              <span className="text-slate-400">diff --git a/src/routes/tasks.ts b/src/routes/tasks.ts</span><br/>
              <span className="text-emerald-400">+ router.post('/tasks', taskController.create);</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DU WORKFLOW DE COMMIT
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Interactif — Atelier de Préparation & Commit
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Agent Backend sur feature/task-creation-api
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-4">
            Deux fichiers ont été modifiés sur votre disque. Cochez les fichiers que vous souhaitez préparer dans la zone de staging (<code>git add</code>), puis examinez les différentes vues Git avant de créer le commit :
          </p>

          {/* Fichiers modifiés */}
          <div className="space-y-2 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon name="file-text" className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs text-white">src/routes/tasks.ts</span>
                <span className="text-xs text-amber-300">(modifié : ajout route POST)</span>
              </div>
              <button
                onClick={() => handleStageFile('src/routes/tasks.ts')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  stagedFiles.includes('src/routes/tasks.ts')
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {stagedFiles.includes('src/routes/tasks.ts') ? "✓ Préparé (Staged)" : "+ git add"}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon name="file-text" className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-xs text-white">src/services/task-service.ts</span>
                <span className="text-xs text-amber-300">(modifié : logique de persistance)</span>
              </div>
              <button
                onClick={() => handleStageFile('src/services/task-service.ts')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  stagedFiles.includes('src/services/task-service.ts')
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {stagedFiles.includes('src/services/task-service.ts') ? "✓ Préparé (Staged)" : "+ git add"}
              </button>
            </div>
          </div>

          {/* Boutons d'inspection */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveView('status')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                activeView === 'status' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              $ git status
            </button>
            <button
              onClick={() => setActiveView('diff')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                activeView === 'diff' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              $ git diff
            </button>
            <button
              onClick={() => setActiveView('stagedDiff')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                activeView === 'stagedDiff' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              $ git diff --staged
            </button>
            <button
              onClick={() => setActiveView('log')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                activeView === 'log' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              $ git log ({committedCount} commits)
            </button>
          </div>

          {/* Terminal d'affichage */}
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 min-h-[140px] mb-6">
            {activeView === 'status' && (
              <pre className="whitespace-pre-wrap">
{`On branch feature/task-creation-api
Changes to be committed:
${stagedFiles.length > 0 ? stagedFiles.map(f => `  modified:   ${f}`).join('\n') : '  (no changes added to commit)'}

Changes not staged for commit:
${['src/routes/tasks.ts', 'src/services/task-service.ts']
  .filter(f => !stagedFiles.includes(f))
  .map(f => `  modified:   ${f}`).join('\n') || '  (all changes are staged)'}`}
              </pre>
            )}

            {activeView === 'diff' && (
              <pre className="whitespace-pre-wrap">
{['src/routes/tasks.ts', 'src/services/task-service.ts'].filter(f => !stagedFiles.includes(f)).length === 0
  ? "(Aucune modification non préparée - Tout est dans la zone de staging)"
  : `--- non-staged diffs ---
+ router.post('/tasks', taskController.create);
+ tasksMap.set(newTask.id, newTask);`}
              </pre>
            )}

            {activeView === 'stagedDiff' && (
              <pre className="whitespace-pre-wrap">
{stagedFiles.length === 0
  ? "(Aucun fichier dans la zone de staging. Utilisez git add pour préparer vos modifications)"
  : stagedFiles.map(f => `--- staged: ${f} ---
+ export function createTask(data: CreateTaskDto) {
+   return taskService.save(data);
+ }`).join('\n\n')}
              </pre>
            )}

            {activeView === 'log' && (
              <pre className="whitespace-pre-wrap text-emerald-400">
{`* a8f31c2 (HEAD -> feature/task-creation-api) feat(backend): add task creation API
* 3b5e120 (main) chore: initialize TaskFlow project`}
              </pre>
            )}
          </div>

          {/* Action de commit */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              Fichiers sélectionnés dans le staging : <strong>{stagedFiles.length} / 2</strong>
            </span>
            <button
              disabled={stagedFiles.length === 0}
              onClick={handleCommit}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors flex items-center gap-2"
            >
              <Icon name="check-circle" className="w-4 h-4" />
              <span>git commit -m "feat(backend): add task creation API"</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5.8 : RÉDIGER DE BONS MESSAGES DE COMMIT
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              5.8
            </span>
            Rédiger de bons messages de commit (Conventional Commits)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Faciliter l'audit automatisé et la compréhension humaine
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Un message de commit flou comme <em>"update"</em>, <em>"modifs"</em> ou <em>"correction"</em> oblige les reviewers à ouvrir chaque ligne de code pour deviner l'intention de l'auteur. Dans notre équipe TaskFlow, tous les agents respectent la convention <strong>Conventional Commits</strong> :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-1">
              ❌ Mauvais exemples à bannir :
            </span>
            <p className="text-xs font-mono text-rose-900">
              "correction bug"<br/>
              "wip"<br/>
              "code terminé"<br/>
              "changes for review"
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              ✓ Bons exemples conventionnels :
            </span>
            <p className="text-xs font-mono text-emerald-900 space-y-1">
              <strong>feat(backend):</strong> add task creation POST endpoint<br/>
              <strong>fix(frontend):</strong> correct task status badge background color<br/>
              <strong>test(api):</strong> add integration tests for 404 responses<br/>
              <strong>docs(architecture):</strong> update state machine diagram in ARCHITECTURE.md
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5.16 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 5
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez votre maîtrise de la création de commits et de l'historique Git (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal d'un commit dans Git ?",
              options: [
                "Envoyer immédiatement les fichiers sur GitHub",
                "Enregistrer un état du projet dans l'historique Git avec un identifiant unique et un message descriptif",
                "Exécuter automatiquement les tests unitaires",
                "Créer une nouvelle branche de travail"
              ],
              correctIndex: 1,
              explanation: "Un commit est un instantané immuable conservé dans la base d'objets du dépôt local."
            },
            {
              id: 2,
              question: "À quoi sert la zone de préparation (staging area ou index) ?",
              options: [
                "À sélectionner précisément les modifications destinées à figurer dans le prochain commit",
                "À sauvegarder les fichiers dans le cloud sans historique",
                "À effacer les anciennes versions du projet",
                "À exécuter les commandes du terminal"
              ],
              correctIndex: 0,
              explanation: "La zone de préparation permet de grouper des modifications cohérentes et d'isoler ce qui sera commité."
            },
            {
              id: 3,
              question: "Quelle commande permet de connaître l'état précis du dépôt (branche, fichiers modifiés, staged et untracked) ?",
              options: [
                "git commit",
                "git log",
                "git status",
                "git push"
              ],
              correctIndex: 2,
              explanation: "git status est la commande d'inspection incontournable de l'état du working tree et de l'index."
            },
            {
              id: 4,
              question: "Que permet la commande 'git diff' dans son usage habituel sans argument ?",
              options: [
                "D'afficher les commits sur le dépôt distant",
                "D'examiner les modifications non préparées présentes dans le répertoire de travail",
                "De créer un commit",
                "De supprimer une branche"
              ],
              correctIndex: 1,
              explanation: "git diff compare le répertoire de travail à la zone de préparation (les changements non encore ajoutés via git add)."
            },
            {
              id: 5,
              question: "Quelle commande permet d'examiner spécifiquement les modifications déjà préparées dans la zone de staging ?",
              options: [
                "git diff --staged (ou --cached)",
                "git branch",
                "git status --delete",
                "git log --staged"
              ],
              correctIndex: 0,
              explanation: "git diff --staged compare l'index avec le dernier commit enregistré sur la branche."
            },
            {
              id: 6,
              question: "Quelle commande permet d'ajouter un fichier à la zone de préparation ?",
              options: [
                "git show",
                "git add",
                "git log",
                "git switch"
              ],
              correctIndex: 1,
              explanation: "git add place les modifications du fichier dans l'index."
            },
            {
              id: 7,
              question: "Que contient un commit créé via la commande 'git commit' ?",
              options: [
                "Toutes les modifications du répertoire de travail sans distinction",
                "Uniquement les modifications présentes dans la zone de préparation",
                "L'intégralité du dépôt distant",
                "Uniquement les fichiers non suivis"
              ],
              correctIndex: 1,
              explanation: "Seules les modifications 'staged' (préparées via git add) sont intégrées dans le commit."
            },
            {
              id: 8,
              question: "Quelle commande affiche l'historique des commits sous une forme compacte sur une seule ligne ?",
              options: [
                "git log --oneline",
                "git status --shortlog",
                "git commit --history",
                "git branch --log"
              ],
              correctIndex: 0,
              explanation: "git log --oneline affiche le hash SHA abrégé et le message de chaque commit sur une ligne."
            },
            {
              id: 9,
              question: "À quoi sert la commande 'git show [commit-hash]' ?",
              options: [
                "À créer une branche distante",
                "À examiner les métadonnées et le patch complet (diff) associé à un commit spécifique",
                "À envoyer un commit sur GitHub",
                "À supprimer le dernier commit"
              ],
              correctIndex: 1,
              explanation: "git show permet d'inspecter en détail les lignes ajoutées et supprimées par un commit particulier."
            },
            {
              id: 10,
              question: "Que faut-il impérativement retenir à propos de la commande 'git commit --amend' ?",
              options: [
                "Elle ajoute toujours un nouveau commit sans jamais toucher à l'ancien",
                "Elle remplace le dernier commit par un nouveau commit avec un nouvel identifiant SHA (à ne jamais faire sur une branche partagée)",
                "Elle pousse automatiquement les modifications sur le serveur distant",
                "Elle ne s'applique qu'aux fichiers non suivis"
              ],
              correctIndex: 1,
              explanation: "git commit --amend réécrit le dernier commit. Sur une branche partagée avec d'autres agents, cela brise l'historique commun."
            }
          ]}
        />
      </section>
    </div>
  );
};
