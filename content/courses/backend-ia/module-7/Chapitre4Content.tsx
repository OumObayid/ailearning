'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Intégration de Google Gemini dans le Backend
        </h1>
      </div>

      {/* 1. Objectifs du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Nous allons maintenant connecter notre backend à Google Gemini pour permettre à l&apos;application de générer des analyses intelligentes.
        </p>
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            À la fin de ce chapitre, vous serez capable de :
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Comprendre la communication réseau entre Node.js et Google Gemini.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Installer et initialiser le SDK officiel Google @google/genai.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Configurer et sécuriser la clé secrète GEMINI_API_KEY.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Envoyer une demande d&apos;inférence et traiter la réponse générée.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Gérer les codes d&apos;erreur HTTP, timeouts et quotas d&apos;API.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Séparer hermétiquement la logique métier du contrôleur Express.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Architecture de communication */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Architecture de communication
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Gemini n&apos;est pas un binaire local : c&apos;est un service cloud distant accessible par des requêtes HTTPS sécurisées. Le backend agit en rempart :
        </p>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-1">
          <p className="text-amber-400">{'// Chaîne d\'appel sécurisée :'}</p>
          <p>Utilisateur -&gt; Frontend React -&gt; Backend Express -&gt; Google Gemini API (HTTPS) -&gt; Backend -&gt; React</p>
        </div>
      </section>

      {/* 3. Obtenir une clé API Gemini */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Obtenir et configurer la clé API Gemini
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Rendez-vous sur <strong>Google AI Studio</strong> pour générer votre clé d&apos;API, puis ajoutez-la dans <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">backend/.env</code> :
        </p>
        <CodeBlock
          filename="backend/.env"
          language="env"
          code={`GEMINI_API_KEY=votre_cle_api_secrete
GEMINI_MODEL=gemini-2.5-flash`}
        />
        <Callout type="warning" title="Confidentialité absolue">
          <p className="text-sm leading-relaxed text-amber-950">
            Ne transmettez <strong>JAMAIS</strong> la clé <code className="font-mono font-bold">GEMINI_API_KEY</code> au frontend React.
          </p>
        </Callout>
      </section>

      {/* 4. Installer le SDK officiel */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Installer le SDK officiel Google
        </h2>
        <CodeBlock
          filename="Installation npm"
          language="bash"
          code={`npm install @google/genai`}
        />
      </section>

      {/* 5. Initialiser le client */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Initialiser le client Gemini
        </h2>
        <CodeBlock
          filename="backend/src/config/gemini.ts"
          language="typescript"
          code={`import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY manquante dans le fichier .env");
}

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";`}
        />
      </section>

      {/* 6. Créer le service d'analyse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Créer le service d&apos;analyse IA
        </h2>
        <CodeBlock
          filename="backend/src/services/gemini.service.ts"
          language="typescript"
          code={`import { ai, GEMINI_MODEL } from "../config/gemini.js";

export async function generateAnalysis(prompt: string): Promise<string | undefined> {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt
  });
  return response.text;
}`}
        />
      </section>

      {/* 7. Créer le contrôleur Express */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Créer le contrôleur Express
        </h2>
        <CodeBlock
          filename="backend/src/controllers/analysis.controller.ts"
          language="typescript"
          code={`import { Request, Response } from "express";
import { generateAnalysis } from "../services/gemini.service.js";

export async function analyze(req: Request, res: Response) {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Le prompt est obligatoire" });
    }

    const result = await generateAnalysis(prompt);
    return res.json({ success: true, result });
  } catch (error) {
    console.error("Erreur Gemini :", error);
    return res.status(500).json({ error: "Impossible de générer l'analyse" });
  }
}`}
        />
      </section>

      {/* 8. Créer la route API */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Créer la route API et l&apos;enregistrer
        </h2>
        <CodeBlock
          filename="backend/src/routes/analysis.routes.ts"
          language="typescript"
          code={`import { Router } from "express";
import { analyze } from "../controllers/analysis.controller.js";

const router = Router();
router.post("/", analyze);
export default router;`}
        />
        <p className="text-sm text-slate-700">
          Dans <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">src/app.ts</code>, montez la route : <code className="font-mono bg-slate-100 px-1 py-0.5 rounded font-bold">app.use("/api/analyses", analysisRoutes);</code>.
        </p>
      </section>

      {/* 9. Tester avec Postman */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Tester l&apos;endpoint avec Postman
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm space-y-2">
          <p className="text-emerald-400 font-bold">POST http://localhost:3000/api/analyses</p>
          <p className="text-slate-400">Headers: Content-Type: application/json</p>
          <pre className="text-amber-300">{"{\n  \"prompt\": \"Explique-moi le fonctionnement de Node.js en 5 lignes.\"\n}"}</pre>
        </div>
      </section>

      {/* 10. Gestion des erreurs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Gestion des erreurs et des délais d&apos;attente
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Code HTTP</th>
                <th className="py-2.5 px-4">Cause possible &amp; Remède</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-amber-700">400</td>
                <td className="py-2 px-4">Requête invalide ou corps JSON malformé.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-rose-700">401 / 403</td>
                <td className="py-2 px-4">Clé API invalide, révoquée ou permissions insuffisantes.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-purple-700">429</td>
                <td className="py-2 px-4">Quota dépassé ou Rate Limit Google atteint.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-slate-700">Timeout</td>
                <td className="py-2 px-4">Temps de génération trop long ; nécessite un streaming ou un timeout contrôlé.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 11. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          11. Travaux pratiques
        </h2>
        <PracticalWork
          title="Appel de génération d'analyse IA"
          objective="Connecter Express à Gemini et valider le traitement des prompts."
          duration="45 min"
          steps={[
            "Installez @google/genai et configurez votre clé GEMINI_API_KEY dans .env.",
            "Créez le client GoogleGenAI dans src/config/gemini.ts.",
            "Développez generateAnalysis(), le contrôleur et la route POST /api/analyses.",
            "Testez des prompts valides et vides dans Postman.",
            "Exercice supplémentaire : Modifiez le service pour injecter une instruction système (System Instruction) forçant un format de réponse technique structuré."
          ]}
        />
      </section>

      {/* 12. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          12. Synthèse
        </h2>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-2 text-sm text-slate-900 font-medium">
          <p>⬢ <code className="font-mono font-bold">@google/genai</code> est le SDK officiel moderne de Google pour Node.js.</p>
          <p>⬢ La clé API est gardée strictement côté serveur.</p>
          <p>⬢ Le contrôleur Express gère le contrat HTTP, le service isole l&apos;appel Gemini.</p>
          <p>⬢ <code className="font-mono font-bold">generateContent()</code> génère le texte de façon atomique (sans flux).</p>
        </div>
      </section>
    </div>
  );
};

