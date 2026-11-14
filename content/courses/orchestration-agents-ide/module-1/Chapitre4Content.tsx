'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  // Simulateur interactif de Fenêtre de Contexte & Perte d'information
  const [messagesCount, setMessagesCount] = useState<number>(3);

  const conversationSteps = [
    { id: 1, role: 'PM', text: "Le projet TaskFlow utilise Node 22, Express et TypeScript strict.", tokens: 350, type: 'critical' },
    { id: 2, role: 'Agent', text: "Bien noté. J'analyse l'arborescence backend/ et les modèles de données.", tokens: 420, type: 'normal' },
    { id: 3, role: 'PM', text: "Règle absolue : aucun stockage en base SQL, tout doit être géré en mémoire via TaskService.", tokens: 480, type: 'critical' },
    { id: 4, role: 'Agent', text: "Fichiers taskService.ts et taskController.ts lus. 120 lignes analysées.", tokens: 2100, type: 'normal' },
    { id: 5, role: 'PM', text: "Ajoute la validation Zod sur le schéma de création de tâche.", tokens: 300, type: 'normal' },
    { id: 6, role: 'Agent', text: "npm test exécuté. Résultat du test unitaire : 10 passed sur 10.", tokens: 1800, type: 'normal' },
    { id: 7, role: 'PM', text: "Maintenant, crée la route pour modifier le statut d'une tâche.", tokens: 350, type: 'normal' },
    { id: 8, role: 'Agent', text: "Contrôleur mis à jour. Résultat du linter : 4 erreurs de typage détectées et corrigées.", tokens: 2400, type: 'normal' },
    { id: 9, role: 'PM', text: "Peux-tu maintenant persister les tâches dans MySQL ?", tokens: 300, type: 'trap' }
  ];

  const totalTokens = conversationSteps.slice(0, messagesCount).reduce((acc, m) => acc + m.tokens, 0);
  const maxSafeWindow = 5000;
  const isOverflow = totalTokens > maxSafeWindow;

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="users" className="w-4 h-4 text-indigo-800" />
            <span>Orchestration Multi-Agents • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 4 — Comprendre les conversations et la conservation du contexte
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Maîtriser la dynamique du contexte : tokens, fenêtre d&apos;attention, distinction entre historique visible et mémoire active, et techniques de transmission entre agents pour éviter l&apos;amnésie logicielle.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Comprendre la notion de Contexte vs Historique</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Visualiser l&apos;impact de la fenêtre de tokens</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Structurer les documents de référence</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : QU'EST-CE QUE LE CONTEXTE ?
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 1 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Anatomie du contexte d&apos;un agent logiciel</h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Lorsqu&apos;un agent IA travaille sur un projet, il n&apos;a pas une « conscience permanente » comme un développeur humain. À chaque message ou action, le modèle est relancé à froid : on lui injecte un bloc d&apos;informations textuelles appelé <strong>contexte</strong>.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-2">
          {/* Composant 1 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">1</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Directives Système (Règles permanentes)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Gouvernance
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Instructions permanentes du rôle définies dans <code>AGENTS.md</code> : stack technologique imposée, conventions de nommage, restrictions d&apos;écriture et interdiction formelle de modifier la configuration globale.
            </p>
          </div>

          {/* Composant 2 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">2</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Données Projet & Fichiers lus
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Code Source
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le contenu exact des fichiers consultés par l&apos;agent (ex: <code>taskController.ts</code>), l&apos;arborescence du dépôt et les spécifications techniques de TaskFlow injectées à la demande.
            </p>
          </div>

          {/* Composant 3 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">3</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Échanges récents & Décisions de session
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Dialogue Actif
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              La suite des consignes du développeur humain, les questions de clarification posées par l&apos;agent et les arbitrages actés au fil de l&apos;eau pendant la session de travail.
            </p>
          </div>

          {/* Composant 4 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">4</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Sorties d&apos;outils & Retours d&apos;exécution
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Feedback Runtime
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Les comptes rendus des commandes exécutées dans le terminal (rapport d&apos;exécution Vitest, erreurs de typage TypeScript, messages Git) qui guident l&apos;agent vers la correction.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : SIMULATEUR INTERACTIF - FENÊTRE DE TOKENS & SATURATION
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 2 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">La Fenêtre de Contexte : Pourquoi les sessions trop longues dérivent</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Un modèle d&apos;IA dispose d&apos;une capacité de traitement finie, mesurée en <strong>tokens</strong> (morceaux de mots ou de code). Au fur et à mesure qu&apos;une session s&apos;allonge, le volume de tokens explose. Observez ci-dessous la saturation progressive du contexte :
        </p>

        {/* Simulateur interactif de charge de contexte */}
        <div className="p-5 sm:p-6 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Simulation d&apos;une session TaskFlow</h3>
              <p className="text-xs text-slate-500 font-medium">Ajoutez des messages pour observer la jauge de tokens</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMessagesCount((p) => Math.max(2, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold hover:bg-slate-100 cursor-pointer"
              >
                - Moins de messages
              </button>
              <button
                type="button"
                onClick={() => setMessagesCount((p) => Math.min(conversationSteps.length, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer"
              >
                + Échanger davantage
              </button>
            </div>
          </div>

          {/* Jauge de tokens */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Volume de contexte utilisé : {totalTokens} tokens</span>
              <span className={isOverflow ? 'text-rose-600 font-black' : 'text-indigo-600'}>
                {isOverflow ? 'ATTENTION : Dérive / Perte de détails' : 'Zone optimale de raisonnement'}
              </span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-300 flex">
              <div
                className={`h-full transition-all duration-300 ${
                  isOverflow ? 'bg-rose-500' : totalTokens > 3000 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (totalTokens / maxSafeWindow) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Liste des messages dans le contexte */}
          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {conversationSteps.slice(0, messagesCount).map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-start gap-2.5 ${
                  m.type === 'critical'
                    ? 'border-amber-300 bg-amber-50/70 text-amber-950'
                    : m.type === 'trap'
                      ? 'border-rose-300 bg-rose-50/80 text-rose-950'
                      : 'border-slate-200 bg-slate-50 text-slate-800'
                }`}
              >
                <span className={`px-2 py-0.5 rounded text-[11px] font-black uppercase shrink-0 ${
                  m.role === 'PM' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-100'
                }`}>
                  {m.role}
                </span>
                <div className="flex-1 min-w-0">
                  <p>{m.text}</p>
                  <span className="text-[10px] text-slate-500 font-mono">Poids : ~{m.tokens} tokens</span>
                </div>
              </div>
            ))}
          </div>

          {isOverflow && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
              <Icon name="alert-triangle" className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Alerte saturation :</strong> Les premières consignes critiques (ex: <em>pas de base SQL, stockage en mémoire uniquement</em>) risquent d&apos;être résumées ou ignorées par le modèle lors des prochaines réponses.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : DISTINCTION HISTORIQUE, CONTEXTE ET DOCUMENTS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 3 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Historique, Contexte actif et Documents de référence</h2>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Carte 1 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <Icon name="clock" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  L&apos;Historique de Conversation (Visible)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                Interface Utilisateur
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-normal break-words [overflow-wrap:anywhere]">
              La totalité des messages affichés dans le panneau de chat depuis le premier jour. <strong>Attention :</strong> l&apos;historique visuel est un journal pour l&apos;humain. La présence d&apos;un ancien message dans l&apos;écran ne garantit nullement qu&apos;il soit transmis au modèle lors du prochain prompt !
            </p>
          </div>

          {/* Carte 2 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-indigo-200/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                  <Icon name="cpu" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-indigo-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Le Contexte Actif (Fenêtre d&apos;Inférence)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-indigo-700 border border-indigo-200 shrink-0">
                Consommé en Tokens
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-normal break-words [overflow-wrap:anywhere]">
              Le paquet précis de données textuelles effectivement injecté dans le modèle à l&apos;instant T. C&apos;est la seule et unique information dont dispose l&apos;agent pour raisonner. Tout ce qui dépasse la fenêtre de contexte est tronqué ou résumé.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-emerald-200/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Icon name="file-text" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les Documents de Référence (Mémoire Durable)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-emerald-700 border border-emerald-200 shrink-0">
                Sur le Disque Git
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-normal break-words [overflow-wrap:anywhere]">
              Fichiers pérennes enregistrés dans le dépôt Git (ex: <code>AGENTS.md</code>, <code>SPEC.md</code>, comptes rendus de fin de mission). Ils survivent à la fermeture des fenêtres de discussion et assurent le relais fiable entre agents.
            </p>
          </div>
        </div>

        <Callout type="tip" title="Bonne pratique d'orchestration : La règle de la nouvelle session">
          Quand une mission est achevée (ex: le backend a terminé ses routes), <strong>ne continuez pas indéfiniment dans la même conversation</strong>. Demandez un compte rendu synthétique, fermez la session et démarrez une session propre pour l&apos;agent Frontend en lui injectant uniquement le compte rendu et le contrat d&apos;API.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 4 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>4.10 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Le contexte est le carburant de l&apos;agent IA, mais sa capacité est limitée par la fenêtre de tokens. Une session trop longue provoque de la confusion et des hallucinations. Pour garantir la continuité du projet TaskFlow entre plusieurs agents spécialisés, les décisions techniques ne doivent jamais être abandonnées dans le fil de discussion : elles doivent être <strong>consignées dans des documents de référence</strong> et transmises sous forme de comptes rendus structurés.
        </p>
      </section>

      {/* =========================================================================
          SECTION 5 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Quiz de compréhension (9 questions)</h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Conversations et conservation du contexte"
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'une conversation avec un agent IA dans l'IDE ?",
              options: [
                "Uniquement la toute première question envoyée au lancement",
                "Un échange structuré composé de plusieurs messages successifs entre l'utilisateur et l'agent",
                "Un simple fichier texte sur le disque dur qui compile le code",
                "Une commande Git enregistrée dans l'historique"
              ],
              correctIndex: 1,
              explanation: "Une conversation est un dialogue continu permettant d'affiner progressivement une demande."
            },
            {
              id: 2,
              question: "Que désigne précisément le « contexte » mis à disposition d'un agent ?",
              options: [
                "Uniquement la liste des messages écrits par l'utilisateur",
                "L'ensemble des informations textuelles injectées au modèle pour traiter la demande à un instant T",
                "L'espace disque restant sur la machine",
                "Le système d'exploitation utilisé par l'IDE"
              ],
              correctIndex: 1,
              explanation: "Le contexte regroupe les directives, les fichiers lus, les messages et les résultats d'outils."
            },
            {
              id: 3,
              question: "Qu'appelle-t-on la « fenêtre de contexte » d'un modèle d'IA ?",
              options: [
                "La fenêtre graphique où s'affiche l'éditeur de code",
                "La quantité maximale d'informations (en tokens) que le modèle peut traiter lors d'une interaction",
                "Le nombre d'onglets de fichiers qu'il est possible d'ouvrir simultanément",
                "La durée maximale autorisée pour une session en ligne"
              ],
              correctIndex: 1,
              explanation: "La fenêtre de contexte mesure la limite de tokens que le modèle peut analyser en une seule passe."
            },
            {
              id: 4,
              question: "Quelle affirmation est rigoureusement exacte concernant l'historique d'une conversation ?",
              options: [
                "Tout l'historique est toujours transmis intégralement au modèle sans aucune perte",
                "L'historique correspond aux échanges passés, mais tout n'est pas forcément conservé dans le contexte actif",
                "L'historique remplace automatiquement toutes les règles du fichier AGENTS.md",
                "L'historique est une copie exacte de la mémoire permanente du projet"
              ],
              correctIndex: 1,
              explanation: "Les plateformes tronquent ou résument l'historique ancien quand la limite de tokens approche."
            },
            {
              id: 5,
              question: "Pourquoi est-il crucial de distinguer l'historique affiché du contexte réellement utilisé ?",
              options: [
                "Parce que le modèle n'a jamais accès à aucun message passé",
                "Parce que des informations visibles à l'écran ont pu être tronquées ou oubliées dans le prompt envoyé au modèle",
                "Parce que le contexte ne contient jamais de texte",
                "Parce que l'historique est effacé après chaque clic de souris"
              ],
              correctIndex: 1,
              explanation: "Ce n'est pas parce qu'un message est visible dans l'écran de chat qu'il est encore pris en compte par le modèle."
            },
            {
              id: 6,
              question: "Que convient-il de faire avant de transmettre une mission à un nouvel agent spécialisé ?",
              options: [
                "Lui demander de tout recommencer depuis zéro sans consigne",
                "Lui donner uniquement le nom du dossier racine",
                "Préparer une synthèse structurée contenant les informations et contrats indispensables à la reprise",
                "Supprimer tous les documents de référence du projet"
              ],
              correctIndex: 2,
              explanation: "Une transmission nette avec résumé et contrat d'interface évite de polluer le nouveau contexte."
            },
            {
              id: 7,
              question: "Quel est l'intérêt fondamental d'exiger un compte rendu de mission de la part d'un agent ?",
              options: [
                "Remplacer les tests unitaires et le linter",
                "Présenter le travail réalisé, les fichiers touchés, les tests validés et les points restants",
                "Augmenter automatiquement la mémoire RAM de l'ordinateur",
                "Modifier les autorisations système de l'IDE"
              ],
              correctIndex: 1,
              explanation: "Le compte rendu synthétise l'effort et constitue la base de vérification pour le Reviewer et le PM."
            },
            {
              id: 8,
              question: "Dans une équipe multi-agents, où doivent être consignées les décisions d'architecture importantes ?",
              options: [
                "Uniquement dans la mémoire éphémère d'un agent",
                "Dans des documents de référence partagés (ex: AGENTS.md, SPEC.md) accessibles sur le dépôt",
                "Uniquement dans les commentaires du terminal",
                "Dans une conversation privée qui sera supprimée en fin de journée"
              ],
              correctIndex: 1,
              explanation: "Les documents de référence constituent la mémoire pérenne du projet, accessible à tous les agents."
            },
            {
              id: 9,
              question: "Une nouvelle conversation récupère-t-elle automatiquement tout le contexte de la conversation précédente ?",
              options: [
                "Oui, intégralement et par défaut",
                "Non, une nouvelle session démarre à blanc et nécessite une transmission explicite des acquis",
                "Oui, dès lors que le projet est versionné avec Git",
                "Non, car un agent refuse toujours de travailler dans deux conversations"
              ],
              correctIndex: 1,
              explanation: "Une nouvelle session réinitialise le contexte pour repartir sur une base saine et non polluée."
            }
          ]}
        />
      </section>
    </div>
  );
};
