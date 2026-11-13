'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type ErrorCaseId = 'type-map' | 'ref-scope' | 'range-recursion' | 'async-fetch';

interface ErrorCase {
  id: ErrorCaseId;
  title: string;
  badge: string;
  badgeColor: string;
  errorLog: {
    name: string;
    message: string;
    frames: { func: string; file: string; line: number; isUserCode: boolean }[];
  };
  explanation: string;
  crashLocation: string;
  rootCause: string;
  fixSnippet: {
    bad: string;
    good: string;
  };
}

export const Chapitre4Content: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<ErrorCaseId>('type-map');

  const errorCases: Record<ErrorCaseId, ErrorCase> = {
    'type-map': {
      id: 'type-map',
      title: '1. TypeError : Cannot read properties of undefined (reading \'map\')',
      badge: 'LE BUG REACT N°1 AU MONDE',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      errorLog: {
        name: 'Uncaught TypeError',
        message: "Cannot read properties of undefined (reading 'map')",
        frames: [
          { func: 'ProductList', file: 'src/components/ProductList.tsx', line: 18, isUserCode: true },
          { func: 'renderWithHooks', file: 'node_modules/react-dom/client.js', line: 1542, isUserCode: false },
          { func: 'updateFunctionComponent', file: 'node_modules/react-dom/client.js', line: 1890, isUserCode: false },
        ],
      },
      explanation:
        "Vous tentez d'exécuter .map() sur une variable 'products' qui vaut undefined. Cela arrive constamment en React lors du tout premier rendu, avant que l'appel d'API fetch n'ait eu le temps de répondre !",
      crashLocation: "Ligne 18 dans ProductList.tsx : products.map(p => ...)",
      rootCause:
        "L'état initial du composant a été initialisé avec useState() au lieu de useState([]), ou les données de l'API ne sont pas encore arrivées.",
      fixSnippet: {
        bad: `// ❌ Crash au 1er rendu : products vaut undefined !
const [products, setProducts] = useState();

return (
  <div>{products.map(p => <Card key={p.id} {...p} />)}</div>
);`,
        good: `// ✓ Correction 1 : Valeur par défaut tableau vide
const [products, setProducts] = useState([]);

// ✓ Correction 2 : Sécurisation par chaînage optionnel
return (
  <div>{products?.map(p => <Card key={p.id} {...p} />)}</div>
);`,
      },
    },
    'ref-scope': {
      id: 'ref-scope',
      title: '2. ReferenceError : discountRate is not defined',
      badge: 'VARIABLE HORS DE PORTÉE',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      errorLog: {
        name: 'Uncaught ReferenceError',
        message: 'discountRate is not defined',
        frames: [
          { func: 'applyPromoCode', file: 'src/services/pricing.js', line: 34, isUserCode: true },
          { func: 'calculateCartTotal', file: 'src/services/pricing.js', line: 12, isUserCode: true },
          { func: 'handleCheckout', file: 'src/views/CheckoutView.js', line: 55, isUserCode: true },
        ],
      },
      explanation:
        "Le moteur JavaScript cherche une variable dans le scope local, remonte au scope parent, puis au scope global sans jamais la trouver. Soit le nom est mal orthographié, soit la variable est enfermée dans un autre bloc if/function.",
      crashLocation: "Ligne 34 dans pricing.js : return total * (1 - discountRate)",
      rootCause:
        "La variable a été déclarée avec 'let' à l'intérieur d'un bloc if parent, et n'est donc pas visible à l'extérieur de ce bloc.",
      fixSnippet: {
        bad: `function applyPromoCode(code, total) {
  if (code === "PROMO20") {
    let discountRate = 0.20; // ❌ Enfermée dans le bloc if !
  }
  return total * (1 - discountRate); // 💥 ReferenceError !
}`,
        good: `function applyPromoCode(code, total) {
  let discountRate = 0; // ✓ Déclarée dans le scope de la fonction
  if (code === "PROMO20") {
    discountRate = 0.20;
  }
  return total * (1 - discountRate);
}`,
      },
    },
    'range-recursion': {
      id: 'range-recursion',
      title: '3. RangeError : Maximum call stack size exceeded',
      badge: 'RÉCURSION INFINIE (DÉBORDEMENT DE PILE)',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      errorLog: {
        name: 'Uncaught RangeError',
        message: 'Maximum call stack size exceeded',
        frames: [
          { func: 'formatCategoryTree', file: 'src/utils/tree.js', line: 8, isUserCode: true },
          { func: 'formatCategoryTree', file: 'src/utils/tree.js', line: 11, isUserCode: true },
          { func: 'formatCategoryTree', file: 'src/utils/tree.js', line: 11, isUserCode: true },
        ],
      },
      explanation:
        "La pile d'appels de Chrome (limitée à environ 10 000 à 15 000 cadres d'appels) est pleine à ras bord ! Une fonction s'appelle elle-même en boucle sans jamais atteindre de condition d'arrêt (cas de base).",
      crashLocation: "Ligne 11 dans tree.js : formatCategoryTree() récursive",
      rootCause:
        "La condition d'arrêt if (node.children.length === 0) est manquante, ou l'arbre de données contient une référence circulaire (le parent référence l'enfant qui référence le parent).",
      fixSnippet: {
        bad: `// ❌ Boucle infinie : aucun cas de base pour stopper !
function formatTree(node) {
  return node.children.map(child => formatTree(child));
}`,
        good: `// ✓ Cas de base explicite + protection anti-référence circulaire
function formatTree(node, visited = new Set()) {
  if (!node || visited.has(node.id)) return null;
  visited.add(node.id);
  if (!node.children || node.children.length === 0) return node.name;
  return node.children.map(child => formatTree(child, visited));
}`,
      },
    },
    'async-fetch': {
      id: 'async-fetch',
      title: '4. Le piège Fetch : Erreur HTTP 404 masquée',
      badge: 'ASYNCHRONISME & PROMISES',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      errorLog: {
        name: 'Uncaught (in promise) SyntaxError',
        message: 'Unexpected token < in JSON at position 0',
        frames: [
          { func: 'Response.json', file: '<anonymous>', line: 1, isUserCode: false },
          { func: 'loadUserCart', file: 'src/api/cart.js', line: 9, isUserCode: true },
          { func: 'async onMount', file: 'src/App.js', line: 24, isUserCode: true },
        ],
      },
      explanation:
        "L'API a répondu avec une page HTML d'erreur 404 ou 500 (qui commence par '<!DOCTYPE html>'). En exécutant response.json(), le parseur JSON essaie de décoder le '<' et lève une SyntaxError incompréhensible !",
      crashLocation: "Ligne 9 dans cart.js : const data = await response.json()",
      rootCause:
        "fetch() NE REJETTE PAS sa Promise en cas d'erreur HTTP 404 ou 500. Le développeur a oublié de vérifier if (!response.ok).",
      fixSnippet: {
        bad: `// ❌ Erreur : fetch réussit même sur un code HTTP 404 !
const response = await fetch('/api/unknown-cart');
// Le serveur renvoie du HTML 404, donc response.json() plante !
const cart = await response.json();`,
        good: `// ✓ Vérification impérative du contrat HTTP :
const response = await fetch('/api/unknown-cart');
if (!response.ok) {
  throw new Error(\`Erreur HTTP \${response.status} : impossible de charger le panier\`);
}
const cart = await response.json();`,
      },
    },
  };

  const currentCase = errorCases[selectedCaseId];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="bug" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Boîte à Outils Fondamentale</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — Comprendre les messages d&apos;erreur et les Stack Traces
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Face à un pavé de texte rouge dans la console, la plupart des développeurs débutants paniquent ou recopient aveuglément l&apos;erreur dans un moteur de recherche. Apprenez la <strong>règle des 3 secondes</strong> pour disséquer n&apos;importe quelle Stack Trace, distinguer le lieu du crash de la cause racine et remonter l&apos;arbre généalogique de vos bugs.
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
              <strong className="text-slate-950 block">Anatomie d&apos;une exception :</strong>
              <span>Décomposer instantanément les 4 blocs vitaux : Statut, Type, Message et Emplacement exact.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Les 5 familles d&apos;erreurs JavaScript :</strong>
              <span>Reconnaître au premier coup d&apos;œil TypeError, ReferenceError, SyntaxError, RangeError et URIError.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Lieu du crash ≠ Cause racine :</strong>
              <span>Comprendre pourquoi la ligne qui lève l&apos;erreur n&apos;est presque jamais la ligne coupable.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Traces asynchrones &amp; Piège Fetch :</strong>
              <span>Naviguer dans les piles d&apos;appels Promise/async et déjouer le faux succès des erreurs HTTP 404/500.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. La règle des 3 secondes */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. La règle des 3 secondes pour lire une Stack Trace sans paniquer
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Une Stack Trace (trace de la pile d&apos;appels) impressionne souvent les débutants par sa longueur. Pourtant, <strong>90% de son contenu peut être ignoré</strong> (les fichiers internes de bibliothèques comme React ou Next.js).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">1</span>
              <strong className="text-blue-950 text-sm">Seconde 1 : Le Type</strong>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Regardez le tout premier mot (<code className="font-mono text-blue-900">TypeError</code>, <code className="font-mono text-blue-900">ReferenceError</code>). Il vous indique la nature exacte de l&apos;infraction.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">2</span>
              <strong className="text-emerald-950 text-sm">Seconde 2 : Le Message</strong>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Lisez ce qui suit les deux-points (<code className="font-mono text-emerald-900">Cannot read properties of null</code>). Le moteur vous dit exactement ce qu&apos;il essayait de faire.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">3</span>
              <strong className="text-amber-950 text-sm">Seconde 3 : VOTRE Fichier</strong>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Scannez la liste de haut en bas et sautez les lignes <code className="font-mono text-slate-500">node_modules/</code> pour trouver la première ligne de <strong>votre propre code</strong> !
            </p>
          </div>
        </div>
      </section>

      {/* 3. Anatomie détaillée */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Anatomie détaillée d&apos;une exception standard
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Examinons à la loupe un message d&apos;erreur standard émis par Chrome DevTools :
        </p>

        <div className="p-5 rounded-2xl bg-rose-950 text-rose-100 font-mono text-xs space-y-2 border-2 border-rose-600/50 shadow-md">
          <div className="font-bold text-rose-300 text-sm">
            Uncaught TypeError: Cannot read properties of null (reading &apos;email&apos;)
          </div>
          <div className="pl-4 text-emerald-300">at getUserEmail (app.js:12:18)</div>
          <div className="pl-4 text-slate-400">at displayProfile (app.js:25:5)</div>
          <div className="pl-4 text-slate-500">at HTMLButtonElement.&lt;anonymous&gt; (app.js:40:3)</div>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Composant de l&apos;erreur</th>
                <th className="p-3.5">Valeur extraite</th>
                <th className="p-3.5">Explication pour débutant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Statut d&apos;interception</td>
                <td className="p-3.5 font-mono text-rose-700 font-bold">Uncaught</td>
                <td className="p-3.5 text-xs text-slate-600">
                  L&apos;erreur s&apos;est produite sans qu&apos;aucun bloc <code className="font-mono">try / catch</code> ne l&apos;intercepte. Elle a donc fait planter le fil d&apos;exécution courant.
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Type d&apos;erreur</td>
                <td className="p-3.5 font-mono text-rose-700 font-bold">TypeError</td>
                <td className="p-3.5 text-xs text-slate-600">
                  Une opération interdite a été tentée sur une valeur d&apos;un type incompatible (ici : chercher une propriété sur un objet inexistant qui vaut <code className="font-mono text-slate-800">null</code>).
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Description de l&apos;action</td>
                <td className="p-3.5 font-mono text-slate-900 font-bold">Cannot read properties of null (reading &apos;email&apos;)</td>
                <td className="p-3.5 text-xs text-slate-600">
                  Le moteur vous indique le nom précis de la propriété recherchée (<code className="font-mono text-emerald-700">email</code>), ce qui permet de localiser instantanément la variable fautive.
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Position précise</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">app.js:12:18</td>
                <td className="p-3.5 text-xs text-slate-600">
                  Fichier <code className="font-mono">app.js</code>, <strong>ligne 12</strong>, caractère <strong>18</strong>. Cliquez dessus dans DevTools pour sauter directement au code !
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Les figures de Stack Traces */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. La cascade de la pile d&apos;appels (Call Stack)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Une fonction n&apos;arrive presque jamais seule. Elle est appelée par une autre, elle-même déclenchée par un clic ou une promesse. La Stack Trace est comme un arbre généalogique qui se lit <strong>du haut vers le bas</strong> :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image18.jpeg"
            alt="Stack trace dans Chrome DevTools montrant la cascade des fonctions baz, bar et foo"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.4.1 — Stack trace dans Sources : cascade <code className="text-xs">baz()</code> (ligne 2) appelée par <code className="text-xs">bar()</code> (ligne 6) appelée par <code className="text-xs">foo()</code> (ligne 10).
          </div>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image19.jpeg"
            alt="Console DevTools avec erreurs multiples et traces de fonctions imbriquées"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.4.2 — Visualisation des stack traces dans la console : repérage instantané des fichiers et lignes sources cliquables.
          </div>
        </div>
      </section>

      {/* 5. La règle d'or : Lieu du crash != Cause racine */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. La règle d&apos;or de l&apos;ingénieur : Lieu du crash ≠ Cause racine
        </h2>
        <p className="text-base text-slate-800 font-medium">
          C&apos;est le piège numéro 1 dans lequel tombent 95% des débutants : <strong>modifier immédiatement la ligne où l&apos;erreur a explosé</strong> sans comprendre d&apos;où viennent les données corrompues.
        </p>

        <Callout type="warning" title="Le piège fatal des débutants">
          <p className="text-sm leading-relaxed">
            Lorsque la console affiche <code className="font-mono text-rose-800">TypeError: Cannot read properties of undefined (reading &apos;name&apos;)</code> à la ligne 42, votre premier réflexe ne doit <strong>PAS</strong> être d&apos;ajouter un simple <code className="font-mono">user?.name</code> pour masquer l&apos;erreur. Vous devez d&apos;abord vous demander : <em>« Pourquoi user est-il undefined à ce stade ? »</em>.
          </p>
        </Callout>

        {/* Métaphore du colis vide */}
        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
          <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
            <Icon name="info" className="w-4 h-4 text-amber-700" />
            <span>La métaphore du colis vide : Accusez-vous le livreur ?</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            Imaginez qu&apos;un livreur frappe à votre porte et vous tende un carton. Vous l&apos;ouvrez : il est totalement vide !
            Est-ce la faute du livreur ? Non ! Le livreur n&apos;a fait que transporter le colis qu&apos;on lui a donné. Le vrai problème vient de l&apos;entrepôt d&apos;expédition à 200 km qui a oublié d&apos;y placer l&apos;article.
          </p>
          <p className="text-xs text-amber-950 font-bold mt-1">
            👉 En programmation, la fonction qui crashe est le livreur. La cause racine est la fonction en amont qui a généré ou transmis une valeur corrompue (<code className="font-mono">null</code> ou <code className="font-mono">undefined</code>).
          </p>
        </div>

        {/* Démonstration par le code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-700">Code avec erreur en chaîne :</span>
            <CodeBlock
              language="javascript"
              code={`// Étape 1 : L'entrepôt renvoie null
function getUserFromAPI() {
  return null; // ⚠️ CAUSE RACINE
}

// Étape 2 : Le livreur reçoit le colis vide
function displayUserProfile() {
  const user = getUserFromAPI();
  
  // 💥 LIEU DU CRASH :
  // TypeError: Cannot read properties of null
  console.log("Nom : " + user.name);
}

displayUserProfile();`}
            />
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-300 text-xs">
            <strong className="text-slate-900 block font-bold text-sm">Analyse méthodique des 3 niveaux :</strong>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-slate-900 block">1. Le Symptôme (visible pour l&apos;utilisateur) :</span>
                <span className="text-slate-600">La page reste blanche ou le profil ne s&apos;ouvre pas.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                <span className="font-bold text-rose-900 block">2. Le Lieu du crash (où l&apos;exception explose) :</span>
                <span className="text-rose-800 font-mono">user.name dans displayUserProfile()</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 block">3. La Cause racine (d&apos;où vient la donnée viciée) :</span>
                <span className="text-emerald-800 font-mono">getUserFromAPI() qui n&apos;a trouvé aucun utilisateur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Les 5 familles d'erreurs */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          6. Les 5 grandes familles d&apos;erreurs JavaScript
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono font-bold">TypeError</span>
            <p className="text-slate-700 font-medium">
              Une valeur n&apos;est pas du type attendu : appeler un objet comme une fonction (<code className="font-mono">user()</code>) ou lire une propriété sur <code className="font-mono">null</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold">ReferenceError</span>
            <p className="text-slate-700 font-medium">
              Le moteur cherche une variable qui n&apos;existe nulle part en mémoire (faute de frappe dans le nom ou variable déclarée dans un bloc inaccessible).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">SyntaxError</span>
            <p className="text-slate-700 font-medium">
              Le code viole la grammaire de JavaScript : accolade non fermée, virgule en trop, ou tentative de parser du HTML comme du JSON.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold">RangeError</span>
            <p className="text-slate-700 font-medium">
              Une valeur numérique sort des limites autorisées : taille de tableau négative ou fonction récursive qui sature la mémoire de la pile d&apos;appels.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">URIError</span>
            <p className="text-slate-700 font-medium">
              Une fonction d&apos;encodage d&apos;URL (<code className="font-mono">decodeURIComponent</code>) reçoit une chaîne contenant un pourcentage mal formé (<code className="font-mono">%ZZ</code>).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono font-bold">Unhandled Rejection</span>
            <p className="text-slate-700 font-medium">
              Une promesse asynchrone (Promise) a échoué sans qu&apos;aucun bloc <code className="font-mono">.catch()</code> ou <code className="font-mono">try/catch</code> ne soit là pour l&apos;intercepter.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Simulateur interactif : Détective de Stack Trace */}
      <section className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="search" className="w-3.5 h-3.5" />
            <span>Atelier Détective</span>
          </div>
          <h2 className="text-[22px] font-black text-slate-950 tracking-tight">
            7. Simulateur interactif : Enquêtez sur 4 crashs célèbres
          </h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Sélectionnez une affaire d&apos;erreur ci-dessous, observez la Stack Trace et identifiez immédiatement la cause racine :
          </p>
        </div>

        {/* Case selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {Object.values(errorCases).map((ec) => (
            <button
              key={ec.id}
              onClick={() => setSelectedCaseId(ec.id)}
              className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                selectedCaseId === ec.id
                  ? 'border-slate-950 bg-slate-900 text-white shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1 opacity-80">
                {ec.badge}
              </div>
              <div className="text-xs font-bold line-clamp-2">
                {ec.title}
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Case Inspector */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-6 shadow-sm">
          {/* Simulated Error Console Box */}
          <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>{currentCase.errorLog.name}</span>
              </span>
              <span className="text-[11px]">Console DevTools</span>
            </div>
            <div className="text-rose-300 font-bold text-sm">
              {currentCase.errorLog.name}: {currentCase.errorLog.message}
            </div>
            <div className="space-y-1 pt-1">
              {currentCase.errorLog.frames.map((frame, idx) => (
                <div
                  key={idx}
                  className={`pl-4 flex items-center justify-between ${
                    frame.isUserCode
                      ? 'text-emerald-300 bg-emerald-950/40 py-0.5 px-2 rounded border-l-2 border-emerald-500'
                      : 'text-slate-500'
                  }`}
                >
                  <span>at {frame.func}</span>
                  <span className="text-[11px] underline cursor-pointer">
                    {frame.file}:{frame.line}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
              <span className="text-xs font-bold uppercase text-rose-900 block">💥 Lieu du Crash</span>
              <p className="text-xs text-rose-950 font-mono font-medium">
                {currentCase.crashLocation}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <span className="text-xs font-bold uppercase text-emerald-900 block">🎯 Véritable Cause Racine</span>
              <p className="text-xs text-emerald-950 font-medium">
                {currentCase.rootCause}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-700 font-medium">
            {currentCase.explanation}
          </p>

          {/* Before / After Code Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-rose-700 uppercase">❌ Code Défectueux</span>
              <CodeBlock language="javascript" code={currentCase.fixSnippet.bad} />
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-emerald-700 uppercase">✓ Correction Professionnelle</span>
              <CodeBlock language="javascript" code={currentCase.fixSnippet.good} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>8. Quiz de validation — Chapitre 4</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Dans une Stack Trace comportant 15 lignes, où se situe la fonction où l'exception s'est effectivement produite ?",
              options: [
                "Tout en bas de la trace",
                "Au tout premier cadre pertinent situé en haut de la liste",
                "Exactement au milieu de la pile",
                "Dans le fichier index.html uniquement"
              ],
              correctIndex: 1,
              explanation: "Le sommet de la trace (première ligne sous l'en-tête de l'erreur) correspond à l'instruction précise où l'interpréteur a interrompu l'exécution."
            },
            {
              id: 2,
              question: "Quelle est la cause la plus fréquente de l'erreur 'Cannot read properties of undefined (reading map)' en React ?",
              options: [
                "Un problème matériel de mémoire vive",
                "L'état (state) n'a pas encore reçu les données du backend et vaut undefined lors du premier rendu",
                "Une erreur de syntaxe dans la balise div",
                "Le navigateur Chrome est trop ancien"
              ],
              correctIndex: 1,
              explanation: "Au premier rendu, le composant s'exécute avant que fetch n'ait répondu. Initialiser useState([]) ou utiliser le chaînage optionnel (?.map) règle le souci."
            },
            {
              id: 3,
              question: "Si une fonction getUser() retourne null et que displayUser() plante sur user.name, que représente displayUser() ?",
              options: [
                "La cause racine du bogue",
                "Le lieu du crash (le livreur qui a reçu un colis vide)",
                "Une erreur de compilation TypeScript",
                "Un problème de serveur backend"
              ],
              correctIndex: 1,
              explanation: "displayUser() est le lieu du crash. La cause racine provient de getUser() qui n'a pas renvoyé l'objet attendu."
            },
            {
              id: 4,
              question: "L'appel fetch('/api/inexistant') déclenche-t-il automatiquement un rejet dans un try/catch s'il retourne un statut HTTP 404 ?",
              options: [
                "Oui, toujours car 404 est une erreur",
                "Non, fetch() ne rejette que si le réseau est coupé ou bloqué par CORS ; il faut vérifier response.ok",
                "Oui, mais seulement en production",
                "Non, fetch transforme la 404 en 200 automatiquement"
              ],
              correctIndex: 1,
              explanation: "fetch() considère que la communication HTTP a réussi même si le serveur répond 404 ou 500. Le développeur doit impérativement tester if (!response.ok)."
            },
            {
              id: 5,
              question: "Quelle erreur est déclenchée lorsqu'une fonction récursive s'appelle indéfiniment sans condition d'arrêt ?",
              options: [
                "ReferenceError: loop is not defined",
                "RangeError: Maximum call stack size exceeded",
                "TypeError: function is not a number",
                "URIError: recursive URI"
              ],
              correctIndex: 1,
              explanation: "La pile d'appels de Chrome possède une taille limite (~10 000 appels). En cas de boucle récursive infinie, une RangeError est levée immédiatement."
            },
            {
              id: 6,
              question: "Pourquoi voit-on souvent des dizaines de lignes faisant référence à 'node_modules/react-dom' dans une Stack Trace ?",
              options: [
                "Parce que React est buggé et doit être réinstallé",
                "Parce que votre fonction a été appelée par les moteurs internes du framework (gestionnaires d'événements, hooks)",
                "Parce qu'il s'agit d'un virus informatique",
                "Parce que les Source Maps sont obligatoires"
              ],
              correctIndex: 1,
              explanation: "Ces cadres internes représentent la plomberie du framework. Pour déboguer efficacement, il suffit de les ignorer pour trouver la première ligne de votre propre code."
            }
          ]}
        />
      </section>
    </div>
  );
};
