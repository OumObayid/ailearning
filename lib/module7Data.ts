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

export const MODULE_7_PARTS: PartItem[] = [
  {
    id: 'partie-1',
    number: 'PARTIE 1',
    title: "SÉCURITÉ FONDAMENTALE & CONTRÔLE D'ACCÈS",
    chapters: [
      {
        slug: 'chapitre-1',
        number: 1,
        title: "Protection des clés API et gestion des secrets",
        subsections: [
          "1.1. Pourquoi protéger les clés API Gemini ?",
          "1.2. Le piège de l'exposition des clés côté client dans React",
          "1.3. Gestion sécurisée via variables d'environnement et backend Express",
          "1.4. Bonnes pratiques de stockage, rotation et exclusion Git (.gitignore)",
        ],
      },
      {
        slug: 'chapitre-2',
        number: 2,
        title: "Authentification JWT, autorisations RBAC et contrôle d'accès aux données",
        subsections: [
          "2.1. Authentification vs Autorisation : Principes fondamentaux",
          "2.2. Middleware Express d'authentification par jeton JWT",
          "2.3. Sécurisation des routes d'inférence IA",
          "2.4. Contrôle d'accès SQL strict : Cloisonnement des données par user_id",
        ],
      },
      {
        slug: 'chapitre-3',
        number: 3,
        title: "Détection et prévention des injections de prompts directes",
        subsections: [
          "3.1. Qu'est-ce qu'une injection de prompt directe (Jailbreak) ?",
          "3.2. Pourquoi les instructions système ne sont pas une barrière absolue",
          "3.3. Techniques de défense : Délimiteurs stricts, consignes de méfiance et filtres heuristiques",
        ],
      },
      {
        slug: 'chapitre-4',
        number: 4,
        title: "Injections indirectes et empoisonnement de contexte documentaire RAG",
        subsections: [
          "4.1. Le vecteur d'attaque RAG : Le poison dans les documents de référence",
          "4.2. Architecture étanche : Marquage des fragments comme données non fiables",
          "4.3. Règles d'or pour neutraliser les instructions malveillantes injectées dans Qdrant",
        ],
      },
    ],
  },
  {
    id: 'partie-2',
    number: 'PARTIE 2',
    title: "SÉCURISATION DES OUTILS & VALIDATION DES DONNÉES",
    chapters: [
      {
        slug: 'chapitre-5',
        number: 5,
        title: "Sécurisation des outils agentiques et application stricte du moindre privilège",
        subsections: [
          "5.1. Principe du moindre privilège appliqué aux outils IA",
          "5.2. Séparation hermétique entre outils de lecture et outils d'écriture",
          "5.3. Vérification des droits et validation d'autorisation côté serveur Node.js",
        ],
      },
      {
        slug: 'chapitre-6',
        number: 6,
        title: "Validation stricte des entrées et des sorties structurées avec Zod",
        subsections: [
          "6.1. Assainissement des prompts et entrées utilisateur avec Zod",
          "6.2. Contrôle de conformité des sorties JSON générées par l'IA",
          "6.3. Prévention des valeurs aberrantes et injection de données corrompues en base",
        ],
      },
      {
        slug: 'chapitre-7',
        number: 7,
        title: "Contrôle des actions sensibles et patron Human-in-the-Loop",
        subsections: [
          "7.1. Typologie des opérations critiques nécessitant une approbation",
          "7.2. Patron architectural de validation humaine (Human-in-the-Loop)",
          "7.3. Implémentation d'un flux de confirmation lié à l'action exacte et à l'utilisateur",
        ],
      },
    ],
  },
  {
    id: 'partie-3',
    number: 'PARTIE 3',
    title: "TESTS AUTOMATISÉS DU CODE ET DES AGENTS",
    chapters: [
      {
        slug: 'chapitre-8',
        number: 8,
        title: "Tests unitaires avec Vitest et isolation des appels IA",
        subsections: [
          "8.1. Pourquoi et comment tester une application d'IA non déterministe ?",
          "8.2. Configuration de Vitest dans un projet TypeScript moderne",
          "8.3. Écriture de tests unitaires sur la validation et les utilitaires",
          "8.4. Isolation hermétique : Mocking des fournisseurs IA sans consommer de quota",
        ],
      },
      {
        slug: 'chapitre-9',
        number: 9,
        title: "Tests d'intégration d'API avec Supertest et Express",
        subsections: [
          "9.1. Objectifs des tests HTTP de bout en bout",
          "9.2. Architecture découplée : Séparation de app.ts et server.ts",
          "9.3. Écriture des suites de tests Supertest sur les routes IA",
        ],
      },
      {
        slug: 'chapitre-10',
        number: 10,
        title: "Tests des workflows, boucles d'agents et graphes LangGraph",
        subsections: [
          "10.1. Stratégie de test des agents : Sélection d'outils et cas limites",
          "10.2. Validation des transitions et branches conditionnelles dans LangGraph",
          "10.3. Tests de résistance : Erreurs d'outils, résultats vides et reprise après interruption",
        ],
      },
    ],
  },
  {
    id: 'partie-4',
    number: 'PARTIE 4',
    title: "ÉVALUATION DE LA QUALITÉ & RÉDUCTION DES HALLUCINATIONS",
    chapters: [
      {
        slug: 'chapitre-11',
        number: 11,
        title: "Évaluation objective de la qualité des réponses et LLM-as-a-judge",
        subsections: [
          "11.1. Les critères d'évaluation : Pertinence, exactitude, complétude, cohérence et fidélité",
          "11.2. Constitution d'un jeu de données d'évaluation (Gold Standard Dataset)",
          "11.3. L'approche LLM-as-a-judge : Automatiser la notation avec un modèle arbitre",
        ],
      },
      {
        slug: 'chapitre-12',
        number: 12,
        title: "Détection, mesure et réduction active des hallucinations",
        subsections: [
          "12.1. Mécanismes d'apparition des hallucinations chez les modèles de langage",
          "12.2. Stratégies d'ancrage documentaire strict et vérification des sources",
          "12.3. Formuler des consignes d'aveu d'incertitude pour bannir les fausses certitudes",
        ],
      },
    ],
  },
  {
    id: 'partie-5',
    number: 'PARTIE 5',
    title: "PERFORMANCE, OPTIMISATION & OBSERVABILITÉ",
    chapters: [
      {
        slug: 'chapitre-13',
        number: 13,
        title: "Suivi des coûts, tokens et latence des appels Gemini",
        subsections: [
          "13.1. Facteurs déterminants des coûts (Tokens d'entrée, de sortie, multimodalité)",
          "13.2. Mesure précise de la latence de traitement (performance.now)",
          "13.3. Tableau de bord des métriques essentielles en production",
        ],
      },
      {
        slug: 'chapitre-14',
        number: 14,
        title: "Stratégies de mise en cache, prompt pruning et streaming réactif",
        subsections: [
          "14.1. Principe de la mise en cache des réponses publiques (In-Memory & Redis)",
          "14.2. Isolation des contextes privés et composition des clés de cache",
          "14.3. Optimisation des prompts (Pruning, réduction de contexte et streaming)",
        ],
      },
      {
        slug: 'chapitre-15',
        number: 15,
        title: "Logs structurés, traçabilité et observabilité avec OpenTelemetry",
        subsections: [
          "15.1. Logs vs Observabilité : Les 3 piliers (Logs, Métriques, Traces)",
          "15.2. Journalisation structurée avec Pino / Winston et données à exclure",
          "15.3. Traçabilité distribuée avec Correlation IDs de bout en bout",
        ],
      },
    ],
  },
  {
    id: 'partie-6',
    number: 'PARTIE 6',
    title: "PROJET DE SYNTHÈSE & VALIDATION FINALE",
    chapters: [
      {
        slug: 'projet-synthese',
        title: "Projet final — API IA sécurisée, testée et optimisée",
        subsections: [
          "16.1. Cahier des charges global du projet de synthèse",
          "16.2. Architecture technique unifiée (Express, Gemini, MySQL, Qdrant, Redis)",
          "16.3. Guide d'implémentation méthodique pas-à-pas",
          "16.4. Critères d'acceptation et recette finale",
        ],
      },
      {
        slug: 'evaluation',
        title: "Checklist de mise en production, bonnes pratiques & évaluation finale",
        subsections: [
          "17.1. Checklist exhaustive de pré-déploiement en production",
          "17.2. Guide des 15 règles d'or de l'ingénieur IA en production",
          "17.3. Commandes essentielles et documentation officielle de référence",
          "17.4. Évaluation finale des acquis et conclusion du Module 7",
        ],
      },
    ],
  },
];

export function getAllModule7ChaptersFlat() {
  const list: { slug: string; title: string; part: string; number?: number }[] = [];
  for (const part of MODULE_7_PARTS) {
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

export function getModule7ChapterNavigation(currentSlug: string) {
  const flat = getAllModule7ChaptersFlat();
  const index = flat.findIndex((c) => c.slug === currentSlug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

