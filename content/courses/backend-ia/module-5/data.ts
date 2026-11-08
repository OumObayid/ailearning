export interface BackendIaChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const BACKEND_IA_MODULE_5_CHAPTERS: BackendIaChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Comprendre le cache et ses avantages en Backend IA',
    duration: '2 h à 2 h 30',
    description: 'Comprendre les principes du cache, Cache-Aside (Lazy Loading), Cache Hit vs Cache Miss, et analyse d’impact sur les coûts d’inférence Gemini.',
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Redis — Installation, commandes clés et connexion Node.js',
    duration: '2 h 30',
    description: 'Déployer Redis avec Docker sous Windows, maîtriser les commandes primitives (SET, GET, DEL, EXISTS, KEYS), et connecter le client redis à Express.',
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Cache avec expiration (TTL) et invalidation de données',
    duration: '2 h 30 à 3 h',
    description: 'Définir des durées de vie avec SET EX, consulter le TTL restant, et orchestrer l’invalidation immédiate (DEL) lors des mutations MySQL.',
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Mise en cache des résultats d’inférence de Google Gemini',
    duration: '3 h',
    description: 'Générer des clés de cache déterministes avec SHA-256, gérer le Cache Stampede, et coupler l’API Interactions de Gemini avec un fallback gracieux.',
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Rate Limiting et protection des quotas d’appels API',
    duration: '3 h',
    description: 'Implémenter le code HTTP 429 Too Many Requests, concevoir un limiteur en script Lua atomique dans Redis, et comparer les algorithmes Token Bucket et Fixed Window.',
  },
];

