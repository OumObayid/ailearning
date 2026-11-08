export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const PROMPT_ENGINEERING_MODULE_1_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Prompt, instruction, contexte et commande",
    duration: '1 h 30',
    description: "Comprendre et distinguer les quatre concepts fondamentaux régissant l'interaction avec un agent d'IA.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Anatomie d'un prompt professionnel",
    duration: '2 h',
    description: "Les 7 composants indispensables d'un prompt professionnel pour guider un agent sans ambiguïté.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Rôle, objectif, contraintes et résultats attendus",
    duration: '2 h',
    description: "Définir la posture, mesurer les objectifs, catégoriser les contraintes et spécifier les livrables attendus.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Tokens et fenêtre de contexte",
    duration: '2 h',
    description: "Comprendre le découpage en tokens, les limites de la fenêtre de contexte, l'amnésie des agents et l'optimisation des prompts.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Instructions positives et négatives",
    duration: '1 h 30',
    description: "Combiner actions autorisées et interdictions strictes, transformer des consignes vagues et sécuriser l'IDE.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Gestion des ambiguïtés",
    duration: '2 h',
    description: "Détecter les ambiguïtés sur l'objectif, le périmètre, les verbes et les autorisations, et instruire l'agent à clarifier avant d'agir.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Gestion des contradictions",
    duration: '2 h',
    description: "Identifier les conflits directs et indirects, hiérarchiser les instructions en 4 niveaux et résoudre les contradictions.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Instructions permanentes et ponctuelles",
    duration: '2 h',
    description: "Architecture en 8 parties des règles permanentes, séparation des missions ponctuelles et configuration dans l'IDE Antigravity.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: "Demander une réponse ou demander une action",
    duration: '2 h 30',
    description: "Les 4 niveaux d'intervention (Expliquer, Analyser, Proposer, Exécuter), le workflow human-in-the-loop et la synthèse du Module 1.",
  },
];

