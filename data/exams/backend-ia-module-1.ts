import { ExamMetadata, ExamQuestion } from './types';

export const BACKEND_IA_MODULE_1_EXAM_METADATA: ExamMetadata = {
  moduleId: 'backend-ia-module-1',
  title: "Examen Officiel de Certification — Module 1 : Architecture interne de Node.js, Mémoire V8 & Event Loop",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (32/40)
  totalQuestions: 40,
};

export const BACKEND_IA_MODULE_1_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "Dans le moteur JavaScript V8 de Node.js, quelle est la distinction fondamentale entre la 'Call Stack' et le 'Heap' (tas de mémoire) ?",
    options: [
      { letter: 'A', text: "La Call Stack gère les frames d'exécution LIFO et les types primitifs locaux, tandis que le Heap alloue dynamiquement les objets et tableaux en mémoire non contiguë." },
      { letter: 'B', text: "La Call Stack stocke les variables globales et les closures, tandis que le Heap gère les fonctions asynchrones." },
      { letter: 'C', text: "La Call Stack est partagée entre tous les Worker Threads, tandis que le Heap est strictement réservé au thread principal." },
      { letter: 'D', text: "La Call Stack réside sur le disque SSD, tandis que le Heap réside exclusivement dans la mémoire cache L1 du processeur." },
    ],
    correctAnswers: ['A'],
    explanation: "La Call Stack (pile d'appels) suit une structure LIFO (Last-In, First-Out) pour orchestrer l'ordre des fonctions en cours d'exécution et stocker les variables primitives locales, tandis que le Heap alloue dynamiquement la mémoire pour les objets complexes, closures et tableaux dont la durée de vie dépasse la frame d'appel.",
  },
  {
    id: 2,
    codeSnippet: `const v8 = require('v8');
console.log(v8.getHeapStatistics());`,
    question: "Quelle propriété retournée par `v8.getHeapStatistics()` indique la limite maximale de mémoire allouable au tas V8 avant un crash 'JavaScript heap out of memory' ?",
    options: [
      { letter: 'A', text: "total_physical_size" },
      { letter: 'B', text: "heap_size_limit" },
      { letter: 'C', text: "used_heap_size" },
      { letter: 'D', text: "total_available_size" },
    ],
    correctAnswers: ['B'],
    explanation: "`heap_size_limit` correspond au plafond absolu de mémoire vive que le moteur V8 s'autorise à allouer pour le Heap (par défaut environ 1,4 Go ou 2 Go sur machines 64-bit, modifiable avec --max-old-space-size).",
  },
  {
    id: 3,
    question: "Comment le Garbage Collector V8 partitionne-t-il la mémoire du tas (Heap) pour optimiser les performances de collecte selon l'hypothèse générationnelle (Generational Hypothesis) ?",
    options: [
      { letter: 'A', text: "En blocs fixes de 64 Mo attribués aléatoirement à chaque module NPM." },
      { letter: 'B', text: "En mémoire synchrone pour les callbacks et mémoire asynchrone pour les promesses." },
      { letter: 'C', text: "En New Space (Young Generation) pour les objets éphémères et Old Space (Old Generation) pour les objets survivants." },
      { letter: 'D', text: "En espace CPU pour les calculs et espace GPU pour les buffers vidéo." },
    ],
    correctAnswers: ['C'],
    explanation: "L'hypothèse générationnelle postule que la vaste majorité des objets meurent très jeunes. V8 sépare donc le tas en New Space (divisé en semi-espaces From/To gérés par l'algorithme Scavenger ultra-rapide) et Old Space (géré par Mark-Sweep-Compact pour les objets pérennes).",
  },
  {
    id: 4,
    question: "Quel algorithme de Garbage Collection est utilisé par V8 pour nettoyer le New Space (Young Generation) avec une copie compactante ultra-rapide ?",
    options: [
      { letter: 'A', text: "L'algorithme de Dijkstra" },
      { letter: 'B', text: "L'algorithme de tri Rapide (QuickSort) inversé" },
      { letter: 'C', text: "L'algorithme Mark-Sweep-Compact complet" },
      { letter: 'D', text: "L'algorithme Scavenge (fondé sur la méthode de Cheney)" },
    ],
    correctAnswers: ['D'],
    explanation: "Le Scavenger (algorithme de Cheney) divise le New Space en deux semi-espaces (From et To). Lors d'un Scavenge, les objets vivants sont copiés compactés dans l'espace To (ou promus dans le Old Space s'ils ont survécu à deux cycles), et l'espace From est instantanément recyclé.",
  },
  {
    id: 5,
    codeSnippet: `setTimeout(() => console.log('1: Timer'), 0);
setImmediate(() => console.log('2: Immediate'));
process.nextTick(() => console.log('3: NextTick'));
Promise.resolve().then(() => console.log('4: Promise'));`,
    question: "Dans quel ordre exact ces instructions sont-elles affichées dans la console lors de l'exécution initiale du script sous Node.js ?",
    options: [
      { letter: 'A', text: "3: NextTick -> 4: Promise -> 1: Timer -> 2: Immediate (ou 2 puis 1 selon l'initialisation du tick)" },
      { letter: 'B', text: "1: Timer -> 2: Immediate -> 3: NextTick -> 4: Promise" },
      { letter: 'C', text: "4: Promise -> 3: NextTick -> 2: Immediate -> 1: Timer" },
      { letter: 'D', text: "2: Immediate -> 1: Timer -> 4: Promise -> 3: NextTick" },
    ],
    correctAnswers: ['A'],
    explanation: "`process.nextTick` est prioritaire sur toutes les microtâches et s'exécute immédiatement après le bloc de code courant, suivi de la file des promesses (`Promise.then`). Les macrotâches de l'Event Loop (`setTimeout` dans la phase Timers et `setImmediate` dans la phase Check) ne s'exécutent qu'ensuite.",
  },
  {
    id: 6,
    question: "Quelle est la différence fondamentale d'ordonnancement entre `process.nextTick()` et `setImmediate()` dans l'Event Loop de Node.js ?",
    options: [
      { letter: 'A', text: "`process.nextTick()` s'exécute à chaque saut de frame GPU, alors que `setImmediate()` s'exécute toutes les 1000 millisecondes." },
      { letter: 'B', text: "`process.nextTick()` vide sa file immédiatement à la fin de la phase courante avant tout passage à une autre phase, tandis que `setImmediate()` est une macrotâche programmée dans la phase 'Check'." },
      { letter: 'C', text: "`setImmediate()` est synchrone et bloquant, alors que `process.nextTick()` est toujours exécuté dans un thread séparé." },
      { letter: 'D', text: "Il n'y a aucune différence, `setImmediate` est juste un alias déprécié de `process.nextTick`." },
    ],
    correctAnswers: ['B'],
    explanation: "`process.nextTick` ne fait pas partie de Libuv mais de l'implémentation Node.js : sa file de microtâches est purgée immédiatement après le tour de pile courant, pouvant provoquer la famine (starvation) de l'Event Loop si appelée récursivement. `setImmediate` s'exécute sagement dans la phase Check de Libuv.",
  },
  {
    id: 7,
    codeSnippet: `const fs = require('fs');

fs.readFile('large_model.bin', () => {
  setTimeout(() => console.log('A: Timer inside I/O'), 0);
  setImmediate(() => console.log('B: Immediate inside I/O'));
});`,
    question: "À l'intérieur du callback de complétion I/O (`fs.readFile`), quel message est TOUJOURS garanti d'être affiché en premier, et pourquoi ?",
    options: [
      { letter: 'A', text: "'A: Timer inside I/O' car les timers ont toujours la priorité absolue dans Libuv." },
      { letter: 'B', text: "L'ordre est totalement aléatoire selon la température du processeur." },
      { letter: 'C', text: "'B: Immediate inside I/O' car le callback I/O s'exécute dans la phase 'Poll', et la phase suivante immédiate est toujours la phase 'Check'." },
      { letter: 'D', text: "'A: Timer inside I/O' car `setTimeout(..., 0)` possède un délai de 0 milliseconde sans latence." },
    ],
    correctAnswers: ['C'],
    explanation: "Dans le cycle Libuv, les callbacks I/O sont traités dans la phase 'Poll'. Lorsque la phase Poll s'achève, l'Event Loop passe immédiatement à la phase 'Check' où résident les callbacks de `setImmediate()`. La phase 'Timers' ne sera atteinte qu'au tour suivant.",
  },
  {
    id: 8,
    codeSnippet: `function heavyLeak() {
  const bigArray = new Array(1000000).fill("données volumineuses IA");
  return function() {
    console.log("Accès minime");
  };
}
const leakyHandler = heavyLeak();`,
    question: "Pourquoi la fonction retournée `leakyHandler` peut-elle provoquer une rétention mémoire indésirable (fuite mémoire de closure) ?",
    options: [
      { letter: 'A', text: "Parce que V8 détruit automatiquement les fonctions qui contiennent le mot 'leak'." },
      { letter: 'B', text: "Parce que les fonctions retournées en JavaScript sont toujours migrées vers le swap Linux." },
      { letter: 'C', text: "Parce que `Array.fill` alloue la mémoire dans le registre matériel de la carte réseau." },
      { letter: 'D', text: "Parce que l'environnement lexical de la closure conserve une référence au contexte parent englobant contenant `bigArray` tant que `leakyHandler` reste accessible." },
    ],
    correctAnswers: ['D'],
    explanation: "Lorsqu'une fonction interne est conservée en mémoire (ex: dans un écouteur d'événement ou une variable globale), elle maintient en vie son contexte de fermeture (Lexical Scope) englobant. Si ce scope contient des structures volumineuses non dissociées, elles ne peuvent être collectées par le GC.",
  },
  {
    id: 9,
    question: "Quel composant interne de Node.js est responsable de la gestion des opérations I/O asynchrones non bloquantes, de la boucle d'événements et du pool de threads sous-jacent ?",
    options: [
      { letter: 'A', text: "Libuv" },
      { letter: 'B', text: "V8" },
      { letter: 'C', text: "Babel" },
      { letter: 'D', text: "Webpack" },
    ],
    correctAnswers: ['A'],
    explanation: "Libuv est la bibliothèque C multiplateforme qui fournit à Node.js sa boucle d'événements (Event Loop), son système d'I/O asynchrone non bloquant (epoll sur Linux, kqueue sur macOS, IOCP sur Windows) et son pool de threads interne.",
  },
  {
    id: 10,
    question: "Quelles opérations Node.js sont déléguées par défaut au pool de threads Libuv (UV_THREADPOOL_SIZE) plutôt qu'aux mécanismes I/O non bloquants du noyau du système d'exploitation ?",
    options: [
      { letter: 'A', text: "Les requêtes réseau HTTP et les connexions TCP sortantes." },
      { letter: 'B', text: "Les opérations sur le système de fichiers (`fs`), `dns.lookup`, la compression (`zlib`) et certaines opérations cryptographiques (`crypto.pbkdf2`)." },
      { letter: 'C', text: "Le rendu des composants React et l'exécution du code CSS." },
      { letter: 'D', text: "L'instruction `console.log` et les opérateurs arithmétiques `+` et `*`." },
    ],
    correctAnswers: ['B'],
    explanation: "Les sockets réseau utilisent les I/O asynchrones natives du noyau (epoll/kqueue). En revanche, le système de fichiers (fs), la résolution DNS bloquante (`dns.lookup`), la compression (zlib) et les calculs crypto intensifs s'exécutent dans le pool de threads Libuv (taille par défaut : 4).",
  },
  {
    id: 11,
    codeSnippet: `const EventEmitter = require('events');
const emitter = new EventEmitter();

function setupListener(dataStream: any) {
  const buffer = Buffer.alloc(1024 * 1024 * 10); // 10 Mo
  emitter.on('chunk', (data) => {
    // traitement avec buffer
  });
}`,
    question: "Si `setupListener` est appelée à chaque requête entrante sur une API sans appeler `emitter.removeListener`, quelle anomalie va survenir ?",
    options: [
      { letter: 'A', text: "Une corruption des tables de routage IP de l'infrastructure." },
      { letter: 'B', text: "L'arrêt immédiat du serveur avec une erreur 'Stack Overflow'." },
      { letter: 'C', text: "Une fuite de mémoire cumulative due à l'accumulation d'écouteurs d'événements retenant chacun leur buffer de 10 Mo dans le tas, signalée par l'avertissement 'MaxListenersExceededWarning'." },
      { letter: 'D', text: "La transformation du buffer en chaîne de caractères UTF-16." },
    ],
    correctAnswers: ['C'],
    explanation: "Chaque appel ajoute un nouvel écouteur au tableau interne de l'EventEmitter global. Ces callbacks capturent la closure contenant le `buffer` de 10 Mo. Sans désinscription (`removeListener` ou `off`), la mémoire vive croît linéairement jusqu'au crash par épuisement du Heap.",
  },
  {
    id: 12,
    question: "Quel drapeau (flag) en ligne de commande permet d'augmenter la limite de mémoire maximale du tas allouée à une application Node.js effectuant des traitements de données volumineuses ?",
    options: [
      { letter: 'A', text: "--force-gc-interval=1000" },
      { letter: 'B', text: "--expand-ram-buffer=4GB" },
      { letter: 'C', text: "--v8-unlimited-heap" },
      { letter: 'D', text: "--max-old-space-size=4096" },
    ],
    correctAnswers: ['D'],
    explanation: "Le drapeau `--max-old-space-size=<Mo>` permet d'ajuster le plafond mémoire du Old Space V8 (ex: `--max-old-space-size=4096` alloue 4 Go de mémoire pour le tas).",
  },
  {
    id: 13,
    codeSnippet: `const express = require('express');
const app = express();

app.get('/compute', (req, res) => {
  // Calcul synchrone bloquant
  const start = Date.now();
  while (Date.now() - start < 5000) {} // Bloque pendant 5 secondes
  res.send('Calcul terminé');
});`,
    question: "Quel impact critique ce blocage synchrone de 5 secondes a-t-il sur les autres utilisateurs accédant simultanément à d'autres routes (ex: `GET /health`) de ce serveur Express ?",
    options: [
      { letter: 'A', text: "Toutes les autres requêtes sont gelées et ne reçoivent aucune réponse tant que la boucle bloquante monopolise le thread principal (famine de l'Event Loop)." },
      { letter: 'B', text: "Aucun, car Express crée automatiquement un thread matériel séparé pour chaque route." },
      { letter: 'C', text: "Express répond immédiatement 404 aux autres utilisateurs." },
      { letter: 'D', text: "Le système d'exploitation bascule automatiquement la route bloquante sur le GPU." },
    ],
    correctAnswers: ['A'],
    explanation: "Node.js exécute le code JavaScript sur un thread principal unique. Une boucle bloquante synchrone (while, regex catastrophique, `JSON.parse` de 500 Mo) empêche l'Event Loop d'avancer, bloquant toutes les autres connexions et requêtes en attente.",
  },
  {
    id: 14,
    question: "Dans le cycle de vie de la phase de Garbage Collection 'Mark-Sweep-Compact' de V8, quelle est la fonction spécifique de l'étape de 'Compaction' ?",
    options: [
      { letter: 'A', text: "Compresser les chaînes de caractères en format Gzip dans la mémoire vive." },
      { letter: 'B', text: "Déplacer et regrouper les objets survivants contigus en mémoire pour résorber la fragmentation du tas et libérer de larges plages d'adresses contiguës." },
      { letter: 'C', text: "Supprimer les fichiers temporaires du système d'exploitation." },
      { letter: 'D', text: "Traduire le bytecode V8 en code binaire natif ARM64." },
    ],
    correctAnswers: ['B'],
    explanation: "Après le marquage (Mark) et la libération (Sweep), la mémoire ressemble à du gruyère (fragmentation externe). L'étape de Compactage (Compact) reloge physiquement les objets restants les uns à côté des autres pour réagréger des blocs de mémoire contigus utilisables pour de futures allocations.",
  },
  {
    id: 15,
    codeSnippet: `function triggerInfiniteTick() {
  process.nextTick(triggerInfiniteTick);
}
triggerInfiniteTick();
setTimeout(() => console.log('Timer exécuté'), 0);`,
    question: "Que se produit-il lors de l'exécution de ce script sous Node.js ?",
    options: [
      { letter: 'A', text: "'Timer exécuté' s'affiche immédiatement car les timers sont prioritaires." },
      { letter: 'B', text: "V8 lance une exception 'Maximum call stack size exceeded'." },
      { letter: 'C', text: "L'Event Loop est complètement affamée (Starvation) : la file `nextTick` est traitée en continu sans fin et le timer ne s'exécutera jamais." },
      { letter: 'D', text: "Le système d'exploitation termine le processus avec un code d'erreur de segmentation fault." },
    ],
    correctAnswers: ['C'],
    explanation: "`process.nextTick` insère un callback dans la file de microtâches de Node.js. Comme cette file est vidée jusqu'à épuisement avant de passer à toute autre phase de l'Event Loop, une récursion infinie de `nextTick` affame complètement l'Event Loop, empêchant tout timer ou I/O de s'exécuter.",
  },
  {
    id: 16,
    question: "Quel outil natif de profilage peut être activé au démarrage de Node.js pour inspecter visuellement l'utilisation de la mémoire et capturer des Heap Snapshots dans Chrome DevTools ?",
    options: [
      { letter: 'A', text: "node --debug-memory-cloud app.js" },
      { letter: 'B', text: "node --enable-ram-chart app.js" },
      { letter: 'C', text: "node --profiler-gui app.js" },
      { letter: 'D', text: "node --inspect app.js" },
    ],
    correctAnswers: ['D'],
    explanation: "L'argument `--inspect` (ou `--inspect-brk`) démarre le serveur de débogage Node.js sur le port 9229, permettant de connecter l'interface Chrome DevTools (`chrome://inspect`) pour réaliser des profils CPU et des captures de clichés mémoire (Heap Snapshots).",
  },
  {
    id: 17,
    question: "Dans un cliché de mémoire (Heap Snapshot) V8, que désigne la métrique 'Retained Size' d'un objet par rapport à sa 'Shallow Size' ?",
    options: [
      { letter: 'A', text: "La mémoire totale qui serait immédiatement libérée si cet objet était collecté par le GC, incluant tous les objets dépendants devenus inaccessibles." },
      { letter: 'B', text: "La quantité de données déjà synchronisées sur la base de données PostgreSQL." },
      { letter: 'C', text: "Le poids du fichier JavaScript sur le disque dur." },
      { letter: 'D', text: "Le nombre total de lignes de code de la classe instanciée." },
    ],
    correctAnswers: ['A'],
    explanation: "La 'Shallow Size' est la mémoire directement occupée par l'objet lui-même. La 'Retained Size' inclut la mémoire de cet objet ainsi que de tous les objets enfants qu'il est le seul à maintenir en vie dans l'arbre de références (Retainer Tree).",
  },
  {
    id: 18,
    codeSnippet: `const { performance, PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(\`Durée Event Loop Lag: \${entry.duration}ms\`);
  });
});
obs.observe({ entryTypes: ['event-loop-lag'] });`,
    question: "Que mesure précisément la métrique 'Event Loop Lag' (ou Event Loop Delay) dans un service backend de production ?",
    options: [
      { letter: 'A', text: "Le temps de latence de la liaison par fibre optique entre le client et le serveur." },
      { letter: 'B', text: "Le retard pris par la boucle d'événements pour traiter une tâche planifiée, témoignant d'une surcharge CPU ou d'opérations synchrones bloquantes sur le thread principal." },
      { letter: 'C', text: "La fréquence de rafraîchissement de l'écran en Hertz." },
      { letter: 'D', text: "Le temps nécessaire pour compiler le code TypeScript avec `tsc`." },
    ],
    correctAnswers: ['B'],
    explanation: "L'Event Loop Lag mesure l'écart entre le moment où une tâche (ex: un timer) aurait dû être exécutée et le moment où elle a réellement pu obtenir la main. Un lag élevé indique que le thread principal est saturé par des calculs synchrones.",
  },
  {
    id: 19,
    question: "Pourquoi est-il généralement proscrit d'appeler explicitement `global.gc()` dans le code d'une application backend Node.js en production ?",
    options: [
      { letter: 'A', text: "Parce que cette fonction corrompt le registre des paquets NPM." },
      { letter: 'B', text: "Parce que V8 supprime le fichier de configuration `.env` lors d'un GC manuel." },
      { letter: 'C', text: "Parce qu'un cycle de Garbage Collection complet 'Stop-The-World' fige l'exécution de tout le code applicatif, dégradant brutalement la latence et le débit sous forte charge." },
      { letter: 'D', text: "Parce que `global.gc()` est une instruction réservée aux cartes mères Intel." },
    ],
    correctAnswers: ['C'],
    explanation: "Forcer le GC (qui nécessite `--expose-gc`) déclenche une phase majeure bloquante (Full GC Stop-the-world). Le moteur V8 sait orchestrer ses collectes de manière incrémentale et optimisée bien mieux qu'un déclenchement manuel intempestif.",
  },
  {
    id: 20,
    codeSnippet: `const crypto = require('crypto');

for (let i = 0; i < 4; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
    console.log(\`Hash terminé: \${i}\`);
  });
}`,
    question: "Si la variable d'environnement `UV_THREADPOOL_SIZE` est fixée à 2, comment ces 4 opérations de hachage asynchrones `pbkdf2` s'exécutent-elles ?",
    options: [
      { letter: 'A', text: "Les 4 s'exécutent strictement en parallèle simultané en 100 ms." },
      { letter: 'B', text: "Les calculs sont automatiquement transférés vers le navigateur de l'utilisateur." },
      { letter: 'C', text: "Le programme plante avec une erreur 'Thread pool saturation'." },
      { letter: 'D', text: "Les 2 premières occupent les 2 threads du pool Libuv, puis les 2 suivantes ne commencent leur calcul qu'une fois les premières libérées." },
    ],
    correctAnswers: ['D'],
    explanation: "`crypto.pbkdf2` délègue son travail au threadpool Libuv. Avec `UV_THREADPOOL_SIZE=2`, seuls 2 threads de calcul sont disponibles simultanément. Les requêtes 3 et 4 patientent en file d'attente que l'un des deux premiers calculs se termine.",
  },
  {
    id: 21,
    question: "Dans le moteur V8, qu'est-ce qu'une 'Hidden Class' (classe cachée ou Shape) et comment favorise-t-elle les optimisations de performance du compilateur TurboFan ?",
    options: [
      { letter: 'A', text: "Une structure interne partagée par les objets ayant les mêmes propriétés dans le même ordre, permettant des accès mémoire par décalage fixe direct (Inline Caches)." },
      { letter: 'B', text: "Une classe CSS masquée par `display: none` dans le DOM." },
      { letter: 'C', text: "Un mécanisme de chiffrement AES-256 pour les objets privés en JavaScript." },
      { letter: 'D', text: "Une directive TypeScript supprimant les commentaires lors de la compilation." },
    ],
    correctAnswers: ['A'],
    explanation: "V8 crée dynamiquement des classes cachées (Shapes/Maps) pour chaque structure d'objet. Si deux objets ont exactement les mêmes propriétés déclarées dans le même ordre, ils partagent la même Shape, permettant au compilateur JIT d'optimiser l'accès aux champs via des Inline Caches ultra-rapides.",
  },
  {
    id: 22,
    codeSnippet: `function Point(x, y) {
  this.x = x;
  this.y = y;
}
const p1 = new Point(1, 2);
const p2 = new Point(3, 4);
p2.z = 5; // Modification dynamique de forme`,
    question: "Quel phénomène d'optimisation V8 est dégradé lorsque l'on ajoute dynamiquement la propriété `z` sur l'instance `p2` uniquement ?",
    options: [
      { letter: 'A', text: "V8 convertit la variable `p2` en chaîne binaire non typée." },
      { letter: 'B', text: "L'instance `p2` subit une transition de classe cachée (Shape Transition), ce qui désoptimise les Inline Caches monomorphes de la fonction accédant aux points." },
      { letter: 'C', text: "Le processeur passe en mode 16 bits pour gérer le nouveau champ." },
      { letter: 'D', text: "La mémoire allouée à `p1` est immédiatement détruite par le Scavenger." },
    ],
    correctAnswers: ['B'],
    explanation: "L'ajout d'une propriété impromptue force V8 à créer une nouvelle Shape (transition de forme). Si une fonction recevait toujours des objets de même Shape (état monomorphe), elle devient polymorphe ou mégamorphe, ce qui désoptimise le code machine compilé par TurboFan.",
  },
  {
    id: 23,
    question: "Dans la boucle d'événements Libuv, quel est le rôle précis de la phase 'Poll' ?",
    options: [
      { letter: 'A', text: "Arrêter le processus Node.js si la mémoire RAM dépasse 50%." },
      { letter: 'B', text: "Exécuter les instructions `setImmediate()`." },
      { letter: 'C', text: "Récupérer les nouveaux événements I/O (sockets réseau, lectures fichiers), exécuter leurs callbacks et calculer combien de temps bloquer en attente d'I/O." },
      { letter: 'D', text: "Calculer les hashs cryptographiques des mots de passe." },
    ],
    correctAnswers: ['C'],
    explanation: "La phase 'Poll' est le cœur de l'Event Loop : elle interroge le système d'exploitation pour savoir si de nouvelles connexions ou données réseau sont prêtes, exécute leurs callbacks, et gère le temps de veille bloquant si aucune autre tâche n'est prête.",
  },
  {
    id: 24,
    codeSnippet: `let cache = {};
function getPrediction(prompt) {
  if (!cache[prompt]) {
    cache[prompt] = expensiveInference(prompt);
  }
  return cache[prompt];
}`,
    question: "Pourquoi ce pattern de cache en mémoire vive naïvement implémenté présente-t-il un risque critique de fuite de mémoire sur un serveur API recevant des millions de requêtes variées ?",
    options: [
      { letter: 'A', text: "Parce que la fonction `expensiveInference` est obligée d'être synchrone." },
      { letter: 'B', text: "Parce que JavaScript n'autorise pas plus de 256 clés dans un objet littéral." },
      { letter: 'C', text: "Parce que les objets littéraux sont automatiquement sauvegardés sur le disque dur." },
      { letter: 'D', text: "Parce que l'objet `cache` n'implémente aucune politique d'éviction (TTL ou LRU) et va croître indéfiniment jusqu'à saturer le Heap V8." },
    ],
    correctAnswers: ['D'],
    explanation: "Un dictionnaire en mémoire globale sans politique d'éviction (ex: Least Recently Used - LRU) ni expiration temporelle (TTL) accumule toutes les requêtes historiques jusqu'à l'inévitable erreur `JavaScript heap out of memory`.",
  },
  {
    id: 25,
    question: "Quelle est la particularité d'un `Buffer` Node.js par rapport aux tableaux de données JavaScript standard (`Array` ou `TypedArray`) ?",
    options: [
      { letter: 'A', text: "Le `Buffer` alloue de la mémoire brute hors du tas V8 (mémoire 'Off-Heap' via C++), évitant la surcharge du Garbage Collector JavaScript pour les flux binaires massifs." },
      { letter: 'B', text: "Le `Buffer` ne peut contenir que des nombres négatifs." },
      { letter: 'C', text: "Le `Buffer` est stocké sur la carte graphique GPU." },
      { letter: 'D', text: "Le `Buffer` est recréé à chaque microseconde par le noyau Linux." },
    ],
    correctAnswers: ['A'],
    explanation: "Les `Buffer` de Node.js sont alloués en mémoire native C++ hors du Heap V8 principal (Off-Heap). Cela permet de manipuler des centaines de mégaoctets de données binaires (fichiers, sockets) sans encombrer le ramasse-miettes V8.",
  },
  {
    id: 26,
    codeSnippet: `const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(\`Sortie: \${data}\`);
});`,
    question: "Pourquoi l'utilisation de `spawn` est-elle hautement recommandée par rapport à `exec` lors de l'exécution de sous-processus traitant des volumes massifs de données ?",
    options: [
      { letter: 'A', text: "Parce que `exec` ne fonctionne pas sur les serveurs Linux." },
      { letter: 'B', text: "Parce que `spawn` renvoie un flux continu (Stream) consommant très peu de mémoire, tandis que `exec` charge l'intégralité de la sortie dans un buffer mémoire plafonné par défaut (maxBuffer: 1 Mo)." },
      { letter: 'C', text: "Parce que `spawn` s'exécute directement dans le navigateur du client." },
      { letter: 'D', text: "Parce que `spawn` n'a pas besoin de droits d'administrateur." },
    ],
    correctAnswers: ['B'],
    explanation: "`child_process.exec` accumule toute la sortie du processus dans un buffer unique en mémoire vive et lève une exception si la sortie dépasse `maxBuffer` (1 Mo par défaut). `spawn` repose sur des Streams, gérant n'importe quelle taille de flux sans saturation mémoire.",
  },
  {
    id: 27,
    question: "Dans le cadre de la gestion des erreurs asynchrones non interceptées, quelle est la bonne pratique absolue lors de l'interception de l'événement `uncaughtException` sur le processus Node.js ?",
    options: [
      { letter: 'A', text: "Ignorer silencieusement l'erreur et continuer d'accepter de nouvelles requêtes." },
      { letter: 'B', text: "Relancer immédiatement la fonction qui a échoué dans une boucle `while(true)`." },
      { letter: 'C', text: "Logger immédiatement l'erreur critique, fermer gracieusement les connexions ouvertes et quitter le processus (`process.exit(1)`) pour laisser le gestionnaire de processus (PM2/Docker/K8s) le redémarrer proprement." },
      { letter: 'D', text: "Effacer l'historique de la mémoire vive avec `v8.setFlagsFromString`." },
    ],
    correctAnswers: ['C'],
    explanation: "Lors d'une exception non gérée, l'état interne de l'application peut être gravement corrompu (closures rompues, sockets orphelines, locks non libérés). La seule attitude sûre en ingénierie de production est de logger, terminer proprement les requêtes en cours et redémarrer le processus.",
  },
  {
    id: 28,
    codeSnippet: `const stream = fs.createReadStream('audio_input.wav');
const writeStream = fs.createWriteStream('audio_output.wav');

stream.pipe(writeStream);`,
    question: "Quel mécanisme de gestion de flux automatique la méthode `.pipe()` (ou `pipeline()`) résout-elle entre un flux de lecture rapide et un flux d'écriture lent ?",
    options: [
      { letter: 'A', text: "Le chiffrement symétrique des octets." },
      { letter: 'B', text: "La conversion automatique du format WAV en MP3." },
      { letter: 'C', text: "L'augmentation automatique de la bande passante réseau." },
      { letter: 'D', text: "La gestion de la contropression (Backpressure), mettant en pause la lecture tant que la mémoire tampon d'écriture est saturée." },
    ],
    correctAnswers: ['D'],
    explanation: "Si un lecteur produit des données plus vite que le consommateur ne peut les écrire, la mémoire RAM gonfle jusqu'au débordement. Le mécanisme de 'Backpressure' géré par `.pipe()` et `stream.pipeline` met en pause le ReadStream lorsque le tampon du WriteStream dépasse `highWaterMark`.",
  },
  {
    id: 29,
    question: "Pourquoi est-il fortement recommandé d'utiliser `stream.pipeline` (du module `stream/promises`) plutôt que `.pipe()` traditionnel dans les applications modernes ?",
    options: [
      { letter: 'A', text: "Parce que `pipeline` gère automatiquement la destruction propre des flux et le nettoyage des descripteurs de fichiers en cas d'erreur ou d'interruption prématurée." },
      { letter: 'B', text: "Parce que `.pipe()` ne fonctionne pas avec les formats texte." },
      { letter: 'C', text: "Parce que `pipeline` double la vitesse de la carte réseau." },
      { letter: 'D', text: "Parce que `pipeline` est codé en WebAssembly natif." },
    ],
    correctAnswers: ['A'],
    explanation: "Avec `.pipe()` historique, si le flux de destination échoue, le flux source ne se ferme pas automatiquement, créant des fuites de sockets et de descripteurs de fichiers. `stream.pipeline()` garantit la fermeture complète et la capture propre des erreurs dans une promesse.",
  },
  {
    id: 30,
    codeSnippet: `import { createServer } from 'http';

const server = createServer((req, res) => {
  if (req.url === '/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  }
});
server.listen(3000);`,
    question: "Dans cette architecture de serveur HTTP basique, quelle phase de Libuv traite la création de la socket lors de l'établissement d'une nouvelle connexion entrante ?",
    options: [
      { letter: 'A', text: "La phase Timers" },
      { letter: 'B', text: "La phase Poll" },
      { letter: 'C', text: "La phase Check" },
      { letter: 'D', text: "La phase Idle" },
    ],
    correctAnswers: ['B'],
    explanation: "Les notifications de connexion entrante réseau sur les ports écoutés sont émises par le noyau OS (via epoll/kqueue) et captées durant la phase 'Poll' de Libuv, qui déclenche ensuite l'événement `'connection'` du serveur HTTP.",
  },
  {
    id: 31,
    question: "Quel est l'impact de l'utilisation de `fs.readFileSync` au sein d'une route d'API Express traitant un volume élevé de requêtes simultanées ?",
    options: [
      { letter: 'A', text: "Cela améliore la latence en court-circuitant l'Event Loop." },
      { letter: 'B', text: "Cela force Node.js à utiliser le GPU pour la lecture des octets." },
      { letter: 'C', text: "Cela bloque intégralement l'exécution de tout le serveur pour tous les clients connectés pendant toute la durée de la lecture disque." },
      { letter: 'D', text: "Cela alloue un nouveau thread système pour chaque fichier lu." },
    ],
    correctAnswers: ['C'],
    explanation: "Les méthodes synchrones `*Sync` de Node.js bloquent le thread d'exécution JavaScript unique. Pendant que le disque dur lit le fichier, aucune autre requête réseau ou callback ne peut être traité par l'Event Loop.",
  },
  {
    id: 32,
    codeSnippet: `const { AsyncLocalStorage } = require('async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();

function logWithContext(message) {
  const store = asyncLocalStorage.getStore();
  console.log(\`[\${store?.requestId || 'anonyme'}] \${message}\`);
}`,
    question: "À quoi sert la classe `AsyncLocalStorage` introduite dans l'API `async_hooks` de Node.js dans un backend d'IA ?",
    options: [
      { letter: 'A', text: "À sauvegarder des fichiers JSON sur le disque local de manière synchrone." },
      { letter: 'B', text: "À stocker les cookies dans le navigateur du client." },
      { letter: 'C', text: "À remplacer Redis pour la mise en cache de prompts." },
      { letter: 'D', text: "À propager un contexte d'état (comme un `requestId`, une session ou des métadonnées de traçage) à travers l'ensemble des promesses et continuations asynchrones sans avoir à le passer en paramètre de chaque fonction." },
    ],
    correctAnswers: ['D'],
    explanation: "`AsyncLocalStorage` permet de maintenir un contexte persistant (comme un trace ID OpenTelemetry ou un ID d'utilisateur) à travers des chaînes de promesses et d'opérations asynchrones imbriquées, sans avoir à propager explicitement cet argument de fonction en fonction.",
  },
  {
    id: 33,
    question: "Dans le cadre de l'optimisation des performances V8, pourquoi est-il fortement conseillé d'initialiser tous les champs d'un objet dès son constructeur plutôt que d'en ajouter au fur et à mesure ?",
    options: [
      { letter: 'A', text: "Pour garantir une forme d'objet ('Shape') stable et éviter les transitions de classes cachées multiples qui désoptimisent le compilateur JIT." },
      { letter: 'B', text: "Pour que le fichier JavaScript compile plus vite avec Babel." },
      { letter: 'C', text: "Pour crypter automatiquement les propriétés en RAM." },
      { letter: 'D', text: "Pour empêcher l'utilisation des fonctions fléchées." },
    ],
    correctAnswers: ['A'],
    explanation: "Initialiser tous les champs (même à `null` ou `undefined`) dès la création de l'objet garantit que toutes les instances partagent immédiatement la même structure (Shape), permettant à V8 d'accéder aux champs avec un décalage mémoire constant sans transition de classe cachée.",
  },
  {
    id: 34,
    codeSnippet: `const regex = /(a+)+$/;
const input = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaX";
regex.test(input);`,
    question: "Quel problème de performance critique ce type d'expression régulière peut-il provoquer sur le thread principal d'un serveur Node.js ?",
    options: [
      { letter: 'A', text: "Une surcharge de la mémoire du processeur graphique." },
      { letter: 'B', text: "Un déni de service par retour sur trace catastrophique (ReDoS / Catastrophic Backtracking) monopolisant 100% du CPU pendant de longues minutes." },
      { letter: 'C', text: "Une corruption des paquets TCP sortants." },
      { letter: 'D', text: "Une conversion involontaire de la chaîne en code binaire." },
    ],
    correctAnswers: ['B'],
    explanation: "Les expressions régulières contenant des quantificateurs imbriqués non possessifs provoquent un nombre exponentiel de combinaisons explorées en cas d'échec de correspondance. Cette attaque ou anomalie (ReDoS) fige le thread JavaScript de Node.js.",
  },
  {
    id: 35,
    question: "Quelle phase de l'Event Loop Libuv est dédiée à l'exécution des fonctions de nettoyage déclenchées par l'événement `'close'` (ex: `socket.on('close', ...)` ) ?",
    options: [
      { letter: 'A', text: "La phase Timers" },
      { letter: 'B', text: "La phase Poll" },
      { letter: 'C', text: "La phase Close Callbacks" },
      { letter: 'D', text: "La phase Pending Callbacks" },
    ],
    correctAnswers: ['C'],
    explanation: "La phase 'Close Callbacks' est l'ultime phase d'un tour de l'Event Loop Libuv. Elle exécute spécifiquement les callbacks de fermeture de descripteurs et de sockets (`socket.destroy()`, émission de l'événement `'close'`).",
  },
  {
    id: 36,
    codeSnippet: `const buffer = Buffer.from("AI Engineering");
const slice = buffer.subarray(0, 2);
slice[0] = 65; // Code ASCII 'A'`,
    question: "Quelle est la particularité mémoire de `buffer.subarray()` (ou `slice()` sur un Buffer) sous Node.js ?",
    options: [
      { letter: 'A', text: "Elle clone les données dans un nouvel emplacement mémoire distinct." },
      { letter: 'B', text: "Elle compresse les octets sélectionnés avec gzip." },
      { letter: 'C', text: "Elle détruit le buffer source pour libérer la RAM." },
      { letter: 'D', text: "Elle ne copie aucune donnée mais renvoie une nouvelle vue ('View') pointant directement sur la même plage mémoire que le buffer d'origine, modifiant ce dernier." },
    ],
    correctAnswers: ['D'],
    explanation: "`buffer.subarray()` ne réalise aucune allocation ni copie de mémoire : il s'agit d'une simple vue sur le bloc mémoire natif préexistant. Toute modification apportée aux octets du subarray altère directement le Buffer parent.",
  },
  {
    id: 37,
    question: "Comment fonctionne l'algorithme d'estimation de marquage incrémental (Incremental Marking) implémenté dans le ramasse-miettes V8 ?",
    options: [
      { letter: 'A', text: "Il découpe la phase de marquage en de multiples micro-pauses intercalées entre l'exécution du code JavaScript pour éviter les longs gels de latence." },
      { letter: 'B', text: "Il délègue le nettoyage de la mémoire à un serveur cloud externe." },
      { letter: 'C', text: "Il nettoie uniquement les variables dont le nom commence par une majuscule." },
      { letter: 'D', text: "Il supprime les objets dès que le nombre de variables dépasse 100." },
    ],
    correctAnswers: ['A'],
    explanation: "Le marquage complet du tas sur un Heap volumineux (plusieurs Go) peut prendre des centaines de millisecondes. L'Incremental Marking fragmente ce travail en petits incréments de quelques millisecondes alternés avec l'exécution JavaScript applicative, limitant fortement la latence perçue.",
  },
  {
    id: 38,
    codeSnippet: `function createClosureLeak() {
  let unusedData = Buffer.alloc(1024 * 1024 * 50); // 50 Mo
  return function cleanFunction() {
    return "Je suis propre";
  };
}`,
    question: "Même si `cleanFunction` ne fait pas directement référence à `unusedData`, pourquoi certains moteurs JS ou contextes partagés peuvent-ils retenir `unusedData` en mémoire ?",
    options: [
      { letter: 'A', text: "Parce que Node.js interdit la création de buffers de plus de 1 Mo." },
      { letter: 'B', text: "Si une autre fonction définie dans le même scope parent capture `unusedData`, l'objet de contexte lexical partagé maintient la variable en vie tant qu'une quelconque closure de ce scope subsiste (Scope Leak)." },
      { letter: 'C', text: "Parce que V8 force la conservation de toutes les variables créées avec `let`." },
      { letter: 'D', text: "Parce que les buffers sont automatiquement convertis en variables d'environnement." },
    ],
    correctAnswers: ['B'],
    explanation: "C'est la célèbre fuite mémoire 'Meteor closure leak' : les closures déclarées dans un même bloc parent partagent le même objet de scope lexical interne. Si une fonction capture une variable lourde, toutes les autres fonctions du même scope retiennent indirectement l'ensemble du contexte.",
  },
  {
    id: 39,
    question: "Quel indicateur de santé mémoire renvoyé par `process.memoryUsage()` représente l'espace mémoire total actuellement réservé par le processus Node.js au niveau du système d'exploitation hôte ?",
    options: [
      { letter: 'A', text: "external" },
      { letter: 'B', text: "heapUsed" },
      { letter: 'C', text: "rss (Resident Set Size)" },
      { letter: 'D', text: "arrayBuffers" },
    ],
    correctAnswers: ['C'],
    explanation: "`rss` (Resident Set Size) représente la quantité totale de mémoire vive physique (RAM) allouée par l'OS au processus Node.js, englobant le Heap V8, la Call Stack, le code C++ de Node.js, les buffers natifs et les bibliothèques partagées.",
  },
  {
    id: 40,
    codeSnippet: `const { setFlagsFromString } = require('v8');
const runInNewContext = require('vm').runInNewContext;

// Quel risque comporte l'exécution de code arbitraire non sécurisé avec le module 'vm' de Node.js ?`,
    question: "Pourquoi le module standard `vm` de Node.js ne doit-il JAMAIS être utilisé comme un bac à sable (Sandbox) de sécurité pour exécuter du code non fiable généré par une IA ?",
    options: [
      { letter: 'A', text: "Parce que le module `vm` efface le disque dur en cas d'erreur de syntaxe." },
      { letter: 'B', text: "Parce que le module `vm` ne supporte pas les boucles `for`." },
      { letter: 'C', text: "Parce que le module `vm` nécessite l'installation préalable de Docker sur la machine." },
      { letter: 'D', text: "Parce que le module `vm` n'est pas un bac à sable de sécurité : un script malveillant peut facilement s'échapper du contexte via les constructeurs d'objets (`this.constructor.constructor('return process')()`) et accéder au système hôte." },
    ],
    correctAnswers: ['D'],
    explanation: "La documentation officielle de Node.js l'affirme explicitement : « The vm module is not a security sandbox. Do not use it to run untrusted code. » N'importe quel script peut remonter la chaîne de prototypes pour atteindre le `Function` constructor du contexte hôte et exécuter du code système arbitraire.",
  },
];
