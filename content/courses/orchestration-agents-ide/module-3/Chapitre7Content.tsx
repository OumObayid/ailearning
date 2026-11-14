'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // Simulateur interactif de Rebase vs Merge
  const [strategy, setStrategy] = useState<'original' | 'merge' | 'rebase'>('original');

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 3 — Maîtrise de Git pour le multi-agents
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 7 — Comprendre le rebase et les conflits
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pendant qu'un agent travaille sur sa branche de mission, la branche principale <code>main</code> continue d'évoluer avec les contributions des autres intervenants. Pour intégrer les dernières nouveautés dans sa branche avant de soumettre son travail, l'agent peut utiliser <code>git rebase</code>. Mais cette commande réécrit l'historique et exige une vigilance absolue lorsqu'elle est employée en équipe.
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
              1. Comprendre le mécanisme fondamental du rebase
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Savoir pourquoi <code>git rebase</code> réapplique les commits un par un sur une nouvelle base et modifie tous leurs identifiants SHA.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Comparer objectivement Merge et Rebase
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguer un historique linéaire (rebase) d'un historique qui préserve fidèlement la chronologie des fusions (merge).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Appliquer la règle d'or des branches partagées
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ne jamais réécrire l'historique d'une branche publique sur laquelle d'autres agents collaborent sans coordination formelle.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 7.2 & 7.3 : PRINCIPE DU REBASE ET COMPARAISON MERGE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Le principe du rebase : Changer la base d'une branche
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Rejouer des commits existants au sommet d'un historique actualisé
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Le mot <strong>rebase</strong> signifie littéralement <em>"changer la base"</em>. Lorsque vous exécutez <code>git rebase main</code> depuis votre branche <code>feature/task-api</code>, Git détache temporairement vos commits, fait avancer votre branche jusqu'à la pointe de <code>main</code>, puis <strong>réapplique vos commits un par un</strong> au sommet.
        </p>

        {/* SIMULATEUR INTERACTIF REBASE VS MERGE */}
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Visuel — Comparateur d'Historique Git
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              TaskFlow : main vs feature/task-api
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Sélectionnez une stratégie pour visualiser graphiquement l'impact sur l'arbre des commits et la traçabilité des identifiants :
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setStrategy('original')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${strategy === 'original' ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' : 'bg-slate-800 text-slate-300'
                }`}
            >
              1. Situation de départ (Divergence)
            </button>
            <button
              onClick={() => setStrategy('merge')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${strategy === 'merge' ? 'bg-purple-600 text-white ring-2 ring-purple-400' : 'bg-slate-800 text-slate-300'
                }`}
            >
              2. Résultat avec git merge
            </button>
            <button
              onClick={() => setStrategy('rebase')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${strategy === 'rebase' ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' : 'bg-slate-800 text-slate-300'
                }`}
            >
              3. Résultat avec git rebase
            </button>
          </div>

          {/* Rendu graphique de l'arbre */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 font-mono text-xs text-slate-300 space-y-4">
            {strategy === 'original' && (
              <div>
                <span className="text-slate-400 block mb-2"># Les deux branches partagent A et B, puis main avance avec C et feature avec D, E :</span>
                <div className="text-indigo-300">
                  A --- B --- C  (main)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D --- E  (feature/task-api)
                </div>
                <p className="text-xs text-slate-400 mt-3 font-sans">
                  feature/task-api a été créée à partir du commit B. Elle ne contient pas encore le commit C ajouté récemment sur main.
                </p>
              </div>
            )}

            {strategy === 'merge' && (
              <div>
                <span className="text-purple-300 font-bold block mb-2"># git switch main && git merge feature/task-api :</span>
                <div className="text-slate-200">
                  A --- B --- C --------- M (Commit de Merge)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D --------- E (feature/task-api)
                </div>
                <div className="mt-3 p-3 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-200 font-sans text-xs">
                  ✓ Les commits d'origine D et E conservent leurs identifiants SHA stricts.<br />
                  ✓ Un commit explicite M documente le moment où la fonctionnalité a rejoint la branche principale.
                </div>
              </div>
            )}

            {strategy === 'rebase' && (
              <div>
                <span className="text-emerald-300 font-bold block mb-2"># git switch feature/task-api && git rebase main :</span>
                <div className="text-slate-200">
                  A --- B --- C  (main)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D' --- E'  (feature/task-api réécrite)
                </div>
                <div className="mt-3 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-200 font-sans text-xs">
                  ✓ Historique 100% linéaire sans embranchement visible.<br />
                  ⚠️ <strong>ATTENTION :</strong> D' et E' sont de <em>nouveaux commits</em> avec des hashs SHA modifiés. Si un autre agent utilisait l'ancien D, sa branche devient désynchronisée.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tableau comparatif Merge vs Rebase */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-900 font-bold">
              <tr>
                <th className="pb-3 pr-4">Critère</th>
                <th className="pb-3 pr-4">git merge</th>
                <th className="pb-3">git rebase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Principe</td>
                <td className="py-2.5 pr-4">Réunit deux historiques distincts</td>
                <td className="py-2.5">Réapplique les commits sur une nouvelle base</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Historique</td>
                <td className="py-2.5 pr-4">Conserve les commits originaux immuables</td>
                <td className="py-2.5">Recrée de nouveaux commits (hashs modifiés)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Commit de fusion</td>
                <td className="py-2.5 pr-4">Génère un commit de merge (sauf fast-forward)</td>
                <td className="py-2.5">Aucun commit de merge n'est créé</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Linéarité</td>
                <td className="py-2.5 pr-4">Graphe non linéaire à branches multiples</td>
                <td className="py-2.5">Graphe rectiligne très lisible</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Usage recommandé</td>
                <td className="py-2.5 pr-4">Intégration finale de PR dans <code>main</code></td>
                <td className="py-2.5">Mise à jour d'une branche locale <strong>personnelle</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.8 : GÉRER UN REBASE INTERROMPU
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 2 </span>
            Gestion des conflits pendant un rebase : continue, abort et skip
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Les commandes de contrôle pour reprendre, abandonner ou débloquer l'opération
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Lors d'un rebase, Git réapplique les commits un par un. Si le commit D' entre en conflit avec une modification présente dans <code>main</code>, l'opération se met en pause :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900 font-mono">
                git rebase --continue
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                Poursuivre
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Une fois le conflit résolu dans le fichier et préparé via <code>git add chemin/fichier</code>, cette commande demande à Git de reprendre la réapplication des commits suivants.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900 font-mono">
                git rebase --abort
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-rose-100 text-rose-800 shrink-0">
                Annulation
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Annule immédiatement l'ensemble du rebase et replace la branche dans son état exact avant le lancement de la commande. À utiliser dès que le conflit devient trop complexe.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-amber-900 font-mono">
                git rebase --skip (À manipuler avec une extrême réserve)
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-amber-200 text-amber-900 shrink-0">
                Risque élevé
              </span>
            </div>
            <p className="text-xs text-amber-800">
              Ignore complètement le commit en cours de traitement. <strong>Toutes les modifications contenues dans ce commit sont définitivement perdues de l'historique réécrit.</strong> Ne l'utilisez jamais pour simplement débloquer un conflit que vous ne comprenez pas.
            </p>
          </div>
        </div>

        <Callout type="danger" title="Règle d'or absolue : Ne jamais rebaser une branche partagée">
          <p className="text-xs sm:text-sm leading-relaxed">
            Le rebase modifie l'identité des commits. Si plusieurs agents travaillent sur la même branche distante, un rebase les obligera à résoudre des conflits inextricables. <strong>Le rebase est strictement réservé aux branches locales privées qui n'ont pas encore été publiées, et requiert toujours l'autorisation du PM humain pour toute mise à jour forcée.</strong>
          </p>
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 7.14 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 7
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez votre maîtrise du rebase et des techniques de gestion des conflits (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal de la commande 'git rebase' ?",
              options: [
                "Supprimer une branche de développement",
                "Réappliquer les commits d'une branche au-dessus d'une nouvelle base",
                "Envoyer directement les commits sur le serveur distant",
                "Annuler toutes les modifications locales du répertoire de travail"
              ],
              correctIndex: 1,
              explanation: "git rebase permet de replacer les commits d'une branche de travail au sommet des dernières évolutions d'une autre branche (comme main)."
            },
            {
              id: 2,
              question: "Que se passe-t-il avec les identifiants SHA des commits réappliqués lors d'un rebase ?",
              options: [
                "Ils restent strictement identiques",
                "Ils sont définitivement effacés sans remplacement",
                "De nouveaux commits sont créés avec de nouveaux identifiants SHA car leur historique parent a changé",
                "Ils sont automatiquement publiés sur GitHub"
              ],
              correctIndex: 2,
              explanation: "Comme le parent et la date du commit changent lors de la réapplication, son empreinte cryptographique SHA est obligatoirement modifiée."
            },
            {
              id: 3,
              question: "Quelle est la différence fondamentale entre merge et rebase ?",
              options: [
                "Merge réunit deux historiques distincts, tandis que rebase réécrit les commits pour former une ligne d'historique unique",
                "Merge supprime tous les conflits, tandis que rebase les invente",
                "Rebase ne fonctionne qu'avec une connexion internet",
                "Les deux commandes produisent rigoureusement le même arbre de commits"
              ],
              correctIndex: 0,
              explanation: "Merge préserve les commits existants et trace la réunion par un commit 3-way. Rebase réécrit les commits pour un rendu linéaire."
            },
            {
              id: 4,
              question: "Quelle commande permet d'identifier immédiatement les fichiers en conflit lors d'un rebase ?",
              options: [
                "git push",
                "git status",
                "git clone",
                "git init"
              ],
              correctIndex: 1,
              explanation: "git status affiche les chemins non fusionnés et indique que le rebase est en pause à un commit spécifique."
            },
            {
              id: 5,
              question: "Après avoir résolu manuellement un conflit dans un fichier pendant un rebase, quelle commande doit-on exécuter ?",
              options: [
                "git merge",
                "git reset",
                "git add chemin/du/fichier",
                "git clone"
              ],
              correctIndex: 2,
              explanation: "git add prépare la version résolue du fichier dans la staging area avant de poursuivre le rebase."
            },
            {
              id: 6,
              question: "Quelle commande permet de reprendre la réapplication des commits après avoir préparé la résolution d'un conflit ?",
              options: [
                "git rebase --continue",
                "git rebase --abort",
                "git rebase --skip",
                "git merge --continue"
              ],
              correctIndex: 0,
              explanation: "git rebase --continue scelle le commit réappliqué et passe au commit suivant."
            },
            {
              id: 7,
              question: "Que réalise la commande 'git rebase --abort' ?",
              options: [
                "Elle ignore le commit en cours",
                "Elle abandonne immédiatement l'opération et restaure l'état exact de la branche avant le début du rebase",
                "Elle termine le rebase sans résoudre les erreurs",
                "Elle supprime la branche principale main"
              ],
              correctIndex: 1,
              explanation: "git rebase --abort permet de revenir au point de départ sain en cas de blocage."
            },
            {
              id: 8,
              question: "Pourquoi est-il formellement déconseillé de rebaser une branche déjà partagée avec l'équipe ?",
              options: [
                "Parce que Git bloque physiquement la commande",
                "Parce que le rebase détruit le serveur GitHub",
                "Parce que la réécriture des identifiants de commits perturbe gravement les dépôts locaux des autres membres travaillant sur cette branche",
                "Parce que les commits ne peuvent être joués qu'une seule fois dans l'histoire"
              ],
              correctIndex: 2,
              explanation: "Réécrire des commits publics force les autres contributeurs à des fusions complexes pour réaligner leurs clones."
            },
            {
              id: 9,
              question: "Quel est l'effet de la commande 'git rebase --skip' ?",
              options: [
                "Elle ignore le commit en conflit en perdant définitivement ses modifications dans l'historique réécrit",
                "Elle abandonne l'ensemble du rebase",
                "Elle fusionne automatiquement les deux branches",
                "Elle pousse les modifications sur GitHub"
              ],
              correctIndex: 0,
              explanation: "git rebase --skip abandonne le commit courant sans l'appliquer. Cela peut causer des pertes de code imprévues."
            },
            {
              id: 10,
              question: "Dans le projet TaskFlow, qui conserve la responsabilité exclusive des autorisations pour les opérations Git sensibles (merge, rebase sur main, push) ?",
              options: [
                "L'Agent Backend",
                "L'Agent Reviewer",
                "Le Team Leader IA",
                "Le Project Manager humain"
              ],
              correctIndex: 3,
              explanation: "Le PM humain est le seul garant de l'intégrité de la branche principale et valide souverainement ces opérations."
            }
          ]}
        />
      </section>
    </div>
  );
};
