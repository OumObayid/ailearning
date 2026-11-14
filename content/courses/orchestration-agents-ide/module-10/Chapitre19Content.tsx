'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface CompetencyItem {
  id: number;
  domain: string;
  skill: string;
  rating: number; // 1 to 5
}

const INITIAL_COMPETENCIES: CompetencyItem[] = [
  { id: 1, domain: 'Cadrage', skill: 'Définition stricte du périmètre (inclus vs exclus)', rating: 5 },
  { id: 2, domain: 'Spécifications', skill: 'Formalisation des règles métier et critères d\'acceptation', rating: 5 },
  { id: 3, domain: 'Architecture', skill: 'Conception des contrats API REST et isolation des couches', rating: 5 },
  { id: 4, domain: 'Environnement', skill: 'Gestion des Git Worktrees et isolation des node_modules/', rating: 5 },
  { id: 5, domain: 'Instructions', skill: 'Rédaction de .agents/AGENTS.md et profils spécialisés', rating: 5 },
  { id: 6, domain: 'Missions', skill: 'Découpage en fiches atomiques avec objectifs mesurables', rating: 5 },
  { id: 7, domain: 'Coordination', skill: 'Pilotage du Team Leader et résolution des blocages', rating: 5 },
  { id: 8, domain: 'Qualité', skill: 'Complémentarité QA (tests) vs Reviewer (architecture/code)', rating: 5 },
  { id: 9, domain: 'Intégration', skill: 'Séquencement progressif avec merge --no-ff traçable', rating: 5 },
  { id: 10, domain: 'Gouvernance', skill: 'Maintien absolu de la souveraineté décisionnelle du PM humain', rating: 5 }
];

export function Chapitre19Content() {
  const [competencies, setCompetencies] = useState<CompetencyItem[]>(INITIAL_COMPETENCIES);
  const [activeTab, setActiveTab] = useState<'metrics' | 'eval'>('metrics');

  const averageScore = (
    competencies.reduce((acc, curr) => acc + curr.rating, 0) / competencies.length
  ).toFixed(1);

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* Entête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 shrink-0">
            Module 10 • Projet TaskFlow
          </Badge>
          <Badge variant="secondary" className="text-xs shrink-0">
            Chapitre 10.19 • Bilan Final
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Faire le bilan de l&apos;orchestration et des apprentissages
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Rétrospective globale et capitalisation d&apos;expérience : dissociation des métriques d&apos;illusion et des indicateurs fiables, analyse des pièges multi-agents et grille d&apos;auto-évaluation des 10 compétences de l&apos;orchestrateur.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Synthèse suprême de gouvernance : Les 3 Piliers de l'Orchestration">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Une orchestration d&apos;agents réussie repose sur trois piliers indissociables : <strong>1. Une organisation physique et documentaire rigoureuse</strong> (worktrees, contrats API, profils d&apos;agents), <strong>2. Une chaîne d&apos;assurance qualité intransigeante</strong> (preuves de tests réels, non-régression), et <strong>3. La souveraineté décisionnelle inaliénable du Chef de Projet humain</strong> (aucun merge ou publication sans approbation écrite).
        </p>
      </Callout>

      {/* Section 1 : Métriques d'illusion vs Indicateurs fiables */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="chart-bar" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">1. Métriques d&apos;illusion vs Indicateurs réels d&apos;efficacité</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Dans un projet piloté par l&apos;IA, il est facile de se laisser impressionner par la vitesse apparente sans s&apos;apercevoir des dérives :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-rose-600 dark:text-rose-400 text-xs sm:text-sm flex items-center gap-2">
                <Icon name="info" className="h-4 w-4 shrink-0" />
                Les Métriques d&apos;Illusion (Fausses victoires)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Nombre de lignes de code générées à la minute, verbiage des comptes rendus sans preuve, compilation TypeScript réussie prise pour une preuve de justesse métier, déclaration verbale &quot;tous les tests passent&quot; sans exécution terminal.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 shrink-0" />
                Les Indicateurs Fiables (Valeur réelle d&apos;ingénierie)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Respect strict des spécifications fonctionnelles, exécution avérée de tests d&apos;intégration (codes HTTP réels), diff Git propre sans pollution hors-périmètre, et validation explicite documentée par le PM humain.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Pourquoi plus d'agents n'égale pas plus de vitesse */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="user" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">2. La loi des rendements décroissants en équipe multi-agents</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Multiplier le nombre d&apos;agents sans coordination dégrade la productivité au lieu de l&apos;augmenter :
          </p>
          <ul className="list-disc list-inside flex flex-col gap-1 text-xs">
            <li><strong>Surcharge de communication :</strong> Chaque agent supplémentaire multiplie les canaux de synchronisation exponentiellement.</li>
            <li><strong>Risque d&apos;écrasement :</strong> Plusieurs agents sur un même fichier génèrent des conflits Git ingérables.</li>
            <li><strong>Dépendances temporelles :</strong> On ne peut pas coder le frontend avant d&apos;avoir un contrat d&apos;API validé.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de bilan et compétences */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="academic-cap" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">3. Simulateur interactif : Grille d&apos;Auto-Évaluation des 10 Compétences d&apos;Orchestrateur</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Évaluez votre maîtrise des 10 compétences clés développées tout au long du projet TaskFlow.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon name="academic-cap" className="h-5 w-5 text-primary shrink-0" />
              <span className="font-bold text-sm sm:text-base text-foreground">
                Score Global d&apos;Orchestration : {averageScore} / 5.0
              </span>
            </div>
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs">
              Niveau Expert • Certifié TaskFlow
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            {competencies.map((comp) => (
              <div
                key={comp.id}
                className="p-3 rounded-lg border border-border/40 bg-card flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">#{comp.id}</span>
                    <Badge variant="outline" className="text-[10px]">{comp.domain}</Badge>
                    <span className="font-semibold text-foreground">{comp.skill}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      size="sm"
                      variant={star <= comp.rating ? 'default' : 'outline'}
                      onClick={() =>
                        setCompetencies((prev) =>
                          prev.map((c) => (c.id === comp.id ? { ...c, rating: star } : c))
                        )
                      }
                      className="h-6 w-6 p-0 text-[10px] font-mono shrink-0"
                    >
                      {star}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4 : Quiz */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="shield-check" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">4. Vérifier les connaissances — Bilan final de l&apos;orchestration</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <QuickQuiz
            questions={[
              {
                id: 1,
                question: "Quel est le rôle principal du Team Leader IA dans l'organisation étudiée ?",
                options: [
                  "Remplacer le Project Manager dans toutes les décisions.",
                  "Coordonner les agents, suivre les missions et préparer les synthèses.",
                  "Réaliser personnellement toutes les tâches techniques.",
                  "Autoriser seul les opérations de publication."
                ],
                correctIndex: 1,
                explanation: "Le Team Leader organise l'effort collectif : il décompose les missions, synchronise les dépendances et produit des synthèses d'aide à la décision pour le PM humain."
              },
              {
                id: 2,
                question: "Pourquoi faut-il définir les contrats d'interface avant de développer des composants frontend et backend en parallèle ?",
                options: [
                  "Pour supprimer la nécessité des tests.",
                  "Pour permettre aux deux agents de travailler sans partager d'informations.",
                  "Pour réduire les risques d'incompatibilité entre leurs développements.",
                  "Pour éviter toute utilisation de Git."
                ],
                correctIndex: 2,
                explanation: "Le contrat d'API sert de référence commune et immuable permettant à Frontend et Backend de progresser simultanément sans divergence de format."
              },
              {
                id: 3,
                question: "Quelle est la principale différence entre QA et Reviewer ?",
                options: [
                  "QA examine les comportements et les tests ; Reviewer examine principalement la qualité technique du code.",
                  "QA développe le frontend ; Reviewer développe le backend.",
                  "QA décide de la livraison ; Reviewer décide des priorités du projet.",
                  "Les deux agents ont obligatoirement les mêmes responsabilités."
                ],
                correctIndex: 0,
                explanation: "QA contrôle la dynamique fonctionnelle de l'application (scénarios de test, critères d'acceptation). Reviewer audite la structure statique (architecture, typage, absence de code mort)."
              },
              {
                id: 4,
                question: "Dans quelle situation le parallélisme est-il le plus pertinent ?",
                options: [
                  "Lorsque toutes les tâches dépendent de la fin d'une seule tâche précédente.",
                  "Lorsque les agents modifient simultanément les mêmes fichiers sans coordination.",
                  "Lorsque les tâches sont suffisamment indépendantes et que leurs interfaces sont définies.",
                  "Lorsque les spécifications ne sont pas encore disponibles."
                ],
                correctIndex: 2,
                explanation: "Le travail parallèle n'est viable que si les tâches disposent de périmètres découpés et d'interfaces formalisées au préalable."
              },
              {
                id: 5,
                question: "Pourquoi faut-il vérifier les livrables même lorsqu'un agent annonce avoir terminé sa mission ?",
                options: [
                  "Parce que les agents doivent systématiquement recommencer leur travail.",
                  "Parce qu'une déclaration de fin ne prouve pas que les critères d'acceptation sont satisfaits.",
                  "Parce que les comptes rendus ne doivent jamais être utilisés.",
                  "Parce que seul le nombre de fichiers modifiés détermine la qualité."
                ],
                correctIndex: 1,
                explanation: "La parole d'un agent n'est qu'une intention. Seule la confrontation aux critères d'acceptation et aux tests réels apporte la preuve de réussite."
              },
              {
                id: 6,
                question: "Quelles pratiques favorisent une orchestration fiable ? (Sélectionnez la proposition exacte)",
                options: [
                  "Partager des spécifications communes, définir des critères d'acceptation et vérifier les résultats avec des preuves adaptées.",
                  "Laisser chaque agent modifier librement le périmètre du projet sans concertation.",
                  "Supprimer la validation humaine pour accélérer la cadence de fusion.",
                  "Interdire aux agents de consigner des rapports d'anomalies."
                ],
                correctIndex: 0,
                explanation: "L'orchestration repose sur le partage de règles communes, des fiches de missions balisées et des preuves tangibles de vérification."
              },
              {
                id: 7,
                question: "L'ajout d'agents supplémentaires améliore nécessairement l'efficacité globale d'un projet.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Ajouter des agents augmente la charge de communication, le risque de conflits et le coût de coordination. La taille de l'équipe doit être calibrée au juste besoin."
              },
              {
                id: 8,
                question: "Le Project Manager doit conserver le contrôle des décisions importantes, même lorsque les agents sont spécialisés et que le Team Leader coordonne efficacement leurs travaux.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. Le principe fondamental d'ingénierie responsable stipule que la souveraineté décisionnelle (validation, fusions, livraisons) demeure l'apanage exclusif de l'humain."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
