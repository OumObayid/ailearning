export interface BackendIaChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const BACKEND_IA_MODULE_4_CHAPTERS: BackendIaChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Fonctionnement des index SQL et structures B+Tree',
    duration: '2 h à 2 h 30',
    description: 'Comprendre les index B+Tree InnoDB, le Full Table Scan, le Clustered Index et l’analyse comparative d’exécution sur 100 000 conversations IA.',
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Index simples, uniques et composites (Règle du préfixe gauche)',
    duration: '2 h 30',
    description: 'Maîtriser les contraintes UNIQUE, l’ordonnancement des colonnes composites et la règle du préfixe gauche (Leftmost Prefix Rule).',
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Analyse des requêtes avec EXPLAIN et EXPLAIN ANALYZE',
    duration: '2 h 30 à 3 h',
    description: 'Décortiquer les métriques de plan d’exécution (type, key, rows, Extra, Using filesort), mesurer le temps réel et diagnostiquer les endpoints Node.js.',
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Optimisation des recherches, LIKE et pagination par curseur',
    duration: '2 h 30 à 3 h',
    description: 'Identifier l’effondrement de performance de LIMIT/OFFSET sur grand volume, implémenter la Cursor Pagination (Curseur) et concevoir l’API Express/React.',
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Gestion des connexions, pool de connexions et transactions SQL',
    duration: '3 h',
    description: 'Dimensionner un pool de connexions avec mysql2, sécuriser les transactions atomiques (commit/rollback) et découpler la rétention SQL de l’appel Gemini.',
  },
];

