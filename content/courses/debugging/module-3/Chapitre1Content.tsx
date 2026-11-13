'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { DebuggingConsoleSimulator } from '@/components/interactive/DebuggingConsoleSimulator';
import { Icon } from '@/components/common/Icon';

type ErrorDemoType = 'syntax' | 'runtime' | 'logic' | 'silent';

export const Chapitre1Content: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<ErrorDemoType>('runtime');
  const [calcNumerator, setCalcNumerator] = useState<number>(10);
  const [calcDenominator, setCalcDenominator] = useState<number>(0);

  const divisionResult = calcDenominator === 0 ? 'Infinity' : (calcNumerator / calcDenominator).toFixed(2);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Comprendre les erreurs JavaScript en profondeur
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi JavaScript pardonne-t-il une division par zéro mais fait-il exploser votre serveur sur un malheureux <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">user.name</code> ? Entrez dans les coulisses du moteur V8, maîtrisez l&apos;arbre taxonomique des exceptions natives, découvrez la propriété moderne <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">error.cause</code> et apprenez à déjouer les pièges silencieux.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          <span>1. Objectifs d&apos;apprentissage opérationnels</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-800">
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">La triade des erreurs :</strong>
              <span>Distinguer les erreurs de parsing (Syntaxe), les interruptions brutales (Runtime) et les erreurs silencieuses (Logique).</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Taxonomie des erreurs natives V8 :</strong>
              <span>Identifier instantanément le comportement de <code className="font-mono">TypeError</code>, <code className="font-mono">ReferenceError</code>, <code className="font-mono">RangeError</code>, et <code className="font-mono">URIError</code>.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Anatomie de l&apos;objet Error &amp; ES2022 :</strong>
              <span>Exploiter <code className="font-mono">error.name</code>, <code className="font-mono">error.message</code>, <code className="font-mono">error.stack</code> et le chaînage d&apos;erreurs avec <code className="font-mono">error.cause</code>.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Les faux amis silencieux de JavaScript :</strong>
              <span>Comprendre pourquoi <code className="font-mono">Infinity</code> et <code className="font-mono">NaN</code> ne lèvent aucune exception alors qu&apos;ils faussent vos calculs.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Les 3 grandes catégories */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Les trois grandes catégories d&apos;erreurs : La métaphore du voyage
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Pour appréhender les erreurs sans panique, comparez l&apos;exécution d&apos;un script à un trajet en voiture vers une destination :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Syntaxe */}
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/70 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600"></span>
              <strong className="font-bold text-rose-950 text-sm">1. Erreur de Syntaxe</strong>
            </div>
            <div className="text-[11px] font-bold text-rose-800 uppercase">La voiture refuse de démarrer</div>
            <p className="text-xs text-slate-700 font-medium">
              Une règle grammaticale du langage est violée (accolade manquante, mot-clé mal écrit). Le moteur V8 refuse même de lancer la première ligne du script !
            </p>
            <div className="p-2.5 bg-slate-950 rounded-xl text-[11px] font-mono text-rose-300">
              console.log(user;<br />
              <span className="text-slate-500">{'// SyntaxError: missing )'}</span>
            </div>
          </div>

          {/* Runtime */}
          <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/70 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-600"></span>
              <strong className="font-bold text-amber-950 text-sm">2. Erreur d&apos;Exécution (Runtime)</strong>
            </div>
            <div className="text-[11px] font-bold text-amber-800 uppercase">Le pont s&apos;écroule sur la route</div>
            <p className="text-xs text-slate-700 font-medium">
              La voiture roule bien, mais à mi-chemin, le code tente une opération impossible (déréférencer <code className="font-mono">null</code>). Le thread crashe instantanément !
            </p>
            <div className="p-2.5 bg-slate-950 rounded-xl text-[11px] font-mono text-amber-300">
              user.getName();<br />
              <span className="text-slate-500">{'// TypeError: user is null'}</span>
            </div>
          </div>

          {/* Logique */}
          <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/70 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <strong className="font-bold text-blue-950 text-sm">3. Erreur de Logique Métier</strong>
            </div>
            <div className="text-[11px] font-bold text-blue-800 uppercase">Arriver dans la mauvaise ville</div>
            <p className="text-xs text-slate-700 font-medium">
              Aucune erreur rouge n&apos;apparaît. Le code s&apos;exécute à 100%, mais le résultat est faux parce que la formule ou la condition est incorrecte.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-xl text-[11px] font-mono text-cyan-300">
              return price - discount;<br />
              <span className="text-slate-500">{'// Faux si remise en % !'}</span>
            </div>
          </div>
        </div>

        {/* Le piège d'Infinity */}
        <Callout type="warning" title="Les pièges silencieux : Quand JavaScript ne prévient pas">
          <p className="text-sm leading-relaxed">
            Dans la plupart des langages (Python, Java, C#), diviser par zéro (<code className="font-mono">10 / 0</code>) provoque une exception fatale. 
            <strong>En JavaScript, cela ne produit aucune erreur !</strong> Le moteur retourne silencieusement la valeur primitive spéciale <code className="font-mono text-slate-900 font-bold">Infinity</code>. De même, <code className="font-mono">Math.sqrt(-1)</code> retourne <code className="font-mono text-slate-900 font-bold">NaN</code>. Vos calculs comptables ou financiers deviennent totalement faussés sans qu&apos;aucun bloc <code className="font-mono">try / catch</code> ne puisse les intercepter !
          </p>
        </Callout>
      </section>

      {/* 3. Typologie des erreurs natives */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Typologie et comportement des erreurs natives V8
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Toutes les exceptions d&apos;exécution levées par le moteur JavaScript héritent de la classe de base <code className="font-mono text-emerald-700 font-bold">Error</code>. Voici le tableau de référence indispensable :
        </p>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs border-b border-slate-300">
              <tr>
                <th className="p-3.5">Classe d&apos;Erreur</th>
                <th className="p-3.5">Condition exacte de déclenchement</th>
                <th className="p-3.5">Exemple de code déclencheur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-rose-700">SyntaxError</td>
                <td className="p-3.5 text-xs text-slate-600">Jeton inattendu ou grammaire violée lors du parsing.</td>
                <td className="p-3.5 font-mono text-xs text-rose-800">const = 100; // jeton manquant</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-amber-700">ReferenceError</td>
                <td className="p-3.5 text-xs text-slate-600">Accès à un identifiant non déclaré ou situé dans la Temporal Dead Zone (TDZ).</td>
                <td className="p-3.5 font-mono text-xs text-amber-800">console.log(unknownVar);</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-purple-700">TypeError</td>
                <td className="p-3.5 text-xs text-slate-600">Opération incompatible avec la valeur (lire une propriété sur null ou appeler un objet comme une fonction).</td>
                <td className="p-3.5 font-mono text-xs text-purple-800">null.toUpperCase() ou user()</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-blue-700">RangeError</td>
                <td className="p-3.5 text-xs text-slate-600">Valeur numérique en dehors de l&apos;intervalle autorisé ou récursion infinie de la pile d&apos;appels.</td>
                <td className="p-3.5 font-mono text-xs text-blue-800">new Array(-5) / recursion();</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-teal-700">URIError</td>
                <td className="p-3.5 text-xs text-slate-600">Séquence d&apos;échappement URI invalide transmise à <code className="font-mono">decodeURIComponent()</code>.</td>
                <td className="p-3.5 font-mono text-xs text-teal-800">decodeURIComponent(&quot;%&quot;)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Anatomie de l'objet Error & ES2022 cause */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Anatomie de l&apos;objet Error et la révolution de la norme ES2022
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsqu&apos;une exception est instanciée via <code className="text-emerald-700 font-mono font-bold">new Error(&quot;Message&quot;)</code>, JavaScript produit un objet doté de 4 propriétés fondamentales :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
            <span className="font-mono font-bold text-xs text-emerald-700">error.name</span>
            <p className="text-xs text-slate-600 font-medium">Le type de l&apos;erreur (ex: &quot;TypeError&quot;, &quot;RangeError&quot;, ou classe personnalisée).</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
            <span className="font-mono font-bold text-xs text-emerald-700">error.message</span>
            <p className="text-xs text-slate-600 font-medium">La description lisible de la violation (ex: &quot;Cannot read properties of null&quot;).</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
            <span className="font-mono font-bold text-xs text-emerald-700">error.stack</span>
            <p className="text-xs text-slate-600 font-medium">La trace complète d&apos;exécution reliant chaque frame d&apos;appel au fichier et à la ligne.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
            <span className="font-mono font-bold text-xs text-indigo-700">error.cause (ES2022)</span>
            <p className="text-xs text-slate-600 font-medium">Permet d&apos;encapsuler l&apos;erreur d&apos;origine lors d&apos;un re-throw sans perdre la stack initiale.</p>
          </div>
        </div>

        {/* CodeBlock error.cause */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold uppercase text-indigo-700">Le pattern moderne de chaînage avec error.cause :</span>
          <CodeBlock
            language="javascript"
            code={`async function chargerDonneesClient(userId) {
  try {
    const res = await database.query("SELECT * FROM users WHERE id = ?", [userId]);
    return res[0];
  } catch (dbError) {
    // 💡 Norme ES2022 : On lève une erreur métier de haut niveau
    // tout en préservant l'erreur SQL originelle sous-jacente !
    throw new Error("Impossible de charger le profil utilisateur", { cause: dbError });
  }
}

// À la capture :
try {
  await chargerDonneesClient(42);
} catch (err) {
  console.error("Erreur applicative :", err.message);
  console.error("Cause racine réelle en base :", err.cause.message); // SQL query timeout !
}`}
          />
        </div>
      </section>

      {/* 5. Lieu du crash vs Cause racine */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Principe fondamental : Distinguer le lieu du crash de la cause racine
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Un piège universel en débogage consiste à corriger aveuglément la ligne signalée par la Stack Trace. 
          <strong>L&apos;instruction qui plante n&apos;est presque jamais coupable : elle ne fait que révéler un état corrompu produit en amont.</strong>
        </p>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-700">Démonstration du décalage temporel :</span>
          <CodeBlock
            language="javascript"
            code={`function findUser(users, id) {
  // ⚠️ CAUSE RACINE : .find() renvoie undefined si l'id n'existe pas !
  return users.find(u => u.id === id); 
}

function displayUser(user) {
  // 💥 LIEU DU CRASH :
  // TypeError: Cannot read properties of undefined (reading 'name')
  console.log(user.name); 
}

function main() {
  const users = [{ id: 1, name: "Ahmed" }];
  const user = findUser(users, 99); // L'origine du problème est ICI
  displayUser(user);
}`}
          />
        </div>

        <Callout type="info" title="L'enseignement de l'ingénieur">
          <p className="text-sm leading-relaxed">
            Dans cet exemple, la Stack Trace accuse formellement <code className="font-mono text-slate-900 font-bold">displayUser (app.js:8)</code>. 
            Mais accuser <code className="font-mono">displayUser</code> est une erreur : la fonction fait son travail honnêtement. La vraie défaillance réside dans l&apos;absence de gestion du cas où <code className="font-mono">findUser()</code> ne trouve aucun enregistrement. La véritable correction réside dans la validation défensive avant consommation.
          </p>
        </Callout>
      </section>

      {/* 6. Laboratoire Interactif */}
      <section className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>Laboratoire Interactif</span>
          </div>
          <h2 className="text-[22px] font-black text-slate-950 tracking-tight">
            6. Simulateur pratique : Expérimentez les pièges de calcul et d&apos;exécution
          </h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Testez ci-dessous le comportement réel du moteur JavaScript sur les différents types d&apos;erreurs :
          </p>
        </div>

        {/* Buttons selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDemo('runtime')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDemo === 'runtime'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1. TypeError (null.property)
          </button>
          <button
            onClick={() => setSelectedDemo('syntax')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDemo === 'syntax'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            2. SyntaxError (Parsing bloqué)
          </button>
          <button
            onClick={() => setSelectedDemo('silent')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDemo === 'silent'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            3. Piège Silencieux (Infinity / NaN)
          </button>
        </div>

        {/* Interactive Viewer Card */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-5 shadow-sm">
          {selectedDemo === 'runtime' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 text-slate-200 space-y-1">
                <div className="text-slate-500">{'// Instruction exécutée en direct :'}</div>
                <div>const client = null;</div>
                <div className="text-rose-400 font-bold">console.log(client.email);</div>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 space-y-1">
                <div className="font-bold">💥 Uncaught TypeError: Cannot read properties of null (reading &apos;email&apos;)</div>
                <div className="text-[11px] text-rose-300/80 pl-2">at eval (sandbox.js:2:16)</div>
              </div>
              <p className="text-xs text-slate-600 font-sans font-medium">
                💡 Le moteur a commencé à exécuter la ligne 1, mais s&apos;est brutalement arrêté à la ligne 2 car <code className="font-mono">null</code> n&apos;a aucune propriété.
              </p>
            </div>
          )}

          {selectedDemo === 'syntax' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 text-slate-200 space-y-1">
                <div className="text-slate-500">{'// Instruction envoyée au compilateur V8 :'}</div>
                <div className="text-rose-400 font-bold">const nom = ;</div>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 space-y-1">
                <div className="font-bold">❌ Uncaught SyntaxError: Unexpected token &apos;;&apos;</div>
                <div className="text-[11px] text-rose-300/80 pl-2">at parseScript (v8/src/parsing/parser.cc:412)</div>
              </div>
              <p className="text-xs text-slate-600 font-sans font-medium">
                💡 Zéro ligne de ce fichier ne s&apos;est exécutée ! Le compilateur a rejeté le code dès l&apos;analyse grammaticale préliminaire.
              </p>
            </div>
          )}

          {selectedDemo === 'silent' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-900 block font-sans">Numérateur : {calcNumerator}</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={calcNumerator}
                    onChange={(e) => setCalcNumerator(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-900 block font-sans">
                    Dénominateur : <strong className={calcDenominator === 0 ? 'text-rose-600' : 'text-slate-900'}>{calcDenominator}</strong>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={calcDenominator}
                    onChange={(e) => setCalcDenominator(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center justify-between">
                <span>Résultat : {calcNumerator} / {calcDenominator} =</span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded ${
                  calcDenominator === 0 ? 'bg-amber-900 text-amber-300' : 'bg-emerald-900 text-emerald-300'
                }`}>
                  {divisionResult}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                ⚠️ Constatez : le dénominateur vaut <strong>0</strong>, mais <strong>AUCUNE exception n&apos;a été levée</strong> ! Si ce calcul représente un montant de facture, le client sera débité de <code className="font-mono">Infinity €</code> !
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. Simulateur Console Émulée */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="code" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[20px] font-bold text-slate-900">
            7. Console DevTools interactive : Observer les exceptions et Stack Traces
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Testez ci-dessous l&apos;apparition d&apos;une TypeError, inspectez sa Stack Trace, ou filtrez les flux de la console :
        </p>
        <DebuggingConsoleSimulator />
      </section>

      {/* 8. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>8. Quiz de validation — Chapitre 3.1</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle catégorie d'erreur apparaît lorsqu'une parenthèse est manquante dans une instruction ?",
              options: [
                "TypeError",
                "SyntaxError",
                "RangeError",
                "ReferenceError"
              ],
              correctIndex: 1,
              explanation: "Une parenthèse manquante empêche la compilation grammaticale du script : le moteur V8 lève une SyntaxError dès le parsing."
            },
            {
              id: 2,
              question: "Que signifie une ReferenceError en JavaScript ?",
              options: [
                "Une variable ou référence n'est pas accessible dans la portée courante (ou se trouve en TDZ)",
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
              question: "Que produit l'instruction 'const ratio = 100 / 0;' en JavaScript natif ?",
              options: [
                "Une ZeroDivisionError bloquante",
                "La valeur primitive Infinity sans lever aucune exception",
                "null",
                "NaN"
              ],
              correctIndex: 1,
              explanation: "En JavaScript, la division par zéro ne plante pas : elle retourne la valeur spéciale Infinity sans lever d'exception."
            },
            {
              id: 5,
              question: "À quoi sert la propriété 'error.cause' introduite dans la norme ECMAScript 2022 ?",
              options: [
                "À supprimer les erreurs de la console",
                "À encapsuler l'erreur originelle (ex: erreur SQL) lors du re-throw d'une nouvelle erreur métier de haut niveau",
                "À traduire les messages d'erreur en français",
                "À désactiver le moteur V8"
              ],
              correctIndex: 1,
              explanation: "error.cause permet de conserver l'erreur source d'origine dans la nouvelle exception levée, préservant la traçabilité complète."
            },
            {
              id: 6,
              question: "Pourquoi est-il erroné de corriger aveuglément la ligne signalée par la Stack Trace lors d'une TypeError ?",
              options: [
                "Parce que la Stack Trace est fausse",
                "Parce que la ligne signalée ne fait que révéler un état corrompu (undefined/null) produit par une fonction en amont",
                "Parce que le compilateur est trop lent",
                "Parce que Chrome n'affiche que les erreurs CSS"
              ],
              correctIndex: 1,
              explanation: "La ligne du crash est le révélateur, mais la cause racine est la fonction en amont qui a transmis la valeur corrompue."
            }
          ]}
        />
      </section>
    </div>
  );
};
