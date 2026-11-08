'use client';

import React, { useState } from 'react';

interface TestCase {
  id: string;
  question: string;
  context: string;
  generatedAnswer: string;
  expectedFaithfulness: number; // 0 à 100%
  hasHallucination: boolean;
  verdict: 'FAITHFUL' | 'HALLUCINATION' | 'REFUSAL_CORRECT';
}

export const LLMJudgeEvaluatorSimulator: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case1');
  const [isJudging, setIsJudging] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<TestCase | null>(null);

  const testCases: Record<string, TestCase> = {
    case1: {
      id: 'case1',
      question: "Quel est le montant maximal des indemnités de déplacement en 2026 ?",
      context: "Le barème kilométrique 2026 fixe l'indemnité maximale à 0,65 € par kilomètre pour les véhicules de 7 CV et plus. Aucune prime de panier n'est accordée pour les trajets de moins de 10 km.",
      generatedAnswer: "L'indemnité maximale de déplacement en 2026 est de 0,65 € par kilomètre pour les véhicules d'au moins 7 CV, conformément au barème officiel.",
      expectedFaithfulness: 100,
      hasHallucination: false,
      verdict: 'FAITHFUL',
    },
    case2: {
      id: 'case2',
      question: "Quels sont les avantages du pass transport ?",
      context: "L'entreprise prend en charge 50% du pass Navigo mensuel pour tous les salariés titulaires d'un contrat CDI ou CDD.",
      generatedAnswer: "L'entreprise prend en charge 50% du pass Navigo et offre un bonus annuel de 500 € pour l'achat d'un vélo électrique.",
      expectedFaithfulness: 45,
      hasHallucination: true,
      verdict: 'HALLUCINATION',
    },
    case3: {
      id: 'case3',
      question: "Quelle est la procédure pour demander un congé sabbatique ?",
      context: "Le guide RH traite des congés payés, des RTT et du congé maternité. Aucune mention n'est faite du congé sabbatique.",
      generatedAnswer: "Je ne dispose pas de cette information dans les documents fournis pour répondre à votre question.",
      expectedFaithfulness: 100,
      hasHallucination: false,
      verdict: 'REFUSAL_CORRECT',
    },
  };

  const currentCase = testCases[selectedCaseId];

  const runEvaluation = () => {
    setIsJudging(true);
    setEvaluationResult(null);

    setTimeout(() => {
      setEvaluationResult(currentCase);
      setIsJudging(false);
    }, 1200);
  };

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-0.5 text-sm font-bold text-emerald-700">
              Lab Évaluation IA
            </span>
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-0.5 text-sm font-bold text-purple-700">
              LLM-as-a-Judge & RAG Triad
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
            Simulateur d&apos;Évaluation Automatisée de Fidélité Documentaire
          </h4>
        </div>

        {/* Sélecteur de cas d'évaluation */}
        <div className="flex gap-2">
          <button
            onClick={() => { setSelectedCaseId('case1'); setEvaluationResult(null); }}
            className={`px-3 py-1.5 text-sm font-bold rounded-xl transition-all ${
              selectedCaseId === 'case1' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Cas 1 : Conforme
          </button>
          <button
            onClick={() => { setSelectedCaseId('case2'); setEvaluationResult(null); }}
            className={`px-3 py-1.5 text-sm font-bold rounded-xl transition-all ${
              selectedCaseId === 'case2' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Cas 2 : Hallucination
          </button>
          <button
            onClick={() => { setSelectedCaseId('case3'); setEvaluationResult(null); }}
            className={`px-3 py-1.5 text-sm font-bold rounded-xl transition-all ${
              selectedCaseId === 'case3' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Cas 3 : Refus sain
          </button>
        </div>
      </div>

      {/* Détails du cas testé */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="text-sm font-bold text-slate-700 block">1. Contexte documentaire extrait (Source RAG) :</span>
            <p className="text-sm text-slate-800 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200">
              &quot;{currentCase.context}&quot;
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="text-sm font-bold text-slate-700 block">2. Réponse générée par le modèle testé :</span>
            <p className="text-sm text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-200 font-medium">
              {currentCase.generatedAnswer}
            </p>
          </div>

          <button
            onClick={runEvaluation}
            disabled={isJudging}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50"
          >
            {isJudging ? 'Le Juge LLM analyse la réponse...' : 'Lancer l’évaluation LLM-as-a-Judge ➔'}
          </button>
        </div>

        {/* Verdict du Juge IA */}
        <div className="rounded-2xl border border-slate-200 p-5 bg-white flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="text-sm font-bold text-slate-900">Verdict du modèle évaluateur (Gemini Judge)</span>
              <span className="text-sm font-mono text-slate-500">Prompt: Faithfulness Evaluation</span>
            </div>

            {evaluationResult ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-sm text-slate-500 block">Score de Fidélité (Faithfulness) :</span>
                    <span className={`text-3xl font-extrabold font-mono ${
                      evaluationResult.expectedFaithfulness >= 90 ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {evaluationResult.expectedFaithfulness} %
                    </span>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-extrabold border ${
                    evaluationResult.verdict === 'FAITHFUL'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : evaluationResult.verdict === 'REFUSAL_CORRECT'
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}>
                    {evaluationResult.verdict === 'FAITHFUL' && '✅ Réponse 100% Ancrée'}
                    {evaluationResult.verdict === 'REFUSAL_CORRECT' && '🛡️ Refus Conforme'}
                    {evaluationResult.verdict === 'HALLUCINATION' && '❌ Hallucination Détectée'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-700">
                  <span className="font-bold text-slate-900 block mb-1">Raisonnement du Juge :</span>
                  {evaluationResult.verdict === 'FAITHFUL' && (
                    "Toutes les affirmations de la réponse (taux de 0,65 € et seuil de 7 CV) sont directement attestées dans le contexte fourni. Aucune extrapolation non vérifiable."
                  )}
                  {evaluationResult.verdict === 'HALLUCINATION' && (
                    "L'affirmation relative au 'bonus de 500 € pour l'achat d'un vélo' n'apparaît nulle part dans la source fournie. Le modèle a inventé une information trompeuse."
                  )}
                  {evaluationResult.verdict === 'REFUSAL_CORRECT' && (
                    "La question portait sur un sujet absent de la source. Le modèle a correctement appliqué la clause de repli plutôt que d'inventer des critères imaginaires."
                  )}
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 text-sm">
                {isJudging ? (
                  <span className="inline-flex items-center gap-2 font-bold text-emerald-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                    Comparaison sémantique en cours...
                  </span>
                ) : (
                  "Cliquez sur 'Lancer l'évaluation' pour observer le score d'ancrage calculé automatiquement."
                )}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-sm text-slate-500 flex justify-between">
            <span>Métrique : RAG Triad — Groundedness</span>
            <span>Seuil d&apos;alerte CI/CD : &lt; 85%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
