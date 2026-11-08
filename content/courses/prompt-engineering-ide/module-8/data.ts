export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const PROMPT_ENGINEERING_MODULE_8_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Définir le projet final et son cahier des charges',
    duration: '2 h 30',
    description: "Cadrage exhaustif du projet de synthèse : application de gestion de projets React + Node.js + Express + MySQL, cartographie des 5 modules fonctionnels, architecture technique et rédaction du Cahier des Charges officiel régissant l'équipe d'agents.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Concevoir l'architecture globale du système multi-agents",
    duration: '3 h',
    description: "Structurer la collaboration des 5 agents sous gouvernance humaine : rôle pivot du coordinateur, messages de délégation formels, gestion des dépendances logiques, arbitrage des conflits d'intervention et suivi des 6 statuts de mission.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Créer les instructions principales de l'agent coordinateur",
    duration: '3 h',
    description: "Rédiger le persona de pilotage en 12 dimensions du coordinateur : décomposition fonctionnelle, attribution aux spécialistes (DEV, SEC, TEST, DOC), contrôle des preuves, arrêt pour validation humaine (HITL) et synthèse globale.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Créer les quatre agents spécialisés',
    duration: '3 h 30',
    description: "Concevoir les instructions maîtresses complètes des 4 experts : Développeur (React/Express), Sécurité (audit & risques), Testeur (scénarios & preuves), et Documentaliste (sources vérifiées), avec délimitation étanche des périmètres.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Définir les règles de communication et de délégation',
    duration: '3 h',
    description: "Standardiser le protocole d'échange : canevas de mission à 11 paramètres, format de compte-rendu obligatoire, distinction des statuts (préparée vs transmise vs validée) et gestion des arbitrages techniques.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: 'Mettre en place la politique de sécurité et les permissions',
    duration: '3 h',
    description: "Sécurisation intégrale de l'équipe : matrice des autorisations par rôle, sanctuarisation de .env et des clés API, filtrage des commandes terminal, immunisation anti-prompt injection et journal d'audit sans fuite de secrets.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: 'Organiser le cycle de développement React + Node.js',
    duration: '3 h 30',
    description: "Mettre en œuvre les 6 phases du cycle logiciel avec l'escouade : cadrage, proposition technique, audit sécurité, scénarios de test, développement autorisé sous contrôle humain et recette finale sans modifications simultanées.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: 'Construire les prompts professionnels réutilisables',
    duration: '2 h 30',
    description: "Bâtir la bibliothèque modulaire de prompts en 8 sections pour chaque agent : variables paramétrables, modèle commun de mission, règles de concision, gestion des incertitudes et cycle de versionnage d'instructions.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: 'Tester, évaluer et corriger le système multi-agents',
    duration: '3 h 30',
    description: "Protocole d'homologation sur 3 niveaux : tests unitaires d'agents, tests de collaboration et épreuves de stress de sécurité (5 scénarios critiques), grille d'évaluation sur 100 points et procès-verbal de validation humaine.",
  },
  {
    slug: 'chapitre-10',
    number: 10,
    title: 'Réaliser la démonstration finale dans Antigravity',
    duration: '4 h',
    description: "Projet d'aboutissement du cursus complet : exécuter la démonstration intégrale de bout en bout du développement d'une fonctionnalité complète avec les 5 agents sous Google Antigravity, audit final et remise des livrables.",
  },
];

