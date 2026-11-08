'use client';

import React, { useState } from 'react';

interface QuestionScenario {
  id: string;
  question: string;
  isInformationPresent: boolean;
  unconstrainedResponse: {
    answer: string;
    faithfulnessScore: number;
    hallucinationRisk: 'Faible' | 'Critique';
  };
  groundedResponse: {
    answer: string;
    citation: string;
    faithfulnessScore: number;
    hallucinationRisk: 'Nul';
  };
}

const QUESTION_SCENARIOS: QuestionScenario[] = [
  {
    id: 'present-days',
    question: 'Combien de jours de télétravail hebdomadaire sont autorisés ?',
    isInformationPresent: true,
    unconstrainedResponse: {
      answer: 'Le télétravail est autorisé jusqu\'à 2 jours par semaine selon la charte interne.',
      faithfulnessScore: 95,
      hallucinationRisk: 'Faible',
    },
    groundedResponse: {
      answer: 'Le télétravail est autorisé jusqu\'à 2 jours par semaine.',
      citation: 'Source : "Le télétravail est autorisé jusqu\'à 2 jours par semaine..."',
      faithfulnessScore: 100,
      hallucinationRisk: 'Nul',
    },
  },
  {
    id: 'present-seniority',
    question: 'Quelle est la condition d\'ancienneté requise pour en bénéficier ?',
    isInformationPresent: true,
    unconstrainedResponse: {
      answer: 'Il faut justifier de plus de 6 mois d\'ancienneté dans l\'entreprise.',
      faithfulnessScore: 92,
      hallucinationRisk: 'Faible',
    },
    groundedResponse: {
      answer: 'Cette modalité s\'adresse aux collaborateurs justifiant de plus de 6 mois d\'ancienneté.',
      citation: 'Source : "...pour les collaborateurs ayant plus de 6 mois d\'ancienneté."',
      faithfulnessScore: 100,
      hallucinationRisk: 'Nul',
    },
  },
  {
    id: 'absent-stipend',
    question: 'Quel est le montant de l\'indemnité mensuelle d\'électricité versée pour le bureau à domicile ?',
    isInformationPresent: false,
    unconstrainedResponse: {
      answer: 'L\'entreprise verse une indemnité forfaitaire de 35 € par mois pour couvrir les frais d\'électricité et d\'abonnement internet.',
      faithfulnessScore: 15,
      hallucinationRisk: 'Critique',
    },
    groundedResponse: {
      answer: 'D\'après la charte officielle disponible, aucune indemnité d\'électricité ou d\'équipement n\'est mentionnée dans le document.',
      citation: 'Règle d\'ancrage appliquée : Refus explicite et aveu d\'incertitude.',
      faithfulnessScore: 100,
      hallucinationRisk: 'Nul',
    },
  },
];

export const HallucinationDetectorLab: React.FC = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('absent-stipend');

  const currentScenario =
    QUESTION_SCENARIOS.find((q) => q.id === selectedQuestionId) || QUESTION_SCENARIOS[0];

  const sourceDocument = `CHARTE OFFICIELLE TÉLÉTRAVAIL 2026 :
Article 1 : Le télétravail est autorisé jusqu'à 2 jours par semaine pour les collaborateurs ayant plus de 6 mois d'ancienneté.
Article 2 : Les titres restaurant (valeur faciale 10,00 €) sont intégralement maintenus les jours télétravaillés.
Article 3 : Les demandes doivent être soumises sur l'intranet RH avant chaque jeudi 18h00.`;

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Détection d&apos;Hallucinations &amp; Ancrage Strict
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Comparez le comportement d&apos;un LLM non contraint face à un modèle configuré avec ancrage documentaire strict (*Grounding*).
          </p>
        </div>
      </div>

      {/* Document source officiel */}
      <div className="mb-6 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
        <div className="flex items-center justify-between mb-2 border-b border-slate-200 pb-1.5 dark:border-slate-800">
          <span className="font-bold text-sm text-slate-900 dark:text-white">
            📄 Document Source Unique RAG (La seule vérité autorisée) :
          </span>
          <span className="rounded bg-indigo-100 px-2 py-0.5 text-sm font-semibold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-400">
            Contexte Véritable
          </span>
        </div>
        <pre className="font-mono text-sm text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
          {sourceDocument}
        </pre>
      </div>

      {/* Choix de la question */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Sélectionnez une question posée par l&apos;utilisateur :
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {QUESTION_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedQuestionId(scenario.id)}
              className={`rounded-lg border p-3 text-left transition ${
                selectedQuestionId === scenario.id
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-white shadow-sm ring-1 ring-indigo-500'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
              }`}
            >
              <div className="font-semibold text-sm line-clamp-2">{scenario.question}</div>
              <div className="mt-2 text-sm">
                {scenario.isInformationPresent ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ Donnée présente</span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold">⚠️ Piège : Donnée absente</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Comparatif côte à côte */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Modèle A : Non contraint */}
        <div className="rounded-xl border border-rose-300 bg-rose-50/40 p-4 dark:border-rose-900/60 dark:bg-rose-950/20">
          <div className="mb-3 border-b border-rose-200 pb-2 dark:border-rose-900/60 flex items-center justify-between">
            <span className="font-bold text-sm text-rose-900 dark:text-rose-300">
              Modèle Non Contraint (Temp: 0.9, Sans Grounding)
            </span>
            <span className="rounded px-2 py-0.5 text-sm font-bold bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-200">
              Risque : {currentScenario.unconstrainedResponse.hallucinationRisk}
            </span>
          </div>

          <div className="rounded-lg bg-white p-3 font-mono text-sm text-slate-800 dark:bg-slate-900 dark:text-slate-200 border border-rose-200 dark:border-rose-900/60 mb-3 min-h-[90px]">
            {currentScenario.unconstrainedResponse.answer}
          </div>

          <div className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
            <div>
              <strong>Score de Fidélité (Faithfulness) :</strong>{' '}
              <span className={`font-bold ${currentScenario.unconstrainedResponse.faithfulnessScore < 50 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {currentScenario.unconstrainedResponse.faithfulnessScore} %
              </span>
            </div>
            {!currentScenario.isInformationPresent && (
              <div className="text-rose-700 dark:text-rose-400 font-semibold mt-2">
                🚨 Hallucination pure : Le modèle a inventé le chiffre &quot;35 €&quot; pour être aimable, alors que cette donnée n&apos;existe nulle part dans le document officiel !
              </div>
            )}
          </div>
        </div>

        {/* Modèle B : Ancrage Strict */}
        <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
          <div className="mb-3 border-b border-emerald-200 pb-2 dark:border-emerald-900/60 flex items-center justify-between">
            <span className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
              Modèle avec Ancrage Strict (Temp: 0.0 + Citations)
            </span>
            <span className="rounded px-2 py-0.5 text-sm font-bold bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
              Risque : {currentScenario.groundedResponse.hallucinationRisk}
            </span>
          </div>

          <div className="rounded-lg bg-white p-3 font-mono text-sm text-slate-800 dark:bg-slate-900 dark:text-slate-200 border border-emerald-200 dark:border-emerald-900/60 mb-3 min-h-[90px]">
            {currentScenario.groundedResponse.answer}
          </div>

          <div className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
            <div>
              <strong>Score de Fidélité (Faithfulness) :</strong>{' '}
              <span className="font-bold text-emerald-600">
                {currentScenario.groundedResponse.faithfulnessScore} %
              </span>
            </div>
            <div className="text-emerald-800 dark:text-emerald-300 font-medium">
              {currentScenario.groundedResponse.citation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

