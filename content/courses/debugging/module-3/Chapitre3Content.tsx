'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { StepDebuggerSandbox } from '@/components/interactive/StepDebuggerSandbox';
import { Icon } from '@/components/common/Icon';

type ScopeDemoKey = 'tdz' | 'loop_var_vs_let' | 'shadowing' | 'closure_leak';

interface ScopeScenario {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  scopeState: {
    blockScope?: Record<string, string>;
    closureScope?: Record<string, string>;
    scriptScope: Record<string, string>;
    globalScope: Record<string, string>;
  };
  diagnostic: string;
  remedy: string;
}

const SCOPE_SCENARIOS: Record<ScopeDemoKey, ScopeScenario> = {
  tdz: {
    title: '1. La Temporal Dead Zone (TDZ)',
    badge: 'ReferenceError',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Accéder à une variable let ou const avant sa ligne d\'affectation déclenche un crash immédiat, même si elle a bien été hissée par le compilateur V8.',
    codeSnippet: `console.log("Nom client:", clientName); // 💥 ReferenceError !
let clientName = "Sophie";`,
    scopeState: {
      scriptScope: {
        clientName: '<UNINITIALIZED (TDZ)>'
      },
      globalScope: {
        window: 'Window Object',
        document: 'Document'
      }
    },
    diagnostic: 'V8 alloue la variable dès la phase de compilation (Parsing AST), mais interdit formellement toute lecture ou écriture tant que l\'instruction "let clientName =" n\'a pas été évaluée.',
    remedy: 'Déclarez et initialisez toujours vos variables en tête de leur bloc lexical avant toute utilisation.'
  },
  loop_var_vs_let: {
    title: '2. Capture asynchrone dans une boucle (var vs let)',
    badge: 'Closure Mutation',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Une variable déclarée avec var est partagée par référence entre toutes les itérations, corrompant les rappels asynchrones (setTimeout, Promise, EventListeners).',
    codeSnippet: `// 💥 Avec var : les 3 callbacks affichent "Index: 3" !
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("Index:", i), 100);
}

// ✅ Avec let : chaque tour crée un nouveau scope lexical lié à la valeur exacte (0, 1, 2)
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("Index:", j), 100);
}`,
    scopeState: {
      blockScope: {
        'j (itération courante)': '2'
      },
      closureScope: {
        'i (partagé par tous)': '3 (valeur finale)'
      },
      scriptScope: {
        callbacks: 'Array(3) [ƒ, ƒ, ƒ]'
      },
      globalScope: {
        setTimeout: 'ƒ setTimeout()'
      }
    },
    diagnostic: 'Avec "var", il n\'existe qu\'un seul emplacement mémoire pour "i". Lorsque les timers s\'exécutent 100ms plus tard, la boucle s\'est achevée et "i" vaut 3 pour tout le monde.',
    remedy: 'Bannissez "var". L\'instruction "for (let j = ...)" réinstancie automatiquement un environnement lexical distinct à chaque itération.'
  },
  shadowing: {
    title: '3. Masquage de variable (Variable Shadowing)',
    badge: 'Bug Logique Silencieux',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Redéclarer un identifiant identique dans une fonction ou un bloc intérieur masque la variable du scope parent sans lever d\'erreur.',
    codeSnippet: `let orderTotal = 150; // Total global du panier

function applyPromotion() {
  let orderTotal = 0; // ⚠️ SHADOWING : Nouvelle variable locale créée !
  orderTotal += 50;   // Modifie UNIQUEMENT la variable locale
  return orderTotal;
}

applyPromotion();
console.log(orderTotal); // Affiche toujours 150 ! (La commande n'a pas bougé)`,
    scopeState: {
      blockScope: {
        'orderTotal (Local)': '50'
      },
      scriptScope: {
        'orderTotal (Outer)': '150 (Inchangé !)'
      },
      globalScope: {
        applyPromotion: 'ƒ applyPromotion()'
      }
    },
    diagnostic: 'La chaîne des portées résout le premier identifiant rencontré en remontant vers le parent. Le "let" intérieur a créé un écran occultant la variable englobante.',
    remedy: 'Activez la règle ESLint "no-shadow" et nommez distinctement vos variables (ex: discountSubtotal vs finalOrderTotal).'
  },
  closure_leak: {
    title: '4. Fuite mémoire par rétention de scope (Closure Leak)',
    badge: 'Memory Leak',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Une closure conserve vivante la totalité des variables de son environnement lexical englobant, même celles dont elle ne se sert pas directement.',
    codeSnippet: `function setupAuthListener() {
  const giantBuffer = new ArrayBuffer(10_000_000); // 10 Mo en mémoire
  const userRole = "ADMIN";

  // Cette closure retient TOUT le Scope Context en mémoire !
  return function checkPermission() {
    return userRole === "ADMIN";
  };
}`,
    scopeState: {
      closureScope: {
        userRole: '"ADMIN"',
        giantBuffer: 'ArrayBuffer(10000000) [retenu en RAM]'
      },
      scriptScope: {
        authGuard: 'ƒ checkPermission()'
      },
      globalScope: {
        setupAuthListener: 'ƒ setupAuthListener()'
      }
    },
    diagnostic: 'Tant que la fonction checkPermission est référencée, le Garbage Collector ne peut pas libérer giantBuffer car le bloc de scope parent est maintenu en vie.',
    remedy: 'Séparez les données lourdes dans une fonction dédiée ou réinitialisez explicitement les tampons à "null" une fois le traitement terminé.'
  }
};

export const Chapitre3Content: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<ScopeDemoKey>('tdz');
  const activeScenario = SCOPE_SCENARIOS[selectedDemo];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 3 — Identifier les erreurs de portée (Scope), Hoisting et Closures
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">ReferenceError: Cannot access &apos;x&apos; before initialization</code> paralyse-t-il votre application alors que la variable est écrite trois lignes plus bas ? Comment une simple boucle <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">var</code> transforme-t-elle des rappels asynchrones en désastre ? Plongez au cœur des environnements lexicaux du moteur V8, maîtrisez la Temporal Dead Zone (TDZ) et apprenez à inspecter la chaîne des scopes dans le débogueur.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser la hiérarchie des 4 portées lexicales (Global, Module, Fonction, Bloc).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre les deux phases de compilation du moteur V8 et diagnostiquer la Temporal Dead Zone (TDZ).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Démasquer les bogues de masquage (Shadowing) qui corrompent silencieusement les états d&apos;application.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Auditer les closures avec les outils DevTools pour prévenir les mutations involontaires et fuites mémoires.</span>
          </div>
        </div>
      </section>

      {/* 2. Les Portées Lexicales et la Scope Chain */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 portées lexicales et la chaîne de résolution (Scope Chain)
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          JavaScript utilise une <strong>portée lexicale statique</strong> (<em>Lexical Scoping</em>) : la visibilité et l&apos;accessibilité d&apos;une variable sont déterminées par son emplacement textuel dans le code source au moment de l&apos;écriture, et non par l&apos;ordre dynamique des appels au moment de l&apos;exécution.
        </p>

        {/* Métaphore pédagogique */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 text-sm text-sky-950 space-y-2">
          <div className="flex items-center gap-2 font-black text-sky-900 uppercase text-xs tracking-wider">
            <Icon name="info" className="w-4 h-4 text-sky-700" />
            <span>Métaphore des poupées russes (Matriochkas) ou de la vitre sans tain</span>
          </div>
          <p className="leading-relaxed">
            Imaginez la chaîne des portées comme un ensemble de pièces fermées par des vitres sans tain. Depuis la pièce la plus imbriquée (le bloc <code className="font-mono text-xs font-bold text-sky-900">if</code> ou la fonction interne), vous pouvez regarder vers l&apos;extérieur et voir tout ce qui se trouve dans la pièce parente, le module et la portée globale. Mais une personne située dans la pièce extérieure <strong>ne peut jamais regarder à l&apos;intérieur d&apos;une pièce enfant</strong>.
          </p>
        </div>

        {/* Tableau comparatif des 4 portées */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm mt-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Niveau de Portée</th>
                <th className="p-3.5 border-b border-slate-200">Délimitation dans le code</th>
                <th className="p-3.5 border-b border-slate-200">Mots-clés concernés</th>
                <th className="p-3.5 border-b border-slate-200">Durée de vie en mémoire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-purple-700">1. Portée Globale (Global)</td>
                <td className="p-3.5">Fichier racine sans module (<code className="font-mono text-xs">window</code>, <code className="font-mono text-xs">globalThis</code>)</td>
                <td className="p-3.5 font-mono text-xs">var, function, déclarations nues</td>
                <td className="p-3.5 text-rose-700 font-semibold">Toute la durée de vie de l&apos;onglet ou du processus Node.js</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-indigo-700">2. Portée de Module (Module)</td>
                <td className="p-3.5">Fichier ES Module isolé (<code className="font-mono text-xs">import / export</code>)</td>
                <td className="p-3.5 font-mono text-xs">const, let, function, class</td>
                <td className="p-3.5">Tant que le module reste chargé en cache</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-sky-700">3. Portée de Fonction (Local)</td>
                <td className="p-3.5">Corps d&apos;une fonction <code className="font-mono text-xs">&#123; ... &#125;</code></td>
                <td className="p-3.5 font-mono text-xs">var, let, const, paramètres</td>
                <td className="p-3.5">Détruite à la fin du return (sauf si capturée par une closure !)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-emerald-700">4. Portée de Bloc (Block)</td>
                <td className="p-3.5">Accolades d&apos;un <code className="font-mono text-xs">if</code>, <code className="font-mono text-xs">for</code>, <code className="font-mono text-xs">while</code>, <code className="font-mono text-xs">try/catch</code></td>
                <td className="p-3.5 font-mono text-xs font-bold text-emerald-800">let, const strictement</td>
                <td className="p-3.5">Détruite dès que le flux d&apos;exécution quitte l&apos;accolade fermante</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Différence var vs let/const */}
        <div className="space-y-2 mt-4">
          <h3 className="text-base font-bold text-slate-900">
            Pourquoi le mot-clé historique <code className="font-mono text-rose-700">var</code> est la source de fuites de portée
          </h3>
          <p className="text-sm text-slate-700">
            Le mot-clé <code className="font-mono text-xs font-bold">var</code> ignore totalement les blocs <code className="font-mono text-xs">&#123; ... &#125;</code> d&apos;un <code className="font-mono text-xs">if</code> ou d&apos;une boucle. Il &quot;fuit&quot; dans la fonction englobante ou pollue l&apos;objet global <code className="font-mono text-xs">window</code> :
          </p>
          <CodeBlock
            language="typescript"
            filename="scope-leak-example.ts"
            code={`function checkUserAge(age: number) {
  if (age >= 18) {
    var isAdult = true; // ⚠️ Fuite hors du bloc if !
    let isVoter = true; // ✅ Strictement confiné au bloc if
  }

  console.log(isAdult); // Affiche 'true' (var a fuité hors du if !)
  console.log(isVoter); // 💥 ReferenceError: isVoter is not defined (let est protégé)
}`}
          />
        </div>
      </section>

      {/* 3. Hoisting et TDZ */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Démystification du Hoisting et la Temporal Dead Zone (TDZ)
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Pour comprendre pourquoi une variable <code className="font-mono text-xs">var</code> renvoie mystérieusement <code className="font-mono text-xs">undefined</code> tandis qu&apos;une variable <code className="font-mono text-xs">let</code> déclenche un crash violent, il faut observer le fonctionnement du moteur V8 en <strong>deux phases distinctes</strong>.
        </p>

        {/* Les 2 phases de V8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <span className="font-bold text-amber-900 font-mono uppercase text-xs flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-xs">1</span>
              <span>Phase 1 : Compilation & Parsing (AST)</span>
            </span>
            <p className="text-amber-950 font-medium leading-relaxed">
              Avant d&apos;exécuter la première ligne, V8 scanne l&apos;intégralité du fichier. Dès qu&apos;il rencontre une déclaration (<code className="font-mono text-xs font-bold">var</code>, <code className="font-mono text-xs font-bold">let</code>, <code className="font-mono text-xs font-bold">const</code>, <code className="font-mono text-xs font-bold">function</code>), il enregistre l&apos;identifiant dans la table des symboles (l&apos;<em>Environment Record</em>). C&apos;est le <strong>Hoisting</strong> (hissage).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <span className="font-bold text-emerald-900 font-mono uppercase text-xs flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-xs">2</span>
              <span>Phase 2 : Exécution séquentielle (Ignition)</span>
            </span>
            <p className="text-emerald-950 font-medium leading-relaxed">
              Le moteur parcourt le code ligne par ligne pour exécuter les instructions arithmétiques, affecter les valeurs et appeler les fonctions. La différence critique réside dans l&apos;état d&apos;initialisation mémoire entre <code className="font-mono text-xs font-bold">var</code> et <code className="font-mono text-xs font-bold">let/const</code>.
            </p>
          </div>
        </div>

        {/* Comparatif visuel direct */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono mt-4">
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-amber-400 uppercase text-xs">Hoisting avec var (Initialisé)</span>
              <span className="text-[11px] text-amber-300 font-bold">undefined par défaut</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto">{`console.log(clientName); // 'undefined' (pas d'erreur !)
var clientName = "Karim";

// Ce que V8 compile en réalité :
var clientName; // Hissé ET pré-initialisé à undefined
console.log(clientName);
clientName = "Karim";`}</pre>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950 text-rose-100 border border-rose-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-rose-300 uppercase text-xs">Temporal Dead Zone avec let/const</span>
              <span className="text-[11px] text-rose-400 font-bold">ReferenceError immédiate</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto">{`// Zone Morte Temporelle (TDZ) active ici :
console.log(accountBalance); // 💥 ReferenceError !
let accountBalance = 1500;

// V8 a enregistré l'identifiant, mais interdit tout
// accès tant que l'initialisation n'est pas franchie.`}</pre>
          </div>
        </div>

        {/* Déclaration de fonction vs Expression de fonction */}
        <Callout type="warning" title="Piège classique : Function Declaration vs Function Expression">
          <p className="text-sm leading-relaxed">
            Une fonction déclarée avec la syntaxe <code className="font-mono font-bold">function calculateTotal() &#123; ... &#125;</code> est entièrement hissée (corps compris) : elle peut être appelée avant sa déclaration. En revanche, une fonction fléchée stockée dans une variable <code className="font-mono font-bold">const calculateTotal = () =&gt; &#123; ... &#125;</code> obéit aux règles de la TDZ et déclenchera un crash immédiat si vous l&apos;invoquez plus haut dans le fichier !
          </p>
        </Callout>
      </section>

      {/* 4. Simulateur Interactif : Scope & Closure Explorer */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="search" className="w-5 h-5 text-lime-700" />
              <span>4. Simulateur Interactif : Inspection de la Chaîne des Scopes</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sélectionnez un scénario d&apos;anomalie de portée pour visualiser l&apos;état exact des environnements lexicaux enregistrés dans le moteur JavaScript.
            </p>
          </div>
        </div>

        {/* Boutons sélecteurs de scénarios */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {(Object.keys(SCOPE_SCENARIOS) as ScopeDemoKey[]).map((key) => {
            const scenario = SCOPE_SCENARIOS[key];
            const isSelected = selectedDemo === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDemo(key)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded border inline-block mb-1 ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
                <div className="text-xs font-bold truncate">{scenario.title}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'inspection en direct */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Scénario actif :</span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activeScenario.title}
              </h3>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${activeScenario.badgeColor}`}>
              {activeScenario.badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            {activeScenario.description}
          </p>

          {/* Grille Code vs État de la Scope Chain */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Snippet de code */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Code source inspecté :
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-lime-300 overflow-x-auto leading-relaxed">
                {activeScenario.codeSnippet}
              </pre>
            </div>

            {/* Arborescence de la Scope Chain (Simulation DevTools) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                DevTools Sources &gt; Scope Chain :
              </span>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-3">
                {/* Block Scope */}
                {activeScenario.scopeState.blockScope && (
                  <div className="space-y-1">
                    <span className="text-emerald-400 font-bold block text-[11px] font-sans">
                      ▼ Block Scope (Local) :
                    </span>
                    <div className="pl-3 border-l-2 border-emerald-500/50 space-y-0.5 text-slate-300">
                      {Object.entries(activeScenario.scopeState.blockScope).map(([k, v]) => (
                        <div key={k}>
                          <span className="text-slate-400">{k}: </span>
                          <span className="text-emerald-300 font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Closure Scope */}
                {activeScenario.scopeState.closureScope && (
                  <div className="space-y-1">
                    <span className="text-purple-400 font-bold block text-[11px] font-sans">
                      ▼ Closure Scope (Parent Lexical) :
                    </span>
                    <div className="pl-3 border-l-2 border-purple-500/50 space-y-0.5 text-slate-300">
                      {Object.entries(activeScenario.scopeState.closureScope).map(([k, v]) => (
                        <div key={k}>
                          <span className="text-slate-400">{k}: </span>
                          <span className="text-purple-300 font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Script Scope */}
                <div className="space-y-1">
                  <span className="text-sky-400 font-bold block text-[11px] font-sans">
                    ▼ Script / Module Scope :
                  </span>
                  <div className="pl-3 border-l-2 border-sky-500/50 space-y-0.5 text-slate-300">
                    {Object.entries(activeScenario.scopeState.scriptScope).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-slate-400">{k}: </span>
                        <span className={v.includes('UNINITIALIZED') ? 'text-rose-400 font-black' : 'text-sky-300 font-bold'}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Global Scope */}
                <div className="space-y-1">
                  <span className="text-amber-400 font-bold block text-[11px] font-sans">
                    ▼ Global Scope (window / globalThis) :
                  </span>
                  <div className="pl-3 border-l-2 border-amber-500/50 space-y-0.5 text-slate-400 text-[11px]">
                    {Object.entries(activeScenario.scopeState.globalScope).map(([k, v]) => (
                      <div key={k}>{k}: {v}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-1">
              <span className="text-rose-300 font-bold text-xs uppercase tracking-wider block font-sans">
                Analyse de l&apos;anomalie :
              </span>
              <p className="text-xs text-rose-100/90 leading-relaxed font-sans">
                {activeScenario.diagnostic}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-1">
              <span className="text-emerald-300 font-bold text-xs uppercase tracking-wider block font-sans">
                Remède recommandé :
              </span>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-sans">
                {activeScenario.remedy}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Le Débogueur Pas-à-Pas en Action */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            5. Bac à Sable Débogueur : Observer l&apos;évolution du Scope et du Call Stack
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Exécutez ce script pas-à-pas à l&apos;aide des commandes <strong>Step Into (F11)</strong> et <strong>Step Over (F10)</strong> pour observer comment les variables locales apparaissent et disparaissent du panneau <strong>Scope</strong> selon le frame actif dans le <strong>Call Stack</strong> :
        </p>
        <StepDebuggerSandbox />
      </section>

      {/* 6. TP Pratique : Audit et Résolution de 4 Bugs de Portée */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            6. Travaux Pratiques — Audit d&apos;un gestionnaire de sessions et compteurs
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Le code ci-dessous simule un module d&apos;authentification et de comptage d&apos;utilisateurs connectés. En conditions réelles, le serveur lève des erreurs de référence intempestives et les droits d&apos;accès sont corrompus par du masquage de variable involontaire.
        </p>

        {/* Code source bogué */}
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase text-rose-700 flex items-center gap-2">
            <Icon name="alert" className="w-4 h-4 text-rose-600" />
            <span>Code défaillant (4 anomalies de portée et closure)</span>
          </h3>
          <CodeBlock
            language="javascript"
            filename="buggy-session-manager.js"
            code={`// 1. VARIABLE GLOBALE DU STATUT DE SÉCURITÉ :
let isAuthenticated = false;

function initializeUserSession(userData) {
  // ANOMALIE 1 : Accès prématuré dans la Temporal Dead Zone (TDZ)
  console.log("Démarrage session pour:", activeSessionId);
  let activeSessionId = userData.sessionId;

  // ANOMALIE 2 : Shadowing accidentel de la variable de sécurité globale
  if (userData.hasValidToken) {
    let isAuthenticated = true; // ⚠️ Crée une variable locale sans toucher la globale !
  }

  // ANOMALIE 3 : var dans une boucle asynchrone pour logger les droits
  var permissions = ["READ", "WRITE", "DELETE"];
  for (var i = 0; i < permissions.length; i++) {
    setTimeout(function() {
      // 💥 Affiche "Permission 3: undefined" 3 fois de suite !
      console.log("Permission " + i + ": " + permissions[i]);
    }, 50);
  }

  return { activeSessionId, isAllowed: isAuthenticated };
}`}
          />
        </div>

        {/* Code source refactorisé */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Solution refactorisée et protégée contre les fuites de scope</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="safe-session-manager.ts"
            code={`interface UserData {
  sessionId: string;
  hasValidToken: boolean;
  roles?: string[];
}

interface SessionResult {
  activeSessionId: string;
  isAllowed: boolean;
}

// État d'authentification explicite et encapsulé
let globalIsAuthenticated = false;

export function initializeUserSessionSafe(userData: UserData): SessionResult {
  // SOLUTION 1 : Déclaration et initialisation immédiate en tête de scope (TDZ évitée)
  const activeSessionId = userData.sessionId;
  console.log("Démarrage session pour:", activeSessionId);

  // SOLUTION 2 : Pas de mot-clé 'let' qui masquerait la variable parente, assignation directe
  if (userData.hasValidToken) {
    globalIsAuthenticated = true;
  } else {
    globalIsAuthenticated = false;
  }

  // SOLUTION 3 : 'let' dans la boucle for instancie un nouvel environnement lexical par tour
  const permissions: readonly string[] = ["READ", "WRITE", "DELETE"];
  for (let index = 0; index < permissions.length; index++) {
    setTimeout(() => {
      // ✅ Capture fidèlement 0: READ, 1: WRITE, 2: DELETE
      console.log(\`Permission \${index}: \${permissions[index]}\`);
    }, 50);
  }

  return {
    activeSessionId,
    isAllowed: globalIsAuthenticated
  };
}`}
          />
        </div>
      </section>

      {/* 7. Synthèse : La Check-list Anti-Bogue de Portée */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Synthèse : Les 4 Règles d&apos;Or de Gestion du Scope
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : Bannir définitivement &quot;var&quot;</span>
            <p className="text-xs text-slate-700">Activez la règle ESLint <code className="font-mono font-bold">no-var: &quot;error&quot;</code>. Utilisez exclusivement <code className="font-mono font-bold">const</code> par défaut, et <code className="font-mono font-bold">let</code> uniquement pour les variables réassignées.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : Initialiser en tête de bloc (Adieu la TDZ)</span>
            <p className="text-xs text-slate-700">Déclarez vos constantes avant toute instruction consommatrice pour éliminer à 100% les risques de <code className="font-mono">ReferenceError</code> liées à la Temporal Dead Zone.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : Éviter le Shadowing</span>
            <p className="text-xs text-slate-700">Activez <code className="font-mono font-bold">no-shadow: &quot;error&quot;</code> dans votre linter pour interdire toute redéclaration de variable portant le même nom qu&apos;une variable parente ou globale.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : Surveiller les closures longues</span>
            <p className="text-xs text-slate-700">Si une fonction interne persiste longtemps (écouteur d&apos;événements, intervalle), assurez-vous qu&apos;elle ne retient pas de lourds buffers ou éléments DOM dans son scope parent.</p>
          </div>
        </div>
      </section>

      {/* 8. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          8. Quiz de validation — Chapitre 3.3
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle portée est respectée par les déclarations 'let' et 'const' en JavaScript moderne ?",
              options: [
                "Portée globale uniquement",
                "Portée de fonction uniquement",
                "Portée de bloc { ... } (if, for, while, etc.)",
                "Aucune portée (accessibles de partout)"
              ],
              correctIndex: 2,
              explanation: "let et const sont strictement confinées au bloc d'instructions délimité par des accolades {...}. Elles ne polluent jamais la portée extérieure."
            },
            {
              id: 2,
              question: "Que se passe-t-il si vous tentez de lire une variable 'let' avant sa ligne d'initialisation ?",
              options: [
                "Elle renvoie undefined sans erreur",
                "Elle lève immédiatement une ReferenceError car elle se situe dans sa Temporal Dead Zone (TDZ)",
                "Elle renvoie null",
                "Elle déclenche une boucle infinie"
              ],
              correctIndex: 1,
              explanation: "Bien que let soit hissée lors de la phase de parsing, elle reste dans un état 'uninitialized'. Tout accès avant la ligne d'affectation lève une ReferenceError."
            },
            {
              id: 3,
              question: "Quel résultat produit une boucle 'for (var i = 0; i < 3; i++)' exécutant des callbacks asynchrones setTimeout ?",
              options: [
                "Chaque callback affiche son propre indice (0, 1, 2)",
                "Tous les callbacks affichent la valeur finale 3 car ils partagent la même référence de variable hissée",
                "La boucle plante avec une TypeError",
                "Les callbacks affichent NaN"
              ],
              correctIndex: 1,
              explanation: "var n'ayant pas de portée de bloc, il n'existe qu'un unique emplacement mémoire partagé pour i. À la fin de la boucle, i vaut 3 pour l'ensemble des rappels asynchrones."
            },
            {
              id: 4,
              question: "Qu'appelle-t-on le 'Variable Shadowing' (Masquage de variable) ?",
              options: [
                "Une variable interne redéfinit un identifiant de même nom qu'une variable du scope parent, occultant cette dernière",
                "Une variable devient invisible pour le ramasse-miettes (Garbage Collector)",
                "Une variable est chiffrée en mémoire pour la sécurité",
                "Une variable globale écrase le prototype d'Object"
              ],
              correctIndex: 0,
              explanation: "Le masquage survient lorsqu'une variable locale porte le même nom qu'une variable extérieure. Lors de la résolution, V8 s'arrête au premier identifiant trouvé sans atteindre le parent."
            },
            {
              id: 5,
              question: "Pourquoi une fonction déclarée avec 'function maFonction() {}' peut-elle être appelée avant sa ligne de définition ?",
              options: [
                "Parce qu'elle s'exécute dans un thread d'arrière-plan distinct",
                "Parce que les Function Declarations sont hissées avec leur corps complet lors de la phase de compilation",
                "Parce que le navigateur lit le fichier à l'envers",
                "C'est faux, cela provoque toujours une ReferenceError"
              ],
              correctIndex: 1,
              explanation: "Contrairement aux variables ou aux fonctions fléchées, les déclarations de fonctions formelles (Function Declarations) sont entièrement hissées avec leur implémentation en mémoire dès la phase 1 de V8."
            },
            {
              id: 6,
              question: "Comment une closure (fermeture) peut-elle provoquer une fuite de mémoire (Memory Leak) ?",
              options: [
                "En créant trop de threads",
                "En retenant en vie tout son environnement lexical parent tant que la fonction interne existe, empêchant le Garbage Collector de libérer des tampons ou objets lourds",
                "En surchargeant la pile d'appels (Call Stack)",
                "En forçant la conversion des variables en chaînes de caractères"
              ],
              correctIndex: 1,
              explanation: "Tant qu'une référence vers la fonction interne subsiste, son Scope Context complet reste ancré en mémoire. Tout tableau lourd ou nœud DOM présent dans la portée parente ne peut être nettoyé par le GC."
            }
          ]}
        />
      </section>
    </div>
  );
};
