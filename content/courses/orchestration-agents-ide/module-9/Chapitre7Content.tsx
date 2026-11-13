'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // Simulateur interactif : Détecteur de Risques d'Autonomie & Procédure de Réaction
  const [selectedIncident, setSelectedIncident] = useState<'scope_creep' | 'accidental_delete' | 'unauthorized_api_change'>('scope_creep');

  const incidents = {
    scope_creep: {
      id: 'INC-01',
      title: 'Initiative non prévue : Refonte non demandée du schéma de données',
      trigger: 'L\'Agent Backend devait juste ajouter un champ "status". Constatant que l\'architecture pouvait être améliorée, il a renommé 5 colonnes et ajouté une bibliothèque tierce non validée.',
      impact: 'Élevé : Casse immédiatement le frontend et les 12 tests d\'intégration existants.',
      reversibility: 'Moyenne (nécessite un git checkout sur les fichiers non assignés).',
      level: 'Niveau 3 outrepassé (Transformation d\'autonomie opérationnelle en autorité décisionnelle).',
      reactionProcedure: [
        '1. Suspendre immédiatement la mission de l\'agent Backend.',
        '2. Lancer un git diff pour identifier la liste exacte des fichiers hors périmètre.',
        '3. Rétablir la version d\'origine des fichiers non concernés via git checkout origin/develop -- <file>.',
        '4. Recadrer le prompt de mission avec une liste blanche stricte de fichiers.'
      ]
    },
    accidental_delete: {
      id: 'INC-02',
      title: 'Action destructrice : Suppression d\'un module utilitaire partagé',
      trigger: 'Pensant nettoyer un fichier temporaire, un agent a exécuté une commande de suppression sur src/utils/dateFormatter.ts utilisé par l\'ensemble des modules.',
      impact: 'Critique : Empêche toute compilation TypeScript sur l\'ensemble du projet.',
      reversibility: 'Élevée si le fichier était suivi dans Git (git restore) ; Faible si le fichier venait d\'être créé sans commit.',
      level: 'Violation du périmètre opérationnel.',
      reactionProcedure: [
        '1. Arrêter les commandes terminal de l\'agent.',
        '2. Vérifier l\'historique Git avec git status et git log.',
        '3. Restaurer le fichier via git restore src/utils/dateFormatter.ts.',
        '4. Restreindre les permissions d\'exécution de commandes shell destructrices.'
      ]
    },
    unauthorized_api_change: {
      id: 'INC-03',
      title: 'Rupture de contrat : Remplacement unilatéral de méthode HTTP',
      trigger: 'L\'agent Frontend décide d\'appeler PUT au lieu de PATCH pour mettre à jour le statut, sans concertation avec le Backend.',
      impact: 'Majeur : Échec silencieux ou rejet 404/405 en production.',
      reversibility: 'Élevée (alignement du code Frontend sur le contrat validé).',
      level: 'Défaut de coordination inter-agents.',
      reactionProcedure: [
        '1. Rappeler à l\'agent Frontend la spécification officielle du contrat (docs/specs/api-contract.md).',
        '2. Exiger le rétablissement de la méthode PATCH conformément au contrat.',
        '3. Relancer la suite de tests Supertest QA-02 pour certifier l\'harmonisation.'
      ]
    }
  };

  const currentInc = incidents[selectedIncident];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400 shrink-0">
            Module 9 • Chapitre 7
          </span>
          <span className="text-xs text-muted-foreground">55 min de lecture & pratique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Identifier les risques liés au travail autonome des agents
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          L'autonomie permet aux agents d'IA d'enchaîner des actions complexes sans solliciter l'humain à chaque clic. Mais mal encadrée, cette autonomie génère des dérives sévères : modifications hors périmètre, fausses hypothèses érigées en certitudes et destructions accidentelles. Apprenez à graduer l'autonomie et à poser des points de contrôle infranchissables.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & distinction des autonomies</p>
        <p className="text-sm leading-relaxed">
          Il ne faut jamais confondre <strong>autonomie opérationnelle</strong> (la liberté d'organiser ses étapes pour résoudre un problème dans son périmètre) et <strong>autorité décisionnelle</strong> (le pouvoir de changer les règles, les contrats ou l'architecture). L'autorité décisionnelle demeure sous le contrôle exclusif du <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Les 6 catégories de risques */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="alert-octagon" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.7.1 & 9.7.2 — Les 6 grandes familles de risques du travail autonome</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-foreground">1. Risques de compréhension :</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              L'agent interprète de travers une exigence floue, considère une suggestion optionnelle comme impérative ou oublie une contrainte majeure mentionnée plus tôt.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-foreground">2. Risques techniques :</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Introduction de régressions invisibles, ajout de dépendances lourdes ou obsolètes, typage laxiste avec <code>any</code> et contournement des linters.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-foreground">3. Risques opérationnels & destructifs :</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Exécution de commandes shell dangereuses (<code>rm -rf</code>, <code>git reset --hard</code>), écrasement de modifications d'un collègue agent.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-foreground">4. Risques d'initiatives non prévues (Scope Creep) :</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              L'agent « prend des libertés » et commence à refactoriser des fichiers qu'on ne lui a jamais demandé de toucher.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-foreground">5. Risques de coordination :</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Deux agents travaillent en parallèle sur des hypothèses divergentes (ex: noms de propriétés différents dans un JSON).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-foreground">6. Risques d'information trompeuse :</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              L'agent présente une hypothèse non testée comme un fait avéré dans son compte rendu (« Tous les tests fonctionnent » sans les avoir lancés).
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 : Les 4 niveaux d'autonomie et points de contrôle */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.7.5 — La graduation des 4 niveaux d'autonomie</span>
        </h2>
        <div className="grid grid-cols-1 gap-2.5 text-xs">
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
            <span className="font-bold text-blue-400">Niveau 1 — Assistance Pura</span>
            <p className="text-muted-foreground">L'agent analyse et propose des plans, mais ne modifie aucun fichier directement (ex. rôle d'Architecte conseil).</p>
          </div>

          <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex flex-col gap-1">
            <span className="font-bold text-indigo-400">Niveau 2 — Exécution Encadrée</span>
            <p className="text-muted-foreground">L'agent modifie du code pas à pas, avec validation humaine obligatoire avant chaque commit ou étape clé.</p>
          </div>

          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex flex-col gap-1">
            <span className="font-bold text-purple-400">Niveau 3 — Autonomie Opérationnelle Limitée (Standard TaskFlow)</span>
            <p className="text-muted-foreground">L'agent enchaîne ses tâches dans son périmètre strict (branche dédiée), lance ses tests et corrige ses bugs. Interdiction de toucher aux contrats partagés sans accord.</p>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
            <span className="font-bold text-emerald-400">Niveau 4 — Autonomie Étendue sous Supervision</span>
            <p className="text-muted-foreground">Réservé au Team Leader IA pour orchestrer plusieurs missions et préparer les dossiers de recette. Reste bridé par le monopole humain de merge.</p>
          </div>
        </div>
      </div>

      {/* Section 3 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Atelier Interactif — Diagnostic d'Incident & Procédure de Réaction</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Examinez 3 dérives d'autonomie courantes survenues dans une équipe d'agents IA. Analysez leur impact et découvrez la procédure de réaction chirurgicale.
          </p>

          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setSelectedIncident('scope_creep')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedIncident === 'scope_creep'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              INC-01 : Dérive de périmètre (Refactorisation non autorisée)
            </button>

            <button
              onClick={() => setSelectedIncident('accidental_delete')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedIncident === 'accidental_delete'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              INC-02 : Action destructrice (Suppression de fichier utilitaire)
            </button>

            <button
              onClick={() => setSelectedIncident('unauthorized_api_change')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedIncident === 'unauthorized_api_change'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              INC-03 : Rupture de contrat unilatérale (PUT au lieu de PATCH)
            </button>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <span className="font-bold text-foreground font-mono">{currentInc.id} — {currentInc.title}</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">Incident</span>
            </div>

            <div className="p-2.5 rounded bg-background border border-border">
              <span className="text-[10px] text-muted-foreground font-semibold">Déclencheur observé :</span>
              <p className="text-foreground mt-0.5">{currentInc.trigger}</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Impact applicatif :</span>
                <p className="text-rose-400 font-medium mt-0.5">{currentInc.impact}</p>
              </div>
              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Réversibilité & Diagnostic :</span>
                <p className="text-muted-foreground mt-0.5">{currentInc.reversibility} — {currentInc.level}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex flex-col gap-1 text-xs">
              <span className="font-bold text-indigo-400">Protocole de remédiation immédiate :</span>
              <div className="space-y-1 text-foreground font-mono text-[11px] mt-1">
                {currentInc.reactionProcedure.map((step, i) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.7.12 — Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 7 : Risques liés au travail autonome"
          questions={[
            {
              id: 1,
              question: "Que signifie l'autonomie opérationnelle d'un agent IA ?",
              options: [
                "Le droit de modifier toutes les décisions du projet.",
                "La capacité d'organiser et d'exécuter plusieurs étapes dans le cadre d'une mission définie.",
                "L'absence de toute supervision humaine.",
                "Le pouvoir de modifier librement les permissions des autres agents."
              ],
              correctIndex: 1,
              explanation: "L'autonomie opérationnelle permet à l'agent de résoudre une tâche dans son périmètre imparti sans validation à chaque ligne de code."
            },
            {
              id: 2,
              question: "Un agent Backend ajoute une fonctionnalité et décide également de modifier plusieurs contrats API non concernés par sa mission. Quel risque illustre principalement cette situation ?",
              options: [
                "Un problème de disponibilité du serveur.",
                "Un défaut de sauvegarde automatique.",
                "Une initiative qui dépasse le périmètre autorisé.",
                "Une erreur de compilation nécessairement détectée."
              ],
              correctIndex: 2,
              explanation: "Cette situation illustre la dérive de périmètre (scope creep) où l'agent modifie des éléments externes sans autorisation."
            },
            {
              id: 3,
              question: "Quels critères permettent notamment d'évaluer le risque d'une action autonome ?",
              options: [
                "Son impact, sa réversibilité et sa portée.",
                "La vitesse d'exécution et le nombre de fichiers ouverts uniquement.",
                "Le nombre de messages envoyés par l'agent.",
                "Le nombre de branches présentes dans le dépôt uniquement."
              ],
              correctIndex: 0,
              explanation: "L'impact (gravité), la réversibilité (facilité d'annulation) et la portée (étendue du système affecté) mesurent le risque objectif."
            },
            {
              id: 4,
              question: "Un agent souhaite modifier un contrat API partagé alors que sa mission ne prévoit pas cette modification. Quelle est la conduite appropriée ?",
              options: [
                "Autoriser automatiquement la modification.",
                "Demander à un autre agent de la réaliser sans coordination.",
                "Supprimer les tests associés au contrat.",
                "Présenter la proposition et attendre la décision prévue par l'équipe."
              ],
              correctIndex: 3,
              explanation: "Tout changement de contrat partagé impacte d'autres agents et doit être formellement validé avant modification."
            },
            {
              id: 5,
              question: "Quel est l'objectif principal d'un point de contrôle pendant une mission autonome ?",
              options: [
                "Interrompre systématiquement toutes les opérations.",
                "Examiner l'avancement et vérifier les décisions importantes avant de poursuivre.",
                "Remplacer tous les tests automatisés.",
                "Donner à l'agent des permissions supplémentaires."
              ],
              correctIndex: 1,
              explanation: "Un point de contrôle permet d'intercepter les erreurs ou dérives avant qu'elles ne se propagent au reste du projet."
            },
            {
              id: 6,
              question: "Quelles informations doivent figurer dans une mission autonome bien définie ?",
              options: [
                "L'objectif attendu, le périmètre, les contraintes, les permissions et les critères d'acceptation.",
                "Uniquement un titre court.",
                "Une autorisation générale de tout modifier.",
                "Le mot de passe administrateur du serveur."
              ],
              correctIndex: 0,
              explanation: "Une mission claire borde rigoureusement ce que l'agent doit faire, ce qu'il ne doit pas toucher et la façon dont son travail sera jugé."
            },
            {
              id: 7,
              question: "Un agent a supprimé accidentellement des fichiers hors de sa mission. Quelle doit être la première démarche de supervision ?",
              options: [
                "Demander immédiatement une nouvelle fonctionnalité à l'agent.",
                "Supprimer toutes les branches du dépôt.",
                "Suspendre les opérations concernées et identifier précisément les actions réalisées.",
                "Considérer que Git pourra toujours restaurer automatiquement les fichiers."
              ],
              correctIndex: 2,
              explanation: "Il faut geler les opérations pour stopper les dégâts, identifier le périmètre endommagé et choisir la stratégie de restauration."
            },
            {
              id: 8,
              question: "Deux agents modifient simultanément le même contrat partagé et produisent des versions incompatibles. Quelle mesure préventive aurait été particulièrement utile ?",
              options: [
                "Une coordination préalable des responsabilités et des interfaces partagées.",
                "L'augmentation automatique des permissions des deux agents.",
                "La suppression de tous les tests.",
                "L'interdiction de toute communication entre agents."
              ],
              correctIndex: 0,
              explanation: "La synchronisation préalable des contrats empêche les agents de bifurquer sur des formats de données contradictoires."
            },
            {
              id: 9,
              question: "Un agent qui termine rapidement ses missions peut être considéré comme fiable sans examiner la qualité de ses livrables ni le respect de ses consignes.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : la rapidité n'est pas gage de qualité. Un agent rapide peut produire du code superficiel ou plein d'effets secondaires."
            },
            {
              id: 10,
              question: "Le niveau d'autonomie d'un agent peut être adapté au fil du projet en fonction de ses résultats et des risques observés.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 0,
              explanation: "Vrai : l'autonomie se calibre dynamiquement selon la fiabilité observée et la criticité des composants touchés."
            }
          ]}
        />
      </div>
    </div>
  );
};
