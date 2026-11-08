'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Streaming des réponses IA avec Server-Sent Events (SSE)
        </h1>
      </div>

      {/* 1. Objectifs du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Dans le chapitre précédent, nous avons utilisé generateContent() : l&apos;utilisateur devait attendre la fin complète de la réponse. Nous allons radicalement améliorer l&apos;expérience grâce au streaming SSE.
        </p>
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            À la fin de ce chapitre, vous serez capable de :
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Comprendre le protocole Server-Sent Events (SSE).</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Différencier réponse bloquante et flux progressif en temps réel.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Exploiter generateContentStream() avec un générateur asynchrone.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Formater les trames SSE (data, event: done).</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Consommer le flux dans React avec fetch() et ReadableStream.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Gérer les déconnexions intempestives des clients.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Problème d'une réponse classique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comprendre le problème d&apos;une réponse classique
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
            <h3 className="font-bold text-rose-950 text-sm">Génération classique (Bloquante)</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le client attend 5 à 15 secondes devant un écran figé. Tout le contenu est renvoyé en un seul bloc massif.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <h3 className="font-bold text-emerald-950 text-sm">Réponse progressive (Streaming SSE)</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Les premiers mots apparaissent en moins de 500 ms. L&apos;utilisateur lit pendant que Gemini continue de générer.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Comprendre Server-Sent Events */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comprendre Server-Sent Events (SSE)
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          SSE est une technologie web standard permettant au serveur d&apos;envoyer des données textuelles au navigateur via une connexion HTTP maintenue ouverte (Keep-Alive).
        </p>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1">
          <p className="text-amber-400">{'// Format textuel standard d\'un flux SSE :'}</p>
          <p>data: {"{\""}content{"\": \"Bonjour \"}"}</p>
          <p></p>
          <p>data: {"{\""}content{"\": \"voici votre \"}"}</p>
          <p></p>
          <p>event: done</p>
          <p>data: {"{}"}</p>
          <p></p>
        </div>
      </section>

      {/* 4. Activer le streaming Gemini */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Activer le streaming Gemini avec un générateur asynchrone
        </h2>
        <CodeBlock
          filename="backend/src/services/gemini.service.ts"
          language="typescript"
          code={`import { ai, GEMINI_MODEL } from "../config/gemini.js";

export async function* generateAnalysisStream(prompt: string) {
  const stream = await ai.models.generateContentStream({
    model: GEMINI_MODEL,
    contents: prompt
  });

  for await (const chunk of stream) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
}`}
        />
      </section>

      {/* 5. Créer le contrôleur SSE */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Créer le contrôleur SSE Express
        </h2>
        <CodeBlock
          filename="backend/src/controllers/stream.controller.ts"
          language="typescript"
          code={`import { Request, Response } from "express";
import { generateAnalysisStream } from "../services/gemini.service.js";

export async function streamAnalysis(req: Request, res: Response) {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt obligatoire" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    for await (const chunk of generateAnalysisStream(prompt)) {
      if (res.destroyed) break;
      res.write(\`data: \${JSON.stringify({ content: chunk })}\\n\\n\`);
    }

    if (!res.destroyed) {
      res.write("event: done\\ndata: {}\\n\\n");
      res.end();
    }
  } catch (error) {
    console.error("Erreur streaming :", error);
    if (!res.destroyed) {
      res.write(\`event: error\\ndata: \${JSON.stringify({ message: "Erreur pendant la génération" })}\\n\\n\`);
      res.end();
    }
  }
}`}
        />
      </section>

      {/* 6. Configurer la route */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Déclarer la route POST /api/analyses/stream
        </h2>
        <CodeBlock
          filename="backend/src/routes/analysis.routes.ts"
          language="typescript"
          code={`import { Router } from "express";
import { analyze } from "../controllers/analysis.controller.js";
import { streamAnalysis } from "../controllers/stream.controller.js";

const router = Router();
router.post("/", analyze);
router.post("/stream", streamAnalysis);

export default router;`}
        />
      </section>

      {/* 7. Consommation React */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Recevoir le streaming dans React avec ReadableStream
        </h2>
        <CodeBlock
          filename="frontend/src/streamClient.ts"
          language="typescript"
          code={`async function startAnalysis(prompt: string) {
  const response = await fetch("http://localhost:3000/api/analyses/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok || !response.body) {
    throw new Error("Flux indisponible");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    result += text;
    console.log(result);
  }
}`}
        />
      </section>

      {/* 8. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Travaux pratiques
        </h2>
        <PracticalWork
          title="Streaming temps réel avec SSE"
          objective="Implémenter le flux for await...of et diffuser mot par mot les réponses."
          duration="45 min"
          steps={[
            "Développez generateAnalysisStream() dans gemini.service.ts.",
            "Créez le contrôleur streamAnalysis avec les bons en-têtes HTTP.",
            "Ajoutez la route POST /api/analyses/stream.",
            "Testez dans Postman et vérifiez que les fragments s'affichent sans attendre la fin.",
            "Exercice supplémentaire : Implémentez la détection de déconnexion client avec req.on('close')."
          ]}
        />
      </section>

      {/* 9. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Synthèse
        </h2>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-2 text-sm text-slate-900 font-medium">
          <p>⬢ SSE diffuse les données progressivement sur une connexion HTTP persistante.</p>
          <p>⬢ <code className="font-mono font-bold">generateContentStream()</code> active le mode streaming de Gemini.</p>
          <p>⬢ Les générateurs asynchrones avec <code className="font-mono font-bold">yield</code> transmettent chaque bloc sans bufferisation.</p>
          <p>⬢ <code className="font-mono font-bold">res.flushHeaders()</code> garantit l&apos;ouverture immédiate du flux côté client.</p>
        </div>
      </section>
    </div>
  );
};

