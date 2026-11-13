'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { TokenSimulator } from '@/components/interactive/TokenSimulator';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 3 — Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Le Zero-shot Prompting
        </h1>
        <p className="mt-2 text-base text-slate-700">
          Apprendre à dialoguer efficacement avec l&apos;IA dans votre IDE du premier coup, sans avoir besoin de lui montrer d&apos;exemples préalables.
        </p>
      </div>

      {/* 1. Définition et Démystification pour Débutant */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          1. Qu&apos;est-ce que le Zero-shot ? (Comprendre sans jargon)
        </h2>
        
        <p className="text-base sm:text-lg text-slate-800 font-medium">
          Le <strong>Zero-shot Prompting</strong> (littéralement <em>« guidage à zéro coup »</em> ou <em>« sans exemple »</em>) est la façon la plus naturelle et la plus directe d&apos;interroger une Intelligence Artificielle. Vous lui posez une question ou lui donnez un ordre précis, et l&apos;IA doit vous répondre <strong>sans que vous ne lui donniez aucun modèle de réponse à imiter</strong>.
        </p>

        {/* L'Analogie du quotidien */}
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase">
            <span>💡 L&apos;analogie de la vie courante</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            Imaginez que vous entrez dans un restaurant :
          </p>
          <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
            <li><strong>En mode Zero-shot :</strong> Vous dites simplement au serveur <em>« Préparez-moi une omelette au fromage sans sel »</em>. Vous ne lui apportez pas une photo d&apos;omelette ni une recette : le cuisinier sait déjà cuisiner et s&apos;exécute selon vos consignes.</li>
            <li><strong>En mode Few-shot (Chapitre suivant) :</strong> Vous lui diriez <em>« Voici la photo de 3 plats types servis dans mon hôtel, préparez le 4ème exactement sur ce modèle de dressage »</em>.</li>
          </ul>
        </div>

        {/* Glossaire Débutant */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span>📖 Le petit lexique du débutant</span>
          </h3>
          <div className="grid gap-4 text-xs sm:text-sm grid-cols-1 sm:grid-cols-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="block text-indigo-700 font-bold mb-1">Le mot « Shot »</strong>
              <span className="text-slate-600">
                Dans le monde de l&apos;IA, « shot » signifie <strong>un exemple</strong>. <em>Zero-shot</em> = 0 exemple, <em>One-shot</em> = 1 exemple, <em>Few-shot</em> = 2 à 5 exemples.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="block text-indigo-700 font-bold mb-1">Mémoire d&apos;entraînement</strong>
              <span className="text-slate-600">
                L&apos;IA s&apos;appuie sur tout ce qu&apos;elle a appris lors de sa création (livres, code, docs). Vous n&apos;avez pas à lui réapprendre le langage JavaScript ou Python.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="block text-indigo-700 font-bold mb-1">Les « Tokens »</strong>
              <span className="text-slate-600">
                Les morceaux de mots qui composent le texte. Moins vous écrivez d&apos;exemples inutiles, moins votre prompt consomme de tokens et plus l&apos;IA répond vite.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Le Mécanisme Visuel */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Comment l&apos;IA traite un prompt Zero-shot
        </h2>

        <div className="grid gap-4 text-center grid-cols-1 sm:grid-cols-2">
          <div className="p-5 rounded-2xl border-2 border-indigo-100 bg-white shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center mx-auto">1</div>
            <h3 className="text-sm font-black uppercase text-indigo-900">Votre Consigne Directe</h3>
            <p className="text-xs text-slate-600">
              Vous formulez une intention claire, le texte à traiter et les critères de qualité, sans ajouter d&apos;exemple.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-purple-100 bg-white shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 font-black text-sm flex items-center justify-center mx-auto">2</div>
            <h3 className="text-sm font-black uppercase text-purple-900">Mobilisation Interne</h3>
            <p className="text-xs text-slate-600">
              Le modèle active ses connaissances préalables (grammaire, syntaxe, algorithmes) pour interpréter la demande.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-100 bg-white shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center mx-auto">3</div>
            <h3 className="text-sm font-black uppercase text-emerald-900">Réponse Immédiate</h3>
            <p className="text-xs text-slate-600">
              L&apos;IA génère la solution en une seule passe, directement prête à être lue ou intégrée dans votre éditeur.
            </p>
          </div>
        </div>
      </section>

      {/* 3. L'Anatomie des 3 Piliers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Les 3 ingrédients d&apos;un bon prompt Zero-shot
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Puisqu&apos;on ne donne pas d&apos;exemple à l&apos;IA, la clarté de votre instruction est capitale. Un bon prompt Zero-shot réunit toujours ces 3 éléments :
        </p>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <span className="inline-block px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-black text-xs">Pilier 1 : Le Verbe d&apos;action</span>
            <p className="text-xs text-slate-700">
              Un verbe impératif et sans équivoque : <em>« Explique »</em>, <em>« Détecte le bug »</em>, <em>« Traduis »</em> ou <em>« Refactore »</em>. Évitez les formules vagues comme <em>« Regarde ce code »</em>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <span className="inline-block px-2.5 py-1 rounded bg-purple-100 text-purple-800 font-black text-xs">Pilier 2 : Le Matériau d&apos;entrée</span>
            <p className="text-xs text-slate-700">
              Le bout de code, le message d&apos;erreur ou la question isolée entre des guillemets ou des délimiteurs (balises ou code blocks) pour que l&apos;IA sache exactement sur quoi travailler.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <span className="inline-block px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-black text-xs">Pilier 3 : La Forme attendue</span>
            <p className="text-xs text-slate-700">
              La longueur et le format voulu : <em>« En 2 phrases simples »</em>, <em>« Sous forme de liste à puces »</em>, ou <em>« Sans commentaire superflu »</em>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Exemples Pratiques dans l'IDE (Comparatif Avant / Après) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Exemples pratiques dans l&apos;IDE : Du prompt flou au prompt réussi
        </h2>

        {/* Cas 1 : Comprendre une erreur */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">Cas n°1 : Expliquer une erreur du terminal dans votre IDE</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">Cas fréquent</span>
          </div>
          <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2 min-w-0">
              <span className="text-xs font-black uppercase text-rose-800 flex items-center gap-1.5">
                <span>❌ À éviter (Prompt vague et passif)</span>
              </span>
              <p className="font-mono text-xs bg-white p-3 rounded border border-rose-200 text-slate-800 break-words [overflow-wrap:anywhere]">
                « J&apos;ai cette erreur : Cannot read properties of undefined (reading &apos;map&apos;). C&apos;est quoi ? »
              </p>
              <p className="text-xs text-slate-600">
                L&apos;IA va vous écrire un essai théorique de 30 lignes sur JavaScript au lieu de vous donner la solution immédiate.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2 min-w-0">
              <span className="text-xs font-black uppercase text-emerald-800 flex items-center gap-1.5">
                <span>✅ À faire (Prompt Zero-shot chirurgical)</span>
              </span>
              <p className="font-mono text-xs bg-white p-3 rounded border border-emerald-200 text-slate-800 break-words [overflow-wrap:anywhere]">
                « Explique la cause de cette erreur d&apos;exécution en 2 phrases simples pour un débutant, puis donne 1 ligne de code pour la corriger :<br />
                &gt; TypeError: Cannot read properties of undefined (reading &apos;map&apos;) »
              </p>
              <p className="text-xs text-slate-600">
                Réponse directe, concise et immédiatement exploitable dans votre fichier.
              </p>
            </div>
          </div>
        </div>

        {/* Cas 2 : Générer un composant ou fonction */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">Cas n°2 : Écrire une fonction utilitaire en TypeScript</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">Développement quotidien</span>
          </div>
          <div className="p-5 space-y-4">
            {/* Boîte de prompt sans pre pour éviter tout débordement */}
            <div className="rounded-xl border-2 border-slate-800 bg-slate-900 text-slate-100 p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-3 break-words shadow-inner min-w-0 max-w-full">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  [PROMPT ZERO-SHOT DIRECT ET COMPLET]
                </span>
                <span className="text-[11px] text-slate-400 font-sans">0 exemple requis</span>
              </div>

              <div className="text-slate-100 font-bold text-sm bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 break-words">
                &quot;Écris une fonction utilitaire TypeScript nommée &apos;formatPrice&apos;.&quot;
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-bold text-slate-400 uppercase tracking-wider text-[11px] font-sans">
                  Consignes précises transmises à l&apos;IA :
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 text-slate-300 break-words">
                    <strong className="text-indigo-300 block mb-0.5">1. Entrée</strong>
                    Nombre <code className="text-indigo-200">amount</code> en centimes (ex: 2450) + devise par défaut <code className="text-indigo-200">&apos;EUR&apos;</code>.
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 text-slate-300 break-words">
                    <strong className="text-emerald-300 block mb-0.5">2. Sortie</strong>
                    Chaîne formatée en devise (ex: <code className="text-emerald-300">&quot;24,50 €&quot;</code>).
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 text-slate-300 break-words">
                    <strong className="text-amber-300 block mb-0.5">3. Cas limites</strong>
                    Gérer montant négatif ou zéro (retourne <code className="text-amber-200">&quot;0,00 €&quot;</code>).
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 text-slate-300 break-words">
                    <strong className="text-purple-300 block mb-0.5">4. Format exigé</strong>
                    Uniquement le code TypeScript typé, zéro bavardage d&apos;introduction.
                  </div>
                </div>
              </div>
            </div>

            {/* Résultat concret : code généré */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-3 sm:p-4 space-y-2">
              <div className="font-bold text-xs uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 font-sans">
                <span>🎯</span>
                <span>Code TypeScript produit immédiatement par l&apos;IA :</span>
              </div>
              <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg border border-slate-800 font-mono text-xs leading-relaxed space-y-1 break-all shadow-inner min-w-0 max-w-full">
                <div><span className="text-purple-400">export function</span> <span className="text-blue-400">formatPrice</span>(amount: <span className="text-emerald-400">number</span>, currency: <span className="text-emerald-400">string</span> = <span className="text-amber-300">&apos;EUR&apos;</span>): <span className="text-emerald-400">string</span> &#123;</div>
                <div className="pl-4"><span className="text-purple-400">if</span> (amount &lt;= 0) <span className="text-purple-400">return</span> <span className="text-amber-300">&apos;0,00 €&apos;</span>;</div>
                <div className="pl-4"><span className="text-purple-400">return</span> (amount / 100).<span className="text-blue-300">toLocaleString</span>(<span className="text-amber-300">&apos;fr-FR&apos;</span>, &#123;</div>
                <div className="pl-8">style: <span className="text-amber-300">&apos;currency&apos;</span>,</div>
                <div className="pl-8">currency,</div>
                <div className="pl-4">&#125;);</div>
                <div>&#125;</div>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              <strong>Résultat dans l&apos;IDE :</strong> L&apos;IA génère directement le code propre et typé sans bavardage, prêt à être inséré avec <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-800 font-mono text-xs">Ctrl+I</kbd> ou dans votre chat d&apos;IDE.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Simulateur Interactif : Pourquoi le Zero-shot est économique ? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Atelier Pratique : Comprendre la consommation de Tokens
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Chaque mot envoyé à l&apos;IA est découpé en <strong>tokens</strong>. En Zero-shot, votre message reste court car vous n&apos;avez pas à recopier de gros blocs d&apos;exemples. Testez vous-même comment votre texte est découpé :
        </p>

        <TokenSimulator />

        <Callout type="tip" title="Règle d'or pour débutant">
          Commencez <strong>toujours</strong> par un prompt Zero-shot ! Si l&apos;IA réussit du premier coup, vous avez économisé du temps et des tokens. Ce n&apos;est que si l&apos;IA hésite ou produit un format inadapté qu&apos;il faudra lui montrer un exemple (Few-shot, Chapitre 2).
        </Callout>
      </section>

      {/* 6. Quand l'utiliser et quand l'éviter ? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          6. La Boussole du développeur : Quand utiliser le Zero-shot ?
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Situation</th>
                <th className="p-3.5 border border-slate-200">Zero-shot adapté ?</th>
                <th className="p-3.5 border border-slate-200">Raison pédagogique</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Explication de code ou d&apos;erreur</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-black">✅ Idéal (10/10)</td>
                <td className="p-3.5 border border-slate-200">L&apos;IA connaît déjà tous les langages et frameworks standards.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Écriture d&apos;algorithmes et utilitaires simples</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-black">✅ Idéal (10/10)</td>
                <td className="p-3.5 border border-slate-200">Une simple consigne suffit pour obtenir une fonction propre.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Traduction ou documentation</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-black">✅ Idéal (9/10)</td>
                <td className="p-3.5 border border-slate-200">Génération de docstrings, commentaires ou traductions bilingues.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Format de données très strict et complexe</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-black">⚠️ Limité (5/10)</td>
                <td className="p-3.5 border border-slate-200">L&apos;IA risque d&apos;oublier un champ sans exemple de référence (voir Few-shot).</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Règle métier ultra-spécifique à votre entreprise</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-black">❌ Déconseillé (3/10)</td>
                <td className="p-3.5 border border-slate-200">L&apos;IA ne peut pas deviner vos acronymes ou règles internes sans démonstrations.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Checklist interactive d'assimilation */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur le Zero-shot"
          items={[
            "Je sais que 'Zero-shot' signifie interroger l'IA sans lui donner d'exemple de réponse.",
            "Je comprends que le mot 'shot' correspond à un exemple de démonstration.",
            "J'utilise les 3 ingrédients : un verbe d'action, le matériau bien délimité et le format attendu.",
            "Je sais que le Zero-shot est le plus rapide et le plus économe en tokens.",
            "J'ai identifié quand passer au Few-shot (quand le format ou la logique métier est trop stricte)."
          ]}
        />
      </section>

      {/* 8. Quiz de Validation */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          Validation des connaissances — Quiz Express
        </h2>
        
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Le principe fondamental"
            question="Un collègue écrit un prompt de 40 lignes contenant des consignes très précises, mais aucun exemple de réponse. S'agit-il d'un prompt Zero-shot ?"
            options={[
              "Non, car un prompt Zero-shot doit impérativement faire moins de 2 lignes.",
              "Oui, car la longueur n'a pas d'importance : c'est l'absence totale d'exemples de démonstration qui définit le Zero-shot.",
              "Non, car sans exemple le modèle refuse de répondre."
            ]}
            correctIndex={1}
            explanation="Exactement ! Un prompt Zero-shot peut être très détaillé et riche en consignes. Ce qui compte, c'est qu'il ne comporte aucun exemple type (input -> output) pour guider le modèle."
          />

          <QuickQuiz
            title="Question 2 — Réflexe de débutant"
            question="Vous devez demander à l'IA d'expliquer une fonction JavaScript étrange. Quelle est la meilleure approche pour débuter ?"
            options={[
              "Lui écrire immédiatement 5 exemples de fonctions avec leurs explications pour lui montrer comment faire.",
              "Lui faire une demande Zero-shot directe et concise (ex: 'Explique cette fonction en 3 puces simples : [...]').",
              "Lui demander de réécrire tout le projet de zéro."
            ]}
            correctIndex={1}
            explanation="Parfait ! La règle d'or est de toujours commencer par le Zero-shot : c'est immédiat, gratuit en exemples et suffisant dans la majorité des cas quotidiens."
          />
        </div>
      </section>
    </div>
  );
};
