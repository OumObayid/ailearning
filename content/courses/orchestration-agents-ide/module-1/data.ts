export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_1_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Découvrir les IDE intégrant des agents IA",
    duration: '45 min',
    description: "Explorer l'évolution des éditeurs vers les environnements pilotés par agents : Google Antigravity, architecture d'exécution et interfaces dédiées.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Comprendre ce qu'est un agent IA",
    duration: '50 min',
    description: "Démystifier les agents logiciels : boucle perception-décision-action, autonomie contrôlée et outillage système dans l'IDE.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Distinguer assistant IA, agent IA et sous-agent",
    duration: '55 min',
    description: "Comparer avec précision l'assistant conversationnel passif, l'agent autonome d'arrière-plan et le sous-agent délégué spécialisé.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Comprendre les conversations et la conservation du contexte",
    duration: '1 h',
    description: "Maîtriser la fenêtre de tokens, l'historique conversationnel, l'élagage d'informations et la persistance d'états d'une session à l'autre.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Découvrir les outils accessibles aux agents",
    duration: '1 h 10',
    description: "Inspecter les capacités des agents : lecture/écriture de fichiers, exécution shell sécurisée, MCP servers et outils de recherche de code.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Comprendre le travail séquentiel et le travail en parallèle",
    duration: '1 h',
    description: "Analyser les modes d'exécution : séquençage avec dépendances strictes versus exécution asynchrone concurrente de plusieurs agents.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Identifier les possibilités et les limites des agents IA",
    duration: '50 min',
    description: "Évaluer objectivement la portée d'action des agents, les risques d'hallucination contextuelle et la nécessité du cadrage humain.",
  },
  {
    slug: 'tp',
    number: 8,
    title: "TP de fin de module : Diagnostic d'un environnement multi-agents",
    duration: '1 h 30',
    description: "Analyser un environnement de travail avec plusieurs agents IA et identifier concrètement les opportunités de collaboration logicielle.",
  },
];

