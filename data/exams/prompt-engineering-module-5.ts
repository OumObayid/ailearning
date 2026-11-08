import { ExamMetadata, ExamQuestion } from './types';

export const PROMPT_ENGINEERING_MODULE_5_EXAM_METADATA: ExamMetadata = {
  moduleId: 'prompt-engineering-module-5',
  title: "Examen Officiel de Certification — Module 5 : Conception & Orchestration d'Agents IA Spécialisés",
  durationMinutes: 40,
  passingScorePercent: 80,
  totalQuestions: 40,
};

export const PROMPT_ENGINEERING_MODULE_5_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Principes & Avantages des Agents Spécialisés (Q1-Q6)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Pourquoi une architecture multi-agents spécialisés est-elle nettement supérieure à un unique 'agent généraliste omniscient' sur un projet complexe ?",
    options: [
      { letter: 'A', text: "Parce qu'un agent généraliste sature rapidement sa fenêtre de contexte, dilue ses instructions et subit des conflits de personas, alors que les agents spécialisés restent ultraconcentrés sur une mission experte univoque." },
      { letter: 'B', text: "Parce que les agents spécialisés coûtent zéro token." },
      { letter: 'C', text: "Parce que les systèmes d'exploitation interdisent les agents uniques." },
      { letter: 'D', text: "Parce qu'un agent généraliste refuse de travailler avec TypeScript." },
    ],
    correctAnswers: ['A'],
    explanation: "Le principe de séparation des préoccupations (SoC) s'applique aux agents : concentrer un agent sur un domaine (ex: Sécurité ou Tests) maximise la précision et évite les compromis hâtifs qu'un agent généraliste ferait pour 'aller plus vite'.",
  },
  {
    id: 2,
    question: "Qu'est-ce que le 'biais de complaisance du créateur' lorsqu'un même agent IA conçoit à la fois le code et ses propres tests ?",
    options: [
      { letter: 'A', text: "L'agent fait exprès d'écrire des tests faux pour planter l'IDE." },
      { letter: 'B', text: "L'agent conçoit inconsciemment des tests qui n'éprouvent que les cas prévus dans son implémentation, passant à côté de ses propres angles morts logiques." },
      { letter: 'C', text: "L'agent refuse de signer la Pull Request." },
      { letter: 'D', text: "L'agent efface le code de son prédécesseur." },
    ],
    correctAnswers: ['B'],
    explanation: "Séparer l'Agent Développeur de l'Agent Testeur (QA) est fondamental : un agent de test indépendant teste les spécifications métier et les cas limites sans être influencé par la façon dont le code a été codé.",
  },
  {
    id: 3,
    codeSnippet: `Équipe type d'agents dans Antigravity :
1. Coordinateur / Orchestrateur
2. Architecte Système
3. Développeur Backend / Frontend
4. Auditeur de Sécurité
5. Ingénieur QA / Tests
6. Documentaliste Technique`,
    question: "Quel rôle fondamental assume l'Agent Coordinateur dans cette topologie ?",
    options: [
      { letter: 'A', text: "Écrire l'intégralité du code et exécuter les tests tout seul." },
      { letter: 'B', text: "Décomposer la demande utilisateur, assigner les tâches aux agents experts appropriés, arbitrer les désaccords et synthétiser les livrables finaux." },
      { letter: 'C', text: "Arrêter les serveurs de production en cas de pluie." },
      { letter: 'D', text: "Empêcher les autres agents de communiquer avec le LLM." },
    ],
    correctAnswers: ['B'],
    explanation: "Le Coordinateur est le chef d'orchestre : il maintient la vision globale, découpe le travail, délègue aux spécialistes sans se perdre dans les détails d'implémentation et consolide les résultats.",
  },
  {
    id: 4,
    question: "Quel avantage organisationnel procure le confinement des outils (Tool Sandboxing) par agent spécialisé ?",
    options: [
      { letter: 'A', text: "On peut donner le terminal à l'agent documentaliste et verrouiller l'agent développeur." },
      { letter: 'B', text: "Chaque agent ne reçoit que les outils strictement requis pour sa fonction (ex: l'Auditeur n'a que des outils de lecture, le Testeur a le terminal pour `npm test`, le Développeur a les outils d'édition), respectant le moindre privilège." },
      { letter: 'C', text: "Tous les outils sont supprimés du projet." },
      { letter: 'D', text: "Cela permet de ne payer aucune licence cloud." },
    ],
    correctAnswers: ['B'],
    explanation: "Limiter les outils au strict nécessaire pour chaque profil réduit la surface de risque : un agent documentaliste ne pourra jamais exécuter de commandes destructives s'il n'en possède tout simplement pas l'outil.",
  },
  {
    id: 5,
    question: "Comment qualifie-t-on la situation où deux agents d'une équipe entrent en désaccord sur une décision technique (ex: l'Architecte veut du GraphQL et le Développeur préfère du REST) ?",
    options: [
      { letter: 'A', text: "Un bug matériel du processeur." },
      { letter: 'B', text: "Un conflit d'arbitrage inter-agents qui doit être tranché par la hiérarchie de règles ou soumis à l'arbitrage du pilote humain (Human-in-the-Loop)." },
      { letter: 'C', text: "Une violation de la licence MIT." },
      { letter: 'D', text: "Une surcharge de la mémoire Swap." },
    ],
    correctAnswers: ['B'],
    explanation: "Les conflits inter-agents sont sains et normaux : ils reflètent des compromis d'ingénierie réels. Le système doit prévoir un protocole d'escalade (soit vers le Coordinateur, soit vers le développeur humain).",
  },
  {
    id: 6,
    question: "Quel impact positif la modularisation en agents spécialisés a-t-elle sur les coûts et quotas de tokens ?",
    options: [
      { letter: 'A', text: "Elle permet d'utiliser des modèles plus petits et rapides (ex: Flash) pour des tâches simples (documentation, linting) et de réserver le modèle puissant (ex: Pro) pour l'architecture ou la sécurité complexe." },
      { letter: 'B', text: "Elle multiplie par 100 la consommation de mémoire sans raison." },
      { letter: 'C', text: "Elle oblige à payer en cryptomonnaies." },
      { letter: 'D', text: "Elle désactive la mise en cache des requêtes." },
    ],
    correctAnswers: ['A'],
    explanation: "L'hétérogénéité des modèles (Model Routing) permet d'optimiser le ratio coût/performance : confier chaque sous-tâche au modèle le plus adapté à sa complexité.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Instructions & Périmètres de Chaque Agent (Q7-Q13)
  // -------------------------------------------------------------
  {
    id: 7,
    codeSnippet: `// Configuration Agent A :
Rôle : "Tu es l'Architecte Logiciel. Tu conçois les interfaces TypeScript et les diagrammes de flux.
Tu ne produis AUCUN code d'implémentation de composants ni de contrôleurs."

// Configuration Agent B :
Rôle : "Tu es le Développeur Full-Stack. Tu implémentes la logique métier en te conformant
STRICTEMENT aux interfaces fournies par l'Architecte sans modifier les signatures."`,
    question: "Quel principe d'ingénierie d'agents cette répartition illustre-t-elle à la perfection ?",
    options: [
      { letter: 'A', text: "La lutte des classes numérique." },
      { letter: 'B', text: "La délimitation étanche des responsabilités et la prévention des chevauchements d'attributions (Clear Separation of Concerns)." },
      { letter: 'C', text: "L'interdiction de communiquer par réseau local." },
      { letter: 'D', text: "La duplication volontaire du travail pour occuper les processeurs." },
    ],
    correctAnswers: ['B'],
    explanation: "Définir précisément ce qui est dans le périmètre et ce qui en est expressément exclu empêche les agents de marcher sur les plates-bandes de leurs collègues ou de défaire mutuellement leur travail.",
  },
  {
    id: 8,
    question: "Dans le profil d'instruction d'un 'Agent Auditeur de Sécurité', quelle posture professionnelle doit être impérativement ancrée ?",
    options: [
      { letter: 'A', text: "Une posture complaisante et rapide qui valide tout pour ne pas retarder la livraison." },
      { letter: 'B', text: "Une posture critique, sceptique et non compromettante, focalisée sur la détection des failles OWASP, la gestion des secrets et la vérification des contrôles d'accès." },
      { letter: 'C', text: "Une posture d'optimisation exclusive de la vitesse d'affichage CSS." },
      { letter: 'D', text: "Une posture d'apprentissage des blagues de développeurs." },
    ],
    correctAnswers: ['B'],
    explanation: "L'auditeur de sécurité doit incarner le rôle d'avocat du diable : son devoir n'est pas de plaire mais d'identifier méthodiquement toute vulnérabilité potentielle.",
  },
  {
    id: 9,
    question: "Quelles sont les responsabilités exclusives de l'Agent Documentaliste Technique ?",
    options: [
      { letter: 'A', text: "Modifier les requêtes SQL et déployer l'application sur Kubernetes." },
      { letter: 'B', text: "Maintenir à jour la documentation d'API (OpenAPI, README, docstrings), rédiger les notes de version (CHANGELOG) et vulgariser l'architecture pour les nouveaux arrivants." },
      { letter: 'C', text: "Réécrire le compilateur TypeScript en Rust." },
      { letter: 'D', text: "Surveiller les caméras de sécurité du bureau." },
    ],
    correctAnswers: ['B'],
    explanation: "Le documentaliste veille à la clarté et à la pérennité de la base de connaissances. Il s'assure que chaque modification logicielle est fidèlement documentée sans toucher au code fonctionnel.",
  },
  {
    id: 10,
    codeSnippet: `Anti-pattern de configuration :
Agent Testeur :
"Tu écris les tests unitaires. Si un test échoue, tu as l'autorisation de modifier
le fichier source applicatif pour faire passer le test au vert."`,
    question: "Pourquoi cette consigne accordée à l'Agent Testeur est-elle désastreuse pour la qualité logicielle ?",
    options: [
      { letter: 'A', text: "Parce que l'agent testeur risque de dénaturer la logique métier attendue ou d'affaiblir les règles applicatives pour faire passer ses tests artificiellement au lieu de signaler le bug au développeur." },
      { letter: 'B', text: "Parce que les tests unitaires ne fonctionnent pas avec du code source." },
      { letter: 'C', text: "Parce que Jest refuse les commits automatiques." },
      { letter: 'D', text: "Parce que cela consomme moins de mémoire RAM." },
    ],
    correctAnswers: ['A'],
    explanation: "Si le testeur peut modifier le code métier testé, il est tenté d'aligner le code sur ses propres raccourcis au lieu de contraindre l'implémentation à respecter le cahier des charges.",
  },
  {
    id: 11,
    question: "Quels types de permissions sur les fichiers doit-on attribuer à l'Agent Architecte ?",
    options: [
      { letter: 'A', text: "Écriture illimitée sur tout le disque dur sans confirmation." },
      { letter: 'B', text: "Lecture complète de l'arborescence, et écriture restreinte aux spécifications, interfaces (`/types`, `/interfaces`, `/specs`) et diagrammes d'architecture." },
      { letter: 'C', text: "Uniquement l'accès au fichier .env." },
      { letter: 'D', text: "Aucun accès fichier, il doit communiquer par signaux sonores." },
    ],
    correctAnswers: ['B'],
    explanation: "L'architecte façonne les contrats d'interfaces et les schémas conceptuels. Il n'a pas vocation à altérer les fichiers d'implémentation ou les configurations d'environnement de production.",
  },
  {
    id: 12,
    codeSnippet: `Règle de l'Agent Développeur :
"Avant de démarrer le codage d'une fonctionnalité :
1. Vérifie la présence des interfaces validées par l'Architecte.
2. Si les interfaces sont absentes ou ambiguës, suspends ton travail et sollicite l'Architecte via le Coordinateur."`,
    question: "Quelle vertu ce protocole de dépendance apporte-t-il au flux de travail ?",
    options: [
      { letter: 'A', text: "Il évite que le développeur n'invente des contrats d'API improvisés qui créeraient des incompatibilités avec les autres modules du projet." },
      { letter: 'B', text: "Il oblige l'Architecte à travailler le dimanche." },
      { letter: 'C', text: "Il désactive le typage strict de TypeScript." },
      { letter: 'D', text: "Il empêche le Coordinateur de lire les messages." },
    ],
    correctAnswers: ['A'],
    explanation: "Le développeur doit s'appuyer sur des fondations contractuelles éprouvées. S'il improvise ses propres types, l'intégration globale du système s'effondre.",
  },
  {
    id: 13,
    question: "Comment formalise-t-on le contrat d'entrée/sortie entre deux agents spécialisés ?",
    options: [
      { letter: 'A', text: "Par un échange de poèmes en alexandrins." },
      { letter: 'B', text: "Par un schéma de données rigide (JSON ou Markdown standardisé avec champs obligatoires : statut, artefacts produits, points d'attention, validation)." },
      { letter: 'C', text: "En partageant un fichier texte non sauvegardé sur le bureau." },
      { letter: 'D', text: "Par des appels téléphoniques automatisés." },
    ],
    correctAnswers: ['B'],
    explanation: "La communication machine-to-machine inter-agents requiert des contrats d'interfaces limpides et stricts pour éliminer tout quiproquo ou perte d'information entre étapes.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Collaboration & Protocoles de Communication (Q14-Q20)
  // -------------------------------------------------------------
  {
    id: 14,
    question: "Dans une topologie d'orchestration 'Hiérarchique' (Coordinateur en étoile), comment s'effectuent les échanges entre l'Architecte et le Développeur ?",
    options: [
      { letter: 'A', text: "Ils se connectent en peer-to-peer sans passer par personne." },
      { letter: 'B', text: "Toute délégation et restitution transitent par le Coordinateur qui valide la conformité du livrable avant de le transmettre à l'agent suivant." },
      { letter: 'C', text: "Ils écrivent tous les deux dans le même fichier au même instant." },
      { letter: 'D', text: "Ils envoient leurs messages sur un forum public." },
    ],
    correctAnswers: ['B'],
    explanation: "La topologie centralisée/hiérarchique garantit la traçabilité et le contrôle : le coordinateur s'assure que le livrable intermédiaire respecte les critères avant d'engager la ressource suivante.",
  },
  {
    id: 15,
    question: "Quel inconvénient majeur peut présenter une topologie 'Peer-to-Peer' pure (tous les agents se parlent directement sans coordinateur) ?",
    options: [
      { letter: 'A', text: "La consommation de carburant de la machine hôte." },
      { letter: 'B', text: "Le risque de boucles de discussion infinies, de perte de visibilité sur l'objectif final et de bavardage excessif consommant des quotas de tokens exponentiels." },
      { letter: 'C', text: "L'obligation d'installer un câble sous-marin." },
      { letter: 'D', text: "La disparition des touches numériques du clavier." },
    ],
    correctAnswers: ['B'],
    explanation: "Sans chef d'orchestre régulateur, des agents autonomes connectés en maillage total peuvent diverger dans des débats stériles, oublier la commande initiale de l'utilisateur ou boucler indéfiniment.",
  },
  {
    id: 16,
    codeSnippet: `Message de délégation du Coordinateur vers l'Agent Testeur :
{
  "taskId": "TASK-104",
  "targetFiles": ["src/services/payment.service.ts"],
  "mission": "Écrire les tests unitaires couvrant les rejets de cartes expirées et les erreurs 402.",
  "expectedOutput": "src/services/payment.service.test.ts avec 100% de tests au vert",
  "maxTurns": 5
}`,
    question: "Quelle bonne pratique essentielle de délégation inter-agents est illustrée par ce payload ?",
    options: [
      { letter: 'A', text: "L'absence totale de consignes pour laisser libre cours à l'imagination." },
      { letter: 'B', text: "La transmission d'un mandat précis : identifiant de tâche, cible, livrable mesurable et limite de tours (maxTurns) pour éviter l'emballement." },
      { letter: 'C', text: "L'obligation de coder en langage COBOL." },
      { letter: 'D', text: "La suppression de l'accès au réseau local." },
    ],
    correctAnswers: ['B'],
    explanation: "Une délégation professionnelle est bornée, univoque et outillée de critères de réussite clairs, empêchant l'agent délégué de dériver ou de consommer des ressources illimitées.",
  },
  {
    id: 17,
    question: "Comment un sous-agent délégué doit-il rapporter le résultat de sa mission à l'agent parent dans Google Antigravity ?",
    options: [
      { letter: 'A', text: "En lui envoyant l'historique brut de tous les tokens échangés sans synthèse." },
      { letter: 'B', text: "En transmettant un compte rendu structuré et épuré (statut, résumé des actions exécutées, fichiers créés/modifiés, métriques de succès et points de vigilance)." },
      { letter: 'C', text: "En supprimant le workspace de l'agent parent." },
      { letter: 'D', text: "En demandant au développeur de faire un copier-coller manuel." },
    ],
    correctAnswers: ['B'],
    explanation: "La synthèse épurée est indispensable pour préserver la fenêtre de contexte de l'agent parent : le parent a besoin des conclusions et des faits clés, pas du bruit des échanges intermédiaires.",
  },
  {
    id: 18,
    question: "Qu'est-ce que le 'Workspace Mode' lors de l'invocation d'un sous-agent dans Antigravity (ex: `Workspace: 'inherit'` vs `Workspace: 'branch'`) ?",
    options: [
      { letter: 'A', text: "Le réglage de la luminosité de l'écran pendant le calcul." },
      { letter: 'B', text: "Le choix de faire opérer le sous-agent soit directement dans le workspace partagé du parent, soit dans une branche isolée (sandbox) pour tester des modifications sans impacter le travail en cours." },
      { letter: 'C', text: "Le choix entre un clavier AZERTY ou QWERTY." },
      { letter: 'D', text: "La sélection de la carte graphique dédiée." },
    ],
    correctAnswers: ['B'],
    explanation: "Le mode 'branch' crée un espace isolé (type clone Git ou worktree) où le sous-agent peut expérimenter et exécuter des tests risqués sans altérer les fichiers principaux avant validation.",
  },
  {
    id: 19,
    question: "Pourquoi est-il fortement déconseillé de faire tourner deux agents avec accès en écriture simultané sur le même fichier sans verrouillage ?",
    options: [
      { letter: 'A', text: "Parce que les câbles SSD risquent de fondre." },
      { letter: 'B', text: "Pour éviter les écrasements concurrents (Race Conditions) où le travail du premier agent est immédiatement anéanti par la sauvegarde du second." },
      { letter: 'C', text: "Parce que TypeScript n'accepte qu'un seul développeur par an." },
      { letter: 'D', text: "Parce que cela divise par deux la taille de la mémoire vive." },
    ],
    correctAnswers: ['B'],
    explanation: "Les conflits d'écriture concurrente détruisent l'intégrité du code. L'ordonnancement séquentiel ou le cloisonnement des répertoires de responsabilité est indispensable.",
  },
  {
    id: 20,
    codeSnippet: `Scénario de blocage :
L'Agent Développeur attend la validation de l'Agent Sécurité.
L'Agent Sécurité attend que l'Agent Développeur produise un nouveau rapport.
Aucun des deux ne progresse.`,
    question: "Comment qualifie-t-on ce phénomène bien connu en informatique et comment l'orchestrateur doit-il le prévenir ?",
    options: [
      { letter: 'A', text: "Un interblocage (Deadlock) ; on le prévient en instaurant des timeouts d'inactivité et un coordinateur central qui arbitre les attentes." },
      { letter: 'B', text: "Une mise à jour automatique de Windows Update." },
      { letter: 'C', text: "Une faille de sécurité matérielle Spectre." },
      { letter: 'D', text: "Une compression de fichiers ZIP corrompue." },
    ],
    correctAnswers: ['A'],
    explanation: "Les dépendances circulaires entre agents provoquent des deadlocks. Le coordinateur ou le moteur d'exécution doit surveiller les dépendances et trancher en cas de blocage mutuel.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Configuration & Outils dans Google Antigravity (Q21-Q26)
  // -------------------------------------------------------------
  {
    id: 21,
    question: "Dans Google Antigravity, quel outil permet de déclarer un nouveau type d'agent réutilisable avec son prompt système et ses autorisations d'outils propres ?",
    options: [
      { letter: 'A', text: "`create_hard_drive`" },
      { letter: 'B', text: "`define_subagent`" },
      { letter: 'C', text: "`npm install agent`" },
      { letter: 'D', text: "`format_c_drive`" },
    ],
    correctAnswers: ['B'],
    explanation: "L'outil `define_subagent` enregistre une nouvelle spécification d'agent (nom, description, system prompt, outils autorisés) invocable dynamiquement par la suite.",
  },
  {
    id: 22,
    codeSnippet: `define_subagent({
  Name: "security-auditor",
  Description: "Auditeur expert en détection de vulnérabilités et sécurité du code.",
  SystemPrompt: "Tu es un auditeur de sécurité senior. Tu inspectes le code sans jamais modifier les fichiers...",
  EnableWriteTools: false,
  EnableSubagentTools: false,
  EnableMCPTools: true
})`,
    question: "Pourquoi est-il judicieux de fixer `EnableWriteTools: false` pour cet agent auditeur ?",
    options: [
      { letter: 'A', text: "Pour l'empêcher d'écrire du code ou de modifier des fichiers système, garantissant mécaniquement sa nature d'auditeur en lecture seule." },
      { letter: 'B', text: "Pour qu'il utilise des stylos bille sur papier." },
      { letter: 'C', text: "Parce que le clavier de l'ordinateur est désactivé." },
      { letter: 'D', text: "Pour économiser la mémoire de la carte graphique." },
    ],
    correctAnswers: ['A'],
    explanation: "Verrouiller les outils d'écriture au niveau de la configuration système offre une garantie de sécurité absolue (au-delà du prompt) contre toute altération intempestive du codebase.",
  },
  {
    id: 23,
    question: "Quel outil utilise l'agent parent pour instancier et faire travailler concrètement un sous-agent déclaré dans Antigravity ?",
    options: [
      { letter: 'A', text: "`invoke_subagent`" },
      { letter: 'B', text: "`start_windows_service`" },
      { letter: 'C', text: "`reboot_machine`" },
      { letter: 'D', text: "`download_internet`" },
    ],
    correctAnswers: ['A'],
    explanation: "`invoke_subagent` lance l'agent avec une mission spécifique (`Prompt`), un rôle et un mode d'espace de travail, et s'exécute en tâche de fond asynchrone.",
  },
  {
    id: 24,
    question: "Comment l'agent parent communique-t-il avec un sous-agent déjà en cours d'exécution ?",
    options: [
      { letter: 'A', text: "Via l'outil `send_message` en lui transmettant son `ConversationId` unique." },
      { letter: 'B', text: "En sifflant dans le micro de l'ordinateur." },
      { letter: 'C', text: "En envoyant une lettre recommandée par La Poste." },
      { letter: 'D', text: "En modifiant l'adresse IP de la box Internet." },
    ],
    correctAnswers: ['A'],
    explanation: "`send_message` est le canal de messagerie inter-agents d'Antigravity permettant d'adresser des instructions complémentaires ou des demandes d'éclaircissement à un agent identifié.",
  },
  {
    id: 25,
    question: "Dans Antigravity, quel outil permet de lister les sous-agents en cours d'exécution ou de mettre fin à un agent qui dérive ?",
    options: [
      { letter: 'A', text: "`manage_subagents` (actions 'list', 'kill' ou 'kill_all')" },
      { letter: 'B', text: "`taskkill /f /im explorer.exe`" },
      { letter: 'C', text: "`delete_all_files`" },
      { letter: 'D', text: "`unplug_power_cable`" },
    ],
    correctAnswers: ['A'],
    explanation: "`manage_subagents` est l'outil de gouvernance opérationnelle pour superviser l'état des sous-agents vivants et détruire ceux qui ne répondent plus ou dépassent leur mandat.",
  },
  {
    id: 26,
    question: "Pourquoi est-il formellement interdit d'utiliser `send_message` pour parler à l'utilisateur humain ?",
    options: [
      { letter: 'A', text: "Parce que `send_message` est strictement un canal de communication machine-to-machine réservé aux échanges entre agents par `ConversationId` ; pour parler à l'humain, l'agent doit émettre du texte Markdown directement dans son tour." },
      { letter: 'B', text: "Parce que les messages vers les humains sont taxés à 20% par les douanes." },
      { letter: 'C', text: "Parce que l'utilisateur humain ne sait pas lire le texte électronique." },
      { letter: 'D', text: "Parce que cela provoque une surtension sur la prise secteur." },
    ],
    correctAnswers: ['A'],
    explanation: "`send_message` est une API de bus interne entre agents. Le dialogue avec le développeur passe par le flux conversationnel standard du chat.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Évaluation, Métriques & Amélioration des Agents (Q27-Q32)
  // -------------------------------------------------------------
  {
    id: 27,
    question: "Quel protocole de test méthodique permet d'évaluer la robustesse d'un nouvel agent spécialisé avant de l'intégrer à l'équipe ?",
    options: [
      { letter: 'A', text: "Lui poser 3 devinettes d'enfants." },
      { letter: 'B', text: "Lui soumettre un banc d'essai (Benchmark) comportant des cas nominaux, des cas limites (Edge Cases), des requêtes hors-périmètre et des tentatives de détournement de consignes." },
      { letter: 'C', text: "Changer son avatar graphique toutes les heures." },
      { letter: 'D', text: "L'utiliser immédiatement sur la base de données de production sans test." },
    ],
    correctAnswers: ['B'],
    explanation: "Un benchmark rigoureux teste la compétence technique nominale ainsi que les réactions face aux erreurs, aux requêtes piégées et aux sorties de périmètre.",
  },
  {
    id: 28,
    codeSnippet: `Métrique d'évaluation d'un Agent Testeur :
- Taux de détection de bugs injectés volontairement (Bug Seeding) : 95%
- Taux de faux positifs (alertes infondées) : 2%
- Respect des règles de non-modification du code source : 100%`,
    question: "Que démontrent ces métriques quant à la performance de cet agent ?",
    options: [
      { letter: 'A', text: "L'agent est inefficace et doit être supprimé." },
      { letter: 'B', text: "L'agent démontre une excellente acuité de détection tout en respectant scrupuleusement ses frontières d'intervention sans fausse alerte." },
      { letter: 'C', text: "L'agent a triché en lisant le corrigé." },
      { letter: 'D', text: "L'ordinateur a besoin de plus de mémoire swap." },
    ],
    correctAnswers: ['B'],
    explanation: "Ce profil de scores reflète un agent de test hautement qualifié : excellente sensibilité (détection des anomalies réelles) et spécificité parfaite (respect des limites).",
  },
  {
    id: 29,
    question: "Qu'est-ce que la technique du 'Prompt Refactoring' appliquée aux instructions d'un agent défaillant ?",
    options: [
      { letter: 'A', text: "Réécrire le prompt en langage binaire 0 et 1." },
      { letter: 'B', text: "Analyser les erreurs récurrentes constatées en logs, éliminer les ambiguïtés textuelles, expliciter les cas limites non traités et introduire des Few-shots correctifs." },
      { letter: 'C', text: "Rallonger le prompt avec 200 lignes de texte aléatoire." },
      { letter: 'D', text: "Supprimer toutes les contraintes de sécurité." },
    ],
    correctAnswers: ['B'],
    explanation: "Comme pour le code source, le prompt engineering itératif affine les règles permanentes pour neutraliser les dérives observées et combler les failles de raisonnement.",
  },
  {
    id: 30,
    question: "Comment mesure-t-on le 'Taux de conformité aux formats' (Schema Adherence Rate) d'un agent de documentation ou d'audit ?",
    options: [
      { letter: 'A', text: "Le pourcentage de réponses respectant strictement la structure imposée (JSON valide, sections markdown obligatoires, présence du tableau de synthèse) sans déviation." },
      { letter: 'B', text: "La vitesse de connexion à la base de données." },
      { letter: 'C', text: "Le nombre de pages imprimées sur papier." },
      { letter: 'D', text: "Le nombre de voyelles dans le fichier d'instructions." },
    ],
    correctAnswers: ['A'],
    explanation: "L'adhérence aux schémas mesure la discipline syntaxique de l'agent : une valeur proche de 100% garantit que les données générées sont immédiatement exploitables par des outils automatisés.",
  },
  {
    id: 31,
    question: "Quel risque survient si un agent de sécurité spécialisé est évalué uniquement sur le nombre de vulnérabilités qu'il signale ?",
    options: [
      { letter: 'A', text: "Il risque de générer une avalanche de faux positifs insignifiants ou imaginaires (Goodhart's Law) pour gonfler artificiellement son score." },
      { letter: 'B', text: "Il va éteindre l'écran de l'utilisateur." },
      { letter: 'C', text: "Il va refuser d'analyser le code source." },
      { letter: 'D', text: "Il va désinstaller le système d'exploitation." },
    ],
    correctAnswers: ['A'],
    explanation: "La loi de Goodhart stipule que lorsqu'une mesure devient une cible, elle cesse d'être une bonne mesure. L'agent doit être jaugé sur la pertinence et la précision de ses alertes, non sur leur volume brut.",
  },
  {
    id: 32,
    question: "Pourquoi est-il recommandé de maintenir un 'Journal d'Évaluation des Agents' (Agent Run Logs) dans le projet ?",
    options: [
      { letter: 'A', text: "Pour surveiller les heures de sommeil des développeurs." },
      { letter: 'B', text: "Pour tracer l'historique des décisions, mesurer la rentabilité des agents (tokens vs valeur produite) et alimenter les cycles d'amélioration continue." },
      { letter: 'C', text: "Pour remplir le disque dur avant la fin du mois." },
      { letter: 'D', text: "Pour satisfaire une vieille tradition des années 1980." },
    ],
    correctAnswers: ['B'],
    explanation: "La traçabilité des exécutions permet d'objectiver l'efficacité de l'équipe d'agents, de repérer les goulots d'étranglement et d'optimiser les prompts les plus coûteux.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Orchestration Avancée & Topologies d'Équipe (Q33-Q37)
  // -------------------------------------------------------------
  {
    id: 33,
    question: "Qu'est-ce qu'une topologie en 'Pipeline Séquentiel' (Assembly Line) dans l'orchestration multi-agents ?",
    options: [
      { letter: 'A', text: "Tous les agents travaillent en même temps sur le même pixel de l'écran." },
      { letter: 'B', text: "Chaque agent prend le livrable de l'agent précédent, le transforme ou l'audite, puis le passe à l'agent suivant selon un flux linéaire déterministe (ex: Spécification -> Implémentation -> Audit -> Tests -> Documentation)." },
      { letter: 'C', text: "Une technique pour assembler des cartes mères dans une usine." },
      { letter: 'D', text: "Un réseau de neurones sans fonction d'activation." },
    ],
    correctAnswers: ['B'],
    explanation: "Le pipeline séquentiel reproduit la chaîne de fabrication industrielle : chaque agent apporte sa valeur ajoutée à son étape avant de transmettre le témoin à l'expert suivant.",
  },
  {
    id: 34,
    question: "Dans quel cas une topologie 'Consensuelle' (Voting / Multi-Review) est-elle hautement recommandée malgré son surcoût en tokens ?",
    options: [
      { letter: 'A', text: "Pour choisir le nom d'une variable temporaire 'i'." },
      { letter: 'B', text: "Pour des opérations critiques à très fort impact (déploiement de smart contract financier, refonte d'authentification bancaire, migration de données destructrice) où l'approbation de plusieurs agents indépendants est requise." },
      { letter: 'C', text: "Pour décider de la couleur de fond du terminal." },
      { letter: 'D', text: "Uniquement lors des fêtes de fin d'année." },
    ],
    correctAnswers: ['B'],
    explanation: "La redondance par consensus (ex: double audit de sécurité indépendant) réduit à un niveau quasi nul le risque de laisser passer une vulnérabilité critique sur du code hypersensible.",
  },
  {
    id: 35,
    codeSnippet: `// Configuration de routage d'orchestrateur :
if (task.complexity === 'TRIVIAL' && task.type === 'DOC') {
  assignTo('documentaliste', { model: 'flash' });
} else if (task.type === 'SECURITY_AUDIT') {
  assignTo('security-auditor', { model: 'pro' });
}`,
    question: "Quelle stratégie d'optimisation d'orchestration est ici appliquée ?",
    options: [
      { letter: 'A', text: "Le routage dynamique de modèles selon la criticité et la complexité de la tâche." },
      { letter: 'B', text: "La suppression pure et simple des agents de sécurité." },
      { letter: 'C', text: "L'obligation d'utiliser des modèles open-source uniquement." },
      { letter: 'D', text: "L'extinction automatique du serveur à chaque tâche." },
    ],
    correctAnswers: ['A'],
    explanation: "Affecter le modèle 'Flash' pour la documentation courante et 'Pro' pour l'audit de sécurité optimise l'équation économique et la rapidité sans compromis sur la rigueur critique.",
  },
  {
    id: 36,
    question: "Quel rôle joue le 'Gestionnaire d'État Global' (Shared Blackboard / State Manager) dans une équipe multi-agents ?",
    options: [
      { letter: 'A', text: "Il efface les fichiers à la fermeture de l'IDE." },
      { letter: 'B', text: "Il conserve la vérité de terrain unique (l'état actuel du projet, la liste des tâches achevées/en cours et les artefacts validés) accessible à tous les agents pour éviter les désynchronisations." },
      { letter: 'C', text: "Il calcule le salaire horaire des agents." },
      { letter: 'D', text: "Il bloque la connexion Wi-Fi." },
    ],
    correctAnswers: ['B'],
    explanation: "Le patron d'architecture 'Blackboard' fournit un tableau d'affichage unique où chaque agent lit le contexte partagé et publie ses résultats sans déformer la réalité du projet.",
  },
  {
    id: 37,
    question: "Comment l'orchestrateur évite-t-il qu'un agent reste bloqué indéfiniment sur une tâche non résolue (Hang / Starvation) ?",
    options: [
      { letter: 'A', text: "En débranchant l'ordinateur." },
      { letter: 'B', text: "En définissant un temps d'exécution maximal (Timeout) et un nombre maximum d'itérations : si le seuil est franchi, l'orchestrateur interrompt l'agent, récupère l'état partiel et déclenche une procédure de reprise." },
      { letter: 'C', text: "En effaçant la mémoire cache du navigateur." },
      { letter: 'D', text: "En demandant à l'agent de chanter une chanson." },
    ],
    correctAnswers: ['B'],
    explanation: "Les mécanismes de timeout et de plafonnement de tours sont indispensables pour garantir qu'un agent défaillant ne monopolise pas le système indéfiniment.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Projet Pratique — Équipe de 6 Agents dans Antigravity (Q38-Q40)
  // -------------------------------------------------------------
  {
    id: 38,
    codeSnippet: `Projet Pratique (Module 5) :
Mission confiée au Coordinateur :
"Implémenter un système complet de réinitialisation de mot de passe par token signé (JWT)
avec expiration 15 minutes et envoi d'email."
Équipe mobilisée : Architecte -> Développeur -> Sécurité -> Testeur -> Documentaliste.`,
    question: "Quelle est la première action opérationnelle que le Coordinateur doit ordonner ?",
    options: [
      { letter: 'A', text: "Demander au Développeur d'écrire immédiatement du code Express au hasard." },
      { letter: 'B', text: "Demander à l'Architecte de concevoir le schéma de données du token, l'interface du service et le diagramme de séquence avant tout codage." },
      { letter: 'C', text: "Demander au Documentaliste de rédiger le guide utilisateur final." },
      { letter: 'D', text: "Demander au Testeur de supprimer la suite de tests existante." },
    ],
    correctAnswers: ['B'],
    explanation: "Dans une équipe méthodique, la conception architecturale précède toujours la production. L'Architecte pose les interfaces qui serviront de référence contractuelle pour tout le reste de la chaîne.",
  },
  {
    id: 39,
    question: "Pendant le projet pratique, l'Agent Sécurité rejette la proposition du Développeur car le token est stocké en clair dans la table PostgreSQL. Comment le flux de collaboration doit-il réagir ?",
    options: [
      { letter: 'A', text: "Le Coordinateur force le déploiement quand même." },
      { letter: 'B', text: "Le Coordinateur retourne la tâche au Développeur avec le rapport de faille de l'Agent Sécurité, en lui ordonnant de hacher le token avec SHA-256 avant stockage." },
      { letter: 'C', text: "L'Agent Sécurité est banni de l'équipe." },
      { letter: 'D', text: "Le projet est annulé et supprimé." },
    ],
    correctAnswers: ['B'],
    explanation: "C'est l'essence même de la boucle d'assurance qualité multi-agents : le veto de sécurité déclenche une réitération ciblée chez le développeur pour corriger la vulnérabilité avant toute mise en production.",
  },
  {
    id: 40,
    question: "En conclusion de ce Module 5, quelle est la clé de succès absolue pour bâtir un collectif d'agents IA hautement performant dans Google Antigravity ?",
    options: [
      { letter: 'A', text: "Créer 100 agents sans instructions précises et les laisser improviser." },
      { letter: 'B', text: "Une spécialisation rigoureuse des rôles, des contrats d'interfaces typés entre agents, des permissions d'outils cloisonnées au strict nécessaire et une orchestration centralisée avec contrôle humain (HITL) sur les livrables finaux." },
      { letter: 'C', text: "Désactiver tous les oracles logiciels et linters." },
      { letter: 'D', text: "Utiliser uniquement la commande ping dans le terminal." },
    ],
    correctAnswers: ['B'],
    explanation: "L'ingénierie multi-agents professionnelle repose sur l'étanchéité des compétences, la clarté des interfaces, le moindre privilège outillé et la supervision humaine pour former un collectif harmonieux et ultra-fiable.",
  },
];

