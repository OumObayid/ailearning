'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type StackLevel = 1 | 2 | 3 | 4;

interface FrameInfo {
  level: StackLevel;
  funcName: string;
  file: string;
  line: number;
  description: string;
  variables: Record<string, string>;
}

export const Chapitre8Content: React.FC = () => {
  const [selectedFrame, setSelectedFrame] = useState<StackLevel>(4);

  const stackFrames: Record<StackLevel, FrameInfo> = {
    4: {
      level: 4,
      funcName: 'checkStock(item)',
      file: 'inventoryService.js',
      line: 14,
      description: '📍 Sommet de la pile (Point d\'arrêt actif). La fonction vérifie si le stock disponible suffit.',
      variables: {
        'itemId': '42',
        'requestedQty': '2',
        'currentStock': '0',
        'isAvailable': 'false // ❌ RUPTURE DE STOCK !',
      },
    },
    3: {
      level: 3,
      funcName: 'validateCart(cartItems)',
      file: 'cartValidator.js',
      line: 28,
      description: 'Cadre parent : a appelé checkStock() pour chaque article du panier.',
      variables: {
        'cartItems.length': '1',
        'subtotal': '240.00 €',
        'hasCoupon': 'true',
      },
    },
    2: {
      level: 2,
      funcName: 'handleCheckout(order)',
      file: 'checkoutView.js',
      line: 52,
      description: 'Cadre métier : a orchestré la commande suite au clic de l\'utilisateur.',
      variables: {
        'userId': '"usr_982"',
        'paymentMethod': '"STRIPE_CARD"',
        'orderStatus': '"PROCESSING"',
      },
    },
    1: {
      level: 1,
      funcName: 'HTMLButtonElement.onClick(event)',
      file: 'app.js',
      line: 110,
      description: 'Base de la pile : l\'écouteur d\'événement DOM déclenché par le clic de l\'utilisateur.',
      variables: {
        'target': '<button id="btn-payer">',
        'clientX': '482',
        'clientY': '310',
      },
    },
  };

  const activeFrame = stackFrames[selectedFrame];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="layers" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Boîte à Outils Fondamentale</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 8 — Comprendre la Call Stack (pile d&apos;appels)
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          D&apos;où vient cette fonction ? Qui lui a passé ce paramètre erroné ? La <strong>Call Stack</strong> est la boîte noire chronologique de votre code. Découvrez le fonctionnement du principe LIFO, apprenez à remonter le temps en naviguant dans les Stack Frames, et résolvez le redoutable <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-rose-800">RangeError: Maximum call stack size exceeded</code>.
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
              <strong className="text-slate-950 block">Principe LIFO de la pile :</strong>
              <span>Comprendre l&apos;empilement et le dépilement automatique des contextes d&apos;exécution dans le moteur V8.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Navigation temporelle dans les Stack Frames :</strong>
              <span>Cliquer sur les cadres d&apos;appels antérieurs pour inspecter les variables passées par les fonctions appelantes.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Traces asynchrones (Async Stack Traces) :</strong>
              <span>Reconstruire la chaîne de causalité à travers les Promises, <code className="font-mono">async/await</code> et les timers.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Récursion infinie (Stack Overflow) :</strong>
              <span>Identifier la clause d&apos;arrêt manquante et stopper la saturation mémoire de la pile.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Qu'est-ce que la Call Stack */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Qu&apos;est-ce que la Call Stack et le principe LIFO ?
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Pour comprendre la <strong>Call Stack</strong>, pensez à une pile d&apos;assiettes dans une cafétéria :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-1.5">
            <strong className="text-slate-950 text-sm block">1. L&apos;empilement (Push)</strong>
            <p className="text-xs text-slate-700 font-medium">
              Chaque fois qu&apos;une fonction est appelée, le moteur pose une nouvelle &quot;assiette&quot; (un contexte d&apos;exécution avec ses variables) tout en haut de la pile.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-1.5">
            <strong className="text-slate-950 text-sm block">2. Le principe LIFO</strong>
            <p className="text-xs text-slate-700 font-medium">
              <strong>Last In, First Out</strong> : la dernière assiette posée sur la pile est obligatoirement la première à être retirée.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-1.5">
            <strong className="text-slate-950 text-sm block">3. Le dépilement (Pop)</strong>
            <p className="text-xs text-slate-700 font-medium">
              Dès que la fonction atteint son <code className="font-mono text-emerald-700">return</code> (ou une accolade fermante), son assiette est détruite et le contrôle revient à la fonction du dessous.
            </p>
          </div>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image33.jpeg"
            alt="Panneau Call Stack dans Chrome DevTools montrant la cascade d'appels"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.8.1 — Panneau Call Stack dans Chrome DevTools : la fonction actuellement en cours d&apos;exécution est tout en haut, ses appelants successifs sont empilés en dessous.
          </div>
        </div>
      </section>

      {/* 3. Stack Frames & Voyage dans le temps */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Explorer les Stack Frames : Le voyage dans le temps de la mémoire
        </h2>
        <p className="text-base text-slate-800 font-medium">
          C&apos;est le secret le plus puissant du débogueur : <strong>vous n&apos;êtes pas condamné à n&apos;inspecter que la ligne où le code est arrêté !</strong>
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image34.jpeg"
            alt="Navigation entre stack frames dans la Call Stack"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.8.2 — Navigation dans les Stack Frames : en cliquant sur un cadre inférieur (<code className="text-xs">printName</code>), le débogueur transporte instantanément l&apos;inspecteur Scope dans l&apos;état mémoire de cette fonction parente.
          </div>
        </div>

        <Callout type="tip" title="Comment trouver d'où vient un paramètre undefined ?">
          <p className="text-sm leading-relaxed">
            Votre fonction <code className="font-mono text-slate-900">formatUser(user)</code> crashe parce que <code className="font-mono text-rose-700">user</code> vaut <code className="font-mono text-rose-700">undefined</code> ?<br />
            Ne restez pas figé sur cette ligne ! Cliquez sur la <strong>2ᵉ ligne dans la Call Stack</strong> : DevTools vous ramène immédiatement dans la fonction qui a appelé <code className="font-mono">formatUser</code>. Vous pouvez alors inspecter pourquoi elle lui a envoyé une valeur vide !
          </p>
        </Callout>
      </section>

      {/* 4. Call Stack Asynchrone */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. La Call Stack face au code asynchrone (async/await &amp; Promises)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Historiquement, lorsqu&apos;un callback de <code className="font-mono text-slate-900">setTimeout</code> ou d&apos;un <code className="font-mono text-slate-900">fetch()</code> s&apos;exécutait, la pile synchrone initiale avait déjà disparu depuis longtemps, laissant une trace vide et inutile.
        </p>
        <p className="text-base text-slate-800 font-medium">
          Chrome DevTools intègre la technologie <strong>Async Stack Traces</strong> : il mémorise l&apos;arbre de promesses et affiche une séparation en pointillés montrant quel code avait initialement programmé la promesse :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image35.jpeg"
            alt="Suivi de la Call Stack asynchrone avec async await dans Chrome DevTools"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.8.3 — Call Stack asynchrone : liaison entre <code className="text-xs">foo()</code>, <code className="text-xs">bar()</code> et le point d&apos;attente <code className="text-xs">await in bar (async)</code>.
          </div>
        </div>
      </section>

      {/* 5. Récursion infinie et RangeError */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Dépassement de capacité : RangeError: Maximum call stack size exceeded
        </h2>
        <p className="text-base text-slate-800 font-medium">
          La mémoire allouée à la pile d&apos;appels n&apos;est pas infinie (environ 10 000 à 15 000 cadres dans Chrome). 
          Si une fonction s&apos;appelle elle-même sans condition de sortie, les assiettes s&apos;accumulent jusqu&apos;à faire exploser la pile :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image36.jpeg"
            alt="Erreur RangeError Maximum call stack size exceeded avec appels récursifs en boucle"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.8.4 — Crash critique RangeError : répétition infinie de la fonction <code className="text-xs">fun_first</code> dans la pile d&apos;appels.
          </div>
        </div>

        {/* CodeBlock Avant / Après */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-rose-700">❌ Récursion infinie (Crash V8)</span>
            <CodeBlock
              language="javascript"
              code={`// 💥 Aucune clause d'arrêt :
// S'appelle 10 000 fois jusqu'au crash !
function compteARebours(n) {
  console.log(n);
  return compteARebours(n - 1);
}

compteARebours(5);`}
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-emerald-700">✓ Récursion protégée (Cas de base)</span>
            <CodeBlock
              language="javascript"
              code={`// ✓ Cas de base obligatoire (Base case) :
// Dès que n atteint 0, on dépile proprement !
function compteARebours(n) {
  if (n <= 0) {
    console.log("Terminé !");
    return;
  }
  console.log(n);
  return compteARebours(n - 1);
}

compteARebours(5);`}
            />
          </div>
        </div>
      </section>

      {/* 6. Simulateur interactif Call Stack Navigator */}
      <section className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>Atelier Interactif</span>
          </div>
          <h2 className="text-[22px] font-black text-slate-950 tracking-tight">
            6. Simulateur interactif : Naviguez dans la pile d&apos;appels
          </h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            L&apos;application est arrêtée sur un breakpoint à la ligne 14 de <code className="font-mono text-emerald-700">inventoryService.js</code>. Cliquez sur les différents étages de la pile pour observer le changement instantané de contexte mémoire :
          </p>
        </div>

        {/* Interactive Stack Explorer */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Call Stack list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                  <Icon name="layers" className="w-4 h-4 text-emerald-600" />
                  <span>Call Stack (Cliquez sur un cadre)</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Du sommet vers la base</span>
              </div>

              <div className="space-y-2">
                {([4, 3, 2, 1] as StackLevel[]).map((lvl) => {
                  const frame = stackFrames[lvl];
                  const isSelected = selectedFrame === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setSelectedFrame(lvl)}
                      className={`w-full p-3 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-950 shadow-md'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-mono text-xs font-bold flex items-center gap-2">
                          {lvl === 4 && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                          <span>{frame.funcName}</span>
                        </div>
                        <div className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {frame.file}:{frame.line}
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        Niveau {lvl}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Frame Inspection */}
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-xs uppercase font-mono text-slate-500 font-bold block">
                  Contexte d&apos;exécution actif (Stack Frame {selectedFrame})
                </span>
                <h3 className="font-bold text-slate-950 text-base font-mono mt-1">
                  {activeFrame.funcName}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {activeFrame.description}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 block">
                  Variables locales au moment de l&apos;appel :
                </span>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs space-y-1.5 text-slate-200 shadow-inner">
                  {Object.entries(activeFrame.variables).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-slate-400">{key} :</span>
                      <span className={val.includes('false') ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-slate-600 font-medium">
                💡 Remarquez comment le cadre 3 (<code className="font-mono">validateCart</code>) et le cadre 2 (<code className="font-mono">handleCheckout</code>) ont conservé intactes leurs propres variables pendant que la fonction enfant s&apos;exécute !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>7. Quiz de validation — Chapitre 8</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel principe de structure de données régit le fonctionnement de la Call Stack ?",
              options: [
                "FIFO (First In, First Out)",
                "LIFO (Last In, First Out)",
                "Round Robin",
                "Table de hachage"
              ],
              correctIndex: 1,
              explanation: "La pile d'appels fonctionne selon le principe LIFO : la dernière fonction appelée est posée au sommet de la pile et est la première à terminer."
            },
            {
              id: 2,
              question: "Que se passe-t-il lorsque vous cliquez sur un cadre d'appel inférieur dans le panneau Call Stack ?",
              options: [
                "Le code ré-exécute la fonction depuis le début",
                "Le débogueur transporte l'inspecteur Scope dans l'état mémoire et les variables de cette fonction appelante",
                "Le navigateur recharge la page",
                "La fonction courante est supprimée"
              ],
              correctIndex: 1,
              explanation: "Cliquer sur un stack frame parent permet d'inspecter les variables telles qu'elles étaient au moment où elle a appelé la fonction enfant."
            },
            {
              id: 3,
              question: "Quelle anomalie logicielle déclenche l'erreur 'RangeError: Maximum call stack size exceeded' ?",
              options: [
                "Une image trop lourde chargée en HTTP",
                "Une fonction récursive qui s'appelle indéfiniment sans clause de sortie (cas de base)",
                "Une clé absente dans LocalStorage",
                "Une base de données MySQL saturée"
              ],
              correctIndex: 1,
              explanation: "La pile V8 a une limite matérielle (~10 000 cadres). Une boucle récursive infinie sature la pile et provoque ce dépassement de capacité."
            },
            {
              id: 4,
              question: "À quoi sert la technologie 'Async Stack Traces' de Chrome DevTools ?",
              options: [
                "À accélérer le téléchargement des images",
                "À relier virtuellement les callbacks de Promises (async/await) à la fonction qui avait initié l'appel asynchrone",
                "À crypter les mots de passe",
                "À désactiver le cache du navigateur"
              ],
              correctIndex: 1,
              explanation: "Les traces asynchrones reconstruisent la chaîne de causalité à travers la boucle d'événements (Event Loop) pour ne pas perdre l'origine de l'appel."
            },
            {
              id: 5,
              question: "Une fonction reçoit un argument 'user' valant undefined. Quelle est la méthode professionnelle la plus rapide pour trouver le coupable ?",
              options: [
                "Ajouter 10 console.log dans tous les fichiers du projet",
                "Poser un breakpoint à l'entrée de la fonction et cliquer sur le cadre parent dans la Call Stack pour voir ce que l'appelant lui a transmis",
                "Réinstaller Node.js",
                "Modifier le code CSS"
              ],
              correctIndex: 1,
              explanation: "Remonter d'un niveau dans la Call Stack vous amène directement à l'instruction d'appel chez le parent avec ses variables en mémoire."
            },
            {
              id: 6,
              question: "Que se passe-t-il pour un Stack Frame lorsqu'une fonction atteint l'instruction 'return' ?",
              options: [
                "Il reste en mémoire indéfiniment",
                "Il est dépilé (détruit de la Call Stack) et le fil d'exécution reprend dans la fonction appelante",
                "Il déclenche un événement WebSocket",
                "Il enregistre les données dans un cookie"
              ],
              correctIndex: 1,
              explanation: "Dès que l'exécution d'une fonction se termine, son cadre est dépilé et libéré de la pile, rendant la main à l'appelant."
            }
          ]}
        />
      </section>
    </div>
  );
};
