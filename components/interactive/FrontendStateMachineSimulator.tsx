'use client';

import React, { useState } from 'react';

type StatePhase = 'idle' | 'validating' | 'loading' | 'success' | 'network_error' | 'validation_error';

export const FrontendStateMachineSimulator: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<StatePhase>('idle');
  const [promptInput, setPromptInput] = useState<string>('Explique la différence entre SSR et SPA.');
  const [simulateServerCrash, setSimulateServerCrash] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const runSimulation = () => {
    // 1. Phase de validation client
    setCurrentPhase('validating');
    setIsButtonDisabled(true);

    setTimeout(() => {
      if (!promptInput.trim()) {
        setCurrentPhase('validation_error');
        setIsButtonDisabled(false);
        return;
      }
      if (promptInput.length > 300) {
        setCurrentPhase('validation_error');
        setIsButtonDisabled(false);
        return;
      }

      // 2. Phase de chargement réseau
      setCurrentPhase('loading');

      setTimeout(() => {
        if (simulateServerCrash) {
          // Simulation de panne réseau HTTP 500
          setCurrentPhase('network_error');
          setIsButtonDisabled(false);
        } else {
          // Succès nominal
          setCurrentPhase('success');
          setIsButtonDisabled(false);
        }
      }, 1500);
    }, 600);
  };

  const resetState = () => {
    setCurrentPhase('idle');
    setIsButtonDisabled(false);
  };

  const states = [
    { id: 'idle', label: '1. Repos (IDLE)', color: 'bg-slate-100 text-slate-700 border-slate-300' },
    { id: 'validating', label: '2. Validation Client', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    { id: 'loading', label: '3. En vol (LOADING)', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { id: 'success', label: '4. Succès (SUCCESS)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { id: 'error', label: '5. Erreur (ERROR)', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  ];

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-0.5 text-sm font-bold text-indigo-700">
              Lab Architecture Frontend
            </span>
            <span className="inline-flex items-center rounded-md bg-cyan-50 px-2.5 py-0.5 text-sm font-bold text-cyan-800">
              Machine à États Finis
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
            Simulateur de Machine à États d&apos;une Interaction IA
          </h4>
        </div>

        <button
          onClick={resetState}
          className="px-3 py-1.5 text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
        >
          🔄 Réinitialiser
        </button>
      </div>

      {/* Cartographie visuelle des états de la machine */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
        {states.map((st) => {
          const isActive =
            (st.id === 'idle' && currentPhase === 'idle') ||
            (st.id === 'validating' && currentPhase === 'validating') ||
            (st.id === 'loading' && currentPhase === 'loading') ||
            (st.id === 'success' && currentPhase === 'success') ||
            (st.id === 'error' && (currentPhase === 'network_error' || currentPhase === 'validation_error'));

          return (
            <div
              key={st.id}
              className={`p-3 rounded-2xl border text-center transition-all ${
                isActive
                  ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-md font-extrabold'
                  : 'border-slate-200 bg-slate-50 opacity-60 font-semibold'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full mx-auto block mb-1.5 ${
                isActive ? 'bg-indigo-600 animate-ping' : 'bg-slate-300'
              }`} />
              <span className="text-sm block">{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Formulaire de test interactif */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4 rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
          <span className="text-sm font-bold text-slate-800 block">Formulaire de requête utilisateur :</span>

          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            disabled={isButtonDisabled}
            rows={3}
            className="w-full p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Saisissez un prompt ou laissez vide pour tester l'erreur..."
          />

          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Longueur : {promptInput.length} / 300 caractères</span>
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-rose-700">
              <input
                type="checkbox"
                checked={simulateServerCrash}
                onChange={(e) => setSimulateServerCrash(e.target.checked)}
                className="accent-rose-600 rounded"
              />
              Simuler panne réseau (500)
            </label>
          </div>

          <button
            onClick={runSimulation}
            disabled={isButtonDisabled}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20"
          >
            {currentPhase === 'loading'
              ? '⏳ Appel en vol (Bouton désactivé)...'
              : currentPhase === 'validating'
              ? '🔍 Validation client Zod...'
              : 'Déclencher la requête IA ➔'}
          </button>
        </div>

        {/* Panneau de rendu visuel pour l'utilisateur */}
        <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <span className="text-sm font-bold text-slate-700">Rendu visuel dans le composant React :</span>
              <span className="text-sm font-mono text-indigo-700 font-bold uppercase">
                status = &apos;{currentPhase}&apos;
              </span>
            </div>

            {currentPhase === 'idle' && (
              <p className="text-sm text-slate-500 italic py-6 text-center">
                L&apos;interface est prête. En attente de saisie de l&apos;utilisateur.
              </p>
            )}

            {currentPhase === 'validating' && (
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-sm text-indigo-900 font-semibold animate-pulse">
                🔍 Contrôle local : vérification que le prompt est non vide et conforme au schéma Zod...
              </div>
            )}

            {currentPhase === 'loading' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900 flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin shrink-0" />
                <span>Requête transmise à Express. Le bouton d&apos;envoi est verrouillé pour prévenir tout double-clic parasite.</span>
              </div>
            )}

            {currentPhase === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-950 space-y-1">
                <span className="font-extrabold text-emerald-800 block">✅ Réponse reçue avec succès :</span>
                <p className="leading-relaxed">
                  Le SSR (Server-Side Rendering) pré-génère le HTML sur le serveur pour chaque requête, offrant un SEO optimal. La SPA (Single Page Application) délègue le rendu au navigateur pour une interactivité fluide.
                </p>
              </div>
            )}

            {currentPhase === 'validation_error' && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-950 space-y-1">
                <span className="font-extrabold text-rose-800 block">⚠️ Échec du contrôle client (Zéro coût d&apos;API) :</span>
                <p>Le prompt est vide ou dépasse le plafond autorisé de 300 caractères. La requête n&apos;a pas été envoyée au serveur.</p>
              </div>
            )}

            {currentPhase === 'network_error' && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-950 space-y-1">
                <span className="font-extrabold text-rose-800 block">❌ Erreur serveur interceptée (HTTP 500) :</span>
                <p>Le serveur backend a échoué. L&apos;application affiche une bannière explicative sans faire planter l&apos;interface (pas d&apos;écran blanc).</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-sm text-slate-500 flex justify-between">
            <span>Règle d&apos;or : Bouton désactivé dès la validation</span>
            <span className="font-semibold text-indigo-700">UX Résiliente</span>
          </div>
        </div>
      </div>
    </div>
  );
};

