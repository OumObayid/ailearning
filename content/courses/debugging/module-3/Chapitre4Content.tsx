'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type LogicLabPresetKey = 'compound_condition' | 'zero_fallback_or' | 'zero_fallback_nullish' | 'react_zero_leak' | 'asi_return' | 'arrow_object';

interface LogicLabPreset {
  label: string;
  category: 'condition' | 'coalescing' | 'function';
  expression: string;
  evaluatedResult: string;
  explanation: string;
  riskLevel: 'high' | 'critical' | 'medium';
  cleanFix: string;
}

const LOGIC_PRESETS: Record<LogicLabPresetKey, LogicLabPreset> = {
  compound_condition: {
    label: 'role === "admin" || "editor"',
    category: 'condition',
    expression: 'const role = "user";\nconst isAuthorized = role === "admin" || "editor";',
    evaluatedResult: '"editor" (Truthy -> toujours VRAI !)',
    explanation: 'L\'opérateur || ne lie pas "admin" et "editor" au test d\'égalité. Il évalue (role === "admin") qui vaut false, puis renvoie l\'opérande droit "editor", qui est une chaîne non vide truthy ! N\'importe quel utilisateur passe le contrôle de sécurité !',
    riskLevel: 'critical',
    cleanFix: 'role === "admin" || role === "editor"  // ou : ["admin", "editor"].includes(role)'
  },
  zero_fallback_or: {
    label: 'count || 1 (Opérateur ||)',
    category: 'coalescing',
    expression: 'const count = 0; // Quantité en stock\nconst quantity = count || 1;',
    evaluatedResult: '1 (Le stock 0 a été écrasé !)',
    explanation: 'L\'opérateur || teste la vérité booléenne (truthiness). Comme 0 est une des 8 valeurs falsy de JavaScript, l\'expression rejette 0 et applique la valeur par défaut 1, créant un bogue de sur-allocation de stock !',
    riskLevel: 'high',
    cleanFix: 'const quantity = count ?? 1; // La coalescence des nuls préserve 0'
  },
  zero_fallback_nullish: {
    label: 'count ?? 1 (Opérateur ??)',
    category: 'coalescing',
    expression: 'const count = 0; // Quantité en stock\nconst quantity = count ?? 1;',
    evaluatedResult: '0 (Stock exact préservé !)',
    explanation: 'L\'opérateur de coalescence des nuls (??) ne bascule vers la valeur droite QUE si l\'opérande gauche vaut strictement null ou undefined. Le chiffre 0, le booléen false et la chaîne vide "" sont scrupuleusement respectés.',
    riskLevel: 'medium',
    cleanFix: 'Valide pour toute valeur numérique ou booléenne où 0 ou false est un état métier légitime.'
  },
  react_zero_leak: {
    label: 'count && <Component />',
    category: 'condition',
    expression: 'const unreadCount = 0;\nconst badge = unreadCount && "Nouveaux messages";',
    evaluatedResult: '0 (Le chiffre "0" s\'affiche sur la page !)',
    explanation: 'L\'opérateur && renvoie le premier opérande s\'il est falsy ! Comme 0 est falsy, l\'expression s\'évalue à 0. Dans les templates JSX React ({unreadCount && <Badge />}), React affiche littéralement le chiffre "0" dans l\'interface au lieu de rien afficher.',
    riskLevel: 'high',
    cleanFix: 'unreadCount > 0 && <Badge />  // ou : Boolean(unreadCount) && <Badge />'
  },
  asi_return: {
    label: 'return sur ligne isolée (ASI)',
    category: 'function',
    expression: 'function getOrder() {\n  return\n  {\n    total: 100\n  };\n}',
    evaluatedResult: 'undefined (Objet jamais retourné !)',
    explanation: 'Le mécanisme d\'insertion automatique de point-virgule (ASI - Automatic Semicolon Insertion) de V8 insère un point-virgule immédiatement après le mot-clé return s\'il y a un saut de ligne. La fonction se termine aussitôt, et le bloc inférieur devient du code mort (Dead Code) !',
    riskLevel: 'critical',
    cleanFix: 'return { total: 100 }; // L\'accolade ouvrante DOIT être sur la même ligne que return'
  },
  arrow_object: {
    label: '() => { id: 1 } (Fonction fléchée)',
    category: 'function',
    expression: 'const makeProduct = () => {\n  id: 101,\n  name: "Livre"\n};\nmakeProduct();',
    evaluatedResult: 'undefined (SyntaxError ou retour vide !)',
    explanation: 'Dans une fonction fléchée, les accolades { ... } sont interprétées par l\'analyseur syntaxique comme le corps d\'un bloc d\'instructions, et non comme un objet littéral. Sans mot-clé return explicite, la fonction renvoie undefined.',
    riskLevel: 'high',
    cleanFix: 'const makeProduct = () => ({ id: 101, name: "Livre" }); // Entourer de parenthèses ({})'
  }
};

export const Chapitre4Content: React.FC = () => {
  const [activePreset, setActivePreset] = useState<LogicLabPresetKey>('compound_condition');
  const currentScenario = LOGIC_PRESETS[activePreset];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — Diagnostiquer les erreurs de fonctions et de conditions
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">role === &quot;admin&quot; || &quot;editor&quot;</code> ouvre-t-il les portes de votre système à tous les utilisateurs ? Pourquoi un saut de ligne après <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">return</code> détruit-il discrètement votre objet ? Comment l&apos;opérateur <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">||</code> transforme-t-il un stock de zéro en panier payant ? Décortiquez les pièges logiques, les retours asymétriques et l&apos;algèbre booléenne de JavaScript.
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
            <span>Distinguer les paramètres déclarés des arguments réels et neutraliser les inversions silencieuses.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Éliminer les retours implicites <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">undefined</code> causés par l&apos;insertion automatique de point-virgule (ASI) ou l&apos;asymétrie de branches.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser les 8 valeurs falsy et choisir avec discernement entre <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">||</code>, <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">??</code> et <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">&amp;&amp;</code>.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déjouer les conditions composées perverses et le retour d&apos;objets littéraux dans les fonctions fléchées.</span>
          </div>
        </div>
      </section>

      {/* 2. Paramètres vs Arguments */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Anatomie d&apos;un appel : Paramètres déclarés vs Arguments transmis
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          En JavaScript, les fonctions sont totalement permissives sur l&apos;<strong>arité</strong> (le nombre d&apos;arguments attendus). Si vous passez moins d&apos;arguments que de paramètres déclarés, les manquants reçoivent silencieusement la valeur <code className="font-mono text-xs font-bold text-emerald-800">undefined</code> sans la moindre erreur. Si vous en passez trop, les excédentaires sont ignorés.
        </p>

        {/* 2 Exemples de failles classiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-rose-400 uppercase text-xs">Argument manquant -&gt; Propagation de NaN</span>
              <span className="text-[11px] text-rose-300 font-bold">Calcul corrompu</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto">{`function computeDiscount(price, percentage) {
  return price * (percentage / 100);
}

// Oubli du 2e argument lors de l'appel :
computeDiscount(100); 
// percentage vaut undefined !
// 100 * (undefined / 100) -> NaN silencieux`}</pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-amber-400 uppercase text-xs">Ordre inversé sans alerte</span>
              <span className="text-[11px] text-amber-300 font-bold">État corrompu</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto">{`function registerUser(username, userAge) {
  return { username, userAge };
}

// Inversion par inattention des arguments :
const user = registerUser(30, "Mohamed");
// { username: 30, userAge: "Mohamed" }
// Aucune exception, mais la BDD est polluée !`}</pre>
          </div>
        </div>

        {/* Remède défensif : Paramètres nommés déstructurés */}
        <div className="space-y-2 mt-4">
          <h3 className="text-base font-bold text-slate-900">
            La parade professionnelle : Paramètres nommés déstructurés avec typage TypeScript
          </h3>
          <p className="text-sm text-slate-700">
            Pour éliminer définitivement les inversions d&apos;arguments et sécuriser les valeurs par défaut, utilisez un <strong>objet de paramètres unique</strong> avec déstructuration :
          </p>
          <CodeBlock
            language="typescript"
            filename="named-parameters.ts"
            code={`interface RegisterUserOptions {
  username: string;
  userAge: number;
  role?: "user" | "admin";
}

// Les paramètres sont nommés : l'ordre d'appel n'a plus aucune importance !
function registerUserSafe({ username, userAge, role = "user" }: RegisterUserOptions) {
  return { username, userAge, role };
}

// Appel explicite et auto-documenté :
const user = registerUserSafe({
  userAge: 30,
  username: "Mohamed"
});`}
          />
        </div>
      </section>

      {/* 3. Mystères du return et ASI */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les anomalies de return : Piège ASI, branches asymétriques et fonctions fléchées
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Toute fonction JavaScript qui s&apos;achève sans exécuter l&apos;instruction <code className="font-mono text-xs font-bold text-emerald-800">return</code> renvoie par défaut la valeur primitive <code className="font-mono text-xs font-bold text-emerald-800">undefined</code>. Trois pièges syntaxiques provoquent fréquemment ce comportement indésirable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Piège 1 : L'insertion automatique de point-virgule (ASI) */}
          <div className="p-4 rounded-2xl border-2 border-rose-200 bg-rose-50/60 space-y-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-rose-200 text-rose-900">Piège #1 : ASI</span>
            <h3 className="font-bold text-sm text-rose-950">Saut de ligne après return</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Si vous placez un saut de ligne immédiatement après <code className="font-mono font-bold">return</code>, V8 insère un point-virgule automatique (<code className="font-mono font-bold">return;</code>). L&apos;objet situé dessous n&apos;est jamais retourné et devient du code mort inaccessible !
            </p>
          </div>

          {/* Piège 2 : Branches asymétriques */}
          <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/60 space-y-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-amber-200 text-amber-900">Piège #2 : Asymétrie</span>
            <h3 className="font-bold text-sm text-amber-950">Oubli du return de repli (else)</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Une fonction qui retourne une valeur dans un <code className="font-mono">if</code> mais n&apos;a pas de clause de repli renvoie implicitement <code className="font-mono">undefined</code> pour tous les autres cas. Cela fait exploser les appels en chaîne du type <code className="font-mono">result.total</code> plus loin.
            </p>
          </div>

          {/* Piège 3 : Accolades des fonctions fléchées */}
          <div className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/60 space-y-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-purple-200 text-purple-900">Piège #3 : Arrow Function</span>
            <h3 className="font-bold text-sm text-purple-950">Accolades prises pour un corps</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              <code className="font-mono font-bold">() =&gt; &#123; id: 1 &#125;</code> interprète les accolades comme un bloc d&apos;instructions et <code className="font-mono">id:</code> comme une étiquette (label) ! Pour renvoyer un objet littéral de façon concise, entourez-le de parenthèses : <code className="font-mono font-bold">() =&gt; (&#123; id: 1 &#125;)</code>.
            </p>
          </div>
        </div>

        {/* Exemple visuel de l'ASI */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-rose-400 font-bold">{`// 💥 DÉSASTRE ASI : Ce que vous écrivez vs ce que V8 interprète :`}</div>
          <div>{`function calculateInvoice() {
  return        // 💥 V8 ajoute ";" ici automatiquement : return; !
  {
    amount: 500,
    currency: "EUR"
  };
}

console.log(calculateInvoice()); // undefined ! L'objet n'a jamais été lu.

// ✅ CORRECTION : L'accolade ouvrante sur la même ligne que return :
function calculateInvoiceCorrect() {
  return {
    amount: 500,
    currency: "EUR"
  };
}`}</div>
        </div>
      </section>

      {/* 4. Les 8 Falsy et l'Algèbre Booléenne */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Les 8 valeurs falsy et les pièges du court-circuit (|| vs ?? vs &amp;&amp;)
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Dans une condition <code className="font-mono text-xs font-bold">if (condition)</code>, toute valeur est implicitement convertie en booléen. En JavaScript, il existe <strong>très exactement 8 valeurs dites falsy</strong>. Absolument toutes les autres valeurs de l&apos;univers JavaScript sont <em>truthy</em> (y compris les chaînes <code className="font-mono text-xs">&quot;0&quot;</code> ou <code className="font-mono text-xs">&quot;false&quot;</code>, les tableaux vides <code className="font-mono text-xs">[]</code> et les objets vides <code className="font-mono text-xs">&#123;&#125;</code>) !
        </p>

        {/* Les 8 badges falsy */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold">
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-200 text-center">false</div>
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-200 text-center">0</div>
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-200 text-center">-0</div>
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-200 text-center">0n (BigInt)</div>
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-200 text-center">&quot;&quot; (chaîne vide)</div>
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-200 text-center">null</div>
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-200 text-center">undefined</div>
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-200 text-center">NaN</div>
        </div>

        {/* Tableau comparatif des 3 opérateurs de court-circuit */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm mt-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Opérateur</th>
                <th className="p-3.5 border-b border-slate-200">Règle d&apos;évaluation court-circuit</th>
                <th className="p-3.5 border-b border-slate-200">Comportement avec 0 ou &quot;&quot;</th>
                <th className="p-3.5 border-b border-slate-200">Usage recommandé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-purple-700 font-bold">a || b</td>
                <td className="p-3.5">Retourne le 1er opérande <strong>truthy</strong>, ou le dernier</td>
                <td className="p-3.5 text-rose-600 font-bold">Écrase 0 et &quot;&quot; par la valeur de droite !</td>
                <td className="p-3.5">Valeurs de repli pour chaînes textuelles non vides</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-emerald-700 font-bold">a ?? b</td>
                <td className="p-3.5">Retourne b UNIQUEMENT si a vaut <code className="font-mono">null</code> ou <code className="font-mono">undefined</code></td>
                <td className="p-3.5 text-emerald-700 font-bold">Conserve fidèlement 0, false et &quot;&quot;</td>
                <td className="p-3.5 font-semibold text-emerald-800">Standard universel pour valeurs numériques ou booléennes</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-sky-700 font-bold">a &amp;&amp; b</td>
                <td className="p-3.5">Retourne le 1er opérande <strong>falsy</strong>, ou le dernier</td>
                <td className="p-3.5 text-amber-700 font-bold">Renvoie 0 si a vaut 0 (piège de rendu React !)</td>
                <td className="p-3.5">Exécution conditionnelle avec garde booléenne explicite</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Le piège fatal de la condition composée */}
        <Callout type="danger" title="Le bogue de condition : if (role === 'admin' || 'editor')">
          <p className="text-sm leading-relaxed">
            L&apos;opérateur <code className="font-mono font-bold">||</code> a une priorité d&apos;évaluation inférieure à <code className="font-mono font-bold">===</code> mais ne regroupe pas les opérandes autour d&apos;un sujet commun ! L&apos;expression <code className="font-mono font-bold">role === &quot;admin&quot; || &quot;editor&quot;</code> est analysée par V8 comme : <code className="font-mono font-bold">(role === &quot;admin&quot;) || (&quot;editor&quot;)</code>. Même si <code className="font-mono">role</code> vaut &quot;invité&quot;, la chaîne &quot;editor&quot; est truthy, donc toute la condition s&apos;évalue à <code className="font-mono text-rose-700 font-bold">true</code> !
          </p>
          <div className="mt-2 font-mono text-xs bg-slate-900 text-slate-200 p-2.5 rounded-xl">
            {`// BOGUE CRITIQUE : laisse entrer n'importe quel rôle !
if (role === "admin" || "editor") { ... }

// CORRECTION 1 : Répéter la variable
if (role === "admin" || role === "editor") { ... }

// CORRECTION 2 : Vérification par tableau (recommandé si > 2 valeurs)
if (["admin", "editor", "superadmin"].includes(role)) { ... }`}
          </div>
        </Callout>
      </section>

      {/* 5. Simulateur Interactif : Laboratoire de Logique Conditionnelle */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5 text-lime-700" />
              <span>5. Laboratoire Interactif : Diagnostic des Pièges Logiques</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sélectionnez une expression problématique pour disséquer son évaluation pas-à-pas et inspecter son correctif immédiat.
            </p>
          </div>
        </div>

        {/* Boutons de sélection de presets */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
          {(Object.keys(LOGIC_PRESETS) as LogicLabPresetKey[]).map((key) => {
            const preset = LOGIC_PRESETS[key];
            const isSelected = activePreset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActivePreset(key)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-lime-300 border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    {preset.category}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    preset.riskLevel === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {preset.riskLevel}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold truncate">{preset.label}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'inspection en direct */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Expression inspectée :</span>
              <div className="text-sm font-mono font-bold text-white mt-0.5">
                {currentScenario.label}
              </div>
            </div>
            <div className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-slate-900 border border-slate-700 text-slate-300">
              Résultat évalué : <span className="text-rose-400 font-mono font-black">{currentScenario.evaluatedResult}</span>
            </div>
          </div>

          {/* Grille Code vs Explication */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Code problématique :
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {currentScenario.expression}
              </pre>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Explication de l&apos;anomalie par le moteur JS :
              </span>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                {currentScenario.explanation}
              </div>
            </div>
          </div>

          {/* Correction recommandée */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-1">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <Icon name="check" className="w-4 h-4 text-emerald-400" />
              <span>Correctif sécurisé :</span>
            </div>
            <pre className="text-xs text-emerald-200 font-mono bg-emerald-950/60 p-2.5 rounded-lg overflow-x-auto">
              {currentScenario.cleanFix}
            </pre>
          </div>
        </div>
      </section>

      {/* 6. Travaux Pratiques : Audit d'un moteur de validation de factures */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            6. Travaux Pratiques — Audit et refactorisation d&apos;un système de tarification
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Le module de facturation ci-dessous a été écrit pour une plateforme SaaS. Des utilisateurs standards ont obtenu des accès administrateurs par accident, des remises de 0% ont été écrasées par 20% et certains appels à l&apos;API renvoient des factures vides. Identifiez les anomalies et découvrez la solution défensive.
        </p>

        {/* Code source bogué */}
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase text-rose-700 flex items-center gap-2">
            <Icon name="alert" className="w-4 h-4 text-rose-600" />
            <span>Code défaillant (5 failles fonctionnelles et logiques)</span>
          </h3>
          <CodeBlock
            language="javascript"
            filename="buggy-pricing.js"
            code={`// 1. FAILLE ARROW FUNCTION : Renvoie undefined au lieu d'un objet
const createInvoiceHeader = (clientName, invoiceId) => {
  invoiceId: invoiceId,
  clientName: clientName,
  issuedAt: new Date()
};

function generateInvoice(client, rawPrice, customDiscount) {
  // 2. FAILLE DE CONDITION : Toujours évaluée comme VRAIE !
  if (client.tier === "enterprise" || "partner") {
    console.log("Tarif grand compte appliqué");
  }

  // 3. FAILLE COALESCENCE : Si customDiscount vaut 0%, || lui attribue 20% !
  const discountRate = customDiscount || 20;

  // 4. FAILLE D'ARITÉ : Appel avec ordre inversé de la fonction
  const basePrice = Number(rawPrice);
  const finalPrice = basePrice * (1 - discountRate / 100);

  // 5. FAILLE ASI : L'objet n'est jamais retourné à cause du saut de ligne
  return
  {
    header: createInvoiceHeader(client.name, "INV-2026-001"),
    finalPrice: finalPrice
  };
}`}
          />
        </div>

        {/* Code source corrigé */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Solution refactorisée et protégée contre les pièges logiques</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="safe-pricing.ts"
            code={`interface Client {
  name: string;
  tier: "standard" | "partner" | "enterprise";
}

interface InvoiceHeader {
  invoiceId: string;
  clientName: string;
  issuedAt: Date;
}

interface InvoiceResult {
  header: InvoiceHeader;
  basePrice: number;
  discountRate: number;
  finalPrice: number;
}

// 1. CORRECTION ARROW FUNCTION : Parenthèses ({ ... }) pour retour direct d'objet
const createInvoiceHeaderSafe = (clientName: string, invoiceId: string): InvoiceHeader => ({
  invoiceId,
  clientName,
  issuedAt: new Date()
});

export function generateInvoiceSafe(
  client: Client,
  rawPrice: number | string,
  customDiscount?: number
): InvoiceResult {
  // 2. CORRECTION CONDITION : Tableau explicite d'inclusion
  const isPrivilegedTier = ["enterprise", "partner"].includes(client.tier);
  if (isPrivilegedTier) {
    console.log("Tarif grand compte appliqué pour le client:", client.name);
  }

  // 3. CORRECTION COALESCENCE : ?? préserve le chiffre 0 sans forcer 20%
  const discountRate = customDiscount ?? (isPrivilegedTier ? 15 : 0);

  // 4. VALIDATION ARITHMÉTIQUE DÉFENSIVE
  const basePrice = Number(rawPrice);
  if (!Number.isFinite(basePrice) || basePrice < 0) {
    throw new TypeError("Le montant brut doit être un nombre positif ou nul.");
  }

  const finalPrice = Math.max(0, basePrice * (1 - discountRate / 100));

  // 5. CORRECTION ASI : Accolade ouvrante accolée sur la même ligne que 'return'
  return {
    header: createInvoiceHeaderSafe(client.name, "INV-2026-001"),
    basePrice,
    discountRate,
    finalPrice
  };
}`}
          />
        </div>
      </section>

      {/* 7. Synthèse : La Check-list Anti-Bogue de Logique Conditionnelle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Synthèse : Les 4 Règles d&apos;Or des Fonctions et Conditions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : Jamais de retour à la ligne après return</span>
            <p className="text-xs text-slate-700">Gardez toujours l&apos;accolade ouvrante <code className="font-mono font-bold">return &#123;</code> sur la même ligne que le mot-clé pour empêcher l&apos;insertion automatique de point-virgule (ASI).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : Utiliser ?? pour les nombres et booléens</span>
            <p className="text-xs text-slate-700">Bannissez <code className="font-mono font-bold">||</code> pour attribuer des valeurs par défaut aux quantités, prix ou indicateurs afin de ne jamais écraser le chiffre <code className="font-mono">0</code> ou <code className="font-mono">false</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : Parenthéser les objets fléchés</span>
            <p className="text-xs text-slate-700">Pour retourner directement un objet littéral depuis une fonction fléchée concise, entourez-le obligatoirement de parenthèses : <code className="font-mono font-bold">() =&gt; (&#123; prop: val &#125;)</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : Expliciter les conditions multiples</span>
            <p className="text-xs text-slate-700">N&apos;écrivez jamais <code className="font-mono">a === 1 || 2</code>. Répétez l&apos;opérande <code className="font-mono">a === 1 || a === 2</code> ou utilisez <code className="font-mono">[1, 2].includes(a)</code>.</p>
          </div>
        </div>
      </section>

      {/* 8. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          8. Quiz de validation — Chapitre 3.4
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi la fonction 'function f() { return\\n { a: 1 }; }' renvoie-t-elle undefined ?",
              options: [
                "À cause d'une SyntaxError lors du parsing",
                "Le mécanisme ASI (Automatic Semicolon Insertion) insère un point-virgule après 'return' dès qu'un saut de ligne est détecté",
                "Les objets littéraux ne peuvent pas avoir de clés sur une ligne séparée",
                "Parce que la propriété 'a' n'est pas typée"
              ],
              correctIndex: 1,
              explanation: "V8 applique la règle de complétion ASI : un saut de ligne après return force l'insertion d'un point-virgule, ce qui équivaut à écrire return; et renvoie undefined."
            },
            {
              id: 2,
              question: "Parmi ces 4 expressions, laquelle s'évalue comme TRUTHY en JavaScript ?",
              options: [
                "0",
                "\"0\"",
                "null",
                "NaN"
              ],
              correctIndex: 1,
              explanation: "Une chaîne non vide (même contenant le caractère '0') possède une longueur supérieure à 0 et est toujours évaluée comme truthy par ECMAScript."
            },
            {
              id: 3,
              question: "Quelle est la faille majeure de la condition : if (user.role === 'admin' || 'moderator') ?",
              options: [
                "Elle lève une ReferenceError",
                "La chaîne 'moderator' non vide est toujours truthy, rendant la condition vraie à 100% quel que soit le rôle",
                "L'opérateur || est interdit dans les conditions if",
                "Elle transforme user.role en minuscules"
              ],
              correctIndex: 1,
              explanation: "V8 évalue (user.role === 'admin') || ('moderator'). Comme 'moderator' est une chaîne truthy, l'opérateur || renvoie 'moderator', ce qui valide la condition pour tout le monde."
            },
            {
              id: 4,
              question: "Comment corriger la fonction fléchée 'const make = () => { id: 1 };' pour qu'elle retourne l'objet attendu ?",
              options: [
                "const make = () => return { id: 1 };",
                "const make = () => ({ id: 1 });",
                "const make = () => [ id: 1 ];",
                "const make = function() => { id: 1 };"
              ],
              correctIndex: 1,
              explanation: "Entourer l'objet littéral de parenthèses ({ ... }) indique à l'analyseur syntaxique qu'il s'agit d'une expression de retour et non du bloc d'instructions de la fonction."
            },
            {
              id: 5,
              question: "Quel résultat produit l'expression : const qty = 0 || 5; ?",
              options: [
                "0",
                "5",
                "undefined",
                "TypeError"
              ],
              correctIndex: 1,
              explanation: "L'opérateur || rejette toute valeur falsy. Comme 0 est falsy, il sélectionne l'opérande droit 5. Pour préserver le chiffre 0, il faut utiliser la coalescence des nuls : 0 ?? 5."
            },
            {
              id: 6,
              question: "Pourquoi l'expression React '{count && <Badge />}' peut-elle afficher '0' sur la page web ?",
              options: [
                "React convertit tous les composants en 0",
                "Parce que l'opérateur && renvoie son premier opérande s'il est falsy, produisant la valeur 0 que React affiche textuellement",
                "C'est un bogue du navigateur Chrome",
                "Parce que Badge est une fonction asynchrone"
              ],
              correctIndex: 1,
              explanation: "Si count vaut 0 (falsy), count && <Badge /> s'évalue immédiatement à 0. En JSX, 0 est un nombre valide qui est imprimé dans le DOM. La solution est : count > 0 && <Badge />."
            }
          ]}
        />
      </section>
    </div>
  );
};
