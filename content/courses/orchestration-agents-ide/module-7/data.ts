export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const ORCHESTRATION_MODULE_7_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Comprendre le rôle du Team Leader dans l'orchestration",
    duration: '50 min',
    description: "Explorer le rôle charnière de l'agent chef d'équipe : dispatching dynamique, suivi d'état et agrégation de synthèse.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Déléguer les missions aux agents spécialisés",
    duration: '55 min',
    description: "Initier le passage de relais avec clarté, injecter les dépendances nécessaires et vérifier la bonne réception de la mission.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Organiser le lancement des missions",
    duration: '50 min',
    description: "Établir l'ordre de démarrage : amorçage des tâches fondatrices puis déclenchement progressif des chantiers dépendants.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Coordonner les travaux séquentiels et parallèles",
    duration: '1 h 10',
    description: "Gérer l'asynchronisme : synchroniser les livrables d'équipes parallèles au point de convergence prévu.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Suivre l'avancement des missions",
    duration: '55 min',
    description: "Mettre en place un tableau d'état d'avancement des tâches et surveiller les métriques de progression des agents.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Gérer les conversations et les informations échangées",
    duration: '1 h',
    description: "Préserver l'hygiène des fenêtres de contexte : compacter les longs échanges pour éviter la dérive de cohérence.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Identifier et traiter les blocages",
    duration: '1 h',
    description: "Repérer les boucles infinies de tentative-erreur, isoler la cause du blocage et réorienter l'agent sans gaspiller de contexte.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Organiser les rapports et les livrables des agents",
    duration: '55 min',
    description: "Standardiser le format des comptes-rendus de fin de mission : résumé des changements, fichiers touchés et tests validés.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: "Déterminer quand le Project Manager doit intervenir",
    duration: '50 min',
    description: "Définir les critères d'escalade : arbitrages de fonctionnalités, modifications de dépendances tierces et doutes architecturaux.",
  },
  {
    slug: 'tp',
    number: 10,
    title: "TP de fin de module : Orchestration d'un sprint multi-agents",
    duration: '1 h 30',
    description: "Orchestrer en direct une équipe d'agents sur un ensemble de tâches interdépendantes et résoudre les points d'escalade.",
  },
];

