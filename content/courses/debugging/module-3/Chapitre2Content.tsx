'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Déboguer les erreurs de variables et de types
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
            <span>Différencier rigoureusement undefined, null, 0 et propriété absente.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déjouer les pièges historiques de typeof (null, tableaux, NaN).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Contrôler la coercition de types et bannir l&apos;égalité non stricte (==).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Prévenir les effets de bord liés au partage de références d&apos;objets et tableaux.</span>
          </li>
        </ul>
      </section>

      {/* 2. undefined vs null vs inexistant */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Différencier undefined, null, 0 et propriété inexistante
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Valeur</th>
                <th className="p-3.5 border-b border-slate-200">Signification sémantique</th>
                <th className="p-3.5 border-b border-slate-200">Test d&apos;existence fiable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-emerald-700 font-bold">undefined</td>
                <td className="p-3.5">Variable déclarée mais jamais initialisée, ou retour par défaut.</td>
                <td className="p-3.5 font-mono text-xs">value === undefined</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-emerald-700 font-bold">null</td>
                <td className="p-3.5">Absence intentionnelle de valeur (ex: email facultatif non renseigné).</td>
                <td className="p-3.5 font-mono text-xs">value === null</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Propriété absente</td>
                <td className="p-3.5">La clé n&apos;existe tout simplement pas dans l&apos;objet en mémoire.</td>
                <td className="p-3.5 font-mono text-xs">Object.hasOwn(obj, &quot;prop&quot;)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-emerald-400 font-bold">{`// Exemple de détection fine des propriétés d'un objet :`}</div>
          <div>{`const user = { name: "Ahmed", email: null };
console.log("name" in user);        // true (présente)
console.log("email" in user);       // true (présente avec valeur null)
console.log("phone" in user);       // false (complètement absente)
console.log(Object.hasOwn(user, "phone")); // false (sans remonter le prototype)`}</div>
        </div>
      </section>

      {/* 3. Pièges de typeof */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les anomalies historiques de l&apos;opérateur typeof
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/70 space-y-2">
            <span className="font-mono text-xs font-bold text-rose-800">typeof null === &quot;object&quot;</span>
            <p className="text-xs text-rose-900 leading-relaxed">
              Bug historique conservé pour compatibilité Web depuis 1995. Pour vérifier null, utilisez strictement <code className="font-bold font-mono">val === null</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 space-y-2">
            <span className="font-mono text-xs font-bold text-amber-800">typeof [] === &quot;object&quot;</span>
            <p className="text-xs text-amber-900 leading-relaxed">
              <code className="font-mono">typeof</code> ne sait pas distinguer un tableau d&apos;un objet. Utilisez impérativement <code className="font-bold font-mono">Array.isArray(val)</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/70 space-y-2">
            <span className="font-mono text-xs font-bold text-purple-800">typeof NaN === &quot;number&quot;</span>
            <p className="text-xs text-purple-900 leading-relaxed">
              Bien que signifiant &quot;Not a Number&quot;, NaN est du type number ! Utilisez <code className="font-bold font-mono">Number.isNaN(val)</code> ou <code className="font-bold font-mono">Number.isFinite(val)</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Coercition et opérateur + */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Pièges de la coercition implicite et concaténation accidentelle
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          L&apos;opérateur <code className="text-emerald-700 font-mono font-bold">+</code> est polymorphe : dès qu&apos;un opérande est une chaîne de caractères, il bascule de l&apos;addition arithmétique vers la concaténation de chaînes.
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-rose-400 font-bold">{`// Piège classique en provenance des formulaires ou paramètres d'URL :`}</div>
          <div>{`const price = "100";  // Reçu en string
const quantity = 2;    // Number

const totalFaux = price + quantity;  // 💥 "1002" (Concaténation !)
const soustraction = price - quantity; // 98 (La soustraction convertit en number !)

// Correction professionnelle par conversion explicite et validation de finitude :
const numericPrice = Number(price);
if (!Number.isFinite(numericPrice) || numericPrice < 0) {
  throw new TypeError("Prix unitaire invalide");
}
const totalExact = numericPrice * quantity; // 200`}</div>
        </div>
      </section>

      {/* 5. Mutations d'objets par référence */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Pièges de mutation d&apos;objets et tableaux par référence
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          En JavaScript, les objets et tableaux sont stockés par pointeur d&apos;adresse mémoire. L&apos;affectation simple ne crée jamais de copie.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-rose-950 text-rose-200 border border-rose-800">
            <span className="font-bold text-rose-400 font-sans uppercase">Piège de référence partagée :</span>
            <pre className="mt-2 text-slate-300">{`const user1 = { age: 25 };
const user2 = user1; // Pointeur partagé !
user2.age = 30;

console.log(user1.age); // 💥 30 !
// user1 a été corrompu par effet de bord`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950 text-emerald-200 border border-emerald-800">
            <span className="font-bold text-emerald-400 font-sans uppercase">Copie superficielle vs profonde :</span>
            <pre className="mt-2 text-slate-300">{`// Copie superficielle (1 niveau) :
const userClone = { ...user1 };

// Copie profonde (ES2022 moderne) :
const deepUser = structuredClone(user1);
deepUser.address.city = "Tanger";
// user1.address.city reste inchangé`}</pre>
          </div>
        </div>
      </section>

      {/* 6. TP Pratique : Déboguer un système de commande e-commerce */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          6. Travaux Pratiques — Audit et correction d&apos;un système de commande
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Voici le corrigé complet de la fonction <code className="text-emerald-700 font-mono font-bold">calculateOrder()</code> avec conversion explicite des identifiants (chaîne vs nombre), vérification du stock sans mutation de l&apos;état global et calcul défensif :
        </p>

        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-3">
          <div className="text-emerald-400 font-bold">{`// Solution robuste et défensive :`}</div>
          <div>{`function calculateOrder(products, productId, quantity) {
  // 1. Validation stricte des types d'entrée
  const numericId = Number(productId);
  const numericQty = Number(quantity);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new TypeError("Identifiant produit invalide");
  }
  if (!Number.isInteger(numericQty) || numericQty <= 0) {
    throw new TypeError("La quantité doit être un entier strictement positif");
  }

  // 2. Recherche avec comparaison stricte
  const product = products.find(item => item.id === numericId);
  if (!product) {
    throw new Error("Produit introuvable dans le catalogue");
  }

  // 3. Contrôle du stock disponible
  if (numericQty > product.stock) {
    throw new RangeError("Stock insuffisant pour satisfaire la commande");
  }

  // 4. Calcul sans risque de concaténation
  const price = Number(product.price);
  const subtotal = price * numericQty;
  const discount = 10;
  const total = subtotal - discount;

  // 5. Retour d'un nouvel objet IMMUABLE (sans muter le catalogue)
  return {
    productId: product.id,
    productName: product.name,
    subtotal,
    discount,
    total,
    remainingStock: product.stock - numericQty
  };
}`}</div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.2
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Que retourne l'expression typeof [] en JavaScript ?",
              options: [
                "\"array\"",
                "\"object\"",
                "\"undefined\"",
                "\"list\""
              ],
              correctIndex: 1,
              explanation: "typeof retourne historiquement 'object' pour les tableaux. La seule méthode standard fiable est Array.isArray(val)."
            },
            {
              id: 2,
              question: "Quel est le résultat de l'expression : \"5\" + 2 ?",
              options: [
                "7",
                "\"52\"",
                "NaN",
                "TypeError"
              ],
              correctIndex: 1,
              explanation: "L'opérateur + réalise une concaténation dès lors qu'un des deux opérandes est une chaîne de caractères."
            },
            {
              id: 3,
              question: "Quelle méthode permet de cloner profondément un objet imbriqué sans partager ses sous-références ?",
              options: [
                "Object.assign({}, obj)",
                "{ ...obj }",
                "structuredClone(obj)",
                "obj.clone()"
              ],
              correctIndex: 2,
              explanation: "structuredClone() (ES2022) réalise une véritable copie profonde de toutes les propriétés et sous-objets compatibles."
            },
            {
              id: 4,
              question: "Que retourne l'évaluation typeof NaN ?",
              options: [
                "\"NaN\"",
                "\"undefined\"",
                "\"number\"",
                "\"object\""
              ],
              correctIndex: 2,
              explanation: "Bien que son nom signifie 'Not a Number', NaN appartient techniquement au type primitif 'number'."
            },
            {
              id: 5,
              question: "Pourquoi est-il déconseillé d'utiliser l'égalité non stricte (==) lors de la comparaison d'IDs d'API ?",
              options: [
                "Elle ralentit le processeur",
                "Elle effectue une coercition implicite et peut considérer faussement 0 == \"\" ou 0 == false",
                "Elle supprime la variable de la mémoire",
                "Elle bloque l'Event Loop"
              ],
              correctIndex: 1,
              explanation: "== applique des conversions arbitraires. L'égalité stricte === avec conversion explicite préalable est impérative."
            }
          ]}
        />
      </section>
    </div>
  );
};
