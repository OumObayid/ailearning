'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

type AgentConfigFile =
  | 'agents-md'
  | 'team-leader'
  | 'architect'
  | 'backend'
  | 'frontend'
  | 'qa'
  | 'reviewer';

interface AgentProfile {
  id: AgentConfigFile;
  filePath: string;
  name: string;
  isMainAgent: boolean;
  isSubagent: boolean;
  roleTitle: string;
  summary: string;
  yamlMeta: string;
  markdownSnippet: string;
}

const AGENT_PROFILES: AgentProfile[] = [
  {
    id: 'agents-md',
    filePath: '.agents/AGENTS.md',
    name: 'Règles Communes',
    isMainAgent: false,
    isSubagent: false,
    roleTitle: 'Cadre de référence projet partagé',
    summary: 'Règles persistantes injectées dans chaque contexte d\'agent : stack, règles métier, interdictions Git.',
    yamlMeta: '# Règle persistante globale (Markdown pur)',
    markdownSnippet: `# Règles communes du projet TaskFlow
## 2. Stack technique
- Frontend : React, Vite, TypeScript
- Backend : Node.js, Express, TypeScript (NodeNext)
- Stockage : Map en mémoire (pas de base de données)
## 7. Règles Git
- Ne jamais exécuter git merge, git rebase ou git push sans accord écrit du PM.`
  },
  {
    id: 'team-leader',
    filePath: '.agents/agents/team-leader.md',
    name: 'Team Leader IA',
    isMainAgent: true,
    isSubagent: false,
    roleTitle: 'Coordinateur de l\'équipe d\'agents',
    summary: 'Agent principal chargé de découper les missions, vérifier les livrables et préparer les arbitrages pour le PM.',
    yamlMeta: `---
name: team-leader
description: Agent principal chargé de coordonner les agents TaskFlow.
subagent: false
mainAgent: true
model: inherit
commandExecutionPolicy: sandbox
---`,
    markdownSnippet: `# Rôle
Tu es le Team Leader IA du projet TaskFlow.
Tu coordonnes : Architect, Backend, Frontend, QA et Reviewer.
# Limites
Tu ne décides pas seul d'une évolution majeure d'architecture.
Aucun merge/push sans autorisation explicite du Project Manager humain.`
  },
  {
    id: 'architect',
    filePath: '.agents/agents/architect.md',
    name: 'Architect',
    isMainAgent: false,
    isSubagent: true,
    roleTitle: 'Cohérence technique & Contrats d\'interface',
    summary: 'Définit les interfaces TypeScript partagées, veille à l\'architecture en 4 couches et évite la sur-ingénierie.',
    yamlMeta: `---
name: architect
description: Agent spécialisé dans l'architecture technique de TaskFlow.
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: sandbox
---`,
    markdownSnippet: `# Responsabilités
- Définir les responsabilités strictes frontend et backend.
- Modéliser les contrats d'interface (routes REST, format JSON).
- Veiller à l'architecture en 4 couches (routes, contrôleurs, services, repository).`
  },
  {
    id: 'backend',
    filePath: '.agents/agents/backend.md',
    name: 'Backend',
    isMainAgent: false,
    isSubagent: true,
    roleTitle: 'Développeur API Express & Logique métier',
    summary: 'Implémente les routes Express, les validateurs de chaînes non-vides, les repositories Map et prépare app.ts.',
    yamlMeta: `---
name: backend
description: Agent spécialisé dans le développement backend de TaskFlow.
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: sandbox
---`,
    markdownSnippet: `# Responsabilités
- Développer les routes de l'API (/api/tasks).
- Implémenter le repository en mémoire (Map<string, Task>).
- Respecter le typage strict et la séparation app.ts / server.ts.`
  },
  {
    id: 'frontend',
    filePath: '.agents/agents/frontend.md',
    name: 'Frontend',
    isMainAgent: false,
    isSubagent: true,
    roleTitle: 'Développeur Interface React & Vite',
    summary: 'Construit les composants d\'interface, gère le formulaire, la liste, les compteurs et les appels fetch vers l\'API.',
    yamlMeta: `---
name: frontend
description: Agent spécialisé dans le développement frontend de TaskFlow.
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: sandbox
---`,
    markdownSnippet: `# Responsabilités
- Développer les composants React (TaskForm, TaskList, TaskItem, TaskCounters).
- Gérer l'état local et les appels HTTP via taskApi.ts.
- Afficher les statuts traduits en français tout en envoyant les valeurs techniques.`
  },
  {
    id: 'qa',
    filePath: '.agents/agents/qa.md',
    name: 'QA (Qualité & Tests)',
    isMainAgent: false,
    isSubagent: true,
    roleTitle: 'Vérificateur des critères d\'acceptation',
    summary: 'Rédige et exécute les suites de tests Vitest et Supertest, vérifie les cas d\'erreur et rédige les fiches BUG.',
    yamlMeta: `---
name: qa
description: Agent spécialisé dans la qualité et les tests de TaskFlow.
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: sandbox
---`,
    markdownSnippet: `# Responsabilités
- Rédiger les tests d'intégration HTTP avec Supertest.
- Vérifier les cas d'erreur (titre vide, statut invalide, ID inexistant).
- Isoler les tests avec beforeEach(clearTasks).`
  },
  {
    id: 'reviewer',
    filePath: '.agents/agents/reviewer.md',
    name: 'Reviewer',
    isMainAgent: false,
    isSubagent: true,
    roleTitle: 'Auditeur de code & Non-régression',
    summary: 'Inspecte les git diff, traque le code mort, vérifie le typage strict et émet un avis formel avant toute soumission au PM.',
    yamlMeta: `---
name: reviewer
description: Agent spécialisé dans la revue de code et la conformité architecturale.
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: sandbox
---`,
    markdownSnippet: `# Responsabilités
- Examiner les livrables et inspecter les diffs Git (git diff --stat).
- Vérifier l'absence de régressions et la lisibilité du code.
- Émettre un avis structuré : CONFORME ou MODIFICATIONS_REQUISES.`
  }
];

export function Chapitre8Content() {
  const [selectedFile, setSelectedFile] = useState<AgentConfigFile>('agents-md');
  const activeProfile = AGENT_PROFILES.find((p) => p.id === selectedFile) || AGENT_PROFILES[0];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* Entête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 shrink-0">
            Module 10 • Projet TaskFlow
          </Badge>
          <Badge variant="secondary" className="text-xs shrink-0">
            Chapitre 10.8
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Configurer les agents et leurs instructions
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Mettre en place la hiérarchie de collaboration d&apos;Antigravity : règles communes du projet (<code>.agents/AGENTS.md</code>), profils spécialisés d&apos;agents avec métadonnées YAML et frontière de permissions.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance : Les instructions ne remplacent pas les permissions">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Bien que le profil du Team Leader contienne l&apos;interdiction explicite d&apos;exécuter un merge, <strong>la véritable sécurité repose sur la validation humaine obligatoire</strong>. Aucun agent n&apos;est souverain : toute fusion vers <code>main</code> exige l&apos;approbation formelle et écrite du Chef de Projet humain.
        </p>
      </Callout>

      {/* Section 1 : Les 3 niveaux d'instructions */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="layout" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">1. Les trois niveaux d&apos;instructions dans un projet multi-agents</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Pour éviter la redondance et la dispersion d&apos;informations, Antigravity structure les directives en trois strates complémentaires :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-primary shrink-0" />
                1. Règles communes du projet (<code>.agents/AGENTS.md</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                S&apos;appliquent universellement à tous les agents. Définissent la stack (React/Vite/TS, Node/Express/TS), le stockage en mémoire, les statuts valides (todo, in_progress, done) et les interdits Git.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="user" className="h-4 w-4 text-emerald-500 shrink-0" />
                2. Profils d&apos;agents spécialisés (<code>.agents/agents/*.md</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Définissent l&apos;identité permanente de chaque rôle : ses technologies, sa zone de fichiers autorisée, sa politique d&apos;exécution (sandbox) et ses méthodes de travail.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-amber-500 shrink-0" />
                3. Fiches de mission ponctuelles (Briefs de travail)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Ordres de mission distribués dynamiquement par le Team Leader à un moment précis (ex: BE-001 pour créer les routes REST), décrivant les livrables attendus et critères d&apos;acceptation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Organigramme d'équipe */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="user" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">2. Chaîne hiérarchique et complémentarité QA vs Reviewer</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Une distinction cruciale réside dans la séparation entre l&apos;agent <strong>QA</strong> et l&apos;agent <strong>Reviewer</strong> :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="shield-check" className="h-4 w-4 text-emerald-500 shrink-0" />
                Agent QA (Assurance Qualité Fonctionnelle)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Vérifie le <strong>comportement</strong> de l&apos;application : est-ce que le formulaire rejette un titre vide ? Est-ce que l&apos;API renvoie bien 404 sur un identifiant inconnu ? Rédige et exécute les tests Vitest et Supertest.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 text-primary shrink-0" />
                Agent Reviewer (Revue de Code & Conformité)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Examine la <strong>qualité technique</strong> des modifications : respect de l&apos;architecture 4 couches, typage strict TypeScript sans <code>any</code>, absence de code mort et propreté du diff Git.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de profils d'agents */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="bot" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">3. Simulateur interactif : Explorateur de Configuration d&apos;Agents</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Sélectionnez un fichier de configuration pour examiner ses métadonnées YAML, ses directives d&apos;encadrement et ses frontières de sécurité.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Sélection des profils en boutons horizontaux wrap */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {AGENT_PROFILES.map((p) => {
              const isSelected = p.id === selectedFile;
              return (
                <Button
                  key={p.id}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFile(p.id)}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5"
                >
                  <Icon name="bot" className="h-3.5 w-3.5 shrink-0" />
                  <span>{p.name}</span>
                </Button>
              );
            })}
          </div>

          {/* Fiche d'information détaillée */}
          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
              <div className="flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-primary shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-bold text-foreground">
                  {activeProfile.filePath}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {activeProfile.isMainAgent && (
                  <Badge variant="default" className="text-xs shrink-0">
                    Agent Principal
                  </Badge>
                )}
                {activeProfile.isSubagent && (
                  <Badge variant="secondary" className="text-xs shrink-0">
                    Sous-agent spécialisé
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Rôle : {activeProfile.roleTitle}
                </span>
                <p className="text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                  {activeProfile.summary}
                </p>
              </div>

              {activeProfile.yamlMeta && (
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Frontmatter YAML (En-tête de configuration Antigravity) :
                  </span>
                  <div className="p-2.5 rounded bg-black border border-slate-800 font-mono text-xs text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
                    {activeProfile.yamlMeta}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1 mt-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Extrait des instructions Markdown :
                </span>
                <div className="p-2.5 rounded bg-black border border-slate-800 border border-border/40 font-mono text-xs text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
                  {activeProfile.markdownSnippet}
                </div>
              </div>
            </div>
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
                question: "Quelle est la fonction principale des règles communes du projet ?",
                options: [
                  "Décrire les tâches ponctuelles de chaque agent.",
                  "Définir les contraintes et conventions applicables à l'ensemble de l'équipe.",
                  "Remplacer les spécifications fonctionnelles.",
                  "Déterminer automatiquement les résultats des tests."
                ],
                correctIndex: 1,
                explanation: "Les règles communes définissent les contraintes, conventions et principes partagés par tous les agents. Les missions ponctuelles sont définies séparément."
              },
              {
                id: 2,
                question: "Dans l'organisation TaskFlow, quel rôle est responsable de la coordination générale des agents ?",
                options: [
                  "Reviewer.",
                  "QA.",
                  "Team Leader IA.",
                  "Backend."
                ],
                correctIndex: 2,
                explanation: "Le Team Leader IA coordonne les spécialistes, distribue les missions et fait la synthèse pour le Project Manager humain."
              },
              {
                id: 3,
                question: "Dans la structure proposée pour Antigravity, quel fichier contient les règles communes du projet ?",
                options: [
                  ".agents/AGENTS.md",
                  ".agents/agents/backend.md",
                  "backend/package.json",
                  "frontend/tsconfig.json"
                ],
                correctIndex: 0,
                explanation: "Le fichier .agents/AGENTS.md héberge les instructions communes du workspace partagées par l'ensemble des agents."
              },
              {
                id: 4,
                question: "Quelle est la responsabilité principale de l'agent QA ?",
                options: [
                  "Définir seul l'architecture technique.",
                  "Développer tous les composants React.",
                  "Vérifier les comportements et les critères d'acceptation.",
                  "Autoriser les opérations Git sensibles."
                ],
                correctIndex: 2,
                explanation: "QA vérifie les comportements réels par rapport aux critères d'acceptation via des scénarios de tests unitaires et d'intégration HTTP."
              },
              {
                id: 5,
                question: "Quelles informations doivent figurer dans les instructions d'un agent spécialisé ? (Sélectionnez la proposition exacte)",
                options: [
                  "Son rôle, ses responsabilités, ses limites d'intervention et les résultats attendus.",
                  "Une autorisation automatique d'effectuer des git merge et git push.",
                  "La suppression obligatoire de tous les autres agents de l'équipe.",
                  "L'historique complet des versions passées du système d'exploitation."
                ],
                correctIndex: 0,
                explanation: "Un profil d'agent doit impérativement cadrer son rôle, son périmètre technique, ses limites et son format de reporting sans jamais accorder de droits de fusion automatique."
              },
              {
                id: 6,
                question: "Quelle est la différence entre un agent personnalisé et une règle persistante ?",
                options: [
                  "Un agent personnalisé définit un rôle spécialisé, tandis qu'une règle persistante définit des contraintes applicables dans son périmètre.",
                  "Un agent personnalisé sert uniquement à installer des dépendances, tandis qu'une règle persistante exécute les tests.",
                  "Une règle persistante remplace les agents personnalisés.",
                  "Les deux éléments ont exactement la même fonction."
                ],
                correctIndex: 0,
                explanation: "Un agent personnalisé incarne un profil d'intervention spécifique. Une règle persistante impose un ensemble de normes et de contraintes globales au workspace."
              },
              {
                id: 7,
                question: "La configuration d'un agent personnalisé lui donne automatiquement toutes les permissions nécessaires pour exécuter des commandes et modifier les fichiers du système.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Les instructions définissent le comportement attendu de l'IA, mais les permissions réelles (sandbox, politiques d'accès) dépendent des paramètres de sécurité de l'IDE."
              },
              {
                id: 8,
                question: "Le Reviewer et QA ont exactement les mêmes responsabilités dans l'équipe TaskFlow.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. QA vérifie le comportement dynamique et fonctionnel de l'application (tests d'acceptation). Reviewer audite la structure statique, la maintenabilité et la propreté du code."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
