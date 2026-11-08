'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type QuestionKey = 'refund' | 'delivery' | 'mars';

export const RAGPipelineSimulator: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<QuestionKey>('refund');

  const scenarios: Record<
    QuestionKey,
    {
      question: string;
      label: string;
      embeddingPreview: string;
      qdrantScore: number;
      matchedDocument: string;
      chunkExcerpt: string;
      contextBuilt: string;
      geminiAnswer: string;
      status: 'grounded' | 'unsupported';
    }
  > = {
    refund: {
      question: "Combien de jours ai-je pour demander un remboursement après réception ?",
      label: "1. Délais de remboursement (Document interne présent)",
      embeddingPreview: "[0.124, -0.381, 0.742, 0.119, -0.048, 0.582, ... (768 dimensions)]",
      qdrantScore: 0.93,
      matchedDocument: "conditions-remboursement.pdf (Fragment #12)",
      chunkExcerpt: "« Le client dispose d'un délai légal et contractuel de 14 jours calendaires à compter de la réception du colis pour notifier sa demande de remboursement complet. »",
      contextBuilt: `[Source 1]
Document : conditions-remboursement.pdf (Fragment #12)
Contenu : Le client dispose d'un délai légal et contractuel de 14 jours calendaires à compter de la réception du colis pour notifier sa demande de remboursement complet.`,
      geminiAnswer: "Selon les conditions de remboursement de l'entreprise (Fragment #12), vous disposez d'un délai de 14 jours calendaires après la réception de votre colis pour formuler votre demande de remboursement complet.",
      status: 'grounded',
    },
    delivery: {
      question: "Quels sont les frais de livraison pour une commande de 60 euros ?",
      label: "2. Frais de port (Document interne présent)",
      embeddingPreview: "[-0.082, 0.514, 0.228, -0.419, 0.631, -0.115, ... (768 dimensions)]",
      qdrantScore: 0.89,
      matchedDocument: "guide-livraison.pdf (Fragment #04)",
      chunkExcerpt: "« La livraison standard en point relais est offerte pour tout panier supérieur ou égal à 50€. Pour les commandes inférieures, un forfait fixe de 4,90€ s'applique. »",
      contextBuilt: `[Source 1]
Document : guide-livraison.pdf (Fragment #04)
Contenu : La livraison standard en point relais est offerte pour tout panier supérieur ou égal à 50€. Pour les commandes inférieures, un forfait fixe de 4,90€ s'applique.`,
      geminiAnswer: "D'après le guide de livraison (Fragment #04), la livraison standard est totalement offerte pour toute commande atteignant ou dépassant 50€. Pour votre commande de 60 euros, les frais de port sont donc gratuits.",
      status: 'grounded',
    },
    mars: {
      question: "Quelle est la capitale officielle de la planète Mars ?",
      label: "3. Information absente de la base (Test anti-hallucination)",
      embeddingPreview: "[0.312, 0.088, -0.194, 0.421, -0.530, 0.217, ... (768 dimensions)]",
      qdrantScore: 0.24,
      matchedDocument: "Aucun document pertinent (Score < seuil minimal 0.70)",
      chunkExcerpt: "— Aucun fragment ne correspond à cette thématique dans la base de connaissances de l'entreprise —",
      contextBuilt: "— Contexte vide —",
      geminiAnswer: "Je ne trouve aucune information relative à la planète Mars dans les documents de votre base de connaissances. Conformément aux consignes de sécurité, je ne formule aucune supposition hors contexte.",
      status: 'unsupported',
    },
  };

  const current = scenarios[activeQuestion];

  return (
    <div className="my-8 rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm">
            <Icon name="database" className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Laboratoire Interactif : Simulation du Pipeline RAG de bout en bout
            </h4>
            <p className="text-sm text-slate-500">
              Observez comment une question se transforme en vecteur, interroge Qdrant, récupère le chunk MySQL et produit une réponse ancrée sans hallucination
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200">
          Qdrant + MySQL + Gemini
        </span>
      </div>

      {/* Question Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700">Sélectionnez une question test :</label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveQuestion('refund')}
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
              activeQuestion === 'refund'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {scenarios.refund.label}
          </button>
          <button
            type="button"
            onClick={() => setActiveQuestion('delivery')}
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
              activeQuestion === 'delivery'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {scenarios.delivery.label}
          </button>
          <button
            type="button"
            onClick={() => setActiveQuestion('mars')}
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
              activeQuestion === 'mars'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {scenarios.mars.label}
          </button>
        </div>
      </div>

      {/* Pipeline 4-step walkthrough */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step 1 & 2: Vectorization & Qdrant Search */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-sm font-bold text-slate-900">1. Vectorisation & Recherche Qdrant</span>
            <span
              className={`text-sm font-mono font-bold px-2 py-0.5 rounded-md ${
                current.qdrantScore >= 0.70
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              Cosine Score : {current.qdrantScore.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold">Question posée :</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">« {current.question} »</p>
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold">Vecteur embedding généré :</span>
            <p className="text-sm font-mono text-indigo-700 bg-white p-2 rounded-lg border border-slate-200 truncate mt-0.5">
              {current.embeddingPreview}
            </p>
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold">Résultat Top 1 dans Qdrant :</span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{current.matchedDocument}</p>
          </div>
        </div>

        {/* Step 3: MySQL Chunk Retrieved */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-sm font-bold text-slate-900">2. Passage récupéré dans MySQL</span>
            <span className="text-sm font-mono text-slate-500">SELECT FROM document_chunks</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 min-h-32 text-sm text-slate-700 leading-relaxed font-normal">
            {current.chunkExcerpt}
          </div>
        </div>
      </div>

      {/* Step 4: Final Gemini Answer */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Icon name="sparkles" className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-bold text-white">3. Réponse finale contextualisée de Gemini</span>
          </div>
          <span
            className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${
              current.status === 'grounded'
                ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30'
            }`}
          >
            {current.status === 'grounded' ? '✓ Réponse ancrée et vérifiable' : '⚠ Refus propre anti-hallucination'}
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
          {current.geminiAnswer}
        </p>

        {current.status === 'grounded' && (
          <div className="pt-2 border-t border-slate-800 text-sm text-slate-400 flex items-center gap-2">
            <Icon name="document-text" className="w-4 h-4 text-indigo-400" />
            <span>Source citée : <strong>{current.matchedDocument}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
};

