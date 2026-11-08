export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const PROMPT_ENGINEERING_MODULE_3_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Zero-shot Prompting',
    duration: '2 h',
    description: "Obtenir une réponse pertinente d'un modèle IA sans lui fournir d'exemple préalable : anatomie, formulation professionnelle et limites.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Few-shot Prompting',
    duration: '2 h',
    description: "Guider l'IA à l'aide d'exemples de démonstration pour imposer un format JSON strict, une logique métier ou un style rédactionnel.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Chain of Thought et raisonnement structuré',
    duration: '2 h 30',
    description: "Décomposer les problèmes complexes en étapes intermédiaires, justifier les constats par des preuves observables et éviter les oublis.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Prompt Decomposition',
    duration: '2 h 30',
    description: "Découper une grande mission en sous-tâches (séquentielles, parallèles, hiérarchiques, conditionnelles) et gérer les dépendances.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Role Prompting',
    duration: '2 h',
    description: "Attribuer un profil professionnel ciblé (développeur, auditeur, testeur) en 6 composantes sans confondre rôle et autorisations d'action.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: 'Contextual Prompting',
    duration: '2 h',
    description: "Structurer les 8 composantes du contexte (technique, fonctionnel, données, contraintes) et gérer les informations manquantes ou obsolètes.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: 'Structured Prompting',
    duration: '2 h 30',
    description: "Imposer des formats de sortie stricts (JSON, Markdown, tableaux), valider les schémas avec Zod et organiser les entrées avec des balises.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: 'Meta-Prompting',
    duration: '2 h 30',
    description: "Utiliser l'IA pour concevoir, analyser, tester et optimiser les instructions destinées à d'autres agents dans l'IDE ou dans une API Node.js.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: 'Self-critique et vérification',
    duration: '2 h 30',
    description: "Mettre en œuvre les 5 mécanismes de contrôle (cohérence, factuel, contraintes, complétude, incertitudes) et la grille d'auto-évaluation sur 100 points.",
  },
  {
    slug: 'chapitre-10',
    number: 10,
    title: 'Prompt Chaining',
    duration: '3 h',
    description: "Orchestrer l'enchaînement de plusieurs prompts avec transmission des résultats intermédiaires, points d'arrêt et implémentation Express/Gemini.",
  },
  {
    slug: 'chapitre-11',
    number: 11,
    title: 'Gestion des erreurs et des incertitudes',
    duration: '2 h 30',
    description: "Détecter les informations manquantes, arbitrer les contradictions, interdire les réponses inventées et concevoir une stratégie de retry robuste.",
  },
  {
    slug: 'chapitre-12',
    number: 12,
    title: "Projet intégrateur — Agent IA professionnel dans Google Antigravity",
    duration: '4 h',
    description: "Application des 11 techniques : cahier des charges, architecture en 5 fonctions, chaîne de 6 prompts, 7 tests de résistance et grille d'homologation sur 100 points.",
  },
];

