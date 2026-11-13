'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type MemoryLeakKey =
  | 'uncleaned_interval'
  | 'unbounded_global_cache'
  | 'dangling_event_listener'
  | 'closure_scope_leak';

interface MemoryLeakScenario {
  title: string;
  badge: string;
  badgeColor: string;
  environment: 'React / Frontend' | 'Node.js Backend';
  symptomText: string;
  memoryCurveType: 'Escalier Ascendant Permanent (Fuite)' | 'Dents de Scie (Normal)';
  leakCode: string;
  fixedCode: string;
  retainerTrace: string;
  takeaway: string;
}

const MEMORY_SCENARIOS: Record<MemoryLeakKey, MemoryLeakScenario> = {
  uncleaned_interval: {
    title: '1. Timer orphelin dans un composant React (setInterval)',
    badge: 'Composant Démonté',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    environment: 'React / Frontend',
    symptomText: 'Chaque fois que l\'utilisateur ouvre et ferme le composant modal, un nouveau timer est lancé en arrière-plan sans jamais détruire le précédent. Après 20 ouvertures, 20 timers tournent en simultané en retenant l\'état complet du composant en mémoire.',
    memoryCurveType: 'Escalier Ascendant Permanent (Fuite)',
    leakCode: `// ❌ CODE VULNÉRABLE : Oubli du cleanup de l'intervalle
function LiveTicker({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Le timer capture une closure sur le composant
    setInterval(() => {
      fetchPrice(symbol).then(setPrice);
    }, 1000);
    // 💥 Oubli de la fonction de nettoyage return () => clearInterval(...) !
  }, [symbol]);

  return <div>{symbol} : {price} €</div>;
}`,
    fixedCode: `// ✅ CODE CERTIFIÉ : Nettoyage systématique dans le return de useEffect
function LiveTicker({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      fetchPrice(symbol).then(setPrice);
    }, 1000);

    // Nettoyage immédiat lors du démontage du composant :
    return () => clearInterval(timerId);
  }, [symbol]);

  return <div>{symbol} : {price} €</div>;
}`,
    retainerTrace: `GC Root (Window / Timers map)
  └── [Timer #4210 callback]
        └── Closure Context (symbol, setPrice)
              └── FiberNode (LiveTicker Component) -> RETAINED EN MÉMOIRE`,
    takeaway: 'Tout setInterval, setTimeout, WebSocket ou souscription démarré dans un useEffect DOIT obligatoirement posséder sa contrepartie de fermeture dans le return.'
  },
  unbounded_global_cache: {
    title: '2. Cache en mémoire sans politique d\'éviction (Map infinie)',
    badge: 'Crash OOM Serveur',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    environment: 'Node.js Backend',
    symptomText: 'Le serveur Express met en cache les résultats d\'appels météo ou utilisateurs dans un objet global `const cache = new Map()`. Aucune limite de taille ni TTL (Time to Live) n\'est définie. Après 48 heures de trafic, Node.js crash avec "JavaScript heap out of memory".',
    memoryCurveType: 'Escalier Ascendant Permanent (Fuite)',
    leakCode: `// ❌ ANTI-PATTERN : Map globale à croissance infinie
const globalCache = new Map<string, any>();

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  if (globalCache.has(id)) {
    return res.json(globalCache.get(id));
  }

  const user = await db.findUser(id);
  // La Map grandit indéfiniment pour chaque nouvel ID utilisateur !
  globalCache.set(id, user); 
  res.json(user);
});`,
    fixedCode: `// ✅ CODE ROBUSTE : Utiliser un cache LRU borné ou Redis externe
import { LRUCache } from 'lru-cache';

// Cache plafonné à 1 000 éléments max avec expiration à 15 minutes :
const userCache = new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 60 * 15 // 15 minutes
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const cached = userCache.get(id);
  if (cached) return res.json(cached);

  const user = await db.findUser(id);
  userCache.set(id, user);
  res.json(user);
});`,
    retainerTrace: `GC Root (Module Global Scope)
  └── globalCache (Map instance)
        └── Map entries (350 000 objets utilisateurs)
              └── User Object #98421 (Retained Size: 1.2 Go)`,
    takeaway: 'Ne stockez jamais de données dynamiques dans un objet ou une Map en mémoire sans plafond strict (LRU) ou sans déport vers Redis.'
  },
  dangling_event_listener: {
    title: '3. Écouteur d\'événement DOM persistant (addEventListener)',
    badge: 'DOM Nodes Détachés',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    environment: 'React / Frontend',
    symptomText: 'Un composant écoute l\'événement "scroll" ou "resize" de window. À chaque fois que l\'utilisateur navigue, un nouvel écouteur s\'ajoute. Les anciens composants continuent d\'exister en mémoire car l\'objet global window retient leur fonction de rappel.',
    memoryCurveType: 'Escalier Ascendant Permanent (Fuite)',
    leakCode: `// ❌ CODE VULNÉRABLE : addEventListener sans removeEventListener
function WindowTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // La fonction fléchée anonyme ne peut même pas être ciblée par removeEventListener !
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return <div>Largeur : {width}px</div>;
}`,
    fixedCode: `// ✅ CODE CERTIFIÉ : Référence nommée et suppression propre
function WindowTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Nettoyage impératif lors du démontage :
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>Largeur : {width}px</div>;
}`,
    retainerTrace: `GC Root (window object)
  └── EventListeners['resize']
        └── Anonymous callback function
              └── Closure scope (setWidth, WindowTracker component)
                    └── Detached HTMLDivElement`,
    takeaway: 'Tout addEventListener sur window, document ou un élément externe doit avoir son removeEventListener avec la même référence de fonction.'
  },
  closure_scope_leak: {
    title: '4. Fuite par Scope partagé dans les Closures (Meteor Leak)',
    badge: 'Piège V8 Avancé',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    environment: 'Node.js Backend',
    symptomText: 'Deux closures déclarées dans la même fonction partagent le même contexte lexical. Si l\'une d\'elles retient un gros buffer et que l\'autre est conservée en mémoire (ex: dans un timer ou un callback), le gros buffer reste verrouillé en mémoire même s\'il n\'est jamais lu !',
    memoryCurveType: 'Escalier Ascendant Permanent (Fuite)',
    leakCode: `// ❌ LE PIÈGE DE METEOR : Contexte lexical partagé
let theThing = null;

function replaceThing() {
  const originalThing = theThing;
  
  // Cette fonction inutilisée retient originalThing dans le scope partagé :
  const unused = function () {
    if (originalThing) console.log("hi");
  };

  // theThing retient une nouvelle closure qui partage le scope avec unused !
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {}
  };
}

setInterval(replaceThing, 100); // 💥 Explose la mémoire en 10 secondes !`,
    fixedCode: `// ✅ SOLUTION : Rompre explicitement la référence lexicale
let theThing = null;

function replaceThing() {
  const originalThing = theThing;

  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {}
  };

  // Nettoyer la référence locale pour libérer le graphe GC :
  // Ou éviter de créer des fonctions inutilisées partageant le scope
}`,
    retainerTrace: `theThing (Object)
  └── someMethod (Function)
        └── Shared Lexical Context
              └── originalThing (Précédente instance de theThing)
                    └── longStr (Buffer de 1 Mo répliqué en chaîne infinie)`,
    takeaway: 'Méfiez-vous des closures imbriquées dans des fonctions appelées périodiquement : V8 optimise les contextes de fermeture en les mutualisant.'
  }
};

export const Chapitre2Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<MemoryLeakKey>('uncleaned_interval');
  const scenario = MEMORY_SCENARIOS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 5 • Chapitre 2 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Memory Leak Engineering
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Détecter et éradiquer les fuites mémoire (Memory Leaks) : Moteur V8, Garbage Collector et Heap Snapshots
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Une fuite mémoire est une voie d&apos;eau invisible dans la coque : au départ, le navire flotte sans ralentir.
          Mais octet après octet, le tas (<strong>Heap V8</strong>) se sature d&apos;objets orphelins que le ramasse-miettes
          (<strong>Garbage Collector</strong>) est incapable d&apos;évacuer en raison de références fantômes.
          Lorsque la limite de mémoire est atteinte, le processus Node.js ou l&apos;onglet du navigateur s&apos;effondre
          brutalement sous un crash <em>Out-of-Memory (OOM)</em>.
        </p>
      </div>

      {/* 1. Comment fonctionne le Heap V8 et le Garbage Collector */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Mécanique de la mémoire JavaScript : Stack vs Heap et l&apos;algorithme Mark-and-Sweep
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Le moteur Google V8 (utilisé par Chrome et Node.js) répartit la mémoire vive en deux zones fondamentales :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-950 text-sm">1. La Pile (Call Stack)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">Statique &amp; Éphémère</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Stocke les primitives de taille fixe (nombres, booléens) et les pointeurs de fonction.
              La mémoire est libérée instantanément dès que la fonction courante termine son exécution (dépilement).
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-950 text-sm">2. Le Tas (Heap V8)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold">Dynamique &amp; Géré par le GC</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Stocke tous les objets complexes, tableaux, fermetures (closures) et chaînes volumineuses.
              Sa taille varie dynamiquement. Sa purge dépend exclusivement du <strong>Garbage Collector</strong>.
            </p>
          </div>
        </div>

        <Callout type="info" title="L'algorithme de Garbage Collection : Mark-and-Sweep (Marquage et Balayage)">
          <p className="text-xs sm:text-sm">
            Le Garbage Collector ne compte pas les références. Il part des <strong>GC Roots</strong> (les racines fondamentales : l&apos;objet <code>window</code> ou <code>global</code>, les variables locales de la Call Stack active et les objets du DOM).
          </p>
          <ol className="list-decimal list-inside mt-2 text-xs sm:text-sm space-y-1">
            <li><strong>Phase Mark (Marquage) :</strong> Le GC parcourt récursivement tous les objets accessibles depuis les racines et leur applique un drapeau &quot;vivant&quot;.</li>
            <li><strong>Phase Sweep (Balayage) :</strong> Tout objet en mémoire qui n&apos;a pas pu être atteint depuis une racine est considéré comme mort : sa mémoire est immédiatement réclamée.</li>
          </ol>
          <p className="mt-2 text-xs sm:text-sm font-semibold">
            Définition d&apos;une Fuite Mémoire : Un objet dont vous n&apos;avez plus besoin, mais qu&apos;une référence accidentelle relie toujours à une racine GC (Retainer).
          </p>
        </Callout>
      </section>

      {/* 2. Profilage visuel avec Chrome DevTools Memory (Images 3 & 4) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Méthodologie des 3 Snapshots avec Chrome DevTools Memory
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Pour prouver l&apos;existence d&apos;une fuite de mémoire sans ambiguïté, appliquez le protocole des trois instantanés :
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Image 3 */}
          <div className="rounded-3xl border-2 border-slate-300 overflow-hidden bg-slate-950 p-3 sm:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="font-bold text-lime-400">Figure 6.2.A — Prise de Heap Snapshot</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Capture Mémoire</span>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 flex justify-center p-2">
              <Image
                src="/images/cours/debugging/module-5/image3.jpeg"
                alt="Chrome DevTools Heap Snapshot capture"
                width={1000}
                height={500}
                className="rounded-xl w-full h-auto object-contain max-h-[320px]"
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center italic">
              Panneau Memory : sélection du profil &quot;Heap snapshot&quot; et déclenchement d&apos;une photographie complète de la mémoire V8.
            </p>
          </div>

          {/* Image 4 */}
          <div className="rounded-3xl border-2 border-slate-300 overflow-hidden bg-slate-950 p-3 sm:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="font-bold text-emerald-400">Figure 6.2.B — Vue de Comparaison (Comparison View)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">Delta Objets</span>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 flex justify-center p-2">
              <Image
                src="/images/cours/debugging/module-5/image4.jpeg"
                alt="Chrome DevTools Heap Snapshot comparison view"
                width={1000}
                height={500}
                className="rounded-xl w-full h-auto object-contain max-h-[320px]"
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center italic">
              Vue Comparison : filtrage des objets alloués entre le Snapshot 1 et 2 pour identifier les constructeurs dont le nombre de deltas (# Delta) reste positif.
            </p>
          </div>
        </div>

        {/* Définitions Shallow vs Retained Size */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
            <span className="font-bold text-slate-950 block">Distance</span>
            <p className="text-slate-600">Nombre de nœuds séparant l&apos;objet de la racine GC la plus proche. Une distance courte indique une rétention forte.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
            <span className="font-bold text-slate-950 block">Shallow Size (Taille Propre)</span>
            <p className="text-slate-600">Mémoire consommée directement par l&apos;objet lui-même (quelques octets pour ses propres propriétés immédiates).</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-emerald-300 bg-emerald-50/50 space-y-1">
            <span className="font-bold text-emerald-950 block">Retained Size (Taille Retenue)</span>
            <p className="text-emerald-900 font-medium">Taille totale qui serait libérée si cet objet était détruit. <strong>C&apos;est la métrique clé pour traquer les fuites !</strong></p>
          </div>
        </div>
      </section>

      {/* 3. Laboratoire Interactif : Les 4 Fuites Mémoire Types */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Diagnostic des 4 Grandes Causes de Fuite Mémoire
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Sélectionnez un cas d&apos;école pour analyser le code défaillant, la chaîne de retenue dans l&apos;arbre GC (Retainers) et la correction certifiée :
        </p>

        {/* Boutons Sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(Object.keys(MEMORY_SCENARIOS) as MemoryLeakKey[]).map((key) => {
            const item = MEMORY_SCENARIOS[key];
            const isSelected = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`p-3 text-left rounded-xl border text-xs font-bold transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className={`text-[10px] px-1.5 py-0.5 rounded w-fit mb-1.5 ${
                  isSelected ? 'bg-lime-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 font-bold'
                }`}>
                  {item.badge}
                </span>
                <span className="truncate text-xs font-semibold leading-snug">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Panneau de détail */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-950">{scenario.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 font-mono">
                Environnement concerné : <strong>{scenario.environment}</strong>
              </p>
            </div>

            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200">
              Profil de courbe Heap : <span className="font-mono font-black">{scenario.memoryCurveType}</span>
            </div>
          </div>

          {/* Symptôme constaté */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
            <span className="font-bold text-slate-950">Manifestation du bogue : </span>
            {scenario.symptomText}
          </div>

          {/* Arbre de retenue GC (Retainers) */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-rose-700 mb-1.5 flex items-center gap-1.5">
              <Icon name="search" className="w-3.5 h-3.5 text-rose-600" />
              <span>Arbre de Rétention GC (Vue Retainers dans Chrome DevTools Memory)</span>
            </div>
            <div className="rounded-xl bg-slate-950 p-3.5 text-rose-300 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
              {scenario.retainerTrace}
            </div>
          </div>

          {/* Code fautif vs Code résolu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-rose-600 mb-1.5">
                ❌ Code Fautif avec Rétention Invisible
              </div>
              <CodeBlock language="typescript" code={scenario.leakCode} />
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-600 mb-1.5">
                ✅ Code Épuré avec Nettoyage Conforme
              </div>
              <CodeBlock language="typescript" code={scenario.fixedCode} />
            </div>
          </div>

          {/* Règle d'or */}
          <div className="p-4 rounded-xl bg-lime-50 border border-lime-300 flex items-start gap-3">
            <Icon name="sparkles" className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-lime-950">
              <span className="font-bold">Règle de survie mémoire : </span>
              {scenario.takeaway}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TP : Mesure et Dépotoir Heap Snapshot automatique sous Node.js */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Surveillance process.memoryUsage() et Heap Snapshot automatique
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          En production, vous ne pouvez pas attacher Chrome DevTools manuellement à chaque serveur.
          Ce module Node.js surveille la consommation du Heap et déclenche un <strong>instantané de tas sur disque (.heapsnapshot)</strong>
          dès qu&apos;un seuil critique (ex: 85% de la limite V8) est franchi, juste avant le crash fatal :
        </p>

        <CodeBlock
          language="typescript"
          code={`import v8 from 'node:v8';
import fs from 'node:fs';
import path from 'node:path';

// 1. Fonction de lecture formattée de la mémoire
export function logMemoryStatus() {
  const mem = process.memoryUsage();
  const toMb = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

  console.log('[MONITORING MÉMOIRE]', {
    rss: \`\${toMb(mem.rss)} Mo\`,             // Mémoire totale RAM allouée au processus
    heapTotal: \`\${toMb(mem.heapTotal)} Mo\`, // Taille réservée du tas V8
    heapUsed: \`\${toMb(mem.heapUsed)} Mo\`,   // Mémoire réelle occupée par les objets vivants
    external: \`\${toMb(mem.external)} Mo\`    // Buffers C++ (Streams, fichiers, sockets)
  });
}

// 2. Surveillance proactive avec déclenchement d'instantané de sécurité
const MAX_HEAP_THRESHOLD_MB = 1024; // Seuil d'alerte : 1 Go

export function startMemoryGuard() {
  setInterval(() => {
    const mem = process.memoryUsage();
    const heapUsedMb = mem.heapUsed / 1024 / 1024;

    if (heapUsedMb > MAX_HEAP_THRESHOLD_MB) {
      console.error(\`[ALERTE CRITIQUE OOM] Le tas V8 a atteint \${heapUsedMb.toFixed(0)} Mo !\`);
      
      const dumpDir = path.join(process.cwd(), 'dumps');
      if (!fs.existsSync(dumpDir)) fs.mkdirSync(dumpDir);

      const filename = path.join(dumpDir, \`leak-\${Date.now()}.heapsnapshot\`);
      console.log(\`Génération du snapshot de secours vers : \${filename}...\`);

      // Écriture synchrone du tas V8 sur le disque
      v8.writeHeapSnapshot(filename);
      console.log('Snapshot sauvegardé avec succès. Ouvrez ce fichier dans Chrome DevTools > Memory !');
    }
  }, 10000); // Analyse toutes les 10 secondes
}`}
        />
      </section>

      {/* 5. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 5.2
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Évaluez votre compréhension du ramasse-miettes V8, de la gestion du tas et des fuites mémoire :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Comment l'algorithme Mark-and-Sweep du moteur Google V8 décide-t-il qu'un objet en mémoire doit être détruit par le Garbage Collector ?",
              options: [
                "En vérifiant si l'objet a été créé il y a plus de 60 secondes.",
                "En partant des racines fondamentales (GC Roots : window/global, Call Stack active) et en marquant tous les objets atteignables : tout objet non atteignable depuis les racines est balayé et libéré.",
                "En comptant le nombre de fois où la variable a été lue.",
                "En vérifiant la taille du fichier source sur le disque dur."
              ],
              correctIndex: 1,
              explanation: "V8 utilise l'accessibilité depuis les racines GC. Si un objet ne possède plus aucun chemin le reliant à l'objet global ou à la pile d'exécution en cours, il est considéré comme déchet et sa mémoire est réclamée."
            },
            {
              id: 2,
              question: "Pourquoi l'oubli de la fonction de nettoyage return () => clearInterval(id) dans un useEffect React provoque-t-il une fuite de mémoire ?",
              options: [
                "Parce que React supprime le fichier composant.",
                "Parce que la fonction de rappel du timer reste enregistrée dans l'environnement global et retient une fermeture (closure) sur toutes les variables et le nœud Fiber du composant démonté, empêchant le GC de les libérer.",
                "Parce que l'horloge du processeur se dérègle.",
                "Parce que le navigateur limite le nombre de timers à 1."
              ],
              correctIndex: 1,
              explanation: "Un intervalle actif est rattaché à l'objet racine window/timers. Tant que clearInterval n'est pas appelé, la closure du timer retient l'intégralité de l'arborescence du composant en mémoire vive, même si celui-ci a disparu de l'écran."
            },
            {
              id: 3,
              question: "Dans un Heap Snapshot de Chrome DevTools, quelle est la différence essentielle entre 'Shallow Size' et 'Retained Size' ?",
              options: [
                "Shallow Size est en octets alors que Retained Size est en mégaoctets.",
                "Shallow Size est la taille directe de l'objet seul, tandis que Retained Size est la mémoire totale qui serait libérée si cet objet et tous ses dépendants exclusifs étaient détruits.",
                "Shallow Size ne concerne que le code CSS.",
                "Il n'y a aucune différence, ce sont des synonymes."
              ],
              correctIndex: 1,
              explanation: "La Shallow Size d'un tableau d'objets peut n'être que de 32 octets (la structure du tableau), alors que sa Retained Size peut peser 500 Mo si ce tableau est le seul à retenir des milliers d'objets vivants."
            },
            {
              id: 4,
              question: "Quelle méthode native de Node.js permet d'exporter un snapshot de tas au format .heapsnapshot directement sur le disque en environnement de production ?",
              options: [
                "console.dumpMemory()",
                "v8.writeHeapSnapshot(filename)",
                "process.exportHeap()",
                "fs.saveMemoryDump()"
              ],
              correctIndex: 1,
              explanation: "Le module natif 'node:v8' fournit la méthode v8.writeHeapSnapshot(filename) qui génère un instantané exploitable directement dans l'onglet Memory de Chrome DevTools pour autopsier une fuite serveur."
            },
            {
              id: 5,
              question: "Dans le résultat de process.memoryUsage(), que représente la métrique 'rss' (Resident Set Size) par rapport à 'heapUsed' ?",
              options: [
                "rss est la vitesse du réseau en Ko/s.",
                "rss représente la totalité de la mémoire RAM physique occupée par le processus Node.js (code C++, tas V8, buffers, pile), tandis que heapUsed n'est que la part du tas occupée par les objets JavaScript.",
                "rss est toujours inférieur à heapUsed.",
                "rss ne concerne que les bases de données SQL."
              ],
              correctIndex: 1,
              explanation: "Le RSS est la mémoire physique réelle allouée par le système d'exploitation au processus. Le HeapUsed n'est qu'un sous-ensemble géré par V8 pour les objets applicatifs."
            },
            {
              id: 6,
              question: "Si la courbe d'utilisation de la mémoire d'un serveur forme des 'dents de scie' régulières (montée progressive puis rechute brutale), quel est le diagnostic ?",
              options: [
                "C'est une fuite mémoire critique qu'il faut corriger d'urgence.",
                "C'est le comportement parfaitement normal d'un environnement JavaScript : les objets sont alloués lors des requêtes, puis le Garbage Collector s'active périodiquement pour purger la mémoire morte.",
                "Le processeur est défaillant.",
                "Le réseau est saturé."
              ],
              correctIndex: 1,
              explanation: "Les dents de scie sont le signe d'un ramasse-miettes qui fonctionne normalement : la mémoire monte au fur et à mesure des allocations, puis chute drastiquement après chaque cycle de garbage collection. Une fuite se caractérise au contraire par un plancher qui ne redescend jamais."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre2Content;
