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

export const MODULE_4_PARTS: PartItem[] = [
  {
    id: 'partie-1',
    number: 'PARTIE 1',
    title: "COMPRENDRE LE RAG ET SES FONDAMENTAUX",
    chapters: [
      {
        slug: 'chapitre-1',
        number: 1,
        title: "Pourquoi avons-nous besoin du RAG ?",
        subsections: [
          "1.1. Les limites d'un modèle IA classique",
          "1.2. Définition du RAG (Retrieval-Augmented Generation)",
          "1.3. Exemple concret de recherche documentaire",
          "1.4. Différence entre génération classique et RAG",
          "1.5. Les trois composants fondamentaux : Embeddings, Base vectorielle, LLM",
        ],
      },
    ],
  },
  {
    id: 'partie-2',
    number: 'PARTIE 2',
    title: "ARCHITECTURE DOUBLE STOCKAGE : MYSQL ET QDRANT",
    chapters: [
      {
        slug: 'chapitre-2',
        number: 2,
        title: "Pourquoi utiliser deux systèmes de stockage complémentaires ?",
        subsections: [
          "2.1. Le rôle spécifique de MySQL (Relationnel & Métadonnées)",
          "2.2. Le rôle spécifique de Qdrant (Base vectorielle & Similarité)",
          "2.3. Comparaison détaillée MySQL vs Qdrant",
          "2.4. Pourquoi ne pas tout stocker dans la base vectorielle ?",
        ],
      },
    ],
  },
  {
    id: 'partie-3',
    number: 'PARTIE 3',
    title: "COMPRENDRE ET GÉNÉRER LES EMBEDDINGS",
    chapters: [
      {
        slug: 'chapitre-3',
        number: 3,
        title: "Transformer un texte en vecteur numérique avec Gemini",
        subsections: [
          "3.1. Comprendre la représentation vectorielle sémantique",
          "3.2. La similarité cosinus (formule et interprétation)",
          "3.3. Générer des embeddings avec le SDK officiel @google/genai",
          "3.4. Créer un service embedding.service.ts réutilisable",
          "3.5. Compatibilité stricte de dimension entre documents et requêtes",
        ],
      },
    ],
  },
  {
    id: 'partie-4',
    number: 'PARTIE 4',
    title: "INGESTION ET DÉCOUPAGE DOCUMENTAIRE (CHUNKING)",
    chapters: [
      {
        slug: 'chapitre-4',
        number: 4,
        title: "Extraction de texte et segmentation en fragments (Chunking)",
        subsections: [
          "4.1. Le pipeline d'ingestion documentaire",
          "4.2. Extraction de texte depuis un fichier PDF (pdf-parse)",
          "4.3. Nettoyage et normalisation du texte brut",
          "4.4. Pourquoi le découpage en fragments (chunks) est-il obligatoire ?",
          "4.5. Taille optimale et chevauchement (overlap)",
          "4.6. Implémenter le service splitIntoChunks",
        ],
      },
    ],
  },
  {
    id: 'partie-5',
    number: 'PARTIE 5',
    title: "INSTALLATION ET CONFIGURATION DE QDRANT",
    chapters: [
      {
        slug: 'chapitre-5',
        number: 5,
        title: "Découvrir Qdrant et configurer une collection vectorielle",
        subsections: [
          "5.1. Qu'est-ce que Qdrant ?",
          "5.2. Déploiement local avec Docker (ports 6333 et 6334)",
          "5.3. Installer et initialiser le client @qdrant/js-client-rest",
          "5.4. Créer et paramétrer une collection avec distance Cosine",
          "5.5. Vérification et inspection de la collection",
        ],
      },
    ],
  },
  {
    id: 'partie-6',
    number: 'PARTIE 6',
    title: "PERSISTANCE RELATIONNELLE ET VECTORIELLE",
    chapters: [
      {
        slug: 'chapitre-6',
        number: 6,
        title: "Concevoir les tables MySQL et insérer les points dans Qdrant",
        subsections: [
          "6.1. Structure SQL de la table documents",
          "6.2. Structure SQL de la table document_chunks",
          "6.3. Structure d'un point Qdrant (ID, Vecteur, Payload)",
          "6.4. Génération d'identifiants uniques avec uuid",
          "6.5. Implémenter le service d'insertion insertVector",
        ],
      },
    ],
  },
  {
    id: 'partie-7',
    number: 'PARTIE 7',
    title: "AUTOMATISATION DU PIPELINE D'INGESTION",
    chapters: [
      {
        slug: 'chapitre-7',
        number: 7,
        title: "Orchestrer l'indexation complète et gérer la résilience",
        subsections: [
          "7.1. Le workflow d'ingestion étape par étape",
          "7.2. Validation des fichiers côté serveur",
          "7.3. La boucle d'indexation chunks / embeddings / upsert",
          "7.4. Cohérence distribuée entre MySQL et Qdrant (statuts d'indexation)",
          "7.5. Gestion et reprise sur erreur d'indexation",
        ],
      },
    ],
  },
  {
    id: 'partie-8',
    number: 'PARTIE 8',
    title: "RECHERCHE VECTORIELLE SÉMANTIQUE",
    chapters: [
      {
        slug: 'chapitre-8',
        number: 8,
        title: "Effectuer une recherche de similarité et filtrer par utilisateur",
        subsections: [
          "8.1. Recherche lexicale (LIKE) vs Recherche sémantique vectorielle",
          "8.2. Les étapes de la recherche : question -> embedding -> Qdrant",
          "8.3. Implémenter searchSimilarChunks",
          "8.4. Isolation stricte des données : filtrage par user_id",
          "8.5. Comprendre et ajuster le paramètre Top K",
          "8.6. Appliquer un seuil minimal de pertinence (score cutoff)",
        ],
      },
    ],
  },
  {
    id: 'partie-9',
    number: 'PARTIE 9',
    title: "RÉCUPÉRATION DES PASSAGES DEPUIS MYSQL",
    chapters: [
      {
        slug: 'chapitre-9',
        number: 9,
        title: "Faire le lien entre les points Qdrant et les textes MySQL",
        subsections: [
          "9.1. Pourquoi récupérer le texte complet dans MySQL ?",
          "9.2. Extraction des chunk_id depuis les payloads Qdrant",
          "9.3. Requête SQL paramétrée avec clause WHERE id IN (?)",
          "9.4. Double vérification d'autorisation dans MySQL",
        ],
      },
    ],
  },
  {
    id: 'partie-10',
    number: 'PARTIE 10',
    title: "GÉNÉRATION AUGMENTÉE AVEC GOOGLE GEMINI",
    chapters: [
      {
        slug: 'chapitre-10',
        number: 10,
        title: "Construire le prompt RAG et générer des réponses ancrées",
        subsections: [
          "10.1. Structure d'un prompt RAG professionnel anti-hallucination",
          "10.2. Définir des consignes strictes d'ancrage documentaire",
          "10.3. Implémenter le service buildContext",
          "10.4. Implémenter generateRAGAnswer avec l'Interactions API",
          "10.5. Traitement du cas où l'information est absente",
        ],
      },
    ],
  },
  {
    id: 'partie-11',
    number: 'PARTIE 11',
    title: "CONSTRUIRE L'API REST RAG AVEC EXPRESS",
    chapters: [
      {
        slug: 'chapitre-11',
        number: 11,
        title: "Endpoints Express, validation Zod et tests Postman",
        subsections: [
          "11.1. Spécification des endpoints (/api/documents et /api/rag/ask)",
          "11.2. Schéma de validation Zod ragQuestionSchema",
          "11.3. Service d'orchestration askRAG",
          "11.4. Contrôleur et liaison des routes dans app.ts",
          "11.5. Tests complets avec Postman (succès, absence de sources, sécurité)",
        ],
      },
    ],
  },
  {
    id: 'partie-12',
    number: 'PARTIE 12',
    title: "TECHNIQUES AVANCÉES ET SÉCURITÉ DU RAG",
    chapters: [
      {
        slug: 'chapitre-12',
        number: 12,
        title: "Recherche hybride, reranking, injection indirecte et optimisation",
        subsections: [
          "12.1. Limites de la recherche purement vectorielle",
          "12.2. Recherche hybride (vectorielle + lexicale)",
          "12.3. Le Reranking de passages",
          "12.4. Réécriture contextuelle de requête",
          "12.5. Risques de sécurité : Injections de prompt indirectes dans les fichiers",
          "12.6. Suppression synchronisée et cohérente de documents",
          "12.7. Optimisation des coûts : batching des embeddings et mise en cache",
        ],
      },
    ],
  },
  {
    id: 'partie-13',
    number: 'PARTIE 13',
    title: "PROJET PRATIQUE FINAL DU MODULE",
    chapters: [
      {
        slug: 'projet-synthese',
        title: "Projet de synthèse — Assistant documentaire intelligent",
        subsections: [
          "13.1. Présentation du projet",
          "13.2. Fonctionnalités attendues (Documents, Recherche, Assistant)",
          "13.3. Architecture technique complète",
          "13.4. Organisation des fichiers et variables d'environnement",
          "13.5. Guide des 10 exercices pratiques",
          "13.6. Critères de validation et recette finale",
        ],
      },
    ],
  },
  {
    id: 'partie-14',
    number: 'PARTIE 14',
    title: "ÉVALUATION DES ACQUIS ET RESSOURCES",
    chapters: [
      {
        slug: 'evaluation',
        title: "Évaluation, bilan du RAG & Annexes",
        subsections: [
          "14.1. Évaluation théorique et compétences acquises",
          "ANNEXE 1 — Commandes essentielles",
          "ANNEXE 2 — Documentation officielle",
          "ANNEXE 3 — Vocabulaire technique de référence",
          "Conclusion du Module 4 et transition vers le Module 5",
        ],
      },
    ],
  },
];

export function getAllModule4ChaptersFlat() {
  const list: { slug: string; title: string; part: string; number?: number }[] = [];
  for (const part of MODULE_4_PARTS) {
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

export function getModule4ChapterNavigation(currentSlug: string) {
  const flat = getAllModule4ChaptersFlat();
  const index = flat.findIndex((c) => c.slug === currentSlug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

