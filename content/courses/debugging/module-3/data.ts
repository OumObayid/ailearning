export interface ChapterMeta {
  slug: string;
  title: string;
  number: number;
  duration: string;
  description: string;
}

export const DEBUGGING_MODULE_3_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    title: '3.1 Comprendre les erreurs JavaScript',
    number: 1,
    duration: '1 h 45',
    description: 'Typologie complète des erreurs V8 (Syntax, Reference, Type, Range, URI), anatomie de l\'objet Error, Stack Traces et distinction entre lieu et cause racine.',
  },
  {
    slug: 'chapitre-2',
    title: '3.2 Déboguer les erreurs de variables et de types',
    number: 2,
    duration: '2 h 00',
    description: 'Distinguer undefined, null et propriétés absentes, pièges de coercition implicite (+ vs -), égalité stricte, mutation d\'objets par référence et validation d\'API.',
  },
  {
    slug: 'chapitre-3',
    title: '3.3 Identifier les erreurs de portée (Scope)',
    number: 3,
    duration: '1 h 45',
    description: 'Portées globale, fonctionnelle et de bloc, différences var/let/const, démystification du Hoisting et de la TDZ, fuites de closures et masquage (shadowing).',
  },
  {
    slug: 'chapitre-4',
    title: '3.4 Diagnostiquer les erreurs de fonctions et de conditions',
    number: 4,
    duration: '1 h 30',
    description: 'Paramètres vs arguments, retours undefined involontaires, pièges des conditions truthy/falsy, opérateurs logiques et subtilités des fonctions fléchées.',
  },
  {
    slug: 'chapitre-5',
    title: '3.5 Déboguer les Promises',
    number: 5,
    duration: '2 h 00',
    description: 'États d\'une promesse (pending, fulfilled, rejected), transmission des valeurs dans .then(), reprise sur erreur avec .catch(), piège de fetch() et Promise.all vs allSettled.',
  },
  {
    slug: 'chapitre-6',
    title: '3.6 Déboguer async/await',
    number: 6,
    duration: '1 h 45',
    description: 'Comprendre await non bloquant, éviter les oublis critiques de await/return, gestion des exceptions avec try/catch asynchrone et optimisation parallèle.',
  },
  {
    slug: 'chapitre-7',
    title: '3.7 Comprendre les erreurs de synchronisation et d\'exécution asynchrone',
    number: 7,
    duration: '2 h 00',
    description: 'Ordre de terminaison imprévisible, diagnostic des Race Conditions sur ressources partagées, stratégies d\'atomicité SQL et sérialisation par file d\'attente.',
  },
  {
    slug: 'chapitre-8',
    title: '3.8 Gestion des exceptions avec try/catch',
    number: 8,
    duration: '1 h 45',
    description: 'Mécanisme throw et propagation des erreurs dans la pile d\'appels, classes d\'erreurs métier personnalisées (AppError) et middleware centralisé Express.',
  },
  {
    slug: 'chapitre-9',
    title: '3.9 Débogage Node.js avec l\'inspecteur intégré',
    number: 9,
    duration: '2 h 00',
    description: 'Démarrage avec --inspect et --inspect-brk, configuration launch.json dans VS Code, breakpoints conditionnels, navigation pas à pas et débogage d\'API Express.',
  },
  {
    slug: 'chapitre-10',
    title: '3.10 Analyse des logs et des erreurs serveur',
    number: 10,
    duration: '1 h 45',
    description: 'Niveaux de journalisation (ERROR, WARN, INFO, DEBUG), Winston structuré, corrélation par Request ID, décodage des erreurs réseau (ECONNREFUSED, EADDRINUSE) et monitoring PM2.',
  },
  {
    slug: 'chapitre-11',
    title: 'TP Final : Déboguer un serveur Node.js multi-anomalies',
    number: 11,
    duration: '2 h 30',
    description: 'Atelier de synthèse : diagnostic et correction de 5 anomalies critiques (Promise stock, calcul de montant, validation, Race Condition et Winston Request ID).',
  },
];

