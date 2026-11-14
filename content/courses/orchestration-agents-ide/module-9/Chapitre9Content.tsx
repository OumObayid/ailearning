'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  // Simulateur interactif : Rétrospective d'Équipe & Arbre des 5 Pourquoi
  const [activeAnalysis, setActiveAnalysis] = useState<'api_desync' | 'late_qa' | 'scope_drift'>('api_desync');

  const retrospectiveCases = {
    api_desync: {
      problem: 'Le composant Frontend a dû être réécrit après la première tentative d\'intégration.',
      fiveWhys: [
        { level: '1. Pourquoi ?', answer: 'Le Frontend utilisait une route PATCH /tasks au lieu de /api/tasks/:id/status.' },
        { level: '2. Pourquoi ?', answer: 'L\'Agent Backend a modifié le chemin de la route pendant son développement.' },
        { level: '3. Pourquoi ?', answer: 'Le changement d\'URL n\'a pas été communiqué à l\'Agent Frontend.' },
        { level: '4. Pourquoi ?', answer: 'Aucun mécanisme de synchronisation ni canal de partage des contrats n\'était défini.' },
        { level: '5. Cause racine :', answer: 'Absence de règle organisationnelle imposant la formalisation et la validation préalable de tout contrat d\'API avant codage.' }
      ],
      improvementAction: 'Action corrective : Créer un fichier de spécification unique (docs/specs/api-contract.md) verrouillé par l\'Architecte. Tout changement de contrat doit faire l\'objet d\'une annonce officielle du Team Leader.',
      owner: 'Agent Architecte + Team Leader IA'
    },
    late_qa: {
      problem: 'Des anomalies bloquantes ont été découvertes tardivement lors de la recette finale.',
      fiveWhys: [
        { level: '1. Pourquoi ?', answer: 'Les tests d\'intégration n\'ont tourné qu\'au moment de la Pull Request finale.' },
        { level: '2. Pourquoi ?', answer: 'L\'Agent Backend n\'a exécuté que des tests unitaires isolés sur ses fonctions.' },
        { level: '3. Pourquoi ?', answer: 'La suite Supertest n\'était pas branchée dans les vérifications courantes de la branche.' },
        { level: '4. Pourquoi ?', answer: 'L\'Agent QA n\'a été sollicité qu\'en fin de mission, après l\'annonce de fin de tâche.' },
        { level: '5. Cause racine :', answer: 'Organisation séquentielle en silo plutôt qu\'une collaboration continue avec des points de contrôle intermédiaires.' }
      ],
      improvementAction: 'Action corrective : Introduire des tests QA dès l\'étape de cadrage (TDD assisté) et exécuter la suite d\'intégration avant chaque proposition de merge.',
      owner: 'Agent QA + Team Leader IA'
    },
    scope_drift: {
      problem: 'Un agent a modifié des fichiers de configuration hors de son périmètre assigné.',
      fiveWhys: [
        { level: '1. Pourquoi ?', answer: 'L\'agent a modifié database.ts alors qu\'il ne devait créer qu\'un contrôleur.' },
        { level: '2. Pourquoi ?', answer: 'L\'agent a pensé qu\'il devait adapter le pool de connexions pour sa route.' },
        { level: '3. Pourquoi ?', answer: 'Le prompt initial ne listait pas explicitement les fichiers autorisés.' },
        { level: '4. Pourquoi ?', answer: 'La consigne était formulée de manière trop vague : « Fais en sorte que l\'API gère les statuts ».' },
        { level: '5. Cause racine :', answer: 'Défaut de cadrage des missions dans les prompts d\'affectation sans liste blanche de confinement.' }
      ],
      improvementAction: 'Action corrective : Adopter un template de prompt obligatoire avec section "Fichiers modifiables autorisés" et "Interdictions formelles".',
      owner: 'Team Leader IA'
    }
  };

  const currentCase = retrospectiveCases[activeAnalysis];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400 shrink-0">
            Module 9 • Chapitre 9
          </span>
          <span className="text-xs text-muted-foreground">50 min de lecture & pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Évaluer le travail de l'équipe et améliorer son organisation
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          La livraison d'un projet n'est pas la fin de l'histoire : c'est le tremplin pour rendre votre équipe d'agents IA plus performante. Découvrez comment animer une rétrospective sans faux-semblants, remonter à la cause racine avec les 5 Pourquoi, écarter les indicateurs trompeurs (comme le nombre de lignes de code) et bâtir un plan d'amélioration continue.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & amélioration continue</p>
        <p className="text-sm leading-relaxed">
          Le bilan final et le plan d'amélioration préparés par le Team Leader constituent des <strong>propositions d'évolution organisationnelle</strong>. Les décisions structurelles (refonte de la charte <code>AGENTS.md</code>, redistribution des rôles, modification des permissions permanentes) doivent être arbitrées et validées par le <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Pourquoi évaluer l'équipe ? */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="activity" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>1. Les 3 niveaux d'évaluation et les critères objectifs</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Ne pas juger uniquement le résultat brut
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Un projet peut être livré avec succès tout en ayant masqué des frictions organisationnelles colossales (multiplication des allers-retours, relectures laborieuses, prompts flous). L'évaluation doit ausculter 3 niveaux indissociables :
            </p>
            <div className="grid grid-cols-1 gap-2.5 mt-1 text-xs">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
                <span className="font-bold text-blue-400">1. Niveau Individuel :</span>
                <p className="text-muted-foreground">Respect du périmètre assigné, typage strict, précision et vérifiabilité des comptes rendus fournis par chaque agent.</p>
              </div>

              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex flex-col gap-1">
                <span className="font-bold text-indigo-400">2. Niveau Collectif :</span>
                <p className="text-muted-foreground">Fluidité de la coordination entre Backend, Frontend et QA. Synchronisation des contrats et détection précoce des blocages.</p>
              </div>

              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex flex-col gap-1">
                <span className="font-bold text-purple-400">3. Niveau Organisationnel :</span>
                <p className="text-muted-foreground">Pertinence des règles définies dans <code>AGENTS.md</code>, efficacité des modèles de prompts et clarté des autorisations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Indicateurs fiables vs métriques trompeuses */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="bar-chart-2" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>2. Écarter les métriques d'illusion</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex flex-col gap-1">
              <span className="font-bold text-rose-400">❌ Indicateurs trompeurs (Métrique d'illusion)</span>
              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                <li><strong>Nombre de lignes de code :</strong> Un agent qui produit 500 lignes verbeuses et dupliquées est souvent moins efficace qu'un agent qui règle le problème en 15 lignes modulaires.</li>
                <li><strong>Nombre de messages échangés :</strong> Une inflation de messages traduit souvent un prompt initial flou et des allers-retours stériles.</li>
                <li><strong>Rapidité d'exécution brute :</strong> Terminer vite sans preuves d'exécution engendre des régressions massives.</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
              <span className="font-bold text-emerald-400">✅ Indicateurs fiables et actionnables</span>
              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                <li><strong>Taux de conformité du premier diff :</strong> Part des contributions acceptées en revue sans nécessiter de reprise majeure.</li>
                <li><strong>Traçabilité des preuves :</strong> Pourcentage de comptes rendus accompagnés des logs d'exécution réels de tests.</li>
                <li><strong>Absence de régressions post-merge :</strong> Zéro dégradation constatée sur les suites de non-régression.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>3. Atelier Interactif — Rétrospective d'Équipe & Méthode des 5 Pourquoi</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Plongez dans l'analyse causale d'un dysfonctionnement constaté lors du projet TaskFlow. Remontez de la conséquence visible jusqu'à la cause racine organisationnelle.
          </p>

          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setActiveAnalysis('api_desync')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                activeAnalysis === 'api_desync'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Cas 1 : Désynchronisation du contrat d'API entre Backend et Frontend
            </button>

            <button
              onClick={() => setActiveAnalysis('late_qa')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                activeAnalysis === 'late_qa'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Cas 2 : Découverte tardive d'anomalies lors de la recette finale
            </button>

            <button
              onClick={() => setActiveAnalysis('scope_drift')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                activeAnalysis === 'scope_drift'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Cas 3 : Dérive de périmètre sur les fichiers de configuration
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col gap-3 text-xs min-w-0 max-w-full">
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-1 min-w-0 max-w-full">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Problème observé en rétrospective :</span>
              <p className="text-rose-300 font-bold text-xs sm:text-sm mt-0.5 whitespace-normal break-words [overflow-wrap:anywhere]">{currentCase.problem}</p>
            </div>

            <div className="flex flex-col gap-2 font-mono text-xs min-w-0 max-w-full">
              {currentCase.fiveWhys.map((step, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black border border-slate-800 flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-2 min-w-0 max-w-full">
                  <span className="text-sky-400 font-bold text-xs shrink-0">{step.level}</span>
                  <span className="text-white text-xs leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word]">{step.answer}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 flex flex-col gap-1.5 min-w-0 max-w-full">
              <span className="font-bold text-emerald-400 text-xs sm:text-sm">Plan d'action adopté pour le prochain sprint :</span>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{currentCase.improvementAction}</p>
              <span className="text-xs text-slate-400 mt-1 font-medium">Responsable désigné : <strong className="text-white">{currentCase.owner}</strong></span>
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
          title="Évaluation des connaissances — Chapitre 9 : Évaluer le travail de l'équipe et s'améliorer"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal de l'évaluation d'une équipe d'agents IA après un projet ?",
              options: [
                "Identifier l'agent qui a produit le plus de code.",
                "Comprendre les résultats et améliorer le fonctionnement de l'équipe.",
                "Supprimer les agents qui ont demandé des corrections.",
                "Réduire systématiquement le nombre de vérifications."
              ],
              correctIndex: 1,
              explanation: "L'évaluation rétrospective vise à tirer des enseignements factuels pour affiner l'organisation et la coordination futures."
            },
            {
              id: 2,
              question: "Pourquoi les critères d'évaluation doivent-ils être adaptés aux rôles des agents ?",
              options: [
                "Parce que chaque agent doit utiliser des outils différents.",
                "Parce que les agents ne doivent jamais collaborer.",
                "Parce que les responsabilités et les livrables attendus varient selon les rôles.",
                "Parce que seuls les agents techniques doivent être évalués."
              ],
              correctIndex: 2,
              explanation: "Un Reviewer se juge sur la pertinence de ses audits, un Backend sur son API et un QA sur ses scénarios de test."
            },
            {
              id: 3,
              question: "Un agent produit un volume important de code, mais plusieurs fonctionnalités ne respectent pas les exigences. Quelle conclusion est la plus pertinente ?",
              options: [
                "Le volume de code ne suffit pas à démontrer la qualité du travail.",
                "Le volume de code prouve que la mission est réussie.",
                "Les critères d'acceptation doivent être supprimés.",
                "Le résultat doit être accepté si l'agent a terminé rapidement."
              ],
              correctIndex: 0,
              explanation: "La quantité brute de code produit est un indicateur trompeur qui ne préjuge ni de la conformité fonctionnelle ni de la maintenabilité."
            },
            {
              id: 4,
              question: "Quel est le rôle principal d'une rétrospective d'équipe ?",
              options: [
                "Refaire toutes les missions du projet.",
                "Remplacer les tests de qualité.",
                "Désigner un agent responsable de chaque difficulté.",
                "Analyser l'expérience collective pour identifier des améliorations."
              ],
              correctIndex: 3,
              explanation: "La rétrospective ausculte la collaboration passée pour dégager des axes d'amélioration concrets sans chercher de bouc émissaire."
            },
            {
              id: 5,
              question: "Dans une équipe TaskFlow, le Backend modifie un contrat API sans prévenir le Frontend. Quelle amélioration organisationnelle est la plus pertinente ?",
              options: [
                "Interdire toute modification du backend.",
                "Formaliser la communication et la validation des changements de contrat API.",
                "Demander au Frontend de deviner les modifications.",
                "Supprimer les tests d'intégration."
              ],
              correctIndex: 1,
              explanation: "La synchronisation formelle des contrats d'interface empêche les décalages de développement entre le client et le serveur."
            },
            {
              id: 6,
              question: "Quels éléments rendent une action d'amélioration exploitable et vérifiable ?",
              options: [
                "Une description précise du problème, un responsable désigné, un résultat attendu et une méthode de vérification.",
                "Une formulation générale sans échéance ni critère de suivi.",
                "L'absence totale de responsable.",
                "Une consigne orale informelle non documentée."
              ],
              correctIndex: 0,
              explanation: "Une action doit être mesurable, assignée à un porteur et assortie d'un critère clair de vérification d'impact."
            },
            {
              id: 7,
              question: "Quel indicateur permet le mieux d'examiner la fiabilité des comptes rendus d'un agent ?",
              options: [
                "Le nombre de messages envoyés.",
                "Le nombre de lignes de code modifiées.",
                "La présence de résultats vérifiables et la distinction entre actions réalisées et actions prévues.",
                "Le nombre de fichiers créés."
              ],
              correctIndex: 2,
              explanation: "La fiabilité repose sur l'apport de preuves matérielles (commandes, logs) et la sincérité quant aux limites rencontrées."
            },
            {
              id: 8,
              question: "Quel est le rôle du Team Leader après la rétrospective ?",
              options: [
                "Rassembler les observations, proposer des actions et en suivre l'avancement.",
                "Modifier seul les règles de sécurité du projet.",
                "Remplacer le Project Manager dans les décisions importantes.",
                "Déterminer seul les sanctions applicables aux agents."
              ],
              correctIndex: 0,
              explanation: "Le Team Leader structure le plan d'action, assure son suivi opérationnel et soumet les arbitrages majeurs au PM."
            },
            {
              id: 9,
              question: "Une difficulté rencontrée par un agent peut provenir d'un défaut d'organisation ou d'une mission insuffisamment définie, et pas uniquement de son exécution.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 0,
              explanation: "Vrai : une consigne floue ou une dépendance non anticipée est très souvent la cause racine d'une erreur d'agent."
            },
            {
              id: 10,
              question: "Lorsqu'un agent a fourni de bons résultats sur plusieurs missions, toutes les opérations sensibles peuvent lui être confiées sans autorisation supplémentaire.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : la confiance opérationnelle ne déroge jamais aux règles de sécurité. Les opérations sensibles restent soumises au PM."
            }
          ]}
        />
      </div>
    </div>
  );
};
