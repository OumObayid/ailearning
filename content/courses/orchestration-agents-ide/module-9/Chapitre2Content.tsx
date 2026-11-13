'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  // Simulateur interactif : Audit Préalable de Branche & Vérification des Dépendances
  const [selectedBranch, setSelectedBranch] = useState<'backend_branch' | 'frontend_branch' | 'unclean_branch'>('backend_branch');

  const branches = {
    backend_branch: {
      name: 'feature/backend-tasks',
      target: 'develop',
      author: 'Agent Backend',
      statusCheck: 'Clean (aucun fichier non suivi ni modification locale en suspens)',
      fetchState: 'À jour avec origin/develop (0 commit de retard)',
      diffSummary: 'backend/src/controllers/taskController.ts (+45, -2)\nbackend/src/services/taskService.ts (+28, -0)\nbackend/tests/taskApi.test.ts (+80, -0)',
      dependencies: 'Fournit le contrat d\'API REST (PATCH /api/tasks/:id) nécessaire au Frontend.',
      stateProposal: 'PRÊTE POUR REVUE ET INTÉGRATION',
      stateColor: 'emerald',
      notes: 'Tous les fichiers modifiés appartiennent strictement au périmètre Backend. Tests unitaires et d\'API au vert.'
    },
    frontend_branch: {
      name: 'feature/frontend-tasks',
      target: 'develop',
      author: 'Agent Frontend',
      statusCheck: 'Clean (aucun changement local)',
      fetchState: 'En retard de 2 commits par rapport à origin/develop',
      diffSummary: 'frontend/src/components/TaskCard.tsx (+35, -4)\nfrontend/src/components/StatusDropdown.tsx (+60, -0)',
      dependencies: 'Dépendance bloquante : requiert le contrat d\'API et les statuts validés par la branche Backend.',
      stateProposal: 'EN ATTENTE D\'INTÉGRATION DU BACKEND',
      stateColor: 'amber',
      notes: 'L\'interface ne peut pas être intégrée en premier sous peine d\'appeler une route inexistante sur develop.'
    },
    unclean_branch: {
      name: 'feature/task-status-hotfix',
      target: 'develop',
      author: 'Agent Développeur',
      statusCheck: '⚠️ UNCLEAN : 2 fichiers non suivis (temp.js, debug.log) et modifications non commitées',
      fetchState: 'Non synchronisé avec le dépôt distant',
      diffSummary: 'src/config/database.ts (+10, -5) [Hors périmètre assigné !]',
      dependencies: 'Inconnues. Risque de pollution du dépôt commun.',
      stateProposal: 'À CORRIGER / REJETÉE',
      stateColor: 'rose',
      notes: 'Dépôt de travail pollué par des fichiers temporaires et modification non autorisée de la configuration de base de données.'
    }
  };

  const current = branches[selectedBranch];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400 shrink-0">
            Module 9 • Chapitre 2
          </span>
          <span className="text-xs text-muted-foreground">55 min de lecture & pratique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Préparer l'intégration des branches
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Avant d'initier la moindre fusion, chaque branche doit subir un audit rigoureux : propreté du répertoire de travail, synchronisation avec le dépôt distant via <code>git fetch</code>, analyse différentielle à trois points (<code>git diff develop...feature</code>) et identification des dépendances fonctionnelles.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & imperméabilité des étapes</p>
        <p className="text-sm leading-relaxed">
          La préparation d'une branche consiste exclusivement à <strong>vérifier et documenter son état</strong>. Aucun agent ne doit entamer une opération de fusion (<code>git merge</code> ou <code>git pull</code>) pendant cette phase d'audit. La décision d'intégrer reste subordonnée à l'accord formel du <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Identifier branches et cibles */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="search" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.2.1 & 9.2.2 — Identifier les branches sources et la branche cible</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Ne pas présumer que la cible est toujours "main"
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dans une stratégie Git professionnelle (ex: GitFlow ou Trunk-based assisté), la branche <code>main</code> est strictement réservée aux versions stables et déployables. Les contributions en cours d'assemblage doivent d'abord converger vers une branche d'intégration dédiée (souvent nommée <code>develop</code>).
            </p>
            <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1 text-xs">
              <span className="font-bold text-foreground">Informations obligatoires à consigner avant tout travail :</span>
              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground ml-2">
                <li>Le nom exact de la branche source et l'agent responsable.</li>
                <li>La branche cible conventionnelle du sprint (ex. <code>develop</code>).</li>
                <li>Le périmètre précis des fichiers autorisés à la modification.</li>
                <li>Les validations préalables apportées par le QA et le Reviewer.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Commandes Git d'audit préalable */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.2.3 à 9.2.6 — La boîte à outils de l'audit de branche Git</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-indigo-400">git status</code>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">État local</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vérifie qu'aucun fichier non suivi (untracked) ni modification en suspens ne subsiste dans le répertoire de travail. <em>Attention :</em> un dépôt propre indique que les commits sont enregistrés, mais ne garantit en rien la qualité fonctionnelle du code.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-indigo-400">git fetch</code>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Actualisation sans fusion</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Récupère l'état et les commits du serveur distant sans altérer la branche locale courante. Ne jamais utiliser <code>git pull</code> à l'aveugle, car il déclenche une fusion automatique non supervisée.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-indigo-400">git branch -vv</code>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Position relative</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Affiche le dernier commit de chaque branche et signale l'avance ou le retard par rapport à la branche distante de suivi (ex. <code>[ahead 1, behind 2]</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-indigo-400">git diff develop...feature/xxx</code>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Diff à 3 points</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Compare les modifications apportées par la branche source <strong>depuis son ancêtre commun</strong> avec la branche cible. C'est la vue exacte de ce qui sera intégré.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Les dépendances et l'ordre d'intégration */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="git-pull-request" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.2.7 & 9.2.8 — Analyse des dépendances et séquencement</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            L'ordre d'intégration ne doit jamais être laissé au hasard. Dans TaskFlow, trois typologies de dépendances coexistent :
          </p>
          <div className="grid grid-cols-1 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
              <span className="font-bold text-blue-400">1. Dépendance Fonctionnelle (Productrice &rarr; Consommatrice)</span>
              <p className="text-muted-foreground">
                L'API Backend expose le contrat. Le Frontend en dépend directement. <strong>Ordre impératif :</strong> intégrer et tester le Backend sur <code>develop</code> d'abord, puis intégrer le Frontend.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex flex-col gap-1">
              <span className="font-bold text-purple-400">2. Dépendance Inter-branches sur Fichiers Partagés</span>
              <p className="text-muted-foreground">
                Si deux agents modifient le fichier de types partagé <code>src/types/task.ts</code> ou <code>package.json</code>, le Team Leader doit coordonner l'alignement en amont pour éviter les conflits bloquants.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
              <span className="font-bold text-emerald-400">3. Les 3 statuts de préparation</span>
              <p className="text-muted-foreground">
                À l'issue de l'audit, la branche est qualifiée : <strong>Prête</strong> (éligible à la PR), <strong>À corriger</strong> (anomalies ou scope creep), ou <strong>En attente</strong> (dépendance non encore intégrée).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Atelier Interactif — Banc d'Audit Préalable de Branche</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Mettez-vous dans le rôle du Team Leader. Auditez l'état technique et les dépendances de 3 branches candidates à l'intégration dans TaskFlow.
          </p>

          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setSelectedBranch('backend_branch')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedBranch === 'backend_branch'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              1. feature/backend-tasks (API TaskFlow — Conforme)
            </button>

            <button
              onClick={() => setSelectedBranch('frontend_branch')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedBranch === 'frontend_branch'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              2. feature/frontend-tasks (Composant UI — En attente du Backend)
            </button>

            <button
              onClick={() => setSelectedBranch('unclean_branch')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedBranch === 'unclean_branch'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              3. feature/task-status-hotfix (Dépôt pollué & Dérive de périmètre)
            </button>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <div>
                <span className="font-bold text-foreground font-mono">{current.name}</span>
                <p className="text-[11px] text-muted-foreground">Cible : <code>{current.target}</code> • Auteur : {current.author}</p>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                current.stateColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                current.stateColor === 'amber' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {current.stateProposal}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Contrôle local (git status) :</span>
                <p className="text-foreground mt-0.5 font-mono text-[11px]">{current.statusCheck}</p>
              </div>

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Synchronisation distante (git fetch) :</span>
                <p className="text-foreground mt-0.5">{current.fetchState}</p>
              </div>

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Résumé du diff (git diff --stat) :</span>
                <pre className="text-sky-300 mt-0.5 font-mono text-[11px] whitespace-pre-wrap">{current.diffSummary}</pre>
              </div>

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Dépendances techniques :</span>
                <p className="text-foreground mt-0.5">{current.dependencies}</p>
              </div>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border text-xs text-muted-foreground font-sans">
              <strong>Observation du Team Leader :</strong> {current.notes}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.2.13 — Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 2 : Préparer l'intégration des branches"
          questions={[
            {
              id: 1,
              question: "Quelle est la première information à confirmer avant de préparer l'intégration d'une contribution ?",
              options: [
                "La couleur associée à la branche dans l'IDE.",
                "L'identité de la branche et l'objectif de sa contribution.",
                "Le nombre total de branches présentes dans le dépôt.",
                "La date de création du dépôt Git."
              ],
              correctIndex: 1,
              explanation: "Il faut identifier précisément la branche et son objectif fonctionnel pour juger si ses modifications correspondent au périmètre attendu."
            },
            {
              id: 2,
              question: "Que permet principalement la commande git status ?",
              options: [
                "De fusionner la branche courante avec sa branche distante.",
                "De supprimer les fichiers non suivis par Git.",
                "D'examiner l'état du dépôt et les modifications locales.",
                "De vérifier automatiquement la qualité du code."
              ],
              correctIndex: 2,
              explanation: "git status affiche la branche courante, les modifications non indexées, les ajouts en zone de préparation et les fichiers non suivis."
            },
            {
              id: 3,
              question: "Quelle commande permet d'examiner graphiquement et de manière compacte l'historique de toutes les branches connues localement ?",
              options: [
                "git status --all",
                "git branch --merge",
                "git diff --graph",
                "git log --oneline --graph --decorate --all"
              ],
              correctIndex: 3,
              explanation: "Cette combinaison affiche l'arborescence complète des commits de manière lisible et graphique."
            },
            {
              id: 4,
              question: "Quel est le rôle principal de git fetch ?",
              options: [
                "Actualiser les références distantes suivies sans fusionner automatiquement leur contenu dans la branche courante.",
                "Fusionner immédiatement les changements distants dans la branche courante.",
                "Envoyer les commits locaux vers le dépôt distant.",
                "Réinitialiser la branche locale à l'état distant."
              ],
              correctIndex: 0,
              explanation: "git fetch met à jour les informations du serveur distant sans déclencher de fusion automatique ni altérer le répertoire de travail."
            },
            {
              id: 5,
              question: "Dans une comparaison git diff develop...feature/backend-tasks, que représente la syntaxe à trois points ?",
              options: [
                "La comparaison de tous les fichiers du dépôt avec leur version distante.",
                "La comparaison des changements introduits par la branche source depuis leur ancêtre commun avec la branche cible.",
                "La comparaison exclusive du dernier commit de chaque branche.",
                "La fusion des deux branches suivie d'une comparaison."
              ],
              correctIndex: 1,
              explanation: "La syntaxe à 3 points examine les modifications propres à la branche source depuis le point de divergence avec la cible."
            },
            {
              id: 6,
              question: "Pourquoi faut-il identifier les dépendances entre les contributions ?",
              options: [
                "Pour obliger tous les agents à utiliser une seule branche.",
                "Pour éviter que les agents travaillent simultanément.",
                "Pour déterminer les relations techniques et prévoir un ordre d'intégration cohérent.",
                "Pour supprimer les commits qui concernent plusieurs fonctionnalités."
              ],
              correctIndex: 2,
              explanation: "Connaître les dépendances permet de définir un ordonnancement logique (ex: backend avant frontend) et de prévenir les blocages."
            },
            {
              id: 7,
              question: "Un agent Backend a terminé un endpoint et un agent Frontend a développé un bouton qui l'utilise. Que faut-il vérifier en priorité avant de préparer leur intégration commune ?",
              options: [
                "Que les deux agents ont utilisé le même éditeur de code.",
                "Que leurs branches ont exactement le même nom.",
                "Que les commits ont été créés le même jour.",
                "Que le frontend respecte le contrat réel de l'API Backend."
              ],
              correctIndex: 3,
              explanation: "Il faut vérifier la compatibilité des signatures (routes, payloads JSON, statuts HTTP) pour éviter que le client n'échoue à l'exécution."
            },
            {
              id: 8,
              question: "Quels éléments contribuent à déterminer si une branche est prête à être proposée pour intégration ?",
              options: [
                "L'examen des modifications, l'identification des dépendances et l'état propre du dépôt et des commits.",
                "La simple existence de la branche dans le dépôt.",
                "Le fait que l'agent affirme qu'il a fini.",
                "Le nombre de lignes de code écrites."
              ],
              correctIndex: 0,
              explanation: "Une branche n'est prête que si ses modifications sont auditées, ses dépendances clarifiées et son état Git rigoureusement propre."
            },
            {
              id: 9,
              question: "Un dépôt Git propre garantit que la contribution qu'il contient est conforme à la mission et ne présente aucun défaut fonctionnel.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : un dépôt propre signifie simplement que le répertoire de travail n'a pas de changements non commités. Le code peut tout de même être buggé."
            },
            {
              id: 10,
              question: "La récupération des informations distantes avec git fetch déclenche automatiquement un merge dans la branche locale courante.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : git fetch se contente d'actualiser les métadonnées distantes. C'est git pull qui déclenche une fusion automatique."
            }
          ]}
        />
      </div>
    </div>
  );
};
