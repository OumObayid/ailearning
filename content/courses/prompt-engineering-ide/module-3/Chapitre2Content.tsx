'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 3 — Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Le Few-shot Prompting
        </h1>
        <p className="mt-2 text-base text-slate-700">
          Guider l&apos;IA par le mimétisme : lui montrer 2 ou 3 exemples concrets pour lui imposer une charte de code, un style ou une logique métier sur-mesure.
        </p>
      </div>

      {/* 1. Définition et Analogie */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          1. Qu&apos;est-ce que le Few-shot ? (L&apos;art de montrer l&apos;exemple)
        </h2>

        <p className="text-base sm:text-lg text-slate-800 font-medium">
          Dans le <strong>Chapitre 1</strong>, nous avons vu le <em>Zero-shot</em> (demande brute sans exemple). Le <strong>Few-shot Prompting</strong> consiste à inclure dans votre prompt <strong>quelques démonstrations réussies</strong> (généralement 2 à 4 paires <em>Entrée ➔ Sortie</em>) pour que l&apos;IA comprenne immédiatement le schéma exact à reproduire.
        </p>

        {/* Analogie concrète */}
        <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/70 p-5 space-y-2">
          <div className="flex items-center gap-2 text-blue-900 font-black text-sm uppercase">
            <span>💡 L&apos;analogie du nouveau développeur dans l&apos;équipe</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            Quand un stagiaire ou un collègue junior rejoint votre équipe, si vous lui dites simplement : <em>« Rédige les messages de commit »</em>, il va écrire ce qui lui passe par la tête (ex: <em>« correction bug »</em>, <em>« mise à jour »</em>).<br />
            Mais si vous lui montrez :<br />
            &bull; <em>Exemple 1 : « Ajout du bouton de login » ➔ <code>feat(auth): add login button</code></em><br />
            &bull; <em>Exemple 2 : « Réparation de la marge du footer » ➔ <code>fix(ui): adjust footer padding</code></em><br />
            En 10 secondes, sans lire un manuel de 50 pages, il a compris le format et l&apos;applique à son propre travail. C&apos;est <strong>exactement</strong> ce que fait le Few-shot avec l&apos;IA !
          </p>
        </div>

        {/* Échelle comparative */}
        <div className="grid gap-4 text-center grid-cols-1 sm:grid-cols-2">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1 min-w-0">
            <span className="text-xs font-black uppercase text-slate-600">Zero-shot (0 exemple)</span>
            <p className="text-sm font-bold text-slate-900">Demande directe</p>
            <p className="text-xs text-slate-600">Pour les tâches universelles où la convention est déjà connue de l&apos;IA.</p>
          </div>
          <div className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/40 shadow-sm space-y-1 min-w-0">
            <span className="text-xs font-black uppercase text-indigo-700">One-shot (1 exemple)</span>
            <p className="text-sm font-bold text-slate-900">Le gabarit de départ</p>
            <p className="text-xs text-slate-600">Pour imposer la forme d&apos;un fichier ou d&apos;une réponse très simple.</p>
          </div>
          <div className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/40 shadow-sm space-y-1 min-w-0">
            <span className="text-xs font-black uppercase text-purple-700">Few-shot (2 à 5 exemples)</span>
            <p className="text-sm font-bold text-slate-900">Le calibrage d&apos;expert</p>
            <p className="text-xs text-slate-600">Pour lever les ambiguïtés, traiter les cas particuliers et fixer un style.</p>
          </div>
        </div>
      </section>

      {/* 2. Pourquoi le Few-shot bat le Zero-shot sur les règles maison */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Pourquoi un bon exemple vaut 10 lignes d&apos;explications
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Expliquer avec des mots abstraits une convention de code complexe est long, verbeux et sujet à interprétation. En fournissant des exemples concrets, l&apos;IA extrait automatiquement les règles sous-jacentes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 space-y-3 min-w-0">
            <span className="text-xs font-black uppercase text-rose-800">❌ Approche verbeuse sans exemple</span>
            <div className="text-xs text-slate-700 leading-relaxed font-mono bg-white p-3.5 rounded-xl border border-rose-200 break-all">
              « Transforme mes erreurs API. Si c&apos;est une erreur de validation, mets un code 422 avec le préfixe ERR_VAL et une description amicale. Si c&apos;est une erreur d&apos;autorisation, utilise le code 403 avec le préfixe ERR_AUTH... »
            </div>
            <p className="text-xs text-slate-600">
              Facile d&apos;oublier une règle, et l&apos;IA risque d&apos;inventer des structures d&apos;objets inattendues.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 space-y-3 min-w-0">
            <span className="text-xs font-black uppercase text-emerald-800">✅ Approche Few-shot limpide</span>
            
            {/* Boîte de prompt sans pre rigide pour adaptation 100% responsive */}
            <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-2 text-xs font-mono shadow-inner">
              <div className="text-slate-500 font-sans font-semibold text-[11px] uppercase tracking-wider">
                Consigne avec exemples :
              </div>
              <div className="space-y-1.5 text-slate-800">
                <div className="p-2 rounded bg-slate-50 border border-slate-200 space-y-0.5">
                  <div className="font-semibold text-slate-900">• &quot;Email invalide&quot; ➔</div>
                  <div className="text-emerald-700 font-semibold break-all pl-2">
                    &#123; code: 422, tag: &quot;ERR_VAL&quot;, msg: &quot;Email invalide&quot; &#125;
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200 space-y-0.5">
                  <div className="font-semibold text-slate-900">• &quot;Token expiré&quot; ➔</div>
                  <div className="text-emerald-700 font-semibold break-all pl-2">
                    &#123; code: 403, tag: &quot;ERR_AUTH&quot;, msg: &quot;Session terminée&quot; &#125;
                  </div>
                </div>

                <div className="pt-1 font-semibold text-slate-900">
                  À toi pour : <span className="text-indigo-700 font-bold">&quot;Mot de passe trop court&quot;</span>
                </div>
              </div>
            </div>

            {/* Réponse déduite par l'IA */}
            <div className="rounded-xl bg-emerald-100/90 border border-emerald-300 p-3 space-y-1">
              <div className="font-bold text-[11px] uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 font-sans">
                <span>🎯</span>
                <span>Réponse déduite instantanément par l&apos;IA :</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-emerald-300 font-mono text-xs text-emerald-900 font-bold break-all">
                &#123; code: 422, tag: &quot;ERR_VAL&quot;, msg: &quot;Mot de passe trop court&quot; &#125;
              </div>
            </div>

            <p className="text-xs text-slate-700">
              L&apos;IA saisit instantanément le type d&apos;erreur (validation ➔ 422), le préfixe (<code className="font-mono text-emerald-800">ERR_VAL</code>) et la structure JSON sans aucune hésitation ni ambiguïté.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Anatomie d'un prompt Few-shot dans l'IDE */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Les 4 zones d&apos;un prompt Few-shot réussi
        </h2>

        {/* Boîte de prompt sans balise pre pour adaptation 100% responsive */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-4 shadow-inner min-w-0 max-w-full break-words [overflow-wrap:anywhere]">
          <div className="space-y-1 border-b border-slate-800 pb-3">
            <span className="text-indigo-400 font-bold uppercase text-[11px] tracking-wider block">[1. LA CONSIGNE GÉNÉRALE]</span>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed break-words">
              Tu es un assistant de refactorisation. Convertis ces fonctions JavaScript en TypeScript strict avec typage et docstring.
            </p>
          </div>

          <div className="space-y-2 border-b border-slate-800 pb-3">
            <span className="text-emerald-400 font-bold uppercase text-[11px] tracking-wider block">
              [2. LES EXEMPLES TYPES (Cas nominal & cas avec paramètre optionnel)]
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 break-words">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Exemple 1 (Nominal)</span>
                <div className="text-slate-400 text-[11px]">Entrée :</div>
                <div className="text-amber-300 font-semibold break-all bg-slate-900 p-1.5 rounded border border-slate-800">
                  function add(a, b) &#123; return a + b; &#125;
                </div>
                <div className="text-slate-400 text-[11px]">Sortie TypeScript :</div>
                <div className="text-emerald-300 font-semibold break-all bg-slate-900 p-2 rounded border border-slate-800 space-y-0.5 leading-relaxed">
                  <div className="text-slate-500">/** Calcule la somme */</div>
                  <div>export function add(a: number, b: number): number &#123;</div>
                  <div className="pl-3">return a + b;</div>
                  <div>&#125;</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 break-words">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Exemple 2 (Paramètre par défaut)</span>
                <div className="text-slate-400 text-[11px]">Entrée :</div>
                <div className="text-amber-300 font-semibold break-all bg-slate-900 p-1.5 rounded border border-slate-800">
                  function greet(name) &#123; return &quot;Hello &quot; + (name || &quot;Guest&quot;); &#125;
                </div>
                <div className="text-slate-400 text-[11px]">Sortie TypeScript :</div>
                <div className="text-emerald-300 font-semibold break-all bg-slate-900 p-2 rounded border border-slate-800 space-y-0.5 leading-relaxed">
                  <div className="text-slate-500">/** Salutation */</div>
                  <div>export function greet(name: string = &quot;Guest&quot;): string &#123;</div>
                  <div className="pl-3">return `Hello $&#123;name&#125;`;</div>
                  <div>&#125;</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 border-b border-slate-800 pb-3">
            <span className="text-amber-400 font-bold uppercase text-[11px] tracking-wider block">[3. LA CIBLE À TRAITER]</span>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] block">Entrée à convertir :</span>
              <div className="text-amber-300 font-bold break-all bg-slate-900 p-2 rounded border border-slate-800">
                function multiply(x, factor) &#123; return x * (factor ?? 1); &#125;
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sky-400 font-bold uppercase text-[11px] tracking-wider">[4. DÉCLENCHEUR DE SORTIE]</span>
            <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-300 font-bold text-xs">Sortie :</span>
          </div>
        </div>
      </section>

      {/* 4. Les 3 Pièges classiques du Few-shot */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Les 3 pièges à éviter quand on débute
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 min-w-0">
            <span className="inline-block px-2.5 py-1 rounded bg-rose-100 text-rose-800 font-black text-xs">Piège 1 : Les exemples contradictoires</span>
            <p className="text-xs text-slate-700">
              Si votre premier exemple utilise des guillemets doubles <code>&quot;valeur&quot;</code> et le deuxième des guillemets simples <code>&apos;valeur&apos;</code>, l&apos;IA sera confuse et choisira au hasard. Vos exemples doivent être <strong>rigoureusement uniformes</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 min-w-0">
            <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-black text-xs">Piège 2 : Le biais de récence</span>
            <p className="text-xs text-slate-700">
              L&apos;IA accorde naturellement une importance plus forte au <strong>dernier exemple</strong> juste avant la consigne cible. Veillez à ce que le dernier exemple ne soit pas une anomalie bizarre.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 min-w-0">
            <span className="inline-block px-2.5 py-1 rounded bg-indigo-100 text-indigo-800 font-black text-xs">Piège 3 : Trop d&apos;exemples</span>
            <p className="text-xs text-slate-700">
              Ajouter 15 exemples n&apos;apporte rien de plus que 3 exemples bien choisis, mais consomme 5 fois plus de tokens et ralentit la réponse de l&apos;IDE. <strong>2 à 4 exemples suffisent dans 95% des cas</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Intégration en code (TypeScript & Gemini API) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Comment intégrer le Few-shot dans votre code (Exemple complet)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dans une application Node.js ou un script d&apos;assistance, le prompt Few-shot se construit avec un gabarit de texte dynamique (template literal) :
        </p>

        {/* Code sans balise pre pour adaptation 100% responsive */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 shadow-inner min-w-0 max-w-full break-words [overflow-wrap:anywhere]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 text-xs font-sans font-semibold">Fichier : services/commitHelper.ts</span>
            <span className="text-indigo-400 text-xs font-bold font-sans">Template Few-shot</span>
          </div>
          
          <div className="space-y-2 leading-relaxed">
            <div>
              <span className="text-purple-400">export function</span> <span className="text-blue-400">buildCommitPrompt</span>(rawMessage: <span className="text-emerald-400">string</span>): <span className="text-emerald-400">string</span> &#123;
            </div>
            <div className="pl-4 text-slate-300">
              <span className="text-purple-400">const</span> prompt = <span className="text-amber-300">{`\``}</span>
            </div>

            <div className="pl-4 sm:pl-6 space-y-2 my-2 border-l-2 border-indigo-500/40">
              <div className="text-slate-300 text-xs italic">
                Tu es un assistant Git. Transforme le message brut en commit conventionnel.
              </div>

              <div className="text-indigo-300 font-bold text-[11px] uppercase tracking-wider font-sans pt-1">
                EXEMPLES DE RÉFÉRENCE :
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-0.5 text-xs">
                <div className="text-slate-400">Entrée : <span className="text-slate-200">&quot;j&apos;ai réglé le crash de la navbar sur mobile&quot;</span></div>
                <div className="text-emerald-400 font-semibold break-all">Sortie : fix(navbar): resolve mobile crash on orientation change</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-0.5 text-xs">
                <div className="text-slate-400">Entrée : <span className="text-slate-200">&quot;création de la route pour exporter les factures en pdf&quot;</span></div>
                <div className="text-emerald-400 font-semibold break-all">Sortie : feat(billing): add pdf invoice export endpoint</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-0.5 text-xs">
                <div className="text-slate-400">Entrée : <span className="text-slate-200">&quot;mise à jour des dépendances dans package.json&quot;</span></div>
                <div className="text-emerald-400 font-semibold break-all">Sortie : chore(deps): upgrade outdated packages</div>
              </div>

              <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-900/60 space-y-1 text-xs pt-2">
                <div className="text-indigo-300 font-bold uppercase text-[10px] font-sans">NOUVELLE DEMANDE CIBLE :</div>
                <div className="text-slate-200">Entrée : &quot;&#36;&#123;rawMessage&#125;&quot;</div>
                <div className="text-emerald-400 font-bold flex items-center gap-2">
                  <span>Sortie :</span>
                  <span className="text-[10px] font-normal text-slate-400 font-sans italic">(laissé vide : l&apos;IA prend le relais ici)</span>
                </div>
              </div>
            </div>

            <div className="pl-4 text-slate-300">
              <span className="text-amber-300">{`\``}</span>;
            </div>
            <div className="pl-4 text-slate-300">
              <span className="text-purple-400">return</span> prompt;
            </div>
            <div>&#125;</div>
          </div>
        </div>

        <Callout type="tip" title="Astuce d'orchestration">
          Vous pouvez stocker ces paires d&apos;exemples dans un petit fichier JSON séparé de configuration. Ainsi, votre équipe peut enrichir les exemples sans toucher au code TypeScript !
        </Callout>
      </section>

      {/* 6. Checklist interactive */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur le Few-shot"
          items={[
            "Je sais que 'Few-shot' consiste à fournir 2 à 4 exemples représentatifs dans le prompt.",
            "Je comprends pourquoi le Few-shot est idéal pour imposer un format de code ou une convention d'équipe.",
            "Je structure mes exemples sous la forme claire 'Entrée : ...' ➔ 'Sortie : ...'.",
            "J'évite les pièges : j'utilise des exemples cohérents entre eux et je ne surcharge pas inutilement le prompt en tokens.",
            "Je sais que 3 exemples bien ciblés sont plus efficaces que 20 exemples répétitifs."
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
            title="Question 1 — Nombre optimal d'exemples"
            question="Combien d'exemples est-il généralement recommandé de fournir dans un prompt Few-shot pour une tâche de code standard ?"
            options={[
              "10 à 25 exemples pour que l'IA soit absolument certaine",
              "2 à 4 exemples bien choisis et cohérents",
              "Au moins 100 exemples sinon le modèle ne comprend pas"
            ]}
            correctIndex={1}
            explanation="Exactement ! 2 à 4 exemples de qualité couvrent la majorité des cas sans saturer la fenêtre de contexte ni exploser la facture de tokens."
          />

          <QuickQuiz
            title="Question 2 — Sélection des cas"
            question="Pour apprendre à l'IA à formater des numéros de téléphone internationaux, quels exemples devez-vous prioriser ?"
            options={[
              "5 fois le même numéro français standard",
              "Un panel diversifié : un numéro français classique, un numéro avec indicatif américain, et un numéro court ou mal espacé",
              "Uniquement des numéros erronés"
            ]}
            correctIndex={1}
            explanation="Très bien ! La diversité des exemples permet à l'IA d'apprendre la règle générale et de savoir comment réagir face aux variantes et cas particuliers."
          />
        </div>
      </section>
    </div>
  );
};
