'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 3 — Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 6 — Le Contextual Prompting (Maîtriser le Contexte)
        </h1>
        <p className="mt-2 text-base text-slate-700">
          Fournir le bon décor à l&apos;IA sans la noyer : comment contextualiser vos demandes dans l&apos;IDE pour obtenir du code compatible avec votre projet du premier coup.
        </p>
      </div>

      {/* 1. Définition et Analogie */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          1. Pourquoi l&apos;IA a-t-elle besoin de contexte ?
        </h2>

        <p className="text-base sm:text-lg text-slate-800 font-medium">
          L&apos;IA ne devine rien de votre projet tant que vous ne le lui dites pas. Si vous lui demandez : <em>« Ajoute un bouton de connexion »</em>, elle ne sait pas si votre application utilise React, Vue, Angular, du Tailwind CSS ou du Bootstrap.
        </p>

        {/* L'Analogie de la consultation médicale */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-5 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase">
            <span>💡 L&apos;analogie de la consultation chez le médecin</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            Imaginez que vous entriez chez un médecin et disiez simplement : <em>« J&apos;ai mal, donnez-moi un médicament »</em>.<br />
            Aucun médecin ne peut vous soigner ainsi. En revanche, si vous dites :<br />
            &bull; <strong>Contexte :</strong> <em>« J&apos;ai 25 ans, je suis asthmatique et allergique à l&apos;aspirine. »</em><br />
            &bull; <strong>Données :</strong> <em>« J&apos;ai une douleur vive au poignet depuis une chute à vélo ce matin. »</em><br />
            &bull; <strong>Instruction :</strong> <em>« Prescrivez-moi un antidouleur compatible. »</em><br />
            Le médecin vous soigne immédiatement et sans danger. En programmation avec l&apos;IA, c&apos;est <strong>exactement la même mécanique</strong> !
          </p>
        </div>
      </section>

      {/* 2. Le Trio d'or : Contexte / Données / Instruction */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Le Trio d&apos;or : Ne confondez plus Contexte, Données et Consigne
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Pilier</th>
                <th className="p-3.5 border border-slate-200">Ce que c&apos;est</th>
                <th className="p-3.5 border border-slate-200">Exemple concret dans votre IDE</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">1. Le Contexte</td>
                <td className="p-3.5 border border-slate-200">L&apos;environnement technique et le rôle du projet</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">« Next.js 16 (App Router), Tailwind CSS v4, TypeScript strict »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-purple-700">2. Les Données</td>
                <td className="p-3.5 border border-slate-200">Le code source, le schéma SQL ou l&apos;erreur à traiter</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">Le contenu copié de <code>Navbar.tsx</code> ou l&apos;erreur du terminal</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-700">3. L&apos;Instruction</td>
                <td className="p-3.5 border border-slate-200">L&apos;action précise et le livrable souhaité</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">« Rends ce menu responsive avec un bouton burger mobile »</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. L'Arme secrète dans Antigravity : Les @mentions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. L&apos;arme secrète dans Antigravity : Les @mentions
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dans un IDE moderne comme Antigravity, vous n&apos;avez pas besoin de faire du copier-coller manuel de 500 lignes de fichiers. Utilisez le symbole <strong><code>@</code></strong> directement dans votre chat :
        </p>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">@package.json</span>
            <p className="text-xs text-slate-600">
              Permet à l&apos;agent de connaître en 1 seconde la version exacte de vos bibliothèques (ex: React 19 vs 18) pour éviter les fonctions obsolètes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">@nom_du_fichier</span>
            <p className="text-xs text-slate-600">
              Injecte le code d&apos;un composant ou d&apos;un type voisin pour que la nouvelle fonction s&apos;y adapte parfaitement sans conflit de nom.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">@terminal</span>
            <p className="text-xs text-slate-600">
              Transmet directement la dernière commande exécutée et son message d&apos;erreur sans avoir à faire de sélection manuelle fastidieuse.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Le Piège de la « Noyade de Contexte » (Context Rot) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Le piège de la « Noyade de Contexte » (Trop d&apos;infos tue l&apos;info)
        </h2>

        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-5 space-y-3">
          <h3 className="text-amber-950 font-bold text-sm uppercase">⚠️ Plus de contexte ne signifie pas une meilleure réponse !</h3>
          <p className="text-sm text-slate-800 leading-relaxed">
            Si vous injectez 25 fichiers dans la conversation pour changer la couleur d&apos;un bouton :
          </p>
          <ul className="text-xs sm:text-sm text-slate-700 list-disc list-inside space-y-1">
            <li>Le modèle est distrait par des détails hors sujet (phénomène de <em>« Lost in the middle »</em>).</li>
            <li>Vous brûlez inutilement des milliers de tokens, ce qui ralentit la réponse.</li>
            <li>L&apos;IA risque d&apos;inventer des dépendances imaginaires avec les fichiers voisins.</li>
          </ul>
          <p className="text-xs font-bold text-indigo-900 mt-2">
            ➔ Règle d&apos;or : Ne fournissez que le fichier à modifier et les 1 ou 2 fichiers dont dépendent ses types ou ses données.
          </p>
        </div>
      </section>

      {/* 5. Exemple complet d'un prompt contextualisé propre */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Exemple d&apos;un prompt contextualisé parfait
        </h2>

        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 shadow-inner break-words min-w-0 max-w-full">
          <p className="text-xs uppercase font-extrabold text-indigo-400 tracking-wider">[PROMPT CONTEXTUALISÉ ET DÉLIMITÉ]</p>
          <div className="space-y-3 text-slate-200">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold block text-[11px] uppercase tracking-wider">### 1. CONTEXTE DU PROJET :</span>
              <ul className="text-slate-300 list-disc list-inside space-y-0.5 text-xs">
                <li>Application e-commerce Next.js (App Router) avec Tailwind CSS.</li>
                <li>Base MySQL avec table <code className="text-indigo-300">&apos;products&apos;</code> (id, title, price_cents, stock).</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-purple-400 font-bold block text-[11px] uppercase tracking-wider">### 2. DONNÉES EN ENTRÉE :</span>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-xs text-slate-300 space-y-0.5 break-all">
                <div>export function ProductCard(&#123; title, price_cents, stock &#125;) &#123;</div>
                <div className="pl-4">return &lt;div&gt;&#123;title&#125; - &#123;price_cents / 100&#125; €&lt;/div&gt;;</div>
                <div>&#125;</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-[11px] uppercase tracking-wider">### 3. MISSION ATTENDUE :</span>
              <ol className="text-slate-300 list-decimal list-inside space-y-0.5 text-xs">
                <li>Transforme ce composant avec une carte stylisée en Tailwind CSS.</li>
                <li>Si stock === 0, affiche un badge rouge &quot;Rupture de stock&quot; et grise la carte.</li>
                <li>Formate le prix en devise française (ex: &quot;19,99 €&quot;).</li>
                <li>Ne modifie pas les noms des props d&apos;entrée.</li>
              </ol>
            </div>
          </div>
        </div>

        <Callout type="tip" title="Astuce pour les règles d'équipe">
          Si votre projet a des contraintes immuables (ex: toujours utiliser Tailwind CSS, interdiction de modifier la branche main), ne les répétez pas à chaque prompt : écrivez-les une fois pour toutes dans le fichier <code>AGENTS.md</code> à la racine du projet !
        </Callout>
      </section>

      {/* 6. Checklist interactive */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur le Contexte"
          items={[
            "Je distingue clairement : Contexte (décor), Données (matériau) et Instruction (action).",
            "J'utilise les @mentions dans Antigravity pour cibler les fichiers indispensables sans copier-coller.",
            "J'évite la 'noyade de contexte' en n'injectant que les 1 ou 2 fichiers strictement utiles.",
            "J'indique ma stack technique exacte (ex: Next.js App Router, React 19) pour éviter le code déprécié.",
            "Je sais que les règles globales permanentes doivent être placées dans AGENTS.md."
          ]}
        />
      </section>

      {/* 7. Quiz de Validation */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          Validation des connaissances — Quiz Express
        </h2>

        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Le danger du manque de contexte"
            question="Vous demandez : 'Ajoute une fonction de hash de mot de passe'. Sans contexte technique, que risque-t-il d'arriver ?"
            options={[
              "L'IA refuse d'écrire du code de sécurité",
              "L'IA peut vous proposer une bibliothèque obsolète ou incompatible avec votre version de Node.js / runtime",
              "Le fichier devient automatiquement protégé en écriture"
            ]}
            correctIndex={1}
            explanation="Exactement ! Sans savoir si vous tournez sur Node.js natif (avec crypto.scrypt), sur bcryptjs ou sur un runtime Edge comme Cloudflare Workers, l'IA choisira au hasard une solution potentiellement incompatible."
          />

          <QuickQuiz
            title="Question 2 — La bonne pratique des @mentions"
            question="Dans Antigravity, quelle est la manière la plus efficace de donner du contexte à l'agent ?"
            options={[
              "Faire des captures d'écran de tout votre écran",
              "Utiliser '@nom_du_fichier' pour cibler uniquement le fichier en cours et son fichier de types",
              "Copier-coller manuellement les 40 fichiers de l'application dans le prompt"
            ]}
            correctIndex={1}
            explanation="Parfait ! Cibler avec @nom_du_fichier est ultra-rapide, garantit un texte source exact et préserve votre fenêtre de contexte sans la polluer."
          />
        </div>
      </section>
    </div>
  );
};
