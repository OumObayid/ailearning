export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_2_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Comprendre le principe d'une équipe d'agents IA",
    duration: '50 min',
    description: "Modéliser le passage de l'agent solo à une organisation multi-agents coordonnée au sein d'un même projet logiciel.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Définir le rôle du Project Manager humain",
    duration: '1 h',
    description: "Clarifier le leadership humain : prise de décision stratégique, arbitrage des choix d'architecture et validation finale des livrables.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Définir le rôle du Team Leader IA",
    duration: '1 h',
    description: "Concevoir le profil du chef d'équipe IA : distribution opérationnelle des sous-tâches, consolidation des rapports et détection des blocages.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Définir le rôle des agents spécialisés",
    duration: '1 h',
    description: "Spécifier les profils d'experts dédiés : Backend Developer, Frontend Developer, Test/QA Engineer et Code Reviewer.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Organiser les responsabilités et les limites de chaque agent",
    duration: '1 h 15',
    description: "Fixer les périmètres stricts de chaque rôle pour éviter les chevauchements de code, les réécritures non concertées et la dilution des responsabilités.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Organiser les échanges entre les agents",
    duration: '1 h',
    description: "Structurer les canaux de communication inter-agents : transmission de résumés, protocoles d'alerte et passage d'artefacts.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Définir les règles de coordination et de validation",
    duration: '1 h',
    description: "Établir les critères d'acceptation, les barrières de relecture obligatoire et les jalons de validation humaine indispensables.",
  },
  {
    slug: 'tp',
    number: 8,
    title: "TP de fin de module : Conception d'une charte d'équipe multi-agents",
    duration: '1 h 30',
    description: "Concevoir l'organisation complète d'une équipe composée d'un Project Manager, d'un Team Leader et de plusieurs agents spécialisés.",
  },
];

