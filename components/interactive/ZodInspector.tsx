'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type ScenarioKey = 'valid' | 'missingField' | 'wrongType';

interface ScenarioResultSuccess {
  success: true;
  message: string;
  data: {
    sentiment: string;
    summary: string;
    issues: string[];
    recommendations: string[];
  };
}

interface ScenarioResultError {
  success: false;
  message: string;
  error: { path: string[]; message: string }[];
}

type ScenarioResult = ScenarioResultSuccess | ScenarioResultError;

interface Scenario {
  title: string;
  json: string;
  zodResult: ScenarioResult;
}

export const ZodInspector: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('valid');

  const scenarios: Record<ScenarioKey, Scenario> = {
    valid: {
      title: 'Payload JSON Conforme',
      json: `{
  "sentiment": "positive",
  "summary": "Le client apprécie la rapidité de prise en charge.",
  "issues": [],
  "recommendations": ["Maintenir le niveau de support"]
}`,
      zodResult: {
        success: true,
        message: 'safeParse().success === true',
        data: {
          sentiment: 'positive',
          summary: 'Le client apprécie la rapidité de prise en charge.',
          issues: [],
          recommendations: ['Maintenir le niveau de support'],
        },
      },
    },
    missingField: {
      title: 'Erreur : Champ "summary" manquant',
      json: `{
  "sentiment": "negative",
  "issues": ["Bug critique au checkout"]
  // "summary" et "recommendations" sont absents
}`,
      zodResult: {
        success: false,
        message: 'safeParse().success === false (Validation échouée)',
        error: [
          { path: ['summary'], message: 'Required' },
          { path: ['recommendations'], message: 'Required' },
        ],
      },
    },
    wrongType: {
      title: 'Erreur : Mauvais type de donnée (sentiment invalide)',
      json: `{
  "sentiment": "tres_content", // Non conforme à l'enum z.enum(["positive", "neutral", "negative"])
  "summary": "Service impeccable",
  "issues": [],
  "recommendations": []
}`,
      zodResult: {
        success: false,
        message: 'safeParse().success === false (Enum invalid)',
        error: [
          {
            path: ['sentiment'],
            message: "Invalid enum value. Expected 'positive' | 'neutral' | 'negative', received 'tres_content'",
          },
        ],
      },
    },
  };

  const current = scenarios[activeScenario];

  return (
    <div className="my-8 rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Icon name="shield-check" className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Banc d&apos;Essai Interactif : Validation Runtime avec Zod
            </h4>
            <p className="text-sm text-slate-500">
              Observez comment safeParse() sécurise votre backend face aux réponses imprévisibles d&apos;un LLM
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
          Défense en profondeur
        </span>
      </div>

      {/* Scenarios Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveScenario('valid')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
            activeScenario === 'valid'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          ✓ 1. Payload Valide
        </button>
        <button
          type="button"
          onClick={() => setActiveScenario('missingField')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
            activeScenario === 'missingField'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          ✗ 2. Champ Manquant
        </button>
        <button
          type="button"
          onClick={() => setActiveScenario('wrongType')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
            activeScenario === 'wrongType'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          ✗ 3. Type/Enum Invalide
        </button>
      </div>

      {/* Code comparison grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Raw JSON from Gemini */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm font-mono text-slate-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-sm text-slate-400">
            <span>JSON brut reçu de Gemini</span>
            <span className="font-sans">Input</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre leading-relaxed text-indigo-300">
            {current.json}
          </pre>
        </div>

        {/* Right: Zod safeParse result */}
        <div
          className={`rounded-xl border p-4 text-sm font-mono transition-colors ${
            current.zodResult.success
              ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
              : 'border-rose-200 bg-rose-50/40 text-rose-950'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 mb-3 text-sm font-sans font-bold">
            <span>Résultat AnalysisSchema.safeParse(json)</span>
            <span>{current.zodResult.success ? 'Succès' : 'Échec capté'}</span>
          </div>
          <div className="space-y-2">
            <p className="font-bold">{current.zodResult.message}</p>
            <pre className="overflow-x-auto whitespace-pre leading-relaxed p-2.5 rounded-lg bg-white/80 border text-sm">
              {JSON.stringify(
                current.zodResult.success
                  ? current.zodResult.data
                  : current.zodResult.error,
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
