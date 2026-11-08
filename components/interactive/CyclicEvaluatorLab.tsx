'use client';

import React, { useState } from 'react';

interface CycleIteration {
  iteration: number;
  draft: string;
  score: number;
  critique: string;
  decision: 'LOOP_AGAIN' | 'APPROVE_END';
}

export const CyclicEvaluatorLab: React.FC = () => {
  const [qualityThreshold, setQualityThreshold] = useState<number>(8.5);
  const [activeStep, setActiveStep] = useState<'idle' | 'generating' | 'evaluating' | 'finished'>('idle');
  const [history, setHistory] = useState<CycleIteration[]>([]);
  const [currentIteration, setCurrentIteration] = useState<number>(0);

  const iterationsData: CycleIteration[] = [
    {
      iteration: 1,
      draft: 'Le cloud computing permet d\'héberger des serveurs sur internet pour stocker des fichiers et faire tourner des applications sans matériel physique chez soi.',
      score: 6.0,
      critique: 'Texte trop simpliste et informel. Il manque la distinction des modèles IaaS/PaaS/SaaS, la notion d\'élasticité et le modèle de tarification à l\'usage.',
      decision: 'LOOP_AGAIN',
    },
    {
      iteration: 2,
      draft: 'Le cloud computing est un paradigme informatique fournissant des ressources à la demande (serveurs, stockage, bases de données) selon un modèle IaaS, PaaS ou SaaS avec facturation à l\'usage.',
      score: 7.8,
      critique: 'Bonne progression technique. Pour atteindre l\'excellence professionnelle, explicitez l\'élasticité automatique (auto-scaling) et la haute disponibilité multi-régions.',
      decision: 'LOOP_AGAIN',
    },
    {
      iteration: 3,
      draft: 'Le cloud computing est un modèle d\'accès réseau à un pool partagé de ressources informatiques configurables (IaaS, PaaS, SaaS). Il garantit une élasticité dynamique par auto-scaling, une haute disponibilité multi-zones et une optimisation financière stricte à l\'usage.',
      score: 9.4,
      critique: 'Excellente synthèse technique, exhaustive, rigoureuse et conforme aux standards professionnels.',
      decision: 'APPROVE_END',
    },
  ];

  const runIterativeCycle = async () => {
    setHistory([]);
    setCurrentIteration(0);

    for (let i = 0; i < iterationsData.length; i++) {
      const iter = iterationsData[i];
      setCurrentIteration(iter.iteration);

      // Node A : Générateur
      setActiveStep('generating');
      await new Promise((r) => setTimeout(r, 700));

      // Node B : Évaluateur
      setActiveStep('evaluating');
      await new Promise((r) => setTimeout(r, 800));

      const isApproved = iter.score >= qualityThreshold || iter.iteration === 3;
      const recorded: CycleIteration = {
        ...iter,
        decision: isApproved ? 'APPROVE_END' : 'LOOP_AGAIN',
      };

      setHistory((prev) => [...prev, recorded]);

      if (isApproved) {
        break;
      }
    }

    setActiveStep('finished');
  };

  const resetLab = () => {
    setActiveStep('idle');
    setHistory([]);
    setCurrentIteration(0);
  };

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Cycles &amp; Boucles de Rétroaction LangGraph
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez un graphe cyclique LangGraph où un nœud Évaluateur renvoie le flux vers le Générateur jusqu&apos;à validation du seuil.
          </p>
        </div>
        <button
          onClick={resetLab}
          className="self-start rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          Réinitialiser
        </button>
      </div>

      {/* Réglage du seuil de tolérance */}
      <div className="mb-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mb-1">
            Seuil de Qualité Requis pour Sortir du Cycle (addConditionalEdges) :
          </label>
          <span className="text-sm text-slate-500">
            Si le score est inférieur, le graphe réinjecte la critique dans le State.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min="7.0"
            max="9.0"
            step="0.5"
            value={qualityThreshold}
            disabled={activeStep !== 'idle' && activeStep !== 'finished'}
            onChange={(e) => setQualityThreshold(Number(e.target.value))}
            className="w-36 cursor-pointer accent-indigo-600"
          />
          <span className="font-mono text-base font-bold text-indigo-600 dark:text-indigo-400 min-w-[50px]">
            {qualityThreshold.toFixed(1)} / 10
          </span>
        </div>
      </div>

      {/* Déclencheur du cycle */}
      <div className="mb-6">
        <button
          onClick={runIterativeCycle}
          disabled={activeStep === 'generating' || activeStep === 'evaluating'}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {activeStep === 'generating' || activeStep === 'evaluating'
            ? 'Boucle LangGraph en cours d\'exécution...'
            : '▶ Démarrer le Graphe Cyclique (StateGraph)'}
        </button>
      </div>

      {/* Schéma d'état en direct */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
        {/* Nœud Générateur */}
        <div
          className={`rounded-xl border p-4 text-center transition ${
            activeStep === 'generating'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 ring-2 ring-indigo-500 shadow animate-pulse'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="font-bold text-sm text-slate-900 dark:text-white">
            1. GeneratorNode
          </div>
          <div className="text-sm text-slate-500 mt-1">Rédige ou révise la réponse</div>
          {currentIteration > 0 && (
            <span className="mt-2 inline-block rounded bg-indigo-100 px-2 py-0.5 text-sm font-semibold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              Passe #{currentIteration}
            </span>
          )}
        </div>

        {/* Transition Conditionnelle */}
        <div className="text-center">
          <div className="font-mono text-sm font-bold text-slate-700 dark:text-slate-300">
            addConditionalEdges()
          </div>
          <div className="mt-1 text-sm text-slate-500">
            {activeStep === 'evaluating'
              ? '⚖️ Évaluation en cours...'
              : 'score >= ' + qualityThreshold + ' ? END : LOOP'}
          </div>
        </div>

        {/* Nœud Évaluateur */}
        <div
          className={`rounded-xl border p-4 text-center transition ${
            activeStep === 'evaluating'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500 shadow animate-pulse'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="font-bold text-sm text-slate-900 dark:text-white">
            2. EvaluatorNode (Critique)
          </div>
          <div className="text-sm text-slate-500 mt-1">Attribue une note et un feedback</div>
          {activeStep === 'finished' && (
            <span className="mt-2 inline-block rounded bg-emerald-100 px-2 py-0.5 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Objectif Atteint ✓
            </span>
          )}
        </div>
      </div>

      {/* Historique des itérations */}
      {history.length > 0 && (
        <div className="space-y-3">
          <span className="font-bold text-sm text-slate-900 dark:text-white block">
            Trajectoire des mutations d&apos;état (State Evolution) :
          </span>

          {history.map((h) => (
            <div
              key={h.iteration}
              className={`rounded-lg border p-4 text-sm transition ${
                h.decision === 'APPROVE_END'
                  ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30'
                  : 'border-amber-300 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">
                  Itération #{h.iteration} — Note obtenue :{' '}
                  <span
                    className={`font-mono text-base ${
                      h.decision === 'APPROVE_END' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                    }`}
                  >
                    {h.score} / 10
                  </span>
                </span>

                <span
                  className={`rounded px-2 py-0.5 text-sm font-semibold ${
                    h.decision === 'APPROVE_END'
                      ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200'
                      : 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200'
                  }`}
                >
                  {h.decision === 'APPROVE_END' ? 'Sortie vers END ✓' : 'Boucle de rétroaction ↻'}
                </span>
              </div>

              <div className="mb-2 font-mono text-sm text-slate-800 dark:text-slate-200">
                <strong>Texte généré :</strong> &ldquo;{h.draft}&rdquo;
              </div>

              <div className="text-sm italic text-slate-600 dark:text-slate-400">
                <strong>Critique réinjectée :</strong> {h.critique}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

