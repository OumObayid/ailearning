export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_8_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Comprendre pourquoi le travail des agents doit être vérifié",
    duration: '50 min',
    description: "Analyser les pièges fréquents du code généré par IA : pseudo-solutions fragiles, régressions invisibles et hallucinations de bibliothèques.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Définir le rôle de l'agent QA",
    duration: '55 min',
    description: "Établir la posture de l'ingénieur QA IA : esprit critique, recherche active des cas aux limites et automatisation des suites de tests.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Définir le rôle de l'agent Reviewer",
    duration: '55 min',
    description: "Spécifier la mission du Reviewer : relecture de code, respect des conventions du projet, lisibilité et sécurité des implémentations.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Vérifier le code produit par les agents",
    duration: '1 h',
    description: "Appliquer une grille d'audit de code rigoureuse : typage strict TypeScript, gestion exhaustive des erreurs et modularité.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Comprendre et exécuter les tests unitaires",
    duration: '1 h',
    description: "Piloter la génération et l'exécution de tests unitaires avec Vitest/Jest pour valider chaque fonction de manière isolée.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Comprendre et exécuter les tests d'intégration",
    duration: '1 h 10',
    description: "Valider les flux interconnectés entre composants, middleware et base de données pour garantir le fonctionnement d'ensemble.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Vérifier le fonctionnement des API",
    duration: '1 h',
    description: "Tester systématiquement les endpoints REST : codes de réponse HTTP, validation des schémas JSON et scénarios d'erreur 4xx/5xx.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Identifier les erreurs et demander des corrections",
    duration: '1 h',
    description: "Rédiger des feedbacks actionnables pour renvoyer l'agent développeur en correction sans régression.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: "Valider les livrables avant leur intégration",
    duration: '50 min',
    description: "Délivrer le sceau de qualité : checklist finale de validation avant toute fusion sur la branche d'intégration.",
  },
  {
    slug: 'tp',
    number: 10,
    title: "TP de fin de module : Audit qualité et validation de livrables",
    duration: '1 h 30',
    description: "Contrôler les livrables d'une équipe d'agents, exécuter les tests automatisés et organiser la boucle de correction guidée.",
  },
];

