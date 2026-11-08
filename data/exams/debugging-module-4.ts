import { ExamMetadata, ExamQuestion } from './types';

export const DEBUGGING_MODULE_4_EXAM_METADATA: ExamMetadata = {
  moduleId: 'debugging-module-4',
  title: "Examen de Certification — Module 4 : Débogage des API et des systèmes Backend",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (16/20)
  totalQuestions: 20,
};

export const DEBUGGING_MODULE_4_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Protocoles HTTP & Codes de Statut
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Quelle méthode HTTP est sémantiquement conçue pour créer une nouvelle ressource sur le serveur et quelle réponse avec en-tête Location est attendue ?",
    options: [
      { letter: 'A', text: "GET avec statut 200 OK" },
      { letter: 'B', text: "POST avec statut 201 Created et en-tête Location indiquant l'URI de la ressource créée" },
      { letter: 'C', text: "PUT avec statut 204 No Content sans body" },
      { letter: 'D', text: "PATCH avec statut 302 Found" },
    ],
    correctAnswers: ['B'],
    explanation: "Selon la RFC 7231, la méthode POST sur une collection (ex: /api/tasks) doit retourner le code 201 Created ainsi qu'un header Location pointant vers la ressource nouvellement créée (ex: /api/tasks/42).",
  },
  {
    id: 2,
    question: "Quelle est la distinction fondamentale entre le code HTTP 401 Unauthorized et le code HTTP 403 Forbidden ?",
    options: [
      { letter: 'A', text: "401 signale une ressource introuvable, tandis que 403 signale un serveur surchargé." },
      { letter: 'B', text: "401 indique une absence ou invalidité de preuve d'identité (non authentifié), tandis que 403 indique une identité reconnue mais sans droits suffisants (non autorisé)." },
      { letter: 'C', text: "401 est déclenché par MySQL, tandis que 403 est déclenché par React." },
      { letter: 'D', text: "401 concerne les requêtes GET et 403 concerne exclusivement les requêtes POST et DELETE." },
    ],
    correctAnswers: ['B'],
    explanation: "401 Unauthorized signifie 'Qui êtes-vous ? (fournissez un jeton valide)'. 403 Forbidden signifie 'Je sais qui vous êtes, mais vos privilèges (rôles/permissions) ne vous permettent pas d'accéder à cette ressource'.",
  },
  {
    id: 3,
    question: "Un client envoie un payload JSON syntaxiquement parfait, mais le champ 'email' ne respecte pas le format RFC ou l'âge est négatif. Quel code de statut HTTP est le plus rigoureux ?",
    options: [
      { letter: 'A', text: "500 Internal Server Error" },
      { letter: 'B', text: "400 Bad Request ou 422 Unprocessable Entity" },
      { letter: 'C', text: "404 Not Found" },
      { letter: 'D', text: "502 Bad Gateway" },
    ],
    correctAnswers: ['B'],
    explanation: "Lorsque la syntaxe JSON est valide mais que les contraintes sémantiques ou métier sont violées, les codes 422 (Unprocessable Entity) ou 400 (Bad Request) sont les standards de l'industrie pour les erreurs de validation client.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Routage Express & Gestion des Paramètres
  // -------------------------------------------------------------
  {
    id: 4,
    question: "Pourquoi la déclaration d'une route 'app.get(\"/api/users/:id\", ...)' avant 'app.get(\"/api/users/profile\", ...)' empêche-t-elle l'accès au profil ?",
    options: [
      { letter: 'A', text: "Parce qu'Express interdit d'avoir plus de deux routes sous le même préfixe." },
      { letter: 'B', text: "Parce qu'Express évalue les routes dans l'ordre d'enregistrement : le segment dynamique ':id' capture la valeur littérale 'profile' comme paramètre." },
      { letter: 'C', text: "Parce que le mot 'profile' est un mot réservé dans le moteur V8 de Node.js." },
      { letter: 'D', text: "Parce que le client reçoit obligatoirement une erreur CORS sur les routes nommées." },
    ],
    correctAnswers: ['B'],
    explanation: "Le routeur Express s'arrête au premier pattern correspondant. Pour 'GET /api/users/profile', le pattern '/api/users/:id' correspond avec req.params.id = 'profile'. Les routes littérales doivent toujours être déclarées avant les routes dynamiques.",
  },
  {
    id: 5,
    question: "Quel est le type de données initial de 'req.params.id' dans un contrôleur Express et quelle précaution doit être appliquée avant de l'exploiter dans une requête SQL ?",
    options: [
      { letter: 'A', text: "C'est un Number natif ; aucune conversion n'est nécessaire." },
      { letter: 'B', text: "C'est un String ; il faut le transtyper (Number/parseInt) et valider qu'il s'agit d'un entier positif pour éviter NaN ou des injections." },
      { letter: 'C', text: "C'est un Buffer binaire qui doit être décodé en UTF-8." },
      { letter: 'D', text: "C'est un objet JSON qui doit être désérialisé avec JSON.parse()." },
    ],
    correctAnswers: ['B'],
    explanation: "Toutes les valeurs de req.params et req.query sont des chaînes de caractères (string). Passer une chaîne non vérifiée peut produire 'WHERE id = NaN' ou fausser les comparaisons strictes.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Middlewares Express & Erreurs Courantes
  // -------------------------------------------------------------
  {
    id: 6,
    question: "Quel comportement observable survient si un middleware Express n'envoie aucune réponse (res.send/res.json) et oublie d'appeler next() ?",
    options: [
      { letter: 'A', text: "Express lève immédiatement l'exception 'MiddlewareTimeoutException'." },
      { letter: 'B', text: "La requête reste suspendue indéfiniment côté serveur jusqu'à ce que le client atteigne son timeout réseau (Gateway Timeout)." },
      { letter: 'C', text: "Le serveur Express redémarre instantanément." },
      { letter: 'D', text: "Express renvoie un statut 200 vide par défaut au bout de 50 millisecondes." },
    ],
    correctAnswers: ['B'],
    explanation: "Sans appel à next() ou envoi de réponse, la promesse ou la fonction du cycle de vie Express reste en suspens. Le socket TCP reste ouvert jusqu'au timeout du client ou du reverse-proxy.",
  },
  {
    id: 7,
    question: "Quelle est la cause exacte de l'exception Node.js : 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client' ?",
    options: [
      { letter: 'A', text: "Le port 3000 est déjà utilisé par une autre instance de Node.js." },
      { letter: 'B', text: "Le serveur a tenté d'envoyer des en-têtes ou une réponse HTTP alors qu'une réponse avait déjà été expédiée pour cette même requête (ex: absence de return après res.json())." },
      { letter: 'C', text: "Le client a fermé son navigateur avant la fin du téléchargement." },
      { letter: 'D', text: "La clé secrète JWT contient des caractères non autorisés." },
    ],
    correctAnswers: ['B'],
    explanation: "Le protocole HTTP n'autorise qu'une seule réponse par requête. Si un middleware renvoie un 401 mais n'interrompt pas son exécution avec 'return', il appelle next() et le contrôleur suivant tente d'écrire une seconde réponse, provoquant ce crash.",
  },
  {
    id: 8,
    question: "Comment Express reconnaît-il qu'un middleware est un gestionnaire d'erreurs (Error Handler) et non un middleware standard ?",
    options: [
      { letter: 'A', text: "Par son nom de fonction qui doit obligatoirement s'appeler 'errorHandler'." },
      { letter: 'B', text: "Par l'arité de sa fonction : il doit obligatoirement déclarer exactement 4 paramètres : (err, req, res, next)." },
      { letter: 'C', text: "En l'enregistrant via une méthode spéciale nommée 'app.error()'." },
      { letter: 'D', text: "Par la présence d'une directive 'use error' en début de fichier." },
    ],
    correctAnswers: ['B'],
    explanation: "Express inspecte la propriété 'fn.length' de la fonction enregistrée. Si elle déclare 4 arguments (err, req, res, next), elle est routée exclusivement lorsqu'une erreur est passée à next(err) ou levée dans la chaîne.",
  },
  {
    id: 9,
    question: "Pourquoi 'app.use(express.json())' doit-il impérativement être enregistré AVANT les routes applicatives ?",
    options: [
      { letter: 'A', text: "Parce qu'Express refuse de démarrer avec listen() dans le cas inverse." },
      { letter: 'B', text: "Parce que les requêtes reçues par les routes placées avant ce middleware ne bénéficieront pas du décodeur de flux et auront 'req.body === undefined'." },
      { letter: 'C', text: "Pour crypter automatiquement les paquets TCP en transit." },
      { letter: 'D', text: "Pour injecter les variables d'environnement du fichier .env." },
    ],
    correctAnswers: ['B'],
    explanation: "Les middlewares s'exécutent dans l'ordre de leur déclaration. Si la route est atteinte avant express.json(), le corps de la requête n'a pas encore été agrégé ni désérialisé depuis le stream Node.js.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Mécanisme CORS & Sécurité des Navigateurs
  // -------------------------------------------------------------
  {
    id: 10,
    question: "Dans le protocole CORS, qu'est-ce qu'une requête Preflight et quelle méthode HTTP utilise-t-elle ?",
    options: [
      { letter: 'A', text: "Une requête HEAD destinée à tester la bande passante du serveur." },
      { letter: 'B', text: "Une requête préliminaire émise automatiquement avec la méthode OPTIONS par le navigateur pour vérifier que le serveur autorise l'origine, la méthode et les headers avant d'envoyer la vraie requête." },
      { letter: 'C', text: "Une requête de diagnostic lancée uniquement par Postman." },
      { letter: 'D', text: "Un ping TCP ICMP vers le port 3306 de MySQL." },
    ],
    correctAnswers: ['B'],
    explanation: "Dès qu'une requête HTTP sort des critères des 'requêtes simples' (ex: méthode PUT/DELETE, en-tête Content-Type JSON, token Authorization), le navigateur envoie un OPTIONS de pré-vérification.",
  },
  {
    id: 11,
    question: "Pourquoi une requête envoyée depuis Postman réussit-elle avec succès alors que la même requête échoue dans une application React avec un message d'erreur CORS ?",
    options: [
      { letter: 'A', text: "Parce que Postman émule un serveur MySQL local." },
      { letter: 'B', text: "Parce que la politique CORS (Same-Origin Policy) est une restriction de sécurité implémentée exclusivement par les navigateurs web, et n'est pas appliquée par les outils comme Postman ou cURL." },
      { letter: 'C', text: "Parce que React refuse de charger les fichiers JSON." },
      { letter: 'D', text: "Parce que Node.js désactive CORS pour toutes les requêtes provenant de Windows." },
    ],
    correctAnswers: ['B'],
    explanation: "CORS protège l'utilisateur dans son navigateur contre les scripts malveillants cross-site. Les clients serveurs, CLI ou Postman ne disposent pas de bac à sable Same-Origin et ignorent ces en-têtes.",
  },
  {
    id: 12,
    question: "Quelle combinaison d'en-têtes CORS provoque un rejet immédiat par la sécurité du navigateur ?",
    options: [
      { letter: 'A', text: "Access-Control-Allow-Origin: http://localhost:5173 avec Access-Control-Allow-Credentials: true" },
      { letter: 'B', text: "Access-Control-Allow-Origin: * (wildcard) combiné avec Access-Control-Allow-Credentials: true" },
      { letter: 'C', text: "Access-Control-Allow-Methods: GET, POST avec Access-Control-Max-Age: 86400" },
      { letter: 'D', text: "Access-Control-Allow-Headers: Content-Type, Authorization" },
    ],
    correctAnswers: ['B'],
    explanation: "La spécification W3C/WHATWG interdit formellement d'utiliser l'étoile générique '*' lorsque des informations d'authentification ou cookies (credentials: include) sont transmis. L'origine doit être explicitement nommée.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Authentification JWT & Sécurité
  // -------------------------------------------------------------
  {
    id: 13,
    question: "Quelles sont les trois parties constitutives d'un JSON Web Token (JWT) séparées par des points ?",
    options: [
      { letter: 'A', text: "Protocole, Domaine et Port" },
      { letter: 'B', text: "Header (algorithme), Payload (données) et Signature cryptographique" },
      { letter: 'C', text: "Clé publique, Clé privée et Certificat SSL" },
      { letter: 'D', text: "Request, Response et Next" },
    ],
    correctAnswers: ['B'],
    explanation: "Un JWT se présente sous la forme 'aaaa.bbbb.cccc' où la première partie encode l'algorithme, la seconde les données utilisateur (claims), et la troisième la signature calculée avec le secret serveur.",
  },
  {
    id: 14,
    question: "Pourquoi l'exécution de 'jwt.verify(req.headers.authorization, secret)' provoque-t-elle l'erreur 'jwt malformed' si le client respecte la norme standard Bearer ?",
    options: [
      { letter: 'A', text: "Parce que le secret JWT doit obligatoirement faire plus de 128 caractères." },
      { letter: 'B', text: "Parce que l'en-tête contient le préfixe 'Bearer ' suivi d'un espace, qui n'est pas du format Base64 valide et doit être extrait au préalable (ex: header.split(' ')[1])." },
      { letter: 'C', text: "Parce que jwt.verify ne fonctionne que sur les requêtes HTTPS." },
      { letter: 'D', text: "Parce que le token doit d'abord être compressé avec gzip." },
    ],
    correctAnswers: ['B'],
    explanation: "Le client transmet 'Authorization: Bearer <token>'. Si l'on passe la chaîne entière, la librairie échoue sur le mot littéral 'Bearer'. Il faut parser la chaîne pour n'isoler que le jeton cryptographique.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Base de Données MySQL & Connection Pooling
  // -------------------------------------------------------------
  {
    id: 15,
    question: "Que signifie le code d'erreur réseau MySQL 'ECONNREFUSED' levé par le pilote mysql2 lors de l'appel à pool.getConnection() ?",
    options: [
      { letter: 'A', text: "Le mot de passe de l'utilisateur root est incorrect." },
      { letter: 'B', text: "Le serveur MySQL n'est pas démarré ou n'écoute pas sur l'adresse IP et le port spécifiés (souvent 127.0.0.1:3306)." },
      { letter: 'C', text: "La table demandée n'existe pas dans la base de données." },
      { letter: 'D', text: "Le certificat SSL du serveur de base de données est expiré." },
    ],
    correctAnswers: ['B'],
    explanation: "ECONNREFUSED est une erreur système TCP/IP : le système cible a refusé la tentative de connexion car aucun processus n'écoute sur le port spécifié.",
  },
  {
    id: 16,
    question: "Dans une application Node.js utilisant un pool de connexions (connectionLimit: 10), quelle est la conséquence dramatique de l'oubli systématique de 'connection.release()' ?",
    options: [
      { letter: 'A', text: "La mémoire vive de la machine est instantanément saturée." },
      { letter: 'B', text: "Dès que 10 requêtes ont été traitées, le pool est totalement épuisé et toutes les requêtes suivantes sont bloquées indéfiniment en file d'attente." },
      { letter: 'C', text: "MySQL supprime automatiquement la table concernée." },
      { letter: 'D', text: "Les requêtes continuent de fonctionner mais deviennent en lecture seule." },
    ],
    correctAnswers: ['B'],
    explanation: "Le pool limite le nombre de connexions concurrentes. Si les connexions empruntées ne sont pas restituées au pool (via connection.release()), le quota est vite atteint et l'API ne peut plus servir aucune requête.",
  },
  {
    id: 17,
    question: "Pourquoi l'utilisation de requêtes préparées avec des marqueurs de substitution (?) via 'pool.execute(sql, params)' est-elle obligatoire en production ?",
    options: [
      { letter: 'A', text: "Parce que MySQL refuse d'exécuter des requêtes contenant des variables template JavaScript." },
      { letter: 'B', text: "Pour immuniser l'API contre les injections SQL et déléguer l'échappement et le typage des paramètres au moteur de base de données." },
      { letter: 'C', text: "Pour compresser les données en mémoire cache Redis." },
      { letter: 'D', text: "Parce que les requêtes avec (?) consomment deux fois moins de bande passante réseau." },
    ],
    correctAnswers: ['B'],
    explanation: "L'injection SQL survient lorsque des données non fiables modifient la structure logique de la requête. Les requêtes préparées transmettent le code SQL compilé et les paramètres séparément, neutralisant toute tentative d'injection.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Débogage SQL & Performances
  // -------------------------------------------------------------
  {
    id: 18,
    question: "Quel outil natif du moteur MySQL permet d'analyser le plan d'exécution d'une requête et de détecter un scan complet de table (type: ALL) ?",
    options: [
      { letter: 'A', text: "L'instruction 'DESCRIBE DATABASE;'" },
      { letter: 'B', text: "Le mot-clé 'EXPLAIN' préfixé devant la requête SELECT" },
      { letter: 'C', text: "La commande 'SHOW LOGS;'" },
      { letter: 'D', text: "L'outil 'mysqlcheck --repair'" },
    ],
    correctAnswers: ['B'],
    explanation: "EXPLAIN révèle les index utilisés, le type d'accès (const, ref, ALL) et le nombre estimé de lignes parcourues, permettant de diagnostiquer les goulots d'étranglement de performance.",
  },

  // -------------------------------------------------------------
  // SECTION 8 : Centralisation des Logs & Observabilité
  // -------------------------------------------------------------
  {
    id: 19,
    question: "À quoi sert l'attribution d'un 'Request ID' (ou Correlation ID) unique sous forme d'UUID à chaque requête HTTP dès son entrée dans Express ?",
    options: [
      { letter: 'A', text: "À remplacer les mots de passe des utilisateurs dans la base de données." },
      { letter: 'B', text: "À corréler et filtrer tous les logs générés par une requête spécifique à travers les middlewares, contrôleurs et requêtes SQL dans un environnement multi-utilisateurs concurrent." },
      { letter: 'C', text: "À empêcher les attaques par déni de service distribué (DDoS)." },
      { letter: 'D', text: "À accélérer le temps de réponse du garbage collector Node.js." },
    ],
    correctAnswers: ['B'],
    explanation: "Dans une API sollicitée par de nombreux clients simultanés, les logs s'entremêlent. Le Correlation ID permet d'isoler l'historique complet d'une seule transaction du début à la fin.",
  },
  {
    id: 20,
    question: "Quelle est la bonne pratique absolue en matière de confidentialité lors de la journalisation des requêtes Backend ?",
    options: [
      { letter: 'A', text: "Ne journaliser aucune requête contenant une méthode POST." },
      { letter: 'B', text: "Filtrer et masquer (redact / sanitize) systématiquement les données sensibles (mots de passe, tokens JWT, numéros de cartes) avant d'écrire dans les logs." },
      { letter: 'C', text: "Enregistrer tous les mots de passe en clair dans un fichier 'passwords.log' séparé." },
      { letter: 'D', text: "Effacer les fichiers de logs toutes les 60 secondes pour éviter les fuites." },
    ],
    correctAnswers: ['B'],
    explanation: "Les logs de production sont souvent partagés et indexés dans des plateformes externes. Ne jamais y exposer d'informations personnelles (PII) ou de secrets cryptographiques sous peine de faille de sécurité majeure (RGPD, PCI-DSS).",
  },
];

