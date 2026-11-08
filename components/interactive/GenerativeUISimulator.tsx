'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type PresetType = 'finance' | 'ecommerce' | 'diagnostics';

interface WidgetData {
  type: 'score' | 'product' | 'alert';
  title: string;
  score?: number;
  summary: string;
  metrics?: { label: string; value: string }[];
  tags?: string[];
  severity?: 'success' | 'warning' | 'info';
}

export const GenerativeUISimulator: React.FC = () => {
  const [activePreset, setActivePreset] = useState<PresetType>('finance');

  const presets: Record<PresetType, { name: string; json: WidgetData; rawZod: string }> = {
    finance: {
      name: 'Performance Boutique (Score & Synthèse)',
      json: {
        type: 'score',
        title: 'Bilan Mensuel Ventes',
        score: 84,
        summary: 'Les commandes progressent de +18% avec un panier moyen en hausse.',
        metrics: [
          { label: 'Satisfaction', value: '94%' },
          { label: 'Recommandations', value: 'Stabiliser stock' },
        ],
      },
      rawZod: `const ScoreWidgetSchema = z.object({
  type: z.literal("score"),
  title: z.string(),
  score: z.number().min(0).max(100),
  summary: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string() }))
});`,
    },
    ecommerce: {
      name: 'Génération de Carte Produit',
      json: {
        type: 'product',
        title: 'Robe Noire Élégante Soirée',
        summary: 'Coupe ajustée en crêpe fluide, finitions soignées pour événements haut de gamme.',
        tags: ['Automne/Hiver', 'Soirée', 'Tissu Noble', 'Éco-conçu'],
      },
      rawZod: `const ProductCardSchema = z.object({
  type: z.literal("product"),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string())
});`,
    },
    diagnostics: {
      name: 'Alerte & Diagnostic Système',
      json: {
        type: 'alert',
        title: 'Diagnostic Latence API',
        summary: 'Dépassement du seuil de 800ms constaté sur la route de paiement externe.',
        severity: 'warning',
        metrics: [
          { label: 'Impact', value: 'Transactions ralenties' },
          { label: 'Action requise', value: 'Activer le circuit-breaker' },
        ],
      },
      rawZod: `const AlertWidgetSchema = z.object({
  type: z.literal("alert"),
  title: z.string(),
  summary: z.string(),
  severity: z.enum(["success", "warning", "info"]),
  metrics: z.array(z.object({ label: z.string(), value: z.string() }))
});`,
    },
  };

  const current = presets[activePreset];

  return (
    <div className="my-8 rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm">
            <Icon name="layout" className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Laboratoire Interactif : Rendu Contrôlé de UI Générative
            </h4>
            <p className="text-sm text-slate-500">
              Observez comment un schéma Zod transforme une réponse d&apos;IA en composants React natifs sécurisés
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200">
          generateObject & Zod
        </span>
      </div>

      {/* Preset selector */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActivePreset('finance')}
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
            activePreset === 'finance'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          1. Widget Score Ventes
        </button>
        <button
          type="button"
          onClick={() => setActivePreset('ecommerce')}
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
            activePreset === 'ecommerce'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          2. Carte Produit Mode
        </button>
        <button
          type="button"
          onClick={() => setActivePreset('diagnostics')}
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
            activePreset === 'diagnostics'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          3. Alerte Diagnostic
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: JSON structuré validé */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-sm text-slate-400">
            <span>Objet Zod validé reçu</span>
            <span className="font-sans">Flux JSON</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre text-indigo-300 leading-relaxed">
            {JSON.stringify(current.json, null, 2)}
          </pre>
        </div>

        {/* Right: Composant React monté */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
            <span className="text-sm font-bold text-slate-800">Composant React monté :</span>
            <span className="text-sm font-mono text-indigo-700 font-bold">&lt;WidgetRenderer /&gt;</span>
          </div>

          {current.json.type === 'score' && (
            <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-base font-bold text-slate-900">{current.json.title}</h5>
                <span className="text-2xl font-black text-emerald-600">{current.json.score}/100</span>
              </div>
              <p className="text-sm text-slate-700">{current.json.summary}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                {current.json.metrics?.map((m, idx) => (
                  <div key={idx} className="rounded-lg bg-slate-50 p-2.5">
                    <span className="text-sm text-slate-500 font-semibold">{m.label}</span>
                    <p className="text-sm font-bold text-slate-900">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {current.json.type === 'product' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="sparkles" className="w-5 h-5 text-indigo-600" />
                <h5 className="text-base font-bold text-slate-900">{current.json.title}</h5>
              </div>
              <p className="text-sm text-slate-700">{current.json.summary}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {current.json.tags?.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-indigo-50 px-2.5 py-1 text-sm font-semibold text-indigo-700 border border-indigo-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {current.json.type === 'alert' && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-800">
                <Icon name="alert" className="w-5 h-5" />
                <h5 className="text-base font-bold">{current.json.title}</h5>
              </div>
              <p className="text-sm text-slate-800">{current.json.summary}</p>
              <div className="space-y-1.5 pt-2 border-t border-amber-200">
                {current.json.metrics?.map((m, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-slate-600 font-semibold">{m.label} :</span>
                    <span className="font-bold text-slate-900">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

