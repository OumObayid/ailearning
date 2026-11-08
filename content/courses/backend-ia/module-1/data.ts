export interface BackendIaChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const BACKEND_IA_MODULE_1_CHAPTERS: BackendIaChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Mémoire (RAM), Stack, Heap et Event Loop avec Node.js',
    duration: '2 h 30 à 3 h',
    description: 'Comprendre comment Node.js alloue la mémoire, gère le Call Stack et coordonne les requêtes sans bloquer le serveur.',
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Event Loop, phases d'exécution, Microtasks et Macrotasks",
    duration: '2 h à 2 h 30',
    description: "Explorer les 6 phases officielles de libuv, la priorité des microtâches (nextTick, Promises) et l'ordonnancement asynchrone.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Programmation synchrone, asynchrone et opérations non bloquantes',
    duration: '2 h 30',
    description: 'Distinguer flux bloquants et asynchrones, maîtriser async/await et paralléliser avec Promise.all().',
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Gestion de la mémoire, Garbage Collector, fuites et optimisation',
    duration: '2 h 30 à 3 h',
    description: 'Algorithme Mark-and-Sweep, profiling avec Chrome DevTools, détection de memory leaks et optimisation par Streams.',
  },
];

