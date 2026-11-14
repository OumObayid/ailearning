'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface E2EScenario {
  id: string;
  title: string;
  category: string;
  expectedResult: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
}

const E2E_SCENARIOS: E2EScenario[] = [
  {
    id: 'E2E-01',
    title: 'Parcours création nominale de tâche',
    category: 'Fonctionnel',
    expectedResult: 'HTTP 201, id stable généré, statut initial "todo", compteur "À faire" +1',
    status: 'idle'
  },
  {
    id: 'E2E-02',
    title: 'Rejet du titre vide ou espaces blancs',
    category: 'Validation',
    expectedResult: 'HTTP 400 Bad Request, message d\'erreur clair dans l\'UI sans crash',
    status: 'idle'
  },
  {
    id: 'E2E-03',
    title: 'Modification sans altération du statut',
    category: 'Règle métier',
    expectedResult: 'HTTP 200, mise à jour du titre/desc, le statut reste inchangé',
    status: 'idle'
  },
  {
    id: 'E2E-04',
    title: 'Changement de statut (todo -> in_progress)',
    category: 'Cycle de vie',
    expectedResult: 'HTTP 200, compteur "À faire" -1, compteur "En cours" +1, somme égale au total',
    status: 'idle'
  },
  {
    id: 'E2E-05',
    title: 'Suppression et recalcul des compteurs',
    category: 'Nettoyage',
    expectedResult: 'HTTP 204 No Content, disparition immédiate du DOM, compteur associé -1',
    status: 'idle'
  },
  {
    id: 'E2E-06',
    title: 'Simulation d\'indisponibilité du serveur backend',
    category: 'Résilience',
    expectedResult: 'Bannière d\'alerte ergonomique "Serveur injoignable", aucune perte d\'état local',
    status: 'idle'
  }
];

export function Chapitre16Content() {
  const [scenarios, setScenarios] = useState<E2EScenario[]>(E2E_SCENARIOS);
  const [isCampaignRunning, setIsCampaignRunning] = useState<boolean>(false);

  const handleRunCampaign = () => {
    setIsCampaignRunning(true);
    setScenarios((prev) => prev.map((s) => ({ ...s, status: 'running' })));

    setTimeout(() => {
      setScenarios((prev) =>
        prev.map((s) => ({
          ...s,
          status: 'passed'
        }))
      );
      setIsCampaignRunning(false);
    }, 800);
  };

  const handleResetCampaign = () => {
    setScenarios(E2E_SCENARIOS);
  };

  const passedCount = scenarios.filter((s) => s.status === 'passed').length;

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* Entête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 shrink-0">
            Module 10 • Projet TaskFlow
          </Badge>
          <Badge variant="secondary" className="text-xs shrink-0">
            Chapitre 10.16
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Effectuer les tests globaux
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Campagne de recette globale et tests de bout en bout (E2E) : validation de la cohérence dynamique des compteurs, tests de résilience en cas de coupure backend et matrice de couverture complète.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance : Un test global doit être prouvé">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Un test global réussi exige une <strong>preuve vérifiable</strong> d&apos;exécution complète (du clic utilisateur dans l&apos;UI jusqu&apos;au traitement par l&apos;API). De plus, <strong>aucun agent ni Team Leader n&apos;est autorisé à exécuter un merge ou push sans accord explicite et écrit du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Périmètre des tests globaux */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="server" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">1. Du test unitaire au test de bout en bout (E2E)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Les tests globaux valident la symbiose entre les couches de l&apos;application :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="sparkles" className="h-4 w-4 text-primary shrink-0" />
                Cohérence mathématique des compteurs
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                À tout instant, la somme des trois compteurs (<code>todo + in_progress + done</code>) doit être rigoureusement égale au nombre total de tâches visibles dans la liste. Un statut sans tâche doit obligatoirement afficher 0.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="server" className="h-4 w-4 text-amber-500 shrink-0" />
                Test de résilience (Coupure de service API)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Si le serveur backend est arrêté ou redémarré (perte temporaire du stockage en mémoire), le frontend ne doit ni geler ni planter : il doit afficher une bannière informative indiquant l&apos;indisponibilité du service.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Simulateur interactif de campagne globale E2E */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="server" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">2. Simulateur interactif : Console de Recette Globale E2E TaskFlow</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Déclenchez la campagne complète de recette d&apos;acceptation pour auditer les 6 scénarios critiques de l&apos;application intégrée.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Barre de pilotage */}
          <div className="p-3.5 rounded-lg border border-border/40 bg-muted/20 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">
                Progression de la campagne globale :
              </span>
              <Badge variant="outline" className="text-xs">
                {passedCount} / {scenarios.length} scénario(s) validé(s)
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="default"
                onClick={handleRunCampaign}
                disabled={isCampaignRunning}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5"
              >
                {isCampaignRunning ? (
                  <>
                    <Icon name="refresh" className="h-3.5 w-3.5 animate-spin shrink-0" />
                    <span>Recette en cours...</span>
                  </>
                ) : (
                  <>
                    <Icon name="arrow-right" className="h-3.5 w-3.5 shrink-0" />
                    <span>Lancer la recette E2E</span>
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleResetCampaign}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5"
              >
                <Icon name="rotate-ccw" className="h-3.5 w-3.5 shrink-0" />
                <span>Réinitialiser</span>
              </Button>
            </div>
          </div>

          {/* Grille des scénarios */}
          <div className="flex flex-col gap-2">
            {scenarios.map((sc) => (
              <div
                key={sc.id}
                className="p-3 rounded-lg border border-border/40 bg-card flex flex-wrap items-center justify-between gap-2 text-xs shadow-xs"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{sc.id}</span>
                    <Badge variant="secondary" className="text-[10px]">{sc.category}</Badge>
                    <span className="font-semibold text-foreground">{sc.title}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    Attendu : {sc.expectedResult}
                  </span>
                </div>

                <div className="shrink-0">
                  {sc.status === 'idle' && (
                    <Badge variant="outline" className="text-muted-foreground text-[11px]">
                      En attente
                    </Badge>
                  )}
                  {sc.status === 'running' && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[11px] flex items-center gap-1">
                      <Icon name="refresh" className="h-3 w-3 animate-spin shrink-0" />
                      <span>Test en cours</span>
                    </Badge>
                  )}
                  {sc.status === 'passed' && (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px] flex items-center gap-1">
                      <Icon name="check-circle" className="h-3 w-3 shrink-0" />
                      <span>SUCCÈS</span>
                    </Badge>
                  )}
                  {sc.status === 'failed' && (
                    <Badge variant="destructive" className="text-[11px] flex items-center gap-1">
                      <Icon name="x" className="h-3 w-3 shrink-0" />
                      <span>ÉCHEC</span>
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {passedCount === scenarios.length && (
            <div className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center gap-2 text-xs font-semibold">
              <Icon name="check-circle" className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>Campagne globale E2E exécutée à 100% avec succès ! Tous les critères d&apos;acceptation sont validés sur l&apos;application intégrée.</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 3 : Quiz */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="shield-check" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">3. Vérifier les connaissances — Quiz officiel</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <QuickQuiz
            questions={[
              {
                id: 1,
                question: "Quel est l'objectif principal des tests globaux ?",
                options: [
                  "Vérifier uniquement les fonctions isolées du backend.",
                  "Vérifier le comportement de l'application en tenant compte de ses différentes parties.",
                  "Remplacer les vérifications réalisées pendant le développement.",
                  "Contrôler uniquement l'apparence visuelle de l'interface."
                ],
                correctIndex: 1,
                explanation: "Les tests globaux éprouvent le système dans sa globalité (UI, réseau, Express, règles métier, mémoire) pour s'assurer que les briques coopèrent harmonieusement."
              },
              {
                id: 2,
                question: "Quelle situation correspond à un test de bout en bout (E2E) ?",
                options: [
                  "Vérifier une fonction de validation sans lancer l'application.",
                  "Vérifier uniquement une route Express avec Supertest.",
                  "Créer une tâche depuis le navigateur et vérifier le résultat obtenu dans l'application.",
                  "Vérifier uniquement la compilation TypeScript."
                ],
                correctIndex: 2,
                explanation: "Un test E2E traverse tout le cycle de vie : saisie dans le navigateur, transit réseau, traitement serveur, mise à jour des compteurs et réaffichage dans l'UI."
              },
              {
                id: 3,
                question: "Dans TaskFlow, quel résultat doit être obtenu lorsqu'une tâche passe de todo à in_progress ?",
                options: [
                  "Son identifiant est automatiquement remplacé.",
                  "Son statut est mis à jour et les compteurs correspondants sont actualisés.",
                  "Sa description est automatiquement supprimée.",
                  "La tâche disparaît définitivement de la liste."
                ],
                correctIndex: 1,
                explanation: "Le statut de la tâche est mis à jour tout en conservant son identifiant, son titre et sa description, et les compteurs (todo -1, in_progress +1) sont ajustés."
              },
              {
                id: 4,
                question: "Pourquoi faut-il prévoir une préparation des données entre les tests de TaskFlow ?",
                options: [
                  "Parce que le stockage en mémoire peut perdre ses données lorsque le backend redémarre.",
                  "Parce que les données sont automatiquement conservées dans une base SQL.",
                  "Parce que les tests frontend ne peuvent pas utiliser de données.",
                  "Parce que chaque test doit obligatoirement utiliser un serveur différent."
                ],
                correctIndex: 0,
                explanation: "TaskFlow utilise un stockage en mémoire : les données s'effacent au redémarrage du processus. Il faut donc maîtriser l'état initial des données avant chaque scénario."
              },
              {
                id: 5,
                question: "Un scénario de test a été lancé, mais le résultat observé ne correspond pas au résultat attendu. Quel état faut-il lui attribuer ?",
                options: [
                  "Réussi.",
                  "Ignoré.",
                  "Échoué.",
                  "Non exécuté."
                ],
                correctIndex: 2,
                explanation: "Un test exécuté dont le résultat est en divergence avec l'attendu est un échec formel (failed). Il donne lieu à la rédaction d'un rapport BUG."
              },
              {
                id: 6,
                question: "Quelles vérifications permettent de contrôler le fonctionnement global de TaskFlow ? (Sélectionnez la proposition exacte)",
                options: [
                  "Vérifier les routes backend, les interactions de l'interface et la cohérence des compteurs après plusieurs opérations.",
                  "Vérifier uniquement que les fichiers TypeScript sont présents dans le répertoire sans les exécuter.",
                  "Vérifier seulement la couleur de fond de l'éditeur de code.",
                  "Vérifier uniquement l'heure de démarrage du système d'exploitation."
                ],
                correctIndex: 0,
                explanation: "La recette globale contrôle la synergie des routes HTTP, de l'interface graphique et la cohérence mathématique des compteurs lors de cycles d'opérations successives."
              },
              {
                id: 7,
                question: "Une compilation réussie garantit que toutes les fonctionnalités de TaskFlow fonctionnent correctement.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. La compilation TypeScript valide uniquement les types et la syntaxe. Seuls des tests fonctionnels et d'intégration réels attestent du bon fonctionnement applicatif."
              },
              {
                id: 8,
                question: "Après la correction d'une anomalie, il est utile de relancer les tests concernés ainsi que certains tests de non-régression.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. Relancer les tests associés permet de confirmer que la correction est effective et qu'aucun effet de bord n'a détérioré les fonctionnalités existantes."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
