'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { StepDebuggerSandbox } from '@/components/interactive/StepDebuggerSandbox';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Identifier les erreurs de portée (Scope)
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer les portées globale, de fonction et de bloc.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le mécanisme de Hoisting et la Temporal Dead Zone (TDZ).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Diagnostiquer les comportements inattendus induits par les closures.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier le masquage de variables (shadowing) avec le débogueur.</span>
          </li>
        </ul>
      </section>

      {/* 2. Les 3 Portées et var vs let/const */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les trois portées lexicales et la rupture var / let / const
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Mot-clé</th>
                <th className="p-3.5 border-b border-slate-200">Type de portée</th>
                <th className="p-3.5 border-b border-slate-200">Redéclaration</th>
                <th className="p-3.5 border-b border-slate-200">Comportement Hoisting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-rose-700">var (legacy)</td>
                <td className="p-3.5">Fonction (ignore les blocs if / for)</td>
                <td className="p-3.5 text-rose-600 font-bold">Autorisée (risque élevé)</td>
                <td className="p-3.5">Hissé et initialisé à <code className="font-mono">undefined</code></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-emerald-700">let</td>
                <td className="p-3.5">Bloc &#123; ... &#125;</td>
                <td className="p-3.5 text-emerald-700 font-bold">Interdite</td>
                <td className="p-3.5">Hissé mais inaccessible (Temporal Dead Zone)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-emerald-700">const</td>
                <td className="p-3.5">Bloc &#123; ... &#125; (liaison constante)</td>
                <td className="p-3.5 text-emerald-700 font-bold">Interdite</td>
                <td className="p-3.5">Hissé mais inaccessible (Temporal Dead Zone)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning">
          <strong>La fuite de portée avec var :</strong> Si vous déclarez <code className="text-slate-900 font-mono font-bold">for (var i = 0; i &lt; 3; i++)</code>, la variable <code className="text-slate-900 font-mono font-bold">i</code> continue d&apos;exister après la boucle avec la valeur finale <code className="text-slate-900 font-mono font-bold">3</code>. Avec <code className="text-slate-900 font-mono font-bold">let</code>, chaque tour de boucle instancie une nouvelle liaison lexicale dédiée.
        </Callout>
      </section>

      {/* 3. Hoisting et TDZ */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Démystification du Hoisting et de la Temporal Dead Zone (TDZ)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800">
            <span className="font-bold text-amber-400 font-sans uppercase">Hoisting avec var :</span>
            <pre className="mt-2 text-slate-300">{`console.log(user); // undefined
var user = "Ahmed";

// Le moteur V8 compile comme si :
var user; // déclaration hissée
console.log(user);
user = "Ahmed";`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800">
            <span className="font-bold text-rose-400 font-sans uppercase">Temporal Dead Zone avec let/const :</span>
            <pre className="mt-2 text-slate-300">{`console.log(total); // 💥 ReferenceError !
let total = 100;

// La variable est enregistrée dans le scope,
// mais interdite d'accès avant la ligne d'initialisation.`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Closures et Shadowing */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Pièges de Closures et Masquage (Shadowing)
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Une fermeture (closure) est le mécanisme par lequel une fonction interne conserve une référence vivante à son environnement lexical parent. Si plusieurs fonctions partagent la même variable mutable, elles peuvent s&apos;écraser mutuellement.
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-rose-400 font-bold">{`// Piège du Shadowing (Masquage involontaire) :`}</div>
          <div>{`let total = 100; // Variable globale de commande

function calculateDiscount() {
  let total = 0;   // ⚠️ Crée une NOUVELLE variable locale au lieu d'utiliser la globale !
  total += 50;
  return total;
}

calculateDiscount();
console.log(total); // Affiche toujours 100 ! Le total global n'a jamais été affecté.`}</div>
        </div>
      </section>

      {/* Bac à Sable Interactif */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            Bac à Sable Débogueur : Observer l&apos;évolution du Scope et de la Call Stack
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Manipulez le débogueur interactif pour voir comment les variables locales apparaissent et disparaissent du panneau <strong>Scope</strong> selon le frame actif dans le <strong>Call Stack</strong> :
        </p>
        <StepDebuggerSandbox />
      </section>

      {/* 5. TP Pratique : 4 Bugs de Scope résolus */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          5. Travaux Pratiques — Résolution de 4 anomalies de portée
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
            <span className="font-bold text-emerald-400 font-sans">Bug 1 &amp; 2 : Déclaration hors portée &amp; Bloc</span>
            <pre className="mt-2 text-slate-300">{`// Erreur : discount est déclarée dans le bloc if :
function calculate() {
  if (true) {
    let discount = 20;
  }
  return 100 - discount; // 💥 ReferenceError
}

// Solution : remonter la déclaration dans le scope parent
function calculate() {
  const discount = 20;
  return 100 - discount; // 80
}`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
            <span className="font-bold text-emerald-400 font-sans">Bug 4 : Boucle for et capture de closure</span>
            <pre className="mt-2 text-slate-300">{`// Erreur : var i partage la même référence (résultat 3, 3, 3)
for (var i = 0; i < 3; i++) {
  counters.push(() => i);
}

// Solution : let i crée une liaison indépendante par itération
for (let i = 0; i < 3; i++) {
  counters.push(() => i); // Capture 0, puis 1, puis 2 !
}`}</pre>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.3
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle portée est respectée par les déclarations let et const ?",
              options: [
                "Portée globale uniquement",
                "Portée de fonction uniquement",
                "Portée de bloc { ... }",
                "Aucune portée"
              ],
              correctIndex: 2,
              explanation: "let et const sont strictement limitées au bloc d'instructions délimité par des accolades (if, for, while, etc.)."
            },
            {
              id: 2,
              question: "Que signifie l'acronyme TDZ en JavaScript ?",
              options: [
                "Type Definition Zone",
                "Temporal Dead Zone",
                "Temporary Data Zone",
                "Total Duration Zero"
              ],
              correctIndex: 1,
              explanation: "La Temporal Dead Zone est la période entre le début de la portée d'un bloc et l'initialisation effective d'une variable let/const, pendant laquelle tout accès lève une ReferenceError."
            },
            {
              id: 3,
              question: "Quel résultat produit l'accès à une variable déclarée avec var avant sa ligne d'affectation ?",
              options: [
                "ReferenceError",
                "null",
                "undefined",
                "NaN"
              ],
              correctIndex: 2,
              explanation: "var est hissée (hoisted) au sommet de sa fonction et pré-initialisée à undefined."
            },
            {
              id: 4,
              question: "Qu'est-ce que le phénomène de 'Shadowing' ?",
              options: [
                "Une variable locale portant le même nom masque une variable de la portée extérieure",
                "Une variable devient invisible pour le garbage collector",
                "Une fonction s'exécute en arrière-plan",
                "Un crash silencieux du serveur"
              ],
              correctIndex: 0,
              explanation: "Le masquage (shadowing) survient lorsqu'une variable interne redéfinit un identifiant déjà présent dans la portée englobante."
            }
          ]}
        />
      </section>
    </div>
  );
};
