export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const PROMPT_ENGINEERING_MODULE_2_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Qu'est-ce qu'une instruction principale ?",
    duration: '1 h 30',
    description: "Comprendre le cadre permanent de travail d'un agent IA, la différence avec un prompt ponctuel et les 4 fonctions fondamentales.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Instructions globales et instructions propres au projet",
    duration: '2 h',
    description: "Séparer le comportement général commun du contexte technologique spécifique (React, Node.js, PHP) pour éviter les incohérences.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Définition du rôle et de l'identité fonctionnelle",
    duration: '2 h',
    description: "Attribuer un profil professionnel ciblé en 6 composantes (spécialité, compétences, posture) sans confondre rôle et autorisations.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Définition des responsabilités",
    duration: '2 h',
    description: "Distinguer les 5 catégories de responsabilités (analyse, conception, production, vérification, compte rendu) et définir des livrables vérifiables.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Définition des limites d'intervention",
    duration: '2 h',
    description: "Délimiter les frontières : actions autorisées, conditionnelles et interdites, principe du moindre privilège et procédures d'arrêt.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Gestion des fichiers autorisés et interdits",
    duration: '2 h',
    description: "Définir le périmètre géographique du projet, sanctuariser les fichiers sensibles (.env) et encadrer l'analyse des documents fournis manuellement.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Règles de communication avec l'utilisateur",
    duration: '2 h',
    description: "Les 5 moments de communication et les 10 règles professionnelles : transparence, signalement des blocages et interdiction d'inventer des résultats.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Conditions d'autorisation avant exécution",
    duration: '2 h',
    description: "Mettre en place un protocole d'approbation préalable pour toute modification de fichier, commande terminale sensible ou service externe.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: "Format des réponses et des rapports",
    duration: '2 h',
    description: "Imposer une structure homogène selon le type de mission, qualifier la criticité des anomalies et distinguer les faits vérifiés des hypothèses.",
  },
  {
    slug: 'chapitre-10',
    number: 10,
    title: "Gestion des exceptions et des situations imprévues",
    duration: '2 h 30',
    description: "Procédure de réaction face aux erreurs système, indisponibilités d'API, contradictions et défense contre les prompt injections.",
  },
  {
    slug: 'chapitre-11',
    number: 11,
    title: "TP 2.1 — Conception des instructions principales (Agent Analyste)",
    duration: '3 h',
    description: "Projet fil rouge Phase 1 : rédaction du document de référence en 12 sections pour l'Agent Analyste Documentaire.",
  },
  {
    slug: 'chapitre-12',
    number: 12,
    title: "TP 2.2 — Création et configuration dans Antigravity",
    duration: '2 h',
    description: "Projet fil rouge Phase 2 : enregistrement persistant des règles, calibration des permissions et test de conformité initial.",
  },
  {
    slug: 'chapitre-13',
    number: 13,
    title: "TP 2.3 — Tests de résistance et de sécurité (10 scénarios)",
    duration: '3 h',
    description: "Projet fil rouge Phase 3 : mise à l'épreuve de l'agent face aux prompt injections, explorations interdites, contradictions et fausses autorisations.",
  },
  {
    slug: 'chapitre-14',
    number: 14,
    title: "TP 2.4 — Audit final, gestion des risques et validation",
    duration: '2 h 30',
    description: "Projet fil rouge Phase 4 : audit méthodique sur 16 critères, évaluation des risques résiduels et décision formelle de validation.",
  },
];

