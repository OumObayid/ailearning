'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { Icon } from '@/components/common/Icon';

export const Chapitre11Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 11 — Gestion des erreurs et des incertitudes
        </h1>
      </div>

      {/* 1. Distinction fondamentale */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Distinguer Erreur, Incertitude et Limitation
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="p-5 bg-white border-2 border-rose-200 rounded-2xl">
            <div className="text-rose-700 font-black text-base flex items-center gap-2 mb-2">
              <Icon name="x-circle" className="w-5 h-5" />
              <span>Erreur (Faute)</span>
            </div>
            <p className="text-xs text-slate-700">
              Une affirmation fausse ou en contradiction avec les faits réels du code (ex: affirmer qu&apos;une fonction utilise bcrypt alors qu&apos;elle utilise sha256).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-amber-200 rounded-2xl">
            <div className="text-amber-700 font-black text-base flex items-center gap-2 mb-2">
              <Icon name="question-mark-circle" className="w-5 h-5" />
              <span>Incertitude (Doute légitime)</span>
            </div>
            <p className="text-xs text-slate-700">
              Une situation où les données fournies sont incomplètes, équivoques ou contradictoires, empêchant d&apos;aboutir à une certitude absolue.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl">
            <div className="text-indigo-700 font-black text-base flex items-center gap-2 mb-2">
              <Icon name="shield-exclamation" className="w-5 h-5" />
              <span>Limitation (Frontière du modèle)</span>
            </div>
            <p className="text-xs text-slate-700">
              Une borne inhérente au système (fenêtre de contexte limitée, absence d&apos;accès au réseau temps réel, modèle déconnecté).
            </p>
          </div>
        </div>

        <Callout type="danger">
          <strong>Le danger suprême : l&apos;hallucination masquée.</strong> Le pire comportement d&apos;un agent IA dans un IDE consiste à transformer une incertitude (information manquante) en une certitude inventée de toutes pièces, entraînant des bugs ou des failles silencieuses.
        </Callout>
      </section>

      {/* 2. Les 7 types d'incertitudes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 7 formes d&apos;incertitudes rencontrées dans l&apos;IDE
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Type d&apos;incertitude</th>
                <th className="p-3 border border-slate-200">Exemple concret</th>
                <th className="p-3 border border-slate-200">Comportement professionnel attendu</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold">1. Information manquante</td>
                <td className="p-3 border border-slate-200">Le code fait appel à une fonction externe non fournie.</td>
                <td className="p-3 border border-slate-200">Signaler explicitement l&apos;absence de la signature et refuser de deviner son comportement interne.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">2. Ambiguïté d&apos;instruction</td>
                <td className="p-3 border border-slate-200">« Corrige le bug dans le contrôleur » (alors qu&apos;il y a 4 contrôleurs).</td>
                <td className="p-3 border border-slate-200">Demander une clarification ciblée ou lister les options possibles sans appliquer de modification aveugle.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">3. Contradiction documentaire</td>
                <td className="p-3 border border-slate-200">Le README annonce PostgreSQL 15 mais le docker-compose monte MySQL 8.</td>
                <td className="p-3 border border-slate-200">Mettre en évidence le conflit textuellement et demander l&apos;arbitrage de l&apos;utilisateur.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">4. Obsolescence technique</td>
                <td className="p-3 border border-slate-200">Utilisation d&apos;une bibliothèque dépréciée ou d&apos;un format de hachage obsolète.</td>
                <td className="p-3 border border-slate-200">Préciser la date de dépréciation et suggérer une alternative moderne avec précaution.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">5. Limitation de contexte</td>
                <td className="p-3 border border-slate-200">Un projet de 20 000 lignes de code ne rentre pas dans le prompt.</td>
                <td className="p-3 border border-slate-200">Segmenter l&apos;analyse par modules et indiquer que la vue globale est partielle.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">6. Ressource indisponible</td>
                <td className="p-3 border border-slate-200">Une URL d&apos;API externe ou une base de données locale inaccessible.</td>
                <td className="p-3 border border-slate-200">Fournir un mock ou un plan de contournement sans faire comme si la ressource avait répondu.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">7. Échec technique d&apos;exécution</td>
                <td className="p-3 border border-slate-200">Erreur 429 (Rate limit) ou timeout de l&apos;API du LLM.</td>
                <td className="p-3 border border-slate-200">Activer le retry exponentiel et dégrader gracieusement le service.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. La méthode en 5 étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La méthode de gestion en 5 étapes
        </h2>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 1</span>
            <div className="font-bold text-slate-950 text-sm">Détecter</div>
            <p className="text-xs text-slate-600 mt-1">Repérer les zones d&apos;ombre et les éléments non prouvés.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 2</span>
            <div className="font-bold text-slate-950 text-sm">Classer</div>
            <p className="text-xs text-slate-600 mt-1">Qualifier la nature du doute selon les 7 catégories.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 3</span>
            <div className="font-bold text-slate-950 text-sm">Évaluer</div>
            <p className="text-xs text-slate-600 mt-1">Mesurer l&apos;impact : bloquant ou secondaire ?</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 4</span>
            <div className="font-bold text-slate-950 text-sm">Choisir</div>
            <p className="text-xs text-slate-600 mt-1">Poser une question, formuler une hypothèse explicite ou refuser l&apos;action.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 5</span>
            <div className="font-bold text-slate-950 text-sm">Restituer</div>
            <p className="text-xs text-slate-600 mt-1">Indiquer le niveau de certitude dans le rapport final.</p>
          </div>
        </div>
      </section>

      {/* 4. Prompt professionnel anti-hallucination */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Prompt professionnel : Directive stricte d&apos;intégrité
        </h2>
        <div className="bg-slate-950 text-slate-100 p-4 sm:p-6 rounded-2xl font-mono text-xs sm:text-sm border border-slate-800 shadow-inner space-y-3 break-words min-w-0 max-w-full">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-indigo-400 font-bold uppercase text-[11px] tracking-wider">[DIRECTIVE STRICTE D&apos;INTÉGRITÉ]</span>
            <span className="text-slate-400 text-xs font-sans">Anti-hallucination</span>
          </div>

          <div className="space-y-2.5 text-slate-300">
            <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/60">
              <strong className="text-rose-400 uppercase text-[11px] block">1. INTERDICTION FORMELLE D&apos;INVENTER :</strong>
              <span className="text-rose-200 text-xs">
                Si une information n&apos;apparaît pas expressément dans le code ou la doc source, interdiction de la déduire sans le signaler formellement.
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <strong className="text-amber-400 uppercase text-[11px] block">2. CLASSIFICATION DES CONSTATS :</strong>
              <div className="grid gap-2 text-xs pt-0.5 grid-cols-1 sm:grid-cols-2">
                <div className="p-2 rounded bg-slate-950 border border-emerald-900/60 text-emerald-300">
                  <strong>[CERTITUDE_ELEVEE]</strong> : Vérifié directement par une ligne de code visible.
                </div>
                <div className="p-2 rounded bg-slate-950 border border-amber-900/60 text-amber-300">
                  <strong>[HYPOTHESE_PROBABLE]</strong> : Dépend d&apos;un composant non inspecté.
                </div>
                <div className="p-2 rounded bg-slate-950 border border-rose-900/60 text-rose-300">
                  <strong>[INCERTITUDE]</strong> : Manque d&apos;information ou contradiction.
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <strong className="text-emerald-400 uppercase text-[11px] block">3. FORMAT DE RESTITUTION JSON :</strong>
              <div className="bg-slate-950 p-2 rounded text-emerald-300 font-semibold break-all text-xs">
                &#123; &quot;statut&quot;: &quot;SUCCES&quot; | &quot;INCOMPLET&quot; | &quot;BLOCAGE&quot;, &quot;certitude_globale&quot;: &quot;ELEVEE&quot; | &quot;MOYENNE&quot; | &quot;FAIBLE&quot;, &quot;points_verifies&quot;: [...], &quot;incertitudes_et_manques&quot;: [...] &#125;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gestion des erreurs en backend Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation : Retry exponentiel et validation Zod
        </h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 shadow-xl min-w-0 max-w-full break-words [overflow-wrap:anywhere]">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-indigo-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              services/geminiRetry.ts
            </span>
            <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[11px] text-slate-300">Retry + Backoff + Zod</span>
          </div>

          <div className="space-y-1.5 leading-relaxed break-words">
            <div>
              <span className="text-purple-400 font-semibold">import</span> &#123; GoogleGenAI &#125; <span className="text-purple-400 font-semibold">from</span> <span className="text-emerald-400">&apos;@google/genai&apos;</span>;
            </div>
            <div>
              <span className="text-purple-400 font-semibold">import</span> &#123; z &#125; <span className="text-purple-400 font-semibold">from</span> <span className="text-emerald-400">&apos;zod&apos;</span>;
            </div>
            <div className="py-1"></div>
            <div>
              <span className="text-purple-400 font-semibold">const</span> ai = <span className="text-purple-400 font-semibold">new</span> <span className="text-yellow-300 font-semibold">GoogleGenAI</span>();
            </div>
            <div className="py-1"></div>
            <div className="text-slate-500 italic">// Schéma avec niveaux d&apos;incertitude obligatoires</div>
            <div>
              <span className="text-purple-400 font-semibold">const</span> RapportSchema = z.object(&#123;
              <div className="pl-3 sm:pl-4">
                certitude: z.enum([<span className="text-emerald-400">&apos;ELEVEE&apos;</span>, <span className="text-emerald-400">&apos;MOYENNE&apos;</span>, <span className="text-emerald-400">&apos;FAIBLE&apos;</span>]),
              </div>
              <div className="pl-3 sm:pl-4">
                constats: z.array(z.string()),
              </div>
              <div className="pl-3 sm:pl-4">
                incertitudes: z.array(z.object(&#123;
                <div className="pl-3 sm:pl-4">
                  nature: z.string(),
                </div>
                <div className="pl-3 sm:pl-4">
                  description: z.string(),
                </div>
                <div className="pl-3 sm:pl-4">
                  bloquant: z.boolean(),
                </div>
                &#125;)),
              </div>
              &#125;);
            </div>
            <div className="py-1"></div>
            <div className="text-slate-500 italic">// Fonction d&apos;appel résiliente avec Retry et Exponential Backoff</div>
            <div>
              <span className="text-purple-400 font-semibold">async function</span> <span className="text-blue-400">appelerGeminiAvecRetry</span>(prompt: string, maxRetries = <span className="text-amber-300">3</span>) &#123;
            </div>
            <div className="pl-3 sm:pl-4 border-l border-slate-800/60 ml-1 space-y-1.5">
              <div>
                <span className="text-purple-400 font-semibold">let</span> tentative = <span className="text-amber-300">0</span>;
              </div>
              <div>
                <span className="text-purple-400 font-semibold">let</span> delai = <span className="text-amber-300">1000</span>; <span className="text-slate-500 italic">// 1 seconde</span>
              </div>
              <div className="py-1"></div>
              <div>
                <span className="text-purple-400 font-semibold">while</span> (tentative &lt; maxRetries) &#123;
              </div>
              <div className="pl-3 sm:pl-4 border-l border-slate-800/60 ml-1 space-y-1.5">
                <div>
                  <span className="text-purple-400 font-semibold">try</span> &#123;
                </div>
                <div className="pl-3 sm:pl-4 border-l border-slate-800/60 ml-1 space-y-1.5">
                  <div>
                    <span className="text-purple-400 font-semibold">const</span> response = <span className="text-purple-400 font-semibold">await</span> ai.models.generateContent(&#123;
                    <div className="pl-3 sm:pl-4">
                      model: <span className="text-emerald-400">&apos;gemini-3.5-flash-lite&apos;</span>,
                    </div>
                    <div className="pl-3 sm:pl-4">
                      contents: prompt,
                    </div>
                    <div className="pl-3 sm:pl-4">
                      config: &#123; responseMimeType: <span className="text-emerald-400">&apos;application/json&apos;</span> &#125;,
                    </div>
                    &#125;);
                  </div>

                  <div className="pt-1 text-slate-500 italic">// Validation Zod de la réponse générée</div>
                  <div>
                    <span className="text-purple-400 font-semibold">const</span> donnees = RapportSchema.parse(JSON.parse(response.text!));
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold">return</span> donnees;
                  </div>
                </div>
                <div>
                  &#125; <span className="text-purple-400 font-semibold">catch</span> (err) &#123;
                </div>
                <div className="pl-3 sm:pl-4 border-l border-slate-800/60 ml-1 space-y-1.5">
                  <div>tentative++;</div>
                  <div>
                    console.warn(<span className="text-emerald-400">`Tentative $&#123;tentative&#125;/$&#123;maxRetries&#125; échouée : $&#123;(err <span className="text-purple-400 font-semibold">as</span> Error).message&#125;`</span>);
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold">if</span> (tentative &gt;= maxRetries) <span className="text-purple-400 font-semibold">throw new</span> Error(<span className="text-emerald-400">&apos;Échec définitif du service IA.&apos;</span>);
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold">await new</span> Promise(resolve =&gt; setTimeout(resolve, delai));
                  </div>
                  <div>
                    delai *= <span className="text-amber-300">2</span>; <span className="text-slate-500 italic">// Double le délai (Backoff exponentiel)</span>
                  </div>
                </div>
                <div>&#125;</div>
              </div>
              <div>&#125;</div>
            </div>
            <div>&#125;</div>
          </div>
        </div>
      </section>

      {/* TP */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Travaux pratiques (TP 3.41 à 3.44)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.41</span>
            <h4 className="font-bold text-slate-950">Détecteur de manques</h4>
            <p className="text-xs text-slate-700">
              Fournissez une spécification logicielle volontairement trouée (absence de gestion des timeouts) et exigez de l&apos;IA qu&apos;elle dresse la liste des prérequis manquants sans les inventer.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.42</span>
            <h4 className="font-bold text-slate-950">Arbitrage de contradictions</h4>
            <p className="text-xs text-slate-700">
              Soumettez deux extraits de code contradictoires (un contrôleur qui attend un token JWT dans l&apos;en-tête et un middleware qui le cherche dans un cookie) et faites formuler l&apos;incompatibilité.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.43</span>
            <h4 className="font-bold text-slate-950">Règle de sécurité dans Antigravity</h4>
            <p className="text-xs text-slate-700">
              Ajoutez une directive interdisant à l&apos;agent d&apos;exécuter des commandes de terminal destructrices (<code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">rm -rf</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">git reset --hard</code>) sans confirmation humaine expresse.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.44</span>
            <h4 className="font-bold text-slate-950">Agent résilient complet</h4>
            <p className="text-xs text-slate-700">
              Montez un script Node.js encapsulant la validation Zod, la gestion des erreurs 429 et la restitution structurée des certitudes.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist interactive */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur la Gestion des Incertitudes"
          items={[
            "Je distingue clairement une Erreur (faute), une Incertitude (doute) et une Limitation (frontière système).",
            "J'interdis formellement à l'IA d'extrapoler ou de deviner des signatures de fonctions manquantes.",
            "J'exige une qualification explicite du niveau de certitude pour chaque observation technique.",
            "Je mets en place un mécanisme de retry avec backoff exponentiel pour parer aux erreurs 429 et aux timeouts.",
            "Je sais que reconnaître honnêtement un doute est la marque d'un agent professionnel fiable."
          ]}
        />
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Gestion des incertitudes
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 11"
          questions={[
            {
              id: 1,
              question: 'Quelle est la réaction appropriée d\'un agent professionnel lorsqu\'un fichier d\'entrée est incomplet pour conclure ?',
              options: [
                'Deviner la partie manquante en s\'appuyant sur les conventions les plus fréquentes du web sans rien dire.',
                'Signaler formellement l\'information manquante, qualifier le niveau de certitude comme partiel et demander le document nécessaire.',
                'Refuser immédiatement de démarrer toute analyse, y compris sur les parties parfaitement exploitables.',
                'Affirmer avec certitude que le code est exempt de tout bug.'
              ],
              correctIndex: 1,
              explanation: 'La transparence professionnelle exige de séparer ce qui est validé de ce qui reste inconnu, sans jamais combler les vides par de l\'hallucination non annoncée.'
            },
            {
              id: 2,
              question: 'Pourquoi associer un schéma Zod à la sortie d\'un modèle de langage pour gérer les erreurs ?',
              options: [
                'Zod permet de forcer le typage runtime de la réponse et de rejeter immédiatement toute réponse IA mal formée avant qu\'elle ne pollue l\'application.',
                'Zod remplace l\'utilisation de l\'API Gemini.',
                'Zod garantit que le modèle ne fera jamais d\'erreur logique.',
                'Zod accélère la vitesse de calcul du GPU du modèle.'
              ],
              correctIndex: 0,
              explanation: 'Zod valide la forme et les types au moment de l\'exécution. Si l\'IA omet un champ requis ou renvoie un format invalide, l\'erreur est interceptée proprement par le code backend.'
            }
          ]}
        />
      </section>
    </div>
  );
};

