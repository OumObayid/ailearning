'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { WasmWebGpuLab } from '@/components/interactive/WasmWebGpuLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Différence entre JavaScript et WebAssembly —— Benchmark &amp; Performances
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base font-semibold text-slate-950">
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre les différences d&apos;architecture entre l&apos;exécution JIT JavaScript et le code machine AOT de WASM.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Mettre en place un banc de test rigoureux avec préchauffage (warm-up) et moyennes statistiques fiables.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Compiler un fichier C vers <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">.wasm</code> avec le compilateur Emscripten et le flag <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">-O3</code>.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre pourquoi WASM peut être plus lent que JavaScript sur de petites opérations (coût de la frontière FFI).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Articuler le partage de tâches dans un projet IA : logique applicative en JS et sous-routines critiques en WASM.</span>
          </li>
        </ul>
      </section>

      {/* 2. Tableau comparatif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Confrontation technique : JavaScript vs WebAssembly
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-900 border-collapse">
            <thead className="bg-slate-100 text-slate-950 font-black border-b border-slate-300">
              <tr>
                <th className="p-3">Critère</th>
                <th className="p-3">JavaScript</th>
                <th className="p-3">WebAssembly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              <tr className="bg-white">
                <td className="p-3 font-bold text-slate-950">Nature</td>
                <td className="p-3">Langage de script de haut niveau à typage dynamique</td>
                <td className="p-3 font-bold text-indigo-700">Format binaire d&apos;instructions bas niveau à typage strict</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 font-bold text-slate-950">Compilation</td>
                <td className="p-3">JIT à chaud (Ignition bytecode + TurboFan)</td>
                <td className="p-3 font-bold text-indigo-700">AOT (compilé en amont) + Liftoff direct</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-bold text-slate-950">Accès au DOM</td>
                <td className="p-3 text-emerald-700 font-bold">Direct et natif (<code className="font-mono text-xs">document.querySelector</code>)</td>
                <td className="p-3 text-amber-700">Indirect (doit passer par une fonction JavaScript)</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 font-bold text-slate-950">Stabilité des perfs</td>
                <td className="p-3">Fluctuante (risques de dé-optimisation V8 si le type change)</td>
                <td className="p-3 text-emerald-700 font-bold">Déterministe et prévisible à chaque cycle</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-bold text-slate-950">Gestion mémoire</td>
                <td className="p-3">Automatique via Ramasse-miettes (Garbage Collector)</td>
                <td className="p-3 font-bold text-slate-800">Manuelle dans un buffer linéaire (<code className="font-mono text-xs">WebAssembly.Memory</code>)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Analyse Visuelle Haute Résolution */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Analyse de latence et pipeline de compilation
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-80 sm:h-96 md:h-[460px] rounded-xl overflow-hidden bg-slate-950">
            <Image
              src="/images/cours/backend-ia/module-6/wasm-js-performance-analysis.svg"
              alt="Benchmark et Pipeline : JavaScript JIT vs WebAssembly"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
          </div>
          <p className="mt-3 text-xs sm:text-sm text-center text-slate-700 font-semibold">
            Figure 6.1 — Cycle d&apos;exécution V8 : pourquoi le code JavaScript nécessite un échauffement JIT tandis que WebAssembly s&apos;exécute immédiatement à cadence nominale.
          </p>
        </div>
      </section>

      {/* 4. Le protocole de benchmark rigoureux */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Comparaison sur un calcul identique : Sommation de 1 à 100 millions
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Calculons la somme mathématique des entiers consécutifs de 1 à 100 millions :
          <span className="block my-2 text-center font-mono font-bold text-indigo-900 bg-indigo-50 py-2 rounded-xl border border-indigo-200">
            S = 1 + 2 + 3 + ... + 100 000 000 = 5 000 000 050 000 000
          </span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeBlock
            filename="calcul.c"
            language="c"
            code={`#include <stdint.h>

// Fonction compilée en WebAssembly via Emscripten
int64_t calculWasm(int32_t n) {
    int64_t somme = 0;
    for (int32_t i = 1; i <= n; i++) {
        somme += i;
    }
    return somme;
}

// Commande de compilation haute optimisation :
// emcc calcul.c -O3 -s STANDALONE_WASM -Wl,--no-entry -Wl,--export=calculWasm -o calcul.wasm`}
          />

          <CodeBlock
            filename="test-js.js"
            language="javascript"
            code={`const { performance } = require("node:perf_hooks");

function calculJavaScript(n) {
  let somme = 0;
  for (let i = 1; i <= n; i++) {
    somme += i;
  }
  return somme;
}

const n = 100_000_000;

// Étape 1 : Préchauffage du moteur V8 (Warm-up)
for (let i = 0; i < 3; i++) {
  calculJavaScript(n);
}

// Étape 2 : Mesures statistiques répétées
const durees = [];
for (let i = 0; i < 5; i++) {
  const debut = performance.now();
  calculJavaScript(n);
  durees.push(performance.now() - debut);
}

const moyenne = durees.reduce((a, b) => a + b, 0) / durees.length;
console.log("Moyenne JS :", moyenne.toFixed(2), "ms");`}
          />
        </div>

        <Callout type="note" title="Pourquoi le préchauffage (Warm-up) est-il obligatoire ?">
          <p className="text-sm leading-relaxed text-slate-900">
            Le compilateur JIT V8 surveille l&apos;exécution du code JavaScript. Les premières itérations passent par l&apos;interpréteur <strong>Ignition</strong>. Dès que V8 détecte que la boucle est &quot;chaude&quot; (hot function) et que les types restent constants, <strong>TurboFan</strong> compile la boucle en code machine ultra-rapide. Sans préchauffage, vous mesurerez l&apos;analyseur de syntaxe plutôt que la vitesse du calcul !
          </p>
        </Callout>
      </section>

      {/* 5. Le coût de la frontière FFI */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Pourquoi WASM n&apos;est-il pas toujours le plus rapide ?
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Pour additionner deux petits nombres (<code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">10 + 20</code>), JavaScript n&apos;a besoin que d&apos;une fraction de nanoseconde. Appeler un module WASM pour cette opération impose :
        </p>

        <ul className="space-y-2 list-disc list-inside text-base text-slate-900 pl-2">
          <li>Le chargement ou la conservation en mémoire de l&apos;instance binaire.</li>
          <li>Le passage des arguments à travers la frontière d&apos;interopérabilité (FFI).</li>
          <li>La conversion éventuelle des types et la lecture de la pile d&apos;exécution WASM.</li>
        </ul>

        <div className="rounded-xl border border-slate-300 bg-slate-900 text-slate-100 p-4 font-mono text-xs space-y-1">
          <div className="text-emerald-400 font-bold">{'// Bilan de décision architecturale :'}</div>
          <p>⬢ Petite opération (&lt; 10 000 calculs) : <strong>JavaScript gagne</strong> (0.02 ms vs 0.08 ms pour WASM).</p>
          <p>⬢ Traitement CPU intensif (&gt; 10 000 000 calculs) : <strong>WASM gagne nettement</strong> (÷2 à ÷3 plus rapide).</p>
          <p>⬢ Règle d&apos;or : amortir le coût FFI par une quantité massive de travail calculatoire au sein du module.</p>
        </div>
      </section>

      {/* 6. Simulateur Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Banc d&apos;essai interactif
        </h2>
        <WasmWebGpuLab initialTab="wasmVsJs" />
      </section>

      {/* 7. Travaux Pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Travaux Pratiques — Exercices d&apos;application
        </h2>

        <PracticalWork
          title="TP 1 : Mesure comparative sur les tableaux typés"
          objective="Implémenter un script mesurant le temps de remplissage et de calcul sur un Float32Array en JavaScript pur face à une fonction C exportée."
          duration="45 min"
          steps={[
            "Instanciez un Float32Array de 10 millions d'éléments dans Node.js.",
            "Mesurez avec performance.now() le temps nécessaire pour calculer la racine carrée de chaque élément avec Math.sqrt en JS.",
            "Comparez avec la fonction sqrtf() compilée en WASM sans copier le tableau à chaque itération (passage par pointeur mémoire).",
            "Constatez la régularité du garbage collector sur les tableaux typés contigus."
          ]}
        />
      </section>

      {/* 8. Quiz de validation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz de validation des acquis
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi effectue-t-on une boucle de préchauffage (warm-up) avant de chronométrer du code JavaScript ?",
              options: [
                "Pour faire chauffer physiquement le ventilateur de l'ordinateur",
                "Pour permettre au compilateur JIT V8 d'optimiser le bytecode en code machine TurboFan",
                "Pour vider le cache du navigateur",
                "Pour recharger la base de données SQL"
              ],
              correctIndex: 1,
              explanation: "Le compilateur JIT de V8 a besoin de quelques passages pour identifier les types récurrents et générer du code machine optimisé."
            },
            {
              id: 2,
              question: "Qu'appelle-t-on le 'FFI overhead' lors de l'appel d'une fonction WASM depuis JavaScript ?",
              options: [
                "Le coût réseau de la requête HTTP",
                "Le temps nécessaire pour franchir la frontière entre le contexte d'exécution JavaScript et le moteur WASM",
                "La taille du fichier .wasm sur le disque dur",
                "La compression de l'image"
              ],
              correctIndex: 1,
              explanation: "Chaque appel franchissant la frontière JS-WASM entraîne une légère surcharge de conversion des arguments et de commutation de contexte."
            },
            {
              id: 3,
              question: "Quelle option du compilateur Emscripten demande le niveau maximal d'optimisation du code binaire généré ?",
              options: [
                "-debug",
                "-O0",
                "-O3",
                "--fast-mode"
              ],
              correctIndex: 2,
              explanation: "L'option -O3 active l'optimisation maximale du compilateur LLVM (déroulage de boucles, vectorisation, inlining)."
            },
            {
              id: 4,
              question: "WebAssembly peut-il modifier directement un élément HTML avec document.getElementById() ?",
              options: [
                "Oui, nativement comme en JavaScript",
                "Non, il doit obligatoirement demander à JavaScript de manipuler le DOM pour lui",
                "Oui, mais uniquement dans Google Chrome",
                "Oui, si on utilise TypeScript"
              ],
              correctIndex: 1,
              explanation: "WASM n'a pas d'accès direct aux objets du DOM ; toutes les manipulations d'éléments d'interface doivent être orchestrées par JavaScript."
            }
          ]}
        />
      </section>

      {/* 9. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Checklist de fin de chapitre
        </h2>
        <InteractiveChecklist
          items={[
            "Je comprends la différence fondamentale entre la compilation JIT de JavaScript et la compilation AOT de WebAssembly.",
            "Je sais pourquoi le préchauffage JIT est indispensable pour comparer des performances de manière équitable.",
            "Je sais expliquer pourquoi WASM peut être contre-productif pour des micro-opérations à cause du FFI overhead.",
            "Je retiens la règle d'or : réserver WASM aux calculs CPU lourds et laisser à JavaScript la gestion du DOM et des événements."
          ]}
        />
      </section>
    </div>
  );
};
