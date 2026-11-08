'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Diagnostiquer les erreurs de fonctions et de conditions
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
            <span>Différencier paramètres déclarés et arguments passés à l&apos;exécution.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Détecter les retours undefined provoqués par des oublis ou des branches incomplètes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser les 8 valeurs falsy de JavaScript pour éviter les bugs sur zéro (0).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Éviter les pièges de syntaxe des fonctions fléchées retournant des objets.</span>
          </li>
        </ul>
      </section>

      {/* 2. Paramètres vs Arguments */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Paramètres déclarés vs Arguments transmis
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Contrairement aux langages fortement typés (comme Java ou C#), JavaScript ne vérifie ni le nombre ni l&apos;ordre des arguments lors de l&apos;appel :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
            <span className="font-bold text-rose-400 font-sans">Argument manquant (produit NaN) :</span>
            <pre className="mt-2 text-slate-300">{`function calculateTotal(price, quantity) {
  return price * quantity;
}

calculateTotal(100); 
// quantity reçoit undefined !
// 100 * undefined = NaN`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
            <span className="font-bold text-amber-400 font-sans">Ordre inversé silencieux :</span>
            <pre className="mt-2 text-slate-300">{`function createUser(name, age) {
  return { name, age };
}

createUser(25, "Ahmed");
// Résultat : { name: 25, age: "Ahmed" }
// Aucune exception mais état corrompu !`}</pre>
          </div>
        </div>
      </section>

      {/* 3. Pièges du return */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les anomalies de return : oubli, interruption ou branches mortes
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
            <h3 className="font-bold text-slate-900">A. Fonction sans return explicite</h3>
            <p className="text-slate-600 mt-1">
              En JavaScript, une fonction qui termine sans rencontrer <code className="font-mono text-emerald-700">return</code> renvoie implicitement <code className="font-mono text-emerald-700 font-bold">undefined</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
            <h3 className="font-bold text-slate-900">B. Return conditionnel asymétrique</h3>
            <p className="text-slate-600 mt-1">
              Si une fonction ne retourne une valeur que dans le <code className="font-mono text-emerald-700">if (condition)</code> sans clause <code className="font-mono text-emerald-700">else</code> de repli, tous les cas non prévus retourneront <code className="font-mono text-emerald-700">undefined</code>, provoquant des crashs plus bas dans l&apos;application.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Truthy, Falsy et conditions perverses */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Valeurs Truthy / Falsy et le piège du zéro (0)
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          JavaScript possède exactement 8 valeurs évaluées comme fausses (<code className="font-mono font-bold text-rose-700">falsy</code>) dans un contexte booléen :
        </p>

        <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">false</span>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">0</span>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">-0</span>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">0n (BigInt)</span>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">&quot;&quot; (vide)</span>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">null</span>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">undefined</span>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">NaN</span>
        </div>

        <Callout type="danger">
          <strong>L&apos;erreur critique du test if (!discount) :</strong> Si une remise est de <code className="text-slate-900 font-mono font-bold">0 DH</code>, le test <code className="text-slate-900 font-mono font-bold">if (!discount)</code> considère que la remise n&apos;a pas été fournie ! Pour vérifier l&apos;absence de valeur, comparez explicitement avec <code className="text-slate-900 font-mono font-bold">discount === undefined || discount === null</code> ou utilisez l&apos;opérateur de coalescence nulle (<code className="text-slate-900 font-mono font-bold">??</code>).
        </Callout>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-rose-400 font-bold">{`// Piège classique de condition trop large :`}</div>
          <div>{`const role = "user";
if (role === "user" || "admin") {
  // ⚠️ Cette condition est TOUJOURS vraie !
  // V8 évalue : (role === "user") || Boolean("admin") -> true || true -> true
}

// Correction obligatoire :
if (role === "user" || role === "admin") {
  console.log("Accès autorisé");
}`}</div>
        </div>
      </section>

      {/* 5. Fonctions fléchées */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Syntaxe des fonctions fléchées : Accolades et retour d&apos;objets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-rose-950 text-rose-200 border border-rose-800">
            <span className="font-bold text-rose-400 font-sans uppercase">Erreur de syntaxe d&apos;objet :</span>
            <pre className="mt-2 text-slate-300">{`// 💥 Les accolades sont prises pour le corps de la fonction :
const makeUser = (name) => { name: name };
console.log(makeUser("Ali")); // undefined !`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950 text-emerald-200 border border-emerald-800">
            <span className="font-bold text-emerald-400 font-sans uppercase">Correction par parenthèses :</span>
            <pre className="mt-2 text-slate-300">{`// Entourer l'objet littéral de parenthèses :
const makeUser = (name) => ({ name: name });
console.log(makeUser("Ali")); // { name: "Ali" }`}</pre>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.4
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Que retourne une fonction JavaScript ne contenant aucune instruction return ?",
              options: [
                "null",
                "false",
                "undefined",
                "0"
              ],
              correctIndex: 2,
              explanation: "Par spécification ECMAScript, toute fonction sans return explicite renvoie la valeur primitive undefined."
            },
            {
              id: 2,
              question: "Parmi ces valeurs, laquelle N'EST PAS falsy ?",
              options: [
                "0",
                "\"0\"",
                "null",
                "NaN"
              ],
              correctIndex: 1,
              explanation: "Une chaîne non vide contenant \"0\" possède une longueur de 1 caractère et est donc évaluée comme truthy !"
            },
            {
              id: 3,
              question: "Pourquoi la condition if (role === 'user' || 'admin') est-elle défectueuse ?",
              options: [
                "Elle provoque une SyntaxError",
                "La chaîne 'admin' non vide est toujours truthy, rendant l'ensemble de la condition vraie à 100%",
                "Elle compare les longueurs de chaînes",
                "Elle efface la variable role"
              ],
              correctIndex: 1,
              explanation: "L'opérateur || sépare deux expressions distinctes. 'admin' est évalué seul comme un booléen true."
            },
            {
              id: 4,
              question: "Comment retourner directement un objet littéral avec une fonction fléchée sans mot-clé return ?",
              options: [
                "const f = () => { name: 'A' };",
                "const f = () => ({ name: 'A' });",
                "const f = () => [ name: 'A' ];",
                "const f = () => return { name: 'A' };"
              ],
              correctIndex: 1,
              explanation: "Entourer l'objet littéral de parenthèses ({ ... }) indique à l'analyseur syntaxique qu'il s'agit d'une expression de retour et non d'un bloc de code."
            }
          ]}
        />
      </section>
    </div>
  );
};
