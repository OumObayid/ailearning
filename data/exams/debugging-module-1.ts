import { ExamMetadata, ExamQuestion } from './types';

export const DEBUGGING_MODULE_1_EXAM_METADATA: ExamMetadata = {
  moduleId: 'debugging-module-1',
  title: "Examen de Certification — Module 1 : Fondamentaux de l'Ingénierie du Débogage",
  durationMinutes: 30,
  passingScorePercent: 80, // Seuil de réussite à 80% (16/20)
  totalQuestions: 20,
};

export const DEBUGGING_MODULE_1_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Vocabulaire & Concepts (Erreur, Faute, Bug, Défaillance)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Selon les normes internationales de génie logiciel (IEEE / ISO 25010), quelle est la définition exacte d'une 'Erreur' (Error / Mistake) ?",
    options: [
      { letter: 'A', text: "L'interruption brutale de l'application constatée par l'utilisateur final en production." },
      { letter: 'B', text: "Une action humaine involontaire ou une décision inadéquate prise par le concepteur ou le développeur, produisant un résultat incorrect." },
      { letter: 'C', text: "Un composant matériel endommagé au sein du serveur." },
      { letter: 'D', text: "Une ligne de code marquée comme dépréciée par le compilateur." },
    ],
    correctAnswers: ['B'],
    explanation: "Une erreur est avant tout une action ou méprise humaine (fausse supposition de typage, oubli de contrainte, mauvaise compréhension du besoin métier) qui introduit une anomalie dans le système.",
  },
  {
    id: 2,
    question: "Quelle est la relation causale séquentielle rigoureuse menant à une défaillance en production ?",
    options: [
      { letter: 'A', text: "Défaillance → Erreur humaine → Anomalie dans le code" },
      { letter: 'B', text: "Erreur humaine → Défaut / Bug dans le code → Défaillance observable à l'exécution" },
      { letter: 'C', text: "Rapport d'incident → Défaillance → Refactorisation" },
      { letter: 'D', text: "Bug → Erreur humaine → Exception non gérée" },
    ],
    correctAnswers: ['B'],
    explanation: "L'erreur humaine commise par le développeur introduit un défaut (bug/anomalie) dans le code. Lorsque ce code défectueux est exécuté dans certaines conditions, il produit une défaillance observable.",
  },
  {
    id: 3,
    question: "Qu'est-ce que la 'Cause Racine' (Root Cause) d'une anomalie logicielle ?",
    options: [
      { letter: 'A', text: "La dernière ligne affichée tout en haut de la stack trace d'erreur." },
      { letter: 'B', text: "L'élément fondamental et le plus profond dont la suppression ou correction empêche définitivement la récurrence du dysfonctionnement." },
      { letter: 'C', text: "Le composant tiers payant le plus coûteux de la pile applicative." },
      { letter: 'D', text: "L'adresse IP du serveur mandataire inverse (Reverse Proxy)." },
    ],
    correctAnswers: ['B'],
    explanation: "La cause racine est l'origine fondamentale du problème (défaut de conception, absence de validation, mauvaise hypothèse d'architecture). La traiter supprime le problème à la source.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Typologie des Erreurs (Syntaxe, Logique, Exécution)
  // -------------------------------------------------------------
  {
    id: 4,
    question: "Parmi ces trois catégories fondamentales, quel type d'erreur est le plus insidieux et dangereux car le programme s'exécute sans lever la moindre exception ?",
    options: [
      { letter: 'A', text: "L'erreur de syntaxe (SyntaxError)" },
      { letter: 'B', text: "L'erreur de compilation TypeScript" },
      { letter: 'C', text: "L'erreur logique (ou sémantique)" },
      { letter: 'D', text: "L'erreur d'analyse JSON (JSON.parse)" },
    ],
    correctAnswers: ['C'],
    explanation: "L'erreur logique ne lève aucune exception : l'interpréteur valide le code, mais les calculs ou décisions métiers sont faussés (ex: inverser un opérateur booléen, appliquer une remise deux fois).",
  },
  {
    id: 5,
    codeSnippet: `function calculateTotal(price, taxRate) {
  return price + price * taxRate; // price = "100", taxRate = 0.2
}
// Résultat retourné : "10020"`,
    question: "À quelle catégorie d'erreur appartient ce comportement et quel en est le mécanisme ?",
    options: [
      { letter: 'A', text: "Erreur de syntaxe bloquante détectée par le parseur V8." },
      { letter: 'B', text: "Erreur d'exécution avec plantage de la boucle d'événements." },
      { letter: 'C', text: "Erreur de logique due à la coercition de type implicite de JavaScript (concaténation de chaîne au lieu d'addition arithmétique)." },
      { letter: 'D', text: "Dépassement de capacité mémoire (Buffer Overflow)." },
    ],
    correctAnswers: ['C'],
    explanation: "Comme `price` est une chaîne de caractères, l'opérateur `+` effectue une concaténation au lieu d'une addition numérique : '100' + 20 devient '10020'. C'est une erreur sémantique/logique.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Familles d'Erreurs
  // -------------------------------------------------------------
  {
    id: 6,
    question: "Deux requêtes asynchrones simultanées accèdent au même panier et décrémentent le stock d'un produit, générant un solde négatif. De quelle famille d'erreur s'agit-il ?",
    options: [
      { letter: 'A', text: "Erreur de validation de format d'adresse email." },
      { letter: 'B', text: "Condition de concurrence (Race Condition) / Problème d'asynchronisme et de concurrence d'accès." },
      { letter: 'C', text: "Erreur de protocole DNS." },
      { letter: 'D', text: "Erreur de mise en cache HTTP 304." },
    ],
    correctAnswers: ['B'],
    explanation: "La condition de concurrence (Race Condition) survient lorsque l'intégrité de l'état partagé dépend de l'ordre ou de la synchronisation de processus concurrents non verrouillés.",
  },
  {
    id: 7,
    question: "Quelle méthode permet d'éliminer les conditions de concurrence lors de la mise à jour de quantités en base de données relationnelle (MySQL/PostgreSQL) ?",
    options: [
      { letter: 'A', text: "Effectuer un SELECT, attendre 1 seconde côté Node.js avec `setTimeout`, puis faire l'UPDATE." },
      { letter: 'B', text: "Utiliser une transaction ACID avec verrouillage pessimiste (`SELECT ... FOR UPDATE`) ou une mise à jour atomique conditionnelle (`UPDATE ... WHERE stock >= ?`)." },
      { letter: 'C', text: "Désactiver les clés primaires de la table." },
      { letter: 'D', text: "Envoyer toutes les requêtes en protocole UDP." },
    ],
    correctAnswers: ['B'],
    explanation: "Le verrouillage pessimiste ou la décrémentation conditionnelle atomique garantit que la lecture et la mise à jour sont indissociables et protégées contre tout accès concurrent simultané.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Cycle de Vie & Outils de Suivi
  // -------------------------------------------------------------
  {
    id: 8,
    question: "Dans un système de suivi d'anomalies comme Jira ou GitHub Issues, quel est le statut normal d'un ticket immédiatement après le déploiement du correctif par le développeur ?",
    options: [
      { letter: 'A', text: "Closed (Fermé définitivement sans contrôle)" },
      { letter: 'B', text: "In QA / Ready for Verification (En attente de test de validation par l'équipe d'assurance qualité)" },
      { letter: 'C', text: "Won't Fix" },
      { letter: 'D', text: "Backlog" },
    ],
    correctAnswers: ['B'],
    explanation: "Un ticket ne doit jamais être clôturé directement par la personne qui a codé le correctif. Il transite par une phase de test et de validation indépendante (QA/Verification).",
  },
  {
    id: 9,
    question: "Qu'appelle-t-on une 'Régression' logicielle ?",
    options: [
      { letter: 'A', text: "La rétrogradation d'un serveur vers une version antérieure de système d'exploitation." },
      { letter: 'B', text: "La réapparition d'une anomalie passée ou la dégradation d'une fonctionnalité qui marchait correctement, suite à une nouvelle modification du code." },
      { letter: 'C', text: "Le passage d'un code TypeScript vers du JavaScript pur." },
      { letter: 'D', text: "Une diminution du nombre de visiteurs sur un site Web." },
    ],
    correctAnswers: ['B'],
    explanation: "Une régression est un effet de bord indésirable : la correction d'un bug ou l'ajout d'une feature casse une fonctionnalité existante qui fonctionnait jusque-là.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Reproduction Contrôlée
  // -------------------------------------------------------------
  {
    id: 10,
    question: "Quelle est la toute première règle à respecter lorsqu'un utilisateur signale une anomalie intermittente avec peu de précisions ?",
    options: [
      { letter: 'A', text: "Modifier immédiatement des fonctions au hasard en production pour voir si cela aide." },
      { letter: 'B', text: "Collecter les conditions exactes de survenue (navigateur, payload, état du compte, logs horodatés) pour construire un scénario de reproduction minimal déterministe." },
      { letter: 'C', text: "Fermer le ticket avec le statut 'Invalide'." },
      { letter: 'D', text: "Réécrire toute l'application dans un nouveau langage." },
    ],
    correctAnswers: ['B'],
    explanation: "Sans scénario de reproduction déterministe et minimal, il est impossible de vérifier objectivement si une correction a fonctionné ou s'il s'agissait d'un coup de chance.",
  },
  {
    id: 11,
    question: "Qu'est-ce qu'un bug de type 'Heisenbug' ?",
    options: [
      { letter: 'A', text: "Un bug provoqué exclusivement par un processeur quantique." },
      { letter: 'B', text: "Une anomalie qui disparaît ou modifie son comportement dès qu'on tente de l'observer (ex: en activant un débogueur ou des logs verbeux modifiant le timing des threads)." },
      { letter: 'C', text: "Un bug de sécurité cryptographique lié au hachage SHA-256." },
      { letter: 'D', text: "Un défaut de traduction linguistique dans une interface utilisateur." },
    ],
    correctAnswers: ['B'],
    explanation: "Nommé par analogie avec le principe d'incertitude de Heisenberg, un Heisenbug est un bug intermittent qui s'évanouit dès lors qu'un outil d'observation ralentit l'exécution et masque la condition de concurrence.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Analyse Causale (5 Pourquoi, Ishikawa)
  // -------------------------------------------------------------
  {
    id: 12,
    question: "Dans le diagramme d'Ishikawa (ou diagramme de causes à effet en arête de poisson), quelles sont les catégories canoniques de la méthode des 5M ?",
    options: [
      { letter: 'A', text: "Mois, Minutes, Millisecondes, Microsecondes, Mémoire" },
      { letter: 'B', text: "Main-d'œuvre, Méthode, Milieu, Matériel, Matière" },
      { letter: 'C', text: "Microservices, Monolithe, MySQL, MongoDB, Middleware" },
      { letter: 'D', text: "Modèle, Module, Mock, Migration, Mutation" },
    ],
    correctAnswers: ['B'],
    explanation: "La méthode des 5M classique (adaptée au génie logiciel : Personnes/Équipe, Processus/Méthode, Environnement/Milieu, Outils/Matériel, Données/Matière) permet d'explorer tous les axes possibles d'un problème sans biais de confirmation.",
  },
  {
    id: 13,
    question: "Quelle est la finalité principale de la technique d'investigation des '5 Pourquoi' (5 Whys) ?",
    options: [
      { letter: 'A', text: "Trouver le coupable individuel dans l'équipe pour lui attribuer la responsabilité de la panne." },
      { letter: 'B', text: "Traverser les couches de symptômes superficiels en itérant sur la cause directe jusqu'à atteindre la cause racine organisationnelle, technique ou méthodologique." },
      { letter: 'C', text: "Répéter 5 fois la même requête curl pour tester la robustesse de l'API." },
      { letter: 'D', text: "Diviser le temps d'exécution d'un algorithme par cinq." },
    ],
    correctAnswers: ['B'],
    explanation: "La méthode des 5 Pourquoi remonte la chaîne de causalité étape par étape pour identifier le défaut structurel sous-jacent et empêcher toute reproduction future.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Protocole Professionnel & Outils
  // -------------------------------------------------------------
  {
    id: 14,
    question: "Dans Google Chrome DevTools, quel panneau permet d'analyser les codes de statut HTTP, les en-têtes et le corps des requêtes asynchrones Fetch/XHR ?",
    options: [
      { letter: 'A', text: "L'onglet Elements" },
      { letter: 'B', text: "L'onglet Memory Heap Profiler" },
      { letter: 'C', text: "L'onglet Network (Réseau)" },
      { letter: 'D', text: "L'onglet Lighthouse" },
    ],
    correctAnswers: ['C'],
    explanation: "L'onglet Network consigne chaque échange client-serveur : URL, méthode, statut HTTP, temps de latence (TTFB), payload envoyé et réponse JSON reçue.",
  },
  {
    id: 15,
    question: "Quel est l'avantage décisif de poser un point d'arrêt (breakpoint conditionnel) dans VS Code ou Chrome DevTools par rapport à l'ajout manuel de `console.log()` ?",
    options: [
      { letter: 'A', text: "Il permet de suspendre l'exécution uniquement quand une condition spécifique est vraie, d'inspecter l'intégralité de la portée (Call Stack, Scope, Variables) sans altérer le code source ni polluer les logs." },
      { letter: 'B', text: "Il double automatiquement la vitesse d'exécution du processeur." },
      { letter: 'C', text: "Il supprime automatiquement les erreurs de typage TypeScript." },
      { letter: 'D', text: "Il n'y a aucun avantage, le `console.log` est toujours supérieur en ingénierie logicielle." },
    ],
    correctAnswers: ['A'],
    explanation: "Le breakpoint conditionnel fige l'exécution au moment opportun et donne accès au call stack complet et à toutes les variables du scope sans modifier les fichiers ni laisser de traces oubliées en production.",
  },
  {
    id: 16,
    question: "Lorsqu'un débogueur suspend l'exécution sur une ligne de code, quelle action réalise l'instruction 'Step Over' (F10) ?",
    options: [
      { letter: 'A', text: "Entrer à l'intérieur de la fonction appelée sur la ligne pour déboguer son implémentation pas à pas." },
      { letter: 'B', text: "Exécuter l'instruction courante en bloc et s'arrêter à la ligne suivante de la même fonction sans entrer dans les détails de la fonction appelée." },
      { letter: 'C', text: "Terminer brutalement le processus Node.js." },
      { letter: 'D', text: "Sortir immédiatement de la fonction courante." },
    ],
    correctAnswers: ['B'],
    explanation: "'Step Over' (Pas à pas principal) exécute la fonction appelée en tant qu'unité et met en pause l'interpréteur à la ligne suivante dans le contexte courant.",
  },

  // -------------------------------------------------------------
  // SECTION 8 : Architecture, Sécurité & Bonnes Pratiques
  // -------------------------------------------------------------
  {
    id: 17,
    question: "Qu'est-ce qu'une clé d'idempotence (Idempotency Key) dans une API de paiement ou de commande ?",
    options: [
      { letter: 'A', text: "Le mot de passe administrateur chiffré dans le fichier `.env`." },
      { letter: 'B', text: "Un identifiant unique transmis avec la requête permettant au serveur de reconnaître une requête rejouée et de renvoyer le résultat initial sans réexécuter l'opération métier critique." },
      { letter: 'C', text: "La clé publique SSH utilisée pour se connecter au serveur Linux." },
      { letter: 'D', text: "Un algorithme de compression gzip pour les gros volumes de données." },
    ],
    correctAnswers: ['B'],
    explanation: "L'idempotence garantit qu'une opération répétée plusieurs fois (par exemple lors d'une coupure réseau ou d'un double clic) produit le même résultat qu'une seule exécution.",
  },
  {
    id: 18,
    codeSnippet: `// Requête client :
const user = response.data.user;
const firstLetter = user.name.charAt(0);`,
    question: "Si l'API renvoie `{ user: null }`, quelle exception sera déclenchée et quelle est la correction défensive moderne ?",
    options: [
      { letter: 'A', text: "SyntaxError — Correction : ajouter un point-virgule." },
      { letter: 'B', text: "TypeError: Cannot read properties of null — Correction : chaînage optionnel `user?.name?.charAt(0) ?? ''`." },
      { letter: 'C', text: "NetworkError — Correction : relancer le serveur." },
      { letter: 'D', text: "CompilationError — Correction : réinstaller Node.js." },
    ],
    correctAnswers: ['B'],
    explanation: "Accéder à une propriété sur `null` ou `undefined` lève un TypeError. L'optional chaining (`?.`) et l'opérateur de coalescence nulle (`??`) protègent l'application d'un crash fatal.",
  },
  {
    id: 19,
    question: "Dans le cadre de l'assistance par un Agent IA (ex: Claude, Gemini, Copilot) lors d'un débogage, quelle attitude professionnelle est impérative ?",
    options: [
      { letter: 'A', text: "Copier-coller aveuglément les suggestions de code proposées sans les exécuter ni les comprendre." },
      { letter: 'B', text: "Fournir un contexte riche et précis (stack trace, comportement attendu vs observé), puis vérifier scrupuleusement la logique du correctif proposé et valider par des tests automatisés." },
      { letter: 'C', text: "Désactiver les tests unitaires pour faire plaisir à l'agent IA." },
      { letter: 'D', text: "Ne jamais utiliser d'IA pour analyser une trace de pile." },
    ],
    correctAnswers: ['B'],
    explanation: "L'agent IA est un puissant accélérateur d'investigation, mais la responsabilité technique repose sur le développeur qui doit contrôler les hypothèses, les effets de bord et valider avec des tests.",
  },
  {
    id: 20,
    question: "Quel est l'objectif premier d'un rapport de post-mortem (ou RCA) suite à un incident critique en entreprise ?",
    options: [
      { letter: 'A', text: "Sanctionner publiquement l'auteur du commit responsable de la régression." },
      { letter: 'B', text: "Documenter sans blâme la chronologie des faits, analyser la cause racine, quantifier l'impact et définir un plan d'actions préventives (CAPA) pour immuniser l'infrastructure." },
      { letter: 'C', text: "Supprimer les sauvegardes de bases de données corrompues." },
      { letter: 'D', text: "Remplacer l'équipe d'astreinte par un script bash." },
    ],
    correctAnswers: ['B'],
    explanation: "La culture du 'Blameless Post-Mortem' permet d'apprendre des défaillances systémiques et organisationnelles, d'enrichir la base de connaissances et de pérenniser les processus de livraison.",
  },
];

