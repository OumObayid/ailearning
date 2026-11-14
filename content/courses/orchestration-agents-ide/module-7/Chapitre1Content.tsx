'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  // Simulateur interactif : Les 6 Responsabilités Majeures du Team Leader
  const [selectedPillar, setSelectedPillar] = useState<'organize' | 'coordinate' | 'track' | 'handle_issues' | 'check_consistency' | 'report_pm'>('coordinate');

  const pillars = {
    organize: {
      title: "1. Organiser le Travail",
      roleText: "Vérifier que les missions sont prêtes, que les dépendances sont cartographiées et que chaque agent spécialiste dispose des prérequis indispensables avant d'engager son temps de calcul.",
      taskflowAction: "Validation du document de cadrage avant de solliciter l'Architect pour la spécification du contrat REST.",
      badge: "Cadrage"
    },
    coordinate: {
      title: "2. Coordonner les Agents Spécialisés",
      roleText: "Faire circuler les contrats d'interface, synchroniser les travaux parallèles (Backend & Frontend) et éviter les modifications concurrentes sur les mêmes fichiers.",
      taskflowAction: "Diffusion immédiate du contrat REST validé docs/architecture/api-contracts.md au Backend, au Frontend et au QA.",
      badge: "Synchronisation"
    },
    track: {
      title: "3. Suivre l'Avancement Réel",
      roleText: "Maintenir le tableau de bord des états organisationnels (Prête, Lancée, En cours, Bloquée, À vérifier, Validée) en exigeant des preuves tangibles plutôt que de simples déclarations.",
      taskflowAction: "Contrôle des fichiers modifiés et des commandes de tests unitaires exécutées par l'Agent Backend.",
      badge: "Supervision"
    },
    handle_issues: {
      title: "4. Gérer les Difficultés & Blocages",
      roleText: "Détecter les goulots d'étranglement, lever les ambiguïtés techniques, arbitrer les dépendances et orienter les anomalies vers le bon responsable.",
      taskflowAction: "Résolution d'un désaccord entre Backend et Frontend sur la structure de l'objet JSON retourné lors du changement de statut.",
      badge: "Résolution"
    },
    check_consistency: {
      title: "5. Contrôler la Cohérence des Résultats",
      roleText: "Vérifier que les livrables individuels s'assemblent harmonieusement sans régression, sans transgression de typage et dans le strict respect de la charte projet.",
      taskflowAction: "Vérification croisée : le Frontend utilise les statuts 'todo', 'in_progress', 'done' exactement tels que validés par l'API Backend.",
      badge: "Qualité"
    },
    report_pm: {
      title: "6. Rendre Compte au Project Manager Humain",
      roleText: "Présenter une synthèse objective de l'avancement, formaliser les options d'arbitrage stratégique et solliciter les autorisations sensibles réservées.",
      taskflowAction: "Transmission de la demande d'approbation humaine pour le merge de la Pull Request de changement de statut.",
      badge: "Gouvernance"
    }
  };

  const activePillarData = pillars[selectedPillar];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 7 &bull; Chapitre 1
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Pilotage, Coordination & Limites
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          7.1 — Comprendre le rôle du Team Leader dans l'orchestration
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Distribuer des missions ne suffit pas à garantir le succès d'un projet logiciel : encore faut-il orchestrer l'exécution collective, synchroniser les dépendances, suivre la progression réelle et veiller à la cohérence des livrables. Le Team Leader IA est le chef d'orchestre opérationnel de l'équipe, assurant la liaison entre la vision souveraine du Project Manager humain et le travail technique des agents spécialisés.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle d'or de la gouvernance et de la souveraineté Git :</p>
        <p>
          Le Team Leader IA coordonne et supervise, mais ne dispose d'aucun pouvoir discrétionnaire pour modifier les objectifs stratégiques du projet. En particulier, <strong>aucun agent ni le Team Leader ne peut exécuter de <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans autorisation formelle et écrite du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1.2 & 1.3 : La place du Team Leader et des spécialistes */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="users" className="w-5 h-5 text-primary-600 shrink-0" /> 1. La Place Charnière du Team Leader dans l'Équipe</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Pour préserver l'efficacité du collectif, la distinction entre gouvernance humaine, coordination et exécution technique doit être absolue :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Project Manager Humain (Gouvernance & Arbitrage)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 font-mono shrink-0">Décision souveraine</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Définit les orientations stratégiques, valide les évolutions de périmètre, arbitre les désaccords majeurs et octroie les autorisations sensibles (notamment les opérations Git distantes).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Team Leader IA (Coordination & Supervision)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 font-mono shrink-0">Chef d'orchestre</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Reçoit les objectifs, planifie les dépendances, distribue les prompts de mission, supervise les espaces de travail, résout les blocages intermédiaires et consolide les comptes rendus. Ne modifie pas le code source d'implémentation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Agents Spécialistes (Exécution Technique Dédiée)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-mono shrink-0">Experts métiers</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              <strong>Architect</strong> (contrat API REST), <strong>Backend</strong> (routes Express), <strong>Frontend</strong> (UI React), <strong>QA</strong> (tests automatisés), <strong>Reviewer</strong> (revue indépendante de code). Chacun opère strictement dans son périmètre de fichiers.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1.5 : Coordination vs Supervision vs Exécution */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="adjustments-horizontal" className="w-5 h-5 text-indigo-600 shrink-0" /> 2. Distinguer Coordination, Supervision et Exécution</h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">Coordination : Organiser les interactions</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Exemple TaskFlow : Faire travailler simultanément l'Agent Backend et l'Agent Frontend à partir du même contrat REST figé par l'Architect.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-purple-700 dark:text-purple-400">Supervision : Suivre et contrôler l'avancement</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Exemple TaskFlow : Examiner les comptes rendus, auditer les résultats des tests Vitest et vérifier la cohérence des critères d'acceptation.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">Exécution : Réaliser l'activité technique concrète</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Exemple TaskFlow : Développer le contrôleur Express <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">taskController.ts</code> ou coder le composant React <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">TaskItem.tsx</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Tour de Contrôle &bull; Team Leader Workbench
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Les 6 Piliers d'Orchestration du Team Leader
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Explorez les 6 responsabilités majeures exercées par le Team Leader pendant le cycle de vie d'une fonctionnalité.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Sélectionnez une responsabilité clé :</span>
          {(Object.keys(pillars) as Array<keyof typeof pillars>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedPillar(key)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                selectedPillar === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {pillars[key].title}
            </button>
          ))}
        </div>

        {/* Détail de la responsabilité */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Mission du pilier :</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 shrink-0">
              {activePillarData.badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
            {activePillarData.roleText}
          </p>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Mise en œuvre concrète sur TaskFlow :
            </span>
            <p className="text-xs sm:text-sm font-mono text-indigo-700 dark:text-indigo-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              {activePillarData.taskflowAction}
            </p>
          </div>
        </div>
      </div>

      {/* Quiz officiel */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Évaluation des connaissances
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de validation du Chapitre 1
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre maîtrise du rôle du Team Leader, de la distinction avec les spécialistes et de la relation avec le Project Manager humain.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal du Team Leader dans une équipe d'agents IA ?",
              options: [
                "Réaliser personnellement toutes les tâches techniques.",
                "Coordonner et superviser le travail des agents.",
                "Remplacer le Project Manager humain.",
                "Développer uniquement la partie backend."
              ],
              correctIndex: 1,
              explanation: "Le Team Leader organise les interventions, suit leur progression et veille à la cohérence des résultats. Les agents spécialisés réalisent les missions techniques qui leur sont confiées."
            },
            {
              id: 2,
              question: "Quelle activité correspond à la coordination ?",
              options: [
                "Organiser les interventions de plusieurs agents.",
                "Écrire directement tous les tests.",
                "Modifier le code du Frontend.",
                "Valider définitivement le projet."
              ],
              correctIndex: 0,
              explanation: "La coordination consiste à organiser les travaux, leurs dépendances et les échanges nécessaires. L'exécution du code relève des agents spécialisés."
            },
            {
              id: 3,
              question: "Qui est principalement responsable du développement de la route API TaskFlow ?",
              options: [
                "Le Project Manager humain.",
                "Le Team Leader.",
                "L'agent Backend.",
                "L'agent Reviewer."
              ],
              correctIndex: 2,
              explanation: "Le Backend est responsable du développement de la partie serveur, notamment de la route API. Le Team Leader supervise la mission sans se substituer à cet agent."
            },
            {
              id: 4,
              question: "Le Backend modifie le format d'une réponse API. Que doit faire le Team Leader ?",
              options: [
                "Ignorer la modification si le Backend est spécialisé.",
                "Demander au Frontend de continuer avec l'ancien format.",
                "Modifier lui-même tous les composants concernés.",
                "Organiser la communication avec les agents concernés et vérifier la cohérence des travaux."
              ],
              correctIndex: 3,
              explanation: "Une modification du contrat API peut avoir des conséquences sur le Frontend et le QA. Le Team Leader doit organiser la communication et s'assurer que les agents travaillent sur une référence cohérente."
            },
            {
              id: 5,
              question: "Quel élément permet au Team Leader de suivre correctement une mission ?",
              options: [
                "Uniquement la déclaration de l'agent indiquant qu'il a terminé.",
                "Les comptes rendus et les éléments vérifiables disponibles.",
                "Le nombre de messages échangés.",
                "La durée estimée de la mission uniquement."
              ],
              correctIndex: 1,
              explanation: "Un agent peut déclarer une mission terminée sans que tous les résultats aient été vérifiés. Le Team Leader doit examiner les livrables et les preuves disponibles."
            },
            {
              id: 6,
              question: "Le QA détecte une anomalie dans le backend. Quel est le rôle du Team Leader ?",
              options: [
                "Organiser le traitement de l'anomalie avec l'agent responsable.",
                "Demander au QA de modifier systématiquement le backend.",
                "Supprimer le test qui révèle le problème.",
                "Déclarer la mission terminée."
              ],
              correctIndex: 0,
              explanation: "Le QA identifie et documente le problème. Le Team Leader organise son attribution à l'agent compétent et suit sa résolution."
            },
            {
              id: 7,
              question: "Le Team Leader peut-il effectuer un merge sans autorisation explicite du Project Manager humain dans TaskFlow ?",
              options: [
                "Oui, dès que le Reviewer donne son accord.",
                "Oui, si les tests passent.",
                "Non, cette opération nécessite une autorisation explicite.",
                "Oui, s'il estime que le travail est urgent."
              ],
              correctIndex: 2,
              explanation: "Dans le projet TaskFlow, aucun merge, rebase ou push ne doit être effectué sans autorisation explicite du Project Manager humain. La réussite des tests ou l'accord du Reviewer ne remplacent pas cette autorisation."
            },
            {
              id: 8,
              question: "Quelle est la responsabilité principale du Reviewer ?",
              options: [
                "Coordonner toutes les conversations.",
                "Examiner les modifications et signaler les problèmes.",
                "Définir les objectifs commerciaux du projet.",
                "Distribuer toutes les missions."
              ],
              correctIndex: 1,
              explanation: "Le Reviewer réalise une revue indépendante du travail. Il identifie les écarts, les risques et les améliorations nécessaires. Il ne remplace ni le Team Leader ni le QA."
            },
            {
              id: 9,
              question: "Le contrat API doit être modifié et cette modification nécessite une décision importante. Que doit faire le Team Leader ?",
              options: [
                "Imposer immédiatement sa propre solution.",
                "Demander au Frontend de choisir seul.",
                "Ignorer le problème jusqu'à la fin du projet.",
                "Préparer les informations nécessaires et solliciter le Project Manager humain pour la décision."
              ],
              correctIndex: 3,
              explanation: "Le Team Leader peut organiser l'analyse technique et présenter les conséquences des différentes options. La décision importante reste sous la responsabilité du Project Manager humain."
            },
            {
              id: 10,
              question: "Quelle affirmation décrit correctement la relation entre le Team Leader et les agents spécialisés ?",
              options: [
                "Le Team Leader organise leur travail et les agents réalisent les missions correspondant à leurs responsabilités.",
                "Le Team Leader réalise obligatoirement toutes les missions avant les agents.",
                "Les agents spécialisés décident seuls des objectifs du projet.",
                "Le Team Leader n'a aucun rôle après la distribution des missions."
              ],
              correctIndex: 0,
              explanation: "L'orchestration repose sur une répartition claire des rôles. Le Team Leader assure la coordination et la supervision, tandis que les agents spécialisés réalisent leurs missions respectives."
            }
          ]}
        />
      </div>
    </div>
  );
};
