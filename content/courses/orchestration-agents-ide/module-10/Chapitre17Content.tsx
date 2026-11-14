'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface DefectItem {
  id: string;
  title: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  status: 'À analyser' | 'En cours' | 'Corrigé, à vérifier' | 'Vérifié';
  component: string;
}

export function Chapitre17Content() {
  const [defects, setDefects] = useState<DefectItem[]>([
    {
      id: 'BUG-001',
      title: 'Titre composé d\'espaces blancs accepté par l\'API',
      priority: 'P1',
      status: 'Vérifié',
      component: 'Backend Service'
    },
    {
      id: 'BUG-002',
      title: 'Compteurs non actualisés lors du passage à "done"',
      priority: 'P2',
      status: 'Corrigé, à vérifier',
      component: 'Frontend State'
    },
    {
      id: 'BUG-003',
      title: 'Message d\'erreur générique peu lisible sur 404',
      priority: 'P3',
      status: 'Corrigé, à vérifier',
      component: 'Frontend UI'
    },
    {
      id: 'BUG-004',
      title: 'Logs de débogage console.log résiduels dans app.ts',
      priority: 'P4',
      status: 'À analyser',
      component: 'Backend Clean'
    }
  ]);

  const [rcReady, setRcReady] = useState<boolean>(false);

  const handleResolveAll = () => {
    setDefects((prev) =>
      prev.map((d) => ({
        ...d,
        status: 'Vérifié'
      }))
    );
    setRcReady(true);
  };

  const handleReset = () => {
    setDefects([
      {
        id: 'BUG-001',
        title: 'Titre composé d\'espaces blancs accepté par l\'API',
        priority: 'P1',
        status: 'Vérifié',
        component: 'Backend Service'
      },
      {
        id: 'BUG-002',
        title: 'Compteurs non actualisés lors du passage à "done"',
        priority: 'P2',
        status: 'Corrigé, à vérifier',
        component: 'Frontend State'
      },
      {
        id: 'BUG-003',
        title: 'Message d\'erreur générique peu lisible sur 404',
        priority: 'P3',
        status: 'Corrigé, à vérifier',
        component: 'Frontend UI'
      },
      {
        id: 'BUG-004',
        title: 'Logs de débogage console.log résiduels dans app.ts',
        priority: 'P4',
        status: 'À analyser',
        component: 'Backend Clean'
      }
    ]);
    setRcReady(false);
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
            Chapitre 10.17
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Corriger les problèmes et finaliser l&apos;application
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Stabilisation finale de TaskFlow : diagnostic causal, priorisation des anomalies (P1 à P4), nettoyage du code mort et préparation rigoureuse de la Release Candidate (v1.0.0-rc.1).
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance : Une Release Candidate n'est pas une livraison">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          La préparation d&apos;une Version Candidate (Release Candidate) atteste que le code est gelé et prêt pour l&apos;examen final. <strong>Elle ne constitue en aucun cas une livraison officielle et n&apos;autorise aucun push ou tag public sans accord formel et écrit du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Méthode de diagnostic causal */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="settings" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">1. Traiter la cause profonde, pas seulement le symptôme</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Lorsqu&apos;une anomalie survient en phase de stabilisation, le réflexe d&apos;un agent inexpérimenté est d&apos;ajouter un patch hâtif. La démarche d&apos;ingénierie impose trois distinctions :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="info" className="h-4 w-4 text-rose-500 shrink-0" />
                1. Le Symptôme (Ce qui est visible)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Exemple : Le compteur &quot;En cours&quot; ne s&apos;incrémente pas lorsque l&apos;utilisateur clique sur changer statut.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="bug" className="h-4 w-4 text-amber-500 shrink-0" />
                2. La Cause Profonde (L&apos;origine technique)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Après inspection de <code>TasksPage.tsx</code>, on s&apos;aperçoit que le state React local était mis à jour mais que la fonction de rafraîchissement <code>loadCounters()</code> n&apos;était pas appelée dans le callback post-PATCH.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 text-emerald-500 shrink-0" />
                3. Le Correctif & Test de Non-Régression
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                L&apos;agent Frontend corrige l&apos;appel d&apos;état, et l&apos;agent QA relance l&apos;intégralité de la suite pour prouver que la création et la suppression n&apos;ont pas été altérées.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Nettoyage avant Release Candidate */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="trash" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">2. Nettoyage du code mort et assainissement du projet</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Avant de geler la version, les agents réalisent un balayage de salubrité technique :
          </p>

          <div className="p-3 rounded-lg bg-black border border-slate-800 font-mono text-xs text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`# 1. Vérification de l'absence d'erreurs de typage résiduelles
npm run build (Frontend et Backend)

# 2. Élimination des console.log temporaires et code commenté
# Inspection ciblée du diff
git diff main...HEAD

# 3. Vérification des scripts package.json et variables .env.example
cat README.md
cat taskflow/.env.example`}
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de stabilisation */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="sparkles" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">3. Simulateur interactif : Matrice de Stabilisation & Release Candidate</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Suivez la résolution des anomalies classées de P1 à P4 et générez la version candidate <code>v1.0.0-rc.1</code>.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Matrice des anomalies */}
          <div className="flex flex-col gap-2">
            {defects.map((def) => (
              <div
                key={def.id}
                className="p-3 rounded-lg border border-border/40 bg-card flex flex-wrap items-center justify-between gap-2 text-xs shadow-xs"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{def.id}</span>
                    <Badge
                      variant="outline"
                      className={
                        def.priority === 'P1'
                          ? 'border-rose-500/50 text-rose-600 dark:text-rose-400 text-[10px]'
                          : def.priority === 'P2'
                          ? 'border-amber-500/50 text-amber-600 dark:text-amber-400 text-[10px]'
                          : 'text-[10px]'
                      }
                    >
                      Priorité {def.priority}
                    </Badge>
                    <span className="font-semibold text-foreground">{def.title}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">Composant : {def.component}</span>
                </div>

                <div className="shrink-0">
                  <Badge
                    variant="secondary"
                    className={
                      def.status === 'Vérifié'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px]'
                        : def.status === 'Corrigé, à vérifier'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 text-[10px]'
                        : 'bg-muted text-muted-foreground text-[10px]'
                    }
                  >
                    {def.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Action de clôture et packaging RC */}
          <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-foreground">
              Statut de la version : {rcReady ? 'Release Candidate prête' : 'Anomalies résiduelles en cours de vérification'}
            </span>

            <div className="flex flex-wrap gap-2">
              {!rcReady ? (
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleResolveAll}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5"
                >
                  <Icon name="sparkles" className="h-3.5 w-3.5 shrink-0" />
                  <span>Valider les correctifs & Préparer RC</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5"
                >
                  <Icon name="rotate-ccw" className="h-3.5 w-3.5 shrink-0" />
                  <span>Réinitialiser</span>
                </Button>
              )}
            </div>
          </div>

          {rcReady && (
            <div className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 font-bold">
                <Icon name="check-circle" className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>Version Candidate &quot;v1.0.0-rc.1&quot; générée avec succès !</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                0 anomalie P1/P2 en suspens, code propre débarrassé de tout code mort, tests de non-régression validés à 100%. Le livrable complet est transmis au comité de validation pour la décision finale du Chef de Projet humain.
              </p>
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
                question: "Quelle est la première démarche recommandée lorsqu'une anomalie est détectée ?",
                options: [
                  "Modifier immédiatement le code concerné.",
                  "Reproduire et documenter le problème avant de rechercher sa cause.",
                  "Supprimer le test qui échoue.",
                  "Demander à tous les agents de modifier le même fichier."
                ],
                correctIndex: 1,
                explanation: "Il faut d'abord isoler les conditions précises de reproduction et consigner les faits observés pour identifier la cause réelle sans improviser de faux correctifs."
              },
              {
                id: 2,
                question: "Quelle est la différence entre une anomalie et sa cause ?",
                options: [
                  "L'anomalie est le comportement incorrect observé ; la cause explique son origine.",
                  "L'anomalie est toujours une erreur frontend ; la cause est toujours backend.",
                  "L'anomalie est une correction ; la cause est un résultat de test.",
                  "Les deux termes désignent exactement la même chose."
                ],
                correctIndex: 0,
                explanation: "L'anomalie est le symptôme visible (ex: compteur qui ne bouge pas). La cause est la faille logique sous-jacente (ex: absence de rappel du fetch)."
              },
              {
                id: 3,
                question: "Quel agent est principalement chargé d'organiser les scénarios de vérification et de documenter les résultats des tests ?",
                options: [
                  "Architect.",
                  "Backend.",
                  "QA.",
                  "Project Manager."
                ],
                correctIndex: 2,
                explanation: "L'agent QA pilote l'assurance qualité : il conçoit les scénarios, reproduit les bogues et fournit des rapports objectifs et vérifiables."
              },
              {
                id: 4,
                question: "Après la correction d'un défaut concernant les compteurs, pourquoi faut-il également vérifier la création et la suppression des tâches ?",
                options: [
                  "Pour ajouter de nouvelles fonctionnalités.",
                  "Pour vérifier que la correction n'a pas provoqué de régression dans des comportements liés.",
                  "Pour remplacer les tests backend.",
                  "Pour éviter d'examiner le code modifié."
                ],
                correctIndex: 1,
                explanation: "Les compteurs dépendant directement des créations et suppressions, un test de non-régression transversal s'impose pour s'assurer que la chaîne fonctionne toujours."
              },
              {
                id: 5,
                question: "Que signifie le statut « Corrigé, à vérifier » ?",
                options: [
                  "La correction est réalisée, mais les vérifications prévues ne sont pas encore terminées.",
                  "La correction a été refusée.",
                  "Le problème n'a pas été analysé.",
                  "Le projet est définitivement validé."
                ],
                correctIndex: 0,
                explanation: "Ce statut indique que l'agent développeur a poussé son correctif mais que l'agent QA et le Team Leader doivent encore dérouler les tests de validation."
              },
              {
                id: 6,
                question: "Quelles informations sont utiles dans une fiche d'anomalie ? (Sélectionnez la proposition exacte)",
                options: [
                  "Les étapes de reproduction, le résultat attendu, le résultat observé et l'environnement.",
                  "Une simple promesse verbale affirmant que tout va bien.",
                  "L'adresse de courriel personnelle du développeur de l'IDE.",
                  "Uniquement la couleur de fond de l'écran."
                ],
                correctIndex: 0,
                explanation: "Une fiche d'anomalie doit contenir toutes les données tangibles permettant de répliquer le dysfonctionnement sans ambiguïté."
              },
              {
                id: 7,
                question: "Un agent peut effectuer un merge ou un push dès qu'il estime que sa correction est satisfaisante.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Même avec une correction validée par QA, aucun agent ni Team Leader ne peut exécuter de merge ou push sans accord explicite et écrit du PM humain."
              },
              {
                id: 8,
                question: "Une version candidate est automatiquement une version finale validée et publiée.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Une Release Candidate est une proposition gelée soumise à l'arbitrage du Chef de Projet. Seule sa validation formelle permet la livraison finale."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
