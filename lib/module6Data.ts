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

export const MODULE_6_PARTS: PartItem[] = [
  {
    id: 'partie-1',
    number: 'PARTIE 1',
    title: "FONDEMENTS & ARCHITECTURE DES AGENTS IA",
    chapters: [
      {
        slug: 'chapitre-1',
        number: 1,
        title: "Différence entre chatbot, workflow et agent IA",
        subsections: [
          "1.1. Le chatbot : limites et modèle request-response",
          "1.2. Le workflow déterministe : étapes linéaires pré-organisées",
          "1.3. L'agent IA autonome : objectif, sélection d'outils et boucle décisionnelle",
          "1.4. Tableau comparatif exhaustif (Chatbot vs Workflow vs Agent)",
        ],
      },
      {
        slug: 'chapitre-2',
        number: 2,
        title: "Architecture interne et composants fondamentaux d'un agent IA",
        subsections: [
          "2.1. Les composants clés : Modèle, Instructions système, Outils, Mémoire, Moteur, Sécurité",
          "2.2. Diagramme d'architecture générale en production",
          "2.3. Séparation stricte : Le modèle propose, le moteur TypeScript valide et exécute",
        ],
      },
    ],
  },
  {
    id: 'partie-2',
    number: 'PARTIE 2',
    title: "TOOL CALLING & OUTILLAGE TYPESCRIPT",
    chapters: [
      {
        slug: 'chapitre-3',
        number: 3,
        title: "Le Function Calling de Gemini avec le SDK officiel @google/genai",
        subsections: [
          "3.1. Principe fondamental du Tool Calling / Function Calling",
          "3.2. Le cycle en 8 étapes : de la requête utilisateur à la réponse finale",
          "3.3. Configuration du SDK officiel @google/genai et variables d'environnement",
          "3.4. Définir des fonctions TypeScript indépendantes",
          "3.5. Décrire les outils au modèle via l'Interactions API",
          "3.6. Envoi de la demande et inspection des function_call",
        ],
      },
      {
        slug: 'chapitre-4',
        number: 4,
        title: "Définition, validation des arguments avec Zod et registre d'outils",
        subsections: [
          "4.1. Pourquoi concevoir un Tool Registry centralisé ?",
          "4.2. Validation stricte des arguments du modèle avec Zod",
          "4.3. Construction d'un registre d'outils typé en TypeScript",
          "4.4. Exécution dynamique et gestion d'erreurs contrôlée",
          "4.5. Organisation de l'arborescence des fichiers du projet",
        ],
      },
      {
        slug: 'chapitre-5',
        number: 5,
        title: "Boucle d'exécution d'un agent et sélection dynamique des outils",
        subsections: [
          "5.1. Pourquoi une boucle itérative (Agent Loop) ?",
          "5.2. Schéma décisionnel complet de la boucle",
          "5.3. Implémentation complète avec l'Interactions API et previous_interaction_id",
          "5.4. Sélection dynamique selon l'intention vs Contrôle d'autorisation strict",
          "5.5. Filtrage des outils selon les rôles utilisateur (RBAC)",
        ],
      },
    ],
  },
  {
    id: 'partie-3',
    number: 'PARTIE 3',
    title: "MÉMOIRE, DONNÉES & SÉCURITÉ EN TYPESCRIPT",
    chapters: [
      {
        slug: 'chapitre-6',
        number: 6,
        title: "Gestion de l'état, mémoires court/long terme et persistance relationnelle",
        subsections: [
          "6.1. Définition et typage de l'AgentState",
          "6.2. Différence fondamentale entre état éphémère et mémoire durable",
          "6.3. Typologie des mémoires : session, relationnelle (MySQL) et vectorielle (Qdrant)",
          "6.4. Schéma MySQL pour l'historique conversationnel de l'agent",
        ],
      },
      {
        slug: 'chapitre-7',
        number: 7,
        title: "Connecter un agent aux APIs externes, MySQL et Qdrant (RAG agentique)",
        subsections: [
          "7.1. Création d'outils appelant des APIs REST externes avec fetch",
          "7.2. Pourquoi le modèle ne doit jamais appeler une API directement",
          "7.3. Outil de consultation relationnelle MySQL avec requêtes paramétrées",
          "7.4. Outil de recherche sémantique vectorielle avec Qdrant et embeddings Gemini",
          "7.5. Synergie RAG agentique : Combiner statut SQL et documentation vectorielle",
        ],
      },
      {
        slug: 'chapitre-8',
        number: 8,
        title: "Limites d'exécution, permissions, sécurité SSRF et Human-in-the-Loop",
        subsections: [
          "8.1. Prévenir l'emballement : max_steps, timeout, budget de tokens",
          "8.2. Gestion granulaire des permissions (lecture vs mutation critique)",
          "8.3. Protection contre les attaques SSRF sur les outils réseau",
          "8.4. Patron Human-in-the-Loop : Suspension et validation humaine obligatoire",
          "8.5. Journalisation et piste d'audit des actions agentiques",
        ],
      },
    ],
  },
  {
    id: 'partie-4',
    number: 'PARTIE 4',
    title: "SYSTÈMES MULTI-AGENTS EN TYPESCRIPT",
    chapters: [
      {
        slug: 'chapitre-9',
        number: 9,
        title: "Architecture multi-agents : Coordination et agents spécialisés",
        subsections: [
          "9.1. Qu'est-ce qu'un système multi-agent et quand l'adopter ?",
          "9.2. Avantages et limites : Spécialisation vs Latence & complexité",
          "9.3. Architecture Coordinateur / Superviseur et Agents spécialisés",
          "9.4. Protocole de communication par objets de résultat typés",
        ],
      },
    ],
  },
  {
    id: 'partie-5',
    number: 'PARTIE 5',
    title: "ORCHESTRATION AVANCÉE AVEC LANGGRAPH.JS",
    chapters: [
      {
        slug: 'chapitre-10',
        number: 10,
        title: "Introduction à LangGraph.js, StateGraph et Annotations",
        subsections: [
          "10.1. Pourquoi utiliser un framework d'orchestration par graphes ?",
          "10.2. Installation, configuration de l'environnement TypeScript et package.json",
          "10.3. Les concepts clés : State, Node, Edge, START et END",
          "10.4. Définir des états partagés avec Annotation.Root et fonctions Reducers",
        ],
      },
      {
        slug: 'chapitre-11',
        number: 11,
        title: "Transitions conditionnelles, cycles itératifs et contrôle d'exécution",
        subsections: [
          "11.1. Routage dynamique avec addConditionalEdges",
          "11.2. Construction de cycles d'exécution avec boucle de rétroaction",
          "11.3. Maîtriser les conditions d'arrêt et éviter les boucles infinies",
        ],
      },
      {
        slug: 'chapitre-12',
        number: 12,
        title: "Persistance, checkpointers (MemorySaver) et gestion des threads",
        subsections: [
          "12.1. Principe de la persistance par checkpoints dans LangGraph",
          "12.2. Configuration du checkpointer MemorySaver en mémoire",
          "12.3. Rôle crucial du thread_id et isolation des contextes utilisateurs",
          "12.4. Perspectives de persistance durable en base de données pour la production",
        ],
      },
      {
        slug: 'chapitre-13',
        number: 13,
        title: "Interruptions interactives, validation humaine et intégration Gemini",
        subsections: [
          "13.1. La primitive interrupt() : Suspendre l'exécution dans l'attente d'une décision",
          "13.2. Reprise du graphe avec Command({ resume: ... })",
          "13.3. Intégration de Google Gemini avec @google/genai au cœur des nœuds LangGraph",
          "13.4. Orchestration multi-agents avec LangGraph et sous-graphes (Subgraphs)",
        ],
      },
    ],
  },
  {
    id: 'partie-6',
    number: 'PARTIE 6',
    title: "PROJET DE SYNTHÈSE & ÉVALUATION",
    chapters: [
      {
        slug: 'projet-synthese',
        title: "Projet final — Assistant IA professionnel multi-outils avec LangGraph",
        subsections: [
          "14.1. Présentation du projet et cahier des charges fonctionnel",
          "14.2. Stack technique et modélisation de l'architecture générale",
          "14.3. Guide d'implémentation pas-à-pas (React, Express, LangGraph, MySQL, Qdrant)",
          "14.4. Critères de recette et validation finale",
        ],
      },
      {
        slug: 'evaluation',
        title: "Tests Vitest, métriques de performance, sécurité, bonnes pratiques & glossaire",
        subsections: [
          "15.1. Tests unitaires des outils et des permissions avec Vitest",
          "15.2. Évaluation des performances et observabilité des agents",
          "15.3. Tests de sécurité : Injection de prompt, contournement d'outils et SSRF",
          "15.4. Guide des bonnes pratiques professionnelles de conception d'agents",
          "15.5. Glossaire technique complet du développeur d'agents IA",
          "15.6. Documentation officielle de référence et conclusion du Module 6",
        ],
      },
    ],
  },
];

export function getAllModule6ChaptersFlat() {
  const list: { slug: string; title: string; part: string; number?: number }[] = [];
  for (const part of MODULE_6_PARTS) {
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

export function getModule6ChapterNavigation(currentSlug: string) {
  const flat = getAllModule6ChaptersFlat();
  const index = flat.findIndex((c) => c.slug === currentSlug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

