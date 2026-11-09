'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type SimulationMode = 'levels' | 'table' | 'group' | 'assert' | 'trace' | 'trap';

export const Chapitre3Content: React.FC = () => {
  const [simulationMode, setSimulationMode] = useState<SimulationMode>('levels');
  const [renderCount, setRenderCount] = useState<number>(1);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Boîte à Outils Fondamentale</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Utilisation avancée de la console JavaScript
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          La grande majorité des développeurs débutants utilisent la console comme un simple mégaphone en criant <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">console.log(&quot;ici&quot;)</code> partout. Découvrez comment la transformer en un véritable laboratoire d&apos;analyse chirurgical : niveaux de sévérité, tables de données, chronométrage, traces d&apos;appels et évitement des pièges d&apos;évaluation paresseuse.
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
              <strong className="text-slate-950 block">Moteur REPL &amp; Contexte d&apos;exécution :</strong>
              <span>Comprendre comment le moteur V8 évalue vos expressions et accède au scope global de la page en direct.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Hiérarchie des 5 niveaux de sévérité :</strong>
              <span>Distinguer <code className="text-slate-900 font-mono">log</code>, <code className="text-blue-700 font-mono">info</code>, <code className="text-amber-700 font-mono">warn</code>, <code className="text-rose-700 font-mono">error</code> et <code className="text-indigo-700 font-mono">assert</code> pour un filtrage efficace.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Méthodes utilitaires avancées :</strong>
              <span>Exploiter <code className="font-mono">table</code>, <code className="font-mono">dir</code>, <code className="font-mono">count</code>, <code className="font-mono">time/timeEnd</code>, et <code className="font-mono">trace</code> pour isoler les anomalies.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Le piège de la mutation asynchrone :</strong>
              <span>Comprendre pourquoi Chrome affiche parfois des données altérées dans un log et comment figer les objets.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Qu'est-ce que la Console JavaScript ? */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Qu&apos;est-ce que la console JavaScript ? (Le REPL vivant)
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          La console n&apos;est pas un simple écran noir où s&apos;imprime du texte statique. C&apos;est un <strong>REPL (Read-Eval-Print Loop)</strong> branché au cœur du moteur JavaScript V8 du navigateur.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl">
            <strong className="text-blue-950 block text-sm font-bold">1. Read</strong>
            <span className="text-slate-600">Lit la ligne tapée ou l&apos;instruction émise par le code.</span>
          </div>
          <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl">
            <strong className="text-indigo-950 block text-sm font-bold">2. Eval</strong>
            <span className="text-slate-600">Évalue l&apos;expression dans la mémoire active de la page.</span>
          </div>
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <strong className="text-emerald-950 block text-sm font-bold">3. Print</strong>
            <span className="text-slate-600">Formate et affiche le résultat avec types et objets dépliables.</span>
          </div>
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl">
            <strong className="text-amber-950 block text-sm font-bold">4. Loop</strong>
            <span className="text-slate-600">Se remet en attente immédiate de la prochaine instruction.</span>
          </div>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image15.jpeg"
            alt="Console DevTools avec exécution interactive d'instructions JavaScript"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.3.1 — Exécution interactive d&apos;instructions dans la Console : évaluation immédiate des variables et affichage des retours.
          </div>
        </div>
      </section>

      {/* 3. Niveaux de sévérité */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Les 5 niveaux de sévérité : Cesser de tout noyer sous console.log()
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsque vous construisez une application professionnelle comptant des dizaines de composants, noyer la console sous 200 lignes de <code className="font-mono text-slate-800 bg-slate-100 px-1 rounded">console.log()</code> rend les véritables alertes totalement invisibles.
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image16.jpeg"
            alt="Différents niveaux de messages dans la console : log, info, debug, warn et error"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.3.2 — Comparaison visuelle des niveaux de logs : console.log, console.info, console.warn (jaune) et console.error (rouge avec pile d&apos;appels).
          </div>
        </div>

        {/* Tableau comparatif des 5 méthodes */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Méthode</th>
                <th className="p-3.5">Apparence visuelle</th>
                <th className="p-3.5">Quand l&apos;utiliser ?</th>
                <th className="p-3.5">Stoppe le code ?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-emerald-700 font-bold">console.log()</td>
                <td className="p-3.5 text-slate-700">Texte standard gris/noir</td>
                <td className="p-3.5 text-xs">Données temporaires de développement courant.</td>
                <td className="p-3.5 text-emerald-700 font-bold text-xs">Non (continue)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-blue-700 font-bold">console.info()</td>
                <td className="p-3.5 text-blue-800">Icône d&apos;information bleue</td>
                <td className="p-3.5 text-xs">Étapes clés d&apos;initialisation (ex: &quot;Connexion WebSocket établie&quot;).</td>
                <td className="p-3.5 text-emerald-700 font-bold text-xs">Non (continue)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-amber-700 font-bold">console.warn()</td>
                <td className="p-3.5 text-amber-900 bg-amber-50/50">Fond jaune d&apos;alerte</td>
                <td className="p-3.5 text-xs">Comportement dégradé mais non fatal (ex: fonction dépréciée, quota à 80%).</td>
                <td className="p-3.5 text-emerald-700 font-bold text-xs">Non (continue)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-rose-700 font-bold">console.error()</td>
                <td className="p-3.5 text-rose-900 bg-rose-50/50">Fond rouge + Stack trace</td>
                <td className="p-3.5 text-xs">Échec critique capturé (ex: rejet de promesse, réponse HTTP 500).</td>
                <td className="p-3.5 text-emerald-700 font-bold text-xs">Non (continue)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-indigo-700 font-bold">console.assert()</td>
                <td className="p-3.5 text-rose-900">Erreur rouge conditionnelle</td>
                <td className="p-3.5 text-xs">S&apos;affiche UNIQUEMENT si la condition transmise est fausse (<code className="font-mono">false</code>).</td>
                <td className="p-3.5 text-emerald-700 font-bold text-xs">Non (continue)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="Distinction fondamentale : console.error() vs throw new Error()">
          <p className="text-sm leading-relaxed">
            Beaucoup de débutants croient que <code className="font-mono">console.error(&quot;Message&quot;)</code> arrête l&apos;application. 
            <strong>C&apos;est faux !</strong> Il ne fait qu&apos;imprimer une boîte rouge dans la console avec la pile d&apos;appels. L&apos;interpréteur JavaScript continue d&apos;exécuter les lignes suivantes. Pour interrompre immédiatement l&apos;exécution d&apos;une fonction en cas de condition inacceptable, vous devez lever une exception avec <code className="font-mono text-rose-700">throw new Error(&quot;Message&quot;)</code>.
          </p>
        </Callout>
      </section>

      {/* 4. Le piège de la mutation asynchrone */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Le piège méconnu des débutants : L&apos;évaluation paresseuse d&apos;objets
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Avez-vous déjà vécu ce cauchemar ? Vous logguez un tableau avec un seul élément, vous le modifiez 10 lignes plus bas, et quand vous dépliez le log dans DevTools, vous voyez déjà les données modifiées !
        </p>

        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-3">
          <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
            <Icon name="bug" className="w-4 h-4 text-amber-700" />
            <span>Pourquoi ce comportement bizarre se produit-il ?</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            Dans Google Chrome, <code className="font-mono">console.log(monObjet)</code> ne stocke pas une copie instantanée de l&apos;objet au moment où la ligne s&apos;exécute. Il stocke une <strong>référence mémoire</strong> vers cet objet. Lorsque vous cliquez sur la flèche bleue <span className="font-mono font-bold">▶</span> pour déplier l&apos;objet dans la console, Chrome lit la valeur <strong>à l&apos;instant précis du clic</strong> !
          </p>
        </div>

        {/* Solution avec CodeBlock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-rose-700">❌ Le piège de la référence vive</span>
            <CodeBlock
              language="javascript"
              code={`const user = { name: "Fatima", role: "user" };

console.log(user); // ⚠️ Vous croyez voir { role: "user" }

// Mais 2 secondes plus tard...
user.role = "admin";

// Si vous dépliez le log ci-dessus après coup,
// Chrome affichera role: "admin" !`}
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-emerald-700">✓ La parade : Snapshot instantané</span>
            <CodeBlock
              language="javascript"
              code={`const user = { name: "Fatima", role: "user" };

// Option 1 : Clonage profond moderne
console.log(structuredClone(user));

// Option 2 : Sérialisation JSON figée
console.log(JSON.parse(JSON.stringify(user)));

// Désormais, la valeur affichée est figée dans le marbre
// même si l'objet est modifié plus tard !`}
            />
          </div>
        </div>
      </section>

      {/* 5. Commandes et méthodes utilitaires avancées */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Les méthodes utilitaires chirurgicales indispensables
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* console.table */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">table()</span>
              <h3 className="font-bold text-slate-950 text-sm">console.table()</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Transforme un tableau d&apos;objets ou un dictionnaire en un véritable tableur interactif triable par colonnes. Vous pouvez spécifier les colonnes désirées : <code className="font-mono text-emerald-700">console.table(users, [&apos;name&apos;, &apos;email&apos;])</code>.
            </p>
          </div>

          {/* console.dir */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800 font-mono text-xs font-bold">dir()</span>
              <h3 className="font-bold text-slate-950 text-sm">console.dir()</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Alors que <code className="font-mono">console.log(document.body)</code> affiche l&apos;arbre HTML, <code className="font-mono">console.dir(document.body)</code> affiche l&apos;objet JavaScript réel avec ses 200+ propriétés (<code className="font-mono">clientHeight</code>, <code className="font-mono">dataset</code>, <code className="font-mono">style</code>).
            </p>
          </div>

          {/* console.count */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800 font-mono text-xs font-bold">count()</span>
              <h3 className="font-bold text-slate-950 text-sm">console.count()</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Affiche le nombre exact d&apos;exécutions d&apos;une ligne. Inestimable en React pour détecter si un composant re-render 50 fois par seconde à cause d&apos;un hook <code className="font-mono">useEffect</code> sans tableau de dépendances !
            </p>
          </div>

          {/* console.time / timeEnd */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-100 text-cyan-800 font-mono text-xs font-bold">time()</span>
              <h3 className="font-bold text-slate-950 text-sm">time() / timeEnd()</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Chronomètre avec une précision de 0.001 ms l&apos;intervalle entre deux points du code. Idéal pour comparer deux algorithmes de tri ou mesurer le parsing d&apos;un fichier JSON volumineux.
            </p>
          </div>

          {/* console.groupCollapsed */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs font-bold">group()</span>
              <h3 className="font-bold text-slate-950 text-sm">groupCollapsed()</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Regroupe une série de logs sous un dossier dépliable avec un titre personnalisé. Empêche la console d&apos;être saturée lors des cycles d&apos;authentification ou de transactions complexes.
            </p>
          </div>

          {/* console.trace */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-100 text-rose-800 font-mono text-xs font-bold">trace()</span>
              <h3 className="font-bold text-slate-950 text-sm">console.trace()</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Imprime la pile complète des appels (Call Stack). Si une fonction de suppression s&apos;exécute sans que vous compreniez qui l&apos;a déclenchée, <code className="font-mono">console.trace()</code> affiche l&apos;arbre généalogique complet.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Filtrer la console */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          6. Filtrer les messages pour accélérer le diagnostic
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Sur une application en production ou un projet frontend complexe, la console peut recevoir des centaines de lignes. Utilisez le menu de filtrage des niveaux :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image17.jpeg"
            alt="Menu de sélection des niveaux de log dans Chrome DevTools"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.3.3 — Filtre des niveaux de la Console : Verbose (debug), Info, Warnings (jaune) et Errors (rouge).
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
          <strong className="text-slate-900 block font-bold text-sm">Astuces secrètes de la barre de recherche Console :</strong>
          <ul className="list-disc pl-5 space-y-1 font-medium">
            <li>
              <strong>Exclure du bruit :</strong> tapez <code className="font-mono text-rose-600 bg-white px-1 rounded">-analytics</code> pour masquer tous les messages contenant &quot;analytics&quot;.
            </li>
            <li>
              <strong>Cibler une URL :</strong> tapez <code className="font-mono text-indigo-700 bg-white px-1 rounded">url:cart.ts</code> pour ne voir QUE les messages provenant du fichier du panier d&apos;achat.
            </li>
            <li>
              <strong>Expression régulière :</strong> activez la case <em>Regex</em> pour filtrer sur des motifs complexes comme <code className="font-mono text-emerald-700 bg-white px-1 rounded">/HTTP\s(4|5)\d\d/</code>.
            </li>
          </ul>
        </div>
      </section>

      {/* 7. Simulateur interactif Console Pro */}
      <section className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>Laboratoire Pratique</span>
          </div>
          <h2 className="text-[22px] font-black text-slate-950 tracking-tight">
            7. Simulateur interactif : Testez les méthodes chirurgicales
          </h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Choisissez une technique ci-dessous pour voir comment la console DevTools formate les données et aide à résoudre l&apos;enquête :
          </p>
        </div>

        {/* Buttons Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSimulationMode('levels')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              simulationMode === 'levels'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1. Sévérités (warn vs error)
          </button>
          <button
            onClick={() => setSimulationMode('table')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              simulationMode === 'table'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            2. console.table()
          </button>
          <button
            onClick={() => setSimulationMode('group')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              simulationMode === 'group'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            3. console.group()
          </button>
          <button
            onClick={() => setSimulationMode('assert')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              simulationMode === 'assert'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            4. console.assert()
          </button>
          <button
            onClick={() => setSimulationMode('trace')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              simulationMode === 'trace'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            5. console.trace()
          </button>
          <button
            onClick={() => setSimulationMode('trap')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              simulationMode === 'trap'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            6. Piège Mutation V8
          </button>
        </div>

        {/* Simulated Console Screen */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-slate-100 p-5 font-mono text-xs space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="ml-2 text-slate-300 font-bold">DevTools Console (Simulateur V8)</span>
            </div>
            <span className="text-[11px] text-slate-500">top (window context)</span>
          </div>

          {/* Mode 1: Levels */}
          {simulationMode === 'levels' && (
            <div className="space-y-3">
              <div className="p-2 rounded bg-slate-900 text-slate-300 border-l-4 border-slate-500">
                &gt; console.log(&quot;Utilisateur connecté : #42&quot;);
                <div className="text-slate-400 mt-1">Utilisateur connecté : #42</div>
              </div>
              <div className="p-2 rounded bg-blue-950/60 text-blue-200 border-l-4 border-blue-500 flex items-start gap-2">
                <span className="text-blue-400 font-bold">ℹ</span>
                <div>
                  <div className="text-blue-300">&gt; console.info(&quot;Cache HTTP rafraîchi (TTL: 3600s)&quot;);</div>
                  <div>Cache HTTP rafraîchi (TTL: 3600s)</div>
                </div>
              </div>
              <div className="p-2 rounded bg-amber-950/60 text-amber-200 border-l-4 border-amber-500 flex items-start gap-2">
                <span className="text-amber-400 font-bold">⚠️</span>
                <div>
                  <div className="text-amber-300">&gt; console.warn(&quot;La méthode checkoutLegacy() est dépréciée !&quot;);</div>
                  <div>La méthode checkoutLegacy() est dépréciée !</div>
                </div>
              </div>
              <div className="p-2 rounded bg-rose-950/70 text-rose-200 border-l-4 border-rose-500 flex items-start gap-2">
                <span className="text-rose-400 font-bold">❌</span>
                <div>
                  <div className="text-rose-300">&gt; console.error(&quot;Échec HTTP 500 : /api/v1/orders&quot;);</div>
                  <div className="font-bold">Échec HTTP 500 : /api/v1/orders</div>
                  <div className="text-[11px] text-rose-400/80 mt-1 pl-2 border-l border-rose-700">
                    at placeOrder (checkout.js:84:11)<br />
                    at HTMLButtonElement.&lt;anonymous&gt; (app.js:22:9)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Table */}
          {simulationMode === 'table' && (
            <div className="space-y-3">
              <div className="text-emerald-400">
                &gt; console.table(articles, [&apos;id&apos;, &apos;titre&apos;, &apos;prix&apos;, &apos;enStock&apos;]);
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-700 text-slate-300">
                  <thead className="bg-slate-800 text-slate-100 border-b border-slate-700">
                    <tr>
                      <th className="p-2 text-slate-500">(index)</th>
                      <th className="p-2 text-cyan-300">id</th>
                      <th className="p-2 text-cyan-300">titre</th>
                      <th className="p-2 text-cyan-300">prix</th>
                      <th className="p-2 text-cyan-300">enStock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="p-2 text-slate-500">0</td>
                      <td className="p-2 text-amber-300">&apos;art_101&apos;</td>
                      <td className="p-2 text-emerald-300">&apos;Clavier Mécanique&apos;</td>
                      <td className="p-2 text-purple-300">129.99</td>
                      <td className="p-2 text-emerald-400 font-bold">true</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-slate-500">1</td>
                      <td className="p-2 text-amber-300">&apos;art_102&apos;</td>
                      <td className="p-2 text-emerald-300">&apos;Souris Sans-Fil&apos;</td>
                      <td className="p-2 text-purple-300">59.50</td>
                      <td className="p-2 text-rose-400 font-bold">false</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-slate-500">2</td>
                      <td className="p-2 text-amber-300">&apos;art_103&apos;</td>
                      <td className="p-2 text-emerald-300">&apos;Écran 4K 144Hz&apos;</td>
                      <td className="p-2 text-purple-300">449.00</td>
                      <td className="p-2 text-emerald-400 font-bold">true</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-slate-400 text-[11px]">
                💡 Cliquez sur l&apos;en-tête d&apos;une colonne dans DevTools pour trier instantanément par prix croissant/décroissant !
              </div>
            </div>
          )}

          {/* Mode 3: Group */}
          {simulationMode === 'group' && (
            <div className="space-y-3">
              <div className="text-purple-300">
                &gt; console.groupCollapsed(&quot;📦 Traitement Commande #8912&quot;);
              </div>
              <div className="pl-4 border-l-2 border-purple-500/50 space-y-2">
                <div className="text-slate-300">▶ Détails du panier : 3 articles (Total : 638,49 €)</div>
                <div className="text-slate-300">▶ Vérification inventaire : OK (Réservation réussie)</div>
                <div className="text-emerald-400">✓ Paiement Stripe validé (ch_3N82xL9...)</div>
                <div className="text-blue-400">✉ Email de confirmation envoyé au client</div>
              </div>
              <div className="text-purple-300">&gt; console.groupEnd();</div>
              <div className="text-slate-400 text-[11px] pt-1">
                💡 Sans groupCollapsed, ces 4 lignes pollueraient tout l&apos;écran. Avec le groupe, tout tient sur une seule ligne repliée !
              </div>
            </div>
          )}

          {/* Mode 4: Assert */}
          {simulationMode === 'assert' && (
            <div className="space-y-3">
              <div className="text-cyan-300 font-mono">
                &gt; const soldeUtilisateur = 45;<br />
                &gt; const montantAchat = 100;<br />
                &gt; console.assert(soldeUtilisateur &gt;= montantAchat, &quot;Fonds insuffisants ! Impossible de débiter.&quot;);
              </div>
              <div className="p-2.5 rounded bg-rose-950/80 text-rose-200 border-l-4 border-rose-600 flex items-start gap-2">
                <span className="font-bold text-rose-400">Assertion failed:</span>
                <div>
                  Fonds insuffisants ! Impossible de débiter.
                  <div className="text-[11px] text-rose-400/80 mt-1">at validerPanier (payment.js:45:13)</div>
                </div>
              </div>
              <div className="text-slate-400 text-[11px]">
                💡 Si le solde avait été de 150 €, <code className="text-emerald-400">console.assert</code> n&apos;aurait rien affiché du tout (zéro bruit dans la console) !
              </div>
            </div>
          )}

          {/* Mode 5: Trace */}
          {simulationMode === 'trace' && (
            <div className="space-y-3">
              <div className="text-rose-300">
                &gt; function supprimerCompte() &#123; console.trace(&quot;Déclenchement suppression !&quot;); &#125;
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                <div className="text-amber-400 font-bold mb-1">console.trace: Déclenchement suppression !</div>
                <div className="space-y-1 text-[11px] text-slate-300 pl-2 border-l border-slate-600">
                  <div>at supprimerCompte (<span className="text-cyan-300">accountService.js:112:13</span>)</div>
                  <div>at onConfirmModal (<span className="text-cyan-300">DeleteModal.tsx:42:7</span>)</div>
                  <div>at HTMLButtonElement.dispatch (<span className="text-cyan-300">react-dom.production.min.js:88:21</span>)</div>
                  <div>at handleClick (<span className="text-cyan-300">Button.tsx:15:3</span>)</div>
                </div>
              </div>
              <div className="text-slate-400 text-[11px]">
                💡 Vous identifiez immédiatement qui a appelé <code className="text-amber-300">supprimerCompte()</code> : c&apos;est la modale <code className="text-cyan-300">DeleteModal.tsx</code> suite à un clic sur le composant <code className="text-cyan-300">Button.tsx</code>.
              </div>
            </div>
          )}

          {/* Mode 6: Trap */}
          {simulationMode === 'trap' && (
            <div className="space-y-3">
              <div className="p-2 rounded bg-slate-900 text-slate-300">
                <span className="text-slate-500">{'// 1. Exécution du code :'}</span><br />
                const panier = &#123; nbArticles: 1 &#125;;<br />
                console.log(panier); <span className="text-slate-500">{'// Devrait afficher 1'}</span><br />
                panier.nbArticles = 99; <span className="text-slate-500">{'// Modifié plus tard'}</span>
              </div>
              <div className="p-3 rounded bg-amber-950/60 border border-amber-600/50 text-amber-200">
                <div className="font-bold flex items-center gap-1.5 text-amber-300">
                  <span>▶ &#123; nbArticles: 99 &#125;</span>
                  <span className="text-[10px] uppercase px-1 rounded bg-amber-800 text-amber-100">Piège V8</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Chrome affiche <strong>99</strong> au lieu de <strong>1</strong> car vous avez cliqué sur la flèche pour inspecter après la modification de la variable !
                </p>
              </div>
              <div className="p-2.5 rounded bg-emerald-950/50 border border-emerald-600/50 text-emerald-300 text-[11px]">
                ✓ Avec <code className="text-white font-bold">structuredClone(panier)</code> : le log affiche toujours fidèlement <code className="text-white">&#123; nbArticles: 1 &#125;</code> !
              </div>
            </div>
          )}
        </div>

        {/* Dynamic counter interactive widget */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-300 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="refresh" className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900">Simuler console.count(&apos;ComposantHeader&apos;) :</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRenderCount((prev) => prev + 1)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
            >
              Déclencher un re-render (+1)
            </button>
            <button
              onClick={() => setRenderCount(1)}
              className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition-colors"
            >
              Reset
            </button>
            <span className="font-mono bg-white px-2.5 py-1 rounded border border-slate-300 text-slate-900 font-bold">
              ComposantHeader: {renderCount}
            </span>
          </div>
        </div>
      </section>

      {/* 8. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>8. Quiz de validation — Chapitre 3</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle fondamental du moteur REPL de la Console JavaScript ?",
              options: [
                "Recompiler entièrement le projet sur le serveur distant",
                "Lire, évaluer et imprimer le code JavaScript dynamiquement dans la mémoire vive de la page",
                "Générer des fichiers PDF depuis le code HTML",
                "Sauvegarder automatiquement le code dans Git"
              ],
              correctIndex: 1,
              explanation: "Le REPL (Read-Eval-Print Loop) évalue immédiatement toute expression JavaScript tapée ou logguée dans le contexte mémoire actif du navigateur."
            },
            {
              id: 2,
              question: "L'instruction console.error('Erreur critique') arrête-t-elle l'exécution du script JavaScript ?",
              options: [
                "Oui, elle stoppe immédiatement la page comme throw new Error()",
                "Non, elle formate uniquement le message en rouge avec une stack trace sans interrompre l'exécution",
                "Oui, mais uniquement si la console est ouverte",
                "Elle recharge automatiquement l'onglet"
              ],
              correctIndex: 1,
              explanation: "console.error() ne bloque jamais l'interpréteur JavaScript. Pour stopper une fonction, il faut lever une exception avec 'throw new Error()'."
            },
            {
              id: 3,
              question: "Pourquoi console.log(monObjet) peut-il afficher des valeurs modifiées APRÈS l'appel du log dans Chrome ?",
              options: [
                "À cause d'un bug dans le processeur de l'ordinateur",
                "Parce que Chrome conserve une référence mémoire vivante et évalue l'objet au moment du clic sur la flèche de dépliage",
                "Parce que JavaScript n'est pas un langage asynchrone",
                "Parce que le cache du navigateur est saturé"
              ],
              correctIndex: 1,
              explanation: "C'est l'évaluation paresseuse (lazy evaluation). Chrome évalue la référence mémoire au moment du dépliage. Utilisez structuredClone() pour figer l'objet."
            },
            {
              id: 4,
              question: "Quelle méthode permet d'afficher un tableau d'objets sous la forme d'un tableau synthétique avec colonnes triables ?",
              options: [
                "console.dir()",
                "console.table()",
                "console.group()",
                "console.trace()"
              ],
              correctIndex: 1,
              explanation: "console.table() formate les listes d'objets en un tableau clair et ordonnable très pratique pour les listes d'utilisateurs ou de produits."
            },
            {
              id: 5,
              question: "Quelle instruction permet de n'émettre une erreur rouge dans la console QUE si une condition logique obligatoire est violée ?",
              options: [
                "console.assert(condition, message)",
                "console.count(condition)",
                "console.warn(condition)",
                "console.time(condition)"
              ],
              correctIndex: 0,
              explanation: "console.assert() teste la condition : si elle vaut false, elle imprime l'erreur rouge ; si elle vaut true, elle reste totalement silencieuse."
            },
            {
              id: 6,
              question: "Vous souhaitez savoir exactement quelle fonction a provoqué l'appel inattendu d'une méthode de suppression. Que devez-vous ajouter ?",
              options: [
                "console.clear()",
                "console.count()",
                "console.trace()",
                "console.dir()"
              ],
              correctIndex: 2,
              explanation: "console.trace() imprime la pile d'exécution (Call Stack), vous permettant de remonter de parent en parent jusqu'à l'origine du déclenchement."
            }
          ]}
        />
      </section>
    </div>
  );
};
