import { ExamMetadata, ExamQuestion } from './types';

export const BACKEND_IA_MODULE_5_EXAM_METADATA: ExamMetadata = {
  moduleId: 'backend-ia-module-5',
  title: "Examen Officiel de Certification — Module 5 : Caching Distribué, Redis & Rate Limiting avec Scripts Lua",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (32/40)
  totalQuestions: 40,
};

export const BACKEND_IA_MODULE_5_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "Dans le pattern de cache 'Cache-Aside' (Lazy Loading) couramment utilisé pour les réponses d'API d'IA, quelle est la séquence exacte d'opérations lors de la réception d'une requête utilisateur ?",
    options: [
      { letter: 'A', text: "L'application interroge le cache Redis ; en cas de succès (Cache Hit), elle renvoie la donnée immédiatement ; en cas d'échec (Cache Miss), elle appelle le modèle d'IA, écrit le résultat dans Redis avec un TTL, puis le renvoie au client." },
      { letter: 'B', text: "L'application interroge d'abord le modèle d'IA, puis sauvegarde la réponse dans Redis, et enfin vérifie si le cache existait." },
      { letter: 'C', text: "Redis appelle automatiquement l'API Gemini sans passer par le serveur Node.js." },
      { letter: 'D', text: "Toutes les requêtes sont simultanément envoyées au cache et au LLM, et la plus rapide annule l'autre." },
    ],
    correctAnswers: ['A'],
    explanation: "Dans le pattern Cache-Aside, l'application est responsable de coordonner le cache et le magasin de données : elle vérifie d'abord la clé dans le cache (Redis). Si absente (miss), elle exécute l'appel coûteux en aval, peuple le cache avec une durée de vie (TTL) et retourne la réponse.",
  },
  {
    id: 2,
    codeSnippet: `import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Clé de prompt génératif
const cacheKey = \`prompt:\${hash}\`;
await redis.set(cacheKey, JSON.stringify(result), 'EX', 3600);`,
    question: "Que signifie l'option `'EX', 3600` dans cette commande `redis.set()` sous Node.js ?",
    options: [
      { letter: 'A', text: "Elle crypte la valeur avec une clé de 3600 bits." },
      { letter: 'B', text: "Elle associe un délai d'expiration (Time To Live - TTL) de 3600 secondes (1 heure), après quoi Redis supprimera automatiquement la clé de la mémoire." },
      { letter: 'C', text: "Elle limite la taille de la réponse à 3600 octets." },
      { letter: 'D', text: "Elle autorise un maximum de 3600 lectures avant suppression." },
    ],
    correctAnswers: ['B'],
    explanation: "Le paramètre `'EX', 3600` (ou la commande primitive `SETEX`) configure une expiration en secondes. Après 3600 secondes, la clé expire et son espace mémoire est libéré de façon passive ou active par Redis, évitant l'accumulation infinie de données périmées.",
  },
  {
    id: 3,
    question: "Pourquoi Redis est-il capable de traiter plus de 100 000 requêtes par seconde sur un serveur standard malgré son architecture interne monocœur (Single-Threaded Event Loop pour l'exécution des commandes) ?",
    options: [
      { letter: 'A', text: "Parce qu'il stocke toutes ses données sur des disques optiques laser." },
      { letter: 'B', text: "Parce qu'il désactive le protocole TCP/IP." },
      { letter: 'C', text: "Parce que l'intégralité des structures de données réside en mémoire vive (RAM, accès en nanosecondes sans I/O disque bloquant) et qu'il utilise le multiplexage d'I/O réseau non bloquant du noyau OS (epoll/kqueue) sans contention de verrous inter-threads." },
      { letter: 'D', text: "Parce qu'il est codé en langage Python compilé." },
    ],
    correctAnswers: ['C'],
    explanation: "Le modèle d'exécution en mémoire de Redis élimine la latence disque (la RAM est 10 000 fois plus rapide qu'un SSD). En traitant les commandes de façon séquentielle sur un thread unique ultra-optimisé avec multiplexage I/O (epoll), Redis élimine totalement les context-switches et les verrous (mutex/locks).",
  },
  {
    id: 4,
    codeSnippet: `import crypto from 'crypto';

export function computePromptCacheKey(systemPrompt: string, userPrompt: string, model: string): string {
  const normalized = \`\${model.trim()}|\${systemPrompt.trim()}|\${userPrompt.trim().toLowerCase()}\`;
  return 'cache:llm:' + crypto.createHash('sha256').update(normalized).digest('hex');
}`,
    question: "Pourquoi est-il crucial de normaliser le texte (minuscules, trim des espaces superflus) et d'inclure le nom du modèle et le prompt système dans la clé de hachage SHA-256 ?",
    options: [
      { letter: 'A', text: "Pour que le hash résultant contienne obligatoirement des chiffres pairs." },
      { letter: 'B', text: "Pour réduire la taille de la mémoire vive du serveur de 90%." },
      { letter: 'C', text: "Pour empêcher les utilisateurs de saisir des mots de passe." },
      { letter: 'D', text: "Pour maximiser le taux de succès du cache (Cache Hit Ratio) face aux variations typographiques mineures tout en évitant de renvoyer une réponse obsolète si le modèle ou les consignes système ont été modifiés." },
    ],
    correctAnswers: ['D'],
    explanation: "Deux questions identiques avec une simple majuscule ou un espace final doivent pouvoir partager le même résultat en cache. Par ailleurs, intégrer le prompt système et la version du modèle garantit qu'une mise à jour de vos consignes invalide automatiquement les caches antérieurs sans collision.",
  },
  {
    id: 5,
    codeSnippet: `// Pipeline de requêtes Redis avec ioredis
const pipeline = redis.pipeline();
pipeline.get('user:101:quota');
pipeline.incr('user:101:requests');
pipeline.expire('user:101:requests', 60);
const results = await pipeline.exec();`,
    question: "Quel bénéfice technique majeur le 'Pipelining' apporte-t-il par rapport à trois appels `await redis.get()`, `await redis.incr()`, `await redis.expire()` séquentiels ?",
    options: [
      { letter: 'A', text: "Il regroupe les multiples commandes en un seul paquet réseau transmis au serveur, réduisant drastiquement le nombre d'allers-retours réseau (RTT - Round Trip Time) et la latence globale." },
      { letter: 'B', text: "Il permet d'exécuter les requêtes sur trois machines physiques distinctes." },
      { letter: 'C', text: "Il convertit les commandes Redis en langage SQL." },
      { letter: 'D', text: "Il rend les commandes indéchiffrables pour les routeurs." },
    ],
    correctAnswers: ['A'],
    explanation: "Sans pipeline, chaque commande attend le paquet réseau de réponse (ex: 3 commandes x 2 ms de RTT = 6 ms). Le Pipelining envoie les 3 commandes d'un coup dans la socket et reçoit toutes les réponses dans un seul aller-retour réseau (2 ms au total).",
  },
  {
    id: 6,
    question: "Dans le cadre de la gestion de mémoire de Redis, qu'est-ce que la politique d'éviction `allkeys-lru` (Least Recently Used) lorsque la mémoire maximale configurée (`maxmemory`) est atteinte ?",
    options: [
      { letter: 'A', text: "Redis rejette immédiatement toute nouvelle écriture avec une erreur OOM." },
      { letter: 'B', text: "Redis supprime automatiquement les clés les moins récemment utilisées parmi l'ensemble des clés stockées pour libérer de l'espace pour les nouvelles écritures." },
      { letter: 'C', text: "Redis redémarre le conteneur Docker associé." },
      { letter: 'D', text: "Redis transfère les clés excédentaires sur une bande magnétique." },
    ],
    correctAnswers: ['B'],
    explanation: "`allkeys-lru` supprime les clés qui n'ont pas été consultées depuis le plus longtemps dès que le plafond `maxmemory` est dépassé, garantissant que les données 'chaudes' restent en RAM tandis que les données froides sont progressivement évincées.",
  },
  {
    id: 7,
    codeSnippet: `// Implémentation naïve de Rate Limiter
const currentCount = await redis.get(\`ratelimit:\${userId}\`);
if (parseInt(currentCount || '0') >= 100) {
  return res.status(429).json({ error: 'Quota dépassé' });
}
await redis.incr(\`ratelimit:\${userId}\`);`,
    question: "Quel problème critique de concurrence (Race Condition) cette implémentation naïve présente-t-elle sous forte charge avec plusieurs requêtes simultanées ?",
    options: [
      { letter: 'A', text: "Le serveur Express plante avec une erreur de syntaxe." },
      { letter: 'B', text: "La mémoire du client est effacée." },
      { letter: 'C', text: "Entre le `get` et le `incr`, plusieurs requêtes simultanées peuvent lire la même valeur sous le seuil et s'exécuter ensemble, permettant à un utilisateur d'excéder largement le quota autorisé de 100 requêtes (Time-Of-Check to Time-Of-Use)." },
      { letter: 'D', text: "Le compteur Redis devient un nombre négatif." },
    ],
    correctAnswers: ['C'],
    explanation: "Comme la lecture (`get`) et l'incrémentation (`incr`) ne forment pas une opération atomique unique, dix requêtes arrivant dans le même intervalle milliseconde lisent toutes `count = 99` et sont toutes autorisées, contournant le plafond de rate limiting (faille TOCTOU).",
  },
  {
    id: 8,
    codeSnippet: `const rateLimitLuaScript = \`
  local current = redis.call('INCR', KEYS[1])
  if current == 1 then
    redis.call('EXPIRE', KEYS[1], ARGV[1])
  end
  return current
\`;

const count = await redis.eval(rateLimitLuaScript, 1, \`ratelimit:\${userId}\`, 60);`,
    question: "Pourquoi l'utilisation d'un script Lua exécuté via `redis.eval()` garantit-elle une sécurité absolue contre les conditions de concurrence dans ce Rate Limiter ?",
    options: [
      { letter: 'A', text: "Parce que Lua est un langage qui fonctionne sans électricité." },
      { letter: 'B', text: "Parce que le script est compilé sur le GPU du serveur." },
      { letter: 'C', text: "Parce que Lua désactive les connexions des autres utilisateurs." },
      { letter: 'D', text: "Parce que Redis exécute les scripts Lua de manière strictement atomique et transactionnelle sur son thread d'exécution principal : aucune autre commande ne peut s'intercaler pendant l'exécution du script." },
    ],
    correctAnswers: ['D'],
    explanation: "Dans Redis, l'exécution d'un script Lua est indivisible et atomique. Aucune autre opération de lecture ou d'écriture ne peut intervenir entre le `INCR` et le `EXPIRE`, garantissant qu'aucune clé orpheline sans TTL n'est créée et qu'aucun dépassement de quota n'est possible.",
  },
  {
    id: 9,
    question: "Qu'appelle-t-on le problème du 'Cache Stampede' (ou 'Thundering Herd') sur un endpoint d'IA à fort trafic lorsque la clé de cache expire ?",
    options: [
      { letter: 'A', text: "Lorsque la clé de cache d'une requête très populaire expire brutalement, des centaines de requêtes simultanées constatent le Cache Miss en même temps et lancent toutes en parallèle le même appel d'inférence coûteux, submergeant l'API LLM et la base de données." },
      { letter: 'B', text: "Une attaque virale qui corrompt le BIOS du serveur." },
      { letter: 'C', text: "Le ralentissement causé par un câble réseau trop long." },
      { letter: 'D', text: "La saturation de la mémoire vive par des fichiers CSS non minifiés." },
    ],
    correctAnswers: ['A'],
    explanation: "Le Cache Stampede survient lors de l'expiration d'une donnée chaude demandée des dizaines de fois par seconde. Si le cache disparaît, toutes les requêtes concurrentes déclenchent simultanément l'appel en aval au lieu d'une seule, provoquant des coûts exorbitants et un pic de latence massif.",
  },
  {
    id: 10,
    codeSnippet: `async function getCachedWithLock(key: string, fetchFn: () => Promise<string>, ttl: number) {
  const cached = await redis.get(key);
  if (cached) return cached;

  const lockKey = \`lock:\${key}\`;
  const acquired = await redis.set(lockKey, '1', 'NX', 'EX', 10);
  
  if (acquired) {
    try {
      const freshData = await fetchFn();
      await redis.set(key, freshData, 'EX', ttl);
      return freshData;
    } finally {
      await redis.del(lockKey);
    }
  } else {
    // Attendre brièvement et retenter la lecture du cache
    await new Promise(r => setTimeout(r, 200));
    return getCachedWithLock(key, fetchFn, ttl);
  }
}`,
    question: "Comment ce pattern utilisant un verrou distribué avec `SET ... NX EX` résout-il le problème du Cache Stampede ?",
    options: [
      { letter: 'A', text: "En forçant le client à redémarrer son navigateur." },
      { letter: 'B', text: "En garantissant que seule la première requête acquiert le verrou (`NX` = Not eXists) pour appeler l'API LLM, pendant que toutes les autres requêtes patientent et lisent le résultat mis en cache dès sa libération." },
      { letter: 'C', text: "En doublant le coût de chaque requête." },
      { letter: 'D', text: "En supprimant définitivement la clé du cache." },
    ],
    correctAnswers: ['B'],
    explanation: "L'option `NX` (Set if Not eXists) associée à une expiration `EX` crée un Mutex distribué simple et efficace. Une seule requête est autorisée à appeler le modèle d'IA pour repeupler le cache ; les requêtes concurrentes attendent quelques millisecondes et profitent du cache fraîchement rafraîchi.",
  },
  {
    id: 11,
    question: "Quelle est la faiblesse majeure de l'algorithme de Rate Limiting par 'Fenêtre Fixe' (Fixed Window Counter, ex: 100 requêtes par minute de 12h00 à 12h01) ?",
    options: [
      { letter: 'A', text: "Il ne fonctionne que les jours ouvrés." },
      { letter: 'B', text: "Il nécessite une connexion par satellite." },
      { letter: 'C', text: "Un attaquant peut envoyer 100 requêtes à 12h00:59, puis 100 requêtes à 12h01:00, doublant le débit maximal autorisé (200 requêtes en 2 secondes) à la frontière entre deux fenêtres." },
      { letter: 'D', text: "Il supprime les adresses email des utilisateurs." },
    ],
    correctAnswers: ['C'],
    explanation: "L'effet de bordure (Boundary Burst) est la faille classique de la fenêtre fixe : en concentrant ses requêtes à la fin d'une fenêtre et au tout début de la suivante, un client consomme 2x la limite permise sur un intervalle de quelques secondes sans violer la règle formelle.",
  },
  {
    id: 12,
    codeSnippet: `const now = Date.now();
const windowStart = now - 60000; // Fenêtre glissante de 60 secondes

const multi = redis.multi();
multi.zremrangebyscore(key, 0, windowStart); // Supprime les événements hors de la fenêtre
multi.zadd(key, now, \`\${now}-\${Math.random()}\`); // Enregistre la requête courante
multi.zcard(key); // Compte le nombre de requêtes dans la fenêtre
multi.expire(key, 60);
const results = await multi.exec();
const requestCount = results[2][1] as number;`,
    question: "Quel algorithme de Rate Limiting avancé cette séquence de commandes Redis utilisant un Sorted Set (`ZSET`) implémente-t-elle ?",
    options: [
      { letter: 'A', text: "Le tri par sélection aléatoire." },
      { letter: 'B', text: "Le contrôle d'accès basé sur les rôles (RBAC)." },
      { letter: 'C', text: "La compression LZMA de flux continus." },
      { letter: 'D', text: "L'algorithme par Historique Glissant (Sliding Window Log), qui offre une précision temporelle absolue en éliminant les pics de trafic aux frontières de fenêtres." },
    ],
    correctAnswers: ['D'],
    explanation: "L'algorithme Sliding Window Log enregistre chaque timestamp de requête dans un Sorted Set. À chaque arrivée, les entrées plus anciennes que 60 secondes sont élaguées (`ZREMRANGEBYSCORE`) et la cardinalité (`ZCARD`) indique exactement le nombre de requêtes sur les 60 dernières secondes glissantes.",
  },
  {
    id: 13,
    question: "Dans le cadre des standards HTTP (RFC 6585 et conventions d'API), quel code de statut HTTP et quel en-tête doivent impérativement être renvoyés à un client dont la requête a été bloquée par le Rate Limiter ?",
    options: [
      { letter: 'A', text: "HTTP 429 Too Many Requests avec l'en-tête `Retry-After: <secondes>` indiquant le temps d'attente avant la prochaine tentative permise." },
      { letter: 'B', text: "HTTP 404 Not Found avec l'en-tête `Location: /home`" },
      { letter: 'C', text: "HTTP 500 Internal Server Error sans en-tête." },
      { letter: 'D', text: "HTTP 200 OK avec un corps de message vide." },
    ],
    correctAnswers: ['A'],
    explanation: "Le code standardisé pour le dépassement de quota est `429 Too Many Requests`. L'en-tête `Retry-After` informe les clients automatisés et SDK du nombre de secondes (ou de la date) à attendre avant de retenter la requête pour éviter les relances agressives.",
  },
  {
    id: 14,
    codeSnippet: `res.setHeader('X-RateLimit-Limit', '100');
res.setHeader('X-RateLimit-Remaining', '14');
res.setHeader('X-RateLimit-Reset', '1772841600');`,
    question: "À quoi servent ces trois en-têtes HTTP de réponse `X-RateLimit-*` renvoyés avec chaque requête d'une API d'IA ?",
    options: [
      { letter: 'A', text: "À déverrouiller des fonctionnalités payantes du navigateur." },
      { letter: 'B', text: "À informer le client en continu de son quota total alloué, du nombre de requêtes encore autorisées sur la fenêtre courante et de l'heure exacte (timestamp Unix) de réinitialisation du compteur." },
      { letter: 'C', text: "À modifier la configuration du serveur distant." },
      { letter: 'D', text: "À supprimer les cookies d'authentification du visiteur." },
    ],
    correctAnswers: ['B'],
    explanation: "Ces en-têtes permettent aux développeurs et clients d'adapter leur consommation en temps réel : ils savent combien de requêtes ils peuvent encore soumettre avant le blocage et quand leur quota sera réinitialisé.",
  },
  {
    id: 15,
    question: "Quelle est la principale différence entre la persistance Redis par instantanés RDB (Redis Database Backup) et le fichier journal AOF (Append-Only File) ?",
    options: [
      { letter: 'A', text: "RDB ne fonctionne que sur les ordinateurs portables." },
      { letter: 'B', text: "AOF supprime toutes les données une fois par semaine." },
      { letter: 'C', text: "RDB crée une image compacte de l'ensemble de la mémoire à intervalles temporels réguliers (ex: toutes les 15 min), tandis que l'AOF enregistre chaque commande d'écriture dans un journal séquentiel en temps réel, garantissant une perte de données minimale en cas de coupure de courant." },
      { letter: 'D', text: "RDB est un protocole de streaming vidéo." },
    ],
    correctAnswers: ['C'],
    explanation: "RDB prend un cliché périodique (snapshot) de la RAM (très compact et rapide à restaurer mais risque de perdre quelques minutes de données). L'AOF (Append-Only File) consigne chaque écriture au fil de l'eau (avec option `fsync` toutes les secondes), offrant une durabilité maximale pour les quotas critiques.",
  },
  {
    id: 16,
    codeSnippet: `// Type HASH dans Redis pour métadonnées de modèle d'IA
await redis.hset('model:gemini-2.5-pro', {
  pricingInputToken: '0.00125',
  pricingOutputToken: '0.00500',
  contextWindow: '1000000',
  status: 'active'
});

const price = await redis.hget('model:gemini-2.5-pro', 'pricingInputToken');`,
    question: "Pourquoi l'utilisation du type de données `HASH` de Redis est-elle plus performante et économe en mémoire que de stocker l'objet complet sous forme de chaîne JSON sérialisée avec `SET` ?",
    options: [
      { letter: 'A', text: "Parce que le type `HASH` compresse les nombres avec l'algorithme ZIP." },
      { letter: 'B', text: "Parce que les hashs sont sauvegardés sur une carte graphique." },
      { letter: 'C', text: "Parce que les chaînes JSON ne sont pas acceptées par Redis." },
      { letter: 'D', text: "Parce qu'un `HASH` permet de lire ou modifier des champs individuels (`HGET`, `HSET`) sans avoir à désérialiser ni renvoyer la totalité de l'objet sur le réseau, et qu'il bénéficie d'une compression interne en mémoire (ziplist/listpack)." },
    ],
    correctAnswers: ['D'],
    explanation: "Stocker un JSON impose de lire et réécrire la totalité de la chaîne pour modifier une seule propriété. Les HASH Redis stockent des paires champ-valeur natives : on peut lire ou mettre à jour un champ spécifique en temps constant O(1) avec un coût réseau et mémoire minimal.",
  },
  {
    id: 17,
    question: "Qu'est-ce que l'algorithme du 'Seau Percé' (Leaky Bucket) ou de 'l'Entonnoir de Jetons' (Token Bucket) appliqué au Rate Limiting d'appels à des modèles d'IA ?",
    options: [
      { letter: 'A', text: "Un système où un seau se remplit continuellement de jetons à débit constant (ex: 10 tokens/seconde) ; chaque requête consomme un jeton. Si le seau est vide, la requête est rejetée ou temporisée, autorisant des pointes de trafic temporaires (bursts) jusqu'à la contenance maximale du seau." },
      { letter: 'B', text: "Un algorithme qui supprime aléatoirement la moitié des utilisateurs." },
      { letter: 'C', text: "Un protocole de refroidissement par eau pour les serveurs." },
      { letter: 'D', text: "Une technique pour détecter les pannes matérielles de RAM." },
    ],
    correctAnswers: ['A'],
    explanation: "Token Bucket est l'algorithme préféré des fournisseurs d'API (comme Google ou Stripe). Il permet de lisser la consommation moyenne à un débit fixe tout en acceptant des rafales courtes (burst capacity) pour améliorer l'expérience utilisateur.",
  },
  {
    id: 18,
    codeSnippet: `const rateLimitByUserAndTier = async (req, res, next) => {
  const user = req.user; // { id: 'u1', tier: 'premium' }
  const maxLimit = user.tier === 'premium' ? 500 : 30; // 500 req/min vs 30 req/min
  const key = \`ratelimit:\${user.tier}:\${user.id}\`;
  
  const current = await redis.incr(key);
  if (current === 1) await redis.expire(key, 60);
  
  if (current > maxLimit) {
    return res.status(429).json({ error: "Limite de quota atteinte pour votre forfait." });
  }
  next();
};`,
    question: "Dans une architecture SaaS payante d'IA, quelle stratégie de limitation de débit ce middleware implémente-t-il ?",
    options: [
      { letter: 'A', text: "Un rate-limiting uniforme pour toutes les adresses IP." },
      { letter: 'B', text: "Un rate-limiting multi-niveaux basé sur les forfaits (Tier-based Rate Limiting), isolant les quotas des utilisateurs gratuits et payants pour protéger les ressources tout en offrant des SLAs supérieurs aux clients Premium." },
      { letter: 'C', text: "Un blocage automatique des utilisateurs non enregistrés sur GitHub." },
      { letter: 'D', text: "Une politique de suppression des comptes inactifs." },
    ],
    correctAnswers: ['B'],
    explanation: "Le Tier-based Rate Limiting module les plafonds et fenêtres temporelles en fonction du rôle ou de l'abonnement du client. Les requêtes gratuites sont fortement encadrées pour éviter les abus, tandis que les clients payants bénéficient d'une enveloppe de débit garantie.",
  },
  {
    id: 19,
    question: "Pourquoi est-il fortement déconseillé d'utiliser l'adresse IP cliente (`req.ip`) comme unique clé de Rate Limiting sur une API d'entreprise ?",
    options: [
      { letter: 'A', text: "Parce que les adresses IP changent de valeur toutes les 2 secondes." },
      { letter: 'B', text: "Parce que Node.js ne peut pas lire les adresses IP." },
      { letter: 'C', text: "Parce que des centaines d'employés d'une même entreprise ou d'une université partagent souvent une seule adresse IP publique sortante via un proxy/NAT, ce qui pénaliserait l'ensemble des utilisateurs légitimes si l'un d'eux dépasse le quota." },
      { letter: 'D', text: "Parce que le protocole IPv4 a été totalement désactivé sur Internet." },
    ],
    correctAnswers: ['C'],
    explanation: "Derrière une passerelle d'entreprise (NAT), des milliers d'utilisateurs distincts partagent la même IP publique. Un Rate Limiting basé sur l'IP pénaliserait tout le monde. L'ingénierie moderne combine l'identifiant utilisateur authentifié (User ID / API Key) avec un repli sur l'IP uniquement pour les routes publiques anonymes.",
  },
  {
    id: 20,
    codeSnippet: `// Commande dangereuse en production
await redis.keys('cache:llm:*');`,
    question: "Pourquoi la commande `KEYS pattern` est-elle formellement interdite sur un serveur Redis de production hébergeant des millions de clés ?",
    options: [
      { letter: 'A', text: "Parce qu'elle supprime toutes les données trouvées sans confirmation." },
      { letter: 'B', text: "Parce que les expressions régulières ne sont pas tolérées par Redis." },
      { letter: 'C', text: "Parce qu'elle consomme 100% de la bande passante internet du fournisseur cloud." },
      { letter: 'D', text: "Parce que `KEYS` est une opération synchrone O(N) qui parcourt l'intégralité de l'espace de clés en bloquant le thread d'exécution unique de Redis pendant plusieurs secondes, gelant toutes les autres requêtes de l'application." },
    ],
    correctAnswers: ['D'],
    explanation: "Comme Redis est mono-threadé, exécuter `KEYS *` sur une base contenant 10 millions de clés bloque le serveur pendant plusieurs secondes durant lesquelles aucune commande `GET` ou `SET` ne peut être traitée. En production, il faut impérativement utiliser `SCAN` qui itère de manière non bloquante par petits lots via un curseur.",
  },
  {
    id: 21,
    question: "Quelle commande itérative basée sur un curseur doit-on utiliser pour parcourir de larges volumes de clés dans Redis sans jamais bloquer l'Event Loop du serveur ?",
    options: [
      { letter: 'A', text: "SCAN" },
      { letter: 'B', text: "FIND_ALL" },
      { letter: 'C', text: "LIST_KEYS" },
      { letter: 'D', text: "DUMP_MEMORY" },
    ],
    correctAnswers: ['A'],
    explanation: "La commande `SCAN cursor [MATCH pattern] [COUNT count]` retourne un petit sous-ensemble de clés accompagné d'un nouveau curseur. Elle s'exécute en quelques microsecondes sans bloquer le serveur, permettant à l'application d'itérer progressivement sur l'espace de clés.",
  },
  {
    id: 22,
    codeSnippet: `// Configuration de Cluster Redis pour haute disponibilité
import { Cluster } from 'ioredis';

const cluster = new Cluster([
  { host: 'redis-node-1', port: 6379 },
  { host: 'redis-node-2', port: 6379 },
  { host: 'redis-node-3', port: 6379 },
]);`,
    question: "Comment Redis Cluster partitionne-t-il les données entre ses multiples nœuds maîtres (Sharding horizontal) ?",
    options: [
      { letter: 'A', text: "En envoyant les clés contenant des voyelles sur le premier nœud et les consonnes sur le second." },
      { letter: 'B', text: "En découpant l'espace d'adressage en 16 384 'Hash Slots' (créneaux de hachage) calculés par l'algorithme CRC16(clé) modulo 16384, répartis équitablement entre les nœuds." },
      { letter: 'C', text: "En copiant l'intégralité des clés sur tous les serveurs à l'identique sans partitionnement." },
      { letter: 'D', text: "En attribuant les données selon la taille des fichiers sur disque." },
    ],
    correctAnswers: ['B'],
    explanation: "Redis Cluster utilise un espace fixe de 16 384 hash slots. Chaque clé se voit assigner un slot via `CRC16(key) % 16384`. Les nœuds du cluster se partagent ces slots, permettant d'étendre la mémoire RAM et la capacité de requêtes sur des dizaines de serveurs en parallèle.",
  },
  {
    id: 23,
    question: "Dans Redis Cluster, à quoi servent les 'Hash Tags' (délimiteurs `{...}` dans le nom d'une clé, ex: `{user:42}:profile` et `{user:42}:orders`) ?",
    options: [
      { letter: 'A', text: "À appliquer un filtre de style CSS sur les données." },
      { letter: 'B', text: "À empêcher les hackers d'utiliser des caractères spéciaux." },
      { letter: 'C', text: "À forcer le calcul du hash CRC16 uniquement sur la sous-chaîne entre accolades, garantissant que toutes les clés partageant le même tag soient stockées sur le même nœud physique pour autoriser les opérations multi-clés atomiques ou transactions." },
      { letter: 'D', text: "À doubler la vitesse de téléchargement des données." },
    ],
    correctAnswers: ['C'],
    explanation: "Dans Redis Cluster, les opérations sur plusieurs clés (scripts Lua, transactions multi-clés) exigent que toutes les clés résident sur le même nœud (même hash slot). En utilisant `{user:42}:cache` et `{user:42}:quota`, Redis ne calcule le hash que sur `user:42`, garantissant leur co-localisation.",
  },
  {
    id: 24,
    codeSnippet: `// Système de publication / souscription (Pub/Sub)
const sub = new Redis();
const pub = new Redis();

sub.subscribe('ai_jobs_completed', () => {
  console.log('Abonné au canal');
});

sub.on('message', (channel, message) => {
  console.log(\`Message reçu sur \${channel}: \${message}\`);
});`,
    question: "Pourquoi est-il impératif d'utiliser deux instances de connexion Redis distinctes (`sub` et `pub`) lors de l'utilisation du patron Pub/Sub sous Node.js ?",
    options: [
      { letter: 'A', text: "Parce qu'une seule connexion ferait griller la carte mère." },
      { letter: 'B', text: "Pour doubler la consommation électrique du conteneur." },
      { letter: 'C', text: "Parce que le protocole Pub/Sub nécessite une adresse IPv6 dédiée." },
      { letter: 'D', text: "Parce qu'une fois qu'une connexion Redis entre en mode souscription (`SUBSCRIBE`), elle entre dans un état dédié où elle ne peut plus exécuter de commandes normales (comme `GET`, `SET`, `PUBLISH`) et n'accepte plus que des commandes de gestion de canaux." },
    ],
    correctAnswers: ['D'],
    explanation: "Le protocole Redis stipule qu'une connexion passée en mode souscription bloque son canal pour écouter les messages en flux continu. Elle ne peut plus émettre de requêtes classiques de lecture/écriture. Il faut donc une connexion séparée pour publier (`pub`) ou faire du cache.",
  },
  {
    id: 25,
    question: "Dans le cadre d'un système de génération d'images par IA très coûteux en GPU, comment un Rate Limiter basé sur les 'Coûts de Jetons' (Cost-based Rate Limiter) fonctionne-t-il ?",
    options: [
      { letter: 'A', text: "Chaque type d'opération consomme un nombre pondéré de jetons selon sa consommation réelle (ex: texte court = 1 jeton, analyse PDF = 5 jetons, génération d'image HD = 50 jetons), limitant l'épuisement financier des ressources." },
      { letter: 'B', text: "Toutes les requêtes débitent exactement 1 unité quel que soit leur coût." },
      { letter: 'C', text: "Le serveur facture automatiquement la carte bancaire de l'utilisateur." },
      { letter: 'D', text: "Le système refuse toutes les requêtes après 18h." },
    ],
    correctAnswers: ['A'],
    explanation: "Un Rate Limiter par points ou coûts pondérés reflète la charge réelle : traiter une simple question textuelle consomme 1 point de budget, tandis qu'une tâche lourde (génération d'images, embedding d'un livre) débite 50 points, protégeant l'infrastructure contre les abus ciblés.",
  },
  {
    id: 26,
    codeSnippet: `// Configuration de sentinelles Redis pour le basculement automatique
const redis = new Redis({
  sentinels: [
    { host: 'sentinel-1', port: 26379 },
    { host: 'sentinel-2', port: 26379 },
    { host: 'sentinel-3', port: 26379 },
  ],
  name: 'mymaster',
});`,
    question: "Quel rôle remplit l'architecture 'Redis Sentinel' dans le déploiement de production d'un backend d'IA ?",
    options: [
      { letter: 'A', text: "Supprimer les clés de cache qui contiennent des fautes d'orthographe." },
      { letter: 'B', text: "Assurer la haute disponibilité (HA) en surveillant en continu le nœud maître (Master), déclenchant un basculement automatique (Failover) vers un réplica esclave promu nouveau maître en cas de panne, sans interruption pour l'application cliente." },
      { letter: 'C', text: "Chiffrer les données stockées sur le disque dur avec du SHA-256." },
      { letter: 'D', text: "Créer des comptes administrateurs temporaires." },
    ],
    correctAnswers: ['B'],
    explanation: "Redis Sentinel gère la surveillance, la notification et le basculement automatique (Automated Failover). Si le Master tombe en panne, le quorum de Sentinelles élit un Replica pour devenir le nouveau Master et met à jour la configuration des clients connectés en toute transparence.",
  },
  {
    id: 27,
    question: "Qu'est-ce que le phénomène de 'Cache Penetration' et comment le contrecarrer efficacement dans une architecture d'IA ?",
    options: [
      { letter: 'A', text: "L'humidité qui pénètre dans la salle des serveurs." },
      { letter: 'B', text: "La fuite de clés d'API dans le code client." },
      { letter: 'C', text: "Des requêtes malveillantes demandant répétitivement des données inexistantes qui ne sont jamais en cache (provoquant systématiquement des Cache Miss et surchargeant la base de données en aval), neutralisé en stockant les résultats négatifs en cache avec un TTL court ou via un filtre de Bloom." },
      { letter: 'D', text: "L'augmentation involontaire du nombre de nœuds du cluster." },
    ],
    correctAnswers: ['C'],
    explanation: "La pénétration de cache se produit lorsqu'un attaquant bombarde l'API de clés introuvables. Comme elles n'existent pas, le cache n'a rien à renvoyer et chaque requête heurte le stockage sous-jacent. Mettre en cache la valeur `null` pendant 60 secondes ou utiliser un Bloom Filter bloque l'attaque dès la frontière.",
  },
  {
    id: 28,
    codeSnippet: `// Filtrage probabiliste avant consultation du cache
const exists = await redis.call('BF.EXISTS', 'known_prompts', promptHash);
if (!exists) {
  // Le prompt n'a mathématiquement JAMAIS été posé !
  return fetchAndGenerate(prompt);
}`,
    question: "Quelle structure de données probabiliste ultra-compacte en mémoire est illustrée ici avec le module RedisBloom (`BF.EXISTS`) ?",
    options: [
      { letter: 'A', text: "Un arbre binaire de recherche ordonné." },
      { letter: 'B', text: "Un tableau associatif JSON." },
      { letter: 'C', text: "Une file de priorité synchrone." },
      { letter: 'D', text: "Un filtre de Bloom (Bloom Filter), qui garantit avec certitude l'absence d'un élément (zéro faux négatif) avec une empreinte mémoire infime, évitant des lectures inutiles." },
    ],
    correctAnswers: ['D'],
    explanation: "Un filtre de Bloom utilise des fonctions de hachage multiples sur un tableau de bits. S'il indique qu'un élément est absent, c'est une certitude mathématique absolue (aucun faux négatif), évitant d'effectuer des recherches de clés dans le cache ou la base pour des données jamais enregistrées.",
  },
  {
    id: 29,
    question: "Pourquoi est-il préconisé d'ajouter une composante aléatoire (Jitter) à la durée de vie (TTL) des clés de cache stockant des inférences populaires (ex: `TTL = 3600 + Math.random() * 300`) ?",
    options: [
      { letter: 'A', text: "Pour désynchroniser l'expiration d'un grand nombre de clés générées simultanément et éviter qu'elles n'expirent toutes à la même seconde exacte, ce qui provoquerait un pic soudain de requêtes sur le LLM (Cache Stampede collectif)." },
      { letter: 'B', text: "Pour désactiver le ramasse-miettes de Redis." },
      { letter: 'C', text: "Pour empêcher les utilisateurs de prédire les réponses de l'IA." },
      { letter: 'D', text: "Pour crypter la durée de vie dans les journaux système." },
    ],
    correctAnswers: ['A'],
    explanation: "Si 1000 clés sont créées à 14h00 avec un TTL fixe de 3600 secondes, elles expireront toutes simultanément à 15h00:00, submergeant instantanément le serveur d'appels d'inférence en cascade. L'ajout d'une variation aléatoire (Jitter) lisse les expirations dans le temps.",
  },
  {
    id: 30,
    codeSnippet: `const scriptSha = await redis.script('LOAD', luaScript);
// Exécutions ultérieures ultra-rapides
const result = await redis.evalsha(scriptSha, 1, key, arg);`,
    question: "Quel gain de performance la commande `redis.evalsha()` apporte-t-elle par rapport à `redis.eval()` dans un environnement traitant des dizaines de milliers de requêtes par seconde ?",
    options: [
      { letter: 'A', text: "Elle permet au script de s'exécuter dans le navigateur." },
      { letter: 'B', text: "Elle évite de retransférer le code source complet du script Lua sur le réseau à chaque requête en envoyant uniquement son hash SHA-1 de 40 caractères précompilé dans la mémoire de Redis, économisant la bande passante et le temps d'analyse syntaxique." },
      { letter: 'C', text: "Elle double la taille des registres du processeur." },
      { letter: 'D', text: "Elle contourne les règles de sécurité de Redis." },
    ],
    correctAnswers: ['B'],
    explanation: "`EVAL` retransmet le texte du script à chaque appel, consommant de la bande passante. `SCRIPT LOAD` précompile le script dans le cache de Redis et retourne son empreinte SHA-1. `EVALSHA` n'envoie que cette signature SHA-1 de 40 octets, optimisant au maximum les flux réseau.",
  },
  {
    id: 31,
    question: "Dans le cadre de l'évaluation des performances d'un système de cache, comment calcule-t-on la métrique fondamentale du 'Cache Hit Ratio' ?",
    options: [
      { letter: 'A', text: "Nombre de clés supprimées divisé par le nombre de mégaoctets de RAM." },
      { letter: 'B', text: "Temps d'exécution de la requête divisé par 100." },
      { letter: 'C', text: "Nombre de requêtes servies avec succès par le cache (Hits) divisé par le nombre total de requêtes de consultation du cache (Hits + Misses), exprimé en pourcentage." },
      { letter: 'D', text: "Nombre d'utilisateurs connectés divisé par le nombre de cœurs CPU." },
    ],
    correctAnswers: ['C'],
    explanation: "Le Cache Hit Ratio mesure l'efficacité de votre stratégie de mise en cache. Un ratio de 85% signifie que 85 requêtes sur 100 sont immédiatement servies par la mémoire Redis sans jamais solliciter l'API LLM payante ni la base de données relationnelle.",
  },
  {
    id: 32,
    codeSnippet: `// Configuration de sécurité Redis
requirepass "mot_de_passe_ultra_complexe_64_caracteres"
rename-command FLUSHALL ""
rename-command FLUSHDB ""
rename-command CONFIG ""`,
    question: "Pourquoi est-il fortement recommandé de renommer ou désactiver des commandes comme `FLUSHALL` ou `CONFIG` dans le fichier de configuration `redis.conf` en production ?",
    options: [
      { letter: 'A', text: "Parce que ces commandes ne fonctionnent pas sur les systèmes 64 bits." },
      { letter: 'B', text: "Pour supprimer l'historique Git du serveur." },
      { letter: 'C', text: "Pour améliorer la vitesse de calcul des racines carrées." },
      { letter: 'D', text: "Pour empêcher qu'un attaquant parvenant à injecter une commande ou exploitant un port Redis exposé ne purge instantanément toute la base de données ou ne modifie la configuration pour exécuter du code à distance sur le serveur." },
    ],
    correctAnswers: ['D'],
    explanation: "`FLUSHALL` efface l'intégralité des données de toutes les bases Redis en un instant. Désactiver ou renommer ces commandes administratives destructrices fait partie des règles élémentaires de durcissement (Hardening) de Redis.",
  },
  {
    id: 33,
    question: "Dans le modèle de persistance Redis, que signifie l'option de synchronisation `appendfsync everysec` du fichier AOF ?",
    options: [
      { letter: 'A', text: "Redis vide et force l'écriture physique des données du tampon OS sur le disque dur une fois par seconde (compromis idéal entre performance maximale et perte maximale de données limitée à 1 seconde en cas de sinistre matériel)." },
      { letter: 'B', text: "Redis redémarre toutes les secondes." },
      { letter: 'C', text: "Redis efface toutes les clés âgées de plus d'une seconde." },
      { letter: 'D', text: "Redis crée un nouveau compte utilisateur chaque seconde." },
    ],
    correctAnswers: ['A'],
    explanation: "`appendfsync everysec` est la recommandation par défaut de Redis. Elle offre des performances quasi équivalentes à l'exécution en RAM pure tout en bornant le risque de perte de données à un maximum strict d'une seconde en cas de panne matérielle brutale.",
  },
  {
    id: 34,
    codeSnippet: `// Utilisation des Streams Redis pour file d'attente de tâches IA
await redis.xadd('stream:ai_tasks', '*', 
  'userId', 'u123', 
  'taskType', 'audio_transcribe', 
  'fileUrl', 'https://storage.example.com/audio.mp3'
);`,
    question: "Quel avantage les 'Redis Streams' (`XADD`, `XREADGROUP`) apportent-ils par rapport aux simples listes Redis (`LPUSH`/`RPOP`) pour orchestrer des tâches asynchrones d'IA ?",
    options: [
      { letter: 'A', text: "Ils ne consomment aucune mémoire vive." },
      { letter: 'B', text: "Ils intègrent nativement des groupes de consommateurs (Consumer Groups), la persistance des messages, l'accusé de réception explicite (`XACK`) et la reprise des tâches abandonnées en cas de crash d'un worker (Pending Entries List - PEL)." },
      { letter: 'C', text: "Ils permettent de convertir des fichiers MP3 en vidéos." },
      { letter: 'D', text: "Ils suppriment automatiquement les comptes inactifs." },
    ],
    correctAnswers: ['B'],
    explanation: "Inspirés du modèle d'Apache Kafka, les Redis Streams fournissent une véritable infrastructure de messagerie robuste. Contrairement à un `RPOP` où un message consommé par un worker qui crashe est perdu à jamais, les Streams gèrent des acknowledgements (`XACK`) et permettent à un autre worker de reprendre les messages orphelins.",
  },
  {
    id: 35,
    question: "Quelle stratégie d'invalidation de cache est la plus adaptée lorsqu'un document d'une base de connaissances d'entreprise est modifié par un éditeur ?",
    options: [
      { letter: 'A', text: "Éteindre le serveur Redis pendant 1 heure." },
      { letter: 'B', text: "Attendre passivement que le TTL de 7 jours s'écoule sans rien faire." },
      { letter: 'C', text: "L'invalidation ciblée par événement : l'application de mise à jour publie un événement de purge qui supprime immédiatement la clé de cache spécifique (`redis.del('doc:123')`) et les embeddings dérivés." },
      { letter: 'D', text: "Supprimer l'intégralité du compte de l'éditeur." },
    ],
    correctAnswers: ['C'],
    explanation: "L'invalidation événementielle (Event-driven Invalidation) garantit la cohérence des données : dès qu'une entité est modifiée ou supprimée dans le stockage source de vérité, le serveur purge explicitement la clé correspondante dans Redis.",
  },
  {
    id: 36,
    codeSnippet: `const result = await redis.mget('prompt:1', 'prompt:2', 'prompt:3');`,
    question: "Pourquoi est-il préférable d'utiliser `MGET` (ou `MSET`) plutôt qu'une boucle effectuant plusieurs `GET` successifs ?",
    options: [
      { letter: 'A', text: "Parce que `MGET` est exécuté sur un cœur de processeur quantique." },
      { letter: 'B', text: "Parce que `MGET` compresse les résultats en format RAR." },
      { letter: 'C', text: "Parce que `GET` est une méthode dépréciée depuis Node.js v14." },
      { letter: 'D', text: "Parce que `MGET` extrait toutes les clés spécifiées en une seule opération atomique et un seul aller-retour réseau (RTT), divisant la latence par le nombre de clés requises." },
    ],
    correctAnswers: ['D'],
    explanation: "Récupérer 10 clés une par une impose 10 allers-retours réseau consécutifs. `MGET` prend une liste arbitraire de clés et récupère toutes les valeurs correspondantes en une seule trame TCP.",
  },
  {
    id: 37,
    question: "Dans le cadre de l'optimisation des coûts (FinOps), pourquoi la mise en cache sémantique d'un LLM est-elle particulièrement complexe par rapport à un cache clé-valeur traditionnel ?",
    options: [
      { letter: 'A', text: "Parce qu'elle exige de calculer un embedding vectoriel pour chaque requête entrante et de mesurer la similarité cosinus avec un index vectoriel de questions en cache selon un seuil de tolérance (ex: score > 0.95), introduisant un risque de faux positifs sémantiques." },
      { letter: 'B', text: "Parce que les vecteurs d'embeddings ne peuvent pas être stockés en RAM." },
      { letter: 'C', text: "Parce que les modèles d'IA changent d'alphabet tous les mois." },
      { letter: 'D', text: "Parce que Redis refuse de stocker des nombres décimaux." },
    ],
    correctAnswers: ['A'],
    explanation: "Le cache sémantique (ex: GPTCache ou Redis VSS) doit évaluer si 'Quel est le prix ?' et 'Combien ça coûte ?' sont interchangeables. Cela impose un calcul d'embedding et un seuil de similarité strict, sous peine de servir une réponse hors sujet à une question subtilement différente.",
  },
  {
    id: 38,
    codeSnippet: `// Expiration avec sliding window lors de la consultation
async function getWithSlidingTtl(key: string, ttlSeconds: number) {
  const data = await redis.get(key);
  if (data) {
    // Prolonge la durée de vie à chaque consultation active
    await redis.expire(key, ttlSeconds);
  }
  return data;
}`,
    question: "Quel est l'avantage de cette politique d'expiration glissante (Sliding TTL) pour les contextes de conversations de chat d'IA ?",
    options: [
      { letter: 'A', text: "Elle empêche les utilisateurs de quitter la conversation." },
      { letter: 'B', text: "Elle maintient la session en mémoire tant que l'utilisateur est activement engagé dans la discussion, et ne libère la mémoire que lorsque l'utilisateur cesse d'envoyer des messages pendant une période d'inactivité prolongée (ex: 30 minutes)." },
      { letter: 'C', text: "Elle force l'IA à répondre avec des phrases de plus en plus longues." },
      { letter: 'D', text: "Elle convertit les sessions en fichiers MP4." },
    ],
    correctAnswers: ['B'],
    explanation: "Un TTL fixe détruirait le contexte au bout de 30 minutes même si l'utilisateur est en plein échange. Avec un TTL glissant, chaque nouvelle interaction réinitialise le compte à rebours : la mémoire n'est libérée que 30 minutes après le dernier message reçu.",
  },
  {
    id: 39,
    question: "Dans une infrastructure de production, que se passe-t-il si Redis sature sa mémoire physique maximale (`maxmemory`) avec la politique d'éviction par défaut `noeviction` ?",
    options: [
      { letter: 'A', text: "Le serveur physique s'éteint automatiquement." },
      { letter: 'B', text: "Redis supprime toutes les données enregistrées la veille." },
      { letter: 'C', text: "Redis continue de répondre normalement aux commandes de lecture (`GET`), mais rejette immédiatement toute nouvelle tentative d'écriture (`SET`, `HSET`, `INCR`) avec une erreur explicite 'OOM command not allowed when used memory > maxmemory'." },
      { letter: 'D', text: "Redis formate le disque dur de la machine hôte." },
    ],
    correctAnswers: ['C'],
    explanation: "Avec `noeviction`, Redis préserve l'intégrité de toutes les données existantes en mémoire sans rien supprimer arbitrairement. Dès que la limite est franchie, toutes les commandes qui consomment de la mémoire supplémentaire échouent avec une erreur d'Out Of Memory.",
  },
  {
    id: 40,
    codeSnippet: `// Configuration de reconnexion résiliente avec ioredis
const redis = new Redis({
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});`,
    question: "Quel pattern de résilience réseau cette fonction `retryStrategy` implémente-t-elle lors d'une perte temporaire de liaison avec le serveur Redis ?",
    options: [
      { letter: 'A', text: "Un basculement vers une connexion Bluetooth." },
      { letter: 'B', text: "Une suppression automatique des logs applicatifs." },
      { letter: 'C', text: "Une désactivation permanente de tous les mécanismes de cache." },
      { letter: 'D', text: "Une politique de réessais échelonnés avec temporisation progressive (Linear Backoff borné à 2 secondes) pour éviter de saturer le serveur dès son redémarrage." },
    ],
    correctAnswers: ['D'],
    explanation: "`retryStrategy` permet de configurer le comportement du client Node.js face aux interruptions réseau. L'échelonnement progressif du délai d'attente évite l'effet de tempête de reconnexions (Thundering Herd) lorsque l'instance Redis redevient disponible.",
  },
];
