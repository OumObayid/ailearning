'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — Validation des résultats par un agent IA
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Terminer une tâche ne signifie pas la réussir
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un agent IA peut lire des fichiers, proposer un plan, modifier un composant sans générer d&apos;erreur de syntaxe et vous annoncer fièrement : <em>« La tâche est terminée avec succès »</em>. Pourtant, le bouton ajouté peut ne rien déclencher, supprimer le mauvais produit en base ou détériorer l&apos;affichage sur smartphone.
        </p>
        <Callout type="warning">
          <strong>Principe de validation formelle :</strong> Aucune tâche ne doit être considérée comme accomplie sans avoir franchi les filtres de vérification technique et fonctionnelle appuyés sur des critères d&apos;acceptation mesurables.
        </Callout>
      </section>

      {/* 2. Les 4 niveaux de validation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 niveaux de validation indispensables
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-950 text-base mb-1">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              <span>Validation structurelle</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Vérifier que les fichiers, dossiers et composants requis existent physiquement et sont placés au bon endroit (ex: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">src/components/DeleteProduct.jsx</code>).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-950 text-base mb-1">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
              <span>Validation technique</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Vérifier la conformité syntaxique et la transpilation : exécution de <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">npm run lint</code> et <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">npm run build</code> avec Exit Code 0.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-950 text-base mb-1">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
              <span>Validation fonctionnelle</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Vérifier que le comportement métier est effectif : cliquer sur le bouton supprime le bon élément dans l&apos;interface et déclenche la bonne requête HTTP vers l&apos;API.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-950 text-base mb-1">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">4</span>
              <span>Validation de conformité</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Vérifier que l&apos;agent a respecté le périmètre strict imposé : aucun composant tiers n&apos;a été modifié sans autorisation et aucun secret n&apos;a été divulgué.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Déclaré vs Exécuté vs Vérifié */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Déclaré vs Exécuté vs Vérifié : Le triptyque de la vérité
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Statut</th>
                <th className="p-3.5 border border-slate-200">Ce que cela signifie</th>
                <th className="p-3.5 border border-slate-200">Preuve exigible</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-amber-700">DÉCLARÉ</td>
                <td className="p-3.5 border border-slate-200">L&apos;agent affirme dans son message avoir effectué l&apos;action.</td>
                <td className="p-3.5 border border-slate-200 text-slate-500">Aucune preuve (simple texte généré).</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">EXÉCUTÉ</td>
                <td className="p-3.5 border border-slate-200">L&apos;outil d&apos;édition ou de terminal a effectivement été déclenché.</td>
                <td className="p-3.5 border border-slate-200">Traces d&apos;appels d&apos;outils et logs bruts de commande.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-700">VÉRIFIÉ</td>
                <td className="p-3.5 border border-slate-200">Des tests observables confirment que le comportement attendu est atteint.</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Rapport de tests unifiés, diff inspecté et tests fonctionnels.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Prompt de validation du travail */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Prompt professionnel : Validation systématique sous Antigravity
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`[MISSION_DE_VALIDATION]
Réalise un audit exhaustif des modifications que tu viens d'effectuer :

1. AUDIT DU DIFF :
   Identifie les fichiers modifiés et créés. Vérifie qu'aucun changement hors sujet n'a été introduit.

2. CONTROLE TECHNIQUE :
   Propose les commandes de build et de lint nécessaires, et attends mon feu vert avant de les lancer.

3. CONFRONTATION AUX CRITERES D'ACCEPTATION :
   Compare le comportement actuel aux critères initialement définis.
   Distingue explicitement les points testés de ceux restant à tester manuellement.

4. REGLE IMPERATIVE :
   Ne déclare JAMAIS un test réussi s'il n'a pas été réellement exécuté.
   Ne réalise aucune nouvelle modification pendant cette phase d'audit sans mon autorisation.`}</pre>
        </div>
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.9)
        </h2>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 4.9 — Validation d&apos;une carte de portfolio React</span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Ajoutez un bouton « Voir les détails » sur vos cartes de projets React.<br />
            Avant de valider : (1) définissez 5 critères d&apos;acceptation, (2) inspectez le Diff généré par l&apos;agent, (3) lancez <code className="font-mono text-xs">npm run build</code>, (4) testez le clic dans le navigateur sur plusieurs cartes, et (5) demandez à l&apos;agent de dresser le bilan des points conformes et non testés.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Validation des résultats
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 9"
          questions={[
            {
              id: 1,
              question: "Quelle différence fondamentale sépare un résultat 'déclaré' d'un résultat 'vérifié' ?",
              options: [
                "Le résultat déclaré est plus long à lire.",
                "Le résultat déclaré est une simple affirmation textuelle de l'agent, tandis que le résultat vérifié repose sur des preuves tangibles (diff, tests réussis, observation du comportement).",
                "Le résultat vérifié est toujours faux.",
                "Il n'y a aucune différence technique."
              ],
              correctIndex: 1,
              explanation: "Un agent peut déclarer de bonne foi que tout fonctionne ; seule une vérification outillée (tests, builds, assertions) constitue une preuve acceptable."
            },
            {
              id: 2,
              question: "Pourquoi est-il crucial de définir des critères d'acceptation AVANT le début d'une tâche de développement ?",
              options: [
                "Pour donner à l'agent un étalon objectif permettant de juger sans ambiguïté si le livrable est complet et conforme.",
                "Pour empêcher l'agent de lire le code.",
                "Pour supprimer automatiquement les tests unitaires.",
                "Pour remplacer le fichier package.json."
              ],
              correctIndex: 0,
              explanation: "Sans critères mesurables préalables, l'agent s'arrête au premier indice superficiel de complétion, générant des fonctionnalités incomplètes."
            }
          ]}
        />
      </section>
    </div>
  );
};

