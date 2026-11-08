'use client';

import React, { useState } from 'react';

interface VectorPoint {
  id: string;
  title: string;
  category: 'RH' | 'TECH' | 'FINANCE';
  x: number; // Coordonnée X projetée 2D
  y: number; // Coordonnée Y projetée 2D
  content: string;
}

export const VectorSimilaritySimulator: React.FC = () => {
  const [selectedPointId, setSelectedPointId] = useState<string>('q1');
  const [minScore, setMinScore] = useState<number>(0.70);

  const points: VectorPoint[] = [
    {
      id: 'doc1',
      title: 'Politique télétravail 2026',
      category: 'RH',
      x: 180,
      y: 120,
      content: 'Chaque collaborateur peut effectuer jusqu à 2 jours de télétravail par semaine avec accord managérial.',
    },
    {
      id: 'doc2',
      title: 'Guide congés payés & RTT',
      category: 'RH',
      x: 210,
      y: 140,
      content: 'Les demandes de congés payés doivent être posées au minimum 15 jours avant la date de départ.',
    },
    {
      id: 'doc3',
      title: 'Architecture API & Microservices',
      category: 'TECH',
      x: 420,
      y: 280,
      content: 'Les services Express communiquent via gRPC et exposent des endpoints REST sécurisés par JWT.',
    },
    {
      id: 'doc4',
      title: 'Déploiement Docker & Kubernetes',
      category: 'TECH',
      x: 450,
      y: 260,
      content: 'Les conteneurs sont construits avec un utilisateur node sans privilèges root et orchestrés sur k8s.',
    },
    {
      id: 'doc5',
      title: 'Barème indemnités kilométriques',
      category: 'FINANCE',
      x: 320,
      y: 80,
      content: 'Les notes de frais kilométriques sont remboursées selon le barème fiscal officiel en vigueur.',
    },
  ];

  // Requêtes utilisateur de test avec leurs coordonnées vectorielles projetées
  const queryPositions: Record<string, { label: string; x: number; y: number }> = {
    q1: { label: "Combien de jours à la maison puis-je travailler ?", x: 195, y: 130 },
    q2: { label: "Comment déployer mon conteneur en production ?", x: 440, y: 270 },
    q3: { label: "Quelle est la procédure de remboursement de mes frais ?", x: 300, y: 95 },
  };

  const currentQuery = queryPositions[selectedPointId];

  // Calcul simplifié d'une distance euclidienne normalisée en score de similarité (0.0 à 1.0)
  const calculateScore = (p: VectorPoint): number => {
    const dx = p.x - currentQuery.x;
    const dy = p.y - currentQuery.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Transformation de la distance en similarité cosinus simulée
    const similarity = Math.max(0, 1 - distance / 350);
    return Math.round(similarity * 100) / 100;
  };

  const scoredPoints = points.map((p) => ({
    ...p,
    score: calculateScore(p),
  })).sort((a, b) => b.score - a.score);

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-0.5 text-sm font-bold text-purple-700">
              Lab Vectoriel Qdrant
            </span>
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-0.5 text-sm font-bold text-emerald-700">
              Espace Sémantique 2D
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
            Simulateur Visuel d&apos;Espace Vectoriel & Distance Cosinus
          </h4>
        </div>

        {/* Sélecteur de question */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-sm font-bold text-slate-600">Question testée :</span>
          <select
            value={selectedPointId}
            onChange={(e) => setSelectedPointId(e.target.value)}
            className="p-2 border rounded-xl text-sm font-semibold bg-slate-50 text-slate-800"
          >
            <option value="q1">RH : Télétravail & Présentiel</option>
            <option value="q2">TECH : Déploiement Conteneur</option>
            <option value="q3">FINANCE : Remboursement Frais</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Graphique SVG vectoriel 2D */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-slate-950 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center text-sm text-slate-400 mb-2">
            <span>Projection PCA 2D (Espace 768 dimensions ramené en plan)</span>
            <span className="text-sm font-mono text-purple-400">Qdrant Collection: rag_docs</span>
          </div>

          <div className="relative w-full h-[320px]">
            <svg className="w-full h-full" viewBox="0 0 600 360">
              {/* Grille cartésienne d'arrière-plan */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Lignes reliant la requête aux documents retenus */}
              {scoredPoints.map((p) => {
                const isMatch = p.score >= minScore;
                return (
                  <line
                    key={p.id}
                    x1={currentQuery.x}
                    y1={currentQuery.y}
                    x2={p.x}
                    y2={p.y}
                    stroke={isMatch ? '#a855f7' : '#334155'}
                    strokeWidth={isMatch ? 2 : 1}
                    strokeDasharray={isMatch ? 'none' : '4,4'}
                    opacity={isMatch ? 0.9 : 0.3}
                  />
                );
              })}

              {/* Points des documents indexés */}
              {scoredPoints.map((p) => {
                const isMatch = p.score >= minScore;
                const colors = {
                  RH: '#38bdf8',
                  TECH: '#34d399',
                  FINANCE: '#fbbf24',
                };
                return (
                  <g key={p.id} className="cursor-pointer">
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isMatch ? 10 : 7}
                      fill={colors[p.category]}
                      stroke="#ffffff"
                      strokeWidth={isMatch ? 3 : 1}
                      className="transition-all duration-300"
                    />
                    <text
                      x={p.x + 14}
                      y={p.y + 4}
                      fill={isMatch ? '#ffffff' : '#64748b'}
                      fontSize="14"
                      fontWeight={isMatch ? 'bold' : 'normal'}
                      fontFamily="sans-serif"
                    >
                      {p.title} ({p.score})
                    </text>
                  </g>
                );
              })}

              {/* Point de la requête utilisateur */}
              <g>
                <circle
                  cx={currentQuery.x}
                  cy={currentQuery.y}
                  r="12"
                  fill="#ef4444"
                  stroke="#ffffff"
                  strokeWidth="3"
                  className="animate-pulse"
                />
                <text
                  x={currentQuery.x + 16}
                  y={currentQuery.y + 5}
                  fill="#ef4444"
                  fontSize="14"
                  fontWeight="extrabold"
                  fontFamily="sans-serif"
                >
                  📍 Requête Utilisateur
                </text>
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400 mt-2 pt-2 border-t border-slate-800">
            <span>Légende : <strong className="text-sky-400">● RH</strong> | <strong className="text-emerald-400">● TECH</strong> | <strong className="text-amber-400">● FINANCE</strong></span>
            <span className="text-purple-300 font-semibold">Lignes violettes = Chunks retenus pour le RAG</span>
          </div>
        </div>

        {/* Panneau de contrôle et résultats de recherche */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-700">Seuil de coupure (Score Threshold) :</span>
              <span className="font-mono font-extrabold text-purple-700 text-base">{minScore.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.50"
              max="0.95"
              step="0.05"
              value={minScore}
              onChange={(e) => setMinScore(parseFloat(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <p className="text-sm text-slate-500">
              Seuls les fragments avec un score supérieur ou égal à {minScore.toFixed(2)} seront injectés dans le prompt Gemini.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-bold text-slate-800 block">Fragments ordonnés par pertinence :</span>
            {scoredPoints.map((p) => {
              const isMatch = p.score >= minScore;
              return (
                <div
                  key={p.id}
                  className={`p-3 rounded-xl border text-sm transition-all ${
                    isMatch
                      ? 'border-purple-300 bg-purple-50/40 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{p.title}</span>
                    <span className={`font-mono text-sm px-2 py-0.5 rounded font-extrabold ${
                      isMatch ? 'bg-purple-200 text-purple-900' : 'bg-slate-100 text-slate-500'
                    }`}>
                      Score : {p.score}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{p.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
