'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type QueryScenarioKey =
  | 'full_table_scan'
  | 'n_plus_one_orm'
  | 'composite_index_hit'
  | 'unpaginated_payload';

interface QueryScenario {
  title: string;
  badge: string;
  badgeColor: string;
  sqlQuery: string;
  explainType: 'ALL (Full Table Scan)' | 'ref / range (Index Scan)' | '51 Requêtes Séparées';
  rowsExamined: string;
  rowsReturned: string;
  dbExecutionTimeMs: number;
  transferTimeMs: number;
  ttfbMs: number;
  status: 'CRITICAL_SLOW' | 'N_PLUS_ONE_LEAK' | 'OPTIMAL_PERFORMANCE' | 'NETWORK_BOTTLENECK';
  diagnosis: string;
  remediationCode: string;
}

const QUERY_SCENARIOS: Record<QueryScenarioKey, QueryScenario> = {
  full_table_scan: {
    title: '1. Scan Complet de Table (Full Table Scan - Absence d\'Index)',
    badge: 'Scan ALL (2M Lignes)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    sqlQuery: `SELECT * FROM orders 
WHERE customer_id = 94821 
ORDER BY created_at DESC;`,
    explainType: 'ALL (Full Table Scan)',
    rowsExamined: '2 150 000 lignes',
    rowsReturned: '14 lignes',
    dbExecutionTimeMs: 2840,
    transferTimeMs: 12,
    ttfbMs: 2890,
    status: 'CRITICAL_SLOW',
    diagnosis: 'MySQL ne dispose d\'aucun index sur la colonne customer_id. Le moteur InnoDB doit lire l\'intégralité des 2 millions de pages de la table depuis le disque dur pour trouver seulement 14 commandes. Le CPU de la base de données sature à 100%.',
    remediationCode: `-- ✅ SOLUTION : Ajouter un index composite (customer_id, created_at)
CREATE INDEX idx_orders_customer_created 
ON orders (customer_id, created_at DESC);

-- Après indexation : MySQL cible directement les 14 lignes dans l'arbre B-Tree en 1.8 ms !`,
  },
  n_plus_one_orm: {
    title: '2. Le Piège du N+1 Queries (ORM ou Boucle For Backend)',
    badge: '51 Requêtes SQL',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    sqlQuery: `// 1 requête pour lister 50 commandes :
SELECT * FROM orders LIMIT 50;

// + 50 requêtes individuelles dans une boucle pour récupérer chaque client :
SELECT * FROM users WHERE id = 101;
SELECT * FROM users WHERE id = 102;
// ... (x50 requêtes en série)`,
    explainType: '51 Requêtes Séparées',
    rowsExamined: '50 + 50 lignes',
    rowsReturned: '50 commandes + clients',
    dbExecutionTimeMs: 1450,
    transferTimeMs: 28,
    ttfbMs: 1510,
    status: 'N_PLUS_ONE_LEAK',
    diagnosis: 'Même si chaque requête individuelle ne prend que 2 ms, le cumul des 51 allers-retours réseau (Round-Trip Time) entre Node.js et MySQL génère une latence totale de 1,5 seconde. Chaque requête subit la surcharge du protocole TCP/BDD.',
    remediationCode: `// ✅ SOLUTION 1 (SQL Pur) : Une seule jointure JOIN
SELECT o.id, o.total, o.created_at, u.name, u.email
FROM orders o
INNER JOIN users u ON o.user_id = u.id
LIMIT 50;

// ✅ SOLUTION 2 (Prisma ORM) : Eager loading avec 'include'
const orders = await prisma.order.findMany({
  take: 50,
  include: { user: true } // Réalisé en 1 seule requête avec JOIN ou WHERE id IN (...)
});`,
  },
  composite_index_hit: {
    title: '3. Requête Indexée Optimale (Index Covering / B-Tree Match)',
    badge: 'Index Range Scan',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    sqlQuery: `EXPLAIN SELECT id, total, created_at 
FROM orders 
WHERE customer_id = 94821 
ORDER BY created_at DESC 
LIMIT 20;`,
    explainType: 'ref / range (Index Scan)',
    rowsExamined: '20 lignes',
    rowsReturned: '20 lignes',
    dbExecutionTimeMs: 2.1,
    transferTimeMs: 3.5,
    ttfbMs: 18,
    status: 'OPTIMAL_PERFORMANCE',
    diagnosis: 'Le plan d\'exécution utilise l\'index `idx_orders_customer_created`. Le moteur parcourt immédiatement les 20 feuilles cibles de l\'arbre sans lire aucune ligne superflue. Aucun tri temporaire (Using filesort) n\'est requis.',
    remediationCode: `// ✅ Code Express Ultra-Performant avec projection stricte
app.get('/api/orders/user/:id', async (req, res) => {
  const [rows] = await db.query(
    'SELECT id, total, status, created_at FROM orders WHERE customer_id = ? ORDER BY created_at DESC LIMIT 20',
    [req.params.id]
  );
  res.json({ orders: rows });
});`,
  },
  unpaginated_payload: {
    title: '4. Sur-sélection & Absence de Pagination (Payload Obèse de 45 Mo)',
    badge: 'Payload 45 Mo',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    sqlQuery: `SELECT * FROM articles 
WHERE published = 1;
-- Retourne 120 000 articles avec corps de texte complet HTML`,
    explainType: 'ALL (Full Table Scan)',
    rowsExamined: '120 000 lignes',
    rowsReturned: '120 000 lignes',
    dbExecutionTimeMs: 350,
    transferTimeMs: 4200,
    ttfbMs: 380,
    status: 'NETWORK_BOTTLENECK',
    diagnosis: 'La base de données met 350 ms à extraire les données, mais la sérialisation JSON de 45 Mo en mémoire Node.js puis le transfert réseau vers le navigateur client prennent plus de 4 secondes. Le navigateur freeze lors du parsing JSON dans le DOM.',
    remediationCode: `// ✅ SOLUTION : Pagination par curseur ou Offset + Projection sélective
app.get('/api/articles', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = 20;
  const offset = (page - 1) * limit;

  // On ne sélectionne QUE le résumé, pas le contenu HTML lourd
  const [articles] = await db.query(
    'SELECT id, title, slug, excerpt, published_at FROM articles WHERE published = 1 ORDER BY published_at DESC LIMIT ? OFFSET ?',
    [limit, offset]
  );
  res.json({ page, limit, articles });
});`,
  },
};

export const Chapitre4Content: React.FC = () => {
  const [activeScenarioKey, setActiveScenarioKey] = useState<QueryScenarioKey>('full_table_scan');
  const activeScenario = QUERY_SCENARIOS[activeScenarioKey];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="activity" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Identifier les Requêtes Lentes (Frontend, Backend & SQL)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Isoler la source exacte d&apos;une latence : décomposer le waterfall DevTools, activer le Slow Query Log MySQL, maîtriser <code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">EXPLAIN</code> et éradiquer le problème N+1 Queries.
        </p>
      </div>

      {/* Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Déterminer si un ralentissement provient du réseau, du code Node.js ou de la base de données.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Interpréter les indicateurs du timing DevTools (Queueing, Stalled, Waiting TTFB, Content Download).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Analyser le plan d&apos;exécution SQL avec <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">EXPLAIN</code> (type, key, rows, extra).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Détecter et corriger le syndrome N+1 Queries généré par les ORM.</span>
          </div>
        </div>
      </section>

      {/* 1. Où se cache la latence ? Décomposition du cheminement */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="clock" className="w-5 h-5 text-indigo-600" />
          1. Anatomie d&apos;une Requête : Les 4 Segments d&apos;Étranglement
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Lorsqu&apos;un utilisateur se plaint d&apos;un clic qui prend 4 secondes à répondre, le réflexe du développeur inexpérimenté est d&apos;accuser aveuglément le réseau ou la base de données. 
          En réalité, le temps total d&apos;une requête (<code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">Total Duration</code>) se décompose en 4 segments distincts :
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Segment</th>
                <th className="px-4 py-3">Composant responsable</th>
                <th className="px-4 py-3">Durée normale</th>
                <th className="px-4 py-3">Symptôme d&apos;anomalie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-indigo-700">1. Client / Browser</td>
                <td className="px-4 py-2.5 font-medium">Queueing, Stalled, Thread UI bloqué par JS</td>
                <td className="px-4 py-2.5 font-medium">&lt; 15 ms</td>
                <td className="px-4 py-2.5 font-medium">Plus de 6 requêtes simultanées en HTTP/1.1 (navigateur bridé)</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-cyan-700">2. Réseau & TLS</td>
                <td className="px-4 py-2.5 font-medium">DNS Lookup, TCP Handshake, Négociation TLS/SSL</td>
                <td className="px-4 py-2.5 font-medium">20 à 80 ms</td>
                <td className="px-4 py-2.5 font-medium">DNS lent, absence de HTTP Keep-Alive, latence transatlantique</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-rose-700">3. Backend (TTFB)</td>
                <td className="px-4 py-2.5 font-medium">Routage Express, Middlewares, Event Loop, Requêtes SQL</td>
                <td className="px-4 py-2.5 font-medium">30 à 150 ms</td>
                <td className="px-4 py-2.5 font-medium">TTFB supérieur à 1 000 ms : boucle CPU ou attente BDD</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-purple-700">4. Transfert Réseau</td>
                <td className="px-4 py-2.5 font-medium">Téléchargement du payload utile (Content Download)</td>
                <td className="px-4 py-2.5 font-medium">10 à 50 ms</td>
                <td className="px-4 py-2.5 font-medium">Réponse JSON de 30 Mo non-paginée ou images non-compressées</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Décortiquer le DevTools Network Timing */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="search" className="w-5 h-5 text-emerald-600" />
          2. Déchiffrer l&apos;onglet Timing de Chrome DevTools
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Dans l&apos;onglet <strong>Network</strong> de Chrome DevTools, cliquer sur une ligne de requête puis ouvrir l&apos;onglet <strong>Timing</strong> fournit une radiographie exacte du temps passé :
        </p>

        {/* Figure 6.4.A - Preserving image5.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image5.jpeg"
              alt="Décomposition du temps de réponse dans l'onglet Timing de Chrome DevTools (Figure 6.4.A)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 6.4.A — Décomposition de la cascade temporelle (Timing Waterfall) : Détection d&apos;un TTFB anormal.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-900 text-xs block mb-1">Si &quot;Waiting for server response (TTFB)&quot; est géant :</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le problème réside intégralement <strong>côté serveur</strong>. Le navigateur a déjà envoyé la requête et attend passivement le premier octet de données. Vous devez profiler le code Node.js et les requêtes SQL/NoSQL.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-900 text-xs block mb-1">Si &quot;Content Download&quot; est anormalement long :</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le serveur a répondu rapidement, mais le <strong>volume de données transféré est disproportionné</strong>. Vérifiez si vous renvoyez des images non redimensionnées, des tableaux de 50 000 objets sans pagination ou si la compression Gzip/Brotli est absente.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Traquer les requêtes lentes dans Express avec Server-Timing */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-indigo-600" />
          3. Mesurer et Logger la Latence dans Node.js / Express
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Pour identifier automatiquement les routes lentes en production sans dépendre d&apos;un client DevTools, nous implémentons un middleware de traçage de haute précision utilisant <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">performance.now()</code> et l&apos;en-tête standard <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">Server-Timing</code> :
        </p>

        <CodeBlock
          code={`import express from 'express';
import { performance } from 'node:perf_hooks';

const app = express();

// Middleware de surveillance de la latence et d'injection Server-Timing
app.use((req, res, next) => {
  const startTime = performance.now();
  let dbDuration = 0;

  // Méthode helper pour chronométrer les sous-étapes SQL
  res.locals.trackDb = async (queryFn: () => Promise<unknown>) => {
    const dbStart = performance.now();
    const result = await queryFn();
    dbDuration += performance.now() - dbStart;
    return result;
  };

  res.on('finish', () => {
    const totalDuration = performance.now() - startTime;
    const backendDuration = Math.max(0, totalDuration - dbDuration);

    // Injection de l'en-tête standard Server-Timing pour affichage dans Chrome DevTools
    res.setHeader('Server-Timing', \`db;dur=\${dbDuration.toFixed(1)}, app;dur=\${backendDuration.toFixed(1)}\`);

    // Journalisation structurée des requêtes dépassant le seuil de tolérance (500 ms)
    if (totalDuration > 500) {
      console.warn('⚠️ [SLOW ROUTE ALERT]', {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        totalMs: Number(totalDuration.toFixed(2)),
        dbMs: Number(dbDuration.toFixed(2)),
        appMs: Number(backendDuration.toFixed(2))
      });
    }
  });

  next();
});`}
          language="typescript"
        />

        <Callout type="tip" title="Avantage clé de Server-Timing">
          <p className="text-xs sm:text-sm">
            En renvoyant l&apos;en-tête <code className="font-mono text-xs font-bold">Server-Timing: db;dur=320, app;dur=45</code>, Chrome DevTools affiche directement dans l&apos;onglet Timing la séparation exacte entre le temps passé dans MySQL et le temps passé dans le code Node.js !
          </p>
        </Callout>
      </section>

      {/* 4. Analyser les Requêtes SQL avec EXPLAIN */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="database" className="w-5 h-5 text-lime-600" />
          4. Autopsie des Requêtes SQL Lentes avec MySQL EXPLAIN
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Dans 80% des cas, un TTFB excessif est causé par une requête SQL qui effectue un <strong>Full Table Scan</strong> (parcours séquentiel de millions de lignes) faute d&apos;index adapté.
          Pour examiner la stratégie choisie par l&apos;optimiseur de requêtes, préfixez votre ordre SQL par <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">EXPLAIN</code> :
        </p>

        <CodeBlock
          code={`-- Analyser la stratégie d'exécution de la requête
EXPLAIN
SELECT id, customer_id, total, created_at
FROM orders
WHERE customer_id = 94821 AND status = 'COMPLETED'
ORDER BY created_at DESC
LIMIT 20;`}
          language="sql"
        />

        {/* Figure 6.4.B - Preserving image6.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image6.jpeg"
              alt="Rapport d'exécution d'une commande MySQL EXPLAIN montrant les colonnes type, possible_keys, key, rows et Extra (Figure 6.4.B)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 6.4.B — Plan d&apos;exécution retourné par MySQL EXPLAIN : observation du type d&apos;accès et des index utilisés.
          </div>
        </div>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Colonne EXPLAIN</th>
                <th className="px-4 py-3">Valeur Alerte (Dangereux)</th>
                <th className="px-4 py-3">Valeur Idéale (Performant)</th>
                <th className="px-4 py-3">Interprétation technique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900 font-mono">type</td>
                <td className="px-4 py-2.5 font-bold text-rose-600 font-mono">ALL</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600 font-mono">const, eq_ref, ref, range</td>
                <td className="px-4 py-2.5 font-medium">ALL indique que MySQL scanne 100% des lignes de la table physique.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900 font-mono">key</td>
                <td className="px-4 py-2.5 font-bold text-rose-600 font-mono">NULL</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600 font-mono">idx_nom_index</td>
                <td className="px-4 py-2.5 font-medium">NULL signifie qu&apos;aucun index n&apos;a été utilisé pour filtrer la requête.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900 font-mono">rows</td>
                <td className="px-4 py-2.5 font-bold text-rose-600 font-mono">Millions de lignes</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600 font-mono">1 à quelques dizaines</td>
                <td className="px-4 py-2.5 font-medium">Nombre estimé de lignes que le moteur InnoDB doit examiner en mémoire.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900 font-mono">Extra</td>
                <td className="px-4 py-2.5 font-bold text-rose-600 font-mono">Using filesort, Using temporary</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600 font-mono">Using index (Covering)</td>
                <td className="px-4 py-2.5 font-medium">Using filesort indique que le tri est fait en RAM/Disque plutôt que par l&apos;index.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Simulateur Interactif : SlowQueryInspectorLab */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          5. Simulateur Interactif : Laboratoire d&apos;Analyse de Requêtes SQL Lentes
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Sélectionnez un scénario d&apos;ingénierie pour analyser son impact sur l&apos;accès aux données, la durée BDD vs réseau et la solution de refactoring :
        </p>

        {/* Boutons sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(QUERY_SCENARIOS) as QueryScenarioKey[]).map((key) => {
            const sc = QUERY_SCENARIOS[key];
            const isSelected = activeScenarioKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveScenarioKey(key)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-lime-500 bg-lime-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${sc.badgeColor} inline-block mb-1`}>
                    {sc.badge}
                  </span>
                  <div className="text-xs font-bold text-slate-950 leading-tight">
                    {sc.title.split('(')[0]}
                  </div>
                </div>
                <div className="mt-2 text-[11px] font-mono text-slate-600">
                  TTFB: {sc.ttfbMs} ms | DB: {sc.dbExecutionTimeMs} ms
                </div>
              </button>
            );
          })}
        </div>

        {/* Panneau de télémétrie */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scénario de Test</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{activeScenario.title}</h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${activeScenario.badgeColor}`}>
              Statut : {activeScenario.status}
            </span>
          </div>

          {/* Jauges télémétriques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Durée Exécution SQL</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${activeScenario.dbExecutionTimeMs > 1000 ? 'text-rose-600' : 'text-slate-900'}`}>
                {activeScenario.dbExecutionTimeMs} ms
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Temps serveur BDD</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Transfert Réseau</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${activeScenario.transferTimeMs > 1000 ? 'text-rose-600' : 'text-slate-900'}`}>
                {activeScenario.transferTimeMs} ms
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Téléchargement bytes</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">TTFB Global</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${activeScenario.ttfbMs > 500 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {activeScenario.ttfbMs} ms
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Attente client DevTools</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Lignes Examinées</div>
              <div className="text-xs sm:text-sm font-mono font-black text-slate-900 mt-1">
                {activeScenario.rowsExamined}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Retournées : {activeScenario.rowsReturned}</div>
            </div>
          </div>

          {/* Code de la requête testée */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Icon name="code" className="w-3.5 h-3.5 text-indigo-600" />
              <span>Requête exécutée :</span>
            </div>
            <CodeBlock code={activeScenario.sqlQuery} language="sql" />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
            <span className="font-bold text-rose-800">Diagnostic d&apos;expert : </span>
            <span className="text-slate-700">{activeScenario.diagnosis}</span>
          </div>

          {/* Solution & Refactoring */}
          <div>
            <div className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600" />
              <span>Correction & Refactoring :</span>
            </div>
            <CodeBlock code={activeScenario.remediationCode} language="sql" />
          </div>
        </div>
      </section>

      {/* 6. Cas Réel Entreprise : Black Friday chez RetailBoost */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          6. Étude de Cas Réelle : La Catastrophe du Black Friday chez RetailBoost
        </h2>
        <div className="border-2 border-rose-200 bg-rose-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-1 rounded-md">
              Incident Production Black Friday
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Perte estimée : 85 000 €</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>Le Symptôme :</strong> À minuit pile lors du lancement des promotions, la page d&apos;historique des commandes (<code className="bg-rose-100 text-rose-900 px-1 py-0.5 rounded font-mono text-xs">/account/orders</code>) affichait une latence de <strong>9 800 ms</strong>, provoquant des abandons massifs et des timeouts au panier.
            </p>
            <p>
              <strong>L&apos;Enquête :</strong> Le Slow Query Log de MySQL montrait des dizaines de milliers de requêtes <code className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">SELECT * FROM order_items WHERE order_id = ?</code> exécutées en rafale. L&apos;ORM Sequelize chargeait chaque commande, puis exécutait une boucle pour charger chaque ligne d&apos;article une par une (problème N+1 pur).
            </p>
            <p>
              <strong>Le Correctif d&apos;Urgence :</strong> Les ingénieurs ont appliqué un <code className="font-mono text-emerald-800 font-bold">JOIN</code> unique avec pagination à 10 commandes et ont posé un index composite <code className="font-mono text-emerald-800 font-bold">idx_order_user(user_id, created_at DESC)</code>. Le temps de réponse est tombé instantanément de 9,8 secondes à <strong>24 millisecondes</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Diagnostic des Requêtes Lentes (Chapitre 5.4)"
          questions={[
            {
              id: 1,
              question: "Si l'onglet Timing de Chrome DevTools indique un TTFB (Waiting for server response) de 3 500 ms et un Content Download de 15 ms, où se situe le problème ?",
              options: [
                "Sur la connexion Wi-Fi du client qui perd des paquets lors du téléchargement.",
                "Côté serveur (Backend ou Base de données) : le serveur a mis 3,5 secondes à générer le premier octet de la réponse.",
                "Dans le rendu CSS du navigateur qui n'arrive pas à peindre les pixels.",
                "Dans le câble HDMI reliant l'écran de l'utilisateur."
              ],
              correctIndex: 1,
              explanation: "Le TTFB (Time To First Byte) mesure le temps écoulé entre l'envoi de la requête HTTP et la réception du tout premier octet envoyé par le serveur. S'il est de 3,5s, le serveur est ralenti par son code ou ses requêtes SQL.",
            },
            {
              id: 2,
              question: "Dans le résultat d'un MySQL EXPLAIN, quelle valeur dans la colonne 'type' représente la pire performance possible ?",
              options: [
                "const",
                "eq_ref",
                "ALL",
                "range"
              ],
              correctIndex: 2,
              explanation: "Le type 'ALL' signifie que MySQL effectue un Full Table Scan : il lit séquentiellement chaque ligne de la table sur le disque, ce qui entraîne une charge CPU et des I/O catastrophiques sur les tables volumineuses.",
            },
            {
              id: 3,
              question: "Quel phénomène désigne le problème 'N+1 Queries' généré fréquemment par les ORM ?",
              options: [
                "Une requête SQL qui tente d'insérer N+1 colonnes inexistantes.",
                "Une première requête qui récupère N enregistrements parents, suivie de N requêtes supplémentaires exécutées en série pour charger les relations enfants de chacun.",
                "Une erreur de pagination où le serveur retourne une page de trop.",
                "Un dépassement de la limite de connexions autorisées par le pool MySQL."
              ],
              correctIndex: 1,
              explanation: "Le problème N+1 survient quand un code exécute 1 requête pour lister N éléments parents, puis boucle sur chaque parent pour émettre une requête séparée pour ses enfants, multipliant les allers-retours réseau inutiles.",
            },
            {
              id: 4,
              question: "Que signifie la mention 'Using filesort' dans la colonne Extra d'un rapport EXPLAIN ?",
              options: [
                "MySQL a enregistré les résultats dans un fichier texte sur le bureau du serveur.",
                "MySQL n'a pas pu utiliser d'index pour l'instruction ORDER BY et a dû effectuer un tri supplémentaire en mémoire ou sur disque temporaire.",
                "La base de données est corrompue et doit être restaurée.",
                "La requête a été mise en cache avec succès."
              ],
              correctIndex: 1,
              explanation: "'Using filesort' indique que MySQL doit effectuer une passe de tri externe des résultats car aucun index ne correspond à l'ordre demandé par la clause ORDER BY.",
            },
            {
              id: 5,
              question: "À quoi sert l'en-tête HTTP 'Server-Timing' injecté par le Backend ?",
              options: [
                "À forcer l'horloge du système d'exploitation à se synchroniser avec le protocole NTP.",
                "À transmettre au navigateur les métriques de durée précises des étapes internes du serveur (ex: temps SQL, temps applicatif) visibles directement dans DevTools.",
                "À bloquer les requêtes qui dépassent 5 secondes.",
                "À interdire la mise en cache de la réponse HTTP."
              ],
              correctIndex: 1,
              explanation: "L'en-tête standard 'Server-Timing' permet d'exposer au client et aux outils de monitoring les métriques internes du serveur (comme le temps passé en base de données) pour corréler la latence réseau et serveur.",
            },
            {
              id: 6,
              question: "Pourquoi une requête `SELECT * FROM articles WHERE status = 'PUBLISHED' ORDER BY date DESC LIMIT 20` sans index composite est-elle lente sur 1 million de lignes ?",
              options: [
                "Parce que le mot-clé LIMIT est limité à 10 résultats maximum dans le standard SQL.",
                "Parce que MySQL doit filtrer 1 million de lignes puis toutes les trier en mémoire (filesort) avant de ne garder que les 20 premières.",
                "Parce que les colonnes de type DATE ne peuvent pas être comparées par MySQL.",
                "Parce que Node.js ne sait pas parser plus de 100 objets JSON."
              ],
              correctIndex: 1,
              explanation: "Sans index composite sur `(status, date DESC)`, MySQL doit parcourir toutes les lignes correspondant au statut, les stocker dans un buffer temporaire pour les ordonner par date, puis seulement appliquer le LIMIT.",
            },
          ]}
        />
      </div>
    </div>
  );
};
