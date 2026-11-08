'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Inspection approfondie des variables et expressions
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
            <span>Comprendre les valeurs des variables locales, de bloc et globales.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Développer les objets complexes et les tableaux imbriqués.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser le panneau Scope et configurer des surveillances dans Watch.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Évaluer des expressions de test dans la console sans modifier le code.</span>
          </li>
        </ul>
      </section>

      {/* 2. Le panneau Scope */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comprendre les portées dans le panneau Scope
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsqu&apos;une interruption se produit, le volet Scope catégorise toutes les variables disponibles selon leur portée lexicale :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image29.jpeg"
            alt="Panneau Scope affichant les portées Local, Closure et Global"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.7.1 — Panneau Scope : distinction entre la portée locale (Local), les fermetures (Closure) et la portée globale (Global).
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-950 block">Local</strong>
            <p className="text-slate-700 text-xs mt-1">Variables déclarées dans la fonction active et paramètres reçus.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-950 block">Closure</strong>
            <p className="text-slate-700 text-xs mt-1">Variables mémorisées provenant d&apos;une fonction parente englobante.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-950 block">Global (Window)</strong>
            <p className="text-slate-700 text-xs mt-1">Objets globaux accessibles partout (<code className="font-mono">window</code>, <code className="font-mono">document</code>, etc.).</p>
          </div>
        </div>
      </section>

      {/* 3. Le panneau Watch */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Surveiller des expressions ciblées avec Watch
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Alors que le panneau Scope affiche toutes les variables (ce qui peut être verbeux), le panneau <strong>Watch</strong> vous permet de composer vos propres expressions personnalisées à recalculer à chaque pas d&apos;exécution :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image31.jpeg"
            alt="Panneau Watch dans Chrome DevTools surveillant des expressions"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.7.2 — Panneau Watch : surveillance en direct de variables et calculs intermédiaires.
          </div>
        </div>
      </section>

      {/* 4. Évaluation interactive */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Évaluation dynamique et inline evaluation
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Pendant qu&apos;un breakpoint est actif, la console DevTools s&apos;exécute <strong>dans le contexte temporel de la fonction figée</strong>. Vous pouvez taper n&apos;importe quelle expression JavaScript pour tester vos correctifs :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image30.jpeg"
            alt="Évaluation de this.props et filtres JavaScript dans la console du débogueur"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.7.3 — Évaluation dynamique : test de filtres sur les objets d&apos;état sans modifier les fichiers.
          </div>
        </div>

        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image32.jpeg"
            alt="Inline evaluation dans l'éditeur montrant la valeur des variables à côté du code"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.7.4 — Inline Evaluation : Chrome DevTools affiche directement la valeur calculée à côté de la ligne de code.
          </div>
        </div>
        <Callout type="warning" title="Mise en garde sur les effets de bord">
          Attention : évaluer une expression qui modifie l&apos;état (<code className="font-mono">user.role = &apos;admin&apos;</code> ou <code className="font-mono">cart.items.pop()</code>) altère réellement la mémoire de l&apos;application en cours et risque de fausser votre diagnostic !
        </Callout>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.7
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel panneau de Chrome DevTools affiche l'ensemble des variables accessibles dans le contexte courant ?",
              options: [
                "Network",
                "Elements",
                "Scope",
                "Application"
              ],
              correctIndex: 2,
              explanation: "Le panneau Scope classe toutes les variables disponibles au point d'arrêt (Local, Closure, Global)."
            },
            {
              id: 2,
              question: "Quelle est la fonction première du panneau Watch ?",
              options: [
                "Surveiller en continu des expressions ou variables choisies par le développeur",
                "Afficher uniquement les erreurs HTTP 404",
                "Modifier le code HTML du DOM",
                "Supprimer automatiquement les breakpoints"
              ],
              correctIndex: 0,
              explanation: "Watch permet d'enregistrer des expressions arbitraires (ex: price * quantity) et d'observer leur recalcul à chaque étape."
            },
            {
              id: 3,
              question: "Que permet l'évaluation d'une instruction dans la Console pendant qu'un breakpoint est suspendu ?",
              options: [
                "Tester du code et inspecter des objets directement dans le scope et l'état de la fonction suspendue",
                "Redémarrer immédiatement le serveur Node.js",
                "Supprimer toutes les variables globales",
                "Modifier définitivement le fichier CSS du projet"
              ],
              correctIndex: 0,
              explanation: "Pendant une pause du débogueur, la console hérite du scope local de la ligne courante, permettant d'interroger toutes les variables locales."
            },
            {
              id: 4,
              question: "Une variable d'un paramètre contient une valeur inattendue dans une fonction. Où faut-il enquêter ?",
              options: [
                "Uniquement dans le fichier CSS",
                "Dans la fonction appelante pour vérifier les arguments transmis lors de l'appel",
                "Dans les cookies du navigateur",
                "Dans le fichier package.json"
              ],
              correctIndex: 1,
              explanation: "Si un paramètre est erroné dès l'entrée de la fonction, le problème se situe en amont, lors de la transmission des arguments par la fonction appelante."
            }
          ]}
        />
      </section>
    </div>
  );
};
