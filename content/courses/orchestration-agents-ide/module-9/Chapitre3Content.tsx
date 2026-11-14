'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur interactif : Cycle de Vie d'une Pull Request & Quality Gatekeeper
  const [prStage, setPrStage] = useState<'submitted' | 'under_review' | 'changes_requested' | 'approved' | 'merged'>('under_review');

  const stageData = {
    submitted: {
      label: '1. Soumise (Submitted)',
      badge: 'Soumise',
      color: 'blue',
      description: 'L\'Agent Backend a ouvert la PR #42 : "Ajout de la route PATCH /api/tasks/:id pour la mise à jour de statut".',
      details: 'La PR contient 3 commits, le diff de 3 fichiers et une description détaillée mentionnant la dépendance avec le frontend.',
      nextAction: 'Le Team Leader assigne formellement l\'Agent Reviewer et l\'Agent QA.'
    },
    under_review: {
      label: '2. En Revue (Under Review)',
      badge: 'En cours d\'audit',
      color: 'indigo',
      description: 'Les vérifications automatiques (CI) et statiques sont en cours d\'analyse.',
      details: 'CI (tsc, lint, vitest) : ✅ Passée à 100%. L\'Agent Reviewer inspecte le typage et l\'architecture. L\'Agent QA contrôle les cas limites.',
      nextAction: 'Le Reviewer détecte un problème bloquant : code HTTP 200 renvoyé sur un statut invalide au lieu de 400.'
    },
    changes_requested: {
      label: '3. Corrections Demandées (Changes Requested)',
      badge: 'Rejet temporaire',
      color: 'amber',
      description: 'L\'Agent Reviewer et le QA ont bloqué la PR avec une demande de correction précise.',
      details: 'Fiche d\'anomalie ANO-01 liée : refuser les chaînes non autorisées avec HTTP 400. Périmètre d\'action circonscrit à taskController.ts.',
      nextAction: 'L\'Agent Backend corrige le contrôleur, soumet un nouveau commit et demande une nouvelle passe d\'audit.'
    },
    approved: {
      label: '4. Approuvée Techniquement (Approved)',
      badge: 'Approuvée (Non fusionnée)',
      color: 'emerald',
      description: 'Toutes les réserves ont été levées. Le nouveau diff est conforme et validé par le QA.',
      details: 'La PR a satisfait l\'intégralité des critères d\'acceptation. ⚠️ ATTENTION : Approuvée ne signifie PAS fusionnée ! Aucun agent n\'a le droit de merger.',
      nextAction: 'Le Team Leader transmet la fiche de synthèse au Project Manager humain pour arbitrage souverain.'
    },
    merged: {
      label: '5. Fusionnée sur develop (Merged)',
      badge: 'Intégrée',
      color: 'purple',
      description: 'Le Project Manager humain a examiné le rapport et autorisé le merge sur develop.',
      details: 'La branche feature/backend-tasks est intégrée proprement sans écrasement d\'historique. La branche de travail peut être archivée.',
      nextAction: 'L\'équipe passe à l\'intégration de la branche dépendante feature/frontend-tasks.'
    }
  };

  const current = stageData[prStage];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400 shrink-0">
            Module 9 • Chapitre 3
          </span>
          <span className="text-xs text-muted-foreground">55 min de lecture & pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Organiser les demandes de fusion et les validations
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          La Pull Request (ou Merge Request) est le sas de sécurité central d'une équipe logicielle. Découvrez comment formaliser une demande de fusion exploitable, coordonner les revues techniques et fonctionnelles, gérer les demandes de correction et faire respecter le monopole souverain d'autorisation du Project Manager humain.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle fondamentale : "Approuvée" ne signifie pas "Fusionnée"</p>
        <p className="text-sm leading-relaxed">
          Une revue technique favorable et des tests QA au vert constituent une <strong>validation technique</strong>, mais ne valent en aucun cas autorisation automatique de fusion. Aucun agent d'IA ne peut déclencher le bouton "Merge" sans l'accord explicite et écrit du <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Qu'est-ce qu'une demande de fusion ? */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="git-pull-request" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>1. Le rôle et la structure d'une Pull Request</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Les 7 composantes d'une demande de fusion de qualité
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Une Pull Request ne doit jamais se résumer à un titre laconique tel que « Update Backend ». Elle doit comporter un dossier complet permettant aux reviewers d'évaluer la contribution sans ambiguïté :
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2.5 rounded bg-muted/40 border border-border">
                <strong className="text-foreground">1. Titre explicite :</strong> Résumé précis de la fonctionnalité apportée.
              </div>
              <div className="p-2.5 rounded bg-muted/40 border border-border">
                <strong className="text-foreground">2. Branches identifiées :</strong> Branche source (ex. <code>feature/backend-tasks</code>) et branche cible confirmée (ex. <code>develop</code>).
              </div>
              <div className="p-2.5 rounded bg-muted/40 border border-border">
                <strong className="text-foreground">3. Description du contexte :</strong> La mission traitée et le problème résolu.
              </div>
              <div className="p-2.5 rounded bg-muted/40 border border-border">
                <strong className="text-foreground">4. Synthèse des modifications :</strong> Nouveaux endpoints, modèles mis à jour, fichiers modifiés.
              </div>
              <div className="p-2.5 rounded bg-muted/40 border border-border">
                <strong className="text-foreground">5. Preuves des vérifications :</strong> Résultats bruts des tests Vitest et captures d'exécution.
              </div>
              <div className="p-2.5 rounded bg-muted/40 border border-border">
                <strong className="text-foreground">6. Dépendances techniques :</strong> Éléments requis pour que les autres agents (ex. Frontend) puissent enchaîner.
              </div>
              <div className="p-2.5 rounded bg-muted/40 border border-border">
                <strong className="text-foreground">7. Points de vigilance & limites :</strong> Risques résiduels connus ou contraintes temporaires.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Répartition des rôles dans la revue */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="users" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>2. Répartition stricte des rôles pendant la revue</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 flex flex-col gap-1">
            <span className="font-bold text-blue-400">Agent Reviewer &rarr; Relecture Statique</span>
            <p className="text-muted-foreground leading-relaxed">
              Inspecte la propreté du code, le respect des patrons d'architecture (contrôleur / service / store), le typage strict TypeScript (zéro <code>any</code>) et la gestion des exceptions.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col gap-1">
            <span className="font-bold text-emerald-400">Agent QA &rarr; Vérification Dynamique</span>
            <p className="text-muted-foreground leading-relaxed">
              Exécute les suites de tests automatisés, teste les cas aux limites (statuts invalides, requêtes mal formées) et contrôle l'absence de régressions sur les fonctionnalités existantes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 flex flex-col gap-1">
            <span className="font-bold text-purple-400">Team Leader IA &rarr; Coordination & Gatekeeper</span>
            <p className="text-muted-foreground leading-relaxed">
              Vérifie la recevabilité de la PR, affecte les examinateurs, suit la résolution des commentaires bloquants et prépare le dossier de synthèse.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex flex-col gap-1">
            <span className="font-bold text-amber-400">Project Manager humain &rarr; Souveraineté Décisionnelle</span>
            <p className="text-muted-foreground leading-relaxed">
              Arbitre les désaccords techniques, autorise les fusions sur les branches protégées et valide la livraison des lots.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Les états d'une Pull Request */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="check-square" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>3. Les 8 états d'une demande et les critères de blocage</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Pour fluidifier les échanges sans transiger sur la qualité, l'équipe distingue deux types de remarques :
          </p>
          <div className="grid grid-cols-1 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex flex-col gap-1">
              <span className="font-bold text-rose-400">Commentaire Bloquant (Blocker)</span>
              <p className="text-muted-foreground">
                Interdit toute approbation : faille de sécurité, rupture de contrat d'API, régression d'un test existant ou dérive de périmètre (scope creep). Exige un correctif obligatoire et une nouvelle revue.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
              <span className="font-bold text-blue-400">Amélioration Recommandée (Nitpick / Non-bloquant)</span>
              <p className="text-muted-foreground">
                Suggestion de lisibilité, factorisation cosmétique ou clarification de commentaire. N'empêche pas l'approbation technique si le délai presse.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>4. Atelier Interactif — Cycle de Vie d'une Pull Request Multi-Agents</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Parcourez les étapes successives d'une demande de fusion dans TaskFlow. Observez comment la gouvernance technique empêche l'intégration prématurée.
          </p>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {(['submitted', 'under_review', 'changes_requested', 'approved', 'merged'] as const).map((stage) => (
              <button
                key={stage}
                onClick={() => setPrStage(stage)}
                className={`py-2 px-3 text-center rounded font-semibold text-xs transition-all ${
                  prStage === stage
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-muted/40 text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {stageData[stage].label}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <span className="font-bold text-foreground text-sm">PR #42 — Backend Task Status Update</span>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                current.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                current.color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                current.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {current.badge}
              </span>
            </div>

            <p className="text-foreground font-medium">{current.description}</p>
            <div className="p-3 rounded bg-background border border-border text-muted-foreground leading-relaxed">
              {current.details}
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border text-xs text-muted-foreground font-sans">
              <strong className="text-foreground">Prochaine action requise :</strong> {current.nextAction}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 3 : Demandes de fusion et validations"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal d'une demande de fusion ?",
              options: [
                "Supprimer automatiquement les branches de développement.",
                "Proposer des modifications pour qu'elles soient examinées avant leur intégration.",
                "Remplacer les tests unitaires par une validation automatique.",
                "Garantir que tous les conflits Git sont résolus."
              ],
              correctIndex: 1,
              explanation: "Une demande de fusion rend les modifications visibles et organise leur examen préalable par les pairs avant toute incorporation au projet."
            },
            {
              id: 2,
              question: "Sur quelles informations repose une demande de fusion correctement préparée ?",
              options: [
                "Un titre et le nom de l'agent uniquement.",
                "Le nombre de commits et la date de création du dépôt uniquement.",
                "La description de la contribution, les branches concernées, les vérifications et les dépendances.",
                "Le résultat de la compilation uniquement."
              ],
              correctIndex: 2,
              explanation: "Une PR exploitable doit expliciter la mission, les branches source/cible, les modifications, les preuves de tests et les dépendances."
            },
            {
              id: 3,
              question: "Quelle est la responsabilité principale de l'agent Reviewer ?",
              options: [
                "Examiner la qualité et la cohérence technique des modifications.",
                "Autoriser toutes les opérations Git du projet.",
                "Remplacer l'agent QA dans les tests fonctionnels.",
                "Décider seul des fonctionnalités à développer."
              ],
              correctIndex: 0,
              explanation: "Le Reviewer examine la lisibilité, l'architecture, la sécurité et la conformité technique du diff Git."
            },
            {
              id: 4,
              question: "Quelle est la responsabilité principale de l'agent QA pendant l'examen d'une demande de fusion ?",
              options: [
                "Modifier directement la branche cible.",
                "Décider de la stratégie de branches du projet.",
                "Approuver automatiquement toute demande dont le code compile.",
                "Vérifier les comportements attendus et les résultats des tests."
              ],
              correctIndex: 3,
              explanation: "Le QA teste les scénarios dynamiques, vérifie les cas limites et s'assure de l'absence de régression."
            },
            {
              id: 5,
              question: "Une demande de fusion est approuvée. Que peut-on en déduire ?",
              options: [
                "Les modifications sont déjà présentes dans la branche cible.",
                "Les conditions d'approbation prévues ont été satisfaites, mais la fusion reste une opération distincte.",
                "Tous les tests possibles ont nécessairement été exécutés.",
                "La branche source doit obligatoirement être supprimée."
              ],
              correctIndex: 1,
              explanation: "L'approbation technique acte la conformité, mais l'acte de merge effectif reste une décision soumise aux autorisations de gouvernance."
            },
            {
              id: 6,
              question: "Un Reviewer signale un problème bloquant. Quelle démarche est appropriée ?",
              options: [
                "Fusionner immédiatement puis corriger sur la branche cible.",
                "Supprimer le commentaire pour éviter de retarder le projet.",
                "Demander une correction ou un arbitrage, puis réexaminer les changements concernés.",
                "Considérer que le problème est résolu dès que l'auteur répond."
              ],
              correctIndex: 2,
              explanation: "Un défaut bloquant doit être traité par l'auteur puis réaudité par le Reviewer avant toute validation."
            },
            {
              id: 7,
              question: "Quel est le rôle des validations automatiques dans une demande de fusion ?",
              options: [
                "Compléter les revues et fournir des résultats reproductibles sur les contrôles configurés.",
                "Garantir à elles seules la conformité fonctionnelle et architecturale.",
                "Remplacer toutes les décisions du Team Leader.",
                "Autoriser automatiquement la fusion dès que la compilation réussit."
              ],
              correctIndex: 0,
              explanation: "La CI garantit que le code compile, respecte les linters et passe les tests configurés, mais ne remplace pas l'audit architectural."
            },
            {
              id: 8,
              question: "Quelles informations doivent être prises en compte pour décider si une demande peut être proposée à l'intégration ?",
              options: [
                "Les résultats des vérifications QA, de la revue technique et les autorisations requises.",
                "Le fait que l'agent auteur souhaite terminer rapidement sa mission.",
                "Uniquement l'ancienneté de la branche.",
                "Le nombre de lignes de code ajoutées."
              ],
              correctIndex: 0,
              explanation: "La décision repose sur la triple validation : avis QA, avis Reviewer et conformité aux règles d'autorisation du projet."
            },
            {
              id: 9,
              question: "Une revue technique favorable constitue automatiquement une autorisation de fusion dans une branche protégée.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : une revue favorable est un constat de qualité technique. La fusion sur branche protégée requiert l'autorisation formelle du Project Manager humain."
            },
            {
              id: 10,
              question: "Après une correction demandée par un Reviewer, les modifications concernées doivent être réexaminées avant de considérer le problème comme résolu.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 0,
              explanation: "Vrai : la révision du nouveau commit est indispensable pour confirmer que le bug est résolu sans effets secondaires."
            }
          ]}
        />
      </div>
    </div>
  );
};
