'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Différence entre un chatbot et un agent IA
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Introduction : pourquoi faire cette distinction ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Aujourd&apos;hui, on utilise couramment des interfaces d&apos;intelligence artificielle comme ChatGPT, Gemini ou Claude pour poser des questions, solliciter des explications ou générer des snippets de code.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Mais tous les systèmes d&apos;IA ne fonctionnent pas de la même manière. Certains se contentent principalement de répondre passivement à nos sollicitations, tandis que d&apos;autres peuvent <strong>comprendre un objectif global, planifier des étapes et exécuter des actions concrètes</strong> dans un environnement de travail. C&apos;est précisément cette distinction qui fait l&apos;objet de ce module : comprendre comment un agent IA travaille au cœur d&apos;un IDE comme Google Antigravity.
        </p>
      </section>

      {/* 2. Qu'est-ce qu'un chatbot ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce qu&apos;un chatbot classique ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un chatbot est un programme permettant de dialoguer avec un grand modèle de langage à travers une interface de messagerie. L&apos;utilisateur saisit un prompt, l&apos;IA le traite et renvoie une réponse textuelle.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl font-mono text-sm">
          <div className="bg-white p-3 rounded-xl border border-slate-300 text-center w-full md:w-1/3">
            <span className="font-bold text-slate-900 block">1. Utilisateur</span>
            <span className="text-xs text-slate-600">Pose une question ou donne une instruction</span>
          </div>
          <span className="text-indigo-600 font-black text-xl">→</span>
          <div className="bg-white p-3 rounded-xl border border-slate-300 text-center w-full md:w-1/3">
            <span className="font-bold text-indigo-700 block">2. Modèle IA</span>
            <span className="text-xs text-slate-600">Analyse le prompt et génère du texte</span>
          </div>
          <span className="text-indigo-600 font-black text-xl">→</span>
          <div className="bg-white p-3 rounded-xl border border-slate-300 text-center w-full md:w-1/3">
            <span className="font-bold text-slate-900 block">3. Utilisateur</span>
            <span className="text-xs text-slate-600">Reçoit la réponse et l&apos;applique manuellement</span>
          </div>
        </div>

        <p className="text-base text-slate-800">
          Si vous demandez à un chatbot d&apos;écrire une fonction d&apos;authentification React, il produira le code et ses explications. Mais dans une session classique, il n&apos;ouvrira pas votre projet, ne localisera pas le bon fichier et n&apos;y insérera pas la fonction : l&apos;effort d&apos;intégration repose intégralement sur vous.
        </p>
      </section>

      {/* 3. Qu'est-ce qu'un agent IA ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Qu&apos;est-ce qu&apos;un agent IA dans un IDE ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un <strong>agent IA</strong> est un système autonome orchestré qui utilise un modèle d&apos;intelligence artificielle pour atteindre un objectif en réalisant une série d&apos;opérations intermédiaires. Contrairement au chatbot passif, il dispose d&apos;une <strong>panoplie d&apos;outils</strong> pour interagir avec son environnement :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
            <Icon name="folder" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Examiner les fichiers du projet</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
            <Icon name="magnifying-glass" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Comprendre l&apos;organisation du code</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
            <Icon name="exclamation-triangle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Identifier les erreurs de syntaxe</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
            <Icon name="clipboard-document-list" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Préparer un plan de travail</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
            <Icon name="pencil-square" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Modifier des fichiers autorisés</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
            <Icon name="command-line" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Exécuter des commandes terminal</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
            <Icon name="shield-check" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Lancer des suites de tests</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
            <Icon name="document-text" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Vérifier et rendre compte</span>
          </div>
        </div>

        <Callout type="warning">
          <strong>Périmètre et permissions :</strong> Disposer d&apos;outils ne signifie pas avoir les pleins pouvoirs. Les actions réelles d&apos;un agent sont rigoureusement conditionnées par les permissions accordées par le développeur et les règles de sécurité de l&apos;IDE.
        </Callout>
      </section>

      {/* 4. Tableau comparatif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Tableau comparatif : Chatbot classique vs Agent IA
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Fonctionnalité</th>
                <th className="p-3.5 border border-slate-200">Chatbot classique</th>
                <th className="p-3.5 border border-slate-200">Agent IA dans un IDE (Antigravity)</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Répondre aux questions</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Oui</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Oui</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Expliquer du code source</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Oui</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Oui</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Générer du code</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Oui</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Oui</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Examiner les fichiers du projet</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Pas automatiquement</td>
                <td className="p-3.5 border border-slate-200 text-indigo-700 font-bold">Oui (si autorisé)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Modifier directement des fichiers</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Pas directement</td>
                <td className="p-3.5 border border-slate-200 text-indigo-700 font-bold">Oui (si autorisé)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Utiliser le terminal de commandes</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Non disponible</td>
                <td className="p-3.5 border border-slate-200 text-indigo-700 font-bold">Oui (si un outil le permet)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Exécuter des suites de tests</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Non</td>
                <td className="p-3.5 border border-slate-200 text-indigo-700 font-bold">Oui (si autorisé)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Vérifier le résultat réel d&apos;une action</td>
                <td className="p-3.5 border border-slate-200 text-slate-500">Limité aux textes collés</td>
                <td className="p-3.5 border border-slate-200 text-indigo-700 font-bold">Observe les retours d&apos;outils</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Exemple pratique et illustration visuelle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Exemple comparatif : Résolution d&apos;un bug dans React
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-extrabold text-slate-950 text-base mb-2">Approche A : Avec un Chatbot</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Vous décrivez le problème et collez un extrait de code. Le chatbot vous suggère un diff textuel. C&apos;est à vous d&apos;ouvrir l&apos;IDE, localiser le fichier, appliquer manuellement le changement, relancer le serveur et tester le formulaire.
            </p>
          </div>
          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl shadow-sm">
            <h4 className="font-extrabold text-indigo-950 text-base mb-2">Approche B : Avec Antigravity</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Vous demandez à l&apos;agent d&apos;analyser le projet. Il inspecte les fichiers autorisés, identifie la cause, propose un plan, applique la modification ciblée après votre validation, et exécute les tests pour confirmer le bon fonctionnement.
            </p>
          </div>
        </div>

        {/* Image du workspace Antigravity */}
        <div className="rounded-3xl border-2 border-slate-300 overflow-hidden bg-slate-950 p-2 shadow-sm">
          <div className="relative w-full aspect-[4/3] max-h-[500px]">
            <Image
              src="/images/cours/prompt-engineering-ide/antigravity-layout.jpeg"
              alt="Organisation de l'interface Google Antigravity : Editor, Agent et Terminal"
              fill
              className="object-contain rounded-2xl"
              priority
            />
          </div>
          <p className="text-center text-xs text-slate-300 py-2 font-mono">
            Figure 4.1 : Vue tripartite de l&apos;IDE Google Antigravity — Éditeur de code (centre), Volet Agent autonome (droite) et Terminal intégré (bas).
          </p>
        </div>
      </section>

      {/* 6. Les 5 composantes clés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Les 5 composantes essentielles d&apos;un agent IA
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="font-bold text-slate-950 text-sm">1. Modèle LLM</div>
            <p className="text-xs text-slate-600 mt-1">Comprendre et raisonner.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="font-bold text-slate-950 text-sm">2. Instructions</div>
            <p className="text-xs text-slate-600 mt-1">Définir rôle et limites.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="font-bold text-slate-950 text-sm">3. Contexte</div>
            <p className="text-xs text-slate-600 mt-1">Fournir l&apos;état du projet.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="font-bold text-slate-950 text-sm">4. Outils (Tools)</div>
            <p className="text-xs text-slate-600 mt-1">Agir dans l&apos;environnement.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="font-bold text-slate-950 text-sm">5. Contrôle</div>
            <p className="text-xs text-slate-600 mt-1">Encadrer les permissions.</p>
          </div>
        </div>
      </section>

      {/* 7. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Travaux pratiques guidés (TP 4.1)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice A</span>
            <h4 className="font-bold text-slate-950">Tester un chatbot web</h4>
            <p className="text-xs text-slate-700">
              Dans ChatGPT ou Gemini web, demandez : <em>« Je développe une application React. Explique-moi comment analyser la structure de mon projet. Ne suppose pas que tu as accès à mon ordinateur. »</em> Constatez qu&apos;il ne peut que fournir des conseils théoriques.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice B</span>
            <h4 className="font-bold text-slate-950">Tester un agent dans Antigravity</h4>
            <p className="text-xs text-slate-700">
              Dans Antigravity, ouvrez un projet de test et ordonnez : <em>« Analyse uniquement les fichiers auxquels tu as accès. Présente la structure, les technologies et les faiblesses éventuelles. Ne modifie rien et n&apos;exécute aucune commande. »</em> Constatez la lecture concrète du contexte.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Chatbot vs Agent IA
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 1"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence fondamentale entre un chatbot classique et un agent IA dans un IDE ?",
              options: [
                "Le chatbot est plus intelligent que l'agent IA.",
                "Le chatbot produit des réponses textuelles passives, alors que l'agent IA dispose d'outils lui permettant d'agir concrètement dans l'environnement de développement.",
                "L'agent IA ne peut pas comprendre le langage naturel.",
                "Le chatbot a un accès automatique en écriture à tout le disque dur."
              ],
              correctIndex: 1,
              explanation: "L'agent IA se distingue par sa capacité d'action outillée (lecture, édition, terminal) encadrée par des permissions au sein de son environnement de travail."
            },
            {
              id: 2,
              question: "Un agent IA possède-t-il automatiquement le droit d'exécuter n'importe quelle commande sur votre système ?",
              options: [
                "Oui, car le modèle LLM est omnipotent.",
                "Non, ses actions sont strictement conditionnées par les outils disponibles et les autorisations définies par l'utilisateur et l'IDE.",
                "Oui, dès qu'il est connecté à Internet.",
                "Non, sauf s'il est programmé en Python."
              ],
              correctIndex: 1,
              explanation: "La capacité technique d'un modèle ne confère pas de droit automatique. Le système de contrôle et les permissions de l'IDE restent maîtres du périmètre d'exécution."
            }
          ]}
        />
      </section>
    </div>
  );
};

