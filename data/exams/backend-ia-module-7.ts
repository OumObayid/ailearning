import { ExamMetadata, ExamQuestion } from './types';

export const BACKEND_IA_MODULE_7_EXAM_METADATA: ExamMetadata = {
  moduleId: 'backend-ia-module-7',
  title: "Examen Officiel de Certification — Module 7 : Projet de Synthèse Backend IA & Déploiement Haute Performance",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (32/40)
  totalQuestions: 40,
};

export const BACKEND_IA_MODULE_7_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "Dans le cadre de l'Étape 1 du projet de synthèse (Architecture socle), pourquoi est-il recommandé d'adopter un découpage strict en couches (Controllers -> Services -> Repositories) plutôt que de tout coder dans les routes Express ?",
    options: [
      { letter: 'A', text: "Pour respecter le principe de responsabilité unique (SRP), isoler la logique métier pure des détails de transport HTTP et de persistance SQL, et faciliter les tests unitaires via des mocks." },
      { letter: 'B', text: "Pour doubler la vitesse de calcul des cartes graphiques." },
      { letter: 'C', text: "Parce que Node.js interdit les fichiers de plus de 50 lignes." },
      { letter: 'D', text: "Pour obliger les clients à payer un abonnement mensuel." },
    ],
    correctAnswers: ['A'],
    explanation: "Une architecture en couches sépare les préoccupations : les contrôleurs gèrent la validation HTTP (entrées/sorties), les services orchestrent la logique métier et l'IA, et les dépôts (repositories) gèrent l'accès aux bases de données. Cette séparation rend le code testable, maintenable et modulaire.",
  },
  {
    id: 2,
    codeSnippet: `import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  GEMINI_API_KEY: z.string().min(1, "Clé GEMINI manquante"),
  DB_HOST: z.string().default('localhost'),
  REDIS_URL: z.string().url("Format d'URL Redis invalide"),
});

export const env = EnvSchema.parse(process.env);`,
    question: "Quel risque opérationnel critique cette validation au démarrage avec Zod (Fail-Fast) élimine-t-elle dans le projet de synthèse ?",
    options: [
      { letter: 'A', text: "La surchauffe des ventilateurs de la machine hôte." },
      { letter: 'B', text: "Le démarrage d'un serveur avec des variables d'environnement manquantes ou corrompues qui n'échouerait que tardivement au beau milieu d'une requête utilisateur critique en production." },
      { letter: 'C', text: "L'obligation d'installer le langage Python." },
      { letter: 'D', text: "La corruption du protocole HTTPS." },
    ],
    correctAnswers: ['B'],
    explanation: "Le pattern 'Fail-Fast' vérifie la présence et la conformité de tous les secrets et paramètres de configuration dès l'initialisation de l'application. Si une variable obligatoire (`GEMINI_API_KEY`, `REDIS_URL`) est absente, le processus refuse immédiatement de démarrer en affichant un message clair.",
  },
  {
    id: 3,
    codeSnippet: `CREATE TABLE IF NOT EXISTS audit_analyses (
  id CHAR(36) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  prompt_hash CHAR(64) NOT NULL,
  status ENUM('pending', 'completed', 'failed') NOT NULL,
  duration_ms INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_status_date (user_id, status, created_at)
) ENGINE=InnoDB;`,
    question: "Dans cette modélisation de l'Étape 2, pourquoi l'index composite `(user_id, status, created_at)` a-t-il été conçu dans cet ordre précis ?",
    options: [
      { letter: 'A', text: "Par ordre alphabétique des noms de colonnes." },
      { letter: 'B', text: "Pour limiter le nombre de messages à 100 par conversation." },
      { letter: 'C', text: "Pour optimiser la requête la plus fréquente du tableau de bord de l'utilisateur (`WHERE user_id = ? AND status = ? ORDER BY created_at DESC`) en évitant un scan complet et un `filesort` coûteux en mémoire." },
      { letter: 'D', text: "Pour chiffrer les requêtes SQL dans les logs système." },
    ],
    correctAnswers: ['C'],
    explanation: "Cet index respecte parfaitement la règle du préfixe gauche : il filtre d'abord sur l'égalité stricte (`user_id = ?`, haute sélectivité), puis sur le statut (`status = 'completed'`), et enfin sert directement à satisfaire l'ordre chronologique (`created_at`) sans tri supplémentaire (`filesort`).",
  },
  {
    id: 4,
    codeSnippet: `export const AnalysisOutputSchema = z.object({
  summary: z.string().describe("Résumé exécutif de l'analyse"),
  riskScore: z.number().min(0).max(100).describe("Score de risque calculé"),
  keyFindings: z.array(z.string()).describe("Liste des constatations clés"),
  recommendedAction: z.enum(['APPROVE', 'REVIEW', 'REJECT'])
});`,
    question: "À l'Étape 3 du projet, comment ce schéma Zod est-il exploité avec le SDK `@google/genai` pour garantir une réponse déterministe ?",
    options: [
      { letter: 'A', text: "Il est injecté sous forme de texte brut dans la question de l'utilisateur." },
      { letter: 'B', text: "Il empêche le modèle de consommer plus de 10 watts." },
      { letter: 'C', text: "Il sert à configurer les règles de pare-feu du serveur Node.js." },
      { letter: 'D', text: "Il est converti en JSON Schema et transmis dans `config.responseSchema` avec `responseMimeType: 'application/json'`, contraignant le modèle à générer un JSON valide et typé garanti." },
    ],
    correctAnswers: ['D'],
    explanation: "En fournissant le schéma Zod dans les options de configuration de Gemini (`responseSchema`), le moteur d'inférence contraint la génération de tokens (Grammar-guided decoding) à respecter scrupuleusement la grammaire JSON spécifiée, éliminant les erreurs de format.",
  },
  {
    id: 5,
    codeSnippet: `app.get('/api/analysis/stream/:id', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });
  
  // Envoi du premier chunk
  res.write(\`data: \${JSON.stringify({ status: 'started' })}\\n\\n\`);
});`,
    question: "À l'Étape 4 (Streaming SSE), quel rôle joue l'en-tête `X-Accel-Buffering: no` dans une architecture déployée derrière un reverse-proxy Nginx ?",
    options: [
      { letter: 'A', text: "Il désactive explicitement la mise en mémoire tampon de Nginx pour cette réponse HTTP spécifique, garantissant que chaque mot généré par l'IA parvienne instantanément à l'écran de l'utilisateur." },
      { letter: 'B', text: "Il désactive le certificat HTTPS sur le domaine." },
      { letter: 'C', text: "Il augmente la vitesse d'écriture sur le disque SSD." },
      { letter: 'D', text: "Il supprime automatiquement les balises HTML du contenu." },
    ],
    correctAnswers: ['A'],
    explanation: "Nginx intègre un mécanisme d'accumulation en mémoire tampon. L'en-tête `X-Accel-Buffering: no` signale directement à Nginx de court-circuiter ce buffer pour ce flux précis et de relayer immédiatement chaque paquet `res.write()` vers le client.",
  },
  {
    id: 6,
    codeSnippet: `const { Worker } = require('worker_threads');

export function runCpuBoundVectorization(data: Float32Array): Promise<Float32Array> {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./dist/workers/mathWorker.js', {
      workerData: { length: data.length }
    });
    // Transfert sans copie mémoire
    worker.postMessage({ buffer: data.buffer }, [data.buffer]);
    worker.on('message', (msg) => resolve(new Float32Array(msg.buffer)));
    worker.on('error', reject);
  });
}`,
    question: "Dans l'Étape 5 du projet, quel est le bénéfice technique de déporter le calcul vectoriel dans un Worker Thread avec transfert de buffer `[data.buffer]` ?",
    options: [
      { letter: 'A', text: "Il permet au serveur d'exécuter l'application sans installer Node.js." },
      { letter: 'B', text: "Il exécute les calculs arithmétiques lourds sur un cœur CPU dédié sans bloquer l'Event Loop du thread principal, tout en évitant toute copie mémoire grâce au transfert de propriété à coût zéro (O(1))." },
      { letter: 'C', text: "Il crypte les vecteurs avec du SHA-512." },
      { letter: 'D', text: "Il convertit les calculs en requêtes SQL vers MySQL." },
    ],
    correctAnswers: ['B'],
    explanation: "Le transfert d'un `ArrayBuffer` via la liste de transfert (Transfer List) détache la mémoire dans le thread émetteur et transfère le pointeur physique au worker en O(1) sans copie. Le thread principal reste fluide et disponible pour traiter les requêtes HTTP des autres clients.",
  },
  {
    id: 7,
    codeSnippet: `// Étape 6 : Cache-Aside avec Redis et hachage SHA-256
const cacheKey = 'cache:analysis:' + crypto.createHash('sha256').update(rawInput).digest('hex');

const cached = await redis.get(cacheKey);
if (cached) {
  res.setHeader('X-Cache-Status', 'HIT');
  return res.json(JSON.parse(cached));
}

// En cas de MISS :
const result = await generateAnalysis(rawInput);
await redis.set(cacheKey, JSON.stringify(result), 'EX', 7200); // TTL 2h
res.setHeader('X-Cache-Status', 'MISS');
res.json(result);`,
    question: "Quel impact l'ajout de l'en-tête `X-Cache-Status` (HIT ou MISS) apporte-t-il à l'observabilité et au diagnostic de l'application ?",
    options: [
      { letter: 'A', text: "Il oblige le client à payer en carte bancaire." },
      { letter: 'B', text: "Il désactive le cache du navigateur." },
      { letter: 'C', text: "Il permet aux équipes d'ingénierie et aux tests automatisés de vérifier immédiatement si une réponse a été servie par la mémoire vive (< 5 ms) ou a nécessité une inférence d'IA complète (> 2 s)." },
      { letter: 'D', text: "Il supprime la clé de la mémoire Redis." },
    ],
    correctAnswers: ['C'],
    explanation: "L'en-tête standard `X-Cache-Status` permet aux développeurs, outils de monitoring (Datadog/Grafana) et utilisateurs de mesurer la performance du cache et de valider que les requêtes redondantes ne consomment pas de crédits LLM.",
  },
  {
    id: 8,
    codeSnippet: `// Étape 7 : Script Lua atomique pour Rate Limiting par fenêtre glissante
const slidingWindowLua = \`
  local key = KEYS[1]
  local now = tonumber(ARGV[1])
  local window = tonumber(ARGV[2])
  local limit = tonumber(ARGV[3])
  local clearBefore = now - window

  redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)
  local currentRequests = redis.call('ZCARD', key)

  if currentRequests < limit then
    redis.call('ZADD', key, now, now .. '-' .. redis.call('INCR', 'rand_counter'))
    redis.call('EXPIRE', key, math.ceil(window / 1000))
    return {1, limit - currentRequests - 1}
  else
    return {0, 0}
  end
\`;`,
    question: "Pourquoi cette implémentation de Rate Limiter sous script Lua à l'Étape 7 est-elle supérieure à toute solution exécutée en JavaScript dans Node.js ?",
    options: [
      { letter: 'A', text: "Parce que Lua est un langage qui ne consomme aucun octet de RAM." },
      { letter: 'B', text: "Parce que Lua est exécuté par la carte graphique du client." },
      { letter: 'C', text: "Parce qu'elle empêche les requêtes provenant d'utilisateurs mobiles." },
      { letter: 'D', text: "Parce que l'évaluation se fait directement au cœur du serveur Redis de manière indivisible et atomique, éliminant les allers-retours réseau multiples et protégeant contre toute condition de concurrence dans une architecture distribuée multi-serveurs." },
    ],
    correctAnswers: ['D'],
    explanation: "Dans une architecture distribuée comportant 10 serveurs Node.js derrière un load balancer, un script Lua s'exécute de façon centralisée et atomique sur Redis. Le nettoyage des anciennes entrées, le décompte et l'insertion se font en une seule opération indivisible sans risque de dépassement concurrent.",
  },
  {
    id: 9,
    codeSnippet: `// Étape 8 : Composant React de consommation de flux
useEffect(() => {
  const controller = new AbortController();
  
  async function streamData() {
    const res = await fetch('/api/analysis/stream/' + id, { signal: controller.signal });
    const reader = res.body?.getReader();
    // Lecture des chunks
  }
  streamData();

  return () => {
    controller.abort(); // Nettoyage au démontage
  };
}, [id]);`,
    question: "Dans l'interface React développée à l'Étape 8, pourquoi la fonction de nettoyage du `useEffect` appelle-t-elle `controller.abort()` ?",
    options: [
      { letter: 'A', text: "Pour interrompre immédiatement la connexion réseau et stopper la consommation de flux si l'utilisateur change de page ou ferme le composant avant la fin du streaming, évitant les fuites mémoires et les mises à jour d'état sur un composant démonté." },
      { letter: 'B', text: "Pour supprimer l'application du navigateur." },
      { letter: 'C', text: "Pour recharger automatiquement la page d'accueil." },
      { letter: 'D', text: "Pour forcer le navigateur à imprimer le document." },
    ],
    correctAnswers: ['A'],
    explanation: "Si l'utilisateur navigue vers une autre page pendant que le streaming est actif, le composant est démonté. Appeler `abort()` coupe la socket réseau, déclenche l'événement `'close'` sur le serveur Node.js et empêche l'apparition d'erreurs 'Can't perform a React state update on an unmounted component'.",
  },
  {
    id: 10,
    codeSnippet: `app.get('/health/live', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.get('/health/ready', async (req, res) => {
  const isDbOk = await checkDbPoolHealth();
  const isRedisOk = await checkRedisHealth();
  
  if (isDbOk && isRedisOk) {
    res.status(200).json({ status: 'READY', db: 'UP', redis: 'UP' });
  } else {
    res.status(503).json({ status: 'DOWN', db: isDbOk ? 'UP' : 'DOWN', redis: isRedisOk ? 'UP' : 'DOWN' });
  }
});`,
    question: "Dans le bilan de production (Étape 8), comment un orchestrateur de conteneurs (Kubernetes / Docker Swarm) exploite-t-il la distinction entre la sonde `/health/live` et la sonde `/health/ready` ?",
    options: [
      { letter: 'A', text: "`live` sert à afficher la météo et `ready` à mesurer la vitesse du ventilateur." },
      { letter: 'B', text: "Si `/health/live` échoue, l'orchestrateur redémarre le conteneur Node.js (supposé figé) ; si `/health/ready` échoue, le conteneur reste en vie mais le répartiteur de charge cesse de lui envoyer du trafic utilisateur tant que les dépendances (MySQL/Redis) sont indisponibles." },
      { letter: 'C', text: "Les deux sondes provoquent obligatoirement la destruction de la base de données." },
      { letter: 'D', text: "Les sondes sont réservées aux ordinateurs Apple." },
    ],
    correctAnswers: ['B'],
    explanation: "La sonde de liveness vérifie si le processus Node.js est vivant ou en deadlock : en cas d'échec, le conteneur est redémarré. La sonde de readiness vérifie si les services externes sont opérationnels : en cas d'échec (ex: saturation temporaire de Redis), le trafic est détourné sans tuer le conteneur.",
  },
  {
    id: 11,
    question: "Dans l'architecture globale du projet de synthèse, quel composant assure le rôle de source de vérité unique pour la persistance relationnelle et la comptabilité des analyses ?",
    options: [
      { letter: 'A', text: "Le stockage local du navigateur (LocalStorage)." },
      { letter: 'B', text: "Le cache temporaire Redis." },
      { letter: 'C', text: "La base de données relationnelle MySQL (moteur InnoDB) gérée avec transactions ACID et index B+Tree." },
      { letter: 'D', text: "Le fichier de logs de la console du serveur." },
    ],
    correctAnswers: ['C'],
    explanation: "Redis n'est qu'un cache volatil et temporaire. La source de vérité pérenne de l'application est la base de données relationnelle MySQL (InnoDB), qui garantit la durabilité (WAL/Redo Log), l'intégrité référentielle et la cohérence financière/légale des audits.",
  },
  {
    id: 12,
    codeSnippet: `const startTime = process.hrtime.bigint();
// ... exécution du calcul ou de l'appel IA ...
const endTime = process.hrtime.bigint();
const durationMs = Number(endTime - startTime) / 1_000_000;`,
    question: "Pourquoi est-il fortement recommandé d'utiliser `process.hrtime.bigint()` plutôt que `Date.now()` pour chronométrer la latence précise d'une inférence ou d'un calcul d'IA en backend ?",
    options: [
      { letter: 'A', text: "Parce que `Date.now()` ne fonctionne pas sur les serveurs Linux." },
      { letter: 'B', text: "Parce que `process.hrtime` formate automatiquement les résultats en langue anglaise." },
      { letter: 'C', text: "Parce que `Date.now()` consomme 50% de la puissance du processeur." },
      { letter: 'D', text: "Parce que `Date.now()` repose sur l'horloge système du système d'exploitation sujette aux ajustements NTP (qui peuvent reculer ou sauter dans le temps), tandis que `process.hrtime.bigint()` mesure une horloge monotone matérielle de haute précision (en nanosecondes)." },
    ],
    correctAnswers: ['D'],
    explanation: "`process.hrtime.bigint()` utilise une horloge monotone qui ne dépend pas des ajustements de date de l'OS (synchronisation NTP, secondes intercalaires). Elle garantit une précision nanoseconde fiable et strictement croissante, essentielle pour les benchmarks professionnels.",
  },
  {
    id: 13,
    question: "Dans le cadre de l'Étape 6, comment l'application prévient-elle le risque de 'Cache Stampede' lorsqu'un rapport d'analyse très populaire est consulté par plusieurs dizaines d'utilisateurs au moment exact où son cache expire ?",
    options: [
      { letter: 'A', text: "En acquérant un verrou distribué atomique dans Redis (`SET lock:key token NX EX 10`) : seule la première requête est autorisée à régénérer l'analyse auprès de Gemini, tandis que les autres attendent quelques millisecondes pour lire le nouveau cache généré." },
      { letter: 'B', text: "En demandant aux utilisateurs de patienter 10 minutes." },
      { letter: 'C', text: "En augmentant la vitesse de connexion Wi-Fi." },
      { letter: 'D', text: "En créant 50 comptes Google Gemini différents." },
    ],
    correctAnswers: ['A'],
    explanation: "Le verrou distribué (Pattern Mutex avec Redis) assure le dédoublement de charge : une seule requête obtient le droit de payer le coût de l'appel LLM, protégeant l'API externe et la base de données d'une avalanche de requêtes identiques simultanées.",
  },
  {
    id: 14,
    codeSnippet: `// Configuration de gestion des erreurs globale
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err, url: req.url, method: req.method }, "Erreur non gérée");
  
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: "Validation échouée", details: err.errors });
  }
  
  res.status(500).json({ error: "Une erreur interne est survenue." });
});`,
    question: "Pourquoi est-il crucial de séparer le traitement des erreurs de validation (ZodError) des erreurs système génériques dans le middleware d'erreur Express ?",
    options: [
      { letter: 'A', text: "Pour accélérer le rendu des polices de caractères." },
      { letter: 'B', text: "Pour que le client reçoive un code HTTP 400 clair avec le détail précis des champs non conformes, tout en masquant les détails techniques internes des erreurs 500 pour des raisons évidentes de sécurité." },
      { letter: 'C', text: "Parce que le compilateur TypeScript refuse de compiler sans distinction." },
      { letter: 'D', text: "Pour forcer le client à utiliser Google Chrome." },
    ],
    correctAnswers: ['B'],
    explanation: "Les erreurs 400 (Bad Request) aident le client à corriger ses données d'entrée mal formées. Les erreurs 500 (Internal Server Error) doivent masquer la stacktrace et les requêtes internes pour éviter la divulgation d'informations (OWASP Information Leakage).",
  },
  {
    id: 15,
    codeSnippet: `FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
    question: "Quels sont les avantages clés de cette stratégie de compilation Docker multi-stage dans le déploiement de production du projet de synthèse ?",
    options: [
      { letter: 'A', text: "Elle permet au conteneur de fonctionner sans électricité." },
      { letter: 'B', text: "Elle installe automatiquement une suite bureautique dans le conteneur." },
      { letter: 'C', text: "Elle optimise la mise en cache des couches lors des builds successifs, réduit drastiquement la taille de l'image finale et exclut le code source brut et les outils de développement (TypeScript, linters) pour une surface d'attaque minimale." },
      { letter: 'D', text: "Elle double le nombre de cœurs physiques du processeur." },
    ],
    correctAnswers: ['C'],
    explanation: "Le build multi-stage Docker sépare l'environnement de build (lourd, avec compilateurs et dépendances de dev) de l'environnement d'exécution (ultra-léger, contenant uniquement le JavaScript compilé et les modules de production), améliorant la sécurité et la vitesse de déploiement.",
  },
  {
    id: 16,
    question: "Dans le cadre de l'Étape 7, quelle politique d'encadrement des quotas permet de concilier la protection contre les attaques par force brute (DDoS) et l'expérience utilisateur légitime ?",
    options: [
      { letter: 'A', text: "Bloquer tous les utilisateurs après 3 clics." },
      { letter: 'B', text: "Demander aux utilisateurs de saisir un CAPTCHA toutes les 30 secondes." },
      { letter: 'C', text: "Désactiver l'accès à l'API pendant la nuit." },
      { letter: 'D', text: "Une politique de Rate Limiting à double niveau : un plafond global par IP pour bloquer les scans agressifs d'adresses inconnues, et un plafond granulaire par clé d'API/utilisateur authentifié pour réguler la consommation réelle de l'IA." },
    ],
    correctAnswers: ['D'],
    explanation: "Une défense en profondeur combine un rate limiting périphérique (sur l'IP ou le réseau) pour filtrer les attaques volumétriques brutes et un rate limiting applicatif précis (lié à l'identité ou au forfait) pour réguler équitablement l'accès aux ressources génératives coûteuses.",
  },
  {
    id: 17,
    codeSnippet: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      - DB_HOST=mysql
      - REDIS_URL=redis://redis:6379`,
    question: "Pourquoi l'utilisation de noms de services DNS internes (`mysql`, `redis`) dans `docker-compose.yml` est-elle la bonne pratique plutôt que de hardcoder des adresses IP comme `172.18.0.2` ?",
    options: [
      { letter: 'A', text: "Parce que Docker intègre un résolveur DNS interne qui fait correspondre automatiquement le nom du service à l'adresse IP dynamique du conteneur au sein du réseau bridge privé." },
      { letter: 'B', text: "Parce que les adresses IP sont payantes dans Docker." },
      { letter: 'C', text: "Parce que Docker ne supporte pas le protocole IPv4." },
      { letter: 'D', text: "Pour des raisons purement esthétiques sans impact technique." },
    ],
    correctAnswers: ['A'],
    explanation: "Dans un réseau Docker bridge, les adresses IP des conteneurs changent à chaque redémarrage. Le serveur DNS embarqué de Docker résout de manière dynamique les noms de services (`mysql`, `redis`), garantissant une communication robuste et découplée.",
  },
  {
    id: 18,
    codeSnippet: `// Arrêt gracieux (Graceful Shutdown)
process.on('SIGTERM', async () => {
  logger.info("Signal SIGTERM reçu. Fermeture ordonnée...");
  server.close(async () => {
    logger.info("Serveur HTTP fermé.");
    await dbPool.end();
    await redis.quit();
    logger.info("Connexions DB et Redis closes proprement.");
    process.exit(0);
  });
});`,
    question: "Quel incident en production ce bloc d'arrêt gracieux (Graceful Shutdown) évite-t-il lors du déploiement d'une nouvelle version de conteneur ?",
    options: [
      { letter: 'A', text: "La suppression involontaire du dépôt Git." },
      { letter: 'B', text: "La rupture abrupte des connexions streaming SSE en cours (qui générerait des erreurs 502 Bad Gateway chez les utilisateurs) et la fermeture brutale de transactions SQL à moitié exécutées." },
      { letter: 'C', text: "Le gel de la souris du développeur." },
      { letter: 'D', text: "La réinitialisation des mots de passe administrateurs." },
    ],
    correctAnswers: ['B'],
    explanation: "Lors d'une mise à jour (rolling update), Docker envoie un signal `SIGTERM`. L'arrêt gracieux cesse d'accepter de nouvelles requêtes, laisse les flux en cours se terminer proprement et ferme les pools de connexions avant de clore le processus, garantissant un déploiement avec zéro coupure (Zero-Downtime).",
  },
  {
    id: 19,
    question: "Dans le cadre du RGPD et de la gestion des données sensibles, quelle précaution architecturale majeure le projet de synthèse applique-t-il avant d'envoyer des documents clients au modèle d'IA Google Gemini ?",
    options: [
      { letter: 'A', text: "Demander au client d'imprimer le document sur papier." },
      { letter: 'B', text: "Traduire tous les documents en langue espéranto." },
      { letter: 'C', text: "Une étape d'assainissement et d'anonymisation des données personnelles (PII Masking) pour masquer les numéros de cartes bancaires, téléphones ou numéros de sécurité sociale avant toute transmission au cloud public." },
      { letter: 'D', text: "Sauvegarder les documents sur une disquette 3.5 pouces." },
    ],
    correctAnswers: ['C'],
    explanation: "L'anonymisation des données personnelles (Personally Identifiable Information - PII) avant l'appel à une API tierce en cloud public protège la vie privée des utilisateurs et respecte les obligations légales strictes du RGPD et des normes de sécurité bancaire/médicale.",
  },
  {
    id: 20,
    codeSnippet: `// Injection de métadonnées de traçage distribué
import { v4 as uuidv4 } from 'uuid';

app.use((req, res, next) => {
  const correlationId = (req.headers['x-correlation-id'] as string) || uuidv4();
  req.correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);
  next();
});`,
    question: "Pourquoi l'attribution d'un `correlationId` unique dès l'entrée de chaque requête est-elle indispensable pour l'observabilité d'un backend d'IA ?",
    options: [
      { letter: 'A', text: "Pour débloquer les fonctionnalités payantes du navigateur." },
      { letter: 'B', text: "Pour crypter l'adresse IP du client en SHA-256." },
      { letter: 'C', text: "Pour forcer l'ordinateur à se connecter en Wi-Fi 6." },
      { letter: 'D', text: "Pour corréler l'ensemble des événements et logs dispersés à travers les différents services (Frontend, Express, Worker Threads, Redis, MySQL, Gemini) liés à une même action utilisateur lors de l'investigation d'un incident." },
    ],
    correctAnswers: ['D'],
    explanation: "Dans un système distribué, une seule action utilisateur déclenche des dizaines d'appels et d'entrées de logs. Le Correlation ID permet d'interroger un collecteur de logs (Loki, Elasticsearch, Datadog) et de filtrer chronologiquement toute la chaîne causale d'un bug.",
  },
  {
    id: 21,
    question: "Dans l'Étape 2, que se produirait-il si le backend omettait d'utiliser des transactions SQL lors de la création d'un audit comportant l'insertion du rapport principal ET de ses 10 recommandations associées ?",
    options: [
      { letter: 'A', text: "Si une erreur survient à la 5ème recommandation, la base se retrouverait dans un état incohérent à moitié écrit avec un rapport tronqué, alors qu'une transaction garantit l'atomicité (tout est écrit ou tout est annulé via `ROLLBACK`)." },
      { letter: 'B', text: "Le compilateur TypeScript s'arrêterait." },
      { letter: 'C', text: "Le disque dur physique serait effacé." },
      { letter: 'D', text: "Toutes les connexions Wi-Fi seraient coupées." },
    ],
    correctAnswers: ['A'],
    explanation: "L'atomicité (le 'A' d'ACID) stipule qu'une opération logique complexe doit s'exécuter en 'tout ou rien'. Sans transaction, une panne réseau ou une contrainte violée laisse des données partielles corrompues sans possibilité de retour en arrière automatique.",
  },
  {
    id: 22,
    codeSnippet: `import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.groq.com", "https://generativelanguage.googleapis.com"]
    }
  }
}));`,
    question: "Quel vecteur d'attaque Web le middleware `helmet` et sa politique Content Security Policy (CSP) permettent-ils de contrer en priorité ?",
    options: [
      { letter: 'A', text: "Les attaques par force brute sur les mots de passe SSH." },
      { letter: 'B', text: "Les attaques de type Cross-Site Scripting (XSS) et l'exfiltration illicite de données vers des domaines tiers non approuvés par des scripts malveillants injectés." },
      { letter: 'C', text: "Les surchauffes de cartes graphiques." },
      { letter: 'D', text: "Les pannes de disques durs de sauvegarde." },
    ],
    correctAnswers: ['B'],
    explanation: "La directive Content Security Policy (CSP) restreint les origines autorisées à exécuter des scripts ou à envoyer des requêtes réseau (`connectSrc`). Si un attaquant parvient à injecter un script, ce dernier ne pourra pas communiquer avec son serveur pirate car le domaine n'est pas whitelisté.",
  },
  {
    id: 23,
    question: "À l'Étape 8, comment le frontend React protège-t-il l'application contre l'exécution de code malveillant lors du rendu en direct des fragments Markdown reçus en streaming ?",
    options: [
      { letter: 'A', text: "En interdisant l'affichage des lettres majuscules." },
      { letter: 'B', text: "En convertissant le texte en format PDF avant affichage." },
      { letter: 'C', text: "En combinant un analyseur Markdown avec un plugin de désinfection syntaxique strict (`rehype-sanitize`) qui neutralise les balises `<script>`, `<iframe>` et les gestionnaires d'événements JavaScript (`onclick`, `onerror`)." },
      { letter: 'D', text: "En demandant une validation manuelle par mot de passe à chaque mot." },
    ],
    correctAnswers: ['C'],
    explanation: "Le rendu brut de HTML non nettoyé via `dangerouslySetInnerHTML` expose au XSS. L'utilisation de `rehype-sanitize` inspecte l'arbre syntaxique (HAST) et purge automatiquement tous les éléments ou attributs dangereux générés par l'IA ou injectés par un tiers.",
  },
  {
    id: 24,
    codeSnippet: `// Vérification de compatibilité de pool MySQL
const [rows] = await dbPool.query('SELECT 1');`,
    question: "Pourquoi est-il préférable d'exécuter `SELECT 1` lors de la vérification de santé d'un pool MySQL plutôt que d'interroger une table métier complexe ?",
    options: [
      { letter: 'A', text: "Parce que MySQL ne comprend que les nombres entre 1 et 10." },
      { letter: 'B', text: "Parce que les chiffres impairs sont interdits dans les tables métier." },
      { letter: 'C', text: "Parce que `SELECT 1` supprime les tables temporaires." },
      { letter: 'D', text: "Parce que `SELECT 1` valide immédiatement la réactivité de la socket TCP, l'authentification et l'état de l'Event Loop du moteur SQL avec un coût de calcul négligeable sans mobiliser de verrous ni d'I/O disques." },
    ],
    correctAnswers: ['D'],
    explanation: "`SELECT 1` est la sonde de ping SQL canonique : elle traverse toute la pile réseau et le parseur de la base sans toucher au sous-système de stockage, garantissant une vérification de connectivité instantanée sans impact sur la performance.",
  },
  {
    id: 25,
    question: "Dans le dimensionnement des performances de l'Étape 6, quelle métrique permet de s'assurer que la taille allouée à Redis (`maxmemory`) est suffisante pour supporter la charge de production ?",
    options: [
      { letter: 'A', text: "Le taux d'éviction de clés (`evicted_keys` > 0 dans `INFO stats`) qui signale que Redis est contraint de détruire des données chaudes prématurément par manque de mémoire vive." },
      { letter: 'B', text: "Le nombre de câbles réseau branchés au serveur." },
      { letter: 'C', text: "La température ambiante du bureau des développeurs." },
      { letter: 'D', text: "Le nombre d'étoiles sur le dépôt GitHub du projet." },
    ],
    correctAnswers: ['A'],
    explanation: "Si la métrique `evicted_keys` augmente continuellement, cela prouve que le cache sature sa RAM et doit expulser des clés utiles avant leur terme normal, dégradant le Cache Hit Ratio. Il faut alors augmenter `maxmemory` ou revoir la politique de TTL.",
  },
  {
    id: 26,
    codeSnippet: `// Étape 5 : Gestion du Worker Thread de calculs vectoriels
worker.on('exit', (code) => {
  if (code !== 0) {
    logger.error(\`Worker arrêté anormalement avec le code \${code}\`);
    // Recréation d'un nouveau worker pour maintenir le pool complet
    replaceDeadWorkerInPool();
  }
});`,
    question: "Pourquoi le remplacement immédiat d'un worker ayant crashé (`replaceDeadWorkerInPool()`) est-il une obligation de résilience dans un Worker Pool ?",
    options: [
      { letter: 'A', text: "Pour changer le mot de passe de l'utilisateur." },
      { letter: 'B', text: "Pour éviter que la capacité de calcul parallèle du serveur ne se dégrade progressivement jusqu'à ce que tous les workers meurent et que l'API ne puisse plus traiter aucun calcul intensif." },
      { letter: 'C', text: "Pour forcer le redémarrage physique de la machine." },
      { letter: 'D', text: "Parce que Node.js interdit de laisser un thread vide." },
    ],
    correctAnswers: ['B'],
    explanation: "Un Worker Thread peut être victime d'un Out Of Memory ou d'une erreur fatale C++. Si le pool ne remplace pas le thread décédé, le nombre de workers disponibles diminue jusqu'à la paralysie totale de la file de traitement de calculs.",
  },
  {
    id: 27,
    question: "Dans le cadre de l'Étape 3, que se passe-t-il si le modèle Gemini renvoie une chaîne JSON valide mais dont un champ obligatoire viole la contrainte numérique déclarée dans Zod (ex: `riskScore: 150` alors que le max est 100) ?",
    options: [
      { letter: 'A', text: "Le serveur Express accepte la valeur et l'arrondit à 100." },
      { letter: 'B', text: "La base de données supprime la table entière." },
      { letter: 'C', text: "L'instruction `AnalysisOutputSchema.parse(data)` lève immédiatement une exception `ZodError`, empêchant l'insertion de données invalides en base et permettant au contrôleur de déclencher une stratégie de repli ou de correction." },
      { letter: 'D', text: "Le modèle d'IA est désinstallé de Google Cloud." },
    ],
    correctAnswers: ['C'],
    explanation: "Zod applique une validation stricte à l'exécution (Runtime Validation). Même si le modèle a produit du JSON syntaxiquement correct, si les règles sémantiques ou bornes métiers sont violées, Zod intercepte l'anomalie avant toute propagation en base de données.",
  },
  {
    id: 28,
    codeSnippet: `// Configuration de limitation des requêtes HTTP concurrentes
import pLimit from 'p-limit';
const limit = pLimit(5); // Maximum 5 inférences simultanées vers Gemini

export function scheduleAiInference(prompt: string) {
  return limit(() => callGeminiApi(prompt));
}`,
    question: "Quel problème de saturation cette limitation de concurrence à l'aide de `p-limit` résout-elle en amont de l'API externe de Google Gemini ?",
    options: [
      { letter: 'A', text: "La saturation de la mémoire vidéo du client." },
      { letter: 'B', text: "Elle force l'IA à répondre en rimes poétiques." },
      { letter: 'C', text: "Elle supprime les dépendances NPM inutiles." },
      { letter: 'D', text: "Elle empêche l'application de déclencher des erreurs HTTP 429 (Too Many Requests / Quota TPM/RPM dépassé) causées par l'envoi simultané de dizaines de requêtes parallèles massives vers le fournisseur d'IA." },
    ],
    correctAnswers: ['D'],
    explanation: "Les API des fournisseurs d'IA appliquent des limites strictes de requêtes par minute (RPM) et tokens par minute (TPM). Réguler la concurrence avec `p-limit` lisse les débits et prévient les rejets brutaux 429 sous forte charge instantanée.",
  },
  {
    id: 29,
    question: "Dans le bilan de performance (Étape 8), quel est le bénéfice de combiner le Caching Redis avec le Streaming SSE pour les utilisateurs accédant à un rapport d'analyse déjà généré auparavant ?",
    options: [
      { letter: 'A', text: "Le rapport est lu depuis la RAM Redis en moins de 2 millisecondes et diffusé instantanément sans aucun coût de token IA, offrant une expérience quasi instantanée à l'utilisateur." },
      { letter: 'B', text: "Le rapport s'affiche en noir et blanc pour économiser l'encre." },
      { letter: 'C', text: "L'ordinateur de l'utilisateur consomme plus d'électricité." },
      { letter: 'D', text: "Le texte est automatiquement traduit en latin." },
    ],
    correctAnswers: ['A'],
    explanation: "L'alliance du Cache-Aside et du streaming offre le meilleur des deux mondes : une première génération interactive token par token, et des relectures ultérieures instantanées (Cache Hit) à coût zéro et latence sub-milliseconde.",
  },
  {
    id: 30,
    codeSnippet: `// Gestion de déconnexion client en cours de streaming
req.on('close', () => {
  if (!res.writableEnded) {
    logger.warn({ id: req.params.id }, "Connexion client interrompue par l'utilisateur.");
    abortController.abort();
  }
});`,
    question: "Pourquoi est-il capital de vérifier `!res.writableEnded` lors de la capture de l'événement `'close'` sur l'objet requête `req` ?",
    options: [
      { letter: 'A', text: "Pour supprimer les cookies de session." },
      { letter: 'B', text: "Pour éviter d'annuler une opération qui s'est en réalité terminée avec succès juste avant la fermeture normale de la connexion." },
      { letter: 'C', text: "Parce que Node.js plante si on ne vérifie pas cette propriété." },
      { letter: 'D', text: "Pour obliger l'utilisateur à se reconnecter." },
    ],
    correctAnswers: ['B'],
    explanation: "L'événement `'close'` est toujours émis à la fin de la connexion HTTP, y compris lors d'une terminaison normale. Vérifier `!res.writableEnded` permet de distinguer une véritable interruption prématurée (annulation utilisateur) d'une clôture standard et réussie du flux.",
  },
  {
    id: 31,
    question: "Dans le cadre de l'ingénierie de données du projet, pourquoi la base de données MySQL est-elle configurée impérativement avec le jeu de caractères `utf8mb4` et la collation `utf8mb4_unicode_ci` ?",
    options: [
      { letter: 'A', text: "Parce que les lettres de l'alphabet français nécessitent 8 octets chacune." },
      { letter: 'B', text: "Parce que `utf8mb4` double la vitesse de calcul des processeurs Intel." },
      { letter: 'C', text: "Parce que `utf8` standard dans MySQL ne supporte que 3 octets par caractère et plante ou tronque les données dès qu'un texte généré par l'IA contient des émojis modernes ou certains symboles multilingues complexes à 4 octets." },
      { letter: 'D', text: "Pour empêcher les utilisateurs d'utiliser des espaces dans leurs prompts." },
    ],
    correctAnswers: ['C'],
    explanation: "L'historique `utf8` de MySQL n'encode que sur 3 octets maximum. Les modèles d'IA utilisent abondamment des émojis et caractères Unicode modernes (4 octets). Seul `utf8mb4` garantit un encodage complet sans risque de crash d'insertion SQL ou de corruption silencieuse.",
  },
  {
    id: 32,
    codeSnippet: `// Test d'intégration automatisé avec Vitest et Supertest
import request from 'supertest';
import app from '../src/app';

describe('POST /api/analysis', () => {
  it('doit renvoyer 429 si le quota de requêtes est dépassé', async () => {
    // Envoi de 10 requêtes rapides
    for (let i = 0; i < 10; i++) {
      await request(app).post('/api/analysis').send({ prompt: 'Test' });
    }
    const res = await request(app).post('/api/analysis').send({ prompt: 'Test' });
    expect(res.status).toBe(429);
    expect(res.headers).toHaveProperty('retry-after');
  });
});`,
    question: "Dans le cadre de la politique de tests de l'Étape 8, que permet de valider ce test d'intégration automatisé ?",
    options: [
      { letter: 'A', text: "Que le serveur physique ne surchauffe pas." },
      { letter: 'B', text: "Que le navigateur client est à jour." },
      { letter: 'C', text: "Que l'application est conforme aux lois sur les droits d'auteur." },
      { letter: 'D', text: "Que la chaîne complète des middlewares Express, l'intégration Redis et l'algorithme de Rate Limiting réagissent conformément aux spécifications en bloquant les abus et en renvoyant le code 429 avec l'en-tête `Retry-After`." },
    ],
    correctAnswers: ['D'],
    explanation: "Les tests d'intégration avec Supertest simulent de véritables requêtes HTTP traversant toute l'infrastructure (Express, middlewares, Redis). Ils garantissent que les garde-fous de limitation de débit sont effectifs et respectent les standards RFC en cas de rafale.",
  },
  {
    id: 33,
    question: "Quelle stratégie de sécurité le projet de synthèse applique-t-il pour empêcher les attaques par injection indirecte de prompt lors de l'analyse de documents externes non fiables ?",
    options: [
      { letter: 'A', text: "L'isolation du contenu non fiable au sein de balises délimitatrices XML explicites (`<document_a_analyser>`) associée à des consignes système strictes interdisant l'exécution de toute instruction textuelle contenue à l'intérieur de ces balises." },
      { letter: 'B', text: "Demander au modèle d'ignorer tous les mots contenant la lettre 'E'." },
      { letter: 'C', text: "La suppression de toutes les voyelles du document avant l'envoi." },
      { letter: 'D', text: "L'interdiction d'analyser des documents de plus de 10 mots." },
    ],
    correctAnswers: ['A'],
    explanation: "L'encapsulation dans des délimiteurs stricts (balises XML) sépare hermétiquement la métacouche d'instruction système des données passives à analyser, réduisant drastiquement le risque que le LLM ne confonde un texte externe malveillant avec un ordre de commande.",
  },
  {
    id: 34,
    codeSnippet: `// Configuration de pool de connexions MySQL résilient
export const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 20,
  maxIdle: 10,
  idleTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});`,
    question: "À quoi sert la directive `enableKeepAlive: true` dans la configuration du pool `mysql2/promise` ?",
    options: [
      { letter: 'A', text: "Elle permet à la base de données de tourner sans alimentation électrique." },
      { letter: 'B', text: "Elle empêche les proxys cloud ou pare-feux réseau de fermer silencieusement les connexions TCP inactives du pool après quelques minutes d'inactivité, évitant les erreurs inattendues 'ECONNRESET' lors de la réutilisation de connexions." },
      { letter: 'C', text: "Elle force MySQL à sauvegarder les données sur disquette." },
      { letter: 'D', text: "Elle supprime les transactions qui durent plus de 1 seconde." },
    ],
    correctAnswers: ['B'],
    explanation: "Les routeurs et firewalls cloud coupent souvent les sockets TCP silencieuses. L'option `enableKeepAlive: true` envoie régulièrement des paquets TCP Keep-Alive pour maintenir les sockets ouvertes et prévenir les erreurs d'exécution 'Connection lost / ECONNRESET'.",
  },
  {
    id: 35,
    question: "Dans le cadre de l'optimisation des coûts FinOps à l'Étape 3, quelle pratique de conception de prompt permet de réduire au strict minimum le nombre de tokens de complétion facturés par Gemini ?",
    options: [
      { letter: 'A', text: "Demander au modèle de répondre sous forme de roman de 500 pages." },
      { letter: 'B', text: "Envoyer les requêtes en lettres minuscules uniquement." },
      { letter: 'C', text: "Définir des schémas de sortie concis avec des clés courtes, instruire le modèle d'éviter tout bavardage ou formule de politesse introductive, et utiliser des types énumérés stricts pour les classifications." },
      { letter: 'D', text: "Remplacer le prompt par une image blanche." },
    ],
    correctAnswers: ['C'],
    explanation: "Les tokens de sortie (Output Tokens) sont généralement 3 à 4 fois plus coûteux que les tokens d'entrée. Exiger une structure JSON compacte, sans préambule ni verbiage inutile (« Voici votre réponse : »), réduit considérablement la facture mensuelle d'API.",
  },
  {
    id: 36,
    codeSnippet: `// Configuration de journalisation structurée avec Pino
import pino from 'pino';

export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  formatters: {
    level: (label) => ({ severity: label.toUpperCase() })
  },
  base: { service: 'backend-ia-core', env: env.NODE_ENV }
});`,
    question: "Pourquoi la journalisation au format JSON structuré avec `pino` est-elle préférable à `console.log` standard dans le projet de synthèse déployé sur le Cloud ?",
    options: [
      { letter: 'A', text: "Parce que `console.log` est interdit par la loi." },
      { letter: 'B', text: "Parce que Pino compresse les disques durs en temps réel." },
      { letter: 'C', text: "Parce que le format JSON empêche les hackers de lire les journaux." },
      { letter: 'D', text: "Parce que Pino écrit de manière non bloquante à très haute performance, et que les journaux JSON sont instantanément analysés et filtrés par des collecteurs de logs cloud (Datadog, Google Cloud Logging, Grafana Loki) sans nécessiter de regex complexes." },
    ],
    correctAnswers: ['D'],
    explanation: "`console.log` standard sous Node.js est synchrone lorsqu'il écrit vers un fichier ou une redirection, dégradant le débit de l'Event Loop sous forte charge. Pino offre un débit de logs asynchrone ultra-rapide et un format structuré standardisé nativement exploitable par les plateformes de monitoring.",
  },
  {
    id: 37,
    question: "Dans le cadre du bilan de production de l'Étape 8, qu'est-ce qu'une stratégie de déploiement 'Blue/Green' (Bleu/Vert) pour notre conteneur backend d'IA ?",
    options: [
      { letter: 'A', text: "Le maintien de deux environnements de production identiques : la nouvelle version est déployée et testée sur l'environnement inactif (Green) avant que le répartiteur de charge ne bascule instantanément tout le trafic de Blue vers Green sans aucune interruption de service." },
      { letter: 'B', text: "Une alternance de couleurs d'arrière-plan sur l'interface React." },
      { letter: 'C', text: "Une technique pour économiser la consommation d'énergie des écrans." },
      { letter: 'D', text: "L'obligation d'avoir deux équipes de développeurs concurrentes." },
    ],
    correctAnswers: ['A'],
    explanation: "Le déploiement Blue/Green garantit une disponibilité maximale : si le moindre bug critique est détecté sur l'environnement Green nouvellement mis en ligne, le routeur réoriente instantanément le trafic vers l'ancien environnement Blue sans downtime pour les utilisateurs.",
  },
  {
    id: 38,
    codeSnippet: `// Benchmark de latence d'affichage (TTFT)
const ttft = firstTokenTimestamp - requestStartTimestamp;
logger.info({ ttftMs: ttft }, "Temps jusqu'au premier token");`,
    question: "Pourquoi le TTFT (Time To First Token) est-il la métrique reine d'expérience utilisateur dans les interfaces de streaming d'IA développées dans le projet ?",
    options: [
      { letter: 'A', text: "Parce qu'il permet de calculer le salaire des développeurs." },
      { letter: 'B', text: "Parce qu'il détermine la réactivité perçue : même si la réponse totale prend 10 secondes à se terminer, un TTFT inférieur à 500 ms donne à l'utilisateur la sensation d'une application instantanée et vivante." },
      { letter: 'C', text: "Parce que le W3C exige un TTFT de 0 milliseconde." },
      { letter: 'D', text: "Parce que les serveurs cloud refusent les connexions qui durent plus de 1 seconde." },
    ],
    correctAnswers: ['B'],
    explanation: "En psychologie cognitive et UX, la réactivité perçue prime sur le temps total de complétion. Un utilisateur qui voit le texte commencer à s'écrire immédiatement ne ressent pas d'attente frustrante, transformant la qualité de service perçue de la plateforme.",
  },
  {
    id: 39,
    question: "Dans l'Étape 2, pourquoi est-il crucial de stocker les timestamps en UTC standardisé (`TIMESTAMP` ou `DATETIME` en UTC) dans la base de données MySQL plutôt que dans le fuseau horaire local du serveur ?",
    options: [
      { letter: 'A', text: "Parce que les fuseaux horaires augmentent la taille des fichiers sur disque de 500%." },
      { letter: 'B', text: "Parce que MySQL ne connaît pas les fuseaux horaires européens." },
      { letter: 'C', text: "Pour éviter les incohérences de dates et de tri lors des passages à l'heure d'été/hiver et garantir une cohérence temporelle absolue si l'application ou les bases sont réparties sur plusieurs régions du monde." },
      { letter: 'D', text: "Pour empêcher les clients de voir l'heure de publication." },
    ],
    correctAnswers: ['C'],
    explanation: "Stocker en UTC universel élimine les bugs critiques liés aux changements d'heure (heures qui reculent d'une heure en automne) et simplifie l'agrégation de métriques mondiales. L'affichage dans le fuseau horaire local de l'utilisateur est délégué au client frontend.",
  },
  {
    id: 40,
    codeSnippet: `// Synthèse finale : Pipeline complet d'une requête d'audit
export async function handleAuditRequest(req: Request, res: Response) {
  // 1. Validation Zod des entrées
  const input = AuditInputSchema.parse(req.body);
  
  // 2. Vérification du Rate Limiting atomique sous Lua
  await enforceRateLimit(req.user.id);
  
  // 3. Consultation du Cache-Aside Redis
  const cached = await getCachedAudit(input);
  if (cached) return res.json(cached);
  
  // 4. Inférence Gemini avec structured output & Streaming SSE
  const stream = await aiService.generateStream(input);
  
  // 5. Délestage vectoriel dans Worker Thread & Persistance MySQL
  await persistAndIndex(stream);
}`,
    question: "Quel principe architectural moderne cette synthèse des 8 étapes du projet incarne-t-elle pour une plateforme d'IA en production ?",
    options: [
      { letter: 'A', text: "Une architecture monolithique non testée codée dans un seul fichier." },
      { letter: 'B', text: "Un simple script expérimental sans garanties industrielles." },
      { letter: 'C', text: "Une application destinée uniquement aux calculs hors-ligne sur carte SD." },
      { letter: 'D', text: "Une architecture backend haute performance en couches, résiliente, sécurisée par défaut, économe en coûts (FinOps via caching), non bloquante (Worker Threads) et réactive en temps réel (SSE)." },
    ],
    correctAnswers: ['D'],
    explanation: "Cette synthèse rassemble l'ensemble des piliers de l'ingénierie backend pour l'IA moderne : validation stricte, protection par rate limiting distribué, optimisation des coûts par cache Redis, parallélisme CPU sans blocage de l'Event Loop et streaming temps réel pour une expérience utilisateur d'excellence.",
  },
];
