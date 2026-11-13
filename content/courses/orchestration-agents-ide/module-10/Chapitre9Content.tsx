'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface MissionData {
  id: string;
  title: string;
  agent: string;
  worktree: string;
  branch: string;
  status: 'Prête' | 'En cours' | 'À vérifier' | 'Terminée';
  dependsOn: string[];
  objective: string;
  includedScope: string;
  excludedScope: string;
  deliverables: string;
  verification: string;
}

const MISSIONS: MissionData[] = [
  {
    id: 'ARC-001',
    title: 'Spécification du contrat API REST',
    agent: 'Architect',
    worktree: 'taskflow-architect/',
    branch: 'feature/architecture-contract',
    status: 'Terminée',
    dependsOn: [],
    objective: 'Définir les signatures HTTP des 6 endpoints, formats JSON de requêtes/réponses et statuts HTTP (200, 201, 204, 400, 404).',
    includedScope: 'Les 6 fonctionnalités CRUD + statuts + compteurs. Règles de validation de chaînes non-vides.',
    excludedScope: 'Authentification, persistance base de données, pagination, tags.',
    deliverables: 'Document de contrat d\'interface API REST et types TypeScript partagés.',
    verification: 'Cohérence intégrale avec les spécifications fonctionnelles du chapitre 2.'
  },
  {
    id: 'BE-001',
    title: 'Plan de développement backend Express',
    agent: 'Backend',
    worktree: 'taskflow-backend/',
    branch: 'feature/backend-task-api',
    status: 'En cours',
    dependsOn: ['ARC-001'],
    objective: 'Analyser la structure backend existante et concevoir l\'implémentation en 4 couches (routes, contrôleurs, services, repository Map).',
    includedScope: 'Organisation de src/, gestion du stockage en mémoire Map<string, Task>, séparation app.ts / server.ts.',
    excludedScope: 'Connexion PostgreSQL/Mongo, écriture de code définitif (phase de cadrage).',
    deliverables: 'Plan technique d\'implémentation backend et arborescence validée.',
    verification: 'Validation de la séparation app.ts/server.ts pour faciliter les tests Supertest.'
  },
  {
    id: 'FE-001',
    title: 'Plan de développement frontend React',
    agent: 'Frontend',
    worktree: 'taskflow-frontend/',
    branch: 'feature/frontend-task-list',
    status: 'En cours',
    dependsOn: ['ARC-001'],
    objective: 'Définir la hiérarchie des composants React (TaskForm, TaskList, TaskItem, TaskCounters) et le service taskApi.ts.',
    includedScope: 'Composants, gestion de l\'état des tâches, libellés français avec statuts techniques (todo, in_progress, done).',
    excludedScope: 'Redux/Zustand complexes, bibliothèques UI externes lourdes.',
    deliverables: 'Arborescence des composants et schéma d\'état React.',
    verification: 'Conformité avec les contrats d\'appels REST définis dans ARC-001.'
  },
  {
    id: 'QA-001',
    title: 'Matrice des scénarios de test & cas limites',
    agent: 'QA',
    worktree: 'taskflow-qa/',
    branch: 'test/backend-api',
    status: 'En cours',
    dependsOn: ['ARC-001'],
    objective: 'Formaliser les scénarios de test pour chaque critère d\'acceptation, en insistant sur les tests négatifs.',
    includedScope: 'Tests cas nominaux, tests de rejet (titre vide, titre composé d\'espaces, ID inexistant 404, statut invalide).',
    excludedScope: 'Exécution réelle des tests (les composants ne sont pas encore codés).',
    deliverables: 'Matrice de couverture de test et spécifications de cas de test Supertest.',
    verification: 'Validation de l\'isolation des tests via le hook beforeEach(clearTasks).'
  },
  {
    id: 'REV-001',
    title: 'Revue critique des propositions initiales',
    agent: 'Reviewer',
    worktree: 'taskflow-review/',
    branch: 'review/initial-review',
    status: 'Prête',
    dependsOn: ['ARC-001', 'BE-001', 'FE-001'],
    objective: 'Auditer la cohérence mutuelle entre le contrat d\'API, le plan backend et le plan frontend pour éliminer tout risque de désalignement.',
    includedScope: 'Noms de champs JSON (title vs label), format des erreurs, types d\'identifiants.',
    excludedScope: 'Modification de code directe.',
    deliverables: 'Rapport d\'audit croisé avec avis formel (CONFORME ou MODIFICATIONS_REQUISES).',
    verification: 'Absence de contradictions entre la consommation frontend et l\'émission backend.'
  }
];

export function Chapitre9Content() {
  const [selectedMissionId, setSelectedMissionId] = useState<string>('ARC-001');
  const [missionsState, setMissionsState] = useState<MissionData[]>(MISSIONS);

  const selectedMission = missionsState.find((m) => m.id === selectedMissionId) || missionsState[0];

  const handleToggleStatus = (missionId: string) => {
    setMissionsState((prev) =>
      prev.map((m) => {
        if (m.id !== missionId) return m;
        const nextStatus =
          m.status === 'Prête'
            ? 'En cours'
            : m.status === 'En cours'
            ? 'À vérifier'
            : m.status === 'À vérifier'
            ? 'Terminée'
            : 'Prête';
        return { ...m, status: nextStatus };
      })
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
            Chapitre 10.9
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Préparer et distribuer les premières missions
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Découpage méthodique des besoins en fiches de missions structurées (ARC-001, BE-001, FE-001, QA-001, REV-001), analyse des dépendances et pilotage du cycle de vie des livrables.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance : Terminé ne signifie pas Validé">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Lorsqu&apos;un agent déclare avoir achevé sa mission, son statut passe à <strong>« À vérifier »</strong>. Le Team Leader examine le livrable, mais <strong>seul le Chef de Projet humain a le pouvoir de valider formellement le travail et d&apos;autoriser une fusion dans le dépôt</strong>.
        </p>
      </Callout>

      {/* Section 1 : Structure d'une fiche de mission */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="document-text" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              9.2 & 9.4. Anatomie d&apos;une fiche de mission efficace
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Une mission donnée à un agent IA ne doit jamais consister en une consigne floue (&quot;travaille sur le backend&quot;). Elle doit impérativement préciser son cadre d&apos;action pour canaliser l&apos;effort de l&apos;agent :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="document-text" className="h-4 w-4 text-primary shrink-0" />
                Objectif mesurable & Périmètre explicite (Inclus vs Exclus)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                L&apos;agent doit savoir exactement quel résultat produire et quelles fonctionnalités sont formellement hors-périmètre (ex: pas d&apos;authentification JWT, pas de base de données externe).
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-emerald-500 shrink-0" />
                Ancrage environnemental (Worktree & Branche)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                La mission stipule le dossier de travail exact (ex: <code>../taskflow-backend/</code>) et la branche Git dédiée pour éviter toute pollution croisée avec les autres agents.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="shield-check" className="h-4 w-4 text-amber-500 shrink-0" />
                Critères de vérification & Livrables formels
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                La liste exacte des fichiers ou documents attendus et les tests à valider avant soumission au Team Leader.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Matrice de dépendance */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="layout" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              9.3. Séquencement logique des premières missions
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Les missions s&apos;articulent autour d&apos;une dépendance critique : la définition du contrat API par l&apos;Architecte (ARC-001). Sans ce contrat validé, Backend et Frontend risqueraient de développer des modèles discordants :
          </p>

          <div className="p-3 rounded-lg border border-border/40 bg-muted/10 flex flex-col gap-2 text-xs font-mono">
            <div className="text-foreground font-semibold">Graphe de dépendance des missions fondamentales :</div>
            <div className="flex flex-col gap-1 text-muted-foreground">
              <div className="text-primary font-bold">ARC-001 (Architect : Contrat API)</div>
              <div className="pl-4">├── <strong>BE-001</strong> (Backend : Plan Express & Repository)</div>
              <div className="pl-4">├── <strong>FE-001</strong> (Frontend : Plan React & Composants)</div>
              <div className="pl-4">└── <strong>QA-001</strong> (QA : Scénarios & Cas d&apos;erreurs)</div>
              <div className="pl-8 text-amber-600 dark:text-amber-400">└── <strong>REV-001</strong> (Reviewer : Audit de cohérence globale)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de missions */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="document-text" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Simulateur interactif : Tableau de Bord & Fiches de Mission
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Sélectionnez une mission pour consulter sa fiche détaillée et cliquez sur le statut pour simuler la progression dans le cycle de vie.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Sélection des missions en boutons horizontaux wrap */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {missionsState.map((m) => {
              const isSelected = m.id === selectedMissionId;
              return (
                <Button
                  key={m.id}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMissionId(m.id)}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5 font-mono"
                >
                  <Icon name="document-text" className="h-3.5 w-3.5 shrink-0" />
                  <span>{m.id}</span>
                </Button>
              );
            })}
          </div>

          {/* Fiche détaillée de la mission */}
          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs font-bold">
                  {selectedMission.id}
                </Badge>
                <span className="font-bold text-sm sm:text-base text-foreground">
                  {selectedMission.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleStatus(selectedMission.id)}
                  className="h-7 text-xs shrink-0 flex items-center gap-1"
                >
                  <Icon name="clock" className="h-3 w-3 shrink-0" />
                  <span>Statut : {selectedMission.status} (Changer)</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex flex-wrap gap-4 text-xs">
                <div>
                  <span className="font-semibold text-muted-foreground uppercase tracking-wider">Agent : </span>
                  <span className="text-foreground font-medium">{selectedMission.agent}</span>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground uppercase tracking-wider">Worktree : </span>
                  <span className="text-foreground font-mono">{selectedMission.worktree}</span>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground uppercase tracking-wider">Branche : </span>
                  <span className="text-foreground font-mono">{selectedMission.branch}</span>
                </div>
              </div>

              {selectedMission.dependsOn.length > 0 && (
                <div className="text-xs">
                  <span className="font-semibold text-muted-foreground uppercase tracking-wider">Dépendances : </span>
                  <span className="font-mono text-primary font-bold">{selectedMission.dependsOn.join(', ')}</span>
                </div>
              )}

              <div className="flex flex-col gap-0.5 mt-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Objectif :
                </span>
                <p className="text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                  {selectedMission.objective}
                </p>
              </div>

              <div className="p-2.5 rounded bg-muted/20 border border-border/40 flex flex-col gap-1 text-xs">
                <div>
                  <strong className="text-emerald-600 dark:text-emerald-400">Périmètre inclus : </strong>
                  <span className="text-muted-foreground">{selectedMission.includedScope}</span>
                </div>
                <div>
                  <strong className="text-rose-600 dark:text-rose-400">Périmètre exclu : </strong>
                  <span className="text-muted-foreground">{selectedMission.excludedScope}</span>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Livrables attendus :
                </span>
                <p className="text-muted-foreground text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                  {selectedMission.deliverables}
                </p>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Critères de vérification :
                </span>
                <p className="text-muted-foreground text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                  {selectedMission.verification}
                </p>
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
                question: "Quelle est la différence entre le rôle d'un agent et une mission ?",
                options: [
                  "Le rôle décrit une responsabilité permanente, tandis que la mission définit un travail précis à réaliser.",
                  "Le rôle décrit uniquement les fichiers, tandis que la mission décrit uniquement les branches Git.",
                  "Le rôle est temporaire, tandis que la mission est permanente.",
                  "Les deux notions désignent exactement la même chose."
                ],
                correctIndex: 0,
                explanation: "Le rôle définit la spécialité durable de l'agent (ex: Backend). La mission est un travail circonscrit avec un objectif et des livrables précis (ex: BE-001)."
              },
              {
                id: 2,
                question: "Quel élément permet de vérifier concrètement si une mission a atteint son objectif ?",
                options: [
                  "Le nom de l'agent.",
                  "Le nombre de messages échangés.",
                  "Les critères de vérification associés aux livrables.",
                  "Le nombre de branches du dépôt."
                ],
                correctIndex: 2,
                explanation: "Les critères de vérification fournissent les indicateurs objectifs permettant d'auditer le livrable par rapport aux exigences initiales."
              },
              {
                id: 3,
                question: "Pourquoi faut-il identifier les dépendances entre les missions ?",
                options: [
                  "Pour obliger tous les agents à travailler dans le même worktree.",
                  "Pour déterminer quels travaux peuvent être réalisés en parallèle et lesquels doivent attendre un résultat préalable.",
                  "Pour éviter de rédiger des comptes rendus.",
                  "Pour permettre au Reviewer de remplacer le Team Leader."
                ],
                correctIndex: 1,
                explanation: "Identifier les dépendances permet de planifier l'exécution : par exemple, Frontend et QA ont besoin du contrat API d'Architect avant d'aligner leurs implémentations."
              },
              {
                id: 4,
                question: "Quelle mission correspond le mieux au rôle de l'agent Architect dans la préparation de TaskFlow ?",
                options: [
                  "Développer tous les composants React.",
                  "Exécuter les tests de l'API et déclarer les résultats.",
                  "Préparer le contrat technique de l'API et vérifier sa cohérence avec les spécifications.",
                  "Effectuer le push des branches des autres agents."
                ],
                correctIndex: 2,
                explanation: "L'Architect garantit la cohérence technique d'ensemble et formule les contrats d'interface (routes, JSON, codes HTTP) servant de pont entre les agents."
              },
              {
                id: 5,
                question: "Quelles informations doivent être précisées dans une mission complète ? (Sélectionnez la proposition exacte)",
                options: [
                  "L'objectif, le périmètre, les livrables, l'environnement et les critères de vérification.",
                  "Les résultats des tests avant même leur exécution réelle.",
                  "L'autorisation automatique de merger sur la branche main sans contrôle.",
                  "L'adresse IP publique de la passerelle internet de chaque agent."
                ],
                correctIndex: 0,
                explanation: "Une mission rigoureuse stipule l'objectif, le périmètre (inclus/exclus), l'environnement Git, les contraintes, les livrables attendus et les critères d'acceptation."
              },
              {
                id: 6,
                question: "Un agent annonce qu'il a terminé sa mission et transmet son compte rendu. Quelle est la prochaine étape appropriée ?",
                options: [
                  "Déclarer immédiatement la mission validée.",
                  "Supprimer son worktree.",
                  "Examiner le livrable et vérifier les résultats annoncés.",
                  "Fusionner automatiquement sa branche dans main."
                ],
                correctIndex: 2,
                explanation: "La fin de travail annoncée par l'agent n'est qu'une déclaration. Le Team Leader et le Reviewer doivent inspecter le livrable avant toute soumission au PM."
              },
              {
                id: 7,
                question: "Deux agents peuvent toujours modifier simultanément les mêmes fichiers dans le même worktree sans risque de conflit.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Modifier simultanément les mêmes fichiers dans un espace partagé entraîne inévitablement des écrasements et des corruptions de code."
              },
              {
                id: 8,
                question: "Le Team Leader peut effectuer un merge, un rebase ou un push dès qu'il estime que les livrables sont prêts, même sans autorisation explicite du Project Manager.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Règle intangible : aucun merge, rebase ou push n'est toléré sans accord écrit et formel du Chef de Projet humain."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
