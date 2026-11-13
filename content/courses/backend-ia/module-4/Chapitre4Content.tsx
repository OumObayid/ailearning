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

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 w-full max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words [overflow-wrap:anywhere] min-w-0">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Bases de données &amp; Indexation</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — Optimisation des recherches, LIKE et pagination par curseur
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
            <span>Comprendre les limites physiques des recherches avec LIKE &apos;%motif%&apos;.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Découvrir les index FULLTEXT de MySQL pour les longs contenus de prompts.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier le piège de scalabilité de OFFSET sur les tables de millions de lignes.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Concevoir une pagination par curseur stable avec tie-breaker (created_at, id).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Construire l&apos;API Express paginée avec pool de connexions et le composant React.</span>
          </li>
        </ul>
      </section>

      {/* 2. Recherche Textuelle : LIKE vs FULLTEXT */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Recherche textuelle : Le piège du joker initial dans LIKE
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Dans une interface d&apos;historique IA, les utilisateurs cherchent des conversations par mots-clés. L&apos;opérateur <code>LIKE</code> réagit très différemment selon la position du joker <code>%</code> :
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Syntaxe SQL</th>
                <th className="p-3">Utilisation d&apos;un B+Tree standard</th>
                <th className="p-3">Comportement moteur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-700">LIKE &apos;JavaScript%&apos;</td>
                <td className="p-3 font-bold text-emerald-800">✅ OUI (Recherche par plage)</td>
                <td className="p-3">Le préfixe étant connu, InnoDB saute au début de la lettre J et scanne la plage correspondante.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-700">LIKE &apos;%JavaScript%&apos;</td>
                <td className="p-3 font-bold text-rose-800">✅ NON (Full Table Scan obligatoire)</td>
                <td className="p-3">Le mot pouvant apparaître au milieu ou à la fin, l&apos;index B+Tree est incapable d&apos;éliminer la moindre ligne.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="tip" title="La règle de conception pour les moteurs de recherche IA">
          Pour une recherche dans les conversations, si l&apos;utilisateur tape les premières lettres d&apos;un titre, un index composite avec <code>titre LIKE &apos;terme%&apos;</code> est ultra-efficace. Si la recherche porte sur le corps complet de la discussion (prompts de plusieurs paragraphes), basculez impérativement sur un index <strong>FULLTEXT</strong> ou un moteur de recherche vectoriel (comme <strong>Qdrant</strong>).
        </Callout>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">La solution pour le texte long : L&apos;index FULLTEXT</h3>
          <p className="text-sm font-semibold text-slate-800">
            Pour rechercher rapidement des expressions dans des colonnes de texte lourd (prompts et réponses de LLM) :
          </p>
          <CodeBlock
            language="sql"
            filename="fulltext_search.sql"
            code={`-- 1. Ajouter un index de recherche en texte intégral
ALTER TABLE conversations 
ADD FULLTEXT INDEX idx_fulltext_contenu (contenu);

-- 2. Recherche par mot-clé optimisée en langage naturel
SELECT id, titre, MATCH(contenu) AGAINST('Node.js') AS score
FROM conversations
WHERE MATCH(contenu) AGAINST('Node.js' IN NATURAL LANGUAGE MODE)
ORDER BY score DESC
LIMIT 10;`}
          />
        </div>
      </section>

      {/* 3. Analyse comparative de la pagination */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Données comparatives : Le dérapage de OFFSET sur 1 000 000 de lignes
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Sur les premières pages, <code>OFFSET</code> paraît rapide. Mais dès que la pagination s&apos;approfondit, la dégradation est brutale :
        </p>

        {/* SVG Diagram: Pagination benchmark */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm my-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-4/pagination-benchmark-analysis.svg"
              alt="Analyse comparative de pagination LIMIT/OFFSET vs Curseur sur un million de lignes"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-center text-xs font-bold text-slate-700">
            Figure 4.1 : Analyse de latence. ì la page 10 000, <code>OFFSET 99 990</code> force MySQL à lire et rejeter 99 990 enregistrements (latence ~580 ms), tandis que la pagination par curseur maintient une latence constante de 1.2 ms en toutes circonstances.
          </p>
        </div>
      </section>

      {/* 4. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Expérimentation dans le Laboratoire Interactif
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Rendez-vous dans l&apos;onglet <strong>&quot;OFFSET vs Curseur&quot;</strong> pour comparer le volume de lignes jetées et le temps de réponse selon la profondeur :
        </p>
        <DatabaseOptimizationLab />
      </section>

      {/* 5. Implémentation Cursor Pagination en Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation : API Express avec pagination par curseur
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Le principe consiste à retenir la date et l&apos;identifiant de la dernière conversation affichée pour reprendre directement la lecture grâce à l&apos;index composite :
        </p>

        <CodeBlock
          language="javascript"
          filename="server-cursor-pagination.js"
          code={`const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'formation_db',
  connectionLimit: 10,
});

// Endpoint de pagination par curseur
app.get('/api/conversations/cursor', async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
    const cursorDate = req.query.cursorDate;
    const cursorId = Number(req.query.cursorId);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ success: false, message: 'userId invalide' });
    }

    let sql = \`
      SELECT id, titre, created_at 
      FROM conversations 
      WHERE user_id = ?
    \`;
    const params = [userId];

    // Si un curseur est transmis, reprendre strictement après cet enregistrement
    if (cursorDate && cursorId > 0) {
      sql += \`
        AND (
          created_at < ? 
          OR (created_at = ? AND id < ?)
        )
      \`;
      params.push(cursorDate, cursorDate, cursorId);
    }

    // On demande 1 ligne supplémentaire (limit + 1) pour vérifier l'existence d'une page suivante
    sql += \` ORDER BY created_at DESC, id DESC LIMIT ?\`;
    params.push(limit + 1);

    const [rows] = await pool.execute(sql, params);
    const hasNextPage = rows.length > limit;
    const data = rows.slice(0, limit);
    const lastItem = data[data.length - 1];

    res.json({
      success: true,
      data,
      pagination: {
        limit,
        hasNextPage,
        nextCursor: hasNextPage && lastItem ? {
          cursorDate: lastItem.created_at,
          cursorId: lastItem.id,
        } : null,
      },
    });
  } catch (err) {
    console.error('Erreur SQL:', err);
    res.status(500).json({ success: false, message: 'Erreur lors de la pagination' });
  }
});

app.listen(3000, () => console.log('API Curseur démarrée sur http://localhost:3000'));`}
        />
      </section>

      {/* 6. Composant React avec AbortController */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Intégration React avec annulation de requête (AbortController)
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Lier <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">AbortController</code> évite les réponses périmées si l&apos;utilisateur clique plusieurs fois rapidement sur la pagination :
        </p>

        <CodeBlock
          language="tsx"
          filename="PaginatedConversations.tsx"
          code={`import React, { useState, useEffect } from 'react';

export const PaginatedConversations: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPage = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(\`http://localhost:3000/api/conversations?userId=12&page=\${page}&limit=10\`, {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.success) {
          setConversations(json.data);
          setTotalPages(json.pagination.totalPages);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error(err);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchPage();
    return () => controller.abort(); // Annule la requête si changement de page rapide
  }, [page]);

  return (
    <div className="rounded-xl border p-5 bg-white space-y-4">
      <h3 className="font-black text-slate-950">Historique des Prompts (Page {page} / {totalPages})</h3>
      {isLoading ? (
        <p className="text-xs text-slate-500">Chargement de la page...</p>
      ) : (
        <ul className="divide-y text-xs">
          {conversations.map((c) => (
            <li key={c.id} className="py-2 flex justify-between">
              <span className="font-bold text-slate-900">{c.titre}</span>
              <span className="text-slate-500">{new Date(c.created_at).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <button disabled={page <= 1 || isLoading} onClick={() => setPage((p) => p - 1)} className="rounded bg-slate-950 text-white px-3 py-1 font-bold disabled:bg-slate-300">
          Précédent
        </button>
        <button disabled={page >= totalPages || isLoading} onClick={() => setPage((p) => p + 1)} className="rounded bg-slate-950 text-white px-3 py-1 font-bold disabled:bg-slate-300">
          Suivant
        </button>
      </div>
    </div>
  );
};`}
        />
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Conception d'une Cursor Pagination robuste"
        objective="Construire la route Express de pagination par curseur, tester avec Postman les passages de page avec nextCursor, et mesurer la stabilité de la latence."
        steps={[
          "Créer l'index composite CREATE INDEX idx_user_created_id ON conversations(user_id, created_at DESC, id DESC);.",
          "Déployer la route GET /api/conversations/cursor acceptant cursorDate et cursorId.",
          "Effectuer un appel sans paramètre de curseur pour récupérer la page 1 et noter le nextCursor retourné.",
          "Passer ce nextCursor dans l'appel suivant et constater que le résultat démarre exactement à l'enregistrement N+1.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Pagination & Recherche SQL"
          questions={[
            {
              id: 1,
              question: "Pourquoi la pagination avec 'OFFSET 100000' devient-elle très lente sur MySQL ?",
              options: [
                "Parce que le moteur doit parcourir et écarter 100 000 lignes avant de retourner les 10 demandées",
                "Car OFFSET supprime les fichiers temporaires",
                "Car le mot OFFSET est banni par le compilateur",
                "Car les index sont désactivés au-delà de la page 100",
              ],
              correctIndex: 0,
              explanation: "LIMIT M OFFSET N contraint MySQL à lire N lignes depuis le disque pour les ignorer, ce qui consomme énormément d'I/O et de mémoire sur les grandes valeurs de N.",
            },
            {
              id: 2,
              question: "Quel est l'atout majeur de la pagination par curseur (Cursor Pagination) ?",
              options: [
                "Elle garantit un temps de réponse constant en O(1) quelle que soit la profondeur atteinte",
                "Elle évite de créer des clés primaires",
                "Elle permet de stocker les images directement dans MySQL",
                "Elle supprime automatiquement les doublons",
              ],
              correctIndex: 0,
              explanation: "Grâce à la clause WHERE (created_at, id) < (valeurs), MySQL saute directement au point de reprise grâce au B+Tree sans jamais relire les pages antérieures.",
            },
            {
              id: 3,
              question: "Pourquoi utilise-t-on le champ 'id' en plus de 'created_at' dans la clause de curseur ?",
              options: [
                "Comme départageur (tie-breaker) au cas où plusieurs conversations auraient exactement la même seconde de création",
                "Car MySQL exige obligatoirement deux colonnes par table",
                "Pour calculer la somme des entiers",
                "Pour chiffrer la date",
              ],
              correctIndex: 0,
              explanation: "Si 5 conversations partagent le même horodatage, un curseur basé uniquement sur created_at risquerait d'ignorer certaines lignes lors du passage à la page suivante.",
            },
            {
              id: 4,
              question: "Pourquoi 'WHERE titre LIKE '%Node.js%'' ne peut-il pas utiliser un index B+Tree conventionnel ?",
              options: [
                "Parce que le caractère joker initial '%' signifie que le mot peut débuter à n'importe quelle position de la chaîne",
                "Car le mot Node.js comporte un point",
                "Parce que LIKE est réservé aux chiffres",
                "Car InnoDB n'autorise pas la recherche textuelle",
              ],
              correctIndex: 0,
              explanation: "Un arbre B+Tree est trié alphabétiquement par le début des mots. Si le début est inconnu (% au début), l'arbre est inutile et un scan séquentiel est requis.",
            },
            {
              id: 5,
              question: "Quel type d'index spécialisé MySQL propose-t-il pour rechercher rapidement des mots dans de longs textes d'IA ?",
              options: [
                "Index FULLTEXT",
                "Index HASH",
                "Index SPATIAL",
                "Index XML",
              ],
              correctIndex: 0,
              explanation: "Les index FULLTEXT découpent le texte en lexèmes (mots-clés) et permettent des recherches pondérées par pertinence avec la syntaxe MATCH(...) AGAINST(...).",
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
          title="Compétences validées pour le Chapitre 4"
          items={[
            "Je comprends les limites de LIKE '%...%' et sais quand employer un index FULLTEXT.",
            "Je sais calculer l'OFFSET d'une page (OFFSET = (page - 1) * limit).",
            "J'identifie pourquoi un grand OFFSET dégrade les performances serveur.",
            "Je maîtrise la Cursor Pagination avec index composite (user_id, created_at, id).",
            "J'utilise AbortController dans React pour annuler les requêtes de pagination obsolètes.",
          ]}
        />
      </section>
    </div>
  );
};
