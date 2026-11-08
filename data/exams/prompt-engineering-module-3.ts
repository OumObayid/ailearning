import { ExamMetadata, ExamQuestion } from './types';

export const PROMPT_ENGINEERING_MODULE_3_EXAM_METADATA: ExamMetadata = {
  moduleId: 'prompt-engineering-module-3',
  title: "Examen Officiel de Certification — Module 3 : Techniques Avancées de Prompt Engineering pour Agents d'IDE",
  durationMinutes: 40,
  passingScorePercent: 80,
  totalQuestions: 40,
};

export const PROMPT_ENGINEERING_MODULE_3_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Zero-shot & Few-shot Prompting (Q1-Q6)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Dans quel cas de figure le 'Zero-shot Prompting' est-il pleinement suffisant et recommandé lors du pilotage d'un agent de développement ?",
    options: [
      { letter: 'A', text: "Pour générer une architecture bancaire complète multi-régions sans spécifications." },
      { letter: 'B', text: "Pour des tâches standards, directes et bien documentées dans le corpus d'entraînement (ex: typer une interface TypeScript simple, expliquer une fonction standard)." },
      { letter: 'C', text: "Uniquement lorsque la connexion Internet est coupée." },
      { letter: 'D', text: "Pour contourner les tests d'intégration continue." },
    ],
    correctAnswers: ['B'],
    explanation: "Le Zero-shot (instruction sans exemple) excelle sur les requêtes conventionnelles, standardisées et déterministes, évitant de consommer inutilement des tokens avec des exemples superflus.",
  },
  {
    id: 2,
    codeSnippet: `// Exemple dans le prompt :
Entrée : "GET /api/users" -> Sortie : { "action": "LIST_USERS", "cache": true }
Entrée : "POST /api/orders" -> Sortie : { "action": "CREATE_ORDER", "cache": false }
Entrée : "DELETE /api/users/:id" -> Sortie : ?`,
    question: "Quelle technique de prompting est ici mise en œuvre pour calibrer la réponse de l'agent ?",
    options: [
      { letter: 'A', text: "Prompt Chaining asynchrone." },
      { letter: 'B', text: "Few-shot Prompting (apprentissage en contexte par démonstration d'exemples)." },
      { letter: 'C', text: "Fine-tuning LoRA sur GPU dédié." },
      { letter: 'D', text: "Injection de code assembleur x86." },
    ],
    correctAnswers: ['B'],
    explanation: "Le Few-shot consiste à fournir un ou plusieurs couples (entrée -> sortie) pour ancrer le schéma de réponse exact, le vocabulaire et le formatage attendus sans ambiguïté.",
  },
  {
    id: 3,
    question: "Quel écueil majeur doit être évité lors de la sélection des exemples dans un prompt Few-shot destiné à un agent d'IDE ?",
    options: [
      { letter: 'A', text: "Fournir des exemples qui utilisent la syntaxe TypeScript." },
      { letter: 'B', text: "Fournir des exemples biaisés ou ne couvrant qu'un seul cas nominal (absence de cas limites, erreurs ou exceptions), induisant l'agent en erreur sur les cas complexes." },
      { letter: 'C', text: "Formater les exemples avec du markdown propre." },
      { letter: 'D', text: "Utiliser des noms de variables explicites." },
    ],
    correctAnswers: ['B'],
    explanation: "Si tous les exemples Few-shot illustrent le même cas passant, le modèle sur-apprend le pattern et aura tendance à halluciner un succès nominal même lorsque les données d'entrée présentent une anomalie.",
  },
  {
    id: 4,
    question: "Comment le nombre d'exemples dans un prompt Few-shot impacte-t-il les performances d'un grand modèle de langage ?",
    options: [
      { letter: 'A', text: "Plus on met d'exemples (ex: 50 exemples), plus le modèle devient rapide et moins il coûte." },
      { letter: 'B', text: "Entre 2 et 5 exemples bien choisis et contrastés suffisent généralement ; au-delà, les gains marginaux diminuent tandis que le coût en tokens et la latence explosent." },
      { letter: 'C', text: "Il faut impérativement un nombre impair d'exemples pour respecter la parité binaire." },
      { letter: 'D', text: "Les exemples n'ont aucun impact sur le comportement d'un LLM moderne." },
    ],
    correctAnswers: ['B'],
    explanation: "Des études empiriques montrent que 2 à 4 exemples de haute qualité apportent l'essentiel du guidage structurel. Augmenter excessivement les exemples encombre le contexte sans gain de précision.",
  },
  {
    id: 5,
    codeSnippet: `// Few-shot négatif :
Entrée : "Requête malformée sans token"
Mauvaise réponse : "Erreur 500 serveur"
Bonne réponse attendue : "Erreur 401 Unauthorized avec corps JSON standardisé { error: 'TOKEN_REQUIRED' }"`,
    question: "Pourquoi l'inclusion d'un contre-exemple (ce qu'il ne faut PAS faire vs ce qu'il faut faire) est-elle particulièrement efficace ?",
    options: [
      { letter: 'A', text: "Elle force l'IDE à changer de compilateur." },
      { letter: 'B', text: "Elle désactive le ramasse-miettes de Node.js." },
      { letter: 'C', text: "Elle clarifie la frontière décisionnelle de l'agent en désactivant le réflexe par défaut le plus probable mais incorrect du modèle." },
      { letter: 'D', text: "Elle annule les règles de typage strict." },
    ],
    correctAnswers: ['C'],
    explanation: "Montrer le piège typique à éviter aux côtés du comportement exemplaire brise l'attracteur statistique commun du LLM (comme renvoyer une erreur 500 par paresse) et renforce la précision.",
  },
  {
    id: 6,
    question: "Quelle est la principale différence entre le Few-shot Prompting et le Fine-Tuning ?",
    options: [
      { letter: 'A', text: "Le Few-shot modifie les poids synaptiques du réseau de neurones sur disque." },
      { letter: 'B', text: "Le Few-shot opère uniquement dans la fenêtre de contexte éphémère sans altérer les poids du modèle, alors que le Fine-Tuning recalcule les poids lors d'un entraînement dédié." },
      { letter: 'C', text: "Le Fine-Tuning est gratuit et instantané, tandis que le Few-shot nécessite 3 semaines de calcul." },
      { letter: 'D', text: "Le Few-shot ne fonctionne que sous Linux." },
    ],
    correctAnswers: ['B'],
    explanation: "Le Few-shot est un guidage 'in-context' : les poids du modèle restent figés. C'est le contexte d'inférence qui oriente la distribution probabiliste du texte généré.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Chain of Thought (CoT) & Décomposition (Q7-Q12)
  // -------------------------------------------------------------
  {
    id: 7,
    question: "Pourquoi la technique de 'Chain of Thought' (CoT - Chaîne de Pensée) améliore-t-elle considérablement la résolution de problèmes algorithmiques ou de refactoring ?",
    options: [
      { letter: 'A', text: "Elle permet au modèle de générer des tokens de raisonnement intermédiaire qui conditionnent la probabilité des conclusions finales au lieu de deviner la réponse d'un bloc." },
      { letter: 'B', text: "Elle fait tourner le processeur à 100% de sa fréquence d'horloge." },
      { letter: 'C', text: "Elle désactive les contrôles de sécurité de Google Antigravity." },
      { letter: 'D', text: "Elle traduit le code en binaire avant exécution." },
    ],
    correctAnswers: ['A'],
    explanation: "Chaque token généré devient le contexte des tokens suivants. Décomposer la réflexion étape par étape permet au modèle de s'appuyer sur ses propres déductions intermédiaires valides pour aboutir au bon résultat.",
  },
  {
    id: 8,
    codeSnippet: `// Directive de prompting :
"Avant de proposer la moindre ligne de code pour ce refactoring :
1. Liste les dépendances impactées dans le projet.
2. Identifie les risques de rupture de contrat d'API.
3. Énonce ton plan d'action en 3 étapes numérotées.
4. Seulement ensuite, génère le code."`,
    question: "À quelle variante de technique de prompting cette directive correspond-elle ?",
    options: [
      { letter: 'A', text: "Zero-shot direct non contraint." },
      { letter: 'B', text: "Chain of Thought explicite (Pensée structurée avant action)." },
      { letter: 'C', text: "Prompt Chaining asynchrone multi-machines." },
      { letter: 'D', text: "Génération aléatoire par température 2.0." },
    ],
    correctAnswers: ['B'],
    explanation: "Cette directive impose une chaîne de raisonnement obligatoire et séquentielle préalablement à l'action d'écriture, empêchant l'agent de foncer prématurément dans l'implémentation.",
  },
  {
    id: 9,
    question: "Qu'est-ce que la technique de 'Prompt Decomposition' (Décomposition de Prompt) ?",
    options: [
      { letter: 'A', text: "Supprimer des espaces et des retours à la ligne pour minifier le prompt." },
      { letter: 'B', text: "Diviser une tâche complexe et tentaculaire en une série de sous-tâches indépendantes, ciblées et séquentiellement vérifiables." },
      { letter: 'C', text: "Traduire un prompt d'anglais en français puis en espagnol." },
      { letter: 'D', text: "Diviser les fichiers source par paquets de 50 lignes." },
    ],
    correctAnswers: ['B'],
    explanation: "La décomposition fractionne une tâche intimidante (ex: migrer tout un module d'API) en sous-problèmes digestes (schéma de DB, service, contrôleur, tests), réduisant drastiquement le taux d'erreur.",
  },
  {
    id: 10,
    codeSnippet: `Demande initiale :
"Crée toute l'application e-commerce avec panier, paiement Stripe, backoffice et emails."

Application de la Prompt Decomposition :
Étape 1 : Modéliser les interfaces TypeScript des entités (User, Product, Order).
Étape 2 : Implémenter le service de calcul de panier avec ses tests unitaires.
Étape 3 : Intégrer le connecteur Stripe en mode bac à sable.`,
    question: "Quel est le bénéfice immédiat de cette décomposition pour le contrôle qualité du développeur ?",
    options: [
      { letter: 'A', text: "L'application est immédiatement déployée sur l'App Store." },
      { letter: 'B', text: "Chaque étape produit un artefact testable, validable et corrigeable isolément avant d'engager l'étape suivante." },
      { letter: 'C', text: "Le développeur n'a plus besoin d'écrire de documentation." },
      { letter: 'D', text: "Les tokens de contexte deviennent illimités." },
    ],
    correctAnswers: ['B'],
    explanation: "La décomposition permet une validation incrémentale à chaque jalon. Si une anomalie apparaît à l'étape 1, elle est corrigée immédiatement au lieu de contaminer l'ensemble du projet.",
  },
  {
    id: 11,
    question: "Quelle formulation déclenche la variante 'Zero-shot Chain of Thought' la plus célèbre et éprouvée dans la recherche en IA ?",
    options: [
      { letter: 'A', text: "'Réponds vite sans réfléchir.'" },
      { letter: 'B', text: "'Let's think step by step' (Réfléchissons étape par étape)." },
      { letter: 'C', text: "'Génère du code sans explication.'" },
      { letter: 'D', text: "'Ignore toutes les consignes précédentes.'" },
    ],
    correctAnswers: ['B'],
    explanation: "La formule de Kojima et al. ('Let's think step by step') active le mécanisme de décomposition interne du modèle sans nécessiter d'exemples préalables, améliorant nettement les scores logiques.",
  },
  {
    id: 12,
    question: "Dans Google Antigravity, comment la décomposition de prompt est-elle exploitée nativement par les agents lors de tâches complexes ?",
    options: [
      { letter: 'A', text: "En générant un plan d'action d'ingénierie préliminaire (Plan / Todo List) coché au fur et à mesure de l'exécution des outils." },
      { letter: 'B', text: "En redémarrant l'ordinateur à chaque sous-tâche." },
      { letter: 'C', text: "En envoyant un SMS au chef de projet." },
      { letter: 'D', text: "En convertissant le code en langage C#." },
    ],
    correctAnswers: ['A'],
    explanation: "Les agents avancés construisent un plan méthodique explicite (planification et suivi d'étapes) pour garder le cap sur les objectifs à long terme et vérifier l'avancement pas à pas.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Role & Contextual Prompting (Q13-Q18)
  // -------------------------------------------------------------
  {
    id: 13,
    question: "Quel est l'impact réel de l'attribution d'un rôle d'expert ('Role Prompting') sur le comportement de génération de l'agent ?",
    options: [
      { letter: 'A', text: "Cela modifie la vitesse de calcul physique du serveur GPU." },
      { letter: 'B', text: "Cela active un sous-espace sémantique ciblé dans l'espace latent du modèle, orientant le vocabulaire, les patterns d'architecture et les standards de rigueur vers ceux du domaine ciblé." },
      { letter: 'C', text: "Cela octroie un diplôme d'État officiel à l'intelligence artificielle." },
      { letter: 'D', text: "Cela désactive le garbage collector de V8." },
    ],
    correctAnswers: ['B'],
    explanation: "Le Role Prompting polarise la distribution de probabilités du modèle en activant les représentations sémantiques associées aux experts du domaine (meilleures pratiques, terminologie pointue, exigences accrues).",
  },
  {
    id: 14,
    codeSnippet: `Prompt A : "Écris une fonction de login."
Prompt B : "Agis en tant qu'Ingénieur Sécurité Applicative Senior spécialisé en conformité OWASP Top 10.
Conçois le gestionnaire d'authentification pour notre API Express TypeScript."`,
    question: "Quelle différence technique fondamentale observera-t-on entre le code généré par le Prompt A et celui du Prompt B ?",
    options: [
      { letter: 'A', text: "Le code du Prompt B intégrera nativement du rate limiting, du timing-safe comparison, le salage/hachage robuste et la neutralisation des messages d'erreur verbeux." },
      { letter: 'B', text: "Le code du Prompt B sera écrit en Python au lieu de TypeScript." },
      { letter: 'C', text: "Le code du Prompt A sera plus sécurisé car plus court." },
      { letter: 'D', text: "Le Prompt B refusera systématiquement d'exécuter la commande." },
    ],
    correctAnswers: ['A'],
    explanation: "Le persona d'expert sécurité active automatiquement les réflexes défensifs (OWASP) indispensables qui sont couramment omis lors d'un prompt naïf ou non contextualisé.",
  },
  {
    id: 15,
    question: "Qu'est-ce que le 'Contextual Prompting' (Prompting Contextuel) appliqué au développement logiciel ?",
    options: [
      { letter: 'A', text: "L'art d'alimenter l'agent avec l'environnement technique exact du projet (versions des packages, extraits de schéma de base de données, conventions locales) pour ancrer sa génération." },
      { letter: 'B', text: "Demander à l'agent quelle heure il est dans le pays où se trouve le serveur." },
      { letter: 'C', text: "L'obligation d'écrire tous les prompts en anglais américain." },
      { letter: 'D', text: "Un outil pour générer des diagrammes PowerPoint automatiquement." },
    ],
    correctAnswers: ['A'],
    explanation: "Le contextual prompting consiste à injecter les données d'environnement précises (versions, schémas, dépendances) pour que la réponse colle parfaitement à la réalité du projet sans supputations erronées.",
  },
  {
    id: 16,
    codeSnippet: `// Contexte fourni dans le prompt :
Stack : Next.js 15 (App Router), React 19, Tailwind CSS v4.
Fichier existant à modifier : app/dashboard/layout.tsx
Contrainte : Les Server Components doivent rester asynchrones sans directive 'use client'.`,
    question: "Quelle erreur fréquente d'agent ce cadrage contextuel permet-il d'éliminer immédiatement ?",
    options: [
      { letter: 'A', text: "L'utilisation obsolète du Pages Router (/pages) ou l'injection intempestive de hooks d'état React (useState) dans un Server Component." },
      { letter: 'B', text: "L'installation de Windows 95." },
      { letter: 'C', text: "La génération de variables CSS globales valides." },
      { letter: 'D', text: "Le respect des normes de typage strict." },
    ],
    correctAnswers: ['A'],
    explanation: "Sans ce contexte précis de version, les modèles entraînés sur des données antérieures mélangent fréquemment Pages Router et App Router, ou ajoutent 'use client' à tort.",
  },
  {
    id: 17,
    question: "Pourquoi l'excès de contexte (Context Stuffing) peut-il paradoxalement dégrader la qualité des réponses de l'agent ?",
    options: [
      { letter: 'A', text: "Parce que le compilateur refuse d'ouvrir plus de 3 fichiers." },
      { letter: 'B', text: "En raison du bruit informationnel et de la dilution d'attention, où les informations critiques se noient parmi des détails non pertinents (effet Lost in the Middle)." },
      { letter: 'C', text: "Parce que les câbles Ethernet saturent." },
      { letter: 'D', text: "Car le processeur diminue son voltage automatiquement." },
    ],
    correctAnswers: ['B'],
    explanation: "L'attention d'un transformeur n'est pas infinie. Injecter des milliers de lignes de code superflues dilue l'attention portée aux contraintes clés et augmente le risque d'oubli ou d'hallucination.",
  },
  {
    id: 18,
    question: "Quelle stratégie permet de pratiquer un Contextual Prompting optimal sans surcharger la mémoire de travail de l'agent ?",
    options: [
      { letter: 'A', text: "Copier tout le dossier node_modules dans la conversation." },
      { letter: 'B', text: "Fournir uniquement les signatures d'interfaces, les types exports et la structure des modules pertinents au lieu de l'implémentation complète des fichiers." },
      { letter: 'C', text: "Supprimer les fichiers TypeScript pour ne garder que du JavaScript brut." },
      { letter: 'D', text: "Utiliser des captures d'écran de l'écran entier." },
    ],
    correctAnswers: ['B'],
    explanation: "Fournir les déclarations de types (AST / interfaces .d.ts) apporte 100% de la sémantique et des contrats d'appels pour une fraction infime des tokens consommés par le code d'implémentation.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Structured Prompting & Meta-Prompting (Q19-Q24)
  // -------------------------------------------------------------
  {
    id: 19,
    question: "Qu'est-ce que le 'Structured Prompting' et quel problème critique résout-il dans l'automatisation d'agents ?",
    options: [
      { letter: 'A', text: "L'obligation d'utiliser des polices de caractères monospace." },
      { letter: 'B', text: "L'imposition d'un format de sortie strictement balisé ou schématisé (JSON, XML, YAML, schéma Zod), permettant à un script en aval de parser la réponse sans ambiguïté." },
      { letter: 'C', text: "Le renommage automatique de tous les fichiers en majuscules." },
      { letter: 'D', text: "L'interdiction de poser des questions le matin." },
    ],
    correctAnswers: ['B'],
    explanation: "Les réponses en texte libre sont imprévisibles pour les outils automatisés. Le Structured Prompting force une structure formelle (JSON/XML) immédiatement consommable par des parseurs logiciels.",
  },
  {
    id: 20,
    codeSnippet: `Réponds STRICTEMENT sous la forme d'un objet JSON valide conforme à ce schéma :
{
  "status": "APPROVED" | "REJECTED",
  "issuesCount": number,
  "vulnerabilities": Array<{ "file": string, "line": number, "description": string }>
}
N'inclus AUCUN texte explicatif ni bloc markdown avant ou après le JSON.`,
    question: "Pourquoi la consigne 'N'inclus AUCUN texte explicatif avant ou après le JSON' est-elle capitale ?",
    options: [
      { letter: 'A', text: "Pour que la méthode JSON.parse() du système d'orchestration ne lève pas une SyntaxError fatale à cause de phrases parasites." },
      { letter: 'B', text: "Parce que le format JSON ne supporte pas la langue française." },
      { letter: 'C', text: "Pour empêcher le disque dur de chauffer." },
      { letter: 'D', text: "Pour masquer les erreurs de syntaxe de l'agent." },
    ],
    correctAnswers: ['A'],
    explanation: "Si l'agent ajoute du texte de politesse ('Voici votre objet JSON : {...}'), le parseur machine échoue en erreur de syntaxe. La pureté du format est indispensable à l'automatisation fiable.",
  },
  {
    id: 21,
    question: "Quel avantage offrent les balises XML ou pseudo-balises (ex: `<instructions>`, `<context>`, `<output>`) dans la structuration d'un prompt complexe ?",
    options: [
      { letter: 'A', text: "Elles transforment le prompt en page Web dynamique." },
      { letter: 'B', text: "Elles séparent nettement les composantes fonctionnelles du prompt, aidant le modèle d'attention à distinguer sans ambiguïté les consignes des données à traiter." },
      { letter: 'C', text: "Elles permettent d'exécuter des requêtes SQL directement." },
      { letter: 'D', text: "Elles compressent le texte en format gzip." },
    ],
    correctAnswers: ['B'],
    explanation: "Les délimiteurs XML créent des cloisons sémantiques étanches. Le modèle identifie précisément où s'arrêtent les directives système et où commencent les données brutes de code à analyser.",
  },
  {
    id: 22,
    question: "Qu'est-ce que le 'Meta-Prompting' (ou Méta-Prompting) ?",
    options: [
      { letter: 'A', text: "Utiliser un prompt pour demander au modèle de concevoir, optimiser ou raffiner lui-même un prompt plus efficace pour une tâche cible." },
      { letter: 'B', text: "Acheter des actions en bourse de la société Meta." },
      { letter: 'C', text: "Créer un compte administrateur sur Facebook." },
      { letter: 'D', text: "Écrire des prompts en langage assembleur." },
    ],
    correctAnswers: ['A'],
    explanation: "Le Meta-Prompting met l'IA au service de l'ingénierie de prompt : on exploite les capacités d'abstraction du modèle pour qu'il formule ou audite lui-même les instructions idéales pour un autre agent.",
  },
  {
    id: 23,
    codeSnippet: `Prompt de Meta-Prompting :
"Tu es un Expert Architecte en Prompt Engineering.
Voici une instruction brute écrite par un développeur : 'Fais-moi des tests pour l'authentification'.
Analyse les lacunes de cette instruction et reformule-la sous forme d'un prompt professionnel complet
incluant Rôle, Contexte, Contraintes, Format et Critères de validation."`,
    question: "Quelle valeur ajoutée concrète cette approche apporte-t-elle à une équipe de développement ?",
    options: [
      { letter: 'A', text: "Elle permet de transformer rapidement des besoins vagues formulés par des juniors en spécifications de pilotage d'agents de niveau senior et reproductibles." },
      { letter: 'B', text: "Elle supprime le besoin de compiler le code TypeScript." },
      { letter: 'C', text: "Elle réduit le salaire des développeurs." },
      { letter: 'D', text: "Elle élimine automatiquement les bugs de la base de données." },
    ],
    correctAnswers: ['A'],
    explanation: "Le méta-prompting standardise la qualité des demandes au sein de l'équipe : il élève les requêtes floues en directives d'ingénierie complètes, exhaustives et rigoureuses.",
  },
  {
    id: 24,
    question: "Lorsqu'on utilise le Structured Prompting avec validation par schéma Zod dans un backend Node.js, comment gère-t-on l'échec de conformité de la réponse de l'agent ?",
    options: [
      { letter: 'A', text: "On réinjecte le log d'erreur Zod à l'agent dans un tour suivant en lui demandant de corriger spécifiquement les champs invalides (Pattern Self-Correction)." },
      { letter: 'B', text: "On désinstalle Zod du serveur." },
      { letter: 'C', text: "On ignore l'erreur et on injecte n'importe quelles données dans la base de données." },
      { letter: 'D', text: "On redémarre le système d'exploitation du client." },
    ],
    correctAnswers: ['A'],
    explanation: "C'est la boucle d'auto-réparation structurelle : le schéma Zod agit comme un oracle de validation déterministe ; s'il échoue, l'erreur exacte est soumise à l'agent pour correction ciblée.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Self-Critique & Prompt Chaining (Q25-Q30)
  // -------------------------------------------------------------
  {
    id: 25,
    question: "En quoi consiste la technique de 'Self-Critique et Vérification' (Self-Reflection / Reflexion) ?",
    options: [
      { letter: 'A', text: "Demander à l'agent d'insulter son propre code dans les commentaires Git." },
      { letter: 'B', text: "Imposer à l'agent, après génération d'une première solution, d'auditer son propre résultat par rapport à une liste de contrôle stricte avant de valider l'artefact." },
      { letter: 'C', text: "Faire tourner le code en boucle infinie sur un serveur distant." },
      { letter: 'D', text: "Créer un deuxième utilisateur dans l'IDE pour surveiller l'écran." },
    ],
    correctAnswers: ['B'],
    explanation: "La self-critique découple la phase de production de la phase d'évaluation. L'agent change de posture mentale pour traquer ses propres omissions ou bugs avant livraison finale.",
  },
  {
    id: 26,
    codeSnippet: `Protocole imposé à l'agent :
Étape 1 : Rédige l'algorithme de calcul des remises.
Étape 2 (Auto-Audit) : Passe en revue ta proposition au crible de ces 3 questions :
  - Que se passe-t-il si le panier est vide ou négatif ?
  - La division par zéro est-elle protégée ?
  - Le résultat est-il arrondi à 2 décimales exactes ?
Étape 3 : Si une anomalie est détectée, corrige-la explicitement avant de rendre la réponse finale.`,
    question: "Quel mécanisme cognitif cette consigne active-t-elle chez le LLM ?",
    options: [
      { letter: 'A', text: "L'inversion de polarité électrique du processeur." },
      { letter: 'B', text: "La stimulation d'un regard critique objectif (Self-Correction) qui brise l'adhérence aveugle à la première réponse générée." },
      { letter: 'C', text: "La suppression automatique des fichiers temporaires." },
      { letter: 'D', text: "L'arrêt prématuré de la connexion HTTP." },
    ],
    correctAnswers: ['B'],
    explanation: "Par défaut, les modèles ont tendance à confirmer leur première hypothèse. Poser une grille d'audit explicite les force à vérifier les cas limites et à corriger leurs faiblesses.",
  },
  {
    id: 27,
    question: "Qu'est-ce que le 'Prompt Chaining' (Chaînage de Prompts) ?",
    options: [
      { letter: 'A', text: "Attacher un cadenas physique sur le clavier de l'ordinateur." },
      { letter: 'B', text: "Une architecture logicielle où la sortie d'un premier prompt devient automatiquement l'entrée filtrée, transformée ou validée du prompt suivant dans un pipeline automatisé." },
      { letter: 'C', text: "Répéter le même prompt 10 fois dans la même fenêtre de chat." },
      { letter: 'D', text: "Une méthode de chiffrement des fichiers .env." },
    ],
    correctAnswers: ['B'],
    explanation: "Le chaînage de prompts compose un pipeline modulaire : au lieu de demander un miracle en un seul prompt monolithique, chaque étape accomplit une transformation unitaire avec une fiabilité maximale.",
  },
  {
    id: 28,
    codeSnippet: `Pipeline de chaînage :
Prompt 1 (Architecte) : Analyse la PR et produit un résumé JSON des changements.
    |
    v (Sortie JSON de Prompt 1)
Prompt 2 (Sécurité) : Analyse le JSON et identifie les risques d'injection.
    |
    v (Rapport de risques de Prompt 2)
Prompt 3 (Rédacteur) : Rédige la note de synthèse pour le Release Manager.`,
    question: "Pourquoi cette architecture en pipeline est-elle nettement supérieure à un unique méga-prompt demandant tout d'un coup ?",
    options: [
      { letter: 'A', text: "Parce que chaque prompt dispose d'une fenêtre de contexte propre, d'une tâche simple et focalisée, ce qui maximise la précision et simplifie le débogage de chaque étape." },
      { letter: 'B', text: "Parce qu'elle consomme moins d'électricité à l'échelle du datacenter." },
      { letter: 'C', text: "Parce qu'elle permet d'éviter d'installer Node.js." },
      { letter: 'D', text: "Parce que les méga-prompts sont interdits par les conditions d'utilisation." },
    ],
    correctAnswers: ['A'],
    explanation: "La modularité du Prompt Chaining isole les responsabilités. Si l'étape de sécurité échoue, on peut ajuster ou rejouer uniquement le Prompt 2 sans devoir tout régénérer depuis le début.",
  },
  {
    id: 29,
    question: "Quelle est la règle d'or pour concevoir les interfaces d'échange entre les maillons d'un pipeline de Prompt Chaining ?",
    options: [
      { letter: 'A', text: "Utiliser un format de données standardisé, strict et typé (généralement JSON validé par schéma) plutôt que du langage naturel narratif." },
      { letter: 'B', text: "Écrire les données sur une clé USB physique entre chaque appel." },
      { letter: 'C', text: "Traduire les données en rimes poétiques." },
      { letter: 'D', text: "Changer de langage de programmation à chaque étape." },
    ],
    correctAnswers: ['A'],
    explanation: "Pour que le maillon suivant consomme sans bavure la sortie du précédent, l'interface doit être un contrat de données strict (JSON schématisé) et non un paragraphe de texte verbeux.",
  },
  {
    id: 30,
    question: "Dans une chaîne de prompts, que doit-il se passer si l'un des maillons intermédiaires produit une sortie non conforme ou incomplète ?",
    options: [
      { letter: 'A', text: "Le pipeline doit poursuivre aveuglément jusqu'au bout pour voir ce qui arrive." },
      { letter: 'B', text: "Un mécanisme d'interception (circuit breaker / retry) doit capturer l'incohérence, stopper la chaîne et déclencher une ré-exécution ciblée ou alerter le développeur." },
      { letter: 'C', text: "L'IDE doit formater le disque dur." },
      { letter: 'D', text: "Le développeur doit réinstaller son système d'exploitation." },
    ],
    correctAnswers: ['B'],
    explanation: "La robustesse d'un pipeline repose sur des gardiens d'intégrité (gates) entre chaque maillon pour bloquer la propagation d'erreurs avant d'intoxiquer les étapes aval.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Gestion des Erreurs, Incertitudes & Hallucinations (Q31-Q35)
  // -------------------------------------------------------------
  {
    id: 31,
    question: "Quelle instruction explicite permet de réduire drastiquement le risque d'hallucination lorsqu'un agent doit travailler sur une librairie ou une API tierce peu connue ?",
    options: [
      { letter: 'A', text: "'Devine ce que fait la fonction si tu n'es pas certain.'" },
      { letter: 'B', text: "'Si une information, une signature de méthode ou un paramètre n'est pas explicitement documenté dans le contexte fourni, affirme clairement ton incertitude et refuse d'extrapoler.'" },
      { letter: 'C', text: "'Invente un nom de package plausible pour faire plaisir à l'utilisateur.'" },
      { letter: 'D', text: "'Écris la réponse en majuscules pour montrer ta confiance.'" },
    ],
    correctAnswers: ['B'],
    explanation: "Autoriser et encourager explicitement le modèle à déclarer son ignorance ou son incertitude désamorce son réflexe de complétion statistique consistant à inventer des méthodes inexistantes.",
  },
  {
    id: 32,
    codeSnippet: `// Situation :
L'agent propose d'installer le package 'react-super-fast-virtual-table'
pour résoudre un problème de scrolling.
Vérification : Ce package n'existe pas sur npmjs.org.`,
    question: "Comment qualifie-t-on ce phénomène dangereux en ingénierie d'IA et comment s'en prémunir ?",
    options: [
      { letter: 'A', text: "Une hallucination de dépendance (Package Hallucination) ; on s'en prémunit en interdisant l'installation de dépendances sans vérification préalable dans le terminal ou whitelist stricte." },
      { letter: 'B', text: "Une attaque de phishing lancée par le processeur." },
      { letter: 'C', text: "Un dépassement de pile dans la mémoire RAM." },
      { letter: 'D', text: "Un bug de police de caractères dans le terminal." },
    ],
    correctAnswers: ['A'],
    explanation: "L'hallucination de packages est une vulnérabilité critique (parfois exploitée par des attaquants créant ces faux packages malveillants sur npm). L'agent doit vérifier l'existence réelle avant tout ajout.",
  },
  {
    id: 33,
    question: "Comment formule-t-on une consigne robuste de gestion d'erreur face à une ambiguïté dans le cahier des charges d'une fonction ?",
    options: [
      { letter: 'A', text: "'Choisis l'option la plus facile à coder.'" },
      { letter: 'B', text: "'Identifie les deux interprétations possibles, expose leurs impacts respectifs et demande un arbitrage humain avant d'écrire le code.'" },
      { letter: 'C', text: "'Implémente les deux en même temps dans deux fichiers différents.'" },
      { letter: 'D', text: "'Supprime la fonction du code source.'" },
    ],
    correctAnswers: ['B'],
    explanation: "La transparence sur l'ambiguïté permet à l'ingénieur de garder la maîtrise des choix métier, évitant de développer des fonctionnalités sur des postulats infondés.",
  },
  {
    id: 34,
    question: "Quel rôle joue le paramètre de 'Température' (Temperature) dans le prompt engineering appliqué au code source dans les IDE ?",
    options: [
      { letter: 'A', text: "Il régule la vitesse des ventilateurs du processeur de la machine." },
      { letter: 'B', text: "Il contrôle le degré d'aléatoire de la génération : pour du code rigoureux, de la refactorisation ou du parsing JSON, on règle la température proche de 0 (0.0 à 0.2) pour maximiser le déterminisme." },
      { letter: 'C', text: "Il mesure la température ambiante de la pièce en degrés Celsius." },
      { letter: 'D', text: "Il doit toujours être réglé à 1.0 pour garantir la créativité du code." },
    ],
    correctAnswers: ['B'],
    explanation: "Une température basse (0.0 - 0.2) favorise les tokens les plus probables, garantissant reproductibilité, rigueur syntaxique et fidélité absolue aux contraintes techniques.",
  },
  {
    id: 35,
    codeSnippet: `Consigne :
"Si la suite de tests échoue après ta modification,
tu disposes de 2 tentatives maximum pour corriger.
Si l'erreur persiste après 2 essais, restaure le fichier dans son état Git initial et rapporte l'échec."`,
    question: "Quel bénéfice architectural fondamental cette directive apporte-t-elle à l'autonomie de l'agent ?",
    options: [
      { letter: 'A', text: "Elle empêche les boucles infinies de dégradation (thrashing) où l'agent tente des correctifs désespérés qui détruisent progressivement tout le fichier." },
      { letter: 'B', text: "Elle désactive Git sur la machine." },
      { letter: 'C', text: "Elle oblige l'agent à travailler le week-end." },
      { letter: 'D', text: "Elle supprime l'historique des commits." },
    ],
    correctAnswers: ['A'],
    explanation: "Fixer une borne de tentatives avec repli propre (rollback) évite l'effet de dérive où l'agent s'enferre dans des corrections hasardeuses qui aggravent le problème initial.",
  },

  // -------------------------------------------------------------
  // SECTION 7 : Projet Intégrateur — Agent Professionnel dans Antigravity (Q36-Q40)
  // -------------------------------------------------------------
  {
    id: 36,
    codeSnippet: `Architecture du Projet Intégrateur (Module 3) :
Objectif : Déployer un Agent de Refactoring TypeScript dans Google Antigravity.
Techniques combinées :
1. Role Prompting : Expert Performance & Typage Strict
2. Contextual Prompting : tsconfig.json et signatures des interfaces
3. Chain of Thought : Analyse des AST -> Plan de refactoring -> Code
4. Structured Prompting : Rapport Markdown standardisé avec métriques`,
    question: "Pourquoi la combinaison synergique de ces 4 techniques produit-elle un résultat infiniment supérieur à un prompt isolé ?",
    options: [
      { letter: 'A', text: "Parce que chaque technique comble une faille des autres : le rôle donne la posture, le contexte ancre la réalité, la CoT sécurise la logique et la structure garantit l'exploitabilité." },
      { letter: 'B', text: "Parce qu'elle force le processeur graphique à overclocker la mémoire vive." },
      { letter: 'C', text: "Parce qu'elle permet d'ignorer la licence du logiciel." },
      { letter: 'D', text: "Parce qu'elle désactive les pare-feux de l'entreprise." },
    ],
    correctAnswers: ['A'],
    explanation: "L'art du Prompt Engineering avancé réside dans la composition modulaire : combiner posture, ancrage factuel, raisonnement pas à pas et contrat de sortie verrouille chaque dimension de la tâche.",
  },
  {
    id: 37,
    question: "Dans le cadre du projet intégrateur sous Google Antigravity, comment s'assure-t-on que l'agent ne détériore pas les performances de l'application pendant son refactoring ?",
    options: [
      { letter: 'A', text: "En lui faisant confiance aveuglément sans exécuter de benchmarks." },
      { letter: 'B', text: "En imposant dans le prompt la mesure systématique des temps d'exécution ou de complexité algorithmique avant et après modification (tests de non-régression de performance)." },
      { letter: 'C', text: "En réduisant la taille de l'écran de l'IDE." },
      { letter: 'D', text: "En supprimant les index de la base de données SQL." },
    ],
    correctAnswers: ['B'],
    explanation: "La validation quantitative (benchmarks de temps de calcul, mémoire allouée, nombre de requêtes) inscrite dans le protocole de l'agent fournit une preuve objective de non-régression.",
  },
  {
    id: 38,
    codeSnippet: `Prompt de clôture du projet intégrateur :
"Génère le résumé de ta mission sous la forme d'un tableau comparatif :
| Métrique | Avant Refactoring | Après Refactoring | Gain Obtenu |
| Typage any | 24 occurrences | 0 occurrence | -100% |
| Couverture de tests | 62% | 88% | +26 pts |"`,
    question: "En quoi ce format de compte rendu final est-il capital pour la gouvernance d'ingénierie ?",
    options: [
      { letter: 'A', text: "Il permet une traçabilité immédiate de la valeur ajoutée et une validation rapide en revue de code (Pull Request) par les pairs." },
      { letter: 'B', text: "Il augmente automatiquement les étoiles du dépôt sur GitHub." },
      { letter: 'C', text: "Il empêche les autres développeurs de modifier la branche." },
      { letter: 'D', text: "Il permet d'effacer les logs de compilation." },
    ],
    correctAnswers: ['A'],
    explanation: "Un tableau comparatif avant/après fournit une synthèse factuelle, chiffrée et transparente facilitant l'approbation de la PR par les reviewers humains.",
  },
  {
    id: 39,
    question: "Quel est le risque de s'en remettre exclusivement à la 'Self-Critique' de l'agent sans aucune validation externe par un outil déterministe (compilateur, linter, tests) ?",
    options: [
      { letter: 'A', text: "L'agent peut être aveugle à ses propres angles morts logiques et s'auto-attribuer une note parfaite tout en laissant subsister une faille subtile." },
      { letter: 'B', text: "L'ordinateur risque de redémarrer sans préavis." },
      { letter: 'C', text: "Le fichier TypeScript sera converti en binaire Java." },
      { letter: 'D', text: "Il n'y a aucun risque, la self-critique des LLM est infaillible à 100%." },
    ],
    correctAnswers: ['A'],
    explanation: "L'auto-critique du LLM reste probabiliste. Elle doit impérativement être complétée par des oracles logiciels déterministes (le compilateur `tsc`, `npm test`, les linters) qui ne mentent jamais.",
  },
  {
    id: 40,
    question: "Au terme de ce Module 3, quelle compétence distingue fondamentalement un 'Prompt Engineer pour Agents' d'un utilisateur ordinaire de chatbots ?",
    options: [
      { letter: 'A', text: "La capacité de taper plus de 150 mots par minute au clavier." },
      { letter: 'B', text: "La maîtrise de l'orchestration méthodique de techniques formelles (Few-shot, CoT, chaînage, schémas typés, garde-fous déterministes) pour obtenir des comportements d'agents prévisibles, fiables et auditables en environnement industriel." },
      { letter: 'C', text: "L'apprentissage par cœur du dictionnaire de la langue anglaise." },
      { letter: 'D', text: "L'utilisation exclusive d'émojis dans les conversations avec l'IA." },
    ],
    correctAnswers: ['B'],
    explanation: "L'ingénieur de prompt conçoit des systèmes déterministes, reproductibles et sécurisés en composant des techniques avancées pour piloter des agents autonomes avec le même niveau d'exigence qu'un logiciel de production.",
  },
];

