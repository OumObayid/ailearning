'use client';

import React from 'react';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Développement de l&apos;interface utilisateur avec React
        </h1>
      </div>

      {/* 1. Objectifs du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectif du chapitre
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Nous allons créer une interface React moderne permettant à l&apos;utilisateur de saisir un texte, de l&apos;envoyer au backend Express et d&apos;afficher le flux généré mot à mot sans jamais figer le navigateur.
        </p>
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            À la fin de ce chapitre, vous serez capable de :
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Initialiser une application React TypeScript avec Vite.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Gérer les états de saisie, de chargement et d&apos;erreurs.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Consommer le flux SSE POST avec l&apos;API standard Fetch.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Parser les trames d&apos;événements SSE séparées par des retours chariot.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Permettre l&apos;annulation du flux avec AbortController.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Architecture de communication */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Architecture de communication
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-1">
          <p className="text-amber-400">{'// Flux d\'interaction réactif :'}</p>
          <p>1. Utilisateur saisit le texte dans AnalysisForm.tsx</p>
          <p>2. Clic sur &quot;Analyser&quot; -&gt; POST /api/analyses/stream</p>
          <p>3. Express initie Gemini generateContentStream()</p>
          <p>4. Chunks envoyés en SSE : data: &#123;&quot;content&quot;: &quot;...&quot;&#125;\n\n</p>
          <p>5. React met à jour le state en continu sans bloquer l&apos;UI</p>
        </div>
      </section>

      {/* 3. Initialiser React */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Initialiser le frontend React avec Vite
        </h2>
        <CodeBlock
          filename="Terminal (Racine du projet)"
          language="bash"
          code={`npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev`}
        />
        <CodeBlock
          filename="frontend/.env"
          language="env"
          code={`VITE_API_URL=http://localhost:3000`}
        />
      </section>

      {/* 4. Composant AnalysisForm */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Créer le composant d&apos;analyse temps réel
        </h2>
        <CodeBlock
          filename="frontend/src/components/AnalysisForm.tsx"
          language="typescript"
          code={`import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AnalysisForm() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!prompt.trim() || loading) return;
    setResult("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(\`\${API_URL}/api/analyses/stream\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) throw new Error(\`Erreur HTTP : \${response.status}\`);
      if (!response.body) throw new Error("Flux de réponse indisponible.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\\n\\n");
        buffer = events.pop() ?? "";

        for (const event of events) {
          const dataLine = event.split("\\n").find((l) => l.startsWith("data:"));
          if (!dataLine) continue;

          try {
            const data = JSON.parse(dataLine.slice(5).trim());
            if (data.content) {
              setResult((prev) => prev + data.content);
            }
            if (data.error) throw new Error(data.error);
          } catch (e) {}
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <h1 className="text-xl font-bold text-slate-900">Analyse intelligente</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Saisissez votre texte à analyser..."
        rows={5}
        className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-sans"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white font-bold rounded-xl"
      >
        {loading ? "Analyse en cours..." : "Analyser"}
      </button>

      {error && <p className="text-sm text-rose-600 font-semibold">{error}</p>}
      {result && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h2 className="text-sm font-bold text-slate-700 mb-2">Résultat :</h2>
          <pre className="whitespace-pre-wrap font-sans text-sm text-slate-900">{result}</pre>
        </div>
      )}
    </div>
  );
}`}
        />
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques
        </h2>
        <PracticalWork
          title="Consommation du streaming dans React"
          objective="Afficher les mots au fil de l'eau et enrichir l'expérience utilisateur."
          duration="45 min"
          steps={[
            "Créez le frontend avec Vite et installez les dépendances.",
            "Implémentez AnalysisForm.tsx et intégrez-le dans App.tsx.",
            "Ajoutez un compteur de caractères dynamique (prompt.length).",
            "Ajoutez un bouton pour réinitialiser le texte et le résultat.",
            "Exercice supplémentaire : Utilisez un AbortController pour permettre l'annulation du flux en cours via un bouton 'Stopper la génération'."
          ]}
        />
      </section>

      {/* 6. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Synthèse
        </h2>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-2 text-sm text-slate-900 font-medium">
          <p>⬢ React pilote l&apos;interface sans jamais posséder la clé API secrète.</p>
          <p>⬢ L&apos;API Fetch avec <code className="font-mono font-bold">response.body.getReader()</code> permet de lire le flux.</p>
          <p>⬢ Le découpage sur <code className="font-mono font-bold">\n\n</code> isole chaque trame SSE reçue.</p>
          <p>⬢ L&apos;affichage progressif procure une sensation de réactivité immédiate.</p>
        </div>
      </section>
    </div>
  );
};

