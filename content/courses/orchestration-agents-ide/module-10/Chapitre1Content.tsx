'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  // Simulateur interactif : Matrice de Cadrage & Périmètre TaskFlow
  const [selectedFeature, setSelectedFeature] = useState<'create' | 'list' | 'update' | 'delete' | 'status' | 'counters'>('status');

  const featuresData = {
    create: {
      name: '1. Créer une tâche',
      scope: 'INCLUS (Périmètre MVP)',
      type: 'POST /api/tasks',
      description: 'L\'utilisateur renseigne un titre et une description obligatoires. L\'application génère un ID unique et attribue le statut initial "todo".',
      rules: 'Rejet strict des chaînes vides ou composées d\'espaces. Pas de choix arbitraire de statut à la création.'
    },
    list: {
      name: '2. Afficher les tâches',
      scope: 'INCLUS (Périmètre MVP)',
      type: 'GET /api/tasks',
      description: 'Présente la liste de toutes les tâches en mémoire avec titre, description et libellé de statut français (À faire, En cours, Terminée).',
      rules: 'Gestion obligatoire d\'un état vide clair lorsque la liste ne contient aucun élément.'
    },
    update: {
      name: '3. Modifier une tâche',
      scope: 'INCLUS (Périmètre MVP)',
      type: 'PUT /api/tasks/:id',
      description: 'Permet de mettre à jour le titre et la description d\'une tâche existante.',
      rules: 'L\'identifiant reste immuable. Cette opération ne modifie JAMAIS le statut de la tâche (séparation stricte).'
    },
    delete: {
      name: '4. Supprimer une tâche',
      scope: 'INCLUS (Périmètre MVP)',
      type: 'DELETE /api/tasks/:id',
      description: 'Retire définitivement la tâche du stockage en mémoire et met à jour les compteurs.',
      rules: 'Retourne HTTP 204 No Content. Doit rejeter un identifiant inconnu avec HTTP 404.'
    },
    status: {
      name: '5. Changer le statut d\'une tâche',
      scope: 'INCLUS (Périmètre MVP)',
      type: 'PATCH /api/tasks/:id/status',
      description: 'Fait évoluer le statut parmi les trois valeurs autorisées : "todo", "in_progress", "done".',
      rules: 'Rejet systématique de toute autre valeur (comme "pending" ou "completed") avec HTTP 400 Bad Request.'
    },
    counters: {
      name: '6. Compter les tâches par statut',
      scope: 'INCLUS (Périmètre MVP)',
      type: 'GET /api/tasks/counts',
      description: 'Fournit le décompte dynamique pour chaque statut : À faire, En cours, Terminées et Total.',
      rules: 'Un statut sans tâche affiche obligatoirement 0. La somme des 3 compteurs égale exactement le total.'
    }
  };

  const current = featuresData[selectedFeature];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 10 • Chapitre 1
          </span>
          <span className="text-xs text-muted-foreground">45 min de lecture & cadrage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Présenter le projet TaskFlow et définir son périmètre
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Bienvenue dans le grand projet fil rouge de la formation : construire <strong>TaskFlow</strong> de A à Z avec une équipe complète d'agents IA (Architect, Backend, Frontend, QA, Reviewer et Team Leader). Avant d'écrire la moindre ligne de code, posez les frontières intangibles du projet pour éviter la dispersion des agents.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & contrôle humain souverain</p>
        <p className="text-sm leading-relaxed">
          Pendant toute la réalisation de TaskFlow, <strong>aucun merge, rebase ou push ne doit être effectué sans autorisation explicite du Project Manager humain</strong>. L'équipe d'agents IA dispose d'une autonomie d'exécution opérationnelle dans ses branches de travail, mais le contrôle de l'intégration et de la livraison finale demeure strictement humain.
        </p>
      </Callout>

      {/* Section 1 : Présentation de TaskFlow */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>1. Présentation et les 6 fonctionnalités clés</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Qu'est-ce que TaskFlow ?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              TaskFlow est une application web moderne de gestion de tâches. Chaque tâche est définie par 4 propriétés immuables ou modifiables : un <strong>identifiant unique (id)</strong> généré automatiquement, un <strong>titre (title)</strong>, une <strong>description (description)</strong> et un <strong>statut (status)</strong>.
            </p>
            <div className="grid grid-cols-1 gap-2.5 mt-2 text-xs">
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">Les 3 statuts internes officiels :</span>
                <p className="text-muted-foreground font-mono">
                  todo ("À faire") • in_progress ("En cours") • done ("Terminée")
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Technologies & Frontières */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2. Stack technique et fonctionnalités exclues</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <span className="font-bold text-foreground text-sm">Stack technologique retenue :</span>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Frontend :</strong> React, Vite, TypeScript.</li>
              <li><strong>Backend :</strong> Node.js, Express, TypeScript.</li>
              <li><strong>Communication :</strong> API REST avec payloads JSON.</li>
              <li><strong>Stockage :</strong> En mémoire volatile (Map/Array) pour concentrer l'effort sur l'orchestration.</li>
              <li><strong>Tests :</strong> Vitest (moteur unitaire) et Supertest (validation des routes HTTP).</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 flex flex-col gap-2">
            <span className="font-bold text-rose-400 text-sm">Périmètre exclu (Non-Objectifs formels) :</span>
            <p className="text-muted-foreground leading-relaxed">
              Pour éviter la dérive de périmètre (scope creep) des agents, les éléments suivants sont formellement proscrits : pas d'authentification ni de gestion multi-comptes, pas de base de données SQL persistante, pas de notifications temps réel (WebSockets), pas d'upload de pièces jointes.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>3. Atelier Interactif — Explorateur des Spécifications Initiales</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sélectionnez l'une des 6 fonctionnalités fondamentales de TaskFlow pour examiner ses règles de gestion et son contrat d'interface.
          </p>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {(['create', 'list', 'update', 'delete', 'status', 'counters'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedFeature(key)}
                className={`py-1.5 px-3 rounded font-semibold transition-all ${
                  selectedFeature === key ? 'bg-emerald-600 text-white shadow' : 'bg-muted/40 text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {featuresData[key].name}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <span className="font-bold text-foreground font-mono">{current.name}</span>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                {current.type}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Comportement attendu :</span>
                <p className="text-foreground mt-0.5">{current.description}</p>
              </div>

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Règle de gestion impérative :</span>
                <p className="text-emerald-400 font-medium mt-0.5">{current.rules}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel du chapitre 1 */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Quiz d'évaluation — Chapitre 1</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 1 : Cadrage de TaskFlow"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal du projet TaskFlow dans cette formation ?",
              options: [
                "Développer une application complexe destinée à une commercialisation immédiate.",
                "Mettre en pratique l'orchestration d'une équipe d'agents IA.",
                "Apprendre exclusivement la programmation frontend.",
                "Remplacer toutes les interventions humaines par des agents autonomes."
              ],
              correctIndex: 1,
              explanation: "TaskFlow sert de support concret à l'apprentissage de l'orchestration multi-agents sous supervision humaine."
            },
            {
              id: 2,
              question: "Quel est le rôle de React dans TaskFlow ?",
              options: [
                "Gérer le stockage des tâches en mémoire.",
                "Exécuter les tests des routes HTTP.",
                "Construire l'interface utilisateur.",
                "Administrer le dépôt Git."
              ],
              correctIndex: 2,
              explanation: "React est la bibliothèque choisie pour concevoir les composants interactifs de l'interface utilisateur."
            },
            {
              id: 3,
              question: "Quelles sont les trois valeurs de statut prévues pour les tâches ?",
              options: [
                "todo, in_progress, done.",
                "created, started, deleted.",
                "pending, approved, rejected.",
                "open, closed, archived."
              ],
              correctIndex: 0,
              explanation: "Les trois statuts internes officiels du contrat de données sont todo, in_progress et done."
            },
            {
              id: 4,
              question: "Quelle solution de stockage est prévue pour TaskFlow ?",
              options: [
                "Une base de données relationnelle.",
                "Un service cloud externe.",
                "Des fichiers JSON persistants.",
                "Un stockage en mémoire."
              ],
              correctIndex: 3,
              explanation: "Les données sont stockées en mémoire volatile pour concentrer l'effort sur la dynamique de collaboration multi-agents."
            },
            {
              id: 5,
              question: "Quel est le rôle principal du Project Manager humain ?",
              options: [
                "Écrire personnellement tout le code de l'application.",
                "Prendre les décisions importantes et valider les opérations sensibles.",
                "Remplacer l'agent QA dans l'exécution des tests.",
                "Développer exclusivement les composants React."
              ],
              correctIndex: 1,
              explanation: "Le Project Manager humain conserve le monopole des décisions d'architecture, des arbitrages et des autorisations de merge/push."
            },
            {
              id: 6,
              question: "Quelle fonctionnalité appartient au périmètre initial de TaskFlow ?",
              options: [
                "La gestion de plusieurs comptes utilisateurs.",
                "L'envoi de notifications en temps réel.",
                "Le changement du statut d'une tâche.",
                "La collaboration simultanée entre plusieurs utilisateurs."
              ],
              correctIndex: 2,
              explanation: "Le changement de statut fait partie des 6 fonctionnalités clés, contrairement aux fonctionnalités avancées exclues du MVP."
            },
            {
              id: 7,
              question: "Pourquoi faut-il définir les limites du projet avant le développement ?",
              options: [
                "Pour permettre aux agents d'ajouter librement toutes les fonctionnalités.",
                "Pour éviter les développements inutiles et limiter la dispersion du travail.",
                "Pour supprimer la nécessité de tester l'application.",
                "Pour éviter de définir les responsabilités des agents."
              ],
              correctIndex: 1,
              explanation: "Cadrer rigoureusement les frontières évite la dérive de périmètre où les agents s'éparpillent sur des fonctionnalités superflues."
            },
            {
              id: 8,
              question: "Qui coordonne les agents et suit la progression de leurs missions ?",
              options: [
                "Le Team Leader IA.",
                "L'agent Frontend uniquement.",
                "L'agent Reviewer uniquement.",
                "L'agent Backend uniquement."
              ],
              correctIndex: 0,
              explanation: "Le Team Leader IA orchestre la distribution des tâches, le suivi des dépendances et la synthèse pour le PM."
            }
          ]}
        />
      </div>
    </div>
  );
};
