export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_10_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Présenter le projet TaskFlow et définir son périmètre",
    duration: '45 min',
    description: "Découvrir les fonctionnalités clés de l'application de gestion de tâches TaskFlow et cadrer les jalons de réalisation.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Préparer les spécifications fonctionnelles",
    duration: '50 min',
    description: "Formaliser les user stories, règles de gestion des statuts de tâches et exigences d'expérience utilisateur.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Définir l'architecture technique",
    duration: '1 h',
    description: "Choisir la stack : Frontend React/Vite/Tailwind, Backend Node/Express/TypeScript, persistance et contrats d'API partagés.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Créer la structure du projet",
    duration: '45 min',
    description: "Initialiser l'arborescence monorepo/polyrepo claire et structurée prête pour l'intervention de l'équipe d'agents.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Installer et configurer les dépendances",
    duration: '45 min',
    description: "Configurer TypeScript, les linters, packages npm essentiels et scripts de build avec validation humaine stricte.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Initialiser le dépôt Git et organiser les branches",
    duration: '50 min',
    description: "Initialiser le dépôt Git, configurer le `.gitignore` exhaustif et définir l'arborescence des branches (`main`, `dev`, `features/*`).",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Créer et organiser les Git Worktrees",
    duration: '1 h',
    description: "Créer les répertoires physiques isolés pour l'agent backend (`wt-backend`) et l'agent frontend (`wt-frontend`).",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Configurer les agents et leurs instructions",
    duration: '1 h',
    description: "Rédiger le fichier `AGENTS.md` du projet TaskFlow et paramétrer les consignes des profils Backend, Frontend, QA et Reviewer.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: "Préparer et distribuer les premières missions",
    duration: '55 min',
    description: "Rédiger et transmettre les prompts de lancement aux agents avec critères d'acceptation et formats de sortie imposés.",
  },
  {
    slug: 'chapitre-10',
    number: 10,
    title: "Développer le backend avec les agents",
    duration: '1 h 30',
    description: "Piloter l'agent backend dans son Worktree pour implémenter les modèles de données, le service et les contrôleurs Express.",
  },
  {
    slug: 'chapitre-11',
    number: 11,
    title: "Développer le frontend avec les agents",
    duration: '1 h 30',
    description: "Piloter l'agent frontend dans son Worktree pour concevoir les composants React, formulaires et interactions réactives.",
  },
  {
    slug: 'chapitre-12',
    number: 12,
    title: "Mettre en place les tests avec l'agent QA",
    duration: '1 h 15',
    description: "Déléguer à l'agent QA l'écriture d'une suite complète de tests unitaires et de validation d'API avec Vitest.",
  },
  {
    slug: 'chapitre-13',
    number: 13,
    title: "Coordonner les agents et suivre leurs travaux",
    duration: '1 h',
    description: "Superviser les échanges croisés, synchroniser les modifications d'interface et sécuriser les points d'étape.",
  },
  {
    slug: 'chapitre-14',
    number: 14,
    title: "Vérifier et corriger les livrables",
    duration: '1 h 10',
    description: "Passer en revue les propositions de modifications avec l'agent Reviewer et déclencher les correctifs nécessaires.",
  },
  {
    slug: 'chapitre-15',
    number: 15,
    title: "Intégrer progressivement les développements",
    duration: '1 h 20',
    description: "Fusionner méthodiquement les branches backend puis frontend sur la branche principale après feu vert du Project Manager.",
  },
  {
    slug: 'chapitre-16',
    number: 16,
    title: "Effectuer les tests globaux",
    duration: '1 h',
    description: "Valider le bon fonctionnement de bout en bout de TaskFlow sur l'application assemblée et compilée.",
  },
  {
    slug: 'chapitre-17',
    number: 17,
    title: "Corriger les problèmes et finaliser l'application",
    duration: '1 h',
    description: "Traiter les dernières anomalies d'intégration, peaufiner l'UI et optimiser le temps de réponse global.",
  },
  {
    slug: 'chapitre-18',
    number: 18,
    title: "Valider et livrer la version finale de TaskFlow",
    duration: '50 min',
    description: "Poser le tag de release Git v1.0.0, nettoyer les Worktrees temporaires et formaliser le livrable final du projet.",
  },
  {
    slug: 'chapitre-19',
    number: 19,
    title: "Faire le bilan de l'orchestration et des apprentissages",
    duration: '45 min',
    description: "Tirer les enseignements majeurs de l'orchestration multi-agents et formaliser vos réflexes de Project Manager IA professionnel.",
  },
];

