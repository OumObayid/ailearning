export interface BackendIaChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const BACKEND_IA_MODULE_6_CHAPTERS: BackendIaChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Comprendre WebAssembly (WASM) et son exécution binaire',
    duration: '2 h à 2 h 30',
    description: 'Découvrir le format binaire portable WASM, le format textuel WAT, la compilation C/Rust/Go vers .wasm et l’instanciation directe dans Node.js et React.',
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Différence entre JavaScript et WebAssembly — Benchmark & Performances',
    duration: '2 h 30',
    description: 'Comparer le moteur V8 JIT au code machine déterministe de WASM, mesurer la latence sur 100 millions d’opérations et maîtriser les surcoûts d’interopérabilité (FFI).',
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Introduction à WebGPU — Architecture matérielle et premier shader WGSL',
    duration: '2 h 30 à 3 h',
    description: 'Distinguer CPU et GPU, initialiser GPUDevice et GPUAdapter, allouer des GPUBuffer en VRAM et programmer son premier Compute Shader en WGSL.',
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Calculs GPU parallèles dans le navigateur — Workgroups & Benchmarks',
    duration: '3 h',
    description: 'Organiser le calcul parallèle en groupes de travail (@workgroup_size(64)), dispatcher les calculs massifs et comparer les temps de calculs GPU vs CPU.',
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Exécution locale de modèles d’IA dans le navigateur (Transformers.js & ONNX)',
    duration: '3 h',
    description: 'Déployer des modèles d’analyse de sentiment et d’embeddings locaux dans React avec Transformers.js et ONNX Runtime Web, et concevoir une architecture hybride avec Gemini.',
  },
];

