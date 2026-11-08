'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Comprendre la Call Stack (pile d&apos;appels)
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
            <span>Comprendre le principe fondamental LIFO de la pile d&apos;appels JavaScript.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Naviguer entre les différents Stack Frames dans Chrome DevTools.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre la Call Stack dans les fonctions asynchrones (async/await).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Diagnostiquer et corriger les récursions infinies (RangeError: Maximum call stack size).</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que la Call Stack */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que la Call Stack et le principe LIFO ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          La <strong>Call Stack</strong> (pile d&apos;appels) est la structure de données interne utilisée par le moteur JavaScript (V8) pour enregistrer les contextes d&apos;exécution actifs des fonctions.
        </p>
        <p className="text-base text-slate-800 font-medium">
          Elle fonctionne selon le principe <strong>LIFO (Last In, First Out)</strong> : la dernière fonction appelée est placée au sommet de la pile et doit obligatoirement terminer son exécution pour que la fonction appelante puisse reprendre son cours.
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image33.jpeg"
            alt="Panneau Call Stack dans Chrome DevTools montrant la cascade d'appels"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.8.1 — Panneau Call Stack dans DevTools : fonction courante en haut, appelants en dessous.
          </div>
        </div>
      </section>

      {/* 3. Stack Frames */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Explorer les Stack Frames dans le débogueur
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Chaque ligne affichée dans la Call Stack est un <strong>Stack Frame</strong> (cadre de pile). En cliquant sur un niveau inférieur dans la pile, le débogueur transporte instantanément l&apos;inspecteur Scope dans le contexte de cette fonction appelante :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image34.jpeg"
            alt="Navigation entre stack frames dans la Call Stack"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.8.2 — Navigation dans les Stack Frames : getName() &gt; printName() &gt; setTimeout callback.
          </div>
        </div>
      </section>

      {/* 4. Call Stack Asynchrone */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La Call Stack face au code asynchrone (async/await)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dans une application moderne avec <code className="font-mono text-emerald-700">async/await</code> ou des timers, la pile d&apos;exécution synchrone se vide dès qu&apos;une Promise est mise en attente. Chrome DevTools intègre l&apos;option <strong>Async Stack Traces</strong> pour reconstruire virtuellement la chaîne d&apos;appels à travers la boucle d&apos;événements :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image35.jpeg"
            alt="Suivi de la Call Stack asynchrone avec async await dans Chrome DevTools"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.8.3 — Call Stack asynchrone : liaison entre foo(), bar() et le point d&apos;attente await in bar (async).
          </div>
        </div>
      </section>

      {/* 5. Récursion infinie et RangeError */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Dépassement de capacité : RangeError: Maximum call stack size exceeded
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsqu&apos;une fonction s&apos;appelle elle-même sans condition d&apos;arrêt (ou avec une condition impossible à atteindre), des dizaines de milliers de contextes s&apos;accumulent jusqu&apos;à saturer la mémoire allouée à la pile :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image36.jpeg"
            alt="Erreur RangeError Maximum call stack size exceeded avec appels récursifs en boucle"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.8.4 — Crash critique RangeError : répétition infinie de la fonction fun_first dans la pile d&apos;appels.
          </div>
        </div>
        <Callout type="tip" title="Démarche de correction">
          Dès qu&apos;un crash <code className="font-mono">Maximum call stack size</code> apparaît, inspectez la Stack Trace : repérez la fonction qui se répète en boucle et vérifiez impérativement la condition de base (clause de sortie de la récursion).
        </Callout>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.8
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel principe de structure de données régit le fonctionnement de la Call Stack ?",
              options: [
                "FIFO (First In, First Out)",
                "LIFO (Last In, First Out)",
                "DNS Lookup",
                "Round Robin"
              ],
              correctIndex: 1,
              explanation: "La Call Stack fonctionne en LIFO : la dernière fonction appelée est empilée au sommet et est la première à se dépiler lorsqu'elle retourne."
            },
            {
              id: 2,
              question: "Que représente un 'Stack Frame' dans le volet Call Stack de Chrome DevTools ?",
              options: [
                "Une image PNG intégrée au document",
                "Un niveau d'invocation de fonction active avec son propre environnement de variables",
                "Une requête SQL vers la base de données",
                "Un composant React non rendu"
              ],
              correctIndex: 1,
              explanation: "Chaque entrée de la pile est un Stack Frame contenant le contexte d'exécution de la fonction au moment de l'appel."
            },
            {
              id: 3,
              question: "Quelle anomalie logicielle provoque l'erreur 'RangeError: Maximum call stack size exceeded' ?",
              options: [
                "Une base de données MySQL inaccessible",
                "Une récursion infinie ou deux fonctions qui s'appellent mutuellement sans condition d'arrêt",
                "Une image trop volumineuse téléchargée via HTTP",
                "Un mot de passe trop court"
              ],
              correctIndex: 1,
              explanation: "Une fonction qui s'appelle sans fin empile indéfiniment de nouveaux contextes jusqu'à saturer la limite matérielle de la pile V8."
            },
            {
              id: 4,
              question: "Sélectionner un Stack Frame antérieur dans la Call Stack permet de :",
              options: [
                "Exécuter à nouveau la fonction en arrière",
                "Examiner les variables et le contexte local de la fonction appelante sans modifier le code",
                "Supprimer la fonction de la mémoire",
                "Fermer l'onglet DevTools"
              ],
              correctIndex: 1,
              explanation: "Cliquer sur un cadre inférieur permet de remonter dans le temps logique et d'inspecter l'état des variables de la fonction qui a provoqué l'appel."
            }
          ]}
        />
      </section>
    </div>
  );
};
