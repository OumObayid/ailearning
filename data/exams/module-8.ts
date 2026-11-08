import { ExamMetadata, ExamQuestion } from './types';

export const MODULE_8_EXAM_METADATA: ExamMetadata = {
  moduleId: 'module-8',
  title: "Examen Officiel de Certification — Module 8 : Projet Professionnel de Synthèse & Déploiement Cloud",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (32/40)
  totalQuestions: 40,
};

export const MODULE_8_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "Dans une architecture microservices d'entreprise dédiée à l'IA générative, quel composant doit impérativement orchestrer l'authentification et limiter l'accès aux modèles de fondation ?",
    options: [
      { letter: 'A', text: "Une passerelle d'API backend (API Gateway Express / Fastify / Nginx) sécurisée." },
      { letter: 'B', text: "Le composant React situé dans le navigateur du client." },
      { letter: 'C', text: "L'instance Qdrant directement exposée sur Internet sur le port 6333." },
      { letter: 'D', text: "Le fichier de configuration Tailwind CSS." },
    ],
    correctAnswers: ['A'],
    explanation: "Une API Gateway centralise la terminaison TLS, l'authentification JWT, le contrôle d'accès basé sur les rôles (RBAC), la limitation de débit (rate limiting) et le traçage avant de relayer les flux vers les modèles ou les bases de données privées.",
  },
  {
    id: 2,
    codeSnippet: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
    question: "Pourquoi l'utilisation d'un Dockerfile multi-stage (`builder` puis `runner`) avec un utilisateur non-root (`USER appuser`) est-elle une bonne pratique critique en production ?",
    options: [
      { letter: 'A', text: "Elle permet d'exécuter le conteneur directement dans le BIOS de la machine hôte." },
      { letter: 'B', text: "Elle réduit drastiquement la taille de l'image finale et prévient l'escalade de privilèges sur le serveur hôte en cas de compromission du conteneur." },
      { letter: 'C', text: "Elle permet au conteneur de bypasser les règles de pare-feu de l'infrastructure." },
      { letter: 'D', text: "Elle force l'interpréteur Node.js à utiliser des threads graphiques GPU." },
    ],
    correctAnswers: ['B'],
    explanation: "Le build multi-stage exclut les outils de compilation et fichiers sources non nécessaires à l'exécution (surface d'attaque minimale), tandis que l'exécution sous un utilisateur non-root empêche un attaquant d'obtenir les privilèges root sur la machine hôte.",
  },
  {
    id: 3,
    codeSnippet: `version: '3.8'
services:
  qdrant:
    image: qdrant/qdrant:v1.11.0
    restart: always
    ports:
      - "6333:6333"
    volumes:
      - qdrant_storage:/qdrant/storage
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:6333/healthz"]
      interval: 10s
      timeout: 5s
      retries: 3

  backend:
    build: ./backend
    depends_on:
      qdrant:
        condition: service_healthy
    environment:
      - QDRANT_URL=http://qdrant:6333`,
    question: "Quelle garantie technique la directive `condition: service_healthy` apporte-t-elle au démarrage du service backend dans ce fichier docker-compose ?",
    options: [
      { letter: 'A', text: "Le backend redémarre automatiquement toutes les 10 secondes." },
      { letter: 'B', text: "Le backend télécharge automatiquement les nouveaux modèles Gemini." },
      { letter: 'C', text: "Le conteneur backend attend que l'endpoint `/healthz` de Qdrant réponde avec succès avant de s'initialiser." },
      { letter: 'D', text: "Qdrant alloue l'intégralité de la RAM disponible au backend." },
    ],
    correctAnswers: ['C'],
    explanation: "Sans healthcheck, `depends_on` se contente de démarrer le conteneur sans attendre que le processus interne soit prêt à accepter des connexions. `condition: service_healthy` garantit que le serveur vectoriel répond effectivement avant que le backend ne démarre.",
  },
  {
    id: 4,
    question: "Pour diffuser les réponses d'un LLM générées mot par mot vers une application React, pourquoi Server-Sent Events (SSE) est-il généralement préféré à WebSocket ?",
    options: [
      { letter: 'A', text: "Parce que WebSocket ne supporte pas le format texte UTF-8." },
      { letter: 'B', text: "Parce que React interdit formellement l'utilisation des WebSockets." },
      { letter: 'C', text: "Parce que SSE chiffre automatiquement les données avec du RSA 4096 bits sans certificat SSL." },
      { letter: 'D', text: "Parce que SSE fonctionne sur du simple HTTP standard unidirectionnel (serveur vers client), gère la reconnexion native et traverse facilement les proxies et pare-feu sans handshake spécial." },
    ],
    correctAnswers: ['D'],
    explanation: "La génération de texte IA est un flux unidirectionnel du serveur vers le client. SSE repose sur le protocole HTTP conventionnel (`text/event-stream`), bénéficie de la reconnexion automatique du navigateur et ne nécessite pas la complexité d'infrastructure d'un serveur WebSocket bidirectionnel.",
  },
  {
    id: 5,
    codeSnippet: `app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Envoi d'un événement au format SSE
  res.write(\`data: \${JSON.stringify({ chunk: "Bonjour" })}\\n\\n\`);
});`,
    question: "Pourquoi les deux sauts de ligne consécutifs (`\\n\\n`) à la fin du message `data:` sont-ils obligatoires selon la spécification W3C du protocole SSE ?",
    options: [
      { letter: 'A', text: "Ils servent à compresser la mémoire tampon du routeur réseau." },
      { letter: 'B', text: "Ils signalent au client EventSource la fin d'un bloc d'événement complet prêt à être délivré." },
      { letter: 'C', text: "Ils forcent la fermeture immédiate de la connexion TCP." },
      { letter: 'D', text: "Ils indiquent une erreur de syntaxe JSON au navigateur." },
    ],
    correctAnswers: ['B'],
    explanation: "Dans le protocole SSE (Server-Sent Events), un message individuel est constitué de champs (`data: ...`) et se termine impérativement par une ligne vide (`\\n\\n`), ce qui informe l'analyseur du client que l'événement est achevé et peut être déclenché.",
  },
  {
    id: 6,
    codeSnippet: `const response = await fetch('/api/chat/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Bonjour' }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader!.read();
  if (done) break;
  const chunkText = decoder.decode(value, { stream: true });
  console.log(chunkText);
}`,
    question: "Dans ce composant React/Frontend moderne, que permet l'utilisation conjointe de l'API `fetch` avec `ReadableStream` (`getReader()`) ?",
    options: [
      { letter: 'A', text: "Envoyer des pièces jointes vidéo volumineuses sans passer par le serveur." },
      { letter: 'B', text: "Chiffrer le stockage local du navigateur en temps réel." },
      { letter: 'C', text: "Consommer un flux de données HTTP par morceaux au fur et à mesure de leur émission par le serveur avec une méthode POST." },
      { letter: 'D', text: "Remplacer l'intégralité du store Redux ou Zustand de l'application." },
    ],
    correctAnswers: ['C'],
    explanation: "L'interface `ReadableStream` via `response.body.getReader()` permet de lire un flux streaming émis par une requête `POST` (impossible avec l'API native standard `EventSource` du navigateur qui n'accepte que `GET`).",
  },
  {
    id: 7,
    codeSnippet: `import mysql from 'mysql2/promise';

export const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0
});`,
    question: "Pourquoi est-il impératif d'utiliser un pool de connexions (`mysql.createPool`) plutôt qu'une nouvelle connexion `mysql.createConnection` à chaque requête API d'un utilisateur ?",
    options: [
      { letter: 'A', text: "Parce que MySQL ne supporte pas les requêtes préparées avec `createConnection`." },
      { letter: 'B', text: "Pour transformer automatiquement les tables relationnelles en graphes RDF." },
      { letter: 'C', text: "Pour crypter automatiquement les disques durs du serveur physique." },
      { letter: 'D', text: "Pour réutiliser les connexions TCP préétablies, évitant la latence de handshake et la saturation par épuisement de sockets sous forte charge concurrente." },
    ],
    correctAnswers: ['D'],
    explanation: "L'ouverture et la fermeture d'une connexion TCP à chaque appel HTTP consomment énormément de temps processeur et de mémoire, risquant d'atteindre le `max_connections` de la base de données. Un pool maintient un jeu de connexions ouvertes et réutilisables.",
  },
  {
    id: 8,
    question: "Dans le cadre de la gestion de base de données d'un projet professionnel, quel est le rôle fondamental d'un système de migration (comme Knex, Prisma ou Drizzle) ?",
    options: [
      { letter: 'A', text: "Versionner, automatiser et appliquer de manière déterministe et reproductible les modifications de schéma de base de données à travers tous les environnements (dev, staging, prod)." },
      { letter: 'B', text: "Migrer le projet du langage TypeScript vers Python à chaque commit." },
      { letter: 'C', text: "Transférer la base de données sur une clé USB de secours." },
      { letter: 'D', text: "Convertir les images PNG en format WebP." },
    ],
    correctAnswers: ['A'],
    explanation: "Les scripts de migration permettent de suivre l'historique du schéma de la base de données comme du code dans Git, d'assurer que toutes les instances de l'équipe et les serveurs de production appliquent exactement les mêmes altérations de tables sans intervention manuelle risquée.",
  },
  {
    id: 9,
    codeSnippet: `app.get('/health/live', (req, res) => {
  res.status(200).json({ status: 'ALIVE' });
});

app.get('/health/ready', async (req, res) => {
  try {
    await dbPool.query('SELECT 1');
    await qdrantClient.getCollections();
    res.status(200).json({ status: 'READY' });
  } catch (err) {
    res.status(503).json({ status: 'UNAVAILABLE', error: (err as Error).message });
  }
});`,
    question: "Dans un orchestrateur conteneurisé (Kubernetes, AWS ECS ou Cloud Run), quelle est la différence essentielle entre ces deux endpoints de santé (`liveness` vs `readiness`) ?",
    options: [
      { letter: 'A', text: "`liveness` vérifie le code frontend, `readiness` vérifie la compatibilité du navigateur." },
      { letter: 'B', text: "`readiness` n'est appelé qu'une seule fois lors de la création du compte développeur." },
      { letter: 'C', text: "`liveness` indique si le processus Node tourne (si KO, le conteneur est redémarré) ; `readiness` indique si les dépendances externes sont prêtes à recevoir du trafic utilisateur." },
      { letter: 'D', text: "Les deux endpoints sont des doublons stricts sans distinction fonctionnelle." },
    ],
    correctAnswers: ['C'],
    explanation: "La sonde de liveness vérifie si le processus est bloqué (deadlock) pour ordonner un redémarrage du conteneur. La sonde de readiness vérifie si l'application est prête à traiter du trafic réel (dépendances connectées). Si `readiness` échoue, le load balancer cesse temporairement de lui router des requêtes.",
  },
  {
    id: 10,
    codeSnippet: `import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});`,
    question: "Pourquoi la journalisation structurée en JSON (avec des bibliothèques comme Pino ou Winston) est-elle indispensable sur les microservices en production ?",
    options: [
      { letter: 'A', text: "Parce que les fichiers texte traditionnels prennent 10 fois plus de place physique sur le disque." },
      { letter: 'B', text: "Parce que le format JSON empêche les hackers de lire les journaux système." },
      { letter: 'C', text: "Parce que le compilateur TypeScript génère des erreurs si l'on utilise `console.log` en mode release." },
      { letter: 'D', text: "Parce que `console.log` standard bloque l'exécution sur le serveur en écriture synchrone et que les logs JSON sont facilement indexés par des collecteurs (Datadog, Grafana Loki, CloudWatch)." },
    ],
    correctAnswers: ['D'],
    explanation: "Pino produit des journaux JSON asynchrones à très haute performance. Le format JSON standardisé permet aux outils de centralisation des logs (Loki, Elasticsearch, Datadog) de parser instantanément les champs clés (`userId`, `traceId`, `duration`, `status`) sans regex complexe.",
  },
  {
    id: 11,
    question: "Dans le cadre de l'intégration continue (CI) avec GitHub Actions, à quelle étape du pipeline doit-on exécuter les tests automatisés et le linter TypeScript ?",
    options: [
      { letter: 'A', text: "Avant la construction de l'image Docker et avant toute fusion (merge) sur la branche principale `main`." },
      { letter: 'B', text: "Après avoir déjà déployé le code sur le cluster de production." },
      { letter: 'C', text: "Uniquement le week-end lorsque les serveurs sont inactifs." },
      { letter: 'D', text: "Manuellement par l'administrateur système une fois par an." },
    ],
    correctAnswers: ['A'],
    explanation: "Le principe fondamental de la CI est d'intercepter les erreurs le plus tôt possible dans le cycle de vie (« shift left »). Les tests et l'analyse statique s'exécutent dès la création de la Pull Request pour empêcher l'introduction de code défectueux dans la branche de production.",
  },
  {
    id: 12,
    codeSnippet: `name: CI/CD Pipeline
on:
  push:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test`,
    question: "Pourquoi est-il préconisé d'utiliser `npm ci` plutôt que `npm install` dans ce workflow d'intégration continue GitHub Actions ?",
    options: [
      { letter: 'A', text: "Parce que `npm install` refuse de s'exécuter sur les systèmes d'exploitation Linux." },
      { letter: 'B', text: "Parce que `npm ci` garantit une installation propre, rapide et strictement fidèle au fichier `package-lock.json` sans altération des versions de dépendances." },
      { letter: 'C', text: "Parce que `npm ci` désactive la vérification des licences logicielles open-source." },
      { letter: 'D', text: "Parce que `npm ci` télécharge les dépendances directement en mémoire RAM sans écrire sur disque." },
    ],
    correctAnswers: ['B'],
    explanation: "`npm ci` (Clean Install) supprime le dossier `node_modules` existant et installe rigoureusement les versions exactes verrouillées dans `package-lock.json`. Il échoue immédiatement si le lockfile est désynchronisé avec `package.json`, garantissant une reproductibilité absolue.",
  },
  {
    id: 13,
    question: "Quel rôle joue un reverse proxy comme Nginx ou Caddy positionné devant les services conteneurisés d'une application IA ?",
    options: [
      { letter: 'A', text: "Il recalcule les poids des réseaux de neurones de Google Gemini." },
      { letter: 'B', text: "Il stocke les documents confidentiels dans un fichier texte non crypté." },
      { letter: 'C', text: "Il remplace le code source de l'application React par du code WebAssembly." },
      { letter: 'D', text: "Il gère la terminaison SSL/TLS, la compression gzip/brotli, la mise en cache statique et le routage des requêtes vers les conteneurs internes appropriés." },
    ],
    correctAnswers: ['D'],
    explanation: "Le reverse proxy agit comme sentinelle en première ligne : il termine le chiffrement HTTPS (certificats Let's Encrypt), applique des règles de sécurité de base, compresse les réponses et route le trafic public (`/api` -> conteneur Express, `/` -> conteneur Next/React).",
  },
  {
    id: 14,
    codeSnippet: `export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({ err, path: req.path }, "Erreur non capturée dans le contrôleur");
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? "Une erreur interne est survenue. Veuillez contacter le support."
    : err.message;

  res.status(statusCode).json({ error: message });
}`,
    question: "Pourquoi est-il crucial de masquer le détail technique de `err.message` et de la stacktrace aux utilisateurs en environnement de production ?",
    options: [
      { letter: 'A', text: "Pour éviter la divulgation d'informations sensibles (chemins de fichiers, requêtes SQL, clés de base de données, versions logicielles) à d'éventuels attaquants." },
      { letter: 'B', text: "Pour éviter de dépasser la limite de 100 caractères de la réponse HTTP." },
      { letter: 'C', text: "Pour forcer le client à recharger toute la page web." },
      { letter: 'D', text: "Car le navigateur plante s'il reçoit une stacktrace en JSON." },
    ],
    correctAnswers: ['A'],
    explanation: "La fuite d'informations (Information Leakage) dans les messages d'erreurs 500 aide les attaquants à cartographier le système, découvrir la structure des tables SQL ou identifier des bibliothèques vulnérables. Les détails doivent rester dans les logs serveur sécurisés.",
  },
  {
    id: 15,
    codeSnippet: `// Configuration de persistance Qdrant dans docker-compose
volumes:
  qdrant_storage:
    driver: local`,
    question: "Que se passerait-il lors d'un redémarrage ou d'une mise à jour de conteneur (`docker compose down && docker compose up -d`) si le dossier `/qdrant/storage` n'était pas monté sur un volume persistant ?",
    options: [
      { letter: 'A', text: "Le conteneur refuserait de s'éteindre." },
      { letter: 'B', text: "Toutes les collections vectorielles, points et embeddings indexés seraient définitivement perdus à la destruction du conteneur éphémère." },
      { letter: 'C', text: "Le moteur Docker supprimerait automatiquement le dépôt Git associé." },
      { letter: 'D', text: "La licence Qdrant serait révoquée par le registre officiel." },
    ],
    correctAnswers: ['B'],
    explanation: "Les conteneurs Docker sont par nature éphémères et sans état. Toute donnée écrite sur la couche de fichier interne du conteneur est détruite lors de son arrêt/recréation. Un volume persistant Docker est indispensable pour conserver l'état du magasin vectoriel.",
  },
  {
    id: 16,
    question: "Dans le cadre d'un déploiement sans interruption de service (Zero-downtime deployment), quelle stratégie de déploiement permet de basculer instantanément le trafic d'une ancienne version (V1) vers une nouvelle version (V2) testée et validée ?",
    options: [
      { letter: 'A', text: "L'extinction manuelle du serveur physique pendant la nuit." },
      { letter: 'B', text: "L'écrasement des fichiers PHP directement par FTP en production." },
      { letter: 'C', text: "Le déploiement Blue/Green (Bleu/Vert) ou le déploiement progressif Canary." },
      { letter: 'D', text: "Le formatage complet du cluster de machines virtuelles." },
    ],
    correctAnswers: ['C'],
    explanation: "Le déploiement Blue/Green maintient deux environnements identiques de production. La nouvelle version est déployée et testée sur l'environnement inactif (Green) avant que le routeur ou load balancer ne redirige instantanément le trafic de Blue vers Green.",
  },
  {
    id: 17,
    codeSnippet: `import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;

export function getAiClient(): GoogleGenAI {
  if (!aiInstance) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Variable GEMINI_API_KEY non définie");
    }
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiInstance;
}`,
    question: "Quel design pattern logiciel est implémenté ici pour l'instanciation du client SDK Gemini ?",
    options: [
      { letter: 'A', text: "Le pattern Singleton, garantissant une instance unique réutilisée à travers l'application." },
      { letter: 'B', text: "Le pattern Prototype créant une copie mémoire à chaque fonction." },
      { letter: 'C', text: "Le pattern Observer pour les flux audio/vidéo." },
      { letter: 'D', text: "Le pattern Decorator pour l'héritage polymorphique." },
    ],
    correctAnswers: ['A'],
    explanation: "Le pattern Singleton garantit qu'une seule instance du client SDK est instanciée et partagée par tous les modules de l'application serveur, évitant les allocations mémoire répétées et centralisant la validation de la variable d'environnement.",
  },
  {
    id: 18,
    question: "Pourquoi est-il déconseillé de stocker les fichiers binaires volumineux (PDF de 50 Mo, vidéos, exports) directement sous forme de colonnes BLOB dans une table MySQL de production ?",
    options: [
      { letter: 'A', text: "Car le langage SQL ne gère que les nombres de 0 à 100." },
      { letter: 'B', text: "Car les fichiers BLOB sont automatiquement convertis en code source JavaScript." },
      { letter: 'C', text: "Car cela dégrade considérablement la mémoire tampon de la base (Buffer Pool), gonfle inutilement les sauvegardes et ralentit les requêtes, alors qu'un stockage objet (S3, Cloud Storage) est optimisé et plus économique pour cet usage." },
      { letter: 'D', text: "Car le navigateur web refuse d'afficher des images issues d'une base relationnelle." },
    ],
    correctAnswers: ['C'],
    explanation: "La bonne pratique d'architecture consiste à stocker les binaires lourds dans un stockage objet dédié (ex: AWS S3, MinIO, GCP Cloud Storage) et à ne stocker dans la base relationnelle que l'URL sécurisée et les métadonnées textuelles associées.",
  },
  {
    id: 19,
    codeSnippet: `const [messages, setMessages] = useState<Message[]>([]);
const [streamingText, setStreamingText] = useState("");

// Mise à jour lors de la réception d'un chunk SSE
function onChunkReceived(token: string) {
  setStreamingText((prev) => prev + token);
}`,
    question: "Dans cette interface React de chat streaming, pourquoi utilise-t-on la forme fonctionnelle `(prev) => prev + token` dans le setter d'état ?",
    options: [
      { letter: 'A', text: "Pour forcer le re-rendu de la page dans une iframe externe." },
      { letter: 'B', text: "Pour garantir que chaque concaténation de token s'effectue sur l'état le plus récent et éviter les pertes de données causées par les fermetures lexicales (closures) obsolètes lors d'événements rapides." },
      { letter: 'C', text: "Pour compiler le texte en HTML avec le moteur Babel." },
      { letter: 'D', text: "Pour crypter le flux de texte dans le State React." },
    ],
    correctAnswers: ['B'],
    explanation: "Lorsque les événements de streaming arrivent à une fréquence élevée, la closure de la fonction de rappel peut capturer une valeur obsolète de `streamingText`. La mise à jour fonctionnelle `(prev) => prev + chunk` garantit l'intégrité de l'état accumulé.",
  },
  {
    id: 20,
    question: "Comment sécurise-t-on la communication réseau entre un conteneur backend Node.js et un conteneur Qdrant au sein d'un déploiement Docker Compose ?",
    options: [
      { letter: 'A', text: "En désactivant le chiffrement HTTPS sur tous les hôtes." },
      { letter: 'B', text: "En forçant l'utilisation d'une adresse IPv6 publique pour Qdrant." },
      { letter: 'C', text: "En partageant le mot de passe root de la machine hôte dans un commit Git public." },
      { letter: 'D', text: "En plaçant les services sur un réseau Docker bridge interne privé et en ne publiant pas le port 6333 sur l'interface publique de l'hôte (`ports:` non exposé publiquement)." },
    ],
    correctAnswers: ['D'],
    explanation: "En n'exposant pas le port de Qdrant dans la section `ports:` (ou en le liant uniquement à `127.0.0.1:6333:6333`), la base vectorielle n'est accessible que par les autres conteneurs reliés au réseau privé interne Docker, empêchant toute intrusion directe depuis Internet.",
  },
  {
    id: 21,
    codeSnippet: `import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

export function ChatBubble({ content }: { content: string }) {
  return (
    <div className="prose dark:prose-invert">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {content}
      </Markdown>
    </div>
  );
}`,
    question: "Quel risque de sécurité critique le plugin `rehypeSanitize` neutralise-t-il lors de l'affichage en Markdown des réponses générées par le LLM ?",
    options: [
      { letter: 'A', text: "L'injection SQL dans le composant React." },
      { letter: 'B', text: "L'exécution d'attaques Cross-Site Scripting (XSS) causées par des balises HTML ou scripts malveillants (`<script>`, `onerror=`) générés ou reflétés par l'IA." },
      { letter: 'C', text: "Le débordement de pile d'appel lors de la manipulation du DOM." },
      { letter: 'D', text: "L'expiration prématurée des sessions HTTPS." },
    ],
    correctAnswers: ['B'],
    explanation: "Un modèle de langage peut générer ou refléter du code HTML contenant des balises script ou des gestionnaires d'événements malveillants (`<img src=x onerror=alert(document.cookie)>`). `rehypeSanitize` filtre rigoureusement l'arbre syntaxique pour empêcher tout XSS.",
  },
  {
    id: 22,
    question: "Dans le cadre du RGPD, comment une architecture IA professionnelle doit-elle gérer le « Droit à l'effacement » (Right to be forgotten) pour les documents indexés dans Qdrant et les conversations stockées en base MySQL ?",
    options: [
      { letter: 'A', text: "Ignorer la demande car les bases vectorielles sont immuables par définition." },
      { letter: 'B', text: "Éteindre les serveurs pendant 30 jours consécutifs." },
      { letter: 'C', text: "Changer le nom de famille de l'utilisateur en « Anonyme » sans rien supprimer." },
      { letter: 'D', text: "Fournir un mécanisme de purge supprimant les enregistrements relationnels de l'utilisateur ET exécutant une suppression par filtre (`delete_points` avec `filter: { user_id }`) dans Qdrant." },
    ],
    correctAnswers: ['D'],
    explanation: "La conformité RGPD exige la suppression effective de toutes les données identifiantes ou rattachées à un utilisateur sur demande. Cela impose de purger les tables relationnelles ainsi que tous les points vectoriels indexés dans Qdrant associés à cet identifiant.",
  },
  {
    id: 23,
    codeSnippet: `export async function checkRateLimit(userId: string): Promise<boolean> {
  const currentMinute = Math.floor(Date.now() / 60000);
  const key = \`ratelimit:\${userId}:\${currentMinute}\`;
  
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, 65);
  }
  return count <= 30; // Max 30 requêtes par minute
}`,
    question: "Pourquoi l'utilisation de Redis est-elle privilégiée par rapport à une variable JavaScript en mémoire locale (`Map` Node.js) pour gérer ce rate-limiting dans une architecture de production scalée horizontalement ?",
    options: [
      { letter: 'A', text: "Parce qu'avec plusieurs instances conteneurisées derrière un load balancer, un store en mémoire local ne partage pas les compteurs, permettant aux utilisateurs de contourner le quota." },
      { letter: 'B', text: "Parce que Node.js interdit les calculs arithmétiques au runtime." },
      { letter: 'C', text: "Parce que Redis compile les requêtes en instructions assembleur." },
      { letter: 'D', text: "Parce que Redis ne consomme aucune ressource CPU." },
    ],
    correctAnswers: ['A'],
    explanation: "Dans un cluster comportant 5 instances conteneurisées, une variable mémoire locale n'a conscience que d'un cinquième du trafic. Redis agit comme un magasin d'état centralisé et atomique (`INCR`), garantissant un comptage strict quel que soit le nœud qui traite la requête.",
  },
  {
    id: 24,
    question: "Quel est l'intérêt d'utiliser des variables d'environnement préfixées par `NEXT_PUBLIC_` dans Next.js par rapport à des variables d'environnement standard ?",
    options: [
      { letter: 'A', text: "Elles sont chiffrées avec la clé privée de l'infrastructure cloud." },
      { letter: 'B', text: "Elles permettent à la base de données MySQL d'accéder au frontend." },
      { letter: 'C', text: "Elles sont injectées dans le code JavaScript envoyé au navigateur client lors du build, tandis que les variables sans ce préfixe restent strictement confinées au runtime serveur." },
      { letter: 'D', text: "Elles augmentent la vitesse de téléchargement du navigateur." },
    ],
    correctAnswers: ['C'],
    explanation: "Dans Next.js, seules les variables portant le préfixe `NEXT_PUBLIC_` sont intégrées dans le bundle navigateur. Une clé secrète (ex: `GEMINI_API_KEY`, `DB_PASSWORD`) ne doit JAMAIS porter ce préfixe, sinon elle devient visible par n'importe quel visiteur inspectant le code source.",
  },
  {
    id: 25,
    codeSnippet: `// Configuration de compression Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml;
gzip_min_length 1000;
gzip_proxied any;`,
    question: "Quel impact cette directive Nginx produit-elle sur les performances d'une application web intégrant des interfaces d'IA riches ?",
    options: [
      { letter: 'A', text: "Elle supprime automatiquement les balises HTML obsolètes." },
      { letter: 'B', text: "Elle divise par deux la mémoire GPU requise par le modèle de fondation." },
      { letter: 'C', text: "Elle réduit la taille des assets statiques et des payloads JSON transférés sur le réseau jusqu'à 70%, accélérant considérablement le chargement initial pour l'utilisateur." },
      { letter: 'D', text: "Elle empêche les attaques DDoS de niveau 3." },
    ],
    correctAnswers: ['C'],
    explanation: "La compression Gzip au niveau du reverse proxy compresse les fichiers textuels (CSS, JS, JSON d'API) à la volée avant de les envoyer sur le réseau, réduisant la consommation de bande passante et accélérant le temps de chargement pour les clients.",
  },
  {
    id: 26,
    codeSnippet: `CREATE TABLE IF NOT EXISTS conversation_messages (
  id VARCHAR(36) PRIMARY KEY,
  conversation_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  role ENUM('user', 'model', 'system') NOT NULL,
  content MEDIUMTEXT NOT NULL,
  token_count INT UNSIGNED DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_conversation_created (conversation_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
    question: "Pourquoi la création d'un index composite `idx_conversation_created (conversation_id, created_at)` est-elle une pratique d'ingénierie essentielle dans cette table MySQL ?",
    options: [
      { letter: 'A', text: "Pour optimiser les requêtes fréquentes récupérant l'historique chronologique d'une conversation (`WHERE conversation_id = ? ORDER BY created_at ASC`) sans effectuer de scan complet de table ni de tri coûteux en mémoire." },
      { letter: 'B', text: "Pour crypter les messages des utilisateurs sur le disque dur." },
      { letter: 'C', text: "Pour empêcher l'insertion de plus de 100 messages par utilisateur." },
      { letter: 'D', text: "Pour forcer MySQL à sauvegarder les données dans un fichier XML." },
    ],
    correctAnswers: ['A'],
    explanation: "Un index composite sur `(conversation_id, created_at)` permet au moteur de stockage InnoDB de localiser immédiatement tous les messages d'un fil de discussion déjà triés chronologiquement, garantissant un temps de réponse en quelques millisecondes même avec des millions de lignes.",
  },
  {
    id: 27,
    question: "Quelle stratégie d'optimisation permet de réduire la facture d'API LLM lorsqu'un document volumineux (ex: manuel de 200 pages) est fréquemment interrogé par plusieurs utilisateurs simultanés ?",
    options: [
      { letter: 'A', text: "Désactiver les règles d'isolation de Docker." },
      { letter: 'B', text: "Supprimer la moitié des caractères du document au hasard." },
      { letter: 'C', text: "Remplacer le document par un fichier d'image PNG vide." },
      { letter: 'D', text: "Utiliser la mise en cache de contexte (Context Caching) proposée par des modèles comme Gemini, qui facture les tokens mis en cache à une fraction du tarif normal." },
    ],
    correctAnswers: ['D'],
    explanation: "Le Context Caching (disponible sur Gemini) permet de pré-traiter et stocker en cache mémoire côté Google de volumineux contextes (documentation, livres, codebase). Les requêtes subséquentes interrogeant ce même contexte bénéficient d'une latence réduite et d'une réduction de coût substantielle (jusqu'à 75%).",
  },
  {
    id: 28,
    codeSnippet: `export async function gracefulShutdown(server: any, pool: any) {
  logger.info("Signal d'arrêt reçu (SIGTERM). Fermeture gracieuse en cours...");
  server.close(() => {
    logger.info("Serveur HTTP fermé aux nouvelles requêtes.");
    pool.end().then(() => {
      logger.info("Toutes les connexions du pool MySQL sont libérées.");
      process.exit(0);
    });
  });
  
  // Timeout de sécurité forcé après 10s
  setTimeout(() => {
    logger.error("Arrêt forcé après expiration du délai.");
    process.exit(1);
  }, 10000);
}`,
    question: "Quel incident de production l'implémentation de cet arrêt gracieux (Graceful Shutdown) sur écoute des signaux `SIGTERM` / `SIGINT` évite-t-elle lors d'un redéploiement ?",
    options: [
      { letter: 'A', text: "La corruption du noyau Linux sur l'hyperviseur." },
      { letter: 'B', text: "L'interruption brutale de requêtes streaming en cours et la persistance de transactions de base de données à moitié écrites ou verrouillées." },
      { letter: 'C', text: "L'écrasement des variables d'environnement dans le fichier `.env`." },
      { letter: 'D', text: "La réinitialisation des clés API des services tiers." },
    ],
    correctAnswers: ['B'],
    explanation: "Lorsqu'un orchestrateur (Docker, Kubernetes) met à jour un service, il envoie un signal `SIGTERM`. Le graceful shutdown permet au serveur de terminer le traitement des requêtes HTTP en cours et de fermer proprement les connexions DB avant de s'arrêter, évitant les erreurs 502/504 aux utilisateurs.",
  },
  {
    id: 29,
    question: "Dans une architecture microservices d'entreprise, pourquoi est-il recommandé d'utiliser un identifiant unique de corrélation (`X-Correlation-ID` ou `trace_id`) propagé dans tous les en-têtes de requêtes ?",
    options: [
      { letter: 'A', text: "Pour déverrouiller des fonctionnalités payantes du navigateur." },
      { letter: 'B', text: "Pour compresser les paquets réseau TCP au niveau matériel." },
      { letter: 'C', text: "Pour remplacer les certificats HTTPS par un jeton numérique." },
      { letter: 'D', text: "Pour tracer une requête utilisateur de bout en bout à travers tous les services (Frontend -> Gateway -> LLM -> Base de données) et diagnostiquer rapidement les erreurs dans les logs centralisés." },
    ],
    correctAnswers: ['D'],
    explanation: "Un Correlation ID unique attaché à une requête dès son entrée dans le système et transmis à tous les sous-systèmes permet aux ingénieurs de filtrer les logs de l'ensemble de l'infrastructure distribuée pour reconstruire l'historique complet d'un bug ou d'une anomalie de latence.",
  },
  {
    id: 30,
    codeSnippet: `// Extrait de configuration Prometheus / OpenTelemetry
metrics:
  - name: http_request_duration_seconds
    type: histogram
    buckets: [0.05, 0.1, 0.5, 1.0, 2.5, 5.0, 10.0]
  - name: llm_generation_duration_seconds
    type: histogram
    buckets: [0.5, 1.0, 2.0, 5.0, 15.0, 30.0]`,
    question: "Pourquoi les seaux (buckets) de l'histogramme de durée pour `llm_generation_duration_seconds` sont-ils dimensionnés avec des seuils beaucoup plus élevés que ceux des requêtes HTTP traditionnelles ?",
    options: [
      { letter: 'A', text: "Parce que les requêtes LLM utilisent un protocole de transport analogique plus lent." },
      { letter: 'B', text: "Parce que l'inférence générative par réseaux de neurones autoregressifs prend naturellement de quelques centaines de millisecondes à plusieurs dizaines de secondes selon le nombre de tokens générés." },
      { letter: 'C', text: "Pour satisfaire une exigence réglementaire imposée par le consortium W3C." },
      { letter: 'D', text: "Parce que Prometheus ne sait pas mesurer de petites fractions de secondes pour l'IA." },
    ],
    correctAnswers: ['B'],
    explanation: "Contrairement à une route API classique qui répond en moins de 100 ms, la génération autoregressive de texte par un LLM est un processus computationnel intensif qui s'échelonne typiquement de 1 à 30 secondes selon la longueur du prompt et de la réponse.",
  },
  {
    id: 31,
    question: "Quelle stratégie de tolérance aux pannes est recommandée si le service principal de modèle de fondation (ex: Google Gemini) rencontre une panne d'indisponibilité globale (503 Service Unavailable) ?",
    options: [
      { letter: 'A', text: "Afficher un écran blanc d'erreur non géré à l'utilisateur." },
      { letter: 'B', text: "Réinitialiser les disques durs des serveurs de base de données." },
      { letter: 'C', text: "Implémenter un mécanisme de basculement automatique (Fallback Provider) vers un modèle alternatif (ex: Claude, OpenAI, ou modèle open-source local) avec circuit-breaker." },
      { letter: 'D', text: "Désinstaller le paquet `@google/genai` en production." },
    ],
    correctAnswers: ['C'],
    explanation: "Pour assurer la haute disponibilité (99.9% uptime), les architectures résilientes intègrent un pattern Circuit Breaker couplé à un Fallback automatique : si le fournisseur principal échoue consécutivement, le trafic est redirigé vers un fournisseur d'appoint sans interruption de service.",
  },
  {
    id: 32,
    codeSnippet: `const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 secondes max

try {
  const response = await fetch('/api/agent/task', {
    method: 'POST',
    signal: controller.signal,
    body: JSON.stringify({ task: 'Analyse complexe' })
  });
} catch (error: any) {
  if (error.name === 'AbortError') {
    console.error("Requête interrompue pour cause de dépassement de délai (Timeout).");
  }
} finally {
  clearTimeout(timeoutId);
}`,
    question: "Quel comportement technique ce code client implémente-t-il grâce à `AbortController` ?",
    options: [
      { letter: 'A', text: "Il annule et interrompt proprement la requête HTTP si le serveur met plus de 15 secondes à répondre, évitant de bloquer indéfiniment les ressources du client." },
      { letter: 'B', text: "Il relance 15 fois la même requête en cas d'erreur réseau." },
      { letter: 'C', text: "Il réduit la consommation électrique de la carte mère de 15%." },
      { letter: 'D', text: "Il désactive le pare-feu local du navigateur." },
    ],
    correctAnswers: ['A'],
    explanation: "`AbortController` permet d'annuler activement une promesse `fetch` et de clore la connexion réseau sous-jacente si le traitement dépasse un temps imparti (timeout), protégeant l'interface contre les états d'attente infinis en cas de blocage serveur.",
  },
  {
    id: 33,
    question: "Qu'est-ce qu'une stratégie de « Canarisation » (Canary Release) dans le déploiement d'un nouveau prompt système d'ingénierie d'IA ?",
    options: [
      { letter: 'A', text: "Déployer le nouveau prompt auprès d'un petit pourcentage restreint d'utilisateurs réels (ex: 5%) pour surveiller les métriques d'erreur et de satisfaction avant un déploiement à 100%." },
      { letter: 'B', text: "Traduire le prompt en plusieurs langues étrangères avant publication." },
      { letter: 'C', text: "Chiffrer le prompt dans un fichier audio au format MP3." },
      { letter: 'D', text: "Désactiver la sauvegarde automatique des sessions utilisateurs." },
    ],
    correctAnswers: ['A'],
    explanation: "Le déploiement Canary permet de tester une nouvelle version de prompt ou de modèle sur une fraction réduite du trafic réel. Si les métriques d'évaluation ou d'erreur s'avèrent négatives, le retour arrière (rollback) est immédiat avec un impact minimal sur la base d'utilisateurs.",
  },
  {
    id: 34,
    codeSnippet: `// Configuration de sécurité des cookies de session
res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 3600000 // 1 heure
});`,
    question: "Pourquoi la directive `httpOnly: true` est-elle absolument capitale pour la sécurité du jeton d'authentification ?",
    options: [
      { letter: 'A', text: "Elle force le navigateur à envoyer le cookie sur des réseaux Wi-Fi publics non chiffrés." },
      { letter: 'B', text: "Elle empêche tout code JavaScript exécuté dans le navigateur (y compris en cas d'attaque XSS réussie) de lire la valeur du cookie via `document.cookie`." },
      { letter: 'C', text: "Elle supprime le cookie dès que la fenêtre du navigateur est minimisée." },
      { letter: 'D', text: "Elle empêche le serveur backend de lire le cookie." },
    ],
    correctAnswers: ['B'],
    explanation: "L'attribut `httpOnly` garantit que le cookie ne peut être manipulé ou lu que par le protocole HTTP lors des transferts réseau. Si un attaquant parvient à injecter un script XSS, il lui sera impossible d'exfiltrer le cookie de session via `document.cookie`.",
  },
  {
    id: 35,
    question: "Quel rôle joue un fichier `.dockerignore` placé à la racine du dépôt d'un projet full-stack IA ?",
    options: [
      { letter: 'A', text: "Il liste les utilisateurs qui n'ont pas le droit de télécharger l'application." },
      { letter: 'B', text: "Il désactive le compilateur TypeScript dans Docker." },
      { letter: 'C', text: "Il exclut les fichiers volumineux ou sensibles (`node_modules`, `.env`, `.git`, logs) du contexte de build Docker, accélérant la compilation et évitant de fuiter des secrets dans l'image." },
      { letter: 'D', text: "Il empêche Docker de consommer de la bande passante internet." },
    ],
    correctAnswers: ['C'],
    explanation: "Lors de la commande `docker build`, tout le contenu du répertoire courant est envoyé au démon Docker. `.dockerignore` évite d'envoyer des gigaoctets inutiles (`node_modules`) et prévient la présence accidentelle de fichiers sensibles comme `.env` dans les couches d'images publiques.",
  },
  {
    id: 36,
    codeSnippet: `export function sanitizeFileName(name: string): string {
  // Supprime les tentatives de traversée de répertoire
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\\.{2,}/g, '_');
}`,
    question: "Quelle faille critique de sécurité du système de fichiers cette fonction prévient-elle lorsqu'un utilisateur téléverse un document à indexer dans le RAG ?",
    options: [
      { letter: 'A', text: "La désactivation de la carte graphique du serveur." },
      { letter: 'B', text: "La fragmentation de la mémoire vive du système d'exploitation." },
      { letter: 'C', text: "L'augmentation involontaire du nombre de tokens consommés par l'embedding." },
      { letter: 'D', text: "La traversée de répertoires (Path Traversal / Directory Traversal) permettant d'écrire ou lire des fichiers hors du dossier dédié (ex: `../../etc/passwd`)." },
    ],
    correctAnswers: ['D'],
    explanation: "Sans nettoyage du nom de fichier, un utilisateur malveillant pourrait soumettre un nom comme `../../../app/.env` pour écraser des fichiers critiques du système d'exploitation ou du serveur web. C'est l'attaque par traversée de répertoire (Path Traversal).",
  },
  {
    id: 37,
    question: "Dans le cadre de la maintenance opérationnelle d'un cluster MySQL en production, pourquoi est-il vital d'effectuer des sauvegardes avec `mysqldump` ou des snapshots EBS réguliers testés avec une procédure de restauration (Disaster Recovery) ?",
    options: [
      { letter: 'A', text: "Parce que MySQL supprime automatiquement toutes les données tous les 90 jours." },
      { letter: 'B', text: "Pour garantir un RPO (Recovery Point Objective) et un RTO (Recovery Time Objective) faibles en cas de panne matérielle, corruption de données ou attaque par rançongiciel." },
      { letter: 'C', text: "Pour accélérer les calculs de similarité cosinus dans Qdrant." },
      { letter: 'D', text: "Car le cloud public interdit l'hébergement de bases de données sans double licence payante." },
    ],
    correctAnswers: ['B'],
    explanation: "Une sauvegarde n'est valide que si sa restauration a été testée avec succès. En cas de sinistre majeur, un plan de reprise d'activité (PRA / Disaster Recovery) garantit que l'entreprise peut restaurer ses données dans les limites contractuelles de perte de données (RPO) et de durée d'interruption (RTO).",
  },
  {
    id: 38,
    codeSnippet: `// Vérification de la compatibilité des dimensions d'embeddings
if (embeddingVector.length !== 768) {
  throw new Error(\`Dimension vectorielle incompatible: attendu 768, reçu \${embeddingVector.length}\`);
}`,
    question: "Quel incident immédiat se produit si une application tente d'insérer un vecteur de dimension 1536 dans une collection Qdrant configurée avec `size: 768` (modèle `text-embedding-004`) ?",
    options: [
      { letter: 'A', text: "Qdrant tronque silencieusement les 768 dimensions excédentaires sans avertissement." },
      { letter: 'B', text: "Qdrant recalcule automatiquement le modèle d'embedding sur son serveur." },
      { letter: 'C', text: "Qdrant rejette immédiatement la requête HTTP avec une erreur 400 (Bad Request / Vector dimension mismatch)." },
      { letter: 'D', text: "Le conteneur Docker de Qdrant redémarre instantanément." },
    ],
    correctAnswers: ['C'],
    explanation: "Les collections vectorielles sont rigoureusement indexées sur une géométrie à dimension fixe. Toute tentative d'insérer ou d'interroger un vecteur dont la dimension ne correspond pas exactement à la taille déclarée de la collection est immédiatement rejetée avec une erreur 400 par Qdrant.",
  },
  {
    id: 39,
    question: "Quel est l'avantage décisif d'utiliser une architecture conteneurisée standardisée avec Docker Compose pour le projet de synthèse d'un ingénieur IA ?",
    options: [
      { letter: 'A', text: "Elle permet à l'application de fonctionner sans avoir besoin d'écrire de code." },
      { letter: 'B', text: "Elle remplace le besoin de tester le code avec Vitest." },
      { letter: 'C', text: "Elle dispense l'équipe de payer les licences cloud des hébergeurs." },
      { letter: 'D', text: "Elle garantit la reproductibilité parfaite (« It works on my machine and in production ») en isolant l'ensemble de la pile technique (Node, MySQL, Qdrant) indépendamment de l'OS de l'hôte." },
    ],
    correctAnswers: ['D'],
    explanation: "La conteneurisation Docker standardise l'environnement d'exécution (mêmes versions de Node, Qdrant, MySQL, bibliothèques C). Cela élimine les écarts d'environnement (« ça marche chez moi mais pas sur le serveur ») et simplifie considérablement le déploiement continu.",
  },
  {
    id: 40,
    codeSnippet: `import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Format JSON invalide dans le corps de requête" },
      { status: 400 }
    );
  }
}`,
    question: "Dans cette Route Handler Next.js App Router, pourquoi est-il indispensable d'envelopper `await req.json()` dans un bloc `try / catch` ?",
    options: [
      { letter: 'A', text: "Parce qu'un corps de requête vide ou contenant du JSON mal formé provoque une exception non interceptée qui ferait planter le handler avec une erreur 500 au lieu d'un code 400 explicite." },
      { letter: 'B', text: "Pour empêcher le navigateur client de fermer la fenêtre active." },
      { letter: 'C', text: "Pour accélérer le rendu des composants React côté serveur." },
      { letter: 'D', text: "Pour chiffrer le payload en SHA-512 avant l'envoi." },
    ],
    correctAnswers: ['A'],
    explanation: "Si le client transmet un body vide ou corrompu, `req.json()` lève une exception native `SyntaxError`. Sans bloc `try/catch`, cette exception remonte et génère une erreur 500 (erreur interne serveur) au lieu d'une réponse 400 (Bad Request) informant clairement le client que sa syntaxe est erronée.",
  },
];
