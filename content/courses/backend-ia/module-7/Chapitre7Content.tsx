'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Optimisation des performances avec Redis
        </h1>
      </div>

      {/* 1. Objectifs du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Chaque appel à Gemini coûte des jetons d&apos;API et engendre une latence réseau. Nous allons intégrer Redis pour mettre en cache les résultats récurrents et protéger nos quotas par Rate Limiting.
        </p>
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            À la fin de ce chapitre, vous serez capable de :
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Comprendre le fonctionnement et la stratégie du cache mémoire.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Déployer et tester Redis en local ou via Docker.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Maîtriser les commandes SET, GET et les expirations TTL.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Mettre en cache les résultats IA avec hachage SHA-256.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Implémenter un Rate Limiting robuste avec express-rate-limit.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Mesurer les gains spectaculaires de latence (2 ms vs 2 000 ms).</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Pourquoi un cache */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Pourquoi utiliser un cache ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
            <h3 className="font-bold text-rose-950 text-sm">Sans cache (10 utilisateurs identiques)</h3>
            <p className="text-xs text-slate-700">10 appels Gemini payants, 10 fois la latence complète (~15 à 30 secondes au total).</p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
            <h3 className="font-bold text-emerald-950 text-sm">Avec cache Redis (Cache-Aside)</h3>
            <p className="text-xs text-slate-700">1 seul appel Gemini, les 9 suivants sont servis depuis la RAM en moins de 2 ms !</p>
          </div>
        </div>
      </section>

      {/* 3. Comprendre Redis */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comprendre Redis face à MySQL
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Critère</th>
                <th className="py-2.5 px-4">MySQL</th>
                <th className="py-2.5 px-4">Redis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Type de stockage</td>
                <td className="py-2 px-4">Relationnel sur disque (Persistant)</td>
                <td className="py-2 px-4 font-bold text-amber-700">Clé-valeur en mémoire RAM (Ultra-rapide)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Usage principal</td>
                <td className="py-2 px-4">Historique, comptes, intégrité ACID</td>
                <td className="py-2 px-4 font-bold text-amber-700">Cache de réponses IA, rate limiting, sessions</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Vitesse d&apos;accès</td>
                <td className="py-2 px-4">~5 à 20 ms</td>
                <td className="py-2 px-4 font-bold text-emerald-700">&lt; 1 à 2 ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Installer Redis */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Déployer Redis avec Docker
        </h2>
        <CodeBlock
          filename="Lancement Docker"
          language="bash"
          code={`docker run -d --name redis-ai -p 6379:6379 redis:latest
docker exec -it redis-ai redis-cli PING
# Réponse attendue : PONG`}
        />
      </section>

      {/* 5. Client Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Installer le client Redis dans Node.js
        </h2>
        <CodeBlock
          filename="Installation npm & .env"
          language="bash"
          code={`npm install redis`}
        />
        <CodeBlock
          filename="backend/src/cache/redis.ts"
          language="typescript"
          code={`import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("error", (error) => console.error("Erreur Redis :", error));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Connecté à Redis avec succès");
  }
}`}
        />
      </section>

      {/* 6. Service de cache */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Service de cache avec expiration TTL
        </h2>
        <CodeBlock
          filename="backend/src/cache/cache.service.ts"
          language="typescript"
          code={`import { redisClient } from "./redis.js";

export async function getCache(key: string): Promise<string | null> {
  return await redisClient.get(key);
}

export async function setCache(key: string, value: string, ttlSeconds = 3600) {
  await redisClient.set(key, value, { EX: ttlSeconds });
}`}
        />
      </section>

      {/* 7. Mettre en cache les résultats Gemini */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Mettre en cache les analyses avec empreinte SHA-256
        </h2>
        <CodeBlock
          filename="backend/src/services/gemini.service.ts (avec cache)"
          language="typescript"
          code={`import { createHash } from "node:crypto";
import { ai, GEMINI_MODEL } from "../config/gemini.js";
import { getCache, setCache } from "../cache/cache.service.js";

export async function generateAnalysis(prompt: string): Promise<string> {
  const normalizedPrompt = prompt.trim();
  const hash = createHash("sha256")
    .update(\`\${GEMINI_MODEL}:\${normalizedPrompt}\`)
    .digest("hex");
  const cacheKey = \`analysis:\${hash}\`;

  const cachedResult = await getCache(cacheKey);
  if (cachedResult) {
    console.log("CACHE HIT : résultat retourné depuis Redis");
    return cachedResult;
  }

  console.log("CACHE MISS : appel à l'API Gemini");
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: normalizedPrompt
  });

  const result = response.text ?? "";
  await setCache(cacheKey, result, 3600); // 1 heure de TTL
  return result;
}`}
        />
      </section>

      {/* 8. Rate Limiting */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Sécurisation des quotas avec le Rate Limiting
        </h2>
        <CodeBlock
          filename="Installation & Middleware"
          language="bash"
          code={`npm install express-rate-limit`}
        />
        <CodeBlock
          filename="backend/src/middlewares/rateLimit.middleware.ts"
          language="typescript"
          code={`import { rateLimit } from "express-rate-limit";

export const analysisLimiter = rateLimit({
  windowMs: 60 * 1000, // Fenêtre d'1 minute
  limit: 10,           // 10 requêtes max par IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Trop de requêtes. Veuillez patienter une minute." }
});`}
        />
      </section>

      {/* 9. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Travaux pratiques
        </h2>
        <PracticalWork
          title="Accélération Redis et protection Rate Limit"
          objective="Mesurer la chute du temps de réponse et valider le blocage HTTP 429."
          duration="45 min"
          steps={[
            "Démarrez le conteneur Redis et validez avec redis-cli PING.",
            "Ajoutez connectRedis() au démarrage de votre app Express.",
            "Testez un premier appel (Cache Miss) puis renvoyez le même prompt : constatez le passage de 2 500 ms à 3 ms (Cache Hit).",
            "Envoyez plus de 10 requêtes rapides et validez le refus avec le code HTTP 429.",
            "Exercice supplémentaire : Créez une route DELETE /api/cache/:key pour invalider une clé de cache à la demande."
          ]}
        />
      </section>

      {/* 10. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Synthèse
        </h2>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-2 text-sm text-slate-900 font-medium">
          <p>⬢ Redis stocke les données en mémoire vive pour des accès quasi instantanés.</p>
          <p>⬢ Le hash SHA-256 produit des clés de cache déterministes et uniques.</p>
          <p>⬢ Le TTL libère automatiquement la RAM et renouvelle les réponses obsolètes.</p>
          <p>⬢ Le Rate Limiting protège l&apos;API contre les abus et les surcoûts d&apos;API.</p>
        </div>
      </section>
    </div>
  );
};

