'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface BranchInfo {
  name: string;
  type: 'main' | 'feature' | 'fix' | 'test' | 'docs';
  agent: string;
  purpose: string;
  lastCommit: string;
}

const INITIAL_BRANCHES: BranchInfo[] = [
  {
    name: 'main',
    type: 'main',
    agent: 'Chef de Projet Humain',
    purpose: 'Branche principale de référence (code stable et audité)',
    lastCommit: 'a1b2c3d - Initialisation de la structure TaskFlow'
  },
  {
    name: 'feature/backend-task-api',
    type: 'feature',
    agent: 'Agent Backend',
    purpose: 'Implémentation des routes Express et du repository en mémoire',
    lastCommit: 'e4f5g6h - feat(backend): scaffolding routes /api/tasks'
  },
  {
    name: 'feature/frontend-task-list',
    type: 'feature',
    agent: 'Agent Frontend',
    purpose: 'Composants React TaskForm, TaskList et appels API fetch',
    lastCommit: '7i8j9k0 - feat(frontend): structure des composants Tasks'
  },
  {
    name: 'test/backend-e2e',
    type: 'test',
    agent: 'Agent QA',
    purpose: 'Suites de tests d\'intégration Vitest et Supertest',
    lastCommit: '1l2m3n4 - test(qa): spécifications des cas nominaux et d\'erreur'
  }
];

export function Chapitre6Content() {
  const [activeBranch, setActiveBranch] = useState<string>('main');
  const [governanceAlert, setGovernanceAlert] = useState<string | null>(null);

  const currentBranchData = INITIAL_BRANCHES.find((b) => b.name === activeBranch) || INITIAL_BRANCHES[0];

  const handleUnauthorizedAction = (actionName: string) => {
    setGovernanceAlert(
      `Action bloquée [${actionName}] : Aucun agent ni Team Leader n'est autorisé à exécuter un merge, un rebase ou un push sans validation formelle et écrite du Chef de Projet humain.`
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
            Chapitre 10.6
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Initialiser le dépôt Git et organiser les branches
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Mise en place du contrôle de version local avec Git, convention de nommage des branches par mission d&apos;agent, et protection de la branche principale <code>main</code> sous gouvernance humaine stricte.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="danger" title="Règle d'or absolue de gouvernance Git">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          La branche <code>main</code> est le sanctuaire de référence du projet. <strong>Aucun agent ni Team Leader n&apos;est autorisé à exécuter <code>git merge</code>, <code>git rebase</code> ou <code>git push</code> sans autorisation formelle et écrite du Chef de Projet humain</strong>. Tout livrable d&apos;agent doit rester sur sa branche isolée jusqu&apos;à l&apos;audit final.
        </p>
      </Callout>

      {/* Section 1 : Les 3 zones de Git */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="folder" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              6.2. Les trois zones fondamentales de Git
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Git structure le suivi des modifications à travers trois états distincts, garantissant qu&apos;aucun fichier temporaire n&apos;entre par inadvertance dans l&apos;historique :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-primary shrink-0" />
                1. Répertoire de travail (Working Directory)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Les fichiers réels présents sur le disque dur. Git détecte les ajouts, suppressions et modifications locales par rapport au dernier commit.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-amber-500 shrink-0" />
                2. Zone de préparation (Staging Area / Index)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Alimentée via <code>git add</code>. C&apos;est le sas de sélection où l&apos;on vérifie (via <code>git diff --cached</code>) les exactes lignes qui composeront le prochain commit.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 text-emerald-500 shrink-0" />
                3. Dépôt local (Git History / Repository)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Enregistré via <code>git commit -m &quot;...&quot;</code> dans le dossier interne <code>.git/</code>. Un état immuable, traçable et associé à un auteur avec date et identifiant SHA.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Initialisation pas à pas */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              6.4 à 6.6. Initialisation du dépôt et commit initial
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {/* Étape 1 */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                1. Initialiser le dépôt à la racine de taskflow/
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">git init</Badge>
            </div>
            <pre className="p-2.5 rounded bg-muted/40 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`cd taskflow
git init -b main
# Ou sur anciennes versions de Git :
# git init && git branch -M main`}
            </pre>
          </div>

          {/* Étape 2 */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                2. Configurer l&apos;identité locale
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">git config</Badge>
            </div>
            <pre className="p-2.5 rounded bg-muted/40 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`# Sans le flag --global pour cibler uniquement le projet TaskFlow
git config user.name "Chef de Projet TaskFlow"
git config user.email "pm@taskflow.local"`}
            </pre>
          </div>

          {/* Étape 3 */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                3. Vérifier le respect de .gitignore & Préparer le commit
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">git status</Badge>
            </div>
            <pre className="p-2.5 rounded bg-muted/40 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`# 1. Vérifier qu'aucun node_modules/ ni dist/ n'est présent
git status --short

# 2. Ajout explicite des ressources saines
git add README.md .gitignore frontend backend

# 3. Vérifier les deltas préparés
git diff --cached --stat

# 4. Commit initial
git commit -m "Initialisation de la structure TaskFlow"

# 5. Contrôler l'historique
git log --oneline`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Convention de nommage des branches */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              6.7. Convention de nommage des branches par mission
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Pour que le Chef de Projet humain et le Team Leader sachent immédiatement qui intervient sur quoi, une nomenclature stricte est imposée :
          </p>

          <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full">
            <div className="p-2.5 rounded border border-border/40 bg-muted/10 flex flex-col gap-1">
              <span className="font-semibold text-foreground font-mono text-xs">feature/&lt;domaine&gt;-&lt;description&gt;</span>
              <p className="text-xs text-muted-foreground">Exemple : <code>feature/backend-task-api</code> ou <code>feature/frontend-task-list</code>. Dédiée à l&apos;implémentation d&apos;une fonctionnalité nouvelle.</p>
            </div>
            <div className="p-2.5 rounded border border-border/40 bg-muted/10 flex flex-col gap-1">
              <span className="font-semibold text-foreground font-mono text-xs">fix/&lt;domaine&gt;-&lt;description&gt;</span>
              <p className="text-xs text-muted-foreground">Exemple : <code>fix/backend-uuid-validation</code>. Dédiée à la correction ciblée d&apos;une anomalie identifiée par l&apos;agent QA ou le Reviewer.</p>
            </div>
            <div className="p-2.5 rounded border border-border/40 bg-muted/10 flex flex-col gap-1">
              <span className="font-semibold text-foreground font-mono text-xs">test/&lt;domaine&gt;-&lt;description&gt;</span>
              <p className="text-xs text-muted-foreground">Exemple : <code>test/backend-e2e</code>. Dédiée à l&apos;écriture des suites de tests unitaires et d&apos;intégration.</p>
            </div>
            <div className="p-2.5 rounded border border-border/40 bg-muted/10 flex flex-col gap-1">
              <span className="font-semibold text-foreground font-mono text-xs">docs/&lt;description&gt;</span>
              <p className="text-xs text-muted-foreground">Exemple : <code>docs/api-contracts</code>. Réservée aux spécifications, README et contrats d&apos;interface.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4 : Simulateur interactif */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Simulateur interactif : Terminal Git & Garde-Fou de Gouvernance
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Basculez entre les branches d&apos;agents pour inspecter leurs missions et testez les actions sensibles (merge/push) pour observer le contrôle de gouvernance.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Sélection des branches en boutons horizontaux wrap */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {INITIAL_BRANCHES.map((b) => {
              const isCurrent = b.name === activeBranch;
              return (
                <Button
                  key={b.name}
                  variant={isCurrent ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveBranch(b.name);
                    setGovernanceAlert(null);
                  }}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5"
                >
                  <Icon name="code" className="h-3.5 w-3.5 shrink-0" />
                  <span className="font-mono">{b.name}</span>
                </Button>
              );
            })}
          </div>

          {/* Fiche de la branche active */}
          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-foreground">
                <Icon name="code" className="h-4 w-4 text-primary shrink-0" />
                <span>Branche courante : {currentBranchData.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                Type : {currentBranchData.type}
              </Badge>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Agent affecté :
                </span>
                <span className="text-foreground font-medium flex items-center gap-1.5">
                  <Icon name="user" className="h-4 w-4 text-primary shrink-0" />
                  {currentBranchData.agent}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Mission :
                </span>
                <p className="text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                  {currentBranchData.purpose}
                </p>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Dernier commit :
                </span>
                <span className="font-mono text-xs text-foreground p-1.5 rounded bg-muted/40">
                  {currentBranchData.lastCommit}
                </span>
              </div>
            </div>
          </div>

          {/* Boutons d'actions critiques */}
          <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 flex flex-col gap-3 w-full min-w-0 max-w-full">
            <span className="font-semibold text-foreground text-xs sm:text-sm">
              Tester les commandes sensibles dans l&apos;environnement d&apos;agent :
            </span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnauthorizedAction('git merge')}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400"
              >
                <Icon name="code" className="h-3.5 w-3.5 shrink-0" />
                <span>Tenter &quot;git merge main&quot;</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnauthorizedAction('git push')}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5 border-rose-500/40 text-rose-600 dark:text-rose-400"
              >
                <Icon name="shield-check" className="h-3.5 w-3.5 shrink-0" />
                <span>Tenter &quot;git push origin main&quot;</span>
              </Button>
            </div>

            {governanceAlert && (
              <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex flex-col gap-1 text-xs">
                <div className="flex items-center gap-2 font-semibold">
                  <Icon name="shield-check" className="h-4 w-4 shrink-0 text-rose-500" />
                  <span>Garde-Fou de Sécurité Déclenché</span>
                </div>
                <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                  {governanceAlert}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 5 : Quiz */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="shield-check" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Vérifier les connaissances — Quiz officiel
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <QuickQuiz
            questions={[
              {
                id: 1,
                question: "Quel est le rôle principal de Git dans le projet TaskFlow ?",
                options: [
                  "Installer les dépendances du frontend.",
                  "Suivre les modifications et conserver l'historique du projet.",
                  "Démarrer le serveur Express.",
                  "Exécuter les tests de l'application."
                ],
                correctIndex: 1,
                explanation: "Git permet de suivre les modifications apportées aux fichiers du projet au cours du temps et de conserver leur historique complet."
              },
              {
                id: 2,
                question: "Dans quel dossier faut-il initialiser le dépôt Git de TaskFlow ?",
                options: [
                  "Uniquement dans frontend/.",
                  "Uniquement dans backend/.",
                  "Dans le dossier racine taskflow/.",
                  "Dans node_modules/."
                ],
                correctIndex: 2,
                explanation: "Le dépôt Git doit être initialisé à la racine taskflow/ pour suivre ensemble le frontend, le backend et la documentation commune dans un référentiel unique."
              },
              {
                id: 3,
                question: "Quelle commande permet de placer des fichiers dans la zone de préparation avant un commit ?",
                options: [
                  "git commit",
                  "git add",
                  "git push",
                  "git switch"
                ],
                correctIndex: 1,
                explanation: "git add place les modifications dans la zone de préparation (staging area / index) pour préparer le futur commit."
              },
              {
                id: 4,
                question: "Quel est le rôle de la branche main dans l'organisation proposée ?",
                options: [
                  "Contenir exclusivement les tests automatisés.",
                  "Servir de branche principale de référence du projet.",
                  "Remplacer toutes les branches de travail.",
                  "Contenir uniquement les fichiers du frontend."
                ],
                correctIndex: 1,
                explanation: "La branche main est la référence centrale stable du projet. Elle ne reçoit que des modifications vérifiées et autorisées sous supervision humaine."
              },
              {
                id: 5,
                question: "Quelles affirmations concernant les branches Git sont exactes ? (Sélectionnez la proposition exacte)",
                options: [
                  "Une branche permet d'isoler une ligne de travail et correspond à une mission d'agent.",
                  "La création d'une branche réalise automatiquement un merge avec main.",
                  "Créer une branche garantit qu'aucun conflit ne pourra jamais survenir.",
                  "Toutes les branches doivent être supprimées avant le premier commit."
                ],
                correctIndex: 0,
                explanation: "Une branche isole une ligne de travail indépendante associée à une mission spécifique. La création d'une branche ne fusionne rien et ne prévient pas magiquement les conflits futurs."
              },
              {
                id: 6,
                question: "Quelle commande permet de créer une branche appelée feature/backend-task-api et de basculer dessus ?",
                options: [
                  "git branch feature/backend-task-api --merge",
                  "git switch -c feature/backend-task-api",
                  "git push feature/backend-task-api",
                  "git commit feature/backend-task-api"
                ],
                correctIndex: 1,
                explanation: "La commande moderne git switch -c nom-branche (ou git checkout -b) crée la branche et positionne immédiatement le HEAD dessus."
              },
              {
                id: 7,
                question: "Un commit enregistre un ensemble de modifications dans l'historique local du dépôt Git.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. Le commit enregistre un instantané immuable des modifications préparées dans l'historique local du dépôt avec auteur, date et message."
              },
              {
                id: 8,
                question: "Dans l'organisation de TaskFlow, un agent peut effectuer librement un push ou un merge sans demander l'autorisation du Project Manager humain.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Règle absolue de gouvernance : aucun agent ni Team Leader ne peut exécuter git merge, git rebase ou git push sans accord explicite et écrit du Chef de Projet humain."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
