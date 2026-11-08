import { getAllChaptersFlat as getModule1Chapters, getChapterNavigation as getModule1Nav } from './module1Data';
import { getAllModule2ChaptersFlat as getModule2Chapters, getModule2ChapterNavigation as getModule2Nav } from './module2Data';
import { getAllModule3ChaptersFlat as getModule3Chapters, getModule3ChapterNavigation as getModule3Nav } from './module3Data';
import { getAllModule4ChaptersFlat as getModule4Chapters, getModule4ChapterNavigation as getModule4Nav } from './module4Data';
import { getAllModule5ChaptersFlat as getModule5Chapters, getModule5ChapterNavigation as getModule5Nav } from './module5Data';
import { getAllModule6ChaptersFlat as getModule6Chapters, getModule6ChapterNavigation as getModule6Nav } from './module6Data';
import { getAllModule7ChaptersFlat as getModule7Chapters, getModule7ChapterNavigation as getModule7Nav } from './module7Data';
import { getAllModule8ChaptersFlat as getModule8Chapters, getModule8ChapterNavigation as getModule8Nav } from './module8Data';
import { AI_ENGINEERING_CHAPTER_META } from './aiEngineeringChapterMeta';
import { DEBUGGING_MODULE_1_CHAPTERS } from '@/content/courses/debugging/module-1/data';
import { DEBUGGING_MODULE_2_CHAPTERS } from '@/content/courses/debugging/module-2/data';
import { DEBUGGING_MODULE_3_CHAPTERS } from '@/content/courses/debugging/module-3/data';
import { DEBUGGING_MODULE_4_CHAPTERS } from '@/content/courses/debugging/module-4/data';
import { DEBUGGING_MODULE_6_CHAPTERS } from '@/content/courses/debugging/module-6/data';
import { DEBUGGING_MODULE_7_CHAPTERS } from '@/content/courses/debugging/module-7/data';
import { DEBUGGING_MODULE_8_CHAPTERS } from '@/content/courses/debugging/module-8/data';

export interface FlatChapter {
  slug: string;
  title: string;
  part: string;
  number?: number;
  duration?: string;
  description?: string;
}

export function getChaptersForModule(moduleId: string): FlatChapter[] {
  const normalized = moduleId.toLowerCase();

  switch (normalized) {
    case 'module-1': {
      const meta = AI_ENGINEERING_CHAPTER_META['module-1'];
      return getModule1Chapters().map((c) => ({
        ...c,
        duration: meta?.[c.slug]?.duration,
        description: meta?.[c.slug]?.description,
      }));
    }
    case 'module-2': {
      const meta = AI_ENGINEERING_CHAPTER_META['module-2'];
      return getModule2Chapters().map((c) => ({
        ...c,
        duration: meta?.[c.slug]?.duration,
        description: meta?.[c.slug]?.description,
      }));
    }
    case 'module-3': {
      const meta = AI_ENGINEERING_CHAPTER_META['module-3'];
      return getModule3Chapters().map((c) => ({
        ...c,
        duration: meta?.[c.slug]?.duration,
        description: meta?.[c.slug]?.description,
      }));
    }
    case 'module-4': {
      const meta = AI_ENGINEERING_CHAPTER_META['module-4'];
      return getModule4Chapters().map((c) => ({
        ...c,
        duration: meta?.[c.slug]?.duration,
        description: meta?.[c.slug]?.description,
      }));
    }
    case 'module-5': {
      const meta = AI_ENGINEERING_CHAPTER_META['module-5'];
      return getModule5Chapters().map((c) => ({
        ...c,
        duration: meta?.[c.slug]?.duration,
        description: meta?.[c.slug]?.description,
      }));
    }
    case 'module-6': {
      const meta = AI_ENGINEERING_CHAPTER_META['module-6'];
      return getModule6Chapters().map((c) => ({
        ...c,
        duration: meta?.[c.slug]?.duration,
        description: meta?.[c.slug]?.description,
      }));
    }
    case 'module-7': {
      const meta = AI_ENGINEERING_CHAPTER_META['module-7'];
      return getModule7Chapters().map((c) => ({
        ...c,
        duration: meta?.[c.slug]?.duration,
        description: meta?.[c.slug]?.description,
      }));
    }
    case 'module-8': {
      const meta = AI_ENGINEERING_CHAPTER_META['module-8'];
      return getModule8Chapters().map((c) => ({
        ...c,
        duration: meta?.[c.slug]?.duration,
        description: meta?.[c.slug]?.description,
      }));
    }
    case 'prompt-engineering-module-1':
      return [
        {
          slug: 'chapitre-1',
          title: 'Prompt, instruction, contexte et commande',
          part: 'Module 1 • Fondamentaux avancés',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: "Anatomie d'un prompt professionnel",
          part: 'Module 1 • Fondamentaux avancés',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Rôle, objectif, contraintes et résultats attendus',
          part: 'Module 1 • Fondamentaux avancés',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Tokens et fenêtre de contexte',
          part: 'Module 1 • Fondamentaux avancés',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Instructions positives et négatives',
          part: 'Module 1 • Fondamentaux avancés',
          number: 5,
        },
        {
          slug: 'chapitre-6',
          title: 'Gestion des ambiguïtés',
          part: 'Module 1 • Fondamentaux avancés',
          number: 6,
        },
        {
          slug: 'chapitre-7',
          title: 'Gestion des contradictions',
          part: 'Module 1 • Fondamentaux avancés',
          number: 7,
        },
        {
          slug: 'chapitre-8',
          title: 'Instructions permanentes et ponctuelles',
          part: 'Module 1 • Fondamentaux avancés',
          number: 8,
        },
        {
          slug: 'chapitre-9',
          title: 'Demander une réponse ou demander une action',
          part: 'Module 1 • Fondamentaux avancés',
          number: 9,
        },
      ];
    case 'prompt-engineering-module-2':
      return [
        {
          slug: 'chapitre-1',
          title: "Qu'est-ce qu'une instruction principale ?",
          part: 'Module 2 • Architecture des instructions',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Instructions globales et instructions propres au projet',
          part: 'Module 2 • Architecture des instructions',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: "Définition du rôle et de l'identité fonctionnelle",
          part: 'Module 2 • Architecture des instructions',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Définition des responsabilités',
          part: 'Module 2 • Architecture des instructions',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: "Définition des limites d'intervention",
          part: 'Module 2 • Architecture des instructions',
          number: 5,
        },
        {
          slug: 'chapitre-6',
          title: 'Gestion des fichiers autorisés et interdits',
          part: 'Module 2 • Architecture des instructions',
          number: 6,
        },
        {
          slug: 'chapitre-7',
          title: "Règles de communication avec l'utilisateur",
          part: 'Module 2 • Architecture des instructions',
          number: 7,
        },
        {
          slug: 'chapitre-8',
          title: "Conditions d'autorisation avant exécution",
          part: 'Module 2 • Architecture des instructions',
          number: 8,
        },
        {
          slug: 'chapitre-9',
          title: 'Format des réponses et des rapports',
          part: 'Module 2 • Architecture des instructions',
          number: 9,
        },
        {
          slug: 'chapitre-10',
          title: 'Gestion des exceptions et des situations imprévues',
          part: 'Module 2 • Architecture des instructions',
          number: 10,
        },
        {
          slug: 'chapitre-11',
          title: 'TP 2.1 — Conception des instructions principales (Agent Analyste)',
          part: 'Module 2 • Projet fil rouge',
          number: 11,
        },
        {
          slug: 'chapitre-12',
          title: "TP 2.2 — Création et configuration dans Antigravity",
          part: 'Module 2 • Projet fil rouge',
          number: 12,
        },
        {
          slug: 'chapitre-13',
          title: 'TP 2.3 — Tests de résistance et de sécurité (10 scénarios)',
          part: 'Module 2 • Projet fil rouge',
          number: 13,
        },
        {
          slug: 'chapitre-14',
          title: 'TP 2.4 — Audit final, gestion des risques et validation',
          part: 'Module 2 • Projet fil rouge',
          number: 14,
        },
      ];
    case 'prompt-engineering-module-3':
      return [
        {
          slug: 'chapitre-1',
          title: 'Zero-shot Prompting',
          part: 'Module 3 • Techniques avancées',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Few-shot Prompting',
          part: 'Module 3 • Techniques avancées',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Chain of Thought et raisonnement structuré',
          part: 'Module 3 • Techniques avancées',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Prompt Decomposition',
          part: 'Module 3 • Techniques avancées',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Role Prompting',
          part: 'Module 3 • Techniques avancées',
          number: 5,
        },
        {
          slug: 'chapitre-6',
          title: 'Contextual Prompting',
          part: 'Module 3 • Techniques avancées',
          number: 6,
        },
        {
          slug: 'chapitre-7',
          title: 'Structured Prompting',
          part: 'Module 3 • Techniques avancées',
          number: 7,
        },
        {
          slug: 'chapitre-8',
          title: 'Meta-Prompting',
          part: 'Module 3 • Techniques avancées',
          number: 8,
        },
        {
          slug: 'chapitre-9',
          title: 'Self-critique et vérification',
          part: 'Module 3 • Techniques avancées',
          number: 9,
        },
        {
          slug: 'chapitre-10',
          title: 'Prompt Chaining',
          part: 'Module 3 • Techniques avancées',
          number: 10,
        },
        {
          slug: 'chapitre-11',
          title: 'Gestion des erreurs et des incertitudes',
          part: 'Module 3 • Techniques avancées',
          number: 11,
        },
        {
          slug: 'chapitre-12',
          title: "Projet intégrateur — Agent IA professionnel dans Google Antigravity",
          part: 'Module 3 • Projet intégrateur',
          number: 12,
        },
      ];
    case 'prompt-engineering-module-4':
      return [
        {
          slug: 'chapitre-1',
          title: 'Différence entre un chatbot et un agent IA',
          part: 'Module 4 • Fonctionnement des agents',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: "Architecture générale d'un agent IA",
          part: 'Module 4 • Fonctionnement des agents',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Compréhension du contexte du projet',
          part: 'Module 4 • Fonctionnement des agents',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Planification des tâches',
          part: 'Module 4 • Fonctionnement des agents',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Utilisation des outils (Tools)',
          part: 'Module 4 • Fonctionnement des agents',
          number: 5,
        },
        {
          slug: 'chapitre-6',
          title: 'Lecture et modification des fichiers',
          part: 'Module 4 • Fonctionnement des agents',
          number: 6,
        },
        {
          slug: 'chapitre-7',
          title: 'Utilisation du terminal',
          part: 'Module 4 • Fonctionnement des agents',
          number: 7,
        },
        {
          slug: 'chapitre-8',
          title: 'Exécution des commandes par un agent IA',
          part: 'Module 4 • Fonctionnement des agents',
          number: 8,
        },
        {
          slug: 'chapitre-9',
          title: 'Validation des résultats par un agent IA',
          part: 'Module 4 • Fonctionnement des agents',
          number: 9,
        },
        {
          slug: 'chapitre-10',
          title: "Interaction entre l'utilisateur et l'agent IA",
          part: 'Module 4 • Fonctionnement des agents',
          number: 10,
        },
        {
          slug: 'chapitre-11',
          title: "Gestion des autorisations et des modes d'exécution",
          part: 'Module 4 • Fonctionnement des agents',
          number: 11,
        },
        {
          slug: 'chapitre-12',
          title: 'Projet pratique final — Créer et contrôler un agent IA dans Google Antigravity',
          part: 'Module 4 • Projet intégrateur',
          number: 12,
        },
      ];
    case 'prompt-engineering-module-5':
      return [
        {
          slug: 'chapitre-1',
          title: 'Comprendre le principe des agents IA spécialisés',
          part: 'Module 5 • Agents spécialisés',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Concevoir les instructions principales de chaque agent spécialisé',
          part: 'Module 5 • Agents spécialisés',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Définir les responsabilités et éviter les chevauchements entre agents',
          part: 'Module 5 • Agents spécialisés',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Organiser la collaboration et la communication entre agents IA',
          part: 'Module 5 • Agents spécialisés',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Créer et configurer concrètement des agents spécialisés dans Google Antigravity',
          part: 'Module 5 • Agents spécialisés',
          number: 5,
        },
        {
          slug: 'chapitre-6',
          title: 'Tester, évaluer et améliorer les agents spécialisés',
          part: 'Module 5 • Agents spécialisés',
          number: 6,
        },
        {
          slug: 'chapitre-7',
          title: 'Orchestration avancée : construire une équipe d’agents IA',
          part: 'Module 5 • Orchestration & Multi-agents',
          number: 7,
        },
        {
          slug: 'chapitre-8',
          title: 'Projet pratique : construire et coordonner une équipe de six agents spécialisés dans Google Antigravity',
          part: 'Module 5 • Projet de synthèse',
          number: 8,
        },
      ];
    case 'prompt-engineering-module-6':
      return [
        {
          slug: 'chapitre-1',
          title: 'Le principe du moindre privilège',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Protection du périmètre du projet',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Contrôle des accès aux fichiers',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Autorisation de lecture et d’écriture',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Protection des variables d’environnement',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 5,
        },
        {
          slug: 'chapitre-6',
          title: 'Protection des clés API',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 6,
        },
        {
          slug: 'chapitre-7',
          title: 'Sécurité des commandes terminal',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 7,
        },
        {
          slug: 'chapitre-8',
          title: 'Prompt Injection',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 8,
        },
        {
          slug: 'chapitre-9',
          title: 'Instructions malveillantes dans les fichiers',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 9,
        },
        {
          slug: 'chapitre-10',
          title: 'Validation humaine avant les actions sensibles',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 10,
        },
        {
          slug: 'chapitre-11',
          title: 'Journalisation et traçabilité',
          part: 'Module 6 • Sécurité & Gouvernance',
          number: 11,
        },
        {
          slug: 'chapitre-12',
          title: 'Projet intégrateur — Création d’un agent IA sécurisé dans Google Antigravity',
          part: 'Module 6 • Projet intégrateur',
          number: 12,
        },
      ];
    case 'prompt-engineering-module-7':
      return [
        {
          slug: 'chapitre-1',
          title: "Identifier les causes d'un mauvais résultat",
          part: 'Module 7 • Pilotage & Optimisation',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Déboguer un prompt',
          part: 'Module 7 • Pilotage & Optimisation',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Réduire les ambiguïtés',
          part: 'Module 7 • Pilotage & Optimisation',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Améliorer la gestion du contexte',
          part: 'Module 7 • Pilotage & Optimisation',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Éviter les instructions redondantes',
          part: 'Module 7 • Pilotage & Optimisation',
          number: 5,
        },
        {
          slug: 'chapitre-6',
          title: 'Détecter les hallucinations',
          part: 'Module 7 • Pilotage & Optimisation',
          number: 6,
        },
        {
          slug: 'chapitre-7',
          title: "Construire des critères d'évaluation",
          part: 'Module 7 • Pilotage & Optimisation',
          number: 7,
        },
        {
          slug: 'chapitre-8',
          title: 'Mesurer la conformité des résultats',
          part: 'Module 7 • Pilotage & Optimisation',
          number: 8,
        },
        {
          slug: 'chapitre-9',
          title: 'Gérer les tâches longues',
          part: 'Module 7 • Pilotage & Optimisation',
          number: 9,
        },
        {
          slug: 'chapitre-10',
          title: 'Optimiser les instructions principales',
          part: 'Module 7 • Pilotage & Optimisation',
          number: 10,
        },
      ];
    case 'prompt-engineering-module-8':
      return [
        {
          slug: 'chapitre-1',
          title: 'Définir le projet final et son cahier des charges',
          part: 'Module 8 • Projet final professionnel',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: "Concevoir l'architecture globale du système multi-agents",
          part: 'Module 8 • Projet final professionnel',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: "Créer les instructions principales de l'agent coordinateur",
          part: 'Module 8 • Projet final professionnel',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Créer les quatre agents spécialisés',
          part: 'Module 8 • Projet final professionnel',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Définir les règles de communication et de délégation',
          part: 'Module 8 • Projet final professionnel',
          number: 5,
        },
        {
          slug: 'chapitre-6',
          title: 'Mettre en place la politique de sécurité et les permissions',
          part: 'Module 8 • Projet final professionnel',
          number: 6,
        },
        {
          slug: 'chapitre-7',
          title: 'Organiser le cycle de développement React + Node.js',
          part: 'Module 8 • Projet final professionnel',
          number: 7,
        },
        {
          slug: 'chapitre-8',
          title: 'Construire les prompts professionnels réutilisables',
          part: 'Module 8 • Projet final professionnel',
          number: 8,
        },
        {
          slug: 'chapitre-9',
          title: 'Tester, évaluer et corriger le système multi-agents',
          part: 'Module 8 • Projet final professionnel',
          number: 9,
        },
        {
          slug: 'chapitre-10',
          title: 'Réaliser la démonstration finale dans Antigravity',
          part: 'Module 8 • Projet final professionnel',
          number: 10,
        },
      ];
    case 'backend-ia-module-1':
      return [
        {
          slug: 'chapitre-1',
          title: 'Mémoire (RAM), Stack, Heap et Event Loop avec Node.js',
          part: 'Module 1 • Fondations Système',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: "Event Loop, phases d'exécution, Microtasks et Macrotasks",
          part: 'Module 1 • Fondations Système',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Programmation synchrone, asynchrone et opérations non bloquantes',
          part: 'Module 1 • Fondations Système',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Gestion de la mémoire, Garbage Collector, fuites et optimisation',
          part: 'Module 1 • Fondations Système',
          number: 4,
        },
      ];
    case 'backend-ia-module-2':
      return [
        {
          slug: 'chapitre-1',
          title: 'Processus, threads et fonctionnement du thread principal',
          part: 'Module 2 • Concurrence & Multithreading',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Web Workers et Worker Threads',
          part: 'Module 2 • Concurrence & Multithreading',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Communication entre threads — messages et données',
          part: 'Module 2 • Concurrence & Multithreading',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Transfert de données et SharedArrayBuffer',
          part: 'Module 2 • Concurrence & Multithreading',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Traitements CPU intensifs et optimisation des performances',
          part: 'Module 2 • Concurrence & Multithreading',
          number: 5,
        },
      ];
    case 'backend-ia-module-3':
      return [
        {
          slug: 'chapitre-1',
          title: 'Fonctionnement du HTTP et cycle requête/réponse',
          part: 'Module 3 • Communication Temps Réel',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Le Polling — Interroger régulièrement un serveur',
          part: 'Module 3 • Communication Temps Réel',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'WebSocket — Communication bidirectionnelle en temps réel',
          part: 'Module 3 • Communication Temps Réel',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'SSE (Server-Sent Events) — Communication en flux continu',
          part: 'Module 3 • Communication Temps Réel',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Streaming des réponses IA vers React avec Gemini',
          part: 'Module 3 • Communication Temps Réel',
          number: 5,
        },
      ];
    case 'backend-ia-module-4':
      return [
        {
          slug: 'chapitre-1',
          title: 'Fonctionnement des index SQL et structures B+Tree',
          part: 'Module 4 • Bases de Données & Optimisation SQL',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Index simples, uniques et composites (Règle du préfixe gauche)',
          part: 'Module 4 • Bases de Données & Optimisation SQL',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Analyse des requêtes avec EXPLAIN et EXPLAIN ANALYZE',
          part: 'Module 4 • Bases de Données & Optimisation SQL',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Optimisation des recherches, LIKE et pagination par curseur',
          part: 'Module 4 • Bases de Données & Optimisation SQL',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Gestion des connexions, pool de connexions et transactions SQL',
          part: 'Module 4 • Bases de Données & Optimisation SQL',
          number: 5,
        },
      ];
    case 'backend-ia-module-5':
      return [
        {
          slug: 'chapitre-1',
          title: 'Comprendre le cache et ses avantages en Backend IA',
          part: 'Module 5 • Cache, Redis & Rate Limiting',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Redis — Installation, commandes clés et connexion Node.js',
          part: 'Module 5 • Cache, Redis & Rate Limiting',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Cache avec expiration (TTL) et invalidation de données',
          part: 'Module 5 • Cache, Redis & Rate Limiting',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Mise en cache des résultats d’inférence de Google Gemini',
          part: 'Module 5 • Cache, Redis & Rate Limiting',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Rate Limiting et protection des quotas d’appels API',
          part: 'Module 5 • Cache, Redis & Rate Limiting',
          number: 5,
        },
      ];
    case 'backend-ia-module-6':
      return [
        {
          slug: 'chapitre-1',
          title: 'Comprendre WebAssembly (WASM) et son exécution binaire',
          part: 'Module 6 • WebAssembly & WebGPU',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Différence entre JavaScript et WebAssembly — Benchmark & Performances',
          part: 'Module 6 • WebAssembly & WebGPU',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Introduction à WebGPU — Architecture matérielle et premier shader WGSL',
          part: 'Module 6 • WebAssembly & WebGPU',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Calculs GPU parallèles dans le navigateur — Workgroups & Benchmarks',
          part: 'Module 6 • WebAssembly & WebGPU',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Exécution locale de modèles d’IA dans le navigateur (Transformers.js & ONNX)',
          part: 'Module 6 • WebAssembly & WebGPU',
          number: 5,
        },
      ];
    case 'backend-ia-module-7':
      return [
        {
          slug: 'chapitre-1',
          title: 'Analyse des besoins et conception de l’architecture',
          part: 'Module 7 • Projet Final : Backend IA Optimisé',
          number: 1,
        },
        {
          slug: 'chapitre-2',
          title: 'Initialisation et organisation du projet Node.js / Express',
          part: 'Module 7 • Projet Final : Backend IA Optimisé',
          number: 2,
        },
        {
          slug: 'chapitre-3',
          title: 'Conception et intégration de la base de données MySQL',
          part: 'Module 7 • Projet Final : Backend IA Optimisé',
          number: 3,
        },
        {
          slug: 'chapitre-4',
          title: 'Intégration de Google Gemini dans le Backend',
          part: 'Module 7 • Projet Final : Backend IA Optimisé',
          number: 4,
        },
        {
          slug: 'chapitre-5',
          title: 'Streaming des réponses IA avec Server-Sent Events (SSE)',
          part: 'Module 7 • Projet Final : Backend IA Optimisé',
          number: 5,
        },
        {
          slug: 'chapitre-6',
          title: 'Traitements parallèles avec Worker Threads',
          part: 'Module 7 • Projet Final : Backend IA Optimisé',
          number: 6,
        },
        {
          slug: 'chapitre-7',
          title: 'Optimisation des performances avec Redis',
          part: 'Module 7 • Projet Final : Backend IA Optimisé',
          number: 7,
        },
        {
          slug: 'chapitre-8',
          title: 'Développement de l’interface utilisateur avec React',
          part: 'Module 7 • Projet Final : Backend IA Optimisé',
          number: 8,
        },
        {
          slug: 'chapitre-9',
          title: 'Tests, débogage et optimisation globale de l’application',
          part: 'Module 7 • Projet Final : Backend IA Optimisé',
          number: 9,
        },
      ];
    case 'debugging-module-1':
      return DEBUGGING_MODULE_1_CHAPTERS.map((ch) => ({
        slug: ch.slug,
        title: ch.title,
        part: 'Module 1 • Fondamentaux de l\'ingénierie du débogage',
        number: ch.number,
        duration: ch.duration,
        description: ch.description,
      }));
    case 'debugging-module-2':
      return DEBUGGING_MODULE_2_CHAPTERS.map((ch) => ({
        slug: ch.slug,
        title: ch.title,
        part: 'Module 2 • Techniques et outils fondamentaux de débogage',
        number: ch.number,
        duration: ch.duration,
        description: ch.description,
      }));
    case 'debugging-module-3':
      return DEBUGGING_MODULE_3_CHAPTERS.map((ch) => ({
        slug: ch.slug,
        title: ch.title,
        part: 'Module 3 • Débogage JavaScript et Node.js',
        number: ch.number,
        duration: ch.duration,
        description: ch.description,
      }));
    case 'debugging-module-4':
      return DEBUGGING_MODULE_4_CHAPTERS.map((ch) => ({
        slug: ch.slug,
        title: ch.title,
        part: 'Module 4 • Débogage des API et des systèmes Backend',
        number: ch.number,
        duration: ch.duration,
        description: ch.description,
      }));
    case 'debugging-module-6':
      return DEBUGGING_MODULE_6_CHAPTERS.map((ch) => ({
        slug: ch.slug,
        title: ch.title,
        part: 'Module 6 • Débogage avancé, performances et sécurité',
        number: ch.number,
        duration: ch.duration,
        description: ch.description,
      }));
    case 'debugging-module-7':
      return DEBUGGING_MODULE_7_CHAPTERS.map((ch) => ({
        slug: ch.slug,
        title: ch.title,
        part: 'Module 7 • Ingénierie du débogage assistée par IA',
        number: ch.number,
        duration: ch.duration,
        description: ch.description,
      }));
    case 'debugging-module-8':
      return DEBUGGING_MODULE_8_CHAPTERS.map((ch) => ({
        slug: ch.slug,
        title: ch.title,
        part: 'Module 8 • Projet final : Audit et remédiation',
        number: ch.number,
        duration: ch.duration,
        description: ch.description,
      }));
    default:
      return [];
  }
}

export function getChapterNavigationForModule(moduleId: string, slug: string) {
  switch (moduleId.toLowerCase()) {
    case 'backend-ia-module-7': {
      const chapters = getChaptersForModule('backend-ia-module-7');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'backend-ia-module-6': {
      const chapters = getChaptersForModule('backend-ia-module-6');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'backend-ia-module-5': {
      const chapters = getChaptersForModule('backend-ia-module-5');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'backend-ia-module-4': {
      const chapters = getChaptersForModule('backend-ia-module-4');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'backend-ia-module-3': {
      const chapters = getChaptersForModule('backend-ia-module-3');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'backend-ia-module-2': {
      const chapters = getChaptersForModule('backend-ia-module-2');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'prompt-engineering-module-8': {
      const chapters = getChaptersForModule('prompt-engineering-module-8');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'prompt-engineering-module-7': {
      const chapters = getChaptersForModule('prompt-engineering-module-7');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'prompt-engineering-module-6': {
      const chapters = getChaptersForModule('prompt-engineering-module-6');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'prompt-engineering-module-5': {
      const chapters = getChaptersForModule('prompt-engineering-module-5');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'prompt-engineering-module-4': {
      const chapters = getChaptersForModule('prompt-engineering-module-4');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'prompt-engineering-module-3': {
      const chapters = getChaptersForModule('prompt-engineering-module-3');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'prompt-engineering-module-2': {
      const chapters = getChaptersForModule('prompt-engineering-module-2');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'prompt-engineering-module-1': {
      const chapters = getChaptersForModule('prompt-engineering-module-1');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'backend-ia-module-1': {
      const chapters = getChaptersForModule('backend-ia-module-1');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'module-1':
      return getModule1Nav(slug);
    case 'module-2':
      return getModule2Nav(slug);
    case 'module-3':
      return getModule3Nav(slug);
    case 'module-4':
      return getModule4Nav(slug);
    case 'module-5':
      return getModule5Nav(slug);
    case 'module-6':
      return getModule6Nav(slug);
    case 'module-7':
      return getModule7Nav(slug);
    case 'module-8':
      return getModule8Nav(slug);
    case 'debugging-module-1': {
      const chapters = getChaptersForModule('debugging-module-1');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'debugging-module-2': {
      const chapters = getChaptersForModule('debugging-module-2');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'debugging-module-3': {
      const chapters = getChaptersForModule('debugging-module-3');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'debugging-module-4': {
      const chapters = getChaptersForModule('debugging-module-4');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'debugging-module-6': {
      const chapters = getChaptersForModule('debugging-module-6');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'debugging-module-7': {
      const chapters = getChaptersForModule('debugging-module-7');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    case 'debugging-module-8': {
      const chapters = getChaptersForModule('debugging-module-8');
      const idx = chapters.findIndex((c) => c.slug === slug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
      };
    }
    default:
      return { prev: null, next: null };
  }
}

