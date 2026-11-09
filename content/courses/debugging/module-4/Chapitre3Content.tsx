'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type RestScenarioKey =
  | 'boolean_query_trap'
  | 'params_type_coercion'
  | 'route_order_shadowing'
  | 'hpp_array_pollution'
  | 'unbounded_pagination';

interface RestScenario {
  title: string;
  badge: string;
  badgeColor: string;
  endpoint: string;
  rawRequest: string;
  buggyCode: string;
  runtimeAnomaly: string;
  fixCode: string;
  takeaway: string;
}

const REST_SCENARIOS: Record<RestScenarioKey, RestScenario> = {
  boolean_query_trap: {
    title: '1. Le piège du booléen dans req.query ("false" est truthy !)',
    badge: 'Query String Trap',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    endpoint: 'GET /api/v1/products?isArchived=false',
    rawRequest: `GET /api/v1/products?isArchived=false HTTP/1.1
Host: api.eshop.fr
Accept: application/json`,
    buggyCode: `app.get('/api/v1/products', async (req, res) => {
  // BOGUE CRITIQUE : req.query.isArchived vaut la chaîne "false"
  // En JavaScript, Boolean("false") === true car chaîne non vide !
  const isArchived = Boolean(req.query.isArchived);

  if (isArchived) {
    // Ce bloc s'exécute TOUJOURS, même si l'URL dit isArchived=false !
    return res.json(await getArchivedProducts());
  }

  res.json(await getActiveProducts());
});`,
    runtimeAnomaly: `L'utilisateur demande explicitement les produits non archivés (?isArchived=false).
Pourtant, le serveur ne renvoie QUE des archives !
Cause : String("false") a une longueur de 5 caractères. En JS, if ("false") est strictement vrai.`,
    fixCode: `import { z } from 'zod';

const QuerySchema = z.object({
  // Validation sûre avec Zod : transformation explicite
  isArchived: z
    .enum(['true', 'false'])
    .optional()
    .transform((val) => val === 'true')
});

app.get('/api/v1/products', async (req, res) => {
  const parsed = QuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const { isArchived = false } = parsed.data;
  const products = isArchived 
    ? await getArchivedProducts() 
    : await getActiveProducts();

  res.json(products);
});`,
    takeaway: 'Tout ce qui provient de req.query est une chaîne. N&apos;utilisez jamais Boolean(req.query.param) directement.'
  },
  params_type_coercion: {
    title: '2. Le piège de req.params (string) vs SQL ID (number)',
    badge: 'Params Coercion',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    endpoint: 'GET /api/v1/users/42',
    rawRequest: `GET /api/v1/users/42 HTTP/1.1
Host: api.eshop.fr`,
    buggyCode: `const databaseUsers = [
  { id: 42, name: 'Alice' },
  { id: 43, name: 'Bob' }
];

app.get('/api/v1/users/:id', (req, res) => {
  // req.params.id vaut "42" (string)
  // user.id vaut 42 (number)
  // "42" === 42 retourne FALSE !
  const user = databaseUsers.find((u) => u.id === req.params.id);

  if (!user) {
    // 404 systématique alors que l'utilisateur 42 existe bel et bien !
    return res.status(404).json({ message: 'Utilisateur introuvable' });
  }

  res.json(user);
});`,
    runtimeAnomaly: `Le client demande l'utilisateur #42.
Le serveur répond 404 Not Found à 100% des requêtes !
Cause : Comparaison stricte (===) entre un String venant de l'URL et un Number stocké en base.`,
    fixCode: `app.get('/api/v1/users/:id', async (req, res) => {
  const rawId = req.params.id;
  const id = Number(rawId);

  // Vérifier rigoureusement que l'identifiant est un entier positif
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      type: 'https://api.eshop.fr/errors/invalid-id',
      title: 'Identifiant invalide',
      detail: 'Le paramètre d\\x27URL :id doit être un entier positif supérieur à zéro.'
    });
  }

  const user = databaseUsers.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur introuvable' });
  }

  res.json(user);
});`,
    takeaway: 'Toujours convertir et valider les paramètres d&apos;URL numériques via Number.isInteger() avant de les comparer ou de les transmettre à SQL.'
  },
  route_order_shadowing: {
    title: '3. Masquage de route : /users/:id avant /users/me',
    badge: 'Route Shadowing',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    endpoint: 'GET /api/v1/users/me',
    rawRequest: `GET /api/v1/users/me HTTP/1.1
Host: api.eshop.fr
Authorization: Bearer token_alice`,
    buggyCode: `// 1. Route dynamique enregistrée en PREMIER :
app.get('/api/v1/users/:id', async (req, res) => {
  const id = Number(req.params.id); // Number("me") -> NaN !
  const user = await db.findUserById(id);
  res.json(user);
});

// 2. Route statique enregistrée en SECOND :
app.get('/api/v1/users/me', requireAuth, async (req, res) => {
  // CETTE ROUTE N'EST JAMAIS ATTEINTE !
  res.json(req.user);
});`,
    runtimeAnomaly: `L'appel à /api/v1/users/me tombe dans le handler /api/v1/users/:id avec req.params.id = "me".
Number("me") produit NaN, et la base de données crash ou renvoie 404 !
La route /users/me est totalement masquée (shadowed).`,
    fixCode: `// RÈGLE D'OR D'EXPRESS : Du plus spécifique au plus générique !

// 1. Déclarer d'abord la route statique littérale :
app.get('/api/v1/users/me', requireAuth, async (req, res) => {
  return res.json(req.user);
});

// 2. Déclarer ensuite la route dynamique avec pattern :
app.get('/api/v1/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'ID numérique requis' });
  }
  const user = await db.findUserById(id);
  if (!user) return res.status(404).json({ error: 'Introuvable' });
  return res.json(user);
});`,
    takeaway: 'Express évalue les routes dans leur ordre d&apos;enregistrement. Placez toujours les segments statiques (/me, /search, /stats) AVANT les variables dynamiques (/:id).'
  },
  hpp_array_pollution: {
    title: '4. Pollution de paramètres HTTP (HPP : String vs Array)',
    badge: 'HPP Vulnerability',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    endpoint: 'GET /api/v1/articles?category=tech&category=health',
    rawRequest: `GET /api/v1/articles?category=tech&category=health HTTP/1.1
Host: api.eshop.fr`,
    buggyCode: `app.get('/api/v1/articles', async (req, res) => {
  // Le développeur suppose que req.query.category est une chaîne unique :
  const category = req.query.category;

  // Si l'attaquant répète ?category=a&category=b, Express produit un Array !
  // TypeError: category.trim is not a function ! (Crash 500)
  const cleanCategory = category.trim().toLowerCase();

  res.json(await findArticles(cleanCategory));
});`,
    runtimeAnomaly: `Le serveur plante brutalement avec un crash 500 :
"TypeError: category.trim is not a function".
En effet, quand une clé de requête est répétée, le parseur qs d'Express la transforme en Array : ['tech', 'health'].`,
    fixCode: `import hpp from 'hpp';

// Option A : Middleware anti-pollution universel
app.use(hpp()); // Force le dernier paramètre ou rejette les doublons

// Option B : Typage défensif avec Zod
const ArticleQuerySchema = z.object({
  // Accepte string unique et la normalise, ou rejette les tableaux
  category: z.string().transform((str) => str.trim().toLowerCase())
});

app.get('/api/v1/articles', async (req, res) => {
  const result = ArticleQuerySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ message: 'Paramètre category invalide (tableau interdit)' });
  }
  res.json(await findArticles(result.data.category));
});`,
    takeaway: 'Ne présumez jamais qu&apos;une variable de req.query est une string. Un pirate peut envoyer un Array et faire planter vos méthodes de chaîne.'
  },
  unbounded_pagination: {
    title: '5. Pagination non bornée (DDoS mémoire & Crash BDD)',
    badge: 'Performance & DoS',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    endpoint: 'GET /api/v1/logs?limit=5000000',
    rawRequest: `GET /api/v1/logs?limit=5000000 HTTP/1.1
Host: api.eshop.fr`,
    buggyCode: `app.get('/api/v1/logs', async (req, res) => {
  // BOGUE : Aucune limite maximale imposée !
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;

  // Si limit = 5 000 000, MySQL charge 5 millions de lignes en RAM.
  // Node.js dépasse sa heap limit (1.4 Go) -> Process Out of Memory (OOM Crash) !
  const [rows] = await db.execute(
    'SELECT * FROM system_logs LIMIT ? OFFSET ?',
    [limit, offset]
  );

  res.json(rows);
});`,
    runtimeAnomaly: `Un seul appel avec ?limit=5000000 fait exploser la mémoire du conteneur Docker.
Node.js s'arrête avec l'erreur : "FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory".
Tous les utilisateurs du site sont déconnectés.`,
    fixCode: `const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 20;

app.get('/api/v1/logs', async (req, res) => {
  // Forcer les bornes minimales et maximales
  const parsedLimit = parseInt(req.query.limit as string, 10);
  const parsedPage = parseInt(req.query.page as string, 10);

  const limit = !isNaN(parsedLimit) && parsedLimit > 0
    ? Math.min(parsedLimit, MAX_PAGE_SIZE) // Plafond infranchissable
    : DEFAULT_PAGE_SIZE;

  const page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const offset = (page - 1) * limit;

  const [rows] = await db.execute(
    'SELECT * FROM system_logs ORDER BY id DESC LIMIT ? OFFSET ?',
    [limit, offset]
  );

  res.json({
    data: rows,
    pagination: { page, limit, maxLimit: MAX_PAGE_SIZE }
  });
});`,
    takeaway: 'Toute API publique doit imposer un plafond strict (ex: Math.min(limit, 100)). Ne jamais faire confiance au client pour la volumétrie.'
  }
};

export const Chapitre3Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<RestScenarioKey>('boolean_query_trap');
  const scenario = REST_SCENARIOS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 3 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            REST API &amp; Parameters
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Débogage des API REST : Anatomie, paramètres, sérialisation et contrats
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Déboguer une API REST ne consiste pas seulement à regarder si une route renvoie 200 ou 500.
          C&apos;est inspecter les <strong>trois canaux de transmission de données</strong> (<code>req.params</code>, <code>req.query</code> et <code>req.body</code>),
          déjouer les pièges de coercition de type JavaScript et garantir l&apos;étanchéité des contrats d&apos;interface face aux requêtes malveillantes ou mal formées.
        </p>
      </div>

      {/* 1. Les 6 couches de transit d'une requête REST */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les 6 couches de transit d&apos;une requête REST dans Express
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Lorsqu&apos;un client émet <code>GET /api/v1/products/42?includeReviews=true</code>, la requête franchit 6 frontières d&apos;exécution.
          Une erreur de débogage classique consiste à chercher le bogue dans la base SQL alors que la requête a été rejetée ou corrompue en couche 2 ou 3 :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Couche 1</span>
              <Icon name="server" className="w-4 h-4 text-slate-400" />
            </div>
            <div className="font-bold text-slate-950 text-sm">Transport &amp; En-têtes</div>
            <p className="text-xs text-slate-600">
              Extraction de la méthode (GET/POST), validation de l&apos;en-tête <code>Host</code>, <code>Content-Type</code> et certificat TLS.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/50 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 uppercase">Couche 2</span>
              <Icon name="search" className="w-4 h-4 text-purple-500" />
            </div>
            <div className="font-bold text-purple-950 text-sm">Routage dynamique</div>
            <p className="text-xs text-purple-900">
              Résolution du pattern (<code>/products/:id</code>). Extraction des variables d&apos;URL brutes dans <code>req.params</code> (toujours des strings).
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase">Couche 3</span>
              <Icon name="code" className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-bold text-amber-950 text-sm">Parsing &amp; Middlewares</div>
            <p className="text-xs text-amber-900">
              Décodage du Query String dans <code>req.query</code> et désérialisation du corps JSON via <code>express.json()</code> dans <code>req.body</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-cyan-200 bg-cyan-50/50 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-800 uppercase">Couche 4</span>
              <Icon name="shield-check" className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="font-bold text-cyan-950 text-sm">Validation de schéma</div>
            <p className="text-xs text-cyan-900">
              Sanitization et validation Zod / Joi : coercion des types, contrôle des plages numériques, rejet des champs malveillants.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase">Couche 5</span>
              <Icon name="database" className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-bold text-emerald-950 text-sm">Contrôleur &amp; Base SQL</div>
            <p className="text-xs text-emerald-900">
              Exécution de la logique métier et requêtes SQL préparées (<code>execute(&apos;SELECT ... ?&apos;)</code>). Traitement des erreurs SQL.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase">Couche 6</span>
              <Icon name="arrow-right" className="w-4 h-4 text-blue-600" />
            </div>
            <div className="font-bold text-blue-950 text-sm">Sérialisation &amp; Sortie</div>
            <p className="text-xs text-blue-900">
              Conversion JSON via <code>res.json()</code>, définition des en-têtes de cache (<code>ETag</code>, <code>Cache-Control</code>) et code HTTP (200/201).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 3 canaux de paramètres : params, query, body */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les trois canaux de paramètres : Matrice de débogage comparative
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Chaque canal répond à un besoin précis mais comporte un comportement natif susceptible d&apos;introduire des bogues sournois :
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Canal</th>
                <th className="p-3.5">Exemple d&apos;URL ou Charge</th>
                <th className="p-3.5">Nature des types reçus</th>
                <th className="p-3.5">Piège de débogage n°1</th>
                <th className="p-3.5">Solution défensive</th>
              </tr>
            </thead>
            <tbody className="divide-y border-slate-200 font-sans">
              <tr>
                <td className="p-3.5 font-mono font-bold text-purple-700">req.params</td>
                <td className="p-3.5 font-mono text-slate-600">/users/:id/articles/:slug</td>
                <td className="p-3.5 font-semibold text-slate-800">100% String</td>
                <td className="p-3.5 text-rose-700">
                  <code>15 === &quot;15&quot;</code> donne <code>false</code>. 404 artificiel.
                </td>
                <td className="p-3.5 text-slate-800">
                  <code>Number.isInteger(Number(id))</code>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-amber-700">req.query</td>
                <td className="p-3.5 font-mono text-slate-600">?sort=asc&amp;page=2&amp;active=false</td>
                <td className="p-3.5 font-semibold text-slate-800">String ou Array (si répété)</td>
                <td className="p-3.5 text-rose-700">
                  <code>&quot;false&quot;</code> est truthy ; les doublons deviennent des tableaux (HPP).
                </td>
                <td className="p-3.5 text-slate-800">
                  Valider avec Zod <code>z.enum([&apos;true&apos;, &apos;false&apos;])</code>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-emerald-700">req.body</td>
                <td className="p-3.5 font-mono text-slate-600">{'{ "name": "Sarah", "age": 28 }'}</td>
                <td className="p-3.5 font-semibold text-slate-800">Types JSON (string, number, obj, arr)</td>
                <td className="p-3.5 text-rose-700">
                  <code>undefined</code> si <code>express.json()</code> est absent ou mal ordonné.
                </td>
                <td className="p-3.5 text-slate-800">
                  Placer <code>app.use(express.json())</code> avant toutes les routes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="Alerte Sécurité : Le piège de l'assignation de masse (Mass Assignment)">
          <p className="text-xs sm:text-sm">
            Injecter directement <code>req.body</code> dans un ORM ou une requête SQL (ex: <code>User.update(req.body)</code>) permet à un utilisateur malveillant d&apos;envoyer <code>{'{ "isAdmin": true, "balance": 99999 }'}</code> et de pirater votre application.
            Utilisez toujours un validateur de schéma (comme Zod) pour n&apos;extraire <strong>que</strong> les champs explicitement autorisés (whitelisting).
          </p>
        </Callout>
      </section>

      {/* 3. Laboratoire Interactif : Les 5 pièges REST */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Diagnostic des 5 pièges REST majeurs
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Cliquez sur chaque scénario pour observer l&apos;anomalie de runtime, le code incriminé et le correctif d&apos;ingénierie certifié :
        </p>

        {/* Boutons sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {(Object.keys(REST_SCENARIOS) as RestScenarioKey[]).map((key) => {
            const item = REST_SCENARIOS[key];
            const isSelected = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`p-3 text-left rounded-xl border text-xs font-bold transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className={`text-[10px] px-1.5 py-0.5 rounded w-fit mb-1.5 ${
                  isSelected ? 'bg-lime-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 font-bold'
                }`}>
                  {item.badge}
                </span>
                <span className="truncate text-xs font-semibold leading-snug">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Détail du scénario actif */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-950">{scenario.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-500">
                Endpoint testé : <span className="text-slate-800 font-bold">{scenario.endpoint}</span>
              </div>
            </div>
          </div>

          {/* Requête HTTP et Anomalie constatée */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                <Icon name="arrow-right" className="w-3.5 h-3.5 text-slate-600" />
                <span>Requête HTTP émise</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-3.5 text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
                {scenario.rawRequest}
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-rose-700 mb-1.5 flex items-center gap-1.5">
                <Icon name="bug" className="w-3.5 h-3.5 text-rose-600" />
                <span>Symptôme &amp; Anomalie en Production</span>
              </div>
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-rose-950 text-xs leading-relaxed">
                {scenario.runtimeAnomaly}
              </div>
            </div>
          </div>

          {/* Code buggé vs Code robuste */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-rose-600 mb-1.5">
                ❌ Code Vulnérable / Défaillant
              </div>
              <CodeBlock language="typescript" code={scenario.buggyCode} />
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-600 mb-1.5">
                ✅ Code Robuste &amp; Validé
              </div>
              <CodeBlock language="typescript" code={scenario.fixCode} />
            </div>
          </div>

          {/* Règle d'or */}
          <div className="p-4 rounded-xl bg-lime-50 border border-lime-300 flex items-start gap-3">
            <Icon name="sparkles" className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-lime-950">
              <strong>À retenir impérativement :</strong> {scenario.takeaway}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TP Synthèse : Contrôleur REST d'Entreprise Sécurisé */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Implémenter un contrôleur de recherche e-commerce robuste
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Ce contrôleur de production combine tous les principes de défense : validation de schéma Zod,
          coercition des types, pagination plafonnée, assainissement des entrées et typage strict :
        </p>

        <CodeBlock
          language="typescript"
          code={`import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../database';

// 1. Schéma de validation strict pour les paramètres de recherche
const ProductSearchSchema = z.object({
  query: z.string().trim().min(1).max(100).optional(),
  category: z.string().trim().max(50).optional(),
  inStockOnly: z
    .enum(['true', 'false'])
    .optional()
    .transform((val) => val === 'true'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20) // Plafond maximal = 100
});

export async function searchProductsController(req: Request, res: Response, next: NextFunction) {
  try {
    // Validation du Query String via Zod
    const validation = ProductSearchSchema.safeParse(req.query);
    if (!validation.success) {
      return res.status(422).json({
        type: 'https://api.eshop.fr/errors/invalid-search-params',
        title: 'Paramètres de recherche invalides',
        status: 422,
        invalidParams: validation.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      });
    }

    const { query, category, inStockOnly, page, limit } = validation.data;
    const offset = (page - 1) * limit;

    // Construction dynamique de la requête SQL préparée
    const conditions: string[] = ['1=1'];
    const sqlParams: (string | number)[] = [];

    if (query) {
      conditions.push('title LIKE ?');
      sqlParams.push(\`%\${query}%\`);
    }

    if (category) {
      conditions.push('category = ?');
      sqlParams.push(category);
    }

    if (inStockOnly) {
      conditions.push('stock > 0');
    }

    sqlParams.push(limit, offset);

    const sql = \`
      SELECT id, title, category, price, stock 
      FROM products 
      WHERE \${conditions.join(' AND ')} 
      ORDER BY id DESC 
      LIMIT ? OFFSET ?
    \`;

    const [rows] = await db.query(sql, sqlParams);

    res.status(200).json({
      success: true,
      data: rows,
      meta: {
        page,
        limit,
        count: (rows as unknown[]).length
      }
    });
  } catch (error) {
    next(error); // Transmettre au middleware d'erreur global
  }
}`}
        />
      </section>

      {/* 5. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.3
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Vérifiez vos compétences sur le routage REST et le diagnostic des paramètres d&apos;entrée :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Si une route Express est déclarée sous la forme app.get('/api/users/:id'), que vaut l'expression (req.params.id === 10) lorsqu'un client appelle GET /api/users/10 ?",
              options: [
                "true, car JavaScript effectue une conversion automatique de type avec ===",
                "false, car req.params.id est toujours une chaîne de caractères (\"10\" === 10 est faux)",
                "TypeError, car on ne peut pas comparer un objet et un nombre",
                "undefined"
              ],
              correctIndex: 1,
              explanation: "Les paramètres d'URL capturés dans req.params sont obligatoirement des chaînes de caractères (string). Une comparaison stricte (===) avec un nombre renvoie toujours false, provoquant un 404 intempestif."
            },
            {
              id: 2,
              question: "Un endpoint lit un paramètre d'URL via const active = Boolean(req.query.active). Que vaut active lorsque le client appelle l'URL avec ?active=false ?",
              options: [
                "false, car la valeur reçue est 'false'",
                "true, car Boolean(\"false\") évalue une chaîne de caractères non vide en true",
                "null",
                "Une exception est levée"
              ],
              correctIndex: 1,
              explanation: "En JavaScript, n'importe quelle chaîne non vide est 'truthy'. Boolean('false') vaut true ! C'est l'un des pièges les plus fréquents des Query Strings. Il faut comparer explicitement : req.query.active === 'true'."
            },
            {
              id: 3,
              question: "Vous avez deux routes : app.get('/users/:id', handler1) déclarée avant app.get('/users/profile', handler2). Qu'arrive-t-il lorsqu'un utilisateur appelle GET /users/profile ?",
              options: [
                "Express choisit intelligemment la route la plus précise (handler2).",
                "La requête entre dans handler1 avec req.params.id valant 'profile', masquant totalement handler2.",
                "Express génère une erreur au démarrage pour route dupliquée.",
                "Une réponse HTTP 405 Method Not Allowed est renvoyée."
              ],
              correctIndex: 1,
              explanation: "Express évalue les routes dans l'ordre séquentiel exact de leur déclaration dans le code. Le motif dynamique /users/:id intercepte n'importe quelle valeur, y compris 'profile'. Les routes spécifiques doivent TOUJOURS être déclarées avant les routes dynamiques."
            },
            {
              id: 4,
              question: "Qu'est-ce que la vulnérabilité HPP (HTTP Parameter Pollution) dans le cadre d'un serveur Express ?",
              options: [
                "Une altération du fichier package.json par une dépendance corrompue.",
                "L'envoi répété de la même clé dans le Query String (?role=guest&role=admin) qui transforme req.query.role en tableau Array au lieu d'une string, provoquant des crashs sur .trim() ou des élévations de privilèges.",
                "L'injection de requêtes SQL directement dans les en-têtes HTTP.",
                "La surcharge du serveur de noms de domaine (DNS)."
              ],
              correctIndex: 1,
              explanation: "Quand une clé de requête est répétée plusieurs fois, le parseur d'Express regroupe les valeurs dans un tableau. Si le code fait 'req.query.role.toUpperCase()', le serveur crashe avec un TypeError car les Array n'ont pas cette méthode."
            },
            {
              id: 5,
              question: "Pourquoi est-il impératif de plafonner le paramètre 'limit' dans une API paginée (ex: Math.min(limit, 100)) ?",
              options: [
                "Parce que le protocole HTTP interdit de transmettre plus de 100 objets.",
                "Pour empêcher un client malveillant d'envoyer ?limit=10000000 et de saturer la mémoire vive (OOM Crash) du serveur et de la base MySQL.",
                "Parce que JSON.stringify ne peut pas traiter plus de 50 éléments.",
                "Pour économiser le nombre d'octets de l'en-tête Content-Length."
              ],
              correctIndex: 1,
              explanation: "Sans plafond strict, un utilisateur peut forcer le serveur à charger des millions de lignes d'un coup, provoquant un épuisement de mémoire Node.js (Heap Out of Memory) ou un blocage complet du pool de connexions MySQL."
            },
            {
              id: 6,
              question: "Quel middleware Express est requis pour que le corps d'une requête POST JSON soit accessible sous req.body ?",
              options: [
                "app.use(express.urlencoded())",
                "app.use(express.json())",
                "app.use(express.static())",
                "Aucun, req.body est nativement disponible sans middleware"
              ],
              correctIndex: 1,
              explanation: "Par défaut, Express ne parse pas le corps des requêtes HTTP. Il faut impérativement brancher app.use(express.json()) avant la définition des routes, sinon req.body sera systématiquement undefined."
            }
          ]}
        />
      </section>
    </div>
  );
};
