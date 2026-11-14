'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface WorktreeState {
  id: string;
  folder: string;
  branch: string;
  agent: string;
  role: string;
  npmCiInstalled: boolean;
}

const INITIAL_WORKTREES: WorktreeState[] = [
  {
    id: 'main-wt',
    folder: 'taskflow/',
    branch: 'main',
    agent: 'Chef de Projet Humain / Team Leader',
    role: 'Répertoire principal de supervision, d\'audit et de coordination.',
    npmCiInstalled: true
  },
  {
    id: 'be-wt',
    folder: 'taskflow-backend/',
    branch: 'feature/backend-task-api',
    agent: 'Agent Backend',
    role: 'Espace de développement isolé pour l\'API Express et les repositories.',
    npmCiInstalled: false
  },
  {
    id: 'fe-wt',
    folder: 'taskflow-frontend/',
    branch: 'feature/frontend-task-list',
    agent: 'Agent Frontend',
    role: 'Espace de développement isolé pour les composants React et l\'interface.',
    npmCiInstalled: false
  },
  {
    id: 'qa-wt',
    folder: 'taskflow-qa/',
    branch: 'test/backend-api',
    agent: 'Agent QA',
    role: 'Espace d\'exécution des tests unitaires et d\'intégration Supertest.',
    npmCiInstalled: false
  }
];

export function Chapitre7Content() {
  const [worktrees, setWorktrees] = useState<WorktreeState[]>(INITIAL_WORKTREES);
  const [selectedWtId, setSelectedWtId] = useState<string>('be-wt');
  const [conflictAlert, setConflictAlert] = useState<string | null>(null);

  const currentWt = worktrees.find((w) => w.id === selectedWtId) || worktrees[0];

  const handleInstallDependencies = (wtId: string) => {
    setWorktrees((prev) =>
      prev.map((w) => (w.id === wtId ? { ...w, npmCiInstalled: true } : w))
    );
  };

  const handleAttemptDuplicateBranch = () => {
    setConflictAlert(
      "fatal: 'feature/backend-task-api' is already checked out at '.../taskflow-backend'. Git interdit d'extraire la même branche simultanément dans deux worktrees actifs."
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* Entête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 shrink-0">
            Module 10 • Projet TaskFlow
          </Badge>
          <Badge variant="secondary" className="text-xs shrink-0">
            Chapitre 10.7
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Créer et organiser les Git Worktrees
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Fournir à chaque agent IA un espace de travail physique dédié sans multiplier les clones Git. Isolation des fichiers, gestion indépendante des <code>node_modules/</code> et règles de nettoyage.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance Git & Worktrees">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Les Git Worktrees facilitent le développement simultané de plusieurs agents sans conflits de fichiers locaux. Cependant, <strong>l&apos;existence de worktrees ne confère aucun droit automatique d&apos;intégration : aucun merge, rebase ou push ne doit être exécuté sans l&apos;accord explicite et écrit du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Pourquoi les worktrees */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="folder" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">1. Comprendre les Git Worktrees vs Branches classiques</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Dans un flux de travail classique à un seul développeur, on bascule de branche avec <code>git switch</code> dans un unique répertoire. Avec une équipe d&apos;agents autonomes travaillant en parallèle, cette approche est intenable : le changement de branche opéré par un agent détruirait l&apos;espace de travail d&apos;un autre agent en pleine session d&apos;écriture.
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="folder" className="h-4 w-4 text-primary shrink-0" />
                Un seul historique partagé (<code>.git/</code> central)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Contrairement à un <code>git clone</code> complet qui dupliquerait tout l&apos;historique et gaspillerait l&apos;espace disque, les worktrees partagent la base d&apos;objets Git, les commits et les références du dépôt principal.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="server" className="h-4 w-4 text-emerald-500 shrink-0" />
                Des répertoires physiques distincts
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Chaque agent dispose de son propre dossier racine (ex: <code>../taskflow-backend/</code>), de son index et de sa référence HEAD. L&apos;Agent Frontend peut compiler et lancer Vite sans affecter le serveur Express démarré par l&apos;Agent Backend.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Commandes pas à pas */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">2. Création des Git Worktrees pas à pas</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Toutes les créations s&apos;effectuent depuis la racine du dépôt principal <code>taskflow/</code> positionné sur la branche <code>main</code> :
          </p>

          {/* Backend */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                1. Worktree de l&apos;Agent Backend
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">Backend</Badge>
            </div>
            <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`# Création du dossier ../taskflow-backend et de sa branche
git worktree add -b feature/backend-task-api ../taskflow-backend main

# Installation des dépendances isolées dans le worktree
cd ../taskflow-backend/backend
npm ci
cd ../../taskflow`}
            </div>
          </div>

          {/* Frontend */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                2. Worktree de l&apos;Agent Frontend
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">Frontend</Badge>
            </div>
            <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`# Création du dossier ../taskflow-frontend et de sa branche
git worktree add -b feature/frontend-task-list ../taskflow-frontend main

# Installation des dépendances isolées dans le worktree
cd ../taskflow-frontend/frontend
npm ci
cd ../../taskflow`}
            </div>
          </div>

          {/* QA */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                3. Worktree de l&apos;Agent QA (Tests)
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">QA</Badge>
            </div>
            <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`# Création du dossier ../taskflow-qa et de sa branche
git worktree add -b test/backend-api ../taskflow-qa main

# Installation des dépendances backend nécessaires aux tests Supertest
cd ../taskflow-qa/backend
npm ci
cd ../../taskflow`}
            </div>
          </div>

          {/* Contrôle */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                4. Lister et Nettoyer les Worktrees
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">Maintenance</Badge>
            </div>
            <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`# Lister tous les espaces de travail actifs
git worktree list

# Supprimer un worktree une fois la mission achevée et validée (depuis taskflow/)
git worktree remove ../taskflow-backend`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de Worktrees */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="server" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">3. Simulateur interactif : Gestionnaire des Git Worktrees d&apos;Équipe</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Sélectionnez un worktree pour observer son assignation, son isolation de dépendances, et tester la contrainte Git d&apos;unicité de branche.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Sélection des worktrees en boutons horizontaux wrap */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {worktrees.map((wt) => {
              const isSelected = wt.id === selectedWtId;
              return (
                <Button
                  key={wt.id}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setSelectedWtId(wt.id);
                    setConflictAlert(null);
                  }}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5 font-mono"
                >
                  <Icon name="folder" className="h-3.5 w-3.5 shrink-0" />
                  <span>{wt.folder}</span>
                </Button>
              );
            })}
          </div>

          {/* Fiche détaillée du worktree */}
          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
              <div className="flex items-center gap-2">
                <Icon name="folder" className="h-4 w-4 text-primary shrink-0" />
                <span className="font-bold text-sm sm:text-base text-foreground font-mono">
                  {currentWt.folder}
                </span>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                [{currentWt.branch}]
              </Badge>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Agent propriétaire :
                </span>
                <span className="text-foreground font-medium flex items-center gap-1.5">
                  <Icon name="user" className="h-4 w-4 text-primary shrink-0" />
                  {currentWt.agent}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Rôle de cet espace :
                </span>
                <p className="text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                  {currentWt.role}
                </p>
              </div>

              <div className="flex flex-col gap-1 mt-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  État des dépendances locales (node_modules/) :
                </span>
                <div className="flex items-center gap-2">
                  {currentWt.npmCiInstalled ? (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 text-xs flex items-center gap-1">
                      <Icon name="check-circle" className="h-3 w-3 shrink-0" />
                      <span>npm ci exécuté — node_modules/ présent</span>
                    </Badge>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs flex items-center gap-1">
                        <Icon name="info" className="h-3 w-3 shrink-0" />
                        <span>node_modules/ manquant</span>
                      </Badge>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleInstallDependencies(currentWt.id)}
                        className="h-7 text-xs shrink-0 flex items-center gap-1"
                      >
                        <Icon name="folder" className="h-3 w-3 shrink-0" />
                        <span>Exécuter &quot;npm ci&quot;</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Test de contrainte Git */}
          <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 flex flex-col gap-3 w-full min-w-0 max-w-full">
            <span className="font-semibold text-foreground text-xs sm:text-sm">
              Tester la contrainte d&apos;unicité de branche Git :
            </span>
            <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Tenter d&apos;extraire la branche <code>feature/backend-task-api</code> dans un autre worktree simultané.
            </p>
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAttemptDuplicateBranch}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5 border-primary/30"
              >
                <Icon name="code" className="h-3.5 w-3.5 shrink-0" />
                <span>Simuler checkout en doublon</span>
              </Button>
            </div>

            {conflictAlert && (
              <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex flex-col gap-1 text-xs">
                <div className="flex items-center gap-2 font-semibold">
                  <Icon name="shield-check" className="h-4 w-4 shrink-0 text-rose-500" />
                  <span>Contrainte Git respectée</span>
                </div>
                <div className="font-mono text-[11px] p-2 rounded bg-black border border-slate-800 text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
                  {conflictAlert}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 4 : Quiz */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="shield-check" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">4. Vérifier les connaissances — Quiz officiel</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <QuickQuiz
            questions={[
              {
                id: 1,
                question: "Quelle est la différence principale entre une branche Git et un Git Worktree ?",
                options: [
                  "Une branche est un répertoire, tandis qu'un worktree est un commit.",
                  "Une branche représente une ligne d'évolution, tandis qu'un worktree fournit un répertoire de travail.",
                  "Une branche contient les dépendances, tandis qu'un worktree contient les tests.",
                  "Une branche remplace le dépôt, tandis qu'un worktree remplace Git."
                ],
                correctIndex: 1,
                explanation: "Une branche organise l'évolution chronologique des commits, tandis qu'un worktree fournit un répertoire de travail physique sur disque permettant de consulter et modifier les fichiers associés."
              },
              {
                id: 2,
                question: "Que partagent plusieurs worktrees associés au même dépôt Git ?",
                options: [
                  "Tous leurs fichiers temporaires et leurs dossiers node_modules/.",
                  "Leurs répertoires de travail complets.",
                  "Les données Git et l'historique du dépôt.",
                  "Leurs fichiers .env locaux."
                ],
                correctIndex: 2,
                explanation: "Les worktrees partagent la base d'objets Git et l'historique commun du dépôt (dossier central .git/). En revanche, leurs répertoires de travail et dossiers node_modules/ restent distincts."
              },
              {
                id: 3,
                question: "Quelle commande permet de créer un worktree avec une nouvelle branche appelée feature/backend-task-api, à partir de main ?",
                options: [
                  "git branch add feature/backend-task-api",
                  "git worktree add -b feature/backend-task-api ../taskflow-backend main",
                  "git switch feature/backend-task-api ../taskflow-backend",
                  "git worktree remove feature/backend-task-api"
                ],
                correctIndex: 1,
                explanation: "git worktree add -b <branche> <chemin> <source> crée la nouvelle branche à partir de main et prépare simultanément le nouveau répertoire de travail."
              },
              {
                id: 4,
                question: "Pourquoi faut-il généralement installer les dépendances npm dans chaque worktree qui en a besoin ?",
                options: [
                  "Parce que les dossiers node_modules/ ne sont pas automatiquement partagés entre les worktrees.",
                  "Parce que Git supprime les fichiers package.json lors de la création d'un worktree.",
                  "Parce que chaque worktree utilise obligatoirement une version différente de Node.js.",
                  "Parce que git worktree add supprime les fichiers de configuration."
                ],
                correctIndex: 0,
                explanation: "node_modules/ est exclu par .gitignore. Lorsqu'un worktree est créé, Git ne déploie que les fichiers suivis. Il faut donc exécuter npm ci dans chaque worktree pour instancier ses modules locaux."
              },
              {
                id: 5,
                question: "Quelles affirmations concernant les worktrees sont exactes ? (Sélectionnez la proposition exacte)",
                options: [
                  "Chaque worktree possède son propre répertoire de travail et ils partagent l'historique Git.",
                  "Une même branche peut être extraite simultanément dans plusieurs worktrees du même dépôt.",
                  "Les worktrees suppriment automatiquement tous les conflits de code lors des fusions.",
                  "Les worktrees obligent à cloner le dépôt complet sur un autre disque."
                ],
                correctIndex: 0,
                explanation: "Chaque worktree dispose de ses propres fichiers sur disque tout en partageant l'historique Git. Git refuse d'extraire la même branche sur deux worktrees actifs, et les worktrees n'annulent pas les conflits logiques de code."
              },
              {
                id: 6,
                question: "Quelle commande permet d'afficher les worktrees associés à un dépôt ?",
                options: [
                  "git branch --delete",
                  "git worktree list",
                  "git worktree commit",
                  "git status --worktrees"
                ],
                correctIndex: 1,
                explanation: "git worktree list liste l'ensemble des répertoires de travail rattachés au dépôt avec leurs chemins absolus et leurs branches associées."
              },
              {
                id: 7,
                question: "La suppression d'un worktree avec git worktree remove supprime automatiquement et systématiquement la branche qui lui était associée.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. git worktree remove retire le répertoire de travail et son métadonnées d'ancrage, mais la branche Git locale reste intacte dans l'historique du dépôt."
              },
              {
                id: 8,
                question: "Les Git Worktrees autorisent automatiquement les agents à effectuer des merges ou des pushes sans validation humaine.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Les worktrees sont une commodité d'isolation locale. La règle de gouvernance humaine reste intangible : tout merge, rebase ou push exige l'autorisation écrite du PM."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
