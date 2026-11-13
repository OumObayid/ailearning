'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  part: 'root' | 'frontend' | 'backend' | 'docs';
  agent: string;
  role: string;
  tech: string;
  verificationCmd?: string;
}

const PROJECT_TREE: TreeNode[] = [
  {
    id: 'root',
    name: 'taskflow/',
    type: 'folder',
    part: 'root',
    agent: 'Chef de Projet / Team Leader',
    role: 'Racine du projet fédérant le frontend, le backend et la documentation commune.',
    tech: 'Monorepo pédagogique / Racine Git',
    verificationCmd: 'pwd (Bash) ou Get-Location (PowerShell)'
  },
  {
    id: 'readme',
    name: 'README.md',
    type: 'file',
    part: 'docs',
    agent: 'Architect & Team Leader',
    role: 'Documentation centrale : présentation, fonctionnalités, technologies et commandes.',
    tech: 'Markdown',
    verificationCmd: 'cat README.md (ou Get-Content)'
  },
  {
    id: 'fe-dir',
    name: 'frontend/',
    type: 'folder',
    part: 'frontend',
    agent: 'Agent Frontend',
    role: 'Application Single Page React, scripts Vite, configuration TypeScript frontend.',
    tech: 'React 18, Vite, TypeScript',
    verificationCmd: 'cd frontend && ls'
  },
  {
    id: 'fe-src',
    name: 'frontend/src/',
    type: 'folder',
    part: 'frontend',
    agent: 'Agent Frontend',
    role: 'Code source de l\'interface utilisateur React.',
    tech: 'TypeScript, TSX, CSS',
    verificationCmd: 'ls frontend/src'
  },
  {
    id: 'fe-components',
    name: 'frontend/src/components/',
    type: 'folder',
    part: 'frontend',
    agent: 'Agent Frontend',
    role: 'Composants réutilisables d\'affichage (formulaires, listes, compteurs, items).',
    tech: 'React TSX',
    verificationCmd: 'ls frontend/src/components'
  },
  {
    id: 'fe-pages',
    name: 'frontend/src/pages/',
    type: 'folder',
    part: 'frontend',
    agent: 'Agent Frontend',
    role: 'Pages principales orchestrant les composants (ex: TasksPage.tsx).',
    tech: 'React TSX',
    verificationCmd: 'ls frontend/src/pages'
  },
  {
    id: 'fe-services',
    name: 'frontend/src/services/',
    type: 'folder',
    part: 'frontend',
    agent: 'Agent Frontend',
    role: 'Clients HTTP et appels réseau vers l\'API Express (ex: taskApi.ts).',
    tech: 'Fetch API / REST',
    verificationCmd: 'ls frontend/src/services'
  },
  {
    id: 'fe-types',
    name: 'frontend/src/types/',
    type: 'folder',
    part: 'frontend',
    agent: 'Agent Frontend & Architect',
    role: 'Interfaces et types TypeScript modélisant les tâches côté client.',
    tech: 'TypeScript Interfaces',
    verificationCmd: 'ls frontend/src/types'
  },
  {
    id: 'be-dir',
    name: 'backend/',
    type: 'folder',
    part: 'backend',
    agent: 'Agent Backend',
    role: 'API REST autonome Node.js/Express, scripts de démarrage et tests Supertest.',
    tech: 'Node.js, Express, TypeScript',
    verificationCmd: 'cd backend && ls'
  },
  {
    id: 'be-routes',
    name: 'backend/src/routes/',
    type: 'folder',
    part: 'backend',
    agent: 'Agent Backend',
    role: 'Définition des points d\'entrée HTTP Express (/api/tasks).',
    tech: 'Express Router',
    verificationCmd: 'ls backend/src/routes'
  },
  {
    id: 'be-controllers',
    name: 'backend/src/controllers/',
    type: 'folder',
    part: 'backend',
    agent: 'Agent Backend',
    role: 'Validation des requêtes HTTP, extraction des paramètres et envoi des statuts HTTP.',
    tech: 'Express Request/Response',
    verificationCmd: 'ls backend/src/controllers'
  },
  {
    id: 'be-services',
    name: 'backend/src/services/',
    type: 'folder',
    part: 'backend',
    agent: 'Agent Backend',
    role: 'Logique métier, règles de validation et orchestration des tâches.',
    tech: 'TypeScript Classes/Functions',
    verificationCmd: 'ls backend/src/services'
  },
  {
    id: 'be-repositories',
    name: 'backend/src/repositories/',
    type: 'folder',
    part: 'backend',
    agent: 'Agent Backend',
    role: 'Persistance en mémoire des tâches via une Map JavaScript.',
    tech: 'Map<string, Task>',
    verificationCmd: 'ls backend/src/repositories'
  },
  {
    id: 'be-app',
    name: 'backend/src/app.ts',
    type: 'file',
    part: 'backend',
    agent: 'Agent Backend & Architect',
    role: 'Configuration de l\'application Express (middlewares, routes) SANS listen(). Idéal pour les tests.',
    tech: 'Express Application',
    verificationCmd: 'cat backend/src/app.ts'
  },
  {
    id: 'be-server',
    name: 'backend/src/server.ts',
    type: 'file',
    part: 'backend',
    agent: 'Agent Backend',
    role: 'Point d\'entrée exécutable qui démarre le serveur HTTP sur le port configuré (port 3001).',
    tech: 'HTTP Server / listen()',
    verificationCmd: 'cat backend/src/server.ts'
  },
  {
    id: 'be-tests',
    name: 'backend/tests/',
    type: 'folder',
    part: 'backend',
    agent: 'Agent QA',
    role: 'Tests d\'intégration HTTP et tests unitaires du backend.',
    tech: 'Vitest + Supertest',
    verificationCmd: 'ls backend/tests'
  }
];

export function Chapitre4Content() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('root');
  const currentNode = PROJECT_TREE.find((n) => n.id === selectedNodeId) || PROJECT_TREE[0];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* Entête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 shrink-0">
            Module 10 • Projet TaskFlow
          </Badge>
          <Badge variant="secondary" className="text-xs shrink-0">
            Chapitre 10.4
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Créer la structure du projet TaskFlow
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Passer de la conception architecturale à la préparation concrète des dossiers et fichiers de TaskFlow. Organisation séparée du frontend et du backend pour permettre une collaboration fluide entre agents spécialisés.
        </p>
      </div>

      {/* Rappel gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance Git & Orchestration">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          La création de l&apos;arborescence prépare les zones de travail des agents mais ne constitue en aucun cas une validation technique complète de l&apos;application. <strong>Aucun agent ou Team Leader n&apos;est autorisé à exécuter un merge, un rebase ou un push sans validation formelle et écrite du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Pourquoi organiser la structure */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="folder" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              4.2. Comprendre la structure d&apos;un projet logiciel
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Un projet logiciel regroupe plusieurs typologies de fichiers : code source, fichiers de configuration, suites de tests, documentation et métadonnées d&apos;outillage. Si tous ces fichiers étaient placés en vrac dans un dossier unique, la navigation deviendrait chaotique et les agents IA risqueraient des collisions massives de modifications.
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 text-emerald-500 shrink-0" />
                Séparation stricte des responsabilités
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Le frontend gère l&apos;interface utilisateur et les interactions navigateur. Le backend gère les requêtes HTTP, applique les règles métier et persiste les tâches en mémoire. Les isoler dans deux répertoires autonomes permet de délimiter les technologies et les dépendances.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="user" className="h-4 w-4 text-primary shrink-0" />
                Zones de travail dédiées pour chaque agent
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                L&apos;Agent Frontend opère dans <code>frontend/src/</code>, l&apos;Agent Backend dans <code>backend/src/</code>, et l&apos;Agent QA dans <code>backend/tests/</code>. Cette frontière physique prévient les modifications accidentelles et les réécritures croisées de fichiers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Commandes de création pas à pas */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              4.3 à 4.7. Initialisation des dossiers pas à pas
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Depuis votre IDE Antigravity, ouvrez le terminal intégré à la racine de votre espace de travail pour orchestrer la création des dossiers.
          </p>

          {/* Étape 1 */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                1. Racine du projet & Vérification de l&apos;environnement
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">Racine</Badge>
            </div>
            <pre className="p-2.5 rounded bg-muted/40 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`node -v
npm -v
mkdir taskflow
cd taskflow`}
            </pre>
          </div>

          {/* Étape 2 */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                2. Initialisation du Frontend (Vite + React + TypeScript)
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">Frontend</Badge>
            </div>
            <pre className="p-2.5 rounded bg-muted/40 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`npm create vite@latest frontend -- --template react-ts

# Création des sous-répertoires fonctionnels (Bash)
mkdir -p frontend/src/components frontend/src/pages frontend/src/services frontend/src/types

# En PowerShell :
# New-Item -ItemType Directory -Force -Path frontend/src/components, frontend/src/pages, frontend/src/services, frontend/src/types`}
            </pre>
          </div>

          {/* Étape 3 */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                3. Initialisation du Backend (Node.js + Express)
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">Backend</Badge>
            </div>
            <pre className="p-2.5 rounded bg-muted/40 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`mkdir backend
cd backend
npm init -y
cd ..

# Création des 4 couches backend et des tests (Bash)
mkdir -p backend/src/routes backend/src/controllers backend/src/services backend/src/repositories backend/src/types backend/tests

# En PowerShell :
# New-Item -ItemType Directory -Force -Path backend/src/routes, backend/src/controllers, backend/src/services, backend/src/repositories, backend/src/types, backend/tests`}
            </pre>
          </div>

          {/* Étape 4 */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                4. Création de la documentation générale (README.md)
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">Docs</Badge>
            </div>
            <pre className="p-2.5 rounded bg-muted/40 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`# Création du fichier README à la racine de taskflow/
# Bash : touch README.md
# PowerShell : New-Item -ItemType File -Path README.md`}
            </pre>
            <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Le fichier <code>README.md</code> résume les 6 fonctionnalités de TaskFlow, les technologies (React/Vite/TS et Node/Express/TS) et la structure des répertoires pour guider tous les agents dès leur onboarding.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif d'arborescence */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="layout" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Simulateur interactif : Explorateur d&apos;Arborescence & Rôles des Répertoires
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Cliquez sur un dossier ou un fichier de l&apos;arborescence pour examiner son rôle, l&apos;agent responsable, sa technologie et la commande de vérification correspondante.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Liste de sélection en boutons horizontaux wrap */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {PROJECT_TREE.map((node) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <Button
                  key={node.id}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedNodeId(node.id)}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5"
                >
                  {node.type === 'folder' ? (
                    isSelected ? <Icon name="folder" className="h-3.5 w-3.5 shrink-0" /> : <Icon name="folder" className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <Icon name="code" className="h-3.5 w-3.5 shrink-0" />
                  )}
                  <span>{node.name}</span>
                </Button>
              );
            })}
          </div>

          {/* Fiche d'information sur le nœud sélectionné */}
          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
              <div className="flex items-center gap-2">
                {currentNode.type === 'folder' ? (
                  <Icon name="folder" className="h-5 w-5 text-primary shrink-0" />
                ) : (
                  <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
                )}
                <span className="font-bold text-sm sm:text-base text-foreground font-mono">
                  {currentNode.name}
                </span>
              </div>
              <Badge variant="outline" className="text-xs shrink-0">
                Partie : {currentNode.part}
              </Badge>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-foreground text-xs uppercase tracking-wider text-muted-foreground">
                  Agent propriétaire :
                </span>
                <span className="text-foreground font-medium flex items-center gap-1.5">
                  <Icon name="user" className="h-4 w-4 text-primary shrink-0" />
                  {currentNode.agent}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-foreground text-xs uppercase tracking-wider text-muted-foreground">
                  Rôle & Responsabilité :
                </span>
                <p className="text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                  {currentNode.role}
                </p>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-foreground text-xs uppercase tracking-wider text-muted-foreground">
                  Technologie / Format :
                </span>
                <span className="text-foreground font-mono text-xs">
                  {currentNode.tech}
                </span>
              </div>

              {currentNode.verificationCmd && (
                <div className="flex flex-col gap-0.5 mt-1">
                  <span className="font-semibold text-foreground text-xs uppercase tracking-wider text-muted-foreground">
                    Commande de contrôle :
                  </span>
                  <pre className="p-2 rounded bg-background/80 border border-border/40 font-mono text-xs text-foreground overflow-x-auto whitespace-pre-wrap break-all">
                    {currentNode.verificationCmd}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4 : Séparation app.ts et server.ts */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="server" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              4.6.5. Séparation essentielle : app.ts vs server.ts
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Une erreur fréquente consiste à regrouper la création de l&apos;application Express et son écoute sur le port dans un fichier unique. Dans TaskFlow, nous imposons une scission nette en deux fichiers :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-primary shrink-0" />
                <code>backend/src/app.ts</code> — Configuration Express
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Configure les middlewares (parsing JSON, headers CORS), monte les routeurs Express et gère les erreurs. <strong>Ne contient aucun appel à <code>app.listen()</code></strong>. Ce composant est exporté pour être injecté directement dans Supertest lors des tests d&apos;intégration sans ouvrir de socket réseau réel.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="server" className="h-4 w-4 text-emerald-500 shrink-0" />
                <code>backend/src/server.ts</code> — Démarrage du serveur
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Importe l&apos;instance <code>app</code> depuis <code>app.ts</code>, lit le port d&apos;écoute (ex: 3001) et appelle <code>app.listen(PORT, callback)</code>. C&apos;est le point d&apos;entrée exécuté en production ou lors du lancement local par le développeur.
              </p>
            </div>
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
                question: "Quel est l'objectif principal du dossier racine taskflow/ ?",
                options: [
                  "Regrouper les différentes parties et les documents du projet.",
                  "Contenir uniquement les composants React.",
                  "Remplacer les dossiers frontend et backend.",
                  "Contenir exclusivement les fichiers de test."
                ],
                correctIndex: 0,
                explanation: "Le dossier racine regroupe les principales parties du projet et les documents communs. Dans TaskFlow, il contient notamment frontend, backend et README.md."
              },
              {
                id: 2,
                question: "Quelle commande permet de créer le squelette d'un frontend React avec TypeScript à l'aide de Vite ?",
                options: [
                  "npm init -y frontend",
                  "npm create vite@latest frontend -- --template react-ts",
                  "npm install express frontend",
                  "node create-react-app backend"
                ],
                correctIndex: 1,
                explanation: "La commande utilise l'outil de création de Vite avec le modèle react-ts pour générer le squelette d'un frontend React avec TypeScript."
              },
              {
                id: 3,
                question: "À quoi sert la commande npm init -y exécutée dans le dossier backend ?",
                options: [
                  "À installer automatiquement Express et Supertest.",
                  "À créer un fichier package.json avec des valeurs initiales.",
                  "À démarrer le serveur HTTP.",
                  "À créer les composants React."
                ],
                correctIndex: 1,
                explanation: "npm init -y initialise un projet npm et crée son fichier package.json avec des valeurs par défaut sans installer de packages tiers immédiatement."
              },
              {
                id: 4,
                question: "Dans quelle partie du projet doit-on placer les routes Express ?",
                options: [
                  "frontend/src/components/",
                  "frontend/src/pages/",
                  "backend/src/routes/",
                  "backend/src/assets/"
                ],
                correctIndex: 2,
                explanation: "Les routes Express appartiennent au backend et doivent donc être regroupées dans backend/src/routes/, conformément à l'architecture en couches."
              },
              {
                id: 5,
                question: "Quel est le rôle prévu du fichier server.ts dans l'organisation proposée ?",
                options: [
                  "Afficher la liste des tâches dans React.",
                  "Démarrer le serveur HTTP.",
                  "Définir les styles CSS.",
                  "Présenter la documentation du projet."
                ],
                correctIndex: 1,
                explanation: "server.ts démarre le serveur HTTP via listen(), tandis que app.ts configure l'application Express pour faciliter les tests sans ouvrir de port."
              },
              {
                id: 6,
                question: "Pourquoi les fichiers package.json du frontend et du backend sont-ils séparés ?",
                options: [
                  "Parce que chaque partie constitue un projet distinct avec ses propres dépendances et scripts.",
                  "Parce que TypeScript ne peut pas être utilisé dans deux dossiers.",
                  "Parce que le backend ne doit pas utiliser npm.",
                  "Parce que le frontend ne peut pas posséder de configuration."
                ],
                correctIndex: 0,
                explanation: "Le frontend et le backend sont deux projets distincts qui utilisent des dépendances, des scripts et des configurations différents."
              },
              {
                id: 7,
                question: "Le fichier README.md peut servir à présenter le projet, ses technologies et son organisation.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. Le README présente le projet, décrit les fonctionnalités, les technologies, l'organisation et les commandes utiles aux agents et développeurs."
              },
              {
                id: 8,
                question: "La création de l'arborescence signifie que les fonctionnalités de TaskFlow sont déjà développées et validées.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Créer les dossiers prépare l'organisation mais ne développe ni ne valide aucune fonctionnalité. Les dépendances et développements restent à faire."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
