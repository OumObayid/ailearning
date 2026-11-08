'use client';

import React, { useState } from 'react';

interface VisionSample {
  id: string;
  title: string;
  category: string;
  mimeType: string;
  imageVisual: string;
  extractedText: string;
  tags: string[];
  aiDescription: string;
  structuredJson: Record<string, unknown>;
}

export const MultimodalVisionSimulator: React.FC = () => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>('receipt');
  const [activeTab, setActiveTab] = useState<'description' | 'structured' | 'request'>('description');

  const samples: VisionSample[] = [
    {
      id: 'receipt',
      title: 'Facture / Reçu de caisse',
      category: 'Extraction documentaire (OCR)',
      mimeType: 'image/jpeg',
      imageVisual: '🧾 TICKET COMMERCE - CAFE DE LA PAIX - TOTAL: 42.50 € - TVA 20%',
      extractedText: "CAFE DE LA PAIX\n12 Bd des Capucines, 75009 Paris\nDate: 14/04/2026 12:45\n1x Menu Déjeuner: 28.00 €\n1x Café Expresso: 3.50 €\n1x Bouteille Eau: 5.00 €\n1x Tarte Tatin: 6.00 €\nTOTAL TTC: 42.50 €\nDONT TVA (20%): 7.08 €",
      tags: ['Restauration', 'Facturation', 'Notes de frais'],
      aiDescription: "L'image présente un ticket de caisse imprimé du restaurant 'Café de la Paix' à Paris daté du 14 avril 2026. L'addition comprend un menu du midi, un café, une eau minérale et un dessert pour un montant total de 42,50 € TTC incluant 7,08 € de TVA.",
      structuredJson: {
        merchant: 'Café de la Paix',
        address: '12 Bd des Capucines, 75009 Paris',
        date: '2026-04-14T12:45:00',
        currency: 'EUR',
        totalTTC: 42.5,
        vatAmount: 7.08,
        items: [
          { label: 'Menu Déjeuner', price: 28.0 },
          { label: 'Café Expresso', price: 3.5 },
          { label: 'Bouteille Eau', price: 5.0 },
          { label: 'Tarte Tatin', price: 6.0 },
        ],
      },
    },
    {
      id: 'product',
      title: 'Photographie de produit',
      category: 'E-commerce & Vision',
      mimeType: 'image/png',
      imageVisual: '🎧 CASQUE SANS FIL NOIR - FINITION MAT - COUSSINETS CUIR',
      extractedText: "Marque 'AeroSound Pro' gravée sur l'arceau supérieur. Boutons de volume visibles sur l'oreillette droite.",
      tags: ['Audio', 'High-Tech', 'Accessibilité'],
      aiDescription: "Un casque audio sans fil supra-aural noir avec arceau rembourré et oreillettes en similicuir. Le design est moderne, minimaliste avec des finitions en aluminium brossé.",
      structuredJson: {
        productType: 'Casque audio circum-aural sans fil',
        color: 'Noir mat',
        connectivity: ['Bluetooth 5.3', 'Jack 3.5mm'],
        materials: ['Aluminium brossé', 'Similicuir à mémoire de forme'],
        condition: 'Neuf / Excellent état',
        suggestedCategory: 'Électronique & Son',
      },
    },
    {
      id: 'diagram',
      title: "Schéma d'architecture technique",
      category: 'Compréhension de diagrammes',
      mimeType: 'image/webp',
      imageVisual: '📊 SCHÉMA : CLIENT REACT ➔ REVERSE PROXY NGINX ➔ API EXPRESS ➔ MYSQL / QDRANT',
      extractedText: "Diagramme Mermaid : Browser -> Nginx -> Express API -> MySQL & Qdrant",
      tags: ['Architecture', 'Cloud', 'Systèmes distribués'],
      aiDescription: "Ce diagramme schématise une architecture web multi-tiers : un client web React communique via un proxy inverse Nginx sécurisé vers un serveur Node.js/Express, relié à une base relationnelle MySQL et une base vectorielle Qdrant.",
      structuredJson: {
        architectureType: '5-tiers distribuée',
        frontend: 'React SPA',
        gateway: 'Nginx (TLS termination & Rate limiting)',
        backend: 'Express Node.js',
        databases: ['MySQL 8.0 (Relationnel)', 'Qdrant (Vectoriel)'],
      },
    },
  ];

  const currentSample = samples.find((s) => s.id === selectedSampleId) || samples[0];

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-0.5 text-sm font-bold text-purple-700">
              Lab Multimodal
            </span>
            <span className="inline-flex items-center rounded-md bg-cyan-50 px-2.5 py-0.5 text-sm font-bold text-cyan-800">
              Vision & OCR
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
            Simulateur d&apos;Analyse Multimodale d&apos;Images & Documents
          </h4>
        </div>

        {/* Sélecteur d'échantillons */}
        <div className="flex gap-2">
          {samples.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSampleId(s.id)}
              className={`px-3 py-1.5 text-sm font-bold rounded-xl transition-all ${
                selectedSampleId === s.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {s.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Détails du fichier et aperçu */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Aperçu virtuel du fichier */}
        <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Fichier injecté :</span>
            <span className="text-sm font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
              {currentSample.mimeType}
            </span>
          </div>

          <div className="h-44 rounded-xl border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 p-4 flex flex-col items-center justify-center text-center shadow-inner">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-600 mb-2 font-bold text-xl">
              📷
            </div>
            <p className="text-sm font-extrabold text-slate-800">{currentSample.title}</p>
            <p className="text-sm text-slate-500 mt-1">{currentSample.category}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {currentSample.tags.map((tag) => (
              <span key={tag} className="text-sm font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Analyse cognitive de Gemini */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 p-5 bg-white space-y-4 shadow-sm">
          {/* Navigation par onglets */}
          <div className="flex border-b border-slate-100 pb-3 gap-2">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'description'
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Description & Vision
            </button>
            <button
              onClick={() => setActiveTab('structured')}
              className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'structured'
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sortie JSON Structurée
            </button>
            <button
              onClick={() => setActiveTab('request')}
              className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'request'
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Requête SDK @google/genai
            </button>
          </div>

          {/* Contenu onglet */}
          {activeTab === 'description' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 text-sm leading-relaxed text-slate-800">
                <span className="font-bold text-purple-900 block mb-1">Synthèse visuelle de l&apos;IA :</span>
                {currentSample.aiDescription}
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Texte extrait via OCR natif :</span>
                <pre className="whitespace-pre-wrap font-sans text-sm">{currentSample.extractedText}</pre>
              </div>
            </div>
          )}

          {activeTab === 'structured' && (
            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                Extraction validée par schéma Zod (JSON pur sans balisage Markdown) :
              </p>
              <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-sm overflow-x-auto max-h-60">
                {JSON.stringify(currentSample.structuredJson, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'request' && (
            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                Payload binaire base64 transmis au SDK officiel :
              </p>
              <pre className="p-4 rounded-xl bg-slate-900 text-purple-300 font-mono text-sm overflow-x-auto">
{`const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: [
    {
      inlineData: {
        mimeType: "${currentSample.mimeType}",
        data: "iVBORw0KGgoAAAANSUhEUgAA..." // Buffer base64
      }
    },
    { text: "Extrais les données de cette image sous forme de JSON." }
  ]
});`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
