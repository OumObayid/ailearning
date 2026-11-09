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

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Fonctionnement des index SQL et structures B+Tree
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
            <span>Définir précisément le rôle et la nature d&apos;un index SQL.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre la structure d&apos;un B+Tree (Nœud racine, pages intermédiaires, feuilles chaînées).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer le Clustered Index (clé primaire) des index secondaires.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Générer un jeu de données de 100 000 conversations de test pour mesurer les écarts.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Évaluer le coût d&apos;un index sur les opérations d&apos;écriture (INSERT, UPDATE, DELETE).</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce qu'un index SQL ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce qu&apos;un index SQL ?
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Un <strong>index SQL</strong> est une structure de données auxiliaire optimisée, maintenue par le moteur de base de données (InnoDB), qui permet de localiser rapidement les enregistrements sans devoir lire chaque bloc de données de la table.
        </p>

        <Callout type="info" title="L'analogie du livre de 1 000 pages">
          Imaginez que vous cherchez les occurrences du terme « JavaScript » dans un manuel de 1 000 pages. Sans index, vous devez lire les 1 000 pages du début à la fin (c&apos;est le <em>Full Table Scan</em>). Avec un index alphabétique à la fin du livre, vous repérez directement les pages [42, 118, 305] en 2 secondes.
        </Callout>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Exemple concret : Table de 100 000 conversations IA</h3>
          <p className="text-sm font-semibold text-slate-800">
            Considérons une table <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">conversations</code> stockant l&apos;historique des échanges avec Gemini :
          </p>
          <pre className="rounded bg-slate-950 p-3 font-mono text-xs text-emerald-300">
{`SELECT * FROM conversations WHERE user_id = 12;`}
          </pre>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
              <span className="font-black text-rose-900 text-sm">Sans Index (Full Table Scan)</span>
              <p className="mt-1 text-xs text-slate-800 leading-relaxed">
                MySQL parcourt les <strong>100 000 lignes une par une</strong> depuis le disque dur. Le processeur sature à 100%, l&apos;I/O bloque le serveur et la requête prend ~250 ms.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
              <span className="font-black text-emerald-900 text-sm">Avec Index (Index Lookup)</span>
              <p className="mt-1 text-xs text-slate-800 leading-relaxed">
                MySQL consulte l&apos;arborescence B+Tree de <code className="font-mono">idx_conversations_user_id</code> et atteint les pointeurs des 100 conversations en <strong>0.8 ms</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Structure B+Tree */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Structure interne : L&apos;arbre B+Tree du moteur InnoDB
        </h2>
        <p className="text-base text-slate-950 font-medium">
          InnoDB n&apos;utilise pas une simple liste triée en mémoire, mais un <strong>arbre B+Tree</strong> (B-Tree étendu) auto-équilibré dont chaque page fait généralement 16 Ko :
        </p>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm my-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-4/b-tree-index-structure.svg"
              alt="Structure arborescente B+Tree d'un index InnoDB MySQL"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-center text-xs font-bold text-slate-700">
            Figure 1.1 : Structure B+Tree. Les nœuds internes orientent la recherche par comparaison d&apos;intervalles. Les feuilles tout en bas contiennent les clés primaires et sont reliées par une liste doublement chaînée pour les tris séquentiels ultra-rapides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-black text-indigo-950 text-sm">Clustered Index (Index Primaire)</h4>
            <p className="mt-1 text-xs text-slate-800 leading-relaxed">
              Dans InnoDB, la table <strong>est</strong> le B+Tree de la clé primaire (<code className="font-mono font-bold">PRIMARY KEY</code>). Les feuilles du Clustered Index contiennent directement l&apos;intégralité des colonnes de la ligne.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-black text-indigo-950 text-sm">Index Secondaire</h4>
            <p className="mt-1 text-xs text-slate-800 leading-relaxed">
              Tout index créé avec <code className="font-mono font-bold">CREATE INDEX</code> est un index secondaire. Ses feuilles ne contiennent pas toute la ligne, mais la valeur indexée ainsi que la <strong>clé primaire</strong> correspondante pour retourner chercher la ligne si nécessaire.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Expérimentation en direct dans le Laboratoire Interactif
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Testez l&apos;impact de la création d&apos;index sur le plan d&apos;exécution EXPLAIN et observez la chute spectaculaire des lignes examinées :
        </p>
        <DatabaseOptimizationLab />
      </section>

      {/* 5. Démonstration SQL pratique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Script SQL : Génération de 100 000 lignes de test
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Voici le script SQL reproductible permettant d&apos;alimenter votre base <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">formation_db</code> avec une volumétrie réaliste :
        </p>

        <CodeBlock
          language="sql"
          filename="benchmark_conversations.sql"
          code={`-- 1. Sélectionner notre base de formation
USE formation_db;

-- 2. Création de la table de conversations IA
CREATE TABLE IF NOT EXISTS conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Table utilitaire pour générer 1 000 entiers par récursion
CREATE TEMPORARY TABLE IF NOT EXISTS temp_seq (n INT PRIMARY KEY);
INSERT IGNORE INTO temp_seq (n)
WITH RECURSIVE seq AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < 1000
)
SELECT n FROM seq;

-- 4. Injection croisée de 100 000 conversations réparties sur 1 000 utilisateurs
INSERT INTO conversations (user_id, titre, contenu, created_at)
SELECT
    MOD(a.n * 1000 + b.n, 1000) + 1,
    CONCAT('Session IA #', a.n, '-', b.n),
    CONCAT('Analyse de document et prompt d\\'ingénierie pour la tâche ', a.n),
    DATE_SUB(NOW(), INTERVAL (a.n * 10 + b.n) MINUTE)
FROM temp_seq a
CROSS JOIN temp_seq b
WHERE a.n <= 100 AND b.n <= 1000;

-- 5. Vérification du volume total
SELECT COUNT(*) AS total_conversations FROM conversations;`}
        />
      </section>

      {/* 6. Coûts cachés d'un index */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Les coûts cachés : Pourquoi ne pas indexer toutes les colonnes ?
        </h2>
        <Callout type="warning" title="La règle d'or de l'ingénieur Backend">
          Chaque index supplémentaire représente un <strong>B+Tree distinct écrit sur le disque</strong>. Lors d&apos;un <code className="font-mono">INSERT</code> ou d&apos;un <code className="font-mono">UPDATE</code>, MySQL doit réorganiser et rééquilibrer chacun de ces arbres. Avoir 15 index sur une table ralentit considérablement les écritures et fait exploser la consommation de RAM du pool InnoDB (Buffer Pool).
        </Callout>

        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Opération</th>
                <th className="p-3">Impact d&apos;un index</th>
                <th className="p-3">Explication technique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-bold text-emerald-700">SELECT (Lecture)</td>
                <td className="p-3 font-black text-emerald-700">Accélération spectaculaire (jusqu&apos;à 300x)</td>
                <td className="p-3">Recherche logarithmique O(log N) au lieu de balayer séquentiellement chaque page disque.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-700">INSERT (Écriture)</td>
                <td className="p-3 text-rose-700 font-bold">Ralentissement proportionnel au nombre d&apos;index</td>
                <td className="p-3">MySQL doit insérer la ligne dans le Clustered Index, puis insérer un pointeur dans chaque index secondaire.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-700">UPDATE (Modification)</td>
                <td className="p-3 text-rose-700 font-bold">Ralentissement si les colonnes modifiées sont indexées</td>
                <td className="p-3">Nécessite la suppression de l&apos;ancienne valeur et la réinsertion ordonnée dans l&apos;arbre de l&apos;index.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-700">Espace Disque &amp; RAM</td>
                <td className="p-3 text-amber-800 font-bold">Surcoût mémoire continu</td>
                <td className="p-3">Sur de grosses tables, la somme des index dépasse souvent la taille des données elles-mêmes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Mesurer la différence d'exécution avec EXPLAIN"
        objective="Créer la table conversations, mesurer l'estimation du plan d'exécution sans index, puis créer idx_conversations_user_id et comparer les métriques."
        steps={[
          "Exécuter le script SQL de génération des 100 000 conversations de test.",
          "Lancer la commande EXPLAIN SELECT * FROM conversations WHERE user_id = 12; et noter type: ALL et rows: 100 000.",
          "Créer l'index secondaire avec CREATE INDEX idx_conversations_user_id ON conversations(user_id);.",
          "Relancer la commande EXPLAIN et constater le passage au type ref et rows ~100.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Index SQL & B+Tree"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal d'un index SQL ?",
              options: [
                "Accélérer la récupération des données en évitant le parcours complet de la table",
                "Chiffrer les colonnes sensibles de la base de données",
                "Augmenter la taille du disque dur automatiquement",
                "Remplacer les requêtes SQL par du code JavaScript",
              ],
              correctIndex: 0,
              explanation: "Un index est une structure de données d'accès rapide permettant au moteur SQL de pointer directement sur les enregistrements voulus.",
            },
            {
              id: 2,
              question: "Que signifie le type d'accès 'ALL' dans le résultat d'une commande EXPLAIN ?",
              options: [
                "Un Full Table Scan : MySQL doit parcourir l'intégralité de la table du début à la fin",
                "Une requête utilisant tous les index disponibles simultanément",
                "Une requête parfaitement optimisée",
                "Une erreur de syntaxe SQL",
              ],
              correctIndex: 0,
              explanation: "'ALL' indique le pire scénario de lecture : aucun index exploitable, la totalité des pages disque doit être scannée.",
            },
            {
              id: 3,
              question: "Quelle structure d'arbre équilibré le moteur InnoDB utilise-t-il par défaut pour ses index ?",
              options: [
                "B+Tree",
                "Arbre binaire simple (Binary Search Tree)",
                "Liste chaînée unidirectionnelle",
                "Tableau statique contigu",
              ],
              correctIndex: 0,
              explanation: "InnoDB utilise des B+Trees car leurs feuilles contiennent les données et sont reliées horizontalement, garantissant une faible profondeur d'arbre (hauteur 3 ou 4 pour des millions de lignes).",
            },
            {
              id: 4,
              question: "Pourquoi est-il déconseillé d'ajouter un index sur chacune des colonnes d'une table ?",
              options: [
                "Parce que chaque index ralentit les opérations d'écriture (INSERT, UPDATE, DELETE) et alourdit la mémoire",
                "Car MySQL limite les index à un seul par table",
                "Parce que les requêtes SELECT échoueraient",
                "Car cela supprime les clés étrangères",
              ],
              correctIndex: 0,
              explanation: "Chaque écriture oblige MySQL à mettre à jour tous les index concernés, ce qui pénalise fortement les performances applicatives si la table subit un trafic d'écriture soutenu.",
            },
            {
              id: 5,
              question: "Que contient la feuille d'un index secondaire dans le moteur InnoDB ?",
              options: [
                "La valeur indexée ainsi que la clé primaire (PRIMARY KEY) de la ligne correspondante",
                "L'intégralité de la ligne et tous ses champs de texte TEXT",
                "L'adresse mémoire RAM du serveur",
                "Un fichier binaire compressé au format ZIP",
              ],
              correctIndex: 0,
              explanation: "Les index secondaires stockent la valeur de la colonne et la clé primaire. Si la requête demande d'autres colonnes non couvertes par l'index, InnoDB effectue une recherche supplémentaire dans le Clustered Index.",
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
          title="Compétences validées pour le Chapitre 1"
          items={[
            "Je sais expliquer le fonctionnement d'un index SQL et l'analogie du livre.",
            "Je comprends pourquoi un Full Table Scan (type: ALL) dégrade le CPU du serveur.",
            "Je connais la structure d'un B+Tree et le rôle des feuilles chaînées.",
            "Je comprends la différence fondamentale entre Clustered Index et index secondaire.",
            "Je sais peser le compromis entre vitesse de lecture et coût d'écriture lors de la création d'un index.",
          ]}
        />
      </section>
    </div>
  );
};

