'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

interface PromptBlock {
  key: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  example: string;
  included: boolean;
}

export const Chapitre3Content: React.FC = () => {
  const [blocks, setBlocks] = useState<PromptBlock[]>([
    {
      key: 'role',
      name: '1. ROLE (Expertise technique)',
      badge: 'Expertise',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      description: 'Définit le domaine d\'expertise et la séniorité exigée pour conditionner les poids du modèle vers un vocabulaire d\'ingénierie rigoureux.',
      example: 'Tu es un ingénieur backend senior spécialisé en Node.js, Express, TypeScript et bases relationnelles MySQL/InnoDB.',
      included: true,
    },
    {
      key: 'objective',
      name: '2. OBJECTIVE (Mission précise)',
      badge: 'Mission',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Fixe l\'objectif unique de la sollicitation en interdisant toute dispersion ou action non sollicitée.',
      example: 'Ta mission est d\'identifier la cause racine d\'une erreur HTTP 500 survenue lors de l\'appel à GET /api/v1/orders/:id, sans modifier le code source.',
      included: true,
    },
    {
      key: 'context',
      name: '3. CONTEXT (Environnement & Stack)',
      badge: 'Environnement',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      description: 'Fournit les versions des runtimes, frameworks, moteurs de bases de données et schémas d\'architecture.',
      example: 'Environnement : Node.js 22.11 LTS, Express 5.0, TypeScript 5.6 (strict: true), MySQL 8.0 hébergé sur AWS RDS avec pool de connexions mysql2/promise.',
      included: true,
    },
    {
      key: 'data',
      name: '4. DATA (Logs, Stack Trace & Code)',
      badge: 'Données Factuelles',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Les preuves brutes : message d\'erreur exact, Stack Trace complète avec numéros de lignes et extraits de code pertinents.',
      example: `Stack Trace :
TypeError: Cannot read properties of undefined (reading 'totalAmount')
    at calculateTax (/app/src/services/orderService.ts:42:25)
    at async getOrderDetails (/app/src/controllers/orderController.ts:18:19)

Code extrait (orderController.ts:15-20) :
const order = await orderService.findById(req.params.id);
const tax = calculateTax(order);`,
      included: true,
    },
    {
      key: 'tasks',
      name: '5. TASKS (Séquence de raisonnement)',
      badge: 'Chain of Thought',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      description: 'Impose une décomposition séquentielle (Chain of Thought) pour forcer le modèle à raisonner avant de conclure.',
      example: '1. Analyse la chaîne d\'appels du contrôleur vers le service.\n2. Identifie pourquoi order peut être undefined.\n3. Formule 3 hypothèses ordonnées par probabilité technique.\n4. Propose un test unitaire Vitest pour reproduire l\'incident.',
      included: true,
    },
    {
      key: 'constraints',
      name: '6. CONSTRAINTS (Garde-fous stricts)',
      badge: 'Garde-fous',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      description: 'Interdictions formelles : pas de modification de code précipitée, pas d\'invention d\'API, pas de patchs de surface type optional chaining.',
      example: 'RÈGLES STRICTES :\n- NE MODIFIE AUCUN FICHIER.\n- N\'invente aucune méthode tierce.\n- Interdiction de proposer un optional chaining superficiel (order?.totalAmount) sans gestion du statut HTTP 404.',
      included: true,
    },
    {
      key: 'output',
      name: '7. OUTPUT FORMAT (Structure du rapport)',
      badge: 'Livrable',
      badgeColor: 'bg-lime-100 text-lime-800 border-lime-300',
      description: 'Formatage imposé du livrable technique pour faciliter l\'intégration dans un ticket Jira ou un rapport post-mortem.',
      example: 'Format de réponse obligatoire en Markdown :\n## 1. Symptôme observé\n## 2. Faits techniques confirmés\n## 3. Hypothèses explicatives\n## 4. Cause racine la plus probable (RCA)\n## 5. Protocole de vérification recommandé',
      included: true,
    },
  ]);

  const toggleBlock = (key: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.key === key ? { ...b, included: !b.included } : b))
    );
  };

  const compiledPrompt = blocks
    .filter((b) => b.included)
    .map((b) => `### ${b.name.toUpperCase()}\n${b.example}`)
    .join('\n\n');

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 6 • Chapitre 3 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Prompt Engineering pour l&apos;Ingénierie Logicielle
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Construire un prompt professionnel de diagnostic : Le Framework d&apos;ingénierie à 7 composants
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Dans la conduite d&apos;une enquête d&apos;incident logiciel, l&apos;IA se comporte exactement comme <strong>un expert judiciaire mandaté par un tribunal</strong> :
          si vous lui dites simplement <em>&quot;Le moteur a calé, répare-le&quot;</em>, vous obtiendrez des conseils génériques, des suppositions hasardeuses ou des réparations de fortune.
          Mais si vous lui remettez un dossier d&apos;expertise complet — modèle exact, historique d&apos;entretien, boîte noire, relevé des pressions, mission d&apos;investigation sans démontage destructif et grille de rapport officielle —,
          vous obtiendrez une <strong>conclusion technique rigoureuse, réfutable et immédiatement actionnable</strong>.
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
            <span>Maîtriser les 7 piliers indispensables d&apos;un prompt de diagnostic : ROLE, OBJECTIVE, CONTEXT, DATA, TASKS, CONSTRAINTS, OUTPUT.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre comment le conditionnement des rôles (Role Priming) canalise l&apos;espace latent du modèle vers une rigueur d&apos;ingénieur senior.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Imposer des contraintes d&apos;étanchéité absolue (interdiction de modifier le code ou de suggérer des faux patchs).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Générer des rapports de Root Cause Analysis (RCA) structurés et directement exploitables en équipe.</span>
          </li>
        </ul>
      </section>

      {/* 2. Pourquoi le prompt informel échoue systématiquement */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Anatomie d&apos;un échec : Le fossé entre prompt informel et prompt d&apos;ingénierie
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          L&apos;erreur la plus fréquente des développeurs utilisant l&apos;IA consiste à traiter le modèle comme un collègue assis à côté d&apos;eux,
          en supposant qu&apos;il devine implicitement leur architecture, leurs versions de bibliothèques et leurs objectifs de sécurité.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
              <span>❌ Le Prompt Informel &quot;Bricolage&quot;</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-rose-300 font-mono text-xs text-slate-800">
              &quot;Mon API Express me renvoie une erreur 500 sur /users. Voici mon code, dis-moi ce qui ne va pas et corrige-le stp.&quot;
            </div>
            <p className="text-xs text-rose-950 font-medium">
              <strong>Conséquences néfastes :</strong> Le modèle n&apos;a ni la Stack Trace, ni la version d&apos;Express, ni la base de données.
              Il va deviner au hasard, inventer un module externe ou injecter un chaînage optionnel <code>user?.id</code> qui masquera l&apos;erreur sans la résoudre.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
              <span>✅ Le Prompt Professionnel d&apos;Ingénierie</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-emerald-300 font-mono text-xs text-slate-800">
              &quot;[ROLE: Senior Backend Engineer] [CONTEXT: Node 22, Express 5, MySQL 8] [DATA: Stack Trace + userService.ts:15] [TASKS: Décomposer l&apos;incident, 3 hypothèses ordonnées] [CONSTRAINTS: Ne modifie aucun fichier]&quot;
            </div>
            <p className="text-xs text-emerald-950 font-medium">
              <strong>Résultat d&apos;excellence :</strong> Le modèle se concentre sur la cause racine précise, documente son raisonnement sans halluciner d&apos;API et propose un test de vérification.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Les 7 Piliers du Framework d'Ingénierie */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les 7 Piliers indispensables d&apos;un Prompt de Diagnostic
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Chaque bloc du framework répond à une exigence cognitive du modèle d&apos;intelligence artificielle :
        </p>

        <div className="space-y-3">
          {blocks.map((block) => (
            <div key={block.key} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-slate-950 text-sm">{block.name}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${block.badgeColor}`}>
                  {block.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{block.description}</p>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap">
                {block.example}
              </div>
            </div>
          ))}
        </div>

        <Callout type="tip" title="Le secret du bloc CONSTRAINTS">
          <p className="text-xs sm:text-sm">
            Les modèles de fondation ont une forte propension naturelle à vouloir &quot;faire plaisir&quot; en réécrivant immédiatement tout le code de façon expéditive.
            Le fait d&apos;écrire explicitement en lettres capitales : <code>NE MODIFIE AUCUN FICHIER. Ne propose aucun code de remplacement avant d&apos;avoir prouvé la cause racine.</code>
            bloque cette dérive et force le LLM à activer ses mécanismes d&apos;analyse causale profonde.
          </p>
        </Callout>
      </section>

      {/* 4. Atelier interactif : Générateur dynamique de prompt */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Atelier interactif : Générateur modulaire de prompt de diagnostic
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Activez ou désactivez les blocs ci-dessous pour observer la structure d&apos;un prompt professionnel complet généré en temps réel :
        </p>

        <div className="flex flex-wrap gap-2 my-3">
          {blocks.map((b) => (
            <button
              key={b.key}
              onClick={() => toggleBlock(b.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                b.included
                  ? 'bg-lime-500 text-slate-950 border-lime-600 shadow-sm'
                  : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{b.included ? '✓' : '+'}</span>
              <span>{b.name.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-3xl border-2 border-slate-800 bg-slate-950 text-slate-100 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2 font-mono">
              <Icon name="terminal" className="w-4 h-4 text-emerald-400" />
              <span>Prompt d&apos;Investigation Compilé ({blocks.filter((b) => b.included).length}/7 blocs actifs)</span>
            </span>
            <span className="text-xs text-lime-400 font-mono">Prêt pour Gemini / Antigravity / Claude</span>
          </div>

          <pre className="p-2 overflow-x-auto text-xs font-mono leading-relaxed text-slate-200 whitespace-pre-wrap max-h-96">
            {compiledPrompt}
          </pre>
        </div>
      </section>

      {/* 5. Exemple réel complet : Résolution d'un bug de paramètre de route */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Cas réel d&apos;application : Erreur subtile de paramètre Express
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Voici le prompt complet soumis à l&apos;IA pour une route qui retourne systématiquement <code>404 Not Found</code> alors que la commande existe bel et bien en base :
        </p>

        <CodeBlock
          filename="prompts/investigate-order-route.md"
          language="markdown"
          code={`### ROLE
Tu es un architecte logiciel senior spécialisé dans l'écosystème Node.js et les frameworks de routage HTTP.

### OBJECTIVE
Identifier précisément pourquoi la route GET /orders/:id renvoie systématiquement une erreur 404 alors que l'enregistrement existe dans la table MySQL 'orders'.

### CONTEXT
- Framework : Express 5.0
- Langage : TypeScript 5.6
- Base de données : MySQL 8.0 avec mysql2/promise

### DATA
Extrait du routeur Express (src/routes/orderRoutes.ts) :
\`\`\`typescript
router.get("/orders/:id", async (req, res) => {
  // Recherche de la commande dans le service
  const order = await orderService.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json(order);
});
\`\`\`

### TASKS
1. Examine la déclaration du chemin de route et l'accès aux paramètres de requête.
2. Identifie la valeur exacte de req.params.orderId lors de l'exécution.
3. Formule la cause racine et prouve-la techniquement.
4. Rédige un test unitaire Supertest qui échoue avec le code actuel.

### CONSTRAINTS
- NE MODIFIE AUCUN FICHIER.
- Ne propose pas de remplacer Express par un autre framework.
- Fournis un diagnostic factuel sans spéculation.

### OUTPUT FORMAT
Rapport en 3 points :
1. Cause racine confirmée
2. Explication du mécanisme d'erreur
3. Test de non-régression`}
        />

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-950 text-sm flex items-center gap-2">
            <Icon name="sparkles" className="w-4 h-4 text-emerald-700" />
            <span>Diagnostic technique produit par l&apos;IA :</span>
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
            <p>
              <strong>1. Cause racine confirmée :</strong> Incohérence de nommage de paramètre entre la déclaration de route (<code>:id</code>) et sa lecture dans le contrôleur (<code>req.params.orderId</code>).
            </p>
            <p>
              <strong>2. Mécanisme de l&apos;erreur :</strong> Express peuple l&apos;objet <code>req.params</code> avec les clés exactes définies dans le chemin de la route.
              Pour <code>/orders/:id</code>, Express crée l&apos;objet <code>&#123; id: &quot;123&quot; &#125;</code>.
              Par conséquent, l&apos;expression <code>req.params.orderId</code> évalue à <code>undefined</code>.
              L&apos;appel <code>orderService.findById(undefined)</code> ne trouve aucun enregistrement et retourne <code>null</code>, déclenchant à tort la réponse 404.
            </p>
            <p>
              <strong>3. Remédiation :</strong> Remplacer <code>req.params.orderId</code> par <code>Number(req.params.id)</code> avec validation préalable par schéma Zod.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz de certification (6 questions) */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de certification — Chapitre 6.3 : Construire un Prompt Professionnel de Diagnostic"
          questions={[
            {
              id: 1,
              question: "Quel est le bénéfice technique principal d'attribuer un RÔLE précis (Role Priming, ex: 'Senior Backend Engineer') au modèle IA au début du prompt ?",
              options: [
                "Cela permet de réduire le coût en tokens facturé par l'API.",
                "Cela conditionne l'espace latent du modèle pour orienter ses prédictions vers un vocabulaire technique rigoureux, des patterns éprouvés et une posture d'analyse exigeante.",
                "Cela empêche le modèle de générer du code dans d'autres langages que le français.",
                "Cela garantit que le modèle n'aura aucune latence réseau."
              ],
              correctIndex: 1,
              explanation: "Le Role Priming ajuste la distribution de probabilité des tokens générés par le LLM, privilégiant les concepts d'architecture avancée, la sécurité et la rigueur d'ingénierie par rapport à des explications vulgarisées de niveau débutant."
            },
            {
              id: 2,
              question: "Pourquoi est-il crucial de spécifier explicitement les versions des frameworks et runtimes dans le bloc CONTEXT (ex: Node.js 22, Express 5) ?",
              options: [
                "Pour que le compilateur TypeScript puisse télécharger les définitions de types.",
                "Parce que des versions majeures différentes introduisent des ruptures d'API critiques (par exemple, Express 5 gère nativement les promesses asynchrones rejetées, alors qu'Express 4 nécessitait un bloc catch manuel ou un wrapper).",
                "Pour accélérer la vitesse de calcul du processeur du client.",
                "Parce que l'IA refuse de répondre si les numéros de version ne sont pas pairs."
              ],
              correctIndex: 1,
              explanation: "Sans indication de version, le modèle risque de proposer des correctifs obsolètes ou incompatibles avec votre pile technologique actuelle (comme des middlewares dépréciés ou des syntaxes abandonnées)."
            },
            {
              id: 3,
              question: "Dans le bloc CONSTRAINTS d'un prompt d'investigation, quelle directive est la plus importante pour éviter les faux correctifs ?",
              options: [
                "Demander au modèle de rédiger sa réponse en rimes poétiques.",
                "Interdire formellement toute modification de code ou proposition de patch avant que la cause racine n'ait été prouvée factuellement avec les données fournies.",
                "Interdire au modèle d'utiliser le mot 'bug'.",
                "Limiter la réponse à exactement 50 mots."
              ],
              correctIndex: 1,
              explanation: "Interdire la modification de code immédiate neutralise le réflexe du LLM qui consiste à coller un 'patch d'anesthésie' (comme un optional chaining superficiel) au lieu d'identifier pourquoi la donnée est absente ou corrompue."
            },
            {
              id: 4,
              question: "Que risque-t-il de se produire si l'ingénieur omet de fournir la Stack Trace complète dans le bloc DATA et ne colle que le code source ?",
              options: [
                "L'IA va refuser de charger la page Web.",
                "Le modèle devra deviner la chaîne d'exécution dynamique et risque d'accuser une fonction parfaitement saine au lieu du frame exact où l'exception s'est produite.",
                "Le serveur Node.js va redémarrer automatiquement.",
                "Le code source sera effacé du disque dur."
              ],
              correctIndex: 1,
              explanation: "La Stack Trace fournit la preuve de la trajectoire d'exécution dynamique réelle (call stack). Sans elle, le modèle ne peut faire que de l'analyse statique approximative et risque d'émettre des hypothèses erronées."
            },
            {
              id: 5,
              question: "Pourquoi le bloc TASKS doit-il imposer une séquence de raisonnement pas-à-pas (Chain of Thought, ex: 1. Tracer, 2. Hypothèses, 3. Preuves) ?",
              options: [
                "Parce que les modèles de langage génèrent des réponses plus fiables et logiquement cohérentes lorsqu'ils sont contraints de décomposer leur raisonnement avant d'énoncer une conclusion finale.",
                "Parce que cela permet de contourner le quota de requêtes par minute de l'API.",
                "Parce que cela convertit automatiquement le code JavaScript en Rust.",
                "Parce que les listes à puces consomment moins de mémoire vive."
              ],
              correctIndex: 0,
              explanation: "Le 'Chain of Thought prompting' (raisonnement par étapes) force le modèle à produire des tokens intermédiaires d'analyse qui alimentent son propre contexte, réduisant drastiquement le taux d'erreur et les hallucinations."
            },
            {
              id: 6,
              question: "À quoi sert d'imposer un OUTPUT FORMAT standardisé (Markdown structuré avec Symptôme, Faits, Hypothèses, RCA, Tests) ?",
              options: [
                "À vérifier si l'ordinateur supporte le format Markdown.",
                "À obtenir un livrable technique homogène, directement transférable dans un ticket d'incident (Jira/Linear) ou un rapport post-mortem, sans bavardage inutile.",
                "À chiffrer le rapport avec une clé RSA 2048 bits.",
                "À afficher obligatoirement des graphiques 3D dans le terminal."
              ],
              correctIndex: 1,
              explanation: "Un format de sortie strict élimine les préambules polis et verbeux des LLMs et structure immédiatement le résultat sous une forme actionnable pour l'équipe d'ingénierie."
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Chapitre3Content;
