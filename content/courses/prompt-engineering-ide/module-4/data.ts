export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const PROMPT_ENGINEERING_MODULE_4_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Différence entre un chatbot et un agent IA',
    duration: '2 h',
    description: "Comprendre la distinction fondamentale entre un modèle qui répond simplement et un agent doté d'outils capable d'agir dans un environnement de développement.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Architecture générale d'un agent IA",
    duration: '2 h 30',
    description: "Les composants interconnectés : instructions système, modèle LLM, contexte, planificateur, outils, autorisations et boucle d'observation/validation.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Compréhension du contexte du projet',
    duration: '2 h 30',
    description: "Les 5 dimensions du contexte (technique, structurel, fonctionnel, métier, contraintes), découverte par lecture ciblée et gestion des informations manquantes.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Planification des tâches',
    duration: '2 h 30',
    description: "Décomposer une mission complexe, identifier les dépendances et priorités, définir les critères de réussite et adapter le plan dynamiquement.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Utilisation des outils (Tools)',
    duration: '3 h',
    description: "Le mécanisme de Tool Calling / Function Calling : lecture, recherche, édition, terminal, outils externes, serveurs MCP et risques associés.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: 'Lecture et modification des fichiers',
    duration: '2 h 30',
    description: "Comprendre les relations entre fichiers (imports, exports, composants), modifications ciblées vs réécriture globale, contrôle du Diff et protection par Git.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: 'Utilisation du terminal',
    duration: '2 h',
    description: "Rôle du terminal et du shell, importance du répertoire de travail (cwd), commandes npm/Node.js courantes, gestion des variables d'environnement et risques.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: 'Exécution des commandes par un agent IA',
    duration: '2 h 30',
    description: "Le cycle d'exécution, stdout, stderr, code de retour (exit code), processus persistants, idempotence des requêtes et diagnostic méthodique des pannes.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: 'Validation des résultats par un agent IA',
    duration: '2 h 30',
    description: "Les 4 niveaux de validation (structurel, technique, fonctionnel, conformité), types de tests, critères d'acceptation et distinction résultat déclaré vs vérifié.",
  },
  {
    slug: 'chapitre-10',
    number: 10,
    title: "Interaction entre l'utilisateur et l'agent IA",
    duration: '2 h 30',
    description: "Questions de clarification, validation de plans, checkpoints, niveaux d'autonomie (observation, préparation, assisté, autonome), recadrage et comptes rendus.",
  },
  {
    slug: 'chapitre-11',
    number: 11,
    title: "Gestion des autorisations et des modes d'exécution",
    duration: '2 h 30',
    description: "Capacité vs autorisation vs instruction, principe du moindre privilège, sandbox, protection contre le prompt injection et politique de sécurité Antigravity.",
  },
  {
    slug: 'chapitre-12',
    number: 12,
    title: 'Projet pratique final — Créer et contrôler un agent IA dans Google Antigravity',
    duration: '4 h',
    description: "Mise en situation complète : configurer un agent contrôlé pour ajouter une recherche de projets dans un portfolio React sans initiative non autorisée.",
  },
];

