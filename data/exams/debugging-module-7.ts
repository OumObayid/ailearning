import { ExamMetadata, ExamQuestion } from './types';

export const DEBUGGING_MODULE_7_EXAM_METADATA: ExamMetadata = {
  moduleId: 'debugging-module-7',
  title: "Examen de Certification — Module 7 : Ingénierie du débogage assistée par IA",
  durationMinutes: 45,
  passingScorePercent: 80, // Seuil de réussite à 80% (16/20)
  totalQuestions: 20,
};

export const DEBUGGING_MODULE_7_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Rôle de l'IA & Fondamentaux du Diagnostic (Q1 - Q2)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Quelle est la définition la plus rigoureuse du rôle d'un modèle d'IA générative dans un processus d'investigation logicielle ?",
    options: [
      { letter: 'A', text: "Un substitut autonome au développeur garantissant mathématiquement l'absence de bugs." },
      { letter: 'B', text: "Un assistant d'investigation capable d'analyser des anomalies et de proposer des hypothèses de travail, qui doivent impérativement être vérifiées par le développeur avec des preuves techniques." },
      { letter: 'C', text: "Un compilateur statique qui supprime automatiquement les exceptions à l'exécution." },
      { letter: 'D', text: "Un serveur de secours prenant le relais lors d'une panne de base de données." },
    ],
    correctAnswers: ['B'],
    explanation: "L'IA est un puissant accélérateur d'analyse et de corrélation, mais une réponse plausible n'est jamais une preuve. Le développeur conserve la responsabilité finale de vérifier la cause racine par des logs, des breakpoints et des tests.",
  },
  {
    id: 2,
    question: "Face à une erreur 'TypeError: Cannot read properties of null (reading \"id\")' dans un service backend, que représente cette erreur ?",
    options: [
      { letter: 'A', text: "La cause racine définitive de l'incident." },
      { letter: 'B', text: "Le symptôme et la cause immédiate de l'exception, mais pas nécessairement la cause racine qui peut résider dans l'absence de gestion d'un résultat SQL vide." },
      { letter: 'C', text: "Une défaillance matérielle de la mémoire vive du serveur." },
      { letter: 'D', text: "Une incompatibilité entre le navigateur client et le protocole HTTP/2." },
    ],
    correctAnswers: ['B'],
    explanation: "La cause immédiate est l'accès à une propriété sur une valeur null. La cause racine est la raison fondamentale pour laquelle cette variable vaut null (ex: requête SQL ne trouvant aucun enregistrement et non protégée par un contrôle d'existence).",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Débogage Traditionnel vs Assisté par IA (Q3 - Q4)
  // -------------------------------------------------------------
  {
    id: 3,
    question: "Dans quelle situation le débogage traditionnel (breakpoints, inspection de la call stack dans VS Code) reste-t-il indispensable face à une analyse IA ?",
    options: [
      { letter: 'A', text: "Uniquement pour les applications écrites en HTML pur." },
      { letter: 'B', text: "Pour confirmer avec certitude l'état réel des variables, l'évaluation pas à pas et le flux d'exécution dynamique en mémoire au moment exact de l'incident." },
      { letter: 'C', text: "Jamais, car un agent IA peut deviner l'état exact de la RAM à distance." },
      { letter: 'D', text: "Uniquement lorsque l'accès à Internet est payant." },
    ],
    correctAnswers: ['B'],
    explanation: "L'IA raisonne sur du code statique et des descriptions textuelles. Seuls les outils de débogage dynamique (debugger VS Code, Chrome DevTools) permettent d'observer l'état exact des objets et de valider les hypothèses en cours d'exécution.",
  },
  {
    id: 4,
    question: "Quelle combinaison méthodologique est recommandée pour investiguer une anomalie complexe distribuée entre un frontend React et une API Node.js ?",
    options: [
      { letter: 'A', text: "Faire réécrire tout le projet par l'IA sans consulter les logs." },
      { letter: 'B', text: "Combiner l'analyse réseau (Chrome DevTools Network), l'examen des logs Express, l'assistance d'un agent pour corréler les fichiers et la validation par des tests automatisés." },
      { letter: 'C', text: "Désactiver les erreurs dans le fichier package.json." },
      { letter: 'D', text: "Redémarrer le serveur MySQL à chaque requête." },
    ],
    correctAnswers: ['B'],
    explanation: "L'ingénierie moderne du débogage associe l'observation outillée (DevTools, logs), la rapidité d'analyse transversale de l'agent IA et la rigueur de vérification des tests unitaires et d'intégration.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Les 7 Composants du Prompt Professionnel (Q5 - Q6)
  // -------------------------------------------------------------
  {
    id: 5,
    question: "Quels sont les 7 composants d'un prompt d'ingénierie de diagnostic structuré et professionnel ?",
    options: [
      { letter: 'A', text: "HTML, CSS, JS, SQL, Git, Docker, Kubernetes." },
      { letter: 'B', text: "ROLE, OBJECTIVE, CONTEXT, DATA, TASKS, CONSTRAINTS et OUTPUT FORMAT." },
      { letter: 'C', text: "START, PAUSE, RESUME, STOP, LOG, DEBUG, CLEAN." },
      { letter: 'D', text: "Nom, Prénom, Email, Mot de passe, Adresse, Téléphone, Société." },
    ],
    correctAnswers: ['B'],
    explanation: "Cette structure en 7 piliers garantit que le modèle comprend son rôle d'expert, son objectif sans ambiguïté, l'écosystème technique, les logs réels, le plan de travail, les limites de sécurité et la présentation attendue du rapport.",
  },
  {
    id: 6,
    question: "Pourquoi est-il crucial d'inclure explicitement la section 'CONSTRAINTS' interdisant toute modification de fichier dans un prompt de diagnostic ?",
    options: [
      { letter: 'A', text: "Parce que les modèles de langage refusent d'analyser le code si on ne leur interdit pas d'écrire." },
      { letter: 'B', text: "Pour contraindre l'IA à se focaliser sur l'analyse de cause racine et l'administration de preuves techniques avant d'autoriser la moindre modification dans le code source." },
      { letter: 'C', text: "Pour réduire les coûts de bande passante réseau du terminal." },
      { letter: 'D', text: "Parce qu'Express interdit les modifications de fichiers en environnement de développement." },
    ],
    correctAnswers: ['B'],
    explanation: "Sans contrainte explicite, un agent IA a tendance à proposer un patch hâtif ou à modifier le code immédiatement, risquant de traiter le symptôme plutôt que l'origine fondamentale du dysfonctionnement.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Logs & Stack Traces (Q7 - Q8)
  // -------------------------------------------------------------
  {
    id: 7,
    question: "Dans une Stack Trace, quelle ligne indique généralement l'instruction précise ayant provoqué l'exception et comment doit-elle être interprétée ?",
    options: [
      { letter: 'A', text: "La dernière ligne de node_modules ; elle accuse toujours une dépendance externe." },
      { letter: 'B', text: "La première ligne suivant le type d'erreur ; elle donne le nom de la fonction, le fichier et la ligne/colonne de l'apparition de l'erreur, tandis que les lignes suivantes remontent la chaîne des fonctions appelantes." },
      { letter: 'C', text: "La date et l'heure système situées en bas du terminal." },
      { letter: 'D', text: "Le numéro de version de TypeScript." },
    ],
    correctAnswers: ['B'],
    explanation: "La ligne supérieure de la trace (top of stack) localise l'instruction précise où l'exception s'est matérialisée. Les lignes suivantes représentent la pile d'appels (call stack) permettant de remonter la trajectoire de l'erreur jusqu'au contrôleur ou gestionnaire d'événement.",
  },
  {
    id: 8,
    question: "Avant de transmettre des logs ou des extraits de configuration à un modèle IA externe, quelle mesure de sécurité est obligatoire ?",
    options: [
      { letter: 'A', text: "Compiler le code en assembleur x86." },
      { letter: 'B', text: "Anonymiser et masquer impérativement les secrets, clés API, mots de passe, tokens JWT et données personnelles (RGPD)." },
      { letter: 'C', text: "Ajouter le mot-clé 'private' devant chaque ligne de log." },
      { letter: 'D', text: "Convertir tous les caractères en majuscules." },
    ],
    correctAnswers: ['B'],
    explanation: "L'exfiltration de secrets (.env, tokens d'authentification Bearer, identifiants de bases de données) dans un prompt constitue une violation critique de sécurité. Seuls des logs assainis et anonymisés doivent être soumis.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Contexte Technique (Q9 - Q10)
  // -------------------------------------------------------------
  {
    id: 9,
    question: "Pourquoi la précision des versions majeures des dépendances (ex: Express 5 vs Express 4, React 19 vs React 18) est-elle déterminante pour un diagnostic IA fiable ?",
    options: [
      { letter: 'A', text: "Parce que l'IA refuse de répondre si les versions ne sont pas fournies." },
      { letter: 'B', text: "Parce que les signatures d'API, la gestion des promesses asynchrones et les middlewares changent entre les versions majeures, évitant à l'IA de proposer des corrections obsolètes ou incompatibles." },
      { letter: 'C', text: "Parce que React 19 ne supporte plus le langage JavaScript." },
      { letter: 'D', text: "Parce que MySQL 8 n'utilise plus de requêtes SQL." },
    ],
    correctAnswers: ['B'],
    explanation: "Par exemple, Express 5 gère nativement le rejet des fonctions asynchrones (async/await) sans middleware tiers, alors qu'Express 4 exigeait un catch explicite ou un wrapper. Fournir les versions évite les erreurs de prescription.",
  },
  {
    id: 10,
    question: "En quoi la commande 'git log -5 --oneline' ou 'git diff HEAD~1' peut-elle éclairer un diagnostic de bug assisté par IA ?",
    options: [
      { letter: 'A', text: "Elle supprime automatiquement les conflits de fusion." },
      { letter: 'B', text: "Elle permet d'isoler l'historique récent des modifications (schéma, nouvelle dépendance, modification de contrat d'API) ayant introduit la régression." },
      { letter: 'C', text: "Elle crypte le code source pour protéger les secrets." },
      { letter: 'D', text: "Elle sert à réinitialiser le serveur de production." },
    ],
    correctAnswers: ['B'],
    explanation: "Un bug émerge fréquemment à la suite d'une modification récente. Connaître le diff du dernier commit permet à l'agent de cibler immédiatement le périmètre exact de la régression.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Séparation Diagnostic vs Remédiation (Q11 - Q12)
  // -------------------------------------------------------------
  {
    id: 11,
    question: "Quel danger technique majeur court-on en demandant à un agent IA 'Corrige immédiatement ce bug' dès l'apparition d'une erreur 500 ?",
    options: [
      { letter: 'A', text: "Le terminal risque de bloquer la mémoire cache du processeur." },
      { letter: 'B', text: "L'agent risque d'appliquer un correctif superficiel masquant le symptôme (ex: optional chaining ou try/catch silencieux) tout en laissant la cause racine intacte." },
      { letter: 'C', text: "Le compilateur TypeScript supprimera toutes les interfaces du projet." },
      { letter: 'D', text: "L'application sera automatiquement convertie en Python." },
    ],
    correctAnswers: ['B'],
    explanation: "Sans phase de diagnostic préalable, l'IA cherche la voie de moindre résistance pour faire taire l'exception visible (ex: optional chaining), ce qui crée des bugs silencieux en cascade dans les couches applicatives.",
  },
  {
    id: 12,
    question: "Quelle est la séquence rigoureuse d'un cycle de débogage professionnel assisté par IA ?",
    options: [
      { letter: 'A', text: "Corriger le code → Supprimer les logs → Redémarrer le serveur." },
      { letter: 'B', text: "Observer → Diagnostiquer (sans modifier) → Confirmer la cause racine avec des preuves → Valider un plan de correction → Autoriser les modifications ciblées → Tester automatiquement." },
      { letter: 'C', text: "Accepter la première proposition de l'IA → Déployer en production." },
      { letter: 'D', text: "Créer 10 nouveaux fichiers → Exécuter git reset --hard." },
    ],
    correctAnswers: ['B'],
    explanation: "Ce cycle méthodique garantit que chaque étape repose sur des faits techniques vérifiables, prévenant les dérives et les modifications intempestives sur le projet.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Causes Probables & Méthode des 5 Pourquoi (Q13 - Q14)
  // -------------------------------------------------------------
  {
    id: 13,
    question: "Dans le cadre de l'analyse des causes racines (RCA), à quoi sert la méthode des '5 Pourquoi' ?",
    options: [
      { letter: 'A', text: "À compter le nombre d'erreurs dans le fichier de logs." },
      { letter: 'B', text: "À remonter itérativement la chaîne causale d'un problème observable jusqu'au défaut de conception ou à l'absence de règle métier sous-jacente." },
      { letter: 'C', text: "À poser obligatoirement cinq questions distinctes à cinq modèles d'IA différents." },
      { letter: 'D', text: "À redémarrer cinq fois le conteneur Docker." },
    ],
    correctAnswers: ['B'],
    explanation: "La méthode des 5 Pourquoi permet de passer du symptôme (l'API répond 500) à l'erreur immédiate (accès à une propriété d'undefined) puis à la cause racine (le repository ne gère pas le retour d'une requête vide).",
  },
  {
    id: 14,
    question: "Quand une cause racine formulée par une IA peut-elle être considérée comme techniquement confirmée ?",
    options: [
      { letter: 'A', text: "Dès que l'IA affirme son diagnostic avec un niveau de confiance de 99 %." },
      { letter: 'B', text: "Uniquement lorsqu'elle est étayée par des éléments concrets (résultat de requête reproduit, inspection de variable, logs horodatés) et vérifiée par un test unitaire ou d'intégration." },
      { letter: 'C', text: "Dès que le message d'erreur est supprimé du terminal." },
      { letter: 'D', text: "Dès que le code est écrit en TypeScript strict." },
    ],
    correctAnswers: ['B'],
    explanation: "Le sentiment d'assurance d'un modèle de langage ne vaut pas preuve technique. Une cause racine est confirmée par la confrontation aux données dynamiques et par la reproductibilité contrôlée du phénomène.",
  },

  // -------------------------------------------------------------
  // SECTION 8 : Détection des Hallucinations (Q15 - Q16)
  // -------------------------------------------------------------
  {
    id: 15,
    question: "Dans un projet utilisant 'mysql2/promise', l'IA propose le code 'await db.findUserById(25)'. De quel type d'erreur s'agit-il ?",
    options: [
      { letter: 'A', text: "Une optimisation de requête SQL moderne." },
      { letter: 'B', text: "Une hallucination d'API (méthode inventée n'existant pas sur l'objet Pool de mysql2/promise, qui requiert db.execute() avec SQL natif)." },
      { letter: 'C', text: "Une commande réservée aux systèmes Linux." },
      { letter: 'D', text: "Une erreur de syntaxe TypeScript dans la déclaration du type number." },
    ],
    correctAnswers: ['B'],
    explanation: "L'IA confond ici le pilote SQL bas niveau (mysql2) avec les conventions d'un ORM de type Prisma ou TypeORM. Cette méthode fictive provoquera un crash 'db.findUserById is not a function'.",
  },
  {
    id: 16,
    question: "Pour résoudre une exception sur 'user.email' quand 'user' est null, l'IA propose de remplacer par 'user?.email'. Pourquoi cette proposition peut-elle être trompeuse ?",
    options: [
      { letter: 'A', text: "Parce que l'optional chaining est interdit dans tous les projets Node.js." },
      { letter: 'B', text: "Parce qu'elle empêche le crash mais retourne HTTP 200 avec { email: undefined }, violant le contrat d'API REST qui exige de renvoyer une réponse HTTP 404 Not Found." },
      { letter: 'C', text: "Parce que cela supprime automatiquement le mot de passe de l'utilisateur." },
      { letter: 'D', text: "Parce que l'opérateur '?.' consomme deux fois plus de mémoire vive." },
    ],
    correctAnswers: ['B'],
    explanation: "C'est l'archétype du patch cosmétique. L'application cesse de crasher immédiatement, mais répond un code 200 succès vide pour une ressource introuvable, trompant le client frontend.",
  },

  // -------------------------------------------------------------
  // SECTION 9 : Agents Intégrés aux IDE (Q17 - Q18)
  // -------------------------------------------------------------
  {
    id: 17,
    question: "Quelle est la caractéristique fondamentale différenciant un agent IA intégré à un IDE (ex: Google Antigravity) d'un simple chatbot dans un navigateur ?",
    options: [
      { letter: 'A', text: "L'agent intégré ne dispose d'aucun modèle de langage." },
      { letter: 'B', text: "L'agent intégré s'insère dans une boucle opérationnelle autonome : il peut explorer l'arborescence du projet, lire des fichiers, exécuter des commandes autorisées et inspecter ses propres résultats." },
      { letter: 'C', text: "L'agent intégré ne fonctionne que pour les projets écrits en C++." },
      { letter: 'D', text: "Le chatbot dans le navigateur peut modifier les fichiers du disque dur sans autorisation." },
    ],
    correctAnswers: ['B'],
    explanation: "Un agent IDE dispose d'outils (File Search, File Reader, Command Runner, Git Inspection). Il peut parcourir les relations entre composants et exécuter des tâches en chaîne sous supervision.",
  },
  {
    id: 18,
    question: "Dans une équipe multi-agents dédiée au débogage, quelle est la responsabilité assignée au rôle 'QA Reviewer' ?",
    options: [
      { letter: 'A', text: "Écrire l'architecture initiale de la base de données." },
      { letter: 'B', text: "Auditer de manière critique le patch proposé, vérifier qu'aucun fichier hors périmètre n'a été touché et s'assurer que les tests de non-régression valident bien la correction." },
      { letter: 'C', text: "Supprimer les fichiers .env avant la mise en production." },
      { letter: 'D', text: "Installer toutes les dépendances recommandées par npm audit." },
    ],
    correctAnswers: ['B'],
    explanation: "Le QA Reviewer agit en contre-pouvoir indépendant de l'agent Developer. Il s'assure que le patch est minimal, sans effets secondaires et formellement prouvé par des assertions de test.",
  },

  // -------------------------------------------------------------
  // SECTION 10 : Permissions & Validation par Tests (Q19 - Q20)
  // -------------------------------------------------------------
  {
    id: 19,
    question: "En vertu du principe du moindre privilège (Least Privilege), quelles permissions doivent être appliquées à un agent lors d'une mission de diagnostic ?",
    options: [
      { letter: 'A', text: "Permissions totales en écriture et suppression (WRITE + DELETE) sur tous les disques." },
      { letter: 'B', text: "Lecture (READ) et recherche (SEARCH) limitées au code source et aux logs, avec interdiction stricte de modification (WRITE), d'accès aux fichiers secrets (.env) et de commandes destructives." },
      { letter: 'C', text: "Accès exclusif en écriture sans autorisation de lecture." },
      { letter: 'D', text: "Aucune permission de lecture ; l'agent doit deviner le code par télépathie." },
    ],
    correctAnswers: ['B'],
    explanation: "Pendant l'analyse, l'agent doit avoir les yeux grands ouverts (READ/SEARCH) mais les mains liées (pas de WRITE/DELETE). Les secrets (.env) doivent demeurer inaccessibles pour prévenir toute fuite ou altération.",
  },
  {
    id: 20,
    question: "Comment appliquer la démarche 'Red - Green - Refactor' pour vérifier formellement la correction d'un bug dans une route Express avec Vitest et Supertest ?",
    options: [
      { letter: 'A', text: "Écrire le test après avoir déployé le code sur les serveurs de production." },
      { letter: 'B', text: "1. Écrire un test automatisé reproduisant le cas fautif et constater qu'il échoue (RED) avec l'ancien code. 2. Appliquer la correction ciblée et constater que le test réussit (GREEN). 3. Vérifier la non-régression sur l'ensemble de la suite." },
      { letter: 'C', text: "Désactiver les assertions avec expect(true).toBe(true)." },
      { letter: 'D', text: "Remplacer Vitest par une simple boucle console.log." },
    ],
    correctAnswers: ['B'],
    explanation: "La phase RED prouve scientifiquement que le test est sensible au bug et ne valide pas des faux positifs. La phase GREEN prouve que la correction traite bien le scénario attendu sans régressions.",
  },
];

