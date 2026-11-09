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
          Chapitre 4 — Planification des tâches
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi un agent IA doit-il planifier son travail ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Face à une demande complexe telle que : <em>« Ajoute un système d&apos;inscription à mon application React avec validation des champs, communication avec une API Node.js et affichage d&apos;un message de confirmation »</em>, un agent non structuré risquerait de se précipiter pour modifier des fichiers, en oubliant la gestion d&apos;erreurs ou en cassant l&apos;état global.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          La <strong>planification des tâches (Task Planning)</strong> est le processus par lequel l&apos;agent transforme un objectif général en une succession d&apos;actions logiques, ordonnées et vérifiables avant toute modification.
        </p>
      </section>

      {/* 2. Les 5 questions de la planification */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 5 questions fondamentales de la planification
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">QUESTION 1</span>
            <div className="font-bold text-slate-950 text-sm">Résultat visé</div>
            <p className="text-xs text-slate-600 mt-1">Quel est l&apos;état final attendu ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">QUESTION 2</span>
            <div className="font-bold text-slate-950 text-sm">Informations</div>
            <p className="text-xs text-slate-600 mt-1">Quels fichiers examiner au préalable ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">QUESTION 3</span>
            <div className="font-bold text-slate-950 text-sm">Actions clés</div>
            <p className="text-xs text-slate-600 mt-1">Quelles modifications ciblées opérer ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">QUESTION 4</span>
            <div className="font-bold text-slate-950 text-sm">Ordre logique</div>
            <p className="text-xs text-slate-600 mt-1">Quelles sont les dépendances entre tâches ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">QUESTION 5</span>
            <div className="font-bold text-slate-950 text-sm">Critères de succès</div>
            <p className="text-xs text-slate-600 mt-1">Comment prouver que la tâche est réussie ?</p>
          </div>
        </div>
      </section>

      {/* 3. Les 4 stratégies de planification */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 4 stratégies de planification
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-bold text-indigo-900 text-base mb-1">A. Planification séquentielle</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Les étapes se succèdent linéairement : <em>Étape 1 → Étape 2 → Étape 3</em>. Idéal lorsque chaque opération requiert obligatoirement le livrable de la précédente (ex: créer l&apos;API puis brancher le frontend).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-bold text-emerald-900 text-base mb-1">B. Planification parallèle</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Plusieurs analyses indépendantes sont menées de front (ex: analyse du CSS d&apos;un côté et examen des types TypeScript de l&apos;autre), avant d&apos;opérer la synthèse finale.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-bold text-amber-900 text-base mb-1">C. Planification conditionnelle</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              La branche suivante dépend de l&apos;observation (ex: <em>« La compilation a-t-elle réussi ? Si oui → lancer les tests E2E ; si non → analyser la stack d&apos;erreur »</em>).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-bold text-rose-900 text-base mb-1">D. Planification adaptative</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              L&apos;agent révise son plan initial en cours de route s&apos;il découvre une information nouvelle (ex: découvrir que les données proviennent d&apos;une API GraphQL et non d&apos;un fichier JSON local).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Planification vs Exécution */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Planification vs Exécution : deux univers distincts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Phase de Planification</th>
                <th className="p-3.5 border border-slate-200">Phase d&apos;Exécution</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Nature</td>
                <td className="p-3.5 border border-slate-200">Conception et organisation abstraite</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Action concrète sur le système</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Usage des outils</td>
                <td className="p-3.5 border border-slate-200">Lecture seule et recherche d&apos;informations</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Édition de fichiers et commandes terminal</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Impact sur le projet</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Aucun (zéro risque d&apos;altération)</td>
                <td className="p-3.5 border border-slate-200 text-amber-700 font-bold">Modifications réelles du code</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="tip">
          <strong>La bonne pratique sous Antigravity :</strong> Exigez systématiquement que l&apos;agent vous présente son plan complet <em>avant</em> de lui accorder la permission de modifier le premier fichier.
        </Callout>
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.4)
        </h2>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 4.4 — Piloter la planification sans exécution</span>
          <h4 className="font-bold text-slate-950">Mission : Ajout d&apos;une recherche de produits</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Transmettez à Antigravity :<br />
            <em>« Je souhaite ajouter une recherche de produits dans mon application React. Avant toute intervention, prépare un plan de travail détaillé (objectif, fichiers à examiner, étapes, risques, tests et critères de succès). RESTRICTIONS : Ne modifie aucun fichier, ne crée aucun fichier et n&apos;exécute aucune commande. Présente uniquement ton plan dans le chat. »</em>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <strong>Étape 1 :</strong> Évaluez si le plan décompose les étapes sans modifications disproportionnées.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <strong>Étape 2 :</strong> Simulez une découverte (ex: données venant d&apos;une API) et testez la capacité d&apos;adaptation du plan.
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Planification des tâches
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 4"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial de séparer formellement la planification de l'exécution ?",
              options: [
                "Pour permettre au développeur d'auditer et d'ajuster la démarche avant qu'une modification irréversible ne soit appliquée.",
                "Parce que les agents ne savent pas planifier et exécuter le même jour.",
                "Pour obliger l'agent à redémarrer le système d'exploitation.",
                "Pour réduire la facture d'électricité du serveur."
              ],
              correctIndex: 0,
              explanation: "Valider le plan en amont permet de détecter les étapes inutiles, les fichiers mal ciblés et les risques d'incompatibilité avant toute écriture."
            },
            {
              id: 2,
              question: "Qu'appelle-t-on la planification adaptative ?",
              options: [
                "Un plan qui change toutes les 10 secondes au hasard.",
                "La capacité de l'agent à modifier ses étapes lorsqu'une nouvelle information technique est découverte lors de l'observation.",
                "Un plan qui refuse d'utiliser le terminal.",
                "Un plan limité à 2 étapes seulement."
              ],
              correctIndex: 1,
              explanation: "L'adaptabilité permet à l'agent d'ajuster son approche lorsqu'un constat inattendu (ex: fichier manquant, architecture différente) invalide l'hypothèse de départ."
            }
          ]}
        />
      </section>
    </div>
  );
};

