export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_5_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Découvrir la configuration des agents dans Google Antigravity",
    duration: '50 min',
    description: "Explorer les mécanismes de paramétrage de l'IDE : directives système, profils d'agents, injection de contexte et runtime.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Comprendre le rôle du fichier AGENTS.md",
    duration: '1 h',
    description: "Analyser le fichier pivot `AGENTS.md` : conventions de code, frontières architecturales et règles non négociables lues par les agents.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Définir les instructions générales du projet",
    duration: '55 min',
    description: "Rédiger le socle commun à tous les agents : stack technique imposée, normes de documentation et conformité aux standards de sécurité.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Rédiger les instructions propres à chaque agent",
    duration: '1 h 10',
    description: "Personnaliser les personas : instructions ciblées pour l'agent Backend (API REST, Zod), Frontend (composants Tailwind) et QA (tests Vitest).",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Distinguer les instructions permanentes et ponctuelles",
    duration: '50 min',
    description: "Séparer le cadre permanent (règles de dépôt dans AGENTS.md) des directives éphémères propres à une tâche spécifique dans le prompt.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Définir les responsabilités et les limites des agents",
    duration: '1 h',
    description: "Énoncer des interdictions explicites : pas de modification de configuration sans accord, interdiction de commit direct sur la branche principale.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Comprendre les autorisations et les accès",
    duration: '55 min',
    description: "Contrôler les permissions de lecture, d'écriture et d'exécution shell de chaque agent selon le principe de moindre privilège.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Organiser les priorités entre les différentes instructions",
    duration: '50 min',
    description: "Résoudre la hiérarchie en cas de conflit : priorité absolue des consignes utilisateur face aux règles de projet et aux réflexes par défaut du modèle.",
  },
  {
    slug: 'tp',
    number: 9,
    title: "TP de fin de module : Rédaction d'une suite d'instructions pour agents",
    duration: '1 h 30',
    description: "Préparer le fichier AGENTS.md et les profils spécialisés pour équiper une équipe de développement multi-agents.",
  },
];

