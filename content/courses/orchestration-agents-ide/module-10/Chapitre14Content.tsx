'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface AuditCheckItem {
  id: string;
  label: string;
  status: 'passed' | 'failed' | 'pending';
  details: string;
}

export function Chapitre14Content() {
  const [activeDiffTab, setActiveDiffTab] = useState<'stat' | 'cached' | 'patch'>('stat');
  const [regressionState, setRegressionState] = useState<'idle' | 'checking' | 'regression_detected' | 'fixed'>('idle');

  const [checklist, setChecklist] = useState<AuditCheckItem[]>([
    {
      id: 'c1',
      label: 'Conformité avec les 6 spécifications fonctionnelles',
      status: 'passed',
      details: 'Création, lecture, modification, suppression, statut et compteurs implémentés.'
    },
    {
      id: 'c2',
      label: 'Respect strict du contrat d\'interface API REST (ARC-001)',
      status: 'passed',
      details: 'Format JSON normalisé { todo, in_progress, done } et codes 200, 201, 204, 400, 404.'
    },
    {
      id: 'c3',
      label: 'Exécution réelle et vérifiable des tests automatisés',
      status: 'passed',
      details: 'npm run test exécuté avec sortie de terminal probante (6/6 tests au vert).'
    },
    {
      id: 'c4',
      label: 'Vérification de non-régression sur le périmètre existant',
      status: 'pending',
      details: 'Campagne de contrôle des effets de bord suite au correctif COR-001.'
    }
  ]);

  const handleRunRegressionCheck = () => {
    setRegressionState('checking');
    setTimeout(() => {
      setRegressionState('regression_detected');
      setChecklist((prev) =>
        prev.map((item) =>
          item.id === 'c4'
            ? {
                ...item,
                status: 'failed',
                details: 'RÉGRESSION : PUT /api/tasks/:id renvoie désormais 400 car la description est écrasée !'
              }
            : item
        )
      );
    }, 700);
  };

  const handleApplyCleanFix = () => {
    setRegressionState('checking');
    setTimeout(() => {
      setRegressionState('fixed');
      setChecklist((prev) =>
        prev.map((item) =>
          item.id === 'c4'
            ? {
                ...item,
                status: 'passed',
                details: 'Correctif validé : la régression sur PUT est résolue et les tests de non-régression passent à 100%.'
              }
            : item
        )
      );
    }, 700);
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
            Chapitre 10.14
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Vérifier et corriger les livrables
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Processus d&apos;assurance qualité rigoureux : distinction entre livrable vérifié et validé, audit méthodique du diff Git (<code>git diff --stat</code>, <code>git diff --cached</code>), classification des anomalies et prévention des régressions.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance : Vérifié ne signifie pas Validé">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          La <strong>vérification</strong> constate la conformité technique du livrable (tests réussis, diff propre). La <strong>validation</strong> est un acte d&apos;autorité formel : <strong>seul le Chef de Projet humain valide définitivement un livrable et autorise une fusion dans le dépôt</strong>.
        </p>
      </Callout>

      {/* Section 1 : Vérification vs Validation */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              14.2. Les deux étapes de la chaîne d&apos;acceptation
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Confondre la conformité technique avec la validation du projet conduit à l&apos;abandon de la gouvernance humaine :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="search" className="h-4 w-4 text-primary shrink-0" />
                1. La Vérification (Assurée par QA & Reviewer)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Examine si le code répond aux critères d&apos;acceptation : exécution réelle des tests Supertest, absence d&apos;effets de bord, absence de modifications hors périmètre dans le diff Git.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="shield-check" className="h-4 w-4 text-emerald-500 shrink-0" />
                2. La Validation (Monopole du Chef de Projet Humain)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Décision souveraine d&apos;intégrer officiellement le livrable dans la branche de référence <code>main</code> et d&apos;acter la conformité au jalon du projet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Commandes d'audit Git */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              14.4. Inspecter méthodiquement le diff Git
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Avant d&apos;accepter un compte rendu d&apos;agent, le Team Leader exécute une inspection du dépôt dans le worktree dédié :
          </p>

          <pre className="p-3 rounded-lg bg-muted/30 font-mono text-xs text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`# 1. Vérifier l'ampleur des fichiers modifiés
git diff --stat

# 2. Inspecter les lignes préparées pour le commit (staging area)
git diff --cached

# 3. Traquer les modifications hors périmètre (ex: package.json touché sans demande)
git diff --name-only`}
          </pre>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de régression */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="sparkles" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Simulateur interactif : Banc d&apos;Audit & Détection de Régression
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            L&apos;agent Backend a livré un correctif pour <code>BUG-001</code>. Vérifiez si ce livrable introduit une régression sur les autres routes de TaskFlow.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Checklist de contrôle */}
          <div className="flex flex-col gap-2">
            {checklist.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border border-border/40 bg-card flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{item.label}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{item.details}</span>
                </div>

                <div className="shrink-0">
                  {item.status === 'pending' && (
                    <Badge variant="outline" className="text-muted-foreground text-[11px]">
                      En attente
                    </Badge>
                  )}
                  {item.status === 'passed' && (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px] flex items-center gap-1">
                      <Icon name="check-circle" className="h-3 w-3 shrink-0" />
                      <span>CONFORME</span>
                    </Badge>
                  )}
                  {item.status === 'failed' && (
                    <Badge variant="destructive" className="text-[11px] flex items-center gap-1">
                      <Icon name="x" className="h-3 w-3 shrink-0" />
                      <span>RÉGRESSION DÉTECTÉE</span>
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Boutons d'action du banc d'essai */}
          <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-foreground">
              Audit de non-régression (Campagne de vérification) :
            </span>
            <div className="flex flex-wrap gap-2">
              {regressionState === 'idle' && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleRunRegressionCheck}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5"
                >
                  <Icon name="refresh" className="h-3.5 w-3.5 shrink-0" />
                  <span>Lancer l&apos;audit de non-régression</span>
                </Button>
              )}

              {regressionState === 'regression_detected' && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleApplyCleanFix}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700"
                >
                  <Icon name="bug" className="h-3.5 w-3.5 shrink-0" />
                  <span>Assigner mission FIX-002 (Corriger la régression)</span>
                </Button>
              )}

              {regressionState === 'fixed' && (
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <Icon name="check-circle" className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Livrable audité à 100% avec succès — Prêt pour soumission au PM !</span>
                </div>
              )}
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
                question: "Quelle est la différence principale entre vérifier et valider un livrable ?",
                options: [
                  "Vérifier consiste à accepter officiellement le livrable, valider consiste à exécuter les tests.",
                  "Vérifier consiste à examiner la conformité, valider consiste à accepter formellement le résultat selon les responsabilités définies.",
                  "Vérifier et valider désignent exactement la même opération.",
                  "Vérifier concerne uniquement le backend, valider uniquement le frontend."
                ],
                correctIndex: 1,
                explanation: "La vérification contrôle la conformité technique du travail produit. La validation est l'acceptation formelle par l'autorité souveraine (le Chef de Projet humain)."
              },
              {
                id: 2,
                question: "Un agent annonce que tous les tests réussissent. Quelle information est la plus utile pour examiner cette affirmation ?",
                options: [
                  "Le nombre de fichiers modifiés uniquement.",
                  "Le nom de l'agent responsable uniquement.",
                  "La commande exécutée, le contexte d'exécution et les résultats observés.",
                  "La date de création du dépôt uniquement."
                ],
                correctIndex: 2,
                explanation: "Seules des preuves tangibles permettent d'attester d'un succès : commande lancée, code retour, nombre de tests passés, ignorés ou en échec."
              },
              {
                id: 3,
                question: "Quel est l'objectif principal d'une fiche d'anomalie ?",
                options: [
                  "Remplacer les spécifications fonctionnelles.",
                  "Décrire précisément un écart pour permettre son analyse, sa correction et son suivi.",
                  "Autoriser automatiquement un merge.",
                  "Attribuer une nouvelle architecture au projet."
                ],
                correctIndex: 1,
                explanation: "La fiche d'anomalie documente le comportement attendu vs observé et les étapes de reproduction pour permettre une correction ciblée et mesurable."
              },
              {
                id: 4,
                question: "Un agent corrige une anomalie du backend, mais la modification peut affecter les compteurs. Quelle démarche est appropriée ?",
                options: [
                  "Vérifier uniquement que le fichier modifié ne contient plus d'erreur de syntaxe.",
                  "Clôturer immédiatement l'anomalie.",
                  "Reproduire le scénario initial, relancer les tests concernés et examiner les effets secondaires.",
                  "Supprimer les tests qui échouent."
                ],
                correctIndex: 2,
                explanation: "L'essence du test de non-régression est de vérifier que le correctif résout le bogue initial sans détériorer les fonctionnalités adjacentes (compteurs)."
              },
              {
                id: 5,
                question: "Quelles activités correspondent principalement au rôle de QA dans la vérification des livrables ? (Sélectionnez la proposition exacte)",
                options: [
                  "Vérifier les comportements attendus, reproduire les anomalies et examiner les résultats des tests.",
                  "Autoriser seul les opérations de merge et de push vers la branche main.",
                  "Réécrire l'architecture générale du projet sans en parler à l'Architecte.",
                  "Supprimer les worktrees des autres agents."
                ],
                correctIndex: 0,
                explanation: "QA reproduit les anomalies, déroule les scénarios et vérifie les comportements. Les opérations de merge et push relèvent exclusivement du PM humain."
              },
              {
                id: 6,
                question: "La commande git diff --cached permet principalement d'examiner :",
                options: [
                  "Les différences présentes dans la zone de staging.",
                  "Les différences entre deux branches distantes uniquement.",
                  "Les tests automatisés du projet.",
                  "Les fichiers ignorés par Git."
                ],
                correctIndex: 0,
                explanation: "git diff --cached (ou --staged) compare l'index préparé avec le dernier commit, montrant ce qui fera partie du prochain commit."
              },
              {
                id: 7,
                question: "Un test ignoré constitue une preuve que le comportement testé fonctionne correctement.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Un test ignoré (skipped) n'a pas été exécuté : il n'apporte strictement aucune preuve de bon fonctionnement."
              },
              {
                id: 8,
                question: "Une correction peut introduire une régression lorsqu'elle rend incorrect un comportement qui fonctionnait auparavant.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. C'est la définition exacte d'une régression logicielle : casser involontairement un comportement existant en voulant réparer un bogue."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
