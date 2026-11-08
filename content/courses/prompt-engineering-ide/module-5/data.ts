export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const PROMPT_ENGINEERING_MODULE_5_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Comprendre le principe des agents IA spécialisés',
    duration: '2 h',
    description: "Pourquoi séparer les rôles plutôt que d'utiliser un agent généraliste : présentation des 6 agents (Architecte, Développeur, Auditeur, Sécurité, Testeur, Documentaliste) et règles de responsabilité.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Concevoir les instructions principales de chaque agent spécialisé',
    duration: '2 h 30',
    description: "Structure en 6 piliers (Identité, Mission, Responsabilités, Limites, Autorisations/Outils, Format de sortie) et fiches d'instructions complètes pour chaque profil.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Définir les responsabilités et éviter les chevauchements entre agents',
    duration: '2 h 30',
    description: "Matrice RACI des responsabilités, gestion des désaccords techniques, et prompt universel de non-chevauchement des compétences.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Organiser la collaboration et la communication entre agents IA',
    duration: '2 h 30',
    description: "Modèles de collaboration (séquentiel, parallèle, coordonné), fiches de transmission structurées (Context Handoff) et gestion des points de passage.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Créer et configurer concrètement des agents spécialisés dans Google Antigravity',
    duration: '3 h',
    description: "Configuration Markdown et métadonnées YAML dans .agents/agents/, association des outils appropriés, permissions et vérification d'activation dans l'IDE.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: 'Tester, évaluer et améliorer les agents spécialisés',
    duration: '2 h 30',
    description: "Grille d'évaluation sur 25 points, tests aux limites (Boundary Testing), tests de résistance aux injections et cycle d'amélioration continue.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: 'Orchestration avancée : construire une équipe d’agents IA',
    duration: '3 h',
    description: "Rôle de l'agent orchestrateur, décomposition des missions, routage intelligent des tâches, gestion des conflits et portes de validation humaine (Human Approval Gates).",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: 'Projet pratique : construire et coordonner une équipe de six agents spécialisés dans Google Antigravity',
    duration: '4 h',
    description: "Projet de synthèse intégral : ajouter une fonctionnalité de recherche dans un portfolio React en coordonnant les 6 agents spécialisés avec grille d'homologation sur 25 points.",
  },
];

