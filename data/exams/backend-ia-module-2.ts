import { ExamMetadata, ExamQuestion } from './types';

export const BACKEND_IA_MODULE_2_EXAM_METADATA: ExamMetadata = {
  moduleId: 'backend-ia-module-2',
  title: "Examen Officiel de Certification — Module 2 : Multi-threading, Traitements CPU Intensifs & Worker Threads",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (32/40)
  totalQuestions: 40,
};

export const BACKEND_IA_MODULE_2_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "Dans l'architecture du système d'exploitation, quelle est la distinction fondamentale entre un Processus (`child_process`) et un Thread (`worker_threads`) sous Node.js ?",
    options: [
      { letter: 'A', text: "Un processus possède son propre espace d'adressage mémoire et ses descripteurs isolés, tandis que les threads partagent l'espace mémoire virtuel et les ressources du processus hôte." },
      { letter: 'B', text: "Un processus partage son espace d'adressage mémoire avec ses frères, tandis qu'un thread possède son propre espace mémoire 100% hermétique." },
      { letter: 'C', text: "Les threads s'exécutent obligatoirement sur des machines physiques différentes connectées par réseau." },
      { letter: 'D', text: "Un processus ne peut utiliser qu'un seul cœur CPU, alors qu'un thread utilise tous les cœurs simultanément." },
    ],
    correctAnswers: ['A'],
    explanation: "Un processus dispose de son propre espace d'adressage isolé par le noyau OS, rendant la communication coûteuse (IPC). Les Worker Threads s'exécutent au sein du même processus, partagent les descripteurs de fichiers et peuvent échanger de la mémoire partagée (SharedArrayBuffer) avec un coût de bascule de contexte (context switch) réduit.",
  },
  {
    id: 2,
    codeSnippet: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: { batchSize: 50000 } });
  worker.on('message', (result) => console.log('Résultat:', result));
} else {
  const computed = heavyVectorNormalization(workerData.batchSize);
  parentPort.postMessage(computed);
}`,
    question: "Quelle méthode permet d'initialiser des données immuables transmises au Worker dès son instanciation, sans passer par un événement `postMessage` préalable ?",
    options: [
      { letter: 'A', text: "L'injection de variables globales sur l'objet `window`." },
      { letter: 'B', text: "L'option `workerData` passée au constructeur du Worker, accessible globalement via `workerData` dans le thread enfant." },
      { letter: 'C', text: "La modification synchrone de `process.argv`." },
      { letter: 'D', text: "L'écriture dans un cookie de session temporaire." },
    ],
    correctAnswers: ['B'],
    explanation: "La propriété `workerData` passée dans les options du constructeur `new Worker()` est clonée via l'algorithme HTML5 Structured Clone et rendue immédiatement disponible à l'évaluation du script enfant via l'import `workerData` du module `worker_threads`.",
  },
  {
    id: 3,
    question: "Quel mécanisme le moteur V8 utilise-t-il par défaut pour transmettre des objets JavaScript complexes via `postMessage()` entre deux threads sans configuration de transfert ?",
    options: [
      { letter: 'A', text: "Le passage par référence directe modifiable par les deux threads." },
      { letter: 'B', text: "Une conversion automatique en code binaire WebAssembly." },
      { letter: 'C', text: "L'algorithme de clonage structuré (HTML5 Structured Clone Algorithm) qui sérialise et duplique entièrement l'objet en mémoire." },
      { letter: 'D', text: "L'écriture automatique des objets sur une table temporaire MySQL." },
    ],
    correctAnswers: ['C'],
    explanation: "Par défaut, `postMessage()` emploie le Structured Clone Algorithm : l'objet est profondément cloné, ce qui garantit l'isolation de mémoire mais introduit une latence et une surconsommation de RAM proportionnelles à la taille de l'objet dupliqué.",
  },
  {
    id: 4,
    codeSnippet: `const arrayBuffer = new Uint8Array(1024 * 1024 * 100); // 100 Mo

// Comment transférer ce buffer sans aucune copie mémoire ?
worker.postMessage({ buffer: arrayBuffer }, [arrayBuffer.buffer]);`,
    question: "Après l'exécution de cet appel avec le tableau de transfert `[arrayBuffer.buffer]`, quel est l'état du buffer d'origine dans le thread émetteur ?",
    options: [
      { letter: 'A', text: "Le buffer reste accessible et synchronisé en temps réel avec le worker." },
      { letter: 'B', text: "Le thread principal plante avec une exception 'Memory leak detected'." },
      { letter: 'C', text: "Le buffer est converti en chaîne JSON UTF-8." },
      { letter: 'D', text: "Le buffer est 'détaché' (neutered) : sa taille `byteLength` devient 0 et toute tentative de lecture ou écriture dans le thread émetteur échoue." },
    ],
    correctAnswers: ['D'],
    explanation: "Le transfert d'un `ArrayBuffer` via la liste de transfert (Transfer List) opère un transfert de propriété de pointeur mémoire à coût zéro (O(1)). Le bloc mémoire n'est pas copié mais déplacé : le buffer source est immédiatement détaché et devient inutilisable dans le thread émetteur.",
  },
  {
    id: 5,
    question: "Quelle structure de mémoire permet à plusieurs Worker Threads et au thread principal de lire et d'écrire sur la même zone physique de mémoire vive sans aucun clonage ni détachement ?",
    options: [
      { letter: 'A', text: "SharedArrayBuffer" },
      { letter: 'B', text: "LocalStorageBuffer" },
      { letter: 'C', text: "StaticHeapArray" },
      { letter: 'D', text: "MemorySaver" },
    ],
    correctAnswers: ['A'],
    explanation: "`SharedArrayBuffer` alloue un segment de mémoire vive partagée simultanément accessible par le thread principal et plusieurs workers. Contrairement à un `ArrayBuffer` classique, son transfert ne détache pas la mémoire et autorise les mutations concurrentes directes.",
  },
  {
    id: 6,
    codeSnippet: `const sharedBuffer = new SharedArrayBuffer(4);
const sharedInt32 = new Int32Array(sharedBuffer);

// Thread A et Thread B écrivent simultanément :
sharedInt32[0] = sharedInt32[0] + 1;`,
    question: "Quel danger critique de concurrence apparaît lorsque deux threads incrémentent `sharedInt32[0]` sans synchronisation atomique ?",
    options: [
      { letter: 'A', text: "Un crash immédiat du compilateur TurboFan." },
      { letter: 'B', text: "Une condition de concurrence (Race Condition) où des lectures/écritures entrelacées provoquent des pertes d'incrémentations et corrompent l'intégrité de la valeur finale." },
      { letter: 'C', text: "La transformation du tableau en format base64." },
      { letter: 'D', text: "Le blocage de la carte réseau du serveur." },
    ],
    correctAnswers: ['B'],
    explanation: "L'instruction `sharedInt32[0]++` n'est pas atomique au niveau processeur : elle se décompose en Lecture -> Modification -> Réécriture. Si deux threads lisent la même valeur avant que l'autre n'ait réécrit, un incrément est écrasé et perdu.",
  },
  {
    id: 7,
    codeSnippet: `const sharedBuffer = new SharedArrayBuffer(4);
const sharedInt32 = new Int32Array(sharedBuffer);

// Opération atomique sécurisée
const previousValue = Atomics.add(sharedInt32, 0, 1);`,
    question: "Que garantit l'utilisation de `Atomics.add()` sur un tableau typé adossé à un `SharedArrayBuffer` ?",
    options: [
      { letter: 'A', text: "Que l'opération s'exécute dans un thread GPU séparé." },
      { letter: 'B', text: "Que la valeur est automatiquement sauvegardée dans Redis." },
      { letter: 'C', text: "Que l'opération d'addition s'exécute de façon indivisible et thread-safe au niveau instruction assembleur du CPU, sans risque de race condition." },
      { letter: 'D', text: "Que le tableau est compressé avec l'algorithme Huffman." },
    ],
    correctAnswers: ['C'],
    explanation: "Les méthodes de l'objet `Atomics` exploitent les instructions matérielles atomiques du processeur (comme LOCK XADD sur x86). Cela garantit que la lecture, l'addition et l'écriture s'effectuent sans interruption, éliminant tout risque de corruption concurrente.",
  },
  {
    id: 8,
    question: "Pourquoi est-il strictement interdit d'appeler `Atomics.wait()` sur le thread principal de Node.js (ou du navigateur) ?",
    options: [
      { letter: 'A', text: "Parce que `Atomics.wait()` consomme 100% de la batterie de l'appareil." },
      { letter: 'B', text: "Parce que le système de fichiers n'est pas compatible avec `Atomics`." },
      { letter: 'C', text: "Parce que V8 ne supporte pas les entiers 32-bit sur le thread principal." },
      { letter: 'D', text: "Parce que `Atomics.wait()` est un appel synchrone bloquant qui figerait l'Event Loop du thread principal, bloquant tout traitement I/O et gelant l'application (lève une exception TypeError)." },
    ],
    correctAnswers: ['D'],
    explanation: "`Atomics.wait()` suspend indéfiniment l'exécution du thread jusqu'à la réception d'un `Atomics.notify()` ou d'un timeout. Le moteur V8 interdit son appel sur le thread principal pour préserver le modèle non-bloquant de l'Event Loop ; son usage est réservé aux Worker Threads.",
  },
  {
    id: 9,
    codeSnippet: `const { Worker } = require('worker_threads');

function executeInWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./task.js', { workerData: data });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(\`Worker arrêté avec le code \${code}\`));
    });
  });
}`,
    question: "Quel anti-pattern de performance critique cette fonction illustre-t-elle si elle est appelée à chaque requête entrante sur une API web à fort trafic ?",
    options: [
      { letter: 'A', text: "L'instanciation d'un nouveau Worker par requête, provoquant une surcharge massive de mémoire et de CPU car chaque Worker initialise une nouvelle instance complète de la machine virtuelle V8 et de Libuv." },
      { letter: 'B', text: "L'absence de compilation TypeScript à la volée." },
      { letter: 'C', text: "L'utilisation de promesses au lieu de callbacks synchrones." },
      { letter: 'D', text: "La désactivation du cache des dépendances NPM." },
    ],
    correctAnswers: ['A'],
    explanation: "Créer un `Worker` (`new Worker()`) est une opération lourde qui instancie un nouvel Isolate V8, un nouveau contexte d'Event Loop et alloue plusieurs dizaines de mégaoctets de mémoire. En production, il faut impérativement réutiliser un pool de workers pré-instanciés (Worker Pool).",
  },
  {
    id: 10,
    question: "Comment dimensionner de manière optimale le nombre maximal de Worker Threads permanents dédiés à des calculs CPU intensifs (ex: vectorisation, embeddings locaux) sur un serveur de production ?",
    options: [
      { letter: 'A', text: "Toujours fixer à 1000 workers pour maximiser le parallélisme." },
      { letter: 'B', text: "Calibrer le pool en fonction du nombre de cœurs CPU logiques disponibles (`os.cpus().length` ou `os.availableParallelism()`), généralement N ou N-1 pour laisser un cœur à l'I/O du thread principal." },
      { letter: 'C', text: "Fixer systématiquement à 1 worker, car Node.js ne peut pas gérer plusieurs threads." },
      { letter: 'D', text: "Définir le nombre selon la taille de l'écran en pixels." },
    ],
    correctAnswers: ['B'],
    explanation: "Pour des tâches CPU-bound pures, allouer plus de threads que de cœurs physiques/logiques n'accélère pas le calcul mais crée une contention CPU inutile et des changements de contexte (context switching) néfastes. Réserver N-1 cœurs aux workers laisse le thread principal fluide pour l'I/O réseau.",
  },
  {
    id: 11,
    codeSnippet: `const { MessageChannel } = require('worker_threads');

const { port1, port2 } = new MessageChannel();

// port1 envoyé au Worker A, port2 envoyé au Worker B`,
    question: "À quoi sert la classe `MessageChannel` dans une architecture multi-workers sous Node.js ?",
    options: [
      { letter: 'A', text: "À connecter Node.js directement à une chaîne de télévision numérique." },
      { letter: 'B', text: "À remplacer le protocole HTTPS pour les requêtes web." },
      { letter: 'C', text: "À établir un canal de communication direct et bidirectionnel point-à-point entre deux Worker Threads distincts sans faire transiter les messages par le thread principal." },
      { letter: 'D', text: "À créer un groupe de discussion Slack pour les développeurs." },
    ],
    correctAnswers: ['C'],
    explanation: "`MessageChannel` crée une paire de ports (`port1` et `port2`). En transférant un port au Worker A et l'autre au Worker B, les deux threads peuvent s'envoyer directement des messages de manière asynchrone sans surcharger l'Event Loop du thread principal qui agit uniquement comme initiateur.",
  },
  {
    id: 12,
    question: "Parmi ces cas d'usage typiques d'une application d'IA en backend, lequel est le candidat IDÉAL pour être déporté dans un Worker Thread ?",
    options: [
      { letter: 'A', text: "Attendre la réponse HTTP en streaming d'un appel API vers Google Gemini." },
      { letter: 'B', text: "L'envoi d'un en-tête HTTP 200 avec Express." },
      { letter: 'C', text: "L'interrogation d'une ligne d'utilisateur dans une base MySQL via `SELECT * FROM users WHERE id = ?`." },
      { letter: 'D', text: "Le calcul de similarité cosinus ou distance euclidienne sur un million de vecteurs d'embeddings de dimension 768 en mémoire vive." },
    ],
    correctAnswers: ['D'],
    explanation: "Les appels réseau (Gemini, MySQL) sont des opérations d'I/O asynchrones non bloquantes parfaitement gérées par l'Event Loop et le noyau OS. En revanche, le calcul vectoriel intensif monopolise le CPU pendant des secondes et doit être confié à un Worker Thread pour ne pas bloquer les requêtes des autres utilisateurs.",
  },
  {
    id: 13,
    codeSnippet: `const { parentPort } = require('worker_threads');

parentPort.on('message', (task) => {
  try {
    const output = processHeavyAiTask(task);
    parentPort.postMessage({ status: 'success', data: output });
  } catch (err) {
    parentPort.postMessage({ status: 'error', error: err.message });
  }
});`,
    question: "Pourquoi est-il indispensable d'encapsuler la logique du worker dans un bloc `try/catch` et de notifier le thread parent en cas d'erreur ?",
    options: [
      { letter: 'A', text: "Parce qu'une exception non interceptée dans un Worker Thread déclenche l'événement `'error'`, met fin au thread avec un code de sortie 1 et détruit le worker sans réponse pour la tâche en cours." },
      { letter: 'B', text: "Parce que V8 supprime le fichier source sur le disque si une erreur survient." },
      { letter: 'C', text: "Parce que le compilateur TypeScript génère un binaire invalide sans `try/catch`." },
      { letter: 'D', text: "Parce que `parentPort` refuse les requêtes contenant des chaînes de caractères." },
    ],
    correctAnswers: ['A'],
    explanation: "Une exception non gérée dans un thread enfant termine brutalement son exécution (`worker.on('exit')` avec un code != 0). Le thread parent se retrouve alors avec une promesse orpheline non résolue si l'erreur n'est pas gérée gracieusement.",
  },
  {
    id: 14,
    question: "Quelle méthode de l'objet `Atomics` permet d'éveiller un ou plusieurs threads endormis via `Atomics.wait()` sur un indice spécifique d'un tableau partagé ?",
    options: [
      { letter: 'A', text: "Atomics.wakeUp()" },
      { letter: 'B', text: "Atomics.notify()" },
      { letter: 'C', text: "Atomics.resume()" },
      { letter: 'D', text: "Atomics.trigger()" },
    ],
    correctAnswers: ['B'],
    explanation: "`Atomics.notify(typedArray, index, count)` réveille un nombre donné de threads (`count`, ou tous par défaut) qui étaient en état d'attente bloquante sur `typedArray[index]` via `Atomics.wait()`. (Historiquement `Atomics.wake`, renommé en `notify`).",
  },
  {
    id: 15,
    codeSnippet: `const { isMainThread, threadId } = require('worker_threads');
console.log(\`Exécution sur le thread ID: \${threadId}\`);`,
    question: "Quelle est la valeur de `threadId` pour le thread principal (Main Thread) de Node.js ?",
    options: [
      { letter: 'A', text: "-1" },
      { letter: 'B', text: "1" },
      { letter: 'C', text: "0" },
      { letter: 'D', text: "undefined" },
    ],
    correctAnswers: ['C'],
    explanation: "Le thread principal se voit toujours attribuer l'identifiant `threadId = 0`. Chaque nouveau Worker Thread créé se voit assigner un entier incrémental unique (1, 2, 3...).",
  },
  {
    id: 16,
    question: "Dans le cadre de l'ingénierie de données pour LLM, quel est le bénéfice d'utiliser un Worker Pool pour la phase de 'Chunking' et de nettoyage de corpus textuels volumineux (plusieurs gigaoctets) ?",
    options: [
      { letter: 'A', text: "Cela dispense d'indexer les vecteurs dans une base de données." },
      { letter: 'B', text: "Cela permet d'échapper aux frais de facturation de l'hébergeur cloud." },
      { letter: 'C', text: "Cela convertit automatiquement le texte brut en requêtes SQL." },
      { letter: 'D', text: "Cela permet de répartir le parsing regex et le découpage de texte sur l'ensemble des cœurs de calcul du serveur, réduisant le temps total de traitement de manière quasi linéaire sans figer l'API web." },
    ],
    correctAnswers: ['D'],
    explanation: "Le traitement de texte massif (découpage en fenêtres glissantes, calcul de tokens, nettoyage d'expressions régulières) est purement dépendant du processeur (CPU-bound). En distribuant les blocs de texte sur N workers, on divise le temps de traitement par le nombre de cœurs disponibles.",
  },
  {
    id: 17,
    codeSnippet: `const { Worker } = require('worker_threads');

const worker = new Worker('./task.js');
// Arrêt forcé immédiat du thread
await worker.terminate();`,
    question: "Quel est l'effet de l'appel à `worker.terminate()` sur le cycle de vie du Worker Thread ?",
    options: [
      { letter: 'A', text: "Il interrompt et détruit immédiatement l'Isolate V8 du thread enfant, annule toutes les opérations en cours et renvoie une promesse résolue avec le code de sortie 1." },
      { letter: 'B', text: "Il met le worker en pause et le réveille dès qu'un nouveau message arrive." },
      { letter: 'C', text: "Il redémarre le système d'exploitation du serveur hôte." },
      { letter: 'D', text: "Il sauvegarde les variables locales du worker dans un fichier JSON." },
    ],
    correctAnswers: ['A'],
    explanation: "`worker.terminate()` est l'équivalent d'un `kill -9` au niveau du thread : l'exécution JavaScript est stoppée immédiatement, la mémoire du thread est libérée et le thread cesse d'exister. C'est l'ultime recours en cas de boucle infinie dans un worker.",
  },
  {
    id: 18,
    question: "Quelle bibliothèque populaire ou patron de conception standard permet d'implémenter un pool de workers réutilisables avec gestion de file d'attente FIFO et recyclage automatique sous Node.js ?",
    options: [
      { letter: 'A', text: "Mongoose" },
      { letter: 'B', text: "Piscina ou workerpool" },
      { letter: 'C', text: "Tailwind" },
      { letter: 'D', text: "Axios" },
    ],
    correctAnswers: ['B'],
    explanation: "`Piscina` et `workerpool` sont les bibliothèques d'ingénierie de référence pour gérer des pools de Worker Threads sous Node.js. Elles gèrent l'affectation optimale des tâches, les transferts de mémoire à zéro copie et la limitation de la file d'attente.",
  },
  {
    id: 19,
    codeSnippet: `const sharedBuffer = new SharedArrayBuffer(16);
const float32View = new Float32Array(sharedBuffer);

// Peut-on utiliser Atomics.wait sur un Float32Array ?`,
    question: "Pourquoi l'appel `Atomics.wait(float32View, 0, 0.5)` lève-t-il immédiatement une erreur de type `TypeError` en JavaScript ?",
    options: [
      { letter: 'A', text: "Parce que la taille du buffer n'est pas un multiple de 1024." },
      { letter: 'B', text: "Parce que les nombres à virgule flottante ne peuvent pas être stockés en RAM." },
      { letter: 'C', text: "Parce que `Atomics.wait` et `Atomics.notify` ne sont supportés légalement que sur des tableaux typés d'entiers 32-bit (`Int32Array`) ou 64-bit (`BigInt64Array`)." },
      { letter: 'D', text: "Parce que la fonction est réservée aux navigateurs Safari." },
    ],
    correctAnswers: ['C'],
    explanation: "La spécification ECMAScript restreint `Atomics.wait()` et `Atomics.notify()` aux `Int32Array` (et `BigInt64Array`). Pour synchroniser des calculs sur des flottants (ex: vecteurs d'IA), on réserve généralement un entier 32-bit adjacent dans le buffer comme verrou (mutex ou drapeau d'état).",
  },
  {
    id: 20,
    question: "Qu'est-ce qu'un 'Mutex' (Mutual Exclusion lock) implémenté à l'aide de `Atomics.compareExchange` sur un `SharedArrayBuffer` ?",
    options: [
      { letter: 'A', text: "Un algorithme de hachage de mot de passe." },
      { letter: 'B', text: "Une extension de fichier pour les images compressées." },
      { letter: 'C', text: "Un composant graphique pour React." },
      { letter: 'D', text: "Un verrou binaire garantissant qu'un seul thread à la fois peut entrer dans une section critique de code modifiant des données partagées." },
    ],
    correctAnswers: ['D'],
    explanation: "Un Mutex permet de protéger une zone mémoire partagée : un thread utilise `Atomics.compareExchange` pour passer l'état de 0 (déverrouillé) à 1 (verrouillé). Les autres threads patientent (`Atomics.wait`) jusqu'à ce que le propriétaire libère le verrou (`Atomics.notify`).",
  },
  {
    id: 21,
    codeSnippet: `const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', {
  execArgv: ['--max-old-space-size=512']
});`,
    question: "À quoi sert l'option `execArgv` passée lors de la création d'un Worker Thread sous Node.js ?",
    options: [
      { letter: 'A', text: "À configurer des options de ligne de commande spécifiques au moteur V8 ou à Node.js (comme la taille mémoire du tas) pour le thread enfant de manière indépendante du thread principal." },
      { letter: 'B', text: "À transmettre des variables d'environnement dans le fichier `.env` du client." },
      { letter: 'C', text: "À installer de nouvelles dépendances NPM dans le conteneur." },
      { letter: 'D', text: "À crypter le code source du worker avec une clé symétrique." },
    ],
    correctAnswers: ['A'],
    explanation: "`execArgv` permet de définir des drapeaux d'exécution spécifiques à la VM Node/V8 instanciée pour le worker, par exemple pour plafonner sa mémoire vive (`--max-old-space-size`), activer des fonctionnalités expérimentales ou attacher un débogueur.",
  },
  {
    id: 22,
    question: "Dans le cadre d'un traitement d'image lourd (redimensionnement, conversion de tenseurs pour modèle de vision), pourquoi le passage par un `SharedArrayBuffer` est-il incomparablement plus performant que `postMessage` avec copie ?",
    options: [
      { letter: 'A', text: "Parce que le `SharedArrayBuffer` compresse l'image avec du JPEG sans perte." },
      { letter: 'B', text: "Parce qu'il élimine totalement la sérialisation, la désérialisation et la copie des millions d'octets de pixels à travers la frontière de thread (latence de transfert = 0 ms)." },
      { letter: 'C', text: "Parce que `SharedArrayBuffer` force l'exécution sur la puce neuronale NPU." },
      { letter: 'D', text: "Parce que le format de pixels est automatiquement converti en format SVG vectoriel." },
    ],
    correctAnswers: ['B'],
    explanation: "Copier une image 4K non compressée (des dizaines de mégaoctets) via `postMessage` classique prend du temps CPU et crée une allocation dans le tas du récepteur. Avec un `SharedArrayBuffer`, le worker lit et manipule directement les pixels au même emplacement mémoire sans aucun transfert.",
  },
  {
    id: 23,
    codeSnippet: `// Thread Worker
const { parentPort } = require('worker_threads');

// Simulation d'une tâche d'extraction de caractéristiques
function run() {
  const features = extractEmbeddings(dataset);
  parentPort.postMessage(features);
}
setInterval(run, 1000);`,
    question: "Si le script du worker contient un `setInterval` ou un écouteur d'événement actif, quand ce Worker Thread se termine-t-il automatiquement ?",
    options: [
      { letter: 'A', text: "Il se termine automatiquement après avoir envoyé son premier message." },
      { letter: 'B', text: "Il se termine après 60 secondes par défaut." },
      { letter: 'C', text: "Il ne se termine jamais de lui-même car son Event Loop interne reste active tant qu'il subsiste des timers ou écouteurs non libérés." },
      { letter: 'D', text: "Le système d'exploitation le tue dès que la RAM atteint 10 Mo." },
    ],
    correctAnswers: ['C'],
    explanation: "Chaque Worker Thread possède sa propre boucle d'événements (Event Loop). Tant qu'un timer (`setInterval`), une socket ou un écouteur non détaché maintient une référence active, l'Event Loop du worker continue de tourner indéfiniment.",
  },
  {
    id: 24,
    question: "Que se passe-t-il si un Worker Thread exécute une fonction synchrone contenant une boucle infinie (`while (true) {}`) ?",
    options: [
      { letter: 'A', text: "Le thread principal plante immédiatement avec une erreur HTTP 500." },
      { letter: 'B', text: "Les autres workers arrêtent de fonctionner par solidarité logicielle." },
      { letter: 'C', text: "Node.js redémarre automatiquement tout le système informatique." },
      { letter: 'D', text: "Le cœur CPU associé à ce thread est saturé à 100%, mais l'Event Loop du thread principal continue de répondre normalement aux requêtes réseau sans être bloquée." },
    ],
    correctAnswers: ['D'],
    explanation: "C'est l'avantage fondamental de l'isolation par threads : le worker fige son propre cœur de calcul, mais le thread principal et les autres workers continuent d'exécuter leur Event Loop respective de manière totalement indépendante.",
  },
  {
    id: 25,
    codeSnippet: `const { SHARE_ENV } = require('worker_threads');

const worker = new Worker('./worker.js', {
  env: SHARE_ENV
});`,
    question: "Que permet la constante `SHARE_ENV` lors de l'instanciation d'un Worker sous Node.js ?",
    options: [
      { letter: 'A', text: "Permettre au thread principal et au worker de partager le même environnement de processus (`process.env`) en lecture et écriture bidirectionnelle synchronisée." },
      { letter: 'B', text: "Partager l'historique du terminal Bash avec le client." },
      { letter: 'C', text: "Partager le fichier de licence MIT sur GitHub." },
      { letter: 'D', text: "Désactiver les variables d'environnement de sécurité." },
    ],
    correctAnswers: ['A'],
    explanation: "Par défaut, chaque worker reçoit un clone indépendant de `process.env`. En spécifiant `env: SHARE_ENV`, toute modification apportée à `process.env` dans le thread principal ou dans le worker est instantanément visible par l'autre.",
  },
  {
    id: 26,
    codeSnippet: `const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
const int32 = new Int32Array(sab);

// Valeur initiale = 10
Atomics.store(int32, 0, 10);

// Compare et échange
const oldVal = Atomics.compareExchange(int32, 0, 10, 25);`,
    question: "Quelle sera la valeur contenue dans `int32[0]` et la valeur renvoyée dans `oldVal` après l'exécution de cet appel `compareExchange` ?",
    options: [
      { letter: 'A', text: "int32[0] vaut 10 et oldVal vaut 25" },
      { letter: 'B', text: "int32[0] vaut 25 et oldVal vaut 10" },
      { letter: 'C', text: "int32[0] vaut 0 et oldVal vaut 0" },
      { letter: 'D', text: "L'instruction échoue et lève une exception" },
    ],
    correctAnswers: ['B'],
    explanation: "`Atomics.compareExchange(array, index, expectedValue, replacementValue)` vérifie si la valeur actuelle est égale à `expectedValue` (ici 10). Comme c'est le cas, elle la remplace atomiquement par `replacementValue` (25) et renvoie l'ancienne valeur qui était présente (10).",
  },
  {
    id: 27,
    question: "Dans le cadre de l'ingénierie d'une passerelle d'IA traitant des fichiers audio (Transcription Whisper locale), pourquoi ne faut-il pas décoder le fichier audio WAV/MP3 dans le thread principal Express ?",
    options: [
      { letter: 'A', text: "Parce que Node.js n'a pas de carte son physique intégrée." },
      { letter: 'B', text: "Parce que le format WAV est interdit par la norme HTTP/2." },
      { letter: 'C', text: "Parce que le décodage et la transformée de Fourier (FFT) sont des opérations arithmétiques très lourdes qui bloqueraient l'Event Loop pendant plusieurs secondes, empêchant l'API de répondre aux autres requêtes." },
      { letter: 'D', text: "Parce que le navigateur client refusera d'afficher la réponse." },
    ],
    correctAnswers: ['C'],
    explanation: "Le décodage de formats compressés et le calcul de spectrogrammes (FFT) sont des opérations purement CPU-bound. Les exécuter sur le thread principal gèlerait toutes les connexions web simultanées.",
  },
  {
    id: 28,
    codeSnippet: `const { Worker } = require('worker_threads');

function runTask() {
  const worker = new Worker(\`
    const { parentPort } = require('worker_threads');
    parentPort.postMessage('Exécuté en ligne');
  \`, { eval: true });
  
  worker.on('message', console.log);
}`,
    question: "Quelle option du constructeur `Worker` permet d'exécuter une chaîne de caractères contenant du code JavaScript directement sans pointer vers un fichier physique sur le disque ?",
    options: [
      { letter: 'A', text: "inline: true" },
      { letter: 'B', text: "directCode: true" },
      { letter: 'C', text: "rawString: true" },
      { letter: 'D', text: "eval: true" },
    ],
    correctAnswers: ['D'],
    explanation: "Lorsque l'option `{ eval: true }` est spécifiée, le premier argument de `new Worker(string, options)` est traité directement comme du code source JavaScript à exécuter au lieu d'un chemin de fichier système.",
  },
  {
    id: 29,
    question: "Dans une architecture de microservices conteneurisés sous Docker, quelle contrainte d'isolation peut empêcher l'utilisation efficace de `SharedArrayBuffer` entre deux conteneurs distincts ?",
    options: [
      { letter: 'A', text: "Le fait que les conteneurs sont des processus OS hermétiques disposant d'espaces d'adressage mémoire physique et virtuels totalement distincts (sauf recours explicite à de la mémoire partagée IPC de type `/dev/shm`)." },
      { letter: 'B', text: "Les règles de pare-feu DNS." },
      { letter: 'C', text: "L'incompatibilité de l'architecture x86 avec Linux." },
      { letter: 'D', text: "L'obligation d'avoir une adresse IP publique pour chaque thread." },
    ],
    correctAnswers: ['A'],
    explanation: "`SharedArrayBuffer` ne fonctionne qu'au sein d'un même processus Node.js et de ses Worker Threads enfants. Entre conteneurs Docker séparés, la mémoire virtuelle est cloisonnée par les cgroups/namespaces Linux : il faut alors passer par des sockets réseau ou monter `/dev/shm`.",
  },
  {
    id: 30,
    codeSnippet: `const os = require('os');
console.log(os.availableParallelism());`,
    question: "Quelle est la valeur apportée par `os.availableParallelism()` (introduite dans Node.js v19+) par rapport au traditionnel `os.cpus().length` dans un environnement conteneurisé (Docker / Kubernetes) ?",
    options: [
      { letter: 'A', text: "Elle renvoie le nombre de cartes mères installées dans le datacenter." },
      { letter: 'B', text: "Elle prend en compte les quotas CPU (cgroups) imposés au conteneur, évitant de créer plus de threads que le conteneur n'est autorisé à utiliser physiquement." },
      { letter: 'C', text: "Elle double automatiquement la fréquence en GHz du processeur." },
      { letter: 'D', text: "Elle renvoie la liste des processus Windows en cours." },
    ],
    correctAnswers: ['B'],
    explanation: "Dans un conteneur restreint à 2 cœurs sur une machine hôte de 64 cœurs, `os.cpus().length` renvoie 64 (conduisant à créer 64 workers en sur-contention), tandis que `os.availableParallelism()` détecte le quota cgroup et renvoie fidèlement 2.",
  },
  {
    id: 31,
    question: "Pourquoi est-il crucial de limiter la taille de la file d'attente (Task Queue) d'un Worker Pool lorsqu'une API reçoit un pic brutal de trafic ?",
    options: [
      { letter: 'A', text: "Parce que Node.js ne peut pas stocker plus de 10 tâches en file d'attente." },
      { letter: 'B', text: "Pour empêcher les utilisateurs de créer des mots de passe trop simples." },
      { letter: 'C', text: "Pour éviter l'accumulation indéfinie de tâches non traitées en mémoire vive provoquant un crash par dépassement du tas Node.js (Out Of Memory) et renvoyer un code HTTP 503 ou 429 rapide (Fast-Fail)." },
      { letter: 'D', text: "Pour accélérer la vitesse de la souris sur le serveur." },
    ],
    correctAnswers: ['C'],
    explanation: "Sans limitation de queue (bounded queue), si le débit d'arrivée des requêtes dépasse la capacité de calcul des workers, la file de tâches gonfle indéfiniment en RAM jusqu'au crash de l'API. Il faut rejeter rapidement (Fast-Fail) avec HTTP 429/503 dès que le seuil de saturation est atteint.",
  },
  {
    id: 32,
    codeSnippet: `const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js');
worker.unref();`,
    question: "Quel est l'effet de l'appel à `worker.unref()` sur le processus principal Node.js ?",
    options: [
      { letter: 'A', text: "Il supprime le worker immédiatement." },
      { letter: 'B', text: "Il double la mémoire allouée au worker." },
      { letter: 'C', text: "Il cache le thread dans les logs de sécurité." },
      { letter: 'D', text: "Il permet au processus Node.js parent de se terminer normalement si ce Worker Thread est la seule activité restante maintenant l'Event Loop en vie." },
    ],
    correctAnswers: ['D'],
    explanation: "Comme pour les timers (`timer.unref()`), appeler `worker.unref()` indique à l'Event Loop principale que ce thread ne doit pas empêcher le processus Node.js de quitter s'il n'y a plus aucun autre événement actif à traiter.",
  },
  {
    id: 33,
    question: "Dans le cadre d'un algorithme de recherche sémantique KNN (K-Nearest Neighbors) exécuté en mémoire dans un Worker, comment optimiser le calcul de distance de Minkowski ou cosinus ?",
    options: [
      { letter: 'A', text: "En utilisant un tableau typé plat (`Float32Array`) avec une boucle contiguë non fragmentée pour favoriser la mise en cache L1/L2 et la vectorisation SIMD du processeur." },
      { letter: 'B', text: "En convertissant chaque vecteur flottant en chaîne de caractères JSON." },
      { letter: 'C', text: "En envoyant chaque coordonnée vectorielle par un événement `postMessage` individuel." },
      { letter: 'D', text: "En exécutant le calcul dans un timer `setTimeout(..., 1000)`." },
    ],
    correctAnswers: ['A'],
    explanation: "Les tableaux typés (`Float32Array`) stockent les données sous forme de blocs d'octets contigus en mémoire native. Cela optimise la prélecture de cache (cache prefetching L1/L2) et permet au compilateur V8 TurboFan de générer des instructions assembleur vectorisées ultra-rapides (SIMD).",
  },
  {
    id: 34,
    codeSnippet: `const { parentPort } = require('worker_threads');

// Comment écouter les messages envoyés depuis le thread parent ?
parentPort.on('message', (payload) => {
  console.log('Données reçues:', payload);
});`,
    question: "Quelle classe hérite l'objet `parentPort` dans un Worker Thread ?",
    options: [
      { letter: 'A', text: "Stream.Readable" },
      { letter: 'B', text: "MessagePort (qui hérite de EventEmitter)" },
      { letter: 'C', text: "Net.Socket" },
      { letter: 'D', text: "Http.IncomingMessage" },
    ],
    correctAnswers: ['B'],
    explanation: "`parentPort` est une instance de `MessagePort`, qui hérite de `EventEmitter`. Il expose les méthodes familières `.on('message')`, `.postMessage()`, `.close()` pour dialoguer avec l'extérieur.",
  },
  {
    id: 35,
    question: "Quelle est la principale limite d'un `SharedArrayBuffer` par rapport aux types d'objets JavaScript manipulables ?",
    options: [
      { letter: 'A', text: "Il ne peut pas être lu par les processeurs Intel." },
      { letter: 'B', text: "Il ne fonctionne qu'avec des nombres négatifs." },
      { letter: 'C', text: "Il ne peut contenir que des données binaires brutes (octets) indexables via des vues de tableaux typés (`Int8Array`, `Float32Array`, etc.), et ne peut pas stocker directement d'objets, de chaînes ou de fonctions JavaScript arbitraires." },
      { letter: 'D', text: "Sa taille maximale est strictement limitée à 128 octets." },
    ],
    correctAnswers: ['C'],
    explanation: "Un `SharedArrayBuffer` est uniquement un bloc d'octets de mémoire brute contiguë. Pour y stocker des structures complexes (ex: graphes, objets), le développeur doit concevoir une sérialisation binaire personnalisée ou mapper des indices de tableaux typés.",
  },
  {
    id: 36,
    codeSnippet: `const { isMainThread } = require('worker_threads');

if (isMainThread) {
  console.log("Thread principal");
} else {
  console.log("Thread enfant");
}`,
    question: "Pourquoi est-il courant de vérifier `isMainThread` en tête d'un fichier TypeScript ou JavaScript monolithique ?",
    options: [
      { letter: 'A', text: "Pour empêcher le compilateur TypeScript d'afficher des avertissements." },
      { letter: 'B', text: "Pour basculer automatiquement l'affichage de l'application en mode sombre." },
      { letter: 'C', text: "Pour vérifier si le serveur possède un certificat SSL actif." },
      { letter: 'D', text: "Pour permettre à un même fichier de servir à la fois de point d'entrée pour le thread principal et de script d'exécution pour les Workers instanciés avec `new Worker(__filename)`." },
    ],
    correctAnswers: ['D'],
    explanation: "Ce pattern très répandu évite de multiplier les fichiers scripts séparés. En testant `isMainThread`, le fichier exécute le serveur ou le distributeur de jobs s'il est au sommet, et exécute la boucle de calcul du worker s'il est instancié en tant que thread enfant.",
  },
  {
    id: 37,
    question: "Dans le cadre de la sécurité des navigateurs et de Node.js, pourquoi l'utilisation de `SharedArrayBuffer` a-t-elle été temporairement restreinte et exige-t-elle des en-têtes d'isolation cross-origin (COOP et COEP) dans le Web ?",
    options: [
      { letter: 'A', text: "À cause des vulnérabilités de canal auxiliaire d'exécution spéculative matérielle (Spectre & Meltdown) utilisant des timers de haute précision basés sur la mémoire partagée." },
      { letter: 'B', text: "À cause de conflits de licences avec la fondation Linux." },
      { letter: 'C', text: "Parce que le format HTML5 n'est plus maintenu par le W3C." },
      { letter: 'D', text: "Pour forcer les sites web à utiliser le protocole FTP." },
    ],
    correctAnswers: ['A'],
    explanation: "La mémoire partagée combinée à un thread incrémentant un compteur permet de fabriquer une horloge d'une précision nanoseconde. Les attaques Spectre exploitent cette précision pour mesurer les temps d'accès au cache processeur et exfiltrer des secrets d'autres contextes.",
  },
  {
    id: 38,
    codeSnippet: `const worker = new Worker('./worker.js');
worker.on('error', (err) => {
  console.error('Erreur capturée sur le worker:', err);
});`,
    question: "Que se passe-t-il si un Worker Thread émet une erreur sans qu'aucun gestionnaire `worker.on('error')` ne soit enregistré dans le thread parent ?",
    options: [
      { letter: 'A', text: "L'erreur est silencieusement ignorée et le worker recommence son calcul." },
      { letter: 'B', text: "L'erreur remonte comme une exception non interceptée (`uncaughtException`) dans le thread principal, risquant de faire crasher l'ensemble du serveur Node.js." },
      { letter: 'C', text: "Le terminal système sonne une alarme sonore." },
      { letter: 'D', text: "Le fichier `.env` est réinitialisé avec les valeurs par défaut." },
    ],
    correctAnswers: ['B'],
    explanation: "Un Worker est un `EventEmitter`. En Node.js, si un objet émet un événement `'error'` sans aucun listener attaché, Node.js traite cela comme une erreur fatale et lance une exception non gérée dans le processus parent.",
  },
  {
    id: 39,
    question: "Dans quel cas l'utilisation de Worker Threads est-elle DÉCONSEILLÉE et susceptible de dégrader les performances globales plutôt que de les améliorer ?",
    options: [
      { letter: 'A', text: "Pour compresser en continu des flux de données vidéo haute définition." },
      { letter: 'B', text: "Pour calculer la décomposition en valeurs singulières (SVD) d'une matrice 10 000 x 10 000." },
      { letter: 'C', text: "Pour exécuter des requêtes I/O réseau ou de simples lectures de fichiers qui sont déjà gérées de façon non bloquante par l'Event Loop native." },
      { letter: 'D', text: "Pour chiffrer des volumes de données avec AES-256." },
    ],
    correctAnswers: ['C'],
    explanation: "Déléguer des opérations d'I/O simples (lectures DB, fetch HTTP) à un Worker Thread ajoute le surcoût de la communication inter-thread sans aucun gain de calcul, car ces opérations passent déjà par les mécanismes asynchrones du noyau OS sans consommer de CPU.",
  },
  {
    id: 40,
    codeSnippet: `const { resourceLimits } = require('worker_threads');

const worker = new Worker('./worker.js', {
  resourceLimits: {
    maxOldGenerationSizeMb: 128,
    maxYoungGenerationSizeMb: 32,
    codeRangeSizeMb: 16
  }
});`,
    question: "Quel avantage opérationnel l'utilisation de `resourceLimits` offre-t-elle dans une plateforme backend exécutant du code d'analyse de données non éprouvé ?",
    options: [
      { letter: 'A', text: "Elle empêche le worker d'utiliser Internet." },
      { letter: 'B', text: "Elle force le worker à répondre en moins de 10 millisecondes." },
      { letter: 'C', text: "Elle garantit que le worker fonctionne même si l'ordinateur est débranché." },
      { letter: 'D', text: "Elle cloisonne hermétiquement la consommation mémoire du worker pour qu'une fuite mémoire ou un traitement anormal ne puisse pas dépasser le quota alloué (128 Mo) ni épuiser la RAM du serveur principal." },
    ],
    correctAnswers: ['D'],
    explanation: "`resourceLimits` permet de définir des quotas de mémoire stricts pour un worker individuel (Old Space, Young Space, Code Space). Si le worker dépasse son plafond, V8 met fin à ce thread spécifique pour préserver la santé et la disponibilité du serveur hôte.",
  },
];
