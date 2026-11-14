'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  // Simulateur de découverte et injection d'AGENTS.md
  const [agentsContent, setAgentsContent] = useState<string>(`# Directives TaskFlow
- Langage imposé : TypeScript strict
- Persistance : Mémoire (Map locale)
- Verrou Git : Aucun push/merge sans accord explicite du PM`);
  const [hasSecret, setHasSecret] = useState<boolean>(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string>("Prêt pour le développement de TaskFlow conformément aux règles du projet.");

  const handleTestPrompt = () => {
    if (agentsContent.toLowerCase().includes("secret") || agentsContent.toLowerCase().includes("password") || agentsContent.toLowerCase().includes("api_key")) {
      setHasSecret(true);
      setSimulatedResponse("🚨 ALERTE SÉCURITÉ : Faux pas détecté ! AGENTS.md ne doit jamais contenir de mot de passe ni de clé API. Utilisez des variables d'environnement (.env).");
    } else {
      setHasSecret(false);
      setSimulatedResponse(`✓ Instructions validées et injectées dans le contexte de l'agent :\n- Respect strict de TypeScript\n- Stockage mémoire conforme\n- Verrouillage souverain du PM humain actif`);
    }
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 5 — Configuration des agents et instructions
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 2 — Comprendre le rôle du fichier AGENTS.md
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Le fichier <code>AGENTS.md</code> est la pierre angulaire de l'alignement IA dans Google Antigravity. Découvert et ingéré automatiquement par l'IDE dès l'ouverture du projet, il centralise les règles non négociables, la stack technique, les conventions et les limites de gouvernance de <strong>TaskFlow</strong> sans obliger les développeurs à répéter leur prompt dans chaque session de chat.
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
              1. Comprendre la découverte automatique par Antigravity
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Savoir où placer le fichier (racine du dépôt) et comment l'IDE l'intègre au contexte de travail sans copier-coller manuel.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Structurer le contenu standard d'un AGENTS.md
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organiser les 7 rubriques clés : présentation, stack, architecture, conventions, qualité, collaboration et opérations encadrées.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Versionner et sécuriser les instructions
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conserver l'historique du fichier avec Git tout en proscrivant formellement l'insertion de clés secrètes ou mots de passe.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2.3 : OÙ PLACER LE FICHIER AGENTS.MD ?
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Emplacement et mécanisme de découverte d'Antigravity
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Garantir que le fichier est détecté et chargé sans faille
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Google Antigravity recherche les fichiers d'instructions dans le dossier racine du workspace ouvert et remonte ses dossiers parents jusqu'à la racine du dépôt Git. <strong>L'emplacement officiel recommandé est directement à la racine du projet :</strong>
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1">
            <div className="text-slate-400">taskflow/</div>
            <div className="pl-4 text-emerald-400 font-bold">├── AGENTS.md  &larr; EMPLACEMENT RECOMMANDÉ (Chargé automatiquement)</div>
            <div className="pl-4">├── README.md</div>
            <div className="pl-4">├── package.json</div>
            <div className="pl-4">├── backend/</div>
            <div className="pl-4">└── frontend/</div>
          </div>

          <Callout type="warning" title="Attention : Les sous-dossiers ne sont pas scannés automatiquement">
            <p className="text-xs sm:text-sm leading-relaxed">
              Si le dossier racine <code>taskflow/</code> est ouvert comme espace de travail, placer un fichier <code>frontend/src/AGENTS.md</code> ne le fera <strong>PAS</strong> charger automatiquement ! Ne dispersez pas vos règles dans les sous-dossiers : conservez un fichier central à la racine.
            </p>
          </Callout>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DE TEST DE AGENTS.MD
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl min-w-0 max-w-full overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur — Banc d'Essai de votre fichier AGENTS.md
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Pipeline d'Ingestion
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-4">
            Modifiez le contenu du fichier ci-dessous et cliquez sur <strong>"Simuler l'Ingestion par Antigravity"</strong> pour tester le comportement de l'agent :
          </p>

          <div className="space-y-3 mb-6">
            <textarea
              value={agentsContent}
              onChange={(e) => setAgentsContent(e.target.value)}
              rows={5}
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              placeholder="Rédigez les règles ici..."
            />

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleTestPrompt}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
              >
                Simuler l'Ingestion par Antigravity
              </button>
              <button
                onClick={() => setAgentsContent(agentsContent + "\n- API_KEY = \"sk-123456789\"")}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-900/60 cursor-pointer"
              >
                + Injecter un secret pour tester l'alerte
              </button>
            </div>
          </div>

          {/* Retour de l'agent */}
          <div className={`p-4 rounded-xl font-mono text-xs border min-w-0 max-w-full ${hasSecret ? 'bg-rose-950/60 border-rose-800 text-rose-200' : 'bg-slate-950 border-slate-800 text-emerald-300'
            }`}>
            <span className="text-indigo-400 font-bold block mb-1">
              $ Réponse de l'Agent au démarrage de session :
            </span>
            <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono text-xs sm:text-sm">
              {simulatedResponse}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2.13 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 2
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez vos connaissances sur l'utilisation et les limites du fichier AGENTS.md (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle premier du fichier AGENTS.md dans un projet ?",
              options: [
                "Gérer les dépendances npm du serveur",
                "Centraliser et transmettre les instructions et règles communes destinées aux agents IA",
                "Enregistrer les commits Git automatiquement",
                "Compiler le code TypeScript"
              ],
              correctIndex: 1,
              explanation: "AGENTS.md constitue la mémoire et le cadre commun de travail ingéré par les agents IA."
            },
            {
              id: 2,
              question: "Quel format de rédaction utilise le fichier AGENTS.md ?",
              options: [
                "JSON brut",
                "YAML avec indentation stricte obligatoire",
                "Markdown standard (.md)",
                "Fichier binaire compilé"
              ],
              correctIndex: 2,
              explanation: "AGENTS.md est rédigé en Markdown simple avec titres, listes et code fences."
            },
            {
              id: 3,
              question: "Où est-il officiellement recommandé de placer le fichier AGENTS.md ?",
              options: [
                "À la racine exacte du dépôt Git du projet",
                "Dans le dossier node_modules",
                "Dans le répertoire temporaire /tmp",
                "Dans le dossier public/ du frontend uniquement"
              ],
              correctIndex: 0,
              explanation: "La racine du dépôt garantit la découverte automatique par Antigravity et le partage avec l'équipe."
            },
            {
              id: 4,
              question: "Doit-on copier-coller l'intégralité du fichier AGENTS.md dans chaque nouveau message de conversation ?",
              options: [
                "Oui, à chaque envoi de prompt",
                "Oui, uniquement pour l'agent QA",
                "Non, Antigravity découvre et charge automatiquement le fichier dans le contexte de l'agent",
                "Oui, après chaque git commit"
              ],
              correctIndex: 2,
              explanation: "L'ingestion contextuelle est automatique dès que le workspace ouvert contient AGENTS.md."
            },
            {
              id: 5,
              question: "Quelle est la différence fondamentale entre AGENTS.md et une instruction de mission ponctuelle ?",
              options: [
                "Il n'existe aucune différence",
                "AGENTS.md contient des règles permanentes du projet, tandis qu'une instruction ponctuelle décrit une tâche spécifique à réaliser",
                "AGENTS.md contient uniquement du code source TypeScript",
                "Une instruction ponctuelle configure les permissions du système"
              ],
              correctIndex: 1,
              explanation: "AGENTS.md pose le cadre durable ; le prompt de mission donne l'objectif immédiat du sprint."
            },
            {
              id: 6,
              question: "Parmi les éléments suivants, lequel a sa place légitime dans AGENTS.md ?",
              options: [
                "Le mot de passe de la base de données de production",
                "Une clé d'API Stripe privée",
                "La stack technique imposée et les conventions de développement",
                "Le jeton d'authentification personnel d'un développeur"
              ],
              correctIndex: 2,
              explanation: "Seules les directives techniques publiques y figurent. Les secrets sont formellement proscrits."
            },
            {
              id: 7,
              question: "Lorsque la racine taskflow/ est ouverte, Antigravity va-t-il automatiquement charger un fichier 'frontend/src/AGENTS.md' ?",
              options: [
                "Oui, il fouille tous les sous-dossiers récursivement",
                "Non, il ne recherche pas automatiquement dans les sous-dossiers situés sous la racine du workspace ouvert",
                "Oui, mais uniquement pour les fichiers de tests",
                "Oui, s'il fait moins de 10 lignes"
              ],
              correctIndex: 1,
              explanation: "La recherche ne descend pas automatiquement dans l'arborescence profonde des sous-dossiers du workspace."
            },
            {
              id: 8,
              question: "Quel est l'avantage majeur de versionner AGENTS.md avec Git ?",
              options: [
                "Partager le référentiel d'instructions avec toute l'équipe et tracer l'évolution des règles du projet",
                "Empêcher tous les conflits de code à l'avenir",
                "Donner automatiquement des droits d'administrateur aux agents",
                "Remplacer les tests automatisés"
              ],
              correctIndex: 0,
              explanation: "Le versionnement permet à toute l'équipe de partager le même référentiel et de tracer les changements."
            },
            {
              id: 9,
              question: "Écrire dans AGENTS.md qu'un agent ne doit pas accéder à un dossier constitue-t-il une barrière de sécurité technique infranchissable ?",
              options: [
                "Oui, Markdown bloque physiquement les commandes du terminal",
                "Non, les restrictions techniques doivent être appliquées par les paramètres de permissions d'Antigravity",
                "Oui, à condition d'écrire en lettres majuscules",
                "Non, car les agents ne savent pas lire le Markdown"
              ],
              correctIndex: 1,
              explanation: "Une instruction informe l'agent de son devoir. Seule la configuration de permissions bloque techniquement l'accès."
            },
            {
              id: 10,
              question: "Quelle organisation est la plus saine pour le projet TaskFlow ?",
              options: [
                "Placer toutes les tâches du backlog dans AGENTS.md",
                "Définir le socle commun dans AGENTS.md et consigner les fiches de rôles spécialisées séparément",
                "Créer un fichier AGENTS.md différent à chaque heure de la journée",
                "Ne jamais rédiger de fichier d'instructions"
              ],
              correctIndex: 1,
              explanation: "Un socle commun épuré complété par des règles de rôles évite les documents surchargés et confus."
            }
          ]}
        />
      </section>
    </div>
  );
};
