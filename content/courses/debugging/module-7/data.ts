export interface ChapterMeta {
  slug: string;
  title: string;
  number: number;
  duration: string;
  description: string;
}

export const DEBUGGING_MODULE_7_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    title: '7.1 Inspection de l\'architecture du projet',
    number: 1,
    duration: '2 h 00',
    description: 'Cartographie globale de l\'application : React, Express, MySQL, JWT, Multer et Gemini API, flux de communication et points d\'entrée.',
  },
  {
    slug: 'chapitre-2',
    title: '7.2 Identification des dysfonctionnements',
    number: 2,
    duration: '2 h 00',
    description: 'Typologie des anomalies (fonctionnelles, techniques, sécurité, performances), inventaire documenté, matrice de gravité et priorités (P1 à P4).',
  },
  {
    slug: 'chapitre-3',
    title: '7.3 Reproduction des bugs',
    number: 3,
    duration: '1 h 45',
    description: 'Méthodologie de reproduction en conditions contrôlées : préconditions, requêtes Postman, DevTools, distinction bugs systématiques vs intermittents.',
  },
  {
    slug: 'chapitre-4',
    title: '7.4 Collecte et analyse des logs',
    number: 4,
    duration: '2 h 00',
    description: 'Journalisation structurée JSON avec Pino, Request/Correlation ID, Slow Query Log MySQL, Stack Traces et masquage des secrets.',
  },
  {
    slug: 'chapitre-5',
    title: '7.5 Diagnostic des causes racines',
    number: 5,
    duration: '2 h 15',
    description: 'Analyse RCA approfondie : décomposition symptôme/cause immédiate/cause racine, méthode des 5 Pourquoi et élimination des patchs superficiels.',
  },
  {
    slug: 'chapitre-6',
    title: '7.6 Élaboration d\'un plan de correction',
    number: 6,
    duration: '2 h 00',
    description: 'Fiches de remédiation, périmètre de fichiers autorisés, analyse d\'impact, dépendances entre correctifs et validation humaine préalable.',
  },
  {
    slug: 'chapitre-7',
    title: '7.7 Correction progressive des anomalies',
    number: 7,
    duration: '2 h 30',
    description: 'Application méthodique des patchs ciblés dans une branche Git dédiée, encadrement de l\'agent IA et examen systématique du git diff.',
  },
  {
    slug: 'chapitre-8',
    title: '7.8 Tests unitaires et tests d\'intégration',
    number: 8,
    duration: '2 h 30',
    description: 'Automatisation des tests avec Vitest et Supertest : cas nominaux, limites et erreurs, simulation (mock) du service Gemini et base de test MySQL.',
  },
  {
    slug: 'chapitre-9',
    title: '7.9 Vérification de la non-régression',
    number: 9,
    duration: '2 h 00',
    description: 'Matrice de non-régression, vérification de l\'authentification (401) et des autorisations (403), audit des dépendances et contrôle Git.',
  },
  {
    slug: 'chapitre-10',
    title: '7.10 Audit final et rédaction du rapport technique',
    number: 10,
    duration: '3 h 00',
    description: 'Checklist d\'audit de production, mesure de couverture de code (@vitest/coverage-v8), rédaction du rapport technique officiel et statut d\'homologation.',
  },
];
