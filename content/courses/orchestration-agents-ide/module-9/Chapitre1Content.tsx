'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  // Simulateur interactif : Fusion Aveugle vs Intégration Contrôlée
  const [integrationMode, setIntegrationMode] = useState<'blind_merge' | 'controlled_integration'>('blind_merge');

  const simulationData = {
    blind_merge: {
      title: 'Scénario A : La Fusion Git Aveugle (Succès Git, Échec Fonctionnel)',
      gitStatus: 'Auto-merging src/app.ts\nMerge made by the "ort" strategy.\n0 CONFLICTS DETECTED.',
      backendBehavior: 'Backend attend le champ "status" avec les valeurs : "todo" | "in_progress" | "done"',
      frontendBehavior: 'Frontend envoie le champ "task_status" avec la valeur : "completed"',
      resultStatus: '🛑 ÉCHEC FONCTIONNEL SILENCIEUX',
      resultDetails: 'Git a réuni les deux branches sans le moindre conflit de texte car les deux agents ont modifié des fichiers distincts (routes backend vs formulaires frontend). Cependant, à l\'exécution, l\'API répond HTTP 400 ou ignore la mise à jour : l\'interface utilisateur est cassée en production.',
      verdict: 'Un merge réussi ne garantit en rien la compatibilité fonctionnelle de deux briques conçues séparément.'
    },
    controlled_integration: {
      title: 'Scénario B : L\'Intégration Contrôlée TaskFlow (Processus en 6 Étapes)',
      gitStatus: 'Revue préalable des contrats &rarr; Détection du décalage de nommage &rarr; Harmonisation &rarr; Fusion autorisée par le PM',
      backendBehavior: 'Contrat d\'API partagé : PATCH /api/tasks/:id avec {"status": "in_progress"}',
      frontendBehavior: 'Client HTTP aligné sur le contrat : transmet {"status": "in_progress"}',
      resultStatus: '✅ INTÉGRATION VALIDÉE ET FONCTIONNELLE',
      resultDetails: 'Le Team Leader et l\'agent Reviewer ont détecté l\'incohérence avant la fusion. Après alignement contractuel et passage des tests d\'intégration avec Supertest et Vitest, le Project Manager humain a approuvé la fusion sur develop.',
      verdict: 'L\'intégration est une démarche globale de qualité technique, d\'alignement et de vérification continue.'
    }
  };

  const currentSim = simulationData[integrationMode];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400 shrink-0">
            Module 9 • Chapitre 1
          </span>
          <span className="text-xs text-muted-foreground">50 min de lecture & pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Comprendre le processus d'intégration
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Dans une équipe multi-agents, chaque IA travaille sur sa propre branche : backend, frontend, tests QA ou documentation. Réunir ces contributions ne se résume pas à lancer une commande Git. Découvrez pourquoi l'intégration est un processus méthodique de consolidation, les risques d'incompatibilités invisibles et la chaîne de responsabilités indispensables.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & monopole de l'intégration</p>
        <p className="text-sm leading-relaxed">
          La fusion de branches (<code>git merge</code>, <code>git rebase</code>) sur la branche principale ou commune ne doit <strong>jamais être exécutée de manière autonome par un agent</strong>. L'autorisation d'intégration relève de la compétence souveraine du <strong>Project Manager humain</strong>, sur proposition documentée du Team Leader IA.
        </p>
      </Callout>

      {/* Section 1 : Qu'est-ce que l'intégration ? */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="git-merge" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>1. Définition : Fusion Git vs Intégration Logicielle</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Ne pas confondre l'outil Git et la démarche d'intégration
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La <strong>fusion Git (merge)</strong> est une opération purement mécanique : elle compare deux historiques de commits et assemble des lignes de texte dans les fichiers. Si deux agents ont modifié des fichiers différents, Git fusionne sans broncher avec zéro conflit textuel.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L'<strong>intégration</strong> est une démarche d'ingénierie logicielle beaucoup plus vaste : elle s'assure que les composants créés séparément dialoguent correctement, partagent les mêmes schémas de données, respectent l'architecture et n'introduisent aucune régression fonctionnelle.
            </p>

            <div className="grid grid-cols-1 gap-2.5 mt-2 text-xs">
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">Préparation :</span>
                <p className="text-muted-foreground">Examiner les branches sources, leurs commits et leurs dépendances techniques mutuelles.</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">Fusion Git :</span>
                <p className="text-muted-foreground">Opération technique réunissant les arborescences de fichiers.</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">Résolution des conflits :</span>
                <p className="text-muted-foreground">Arbitrage des modifications concurrentes incompatibles.</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">Vérification post-intégration :</span>
                <p className="text-muted-foreground">Exécution des suites de tests unitaires, d'intégration et de non-régression.</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">Validation finale :</span>
                <p className="text-muted-foreground">Acceptation de la version commune par le Project Manager humain.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Les contributions et le rôle des branches */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>2. Les contributions et la topologie des branches</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">Pourquoi isoler les agents sur des branches dédiées ?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Si tous les agents travaillaient en direct sur la branche commune (<code>main</code> ou <code>develop</code>), le dépôt deviendrait immédiatement instable :
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-2">
              <li>Impossibilité de savoir quel agent a introduit un bug ou une régression.</li>
              <li>Télescopage des commits à chaque instant, bloquant la compilation pour toute l'équipe.</li>
              <li>Perte de la capacité à annuler proprement une seule fonctionnalité défectueuse.</li>
            </ul>

            <div className="mt-3 p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs text-white leading-relaxed min-w-0 max-w-full">
              <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
                <span className="text-emerald-400 font-bold">main</span> <span className="text-slate-400">(Branche de référence protégée)</span>{'\n'}
                {' ├── '}<span className="text-sky-300 font-semibold">feature/backend-task-status</span> <span className="text-slate-300">(Agent Backend : API REST & contrôleurs)</span>{'\n'}
                {' ├── '}<span className="text-purple-300 font-semibold">feature/frontend-task-status</span> <span className="text-slate-300">(Agent Frontend : Menus & cartes React)</span>{'\n'}
                {' └── '}<span className="text-amber-300 font-semibold">test/task-status-tests</span> <span className="text-slate-300">(Agent QA : Suites Vitest & scénarios Supertest)</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Une branche isole le travail jusqu'à ce que la preuve factuelle de conformité soit apportée par le QA et le Reviewer.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Les grandes étapes d'une intégration contrôlée */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="list" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>3. Les 6 étapes du processus d'intégration contrôlée</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <span className="text-sm font-bold text-foreground">Identifier les contributions</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Recenser les branches à intégrer, leurs auteurs, les fichiers touchés et les dépendances techniques croisées.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <span className="text-sm font-bold text-foreground">Vérifier la préparation préalable</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Contrôler que chaque livrable a reçu un avis favorable du QA et du Reviewer. Aucune contribution non vérifiée n'est acceptée.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <span className="text-sm font-bold text-foreground">Déterminer l'ordre d'intégration</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ordonner les fusions selon les dépendances réelles (ex: intégrer le contrat d'API backend avant d'intégrer le composant client frontend).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <span className="text-sm font-bold text-foreground">Organiser les opérations Git de fusion</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Soumettre la demande de fusion (PR/MR), obtenir l'accord du Project Manager et résoudre méthodiquement les éventuels conflits.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold flex items-center justify-center shrink-0">5</span>
              <span className="text-sm font-bold text-foreground">Vérifier le résultat assemblé</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Lancer la compilation globale (<code>tsc</code>), le linter et l'ensemble de la suite de tests unitaires, d'intégration et de non-régression.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold flex items-center justify-center shrink-0">6</span>
              <span className="text-sm font-bold text-foreground">Valider la version commune</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Le Project Manager humain examine le bilan d'intégration et acte formellement la conformité de la nouvelle version consolidée.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>4. Atelier Interactif — Fusion Aveugle vs Intégration Contrôlée</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Comparez les deux approches face à deux branches développées en parallèle dans TaskFlow : l'agent Backend et l'agent Frontend ont utilisé des conventions divergentes pour le champ de statut.
          </p>

          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-muted/40 border border-border">
            <button
              onClick={() => setIntegrationMode('blind_merge')}
              className={`flex-1 py-2 px-3 rounded text-xs font-bold transition-all ${
                integrationMode === 'blind_merge'
                  ? 'bg-rose-500 text-white shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              1. Fusion Git Aveugle (merge direct)
            </button>
            <button
              onClick={() => setIntegrationMode('controlled_integration')}
              className={`flex-1 py-2 px-3 rounded text-xs font-bold transition-all ${
                integrationMode === 'controlled_integration'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              2. Intégration Contrôlée (TaskFlow Gate)
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col gap-3 text-xs min-w-0 max-w-full">
            <span className="font-bold text-white text-sm">{currentSim.title}</span>

            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 rounded-lg bg-black border border-slate-800 flex flex-col gap-1 min-w-0 max-w-full">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">État Git rapporté :</span>
                <div className="font-mono text-xs text-white whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
                  {currentSim.gitStatus}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-0.5 min-w-0 max-w-full">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Attente Backend :</span>
                <span className="text-white font-mono text-xs break-words [overflow-wrap:anywhere]">{currentSim.backendBehavior}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-0.5 min-w-0 max-w-full">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Comportement Frontend :</span>
                <span className="text-white font-mono text-xs break-words [overflow-wrap:anywhere]">{currentSim.frontendBehavior}</span>
              </div>
            </div>

            <div className={`p-3.5 rounded-lg border flex flex-col gap-1.5 min-w-0 max-w-full ${
              integrationMode === 'blind_merge' ? 'bg-rose-950/60 border-rose-800/60' : 'bg-emerald-950/60 border-emerald-800/60'
            }`}>
              <span className={`font-bold text-xs sm:text-sm ${integrationMode === 'blind_merge' ? 'text-rose-300' : 'text-emerald-300'}`}>
                {currentSim.resultStatus}
              </span>
              <p className="text-slate-200 leading-relaxed text-xs whitespace-normal break-words [overflow-wrap:anywhere]">{currentSim.resultDetails}</p>
              <p className="text-xs font-semibold text-white mt-1 break-words [overflow-wrap:anywhere]">💡 {currentSim.verdict}</p>
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
          title="Évaluation des connaissances — Chapitre 1 : Le processus d'intégration"
          questions={[
            {
              id: 1,
              question: "Qu'est-ce que l'intégration dans un projet multi-agents ?",
              options: [
                "La création d'une branche pour chaque agent.",
                "La réunion des contributions dans une version commune du projet.",
                "La suppression des branches terminées.",
                "Le lancement automatique de tous les tests."
              ],
              correctIndex: 1,
              explanation: "L'intégration consiste à rassembler les contributions indépendantes pour forger une version commune tout en validant leur compatibilité."
            },
            {
              id: 2,
              question: "Quelle différence existe entre un merge et une intégration ?",
              options: [
                "Le merge est une opération Git ; l'intégration est une démarche plus large.",
                "Le merge vérifie le fonctionnement de l'application ; l'intégration modifie uniquement les commits.",
                "Les deux notions désignent exactement la même opération.",
                "L'intégration consiste uniquement à résoudre les conflits."
              ],
              correctIndex: 0,
              explanation: "Le merge réunit techniquement deux branches ; l'intégration englobe la préparation, la revue, la résolution, les tests et la validation."
            },
            {
              id: 3,
              question: "Deux branches sont fusionnées sans conflit. Que peut-on conclure ?",
              options: [
                "Toutes les fonctionnalités sont nécessairement compatibles.",
                "Tous les tests sont réussis.",
                "Git a pu réunir les modifications sans conflit bloquant, mais le résultat doit encore être vérifié.",
                "Le projet est prêt à être livré."
              ],
              correctIndex: 2,
              explanation: "L'absence de conflit Git atteste uniquement qu'aucune ligne de code identique n'a été modifiée de façon contradictoire, pas que la logique est compatible."
            },
            {
              id: 4,
              question: "Pourquoi utiliser des branches séparées pour les agents ?",
              options: [
                "Pour empêcher toute modification du code.",
                "Pour éviter définitivement tous les conflits.",
                "Pour supprimer la nécessité des revues.",
                "Pour isoler les contributions et contrôler leur réunion."
              ],
              correctIndex: 3,
              explanation: "Les branches isolent l'espace de développement de chaque agent et permettent d'examiner et de tester le lot avant son incorporation dans le tronc commun."
            },
            {
              id: 5,
              question: "Deux agents ont développé séparément des composants qui utilisent des formats de données différents. Quel risque existe ?",
              options: [
                "Une incompatibilité fonctionnelle après intégration.",
                "Une suppression automatique des commits.",
                "Une conversion automatique des données par Git.",
                "Une impossibilité systématique de fusionner les branches."
              ],
              correctIndex: 0,
              explanation: "Git fusionnera les fichiers sans erreur, mais l'incohérence de format provoquera un crash ou un rejet de payload lors des échanges réels."
            },
            {
              id: 6,
              question: "Pourquoi faut-il vérifier une version après intégration ?",
              options: [
                "Pour remplacer les rapports des agents.",
                "Pour détecter les problèmes liés à la combinaison des contributions et les régressions.",
                "Pour supprimer tous les tests unitaires.",
                "Pour éviter d'examiner les modifications Git."
              ],
              correctIndex: 1,
              explanation: "La réunion de deux composants sains isolément peut révéler des effets de bord imprévus ou des ruptures de contrat invisibles en développement unitaire."
            },
            {
              id: 7,
              question: "Quel est le rôle principal du Team Leader pendant l'intégration ?",
              options: [
                "Décider seul de toutes les opérations sensibles.",
                "Remplacer les agents Backend et Frontend.",
                "Coordonner les contributions, les dépendances et les vérifications.",
                "Garantir automatiquement l'absence de conflits."
              ],
              correctIndex: 2,
              explanation: "Le Team Leader orchestre l'ordonnancement des lots, supervise les vérifications QA et consolide le dossier pour le Project Manager."
            },
            {
              id: 8,
              question: "Quel acteur conserve la responsabilité des décisions importantes et des autorisations sensibles ?",
              options: [
                "L'agent QA.",
                "L'agent Reviewer.",
                "L'agent Backend.",
                "Le Project Manager humain."
              ],
              correctIndex: 3,
              explanation: "Le Project Manager humain conserve le pouvoir souverain pour autoriser les fusions, arbitrages critiques et publications."
            },
            {
              id: 9,
              question: "Une contribution validée individuellement peut-elle provoquer une régression après son intégration avec une autre contribution ?",
              options: [
                "Non, car la validation individuelle garantit toutes les compatibilités.",
                "Oui, car la combinaison des modifications peut introduire de nouveaux problèmes.",
                "Non, si les deux branches ont été fusionnées sans conflit.",
                "Oui, uniquement lorsque Git signale un conflit."
              ],
              correctIndex: 1,
              explanation: "Des briques fonctionnelles prises isolément peuvent entrer en collision lors de leur cohabitation dans un même flux de données applicatif."
            },
            {
              id: 10,
              question: "Quelle affirmation décrit correctement la relation entre intégration et livraison ?",
              options: [
                "Dès que les branches sont fusionnées, le projet est livré.",
                "L'intégration remplace toutes les vérifications finales.",
                "L'intégration construit une version commune ; la livraison nécessite encore des étapes de finalisation.",
                "La livraison doit toujours précéder l'intégration."
              ],
              correctIndex: 2,
              explanation: "L'intégration produit la base de code commune consolidée ; la livraison requiert ensuite la recette finale, la release note et le packaging."
            }
          ]}
        />
      </div>
    </div>
  );
};
