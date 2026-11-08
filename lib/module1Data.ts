export interface ChapterItem {
  slug: string;
  number?: number;
  title: string;
  subsections: string[];
}

export interface PartItem {
  id: string;
  number: string;
  title: string;
  chapters: ChapterItem[];
}

export const MODULE_1_PARTS: PartItem[] = [
  {
    id: 'partie-1',
    number: 'PARTIE I',
    title: "COMPRENDRE L'INTELLIGENCE ARTIFICIELLE GÉNÉRATIVE",
    chapters: [
      {
        slug: 'chapitre-1',
        number: 1,
        title: 'Comprendre les modèles de langage et Google Gemini',
        subsections: [
          "1.1. Qu'est-ce qu'un modèle de langage ?",
          "1.2. Qu'est-ce que Google Gemini ?",
          '1.3. Comprendre les tokens',
          '1.4. Comprendre la fenêtre de contexte',
          '1.5. Comprendre les hallucinations',
          '1.6. Les principales catégories d’utilisation',
          'Travail pratique 1',
        ],
      },
    ],
  },
  {
    id: 'partie-2',
    number: 'PARTIE II',
    title: "PRÉPARER L'ENVIRONNEMENT DE DÉVELOPPEMENT",
    chapters: [
      {
        slug: 'chapitre-2',
        number: 2,
        title: 'Installation et configuration de Gemini avec Node.js et TypeScript',
        subsections: [
          '2.1. Architecture de travail',
          '2.2. Prérequis logiciels',
          '2.3. Création du projet',
          '2.4. Configuration de TypeScript',
          '2.5. Organisation des fichiers',
          '2.6. Configuration de la clé API',
          '2.7. Initialiser le client Gemini',
          '2.8. Premier appel à Gemini',
          '2.9. Créer une première route Express',
          '2.10. Tester avec Postman',
          'Travail pratique 2',
        ],
      },
    ],
  },
  {
    id: 'partie-3',
    number: 'PARTIE III',
    title: 'MAÎTRISER LE PROMPT ENGINEERING',
    chapters: [
      {
        slug: 'chapitre-3',
        number: 3,
        title: 'Concevoir des instructions efficaces pour Gemini',
        subsections: [
          "3.1. Qu'est-ce que le prompt engineering ?",
          '3.2. Prompt simple et prompt structuré',
          '3.3. Les composants d’un prompt professionnel',
          '3.4. Les instructions système',
          '3.5. Paramètres de génération',
          '3.6. Gestion des prompts dans le code',
          '3.7. Travaux pratiques',
        ],
      },
    ],
  },
  {
    id: 'partie-4',
    number: 'PARTIE IV',
    title: 'INTERACTIONS API',
    chapters: [
      {
        slug: 'chapitre-4',
        number: 4,
        title: "Comprendre et utiliser l'Interactions API",
        subsections: [
          "4.1. Qu'est-ce qu'une API ?",
          "4.2. Qu'est-ce que l'Interactions API ?",
          '4.3. Première interaction',
          '4.4. Les propriétés importantes',
          '4.5. Créer une fonction réutilisable',
          '4.6. Comprendre les réponses',
          "4.7. Comprendre l'API historique de génération",
          '4.8. Travaux pratiques',
        ],
      },
    ],
  },
  {
    id: 'partie-5',
    number: 'PARTIE V',
    title: 'CONVERSATIONS ET CONTEXTE',
    chapters: [
      {
        slug: 'chapitre-5',
        number: 5,
        title: 'Gérer les conversations avec Gemini',
        subsections: [
          '5.1. Différence entre une requête et une conversation',
          '5.2. Comprendre previous_interaction_id',
          '5.3. Comprendre la différence entre état et mémoire',
          '5.4. Gérer les conversations dans une application',
          '5.5. Exemple de service conversationnel',
          '5.6. Gestion des limites du contexte',
          '5.7. Travaux pratiques',
        ],
      },
    ],
  },
  {
    id: 'partie-6',
    number: 'PARTIE VI',
    title: 'SORTIES STRUCTURÉES ET ZOD',
    chapters: [
      {
        slug: 'chapitre-6',
        number: 6,
        title: 'Obtenir des réponses structurées',
        subsections: [
          '6.1. Pourquoi les réponses structurées sont-elles importantes ?',
          '6.2. Comprendre le JSON',
          '6.3. Définir un schéma JSON',
          '6.4. Envoyer le schéma à Gemini',
          '6.5. Découvrir Zod',
          '6.6. Valider la réponse de Gemini',
          '6.7. Utiliser safeParse',
          '6.8. Différence entre Structured Output et Function Calling',
          '6.9. Travaux pratiques',
        ],
      },
    ],
  },
  {
    id: 'partie-7',
    number: 'PARTIE VII',
    title: 'MULTIMODALITÉ',
    chapters: [
      {
        slug: 'chapitre-7',
        number: 7,
        title: 'Analyser des images et des documents avec Gemini',
        subsections: [
          "7.1. Qu'est-ce que la multimodalité ?",
          "7.2. Exemple d'analyse d'image",
          '7.3. Préparer un fichier',
          '7.4. Comprendre les entrées multimodales',
          "7.5. Exemple d'analyse d'image avec un fichier téléversé",
          '7.6. Travaux pratiques',
        ],
      },
    ],
  },
  {
    id: 'partie-8',
    number: 'PARTIE VIII',
    title: 'STREAMING ET TOOL CALLING',
    chapters: [
      {
        slug: 'chapitre-8',
        number: 8,
        title: 'Streaming des réponses et appels de fonctions',
        subsections: [
          '8.1. Comprendre le streaming',
          "8.2. Activer le streaming avec l'Interactions API",
          '8.3. Streaming avec Express',
          '8.4. Consommer le streaming depuis React',
          '8.5. Comprendre le Function Calling',
          '8.6. Déclarer un outil',
          "8.7. Envoyer l'outil à Gemini",
          '8.8. Exécuter la fonction côté serveur',
          '8.9. Retourner le résultat à Gemini',
          '8.10. Différence entre outil natif et fonction personnalisée',
          '8.11. Sécurité du Function Calling',
          'Travaux pratiques',
        ],
      },
    ],
  },
  {
    id: 'partie-9',
    number: 'PARTIE IX',
    title: 'ERREURS, SÉCURITÉ ET OPTIMISATION',
    chapters: [
      {
        slug: 'chapitre-9',
        number: 9,
        title: 'Fiabiliser les applications Gemini',
        subsections: [
          '9.1. Pourquoi gérer les erreurs ?',
          '9.2. Utiliser try/catch',
          "9.3. Distinguer les catégories d'erreurs",
          '9.4. Les tentatives de reprise',
          '9.5. Protéger les clés API',
          '9.6. Contrôler les entrées utilisateur',
          '9.7. Comprendre la prompt injection',
          '9.8. Comprendre les quotas et les coûts',
          '9.9. Optimiser les appels',
          '9.10. Suivre les utilisations',
          '9.11. Travaux pratiques',
        ],
      },
    ],
  },
  {
    id: 'partie-10',
    number: 'PARTIE X',
    title: 'PROJET DE SYNTHÈSE DU MODULE',
    chapters: [
      {
        slug: 'projet-synthese',
        title: "Projet final — API intelligente d'analyse et de génération de données",
        subsections: [
          '10.1. Présentation',
          '10.2. Fonctionnalités attendues',
          '10.3. Architecture finale',
          '10.4. Structure de projet cible',
          '10.5. Critères de réussite',
        ],
      },
    ],
  },
  {
    id: 'partie-11',
    number: 'PARTIE XI',
    title: 'ÉVALUATION DES ACQUIS',
    chapters: [
      {
        slug: 'evaluation',
        title: 'Évaluation des acquis',
        subsections: [
          '11.1. Évaluation théorique',
          '11.2. Évaluation pratique',
          '11.3. Grille de validation',
        ],
      },
    ],
  },
  {
    id: 'annexes',
    number: 'ANNEXES',
    title: 'Ressources & Documentation',
    chapters: [
      {
        slug: 'annexes',
        title: 'Conclusion & Annexes A et B',
        subsections: [
          '12. Conclusion du module',
          'ANNEXE A — COMMANDES ESSENTIELLES',
          'ANNEXE B — DOCUMENTATION OFFICIELLE',
        ],
      },
    ],
  },
];

export function getAllChaptersFlat() {
  const list: { slug: string; title: string; part: string; number?: number }[] = [];
  for (const part of MODULE_1_PARTS) {
    for (const chapter of part.chapters) {
      list.push({
        slug: chapter.slug,
        title: chapter.title,
        part: `${part.number} : ${part.title}`,
        number: chapter.number,
      });
    }
  }
  return list;
}

export function getChapterNavigation(currentSlug: string) {
  const flat = getAllChaptersFlat();
  const index = flat.findIndex((c) => c.slug === currentSlug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

