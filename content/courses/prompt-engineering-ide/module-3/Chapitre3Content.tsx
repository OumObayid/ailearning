'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 3 — Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 3 — Chain of Thought (Raisonnement pas-à-pas)
        </h1>
        <p className="mt-2 text-base text-slate-700">
          Forcer l&apos;IA à « poser son calcul sur un brouillon » pour résoudre les bugs vicieux et les logiques complexes sans sauter aux conclusions.
        </p>
      </div>

      {/* 1. Définition et Analogie */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          1. Qu&apos;est-ce que la « Chain of Thought » (CoT) ?
        </h2>

        <p className="text-base sm:text-lg text-slate-800 font-medium">
          La <strong>Chain of Thought</strong> (ou <em>Chaîne de Pensée</em>) est une technique fondamentale qui consiste à demander à l&apos;IA de <strong>décomposer son raisonnement en étapes logiques successives</strong> avant d&apos;énoncer sa réponse finale.
        </p>

        {/* Analogie du brouillon */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-5 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase">
            <span>💡 L&apos;analogie du problème de mathématiques</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            Si on vous demande à brûle-pourpoint : <em>« Combien font 19 × 23 ? Réponds immédiatement en 1 seconde sans réfléchir »</em>, vous avez 90% de chances de vous tromper.<br />
            En revanche, si on vous dit : <em>« Prends un brouillon, pose le calcul étape par étape puis donne le total »</em> :<br />
            1. <code>19 × 20 = 380</code><br />
            2. <code>19 × 3 = 57</code><br />
            3. <code>380 + 57 = 437</code>.<br />
            Vous trouvez le résultat exact sans stress. <strong>Les modèles d&apos;IA fonctionnent exactement de la même manière !</strong>
          </p>
        </div>

        {/* Pourquoi ça marche techniquement ? */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span>🧠 Pourquoi l&apos;IA a-t-elle besoin d&apos;un « brouillon » ?</span>
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Un modèle de langage ne « pense » pas en secret avant d&apos;écrire : <strong>il prédit les mots un par un au fil de l&apos;écriture</strong>.
          </p>
          <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
            <li><strong>Sans CoT :</strong> Vous demandez directement la conclusion. L&apos;IA écrit les premiers mots sans avoir pu analyser les détails et s&apos;enferme souvent dans une fausse piste (hallucination).</li>
            <li><strong>Avec CoT :</strong> En écrivant d&apos;abord les étapes 1, 2 et 3, <em>ces étapes écrites deviennent du contexte visible pour ses neurones</em>, lui permettant de déduire la conclusion finale avec une précision chirurgicale.</li>
          </ul>
        </div>
      </section>

      {/* 2. La Formule Magique */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. La formule historique : « Réfléchissons pas à pas »
        </h2>

        <p className="text-base text-slate-800 font-medium">
          En 2022, des chercheurs en IA ont découvert qu&apos;ajouter simplement la phrase :
        </p>

        <div className="p-4 rounded-2xl border-2 border-purple-300 bg-purple-100/60 text-center font-bold text-base sm:text-lg text-purple-950">
          « Réfléchissons étape par étape » <span className="text-xs text-purple-700 font-normal">(Let&apos;s think step by step)</span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Cette simple consigne multipliait par 3 le taux de réussite sur des problèmes d&apos;algorithmique ou de logique complexe ! Dans un IDE, nous pouvons aller encore plus loin en dictant la grille de réflexion à l&apos;agent.
        </p>
      </section>

      {/* 3. Démonstration Concrète dans l'IDE (Chasse au Bug) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Cas Pratique dans l&apos;IDE : Traquer un bug sournois
        </h2>

        {/* Le Code à analyser */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 space-y-3 shadow-sm min-w-0">
          <span className="font-bold text-sm text-slate-900 block">Le code à analyser (piège de boucle et d&apos;indice) :</span>
          <div className="font-mono text-xs bg-slate-900 text-slate-100 p-4 rounded-xl shadow-inner space-y-1 break-all leading-relaxed">
            <div><span className="text-purple-400">function</span> <span className="text-blue-400">getTopThreeScores</span>(scores) &#123;</div>
            <div className="pl-4 text-slate-400">// scores est trié par ordre décroissant, ex: [98, 85, 72, 60]</div>
            <div className="pl-4"><span className="text-purple-400">let</span> result = [];</div>
            <div className="pl-4"><span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> i = 0; i &lt;= 3; i++) &#123;</div>
            <div className="pl-8"><span className="text-purple-400">if</span> (scores[i]) &#123;</div>
            <div className="pl-12">result.push(scores[i]);</div>
            <div className="pl-8">&#125;</div>
            <div className="pl-4">&#125;</div>
            <div className="pl-4"><span className="text-purple-400">return</span> result;</div>
            <div>&#125;</div>
          </div>
        </div>

        {/* Comparatif Sans CoT vs Avec CoT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 space-y-2 min-w-0">
            <span className="text-xs font-black uppercase text-rose-800">❌ Sans Chain of Thought (Trop rapide)</span>
            <p className="text-xs font-mono bg-white p-3 rounded border border-rose-200 text-slate-800 break-all">
              « Y a-t-il un bug dans cette fonction ? »
            </p>
            <p className="text-xs text-slate-600">
              <strong>Réponse typique de l&apos;IA :</strong> <em>« Le code semble correct, il parcourt les scores et les ajoute au tableau. »</em> ➔ <strong>Erreur manquée !</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 space-y-2 min-w-0">
            <span className="text-xs font-black uppercase text-emerald-800">✅ Avec Chain of Thought (Pas-à-pas)</span>
            <p className="text-xs font-mono bg-white p-3 rounded border border-emerald-200 text-slate-800 break-all">
              « Analyse l&apos;exécution pas à pas en listant la valeur de &apos;i&apos; à chaque itération. Combien d&apos;éléments sont retournés ? »
            </p>
            <p className="text-xs text-slate-600">
              <strong>Raisonnement déroulé :</strong><br />
              &bull; <em>i = 0 ➔ 1er score</em><br />
              &bull; <em>i = 1 ➔ 2ème score</em><br />
              &bull; <em>i = 2 ➔ 3ème score</em><br />
              &bull; <em>i = 3 ➔ 4ème score ! (car la condition est i &lt;= 3 au lieu de i &lt; 3)</em><br />
              ➔ <strong>Le bug est détecté immédiatement !</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 4. Le Template de Prompt CoT pour Développeur */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Le Gabarit universel de prompt CoT
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Pour ordonner à un agent d&apos;analyser une architecture ou une fonction délicate dans Antigravity, utilisez cette structure en 3 temps :
        </p>

        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 shadow-inner break-words min-w-0 max-w-full">
          <p className="text-xs uppercase font-extrabold text-indigo-400 tracking-wider">[GABARIT DE RAISONNEMENT STRUCTURÉ]</p>
          <div className="text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3">
            <div className="text-slate-300 font-semibold">
              Avant de proposer le code corrigé, respecte scrupuleusement ces 3 étapes :
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <strong className="text-indigo-400 uppercase text-[11px] block">ÉTAPE 1 — CONSTAT FACTUEL :</strong>
                <span className="text-slate-300 text-xs">Cite précisément les lignes concernées et décris ce qui s&apos;y passe réellement.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <strong className="text-amber-400 uppercase text-[11px] block">ÉTAPE 2 — DÉROULÉ D&apos;EXÉCUTION :</strong>
                <span className="text-slate-300 text-xs">Simule l&apos;exécution avec un cas concret (ex: un utilisateur qui clique deux fois rapidement).</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <strong className="text-emerald-400 uppercase text-[11px] block">ÉTAPE 3 — SOLUTION & CODE :</strong>
                <span className="text-slate-300 text-xs">Seulement après avoir validé les étapes 1 et 2, fournis le code corrigé avec explications.</span>
              </div>
            </div>
          </div>
        </div>

        <Callout type="tip" title="Astuce pour l'IDE">
          Dans la fenêtre de chat de votre IDE ou avec <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-800 font-mono text-xs">Ctrl+I</kbd>, demander un découpage en étapes force l&apos;agent à vérifier ses hypothèses au lieu de vous réécrire tout le fichier à l&apos;aveugle.
        </Callout>
      </section>

      {/* 5. Checklist interactive */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur la Chain of Thought"
          items={[
            "Je comprends pourquoi l'IA a besoin de poser son raisonnement par écrit pour éviter d'halluciner.",
            "Je sais que 'Let's think step by step' force le modèle à détailler les étapes intermédiaires.",
            "J'utilise le CoT pour le débogage complexe, les calculs et l'analyse de cas limites.",
            "Je structure mes demandes en exigeant : 1. Constat -> 2. Simulation -> 3. Solution.",
            "Je fais la différence entre le CoT (raisonnement pas-à-pas) et la décomposition en sous-missions (Chapitre 4)."
          ]}
        />
      </section>

      {/* 6. Quiz de Validation */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          Validation des connaissances — Quiz Express
        </h2>

        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Pourquoi le CoT est-il plus fiable ?"
            question="Pourquoi le fait d'écrire les étapes intermédiaires permet-il à l'IA de trouver la bonne réponse ?"
            options={[
              "Parce que les mots générés lors des étapes précédentes deviennent visibles dans son contexte pour déduire la suite",
              "Parce que le modèle se connecte automatiquement à Wikipédia pendant le calcul",
              "Parce que cela supprime les limites de mémoire du GPU"
            ]}
            correctIndex={0}
            explanation="Exactement ! Puisque le modèle prédit chaque mot à partir de tout le texte précédent, avoir rédigé les étapes intermédiaires lui fournit le matériau logique indispensable pour formuler la bonne conclusion."
          />

          <QuickQuiz
            title="Question 2 — Quand l'utiliser en priorité ?"
            question="Dans quelle situation le Chain of Thought est-il le plus utile ?"
            options={[
              "Pour traduire le mot 'Bonjour' en anglais",
              "Pour trouver la cause d'un blocage asynchrone (Deadlock ou Race Condition) dans un code complexe",
              "Pour changer la couleur d'un bouton de rouge à vert"
            ]}
            correctIndex={1}
            explanation="Bravo ! Les problèmes d'asynchronisme ou de logique en plusieurs étapes nécessitent de dérouler l'ordre temporel des événements : c'est le terrain de jeu idéal du CoT."
          />
        </div>
      </section>
    </div>
  );
};
