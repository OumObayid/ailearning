'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type TriageScenarioKey =
  | 'bad_request_syntax'
  | 'jwt_expired'
  | 'forbidden_role'
  | 'not_found_db'
  | 'method_not_allowed'
  | 'unprocessable_zod'
  | 'rate_limit_exceeded'
  | 'unhandled_crash_500';

interface TriageScenario {
  code: number;
  phrase: string;
  badge: string;
  badgeColor: string;
  category: '4xx Client' | '5xx Server';
  summary: string;
  requestSnippet: string;
  serverErrorContext: string;
  responsePayload: string;
  rootCause: string;
  fixGuide: string[];
}

const TRIAGE_SCENARIOS: Record<TriageScenarioKey, TriageScenario> = {
  bad_request_syntax: {
    code: 400,
    phrase: 'Bad Request',
    badge: 'Syntaxe / Enveloppe',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    category: '4xx Client',
    summary: 'Le client a envoyé un flux JSON corrompu ou des en-têtes illisibles. Le serveur ne peut même pas parser la charge utile.',
    requestSnippet: `POST /api/v1/orders HTTP/1.1
Host: api.eshop.fr
Content-Type: application/json

{
  "productId": 104,
  "quantity": 2,  <-- VIRGULE TRAILING OU GUILLEMET MANQUANT
}`,
    serverErrorContext: `SyntaxError: Unexpected token } in JSON at position 47
    at JSON.parse (<anonymous>)
    at parse (node_modules/body-parser/lib/types/json.js:89:19)
    at /node_modules/body-parser/lib/read.js:128:18`,
    responsePayload: `HTTP/1.1 400 Bad Request
Content-Type: application/problem+json; charset=utf-8

{
  "type": "https://api.eshop.fr/errors/bad-request",
  "title": "Corps JSON invalide",
  "status": 400,
  "detail": "La syntaxe JSON reçue est mal formée (Unexpected token at line 4).",
  "instance": "/api/v1/orders"
}`,
    rootCause: 'Le middleware express.json() a échoué lors de JSON.parse(). Le code métier n&apos;a même pas encore été exécuté.',
    fixGuide: [
      'Valider le corps JSON côté client avant l&apos;émission (JSON.stringify).',
      'Intercepter l&apos;erreur de parsing de body-parser dans un middleware Express dédié.',
      'Ne jamais renvoyer 500 pour une faute de frappe JSON venant du client.'
    ]
  },
  jwt_expired: {
    code: 401,
    phrase: 'Unauthorized',
    badge: 'Authentification (Identité)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    category: '4xx Client',
    summary: 'Le client ne fournit aucun justificatif d&apos;identité, ou le token JWT est périmé, falsifié ou signé avec une clé secrète incorrecte.',
    requestSnippet: `GET /api/v1/profile HTTP/1.1
Host: api.eshop.fr
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# Token dont le payload contient "exp": 1700000000 (date passée)`,
    serverErrorContext: `TokenExpiredError: jwt expired
    at /node_modules/jsonwebtoken/verify.js:152:21
    at verifyToken (middlewares/auth.js:14:20)`,
    responsePayload: `HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="invalid_token", error_description="The access token expired"
Content-Type: application/problem+json

{
  "type": "https://api.eshop.fr/errors/token-expired",
  "title": "Session expirée",
  "status": 401,
  "detail": "Votre jeton d'accès a expiré à 10:15:00 UTC. Veuillez rafraîchir votre token.",
  "instance": "/api/v1/profile"
}`,
    rootCause: 'La fonction jwt.verify() a levé une exception TokenExpiredError. Le client doit s&apos;authentifier à nouveau via son refresh_token.',
    fixGuide: [
      'Vérifier la présence de l&apos;en-tête Authorization au format `Bearer <token>`.',
      'Fournir l&apos;en-tête standard WWW-Authenticate pour guider le client HTTP.',
      'Côté frontend : déclencher le flux de renouvellement automatique (Silent Refresh).'
    ]
  },
  forbidden_role: {
    code: 403,
    phrase: 'Forbidden',
    badge: 'Autorisation (Permissions)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    category: '4xx Client',
    summary: 'L&apos;identité est validée avec succès, mais les privilèges associés au compte ne permettent pas d&apos;effectuer l&apos;action demandée.',
    requestSnippet: `DELETE /api/v1/users/42 HTTP/1.1
Host: api.eshop.fr
Authorization: Bearer eyJhbGciOi... (Jeton valide de l'utilisateur "julie", role: "member")`,
    serverErrorContext: `AccessControlViolation: User #88 (role: 'member') lacks 'users:delete' permission
    at requireRole (middlewares/rbac.js:28:12)`,
    responsePayload: `HTTP/1.1 403 Forbidden
Content-Type: application/problem+json

{
  "type": "https://api.eshop.fr/errors/forbidden",
  "title": "Droits insuffisants",
  "status": 403,
  "detail": "Cette action requiert le rôle [ADMIN]. Votre compte dispose du rôle [MEMBER].",
  "instance": "/api/v1/users/42"
}`,
    rootCause: 'Le client est bien identifié (ce n&apos;est PAS un 401), mais sa matrice de droits RBAC lui interdit la ressource.',
    fixGuide: [
      'Ne pas inviter l&apos;utilisateur à se reconnecter : cela ne changerait rien à ses droits.',
      'Vérifier que la règle de filtrage RBAC correspond bien à la politique de l&apos;entreprise.',
      'Protéger contre les failles IDOR (Insecure Direct Object Reference) en comparant l&apos;ID du token à l&apos;ID de la ressource demandée.'
    ]
  },
  not_found_db: {
    code: 404,
    phrase: 'Not Found',
    badge: 'Ressource Introuvable',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    category: '4xx Client',
    summary: 'La route d&apos;API existe bien dans Express, mais la requête pointe vers un identifiant numérique absent de la base de données SQL.',
    requestSnippet: `GET /api/v1/articles/9420 HTTP/1.1
Host: api.eshop.fr
Accept: application/json`,
    serverErrorContext: `SELECT * FROM articles WHERE id = 9420 LIMIT 1;
--> Résultat SQL : [] (0 ligne retournée par MySQL)`,
    responsePayload: `HTTP/1.1 404 Not Found
Content-Type: application/problem+json

{
  "type": "https://api.eshop.fr/errors/resource-not-found",
  "title": "Article introuvable",
  "status": 404,
  "detail": "Aucun article n'existe avec l'identifiant 9420.",
  "instance": "/api/v1/articles/9420"
}`,
    rootCause: 'La requête SELECT n&apos;a renvoyé aucun tuple. Le contrôleur doit explicitement vérifier if (!article) return res.status(404).',
    fixGuide: [
      'Distinguer un 404 "Route Express absente" d&apos;un 404 "Tuple SQL absent".',
      'Ne pas renvoyer 200 OK avec `{ success: false, data: null }` : cela viole la sémantique REST.',
      'Vérifier si la ressource a été supprimée définitivement (envisager 410 Gone si historique requis).'
    ]
  },
  method_not_allowed: {
    code: 405,
    phrase: 'Method Not Allowed',
    badge: 'Verbe HTTP Invalide',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    category: '4xx Client',
    summary: 'La ressource existe mais n&apos;accepte pas cette méthode HTTP. Le serveur a l&apos;obligation d&apos;indiquer les méthodes valides via l&apos;en-tête Allow.',
    requestSnippet: `DELETE /api/v1/newsletter HTTP/1.1
Host: api.eshop.fr
Accept: application/json`,
    serverErrorContext: `Router inspection:
Route '/api/v1/newsletter' accepts [GET, POST].
Client requested method: DELETE.`,
    responsePayload: `HTTP/1.1 405 Method Not Allowed
Allow: GET, POST
Content-Type: application/problem+json

{
  "type": "https://api.eshop.fr/errors/method-not-allowed",
  "title": "Méthode non autorisée",
  "status": 405,
  "detail": "Le verbe DELETE n'est pas autorisé sur /api/v1/newsletter. Méthodes permises : GET, POST.",
  "instance": "/api/v1/newsletter"
}`,
    rootCause: 'Le client appelle un verbe HTTP qui n&apos;a pas de handler sur cette route, alors que la ressource existe par ailleurs.',
    fixGuide: [
      'Toujours envoyer l&apos;en-tête de réponse `Allow: GET, POST, HEAD`.',
      'Examiner les routeurs Express pour vérifier si un routeur générique ou une méthode router.all() masque les intentions.',
      'Vérifier que les proxys ou passerelles de paiement ne convertissent pas des POST en GET suite à des redirections 301.'
    ]
  },
  unprocessable_zod: {
    code: 422,
    phrase: 'Unprocessable Content',
    badge: 'Validation Métier',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    category: '4xx Client',
    summary: 'La syntaxe JSON est valide, mais les données violent des contraintes métier du domaine (mot de passe trop court, prix négatif, date future).',
    requestSnippet: `POST /api/v1/users/register HTTP/1.1
Host: api.eshop.fr
Content-Type: application/json

{
  "email": "sarah.dev@example.com",
  "age": -5,
  "password": "123"
}`,
    serverErrorContext: `ZodError: [
  { "code": "too_small", "path": ["password"], "message": "Min 8 chars" },
  { "code": "too_small", "path": ["age"], "message": "L'âge doit être >= 18" }
]`,
    responsePayload: `HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json

{
  "type": "https://api.eshop.fr/errors/validation-failed",
  "title": "Échec de validation des données",
  "status": 422,
  "detail": "2 champs contiennent des valeurs incompatibles avec les règles métier.",
  "invalidParams": [
    { "name": "password", "reason": "Le mot de passe doit comporter au moins 8 caractères." },
    { "name": "age", "reason": "L'âge minimum légal d'inscription est 18 ans." }
  ]
}`,
    rootCause: 'Le corps est un JSON valide (donc pas de 400), mais le validateur de schéma (Zod/Joi) a détecté des violations sémantiques.',
    fixGuide: [
      'Utiliser 422 (RFC 9110 / RFC 4918) pour distinguer les fautes de syntaxe (400) des rejets de formulaire métier.',
      'Fournir la liste précise des champs invalides dans `invalidParams` pour permettre au frontend de colorer les champs en rouge.',
      'Ne jamais faire planter le serveur sur une validation de schéma.'
    ]
  },
  rate_limit_exceeded: {
    code: 429,
    phrase: 'Too Many Requests',
    badge: 'Quota & Throttling',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    category: '4xx Client',
    summary: 'Le client a envoyé trop de requêtes dans une fenêtre temporelle restreinte. Le middleware de limitation coupe la connexion pour préserver le backend.',
    requestSnippet: `GET /api/v1/search?q=nodejs HTTP/1.1
Host: api.eshop.fr
X-Forwarded-For: 198.51.100.42
# 125ème requête émise en moins de 60 secondes`,
    serverErrorContext: `RateLimiter: IP 198.51.100.42 exceeded quota of 100 req / 60s
Window reset timestamp: 1773019860`,
    responsePayload: `HTTP/1.1 429 Too Many Requests
Retry-After: 35
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1773019860
Content-Type: application/problem+json

{
  "type": "https://api.eshop.fr/errors/rate-limit-exceeded",
  "title": "Quota d'appels temporairement dépassé",
  "status": 429,
  "detail": "Vous avez dépassé la limite de 100 requêtes par minute. Réessayez dans 35 secondes.",
  "instance": "/api/v1/search"
}`,
    rootCause: 'Le middleware express-rate-limit ou une passerelle Redis a identifié un pic suspect ou une boucle infinie de polling côté frontend.',
    fixGuide: [
      'Toujours envoyer l&apos;en-tête `Retry-After: <secondes>` afin que le client HTTP sache quand retenter.',
      'Côté client : implémenter un algorithme de backoff exponentiel avec jitter.',
      'Vérifier que le client ne lance pas une boucle infinie dans un useEffect sans tableau de dépendances.'
    ]
  },
  unhandled_crash_500: {
    code: 500,
    phrase: 'Internal Server Error',
    badge: 'Crash Serveur Non Catché',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    category: '5xx Server',
    summary: 'Une exception JavaScript non gérée ou un crash de connexion base de données a provoqué l&apos;interruption du contrôleur.',
    requestSnippet: `GET /api/v1/invoices/last HTTP/1.1
Host: api.eshop.fr
Authorization: Bearer valid_token`,
    serverErrorContext: `TypeError: Cannot read properties of undefined (reading 'calculateTax')
    at /src/controllers/invoiceController.js:48:29
    at Layer.handle [as handle_request] (/node_modules/express/lib/router/layer.js:95:5)
    at next (/node_modules/express/lib/router/route.js:144:13)`,
    responsePayload: `HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json

{
  "type": "https://api.eshop.fr/errors/internal-error",
  "title": "Erreur interne du serveur",
  "status": 500,
  "detail": "Une défaillance inattendue est survenue. L'incident a été enregistré sous l'identifiant req-98f2b.",
  "instance": "/api/v1/invoices/last"
}`,
    rootCause: 'Le développeur a appelé une méthode sur une variable undefined sans bloc try/catch ou sans gestionnaire d&apos;erreur async.',
    fixGuide: [
      'Consulter les logs serveur (Winston, CloudWatch, Datadog) via le requestId pour lire la véritable Stack Trace.',
      'Ne JAMAIS renvoyer la stack trace complète au client en production (fuite de sécurité majeure).',
      'Installer un middleware d&apos;erreur global Express à 4 arguments `(err, req, res, next)` en fin de chaîne.'
    ]
  }
};

export const Chapitre2Content: React.FC = () => {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<TriageScenarioKey>('bad_request_syntax');
  const activeScenario = TRIAGE_SCENARIOS[selectedScenarioKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 2 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            HTTP Status Code Diagnostics
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Diagnostic des codes de statut HTTP : 400, 401, 403, 404, 405, 422, 429 et 500
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Le code de statut HTTP est le premier <strong>électrocardiogramme</strong> de votre échange réseau.
          En un nombre à trois chiffres, il localise instantanément la responsabilité :
          est-ce l&apos;appelant qui a envoyé des données erronées (série 4xx) ou le serveur qui a trébuché sur une exception non gérée (série 5xx) ?
          Maîtriser ce triage transforme des heures d&apos;errance aveugle en une investigation méthodique de 30 secondes.
        </p>
      </div>

      {/* 1. Taxonomie des 5 familles RFC */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            La taxonomie des 5 familles de statuts HTTP (RFC 9110)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Chaque centaine définit une responsabilité contractuelle stricte entre le client et le serveur :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl border border-slate-300 bg-white shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-slate-500 tracking-wider">Famille 1xx</div>
            <div className="text-base font-black text-slate-900">Informationnel</div>
            <p className="text-xs text-slate-600">
              Protocole en cours d&apos;établissement (ex: <code>101 Switching Protocols</code> pour WebSocket).
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-emerald-700 tracking-wider">Famille 2xx</div>
            <div className="text-base font-black text-emerald-950">Succès nominal</div>
            <p className="text-xs text-emerald-900">
              L&apos;action demandée a été comprise et validée (<code>200 OK</code>, <code>201 Created</code>, <code>204 No Content</code>).
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-blue-300 bg-blue-50/50 shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-blue-700 tracking-wider">Famille 3xx</div>
            <div className="text-base font-black text-blue-950">Redirection / Cache</div>
            <p className="text-xs text-blue-900">
              Action supplémentaire requise (<code>301 Moved</code>, <code>304 Not Modified</code> via ETag).
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50/50 shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-amber-800 tracking-wider">Famille 4xx</div>
            <div className="text-base font-black text-amber-950">Erreur Client</div>
            <p className="text-xs text-amber-900">
              Requête incorrecte : syntaxe, authentification, droits, ressource introuvable ou quota.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-rose-300 bg-rose-50/50 shadow-sm space-y-1.5">
            <div className="text-xs font-black uppercase text-rose-700 tracking-wider">Famille 5xx</div>
            <div className="text-base font-black text-rose-950">Erreur Serveur</div>
            <p className="text-xs text-rose-900">
              Le serveur a compris la demande légitime mais a crashé (<code>500</code>, <code>502</code>, <code>504</code>).
            </p>
          </div>
        </div>

        <Callout type="danger" title="L'anti-pattern fatal : Le faux '200 OK' avec payload d'erreur">
          <p className="text-xs sm:text-sm">
            Certains backends novices interceptent leurs erreurs et répondent <code>HTTP 200 OK</code> avec le corps{' '}
            <code>{'{ "success": false, "error": "Database connection lost" }'}</code>.
            C&apos;est une catastrophe architecturale :
          </p>
          <ul className="list-disc list-inside mt-2 text-xs sm:text-sm space-y-1">
            <li>Les proxys, passerelles API et CDN considèrent la réponse comme un succès et peuvent mettre en cache l&apos;erreur.</li>
            <li>Les bibliothèques clientes (Axios, React Query, SWR) ne déclenchent pas leurs intercepteurs d&apos;erreur ni leurs mécanismes de retry automatique.</li>
            <li>Les outils de monitoring (Datadog, New Relic) affichent un taux d&apos;erreur de 0% alors que vos utilisateurs subissent un service à l&apos;arrêt.</li>
          </ul>
        </Callout>
      </section>

      {/* 2. Les duels d'or : 401 vs 403 & 400 vs 422 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les deux duels classiques de débogage backend
          </h2>
        </div>

        {/* Duel 1 : 401 vs 403 */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-black bg-purple-100 text-purple-900 border border-purple-300 uppercase">
              Duel 1
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-950">
              401 Unauthorized vs 403 Forbidden : Identité vs Privilèges
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-950 text-sm">HTTP 401 • Unauthorized</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">Qui êtes-vous ?</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Le client n&apos;est pas authentifié. Il n&apos;a fourni aucun jeton (token), le jeton est expiré, ou sa signature cryptographique est invalide.
              </p>
              <div className="text-xs font-semibold text-amber-950 pt-2 border-t border-amber-200">
                Action de remédiation : Le client <strong>doit</strong> s&apos;authentifier (saisie d&apos;identifiants ou refresh de token).
              </div>
            </div>

            <div className="p-4 rounded-xl border border-purple-300 bg-purple-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-purple-950 text-sm">HTTP 403 • Forbidden</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-bold">C&apos;est interdit !</span>
              </div>
              <p className="text-xs text-purple-900 leading-relaxed">
                Le serveur sait <em>exactement</em> qui est le client (le JWT est valide), mais la politique de sécurité (RBAC / ABAC) lui refuse formellement l&apos;accès.
              </p>
              <div className="text-xs font-semibold text-purple-950 pt-2 border-t border-purple-200">
                Action de remédiation : Ne pas renvoyer à l&apos;écran de login. Demander des droits d&apos;administration ou corriger l&apos;ID cible.
              </div>
            </div>
          </div>
        </div>

        {/* Duel 2 : 400 vs 422 */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-black bg-cyan-100 text-cyan-900 border border-cyan-300 uppercase">
              Duel 2
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-950">
              400 Bad Request vs 422 Unprocessable Content : Syntaxe vs Sémantique
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-300 bg-rose-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-rose-950 text-sm">HTTP 400 • Bad Request</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-bold">Incompréhensible</span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                Le format est intrinsèquement invalide. Le parser JSON plante (guillemet absent, virgule orpheline) ou des en-têtes obligatoires manquent.
              </p>
              <div className="text-xs font-semibold text-rose-950 pt-2 border-t border-rose-200">
                Niveau : Couche transport / protocole. Le serveur ne peut même pas lire les propriétés.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-cyan-300 bg-cyan-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-cyan-950 text-sm">HTTP 422 • Unprocessable Content</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-200 text-cyan-900 font-bold">Règles violées</span>
              </div>
              <p className="text-xs text-cyan-900 leading-relaxed">
                Le JSON est syntaxiquement parfait, mais la validation logique métier échoue (email sans &apos;@&apos;, âge négatif, quantité supérieure au stock).
              </p>
              <div className="text-xs font-semibold text-cyan-950 pt-2 border-t border-cyan-200">
                Niveau : Couche domaine / schéma applicatif (Zod, Joi, Yup, Express-validator).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Distinction 404 : Route vs Donnée */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Le piège du 404 Not Found : Route inexistante ou enregistrement SQL absent ?
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Quand un développeur reçoit un <code>404 Not Found</code>, il commet souvent l&apos;erreur de chercher au mauvais endroit.
          Il existe en réalité <strong>deux natures totalement distinctes</strong> de 404 :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-slate-300 bg-white space-y-3">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
              <Icon name="bug" className="w-4 h-4 text-rose-600" />
              <span>Type A : 404 de Routage Express (L&apos;URL n&apos;existe pas)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le routeur Express parcourt la table de routage et ne trouve aucune correspondance avec la méthode et le chemin.
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs">
              <div className="text-rose-400">{`// Erreur classique :`}</div>
              <div>GET /api/v1/user/104</div>
              <div className="text-slate-400">{`// alors que la route déclarée est :`}</div>
              <div className="text-emerald-400">app.get(&apos;/api/v1/users/:id&apos;, ...)</div>
            </div>
            <div className="text-xs font-semibold text-slate-900">
              Indicateur : Le middleware de fin de chaîne <code>app.use((req, res) =&gt; res.status(404))</code> est déclenché.
            </div>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-300 bg-white space-y-3">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <Icon name="database" className="w-4 h-4 text-blue-600" />
              <span>Type B : 404 de Ressource Métier (L&apos;ID n&apos;est pas en BDD)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              La route Express est parfaitement reconnue et exécutée, mais la requête SQL <code>SELECT</code> renvoie un tableau vide.
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs">
              <div className="text-emerald-400">{`const [rows] = await db.execute(`}</div>
              <div>&apos;SELECT * FROM users WHERE id = ?&apos;, [req.params.id]</div>
              <div>{`);`}</div>
              <div className="text-amber-400">{`if (rows.length === 0) {`}</div>
              <div>&nbsp;&nbsp;return res.status(404).json({`{ message: "User not found" }`});</div>
              <div className="text-amber-400">{`}`}</div>
            </div>
            <div className="text-xs font-semibold text-slate-900">
              Indicateur : La requête SQL a tourné, la route est bonne, mais l&apos;enregistrement demandé n&apos;existe plus ou n&apos;a jamais existé.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Triage Interactif des 8 statuts */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Simulateur de Triage des Statuts HTTP
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800">
          Sélectionnez un scénario d&apos;incident pour inspecter la requête émise, l&apos;erreur interne du serveur,
          la réponse HTTP normalisée (RFC 9457) et la stratégie de correction immédiate :
        </p>

        {/* Buttons selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(TRIAGE_SCENARIOS) as TriageScenarioKey[]).map((key) => {
            const item = TRIAGE_SCENARIOS[key];
            const isSelected = selectedScenarioKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedScenarioKey(key)}
                className={`p-2.5 text-left rounded-xl border text-xs font-bold transition-all flex flex-col gap-1 ${
                  isSelected
                    ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                    isSelected ? 'bg-lime-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.code}
                  </span>
                  <span className="text-[10px] opacity-75">{item.phrase}</span>
                </div>
                <span className="truncate text-[11px] font-semibold">{item.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Card */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-950">HTTP {activeScenario.code}</span>
                <span className="text-lg font-bold text-slate-700">— {activeScenario.phrase}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${activeScenario.badgeColor}`}>
                  {activeScenario.badge}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">{activeScenario.summary}</p>
            </div>
            <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-300">
              {activeScenario.category}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Colonne Gauche : Requête et Contexte Serveur */}
            <div className="space-y-4">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <Icon name="arrow-right" className="w-3.5 h-3.5 text-slate-600" />
                  <span>1. Requête Client Incriminée</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-3.5 text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
                  {activeScenario.requestSnippet}
                </div>
              </div>

              <div>
                <div className="text-xs font-black uppercase tracking-wider text-rose-700 mb-1.5 flex items-center gap-1.5">
                  <Icon name="bug" className="w-3.5 h-3.5 text-rose-600" />
                  <span>2. Diagnostic &amp; Erreur Interne Serveur</span>
                </div>
                <div className="rounded-xl bg-rose-950/20 border border-rose-200 p-3.5 text-rose-950 font-mono text-xs overflow-x-auto whitespace-pre">
                  {activeScenario.serverErrorContext}
                </div>
              </div>
            </div>

            {/* Colonne Droite : Réponse HTTP RFC 9457 & Remédiation */}
            <div className="space-y-4">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-1.5 flex items-center gap-1.5">
                  <Icon name="server" className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3. Réponse HTTP Recommandée (RFC 9457)</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-3.5 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
                  {activeScenario.responsePayload}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
                  <span>4. Protocole de Résolution Recommandé</span>
                </div>
                <p className="text-xs text-slate-700 italic">
                  Cause racine : {activeScenario.rootCause}
                </p>
                <ul className="text-xs text-slate-800 space-y-1 mt-2">
                  {activeScenario.fixGuide.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-black">▸</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RFC 9457 Problem Details Standard */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            La norme RFC 9457 : Finie l&apos;anarchie des messages d&apos;erreur
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Chaque développeur junior invente son propre format : <code>{'{ "err": "msg" }'}</code>,{' '}
          <code>{'{ "status": "failed", "reason": "..." }'}</code> ou{' '}
          <code>{'{ "errors": ["erreur 1"] }'}</code>.
          L&apos;IETF a standardisé la structure d&apos;erreur universelle dans la spécification{' '}
          <strong>RFC 9457 (Problem Details for HTTP APIs)</strong> avec le MIME-type{' '}
          <code>application/problem+json</code> :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-2">
            <div className="text-xs font-bold text-rose-800 uppercase tracking-wider">Format anarchique non standard</div>
            <CodeBlock
              language="json"
              code={`// À ÉVITER : Format imprévisible
{
  "success": false,
  "msg": "Invalid email",
  "code": 1042
}`}
            />
            <p className="text-xs text-slate-600">
              Le frontend doit créer un parseur personnalisé pour chaque API et ne dispose d&apos;aucun identifiant de corrélation ni de lien documentaire.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Standard RFC 9457 conforme</div>
            <CodeBlock
              language="json"
              code={`// RECOMMANDÉ : RFC 9457
{
  "type": "https://api.monsite.com/errors/invalid-email",
  "title": "Validation Failed",
  "status": 422,
  "detail": "L'adresse email 'sarah@@' est syntaxiquement invalide.",
  "instance": "/api/v1/users/register"
}`}
            />
            <p className="text-xs text-slate-600">
              Structure normalisée lisible par machine et par humain, exploitable directement par les bibliothèques et clients API.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TP : Middleware Centralisé Express */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            6
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Implémenter le middleware de triage complet
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Voici l&apos;architecture de gestion d&apos;erreurs Express de production.
          Elle intercepte les échecs de parsing JSON (400), les rejets Zod (422), les expirations JWT (401),
          les refus de rôles (403), et capture tout crash imprévu en 500 sans jamais faire fuiter de code source :
        </p>

        <CodeBlock
          language="typescript"
          code={`import express, { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const app = express();

// 1. Parser JSON avec capture d'erreur de syntaxe (HTTP 400)
app.use(express.json());

// 2. Middleware d'authentification exemplaire
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      type: 'https://api.monsite.com/errors/unauthorized',
      title: 'Authentification requise',
      status: 401,
      detail: 'Jeton d\\x27accès manquant dans l\\x27en-tête Authorization.',
      instance: req.originalUrl
    });
  }
  next();
}

// 3. Gestionnaire d'erreurs 404 de routage Express
app.use((req: Request, res: Response) => {
  res.status(404).json({
    type: 'https://api.monsite.com/errors/route-not-found',
    title: 'Route inexistante',
    status: 404,
    detail: \`Aucune route ne correspond à \${req.method} \${req.originalUrl}\`,
    instance: req.originalUrl
  });
});

// 4. GESTIONNAIRE D'ERREURS GLOBAL (4 arguments obligatoires)
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  // A. Échec de syntaxe JSON dans express.json()
  if (err instanceof SyntaxError && 'status' in err && (err as { status: number }).status === 400) {
    return res.status(400).json({
      type: 'https://api.monsite.com/errors/bad-json',
      title: 'Corps JSON mal formé',
      status: 400,
      detail: 'Impossible de parser le corps de la requête.',
      instance: req.originalUrl
    });
  }

  // B. Échec de validation de schéma Zod
  if (err instanceof ZodError) {
    return res.status(422).json({
      type: 'https://api.monsite.com/errors/validation-failed',
      title: 'Échec de validation des données',
      status: 422,
      detail: 'Certains champs soumis sont invalides.',
      invalidParams: err.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
      instance: req.originalUrl
    });
  }

  // C. Jeton JWT expiré ou invalide
  if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
    return res.status(401).json({
      type: 'https://api.monsite.com/errors/invalid-token',
      title: 'Jeton invalide ou expiré',
      status: 401,
      detail: err.message,
      instance: req.originalUrl
    });
  }

  // D. Tout crash inattendu -> 500 sécurisé (log complet en interne, message opaque pour le client)
  console.error('[CRASH SERVEUR]', { error: err.stack, path: req.originalUrl });
  return res.status(500).json({
    type: 'https://api.monsite.com/errors/internal-server-error',
    title: 'Erreur interne du serveur',
    status: 500,
    detail: 'Une anomalie interne a été enregistrée. Nos équipes ont été alertées.',
    instance: req.originalUrl
  });
});`}
        />
      </section>

      {/* 7. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            7
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.2
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Validez votre compréhension des statuts HTTP et de leur méthode de diagnostic à travers 6 cas concrets :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Un utilisateur connecté avec le rôle 'member' tente de supprimer un article via DELETE /api/articles/42. L'accès lui est refusé. Quel code HTTP le backend DOIT renvoyer ?",
              options: [
                "401 Unauthorized",
                "403 Forbidden",
                "404 Not Found",
                "405 Method Not Allowed"
              ],
              correctIndex: 1,
              explanation: "403 Forbidden est le code exact. L'utilisateur est authentifié avec succès, mais ses privilèges ou rôles ne lui permettent pas de réaliser cette suppression. 401 serait une erreur grave car il inciterait le client à se reconnecter inutilement."
            },
            {
              id: 2,
              question: "Un client web envoie une requête POST contenant un corps JSON avec un guillemet non fermé. Quelle erreur est levée et quel code HTTP doit être retourné ?",
              options: [
                "ZodError -> 422 Unprocessable Content",
                "SyntaxError dans express.json() -> 400 Bad Request",
                "TypeError -> 500 Internal Server Error",
                "URIError -> 404 Not Found"
              ],
              correctIndex: 1,
              explanation: "Le parser express.json() échoue sur JSON.parse() et émet un SyntaxError. Comme la faute est imputable à la malformation du message émis par le client, le serveur doit renvoyer 400 Bad Request."
            },
            {
              id: 3,
              question: "Quelle est la différence fondamentale entre une réponse 400 Bad Request et 422 Unprocessable Content selon la RFC 9110 ?",
              options: [
                "400 est pour les requêtes GET et 422 pour les requêtes POST.",
                "400 sanctionne une malformation syntaxique ou de transport ; 422 sanctionne une violation sémantique ou métier d'un contenu syntaxiquement valide.",
                "400 est une erreur côté serveur alors que 422 est une erreur côté client.",
                "Il n'y a aucune différence, 422 est juste un synonyme déprécié."
              ],
              correctIndex: 1,
              explanation: "400 indique que le message est indéchiffrable ou non conforme au protocole (ex: JSON cassé). 422 indique que le message est parfaitement déchiffrable mais viole une règle du modèle (ex: l'âge d'un utilisateur est négatif ou le mot de passe est trop court)."
            },
            {
              id: 4,
              question: "Votre client reçoit un code HTTP 404 lors d'un appel GET /api/v1/orders/850. Comment déterminez-vous immédiatement s'il s'agit d'un bug de routing Express ou d'un ID manquant en base SQL ?",
              options: [
                "En vérifiant si la réponse est en XML ou en JSON.",
                "En testant si l'URL existe avec un autre ID connu (ex: /api/v1/orders/1) et en observant si un log SQL SELECT a été émis.",
                "En redémarrant le serveur Node.js.",
                "Un 404 ne peut concerner que des fichiers statiques HTML."
              ],
              correctIndex: 1,
              explanation: "Si /api/v1/orders/1 renvoie 200 et que les logs affichent la requête SELECT, le routage Express est parfait : le 404 est purement métier (la commande 850 n'existe pas en base). Si même avec un ID valide vous recevez 404 sans log SQL, c'est que la déclaration de la route Express est incorrecte."
            },
            {
              id: 5,
              question: "Pourquoi l'anti-pattern consistant à renvoyer 200 OK avec `{ success: false, error: 'Database timeout' }` est-il considéré comme une faute d'ingénierie majeure ?",
              options: [
                "Car les navigateurs refusent d'afficher du JSON avec le code 200.",
                "Car cela trompe les intercepteurs HTTP (Axios/React Query), les proxys de cache, et les outils d'observabilité qui considèrent la requête comme un succès.",
                "Car le protocole HTTP interdit l'usage du champ 'success'.",
                "Car cela consomme 10 fois plus de bande passante."
              ],
              correctIndex: 1,
              explanation: "Un statut 200 indique contractuellement que la ressource a traité la demande avec succès. Masquer un crash 500 derrière un 200 empêche les retry automatiques, fausse les métriques d'alerting (SLO/SLA) et peut amener un CDN à mettre en cache un message d'erreur."
            },
            {
              id: 6,
              question: "Lorsqu'un service tiers ou un client dépasse son quota d'appels et reçoit une réponse HTTP 429 Too Many Requests, quel en-tête de réponse est indispensable selon la spécification ?",
              options: [
                "Location: /api/quota",
                "Retry-After: <secondes ou date>",
                "Authorization: none",
                "Content-Encoding: gzip"
              ],
              correctIndex: 1,
              explanation: "L'en-tête `Retry-After` indique au client combien de secondes il doit patienter avant de pouvoir réémettre une requête sans être rejeté. Cela permet au client d'éviter de spammer le serveur à l'aveugle."
            }
          ]}
        />
      </section>
    </div>
  );
};
