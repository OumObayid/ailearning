import { ExamMetadata, ExamQuestion } from './types';

export const DEBUGGING_MODULE_3_EXAM_METADATA: ExamMetadata = {
  moduleId: 'debugging-module-3',
  title: "Examen de Certification — Module 3 : Débogage JavaScript et Node.js",
  durationMinutes: 35,
  passingScorePercent: 80, // Seuil de réussite à 80% (16/20)
  totalQuestions: 20,
};

export const DEBUGGING_MODULE_3_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Typologie des Erreurs V8 & Cause Racine
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Quelle catégorie d'erreur est déclenchée par le moteur V8 lorsque l'on tente de déréférencer une propriété sur une valeur null (ex: null.name) ?",
    options: [
      { letter: 'A', text: "SyntaxError" },
      { letter: 'B', text: "TypeError" },
      { letter: 'C', text: "ReferenceError" },
      { letter: 'D', text: "RangeError" },
    ],
    correctAnswers: ['B'],
    explanation: "Tenter d'accéder à des membres ou propriétés sur null ou undefined lève immédiatement une TypeError, car ces valeurs primitives ne possèdent pas d'objet prototype associé.",
  },
  {
    id: 2,
    question: "En ingénierie du débogage, pourquoi affirme-t-on que le lieu d'apparition d'une exception dans la Stack Trace n'est presque jamais la cause racine du bug ?",
    options: [
      { letter: 'A', text: "Parce que les navigateurs falsifient volontairement les numéros de ligne pour des raisons de sécurité." },
      { letter: 'B', text: "Parce que la ligne qui plante ne fait que révéler un état de données corrompu ou incomplet produit bien plus tôt en amont de la chaîne d'appels." },
      { letter: 'C', text: "Parce que la Stack Trace ne liste que les fonctions tierces de node_modules." },
      { letter: 'D', text: "Parce que les erreurs de syntaxe masquent toutes les autres erreurs." },
    ],
    correctAnswers: ['B'],
    explanation: "Si findUser() retourne undefined parce qu'un ID n'existe pas, c'est l'instruction d'affichage ultérieure qui crashe en tentant de lire user.name. La cause racine est l'absence de vérification en amont.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Variables, Types & Coercition
  // -------------------------------------------------------------
  {
    id: 3,
    question: "Que retourne l'expression typeof [] en JavaScript et quelle méthode standard doit-on employer pour vérifier la présence d'un tableau ?",
    options: [
      { letter: 'A', text: "Retourne 'array' ; vérifier avec value.isArray()." },
      { letter: 'B', text: "Retourne 'object' ; vérifier obligatoirement avec Array.isArray(value)." },
      { letter: 'C', text: "Retourne 'list' ; vérifier avec typeof value === 'list'." },
      { letter: 'D', text: "Retourne 'undefined' ; vérifier avec value instanceof List." },
    ],
    correctAnswers: ['B'],
    explanation: "En JavaScript, les tableaux sont des objets. typeof [] retourne donc historiquement 'object'. Seul Array.isArray() permet une identification robuste et standardisée.",
  },
  {
    id: 4,
    question: "Une variable price vaut \"100\" (chaîne) et quantity vaut 2 (nombre). Quel résultat produit l'opération price + quantity et pourquoi ?",
    options: [
      { letter: 'A', text: "102 (addition arithmétique)." },
      { letter: 'B', text: "\"1002\" (concaténation de chaînes car l'opérateur + bascule en présence d'une string)." },
      { letter: 'C', text: "NaN (Not a Number)." },
      { letter: 'D', text: "Une exception TypeError." },
    ],
    correctAnswers: ['B'],
    explanation: "L'opérateur + réalise une concaténation dès qu'un opérande est de type string. Pour une addition arithmétique, la conversion explicite via Number(price) est impérative.",
  },
  {
    id: 5,
    question: "Quelle méthode moderne (ES2022) permet de cloner profondément un objet complexe sans risquer de partager ses références d'objets imbriqués ?",
    options: [
      { letter: 'A', text: "Object.assign({}, source)" },
      { letter: 'B', text: "{ ...source }" },
      { letter: 'C', text: "structuredClone(source)" },
      { letter: 'D', text: "source.clone()" },
    ],
    correctAnswers: ['C'],
    explanation: "Le spread operator {...} et Object.assign ne créent que des copies superficielles (shallow copy) : les sous-objets restent partagés. structuredClone() garantit un clonage en profondeur.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Portée (Scope), Hoisting & Closures
  // -------------------------------------------------------------
  {
    id: 6,
    question: "Quelle est la conséquence technique de l'accès à une variable déclarée avec let avant sa ligne d'affectation dans son bloc ?",
    options: [
      { letter: 'A', text: "Elle retourne undefined comme avec var." },
      { letter: 'B', text: "Elle lève une ReferenceError: Cannot access before initialization due à la Temporal Dead Zone (TDZ)." },
      { letter: 'C', text: "Elle initialise la variable à null." },
      { letter: 'D', text: "Elle provoque une boucle infinie dans le compilateur V8." },
    ],
    correctAnswers: ['B'],
    explanation: "Contrairement à var qui est initialisée à undefined au hoisting, let et const résident dans la Temporal Dead Zone (TDZ) et tout accès anticipé déclenche une ReferenceError.",
  },
  {
    id: 7,
    question: "Une boucle for (var i = 0; i < 3; i++) pousse 3 fonctions fléchées () => i dans un tableau. Lors de l'exécution ultérieure de ces 3 fonctions, qu'affichent-elles et pourquoi ?",
    options: [
      { letter: 'A', text: "0, 1, et 2 car chaque itération clone la variable." },
      { letter: 'B', text: "3, 3, et 3 car var a une portée fonctionnelle et les trois closures partagent la même référence de variable finale." },
      { letter: 'C', text: "undefined, undefined, et undefined." },
      { letter: 'D', text: "Une TypeError car i a été détruit à la sortie de la boucle." },
    ],
    correctAnswers: ['B'],
    explanation: "var ignore la portée de bloc. À la fin de la boucle, i vaut 3. Pour obtenir 0, 1, 2, il faut utiliser let i, qui crée une nouvelle liaison lexicale indépendante par itération.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Fonctions, Conditions & Truthy/Falsy
  // -------------------------------------------------------------
  {
    id: 8,
    question: "Pourquoi l'écriture conditionnelle if (!discount) représente-t-elle un piège critique lors du calcul d'un prix ?",
    options: [
      { letter: 'A', text: "Parce que discount est converti en tableau." },
      { letter: 'B', text: "Parce que si la remise est légitimement de 0 DH, 0 est falsy et la condition considère à tort que la remise est absente." },
      { letter: 'C', text: "Parce que l'opérateur ! est interdit en JavaScript moderne." },
      { letter: 'D', text: "Parce qu'elle force discount à valoir null." },
    ],
    correctAnswers: ['B'],
    explanation: "0 appartient aux valeurs falsy de JavaScript. Tester !discount traite 0 de la même façon que null ou undefined, faussant la logique métier.",
  },
  {
    id: 9,
    question: "Comment syntaxiquement retourner directement un objet littéral depuis une fonction fléchée sans utiliser de mot-clé return ?",
    options: [
      { letter: 'A', text: "const f = () => { id: 1 };" },
      { letter: 'B', text: "const f = () => ({ id: 1 });" },
      { letter: 'C', text: "const f = () => [{ id: 1 }];" },
      { letter: 'D', text: "const f = () => object(id: 1);" },
    ],
    correctAnswers: ['B'],
    explanation: "Sans parenthèses ({ ... }), le compilateur V8 prend les accolades pour le bloc de corps de la fonction, et non pour un objet littéral, retournant alors undefined.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Promises & API fetch
  // -------------------------------------------------------------
  {
    id: 10,
    question: "Une requête fetch('https://api.monsite.com/data') reçoit une réponse du serveur avec le statut HTTP 404 Not Found. Quel est le comportement de la Promise retournée par fetch() ?",
    options: [
      { letter: 'A', text: "La Promise est automatiquement rejetée vers le bloc .catch()." },
      { letter: 'B', text: "La Promise est résolue avec succès dans le bloc .then(), et response.ok vaut false." },
      { letter: 'C', text: "Le thread Node.js se coupe avec une UnhandledPromiseRejection." },
      { letter: 'D', text: "fetch rejoue indéfiniment la requête." },
    ],
    correctAnswers: ['B'],
    explanation: "fetch() ne rejette que sur incident de transport réseau (coupure internet, échec DNS). Toute réponse HTTP reçue (même 404 ou 500) résout la promesse, d'où l'impératif de vérifier response.ok.",
  },
  {
    id: 11,
    question: "Dans une chaîne de promesses, si le premier .then(data => { console.log(data); }) ne contient aucun return, que recevra le .then() suivant ?",
    options: [
      { letter: 'A', text: "La même valeur data initiale." },
      { letter: 'B', text: "undefined" },
      { letter: 'C', text: "null" },
      { letter: 'D', text: "La promesse plante en TypeError." },
    ],
    correctAnswers: ['B'],
    explanation: "Un bloc .then() transmet à l'étape suivante exactement ce qu'il retourne. Faute de return explicite, il transmet undefined.",
  },
  {
    id: 12,
    question: "Quand doit-on préférer Promise.allSettled() à Promise.all() ?",
    options: [
      { letter: 'A', text: "Quand on veut un rejet immédiat dès la première défaillance." },
      { letter: 'B', text: "Quand on veut récupérer l'état et les données de toutes les promesses (succès ou échecs) sans abandonner l'ensemble." },
      { letter: 'C', text: "Uniquement pour les opérations synchrones." },
      { letter: 'D', text: "Quand on manipule des fichiers de plus de 1 Go." },
    ],
    correctAnswers: ['B'],
    explanation: "Promise.all est de type Fail-Fast (un échec annule tout). Promise.allSettled attend que toutes les tâches aboutissent et fournit le bilan individuel complet de chaque opération.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : async / await & Synchronisation
  // -------------------------------------------------------------
  {
    id: 13,
    question: "Dans une fonction async main(), on écrit const user = getUser(); (où getUser est async) sans mot-clé await. Que contient la variable user ?",
    options: [
      { letter: 'A', text: "L'objet utilisateur directement." },
      { letter: 'B', text: "L'objet Promise à l'état pending." },
      { letter: 'C', text: "null" },
      { letter: 'D', text: "Une SyntaxError immédiate." },
    ],
    correctAnswers: ['B'],
    explanation: "Une fonction async retourne systématiquement une Promise. Sans await, la variable capture l'instance de la promesse avant sa résolution.",
  },
  {
    id: 14,
    question: "Pourquoi un bloc try { fetchUser(); } catch (err) { ... } sans await ne parvient-il pas à intercepter les rejets d'erreurs de la fonction fetchUser() ?",
    options: [
      { letter: 'A', text: "Parce que le try/catch s'est achevé sur la pile synchrone bien avant que la promesse ne rejette sur l'Event Loop." },
      { letter: 'B', text: "Parce que try/catch est incompatible avec Node.js." },
      { letter: 'C', text: "Parce qu'il faut utiliser obligatoirement process.exit()." },
      { letter: 'D', text: "Parce que fetchUser() doit être écrit en TypeScript." },
    ],
    correctAnswers: ['A'],
    explanation: "Sans await, le fil synchrone traverse et quitte le bloc try immédiatement. Lorsque l'erreur asynchrone se produit, le gestionnaire catch n'est plus présent dans la pile d'exécution.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Race Conditions & Ressources Partagées
  // -------------------------------------------------------------
  {
    id: 15,
    question: "Deux clients passent simultanément commande de 4 articles sur un stock de 5. Sans synchronisation, les deux commandes sont acceptées et 8 articles sont vendus. Quel est le nom de cette anomalie ?",
    options: [
      { letter: 'A', text: "Une Memory Leak." },
      { letter: 'B', text: "Une Race Condition (condition de concurrence)." },
      { letter: 'C', text: "Un Stack Overflow." },
      { letter: 'D', text: "Un Deadlock de thread." },
    ],
    correctAnswers: ['B'],
    explanation: "La Race Condition se produit lorsque deux opérations lisent le même état avant que la première n'ait fini de le modifier, conduisant à une incohérence majeure de données.",
  },
  {
    id: 16,
    question: "Dans une instance Node.js unique, comment sérialiser des réservations concurrentes pour garantir que les vérifications et modifications de stock s'exécutent l'une après l'autre ?",
    options: [
      { letter: 'A', text: "En enchaînant chaque opération dans une file d'attente formée par une chaîne de Promises (ex: queue = queue.then(...))." },
      { letter: 'B', text: "En insérant une pause avec setTimeout(1000)." },
      { letter: 'C', text: "En utilisant une boucle infinie for (;;)." },
      { letter: 'D', text: "En désactivant le réseau." },
    ],
    correctAnswers: ['A'],
    explanation: "Enregistrer queue = queue.then(...) sérialise rigoureusement l'exécution : chaque réservation attend la terminaison complète de la précédente avant de consulter le stock actualisé.",
  },

  // -------------------------------------------------------------
  // SECTION 8 : Exceptions, Node Inspect & Observabilité
  // -------------------------------------------------------------
  {
    id: 17,
    question: "Quelle est la particularité d'un middleware d'erreur global dans Express.js pour qu'il soit reconnu comme tel par le framework ?",
    options: [
      { letter: 'A', text: "Il doit être déclaré au début du fichier avant toutes les routes." },
      { letter: 'B', text: "Il doit impérativement déclarer exactement 4 paramètres : (err, req, res, next)." },
      { letter: 'C', text: "Il doit retourner un objet XML." },
      { letter: 'D', text: "Il doit utiliser le protocole WebSocket." },
    ],
    correctAnswers: ['B'],
    explanation: "Express inspecte la propriété fn.length de chaque middleware. Une fonction avec 4 arguments est identifiée comme réceptacle central des erreurs transmises par next(err).",
  },
  {
    id: 18,
    question: "Quelle est la différence fondamentale entre les options de ligne de commande node --inspect et node --inspect-brk ?",
    options: [
      { letter: 'A', text: "--inspect démarre l'application immédiatement, alors que --inspect-brk suspend l'exécution à la première ligne de code au démarrage." },
      { letter: 'B', text: "--inspect est réservé à Linux et --inspect-brk à Windows." },
      { letter: 'C', text: "--inspect-brk supprime les breakpoints." },
      { letter: 'D', text: "Aucune différence, ce sont de stricts synonymes." },
    ],
    correctAnswers: ['A'],
    explanation: "--inspect-brk est particulièrement précieux lorsque le bogue ou le crash se produit dès les premières millisecondes d'initialisation du serveur ou de chargement des modules.",
  },
  {
    id: 19,
    question: "Pourquoi est-il primordial d'attribuer un Request ID (ex: via randomUUID) à chaque requête HTTP dans une API Node.js de production ?",
    options: [
      { letter: 'A', text: "Pour empêcher les attaques DDoS." },
      { letter: 'B', text: "Pour corréler tous les logs asynchrones émis par une même requête et retracer son cycle de vie exact en cas d'incident." },
      { letter: 'C', text: "Pour remplacer la session utilisateur." },
      { letter: 'D', text: "Pour compresser les réponses JSON." },
    ],
    correctAnswers: ['B'],
    explanation: "Sous forte charge, les logs de multiples utilisateurs s'entremêlent. Le Request ID permet de filtrer instantanément tous les messages et stack traces appartenant à la même requête.",
  },
  {
    id: 20,
    question: "Que signifie l'erreur système Node.js 'Error: listen EADDRINUSE: address already in use :::3000' et quel est le réflexe de diagnostic professionnel ?",
    options: [
      { letter: 'A', text: "La mémoire vive est saturée ; il faut augmenter le swap de l'OS." },
      { letter: 'B', text: "Le port 3000 est déjà occupé par un autre processus en cours ; il faut identifier son PID (ex: netstat) et le terminer si nécessaire." },
      { letter: 'C', text: "Le fichier package.json est corrompu." },
      { letter: 'D', text: "Le pare-feu bloque le protocole TCP." },
    ],
    correctAnswers: ['B'],
    explanation: "EADDRINUSE signale un conflit de port réseau. Identifier le processus hôte via netstat/findstr ou tasklist permet de libérer le port bloqué proprement.",
  },
];

