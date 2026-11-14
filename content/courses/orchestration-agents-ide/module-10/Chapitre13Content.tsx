'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface MissionRow {
  id: string;
  name: string;
  owner: string;
  priority: 'P1' | 'P2' | 'P3';
  status: 'À faire' | 'En cours' | 'Bloqué' | 'À vérifier' | 'Terminé';
  notes: string;
}

const INITIAL_BOARD: MissionRow[] = [
  {
    id: 'ARC-001',
    name: 'Contrat technique de l\'API REST',
    owner: 'Architect',
    priority: 'P1',
    status: 'Terminé',
    notes: 'Contrat validé avec les 6 routes et formats JSON'
  },
  {
    id: 'BE-002',
    name: 'Implémentation des routes Express & Map',
    owner: 'Backend',
    priority: 'P1',
    status: 'À vérifier',
    notes: 'Code soumis dans taskflow-backend/, tests Supertest passants'
  },
  {
    id: 'FE-002',
    name: 'Interface React & Service taskApi.ts',
    owner: 'Frontend',
    priority: 'P1',
    status: 'Bloqué',
    notes: 'Incohérence détectée sur le format de réponse des compteurs'
  },
  {
    id: 'QA-002',
    name: 'Suites de tests d\'intégration Vitest',
    owner: 'QA',
    priority: 'P2',
    status: 'En cours',
    notes: 'Validation des cas nominaux et cas d\'erreurs (espaces blancs)'
  },
  {
    id: 'REV-001',
    name: 'Audit de code et propreté du diff Git',
    owner: 'Reviewer',
    priority: 'P2',
    status: 'À faire',
    notes: 'En attente de la résolution du blocage FE-002'
  }
];

export function Chapitre13Content() {
  const [board, setBoard] = useState<MissionRow[]>(INITIAL_BOARD);
  const [arbitrationResolved, setArbitrationResolved] = useState(false);

  const handleResolveConflict = () => {
    setBoard((prev) =>
      prev.map((row) => {
        if (row.id === 'FE-002') {
          return {
            ...row,
            status: 'En cours',
            notes: 'Débloqué suite à DEC-001 : standardisation sur { todo, in_progress, done }'
          };
        }
        return row;
      })
    );
    setArbitrationResolved(true);
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
            Chapitre 10.13
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Coordonner les agents et suivre leurs travaux
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Rôle pivot du Team Leader IA : pilotage du tableau de bord d&apos;avancement, gestion des dépendances inter-agents, résolution des blocages de contrats et reporting synthétique pour le Project Manager humain.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="danger" title="Règle d'or de gouvernance : Le Team Leader ne décide pas des fusions">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Le Team Leader IA coordonne, arbitre les désaccords techniques mineurs et prépare les synthèses. En revanche, <strong>il lui est formellement interdit d&apos;exécuter un merge, un rebase ou un push vers la branche main : seul le Chef de Projet humain conserve la souveraineté décisionnelle sur l&apos;intégration</strong>.
        </p>
      </Callout>

      {/* Section 1 : Le rôle du Team Leader */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="sparkles" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">1. Coordination vs Exécution</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Le piège le plus fréquent pour un Team Leader IA est de vouloir coder lui-même toutes les fonctionnalités. Son rôle véritable est l&apos;orchestration :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="layout" className="h-4 w-4 text-primary shrink-0" />
                Découpage en missions et gestion du flux
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                S&apos;assurer que chaque agent dispose de toutes les entrées requises (contrat API, règles métier) avant de démarrer son implémentation.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="info" className="h-4 w-4 text-amber-500 shrink-0" />
                Détection et levée des blocages
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Lorsqu&apos;un agent est bloqué (ex: un champ JSON manquant), intervenir immédiatement pour trancher à partir des spécifications et relancer la dynamique.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="document-text" className="h-4 w-4 text-emerald-500 shrink-0" />
                Synthèse orientée décision pour le Project Manager
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Fournir un reporting clair qui sépare le prévu, l&apos;exécuté, le vérifié et les points nécessitant un arbitrage humain.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Fiche d'arbitrage de désaccord */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="shield-check" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">2. Gestion des désaccords techniques (Fiche DEC-001)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Deux agents peuvent entrer en désaccord d&apos;interprétation sur une route ou un format de données. Le Team Leader formalise alors une fiche de décision :
          </p>

          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-2 text-xs font-mono">
            <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
              <span className="font-bold text-foreground">Fiche de décision : DEC-001</span>
              <Badge variant="outline" className="text-[10px]">Arbitrage Contrat API</Badge>
            </div>
            <div><strong>Sujet :</strong> Format JSON retourné par <code>GET /api/tasks/counters</code></div>
            <div><strong>Désaccord :</strong> Backend a implémenté <code>&#123; count_todo, count_done &#125;</code> tandis que Frontend attendait <code>&#123; todo, in_progress, done &#125;</code></div>
            <div><strong>Référence :</strong> Spécification ARC-001 validée au Chapitre 10.3</div>
            <div><strong>Décision du Team Leader :</strong> Le backend doit impérativement respecter le schéma <code>&#123; todo, in_progress, done &#125;</code>. Les trois clés doivent toujours être présentes avec 0 par défaut.</div>
            <div><strong>Impact :</strong> Mission FIX assignée à Backend, déblocage immédiat de Frontend.</div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif du tableau de bord */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="sparkles" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">3. Simulateur interactif : Cockpit de Coordination du Team Leader</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Observez l&apos;état des missions d&apos;équipe et levez le blocage de FE-002 via l&apos;arbitrage de contrat.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Tableau de suivi */}
          <div className="flex flex-col gap-2">
            {board.map((row) => (
              <div
                key={row.id}
                className="p-3 rounded-lg border border-border/40 bg-card flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{row.id}</span>
                    <Badge variant="outline" className="text-[10px]">{row.priority}</Badge>
                    <span className="font-semibold text-foreground">{row.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>Responsable : <strong>{row.owner}</strong></span>
                    <span>•</span>
                    <span>{row.notes}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <Badge
                    variant="secondary"
                    className={
                      row.status === 'Terminé'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px]'
                        : row.status === 'À vérifier'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 text-[11px]'
                        : row.status === 'Bloqué'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 text-[11px]'
                        : 'bg-muted text-muted-foreground text-[11px]'
                    }
                  >
                    {row.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Action d'arbitrage */}
          {!arbitrationResolved ? (
            <div className="p-3.5 rounded-lg border border-amber-500/30 bg-amber-500/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 text-xs">
                <Icon name="info" className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>Blocage critique sur FE-002 (Incohérence contrat API des compteurs)</span>
              </div>
              <Button
                size="sm"
                variant="default"
                onClick={handleResolveConflict}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5"
              >
                <Icon name="shield-check" className="h-3.5 w-3.5 shrink-0" />
                <span>Arbitrer et débloquer FE-002</span>
              </Button>
            </div>
          ) : (
            <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center gap-2 text-xs">
              <Icon name="check-circle" className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>Arbitrage DEC-001 acté. Frontend a repris le développement en conformité avec le contrat validé !</span>
            </div>
          )}
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
                question: "Quel est le rôle principal du Team Leader IA ?",
                options: [
                  "Réaliser personnellement toutes les missions.",
                  "Coordonner les agents et superviser la cohérence de leurs travaux.",
                  "Remplacer le Project Manager dans toutes les décisions.",
                  "Autoriser automatiquement toutes les opérations Git."
                ],
                correctIndex: 1,
                explanation: "Le Team Leader coordonne les interventions, veille à la synchronisation des dépendances et s'assure de l'alignement sur les contrats d'interface."
              },
              {
                id: 2,
                question: "Une dépendance entre deux missions signifie que :",
                options: [
                  "Les deux missions doivent toujours être exécutées simultanément.",
                  "Une mission nécessite un résultat ou une information provenant d'une autre.",
                  "Les deux missions doivent utiliser le même Git Worktree.",
                  "Les deux agents doivent avoir les mêmes responsabilités."
                ],
                correctIndex: 1,
                explanation: "Une dépendance indique qu'une tâche a besoin d'un artefact préalable (ex: contrat d'interface de l'Architecte) pour être menée à bien sans risque d'erreur."
              },
              {
                id: 3,
                question: "Un agent annonce que sa mission est terminée, mais ses livrables n'ont pas encore été examinés. Quel statut convient le mieux ?",
                options: [
                  "À faire.",
                  "À vérifier.",
                  "Validé.",
                  "Bloqué."
                ],
                correctIndex: 1,
                explanation: "Le statut À vérifier matérialise le sas entre la déclaration de l'agent et l'audit effectif du livrable par les pairs et le Chef de Projet."
              },
              {
                id: 4,
                question: "Quel est l'intérêt principal d'un compte rendu structuré ?",
                options: [
                  "Remplacer les fichiers produits par l'agent.",
                  "Éviter l'exécution des tests.",
                  "Donner une vision vérifiable du travail réalisé, des problèmes et des prochaines actions.",
                  "Autoriser automatiquement l'intégration des modifications."
                ],
                correctIndex: 2,
                explanation: "Un compte rendu structuré apporte de la transparence : ce qui a été codé, les fichiers touchés, les tests effectivement lancés et les éventuelles difficultés."
              },
              {
                id: 5,
                question: "Quelles informations sont utiles pour examiner un blocage signalé par un agent ? (Sélectionnez la proposition exacte)",
                options: [
                  "Le problème rencontré, ses conséquences, les actions déjà réalisées et les solutions possibles.",
                  "Une demande de fusion immédiate dans main sans aucune explication.",
                  "La suppression pure et simple de tous les fichiers du projet.",
                  "Uniquement le prénom de l'agent sans contexte technique."
                ],
                correctIndex: 0,
                explanation: "Qualifier un blocage exige d'exposer clairement le symptôme, l'impact sur les autres missions, les investigations déjà menées et les options d'arbitrage."
              },
              {
                id: 6,
                question: "Deux agents produisent des implémentations incompatibles du contrat API. Quelle doit être la première démarche du Team Leader ?",
                options: [
                  "Laisser chaque agent conserver sa propre version.",
                  "Supprimer les modifications de l'un des agents.",
                  "Examiner les documents de référence et organiser une résolution avec les agents concernés.",
                  "Modifier immédiatement les spécifications sans validation."
                ],
                correctIndex: 2,
                explanation: "Le Team Leader doit retourner aux spécifications formelles (ARC-001), analyser l'écart avec les agents concernés et acter une décision documentée (fiche DEC)."
              },
              {
                id: 7,
                question: "Les Git Worktrees permettent à plusieurs agents de disposer de répertoires de travail distincts associés à un même dépôt Git.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. Les worktrees offrent des dossiers physiques isolés sur disque pour chaque agent tout en partageant la base d'objets du dépôt central .git/."
              },
              {
                id: 8,
                question: "Le Team Leader peut effectuer un merge sans autorisation du Project Manager lorsqu'il estime que les tests sont réussis.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Même avec des tests à 100% au vert, le merge vers main requiert obligatoirement l'accord écrit et souverain du Chef de Projet humain."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
