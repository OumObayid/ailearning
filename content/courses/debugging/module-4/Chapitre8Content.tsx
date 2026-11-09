'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type JwtScenarioKey =
  | 'expired_token'
  | 'tampered_signature'
  | 'decode_vs_verify'
  | 'idor_vulnerability';

interface JwtScenario {
  title: string;
  badge: string;
  badgeColor: string;
  statusCode: number;
  tokenRaw: string;
  decodedHeader: string;
  decodedPayload: string;
  securityVerdict: 'EXPIRED' | 'COMPROMISED' | 'CRITICAL_VULNERABILITY' | 'FORBIDDEN_IDOR';
  analysis: string;
  remedyCode: string;
}

const JWT_SCENARIOS: Record<JwtScenarioKey, JwtScenario> = {
  expired_token: {
    title: '1. Jeton Expiré (TokenExpiredError)',
    badge: 'HTTP 401 Session Échue',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    statusCode: 401,
    tokenRaw: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQiLCJuYW1lIjoiQWxpY2UiLCJyb2xlIjoibWVtYmVyIiwiZXhwIjoxNzA0MDY3MjAwfQ.dHJ5dG92ZXJpZnl0aGlz...',
    decodedHeader: `{
  "alg": "HS256",
  "typ": "JWT"
}`,
    decodedPayload: `{
  "sub": "104",
  "name": "Alice",
  "role": "member",
  "exp": 1704067200 // Date expirée dans le passé !
}`,
    securityVerdict: 'EXPIRED',
    analysis: 'jwt.verify() lève automatiquement l\'exception TokenExpiredError. Le serveur doit répondre 401 avec l\'en-tête WWW-Authenticate pour inciter le client à faire un silent refresh.',
    remedyCode: `try {
  req.user = jwt.verify(token, process.env.JWT_SECRET!);
  next();
} catch (error) {
  if (error instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      error: 'TOKEN_EXPIRED',
      detail: 'Votre session a expiré. Veuillez rafraîchir le jeton.'
    });
  }
  return res.status(401).json({ error: 'INVALID_TOKEN' });
}`
  },
  tampered_signature: {
    title: '2. Falsification du Payload et Signature Invalide',
    badge: 'HTTP 401 Signature Rejetée',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    statusCode: 401,
    tokenRaw: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQiLCJyb2xlIjoiYWRtaW4ifQ.HACKED_SIGNATURE_INVALID...',
    decodedHeader: `{
  "alg": "HS256",
  "typ": "JWT"
}`,
    decodedPayload: `{
  "sub": "104",
  "name": "Alice",
  "role": "admin" // ⚠️ L'attaquant a changé "member" en "admin" !
}`,
    securityVerdict: 'COMPROMISED',
    analysis: 'L\'attaquant a altéré le Payload en Base64. Cependant, ne connaissant pas le JWT_SECRET du serveur, sa signature recalculée ne correspond pas au hash cryptographique HMAC-SHA256.',
    remedyCode: `// La méthode jwt.verify garantit l'intégrité :
// Si un seul octet du header ou du payload change, la signature ne matche plus :
try {
  const verified = jwt.verify(token, process.env.JWT_SECRET!);
  req.user = verified;
  next();
} catch (error) {
  // Lève JsonWebTokenError: invalid signature
  return res.status(401).json({ error: 'SIGNATURE_VERIFICATION_FAILED' });
}`
  },
  decode_vs_verify: {
    title: '3. La faille mortelle : jwt.decode() au lieu de jwt.verify()',
    badge: 'Faille Critique Zéro-Auth',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    statusCode: 500,
    tokenRaw: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTkiLCJyb2xlIjoiU1VQRVJfQURNSU4ifQ.FAUSSE_SIGNATURE',
    decodedHeader: `{
  "alg": "HS256",
  "typ": "JWT"
}`,
    decodedPayload: `{
  "sub": "999",
  "role": "SUPER_ADMIN"
}`,
    securityVerdict: 'CRITICAL_VULNERABILITY',
    analysis: 'Erreur fatale de développeur junior : jwt.decode() se contente de désérialiser le JSON sans AUCUNE vérification de signature ! N\'importe qui peut usurper n\'importe quel compte.',
    remedyCode: `// ❌ CODE VULNÉRABLE DANGEREUX :
const user = jwt.decode(token); // AUCUNE SÉCURITÉ ! Tout le monde est admin !

// ✅ CODE CERTIFIÉ INDISPENSABLE :
const user = jwt.verify(token, process.env.JWT_SECRET!, {
  algorithms: ['HS256'] // Forcer l'algorithme pour bloquer la faille 'none'
});`
  },
  idor_vulnerability: {
    title: '4. Faille IDOR : Authentifié (401 résolu) mais Autorisation absente',
    badge: 'HTTP 403 / IDOR Violation',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    statusCode: 403,
    tokenRaw: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQiLCJyb2xlIjoibWVtYmVyIn0.VALID_SIGNATURE...',
    decodedHeader: `{
  "alg": "HS256",
  "typ": "JWT"
}`,
    decodedPayload: `{
  "sub": "104", // Utilisateur Alice (ID #104)
  "role": "member"
}`,
    securityVerdict: 'FORBIDDEN_IDOR',
    analysis: 'Alice est authentifiée avec un JWT valide. Mais elle appelle GET /api/v1/invoices/999 (la facture de Bob !). Sans vérification de possession, c\'est une faille IDOR (Insecure Direct Object Reference).',
    remedyCode: `// Protection défensive contre l'IDOR :
app.get('/api/v1/invoices/:id', authenticateToken, async (req, res) => {
  const invoice = await db.findInvoiceById(req.params.id);
  if (!invoice) return res.status(404).json({ error: 'Facture introuvable' });

  // CONTRÔLE D'AUTORISATION STRICT :
  // L'utilisateur doit posséder la ressource OU posséder le rôle admin :
  if (invoice.userId !== req.user.sub && req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'FORBIDDEN',
      message: 'Vous n\\x27êtes pas autorisé à consulter la facture d\\x27un tiers.'
    });
  }

  res.json(invoice);
});`
  }
};

export const Chapitre8Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<JwtScenarioKey>('expired_token');
  const scenario = JWT_SCENARIOS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 8 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Authentication &amp; RBAC Diagnostics
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Diagnostic des erreurs d&apos;authentification et d&apos;autorisation : JWT, 401 vs 403, RBAC et failles IDOR
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          L&apos;authentification (AuthN) est votre passeport à la douane : <em>&quot;Prouvez qui vous êtes&quot;</em>.
          L&apos;autorisation (AuthZ) est votre badge d&apos;accès à la salle des coffres : <em>&quot;Avez-vous le droit de toucher à cette donnée ?&quot;</em>.
          Confondre ces deux couches transforme des incidents de connexion bénins en failles de sécurité critiques (IDOR, usurpation de privilèges)
          ou en erreurs 500 opaques provoquées par un simple jeton expiré.
        </p>
      </div>

      {/* Diagramme Anatomie JWT */}
      <div className="p-6 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
            <Icon name="code" className="w-5 h-5 text-emerald-600" />
            <span>Structure cryptographique d&apos;un JSON Web Token (RFC 7519)</span>
          </h2>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full">
            Figure 4.8
          </span>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex justify-center p-4">
          <Image
            src="/images/cours/debugging/module-4/image2.jpeg"
            alt="Structure d'un JWT : Header, Payload et Signature"
            width={850}
            height={480}
            className="rounded-xl object-contain max-h-[440px] w-auto shadow-md"
          />
        </div>
        <p className="text-xs text-slate-600 italic text-center">
          Décomposition d&apos;un jeton JWT : le <strong>Header</strong> (algorithme de hachage), le <strong>Payload</strong> (données d&apos;identité et claims)
          et la <strong>Signature cryptographique</strong> HMAC-SHA256 validée par le secret du serveur.
        </p>
      </div>

      {/* 1. La distinction vitale : 401 vs 403 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            La distinction capitale : 401 Unauthorized vs 403 Forbidden
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-950 text-sm">HTTP 401 Unauthorized</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">Identité Absente</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Le client <strong>n&apos;a pas prouvé son identité</strong>. Le jeton est absent, expiré, malformé ou la signature est fausse.
            </p>
            <ul className="text-xs text-amber-950 space-y-1 list-disc list-inside">
              <li>Header <code>Authorization: Bearer &lt;token&gt;</code> absent.</li>
              <li>Jeton expiré (<code>TokenExpiredError</code>).</li>
              <li>Signature cryptographique invalide (<code>invalid signature</code>).</li>
            </ul>
            <div className="text-xs font-bold text-amber-950 pt-2 border-t border-amber-200">
              Remède : Déclencher le flux de login ou le silent refresh token.
            </div>
          </div>

          <div className="p-5 rounded-2xl border-2 border-purple-300 bg-purple-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-purple-950 text-sm">HTTP 403 Forbidden</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-bold">Droits Insuffisants</span>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed">
              Le serveur <strong>sait parfaitement qui est l&apos;utilisateur</strong> (le token est 100% valide), mais son rôle ou ses droits lui interdisent cette action.
            </p>
            <ul className="text-xs text-purple-950 space-y-1 list-disc list-inside">
              <li>Un compte <code>member</code> tente d&apos;accéder à la route <code>/api/admin/metrics</code>.</li>
              <li>Un utilisateur tente de modifier la facture d&apos;un autre client (IDOR).</li>
              <li>Compte utilisateur suspendu ou restreint.</li>
            </ul>
            <div className="text-xs font-bold text-purple-950 pt-2 border-t border-purple-200">
              Remède : Ne pas renvoyer vers l&apos;écran de login (cela ne changerait rien aux droits !).
            </div>
          </div>
        </div>
      </section>

      {/* 2. Le piège mortel : jwt.decode() vs jwt.verify() */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Le piège mortel : jwt.decode() vs jwt.verify()
          </h2>
        </div>

        <Callout type="danger" title="Alerte Sécurité Critique : Ne confondez JAMAIS decode et verify !">
          <p className="text-xs sm:text-sm">
            Un jeton JWT n&apos;est <strong>pas chiffré</strong> : il est simplement encodé en Base64URL.
            N&apos;importe qui peut coller un JWT sur <code>jwt.io</code> pour lire son contenu en clair.
          </p>
          <ul className="list-disc list-inside mt-2 text-xs sm:text-sm space-y-1">
            <li><code>jwt.decode(token)</code> : Se contente de convertir le Base64 en objet JavaScript. Il <strong>n&apos;effectue AUCUNE vérification de signature</strong>. Si vous basez vos permissions dessus, un attaquant peut modifier <code>&quot;role&quot;: &quot;admin&quot;</code> et prendre le contrôle total du serveur.</li>
            <li><code>jwt.verify(token, secret)</code> : Recalcule le hash cryptographique HMAC-SHA256 avec la clé secrète du serveur. Si la signature ne correspond pas à 100%, la méthode rejette le jeton.</li>
          </ul>
        </Callout>
      </section>

      {/* 3. Laboratoire Interactif JWT & Auth */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Diagnostic des Incidents d&apos;Authentification JWT
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Inspectez les 4 anomalies de sécurité classiques pour visualiser la charge utile, l&apos;analyse cryptographique et le code de protection :
        </p>

        {/* Boutons Sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(Object.keys(JWT_SCENARIOS) as JwtScenarioKey[]).map((key) => {
            const item = JWT_SCENARIOS[key];
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
            </div>
            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
              Statut HTTP Requis : <span className="text-slate-950 font-black">HTTP {scenario.statusCode}</span>
            </div>
          </div>

          {/* Jeton Brut */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
              Jeton JWT Brut (Reçu dans Authorization: Bearer ...)
            </div>
            <div className="p-2.5 bg-slate-950 text-slate-300 font-mono text-xs rounded-xl overflow-x-auto truncate">
              {scenario.tokenRaw}
            </div>
          </div>

          {/* Décomposition Header et Payload */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-indigo-700 mb-1.5">
                Header (Algorithme)
              </div>
              <CodeBlock language="json" code={scenario.decodedHeader} />
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-purple-700 mb-1.5">
                Payload Décodé (Claims de Session)
              </div>
              <CodeBlock language="json" code={scenario.decodedPayload} />
            </div>
          </div>

          {/* Analyse */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800">
            <span className="font-bold text-slate-950">Diagnostic d&apos;ingénierie : </span>
            {scenario.analysis}
          </div>

          {/* Code de remédiation */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-1.5">
              Implémentation Certifiée
            </div>
            <CodeBlock language="typescript" code={scenario.remedyCode} />
          </div>
        </div>
      </section>

      {/* 4. TP : Middleware complet AuthN + RBAC */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Implémenter le Pipeline Défensif Authentification + RBAC
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Ce module d&apos;authentification Express capture rigoureusement toutes les anomalies : préfixe Bearer,
          exceptions synchrones de <code>jwt.verify</code>, validation de secret et matrice de rôles :
        </p>

        <CodeBlock
          language="typescript"
          code={`import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
}

// Extension du type Request d'Express
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

// 1. Middleware d'Authentification (AuthN -> HTTP 401)
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      type: 'https://api.eshop.fr/errors/missing-token',
      title: 'Authentification requise',
      status: 401,
      detail: 'L\\x27en-tête Authorization doit contenir un jeton au format Bearer <token>.'
    });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('[SÉCURITÉ] JWT_SECRET non défini dans les variables d\\x27environnement !');
    return res.status(500).json({ error: 'Configuration serveur invalide' });
  }

  try {
    const payload = jwt.verify(token, secret, { algorithms: ['HS256'] }) as AuthenticatedUser;
    req.user = payload;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        type: 'https://api.eshop.fr/errors/token-expired',
        title: 'Session expirée',
        status: 401,
        detail: 'Votre jeton a expiré. Veuillez rafraîchir votre session.'
      });
    }

    return res.status(401).json({
      type: 'https://api.eshop.fr/errors/invalid-token',
      title: 'Jeton invalide',
      status: 401,
      detail: 'Le jeton de sécurité est corrompu ou falsifié.'
    });
  }
}

// 2. Middleware d'Autorisation par Rôles (AuthZ / RBAC -> HTTP 403)
export function requireRoles(...allowedRoles: Array<'admin' | 'manager' | 'member'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        type: 'https://api.eshop.fr/errors/forbidden',
        title: 'Droits insuffisants',
        status: 403,
        detail: \`Cette ressource requiert l\\x27un des rôles suivants : [\${allowedRoles.join(', ')}]. Votre rôle : [\${req.user?.role ?? 'anonyme'}].\`
      });
    }
    return next();
  };
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
            Quiz de validation des acquis — Chapitre 4.8
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Validez votre compréhension des mécanismes d&apos;authentification et de contrôle d&apos;accès :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il extrêmement dangereux d'utiliser jwt.decode(token) pour sécuriser un endpoint API au lieu de jwt.verify(token, secret) ?",
              options: [
                "Parce que jwt.decode() est 10 fois plus lent à s'exécuter.",
                "Parce que jwt.decode() ne vérifie absolument pas la signature cryptographique du jeton : n'importe quel attaquant peut modifier le payload (ex: role='admin') sans être détecté.",
                "Parce que jwt.decode() supprime automatiquement le token de la mémoire.",
                "Parce que jwt.decode() ne fonctionne que sur les ordinateurs Apple."
              ],
              correctIndex: 1,
              explanation: "jwt.decode() se contente de désérialiser la chaîne Base64 du JWT. Sans vérification de la signature cryptographique via jwt.verify(), n'importe quel utilisateur peut forger un faux token avec des droits administrateur."
            },
            {
              id: 2,
              question: "Un utilisateur se connecte avec succès (identifiants valides), mais tente d'accéder à la route DELETE /api/users/99 réservée aux super-administrateurs. Quel code HTTP renvoyer ?",
              options: [
                "401 Unauthorized",
                "403 Forbidden",
                "400 Bad Request",
                "500 Internal Server Error"
              ],
              correctIndex: 1,
              explanation: "403 Forbidden est le code obligatoire. L'identité de l'utilisateur est parfaitement authentifiée (ce n'est donc PAS un 401), mais ses privilèges sont insuffisants pour accomplir cette action."
            },
            {
              id: 3,
              question: "Pourquoi la fonction jwt.verify(token, secret) doit-elle impérativement être encapsulée dans un bloc try / catch dans un middleware Express ?",
              options: [
                "Parce que TypeScript refuse de compiler sans try/catch.",
                "Parce que jwt.verify() est une méthode synchrone qui lève une exception (throw) si le token est expiré ou corrompu : sans try/catch, le serveur plante ou renvoie un 500 inadapté.",
                "Pour accélérer la connexion à la base de données.",
                "Pour permettre à Express de recharger le token automatiquement."
              ],
              correctIndex: 1,
              explanation: "En cas de token expiré (TokenExpiredError) ou de fausse signature (JsonWebTokenError), jwt.verify() lance une exception synchrone. Sans try/catch, l'exception non gérée est traitée comme un crash serveur 500 au lieu d'un 401."
            },
            {
              id: 4,
              question: "Qu'est-ce qu'une faille de sécurité IDOR (Insecure Direct Object Reference) dans une API REST ?",
              options: [
                "Une panne matérielle du processeur du serveur.",
                "Une vulnérabilité où l'API fait confiance à l'identifiant passé dans l'URL (/invoices/:id) sans vérifier que l'utilisateur authentifié est bien le propriétaire légitime de cette ressource.",
                "Une attaque par déni de service distribué (DDoS).",
                "L'oubli de la balise <head> dans le HTML."
              ],
              correctIndex: 1,
              explanation: "L'IDOR se produit lorsqu'un utilisateur authentifié peut accéder aux données d'un autre utilisateur simplement en changeant un ID dans l'URL (ex: /documents/105 au lieu de 104), faute de vérification de possession en BDD."
            },
            {
              id: 5,
              question: "Que se passe-t-il si vous passez la chaîne complète de l'en-tête 'Bearer eyJhbGci...' directement à jwt.verify() sans retirer le mot 'Bearer ' ?",
              options: [
                "La fonction ignore automatiquement le mot Bearer.",
                "jwt.verify() échoue immédiatement en levant l'erreur 'JsonWebTokenError: jwt malformed' car le mot Bearer n'est pas une structure Base64URL valide à 3 segments.",
                "Le serveur se connecte en mode invité.",
                "Le token est converti en cookie."
              ],
              correctIndex: 1,
              explanation: "Un JWT est composé de 3 segments séparés par des points (header.payload.signature). Inclure le préfixe 'Bearer ' produit une chaîne invalide que le parseur JWT rejette avec une erreur 'jwt malformed'."
            },
            {
              id: 6,
              question: "Pourquoi est-il formellement proscrit de stocker des données sensibles (mots de passe, clés d'API secrètes) dans le Payload d'un JWT ?",
              options: [
                "Parce que le JWT refuse de stocker plus de 10 caractères.",
                "Parce que le Payload n'est PAS chiffré : il est simplement encodé en Base64URL et peut être décodé instantanément par n'importe quel intermédiaire ou utilisateur.",
                "Parce que la base MySQL ne supporte pas les tokens.",
                "Pour respecter la norme ISO-9001."
              ],
              correctIndex: 1,
              explanation: "La signature d'un JWT garantit son INTÉGRITÉ (la non-altération), mais ne garantit AUCUNE CONFIDENTIALITÉ. Le payload est lisible en clair par quiconque intercepte le jeton."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre8Content;
