export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_4_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Comprendre le fonctionnement de Git Worktrees",
    duration: '50 min',
    description: "Découvrir la commande `git worktree` : un seul dossier `.git` partagé mais plusieurs répertoires de travail physiques simultanés.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Comprendre la différence entre une branche et un Worktree",
    duration: '45 min',
    description: "Distinguer le pointeur de branche virtuel de l'arbre de travail monté sur le système de fichiers pour un agent indépendant.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Comprendre le lien entre agent, conversation, branche et espace de travail",
    duration: '1 h',
    description: "Aligner la quadruple association : 1 agent = 1 session IDE = 1 branche dédiée = 1 répertoire Worktree isolé.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Créer un Worktree",
    duration: '50 min',
    description: "Manipuler la syntaxe `git worktree add` : rattachement à une branche existante ou création automatique d'une nouvelle branche.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Associer un agent à son espace de travail",
    duration: '1 h',
    description: "Configurer le workspace d'un agent dans l'IDE pour le restreindre exclusivement à son sous-répertoire Worktree assigné.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Organiser plusieurs travaux en parallèle",
    duration: '1 h',
    description: "Coordonner l'exécution simultanée d'un agent Backend et d'un agent Frontend sur deux Worktrees séparés sans interférence.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Gérer les modifications et les conflits entre espaces de travail",
    duration: '1 h 15',
    description: "Gérer le rafraîchissement des branches partagées et anticiper les divergences entre Worktrees actifs.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Entretenir et supprimer les Worktrees",
    duration: '50 min',
    description: "Nettoyer proprement les environnements de travail avec `git worktree remove` et `git worktree prune` après achèvement de mission.",
  },
  {
    slug: 'tp',
    number: 9,
    title: "TP de fin de module : Isolation complète par Git Worktrees",
    duration: '1 h 30',
    description: "Organiser plusieurs espaces de travail Git pour simuler le développement parallèle et sans collision par plusieurs agents.",
  },
];

