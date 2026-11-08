'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

export const TemperatureSimulator: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(0.2);

  const getBehaviorDescription = (temp: number) => {
    if (temp <= 0.2) {
      return {
        mode: 'Mode Déterministe & Stable',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        useCase: 'Extraction de données, schémas JSON, classifications, calculs métier.',
        example:
          'Réponse : « Le sentiment du commentaire est : négatif. Problème détecté : délai de livraison dépassé de 48h. » (Régularité maximale à chaque exécution).',
      };
    }
    if (temp <= 0.7) {
      return {
        mode: 'Mode Équilibré',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        useCase: 'Génération de texte pédagogique, explications de code, résumés analytiques.',
        example:
          'Réponse : « Ce client exprime une déception relative à la livraison, tout en soulignant la qualité intrinsèque du produit reçu. »',
      };
    }
    return {
      mode: 'Mode Créatif & Varié',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      useCase: 'Brainstorming, rédaction littéraire, exploration d’idées, synthèses narratives.',
      example:
        'Réponse : « Malgré un enthousiasme manifeste pour l’article, l’attente prolongée au seuil de sa porte a teinté son expérience d’une amère frustration. »',
    };
  };

  const current = getBehaviorDescription(temperature);

  return (
    <div className="my-8 rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Icon name="cpu" className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Laboratoire Interactif : L&apos;impact de la Température
            </h4>
            <p className="text-sm text-slate-500">
              Manipulez le curseur pour comprendre comment le paramètre influence la distribution probabiliste
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
          Hyperparamètre
        </span>
      </div>

      {/* Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-700">Paramètre temperature :</span>
          <span className="font-mono text-sm font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
            {temperature.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-sm font-semibold text-slate-500">
          <span>0.0 (Précis & rigide)</span>
          <span>0.5 (Équilibré)</span>
          <span>1.0 (Varié & créatif)</span>
        </div>
      </div>

      {/* Behavior feedback */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-700">Comportement généré :</span>
          <span className={`text-sm font-bold px-2.5 py-0.5 rounded-md border ${current.badgeColor}`}>
            {current.mode}
          </span>
        </div>
        <div>
          <span className="text-sm font-semibold text-slate-500">Cas d&apos;usage recommandé :</span>
          <p className="text-sm text-slate-800 font-medium mt-0.5">{current.useCase}</p>
        </div>
        <div className="pt-2 border-t border-slate-200/80">
          <span className="text-sm font-semibold text-slate-500">Exemple de formulation obtenue :</span>
          <p className="text-sm italic text-slate-700 mt-1 bg-white p-3 rounded-lg border border-slate-200">
            {current.example}
          </p>
        </div>
      </div>
    </div>
  );
};

