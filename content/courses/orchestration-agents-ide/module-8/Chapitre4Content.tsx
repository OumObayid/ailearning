'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  // Simulateur interactif : Terminal Virtuel d'Audit Git & Outillage Qualité
  const [activeCommand, setActiveCommand] = useState<'git_status' | 'git_diff' | 'tsc_check' | 'eslint_check' | 'build_check'>('git_status');

  const commandOutputs = {
    git_status: {
      cmd: 'git status',
      description: 'État du dépôt de travail et détection des fichiers modifiés et non suivis',
      output: `On branch feature/task-status-update
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  modified:   backend/src/controllers/taskController.ts
  modified:   backend/src/services/taskService.ts

Untracked files:
  (use "git add <file>..." to include in what will be committed)
  backend/src/debug-temp.js
  backend/tests/taskStatus.test.ts

no changes added to commit (use "git add" to stage)`,
      analysis: '2 fichiers modifiés, 1 nouveau fichier de test légitime (taskStatus.test.ts), et 1 fichier temporaire indésirable laissé par l\'agent (debug-temp.js) à supprimer avant tout commit.'
    },
    git_diff: {
      cmd: 'git diff backend/src/controllers/taskController.ts',
      description: 'Examen chirurgical des modifications ligne par ligne',
      output: `@@ -12,6 +12,14 @@ export async function updateTask(req: Request, res: Response) {
+export async function updateStatus(req: Request, res: Response) {
+  const { status } = req.body;
+  // ⚠️ Manque la vérification des statuts autorisés ('todo', 'in_progress', 'done')
+  const task = await taskService.updateStatus(req.params.id, status);
+  if (!task) {
+    return res.status(404).json({ error: "Task not found" });
+  }
+  return res.status(200).json(task);
+}`,
      analysis: 'La route gère bien le cas 404, mais omet totalement la validation de la valeur entrante "status". Si l\'utilisateur envoie un statut bidon, l\'API le transmet sans contrôle.'
    },
    tsc_check: {
      cmd: 'npx tsc --noEmit',
      description: 'Vérification statique de cohérence des types TypeScript',
      output: `backend/src/services/taskService.ts:45:18 - error TS2322: Type 'string' is not assignable to type 'TaskStatus'.
  45   task.status = status;
                     ~~~~~~
backend/src/controllers/taskController.ts:16:3 - error TS7006: Parameter 'req' implicitly has an 'any' type.

Found 2 errors in 2 files.`,
      analysis: 'TypeScript bloque : typage implicite "any" et incohérence entre la chaîne brute "status" et l\'union TaskStatus ("todo" | "in_progress" | "done"). Le code ne compile pas proprement.'
    },
    eslint_check: {
      cmd: 'npm run lint',
      description: 'Audit des règles de style, syntaxe et sécurité ESLint',
      output: `backend/src/controllers/taskController.ts
  14:9  warning  'logger' is defined but never used      @typescript-eslint/no-unused-vars
  16:3  error    Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

✖ 2 problems (1 error, 1 warning)
  1 error and 0 warnings potentially fixable with the '--fix' option.`,
      analysis: 'ESLint confirme l\'erreur de typage explicite (no-explicit-any) et repère une importation inutile (variable "logger" jamais utilisée).'
    },
    build_check: {
      cmd: 'npm run build',
      description: 'Vérification de la chaîne de compilation et d\'assemblage du projet',
      output: `> taskflow-backend@1.0.0 build
> tsc

backend/src/services/taskService.ts:45:18 - error TS2322: Type 'string' is not assignable to type 'TaskStatus'.
npm error Lifecycle script failed with error:
npm error code 2`,
      analysis: 'L\'étape de build échoue immédiatement en raison des erreurs TypeScript. Cette version ne peut en aucun cas être déployée ni fusionnée.'
    }
  };

  const currentCmd = commandOutputs[activeCommand];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 8 • Chapitre 4
          </span>
          <span className="text-xs text-muted-foreground">1 h de lecture & pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Vérifier le code produit par les agents
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Le code généré par un agent d'IA ne peut jamais être accepté sur sa simple promesse. Apprenez à auditer méthodiquement le travail des agents grâce aux commandes Git d'inspection, aux compilateurs stricts (TypeScript), aux linters et aux vérificateurs de contrats d'API.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & imperméabilité des rôles</p>
        <p className="text-sm leading-relaxed">
          La vérification de code est une étape d'évaluation factuelle. Aucun agent (qu'il s'agisse du QA, du Reviewer ou du Team Leader) ne doit exécuter <code>git merge</code>, <code>git rebase</code> ou <code>git push</code>. Seul le <strong>Project Manager humain</strong> prononce la validation finale et autorise la fusion.
        </p>
      </Callout>

      {/* Section 1 : Préparer la vérification */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="check-square" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>1. Préparer méthodiquement la vérification</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Les 3 étapes préalables indispensables
            </h3>
            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="text-xs font-bold text-foreground">1. Relire la mission initiale et le périmètre contractuel</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Avant même d'ouvrir un fichier, relisez le prompt d'affectation de la tâche. Quels fichiers devaient être modifiés ? Quelles routes devaient être ajoutées ? Cela évite de valider du code hors sujet.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="text-xs font-bold text-foreground">2. Fixer la grille de critères objectifs</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ne jugez pas sur l'impression visuelle. Établissez une liste de critères mesurables : conformité des signatures d'API, codes HTTP attendus, absence d'erreurs TypeScript, présence de tests.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="text-xs font-bold text-foreground">3. Isoler l'espace d'audit</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Vérifiez sur quelle branche le travail a été réalisé (ex. <code>feature/task-status-update</code>) et assurez-vous qu'elle est comparée à la branche de référence (<code>origin/main</code>).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Git comme instrument d'audit */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2. Les commandes Git fondamentales de l'auditeur</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold text-emerald-400 font-mono">git status</code>
              <span className="text-[10px] text-muted-foreground">Vue d'ensemble</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Affiche les fichiers modifiés, indexés (staged) et <strong>non suivis (untracked)</strong>. C'est le premier réflexe : il permet de vérifier qu'aucun fichier sensible ou temporaire (ex. <code>.env</code>, <code>debug.log</code>, <code>temp.js</code>) n'a été créé accidentellement.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold text-emerald-400 font-mono">git diff</code>
              <span className="text-[10px] text-muted-foreground">Différences non indexées</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Montre chaque ligne ajoutée (+), modifiée ou supprimée (-) par rapport au dernier commit. C'est l'outil principal de la revue statique.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold text-emerald-400 font-mono">git diff --staged</code>
              <span className="text-[10px] text-muted-foreground">Différences prêtes au commit</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Affiche les modifications qui ont déjà été ajoutées dans la zone de préparation (index) via <code>git add</code>. Permet de vérifier le contenu exact du futur commit.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold text-emerald-400 font-mono">git log -p -n 3</code>
              <span className="text-[10px] text-muted-foreground">Historique et patchs récents</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Affiche les 3 derniers commits accompagnés de leurs diffs respectifs. Idéal pour examiner l'évolution incrémentale du travail d'un agent.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Outils de vérification automatique */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>3. Outillage de vérification statique et de compilation</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            La relecture humaine ou par agent ne suffit pas : il faut systématiquement exécuter l'outillage automatique du projet avant de déclarer un livrable audité :
          </p>
          <div className="grid grid-cols-1 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-foreground">npx tsc --noEmit</span>
                <span className="text-[10px] text-sky-400 font-semibold">Contrôle de types</span>
              </div>
              <p className="text-muted-foreground">Compile virtuellement tout le code TypeScript sans générer de fichiers JS. Détecte les incohérences de types, les propriétés manquantes et les incompatibilités de signatures.</p>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-foreground">npm run lint</span>
                <span className="text-[10px] text-amber-400 font-semibold">Qualité de code</span>
              </div>
              <p className="text-muted-foreground">Exécute ESLint pour repérer les variables inutilisées, les imports morts, les promesses non gérées et l'usage interdit du type <code>any</code>.</p>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-foreground">npm run build</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Assemblage</span>
              </div>
              <p className="text-muted-foreground">Valide que les bundles de production peuvent être générés sans erreur fatale. Attention : un build réussi ne prouve pas que la logique métier est correcte !</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>4. Atelier Interactif — Console d'Audit & Diagnostic de Code</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Exécutez les commandes du terminal d'audit pour inspecter le code soumis par l'agent Backend. Identifiez les défaillances invisibles à l'œil nu.
          </p>

          {/* Boutons commandes */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setActiveCommand('git_status')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                activeCommand === 'git_status'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              $ git status
            </button>

            <button
              onClick={() => setActiveCommand('git_diff')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                activeCommand === 'git_diff'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              $ git diff backend/src/controllers/taskController.ts
            </button>

            <button
              onClick={() => setActiveCommand('tsc_check')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                activeCommand === 'tsc_check'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              $ npx tsc --noEmit
            </button>

            <button
              onClick={() => setActiveCommand('eslint_check')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                activeCommand === 'eslint_check'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              $ npm run lint
            </button>

            <button
              onClick={() => setActiveCommand('build_check')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                activeCommand === 'build_check'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              $ npm run build
            </button>
          </div>

          {/* Console Output */}
          <div className="p-4 rounded-xl border border-slate-800 bg-black flex flex-col gap-3 font-mono min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-semibold text-white">Terminal d'Audit Quality Gate</span>
              <span>{currentCmd.description}</span>
            </div>

            <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] text-xs text-white leading-relaxed min-w-0 max-w-full font-mono">
              {currentCmd.output}
            </div>

            <div className="mt-2 p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 font-sans whitespace-normal break-words [overflow-wrap:anywhere]">
              <strong className="text-white">Diagnostic de l'auditeur :</strong> {currentCmd.analysis}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 4 : Vérifier le code produit par les agents"
          questions={[
            {
              id: 1,
              question: "Pourquoi faut-il vérifier le code produit par un agent IA ?",
              options: [
                "Parce qu'un agent ne peut jamais produire de code fonctionnel.",
                "Parce qu'un code qui semble correct peut contenir des erreurs ou ne pas respecter les exigences.",
                "Parce que Git corrige automatiquement toutes les erreurs.",
                "Parce que la compilation remplace la revue de code."
              ],
              correctIndex: 1,
              explanation: "Un code généré par IA peut sembler parfaitement fonctionnel au premier abord tout en oubliant la gestion d'erreurs, le typage strict ou les cas limites."
            },
            {
              id: 2,
              question: "Que permet principalement la commande git status ?",
              options: [
                "D'exécuter les tests unitaires.",
                "De compiler le projet.",
                "D'afficher l'état du dépôt et les fichiers concernés par les modifications.",
                "De fusionner automatiquement les branches."
              ],
              correctIndex: 2,
              explanation: "git status donne l'état instantané du dépôt : fichiers modifiés, indexés pour commit et fichiers non suivis (untracked)."
            },
            {
              id: 3,
              question: "Quelle commande permet d'examiner les modifications non placées dans la zone de préparation ?",
              options: [
                "git diff",
                "git push",
                "git merge",
                "git reset --hard"
              ],
              correctIndex: 0,
              explanation: "git diff compare le répertoire de travail actuel avec l'index (zone de préparation)."
            },
            {
              id: 4,
              question: "Pourquoi faut-il examiner les fichiers non suivis par Git ?",
              options: [
                "Parce qu'ils sont automatiquement supprimés au prochain commit.",
                "Parce qu'ils ne contiennent jamais de code important.",
                "Parce que Git les affiche toujours dans le diff classique.",
                "Parce qu'ils peuvent contenir de nouveaux fichiers faisant partie du travail de l'agent."
              ],
              correctIndex: 3,
              explanation: "Les nouveaux fichiers créés par un agent (ex. nouveaux tests ou contrôleurs) apparaissent dans les fichiers non suivis et ne figurent pas dans git diff tant qu'ils ne sont pas ajoutés."
            },
            {
              id: 5,
              question: "Quel contrôle permet notamment de vérifier la cohérence entre le code et le contrat API ?",
              options: [
                "Examiner uniquement les noms des fichiers.",
                "Comparer les routes, les requêtes et les réponses avec le contrat défini.",
                "Vérifier uniquement la présence d'un README.",
                "Examiner uniquement l'historique des commits."
              ],
              correctIndex: 1,
              explanation: "La conformité d'une API exige de comparer les chemins d'URL, les verbes HTTP, les en-têtes, les payloads reçus et les statuts HTTP renvoyés avec la spécification technique."
            },
            {
              id: 6,
              question: "Que peut détecter TypeScript lors d'une vérification de types ?",
              options: [
                "Tous les défauts fonctionnels de l'application.",
                "Toutes les erreurs qui apparaîtront en production.",
                "Certaines incohérences entre les types utilisés dans le code.",
                "Tous les problèmes de sécurité."
              ],
              correctIndex: 2,
              explanation: "TypeScript détecte les discordances de types statiques (signatures, propriétés inexistantes, incompatibilités d'assignation). Il ne garantit pas la validité métier."
            },
            {
              id: 7,
              question: "Que garantit un build réussi ?",
              options: [
                "Que toutes les fonctionnalités répondent aux exigences.",
                "Que tous les tests fonctionnels ont réussi.",
                "Que l'application ne contient aucun défaut.",
                "Que les étapes de construction configurées se sont terminées correctement."
              ],
              correctIndex: 3,
              explanation: "Un build réussi atteste uniquement de l'absence d'erreurs de compilation et d'assemblage selon la configuration actuelle, pas de la justesse fonctionnelle."
            },
            {
              id: 8,
              question: "Quelle est la meilleure réaction lorsqu'un Reviewer détecte une anomalie ?",
              options: [
                "Documenter le problème et le transmettre au Team Leader.",
                "Modifier immédiatement tous les fichiers du projet.",
                "Supprimer les modifications de l'agent.",
                "Déclarer automatiquement le projet non utilisable."
              ],
              correctIndex: 0,
              explanation: "Le Reviewer doit documenter le problème de façon précise et le transmettre au Team Leader pour organiser la reprise par l'agent concerné."
            },
            {
              id: 9,
              question: "Quelle est la différence entre le travail du QA et celui du Reviewer ?",
              options: [
                "Le QA examine uniquement les fichiers Git et le Reviewer gère les utilisateurs.",
                "Le QA vérifie principalement les comportements par les tests, tandis que le Reviewer examine les modifications et leur qualité technique.",
                "Le QA valide le projet et le Reviewer autorise les merges.",
                "Les deux agents doivent toujours effectuer exactement les mêmes contrôles."
              ],
              correctIndex: 1,
              explanation: "Le QA vérifie le comportement dynamique par les tests, tandis que le Reviewer évalue la qualité statique, l'architecture et la propreté du code."
            },
            {
              id: 10,
              question: "Un code a été compilé avec succès et les tests disponibles sont présents, mais aucun test n'a été exécuté. Quelle conclusion est correcte ?",
              options: [
                "Le logiciel est entièrement validé.",
                "Tous les comportements sont conformes.",
                "La compilation a réussi et des tests sont présents, mais les résultats d'exécution ne sont pas connus.",
                "Le Reviewer peut autoriser automatiquement l'intégration."
              ],
              correctIndex: 2,
              explanation: "La présence de fichiers de test ne vaut pas exécution réussie : tant que la commande de test n'a pas tourné et validé les assertions, le résultat d'exécution demeure inconnu."
            }
          ]}
        />
      </div>
    </div>
  );
};
