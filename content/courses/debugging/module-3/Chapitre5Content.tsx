'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type CombinatorKey = 'all' | 'allSettled' | 'race' | 'any';

interface CombinatorScenario {
  name: string;
  syntax: string;
  behaviorSuccess: string;
  behaviorFailure: string;
  verdict: 'fail-fast' | 'resilient' | 'competitive' | 'first-success';
  idealFor: string;
  risk: string;
}

const COMBINATORS: Record<CombinatorKey, CombinatorScenario> = {
  all: {
    name: 'Promise.all()',
    syntax: 'Promise.all([fetchUser(), fetchCart(), fetchSettings()])',
    behaviorSuccess: 'Résout avec un tableau ordonné de toutes les valeurs [user, cart, settings] une fois que TOUTES ont réussi.',
    behaviorFailure: 'Échec immédiat (Fail-Fast) ! Dès que l\'une des promesses rejette, l\'ensemble est immédiatement rejeté avec cette erreur, sans attendre les autres.',
    verdict: 'fail-fast',
    idealFor: 'Opérations strictement interdépendantes (ex: commande d\'achat nécessitant à la fois le profil client ET le panier validé).',
    risk: 'Si 1 requête sur 10 échoue (même mineure), les 9 requêtes réussies sont gaspillées et l\'écran entier plante.'
  },
  allSettled: {
    name: 'Promise.allSettled()',
    syntax: 'Promise.allSettled([fetchWeather(), fetchNews(), fetchStocks()])',
    behaviorSuccess: 'Attend TOUTES les promesses sans jamais rejeter. Renvoie un tableau d\'objets { status: "fulfilled", value } ou { status: "rejected", reason }.',
    behaviorFailure: 'Ne rejette JAMAIS ! Même si 100% des promesses échouent, Promise.allSettled résout avec le bilan d\'état individuel de chaque requête.',
    verdict: 'resilient',
    idealFor: 'Tableaux de bord multi-widgets, agrégations indépendantes où les pannes partielles sont tolérées.',
    risk: 'Nécessite de filtrer manuellement les résultats (status === "fulfilled") avant d\'accéder aux données.'
  },
  race: {
    name: 'Promise.race()',
    syntax: 'Promise.race([fetchFastCDN(), fetchBackupCDN()])',
    behaviorSuccess: 'Adopte l\'état de la TOUTE PREMIÈRE promesse qui se termine (qu\'il s\'agisse d\'un succès OU d\'un rejet).',
    behaviorFailure: 'Si la promesse la plus rapide est un rejet, Promise.race rejette immédiatement, ignorant les autres requêtes qui auraient pu réussir plus tard !',
    verdict: 'competitive',
    idealFor: 'Implémentation de timeouts stricts (mettre en compétition une requête réseau avec un setTimeout de 3 secondes).',
    risk: 'Si le serveur le plus rapide renvoie une erreur 500 en 10ms, la course est perdue alors qu\'un miroir plus lent en 50ms aurait pu réussir.'
  },
  any: {
    name: 'Promise.any()',
    syntax: 'Promise.any([fetchMirrorA(), fetchMirrorB(), fetchMirrorC()])',
    behaviorSuccess: 'Résout dès que la PREMIÈRE promesse réussit avec succès, en ignorant tous les échecs antérieurs.',
    behaviorFailure: 'Ne rejette QUE si la TOTALITÉ des promesses ont échoué. Lève alors une exception spéciale : AggregateError (regroupant toutes les erreurs).',
    verdict: 'first-success',
    idealFor: 'Téléchargement de ressource depuis plusieurs miroirs redondants (le premier serveur disponible qui répond positivement l\'emporte).',
    risk: 'Si tous les serveurs sont hors ligne, l\'inspection des causes requiert de parcourir aggregateError.errors.'
  }
};

export const Chapitre5Content: React.FC = () => {
  const [selectedCombinator, setSelectedCombinator] = useState<CombinatorKey>('all');
  const activeCombinator = COMBINATORS[selectedCombinator];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 5 — Déboguer les Promises et la programmation asynchrone
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">fetch()</code> ne déclenche-t-il aucun <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">.catch()</code> lors d&apos;une erreur HTTP 404 ou 500 ? Pourquoi oublier un simple mot-clé <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">return</code> dans un <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">.then()</code> détruit-il la suite de votre chaîne asynchrone ? Comment orchestrer plusieurs requêtes sans faire écrouler tout votre écran ? Domombez les Promises et leurs pièges les plus retors.
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
            <span>Comprendre les transitions d&apos;état irréversibles de la machine à états d&apos;une Promise (<code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">pending</code>, <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">fulfilled</code>, <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">rejected</code>).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Détecter les maillons brisés dans le chaînage <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">.then()</code> causés par l&apos;absence de valeur de retour.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Démystifier le comportement non intuitif de <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">fetch()</code> face aux codes d&apos;état HTTP 4xx et 5xx.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Arbitrer stratégiquement entre les combinateurs <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">Promise.all()</code>, <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">allSettled()</code>, <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">race()</code> et <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">any()</code>.</span>
          </div>
        </div>
      </section>

      {/* 2. Anatomie d'une Promise et Machine à États */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Anatomie d&apos;une Promise : Une machine à états finis irréversible
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Une Promise n&apos;est pas une opération magique d&apos;arrière-plan, c&apos;est un <strong>objet conteneur représentant la valeur future d&apos;une tâche asynchrone</strong>. Au niveau de la spécification ECMAScript, elle implémente une machine à trois états stricts.
        </p>

        {/* 3 Cartes d'états */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* État 1 : PENDING */}
          <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-200">État 1</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            </div>
            <h3 className="font-black text-amber-950 text-base">PENDING (En attente)</h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              L&apos;opération I/O est en cours (lecture de fichier, téléchargement réseau, timer). La promesse n&apos;a encore produit aucun résultat et n&apos;a déclenché ni <code className="font-mono">resolve()</code> ni <code className="font-mono">reject()</code>.
            </p>
          </div>

          {/* État 2 : FULFILLED */}
          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-700 uppercase px-2 py-0.5 rounded bg-emerald-200">État 2</span>
              <span className="text-emerald-700 font-black text-xs">✓ Verrouillé</span>
            </div>
            <h3 className="font-black text-emerald-950 text-base">FULFILLED (Accomplie)</h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              L&apos;opération a réussi. La fonction <code className="font-mono font-bold">resolve(val)</code> a figé la valeur résultante. Cette valeur est immuable et transmise à tous les gestionnaires <code className="font-mono">.then()</code> attachés.
            </p>
          </div>

          {/* État 3 : REJECTED */}
          <div className="p-5 rounded-2xl border-2 border-rose-300 bg-rose-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-rose-800 uppercase px-2 py-0.5 rounded bg-rose-200">État 3</span>
              <span className="text-rose-700 font-black text-xs">✕ Verrouillé</span>
            </div>
            <h3 className="font-black text-rose-950 text-base">REJECTED (Rejetée)</h3>
            <p className="text-xs text-rose-900 leading-relaxed">
              L&apos;opération a échoué via <code className="font-mono font-bold">reject(err)</code> ou une exception synchrone non interceptée. Le motif d&apos;échec est immuable et transmis aux gestionnaires <code className="font-mono">.catch()</code>.
            </p>
          </div>
        </div>

        {/* Règle d'irréversibilité */}
        <Callout type="note" title="Règle fondamentale : L'irréversibilité du basculement (Settlement)">
          <p className="text-sm leading-relaxed">
            Une fois qu&apos;une Promise quitte l&apos;état <code className="font-mono font-bold">pending</code> pour devenir <code className="font-mono font-bold">fulfilled</code> ou <code className="font-mono font-bold">rejected</code>, <strong>son état est scellé pour toujours</strong>. Tout appel ultérieur à <code className="font-mono">resolve()</code> ou <code className="font-mono">reject()</code> au sein du même exécuteur est purement et simplement ignoré par le moteur JS sans lever d&apos;erreur !
          </p>
        </Callout>

        {/* Le bogue de l'exécuteur fantôme */}
        <div className="space-y-2 mt-4">
          <h3 className="text-base font-bold text-slate-900">
            Piège de conception : L&apos;exécuteur qui n&apos;aboutit jamais
          </h3>
          <p className="text-sm text-slate-700">
            Si une condition dans votre fonction exécuteur oublie d&apos;appeler soit <code className="font-mono text-xs">resolve()</code> soit <code className="font-mono text-xs">reject()</code>, la Promise reste indéfiniment bloquée à l&apos;état <code className="font-mono text-xs">pending</code>. Les spinners de chargement tournent à l&apos;infini et les ressources mémoires ne peuvent jamais être libérées :
          </p>
          <CodeBlock
            language="typescript"
            filename="hanging-promise.ts"
            code={`// 💥 BOGUE : Si data est vide, la Promise ne se résout JAMAIS !
function fetchCustomerData(customerId: string) {
  return new Promise((resolve, reject) => {
    database.query(customerId, (err, data) => {
      if (err) {
        reject(err);
      } else if (data) {
        resolve(data);
      }
      // ⚠️ Si data est null ou vide : ni resolve() ni reject() n'est appelé !
      // La promesse est suspendue pour l'éternité en PENDING !
    });
  });
}

// ✅ CORRECTION : Prévoir TOUJOURS une issue dans toutes les branches
function fetchCustomerDataFixed(customerId: string) {
  return new Promise((resolve, reject) => {
    database.query(customerId, (err, data) => {
      if (err) return reject(err);
      if (!data) return reject(new Error("Client introuvable en base."));
      resolve(data);
    });
  });
}`}
          />
        </div>
      </section>

      {/* 3. Pièges du Chaînage .then() */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les anomalies de chaînage .then() et de propagation d&apos;erreurs
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          La force des Promises réside dans leur capacité à enchaîner séquentiellement des opérations asynchrones à plat. Cependant, de minuscules erreurs de syntaxe transforment ce flux élégant en cauchemar de débogage.
        </p>

        {/* Comparatif Oubli de return */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-rose-950 text-rose-100 border border-rose-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-rose-300 uppercase text-xs">Oubli de return -&gt; undefined silencieux</span>
              <span className="text-[11px] text-rose-400 font-bold">Chaîne brisée</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto">{`getUser(101)
  .then(user => {
    console.log("Utilisateur chargé:", user.name);
    // 💥 Pas de 'return user' !
  })
  .then(user => {
    // user vaut 'undefined' !
    console.log(user.email); 
    // 💥 TypeError: Cannot read properties of undefined
  });`}</pre>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-100 border border-emerald-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-emerald-300 uppercase text-xs">Chaîne intègre avec return</span>
              <span className="text-[11px] text-emerald-400 font-bold">Transmission garantie</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto">{`getUser(101)
  .then(user => {
    console.log("Utilisateur chargé:", user.name);
    return user; // ✅ Transmission explicite
  })
  .then(user => {
    console.log(user.email); // "alice@acme.com"
    return user.id;
  })
  .catch(err => console.error("Erreur:", err.message));`}</pre>
          </div>
        </div>

        {/* Le piège du .catch() intermédiaire */}
        <div className="space-y-2 mt-4">
          <h3 className="text-base font-bold text-slate-900">
            Le piège subtil : Le <code className="font-mono text-emerald-800">.catch()</code> qui &quot;avale&quot; l&apos;erreur et résout la suite
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Lorsqu&apos;un bloc <code className="font-mono text-xs font-bold">.catch()</code> intercepte une erreur, à moins qu&apos;il ne relance explicitement une exception (<code className="font-mono text-xs font-bold">throw error</code>) ou ne retourne une Promise rejetée, <strong>il résout la promesse suivante avec succès !</strong> La suite de la chaîne s&apos;exécute donc comme si tout s&apos;était bien passé :
          </p>
          <CodeBlock
            language="typescript"
            filename="catch-swallowing.ts"
            code={`fetchUserData()
  .catch(err => {
    console.warn("Échec récupération, log simple :", err.message);
    // ⚠️ On ne relance rien ! La valeur de retour est undefined (ou un fallback).
  })
  .then(data => {
    // 💥 CE .THEN() S'EXÉCUTE MALGRÉ L'ERREUR !
    // data vaut undefined !
    console.log("Traitement final :", data.status); // 💥 Crash TypeError
  });`}
          />
        </div>
      </section>

      {/* 4. Le piège universel de fetch() */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le piège universel de fetch() : Pourquoi 404 et 500 ne vont PAS dans .catch()
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Il s&apos;agit de la méconnaissance la plus universelle chez les développeurs web débutants et intermédiaires. Pour l&apos;API standard <code className="font-mono text-xs font-bold">fetch()</code> (dans les navigateurs comme dans Node.js), <strong>une erreur HTTP 404 (Not Found) ou 500 (Internal Server Error) N&apos;EST PAS un échec réseau !</strong>
        </p>

        <Callout type="danger" title="La règle fondamentale de l'API Fetch">
          <p className="text-sm leading-relaxed">
            <code className="font-mono font-bold">fetch()</code> ne rejette sa Promise QUE si la transaction réseau n&apos;a pas pu aboutir techniquement (panne DNS, coupure de connexion Internet, pare-feu, rejet CORS). Si le serveur web distant a réussi à vous renvoyer une réponse (même une page d&apos;erreur 404 ou un crash serveur 500), la Promise est <strong>RÉSOLUE AVEC SUCCÈS</strong> dans le bloc <code className="font-mono font-bold">.then()</code> !
          </p>
        </Callout>

        <div className="space-y-2 mt-4">
          <h3 className="text-base font-bold text-slate-900">
            Le patron de consommation défensif obligatoire avec <code className="font-mono text-emerald-800">response.ok</code>
          </h3>
          <p className="text-sm text-slate-700">
            Vous devez impérativement inspecter le drapeau booléen <code className="font-mono text-xs font-bold">response.ok</code> (qui renvoie <code className="font-mono text-xs">true</code> si le statut HTTP est compris entre 200 et 299) et forcer le rejet vous-même :
          </p>
          <CodeBlock
            language="typescript"
            filename="safe-fetch-pattern.ts"
            code={`async function safeApiRequest<T>(url: string): Promise<T> {
  const response = await fetch(url);

  // 1. Contrôle impératif du succès HTTP :
  if (!response.ok) {
    // Tentative de lecture du corps d'erreur JSON fourni par l'API
    const errorBody = await response.text();
    throw new Error(\`Erreur HTTP \${response.status} (\${response.statusText}) : \${errorBody}\`);
  }

  // 2. Décodage du JSON en toute confiance :
  const data: T = await response.json();
  return data;
}`}
          />
        </div>
      </section>

      {/* 5. Simulateur Interactif : Laboratoire d'Orchestration */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5 text-lime-700" />
              <span>5. Laboratoire Interactif : Comparateur des Combinateurs de Promises</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Choisissez une méthode statique pour observer son comportement face aux succès collectifs et aux pannes isolées.
            </p>
          </div>
        </div>

        {/* Boutons sélecteurs des 4 combinators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {(Object.keys(COMBINATORS) as CombinatorKey[]).map((key) => {
            const comb = COMBINATORS[key];
            const isSelected = selectedCombinator === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCombinator(key)}
                className={`p-3.5 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-lime-300 border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    comb.verdict === 'fail-fast' ? 'bg-rose-100 text-rose-800' :
                    comb.verdict === 'resilient' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {comb.verdict}
                  </span>
                </div>
                <div className="text-sm font-mono font-bold truncate">{comb.name}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'inspection en direct */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Combinateur sélectionné :</span>
              <h3 className="text-base sm:text-lg font-mono font-bold text-white mt-0.5">
                {activeCombinator.syntax}
              </h3>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
              activeCombinator.verdict === 'fail-fast' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
              activeCombinator.verdict === 'resilient' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
              'bg-purple-500/20 text-purple-300 border-purple-500/40'
            }`}>
              Stratégie : {activeCombinator.verdict}
            </span>
          </div>

          {/* Grille Comportement en cas de succès vs échec */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-2">
              <span className="font-bold text-emerald-400 uppercase text-xs flex items-center gap-1.5 font-sans">
                <span className="w-4 h-4 rounded-full bg-emerald-800 text-emerald-200 flex items-center justify-center text-[10px]">✓</span>
                <span>Comportement en cas de succès :</span>
              </span>
              <p className="text-emerald-100/90 leading-relaxed font-sans text-xs">
                {activeCombinator.behaviorSuccess}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-2">
              <span className="font-bold text-rose-400 uppercase text-xs flex items-center gap-1.5 font-sans">
                <span className="w-4 h-4 rounded-full bg-rose-800 text-rose-200 flex items-center justify-center text-[10px]">✕</span>
                <span>Comportement si 1 promesse échoue :</span>
              </span>
              <p className="text-rose-100/90 leading-relaxed font-sans text-xs">
                {activeCombinator.behaviorFailure}
              </p>
            </div>
          </div>

          {/* Cas d'usage idéal vs Risque */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 uppercase font-bold text-[11px] block">Cas d&apos;usage recommandé :</span>
              <p className="text-slate-200 leading-relaxed">{activeCombinator.idealFor}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 space-y-1">
              <span className="text-amber-400 uppercase font-bold text-[11px] block">Risque principal de débogage :</span>
              <p className="text-amber-200 leading-relaxed">{activeCombinator.risk}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Travaux Pratiques : Audit d'un Dashboard Multi-Sources */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            6. Travaux Pratiques — Audit et refactorisation d&apos;un tableau de bord météo &amp; bourse
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Le script ci-dessous charge les données d&apos;accueil d&apos;une application mobile : météo, cours de bourse et profil utilisateur. En production, si l&apos;API météo subit une micro-coupure de 2 secondes, <strong>l&apos;ensemble de la page d&apos;accueil plante</strong> et l&apos;utilisateur voit un écran blanc. De plus, les erreurs 404 ne sont pas détectées et génèrent des plantages ultérieurs.
        </p>

        {/* Code source bogué */}
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase text-rose-700 flex items-center gap-2">
            <Icon name="alert" className="w-4 h-4 text-rose-600" />
            <span>Code source défaillant (4 failles d&apos;architecture asynchrone)</span>
          </h3>
          <CodeBlock
            language="javascript"
            filename="buggy-dashboard-loader.js"
            code={`function loadAppDashboard(userId) {
  // FAILLE 1 : Promise.all() pour des widgets indépendants !
  // Si la météo échoue, le profil utilisateur et la bourse sont perdus !
  return Promise.all([
    fetch("/api/user/" + userId).then(res => res.json()), // FAILLE 2 : Pas de check response.ok !
    fetch("/api/weather").then(res => {
      res.json(); // FAILLE 3 : Pas de 'return' ! Transmet undefined !
    }),
    fetch("/api/stocks").then(res => res.json())
  ])
  .then(([user, weather, stocks]) => {
    // weather est undefined ! Crash sur weather.temp !
    return {
      userName: user.name,
      temperature: weather.temp,
      stockCount: stocks.length
    };
  });
  // FAILLE 4 : Pas de .catch() final -> UnhandledPromiseRejection en Node.js !
}`}
          />
        </div>

        {/* Code source corrigé */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Solution refactorisée et résiliente avec Promise.allSettled()</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="resilient-dashboard-loader.ts"
            code={`interface UserProfile { name: string; email: string; }
interface WeatherReport { temp: number; city: string; }
interface StockItem { symbol: string; price: number; }

interface DashboardData {
  user: UserProfile | null;
  weather: WeatherReport | null;
  stocks: StockItem[];
}

// Fonction utilitaire de requête HTTP blindée
async function fetchSafeJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`Échec HTTP \${response.status} sur \${url}\`);
  }
  return response.json() as Promise<T>;
}

export async function loadAppDashboardSafe(userId: string): Promise<DashboardData> {
  // 1. Exécution concurrente tolérante aux pannes avec Promise.allSettled()
  const [userResult, weatherResult, stocksResult] = await Promise.allSettled([
    fetchSafeJson<UserProfile>(\`/api/user/\${userId}\`),
    fetchSafeJson<WeatherReport>("/api/weather"),
    fetchSafeJson<StockItem[]>("/api/stocks")
  ]);

  // 2. Le profil utilisateur est critique : s'il échoue, on lève une exception
  if (userResult.status === "rejected") {
    throw new Error(\`Impossible de charger le profil : \${userResult.reason.message}\`);
  }

  // 3. La météo et la bourse sont non critiques : dégradation gracieuse en cas de panne
  const weather = weatherResult.status === "fulfilled" ? weatherResult.value : null;
  if (weatherResult.status === "rejected") {
    console.warn("Widget météo indisponible :", weatherResult.reason.message);
  }

  const stocks = stocksResult.status === "fulfilled" ? stocksResult.value : [];
  if (stocksResult.status === "rejected") {
    console.warn("Widget boursier indisponible :", stocksResult.reason.message);
  }

  return {
    user: userResult.value,
    weather,
    stocks
  };
}`}
          />
        </div>
      </section>

      {/* 7. Synthèse : La Check-list Anti-Bogue des Promises */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Synthèse : Les 4 Règles d&apos;Or des Promises
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : Toujours vérifier response.ok</span>
            <p className="text-xs text-slate-700">Ne présumez jamais que <code className="font-mono">fetch()</code> rejettera sur une erreur 404 ou 500. Validez toujours <code className="font-mono font-bold">if (!response.ok) throw new Error(...)</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : Retourner expressément dans .then()</span>
            <p className="text-xs text-slate-700">Tout maillon d&apos;une chaîne <code className="font-mono">.then()</code> doit renvoyer une valeur ou une Promise sous peine de transmettre silencieusement <code className="font-mono">undefined</code> au maillon suivant.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : allSettled pour les vues composites</span>
            <p className="text-xs text-slate-700">Pour les tableaux de bord composés de plusieurs widgets indépendants, privilégiez toujours <code className="font-mono font-bold">Promise.allSettled()</code> pour éviter qu&apos;une panne mineure n&apos;annule tout l&apos;écran.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : Intercepter tous les rejets</span>
            <p className="text-xs text-slate-700">Ne laissez jamais une Promise sans <code className="font-mono">.catch()</code> ou bloc <code className="font-mono">try/catch</code> englobant pour bannir les arrêts de processus <code className="font-mono">UnhandledPromiseRejection</code>.</p>
          </div>
        </div>
      </section>

      {/* 8. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          8. Quiz de validation — Chapitre 3.5
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quels sont les trois états finis d'une Promise en JavaScript ?",
              options: [
                "Start, Progress, Finish",
                "Pending, Fulfilled, Rejected",
                "Loading, Success, Failure",
                "Init, Executing, Terminated"
              ],
              correctIndex: 1,
              explanation: "Une Promise débute toujours à l'état PENDING, puis bascule de façon irréversible soit vers FULFILLED (succès), soit vers REJECTED (échec)."
            },
            {
              id: 2,
              question: "L'appel fetch('/api/user') reçoit une réponse HTTP 404 (Not Found). Que se passe-t-il ?",
              options: [
                "La promesse est automatiquement rejetée vers le bloc .catch()",
                "La promesse est résolue avec succès dans le .then(), et response.ok vaut false",
                "Le navigateur rafraîchit la page",
                "Le script lève immédiatement une SyntaxError"
              ],
              correctIndex: 1,
              explanation: "fetch() ne rejette que sur des pannes réseau pures. Tout code de réponse HTTP retourné par le serveur (même 404 ou 500) résout la promesse avec succès dans .then()."
            },
            {
              id: 3,
              question: "Que reçoit le second .then() si le premier exécute console.log(data) sans instruction return ?",
              options: [
                "La valeur initiale reçue par le premier .then()",
                "null",
                "undefined",
                "Une TypeError"
              ],
              correctIndex: 2,
              explanation: "En JavaScript, une fonction qui termine sans 'return' renvoie undefined. Cette valeur devient la résolution de la nouvelle promesse transmise au .then() suivant."
            },
            {
              id: 4,
              question: "Quelle méthode permet d'exécuter 3 requêtes indépendantes et d'afficher les réussies même si l'une échoue ?",
              options: [
                "Promise.all()",
                "Promise.allSettled()",
                "Promise.race()",
                "Promise.any()"
              ],
              correctIndex: 1,
              explanation: "Promise.allSettled() ne rejette jamais. Elle attend l'achèvement de toutes les promesses et retourne un tableau d'objets décrivant chaque résultat individuel."
            },
            {
              id: 5,
              question: "Que se passe-t-il si un bloc .catch() intercepte une erreur mais ne relance pas de throw new Error() ?",
              options: [
                "La chaîne asynchrone s'arrête définitivement",
                "La chaîne reprend son cours en mode FULFILLED avec la valeur de retour du .catch() (undefined par défaut)",
                "Le navigateur ferme l'onglet",
                "L'erreur est transmise au serveur par télémétrie"
              ],
              correctIndex: 1,
              explanation: "Un .catch() fonctionne comme un bloc catch synchrone : s'il gère l'erreur sans relancer d'exception, la suite de la chaîne de promesses considère l'anomalie comme réparée et reprend dans les .then() suivants."
            },
            {
              id: 6,
              question: "Dans quel cas Promise.race([p1, p2]) est-elle particulièrement recommandée ?",
              options: [
                "Pour fusionner des tableaux de données",
                "Pour implémenter un timeout d'abandon réseau en mettant en compétition une requête et un timer",
                "Pour exécuter des requêtes à la chaîne",
                "Pour sauvegarder un fichier sur disque"
              ],
              correctIndex: 1,
              explanation: "Promise.race() adopte l'issue de la première promesse achevée. Elle est idéale pour annuler ou rejeter une requête si elle ne répond pas avant un timer de délai d'attente limite (timeout)."
            }
          ]}
        />
      </section>
    </div>
  );
};
