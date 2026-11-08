'use client';

import React from 'react';
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
          Chapitre 1 — Identifier les causes d&apos;un mauvais résultat
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi les agents échouent-ils ?
        </h2>
        <p className="text-slate-700">
          Créer un agent IA ne garantit aucunement qu&apos;il produira toujours des résultats conformes. Même avec des instructions principales soignées, un agent peut :
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700 font-medium">
          <li>Modifier des fichiers qui ne concernent absolument pas sa mission.</li>
          <li>Inventer des informations ou des fonctions absentes du projet (hallucinations).</li>
          <li>Mal comprendre une consigne implicite ou ambiguë.</li>
          <li>Oublier des contraintes posées au début de la session.</li>
          <li>Utiliser des informations périmées ou supposer des dépendances fictives.</li>
          <li>Effectuer une tâche incomplète tout en prétendant l&apos;avoir achevée.</li>
          <li>Produire une réponse qui ne respecte pas le format de sortie exigé.</li>
        </ul>
        <p className="text-slate-700">
          Le rôle de l&apos;ingénieur prompt ne se borne donc pas à écrire des règles : il doit savoir <strong>analyser les erreurs, en identifier la cause racine et appliquer des corrections ciblées</strong>. C&apos;est le cœur du pilotage d&apos;agents.
        </p>
      </section>

      {/* 2. Qu'est-ce qu'un mauvais résultat ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce qu&apos;un &quot;mauvais résultat&quot; ?
        </h2>
        <p className="text-slate-700">
          Un mauvais résultat est une production de l&apos;agent qui ne respecte pas un ou plusieurs éléments de sa mission. Il peut s&apos;agir d&apos;une erreur de compréhension, de raisonnement, d&apos;utilisation du contexte, de non-respect des limites ou d&apos;usage abusif d&apos;outils.
        </p>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <Icon name="exclamation-circle" className="w-5 h-5" />
            <span>Exemple concret dans Google Antigravity :</span>
          </div>
          <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-xs">
            Demande utilisateur : &quot;Analyse le composant Projects.jsx et indique les problèmes éventuels. Ne modifie aucun fichier.&quot;<br /><br />
            Comportement de l&apos;agent : L&apos;agent analyse le composant, puis ouvre et modifie également App.jsx et projects.js.
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold">
            Même si les retouches de code sont techniquement brillantes, <strong>le résultat est mauvais</strong> : l&apos;agent a violé le périmètre et l&apos;interdiction formelle d&apos;écriture.
          </p>
        </div>
      </section>

      {/* 3. Les 7 principales causes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 7 causes majeures de dysfonctionnement
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 1 — Instructions insuffisamment précises</span>
            <p className="text-slate-700">
              Une consigne trop générale comme <em>&quot;Améliore ce qui ne va pas&quot;</em> invite l&apos;agent à explorer l&apos;ensemble du dépôt, installer des bibliothèques ou restructurer le code à sa guise.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-slate-800">
              Correction : Délimiter précisément la cible (<code className="text-indigo-600">src/components/Projects.jsx</code>), interdire toute écriture et exiger une restitution dans le chat.
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 2 — Instructions contradictoires</span>
            <p className="text-slate-700">
              Donner simultanément deux règles incompatibles : <em>&quot;Ne modifie aucun fichier&quot;</em> et <em>&quot;Corrige automatiquement les erreurs détectées&quot;</em>.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-slate-800">
              Correction : Établir la hiérarchie : <em>&quot;Propose des corrections dans le chat ; toute écriture sur le disque requiert une validation explicite.&quot;</em>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 3 — Contexte insuffisant</span>
            <p className="text-slate-700">
              Demander <em>&quot;Ajoute une recherche aux projets&quot;</em> sans préciser où sont stockées les données ni quel composant gère l&apos;affichage pousse l&apos;agent à faire des suppositions risquées.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-slate-800">
              Correction : Fournir les données cibles et ordonner : <em>&quot;Demande les éléments manquants avant d&apos;élaborer une solution.&quot;</em>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 4 — Mauvaise gestion du contexte dans le temps</span>
            <p className="text-slate-700">
              Au fil d&apos;une session longue de 20 échanges, l&apos;attention du LLM se dilue et les contraintes de départ sont progressivement ignorées.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-slate-800">
              Correction : Rappeler les contraintes essentielles, décomposer les tâches et vérifier les autorisations avant chaque appel d&apos;outil.
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 5 — Instructions redondantes ou répétées</span>
            <p className="text-slate-700">
              Répéter cinq fois <em>&quot;Ne change pas le code&quot;</em> de manières légèrement différentes sature la fenêtre de contexte et dilue les directives opérationnelles.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-slate-800">
              Correction : Factoriser en un seul bloc concis et exhaustif définissant le MODE LECTURE SEULE.
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 6 — Hallucinations et affirmations sans preuve</span>
            <p className="text-slate-700">
              L&apos;agent affirme qu&apos;une fonction <code>connectGeminiAPI()</code> ou que le protocole JWT est utilisé sans avoir vu la moindre ligne de code justificative.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-slate-800">
              Correction : Imposer l&apos;obligation de preuve : distinguer formellement fait avéré, hypothèse de travail et information manquante.
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 7 — Mauvaise utilisation des outils</span>
            <p className="text-slate-700">
              L&apos;agent lance une commande terminal lourde alors qu&apos;une simple lecture suffisait, ou annonce un test réussi sans avoir appelé le runner.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-slate-800">
              Correction : Poser le principe : <em>&quot;Un outil techniquement disponible n&apos;est pas automatiquement autorisé.&quot;</em>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Méthode de diagnostic en 6 étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le cycle de diagnostic et de correction en 6 étapes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 1</span>
            <h4 className="font-bold text-slate-950">Observer le résultat</h4>
            <p className="text-slate-600">Identifier précisément ce que l&apos;agent a produit, modifié ou appelé comme outils.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 2</span>
            <h4 className="font-bold text-slate-950">Comparer avec la mission</h4>
            <p className="text-slate-600">Relever les écarts formels entre le résultat attendu et le résultat constaté.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 3</span>
            <h4 className="font-bold text-slate-950">Identifier la cause racine</h4>
            <p className="text-slate-600">Isoler l&apos;ambiguïté, la contradiction, le manque de contexte ou le biais d&apos;outil.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 4</span>
            <h4 className="font-bold text-slate-950">Corriger les instructions</h4>
            <p className="text-slate-600">Modifier uniquement la règle défaillante sans réécrire arbitrairement tout le prompt.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 5</span>
            <h4 className="font-bold text-slate-950">Refaire le test à l&apos;identique</h4>
            <p className="text-slate-600">Soumettre la même demande d&apos;entrée pour observer l&apos;impact réel du changement.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 6</span>
            <h4 className="font-bold text-slate-950">Vérifier l&apos;absence de régression</h4>
            <p className="text-slate-600">S&apos;assurer que la correction n&apos;a pas introduit de nouveau comportement indésirable.</p>
          </div>
        </div>
      </section>

      {/* 5. Fiche d'analyse d'incident */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Fiche standard d&apos;analyse des erreurs d&apos;agent
        </h2>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Élément de la fiche</th>
                <th className="p-3">Question clé à poser</th>
                <th className="p-3">Exemple de diagnostic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-bold text-slate-900">Mission initiale</td>
                <td className="p-3">Qu&apos;avais-je formellement demandé ?</td>
                <td className="p-3 font-mono text-xs">Auditer Projects.jsx en lecture seule</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Résultat constaté</td>
                <td className="p-3">Qu&apos;a réellement produit ou touché l&apos;agent ?</td>
                <td className="p-3 font-mono text-xs">A édité Projects.jsx et App.jsx</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Écart mesuré</td>
                <td className="p-3">Quelle règle a été violée ?</td>
                <td className="p-3 font-mono text-xs">Écriture non autorisée + fuite de périmètre</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Cause racine</td>
                <td className="p-3">Pourquoi cette erreur est-elle survenue ?</td>
                <td className="p-3 font-mono text-xs">Le mot &quot;améliore&quot; a été pris pour un ordre d&apos;écriture</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Correction ciblée</td>
                <td className="p-3">Quelle instruction faut-il ajouter ou préciser ?</td>
                <td className="p-3 font-mono text-xs">Mode lecture seule strict + propositions en texte</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="tip" title="Règle fondamentale du pilotage">
          Ne cherchez pas simplement à rendre un agent plus &quot;obéissant&quot; en accumulant les interdictions sous le coup de la frustration. Cherchez à comprendre scientifiquement pourquoi il a dévié et corrigez précisément la cause racine.
        </Callout>
      </section>

      {/* Mini-Quiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Mini-évaluation : Diagnostic d&apos;agent défaillant
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la première erreur de périmètre lorsqu'un agent explore plusieurs fichiers alors qu'un seul composant a été spécifié ?",
              options: [
                "L'agent consulte plusieurs fichiers sans périmètre strict défini",
                "L'agent utilise React",
                "L'agent présente un rapport trop structuré",
                "L'agent utilise TypeScript"
              ],
              correctIndex: 0,
              explanation: "Lorsque le périmètre n'est pas strictement verrouillé en amont, l'agent prend l'initiative d'élargir ses recherches au reste du projet."
            },
            {
              id: 2,
              question: "Pourquoi la tentative de lecture d'un fichier .env par un agent est-elle critique ?",
              options: [
                "Parce que ce fichier est toujours vide",
                "Parce qu'il peut contenir des secrets et clés d'API hautement confidentiels",
                "Parce qu'il contient du code binaire",
                "Parce que Git l'interdit par défaut"
              ],
              correctIndex: 1,
              explanation: "Les fichiers .env contiennent les secrets de l'infrastructure et doivent être sanctuarisés hors de portée de l'agent."
            },
            {
              id: 3,
              question: "Que doit faire un agent avant d'appliquer une modification sur un fichier existant ?",
              options: [
                "Modifier directement le fichier en silence",
                "Demander une autorisation explicite en présentant un diff préalable",
                "Créer une copie zip de tout le disque dur",
                "Attendre le redémarrage de la machine"
              ],
              correctIndex: 1,
              explanation: "Une modification de fichier requiert une pause explicite avec présentation de l'impact (diff) et accord de l'utilisateur (HITL)."
            },
            {
              id: 4,
              question: "L'agent peut-il annoncer un test comme réussi s'il n'a pas réellement exécuté la commande de test ?",
              options: [
                "Oui, si le code a l'air fonctionnel",
                "Non, il doit formellement distinguer une analyse statique d'un test réellement exécuté",
                "Oui, pour rassurer l'utilisateur",
                "Oui, si la modification fait moins de 5 lignes"
              ],
              correctIndex: 1,
              explanation: "Prétendre qu'un test est réussi sans avoir lancé l'outil constitue une hallucination et une tromperie grave de conformité."
            }
          ]}
        />
      </section>
    </div>
  );
};

