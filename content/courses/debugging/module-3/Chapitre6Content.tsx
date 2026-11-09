'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type AsyncScenarioKey = 'forgotten_await_security' | 'foreach_pitfall' | 'try_catch_return_await' | 'waterfall_bottleneck';

interface AsyncScenario {
  title: string;
  badge: string;
  badgeColor: string;
  snippet: string;
  eventLoopBehavior: string;
  symptom: string;
  solution: string;
}

const ASYNC_SCENARIOS: Record<AsyncScenarioKey, AsyncScenario> = {
  forgotten_await_security: {
    title: '1. Oubli de await dans un test "if" (Faille de Sécurité)',
    badge: 'Faille Critique',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    snippet: `async function checkAdmin(userId) {
  // Simule une requête BDD qui renvoie false
  return false; 
}

async function deleteDatabaseHandler(req) {
  // 💥 DÉSASTRE : checkAdmin renvoie une instance de Promise !
  // En JavaScript, TOUT objet (même Promise<false>) est TRUTHY !
  if (checkAdmin(req.userId)) {
    // Ce bloc s'exécute TOUJOURS ! N'importe qui peut détruire la BDD !
    database.drop();
  }
}`,
    eventLoopBehavior: 'V8 évalue Boolean(checkAdmin(req.userId)). Comme checkAdmin est déclarée async, elle retourne immédiatement un objet Promise en mémoire. Dans l\'algèbre ECMAScript, typeof Promise === "object" et Boolean(object) vaut toujours true !',
    symptom: 'La condition if est franchie à 100% sans jamais attendre le résultat réel de la fonction.',
    solution: 'Préfixez impérativement l\'appel par await : if (await checkAdmin(req.userId)) { ... }'
  },
  foreach_pitfall: {
    title: '2. Le piège mortel de Array.forEach avec async/await',
    badge: 'Race Condition',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    snippet: `const items = [1, 2, 3];

async function processOrderItems() {
  console.log("Début du traitement");

  // 💥 BOGUE : forEach ignore TOTALEMENT les Promises retournées par son callback !
  items.forEach(async (id) => {
    await saveItem(id); // Appel asynchrone non attendu
  });

  // Cette ligne s'exécute IMMÉDIATEMENT avant même que le premier saveItem n'ait fini !
  console.log("Commande finalisée !");
}`,
    eventLoopBehavior: 'Array.prototype.forEach est une fonction synchrone écrite en C++. Elle déclenche les 3 callbacks fléchés sans await et termine immédiatement. Les 3 opérations asynchrones s\'exécutent en tâche de fond dans l\'Event Loop sans aucun contrôle d\'achèvement.',
    symptom: 'Le traitement principal se termine avant les sous-tâches, provoquant des états corrompus ou des sauvegardes orphelines.',
    solution: 'Utilisez une boucle "for (const item of items) { await ... }" pour du séquentiel, ou "await Promise.all(items.map(async ...))" pour du parallèle.'
  },
  try_catch_return_await: {
    title: '3. Le subtil "return await" dans un bloc try/catch',
    badge: 'Exception Fuite',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    snippet: `async function processPayment(paymentData) {
  try {
    // 💥 PIÈGE : return sans await court-circuite le catch local !
    return chargeCard(paymentData); 
  } catch (error) {
    // ⚠️ Si chargeCard rejette, ce catch NE S'EXÉCUTE PAS !
    // La Promise rejetée est renvoyée directement à l'appelant.
    logSecurityAudit("Échec paiement:", error);
    throw new PaymentError("Carte refusée");
  }
}`,
    eventLoopBehavior: 'Lorsque vous écrivez "return promise", la fonction async se termine immédiatement et transmet la Promise non résolue à l\'appelant. Si la promesse rejette ultérieurement, le bloc catch local a déjà été dépilé de la Call Stack !',
    symptom: 'Le gestionnaire d\'erreur local est court-circuité et les audits de sécurité ne sont jamais appelés.',
    solution: 'À l\'intérieur d\'un bloc try/catch, écrivez obligatoirement "return await chargeCard(paymentData);" pour forcer la résolution avant la sortie du try.'
  },
  waterfall_bottleneck: {
    title: '4. La cascade séquentielle (The Waterfall Bottleneck)',
    badge: 'Performance x3',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    snippet: `async function loadUserProfile(userId) {
  // 💥 Chaque requête attend 1000ms la fin de la précédente :
  const user = await fetchUser(userId);         // 1.0s
  const friends = await fetchFriends(userId);   // 1.0s
  const photos = await fetchPhotos(userId);     // 1.0s
  // Durée totale = 3.0 secondes d'écran de chargement !
  return { user, friends, photos };
}`,
    eventLoopBehavior: 'Les requêtes friends et photos ne dépendent pas des résultats de user. Les bloquer avec await bloque inutilement la fonction alors que le réseau du client pourrait envoyer les 3 paquets HTTP simultanément.',
    symptom: 'Temps de chargement anormalement long et expérience utilisateur dégradée.',
    solution: 'Lancez les tâches en concurrence : const [user, friends, photos] = await Promise.all([fetchUser(id), fetchFriends(id), fetchPhotos(id)]);'
  }
};

export const Chapitre6Content: React.FC = () => {
  const [activeScenarioKey, setActiveScenarioKey] = useState<AsyncScenarioKey>('forgotten_await_security');
  const activeScenario = ASYNC_SCENARIOS[activeScenarioKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Déboguer async / await, les boucles asynchrones et l&apos;Event Loop
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">if (checkPermission())</code> sans <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">await</code> ouvre-t-il les accès sécurisés à n&apos;importe qui ? Pourquoi <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">array.forEach(async () =&gt; &#123;&#125;)</code> ne respecte-t-il jamais l&apos;ordre de vos opérations ? Pourquoi un <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">return</code> dans un bloc <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">try/catch</code> nécessite-t-il expressément un <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">await</code> ? Maîtrisez les coulisses du moteur V8 et neutralisez les pièges asynchrones.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre la mécanique interne de V8 : sucre syntaxique, suspension de coroutine et file des microtâches.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Neutraliser la faille critique du <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">if (asyncFunction())</code> sans await toujours truthy.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Bannir <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">forEach</code> avec async et choisir la bonne stratégie de boucle (<code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">for...of</code> vs <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">Promise.all(map)</code>).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Résoudre le dilemme du <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">return await</code> dans les blocs try/catch et éliminer les goulots d&apos;étranglement en cascade.</span>
          </div>
        </div>
      </section>

      {/* 2. Mécanique interne de V8 */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les coulisses de V8 : Marque-page de coroutine et Microtasks
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Introduit en ECMAScript 2017, le couple <code className="font-mono text-xs font-bold text-emerald-800">async / await</code> n&apos;apporte pas de nouveau thread d&apos;exécution à JavaScript. C&apos;est un <strong>sucre syntaxique élégant construit au-dessus des Promises et des Générateurs</strong>.
        </p>

        {/* Métaphore du marque-page */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-sm text-emerald-950 space-y-2">
          <div className="flex items-center gap-2 font-black text-emerald-900 uppercase text-xs tracking-wider">
            <Icon name="info" className="w-4 h-4 text-emerald-700" />
            <span>Métaphore du marque-page et du guichetier de gare</span>
          </div>
          <p className="leading-relaxed">
            Imaginez que votre fonction est un livre que vous lisez. Lorsque le moteur V8 rencontre le mot-clé <code className="font-mono font-bold">await</code>, il <strong>pose un marque-page à la ligne exacte</strong>, range le livre sur son étagère (sauvegarde du contexte d&apos;exécution et des variables locales) et retourne immédiatement au guichet principal de l&apos;Event Loop pour servir d&apos;autres clients. Dès que la Promise attendue est résolue, V8 reçoit un ticket prioritaire dans la <em>Microtask Queue</em>, rouvre le livre à la page marquée et reprend la lecture. <strong>Le thread principal n&apos;a jamais été bloqué une seule milliseconde.</strong>
          </p>
        </div>

        {/* Les 2 lois de V8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 space-y-2">
            <h3 className="font-black text-emerald-950 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-xs">1</span>
              <span>Loi 1 : async encapsule TOUJOURS en Promise</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Même si vous écrivez <code className="font-mono font-bold">return 42;</code> ou si la fonction ne fait aucun calcul asynchrone, le préfixe <code className="font-mono font-bold">async</code> contraint V8 à envelopper la valeur retournée dans une <code className="font-mono font-bold">Promise.resolve(42)</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-teal-200 bg-teal-50/70 space-y-2">
            <h3 className="font-black text-teal-950 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-200 flex items-center justify-center text-xs">2</span>
              <span>Loi 2 : await suspend UNIQUEMENT la fonction locale</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              <code className="font-mono font-bold">await</code> ne met jamais en pause le moteur JavaScript dans son ensemble. Il suspend uniquement la fonction englobante courante et rend immédiatement la main à l&apos;Event Loop pour traiter les requêtes HTTP, le DOM ou d&apos;autres timers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Démystification des 4 anomalies majeures */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les quatre anomalies majeures d&apos;async / await et leurs correctifs
        </h2>

        {/* Faille 1 : if(asyncFn()) */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">1</span>
            <span>La faille de sécurité du <code className="font-mono text-rose-800">if (checkAuth())</code> sans await</span>
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            C&apos;est sans conteste la vulnérabilité de code asynchrone la plus dangereuse. Toute fonction déclarée <code className="font-mono text-xs">async</code> renvoie immédiatement un objet <code className="font-mono text-xs">Promise</code>. Or, en JavaScript, <strong>TOUT objet en mémoire est évalué comme truthy</strong>, même si la promesse va se résoudre plus tard avec la valeur <code className="font-mono text-xs font-bold">false</code> :
          </p>
          <CodeBlock
            language="typescript"
            filename="security-bypass.ts"
            code={`async function isUserSuperAdmin(userId: string): Promise<boolean> {
  const user = await database.findUser(userId);
  return user.role === "SUPER_ADMIN"; // Renvoie false pour un utilisateur standard
}

// 💥 VULNÉRABILITÉ MAJEURE : Oubli du mot-clé await
async function deleteProject(req: Request) {
  // isUserSuperAdmin() renvoie Promise { <pending> } !
  // Boolean(Promise) est TOUJOURS true !
  if (isUserSuperAdmin(req.userId)) {
    // 💥 N'IMPORTE QUEL UTILISATEUR PASSE LE TEST DE SÉCURITÉ !
    await database.dropCollection("projects");
  }
}

// ✅ CORRECTION SÉCURISÉE : Attendre impérativement la résolution booléenne
async function deleteProjectSafe(req: Request) {
  if (await isUserSuperAdmin(req.userId)) {
    await database.dropCollection("projects");
  }
}`}
          />
        </div>

        {/* Faille 2 : forEach */}
        <div className="space-y-2 pt-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">2</span>
            <span>Le piège mortel de <code className="font-mono text-amber-800">Array.prototype.forEach</code> avec async</span>
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            La méthode <code className="font-mono text-xs font-bold">forEach</code> a été standardisée bien avant l&apos;arrivée des Promises. Elle n&apos;attend jamais la résolution des fonctions asynchrones passées en paramètre. Les appels sont lancés à l&apos;aveugle en mode &quot;tirer et oublier&quot; (<em>fire-and-forget</em>) :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-rose-950 text-rose-100 border border-rose-800 space-y-2">
              <span className="font-bold text-rose-300 uppercase text-xs font-sans block">Invalide : forEach avec async</span>
              <pre className="text-slate-300 text-xs overflow-x-auto">{`// 💥 DÉSYNCHRONISATION TOTALE :
orders.forEach(async (order) => {
  await chargeCustomer(order);
  await sendReceipt(order);
});

// Cette ligne s'exécute AVANT les paiements !
console.log("Toutes les commandes sont traitées !");`}</pre>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-100 border border-emerald-800 space-y-2">
              <span className="font-bold text-emerald-300 uppercase text-xs font-sans block">Valide : for...of ou Promise.all</span>
              <pre className="text-slate-300 text-xs overflow-x-auto">{`// Option A : Traitement séquentiel ordonné
for (const order of orders) {
  await chargeCustomer(order);
  await sendReceipt(order);
}

// Option B : Traitement concurrent parallèle
await Promise.all(orders.map(async (order) => {
  await chargeCustomer(order);
  await sendReceipt(order);
}));`}</pre>
            </div>
          </div>
        </div>

        {/* Faille 3 : return await */}
        <div className="space-y-2 pt-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">3</span>
            <span>Le dilemme du <code className="font-mono text-purple-800">return await</code> dans un bloc try/catch</span>
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            En temps normal, écrire <code className="font-mono text-xs">return await p;</code> est redondant car la fonction <code className="font-mono text-xs">async</code> encapsule déjà le résultat. <strong>Mais à l&apos;intérieur d&apos;un bloc try/catch, l&apos;omission de await est fatale</strong> :
          </p>

          <Callout type="warning" title="La règle de return await dans try/catch">
            <p className="text-sm leading-relaxed">
              Si vous écrivez <code className="font-mono font-bold">return apiCall();</code> dans un <code className="font-mono font-bold">try</code>, vous retournez la Promise brute sans attendre sa résolution. Si elle échoue plus tard, l&apos;exception est levée dans le contexte de l&apos;appelant, <strong>et votre bloc catch local est totalement ignoré !</strong> Pour intercepter l&apos;erreur localement, vous DEVEZ écrire <code className="font-mono font-bold">return await apiCall();</code>.
            </p>
          </Callout>
        </div>
      </section>

      {/* 4. Simulateur Interactif : Laboratoire Asynchrone */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5 text-lime-700" />
              <span>4. Laboratoire Interactif : Diagnostic des Pièges Asynchrones</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Explorez les 4 anomalies asynchrones les plus dévastatrices en entreprise et observez la réaction exacte du moteur V8.
            </p>
          </div>
        </div>

        {/* Boutons sélecteurs de scénarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {(Object.keys(ASYNC_SCENARIOS) as AsyncScenarioKey[]).map((key) => {
            const scenario = ASYNC_SCENARIOS[key];
            const isSelected = activeScenarioKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveScenarioKey(key)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-lime-300 border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border inline-block mb-1 ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
                <div className="text-xs font-mono font-bold truncate">{scenario.title}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'inspection en direct */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Scénario inspecté :</span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activeScenario.title}
              </h3>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${activeScenario.badgeColor}`}>
              {activeScenario.badge}
            </span>
          </div>

          {/* Grille Code vs Comportement Event Loop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Code source défaillant :
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {activeScenario.snippet}
              </pre>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                  Mécanique de l&apos;Event Loop V8 :
                </span>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  {activeScenario.eventLoopBehavior}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block font-sans">
                  Symptôme en production :
                </span>
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-200 font-sans">
                  {activeScenario.symptom}
                </div>
              </div>
            </div>
          </div>

          {/* Correction recommandée */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-1">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <Icon name="check" className="w-4 h-4 text-emerald-400" />
              <span>Correctif sécurisé :</span>
            </div>
            <p className="text-xs text-emerald-200 font-sans leading-relaxed">
              {activeScenario.solution}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Travaux Pratiques : Audit d'un pipeline e-commerce */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            5. Travaux Pratiques — Audit et refactorisation d&apos;un orchestrateur de commandes
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Le service de validation de panier ci-dessous présente 4 failles asynchrones critiques : vérification de paiement contournée, boucle <code className="font-mono text-xs">forEach</code> provoquant des commandes sans stock réservé, fuite de log dans le <code className="font-mono text-xs">try/catch</code> et cascade séquentielle de 4 secondes.
        </p>

        {/* Code source bogué */}
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase text-rose-700 flex items-center gap-2">
            <Icon name="alert" className="w-4 h-4 text-rose-600" />
            <span>Code défaillant (4 failles d&apos;orchestration async)</span>
          </h3>
          <CodeBlock
            language="javascript"
            filename="buggy-checkout-orchestrator.js"
            code={`async function checkoutOrder(cart, paymentInfo) {
  // FAILLE 1 : if(checkPayment) sans await -> toujours truthy !
  if (verifyPaymentMethod(paymentInfo)) {
    console.log("Moyen de paiement validé");
  }

  // FAILLE 2 : forEach avec async -> les réservations de stock sont lancées à l'aveugle !
  cart.items.forEach(async (item) => {
    await inventoryService.reserveStock(item.id, item.qty);
  });

  // FAILLE 3 : Cascade séquentielle bloquante de 3 requêtes indépendantes (3000ms au total)
  const tax = await taxService.calculateTax(cart.subtotal);       // 1000ms
  const shipping = await shippingService.estimateCost(cart.zip);  // 1000ms
  const discount = await promoService.lookupCoupon(cart.coupon);  // 1000ms

  // FAILLE 4 : return sans await dans try/catch -> le catch local est court-circuité !
  try {
    return orderDb.saveFinalOrder({ cart, tax, shipping, discount });
  } catch (err) {
    // 💥 Ne s'exécute jamais si saveFinalOrder rejette une Promise !
    telemetry.logCriticalError("Échec enregistrement commande:", err);
    throw err;
  }
}`}
          />
        </div>

        {/* Code source corrigé */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Solution professionnelle refactorisée et concurrente</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="safe-checkout-orchestrator.ts"
            code={`interface CartItem { id: string; qty: number; }
interface Cart { items: CartItem[]; subtotal: number; zip: string; coupon?: string; }
interface PaymentInfo { method: string; token: string; }

export async function checkoutOrderSafe(cart: Cart, paymentInfo: PaymentInfo) {
  // 1. CORRECTION SÉCURITÉ : await obligatoire dans la condition if
  const isPaymentValid = await verifyPaymentMethod(paymentInfo);
  if (!isPaymentValid) {
    throw new Error("Paiement refusé : coordonnées bancaires invalides.");
  }

  // 2. CORRECTION BOUCLE : Promise.all(map) garantit que TOUS les stocks sont réservés avant de continuer
  await Promise.all(
    cart.items.map(item => inventoryService.reserveStock(item.id, item.qty))
  );

  // 3. CORRECTION PERFORMANCE : Parallélisation des 3 requêtes indépendantes (Gain : 1000ms au lieu de 3000ms)
  const [tax, shipping, discount] = await Promise.all([
    taxService.calculateTax(cart.subtotal),
    shippingService.estimateCost(cart.zip),
    cart.coupon ? promoService.lookupCoupon(cart.coupon) : Promise.resolve(0)
  ]);

  // 4. CORRECTION TRY/CATCH : 'return await' force l'interception locale de l'exception
  try {
    return await orderDb.saveFinalOrder({ cart, tax, shipping, discount });
  } catch (err) {
    telemetry.logCriticalError("Échec enregistrement commande:", err);
    throw new Error("Impossible d'enregistrer la commande en base de données.");
  }
}`}
          />
        </div>
      </section>

      {/* 6. Synthèse : La Check-list Anti-Bogue async/await */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Synthèse : Les 4 Règles d&apos;Or d&apos;async / await
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : Toujours await dans un test booléen</span>
            <p className="text-xs text-slate-700">Toute fonction asynchrone renvoie un objet Promise. Sans <code className="font-mono font-bold">await</code>, <code className="font-mono">if (isAllowed())</code> est toujours évalué à <code className="font-mono">true</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : Interdire forEach avec async</span>
            <p className="text-xs text-slate-700">Pour itérer de façon ordonnée, utilisez <code className="font-mono font-bold">for...of</code>. Pour itérer en parallèle avec synchronisation, utilisez <code className="font-mono font-bold">await Promise.all(items.map(...))</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : return await dans les blocs try/catch</span>
            <p className="text-xs text-slate-700">Si une fonction doit intercepter les erreurs d&apos;une Promise avant de la retourner, préfixez obligatoirement par <code className="font-mono font-bold">return await</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : Paralléliser les appels indépendants</span>
            <p className="text-xs text-slate-700">N&apos;enchaînez pas les <code className="font-mono">await</code> successifs si les requêtes n&apos;ont aucun lien de dépendance mutuelle : utilisez <code className="font-mono font-bold">Promise.all()</code>.</p>
          </div>
        </div>
      </section>

      {/* 7. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          7. Quiz de validation — Chapitre 3.6
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'instruction 'if (checkAuth())' sans await constitue-t-elle une faille critique si checkAuth est async ?",
              options: [
                "Elle lève immédiatement une SyntaxError",
                "checkAuth() renvoie une instance d'objet Promise, et tout objet en JavaScript est évalué comme TRUTHY, validant le test à 100%",
                "Elle bloque l'Event Loop indéfiniment",
                "Elle supprime la session utilisateur"
              ],
              correctIndex: 1,
              explanation: "Une fonction async renvoie toujours un objet Promise. En JavaScript, Boolean(toutObjet) vaut true. La condition if est donc toujours franchie, même si la promesse aurait résolu à false !"
            },
            {
              id: 2,
              question: "Que se passe-t-il lorsque vous utilisez await à l'intérieur d'un callback Array.prototype.forEach ?",
              options: [
                "forEach attend chaque itération successivement",
                "forEach ignore totalement les Promises retournées par le callback et se termine immédiatement avant la fin des opérations",
                "Le navigateur plante avec une RangeError",
                "forEach convertit les opérations en requêtes synchrones"
              ],
              correctIndex: 1,
              explanation: "forEach n'est pas conçu pour les promesses : il appelle le callback sans attendre sa résolution et rend la main aussitôt, provoquant des désynchronisations sévères."
            },
            {
              id: 3,
              question: "Pourquoi est-il nécessaire d'écrire 'return await chargeCard();' à l'intérieur d'un bloc try/catch ?",
              options: [
                "Pour forcer le typage en TypeScript",
                "Sans await, la Promise est renvoyée immédiatement et si elle rejette, le bloc catch local est ignoré car déjà dépilé",
                "C'est une obligation imposée par le protocole HTTP",
                "Pour accélérer la vitesse d'exécution"
              ],
              correctIndex: 1,
              explanation: "Sans await, 'return chargeCard()' renvoie la promesse en suspens. Si elle rejette plus tard, le bloc catch local ne peut pas être déclenché car la fonction s'est déjà terminée."
            },
            {
              id: 4,
              question: "Le mot-clé await bloque-t-il le thread d'exécution principal du navigateur ?",
              options: [
                "Oui, il fige l'interface utilisateur pendant toute la durée de la requête",
                "Non, il suspend uniquement le contexte local de la fonction et rend immédiatement le contrôle à l'Event Loop",
                "Oui, uniquement sous Windows",
                "Uniquement si la requête dépasse 5000ms"
              ],
              correctIndex: 1,
              explanation: "await ne bloque jamais le thread JS. Il enregistre la reprise de la fonction comme une microtâche et permet à l'Event Loop de continuer à traiter les événements, animations et autres requêtes."
            },
            {
              id: 5,
              question: "Quelle méthode permet d'exécuter 3 requêtes réseau indépendantes sans subir l'effet cascade séquentiel (waterfall) ?",
              options: [
                "Trois instructions await successives",
                "await Promise.all([req1(), req2(), req3()])",
                "Une boucle while(true)",
                "setTimeout avec 0 milliseconde"
              ],
              correctIndex: 1,
              explanation: "await Promise.all(...) démarre les 3 requêtes simultanément sur le réseau et suspend l'exécution jusqu'à la complétion collective des trois, réduisant le temps total au temps de la plus lente."
            },
            {
              id: 6,
              question: "Que retourne toujours une fonction déclarée avec le mot-clé async sans return explicite ?",
              options: [
                "undefined (valeur primitive)",
                "null",
                "Promise { <fulfilled>: undefined }",
                "Une TypeError"
              ],
              correctIndex: 2,
              explanation: "Toute fonction async renvoie invariablement une Promise. Si aucun return n'est spécifié, la Promise est résolue avec la valeur par défaut undefined."
            }
          ]}
        />
      </section>
    </div>
  );
};
