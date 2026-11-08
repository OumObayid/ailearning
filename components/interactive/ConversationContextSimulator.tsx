'use client';

import React, { useState } from 'react';

interface InteractionNode {
  id: string;
  userMessage: string;
  geminiReply: string;
  previousId: string | null;
  tokensConsumed: number;
}

export const ConversationContextSimulator: React.FC = () => {
  const [mode, setMode] = useState<'with_context' | 'without_context'>('with_context');
  const [selectedTurn, setSelectedTurn] = useState<number>(0);

  const turns: InteractionNode[] = [
    {
      id: 'int_98a1f4b2',
      userMessage: "Bonjour, je m'appelle Alice et je prépare un marathon à Lyon.",
      geminiReply: "Bonjour Alice ! Félicitations pour ce projet. Le marathon de Lyon est magnifique. Par où souhaites-tu commencer ton plan d'entraînement ?",
      previousId: null,
      tokensConsumed: 48,
    },
    {
      id: 'int_77c4e1a0',
      userMessage: "Quel est mon prénom et quel défi sportif est-ce que je prépare ?",
      geminiReply: "Tu t'appelles Alice et tu prépares le marathon de Lyon !",
      previousId: 'int_98a1f4b2',
      tokensConsumed: 72,
    },
    {
      id: 'int_33d9f8e5',
      userMessage: "Combien de sorties par semaine me conseilles-tu selon mon prénom ?",
      geminiReply: "Alice, pour préparer un marathon dans de bonnes conditions, 3 à 4 sorties hebdomadaires sont idéales.",
      previousId: 'int_77c4e1a0',
      tokensConsumed: 96,
    },
  ];

  const currentTurn = turns[selectedTurn];

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-0.5 text-sm font-bold text-indigo-700">
              Lab Interactif
            </span>
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-0.5 text-sm font-bold text-emerald-700">
              Interactions API
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
            Simulateur de Continuité Contextuelle & previous_interaction_id
          </h4>
        </div>

        {/* Sélecteur de mode */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setMode('with_context')}
            className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${
              mode === 'with_context'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Avec previous_interaction_id
          </button>
          <button
            onClick={() => setMode('without_context')}
            className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${
              mode === 'without_context'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sans contexte (Requêtes isolées)
          </button>
        </div>
      </div>

      {/* Explication du mode */}
      <div className={`mt-5 p-4 rounded-2xl border ${
        mode === 'with_context'
          ? 'bg-indigo-50/60 border-indigo-200 text-indigo-950'
          : 'bg-rose-50/60 border-rose-200 text-rose-950'
      }`}>
        <p className="text-sm leading-relaxed">
          {mode === 'with_context' ? (
            <>
              <strong>Mode Connecté :</strong> Le SDK envoie <code>previous_interaction_id</code> pointant vers la requête précédente. Les serveurs de Google raccordent automatiquement l&apos;historique sans que vous ayez à réexpédier tous les textes précédents.
            </>
          ) : (
            <>
              <strong>Mode Amnésique (Stateless) :</strong> Chaque requête est envoyée sans identifiant de liaison. Le modèle ne sait pas qui vous êtes et ne dispose d&apos;aucun souvenir des messages précédents.
            </>
          )}
        </p>
      </div>

      {/* Chronologie des tours conversationnels */}
      <div className="mt-6">
        <label className="text-sm font-bold text-slate-700 block mb-2">
          Sélectionner le tour de conversation :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {turns.map((t, index) => (
            <button
              key={t.id}
              onClick={() => setSelectedTurn(index)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedTurn === index
                  ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-extrabold text-slate-800">Tour {index + 1}</span>
                <span className="font-mono text-sm px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {t.id.slice(0, 8)}
                </span>
              </div>
              <p className="text-sm text-slate-600 truncate">{t.userMessage}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Visualisation de l'échange */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requête et Paramètres */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-700">Appel SDK généré :</span>
              <span className="text-sm font-mono text-indigo-600">ai.interactions.create(...)</span>
            </div>
            <pre className="text-sm font-mono bg-slate-900 text-slate-100 p-3 rounded-xl overflow-x-auto">
{`await ai.interactions.create({
  model: "gemini-2.5-flash",
  input: "${currentTurn.userMessage}",
${mode === 'with_context' && currentTurn.previousId ? `  previous_interaction_id: "${currentTurn.previousId}"\n` : ''}});`}
            </pre>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 bg-white">
            <span className="text-sm font-bold text-slate-700 block mb-2">Métriques d&apos;échange :</span>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">ID Actuel</span>
                <span className="font-mono font-bold text-slate-800">{currentTurn.id}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Lien Parent</span>
                <span className="font-mono font-bold text-slate-800">
                  {mode === 'with_context' ? (currentTurn.previousId || 'null (Racine)') : 'null (Isolé)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Réponse simulée de l'IA */}
        <div className="rounded-2xl border border-slate-200 p-5 bg-white flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                AI
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">Réponse de Gemini</span>
                <span className="text-sm text-slate-500 block">
                  {mode === 'with_context' ? 'Contexte actif' : 'Mémoire indisponible'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-800 min-h-[120px]">
              {mode === 'with_context' ? (
                currentTurn.geminiReply
              ) : selectedTurn === 0 ? (
                currentTurn.geminiReply
              ) : (
                <span className="text-rose-700">
                  ⚠️ <em>« Je ne connais ni votre prénom ni votre projet sportif, car vous ne me l&apos;avez pas précisé dans ce message. Pourriez-vous me redonner ces informations ? »</em>
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Tokens d&apos;entrée estimés : {currentTurn.tokensConsumed}</span>
            <span className="font-semibold text-emerald-600">✓ Inférence réussie</span>
          </div>
        </div>
      </div>
    </div>
  );
};
