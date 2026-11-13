'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 10 — Prompt Chaining
        </h1>
      </div>

      {/* 1. Définition et Intérêts */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi chaîner des prompts ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Tenter de tout résoudre en un seul prompt monolithique (« Lis ce code de 500 lignes, trouve les failles de sécurité, écris les tests unitaires et rédige la documentation ») aboutit presque systématiquement à des réponses superficielles, incomplètes ou erronées.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le <strong>Prompt Chaining</strong> (ou chaînage de prompts) consiste à <strong>relier plusieurs prompts distincts</strong> au sein d&apos;un workflow automatisé, où chaque prompt se concentre sur une micro-responsabilité précise.
        </p>

        <div className="grid gap-4 mt-2 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h4 className="font-bold text-indigo-900 mb-1 flex items-center gap-2">
              <Icon name="cpu-chip" className="w-4 h-4 text-indigo-600" />
              Précision maximale
            </h4>
            <p className="text-xs text-slate-700">Chaque modèle se concentre sur un périmètre restreint sans saturation cognitive.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-2">
              <Icon name="shield-check" className="w-4 h-4 text-emerald-600" />
              Contrôle qualité étanche
            </h4>
            <p className="text-xs text-slate-700">Chaque résultat intermédiaire peut être validé (schéma Zod, regex) avant de poursuivre.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-2">
              <Icon name="arrow-path" className="w-4 h-4 text-amber-600" />
              Isolation des pannes
            </h4>
            <p className="text-xs text-slate-700">Si l&apos;étape 3 échoue, on peut relancer uniquement l&apos;étape 3 sans recalculer l&apos;ensemble.</p>
          </div>
        </div>
      </section>

      {/* 2. Chaining vs Decomposition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Décomposition de prompt vs Chaînage de prompt
        </h2>
        {/* Version desktop & tablette */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 text-xs sm:text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Prompt Decomposition (Chapitre 4)</th>
                <th className="p-3.5 border border-slate-200">Prompt Chaining (Chapitre 10)</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Nature</td>
                <td className="p-3.5 border border-slate-200">Méthode d&apos;analyse intellectuelle</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Architecture technique d&apos;exécution</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Exécution</td>
                <td className="p-3.5 border border-slate-200">Peut avoir lieu au sein d&apos;un seul prompt ou plan d&apos;action</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Implique plusieurs appels de modèles distincts connectés</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Passage de données</td>
                <td className="p-3.5 border border-slate-200">Géré implicitement dans le fil de discussion</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Géré explicitement via du code (JSON, parseurs, variables)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Version mobile adaptée : cartes empilées sans aucun scrollbar */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Nature</span>
            <div className="text-xs text-slate-700"><strong className="text-slate-900">Décomposition :</strong> Méthode d&apos;analyse intellectuelle</div>
            <div className="text-xs text-indigo-900 font-semibold"><strong className="text-indigo-950">Chaînage :</strong> Architecture technique d&apos;exécution</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Exécution</span>
            <div className="text-xs text-slate-700"><strong className="text-slate-900">Décomposition :</strong> Peut avoir lieu au sein d&apos;un seul prompt ou plan d&apos;action</div>
            <div className="text-xs text-indigo-900 font-semibold"><strong className="text-indigo-950">Chaînage :</strong> Implique plusieurs appels de modèles distincts connectés</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Passage de données</span>
            <div className="text-xs text-slate-700"><strong className="text-slate-900">Décomposition :</strong> Géré implicitement dans le fil de discussion</div>
            <div className="text-xs text-indigo-900 font-semibold"><strong className="text-indigo-950">Chaînage :</strong> Géré explicitement via du code (JSON, parseurs, variables)</div>
          </div>
        </div>
      </section>

      {/* 3. Les 4 types de chaînage */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 4 architectures de chaînage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl">
            <h4 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              Chaînage séquentiel
            </h4>
            <p className="text-sm text-slate-700 mt-2">
              Chaque étape s&apos;exécute après la fin de la précédente : <em>A → B → C</em>. Idéal pour les pipelines de transformation (ex: Extraction → Traduction → Synthèse).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl">
            <h4 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs">2</span>
              Chaînage parallèle (Fan-out / Fan-in)
            </h4>
            <p className="text-sm text-slate-700 mt-2">
              Plusieurs prompts s&apos;exécutent simultanément via <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">Promise.all()</code> pour analyser différents aspects, puis un prompt de synthèse regroupe les constats.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl">
            <h4 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-600 text-white flex items-center justify-center text-xs">3</span>
              Chaînage conditionnel (Routage)
            </h4>
            <p className="text-sm text-slate-700 mt-2">
              Le résultat de l&apos;étape 1 oriente l&apos;exécution vers la branche A ou la branche B (ex: si le document contient du code SQL → router vers l&apos;analyseur SQL, sinon vers l&apos;analyseur API REST).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl">
            <h4 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center text-xs">4</span>
              Chaînage avec boucle de vérification
            </h4>
            <p className="text-sm text-slate-700 mt-2">
              Un prompt de production et un prompt de validation collaborent : tant que le score de validation est inférieur à 80/100, la boucle régénère avec les retours critiques (avec un plafond d&apos;itérations fixé à 3 pour éviter les boucles infinies).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Le Workflow Documentaire Complet en 5 Étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Exemple canonique : Le pipeline documentaire en 5 étapes
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs font-mono">Prompt 1</span>
              <span>Compréhension et typologie</span>
            </div>
            <p className="text-xs text-slate-700 mt-1">Identifie le type de fichier, la langue, le sujet et vérifie si le document est exploitable.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs font-mono">Prompt 2</span>
              <span>Extraction normalisée</span>
            </div>
            <p className="text-xs text-slate-700 mt-1">Extrait les entités clés (classes, fonctions, variables d&apos;environnement, dépendances) sous forme d&apos;objet JSON validé.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs font-mono">Prompt 3</span>
              <span>Analyse technique approfondie</span>
            </div>
            <p className="text-xs text-slate-700 mt-1">Évalue la sécurité, les performances et le respect des normes architecturales.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs font-mono">Prompt 4</span>
              <span>Vérification indépendante</span>
            </div>
            <p className="text-xs text-slate-700 mt-1">Compare les constats de l&apos;étape 3 avec le document source original pour filtrer les faux positifs.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs font-mono">Prompt 5</span>
              <span>Génération du rapport exécutif</span>
            </div>
            <p className="text-xs text-slate-700 mt-1">Synthétise les constats validés dans un format lisible pour les décideurs ou l&apos;équipe technique.</p>
          </div>
        </div>

        <Callout type="note">
          <strong>Transmission de la source :</strong> Remarquez que l&apos;étape 4 reçoit le résultat de l&apos;étape 3 <strong>ET</strong> le document source initial. Si l&apos;on transmettait seulement le résumé de l&apos;étape 3, le vérificateur ne disposerait d&apos;aucune base pour infirmer une hallucination.
        </Callout>
      </section>

      {/* 5. Implémentation Node.js Express + Gemini */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation complète : Orchestrateur Node.js & Gemini
        </h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 shadow-xl min-w-0 max-w-full break-words [overflow-wrap:anywhere]">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-indigo-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              api/pipeline-chain.ts
            </span>
            <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[11px] text-slate-300">Express + Zod + @google/genai</span>
          </div>

          <div className="space-y-1.5 leading-relaxed break-words">
            <div>
              <span className="text-purple-400 font-semibold">import</span> express <span className="text-purple-400 font-semibold">from</span> <span className="text-emerald-400">&apos;express&apos;</span>;
            </div>
            <div>
              <span className="text-purple-400 font-semibold">import</span> &#123; GoogleGenAI &#125; <span className="text-purple-400 font-semibold">from</span> <span className="text-emerald-400">&apos;@google/genai&apos;</span>;
            </div>
            <div>
              <span className="text-purple-400 font-semibold">import</span> &#123; z &#125; <span className="text-purple-400 font-semibold">from</span> <span className="text-emerald-400">&apos;zod&apos;</span>;
            </div>
            <div className="py-1"></div>
            <div>
              <span className="text-purple-400 font-semibold">const</span> app = express();
            </div>
            <div>app.use(express.json());</div>
            <div className="py-1"></div>
            <div>
              <span className="text-purple-400 font-semibold">const</span> ai = <span className="text-purple-400 font-semibold">new</span> <span className="text-yellow-300 font-semibold">GoogleGenAI</span>();
            </div>
            <div className="py-1"></div>
            <div className="text-slate-500 italic">// Schéma de validation pour l&apos;étape d&apos;extraction</div>
            <div>
              <span className="text-purple-400 font-semibold">const</span> ExtractionSchema = z.object(&#123;
              <div className="pl-3 sm:pl-4">
                langage: z.string(),
              </div>
              <div className="pl-3 sm:pl-4">
                framework: z.string().optional(),
              </div>
              <div className="pl-3 sm:pl-4">
                points_d_entree: z.array(z.string()),
              </div>
              <div className="pl-3 sm:pl-4">
                endpoints_detectes: z.array(z.string()),
              </div>
              &#125;);
            </div>
            <div className="py-1"></div>
            <div>
              app.<span className="text-blue-400">post</span>(<span className="text-emerald-400">&apos;/api/pipeline-chain&apos;</span>, <span className="text-purple-400 font-semibold">async</span> (req, res) =&gt; &#123;
            </div>
            <div className="pl-3 sm:pl-4 border-l border-slate-800/60 ml-1 space-y-1.5">
              <div>
                <span className="text-purple-400 font-semibold">try</span> &#123;
              </div>
              <div className="pl-3 sm:pl-4 border-l border-slate-800/60 ml-1 space-y-1.5">
                <div>
                  <span className="text-purple-400 font-semibold">const</span> &#123; sourceCode &#125; = req.body;
                </div>
                <div>
                  <span className="text-purple-400 font-semibold">if</span> (!sourceCode) <span className="text-purple-400 font-semibold">return</span> res.status(<span className="text-amber-300">400</span>).json(&#123; error: <span className="text-emerald-400">&apos;Code manquant.&apos;</span> &#125;);
                </div>

                <div className="pt-2 text-slate-500 italic">// ÉTAPE 1 : Extraction structurée</div>
                <div>
                  <span className="text-purple-400 font-semibold">const</span> prompt1 = <span className="text-emerald-400">`</span>
                </div>
                <div className="pl-3 text-emerald-300/90 text-[11px] sm:text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 my-1 space-y-1">
                  <div>Extrais les métadonnées techniques du code sous format JSON :</div>
                  <div>- langage, framework, points_d_entree, endpoints_detectes</div>
                  <div className="pt-1 text-slate-400 font-semibold text-[11px]">CODE :</div>
                  <div className="text-sky-300">$&#123;sourceCode&#125;</div>
                </div>
                <div><span className="text-emerald-400">`</span>;</div>

                <div className="py-1">
                  <span className="text-purple-400 font-semibold">const</span> res1 = <span className="text-purple-400 font-semibold">await</span> ai.models.generateContent(&#123;
                  <div className="pl-3 sm:pl-4">
                    model: <span className="text-emerald-400">&apos;gemini-3.5-flash-lite&apos;</span>,
                  </div>
                  <div className="pl-3 sm:pl-4">
                    contents: prompt1,
                  </div>
                  <div className="pl-3 sm:pl-4">
                    config: &#123; responseMimeType: <span className="text-emerald-400">&apos;application/json&apos;</span> &#125;,
                  </div>
                  &#125;);
                </div>

                <div className="pt-1 text-slate-500 italic">// Validation Zod de l&apos;étape intermédiaire</div>
                <div>
                  <span className="text-purple-400 font-semibold">const</span> donneesExtraites = ExtractionSchema.parse(JSON.parse(res1.text));
                </div>

                <div className="pt-2 text-slate-500 italic">// ÉTAPE 2 : Analyse ciblée sur les endpoints détectés</div>
                <div>
                  <span className="text-purple-400 font-semibold">const</span> prompt2 = <span className="text-emerald-400">`</span>
                </div>
                <div className="pl-3 text-emerald-300/90 text-[11px] sm:text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 my-1 space-y-1">
                  <div>Analyse la sécurité de ces endpoints : <span className="text-sky-300">$&#123;JSON.stringify(donneesExtraites.endpoints_detectes)&#125;</span></div>
                  <div>En te basant sur ce code source :</div>
                  <div className="text-sky-300">$&#123;sourceCode&#125;</div>
                </div>
                <div><span className="text-emerald-400">`</span>;</div>

                <div className="py-1">
                  <span className="text-purple-400 font-semibold">const</span> res2 = <span className="text-purple-400 font-semibold">await</span> ai.models.generateContent(&#123;
                  <div className="pl-3 sm:pl-4">
                    model: <span className="text-emerald-400">&apos;gemini-3.5-flash-lite&apos;</span>,
                  </div>
                  <div className="pl-3 sm:pl-4">
                    contents: prompt2,
                  </div>
                  &#125;);
                </div>
                <div>
                  <span className="text-purple-400 font-semibold">const</span> rapportSecurite = res2.text;
                </div>

                <div className="pt-2 text-slate-500 italic">// ÉTAPE 3 : Synthèse finale</div>
                <div>
                  <span className="text-purple-400 font-semibold">const</span> prompt3 = <span className="text-emerald-400">`</span>
                </div>
                <div className="pl-3 text-emerald-300/90 text-[11px] sm:text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 my-1 space-y-1">
                  <div>Rédige une synthèse exécutive de 3 paragraphes pour le CTO basée sur :</div>
                  <div>- Métadonnées : <span className="text-sky-300">$&#123;JSON.stringify(donneesExtraites)&#125;</span></div>
                  <div>- Analyse : <span className="text-sky-300">$&#123;rapportSecurite&#125;</span></div>
                </div>
                <div><span className="text-emerald-400">`</span>;</div>

                <div className="py-1">
                  <span className="text-purple-400 font-semibold">const</span> res3 = <span className="text-purple-400 font-semibold">await</span> ai.models.generateContent(&#123;
                  <div className="pl-3 sm:pl-4">
                    model: <span className="text-emerald-400">&apos;gemini-3.5-flash-lite&apos;</span>,
                  </div>
                  <div className="pl-3 sm:pl-4">
                    contents: prompt3,
                  </div>
                  &#125;);
                </div>

                <div className="py-1">
                  <span className="text-purple-400 font-semibold">return</span> res.json(&#123;
                  <div className="pl-3 sm:pl-4">
                    etape1: donneesExtraites,
                  </div>
                  <div className="pl-3 sm:pl-4">
                    etape2: rapportSecurite,
                  </div>
                  <div className="pl-3 sm:pl-4">
                    synthese: res3.text,
                  </div>
                  &#125;);
                </div>
              </div>
              <div>
                &#125; <span className="text-purple-400 font-semibold">catch</span> (error) &#123;
              </div>
              <div className="pl-3 sm:pl-4 border-l border-slate-800/60 ml-1">
                <span className="text-purple-400 font-semibold">return</span> res.status(<span className="text-amber-300">500</span>).json(&#123; error: (error <span className="text-purple-400 font-semibold">as</span> Error).message &#125;);
              </div>
              <div>&#125;</div>
            </div>
            <div>&#125;);</div>
          </div>
        </div>
      </section>

      {/* TP */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Travaux pratiques (TP 3.37 à 3.40)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.37</span>
            <h4 className="font-bold text-slate-950">Chaîne séquentielle simple</h4>
            <p className="text-xs text-slate-700">
              Mettez en place un pipeline en 3 étapes : (1) extraction des dépendances <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">package.json</code>, (2) détection des versions obsolètes, (3) rédaction d&apos;une commande de mise à jour.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.38</span>
            <h4 className="font-bold text-slate-950">Chaîne parallèle avec Promise.all</h4>
            <p className="text-xs text-slate-700">
              Lancez simultanément l&apos;analyse de sécurité et l&apos;analyse de performance d&apos;un fichier source, puis consolidez les rapports dans un prompt final.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.39</span>
            <h4 className="font-bold text-slate-950">Routage conditionnel</h4>
            <p className="text-xs text-slate-700">
              Créez un routeur qui classe une requête utilisateur (requête HTTP, requête Base de données, test unitaire) et l&apos;envoie vers le prompt spécialisé adéquat.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.40</span>
            <h4 className="font-bold text-slate-950">Pipeline avec boucle de retry</h4>
            <p className="text-xs text-slate-700">
              Implémentez un vérificateur qui redemande une correction si le code produit ne passe pas la validation syntaxique ou Zod, avec un maximum de 3 tentatives.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist interactive */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur le Prompt Chaining"
          items={[
            "Je comprends la différence entre Décomposition (logique) et Chaînage (pipeline d'exécution en code).",
            "Je sais orchestrer des appels en chaîne où la sortie de l'étape 1 alimente l'étape 2.",
            "J'utilise Promise.all() pour paralléliser les prompts indépendants et diviser le temps de latence.",
            "Je valide chaque étape intermédiaire avec Zod pour stopper immédiatement la propagation d'erreurs.",
            "Je sais implémenter un aiguillage conditionnel pour router chaque requête vers l'agent adéquat."
          ]}
        />
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Maîtrise du Prompt Chaining
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 10"
          questions={[
            {
              id: 1,
              question: 'Que risque-t-on si un résultat intermédiaire dans une chaîne de prompts n\'est pas validé par un schéma strict (ex: Zod) ?',
              options: [
                'Le modèle IA refuse d\'exécuter le prompt suivant.',
                'Une erreur ou hallucination de l\'étape n sera transmise comme vérité absolue à l\'étape n+1 (effet boule de neige).',
                'Le temps d\'exécution est divisé par deux.',
                'Le prompt suivant consommera moins de jetons.'
              ],
              correctIndex: 1,
              explanation: 'Sans validation stricte, les erreurs se propagent et s\'amplifient au fil de la chaîne, rendant le résultat final totalement imprévisible.'
            },
            {
              id: 2,
              question: 'Quand doit-on préférer un chaînage parallèle à un chaînage séquentiel ?',
              options: [
                'Quand l\'étape B dépend directement du résultat généré par l\'étape A.',
                'Quand deux analyses distinctes n\'ont pas de dépendance réciproque et s\'appuient sur le même document initial.',
                'Quand on utilise une boucle while sans condition de sortie.',
                'Uniquement si l\'API refuse les requêtes asynchrones.'
              ],
              correctIndex: 1,
              explanation: 'Lorsque les analyses sont indépendantes (ex: sécurité d\'un côté, lisibilité de l\'autre), l\'exécution en parallèle réduit drastiquement le temps de latence global.'
            }
          ]}
        />
      </section>
    </div>
  );
};

