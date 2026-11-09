'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Structured Prompting
        </h1>
      </div>

      {/* 1. Les Formats Structurés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Comparatif des formats de sortie structurés
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Format</th>
                <th className="p-3.5 border border-slate-200">Principal avantage</th>
                <th className="p-3.5 border border-slate-200">Usage recommandé</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Markdown</td>
                <td className="p-3.5 border border-slate-200">Lisibilité humaine immédiate (titres, listes, code)</td>
                <td className="p-3.5 border border-slate-200">Rapports d&apos;audit et restitutions directes dans le chat.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">JSON</td>
                <td className="p-3.5 border border-slate-200">Sérialisation et parsing automatique par programmation</td>
                <td className="p-3.5 border border-slate-200">API backend Node.js, pipelines d&apos;agents et bases de données.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Tableaux</td>
                <td className="p-3.5 border border-slate-200">Comparaison visuelle rapide et synthèse tabulaire</td>
                <td className="p-3.5 border border-slate-200">Listes d&apos;anomalies ordonnées par sévérité.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Validation avec Zod dans Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Contrôle de schéma avec Zod dans Node.js
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Demander du JSON dans un prompt ne garantit pas à 100% sa conformité. Un backend professionnel valide toujours la réponse avec un schéma Zod :
        </p>

        <div className="rounded-2xl border-2 border-slate-200 bg-slate-900 text-slate-100 p-6 font-mono text-xs sm:text-sm space-y-2">
          <pre className="whitespace-pre-wrap">
{`const { z } = require("zod");

const auditReportSchema = z.object({
  audit_status: z.enum(["completed", "partial", "error"]),
  summary: z.string().min(10),
  findings: z.array(
    z.object({
      id: z.string().regex(/^SEC-[0-9]{3}$/),
      category: z.enum(["injection", "auth", "config", "performance"]),
      severity: z.enum(["critical", "high", "medium", "low"]),
      evidence: z.string().min(5),
      recommendation: z.string().min(5)
    })
  ),
  limitations: z.array(z.string())
});

// Validation sûre (safeParse)
const parsed = auditReportSchema.safeParse(JSON.parse(aiRawResponse));
if (!parsed.success) {
  console.error("Format IA non conforme :", parsed.error.issues);
} else {
  console.log("Rapport valide et prêt à être exploité :", parsed.data);
}`}
          </pre>
        </div>

        <Callout type="warning" title="Format valide != Vérité technique">
          Une réponse de l&apos;IA peut être un JSON 100% valide selon le schéma Zod tout en affirmant des inexactitudes factuelles. Le Structured Prompting sécurise la syntaxe, mais le contenu doit toujours être étayé par des preuves.
        </Callout>
      </section>

      {/* 3. Balisage des entrées */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Baliser les entrées avec du pseudo-XML
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-2 font-mono text-xs sm:text-sm text-slate-900">
          <p className="text-slate-500 text-xs font-sans font-semibold">Exemple : séparer nettement les données des consignes par des balises</p>
          <pre className="whitespace-pre-wrap">
{`<contexte>Application React + Express</contexte>
<code_source>
  router.get("/users", (req, res) => { ... });
</code_source>
<instructions>
  Auditer les failles de sécurité et retourner le JSON conforme au schéma.
</instructions>`}
          </pre>
        </div>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz Structured Prompting
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Utilité première de Zod"
            question="Quel est le rôle de la validation Zod côté backend lors de la réception d'une réponse de LLM ?"
            options={[
              'Traduire le code en langage C',
              'Vérifier que la structure JSON, les types et les enums correspondent exactement au schéma attendu avant traitement',
            ]}
            correctIndex={1}
            explanation="Zod bloque les réponses malformées ou incomplètes pour éviter les exceptions de type TypeError dans l'application."
          />

          <QuickQuiz
            title="Question 2 — Balisage d'entrée"
            question="Pourquoi enfermer les documents ou le code à analyser dans des balises comme <document>...</document> ?"
            options={[
              'Pour transformer l’IA en navigateur web',
              'Pour délimiter sans ambiguïté les données passives à examiner des instructions directes de l’utilisateur',
            ]}
            correctIndex={1}
            explanation="La séparation visuelle claire par balises réduit les risques d'interprétation confuse entre données et ordres."
          />
        </div>
      </section>
    </div>
  );
};

