'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  // Simulateur interactif de cycle de vie et maintenance des Worktrees
  const [worktreesList, setWorktreesList] = useState<Array<{ name: string; path: string; branch: string; locked: boolean }>>([
    { name: "Principal", path: "/projects/taskflow", branch: "main", locked: false },
    { name: "Backend", path: "/projects/taskflow-backend", branch: "feature/backend-api", locked: false },
    { name: "Frontend", path: "/projects/taskflow-frontend", branch: "feature/frontend-ui", locked: false },
    { name: "Architect", path: "/projects/taskflow-architecture", branch: "docs/architecture", locked: true }
  ]);
  const [cliFeedback, setCliFeedback] = useState<string>("Système prêt. 4 Worktrees enregistrés.");

  const handleRemoveBackend = () => {
    const exists = worktreesList.some(w => w.path === "/projects/taskflow-backend");
    if (!exists) {
      setCliFeedback("fatal: '/projects/taskflow-backend' is not a working tree");
      return;
    }
    setWorktreesList(worktreesList.filter(w => w.path !== "/projects/taskflow-backend"));
    setCliFeedback("✓ Worktree '/projects/taskflow-backend' supprimé avec succès. Branche 'feature/backend-api' préservée dans l'historique.");
  };

  const handleToggleLockArchitect = () => {
    setWorktreesList(worktreesList.map(w => {
      if (w.path === "/projects/taskflow-architecture") {
        const nextState = !w.locked;
        setCliFeedback(nextState ? "🔒 Worktree /projects/taskflow-architecture verrouillé avec succès." : "🔓 Worktree /projects/taskflow-architecture déverrouillé.");
        return { ...w, locked: nextState };
      }
      return w;
    }));
  };

  const handlePrune = () => {
    setCliFeedback("git worktree prune : Nettoyage des références administratives obsolètes achevé. 0 référence orpheline.");
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 4 — Git Worktrees et parallélisme
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 8 — Entretenir et supprimer les Worktrees
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Au fur et à mesure que les agents IA terminent leurs missions sur <strong>TaskFlow</strong>, la prolifération de répertoires physiques non entretenus encombre le disque et brouille la visibilité de l'équipe. Savoir inspecter, verrouiller (<code>lock</code>), purger (<code>prune</code>) et supprimer proprement un Worktree (<code>remove</code>) sans jamais perdre de commits est une compétence d'administration indispensable.
        </p>
      </div>

      {/* =========================================================================
          OBJECTIFS D'APPRENTISSAGE
         ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="target" className="w-5 h-5 text-indigo-600" />
          Objectifs d'apprentissage du chapitre
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              1. Distinguer la suppression de Worktree de celle de branche
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprendre que <code>git worktree remove</code> efface le dossier physique mais ne supprime en aucun cas la branche Git ni ses commits.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Maîtriser le triptyque remove, prune et lock
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Savoir quand utiliser <code>remove</code> (suppression normale), <code>prune</code> (purge des métadonnées orphelines) et <code>lock</code> (protection contre le nettoyage automatique).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Valider l'état avant toute destruction (--force proscrit)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vérifier systématiquement l'absence de travail non commité pour éviter toute perte irrémédiable de code.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 8.4 : WORKTREE REMOVE VS BRANCH -D
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Distinguer la suppression d'un Worktree de celle d'une branche
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Deux opérations indépendantes aux conséquences radicalement distinctes
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900 font-mono">
                git worktree remove /projects/taskflow-backend
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-800 shrink-0">
                Suppression Disque
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Supprime le répertoire physique <code>taskflow-backend/</code> du système de fichiers et efface ses métadonnées dans <code>.git/worktrees/</code>. <strong>La branche feature/backend-api et l'ensemble de ses commits restent parfaitement intacts dans le dépôt !</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900 font-mono">
                git branch -d feature/backend-api
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-purple-100 text-purple-800 shrink-0">
                Suppression Référence
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Supprime le pointeur logique de la branche dans Git. Git refuse cette opération si les commits n'ont pas encore été fusionnés dans <code>main</code> ou si la branche est encore active dans un Worktree.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DE MAINTENANCE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Console de Maintenance — Gestion du Cycle de Vie
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Admin Worktrees
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Testez les actions d'entretien pour observer l'évolution de la table des espaces de travail :
          </p>

          {/* Boutons d'administration */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={handleRemoveBackend}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
            >
              $ git worktree remove /projects/taskflow-backend
            </button>
            <button
              onClick={handleToggleLockArchitect}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-colors"
            >
              $ git worktree {worktreesList.find(w => w.path === "/projects/taskflow-architecture")?.locked ? "unlock" : "lock"} taskflow-architecture
            </button>
            <button
              onClick={handlePrune}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              $ git worktree prune
            </button>
          </div>

          {/* Terminal de retour */}
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-3 mb-6">
            <div className="text-indigo-400 font-bold">$ Résultat de l'opération :</div>
            <div className="text-emerald-300">{cliFeedback}</div>

            <div className="pt-2 border-t border-slate-800 text-indigo-400 font-bold">$ git worktree list</div>
            <div className="space-y-1">
              {worktreesList.map((wt, idx) => (
                <div key={idx} className="flex flex-wrap items-center justify-between gap-2">
                  <span>{wt.path} [{wt.branch}]</span>
                  {wt.locked && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-900/80 text-amber-300 border border-amber-700">
                      LOCKED (protégé du prune)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8.13 : SYNTHÈSE DES COMMANDES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 2 </span>
            Synthèse des commandes d'administration des Worktrees
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-900 font-bold">
              <tr>
                <th className="pb-3 pr-4">Commande</th>
                <th className="pb-3 pr-4">Rôle</th>
                <th className="pb-3">Niveau de précaution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-mono font-bold text-indigo-700">git worktree list</td>
                <td className="py-2.5 pr-4">Lister les espaces associés avec leurs commits et branches</td>
                <td className="py-2.5 text-emerald-700">Lecture seule (sans risque)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-mono font-bold text-indigo-700">git worktree remove &lt;chemin&gt;</td>
                <td className="py-2.5 pr-4">Supprimer proprement un répertoire de travail achevé</td>
                <td className="py-2.5 text-amber-700">Vérifier <code>git status</code> au préalable</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-mono font-bold text-indigo-700">git worktree prune</td>
                <td className="py-2.5 pr-4">Purger les références orphelines supprimées manuellement</td>
                <td className="py-2.5 text-slate-700">Nettoyage administratif</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-mono font-bold text-indigo-700">git worktree lock &lt;chemin&gt;</td>
                <td className="py-2.5 pr-4">Verrouiller un Worktree pour le préserver du prune automatique</td>
                <td className="py-2.5 text-indigo-700">Protection recommandée</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-mono font-bold text-indigo-700">git worktree unlock &lt;chemin&gt;</td>
                <td className="py-2.5 pr-4">Déverrouiller l'espace pour réautoriser sa suppression</td>
                <td className="py-2.5 text-slate-700">Administration</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8.14 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 8
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez vos compétences sur la maintenance et la suppression des Worktrees (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle commande permet de consulter la liste exhaustive des Worktrees associés au dépôt ?",
              options: [
                "git branch",
                "git worktree list",
                "git worktree remove",
                "git status"
              ],
              correctIndex: 1,
              explanation: "git worktree list affiche tous les répertoires attachés au dépôt courant."
            },
            {
              id: 2,
              question: "Quelle commande permet de supprimer un Worktree devenu inutile après la validation de sa mission ?",
              options: [
                "git worktree prune",
                "git branch -d",
                "git worktree remove chemin/du/worktree",
                "git worktree unlock"
              ],
              correctIndex: 2,
              explanation: "git worktree remove supprime le dossier physique et ses références administratives associées."
            },
            {
              id: 3,
              question: "La suppression d'un Worktree avec 'git worktree remove' supprime-t-elle automatiquement la branche Git liée ?",
              options: [
                "Oui, la branche est toujours supprimée avec le dossier",
                "Non, la suppression de la branche est une opération distincte (git branch -d)"
              ],
              correctIndex: 1,
              explanation: "La branche et le worktree sont dissociés : la branche persiste avec tous ses commits."
            },
            {
              id: 4,
              question: "Que faut-il vérifier impérativement avant de supprimer un espace de travail ?",
              options: [
                "Uniquement le prénom de l'agent",
                "Que toutes les modifications importantes sont bien commitées et que l'espace n'est plus utilisé",
                "Le nombre de lignes du fichier package.json",
                "L'adresse IP du serveur distant"
              ],
              correctIndex: 1,
              explanation: "Cette vérification garantit qu'aucun travail non commité ne sera perdu lors de la destruction du dossier."
            },
            {
              id: 5,
              question: "Quel est le risque majeur de l'option 'git worktree remove --force' ?",
              options: [
                "La suppression automatique de toutes les branches du dépôt",
                "La perte irrémédiable de modifications locales non commitées",
                "L'effacement de l'historique complet de git",
                "La création d'un bug dans l'IDE"
              ],
              correctIndex: 1,
              explanation: "L'option --force détruit le dossier même s'il contient des fichiers modifiés non sauvegardés."
            },
            {
              id: 6,
              question: "À quoi sert la commande 'git worktree prune' ?",
              options: [
                "À fusionner automatiquement les branches",
                "À supprimer les branches terminées",
                "À nettoyer les informations administratives des Worktrees dont les dossiers ont été effacés manuellement du disque",
                "À créer un commit de nettoyage"
              ],
              correctIndex: 2,
              explanation: "prune élimine les métadonnées orphelines dans .git/worktrees/ lorsqu'un dossier a été supprimé hors de Git."
            },
            {
              id: 7,
              question: "À quoi sert la commande 'git worktree lock chemin' ?",
              options: [
                "À protéger un Worktree contre le nettoyage automatique par 'git worktree prune'",
                "À empêcher l'écriture de code dans l'IDE",
                "À fusionner immédiatement la branche sur main",
                "À chiffrer les fichiers avec un mot de passe"
              ],
              correctIndex: 0,
              explanation: "Le verrouillage empêche Git de considérer le dossier comme orphelin s'il est temporairement démonté."
            },
            {
              id: 8,
              question: "Quelle commande permet de déverrouiller un Worktree préalablement protégé ?",
              options: [
                "git worktree remove",
                "git worktree unlock chemin",
                "git worktree prune",
                "git branch -D"
              ],
              correctIndex: 1,
              explanation: "git worktree unlock retire le verrou et réautorise les opérations de nettoyage standard."
            },
            {
              id: 9,
              question: "Un Worktree sans modifications locales non enregistrées signifie-t-il obligatoirement que son code a été fusionné sur main ?",
              options: [
                "Oui, toujours",
                "Non, il faut également examiner l'historique des branches et les autorisations du PM humain"
              ],
              correctIndex: 1,
              explanation: "Un répertoire peut être propre (tous commits faits) sans que la branche n'ait encore été fusionnée dans main."
            },
            {
              id: 10,
              question: "Quand doit-on procéder à la suppression d'un Worktree dans l'équipe TaskFlow ?",
              options: [
                "Dès qu'un agent commence à coder",
                "Dès qu'un premier commit est créé",
                "Uniquement lorsque la mission est achevée, auditée par le Reviewer et que les modifications ont été validées ou archivées",
                "Chaque vendredi soir automatiquement"
              ],
              correctIndex: 2,
              explanation: "La suppression n'intervient qu'en clôture complète du cycle de vie de la mission."
            }
          ]}
        />
      </section>
    </div>
  );
};
