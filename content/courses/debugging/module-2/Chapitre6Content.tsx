'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type BreakpointMode = 'standard' | 'conditional' | 'logpoint';

export const Chapitre6Content: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<BreakpointMode>('conditional');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const loopItems = [
    { id: 1, name: 'Clavier', price: 120, discount: 0, status: 'OK' },
    { id: 2, name: 'Souris', price: 60, discount: 0, status: 'OK' },
    { id: 482, name: 'Écran 4K Ultra', price: 500, discount: -150, status: 'BUG: PRIX NÉGATIF' },
    { id: 483, name: 'Casque Audio', price: 90, discount: 10, status: 'OK' },
  ];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Boîte à Outils Fondamentale</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Débogage avec les Breakpoints (points d&apos;arrêt)
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi continuer à modifier votre code avec des dizaines de <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">console.log()</code> quand vous pouvez figer le temps d&apos;un simple clic ? Découvrez la puissance des points d&apos;arrêt (breakpoints), des conditions de déclenchement, des logpoints sans interruption et de l&apos;instruction native <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">debugger;</code>.
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
              <strong className="text-slate-950 block">Le gel temporel du moteur V8 :</strong>
              <span>Comprendre ce qui se passe quand le moteur JavaScript suspend son exécution juste avant une ligne critique.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Les 3 variantes de Breakpoints :</strong>
              <span>Maîtriser le point classique, le point conditionnel (<code className="font-mono">Conditional</code>) et le point d&apos;observation sans arrêt (<code className="font-mono">Logpoint</code>).</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">La télécommande de navigation :</strong>
              <span>Piloter l&apos;exécution pas à pas avec Resume (F8), Step Over (F10), Step Into (F11) et Step Out (Shift+F11).</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Instruction debugger &amp; Node.js :</strong>
              <span>Déboguer un serveur backend avec <code className="font-mono">debugger;</code> et le flag <code className="font-mono">node --inspect</code> dans Chrome.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Qu'est-ce qu'un breakpoint */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Qu&apos;est-ce qu&apos;un point d&apos;arrêt (Breakpoint) ?
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Imaginez que vous regardiez un film à suspense et que vous appuyiez sur la touche <strong>Pause</strong> de votre télécommande. Les acteurs se figent au milieu de leur geste, mais rien n&apos;est détruit : vous pouvez vous approcher de l&apos;écran, examiner les détails du décor, compter les objets sur la table, puis appuyer sur <strong>Play</strong> pour reprendre le film là où il en était.
        </p>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Un <strong>point d&apos;arrêt (Breakpoint)</strong> est exactement cette touche pause pour votre code. Il ordonne au moteur JavaScript de stopper net le fil d&apos;exécution juste <strong>avant</strong> d&apos;exécuter l&apos;instruction ciblée.
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image22.jpeg"
            alt="Point d'arrêt sur une ligne de code dans Chrome DevTools"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.6.1 — Ligne surlignée en bleu : le moteur est suspendu à la ligne 32 avant son évaluation. La valeur des variables est visible au survol.
          </div>
        </div>

        <Callout type="tip" title="Le super-pouvoir du survol (Hover)">
          <p className="text-sm leading-relaxed">
            Lorsque l&apos;exécution est en pause sur un breakpoint, vous n&apos;avez même pas besoin d&apos;ouvrir la console : <strong>survolez n&apos;importe quelle variable avec le curseur de votre souris</strong> directement dans votre code source ! Une infobulle interactive s&apos;ouvre pour vous révéler sa valeur exacte à cet instant précis.
          </p>
        </Callout>
      </section>

      {/* 3. Typologie des points d'arrêt */}
      <section className="space-y-6">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Typologie des 3 points d&apos;arrêt dans Chrome DevTools
        </h2>

        {/* 3.1 Point conditionnel */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span>3.1. Le point d&apos;arrêt conditionnel (Conditional Breakpoint)</span>
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Imaginez une boucle qui traite <strong>5 000 articles</strong>. Si vous posez un breakpoint classique, le navigateur va s&apos;arrêter 5 000 fois ! Vous devrez appuyer 5 000 fois sur Play pour trouver l&apos;article qui pose problème.
          </p>
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs text-amber-950 font-medium">
            💡 <strong>La métaphore du radar automatique :</strong> un radar routier ne verbalise pas toutes les voitures qui passent. Il ne flashe <strong>QUE</strong> si la vitesse dépasse 130 km/h. Le point d&apos;arrêt conditionnel fait exactement pareil : il ne suspend le code que si votre condition est vraie (<code className="font-mono text-rose-700 font-bold">item.discount &lt; 0</code> ou <code className="font-mono text-rose-700 font-bold">user.id === 482</code>).
          </div>

          <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image23.jpeg"
              alt="Menu contextuel pour ajouter un Conditional Breakpoint dans DevTools"
              width={1000}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.6.2 — Clic droit sur le numéro de ligne &gt; &quot;Add conditional breakpoint...&quot; pour saisir une expression booléenne.
            </div>
          </div>
        </div>

        {/* 3.2 Logpoints */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
            <span>3.2. Le point d&apos;observation sans arrêt (Logpoint)</span>
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Vous voulez savoir combien vaut une variable à chaque passage, mais vous n&apos;avez <strong>pas envie de figer l&apos;écran</strong> et vous avez la flemme d&apos;ajouter un <code className="font-mono">console.log()</code> dans vos fichiers sources ?
            Le <strong>Logpoint</strong> est fait pour vous : il imprime le message dans la console au passage, <strong>sans jamais interrompre l&apos;application</strong>.
          </p>

          <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image24.jpeg"
              alt="Configuration d'un Logpoint dans Chrome DevTools"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.6.3 — Logpoint configuré (losange orange) : expression <code className="text-xs">&apos;num is &apos; + num</code> affichée en console à la volée.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Manipulation pratique en 4 étapes */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Placer et gérer ses Breakpoints pas à pas (Figures 2.6.4 à 2.6.7)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <strong className="text-xs text-slate-900 font-bold block">1. Ouvrir le script dans l&apos;arborescence Sources</strong>
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image25.jpeg"
                alt="Panneau Sources avec structure de fichiers"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">Naviguez dans l&apos;arborescence ou tapez <kbd className="bg-white px-1 border rounded">Ctrl+P</kbd> pour ouvrir le fichier.</p>
          </div>

          <div className="space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <strong className="text-xs text-slate-900 font-bold block">2. Cliquer sur la marge gauche pour poser le marqueur</strong>
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image26.jpeg"
                alt="Clic sur le numéro de ligne pour poser un breakpoint bleu"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">Un clic gauche dépose un marqueur bleu sur le numéro de ligne souhaité.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <strong className="text-xs text-slate-900 font-bold block">3. Déclencher l&apos;action : l&apos;interpréteur est figé</strong>
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image27.jpeg"
                alt="Bannière d'alerte Paused on breakpoint"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">L&apos;écran s&apos;assombrit avec le bandeau &quot;Paused on breakpoint&quot; en attente de vos ordres.</p>
          </div>

          <div className="space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <strong className="text-xs text-slate-900 font-bold block">4. Gérer la liste dans le volet Breakpoints</strong>
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image28.jpeg"
                alt="Menu de gestion de tous les breakpoints"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">Cochez/décochez les points d&apos;arrêt sans les supprimer, ou désactivez-les tous d&apos;un clic.</p>
          </div>
        </div>
      </section>

      {/* 5. Instruction debugger dans Node.js */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. L&apos;instruction native <code className="font-mono text-emerald-700">debugger;</code> et Node.js
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Saviez-vous que JavaScript dispose d&apos;une instruction intégrée à la grammaire officielle du langage ? 
          Le mot-clé <code className="font-mono text-emerald-700 font-bold">debugger;</code> agit comme un point d&apos;arrêt codé directement en dur :
        </p>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-700">Exemple d&apos;utilisation avec debugger :</span>
          <CodeBlock
            language="javascript"
            code={`function calculateOrder(price, quantity) {
  const subtotal = price * quantity;
  
  // 🛑 Si un débogueur (Chrome DevTools ou VS Code) est attaché,
  // l'exécution se fige AUTOMATIQUEMENT sur cette ligne !
  debugger; 
  
  const tax = subtotal * 0.20;
  return subtotal + tax;
}`}
          />
        </div>

        <Callout type="tip" title="Déboguer du Node.js backend dans Chrome DevTools">
          <p className="text-sm leading-relaxed">
            Pour déboguer une API Express exécutée sur votre terminal serveur, lancez-la avec le flag d&apos;inspection :<br />
            <code className="font-mono bg-white px-2 py-0.5 rounded border text-emerald-800 font-bold">node --inspect app.js</code><br />
            Ouvrez ensuite Google Chrome et tapez dans la barre d&apos;URL : <code className="font-mono text-indigo-700">chrome://inspect</code>. 
            Votre serveur Node.js apparaît sous &quot;Remote Target&quot; : cliquez sur <strong>inspect</strong> pour déboguer votre backend exactement comme du code frontend !
          </p>
        </Callout>
      </section>

      {/* 6. Simulateur interactif Breakpoint Lab */}
      <section className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>Atelier Pratique Interactif</span>
          </div>
          <h2 className="text-[22px] font-black text-slate-950 tracking-tight">
            6. Simulateur interactif : Expérimentez le gel temporel
          </h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Imaginez que vous parcourez une base de 1 000 commandes. L&apos;une d&apos;entre elles génère un bug car sa remise est négative. Testez les différentes stratégies de points d&apos;arrêt :
          </p>
        </div>

        {/* Buttons selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedMode('standard');
              setCurrentStep(0);
              setIsPaused(true);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMode === 'standard'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1. Breakpoint Classique (Arrêt immédiat au tour 1)
          </button>

          <button
            onClick={() => {
              setSelectedMode('conditional');
              setCurrentStep(2); // Direct to bug #482
              setIsPaused(true);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMode === 'conditional'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            2. Conditional Breakpoint (Saute direct au bug #482)
          </button>

          <button
            onClick={() => {
              setSelectedMode('logpoint');
              setIsPaused(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMode === 'logpoint'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            3. Logpoint (Zéro pause, affiche en console)
          </button>
        </div>

        {/* Interactive Inspection Workspace */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-6 shadow-sm">
          {/* Top Remote Control Toolbar */}
          <div className="flex flex-wrap items-center justify-between p-3 rounded-2xl bg-slate-900 text-white text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isPaused ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
              <span className="font-bold">
                {isPaused ? 'PAUSED ON BREAKPOINT' : 'RUNNING (CONTINU)'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold"
                title="Resume (F8)"
              >
                ▶ F8 (Resume)
              </button>
              <button
                onClick={() => setCurrentStep((prev) => (prev + 1) % loopItems.length)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold"
                title="Step Over (F10)"
              >
                ↷ F10 (Step Over)
              </button>
            </div>
          </div>

          {/* Mode 1 & 2 View : Paused Code with Scope Inspector */}
          {selectedMode !== 'logpoint' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Code viewer */}
              <div className="lg:col-span-2 rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-300 space-y-1 border border-slate-800">
                <div className="text-slate-500 mb-2">{'// pricingEngine.js'}</div>
                <div>1 | for (const item of orderItems) &#123;</div>
                <div
                  className={`py-1 px-2 rounded flex items-center justify-between ${
                    isPaused ? 'bg-indigo-950/80 border-l-4 border-amber-400 text-white font-bold' : ''
                  }`}
                >
                  <span>2 | &nbsp;&nbsp;const finalPrice = item.price + item.discount;</span>
                  {selectedMode === 'conditional' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-800 text-amber-200">
                      Condition : item.discount &lt; 0
                    </span>
                  )}
                </div>
                <div>3 | &nbsp;&nbsp;enregistrerFacture(item.id, finalPrice);</div>
                <div>4 | &#125;</div>
              </div>

              {/* Scope Panel (Variables in memory) */}
              <div className="rounded-2xl bg-slate-50 border border-slate-300 p-4 space-y-3 text-xs">
                <div className="font-bold text-slate-950 border-b border-slate-200 pb-2 flex items-center justify-between">
                  <span>Scope (Variables en mémoire)</span>
                  <span className="text-[10px] uppercase font-mono text-slate-500">Local</span>
                </div>
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">item.id:</span>
                    <span className="font-bold text-indigo-700">{loopItems[currentStep].id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">item.name:</span>
                    <span className="font-bold text-slate-900">&quot;{loopItems[currentStep].name}&quot;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">item.price:</span>
                    <span className="font-bold text-slate-900">{loopItems[currentStep].price} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">item.discount:</span>
                    <span className={`font-bold ${
                      loopItems[currentStep].discount < 0 ? 'text-rose-600' : 'text-emerald-700'
                    }`}>
                      {loopItems[currentStep].discount} €
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1.5">
                    <span className="text-slate-500">Statut :</span>
                    <span className={`font-bold text-[11px] ${
                      loopItems[currentStep].discount < 0 ? 'text-rose-600' : 'text-emerald-700'
                    }`}>
                      {loopItems[currentStep].status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mode 3 : Logpoint streaming into console */
            <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 space-y-2 border border-slate-800">
              <div className="text-indigo-400 font-bold border-b border-slate-800 pb-2">
                Console DevTools — Sortie Logpoint en direct (Zéro interruption de l&apos;UI) :
              </div>
              {loopItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-0.5">
                  <span className="text-slate-500">pricingEngine.js:2</span>
                  <span className={item.discount < 0 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                    [Logpoint] Article #{item.id} &quot;{item.name}&quot; : Prix={item.price}€, Remise={item.discount}€
                  </span>
                </div>
              ))}
              <div className="text-emerald-400 text-[11px] pt-2">
                ✓ Les 1 000 articles ont défilé à 100% de la vitesse normale sans aucun blocage !
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>7. Quiz de validation — Chapitre 6</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Que fait le moteur JavaScript lorsqu'il rencontre un point d'arrêt (Breakpoint) actif ?",
              options: [
                "Il supprime automatiquement la variable responsable",
                "Il suspend temporairement l'exécution juste AVANT d'évaluer la ligne spécifiée",
                "Il redémarre la machine virtuelle",
                "Il recharge l'ensemble des fichiers CSS"
              ],
              correctIndex: 1,
              explanation: "Le breakpoint fige l'exécution juste avant la ligne indiquée, permettant d'inspecter l'état de la mémoire et des variables."
            },
            {
              id: 2,
              question: "Quel est l'intérêt fondamental d'un Conditional Breakpoint dans une boucle de 10 000 itérations ?",
              options: [
                "Il convertit le code en langage C pour aller plus vite",
                "Il ne s'arrête QUE si la condition booléenne définie est vraie (évitant 9 999 arrêts inutiles)",
                "Il supprime les données corrompues de la mémoire",
                "Il empêche les fuites mémoires"
              ],
              correctIndex: 1,
              explanation: "Le point conditionnel agit comme un filtre : il laisse passer toutes les itérations normales et ne fige le code que pour le cas anormal recherché."
            },
            {
              id: 3,
              question: "Quelle est la particularité d'un Logpoint par rapport à un Breakpoint classique ?",
              options: [
                "Il n'est utilisable que sous Linux",
                "Il affiche un log dans la console sans JAMAIS suspendre l'exécution du programme",
                "Il modifie le code source sur le disque dur",
                "Il arrête le serveur backend"
              ],
              correctIndex: 1,
              explanation: "Un logpoint permet d'injecter une observation en console à la volée sans modifier les fichiers et sans bloquer l'interface."
            },
            {
              id: 4,
              question: "Quelle commande de navigation permet d'avancer à la ligne suivante SANS entrer à l'intérieur de la fonction appelée ?",
              options: [
                "Step Into (F11)",
                "Step Over (F10)",
                "Step Out (Shift+F11)",
                "Restart (Ctrl+Shift+F5)"
              ],
              correctIndex: 1,
              explanation: "Step Over (F10) exécute la fonction sur la ligne courante d'un seul bloc et s'arrête à la ligne d'après dans la même fonction."
            },
            {
              id: 5,
              question: "Que produit l'instruction native 'debugger;' dans un script JavaScript exécuté avec DevTools ouvert ?",
              options: [
                "Une TypeError fatale",
                "Elle déclenche un point d'arrêt immédiat exactement comme si un breakpoint y avait été cliqué",
                "Elle vide le cache du navigateur",
                "Elle formate le code avec Prettier"
              ],
              correctIndex: 1,
              explanation: "debugger; est un mot-clé officiel qui interrompt l'exécution dès qu'un environnement de débogage est connecté."
            },
            {
              id: 6,
              question: "Comment attacher l'inspecteur Chrome à un processus Node.js exécuté en local ?",
              options: [
                "En renommant le fichier en .html",
                "En lançant le script avec 'node --inspect app.js' puis en ouvrant 'chrome://inspect'",
                "En installant une extension payante",
                "Ce n'est pas possible, Node.js ne peut pas être débogué avec Chrome"
              ],
              correctIndex: 1,
              explanation: "Le flag --inspect expose le protocole WebSocket de débogage V8, accessible dans Chrome via la page spéciale chrome://inspect."
            }
          ]}
        />
      </section>
    </div>
  );
};
