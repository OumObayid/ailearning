export interface ChapterMeta {
  slug: string;
  title: string;
  number: number;
  duration: string;
  description: string;
}

export const DEBUGGING_MODULE_4_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    title: '4.1 Comprendre le fonctionnement des requêtes HTTP',
    number: 1,
    duration: '1 h 30',
    description: 'Trajet d\'une communication HTTP (React → Express → MySQL), anatomie des requêtes et réponses, méthodes GET/POST/PUT/PATCH/DELETE et diagnostic réseau.',
  },
  {
    slug: 'chapitre-2',
    title: '4.2 Diagnostic des codes de statut HTTP : 400, 401, 403, 404, 405, 422, 429 et 500',
    number: 2,
    duration: '2 h 00',
    description: 'Typologie des statuts HTTP, distinction client vs serveur, détection des 401 vs 403, limitation de débit 429 (rate-limit) et gestion des erreurs 500.',
  },
  {
    slug: 'chapitre-3',
    title: '4.3 Débogage des API REST',
    number: 3,
    duration: '1 h 45',
    description: 'Parcours d\'une requête REST (route, middleware, contrôleur, service), conversion des paramètres d\'URL, Query strings et détection des erreurs logiques.',
  },
  {
    slug: 'chapitre-4',
    title: '4.4 Analyse des requêtes et réponses JSON',
    number: 4,
    duration: '1 h 30',
    description: 'Structure JSON stricte, résolution de req.body undefined avec express.json(), cohérence des types et validation défensive des payloads.',
  },
  {
    slug: 'chapitre-5',
    title: '4.5 Débogage des routes Express.js',
    number: 5,
    duration: '1 h 45',
    description: 'Conflits d\'ordre entre routes spécifiques et dynamiques, modularisation avec express.Router(), pièges de double préfixe et traçage d\'URL.',
  },
  {
    slug: 'chapitre-6',
    title: '4.6 Diagnostic des erreurs Middleware',
    number: 6,
    duration: '1 h 45',
    description: 'Chaîne des middlewares (req, res, next), oublis de next() provoquant des timeouts, headers already sent, et propagation d\'erreurs asynchrones.',
  },
  {
    slug: 'chapitre-7',
    title: '4.7 Analyse des problèmes CORS',
    number: 7,
    duration: '2 h 00',
    description: 'Mécanisme Same-Origin, requêtes Preflight OPTIONS, configuration du package cors, gestion des credentials/cookies et décodage des erreurs DevTools.',
  },
  {
    slug: 'chapitre-8',
    title: '4.8 Diagnostic des erreurs d\'authentification et d\'autorisation',
    number: 8,
    duration: '2 h 00',
    description: 'Authentification (401) vs Autorisation (403), anatomie et signature JWT, jwt.verify() vs jwt.decode(), expiration et contrôle de rôles (RBAC).',
  },
  {
    slug: 'chapitre-9',
    title: '4.9 Débogage des connexions MySQL',
    number: 9,
    duration: '2 h 00',
    description: 'Pilote mysql2/promise, erreurs ECONNREFUSED et ER_ACCESS_DENIED, dimensionnement du pool de connexions, libération de ressources et phpMyAdmin.',
  },
  {
    slug: 'chapitre-10',
    title: '4.10 Analyse des requêtes SQL et des erreurs de base de données',
    number: 10,
    duration: '2 h 15',
    description: 'Diagnostic des codes MySQL (ER_NO_SUCH_TABLE, ER_DUP_ENTRY), contraintes et clés étrangères, requêtes préparées anti-injections et analyse EXPLAIN.',
  },
  {
    slug: 'chapitre-11',
    title: '4.11 Utilisation de Postman pour isoler les problèmes',
    number: 11,
    duration: '1 h 45',
    description: 'Isolation du backend sans frontend, configuration de Bearer tokens, environnements et variables {{baseUrl}}, scripts de tests automatisés pm.test.',
  },
  {
    slug: 'chapitre-12',
    title: '4.12 Gestion et centralisation des logs Backend',
    number: 12,
    duration: '1 h 45',
    description: 'Logs structurés JSON avec Winston et Pino, middleware global d\'erreurs Express, traçabilité des flux via Request ID UUID et règles de sécurité RGPD.',
  },
  {
    slug: 'chapitre-13',
    title: 'TP Final : Diagnostic complet d\'une API Express connectée à MySQL',
    number: 13,
    duration: '3 h 00',
    description: 'Atelier intégrateur : audit et correction des 8 défauts du projet TaskFlow (CORS, JWT, SQL, Request ID, Winston, Express, tests Postman).',
  },
];

