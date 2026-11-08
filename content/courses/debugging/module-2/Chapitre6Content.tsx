'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Débogage avec les Breakpoints (points d&apos;arrêt)
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
            <span>Suspendre volontairement l&apos;exécution à un endroit précis du code.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Créer des breakpoints classiques, conditionnels et des logpoints.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Gérer, désactiver et réactiver des points d&apos;arrêt dans Sources.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déboguer du code backend avec l&apos;instruction debugger et node --inspect.</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce qu'un breakpoint */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce qu&apos;un point d&apos;arrêt (Breakpoint) ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Un point d&apos;arrêt est une directive envoyée au moteur d&apos;exécution JavaScript pour geler temporairement le thread à une instruction donnée, <strong>avant</strong> son exécution. Cela permet d&apos;observer l&apos;état exact de la mémoire et des variables.
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image22.jpeg"
            alt="Point d'arrêt sur une ligne de code dans Chrome DevTools"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.6.1 — Ligne surlignée en bleu : le moteur est suspendu à la ligne 32 avant son évaluation.
          </div>
        </div>
      </section>

      {/* 3. Types de Breakpoints */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Typologie des points d&apos;arrêt dans Chrome DevTools
        </h2>

        {/* 3.1 Point d'arrêt conditionnel */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            3.1. Le point d&apos;arrêt conditionnel (Conditional Breakpoint)
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Dans une boucle de 10 000 éléments ou un callback fréquent, un breakpoint classique suspendrait l&apos;application des milliers de fois. Le point conditionnel ne fige le code que lorsqu&apos;une expression booléenne s&apos;évalue à <code className="font-mono text-emerald-700">true</code> (ex : <code className="font-mono text-emerald-700">quantity &lt; 0</code> ou <code className="font-mono text-emerald-700">user.id === 42</code>) :
          </p>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image23.jpeg"
              alt="Menu contextuel pour ajouter un Conditional Breakpoint dans DevTools"
              width={1000}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.6.2 — Clic droit sur le numéro de ligne &gt; &quot;Add conditional breakpoint...&quot;.
            </div>
          </div>
        </div>

        {/* 3.2 Logpoints */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            3.2. Le point d&apos;observation (Logpoint)
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Un Logpoint émet un message formaté dans la console sans jamais interrompre l&apos;exécution du programme. Vous pouvez ainsi injecter des logs temporaires dans du code minifié ou en test sans retoucher aux fichiers sources :
          </p>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image24.jpeg"
              alt="Configuration d'un Logpoint dans Chrome DevTools"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.6.3 — Logpoint configuré : expression &apos;num is &apos; + num affichée en console à chaque passage.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Manipulation pratique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Placer et gérer ses Breakpoints pas à pas
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image25.jpeg"
                alt="Panneau Sources avec structure de fichiers"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">1. Ouvrir le script concerné dans l&apos;arborescence Sources.</p>
          </div>
          <div className="space-y-2">
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image26.jpeg"
                alt="Clic sur le numéro de ligne pour poser un breakpoint bleu"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">2. Cliquer sur la marge gauche pour poser le marqueur bleu.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
          <div className="space-y-2">
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image27.jpeg"
                alt="Bannière d'alerte Paused on breakpoint"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">3. Déclencher l&apos;action : l&apos;interpréteur est figé (Paused on breakpoint).</p>
          </div>
          <div className="space-y-2">
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image28.jpeg"
                alt="Menu de gestion de tous les breakpoints"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">4. Gérer la liste dans le volet Breakpoints (Disable, Edit, Remove all).</p>
          </div>
        </div>
      </section>

      {/* 5. Instruction debugger dans Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. L&apos;instruction native <code className="font-mono text-emerald-700">debugger;</code>
        </h2>
        <p className="text-base text-slate-800 font-medium">
          JavaScript dispose d&apos;un mot-clé réservé par la spécification ECMAScript : <code className="font-mono text-emerald-700">debugger;</code>. S&apos;il est rencontré lors de l&apos;exécution avec un débogueur attaché, il agit exactement comme un breakpoint :
        </p>
        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
          <pre className="text-slate-300">{`function calculateOrder(price, quantity) {
  const subtotal = price * quantity;
  
  debugger; // 🛑 Le débogueur VS Code ou Chrome suspend l'exécution ici !
  
  const tax = subtotal * 0.20;
  return subtotal + tax;
}`}</pre>
        </div>
        <Callout type="tip" title="Attacher Chrome à Node.js">
          Démarrez votre script backend avec : <code className="font-mono">node --inspect app.js</code>, puis rendez-vous dans Google Chrome à l&apos;adresse <code className="font-mono">chrome://inspect</code> pour déboguer votre processus Node.js exactement comme une page web !
        </Callout>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.6
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la définition exacte d'un Breakpoint ?",
              options: [
                "Une fonction interne de nettoyage de la mémoire vive",
                "Une directive qui suspend volontairement l'exécution du programme à une ligne précise",
                "Une erreur de syntaxe empêchant la compilation du script",
                "Une balise HTML de saut de ligne"
              ],
              correctIndex: 1,
              explanation: "Un breakpoint fige l'exécution du moteur JavaScript juste avant l'exécution de la ligne indiquée pour inspecter l'état du système."
            },
            {
              id: 2,
              question: "Quel est l'avantage décisif d'un Conditional Breakpoint dans une boucle ?",
              options: [
                "Il accélère la vitesse de calcul du processeur",
                "Il ne suspend le programme que lorsque la condition ciblée est vraie (évite des milliers de pauses inutiles)",
                "Il supprime automatiquement les variables en fin de boucle",
                "Il convertit le code JavaScript en WebAssembly"
              ],
              correctIndex: 1,
              explanation: "Le point d'arrêt conditionnel évalue une expression et n'arrête l'exécution que si la condition est satisfaite."
            },
            {
              id: 3,
              question: "Quelle est la différence fondamentale entre un Breakpoint et un Logpoint ?",
              options: [
                "Ils fonctionnent de manière parfaitement identique",
                "Le Breakpoint suspend le programme, tandis que le Logpoint émet un message en console sans interrompre l'exécution",
                "Le Logpoint est réservé à Python, le Breakpoint à JavaScript",
                "Le Logpoint modifie les données en base SQL"
              ],
              correctIndex: 1,
              explanation: "Un logpoint permet d'afficher des données d'inspection dans la console sans bloquer le déroulement de l'application."
            },
            {
              id: 4,
              question: "Quel raccourci clavier permet de reprendre l'exécution (Resume) après une interruption dans Chrome DevTools ?",
              options: [
                "F1",
                "F5",
                "F8",
                "F12"
              ],
              correctIndex: 2,
              explanation: "La touche F8 (ou le bouton bleu Play) reprend l'exécution jusqu'au prochain point d'arrêt."
            }
          ]}
        />
      </section>
    </div>
  );
};
