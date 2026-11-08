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

export const MODULE_8_PARTS: PartItem[] = [
  {
    id: 'partie-1',
    number: 'PARTIE 1',
    title: "CADRAGE & ARCHITECTURE GLOBALE",
    chapters: [
      {
        slug: 'chapitre-1',
        number: 1,
        title: "Présentation du projet, cahier des charges et analyse des besoins",
        subsections: [
          "1.1. Contexte d'entreprise et problématique de fragmentation documentaire",
          "1.2. Objectifs fonctionnels et opérationnels de la plateforme",
          "1.3. Les 4 personas cibles : Collaborateur, Gestionnaire, Auditeur, Administrateur",
          "1.4. Matrice globale des livrables de fin de projet",
        ],
      },
      {
        slug: 'chapitre-2',
        number: 2,
        title: "Architecture logicielle globale à 5 tiers et cartographie des flux",
        subsections: [
          "2.1. Topologie générale des 5 tiers applicatifs",
          "2.2. Matrice des responsabilités technologiques (React, Express, Gemini, Qdrant, MySQL, n8n, LangGraph)",
          "2.3. Cartographie des flux de données synchrones et asynchrones",
          "2.4. Règles d'étanchéité et frontières de sécurité réseau",
        ],
      },
    ],
  },
  {
    id: 'partie-2',
    number: 'PARTIE 2',
    title: "DONNÉES & MODÉLISATION RELATIONNELLE / VECTORIELLE",
    chapters: [
      {
        slug: 'chapitre-3',
        number: 3,
        title: "Modélisation des données relationnelles MySQL et schéma DDL complet",
        subsections: [
          "3.1. Structure du schéma relationnel (users, roles, documents, chunks, conversations, messages, runs)",
          "3.2. Script SQL DDL complet avec clés étrangères, contraintes d'intégrité et index",
          "3.3. Gestion des transactions et stratégies d'isolation SQL",
        ],
      },
      {
        slug: 'chapitre-4',
        number: 4,
        title: "Indexation vectorielle dans Qdrant, chunking et synchronisation",
        subsections: [
          "4.1. Modèle d'ingestion documentaire : Du PDF aux vecteurs de dimension 768",
          "4.2. Stratégies de découpage (Chunking) avec chevauchement contextuel (Overlap)",
          "4.3. Stockage dans Qdrant et couplage bidirectionnel avec document_chunks dans MySQL",
          "4.4. Gestion du cycle de vie : Réindexation et suppression en cascade cohérente",
        ],
      },
    ],
  },
  {
    id: 'partie-3',
    number: 'PARTIE 3',
    title: "CONCEPTION DE L'API BACKEND & SÉCURITÉ",
    chapters: [
      {
        slug: 'chapitre-5',
        number: 5,
        title: "Architecture backend Express en couches et contrats d'API REST",
        subsections: [
          "5.1. Organisation en couches industrielles : Routes, Contrôleurs, Services, Repositories",
          "5.2. Spécification détaillée des endpoints de l'API REST",
          "5.3. Standardisation des formats de réponses JSON et gestion centralisée des erreurs",
        ],
      },
      {
        slug: 'chapitre-6',
        number: 6,
        title: "Authentification JWT, contrôle d'accès RBAC et sanitisation Zod",
        subsections: [
          "7.1. Gestion des sessions avec jetons JWT signés et cookies HttpOnly",
          "7.2. Middlewares de contrôle de rôles et de permissions granulaires",
          "7.3. Sanitisation préventive de toutes les charges utiles via Zod",
          "7.4. Cloisonnement strict multi-tenant : user_id souverain côté serveur",
        ],
      },
    ],
  },
  {
    id: 'partie-4',
    number: 'PARTIE 4',
    title: "MOTEUR D'IA & RECHERCHE RAG ANCRÉE",
    chapters: [
      {
        slug: 'chapitre-7',
        number: 7,
        title: "Intégration de Google Gemini avec @google/genai et prompt engineering",
        subsections: [
          "7.1. Configuration optimale du SDK officiel @google/genai",
          "7.2. Conception du prompt système d'ancrage documentaire de référence",
          "7.3. Température, fenêtres de contexte et gestion des jetons",
        ],
      },
      {
        slug: 'chapitre-8',
        number: 8,
        title: "Pipeline RAG haute fidélité avec traçabilité et citation des sources",
        subsections: [
          "8.1. Déroulement du cycle RAG de la requête à la synthèse",
          "8.2. Filtrage vectoriel par permissions d'accès dans Qdrant",
          "8.3. Extraction et association vérifiable des sources (Document, Page, Extrait exact)",
          "8.4. Mécanisme strict d'aveu d'incertitude anti-hallucination",
        ],
      },
    ],
  },
  {
    id: 'partie-5',
    number: 'PARTIE 5',
    title: "AGENTS AUTONOMES & ORCHESTRATION PAR GRAPHES",
    chapters: [
      {
        slug: 'chapitre-9',
        number: 9,
        title: "Catalogue d'outils typés et boucle d'agent avec Tool Calling",
        subsections: [
          "9.1. Définition du catalogue d'outils de la plateforme",
          "9.2. Implémentation du Function Calling avec l'Interactions API",
          "9.3. Boucle décisionnelle itérative (Agent Loop) et limitation MAX_STEPS",
        ],
      },
      {
        slug: 'chapitre-10',
        number: 10,
        title: "Orchestration avancée avec LangGraph.js et Human-in-the-Loop",
        subsections: [
          "10.1. Modélisation de l'agent documentaire avec StateGraph",
          "10.2. Gestion des branches conditionnelles et cycles d'évaluation",
          "10.3. Suspension d'action critique par interrupt() et reprise par Command",
        ],
      },
    ],
  },
  {
    id: 'partie-6',
    number: 'PARTIE 6',
    title: "AUTOMATISATIONS ÉVÉNEMENTIELLES n8n",
    chapters: [
      {
        slug: 'chapitre-11',
        number: 11,
        title: "Intégration de n8n par Webhooks sécurisés et workflows asynchrones",
        subsections: [
          "11.1. Architecture de couplage entre Express et l'orchestrateur n8n",
          "11.2. Sécurisation des webhooks par header partagé X-Webhook-Secret",
          "11.3. Workflow 1 : Traitement asynchrone et notification de nouveau document",
          "11.4. Workflow 2 : Génération planifiée de rapport d'audit documentaire",
        ],
      },
    ],
  },
  {
    id: 'partie-7',
    number: 'PARTIE 7',
    title: "INTERFACE UTILISATEUR & EXPÉRIENCE CONVERSATIONNELLE",
    chapters: [
      {
        slug: 'chapitre-12',
        number: 12,
        title: "Frontend React, streaming temps réel et gestion documentaire",
        subsections: [
          "12.1. Conception de l'interface avec React, TypeScript et Tailwind CSS",
          "12.2. Intégration du streaming fluide de tokens pour une latence perçue minimale",
          "12.3. Composant d'affichage des sources interactives et prévisualisation PDF",
          "12.4. Espace de téléversement et suivi en temps réel du statut d'indexation",
        ],
      },
    ],
  },
  {
    id: 'partie-8',
    number: 'PARTIE 8',
    title: "QUALITÉ, TESTS & PERFORMANCE",
    chapters: [
      {
        slug: 'chapitre-13',
        number: 13,
        title: "Stratégie de tests automatisés de bout en bout (Vitest & Supertest)",
        subsections: [
          "13.1. Tests unitaires des services, des validateurs Zod et du RAG (Vitest)",
          "13.2. Tests d'intégration HTTP de l'API avec Supertest",
          "13.3. Mocking étanche des LLMs pour exécution en CI/CD sans coût d'API",
        ],
      },
      {
        slug: 'chapitre-14',
        number: 14,
        title: "Optimisation des coûts, cache sémantique et observabilité",
        subsections: [
          "14.1. Cache Redis pour questions récurrentes avec clés sécurisées",
          "14.2. Élagage de contexte (Prompt Pruning) pour réduction des coûts",
          "14.3. Journalisation structurée avec Pino et traçabilité par Correlation ID",
        ],
      },
    ],
  },
  {
    id: 'partie-9',
    number: 'PARTIE 9',
    title: "DÉPLOIEMENT, PORTFOLIO & RECETTE FINALE",
    chapters: [
      {
        slug: 'chapitre-15',
        number: 15,
        title: "Déploiement multi-environnements, Docker et variables d'environnement",
        subsections: [
          "15.1. Gestion des environnements (Développement, Préproduction, Production)",
          "15.2. Fichier docker-compose.yml de production (Express, MySQL, Qdrant, Redis, n8n)",
          "15.3. Checklist de sécurité et durcissement des variables d'environnement",
        ],
      },
      {
        slug: 'projet-synthese',
        title: "Guide d'implémentation méthodique TP 1 à 9 et valorisation dans le portfolio",
        subsections: [
          "16.1. Déroulé méthodologique des 9 Travaux Pratiques de construction",
          "16.2. Structuration du dossier de livraison et documentation OpenAPI",
          "16.3. Valorisation professionnelle dans le portfolio d'ingénieur IA",
        ],
      },
      {
        slug: 'evaluation',
        title: "Grille d'évaluation finale, critères de recette et conclusion générale",
        subsections: [
          "17.1. Grille d'évaluation sommative et barème de certification",
          "17.2. Matrice de validation des 15 critères de succès du projet",
          "17.3. Annexe : Documentation officielle de référence",
          "17.4. Conclusion générale de la formation d'ingénierie IA",
        ],
      },
    ],
  },
];

export function getAllModule8ChaptersFlat() {
  const list: { slug: string; title: string; part: string; number?: number }[] = [];
  for (const part of MODULE_8_PARTS) {
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

export function getModule8ChapterNavigation(currentSlug: string) {
  const flat = getAllModule8ChaptersFlat();
  const index = flat.findIndex((c) => c.slug === currentSlug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

