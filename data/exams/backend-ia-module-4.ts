import { ExamMetadata, ExamQuestion } from './types';

export const BACKEND_IA_MODULE_4_EXAM_METADATA: ExamMetadata = {
  moduleId: 'backend-ia-module-4',
  title: "Examen Officiel de Certification — Module 4 : Bases de Données SQL Haute Performance & Indexation B+Tree",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (32/40)
  totalQuestions: 40,
};

export const BACKEND_IA_MODULE_4_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "Dans le moteur de stockage InnoDB de MySQL, quelle est la structure de données fondamentale utilisée pour implémenter les index primaires et secondaires ?",
    options: [
      { letter: 'A', text: "Un arbre B+ (B+Tree) équilibré où toutes les données résident dans les nœuds feuilles reliés par une liste doublement chaînée." },
      { letter: 'B', text: "Une table de hachage distribuée non ordonnée." },
      { letter: 'C', text: "Un graphe acyclique orienté (DAG)." },
      { letter: 'D', text: "Un arbre binaire de recherche non équilibré." },
    ],
    correctAnswers: ['A'],
    explanation: "InnoDB utilise des B+Trees pour ses index. Contrairement aux B-Trees classiques, les nœuds internes d'un B+Tree ne stockent que des clés de routage (permettant un facteur de branchement très élevé), tandis que tous les enregistrements résident dans les feuilles chaînées entre elles, optimisant les recherches par plage (Range Queries).",
  },
  {
    id: 2,
    codeSnippet: `CREATE TABLE chat_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  conversation_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL,
  content TEXT NOT NULL,
  INDEX idx_user_conv_date (user_id, conversation_id, created_at)
) ENGINE=InnoDB;`,
    question: "Selon la 'Règle du préfixe le plus à gauche' (Leftmost Prefix Rule), laquelle de ces requêtes SQL NE PEUT PAS utiliser l'index composite `idx_user_conv_date` pour filtrer les lignes ?",
    options: [
      { letter: 'A', text: "SELECT * FROM chat_messages WHERE user_id = 42 AND conversation_id = 10;" },
      { letter: 'B', text: "SELECT * FROM chat_messages WHERE conversation_id = 10 AND created_at > '2026-01-01';" },
      { letter: 'C', text: "SELECT * FROM chat_messages WHERE user_id = 42;" },
      { letter: 'D', text: "SELECT * FROM chat_messages WHERE user_id = 42 AND conversation_id = 10 AND created_at > '2026-01-01';" },
    ],
    correctAnswers: ['B'],
    explanation: "Un index composite sur `(A, B, C)` ne peut être exploité que si la clause `WHERE` commence par la première colonne `A`. Une requête filtrant uniquement sur `B` et `C` sans spécifier `user_id` ne respecte pas le préfixe gauche : le moteur SQL est contraint d'effectuer un scan complet de la table (Full Table Scan).",
  },
  {
    id: 3,
    codeSnippet: `EXPLAIN SELECT * FROM ai_documents WHERE title = 'Rapport Annuel';`,
    question: "Dans le résultat de la commande `EXPLAIN`, quelle valeur dans la colonne `type` indique la pire performance possible, signifiant que MySQL lit l'intégralité des lignes de la table sur le disque ?",
    options: [
      { letter: 'A', text: "const" },
      { letter: 'B', text: "ref" },
      { letter: 'C', text: "ALL" },
      { letter: 'D', text: "range" },
    ],
    correctAnswers: ['C'],
    explanation: "`type: ALL` indique un parcours séquentiel complet de la table (Full Table Scan). C'est le type d'accès le plus lent et coûteux sur une table volumineuse, démontrant l'absence d'index exploitable pour la condition demandée.",
  },
  {
    id: 4,
    codeSnippet: `-- Requête A : Pagination par Offset
SELECT * FROM embeddings_metadata ORDER BY id LIMIT 20 OFFSET 500000;

-- Requête B : Pagination par Curseur (Keyset Pagination)
SELECT * FROM embeddings_metadata WHERE id > 500000 ORDER BY id LIMIT 20;`,
    question: "Pourquoi la pagination par curseur (Requête B) est-elle exponentiellement plus rapide que la pagination par offset (Requête A) sur de grands volumes de données ?",
    options: [
      { letter: 'A', text: "Parce que MySQL désactive les verrous de table pour la requête B." },
      { letter: 'B', text: "Parce que la clause `OFFSET` est exécutée sur la carte graphique." },
      { letter: 'C', text: "Parce que la Requête B compresse les données en mémoire cache." },
      { letter: 'D', text: "Parce que la Requête A doit parcourir et rejeter 500 000 lignes avant de renvoyer les 20 suivantes, tandis que la Requête B utilise l'index B+Tree pour sauter directement à la ligne cible en O(log N)." },
    ],
    correctAnswers: ['D'],
    explanation: "`LIMIT 20 OFFSET 500000` oblige le moteur à lire 500 020 lignes depuis le stockage pour n'en conserver que les 20 dernières. La pagination par curseur (`WHERE id > 500000 LIMIT 20`) se positionne immédiatement sur la feuille d'index appropriée et ne lit que les 20 lignes requises.",
  },
  {
    id: 5,
    codeSnippet: `import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'secret_password',
  database: 'ai_backend',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});`,
    question: "Dans cette configuration de pool MySQL, quel est l'effet de l'option `waitForConnections: true` combinée avec `queueLimit: 0` ?",
    options: [
      { letter: 'A', text: "Lorsque les 10 connexions du pool sont occupées, les nouvelles requêtes sont placées dans une file d'attente sans limite de taille jusqu'à ce qu'une connexion se libère." },
      { letter: 'B', text: "Elle ferme le serveur si 10 utilisateurs sont connectés simultanément." },
      { letter: 'C', text: "Elle supprime immédiatement les requêtes excédentaires avec une erreur." },
      { letter: 'D', text: "Elle crée 10 bases de données virtuelles en miroir." },
    ],
    correctAnswers: ['A'],
    explanation: "`waitForConnections: true` demande au pool de suspendre les demandes entrantes lorsqu'aucune connexion n'est libre. `queueLimit: 0` indique qu'il n'y a pas de plafond sur la taille de la file d'attente (attention au risque d'épuisement mémoire si la saturation persiste).",
  },
  {
    id: 6,
    question: "Dans le moteur InnoDB, quelle est la différence structurelle entre un 'Index Clustérisé' (Clustered Index) et un 'Index Secondaire' (Secondary Index) ?",
    options: [
      { letter: 'A', text: "L'index clustérisé ne fonctionne qu'avec des nombres négatifs." },
      { letter: 'B', text: "L'index clustérisé stocke les données réelles de la ligne directement dans ses nœuds feuilles (ordonnés par la clé primaire), tandis que les index secondaires stockent la valeur de la clé primaire comme pointeur de référence (Bookmark)." },
      { letter: 'C', text: "L'index secondaire est toujours stocké sur une clé USB externe." },
      { letter: 'D', text: "Il n'y a aucune différence, ce sont deux termes marketing synonymes." },
    ],
    correctAnswers: ['B'],
    explanation: "Dans InnoDB, la table EST l'index clustérisé (organisé selon la PRIMARY KEY). Si une requête utilise un index secondaire pour trouver une colonne non présente dans cet index, InnoDB doit effectuer un deuxième saut dans l'index clustérisé via la clé primaire : c'est le 'Bookmark Lookup'.",
  },
  {
    id: 7,
    codeSnippet: `EXPLAIN SELECT user_id, conversation_id FROM chat_messages 
WHERE user_id = 42 AND conversation_id = 10;
-- Résultat Extra : "Using index"`,
    question: "Que signifie la mention `Using index` dans la colonne `Extra` d'un plan d'exécution `EXPLAIN` ?",
    options: [
      { letter: 'A', text: "Que la requête a échoué car un index est corrompu." },
      { letter: 'B', text: "Que la base de données doit créer un index temporaire sur le disque dur." },
      { letter: 'C', text: "Que l'index est un 'Covering Index' (index couvrant) : toutes les colonnes demandées dans le SELECT et le WHERE sont présentes dans l'index lui-même, évitant tout accès aux pages de données de la table." },
      { letter: 'D', text: "Que la requête a été mise en cache par Redis." },
    ],
    correctAnswers: ['C'],
    explanation: "`Using index` (à ne pas confondre avec `Using where`) caractérise une requête couverte (Covering Index) : le moteur lit les données directement dans l'arbre d'index sans jamais aller chercher la ligne sur le disque principal (zéro I/O supplémentaire).",
  },
  {
    id: 8,
    codeSnippet: `-- Recherche A
SELECT * FROM prompts WHERE title LIKE 'Machine%';

-- Recherche B
SELECT * FROM prompts WHERE title LIKE '%Learning';`,
    question: "Pourquoi la Recherche A peut-elle exploiter un index B+Tree sur la colonne `title` alors que la Recherche B ne le peut pas ?",
    options: [
      { letter: 'A', text: "Parce que le mot 'Machine' contient moins de lettres que 'Learning'." },
      { letter: 'B', text: "Parce que la Recherche B nécessite l'installation d'un module Python." },
      { letter: 'C', text: "Parce que MySQL interdit les wildcards à la fin des chaînes." },
      { letter: 'D', text: "Parce qu'un index B+Tree est trié par ordre lexicographique depuis le début de la chaîne : un wildcard en tête (`%terme`) empêche de cibler une plage ordonnée de feuilles d'index." },
    ],
    correctAnswers: ['D'],
    explanation: "Dans un B+Tree, les chaînes sont triées de gauche à droite. Chercher `Machine%` permet de cibler directement la première feuille débutant par 'M' jusqu'à la dernière (Range Scan). Chercher `%Learning` oblige à examiner chaque chaîne de la table car la fin peut être n'importe où.",
  },
  {
    id: 9,
    codeSnippet: `const connection = await pool.getConnection();
try {
  await connection.beginTransaction();
  await connection.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
  await connection.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
}`,
    question: "Pourquoi l'instruction `connection.release()` placée dans le bloc `finally` est-elle absolument vitale pour la santé du backend ?",
    options: [
      { letter: 'A', text: "Pour restituer la connexion au pool afin qu'elle soit réutilisable par d'autres requêtes ; sans cela, chaque erreur ou requête provoquerait une fuite de connexion (Connection Leak) jusqu'à bloquer totalement le serveur." },
      { letter: 'B', text: "Pour supprimer les données modifiées de la base de données." },
      { letter: 'C', text: "Pour crypter la session de l'utilisateur." },
      { letter: 'D', text: "Pour fermer la fenêtre du navigateur." },
    ],
    correctAnswers: ['A'],
    explanation: "Si une connexion n'est pas libérée (`release()`), le pool la considère comme toujours occupée. Au bout de quelques requêtes non libérées (ex: 10 requêtes sur un pool de 10), toutes les futures requêtes de l'API s'empilent et se figent indéfiniment en attente d'une connexion libre.",
  },
  {
    id: 10,
    question: "Qu'est-ce qu'une anomalie de lecture 'Phantom Read' (lecture fantôme) dans une transaction SQL et quel niveau d'isolation transactionnel standard l'élimine complètement ?",
    options: [
      { letter: 'A', text: "Une lecture qui supprime des fichiers système, résolue par `READ UNCOMMITTED`." },
      { letter: 'B', text: "Une transaction réexécute une requête avec filtre par plage et découvre de nouvelles lignes insérées et validées entre-temps par une autre transaction concurrente, éliminée par `SERIALIZABLE` (ou le Next-Key Locking d'InnoDB en `REPEATABLE READ`)." },
      { letter: 'C', text: "Une erreur de lecture sur un disque dur endommagé." },
      { letter: 'D', text: "Une commande SQL exécutée sans mot de passe." },
    ],
    correctAnswers: ['B'],
    explanation: "La lecture fantôme survient lorsqu'une transaction T1 lit une plage de lignes (`WHERE age > 30`), et qu'une transaction T2 insère une nouvelle ligne correspondante et valide. Lors d'une seconde lecture de T1, la nouvelle ligne apparaît comme un fantôme. Le niveau `SERIALIZABLE` ou le mécanisme de Next-Key Locks d'InnoDB prévient cela.",
  },
  {
    id: 11,
    codeSnippet: `CREATE INDEX idx_status_created ON user_logs (status, created_at);

-- La colonne status a seulement 2 valeurs possibles ('OK', 'ERROR') sur 10 millions de lignes.
-- La colonne created_at a des millions de timestamps uniques.`,
    question: "Qu'appelle-t-on la 'Sélectivité' ou 'Cardinalité' d'une colonne d'index, et pourquoi indexer une colonne à faible sélectivité (comme un booléen ou un statut à 2 valeurs) seule est-elle inefficace ?",
    options: [
      { letter: 'A', text: "Parce que MySQL refuse de créer des index sur moins de 10 valeurs." },
      { letter: 'B', text: "Parce que les booléens consomment 100 fois plus de mémoire qu'un texte." },
      { letter: 'C', text: "La sélectivité est la proportion de valeurs distinctes par rapport au nombre total de lignes ; si un index ne permet pas de filtrer un pourcentage significatif de la table (ex: 50% de 'OK'), l'optimiseur préférera un scan complet de table." },
      { letter: 'D', text: "Parce que les valeurs distinctes augmentent la température du CPU." },
    ],
    correctAnswers: ['C'],
    explanation: "Une colonne très sélective (ex: UUID, email) isole rapidement une ligne unique. Une colonne peu sélective (ex: genre, booléen) ne réduit pas suffisamment l'espace de recherche : naviguer dans l'index puis faire un Bookmark Lookup sur 5 millions de lignes coûte plus cher qu'un scan séquentiel continu.",
  },
  {
    id: 12,
    codeSnippet: `EXPLAIN FORMAT=JSON 
SELECT * FROM users u 
JOIN orders o ON u.id = o.user_id 
ORDER BY o.total_amount DESC;`,
    question: "Dans le diagnostic de performances d'une requête complexe, quelle anomalie dans le plan d'exécution indique que MySQL doit créer une table temporaire sur disque et trier les lignes hors de la mémoire tampon ?",
    options: [
      { letter: 'A', text: "Using index condition" },
      { letter: 'B', text: "Distinct" },
      { letter: 'C', text: "Select tables optimized away" },
      { letter: 'D', text: "Using temporary; Using filesort" },
    ],
    correctAnswers: ['D'],
    explanation: "`Using temporary; Using filesort` est l'un des drapeaux les plus alarmants pour la performance. Il indique que l'optimiseur n'a pas pu s'appuyer sur l'ordre d'un index, devant copier les données dans une table temporaire (parfois sur disque si elle dépasse `tmp_table_size`) et exécuter un tri multi-passe.",
  },
  {
    id: 13,
    question: "Qu'est-ce qu'une situation d'interblocage ('Deadlock') entre deux transactions SQL concurrentes et comment le moteur InnoDB la résout-il automatiquement ?",
    options: [
      { letter: 'A', text: "Chaque transaction détient un verrou sur une ressource dont l'autre a besoin pour continuer (dépendance circulaire) ; InnoDB détecte le cycle de graphe de verrous, annule (ROLLBACK) la transaction la moins coûteuse et renvoie une erreur 1213 à l'application." },
      { letter: 'B', text: "Le serveur s'éteint et demande une intervention physique." },
      { letter: 'C', text: "Les transactions fusionnent automatiquement leurs tables." },
      { letter: 'D', text: "InnoDB attend indéfiniment jusqu'à la fin de la journée." },
    ],
    correctAnswers: ['A'],
    explanation: "Un Deadlock survient lorsque T1 verrouille la ligne A et attend la ligne B, tandis que T2 verrouille B et attend A. Le moteur InnoDB dispose d'un détecteur d'interblocage (Wait-for Graph) qui interrompt et annule l'une des transactions (la victime) pour débloquer l'autre.",
  },
  {
    id: 14,
    codeSnippet: `SELECT * FROM conversations 
WHERE DATE(created_at) = '2026-03-01';`,
    question: "Pourquoi l'utilisation de la fonction `DATE(created_at)` dans la clause `WHERE` empêche-t-elle l'utilisation efficace d'un index B+Tree présent sur `created_at` ?",
    options: [
      { letter: 'A', text: "Parce que MySQL ne sait pas convertir les dates." },
      { letter: 'B', text: "Parce qu'appliquer une fonction sur une colonne indexée dans le WHERE rend l'expression non sargable (Search Argument Able), obligeant le moteur à calculer la fonction pour chaque ligne de la table lors d'un scan complet." },
      { letter: 'C', text: "Parce que les dates sont obligatoirement stockées en millisecondes." },
      { letter: 'D', text: "Parce que la fonction DATE supprime l'index sur le disque." },
    ],
    correctAnswers: ['B'],
    explanation: "Une requête est dite 'non-sargable' lorsque les colonnes sont enveloppées dans des fonctions (`DATE(col)`, `LOWER(col)`, `col + 1`). Le moteur ne peut pas exploiter la valeur brute ordonnée dans l'index B+Tree. Pour corriger cela, il faut écrire : `created_at >= '2026-03-01 00:00:00' AND created_at < '2026-03-02 00:00:00'`.",
  },
  {
    id: 15,
    question: "Quel est le rôle de la variable de configuration MySQL `innodb_buffer_pool_size` dans le dimensionnement d'un serveur de base de données en production ?",
    options: [
      { letter: 'A', text: "Définir la vitesse de connexion Wi-Fi du serveur." },
      { letter: 'B', text: "Limiter le nombre d'utilisateurs autorisés à créer des comptes." },
      { letter: 'C', text: "Allouer la taille de la mémoire vive (RAM) dédiée à la mise en cache des pages de données de tables et d'index fréquemment consultées, recommandée généralement à 60-80% de la RAM sur un serveur dédié." },
      { letter: 'D', text: "Définir la fréquence des sauvegardes automatiques." },
    ],
    correctAnswers: ['C'],
    explanation: "L'InnoDB Buffer Pool est le composant le plus critique de MySQL : c'est la zone de mémoire RAM où résident les pages de données et d'index. Plus le Buffer Pool est généreux, moins le moteur a besoin de réaliser d'accès I/O disques lents pour servir les lectures et écritures.",
  },
  {
    id: 16,
    codeSnippet: `SELECT id, name FROM users 
WHERE first_name = 'Alex' AND last_name = 'Dupont';

-- Quel index offrirait les meilleures performances pour cette requête ?`,
    question: "Quel type d'index offre les meilleures performances en réduisant les I/O pour cette requête de recherche combinée ?",
    options: [
      { letter: 'A', text: "Deux index simples indépendants : INDEX(first_name) et INDEX(last_name)." },
      { letter: 'B', text: "Un index sur la colonne `id` uniquement." },
      { letter: 'C', text: "Aucun index, le scan complet est plus rapide sur les chaînes courtes." },
      { letter: 'D', text: "Un index composite unique : INDEX(first_name, last_name) ou INDEX(last_name, first_name)." },
    ],
    correctAnswers: ['D'],
    explanation: "Deux index séparés forcent MySQL à utiliser un seul index ou à tenter une fusion d'index (Index Merge) coûteuse. Un index composite sur `(first_name, last_name)` navigue directement dans l'arbre vers la combinaison exacte des deux critères en une seule opération.",
  },
  {
    id: 17,
    question: "Dans le cadre de transactions ACID, que garantit la propriété de 'Durabilité' (Durability) assurée par le journal des transactions (Redo Log) d'InnoDB ?",
    options: [
      { letter: 'A', text: "Qu'une fois la transaction validée (`COMMIT`), ses modifications sont définitivement enregistrées et ne seront pas perdues, même en cas de coupure de courant brutale du serveur immédiatement après." },
      { letter: 'B', text: "Que les requêtes s'exécutent en moins d'une seconde." },
      { letter: 'C', text: "Que la base de données ne peut jamais être supprimée par un administrateur." },
      { letter: 'D', text: "Que le schéma des tables reste identique pendant 10 ans." },
    ],
    correctAnswers: ['A'],
    explanation: "La durabilité garantit que dès qu'un `COMMIT` est confirmé, les altérations sont écrites de manière synchrone dans le journal `redo log` sur disque (mécanisme WAL - Write-Ahead Logging). Lors d'un crash, MySQL rejoue le log pour reconstituer l'état exact au redémarrage.",
  },
  {
    id: 18,
    codeSnippet: `CREATE TABLE session_embeddings (
  session_id CHAR(36) PRIMARY KEY,
  vector_data JSON NOT NULL
) ENGINE=InnoDB;`,
    question: "Pourquoi l'utilisation d'un type UUIDv4 aléatoire (`CHAR(36)`) comme clé primaire clustérisée dans InnoDB peut-elle dégrader sévèrement les performances d'insertion continue ?",
    options: [
      { letter: 'A', text: "Parce que MySQL ne sait pas stocker les tirets des UUIDs." },
      { letter: 'B', text: "Parce que les UUIDv4 générés aléatoirement provoquent des insertions non séquentielles désordonnées au cœur de l'arbre B+, causant de fréquents fractionnements de pages (Page Splits) et une forte fragmentation disque." },
      { letter: 'C', text: "Parce que les clés primaires doivent obligatoirement être des chaînes de 4 caractères." },
      { letter: 'D', text: "Parce que les UUIDs consomment la totalité de la bande passante réseau." },
    ],
    correctAnswers: ['B'],
    explanation: "Une clé auto-incrémentale (`BIGINT AUTO_INCREMENT`) insère toujours au bout de la dernière feuille (Append-only). Des UUIDv4 aléatoires forcent l'insertion au milieu de pages déjà pleines, obligeant InnoDB à couper la page en deux (Page Split) et à réorganiser la mémoire physique, dégradant l'I/O.",
  },
  {
    id: 19,
    question: "Quelle alternative d'identifiant unique préserve l'unicité globale d'un UUID tout en conservant l'ordre séquentiel temporel pour éviter les Page Splits d'InnoDB ?",
    options: [
      { letter: 'A', text: "Les numéros de téléphone portable" },
      { letter: 'B', text: "Les hashs MD5 du prénom de l'utilisateur" },
      { letter: 'C', text: "Les UUIDv7 ou les identifiants ULID (Universally Unique Lexicographically Sortable Identifier)" },
      { letter: 'D', text: "L'adresse MAC de la carte mère" },
    ],
    correctAnswers: ['C'],
    explanation: "Les UUIDv7 et les ULID intègrent un timestamp Unix milliseconde dans leurs premiers octets, suivi d'entropie aléatoire. Ils sont donc séquentiellement ordonnés par date de création, garantissant une insertion propre en fin de B+Tree sans fragmentation.",
  },
  {
    id: 20,
    codeSnippet: `SELECT id, question, answer FROM exam_questions 
WHERE MATCH(question, answer) AGAINST('Event Loop' IN NATURAL LANGUAGE MODE);`,
    question: "Quel type d'index spécialisé doit être créé sur les colonnes `question` et `answer` pour permettre l'exécution de cette requête `MATCH ... AGAINST` ?",
    options: [
      { letter: 'A', text: "Un index spatial RTREE" },
      { letter: 'B', text: "Un index composite standard B+Tree" },
      { letter: 'C', text: "Un index de clé étrangère" },
      { letter: 'D', text: "Un index FULLTEXT (Texte intégral)" },
    ],
    correctAnswers: ['D'],
    explanation: "Les index FULLTEXT sous InnoDB créent une structure d'index inversé (Inverted Index) découpant les mots en tokens (avec gestion des stopwords et stemmers), permettant d'effectuer des recherches lexicales de pertinence textuelle rapide sans recourir à un `LIKE '%...%'`.",
  },
  {
    id: 21,
    question: "Pourquoi est-il déconseillé d'exécuter `SELECT *` dans les requêtes de production d'un backend à fort trafic ?",
    options: [
      { letter: 'A', text: "Parce que cela transfère inutilement des colonnes lourdes sur le réseau, augmente la consommation mémoire du backend et empêche l'optimiseur d'exploiter les index couvrants (Covering Index)." },
      { letter: 'B', text: "Parce que l'astérisque est un caractère interdit par la norme SQL standard." },
      { letter: 'C', text: "Parce que cela convertit automatiquement les résultats en code binaire." },
      { letter: 'D', text: "Parce que cela bloque toutes les écritures sur la table pendant 1 minute." },
    ],
    correctAnswers: ['A'],
    explanation: "Spécifier explicitement les colonnes nécessaires (`SELECT id, title`) réduit la bande passante et la désérialisation Node.js. Si toutes les colonnes sélectionnées sont présentes dans un index secondaire, la base évite de charger la ligne entière depuis le stockage disque.",
  },
  {
    id: 22,
    codeSnippet: `ALTER TABLE audit_logs ADD INDEX (created_at);
-- Table de 50 millions de lignes en production active`,
    question: "Quel risque majeur comporte l'exécution d'un `ALTER TABLE` lourd sans algorithme en ligne (Online DDL) sur une table MySQL active ?",
    options: [
      { letter: 'A', text: "La suppression définitive de toutes les clés primaires." },
      { letter: 'B', text: "Le verrouillage exclusif de la table en lecture ou en écriture (Table Lock), bloquant toutes les requêtes des utilisateurs et provoquant un arrêt de service de l'application pendant la reconstruction de l'index." },
      { letter: 'C', text: "L'augmentation involontaire du nombre d'utilisateurs." },
      { letter: 'D', text: "L'incompatibilité avec le protocole TCP/IP." },
    ],
    correctAnswers: ['B'],
    explanation: "Historiquement, `ALTER TABLE` verrouille la table ou crée une copie temporaire complète. En production, il faut s'assurer d'utiliser `ALGORITHM=INPLACE, LOCK=NONE` ou des outils de migration sans coupure comme `gh-ost` ou `pt-online-schema-change`.",
  },
  {
    id: 23,
    question: "Que garantit le niveau d'isolation par défaut d'InnoDB dans MySQL, à savoir `REPEATABLE READ` ?",
    options: [
      { letter: 'A', text: "Qu'une transaction peut lire les données non validées d'autres transactions (Dirty Reads)." },
      { letter: 'B', text: "Que le serveur n'accepte qu'une seule connexion à la fois." },
      { letter: 'C', text: "Que toutes les lectures effectuées au sein d'une même transaction voient un instantané cohérent (Snapshot) des données figé au moment de la première lecture (Consistent Nonblocking Read via MVCC), empêchant les lectures non reproductibles." },
      { letter: 'D', text: "Que les transactions sont automatiquement dupliquées sur deux disques durs." },
    ],
    correctAnswers: ['C'],
    explanation: "Grâce au contrôle de concurrence multi-version (MVCC) et à l'espace d'annulation (Undo Logs), `REPEATABLE READ` garantit qu'une transaction relisant la même ligne obtiendra exactement les mêmes valeurs tout au long de sa durée de vie, indépendamment des modifications validées par d'autres sessions.",
  },
  {
    id: 24,
    codeSnippet: `SELECT * FROM vector_collections 
WHERE tenant_id = 'org_abc' 
FOR UPDATE;`,
    question: "Quel est l'effet de la clause `FOR UPDATE` à la fin d'une requête de sélection dans une transaction SQL ?",
    options: [
      { letter: 'A', text: "Elle met immédiatement à jour les colonnes de la table." },
      { letter: 'B', text: "Elle désactive la vérification des types." },
      { letter: 'C', text: "Elle supprime les lignes sélectionnées." },
      { letter: 'D', text: "Elle pose un verrou exclusif en écriture (X Lock) sur les lignes sélectionnées, empêchant les autres transactions de modifier ou verrouiller ces lignes jusqu'au commit de la transaction courante." },
    ],
    correctAnswers: ['D'],
    explanation: "`SELECT ... FOR UPDATE` implémente un verrouillage pessimiste. Les lignes sélectionnées sont verrouillées en écriture, forçant les autres transactions tentant de modifier ou de verrouiller ces mêmes enregistrements à patienter, évitant les conflits de mise à jour concurrente.",
  },
  {
    id: 25,
    question: "Pourquoi est-il crucial de définir une contrainte de clé étrangère avec `ON DELETE CASCADE` ou `ON DELETE RESTRICT` entre une table `conversations` et sa table enfant `messages` ?",
    options: [
      { letter: 'A', text: "Pour garantir l'intégrité référentielle des données, évitant l'existence de messages orphelins pointant vers une conversation qui n'existe plus dans le système." },
      { letter: 'B', text: "Pour empêcher les utilisateurs de taper du texte en minuscules." },
      { letter: 'C', text: "Pour accélérer la vitesse de calcul des embeddings vectoriels." },
      { letter: 'D', text: "Pour crypter automatiquement les messages avec AES." },
    ],
    correctAnswers: ['A'],
    explanation: "L'intégrité référentielle empêche les enregistrements zombies (orphelins). Avec `ON DELETE CASCADE`, supprimer une conversation purge automatiquement tous les messages associés. Avec `RESTRICT`, la suppression est rejetée tant qu'il subsiste des messages dépendants.",
  },
  {
    id: 26,
    codeSnippet: `SHOW PROCESSLIST;
-- Résultat : Une requête affiche Command: "Query", Time: 250, State: "Sending data"`,
    question: "Dans le diagnostic de saturation d'un serveur de base de données, qu'indique la commande administrative `SHOW PROCESSLIST` ?",
    options: [
      { letter: 'A', text: "La liste des versions de bibliothèques installées sur le serveur." },
      { letter: 'B', text: "La liste en temps réel des threads de connexion clients actifs, des requêtes en cours d'exécution et de leur durée respective (permettant d'identifier des requêtes lentes bloquantes)." },
      { letter: 'C', text: "L'historique des paiements de factures cloud." },
      { letter: 'D', text: "La température thermique des barrettes de RAM." },
    ],
    correctAnswers: ['B'],
    explanation: "`SHOW PROCESSLIST` (ou la table `information_schema.processlist`) affiche instantanément toutes les requêtes en vol. Une requête affichant `Time: 250` secondes monopolise un thread depuis plus de 4 minutes et doit être analysée ou interrompue via `KILL <Id>`.",
  },
  {
    id: 27,
    question: "Quel mécanisme d'optimisation de MySQL permet de pousser le filtrage de conditions d'un index secondaire directement au niveau du moteur de stockage InnoDB avant de lire les lignes complètes de la table ?",
    options: [
      { letter: 'A', text: "Buffer Allocation Protocol" },
      { letter: 'B', text: "Quantum Query Acceleration" },
      { letter: 'C', text: "Index Condition Pushdown (ICP)" },
      { letter: 'D', text: "Disk Defragmentation Filter" },
    ],
    correctAnswers: ['C'],
    explanation: "L'Index Condition Pushdown (ICP, visible dans EXPLAIN sous `Using index condition`) permet au moteur de stockage InnoDB d'évaluer les clauses du WHERE portant sur les colonnes de l'index avant de demander la ligne complète de la table, réduisant drastiquement le nombre d'accès disque.",
  },
  {
    id: 28,
    codeSnippet: `SELECT COUNT(*) FROM ai_models;`,
    question: "Pourquoi l'opération `COUNT(*)` sur une table InnoDB sans clause `WHERE` est-elle nettement plus lente que sur l'ancien moteur MyISAM ?",
    options: [
      { letter: 'A', text: "Parce que InnoDB ne supporte pas les mathématiques de base." },
      { letter: 'B', text: "Parce que InnoDB chiffre chaque ligne avant de la compter." },
      { letter: 'C', text: "Parce que MyISAM enregistrait les tables dans la mémoire vidéo." },
      { letter: 'D', text: "Parce qu'avec le modèle multi-version (MVCC) d'InnoDB, chaque transaction peut voir un nombre de lignes différent selon son statut d'isolation, obligeant InnoDB à parcourir un index pour compter les lignes visibles réelles plutôt que de lire un compteur statique précalculé." },
    ],
    correctAnswers: ['D'],
    explanation: "MyISAM n'avait pas de transactions et stockait un compteur de lignes statique dans son en-tête de fichier. InnoDB doit respecter l'isolation transactionnelle : selon les transactions en cours, certaines lignes peuvent être supprimées ou insérées, obligeant à scanner un index pour compter les lignes visibles.",
  },
  {
    id: 29,
    question: "Dans le cadre de l'optimisation des requêtes de jointures, quelle règle sur les colonnes de jointure (`ON a.id = b.a_id`) est indispensable pour que MySQL puisse utiliser un index efficace (`eq_ref` ou `ref`) ?",
    options: [
      { letter: 'A', text: "Les colonnes jointes doivent impérativement partager le même type de données exact (ex: `INT` avec `INT`) et le même jeu de caractères / collation (ex: `utf8mb4_unicode_ci`), sous peine de désactiver l'indexation par conversion de type implicite." },
      { letter: 'B', text: "Les deux colonnes doivent avoir des noms commençant par la même lettre." },
      { letter: 'C', text: "Les deux tables doivent contenir moins de 50 lignes." },
      { letter: 'D', text: "Les tables doivent être hébergées sur des disques durs séparés." },
    ],
    correctAnswers: ['A'],
    explanation: "Une discordance de collation (ex: joindre `utf8mb4_general_ci` avec `utf8mb4_unicode_ci`) ou de type (ex: `VARCHAR` avec `INT`) force MySQL à convertir implicitement les données à la volée pour chaque ligne comparée, rendant l'index inutilisable.",
  },
  {
    id: 30,
    codeSnippet: `CREATE TABLE audit_trail (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  event_name VARCHAR(100),
  created_at TIMESTAMP
) ENGINE=InnoDB 
PARTITION BY RANGE (UNIX_TIMESTAMP(created_at)) (
  PARTITION p2025 VALUES LESS THAN (UNIX_TIMESTAMP('2026-01-01 00:00:00')),
  PARTITION p2026 VALUES LESS THAN (UNIX_TIMESTAMP('2027-01-01 00:00:00')),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`,
    question: "Quel avantage majeur le partitionnement de table (Table Partitioning) par plage temporelle apporte-t-il lors de la purge de données obsolètes (Retention Policy) ?",
    options: [
      { letter: 'A', text: "Il double la mémoire RAM de l'ordinateur." },
      { letter: 'B', text: "Il permet de supprimer l'intégralité des données d'une année instantanément via `ALTER TABLE DROP PARTITION` en une fraction de seconde sans verrouiller la table ni saturer les Undo Logs, là où un `DELETE` massif prendrait des heures." },
      { letter: 'C', text: "Il convertit automatiquement les données en langage Python." },
      { letter: 'D', text: "Il empêche les hackers de se connecter." },
    ],
    correctAnswers: ['B'],
    explanation: "Supprimer 50 millions de lignes avec `DELETE FROM table WHERE created_at < ...` engendre des millions de verrous de lignes, remplit les disques de journaux d'annulation (Undo) et fige la base. Supprimer une partition entière (`DROP PARTITION`) efface simplement le fichier physique sur disque de manière atomique et quasi instantanée.",
  },
  {
    id: 31,
    question: "Que désigne le terme 'Sargabilité' (SARGable - Search Argument Able) d'une clause SQL dans un système d'IA backend ?",
    options: [
      { letter: 'A', text: "Le chiffrement des données de paiement par carte bancaire." },
      { letter: 'B', text: "Le taux de compression des images JPEG." },
      { letter: 'C', text: "La capacité d'une requête à être traduite en instructions de recherche directe dans un index B+Tree sans devoir évaluer une transformation sur chaque ligne de la table." },
      { letter: 'D', text: "La possibilité d'exécuter la requête sur un réseau sans fil." },
    ],
    correctAnswers: ['C'],
    explanation: "Une condition sargable permet au moteur de base de données d'utiliser un index pour isoler une plage (Index Seek / Range Scan). Les prédicats non sargables (fonctions, conversions implicites, wildcard initial) forcent le moteur à parcourir toute la table (Table Scan).",
  },
  {
    id: 32,
    codeSnippet: `SELECT * FROM users 
WHERE phone_number = 612345678;
-- La colonne phone_number est définie comme VARCHAR(20) avec un index.`,
    question: "Pourquoi cette requête exécutera-t-elle un scan complet de table (`type: ALL`) malgré la présence d'un index sur `phone_number` ?",
    options: [
      { letter: 'A', text: "Parce que MySQL interdit les numéros de téléphone." },
      { letter: 'B', text: "Parce que l'index s'est automatiquement désactivé." },
      { letter: 'C', text: "Parce que le numéro est trop court." },
      { letter: 'D', text: "À cause d'une conversion de type implicite : la valeur littérale étant un entier et la colonne étant une chaîne, MySQL applique une fonction de conversion `CAST(phone_number AS SIGNED)` sur chaque ligne de la table, invalidant l'index." },
    ],
    correctAnswers: ['D'],
    explanation: "Lorsque l'on compare une chaîne avec un nombre (`col_varchar = 123`), MySQL convertit la colonne en nombre pour chaque ligne. L'index ne peut pas être utilisé car les valeurs ordonnées de la chaîne ne correspondent plus aux entiers sans conversion. Il fallait écrire `'0612345678'` sous forme de chaîne.",
  },
  {
    id: 33,
    question: "Dans le cadre de la gestion des verrous d'InnoDB, qu'est-ce qu'un verrou de type 'Next-Key Lock' ?",
    options: [
      { letter: 'A', text: "Une combinaison d'un verrou sur l'enregistrement de l'index (Record Lock) et d'un verrou sur l'intervalle précédant cet enregistrement (Gap Lock), empêchant d'autres transactions d'insérer des valeurs dans l'espace vide entre deux clés." },
      { letter: 'B', text: "Un verrou qui sélectionne la prochaine touche du clavier." },
      { letter: 'C', text: "Un mot de passe de secours stocké dans un coffre-fort." },
      { letter: 'D', text: "Un protocole de chiffrement réseau pour HTTPS." },
    ],
    correctAnswers: ['A'],
    explanation: "Le Next-Key Locking verrouille à la fois la ligne et le 'gap' (intervalle) qui la précède. C'est ce mécanisme qui permet à InnoDB d'éliminer les lectures fantômes en niveau `REPEATABLE READ`, car aucune transaction concurrente ne peut glisser une nouvelle ligne dans cet intervalle.",
  },
  {
    id: 34,
    codeSnippet: `SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 0.5; -- 500 millisecondes`,
    question: "À quoi sert l'activation du 'Slow Query Log' avec un seuil de 0.5 seconde sur un serveur de base de données en production ?",
    options: [
      { letter: 'A', text: "À ralentir délibérément les utilisateurs non abonnés." },
      { letter: 'B', text: "À enregistrer dans un fichier journal dédié l'historique complet des requêtes dont l'exécution a dépassé 500 ms, afin que les ingénieurs puissent repérer les goulots d'étranglement et ajouter les index manquants." },
      { letter: 'C', text: "À bloquer l'accès aux adresses IP étrangères." },
      { letter: 'D', text: "À supprimer les requêtes qui prennent trop de temps." },
    ],
    correctAnswers: ['B'],
    explanation: "Le Slow Query Log est l'outil fondamental de diagnostic DBA. Il capture automatiquement toutes les requêtes anormalement lentes pour permettre leur analyse ultérieure avec des outils comme `pt-query-digest` ou `mysqldumpslow`.",
  },
  {
    id: 35,
    question: "Pourquoi est-il risqué de laisser une transaction SQL ouverte pendant qu'un appel réseau externe vers une API d'IA (Gemini) est en cours d'exécution dans le code Node.js ?",
    options: [
      { letter: 'A', text: "Parce que l'API Gemini facture la base de données directement." },
      { letter: 'B', text: "Parce que le compilateur TypeScript génère un code d'erreur." },
      { letter: 'C', text: "Parce que la transaction maintient des verrous sur les lignes et monopolise une connexion du pool pendant plusieurs secondes d'attente réseau, augmentant drastiquement le risque de deadlocks et saturant le pool pour les autres requêtes." },
      { letter: 'D', text: "Parce que les transactions SQL ne fonctionnent pas avec Internet." },
    ],
    correctAnswers: ['C'],
    explanation: "Une transaction doit être la plus brève possible (principe de localité temporelle). Inclure des opérations lentes ou incertaines (appels API tiers, envois de mails) à l'intérieur d'une transaction maintient des verrous et retient une connexion précieuse du pool, provoquant une congestion rapide de tout le backend.",
  },
  {
    id: 36,
    codeSnippet: `CREATE TABLE prompts_archive LIKE prompts;
INSERT INTO prompts_archive SELECT * FROM prompts WHERE created_at < '2025-01-01';`,
    question: "Quelle stratégie d'archivage cette séquence SQL illustre-t-elle pour maintenir la performance des requêtes sur la table principale `prompts` ?",
    options: [
      { letter: 'A', text: "Le chiffrement symétrique des prompts." },
      { letter: 'B', text: "La désinstallation de MySQL." },
      { letter: 'C', text: "La transformation des tables en format NoSQL." },
      { letter: 'D', text: "L'allégement de la table active par transfert des données froides (Cold Data) vers une table d'archive distincte, permettant aux index de la table chaude (Hot Data) de rester entièrement résidents en mémoire RAM dans le Buffer Pool." },
    ],
    correctAnswers: ['D'],
    explanation: "Séparer les données chaudes (consultées au quotidien) des données froides (historique ancien) maintient la taille de la table active et de ses index en dessous de la taille de la mémoire RAM du Buffer Pool, garantissant des temps de réponse constants en mémoire.",
  },
  {
    id: 37,
    question: "Dans le cadre de l'optimisation des requêtes MySQL, quelle commande permet d'obtenir les statistiques d'exécution RÉELLES (temps processeur passé dans chaque nœud, nombre réel de lignes parcourues) plutôt qu'une simple estimation théorique du plan ?",
    options: [
      { letter: 'A', text: "EXPLAIN ANALYZE" },
      { letter: 'B', text: "DESCRIBE TABLE" },
      { letter: 'C', text: "CHECK TABLE FAST" },
      { letter: 'D', text: "OPTIMIZE INDEX" },
    ],
    correctAnswers: ['A'],
    explanation: "Introduit dans MySQL 8.0, `EXPLAIN ANALYZE` exécute réellement la requête tout en mesurant les métriques exactes : temps de parcours (actual time), nombre réel de lignes retournées (actual rows) et nombre de boucles par nœud, révélant les décalages avec les estimations statistiques du planificateur.",
  },
  {
    id: 38,
    codeSnippet: `// Requête avec UNION
SELECT id, title FROM internal_docs WHERE status = 'published'
UNION
SELECT id, title FROM public_docs WHERE status = 'published';`,
    question: "Quelle est la différence de performance entre `UNION` et `UNION ALL` dans cette requête combinée ?",
    options: [
      { letter: 'A', text: "`UNION` est plus rapide car il utilise du code assembleur." },
      { letter: 'B', text: "`UNION` exécute un tri et une déduplication implicite coûteuse de l'ensemble des résultats via une table temporaire, tandis que `UNION ALL` concatène simplement les flux sans surcoût." },
      { letter: 'C', text: "`UNION ALL` supprime les tables originales après exécution." },
      { letter: 'D', text: "Il n'y a aucune différence de performance." },
    ],
    correctAnswers: ['B'],
    explanation: "`UNION` impose une opération d'élimination des doublons (Distinct Sort) qui nécessite de stocker toutes les lignes dans une table temporaire. Si l'on sait que les résultats sont déjà disjoints ou que les doublons sont tolérés, `UNION ALL` est bien plus performant car il diffuse les données directement.",
  },
  {
    id: 39,
    question: "Que se passe-t-il si une application Node.js effectue une requête préparée (`pool.execute()`) avec des paramètres utilisateur non typés ?",
    options: [
      { letter: 'A', text: "Le serveur exécute du code malveillant sur le client." },
      { letter: 'B', text: "La requête plante obligatoirement." },
      { letter: 'C', text: "Le protocole de requêtes préparées transmet la requête compilée et les données dans deux paquets binaires séparés, garantissant une protection absolue contre les injections SQL même en cas de contenu hostile dans les paramètres." },
      { letter: 'D', text: "Le mot de passe de la base est affiché dans le terminal." },
    ],
    correctAnswers: ['C'],
    explanation: "Les requêtes préparées (Prepared Statements) compilent l'arbre syntaxique de la requête SQL côté serveur avant d'injecter les valeurs de paramètres comme de simples données littérales, rendant toute modification de la structure de commande (injection SQL) impossible.",
  },
  {
    id: 40,
    codeSnippet: `OPTIMIZE TABLE conversation_messages;`,
    question: "Quel est l'effet de la commande `OPTIMIZE TABLE` sur une table InnoDB qui a subi des millions de suppressions ou de mises à jour de données ?",
    options: [
      { letter: 'A', text: "Elle supprime définitivement tous les utilisateurs inactifs." },
      { letter: 'B', text: "Elle modifie la clé de chiffrement des données." },
      { letter: 'C', text: "Elle double la vitesse du réseau Wi-Fi." },
      { letter: 'D', text: "Elle reconstruit physiquement la table et ses index pour défragmenter l'espace disque, compacter les pages B+Tree et restituer l'espace libre non alloué au système de fichiers hôte." },
    ],
    correctAnswers: ['D'],
    explanation: "Des suppressions ou altérations massives créent des trous dans les pages B+Tree (fragmentation interne). `OPTIMIZE TABLE` reconstruit un nouveau fichier de table compacté et remplace l'ancien, réduisant l'empreinte disque et améliorant l'efficacité du cache.",
  },
];
