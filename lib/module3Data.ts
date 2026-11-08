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

export const MODULE_3_PARTS: PartItem[] = [
  {
    id: 'partie-1',
    number: 'PARTIE 1',
    title: "COMPRENDRE LE BACKEND D'UNE APPLICATION IA",
    chapters: [
      {
        slug: 'chapitre-1',
        number: 1,
        title: "Le rôle du backend dans une application IA",
        subsections: [
          "1.1. Qu'est-ce qu'un backend ?",
          "1.2. Différence entre frontend, backend et API",
          "1.3. Architecture générale d'une application IA",
          "1.4. Pourquoi ne pas appeler directement Gemini depuis React ?",
        ],
      },
    ],
  },
  {
    id: 'partie-2',
    number: 'PARTIE 2',
    title: "PRÉPARATION DE L'ENVIRONNEMENT",
    chapters: [
      {
        slug: 'chapitre-2',
        number: 2,
        title: "Installer Node.js et initialiser un projet TypeScript",
        subsections: [
          "2.1. Prérequis logiciels",
          "2.2. Créer le projet et initialiser npm",
          "2.3. Installer les dépendances principales",
          "2.4. Configurer TypeScript (tsconfig.json)",
          "2.5. Configurer package.json",
          "2.6. Organiser l'architecture du projet",
        ],
      },
    ],
  },
  {
    id: 'partie-3',
    number: 'PARTIE 3',
    title: "CONFIGURATION ET PREMIÈRE API",
    chapters: [
      {
        slug: 'chapitre-3',
        number: 3,
        title: "Configuration centralisée Zod et serveur Express",
        subsections: [
          "3.1. Pourquoi utiliser un fichier .env ?",
          "3.2. Créer le fichier .env.example",
          "3.3. Protéger les fichiers sensibles avec .gitignore",
          "3.4. Centraliser et valider la configuration avec Zod",
          "3.5. Comprendre le framework Express",
          "3.6. Créer app.ts et server.ts",
          "3.7. Démarrer le serveur et tester /api/health",
        ],
      },
    ],
  },
  {
    id: 'partie-4',
    number: 'PARTIE 4',
    title: "INTÉGRATION DE GOOGLE GEMINI",
    chapters: [
      {
        slug: 'chapitre-4',
        number: 4,
        title: "Créer un service Gemini professionnel et une route de génération",
        subsections: [
          "4.1. Pourquoi créer un service séparé ?",
          "4.2. Initialiser le SDK officiel @google/genai",
          "4.3. Utiliser l'Interactions API",
          "4.4. Comprendre les paramètres d'interaction",
          "4.5. Différence entre prompt et instructions système",
          "4.6. Définir le schéma Zod de validation",
          "4.7. Créer le middleware validateBody",
          "4.8. Créer le contrôleur et la route Express",
          "4.9. Tester avec Postman",
        ],
      },
    ],
  },
  {
    id: 'partie-5',
    number: 'PARTIE 5',
    title: "RESPONSABILITÉS DES COUCHES LOGICIELLES",
    chapters: [
      {
        slug: 'chapitre-5',
        number: 5,
        title: "Routes, contrôleurs, services et middlewares",
        subsections: [
          "5.1. Le rôle des routes",
          "5.2. Le rôle des contrôleurs",
          "5.3. Le rôle des services métier",
          "5.4. Le rôle des middlewares transversaux",
          "5.5. Le cheminement complet d'une requête",
        ],
      },
    ],
  },
  {
    id: 'partie-6',
    number: 'PARTIE 6',
    title: "INTÉGRATION DE MYSQL ET CONVERSATIONS",
    chapters: [
      {
        slug: 'chapitre-6',
        number: 6,
        title: "Connecter MySQL et gérer l'historique des conversations",
        subsections: [
          "6.1. Pourquoi associer une base de données relationnelle ?",
          "6.2. Créer la base de données et les tables conversations/messages",
          "6.3. Créer le pool de connexions mysql2/promise",
          "6.4. Tester la connexion au démarrage",
          "6.5. Insérer un message avec requête préparée sécurisée",
          "6.6. Comprendre les différents identifiants",
          "6.7. Récupérer l'historique avec vérification de propriété",
          "6.8. Gestion de la fenêtre de contexte conversationnel",
        ],
      },
    ],
  },
  {
    id: 'partie-7',
    number: 'PARTIE 7',
    title: "VERCEL AI SDK DANS LE BACKEND",
    chapters: [
      {
        slug: 'chapitre-7',
        number: 7,
        title: "Comprendre et intégrer le Vercel AI SDK côté serveur",
        subsections: [
          "7.1. Qu'est-ce que le Vercel AI SDK ?",
          "7.2. Installer ai et @ai-sdk/google",
          "7.3. Configurer le provider Google",
          "7.4. Générer du texte avec generateText",
          "7.5. Comprendre la différence entre generateText et streamText",
          "7.6. Matrice de décision : @google/genai ou Vercel AI SDK",
        ],
      },
    ],
  },
  {
    id: 'partie-8',
    number: 'PARTIE 8',
    title: "SÉCURITÉ DU BACKEND IA",
    chapters: [
      {
        slug: 'chapitre-8',
        number: 8,
        title: "Protéger l'API contre les abus et les surcoûts",
        subsections: [
          "8.1. Pourquoi la sécurité IA est-elle critique ?",
          "8.2. Installer et configurer Helmet, CORS et express-rate-limit",
          "8.3. Authentification et autorisation des accès",
          "8.4. Protéger et verrouiller les paramètres Gemini",
          "8.5. Prévention contre les injections de prompt",
          "8.6. Protection proactive contre les coûts excessifs",
        ],
      },
    ],
  },
  {
    id: 'partie-9',
    number: 'PARTIE 9',
    title: "GESTION CENTRALISÉE DES ERREURS",
    chapters: [
      {
        slug: 'chapitre-9',
        number: 9,
        title: "Gestion des erreurs HTTP et résilience IA",
        subsections: [
          "9.1. Pourquoi centraliser la gestion d'erreurs ?",
          "9.2. Créer un middleware d'erreur global",
          "9.3. Comprendre et standardiser les codes d'état HTTP",
          "9.4. Règle absolue : ne jamais exposer les erreurs internes",
        ],
      },
    ],
  },
  {
    id: 'partie-10',
    number: 'PARTIE 10',
    title: "TESTER LE BACKEND IA",
    chapters: [
      {
        slug: 'chapitre-10',
        number: 10,
        title: "Tests unitaires et d'intégration avec Vitest et Supertest",
        subsections: [
          "10.1. Pourquoi tester rigoureusement une API IA ?",
          "10.2. Installer Vitest et Supertest",
          "10.3. Configurer les scripts de test dans package.json",
          "10.4. Tester la route de santé /api/health",
          "10.5. Tester la validation du prompt sans appeler Gemini",
          "10.6. Pourquoi et comment simuler Gemini (Mocks)",
          "10.7. Les différentes catégories de tests backend",
        ],
      },
    ],
  },
  {
    id: 'partie-11',
    number: 'PARTIE 11',
    title: "OBSERVABILITÉ, STREAMING ET FRONTEND",
    chapters: [
      {
        slug: 'chapitre-11',
        number: 11,
        title: "Journalisation, streaming et communication avec React",
        subsections: [
          "11.1. Pourquoi enregistrer les événements et mesurer la durée ?",
          "11.2. Données utiles à journaliser sans fuite de secrets",
          "11.3. Gérer les appels longs et timeouts",
          "11.4. Connecter un service frontend React à l'API",
          "11.5. Principes et implémentation du streaming IA",
        ],
      },
    ],
  },
  {
    id: 'partie-12',
    number: 'PARTIE 12',
    title: "PROJET PRATIQUE FINAL DU MODULE",
    chapters: [
      {
        slug: 'projet-synthese',
        title: "Développer une API professionnelle d'assistant IA",
        subsections: [
          "12.1. Présentation du projet",
          "12.2. Fonctionnalités et endpoints à développer",
          "12.3. Architecture logicielle cible",
          "12.4. Contraintes techniques obligatoires",
          "12.5. Guide pas-à-pas des 8 exercices pratiques",
          "12.6. Critères de validation et recette finale",
        ],
      },
    ],
  },
  {
    id: 'partie-13',
    number: 'PARTIE 13',
    title: "BONNES PRATIQUES & ANNEXES",
    chapters: [
      {
        slug: 'evaluation',
        title: "Mise en production, évaluation & Annexes",
        subsections: [
          "13.1. Préparer un backend pour la production",
          "13.2. Checklist complète de mise en production",
          "ANNEXE 1 — Commandes essentielles",
          "ANNEXE 2 — Documentation officielle",
          "ANNEXE 3 — Vocabulaire technique de référence",
          "Conclusion du Module 3",
        ],
      },
    ],
  },
];

export function getAllModule3ChaptersFlat() {
  const list: { slug: string; title: string; part: string; number?: number }[] = [];
  for (const part of MODULE_3_PARTS) {
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

export function getModule3ChapterNavigation(currentSlug: string) {
  const flat = getAllModule3ChaptersFlat();
  const index = flat.findIndex((c) => c.slug === currentSlug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

