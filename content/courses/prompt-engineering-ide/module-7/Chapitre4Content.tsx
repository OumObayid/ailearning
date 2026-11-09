'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Améliorer la gestion du contexte
        </h1>
      </div>

      {/* 1. Les 5 strates de contexte */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 5 flux d&apos;information qui composent le contexte
        </h2>
        <p className="text-slate-700">
          Le contexte ne se limite pas au prompt de départ. Il regroupe l&apos;intégralité des données présentes dans la fenêtre d&apos;attention du LLM au moment précis où il infère sa réponse :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700">1. Contexte Permanent (Règles socles)</span>
            <p className="text-slate-600">Rôle, interdiction d&apos;écriture sans validation, sanctuarisation de <code>.env</code>, obligation de justification.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700">2. Contexte de Mission (La tâche)</span>
            <p className="text-slate-600">Objectif précis du tour de parole, composants ciblés (ex: <code>Projects.jsx</code>) et format attendu.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700">3. Contexte Technique (L&apos;écosystème)</span>
            <p className="text-slate-600">Framework (React 19), build tool (Vite), runtime (Node.js 22), SDK (<code>@google/genai</code>), environnement d&apos;exécution.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700">4. Contexte Historique (La trajectoire)</span>
            <p className="text-slate-600">Résumé des décisions validées ou refusées lors des tours précédents, étapes accomplies.</p>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs text-xs sm:text-sm">
          <span className="font-bold text-indigo-700">5. Contexte des Retours d&apos;Outils (Tool Results)</span>
          <p className="text-slate-600">
            Contenu réel renvoyé par <code>read_file</code> ou codes de retour de <code>run_command</code>. C&apos;est la source de vérité matérielle de l&apos;agent.
          </p>
        </div>
      </section>

      {/* 2. Les 4 pièges d'une mauvaise gestion */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 dérives courantes du contexte
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-800">1. L&apos;accumulation toxique de tokens</span>
            <p className="text-slate-700">Garder 30 messages de conversation contenant des discussions obsolètes sur PHP alors que l&apos;agent travaille désormais sur React sature l&apos;attention et ralentit l&apos;inférence.</p>
          </div>

          <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-800">2. Les contradictions temporelles non résolues</span>
            <p className="text-slate-700">Le projet utilisait Vue.js en début de session puis a été migré sous Next.js. Si la nouvelle information ne déclare pas formellement l&apos;ancienne obsolète, l&apos;agent mélange les syntaxes.</p>
          </div>

          <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-800">3. La dilution des contraintes critiques</span>
            <p className="text-slate-700">Plus la conversation s&apos;allonge, plus la consigne <em>&quot;Ne modifie aucun fichier&quot;</em> recule loin dans la fenêtre d&apos;attention, augmentant le risque d&apos;écriture sauvage.</p>
          </div>

          <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-800">4. La résurrection de propositions rejetées</span>
            <p className="text-slate-700">L&apos;agent propose une refactorisation risquée, l&apos;utilisateur dit &quot;Non&quot;, puis 5 messages plus tard l&apos;agent applique le changement en croyant qu&apos;il a été validé.</p>
          </div>
        </div>
      </section>

      {/* 3. Fiche de Contexte Standardisée */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La Fiche de Contexte Standardisée
        </h2>
        <p className="text-slate-700">
          Pour préserver la cohérence d&apos;une mission longue, utilisez cette structure de fiche réactualisée :
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-2">
          <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1">
            # FICHE DE CONTEXTE D&apos;AGENT (SESSION ACTIVE)
          </div>
          <pre>{`1. PROJET & STACK : Portfolio React / Vite / Node.js 22 / Gemini SDK
2. MISSION ACTIVE : Corriger le filtrage insensible à la casse dans Projects.jsx
3. FICHIERS AUTORISÉS : src/components/Projects.jsx (Lecture seule)
4. RESTRICTIONS STRICTES : Aucun accès à .env, aucune écriture sans diff validé
5. ÉTAT D'AVANCEMENT :
   - Étape 1 : Analyse du bug de filtrage -> TERMINÉE (Regex manquante)
   - Étape 2 : Préparation de la correction -> EN COURS
   - Étape 3 : Application sur le fichier -> EN ATTENTE D'ACCORD
6. DÉCISIONS FORMELLES :
   - Refusé par l'utilisateur : installation d'une bibliothèque tierce (Lodash)
   - Accepté : correction manuelle en JavaScript natif
7. INCERTITUDES / INCONNUES : Structure exacte de l'objet "project" en entrée`}</pre>
        </div>
      </section>

      {/* 4. Contexte vs Mémoire vs RAG */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Contexte, Mémoire persistante et RAG : Ne pas confondre
        </h2>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Notion</th>
                <th className="p-3">Rôle exact</th>
                <th className="p-3">Durée de vie &amp; Limites</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-bold text-slate-950">Contexte actif</td>
                <td className="p-3">Ce que le modèle lit pour générer le token suivant</td>
                <td className="p-3">Volatile, limité par la fenêtre de tokens du modèle</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-950">Mémoire persistante</td>
                <td className="p-3">Données clés sauvegardées d&apos;une session à l&apos;autre</td>
                <td className="p-3">Persistant, nécessite un mécanisme de stockage (ex: fichier markdown de notes)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-950">RAG (Retrieval)</td>
                <td className="p-3">Recherche vectorielle d&apos;extraits pertinents dans une base doc</td>
                <td className="p-3">Permet d&apos;injecter uniquement les extraits utiles dans le contexte</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="note" title="Règle fondamentale du contexte">
          Un agent fiable ne doit pas nécessairement recevoir le plus d&apos;informations possible : il doit recevoir <strong>les bonnes informations, au bon moment, avec un statut de validation clairement explicité</strong>.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Gestion du contexte
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Que risque-t-il de se produire lors d'une session de conversation très longue si les contraintes initiales ne sont pas résumées ou rappelées ?",
              options: [
                "L'IDE va obligatoirement redémarrer",
                "L'agent peut diluer les contraintes de sécurité et proposer des modifications qu'il croyait interdites",
                "Le code source sera crypté en RSA",
                "Les tests unitaires s'exécutent deux fois plus vite"
              ],
              correctIndex: 1,
              explanation: "Au fur et à mesure que les tokens s'accumulent, l'attention du modèle sur les messages initiaux peut faiblir, d'où l'utilité des rappels stratégiques."
            },
            {
              id: 2,
              question: "Quelle est la fonction essentielle d'un système RAG par rapport au contexte ?",
              options: [
                "Remplacer le modèle de fondation par un compilateur",
                "Rechercher les passages pertinents dans une base documentaire pour n'injecter que l'essentiel dans le contexte",
                "Supprimer tous les fichiers non utilisés du disque",
                "Accélérer la connexion Internet"
              ],
              correctIndex: 1,
              explanation: "Le RAG filtre et sélectionne les extraits documentaires précis répondant à la requête, évitant de saturer la fenêtre de contexte avec des pages inutiles."
            }
          ]}
        />
      </section>
    </div>
  );
};

