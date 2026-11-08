'use client';

import React, { useState } from 'react';

interface DocumentCandidate {
  id: number;
  title: string;
  snippet: string;
  denseRank: number;
  denseScore: number;
  bm25Rank: number;
  bm25Score: number;
  rrfScore: number;
  rerankScore: number;
}

const PRESET_QUERIES = [
  {
    label: 'Référence exacte (Code produit)',
    query: 'Spécifications techniques de la soupape REF-X9402',
    description: 'Une recherche où la précision lexicale (BM25) est indispensable car le modèle vectoriel ne connaît pas la référence interne.',
  },
  {
    label: 'Question sémantique floue (Synonymes)',
    query: 'Comment réclamer une indemnisation après une livraison en retard ?',
    description: 'Une recherche où la sémantique vectorielle excelle car les documents parlent de dédommagement et litige sans mentionner le mot exact indemnisation.',
  },
  {
    label: 'Requête Hybride Complexe',
    query: 'Pression maximale tolérée par le filtre REF-881 en environnement acide',
    description: 'Combinaison idéale : référence de pièce rare + concepts techniques généraux (pression, acide).',
  },
];

export const HybridSearchSimulator: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'comparison' | 'pipeline'>('comparison');

  const currentPreset = PRESET_QUERIES[selectedPresetIndex];

  // Données de simulation calibrées selon le preset
  const candidates: DocumentCandidate[] = selectedPresetIndex === 0
    ? [
        {
          id: 1,
          title: 'Fiche Technique REF-X9402.pdf',
          snippet: 'Soupape industrielle REF-X9402 : diamètre 42mm, alliage titane, tolérance 12 bars.',
          denseRank: 4,
          denseScore: 0.62,
          bm25Rank: 1,
          bm25Score: 9.85,
          rrfScore: 0.038,
          rerankScore: 0.96,
        },
        {
          id: 2,
          title: 'Manuel des Soupapes Générales.pdf',
          snippet: 'Guide de maintenance pour clapets et soupapes de décharge pneumatiques.',
          denseRank: 1,
          denseScore: 0.89,
          bm25Rank: 4,
          bm25Score: 2.10,
          rrfScore: 0.032,
          rerankScore: 0.74,
        },
        {
          id: 3,
          title: 'Catalogue Pièces 2026.pdf',
          snippet: 'Index des références REF-X9400 à REF-X9410 pour pompes hydrauliques.',
          denseRank: 3,
          denseScore: 0.71,
          bm25Rank: 2,
          bm25Score: 7.40,
          rrfScore: 0.034,
          rerankScore: 0.88,
        },
        {
          id: 4,
          title: 'Règles de sécurité atelier.pdf',
          snippet: 'Procédure d\'inspection des circuits sous haute pression et protections.',
          denseRank: 2,
          denseScore: 0.81,
          bm25Rank: 5,
          bm25Score: 0.00,
          rrfScore: 0.027,
          rerankScore: 0.42,
        },
      ]
    : selectedPresetIndex === 1
    ? [
        {
          id: 5,
          title: 'Politique Dédommagement & Litiges.pdf',
          snippet: 'Conditions d\'octroi d\'un avoir financier ou remboursement si le transporteur dépasse le délai convenu.',
          denseRank: 1,
          denseScore: 0.94,
          bm25Rank: 4,
          bm25Score: 1.20,
          rrfScore: 0.039,
          rerankScore: 0.97,
        },
        {
          id: 6,
          title: 'Conditions Générales de Vente.pdf',
          snippet: 'Article 14 : délais de livraison indicatifs et clauses de force majeure.',
          denseRank: 2,
          denseScore: 0.82,
          bm25Rank: 2,
          bm25Score: 4.80,
          rrfScore: 0.035,
          rerankScore: 0.84,
        },
        {
          id: 7,
          title: 'FAQ Colis et Suivi.pdf',
          snippet: 'Procédure pour signaler un colis endommagé ou perdu lors de l\'acheminement.',
          denseRank: 3,
          denseScore: 0.75,
          bm25Rank: 3,
          bm25Score: 3.10,
          rrfScore: 0.031,
          rerankScore: 0.68,
        },
        {
          id: 8,
          title: 'Glossaire Juridique.pdf',
          snippet: 'Définition des termes : indemnisation, créance et préjudice contractuel.',
          denseRank: 4,
          denseScore: 0.65,
          bm25Rank: 1,
          bm25Score: 6.50,
          rrfScore: 0.033,
          rerankScore: 0.52,
        },
      ]
    : [
        {
          id: 9,
          title: 'Notice Filtre REF-881 Chimique.pdf',
          snippet: 'Filtre polymère REF-881 : résistance testée en bain d\'acide sulfurique jusqu\'à 8.5 bars.',
          denseRank: 1,
          denseScore: 0.91,
          bm25Rank: 1,
          bm25Score: 11.2,
          rrfScore: 0.045,
          rerankScore: 0.99,
        },
        {
          id: 10,
          title: 'Compatibilité des Polymères.pdf',
          snippet: 'Tableau de dégradation des membranes synthétiques en milieu acide concentré.',
          denseRank: 2,
          denseScore: 0.86,
          bm25Rank: 4,
          bm25Score: 2.30,
          rrfScore: 0.031,
          rerankScore: 0.78,
        },
        {
          id: 11,
          title: 'Nomenclature REF-881 Général.pdf',
          snippet: 'Dimensions d\'encombrement et filetages du support REF-881.',
          denseRank: 4,
          denseScore: 0.69,
          bm25Rank: 2,
          bm25Score: 6.90,
          rrfScore: 0.033,
          rerankScore: 0.72,
        },
      ];

  // Tri par Reranking final (Recherche Hybride complète)
  const hybridSorted = [...candidates].sort((a, b) => b.rerankScore - a.rerankScore);

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Recherche Hybride (Dense + BM25) &amp; Reranking
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez la complémentarité entre la recherche vectorielle sémantique et la recherche textuelle BM25.
          </p>
        </div>
      </div>

      {/* Sélection des cas de test */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Choisissez un scénario de recherche :
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {PRESET_QUERIES.map((preset, index) => (
            <button
              key={index}
              onClick={() => setSelectedPresetIndex(index)}
              className={`rounded-lg border p-3 text-left transition ${
                selectedPresetIndex === index
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
              }`}
            >
              <div className="font-semibold text-sm">{preset.label}</div>
              <div className="mt-1 font-mono text-sm line-clamp-1 italic text-slate-600 dark:text-slate-400">
                &ldquo;{preset.query}&rdquo;
              </div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-slate-500 italic">
          💡 {currentPreset.description}
        </p>
      </div>

      {/* Onglets de visualisation */}
      <div className="mb-4 flex gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            activeTab === 'comparison'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          Comparatif 3 Piliers : Dense vs BM25 vs Hybride
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            activeTab === 'pipeline'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          Pipeline Mathématique (RRF + Cross-Encoder)
        </button>
      </div>

      {activeTab === 'comparison' ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Colonne 1 : Dense Vectoriel */}
          <div className="rounded-lg border border-blue-200 bg-blue-50/40 p-4 dark:border-blue-900/60 dark:bg-blue-950/20">
            <div className="mb-3 border-b border-blue-200 pb-2 dark:border-blue-800">
              <span className="font-bold text-sm text-blue-900 dark:text-blue-300 block">
                1. Recherche Dense (Embeddings)
              </span>
              <span className="text-sm text-blue-700 dark:text-blue-400">
                Similarité Cosinus (Angle sémantique)
              </span>
            </div>
            <div className="space-y-2.5">
              {[...candidates]
                .sort((a, b) => b.denseScore - a.denseScore)
                .map((doc, idx) => (
                  <div key={doc.id} className="rounded border border-blue-200 bg-white p-2.5 text-sm dark:border-blue-800 dark:bg-slate-900">
                    <div className="flex justify-between font-semibold">
                      <span>#{idx + 1} {doc.title}</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400">
                        cos: {doc.denseScore.toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-slate-600 dark:text-slate-400 font-mono text-sm">
                      {doc.snippet}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Colonne 2 : Sparse BM25 */}
          <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
            <div className="mb-3 border-b border-amber-200 pb-2 dark:border-amber-800">
              <span className="font-bold text-sm text-amber-900 dark:text-amber-300 block">
                2. Recherche Sparse (BM25)
              </span>
              <span className="text-sm text-amber-700 dark:text-amber-400">
                Fréquence &amp; Concordance exacte
              </span>
            </div>
            <div className="space-y-2.5">
              {[...candidates]
                .sort((a, b) => b.bm25Score - a.bm25Score)
                .map((doc, idx) => (
                  <div key={doc.id} className="rounded border border-amber-200 bg-white p-2.5 text-sm dark:border-amber-800 dark:bg-slate-900">
                    <div className="flex justify-between font-semibold">
                      <span>#{idx + 1} {doc.title}</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400">
                        score: {doc.bm25Score.toFixed(1)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-slate-600 dark:text-slate-400 font-mono text-sm">
                      {doc.snippet}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Colonne 3 : Hybride Gagnant */}
          <div className="rounded-lg border border-emerald-300 bg-emerald-50/50 p-4 dark:border-emerald-900/70 dark:bg-emerald-950/20">
            <div className="mb-3 border-b border-emerald-300 pb-2 dark:border-emerald-800">
              <span className="font-bold text-sm text-emerald-900 dark:text-emerald-300 block">
                3. Hybride Fusionné + Rerank
              </span>
              <span className="text-sm text-emerald-700 dark:text-emerald-400">
                Résultat transmis à Gemini
              </span>
            </div>
            <div className="space-y-2.5">
              {hybridSorted.map((doc, idx) => (
                <div
                  key={doc.id}
                  className={`rounded border p-2.5 text-sm transition ${
                    idx === 0
                      ? 'border-emerald-500 bg-emerald-100/70 dark:border-emerald-700 dark:bg-emerald-950/60 ring-2 ring-emerald-500'
                      : 'border-emerald-200 bg-white dark:border-emerald-900 dark:bg-slate-900'
                  }`}
                >
                  <div className="flex justify-between font-semibold">
                    <span className="flex items-center gap-1">
                      {idx === 0 && '👑'} #{idx + 1} {doc.title}
                    </span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      Rerank: {(doc.rerankScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-slate-600 dark:text-slate-300 font-mono text-sm">
                    {doc.snippet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 space-y-4">
          <h5 className="font-bold text-sm text-slate-900 dark:text-white">
            Formule Reciprocal Rank Fusion (RRF) :
          </h5>
          <div className="rounded bg-slate-900 p-3 font-mono text-sm text-emerald-400">
            RRF_Score(d) = (1 / (60 + Dense_Rank(d))) + (1 / (60 + BM25_Rank(d)))
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Cette formule normalise les scores des deux moteurs sans biais d&apos;échelle. Un document très bien placé dans l&apos;un des deux classements remonte immédiatement vers le top. Ensuite, le modèle Cross-Encoder réanalyse le texte complet pour attribuer la probabilité finale de pertinence.
          </p>
        </div>
      )}
    </div>
  );
};

