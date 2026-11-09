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

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Index simples, uniques et composites (Règle du préfixe gauche)
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
            <span>Créer et exploiter un index simple sur une seule colonne.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Mettre en œuvre un index UNIQUE pour allier accélération de recherche et intégrité de données.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le comportement de UNIQUE face aux valeurs NULL.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Concevoir des index composites multi-colonnes pour filtrer et trier simultanément.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser la règle du préfixe gauche et comprendre pourquoi l&apos;ordre des colonnes est capital.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Auditer les index existants avec SHOW INDEX et supprimer les index superflus avec DROP INDEX.</span>
          </li>
        </ul>
      </section>

      {/* 2. Index Simple vs Index UNIQUE */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Index Simple et Index UNIQUE : Performance vs Intégrité
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-3">
            <span className="rounded bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-900 border border-indigo-300">
              Index Simple (INDEX)
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Accélération pure des lectures</h3>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              Créé sur une seule colonne fréquemment filtrée dans la clause <code>WHERE</code>. Autorise les doublons de valeurs sans aucune restriction.
            </p>
            <pre className="rounded bg-slate-950 p-3 font-mono text-xs text-indigo-300">
{`CREATE INDEX idx_user_id 
ON conversations(user_id);`}
            </pre>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-3">
            <span className="rounded bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-900 border border-emerald-300">
              Index Unique (UNIQUE INDEX)
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Performance + Règle d&apos;intégrité</h3>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              Interdit formellement toute insertion de valeur dupliquée. Rejette la requête avec l&apos;erreur <em>Duplicate entry</em>.
            </p>
            <pre className="rounded bg-slate-950 p-3 font-mono text-xs text-emerald-300">
{`CREATE UNIQUE INDEX idx_email_unique 
ON utilisateurs(email);`}
            </pre>
          </div>
        </div>

        <Callout type="tip" title="Le comportement subtil des valeurs NULL avec UNIQUE">
          Dans MySQL, un index UNIQUE <strong>autorise plusieurs valeurs NULL</strong> par défaut (car en théorie relationnelle SQL, deux NULL ne sont jamais considérés comme égaux). Si une colonne doit être impérativement unique et toujours renseignée (comme une adresse email d&apos;authentification), vous devez déclarer la colonne avec <code>NOT NULL UNIQUE</code>.
        </Callout>
      </section>

      {/* 3. L'Index Composite & La Règle du Préfixe Gauche */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. L&apos;Index Composite et la Règle du Préfixe Gauche (Leftmost Prefix)
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Un <strong>index composite</strong> regroupe 2, 3 ou plusieurs colonnes au sein d&apos;un même B+Tree. Il est particulièrement puissant pour les requêtes combinant filtre et tri, telles que :
        </p>

        <pre className="rounded-xl bg-slate-950 p-3.5 font-mono text-xs text-emerald-400">
{`SELECT id, titre, created_at 
FROM conversations 
WHERE user_id = 12 
ORDER BY created_at DESC 
LIMIT 20;`}
        </pre>

        {/* SVG Diagram: Leftmost prefix analysis */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm my-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-4/composite-index-leftmost-prefix.svg"
              alt="Analyse de la règle du préfixe gauche pour un index composite MySQL"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-center text-xs font-bold text-slate-700">
            Figure 2.1 : Matrice d&apos;analyse du préfixe gauche pour <code className="font-mono">idx_user_date_id(user_id, created_at, id)</code>. Toute requête débutant par la colonne 1 exploite l&apos;arbre B+Tree. Toute requête omettant la colonne pivôt user_id est incapable d&apos;accéder à l&apos;index directement.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">L&apos;analogie de l&apos;annuaire téléphonique (Nom, Prénom)</h3>
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            Un annuaire papier est trié par <strong>[Nom de famille, puis Prénom]</strong> :
          </p>
          <ul className="space-y-2 text-xs font-bold text-slate-900">
            <li className="flex items-center gap-2">
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-900">Cas A</span>
              <span>Recherche sur le Nom « Alami » : <strong>Immédiat</strong> (accès direct à la lettre A).</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-900">Cas B</span>
              <span>Recherche sur le Nom « Alami » ET Prénom « Omar » : <strong>Immédiat</strong> (on va aux Alami, puis aux Omar).</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded bg-rose-100 px-2 py-0.5 text-rose-900">Cas C</span>
              <span>Recherche sur le Prénom « Omar » seul (sans Nom) : <strong>Impossible d&apos;utiliser l&apos;ordre !</strong> Vous devez relire tout l&apos;annuaire de la première à la dernière page (Full Table Scan).</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Expérimentation dans le Laboratoire Interactif
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Sélectionnez la requête <em>« WHERE created_at &gt;= ... (sans user_id) »</em> pour observer en direct comment MySQL rejette l&apos;index composite :
        </p>
        <DatabaseOptimizationLab />
      </section>

      {/* 5. Index composite UNIQUE */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Cas d&apos;usage avancé : Index composite UNIQUE
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Dans une application d&apos;IA générative, vous pouvez souhaiter qu&apos;un utilisateur ne puisse pas enregistrer deux fois le même identifiant d&apos;analyse externe, tout en autorisant deux utilisateurs distincts à avoir une analyse de même nom :
        </p>

        <CodeBlock
          language="sql"
          filename="unique_composite_constraint.sql"
          code={`-- Création de la table des analyses IA
CREATE TABLE IF NOT EXISTS analyses_ia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reference_analyse VARCHAR(100) NOT NULL,
    prompt TEXT NOT NULL,
    tokens_used INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Contrainte UNIQUE composite sur la paire (user_id, reference_analyse)
    UNIQUE KEY uq_user_ref (user_id, reference_analyse)
) ENGINE=InnoDB;

-- Insertion 1 : utilisateur 12, analyse 'DOC-01' -> SUCCÈS
INSERT INTO analyses_ia (user_id, reference_analyse, prompt) 
VALUES (12, 'DOC-01', 'Analyse du contrat de travail');

-- Insertion 2 : utilisateur 18, analyse 'DOC-01' -> SUCCÈS (combinaison différente)
INSERT INTO analyses_ia (user_id, reference_analyse, prompt) 
VALUES (18, 'DOC-01', 'Analyse financière Q3');

-- Insertion 3 : utilisateur 12, analyse 'DOC-01' à nouveau -> ERREUR !
-- MySQL renvoie : ERROR 1062 (23000): Duplicate entry '12-DOC-01' for key 'uq_user_ref'`}
        />
      </section>

      {/* 6. Inspection et gestion des index */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Examiner et supprimer des index dans MySQL
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Pour vérifier la présence, le nom et la position des colonnes composant vos index :
        </p>

        <CodeBlock
          language="sql"
          filename="inspect_indexes.sql"
          code={`-- 1. Lister tous les index de la table conversations
SHOW INDEX FROM conversations;

-- 2. Supprimer un index devenu obsolète ou redondant
DROP INDEX idx_user_id ON conversations;

-- 3. Ajouter un index composite optimisé pour les listes paginées
CREATE INDEX idx_user_created ON conversations(user_id, created_at DESC);`}
        />
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Conception d'index simples et composites dans MySQL"
        objective="Mettre en place un index composite (user_id, created_at), vérifier l'application de la règle du préfixe gauche et concevoir une contrainte d'unicité composite."
        steps={[
          "Créer la table analyses_ia avec la contrainte UNIQUE composite sur (user_id, reference_analyse).",
          "Tester des insertions valides et provoquer délibérément l'erreur MySQL 1062 Duplicate entry.",
          "Exécuter SHOW INDEX FROM analyses_ia et vérifier la colonne Seq_in_index (1 pour user_id, 2 pour reference_analyse).",
          "Valider avec EXPLAIN qu'une recherche par user_id seul utilise cet index, alors qu'une recherche par reference_analyse seule l'ignore.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Index Simples, Uniques et Composites"
          questions={[
            {
              id: 1,
              question: "Quelle est la particularité d'un index UNIQUE par rapport à un index standard ?",
              options: [
                "Il interdit l'enregistrement de valeurs dupliquées tout en accélérant les recherches",
                "Il est obligatoirement stocké sur un SSD externe",
                "Il supprime les données de la table après chaque lecture",
                "Il ne fonctionne que sur les colonnes de type DATE",
              ],
              correctIndex: 0,
              explanation: "Un index UNIQUE joue un double rôle : il offre les performances de recherche d'un B+Tree et assure la cohérence des données en empêchant tout doublon.",
            },
            {
              id: 2,
              question: "Dans un index composite créé avec 'CREATE INDEX idx_user_date ON conversations(user_id, created_at)', quelle colonne constitue le préfixe principal ?",
              options: [
                "user_id (la première colonne déclarée à gauche)",
                "created_at (la dernière colonne)",
                "Les deux colonnes sont traitées de manière totalement symétrique et interchangeable",
                "La clé primaire id",
              ],
              correctIndex: 0,
              explanation: "La règle du préfixe gauche stipule que le tri initial de l'arbre s'effectue sur user_id. created_at n'est triée qu'à l'intérieur de chaque valeur de user_id.",
            },
            {
              id: 3,
              question: "La requête 'SELECT * FROM conversations WHERE created_at >= '2026-10-01'' peut-elle exploiter efficacement l'index (user_id, created_at) ?",
              options: [
                "Non, car la première colonne de l'index (user_id) est totalement absente du filtre",
                "Oui, car MySQL réorganise dynamiquement les colonnes de l'index à la volée",
                "Oui, mais seulement sous Linux",
                "Oui, à condition d'ajouter la clause LIMIT",
              ],
              correctIndex: 0,
              explanation: "Sans valeur pour user_id, InnoDB est incapable d'entrer dans l'arbre pour cibler un sous-groupe de dates, ce qui provoque généralement un Full Table Scan.",
            },
            {
              id: 4,
              question: "Que se passe-t-il si vous tentez d'insérer un email déjà existant dans une colonne dotée d'un index UNIQUE ?",
              options: [
                "MySQL refuse l'insertion et renvoie l'erreur 1062 Duplicate entry",
                "MySQL écrase silencieusement l'ancien enregistrement",
                "La base de données s'arrête",
                "La valeur est insérée avec un suffixe numérique automatique",
              ],
              correctIndex: 0,
              explanation: "Le moteur InnoDB garantit l'intégrité en rejetant immédiatement la transaction d'écriture avec une erreur de doublon de clé.",
            },
            {
              id: 5,
              question: "Quelle commande SQL permet de lister l'ensemble des index et de leur composition sur une table ?",
              options: [
                "SHOW INDEX FROM nom_table;",
                "SELECT * FROM sys.all_indexes;",
                "DESCRIBE INDEXES;",
                "EXPLAIN TABLE nom_table;",
              ],
              correctIndex: 0,
              explanation: "La syntaxe officielle MySQL pour inspecter les index, leur unicité et la position ordonnée de leurs colonnes est 'SHOW INDEX FROM nom_table;'.",
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
          title="Compétences validées pour le Chapitre 2"
          items={[
            "Je sais choisir entre un index simple et un index unique selon le besoin métier.",
            "Je comprends la règle du préfixe gauche (Leftmost Prefix Rule) et son impact sur l'ordre des colonnes.",
            "Je sais concevoir un index composite pour couvrir à la fois un filtre WHERE et un tri ORDER BY.",
            "Je comprends le comportement des valeurs NULL dans un index UNIQUE MySQL.",
            "Je sais utiliser SHOW INDEX et DROP INDEX pour auditer et nettoyer mes tables.",
          ]}
        />
      </section>
    </div>
  );
};

