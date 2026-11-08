'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

export const ToolLoopSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: '1. Demande Utilisateur & Déclaration des Outils',
      actor: 'Frontend / Client',
      badge: 'Requête Initiale',
      code: `const interaction = await ai.interactions.create({
  model: GEMINI_MODEL,
  input: "Quel est le statut de ma commande 125 ?",
  tools: [getOrderTool] // get_order_status
});`,
      explanation:
        'L\'application envoie la question de l\'utilisateur accompagnée du schéma JSON décrivant la fonction autorisée get_order_status.',
    },
    {
      step: 2,
      title: '2. Gemini décide d\'appeler un outil (Function Call)',
      actor: 'Modèle Gemini',
      badge: 'Décision IA',
      code: `// Gemini ne répond pas en texte, mais demande une action :
interaction.steps = [
  {
    type: "function_call",
    name: "get_order_status",
    arguments: { order_id: 125 }
  }
];`,
      explanation:
        'Gemini n\'a pas accès direct à la base de données : il formule une intention précise avec les arguments identifiés (order_id: 125).',
    },
    {
      step: 3,
      title: '3. Exécution métier sécurisée côté serveur',
      actor: 'Backend Node.js / Express',
      badge: 'Exécution Applicative',
      code: `// Le serveur contrôle les droits de l'utilisateur, puis appelle la BDD :
const orderStatus = await getOrderStatus(125);
// Résultat interne : "En cours de préparation"`,
      explanation:
        'Le serveur vérifie les autorisations de l\'utilisateur avant d\'interroger le service métier. Le modèle n\'a aucun privilège direct.',
    },
    {
      step: 4,
      title: '4. Renvoi du résultat et réponse finale synthétisée',
      actor: 'Gemini & Application',
      badge: 'Boucle Complète',
      code: `const finalInteraction = await ai.interactions.create({
  model: GEMINI_MODEL,
  previous_interaction_id: interaction.id,
  input: [{
    type: "function_result",
    name: "get_order_status",
    result: "En cours de préparation"
  }]
});
// finalInteraction.output_text :
// « Votre commande n°125 est actuellement en cours de préparation. »`,
      explanation:
        'Gemini reçoit le résultat vérifié de la fonction et génère une réponse polie et contextualisée pour l\'utilisateur final.',
    },
  ];

  const current = steps[currentStep - 1];

  return (
    <div className="my-8 rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Icon name="bot" className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Simulateur Pédagogique : La Boucle du Function Calling
            </h4>
            <p className="text-sm text-slate-500">
              Naviguez à travers les 4 temps de l&apos;orchestration d&apos;outils externes avec Gemini
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
          Étape {currentStep} / 4
        </span>
      </div>

      {/* Steps Progress Indicator */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setCurrentStep(s.step)}
            className={`p-2.5 rounded-xl border text-left transition ${
              currentStep === s.step
                ? 'border-indigo-600 bg-indigo-50/70 shadow-sm'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <span
              className={`block text-sm font-bold uppercase ${
                currentStep === s.step ? 'text-indigo-600' : 'text-slate-400'
              }`}
            >
              Étape {s.step}
            </span>
            <span className="text-sm font-bold text-slate-800 line-clamp-1 mt-0.5">
              {s.actor}
            </span>
          </button>
        ))}
      </div>

      {/* Step Detail Card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-bold text-slate-900">{current.title}</h5>
          <span className="text-sm font-semibold px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
            {current.badge}
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{current.explanation}</p>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm font-mono text-indigo-200 overflow-x-auto leading-relaxed">
          <pre className="whitespace-pre font-mono m-0 p-0 bg-transparent">{current.code}</pre>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <Icon name="arrow-left" className="w-4 h-4" />
          <span>Étape précédente</span>
        </button>

        <button
          type="button"
          disabled={currentStep === 4}
          onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <span>Étape suivante</span>
          <Icon name="arrow-right" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

