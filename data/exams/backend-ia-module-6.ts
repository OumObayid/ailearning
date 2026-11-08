import { ExamMetadata, ExamQuestion } from './types';

export const BACKEND_IA_MODULE_6_EXAM_METADATA: ExamMetadata = {
  moduleId: 'backend-ia-module-6',
  title: "Examen Officiel de Certification — Module 6 : WebAssembly, WebGPU & Inférence Locale Edge (ONNX)",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (32/40)
  totalQuestions: 40,
};

export const BACKEND_IA_MODULE_6_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "Dans l'écosystème du calcul web et backend moderne, qu'est-ce que WebAssembly (WASM) fondamentalement ?",
    options: [
      { letter: 'A', text: "Un format d'instructions binaire compact et portable conçu comme cible de compilation pour des langages bas niveau (C++, Rust, Zig), s'exécutant à une vitesse proche du natif dans un bac à sable isolé de la machine virtuelle." },
      { letter: 'B', text: "Un remplaçant complet du langage HTML5 pour styliser des pages web." },
      { letter: 'C', text: "Une extension payante pour le navigateur Google Chrome." },
      { letter: 'D', text: "Un protocole réseau destiné à remplacer le Wi-Fi." },
    ],
    correctAnswers: ['A'],
    explanation: "WebAssembly est un standard W3C définissant un bytecode binaire exécutable dans une machine virtuelle basée sur une pile. Il permet d'exécuter du code haute performance compilé depuis C++, Rust ou Zig au sein de Node.js ou du navigateur avec des performances prévisibles et quasi natives.",
  },
  {
    id: 2,
    codeSnippet: `const wasmBuffer = fs.readFileSync('matrix_ops.wasm');
const wasmModule = await WebAssembly.instantiate(wasmBuffer, {
  env: {
    memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
    log: (val) => console.log('Log depuis WASM:', val)
  }
});

const { multiplyMatrices } = wasmModule.instance.exports;`,
    question: "Comment le code binaire WebAssembly accède-t-il à la mémoire et interagit-il avec l'environnement JavaScript hôte ?",
    options: [
      { letter: 'A', text: "En lisant directement tous les fichiers présents sur le disque dur de l'utilisateur." },
      { letter: 'B', text: "Via une 'Mémoire Linéaire' (Linear Memory) constituée d'un `ArrayBuffer` continu de mémoire brute partagé et via des fonctions importées/exportées explicitement déclarées dans l'objet d'instanciation." },
      { letter: 'C', text: "En modifiant directement les variables du thread principal sans restriction." },
      { letter: 'D', text: "En écrivant dans la mémoire vidéo de la carte mère." },
    ],
    correctAnswers: ['B'],
    explanation: "WASM ne dispose pas d'accès direct au Heap JavaScript ni au système hôte. Il opère dans un bac à sable strict sur une 'mémoire linéaire' (un `ArrayBuffer` redimensionnable par blocs de 64 Ko appelés Pages) et ne communique avec l'hôte que par ses tables de fonctions importées et exportées.",
  },
  {
    id: 3,
    question: "Quelle est la taille standard d'une 'Page' de mémoire dans la spécification WebAssembly (`WebAssembly.Memory`) ?",
    options: [
      { letter: 'A', text: "1 kilo-octet (1 Ko)" },
      { letter: 'B', text: "1 méga-octet (1 Mo)" },
      { letter: 'C', text: "64 kilo-octets (64 Ko)" },
      { letter: 'D', text: "4 giga-octets (4 Go)" },
    ],
    correctAnswers: ['C'],
    explanation: "Dans la spécification WebAssembly, l'unité fondamentale d'allocation mémoire est la page de 64 Ko (65 536 octets). Lorsqu'on alloue `new WebAssembly.Memory({ initial: 10 })`, on réserve un espace mémoire initial de 10 x 64 Ko = 640 Ko.",
  },
  {
    id: 4,
    codeSnippet: `// Calcul de similarité cosinus de 100 000 vecteurs
// Cas A : Boucle JavaScript TurboFan avec tableaux
// Cas B : Module WebAssembly compilé en Rust avec SIMD 128-bit`,
    question: "Pourquoi le module WebAssembly (Cas B) surpasse-t-il significativement le code JavaScript classique lors de calculs d'algèbre linéaire intensifs ?",
    options: [
      { letter: 'A', text: "Parce que Rust utilise des polices de caractères plus légères." },
      { letter: 'B', text: "Parce que WASM convertit les calculs en requêtes SQL." },
      { letter: 'C', text: "Parce que le Cas A est obligé de passer par Internet." },
      { letter: 'D', text: "Parce que WASM élimine le surcoût du Garbage Collector, garantit un typage statique prévisible sans dé-optimisation JIT et exploite directement les instructions matérielles vectorielles SIMD (Single Instruction Multiple Data) du CPU traitant plusieurs flottants en un seul cycle d'horloge." },
    ],
    correctAnswers: ['D'],
    explanation: "WebAssembly évite les incertitudes du compilateur JIT et les pauses GC. Grâce à l'extension standard WASM SIMD (128-bit), une seule instruction CPU traite simultanément quatre flottants 32-bit en parallèle (f32x4), démultipliant le débit des calculs matriciels d'IA.",
  },
  {
    id: 5,
    question: "Dans quel scénario l'utilisation de WebAssembly n'apporte-t-elle AUCUN gain de performance (et peut même s'avérer plus lente que du JavaScript natif) ?",
    options: [
      { letter: 'A', text: "Pour des opérations effectuant de fréquents allers-retours avec manipulation intensive du DOM ou des micro-appels répétés de fonctions I/O à cause de la surcharge de passage de frontière (Boundary Crossing Overhead) entre le runtime JS et le module WASM." },
      { letter: 'B', text: "Pour exécuter des calculs matriciels de réseaux de neurones." },
      { letter: 'C', text: "Pour encoder un flux vidéo H.264." },
      { letter: 'D', text: "Pour décompresser un fichier zip en mémoire." },
    ],
    correctAnswers: ['A'],
    explanation: "Traverser la frontière entre JavaScript et WebAssembly engendre un léger surcoût (conversion d'arguments, marshaling de types). Si une tâche effectue des millions d'appels minuscules ou manipule le DOM plutôt que de longs calculs continus en mémoire linéaire, ce surcoût dépasse le gain de calcul brut.",
  },
  {
    id: 6,
    question: "Qu'est-ce que WebGPU par rapport à l'ancienne API WebGL dans les navigateurs et environnements Node.js modernes ?",
    options: [
      { letter: 'A', text: "Une simple mise à jour mineure de la syntaxe de WebGL 2.0." },
      { letter: 'B', text: "Une refonte architecturale complète conçue pour refléter les APIs graphiques modernes (Vulkan, Metal, DirectX 12), offrant un accès direct et de très bas niveau aux unités de calcul du GPU (Compute Shaders) sans le surcoût de la machine à état globale d'OpenGL." },
      { letter: 'C', text: "Un logiciel de retouche photo développé par Adobe." },
      { letter: 'D', text: "Une extension permettant de brancher deux écrans sur un même port USB." },
    ],
    correctAnswers: ['B'],
    explanation: "WebGL était basé sur le modèle OpenGL des années 1990 (orienté uniquement rendu graphique et lourd en overhead CPU). WebGPU est une API moderne de bas niveau exposant le parallélisme massif du matériel GPU pour le rendu ET pour le calcul généraliste (GPGPU) via des Compute Shaders.",
  },
  {
    id: 7,
    codeSnippet: `// Initialisation WebGPU
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();`,
    question: "Quelle est la distinction fondamentale entre le `GPUAdapter` et le `GPUDevice` dans l'API WebGPU ?",
    options: [
      { letter: 'A', text: "Le `GPUAdapter` représente la souris et le `GPUDevice` l'écran." },
      { letter: 'B', text: "Le `GPUAdapter` ne fonctionne que sous Windows et le `GPUDevice` sous Linux." },
      { letter: 'C', text: "Le `GPUAdapter` représente la carte graphique physique réelle (avec ses caractéristiques et limites matérielles), tandis que le `GPUDevice` est l'interface logique instanciée avec laquelle le code applicatif alloue la mémoire et soumet des commandes de calcul." },
      { letter: 'D', text: "Il n'y a aucune différence, ce sont deux objets interchangeables." },
    ],
    correctAnswers: ['C'],
    explanation: "`requestAdapter()` inspecte le matériel hôte (ex: GPU Nvidia dédié vs Intel intégré) et ses capacités. `adapter.requestDevice()` alloue une connexion logique isolée avec ce GPU, permettant de créer des buffers, des shaders et des files de commandes d'exécution.",
  },
  {
    id: 8,
    question: "Quel langage de programmation standardisé officiel est utilisé pour écrire les Shaders (Graphiques et de Calcul) dans WebGPU ?",
    options: [
      { letter: 'A', text: "GLSL" },
      { letter: 'B', text: "TypeScript" },
      { letter: 'C', text: "HLSL" },
      { letter: 'D', text: "WGSL (WebGPU Shading Language)" },
    ],
    correctAnswers: ['D'],
    explanation: "WebGPU utilise obligatoirement le WGSL (WebGPU Shading Language). Ce langage fortement typé est automatiquement transpilé par le navigateur ou le runtime en SPIR-V (Vulkan), MSL (Metal) ou HLSL (DirectX 12) selon le système d'exploitation hôte.",
  },
  {
    id: 9,
    codeSnippet: `@group(0) @binding(0) var<storage, read> inputA: array<f32>;
@group(0) @binding(1) var<storage, read> inputB: array<f32>;
@group(0) @binding(2) var<storage, read_write> output: array<f32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let index = global_id.x;
  output[index] = inputA[index] + inputB[index];
}`,
    question: "Dans ce shader de calcul WGSL, que signifie la directive `@compute @workgroup_size(64)` ?",
    options: [
      { letter: 'A', text: "Qu'il s'agit d'un Compute Shader (calcul généraliste non graphique) et que chaque groupe de travail (Workgroup) exécute 64 threads GPU en parallèle simultané." },
      { letter: 'B', text: "Que le calcul s'exécute sur 64 cartes mères différentes." },
      { letter: 'C', text: "Que le résultat est limité à 64 octets." },
      { letter: 'D', text: "Que le calcul prendra obligatoirement 64 millisecondes." },
    ],
    correctAnswers: ['A'],
    explanation: "`@compute` désigne un shader de calcul GPGPU. `@workgroup_size(64)` indique la géométrie du groupe de threads : 64 invocations matérielles sont exécutées en parallèle sur les unités de calcul (Compute Units/SMs) du GPU pour traiter les éléments vectoriels.",
  },
  {
    id: 10,
    codeSnippet: `const gpuBuffer = device.createBuffer({
  size: 1024 * 1024 * 4, // 1 million de flottants 32-bit (4 Mo)
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});`,
    question: "Dans WebGPU, pourquoi est-il obligatoire de spécifier explicitement les drapeaux de bits `usage` lors de la création d'un `GPUBuffer` ?",
    options: [
      { letter: 'A', text: "Pour que le fichier s'enregistre automatiquement dans le dossier Téléchargements." },
      { letter: 'B', text: "Pour permettre au pilote graphique d'allouer la mémoire dans la zone physique du GPU la plus optimale (VRAM locale, mémoire unifiée, mémoire de transfert hôte) selon la façon dont le buffer sera utilisé par le pipeline de calcul." },
      { letter: 'C', text: "Pour empêcher la carte graphique de surchauffer." },
      { letter: 'D', text: "Pour chiffrer les données contre les captures d'écran." },
    ],
    correctAnswers: ['B'],
    explanation: "WebGPU est une API explicite de bas niveau : indiquer `STORAGE | COPY_SRC` informe le pilote du GPU que cette zone mémoire sera lue/écrite par des shaders de calcul (`STORAGE`) et pourra être copiée vers un buffer de lecture (`COPY_SRC`), optimisant son placement matériel en VRAM.",
  },
  {
    id: 11,
    question: "Pourquoi est-il impossible de lire directement les octets d'un `GPUBuffer` alloué avec `GPUBufferUsage.STORAGE` depuis le code JavaScript du CPU ?",
    options: [
      { letter: 'A', text: "Parce que WebGPU est réservé aux images et refuse le texte." },
      { letter: 'B', text: "Parce que le GPU efface les données dès que le calcul est terminé." },
      { letter: 'C', text: "Parce que le CPU et la VRAM du GPU opèrent dans des espaces d'adressage physiques distincts : il faut impérativement copier les données dans un 'Staging Buffer' configuré avec `GPUBufferUsage.MAP_READ` puis appeler `mapAsync()`." },
      { letter: 'D', text: "Parce que JavaScript ne supporte pas les nombres hexadécimaux." },
    ],
    correctAnswers: ['C'],
    explanation: "Pour des raisons de performances maximales, la VRAM ultra-rapide du GPU n'est pas mappable directement en mémoire d'adressage CPU. Il faut copier les résultats via un command encoder vers un 'Staging Buffer' de transit mappable (`MAP_READ`), puis exécuter `await buffer.mapAsync(GPUMapMode.READ)`.",
  },
  {
    id: 12,
    codeSnippet: `import { pipeline } from '@xenova/transformers';

// Chargement et inférence locale d'un modèle d'embedding
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
  device: 'webgpu'
});

const output = await extractor('L'IA s'exécute localement dans le moteur Edge', {
  pooling: 'mean',
  normalize: true
});`,
    question: "Quel avantage stratégique majeur l'utilisation de `Transformers.js` avec le backend `device: 'webgpu'` apporte-t-elle à une application d'IA par rapport à un appel API cloud classique (Gemini / OpenAI) ?",
    options: [
      { letter: 'A', text: "Elle permet au modèle d'avoir accès à des trillions de paramètres sans consommer de mémoire." },
      { letter: 'B', text: "Elle remplace le besoin d'installer Node.js sur le serveur." },
      { letter: 'C', text: "Elle double l'autonomie de la batterie de l'ordinateur portable." },
      { letter: 'D', text: "L'inférence s'exécute intégralement en local sur le matériel de la machine cliente avec accélération GPU : coût d'API = 0€, latence réseau = 0 ms, fonctionnement 100% hors-ligne (Offline) et confidentialité totale des données privées." },
    ],
    correctAnswers: ['D'],
    explanation: "L'inférence locale sur Edge (via WebGPU et Transformers.js/ONNX) traite les embeddings ou la génération directement sur le GPU de l'utilisateur. Aucune donnée ne transite sur Internet (confidentialité absolue RGPD), l'application fonctionne sans connexion réseau et supprime les coûts de serveurs d'inférence.",
  },
  {
    id: 13,
    question: "Qu'est-ce que le format ONNX (Open Neural Network Exchange) et quel rôle joue le runtime `ONNX Runtime Web` dans le déploiement d'IA sur le web ?",
    options: [
      { letter: 'A', text: "Un format de fichier standardisé ouvert représentant un graphe de réseau de neurones complet (opérateurs, tenseurs, poids) pouvant être exécuté de manière optimisée par ONNX Runtime sur divers backends matériels (WASM, WebGL, WebGPU, CoreML, DirectML)." },
      { letter: 'B', text: "Un format de compression audio pour la musique classique." },
      { letter: 'C', text: "Un nouveau système d'exploitation concurrent de Linux." },
      { letter: 'D', text: "Un langage de base de données relationnelle." },
    ],
    correctAnswers: ['A'],
    explanation: "ONNX permet d'exporter un modèle entraîné en PyTorch ou TensorFlow sous une représentation unique universelle. `onnxruntime-web` exécute ce graphe de calcul dans un runtime JavaScript/Node.js en déléguant automatiquement chaque opérateur mathématique au meilleur backend disponible (WebGPU ou WASM SIMD).",
  },
  {
    id: 14,
    codeSnippet: `// Tailles de modèles IA selon la quantification :
// Modèle original Float32 (FP32) : 1000 Mo (1 Go)
// Modèle quantifié INT8 (Q8)      : ~250 Mo
// Modèle quantifié INT4 (Q4)      : ~130 Mo`,
    question: "Pourquoi la quantification de poids (Quantization en INT8 ou INT4) est-elle indispensable pour permettre l'exécution locale de modèles d'IA sur Edge ou dans le navigateur ?",
    options: [
      { letter: 'A', text: "Parce que le navigateur refuse de télécharger des fichiers pesant plus de 5 Mo." },
      { letter: 'B', text: "Parce qu'elle réduit drastiquement la taille du modèle en VRAM/RAM (divisée par 4 ou 8) et accélère le débit mémoire sans dégradation significative de la précision sémantique, rendant le téléchargement et l'exécution viables sur des machines grand public." },
      { letter: 'C', text: "Parce que les entiers INT4 sont automatiquement traduits en code CSS." },
      { letter: 'D', text: "Parce que les modèles FP32 sont interdits sur les processeurs ARM." },
    ],
    correctAnswers: ['B'],
    explanation: "Charger un modèle FP32 de plusieurs gigaoctets saturerait la bande passante web et la mémoire des terminaux clients. La quantification convertit les poids de 32-bit vers des entiers de 8 ou 4 bits, réduisant l'empreinte mémoire de 75% tout en accélérant les calculs arithmétiques vectoriels.",
  },
  {
    id: 15,
    codeSnippet: `const commandEncoder = device.createCommandEncoder();
const passEncoder = commandEncoder.beginComputePass();
passEncoder.setPipeline(computePipeline);
passEncoder.setBindGroup(0, bindGroup);
passEncoder.dispatchWorkgroups(Math.ceil(dataSize / 64));
passEncoder.end();

device.queue.submit([commandEncoder.finish()]);`,
    question: "Dans cette séquence d'exécution WebGPU, que réalise l'instruction `passEncoder.dispatchWorkgroups(Math.ceil(dataSize / 64))` ?",
    options: [
      { letter: 'A', text: "Elle envoie un email de confirmation à l'administrateur." },
      { letter: 'B', text: "Elle divise la vitesse du processeur par 64." },
      { letter: 'C', text: "Elle instancie sur le GPU le nombre exact de groupes de travail nécessaires pour traiter l'intégralité des éléments du tableau de données en fonction de la taille de workgroup configurée à 64." },
      { letter: 'D', text: "Elle supprime les données une fois traitées." },
    ],
    correctAnswers: ['C'],
    explanation: "`dispatchWorkgroups(X, Y, Z)` programme le lancement de X groupes de threads sur le matériel GPU. Si chaque workgroup gère 64 éléments, lancer `Math.ceil(dataSize / 64)` workgroups garantit que l'ensemble des `dataSize` calculs s'exécute en parallèle sur la grille de calcul.",
  },
  {
    id: 16,
    question: "Comment le standard WebAssembly gère-t-il la sécurité et l'isolation par rapport au système d'exploitation de l'hôte ?",
    options: [
      { letter: 'A', text: "Il demande les droits administrateur (root) à chaque exécution." },
      { letter: 'B', text: "Il crypte le système de fichiers pour empêcher les intrusions." },
      { letter: 'C', text: "Il désactive temporairement l'antivirus du système." },
      { letter: 'D', text: "Il s'exécute dans une machine virtuelle hermétique (Sandbox) sans accès direct aux fichiers, au réseau ni aux pointeurs de mémoire hôte, toute interaction extérieure devant être explicitement déléguée par l'environnement JavaScript hôte." },
    ],
    correctAnswers: ['D'],
    explanation: "WASM a été conçu avec la sécurité en priorité : il ne peut pas exécuter d'appel système (syscall), accéder à des adresses mémoire hors de son `WebAssembly.Memory` étanche ni ouvrir de socket réseau de son propre chef. Toutes les capacités sont contrôlées par l'hôte.",
  },
  {
    id: 17,
    codeSnippet: `// WAT (WebAssembly Text Format)
(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "add" (func $add))
)`,
    question: "Que représente le format WAT (WebAssembly Text Format) illustré ci-dessus par rapport au binaire `.wasm` ?",
    options: [
      { letter: 'A', text: "La représentation textuelle lisible par l'humain (utilisant des S-expressions) équivalente au bytecode binaire `.wasm`, permettant l'inspection, l'apprentissage et le débogage de bas niveau." },
      { letter: 'B', text: "Une extension pour le serveur Apache." },
      { letter: 'C', text: "Un langage pour concevoir des bases de données orientées documents." },
      { letter: 'D', text: "Un protocole de streaming audio en continu." },
    ],
    correctAnswers: ['A'],
    explanation: "Le format binaire `.wasm` est compact et destiné aux machines. Le format `.wat` en est la représentation textuelle exacte en S-expressions (Lisp-like), facilitant l'analyse, le désassemblage avec `wasm2wat` et l'apprentissage de la machine à pile sous-jacente.",
  },
  {
    id: 18,
    question: "Qu'est-ce que le standard WASI (WebAssembly System Interface) dans l'écosystème Node.js et du calcul distribué serveur ?",
    options: [
      { letter: 'A', text: "Un câble matériel pour brancher un GPU externe." },
      { letter: 'B', text: "Une spécification d'interface système standardisée et modulaire permettant à du code WebAssembly de s'exécuter hors du navigateur (sur serveurs, microservices, cloud edge) avec des accès sécurisés aux fichiers, horloges et variables d'environnement via des capacités déclarées (Capability-based security)." },
      { letter: 'C', text: "Un compilateur d'images au format GIF animé." },
      { letter: 'D', text: "Un plugin pour le logiciel Docker sous Windows." },
    ],
    correctAnswers: ['B'],
    explanation: "WASI apporte à WebAssembly l'équivalent de POSIX pour le monde serveur : il standardise la façon dont un binaire WASM accède au système de fichiers, à l'heure ou aux sockets de manière portable sur n'importe quel OS hôte selon un modèle de sécurité basé sur les capacités.",
  },
  {
    id: 19,
    codeSnippet: `// Détection de la compatibilité WebGPU avec repli automatique (Fallback)
async function getInferenceDevice(): Promise<'webgpu' | 'wasm'> {
  if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
    const adapter = await navigator.gpu.requestAdapter();
    if (adapter) return 'webgpu';
  }
  return 'wasm';
}`,
    question: "Pourquoi est-il indispensable d'implémenter cette logique de détection avec basculement automatique vers WASM dans une architecture d'IA universelle ?",
    options: [
      { letter: 'A', text: "Parce que WebGPU est temporairement désactivé la nuit." },
      { letter: 'B', text: "Parce que WASM est payant et WebGPU gratuit." },
      { letter: 'C', text: "Pour garantir que l'application d'IA fonctionne sur 100% des terminaux : si la machine possède un GPU moderne supporté, elle bénéficie de l'accélération matérielle maximale ; sinon, elle bascule sans erreur sur le CPU via WebAssembly SIMD." },
      { letter: 'D', text: "Pour forcer les utilisateurs à acheter un nouvel ordinateur." },
    ],
    correctAnswers: ['C'],
    explanation: "Tous les environnements clients ne disposent pas d'un GPU compatible WebGPU activé (anciens terminaux, machines virtuelles sans GPU passthrough, certains environnements serveurs). Le pattern de 'Progressive Enhancement' garantit une compatibilité totale avec repli sur WASM.",
  },
  {
    id: 20,
    codeSnippet: `import { Tensor, InferenceSession } from 'onnxruntime-node';

const session = await InferenceSession.create('./model.onnx', {
  executionProviders: ['cpu']
});

const inputTensor = new Tensor('float32', new Float32Array([1.0, 2.0, 3.0, 4.0]), [1, 4]);
const feeds = { input: inputTensor };
const results = await session.run(feeds);`,
    question: "Dans ce code d'inférence ONNX Runtime sous Node.js, que représente le tableau de dimensions `[1, 4]` passé au constructeur du `Tensor` ?",
    options: [
      { letter: 'A', text: "Le numéro de version du modèle d'IA." },
      { letter: 'B', text: "Le prix unitaire en centimes par prédiction." },
      { letter: 'C', text: "Les coordonnées géographiques du serveur." },
      { letter: 'D', text: "La forme (Shape) du tenseur multidimensionnel, indiquant ici un lot de taille 1 (batch_size = 1) comportant 4 caractéristiques (features)." },
    ],
    correctAnswers: ['D'],
    explanation: "Un tenseur est un tableau multidimensionnel. La forme (Shape) spécifie la géométrie des données transmises au réseau de neurones. `[1, 4]` définit une matrice à 1 ligne (1 échantillon à prédire) et 4 colonnes de données en entrée.",
  },
  {
    id: 21,
    question: "Quelle est la principale différence entre la mémoire d'un GPU (VRAM) et la mémoire centrale du système (RAM) dans le traitement de réseaux de neurones ?",
    options: [
      { letter: 'A', text: "La VRAM possède une bande passante massive (centaines de Go/s voire To/s sur architectures GDDR6/HBM) capable d'alimenter simultanément des milliers de cœurs de calcul arithmétique parallèles, là où la RAM CPU est optimisée pour la faible latence séquentielle." },
      { letter: 'B', text: "La RAM ne peut stocker que des textes, tandis que la VRAM ne stocke que des vidéos." },
      { letter: 'C', text: "La VRAM conserve ses données même lorsque l'ordinateur est éteint." },
      { letter: 'D', text: "La RAM est située à l'intérieur du disque SSD." },
    ],
    correctAnswers: ['A'],
    explanation: "L'inférence de modèles d'IA est souvent limitée par la bande passante mémoire (Memory Bandwidth Bound) : transférer des milliards de poids vers les unités de calcul. La bande passante VRAM (jusqu'à 1000+ Go/s) surclasse très largement celle de la RAM système (50-100 Go/s).",
  },
  {
    id: 22,
    codeSnippet: `const memory = new WebAssembly.Memory({ initial: 1 }); // 64 Ko
const bytesNeeded = 1024 * 1024 * 10; // 10 Mo
const pagesNeeded = Math.ceil(bytesNeeded / 65536);

memory.grow(pagesNeeded);`,
    question: "Quel comportement mémoire se produit lors de l'appel à `memory.grow()` sur une instance `WebAssembly.Memory` en JavaScript ?",
    options: [
      { letter: 'A', text: "Le serveur supprime tous les processus inactifs." },
      { letter: 'B', text: "La mémoire linéaire est agrandie du nombre de pages demandé (64 Ko par page), ce qui détache (neuter) tout `ArrayBuffer` préexistant pointant sur `memory.buffer` et exige de réinstancier de nouvelles vues typées." },
      { letter: 'C', text: "L'application plante immédiatement avec une erreur de dépassement de pile." },
      { letter: 'D', text: "Les données précédentes sont écrasées avec des zéros." },
    ],
    correctAnswers: ['B'],
    explanation: "Agrandir la mémoire avec `.grow()` peut forcer le moteur sous-jacent à réallouer le bloc mémoire à une nouvelle adresse virtuelle. En conséquence, l'ancien `buffer` est immédiatement détaché pour des raisons de sécurité : il faut systématiquement recréer vos `Uint8Array(memory.buffer)`.",
  },
  {
    id: 23,
    question: "Dans le cadre de l'ingénierie WebGPU, à quoi sert un 'Bind Group' (`GPUBindGroup`) ?",
    options: [
      { letter: 'A', text: "À associer les utilisateurs d'un même groupe Discord." },
      { letter: 'B', text: "À regrouper les erreurs de compilation TypeScript." },
      { letter: 'C', text: "À lier un ensemble de ressources GPU concrètes (Buffers de stockage, Textures, Samplers) aux points d'attache déclarés (`@binding(0)`, `@binding(1)`) dans le shader WGSL avant de lancer le calcul." },
      { letter: 'D', text: "À fusionner deux disques durs en mode RAID." },
    ],
    correctAnswers: ['C'],
    explanation: "Un Bind Group spécifie quelles ressources physiques réelles (GPUBuffer) correspondent aux entrées/sorties attendues par le shader au niveau de ses déclarations `@group(X) @binding(Y)`. C'est l'équivalent moderne et sans friction des descripteurs de Vulkan.",
  },
  {
    id: 24,
    codeSnippet: `// Configuration de WebAssembly avec threads partagés
const sharedMemory = new WebAssembly.Memory({
  initial: 256,
  maximum: 512,
  shared: true
});`,
    question: "Que permet l'option `{ shared: true }` lors de la déclaration d'une mémoire WebAssembly sous Node.js ou dans le Web ?",
    options: [
      { letter: 'A', text: "Elle sauvegarde les calculs dans un fichier CSV public." },
      { letter: 'B', text: "Elle partage la mémoire sur les réseaux sociaux." },
      { letter: 'C', text: "Elle désactive les mécanismes de sécurité du système." },
      { letter: 'D', text: "Elle permet à plusieurs Worker Threads ou au thread principal d'accéder concurremment au même bloc de mémoire linéaire adossé à un `SharedArrayBuffer`, autorisant le parallélisme multithread natif en WASM." },
    ],
    correctAnswers: ['D'],
    explanation: "Avec `shared: true`, le buffer sous-jacent est un `SharedArrayBuffer`. Cela permet à des programmes compilés avec des bibliothèques de threading natives (comme pthreads en C++ ou Rayon en Rust) d'exécuter de véritables calculs parallèles multi-threads en mémoire partagée.",
  },
  {
    id: 25,
    question: "Qu'est-ce que le 'Pruning' (Élagage) dans l'optimisation de réseaux de neurones pour le déploiement sur Edge ?",
    options: [
      { letter: 'A', text: "La suppression sélective des poids et connexions synaptiques redondants ou proches de zéro qui n'ont qu'un impact négligeable sur la précision du modèle, réduisant la taille du réseau et le volume de multiplications matricielles." },
      { letter: 'B', text: "L'effacement des commentaires dans le code source Python." },
      { letter: 'C', text: "La réinitialisation des cartes graphiques tous les matins." },
      { letter: 'D', text: "L'interdiction d'utiliser des modèles de vision par ordinateur." },
    ],
    correctAnswers: ['A'],
    explanation: "Le pruning élimine les connexions inutiles (poids négligeables) d'un réseau dense. Le modèle résultant (parcimonieux ou compressé) nécessite moins de stockage mémoire et moins d'opérations en virgule flottante (FLOPs) lors de son inférence sur Edge.",
  },
  {
    id: 26,
    codeSnippet: `// Tokenisation locale avec Transformers.js
import { AutoTokenizer } from '@xenova/transformers';

const tokenizer = await AutoTokenizer.from_pretrained('Xenova/gpt-4');
const { input_ids } = await tokenizer('Bonjour monde');
console.log(input_ids.data); // [Int32Array des IDs de tokens]`,
    question: "Pourquoi est-il avantageux d'exécuter la phase de tokenisation directement sur le terminal client en WebAssembly plutôt que sur le serveur backend ?",
    options: [
      { letter: 'A', text: "Parce que les serveurs cloud ne savent pas découper les mots en syllabes." },
      { letter: 'B', text: "Parce que le client peut vérifier le nombre exact de tokens avant l'envoi, tronquer les prompts trop longs, calculer le coût exact et soulager le serveur de l'analyse lexicale BPE CPU-intensive." },
      { letter: 'C', text: "Parce que la tokenisation consomme toute la mémoire RAM du serveur." },
      { letter: 'D', text: "Parce que le format JSON ne tolère pas les chaînes de caractères." },
    ],
    correctAnswers: ['B'],
    explanation: "La tokenisation Byte-Pair Encoding (BPE) exécutée côté client permet d'afficher en temps réel le décompte de tokens à l'utilisateur, de tronquer intelligemment l'historique de conversation dans la limite de la fenêtre de contexte et d'alléger la charge CPU du backend.",
  },
  {
    id: 27,
    question: "Dans le langage de shader WGSL, à quoi sert le qualificateur d'espace d'adresse `var<workgroup>` par rapport à `var<storage>` ?",
    options: [
      { letter: 'A', text: "À stocker des données sur la clé USB de l'utilisateur." },
      { letter: 'B', text: "À enregistrer les logs d'erreurs du système." },
      { letter: 'C', text: "À déclarer une zone de mémoire partagée locale ultra-rapide (Local Shared Memory / SLM) accessible uniquement par les threads appartenant au même Workgroup GPU, idéale pour les réductions parallèles et le tuilage matriciel (Tiling)." },
      { letter: 'D', text: "À communiquer avec la base de données PostgreSQL." },
    ],
    correctAnswers: ['C'],
    explanation: "La mémoire `workgroup` correspond à la mémoire partagée sur puce (Shared Memory / LDS) du GPU. Elle est des dizaines de fois plus rapide que la mémoire globale (`storage`). Les threads d'un groupe y échangent des données intermédiaires lors de calculs matriciels par blocs (Tiling).",
  },
  {
    id: 28,
    codeSnippet: `// Synchronisation entre threads au sein d'un même Workgroup WGSL
workgroupBarrier();`,
    question: "Quel rôle fondamental l'instruction `workgroupBarrier()` remplit-elle dans un shader de calcul WebGPU ?",
    options: [
      { letter: 'A', text: "Elle met fin définitivement au calcul du shader." },
      { letter: 'B', text: "Elle supprime les variables locales." },
      { letter: 'C', text: "Elle redémarre la carte graphique en cas de bug." },
      { letter: 'D', text: "Elle synchronise tous les threads du Workgroup courant, forçant chaque thread à attendre que tous les autres aient atteint cette ligne et que toutes les écritures en mémoire partagée `workgroup` soient visibles avant de continuer." },
    ],
    correctAnswers: ['D'],
    explanation: "Sans barrière de synchronisation, un thread rapide pourrait lire des données dans la mémoire partagée avant qu'un thread plus lent n'ait fini de les écrire (Race Condition). `workgroupBarrier()` garantit la cohérence des calculs parallèles coopératifs.",
  },
  {
    id: 29,
    question: "Quel compromis fondamental caractérise le déploiement d'un modèle d'IA local sur Edge (WASM/WebGPU) par rapport à un modèle hébergé sur une ferme de serveurs cloud (ex: Gemini 2.5 Pro) ?",
    options: [
      { letter: 'A', text: "Les modèles locaux sont plus petits (généralement < 7 milliards de paramètres pour tenir en mémoire client) et offrent une capacité de raisonnement moins vaste que les méga-modèles cloud, mais garantissent une confidentialité absolue, aucun coût de serveur et une indépendance réseau." },
      { letter: 'B', text: "Les modèles locaux ont une latence infinie." },
      { letter: 'C', text: "Les modèles cloud ne peuvent pas comprendre la langue française." },
      { letter: 'D', text: "Les modèles Edge ne fonctionnent que le jour." },
    ],
    correctAnswers: ['A'],
    explanation: "L'Edge AI est le choix de la souveraineté, de la confidentialité (données médicales, finances) et de la gratuité d'infrastructure, au prix d'un modèle plus modeste en taille pour respecter les contraintes de VRAM et de batterie des téléphones ou ordinateurs portables.",
  },
  {
    id: 30,
    codeSnippet: `// Configuration de WebAssembly Streaming Compilation
const response = fetch('ai_engine.wasm');
const wasmModule = await WebAssembly.instantiateStreaming(response, importObject);`,
    question: "Pourquoi l'utilisation de `WebAssembly.instantiateStreaming()` est-elle nettement plus performante que de télécharger le fichier avec `fetch().then(r => r.arrayBuffer())` avant de l'instancier ?",
    options: [
      { letter: 'A', text: "Parce qu'elle télécharge le fichier via le protocole Bittorrent." },
      { letter: 'B', text: "Parce qu'elle compile le bytecode WASM en code machine natif en flux continu au fur et à mesure que les paquets d'octets arrivent sur le réseau, sans attendre le téléchargement complet du fichier binaire." },
      { letter: 'C', text: "Parce qu'elle supprime le code source du fichier compilé." },
      { letter: 'D', text: "Parce qu'elle évite d'avoir à déclarer les variables en TypeScript." },
    ],
    correctAnswers: ['B'],
    explanation: "`instantiateStreaming` compile les octets WASM à la volée pendant le transfert réseau (Streaming Compilation). Dès que le dernier paquet réseau est reçu, le binaire machine est déjà compilé et prêt à s'exécuter, réduisant le temps de démarrage de façon spectaculaire.",
  },
  {
    id: 31,
    question: "Dans le cadre de la sécurité des navigateurs, pourquoi l'instruction WebGPU `mapAsync()` renvoie-t-elle une Promesse asynchrone plutôt qu'une méthode synchrone de lecture directe ?",
    options: [
      { letter: 'A', text: "Pour permettre au système d'afficher une publicité pendant l'attente." },
      { letter: 'B', text: "Parce que le langage JavaScript interdit les fonctions synchrones." },
      { letter: 'C', text: "Parce que le GPU et le CPU s'exécutent de manière asynchrone : le CPU doit attendre que la carte graphique ait entièrement terminé tous les calculs programmés dans la file d'attente avant de rendre la plage mémoire accessible en lecture." },
      { letter: 'D', text: "Parce que les cartes graphiques n'ont pas d'horloge interne." },
    ],
    correctAnswers: ['C'],
    explanation: "Le processeur soumet des commandes au GPU de manière asynchrone (Command Queue). Un appel synchrone bloquerait le thread principal jusqu'à l'achèvement des millions de calculs matriciels. `mapAsync()` libère le CPU et résout la promesse dès que les données sont physiquement prêtes.",
  },
  {
    id: 32,
    codeSnippet: `// Pipeline ONNX avec mise en cache du modèle sur le navigateur
const session = await ort.InferenceSession.create(modelPath, {
  executionProviders: ['webgpu'],
  enableModelCache: true
});`,
    question: "À quoi sert l'option `enableModelCache: true` (utilisant l'API CacheStorage ou IndexedDB du navigateur) lors de l'exécution répétée d'un modèle d'IA local ?",
    options: [
      { letter: 'A', text: "À sauvegarder les réponses de l'utilisateur dans Google Drive." },
      { letter: 'B', text: "À accélérer la vitesse de calcul des ventilateurs du GPU." },
      { letter: 'C', text: "À crypter le code source de la page web." },
      { letter: 'D', text: "À stocker le fichier binaire du modèle d'IA (ex: 200 Mo) sur le disque dur local du client dès le premier chargement, évitant de retélécharger le modèle lors des visites ultérieures." },
    ],
    correctAnswers: ['D'],
    explanation: "Télécharger un modèle de 200 Mo à chaque rechargement de page anéantirait l'expérience utilisateur. La mise en cache persistante dans IndexedDB ou CacheStorage permet au modèle de se charger instantanément depuis le stockage local lors des sessions suivantes.",
  },
  {
    id: 33,
    question: "Quelle est la fonction d'un 'Compute Pipeline' (`GPUComputePipeline`) dans l'architecture WebGPU ?",
    options: [
      { letter: 'A', text: "L'objet immuable précompilé qui encapsule le code machine du shader de calcul, la définition de son point d'entrée (`main`) et la configuration de ses groupes de liaisons (Bind Group Layouts)." },
      { letter: 'B', text: "Une canalisation de refroidissement liquide pour serveurs haute densité." },
      { letter: 'C', text: "Un outil pour nettoyer le disque dur du serveur." },
      { letter: 'D', text: "Un protocole pour envoyer des messages SMS aux développeurs." },
    ],
    correctAnswers: ['A'],
    explanation: "Le Compute Pipeline compile et optimise le code shader WGSL en binaire machine natif adapté au GPU spécifique. Une fois créé, le pipeline est exécuté à très haute vitesse sans recompilation, garantissant une exécution déterministe.",
  },
  {
    id: 34,
    codeSnippet: `// Vérification des capacités de quantification en WGSL
// Support des flottants 16 bits (half-precision)
const hasF16 = device.features.has('shader-f16');`,
    question: "Quel avantage majeur apporte la fonctionnalité optionnelle `shader-f16` (virgule flottante 16-bit) dans les calculs matriciels de réseaux de neurones sous WebGPU ?",
    options: [
      { letter: 'A', text: "Elle permet d'écrire du code en 16 langues différentes." },
      { letter: 'B', text: "Elle divise par deux la mémoire nécessaire pour stocker les tenseurs par rapport au FP32 et double le débit théorique d'opérations arithmétiques par seconde sur les GPUs récents équipés de cœurs Tensor/Matrix adaptés." },
      { letter: 'C', text: "Elle convertit les modèles en format MP3." },
      { letter: 'D', text: "Elle supprime l'obligation d'avoir une connexion Internet." },
    ],
    correctAnswers: ['B'],
    explanation: "La précision FP16 divise la bande passante requise par deux et permet aux architectures GPU modernes d'exécuter deux opérations arithmétiques SIMD 16-bit au lieu d'une en 32-bit, augmentant drastiquement les performances d'inférence des LLM.",
  },
  {
    id: 35,
    question: "Dans le cadre de l'exécution de code WebAssembly, que désigne l'erreur critique 'Out of Bounds Memory Access' (Piège d'accès mémoire hors limites) ?",
    options: [
      { letter: 'A', text: "Le disque dur de la machine est saturé." },
      { letter: 'B', text: "La connexion Wi-Fi a été coupée pendant l'exécution." },
      { letter: 'C', text: "Le module WASM a tenté de lire ou d'écrire à un indice d'octet situé au-delà de la taille allouée de sa mémoire linéaire (`WebAssembly.Memory`), déclenchant un 'Trap' matériel immédiat et sécurisé qui interrompt l'exécution sans corrompre le reste du système hôte." },
      { letter: 'D', text: "Le fichier CSS n'a pas été trouvé." },
    ],
    correctAnswers: ['C'],
    explanation: "L'isolation de WASM repose sur la vérification des bornes (Bounds Checking). Toute instruction tentant d'accéder à un décalage supérieur à la taille de la mémoire linéaire lève immédiatement un 'Trap', protégeant l'intégrité de la machine hôte contre les attaques par écrasement de mémoire.",
  },
  {
    id: 36,
    codeSnippet: `// Exemple de compilation avec emscripten / wasm-pack
// export d'une fonction C++ vers WASM
EMSCRIPTEN_KEEPALIVE
extern "C" void softmax(float* input, int length) {
  // Calcul optimisé
}`,
    question: "À quoi sert la directive `EMSCRIPTEN_KEEPALIVE` (ou `#[wasm_bindgen]` en Rust) lors de la compilation de code natif vers WebAssembly ?",
    options: [
      { letter: 'A', text: "À empêcher le système d'exploitation de se mettre en veille." },
      { letter: 'B', text: "À traduire la fonction en code Java." },
      { letter: 'C', text: "À forcer la fonction à s'exécuter toutes les secondes." },
      { letter: 'D', text: "À indiquer au compilateur et à l'éditeur de liens de ne pas éliminer cette fonction lors de la phase d'optimisation d'élagage de code mort (Dead Code Elimination / Tree-Shaking) et de l'exposer dans la table des fonctions exportées du module `.wasm`." },
    ],
    correctAnswers: ['D'],
    explanation: "Par défaut, les compilateurs C++ et Rust éliminent toutes les fonctions qui ne sont pas appelées par la fonction `main()`. La directive `KEEPALIVE` préserve la fonction et l'intègre dans les exports WASM afin qu'elle soit appelable depuis JavaScript.",
  },
  {
    id: 37,
    question: "Pourquoi est-il généralement recommandé d'exécuter un pipeline d'inférence WebGPU lourd au sein d'un Web Worker (ou Worker Thread) plutôt que sur le thread principal de l'application ?",
    options: [
      { letter: 'A', text: "Pour éviter que les micro-latences de préparation de commandes, de transfert de données et de synchronisation CPU n'impactent la fluidité de l'interface utilisateur (taux de rafraîchissement à 60/120 FPS et réactivité des animations)." },
      { letter: 'B', text: "Parce que WebGPU est interdit sur le thread principal." },
      { letter: 'C', text: "Pour forcer l'ordinateur à utiliser son ventilateur à vitesse maximale." },
      { letter: 'D', text: "Pour crypter les graphiques de la page web." },
    ],
    correctAnswers: ['A'],
    explanation: "Même si le gros du calcul s'exécute sur le GPU, la préparation des buffers, la tokenisation et l'encodage des commandes consomment des cycles CPU. Déporter ce traitement dans un Worker garantit que l'interface utilisateur reste parfaitement fluide sans jamais geler.",
  },
  {
    id: 38,
    codeSnippet: `// Libération manuelle des ressources GPU
gpuBuffer.destroy();
device.destroy();`,
    question: "Pourquoi la méthode explicite `.destroy()` est-elle fournie sur les objets `GPUBuffer` et `GPUDevice` dans WebGPU alors que JavaScript dispose d'un Garbage Collector ?",
    options: [
      { letter: 'A', text: "Parce que le Garbage Collector de V8 ne sait pas supprimer les variables créées avec `const`." },
      { letter: 'B', text: "Parce que le Garbage Collector JavaScript ne gère que le tas JS et ne connaît pas la pression mémoire physique sur la VRAM de la carte graphique, rendant la libération manuelle immédiate essentielle pour éviter la saturation prématurée de la VRAM (Out Of Video Memory)." },
      { letter: 'C', text: "Pour des raisons de conformité avec les lois européennes." },
      { letter: 'D', text: "Parce que WebGPU efface les données à la vitesse de la lumière." },
    ],
    correctAnswers: ['B'],
    explanation: "Un `GPUBuffer` n'est représenté en JavaScript que par un petit objet de quelques octets (Wrapper). Le GC de V8 ne sait pas que cet objet détient en réalité 2 Go de VRAM sur la carte graphique. Sans `.destroy()`, la VRAM peut saturer et faire crasher le pilote avant que le GC JavaScript ne réagisse.",
  },
  {
    id: 39,
    question: "Dans le cadre de l'exécution d'un modèle d'IA local (ex: Whisper local pour la transcription vocale), comment les poids du modèle téléchargés sont-ils découpés pour éviter les limites de taille de mémoire vive du navigateur ?",
    options: [
      { letter: 'A', text: "En convertissant le modèle en fichiers audio MP3." },
      { letter: 'B', text: "En supprimant tous les calques convolutionnels du réseau." },
      { letter: 'C', text: "En découpant le modèle en plusieurs fragments sérialisés ('Shards' de 200 à 500 Mo) chargés progressivement et assemblés en mémoire de manière asynchrone." },
      { letter: 'D', text: "En forçant l'utilisateur à installer une barrette de RAM supplémentaire." },
    ],
    correctAnswers: ['C'],
    explanation: "Les gros modèles sont découpés en 'shards' (morceaux gérables). Les chargeurs modernes (Hugging Face / Transformers.js) téléchargent ces fragments de façon concurrente et résiliente, évitant les échecs de téléchargement sur connexions instables.",
  },
  {
    id: 40,
    codeSnippet: `// Configuration de WebGPU dans Node.js
import { create } from 'webgpu';
// Utilisation via le binding Dawn de Google
const gpu = create();
const adapter = await gpu.requestAdapter();`,
    question: "Comment est-il possible d'exécuter des calculs WebGPU en environnement Backend sous Node.js sans aucun navigateur web installé ?",
    options: [
      { letter: 'A', text: "Ce n'est techniquement pas possible, WebGPU est strictement réservé aux navigateurs." },
      { letter: 'B', text: "En ouvrant une fenêtre Chrome invisible avec Puppeteer." },
      { letter: 'C', text: "En simulant un navigateur dans une image Docker non interactive." },
      { letter: 'D', text: "Grâce à des implémentations natives en C++ comme Dawn (moteur open-source officiel de Google) compilées sous forme de modules natifs Node.js exposant l'API standard WebGPU côté serveur." },
    ],
    correctAnswers: ['D'],
    explanation: "WebGPU n'est pas limité aux navigateurs : c'est un standard d'API. Des projets comme Dawn (de Chromium) ou wgpu (en Rust) fournissent des bibliothèques C/C++ natives que Node.js intègre via des bindings (comme le paquet officiel `webgpu`), permettant de faire du calcul GPU accéléré sur des serveurs backend headless.",
  },
];
