export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_3_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Comprendre le rôle de Git",
    duration: '45 min',
    description: "Comprendre pourquoi Git devient la clé de voûte de la sécurité et de la traçabilité lors des interventions d'agents automatisés.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Comprendre les dépôts et les versions d'un projet",
    duration: '50 min',
    description: "Explorer les structures internes de Git : objets blobs, trees, commits, snapshots immuables et pointeurs de références.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Comprendre les branches",
    duration: '55 min',
    description: "Maîtriser les branches légères de Git comme outils d'isolation radicale des modifications apportées par chaque agent.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Organiser les branches d'une équipe",
    duration: '1 h',
    description: "Définir une convention de nommage claire (`feat/agent-name-...`, `qa/...`) et organiser le flux de travail multi-branches.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Créer des commits et consulter l'historique",
    duration: '1 h',
    description: "Exiger des commits atomiques, des messages normalisés et apprendre à inspecter l'historique avec git log et diff.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Comprendre la fusion des branches (merge)",
    duration: '1 h',
    description: "Analyser la fusion en fast-forward vs merge commit 3-way et comprendre l'impact sur l'historique du projet.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Comprendre le rebase et les conflits",
    duration: '1 h 15',
    description: "Appréhender le rebase pour maintenir un historique linéaire et diagnostiquer les causes fondamentales des conflits de code.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Contrôler les modifications réalisées par les agents",
    duration: '1 h',
    description: "Méthodologie rigoureuse pour auditer chaque git diff avant d'autoriser une quelconque intégration.",
  },
  {
    slug: 'tp',
    number: 9,
    title: "TP de fin de module : Simulation de contributions Git multi-agents",
    duration: '1 h 30',
    description: "Mettre en place un dépôt Git avec plusieurs branches et simuler pas à pas le travail concurrent de plusieurs agents.",
  },
];

