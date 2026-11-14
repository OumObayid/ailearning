'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  // Simulateur interactif : Stratégies de Transmission de Contexte
  const [contextStrategy, setContextStrategy] = useState<'raw_dump' | 'empty_blind' | 'structured_synthesis'>('structured_synthesis');

  const strategies = {
    empty_blind: {
      title: "1. Délégation Aveugle (Prompt sans contexte)",
      promptSample: "« Backend, implémente la modification du statut de tâche. »",
      tokenCost: "Très faible (~150 tokens)",
      risk: "🔴 RISQUE CRITIQUE D'HALLUCINATION & CONFLIT",
      result: "Le sous-agent n'ayant pas accès à l'historique de l'Architect, il invente un endpoint PUT arbitraire et des statuts incompatibles avec le Frontend."
    },
    raw_dump: {
      title: "2. Injection Brutale (Copie intégrale de tout l'historique)",
      promptSample: "Copie de 80 messages de discussion avec les hésitations, faux départs et brouillons...",
      tokenCost: "Massif (~18 000 tokens) - Sature la fenêtre",
      risk: "⚠️ BRUIT COGNITIF & CONFUSION D'HYPOTHÈSES",
      result: "L'agent risque de ressusciter une vieille hypothèse abandonnée (ex: un 4ème statut 'archived') et dilue son attention."
    },
    structured_synthesis: {
      title: "3. Synthèse Structurée avec Référence (Recommandée)",
      promptSample: "Mandat précis + référence explicite au contrat validé @docs/architecture/api-contracts.md + rappel des limites.",
      tokenCost: "Optimisé (~950 tokens)",
      risk: "✅ PARFAITE ÉTANCHÉITÉ ET FIDÉLITÉ",
      result: "Le sous-agent démarre immédiatement sur la référence officielle validée sans bruit ni interprétation divergente."
    }
  };

  const currentStrategy = strategies[contextStrategy];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 7 &bull; Chapitre 6
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Hygiène de Contexte & Communication
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          7.6 — Gérer les conversations et les informations échangées
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Dans Google Antigravity, les conversations distinctes et les sous-agents ne partagent pas automatiquement leur historique. Si vous présumez qu'un agent sait ce qui s'est dit dans une autre session, vous courez droit à l'incompatibilité. Maîtrisez la gestion du contexte, le référencement de documents et la conservation des décisions pérennes.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle de traçabilité des décisions :</p>
        <p>
          Une décision d'architecture ou un contrat d'interface ne doit jamais rester confiné dans un fil de chat éphémère : il doit être consigné dans un document de référence (<code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">docs/architecture/api-contracts.md</code>). Rappel : <strong>aucun agent ne peut exécuter de <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans accord formel du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 6.2 : Conversation vs Contexte vs Mémoire de travail */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="chat-bubble-left-right" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Distinguer Conversation, Contexte et Mémoire de Travail</h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">1. La Conversation (Historique des messages échangés)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Le fil chronologique des questions et réponses échangées au cours d'une session. Elle est locale à la fenêtre de chat.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-indigo-700 dark:text-indigo-400">2. Le Contexte (Informations injectées dans le modèle)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              La fenêtre active de tokens comprenant les instructions système, les règles <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">AGENTS.md</code>, les fichiers consultés et les derniers échanges.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-purple-700 dark:text-purple-400">3. La Mémoire de Travail (Synthèse opérationnelle active)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Les faits actés, résultats intermédiaires et contraintes que l'agent retient pour mener à bien sa tâche sans dériver.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire de Contexte &bull; Optimisation des Tokens
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur d'Injection de Contexte & Hygiène de Session
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Comparez 3 façons de transmettre une mission à un sous-agent et mesurez l'impact sur le coût en tokens et la fidélité au projet.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Stratégie d'injection testée :</span>
          {(Object.keys(strategies) as Array<keyof typeof strategies>).map((key) => (
            <button
              key={key}
              onClick={() => setContextStrategy(key as keyof typeof strategies)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                contextStrategy === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {strategies[key].title}
            </button>
          ))}
        </div>

        {/* Diagnostic de la stratégie */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Échantillon de transmission :</span>
            <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300">
              {currentStrategy.tokenCost}
            </span>
          </div>

          <p className="text-xs sm:text-sm italic font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-normal break-words [overflow-wrap:anywhere]">
            {currentStrategy.promptSample}
          </p>

          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {currentStrategy.risk}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
            {currentStrategy.result}
          </p>
        </div>
      </div>

      {/* Quiz officiel */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Évaluation des connaissances
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de validation du Chapitre 6
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Validez vos compétences sur la gestion du contexte, les références de fichiers (@) et les commandes CLI d'Antigravity.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la principale différence entre une conversation et le contexte d'un agent ?",
              options: [
                "La conversation contient uniquement les fichiers du projet.",
                "Le contexte correspond uniquement aux dernières réponses.",
                "La conversation représente l'historique des échanges, tandis que le contexte regroupe les informations accessibles pour traiter une demande.",
                "Les deux notions désignent exactement la même chose."
              ],
              correctIndex: 2,
              explanation: "La conversation correspond au fil d'échange historique. Le contexte englobe l'ensemble des données injectées dans le modèle (instructions, documents, code)."
            },
            {
              id: 2,
              question: "Lorsqu'un sous-agent est lancé avec invoke_subagent dans Antigravity, que doit faire l'agent parent pour transmettre les informations nécessaires ?",
              options: [
                "Fournir explicitement les éléments utiles dans le prompt initial ou les références appropriées.",
                "Supposer que le sous-agent connaît tout l'historique du parent.",
                "Ouvrir obligatoirement toutes les conversations du projet.",
                "Supprimer les instructions générales du projet."
              ],
              correctIndex: 0,
              explanation: "Un sous-agent ne reçoit pas automatiquement l'historique de son parent : les consignes et documents de référence doivent lui être transmis explicitement."
            },
            {
              id: 3,
              question: "Dans l'Antigravity App, à quoi sert la référence @conversation: ?",
              options: [
                "À créer automatiquement un Worktree.",
                "À fusionner deux conversations.",
                "À supprimer l'historique d'une session.",
                "À retrouver et référencer une conversation précédente pour réutiliser son contexte."
              ],
              correctIndex: 3,
              explanation: "Dans l'App, @conversation: permet de pointer vers une conversation antérieure pour que l'agent puisse en réexploiter les conclusions."
            },
            {
              id: 4,
              question: "Que reçoit principalement l'agent lorsqu'un fichier est référencé avec @ dans Antigravity ?",
              options: [
                "Une autorisation automatique de modifier le fichier.",
                "Le chemin du fichier, qu'il peut consulter selon ses permissions.",
                "Le contenu intégral du dépôt Git.",
                "Une copie automatique du fichier dans une nouvelle branche."
              ],
              correctIndex: 1,
              explanation: "La mention @chemin/fichier transmet le chemin du fichier pour que l'agent le charge au besoin, sous réserve de ses permissions configurées."
            },
            {
              id: 5,
              question: "Comment transmettre directement une nouvelle instruction à un sous-agent dans Antigravity CLI ?",
              options: [
                "Utiliser obligatoirement la commande /merge.",
                "Créer une nouvelle branche Git.",
                "Commencer le message par @ suivi du nom du sous-agent et de l'instruction.",
                "Modifier son historique de conversation manuellement."
              ],
              correctIndex: 2,
              explanation: "Dans le CLI, commencer un message par @nom:sous-agent permet d'adresser une consigne ciblée directement à ce sous-agent actif."
            },
            {
              id: 6,
              question: "Quel est l'objectif principal d'une synthèse de contexte ?",
              options: [
                "Remplacer tous les documents du projet.",
                "Conserver uniquement les anciennes réponses de l'agent.",
                "Ajouter toutes les conversations sans distinction.",
                "Transmettre les informations essentielles pour permettre la continuité d'une mission."
              ],
              correctIndex: 3,
              explanation: "Une synthèse extrait l'essentiel (décisions confirmées, fichiers cibles) sans saturer la fenêtre de contexte de discussions obsolètes."
            },
            {
              id: 7,
              question: "Vrai ou faux : dans Antigravity CLI, référencer un fichier avec @ donne automatiquement à l'agent l'autorisation de le lire, même si ses permissions l'interdisent.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Les permissions techniques configurées priment toujours : un fichier protégé ou masqué en Deny ne sera pas lu, même s'il est mentionné avec @."
            },
            {
              id: 8,
              question: "Quel élément doit être enregistré lorsqu'une décision technique importante est prise ?",
              options: [
                "La décision confirmée, sa source, sa version et les agents concernés.",
                "Uniquement le nom de l'agent qui a posé la question.",
                "Le nombre de messages échangés.",
                "Toutes les hypothèses précédentes sans distinction."
              ],
              correctIndex: 0,
              explanation: "Une décision pérenne doit être traçable : date, contenu acté, source faisant foi et liste des agents devant l'appliquer."
            },
            {
              id: 9,
              question: "À quoi sert la commande /context dans Antigravity CLI ?",
              options: [
                "À transmettre automatiquement le contexte à tous les sous-agents.",
                "À créer une nouvelle conversation.",
                "À consulter l'utilisation du contexte et les informations qui y contribuent.",
                "À modifier les règles du projet."
              ],
              correctIndex: 2,
              explanation: "La commande /context affiche la jauge de tokens consommés, les fichiers chargés et les résumés automatiques de la session."
            },
            {
              id: 10,
              question: "Vrai ou faux : le fork d'une conversation dans Antigravity CLI isole automatiquement les modifications du système de fichiers Git.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux. Le fork copie l'historique textuel de la conversation, mais ne crée pas d'espace de travail isolé sur le disque ; pour cela, il faut utiliser des Git Worktrees."
            }
          ]}
        />
      </div>
    </div>
  );
};
