'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // State for Interactive Scope & Watch Simulator
  const [baseDiscount, setBaseDiscount] = useState<number>(0.15);
  const [itemPrice, setItemPrice] = useState<number>(2000);
  const [activeScopeTab, setActiveScopeTab] = useState<'local' | 'closure' | 'global'>('local');
  const [customWatchExpr, setCustomWatchExpr] = useState<string>('itemPrice * (1 - baseDiscount)');

  const calculatedFinalPrice = itemPrice * (1 - baseDiscount);
  const isVipThreshold = calculatedFinalPrice >= 1500;

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="search" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Boîte à Outils Fondamentale</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 7 — Inspection approfondie des variables et expressions
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Savoir figer le temps avec un breakpoint n&apos;est que la première moitié du voyage. La véritable enquête commence quand vous ouvrez les panneaux <strong>Scope</strong> et <strong>Watch</strong> : observer les fermetures (closures), surveiller des calculs complexes en direct et évaluer du code à chaud sans modifier une seule ligne de vos fichiers.
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
              <strong className="text-slate-950 block">Démystifier les 3 portées (Scope) :</strong>
              <span>Distinguer les variables locales (<code className="font-mono">Local</code>), les variables héritées (<code className="font-mono">Closure</code>) et le contexte global (<code className="font-mono">Global</code>).</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Surveillances dynamiques (Watch) :</strong>
              <span>Créer des expressions booléennes et arithmétiques recalculées automatiquement à chaque pas.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Évaluation à chaud &amp; Inline values :</strong>
              <span>Interroger la mémoire directement dans la console au point d&apos;arrêt et lire les valeurs affichées dans l&apos;éditeur.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Éviter les effets de bord involontaires :</strong>
              <span>Prévenir les mutations accidentelles de l&apos;état mémoire pendant vos sessions d&apos;investigation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Le panneau Scope */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Comprendre les 3 portées dans le panneau Scope
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Lorsque votre programme est suspendu, Chrome DevTools inspecte la table des symboles en mémoire et classe chaque variable disponible dans le volet <strong>Scope</strong> selon sa portée lexicale :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image29.jpeg"
            alt="Panneau Scope affichant les portées Local, Closure et Global"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.7.1 — Panneau Scope : distinction fondamentale entre la portée locale (Local), les fermetures (Closure) et la portée globale (Global).
          </div>
        </div>

        {/* Explication des 3 portées */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">Local</span>
              <strong className="text-slate-950 text-sm">Portée Locale</strong>
            </div>
            <p className="text-slate-700 font-medium">
              Contient les variables déclarées directement dans la fonction courante (<code className="font-mono">let</code>, <code className="font-mono">const</code>), ainsi que les arguments passés lors de l&apos;appel.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-amber-100 text-amber-800 font-mono font-bold">Closure</span>
              <strong className="text-slate-950 text-sm">Portée Closure</strong>
            </div>
            <p className="text-slate-700 font-medium">
              Les variables capturées depuis une fonction parente. C&apos;est ainsi que fonctionnent les états React (<code className="font-mono">useState</code>) ou les fonctions créatrices de callbacks !
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-100 text-indigo-800 font-mono font-bold">Global</span>
              <strong className="text-slate-950 text-sm">Portée Globale (Window)</strong>
            </div>
            <p className="text-slate-700 font-medium">
              Tout ce qui est accessible depuis n&apos;importe où dans l&apos;application : <code className="font-mono">window</code>, <code className="font-mono">document</code>, <code className="font-mono">localStorage</code> et vos fonctions globales.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Le panneau Watch */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Surveiller des expressions sur mesure avec le panneau Watch
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Le panneau Scope a un défaut : il affiche des dizaines de variables d&apos;un coup. Si vous voulez garder l&apos;œil sur un calcul précis, le panneau <strong>Watch</strong> est votre meilleur allié.
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image31.jpeg"
            alt="Panneau Watch dans Chrome DevTools surveillant des expressions"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.7.2 — Panneau Watch : surveillance en direct d&apos;expressions arbitraires recalculées à chaque pas d&apos;exécution.
          </div>
        </div>

        <Callout type="tip" title="Que peut-on mettre dans le panneau Watch ?">
          <p className="text-sm leading-relaxed">
            Vous ne devez pas vous contenter d&apos;y mettre un nom de variable comme <code className="font-mono">user</code> ! Vous pouvez taper des <strong>expressions complètes</strong> :<br />
            • <code className="font-mono text-emerald-700">cart.items.length &gt; 0</code> (Vérifier si le panier est non-vide)<br />
            • <code className="font-mono text-emerald-700">user.roles.includes(&apos;admin&apos;)</code> (Vérifier les permissions)<br />
            • <code className="font-mono text-emerald-700">totalHT * 1.20</code> (Calculer le prix TTC à la volée)<br />
            À chaque fois que vous avancez d&apos;une ligne (<kbd className="bg-white px-1 border rounded">F10</kbd>), DevTools réévalue automatiquement toutes vos formules Watch !
          </p>
        </Callout>
      </section>

      {/* 4. Évaluation dynamique et inline evaluation */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Évaluation dynamique dans la console &amp; Inline Values
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsque vous êtes arrêté sur un breakpoint, <strong>la console DevTools est connectée au scope interne de la fonction figée</strong>. C&apos;est magique : vous pouvez exécuter des filtres ou des méthodes de test exactement comme si vous aviez écrit le code à cet endroit :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image30.jpeg"
            alt="Évaluation de this.props et filtres JavaScript dans la console du débogueur"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.7.3 — Évaluation dynamique dans la Console : test de conditions et inspection d&apos;objets d&apos;état sans modifier les fichiers.
          </div>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image32.jpeg"
            alt="Inline evaluation dans l'éditeur montrant la valeur des variables à côté du code"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.7.4 — Inline Evaluation : Chrome DevTools incruste directement la valeur calculée en texte grisé à côté de chaque variable.
          </div>
        </div>

        <Callout type="warning" title="Attention aux effets de bord (Mutations accidentelles)">
          <p className="text-sm leading-relaxed">
            Lorsque vous évaluez du code dans la console ou dans Watch, vous manipulez la <strong>vraie mémoire vive</strong> de votre application !
            Si vous tapez par curiosité <code className="font-mono text-rose-700">cart.items.pop()</code> pour voir le dernier article, <strong>vous venez de supprimer définitivement cet article du panier</strong> ! Préférez toujours des lectures pures (<code className="font-mono text-emerald-700">cart.items.at(-1)</code>) pour ne pas fausser le reste de votre session de débogage.
          </p>
        </Callout>
      </section>

      {/* 5. Simulateur interactif Scope & Watch */}
      <section className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>Laboratoire Interactif</span>
          </div>
          <h2 className="text-[22px] font-black text-slate-950 tracking-tight">
            5. Simulateur interactif : Explorez le Scope et les expressions Watch
          </h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Voici une fonction avec une fermeture (closure). Ajustez les valeurs à chaud et observez comment le panneau Scope et les calculs Watch se recalculent instantanément :
          </p>
        </div>

        {/* Code representation */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-700">Code suspendu au point d&apos;arrêt (Ligne 7) :</span>
          <CodeBlock
            language="javascript"
            code={`function createDiscountCalculator(baseDiscount) {
  // 🔒 baseDiscount vit dans la CLOSURE
  return function calculateFinalPrice(itemPrice) {
    // 📍 Point d'arrêt actif ici !
    const finalPrice = itemPrice * (1 - baseDiscount);
    const isVip = finalPrice >= 1500;
    return { finalPrice, isVip };
  };
}`}
          />
        </div>

        {/* Interactive Workspace */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-6 shadow-sm">
          {/* Controls to mutate variables live */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">
                Modifier <code className="font-mono text-emerald-700">itemPrice</code> (Scope Local) : {itemPrice} €
              </label>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={itemPrice}
                onChange={(e) => setItemPrice(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">
                Modifier <code className="font-mono text-amber-700">baseDiscount</code> (Scope Closure) : {(baseDiscount * 100).toFixed(0)} %
              </label>
              <input
                type="range"
                min="0.05"
                max="0.50"
                step="0.05"
                value={baseDiscount}
                onChange={(e) => setBaseDiscount(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          {/* Scope & Watch Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Panel 1: Scope */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                  <Icon name="search" className="w-4 h-4 text-emerald-600" />
                  <span>Panneau Scope (Portées Lexicales)</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Auto-détecté</span>
              </div>

              {/* Scope Tabs */}
              <div className="flex gap-2 text-xs font-bold">
                <button
                  onClick={() => setActiveScopeTab('local')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeScopeTab === 'local' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Local
                </button>
                <button
                  onClick={() => setActiveScopeTab('closure')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeScopeTab === 'closure' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Closure
                </button>
                <button
                  onClick={() => setActiveScopeTab('global')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeScopeTab === 'global' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Global
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs space-y-1.5 min-h-[120px]">
                {activeScopeTab === 'local' && (
                  <div>
                    <div className="text-slate-400">▼ Local (calculateFinalPrice)</div>
                    <div className="pl-4 text-emerald-300">itemPrice: {itemPrice}</div>
                    <div className="pl-4 text-cyan-300">finalPrice: {calculatedFinalPrice.toFixed(2)}</div>
                    <div className="pl-4 text-purple-300">isVip: {isVipThreshold ? 'true' : 'false'}</div>
                  </div>
                )}
                {activeScopeTab === 'closure' && (
                  <div>
                    <div className="text-slate-400">▼ Closure (createDiscountCalculator)</div>
                    <div className="pl-4 text-amber-300">baseDiscount: {baseDiscount} ({(baseDiscount * 100).toFixed(0)}%)</div>
                    <div className="text-[11px] text-slate-500 pl-4 mt-2">
                      💡 Mémorisée en mémoire même après la fin de la fonction créatrice.
                    </div>
                  </div>
                )}
                {activeScopeTab === 'global' && (
                  <div>
                    <div className="text-slate-400">▼ Global (Window)</div>
                    <div className="pl-4 text-slate-300">window: Window</div>
                    <div className="pl-4 text-slate-300">document: #document</div>
                    <div className="pl-4 text-slate-300">navigator: Navigator</div>
                  </div>
                )}
              </div>
            </div>

            {/* Panel 2: Watch Expressions */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                  <Icon name="eye" className="w-4 h-4 text-indigo-600" />
                  <span>Panneau Watch (Expressions Personnalisées)</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Temps Réel</span>
              </div>

              {/* Watch expression preset selector */}
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                <button
                  onClick={() => setCustomWatchExpr('itemPrice * (1 - baseDiscount)')}
                  className={`px-2 py-0.5 rounded border transition-colors ${
                    customWatchExpr === 'itemPrice * (1 - baseDiscount)'
                      ? 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Calcul TVA / Remise
                </button>
                <button
                  onClick={() => setCustomWatchExpr('itemPrice >= 1500')}
                  className={`px-2 py-0.5 rounded border transition-colors ${
                    customWatchExpr === 'itemPrice >= 1500'
                      ? 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Condition seuil VIP
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs space-y-2 min-h-[125px]">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                  <span className="text-slate-400">{customWatchExpr} :</span>
                  <span className="text-emerald-400 font-bold">
                    {customWatchExpr.includes('>=')
                      ? (itemPrice >= 1500 ? 'true' : 'false')
                      : `${calculatedFinalPrice.toFixed(2)} €`}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                  <span className="text-slate-400">isVipThreshold :</span>
                  <span className={`font-bold ${isVipThreshold ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isVipThreshold ? 'true (Client VIP)' : 'false (Client Standard)'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">itemPrice &gt; 0 &amp;&amp; baseDiscount &lt; 1 :</span>
                  <span className="text-cyan-400 font-bold">true (Contrat valide)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 font-medium">
                💡 Déplacez les curseurs ci-dessus : ces expressions Watch se recalculent instantanément sans aucune frappe de clavier !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>6. Quiz de validation — Chapitre 7</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel panneau de Chrome DevTools classe automatiquement les variables selon leur portée (Local, Closure, Global) ?",
              options: [
                "Network",
                "Elements",
                "Scope",
                "Application"
              ],
              correctIndex: 2,
              explanation: "Le panneau Scope affiche la hiérarchie des variables accessibles au moment précis du point d'arrêt."
            },
            {
              id: 2,
              question: "Que représente la catégorie 'Closure' dans le panneau Scope ?",
              options: [
                "Des variables supprimées de la mémoire",
                "Des variables provenant d'une fonction parente englobante mémorisées par la fonction courante",
                "Des variables réservées aux balises HTML",
                "Des cookies expirés"
              ],
              correctIndex: 1,
              explanation: "Une closure est une fermeture lexicale : la fonction enfant retient l'accès aux variables de sa fonction créatrice."
            },
            {
              id: 3,
              question: "Quelle est la principale force du panneau Watch par rapport au panneau Scope ?",
              options: [
                "Il permet de surveiller des expressions calculées complexes personnalisées (ex: cart.total * 1.20) qui se mettent à jour à chaque pas",
                "Il empêche l'apparition des erreurs 404",
                "Il compresse automatiquement le code JavaScript",
                "Il supprime les variables inutilisées"
              ],
              correctIndex: 0,
              explanation: "Watch permet d'enregistrer n'importe quelle expression JavaScript arbitraire et de voir son résultat recalculé en continu."
            },
            {
              id: 4,
              question: "Lorsque l'exécution est suspendue sur un breakpoint, quel est le contexte d'évaluation de la Console ?",
              options: [
                "Uniquement l'objet global window",
                "Le contexte temporel et la portée locale de la fonction exactement à la ligne du breakpoint",
                "Un bac à sable isolé qui ne connaît aucune variable",
                "Le terminal de compilation Webpack"
              ],
              correctIndex: 1,
              explanation: "La console s'exécute dans le cadre d'appel actif. Vous pouvez donc interroger directement les variables locales de la fonction."
            },
            {
              id: 5,
              question: "Quel risque court-on en évaluant une expression comme 'user.orders.pop()' dans la console lors d'un débogage ?",
              options: [
                "Aucun, c'est purement virtuel",
                "Cela modifie réellement l'état en mémoire vive (effet de bord) et peut fausser la suite du diagnostic",
                "Cela détruit les fichiers sources du projet",
                "Cela ferme l'onglet DevTools"
              ],
              correctIndex: 1,
              explanation: "L'évaluation dans la console manipule la vraie mémoire vive. Les méthodes mutatives (.pop(), .splice(), etc.) créent de vrais effets de bord."
            },
            {
              id: 6,
              question: "Que désigne la fonctionnalité 'Inline values' (ou Inline Evaluation) dans DevTools et VS Code ?",
              options: [
                "L'affichage de la valeur des variables directement incrustée à la fin de chaque ligne de code dans l'éditeur",
                "La compression du code CSS",
                "La détection automatique des balises HTML",
                "L'envoi des logs par email"
              ],
              correctIndex: 0,
              explanation: "Les inline values affichent en texte fantôme grisé la valeur courante de chaque variable directement à côté de son instruction."
            }
          ]}
        />
      </section>
    </div>
  );
};
