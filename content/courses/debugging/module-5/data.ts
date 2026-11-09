export interface ChapterMeta {
  slug: string;
  title: string;
  number: number;
  duration: string;
  description: string;
}

export const DEBUGGING_MODULE_5_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    title: '5.1 Comprendre les performances d\'une application',
    number: 1,
    duration: '1 h 30',
    description: 'Facteurs de ralentissement, distinction Frontend vs Backend vs Base de données, métriques clés (TTFB, Throughput, P50/P95/P99) et Chrome DevTools.',
  },
  {
    slug: 'chapitre-2',
    title: '5.2 Détecter les fuites mémoire (Memory Leaks)',
    number: 2,
    duration: '2 h 00',
    description: 'Fonctionnement du Heap V8 et du Garbage Collector, détection des variables globales, timers non nettoyés, Heap Snapshots et process.memoryUsage().',
  },
  {
    slug: 'chapitre-3',
    title: '5.3 Analyser la consommation CPU et mémoire',
    number: 3,
    duration: '1 h 45',
    description: 'Diagnostic des surcharges CPU, blocage de l\'Event Loop avec monitorEventLoopDelay, CPU profiling (.cpuprofile) et déport vers Worker Threads.',
  },
  {
    slug: 'chapitre-4',
    title: '5.4 Identifier les requêtes lentes',
    number: 4,
    duration: '1 h 45',
    description: 'Décomposition du temps HTTP (TTFB), middleware de mesure Express, requêtes SQL lentes, analyse EXPLAIN et Slow Query Log MySQL.',
  },
  {
    slug: 'chapitre-5',
    title: '5.5 Détecter les problèmes de concurrence',
    number: 5,
    duration: '2 h 00',
    description: 'Race conditions sur stocks et soldes, deadlocks de transactions, UPDATE atomique conditionnel, SELECT FOR UPDATE et verrouillage optimiste.',
  },
  {
    slug: 'chapitre-6',
    title: '5.6 Comprendre les problèmes de charge et de saturation serveur',
    number: 6,
    duration: '1 h 45',
    description: 'Limites de capacité serveur, saturation CPU/RAM/connexions, tests de charge avec Autocannon, Load Balancing, Scaling et files de messages BullMQ.',
  },
  {
    slug: 'chapitre-7',
    title: '5.7 Déboguer les problèmes de connexion à la base de données',
    number: 7,
    duration: '1 h 45',
    description: 'Résolution des erreurs ECONNREFUSED, ER_ACCESS_DENIED, ETIMEDOUT, gestion du pool de connexions mysql2, détection de fuites de connexions et health checks.',
  },
  {
    slug: 'chapitre-8',
    title: '5.8 Identifier les vulnérabilités liées aux erreurs de programmation',
    number: 8,
    duration: '2 h 00',
    description: 'Référentiel OWASP Top 10, failles IDOR/BOLA, validation stricte avec Zod, sécurité des sessions JWT, prévention XSS, CSRF et SSRF.',
  },
  {
    slug: 'chapitre-9',
    title: '5.9 Détecter les problèmes d\'injection SQL',
    number: 9,
    duration: '1 h 45',
    description: 'Mécanisme des injections SQL par concaténation, sécurisation systématique via requêtes préparées (Prepared Statements) et listes blanches pour tris dynamiques.',
  },
  {
    slug: 'chapitre-10',
    title: '5.10 Diagnostiquer les problèmes de permissions et d\'accès aux fichiers',
    number: 10,
    duration: '1 h 30',
    description: 'Permissions Windows (ACL) et Linux (chmod/chown), codes d\'erreur EACCES/ENOENT/EPERM, prévention du Path Traversal et streaming de fichiers.',
  },
  {
    slug: 'chapitre-11',
    title: '5.11 Analyser les logs de sécurité',
    number: 11,
    duration: '1 h 45',
    description: 'Journalisation structurée JSON avec Winston, détection des attaques par force brute, corrélation d\'événements, rotation des logs et masquage des secrets.',
  },
  {
    slug: 'chapitre-12',
    title: '5.12 Mettre en place une stratégie de surveillance et de prévention',
    number: 12,
    duration: '2 h 00',
    description: 'Trois piliers de l\'observabilité (Metrics, Logs, Traces), Prometheus prom-client, Grafana, endpoints Liveness/Readiness, Rate Limiting et Helmet.',
  },
  {
    slug: 'chapitre-13',
    title: '5.13 TP Final — Audit et diagnostic d\'une application e-commerce (ShopDebug)',
    number: 13,
    duration: '3 h 30',
    description: 'Projet d\'audit complet : investigation de fuite mémoire, déblocage Event Loop, optimisation SQL, correction de race condition, IDOR, injection SQL et monitoring.',
  },
];
