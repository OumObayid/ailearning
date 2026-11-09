'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Meta-Prompting
        </h1>
      </div>

      {/* 1. Définition et Comparaison */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Qu&apos;est-ce que le Meta-Prompting ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le <strong>Meta-Prompting</strong> consiste à concevoir un prompt dont l&apos;objectif n&apos;est pas d&apos;effectuer directement la tâche technique finale, mais de <strong>produire ou d&apos;améliorer les instructions</strong> qui permettront à un agent d&apos;accomplir cette tâche.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Prompt classique</th>
                <th className="p-3.5 border border-slate-200">Meta-Prompt</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Objectif</td>
                <td className="p-3.5 border border-slate-200">Faire exécuter une tâche (ex: auditer du code)</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Concevoir le prompt d&apos;un agent auditeur</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Livrable produit</td>
                <td className="p-3.5 border border-slate-200">Un rapport ou du code source</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Un document d&apos;instructions réutilisable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Les 4 Usages Clés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 champs d&apos;application majeurs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">1. Génération d&apos;instructions</span>
            <p className="text-xs text-slate-700">Transformer une spécification fonctionnelle brute en prompt professionnel calibré.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">2. Détection de failles</span>
            <p className="text-xs text-slate-700">Auditer un prompt pour repérer ses contradictions, ambiguïtés ou permissions manquantes.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">3. Optimisation progressive</span>
            <p className="text-xs text-slate-700">Réécrire une consigne vague pour imposer des contraintes strictes et des formats vérifiables.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">4. Génération de tests de résistance</span>
            <p className="text-xs text-slate-700">Créer automatiquement 10 scénarios d&apos;épreuve (prompt injections, cas limites) pour tester l&apos;agent.</p>
          </div>
        </div>
      </section>

      {/* 3. Implémentation Node.js Express */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Générateur de prompts avec Express et Gemini
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-900 text-slate-100 p-6 font-mono text-xs sm:text-sm space-y-2">
          <pre className="whitespace-pre-wrap">
{`app.post("/api/create-prompt", async (req, res) => {
  const { objective } = req.body;
  const metaPrompt = \`Tu es un ingénieur Prompt Engineering senior.
Conçois un prompt professionnel pour Google Antigravity à partir de cet objectif :
"\${objective}"
Le prompt généré doit obligatoirement intégrer :
Rôle, Mission, Contexte, Données autorisées, Contraintes strictes, Format de sortie, Critères de validation et Gestion des incertitudes.
Ne crée aucune permission d'écriture implicite.\`;

  const interaction = await ai.interactions.create({
    model: "gemini-2.5-flash",
    input: metaPrompt
  });
  res.json({ success: true, prompt: interaction });
});`}
          </pre>
        </div>

        <Callout type="warning" title="Validation humaine obligatoire">
          Le Meta-Prompting génère une excellente base d&apos;instructions, mais une relecture humaine reste indispensable pour s&apos;assurer qu&apos;aucune permission indésirable n&apos;est accordée.
        </Callout>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz Meta-Prompting
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Mission du Meta-Prompting"
            question="Dans quel but utilise-t-on le Meta-Prompting ?"
            options={[
              'Pour analyser directement le code du projet client',
              'Pour faire concevoir, tester ou améliorer des instructions de prompt par l’IA elle-même',
            ]}
            correctIndex={1}
            explanation="Le Meta-Prompting opère au niveau méta : il pilote la génération des prompts et des profils d'agents."
          />
        </div>
      </section>
    </div>
  );
};

