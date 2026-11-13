'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type PresetKey = 'input_str' | 'zero' | 'empty_str' | 'null_val' | 'undefined_val' | 'empty_array' | 'nan_val' | 'object_val';

interface PresetData {
  label: string;
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  category: 'string' | 'number' | 'special' | 'object';
  description: string;
  dangerLevel: 'low' | 'medium' | 'high';
  warningMessage: string;
  safeCheck: string;
}

const PRESETS: Record<PresetKey, PresetData> = {
  input_str: {
    label: '"100" (String)',
    code: '"100"',
    value: '100',
    category: 'string',
    description: 'Typique d\'un champ <input> HTML ou d\'un paramètre de requête URL.',
    dangerLevel: 'high',
    warningMessage: 'L\'opérateur + effectue une concaténation ("100" + 5 = "1005") tandis que - force une soustraction arithmétique ("100" - 5 = 95) !',
    safeCheck: 'const num = Number(val); if (!Number.isFinite(num)) { ... }'
  },
  zero: {
    label: '0 (Nombre)',
    code: '0',
    value: 0,
    category: 'number',
    description: 'Nombre zéro : valeur numérique valide mais considérée comme falsy.',
    dangerLevel: 'high',
    warningMessage: 'Le test "if (val)" s\'évalue à false ! Fatal pour un stock nul, un solde à 0€ ou un score égal à 0.',
    safeCheck: 'if (val !== undefined && val !== null) ou typeof val === "number"'
  },
  empty_str: {
    label: '"" (Chaîne vide)',
    code: '""',
    value: '',
    category: 'string',
    description: 'Chaîne vide sans caractère : valeur primitive falsy.',
    dangerLevel: 'medium',
    warningMessage: 'En égalité non stricte, "" == 0 s\'évalue à true, et "" == false s\'évalue à true !',
    safeCheck: 'val.trim().length > 0'
  },
  null_val: {
    label: 'null (Absence explicite)',
    code: 'null',
    value: null,
    category: 'special',
    description: 'Indique une absence intentionnelle et programmée de valeur.',
    dangerLevel: 'high',
    warningMessage: 'typeof null retourne "object" (bogue historique de 1995 non corrigeable pour des raisons de compatibilité Web).',
    safeCheck: 'val === null'
  },
  undefined_val: {
    label: 'undefined (Non initialisé)',
    code: 'undefined',
    value: undefined,
    category: 'special',
    description: 'Variable déclarée sans assignation, paramètre omis ou clé d\'objet absente.',
    dangerLevel: 'high',
    warningMessage: 'JSON.stringify({ a: undefined }) supprime complètement la clé "a" lors de la sérialisation réseau !',
    safeCheck: 'val === undefined ou Object.hasOwn(obj, "prop")'
  },
  empty_array: {
    label: '[] (Tableau vide)',
    code: '[]',
    value: [],
    category: 'object',
    description: 'Tableau vide alloué en mémoire.',
    dangerLevel: 'high',
    warningMessage: 'typeof [] retourne "object" ! De plus, [] est truthy dans un "if ([])", mais [] == false est true !',
    safeCheck: 'Array.isArray(val) && val.length > 0'
  },
  nan_val: {
    label: 'NaN (Not a Number)',
    code: 'NaN',
    value: NaN,
    category: 'number',
    description: 'Résultat d\'une opération arithmétique invalide (ex: 0 / 0, "abc" * 2).',
    dangerLevel: 'high',
    warningMessage: 'typeof NaN retourne "number" ! Et paradoxalement, NaN === NaN retourne false (seule valeur non égale à elle-même).',
    safeCheck: 'Number.isNaN(val)'
  },
  object_val: {
    label: '{} (Objet vide)',
    code: '{}',
    value: {},
    category: 'object',
    description: 'Référence d\'objet vide en mémoire.',
    dangerLevel: 'medium',
    warningMessage: 'Un objet vide {} est truthy dans un test conditionnel "if ({})", même sans aucune propriété.',
    safeCheck: 'Object.keys(val).length > 0'
  }
};

export const Chapitre2Content: React.FC = () => {
  const [activePreset, setActivePreset] = useState<PresetKey>('input_str');
  const currentPreset = PRESETS[activePreset];

  // Calculs dynamiques pour le simulateur
  const val = currentPreset.value;
  const evaluatedTypeOf = typeof val;
  const isTruthy = Boolean(val);
  const plusFive = (val as unknown as number) + 5;
  const minusFive = (val as unknown as number) - 5;
  const looseZero = val == 0;
  const strictZero = val === 0;
  
  let jsonStringified = '';
  try {
    const serialized = JSON.stringify({ testValue: val });
    jsonStringified = serialized;
  } catch {
    jsonStringified = 'Erreur sérialisation';
  }

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Déboguer les erreurs de variables et de types
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi un champ de formulaire contenant <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">&quot;100&quot;</code> au lieu de <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">100</code> transforme-t-il une addition en concaténation catastrophique ? Pourquoi <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">typeof null</code> répond-il <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">&quot;object&quot;</code> depuis 1995 ? Comment la mutation d&apos;un objet en mémoire corrompt-elle silencieusement toute votre application ? Maîtrisez les subtilités du système dynamique de JavaScript.
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
            <span>Distinguer formellement <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">undefined</code>, <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">null</code>, l&apos;absence de clé et le piège du chiffre <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">0</code> falsy.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déjouer les 3 grandes anomalies historiques de <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">typeof</code> (<code className="font-mono">null</code>, tableaux, <code className="font-mono">NaN</code>) et employer les vérifications exactes.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Neutraliser la coercition implicite polymorphe de l&apos;opérateur <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">+</code> et bannir l&apos;égalité laxiste <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">==</code>.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Éviter les mutations par effet de bord lors de la transmission d&apos;objets par référence et maîtriser <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">structuredClone()</code>.</span>
          </div>
        </div>
      </section>

      {/* 2. undefined vs null vs absent vs 0 */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. L&apos;anatomie du vide : undefined vs null vs Propriété absente vs 0
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Dans la plupart des langages fortement typés (Java, C#, Rust), l&apos;absence de valeur est unifiée sous un pointeur nul ou un type Option. En JavaScript, il existe <strong>quatre états de &quot;vide&quot; ou de falsification</strong> très distincts qu&apos;un développeur doit savoir discerner au millimètre près.
        </p>

        {/* Métaphore pédagogique */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-amber-900">
              <span className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center font-mono text-xs">1</span>
              <span>undefined</span>
            </div>
            <p className="text-amber-950 font-medium">
              <strong>La boîte aux lettres vide :</strong> la boîte existe et porte une étiquette, mais le facteur n&apos;a encore rien déposé dedans. C&apos;est la valeur par défaut attribuée par le moteur JS.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-sky-900">
              <span className="w-6 h-6 rounded-full bg-sky-200 flex items-center justify-center font-mono text-xs">2</span>
              <span>null</span>
            </div>
            <p className="text-sky-950 font-medium">
              <strong>Le panneau &quot;Inoccupé&quot; :</strong> le propriétaire a expressément posé un panneau indiquant : <em>&quot;Cette boîte est intentionnellement vide&quot;</em>. C&apos;est un choix explicite du développeur ou de l&apos;API.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-rose-900">
              <span className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center font-mono text-xs">3</span>
              <span>Propriété absente</span>
            </div>
            <p className="text-rose-950 font-medium">
              <strong>Aucune boîte dans la rue :</strong> la maison n&apos;a même pas de fente aux lettres. Tenter d&apos;y accéder renvoie <code className="font-mono text-xs font-bold">undefined</code>, mais la clé n&apos;existe pas sur l&apos;objet.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-emerald-900">
              <span className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center font-mono text-xs">4</span>
              <span>0 ou &quot;&quot; (Falsy)</span>
            </div>
            <p className="text-emerald-950 font-medium">
              <strong>Un colis contenant le chiffre zéro :</strong> la boîte contient bien une donnée valide, mais JavaScript la juge <em>falsy</em> si vous écrivez naïvement <code className="font-mono text-xs font-bold">if (val)</code>.
            </p>
          </div>
        </div>

        {/* Tableau comparatif rigoureux */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm mt-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">État / Valeur</th>
                <th className="p-3.5 border-b border-slate-200">Évaluation Boolean()</th>
                <th className="p-3.5 border-b border-slate-200">Résultat typeof</th>
                <th className="p-3.5 border-b border-slate-200">Sérialisation JSON.stringify</th>
                <th className="p-3.5 border-b border-slate-200">Test de garde recommandé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-amber-700 font-bold">undefined</td>
                <td className="p-3.5 text-rose-600 font-bold">false (falsy)</td>
                <td className="p-3.5 font-mono">&quot;undefined&quot;</td>
                <td className="p-3.5 text-rose-700 font-bold">Clé supprimée !</td>
                <td className="p-3.5 font-mono text-xs text-emerald-800 bg-emerald-50/60 rounded">val === undefined</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-sky-700 font-bold">null</td>
                <td className="p-3.5 text-rose-600 font-bold">false (falsy)</td>
                <td className="p-3.5 font-mono text-rose-700 font-bold">&quot;object&quot; (piège !)</td>
                <td className="p-3.5 font-mono text-slate-700">Conservé : null</td>
                <td className="p-3.5 font-mono text-xs text-emerald-800 bg-emerald-50/60 rounded">val === null</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-rose-700 font-bold">Clé absente</td>
                <td className="p-3.5 text-rose-600 font-bold">false (via obj.prop)</td>
                <td className="p-3.5 font-mono">&quot;undefined&quot;</td>
                <td className="p-3.5 text-slate-500">Inexistante</td>
                <td className="p-3.5 font-mono text-xs text-emerald-800 bg-emerald-50/60 rounded">Object.hasOwn(obj, &quot;cle&quot;)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-purple-700 font-bold">0 (nombre)</td>
                <td className="p-3.5 text-rose-600 font-bold">false (falsy !)</td>
                <td className="p-3.5 font-mono">&quot;number&quot;</td>
                <td className="p-3.5 font-mono text-slate-700">0</td>
                <td className="p-3.5 font-mono text-xs text-emerald-800 bg-emerald-50/60 rounded">Number.isFinite(val)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-indigo-700 font-bold">&quot;&quot; (chaîne vide)</td>
                <td className="p-3.5 text-rose-600 font-bold">false (falsy)</td>
                <td className="p-3.5 font-mono">&quot;string&quot;</td>
                <td className="p-3.5 font-mono text-slate-700">&quot;&quot;</td>
                <td className="p-3.5 font-mono text-xs text-emerald-800 bg-emerald-50/60 rounded">typeof val === &quot;string&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="danger" title="Le bogue critique du 'if (cart.quantity)' avec zéro">
          <p className="text-sm leading-relaxed">
            Écrire <code className="font-mono font-bold">if (user.age)</code> ou <code className="font-mono font-bold">if (cart.itemCount)</code> est l&apos;un des bogues les plus fréquents en production. Si le panier contient <code className="font-mono">0</code> article ou si l&apos;utilisateur a <code className="font-mono">0</code> an (nouveau-né), la condition s&apos;évalue à <code className="font-mono text-rose-700 font-bold">false</code> ! Utilisez l&apos;opérateur de coalescence des nuls (<code className="font-mono font-bold">??</code>) ou un contrôle explicite :
          </p>
          <div className="mt-2 font-mono text-xs bg-slate-900 text-slate-200 p-2.5 rounded-xl">
            {`// BOGUE : si count vaut 0, le panier est réinitialisé par erreur à 1 !
const quantity = cart.count || 1; 

// SOLUTION SÉCURISÉE : 0 est conservé, seuls null et undefined sont remplacés
const safeQuantity = cart.count ?? 1;`}
          </div>
        </Callout>

        <div className="space-y-2 mt-4">
          <h3 className="text-base font-bold text-slate-900">
            Inspection professionnelle : <code className="font-mono text-emerald-800">Object.hasOwn()</code> vs opérateur <code className="font-mono text-emerald-800">in</code>
          </h3>
          <p className="text-sm text-slate-700">
            L&apos;opérateur <code className="font-mono text-xs">in</code> vérifie si une propriété existe sur l&apos;objet <strong>ou dans toute sa chaîne de prototypes</strong> (comme <code className="font-mono text-xs">toString</code>). La méthode standard moderne <code className="font-mono text-xs font-bold">Object.hasOwn(obj, prop)</code> (ES2022) garantit que la propriété appartient directement à l&apos;instance sans pollution :
          </p>
          <CodeBlock
            language="typescript"
            filename="inspect-properties.ts"
            code={`const product = { id: 101, name: "Clavier Mécanique", discount: null };

// 1. Distinction présence vs valeur :
console.log(Object.hasOwn(product, "discount")); // true (la clé existe, sa valeur est null)
console.log(product.discount === null);           // true
console.log(Object.hasOwn(product, "warranty")); // false (la clé n'existe pas du tout)

// 2. Piège de l'opérateur "in" avec les prototypes :
console.log("toString" in product);              // true (hérité de Object.prototype !)
console.log(Object.hasOwn(product, "toString")); // false (non pollué par le prototype)`}
          />
        </div>
      </section>

      {/* 3. Anomalies de typeof */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les anomalies historiques de typeof et les prédicats fiables
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Créé en mai 1995 en seulement dix jours par Brendan Eich, le moteur initial de JavaScript contenait des compromis d&apos;implémentation bas niveau au niveau de la représentation binaire des types. Trois de ces compromis perdurent pour des impératifs de rétrocompatibilité web.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Anomalie 1 : typeof null */}
          <div className="p-4 rounded-2xl border-2 border-rose-200 bg-rose-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-rose-200 text-rose-900">Anomalie #1</span>
              <span className="text-xs text-rose-700 font-bold">Bug de 1995</span>
            </div>
            <h3 className="font-mono text-sm font-black text-rose-950">typeof null === &quot;object&quot;</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              En C / assembleur initial, les valeurs étaient étiquetées sur 32 bits. Les objets avaient le tag <code className="font-mono font-bold">000</code>. Le pointeur NULL était représenté par <code className="font-mono font-bold">0x00</code>, donc taggé par erreur comme objet.
            </p>
            <div className="pt-2 border-t border-rose-200 font-mono text-xs text-emerald-800 font-bold">
              Solution : <code className="bg-white px-1 py-0.5 rounded border border-rose-200">val === null</code>
            </div>
          </div>

          {/* Anomalie 2 : typeof [] */}
          <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-amber-200 text-amber-900">Anomalie #2</span>
              <span className="text-xs text-amber-700 font-bold">Manque de granularité</span>
            </div>
            <h3 className="font-mono text-sm font-black text-amber-950">typeof [] === &quot;object&quot;</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Pour le moteur JS, un tableau est un objet dont les clés sont des indices numériques ordonnés et pourvu d&apos;une propriété magique <code className="font-mono">length</code>. <code className="font-mono">typeof</code> ne fait aucune distinction.
            </p>
            <div className="pt-2 border-t border-amber-200 font-mono text-xs text-emerald-800 font-bold">
              Solution : <code className="bg-white px-1 py-0.5 rounded border border-amber-200">Array.isArray(val)</code>
            </div>
          </div>

          {/* Anomalie 3 : typeof NaN */}
          <div className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-purple-200 text-purple-900">Anomalie #3</span>
              <span className="text-xs text-purple-700 font-bold">Norme IEEE 754</span>
            </div>
            <h3 className="font-mono text-sm font-black text-purple-950">typeof NaN === &quot;number&quot;</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Bien que son acronyme signifie <em>&quot;Not a Number&quot;</em>, NaN est un état numérique spécial défini par la norme internationale IEEE 754 pour signaler un résultat mathématique indéterminé.
            </p>
            <div className="pt-2 border-t border-purple-200 font-mono text-xs text-emerald-800 font-bold">
              Solution : <code className="bg-white px-1 py-0.5 rounded border border-purple-200">Number.isNaN(val)</code>
            </div>
          </div>
        </div>

        {/* Le piège de isNaN() global vs Number.isNaN() */}
        <Callout type="warning" title="Ne confondez jamais isNaN() et Number.isNaN()">
          <p className="text-sm leading-relaxed">
            La fonction globale <code className="font-mono font-bold">isNaN(&quot;bonjour&quot;)</code> renvoie <code className="font-mono text-rose-700 font-bold">true</code> car elle tente d&apos;abord de convertir la chaîne en nombre avant d&apos;évaluer ! En revanche, la méthode stricte standard ES6 <code className="font-mono font-bold">Number.isNaN(&quot;bonjour&quot;)</code> renvoie <code className="font-mono text-emerald-700 font-bold">false</code> car elle vérifie que la valeur est à la fois de type number ET égale à NaN.
          </p>
        </Callout>

        {/* Boîte à outils : detectExactType */}
        <div className="space-y-2 mt-4">
          <h3 className="text-base font-bold text-slate-900">
            Fonction utilitaire universelle : Le prédicat de type absolu
          </h3>
          <p className="text-sm text-slate-700">
            Pour obtenir le type exact d&apos;une variable sans jamais être trompé par <code className="font-mono text-xs">typeof</code>, utilisez l&apos;introspection de la balise interne de classe via <code className="font-mono text-xs font-bold">Object.prototype.toString.call()</code> :
          </p>
          <CodeBlock
            language="typescript"
            filename="type-detective.ts"
            code={`// Utilitaire de diagnostic absolu pour votre suite de tests ou logger :
function detectExactType(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "number" && Number.isNaN(value)) return "nan";
  
  // Renvoie "[object Array]", "[object Date]", "[object RegExp]", "[object Map]", etc.
  const rawTag = Object.prototype.toString.call(value);
  return rawTag.slice(8, -1).toLowerCase();
}

console.log(detectExactType([]));              // "array" (au lieu de "object")
console.log(detectExactType(null));            // "null"  (au lieu de "object")
console.log(detectExactType(NaN));             // "nan"   (au lieu de "number")
console.log(detectExactType(new Date()));       // "date"  (au lieu de "object")
console.log(detectExactType(new Map()));       // "map"   (au lieu de "object")`}
          />
        </div>
      </section>

      {/* 4. Laboratoire Interactif de Types & Coercition */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5 text-lime-700" />
              <span>4. Laboratoire Interactif : Testeur de Coercition et de Types</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sélectionnez une valeur piège courante pour observer comment le moteur V8 réagit lors des conversions arithmétiques, logiques et de sérialisation.
            </p>
          </div>
        </div>

        {/* Boutons de sélection de presets */}
        <div className="flex flex-wrap gap-2 pt-2">
          {(Object.keys(PRESETS) as PresetKey[]).map((key) => {
            const preset = PRESETS[key];
            const isSelected = activePreset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActivePreset(key)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-lime-300 border-slate-900 shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500 hover:bg-slate-50'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Panneau d'évaluation interactif */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Valeur inspectée :</span>
              <div className="text-lg font-mono font-bold text-white mt-0.5">
                const testVal = <span className="text-amber-300">{currentPreset.code}</span>;
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                Risque : {currentPreset.dangerLevel}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium">
            {currentPreset.description}
          </p>

          {/* Grille des résultats d'évaluation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            {/* typeof */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-sans">typeof testVal :</span>
              <span className={`text-base font-bold ${evaluatedTypeOf === 'object' && (val === null || Array.isArray(val)) ? 'text-rose-400' : 'text-emerald-400'}`}>
                &quot;{evaluatedTypeOf}&quot;
              </span>
            </div>

            {/* Boolean() */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-sans">Boolean(testVal) (if testVal) :</span>
              <span className={`text-base font-bold ${isTruthy ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isTruthy ? 'true (Truthy)' : 'false (Falsy)'}
              </span>
            </div>

            {/* Opérateur + 5 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-sans">testVal + 5 :</span>
              <span className="text-base font-bold text-amber-300">
                {typeof plusFive === 'string' ? `"${plusFive}" (String !)` : String(plusFive)}
              </span>
            </div>

            {/* Opérateur - 5 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-sans">testVal - 5 :</span>
              <span className="text-base font-bold text-cyan-300">
                {String(minusFive)}
              </span>
            </div>

            {/* Égalité == 0 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-sans">testVal == 0 (laxiste) :</span>
              <span className={`text-base font-bold ${looseZero ? 'text-amber-400' : 'text-slate-400'}`}>
                {String(looseZero)}
              </span>
            </div>

            {/* Égalité === 0 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-sans">testVal === 0 (stricte) :</span>
              <span className={`text-base font-bold ${strictZero ? 'text-emerald-400' : 'text-slate-400'}`}>
                {String(strictZero)}
              </span>
            </div>

            {/* JSON.stringify */}
            <div className="sm:col-span-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-sans">JSON.stringify(&#123; testValue: testVal &#125;) :</span>
              <span className="text-sm font-bold text-purple-300 break-all">
                {jsonStringified}
              </span>
            </div>
          </div>

          {/* Alertes d'analyse */}
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/80 space-y-1">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <Icon name="alert" className="w-4 h-4 text-amber-400" />
              <span>Analyse de vulnérabilité :</span>
            </div>
            <p className="text-xs text-amber-100/90 leading-relaxed">
              {currentPreset.warningMessage}
            </p>
          </div>

          {/* Test de garde conseillé */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/80 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-emerald-400 font-sans font-bold">Garde défensive recommandée :</span>
            <code className="text-emerald-200 bg-emerald-900/50 px-2 py-1 rounded">
              {currentPreset.safeCheck}
            </code>
          </div>
        </div>
      </section>

      {/* 5. Coercition implicite et l'enfer de == */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Coercition implicite, opérateur polymorphe + et le piège du double égal (==)
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          En JavaScript, l&apos;opérateur <code className="font-mono font-bold text-emerald-800">+</code> est surchargé. S&apos;il rencontre au moins un opérande de type chaîne, ou un objet convertible en chaîne, <strong>il abandonne immédiatement l&apos;arithmétique pour devenir un opérateur de concaténation textuelle</strong>. À l&apos;inverse, les opérateurs <code className="font-mono font-bold text-emerald-800">-</code>, <code className="font-mono font-bold text-emerald-800">*</code> et <code className="font-mono font-bold text-emerald-800">/</code> forcent toujours la conversion numérique.
        </p>

        <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-3">
          <div className="text-rose-400 font-bold">{`// Bogue récurrent lors de la manipulation de formulaires Web ou d'URL :`}</div>
          <div>{`const price = "100";  // Valeur textuelle issue d'un <input>
const tax = 20;       // Nombre calculé côté serveur

console.log(price + tax);   // 💥 "10020" (Concaténation textuelle !)
console.log(price - tax);   // 80 (La soustraction a converti "100" en 100)
console.log(price * 2);     // 200 (La multiplication a forcé le type Number)`}</div>
        </div>

        {/* L'enfer du double égal == */}
        <div className="space-y-2 mt-4">
          <h3 className="text-base font-bold text-slate-900">
            Pourquoi l&apos;égalité non stricte (==) doit être bannie de votre code
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            L&apos;algorithme officiel d&apos;égalité abstraite (<em className="font-medium">Abstract Equality Comparison</em> de la spécification ECMAScript) applique jusqu&apos;à 12 étapes de coercition implicite arbitraire. Le résultat défie toute logique humaine :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
              <span className="font-bold block text-rose-800">&quot;&quot; == 0</span>
              <span>s&apos;évalue à <strong className="text-emerald-700">true</strong></span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
              <span className="font-bold block text-rose-800">false == []</span>
              <span>s&apos;évalue à <strong className="text-emerald-700">true</strong></span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
              <span className="font-bold block text-rose-800">&quot;0&quot; == false</span>
              <span>s&apos;évalue à <strong className="text-emerald-700">true</strong></span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
              <span className="font-bold block text-rose-800">null == undefined</span>
              <span>s&apos;évalue à <strong className="text-emerald-700">true</strong></span>
            </div>
          </div>

          <Callout type="tip" title="La règle d'or en entreprise : Toujours === avec conversion explicite">
            <p className="text-sm leading-relaxed">
              Configurez la règle ESLint <code className="font-mono font-bold">eqeqeq: [&quot;error&quot;, &quot;always&quot;]</code> dans tous vos projets. N&apos;attendez pas que JavaScript devine vos intentions : convertissez explicitement avec <code className="font-mono font-bold">Number(val)</code>, <code className="font-mono font-bold">String(val)</code> ou <code className="font-mono font-bold">Boolean(val)</code> et vérifiez toujours la finitude avec <code className="font-mono font-bold">Number.isFinite()</code>.
            </p>
          </Callout>
        </div>
      </section>

      {/* 6. Mutations d'objets par référence */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Références mémoires, Mutation fantôme et Clonage
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          En JavaScript, les types primitifs (<code className="font-mono text-xs">number</code>, <code className="font-mono text-xs">string</code>, <code className="font-mono text-xs">boolean</code>, <code className="font-mono text-xs">bigint</code>, <code className="font-mono text-xs">symbol</code>) sont copiés <strong>par valeur</strong>. En revanche, les objets, tableaux et fonctions sont manipulés <strong>par référence mémoire</strong> (un pointeur vers un bloc sur le tas/heap).
        </p>

        {/* Métaphore de la maison */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-sm text-amber-950 space-y-1">
          <span className="font-bold uppercase text-xs tracking-wider text-amber-900 block">Métaphore de l&apos;adresse postale :</span>
          <p className="leading-relaxed">
            Donner un objet à une fonction revient à noter l&apos;adresse de votre maison sur un post-it et à la donner à un collègue. Si le collègue se rend à l&apos;adresse et repeint les murs en bleu (<code className="font-mono text-xs font-bold">user.theme = &quot;blue&quot;</code>), votre maison est repeinte pour tout le monde ! C&apos;est la source numéro 1 des effets de bord silencieux en frontend (Redux, React) et en backend (Node.js).
          </p>
        </div>

        {/* Comparatif Shallow vs Deep copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono mt-4">
          <div className="p-4 rounded-2xl bg-rose-950 text-rose-100 border border-rose-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-rose-300 uppercase text-xs">Copie superficielle (Shallow Copy)</span>
              <span className="text-[11px] text-rose-400 font-bold">1 seul niveau</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto">{`const user = { 
  name: "Sarah", 
  address: { city: "Rabat" } 
};

// Le spread operator {...} ne clone que le niveau 1 !
const shallowClone = { ...user };
shallowClone.address.city = "Tanger";

// 💥 CATASTROPHE : l'objet d'origine a été modifié !
console.log(user.address.city); // "Tanger"`}</pre>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-100 border border-emerald-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-emerald-300 uppercase text-xs">Copie profonde (structuredClone)</span>
              <span className="text-[11px] text-emerald-400 font-bold">ES2022 Standard</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto">{`const user = { 
  name: "Sarah", 
  address: { city: "Rabat" } 
};

// structuredClone() duplique tout l'arbre en mémoire
const deepClone = structuredClone(user);
deepClone.address.city = "Tanger";

// ✅ PARFAIT : l'objet d'origine est préservé
console.log(user.address.city); // "Rabat"`}</pre>
          </div>
        </div>

        {/* Limites de JSON.parse(JSON.stringify()) vs structuredClone() */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm mt-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3 border-b border-slate-200">Fonctionnalité / Type</th>
                <th className="p-3 border-b border-slate-200">JSON.parse(JSON.stringify(obj))</th>
                <th className="p-3 border-b border-slate-200">structuredClone(obj)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold">Objets Date</td>
                <td className="p-3 text-rose-600 font-bold">Convertis en simples String ISO</td>
                <td className="p-3 text-emerald-700 font-bold">Préservés en véritables objets Date</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold">Map et Set</td>
                <td className="p-3 text-rose-600 font-bold">Convertis en objets vides &#123;&#125;</td>
                <td className="p-3 text-emerald-700 font-bold">Préservés avec tous leurs éléments</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold">Références circulaires (a.self = a)</td>
                <td className="p-3 text-rose-600 font-bold">💥 Crash : TypeError Converting circular</td>
                <td className="p-3 text-emerald-700 font-bold">Gérées automatiquement sans planter</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold">undefined / RegExp</td>
                <td className="p-3 text-rose-600 font-bold">Clés supprimées / RegExp en objet vide</td>
                <td className="p-3 text-emerald-700 font-bold">Support complet natif</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold">Fonctions & Symboles</td>
                <td className="p-3 text-slate-500">Ignorés / supprimés</td>
                <td className="p-3 text-amber-700 font-bold">Lève une exception DataCloneError (non clonables)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Travaux Pratiques — Audit et correction d'un système e-commerce */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            7. Travaux Pratiques — Audit et refactorisation d&apos;un moteur de facturation
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Un développeur junior a écrit la fonction suivante pour gérer l&apos;ajout d&apos;articles au panier et le calcul du montant total. En production, les clients rapportent des totaux exorbitants, le stock de la boutique se désynchronise et certaines commandes échouent mystérieusement.
        </p>

        {/* Le code bogué */}
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase text-rose-700 flex items-center gap-2">
            <Icon name="alert" className="w-4 h-4 text-rose-600" />
            <span>Code source défaillant (4 bogues de type majeurs)</span>
          </h3>
          <CodeBlock
            language="javascript"
            filename="buggy-checkout.js"
            code={`// CATALOGUE GLOBAL PARTAGÉ EN MÉMOIRE :
const catalog = [
  { id: 1, name: "Écran 4K Ultra", price: "450", stock: 5 },
  { id: 2, name: "Souris Sans Fil", price: "40", stock: 12 }
];

// FONCTION DE COMMANDE CONTENANT 4 BOGUES CRITIQUES :
function processOrder(products, productId, requestedQty, userDiscount) {
  // BOGUE 1 : productId reçu de l'URL est un string ("1"), comparaison laxiste
  const item = products.find(p => p.id == productId);

  // BOGUE 2 : si requestedQty est un string ("2"), requestedQty + 1 = "21" !
  if (requestedQty > item.stock) {
    throw new Error("Stock épuisé");
  }

  // BOGUE 3 : mutation directe du catalogue partagé en mémoire !
  item.stock = item.stock - requestedQty;

  // BOGUE 4 : si userDiscount vaut 0, (userDiscount || 10) applique 10€ de remise au lieu de 0€ !
  const discount = userDiscount || 10;
  
  // BOGUE 5 : item.price est un string ("450"), concaténation avec le sous-total !
  const subtotal = item.price * requestedQty;
  const grandTotal = subtotal - discount;

  return { item, grandTotal };
}`}
          />
        </div>

        {/* La solution défensive refactorisée */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Solution professionnelle refactorisée et défensive</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="safe-checkout.ts"
            code={`interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface OrderResult {
  product: Product;
  quantity: number;
  subtotal: number;
  discount: number;
  grandTotal: number;
  remainingStock: number;
}

function processOrderSafe(
  products: readonly Product[],
  rawProductId: unknown,
  rawQty: unknown,
  rawDiscount?: unknown
): OrderResult {
  // 1. Validation et coercition explicite de l'identifiant produit
  const productId = Number(rawProductId);
  if (!Number.isInteger(productId) || productId <= 0) {
    throw new TypeError("Identifiant produit invalide : entier positif attendu.");
  }

  // 2. Validation stricte de la quantité commandée
  const quantity = Number(rawQty);
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new TypeError("La quantité doit être un nombre entier strictement positif.");
  }

  // 3. Recherche avec égalité stricte (===)
  const product = products.find(p => p.id === productId);
  if (!product) {
    throw new Error(\`Produit avec l'identifiant \${productId} introuvable dans le catalogue.\`);
  }

  // 4. Contrôle du stock sans risque de dépassement
  if (quantity > product.stock) {
    throw new RangeError(\`Stock insuffisant : \${product.stock} disponibles, \${quantity} demandés.\`);
  }

  // 5. Gestion saine de la remise (le chiffre 0 est valide, seuls null/undefined ont un défaut)
  let discount = 0;
  if (rawDiscount !== undefined && rawDiscount !== null) {
    const parsedDiscount = Number(rawDiscount);
    if (!Number.isFinite(parsedDiscount) || parsedDiscount < 0) {
      throw new TypeError("La remise doit être un nombre positif ou nul.");
    }
    discount = parsedDiscount;
  }

  // 6. Calculs arithmétiques sécurisés
  const price = Number(product.price);
  const subtotal = price * quantity;
  const grandTotal = Math.max(0, subtotal - discount);

  // 7. Immutabilité garantie : clonage profond de l'objet retourné, catalogue intact !
  const productSnapshot = structuredClone(product);

  return {
    product: productSnapshot,
    quantity,
    subtotal,
    discount,
    grandTotal,
    remainingStock: product.stock - quantity
  };
}`}
          />
        </div>
      </section>

      {/* 8. Check-list Anti-Bogue */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Synthèse : La Check-list Anti-Bogue de Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : Banir ==</span>
            <p className="text-xs text-slate-700">Utilisez toujours <code className="font-mono font-bold">===</code>. Si vous comparez un paramètre d&apos;URL et un ID de base de données, convertissez les deux explicitement avec <code className="font-mono">Number()</code> ou <code className="font-mono">String()</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : Opérateur ?? au lieu de ||</span>
            <p className="text-xs text-slate-700">Pour fournir une valeur par défaut, privilégiez <code className="font-mono font-bold">??</code> qui ne remplace que <code className="font-mono">null</code> et <code className="font-mono">undefined</code> sans écraser le chiffre <code className="font-mono">0</code> ou la chaîne vide <code className="font-mono">&quot;&quot;</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : Prédicats natifs stricts</span>
            <p className="text-xs text-slate-700">Ne faites jamais confiance à <code className="font-mono">typeof</code> pour les tableaux ou <code className="font-mono">NaN</code>. Utilisez systématiquement <code className="font-mono font-bold">Array.isArray()</code> et <code className="font-mono font-bold">Number.isNaN()</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : structuredClone pour l&apos;immutabilité</span>
            <p className="text-xs text-slate-700">Si vous devez manipuler un objet imbriqué sans altérer l&apos;état source, utilisez le standard <code className="font-mono font-bold">structuredClone()</code> plutôt que le spread operator qui ne copie que le premier niveau.</p>
          </div>
        </div>
      </section>

      {/* 9. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          9. Quiz de validation — Chapitre 3.2
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'expression typeof null retourne-t-elle \"object\" en JavaScript ?",
              options: [
                "Parce que null dérive de Object.prototype",
                "C'est un bogue historique datant de 1995 lié au marquage 32 bits, conservé pour rétrocompatibilité web",
                "Parce que null est une instance d'objet instanciée par le ramasse-miettes",
                "Parce que null peut stocker des clés et valeurs dynamiques"
              ],
              correctIndex: 1,
              explanation: "Dans le premier moteur JS, le tag 000 désignait un objet et le pointeur NULL était codé 0x00. Pour tester null avec exactitude, la seule règle est : val === null."
            },
            {
              id: 2,
              question: "Quel est le résultat de l'opération : \"10\" + 5 et \"10\" - 5 ?",
              options: [
                "15 et 5",
                "\"105\" et 5",
                "\"105\" et NaN",
                "TypeError pour les deux expressions"
              ],
              correctIndex: 1,
              explanation: "L'opérateur + bascule en concaténation dès qu'un opérande est de type chaîne (\"10\" + 5 = \"105\"). En revanche, l'opérateur - force la conversion arithmétique en nombre (\"10\" - 5 = 5)."
            },
            {
              id: 3,
              question: "Quelle méthode standard permet de cloner profondément un objet sans partager ses sous-références d'objets imbriqués ?",
              options: [
                "Object.assign({}, obj)",
                "const clone = { ...obj }",
                "structuredClone(obj)",
                "obj.cloneDeep()"
              ],
              correctIndex: 2,
              explanation: "structuredClone() (standardisé en ES2022) duplique l'intégralité de l'arborescence en mémoire, y compris les Date, Set, Map et références circulaires."
            },
            {
              id: 4,
              question: "Pourquoi le code \"const qty = cart.count || 1;\" peut-il engendrer un bogue critique ?",
              options: [
                "L'opérateur || est déprécié en JavaScript moderne",
                "Si cart.count vaut 0, l'expression || l'évalue comme falsy et force à tort qty à 1",
                "cart.count || 1 lève une SyntaxError",
                "L'opérateur || transforme cart.count en chaîne de caractères"
              ],
              correctIndex: 1,
              explanation: "Le chiffre 0 est une valeur falsy en JavaScript. Si le panier contient 0 article, cart.count || 1 force la valeur à 1. Utilisez la coalescence des nuls : cart.count ?? 1."
            },
            {
              id: 5,
              question: "Quelle est la différence fondamentale entre isNaN(val) et Number.isNaN(val) ?",
              options: [
                "Il n'y a aucune différence, c'est un simple alias",
                "isNaN() tente de convertir l'argument en nombre (ex: isNaN('abc') === true), alors que Number.isNaN('abc') === false",
                "Number.isNaN() ne fonctionne qu'avec les entiers BigInt",
                "isNaN() lève une exception si l'argument n'est pas un nombre"
              ],
              correctIndex: 1,
              explanation: "La méthode globale isNaN(val) applique une coercition implicite : isNaN('bonjour') renvoie true ! Number.isNaN() vérifie strictement que la valeur est de type 'number' ET égale à NaN."
            },
            {
              id: 6,
              question: "Quelle méthode permet de vérifier si un objet possède une propriété directement sans inspecter son prototype ?",
              options: [
                "prop in obj",
                "obj.hasOwnProperty ? obj.hasOwnProperty(prop) : false",
                "Object.hasOwn(obj, prop)",
                "typeof obj[prop] !== 'undefined'"
              ],
              correctIndex: 2,
              explanation: "Object.hasOwn(obj, prop) est la méthode standard moderne (ES2022) qui remplace hasOwnProperty en évitant les risques de shadowing ou d'objets créés avec Object.create(null)."
            }
          ]}
        />
      </section>
    </div>
  );
};
