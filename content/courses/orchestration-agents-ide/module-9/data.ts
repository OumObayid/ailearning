export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_9_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Comprendre le processus d'intégration",
    duration: '50 min',
    description: "Appréhender l'intégration continue comme étape critique de consolidation des briques développées en parallèle par les agents.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Préparer l'intégration des branches",
    duration: '55 min',
    description: "Assurer la fraîcheur des branches agents par rapport à la branche principale avant d'initier la fusion.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Organiser les demandes de fusion et les validations",
    duration: '55 min',
    description: "Formaliser les Pull/Merge Requests : description exhaustive, checklist des tests passés et approbation requise du Project Manager.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Résoudre les conflits et vérifier les modifications",
    duration: '1 h 15',
    description: "Arbitrer méthodiquement les conflits Git résultant de modifications concurrentes et préserver la cohérence applicative.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Exécuter les tests après intégration",
    duration: '1 h',
    description: "Lancer la suite globale de tests et le build de production pour intercepter les régressions d'assemblage.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Contrôler les accès et les autorisations",
    duration: '50 min',
    description: "Révoquer ou assainir les tokens d'API, vérifier qu'aucun secret n'a fuité dans l'historique et verrouiller les branches maîtresses.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Identifier les risques liés au travail autonome des agents",
    duration: '55 min',
    description: "Anticiper les dérives silencieuses, les dépendances obsolètes introduites sans audit et les failles de sécurité potentielles.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Préparer la livraison du projet",
    duration: '1 h',
    description: "Structurer la release : tag sémantique Git, changelog automatisé, scripts de déploiement et documentation utilisateur.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: "Évaluer le travail de l'équipe et améliorer son organisation",
    duration: '50 min',
    description: "Conduire la rétrospective d'équipe : ajuster les instructions dans AGENTS.md, optimiser les prompts et réduire les frictions d'orchestration.",
  },
  {
    slug: 'tp',
    number: 10,
    title: "TP de fin de module : Intégration contrôlée et release finale",
    duration: '1 h 30',
    description: "Organiser l'intégration contrôlée de plusieurs branches agents, résoudre les conflits et finaliser la livraison du projet.",
  },
];

