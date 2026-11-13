'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 3 — Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 7 — Le Structured Prompting (Formats & Schémas Stricts)
        </h1>
        <p className="mt-2 text-base text-slate-700">
          Obliger l&apos;IA à répondre en données brutes exploitables par votre code (JSON, TypeScript, Markdown) sans bavardage d&apos;introduction ni crash au parsing.
        </p>
      </div>

      {/* 1. Le Problème du Texte Libre */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          1. Le calvaire du texte bavard pour un développeur
        </h2>

        <p className="text-base sm:text-lg text-slate-800 font-medium">
          Par nature, un modèle de langage adore être poli et bavard. Si vous lui demandez : <em>« Donne-moi la liste des 3 cours populaires »</em>, il va répondre :<br />
          <em>« Certainement cher utilisateur ! Voici avec grand plaisir les 3 cours les plus populaires de notre plateforme : 1) ... »</em>
        </p>

        {/* Le crash du JSON.parse */}
        <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-black text-sm uppercase">
            <span>💥 Le crash inévitable de votre application</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            Si votre code JavaScript fait un <code>JSON.parse(reponseIA)</code> sur ce texte bavard, votre application plante immédiatement avec l&apos;erreur fatale :<br />
            <code className="text-xs bg-rose-200/70 text-rose-950 px-2 py-1 rounded font-mono">SyntaxError: Unexpected token &apos;C&apos;, &quot;Certainement...&quot; is not valid JSON</code>.
          </p>
          <p className="text-xs text-slate-700">
            Le <strong>Structured Prompting</strong> est la technique qui supprime définitivement ce risque en contraignant l&apos;IA à ne cracher <strong>que des données pures</strong>.
          </p>
        </div>

        {/* L'Analogie du Formulaire */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-5 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase">
            <span>💡 L&apos;analogie du formulaire administratif</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            Si vous demandez à des usagers de raconter leur identité sur une feuille blanche, chacun écrira une histoire différente.<br />
            Mais si vous leur tendez un <strong>formulaire cartonné</strong> avec des cases précises <em>[NOM] [PRÉNOM] [DATE DE NAISSANCE]</em>, tout le monde remplit les mêmes cases au même endroit. Le Structured Prompting donne exactement ce formulaire cartonné à l&apos;IA !
          </p>
        </div>
      </section>

      {/* 2. Les 3 Formats Clés dans le Développement */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Les 3 formats de sortie indispensables
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">1. JSON Strict</span>
            <p className="text-sm font-bold text-slate-950">Pour les API et bases de données</p>
            <p className="text-xs text-slate-600">
              Directement consommable par <code>JSON.parse()</code> dans une route d&apos;API Express ou Next.js. Zéro mot avant, zéro mot après.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-purple-700">2. Markdown avec Balises</span>
            <p className="text-sm font-bold text-slate-950">Pour la documentation et les rapports</p>
            <p className="text-xs text-slate-600">
              Titres <code>#</code>, listes à puces et blocs de code colorés (<code>```typescript</code>) faciles à lire pour un humain.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-emerald-700">3. Tableaux Comparatifs</span>
            <p className="text-sm font-bold text-slate-950">Pour les synthèses rapides</p>
            <p className="text-xs text-slate-600">
              Syntaxe Markdown <code>| Colonne 1 | Colonne 2 |</code> idéale pour comparer des bibliothèques ou auditer des bugs ordonnés par priorité.
            </p>
          </div>
        </div>
      </section>

      {/* 3. L'Arme des Balises Délimitatrices (Pseudo-XML) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. L&apos;arme des balises pseudo-XML pour cloisonner les entrées
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Les modèles d&apos;IA les plus avancés (comme Gemini ou Claude) adorent les balises de type <code>&lt;contexte&gt;</code>, <code>&lt;code&gt;</code> ou <code>&lt;format_attendu&gt;</code>. Cela évite qu&apos;une ligne de votre code source ne soit confondue avec un ordre :
        </p>

        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 shadow-inner break-words min-w-0 max-w-full">
          <p className="text-xs uppercase font-extrabold text-indigo-400 tracking-wider">[PROMPT STRUCTURÉ AVEC BALISES]</p>
          <div className="space-y-3 text-slate-200">
            <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
              <span className="text-indigo-400 text-xs block">&lt;role&gt;</span>
              <span className="text-slate-100 pl-3 block">Tu es un extracteur de données techniques.</span>
              <span className="text-indigo-400 text-xs block">&lt;/role&gt;</span>
            </div>

            <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
              <span className="text-purple-400 text-xs block">&lt;donnees_a_analyser&gt;</span>
              <span className="text-slate-100 pl-3 block break-words">
                L&apos;utilisateur Sarah Connor (email: sarah@skynet.com) a souscrit au forfait Pro à 29€ le 14/08/2026.
              </span>
              <span className="text-purple-400 text-xs block">&lt;/donnees_a_analyser&gt;</span>
            </div>

            <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 text-xs block">&lt;format_de_sortie_obligatoire&gt;</span>
              <div className="pl-3 text-slate-300 text-xs space-y-0.5">
                <div>Retourne UNIQUEMENT un objet JSON valide respectant ce schéma :</div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800 text-emerald-300 font-semibold break-all">
                  &#123; &quot;nom&quot;: string, &quot;email&quot;: string, &quot;forfait&quot;: &quot;FREE&quot; | &quot;PRO&quot; | &quot;ENTERPRISE&quot;, &quot;prix_cents&quot;: number, &quot;date_iso&quot;: &quot;YYYY-MM-DD&quot; &#125;
                </div>
                <div className="text-rose-400">Interdiction formelle d&apos;ajouter du texte d&apos;explication ou des balises markdown.</div>
              </div>
              <span className="text-emerald-400 text-xs block">&lt;/format_de_sortie_obligatoire&gt;</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Le Bouclier de Sécurité : La Validation Zod en TypeScript */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Le bouclier de sécurité côté code : Valider avec Zod
        </h2>

        <p className="text-base text-slate-800 font-medium">
          Même avec un prompt ultra-précis, l&apos;IA reste un modèle probabiliste. En production, un développeur professionnel valide <strong>toujours</strong> le JSON retourné avec la bibliothèque <strong>Zod</strong> :
        </p>

        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 shadow-inner break-words min-w-0 max-w-full">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 text-xs font-sans font-semibold">Validation côté client ou serveur</span>
            <span className="text-indigo-400 text-xs font-bold font-sans">Schéma Zod Strict</span>
          </div>

          <div className="space-y-2 leading-relaxed text-slate-300">
            <div><span className="text-purple-400">import</span> &#123; z &#125; <span className="text-purple-400">from</span> <span className="text-amber-300">&quot;zod&quot;</span>;</div>
            
            <div className="pt-2 text-slate-500">// 1. Contrat exact attendu</div>
            <div className="space-y-0.5">
              <div><span className="text-purple-400">const</span> <span className="text-blue-400">UserExtractionSchema</span> = z.<span className="text-blue-300">object</span>(&#123;</div>
              <div className="pl-4">nom: z.<span className="text-blue-300">string</span>().<span className="text-blue-300">min</span>(1),</div>
              <div className="pl-4">email: z.<span className="text-blue-300">string</span>().<span className="text-blue-300">email</span>(),</div>
              <div className="pl-4">forfait: z.<span className="text-blue-300">enum</span>([<span className="text-amber-300">&quot;FREE&quot;</span>, <span className="text-amber-300">&quot;PRO&quot;</span>, <span className="text-amber-300">&quot;ENTERPRISE&quot;</span>]),</div>
              <div className="pl-4">prix_cents: z.<span className="text-blue-300">number</span>().<span className="text-blue-300">int</span>().<span className="text-blue-300">nonnegative</span>(),</div>
              <div className="pl-4">date_iso: z.<span className="text-blue-300">string</span>().<span className="text-blue-300">regex</span>(/<span className="text-amber-300">^\d&#123;4&#125;-\d&#123;2&#125;-\d&#123;2&#125;$</span>/)</div>
              <div>&#125;);</div>
            </div>

            <div className="pt-2 text-slate-500">// 2. Validation sécurisée (sans crash)</div>
            <div className="space-y-0.5">
              <div><span className="text-purple-400">export function</span> <span className="text-blue-400">parseAIResponse</span>(rawJsonString: <span className="text-emerald-400">string</span>) &#123;</div>
              <div className="pl-4"><span className="text-purple-400">try</span> &#123;</div>
              <div className="pl-8">const rawObject = JSON.<span className="text-blue-300">parse</span>(rawJsonString);</div>
              <div className="pl-8">const result = UserExtractionSchema.<span className="text-blue-300">safeParse</span>(rawObject);</div>
              <div className="pl-8 text-purple-400">if (!result.success) return null;</div>
              <div className="pl-8 text-emerald-400">return result.data; // Garanti 100% typé</div>
              <div className="pl-4">&#125; <span className="text-purple-400">catch</span> &#123;</div>
              <div className="pl-8 text-rose-400">return null;</div>
              <div className="pl-4">&#125;</div>
              <div>&#125;</div>
            </div>
          </div>
        </div>

        <Callout type="tip" title="Astuce moderne : Les Structured Outputs natifs">
          Les SDK récents comme <code>@google/genai</code> pour Gemini supportent désormais l&apos;option <code>responseMimeType: &quot;application/json&quot;</code> avec un <code>responseSchema</code>. Cela force mathématiquement le modèle à ne générer que des tokens compatibles avec votre schéma JSON !
        </Callout>
      </section>

      {/* 5. Checklist interactive */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur le Structured Prompting"
          items={[
            "Je comprends pourquoi le texte bavard fait planter les applications (SyntaxError au JSON.parse).",
            "J'exige des formats stricts : JSON pour le code, Markdown pour les rapports humains.",
            "J'utilise les balises délimitatrices (<donnees>, <format>) pour séparer nettement les instructions.",
            "J'inclus un gabarit JSON vide avec les types attendus dans mon prompt.",
            "J'utilise systématiquement Zod ou un validateur de schéma pour sécuriser mes routes d'API."
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
            title="Question 1 — Pourquoi le Structured Prompting est-il vital ?"
            question="Dans une application web, pourquoi ne peut-on pas se contenter d'un prompt demandant une réponse en texte libre ?"
            options={[
              "Parce que le texte libre est interdit sur internet",
              "Parce qu'un programme a besoin de clés stables et de types stricts (JSON) pour alimenter une base de données ou un composant React",
              "Parce que le texte libre ralentit la connexion Wi-Fi"
            ]}
            correctIndex={1}
            explanation="Exactement ! Un composant React ou une route SQL a besoin de variables prévisibles comme data.nom ou data.prix. Le texte libre est impossible à parser de manière fiable."
          />

          <QuickQuiz
            title="Question 2 — Le rôle de Zod"
            question="À quoi sert 'safeParse' de Zod quand on reçoit du JSON généré par une IA ?"
            options={[
              "À traduire le JSON en anglais",
              "À vérifier que tous les champs obligatoires sont bien présents et du bon type, sans faire planter le serveur en cas d'erreur",
              "À compresser le fichier sur le disque"
            ]}
            correctIndex={1}
            explanation="Bravo ! safeParse intercepte les anomalies calmement et renvoie un booléen success, permettant à votre serveur de gérer élégamment les ratés sans planter."
          />
        </div>
      </section>
    </div>
  );
};
