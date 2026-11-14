'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  // Simulateur comparatif Branche vs Worktree
  const [activeTab, setActiveTab] = useState<'branch' | 'worktree' | 'combo'>('branch');

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
          Chapitre 2 — Comprendre la différence entre une branche et un Worktree
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Une confusion très répandue chez les développeurs consiste à mélanger <strong>branche</strong> et <strong>répertoire de travail</strong>. Une branche n'est pas un dossier physique : c'est un simple pointeur dans l'historique Git. Un Worktree, en revanche, est un véritable répertoire instancié sur le disque dur. Comprendre leur articulation précise est la clé de voûte de l'orchestration multi-agents.
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
              1. Distinguer référence logique et répertoire physique
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              La branche organise les lignes de développement dans l'historique ; le Worktree fournit l'espace de fichiers sur le disque dur.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Comprendre pourquoi créer une branche ne crée aucun dossier
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Démystifier le fonctionnement interne de Git : <code>git branch</code> crée un pointeur de 41 octets, sans dupliquer de code.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Maîtriser leur complémentarité (1 Mission = 1 Branche + 1 Worktree)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Combiner les deux mécanismes pour permettre à chaque agent de coder en parallèle sans basculements intempestifs de contexte.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2.4 : TABLEAU COMPARATIF COMPLET
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Tableau comparatif : Branche vs Worktree
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Deux concepts complémentaires aux rôles strictement distincts
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-900 font-bold">
              <tr>
                <th className="pb-3 pr-4">Critère</th>
                <th className="pb-3 pr-4">Branche Git</th>
                <th className="pb-3">Git Worktree</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Nature</td>
                <td className="py-2.5 pr-4">Référence logique (fichier texte de 41 octets)</td>
                <td className="py-2.5">Répertoire physique sur le disque dur</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Rôle premier</td>
                <td className="py-2.5 pr-4">Isoler une suite chronologique de commits</td>
                <td className="py-2.5">Permettre à un agent de modifier et tester des fichiers</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Création de fichiers</td>
                <td className="py-2.5 pr-4">Ne crée aucun répertoire sur le disque</td>
                <td className="py-2.5">Instancie l'arbre complet des fichiers du projet</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Zone de préparation</td>
                <td className="py-2.5 pr-4">N'en possède pas en propre (utilise l'index du worktree)</td>
                <td className="py-2.5">Possède son propre fichier index indépendant</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Exclusivité</td>
                <td className="py-2.5 pr-4">Une branche locale ne peut être active que dans 1 seul worktree</td>
                <td className="py-2.5">Un worktree est associé à une seule branche active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR COMPARATIF INTERACTIF
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Interactif — Branche vs Worktree sous le capot
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Architecture Disque vs Git Internal
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Cliquez sur un scénario pour visualiser ce que Git fait réellement sur votre disque et dans sa base interne :
          </p>

          {/* Boutons d'exploration */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('branch')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'branch' ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400' : 'bg-slate-800 text-slate-300'
                }`}
            >
              1. git branch feature/backend-api
            </button>
            <button
              onClick={() => setActiveTab('worktree')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'worktree' ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400' : 'bg-slate-800 text-slate-300'
                }`}
            >
              2. git worktree add ../taskflow-backend
            </button>
            <button
              onClick={() => setActiveTab('combo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'combo' ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400' : 'bg-slate-800 text-slate-300'
                }`}
            >
              3. L'Alliance : 1 Mission = 1 Branche + 1 Worktree
            </button>
          </div>

          {/* Rendu dynamique */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 font-mono text-xs text-slate-300 space-y-4">
            {activeTab === 'branch' && (
              <div>
                <span className="text-indigo-400 font-bold block mb-2"># Action : git branch feature/backend-api</span>
                <div className="p-3 bg-slate-900 rounded-lg text-slate-300 space-y-1">
                  <div>📁 Répertoire de travail sur le disque : INCHANGÉ (Toujours un seul dossier <code>taskflow/</code>)</div>
                  <div className="text-emerald-400">✓ Création dans .git : <code>.git/refs/heads/feature/backend-api</code> (41 octets)</div>
                  <div className="text-amber-300">⚠️ Conséquence : Si l'agent veut travailler dessus, il doit faire <code>git switch</code>, ce qui perturbera l'autre agent travaillant dans le même dossier !</div>
                </div>
              </div>
            )}

            {activeTab === 'worktree' && (
              <div>
                <span className="text-blue-400 font-bold block mb-2"># Action : git worktree add ../taskflow-backend feature/backend-api</span>
                <div className="p-3 bg-slate-900 rounded-lg text-slate-300 space-y-1">
                  <div className="text-emerald-400">✓ Nouveau dossier physique créé : <code>/projects/taskflow-backend/</code></div>
                  <div>📄 Fichiers extraits : package.json, README.md, src/... prêts à être modifiés</div>
                  <div>🔗 Fichier spécial .git : un simple fichier texte pointant vers le dépôt central <code>.git/worktrees/taskflow-backend</code></div>
                  <div className="text-emerald-400">✓ HEAD indépendant : pointé sur <code>feature/backend-api</code></div>
                </div>
              </div>
            )}

            {activeTab === 'combo' && (
              <div>
                <span className="text-emerald-400 font-bold block mb-2"># Résultat opérationnel pour l'équipe TaskFlow :</span>
                <div className="p-3 bg-slate-900 rounded-lg text-slate-300 space-y-2">
                  <div className="text-white font-bold">Organisation cible :</div>
                  <div>&bull; <strong>Agent Backend</strong> &rarr; Travaille dans <code>/projects/taskflow-backend</code> sur <code>feature/backend-api</code></div>
                  <div>&bull; <strong>Agent Frontend</strong> &rarr; Travaille dans <code>/projects/taskflow-frontend</code> sur <code>feature/frontend-ui</code></div>
                  <div className="text-emerald-300 font-semibold pt-1">
                    ✓ Isolation totale : Aucun conflit d'édition, serveurs Node/Vite indépendants, index autonomes !
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2.12 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 2
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez votre compréhension de la distinction entre branche et Worktree (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle premier d'une branche Git ?",
              options: [
                "Créer un nouveau répertoire sur le disque dur",
                "Séparer les lignes de développement dans l'historique du projet",
                "Lancer une instance d'agent IA",
                "Dupliquer intégralement le dépôt .git"
              ],
              correctIndex: 1,
              explanation: "Une branche isole une suite de commits dans l'historique logique de Git."
            },
            {
              id: 2,
              question: "Quel est le rôle principal d'un Git Worktree ?",
              options: [
                "Créer une nouvelle branche automatiquement sans commit",
                "Fusionner automatiquement toutes les branches",
                "Fournir un répertoire de travail supplémentaire sur le disque associé à un dépôt",
                "Remplacer le logiciel Git"
              ],
              correctIndex: 2,
              explanation: "Un worktree instancie un dossier physique supplémentaire relié à la base de données Git centrale."
            },
            {
              id: 3,
              question: "Quelle affirmation est rigoureusement exacte ?",
              options: [
                "Une branche est un dossier physique du système d'exploitation",
                "Un Worktree est une branche spéciale",
                "Une branche et un Worktree remplissent des rôles complémentaires et distincts",
                "Une branche et un Worktree désignent la même chose"
              ],
              correctIndex: 2,
              explanation: "La branche gère l'historique logique ; le worktree gère les fichiers sur le disque."
            },
            {
              id: 4,
              question: "Deux Worktrees issus d'un même dépôt partagent-ils les objets Git et l'historique des commits ?",
              options: [
                "Oui, absolument",
                "Non, chacun a son propre historique totalement étanche"
              ],
              correctIndex: 0,
              explanation: "Les objets Git et commits sont stockés dans la base centrale commune."
            },
            {
              id: 5,
              question: "Où sont conservées les modifications non enregistrées (non commitées) d'un Worktree ?",
              options: [
                "Dans tous les Worktrees simultanément",
                "Exclusivement dans le répertoire de travail physique où elles ont été écrites",
                "Uniquement sur GitHub",
                "Dans toutes les branches du projet"
              ],
              correctIndex: 1,
              explanation: "Les fichiers non commités restent locaux à l'espace de fichiers où ils sont modifiés."
            },
            {
              id: 6,
              question: "Peut-on associer une même branche locale active à deux Worktrees simultanément ?",
              options: [
                "Oui, sans aucune restriction",
                "Non, Git l'interdit pour éviter que deux répertoires modifient le même pointeur",
                "Oui, à condition d'avoir deux écrans",
                "Non, car un dépôt ne peut avoir qu'un seul Worktree"
              ],
              correctIndex: 1,
              explanation: "Git empêche de brancher deux worktrees sur la même branche locale active."
            },
            {
              id: 7,
              question: "Pour faire travailler deux agents en parallèle sur des fonctionnalités indépendantes, quelle organisation est la plus adaptée ?",
              options: [
                "Une seule branche et un seul Worktree",
                "Deux branches distinctes associées à deux Worktrees distincts",
                "Créer deux dépôts GitHub payants",
                "Travailler sans Git"
              ],
              correctIndex: 1,
              explanation: "Chaque agent dispose de son propre répertoire (worktree) et de sa propre ligne de commits (branche)."
            },
            {
              id: 8,
              question: "L'exécution de la commande 'git branch feature/test' crée-t-elle automatiquement un nouveau dossier sur le disque ?",
              options: [
                "Oui, un dossier est créé dans le répertoire parent",
                "Non, elle ne crée qu'une référence de 41 octets dans .git/refs/heads"
              ],
              correctIndex: 1,
              explanation: "Créer une branche ne modifie en rien l'arborescence des dossiers sur le disque."
            },
            {
              id: 9,
              question: "Que se passe-t-il lorsqu'un agent enregistre un commit dans son Worktree ?",
              options: [
                "Le commit est ajouté aux données Git partagées du dépôt et fait avancer sa branche",
                "Le commit est envoyé dans un dépôt indépendant",
                "Le commit fusionne immédiatement sur main",
                "Tous les autres worktrees voient leurs fichiers disques modifiés"
              ],
              correctIndex: 0,
              explanation: "Le commit intègre la base commune .git mais ne déplace que le pointeur de la branche liée à ce worktree."
            },
            {
              id: 10,
              question: "Les Worktrees éliminent-ils les risques de conflits lors de la fusion ultérieure des branches ?",
              options: [
                "Oui, les conflits deviennent impossibles",
                "Non, si des modifications concurrentes touchent le même code, un conflit apparaîtra lors du merge"
              ],
              correctIndex: 1,
              explanation: "L'isolation au moment de coder n'empêche pas les conflits logiques lors de l'intégration."
            }
          ]}
        />
      </section>
    </div>
  );
};
