'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

export function Chapitre18Content() {
  const [pmSigned, setPmSigned] = useState<boolean>(false);
  const [tagCreated, setTagCreated] = useState<boolean>(false);

  const handleSignRelease = () => {
    setPmSigned(true);
  };

  const handleCreateGitTag = () => {
    if (!pmSigned) return;
    setTagCreated(true);
  };

  const handleReset = () => {
    setPmSigned(false);
    setTagCreated(false);
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
            Chapitre 10.18
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Valider et livrer la version finale de TaskFlow
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Aboutissement du cycle de développement : revue des critères d&apos;acceptation, recueil des avis formels des agents, arbitrage souverain du Project Manager humain, étiquetage Git (<code>v1.0.0</code>) et documentation des limites mémoire.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="danger" title="Règle d'or de gouvernance : Décision souveraine du Project Manager">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Les avis favorables des agents QA, Reviewer et Team Leader constituent des recommandations techniques. <strong>La décision d&apos;acceptation de la version finale et l&apos;autorisation de tag/push vers la branche principale relèvent exclusivement du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Préparation vs Validation vs Livraison */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="folder" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              18.2. Préparation, Validation et Livraison
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Une livraison professionnelle ne se résume pas à compresser du code dans un fichier ZIP :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="document-text" className="h-4 w-4 text-primary shrink-0" />
                1. La Préparation (Dossier de recette)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Le Team Leader assemble la Release Candidate, le rapport de tests QA (6/6 au vert), l&apos;audit du Reviewer (0 régression) et le <code>README.md</code> exhaustif.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="shield-check" className="h-4 w-4 text-emerald-500 shrink-0" />
                2. La Validation (Signature PM)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Le Chef de Projet humain constate l&apos;alignement avec les 6 fonctionnalités de départ et signe formellement le bon d&apos;acceptation.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="document-text" className="h-4 w-4 text-purple-500 shrink-0" />
                3. La Livraison (Tag Git & Packaging)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Pose du tag annoté <code>git tag -a v1.0.0 -m &quot;Version 1.0.0 TaskFlow&quot;</code> et mise à disposition des commandes d&apos;installation <code>npm ci</code> et de démarrage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Avis des agents avant signature */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="user" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              18.6. Recueil des avis techniques formels
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <div className="p-3 rounded-lg border border-border/40 bg-muted/10 flex flex-col gap-2 text-xs font-mono">
            <div><strong>Agent QA :</strong> &quot;6/6 scénarios passés avec succès. Validé sur cas nominaux et cas d&apos;erreurs (espaces blancs). Avis : FAVORABLE.&quot;</div>
            <div><strong>Agent Reviewer :</strong> &quot;Architecture 4 couches respectée, aucun code mort, typage strict TypeScript sans any. Avis : FAVORABLE.&quot;</div>
            <div><strong>Team Leader IA :</strong> &quot;Intégration progressive achevée, README complet avec documentation du stockage en mémoire. Avis : PRÊT POUR VALIDATION.&quot;</div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de comité de validation */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="academic-cap" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Simulateur interactif : Comité de Validation & Tag de Release Git
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Incarnez le Chef de Projet humain pour examiner le dossier, signer le bon de validation et sceller la version officielle <code>v1.0.0</code>.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Dossier de recette */}
          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
              <span className="font-bold text-foreground">Dossier de Recette Finale — TaskFlow v1.0.0</span>
              <Badge variant="outline" className="text-[10px]">6/6 Fonctionnalités OK</Badge>
            </div>
            <div className="flex flex-col gap-1 text-muted-foreground">
              <div>✓ Créer une tâche (validation non-vide, statut initial todo)</div>
              <div>✓ Afficher les tâches et gérer la liste vide</div>
              <div>✓ Modifier une tâche sans impacter le statut</div>
              <div>✓ Changer de statut de manière isolée (todo, in_progress, done)</div>
              <div>✓ Supprimer une tâche avec nettoyage immédiat</div>
              <div>✓ Compter dynamiquement les tâches par statut (somme cohérente)</div>
              <div>✓ Documentation README complète incluant la limite du stockage en mémoire (Map)</div>
            </div>
          </div>

          {/* Action de décision humaine */}
          <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              {pmSigned ? (
                <>
                  <Icon name="check-circle" className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Version validée formellement par le Chef de Projet humain
                  </span>
                </>
              ) : (
                <>
                  <Icon name="shield-check" className="h-4 w-4 text-amber-500 shrink-0" />
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    En attente de la décision d&apos;acceptation du PM humain
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {!pmSigned ? (
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleSignRelease}
                  className="h-8 text-xs shrink-0 flex items-center gap-1.5"
                >
                  <Icon name="academic-cap" className="h-3.5 w-3.5 shrink-0" />
                  <span>Signer et Valider la Version 1.0.0</span>
                </Button>
              ) : (
                <>
                  {!tagCreated ? (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={handleCreateGitTag}
                      className="h-8 text-xs shrink-0 flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700"
                    >
                      <Icon name="document-text" className="h-3.5 w-3.5 shrink-0" />
                      <span>Créer le tag Git &quot;v1.0.0&quot;</span>
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
                </>
              )}
            </div>
          </div>

          {tagCreated && (
            <div className="p-3.5 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 font-bold">
                <Icon name="document-text" className="h-4 w-4 shrink-0 text-purple-500" />
                <span>Tag Git &quot;v1.0.0&quot; créé et scellé avec succès !</span>
              </div>
              <pre className="p-2 rounded bg-background/80 font-mono text-[11px] text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`git tag -a v1.0.0 -m "Release v1.0.0 TaskFlow - Projet Multi-Agents validé"
[OK] Version prête pour archivage ou déploiement.`}
              </pre>
            </div>
          )}
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
                question: "Quelle est la différence entre une version candidate et une version finale validée ?",
                options: [
                  "Une version candidate est prête à être examinée ; une version validée a fait l'objet d'une décision d'acceptation.",
                  "Une version candidate contient uniquement le frontend ; une version validée contient uniquement le backend.",
                  "Une version candidate est nécessairement publiée ; une version validée reste toujours locale.",
                  "Les deux expressions désignent obligatoirement le même état du projet."
                ],
                correctIndex: 0,
                explanation: "La Release Candidate est une version gelée soumise à examen. La version finale validée a reçu l'approbation formelle du Chef de Projet."
              },
              {
                id: 2,
                question: "Qui conserve la responsabilité de la décision finale d'acceptation de TaskFlow ?",
                options: [
                  "L'agent Backend.",
                  "L'agent QA.",
                  "Le Project Manager humain.",
                  "L'agent Reviewer."
                ],
                correctIndex: 2,
                explanation: "Le Chef de Projet humain conserve la responsabilité pleine et entière d'accepter ou de rejeter le projet logiciel."
              },
              {
                id: 3,
                question: "Pourquoi faut-il associer les résultats des tests à des preuves réelles ?",
                options: [
                  "Pour pouvoir distinguer les tests exécutés des tests prévus ou non exécutés.",
                  "Pour éviter de documenter les anomalies.",
                  "Pour remplacer la validation fonctionnelle par la compilation.",
                  "Pour autoriser automatiquement la publication."
                ],
                correctIndex: 0,
                explanation: "La traçabilité des preuves évite qu'un agent ne prétende qu'un test est au vert alors qu'il a été ignoré ou jamais lancé."
              },
              {
                id: 4,
                question: "Que doit contenir une livraison exploitable de TaskFlow ?",
                options: [
                  "Uniquement les fichiers source React.",
                  "Le code source, les configurations nécessaires, la documentation et les instructions d'utilisation.",
                  "Uniquement le rapport de QA.",
                  "Les fichiers source sans les fichiers de verrouillage ni les instructions."
                ],
                correctIndex: 1,
                explanation: "Une livraison complète fournit le code, les fichiers de verrouillage (package-lock.json), les configurations, les tests et le README d'exploitation."
              },
              {
                id: 5,
                question: "Quelle affirmation décrit correctement un commit Git ?",
                options: [
                  "Il prouve automatiquement que l'application est validée.",
                  "Il publie obligatoirement le projet sur un serveur distant.",
                  "Il enregistre un ensemble de modifications dans l'historique Git.",
                  "Il remplace les tests globaux."
                ],
                correctIndex: 2,
                explanation: "Un commit est un instantané local dans l'historique. Il ne préjuge ni de la validation par le client ni d'une publication réseau."
              },
              {
                id: 6,
                question: "Quels éléments sont importants dans la préparation d'une livraison ? (Sélectionnez la proposition exacte)",
                options: [
                  "Vérifier les instructions d'installation, documenter les limites connues et contrôler l'absence de secrets.",
                  "Déclarer tous les tests réussis sans consulter leurs résultats effectifs.",
                  "Supprimer le fichier package-lock.json avant l'envoi.",
                  "Effacer les tests pour alléger le dépôt."
                ],
                correctIndex: 0,
                explanation: "Une livraison soignée inclut un README fidèle, l'avertissement sur les limites (ex: stockage en mémoire volatile) et garantit l'absence de secrets ou de tokens."
              },
              {
                id: 7,
                question: "La validation du projet et sa publication sont deux décisions qui peuvent être prises séparément.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. Le Chef de Projet peut valider techniquement le code aujourd'hui et programmer la publication ou la livraison à une date ultérieure."
              },
              {
                id: 8,
                question: "Un agent peut effectuer un push sans autorisation dès lors que le Project Manager a accepté la qualité technique de son travail.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. Même après acceptation de la qualité technique, l'opération de git push requiert une autorisation explicite et formelle."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
