'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  // Simulateur interactif du cycle des 3 zones Git
  const [gitStage, setGitStage] = useState<number>(0);

  const stageStates = [
    {
      title: "1. Fichier modifié dans le Répertoire de Travail",
      location: "Working Directory (Espace local)",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      description: "L'Agent Backend modifie le fichier backend/src/task.service.ts pour ajouter le filtre de tri des tâches. Ce changement existe uniquement sur le disque local.",
      fileStatus: "Modifié (Not Staged)",
      gitCommand: "git status",
      commandOutput: `On branch feature/task-filter
Changes not staged for commit:
  modified:   backend/src/task.service.ts

no changes added to commit (use "git add" to stage)`,
      pmNotice: "Aucun commit n'est créé. Si l'environnement de l'agent est réinitialisé, la modification est perdue."
    },
    {
      title: "2. Sélection dans la Zone de Préparation (Staging)",
      location: "Staging Area (Index)",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      description: "L'Agent Backend exécute 'git add backend/src/task.service.ts'. Le fichier est sélectionné pour faire partie du prochain lot de commit.",
      fileStatus: "Préparé (Staged)",
      gitCommand: "git add backend/src/task.service.ts && git status",
      commandOutput: `On branch feature/task-filter
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   backend/src/task.service.ts`,
      pmNotice: "La modification est figée dans l'index, prête à être scellée avec un message explicite."
    },
    {
      title: "3. Enregistrement dans le Dépôt Local (Commit)",
      location: "Local Repository (.git)",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      description: "L'Agent Backend crée le commit avec un message conventionnel. Un hash SHA unique est généré et l'historique local avance.",
      fileStatus: "Enregistré (Committed)",
      gitCommand: `git commit -m "feat(backend): add task filtering by status"`,
      commandOutput: `[feature/task-filter a8f31c2] feat(backend): add task filtering by status
 1 file changed, 14 insertions(+), 2 deletions(-)
Author: Agent Backend <agent-backend@taskflow.local>`,
      pmNotice: "L'historique est tracé localement. Le commit est immuable et identifiable."
    },
    {
      title: "4. Tentative de Push vers le Dépôt Distant (Contrôle PM)",
      location: "Remote Repository (GitHub / origin)",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      description: "L'agent tente un 'git push origin feature/task-filter'. La règle de sécurité s'active : le push nécessite l'autorisation formelle du Project Manager humain.",
      fileStatus: "En attente d'approbation PM",
      gitCommand: "git push origin feature/task-filter",
      commandOutput: `[GATEKEEPER] 🔒 Action requise : Autorisation souveraine du PM humain.
Statut : Mission au statut 'À vérifier'. En attente d'audit QA et Reviewer.
Push suspendu jusqu'à validation de la Pull Request.`,
      pmNotice: "Règle absolue : aucun merge, rebase ou push n'a lieu sans accord formel du PM humain."
    }
  ];

  const currentStage = stageStates[gitStage];

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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 1 — Comprendre le rôle de Git
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Lorsqu'une équipe est composée de plusieurs développeurs et agents IA intervenant simultanément sur un même projet, le suivi des modifications devient un défi critique. Sans outil adapté, le risque de réécritures non concertées, de pertes de code et d'incohérences techniques est permanent. Git constitue la colonne vertébrale indispensable pour tracer, isoler et contrôler chaque ligne de code produite par les agents.
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
              1. Comprendre la nature distribuée de Git
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguer le système de gestion de versions local des plateformes d'hébergement distantes comme GitHub et GitLab.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Maîtriser le cycle des trois zones de Git
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprendre l'articulation entre le répertoire de travail (Working Tree), la zone de préparation (Staging Area) et le dépôt local (.git).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Délimiter ce que Git fait et ce qu'il ne fait pas
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Intégrer que Git enregistre les modifications mais ne garantit ni la qualité du code, ni la réussite des tests, ni la coordination humaine.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1.2 & 1.3 : QU'EST-CE QUE GIT ET POURQUOI L'UTILISER ?
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.2
            </span>
            Qu'est-ce que Git et pourquoi l'utiliser ?
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Un système de gestion de versions distribué pour structurer le développement
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          <strong>Git est un système de gestion de versions distribué</strong>. Un système de gestion de versions permet d'enregistrer et de suivre les modifications apportées aux fichiers d'un projet au fil du temps. Le terme <em>distribué</em> signifie que chaque intervenant (développeur ou agent) dispose d'une copie intégrale du dépôt, incluant son historique complet, lui permettant de travailler et de créer des commits en local sans dépendre en permanence d'un serveur central.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                <Icon name="history" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                1. Suivi précis et conservation de l'historique
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Chaque état validé du projet est enregistré sous forme de <strong>commit</strong>. Un commit contient un identifiant unique (hash SHA), un auteur déclaré, un horodatage précis et un message décrivant la modification. Dans TaskFlow, cela permet de remonter à n'importe quel stade du développement en cas de régression.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <Icon name="git-branch" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                2. Isolation des travaux grâce aux branches
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Git permet de créer des lignes de développement indépendantes. L'agent Backend peut concevoir la route de suppression de tâche sur une branche dédiée (<code>feature/task-deletion</code>) sans perturber la branche principale <code>main</code> sur laquelle le reste de l'équipe s'appuie.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <Icon name="shield-check" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                3. Comparaison rigoureuse et contrôle des livrables
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Avant d'intégrer une contribution, Git permet de comparer ligne par ligne les ajouts et suppressions (<code>git diff</code>). Dans un système multi-agents, cette capacité est la garantie absolue que le Reviewer et le PM humain peuvent auditer ce qu'un agent a réellement codé.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1.4 : LE FONCTIONNEMENT GÉNÉRAL ET LES 3 ZONES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.4
            </span>
            Comprendre le fonctionnement général : Les trois zones de Git
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Du fichier physique au commit scellé dans l'historique
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour maîtriser Git, il ne faut jamais confondre l'état des fichiers visibles sur votre disque dur et l'historique enregistré. Git articule son fonctionnement autour de <strong>trois zones fondamentales</strong> :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border-l-4 border-l-amber-500 border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                1. Le Répertoire de Travail (Working Directory)
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-100 text-amber-800 shrink-0">
                Fichiers locaux
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Il correspond aux fichiers réels présents dans le dossier de votre projet. Lorsqu'un agent écrit du code dans <code>backend/src/taskService.ts</code>, son contenu change ici. <strong>Cette modification n'est pas encore suivie ni enregistrée dans Git.</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl border-l-4 border-l-blue-500 border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                2. La Zone de Préparation (Staging Area / Index)
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-800 shrink-0">
                git add
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              C'est l'antichambre du commit. Elle permet de sélectionner précisément quelles modifications parmi tous les fichiers modifiés feront partie du prochain enregistrement. Cela permet de créer des commits thématiques et atomiques.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-l-4 border-l-purple-500 border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                3. Le Dépôt Local (Repository / .git)
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-purple-100 text-purple-800 shrink-0">
                git commit
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              C'est la base de données interne de Git, stockée dans le répertoire caché <code>.git</code>. Lorsqu'un commit est créé, les modifications préparées y sont définitivement scellées avec leur métadonnées et leur hash immuable.
            </p>
          </div>
        </div>

        {/* SIMULATEUR INTERACTIF DU WORKFLOW DES 3 ZONES */}
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Interactif — Cycle de Modification dans TaskFlow
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900/80 text-indigo-300 border border-indigo-700">
              Traçabilité Multi-Agents
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Progressez à travers les 4 étapes pour observer comment une modification de code transite du fichier physique jusqu'au contrôle de sécurité par le PM humain :
          </p>

          {/* Stepper des 4 étapes */}
          <div className="flex flex-wrap gap-2 mb-6">
            {stageStates.map((stg, idx) => (
              <button
                key={idx}
                onClick={() => setGitStage(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 ${
                  gitStage === idx
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  idx === 3 ? 'bg-rose-400' :
                  idx === 2 ? 'bg-purple-400' :
                  idx === 1 ? 'bg-blue-400' : 'bg-amber-400'
                }`} />
                Étape {idx + 1}
              </button>
            ))}
          </div>

          {/* Carte de détail */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800/90 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold border ${currentStage.badgeColor}`}>
                  {currentStage.location}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-2">
                  {currentStage.title}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">État du fichier</span>
                <span className="text-xs sm:text-sm font-semibold text-indigo-300">
                  {currentStage.fileStatus}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentStage.description}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-700/80 space-y-2">
              <div className="text-indigo-400 font-bold">$ {currentStage.gitCommand}</div>
              <pre className="text-slate-300 whitespace-pre-wrap">{currentStage.commandOutput}</pre>
            </div>

            <div className="p-3 rounded-lg bg-indigo-950/60 border border-indigo-800/40">
              <span className="text-xs font-bold text-amber-300 block mb-1">
                🔒 Analyse de Gouvernance & Règle PM :
              </span>
              <span className="text-xs text-slate-300">{currentStage.pmNotice}</span>
            </div>

            {/* Navigation rapide */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/80">
              <button
                disabled={gitStage === 0}
                onClick={() => setGitStage(prev => Math.max(0, prev - 1))}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
              >
                ← Étape précédente
              </button>
              <span className="text-xs text-slate-400">
                Étape {gitStage + 1} / {stageStates.length}
              </span>
              <button
                disabled={gitStage === stageStates.length - 1}
                onClick={() => setGitStage(prev => Math.min(stageStates.length - 1, prev + 1))}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
              >
                Étape suivante →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1.5 : GIT ET LES PLATEFORMES D'HÉBERGEMENT
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.5
            </span>
            Distinguer Git des plateformes d'hébergement (GitHub, GitLab)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Le moteur local de versioning vs le serveur de collaboration en ligne
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Une confusion fréquente chez les développeurs débutants consiste à assimiler Git et GitHub. <strong>Git est le logiciel moteur</strong> qui fonctionne en local sur votre machine sans nécessiter d'accès Internet. GitHub ou GitLab sont des <strong>plateformes d'hébergement distantes</strong> qui stockent des dépôts Git et offrent une interface web collaborative.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 text-slate-900 font-bold">
                <tr>
                  <th className="pb-3 pr-4">Élément</th>
                  <th className="pb-3 pr-4">Nature</th>
                  <th className="pb-3">Rôle principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 pr-4 font-semibold text-indigo-700">Git</td>
                  <td className="py-2.5 pr-4">Logiciel CLI local</td>
                  <td className="py-2.5">Gérer les versions, l'historique et les branches localement.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-semibold text-indigo-700">GitHub</td>
                  <td className="py-2.5 pr-4">Plateforme Cloud</td>
                  <td className="py-2.5">Héberger les dépôts distants, gérer les Pull Requests et les issues.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-semibold text-indigo-700">GitLab</td>
                  <td className="py-2.5 pr-4">Plateforme DevOps</td>
                  <td className="py-2.5">Hébergement Git, Merge Requests et pipelines CI/CD intégrés.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-semibold text-indigo-700">Dépôt Local</td>
                  <td className="py-2.5 pr-4">Dossier .git local</td>
                  <td className="py-2.5">Conserver l'historique de travail sur l'environnement de chaque agent.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-semibold text-indigo-700">Dépôt Distant (origin)</td>
                  <td className="py-2.5 pr-4">Serveur central</td>
                  <td className="py-2.5">Point de synchronisation officiel partagé par tous les membres.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1.7 : CE QUE GIT NE FAIT PAS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.7
            </span>
            Ce que Git ne fait pas : Les limites fondamentales
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Comprendre les frontières de l'outil pour éviter les faux sentiments de sécurité
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Git est un outil puissant pour enregistrer et comparer des changements, mais il ne possède aucune intelligence métier. Il ne faut jamais lui attribuer des responsabilités qu'il ne peut pas assumer :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              1. Git ne garantit pas la qualité du code
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Git enregistre fidèlement n'importe quel code, y compris du code buggé, syntaxiquement faux ou dangereux. La validation de la qualité relève des tests et de la revue de code.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              2. Git ne remplace pas les tests automatisés
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Un commit n'exécute aucun test par défaut. Ce sont les outils d'intégration continue (Vitest, Jest) et l'Agent QA qui vérifient que l'application s'exécute correctement.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              3. Git ne remplace pas la coordination humaine
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Git ne décide pas qui doit travailler sur quelle tâche ni quand une fonctionnalité est achevée. C'est le rôle du Team Leader IA et du Project Manager humain.
            </p>
          </div>
        </div>

        <Callout type="danger" title="Règle d'or absolue : Le verrou Git">
          <p className="text-xs sm:text-sm leading-relaxed">
            <strong>Aucun agent IA ni Team Leader ne peut effectuer d'opération de <code>git merge</code>, <code>git rebase</code> ou <code>git push</code> sans l'accord explicite et écrit du Project Manager humain.</strong> Même si l'environnement confère techniquement les droits d'écriture, l'autorité d'intégration reste le monopole exclusif du leadership humain.
          </p>
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 1.9 : SYNTHÈSE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              1.9
            </span>
            Synthèse du Chapitre 1
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/60">
            <h4 className="text-sm font-bold text-indigo-950 mb-1">
              1. Traçabilité immuable
            </h4>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Git permet d'identifier l'auteur, la date et le contenu exact de chaque modification apportée par les agents au fil du développement de TaskFlow.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/60">
            <h4 className="text-sm font-bold text-purple-950 mb-1">
              2. Séparation Répertoire de Travail / Staging / Dépôt
            </h4>
            <p className="text-xs text-purple-900 leading-relaxed">
              Modifier un fichier ne suffit pas : il doit être préparé via <code>git add</code> puis enregistré dans le dépôt local via <code>git commit</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60">
            <h4 className="text-sm font-bold text-emerald-950 mb-1">
              3. Souveraineté du PM humain
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Git est un outil technique d'enregistrement. La gouvernance et la validation des fusions sur les branches partagées restent sous la décision souveraine du PM humain.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1.10 : QUIZ OFFICIEL (9 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 1
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Vérifiez votre compréhension du rôle de Git dans une équipe multi-agents (9 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Qu'est-ce que Git ?",
              options: [
                "Un langage de programmation compilé",
                "Un système de gestion de versions distribué",
                "Une plateforme d'hébergement de sites web statiques",
                "Un outil de création d'interfaces graphiques"
              ],
              correctIndex: 1,
              explanation: "Git est un système de gestion de versions distribué qui permet de suivre l'évolution d'un projet et de conserver son historique complet."
            },
            {
              id: 2,
              question: "Quel est le rôle principal de Git dans un projet logiciel ?",
              options: [
                "Créer automatiquement toutes les fonctionnalités du code",
                "Garantir l'absence totale d'erreurs d'exécution",
                "Suivre les modifications et conserver l'historique du projet",
                "Remplacer les tests logiciels et l'assurance qualité"
              ],
              correctIndex: 2,
              explanation: "Git conserve l'historique des modifications et permet de retrouver les différents états enregistrés du projet."
            },
            {
              id: 3,
              question: "Quelle est la différence fondamentale entre Git et GitHub ?",
              options: [
                "Git est le logiciel de gestion de versions, tandis que GitHub est une plateforme cloud qui héberge des dépôts Git et facilite la collaboration",
                "Git et GitHub sont exactement le même logiciel sous deux noms différents",
                "GitHub est un langage de programmation et Git est son compilateur",
                "Git ne peut fonctionner qu'en étant connecté obligatoirement à GitHub"
              ],
              correctIndex: 0,
              explanation: "Git est l'outil de versioning en ligne de commande. GitHub est un service cloud qui héberge des dépôts Git distants et offre des outils collaboratifs (PR, Issues)."
            },
            {
              id: 4,
              question: "À quoi sert la zone de préparation (staging area ou index) ?",
              options: [
                "À supprimer définitivement les anciennes versions du code",
                "À sélectionner précisément les modifications qui seront incluses dans le prochain commit",
                "À héberger le dépôt distant sur un serveur externe",
                "À exécuter automatiquement les tests unitaires"
              ],
              correctIndex: 1,
              explanation: "La zone de préparation permet de sélectionner les fichiers modifiés que l'on souhaite regrouper dans le prochain commit."
            },
            {
              id: 5,
              question: "Qu'est-ce qu'un commit dans Git ?",
              options: [
                "Une copie complète du projet envoyée sur Internet",
                "Une branche de travail temporaire",
                "Un enregistrement d'un ensemble de modifications dans l'historique Git avec un hash et des métadonnées",
                "Une commande de suppression de fichiers système"
              ],
              correctIndex: 2,
              explanation: "Un commit est un instantané immuable d'un ensemble de modifications préparées, doté d'un identifiant SHA unique et d'un message descriptif."
            },
            {
              id: 6,
              question: "Un agent modifie un fichier dans le répertoire de travail. Cette modification est-elle automatiquement enregistrée dans l'historique Git ?",
              options: [
                "Oui, toute modification sur le disque est automatiquement commitée",
                "Non, elle doit d'abord être préparée (git add) puis enregistrée dans un commit (git commit)",
                "Oui, uniquement si un compte GitHub est connecté",
                "Non, car Git ne prend en charge que les créations de nouveaux fichiers"
              ],
              correctIndex: 1,
              explanation: "Modifier un fichier dans le répertoire de travail ne modifie pas l'historique. Il faut l'ajouter au staging puis créer explicitement un commit."
            },
            {
              id: 7,
              question: "Git garantit-il que le code enregistré dans un commit fonctionne correctement ?",
              options: [
                "Oui, chaque commit est testé et vérifié par Git",
                "Oui, dès lors que le message du commit respecte la convention",
                "Non, Git enregistre le code sans évaluer son fonctionnement ; des vérifications et des tests restent nécessaires",
                "Oui, uniquement si le projet est rédigé en TypeScript"
              ],
              correctIndex: 2,
              explanation: "Git enregistre fidèlement les modifications sans vérifier leur qualité. Des tests unitaires et une revue de code sont indispensables."
            },
            {
              id: 8,
              question: "Quel est l'intérêt premier de Git dans une équipe d'agents IA ?",
              options: [
                "Remplacer le rôle du Team Leader IA",
                "Permettre aux agents de prendre toutes les décisions de fusion sans supervision",
                "Suivre les modifications, isoler les chantiers et faciliter le contrôle des contributions",
                "Supprimer automatiquement tous les conflits de code"
              ],
              correctIndex: 2,
              explanation: "Git offre un cadre rigoureux pour tracer ce que chaque agent modifie et examiner ses livrables avant toute intégration."
            },
            {
              id: 9,
              question: "Dans notre organisation, un agent peut-il effectuer un push simplement parce qu'il possède techniquement les permissions nécessaires ?",
              options: [
                "Oui, toute permission technique constitue une autorisation suffisante",
                "Non, le push nécessite l'autorisation explicite et formelle du Project Manager humain",
                "Oui, à condition que le commit ait été généré par l'Agent Reviewer",
                "Non, car Git interdit nativement l'usage de la commande push"
              ],
              correctIndex: 1,
              explanation: "Les permissions techniques ne remplacent pas les autorisations organisationnelles. Le verrou Git réserve les pushs et merges au PM humain."
            }
          ]}
        />
      </section>
    </div>
  );
};
