import { ExamMetadata, ExamQuestion } from './types';

export const BACKEND_IA_MODULE_3_EXAM_METADATA: ExamMetadata = {
  moduleId: 'backend-ia-module-3',
  title: "Examen Officiel de Certification — Module 3 : Protocoles Réseau, WebSockets & Streaming IA (SSE)",
  durationMinutes: 40,
  passingScorePercent: 80, // Seuil de réussite à 80% (32/40)
  totalQuestions: 40,
};

export const BACKEND_IA_MODULE_3_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "Dans le cadre de la diffusion de tokens générés par un modèle d'IA (ex: Gemini) vers une interface utilisateur web, pourquoi le protocole SSE (Server-Sent Events) est-il architecturalement supérieur au Short Polling ?",
    options: [
      { letter: 'A', text: "Parce que le SSE maintient une unique connexion HTTP persistante où le serveur pousse les tokens instantanément à mesure de leur génération, tandis que le Short Polling multiplie les handshakes TCP/TLS et les en-têtes HTTP répétés avec une latence artificielle." },
      { letter: 'B', text: "Parce que le Short Polling nécessite l'installation d'un certificat SSL payant à chaque requête." },
      { letter: 'C', text: "Parce que le Short Polling ne fonctionne qu'avec les fichiers PDF." },
      { letter: 'D', text: "Parce que le SSE compresse les données en code binaire assembleur non lisible." },
    ],
    correctAnswers: ['A'],
    explanation: "Le Short Polling envoie des requêtes HTTP complètes à intervalles réguliers, saturant le réseau de handshakes et d'en-têtes redondants tout en créant une latence perçue dégradée. SSE utilise une seule connexion HTTP ouverte sur laquelle le serveur pousse les fragments en continu au fil de l'inférence.",
  },
  {
    id: 2,
    codeSnippet: `app.get('/api/ai/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  
  res.write('data: {"token": "Bonjour"}\\n\\n');
});`,
    question: "Pourquoi l'en-tête `Cache-Control: no-cache` est-il strictement obligatoire dans la réponse HTTP d'un endpoint SSE ?",
    options: [
      { letter: 'A', text: "Pour obliger le navigateur à vider son historique de navigation." },
      { letter: 'B', text: "Pour empêcher les proxys intermédiaires (comme Nginx, Cloudflare) ou le cache du navigateur de mettre en mémoire tampon (buffering) les événements au lieu de les relayer en temps réel." },
      { letter: 'C', text: "Pour désactiver la validation des certificats SSL." },
      { letter: 'D', text: "Pour forcer le serveur à stocker les données dans Redis." },
    ],
    correctAnswers: ['B'],
    explanation: "Sans `no-cache` (et souvent `X-Accel-Buffering: no` pour Nginx), les proxys et routeurs intermédiaires peuvent accumuler les paquets dans un tampon de transit et ne les libérer qu'une fois la connexion close, anéantissant l'effet de streaming en direct pour l'utilisateur.",
  },
  {
    id: 3,
    question: "Quelle est la structure normalisée d'un message textuel conforme à la spécification W3C du protocole Server-Sent Events (SSE) ?",
    options: [
      { letter: 'A', text: "Un objet binaire sérialisé avec Protobuf précédé d'un entier 32-bit indiquant la taille." },
      { letter: 'B', text: "Une trame TCP brute sans délimiteur de fin." },
      { letter: 'C', text: "Des lignes de texte préfixées par un champ (ex: `data:`, `event:`, `id:`) terminées impérativement par un double saut de ligne consécutif (`\\n\\n`)." },
      { letter: 'D', text: "Un document XML enveloppé dans une balise `<sse_chunk>`." },
    ],
    correctAnswers: ['C'],
    explanation: "La spécification SSE impose des champs texte au format `champ: valeur\\n` (`data:`, `event:`, `id:`, `retry:`). L'événement est considéré comme complet et expédié aux écouteurs du client uniquement lorsqu'une ligne vide (`\\n\\n`) est rencontrée.",
  },
  {
    id: 4,
    codeSnippet: `const response = await ai.models.generateContentStream({
  model: 'gemini-2.5-flash',
  contents: 'Explique le fonctionnement des WebSockets',
});

for await (const chunk of response) {
  res.write(\`data: \${JSON.stringify({ text: chunk.text })}\\n\\n\`);
}
res.write('event: done\\ndata: [DONE]\\n\\n');
res.end();`,
    question: "Dans ce contrôleur de streaming Node.js, pourquoi utilise-t-on la boucle `for await (... of ...)` sur `response` ?",
    options: [
      { letter: 'A', text: "Pour attendre que l'ensemble du texte soit totalement généré avant de commencer l'affichage." },
      { letter: 'B', text: "Pour chiffrer les blocs de données avec RSA-4096." },
      { letter: 'C', text: "Pour traduire le texte en plusieurs langues simultanées." },
      { letter: 'D', text: "Pour consommer l'itérateur asynchrone (AsyncIterable) renvoyé par le SDK au fur et à mesure que les paquets de tokens arrivent de l'API Gemini." },
    ],
    correctAnswers: ['D'],
    explanation: "`generateContentStream` renvoie un objet implémentant le protocole `AsyncIterable`. La boucle `for await...of` dépile chaque fragment (chunk) immédiatement dès sa réception réseau depuis les serveurs de Gemini sans attendre la fin de la génération globale.",
  },
  {
    id: 5,
    codeSnippet: `req.on('close', () => {
  console.log("Le client a fermé la connexion ou annulé la requête.");
  // Quelle action critique le serveur doit-il entreprendre ici ?
});`,
    question: "Dans un serveur backend relayant un flux génératif d'IA, que doit impérativement faire le serveur lorsque l'événement `'close'` survient sur l'objet requête `req` ?",
    options: [
      { letter: 'A', text: "Interrompre l'appel à l'API LLM en amont (ex: via un `AbortController.abort()`) pour stopper la consommation inutile de tokens facturés et libérer immédiatement les sockets." },
      { letter: 'B', text: "Continuer à générer tous les tokens en mémoire vive et les sauvegarder sur disque." },
      { letter: 'C', text: "Redémarrer le serveur HTTP immédiatement." },
      { letter: 'D', text: "Envoyer un e-mail d'alerte à l'administrateur système." },
    ],
    correctAnswers: ['A'],
    explanation: "Si l'utilisateur clique sur 'Stop' ou ferme son onglet navigateur, la connexion HTTP est rompue. Ne pas annuler la requête amont auprès du fournisseur d'IA (Gemini/OpenAI) gaspille des quotas payants et monopolise inutilement les ressources serveur pour une réponse qui finira dans le vide.",
  },
  {
    id: 6,
    question: "Quelle est la différence fondamentale de modèle de communication entre WebSockets et Server-Sent Events (SSE) ?",
    options: [
      { letter: 'A', text: "Les WebSockets ne fonctionnent qu'avec des fichiers images, alors que SSE ne supporte que du texte brut." },
      { letter: 'B', text: "Les WebSockets établissent un canal bidirectionnel full-duplex sur une socket TCP dédiée, tandis que le SSE est un flux unidirectionnel du serveur vers le client reposant sur le protocole HTTP standard." },
      { letter: 'C', text: "Les WebSockets ne supportent pas le chiffrement TLS (HTTPS)." },
      { letter: 'D', text: "Le SSE est déprécié par tous les navigateurs depuis 2020." },
    ],
    correctAnswers: ['B'],
    explanation: "Les WebSockets permettent au client et au serveur d'émettre des messages à tout moment dans les deux sens (Full-Duplex). SSE est conçu exclusivement pour pousser des flux du serveur vers le client (Half-Duplex Unidirectionnel), ce qui est idéal et bien plus simple pour le streaming de réponses LLM.",
  },
  {
    id: 7,
    codeSnippet: `GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13`,
    question: "Quel code de réponse HTTP le serveur doit-il renvoyer pour valider avec succès cette requête de Handshake WebSocket ?",
    options: [
      { letter: 'A', text: "HTTP/1.1 200 OK" },
      { letter: 'B', text: "HTTP/1.1 204 No Content" },
      { letter: 'C', text: "HTTP/1.1 101 Switching Protocols" },
      { letter: 'D', text: "HTTP/1.1 301 Moved Permanently" },
    ],
    correctAnswers: ['C'],
    explanation: "Le protocole WebSocket débute par une négociation HTTP standard avec les en-têtes `Upgrade: websocket` et `Connection: Upgrade`. Le serveur accepte la transition en répondant avec le statut `101 Switching Protocols`, après quoi la socket bascule en mode trames binaires/texte WebSocket.",
  },
  {
    id: 8,
    codeSnippet: `const eventSource = new EventSource('/api/ai/stream');

eventSource.onmessage = (event) => {
  console.log('Nouveau token:', event.data);
};

eventSource.addEventListener('done', (event) => {
  console.log('Génération terminée');
  eventSource.close();
});`,
    question: "Quelle méthode native de l'objet `EventSource` permet au client d'écouter un événement nommé spécifique envoyé avec le champ `event: done` depuis le serveur ?",
    options: [
      { letter: 'A', text: "eventSource.oncustom('done', ...)" },
      { letter: 'B', text: "eventSource.catchEvent('done')" },
      { letter: 'C', text: "eventSource.subscribe('done')" },
      { letter: 'D', text: "eventSource.addEventListener('done', callback)" },
    ],
    correctAnswers: ['D'],
    explanation: "`eventSource.onmessage` ne capture que les événements génériques sans champ `event:` explicite (ou `event: message`). Pour capter un type d'événement personnalisé (comme `event: done`), il faut utiliser l'API standard `eventSource.addEventListener('nom_evenement', callback)`.",
  },
  {
    id: 9,
    question: "Pourquoi l'API native standard `EventSource` du navigateur est-elle souvent remplacée par la fonction `fetch` avec `ReadableStream` dans les applications de chat d'IA modernes ?",
    options: [
      { letter: 'A', text: "Parce que l'API `EventSource` standard ne supporte que la méthode HTTP GET et ne permet pas d'envoyer un corps de requête en POST (contenant le prompt de l'utilisateur ou des fichiers) ni d'en-têtes HTTP personnalisés (`Authorization: Bearer ...`)." },
      { letter: 'B', text: "Parce que l'API `EventSource` est interdite par la réglementation RGPD." },
      { letter: 'C', text: "Parce que `EventSource` ne peut pas afficher de texte en français." },
      { letter: 'D', text: "Parce que `fetch` est 100 fois plus rapide que les sockets TCP." },
    ],
    correctAnswers: ['A'],
    explanation: "L'interface `EventSource` native du W3C ne permet d'émettre que des requêtes `GET` sans payload. Dans les applications d'IA, les prompts peuvent être longs et exigent des tokens d'autorisation dans les en-têtes HTTP : `fetch` avec méthode POST et `ReadableStream` est donc la solution standard adoptée.",
  },
  {
    id: 10,
    codeSnippet: `const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Bonjour' }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder('utf-8');

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const textChunk = decoder.decode(value, { stream: true });
  console.log(textChunk);
}`,
    question: "À quoi sert l'option `{ stream: true }` passée à la méthode `decoder.decode(value, { stream: true })` lors de la lecture d'un flux binaire UTF-8 en streaming ?",
    options: [
      { letter: 'A', text: "À forcer la transmission des données par le protocole UDP." },
      { letter: 'B', text: "À conserver en mémoire tampon les octets d'un caractère UTF-8 multi-octets (ex: émojis ou caractères accentués) si ce dernier se trouve tronqué à cheval entre deux fragments consécutifs." },
      { letter: 'C', text: "À compresser automatiquement le texte en mémoire vive." },
      { letter: 'D', text: "À interdire au navigateur de fermer la connexion." },
    ],
    correctAnswers: ['B'],
    explanation: "En encodage UTF-8, un caractère peut occuper de 1 à 4 octets. Si un chunk réseau coupe un caractère multi-octets en deux, le décodeur sans `{ stream: true }` émettrait un caractère corrompu (U+FFFD). L'option `stream: true` garde l'octet orphelin pour l'assembler avec le chunk suivant.",
  },
  {
    id: 11,
    question: "Dans le protocole SSE, que permet le champ optionnel `id: 123` envoyé par le serveur avec chaque événement ?",
    options: [
      { letter: 'A', text: "Il identifie le numéro de carte bancaire du client pour le paiement au token." },
      { letter: 'B', text: "Il indique au processeur quel cœur de calcul utiliser." },
      { letter: 'C', text: "Il permet au navigateur, en cas de déconnexion réseau impromptue, d'envoyer l'en-tête HTTP `Last-Event-ID: 123` lors de sa reconnexion automatique pour que le serveur reprenne la diffusion là où elle s'était arrêtée." },
      { letter: 'D', text: "Il force le rechargement immédiat de la page web." },
    ],
    correctAnswers: ['C'],
    explanation: "Le protocole SSE dispose d'une résilience native : si la connexion est interrompue, le navigateur attend (`retry`) puis renvoie une requête de reconnexion avec l'en-tête `Last-Event-ID`. Un backend bien conçu peut ainsi rejouer les messages manqués sans perte d'information.",
  },
  {
    id: 12,
    codeSnippet: `// Configuration Heartbeat / Keep-Alive pour SSE
const keepAliveInterval = setInterval(() => {
  res.write(': keep-alive\\n\\n');
}, 15000); // Toutes les 15 secondes`,
    question: "Pourquoi est-il crucial d'envoyer périodiquement un commentaire SSE (`: keep-alive\\n\\n`) lorsque le modèle d'IA prend du temps à réfléchir avant de générer des tokens (Thinking phase) ?",
    options: [
      { letter: 'A', text: "Pour mettre à jour l'horloge système du client." },
      { letter: 'B', text: "Pour forcer le navigateur à augmenter le volume sonore." },
      { letter: 'C', text: "Parce que le protocole HTTP interdit les silences de plus de 5 millisecondes." },
      { letter: 'D', text: "Pour éviter que les proxys intermédiaires, pare-feux et équilibreurs de charge (Load Balancers) ne ferment brutalement la connexion TCP pour cause d'inactivité (Idle Timeout)." },
    ],
    correctAnswers: ['D'],
    explanation: "Les routeurs cloud (AWS ALB, GCP, Nginx) possèdent un timeout d'inactivité (souvent 30s à 60s). Si le LLM prend 40 secondes à raisonner sans émettre de token, le proxy coupe la socket. L'envoi régulier d'un commentaire SSE (ligne débutant par `:`) maintient le canal actif.",
  },
  {
    id: 13,
    question: "Quelle est la principale limite d'évolutivité (scalabilité) horizontale d'une architecture utilisant WebSockets par rapport à SSE déployée sur plusieurs instances de serveurs derrière un équilibreur de charge ?",
    options: [
      { letter: 'A', text: "Les connexions WebSocket sont des sockets TCP persistantes avec état (Stateful) nécessitant des sessions persistantes (Sticky Sessions) ou un bus de messages distribué (Redis Pub/Sub) pour diffuser des événements entre nœuds, tandis que SSE s'intègre naturellement avec le routage HTTP/2 stateless." },
      { letter: 'B', text: "Les WebSockets ne fonctionnent pas sous Linux." },
      { letter: 'C', text: "Les serveurs Node.js ne peuvent pas gérer plus de 10 connexions WebSockets." },
      { letter: 'D', text: "Les WebSockets ne peuvent être configurés qu'en langage Python." },
    ],
    correctAnswers: ['A'],
    explanation: "Un WebSocket est un canal bidirectionnel persistant relié à un serveur physique particulier. Diffuser un message à un client connecté sur un autre serveur exige un broker distribué (ex: Redis Pub/Sub) et complique le scaling. SSE s'intègre plus simplement dans les infrastructures HTTP existantes.",
  },
  {
    id: 14,
    codeSnippet: `// Configuration Nginx devant un serveur SSE Node.js
location /api/ai/stream {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_buffering off;
    proxy_cache off;
    proxy_read_timeout 300s;
}`,
    question: "Pourquoi la directive `proxy_buffering off;` dans la configuration Nginx est-elle indispensable pour le bon fonctionnement d'un streaming SSE ?",
    options: [
      { letter: 'A', text: "Elle désactive le pare-feu matériel de Nginx." },
      { letter: 'B', text: "Elle force Nginx à relayer immédiatement chaque paquet `res.write()` vers le client sans attendre de remplir son tampon mémoire interne de 4 Ko ou 8 Ko." },
      { letter: 'C', text: "Elle compresse le code source de l'application." },
      { letter: 'D', text: "Elle oblige Nginx à utiliser le protocole FTP." },
    ],
    correctAnswers: ['B'],
    explanation: "Par défaut, Nginx stocke les réponses serveur dans un buffer mémoire pour optimiser le transfert réseau. Sans `proxy_buffering off;`, les premiers tokens d'IA restent bloqués dans Nginx et ne sont envoyés à l'utilisateur que par paquets de plusieurs kilo-octets.",
  },
  {
    id: 15,
    question: "Sous le protocole HTTP/1.1 classique dans les navigateurs web, quelle limite sévère s'applique aux connexions persistantes SSE vers un même domaine ?",
    options: [
      { letter: 'A', text: "La vitesse est bridée à 56 kbit/s." },
      { letter: 'B', text: "Les requêtes SSE ne peuvent pas durer plus de 10 secondes au total." },
      { letter: 'C', text: "Le navigateur impose un plafond strict d'environ 6 connexions simultanées par domaine, ce qui peut bloquer les autres requêtes si plusieurs onglets ouverts maintiennent des flux SSE actifs." },
      { letter: 'D', text: "Les réponses sont limitées à 100 mots." },
    ],
    correctAnswers: ['C'],
    explanation: "En HTTP/1.1, les navigateurs limitent les connexions persistantes à 6 par hôte. Si un utilisateur ouvre plusieurs onglets de streaming, le pool de connexions est saturé et bloque toute nouvelle requête. Le passage à HTTP/2 élimine ce problème grâce au multiplexage sur une connexion TCP unique.",
  },
  {
    id: 16,
    codeSnippet: `const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
});

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);`,
    question: "Quel mécanisme de résilience réseau ce code WebSocket implémente-t-il à l'aide de trames `ping/pong` ?",
    options: [
      { letter: 'A', text: "La compression des données graphiques." },
      { letter: 'B', text: "L'évaluation de la vitesse de frappe de l'utilisateur." },
      { letter: 'C', text: "L'augmentation automatique de la bande passante." },
      { letter: 'D', text: "La détection et fermeture des connexions 'mortes' (Broken / Zombie Sockets) causées par des déconnexions silencieuses du client sans fermeture TCP propre (ex: perte brutale de signal Wi-Fi/4G)." },
    ],
    correctAnswers: ['D'],
    explanation: "Si un client perd le réseau sans envoyer de paquet FIN (connexion zombie), le serveur garde la socket ouverte indéfiniment en mémoire. Le pattern de battement de cœur (Heartbeat Ping/Pong) détecte l'absence de réponse et libère la socket avec `terminate()`.",
  },
  {
    id: 17,
    question: "Comment le protocole HTTP/2 résout-il la limitation des 6 connexions simultanées de HTTP/1.1 pour les flux SSE multiples ?",
    options: [
      { letter: 'A', text: "Grâce au multiplexage de flux (Multiplexing) permettant de faire transiter des centaines de flux de requêtes/réponses indépendants sur une seule connexion TCP partagée via des frames binaires." },
      { letter: 'B', text: "En créant 600 interfaces réseau virtuelles sur le client." },
      { letter: 'C', text: "En remplaçant le protocole TCP par le protocole Bluetooth." },
      { letter: 'D', text: "En transférant l'exécution des flux sur les cartes graphiques du serveur." },
    ],
    correctAnswers: ['A'],
    explanation: "HTTP/2 introduit le multiplexage : une seule connexion TCP bidirectionnelle transporte une multitude de flux (Streams) indépendants identifiés par des IDs de flux. Plusieurs onglets peuvent ainsi consommer des flux SSE en parallèle sans saturer le navigateur.",
  },
  {
    id: 18,
    codeSnippet: `const { pipeline } = require('stream/promises');

app.post('/api/ai/transform', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  
  // Comment relier proprement un flux transformateur au client ?
  await pipeline(
    geminiStream,
    customParserTransform,
    res
  );
});`,
    question: "Quel est l'avantage majeur de confier la transmission d'un flux IA à `pipeline()` plutôt que d'enchaîner manuellement des appels `res.write()` ?",
    options: [
      { letter: 'A', text: "L'obligation pour le client de payer en cryptomonnaie." },
      { letter: 'B', text: "La destruction propre de toute la chaîne de flux et la libération immédiate des ressources en amont dès que le client ferme la connexion ou qu'une erreur survient." },
      { letter: 'C', text: "L'élimination des types TypeScript au runtime." },
      { letter: 'D', text: "Le reformatage automatique du texte en markdown." },
    ],
    correctAnswers: ['B'],
    explanation: "`stream.pipeline` assure la gestion robuste de bout en bout : si le client se déconnecte, `pipeline` propage l'interruption à tous les flux de la chaîne (`geminiStream`, `customParserTransform`) et ferme proprement les descripteurs, évitant les fuites mémoires et sockets orphelines.",
  },
  {
    id: 19,
    question: "Dans le cadre de l'ingénierie d'une interface de chat IA en temps réel, qu'appelle-t-on le 'Time To First Token' (TTFT) et comment le streaming l'optimise-t-il ?",
    options: [
      { letter: 'A', text: "Le temps nécessaire pour créer un compte utilisateur dans la base de données." },
      { letter: 'B', text: "La durée de validité du jeton JWT de l'utilisateur." },
      { letter: 'C', text: "Le délai entre l'envoi de la question par l'utilisateur et la réception visuelle du tout premier mot généré, rendant l'interface perçue comme instantanée sans attendre la complétion intégrale de la réponse." },
      { letter: 'D', text: "Le temps d'indexation d'un document dans Qdrant." },
    ],
    correctAnswers: ['C'],
    explanation: "Sans streaming, l'utilisateur attend 5 à 15 secondes devant un spinner avant de recevoir le bloc complet. Avec le streaming SSE, le TTFT est souvent inférieur à 500 ms : les mots s'affichent au rythme de la pensée du modèle, offrant une sensation d'interactivité fluide.",
  },
  {
    id: 20,
    codeSnippet: `// Long Polling Endpoint
app.get('/api/poll/task/:id', async (req, res) => {
  const result = await waitForTaskCompletionOrTimeout(req.params.id, 30000);
  if (result) {
    res.json({ status: 'completed', data: result });
  } else {
    res.status(304).end(); // Non modifié / Timeout atteint
  }
});`,
    question: "Quelle est la caractéristique définissant le 'Long Polling' par opposition au 'Short Polling' traditionnel ?",
    options: [
      { letter: 'A', text: "Le client interroge le serveur toutes les millisecondes avec des requêtes UDP." },
      { letter: 'B', text: "La connexion est établie une fois par an." },
      { letter: 'C', text: "Les requêtes transitent obligatoirement par des câbles sous-marins transatlantiques." },
      { letter: 'D', text: "Le serveur retient la requête HTTP ouverte sans répondre immédiatement jusqu'à ce qu'une nouvelle donnée soit disponible ou qu'un délai de garde (timeout) soit atteint." },
    ],
    correctAnswers: ['D'],
    explanation: "Dans le Long Polling (méthode de type Comet), le serveur ne répond pas tout de suite : il suspend la requête jusqu'à ce qu'un événement survienne (ex: fin d'inférence) ou que le timeout expire (ex: 30s). Le client reçoit la donnée et relance immédiatement une nouvelle requête.",
  },
  {
    id: 21,
    question: "Pourquoi est-il crucial de gérer la 'Contropression' (Backpressure) lors du streaming de réponses d'IA vers un client mobile connecté sur un réseau à faible débit (3G instable) ?",
    options: [
      { letter: 'A', text: "Pour éviter que le serveur n'accumule indéfiniment des tokens générés à haute vitesse dans sa mémoire tampon réseau (RAM) en attendant que le client lent ne les consomme, risquant de saturer le serveur." },
      { letter: 'B', text: "Pour empêcher la batterie du téléphone d'exploser." },
      { letter: 'C', text: "Pour forcer le client à se connecter à un réseau Wi-Fi 6." },
      { letter: 'D', text: "Pour convertir le texte en flux binaire audio." },
    ],
    correctAnswers: ['A'],
    explanation: "Si le modèle produit 100 tokens/seconde et que le client ne peut en absorber que 10, le différentiel s'accumule dans le tampon mémoire du serveur (`res.write()` renvoie `false`). Respecter le backpressure (attendre l'événement `'drain'`) évite de faire déborder la mémoire du serveur.",
  },
  {
    id: 22,
    codeSnippet: `const canContinue = res.write(chunk);
if (!canContinue) {
  // Le tampon réseau est plein !
  // Quel événement faut-il attendre sur l'objet 'res' avant de continuer à écrire ?
}`,
    question: "Quel événement de l'objet `res` (WritableStream) indique que la mémoire tampon de sortie s'est vidée et que l'écriture peut reprendre en toute sécurité ?",
    options: [
      { letter: 'A', text: "res.on('empty')" },
      { letter: 'B', text: "res.on('drain')" },
      { letter: 'C', text: "res.on('flush')" },
      { letter: 'D', text: "res.on('ready')" },
    ],
    correctAnswers: ['B'],
    explanation: "Lorsque `writable.write()` renvoie `false`, cela signifie que le buffer a dépassé `highWaterMark`. Il faut suspendre la production (ex: mettre en pause le flux amont) jusqu'à ce que l'événement `'drain'` soit émis par le flux d'écriture.",
  },
  {
    id: 23,
    question: "Quel en-tête HTTP spécifique permet d'indiquer au client SSE à quel intervalle de temps (en millisecondes) il doit tenter de se reconnecter en cas de perte de connexion réseau ?",
    options: [
      { letter: 'A', text: "timeout: 5000ms" },
      { letter: 'B', text: "reconnect-after: 5s" },
      { letter: 'C', text: "retry: 5000\\n\\n" },
      { letter: 'D', text: "ping-rate: 5" },
    ],
    correctAnswers: ['C'],
    explanation: "Dans le protocole SSE, envoyer la commande `retry: <millisecondes>\\n\\n` informe directement le client `EventSource` du délai d'attente à respecter avant d'initier une tentative de reconnexion automatique (par défaut généralement 3 secondes).",
  },
  {
    id: 24,
    codeSnippet: `// Parsing manuel d'un flux SSE côté client
function parseSseLines(rawText: string) {
  const lines = rawText.split('\\n');
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const jsonStr = line.slice(6);
      console.log('Payload:', jsonStr);
    }
  }
}`,
    question: "Quelle faille potentielle d'analyse ce découpage naïf `rawText.split('\\n')` comporte-t-il si un chunk TCP coupe une ligne SSE en plein milieu d'un mot ?",
    options: [
      { letter: 'A', text: "Une surcharge de la mémoire du processeur." },
      { letter: 'B', text: "Une erreur de parsing JSON si la fin de la ligne n'est pas encore arrivée dans le chunk courant (fragmentation de paquets TCP)." },
      { letter: 'C', text: "La fermeture immédiate de la session utilisateur." },
      { letter: 'D', text: "La transformation du texte en majuscules." },
    ],
    correctAnswers: ['D'],
    explanation: "Les paquets TCP ne respectent pas les frontières applicatives : un paquet réseau peut s'arrêter au beau milieu d'une ligne data: {'to'. Un parser SSE professionnel doit conserver les fragments incomplets dans un tampon d'attente jusqu'à l'arrivée du caractère \\n suivant.",
  },
  {
    id: 25,
    question: "Dans le protocole WebSocket, que représente une trame de contrôle 'Close Frame' (Opcode 0x8) ?",
    options: [
      { letter: 'A', text: "Une trame envoyée par l'un des pairs pour négocier la fermeture gracieuse de la connexion avec un code de statut (ex: 1000 Normal Closure, 1006 Abnormal) et une raison textuelle." },
      { letter: 'B', text: "Une trame servant à changer le thème visuel du site." },
      { letter: 'C', text: "Une commande demandant de supprimer la base de données." },
      { letter: 'D', text: "Une trame forçant l'extinction du serveur web." },
    ],
    correctAnswers: ['A'],
    explanation: "Une Close Frame (0x8) amorce la fermeture propre de la session WebSocket (Handshake de fermeture). Elle transporte un code numérique de deux octets (RFC 6455, ex: 1000 pour une fermeture normale, 1008 pour violation de politique) permettant au client et au serveur de convenir de la fin de l'échange.",
  },
  {
    id: 26,
    codeSnippet: `import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  // Comment authentifier avant d'autoriser l'upgrade ?
  if (!isValidToken(request)) {
    socket.write('HTTP/1.1 401 Unauthorized\\r\\n\\r\\n');
    socket.destroy();
    return;
  }
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});`,
    question: "Pourquoi est-il préférable d'utiliser l'option `noServer: true` avec interception de l'événement `'upgrade'` pour gérer l'authentification des WebSockets sous Node.js ?",
    options: [
      { letter: 'A', text: "Pour empêcher les navigateurs d'utiliser des cookies." },
      { letter: 'B', text: "Pour inspecter les en-têtes HTTP, cookies ou tokens avant que le handshake WebSocket ne soit accepté, et rejeter les utilisateurs non authentifiés avec un code HTTP 401 standard sans consommer de ressources de socket WebSocket." },
      { letter: 'C', text: "Parce que le module `ws` ne fonctionne pas sur le port 80." },
      { letter: 'D', text: "Pour convertir la socket en protocole FTP." },
    ],
    correctAnswers: ['B'],
    explanation: "Une fois le handshake WebSocket validé, le protocole bascule en trames et ne permet plus d'envoyer de code de statut HTTP conventionnel. L'événement `'upgrade'` permet d'intercepter la requête HTTP initiale pour vérifier les identifiants et renvoyer un code 401/403 propre en cas de rejet.",
  },
  {
    id: 27,
    question: "Quel composant d'infrastructure réseau moderne permet de diffuser des notifications en streaming SSE à des millions d'utilisateurs connectés sans surcharger les serveurs applicatifs Node.js ?",
    options: [
      { letter: 'A', text: "Un serveur DNS primaire." },
      { letter: 'B', text: "Une base de données SQLite sur carte SD." },
      { letter: 'C', text: "Un CDN (Content Delivery Network) ou Edge Gateway supportant le streaming HTTP/2 (ex: Cloudflare Workers, Fastly, AWS CloudFront)." },
      { letter: 'D', text: "Un câble série RS-232." },
    ],
    correctAnswers: ['C'],
    explanation: "Les plateformes Edge modernes (Cloudflare, Fastly) terminent les connexions TLS au plus près des utilisateurs et gèrent la persistance des sockets HTTP/2. Elles relaient les flux SSE du serveur backend central avec un impact minimal sur la mémoire vive de l'infrastructure d'origine.",
  },
  {
    id: 28,
    codeSnippet: `const controller = new AbortController();

const res = await fetch('/api/ai/stream', {
  method: 'POST',
  signal: controller.signal,
  body: JSON.stringify({ prompt: 'Génère un long poème' })
});

// Annulation par l'utilisateur après 2 secondes
setTimeout(() => {
  controller.abort();
}, 2000);`,
    question: "Quel est l'effet de `controller.abort()` sur la requête de streaming en cours côté client et réseau ?",
    options: [
      { letter: 'A', text: "La requête continue en arrière-plan sans rien changer." },
      { letter: 'B', text: "Le navigateur réinitialise tous les mots de passe enregistrés." },
      { letter: 'C', text: "L'ordinateur se met en veille prolongée." },
      { letter: 'D', text: "La promesse `fetch` ou la lecture du `ReadableStream` est immédiatement rejetée avec une exception de type `AbortError`, et la connexion TCP sous-jacente est close." },
    ],
    correctAnswers: ['D'],
    explanation: "`AbortController` est l'API standard du Web pour annuler des opérations asynchrones. L'appel à `.abort()` rompt immédiatement la liaison réseau, lève une `AbortError` et déclenche l'événement `'close'` sur le serveur backend.",
  },
  {
    id: 29,
    question: "Dans le cadre de l'OWASP, quel risque de sécurité spécifique doit être surveillé lors de l'affichage en direct des fragments de texte bruts reçus via SSE dans une application React ?",
    options: [
      { letter: 'A', text: "Une attaque par injection Cross-Site Scripting (XSS) si les fragments HTML/Markdown ne sont pas assainis avant leur insertion dans le DOM." },
      { letter: 'B', text: "La désinstallation automatique de Node.js sur le serveur." },
      { letter: 'C', text: "Le chiffrement imprévu du disque dur local." },
      { letter: 'D', text: "La baisse de la luminosité de l'écran." },
    ],
    correctAnswers: ['A'],
    explanation: "Si le LLM génère (ou reflète suite à une injection de prompt) des balises malveillantes comme `<img src=x onerror=alert(1)>` et que l'interface React les injecte sans assainissement (`rehype-sanitize` ou `DOMPurify`), cela conduit directement à l'exécution de code XSS dans la session de l'utilisateur.",
  },
  {
    id: 30,
    codeSnippet: `// Formatage d'un événement SSE d'erreur structuré
res.write(\`event: error\\ndata: \${JSON.stringify({ code: 'RATE_LIMIT', message: 'Quota dépassé' })}\\n\\n\`);
res.end();`,
    question: "Pourquoi est-il recommandé d'utiliser un événement personnalisé `event: error` pour transmettre une erreur métier survenant au milieu d'un flux SSE plutôt que de modifier le code de statut HTTP ?",
    options: [
      { letter: 'A', text: "Parce que le protocole HTTP interdit les codes d'erreur 400 et 500." },
      { letter: 'B', text: "Parce qu'une fois que les en-têtes HTTP 200 ont été envoyés avec le premier chunk, il est techniquement impossible de changer le code de statut HTTP rétroactivement pour signaler un échec survenu en cours d'inférence." },
      { letter: 'C', text: "Parce que le client refuse d'afficher les messages contenant le mot 'error'." },
      { letter: 'D', text: "Pour empêcher les robots d'indexation de voir l'application." },
    ],
    correctAnswers: ['B'],
    explanation: "Dès que le serveur appelle `res.writeHead(200)` et expédie le premier paquet, la transaction HTTP est scellée en statut 200. Si l'API d'IA plante au milieu du stream, le seul moyen de prévenir le client consiste à émettre un événement applicatif typé (ex: `event: error`).",
  },
  {
    id: 31,
    question: "Quelle méthode permet à un serveur Node.js de vérifier qu'une socket cliente est toujours vivante avant d'émettre des données coûteuses sur une connexion SSE longue ?",
    options: [
      { letter: 'A', text: "Envoyer un e-mail à l'adresse IP du client." },
      { letter: 'B', text: "Consulter la base de données MySQL." },
      { letter: 'C', text: "Vérifier la propriété `res.writableEnded` et écouter l'événement `res.on('close')`." },
      { letter: 'D', text: "Mesurer la tension électrique de la prise secteur." },
    ],
    correctAnswers: ['C'],
    explanation: "L'objet réponse Express/HTTP expose des drapeaux comme `res.writableEnded` ou `res.destroyed`. De plus, enregistrer un listener sur `req.on('close')` permet de flagger immédiatement la socket comme morte dès la rupture du canal.",
  },
  {
    id: 32,
    codeSnippet: `import { WebSocket } from 'ws';

const ws = new WebSocket('wss://api.example.com/ws');

ws.on('open', () => {
  ws.send(JSON.stringify({ action: 'subscribe', channel: 'ai_updates' }));
});`,
    question: "Dans cette implémentation client WebSocket, que garantit l'utilisation du protocole `wss://` par rapport à `ws://` ?",
    options: [
      { letter: 'A', text: "Elle désactive la vérification des mots de passe." },
      { letter: 'B', text: "Elle augmente la vitesse de transmission par 10." },
      { letter: 'C', text: "Elle force l'ordinateur à utiliser une connexion filaire." },
      { letter: 'D', text: "Elle garantit que la communication est entièrement chiffrée de bout en bout via TLS (Transport Layer Security), protégeant les données contre les écoutes illicites et facilitant la traversée des proxies web stricts." },
    ],
    correctAnswers: ['D'],
    explanation: "`wss://` est l'équivalent de HTTPS pour les WebSockets. L'encapsulation TLS chiffre les trames de bout en bout, empêchant les attaques par écoute (Man-in-the-Middle) et évitant que des proxys d'entreprise non compatibles ne bloquent ou ne corrompent les trames HTTP Upgrade non chiffrées.",
  },
  {
    id: 33,
    question: "Pourquoi les messages SSE doivent-ils obligatoirement être encodés en texte UTF-8 et ne peuvent-ils pas transporter des données binaires brutes (comme des octets de fichiers audio MP3) sans encodage préalable ?",
    options: [
      { letter: 'A', text: "Parce que le standard SSE du W3C est exclusivement textuel : tout contenu binaire doit être préalablement encodé en Base64 ou en hexadécimal pour voyager dans le champ `data:`." },
      { letter: 'B', text: "Parce que les octets binaires sont toxiques pour les cartes réseaux." },
      { letter: 'C', text: "Parce que Node.js ne sait pas lire le binaire." },
      { letter: 'D', text: "Pour limiter la consommation de disques durs des utilisateurs." },
    ],
    correctAnswers: ['A'],
    explanation: "La spécification W3C pour Server-Sent Events impose un format textuel basé sur des lignes délimitées par `\\n`. Les octets binaires peuvent contenir des octets `0x0A` (`\\n`) qui briseraient le protocole de cadrage : ils doivent donc être encodés en Base64 avant transmission.",
  },
  {
    id: 34,
    codeSnippet: `// Configuration de compression avec Express et SSE
import compression from 'compression';

app.use(compression({
  filter: (req, res) => {
    if (req.headers.accept === 'text/event-stream') {
      return false; // Désactiver la compression pour SSE
    }
    return compression.filter(req, res);
  }
}));`,
    question: "Pourquoi est-il crucial de DÉSACTIVER la compression Gzip/Deflate (ou d'utiliser `res.flush()`) sur les routes d'API diffusant du SSE ?",
    options: [
      { letter: 'A', text: "Parce que le navigateur refuse d'exécuter du JavaScript compressé." },
      { letter: 'B', text: "Parce que les algorithmes de compression par blocs accumulent les données en mémoire tampon pour les compresser ensemble, retenant les tokens au lieu de les expédier immédiatement en direct au client." },
      { letter: 'C', text: "Parce que la compression augmente la taille des textes courts de 500%." },
      { letter: 'D', text: "Parce que Gzip efface les clés d'API des en-têtes HTTP." },
    ],
    correctAnswers: ['B'],
    explanation: "Gzip fonctionne en analysant des blocs de données pour trouver des répétitions. Si la compression est active sur une route SSE sans vidage forcé (`flush()`), le middleware retient les tokens en mémoire en attendant d'en avoir assez pour former un bloc compressible, gelant l'affichage fluide.",
  },
  {
    id: 35,
    question: "Dans le protocole WebSocket, à quoi sert le mécanisme de 'Masquage' (Masking) appliqué à toutes les trames envoyées par le client vers le serveur à l'aide d'une clé de masque 32-bit aléatoire (`Masking-key`) ?",
    options: [
      { letter: 'A', text: "À crypter les données contre les pirates de manière incassable." },
      { letter: 'B', text: "À réduire le coût de la bande passante." },
      { letter: 'C', text: "À empêcher les attaques par empoisonnement de cache (Cache Poisoning) sur les serveurs mandataires (proxies) transparents mal configurés qui interpréteraient à tort les données WebSocket comme du trafic HTTP standard." },
      { letter: 'D', text: "À dissimuler l'adresse IP de l'utilisateur." },
    ],
    correctAnswers: ['C'],
    explanation: "Le masquage côté client (requis par la RFC 6455) applique un XOR avec une clé aléatoire sur chaque payload envoyé au serveur. Cela empêche un script malveillant dans un navigateur de forger des séquences ressemblant à des en-têtes HTTP valides pour empoisonner les caches des proxys intermédiaires.",
  },
  {
    id: 36,
    codeSnippet: `// Émission d'un token avec métadonnées
const payload = {
  token: "intelligence",
  index: 4,
  usage: { promptTokens: 12, completionTokens: 5 }
};
res.write(\`data: \${JSON.stringify(payload)}\\n\\n\`);`,
    question: "Quel est l'avantage de sérialiser un objet JSON complet dans la ligne `data:` du flux SSE plutôt que d'envoyer la chaîne de texte brute seule ?",
    options: [
      { letter: 'A', text: "Cela réduit la consommation électrique du processeur du client." },
      { letter: 'B', text: "Cela évite de devoir payer les taxes sur les télécommunications." },
      { letter: 'C', text: "Cela permet de contourner le pare-feu du système d'exploitation." },
      { letter: 'D', text: "Cela permet de véhiculer conjointement avec chaque token des métadonnées riches (comme le décompte de tokens, l'ID de message, le statut d'achèvement ou des sources de citations) exploitables directement par l'UI." },
    ],
    correctAnswers: ['D'],
    explanation: "Encapsuler chaque émission dans un objet JSON structuré permet au client de distinguer les morceaux de texte, les décomptes d'usage de tokens en temps réel, les métadonnées de citations ou les signaux de fin de génération au sein du même canal applicatif.",
  },
  {
    id: 37,
    question: "Quelle est la méthode recommandée pour sécuriser l'accès à un flux SSE privé dans une application web dont le client utilise `fetch` avec `ReadableStream` ?",
    options: [
      { letter: 'A', text: "Transmettre un jeton JWT valide dans l'en-tête HTTP standard `Authorization: Bearer <token>` ou via un cookie de session sécurisé `HttpOnly`." },
      { letter: 'B', text: "Désactiver les ports de communication du serveur." },
      { letter: 'C', text: "Demander à l'utilisateur de cliquer 5 fois sur le logo." },
      { letter: 'D', text: "Écrire le mot de passe de l'administrateur dans le nom du fichier." },
    ],
    correctAnswers: ['A'],
    explanation: "Comme `fetch` permet de configurer les en-têtes de requête en toute liberté (contrairement à l'élément `EventSource` natif), la transmission du jeton JWT dans le header `Authorization` (ou l'envoi d'un cookie de session sécurisé `HttpOnly; SameSite=Strict`) garantit une authentification robuste.",
  },
  {
    id: 38,
    codeSnippet: `// Traitement d'un flux avec transformateur pour filtrage de mots sensibles
import { Transform } from 'stream';

const filterTransform = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString();
    const sanitized = text.replace(/confidentiel/gi, '[MASQUÉ]');
    callback(null, sanitized);
  }
});`,
    question: "Dans une architecture backend de streaming, à quel moment ce flux transformateur (Transform Stream) s'intercale-t-il idéalement ?",
    options: [
      { letter: 'A', text: "Dans le BIOS de l'ordinateur avant le démarrage de l'OS." },
      { letter: 'B', text: "Entre le flux de sortie du modèle d'IA et le flux d'écriture réseau envoyé au client, assainissant les données au vol sans interrompre la dynamique de streaming." },
      { letter: 'C', text: "Dans le composant CSS de React." },
      { letter: 'D', text: "Après la fermeture définitive de la connexion réseau." },
    ],
    correctAnswers: ['B'],
    explanation: "Un `Transform Stream` est à la fois lisible et inscriptible. En le connectant via un pipeline entre la source d'inférence et la réponse HTTP, chaque fragment textuel est inspecté et modifié à la volée avant son expédition réseau, sans nécessiter d'attendre la complétion intégrale.",
  },
  {
    id: 39,
    question: "Pourquoi est-il impératif d'appeler `res.end()` à la fin d'une transmission en streaming SSE sous Node.js ?",
    options: [
      { letter: 'A', text: "Pour supprimer l'application du serveur." },
      { letter: 'B', text: "Pour forcer le client à se déconnecter d'Internet." },
      { letter: 'C', text: "Pour avertir le client que le flux de données est parachevé et clore proprement la transaction HTTP, libérant la socket et évitant de laisser la connexion indéfiniment suspendue." },
      { letter: 'D', text: "Pour vider la corbeille du système de fichiers." },
    ],
    correctAnswers: ['C'],
    explanation: "`res.end()` signale à Node.js et au client HTTP que toutes les données ont été écrites. Sans cet appel, le client reste indéfiniment en attente de nouveaux paquets, retenant des ressources mémoires des deux côtés de la connexion.",
  },
  {
    id: 40,
    codeSnippet: `// Exemple de réponse SSE avec plusieurs champs
res.write(\`id: msg_42\\nevent: update\\ndata: {"status": "in_progress"}\\n\\n\`);`,
    question: "Dans quel ordre le client interprète-t-il les champs `id`, `event` et `data` reçus dans ce bloc d'événement SSE ?",
    options: [
      { letter: 'A', text: "Il renvoie immédiatement le bloc au serveur en boucle infinie." },
      { letter: 'B', text: "Il ignore tous les champs sauf `data`." },
      { letter: 'C', text: "Il plante avec une erreur de syntaxe." },
      { letter: 'D', text: "Il met à jour le Last-Event-ID à 'msg_42', identifie l'événement comme étant de type 'update' et délivre l'objet parsé aux écouteurs enregistrés sur ce type d'événement dès la lecture du double saut de ligne final." },
    ],
    correctAnswers: ['D'],
    explanation: "Selon la norme SSE, le client enregistre l'identifiant pour la persistance de reconnexion (`id`), cible les écouteurs associés au nom d'événement fourni (`event`), et déclenche le callback avec le contenu de `data` dès que la ligne vide (`\\n\\n`) clôt le bloc.",
  },
];
