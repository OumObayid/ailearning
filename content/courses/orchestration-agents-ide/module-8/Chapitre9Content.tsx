'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  // Simulateur interactif : Comité de Recette & Décision de Validation
  const [selectedSubmission, setSelectedSubmission] = useState<'sub_complete' | 'sub_missing_proof' | 'sub_scope_creep'>('sub_complete');

  const submissions = {
    sub_complete: {
      id: 'LIV-01',
      title: 'Mise à jour du statut des tâches (Backend TaskFlow)',
      agent: 'Agent Backend + Agent QA + Agent Reviewer',
      branch: 'feature/task-status-update',
      proofs: {
        gitStatus: '2 fichiers modifiés, 1 fichier de test ajouté, 0 fichier temporaire',
        tests: '100% de succès sur Vitest (8/8 passants, 0 skipped, 0 failed)',
        typeCheck: 'npx tsc --noEmit : 0 erreur',
        reviewerVerdict: 'Avis Favorable sans réserve (typage strict respecté, gestion d\'erreur 400/404 conforme)'
      },
      missingElements: 'Aucun',
      decision: 'ACCEPTÉ (VALIDÉ)',
      decisionType: 'accepted',
      justification: 'Toutes les preuves factuelles sont réunies. Le contrat technique est scrupuleusement respecté. Le dossier est transmis au Project Manager humain pour intégration.'
    },
    sub_missing_proof: {
      id: 'LIV-02',
      title: 'Nouveau composant de sélection de statut (Frontend TaskFlow)',
      agent: 'Agent Frontend',
      branch: 'feature/task-status-dropdown',
      proofs: {
        gitStatus: '3 composants React modifiés',
        tests: '⚠️ Aucun test fourni ou exécuté. L\'agent affirme : « Le composant marche très bien sur mon écran »',
        typeCheck: 'Non exécuté',
        reviewerVerdict: 'Revue bloquée : absence de tests automatisés et de traces d\'exécution'
      },
      missingElements: 'Exécution des tests unitaires Frontend et validation TypeScript',
      decision: 'SUSPENDU (EN ATTENTE DE PREUVES)',
      decisionType: 'suspended',
      justification: 'Une parole d\'agent ne vaut pas preuve. La validation reste formellement suspendue jusqu\'à l\'apport des résultats d\'exécution Vitest/Testing-Library.'
    },
    sub_scope_creep: {
      id: 'LIV-03',
      title: 'Ajout de métadonnées utilisateur lors du PATCH de statut',
      agent: 'Agent Backend',
      branch: 'feature/patch-metadata',
      proofs: {
        gitStatus: '12 fichiers modifiés dont database.ts, authMiddleware.ts et schema.prisma',
        tests: '3 tests unitaires passants, 4 tests existants échoués (régressions)',
        typeCheck: '5 erreurs TS2322 sur des modèles Prisma non migrés',
        reviewerVerdict: 'Corrections demandées : Dérive de périmètre critique et régression d\'authentification'
      },
      missingElements: 'Respect du périmètre contractuel, non-régression, compilation saine',
      decision: 'REFUSÉ (REJETÉ)',
      decisionType: 'rejected',
      justification: 'Violation flagrante de la charte de confinement (scope creep) et régressions sur les tests existants. Rejeté immédiatement pour réalignement.'
    }
  };

  const currentSub = submissions[selectedSubmission];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 8 • Chapitre 9
          </span>
          <span className="text-xs text-muted-foreground">50 min de lecture & pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Valider les livrables avant leur intégration
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Terminer une tâche n'est pas la valider, et valider un livrable n'est pas l'intégrer. Découvrez la chaîne de décision formelle permettant de certifier la qualité d'une contribution : rassemblement des preuves factuelles, audit de la grille d'acceptation et arbitrage souverain du Project Manager.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & monopole de l'intégration</p>
        <p className="text-sm leading-relaxed">
          Un livrable validé n'autorise <strong>aucun agent</strong> à déclencher de manière autonome un <code>git merge</code>, <code>git rebase</code> ou <code>git push origin main</code>. L'intégration dans le tronc commun demeure sous la <strong>responsabilité exclusive du Project Manager humain</strong> afin de prévenir tout télescopage de branches et toute régression collective.
        </p>
      </Callout>

      {/* Section 1 : Les 5 états d'un livrable */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>1. Les 5 états du cycle de vie d'un livrable</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-muted text-foreground text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <h3 className="text-sm font-bold text-foreground">Réalisé (L'agent s'arrête d'écrire)</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              L'agent a achevé son prompt et affirme avoir fini. C'est un simple constat déclaratif : aucune vérification objective n'a encore été opérée.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <h3 className="text-sm font-bold text-foreground">Vérifié (Preuves d'exécution collectées)</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Des tests réels ont été exécutés par le QA et une relecture statique du diff a été opérée par le Reviewer. Les rapports bruts sont documentés.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <h3 className="text-sm font-bold text-foreground">Conforme (Respect intégral de la grille de recette)</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Les preuves recueillies démontrent que tous les critères d'acceptation du cahier des charges sont satisfaits sans dépassement de périmètre.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <h3 className="text-sm font-bold text-foreground">Validé (Décision formelle d'acceptation)</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              L'autorité compétente (Team Leader / Project Manager) acte officiellement que le travail est accepté et prêt pour fusion.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs font-bold flex items-center justify-center shrink-0">5</span>
              <h3 className="text-sm font-bold text-foreground">Intégré (Fusion effective dans la branche principale)</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Opération Git contrôlée incorporant la branche de fonctionnalité dans <code>main</code> ou <code>develop</code> avec tests post-merge.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 : Les 3 décisions du comité de recette */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2. Les 3 décisions possibles lors de la revue d'acceptation</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-slate-900 flex flex-col gap-2 min-w-0 max-w-full">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
              <span className="font-bold text-emerald-400 text-sm sm:text-base">1. ACCEPTÉ (Validé)</span>
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-700/60 shrink-0">Prêt pour fusion</span>
            </div>
            <p className="text-slate-200 leading-relaxed text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere]">
              Le livrable répond à 100% des critères : tests passants avec preuves de logs, compilation TypeScript sans warning bloquant, diff propre et revue favorable.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/40 bg-slate-900 flex flex-col gap-2 min-w-0 max-w-full">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
              <span className="font-bold text-amber-400 text-sm sm:text-base">2. SUSPENDU (En attente d'éléments)</span>
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-md bg-amber-950 text-amber-300 border border-amber-700/60 shrink-0">Compléments requis</span>
            </div>
            <p className="text-slate-200 leading-relaxed text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere]">
              Le code semble correct mais une preuve matérielle manque : suite de tests non exécutée, rapport QA incomplet, ou ambiguïté sur une dépendance externe.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-500/40 bg-slate-900 flex flex-col gap-2 min-w-0 max-w-full">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
              <span className="font-bold text-rose-400 text-sm sm:text-base">3. REFUSÉ (Rejeté)</span>
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-md bg-rose-950 text-rose-300 border border-rose-700/60 shrink-0">À retravailler</span>
            </div>
            <p className="text-slate-200 leading-relaxed text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere]">
              Présence d'anomalies majeures ou bloquantes, dérive de périmètre non autorisée, non-respect du contrat d'API ou régression sur les fonctionnalités existantes.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="file-text" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>3. Atelier Interactif — Comité de Validation & Recette Finale</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Examinez 3 dossiers de livrables soumis à la validation dans TaskFlow. Analysez les preuves techniques fournies et comprenez la décision d'arbitrage correspondante.
          </p>

          {/* Choix dossier */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setSelectedSubmission('sub_complete')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedSubmission === 'sub_complete'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Dossier LIV-01 : Route PATCH TaskFlow (Preuves complètes & diff propre)
            </button>

            <button
              onClick={() => setSelectedSubmission('sub_missing_proof')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedSubmission === 'sub_missing_proof'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Dossier LIV-02 : Composant Frontend (Tests non exécutés, parole d'agent)
            </button>

            <button
              onClick={() => setSelectedSubmission('sub_scope_creep')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedSubmission === 'sub_scope_creep'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Dossier LIV-03 : Refonte métadonnées (Scope creep & régressions)
            </button>
          </div>

          {/* Fiche d'audit du livrable */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <div>
                <span className="font-bold text-foreground">{currentSub.id} — {currentSub.title}</span>
                <p className="text-[11px] text-muted-foreground mt-0.5">Branche : <code>{currentSub.branch}</code> • Agent : {currentSub.agent}</p>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                currentSub.decisionType === 'accepted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                currentSub.decisionType === 'suspended' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {currentSub.decision}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Preuve Git (git status & diff) :</span>
                <span className="text-white font-medium">{currentSub.proofs.gitStatus}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Preuve d'exécution des tests (Vitest) :</span>
                <span className="text-white font-medium">{currentSub.proofs.tests}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Contrôle TypeScript (npx tsc) :</span>
                <span className="text-white font-medium">{currentSub.proofs.typeCheck}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Verdict du Reviewer :</span>
                <span className="text-white font-medium">{currentSub.proofs.reviewerVerdict}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black border border-slate-800 flex flex-col gap-1.5 min-w-0 max-w-full">
              <span className="text-slate-400 font-sans text-xs font-semibold">Motivation de la décision :</span>
              <p className="text-white leading-relaxed font-sans text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere]">
                {currentSub.justification}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 9 : Valider les livrables avant leur intégration"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal de la validation d'un livrable ?",
              options: [
                "Vérifier qu'un agent a terminé sa conversation.",
                "Déterminer si le résultat satisfait les critères d'acceptation.",
                "Fusionner automatiquement la branche de l'agent.",
                "Remplacer les tests automatisés."
              ],
              correctIndex: 1,
              explanation: "La validation vérifie formellement la conformité du travail produit par rapport aux critères d'acceptation contractuels."
            },
            {
              id: 2,
              question: "Un agent annonce que sa mission est terminée. Que peut-on en conclure ?",
              options: [
                "Le livrable est automatiquement validé.",
                "Le livrable peut être intégré immédiatement.",
                "Le travail est déclaré terminé par l'agent, mais doit encore être évalué.",
                "Les tests sont nécessairement réussis."
              ],
              correctIndex: 2,
              explanation: "La déclaration de fin de tâche de l'agent indique seulement qu'il s'est arrêté d'écrire. Le livrable doit être évalué sur preuves factuelles."
            },
            {
              id: 3,
              question: "Quelle différence existe entre validation et intégration ?",
              options: [
                "La validation examine l'acceptabilité ; l'intégration incorpore le livrable au projet commun.",
                "La validation fusionne une branche ; l'intégration exécute les tests.",
                "Les deux opérations désignent exactement la même action.",
                "L'intégration consiste uniquement à rédiger un rapport."
              ],
              correctIndex: 0,
              explanation: "La validation est une décision d'acceptation qualité ; l'intégration est l'opération technique de fusion dans la branche stable."
            },
            {
              id: 4,
              question: "Quel élément constitue une preuve réelle de réussite des tests ?",
              options: [
                "L'agent affirme que les tests devraient fonctionner.",
                "Le code contient plusieurs fichiers de tests.",
                "Le rapport indique que les tests sont prévus.",
                "Une exécution effective fournit un résultat vérifiable."
              ],
              correctIndex: 3,
              explanation: "Seul un journal d'exécution effectif avec le détail des assertions réussies constitue une preuve recevable."
            },
            {
              id: 5,
              question: "Quel est le rôle principal de l'agent QA ?",
              options: [
                "Décider seul de toutes les intégrations.",
                "Contrôler les comportements attendus et identifier les anomalies.",
                "Remplacer le Project Manager.",
                "Définir seul l'architecture du projet."
              ],
              correctIndex: 1,
              explanation: "L'agent QA s'assure du bon fonctionnement dynamique par les tests comportementaux et répertorie les anomalies."
            },
            {
              id: 6,
              question: "Quel est le rôle principal du Reviewer ?",
              options: [
                "Examiner la qualité technique et les risques liés au code.",
                "Garantir que tous les scénarios fonctionnels ont été testés.",
                "Fusionner automatiquement toutes les branches.",
                "Remplacer les tests d'intégration."
              ],
              correctIndex: 0,
              explanation: "Le Reviewer examine statiquement le diff Git, l'architecture, le typage strict et la sécurité du code produit."
            },
            {
              id: 7,
              question: "Les tests obligatoires n'ont pas été exécutés, mais le code semble correct. Quelle décision est la plus appropriée ?",
              options: [
                "Accepter définitivement le livrable.",
                "Considérer les tests comme réussis.",
                "Suspendre la validation en attendant les preuves nécessaires.",
                "Intégrer le livrable et vérifier plus tard."
              ],
              correctIndex: 2,
              explanation: "En l'absence de preuves matérielles obligatoires, la validation doit impérativement être suspendue."
            },
            {
              id: 8,
              question: "Quel est le rôle du Team Leader dans la validation ?",
              options: [
                "Réaliser seul tous les contrôles techniques.",
                "Coordonner les contrôles et préparer une proposition de décision.",
                "Remplacer systématiquement le Project Manager.",
                "Autoriser automatiquement les opérations Git."
              ],
              correctIndex: 1,
              explanation: "Le Team Leader rassemble les rapports du QA et du Reviewer, synthétise le dossier et formule une recommandation pour le PM."
            },
            {
              id: 9,
              question: "Deux agents ont terminé leurs missions séparément. Que faut-il vérifier avant l'intégration commune ?",
              options: [
                "Uniquement que les deux agents ont déclaré leur travail terminé.",
                "Uniquement que les deux branches existent.",
                "Que les deux agents utilisent le même éditeur.",
                "La compatibilité de leurs contributions et leurs dépendances."
              ],
              correctIndex: 3,
              explanation: "Il faut vérifier que les contributions sont compatibles et ne créent pas d'incohérences croisées avant de les fusionner ensemble."
            },
            {
              id: 10,
              question: "Un livrable est validé. Cela autorise-t-il automatiquement un agent à effectuer un merge ?",
              options: [
                "Oui, dans tous les cas.",
                "Oui, si les tests réussissent.",
                "Non, l'intégration doit respecter les autorisations du projet.",
                "Non, car un livrable validé ne peut jamais être intégré."
              ],
              correctIndex: 2,
              explanation: "La validation n'équivaut pas à une autorisation de merge sauvage. Seul le PM humain déclenche ou approuve la fusion finale."
            }
          ]}
        />
      </div>
    </div>
  );
};
