'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Déboguer un prompt
        </h1>
      </div>

      {/* 1. Correction simple vs Débogage */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Différence entre corriger un prompt et déboguer un prompt
        </h2>
        <p className="text-slate-700">
          En programmation traditionnelle, déboguer consiste à remonter la pile d&apos;exécution pour localiser la ligne de code en faute. En prompt engineering, le débogage examine la chaîne d&apos;instructions pour comprendre <strong>comment le modèle a interprété la consigne</strong>.
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Correction simple (Empirique)</th>
                <th className="p-3">Débogage méthodique (Ingénieur)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3">Modifier une phrase au hasard</td>
                <td className="p-3 font-semibold text-emerald-800">Rechercher la cause racine de l&apos;ambiguïté</td>
              </tr>
              <tr>
                <td className="p-3">Ajouter une interdiction de plus à chaque raté</td>
                <td className="p-3 font-semibold text-emerald-800">Vérifier pourquoi la règle existante a été contournée</td>
              </tr>
              <tr>
                <td className="p-3">Réécrire tout le prompt d&apos;un coup</td>
                <td className="p-3 font-semibold text-emerald-800">Isoler et tester une seule instruction à la fois</td>
              </tr>
              <tr>
                <td className="p-3">Espérer une amélioration sans mesurer</td>
                <td className="p-3 font-semibold text-emerald-800">Tester sur un jeu d&apos;essai stable et quantifier l&apos;écart</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Les 5 éléments à examiner */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 5 composantes fondamentales à inspecter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-indigo-700">1. Le Rôle (Persona)</span>
            <p className="text-slate-600">
              Est-il calibré pour la tâche ? Déclarer <em>&quot;Tu es un développeur senior&quot;</em> incite l&apos;agent à écrire du code ; pour une analyse, préférez <em>&quot;Tu es un auditeur en lecture seule&quot;</em>.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-indigo-700">2. La Mission (Objectif)</span>
            <p className="text-slate-600">
              Est-elle délimitée sans verbe d&apos;action ambigu ? Évitez <em>&quot;Améliore mon code&quot;</em> au profit de <em>&quot;Identifie les failles et propose des diffs dans la discussion&quot;</em>.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-indigo-700">3. Le Contexte fourni</span>
            <p className="text-slate-600">
              L&apos;agent a-t-il les informations suffisantes, ou est-il contraint d&apos;inventer des technologies et chemins de fichiers pour combler les trous ?
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-indigo-700">4. Les Contraintes et limites</span>
            <p className="text-slate-600">
              Les interdictions sont-elles vérifiables et non contradictoires ? L&apos;interdiction d&apos;écriture prime-t-elle explicitement sur toute demande de correction ?
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs text-xs sm:text-sm">
          <span className="font-bold text-indigo-700">5. Le Format du résultat attendu</span>
          <p className="text-slate-600">
            La réponse attendue comporte-t-elle des sections explicites (Problème, Preuve observée, Risque, Recommandation, Inconnues restantes) ?
          </p>
        </div>
      </section>

      {/* 3. Les 5 techniques de débogage */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 5 techniques opérationnelles de débogage
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-white border-l-4 border-indigo-600 rounded-r-xl shadow-xs space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-950">Technique 1 — Isoler l&apos;instruction responsable</h4>
            <p className="text-slate-700">Rechercher le terme déclencheur. Par exemple, l&apos;expression <em>&quot;corrige tout ce qui peut l&apos;être&quot;</em> est la cause directe d&apos;une écriture sauvage sur disque.</p>
          </div>

          <div className="p-4 bg-white border-l-4 border-indigo-600 rounded-r-xl shadow-xs space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-950">Technique 2 — Tester une seule modification à la fois</h4>
            <p className="text-slate-700">Si vous changez simultanément le rôle, les contraintes et le format, vous ignorez quelle modification a résolu le bug ou provoqué une régression.</p>
          </div>

          <div className="p-4 bg-white border-l-4 border-indigo-600 rounded-r-xl shadow-xs space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-950">Technique 3 — Encadrer les situations d&apos;absence de données</h4>
            <p className="text-slate-700">Définir le comportement d&apos;arrêt : <em>&quot;Si une information est absente, ne l&apos;invente pas : déclare son absence et pose une question à l&apos;utilisateur.&quot;</em></p>
          </div>

          <div className="p-4 bg-white border-l-4 border-indigo-600 rounded-r-xl shadow-xs space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-950">Technique 4 — Remplacer les expressions subjectives par du mesurable</h4>
            <p className="text-slate-700">Remplacer <em>&quot;Fais un travail complet&quot;</em> par <em>&quot;Respecte scrupuleusement les 5 rubriques du canevas d&apos;audit.&quot;</em></p>
          </div>

          <div className="p-4 bg-white border-l-4 border-indigo-600 rounded-r-xl shadow-xs space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-950">Technique 5 — Définir des critères d&apos;achèvement (Definition of Done)</h4>
            <p className="text-slate-700">L&apos;agent sait qu&apos;il a terminé quand aucun fichier n&apos;a été écrit, tous les constats sont documentés et les incertitudes sont listées.</p>
          </div>
        </div>
      </section>

      {/* 4. Suivi des versions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le tableau de suivi des versions d&apos;un agent (Prompt Changelog)
        </h2>
        <p className="text-slate-700">
          Chaque itération d&apos;instructions doit être archivée pour faciliter les tests comparatifs et prévenir les régressions :
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Version</th>
                <th className="p-3">Modification apportée</th>
                <th className="p-3">Problème ciblé</th>
                <th className="p-3">Résultat du test</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-xs">
              <tr>
                <td className="p-3 font-bold text-slate-900">V1.0</td>
                <td className="p-3">Prompt initial généraliste</td>
                <td className="p-3">—</td>
                <td className="p-3 text-rose-700">Modifie des fichiers sans accord</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">V1.1</td>
                <td className="p-3">Ajout de la règle de lecture seule</td>
                <td className="p-3">Écritures sauvages</td>
                <td className="p-3 text-amber-700">Ne modifie plus mais invente JWT</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">V1.2</td>
                <td className="p-3">Obligation de preuve et distinction faits/hypothèses</td>
                <td className="p-3">Hallucinations techniques</td>
                <td className="p-3 text-emerald-700 font-bold">Conforme aux 5 critères de test</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="note" title="Reproductibilité des tests">
          Pour valider qu&apos;une version V1.2 est supérieure à une version V1.1, vous devez impérativement lui soumettre <strong>la même requête exacte avec les mêmes fichiers en entrée</strong>.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Débogage de prompt
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il déconseillé de modifier simultanément le rôle, les contraintes et le format d'un prompt lors d'un débogage ?",
              options: [
                "Parce que le compilateur TypeScript génère une erreur",
                "Parce qu'il devient impossible d'identifier quelle modification a produit l'amélioration ou introduit une régression",
                "Parce que cela vide la base de données",
                "Parce que les clés d'API changent d'adresse"
              ],
              correctIndex: 1,
              explanation: "Comme dans toute démarche scientifique, l'isolation des variables est indispensable pour mesurer l'effet réel de chaque ajustement."
            },
            {
              id: 2,
              question: "Quelle formulation remplace le plus efficacement la consigne vague 'Améliore mon code' ?",
              options: [
                "Fais de ton mieux sans faire d'erreur",
                "Analyse le fichier fourni, relève les failles et propose des corrections sous forme de diff sans modifier le fichier",
                "Rends le projet plus rapide et sécurisé",
                "Installe les packages nécessaires"
              ],
              correctIndex: 1,
              explanation: "Une consigne précise indique l'action (analyser), la cible (fichier fourni), la forme du livrable (diff) et la limite d'autorité (sans modifier le fichier)."
            }
          ]}
        />
      </section>
    </div>
  );
};

