export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_6_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Analyser un besoin logiciel",
    duration: '50 min',
    description: "Extraire les exigences techniques et fonctionnelles d'une demande métier pour préparer une implémentation logicielle rigoureuse.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Décomposer un projet en tâches",
    duration: '1 h',
    description: "Appliquer la décomposition fonctionnelle (WBS) en sous-problèmes élémentaires à granularité adaptée à la mémoire d'un agent.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Définir les objectifs et les résultats attendus",
    duration: '55 min',
    description: "Formuler des livrables non ambigus : fichiers cibles à créer/modifier, contrats d'interface et comportements observables attendus.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Identifier les dépendances entre les tâches",
    duration: '1 h',
    description: "Construire un graphe acyclique de dépendances (DAG) pour distinguer les prérequis bloquants des tâches indépendantes.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Déterminer les tâches réalisables en parallèle",
    duration: '50 min',
    description: "Repérer les chantiers découplés (ex: maquettage UI et schéma de base de données) éligibles à un traitement simultané multi-agents.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Attribuer les missions aux agents",
    duration: '50 min',
    description: "Faire correspondre chaque lot de travail au profil d'agent le plus pertinent (Backend, Frontend, QA, Devops).",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Définir les critères d'acceptation",
    duration: '1 h',
    description: "Rédiger des conditions de succès vérifiables automatiquement : tests unitaires au vert, conformité de typage TypeScript et zéros régression.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Rédiger un prompt de mission complet",
    duration: '1 h 15',
    description: "Assembler le prompt parfait de délégation : contexte, contraintes techniques, livrables attendus et protocole de restitution.",
  },
  {
    slug: 'tp',
    number: 9,
    title: "TP de fin de module : Spécification et distribution de missions",
    duration: '1 h 30',
    description: "Décomposer une fonctionnalité logicielle complète en missions modulaires et rédiger l'ensemble des prompts pour l'équipe d'agents.",
  },
];

