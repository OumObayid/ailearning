export interface ChapterMeta {
  slug: string;
  title: string;
  number: number;
  duration: string;
  description: string;
}

export const DEBUGGING_MODULE_6_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    title: '6.1 Comprendre le rôle de l\'IA dans le diagnostic logiciel',
    number: 1,
    duration: '1 h 30',
    description: 'Rôle de l\'IA comme assistant de diagnostic, analyse des logs et stack traces, distinction entre hypothèse et cause racine confirmée par des preuves.',
  },
  {
    slug: 'chapitre-2',
    title: '6.2 Différence entre débogage traditionnel et débogage assisté par IA',
    number: 2,
    duration: '1 h 45',
    description: 'Comparaison rigoureuse : breakpoints et DevTools vs agents IA, complémentarité des approches et choix méthodologique selon la complexité du bug.',
  },
  {
    slug: 'chapitre-3',
    title: '6.3 Construire un prompt professionnel de diagnostic',
    number: 3,
    duration: '2 h 00',
    description: 'Les 7 composants indispensables d\'un prompt d\'ingénierie : ROLE, OBJECTIVE, CONTEXT, DATA, TASKS, CONSTRAINTS et OUTPUT FORMAT.',
  },
  {
    slug: 'chapitre-4',
    title: '6.4 Transmettre des logs et des Stack Traces à un modèle IA',
    number: 4,
    duration: '1 h 45',
    description: 'Exploitation des piles d\'appels, analyse des niveaux de logs (DEBUG à FATAL), anonymisation des secrets et construction de prompts d\'erreur.',
  },
  {
    slug: 'chapitre-5',
    title: '6.5 Fournir le contexte technique nécessaire à une analyse fiable',
    number: 5,
    duration: '1 h 45',
    description: 'Les 7 catégories d\'informations critiques : versions, architecture, comportements attendus/observés, code source et historique des commits Git.',
  },
  {
    slug: 'chapitre-6',
    title: '6.6 Faire analyser une erreur sans demander immédiatement sa correction',
    number: 6,
    duration: '1 h 30',
    description: 'Séparation étanche du diagnostic et de la remédiation : formulation d\'hypothèses, recherche de preuves et interdiction stricte de modifier le code.',
  },
  {
    slug: 'chapitre-7',
    title: '6.7 Identifier les causes probables et les causes racines',
    number: 7,
    duration: '2 h 00',
    description: 'Décomposition causale : symptôme vs cause immédiate vs cause racine, méthode des 5 Pourquoi et classement des probabilités techniques.',
  },
  {
    slug: 'chapitre-8',
    title: '6.8 Détecter les hallucinations et les corrections incorrectes proposées par l\'IA',
    number: 8,
    duration: '2 h 00',
    description: 'Identification des méthodes fictives, des faux diagnostics SQL et des patchs superficiels (optional chaining), audit critique avec prompt dédié.',
  },
  {
    slug: 'chapitre-9',
    title: '6.9 Utiliser les agents IA intégrés aux IDE',
    number: 9,
    duration: '2 h 00',
    description: 'Fonctionnement des agents dans Google Antigravity, VS Code, Cursor et Windsurf : boucle de rétroaction, outils de recherche et coordination multi-agents.',
  },
  {
    slug: 'chapitre-10',
    title: '6.10 Définir les instructions principales d\'un agent spécialisé en débogage',
    number: 10,
    duration: '2 h 15',
    description: 'Conception du fichier d\'instructions permanentes : YAML Frontmatter, workflow en 10 étapes, matrice de responsabilités et formats de livrables.',
  },
  {
    slug: 'chapitre-11',
    title: '6.11 Encadrer les permissions de l\'agent : périmètre et sécurité',
    number: 11,
    duration: '2 h 00',
    description: 'Application du principe du moindre privilège : distinction READ/SEARCH/EXECUTE/WRITE/DELETE, protection du fichier .env et contrôle des commandes.',
  },
  {
    slug: 'chapitre-12',
    title: '6.12 Faire corriger un bug par un agent IA et contrôler les modifications',
    number: 12,
    duration: '2 h 00',
    description: 'Validation du plan de correction préalable, autorisation ciblée par fichier, examen minutieux du git diff et acceptation/refus de patchs.',
  },
  {
    slug: 'chapitre-13',
    title: '6.13 Vérifier automatiquement les corrections avec des tests',
    number: 13,
    duration: '2 h 30',
    description: 'Validation par tests automatisés : tests unitaires, d\'intégration (Supertest) et de non-régression (Vitest), cycle Red-Green-Refactor et CI/CD.',
  },
];
