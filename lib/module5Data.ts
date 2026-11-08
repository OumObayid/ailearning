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

export const MODULE_5_PARTS: PartItem[] = [
  {
    id: 'partie-1',
    number: 'PARTIE 1',
    title: "FONDAMENTAUX DE L'AUTOMATISATION & n8n",
    chapters: [
      {
        slug: 'chapitre-1',
        number: 1,
        title: "Comprendre l'automatisation intelligente et découvrir n8n",
        subsections: [
          "1.1. Qu'est-ce que l'automatisation de processus ?",
          "1.2. Qu'est-ce que l'automatisation intelligente avec l'IA ?",
          "1.3. Présentation de la plateforme n8n",
          "1.4. Pourquoi combiner n8n avec Node.js et Express ?",
          "1.5. Matrice des responsabilités : React, Node, Express, n8n, Gemini, MySQL",
          "1.6. Installation locale avec npm ou Docker",
        ],
      },
    ],
  },
  {
    id: 'partie-2',
    number: 'PARTIE 2',
    title: "ARCHITECTURE D'UN WORKFLOW & EXPRESSIONS",
    chapters: [
      {
        slug: 'chapitre-2',
        number: 2,
        title: "Architecture d'un workflow, structure des données et expressions",
        subsections: [
          "2.1. Anatomie d'un workflow n8n",
          "2.2. Les grandes familles de nœuds (Trigger, Action, Logic, Code)",
          "2.3. Structure des données circulantes ($input et items JSON)",
          "2.4. Maîtriser la syntaxe des expressions dynamiques n8n",
          "2.5. Travail pratique 1 : Workflow de bienvenue",
        ],
      },
    ],
  },
  {
    id: 'partie-3',
    number: 'PARTIE 3',
    title: "NŒUDS DE CONTRÔLE ET TRANSFORMATIONS CODE",
    chapters: [
      {
        slug: 'chapitre-3',
        number: 3,
        title: "Nœuds de contrôle logique et transformations JavaScript",
        subsections: [
          "3.1. Le nœud conditionnel IF",
          "3.2. Le nœud d'aiguillage Switch",
          "3.3. Le nœud de synchronisation Merge",
          "3.4. Le traitement itératif avec Loop Over Items",
          "3.5. Exécuter du code JavaScript sur-mesure avec le Code Node",
        ],
      },
    ],
  },
  {
    id: 'partie-4',
    number: 'PARTIE 4',
    title: "DÉCLENCHEURS TEMPORELS ET WEBHOOKS",
    chapters: [
      {
        slug: 'chapitre-4',
        number: 4,
        title: "Déclencheurs temporels et Webhooks HTTP",
        subsections: [
          "4.1. Déclenchement manuel (Manual Trigger)",
          "4.2. Déclenchement planifié (Schedule Trigger & Cron)",
          "4.3. Le déclencheur universel Webhook Trigger",
          "4.4. Différence cruciale : URL de Test versus URL de Production",
          "4.5. Travail pratique 2 : Créer et tester un webhook avec curl",
        ],
      },
    ],
  },
  {
    id: 'partie-5',
    number: 'PARTIE 5',
    title: "CONNEXION AUX APIS REST ET AUTHENTIFICATION",
    chapters: [
      {
        slug: 'chapitre-5',
        number: 5,
        title: "Connecter n8n aux APIs REST et gérer l'authentification",
        subsections: [
          "5.1. Le nœud HTTP Request polyvalent (GET, POST, PUT, DELETE)",
          "5.2. Configuration d'un appel POST avec payload JSON dynamique",
          "5.3. Sécurité des accès : gestionnaire de Credentials de n8n",
          "5.4. Quand privilégier HTTP Request face aux intégrations officielles",
        ],
      },
    ],
  },
  {
    id: 'partie-6',
    number: 'PARTIE 6',
    title: "PERSISTANCE RELATIONNELLE MYSQL",
    chapters: [
      {
        slug: 'chapitre-6',
        number: 6,
        title: "Connecter n8n à MySQL et sécuriser les requêtes SQL",
        subsections: [
          "6.1. Cas d'usage de MySQL dans un workflow d'automatisation",
          "6.2. Structure de la table des demandes clients",
          "6.3. Sécurité SQL : paramètres liés contre l'injection SQL",
          "6.4. Travail pratique 3 : Ingestion et insertion en base de données",
        ],
      },
    ],
  },
  {
    id: 'partie-7',
    number: 'PARTIE 7',
    title: "INTELLIGENCE ARTIFICIELLE AVEC GEMINI",
    chapters: [
      {
        slug: 'chapitre-7',
        number: 7,
        title: "Intégrer Google Gemini dans les workflows n8n",
        subsections: [
          "7.1. Pourquoi injecter Gemini dans une automatisation ?",
          "7.2. Intégration officielle Gemini versus appel HTTP Request direct",
          "7.3. Exemple d'analyse : Classification sémantique d'un message",
          "7.4. Construction du workflow intelligent avec routage Switch",
          "7.5. Travail pratique 4 : Aiguillage automatique de demandes de support",
        ],
      },
    ],
  },
  {
    id: 'partie-8',
    number: 'PARTIE 8',
    title: "ARCHITECTURE 4 TIERS : REACT, EXPRESS, n8n, GEMINI",
    chapters: [
      {
        slug: 'chapitre-8',
        number: 8,
        title: "Architecture complète : React, Express, n8n et Gemini",
        subsections: [
          "8.1. Pourquoi le frontend ne doit pas appeler n8n directement",
          "8.2. L'architecture sécurisée à 4 tiers",
          "8.3. Développer la passerelle Express avec validation Zod",
          "8.4. Sécuriser les webhooks avec le header X-Webhook-Secret",
          "8.5. Modèle de traitement asynchrone (HTTP 202 Accepted & suivi)",
          "8.6. Travail pratique 5 : Connexion du formulaire React à n8n",
        ],
      },
    ],
  },
  {
    id: 'partie-9',
    number: 'PARTIE 9',
    title: "RÉSILIENCE ET GESTION DES ERREURS",
    chapters: [
      {
        slug: 'chapitre-9',
        number: 9,
        title: "Résilience, sous-workflows et gestion des erreurs",
        subsections: [
          "9.1. Modulariser les flux avec les sous-workflows (Execute Sub-workflow)",
          "9.2. Typologie des erreurs : temporaires, permanentes et métier",
          "9.3. Mécanismes de reprise automatique (Retry) et idempotence",
          "9.4. Workflow d'erreur global avec le nœud Error Trigger",
          "9.5. Travail pratique 6 : Gestion des pannes et alertes administrateur",
        ],
      },
    ],
  },
  {
    id: 'partie-10',
    number: 'PARTIE 10',
    title: "SÉCURITÉ ET VALIDATION HUMAINE",
    chapters: [
      {
        slug: 'chapitre-10',
        number: 10,
        title: "Sécurité des flux, moindre privilège et Human-in-the-Loop",
        subsections: [
          "10.1. Chiffrement et protection des credentials",
          "10.2. Application stricte du moindre privilège sur MySQL",
          "10.3. Confidentialité des données transmises à Gemini",
          "10.4. Validation humaine obligatoire (Human-in-the-loop)",
          "10.5. Exécuter un audit de sécurité natif n8n",
        ],
      },
    ],
  },
  {
    id: 'partie-11',
    number: 'PARTIE 11',
    title: "DÉPLOIEMENT DOCKER ET MISE À L'ÉCHELLE",
    chapters: [
      {
        slug: 'chapitre-11',
        number: 11,
        title: "Déploiement Docker, scalabilité et mode queue",
        subsections: [
          "11.1. Préparer une instance n8n pour la production",
          "11.2. Déploiement robuste avec Docker Compose et PostgreSQL",
          "11.3. Scalabilité horizontale : Le mode Queue avec Redis et Workers",
          "11.4. Sauvegardes et politiques de rétention des exécutions",
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
        title: "Projet de synthèse — Plateforme intelligente de support client",
        subsections: [
          "12.1. Présentation du projet",
          "12.2. Spécification des modules Frontend, Backend, n8n et MySQL",
          "12.3. Architecture logicielle complète de bout en bout",
          "12.4. Guide d'implémentation pas-à-pas",
          "12.5. Critères de réussite et validation finale",
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
        title: "Bonnes pratiques, évaluation des acquis & Annexes",
        subsections: [
          "13.1. Guide des bonnes pratiques professionnelles n8n",
          "13.2. Glossaire technique de l'automatisation",
          "ANNEXE 1 — Commandes essentielles",
          "ANNEXE 2 — Documentation officielle de référence",
          "Conclusion du Module 5 et transition vers le Module 6",
        ],
      },
    ],
  },
];

export function getAllModule5ChaptersFlat() {
  const list: { slug: string; title: string; part: string; number?: number }[] = [];
  for (const part of MODULE_5_PARTS) {
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

export function getModule5ChapterNavigation(currentSlug: string) {
  const flat = getAllModule5ChaptersFlat();
  const index = flat.findIndex((c) => c.slug === currentSlug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

