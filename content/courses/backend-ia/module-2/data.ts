export interface BackendIaChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const BACKEND_IA_MODULE_2_CHAPTERS: BackendIaChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Processus, threads et fonctionnement du thread principal',
    duration: '2 h à 2 h 30',
    description: 'Comprendre l’isolation mémoire des processus, les threads partagés, le thread principal Node.js et les causes du blocage serveur.',
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Web Workers et Worker Threads',
    duration: '2 h 30',
    description: 'Distinguer les threads navigateur (Web Workers) et serveur (Worker Threads), communiquer avec postMessage et parentPort.',
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Communication entre threads — messages et données',
    duration: '2 h 30 à 3 h',
    description: 'Structured Clone Algorithm, clonage vs transfert de propriété d’ArrayBuffer et gestion des événements d’erreur et de fin.',
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Transfert de données et SharedArrayBuffer',
    duration: '2 h 30 à 3 h',
    description: 'Mémoire partagée avec SharedArrayBuffer, manipulation par TypedArray et synchronisation atomique avec Atomics.add/wait/notify.',
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Traitements CPU intensifs et optimisation des performances',
    duration: '3 h',
    description: 'Différencier CPU-bound et I/O-bound, mesurer avec monitorEventLoopDelay, concevoir un Worker Pool réutilisable et découper les charges lourdes d’IA.',
  },
];

