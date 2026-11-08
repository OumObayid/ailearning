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

export const MODULE_2_PARTS: PartItem[] = [
  {
    id: 'partie-1',
    number: 'PARTIE I',
    title: "COMPRENDRE LE FRONTEND AUGMENTÉ PAR L'IA",
    chapters: [
      {
        slug: 'chapitre-1',
        number: 1,
        title: "Fondamentaux des applications frontend IA",
        subsections: [
          "1.1. Qu'est-ce qu'un frontend augmenté par l'IA ?",
          "Exemple concret",
          "1.2. Les principales catégories d'interfaces IA",
          "1.3. Architecture générale",
          "1.4. Pourquoi ne pas appeler directement Gemini depuis React ?",
          "1.5. Les responsabilités du frontend IA",
          "Travail pratique 1",
        ],
      },
    ],
  },
  {
    id: 'partie-2',
    number: 'PARTIE II',
    title: "PRÉPARER L'ENVIRONNEMENT FRONTEND",
    chapters: [
      {
        slug: 'chapitre-2',
        number: 2,
        title: "React, TypeScript et intégration d'une API IA",
        subsections: [
          "2.1. Création du projet React",
          "2.2. Architecture du projet",
          "2.3. Configurer l'URL du backend",
          "2.4. Créer un service API",
          "2.5. Créer une interface TypeScript",
          "2.6. Créer un composant React",
          "2.7. Comprendre les états React",
          "2.8. Synchronisme et asynchronisme",
          "2.9. Gestion des erreurs réseau",
          "Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: 'partie-3',
    number: 'PARTIE III',
    title: "CONSTRUIRE UNE INTERFACE CONVERSATIONNELLE",
    chapters: [
      {
        slug: 'chapitre-3',
        number: 3,
        title: "Développer un Chat IA avec React",
        subsections: [
          "3.1. Qu'est-ce qu'une interface conversationnelle ?",
          "3.2. Modèle de données des messages",
          "3.3. Créer un composant Message",
          "3.4. Gérer une liste de messages",
          "3.5. Gérer l'envoi d'un message",
          "3.6. Identifiant de conversation",
          "3.7. Gérer l'historique conversationnel",
          "3.8. Gestion de plusieurs conversations",
          "Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: 'partie-4',
    number: 'PARTIE IV',
    title: "EXPÉRIENCE UTILISATEUR IA",
    chapters: [
      {
        slug: 'chapitre-4',
        number: 4,
        title: "Concevoir des interfaces adaptées aux interactions IA",
        subsections: [
          "4.1. Pourquoi l'UX est-elle différente dans une application IA ?",
          "4.2. Les états d'une interface IA",
          "4.3. Afficher un indicateur de chargement",
          "4.4. Gérer les réponses longues",
          "4.5. Afficher du Markdown",
          "4.6. Ajouter des actions aux réponses",
          "4.7. Concevoir une interface responsive",
          "4.8. Accessibilité",
          "Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: 'partie-5',
    number: 'PARTIE V',
    title: "VERCEL AI SDK AVEC GOOGLE GEMINI",
    chapters: [
      {
        slug: 'chapitre-5',
        number: 5,
        title: "Découvrir Vercel AI SDK",
        subsections: [
          "5.1. Qu'est-ce que Vercel AI SDK ?",
          "5.2. Pourquoi apprendre Vercel AI SDK après le SDK natif ?",
          "5.3. Installation",
          "5.4. Configurer le fournisseur Google",
          "5.5. Génération de texte",
          "5.6. Comprendre streamText",
          "5.7. Comparer les deux approches",
          "5.8. AI SDK et AI Gateway : distinction",
          "Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: 'partie-6',
    number: 'PARTIE VI',
    title: "HOOKS ET INTERFACES IA AVANCÉES",
    chapters: [
      {
        slug: 'chapitre-6',
        number: 6,
        title: "Utiliser les fonctionnalités frontend de Vercel AI SDK",
        subsections: [
          "6.1. Comprendre les hooks IA",
          "6.2. Installer les dépendances",
          "6.3. Architecture avec React et un backend",
          "6.4. Créer une route backend",
          "6.5. Créer une interface avec useChat",
          "6.6. Comprendre les états",
          "6.7. Arrêter une génération",
          "6.8. Différence entre useChat et useCompletion",
          "Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: 'partie-7',
    number: 'PARTIE VII',
    title: "SORTIES STRUCTURÉES ET COMPOSANTS IA",
    chapters: [
      {
        slug: 'chapitre-7',
        number: 7,
        title: "Transformer les réponses IA en interfaces exploitables",
        subsections: [
          "7.1. Pourquoi utiliser des réponses structurées dans le frontend ?",
          "7.2. Définir un schéma Zod",
          "7.3. Utiliser generateObject",
          "7.4. Afficher le résultat dans React",
          "7.5. Comprendre le concept de UI générative",
          "7.6. Construire un rendu contrôlé",
          "Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: 'partie-8',
    number: 'PARTIE VIII',
    title: "MULTIMODALITÉ ET INTERACTIONS AVANCÉES",
    chapters: [
      {
        slug: 'chapitre-8',
        number: 8,
        title: "Construire des interfaces IA multimodales",
        subsections: [
          "8.1. Qu'est-ce qu'une interface multimodale ?",
          "8.2. Exemple : analyse d'image",
          "8.3. Prévisualiser une image",
          "8.4. Envoyer un fichier au backend",
          "8.5. Sécurité des fichiers",
          "8.6. Interfaces multimodales possibles",
          "8.7. Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: 'partie-9',
    number: 'PARTIE IX',
    title: "GESTION DES CONVERSATIONS ET PERFORMANCE FRONTEND",
    chapters: [
      {
        slug: 'chapitre-9',
        number: 9,
        title: "Optimiser les applications frontend IA",
        subsections: [
          "9.1. Pourquoi optimiser une application IA ?",
          "9.2. Annuler une requête avec AbortController",
          "9.3. Limiter les demandes répétées",
          "9.4. Comprendre debounce",
          "9.5. Gérer les longues conversations",
          "9.6. Optimiser les composants React",
          "9.7. Gestion du cache",
          "Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: 'partie-10',
    number: 'PARTIE X',
    title: "SÉCURITÉ ET TESTS FRONTEND IA",
    chapters: [
      {
        slug: 'chapitre-10',
        number: 10,
        title: "Sécuriser et tester les interfaces IA",
        subsections: [
          "10.1. Les risques propres au frontend IA",
          "10.2. Sécuriser l'affichage",
          "10.3. Contrôler les actions",
          "10.4. Tester les composants avec Vitest",
          "10.5. Tester les interactions utilisateur",
          "10.6. Tester sans appeler Gemini",
          "Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: 'partie-11',
    number: 'PARTIE XI',
    title: "PROJET FINAL DU MODULE",
    chapters: [
      {
        slug: 'projet-synthese',
        title: "Projet de synthèse — Assistant IA frontend professionnel",
        subsections: [
          "11.1. Présentation",
          "11.2. Fonctionnalités",
          "11.3. Architecture du projet",
          "11.4. Structure finale",
          "11.5. Critères de réussite",
        ],
      },
    ],
  },
  {
    id: 'partie-12',
    number: 'PARTIE XII',
    title: "ÉVALUATION DES ACQUIS",
    chapters: [
      {
        slug: 'evaluation',
        title: "Évaluation des acquis & Annexes",
        subsections: [
          "12.1. Évaluation théorique",
          "12.2. Évaluation pratique",
          "12.3. Grille de validation",
          "ANNEXE A — Commandes essentielles",
          "ANNEXE B — Documentation officielle",
          "Conclusion du Module 2",
        ],
      },
    ],
  },
];

export function getAllModule2ChaptersFlat() {
  const list: { slug: string; title: string; part: string; number?: number }[] = [];
  for (const part of MODULE_2_PARTS) {
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

export function getModule2ChapterNavigation(currentSlug: string) {
  const flat = getAllModule2ChaptersFlat();
  const index = flat.findIndex((c) => c.slug === currentSlug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

