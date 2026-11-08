export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const PROMPT_ENGINEERING_MODULE_6_CHAPTERS: ChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Le principe du moindre privilège',
    duration: '2 h',
    description: "Première notion fondamentale : accorder uniquement les permissions minimales nécessaires (PoLP), échelle des privilèges et distinction mission vs permission vs autorisation.",
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Protection du périmètre du projet',
    duration: '2 h 30',
    description: "Sécurisation de l'espace de travail : interdire l'exploration des dossiers parents, des projets voisins et des documents personnels, et gérer les manques sans fuite de périmètre.",
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'Contrôle des accès aux fichiers',
    duration: '2 h 30',
    description: "Définir les fichiers consultables, modifiables et interdits via des listes blanches (Allowlist), matrices d'accès et filtrage de motifs (patterns).",
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'Autorisation de lecture et d’écriture',
    duration: '2 h',
    description: "La frontière vitale entre Read et Write : les 4 niveaux d'autorisation, la différence entre proposer du code et modifier un fichier, et la limitation temporelle des accords.",
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Protection des variables d’environnement',
    duration: '2 h 30',
    description: "Sanctuarisation de .env et de ses variantes : analyser process.env sans révéler les valeurs réelles, rôle de .env.example et limites de .gitignore.",
  },
  {
    slug: 'chapitre-6',
    number: 6,
    title: 'Protection des clés API',
    duration: '2 h 30',
    description: "Empêcher la fuite de clés secrètes (Gemini, Stripe) : architecture backend étanche, interdiction d'exposition dans React et console.log, et rotation de clés compromises.",
  },
  {
    slug: 'chapitre-7',
    number: 7,
    title: 'Sécurité des commandes terminal',
    duration: '2 h 30',
    description: "Les 5 catégories de commandes, détection des instructions destructives (Remove-Item, rm -rf, curl | bash), analyse des commandes composées et validation préalable.",
  },
  {
    slug: 'chapitre-8',
    number: 8,
    title: 'Prompt Injection',
    duration: '2 h 30',
    description: "Attaques directes et indirectes : comment des consignes malveillantes dissimulées tentent de détourner le modèle, et règles d'étanchéité absolue entre données et instructions.",
  },
  {
    slug: 'chapitre-9',
    number: 9,
    title: 'Instructions malveillantes dans les fichiers',
    duration: '2 h 30',
    description: "Repérer les pièges glissés dans les README, commentaires JavaScript ou fichiers JSON : techniques de dissimulation et traitement comme donnée passive non exécutable.",
  },
  {
    slug: 'chapitre-10',
    number: 10,
    title: 'Validation humaine avant les actions sensibles',
    duration: '2 h 30',
    description: "Le principe Human-in-the-Loop (HITL) : les 4 phases d'une action contrôlée, interdiction d'élargir une autorisation et gestion des points de blocage.",
  },
  {
    slug: 'chapitre-11',
    number: 11,
    title: 'Journalisation et traçabilité',
    duration: '2 h 30',
    description: "Enregistrer les événements en format JSON structuré : distinguer le déclaré de l'exécuté, tracer les refus et auditer les incidents de sécurité sans journaliser de secrets.",
  },
  {
    slug: 'chapitre-12',
    number: 12,
    title: 'Projet intégrateur — Création d’un agent IA sécurisé dans Google Antigravity',
    duration: '4 h',
    description: "Projet intégral de synthèse : configurer et auditer un agent selon les 8 objectifs de sécurité, exécuter la batterie de 7 épreuves de stress et homologuer sur 100 points.",
  },
];

