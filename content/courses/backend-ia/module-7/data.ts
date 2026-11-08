export interface BackendIaChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const BACKEND_IA_MODULE_7_CHAPTERS: BackendIaChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Analyse des besoins et conception de l’architecture',
    duration: '2 h 00',
    description: 'Compréhension du besoin métier, identification des fonctionnalités cibles, délimitation des responsabilités Frontend / Backend et cartographie des flux de données.',
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Initialisation et organisation du projet Node.js / Express',
    duration: '2 h 00',
    description: 'Initialisation du projet Node.js avec TypeScript, configuration d’Express, structure modulaire en couches, gestion des variables d’environnement et scripts npm.',
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Conception et intégration de la base de données MySQL',
    duration: '2 h 30',
    description: 'Modélisation des tables users et analyses, pilote mysql2/promise, pool de connexions haute performance et requêtes préparées anti-injections.',
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Intégration de Google Gemini dans le Backend',
    duration: '2 h 30',
    description: 'Configuration du SDK officiel @google/genai, sécurisation de la clé secrète, service d’inférence generateContent(), contrôleur et gestion rigoureuse des erreurs d’API.',
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Streaming des réponses IA avec Server-Sent Events (SSE)',
    duration: '3 h 00',
    description: 'Mise en œuvre du protocole SSE, méthode generateContentStream() de Gemini, flux for await...of, en-têtes text/event-stream et détection des déconnexions.',
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: 'Traitements parallèles avec Worker Threads',
    duration: '2 h 30',
    description: 'Délestage des calculs CPU intensifs hors du thread principal Node.js : module node:worker_threads, communication parentPort/workerData et mesure des gains de latence.',
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: 'Optimisation des performances avec Redis',
    duration: '3 h 00',
    description: 'Mise en place de Redis sur Docker, stratégie de Cache-Aside avec empreinte SHA-256, expiration TTL et protection des quotas par Rate Limiting avec express-rate-limit.',
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: 'Développement de l’interface utilisateur avec React',
    duration: '3 h 00',
    description: 'Création du frontend React avec Vite et TypeScript, consommation du flux de streaming SSE via l’API Fetch ReadableStream et affichage mot à mot sans blocage.',
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: 'Tests, débogage et optimisation globale de l’application',
    duration: '3 h 30',
    description: 'Tests unitaires et d’intégration avec Vitest et Supertest, audit des goulots d’étranglement, checklist de sécurité, simulation de charge avec k6 et préparation au déploiement.',
  },
];
