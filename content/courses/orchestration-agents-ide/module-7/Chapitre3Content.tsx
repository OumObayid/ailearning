'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur interactif : Contrôle des 6 Conditions de Démarrage
  const [selectedCheckMission, setSelectedCheckMission] = useState<'m1_architect' | 'm2_backend_blocked' | 'm2_backend_ready'>('m2_backend_blocked');

  const checkMissions = {
    m1_architect: {
      title: "M1 — Spécification du Contrat REST (Architect)",
      status: "PRÊTE AU LANCEMENT",
      statusClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300",
      checks: [
        { label: "1. Définition claire", ok: true, detail: "Besoin utilisateur clarifié (modification de statut)." },
        { label: "2. Informations disponibles", ok: true, detail: "Cahier des charges et énumérations des statuts fournis." },
        { label: "3. Dépendances satisfaites", ok: true, detail: "Tâche racine : aucune dépendance technique préalable." },
        { label: "4. Espace de travail", ok: true, detail: "Dépôt TaskFlow, dossier docs/architecture/." },
        { label: "5. Permissions", ok: true, detail: "Lecture projet et écriture réservée à docs/." },
        { label: "6. Critères d'acceptation", ok: true, detail: "Format d'API documenté avec codes HTTP 200, 400, 404." }
      ],
      decision: "Démarrage immédiat autorisé dans la conversation dédiée de l'Architect."
    },
    m2_backend_blocked: {
      title: "M2 — Implémentation Route API Backend (Avant validation du contrat)",
      status: "DÉMARRAGE BLOQUÉ — EN ATTENTE",
      statusClass: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300",
      checks: [
        { label: "1. Définition claire", ok: true, detail: "Objectif compris : développer la route de changement de statut." },
        { label: "2. Informations disponibles", ok: false, detail: "Le contrat technique n'est pas encore finalisé par l'Architect !" },
        { label: "3. Dépendances satisfaites", ok: false, detail: "Dépendance obligatoire non satisfaite (attend M1)." },
        { label: "4. Espace de travail", ok: true, detail: "Worktree backend/ configuré." },
        { label: "5. Permissions", ok: true, detail: "Profil Default Sandbox avec interdiction de push." },
        { label: "6. Critères d'acceptation", ok: false, detail: "Schéma JSON exact encore indéterminé." }
      ],
      decision: "Lancement de l'implémentation suspendu. Seule une étude exploratoire du code existant peut être tolérée."
    },
    m2_backend_ready: {
      title: "M2 — Implémentation Route API Backend (Après livraison de M1)",
      status: "PRÊTE AU LANCEMENT PARALLÈLE",
      statusClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300",
      checks: [
        { label: "1. Définition claire", ok: true, detail: "Mandat précis sur PATCH /api/tasks/:id/status." },
        { label: "2. Informations disponibles", ok: true, detail: "Contrat docs/architecture/api-contracts.md transmis." },
        { label: "3. Dépendances satisfaites", ok: true, detail: "M1 validé et disponible." },
        { label: "4. Espace de travail", ok: true, detail: "Worktree dédié sur branche feat/backend-status." },
        { label: "5. Permissions", ok: true, detail: "Permissions Sandbox confirmées." },
        { label: "6. Critères d'acceptation", ok: true, detail: "Tests Vitest et retour HTTP 200/400/404 exigés." }
      ],
      decision: "Feu vert accordé : l'Agent Backend peut démarrer en simultané avec l'Agent Frontend."
    }
  };

  const activeCheck = checkMissions[selectedCheckMission];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 7 &bull; Chapitre 3
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Checklist de Démarrage & Déclenchement
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          7.3 — Organiser le lancement des missions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Le lancement d'une mission marque le passage de la conception théorique à l'exécution technique. Lancer un agent alors que son contrat d'API est encore flou ou que ses dépendances ne sont pas réunies garantit des réécritures et du gaspillage de contexte. Découvrez comment vérifier rigoureusement les conditions de démarrage et ordonnancer les lancements.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Rappel impératif de sécurité au démarrage :</p>
        <p>
          Au moment de lancer une mission, le Team Leader vérifie que les permissions accordées à l'agent n'excèdent jamais son périmètre. <strong>Aucun agent ne doit débuter une mission avec des droits lui permettant d'exécuter un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans autorisation explicite du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 3.2 : Les 6 conditions de démarrage */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="clipboard-document-check" className="w-5 h-5 text-primary-600 shrink-0" /> 1. La Checklist des 6 Conditions Indispensables de Démarrage</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Avant de transmettre le prompt et de passer l'état à « En cours », le Team Leader valide systématiquement :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">1</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Mission Clairement Définie</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">L'objectif et le périmètre sont nets ; aucune exigence majeure n'est laissée à l'improvisation.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">2</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Informations & Documents de Référence Disponibles</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Le contrat d'API, les types partagés et la documentation sont explicitement fournis à l'agent.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">3</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Dépendances Amont Satisfaites</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Les livrables prérequis produits par d'autres agents sont livrés, audités et stabilisés.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">4</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Environnement de Travail & Espace Isolé</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">L'agent opère dans le bon workspace, sur sa branche de travail ou son Git Worktree dédié.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">5</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Permissions Techniques Restreintes</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">L'agent est confiné dans le Terminal Sandbox ; opérations sensibles bloquées en Deny/Ask.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2.5 w-full min-w-0 max-w-full">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">6</span>
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">Critères d'Acceptation & Livrables Vérifiables</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">Les conditions de recette et le protocole de compte rendu sont clairement arrêtés.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Banc de Contrôle &bull; Évaluation Pré-Lancement
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur d'Audit des 6 Conditions de Démarrage
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Sélectionnez une mission pour tester si elle réunit toutes les conditions requises ou si elle doit être mise en attente.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mission à évaluer :</span>
          {(Object.keys(checkMissions) as Array<keyof typeof checkMissions>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCheckMission(key)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                selectedCheckMission === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {checkMissions[key].title}
            </button>
          ))}
        </div>

        {/* Diagnostic du banc de test */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Statut d'éligibilité :</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${activeCheck.statusClass} shrink-0`}>
              {activeCheck.status}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Checklist des 6 conditions :</span>
            <div className="flex flex-col gap-1.5 w-full">
              {activeCheck.checks.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-850 text-xs">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 hidden sm:inline">{item.detail}</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${item.ok ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'}`}>
                      {item.ok ? 'OK' : 'MANQUANT'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <strong>Décision du Team Leader :</strong> {activeCheck.decision}
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
            Quiz de validation du Chapitre 3
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez votre maîtrise de la procédure de lancement, de la commande /plan et de la gestion des missions bloquées.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal du lancement d'une mission ?",
              options: [
                "Envoyer rapidement un prompt à un agent.",
                "Permettre à l'agent de commencer son travail dans des conditions correctement préparées.",
                "Demander à tous les agents de travailler simultanément.",
                "Valider automatiquement les résultats de l'agent."
              ],
              correctIndex: 1,
              explanation: "Le lancement doit permettre à l'agent de commencer son travail avec les informations, les responsabilités et les conditions nécessaires. L'envoi d'un prompt ne suffit pas à garantir un démarrage correct."
            },
            {
              id: 2,
              question: "Quel élément doit être vérifié avant de lancer une mission d'implémentation ?",
              options: [
                "La disponibilité des informations et des dépendances nécessaires.",
                "Le nombre de conversations ouvertes dans l'IDE.",
                "La possibilité de supprimer les anciennes branches Git.",
                "La présence d'un maximum d'agents dans le projet."
              ],
              correctIndex: 0,
              explanation: "Les informations et les dépendances sont essentielles. Une mission ne doit pas commencer sur la base d'hypothèses concernant des éléments qui conditionnent son exécution."
            },
            {
              id: 3,
              question: "Pourquoi faut-il transmettre explicitement le contexte nécessaire à un agent ?",
              options: [
                "Parce que tous les agents partagent automatiquement les mêmes conversations.",
                "Parce qu'un agent ne peut jamais consulter les fichiers du projet.",
                "Parce qu'une nouvelle session ne dispose pas nécessairement de l'historique de la conversation précédente.",
                "Parce que le contexte est uniquement constitué du nom du projet."
              ],
              correctIndex: 2,
              explanation: "Une nouvelle session d'agent ne reprend pas nécessairement l'historique d'une autre conversation. Le contexte indispensable doit donc être transmis explicitement."
            },
            {
              id: 4,
              question: "Dans les surfaces qui la prennent en charge, à quoi sert principalement la commande /plan ?",
              options: [
                "À fusionner automatiquement les branches Git.",
                "À lancer tous les agents disponibles.",
                "À supprimer les étapes de vérification.",
                "À explorer le besoin et le code, puis à préparer un plan avant l'exécution."
              ],
              correctIndex: 3,
              explanation: "La commande /plan permet de clarifier les exigences, d'explorer le code et de préparer un plan structuré avant de commencer les modifications."
            },
            {
              id: 5,
              question: "Un agent reçoit une mission dont le contrat technique n'est pas encore défini. Quelle est la meilleure réaction du Team Leader ?",
              options: [
                "Lui demander d'inventer le contrat.",
                "Clarifier la dépendance ou limiter la mission à une préparation qui ne dépend pas de ce contrat.",
                "Laisser l'agent modifier librement le code.",
                "Lancer immédiatement tous les autres agents."
              ],
              correctIndex: 1,
              explanation: "Le Team Leader doit traiter la dépendance : il attend le contrat officiel ou n'autorise qu'une préparation non liée à ce contrat."
            },
            {
              id: 6,
              question: "Quelle est la différence entre une mission lancée et une mission en cours ?",
              options: [
                "Une mission lancée a été transmise ; une mission en cours a été prise en charge et son exécution a commencé.",
                "Une mission lancée est terminée ; une mission en cours est validée.",
                "Une mission lancée concerne uniquement le Backend.",
                "Il n'existe aucune différence."
              ],
              correctIndex: 0,
              explanation: "Une mission lancée a été transmise à l'agent. Elle est en cours lorsque l'agent l'a effectivement prise en charge et a débuté son exécution."
            },
            {
              id: 7,
              question: "Un agent ne possède pas la permission nécessaire pour effectuer une opération. Que doit faire le Team Leader ?",
              options: [
                "Lui demander de contourner la restriction.",
                "Lui demander d'utiliser le compte d'un autre agent.",
                "Vérifier le besoin et solliciter l'autorisation appropriée.",
                "Ignorer la restriction si la mission est urgente."
              ],
              correctIndex: 2,
              explanation: "Les permissions techniques doivent être scrupuleusement respectées. Si une autorisation est indispensable, elle doit être demandée selon la procédure réglementaire."
            },
            {
              id: 8,
              question: "Vrai ou faux : lorsqu'un agent déclare sa mission terminée, le résultat est automatiquement validé.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Un agent peut déclarer sa mission achevée sans que le code ait été recetté. L'achèvement précède la vérification et la validation."
            },
            {
              id: 9,
              question: "Quels éléments doivent être enregistrés dans le tableau de suivi du lancement ?",
              options: [
                "Le nom du modèle IA uniquement.",
                "Le nombre de messages échangés uniquement.",
                "Les préférences personnelles de chaque agent.",
                "L'agent responsable, l'état de la mission, ses conditions de démarrage et les observations utiles."
              ],
              correctIndex: 3,
              explanation: "Le tableau de suivi doit permettre de tracer qui travaille sur chaque mission, où en est le démarrage et quels obstacles doivent être pris en compte."
            },
            {
              id: 10,
              question: "Dans TaskFlow, pourquoi faut-il que les agents Backend et Frontend utilisent le même contrat API ?",
              options: [
                "Pour leur permettre de modifier les mêmes fichiers simultanément.",
                "Pour garantir que leurs développements respectent les mêmes règles d'échange entre l'interface et le serveur.",
                "Pour éviter d'écrire des tests.",
                "Pour supprimer le rôle de l'Architect."
              ],
              correctIndex: 1,
              explanation: "Le contrat API définit les règles d'échange (routes, formats JSON, statuts). Les deux agents doivent s'y conformer pour que leurs développements s'intègrent sans faille."
            }
          ]}
        />
      </div>
    </div>
  );
};
