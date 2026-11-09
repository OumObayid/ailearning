import { ExamMetadata, ExamQuestion } from './types';

export const DEBUGGING_MODULE_7_EXAM_METADATA: ExamMetadata = {
  moduleId: 'debugging-module-7',
  title: "Examen de Certification — Module 7 : Projet final : Audit, diagnostic et correction d'une application complète",
  durationMinutes: 50,
  passingScorePercent: 80, // Seuil de réussite à 80% (16/20)
  totalQuestions: 20,
};

export const DEBUGGING_MODULE_7_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Inspection Architecturale (Q1 - Q2)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Dans une architecture Web complète (React, Express, MySQL, JWT, Multer, Gemini API), pourquoi est-il formellement proscrit de commencer à modifier le code dès qu'une erreur HTTP 500 est constatée ?",
    options: [
      { letter: 'A', text: "Parce qu'Express interdit les modifications de fichiers sans redémarrer le système d'exploitation." },
      { letter: 'B', text: "Parce qu'une erreur 500 est un symptôme de surface qui peut provenir de multiples composants (contrôleur, repository, base MySQL, payload multipart Multer ou service IA) ; il faut d'abord cartographier le flux d'exécution et les responsabilités." },
      { letter: 'C', text: "Parce que le navigateur client met automatiquement le code en cache pendant 24 heures." },
      { letter: 'D', text: "Parce que MySQL supprime les tables en cas de modification concurrente." },
    ],
    correctAnswers: ['B'],
    explanation: "Une inspection méthodique préalable permet de comprendre le chemin réel de la requête (Request Path) et de localiser précisément l'étage défaillant avant toute altération du code source.",
  },
  {
    id: 2,
    question: "Lorsqu'un utilisateur téléverse un document PDF pour analyse IA et reçoit une erreur, quel chemin d'exécution logique la requête traverse-t-elle successivement ?",
    options: [
      { letter: 'A', text: "React Form -> Base MySQL -> API Gemini -> Express Router -> Navigateur." },
      { letter: 'B', text: "React Formulaire -> Requête HTTP multipart/form-data -> Route Express -> Middleware Multer -> Contrôleur -> Service métier -> Persistance MySQL -> Service IA (Gemini) -> Réponse JSON." },
      { letter: 'C', text: "React -> Multer -> Vite Dev Server -> Terminal Linux." },
      { letter: 'D', text: "MySQL Workbench -> Postman -> Docker -> React." },
    ],
    correctAnswers: ['B'],
    explanation: "Le flux traverse le transport réseau, le middleware de décompression de fichiers (Multer), la couche de contrôle, la logique métier, la persistance locale et enfin l'appel réseau vers l'API externe d'intelligence artificielle.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Typologie des Anomalies & Priorisation (Q3 - Q4)
  // -------------------------------------------------------------
  {
    id: 3,
    question: "Quelle anomalie relève principalement de la catégorie 'Sécurité' et doit être traitée avec la plus haute priorité (P1 - Critique) ?",
    options: [
      { letter: 'A', text: "Un bouton du frontend dont le texte dépasse légèrement sur écran mobile." },
      { letter: 'B', text: "Une route d'API retournant les commandes privées d'un utilisateur sans vérifier le token JWT ni l'appartenance de la ressource (vulnérabilité IDOR/BOLA)." },
      { letter: 'C', text: "Une requête SQL mettant 120 ms à s'exécuter au lieu de 40 ms." },
      { letter: 'D', text: "Une faute d'orthographe dans un commentaire de code backend." },
    ],
    correctAnswers: ['B'],
    explanation: "Les failles de contrôle d'accès (IDOR/BOLA) permettent à un attaquant d'exfiltrer les données personnelles d'autrui. Elles compromettent directement la confidentialité et la conformité légale (RGPD) et sont classées P1.",
  },
  {
    id: 4,
    question: "Dans un registre d'anomalies professionnel, quelle est la distinction fondamentale entre la 'Gravité' (Severity) et la 'Priorité' (Priority) ?",
    options: [
      { letter: 'A', text: "La gravité et la priorité sont des termes strictement synonymes." },
      { letter: 'B', text: "La gravité mesure l'impact destructeur ou sécuritaire du bug sur le système, tandis que la priorité définit l'ordre d'urgence opérationnel de sa remédiation en tenant compte des dépendances et du contexte métier." },
      { letter: 'C', text: "La gravité est calculée par Git et la priorité est calculée par TypeScript." },
      { letter: 'D', text: "La priorité ne concerne que le frontend et la gravité ne concerne que le backend." },
    ],
    correctAnswers: ['B'],
    explanation: "Un bug peut être d'une extrême gravité technique mais de priorité modérée s'il touche une fonctionnalité expérimentale désactivée, ou inversement de faible gravité technique mais de priorité P1 s'il bloque le logo de facturation lors d'un lancement presse.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Reproduction & Préconditions (Q5 - Q6)
  // -------------------------------------------------------------
  {
    id: 5,
    question: "Pourquoi est-il indispensable d'isoler les tests d'API dans Postman ou curl avant d'accuser le frontend React d'une anomalie ?",
    options: [
      { letter: 'A', text: "Parce que React ne supporte pas les méthodes GET et POST." },
      { letter: 'B', text: "Pour décorréler le backend du comportement de l'interface graphique : si l'API échoue avec les mêmes paramètres dans Postman, le bug est formellement situé côté serveur." },
      { letter: 'C', text: "Pour contourner le pare-feu du système d'exploitation." },
      { letter: 'D', text: "Pour forcer le serveur MySQL à vider son cache tampon." },
    ],
    correctAnswers: ['B'],
    explanation: "Tester directement l'endpoint élimine les variables parasites liées au DOM, à la sérialisation JavaScript du navigateur ou aux effets de bord des hooks React, fournissant une preuve reproductible et mesurable.",
  },
  {
    id: 6,
    question: "Qu'est-ce qui caractérise un bug intermittent par rapport à un bug systématique et quelle approche d'investigation exige-t-il ?",
    options: [
      { letter: 'A', text: "Le bug intermittent se produit à 100 % des appels et nécessite un simple redémarrage." },
      { letter: 'B', text: "Le bug intermittent ne se produit que sous certaines conditions particulières (concurrence, charge, timeout réseau, fuite mémoire progressive) ; il exige une journalisation fine avec Request ID et horodatage milliseconde." },
      { letter: 'C', text: "Le bug intermittent ne concerne que les bases de données SQLite." },
      { letter: 'D', text: "Le bug intermittent disparaît dès qu'on le signale au chef de projet." },
    ],
    correctAnswers: ['B'],
    explanation: "Les bugs intermittents ne peuvent pas être résolus par intuition. Ils nécessitent une instrumentation poussée (logs structurés, métriques de latence, traces distribuées) pour capturer les conditions exactes au moment de leur manifestation.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Logs Structurés & Corrélation (Q7 - Q8)
  // -------------------------------------------------------------
  {
    id: 7,
    question: "Quel avantage déterminant apporte l'utilisation d'un logger structuré JSON (ex: Pino ou Winston) par rapport à de simples 'console.log' ?",
    options: [
      { letter: 'A', text: "Il accélère la vitesse de la connexion Internet." },
      { letter: 'B', text: "Il génère des événements indexables contenant des métadonnées typées (timestamp ISO, niveau, pid, requestId, userId), facilitant le filtrage automatique et l'agrégation dans Grafana Loki ou Elasticsearch." },
      { letter: 'C', text: "Il supprime automatiquement les erreurs 404 du serveur." },
      { letter: 'D', text: "Il remplace le besoin de tester le code." },
    ],
    correctAnswers: ['B'],
    explanation: "Les logs JSON structurés transforment du texte brut informe en flux de données télémétriques analysables par des moteurs de recherche de logs, permettant de corréler des millions d'événements en quelques millisecondes.",
  },
  {
    id: 8,
    question: "À quoi sert un identifiant de corrélation (Correlation ID ou Request ID) injecté dans le middleware d'une application Express ?",
    options: [
      { letter: 'A', text: "À remplacer le mot de passe de l'utilisateur." },
      { letter: 'B', text: "À associer un identifiant unique à chaque requête entrante et à le propager à travers tous les logs (route, middleware, repository, appel externe Gemini) pour reconstituer sa trajectoire complète en cas d'erreur." },
      { letter: 'C', text: "À chiffrer les tables du disque dur." },
      { letter: 'D', text: "À réduire la taille des fichiers CSS." },
    ],
    correctAnswers: ['B'],
    explanation: "Lorsque des centaines d'utilisateurs exécutent des requêtes simultanées, le Request ID permet d'isoler instantanément tous les messages de logs relatifs à une seule transaction sans mélange.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Root Cause Analysis (RCA) (Q9 - Q10)
  // -------------------------------------------------------------
  {
    id: 9,
    question: "Dans le cadre d'un audit logiciel, pourquoi l'application d'un opérateur d'optional chaining (user?.email) est-elle souvent qualifiée de 'correction superficielle' ?",
    options: [
      { letter: 'A', text: "Parce que l'opérateur '?.' est rejeté par Node.js 22." },
      { letter: 'B', text: "Parce qu'elle empêche le plantage immédiat (symptôme) mais retourne une réponse HTTP 200 avec des champs vides ({ email: undefined }), violant le contrat d'API REST qui exige de renvoyer un statut 404 Not Found." },
      { letter: 'C', text: "Parce qu'elle supprime définitivement l'utilisateur de MySQL." },
      { letter: 'D', text: "Parce qu'elle oblige à réinstaller le système d'exploitation." },
    ],
    correctAnswers: ['B'],
    explanation: "Masquer une exception sans traiter la cause métier induit en erreur les applications clientes. Un bon diagnostic traite la cause fondamentale en gérant explicitement l'absence de données (HTTP 404).",
  },
  {
    id: 10,
    question: "Comment la méthode des '5 Pourquoi' permet-elle de remonter du symptôme 'Crash HTTP 500 sur GET /api/orders/:id' à la cause racine fondamentale ?",
    options: [
      { letter: 'A', text: "En redémarrant cinq fois le service Express." },
      { letter: 'B', text: "En interrogeant la chaîne causale : 500 -> TypeError sur order.id -> order vaut undefined -> findById ne trouve aucune ligne -> l'application n'a pas implémenté de branche conditionnelle pour le cas 'commande inexistante'." },
      { letter: 'C', text: "En demandant l'avis à 5 développeurs différents." },
      { letter: 'D', text: "En créant 5 bases de données de secours." },
    ],
    correctAnswers: ['B'],
    explanation: "La méthode décompose la séquence causale jusqu'à localiser l'omission conceptuelle dans l'architecture ou le code, permettant une remédiation définitive et pérenne.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Plan de Correction & Périmètre (Q11 - Q12)
  // -------------------------------------------------------------
  {
    id: 11,
    question: "Pourquoi un plan de remédiation rigoureux doit-il définir explicitement la liste des 'fichiers autorisés' avant d'autoriser un agent IA à intervenir ?",
    options: [
      { letter: 'A', text: "Pour éviter que le processeur du serveur ne surchauffe." },
      { letter: 'B', text: "Pour appliquer le principe du moindre privilège et confiner l'intervention au fichier cible, empêchant l'agent d'altérer la configuration (.env), le schéma SQL ou d'autres services par effet de bord." },
      { letter: 'C', text: "Parce que Git ne supporte que 3 fichiers par commit." },
      { letter: 'D', text: "Pour obliger l'agent à traduire le code en anglais." },
    ],
    correctAnswers: ['B'],
    explanation: "Restreindre le périmètre d'écriture protège l'intégrité de la base de code et garantit que chaque patch reste minimal, inspectable et facilement réversible en cas d'imprévu.",
  },
  {
    id: 12,
    question: "Que doit systématiquement comporter chaque fiche de correction d'un plan de remédiation avant validation humaine ?",
    options: [
      { letter: 'A', text: "L'identifiant du bug, la cause racine confirmée, le comportement attendu, les fichiers autorisés, l'analyse d'impact/risques et les tests de validation requis." },
      { letter: 'B', text: "Uniquement le nom de la branche Git." },
      { letter: 'C', text: "Une capture d'écran de l'ordinateur portable du testeur." },
      { letter: 'D', text: "La liste de tous les paquets présents dans node_modules." },
    ],
    correctAnswers: ['A'],
    explanation: "Une fiche complète fournit tous les éléments de traçabilité nécessaires à l'auditeur pour juger de la pertinence de la correction et des conditions requises pour son acceptation.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Correction Progressive & Git Diff (Q13 - Q14)
  // -------------------------------------------------------------
  {
    id: 13,
    question: "Pourquoi est-il préconisé de corriger les anomalies de manière strictement progressive (une anomalie à la fois) dans une branche dédiée plutôt qu'en bloc ?",
    options: [
      { letter: 'A', text: "Pour multiplier artificiellement le nombre de commits sur GitHub." },
      { letter: 'B', text: "Pour isoler chaque modification avec son 'git diff' unitaire, exécuter les tests correspondants et éviter l'entrelacement de régressions insolubles entre plusieurs composants." },
      { letter: 'C', text: "Parce que TypeScript ne peut compiler qu'une seule fonction par heure." },
      { letter: 'D', text: "Parce que MySQL refuse les commits de plus de 10 lignes." },
    ],
    correctAnswers: ['B'],
    explanation: "La granularité unitaire permet d'identifier immédiatement quelle ligne de code a introduit une anomalie si la suite de tests échoue après un patch.",
  },
  {
    id: 14,
    question: "Dans le contrôle qualité d'un patch produit par un agent IA, que doit-on vérifier en priorité lors de la lecture de 'git diff' ?",
    options: [
      { letter: 'A', text: "Que la taille du fichier est un nombre pair." },
      { letter: 'B', text: "Qu'aucune modification hors périmètre n'a été insérée, qu'aucun secret n'a fuité et que le patch ne supprime pas de code utile ou de vérifications de sécurité existantes." },
      { letter: 'C', text: "Que tous les commentaires ont été supprimés." },
      { letter: 'D', text: "Que toutes les variables ont été renommées avec des chiffres." },
    ],
    correctAnswers: ['B'],
    explanation: "La revue de code assistée par diff est le dernier rempart humain avant intégration. Elle garantit la propreté, la conformité architecturale et la sécurité de l'intervention.",
  },

  // -------------------------------------------------------------
  // SECTION 8 : Tests Unitaires, Intégration & Mocks (Q15 - Q16)
  // -------------------------------------------------------------
  {
    id: 15,
    question: "Pourquoi est-il impératif de simuler (mocker avec vi.fn()) les appels à l'API Gemini lors des tests unitaires et d'intégration automatisés du backend ?",
    options: [
      { letter: 'A', text: "Parce que Google interdit d'utiliser des API dans des fichiers TypeScript." },
      { letter: 'B', text: "Pour garantir des tests rapides, déterministes, reproductibles hors ligne et sans coût financier, tout en simulant à volonté les scénarios extrêmes (timeout réseau, erreur 503, payload invalide)." },
      { letter: 'C', text: "Parce que Vitest ne sait pas exécuter de requêtes réseau." },
      { letter: 'D', text: "Parce que l'API Gemini ne fonctionne qu'en production." },
    ],
    correctAnswers: ['B'],
    explanation: "Un test automatisé ne doit jamais dépendre de la disponibilité du réseau mondial ni consommer des quotas payants. Les mocks permettent de tester de manière exhaustive la résilience face aux pannes tierces.",
  },
  {
    id: 16,
    question: "Quelle bibliothèque permet de tester directement les routes Express en envoyant de vraies requêtes HTTP virtuelles sans avoir à lier le serveur à un port réseau physique ?",
    options: [
      { letter: 'A', text: "Supertest" },
      { letter: 'B', text: "Nodemon" },
      { letter: 'C', text: "Tailwind CSS" },
      { letter: 'D', text: "Webpack" },
    ],
    correctAnswers: ['A'],
    explanation: "Supertest s'intègre parfaitement avec Vitest/Jest pour exécuter l'application Express en mémoire via la couche interne de Node.js, mesurant les codes de statut HTTP, headers et payloads avec une vitesse maximale.",
  },

  // -------------------------------------------------------------
  // SECTION 9 : Stratégie de Non-Régression (Q17 - Q18)
  // -------------------------------------------------------------
  {
    id: 17,
    question: "Qu'est-ce qu'une régression logicielle et comment la prévenir efficacement après la correction d'une anomalie sur l'authentification ?",
    options: [
      { letter: 'A', text: "Une régression est une accélération de la base de données ; on la prévient en supprimant les index." },
      { letter: 'B', text: "Une régression est la dégradation accidentelle d'une fonctionnalité précédemment opérationnelle ; on la prévient en exécutant une matrice de tests de non-régression couvrant les cas dépendants (connexion, accès aux routes protégées, expiration de token)." },
      { letter: 'C', text: "Une régression est le passage d'une version de Node.js à une version plus ancienne." },
      { letter: 'D', text: "Une régression désigne un fichier sans extension." },
    ],
    correctAnswers: ['B'],
    explanation: "Un système complexe est un réseau d'interdépendances. Corriger la connexion peut affecter le middleware JWT. La suite de non-régression s'assure que tout l'écosystème reste stable.",
  },
  {
    id: 18,
    question: "Quelle distinction fondamentale de code HTTP doit impérativement être vérifiée dans les tests de non-régression de sécurité de l'API ?",
    options: [
      { letter: 'A', text: "La différence entre 200 OK et 201 Created." },
      { letter: 'B', text: "La différence entre 401 Unauthorized (absence ou invalidité de jeton JWT) et 403 Forbidden (utilisateur authentifié mais n'ayant pas les droits d'accéder à la ressource d'un tiers)." },
      { letter: 'C', text: "La différence entre 301 Moved Permanently et 302 Found." },
      { letter: 'D', text: "La différence entre GET et POST." },
    ],
    correctAnswers: ['B'],
    explanation: "401 signale un défaut d'identité (non authentifié). 403 signale un défaut de privilège ou de propriété d'objet (non autorisé / IDOR). Respecter cette sémantique est essentiel pour la sécurité.",
  },

  // -------------------------------------------------------------
  // SECTION 10 : Audit Final, Couverture & Homologation (Q19 - Q20)
  // -------------------------------------------------------------
  {
    id: 19,
    question: "Pourquoi un taux de couverture de code (Code Coverage) de 100 % ne garantit-il pas mathématiquement l'absence totale de bugs dans l'application ?",
    options: [
      { letter: 'A', text: "Parce que Vitest tronque les nombres décimaux." },
      { letter: 'B', text: "Parce que la couverture mesure uniquement les lignes de code traversées par l'interpréteur, sans garantir la pertinence des assertions métier ni la prise en compte de scénarios imprévus (entrées hostiles, pannes réseau, concurrence extrême)." },
      { letter: 'C', text: "Parce que les processeurs modernes ignorent 10 % des instructions." },
      { letter: 'D', text: "Parce que le compilateur JavaScript change aléatoirement les valeurs." },
    ],
    correctAnswers: ['B'],
    explanation: "Une ligne peut être exécutée sans qu'aucune assertion ne vérifie le résultat retourné (ex: expect(true).toBe(true)). La qualité des tests réside dans la pertinence des scénarios et la rigueur des assertions.",
  },
  {
    id: 20,
    question: "Quelles sont les trois conclusions formelles autorisées dans un rapport technique d'audit de fin d'intervention et quelle est la règle d'attribution ?",
    options: [
      { letter: 'A', text: "PARFAIT, MOYEN, NUL selon l'humeur de l'équipe." },
      { letter: 'B', text: "VALIDÉ (toutes les anomalies résolues et prouvées par des tests), PARTIELLEMENT VALIDÉ (correctifs appliqués mais certaines validations restent à exécuter), ou NON VALIDÉ (anomalies ou régressions subsistantes) ; chaque statut devant être justifié par des preuves vérifiables." },
      { letter: 'C', text: "OK, KO, ATTENTE selon le statut du serveur Git." },
      { letter: 'D', text: "ACCEPTÉ, REJETÉ, IGNORÉ selon le coût financier du projet." },
    ],
    correctAnswers: ['B'],
    explanation: "Un auditeur ne doit jamais prétendre qu'une application est pleinement homologuée sans disposer de preuves techniques exhaustives. La rigueur intellectuelle impose de signaler honnêtement les tests restants sous le statut PARTIELLEMENT VALIDÉ ou VALIDÉ selon les faits.",
  },
];

