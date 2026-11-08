'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

export const ContextWindowSimulator: React.FC = () => {
  const TOTAL_CAPACITY = 100000;

  const [instructions, setInstructions] = useState(5000);
  const [history, setHistory] = useState(25000);
  const [documents, setDocuments] = useState(45000);
  const [toolResults, setToolResults] = useState(15000);

  const totalUsed = instructions + history + documents + toolResults;
  const percentage = Math.min(Math.round((totalUsed / TOTAL_CAPACITY) * 100), 100);
  const remaining = Math.max(TOTAL_CAPACITY - totalUsed, 0);

  const handleReset = () => {
    setInstructions(5000);
    setHistory(25000);
    setDocuments(45000);
    setToolResults(15000);
  };

  const getStatus = () => {
    if (totalUsed > TOTAL_CAPACITY) {
      return {
        label: 'Dépassement de contexte critique !',
        desc: "L'agent subit une amnésie sévère : les instructions ou les documents initiaux sont tronqués.",
        color: 'text-rose-700 bg-rose-50 border-rose-300',
        barColor: 'bg-rose-600',
      };
    }
    if (percentage >= 85) {
      return {
        label: 'Attention : saturation imminente',
        desc: "Moins de 15% d'espace restant pour la réponse générée. Risque élevé d'oubli des consignes.",
        color: 'text-amber-800 bg-amber-50 border-amber-300',
        barColor: 'bg-amber-500',
      };
    }
    return {
      label: 'Fenêtre de contexte optimale',
      desc: "L'agent dispose d'une marge suffisante pour générer du code et raisonner sans perte d'information.",
      color: 'text-emerald-800 bg-emerald-50 border-emerald-300',
      barColor: 'bg-emerald-500',
    };
  };

  const status = getStatus();

  return (
    <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-black text-indigo-700 border border-indigo-200 uppercase tracking-wider">
              Simulateur Pédagogique
            </span>
            <span className="text-xs font-bold text-slate-500">• Séquence 1.4</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950">
            Simulateur de Fenêtre de Contexte
          </h3>
          <p className="text-sm sm:text-base font-medium text-slate-700 mt-1">
            Modifiez les quantités de tokens pour observer l&apos;occupation de la fenêtre et identifier les risques de saturation.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start sm:self-center px-3.5 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition"
        >
          <Icon name="arrow-left" className="w-4 h-4 rotate-90" />
          <span>Réinitialiser</span>
        </button>
      </div>

      {/* Progress Bar & Summary Card */}
      <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm font-black">
          <span className="text-slate-950">
            Capacité totale : <span className="text-indigo-700">{TOTAL_CAPACITY.toLocaleString()} tokens</span>
          </span>
          <span className="text-slate-800">
            Utilisés : <span className="text-slate-950">{totalUsed.toLocaleString()}</span> ({percentage}%) • Restant : <span className="text-emerald-700">{remaining.toLocaleString()}</span>
          </span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${Math.min((instructions / TOTAL_CAPACITY) * 100, 100)}%` }}
            className="bg-indigo-600 h-full transition-all"
            title={`Instructions: ${instructions.toLocaleString()} tokens`}
          />
          <div
            style={{ width: `${Math.min((history / TOTAL_CAPACITY) * 100, 100)}%` }}
            className="bg-sky-500 h-full transition-all"
            title={`Historique: ${history.toLocaleString()} tokens`}
          />
          <div
            style={{ width: `${Math.min((documents / TOTAL_CAPACITY) * 100, 100)}%` }}
            className="bg-violet-500 h-full transition-all"
            title={`Documents & Code: ${documents.toLocaleString()} tokens`}
          />
          <div
            style={{ width: `${Math.min((toolResults / TOTAL_CAPACITY) * 100, 100)}%` }}
            className="bg-amber-500 h-full transition-all"
            title={`Résultats outils: ${toolResults.toLocaleString()} tokens`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-600 shrink-0" />
            <span className="text-slate-700">Instructions ({instructions.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500 shrink-0" />
            <span className="text-slate-700">Historique ({history.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-violet-500 shrink-0" />
            <span className="text-slate-700">Code &amp; Docs ({documents.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
            <span className="text-slate-700">Outils ({toolResults.toLocaleString()})</span>
          </div>
        </div>

        {/* Status Alert */}
        <div className={`rounded-xl border p-4 ${status.color}`}>
          <div className="flex items-start gap-2.5">
            <Icon name="check" className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-sm">{status.label}</p>
              <p className="text-xs font-medium mt-0.5 leading-relaxed">{status.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Slider 1: Instructions */}
        <div className="space-y-2 p-4 rounded-2xl border border-slate-200 bg-white">
          <div className="flex justify-between items-center text-sm font-black">
            <span className="text-slate-900">Instructions principales</span>
            <span className="text-indigo-700 font-mono">{instructions.toLocaleString()} tokens</span>
          </div>
          <input
            type="range"
            min={1000}
            max={20000}
            step={500}
            value={instructions}
            onChange={(e) => setInstructions(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <p className="text-xs text-slate-500">Règles système, postures et contraintes de l&apos;agent</p>
        </div>

        {/* Slider 2: Historique */}
        <div className="space-y-2 p-4 rounded-2xl border border-slate-200 bg-white">
          <div className="flex justify-between items-center text-sm font-black">
            <span className="text-slate-900">Historique de conversation</span>
            <span className="text-sky-700 font-mono">{history.toLocaleString()} tokens</span>
          </div>
          <input
            type="range"
            min={0}
            max={50000}
            step={1000}
            value={history}
            onChange={(e) => setHistory(Number(e.target.value))}
            className="w-full accent-sky-500"
          />
          <p className="text-xs text-slate-500">Échanges passés accumulés dans la session de chat</p>
        </div>

        {/* Slider 3: Documents & Code */}
        <div className="space-y-2 p-4 rounded-2xl border border-slate-200 bg-white">
          <div className="flex justify-between items-center text-sm font-black">
            <span className="text-slate-900">Documents et code source</span>
            <span className="text-violet-700 font-mono">{documents.toLocaleString()} tokens</span>
          </div>
          <input
            type="range"
            min={5000}
            max={80000}
            step={2500}
            value={documents}
            onChange={(e) => setDocuments(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <p className="text-xs text-slate-500">Fichiers injectés (fichiers ouverts, contexte IDE, @mentions)</p>
        </div>

        {/* Slider 4: Résultats d'outils */}
        <div className="space-y-2 p-4 rounded-2xl border border-slate-200 bg-white">
          <div className="flex justify-between items-center text-sm font-black">
            <span className="text-slate-900">Sorties d&apos;outils &amp; terminal</span>
            <span className="text-amber-700 font-mono">{toolResults.toLocaleString()} tokens</span>
          </div>
          <input
            type="range"
            min={0}
            max={40000}
            step={1000}
            value={toolResults}
            onChange={(e) => setToolResults(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="text-xs text-slate-500">Logs de terminal, sorties de tests et requêtes de recherche</p>
        </div>
      </div>
    </div>
  );
};

