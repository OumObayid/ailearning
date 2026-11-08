export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const PROMPT_ENGINEERING_MODULE_7_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Identifier les causes d'un mauvais résultat",
    duration: '2 h 30',
    description: "Analyser les erreurs d'un agent IA : les 7 causes majeures (instructions floues, contradictions, contexte insuffisant ou saturé, redondances, hallucinations, outils mal employés), méthode de diagnostic en 6 étapes et fiche d'incident.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Déboguer un prompt',
    duration: '2 h 30',
    description: "Méthodologie rigoureuse de débogage : examiner rôle, mission, contexte, contraintes et livrable, isoler l'instruction fautive, tester une variation à la fois, et construire un tableau de suivi des versions (changelog d'agent).",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Réduire les ambiguïtés',
    duration: '2 h 30',
    description: "Désamorcer les interprétations multiples : les 5 types d'ambiguïtés, traquer les mots subjectifs ('améliorer', 'nécessaire', 'complet'), méthode de clarification en 4 points et blocs de détection des ambiguïtés.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Améliorer la gestion du contexte',
    duration: '2 h 30',
    description: "Structurer les 5 flux de contexte (permanent, mission, technique, historique, outils), maîtriser la fenêtre de tokens, déployer une Fiche de Contexte standardisée et distinguer formellement Contexte, Mémoire et RAG.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Éviter les instructions redondantes',
    duration: '2 h',
    description: "Éliminer l'encombrement sans sacrifier la sécurité : différencier répétition stérile et rappel stratégique, 5 techniques de factorisation thématique, organisation en 8 sections et mesure du ratio de concision.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: 'Détecter les hallucinations',
    duration: '3 h',
    description: "Traquer les inventions plausibles dans le code : distinguer fait, erreur, hypothèse et hallucination, 4 techniques de vérification, hiérarchie des preuves à 6 niveaux, bloc d'immunisation et TP d'audit de faux rapport.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Construire des critères d'évaluation",
    duration: '3 h 30',
    description: "Transformer des exigences qualitatives en critères mesurables : grille d'évaluation sur 100 points, distinction fautes critiques vs mineures, comparaison A/B, ateliers pratiques TP 1 à 4 et TP final intégré.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: 'Mesurer la conformité des résultats',
    duration: '2 h 30',
    description: "Conformité fonctionnelle, technique, comportementale et sécuritaire : bâtir une matrice de conformité C01-C06, calculer le taux pondéré, évaluer les actions terminal/fichiers distinctement des réponses et auditer un cas réel.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: 'Gérer les tâches longues',
    duration: '3 h',
    description: "Piloter des missions multi-étapes sans dérive : Task Decomposition, points de contrôle (Checkpoints), statuts d'avancement, résumés intermédiaires d'état, gestion des dépendances et définition d'achèvement (Definition of Done).",
  },
  {
    slug: 'chapitre-10',
    number: 10,
    title: 'Optimiser les instructions principales',
    duration: '3 h 30',
    description: "Architecture de référence en 8 sections d'un persona d'agent professionnel, hiérarchie de résolution des contradictions, cycle d'optimisation v1/v2, modèle universel complet et TP d'homologation sur 100 points.",
  },
];

