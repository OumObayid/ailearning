'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { DatabaseOptimizationLab } from '@/components/interactive/DatabaseOptimizationLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Analyse approfondie des requêtes avec EXPLAIN et EXPLAIN ANALYZE
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base font-semibold text-slate-950">
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le rôle du plan d&apos;exécution MySQL avant d&apos;écrire du code backend.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Interpréter la hiérarchie des types d&apos;accès : ALL, index, range, ref, eq_ref, const.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Déchiffrer la colonne Extra : Using where, Using index (Covering) et Using filesort.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Mesurer l&apos;exécution réelle, le coût et le temps CPU avec EXPLAIN ANALYZE.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre pourquoi MySQL peut décider d&apos;ignorer un index existant (Sélectivité &amp; Statistiques).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Appliquer une méthodologie rigoureuse de diagnostic sur une API Node.js/Express.</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que EXPLAIN ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que l&apos;instruction EXPLAIN ?
        </h2>
        <p className="text-base text-slate-950 font-medium">
          <strong>EXPLAIN</strong> est la commande d&apos;audit la plus puissante de MySQL. Placée devant une requête <code>SELECT</code>, elle ordonne à l&apos;optimiseur de dévoiler sa stratégie interne sans exécuter la requête elle-même.
        </p>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Les 5 questions auxquelles répond EXPLAIN</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-slate-900 pt-2">
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-indigo-800 uppercase block font-black">1. Tables lues</span>
              Dans quel ordre InnoDB consulte-t-il les tables jointes ?
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-indigo-800 uppercase block font-black">2. Type d&apos;accès</span>
              Lit-on toute la table (ALL) ou utilise-t-on un arbre d&apos;index (ref, range) ?
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-indigo-800 uppercase block font-black">3. Choix d&apos;index</span>
              Quel index parmi les candidats (possible_keys) a été retenu (key) ?
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-indigo-800 uppercase block font-black">4. Volume estimé</span>
              Combien de lignes (rows) le moteur prévoit-il d&apos;examiner ?
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Analyse comparative des données graphiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Analyse comparative des données d&apos;exécution réelles
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Visualisons les données mesurées lors du banc d&apos;essai sur les 100 000 conversations de notre base :
        </p>

        {/* SVG Diagram: Query plan analysis data */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm my-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-4/query-plan-analysis-data.svg"
              alt="Analyse comparative des données d'exécution EXPLAIN ANALYZE avec et sans index"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-center text-xs font-bold text-slate-700">
            Figure 3.1 : Données chiffrées issues d&apos;un audit EXPLAIN ANALYZE. L&apos;index réduit la latence de 248 ms à 0.82 ms et multiplie le débit admissible de l&apos;API par 300.
          </p>
        </div>
      </section>

      {/* 4. Décorticage des colonnes EXPLAIN */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Décorticage approfondi des colonnes du résultat EXPLAIN
        </h2>

        <div className="space-y-4">
          <h3 className="text-base font-black text-indigo-950">A. La colonne &apos;type&apos; (Du plus rapide au plus lent)</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-300">
            <table className="w-full text-left text-xs font-medium">
              <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
                <tr>
                  <th className="p-2.5">type</th>
                  <th className="p-2.5">Performance</th>
                  <th className="p-2.5">Description technique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
                <tr>
                  <td className="p-2.5 font-mono font-black text-emerald-700">system / const</td>
                  <td className="p-2.5 font-bold text-emerald-800">Ultra-rapide (O(1))</td>
                  <td className="p-2.5">Accès direct par clé primaire ou contrainte UNIQUE avec une seule valeur constante.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-black text-emerald-700">eq_ref</td>
                  <td className="p-2.5 font-bold text-emerald-800">Excellent</td>
                  <td className="p-2.5">Dans une jointure, une seule ligne correspondante est lue pour chaque ligne de la table précédente.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-black text-emerald-600">ref</td>
                  <td className="p-2.5 font-bold text-emerald-800">Très bon</td>
                  <td className="p-2.5">Recherche par référence dans un index non unique (ex: <code>WHERE user_id = 12</code>).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-black text-amber-600">range</td>
                  <td className="p-2.5 font-bold text-amber-800">Bon</td>
                  <td className="p-2.5">Recherche dans une plage de valeurs avec opérateur (&gt;, &lt;, BETWEEN, IN).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-black text-orange-600">index</td>
                  <td className="p-2.5 font-bold text-orange-800">Moyen</td>
                  <td className="p-2.5">Parcours complet de l&apos;arbre de l&apos;index au lieu de la table complète.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-black text-rose-700">ALL</td>
                  <td className="p-2.5 font-black text-rose-800">Très lent (Danger)</td>
                  <td className="p-2.5">Full Table Scan : lecture intégrale de toutes les pages disque de la table.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-black text-indigo-950 pt-2">B. La colonne &apos;Extra&apos; et ses signaux d&apos;alerte</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-3.5 space-y-1">
              <span className="font-black text-emerald-900 block">Using index (Covering)</span>
              <p className="text-slate-800 font-semibold">
                Graal de l&apos;optimisation ! Toutes les colonnes demandées figurent dans l&apos;index. InnoDB n&apos;a même pas besoin de toucher au Clustered Index de la table.
              </p>
            </div>
            <div className="rounded-xl border border-rose-300 bg-rose-50/60 p-3.5 space-y-1">
              <span className="font-black text-rose-900 block">Using filesort</span>
              <p className="text-slate-800 font-semibold">
                Alerte performance ! L&apos;ordre demandé dans <code>ORDER BY</code> n&apos;étant pas fourni par l&apos;index, MySQL doit stocker les résultats et les trier en mémoire ou sur disque.
              </p>
            </div>
            <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-3.5 space-y-1">
              <span className="font-black text-amber-900 block">Using temporary</span>
              <p className="text-slate-800 font-semibold">
                MySQL doit créer une table temporaire pour résoudre un GROUP BY ou un DISTINCT complexe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Laboratoire Interactif : Analysez le plan en direct
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Ouvrez l&apos;onglet <strong>&quot;Index &amp; EXPLAIN&quot;</strong> pour observer l&apos;évolution de la table EXPLAIN selon les index cochés :
        </p>
        <DatabaseOptimizationLab />
      </section>

      {/* 6. EXPLAIN ANALYZE : Mesure réelle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Mesure réelle en production avec EXPLAIN ANALYZE
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Introduit dans MySQL 8.0, <strong>EXPLAIN ANALYZE</strong> exécute réellement la requête et produit un arbre hiérarchique avec chronométrage précis en millisecondes :
        </p>

        <CodeBlock
          language="sql"
          filename="explain_analyze_benchmark.sql"
          code={`-- Exécution et chronométrage réel sur notre table de conversations
EXPLAIN ANALYZE
SELECT id, titre, created_at
FROM conversations
WHERE user_id = 12
ORDER BY created_at DESC
LIMIT 20;

/* Résultat type produit par MySQL 8.0 :
-> Limit: 20 row(s)  (cost=12.50 rows=20) (actual time=0.082..0.114 rows=20 loops=1)
    -> Index lookup on conversations using idx_user_date (user_id=12) 
       (cost=12.50 rows=100) (actual time=0.080..0.110 rows=20 loops=1)
*/`}
        />

        <Callout type="warning" title="Ne jamais utiliser EXPLAIN ANALYZE sur des requêtes de suppression destructive">
          Contrairement à EXPLAIN qui n&apos;est qu&apos;une simulation mathématique, <strong>EXPLAIN ANALYZE exécute concrètement la requête</strong>. Ne le lancez jamais sur un <code>DELETE</code> ou <code>UPDATE</code> sans précaution préalable dans une transaction annulée !
        </Callout>
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Diagnostic complet d'une requête lente avec EXPLAIN"
        objective="Analyser une requête sur les dates, diagnostiquer l'apparition d'un Using filesort, concevoir un index composite pour le supprimer et comparer les plans."
        steps={[
          "Lancer EXPLAIN SELECT * FROM conversations WHERE user_id = 12 ORDER BY created_at DESC LIMIT 20; avec uniquement idx_user_id.",
          "Constater la présence de Using filesort dans la colonne Extra.",
          "Créer l'index composite CREATE INDEX idx_user_created ON conversations(user_id, created_at DESC);.",
          "Relancer la commande et vérifier que Using filesort a totalement disparu grâce au tri naturel de l'arbre B+Tree.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Analyse EXPLAIN"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence fondamentale entre EXPLAIN et EXPLAIN ANALYZE ?",
              options: [
                "EXPLAIN donne des estimations théoriques sans exécuter la requête, tandis qu'EXPLAIN ANALYZE exécute la requête pour mesurer le temps réel",
                "EXPLAIN ANALYZE ne fonctionne que sur SQLite",
                "EXPLAIN est réservé aux administrateurs réseau",
                "Il n'y a aucune différence",
              ],
              correctIndex: 0,
              explanation: "EXPLAIN calcule le plan théorique d'après les statistiques de l'optimiseur. EXPLAIN ANALYZE exécute concrètement le code pour fournir les durées et nombres de lignes exacts.",
            },
            {
              id: 2,
              question: "Que signale la présence de 'Using filesort' dans la colonne Extra ?",
              options: [
                "Que MySQL a dû effectuer une passe de tri supplémentaire car l'index n'était pas trié selon la clause ORDER BY",
                "Qu'un fichier CSV a été enregistré sur le disque dur de l'utilisateur",
                "Que la base de données a planté",
                "Que la requête a été mise en cache avec succès",
              ],
              correctIndex: 0,
              explanation: "Using filesort signifie qu'un algorithme de tri (en mémoire RAM ou disque) a dû être exécuté après la lecture des lignes car l'index ne fournissait pas l'ordre demandé.",
            },
            {
              id: 3,
              question: "Pourquoi MySQL peut-il choisir un type 'ALL' (Full Table Scan) même lorsqu'un index existe sur la colonne ?",
              options: [
                "Si la condition correspond à une part trop importante de la table (ex: 80% des lignes), le parcours séquentiel direct est jugé moins coûteux",
                "Parce que les index MySQL sont désactivés le week-end",
                "Parce qu'un index ne fonctionne qu'une seule fois par jour",
                "Car la mémoire RAM est pleine",
              ],
              correctIndex: 0,
              explanation: "L'optimiseur est probabiliste : aller-retourner 80 000 fois entre un index secondaire et la table principale coûte plus cher en I/O que de lire séquentiellement toute la table d'un coup.",
            },
            {
              id: 4,
              question: "Que signifie 'Using index' dans la colonne Extra ?",
              options: [
                "Covering Index : toutes les colonnes requises sont lues directement dans l'index sans toucher à la table principale",
                "Que l'index est endommagé",
                "Que la table est vide",
                "Que MySQL utilise un fichier texte",
              ],
              correctIndex: 0,
              explanation: "'Using index' indique un index couvrant (Covering Index) : les données nécessaires au SELECT sont 100% présentes dans les n�uds feuilles de l'index, évitant tout accès aux pages de la table.",
            },
            {
              id: 5,
              question: "Quelle commande permet d'actualiser les statistiques de distribution utilisées par l'optimiseur MySQL ?",
              options: [
                "ANALYZE TABLE nom_table;",
                "UPDATE STATISTICS ALL;",
                "RELOAD DATABASE;",
                "OPTIMIZE NOW;",
              ],
              correctIndex: 0,
              explanation: "ANALYZE TABLE rééchantillonne la distribution des clés et met à jour les métriques que l'optimiseur consulte pour évaluer la sélectivité de chaque index.",
            },
          ]}
        />
      </section>

      {/* 9. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Checklist de validation des compétences
        </h2>
        <InteractiveChecklist
          title="Compétences validées pour le Chapitre 3"
          items={[
            "Je sais lancer et interpréter un plan d'exécution EXPLAIN.",
            "Je connais la signification des types d'accès (ALL, index, range, ref, eq_ref, const).",
            "Je sais identifier et corriger un tri Using filesort grâce à un index composite.",
            "Je comprends les informations réelles délivrées par EXPLAIN ANALYZE.",
            "Je connais la commande ANALYZE TABLE pour recalculer les statistiques d'index.",
          ]}
        />
      </section>
    </div>
  );
};

