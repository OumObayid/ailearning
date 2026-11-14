'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  // Simulateur de coordination parallèle et gestion de ressources
  const [portCollision, setPortCollision] = useState<boolean>(false);
  const [backendPort, setBackendPort] = useState<number>(3000);

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
          Chapitre 6 — Organiser plusieurs travaux en parallèle
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Le travail en parallèle permet de diviser par deux ou trois la durée de livraison d'un sprint sur <strong>TaskFlow</strong>. Mais lancer plusieurs agents dans leurs Worktrees sans ordonnancement rigoureux expose l'équipe à des désynchronisations de contrats d'API, à des blocages de dépendances ou à des collisions de ressources système (ports réseau, bases en mémoire).
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
              1. Identifier les chantiers parallélisables
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguer les missions autonomes sous contrat (ex: UI et API) des missions strictement séquentielles nécessitant un prérequis achevé.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Gérer le partage des ressources physiques (Ports & Services)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Coordonner les variables d'environnement pour éviter que les serveurs locaux de développement entrent en conflit sur la même machine.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Piloter le cycle de vie avec un tableau de bord partagé
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Maintenir une visibilité en temps réel sur les statuts : <em>À faire</em>, <em>En cours</em>, <em>Bloquée</em>, <em>Terminée</em> et <em>À contrôler</em>.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 6.2 & 6.5 : DÉPENDANCES ET CONTRATS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Gérer les dépendances entre chantiers parallèles
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Les trois méthodes pour désamorcer les goulots d'étranglement
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              1. Figer les contrats d'interface avant le lancement
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              L'Architect spécifie les routes d'API, les codes HTTP et les types TypeScript (<code>Task</code>, <code>TaskStatus</code>). Une fois le contrat validé, Backend et Frontend peuvent coder simultanément dans leurs Worktrees respectifs sans attendre l'autre.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              2. Utiliser des mocks et livrables intermédiaires
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              L'Agent Frontend peut simuler les réponses du serveur grâce à un mock local en mémoire, pendant que l'Agent Backend finalise la persistance réelle.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              3. Découpage séquentiel lorsque nécessaire
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Si une brique dépend fondamentalement d'une autre (ex: les tests d'intégration du QA qui nécessitent une route opérationnelle), la mission doit être mise <em>En attente</em> jusqu'à livraison.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR DE COORDINATION ET CONFLIT DE RESSOURCES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur — Gestion des Ressources Système en Parallèle
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Environnement Local TaskFlow
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Les Worktrees isolent les fichiers sur le disque, mais s'exécutent sur la <strong>même machine physique</strong>. Si deux agents lancent un serveur sans coordonner leurs variables d'environnement, une collision de port réseau se produit :
          </p>

          {/* Simulateur interactif de collision de port */}
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">
                  Configuration des serveurs de développement :
                </span>
                <span className="text-xs text-slate-300">
                  Frontend (Vite) : port 3000 &bull; Backend (Express) : port {backendPort}
                </span>
              </div>
              <button
                onClick={() => {
                  if (backendPort === 3000) {
                    setBackendPort(3001);
                    setPortCollision(false);
                  } else {
                    setBackendPort(3000);
                    setPortCollision(true);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${backendPort === 3000
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
              >
                {backendPort === 3000 ? "Corriger le port du Backend (PORT=3001)" : "Provoquer collision (PORT=3000)"}
              </button>
            </div>

            {backendPort === 3000 ? (
              <div className="p-3.5 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-200 text-xs font-mono space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-300">
                  <Icon name="alert-triangle" className="w-4 h-4" />
                  [ERROR: EADDRINUSE] Port 3000 already in use!
                </div>
                <div>L'Agent Backend dans taskflow-backend ne peut pas démarrer son serveur Express car l'Agent Frontend utilise déjà le port 3000 dans taskflow-frontend !</div>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-200 text-xs font-mono space-y-1">
                <div className="font-bold text-emerald-300">✓ Exécution parallèle fluide sans interférence réseau :</div>
                <div>&bull; Frontend UI accessible sur : http://localhost:3000</div>
                <div>&bull; Backend REST API accessible sur : http://localhost:3001</div>
              </div>
            )}
          </div>

          {/* Tableau de bord Kanban */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Tableau de bord de suivi du sprint (Team Leader IA) :
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-white">feature/backend-api (taskflow-backend)</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/80 text-blue-300 border border-blue-700">En cours</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-white">feature/frontend-ui (taskflow-frontend)</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/80 text-blue-300 border border-blue-700">En cours</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-white">test/taskflow-tests (taskflow-qa)</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-900/80 text-amber-300 border border-amber-700">En attente de livraison API</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6.12 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 6
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez vos connaissances sur l'organisation des travaux parallèles (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif premier du travail en parallèle ?",
              options: [
                "Faire réaliser toutes les missions par un seul agent séquentiel",
                "Faire avancer simultanément plusieurs missions suffisamment indépendantes pour réduire le temps de développement",
                "Supprimer définitivement l'historique Git",
                "Éviter toute communication au sein de l'équipe"
              ],
              correctIndex: 1,
              explanation: "Le travail parallèle permet de paralléliser les chantiers indépendants sur des Worktrees distincts."
            },
            {
              id: 2,
              question: "Avant de lancer plusieurs agents en parallèle, que doit impérativement identifier le Team Leader IA ?",
              options: [
                "Uniquement le nombre d'ordinateurs disponibles",
                "Les missions à accomplir et leurs dépendances techniques réciproques",
                "Uniquement les messages des anciens commits",
                "Le nom du fournisseur d'électricité"
              ],
              correctIndex: 1,
              explanation: "Cartographier les dépendances évite que des agents démarrent sur des briques incomplètes."
            },
            {
              id: 3,
              question: "Quelle organisation est la plus saine pour plusieurs missions indépendantes ?",
              options: [
                "Une seule branche et un seul Worktree partagé par tous",
                "Une branche et un Worktree dédiés pour chaque mission indépendante",
                "Un dépôt distant différent pour chaque fichier TypeScript",
                "Travailler sans branches"
              ],
              correctIndex: 1,
              explanation: "Isoler 1 mission par couple (branche, worktree) prévient toute interférence physique ou logique."
            },
            {
              id: 4,
              question: "Pourquoi est-il crucial de figer le contrat de l'API REST avant de lancer Backend et Frontend en parallèle ?",
              options: [
                "Pour éviter que les deux développements produisent des interfaces incompatibles",
                "Pour empêcher la création de nouveaux commits",
                "Pour supprimer automatiquement les Worktrees",
                "Pour dispenser le QA de tester"
              ],
              correctIndex: 0,
              explanation: "Le contrat fixe le format des données échangées, permettant au Frontend de coder sans attendre la fin du backend."
            },
            {
              id: 5,
              question: "Une mission peut-elle démarrer en parallèle si elle dépend d'un livrable Backend non encore finalisé ?",
              options: [
                "Oui, sans aucune condition",
                "Non, jamais de la vie",
                "Oui, si les informations de contrat intermédiaires ou des mocks de données sont disponibles et suffisants",
                "Uniquement si l'agent utilise la même branche"
              ],
              correctIndex: 2,
              explanation: "Grâce aux mocks et contrats d'interface, un agent Frontend peut avancer même si la persistance réelle n'est pas codée."
            },
            {
              id: 6,
              question: "Quel est le rôle du Team Leader IA pendant le travail parallèle ?",
              options: [
                "Coordonner les missions, arbitrer les dépendances et suivre l'avancement global",
                "Modifier tous les fichiers de code à la place des développeurs",
                "Supprimer les branches après chaque commit",
                "Remplacer les tests automatisés"
              ],
              correctIndex: 0,
              explanation: "Le Team Leader supervise le flux de travail et lève les blocages d'organisation."
            },
            {
              id: 7,
              question: "Deux agents travaillant dans des Worktrees distincts peuvent-ils entrer en conflit de port réseau sur la machine locale ?",
              options: [
                "Oui, s'ils tentent tous les deux d'écouter sur le même port (ex: 3000)",
                "Non, les Worktrees virtualisent automatiquement la carte réseau"
              ],
              correctIndex: 0,
              explanation: "Un worktree n'est pas une machine virtuelle : les ports réseau du système d'exploitation sont partagés."
            },
            {
              id: 8,
              question: "Que signifie le statut 'Bloquée' dans le tableau de bord de coordination ?",
              options: [
                "Que la tâche a été validée par le PM",
                "Qu'un problème technique, un refus de permission ou une dépendance manquante empêche l'avancement",
                "Que le code est prêt à être déployé",
                "Que le dossier du worktree a été effacé"
              ],
              correctIndex: 1,
              explanation: "Ce statut alerte immédiatement le Team Leader pour débloquer l'agent sans forçage de règles."
            },
            {
              id: 9,
              question: "Pourquoi faut-il éviter de sur-paralléliser le projet en multipliant excessivement les agents ?",
              options: [
                "Parce que Git bloque à partir de 3 branches",
                "Parce que cela engendre un coût de coordination disproportionné sans gain réel de vélocité",
                "Parce que les fichiers ne peuvent contenir qu'un seul mot",
                "Parce que les agents refusent de travailler en groupe"
              ],
              correctIndex: 1,
              explanation: "Trop d'agents simultanés crée de la confusion, multiplie les échanges et augmente les risques d'incompatibilité."
            },
            {
              id: 10,
              question: "Le fait de travailler en parallèle dans des Worktrees autorise-t-il les agents à merger leurs branches en toute autonomie ?",
              options: [
                "Oui, car leurs dossiers étaient séparés",
                "Non, les autorisations de fusion et de push sur main restent le monopole exclusif du PM humain"
              ],
              correctIndex: 1,
              explanation: "L'autonomie de développement n'est pas une autonomie de livraison. Le PM humain valide chaque intégration."
            }
          ]}
        />
      </section>
    </div>
  );
};
