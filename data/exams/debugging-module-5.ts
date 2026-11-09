import { ExamMetadata, ExamQuestion } from './types';

export const DEBUGGING_MODULE_5_EXAM_METADATA: ExamMetadata = {
  moduleId: 'debugging-module-5',
  title: "Examen de Certification — Module 5 : Débogage avancé, performances et sécurité",
  durationMinutes: 45,
  passingScorePercent: 80, // Seuil de réussite à 80% (16/20)
  totalQuestions: 20,
};

export const DEBUGGING_MODULE_5_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Métriques de Performance & DevTools (Q1 - Q3)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Que mesure exactement le TTFB (Time To First Byte) et quelle cause principale explique un TTFB anormalement élevé (> 1500 ms) avec un temps de transfert réseau court ?",
    options: [
      { letter: 'A', text: "Le temps de rendu du DOM dans Chrome ; causé par un script React bloquant." },
      { letter: 'B', text: "Le délai entre l'émission de la requête et la réception du premier octet de réponse ; causé par des traitements serveur ou requêtes SQL lentes côté backend." },
      { letter: 'C', text: "La vitesse de téléchargement des images statiques depuis un CDN." },
      { letter: 'D', text: "Le temps nécessaire pour compiler le code TypeScript côté client." },
    ],
    correctAnswers: ['B'],
    explanation: "Le TTFB englobe la latence réseau aller, le temps de traitement sur le serveur (logique métier + requêtes de base de données), et le début de l'envoi de la réponse. Si le réseau est stable, un TTFB élevé pointe directement vers le serveur backend.",
  },
  {
    id: 2,
    question: "Pourquoi les percentiles (P95, P99) sont-ils beaucoup plus révélateurs que la simple moyenne arithmétique pour évaluer la latence d'une API en production ?",
    options: [
      { letter: 'A', text: "Parce que la moyenne arithmétique est toujours fausse en JavaScript." },
      { letter: 'B', text: "Parce que la moyenne masque les requêtes aberrantes ou dégradées subies par les utilisateurs les plus malchanceux, alors que le P99 indique le temps en dessous duquel 99 % des requêtes sont traitées." },
      { letter: 'C', text: "Parce que les percentiles ne prennent en compte que les requêtes ayant échoué avec une erreur 500." },
      { letter: 'D', text: "Parce que Chrome DevTools ne supporte que les calculs de percentiles." },
    ],
    correctAnswers: ['B'],
    explanation: "Dans un système distribué, 90 % des requêtes peuvent répondre en 20 ms, mais 5 % mettent 5 secondes. La moyenne donne l'illusion d'une application rapide (~250 ms), alors qu'un utilisateur sur vingt subit un ralentissement inacceptable. Le P95 et le P99 mesurent cette réalité.",
  },
  {
    id: 3,
    question: "Dans l'onglet Performance de Chrome DevTools, quelle indication visuelle signale une 'Long Task' bloquant le thread principal du navigateur pendant plus de 50 ms ?",
    options: [
      { letter: 'A', text: "Une ligne verte continue sous l'onglet Network." },
      { letter: 'B', text: "Un triangle rouge dans le coin supérieur de la tâche dans la timeline Main et des hachures rouges." },
      { letter: 'C', text: "Une notification modale demandant le rechargement de la page." },
      { letter: 'D', text: "L'affichage du logo V8 dans la console." },
    ],
    correctAnswers: ['B'],
    explanation: "Chrome DevTools signale les tâches dépassant 50 ms par un coin supérieur rouge vif et des bandes diagonales rouges. Elles indiquent que l'Event Loop UI est gelée, empêchant le navigateur de répondre aux clics ou de maintenir 60 FPS.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Fuites Mémoire & Heap Snapshots (Q4 - Q6)
  // -------------------------------------------------------------
  {
    id: 4,
    question: "Dans le moteur Google V8, quelle est la cause fondamentale d'une fuite de mémoire (Memory Leak) ?",
    options: [
      { letter: 'A', text: "Une allocation de variables primitives (nombres, booléens) sur la Call Stack." },
      { letter: 'B', text: "Des objets devenus inutiles dans le Heap qui restent référencés depuis une racine active (GC Root) comme l'objet global, des closures ou des écouteurs d'événements persistants." },
      { letter: 'C', text: "L'utilisation de const au lieu de let." },
      { letter: 'D', text: "Une surcharge de requêtes HTTP refusées par le pare-feu." },
    ],
    correctAnswers: ['B'],
    explanation: "Le Garbage Collector de V8 utilise un algorithme de marquage et balayage (Mark-and-Sweep). Tout objet accessible depuis une racine active (GC Root) est considéré comme vivant et ne peut jamais être collecté, même si le reste de l'application ne s'en sert plus.",
  },
  {
    id: 5,
    question: "Quelle méthode Node.js native permet de surveiller programmatiquement l'évolution de la mémoire consommée par le processus ?",
    options: [
      { letter: 'A', text: "console.memory()" },
      { letter: 'B', text: "process.memoryUsage(), qui renvoie rss, heapTotal, heapUsed et external." },
      { letter: 'C', text: "os.freememPercentage()" },
      { letter: 'D', text: "v8.cleanGarbageNow()" },
    ],
    correctAnswers: ['B'],
    explanation: "process.memoryUsage() fournit des métriques exactes en octets : heapUsed (mémoire réellement occupée par les objets V8), heapTotal (mémoire allouée par V8), et RSS (Resident Set Size, empreinte totale dans la RAM physique).",
  },
  {
    id: 6,
    question: "Pour comparer deux Heap Snapshots dans Chrome DevTools afin de repérer les objets qui s'accumulent anormalement, quelle vue doit être sélectionnée ?",
    options: [
      { letter: 'A', text: "La vue 'Containment' triée par ID." },
      { letter: 'B', text: "La vue 'Comparison' en examinant la colonne '# Delta' (différence d'allocations positives) et 'Alloc. Size'." },
      { letter: 'C', text: "La vue 'Statistics' en camembert." },
      { letter: 'D', text: "La vue 'Dominators'." },
    ],
    correctAnswers: ['B'],
    explanation: "La vue Comparison compare le Snapshot 2 au Snapshot 1. La colonne '# Delta' montre la variation du nombre d'instances créées et non collectées. Un delta positif continu sur des closures ou des objets métier indique une fuite active.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : CPU & Event Loop Node.js (Q7 - Q8)
  // -------------------------------------------------------------
  {
    id: 7,
    question: "Quel est l'impact immédiat sur un serveur Node.js si une route exécute une boucle synchrone de calcul de 5 secondes (ex: for (let i=0; i < 1e10; i++)) ?",
    options: [
      { letter: 'A', text: "Seul le client ayant envoyé la requête attend 5 secondes ; les autres clients sont servis normalement sur d'autres threads." },
      { letter: 'B', text: "L'Event Loop monocœur de Node.js est totalement bloquée : toutes les requêtes des autres clients sont suspendues pendant 5 secondes, provoquant des timeouts en cascade." },
      { letter: 'C', text: "Node.js lance automatiquement un sous-processus sans impacter les performances." },
      { letter: 'D', text: "Le serveur renvoie immédiatement une erreur 404." },
    ],
    correctAnswers: ['B'],
    explanation: "Node.js traite le code JavaScript sur un unique thread d'Event Loop. Tout calcul CPU lourd synchrone monopolise ce thread. Aucune requête I/O, aucun callback ni aucun timer ne peut s'exécuter tant que le calcul n'est pas terminé.",
  },
  {
    id: 8,
    question: "Quelle est la solution architecturale recommandée sous Node.js pour exécuter un traitement CPU intensif (ex: compression d'image ou hachage lourd) sans bloquer l'Event Loop ?",
    options: [
      { letter: 'A', text: "Déporter le calcul vers un Worker Thread (module 'worker_threads') ou vers une file de tâches asynchrone dédiée." },
      { letter: 'B', text: "Augmenter la taille du Heap avec l'option --max-old-space-size." },
      { letter: 'C', text: "Remplacer let par var dans les boucles de calcul." },
      { letter: 'D', text: "Ajouter un middleware express.json() supplémentaire." },
    ],
    correctAnswers: ['A'],
    explanation: "Le module worker_threads permet d'exécuter du JavaScript en parallèle sur des threads séparés du système d'exploitation, laissant l'Event Loop principale totalement fluide pour servir les requêtes entrantes.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Requêtes SQL Lentes & EXPLAIN (Q9 - Q10)
  // -------------------------------------------------------------
  {
    id: 9,
    question: "Dans le résultat d'une commande 'EXPLAIN' ou 'EXPLAIN ANALYZE' sous MySQL, quelle valeur dans la colonne 'type' indique le pire scénario de performance nécessitant un index ?",
    options: [
      { letter: 'A', text: "const" },
      { letter: 'B', text: "eq_ref" },
      { letter: 'C', text: "ALL (Full Table Scan), signifiant que le moteur lit l'intégralité de la table ligne par ligne." },
      { letter: 'D', text: "range" },
    ],
    correctAnswers: ['C'],
    explanation: "Le type ALL (Full Table Scan) signifie qu'aucun index n'a pu être exploité. MySQL doit parcourir chaque enregistrement sur le disque. Sur des tables volumineuses (> 100 000 lignes), cela fait chuter le débit et bloque les ressources du serveur.",
  },
  {
    id: 10,
    question: "Comment activer le Slow Query Log dans MySQL pour journaliser automatiquement toutes les requêtes durant plus de 2 secondes ?",
    options: [
      { letter: 'A', text: "SET GLOBAL slow_query_log = 'ON'; SET GLOBAL long_query_time = 2;" },
      { letter: 'B', text: "ALTER TABLE queries ADD SLOW LOG;" },
      { letter: 'C', text: "CREATE TRIGGER slow_log AFTER 2 SECONDS;" },
      { letter: 'D', text: "npm install mysql-slow-log" },
    ],
    correctAnswers: ['A'],
    explanation: "En configurant slow_query_log = 'ON' et long_query_time = 2, le serveur MySQL enregistre dans un fichier dédié l'empreinte SQL exacte, le temps d'exécution et le nombre de lignes scannées pour toute requête dépassant 2 secondes.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Concurrence & Race Conditions (Q11 - Q12)
  // -------------------------------------------------------------
  {
    id: 11,
    question: "Dans une application e-commerce, deux clients achètent le même dernier article simultanément. Le code backend lit le stock (stock = 1), valide les deux achats, puis décrémente deux fois. Comment qualifie-t-on ce bug et quelle est sa cause ?",
    options: [
      { letter: 'A', text: "Une fuite mémoire causée par le cache Redis." },
      { letter: 'B', text: "Une condition de concurrence (Race Condition de type Read-Modify-Write) due à l'absence de transaction avec verrou ou d'opération atomique en base." },
      { letter: 'C', text: "Une erreur de syntaxe SQL dans la clause WHERE." },
      { letter: 'D', text: "Un dépassement de pile (Stack Overflow)." },
    ],
    correctAnswers: ['B'],
    explanation: "La séquence entrelacée (Client A lit stock=1, Client B lit stock=1, Client A met à jour stock=0, Client B met à jour stock=-1) produit une survente (oversell). Pour la prévenir, la vérification et la décrémentation doivent être atomiques ou protégées par un verrou transactionnel.",
  },
  {
    id: 12,
    question: "Quelle requête SQL permet de garantir une décrémentation atomique de stock sous MySQL sans risquer de survente ni de solde négatif ?",
    options: [
      { letter: 'A', text: "UPDATE products SET stock = stock - 1 WHERE id = ? AND stock >= 1;" },
      { letter: 'B', text: "SELECT * FROM products WHERE id = ?; UPDATE products SET stock = 0;" },
      { letter: 'C', text: "DELETE FROM products WHERE stock <= 0;" },
      { letter: 'D', text: "SET stock = stock - 1;" },
    ],
    correctAnswers: ['A'],
    explanation: "La clause 'WHERE id = ? AND stock >= 1' s'exécute avec le verrou de ligne exclusif d'InnoDB. Si deux requêtes s'exécutent en même temps, la première met à jour la ligne (affectedRows = 1) et la seconde trouve stock = 0, retournant affectedRows = 0, signalant l'épuisement du stock sans conflit.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Charge & Saturation Serveur (Q13 - Q14)
  // -------------------------------------------------------------
  {
    id: 13,
    question: "Quel outil CLI basé sur Node.js est réputé pour réaliser des tests de charge HTTP à très haute vitesse (capable de simuler des milliers de requêtes par seconde) ?",
    options: [
      { letter: 'A', text: "Autocannon (ou k6 / wrk)" },
      { letter: 'B', text: "Nodemon" },
      { letter: 'C', text: "Prettier" },
      { letter: 'D', text: "Webpack" },
    ],
    correctAnswers: ['A'],
    explanation: "Autocannon est un benchmark HTTP écrit en Node.js ultra-rapide, capable de mesurer le Throughput (req/s), la distribution de latence (P50/P99) et les erreurs HTTP sous forte concurrence.",
  },
  {
    id: 14,
    question: "Pour traiter des tâches asynchrones lourdes (génération de factures PDF, envoi de 10 000 emails) sans surcharger le serveur web, quelle architecture est la plus robuste ?",
    options: [
      { letter: 'A', text: "Exécuter les fonctions dans le middleware Express en bloquant la réponse client." },
      { letter: 'B', text: "Utiliser une file de messages (Message Queue comme BullMQ avec Redis ou RabbitMQ) et des processus Workers d'arrière-plan indépendants." },
      { letter: 'C', text: "Enregistrer les tâches dans des variables globales en mémoire du serveur." },
      { letter: 'D', text: "Demander au client d'envoyer 10 000 requêtes consécutives." },
    ],
    correctAnswers: ['B'],
    explanation: "Le patron producteur/consommateur avec file de messages (BullMQ + Redis) garantit que le serveur web répond en 20 ms (accusé de réception), tandis que des workers dédiés consomment les tâches à leur propre rythme avec retry automatique et reprise sur panne.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Pool de Connexions BDD (Q15 - Q16)
  // -------------------------------------------------------------
  {
    id: 15,
    question: "Que se passe-t-il si une application backend ouvre une nouvelle connexion MySQL par requête HTTP (createConnection) au lieu d'utiliser un Connection Pool ?",
    options: [
      { letter: 'A', text: "L'application fonctionne beaucoup plus vite car les connexions sont dédiées." },
      { letter: 'B', text: "Sous forte charge, le serveur MySQL sature son quota de descripteurs de sockets, rejette les connexions avec 'Too many connections' ou ECONNREFUSED, et la latence s'effondre en raison du coût de la poignée de main TCP/TLS." },
      { letter: 'C', text: "MySQL passe automatiquement en mode cluster multi-maître." },
      { letter: 'D', text: "Toutes les requêtes sont automatiquement converties en requêtes SQLite locales." },
    ],
    correctAnswers: ['B'],
    explanation: "Établir une connexion TCP avec authentification MySQL coûte plusieurs millisecondes et consomme de la mémoire serveur. Un Connection Pool (ex: pool.getConnection()) maintient un nombre contrôlé de connexions réutilisables, protégeant la base de données.",
  },
  {
    id: 16,
    question: "Quelle erreur critique de programmation provoque l'épuisement silencieux d'un Connection Pool (Pool Leak) ?",
    options: [
      { letter: 'A', text: "Oublier de libérer la connexion avec connection.release() dans un bloc finally après une requête ou en cas d'erreur." },
      { letter: 'B', text: "Utiliser des requêtes préparées avec pool.execute()." },
      { letter: 'C', text: "Définir waitForConnections: true." },
      { letter: 'D', text: "Configurer un mot de passe fort pour l'utilisateur MySQL." },
    ],
    correctAnswers: ['A'],
    explanation: "Si une connexion empruntée au pool n'est pas libérée par connection.release() (notamment si une exception est levée avant le release), elle reste bloquée indéfiniment. Dès que le poolLimit est atteint, toutes les futures requêtes restent suspendues et tombent en timeout.",
  },

  // -------------------------------------------------------------
  // SECTION 8 : OWASP, IDOR & Injection SQL (Q17 - Q18)
  // -------------------------------------------------------------
  {
    id: 17,
    question: "Une route Express 'GET /api/orders/:id' retourne la commande sans vérifier que req.user.id correspond à order.user_id. De quelle faille de sécurité s'agit-il selon l'OWASP Top 10 ?",
    options: [
      { letter: 'A', text: "Cross-Site Scripting (XSS)" },
      { letter: 'B', text: "IDOR / BOLA (Insecure Direct Object Reference / Broken Object Level Authorization)." },
      { letter: 'C', text: "Server-Side Request Forgery (SSRF)" },
      { letter: 'D', text: "Déni de service distribué (DDoS)" },
    ],
    correctAnswers: ['B'],
    explanation: "L'IDOR/BOLA survient lorsqu'une application permet à un utilisateur authentifié d'accéder aux données d'un autre utilisateur en modifiant simplement l'identifiant dans l'URL. Le serveur doit systématiquement valider la propriété de la ressource ou les droits d'accès.",
  },
  {
    id: 18,
    question: "Pourquoi la concaténation de variables utilisateurs dans une chaîne SQL ('SELECT * FROM users WHERE email = \"' + email + '\"') est-elle vulnérable aux injections SQL, et comment y remédier définitivement ?",
    options: [
      { letter: 'A', text: "Parce que MySQL n'accepte pas les chaînes de plus de 50 caractères ; il faut encoder en Base64." },
      { letter: 'B', text: "Parce qu'un attaquant peut injecter des caractères de contrôle SQL (\") pour modifier la syntaxe logique de la commande ; le remède fondamental est l'utilisation stricte de requêtes préparées avec paramètres de liaison (Prepared Statements, pool.execute(sql, [params]))." },
      { letter: 'C', text: "Parce que Node.js ne supporte pas les guillemets simples." },
      { letter: 'D', text: "Il faut supprimer la base de données et utiliser des fichiers texte." },
    ],
    correctAnswers: ['B'],
    explanation: "Avec les Prepared Statements, le moteur de base de données compile d'abord la structure syntaxique de la requête SQL. Les variables sont ensuite envoyées séparément comme de simples valeurs scalaires. Même si la variable contient \"' OR 1=1 --\", elle est traitée comme une chaîne littérale inoffensive.",
  },

  // -------------------------------------------------------------
  // SECTION 9 : Sécurité des Fichiers & Observabilité (Q19 - Q20)
  // -------------------------------------------------------------
  {
    id: 19,
    question: "Un endpoint permet de télécharger des documents via 'path.join(__dirname, 'uploads', req.query.file)'. Quel payload d'attaque exploite une faille de Path Traversal pour exfiltrer des fichiers système ?",
    options: [
      { letter: 'A', text: "../../etc/passwd (ou ..\\..\\Windows\\win.ini)" },
      { letter: 'B', text: "SELECT * FROM passwords" },
      { letter: 'C', text: "<script>alert(1)</script>" },
      { letter: 'D', text: "DROP TABLE users;" },
    ],
    correctAnswers: ['A'],
    explanation: "La séquence '../' permet de remonter l'arborescence des dossiers et de s'échapper du répertoire restreint 'uploads'. Pour la neutraliser, il faut valider avec path.resolve() et vérifier que le chemin cible commence strictement par le répertoire racine autorisé (rootPath).",
  },
  {
    id: 20,
    question: "Dans le cadre de l'observabilité moderne, quels sont les 'Trois Piliers' indispensables et comment se complètent-ils pour diagnostiquer un incident en production ?",
    options: [
      { letter: 'A', text: "HTML, CSS et JavaScript pour le rendu visuel." },
      { letter: 'B', text: "Metrics (signaux agrégés quantitatifs : CPU, taux d'erreurs), Logs (journalisation structurée d'événements contextuels horodatés) et Traces (suivi temporel du parcours d'une requête à travers les microservices)." },
      { letter: 'C', text: "Backup, Restore et Snapshot." },
      { letter: 'D', text: "Docker, Kubernetes et GitHub." },
    ],
    correctAnswers: ['B'],
    explanation: "Les Métriques (Prometheus/Grafana) alertent qu'une anomalie se produit (ex: pic d'erreurs 500 ou latence P99 à 4s). Les Traces (OpenTelemetry/Jaeger) localisent exactement quel microservice ou requête SQL est en cause. Les Logs (Winston/Loki/Elastic) fournissent la stacktrace et le contexte détaillés pour corriger le bug.",
  },
];

