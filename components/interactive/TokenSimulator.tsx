'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

export const TokenSimulator: React.FC = () => {
  const [text, setText] = useState<string>(
    'Je développe une application intelligente avec Google Gemini et Next.js.'
  );

  // Approximation réaliste des tokens pour démonstration pédagogique
  const tokens = text.trim() ? text.split(/(\s+|[.,!?;:'"()[\]{}])/) : [];
  const filteredTokens = tokens.filter((t) => t.length > 0);
  const estimatedTokenCount = Math.max(1, Math.round(filteredTokens.length * 1.2));
  const estimatedCostPer1k = 0.00015; // Exemple indicatif en $
  const estimatedCost = ((estimatedTokenCount / 1000) * estimatedCostPer1k).toFixed(6);

  const colors = [
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-sky-100 text-sky-800 border-sky-200',
    'bg-purple-100 text-purple-800 border-purple-200',
  ];

  return (
    <div className="my-8 rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Icon name="sparkles" className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Atelier Interactif : Simulateur de Tokenisation
            </h4>
            <p className="text-sm text-slate-500">
              Tapez une phrase pour observer son découpage en tokens et la consommation associée
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
          Activité Pratique
        </span>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Texte d&apos;entrée :
        </label>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écrivez une phrase..."
          className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Visualisation des tokens découpés */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-slate-500 font-semibold">
          <span>Découpage visuel en unités internes (tokens) :</span>
          <span>{filteredTokens.length} fragments détectés</span>
        </div>
        <div className="min-h-14 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-3 flex flex-wrap gap-1.5">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token, index) => {
              const colorClass = colors[index % colors.length];
              return (
                <span
                  key={index}
                  className={`inline-block rounded-md border px-2 py-0.5 font-mono text-sm font-medium ${colorClass}`}
                >
                  {token === ' ' ? '␣' : token}
                </span>
              );
            })
          ) : (
            <span className="text-sm text-slate-400 italic">Saisissez du texte ci-dessus pour observer les tokens</span>
          )}
        </div>
      </div>

      {/* Indicateurs statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <span className="text-sm font-semibold text-slate-500">Tokens estimés</span>
          <p className="text-lg font-black text-slate-900 mt-0.5">~{estimatedTokenCount}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <span className="text-sm font-semibold text-slate-500">Ratio caractères/token</span>
          <p className="text-lg font-black text-slate-900 mt-0.5">
            {estimatedTokenCount > 0 ? (text.length / estimatedTokenCount).toFixed(1) : 0} car/tok
          </p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <span className="text-sm font-semibold text-slate-500">Coût estimé indicatif</span>
          <p className="text-lg font-black text-emerald-600 mt-0.5">${estimatedCost}</p>
        </div>
      </div>
    </div>
  );
};

