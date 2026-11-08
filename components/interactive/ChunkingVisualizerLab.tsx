'use client';

import React, { useState, useMemo } from 'react';

const SAMPLE_TEXT = `L'architecture RAG (Retrieval-Augmented Generation) combine la puissance des modèles de fondation avec la précision d'une base de connaissances propriétaire. Dans un pipeline classique, le document source est d'abord extrait puis découpé en plusieurs fragments appelés 'chunks'. Si la taille de chunk est trop petite, le modèle manque de contexte pour comprendre la réponse. Si elle est trop grande, le prompt est saturé de bruit inutile. Le chevauchement (overlap) garantit qu'aucune phrase clé n'est tronquée entre deux fragments consécutifs.`;

interface ChunkItem {
  id: number;
  text: string;
  startIndex: number;
  endIndex: number;
  overlapWithPrevious: string;
}

export const ChunkingVisualizerLab: React.FC = () => {
  const [inputText, setInputText] = useState<string>(SAMPLE_TEXT);
  const [chunkSize, setChunkSize] = useState<number>(140);
  const [overlapSize, setOverlapSize] = useState<number>(35);
  const [activeChunk, setActiveChunk] = useState<number | null>(null);

  // Découpage réactif en fragments avec chevauchement
  const chunks = useMemo<ChunkItem[]>(() => {
    if (!inputText || chunkSize <= 0) return [];

    const result: ChunkItem[] = [];
    let start = 0;
    let chunkId = 1;
    const effectiveStep = Math.max(1, chunkSize - overlapSize);

    while (start < inputText.length) {
      const end = Math.min(start + chunkSize, inputText.length);
      const chunkContent = inputText.slice(start, end);

      const overlapText =
        chunkId > 1 && overlapSize > 0
          ? inputText.slice(start, Math.min(start + overlapSize, end))
          : '';

      result.push({
        id: chunkId,
        text: chunkContent,
        startIndex: start,
        endIndex: end,
        overlapWithPrevious: overlapText,
      });

      if (end >= inputText.length) break;
      start += effectiveStep;
      chunkId++;
    }

    return result;
  }, [inputText, chunkSize, overlapSize]);

  const chunkColors = [
    'border-blue-300 bg-blue-50/70 text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200',
    'border-emerald-300 bg-emerald-50/70 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200',
    'border-purple-300 bg-purple-50/70 text-purple-900 dark:border-purple-900 dark:bg-purple-950/30 dark:text-purple-200',
    'border-amber-300 bg-amber-50/70 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200',
    'border-pink-300 bg-pink-50/70 text-pink-900 dark:border-pink-900 dark:bg-pink-950/30 dark:text-pink-200',
  ];

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Découpage Documentaire (Chunking &amp; Overlap)
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Ajustez la taille des fenêtres et le chevauchement pour visualiser la préservation du contexte sémantique.
          </p>
        </div>
      </div>

      {/* Contrôles interactifs */}
      <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-slate-50 p-4 md:grid-cols-2 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              📏 Taille de Chunk (Chunk Size) :
            </label>
            <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {chunkSize} caractères
            </span>
          </div>
          <input
            type="range"
            min="60"
            max="300"
            step="10"
            value={chunkSize}
            onChange={(e) => {
              const val = Number(e.target.value);
              setChunkSize(val);
              if (overlapSize >= val) setOverlapSize(Math.floor(val * 0.3));
            }}
            className="w-full cursor-pointer accent-indigo-600"
          />
          <div className="mt-1 flex justify-between text-sm text-slate-500">
            <span>60 (Très court)</span>
            <span>180</span>
            <span>300 (Long)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              🔁 Chevauchement (Overlap) :
            </label>
            <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {overlapSize} car. ({chunkSize > 0 ? Math.round((overlapSize / chunkSize) * 100) : 0}%)
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={Math.floor(chunkSize * 0.5)}
            step="5"
            value={overlapSize}
            onChange={(e) => setOverlapSize(Number(e.target.value))}
            className="w-full cursor-pointer accent-emerald-600"
          />
          <div className="mt-1 flex justify-between text-sm text-slate-500">
            <span>0% (Coupure nette)</span>
            <span>25% (Recommandé)</span>
            <span>50% (Max)</span>
          </div>
        </div>
      </div>

      {/* Métriques du découpage */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Total Chunks Générés</span>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {chunks.length}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Taille Document Source</span>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {inputText.length} car.
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Rapport de Redondance</span>
          <div className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            +{overlapSize > 0 ? Math.round((overlapSize / (chunkSize - overlapSize)) * 100) : 0}%
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <span className="text-sm text-slate-500">Risque de Coupure Sémantique</span>
          <div className="mt-1 text-2xl font-bold">
            {overlapSize === 0 ? (
              <span className="text-rose-600 dark:text-rose-400">Élevé (0 overlap)</span>
            ) : overlapSize >= 20 ? (
              <span className="text-emerald-600 dark:text-emerald-400">Très faible</span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400">Modéré</span>
            )}
          </div>
        </div>
      </div>

      {/* Zone d'édition du texte */}
      <div className="mb-6">
        <label className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Texte source extrait pour l&apos;ingestion :
        </label>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full rounded-md border border-slate-300 p-3 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        />
      </div>

      {/* Visualisation des Chunks */}
      <div>
        <span className="mb-3 block text-sm font-semibold text-slate-900 dark:text-white">
          Fragments résultants stockés en base (Survolez ou cliquez pour inspecter le chevauchement) :
        </span>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {chunks.map((chunk) => {
            const colorClass = chunkColors[(chunk.id - 1) % chunkColors.length];
            const isSelected = activeChunk === chunk.id;

            return (
              <div
                key={chunk.id}
                onClick={() => setActiveChunk(isSelected ? null : chunk.id)}
                className={`cursor-pointer rounded-lg border p-3.5 transition ${colorClass} ${
                  isSelected ? 'ring-2 ring-indigo-500 shadow-md scale-[1.02]' : 'hover:shadow-sm'
                }`}
              >
                <div className="mb-2 flex items-center justify-between border-b border-current/20 pb-1.5">
                  <span className="font-bold text-sm">
                    Chunk #{chunk.id}
                  </span>
                  <span className="text-sm font-mono opacity-80">
                    [{chunk.startIndex} → {chunk.endIndex}] ({chunk.text.length} car.)
                  </span>
                </div>

                {chunk.overlapWithPrevious && (
                  <div className="mb-2 rounded border border-dashed border-current/40 bg-white/40 dark:bg-black/30 p-1.5 text-sm">
                    <span className="font-semibold block text-sm text-emerald-800 dark:text-emerald-300">
                      🔁 Chevauchement hérité ({chunk.overlapWithPrevious.length} car.) :
                    </span>
                    <span className="italic line-clamp-1">{chunk.overlapWithPrevious}</span>
                  </div>
                )}

                <p className="font-mono text-sm leading-relaxed">{chunk.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
