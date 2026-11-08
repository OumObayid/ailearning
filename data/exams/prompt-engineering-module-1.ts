import { ExamMetadata, ExamQuestion } from './types';

export const PROMPT_ENGINEERING_MODULE_1_EXAM_METADATA: ExamMetadata = {
  moduleId: 'prompt-engineering-module-1',
  title: "Examen Officiel de Certification — Module 1 : Fondamentaux du Prompt Engineering & Pilotage d'Agents dans les IDE",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (32/40)
  totalQuestions: 40,
};

export const PROMPT_ENGINEERING_MODULE_1_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Concepts Fondamentaux (Prompt, Instruction, Contexte, Commande)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Dans le cadre de l'ingénierie de prompt appliquée aux agents de développement dans un IDE, quelle est la distinction fondamentale entre un 'Prompt' et une 'Instruction' ?",
    options: [
      { letter: 'A', text: "Le prompt désigne l'ensemble du flux d'entrée envoyé au modèle, tandis que l'instruction est la directive spécifique formulant la tâche, la méthode et les contraintes à respecter." },
      { letter: 'B', text: "Le prompt s'exécute exclusivement dans le terminal de l'IDE, alors que l'instruction est un fichier JavaScript compilé." },
      { letter: 'C', text: "Le prompt est réservé aux architectures locales (Ollama), alors que l'instruction ne s'applique qu'aux API cloud comme Google Gemini." },
      { letter: 'D', text: "Il n'existe aucune différence, ce sont deux termes interchangeables dans la documentation des LLM." },
    ],
    correctAnswers: ['A'],
    explanation: "Le prompt est l'enveloppe globale transmise au modèle (contenant rôle, contexte, consignes et historique). L'instruction est la règle ou directive impérative précise qui prescrit ce que l'agent doit accomplir, comment il doit procéder et ce qui lui est interdit.",
  },
  {
    id: 2,
    question: "Quelle est la fonction première du 'Contexte' lorsqu'il est transmis à un agent IA dans un environnement de développement tel que Google Antigravity ?",
    options: [
      { letter: 'A', text: "Forcer le compilateur TypeScript à ignorer les avertissements de typage." },
      { letter: 'B', text: "Fournir l'état technique du projet (stack, arborescence, schémas de données) pour ancrer la réflexion de l'agent dans la réalité du code sans qu'il doive extrapoler." },
      { letter: 'C', text: "Augmenter artificiellement le nombre de tokens générés pour facturer l'utilisateur." },
      { letter: 'D', text: "Effacer l'historique de navigation de l'IDE pour libérer de la mémoire RAM." },
    ],
    correctAnswers: ['B'],
    explanation: "Le contexte apporte les informations factuelles (technologies, versions, extraits de code, structure des données) permettant à l'agent de produire un raisonnement pertinent et ancré dans le projet sans formuler d'hypothèses hasardeuses.",
  },
  {
    id: 3,
    codeSnippet: `Analyse le fichier auth.service.ts.
Identifie les vulnérabilités de hachage de mot de passe.
Ne modifie aucun fichier.
Présente tes observations dans la conversation.`,
    question: "Dans cet exemple, comment qualifie-t-on spécifiquement cet énoncé complet par rapport aux concepts fondamentaux du Module 1 ?",
    options: [
      { letter: 'A', text: "Une variable d'environnement non déclarée." },
      { letter: 'B', text: "Une simple requête de complétion syntaxique." },
      { letter: 'C', text: "Une commande opérationnelle encadrée par des instructions de méthode et de contraintes." },
      { letter: 'D', text: "Un prompt non structuré ne contenant aucune directive." },
    ],
    correctAnswers: ['C'],
    explanation: "Cet énoncé constitue une commande concrète (analyse opérationnelle d'un fichier précis), accompagnée d'instructions méthodologiques (recherche de vulnérabilités spécifiques) et d'une contrainte formelle de sécurité (interdiction de modification de fichiers).",
  },
  {
    id: 4,
    question: "Que risque-t-il de se produire si un développeur soumet une demande d'action sans préciser le contexte technique du projet ?",
    options: [
      { letter: 'A', text: "L'IDE va obligatoirement bloquer le compte développeur." },
      { letter: 'B', text: "L'agent va inférer des technologies génériques ou inadaptées (ex: proposer du code Python pour une API Express) ou faire des suppositions erronées sur les conventions existantes." },
      { letter: 'C', text: "Le modèle d'IA va réécrire le BIOS de la machine hôte." },
      { letter: 'D', text: "La commande sera automatiquement convertie en script bash exécuté en mode root." },
    ],
    correctAnswers: ['B'],
    explanation: "Sans contexte technique explicite, le modèle de langage comble les vides informationnels par des suppositions statistiques plausibles mais potentiellement inadaptées à la stack réelle du projet.",
  },
  {
    id: 5,
    question: "Parmi ces propositions, laquelle illustre au mieux une 'commande' adressée à un agent IA dans un IDE ?",
    options: [
      { letter: 'A', text: "« Peux-tu me parler de l'histoire de JavaScript ? »" },
      { letter: 'B', text: "« Tu es un expert en sécurité des systèmes d'information. »" },
      { letter: 'C', text: "« Génère les tests unitaires pour la fonction calculateTax() dans src/utils/tax.ts sans exécuter le runner de test. »" },
      { letter: 'D', text: "« Notre projet utilise Next.js 15, Tailwind CSS et Prisma. »" },
    ],
    correctAnswers: ['C'],
    explanation: "La proposition C est une commande d'action opérationnelle ciblée avec désignation de l'objet technique, de la tâche à accomplir et d'une limite explicite.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Anatomie d'un prompt professionnel (Les 7 composants)
  // -------------------------------------------------------------
  {
    id: 6,
    question: "Quels sont les 7 composants fondamentaux constituant l'anatomie d'un prompt professionnel de développement ?",
    options: [
      { letter: 'A', text: "Rôle, Contexte, Objectif, Tâches, Contraintes, Méthode (Workflow), Format de sortie." },
      { letter: 'B', text: "Titre, Résumé, Code, Compilation, Exécution, Déploiement, Facturation." },
      { letter: 'C', text: "Système, Utilisateur, Assistant, Fonction, Mémoire, Disque, Réseau." },
      { letter: 'D', text: "Zero-shot, Few-shot, Chain-of-Thought, Temperature, Top-P, Stop sequences, Fichier." },
    ],
    correctAnswers: ['A'],
    explanation: "L'architecture de référence d'un prompt professionnel comprend 7 composantes articulées : 1. Rôle (Persona), 2. Contexte, 3. Objectif, 4. Tâches (décomposition), 5. Contraintes (sécurité/accès), 6. Méthode (workflow) et 7. Format de sortie (livrable attendu).",
  },
  {
    id: 7,
    question: "Dans l'anatomie d'un prompt, quelle est la responsabilité du composant 'Contraintes' (Constraints) ?",
    options: [
      { letter: 'A', text: "Définir la vitesse de connexion réseau minimale de l'agent." },
      { letter: 'B', text: "Poser les frontières d'intervention, les interdictions strictes (lecture seule, fichiers sensibles exclus) et les règles non négociables." },
      { letter: 'C', text: "Imposer la couleur du thème sombre de l'IDE." },
      { letter: 'D', text: "Calculer la complexité algorithmique en notation Big-O." },
    ],
    correctAnswers: ['B'],
    explanation: "Les contraintes agissent comme des garde-fous de sécurité : elles spécifient formellement ce que l'agent ne doit pas faire (ex: ne pas modifier de fichiers sans accord, ne pas toucher aux fichiers .env, ne pas exécuter de commande terminal).",
  },
  {
    id: 8,
    codeSnippet: `RÔLE : Auditeur de conformité TypeScript
CONTEXTE : Application React 19 avec migration TypeScript strict
OBJECTIF : Auditer le composant UserProfile.tsx
TÂCHES :
1. Repérer les usages du type 'any'
2. Proposer des interfaces explicites
CONTRAINTES :
- Ne modifie aucun fichier du projet
- Présente uniquement le diff en texte
FORMAT DE SORTIE : Tableau markdown des alertes + bloc de diff unifié`,
    question: "Quelle composante majeure parmi les 7 composants de l'anatomie professionnelle est absente de ce prompt ?",
    options: [
      { letter: 'A', text: "Le Contexte" },
      { letter: 'B', text: "Le Format de sortie" },
      { letter: 'C', text: "La Méthode (Workflow / Démarche étape par étape avec points d'arrêt)" },
      { letter: 'D', text: "Le Rôle" },
    ],
    correctAnswers: ['C'],
    explanation: "Le prompt contient le Rôle, le Contexte, l'Objectif, les Tâches, les Contraintes et le Format de sortie, mais omet la Méthode (le workflow détaillant la succession des étapes de raisonnement et l'éventuelle validation intermédiaire).",
  },
  {
    id: 9,
    question: "Pourquoi est-il crucial de spécifier explicitement le composant 'Format de sortie' (Output Format) dans un prompt professionnel ?",
    options: [
      { letter: 'A', text: "Pour contraindre la réponse dans une structure prévisible, facilitant la relecture humaine, l'automatisation ou l'intégration par un autre outil sans dispersion verbale." },
      { letter: 'B', text: "Parce que les LLM ne savent pas écrire en français sans modèle prédéfini." },
      { letter: 'C', text: "Pour empêcher le compilateur TypeScript d'émettre des erreurs de build." },
      { letter: 'D', text: "Pour forcer le modèle à renvoyer uniquement des images SVG." },
    ],
    correctAnswers: ['A'],
    explanation: "Sans format de sortie explicite, le modèle peut produire une réponse diffuse, omettre des éléments critiques ou noyer le résultat technique sous des explications superflues.",
  },
  {
    id: 10,
    question: "Quel rôle joue la décomposition en 'Tâches' (Tasks) par rapport à l'Objectif global dans un prompt d'ingénierie ?",
    options: [
      { letter: 'A', text: "Les tâches remplacent les fichiers source du projet." },
      { letter: 'B', text: "Les tâches fractionnent l'objectif en une séquence d'actions unitaires ordonnées, évitant que l'agent ne tente de tout résoudre d'un bloc en commettant des oublis." },
      { letter: 'C', text: "Les tâches servent uniquement à compter les heures de travail du développeur." },
      { letter: 'D', text: "Les tâches permettent de désactiver les mécanismes de sécurité de l'IDE." },
    ],
    correctAnswers: ['B'],
    explanation: "La décomposition en tâches guide le modèle dans une planification linéaire et mesurable, réduisant la charge cognitive de chaque étape et prévenant les raccourcis hasardeux.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Rôle, Posture et Typologie des Contraintes
  // -------------------------------------------------------------
  {
    id: 11,
    question: "Quelle différence de comportement technique observe-t-on lorsqu'on attribue à un agent le rôle de 'Développeur Fullstack' plutôt que celui 'd'Auditeur de Code en lecture seule' ?",
    options: [
      { letter: 'A', text: "L'auditeur consomme dix fois plus de mémoire vive que le développeur." },
      { letter: 'B', text: "Le rôle de développeur pousse naturellement l'agent à proposer des modifications actives et du code complet, tandis que l'auditeur adopte une posture d'inspection critique, de diagnostic et de signalement sans écriture." },
      { letter: 'C', text: "Le rôle d'auditeur n'est supporté que sur Linux." },
      { letter: 'D', text: "Aucune différence, les rôles n'ont aucun impact mesurable sur la distribution de probabilité des tokens." },
    ],
    correctAnswers: ['B'],
    explanation: "Le persona (rôle) oriente l'espace latent du modèle vers un sous-ensemble de connaissances et de comportements : l'auditeur privilégie l'analyse et la prudence, tandis que le développeur est orienté production et résolution directe.",
  },
  {
    id: 12,
    question: "Comment classe-t-on les contraintes suivantes : 'Ne lis jamais le fichier .env' et 'N'utilise pas la fonction eval()' ?",
    options: [
      { letter: 'A', text: "Contraintes stylistiques et cosmétiques." },
      { letter: 'B', text: "Contraintes de sécurité et d'intégrité de l'environnement." },
      { letter: 'C', text: "Contraintes de performance réseau." },
      { letter: 'D', text: "Contraintes d'affichage CSS." },
    ],
    correctAnswers: ['B'],
    explanation: "Ce sont des contraintes de sécurité absolues visant à protéger les secrets d'infrastructure (.env) et à empêcher l'introduction de vulnérabilités graves d'exécution de code arbitraire (eval).",
  },
  {
    id: 13,
    question: "Quelle caractéristique doit impérativement posséder un 'Objectif' dans un prompt professionnel pour être qualifié de valide ?",
    options: [
      { letter: 'A', text: "Être formulé de façon poétique et métaphorique." },
      { letter: 'B', text: "Être vague pour laisser libre cours à l'initiative de l'agent." },
      { letter: 'C', text: "Être précis, mesurable et doté de critères d'acceptation permettant de vérifier sans ambiguïté s'il a été atteint." },
      { letter: 'D', text: "Contenir au minimum 500 mots." },
    ],
    correctAnswers: ['C'],
    explanation: "Un objectif professionnel doit être vérifiable : le développeur doit pouvoir confronter la sortie de l'agent à des critères factuels pour déclarer la tâche réussie ou échouée.",
  },
  {
    id: 14,
    question: "Parmi les contraintes suivantes, laquelle constitue une 'contrainte opérationnelle de périmètre' ?",
    options: [
      { letter: 'A', text: "« Utilise TypeScript 5.4 et active le mode strict. »" },
      { letter: 'B', text: "« Ton intervention est strictement limitée au répertoire src/components/cart/ ; interdiction d'explorer les répertoires voisins ou parents. »" },
      { letter: 'C', text: "« Rédige tes commentaires en français. »" },
      { letter: 'D', text: "« Ne dépasse pas 100 lignes de réponse. »" },
    ],
    correctAnswers: ['B'],
    explanation: "Une contrainte de périmètre verrouille l'espace de travail de l'agent (fichiers, dossiers) pour éviter toute dispersion ou fuite de contexte vers des zones non autorisées.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Tokens, Fenêtre de Contexte & Découpage BPE
  // -------------------------------------------------------------
  {
    id: 15,
    question: "Qu'est-ce qu'un 'token' dans le fonctionnement interne des modèles de langage tels que Google Gemini ou Claude ?",
    options: [
      { letter: 'A', text: "Un jeton d'authentification OAuth 2.0 transmis dans les en-têtes HTTP." },
      { letter: 'B', text: "L'unité fondamentale de traitement de texte résultant d'une segmentation statistique (ex: Byte Pair Encoding), représentant un mot, une syllabe ou une fraction de mot." },
      { letter: 'C', text: "Une clé matérielle USB de sécurité branchée sur le serveur." },
      { letter: 'D', text: "Une ligne de code TypeScript de moins de 80 caractères." },
    ],
    correctAnswers: ['B'],
    explanation: "Les modèles ne traitent pas des chaînes de caractères brutes ni des mots entiers, mais des tokens numériques issus d'un vocabulaire fini produit par des algorithmes de tokenisation (BPE, WordPiece, etc.).",
  },
  {
    id: 16,
    question: "En règle générale, pour un code source écrit en TypeScript ou JavaScript, combien de tokens représente approximativement 100 lignes de code dense ?",
    options: [
      { letter: 'A', text: "Environ 10 tokens seulement." },
      { letter: 'B', text: "Entre 300 et 700 tokens, selon la longueur des identifiants et la densité des symboles syntaxiques." },
      { letter: 'C', text: "Exactement 100 000 tokens." },
      { letter: 'D', text: "Zéro token car le code n'est pas du langage naturel." },
    ],
    correctAnswers: ['B'],
    explanation: "En programmation, les symboles ({}, [], =>, .), les indentations et les noms de variables en camelCase génèrent une consommation de tokens d'environ 3 à 7 tokens par ligne en moyenne.",
  },
  {
    id: 17,
    question: "Qu'appelle-t-on le phénomène 'd'amnésie' ou de 'dérive contextuelle' d'un agent au fil d'une longue session de travail dans un IDE ?",
    options: [
      { letter: 'A', text: "Un bug matériel affectant les barrettes de RAM du PC de l'utilisateur." },
      { letter: 'B', text: "La saturation de la fenêtre de contexte où les instructions initiales sont tronquées, diluées ou reçoivent une attention pondérée moindre au fur et à mesure que de nouveaux tokens s'accumulent." },
      { letter: 'C', text: "La suppression automatique des fichiers Git lors d'un commit." },
      { letter: 'D', text: "L'expiration de la licence annuelle du logiciel IDE." },
    ],
    correctAnswers: ['B'],
    explanation: "Lorsque l'historique de conversation et les lectures de fichiers s'allongent, les premières instructions finissent par être compressées ou recevoir moins d'attention relative, amenant l'agent à 'oublier' les règles initiales.",
  },
  {
    id: 18,
    question: "Pourquoi est-il néfaste d'alimenter le prompt avec l'intégralité d'un fichier de 5 000 lignes lorsqu'on ne souhaite auditer qu'une seule fonction de 20 lignes ?",
    options: [
      { letter: 'A', text: "Cela fait planter le compilateur Node.js." },
      { letter: 'B', text: "Cela gaspille inutilement le budget de tokens, dilue l'attention du modèle et augmente exponentiellement le risque d'hallucinations et d'erreurs de raisonnement (phénomène 'Lost in the Middle')." },
      { letter: 'C', text: "Les LLM refusent catégoriquement de lire des fichiers de plus de 100 lignes." },
      { letter: 'D', text: "Cela supprime automatiquement le composant du disque dur." },
    ],
    correctAnswers: ['B'],
    explanation: "Le phénomène 'Lost in the Middle' démontre que les LLM ont plus de difficulté à extraire et traiter l'information pertinente lorsqu'elle est noyée au milieu d'une masse de contexte non pertinent.",
  },
  {
    id: 19,
    question: "Quelle stratégie d'optimisation de contexte est recommandée lorsque l'historique d'une session de développement devient trop volumineux ?",
    options: [
      { letter: 'A', text: "Fermer l'ordinateur et le rallumer." },
      { letter: 'B', text: "Produire une synthèse structurée des acquis et décisions validées, puis initier une nouvelle session propre avec ce résumé en contexte actif." },
      { letter: 'C', text: "Traduire tout le projet en assembleur." },
      { letter: 'D', text: "Désactiver la vérification des types dans tsconfig.json." },
    ],
    correctAnswers: ['B'],
    explanation: "La réinitialisation de contexte avec injection d'un snapshot (résumé d'état validé) permet de restaurer la fraîcheur de l'attention du modèle tout en préservant les décisions antérieures.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Instructions Positives et Négatives
  // -------------------------------------------------------------
  {
    id: 20,
    question: "Pourquoi une consigne formulée uniquement sous forme négative (ex: « Ne fais pas de bêtises » ou « Ne modifie rien de dangereux ») est-elle particulièrement inefficace ?",
    options: [
      { letter: 'A', text: "Parce que le compilateur refuse les phrases contenant le mot 'ne'." },
      { letter: 'B', text: "Parce qu'elle définit un nombre infini de comportements possibles sans expliciter l'action précise attendue ni le critère exact de ce qui est considéré comme 'dangereux'." },
      { letter: 'C', text: "Parce que les LLM inversent toujours les phrases négatives en affirmations." },
      { letter: 'D', text: "Parce que cela consomme deux fois plus de bande passante." },
    ],
    correctAnswers: ['B'],
    explanation: "Les négations abstraites manquent d'ancrage opérationnel. L'ingénierie de prompt professionnelle associe toujours une consigne positive d'action à des interdictions délimitées et mesurables.",
  },
  {
    id: 21,
    question: "Comment transformer efficacement la consigne négative vague : « N'utilise pas de mauvaises pratiques pour gérer les erreurs » ?",
    options: [
      { letter: 'A', text: "« Ne fais pas de bugs dans le code d'erreur. »" },
      { letter: 'B', text: "« Encapsule les appels asynchrones dans des blocs try/catch typés avec Zod, journalise l'erreur via le logger officiel et retourne une réponse HTTP 500 structurée sans exposer la stack trace. »" },
      { letter: 'C', text: "« Supprime tous les try/catch pour que le serveur redémarre plus vite. »" },
      { letter: 'D', text: "« Sois très vigilant avec les erreurs. »" },
    ],
    correctAnswers: ['B'],
    explanation: "La proposition B remplace l'injonction subjective par des exigences techniques concrètes, observables et directement applicables dans le code.",
  },
  {
    id: 22,
    codeSnippet: `Consigne : « Ne crée pas de nouveaux fichiers dans le projet. Propose uniquement les modifications sous forme d'un diff Git unifié dans ta réponse. »`,
    question: "Comment qualifie-t-on cette formulation d'instructions d'ingénierie ?",
    options: [
      { letter: 'A', text: "Une instruction contradictoire impossible à résoudre." },
      { letter: 'B', text: "Un couplage équilibré entre une interdiction stricte de périmètre (négative) et une modalité de restitution explicite (positive)." },
      { letter: 'C', text: "Une faille de sécurité majeure de type jailbreak." },
      { letter: 'D', text: "Un prompt inutile car l'agent sait déjà quoi faire." },
    ],
    correctAnswers: ['B'],
    explanation: "L'instruction pose une barrière claire (pas d'écriture sur le disque) tout en indiquant précisément le comportement alternatif exigé (restitution sous forme de diff en texte).",
  },
  {
    id: 23,
    question: "Dans Google Antigravity, quelle formulation négative protège le plus rigoureusement l'environnement contre une altération non autorisée du code ?",
    options: [
      { letter: 'A', text: "« Essaie de ne pas trop casser le code existant. »" },
      { letter: 'B', text: "« Mode LECTURE SEULE strict : toute création, modification, suppression, renommage ou écrasement de fichier est formellement interdit sans validation humaine explicite préalable. »" },
      { letter: 'C', text: "« Modifie le code mais fais attention. »" },
      { letter: 'D', text: "« N'écris pas de code trop complexe. »" },
    ],
    correctAnswers: ['B'],
    explanation: "Une protection de sécurité doit être exhaustive, sans ambiguïté et énumérer expressément les actions interdites (créer, modifier, supprimer, écraser).",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Gestion des Ambiguïtés
  // -------------------------------------------------------------
  {
    id: 24,
    question: "Qu'est-ce qu'une 'ambiguïté de périmètre' dans une interaction avec un agent IA dans un IDE ?",
    options: [
      { letter: 'A', text: "Une erreur de syntaxe dans le fichier package.json." },
      { letter: 'B', text: "Une formulation qui laisse l'agent libre d'interpréter quels fichiers ou répertoires il a le droit d'explorer, de lire ou d'altérer (ex: 'analyse les fichiers nécessaires')." },
      { letter: 'C', text: "Une perte de signal Wi-Fi entre l'IDE et le serveur cloud." },
      { letter: 'D', text: "Un conflit de fusion lors d'un git rebase." },
    ],
    correctAnswers: ['B'],
    explanation: "L'ambiguïté de périmètre survient lorsque la frontière spatiale de l'intervention de l'agent n'est pas bornée, l'incitant à parcourir l'ensemble du disque ou des modules tiers.",
  },
  {
    id: 25,
    question: "Face à une consigne contenant le verbe 'Améliore le formulaire de contact', comment un agent professionnel bien instruit doit-il réagir ?",
    options: [
      { letter: 'A', text: "Réécrire immédiatement le formulaire en utilisant une bibliothèque externe au hasard." },
      { letter: 'B', text: "Détecter l'ambiguïté sémantique, suspendre toute modification directe, et demander à l'utilisateur si l'amélioration attendue concerne l'accessibilité, la validation des champs, le style CSS ou la sécurité." },
      { letter: 'C', text: "Effacer le formulaire existant pour en créer un nouveau." },
      { letter: 'D', text: "Exécuter npm run build en boucle." },
    ],
    correctAnswers: ['B'],
    explanation: "Le terme 'améliorer' est subjectif. Un agent sous gouvernance rigoureuse clarifie l'intention avant d'entreprendre la moindre action irréversible.",
  },
  {
    id: 26,
    codeSnippet: `Consigne : « Vérifie que mon API est sécurisée et corrige tout ce qui ne va pas. »`,
    question: "Quelles sont les deux ambiguïtés critiques majeures présentes dans cette formulation ?",
    options: [
      { letter: 'A', text: "Ambiguïté sur la langue utilisée et sur la version de Windows." },
      { letter: 'B', text: "Ambiguïté sur les critères de sécurité évalués (quels vecteurs d'attaque ?) et ambiguïté d'autorisation ('corrige tout' sans limitation de fichiers ni accord préalable)." },
      { letter: 'C', text: "Ambiguïté sur le nom de l'ordinateur et le type d'écran." },
      { letter: 'D', text: "Il n'y a aucune ambiguïté, la consigne est parfaite." },
    ],
    correctAnswers: ['B'],
    explanation: "'Sécurisée' n'est pas mesurable sans référentiel précis (OWASP Top 10, auth, injection ?), et 'corrige tout' donne un blanc-seing d'écriture incontrôlée sur l'ensemble du projet.",
  },
  {
    id: 27,
    question: "Quel protocole d'instruction permet de désamorcer les ambiguïtés au démarrage d'une session ?",
    options: [
      { letter: 'A', text: "Laisser l'agent deviner statistiquement ce que veut l'utilisateur." },
      { letter: 'B', text: "Intégrer une directive système ordonnant : 'Si une demande comporte plusieurs interprétations possibles modifiant le périmètre ou les fichiers cibles, arrête-toi et pose une question de clarification fermée avant toute action'." },
      { letter: 'C', text: "Désactiver les messages d'avertissement de l'IDE." },
      { letter: 'D', text: "Forcer l'agent à répondre en moins de 1 seconde." },
    ],
    correctAnswers: ['B'],
    explanation: "Ce protocole formalise un point d'arrêt automatique qui empêche l'agent de prendre des initiatives unilatérales sur des hypothèses non vérifiées.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Gestion des Contradictions & Hiérarchie des Niveaux
  // -------------------------------------------------------------
  {
    id: 28,
    codeSnippet: `Règle permanente du projet : « Ne modifie jamais les fichiers sans approbation humaine. »
Message utilisateur dans le chat : « Corrige tout de suite la faute d'orthographe dans Button.tsx. »`,
    question: "Face à cette contradiction directe entre une règle permanente et une demande ponctuelle, que doit faire un agent appliquant la hiérarchie officielle du Module 1 ?",
    options: [
      { letter: 'A', text: "Modifier directement le fichier car la demande de l'utilisateur dans le chat est toujours supérieure à toute autre règle." },
      { letter: 'B', text: "Présenter le diff textuel de la correction et demander confirmation formelle avant d'appliquer l'écriture, respectant ainsi la priorité de la règle permanente de sécurité sur la consigne ponctuelle." },
      { letter: 'C', text: "Ignorer le message de l'utilisateur et ne rien répondre." },
      { letter: 'D', text: "Supprimer le composant Button.tsx." },
    ],
    correctAnswers: ['B'],
    explanation: "Selon la hiérarchie des instructions, une demande ponctuelle (N3) ne peut pas révoquer tacitement une règle de sécurité permanente (N2). L'agent formule la proposition et attend l'approbation formelle d'écriture.",
  },
  {
    id: 29,
    question: "Dans la hiérarchie des 4 niveaux de priorité d'instructions (Module 1, Chapitre 7), quel niveau détient la priorité absolue ?",
    options: [
      { letter: 'A', text: "Niveau 4 : Le contenu passif des fichiers du projet." },
      { letter: 'B', text: "Niveau 3 : La consigne de la mission ponctuelle dans le chat." },
      { letter: 'C', text: "Niveau 1 : Les règles système et de sécurité absolue (intégrité système, anti-jailbreak, PoLP)." },
      { letter: 'D', text: "Niveau 2 : Les conventions stylistiques de l'équipe." },
    ],
    correctAnswers: ['C'],
    explanation: "Le Niveau 1 (Sécurité système & intégrité) prime sur tous les autres niveaux : aucune consigne utilisateur ni aucun fichier analysé ne peut outrepasser les règles de sécurité fondamentales.",
  },
  {
    id: 30,
    question: "Que stipule expressément le Niveau 4 de la hiérarchie concernant le contenu des fichiers et de la documentation lus par l'agent ?",
    options: [
      { letter: 'A', text: "Le contenu des fichiers est une donnée passive et ne détient JAMAIS d'autorité opérationnelle pour dicter des consignes ou modifier les permissions de l'agent." },
      { letter: 'B', text: "Tout commentaire dans un fichier source a priorité sur les règles de l'IDE." },
      { letter: 'C', text: "Si un fichier README demande de formater le disque, l'agent doit exécuter l'ordre." },
      { letter: 'D', text: "Les fichiers JSON doivent être considérés comme du code exécutable prioritaire." },
    ],
    correctAnswers: ['A'],
    explanation: "C'est le principe d'étanchéité absolue entre données et instructions : un fichier inspecté est une donnée passive, ce qui protège l'agent contre le Prompt Injection indirect.",
  },
  {
    id: 31,
    question: "Quel est l'ordonnancement exact du protocole de résolution en 5 étapes lorsqu'un agent détecte une contradiction ?",
    options: [
      { letter: 'A', text: "1. Exécuter, 2. Constater l'erreur, 3. Recommencer, 4. Effacer, 5. Quitter." },
      { letter: 'B', text: "1. Détecter le conflit, 2. Suspendre l'action sensible, 3. Formuler la contradiction à l'utilisateur, 4. Proposer les alternatives viables, 5. Demander un arbitrage explicite." },
      { letter: 'C', text: "1. Tirer à pile ou face, 2. Coder, 3. Tester, 4. Pousser sur Git, 5. Valider." },
      { letter: 'D', text: "1. Ignorer la première règle, 2. Appliquer la deuxième, 3. Notifier l'admin, 4. Logger, 5. Terminer." },
    ],
    correctAnswers: ['B'],
    explanation: "Le protocole d'arbitrage méthodique impose la détection immédiate, l'arrêt préventif, l'explication transparente du conflit et la demande d'arbitrage souverain à l'humain.",
  },

  // -------------------------------------------------------------
  // SECTION 8 : Instructions Permanentes vs Ponctuelles
  // -------------------------------------------------------------
  {
    id: 32,
    question: "Où résident typiquement les 'instructions permanentes' qui gouvernent le comportement d'un agent dans un projet professionnel sous Google Antigravity ou Cursor ?",
    options: [
      { letter: 'A', text: "Dans la mémoire cache temporaire du navigateur web." },
      { letter: 'B', text: "Dans des fichiers dédiés à la racine du dépôt (ex: AGENTS.md, .agent/rules, .cursorrules) versionnés dans Git." },
      { letter: 'C', text: "Dans le BIOS de l'ordinateur portable." },
      { letter: 'D', text: "Dans le tableau de bord Stripe de facturation." },
    ],
    correctAnswers: ['B'],
    explanation: "Les règles permanentes sont persistées dans les fichiers de configuration de l'agent au sein du dépôt Git, garantissant que toute l'équipe partage le même cadre de gouvernance.",
  },
  {
    id: 33,
    question: "Quelle est la principale erreur architecturale commise lorsqu'un développeur fusionne les instructions permanentes et les consignes ponctuelles dans un seul bloc de texte ?",
    options: [
      { letter: 'A', text: "Le fichier devient trop coloré dans l'éditeur." },
      { letter: 'B', text: "L'instruction devient lourde, difficile à maintenir, gaspille des tokens à chaque échange et crée une confusion entre les règles durables du projet et la tâche éphémère du moment." },
      { letter: 'C', text: "Cela force l'ordinateur à se connecter en Ethernet." },
      { letter: 'D', text: "Le fichier est automatiquement effacé par le Garbage Collector." },
    ],
    correctAnswers: ['B'],
    explanation: "La séparation claire entre persona permanent (règles, cadre, sécurité) et prompt de mission ponctuelle (tâche actuelle, cible) est un impératif d'industrialisation.",
  },
  {
    id: 34,
    codeSnippet: `1. Identité et Rôle
2. Mission générale
3. Périmètre autorisé et frontières
4. Permissions et interdictions de sécurité
5. Méthode de travail et workflow
6. Fiabilité factuelle et gestion des preuves
7. Gestion des erreurs et incertitudes
8. Format des rapports et condition de fin`,
    question: "Que représente cette architecture ordonnée en 8 parties vue dans le Module 1 ?",
    options: [
      { letter: 'A', text: "Le protocole de communication TCP/IP." },
      { letter: 'B', text: "L'architecture standardisée complète pour structurer un fichier d'instructions permanentes (.agent/rules)." },
      { letter: 'C', text: "La liste des dépendances d'un projet Node.js." },
      { letter: 'D', text: "Le schéma relationnel d'une table SQL de logs." },
    ],
    correctAnswers: ['B'],
    explanation: "Ce canevas modulaire en 8 sections permet de construire un persona d'agent exhaustif, sans répétition et vérifiable.",
  },
  {
    id: 35,
    question: "Si une instruction ponctuelle entrée dans le chat entre en contradiction avec une convention permanente du fichier AGENTS.md, que doit faire l'agent ?",
    options: [
      { letter: 'A', text: "Effacer le fichier AGENTS.md." },
      { letter: 'B', text: "Alerter l'utilisateur sur la déviation par rapport aux conventions permanentes du projet et lui demander s'il s'agit d'une exception délibérée." },
      { letter: 'C', text: "Obéir en silence sans rien signaler." },
      { letter: 'D', text: "Arrêter le processus Node.js en arrière-plan." },
    ],
    correctAnswers: ['B'],
    explanation: "L'agent signale le conflit de convention et demande si une dérogation temporaire explicite est souhaitée par l'opérateur.",
  },

  // -------------------------------------------------------------
  // SECTION 9 : Niveaux d'intervention (1 à 4) & Human-in-the-Loop
  // -------------------------------------------------------------
  {
    id: 36,
    question: "Quels sont les 4 niveaux d'intervention progressifs d'un agent IA dans un IDE ?",
    options: [
      { letter: 'A', text: "1. Lire, 2. Écrire, 3. Compiler, 4. Déployer." },
      { letter: 'B', text: "1. Expliquer, 2. Analyser, 3. Proposer, 4. Exécuter." },
      { letter: 'C', text: "1. Junior, 2. Confirmé, 3. Senior, 4. Lead." },
      { letter: 'D', text: "1. Frontend, 2. Backend, 3. Base de données, 4. DevOps." },
    ],
    correctAnswers: ['B'],
    explanation: "La taxonomie des interventions classe l'action de l'agent en 4 degrés : Niveau 1 (Expliquer le concept), Niveau 2 (Analyser le code existant sans modifier), Niveau 3 (Proposer une solution/diff en texte), Niveau 4 (Exécuter la modification sur le système de fichiers).",
  },
  {
    id: 37,
    question: "Quelle est la différence fondamentale entre le Niveau 3 ('Proposer') et le Niveau 4 ('Exécuter') ?",
    options: [
      { letter: 'A', text: "Le Niveau 3 utilise du Python alors que le Niveau 4 utilise du TypeScript." },
      { letter: 'B', text: "Au Niveau 3, l'agent génère le code ou le diff dans la fenêtre de chat sans toucher au disque dur ; au Niveau 4, il appelle les outils d'édition pour écrire ou modifier réellement les fichiers du projet." },
      { letter: 'C', text: "Le Niveau 4 est gratuit alors que le Niveau 3 est payant." },
      { letter: 'D', text: "Aucune différence, ce sont deux manières d'exécuter un script." },
    ],
    correctAnswers: ['B'],
    explanation: "La frontière entre Niveau 3 et Niveau 4 est la frontière vitale de sécurité : proposer du code dans le chat est passif et inoffensif ; modifier les fichiers réels du disque dur engage l'intégrité du code source.",
  },
  {
    id: 38,
    codeSnippet: `Workflow :
1. L'agent analyse le code.
2. L'agent génère une proposition sous forme de diff unifié.
3. L'agent suspend son exécution et demande : « Validez-vous l'application de ce diff ? »
4. L'utilisateur répond « Oui ».
5. L'agent applique la modification avec l'outil d'édition.`,
    question: "Quel paradigme de gouvernance logicielle ce workflow illustre-t-il ?",
    options: [
      { letter: 'A', text: "Le déploiement continu sans surveillance (No-Ops)." },
      { letter: 'B', text: "Le paradigme Human-in-the-Loop (HITL) avec sas d'approbation explicite." },
      { letter: 'C', text: "L'apprentissage par renforcement non supervisé." },
      { letter: 'D', text: "Le modèle en cascade (Waterfall) traditionnel des années 1970." },
    ],
    correctAnswers: ['B'],
    explanation: "Le paradigme Human-in-the-Loop place l'humain au cœur de la boucle de décision : aucune opération altérant l'état du système (Niveau 4) n'est exécutée sans le consentement éclairé de l'opérateur.",
  },
  {
    id: 39,
    question: "Pourquoi est-il formellement interdit à un agent d'élargir de lui-même une autorisation accordée au Niveau 4 ?",
    options: [
      { letter: 'A', text: "Parce qu'une permission accordée pour une action précise (ex: modifier UserCard.tsx) ne vaut jamais autorisation d'altérer d'autres fichiers périphériques (ex: auth.ts ou package.json)." },
      { letter: 'B', text: "Parce que cela vide le cache DNS de l'ordinateur." },
      { letter: 'C', text: "Parce que les clés d'API expirent toutes les 10 secondes." },
      { letter: 'D', text: "Parce que Git bloque les commits contenant plus de 3 fichiers." },
    ],
    correctAnswers: ['A'],
    explanation: "Le principe de moindre privilège impose la non-transitivité des autorisations : chaque action à fort impact nécessite son propre périmètre d'approbation explicite.",
  },
  {
    id: 40,
    question: "Quelle attitude professionnelle synthétise l'ensemble des compétences enseignées dans le Module 1 pour piloter un agent dans un IDE ?",
    options: [
      { letter: 'A', text: "Faire une confiance aveugle à l'agent et lui accorder les pleins pouvoirs en mode root pour gagner du temps." },
      { letter: 'B', text: "Formuler des prompts structurés en 7 composants, délimiter le contexte et le périmètre, bannir les ambiguïtés, faire respecter la hiérarchie des priorités et maintenir une supervision Human-in-the-Loop rigoureuse sur toutes les actions de Niveau 4." },
      { letter: 'C', text: "Ne jamais utiliser d'agent IA pour développer du code." },
      { letter: 'D', text: "Rédiger des prompts de plus de 10 000 lignes contenant tous les fichiers du projet." },
    ],
    correctAnswers: ['B'],
    explanation: "Cette approche combine maîtrise méthodologique, optimisation du contexte, rigueur sémantique et gouvernance de sécurité pour faire de l'agent un levier d'ingénierie fiable et performant.",
  },
];

