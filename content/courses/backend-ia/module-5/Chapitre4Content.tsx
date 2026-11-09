'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { RedisCacheRateLimitLab } from '@/components/interactive/RedisCacheRateLimitLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Mise en cache des résultats d&apos;inférence de Google Gemini
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
            <span>Comprendre pourquoi le texte brut du prompt est insuffisant comme clé de cache.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Générer une empreinte SHA-256 intégrant prompt, modèle, instructions et paramètres.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer les réponses publiques mutualisables des analyses privées nécessitant une isolation.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre et prévenir le problème d&apos;avalanche de requêtes (Cache Stampede).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Implémenter un fallback gracieux : l&apos;API continue de répondre même si Redis est momentanément inaccessible.</span>
          </li>
        </ul>
      </section>

      {/* 2. Pourquoi utiliser SHA-256 pour construire la clé de cache ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Construction d&apos;une clé de cache déterministe avec SHA-256
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Un prompt utilisateur peut contenir 15 000 caractères, des retours à la ligne et des caractères spéciaux. Il est impossible d&apos;utiliser directement ce texte brut comme clé Redis.
        </p>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Les 5 paramètres indispensables d&apos;une clé d&apos;inférence IA :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <strong className="text-indigo-900 block font-black">1. Prompt normalisé</strong>
              Le texte nettoyé avec <code>trim()</code> pour éviter les espaces parasites.
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <strong className="text-indigo-900 block font-black">2. Identifiant du Modèle</strong>
              Ex: <code>gemini-2.5-flash</code> vs <code>gemini-1.5-pro</code>.
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <strong className="text-indigo-900 block font-black">3. Instruction Système</strong>
              Toute modification du persona système change la réponse du LLM.
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <strong className="text-indigo-900 block font-black">4. Paramètres de génération</strong>
              La température (0.2 déterministe vs 0.9 créatif).
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <strong className="text-indigo-900 block font-black">5. Version logique (ex: &apos;v1&apos;)</strong>
              Permet d&apos;invalider en bloc tout le cache en passant à &apos;v2&apos;.
            </div>
            <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-rose-950">
              <strong className="text-rose-900 block font-black">6. Contexte utilisateur</strong>
              Indispensable si le document ou la discussion est privée !
            </div>
          </div>
        </div>

        <CodeBlock
          language="javascript"
          filename="generate_cache_key.js"
          code={`const crypto = require('crypto');

function buildAiCacheKey({ prompt, model, systemInstruction, temperature = 0.7, userId = null }) {
  const payload = {
    v: 'v1',
    prompt: prompt.trim(),
    model,
    systemInstruction,
    temperature,
    // Si la réponse est privée, injecter l'id utilisateur dans le hash !
    userId: userId || 'public',
  };

  // Calcul d'un hash SHA-256 de longueur fixe (64 caractères hexadécimaux)
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(payload))
    .digest('hex');

  return \`ai:response:\${hash}\`;
}`}
        />
      </section>

      {/* 3. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Expérimentation en direct : Générateur d&apos;empreinte SHA-256
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Ouvrez l&apos;onglet <strong>&quot;Clé SHA-256&quot;</strong> pour voir l&apos;empreinte se recalculer à la moindre variation de paramètre :
        </p>
        <RedisCacheRateLimitLab />
      </section>

      {/* 4. Le phénomène du Cache Stampede (Thundering Herd) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Comprendre et parer le Cache Stampede (Thundering Herd)
        </h2>
        <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5 space-y-3">
          <h3 className="text-base font-black text-rose-950 flex items-center gap-2">
            <Icon name="alert-triangle" className="w-5 h-5 text-rose-700" />
            Qu&apos;est-ce que le Cache Stampede ?
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
            Imaginez qu&apos;une clé très populaire (ex: le résumé du jour généré par Gemini) expire à 12:00:00 pile. ì cet instant précis, <strong>200 utilisateurs envoient une requête en même temps</strong>. Constatant tous un Cache Miss, les 200 processus Node.js déclenchent simultanément 200 appels identiques vers Google Gemini.
          </p>
          <div className="rounded-xl border border-rose-300 bg-white p-3 font-mono text-xs text-rose-900">
            Conséquence : Explosion instantanée des quotas d&apos;API, pic de latence et facturation abusive pour un calcul strictement identique.
          </div>
        </div>

        <Callout type="tip" title="Solutions pour neutraliser le Cache Stampede">
          Pour éliminer ce risque sur les fortes charges :
          <br /><strong>A. Verrou distribué Redis (Mutex) :</strong> Le premier worker qui détecte le Cache Miss pose un verrou temporaire (<code>SET lock:key token NX EX 5</code>). Les 199 autres attendent 200 ms que le premier ait peuplé le cache au lieu d&apos;appeler Gemini.
          <br /><strong>B. Pré-calcul en arrière-plan :</strong> Un cron Node.js régénère le résultat 30 secondes avant son expiration effective.
        </Callout>
      </section>

      {/* 5. Implémentation complète Express + Redis + Gemini */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Serveur d&apos;inférence complet avec résilience et fallback
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Ce code de production implémente le pattern Cache-Aside avec le SDK officiel <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">@google/genai</code> et gère l&apos;indisponibilité momentanée de Redis sans bloquer l&apos;utilisateur :
        </p>

        <CodeBlock
          language="javascript"
          filename="server-gemini-cache.js"
          code={`const express = require('express');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { createClient } = require('redis');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express();
app.use(express.json());

// 1. Initialiser le client Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY_GEMINI,
});

const MODEL = 'gemini-2.5-flash';
const SYSTEM_INSTRUCTION = 'Tu es un formateur expert en architecture Backend et IA. Sois concis et technique.';
const CACHE_TTL_SECONDS = 300; // 5 minutes de mise en cache

// 2. Initialiser Redis avec gestion de reconnexion
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});
redisClient.on('error', (err) => console.error('[Redis Error]', err.message));

// Fonction déterministe de hashage SHA-256
function computeCacheKey(prompt) {
  const payload = {
    v: 'v1',
    prompt: prompt.trim(),
    model: MODEL,
    systemInstruction: SYSTEM_INSTRUCTION,
  };
  const hash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  return \`ai:response:\${hash}\`;
}

// Route d'inférence avec Cache-Aside et fallback gracieux
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ success: false, message: 'Le prompt est obligatoire.' });
  }

  const cleanPrompt = prompt.trim();
  const cacheKey = computeCacheKey(cleanPrompt);
  let cachedResponse = null;

  // ÉTAPE 1 : Consultation du cache Redis (avec tolérance aux pannes)
  try {
    cachedResponse = await redisClient.get(cacheKey);
  } catch (redisReadErr) {
    console.warn('[Redis] Lecture impossible, bascule directe sur Gemini:', redisReadErr.message);
  }

  // ÉTAPE 2 : Si CACHE HIT -> Réponse immédiate en 2 millisecondes !
  if (cachedResponse !== null) {
    console.log('[Cache HIT] Inférence servie depuis Redis RAM');
    return res.json({
      success: true,
      source: 'Redis Cache (0 token consommé)',
      data: JSON.parse(cachedResponse),
    });
  }

  // ÉTAPE 3 : Si CACHE MISS -> Inférence auprès de Google Gemini
  console.log('[Cache MISS] Sollicitation du modèle Google Gemini...');
  try {
    const interaction = await ai.interactions.create({
      model: MODEL,
      input: cleanPrompt,
      system_instruction: SYSTEM_INSTRUCTION,
    });

    const outputText = interaction.output_text;
    if (!outputText) throw new Error('Aucun texte produit par Gemini');

    // ÉTAPE 4 : Écriture dans Redis avec TTL de 300 secondes
    try {
      await redisClient.set(cacheKey, JSON.stringify(outputText), { EX: CACHE_TTL_SECONDS });
      console.log(\`[Cache] Réponse mise en cache avec succès pour 300s (clé: \${cacheKey.slice(0, 24)}...)\`);
    } catch (redisWriteErr) {
      console.warn('[Redis] Écriture impossible:', redisWriteErr.message);
    }

    // ÉTAPE 5 : Renvoyer le texte frais à l'utilisateur
    res.json({
      success: true,
      source: 'Google Gemini (Nouveaux tokens générés)',
      data: outputText,
    });
  } catch (geminiErr) {
    console.error('Erreur inférence Gemini:', geminiErr);
    res.status(500).json({ success: false, message: 'Erreur lors du traitement par le modèle d\\'IA' });
  }
});

async function main() {
  await redisClient.connect();
  app.listen(3000, () => console.log('API Gemini + Cache active sur http://localhost:3000'));
}
main();`}
        />
      </section>

      {/* 6. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Mesure du banc d'essai et inspection des clés de hash"
        objective="Tester l'endpoint /api/generate avec Postman, chronométrer l'écart entre le premier appel (Cache Miss) et le second (Cache Hit), et inspecter les clés dans redis-cli."
        steps={[
          "Lancer le serveur Node.js avec votre clé API_KEY_GEMINI configurée.",
          "Envoyer une première requête dans Postman avec { prompt: 'Explique Node.js' } et constater la durée (~1 800 ms).",
          "Renvoyer immédiatement la même requête et observer la chute à ~4 ms avec source: Redis Cache.",
          "Ouvrir redis-cli et exécuter SCAN 0 MATCH ai:response:* COUNT 10 pour vérifier la présence de l'empreinte SHA-256.",
        ]}
      />

      {/* 7. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Cache d'Inférence IA"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial d'intégrer le paramètre de température et le nom du modèle dans le calcul du hash SHA-256 de la clé de cache ?",
              options: [
                "Parce que deux modèles différents ou des températures différentes produisent des réponses conceptuellement distinctes",
                "Car Redis refuse d'enregistrer des clés sans température",
                "Pour accélérer la connexion Internet",
                "Pour chiffrer le mot de passe de la base MySQL",
              ],
              correctIndex: 0,
              explanation: "Le hash doit être déterministe par rapport aux facteurs influençant la génération. Si vous changez de modèle (ex: Flash vers Pro), l'ancien cache ne doit pas être servi.",
            },
            {
              id: 2,
              question: "Quelle précaution absolue doit-on prendre si l'on met en cache le résumé d'un document personnel d'un utilisateur (ex: son bilan médical) ?",
              options: [
                "Inclure impérativement l'identifiant de l'utilisateur (userId) dans la clé pour isoler strictement le cache de chaque individu",
                "Partager la clé publiquement avec tous les visiteurs du site",
                "Désactiver le TTL",
                "Stocker le document dans un cookie",
              ],
              correctIndex: 0,
              explanation: "Faute d'isolation par utilisateur, un internaute B demandant 'Résume mon document' risquerait de recevoir le résumé du document médical confidentiel de l'internaute A !",
            },
            {
              id: 3,
              question: "Qu'est-ce que le phénomène de 'Cache Stampede' (ou Thundering Herd) ?",
              options: [
                "Une avalanche de requêtes simultanées constatant toutes un Cache Miss au même instant et saturant le service distant",
                "Une coupure de courant générale",
                "L'écrasement de la base de données",
                "Un virus informatique sur Docker",
              ],
              correctIndex: 0,
              explanation: "ì l'expiration d'une clé très populaire, des dizaines de requêtes concurrentes constatent le manque en même temps et appellent toutes le modèle IA simultanément.",
            },
            {
              id: 4,
              question: "Que doit faire votre API si le serveur Redis tombe en panne au milieu d'une requête utilisateur (Fallback gracieux) ?",
              options: [
                "Intercepter l'erreur dans un try/catch, consigner un avertissement et poursuivre l'appel vers Gemini pour servir l'utilisateur",
                "Arrêter immédiatement tout le serveur Node.js avec process.exit()",
                "Renvoyer une erreur 500 à tous les utilisateurs",
                "Supprimer la base de données relationnelle",
              ],
              correctIndex: 0,
              explanation: "Le cache est une optimisation, pas la source de vérité. Une architecture résiliente doit continuer à répondre en mode dégradé même si Redis est inaccessible.",
            },
            {
              id: 5,
              question: "Quelle méthode Node.js native permet de calculer un hash SHA-256 sans installer de dépendance externe ?",
              options: [
                "crypto.createHash('sha256').update(texte).digest('hex')",
                "JSON.stringify(texte).toHash()",
                "Math.sha256(texte)",
                "Buffer.encrypt(texte)",
              ],
              correctIndex: 0,
              explanation: "Le module natif 'node:crypto' fournit l'API de hachage standard ultra-rapide et éprouvée du moteur Node.js.",
            },
          ]}
        />
      </section>

      {/* 8. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Checklist de validation des compétences
        </h2>
        <InteractiveChecklist
          title="Compétences validées pour le Chapitre 4"
          items={[
            "Je sais construire des clés de cache déterministes avec SHA-256 et le module crypto.",
            "J'intègre systématiquement le modèle, les instructions système et la version dans la clé de cache.",
            "Je garantis l'isolation stricte des données privées en intégrant l'identifiant utilisateur.",
            "Je comprends les risques du Cache Stampede et sais comment l'atténuer.",
            "J'implémente un fallback gracieux assurant la continuité de service même en cas d'incident Redis.",
          ]}
        />
      </section>
    </div>
  );
};

