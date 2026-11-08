'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface DebugStep {
  lineNumber: number;
  callStack: string[];
  scope: Record<string, unknown>;
  watches: Record<string, string>;
  explanation: string;
  outputLog?: string;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  lines: string[];
  steps: DebugStep[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'cart-discount',
    title: '1. Calcul de remise Panier (Step Over vs Step Into)',
    description: 'Observez la dérivation des prix et comment Step Into permet d\'inspecter l\'intérieur de applyPromo().',
    lines: [
      'function applyPromo(price, code) {', // L1
      '  if (code === "VIP20") return price * 0.8;', // L2
      '  return price;', // L3
      '}', // L4
      '', // L5
      'function calculateOrderTotal(cart) {', // L6
      '  let subtotal = 0;', // L7
      '  for (let item of cart.items) {', // L8
      '    subtotal += item.price;', // L9
      '  }', // L10
      '  const finalTotal = applyPromo(subtotal, cart.promo);', // L11
      '  return finalTotal;', // L12
      '}', // L13
      '', // L14
      'const userCart = { promo: "VIP20", items: [{ price: 40 }, { price: 60 }] };', // L15
      'const result = calculateOrderTotal(userCart);', // L16
      'console.log("Total à payer:", result);', // L17
    ],
    steps: [
      {
        lineNumber: 15,
        callStack: ['(anonymous) : main'],
        scope: { userCart: 'undefined', result: 'undefined' },
        watches: { 'userCart.promo': 'undefined', 'subtotal > 50': 'false' },
        explanation: 'Initialisation du script. Le pointeur est sur la déclaration du panier `userCart`.',
      },
      {
        lineNumber: 16,
        callStack: ['(anonymous) : main'],
        scope: { userCart: '{ promo: "VIP20", items: [...] }', result: 'undefined' },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'false' },
        explanation: '`userCart` est instancié. Ligne 16 : appel de `calculateOrderTotal(userCart)`. Cliquez sur "Step Into" pour entrer dans la fonction ou "Step Over" pour l\'exécuter d\'un coup.',
      },
      {
        lineNumber: 6,
        callStack: ['calculateOrderTotal (L6)', '(anonymous) : main (L16)'],
        scope: { cart: '{ promo: "VIP20", items: [...] }', subtotal: 'undefined' },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'false' },
        explanation: '[Step Into] Nous sommes entrés dans `calculateOrderTotal`. Un nouveau frame d\'exécution est empilé dans le Call Stack !',
      },
      {
        lineNumber: 7,
        callStack: ['calculateOrderTotal (L7)', '(anonymous) : main (L16)'],
        scope: { cart: '{ promo: "VIP20", items: [...] }', subtotal: 0 },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'false' },
        explanation: '`subtotal` est initialisé à 0 dans le scope local de `calculateOrderTotal`.',
      },
      {
        lineNumber: 8,
        callStack: ['calculateOrderTotal (L8)', '(anonymous) : main (L16)'],
        scope: { cart: '{ promo: "VIP20", items: [...] }', subtotal: 0, item: '{ price: 40 }' },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'false' },
        explanation: 'Début de la boucle : premier élément extrait (`price: 40`).',
      },
      {
        lineNumber: 9,
        callStack: ['calculateOrderTotal (L9)', '(anonymous) : main (L16)'],
        scope: { cart: '{ promo: "VIP20", items: [...] }', subtotal: 40, item: '{ price: 40 }' },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'false' },
        explanation: '`subtotal` passe à 40 (+40).',
      },
      {
        lineNumber: 8,
        callStack: ['calculateOrderTotal (L8)', '(anonymous) : main (L16)'],
        scope: { cart: '{ promo: "VIP20", items: [...] }', subtotal: 40, item: '{ price: 60 }' },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'false' },
        explanation: 'Deuxième tour de boucle : second élément extrait (`price: 60`).',
      },
      {
        lineNumber: 9,
        callStack: ['calculateOrderTotal (L9)', '(anonymous) : main (L16)'],
        scope: { cart: '{ promo: "VIP20", items: [...] }', subtotal: 100, item: '{ price: 60 }' },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'true' },
        explanation: '`subtotal` passe à 100 (+60). L\'expression surveillée `subtotal > 50` bascule à `true` !',
      },
      {
        lineNumber: 11,
        callStack: ['calculateOrderTotal (L11)', '(anonymous) : main (L16)'],
        scope: { cart: '{ promo: "VIP20", items: [...] }', subtotal: 100, finalTotal: 'undefined' },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'true' },
        explanation: 'Appel de `applyPromo(100, "VIP20")`. Step Into va nous conduire dans la fonction de calcul de remise.',
      },
      {
        lineNumber: 2,
        callStack: ['applyPromo (L2)', 'calculateOrderTotal (L11)', '(anonymous) : main (L16)'],
        scope: { price: 100, code: '"VIP20"' },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'true' },
        explanation: 'Le Call Stack compte désormais 3 niveaux. `code === "VIP20"` est vrai, retour de `100 * 0.8 = 80`.',
      },
      {
        lineNumber: 12,
        callStack: ['calculateOrderTotal (L12)', '(anonymous) : main (L16)'],
        scope: { cart: '{ ... }', subtotal: 100, finalTotal: 80 },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'true' },
        explanation: '`applyPromo` a dépilé son frame. `finalTotal` vaut 80. Retour à l\'appelant principal.',
      },
      {
        lineNumber: 17,
        callStack: ['(anonymous) : main (L17)'],
        scope: { userCart: '{ ... }', result: 80 },
        watches: { 'userCart.promo': '"VIP20"', 'subtotal > 50': 'false' },
        outputLog: 'Total à payer: 80',
        explanation: 'Fin du calcul. Le résultat final (80€) est affiché dans la console.',
      },
    ],
  },
  {
    id: 'recursion-overflow',
    title: '2. Récursion & Condition d\'arrêt (Call Stack Overflow)',
    description: 'Comprenez comment l\'empilement des frames mène au dépassement de pile sans guard clause.',
    lines: [
      'function computeFactorial(n) {', // L1
      '  if (n <= 1) return 1;', // L2
      '  return n * computeFactorial(n - 1);', // L3
      '}', // L4
      '', // L5
      'const number = 3;', // L6
      'const fact = computeFactorial(number);', // L7
      'console.log("Factorielle =", fact);', // L8
    ],
    steps: [
      {
        lineNumber: 6,
        callStack: ['(anonymous) : main'],
        scope: { number: 'undefined', fact: 'undefined' },
        watches: { 'n <= 1': 'undefined', 'n': 'undefined' },
        explanation: 'Pointeur sur `const number = 3`.',
      },
      {
        lineNumber: 7,
        callStack: ['(anonymous) : main'],
        scope: { number: 3, fact: 'undefined' },
        watches: { 'n <= 1': 'undefined', 'n': 'undefined' },
        explanation: 'Appel de `computeFactorial(3)`.',
      },
      {
        lineNumber: 2,
        callStack: ['computeFactorial(3) [L2]', '(anonymous) : main'],
        scope: { n: 3 },
        watches: { 'n <= 1': 'false', 'n': '3' },
        explanation: 'Frame 1 : `n = 3`. Condition `n <= 1` est fausse.',
      },
      {
        lineNumber: 3,
        callStack: ['computeFactorial(3) [L3]', '(anonymous) : main'],
        scope: { n: 3 },
        watches: { 'n <= 1': 'false', 'n': '3' },
        explanation: 'Appel récursif : `3 * computeFactorial(2)`. Nouvel empilement !',
      },
      {
        lineNumber: 2,
        callStack: ['computeFactorial(2) [L2]', 'computeFactorial(3) [L3]', '(anonymous) : main'],
        scope: { n: 2 },
        watches: { 'n <= 1': 'false', 'n': '2' },
        explanation: 'Frame 2 : `n = 2`. Condition `n <= 1` est fausse.',
      },
      {
        lineNumber: 3,
        callStack: ['computeFactorial(2) [L3]', 'computeFactorial(3) [L3]', '(anonymous) : main'],
        scope: { n: 2 },
        watches: { 'n <= 1': 'false', 'n': '2' },
        explanation: 'Appel récursif : `2 * computeFactorial(1)`. Nouvel empilement !',
      },
      {
        lineNumber: 2,
        callStack: ['computeFactorial(1) [L2]', 'computeFactorial(2) [L3]', 'computeFactorial(3) [L3]', '(anonymous) : main'],
        scope: { n: 1 },
        watches: { 'n <= 1': 'true', 'n': '1' },
        explanation: 'Frame 3 (Base case) : `n = 1`. Condition `n <= 1` est VRAIE ! Début du dépilement.',
      },
      {
        lineNumber: 8,
        callStack: ['(anonymous) : main'],
        scope: { number: 3, fact: 6 },
        watches: { 'n <= 1': 'undefined', 'n': 'undefined' },
        outputLog: 'Factorielle = 6',
        explanation: 'Tous les frames ont retourné : 1 * 2 * 3 = 6. La pile est revenue au niveau racine.',
      },
    ],
  },
];

export const StepDebuggerSandbox: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [breakpoints, setBreakpoints] = useState<number[]>([11]);
  const [logs, setLogs] = useState<string[]>([]);

  const scenario = SCENARIOS[selectedScenarioIndex];
  const currentStep = scenario.steps[stepIndex] || scenario.steps[0];

  const toggleBreakpoint = (lineNum: number) => {
    setBreakpoints((prev) =>
      prev.includes(lineNum) ? prev.filter((l) => l !== lineNum) : [...prev, lineNum]
    );
  };

  const handleStepOver = () => {
    if (stepIndex < scenario.steps.length - 1) {
      const nextIdx = stepIndex + 1;
      setStepIndex(nextIdx);
      if (scenario.steps[nextIdx].outputLog) {
        setLogs((prev) => [...prev, scenario.steps[nextIdx].outputLog!]);
      }
    }
  };

  const handleStepInto = () => {
    // In our scenario progression, next step represents step into
    handleStepOver();
  };

  const handleStepOut = () => {
    // Fast forward to next frame with fewer callstack items
    const currentDepth = currentStep.callStack.length;
    const targetIdx = scenario.steps.findIndex(
      (s, idx) => idx > stepIndex && s.callStack.length < currentDepth
    );
    if (targetIdx !== -1) {
      setStepIndex(targetIdx);
      if (scenario.steps[targetIdx].outputLog) {
        setLogs((prev) => [...prev, scenario.steps[targetIdx].outputLog!]);
      }
    } else {
      handleStepOver();
    }
  };

  const handleResume = () => {
    // Jump to next breakpoint or end
    const nextBpIdx = scenario.steps.findIndex(
      (s, idx) => idx > stepIndex && breakpoints.includes(s.lineNumber)
    );
    if (nextBpIdx !== -1) {
      setStepIndex(nextBpIdx);
    } else {
      // Jump to last step
      setStepIndex(scenario.steps.length - 1);
      const last = scenario.steps[scenario.steps.length - 1];
      if (last.outputLog) {
        setLogs((prev) => [...prev, last.outputLog!]);
      }
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setLogs([]);
  };

  const handleSelectScenario = (idx: number) => {
    setSelectedScenarioIndex(idx);
    setStepIndex(0);
    setLogs([]);
    setBreakpoints(idx === 0 ? [11] : [2]);
  };

  return (
    <div className="rounded-3xl border-2 border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden font-sans my-8">
      {/* Top Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            Bac à Sable Débogueur Pas à Pas (VS Code / DevTools Simulator)
          </span>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-2">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedScenarioIndex === idx
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Scénario {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Stepper Toolbar */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResume}
            title="Reprendre (Resume / F8)"
            className="px-2.5 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>▶</span>
            <span>Resume (F8)</span>
          </button>
          <button
            onClick={handleStepOver}
            title="Pas à pas principal (Step Over / F10)"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <span>↷</span>
            <span>Step Over (F10)</span>
          </button>
          <button
            onClick={handleStepInto}
            title="Entrer dans la fonction (Step Into / F11)"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <span>↓</span>
            <span>Step Into (F11)</span>
          </button>
          <button
            onClick={handleStepOut}
            title="Sortir de la fonction (Step Out / Shift+F11)"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <span>↑</span>
            <span>Step Out (⇧F11)</span>
          </button>
          <button
            onClick={handleReset}
            title="Recommencer depuis le début"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition-colors ml-1"
          >
            <Icon name="clock" className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="text-xs font-mono text-slate-400">
          Étape <span className="text-emerald-400 font-bold">{stepIndex + 1}</span> / {scenario.steps.length}
        </div>
      </div>

      {/* Main Grid: Code Editor + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
        {/* Left: Code Viewer (7 cols) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-800 p-3 bg-slate-950 font-mono text-xs sm:text-sm overflow-x-auto select-none">
          <div className="text-[11px] text-slate-500 font-sans mb-2 flex items-center justify-between">
            <span>Cliquez sur un numéro de ligne pour poser un Breakpoint (🔴)</span>
            <span className="text-emerald-400 font-mono font-semibold">app.js</span>
          </div>

          <div className="space-y-0.5">
            {scenario.lines.map((codeLine, idx) => {
              const lineNum = idx + 1;
              const isCurrent = lineNum === currentStep.lineNumber;
              const hasBreakpoint = breakpoints.includes(lineNum);

              return (
                <div
                  key={lineNum}
                  onClick={() => toggleBreakpoint(lineNum)}
                  className={`flex items-center group cursor-pointer rounded px-1.5 py-0.5 transition-colors ${
                    isCurrent
                      ? 'bg-amber-500/25 border-l-4 border-amber-400 font-bold text-white'
                      : 'hover:bg-slate-900/80 text-slate-300'
                  }`}
                >
                  {/* Breakpoint gutter */}
                  <span className="w-5 flex items-center justify-center text-xs">
                    {hasBreakpoint ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 inline-block"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-rose-500/0 group-hover:bg-rose-500/30 inline-block transition-colors"></span>
                    )}
                  </span>

                  {/* Line number */}
                  <span
                    className={`w-7 text-right pr-2 text-xs font-mono select-none ${
                      isCurrent ? 'text-amber-400 font-bold' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  >
                    {lineNum}
                  </span>

                  {/* Execution arrow pointer */}
                  <span className="w-4 text-center text-amber-400 font-black text-xs select-none">
                    {isCurrent ? '➔' : ''}
                  </span>

                  {/* Code Line */}
                  <span className="flex-1 pl-1 whitespace-pre font-mono text-xs sm:text-[13px]">
                    {codeLine}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Inspector Panels (5 cols) */}
        <div className="lg:col-span-5 p-4 bg-slate-900/50 flex flex-col justify-between space-y-4">
          <div className="space-y-4 text-xs font-mono">
            {/* Call Stack Section */}
            <div>
              <div className="text-[11px] font-sans font-bold uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Call Stack (Pile d&apos;appels)</span>
              </div>
              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 space-y-1">
                {currentStep.callStack.map((frame, fIdx) => (
                  <div
                    key={fIdx}
                    className={`px-2 py-1 rounded text-xs flex items-center justify-between ${
                      fIdx === 0
                        ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    <span>{frame}</span>
                    {fIdx === 0 && <span className="text-[10px] text-cyan-400 uppercase font-sans">Actif</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Scope Variables Section */}
            <div>
              <div className="text-[11px] font-sans font-bold uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Scope (Variables Locales)</span>
              </div>
              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 space-y-1">
                {Object.entries(currentStep.scope).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between text-xs py-0.5">
                    <span className="text-slate-400">{key}:</span>
                    <span className="text-emerald-400 font-semibold truncate max-w-[180px]">
                      {String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch Expressions */}
            <div>
              <div className="text-[11px] font-sans font-bold uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Watch Expressions (Espion)</span>
              </div>
              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 space-y-1">
                {Object.entries(currentStep.watches).map(([expr, val]) => (
                  <div key={expr} className="flex items-center justify-between text-xs py-0.5">
                    <span className="text-amber-300/80">{expr}:</span>
                    <span className="text-amber-200 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Console Output (if any) */}
            {logs.length > 0 && (
              <div>
                <div className="text-[11px] font-sans font-bold uppercase text-slate-400 tracking-wider mb-1">
                  Sortie Console
                </div>
                <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 text-xs text-emerald-400">
                  {logs.map((l, i) => (
                    <div key={i}>› {l}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contextual Pedagogical Explanation Box */}
          <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-3 text-xs text-emerald-200">
            <div className="font-bold font-sans text-emerald-400 mb-1 flex items-center gap-1">
              <Icon name="info" className="w-4 h-4 text-emerald-400" />
              <span>Analyse du moteur JS (V8) :</span>
            </div>
            <p className="leading-relaxed font-sans">{currentStep.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

