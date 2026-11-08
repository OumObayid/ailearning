export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const DEBUGGING_MODULE_1_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: "Introduction à l'ingénierie du débogage",
    duration: '1 h 30',
    description: "Comprendre les principes fondamentaux de l'ingénierie du débogage, ses 4 grandes phases et l'esprit d'investigation technique.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: "Bug, erreur, anomalie et dysfonctionnement",
    duration: '1 h 45',
    description: "Distinguer avec rigueur ces quatre notions fondamentales et comprendre le concept essentiel de cause racine (root cause).",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: "Erreurs de syntaxe, logiques et d'exécution",
    duration: '2 h',
    description: "Classifier les trois grands types d'erreurs, comprendre leurs mécanismes d'apparition et construire un premier arbre de décision diagnostique.",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: "Les différentes catégories d'erreurs logicielles",
    duration: '2 h 15',
    description: "Cartographier les erreurs par domaine technique : code, configuration, données, réseau, base de données, intégration et sécurité.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: "Comprendre le cycle de vie d'une erreur",
    duration: '2 h',
    description: "Suivre un défaut de son introduction à sa clôture vérifiée : états de tickets Jira/GitHub, gestion des régressions et collaboration en équipe.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: "Reproduire une erreur de manière contrôlée",
    duration: '2 h 15',
    description: "Méthodologie en 7 étapes pour transformer un signalement vague en scénario reproductible, gestion des erreurs intermittentes et tests automatisés.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: "Identifier les symptômes et rechercher les causes",
    duration: '2 h 30',
    description: "Remonter la chaîne de causalité technique, méthode des 5 Pourquoi, diagramme d'Ishikawa et formulation d'hypothèses étayées par des preuves.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: "Méthodologie professionnelle de diagnostic",
    duration: '2 h 30',
    description: "Le protocole d'investigation en 10 étapes structurées, utilisation combinée des outils DevTools/VS Code/Postman/SQL et rédaction d'un rapport d'incident.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: "TP de synthèse : Diagnostic et rapport d'incident",
    duration: '3 h',
    description: "Mise en situation pratique sur une application complète multi-couches : observation, reproduction, isolation causale et production du livrable de diagnostic.",
  },
];

