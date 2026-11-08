export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const DEBUGGING_MODULE_2_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Présentation des outils de débogage',
    duration: '1 h 30',
    description: 'Identifier les grands outils professionnels : DevTools, VS Code, Postman, MySQL Workbench, et comprendre où intervenir dans l\'architecture.',
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Maîtriser les outils Chrome DevTools',
    duration: '2 h',
    description: 'Explorer les 8 panneaux essentiels : Elements, Console, Sources, Network, Application, Performance, Memory et Security.',
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Utilisation de la console JavaScript',
    duration: '1 h 45',
    description: 'Exploiter l\'environnement interactif : types de messages, inspection d\'objets, console.dir, count, time, trace et filtres de recherche.',
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Comprendre les erreurs et les Stack Traces",
    duration: '2 h',
    description: 'Déchiffrer la trace de pile d\'appels, distinguer le lieu de survenue de la cause racine et diagnostiquer les erreurs asynchrones.',
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Utilisation de console.log, error et table',
    duration: '1 h 45',
    description: 'Pratiques de journalisation professionnelle : messages structurés, tableaux console.table, groupes hiérarchiques et journalisation backend Node.js.',
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: 'Débogage avec les Breakpoints',
    duration: '2 h 15',
    description: 'Suspendre l\'exécution avec précision : points d\'arrêt sur ligne, breakpoints conditionnels, logpoints et instruction debugger.',
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: 'Inspection des variables et des expressions',
    duration: '2 h',
    description: 'Examiner le scope local, global et closure, configurer des expressions de surveillance Watch et tester des hypothèses en direct.',
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: 'Comprendre la Call Stack (pile d\'appels)',
    duration: '2 h',
    description: 'Principe LIFO de la pile d\'appels, navigation entre stack frames, distinction Call Stack vs Stack Trace et gestion des récursions infinies.',
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: 'Exécution pas à pas : Step Into, Over et Out',
    duration: '2 h',
    description: 'Prendre le contrôle total du flux d\'exécution : entrer dans une fonction, l\'enjamber ou en sortir pour traquer les données défaillantes.',
  },
  {
    slug: 'chapitre-10',
    number: 10,
    title: 'Débogueur de Visual Studio Code',
    duration: '2 h 30',
    description: 'Débogage backend dans VS Code : configuration de launch.json, inspection de requêtes Express avec Postman, attachement de processus.',
  },
  {
    slug: 'chapitre-11',
    number: 11,
    title: 'TP Final : Diagnostic complet DevTools & VS Code',
    duration: '3 h',
    description: 'Cas pratique professionnel complet : application multi-couches e-commerce avec calculs erronés, produit inexistant et gestion d\'erreurs HTTP.',
  },
];

