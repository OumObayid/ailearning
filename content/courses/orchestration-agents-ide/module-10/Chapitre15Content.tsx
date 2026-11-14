'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

export function Chapitre15Content() {
  const [pmApproved, setPmApproved] = useState<boolean>(false);
  const [stage, setStage] = useState<'step1_be' | 'step2_fe' | 'conflict' | 'completed'>('step1_be');
  const [conflictResolved, setConflictResolved] = useState<boolean>(false);

  const handleRequestPmApproval = () => {
    setPmApproved(true);
  };

  const handleMergeBackend = () => {
    if (!pmApproved) return;
    setStage('step2_fe');
  };

  const handleMergeFrontend = () => {
    if (!pmApproved) return;
    setStage('conflict');
  };

  const handleResolveConflict = () => {
    setConflictResolved(true);
    setStage('completed');
  };

  const handleReset = () => {
    setPmApproved(false);
    setStage('step1_be');
    setConflictResolved(false);
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
            Chapitre 10.15
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Intégrer progressivement les développements
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Stratégie d&apos;intégration progressive des branches d&apos;agents dans <code>main</code> : séquencement logique (Backend d&apos;abord, puis Frontend), fusion explicite avec <code>--no-ff</code>, arbitrage des conflits Git et contrôle d&apos;autorité souveraine du PM humain.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="danger" title="Règle d'or absolue de gouvernance : Accord formel du PM avant tout merge">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Aucun agent ni Team Leader n&apos;est autorisé à exécuter <code>git merge</code>, <code>git rebase</code> ou <code>git push</code> de sa propre initiative. <strong>Chaque opération d&apos;intégration requiert l&apos;autorisation formelle et écrite du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Séquencement de l'intégration */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="layout" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">1. Séquencement méthodique : Pourquoi intégrer le Backend en premier ?</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Intégrer tous les livrables d&apos;un coup le dernier jour est la cause numéro 1 d&apos;échecs en équipe multi-agents. L&apos;intégration doit suivre l&apos;ordre des dépendances :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 text-emerald-500 shrink-0" />
                Étape 1 : Intégration du Backend (<code>feature/backend-task-api</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Le serveur pose le socle : routes REST, types TypeScript et logique métier. On compile et valide les tests Supertest sur la branche <code>main</code>.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 text-primary shrink-0" />
                Étape 2 : Intégration du Frontend (<code>feature/frontend-task-list</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                L&apos;interface React vient se greffer sur un backend déjà éprouvé et disponible. Les échanges réseau peuvent être immédiatement contrôlés.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 text-purple-500 shrink-0" />
                Étape 3 : Campagne globale de recette QA & Arbitrage
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Vérification du parcours utilisateur complet et élimination de toute régression résiduelle.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Commande git merge --no-ff */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">2. Fusion traçable avec git merge --no-ff</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            L&apos;option <code>--no-ff</code> (no fast-forward) force la création explicite d&apos;un commit de fusion. Cela permet d&apos;immortaliser la fin d&apos;une mission d&apos;agent dans le graphe Git :
          </p>

          <div className="p-3 rounded-lg bg-black border border-slate-800 font-mono text-xs text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`# 1. Se positionner sur la branche principale de référence
git switch main

# 2. Fusionner la branche Backend avec commit de merge explicite
git merge --no-ff feature/backend-task-api -m "merge(backend): intégration de l'API REST TaskFlow"

# 3. Contrôler l'historique
git log --graph --oneline -5`}
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de pipeline */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">3. Simulateur interactif : Pipeline d&apos;Intégration & Arbitrage Git</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Expérimentez le contrôle d&apos;autorité PM, déclenchez l&apos;intégration progressive et arbitrez un conflit Git simulé.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Bloc d'autorisation PM */}
          <div className="p-3.5 rounded-lg border border-border/40 bg-muted/20 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              {pmApproved ? (
                <>
                  <Icon name="lock" className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Autorisation formelle du PM humain accordée
                  </span>
                </>
              ) : (
                <>
                  <Icon name="lock" className="h-4 w-4 text-rose-500 shrink-0" />
                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                    En attente de l&apos;accord écrit du Chef de Projet humain (Merge verrouillé)
                  </span>
                </>
              )}
            </div>
            {!pmApproved ? (
              <Button
                size="sm"
                variant="default"
                onClick={handleRequestPmApproval}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5"
              >
                <Icon name="shield-check" className="h-3.5 w-3.5 shrink-0" />
                <span>Donner l&apos;accord PM (Déverrouiller)</span>
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

          {/* Étapes du pipeline */}
          <div className="flex flex-col gap-2">
            {/* Étape 1 : Backend */}
            <div className="p-3 rounded-lg border border-border/40 bg-card flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">Étape 1 : Fusion de feature/backend-task-api</span>
                {stage !== 'step1_be' && (
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px]">
                    Fusionné (--no-ff)
                  </Badge>
                )}
              </div>
              {stage === 'step1_be' && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleMergeBackend}
                  disabled={!pmApproved}
                  className="h-7 text-xs shrink-0"
                >
                  Exécuter git merge Backend
                </Button>
              )}
            </div>

            {/* Étape 2 : Frontend */}
            <div className="p-3 rounded-lg border border-border/40 bg-card flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">Étape 2 : Fusion de feature/frontend-task-list</span>
                {stage === 'conflict' && (
                  <Badge variant="destructive" className="text-[10px]">Conflit détecté !</Badge>
                )}
                {stage === 'completed' && (
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px]">
                    Fusionné & Arbitré
                  </Badge>
                )}
              </div>
              {stage === 'step2_fe' && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleMergeFrontend}
                  disabled={!pmApproved}
                  className="h-7 text-xs shrink-0"
                >
                  Exécuter git merge Frontend
                </Button>
              )}
            </div>
          </div>

          {/* Résolution de conflit simulée */}
          {stage === 'conflict' && (
            <div className="p-3.5 rounded-lg border border-rose-500/30 bg-rose-500/5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-semibold text-xs">
                <Icon name="info" className="h-4 w-4 shrink-0 text-rose-500" />
                <span>Conflit Git dans <code>taskflow/.env.example</code> (Modification concurrente)</span>
              </div>

              <div className="p-2.5 rounded bg-black border border-slate-800 font-mono text-[11px] text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`<<<<<<< HEAD (main - Backend)
PORT=3001
=======
VITE_API_URL=http://localhost:3001
>>>>>>> feature/frontend-task-list`}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  Arbitrage du Team Leader : Fusionner les deux variables nécessaires.
                </span>
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleResolveConflict}
                  className="h-8 text-xs shrink-0 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Icon name="check-circle" className="h-3.5 w-3.5 shrink-0" />
                  <span>Valider la version fusionnée & Finaliser</span>
                </Button>
              </div>
            </div>
          )}

          {stage === 'completed' && (
            <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center gap-2 text-xs font-semibold">
              <Icon name="check-circle" className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>Intégration progressive achevée avec succès sur la branche main ! Les deux applications cohabitent harmonieusement.</span>
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
                question: "Quel est l'objectif principal de l'intégration progressive ?",
                options: [
                  "Réunir toutes les modifications en une seule opération à la fin du projet.",
                  "Réunir des contributions cohérentes par étapes et vérifier le résultat à chaque étape.",
                  "Remplacer les tests réalisés par les agents.",
                  "Supprimer les branches de développement avant leur examen."
                ],
                correctIndex: 1,
                explanation: "L'intégration progressive permet d'assembler des briques finies étape par étape et de tester immédiatement la compatibilité pour isoler rapidement tout problème."
              },
              {
                id: 2,
                question: "Dans l'organisation pédagogique de TaskFlow, pourquoi est-il logique de vérifier le backend et son contrat API avant de finaliser l'intégration du frontend ?",
                options: [
                  "Parce que React ne peut fonctionner qu'après la suppression des branches backend.",
                  "Parce que le frontend doit utiliser les routes et les structures de données réellement fournies par le backend.",
                  "Parce que le backend doit contenir les composants React.",
                  "Parce que les tests frontend sont inutiles lorsque le backend existe."
                ],
                correctIndex: 1,
                explanation: "Le frontend est client du backend : intégrer le serveur d'abord garantit que l'interface s'appuie sur des routes existantes et des contrats JSON stables."
              },
              {
                id: 3,
                question: "Que signifie un conflit Git pendant un merge ?",
                options: [
                  "Le dépôt est nécessairement corrompu.",
                  "Les deux branches contiennent obligatoirement des erreurs de syntaxe.",
                  "Git ne peut pas réunir automatiquement certaines modifications et demande une intervention.",
                  "Le merge a déjà été publié sur le dépôt distant."
                ],
                correctIndex: 2,
                explanation: "Un conflit survient lorsque Git constate des modifications concurrentes incompatibles sur les mêmes lignes et requiert un arbitrage humain ou d'équipe."
              },
              {
                id: 4,
                question: "Quel est le rôle principal de git diff --cached ?",
                options: [
                  "Afficher les différences présentes dans la zone de staging.",
                  "Exécuter les tests du backend.",
                  "Créer un commit de merge.",
                  "Transmettre les modifications au dépôt distant."
                ],
                correctIndex: 0,
                explanation: "git diff --cached (ou --staged) compare l'index préparé avec le dernier commit, inspectant ce qui sera enregistré dans le prochain commit."
              },
              {
                id: 5,
                question: "Après un merge sans conflit, quelle démarche reste nécessaire ?",
                options: [
                  "Supprimer immédiatement les branches sources.",
                  "Considérer automatiquement l'application comme fonctionnelle.",
                  "Vérifier les changements réunis et exécuter les tests prévus.",
                  "Réécrire systématiquement l'historique Git."
                ],
                correctIndex: 2,
                explanation: "L'absence de conflit Git indique seulement que les fichiers n'ont pas de collision textuelle. Seuls des tests d'intégration réels prouvent la compatibilité logique."
              },
              {
                id: 6,
                question: "Quelles opérations nécessitent une autorisation explicite du Project Manager dans le cadre de ce projet ? (Sélectionnez la proposition exacte)",
                options: [
                  "Le merge, le rebase et le push.",
                  "Uniquement la commande git status.",
                  "La création d'un commentaire dans le code.",
                  "La consultation du fichier README.md."
                ],
                correctIndex: 0,
                explanation: "Règle absolue de gouvernance : le merge, le rebase et le push touchent à l'historique et à la publication du projet et exigent l'autorisation formelle du PM."
              },
              {
                id: 7,
                question: "Un merge techniquement réussi garantit que le frontend et le backend sont fonctionnellement compatibles.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Deux morceaux de code peuvent fusionner sans conflit de fichiers mais échouer lors des échanges réseau si les formats JSON diffèrent."
              },
              {
                id: 8,
                question: "Un test d'intégration peut vérifier qu'une tâche créée depuis le frontend est correctement enregistrée par le backend et apparaît ensuite dans l'interface.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. C'est l'essence même du test d'intégration : valider la chaîne complète entre la saisie utilisateur, la requête HTTP, le traitement backend et le réaffichage."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
