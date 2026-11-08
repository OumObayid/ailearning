'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { RedisCacheRateLimitLab } from '@/components/interactive/RedisCacheRateLimitLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Rate Limiting et protection des quotas d&apos;appels API
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
            <span>Comprendre les vulnérabilités de surcharge, déni de service et explosion de coûts d&apos;une API d&apos;inférence non bridée.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser les en-têtes HTTP standards IETF (<code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">RateLimit-Limit</code>, <code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">Retry-After</code>).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier pourquoi le stockage en mémoire locale (<code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">express-rate-limit</code>) échoue en environnement cluster / load-balancer.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Implémenter un limiteur atomique sans race condition à l&apos;aide d&apos;un script Lua dans Redis (<code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">redisClient.eval</code>).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer les stratégies de limitation par adresse IP (avec <code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">trust proxy</code>) et par utilisateur authentifié (<code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">req.user.id</code>).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Choisir consciemment entre les politiques de résilience <strong>Fail-Open</strong> et <strong>Fail-Closed</strong> lors d&apos;une coupure Redis.</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que le Rate Limiting ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que le Rate Limiting ?
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Le <strong>Rate Limiting</strong> (ou bridage de débit) est un mécanisme de contrôle du trafic réseau qui restreint le nombre d&apos;opérations qu&apos;un client (identifié par son IP, son token JWT ou sa clé API) est autorisé à exécuter pendant une fenêtre temporelle donnée.
        </p>

        {/* Original Document Image */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-slate-950">
            <Image
              src="/images/cours/backend-ia/module-5/rate-limiter-flexible-code.jpg"
              alt="Rate Limiter configuration and dynamic throttling"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <p className="mt-3 text-xs sm:text-sm text-center text-slate-700 font-semibold">
            Figure 5.1 � Configuration flexible d&apos;un Rate Limiter modulaire gérant fenêtres d&apos;accès et compteurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Règle 1</span>
            <h3 className="font-bold text-slate-950 text-base mt-2">Volume Maximal</h3>
            <p className="text-sm text-slate-800 mt-1">Exemple : <strong>5 requêtes</strong> autorisées par cycle.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Règle 2</span>
            <h3 className="font-bold text-slate-950 text-base mt-2">Fenêtre Temporelle</h3>
            <p className="text-sm text-slate-800 mt-1">Exemple : période glissante ou fixe de <strong>60 secondes</strong>.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Règle 3</span>
            <h3 className="font-bold text-slate-950 text-base mt-2">Identifiant Unique</h3>
            <p className="text-sm text-slate-800 mt-1">Exemple : adresse IP cliente ou identifiant utilisateur <code className="font-mono text-xs">user:25</code>.</p>
          </div>
        </div>

        <Callout type="warning" title="Le code d'état HTTP 429 Too Many Requests">
          <p className="text-sm leading-relaxed text-amber-950">
            Défini dans la spécification <strong>RFC 6585</strong>, le code de statut <strong>429</strong> informe explicitement le client qu&apos;il a envoyé trop de requêtes dans un temps imparti. Une API professionnelle doit impérativement l&apos;accompagner de l&apos;en-tête standard <strong>Retry-After: &lt;secondes&gt;</strong> pour ordonner au client combien de temps attendre avant de retenter son appel.
          </p>
        </Callout>
      </section>

      {/* 3. Pourquoi protéger notre API Gemini ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Pourquoi protéger notre API d&apos;inférence IA ?
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Imaginons une application web React avec un bouton <em>&quot;Générer avec Gemini&quot;</em>. Un utilisateur impatient clique 10 fois d&apos;affilée, ou un robot explore votre endpoint public avec un script automatisé.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <div className="text-sm font-bold text-slate-950 uppercase tracking-wider">
            Flux comparé : Sans régulation vs Avec régulation Redis
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-4 text-xs font-mono text-slate-900 space-y-1">
              <div className="font-bold text-red-900 text-sm mb-2">�R Sans Rate Limiting</div>
              <p>Client -&gt; POST /api/generate (x10)</p>
              <p>Express -&gt; Déclenche 10 appels Gemini parallèles</p>
              <p className="text-red-700 font-bold">-&gt; Saturation CPU &amp; I/O Node.js</p>
              <p className="text-red-700 font-bold">-&gt; Dépassement de quota Google (HTTP 429 upstream)</p>
              <p className="text-red-700 font-bold">-&gt; Multiplication des coûts de facturation API</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-4 text-xs font-mono text-slate-900 space-y-1">
              <div className="font-bold text-emerald-900 text-sm mb-2">�S& Avec Rate Limiting Redis</div>
              <p>Client -&gt; POST /api/generate</p>
              <p>Middleware -&gt; Interroge Redis (Script Lua atomique)</p>
              <p className="text-emerald-800 font-bold">1 à 5 -&gt; Requête autorisée -&gt; Inférence Gemini</p>
              <p className="text-emerald-800 font-bold">6+ -&gt; Rejet immédiat en 0.5ms -&gt; HTTP 429</p>
              <p className="text-emerald-900 font-extrabold">-&gt; Serveur et budget préservés à 100%</p>
            </div>
          </div>
        </div>

        <Callout type="note" title="Rate Limiting vs Authentification">
          <p className="text-sm leading-relaxed text-slate-900">
            Le Rate Limiting ne remplace pas l&apos;authentification. L&apos;authentification répond à la question : <em>&quot;Qui est l&apos;utilisateur ?&quot;</em> tandis que le Rate Limiting répond à : <em>&quot;ì quelle fréquence cet acteur utilise-t-il les ressources ?&quot;</em>. Les deux doivent coexister.
          </p>
        </Callout>
      </section>

      {/* 4. Limites de la mémoire locale & cluster Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La faiblesse d&apos;express-rate-limit en mémoire locale
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Le package standard <code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">express-rate-limit</code> stocke par défaut ses compteurs dans la mémoire RAM vive de l&apos;unique processus Node.js. En architecture de production avec équilibrage de charge (Load Balancer, Kubernetes ou PM2 cluster), cette approche présente deux failles critiques :
        </p>

        <ul className="space-y-2 list-disc list-inside text-base text-slate-900 pl-2">
          <li>
            <strong>Perte d&apos;état lors des redémarrages :</strong> chaque déploiement ou crash efface tous les compteurs, réinitialisant les quotas des attaquants.
          </li>
          <li>
            <strong>Compteurs cloisonnés (Multi-instances) :</strong> si un client a une limite de 5 req/min et que vous avez 4 instances Node.js derrière NGINX, il peut envoyer 20 requêtes sans jamais se faire bloquer si le répartiteur alterne les requêtes en Round-Robin.
          </li>
        </ul>

        <div className="rounded-xl border border-slate-300 bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto leading-relaxed">
          <div className="text-emerald-400 font-bold mb-2">{'// Problème de la mémoire locale multi-processus :'}</div>
          <p>Navigateur Client ---&gt; Load Balancer (Round-Robin)</p>
          <p className="pl-24">�S���� Instance Node A (RAM: req 1, 3, 5 =&gt; 3 reqs &lt; 5 OK)</p>
          <p className="pl-24">����� Instance Node B (RAM: req 2, 4, 6 =&gt; 3 reqs &lt; 5 OK)</p>
          <p className="text-rose-400 mt-1">Total reçu = 6 requêtes ! La limite de 5 a été contournée.</p>
          <div className="text-emerald-400 font-bold mt-4 mb-2">{'// Solution Redis partagé :'}</div>
          <p>Instance Node A \</p>
          <p className="pl-16">===&gt; Redis centralisé (Key: rate-limit:IP =&gt; Count: 6 &gt; 5) ===&gt; 429 REJET</p>
          <p>Instance Node B /</p>
        </div>
      </section>

      {/* 5. Le script Lua atomique dans Redis */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation haute performance : Le script Lua atomique
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Pourquoi ne peut-on pas simplement écrire en JavaScript : <code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">await redis.incr(key); await redis.expire(key, 60);</code> ?
        </p>

        <Callout type="danger" title="La Race Condition de l'INCR/EXPIRE non atomique">
          <p className="text-sm leading-relaxed text-amber-950">
            Si votre serveur Node.js plante, est tué par l&apos;orchestrateur ou perd sa connexion réseau exactement <strong>entre</strong> l&apos;appel <code className="font-mono">INCR</code> et l&apos;appel <code className="font-mono">EXPIRE</code>, la clé restera <strong>sans aucune date d&apos;expiration</strong> (TTL = -1). L&apos;utilisateur sera alors bloqué définitivement pour l&apos;éternité !
          </p>
        </Callout>

        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Pour garantir une atomicité mathématique absolue, nous confions l&apos;exécution à un script Lua évalué à l&apos;intérieur du moteur monothread de Redis :
        </p>

        <CodeBlock
          filename="rateLimiter.js"
          language="javascript"
          code={`// Middleware de Rate Limiting distribué avec Redis et script Lua
function createRedisRateLimiter(redisClient, options = {}) {
  const {
    windowSeconds = 60,
    maxRequests = 5,
    keyPrefix = "rate-limit"
  } = options;

  // Script Lua exécuté de manière 100% atomique par Redis
  const script = \`
    local count = redis.call("INCR", KEYS[1])
    if count == 1 then
      redis.call("EXPIRE", KEYS[1], ARGV[1])
    end
    local ttl = redis.call("TTL", KEYS[1])
    return {count, ttl}
  \`;

  return async function rateLimiterMiddleware(req, res, next) {
    try {
      // Identifier fiable : req.user.id pour les utilisateurs connectés, ou IP cliente
      const identifier = req.user?.id ? \`user:\${req.user.id}\` : \`ip:\${req.ip}\`;
      const key = \`\${keyPrefix}:\${identifier}\`;

      // Exécution atomique
      const result = await redisClient.eval(script, {
        keys: [key],
        arguments: [String(windowSeconds)]
      });

      const count = Number(result[0]);
      const ttl = Number(result[1]);
      const remaining = Math.max(0, maxRequests - count);

      // En-têtes standards IETF RateLimit
      res.setHeader("RateLimit-Limit", maxRequests);
      res.setHeader("RateLimit-Remaining", remaining);
      res.setHeader("RateLimit-Reset", Math.max(0, ttl));

      // Dépassement de quota ?
      if (count > maxRequests) {
        res.setHeader("Retry-After", Math.max(1, ttl));
        return res.status(429).json({
          success: false,
          error: "Too Many Requests",
          message: "Quota de requêtes dépassé. Veuillez patienter.",
          limit: maxRequests,
          retryAfterSeconds: Math.max(1, ttl)
        });
      }

      // Requête autorisée
      next();
    } catch (error) {
      console.error("[RateLimiter] Erreur Redis :", error);
      
      // POLITIQUE DE R�0SILIENCE : Fail-Closed pour les API IA coûteuses
      // (bloque la requête plutôt que de risquer une surconsommation financière)
      return res.status(503).json({
        success: false,
        error: "Service Unavailable",
        message: "Service de régulation temporairement indisponible."
      });
    }
  };
}

module.exports = createRedisRateLimiter;`}
        />
      </section>

      {/* 6. Analyse comparative des stratégies de Rate Limiting */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Panorama &amp; analyse comparative des stratégies de limitation
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Le script précédent met en �uvre la méthode <strong>Fixed Window</strong> (Fenêtre Fixe). Il existe cependant quatre grands algorithmes industriels dont les compromis entre précision, mémoire et lissage de charge varient sensiblement.
        </p>

        {/* Custom High-Resolution Analytical SVG */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-80 sm:h-96 md:h-[450px] rounded-xl overflow-hidden bg-slate-950">
            <Image
              src="/images/cours/backend-ia/module-5/rate-limiting-strategies-analysis.svg"
              alt="Analyse comparative des stratégies de Rate Limiting (Fixed Window, Sliding Window, Token Bucket, Leaky Bucket)"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
          </div>
          <p className="mt-3 text-xs sm:text-sm text-center text-slate-700 font-semibold">
            Figure 5.2 � Analyse comparative des 4 algorithmes de régulation : débit crête, tolérance aux rafales et empreinte mémoire.
          </p>
        </div>

        {/* Original Document Images: Fixed Window & Leaky Bucket */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-5/fixed-window-rate-limiting.jpg"
                alt="Fixed Window Rate Limiting Diagram"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-center text-slate-700 font-semibold">
              Figure 5.3 � Fixed Window : reset à heure fixe provoquant l&apos;effet de bord 2x limite à la charnière.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-5/leaky-bucket-rate-limiting.jpg"
                alt="Leaky Bucket Rate Limiting Diagram"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-center text-slate-700 font-semibold">
              Figure 5.4 � Leaky Bucket : lissage d&apos;un flux désordonné en un débit de sortie parfaitement constant.
            </p>
          </div>
        </div>

        {/* Tableau comparatif synthétique */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-900 border-collapse">
            <thead className="bg-slate-100 text-slate-950 font-black border-b border-slate-300">
              <tr>
                <th className="p-3">Algorithme</th>
                <th className="p-3">Principe</th>
                <th className="p-3">Rafales (Burst)</th>
                <th className="p-3">Mémoire Redis</th>
                <th className="p-3">Cas d&apos;usage IA idéal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              <tr className="bg-white">
                <td className="p-3 font-bold text-slate-950">Fixed Window</td>
                <td className="p-3">Compteur réinitialisé toutes les N secondes</td>
                <td className="p-3 text-amber-700 font-bold">Faible (pic charnière x2)</td>
                <td className="p-3 text-emerald-700 font-bold">Minimale (1 clé string)</td>
                <td className="p-3">Prototypes, APIs publiques simples, contact</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 font-bold text-slate-950">Sliding Window Counter</td>
                <td className="p-3">Pondération entre fenêtre passée et actuelle</td>
                <td className="p-3 text-emerald-700 font-bold">Très bon lissage</td>
                <td className="p-3 text-emerald-700 font-bold">Très faible (2 compteurs)</td>
                <td className="p-3">Endpoints d&apos;inférence Gemini standard</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-bold text-slate-950">Token Bucket</td>
                <td className="p-3">Seau ravitaillé en continu à taux fixe</td>
                <td className="p-3 text-emerald-700 font-bold">Excellente (consomme réserve)</td>
                <td className="p-3 text-slate-700">Faible (tokens + timestamp)</td>
                <td className="p-3">Utilisateurs premium avec pics d&apos;activité ponctuels</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 font-bold text-slate-950">Leaky Bucket</td>
                <td className="p-3">File FIFO vidée à cadence rigide</td>
                <td className="p-3 text-slate-600">Rejet si la file déborde</td>
                <td className="p-3 text-amber-700">Moyenne (file Redis LIST)</td>
                <td className="p-3">Génération d&apos;embeddings par batchs régulés</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Serveur Express Complet avec Gemini */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Assemblage complet : Serveur Express, Redis et Gemini
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Voici le serveur prêt pour la production intégrant le client officiel <code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">@google/genai</code>, la configuration de l&apos;adresse IP avec <code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono">trust proxy</code> et la régulation granulaire par route :
        </p>

        <CodeBlock
          filename="server.js"
          language="javascript"
          code={`const express = require("express");
const dotenv = require("dotenv");
const { createClient } = require("redis");
const { GoogleGenAI } = require("@google/genai");
const createRedisRateLimiter = require("./rateLimiter");

dotenv.config();

const app = express();
app.use(express.json());

// Crucial si l'application est derrière NGINX, Cloudflare ou AWS ALB :
// permet à Express de lire la véritable IP cliente via X-Forwarded-For
app.set("trust proxy", 1);

// 1. Initialisation Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY_GEMINI
});

// 2. Client Redis distribué
const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});
redisClient.on("error", (err) => console.error("[Redis Error]", err));

// 3. Définition de Rate Limiters distincts selon la sensibilité
const geminiLimiter = createRedisRateLimiter(redisClient, {
  windowSeconds: 60,
  maxRequests: 5,
  keyPrefix: "gemini-limit"
});

const contactLimiter = createRedisRateLimiter(redisClient, {
  windowSeconds: 60,
  maxRequests: 3,
  keyPrefix: "contact-limit"
});

// Route publique générale (non bridée ou bridage léger)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Route formulaire de contact protégée
app.post("/api/contact", contactLimiter, (req, res) => {
  res.json({ success: true, message: "Message transmis avec succès." });
});

// Route d'inférence IA sous haute protection (5 req / minute)
app.post("/api/generate", geminiLimiter, async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ success: false, message: "Le champ prompt est obligatoire." });
    }

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt.trim()
    });

    res.json({
      success: true,
      text: interaction.output_text
    });
  } catch (error) {
    console.error("[Gemini API Error]", error);
    res.status(500).json({ success: false, message: "�0chec de génération Gemini." });
  }
});

// Démarrage coordonné
async function bootstrap() {
  try {
    await redisClient.connect();
    console.log("Connecté à Redis avec succès.");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(\`Serveur Backend IA opérationnel sur http://localhost:\${PORT}\`);
    });
  } catch (error) {
    console.error("Impossible d'initialiser le serveur :", error);
    process.exit(1);
  }
}

bootstrap();`}
        />
      </section>

      {/* 8. Simulateur Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Laboratoire interactif : Test du Rate Limiting en temps réel
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Expérimentez le comportement du compteur Redis avec le simulateur ci-dessous. Observez l&apos;incrémentation des requêtes, le déclenchement immédiat de l&apos;erreur <strong>HTTP 429</strong> dès la 6�0 tentative, et la mise à jour des en-têtes <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">Retry-After</code> :
        </p>
        <RedisCacheRateLimitLab initialTab="rateLimit" />
      </section>

      {/* 9. Protocole de test Postman & curl */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Validation pratique avec curl et Postman
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Pour vérifier que votre middleware applique correctement la norme IETF, lancez une boucle d&apos;appels en console PowerShell :
        </p>

        <CodeBlock
          filename="test-rate-limit.ps1"
          language="powershell"
          code={`# Simulation de 7 requêtes consécutives vers l'API
1..7 | ForEach-Object {
    Write-Host "--- Envoi requête $_ ---" -ForegroundColor Cyan
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/api/generate" \`
            -Method Post \`
            -Headers @{ "Content-Type" = "application/json" } \`
            -Body '{"prompt": "Explique le fonctionnement du Rate Limiting."}'
        Write-Host "Succès (HTTP 200) : Réponse reçue" -ForegroundColor Green
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Blocage détecté ! Code HTTP : $statusCode" -ForegroundColor Red
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Corps de l'erreur : $($reader.ReadToEnd())" -ForegroundColor Yellow
    }
    Start-Sleep -Milliseconds 200
}`}
        />

        <div className="rounded-xl border border-slate-300 bg-slate-950 p-4 font-mono text-xs text-slate-100 space-y-1">
          <div className="text-slate-400">{'// Sortie attendue dans la console :'}</div>
          <div className="text-emerald-400">--- Envoi requête 1 --- =&gt; Succès (HTTP 200) [Remaining: 4]</div>
          <div className="text-emerald-400">--- Envoi requête 2 --- =&gt; Succès (HTTP 200) [Remaining: 3]</div>
          <div className="text-emerald-400">--- Envoi requête 3 --- =&gt; Succès (HTTP 200) [Remaining: 2]</div>
          <div className="text-emerald-400">--- Envoi requête 4 --- =&gt; Succès (HTTP 200) [Remaining: 1]</div>
          <div className="text-emerald-400">--- Envoi requête 5 --- =&gt; Succès (HTTP 200) [Remaining: 0]</div>
          <div className="text-rose-400 font-bold">--- Envoi requête 6 --- =&gt; Blocage détecté ! Code HTTP : 429</div>
          <div className="text-amber-300 pl-4">{`{"success":false,"error":"Too Many Requests","limit":5,"retryAfterSeconds":58}`}</div>
        </div>
      </section>

      {/* 10. Travaux Pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Travaux Pratiques � Exercices d&apos;application
        </h2>

        <PracticalWork
          title="TP 1 : Limiteur strict à 3 requêtes / 30 secondes"
          objective="Ajustez les paramètres de votre fonction createRedisRateLimiter pour imposer une fenêtre ultra-stricte de 3 requêtes toutes les 30 secondes sur un endpoint d'analyse de documents volumineux."
          duration="45 min"
          steps={[
            "Instanciez documentLimiter avec { windowSeconds: 30, maxRequests: 3, keyPrefix: 'doc-limit' }.",
            "Ajoutez la route POST /api/analyze-doc avec ce middleware.",
            "Lancez 4 requêtes dans Postman et vérifiez que la 4�0 requête retourne le code 429 avec un Retry-After inférieur ou égal à 30.",
            "Inspectez avec redis-cli la clé générée : ttl doc-limit:ip:127.0.0.1 pour voir le compte à rebours décroître."
          ]}
        />

        <PracticalWork
          title="TP 2 : Différenciation des tiers (Freemium vs Premium)"
          objective="Faites évoluer le middleware pour lire req.user.tier (free ou premium) et appliquer dynamiquement 5 req/min ou 50 req/min."
          duration="1 h"
          steps={[
            "Créez un middleware fictif authSimulator plaçant req.user = { id: 'usr_42', tier: 'premium' }.",
            "Modifiez la signature du limiter pour accepter une fonction de résolution dynamique : const maxRequests = req.user?.tier === 'premium' ? 50 : 5;",
            "Injectez req.user.id dans le nom de clé Redis : key = `gemini-limit:user:${req.user.id}`.",
            "Validez que deux utilisateurs distincts disposent chacun de leur propre réservoir de requêtes indépendant."
          ]}
        />
      </section>

      {/* 11. Quiz d'évaluation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          11. Quiz de validation des acquis
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel code d'état HTTP indique formellement qu'un client a dépassé son quota de requêtes autorisées ?",
              options: [
                "400 Bad Request",
                "403 Forbidden",
                "429 Too Many Requests",
                "503 Service Unavailable"
              ],
              correctIndex: 2,
              explanation: "Le code HTTP 429 (Too Many Requests), introduit par la RFC 6585, est spécifiquement réservé au Rate Limiting."
            },
            {
              id: 2,
              question: "Pourquoi est-il risqué d'exécuter INCR puis EXPIRE comme deux commandes Redis distinctes en JavaScript ?",
              options: [
                "Parce que Redis bloque l'exécution des requêtes GET pendant ce temps",
                "En cas de coupure réseau ou de crash entre les deux commandes, la clé n'aura aucun TTL et persistera indéfiniment",
                "Parce qu'Express ne supporte pas deux opérations asynchrones consécutives",
                "Parce que le TTL est écrasé à chaque appel GET"
              ],
              correctIndex: 1,
              explanation: "Une absence d'atomicité crée une race condition critique : si le processus meurt avant EXPIRE, la clé n'expirera jamais et l'utilisateur reste bloqué."
            },
            {
              id: 3,
              question: "Quel en-tête HTTP informe le client du nombre de secondes exact à attendre avant de réémettre une requête ?",
              options: [
                "X-Wait-Time",
                "Retry-After",
                "RateLimit-Reset-Epoch",
                "Authorization-Timeout"
              ],
              correctIndex: 1,
              explanation: "L'en-tête standard 'Retry-After' (spécifié en secondes ou en date HTTP) indique au client quand il peut réessayer."
            },
            {
              id: 4,
              question: "Quel est le problème majeur d'un Rate Limiter basé sur la mémoire RAM interne de Node.js en production ?",
              options: [
                "La RAM de Node.js est trop lente comparée à un disque SSD",
                "Les compteurs ne sont pas partagés entre les différentes instances d'un cluster ou derrière un Load Balancer",
                "Node.js interdit formellement de stocker des entiers en mémoire vive",
                "Express nécessite obligatoirement un serveur MySQL pour démarrer"
              ],
              correctIndex: 1,
              explanation: "Chaque processus Node.js possède son propre espace mémoire : un client alternant ses requêtes entre les instances peut contourner la limite fixée."
            },
            {
              id: 5,
              question: "Quelle est la principale différence entre la stratégie Fixed Window et Token Bucket ?",
              options: [
                "Fixed Window nécessite 10 Go de RAM alors que Token Bucket est sans état",
                "Token Bucket permet d'absorber de légères pointes de trafic (rafales) tout en maintenant un débit moyen constant",
                "Fixed Window ne fonctionne qu'avec PostgreSQL",
                "Token Bucket ne s'applique qu'aux requêtes GET"
              ],
              correctIndex: 1,
              explanation: "Token Bucket stocke des jetons régénérés en continu, permettant à un utilisateur d'effectuer une rafale temporaire sans être rejeté."
            },
            {
              id: 6,
              question: "En cas d'indisponibilité totale du cluster Redis, que signifie une politique 'Fail-Closed' ?",
              options: [
                "Laisser passer toutes les requêtes sans aucun contrôle pour privilégier l'expérience utilisateur",
                "Bloquer préventivement les requêtes (ex: HTTP 503) pour protéger l'API IA et éviter l'explosion des coûts",
                "Redémarrer immédiatement le serveur Node.js",
                "Supprimer automatiquement la base de données SQL"
              ],
              correctIndex: 1,
              explanation: "Fail-Closed privilégie la sécurité et la maîtrise des coûts financiers en refusant l'accès tant que le mécanisme de bridage n'est pas opérationnel."
            }
          ]}
        />
      </section>

      {/* 12. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          12. Checklist de fin de chapitre
        </h2>
        <InteractiveChecklist
          items={[
            "J'ai configuré app.set('trust proxy', 1) pour lire correctement l'IP cliente derrière un reverse proxy.",
            "J'ai compris l'utilité d'un script Lua atomique pour coupler INCR et EXPIRE sans race condition.",
            "Mon API renvoie bien le code HTTP 429 et l'en-tête Retry-After lors d'un dépassement de quota.",
            "J'ai séparé mes clés Redis avec des préfixes clairs (ex: gemini-limit: et contact-limit:).",
            "J'ai testé et validé la réinitialisation automatique du compteur après expiration du TTL avec Postman / curl.",
            "J'ai statué en conscience sur la politique en cas de panne Redis (Fail-Closed pour protéger le budget IA)."
          ]}
        />
      </section>

      {/* 13. Bilan Final du Module 5 */}
      <section className="rounded-3xl border-2 border-slate-900 bg-slate-950 text-white p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm uppercase tracking-wider">
          <Icon name="check" className="w-5 h-5 text-emerald-400" />
          <span>Félicitations ⬢ Module 5 achevé</span>
        </div>
        <h2 className="text-[19px] font-bold tracking-tight text-white">
          Bilan du Module 5 : Cache, Redis &amp; Gestion des performances
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          Vous disposez désormais d&apos;une boîte à outils d&apos;ingénierie backend complète pour exploiter l&apos;IA de manière scalable et rentable :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm pt-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
            <span className="text-emerald-400 font-bold">Chapitre 1 :</span> Principes du Cache-Aside, réduction de 90%+ de la latence, économie des tokens.
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
            <span className="text-emerald-400 font-bold">Chapitre 2 :</span> Déploiement Redis Docker, commandes primitives rapides, connexion Node.js.
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
            <span className="text-emerald-400 font-bold">Chapitre 3 :</span> TTL dynamique (<code className="font-mono text-xs">SET EX</code>) et invalidation proactive sur mutations SQL.
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
            <span className="text-emerald-400 font-bold">Chapitre 4 :</span> Hash SHA-256 déterministe, parade au Cache Stampede, isolation par utilisateur.
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 sm:col-span-2 md:col-span-2">
            <span className="text-emerald-400 font-bold">Chapitre 5 :</span> Rate Limiting distribué avec Redis Lua, gestion des codes HTTP 429 et protection anti-abus.
          </div>
        </div>
      </section>
    </div>
  );
};
