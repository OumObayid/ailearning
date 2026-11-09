'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type MiddlewareScenarioKey =
  | 'missing_next_hang'
  | 'headers_already_sent'
  | 'error_arity_three'
  | 'unhandled_async_throw';

interface MiddlewareScenario {
  title: string;
  badge: string;
  badgeColor: string;
  symptom: string;
  buggyCode: string;
  runtimeTrace: string;
  fixedCode: string;
  pipelineVisual: { name: string; status: 'ok' | 'blocked' | 'crashed' | 'bypassed'; detail: string }[];
  takeaway: string;
}

const MIDDLEWARE_SCENARIOS: Record<MiddlewareScenarioKey, MiddlewareScenario> = {
  missing_next_hang: {
    title: '1. Oubli de next() : La requête suspendue (Hanging Request / 504)',
    badge: 'Freeze / Timeout',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    symptom: 'Le navigateur affiche une roue de chargement infinie pendant 60 secondes, puis Nginx ou Cloudflare renvoie un 504 Gateway Timeout.',
    buggyCode: `app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token requis' });
  }

  // BOGUE CRITIQUE : Le développeur vérifie le token mais...
  req.user = verifyToken(token);
  // OUPS : next() a été oublié dans cette branche !
  // La requête reste suspendue indéfiniment dans les limbes de Node.js.
});`,
    runtimeTrace: `Client -> GET /api/v1/dashboard (en attente...)
[+10.00s] Toujours aucune réponse reçue
[+30.00s] Socket maintenu ouvert par Node.js
[+60.00s] 💥 Reverse Proxy Nginx : 504 Gateway Time-out`,
    fixedCode: `app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token requis' });
  }

  try {
    req.user = verifyToken(token);
    return next(); // ✅ Passe immédiatement le témoin au maillon suivant !
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
});`,
    pipelineVisual: [
      { name: '1. AuthMiddleware', status: 'blocked', detail: 'Vérifie le token mais n\'appelle ni res.json() ni next(). La requête s\'arrête net ici.' },
      { name: '2. RoleMiddleware', status: 'bypassed', detail: 'Jamais atteint' },
      { name: '3. DashboardController', status: 'bypassed', detail: 'Jamais atteint' }
    ],
    takeaway: 'Un middleware doit impérativement faire l\'un ou l\'autre : soit renvoyer une réponse (return res...), soit passer la main (return next()).'
  },
  headers_already_sent: {
    title: '2. Absence de return : ERR_HTTP_HEADERS_SENT',
    badge: 'Crash Double Réponse',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    symptom: 'Le client reçoit la première réponse mais le serveur logue une exception fatale Node.js : Cannot set headers after they are sent to the client.',
    buggyCode: `function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    // 💥 ERREUR : res.json() N'ARRÊTE PAS l'exécution JavaScript !
    res.status(403).json({ error: 'Réservé aux administrateurs' });
  }

  // L'exécution continue et appelle next() même en cas de 403 !
  next();
}

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  // Le contrôleur s'exécute et tente de renvoyer une réponse :
  res.json({ totalRevenue: 150000 }); // 💥 CRASH NODE.JS !
});`,
    runtimeTrace: `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (node:_http_outgoing:659:11)
    at ServerResponse.header (/node_modules/express/lib/response.js:794:10)
    at ServerResponse.send (/node_modules/express/lib/response.js:174:12)
    at ServerResponse.json (/node_modules/express/lib/response.js:278:15)
    at /src/controllers/admin.js:12:7`,
    fixedCode: `function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    // ✅ Toujours RETURN res... pour couper court à la fonction !
    return res.status(403).json({ error: 'Réservé aux administrateurs' });
  }

  return next(); // N'est exécuté QUE si l'utilisateur est admin
}`,
    pipelineVisual: [
      { name: '1. requireAdmin', status: 'ok', detail: 'Envoie 403 Forbidden puis appelle par erreur next()' },
      { name: '2. statsController', status: 'crashed', detail: 'Tente d\'écrire sur un socket HTTP déjà fermé -> ERR_HTTP_HEADERS_SENT' }
    ],
    takeaway: 'En JavaScript, appeler une méthode d\'objet ne termine pas la fonction appelante. Écrivez systématiquement "return res.json(...)" ou "return next()".'
  },
  error_arity_three: {
    title: '3. Arité d\'erreur : (err, req, res) au lieu de (err, req, res, next)',
    badge: 'Arité Magique Express',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    symptom: 'Le gestionnaire d\'erreur n\'est jamais déclenché lors d\'un crash. Express utilise son gestionnaire HTML par défaut ou plante le process.',
    buggyCode: `// 💥 BOGUE SUBTIL : Le développeur a omis le 4ème paramètre "next" !
app.use((err, req, res) => {
  console.error('Erreur interceptée :', err);
  res.status(500).json({ error: 'Oups' });
});

// En JavaScript : ((err, req, res) => {}).length === 3 !
// Express inspecte fn.length. Si length !== 4, ce n'est PAS un ErrorHandler.
// Express l'ignore totalement lors d'un next(err) !`,
    runtimeTrace: `Contrôleur -> next(new Error("Connexion BDD rompue"))
Express Router -> Recherche d'un handler où layer.handle.length === 4
Résultat : 0 handler trouvé ! (Le vôtre a une arité de 3)
Express -> Exécute le handler par défaut HTML 500 générique`,
    fixedCode: `// ✅ RÈGLE D'OR : Toujours 4 paramètres formels, même si next est inutilisé !
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  // ((err, req, res, _next) => {}).length === 4 !
  // Express le reconnaît immédiatement comme gestionnaire d'erreurs !
  console.error('[ERREUR]', err.message);
  return res.status(500).json({
    type: 'https://api.eshop.fr/errors/internal',
    title: 'Erreur interne du serveur',
    detail: err.message
  });
});`,
    pipelineVisual: [
      { name: '1. Controller', status: 'ok', detail: 'Appelle next(dbError)' },
      { name: '2. Custom ErrorHandler (arity=3)', status: 'bypassed', detail: 'Ignoré par Express car fn.length !== 4' },
      { name: '3. Express Fallback', status: 'crashed', detail: 'Réponse brute HTML générique non sécurisée' }
    ],
    takeaway: 'Express utilise la réflexion (fn.length) pour détecter les middlewares d\'erreur. Les 4 paramètres (err, req, res, next) sont obligatoires.'
  },
  unhandled_async_throw: {
    title: '4. Exceptions asynchrones non capturées (Express 4 Async Crash)',
    badge: 'Unhandled Rejection',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    symptom: 'Un throw à l\'intérieur d\'une fonction async fait freezer la requête ou crasher tout le processus Node.js sous Express 4.',
    buggyCode: `// Dans Express 4 (sans express-async-errors) :
app.get('/api/users/:id', async (req, res, next) => {
  // Si findUserById rejette une Promise ou lève une exception :
  const user = await db.findUserById(req.params.id); // 💥 Crash asynchrone !
  
  // Dans Express 4, le routeur ne catche PAS les Promises rejetées !
  // La requête reste suspendue pour toujours (UnhandledPromiseRejection).
  res.json(user);
});`,
    runtimeTrace: `(node:42981) UnhandledPromiseRejectionWarning: Error: Connection lost
(node:42981) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated.
Client -> En attente infinie de réponse...`,
    fixedCode: `// Solution A : Le wrapper universel asyncHandler
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Utilisation propre et sans boilerplate :
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await db.findUserById(req.params.id);
  res.json(user);
}));

// Solution B (Express 5 ou package 'express-async-errors') :
// Les rejets de promesses sont catchés nativement et transmis à next(err).`,
    pipelineVisual: [
      { name: '1. async route', status: 'crashed', detail: 'Lève une Promise rejetée hors du flux synchrone' },
      { name: '2. asyncHandler wrapper', status: 'ok', detail: 'Capture le rejet via .catch(next) et le transmet au Middleware d\'erreur' }
    ],
    takeaway: 'Dans Express 4, toute route asynchrone doit être encapsulée dans un try/catch ou un wrapper asyncHandler pour transmettre l\'erreur à next(err).'
  }
};

export const Chapitre6Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<MiddlewareScenarioKey>('missing_next_hang');
  const scenario = MIDDLEWARE_SCENARIOS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 6 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Middleware Pipeline Engineering
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Diagnostic des erreurs Middleware dans Express : next(), ERR_HTTP_HEADERS_SENT et gestionnaires d&apos;erreurs
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Les middlewares constituent la colonne vertébrale d&apos;une application Express.
          Chaque middleware est un ouvrier sur une ligne de production : il examine la requête, valide des en-têtes,
          injecte des données et <strong>doit obligatoirement soit transmettre la pièce au suivant (<code>next()</code>),
          soit répondre au client</strong>. Le moindre manquement dans ce contrat produit des requêtes figées,
          des plantages <code>ERR_HTTP_HEADERS_SENT</code> ou des exceptions asynchrones silencieuses.
        </p>
      </div>

      {/* 1. Le contrat fondamental d'un middleware */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Le contrat strict d&apos;exécution d&apos;un middleware Express
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Chaque middleware Express possède la signature <code>(req, res, next) =&gt; void</code>.
          Il n&apos;existe que <strong>trois issues légales</strong> lors de son exécution :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-800">Issue 1 : Délégation</span>
              <Icon name="arrow-right" className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="font-mono text-sm font-bold text-emerald-950">return next();</div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              La tâche du middleware est terminée. La requête passe immédiatement au maillon suivant de la pile (autre middleware ou contrôleur final).
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50/50 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-800">Issue 2 : Clôture</span>
              <Icon name="check-circle" className="w-4 h-4 text-amber-700" />
            </div>
            <div className="font-mono text-sm font-bold text-amber-950">return res.status(...).json(...)</div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Le middleware a détecté une anomalie (401 non authentifié, 403 interdit, 429 quota). Il renvoie la réponse au client et <strong>arrête le cycle</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-rose-300 bg-rose-50/50 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-rose-800">Issue 3 : Escalade</span>
              <Icon name="bug" className="w-4 h-4 text-rose-700" />
            </div>
            <div className="font-mono text-sm font-bold text-rose-950">return next(error);</div>
            <p className="text-xs text-rose-900 leading-relaxed">
              Une exception s&apos;est produite. Express court-circuite tous les middlewares normaux restants et saute directement au gestionnaire d&apos;erreurs global à 4 arguments.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Laboratoire Interactif : Les 4 Pièges de Middlewares */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Diagnostic des 4 Pannes Middleware Redoutables
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Sélectionnez un cas de panne pour observer le symptôme en production, la trace d&apos;erreur et le correctif certifié :
        </p>

        {/* Boutons Sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(Object.keys(MIDDLEWARE_SCENARIOS) as MiddlewareScenarioKey[]).map((key) => {
            const item = MIDDLEWARE_SCENARIOS[key];
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
            </div>
            <div className="text-xs text-rose-800 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 font-bold">
              {scenario.symptom}
            </div>
          </div>

          {/* Visualisation Pipeline */}
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500">
              Impact sur la chaîne d&apos;exécution Express :
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {scenario.pipelineVisual.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs space-y-1 ${
                    step.status === 'ok'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : step.status === 'blocked'
                      ? 'border-amber-300 bg-amber-50 text-amber-950'
                      : step.status === 'crashed'
                      ? 'border-rose-300 bg-rose-50 text-rose-950'
                      : 'border-slate-200 bg-slate-50 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{step.name}</span>
                    <span className="uppercase text-[10px] font-black">{step.status}</span>
                  </div>
                  <p className="text-[11px] leading-tight">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code buggé vs Trace runtime */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-rose-600 mb-1.5">
                ❌ Code Fautif / Anti-pattern
              </div>
              <CodeBlock language="typescript" code={scenario.buggyCode} />
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Trace de Runtime / Console Node.js
              </div>
              <div className="rounded-xl bg-slate-950 p-3.5 text-rose-400 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
                {scenario.runtimeTrace}
              </div>
            </div>
          </div>

          {/* Code Corrigé */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-emerald-600 mb-1.5">
              ✅ Code Robuste &amp; Conforme
            </div>
            <CodeBlock language="typescript" code={scenario.fixedCode} />
          </div>

          <div className="p-4 rounded-xl bg-lime-50 border border-lime-300 flex items-start gap-3">
            <Icon name="sparkles" className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-lime-950">
              <span className="font-bold">Règle d&apos;or d&apos;ingénierie : </span>
              {scenario.takeaway}
            </div>
          </div>
        </div>
      </section>

      {/* 3. L'arité magique de 4 arguments */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            L&apos;arité magique d&apos;Express : Pourquoi 4 paramètres sont vitaux
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          En JavaScript, chaque fonction possède une propriété <code>.length</code> qui indique le nombre d&apos;arguments déclarés dans sa signature.
          Express inspecte cette métadonnée par <strong>réflexion</strong> pour router les requêtes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-700">fn.length === 2 ou 3</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-bold">Middleware Standard</span>
            </div>
            <div className="font-mono text-xs bg-slate-950 text-slate-200 p-2.5 rounded-lg">
              app.use((req, res, next) =&gt; &#123; ... &#125;)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ce middleware n&apos;est exécuté QUE lors d&apos;un flux nominal (sans erreur). Si un middleware précédent fait <code>next(err)</code>, Express <strong>saute par-dessus</strong> cette fonction sans l&apos;exécuter.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-800">fn.length === 4</span>
              <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-xs font-bold">Error Handler</span>
            </div>
            <div className="font-mono text-xs bg-slate-950 text-emerald-400 p-2.5 rounded-lg">
              app.use((err, req, res, next) =&gt; &#123; ... &#125;)
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Ce middleware n&apos;est exécuté QUE si une erreur a été émise (<code>next(err)</code> ou exception). Si vous omettez <code>next</code> de la signature, sa longueur tombe à 3 et Express ne l&apos;appellera jamais en cas d&apos;incident !
            </p>
          </div>
        </div>

        <Callout type="warning" title="Le piège des paramètres inutilisés et d'ESLint">
          <p className="text-xs sm:text-sm">
            Si votre linter signale que le paramètre <code>next</code> est inutilisé dans votre gestionnaire d&apos;erreurs,
            <strong>ne le supprimez surtout pas</strong> ! Préfixez-le par un tiret bas : <code>(err, req, res, _next)</code>.
            Sa présence dans la signature préserve <code>fn.length === 4</code> tout en satisfaisant les règles ESLint <code>no-unused-vars</code>.
          </p>
        </Callout>
      </section>

      {/* 4. TP : Pattern asyncHandler et Middleware Global de Production */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Implémenter le couple asyncHandler et ErrorHandler d&apos;Entreprise
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Ce pattern professionnel élimine tous les blocs try/catch répétitifs de vos contrôleurs et centralise la protection d&apos;erreurs :
        </p>

        <CodeBlock
          language="typescript"
          code={`import express, { Request, Response, NextFunction, RequestHandler } from 'express';

// 1. Le Wrapper Asynchrone Universel (asyncHandler)
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 2. Contrôleur épuré sans try/catch
export const getInvoice = asyncHandler(async (req: Request, res: Response) => {
  const invoice = await findInvoiceById(req.params.id);
  if (!invoice) {
    const error: any = new Error('Facture introuvable');
    error.statusCode = 404;
    throw error; // Capturé automatiquement par asyncHandler et transmis à next(err) !
  }
  return res.json(invoice);
});

// 3. Middleware d'Erreur Global Certifié (Arity = 4)
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Log structuré avec stack trace complète en interne
  console.error('[EXCEPTION NON GÉRÉE]', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack
  });

  // Réponse client conforme RFC 9457
  return res.status(statusCode).json({
    type: \`https://api.monsite.com/errors/\${statusCode}\`,
    title: statusCode === 500 ? 'Erreur interne du serveur' : err.message,
    status: statusCode,
    detail: statusCode === 500 && isProduction 
      ? 'Une défaillance inattendue est survenue.' 
      : err.message,
    instance: req.originalUrl,
    ...(!isProduction && { debugStack: err.stack })
  });
};`}
        />
      </section>

      {/* 5. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.6
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Vérifiez vos acquis sur la mécanique des middlewares et le traitement des erreurs Express :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Que se passe-t-il si un middleware n'appelle ni res.json() (ou res.send()), ni next() ?",
              options: [
                "Express passe automatiquement au middleware suivant après 5 millisecondes.",
                "La requête reste suspendue indéfiniment jusqu'à ce que le client ou un proxy atteigne son délai d'expiration (Timeout 504).",
                "Le serveur Node.js plante immédiatement avec un code d'erreur 1.",
                "Express renvoie un statut HTTP 200 vide."
              ],
              correctIndex: 1,
              explanation: "Express ne possède aucun mécanisme automatique pour deviner la fin d'un middleware. Sans appel à next() ou envoi de réponse, le socket HTTP reste ouvert et la requête freeze indéfiniment."
            },
            {
              id: 2,
              question: "Quelle est la cause exacte de l'erreur Node.js 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client' ?",
              options: [
                "Le client a envoyé des en-têtes HTTP de plus de 8 Ko.",
                "Le code serveur a tenté d'envoyer des en-têtes ou un corps de réponse sur une requête pour laquelle une réponse avait déjà été transmise (souvent un oubli de return avant res.json()).",
                "Le certificat SSL du serveur est expiré.",
                "Le middleware express.json() est manquant."
              ],
              correctIndex: 1,
              explanation: "Le protocole HTTP interdit formellement d'envoyer deux réponses à une même requête. Si une fonction exécute res.status(403).json(...) puis continue vers next() sans 'return', le contrôleur suivant tentera d'émettre une seconde réponse, provoquant ce crash."
            },
            {
              id: 3,
              question: "Comment Express identifie-t-il qu'un middleware déclaré via app.use() est un gestionnaire d'erreurs et non un middleware standard ?",
              options: [
                "En vérifiant si la fonction porte le nom 'errorHandler'.",
                "En inspectant le nombre de paramètres déclarés dans la fonction (fn.length === 4 : err, req, res, next).",
                "En vérifiant si la fonction est déclarée dans un fichier nommé error.js.",
                "Grâce à un décorateur spécial @ErrorHandler."
              ],
              correctIndex: 1,
              explanation: "Express utilise la propriété JavaScript .length de la fonction. Une fonction à 2 ou 3 paramètres est traitée comme un middleware normal. Seule une fonction à exactement 4 paramètres formels (err, req, res, next) est invoquée lors d'un appel à next(err)."
            },
            {
              id: 4,
              question: "Pourquoi une exception levée avec throw dans une fonction asynchrone (async) sous Express 4 ne déclenche-t-elle pas le middleware d'erreur ?",
              options: [
                "Car async est interdit dans Node.js.",
                "Car Express 4 a été conçu avant l'arrivée des Promesses natives et n'intercepte pas les rejets asynchrones hors du bloc try/catch synchrone.",
                "Car les erreurs SQL ne peuvent pas être interceptées.",
                "Car il faut obligatoirement utiliser TypeScript."
              ],
              correctIndex: 1,
              explanation: "Express 4 n'écoute pas les promesses retournées par les middlewares. Une exception dans une fonction async génère une promesse rejetée non gérée (UnhandledPromiseRejection) et la requête reste suspendue sans jamais atteindre le middleware d'erreur."
            },
            {
              id: 5,
              question: "À quoi sert le pattern de wrapper 'asyncHandler' couramment utilisé avec Express 4 ?",
              options: [
                "À accélérer la vitesse de calcul du processeur V8.",
                "À encapsuler une fonction asynchrone pour intercepter automatiquement tout rejet de Promesse et le relayer à next(err) sans devoir écrire des try/catch partout.",
                "À compresser les réponses en gzip.",
                "À remplacer express.json()."
              ],
              correctIndex: 1,
              explanation: "asyncHandler prend un contrôleur asynchrone (req, res, next) et exécute Promise.resolve(fn(req, res, next)).catch(next). Cela garantit que toute exception ou rejet de Promesse est propulsé proprement vers le gestionnaire d'erreur global."
            },
            {
              id: 6,
              question: "Pourquoi est-il crucial de masquer la propriété err.stack dans les réponses d'erreur HTTP envoyées aux clients en environnement de production ?",
              options: [
                "Pour réduire la consommation de papier si le client imprime la réponse.",
                "Pour des raisons critiques de sécurité : la stack trace expose les chemins du serveur, les noms de fichiers, les modules et les potentielles failles du code source aux attaquants.",
                "Parce que la RFC HTTP interdit les messages d'erreur de plus de 50 caractères.",
                "Parce que JSON.stringify ne peut pas sérialiser les stack traces."
              ],
              correctIndex: 1,
              explanation: "La divulgation de stack trace (CWE-209) est une faille de sécurité majeure. Elle fournit aux pirates la cartographie exacte de votre arborescence de fichiers, vos versions de packages et la logique interne du backend. Elle doit être enregistrée dans des logs privés, jamais renvoyée au client."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre6Content;
