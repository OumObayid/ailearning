'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 7</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — Améliorer la gestion du contexte
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment structurer les 5 flux d&apos;information, dompter la saturation de la fenêtre de tokens et déployer une fiche de contexte standardisée sans bruit parasite.
        </p>
      </div>

      {/* 1. L'analogie de l'établi et les 5 flux */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-indigo-600" />
          <span>1. Les 5 flux d&apos;information qui composent le contexte</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le contexte d&apos;un agent ne se résume pas à votre dernier prompt. C&apos;est <strong>l&apos;ensemble cumulé des informations</strong> présentes dans sa fenêtre d&apos;attention au moment précis où le modèle calcule sa réponse :
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de l&apos;établi d&apos;artisan encombré :</span>
          </div>
          <p>
            Imaginez un horloger travaillant sur un établi recouvert de tasses de café de la veille, de copeaux de bois, de vieux journaux et de 80 tournevis mélangés. S&apos;il doit ajuster une vis de 2 millimètres, il passera 10 minutes à fouiller sous les détritus et risquera d&apos;utiliser le mauvais tournevis !
          </p>
          <p>
            S&apos;il débarrasse son établi pour n&apos;y laisser <strong>que la pièce de la montre en cours et les 2 pinces requises</strong>, son attention est maximale et son geste est parfait. Gérer le contexte d&apos;un agent, c&apos;est ranger son établi pour éliminer le bruit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 uppercase font-mono text-xs bg-indigo-50 px-2 py-0.5 rounded">1. Contexte Permanent (Socle)</span>
            <p className="text-slate-600">Rôle, mandat d&apos;audit, interdiction d&apos;écriture sans validation humaine, sanctuarisation de <code className="font-mono text-xs">.env</code>.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 uppercase font-mono text-xs bg-indigo-50 px-2 py-0.5 rounded">2. Contexte de Mission (La tâche)</span>
            <p className="text-slate-600">Objectif précis du tour de parole en cours, composant ciblé (<code className="font-mono text-xs">SearchBar.jsx</code>) et format de sortie exigé.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 uppercase font-mono text-xs bg-indigo-50 px-2 py-0.5 rounded">3. Contexte Technique (L&apos;écosystème)</span>
            <p className="text-slate-600">Framework (React 19), outil de build (Vite), runtime (Node.js 22), SDK Google Gemini et gestionnaire de paquets.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 uppercase font-mono text-xs bg-indigo-50 px-2 py-0.5 rounded">4. Contexte Historique (La trajectoire)</span>
            <p className="text-slate-600">Synthèse des décisions approuvées ou refusées lors des tours précédents et état d&apos;avancement des étapes.</p>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs sm:text-sm">
          <span className="font-bold text-indigo-700 uppercase font-mono text-xs bg-indigo-50 px-2 py-0.5 rounded">5. Contexte des Retours d&apos;Outils (Tool Results)</span>
          <p className="text-slate-600">
            Contenu réel extrait par <code className="font-mono text-xs">view_file</code> ou logs de console de <code className="font-mono text-xs">run_command</code>. C&apos;est la seule source de vérité matérielle prouvée.
          </p>
        </div>
      </section>

      {/* 2. Les 4 dérives courantes du contexte */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="exclamation-triangle" className="w-5 h-5 text-indigo-600" />
          <span>2. Les 4 dérives majeures d&apos;une mauvaise gestion du contexte</span>
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-bold text-rose-700">1. L&apos;accumulation toxique de tokens obsolètes</span>
            <p className="text-slate-700">
              Garder dans la conversation 25 messages d&apos;essais ratés sur une ancienne bibliothèque abandonnée sature l&apos;attention du modèle et augmente le risque de confusion technique.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-bold text-rose-700">2. Les contradictions temporelles non purgées</span>
            <p className="text-slate-700">
              Si le projet a commencé en JavaScript puis est passé en TypeScript, l&apos;agent recommence à générer du JS s&apos;il relit de vieux messages sans purge du contexte.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-bold text-rose-700">3. La dilution des contraintes critiques</span>
            <p className="text-slate-700">
              Plus la discussion s&apos;étire, plus la consigne <em>&quot;Ne modifie aucun fichier sans validation&quot;</em> recule loin dans la fenêtre de contexte, augmentant le risque d&apos;écriture sauvage.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-bold text-rose-700">4. La résurrection de propositions rejetées</span>
            <p className="text-slate-700">
              L&apos;agent propose une bibliothèque, vous dites <em>&quot;Non pas de paquet externe&quot;</em>, puis 10 messages plus tard, l&apos;agent tente à nouveau de l&apos;installer car votre refus s&apos;est dilué.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Fiche de Contexte Standardisée */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>3. Le modèle de Fiche de Contexte Standardisée</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Sur une mission longue, réinjectez régulièrement cette fiche de synthèse pour réaligner l&apos;attention de l&apos;agent :
        </p>

        {/* Context Card Box without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1">
            === FICHE DE CONTEXTE STANDARDISÉE (SESSION ACTIVE) ===
          </div>
          <div><strong className="text-indigo-300">1. PROJET &amp; STACK :</strong> Portfolio React / Vite / Node.js 22 / Tailwind CSS</div>
          <div><strong className="text-indigo-300">2. MISSION EN COURS :</strong> Filtrage insensible à la casse dans SearchBar.jsx</div>
          <div><strong className="text-indigo-300">3. PÉRIMÈTRE AUTORISÉ :</strong> src/components/SearchBar.jsx (Lecture seule)</div>
          <div><strong className="text-rose-400">4. INTERDICTIONS STRICTES :</strong> Aucun accès à .env*, zéro modification de fichier sans validation</div>
          <div className="text-amber-300 font-bold pt-1">5. ÉTAT D&apos;AVANCEMENT DES ÉTAPES :</div>
          <div className="pl-4 text-slate-200">
            • Étape 1 : Diagnostic du bug → TERMINÉE (manquait .toLowerCase())<br />
            • Étape 2 : Préparation du Diff → EN COURS DANS LE CHAT<br />
            • Étape 3 : Application physique → EN ATTENTE D&apos;ACCORD HUMAIN
          </div>
          <div className="text-emerald-300 font-bold pt-1">6. DÉCISIONS FORMELLES ENTERRÉES :</div>
          <div className="pl-4 text-slate-200">
            • Rejeté formellement : installation d&apos;une bibliothèque externe (Lodash)<br />
            • Validé : filtrage en mémoire JavaScript natif
          </div>
        </div>
      </section>

      {/* 4. Contexte vs Mémoire vs RAG */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="server-stack" className="w-5 h-5 text-indigo-600" />
          <span>4. Contexte actif vs Mémoire persistante vs RAG : le comparatif</span>
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Concept</th>
                <th className="p-3.5 border-b border-slate-200">Rôle précis pour l&apos;agent</th>
                <th className="p-3.5 border-b border-slate-200">Durée de vie &amp; Limites</th>
                <th className="p-3.5 border-b border-slate-200 text-indigo-900">Analogie de l&apos;artisan</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold text-slate-950">1. Contexte actif</td>
                <td className="p-3.5">Ce que le modèle a sous les yeux pour générer le mot suivant.</td>
                <td className="p-3.5 text-rose-700 font-medium">Volatile : disparaît si on ferme la session.</td>
                <td className="p-3.5 text-indigo-800 font-semibold">Le plateau de l&apos;établi de travail</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-950">2. Mémoire persistante</td>
                <td className="p-3.5">Notes et décisions clés sauvegardées dans des fichiers (ex: agent.md).</td>
                <td className="p-3.5 text-emerald-700 font-medium">Durable : conservé d&apos;un jour à l&apos;autre sur disque.</td>
                <td className="p-3.5 text-indigo-800 font-semibold">Le carnet de bord posé sur l&apos;étagère</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-950">3. RAG (Recherche vectorielle)</td>
                <td className="p-3.5">Système qui extrait des bribes de documentation à la demande.</td>
                <td className="p-3.5 text-blue-700 font-medium">Dynamique : injecte des morceaux ciblés dans le contexte.</td>
                <td className="p-3.5 text-indigo-800 font-semibold">L&apos;index de la bibliothèque d&apos;atelier</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {[
            { name: "1. Contexte actif", role: "Ce que le LLM lit immédiatement.", life: "Volatile (la session en cours)", meta: "Le plateau de l'établi" },
            { name: "2. Mémoire persistante", role: "Règles sauvegardées dans les fichiers .md.", life: "Permanent sur le disque", meta: "Le carnet de bord" },
            { name: "3. RAG (Retrieval)", role: "Recherche ciblée de documentation externe.", life: "Injecté à la demande", meta: "L'index de bibliothèque" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
              <div className="font-bold text-slate-950 text-sm">{item.name}</div>
              <div className="text-slate-700"><strong>Rôle :</strong> {item.role}</div>
              <div className="text-indigo-800 font-semibold"><strong>Analogie :</strong> {item.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Gestion du contexte
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 4"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il dangereux de laisser s'accumuler 30 messages de conversation sans jamais résumer l'avancement ?",
              options: [
                "Parce que l'attention du modèle de langage se dilue, et les contraintes fondamentales fixées au début (comme l'interdiction d'écrire) finissent par être oubliées.",
                "Parce que le clavier de l'ordinateur se bloque après 25 messages.",
                "Parce que les modèles d'IA suppriment leur mémoire vive toutes les 10 minutes.",
                "Parce que cela consomme de l'encre d'imprimante."
              ],
              correctIndex: 0,
              explanation: "Au fur et à mesure que la fenêtre de tokens se remplit de bruit et de détails secondaires, les premières instructions s'éloignent et perdent leur poids d'attention."
            },
            {
              id: 2,
              question: "Dans l'analogie de l'artisan, que représente le 'Contexte actif' par rapport à la 'Mémoire persistante' ?",
              options: [
                "Le contexte actif est le plateau de l'établi (les outils sous les yeux maintenant), tandis que la mémoire persistante est le carnet de notes archivé sur l'étagère.",
                "Le contexte actif est le café et la mémoire est la tasse.",
                "Le contexte actif est l'électricité de la pièce.",
                "Il n'y a aucune différence, ce sont deux termes identiques."
              ],
              correctIndex: 0,
              explanation: "Le contexte actif est éphémère et correspond aux tokens présents dans la session ; la mémoire persistante est stockée dans des fichiers durables."
            },
            {
              id: 3,
              question: "Que doit contenir une Fiche de Contexte Standardisée réinjectée au milieu d'un projet ?",
              options: [
                "La stack technique, la mission précise en cours, les fichiers autorisés, l'état d'avancement des étapes et la liste des décisions déjà tranchées par l'utilisateur.",
                "La liste des courses de la semaine.",
                "Le code binaire du processeur de la machine.",
                "Les conditions générales de vente de Google Cloud."
              ],
              correctIndex: 0,
              explanation: "Cette fiche synthétique purge le bruit et rappelle à l'agent ses contraintes, son périmètre et ses décisions sans avoir à relire tout l'historique."
            }
          ]}
        />
      </section>
    </div>
  );
};
