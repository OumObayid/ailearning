import { ExamMetadata, ExamQuestion } from './types';

export const PROMPT_ENGINEERING_MODULE_7_EXAM_METADATA: ExamMetadata = {
  moduleId: 'prompt-engineering-module-7',
  title: "Examen Officiel de Certification — Module 7 : Pilotage, Débogage & Optimisation Continue des Agents IA",
  durationMinutes: 40,
  passingScorePercent: 80,
  totalQuestions: 40,
};

export const PROMPT_ENGINEERING_MODULE_7_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Diagnostic des Causes d'un Mauvais Résultat (Q1-Q6)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Face à une mauvaise réponse ou une action erronée d'un agent d'IDE, quelles sont les 4 causes racines potentielles (Root Causes) à investiguer méthodiquement ?",
    options: [
      { letter: 'A', text: "La météo locale, l'âge de l'écran, la marque du clavier et la version de Windows." },
      { letter: 'B', text: "1. La formulation du prompt (ambiguïté, contradiction), 2. Le contexte fourni (incomplet, obsolète, pollué), 3. La définition des outils (schémas flous, retours d'erreurs tronqués), 4. Les limites intrinsèques du modèle choisi (capacité de raisonnement)." },
      { letter: 'C', text: "Le protocole IPv4, le câble HDMI, la vitesse de rotation du ventilateur et la mémoire cache L1." },
      { letter: 'D', text: "Uniquement une défaillance physique des serveurs cloud du fournisseur." },
    ],
    correctAnswers: ['B'],
    explanation: "Le diagnostic méthodique d'un agent repose sur la décomposition du pipeline d'inférence : l'instruction, les données de contexte, le contrat d'outils et le modèle de fondation.",
  },
  {
    id: 2,
    codeSnippet: `// Problème constaté :
L'agent utilise une méthode 'User.findByIdAndUpdate()'
sur un projet utilisant Prisma ORM au lieu de Mongoose.`,
    question: "Quelle est la cause racine la plus probable de cette erreur d'agent ?",
    options: [
      { letter: 'A', text: "Un défaut d'ancrage contextuel : l'agent n'a pas reçu (ou n'a pas lu) le fichier package.json ou le schéma prisma, et a comblé le vide par le pattern MongoDB le plus fréquent dans ses données d'entraînement." },
      { letter: 'B', text: "Une panne générale du réseau Internet mondial." },
      { letter: 'C', text: "Prisma ORM a été renommé en Mongoose par le W3C." },
      { letter: 'D', text: "Le compilateur TypeScript a été infecté par un malware." },
    ],
    correctAnswers: ['A'],
    explanation: "En l'absence de contexte explicite sur l'ORM en place, le LLM extrapole statistiquement vers le framework le plus courant associé aux opérations CRUD, d'où l'importance d'ancrer le contexte réel.",
  },
  {
    id: 3,
    question: "Qu'est-ce que la technique d'ablation de prompt (Prompt Ablation Study) lors de la recherche de bug dans un agent ?",
    options: [
      { letter: 'A', text: "Supprimer tout le code du projet pour voir si le prompt compile." },
      { letter: 'B', text: "Retirer ou modifier une consigne ou une variable à la fois pour isoler précisément quelle directive déclenche le comportement erratique de l'agent." },
      { letter: 'C', text: "Écrire le prompt à l'envers de la fin vers le début." },
      { letter: 'D', text: "Traduire le prompt en latin." },
    ],
    correctAnswers: ['B'],
    explanation: "L'ablation est la démarche scientifique de débogage : en isolant chaque composante unitairement, on identifie la consigne exacte responsable d'un conflit ou d'une dérive.",
  },
  {
    id: 4,
    question: "Pourquoi est-il inutile et contre-productif de corriger un bug de prompt en ajoutant simplement des points d'exclamation ou 'TRÈS IMPORTANT !!!' ?",
    options: [
      { letter: 'A', text: "Parce que l'emphase émotionnelle ne résout pas l'ambiguïté structurelle sous-jacente et peut paradoxalement dégrader la pondération de l'attention sur les autres contraintes clés." },
      { letter: 'B', text: "Parce que les points d'exclamation sont interdits par le tokenizer BPE." },
      { letter: 'C', text: "Parce que cela provoque une alerte incendie dans le datacenter." },
      { letter: 'D', text: "Parce que le compilateur refuse les textes en majuscules." },
    ],
    correctAnswers: ['A'],
    explanation: "Crier sur un LLM ne compense pas une consigne mal définie. La rigueur technique exige de reformuler avec des critères mesurables, des formats stricts et des exclusions sans équivoque.",
  },
  {
    id: 5,
    codeSnippet: `// Symptôme :
L'agent produit du code en boucle sans s'arrêter, atteignant la limite maximale de tokens.
Log : L'agent génère des commentaires de 50 lignes sur chaque variable.`,
    question: "Quelle défaillance dans les consignes de formatage explique ce comportement ?",
    options: [
      { letter: 'A', text: "L'absence de contrainte de concision et de format de sortie borné (ex: 'Sois concis, limite tes explications à 3 puces et ne commente que la logique métier non évidente')." },
      { letter: 'B', text: "Une surchauffe de la mémoire vive." },
      { letter: 'C', text: "Un bogue matériel de l'écran." },
      { letter: 'D', text: "L'agent a faim de tokens." },
    ],
    correctAnswers: ['A'],
    explanation: "Les modèles ont une propension naturelle à la prolixité si aucune borne supérieure de concision ou schéma de sortie compact n'est prescrite dans l'instruction principale.",
  },
  {
    id: 6,
    question: "Comment distingue-t-on une défaillance de 'Raisonnement' d'une défaillance d'outil (Tool Failure) chez un agent ?",
    options: [
      { letter: 'A', text: "La défaillance d'outil émet un code d'erreur ou une exception logicielle (ex: fichier introuvable, syntaxe JSON invalide), tandis que la défaillance de raisonnement présente une logique fallacieuse malgré des outils qui ont fonctionné sans erreur technique." },
      { letter: 'B', text: "La défaillance de raisonnement fait vibrer l'ordinateur." },
      { letter: 'C', text: "Il n'y a aucune différence, une erreur est une erreur." },
      { letter: 'D', text: "La défaillance d'outil ne se produit que sous Linux." },
    ],
    correctAnswers: ['A'],
    explanation: "Le diagnostic sépare l'infrastructure (les outils renvoient-ils les bonnes données ?) de la logique cognitive (l'agent exploite-t-il correctement ces données pour conclure ?).",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Élimination des Ambiguïtés & Redondances (Q7-Q12)
  // -------------------------------------------------------------
  {
    id: 7,
    codeSnippet: `Prompt ambigu : "Optimise ce composant React pour qu'il soit rapide."
Prompt débogué : "Refactorise ce composant React pour :
1. Mémoriser le tableau filtré via useMemo pour éviter le recalcul à chaque rendu.
2. Éviter le re-rendu de la liste en enveloppant ItemComponent avec React.memo.
3. Mesurer que le temps de rendu moyen passe sous la barre des 16 ms (60 FPS)."`,
    question: "Quelle transformation fondamentale a été opérée entre le premier et le second prompt ?",
    options: [
      { letter: 'A', text: "Le remplacement d'un adjectif flou et subjectif ('rapide') par des leviers techniques concrets et une métrique de performance mesurable et vérifiable." },
      { letter: 'B', text: "La suppression du support des téléphones mobiles." },
      { letter: 'C', text: "L'interdiction d'utiliser React." },
      { letter: 'D', text: "La traduction en langage Pascal." },
    ],
    correctAnswers: ['A'],
    explanation: "Le terme 'rapide' n'a aucun sens algorithmique univoque. Préciser les techniques cibles (useMemo, React.memo) et le seuil chiffré (16 ms) ancre l'agent dans un objectif d'ingénierie précis.",
  },
  {
    id: 8,
    question: "Qu'est-ce que le problème de la 'Redondance Toxique' dans un fichier d'instructions permanentes ?",
    options: [
      { letter: 'A', text: "L'installation de deux versions de Windows sur la même machine." },
      { letter: 'B', text: "La répétition de la même règle sous des formulations légèrement différentes dans plusieurs sections, risquant d'introduire des nuances contradictoires et de diluer l'attention du modèle." },
      { letter: 'C', text: "L'utilisation de deux écrans au bureau." },
      { letter: 'D', text: "Le branchement de deux souris simultanément." },
    ],
    correctAnswers: ['B'],
    explanation: "Répéter 5 fois la même consigne avec des mots différents augmente le risque qu'une légère divergence de formulation crée un conflit logique, tout en gaspillant des tokens précieux.",
  },
  {
    id: 9,
    question: "Comment procède-t-on au nettoyage (Pruning / Refactoring) d'un prompt d'instructions principales ayant grossi de façon désordonnée au fil des mois ?",
    options: [
      { letter: 'A', text: "En supprimant aléatoirement une ligne sur deux." },
      { letter: 'B', text: "En procédant à une revue d'architecture : éliminer les doublons, regrouper les consignes par domaine (rôle, style, sécurité), remplacer les paragraphes narratifs par des listes à puces directes et sortir les règles contextuelles vers des fichiers modulaires (.agent/rules/)." },
      { letter: 'C', text: "En convertissant le prompt en image PNG." },
      { letter: 'D', text: "En changeant la police d'écriture en Comic Sans MS." },
    ],
    correctAnswers: ['B'],
    explanation: "Un prompt vit comme du code. Le refactoring régulier assainit la structure, restaure la concision et élimine l'entropie accumulée lors des ajustements successifs.",
  },
  {
    id: 10,
    codeSnippet: `Règle 1 (Section Rôle) : "Sois exhaustif et détaille chaque étape du raisonnement."
Règle 2 (Section Format) : "Fournis des réponses extrêmement concises de moins de 3 lignes."`,
    question: "Quel comportement erratique ce conflit interne direct provoquera-t-il chez l'agent ?",
    options: [
      { letter: 'A', text: "L'agent oscillera de façon imprévisible entre verbosité excessive et concision tronquée, produisant des réponses incohérentes ou tronquées en plein milieu de phrase." },
      { letter: 'B', text: "L'agent formatera le disque SSD de l'ordinateur." },
      { letter: 'C', text: "L'IDE se fermera automatiquement." },
      { letter: 'D', text: "L'ordinateur émettra un bip sonore strident." },
    ],
    correctAnswers: ['A'],
    explanation: "Des instructions orthogonales créent une tension d'attention dans le réseau de neurones. L'agent tente de satisfaire deux contraintes incompatibles, débouchant sur une instabilité chronique.",
  },
  {
    id: 11,
    question: "Quelle technique permet d'exprimer des critères de qualité sans ambiguïté pour une tâche de refactorisation ?",
    options: [
      { letter: 'A', text: "Utiliser des métriques standards universelles de l'industrie (ex: complexité cyclomatique < 10, zéro avertissement ESLint, 100% de passage des tests Jest existants)." },
      { letter: 'B', text: "Dire à l'agent : 'Fais du beau code comme un artisan du logiciel'." },
      { letter: 'C', text: "Lui demander de prier pour que le code fonctionne." },
      { letter: 'D', text: "Interdire l'utilisation des boucles for." },
    ],
    correctAnswers: ['A'],
    explanation: "Les critères mesurables (métriques d'outils, couverture, linters) fournissent un barème objectif incontestable pour l'agent comme pour le validateur humain.",
  },
  {
    id: 12,
    question: "Pourquoi est-il crucial de tester un prompt refactorisé sur un ensemble de cas tests de non-régression (Regression Test Suite) ?",
    options: [
      { letter: 'A', text: "Pour vérifier que l'optimisation apportée pour corriger le cas X n'a pas dégradé subrepticement les performances de l'agent sur les cas Y et Z qui fonctionnaient parfaitement auparavant." },
      { letter: 'B', text: "Pour faire plaisir à l'algorithme de Google." },
      { letter: 'C', text: "Parce que Git refuse les commits sans tests de non-régression de prompt." },
      { letter: 'D', text: "Pour vider la batterie du téléphone." },
    ],
    correctAnswers: ['A'],
    explanation: "Tout comme pour un logiciel, modifier un prompt peut corriger un comportement au détriment d'un autre. Un banc d'évaluation fixe garantit la non-régression globale.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Optimisation du Contexte & Fenêtre d'Attention (Q13-Q18)
  // -------------------------------------------------------------
  {
    id: 13,
    question: "Qu'est-ce que la technique de 'Compaction de Contexte' (Context Compaction / Summarization) lors de conversations longues avec un agent ?",
    options: [
      { letter: 'A', text: "Supprimer tout l'historique sans rien sauvegarder." },
      { letter: 'B', text: "Remplacer l'historique volumineux des 20 derniers tours d'échanges par une synthèse structurée des décisions prises, des fichiers modifiés et de l'état actuel de la tâche pour libérer de la fenêtre d'attention." },
      { letter: 'C', text: "Compresser le texte avec l'algorithme WinRAR." },
      { letter: 'D', text: "Diminuer la taille des caractères à l'écran." },
    ],
    correctAnswers: ['B'],
    explanation: "La compaction conserve les faits et jalons essentiels tout en éliminant les détails verbeux des tours passés, évitant la saturation de la fenêtre de contexte.",
  },
  {
    id: 14,
    codeSnippet: `// Situation :
La fenêtre de contexte contient 120 000 tokens.
Les règles de sécurité se trouvent au milieu (au token 60 000).
L'agent ignore une règle d'interdiction pourtant explicite.`,
    question: "Quel phénomène cognitif bien documenté des LLM explique ce manquement ?",
    options: [
      { letter: 'A', text: "Le phénomène de 'Lost in the Middle' : l'attention des transformeurs est maximale sur le début (Primauté) et la fin (Récence) du contexte, et s'affaisse au milieu des longs documents." },
      { letter: 'B', text: "Une amnésie temporaire du processeur Intel." },
      { letter: 'C', text: "Une corruption du disque SSD." },
      { letter: 'D', text: "La présence d'un virus dans le fichier CSS." },
    ],
    correctAnswers: ['A'],
    explanation: "La recherche montre que les modèles de langage retrouvent et appliquent avec bien plus de rigueur les directives situées au tout début (System Instructions) ou à la fin immédiate du prompt.",
  },
  {
    id: 15,
    question: "Comment organise-t-on le placement stratégique des informations dans un prompt pour maximiser le respect des contraintes ?",
    options: [
      { letter: 'A', text: "Mettre les contraintes critiques au milieu de 50 pages de logs." },
      { letter: 'B', text: "Placer le rôle et les contraintes fondamentales au début, insérer les données de contexte au milieu, et répéter ou résumer l'objectif impératif et le format attendu tout à la fin, juste avant la génération." },
      { letter: 'C', text: "Écrire les contraintes en diagonale." },
      { letter: 'D', text: "Ne donner aucune contrainte pour laisser le modèle décider." },
    ],
    correctAnswers: ['B'],
    explanation: "Exploiter les effets de primauté et de récence (Sandwich Pattern) garantit que les règles critiques restent au premier plan de l'attention du modèle lors de la génération.",
  },
  {
    id: 16,
    question: "Qu'est-ce que l'élagage de contexte (Context Pruning) appliqué aux retours d'outils ?",
    options: [
      { letter: 'A', text: "Couper les branches des arbres du campus." },
      { letter: 'B', text: "Filtrer les sorties d'outils volumineuses (ex: un scan de répertoire ou un résultat de recherche de 500 lignes) pour n'injecter dans le prompt que les 10 lignes réellement pertinentes." },
      { letter: 'C', text: "Supprimer les lignes impaires des fichiers JavaScript." },
      { letter: 'D', text: "Désinstaller les outils de l'IDE." },
    ],
    correctAnswers: ['B'],
    explanation: "Injecter la totalité d'un log brut de 20 000 lignes pollue la mémoire de l'agent. Tronquer intelligemment pour ne conserver que les erreurs ou les correspondances ciblées maximise la clarté.",
  },
  {
    id: 17,
    codeSnippet: `// Mauvaise pratique :
run_command("cat package-lock.json") // Injecte 15 000 lignes de JSON brut

// Pratique optimisée :
run_command("npm list --depth=0")   // Affiche uniquement les 15 dépendances racines directes`,
    question: "Quel gain immédiat apporte cette pratique optimisée pour le pilotage de l'agent ?",
    options: [
      { letter: 'A', text: "Une division par 100 des tokens consommés et l'élimination de la saturation d'attention par des données de bas niveau inutiles à la tâche." },
      { letter: 'B', text: "L'augmentation de la résolution de l'écran." },
      { letter: 'C', text: "L'obligation d'acheter une nouvelle licence logicielle." },
      { letter: 'D', text: "Le passage automatique du code en mode sombre." },
    ],
    correctAnswers: ['A'],
    explanation: "Cibler l'information synthétique de haut niveau (`npm list --depth=0`) offre la vue d'ensemble recherchée sans inonder la fenêtre de travail sous des milliers de lignes de métadonnées.",
  },
  {
    id: 18,
    question: "Quand doit-on recourir à la réinitialisation complète de session (Reset / Clear Chat) plutôt que de poursuivre dans le même fil d'historique ?",
    options: [
      { letter: 'A', text: "Toutes les deux minutes." },
      { letter: 'B', text: "Dès qu'une tâche majeure est validée et terminée, ou lorsque l'historique accumulé est devenu si lourd et bruité qu'il perturbe la prise de décision sur la tâche suivante." },
      { letter: 'C', text: "Uniquement lors du changement de disque dur." },
      { letter: 'D', text: "Jamais, il faut conserver l'historique sur 10 ans." },
    ],
    correctAnswers: ['B'],
    explanation: "Repartir d'une session fraîche (fresh context) une fois un jalon atteint élimine tout résidu cognitif obsolète et offre à l'agent une fenêtre d'attention maximale pour sa nouvelle mission.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Détection des Hallucinations & Métriques de Conformité (Q19-Q25)
  // -------------------------------------------------------------
  {
    id: 19,
    question: "Qu'est-ce que l'ancrage factuel (Groundedness) d'une réponse générée par un agent IA ?",
    options: [
      { letter: 'A', text: "Le poids physique du serveur mesuré en kilogrammes." },
      { letter: 'B', text: "Le degré auquel chaque affirmation, nom de fonction, signature de méthode ou chemin de fichier affirmé par l'agent s'appuie directement et vérifiablement sur les sources fournies dans le contexte." },
      { letter: 'C', text: "Le respect de la loi de la gravité par l'ordinateur." },
      { letter: 'D', text: "Le nombre de fois où l'agent utilise des mots techniques." },
    ],
    correctAnswers: ['B'],
    explanation: "Une réponse est 'grounded' (ancrée) si elle ne contient aucune invention : chaque assertion technique peut être pointée vers un extrait exact des fichiers ou des logs du projet.",
  },
  {
    id: 20,
    codeSnippet: `Affirmation de l'agent :
"J'ai utilisé la fonction 'encryptWithAESGCM()' native de votre librairie interne 'security-core'."
Vérification dans le code :
Le fichier security-core.ts exporte uniquement 'hashSHA256()' et 'verifyHmac()'.`,
    question: "Comment qualifie-t-on formellement cette défaillance de l'agent ?",
    options: [
      { letter: 'A', text: "Une hallucination d'API (Fabricated Method / API Hallucination)." },
      { letter: 'B', text: "Une mise à jour anticipée de la documentation." },
      { letter: 'C', text: "Une optimisation de compilation JIT." },
      { letter: 'D', text: "Une erreur de frappe sans conséquence." },
    ],
    correctAnswers: ['A'],
    explanation: "L'hallucination d'API se produit lorsque le modèle invente une signature ou une méthode qui semble logique et élégante dans le contexte, mais qui n'existe tout simplement pas dans le code réel.",
  },
  {
    id: 21,
    question: "Quel protocole permet d'intercepter automatiquement les hallucinations d'API avant que le code ne soit validé ?",
    options: [
      { letter: 'A', text: "L'exécution immédiate du compilateur de types (ex: `npx tsc --noEmit`) : le compilateur lèvera une erreur de type fatale 'Property does not exist'." },
      { letter: 'B', text: "Poser la question à un deuxième LLM sans lui fournir le code." },
      { letter: 'C', text: "Attendre que l'application soit en production pour voir si elle plante." },
      { letter: 'D', text: "Désactiver le système de typage strict." },
    ],
    correctAnswers: ['A'],
    explanation: "Le compilateur de types (`tsc`) est un oracle déterministe absolu : il ne tolère aucune méthode inventée et démasque instantanément l'hallucination.",
  },
  {
    id: 22,
    question: "Qu'est-ce que la métrique 'Pass@1' largement utilisée dans l'évaluation des agents de code ?",
    options: [
      { letter: 'A', text: "Le pourcentage de fois où l'agent produit une solution qui passe avec succès l'intégralité des tests unitaires dès sa première tentative sans reprise." },
      { letter: 'B', text: "Le nombre de fois où l'agent a réussi à se connecter au réseau Wi-Fi." },
      { letter: 'C', text: "Le premier mot prononcé par l'agent dans la journée." },
      { letter: 'D', text: "Le numéro de passeport du créateur du modèle." },
    ],
    correctAnswers: ['A'],
    explanation: "Pass@1 est le standard de référence en génie logiciel IA : il mesure la capacité de l'agent à fournir une solution juste du premier coup (First-Time Right), indicateur clé de vélocité et de fiabilité.",
  },
  {
    id: 23,
    question: "Qu'est-ce que le paradigme 'LLM-as-a-Judge' dans un banc d'évaluation (Evals Framework) d'agents ?",
    options: [
      { letter: 'A', text: "Remplacer les juges d'un tribunal par des ordinateurs portables." },
      { letter: 'B', text: "Utiliser un grand modèle de langage distinct, configuré avec une grille d'évaluation formelle et impartiale, pour noter la qualité, la conformité et la clarté des réponses produites par l'agent audité." },
      { letter: 'C', text: "Demander à l'agent de juger ses propres erreurs sans critères." },
      { letter: 'D', text: "Un jeu vidéo de simulation juridique." },
    ],
    correctAnswers: ['B'],
    explanation: "LLM-as-a-Judge automatise l'évaluation qualitative à grande échelle : un modèle arbitre (souvent plus puissant, ex: Gemini Pro) analyse les réponses selon une rubric stricte et note l'adéquation.",
  },
  {
    id: 24,
    codeSnippet: `Rubrique d'évaluation (Score sur 5) :
- Respect absolu des contraintes de sécurité : 2 pts
- Compilabilité et typage strict sans warning : 1 pt
- Couverture de tests des cas limites : 1 pt
- Concision et formatage de la synthèse : 1 pt`,
    question: "Pourquoi l'utilisation d'une rubrique de notation critériée est-elle indispensable pour piloter la qualité des agents ?",
    options: [
      { letter: 'A', text: "Elle objective la mesure de conformité et permet de comparer scientifiquement deux versions d'instructions (Prompt A vs Prompt B) sur des données chiffrées." },
      { letter: 'B', text: "Elle accélère la vitesse de téléchargement de l'IDE." },
      { letter: 'C', text: "Elle supprime le besoin de sauvegarder les fichiers." },
      { letter: 'D', text: "Elle force l'agent à travailler uniquement en mode synchrone." },
    ],
    correctAnswers: ['A'],
    explanation: "Sans grille critériée, l'évaluation reste subjective et impressionniste. Une rubric décompose l'exigence en scores quantifiables indispensables aux tests A/B de prompts.",
  },
  {
    id: 25,
    question: "Comment calcule-t-on le 'Taux de Dérive' (Drift Rate) d'un agent au fil d'une session de développement prolongée ?",
    options: [
      { letter: 'A', text: "La vitesse à laquelle la souris glisse sur le tapis de souris." },
      { letter: 'B', text: "La fréquence à laquelle l'agent commence à oublier ou transgresser ses règles initiales à mesure que le nombre de tours de conversation augmente." },
      { letter: 'C', text: "Le décalage de l'horloge système en microsecondes." },
      { letter: 'D', text: "Le nombre de fois où le développeur change de projet." },
    ],
    correctAnswers: ['B'],
    explanation: "La dérive d'attention (Attention Drift) est l'érosion progressive du respect des consignes système au fur et à mesure que la conversation s'allonge et s'encombre.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Tâches Longues & Checkpointing (Q26-Q32)
  // -------------------------------------------------------------
  {
    id: 26,
    question: "Quel défi architectural majeur pose l'exécution d'une tâche longue (Long-Horizon Task) mobilisant plus de 30 étapes d'outils successives ?",
    options: [
      { letter: 'A', text: "La fatigue oculaire de l'écran." },
      { letter: 'B', text: "Le risque d'épuisement de la fenêtre de contexte, la perte de cohérence globale et l'accumulation d'erreurs en cascade si une étape intermédiaire dévie sans contrôle." },
      { letter: 'C', text: "La surchauffe des touches du clavier." },
      { letter: 'D', text: "L'obligation de payer un abonnement par commande." },
    ],
    correctAnswers: ['B'],
    explanation: "Sur des trajectoires longues, chaque décision conditionne les suivantes. Si l'agent s'égare au tour 8 et n'a aucun mécanisme de vérification, il s'enfonce dans l'erreur jusqu'à l'échec total.",
  },
  {
    id: 27,
    question: "Qu'est-ce que le 'Checkpointing' (ou Points de Sauvegarde) dans le pilotage de tâches longues par un agent IA ?",
    options: [
      { letter: 'A', text: "Créer un commit Git temporaire ou sauvegarder un instantané d'état stable à la fin de chaque sous-étape validée, permettant de restaurer cet état propre en cas de déraillement ultérieur." },
      { letter: 'B', text: "Éteindre l'ordinateur à la fin de chaque étape." },
      { letter: 'C', text: "Imprimer le code sur une imprimante thermique." },
      { letter: 'D', text: "Changer le mot de passe utilisateur toutes les heures." },
    ],
    correctAnswers: ['A'],
    explanation: "Le checkpointing Git offre des filets de sécurité indestructibles : si l'agent échoue à l'étape 4, on peut faire un `git checkout checkpoint-step-3` et repartir sans avoir perdu les étapes 1 et 2.",
  },
  {
    id: 28,
    codeSnippet: `Structure de rapport d'étape pour tâche longue :
### État d'avancement - Étape 3/5
- Actions achevées : Migration DB appliquée et typage Prisma mis à jour.
- Tests intermédiaires : 12/12 passent au vert.
- Prochaine action planifiée : Créer le contrôleur API REST dans src/controllers/order.controller.ts.
- Anomalies rencontrées : Aucune.`,
    question: "Pourquoi imposer à l'agent de produire cette fiche d'état synthétique à chaque jalon ?",
    options: [
      { letter: 'A', text: "Elle rafraîchit la mémoire de travail de l'agent (Self-Orientation) et permet au pilote humain d'interrompre ou d'ajuster la trajectoire à tout instant." },
      { letter: 'B', text: "Elle permet de ralentir l'agent pour ne pas fatiguer les processeurs." },
      { letter: 'C', text: "Elle est exigée par le ministère des finances." },
      { letter: 'D', text: "Elle convertit le code en langage HTML." },
    ],
    correctAnswers: ['A'],
    explanation: "La verbalisation d'état réancre l'agent dans ses objectifs et offre une visibilité totale à l'humain pour intervenir avant qu'une mauvaise direction ne s'aggrave.",
  },
  {
    id: 29,
    question: "Dans le cadre de l'orchestration sous Antigravity, quel outil permet de planifier des actions différées ou périodiques sans bloquer l'agent dans une boucle `sleep` shell passive ?",
    options: [
      { letter: 'A', text: "`sleep 3600` dans le terminal." },
      { letter: 'B', text: "L'outil natif `schedule` (minuterie one-shot ou expression cron) qui enregistre la notification et libère immédiatement l'agent pour d'autres tâches." },
      { letter: 'C', text: "Un réveil mécanique posé sur la tour du PC." },
      { letter: 'D', text: "L'envoi d'un calendrier papier par la poste." },
    ],
    correctAnswers: ['B'],
    explanation: "Les commandes de sleep bloquent les processus et consomment des ressources inutiles. L'outil `schedule` s'appuie sur le moteur d'événements asynchrone de la plateforme.",
  },
  {
    id: 30,
    question: "Comment gère-t-on la dégradation des performances cognitives d'un agent lorsque sa conversation approche de la limite maximale de contexte ?",
    options: [
      { letter: 'A', text: "On continue jusqu'à ce que l'IDE crashe avec un message d'erreur fatal." },
      { letter: 'B', text: "On déclenche une procédure de transition : l'agent rédige un fichier d'artefact de passage de relais (`HANDOFF.md`), puis on réinitialise la session en chargeant cet artefact en entrée." },
      { letter: 'C', text: "On supprime la moitié des lignes du code source." },
      { letter: 'D', text: "On achète un écran plus grand." },
    ],
    correctAnswers: ['B'],
    explanation: "Le patron 'Handoff' (passage de relais) permet d'étendre virtuellement l'horizon de travail à l'infini : l'agent compacte l'acquis dans un document de synthèse propre et la session suivante reprend à pleine puissance.",
  },
  {
    id: 31,
    question: "Quelle stratégie d'intervention humaine est recommandée lorsque l'agent hésite entre deux choix d'architecture à mi-parcours d'une tâche longue ?",
    options: [
      { letter: 'A', text: "L'agent doit lancer une pièce de monnaie virtuelle pour décider seul." },
      { letter: 'B', text: "L'agent doit formuler un point de décision explicite (Decision Gate) présentant les deux options avec leurs compromis techniques et suspendre son exécution en attente du choix du développeur." },
      { letter: 'C', text: "L'agent doit coder les deux architectures en double dans le même fichier." },
      { letter: 'D', text: "L'agent doit abandonner et supprimer la branche Git." },
    ],
    correctAnswers: ['B'],
    explanation: "Un agent d'ingénierie mature sait s'arrêter aux carrefours décisionnels structurants pour soumettre le choix au discernement de l'architecte humain.",
  },
  {
    id: 32,
    question: "Comment s'assure-t-on de la reproductibilité des résultats lors de l'exécution répétée d'une tâche d'agent complexe ?",
    options: [
      { letter: 'A', text: "En réglant la température à 0.0, en fixant des versions strictes d'outils et de dépendances, et en s'appuyant sur des prompts canoniques éprouvés (Golden Prompts)." },
      { letter: 'B', text: "En changeant d'opérateur réseau à chaque exécution." },
      { letter: 'C', text: "En ne travaillant que le mardi matin." },
      { letter: 'D', text: "La reproductibilité est impossible avec l'intelligence artificielle." },
    ],
    correctAnswers: ['A'],
    explanation: "La basse température élimine la variabilité stochastique, et les prompts golden standardisent l'amorce méthodologique pour des exécutions reproductibles.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : TPs Pratiques & Cas d'Optimisation Avancée (Q33-Q40)
  // -------------------------------------------------------------
  {
    id: 33,
    codeSnippet: `Cas pratique d'optimisation (TP 7.1) :
L'agent d'audit de sécurité mettait 4 minutes et consommait 65 000 tokens par analyse de fichier.
Après refactoring du prompt :
- Élimination des instructions redondantes
- Format de sortie tabulaire épuré sans bavardage
- Lecture par tranches ciblées de 100 lignes max
Résultat : 25 secondes et 4 200 tokens par analyse, avec 0 vulnérabilité oubliée.`,
    question: "Quelle conclusion managériale et technique tire-t-on de ce cas pratique ?",
    options: [
      { letter: 'A', text: "Que le prompt engineering d'optimisation génère un gain d'efficience massif (facteur 10 en vitesse, facteur 15 en coût) sans aucune perte de qualité d'audit." },
      { letter: 'B', text: "Que l'agent a bâclé son travail pour aller plus vite." },
      { letter: 'C', text: "Que les tokens d'API sont devenus gratuits." },
      { letter: 'D', text: "Que les fichiers analysés étaient vides." },
    ],
    correctAnswers: ['A'],
    explanation: "L'optimisation professionnelle de prompt et de gestion de contexte transforme un prototype lent et ruineux en un outil de production véloce, économique et rigoureux.",
  },
  {
    id: 34,
    question: "Dans le TP 7.2 (Débogage de Prompt), un agent refusait d'éditer un fichier `.tsx` en prétendant qu'il s'agissait d'un binaire. Quelle était la cause identifiée du dysfonctionnement ?",
    options: [
      { letter: 'A', text: "L'extension `.tsx` avait été malencontreusement ajoutée dans la regex de filtrage des fichiers images non textuels dans les règles de l'agent." },
      { letter: 'B', text: "TypeScript a été interdit par le gouvernement américain." },
      { letter: 'C', text: "L'écran de l'ordinateur ne supportait pas la 4K." },
      { letter: 'D', text: "Le fichier était écrit avec une encre invisible." },
    ],
    correctAnswers: ['A'],
    explanation: "Une coquille dans une expression régulière de détection de fichiers binaires peut interdire par erreur des fichiers sources légitimes, démontrant l'importance d'auditer les règles d'outils.",
  },
  {
    id: 35,
    codeSnippet: `Test de résistance (TP 7.3) :
On injecte 10 faux bugs subtils (off-by-one, fuite mémoire, null-pointer) dans un contrôleur Node.js.
Agent A (Prompt non optimisé) : Détecte 4 bugs sur 10.
Agent B (Prompt avec CoT structurée + grille d'évaluation explicite) : Détecte 10 bugs sur 10.`,
    question: "Quel facteur méthodologique a permis à l'Agent B de doubler son taux de détection ?",
    options: [
      { letter: 'A', text: "L'imposition d'une analyse systématique par catégories de vulnérabilités (contrôle des bornes, cycle de vie des ressources, valeurs nulles) au lieu d'une relecture passive non guidée." },
      { letter: 'B', text: "L'utilisation d'une police de caractères plus grande." },
      { letter: 'C', text: "Le redémarrage du modem ADSL." },
      { letter: 'D', text: "L'attribution d'une prime financière virtuelle à l'agent." },
    ],
    correctAnswers: ['A'],
    explanation: "Guider l'attention de l'agent à travers une grille d'inspection méthodique (Checklist-driven analysis) force l'exploration active de chaque classe de bugs potentiels.",
  },
  {
    id: 36,
    question: "Dans le TP 7.4 (Mesure de Conformité), qu'appelle-t-on un 'Golden Prompt' dans le référentiel de l'entreprise ?",
    options: [
      { letter: 'A', text: "Un prompt vendu aux enchères sur Internet." },
      { letter: 'B', text: "Un prompt de référence ayant subi avec succès tous les tests de validation, validé par les architectes et versionné comme standard officiel réutilisable par tous les développeurs." },
      { letter: 'C', text: "Un prompt écrit avec une couleur jaune doré dans l'éditeur." },
      { letter: 'D', text: "Un prompt qui ne contient que des compliments pour l'IA." },
    ],
    correctAnswers: ['B'],
    explanation: "Les golden prompts constituent le patrimoine immatériel d'ingénierie d'une équipe : des modèles de consignes certifiés qui garantissent une qualité reproductible sur les tâches récurrentes.",
  },
  {
    id: 37,
    question: "Quel outil statistique simple permet de comparer les performances de deux versions de prompt (Prompt A vs Prompt B) lors d'un test A/B sur 50 runs ?",
    options: [
      { letter: 'A', text: "Le calcul du taux de réussite moyen (Pass Rate), de l'écart-type de cohérence et de la consommation médiane de tokens par exécution." },
      { letter: 'B', text: "La consultation de l'horoscope du jour." },
      { letter: 'C', text: "L'avis personnel du stagiaire après 2 essais." },
      { letter: 'D', text: "Le poids du fichier texte en octets." },
    ],
    correctAnswers: ['A'],
    explanation: "La démarche empirique d'évaluation compare des distributions statistiques (médiane, variance, taux d'échec) sur un volume suffisant de tirages pour écarter l'effet du hasard.",
  },
  {
    id: 38,
    codeSnippet: `Problème identifié en TP 7.5 :
L'agent utilise parfois 'npm' et parfois 'pnpm' au sein du même projet,
créant à la fois package-lock.json et pnpm-lock.yaml.`,
    question: "Quel correctif d'instructions principales résout ce dysfonctionnement de manière définitive ?",
    options: [
      { letter: 'A', text: "Ajouter dans .agent/rules : 'Gestionnaire de paquets UNIQUE : Ce projet utilise exclusivement pnpm. N'exécute JAMAIS npm ou yarn. Fichier de verrouillage officiel : pnpm-lock.yaml'." },
      { letter: 'B', text: "Désinstaller Node.js de la machine." },
      { letter: 'C', text: "Supprimer tous les fichiers lock du projet et ne plus jamais en générer." },
      { letter: 'D', text: "Installer un troisième gestionnaire de paquets (Bun) pour les départager." },
    ],
    correctAnswers: ['A'],
    explanation: "Fixer un invariant univoque dans les règles permanentes élimine toute hésitation de l'agent et protège la cohérence de l'arbre de dépendances.",
  },
  {
    id: 39,
    question: "Pourquoi est-il primordial de versionner les fichiers de prompts et règles (`.agent/rules/`) dans le même dépôt Git que le code de l'application ?",
    options: [
      { letter: 'A', text: "Pour que l'évolution des prompts soit synchronisée avec l'évolution de la stack (ex: la règle bascule sur Next.js 15 exactement sur la branche où Next.js est mis à jour)." },
      { letter: 'B', text: "Parce que Git refuse les dépôts qui ne contiennent pas de prompts." },
      { letter: 'C', text: "Pour augmenter le nombre de commits sur son profil GitHub." },
      { letter: 'D', text: "Pour cacher les prompts aux concurrents." },
    ],
    correctAnswers: ['A'],
    explanation: "Lier la constitution de l'agent aux branches de code garantit l'adéquation temporelle : chaque branche possède les instructions adaptées à l'état précis du code qu'elle contient.",
  },
  {
    id: 40,
    question: "En conclusion de ce Module 7, quelle est la posture d'excellence qui caractérise un ingénieur de prompt de niveau Senior ?",
    options: [
      { letter: 'A', text: "Considérer que si l'agent échoue, c'est obligatoirement la faute du modèle, et abandonner." },
      { letter: 'B', text: "Adopter une démarche scientifique itérative : mesurer factuellement les écarts, déboguer les causes racines (prompt, contexte, outils), éliminer le bruit et consolider des garde-fous déterministes reproductibles." },
      { letter: 'C', text: "Écrire des prompts de 50 pages sans jamais les tester." },
      { letter: 'D', text: "Remplacer tous les développeurs par un seul script shell." },
    ],
    correctAnswers: ['B'],
    explanation: "L'ingénieur senior ne traite pas l'IA comme une boîte magique, mais comme un système probabiliste hautement pilotable que l'on optimise par la mesure, le débogage rigoureux et l'outillage déterministe.",
  },
];

