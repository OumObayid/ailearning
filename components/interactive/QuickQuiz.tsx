'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuickQuizProps {
  title?: string;
  questions?: Question[];
  // Single question mode props
  question?: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
}

export const QuickQuiz: React.FC<QuickQuizProps> = ({
  title,
  questions,
  question,
  options,
  correctIndex = 0,
  explanation = '',
}) => {
  // Normalize questions array
  const normalizedQuestions: Question[] = React.useMemo(() => {
    if (questions && questions.length > 0) {
      return questions;
    }
    if (question && options && options.length > 0) {
      return [
        {
          id: 1,
          question,
          options,
          correctIndex,
          explanation,
        },
      ];
    }
    return [];
  }, [questions, question, options, correctIndex, explanation]);

  const quizTitle = title || 'Validation des acquis';

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, oIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: oIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    normalizedQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  if (normalizedQuestions.length === 0) {
    return null;
  }

  return (
    <div className="my-8 rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm">
            <Icon name="academic-cap" className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">{quizTitle}</h4>
            <p className="text-sm text-slate-500">Testez votre assimilation des concepts clés</p>
          </div>
        </div>
        <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
          Auto-évaluation
        </span>
      </div>

      <div className="space-y-5">
        {normalizedQuestions.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 space-y-3">
              <p className="text-sm sm:text-base font-bold text-slate-900">
                {normalizedQuestions.length > 1 ? `${idx + 1}. ` : ''}
                {q.question}
              </p>

              <div className="space-y-1.5">
                {q.options.map((opt, oIdx) => {
                  let optStyle =
                    'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40';

                  if (selected === oIdx) {
                    optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-500';
                  }

                  if (showResults) {
                    if (oIdx === q.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                    } else if (selected === oIdx) {
                      optStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                    } else {
                      optStyle = 'border-slate-100 bg-slate-50 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`w-full text-left rounded-lg border p-2.5 text-sm transition flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {showResults && oIdx === q.correctIndex && (
                        <span className="text-emerald-600 font-bold ml-2">✓ Bonne réponse</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div
                  className={`p-2.5 rounded-lg text-sm leading-relaxed ${
                    isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="font-bold">Explication : </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        {!showResults ? (
          <button
            type="button"
            disabled={Object.keys(selectedAnswers).length < normalizedQuestions.length}
            onClick={() => setShowResults(true)}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Vérifier mes réponses
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-bold text-slate-800">
              Score obtenu :{' '}
              <span className="text-indigo-600 font-extrabold">
                {calculateScore()} / {normalizedQuestions.length}
              </span>
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Recommencer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
