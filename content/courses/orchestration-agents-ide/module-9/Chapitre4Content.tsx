'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  // Simulateur interactif : Atelier de Résolution de Conflit Git
  const [resolutionStrategy, setResolutionStrategy] = useState<'raw_conflict' | 'keep_ours' | 'keep_theirs' | 'harmonized'>('raw_conflict');

  const conflictData = {
    raw_conflict: {
      title: 'Fichier en conflit brut : src/types/task.ts',
      status: 'both modified: src/types/task.ts (CONFLIT NON RÉSOLU)',
      snippet: `<<<<<<< HEAD (develop)
export type TaskStatus = "todo" | "in_progress" | "done";
=======
export type TaskStatus = "pending" | "active" | "completed";
>>>>>>> feature/frontend-tasks`,
      diagnosis: 'Git a suspendu la fusion car les deux branches ont redéfini TaskStatus avec des chaînes différentes. Les marqueurs <<<<<<< et >>>>>>> polluent le fichier.',
      compliance: 'Non compilable (Erreur de syntaxe TypeScript sur les marqueurs).',
      recommendation: 'Ne jamais commiter avec les marqueurs. Déterminer le contrat de référence officiel de TaskFlow.'
    },
    keep_ours: {
      title: 'Stratégie 1 : Conserver la branche courante (--ours / develop)',
      status: 'Resolved using --ours',
      snippet: `export type TaskStatus = "todo" | "in_progress" | "done";`,
      diagnosis: 'Respecte le contrat Backend TaskFlow ("todo", "in_progress", "done").',
      compliance: 'Conforme côté backend, mais risque de casser les composants Frontend qui envoient encore "completed" !',
      recommendation: 'Oblige l\'agent Frontend à adapter son composant d\'interface pour utiliser les mêmes chaînes.'
    },
    keep_theirs: {
      title: 'Stratégie 2 : Conserver la branche entrante (--theirs / frontend)',
      status: 'Resolved using --theirs',
      snippet: `export type TaskStatus = "pending" | "active" | "completed";`,
      diagnosis: '⚠️ RUPTURE DE CONTRAT MAJEURE : Casse l\'API backend et la base de données qui n\'acceptent que "todo", "in_progress", "done".',
      compliance: 'Non conforme aux spécifications d\'architecture de TaskFlow.',
      recommendation: 'Rejetée. La convention de base de données backend prévaut sur les choix cosmétiques frontend.'
    },
    harmonized: {
      title: 'Stratégie 3 : Réconciliation Contractuelle Totale (Solution Recommandée)',
      status: 'Résolu proprement & Fichiers harmonisés (git add src/types/task.ts)',
      snippet: `// Contrat officiel TaskFlow validé par l'Architecte :
export type TaskStatus = "todo" | "in_progress" | "done";

// Mapping de présentation dans le composant Frontend :
export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "À faire",
  in_progress: "En cours",
  done: "Terminé"
};`,
      diagnosis: 'Contrat technique backend préservé, libellés utilisateurs élégants dans le frontend, zéro marqueur résiduel, typage strict 100% au vert.',
      compliance: '✅ 100% Conforme au contrat, validé par Vitest et tsc.',
      recommendation: 'Prêt pour git add, re-test complet et soumission de validation au PM.'
    }
  };

  const current = conflictData[resolutionStrategy];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400 shrink-0">
            Module 9 • Chapitre 4
          </span>
          <span className="text-xs text-muted-foreground">1 h 15 de lecture & pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Résoudre les conflits et vérifier les modifications
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Dans une équipe multi-agents, les conflits Git sont inévitables. Apprenez à décrypter les marqueurs de conflit, à distinguer un conflit textuel d'une incompatibilité fonctionnelle, à appliquer les bonnes stratégies d'arbitrage (<code>--ours</code> vs <code>--theirs</code>) et à auditer rigoureusement le code après résolution.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & résolution des conflits</p>
        <p className="text-sm leading-relaxed">
          Résoudre un conflit ne consiste pas à faire disparaître les marqueurs Git au hasard. Tout arbitrage ayant un <strong>impact sur les contrats d'API, les modèles de données ou le comportement utilisateur</strong> doit être documenté dans une fiche de résolution et validé par le <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Origine et détection des conflits */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>1. Conflits Git vs Conflits Fonctionnels Silencieux</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Comprendre les deux facettes des incompatibilités
            </h3>
            <div className="grid grid-cols-1 gap-3 mt-1 text-xs">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex flex-col gap-1">
                <span className="font-bold text-amber-400">1. Conflit Détecté par Git (Merge Conflict)</span>
                <p className="text-muted-foreground leading-relaxed">
                  Deux branches modifient les mêmes lignes d'un même fichier. Git suspend la fusion et injecte les marqueurs <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code>, <code>=======</code> et <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>. Impossible de commiter sans nettoyer le fichier.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex flex-col gap-1">
                <span className="font-bold text-rose-400">2. Conflit Fonctionnel Silencieux (Le piège majeur)</span>
                <p className="text-muted-foreground leading-relaxed">
                  L'agent Backend modifie la route en <code>PATCH /api/tasks/:id/status</code> dans <code>taskRoutes.ts</code>. L'agent Frontend appelle <code>PUT /api/tasks/:id</code> dans <code>TaskCard.tsx</code>. Aucun fichier commun n'étant touché, Git fusionne avec succès : 0 conflit ! Pourtant, l'application est en panne.
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic mt-1">
              Conclusion : la disparition des conflits Git est une condition nécessaire, mais absolument pas suffisante.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 : Commandes Git essentielles en cas de conflit */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>2. La boîte à outils de gestion et d'abandon de conflit</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-indigo-400">git status</code>
              <span className="text-[10px] text-muted-foreground">both modified</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Liste immédiatement les fichiers en conflit sous la mention <code>both modified</code> ou <code>both added</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-indigo-400">git diff --ours / --theirs</code>
              <span className="text-[10px] text-muted-foreground">Comparaison des versions</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <code>--ours</code> affiche la version de la branche courante (cible). <code>--theirs</code> affiche la version apportée par la branche en cours de fusion (source).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-indigo-400">{"git grep -n -E '^(<<<<<<<|=======|>>>>>>>)'"}</code>
              <span className="text-[10px] text-muted-foreground">Détection résiduelle</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Recherche instantanément dans tout le projet si des marqueurs de conflit ont été oubliés par inadvertance dans le code source.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-indigo-400">git merge --abort</code>
              <span className="text-[10px] text-muted-foreground">Annulation d'urgence</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Interrompt l'opération de fusion et restaure le dépôt à l'état exact antérieur au déclenchement du merge. Utile si la résolution devient chaotique.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Les 4 stratégies d'arbitrage */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="git-branch" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>3. Les 4 stratégies d'arbitrage et la coordination d'équipe</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3 text-xs">
          <div className="grid grid-cols-1 gap-2">
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">1. Conserver la version courante (--ours) :</strong> Si la modification de la branche cible est la référence contractuelle.
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">2. Conserver la version entrante (--theirs) :</strong> Si la nouvelle fonctionnalité remplace légitimement l'ancienne.
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">3. Fusion hybride (Combiner) :</strong> Conserver les ajouts complémentaires des deux branches en évitant les doublons.
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">4. Réconciliation d'architecture :</strong> Si les deux approches divergent, faire intervenir l'Agent Architect et réaligner les contrats avant tout commit.
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>4. Atelier Interactif — Résolution de Conflit sur TaskStatus</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Observez un conflit typique entre le Backend (qui impose <code>todo | in_progress | done</code>) et le Frontend (qui a introduit <code>pending | active | completed</code>). Testez les différentes stratégies d'arbitrage.
          </p>

          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setResolutionStrategy('raw_conflict')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                resolutionStrategy === 'raw_conflict'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              État 0 : Fichier en conflit brut avec marqueurs Git
            </button>

            <button
              onClick={() => setResolutionStrategy('keep_ours')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                resolutionStrategy === 'keep_ours'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Stratégie 1 : Conserver develop (--ours)
            </button>

            <button
              onClick={() => setResolutionStrategy('keep_theirs')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                resolutionStrategy === 'keep_theirs'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Stratégie 2 : Conserver frontend (--theirs) [Rupture contrat]
            </button>

            <button
              onClick={() => setResolutionStrategy('harmonized')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                resolutionStrategy === 'harmonized'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Stratégie 3 : Réconciliation Harmonisée (Solution Recommandée)
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col gap-3 text-xs min-w-0 max-w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-2.5 gap-2 min-w-0 max-w-full">
              <span className="font-bold text-white text-sm sm:text-base font-mono break-words [overflow-wrap:anywhere]">{current.title}</span>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere] max-w-full">{current.status}</span>
            </div>

            <div className="p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs text-white leading-relaxed min-w-0 max-w-full">
              <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
                {current.snippet}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-1 min-w-0 max-w-full">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Diagnostic d'impact :</span>
                <p className="text-white mt-0.5 text-xs sm:text-sm break-words [overflow-wrap:anywhere] leading-relaxed">{current.diagnosis}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-1 min-w-0 max-w-full">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Conformité aux critères d'acceptation :</span>
                <p className="text-white mt-0.5 text-xs sm:text-sm break-words [overflow-wrap:anywhere] leading-relaxed">{current.compliance}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 font-sans whitespace-normal break-words [overflow-wrap:anywhere]">
              <strong className="text-white font-semibold">Recommandation du Team Leader : </strong>{current.recommendation}
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
          title="Évaluation des connaissances — Chapitre 4 : Résolution des conflits et vérifications"
          questions={[
            {
              id: 1,
              question: "Pourquoi Git signale-t-il un conflit de fusion ?",
              options: [
                "Parce que deux branches possèdent nécessairement des noms identiques.",
                "Parce que le dépôt contient trop de commits.",
                "Parce qu'il ne peut pas réunir automatiquement certaines modifications concurrentes.",
                "Parce qu'un fichier contient obligatoirement une erreur TypeScript."
              ],
              correctIndex: 2,
              explanation: "Un conflit survient lorsque Git ne peut pas décider seul comment combiner des modifications divergentes sur une même zone de code."
            },
            {
              id: 2,
              question: "Que représente le marqueur ======= dans un conflit Git classique ?",
              options: [
                "La séparation entre les deux propositions de modification.",
                "La fin de l'opération de fusion.",
                "Le début du prochain commit.",
                "La validation automatique du fichier."
              ],
              correctIndex: 0,
              explanation: "Le marqueur ======= délimite la version locale (en haut, HEAD) de la version entrante (en bas, branche fusionnée)."
            },
            {
              id: 3,
              question: "Dans une fusion classique, que désigne --ours ?",
              options: [
                "La version du dépôt distant uniquement.",
                "La version présente dans la branche courante.",
                "La version du dernier commit de la branche cible.",
                "Une version générée automatiquement par Git."
              ],
              correctIndex: 1,
              explanation: "Dans un merge, --ours représente l'état de la branche sur laquelle on se trouve actuellement (la branche d'accueil)."
            },
            {
              id: 4,
              question: "Deux agents modifient des fichiers différents. Le Backend change la méthode HTTP attendue par une route, tandis que le Frontend continue d'utiliser l'ancienne méthode. Git ne signale aucun conflit. Quelle conclusion est correcte ?",
              options: [
                "Les deux contributions sont nécessairement compatibles.",
                "Git a automatiquement corrigé le contrat API.",
                "Le problème ne peut apparaître qu'à la compilation.",
                "Une incompatibilité fonctionnelle peut exister sans conflit Git."
              ],
              correctIndex: 3,
              explanation: "Git ne vérifie pas la sémantique métier : il assemble les fichiers sans conflit textuel, mais l'incohérence d'API brise l'application."
            },
            {
              id: 5,
              question: "Quel est le rôle de git add après la résolution d'un fichier conflictuel ?",
              options: [
                "Fusionner immédiatement toutes les branches.",
                "Supprimer définitivement l'historique du conflit.",
                "Signaler à Git que le fichier est résolu et prêt à être pris en compte dans la suite de l'opération.",
                "Exécuter automatiquement les tests du projet."
              ],
              correctIndex: 2,
              explanation: "git add indexe le fichier nettoyé et informe Git que le conflit sur cette ressource est formellement résolu."
            },
            {
              id: 6,
              question: "Quelle commande permet d'abandonner une opération de fusion en cours lorsque Git peut revenir à l'état antérieur ?",
              options: [
                "git merge --abort",
                "git merge --continue",
                "git reset --all",
                "git branch --delete"
              ],
              correctIndex: 0,
              explanation: "git merge --abort annule l'opération de merge en cours et rétablit le dépôt dans son état de départ."
            },
            {
              id: 7,
              question: "Après la résolution d'un conflit, quelle vérification est particulièrement importante pour TaskFlow ?",
              options: [
                "Vérifier uniquement que le fichier ne contient plus de marqueurs Git.",
                "Vérifier que les valeurs de statut et les contrats API restent cohérents entre frontend et backend.",
                "Vérifier que les deux agents ont utilisé le même éditeur.",
                "Vérifier que les branches possèdent le même nombre de commits."
              ],
              correctIndex: 1,
              explanation: "Il faut s'assurer que la résolution préserve l'alignement contractuel (valeurs de statuts, routes REST, formats JSON) entre les composants."
            },
            {
              id: 8,
              question: "Quelles actions sont nécessaires pour contrôler sérieusement une résolution de conflit ?",
              options: [
                "Examiner les modifications finales, vérifier l'absence de marqueurs résiduels et exécuter les tests et contrôles adaptés.",
                "Considérer que git add prouve la correction fonctionnelle.",
                "Supprimer les tests de non-régression.",
                "Faire un git push direct."
              ],
              correctIndex: 0,
              explanation: "La vérification exige l'inspection du diff final, la recherche de marqueurs oubliés et le passage effectif des tests."
            },
            {
              id: 9,
              question: "Lorsque Git termine une fusion sans signaler de conflit, les contributions réunies sont nécessairement compatibles sur le plan fonctionnel.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : deux briques modifiant des fichiers distincts peuvent fusionner sans conflit Git tout en utilisant des protocoles ou signatures incompatibles."
            },
            {
              id: 10,
              question: "Lors d'une fusion classique, git merge --abort permet de demander à Git d'abandonner la fusion en cours lorsque les conditions de retour à l'état antérieur sont réunies.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 0,
              explanation: "Vrai : cette commande restaure proprement le dépôt à l'état pré-fusion lorsque l'environnement le permet."
            }
          ]}
        />
      </div>
    </div>
  );
};
