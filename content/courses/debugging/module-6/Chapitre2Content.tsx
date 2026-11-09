'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

interface ComparisonCriteria {
  dimension: string;
  traditional: string;
  aiAssisted: string;
  hybridVerdict: string;
}

const COMPARISON_MATRIX: ComparisonCriteria[] = [
  {
    dimension: "Nature de l'approche",
    traditional: "Déterministe et empirique : observation directe de l'état réel de la mémoire et des flux.",
    aiAssisted: "Probabiliste et sémantique : prédiction statistique de la cause la plus plausible.",
    hybridVerdict: "L'IA propose l'hypothèse en 5 secondes, le débogueur la confirme factuellement."
  },
  {
    dimension: "Inspection de la mémoire vive (RAM)",
    traditional: "Directe et totale : examen en direct du Scope local, des closures et des variables globales.",
    aiAssisted: "Indirecte : le modèle ne voit que les captures de logs ou les extraits collés dans le prompt.",
    hybridVerdict: "Le débogueur est indispensable pour constater la valeur exacte d'un pointeur à l'instant t."
  },
  {
    dimension: "Compréhension de code volumineux",
    traditional: "Lente et séquentielle : l'ingénieur doit tracer manuellement chaque saut de fonction.",
    aiAssisted: "Instantanée : synthèse globale de relations complexes entre 5 services différents.",
    hybridVerdict: "L'IA cartographie les dépendances et oriente l'ingénieur vers le module suspect."
  },
  {
    dimension: "Bugs intermittents (Heisenbugs)",
    traditional: "Difficile : poser un point d'arrêt modifie le timing des threads et fait disparaître le bug.",
    aiAssisted: "Excellente : l'IA analyse les conditions théoriques de concurrence (Race Conditions) sans geler l'exécution.",
    hybridVerdict: "L'IA formule la condition de concurrence, l'ingénieur injecte un test de charge pour la déclencher."
  },
  {
    dimension: "Risque de fausse piste",
    traditional: "Faible : si une variable vaut null sous le breakpoint, c'est une certitude physique.",
    aiAssisted: "Modéré à élevé : risque d'hallucination d'API ou de mauvaise interprétation du framework.",
    hybridVerdict: "Ne jamais modifier de code sur la simple intuition d'un LLM sans validation par un test."
  }
];

export const Chapitre2Content: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<'syntax' | 'concurrency' | 'stacktrace' | 'architecture'>('concurrency');

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 6 • Chapitre 2 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Méthodologie Comparée & Synergie d&apos;Outils
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Différence entre débogage traditionnel et débogage assisté par IA : Complémentarité, limites et matrice de décision
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          La relation entre le débogage traditionnel et le diagnostic assisté par IA est comparable à celle qui unit <strong>le stéthoscope du médecin et le scanner d&apos;imagerie par résonance magnétique (IRM)</strong> :
          le stéthoscope et les sondes mesurent des grandeurs physiques réelles (battements de cœur, tensions électriques, état brut de la RAM) et ne mentent jamais.
          Le scanner assisté par ordinateur, lui, brasse des pétaoctets de données médicales, repère en une seconde un micro-nodule suspect invisible à l&apos;œil nu,
          mais exige l&apos;intervention du chirurgien pour pratiquer la biopsie et poser le diagnostic final.
        </p>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Objectifs d&apos;apprentissage du chapitre
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser la distinction épistémologique entre approche <strong>déterministe</strong> (outils physiques) et approche <strong>probabiliste</strong> (LLM).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Exploiter en synergie l&apos;arsenal d&apos;investigation : VS Code Debugger, Chrome DevTools, Google Antigravity et Google Gemini.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Appliquer la matrice de décision rationnelle pour choisir instantanément l&apos;approche optimale face à n&apos;importe quelle typologie de panne.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Éviter les deux écueils symétriques : le <em>débogage aveugle 100% manuel</em> et la <em>délégation passive à l&apos;IA</em> sans vérification expérimentale.</span>
          </li>
        </ul>
      </section>

      {/* 2. Les fondements du débogage traditionnel */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Le débogage traditionnel : Rigueur déterministe et observation directe
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Le débogage traditionnel repose sur un principe immuable : <strong>l&apos;accès direct aux structures de données du moteur d&apos;exécution à l&apos;instant $t$</strong>.
          Lorsque vous posez un point d&apos;arrêt (breakpoint) dans VS Code ou Chrome DevTools, le thread JavaScript est physiquement suspendu.
          Le moteur Google V8 fige la pile d&apos;appels (Call Stack), expose les tables de symboles du Scope lexical et vous permet d&apos;inspecter les adresses mémoire.
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Icon name="code" className="w-4 h-4 text-lime-700" />
            <span>Les atouts majeurs de l&apos;approche traditionnelle :</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
            <li className="p-2.5 rounded-xl bg-white border border-slate-200">
              <strong>Zéro hallucination</strong> : La valeur inspectée dans la console est la valeur mathématiquement présente en RAM.
            </li>
            <li className="p-2.5 rounded-xl bg-white border border-slate-200">
              <strong>Pas-à-pas minutieux</strong> : Vous pouvez avancer ligne par ligne (Step Over, Step Into, Step Out) pour observer la mutation des variables.
            </li>
            <li className="p-2.5 rounded-xl bg-white border border-slate-200">
              <strong>Points d&apos;arrêt conditionnels</strong> : Suspendre l&apos;exécution uniquement lorsque <code>order.totalAmount &lt; 0</code> ou <code>userId === 42</code>.
            </li>
            <li className="p-2.5 rounded-xl bg-white border border-slate-200">
              <strong>Profiling mémoire natif</strong> : Heap Snapshots et Allocation Timelines révélant les fuites réelles d&apos;objets non libérés par le GC.
            </li>
          </ul>
        </div>

        <Callout type="tip" title="La règle d'or du choix d'outils">
          <p className="text-xs sm:text-sm">
            Si le bug est reproductible localement en moins d&apos;une minute avec une entrée connue, ouvrez <strong>VS Code Debugger</strong> ou <strong>Chrome DevTools</strong>.
            Si l&apos;anomalie implique des logs nébuleux, des microservices tiers ou un comportement architectural diffus, interrogez d&apos;abord <strong>l&apos;IA</strong> pour formuler 3 hypothèses de travail, puis validez au débogueur.
          </p>
        </Callout>
      </section>

      {/* 3. Les fondements du diagnostic assisté par IA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Le diagnostic assisté par IA : Inférence sémantique et corrélation à haut débit
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          À l&apos;opposé, l&apos;IA ne possède pas de sonde matérielle connectée à votre runtime. Elle traite le problème comme un <strong>puzzle sémantique multidimensionnel</strong>.
          Le modèle de langage a ingéré des millions de dépôts de code source, de rapports d&apos;incidents post-mortem, de RFCs de protocoles et de discussions GitHub issues.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Lorsqu&apos;un ingénieur lui transmet un paquet d&apos;informations hétérogènes (un extrait de contrôleur Express, un schéma de table MySQL et 15 lignes de log JSON),
          l&apos;IA repère instantanément des incohérences invisibles pour l&apos;œil humain fatigué :
          un décalage entre le fuseau horaire UTC du serveur et celui du client, un champ <code>undefined</code> dans un objet de configuration Zod,
          ou encore l&apos;oubli d&apos;un <code>await</code> devant une transaction MySQL provoquant une condition de concurrence.
        </p>
      </section>

      {/* 4. Tableau comparatif rigoureux */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Matrice comparative : Débogage traditionnel vs Débogage assisté par IA
          </h2>
        </div>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Critère d&apos;ingénierie</th>
                <th className="px-4 py-3">Débogage Traditionnel (VS Code / DevTools)</th>
                <th className="px-4 py-3">Diagnostic Assisté par IA (Gemini / Agents)</th>
                <th className="px-4 py-3">Synergie Hybride Optimale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              {COMPARISON_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-950">{row.dimension}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{row.traditional}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{row.aiAssisted}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-800 bg-emerald-50/40">{row.hybridVerdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Les 4 piliers d'outils avec visuels techniques */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les 4 piliers de l&apos;arsenal d&apos;investigation moderne
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          L&apos;ingénieur performant ne choisit pas entre ses outils : il les orchestre dans une chaîne d&apos;investigation cohérente.
          Chacun des 4 composants suivants remplit un rôle précis :
        </p>

        {/* Pilier 1 : VS Code */}
        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-black text-xs">1</span>
              <h3 className="font-bold text-slate-950 text-base">Visual Studio Code : Le microscope d&apos;exécution locale</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-900 border border-sky-300">
              Débogage Déterministe
            </span>
          </div>

          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
            <Image
              src="/images/cours/debugging/module-6/image1.jpeg"
              alt="Visual Studio Code - Débogage avec points d'arrêt, variables locales et Call Stack"
              fill
              className="object-contain p-2"
            />
          </div>
          <p className="text-xs text-slate-600 italic">
            Figure 6.2.1 — Interface de débogage de Visual Studio Code : points d&apos;arrêt conditionnels, panneau Variables (Local, Closure, Global), pile d&apos;appels (Call Stack) et console de débogage interactive.
          </p>
        </div>

        {/* Pilier 2 : Chrome DevTools */}
        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">2</span>
              <h3 className="font-bold text-slate-950 text-base">Chrome DevTools : La télémétrie navigateur et réseau</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Télémétrie & Network
            </span>
          </div>

          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
            <Image
              src="/images/cours/debugging/module-6/image2.jpeg"
              alt="Chrome DevTools - Inspection réseau, console d'erreurs et profiler de performance"
              fill
              className="object-contain p-2"
            />
          </div>
          <p className="text-xs text-slate-600 italic">
            Figure 6.2.2 — Panneau Chrome DevTools : analyse de la cascade réseau (Waterfall), calcul du TTFB, monitoring des requêtes XHR/Fetch et inspection du DOM en direct.
          </p>
        </div>

        {/* Pilier 3 : Google Antigravity */}
        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">3</span>
              <h3 className="font-bold text-slate-950 text-base">Google Antigravity : L&apos;environnement d&apos;agents autonomes</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              Agentique & Sandbox
            </span>
          </div>

          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
            <Image
              src="/images/cours/debugging/module-6/image3.jpeg"
              alt="Google Antigravity - IDE assisté par agents avec exécution de tests et inspection de code"
              fill
              className="object-contain p-2"
            />
          </div>
          <p className="text-xs text-slate-600 italic">
            Figure 6.2.3 — Environnement d&apos;ingénierie Google Antigravity : orchestration multi-agents, outils de recherche sémantique dans l&apos;arbre de fichiers, exécution sandboxée de commandes terminal et génération d&apos;artefacts vérifiables.
          </p>
        </div>

        {/* Pilier 4 : Google Gemini */}
        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-black text-xs">4</span>
              <h3 className="font-bold text-slate-950 text-base">Google Gemini : Le moteur d&apos;inférence et de raisonnement</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-300">
              Modèle de Fondation
            </span>
          </div>

          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
            <Image
              src="/images/cours/debugging/module-6/image4.jpeg"
              alt="Google Gemini - Modèle d'intelligence artificielle analysant des extraits de code et des logs"
              fill
              className="object-contain p-2"
            />
          </div>
          <p className="text-xs text-slate-600 italic">
            Figure 6.2.4 — Modèle multimodal Google Gemini : analyse en contexte long (Long Context Window), décodage de traces complexes, détection de régressions dans les schémas SQL et génération de tests unitaires ciblés.
          </p>
        </div>
      </section>

      {/* 6. Matrice de décision interactive */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            6
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Matrice de décision : Quelle approche choisir selon la nature du bug ?
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Sélectionnez une catégorie d&apos;incident ci-dessous pour visualiser la stratégie d&apos;investigation recommandée par les standards d&apos;ingénierie :
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => setSelectedCase('syntax')}
            className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
              selectedCase === 'syntax'
                ? 'bg-lime-500 text-slate-950 border-lime-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            1. Erreur Typage / Syntaxe
          </button>
          <button
            onClick={() => setSelectedCase('stacktrace')}
            className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
              selectedCase === 'stacktrace'
                ? 'bg-lime-500 text-slate-950 border-lime-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            2. Stack Trace Obscure
          </button>
          <button
            onClick={() => setSelectedCase('concurrency')}
            className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
              selectedCase === 'concurrency'
                ? 'bg-lime-500 text-slate-950 border-lime-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            3. Bug Concurrence / Heisenbug
          </button>
          <button
            onClick={() => setSelectedCase('architecture')}
            className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
              selectedCase === 'architecture'
                ? 'bg-lime-500 text-slate-950 border-lime-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            4. Régression Architecturale
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          {selectedCase === 'syntax' && (
            <div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-900 border border-sky-300">
                Approche : Débogueur Local / IDE seul (90% traditionnel)
              </span>
              <h4 className="font-bold text-slate-950 text-base mt-2">Erreurs de typage TypeScript et syntaxe élémentaire</h4>
              <p className="text-xs text-slate-700 leading-relaxed mt-1">
                Inutile de solliciter un LLM pour un point-virgule manquant ou une propriété mal nommée dans une interface locale.
                Le compilateur <code>tsc</code> et le serveur de langage de VS Code soulignent l&apos;erreur immédiatement avec la ligne exacte.
              </p>
            </div>
          )}

          {selectedCase === 'stacktrace' && (
            <div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-300">
                Approche : Synergie Hybride (IA pour filtrer + Débogueur pour vérifier)
              </span>
              <h4 className="font-bold text-slate-950 text-base mt-2">Exception cryptique issue de bibliothèques tierces (ex: Webpack, Prisma, TypeORM)</h4>
              <p className="text-xs text-slate-700 leading-relaxed mt-1">
                Copiez la Stack Trace de 80 lignes dans le modèle IA. En 5 secondes, il identifie le frame pertinent de votre propre code et explique le contrat violé avec l&apos;ORM.
                Posez ensuite un point d&apos;arrêt dans VS Code sur cette ligne pour confirmer la valeur incriminée.
              </p>
            </div>
          )}

          {selectedCase === 'concurrency' && (
            <div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                Approche : IA pour l&apos;analyse causale théorique + Tests de charge k6/Autocannon
              </span>
              <h4 className="font-bold text-slate-950 text-base mt-2">Heisenbugs & Race Conditions (soldes négatifs, doublons de commandes)</h4>
              <p className="text-xs text-slate-700 leading-relaxed mt-1">
                Les breakpoints traditionnels sont toxiques ici car ils détruisent la simultanéité des requêtes.
                Transmettez le code de la transaction à l&apos;IA pour qu&apos;elle détecte l&apos;absence de verrou (ex: <code>SELECT ... FOR UPDATE</code> manquant).
                Puis validez l&apos;hypothèse avec un script de charge sans figer le runtime.
              </p>
            </div>
          )}

          {selectedCase === 'architecture' && (
            <div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Approche : Agent IDE (Google Antigravity / Windsurf) avec revue humaine du diff
              </span>
              <h4 className="font-bold text-slate-950 text-base mt-2">Changement d&apos;un contrat d&apos;API impactant 12 fichiers clients</h4>
              <p className="text-xs text-slate-700 leading-relaxed mt-1">
                Les agents d&apos;IDE scannent l&apos;arborescence complète du projet, localisent tous les appels impactés, mettent à jour les DTOs
                et lancent la suite de tests unitaires Vitest pour certifier qu&apos;aucune régression n&apos;est introduite.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 7. TP Pratique Comparatif : Résolution pas-à-pas */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            7
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            TP Pratique Comparatif : Investigation conjointe d&apos;une désynchronisation d&apos;objet
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Considérons une fonction utilitaire critique de formattage d&apos;utilisateur dans un système e-commerce :
        </p>

        <CodeBlock
          filename="src/utils/userFormatter.ts"
          language="typescript"
          code={`export interface UserEntity {
  id: number;
  name: string;
  profile?: {
    displayName: string;
    avatarUrl?: string;
  };
}

// Fonction vulnérable : suppose l'existence de l'objet profile
export function getUserDisplayName(user: UserEntity): string {
  // Erreur subtile à l'exécution : TypeError: Cannot read properties of undefined (reading 'displayName')
  return user.profile.displayName;
}`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Icon name="code" className="w-4 h-4 text-sky-700" />
              <span>Méthode A : Investigation au Débogueur VS Code</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 font-medium">
              <li>Poser un breakpoint ligne 13 dans <code>userFormatter.ts</code>.</li>
              <li>Lancer la configuration <em>&quot;Attach to Node.js&quot;</em> dans VS Code.</li>
              <li>Rejouer la requête de test avec Postman.</li>
              <li>Le débogueur s&apos;arrête : dans le panneau <strong>Variables &gt; Local</strong>, l&apos;ingénieur constate que <code>user.profile</code> est <code>undefined</code>.</li>
              <li><strong>Preuve physique acquise</strong> : la structure réelle des données reçues de MySQL n&apos;inclut pas la table jointe <code>profiles</code>.</li>
            </ol>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Icon name="sparkles" className="w-4 h-4 text-purple-700" />
              <span>Méthode B : Investigation par Prompt d&apos;Ingénierie IA</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              L&apos;ingénieur soumet le code et l&apos;interface au modèle avec la consigne : <em>&quot;Ne modifie aucun code. Analyse pourquoi cette fonction crash selon l&apos;interface UserEntity.&quot;</em>
            </p>
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 font-medium">
              L&apos;IA signale immédiatement que <code>profile?</code> est marqué comme optionnel dans l&apos;interface TypeScript,
              rendant l&apos;accès direct <code>user.profile.displayName</code> illégal sans vérification de nullabilité.
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">Remédiation d&apos;ingénierie définitive (Code défensif robuste) :</h4>
          <CodeBlock
            filename="src/utils/userFormatter.ts (Corrigé)"
            language="typescript"
            code={`export function getUserDisplayName(user: UserEntity): string {
  if (!user) {
    return 'Utilisateur Anonyme';
  }

  // Priorité au nom d'affichage personnalisé, repli sur le nom de base, sinon valeur par défaut
  return user.profile?.displayName ?? user.name ?? 'Utilisateur Sans Nom';
}`}
          />
        </div>
      </section>

      {/* Quiz de certification (6 questions) */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de certification — Chapitre 6.2 : Débogage Traditionnel vs Assisté par IA"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence fondamentale de statut entre une variable inspectée sous un breakpoint dans VS Code et une explication fournie par un LLM ?",
              options: [
                "Aucune différence, les deux proviennent de calculs sur serveur.",
                "La variable sous breakpoint est une observation physique directe et déterministe de la mémoire RAM, tandis que l'explication du LLM est une déduction probabiliste nécessitant confirmation.",
                "L'explication du LLM est toujours plus fiable car l'IA a lu toute la documentation du langage.",
                "Le débogueur VS Code invente des valeurs pour les variables locales non typées."
              ],
              correctIndex: 1,
              explanation: "Le débogueur traditionnel est déterministe : il lit les octets réels alloués par V8 en mémoire. Le LLM est un modèle probabiliste de complétion textuelle : sa réponse peut être brillamment exacte ou complètement hallucinée."
            },
            {
              id: 2,
              question: "Pourquoi l'utilisation de points d'arrêt (breakpoints) traditionnels est-elle inefficace pour diagnostiquer un Heisenbug lié à une condition de concurrence (Race Condition) ?",
              options: [
                "Parce que les breakpoints sont incompatibles avec le langage TypeScript.",
                "Parce que suspendre le thread JavaScript avec un breakpoint altère le timing relatif des requêtes concurrentes, faisant temporairement disparaître la condition de course qui provoquait le bug.",
                "Parce que Chrome DevTools refuse de déboguer les requêtes concurrentes.",
                "Parce que les transactions MySQL s'annulent automatiquement après 1 milliseconde."
              ],
              correctIndex: 1,
              explanation: "Un Heisenbug est une anomalie qui disparaît dès qu'on tente de l'observer de près. Poser un point d'arrêt gèle le thread, ce qui élimine la concurrence temporelle exacte qui produisait la corruption de données."
            },
            {
              id: 3,
              question: "Dans quel cas de figure le débogage traditionnel avec VS Code est-il nettement supérieur et plus rapide que le recours à un modèle IA ?",
              options: [
                "Pour concevoir l'architecture d'un microservice complet.",
                "Pour comprendre une Stack Trace de 150 lignes générée par un framework inconnu.",
                "Pour une erreur de logique locale simple où il suffit d'avancer pas-à-pas (Step Over) sur 5 lignes pour voir quelle branche d'un if/else est empruntée avec les vraies données.",
                "Pour anonymiser des données personnelles conformément au RGPD."
              ],
              correctIndex: 2,
              explanation: "Poser un breakpoint et faire F10 (Step Over) prend 10 secondes et donne une certitude absolue et immédiate sur le chemin d'exécution réel, sans avoir à copier-coller de code dans une invite de prompt."
            },
            {
              id: 4,
              question: "Quel rôle précis joue un environnement d'agents comme Google Antigravity par rapport à un simple chat LLM conventionnel ?",
              options: [
                "Il remplace le système d'exploitation Windows ou Linux de la machine hôte.",
                "Il intègre le modèle d'IA directement dans l'espace de travail avec des outils autorisés pour lire les fichiers, exécuter des commandes de terminal contrôlées et lancer les suites de tests automatisées.",
                "Il empêche les développeurs d'utiliser la souris.",
                "Il supprime automatiquement les points d'arrêt placés par les développeurs."
              ],
              correctIndex: 1,
              explanation: "Un environnement agentique comme Google Antigravity outille le LLM : l'agent ne fait pas que 'parler', il peut inspecter l'arborescence, exécuter la commande de build et vérifier ses correctifs avec des tests réels dans un environnement sandboxé."
            },
            {
              id: 5,
              question: "Face à une anomalie complexe, quel est le flux de travail hybride recommandé en ingénierie logicielle moderne ?",
              options: [
                "Laisser l'agent IA modifier directement le code en production sans passer par Git.",
                "Utiliser l'IA pour synthétiser l'incident et formuler 2 ou 3 hypothèses plausibles, puis utiliser le débogueur ou des tests automatisés pour confirmer la cause racine avant d'appliquer un correctif mesuré.",
                "Interdire formellement tout outil d'IA dans les équipes techniques.",
                "Poser des breakpoints sur chaque ligne du projet du début à la fin."
              ],
              correctIndex: 1,
              explanation: "La synergie hybride tire le meilleur des deux mondes : la vitesse d'orientation sémantique de l'IA (gain de temps d'analyse) combinée à la rigueur de vérification physique humaine (absence totale de régression)."
            },
            {
              id: 6,
              question: "Pourquoi l'inspection de la cascade réseau (Waterfall) dans Chrome DevTools est-elle complémentaire de l'analyse de code par une IA ?",
              options: [
                "Parce que Chrome DevTools ne fonctionne que lorsque l'IA est désactivée.",
                "Parce que la cascade réseau fournit la preuve empirique des temps réels (latence DNS, handshake SSL, TTFB et durée de téléchargement du payload), des grandeurs physiques invisibles dans le seul code source.",
                "Parce que la cascade réseau permet d'éditer les fichiers CSS sur le serveur distant.",
                "Parce que le TTFB est un nombre aléatoire généré par le navigateur."
              ],
              correctIndex: 1,
              explanation: "Le code source montre la logique théorique, mais Chrome DevTools Network mesure la réalité physique des paquets TCP circulant sur le réseau et la réponse effective du serveur distant."
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Chapitre2Content;
