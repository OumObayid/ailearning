'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type CorsScenarioKey =
  | 'nominal_preflight'
  | 'wildcard_credentials_crash'
  | 'auth_blocks_options'
  | 'missing_exposed_header';

interface CorsScenario {
  title: string;
  badge: string;
  badgeColor: string;
  origin: string;
  target: string;
  requestHeaders: string;
  serverReplyHeaders: string;
  browserDecision: 'ALLOWED' | 'BLOCKED';
  browserConsoleError?: string;
  analysis: string;
  remedyCode: string;
}

const CORS_SCENARIOS: Record<CorsScenarioKey, CorsScenario> = {
  nominal_preflight: {
    title: '1. Négociation Preflight Nominale (SPA React + API)',
    badge: 'Succès 204 No Content',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    origin: 'http://localhost:5173',
    target: 'https://api.eshop.fr/v1/orders',
    requestHeaders: `OPTIONS /v1/orders HTTP/1.1
Host: api.eshop.fr
Origin: http://localhost:5173
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization`,
    serverReplyHeaders: `HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400`,
    browserDecision: 'ALLOWED',
    analysis: 'Le serveur a approuvé l\'origine exacte, la méthode POST et les deux en-têtes personnalisés. Le navigateur autorise l\'émission de la vraie requête POST.',
    remedyCode: `// Configuration Express exemplaire :
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // Cache le preflight pendant 24h
}));`
  },
  wildcard_credentials_crash: {
    title: '2. L\'incompatibilité mortelle : Wildcard (*) et Credentials',
    badge: 'Erreur Fatale Navigateur',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    origin: 'https://app.monprojet.com',
    target: 'https://api.monprojet.com/v1/me',
    requestHeaders: `GET /v1/me HTTP/1.1
Host: api.monprojet.com
Origin: https://app.monprojet.com
Cookie: sessionId=s%3A83921... (credentials: "include")`,
    serverReplyHeaders: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Content-Type: application/json`,
    browserDecision: 'BLOCKED',
    browserConsoleError: `Access to fetch at 'https://api.monprojet.com/v1/me' from origin 'https://app.monprojet.com' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.`,
    analysis: 'La spécification W3C interdit formellement d\'utiliser "*" lorsque des cookies ou des identifiants de session transitent. Cela permettrait à n\'importe quel site pirate de siphonner les sessions des utilisateurs.',
    remedyCode: `// ❌ JAMAIS : origin: '*' avec credentials: true
// ✅ TOUJOURS : Spécifier explicitement l'origine ou utiliser une fonction de whitelist :
app.use(cors({
  origin: ['https://app.monprojet.com'], // Origine explicite requise !
  credentials: true
}));`
  },
  auth_blocks_options: {
    title: '3. Middleware d\'authentification qui bloque la requête OPTIONS',
    badge: 'Preflight 401 Rejeté',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    origin: 'http://localhost:3000',
    target: 'http://localhost:8080/api/admin/users',
    requestHeaders: `OPTIONS /api/admin/users HTTP/1.1
Origin: http://localhost:3000
Access-Control-Request-Method: DELETE
# ⚠️ Note : La requête OPTIONS ne porte JAMAIS d'en-tête Authorization !`,
    serverReplyHeaders: `HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "error": "Token manquant dans l'en-tête Authorization" }`,
    browserDecision: 'BLOCKED',
    browserConsoleError: `Response to preflight request doesn't pass access control check: It does not have HTTP ok status (received 401).`,
    analysis: 'Le développeur a placé un middleware d\'authentification AVANT le middleware CORS ou sans exclure les requêtes OPTIONS. Comme le navigateur n\'envoie aucun token dans l\'OPTIONS, le middleware renvoie 401 et la négociation échoue.',
    remedyCode: `// 1. Toujours monter le middleware cors() AVANT les middlewares d'authentification :
app.use(cors(corsOptions));

// 2. Ou dans un middleware custom, ignorer explicitement OPTIONS :
function authenticate(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next(); // Ne pas exiger de token sur le Preflight !
  }
  // vérification JWT...
}`
  },
  missing_exposed_header: {
    title: '4. En-tête personnalisé invisible (Access-Control-Expose-Headers)',
    badge: 'En-tête Invisible Client',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    origin: 'http://localhost:5173',
    target: 'https://api.eshop.fr/v1/products',
    requestHeaders: `GET /v1/products HTTP/1.1
Origin: http://localhost:5173`,
    serverReplyHeaders: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:5173
X-Total-Count: 1420
Content-Disposition: attachment; filename="catalog.csv"`,
    browserDecision: 'BLOCKED',
    browserConsoleError: `// Dans la console JS du navigateur :
const count = response.headers.get('X-Total-Count');
console.log(count); // -> null ! (L'en-tête est invisible pour le code JS)`,
    analysis: 'Par défaut, le navigateur ne laisse le code JS lire que les 6 en-têtes dits "CORS-safelisted" (Cache-Control, Content-Language, Content-Length, Content-Type, Expires, Last-Modified). Tout en-tête personnalisé (ex: X-Total-Count) est censuré par le navigateur sans déclaration explicite.',
    remedyCode: `// Autoriser le frontend à lire les en-têtes personnalisés :
app.use(cors({
  origin: 'http://localhost:5173',
  exposedHeaders: ['X-Total-Count', 'Content-Disposition']
}));`
  }
};

export const Chapitre7Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<CorsScenarioKey>('nominal_preflight');
  const scenario = CORS_SCENARIOS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 7 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            CORS &amp; Same-Origin Policy
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Analyse et résolution des erreurs CORS : Same-Origin Policy, Preflight OPTIONS et credentials
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          CORS (<em>Cross-Origin Resource Sharing</em>) est sans doute le mécanisme de sécurité le plus mal compris des développeurs web.
          <strong>CORS n&apos;est pas une protection pour votre serveur, mais une sécurité imposée par le navigateur pour protéger l&apos;utilisateur.</strong>
          Comprendre le triplet d&apos;origine, la négociation Preflight (<code>OPTIONS</code>) et la règle des <code>credentials</code>
          permet d&apos;éradiquer ces erreurs en quelques minutes plutôt que de gaspiller des journées à tâtonner.
        </p>
      </div>

      {/* Schéma officiel CORS & Preflight */}
      <div className="p-6 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
            <Icon name="layout" className="w-5 h-5 text-emerald-600" />
            <span>Architecture du protocole CORS et de la requête Preflight (OPTIONS)</span>
          </h2>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full">
            Figure 4.7
          </span>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex justify-center p-4">
          <Image
            src="/images/cours/debugging/module-4/image1.jpeg"
            alt="Schéma explicatif du fonctionnement de CORS et de la requête Preflight"
            width={850}
            height={480}
            className="rounded-xl object-contain max-h-[440px] w-auto shadow-md"
          />
        </div>
        <p className="text-xs text-slate-600 italic text-center">
          Flux de négociation CORS : le navigateur expédie d&apos;abord une requête préliminaire HTTP <code>OPTIONS</code> (Preflight)
          pour demander la permission au serveur avant d&apos;autoriser la véritable requête applicative (GET, POST, DELETE).
        </p>
      </div>

      {/* 1. Définition canonique d'une Origine W3C */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Qu&apos;est-ce qu&apos;une Origine au sens du standard W3C ?
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          La <em>Same-Origin Policy</em> (SOP) compare strictement le <strong>triplet canonique</strong> suivant :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl border border-slate-300 bg-white shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-slate-500 tracking-wider">Composant 1</div>
            <div className="text-sm font-black text-slate-950">Le Protocole (Schéma)</div>
            <div className="text-xs font-mono text-emerald-700 font-bold">http:// vs https://</div>
            <p className="text-xs text-slate-600">
              Deux protocoles différents constituent deux origines distinctes.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-300 bg-white shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-slate-500 tracking-wider">Composant 2</div>
            <div className="text-sm font-black text-slate-950">L&apos;Hôte (Domaine / Sous-domaine)</div>
            <div className="text-xs font-mono text-emerald-700 font-bold">app.site.com vs api.site.com</div>
            <p className="text-xs text-slate-600">
              Tout sous-domaine différent est considéré comme une origine distincte.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-300 bg-white shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-slate-500 tracking-wider">Composant 3</div>
            <div className="text-sm font-black text-slate-950">Le Port Réseau</div>
            <div className="text-xs font-mono text-emerald-700 font-bold">localhost:5173 vs localhost:3000</div>
            <p className="text-xs text-slate-600">
              Cas classique en développement local (SPA Vite et backend Node.js).
            </p>
          </div>
        </div>

        <Callout type="warning" title="Pourquoi Postman et cURL ne rencontrent JAMAIS d'erreur CORS ?">
          <p className="text-xs sm:text-sm">
            Postman, cURL ou vos tests automatisés Node.js ne sont <strong>pas des navigateurs web</strong>.
            Ils ne mettent en œuvre aucune <em>Same-Origin Policy</em>.
            Tester une route dans Postman fonctionnera toujours à 100%, même si votre application React dans Chrome est totalement bloquée par une erreur CORS.
          </p>
        </Callout>
      </section>

      {/* 2. Requêtes Simples vs Requêtes avec Preflight */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Requêtes Simples vs Requêtes Préliminaires (Preflight OPTIONS)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Le navigateur n&apos;envoie pas systématiquement de Preflight. Il classe les requêtes en deux catégories :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-300 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-950 text-sm">Requête Simple (Simple Request)</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Pas de Preflight</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• Méthodes autorisées : <code>GET</code>, <code>HEAD</code> ou <code>POST</code>.</li>
              <li>• En-têtes autorisés : <code>Accept</code>, <code>Accept-Language</code>, <code>Content-Language</code>.</li>
              <li>• <code>Content-Type</code> limité à : <code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code> ou <code>text/plain</code>.</li>
            </ul>
            <p className="text-xs text-slate-500 pt-1 border-t border-slate-200">
              La requête est émise directement. Le navigateur inspecte <code>Access-Control-Allow-Origin</code> dans la réponse pour décider s&apos;il livre les données au JS.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-950 text-sm">Requête Préliminaire (Preflighted Request)</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-200 text-purple-900">Preflight OPTIONS requis</span>
            </div>
            <ul className="text-xs text-purple-900 space-y-1">
              <li>• Dès que la méthode est <code>PUT</code>, <code>PATCH</code> ou <code>DELETE</code>.</li>
              <li>• Dès que <code>Content-Type: application/json</code> est utilisé.</li>
              <li>• Dès qu&apos;un en-tête comme <code>Authorization: Bearer ...</code> est présent.</li>
            </ul>
            <p className="text-xs text-purple-800 pt-1 border-t border-purple-200">
              Le navigateur émet <strong>d&apos;abord</strong> un <code>OPTIONS</code>. Si le serveur ne répond pas <code>204</code> ou <code>200</code> avec les bons en-têtes, la vraie requête n&apos;est JAMAIS envoyée.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Laboratoire Interactif : Diagnostic des Scénarios CORS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Simulateur d&apos;Échanges et de Décision CORS
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Sélectionnez un cas d&apos;école pour observer la négociation HTTP entre le navigateur et Express :
        </p>

        {/* Boutons Sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(Object.keys(CORS_SCENARIOS) as CorsScenarioKey[]).map((key) => {
            const item = CORS_SCENARIOS[key];
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

        {/* Panneau de détail */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-950">{scenario.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-500 font-mono">
                {scenario.origin} ➔ {scenario.target}
              </div>
            </div>

            <div className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 ${
              scenario.browserDecision === 'ALLOWED'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}>
              <Icon name={scenario.browserDecision === 'ALLOWED' ? 'check-circle' : 'bug'} className="w-4 h-4" />
              <span>Décision Navigateur : {scenario.browserDecision === 'ALLOWED' ? 'AUTORISÉ' : 'BLOQUÉ PAR CORS'}</span>
            </div>
          </div>

          {/* Erreur Console si bloqué */}
          {scenario.browserConsoleError && (
            <div className="p-3.5 rounded-xl bg-rose-950 text-rose-300 font-mono text-xs border border-rose-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-rose-400">Erreur Console Chrome / Firefox :</div>
              <div>{scenario.browserConsoleError}</div>
            </div>
          )}

          {/* Échange d'en-têtes HTTP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                1. En-têtes émis par le Navigateur
              </div>
              <div className="rounded-xl bg-slate-950 p-3.5 text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
                {scenario.requestHeaders}
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-1.5">
                2. En-têtes renvoyés par Express
              </div>
              <div className="rounded-xl bg-slate-950 p-3.5 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
                {scenario.serverReplyHeaders}
              </div>
            </div>
          </div>

          {/* Explication de l'analyse */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800">
            <span className="font-bold text-slate-950">Analyse de la décision : </span>
            {scenario.analysis}
          </div>

          {/* Code de remédiation */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Configuration Express Recommandée
            </div>
            <CodeBlock language="typescript" code={scenario.remedyCode} />
          </div>
        </div>
      </section>

      {/* 4. Configuration industrielle Express avec whitelist dynamique */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Configuration industrielle complète avec le package cors
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Voici le modèle de configuration utilisé en production. Il supporte une liste blanche dynamique,
          autorise les cookies de session et gère la mise en cache de la requête Preflight :
        </p>

        <CodeBlock
          language="typescript"
          code={`import express from 'express';
import cors, { CorsOptions } from 'cors';

const app = express();

// Whitelist des origines autorisées (Frontend local, staging, production)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://staging.monprojet.com',
  'https://app.monprojet.com'
];

const corsOptions: CorsOptions = {
  origin: (requestOrigin, callback) => {
    // !requestOrigin autorise les requêtes serveur-à-serveur, cURL et Postman
    if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error(\`Origine non autorisée par la politique CORS : \${requestOrigin}\`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'Content-Disposition'],
  credentials: true, // Autorise les cookies HttpOnly et sessions
  maxAge: 86400 // Met en cache le Preflight pendant 24h (évite le double appel OPTIONS)
};

// ⚠️ RÈGLE D'OR : Monter cors() au TOUT DÉBUT avant les routes et auth !
app.use(cors(corsOptions));

// Répondre automatiquement 204 sur les requêtes OPTIONS
app.options('*', cors(corsOptions));`}
        />
      </section>

      {/* 5. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.7
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Évaluez votre compréhension du standard CORS et de sa résolution :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi une requête testée avec succès dans Postman ou via la commande cURL échoue-t-elle avec une erreur CORS lorsqu'elle est exécutée depuis une SPA React dans Chrome ?",
              options: [
                "Parce que Postman est payant.",
                "Parce que CORS et la Same-Origin Policy sont des mécanismes de sécurité appliqués exclusivement par les navigateurs web, absents des outils CLI et Postman.",
                "Parce que React modifie automatiquement les ports réseau.",
                "Parce que Node.js bloque les navigateurs par défaut."
              ],
              correctIndex: 1,
              explanation: "CORS est une politique imposée par les navigateurs web pour empêcher un script malveillant exécuté sur un site A de lire des données privées hébergées sur un site B. Postman et cURL n'exécutent pas de sandbox de navigation et ignorent ces contrôles."
            },
            {
              id: 2,
              question: "Quelle condition rend une requête HTTP obligatoirement soumise à une négociation préliminaire 'Preflight' (méthode OPTIONS) ?",
              options: [
                "L'utilisation de la méthode GET sans aucun paramètre.",
                "L'envoi d'un en-tête Content-Type: application/json ou la présence d'un en-tête Authorization personnalisé.",
                "L'utilisation d'une connexion Wi-Fi au lieu d'Ethernet.",
                "L'envoi de moins de 10 octets de données."
              ],
              correctIndex: 1,
              explanation: "Toute requête qui dépasse les critères d'une 'Simple Request' (méthodes PUT/DELETE, en-tête Authorization ou Content-Type: application/json) déclenche un Preflight OPTIONS automatique du navigateur pour vérifier les permissions."
            },
            {
              id: 3,
              question: "Pourquoi la configuration Access-Control-Allow-Origin: * provoque-t-elle une erreur fatale dans le navigateur si la requête frontend utilise credentials: 'include' ?",
              options: [
                "Parce que le caractère * est interdit dans les fichiers JavaScript.",
                "Parce que la spécification W3C interdit formellement d'associer le wildcard * avec des identifiants d'authentification (cookies, sessions) pour prévenir les attaques CSRF et vols de session.",
                "Parce que le serveur ne sait pas calculer la taille du paquet.",
                "Parce que le port 80 est réservé."
              ],
              correctIndex: 1,
              explanation: "Permettre à N'IMPORTE QUEL site (*) de transmettre des cookies de session d'un utilisateur vers une API constituerait une faille béante de sécurité. Quand credentials: true est actif, l'origine autorisée doit être explicitement nommée."
            },
            {
              id: 4,
              question: "Pourquoi un middleware d'authentification placé avant app.use(cors()) fait-il échouer toutes les requêtes Preflight OPTIONS ?",
              options: [
                "Parce que les requêtes OPTIONS ne contiennent jamais d'en-tête Authorization, provoquant un 401 immédiat avant même que le middleware CORS ne puisse s'exécuter.",
                "Parce que Express n'aime pas les majuscules.",
                "Parce que les tokens JWT ne fonctionnent pas sur les ports locaux.",
                "Parce que le navigateur ferme la fenêtre."
              ],
              correctIndex: 0,
              explanation: "Par conception, le navigateur n'inclut aucun en-tête d'authentification lors de la négociation préliminaire OPTIONS. Si votre middleware d'auth s'exécute en premier, il rejettera l'OPTIONS avec un 401, bloquant définitivement la vraie requête."
            },
            {
              id: 5,
              question: "Votre backend envoie un en-tête 'X-Total-Count: 150'. Côté frontend, response.headers.get('X-Total-Count') renvoie null. Quel en-tête le serveur a-t-il oublié d'envoyer ?",
              options: [
                "Access-Control-Allow-Origin: *",
                "Access-Control-Expose-Headers: X-Total-Count",
                "Content-Type: text/plain",
                "Connection: keep-alive"
              ],
              correctIndex: 1,
              explanation: "Par défaut, les navigateurs censurent tous les en-têtes de réponse vis-à-vis du code JavaScript, à l'exception des en-têtes basiques (CORS-safelisted). Pour permettre à React de lire X-Total-Count, le serveur doit l'exposer via Access-Control-Expose-Headers."
            },
            {
              id: 6,
              question: "À quoi sert l'en-tête de réponse 'Access-Control-Max-Age: 86400' retourné lors du Preflight ?",
              options: [
                "À supprimer le serveur au bout de 24 heures.",
                "À indiquer au navigateur de mettre en cache les permissions CORS pendant 24 heures (86400 secondes), évitant d'émettre une requête OPTIONS à chaque appel POST ou PUT ultérieur.",
                "À forcer la déconnexion de l'utilisateur après 24 heures.",
                "À bloquer les adresses IP après 86400 millisecondes."
              ],
              correctIndex: 1,
              explanation: "Sans mise en cache, chaque appel d'API vers une route non simple génère 2 allers-retours réseau (OPTIONS puis la vraie requête), doublant la latence perçue. Access-Control-Max-Age met la réponse en cache pour accélérer les appels suivants."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre7Content;
