'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur interactif : Banc d'Analyse de Code Review & Classification
  const [activeDiffItem, setActiveDiffItem] = useState<'any_typing' | 'unhandled_async' | 'scope_creep' | 'clean_refactor'>('any_typing');

  const diffCases = {
    any_typing: {
      id: 'CR-01',
      file: 'backend/src/controllers/taskController.ts',
      title: 'Typage permissif avec "any" au lieu d\'interfaces strictes',
      snippet: `// Avant :
// export async function updateStatus(req: Request, res: Response)

// Modifié par l'agent :
export async function updateStatus(req: any, res: any) {
  const { status } = req.body;
  const result: any = await taskService.setStatus(req.params.id, status);
  res.json(result);
}`,
      severity: 'Élevé (Majeur)',
      impact: 'Perte totale de la sécurité apportée par TypeScript. Risque de masquage d\'erreurs à la compilation et d\'accès à des propriétés undefined.',
      recommendation: 'Restaurer les types stricts Request et Response, et typer explicitement le DTO entrant avec UpdateTaskStatusDTO.',
      verdict: 'Correction demandée avant toute acceptation.'
    },
    unhandled_async: {
      id: 'CR-02',
      file: 'backend/src/services/taskService.ts',
      title: 'Absence de gestion d\'erreur sur promesse asynchrone',
      snippet: `export async function setStatus(id: string, status: TaskStatus): Promise<Task> {
  // ⚠️ Pas de try/catch ni de propagation explicite
  const task = await taskStore.findById(id);
  // Si le store rejette ou throw, le serveur crash avec un UnhandledPromiseRejection !
  task.status = status;
  return await taskStore.save(task);
}`,
      severity: 'Bloquant (Critique)',
      impact: 'En cas de déconnexion du store ou d\'erreur interne, l\'API ne renvoie pas d\'erreur 500 structurée et peut faire planter le processus Node.js.',
      recommendation: 'Encadrer l\'appel dans un bloc try/catch ou router vers le middleware global d\'erreur via next(error).',
      verdict: 'Bloquant : refus de validation.'
    },
    scope_creep: {
      id: 'CR-03',
      file: 'backend/src/config/database.ts',
      title: 'Dérive de périmètre (Modification de fichiers hors mission)',
      snippet: `// Fichier modifié en loucedé alors que la mission ne concernait que la route PATCH /status :
export const DB_CONFIG = {
  timeout: 30000, // ⚠️ Modifié de 5000 à 30000 sans justification ni concertation !
  poolSize: 50
};`,
      severity: 'Bloquant (Critique)',
      impact: 'Violation de la charte de confinement. Cette modification non autorisée peut perturber les tests de charge et masquer des blocages réseau globaux.',
      recommendation: 'Annuler immédiatement la modification sur database.ts via git checkout. Restreindre les diffs aux seuls fichiers assignés.',
      verdict: 'Rejeté : dérive de périmètre intolérable.'
    },
    clean_refactor: {
      id: 'CR-04',
      file: 'backend/src/controllers/taskController.ts',
      title: 'Implémentation conforme, typée, robuste et documentée',
      snippet: `export async function updateStatus(req: Request<{ id: string }, {}, UpdateStatusDTO>, res: Response): Promise<Response> {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    const updated = await taskService.updateTaskStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json(updated);
  } catch (error) {
    logger.error("Failed to update status", { error, taskId: req.params.id });
    return res.status(500).json({ error: "Internal server error" });
  }
}`,
      severity: 'Conforme (Aucun défaut)',
      impact: 'Respect intégral des conventions, validation des entrées, typage rigoureux, logging et codes HTTP 200/400/404/500 conformes au contrat.',
      recommendation: 'Aucune correction nécessaire. Prêt pour validation.',
      verdict: 'Avis Favorable.'
    }
  };

  const currentDiff = diffCases[activeDiffItem];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 8 • Chapitre 3
          </span>
          <span className="text-xs text-muted-foreground">55 min de lecture & pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Définir le rôle de l'agent Reviewer
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Tandis que l'agent QA teste le comportement dynamique de l'application, l'agent Reviewer assure la relecture statique approfondie du code source. Découvrez ses objectifs, son analyse chirurgicale des diffs Git, sa grille de classification des défauts et la rédaction de rapports de revue impartiaux.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & limites d'action</p>
        <p className="text-sm leading-relaxed">
          L'agent Reviewer évalue et conseille, mais <strong>il ne réécrit pas le code lui-même</strong> et ne fusionne jamais les branches dans le dépôt principal. Il consigne ses remarques dans un rapport structuré avec des propositions d'amélioration concrètes. Le <strong>Project Manager humain</strong> est le seul habilité à approuver la fusion finale sur la branche stable.
        </p>
      </Callout>

      {/* Section 1 : Objectifs et mission */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="search" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>1. Les 4 objectifs d'une revue de code par agent</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <h3 className="text-sm font-bold text-foreground">Vérifier la stricte conformité aux exigences</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Le Reviewer vérifie que le développeur a traité <em>toute</em> la consigne, mais <em>rien que</em> la consigne. Il traque la « dérive de périmètre » (scope creep), où un agent modifie des fichiers ou des comportements non demandés.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <h3 className="text-sm font-bold text-foreground">Vérifier la cohérence architecturale</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Il s'assure que le découpage en couches (contrôleurs HTTP, services métier, magasins de données) est scrupuleusement respecté. Un contrôleur ne doit jamais faire d'accès direct à la base de données ou contourner les middlewares.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <h3 className="text-sm font-bold text-foreground">Détecter les faiblesses techniques invisibles aux tests</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Un code peut passer tous ses tests unitaires tout en comportant des failles béantes : régression de typage (utilisation de <code>any</code>), fuites mémoire, promesses non attendues (<code>missing await</code>), ou concaténation de requêtes vulnérable.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <h3 className="text-sm font-bold text-foreground">Garantir la lisibilité et la maintenabilité</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Le Reviewer contrôle le respect des conventions de nommage, l'absence de code dupliqué ou commenté, et la clarté des commentaires utiles pour les futurs agents et développeurs humains.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 : La grille de classification */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2. Grille de classification des observations de revue</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-400 shrink-0">Bloquant (Critique)</span>
              <span className="text-sm font-bold text-foreground">Interdit toute validation et fusion</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Faille de sécurité, plantage potentiel du serveur (exception non interceptée), violation directe d'un contrat d'API, modification de code hors périmètre (scope drift), ou non-respect flagrant des règles de gestion critiques.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-400 shrink-0">Élevé (Majeur)</span>
              <span className="text-sm font-bold text-foreground">Correction requise avant intégration</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dégradation du typage TypeScript (usage injustifié de <code>any</code>), contournement d'une couche architecturale, mauvaise gestion d'erreur (ex. retour 500 générique au lieu de 400), ou absence de tests sur un chemin critique.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-400 shrink-0">Moyen (Modéré)</span>
              <span className="text-sm font-bold text-foreground">Amélioration recommandée</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Code dupliqué pouvant être factorisé, nommage de variables ambigu, ou complexité algorithmique inutile. Ne bloque pas impérativement l'intégration si le délai est contraint.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-muted bg-card flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-muted text-muted-foreground shrink-0">Faible (Mineur)</span>
              <span className="text-sm font-bold text-foreground">Remarque cosmétique ou informative</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Coquille dans un commentaire, formatage légèrement divergent des règles Prettier non bloquantes, ou suggestion d'optimisation prématurée. Ne doit jamais servir de prétexte à bloquer un livrable.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Les 4 conclusions d'une revue */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="check-square" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>3. Les 4 conclusions possibles d'un rapport de revue</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400">1. Avis Favorable (Approuvée)</span>
                <span className="text-[10px] uppercase font-semibold text-emerald-500">Prêt</span>
              </div>
              <p className="text-muted-foreground">Aucun problème bloquant ou majeur. Les exigences sont respectées, l'architecture est saine et le typage est irréprochable.</p>
            </div>

            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-400">2. Favorable avec observations</span>
                <span className="text-[10px] uppercase font-semibold text-blue-500">Sous réserve</span>
              </div>
              <p className="text-muted-foreground">Quelques remarques mineures (ex. nommage, typage d'un helper interne). Ne nécessite pas un nouveau cycle complet de revue avant validation.</p>
            </div>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">3. Corrections demandées (Rejetée)</span>
                <span className="text-[10px] uppercase font-semibold text-amber-500">À corriger</span>
              </div>
              <p className="text-muted-foreground">Présence d'au moins un défaut majeur ou bloquant. Le développeur doit impérativement corriger le code et soumettre un nouveau diff.</p>
            </div>

            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400">4. Revue bloquée</span>
                <span className="text-[10px] uppercase font-semibold text-rose-500">Impossibilité</span>
              </div>
              <p className="text-muted-foreground">Les conditions d'une évaluation fiable ne sont pas réunies : code qui ne compile pas, fichiers sources manquants, ou absence totale de contexte sur la tâche.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>4. Atelier Interactif — Banc d'Analyse de Code Review</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Mettez-vous dans la peau de l'agent Reviewer. Sélectionnez une modification de code soumise par l'agent Backend et analysez sa criticité, son impact technique et la conclusion à formuler.
          </p>

          {/* Boutons sélecteurs */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setActiveDiffItem('any_typing')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                activeDiffItem === 'any_typing'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>CR-01 : Utilisation de "any" sur les contrôleurs HTTP</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold shrink-0">ÉLEVÉ</span>
              </div>
            </button>

            <button
              onClick={() => setActiveDiffItem('unhandled_async')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                activeDiffItem === 'unhandled_async'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>CR-02 : Absence de try/catch et propagation d'erreur asynchrone</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold shrink-0">BLOQUANT</span>
              </div>
            </button>

            <button
              onClick={() => setActiveDiffItem('scope_creep')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                activeDiffItem === 'scope_creep'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>CR-03 : Dérive de périmètre sur database.ts</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold shrink-0">BLOQUANT</span>
              </div>
            </button>

            <button
              onClick={() => setActiveDiffItem('clean_refactor')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                activeDiffItem === 'clean_refactor'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>CR-04 : Implémentation robuste, typée et protégée</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold shrink-0">CONFORME</span>
              </div>
            </button>
          </div>

          {/* Affichage du diff et de l'analyse */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="text-xs font-mono font-bold text-foreground">{currentDiff.id} — {currentDiff.title}</span>
              <span className="text-[10px] font-mono text-muted-foreground">{currentDiff.file}</span>
            </div>

            <div className="p-3 rounded-lg bg-black border border-slate-800 font-mono text-xs text-white leading-relaxed min-w-0 max-w-full">
              <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
                {currentDiff.snippet}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">Niveau de criticité :</span>
                <span className="font-semibold text-foreground">{currentDiff.severity}</span>
              </div>
              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">Analyse d'impact :</span>
                <span className="text-muted-foreground">{currentDiff.impact}</span>
              </div>
              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">Recommandation du Reviewer :</span>
                <span className="text-foreground font-medium">{currentDiff.recommendation}</span>
              </div>
              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">Verdict du rapport :</span>
                <span className="font-bold text-foreground">{currentDiff.verdict}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5 : Modèle d'instruction pour l'Agent Reviewer */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="file-text" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>5. Modèle de mission pour l'Agent Reviewer</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3 min-w-0 max-w-full">
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
            Voici le prompt type utilisé dans TaskFlow pour lancer une revue de code rigoureuse et impartiale :
          </p>
          <div className="p-4 rounded-lg bg-black font-mono text-xs text-white leading-relaxed border border-slate-800 min-w-0 max-w-full">
            <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full">
{`Tu es l'agent Reviewer de l'équipe TaskFlow.
Ta mission :
1. Examiner les modifications introduites avec git diff origin/main..HEAD
2. Vérifier la conformité aux exigences de la spécification docs/specs/task-status.md
3. Contrôler le respect des conventions : typage strict (zéro 'any'), gestion des erreurs, architecture en couches
4. Classer chaque observation selon sa sévérité : Bloquant, Élevé, Moyen, Faible
5. Rédiger un rapport de revue synthétique avec verdict clair :
   - Favorable
   - Favorable avec observations
   - Corrections demandées
   - Revue bloquée

Règles impératives :
- Tu ne dois JAMAIS réécrire le code toi-même ni commiter de correctif.
- Distingue rigoureusement les défauts avérés de tes préférences personnelles.
- Ne tente aucune opération git merge, git rebase ou git push.`}
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
          title="Évaluation des connaissances — Chapitre 3 : Rôle de l'agent Reviewer"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal de l'agent Reviewer ?",
              options: [
                "Développer toutes les fonctionnalités de l'application.",
                "Examiner les modifications et identifier les problèmes techniques.",
                "Gérer les utilisateurs de l'application.",
                "Autoriser les opérations Git de l'équipe."
              ],
              correctIndex: 1,
              explanation: "Le Reviewer examine les modifications produites par les agents pour détecter les défauts de qualité, de cohérence, de sécurité et d'architecture."
            },
            {
              id: 2,
              question: "Que permet principalement une revue de code ?",
              options: [
                "Vérifier uniquement que l'application démarre.",
                "Remplacer tous les tests automatisés.",
                "Examiner la qualité et la conformité des modifications.",
                "Garantir l'absence de tous les défauts."
              ],
              correctIndex: 2,
              explanation: "Une revue de code examine la conformité des modifications aux exigences et conventions architecturales. Elle est complémentaire aux tests."
            },
            {
              id: 3,
              question: "Qu'est-ce qu'un diff dans Git ?",
              options: [
                "Une représentation des différences entre deux versions.",
                "Une copie complète du dépôt.",
                "Un outil de lancement des tests.",
                "Une commande de suppression des branches."
              ],
              correctIndex: 0,
              explanation: "Un diff présente les lignes ajoutées, supprimées et modifiées entre deux versions ou deux états du dépôt Git."
            },
            {
              id: 4,
              question: "Quel comportement doit adopter le Reviewer lorsqu'il identifie une préférence personnelle qui ne constitue pas un défaut ?",
              options: [
                "Exiger systématiquement une réécriture.",
                "Présenter sa préférence comme une règle obligatoire.",
                "Ignorer les conventions du projet.",
                "Distinguer cette préférence d'un problème réel et respecter les conventions existantes."
              ],
              correctIndex: 3,
              explanation: "Le Reviewer doit faire preuve d'objectivité : il ne doit pas imposer ses goûts personnels comme des défauts s'ils respectent les conventions établies."
            },
            {
              id: 5,
              question: "Quelle est la différence principale entre le QA et le Reviewer ?",
              options: [
                "Le QA développe le Backend et le Reviewer développe le Frontend.",
                "Le QA vérifie les comportements par les tests, tandis que le Reviewer examine les modifications.",
                "Le Reviewer remplace le Project Manager.",
                "Le QA et le Reviewer ont exactement les mêmes responsabilités."
              ],
              correctIndex: 1,
              explanation: "Le QA pratique la vérification dynamique (comportement par les tests) tandis que le Reviewer pratique la vérification statique (analyse du code et du diff)."
            },
            {
              id: 6,
              question: "Que doit contenir une observation importante dans un rapport de revue ?",
              options: [
                "Une appréciation générale sans détail.",
                "Un ordre de réécrire tous les fichiers.",
                "Un emplacement précis, une explication du problème et une recommandation.",
                "Uniquement le nom de l'agent responsable."
              ],
              correctIndex: 2,
              explanation: "Pour être actionnable, une observation doit cibler le fichier et la ligne, expliquer la raison du défaut et suggérer une solution de correction."
            },
            {
              id: 7,
              question: "Que signifie une revue bloquée ?",
              options: [
                "Le Reviewer a terminé et approuvé les modifications.",
                "Les tests ont tous réussi.",
                "Les corrections sont obligatoirement terminées.",
                "Le Reviewer ne dispose pas des éléments nécessaires pour réaliser un examen fiable."
              ],
              correctIndex: 3,
              explanation: "Une revue est dite bloquée lorsque les conditions matérielles d'une analyse fiable ne sont pas réunies (code non compilable, fichiers absents)."
            },
            {
              id: 8,
              question: "Après une correction du Backend, que doit faire le Reviewer ?",
              options: [
                "Examiner les modifications correctives et vérifier que les problèmes signalés sont traités.",
                "Considérer automatiquement la revue comme favorable.",
                "Supprimer les observations précédentes sans vérification.",
                "Autoriser directement le push."
              ],
              correctIndex: 0,
              explanation: "Le Reviewer doit réexaminer le nouveau diff Git pour s'assurer que les problèmes ont été effectivement résolus sans introduire de nouveaux défauts."
            },
            {
              id: 9,
              question: "Qui conserve la responsabilité de la validation finale du livrable dans l'organisation du projet ?",
              options: [
                "L'agent Backend.",
                "L'agent Reviewer.",
                "Le Project Manager humain.",
                "L'agent QA."
              ],
              correctIndex: 2,
              explanation: "Le Project Manager humain conserve le pouvoir souverain de validation et d'intégration finale dans le projet TaskFlow."
            },
            {
              id: 10,
              question: "Quelle information le Reviewer doit-il fournir lorsqu'il n'a pas exécuté les tests ?",
              options: [
                "Il doit annoncer que tous les tests ont réussi.",
                "Il doit indiquer que les tests n'ont pas été exécutés.",
                "Il doit supprimer toute mention des tests.",
                "Il doit demander au QA de confirmer un résultat non vérifié."
              ],
              correctIndex: 1,
              explanation: "La traçabilité exige la transparence : le Reviewer doit mentionner explicitement qu'il n'a pas exécuté les tests s'il s'est limité à la relecture statique."
            }
          ]}
        />
      </div>
    </div>
  );
};
