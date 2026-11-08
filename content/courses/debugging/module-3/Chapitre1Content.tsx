'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { DebuggingConsoleSimulator } from '@/components/interactive/DebuggingConsoleSimulator';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Comprendre les erreurs JavaScript
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer formellement les erreurs de syntaxe, d&apos;exécution et de logique.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier et décoder les principales catégories d&apos;erreurs standard JavaScript.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le fonctionnement et les propriétés de l&apos;objet natif Error.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer le point de levée d&apos;exception de la cause racine réelle.</span>
          </li>
        </ul>
      </section>

      {/* 2. Les 3 grandes catégories */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les trois grandes catégories d&apos;erreurs JavaScript
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 space-y-2">
            <h3 className="font-black text-rose-950 text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600"></span> Erreurs de Syntaxe
            </h3>
            <p className="text-xs text-rose-900">
              Violations grammaticales du langage détectées lors du parsing. Le script ne peut pas être compilé par le moteur V8.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-lg text-[11px] font-mono text-rose-300">
              console.log(username;<br />
              <span className="text-slate-500">{`// SyntaxError: missing )`}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/60 space-y-2">
            <h3 className="font-black text-amber-950 text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-600"></span> Erreurs d&apos;Exécution (Runtime)
            </h3>
            <p className="text-xs text-amber-900">
              Code syntaxiquement valide mais opération impossible au moment du passage du thread (déréférencement de null/undefined).
            </p>
            <div className="p-2.5 bg-slate-950 rounded-lg text-[11px] font-mono text-amber-300">
              user.getName();<br />
              <span className="text-slate-500">{`// TypeError: not a function`}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/60 space-y-2">
            <h3 className="font-black text-blue-950 text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span> Erreurs de Logique Métier
            </h3>
            <p className="text-xs text-blue-900">
              Aucune exception levée par le moteur. Le programme tourne parfaitement sur le plan technique, mais produit un résultat faux.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-lg text-[11px] font-mono text-cyan-300">
              return price - discount;<br />
              <span className="text-slate-500">{`// Faux si remise en % !`}</span>
            </div>
          </div>
        </div>

        <Callout type="warning">
          <strong>Attention aux faux positifs :</strong> Une division numérique par zéro (<code className="text-slate-900 font-mono font-bold">10 / 0</code>) ne provoque <em>pas</em> d&apos;exception en JavaScript ! Elle retourne la valeur primitive <code className="text-slate-900 font-mono font-bold">Infinity</code>. C&apos;est une anomalie de calcul, mais pas une erreur d&apos;exécution interceptable par un try/catch.
        </Callout>
      </section>

      {/* 3. Types d'erreurs intégrés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Typologie des erreurs natives V8
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Type d&apos;Erreur</th>
                <th className="p-3.5 border-b border-slate-200">Condition de déclenchement</th>
                <th className="p-3.5 border-b border-slate-200">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-rose-700">SyntaxError</td>
                <td className="p-3.5">Non-respect des règles grammaticales lors de l&apos;analyse syntaxique.</td>
                <td className="p-3.5 font-mono text-xs">const = 100; // jeton inattendu</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-amber-700">ReferenceError</td>
                <td className="p-3.5">Accès à un identifiant non déclaré dans la portée lexicale courante ou TDZ.</td>
                <td className="p-3.5 font-mono text-xs">console.log(unknownVar);</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-purple-700">TypeError</td>
                <td className="p-3.5">Opération incompatible avec la valeur (lecture de propriété sur null/undefined).</td>
                <td className="p-3.5 font-mono text-xs">null.toUpperCase()</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-blue-700">RangeError</td>
                <td className="p-3.5">Valeur numérique en dehors de l&apos;intervalle autorisé ou récursion infinie.</td>
                <td className="p-3.5 font-mono text-xs">new Array(-5) / Maximum call stack</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-teal-700">URIError</td>
                <td className="p-3.5">Séquence d&apos;échappement URI invalide transmise aux fonctions globales.</td>
                <td className="p-3.5 font-mono text-xs">decodeURIComponent(&quot;%&quot;)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Anatomie de l'objet Error */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Anatomie et cycle de vie de l&apos;objet Error
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Lorsqu&apos;une exception est instanciée via <code className="text-emerald-700 font-mono font-bold">new Error(&quot;Message&quot;)</code> ou levée par le runtime, JavaScript produit un objet doté de 4 propriétés fondamentales :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-xs text-emerald-700">error.name</span>
            <p className="text-xs text-slate-700 mt-1">Le type de l&apos;erreur (ex: &quot;TypeError&quot;, &quot;RangeError&quot;, ou classe dérivée).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-xs text-emerald-700">error.message</span>
            <p className="text-xs text-slate-700 mt-1">La description lisible de la violation (ex: &quot;Cannot read properties of null&quot;).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-xs text-emerald-700">error.stack</span>
            <p className="text-xs text-slate-700 mt-1">La trace complète d&apos;exécution reliant chaque frame d&apos;appel au fichier et à la ligne.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-xs text-emerald-700">error.cause</span>
            <p className="text-xs text-slate-700 mt-1">Norme ES2022 : permet d&apos;encapsuler l&apos;erreur d&apos;origine lors d&apos;un re-throw.</p>
          </div>
        </div>
      </section>

      {/* 5. Lieu vs Cause Racine */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Principe fondamental : Distinguer le lieu du crash de la cause racine
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Un piège universel en débogage consiste à corriger aveuglément la ligne signalée par la Stack Trace. <strong>L&apos;instruction qui plante n&apos;est presque jamais coupable : elle ne fait que révéler un état corrompu produit en amont.</strong>
        </p>

        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-3">
          <div className="text-emerald-400 font-bold">{`// Exemple typique de décalage temporel :`}</div>
          <div>{`function findUser(users, id) {
  return users.find(u => u.id === id); // Retourne undefined si absent !
}

function displayUser(user) {
  console.log(user.name); // 💥 TypeError: Cannot read properties of undefined
}

function main() {
  const users = [{ id: 1, name: "Ahmed" }];
  const user = findUser(users, 99); // L'origine du problème est ICI
  displayUser(user);
}`}</div>
        </div>

        <Callout type="info">
          Dans cet exemple, la Stack Trace accuse <code className="text-slate-900 font-mono font-bold">displayUser (app.js:6)</code>. Mais la cause racine est l&apos;absence de gestion du cas où <code className="text-slate-900 font-mono font-bold">findUser()</code> ne trouve aucun enregistrement. La véritable correction réside dans la validation défensive avant consommation.
        </Callout>
      </section>

      {/* Console Interactive Simulator */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="code" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            Simulateur pratique : Observer les exceptions et Stack Traces en direct
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Testez ci-dessous l&apos;apparition d&apos;une TypeError, inspectez sa Stack Trace, ou filtrez les flux de la console :
        </p>
        <DebuggingConsoleSimulator />
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.1
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle catégorie d'erreur apparaît lorsqu'une parenthèse est manquante ?",
              options: [
                "TypeError",
                "SyntaxError",
                "RangeError",
                "ReferenceError"
              ],
              correctIndex: 1,
              explanation: "Une parenthèse manquante empêche la compilation grammaticale du script : le moteur V8 lève une SyntaxError."
            },
            {
              id: 2,
              question: "Que signifie une ReferenceError ?",
              options: [
                "Une variable ou référence n'est pas accessible dans la portée courante",
                "Une division par zéro a été effectuée",
                "Une requête HTTP a échoué",
                "Une propriété est lue sur null"
              ],
              correctIndex: 0,
              explanation: "ReferenceError survient lorsqu'on tente d'accéder à un identifiant non déclaré ou situé dans la Temporal Dead Zone."
            },
            {
              id: 3,
              question: "Quelle erreur apparaît lorsqu'on tente de lire une propriété sur null (ex: null.name) ?",
              options: [
                "SyntaxError",
                "TypeError",
                "URIError",
                "RangeError"
              ],
              correctIndex: 1,
              explanation: "Tenter d'accéder à une propriété sur null ou undefined lève systématiquement une TypeError."
            },
            {
              id: 4,
              question: "Que retourne Array.prototype.find() lorsqu'aucun élément ne correspond au prédicat ?",
              options: [
                "null",
                "false",
                "undefined",
                "[]"
              ],
              correctIndex: 2,
              explanation: "find() retourne undefined en cas d'absence de correspondance. Tenter de lire ses propriétés sans contrôle provoque un crash en TypeError."
            },
            {
              id: 5,
              question: "Quelle instruction ne provoque AUCUNE exception en JavaScript natif ?",
              options: [
                "const x = 10 / 0;",
                "const u = null; u.name;",
                "decodeURIComponent('%');",
                "unknownFunction();"
              ],
              correctIndex: 0,
              explanation: "10 / 0 produit la valeur spéciale Infinity sans lever d'exception d'exécution."
            }
          ]}
        />
      </section>
    </div>
  );
};
