export interface ChapterMetaInfo {
  duration: string;
  description: string;
}

export const AI_ENGINEERING_CHAPTER_META: Record<string, Record<string, ChapterMetaInfo>> = {
  'module-1': {
    'chapitre-1': {
      duration: '1 h 30 à 2 h',
      description: "Appréhender le fonctionnement des LLMs, l'architecture de Gemini, la tokenisation, les fenêtres de contexte et la maîtrise des hallucinations.",
    },
    'chapitre-2': {
      duration: '2 h',
      description: "Initialiser l'environnement de développement Node.js/TypeScript, configurer les variables d'environnement et sécuriser la clé API Google Gen AI.",
    },
    'chapitre-3': {
      duration: '2 h',
      description: 'Maîtriser les principes fondamentaux du prompt engineering : rôle système, contexte, contraintes strictes, formatage de sortie et exemples few-shot.',
    },
    'chapitre-4': {
      duration: '2 h à 2 h 30',
      description: "Manipuler l'API Google Gen AI, formuler des requêtes simples et paramétrer la température, le top-p, le top-k et les jetons maximaux.",
    },
    'chapitre-5': {
      duration: '2 h à 2 h 30',
      description: "Mettre en œuvre des sessions multi-tours, maintenir l'historique conversationnel avec previous_interaction_id et gérer la mémoire contextuelle.",
    },
    'chapitre-6': {
      duration: '2 h 30',
      description: 'Garantir la fiabilité des sorties grâce au mode JSON forcé et à la validation stricte de schémas de données avec Zod et JSON Schema.',
    },
    'chapitre-7': {
      duration: '2 h 30 à 3 h',
      description: "Exploiter les capacités multimodales de Gemini 2.5 Flash pour analyser, transcrire et extraire des données d'images, graphiques et fichiers PDF.",
    },
    'chapitre-8': {
      duration: '3 h',
      description: 'Diffuser les réponses mot par mot en streaming temps réel et connecter le modèle à des fonctions externes via le Function Calling natif.',
    },
    'chapitre-9': {
      duration: '2 h à 2 h 30',
      description: "Gérer les erreurs d'API, le rate limiting, les quotas, et déployer des mécanismes de retry exponentiel et de bascule de modèles (fallback).",
    },
    'projet-synthese': {
      duration: '4 h à 5 h',
      description: 'Développer une API complète combinant analyse multimodale, streaming temps réel et validation stricte de réponses JSON en production.',
    },
    'evaluation': {
      duration: '1 h 30',
      description: "Tester et consolider l'ensemble des compétences théoriques et pratiques acquises sur l'intégration des API Google Gemini.",
    },
    'annexes': {
      duration: '1 h',
      description: 'Consulter le récapitulatif des commandes essentielles, la documentation officielle Google Gen AI et les ressources d’approfondissement.',
    },
  },

  'module-2': {
    'chapitre-1': {
      duration: '1 h 30 à 2 h',
      description: "Comprendre les spécificités UX/UI des applications alimentées par l'IA : feedback immédiat, états transitoires et gestion de l'incertitude.",
    },
    'chapitre-2': {
      duration: '2 h',
      description: "Structurer un projet React/Next.js typé pour communiquer de façon robuste et asynchrone avec un backend d'intelligence artificielle.",
    },
    'chapitre-3': {
      duration: '2 h 30',
      description: 'Créer une interface de messagerie réactive avec historique de conversation, bulles de dialogue distinctes et saisie ergonomique.',
    },
    'chapitre-4': {
      duration: '2 h à 2 h 30',
      description: 'Gérer élégamment les états de chargement (skeletons, spinners), les timeouts et les messages d’erreur conversationnels.',
    },
    'chapitre-5': {
      duration: '2 h',
      description: "Explorer l'architecture de Vercel AI SDK (ai/react) et comprendre ses avantages pour unifier la consommation de flux de texte génératif.",
    },
    'chapitre-6': {
      duration: '2 h 30 à 3 h',
      description: 'Maîtriser les hooks useChat et useCompletion pour simplifier radicalement la gestion d’état et le rendu progressif des réponses.',
    },
    'chapitre-7': {
      duration: '2 h 30',
      description: 'Convertir des flux JSON structurés en composants React interactifs, tableaux dynamiques et visualisations graphiques riches.',
    },
    'chapitre-8': {
      duration: '2 h 30',
      description: "Permettre l'upload, la prévisualisation et l'envoi de documents et d'images vers l'IA avec retour visuel immédiat pour l'utilisateur.",
    },
    'chapitre-9': {
      duration: '2 h à 2 h 30',
      description: 'Annuler les requêtes obsolètes via AbortController, minimiser les re-rendus React et mettre en place du débouncing de frappe.',
    },
    'chapitre-10': {
      duration: '2 h 30',
      description: 'Sanitiser les rendus Markdown contre les failles XSS, sécuriser les interactions et rédiger des tests de composants avec React Testing Library.',
    },
    'projet-synthese': {
      duration: '4 h à 5 h',
      description: 'Réaliser un tableau de bord IA conversationnel complet combinant streaming, formulaires typés Zod et visualisation dynamique.',
    },
    'evaluation': {
      duration: '1 h 30',
      description: "Mesurer vos acquis pratiques à travers un quiz approfondi, un audit de code frontend et une grille d'évaluation d'interface IA.",
    },
  },

  'module-3': {
    'chapitre-1': {
      duration: '1 h 30 à 2 h',
      description: "Analyser les responsabilités critiques du serveur : isolation des secrets API, contrôle d'accès, persistance et découplage logique.",
    },
    'chapitre-2': {
      duration: '2 h',
      description: 'Configurer un environnement serveur moderne avec TypeScript, tsx, ESLint et structurer une architecture en couches industrielles.',
    },
    'chapitre-3': {
      duration: '2 h à 2 h 30',
      description: "Mettre en place la validation stricte des variables d'environnement au démarrage avec Zod et initialiser un serveur Express modulaire.",
    },
    'chapitre-4': {
      duration: '2 h 30',
      description: 'Encapsuler les appels à Gemini dans une couche de service découplée et exposer un endpoint REST de génération robuste.',
    },
    'chapitre-5': {
      duration: '2 h 30 à 3 h',
      description: 'Appliquer les patrons d’architecture logicielle : séparation stricte entre routes, contrôleurs de requête, logique métier et middlewares.',
    },
    'chapitre-6': {
      duration: '2 h 30',
      description: 'Modéliser et persister les conversations et messages dans MySQL avec gestion de pool de connexions et intégrité relationnelle.',
    },
    'chapitre-7': {
      duration: '2 h 30',
      description: 'Configurer Vercel AI SDK côté serveur pour orchestrer des flux Server-Sent Events (SSE) standardisés vers le client.',
    },
    'chapitre-8': {
      duration: '2 h à 2 h 30',
      description: "Implémenter un rate limiter dynamique, plafonner la consommation de tokens et filtrer les requêtes malveillantes contre l'API.",
    },
    'chapitre-9': {
      duration: '2 h 30',
      description: 'Bâtir un middleware global de gestion d’erreurs, normaliser les codes HTTP et assurer la continuité de service en cas de panne IA.',
    },
    'chapitre-10': {
      duration: '3 h',
      description: 'Rédiger une suite complète de tests unitaires et d’intégration HTTP en mockant les appels LLM pour un pipeline CI/CD rapide.',
    },
    'chapitre-11': {
      duration: '2 h 30',
      description: 'Mettre en place des logs structurés avec Pino, surveiller la latence de bout en bout et finaliser l’interfaçage temps réel avec React.',
    },
    'projet-synthese': {
      duration: '4 h à 5 h',
      description: 'Concevoir et livrer une API backend complète en couches : authentification, streaming, persistance MySQL et monitoring.',
    },
    'evaluation': {
      duration: '1 h 30',
      description: 'Valider l’ensemble des compétences backend IA via une checklist de mise en production, un questionnaire technique et un audit de code.',
    },
  },

  'module-4': {
    'chapitre-1': {
      duration: '1 h 30 à 2 h',
      description: "Comprendre les limites des LLMs purs (hallucinations, obsolescence) et découvrir l'architecture RAG reliant recherche documentaire et génération ancrée.",
    },
    'chapitre-2': {
      duration: '1 h 30',
      description: 'Analyser la complémentarité entre base relationnelle SQL (MySQL/ACID) et base vectorielle (Qdrant) pour la persistance documentaire et sémantique.',
    },
    'chapitre-3': {
      duration: '2 h',
      description: 'Maîtriser le modèle text-embedding-004, comprendre les vecteurs denses, la dimensionnalité sémantique et calculer la similarité cosinus.',
    },
    'chapitre-4': {
      duration: '2 h à 2 h 30',
      description: "Concevoir des pipelines d'extraction et implémenter des stratégies de découpage (taille fixe, overlap, délimiteurs sémantiques) avec métadonnées.",
    },
    'chapitre-5': {
      duration: '2 h',
      description: 'Installer Qdrant via Docker, initialiser une collection de vecteurs à 768 dimensions et configurer les paramètres de distance cosinus et d’index HNSW.',
    },
    'chapitre-6': {
      duration: '2 h 30',
      description: 'Créer le schéma relationnel de traçabilité dans MySQL et insérer de manière atomique les points vectoriels avec métadonnées dans Qdrant.',
    },
    'chapitre-7': {
      duration: '2 h 30 à 3 h',
      description: "Assembler le pipeline complet d'ingestion documentaire, gérer le hachage SHA-256 pour éviter les doublons et traiter les erreurs de vectorisation.",
    },
    'chapitre-8': {
      duration: '2 h',
      description: 'Exécuter des requêtes de recherche vectorielle k-NN sur Qdrant avec filtrage strict par métadonnées (droits d’accès et utilisateur).',
    },
    'chapitre-9': {
      duration: '2 h',
      description: 'Implémenter la réconciliation en temps constant entre les identifiants vectoriels Qdrant et les fragments textuels bruts stockés dans MySQL.',
    },
    'chapitre-10': {
      duration: '2 h 30',
      description: 'Assembler le prompt RAG avec consignes de référence strictes, citations de sources et élimination préventive des hallucinations du modèle Gemini.',
    },
    'chapitre-11': {
      duration: '2 h 30 à 3 h',
      description: "Exposer l'API REST de questions-réponses RAG avec validation Zod, streaming HTTP, gestion d'erreurs et collection Postman de validation.",
    },
    'chapitre-12': {
      duration: '3 h',
      description: 'Déployer la recherche hybride (dense + sparse), le reclassement sémantique (reranking) et durcir la sécurité contre les injections de prompt indirectes.',
    },
    'projet-synthese': {
      duration: '4 h à 5 h',
      description: "Construire de bout en bout un assistant d'entreprise capable d'ingérer des documents techniques et de répondre avec citations vérifiables.",
    },
    'evaluation': {
      duration: '1 h 30',
      description: 'Valider l’ensemble des compétences RAG à travers un quiz d’évaluation approfondi, une checklist de production et les annexes techniques.',
    },
  },

  'module-5': {
    'chapitre-1': {
      duration: '1 h 30 à 2 h',
      description: 'Découvrir la plateforme d’automatisation n8n, ses concepts clés (nœuds, exécutions, items JSON) et ses cas d’usage couplés à l’IA générative.',
    },
    'chapitre-2': {
      duration: '2 h',
      description: 'Comprendre la structure interne des flux de données dans n8n, manipuler les expressions dynamiques et maîtriser le formatage JSON.',
    },
    'chapitre-3': {
      duration: '2 h 30',
      description: 'Utiliser les embranchements conditionnels (IF/Switch), les boucles et les scripts JavaScript (Code Node) pour transformer les données complexes.',
    },
    'chapitre-4': {
      duration: '2 h',
      description: 'Déclencher des workflows de manière planifiée (Cron) ou en temps réel via des Webhooks HTTP sécurisés par en-têtes et tokens secrets.',
    },
    'chapitre-5': {
      duration: '2 h à 2 h 30',
      description: 'Intégrer des services tiers via le nœud HTTP Request, gérer les authentifications par clé API, Bearer Token et protocoles OAuth2.',
    },
    'chapitre-6': {
      duration: '2 h 30',
      description: 'Configurer les connexions n8n à MySQL, exécuter des requêtes paramétrées sécurisées et synchroniser les données d’entreprise.',
    },
    'chapitre-7': {
      duration: '2 h 30',
      description: 'Connecter les nœuds officiels d’IA ou HTTP vers Gemini, paramétrer des prompts système et automatiser la classification ou le résumé de contenus.',
    },
    'chapitre-8': {
      duration: '3 h',
      description: 'Interconnecter un frontend React, une API Express et un orchestrateur n8n pour déléguer les traitements d’IA asynchrones lourds.',
    },
    'chapitre-9': {
      duration: '2 h 30',
      description: 'Créer des flux de rattrapage d’erreur (Error Trigger), modéliser des sous-workflows modulaires réutilisables et configurer des mécanismes de reprise.',
    },
    'chapitre-10': {
      duration: '2 h 30',
      description: 'Protéger les flux contre les fuites de données, appliquer le principe de moindre privilège et suspendre l’exécution pour approbation humaine.',
    },
    'chapitre-11': {
      duration: '3 h',
      description: 'Déployer n8n en production avec Docker Compose, configurer Redis en mode queue pour absorber les pics de charge et persister les exécutions.',
    },
    'projet-synthese': {
      duration: '4 h à 5 h',
      description: 'Créer un système automatisé de traitement des tickets clients : triage par IA, enrichissement MySQL, résumé Gemini et notification asynchrone.',
    },
    'evaluation': {
      duration: '1 h 30',
      description: 'Valider la maîtrise de n8n à travers un quiz technique complet, une checklist d’architecture de production et les ressources officielles.',
    },
  },

  'module-6': {
    'chapitre-1': {
      duration: '1 h 30 à 2 h',
      description: 'Distinguer les modèles d’IA linéaires des systèmes agentiques capables de raisonner, d’agir sur leur environnement et d’itérer vers un objectif.',
    },
    'chapitre-2': {
      duration: '2 h',
      description: 'Décortiquer les rouages d’un agent : profil système, mémoire à court et long terme, planification (ReAct) et catalogue d’outils.',
    },
    'chapitre-3': {
      duration: '2 h 30',
      description: 'Déclarer des outils typés dans Google Gemini, interpréter les intentions d’appels de fonctions et renvoyer les résultats d’exécution.',
    },
    'chapitre-4': {
      duration: '2 h 30',
      description: 'Construire un registre d’outils extensible avec schémas Zod stricts pour interdire toute exécution d’arguments invalides ou malveillants.',
    },
    'chapitre-5': {
      duration: '2 h 30 à 3 h',
      description: 'Implémenter une boucle agentique robuste (Pensée → Action → Observation) avec limitation stricte du nombre de tours (MAX_STEPS).',
    },
    'chapitre-6': {
      duration: '2 h 30',
      description: 'Persister l’état de l’agent, ses raisonnements intermédiaires et les retours d’outils dans MySQL pour garantir la reprise après incident.',
    },
    'chapitre-7': {
      duration: '3 h',
      description: 'Doter l’agent de capacités multi-sources : interrogation SQL autonome, recherche vectorielle dans Qdrant et requêtes HTTP externes.',
    },
    'chapitre-8': {
      duration: '2 h 30',
      description: 'Sécuriser les outils d’agent contre les attaques SSRF, restreindre les plages IP et exiger une validation humaine sur les opérations destructives.',
    },
    'chapitre-9': {
      duration: '3 h',
      description: 'Concevoir des architectures multi-agents collaboratives avec un superviseur central orchestrant des agents spécialisés dans des tâches expertes.',
    },
    'chapitre-10': {
      duration: '2 h 30',
      description: 'Comprendre les principes fondamentaux de LangGraph.js : graphes d’états cycliques, nœuds, canaux et annotations de réduction d’état.',
    },
    'chapitre-11': {
      duration: '2 h 30 à 3 h',
      description: 'Créer des arêtes conditionnelles routant dynamiquement le flux selon les décisions du modèle, et gérer les boucles de réessai contrôlées.',
    },
    'chapitre-12': {
      duration: '2 h 30',
      description: 'Activer la persistance avec les Checkpointers de LangGraph pour sauvegarder chaque étape d’exécution et reprendre un fil conversationnel.',
    },
    'chapitre-13': {
      duration: '3 h',
      description: 'Mettre en œuvre le pattern Human-in-the-Loop avec interrupt() pour stopper le graphe, attendre l’accord utilisateur et reprendre l’exécution.',
    },
    'projet-synthese': {
      duration: '5 h à 6 h',
      description: 'Développer un agent de recherche et d’analyse financière orchestré par LangGraph, doté d’outils RAG, de calculs et de validation humaine.',
    },
    'evaluation': {
      duration: '1 h 30',
      description: 'Tester les graphes d’agents avec Vitest, mesurer la consommation de tokens et valider l’ensemble du cursus agentique.',
    },
  },

  'module-7': {
    'chapitre-1': {
      duration: '1 h 30 à 2 h',
      description: 'Auditer les pratiques de sécurisation des secrets d’API, utiliser des coffres-forts (Vault/Secrets Manager) et configurer la rotation automatisée.',
    },
    'chapitre-2': {
      duration: '2 h à 2 h 30',
      description: 'Sécuriser les endpoints d’IA par jetons JWT vérifiés et appliquer un contrôle d’accès basé sur les rôles (RBAC) au niveau de chaque ressource.',
    },
    'chapitre-3': {
      duration: '2 h 30',
      description: 'Identifier les attaques par jailbreak et injection directe (Prompt Injection), et mettre en place des couches de garde (Guardrails) et de sanitisation.',
    },
    'chapitre-4': {
      duration: '2 h 30',
      description: 'Prévenir les attaques par injection indirecte dissimulées dans les documents ingérés par le RAG et isoler le contexte non fiable.',
    },
    'chapitre-5': {
      duration: '2 h 30',
      description: 'Limiter les privilèges des outils d’agents, isoler les contextes d’exécution et interdire formellement l’accès aux commandes système.',
    },
    'chapitre-6': {
      duration: '2 h',
      description: 'Valider exhaustivement les payloads entrants et sortants pour empêcher toute corruption de données ou injection de code côté client/serveur.',
    },
    'chapitre-7': {
      duration: '2 h',
      description: 'Systématiser la barrière de confirmation humaine pour toute action irréversible (modification en base, envoi d’emails, transactions financières).',
    },
    'chapitre-8': {
      duration: '2 h 30',
      description: 'Créer des mocks déterministes du SDK Gemini avec Vitest pour tester la logique applicative rapidement sans consommer de tokens.',
    },
    'chapitre-9': {
      duration: '2 h 30',
      description: 'Valider l’ensemble des routes HTTP, les middlewares d’authentification et les réponses JSON avec Supertest en environnement de test isolé.',
    },
    'chapitre-10': {
      duration: '3 h',
      description: 'Mettre en place des bancs d’essai pour évaluer la convergence des agents, détecter les boucles infinies et vérifier les états terminaux des graphes.',
    },
    'chapitre-11': {
      duration: '2 h 30',
      description: 'Déployer des métriques d’évaluation automatisées (fidélité, pertinence, complétude) en utilisant un modèle juge (LLM-as-a-judge).',
    },
    'chapitre-12': {
      duration: '2 h 30',
      description: 'Quantifier le taux d’hallucination à l’aide de jeux de tests de référence et implémenter des techniques d’ancrage strict pour l’éliminer.',
    },
    'chapitre-13': {
      duration: '2 h',
      description: 'Monitorer la consommation de tokens par utilisateur/organisation, calculer le coût unitaire par interaction et définir des quotas d’alerte.',
    },
    'chapitre-14': {
      duration: '2 h 30',
      description: 'Implémenter un cache sémantique Redis pour requêtes fréquentes, élaguer les prompts superflus et optimiser la latence TTFT (Time to First Token).',
    },
    'chapitre-15': {
      duration: '3 h',
      description: 'Mettre en œuvre le traçage distribué des requêtes avec OpenTelemetry, générer des traces pour chaque sous-appel et centraliser les logs.',
    },
    'projet-synthese': {
      duration: '4 h à 5 h',
      description: 'Auditer, blinder et tester une API d’IA complète : couverture de tests supérieure à 80 %, guardrails actifs et observabilité configurée.',
    },
    'evaluation': {
      duration: '1 h 30',
      description: 'Passer en revue la checklist de déploiement en production, réaliser le bilan sécuritaire et valider le certificat du module.',
    },
  },

  'module-8': {
    'chapitre-1': {
      duration: '2 h',
      description: 'Définir les spécifications fonctionnelles et techniques de l’assistant d’entreprise : RAG multi-sources, agents d’action et interface temps réel.',
    },
    'chapitre-2': {
      duration: '2 h 30',
      description: 'Modéliser l’architecture système complète : Frontend React, Backend Express, Base MySQL, Base vectorielle Qdrant et Orchestrateur n8n.',
    },
    'chapitre-3': {
      duration: '2 h 30',
      description: 'Rédiger le script DDL relationnel pour la gestion des utilisateurs, des documents, des segments, des fils de discussion et des exécutions d’outils.',
    },
    'chapitre-4': {
      duration: '3 h',
      description: 'Construire le pipeline d’ingestion documentaire haute performance avec chunking sémantique, stockage vectoriel Qdrant et métadonnées de filtrage.',
    },
    'chapitre-5': {
      duration: '3 h',
      description: 'Développer le serveur Express en couches étanches (Routes, Controllers, Services, Repositories) et documenter les contrats d’API avec OpenAPI.',
    },
    'chapitre-6': {
      duration: '2 h 30',
      description: 'Verrouiller les accès avec JWT HttpOnly, vérifier les rôles sur chaque endpoint et assainir toutes les requêtes entrantes via des schémas Zod.',
    },
    'chapitre-7': {
      duration: '2 h 30',
      description: 'Paramétrer le client Gemini 2.5 Flash avec prompts système d’entreprise, consignes anti-hallucination et gestion stricte des contextes.',
    },
    'chapitre-8': {
      duration: '3 h',
      description: 'Implémenter la recherche documentaire avec filtrage par tenant, reconstruction du contexte et génération de citations de sources cliquables.',
    },
    'chapitre-9': {
      duration: '3 h',
      description: 'Développer le registre d’outils métier de l’assistant (recherche SQL, calculs, météo, actions) et orchestrer la boucle d’exécution.',
    },
    'chapitre-10': {
      duration: '3 h 30',
      description: 'Structurer le graphe d’états de l’assistant dans LangGraph avec contrôle conditionnel, points de reprise et suspension d’actions sensibles.',
    },
    'chapitre-11': {
      duration: '3 h',
      description: 'Déléguer les tâches asynchrones d’ingestion et de notification par email/Slack à des workflows n8n déclenchés via webhooks signés.',
    },
    'chapitre-12': {
      duration: '3 h 30',
      description: 'Construire l’interface utilisateur moderne avec React, Tailwind CSS, streaming mot par mot, gestion des documents et visualisation des sources.',
    },
    'chapitre-13': {
      duration: '3 h',
      description: 'Rédiger et exécuter la suite de tests automatisés couvrant les services métier, les routes HTTP et les composants React critiques.',
    },
    'chapitre-14': {
      duration: '2 h 30',
      description: 'Déployer le cache Redis, configurer le traçage distribué OpenTelemetry et analyser les tableaux de bord de latence et de coûts d’API.',
    },
    'chapitre-15': {
      duration: '3 h',
      description: 'Conteneuriser l’ensemble des services avec Docker Compose, sécuriser les variables d’environnement et préparer le déploiement de production.',
    },
    'projet-synthese': {
      duration: '4 h à 6 h',
      description: 'Finaliser les 9 travaux pratiques de synthèse, structurer le dépôt GitHub et rédiger un README de niveau ingénieur pour valoriser le projet.',
    },
    'evaluation': {
      duration: '2 h',
      description: 'Évaluer l’ensemble du projet selon la grille de certification de 15 critères de succès et clôturer le parcours d’ingénieur en IA.',
    },
  },
};

