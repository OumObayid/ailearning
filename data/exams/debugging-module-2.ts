import { ExamMetadata, ExamQuestion } from './types';

export const DEBUGGING_MODULE_2_EXAM_METADATA: ExamMetadata = {
  moduleId: 'debugging-module-2',
  title: "Examen de Certification — Module 2 : Techniques et Outils Fondamentaux de Débogage",
  durationMinutes: 35,
  passingScorePercent: 80, // Seuil de réussite à 80% (16/20)
  totalQuestions: 20,
};

export const DEBUGGING_MODULE_2_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Écosystème & Outils Fondamentaux
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Pour quelle raison fondamentale les outils de débogage spécialisés (DevTools, VS Code, Postman) sont-ils indispensables par rapport à la simple lecture du code source ?",
    options: [
      { letter: 'A', text: "Parce qu'ils compilent automatiquement le code JavaScript en binaire machine." },
      { letter: 'B', text: "Parce qu'ils permettent d'observer, de mesurer et d'analyser l'état réel de la mémoire et l'exécution dynamique du programme lors de situations concrètes." },
      { letter: 'C', text: "Parce qu'ils suppriment toutes les erreurs de syntaxe à l'enregistrement des fichiers." },
      { letter: 'D', text: "Parce que les navigateurs modernes interdisent l'affichage des sites sans DevTools actif." },
    ],
    correctAnswers: ['B'],
    explanation: "Le débogage dynamique permet de vérifier les données réelles en vol, les conditions de timing, les en-têtes HTTP et l'état de la mémoire, choses impossibles par simple inspection statique du code.",
  },
  {
    id: 2,
    question: "Lorsqu'une application React ne parvient pas à afficher des données provenant d'un backend Node.js, quel outil permet d'isoler en premier lieu si la défaillance vient de l'API ou du composant ?",
    options: [
      { letter: 'A', text: "MySQL Workbench." },
      { letter: 'B', text: "Postman ou l'onglet Network de DevTools (pour tester l'endpoint de façon autonome)." },
      { letter: 'C', text: "L'onglet Elements de Chrome." },
      { letter: 'D', text: "Le gestionnaire de tâches Windows." },
    ],
    correctAnswers: ['B'],
    explanation: "Tester la requête directement avec Postman ou examiner sa réponse brute dans Network permet de savoir si l'API retourne une erreur ou si c'est le composant React qui échoue à parser la réponse.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Chrome DevTools & Panneaux
  // -------------------------------------------------------------
  {
    id: 3,
    question: "Dans Chrome DevTools, quelle est la distinction technique entre l'onglet 'Styles' et l'onglet 'Computed' du panneau Elements ?",
    options: [
      { letter: 'A', text: "'Styles' est réservé au CSS inline et 'Computed' aux feuilles de style externes." },
      { letter: 'B', text: "'Styles' liste toutes les règles CSS déclarées avec leur cascade/surcharge, tandis que 'Computed' affiche les valeurs dimensionnelles finales effectivement calculées en pixels par le navigateur." },
      { letter: 'C', text: "'Computed' modifie directement le code CSS sur le disque dur du serveur." },
      { letter: 'D', text: "'Styles' ne fonctionne qu'avec Tailwind CSS." },
    ],
    correctAnswers: ['B'],
    explanation: "'Computed' résout l'ensemble des règles en cascade, spécificités et unités relatives (rem, %, vh) pour présenter la valeur géométrique finale appliquée à l'élément à l'écran.",
  },
  {
    id: 4,
    question: "Où peut-on vérifier la présence et la valeur d'un jeton d'authentification JWT persisté dans le navigateur ?",
    options: [
      { letter: 'A', text: "Panneau Sources > Call Stack." },
      { letter: 'B', text: "Panneau Network > Waterfall." },
      { letter: 'C', text: "Panneau Application > Storage > Local Storage (ou Cookies)." },
      { letter: 'D', text: "Panneau Memory > Heap Snapshots." },
    ],
    correctAnswers: ['C'],
    explanation: "Le panneau Application centralise tous les stockages côté client : Local Storage, Session Storage, Cookies et IndexedDB.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Console & Journalisation (Logging)
  // -------------------------------------------------------------
  {
    id: 5,
    question: "Quelle est la différence fondamentale entre l'instruction 'console.error()' et 'throw new Error()' en JavaScript ?",
    options: [
      { letter: 'A', text: "Il n'y a aucune différence, les deux arrêtent immédiatement le programme." },
      { letter: 'B', text: "'console.error()' formate et affiche un message au niveau d'erreur en console sans interrompre l'exécution, alors que 'throw' lève une exception qui interrompt le flux sauf si elle est capturée par un try/catch." },
      { letter: 'C', text: "'console.error()' redémarre le navigateur." },
      { letter: 'D', text: "'throw new Error()' est réservé aux applications backend Node.js." },
    ],
    correctAnswers: ['B'],
    explanation: "console.error est une simple méthode de sortie de log dans la console. L'instruction throw interrompt le fil d'exécution courant et propage une exception dans la pile d'appels.",
  },
  {
    id: 6,
    codeSnippet: `const employees = [
  { id: 1, name: "Sara", salary: 9500, department: "Engineering" },
  { id: 2, name: "Ahmed", salary: 8500, department: "Marketing" }
];`,
    question: "Quelle méthode permet d'afficher ces employés dans la console sous forme de tableau interactif ne montrant que les colonnes 'name' et 'salary' ?",
    options: [
      { letter: 'A', text: "console.log(employees.name, employees.salary);" },
      { letter: 'B', text: "console.table(employees, ['name', 'salary']);" },
      { letter: 'C', text: "console.dir(employees, { depth: 2 });" },
      { letter: 'D', text: "console.group(employees);" },
    ],
    correctAnswers: ['B'],
    explanation: "Le second paramètre optionnel de console.table(data, columns) permet de restreindre l'affichage tabulaire aux seules colonnes sélectionnées.",
  },
  {
    id: 7,
    question: "Quelle méthode de la Console est la plus efficace pour mesurer le temps d'exécution d'un algorithme de tri ou d'un calcul intensif ?",
    options: [
      { letter: 'A', text: "console.count() et console.clear()" },
      { letter: 'B', text: "console.time('label') au début, puis console.timeEnd('label') à la fin" },
      { letter: 'C', text: "console.trace('label')" },
      { letter: 'D', text: "console.assert('label')" },
    ],
    correctAnswers: ['B'],
    explanation: "console.time() et console.timeEnd() démarrent et arrêtent un chronomètre interne haute précision associé au label passé en argument et impriment la durée en millisecondes.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Stack Traces & Analyse des Erreurs
  // -------------------------------------------------------------
  {
    id: 8,
    codeSnippet: `Uncaught TypeError: Cannot read properties of undefined (reading 'price')
    at calculateSubtotal (server.js:24:18)
    at calculateOrder (server.js:32:15)
    at server.js:45:22`,
    question: "Comment interpréter correctement cette Stack Trace ?",
    options: [
      { letter: 'A', text: "L'erreur se situe à la ligne 45 et server.js a été supprimé." },
      { letter: 'B', text: "L'exception a surgi à la ligne 24 de server.js dans 'calculateSubtotal' parce que la variable cible est undefined, fonction elle-même appelée depuis 'calculateOrder' à la ligne 32." },
      { letter: 'C', text: "La base de données MySQL est saturée." },
      { letter: 'D', text: "La ligne 24 contient une erreur de syntaxe empêchant le démarrage de Node." },
    ],
    correctAnswers: ['B'],
    explanation: "La trace se lit de haut en bas pour le chemin immédiat : le premier frame (ligne 24) est le lieu du crash (accès à .price sur undefined), et le frame sous-jacent (ligne 32) est la fonction appelante.",
  },
  {
    id: 9,
    question: "Face à une exception, pourquoi le lieu du crash indiqué dans la Stack Trace est-il souvent différent de la cause racine ?",
    options: [
      { letter: 'A', text: "Parce que le navigateur inverse aléatoirement l'ordre des lignes dans les logs." },
      { letter: 'B', text: "Parce que le crash se produit là où la variable est consommée (ex: obj.name), alors que la cause racine provient de la fonction ou requête antérieure qui a produit ou retourné une valeur incorrecte (null ou undefined)." },
      { letter: 'C', text: "Parce que les exceptions ne s'appliquent qu'au code CSS." },
      { letter: 'D', text: "Parce que la machine virtuelle JavaScript ne gère pas les fonctions imbriquées." },
    ],
    correctAnswers: ['B'],
    explanation: "C'est la règle d'or du diagnostic : le lieu du crash n'est que la victime symptomatique d'une chaîne causale initiée en amont (requête sans résultat, absence de validation, etc.).",
  },
  {
    id: 10,
    question: "Comment l'API standard 'fetch()' se comporte-t-elle face à une réponse du serveur avec le code HTTP 404 Not Found ou 500 Server Error ?",
    options: [
      { letter: 'A', text: "Elle rejette immédiatement sa Promise et déclenche le bloc catch()." },
      { letter: 'B', text: "Elle résout la Promise avec succès (l'objet Response est reçu) : il incombe au développeur de vérifier 'response.ok' ou 'response.status'." },
      { letter: 'C', text: "Elle bloque le navigateur indéfiniment." },
      { letter: 'D', text: "Elle transforme automatiquement l'erreur en statut 200 OK." },
    ],
    correctAnswers: ['B'],
    explanation: "fetch() ne rejette sa Promise qu'en cas d'impossibilité réseau matérielle (DNS, hors ligne, CORS). Les statuts HTTP applicatifs 4xx et 5xx sont résolus avec response.ok = false.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Breakpoints & Pause Contrôlée
  // -------------------------------------------------------------
  {
    id: 11,
    question: "Quel est l'avantage décisif d'un 'Conditional Breakpoint' par rapport à un point d'arrêt classique ?",
    options: [
      { letter: 'A', text: "Il s'efface automatiquement après une seconde." },
      { letter: 'B', text: "Il ne suspend l'exécution que si une condition booléenne définie par le développeur est satisfaite, évitant des arrêts répétitifs dans les boucles ou filtres." },
      { letter: 'C', text: "Il modifie le code source en direct sans recompiler." },
      { letter: 'D', text: "Il empêche le serveur de consommer du CPU." },
    ],
    correctAnswers: ['B'],
    explanation: "Dans une boucle de 5 000 itérations, un conditional breakpoint avec `item.id === 99` suspend l'exécution uniquement sur l'élément cible recherché.",
  },
  {
    id: 12,
    question: "Qu'est-ce qu'un 'Logpoint' dans Chrome DevTools et quel est son atout majeur ?",
    options: [
      { letter: 'A', text: "Un point d'arrêt qui formate le disque dur." },
      { letter: 'B', text: "Un marqueur qui injecte un message d'évaluation dans la console à la volée SANS jamais suspendre l'exécution du code." },
      { letter: 'C', text: "Un fichier de configuration externe pour Apache." },
      { letter: 'D', text: "Un plugin payant de Chrome." },
    ],
    correctAnswers: ['B'],
    explanation: "Les Logpoints permettent de logger des valeurs au fil de l'eau dans des environnements de dev ou de staging sans avoir à éditer, rebuilder ou redéployer le code source.",
  },
  {
    id: 13,
    question: "À quoi sert l'instruction native 'debugger;' dans un script JavaScript ?",
    options: [
      { letter: 'A', text: "À désactiver tous les messages de warning." },
      { letter: 'B', text: "À déclencher un point d'arrêt logiciel qui suspend l'exécution si et seulement si un débogueur (DevTools ou VS Code) est attaché au processus." },
      { letter: 'C', text: "À redémarrer la machine virtuelle V8." },
      { letter: 'D', text: "À vider la mémoire cache du navigateur." },
    ],
    correctAnswers: ['B'],
    explanation: "Le mot-clé standard ECMAScript 'debugger;' agit comme un breakpoint programmable dans le code, ignoré silencieusement si aucun débogueur n'écoute.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Inspection des Variables & Scope
  // -------------------------------------------------------------
  {
    id: 14,
    question: "Lorsqu'un débogueur suspend l'exécution sur la ligne 'const tax = subtotal * 0.20;', quelle est la valeur de 'tax' à cet instant précis ?",
    options: [
      { letter: 'A', text: "La valeur calculée finale (ex: 40)." },
      { letter: 'B', text: "Elle n'est pas encore initialisée ou vaut undefined, car le breakpoint suspend l'exécution AVANT l'évaluation de la ligne." },
      { letter: 'C', text: "Une SyntaxError." },
      { letter: 'D', text: "null obligatoirement." },
    ],
    correctAnswers: ['B'],
    explanation: "Un breakpoint fige l'exécution juste avant l'exécution de l'instruction courante. Les variables calculées sur cette même ligne n'ont donc pas encore reçu leur affectation.",
  },
  {
    id: 15,
    question: "Dans le panneau Scope de Chrome DevTools, que contient spécifiquement la section 'Closure' ?",
    options: [
      { letter: 'A', text: "Les balises HTML fermées dans la page." },
      { letter: 'B', text: "Les variables mémorisées provenant d'une fonction parente englobante toujours accessibles par la fonction active." },
      { letter: 'C', text: "Les connexions SQL clôturées par la base." },
      { letter: 'D', text: "Les cookies expirés." },
    ],
    correctAnswers: ['B'],
    explanation: "En JavaScript, une closure permet à une fonction interne de conserver l'accès aux variables du scope lexical de sa fonction parente, même après que celle-ci a terminé son exécution.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Call Stack & Exécution Pas à Pas
  // -------------------------------------------------------------
  {
    id: 16,
    question: "Quel principe de pile régit la Call Stack du moteur JavaScript ?",
    options: [
      { letter: 'A', text: "FIFO (First In, First Out) : la première fonction appelée termine en premier." },
      { letter: 'B', text: "LIFO (Last In, First Out) : la dernière fonction appelée se place au sommet et termine en premier." },
      { letter: 'C', text: "Random Access Memory." },
      { letter: 'D', text: "Tri à bulles." },
    ],
    correctAnswers: ['B'],
    explanation: "La Call Stack empile les contextes d'exécution et dépile toujours le cadre situé au sommet dès que la fonction courante rencontre un return.",
  },
  {
    id: 17,
    question: "Quelle action réalise la commande 'Step Into' (touche F11) lorsqu'une ligne appelle une autre fonction ?",
    options: [
      { letter: 'A', text: "Elle exécute la fonction sans s'y arrêter." },
      { letter: 'B', text: "Elle fait entrer le débogueur à l'intérieur du corps de la fonction appelée pour inspecter ses arguments et son code pas à pas." },
      { letter: 'C', text: "Elle termine toute l'application." },
      { letter: 'D', text: "Elle annule la dernière commande Git." },
    ],
    correctAnswers: ['B'],
    explanation: "Step Into descend au niveau inférieur de la pile d'appels pour analyser le fonctionnement interne de la fonction invoquée.",
  },
  {
    id: 18,
    question: "Vous êtes entré dans une fonction utilitaire complexe avec Step Into et souhaitez maintenant revenir à la fonction appelante. Quelle commande utiliser ?",
    options: [
      { letter: 'A', text: "Step Over (F10)" },
      { letter: 'B', text: "Step Out (Shift + F11)" },
      { letter: 'C', text: "Stop (Shift + F5)" },
      { letter: 'D', text: "Restart" },
    ],
    correctAnswers: ['B'],
    explanation: "Step Out exécute le reste de la fonction active jusqu'à son return et replace l'interpréteur dans le contexte de la fonction appelante.",
  },

  // -------------------------------------------------------------
  // SECTION 8 : Débogueur Visual Studio Code
  // -------------------------------------------------------------
  {
    id: 19,
    question: "Dans le fichier de configuration .vscode/launch.json, quelle est la fonction de la directive '\"request\": \"attach\"' ?",
    options: [
      { letter: 'A', text: "Démarrer un nouveau serveur depuis zéro." },
      { letter: 'B', text: "Connecter le débogueur de VS Code à un processus Node.js déjà actif qui écoute sur le port d'inspection (ex: 9229)." },
      { letter: 'C', text: "Envoyer un email avec les logs d'erreurs." },
      { letter: 'D', text: "Compiler du code C++." },
    ],
    correctAnswers: ['B'],
    explanation: "Le mode 'attach' permet de raccorder VS Code à un processus en cours d'exécution (lancé via nodemon, docker ou en console avec node --inspect).",
  },
  {
    id: 20,
    question: "Quelle pratique garantit la sécurité des secrets d'API lors de la configuration du débogueur dans launch.json ?",
    options: [
      { letter: 'A', text: "Écrire les clés API en dur dans le fichier launch.json." },
      { letter: 'B', text: "Utiliser la propriété '\"envFile\": \"${workspaceFolder}/.env\"' et s'assurer que le fichier .env est listé dans .gitignore." },
      { letter: 'C', text: "Désactiver les mots de passe de la base de données." },
      { letter: 'D', text: "Partager le fichier launch.json publiquement sur GitHub." },
    ],
    correctAnswers: ['B'],
    explanation: "Comme .vscode/launch.json est partagé dans le repo de l'équipe, il ne doit contenir aucun secret : l'option envFile charge dynamiquement le .env local non versionné.",
  },
];

