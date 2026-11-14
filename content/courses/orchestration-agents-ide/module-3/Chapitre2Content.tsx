'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  // Simulateur interactif des commandes d'échanges (fetch, pull, push)
  const [selectedAction, setSelectedAction] = useState<'fetch' | 'pull' | 'push'>('fetch');

  const exchangeDetails = {
    fetch: {
      title: "git fetch origin — Récupérer les informations sans modifier le code local",
      color: "border-blue-300 bg-blue-50/70",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      badge: "Observation sécurisée",
      command: "git fetch origin",
      description: "Télécharge tous les nouveaux commits et branches depuis GitHub/GitLab vers les références locales (ex: origin/main). Aucun fichier du répertoire de travail local n'est modifié.",
      impactLocal: "Branche locale 'main' inchangée. Référence 'origin/main' mise à jour.",
      impactFiles: "Zéro modification sur le code en cours de développement.",
      riskLevel: "Aucun risque. Recommandé aux agents avant d'auditer les modifications distantes."
    },
    pull: {
      title: "git pull origin main — Récupérer ET intégrer immédiatement",
      color: "border-amber-300 bg-amber-50/70",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      badge: "Intégration directe",
      command: "git pull origin main",
      description: "Exécute en coulisses un 'git fetch' suivi immédiatement d'un 'git merge' (ou rebase) dans la branche locale active. Modifie directement les fichiers du projet.",
      impactLocal: "La branche locale avance pour intégrer les commits distants.",
      impactFiles: "Les fichiers du disque sont mis à jour ; risque immédiat de conflits si du code local non commité existe.",
      riskLevel: "Modéré à élevé. Ne doit jamais être exécuté à l'aveugle par un agent en plein sprint."
    },
    push: {
      title: "git push origin main — Transmettre les commits locaux vers le serveur",
      color: "border-rose-300 bg-rose-50/70",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      badge: "Publication sous verrou PM",
      command: "git push origin main",
      description: "Envoie les commits enregistrés dans le dépôt local vers le dépôt distant partagé, les rendant visibles par toute l'équipe.",
      impactLocal: "La branche distante s'aligne sur la branche locale.",
      impactFiles: "Le code est publié officiellement sur le dépôt central.",
      riskLevel: "Critique. Règle absolue du cours : soumis à l'autorisation formelle du Project Manager humain."
    }
  };

  const currentDetail = exchangeDetails[selectedAction];

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
          Chapitre 2 — Comprendre les dépôts et les versions d'un projet
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Dans une organisation multi-agents, chaque intervenant travaille dans son propre espace de fichiers. Pour que l'équipe collabore efficacement sur l'application <strong>TaskFlow</strong>, il est fondamental de comprendre où les versions sont stockées, comment fonctionne un dépôt local par rapport à un dépôt distant, et comment les données transitent via les commandes <code>fetch</code>, <code>pull</code> et <code>push</code>.
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
              1. Différencier Dépôt Local et Dépôt Distant
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprendre qu'un dépôt local possède son propre historique autonome et n'est jamais synchronisé automatiquement avec le serveur distant.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Initialiser et Cloner un projet (git init vs git clone)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Savoir quand créer un nouveau dépôt à partir de zéro et quand récupérer un projet existant avec sa configuration distante <code>origin</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Maîtriser le triptyque fetch / pull / push
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguer l'observation sans risque (<code>fetch</code>), l'intégration locale (<code>pull</code>) et la publication officielle sous contrôle PM (<code>push</code>).
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2.2 & 2.3 : DÉPÔT LOCAL ET DÉPÔT DISTANT
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Qu'est-ce qu'un dépôt Git ? Local vs Distant
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            L'architecture distribuée de conservation des instantanés de code
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Un <strong>dépôt Git</strong> (repository) est un espace structuré qui contient l'ensemble des fichiers suivis, l'historique complet des commits, les branches et les métadonnées de configuration. Les données internes de gestion de versions sont stockées dans le dossier caché <code>.git</code>.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                Le Dépôt Local (Environnement de l'agent)
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-800 shrink-0">
                Machine locale
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              C'est le dépôt situé sur le poste de travail ou l'environnement de l'agent. Il permet de travailler en toute autonomie (créer des branches, créer des commits, inspecter l'historique) sans connexion Internet permanente.
            </p>
            <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700">
              Exemple : L'agent Backend commite ses modifications de contrôleur en local. Ces commits ne sont pas visibles par l'agent Frontend tant qu'ils ne sont pas partagés.
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                Le Dépôt Distant (origin / Serveur partagé)
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-purple-100 text-purple-800 shrink-0">
                GitHub / GitLab
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              C'est le dépôt hébergé sur un serveur réseau central accessible par tous les membres de l'équipe. Il sert de référence commune et de passerelle d'échange pour consolider les contributions.
            </p>
            <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700">
              Exemple : Le dépôt distant héberge la branche 'main' officielle de TaskFlow protégée par le Project Manager humain.
            </div>
          </div>
        </div>

        {/* Tableau comparatif */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-900 font-bold">
              <tr>
                <th className="pb-3 pr-4">Critère</th>
                <th className="pb-3 pr-4">Dépôt Local</th>
                <th className="pb-3">Dépôt Distant (origin)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Emplacement</td>
                <td className="py-2.5 pr-4">Poste local / Environnement de l'agent</td>
                <td className="py-2.5">Serveur distant accessible par réseau</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Création de commits</td>
                <td className="py-2.5 pr-4">Immédiate et autonome</td>
                <td className="py-2.5">Reçoit les commits via l'opération push</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Synchronisation</td>
                <td className="py-2.5 pr-4">Manuelle et explicite (fetch/pull)</td>
                <td className="py-2.5">Point central d'échange pour l'équipe</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Travail hors ligne</td>
                <td className="py-2.5 pr-4">Totalement possible</td>
                <td className="py-2.5">Inaccessible sans réseau</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2.6 & 2.7 : GIT INIT VS GIT CLONE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 2 </span>
            Initialiser ou cloner un projet : git init vs git clone
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Démarrer un nouveau projet ou rejoindre un dépôt existant
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                1. Initialiser un nouveau projet avec git init
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-slate-100 text-slate-800 shrink-0">
                Nouveau projet
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Lorsque vous créez un projet à partir de zéro, vous initialisez un dépôt Git vide dans le dossier courant :
            </p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-200 space-y-1">
              <div className="text-emerald-400">$ mkdir taskflow && cd taskflow</div>
              <div className="text-indigo-400">$ git init</div>
              <div className="text-slate-400">Initialized empty Git repository in /taskflow/.git/</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Note : <code>git init</code> ne crée pas de dépôt distant et ne suit aucun fichier par défaut. Il faut ajouter des fichiers via <code>git add</code> puis créer un premier commit.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                2. Récupérer un projet existant avec git clone
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-indigo-100 text-indigo-800 shrink-0">
                Dépôt existant
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Lorsqu'un agent rejoint un projet hébergé sur une plateforme, il télécharge une copie locale complète avec tout son historique :
            </p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-200 space-y-1">
              <div className="text-emerald-400">$ git clone https://github.com/organization/taskflow.git</div>
              <div className="text-slate-400">Cloning into 'taskflow'...</div>
              <div className="text-slate-400">Receiving objects: 100% (450/450), done.</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Avantage : <code>git clone</code> configure automatiquement une référence distante nommée <strong>origin</strong> pointant vers le serveur GitHub.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2.9 : LES ÉCHANGES ENTRE DÉPÔTS (FETCH, PULL, PUSH)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 3 </span>
            Comprendre les échanges entre dépôts : fetch, pull et push
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Les trois commandes cardinales pour synchroniser les environnements
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour échanger des informations entre le dépôt local d'un agent et le dépôt distant commun, Git fournit trois commandes aux effets très différents :
        </p>

        {/* SIMULATEUR D'ÉCHANGES INTERACTIF */}
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur Interactif — Console d'Échange Git
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Synchronisation Multi-Agents
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Sélectionnez une commande Git pour inspecter son fonctionnement, ses conséquences sur les fichiers locaux et son niveau de risque :
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedAction('fetch')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedAction === 'fetch'
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              1. git fetch origin
            </button>
            <button
              onClick={() => setSelectedAction('pull')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedAction === 'pull'
                  ? 'bg-amber-600 text-white shadow-lg ring-2 ring-amber-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              2. git pull origin main
            </button>
            <button
              onClick={() => setSelectedAction('push')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedAction === 'push'
                  ? 'bg-rose-600 text-white shadow-lg ring-2 ring-rose-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              3. git push origin main
            </button>
          </div>

          {/* Panneau de détail */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800/90 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold border ${currentDetail.badgeColor}`}>
                  {currentDetail.badge}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-2">
                  {currentDetail.title}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Niveau de vigilance</span>
                <span className="text-xs sm:text-sm font-semibold text-rose-300">
                  {currentDetail.riskLevel}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentDetail.description}
            </p>

            <div className="grid grid-cols-1 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-700/60">
                <span className="text-xs font-bold text-indigo-300 block mb-1">
                  📁 Impact sur le Répertoire de Travail :
                </span>
                <span className="text-xs text-slate-300">{currentDetail.impactFiles}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-700/60">
                <span className="text-xs font-bold text-amber-300 block mb-1">
                  🌿 Impact sur les Branches Locales :
                </span>
                <span className="text-xs text-slate-300">{currentDetail.impactLocal}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2.11 : BONNES PRATIQUES & VERROU PM
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 4 </span>
            Bonnes pratiques pour gérer les dépôts et les versions
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              1. Privilégier git fetch avant git pull
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Toujours exécuter <code>git fetch</code> pour inspecter les nouveautés du dépôt distant avant de décider d'une fusion. Cela évite d'écraser du travail en cours par surprise.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              2. Ne jamais supposer la synchronisation automatique
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Ce n'est pas parce que l'Agent Backend a créé un commit sur sa machine que l'Agent Frontend le voit. Les échanges doivent être explicites.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              3. Respecter le verrouillage du git push
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              La commande <code>git push</code> vers une branche partagée est interdite aux agents sans le feu vert écrit du Project Manager humain.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2.13 : QUIZ OFFICIEL (9 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 2
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez vos connaissances sur les dépôts locaux, distants et les versions (9 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'un dépôt Git ?",
              options: [
                "Un simple dossier contenant des fichiers sans historique",
                "Un espace permettant de conserver les fichiers suivis et les informations de gestion de versions",
                "Une plateforme de discussion en ligne entre développeurs",
                "Un outil de test logiciel automatisé"
              ],
              correctIndex: 1,
              explanation: "Un dépôt Git conserve les fichiers suivis ainsi que toutes les métadonnées nécessaires à la gestion des versions et de l'historique dans le dossier .git."
            },
            {
              id: 2,
              question: "Quelle est la principale différence entre un dépôt local et un dépôt distant ?",
              options: [
                "Le dépôt local conserve uniquement les fichiers et le distant uniquement les commits",
                "Le dépôt local est utilisé dans un environnement de travail, tandis que le dépôt distant permet notamment de partager les modifications entre plusieurs environnements",
                "Le dépôt local ne permet jamais de créer des commits",
                "Le dépôt distant ne possède aucun historique"
              ],
              correctIndex: 1,
              explanation: "Le dépôt local fonctionne sur la machine de l'agent en toute autonomie. Le dépôt distant sert de plateforme d'échange et de sauvegarde partagée."
            },
            {
              id: 3,
              question: "Quelle commande permet d'initialiser un nouveau dépôt Git vide dans un répertoire existant ?",
              options: [
                "git clone",
                "git push",
                "git init",
                "git fetch"
              ],
              correctIndex: 2,
              explanation: "git init initialise un nouveau dépôt Git local dans le répertoire courant."
            },
            {
              id: 4,
              question: "Quelle commande permet de récupérer une copie locale intégrale d'un dépôt distant existant ?",
              options: [
                "git clone",
                "git commit",
                "git merge",
                "git status"
              ],
              correctIndex: 0,
              explanation: "git clone télécharge l'historique complet d'un dépôt distant et configure le lien 'origin' vers le serveur."
            },
            {
              id: 5,
              question: "Dans Git, à quoi correspond une version enregistrée dans l'historique ?",
              options: [
                "À un fichier obligatoirement compressé en .zip",
                "À un état du projet représenté par un commit",
                "À une copie automatiquement publiée sur GitHub",
                "À une nouvelle branche obligatoirement créée"
              ],
              correctIndex: 1,
              explanation: "Dans Git, une version enregistrée correspond à un snapshot (instantané) représenté par un commit dans l'arbre d'historique."
            },
            {
              id: 6,
              question: "Quelle est la fonction principale de la commande git fetch ?",
              options: [
                "Supprimer tous les commits locaux",
                "Récupérer les informations et les commits distants sans les intégrer automatiquement dans la branche courante",
                "Transmettre les commits locaux vers le dépôt distant",
                "Créer un nouveau dépôt vierge"
              ],
              correctIndex: 1,
              explanation: "git fetch met à jour les références distantes (origin/main) sans toucher aux fichiers du répertoire de travail local."
            },
            {
              id: 7,
              question: "Quelle est la différence majeure entre git fetch et git pull ?",
              options: [
                "Les deux commandes ont un comportement rigoureusement identique",
                "git fetch récupère les informations distantes sans modifier le code local, tandis que git pull récupère et fusionne immédiatement dans la branche courante",
                "git pull crée un nouveau dépôt local",
                "git fetch envoie les commits vers le serveur distant"
              ],
              correctIndex: 1,
              explanation: "git pull combine un fetch et un merge immédiat, risquant de créer des conflits sur le code local."
            },
            {
              id: 8,
              question: "À quoi sert la commande git push ?",
              options: [
                "À récupérer une copie du dépôt distant",
                "À consulter les modifications non préparées",
                "À transmettre les commits locaux vers un dépôt distant",
                "À supprimer une branche locale"
              ],
              correctIndex: 2,
              explanation: "git push publie les commits enregistrés localement sur une branche du dépôt distant."
            },
            {
              id: 9,
              question: "Deux agents disposent chacun d'un dépôt local issu du même dépôt distant. Leurs dépôts sont-ils automatiquement synchronisés en temps réel ?",
              options: [
                "Oui, chaque modification locale est instantanément répliquée chez l'autre",
                "Non, chaque dépôt local est indépendant ; les échanges doivent être réalisés explicitement via push et fetch/pull",
                "Oui, si les deux agents utilisent le même langage de programmation",
                "Non, car Git interdit d'avoir plus d'un clone d'un même projet"
              ],
              correctIndex: 1,
              explanation: "Git est distribué et asynchrone : chaque dépôt local conserve son propre état jusqu'à un échange explicite."
            }
          ]}
        />
      </section>
    </div>
  );
};
