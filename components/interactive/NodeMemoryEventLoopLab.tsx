'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

export const NodeMemoryEventLoopLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'memory' | 'eventloop'>('memory');

  // Memory simulation state
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [heapUsedMB, setHeapUsedMB] = useState<number>(14.2);
  const [heapTotalMB, setHeapTotalMB] = useState<number>(24.0);
  const [rssMB, setRssMB] = useState<number>(45.5);
  const [gcTriggered, setGcTriggered] = useState<boolean>(false);

  const handleAddItems = () => {
    setGcTriggered(false);
    setItemsCount((prev) => prev + 10000);
    setHeapUsedMB((prev) => Number((prev + 8.4).toFixed(1)));
    setHeapTotalMB((prev) => Number((prev + 10.0).toFixed(1)));
    setRssMB((prev) => Number((prev + 12.2).toFixed(1)));
  };

  const handleClearMemory = () => {
    setGcTriggered(true);
    setItemsCount(0);
    // HeapUsed drops as references are released; RSS stays retained by V8 until OS reclaim
    setHeapUsedMB(15.1);
  };

  // Event loop simulation state
  const [currentStep, setCurrentStep] = useState<number>(0);

  const eventLoopSteps = [
    {
      callStack: 'global()',
      microtasks: 'vide',
      timers: 'vide',
      output: '1 - Début du programme',
      explanation: 'Exécution du code synchrone : le premier console.log() s\'exécute immédiatement sur le Call Stack.',
    },
    {
      callStack: 'setTimeout(cb, 0)',
      microtasks: 'vide',
      timers: '[cb: 2 - Timer]',
      output: '1 - Début du programme',
      explanation: 'setTimeout enregistre son callback dans la file des Timers de libuv et rend la main sans bloquer.',
    },
    {
      callStack: 'Promise.resolve().then(cb)',
      microtasks: '[cb: 3 - Promise]',
      timers: '[cb: 2 - Timer]',
      output: '1 - Début du programme',
      explanation: 'La Promise résolue place immédiatement sa microtask dans la Microtask Queue (haute priorité).',
    },
    {
      callStack: 'process.nextTick(cb)',
      microtasks: '[nextTick: 4 - NextTick, Promise: 3 - Promise]',
      timers: '[cb: 2 - Timer]',
      output: '1 - Début du programme',
      explanation: 'process.nextTick est inséré en tête de file des microtâches (prioritaire devant les Promises).',
    },
    {
      callStack: 'console.log("6 - Fin")',
      microtasks: '[nextTick, Promise]',
      timers: '[cb: 2 - Timer]',
      output: '1 - Début du programme\n6 - Fin du programme',
      explanation: 'Dernière instruction synchrone exécutée. Le Call Stack principal se vide maintenant.',
    },
    {
      callStack: 'exécute nextTick queue',
      microtasks: '[Promise: 3 - Promise]',
      timers: '[cb: 2 - Timer]',
      output: '1 - Début du programme\n6 - Fin du programme\n4 - NextTick',
      explanation: 'Call Stack vide : vidage immédiat des callbacks process.nextTick().',
    },
    {
      callStack: 'exécute Microtask queue (Promise)',
      microtasks: 'vide',
      timers: '[cb: 2 - Timer]',
      output: '1 - Début du programme\n6 - Fin du programme\n4 - NextTick\n3 - Promise',
      explanation: 'La file des microtâches Promise est consommée avant toute reprise des phases de l\'Event Loop.',
    },
    {
      callStack: 'Phase Timers libuv -> cb Timer',
      microtasks: 'vide',
      timers: 'vide',
      output: '1 - Début du programme\n6 - Fin du programme\n4 - NextTick\n3 - Promise\n2 - Timer',
      explanation: 'L\'Event Loop entre dans la phase Timers : le callback du timer échu est enfin exécuté !',
    },
  ];

  const handleNextStep = () => {
    if (currentStep < eventLoopSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleResetLoop = () => {
    setCurrentStep(0);
  };

  return (
    <div className="my-8 rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-2 border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-800">
            <Icon name="cpu" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Laboratoire Interactif : Mémoire &amp; Event Loop Node.js
            </h3>
            <p className="text-base text-slate-800 font-semibold">
              Manipulez en temps réel la RAM et observez le cheminement des microtasks
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-100 p-1 border-2 border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('memory')}
            className={`rounded-lg px-3.5 py-2 text-sm font-black transition ${
              activeTab === 'memory'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            Allocation RAM &amp; GC
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('eventloop')}
            className={`rounded-lg px-3.5 py-2 text-sm font-black transition ${
              activeTab === 'eventloop'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            Ordonnanceur Event Loop
          </button>
        </div>
      </div>

      {/* Tab 1: Memory & GC */}
      {activeTab === 'memory' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-4 text-center">
              <span className="text-xs uppercase font-extrabold text-slate-700">Objets en Heap</span>
              <p className="mt-1 text-2xl font-black text-slate-950">{itemsCount.toLocaleString()}</p>
              <span className="text-xs text-slate-600 font-semibold">tableau utilisateurs[]</span>
            </div>
            <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/50 p-4 text-center">
              <span className="text-xs uppercase font-extrabold text-indigo-900">heapUsed</span>
              <p className="mt-1 text-2xl font-black text-indigo-950">{heapUsedMB} MB</p>
              <span className="text-xs text-indigo-800 font-semibold">Objets actifs en RAM</span>
            </div>
            <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-4 text-center">
              <span className="text-xs uppercase font-extrabold text-slate-700">heapTotal</span>
              <p className="mt-1 text-2xl font-black text-slate-950">{heapTotalMB} MB</p>
              <span className="text-xs text-slate-600 font-semibold">Alloué par le moteur V8</span>
            </div>
            <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-4 text-center">
              <span className="text-xs uppercase font-extrabold text-slate-700">RSS (Processus)</span>
              <p className="mt-1 text-2xl font-black text-slate-950">{rssMB} MB</p>
              <span className="text-xs text-slate-600 font-semibold">Mémoire physique totale</span>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleAddItems}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-bold text-white shadow-sm hover:bg-indigo-500 transition focus:outline-none"
            >
              <Icon name="sparkles" className="w-5 h-5" />
              <span>Simuler route /add (+10 000 objets)</span>
            </button>

            <button
              type="button"
              onClick={handleClearMemory}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-rose-300 bg-rose-50 px-5 py-3 text-base font-bold text-rose-950 hover:bg-rose-100 transition focus:outline-none"
            >
              <Icon name="x" className="w-5 h-5 text-rose-700" />
              <span>Simuler route /clear (Libérer références)</span>
            </button>
          </div>

          {/* Pedagogical Note */}
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-4.5 text-base font-semibold text-slate-900 leading-relaxed">
            {gcTriggered ? (
              <p>
                💡 <strong className="text-indigo-950 font-black">Observation clé :</strong> En vidant le tableau global, les objets deviennent inaccessibles. <strong className="text-indigo-950 font-black">heapUsed</strong> chute car la mémoire est libérée par le Garbage Collector. En revanche, <strong className="text-indigo-950 font-black">RSS</strong> reste souvent élevé car V8 conserve les pages mémoires déjà réquisitionnées pour de futures requêtes.
              </p>
            ) : (
              <p>
                ℹ️ Cliquez plusieurs fois sur <strong className="text-indigo-950 font-black">/add</strong> pour observer l&apos;ascension de <strong className="text-indigo-950 font-black">heapUsed</strong>. Si votre code conserve les données dans un tableau global sans limite, vous provoquez une <strong className="text-indigo-950 font-black">fuite mémoire</strong>.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Event Loop visualizer */}
      {activeTab === 'eventloop' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Call Stack */}
            <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-4">
              <span className="block text-xs uppercase font-extrabold text-slate-700 mb-2">1. Call Stack (Synchrone)</span>
              <div className="rounded-xl border border-slate-200 bg-white p-3 font-mono text-sm font-bold text-indigo-700">
                {eventLoopSteps[currentStep].callStack}
              </div>
            </div>

            {/* Microtasks */}
            <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/50 p-4">
              <span className="block text-xs uppercase font-extrabold text-indigo-950 mb-2">2. Microtasks Queue</span>
              <div className="rounded-xl border border-indigo-200 bg-white p-3 font-mono text-sm font-bold text-indigo-950">
                {eventLoopSteps[currentStep].microtasks}
              </div>
            </div>

            {/* Timers Queue */}
            <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-4">
              <span className="block text-xs uppercase font-extrabold text-slate-700 mb-2">3. Timers Queue (Libuv)</span>
              <div className="rounded-xl border border-slate-200 bg-white p-3 font-mono text-sm font-bold text-slate-900">
                {eventLoopSteps[currentStep].timers}
              </div>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="rounded-2xl border-2 border-slate-950 bg-slate-950 p-5 text-white">
            <span className="block text-xs uppercase font-extrabold text-indigo-300 mb-2">Sortie console (stdout)</span>
            <pre className="font-mono text-base font-bold text-emerald-400 whitespace-pre-wrap leading-relaxed">
              {eventLoopSteps[currentStep].output}
            </pre>
          </div>

          {/* Step Explanation */}
          <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4.5">
            <span className="text-xs uppercase font-black tracking-wider text-slate-700">
              Étape {currentStep + 1} sur {eventLoopSteps.length}
            </span>
            <p className="mt-1 text-base font-bold text-slate-950">
              {eventLoopSteps[currentStep].explanation}
            </p>
          </div>

          {/* Step controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNextStep}
              disabled={currentStep >= eventLoopSteps.length - 1}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-bold text-white shadow-sm hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Étape suivante</span>
              <Icon name="arrow-right" className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleResetLoop}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-base font-bold text-slate-900 hover:bg-slate-100 transition"
            >
              <Icon name="arrow-left" className="w-4 h-4" />
              <span>Recommencer</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

