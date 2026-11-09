'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type RouteScenarioKey =
  | 'shadow_profile'
  | 'shadow_search'
  | 'prefix_doubling'
  | 'catchall_too_early';

interface RouteScenario {
  title: string;
  badge: string;
  badgeColor: string;
  testUrl: string;
  testMethod: 'GET' | 'POST';
  buggyTable: { method: string; path: string; handlerName: string; isHit: boolean }[];
  buggyExplanation: string;
  fixedTable: { method: string; path: string; handlerName: string; isHit: boolean }[];
  fixedExplanation: string;
  preventionTip: string;
}

const ROUTE_SCENARIOS: Record<RouteScenarioKey, RouteScenario> = {
  shadow_profile: {
    title: '1. /users/:id masque /users/me (Interception Statique)',
    badge: 'Shadowing Classique',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    testUrl: '/api/v1/users/me',
    testMethod: 'GET',
    buggyTable: [
      { method: 'GET', path: '/api/v1/users/:id', handlerName: 'getUserById(req.params.id)', isHit: true },
      { method: 'GET', path: '/api/v1/users/me', handlerName: 'getCurrentUserProfile()', isHit: false }
    ],
    buggyExplanation: 'Express évalue les routes de haut en bas. ":id" intercepte le mot littéral "me". La fonction tente d\'exécuter SELECT * FROM users WHERE id = "me", produisant NaN ou une erreur 404.',
    fixedTable: [
      { method: 'GET', path: '/api/v1/users/me', handlerName: 'getCurrentUserProfile()', isHit: true },
      { method: 'GET', path: '/api/v1/users/:id', handlerName: 'getUserById(req.params.id)', isHit: false }
    ],
    fixedExplanation: 'En déclarant la route statique "/me" avant le segment paramétré "/:id", la requête vers le profil est résolue immédiatement sans interférence.',
    preventionTip: 'Règle absolue : Toujours déclarer les mots-clés statiques (/me, /search, /stats, /export) AVANT les variables dynamiques (/:id).'
  },
  shadow_search: {
    title: '2. /articles/:slug masque /articles/search',
    badge: 'Collision Paramétrique',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    testUrl: '/api/v1/articles/search?q=debug',
    testMethod: 'GET',
    buggyTable: [
      { method: 'GET', path: '/api/v1/articles/:slug', handlerName: 'getArticleBySlug(req.params.slug)', isHit: true },
      { method: 'GET', path: '/api/v1/articles/search', handlerName: 'searchArticles(req.query.q)', isHit: false }
    ],
    buggyExplanation: 'Le routeur interprète "search" comme le slug d\'un article. Le contrôleur cherche un article dont le titre est "search", ignorant complètement le moteur de recherche.',
    fixedTable: [
      { method: 'GET', path: '/api/v1/articles/search', handlerName: 'searchArticles(req.query.q)', isHit: true },
      { method: 'GET', path: '/api/v1/articles/:slug', handlerName: 'getArticleBySlug(req.params.slug)', isHit: false }
    ],
    fixedExplanation: 'La route de recherche /articles/search est capturée en priorité absolue. Les requêtes d\'articles individuels continuent d\'aboutir sur /:slug sans accroc.',
    preventionTip: 'Si votre ressource possède des sous-ressources ou actions spécifiques (/search, /bulk, /active), réservez ces chemins en tête de routeur.'
  },
  prefix_doubling: {
    title: '3. Dédoublement de préfixe dans express.Router()',
    badge: 'Sous-Routeur 404',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    testUrl: '/api/v1/products',
    testMethod: 'GET',
    buggyTable: [
      { method: 'MOUNT', path: "app.use('/api/v1/products', router)", handlerName: 'Router monté', isHit: true },
      { method: 'GET', path: "router.get('/products', ...)", handlerName: 'getAllProducts()', isHit: false }
    ],
    buggyExplanation: 'Le développeur a redéfini "/products" à l\'intérieur du sous-routeur. L\'URL réelle enregistrée par Express est "/api/v1/products/products" ! Le client appelant "/api/v1/products" reçoit un 404 intempestif.',
    fixedTable: [
      { method: 'MOUNT', path: "app.use('/api/v1/products', router)", handlerName: 'Router monté', isHit: true },
      { method: 'GET', path: "router.get('/', ...)", handlerName: 'getAllProducts()', isHit: true }
    ],
    fixedExplanation: 'Dans le sous-routeur, la racine du montage s\'exprime simplement avec "/". Express concatène fidèlement "/api/v1/products" + "/" = "/api/v1/products".',
    preventionTip: 'Le chemin passé à router.get() est TOUJOURS relatif au point de montage spécifié dans app.use(). Ne réécrivez jamais le préfixe parent.'
  },
  catchall_too_early: {
    title: '4. Middleware 404 Catch-All déclaré au milieu des routes',
    badge: '404 Prématuré',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    testUrl: '/api/v1/orders',
    testMethod: 'POST',
    buggyTable: [
      { method: 'USE', path: 'app.use((req, res) => res.status(404)...)', handlerName: 'Catch-All Handler', isHit: true },
      { method: 'POST', path: 'app.post("/api/v1/orders", ...)', handlerName: 'createOrder()', isHit: false }
    ],
    buggyExplanation: 'Le middleware 404 a été positionné avant la déclaration des routes de commandes. Comme app.use() sans filtre intercepte TOUTES les requêtes, aucune commande ne peut être créée.',
    fixedTable: [
      { method: 'POST', path: 'app.post("/api/v1/orders", ...)', handlerName: 'createOrder()', isHit: true },
      { method: 'USE', path: 'app.use((req, res) => res.status(404)...)', handlerName: 'Catch-All Handler (Fin)', isHit: false }
    ],
    fixedExplanation: 'Le middleware 404 doit impérativement être la TOUTE DERNIÈRE fonction de la chaîne (juste avant le middleware d\'erreurs à 4 arguments).',
    preventionTip: 'Le catch-all 404 agit comme un terminus ferroviaire : s\'il est placé sur la voie principale avant les gares suivantes, aucun train ne dépasse son aiguillage.'
  }
};

export const Chapitre5Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<RouteScenarioKey>('shadow_profile');
  const [isFixedMode, setIsFixedMode] = useState<boolean>(false);
  const scenario = ROUTE_SCENARIOS[activeKey];

  const currentTable = isFixedMode ? scenario.fixedTable : scenario.buggyTable;
  const currentExplanation = isFixedMode ? scenario.fixedExplanation : scenario.buggyExplanation;

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 5 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Express Routing Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Débogage des routes Express.js : Conflits d&apos;ordonnancement, routes statiques vs dynamiques et sous-routeurs
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Le routeur d&apos;Express fonctionne comme une chaîne d&apos;aiguillage ferroviaire séquentielle.
          Dès qu&apos;un patron d&apos;URL correspond à la méthode et au chemin de la requête entrante, le train s&apos;y engouffre.
          Une route dynamique mal placée (comme <code>/:id</code> avant <code>/profile</code>) agit comme un trou noir,
          interceptant silencieusement toutes les requêtes destinées aux routes déclarées en aval.
        </p>
      </div>

      {/* 1. L'algorithme de résolution d'Express en profondeur */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Comment Express résout réellement une route : La pile interne app._router.stack
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          En interne, Express ne compile pas d&apos;arbre de décision ou de Radix Tree complexe (contrairement à Fastify).
          Il conserve un simple <strong>tableau ordonné de couches (Layer stack)</strong> :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="text-xs font-black uppercase text-indigo-700">Principe 1</div>
            <div className="font-bold text-slate-950 text-sm">Évaluation séquentielle stricte</div>
            <p className="text-xs text-slate-600">
              Chaque couche enregistrée avec <code>app.use()</code>, <code>app.get()</code> ou <code>app.post()</code> est testée dans l&apos;ordre chronologique de son exécution dans votre code source.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="text-xs font-black uppercase text-indigo-700">Principe 2</div>
            <div className="font-bold text-slate-950 text-sm">Gloutonnerie des segments dynamiques</div>
            <p className="text-xs text-slate-600">
              Le pattern <code>:param</code> est traduit en expression régulière <code>([^/]+?)</code>. Il accepte n&apos;importe quelle chaîne non vide qui ne contient pas de barre oblique.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="text-xs font-black uppercase text-indigo-700">Principe 3</div>
            <div className="font-bold text-slate-950 text-sm">Arrêt au premier handler terminal</div>
            <p className="text-xs text-slate-600">
              Dès qu&apos;une route envoie une réponse (<code>res.json()</code>, <code>res.send()</code>), le cycle HTTP se clôture. Le reste de la pile est définitivement ignoré.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Laboratoire Interactif de Résolution de Conflits */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Simulateur d&apos;Aiguillage de Routes Express
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Observez comment le routeur Express intercepte la requête selon l&apos;ordre de déclaration dans le code.
          Basculez entre le <strong>Mode Buggé</strong> et le <strong>Mode Corrigé</strong> pour visualiser la résolution :
        </p>

        {/* Sélecteur de scénario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(Object.keys(ROUTE_SCENARIOS) as RouteScenarioKey[]).map((key) => {
            const item = ROUTE_SCENARIOS[key];
            const isSelected = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveKey(key);
                  setIsFixedMode(false);
                }}
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

        {/* Panneau de simulation */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-950">{scenario.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-600">
                Requête émise :{' '}
                <span className="px-1.5 py-0.5 rounded bg-slate-900 text-lime-400 font-bold">
                  {scenario.testMethod} {scenario.testUrl}
                </span>
              </div>
            </div>

            {/* Toggle Buggé / Corrigé */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-300">
              <button
                onClick={() => setIsFixedMode(false)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  !isFixedMode ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                ❌ Ordre Buggé
              </button>
              <button
                onClick={() => setIsFixedMode(true)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  isFixedMode ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                ✅ Ordre Corrigé
              </button>
            </div>
          </div>

          {/* Table de routage active */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500">
              Table d&apos;évaluation séquentielle (du haut vers le bas) :
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100 text-slate-700 font-sans border-b border-slate-200">
                  <tr>
                    <th className="p-3">Ordre</th>
                    <th className="p-3">Méthode</th>
                    <th className="p-3">Pattern de route déclaré</th>
                    <th className="p-3">Gestionnaire cible</th>
                    <th className="p-3">Statut de matching</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currentTable.map((route, idx) => (
                    <tr
                      key={idx}
                      className={route.isHit ? (isFixedMode ? 'bg-emerald-50' : 'bg-rose-50') : 'bg-white opacity-50'}
                    >
                      <td className="p-3 font-bold text-slate-500">#{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900">{route.method}</td>
                      <td className="p-3 font-bold text-slate-950">{route.path}</td>
                      <td className="p-3 text-slate-700">{route.handlerName}</td>
                      <td className="p-3">
                        {route.isHit ? (
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              isFixedMode
                                ? 'bg-emerald-200 text-emerald-900'
                                : 'bg-rose-200 text-rose-900'
                            }`}
                          >
                            🎯 INTERCEPTÉ !
                          </span>
                        ) : (
                          <span className="text-slate-400 font-sans italic text-[11px]">Non atteint</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analyse de l'aiguillage */}
          <div
            className={`p-4 rounded-xl border ${
              isFixedMode ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' : 'bg-rose-50/70 border-rose-300 text-rose-950'
            }`}
          >
            <div className="font-bold text-xs uppercase tracking-wider mb-1">
              {isFixedMode ? 'Résultat Nominal' : 'Diagnostic de l\'Anomalie'}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">{currentExplanation}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Icon name="sparkles" className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-800">
              <span className="font-bold text-slate-950">Conseil d&apos;ingénierie : </span>
              {scenario.preventionTip}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filtrage strict par Regex & router.param */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Contraintes de routes au niveau d&apos;Express : Regex et router.param()
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Pour éviter que des identifiants numériques n&apos;interceptent des mots textuels,
          Express supporte les <strong>contraintes d&apos;expressions régulières</strong> directement dans la déclaration de route :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="font-bold text-slate-950 text-sm flex items-center gap-2">
              <Icon name="code" className="w-4 h-4 text-emerald-600" />
              <span>Technique 1 : Contrainte Regex dans le chemin</span>
            </div>
            <p className="text-xs text-slate-600">
              Forcer le segment <code>:id</code> à n&apos;être composé que de chiffres. Si un client appelle <code>/users/me</code>, la regex échoue et Express continue automatiquement vers la route suivante !
            </p>
            <CodeBlock
              language="typescript"
              code={`// N'accepte QUE les entiers (1 ou plusieurs chiffres) :
app.get('/api/users/:id(\\\\d+)', async (req, res) => {
  const user = await db.findUserById(Number(req.params.id));
  res.json(user);
});

// /api/users/me passera outre la route ci-dessus et atteindra celle-ci :
app.get('/api/users/me', (req, res) => {
  res.json(req.user);
});`}
            />
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="font-bold text-slate-950 text-sm flex items-center gap-2">
              <Icon name="shield-check" className="w-4 h-4 text-indigo-600" />
              <span>Technique 2 : Middleware paramétrique router.param()</span>
            </div>
            <p className="text-xs text-slate-600">
              Centraliser l&apos;extraction, la validation et le préchargement de la ressource pour toutes les routes utilisant le paramètre <code>:userId</code>.
            </p>
            <CodeBlock
              language="typescript"
              code={`router.param('userId', async (req, res, next, id) => {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId) || numericId <= 0) {
    return res.status(400).json({ error: 'ID utilisateur non valide' });
  }

  const user = await db.findUserById(numericId);
  if (!user) {
    return res.status(404).json({ error: 'Utilisateur introuvable' });
  }

  // Injecter l'entité préchargée dans la requête
  (req as any).targetUser = user;
  next();
});`}
            />
          </div>
        </div>
      </section>

      {/* 4. TP : Script d'Inspection Automatique des Routes */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Implémenter l&apos;auditeur de routes d&apos;Express
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Lorsqu&apos;un projet backend compte des dizaines de fichiers et sous-routeurs,
          il est crucial d&apos;afficher la table réelle de routage au démarrage pour détecter les collisions :
        </p>

        <CodeBlock
          language="typescript"
          code={`import express, { Express } from 'express';

interface RouteReport {
  method: string;
  path: string;
}

export function auditExpressRoutes(app: Express): RouteReport[] {
  const routes: RouteReport[] = [];

  function printStack(stack: any[], basePath = '') {
    stack.forEach((layer) => {
      if (layer.route) {
        // Route déclarée directement
        const methods = Object.keys(layer.route.methods)
          .map((m) => m.toUpperCase())
          .join(', ');
        routes.push({
          method: methods,
          path: \`\${basePath}\${layer.route.path}\`
        });
      } else if (layer.name === 'router' && layer.handle?.stack) {
        // Sous-routeur monté via app.use()
        let routerPath = '';
        if (layer.regexp) {
          // Extraction du préfixe de montage depuis la RegExp d'Express
          const match = layer.regexp.source
            .replace('^\\\\', '')
            .replace('\\\\/?(?=\\\\/|$)', '')
            .replace(/\\\\/g, '')
            .replace('(?=\\/|$)', '');
          if (match && match !== '^') routerPath = match;
        }
        printStack(layer.handle.stack, \`\${basePath}/\${routerPath}\`.replace(/\\/+/g, '/'));
      }
    });
  }

  if (app._router?.stack) {
    printStack(app._router.stack);
  }

  // Affichage formaté console
  console.table(routes);
  return routes;
}`}
        />

        <Callout type="info" title="Vérification au démarrage">
          <p className="text-xs sm:text-sm">
            En appelant <code>auditExpressRoutes(app)</code> juste avant votre <code>app.listen()</code>,
            vous voyez immédiatement si une route <code>/api/v1/users/me</code> se trouve positionnée en dessous de <code>/api/v1/users/:id</code>.
          </p>
        </Callout>
      </section>

      {/* 5. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.5
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Vérifiez votre maîtrise du moteur de routage Express et des pièges d&apos;ordonnancement :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Si app.get('/users/:id') est déclaré avant app.get('/users/me'), que reçoit un client appelant GET /users/me ?",
              options: [
                "Le profil utilisateur de la route /users/me car Express priorise les chemins statiques.",
                "La réponse du handler /users/:id avec req.params.id valant la chaîne \"me\".",
                "Une erreur HTTP 405 Method Not Allowed.",
                "Une erreur du serveur au démarrage."
              ],
              correctIndex: 1,
              explanation: "Express évalue les routes de façon purement séquentielle. Le paramètre :id matchant n'importe quel segment textuel non vide, la chaîne 'me' est capturée comme l'ID, masquant totalement la route /users/me."
            },
            {
              id: 2,
              question: "Vous montez un routeur via app.use('/api/v1/users', userRouter). Dans userRouter.ts, vous écrivez router.get('/users', getAllUsers). Quelle est l'URL réelle résultante ?",
              options: [
                "/api/v1/users",
                "/api/v1/users/users",
                "/users",
                "/api/v1"
              ],
              correctIndex: 1,
              explanation: "Express concatène le préfixe du sous-routeur avec le chemin déclaré dans le routeur. /api/v1/users + /users donne /api/v1/users/users. Pour cibler /api/v1/users, il faut écrire router.get('/', getAllUsers)."
            },
            {
              id: 3,
              question: "Où doit impérativement être déclaré le middleware de gestion des pages 404 (app.use((req, res) => res.status(404)...)) ?",
              options: [
                "Tout au début du fichier, avant express.json().",
                "Tout à la fin, juste avant les middlewares d'erreur à 4 arguments, après toutes les autres routes.",
                "Dans un fichier séparé importé en premier.",
                "L'ordre n'a aucune importance en Express."
              ],
              correctIndex: 1,
              explanation: "Un middleware sans chemin (app.use(fn)) intercepte TOUTES les requêtes sans exception. S'il est placé avant des routes, aucune de ces routes ne sera jamais atteinte car le middleware terminera la requête avec un 404."
            },
            {
              id: 4,
              question: "Comment restreindre un paramètre de route :id pour qu'Express ne matche QUE des entiers numériques ?",
              options: [
                "app.get('/users/:id{number}')",
                "app.get('/users/:id(\\\\d+)')",
                "app.get('/users/:id', { type: 'int' })",
                "C'est impossible dans Express, il faut obligatoirement utiliser Fastify."
              ],
              correctIndex: 1,
              explanation: "Express permet de spécifier une expression régulière entre parenthèses immédiatement après le nom du paramètre. :id(\\d+) garantit que seuls les chiffres composant l'ID matcheront cette route."
            },
            {
              id: 5,
              question: "À quoi sert le middleware router.param('id', (req, res, next, id) => ...) dans Express ?",
              options: [
                "À renommer automatiquement le paramètre dans la requête.",
                "À exécuter une validation et un préchargement de ressource centralisé chaque fois que le paramètre :id est présent dans une route.",
                "À supprimer le paramètre de l'URL.",
                "À crypter la valeur de l'identifiant."
              ],
              correctIndex: 1,
              explanation: "router.param() permet d'associer un middleware déclenché dès qu'un segment nommé précis est détecté dans l'URL. C'est l'endroit idéal pour valider que l'ID est un entier et précharger l'entité depuis la base."
            },
            {
              id: 6,
              question: "Si deux routes identiques app.get('/items', handler1) et app.get('/items', handler2) sont déclarées, comment faire pour que handler2 soit exécuté ?",
              options: [
                "handler1 doit appeler next() sans avoir envoyé de réponse HTTP.",
                "Express les exécute automatiquement en parallèle.",
                "handler2 ne pourra jamais être exécuté quelles que soient les actions de handler1.",
                "handler1 doit lever une exception throw new Error()."
              ],
              correctIndex: 0,
              explanation: "Si handler1 appelle next(), Express passe la main au gestionnaire suivant correspondant au même pattern d'URL. Si handler1 envoie une réponse ou n'appelle pas next(), la chaîne s'interrompt."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre5Content;
