import { ExamMetadata, ExamQuestion } from './types';

export const PROMPT_ENGINEERING_MODULE_8_EXAM_METADATA: ExamMetadata = {
  moduleId: 'prompt-engineering-module-8',
  title: "Examen Officiel de Certification — Module 8 : Projet Final Professionnel & Système Multi-Agents Complet",
  durationMinutes: 40,
  passingScorePercent: 80,
  totalQuestions: 40,
};

export const PROMPT_ENGINEERING_MODULE_8_QUESTIONS: ExamQuestion[] = [
  // -------------------------------------------------------------
  // SECTION 1 : Spécifications & Architecture Globale du Projet (Q1-Q6)
  // -------------------------------------------------------------
  {
    id: 1,
    question: "Dans le cadre du Projet Final (Module 8), quel est l'objectif d'ingénierie principal assigné à l'apprenant ?",
    options: [
      { letter: 'A', text: "Concevoir, configurer et orchestrer un collectif complet d'agents IA spécialisés capables de développer, sécuriser, tester et documenter de bout en bout une application React + Node.js professionnelle sous Google Antigravity." },
      { letter: 'B', text: "Écrire manuellement 10 000 lignes de code assembleur sans utiliser d'ordinateur." },
      { letter: 'C', text: "Installer une distribution Linux sur un smartphone." },
      { letter: 'D', text: "Acheter 5 serveurs physiques pour son salon." },
    ],
    correctAnswers: ['A'],
    explanation: "Le projet de fin d'études constitue l'aboutissement pratique : piloter une équipe d'agents complémentaires sous gouvernance stricte et validation humaine pour livrer une application complète de production.",
  },
  {
    id: 2,
    codeSnippet: `Architecture du Système Multi-Agents (Module 8) :
- Agent 1 : Coordinateur Central (Chef d'orchestre, relation utilisateur)
- Agent 2 : Architecte Système (Modélisation de données, contrats OpenAPI)
- Agent 3 : Développeur Full-Stack (Implémentation React / Express / Prisma)
- Agent 4 : Auditeur de Sécurité & Conformité (OWASP, protection des secrets)
- Agent 5 : Ingénieur QA & Tests (Couverture de tests Jest/Vitest, non-régression)
- Agent 6 : Documentaliste Technique (Documentation API, guides, CHANGELOG)`,
    question: "Pourquoi cette répartition des rôles en 6 entités distinctes est-elle considérée comme la référence pour les projets industriels ?",
    options: [
      { letter: 'A', text: "Parce qu'elle reflète fidèlement la division du travail des équipes d'ingénierie logicielle modernes, garantissant la séparation des préoccupations, des contrôles croisés et des fenêtres de contexte ciblées." },
      { letter: 'B', text: "Parce que le chiffre 6 porte chance selon la tradition informatique." },
      { letter: 'C', text: "Parce que cela permet de payer 6 fois plus cher les abonnements d'API." },
      { letter: 'D', text: "Parce que Node.js ne fonctionne qu'avec 6 processus simultanés." },
    ],
    correctAnswers: ['A'],
    explanation: "Cette architecture reproduit le cycle de vie logiciel complet. Chaque agent apporte son regard d'expert, réduisant les angles morts et évitant qu'un agent unique ne s'auto-évalue complaisamment.",
  },
  {
    id: 3,
    question: "Dans la topologie choisie pour le projet final, pourquoi le Coordinateur est-il le SEUL agent habilité à dialoguer directement avec le développeur humain ?",
    options: [
      { letter: 'A', text: "Pour éviter la cacophonie cognitive et la fragmentation des messages, en offrant un point de contact unique, clair et synthétique à l'utilisateur." },
      { letter: 'B', text: "Parce que les autres agents ne savent pas parler la langue française." },
      { letter: 'C', text: "Parce que l'interface graphique ne supporte qu'un seul pixel de texte." },
      { letter: 'D', text: "Pour masquer les erreurs de code aux yeux de l'utilisateur." },
    ],
    correctAnswers: ['A'],
    explanation: "Si 5 agents écrivaient simultanément dans la boîte de dialogue, le développeur serait submergé de sollicitations contradictoires. Le Coordinateur filtre le bruit et canalise les arbitrages.",
  },
  {
    id: 4,
    question: "Quelle stack technologique sert de support d'application pour ce projet final intégrateur ?",
    options: [
      { letter: 'A', text: "WordPress et PHP 5.4 avec base de données Microsoft Access." },
      { letter: 'B', text: "Frontend React (Vite / Next.js) avec TypeScript strict, Backend Node.js Express / Fastify, ORM Prisma avec base relationnelle et cache Redis." },
      { letter: 'C', text: "Uniquement du HTML statique sans JavaScript." },
      { letter: 'D', text: "Une application console en MS-DOS." },
    ],
    correctAnswers: ['B'],
    explanation: "La stack moderne React/Node.js/Prisma/TypeScript/Redis représente l'état de l'art du développement d'applications d'entreprise, offrant un banc d'épreuve complet pour les agents IA.",
  },
  {
    id: 5,
    codeSnippet: `// Règle d'or du Coordinateur :
"Tu ne modifies directement aucun fichier source de production (.ts, .tsx).
Ton rôle est de planifier, déléguer, contrôler et synthétiser."`,
    question: "Quel principe d'orchestration fondamental cette interdiction d'écriture imposée au chef d'orchestre matérialise-t-elle ?",
    options: [
      { letter: 'A', text: "La préservation de la posture de supervision : si le coordinateur commence à coder, il perd la hauteur de vue et sature sa fenêtre de contexte avec des détails d'implémentation." },
      { letter: 'B', text: "Une punition infligée au modèle par l'utilisateur." },
      { letter: 'C', text: "Une incompatibilité entre le modèle Gemini et le disque dur." },
      { letter: 'D', text: "L'obligation d'embaucher un stagiaire." },
    ],
    correctAnswers: ['A'],
    explanation: "Un manager qui code cesse de manager. L'orchestrateur doit rester concentré sur le plan global, la surveillance des jalons et l'arbitrage des conflits entre spécialistes.",
  },
  {
    id: 6,
    question: "Comment s'organise l'espace de stockage des livrables intermédiaires entre les agents du projet final ?",
    options: [
      { letter: 'A', text: "Tous les documents sont supprimés dès qu'un agent a terminé son tour." },
      { letter: 'B', text: "Une arborescence structurée et standardisée dans le projet (ex: `/specs/`, `/docs/`, `/reports/audit/`, `/tests/`) servant de dépôt partagé vérifiable." },
      { letter: 'C', text: "Les fichiers sont envoyés sous forme de pièces jointes sur WhatsApp." },
      { letter: 'D', text: "Les livrables sont encodés en base64 dans les commentaires Git." },
    ],
    correctAnswers: ['B'],
    explanation: "Un répertoire partagé normalisé permet à chaque agent de déposer ses artefacts (spécifications, rapports, suites de tests) là où ses collaborateurs savent les trouver de façon prévisible.",
  },

  // -------------------------------------------------------------
  // SECTION 2 : Instructions & Rôles des Agents Spécialisés (Q7-Q14)
  // -------------------------------------------------------------
  {
    id: 7,
    codeSnippet: `Agent Architecte (Livrable clé) :
Fichier : /specs/contracts/auth.contract.ts
Contenu :
export interface LoginRequestDto {
  email: string;
  passwordHash: string;
  deviceFingerprint?: string;
}
export interface AuthResponseDto {
  accessToken: string;
  expiresIn: number;
  user: { id: string; role: 'ADMIN' | 'USER' };
}`,
    question: "Pourquoi la production préalable de ce contrat d'interface par l'Architecte conditionne-t-elle le travail de TOUS les autres agents ?",
    options: [
      { letter: 'A', text: "Parce que le Développeur s'y conforme pour coder le contrôleur, le Testeur pour forger ses assertions, et le Documentaliste pour rédiger la doc OpenAPI sans divergence." },
      { letter: 'B', text: "Parce que TypeScript refuse de compiler sans le mot 'Dto'." },
      { letter: 'C', text: "Parce que les interfaces consomment moins d'électricité que les classes." },
      { letter: 'D', text: "Pour masquer la structure de la base de données à l'utilisateur." },
    ],
    correctAnswers: ['A'],
    explanation: "Le contrat de données est la clé de voûte de l'équipe : il synchronise les attentes de chaque expert autour d'un contrat technique unique et inaltérable.",
  },
  {
    id: 8,
    question: "Dans le projet final, quelle est la politique d'intervention imposée à l'Agent Développeur Full-Stack face aux tests existants ?",
    options: [
      { letter: 'A', text: "Il peut supprimer les tests qui échouent pour livrer la fonctionnalité plus vite." },
      { letter: 'B', text: "Il lui est STRICTEMENT INTERDIT de modifier ou désactiver les suites de tests fournies par l'Agent QA ; son implémentation doit impérativement satisfaire les tests sans contournement." },
      { letter: 'C', text: "Il doit réécrire les tests en langage Python." },
      { letter: 'D', text: "Il doit exécuter les tests uniquement les nuits de pleine lune." },
    ],
    correctAnswers: ['B'],
    explanation: "C'est la garantie de non-régression et d'intégrité : le développeur doit adapter son code aux exigences des tests, et non adapter les tests aux faiblesses de son code.",
  },
  {
    id: 9,
    codeSnippet: `Règle de l'Agent Sécurité dans le Projet Final :
"Tout mot de passe ou secret d'API doit transiter exclusivement par des variables d'environnement.
L'utilisation de requêtes SQL brutes non paramétrées ou la désactivation des CORS en mode 'origin: *'
doit entraîner un VETO IMMÉDIAT bloquant la Pull Request."`,
    question: "Quel pouvoir confère cette consigne à l'Agent Sécurité au sein de l'équipe ?",
    options: [
      { letter: 'A', text: "Un droit de veto bloquant qui subordonne la livraison du Développeur à la résolution intégrale des failles de sécurité critiques identifiées." },
      { letter: 'B', text: "Le droit de licencier les autres agents de l'équipe." },
      { letter: 'C', text: "La possibilité d'installer des jeux sur le serveur." },
      { letter: 'D', text: "L'obligation de réécrire tout le backend en assembleur." },
    ],
    correctAnswers: ['A'],
    explanation: "Pour être efficace, l'auditeur de sécurité ne doit pas être un simple commentateur passif : son approbation formelle est un passage obligé (Quality Gate) avant toute release.",
  },
  {
    id: 10,
    question: "Quelles sont les métriques minimales d'acceptation exigées de l'Agent QA / Testeur pour valider un composant dans le projet final ?",
    options: [
      { letter: 'A', text: "Au moins 1 test unitaire écrit avec des commentaires en rimes." },
      { letter: 'B', text: "100% de tests unitaires et d'intégration au vert (`npm test`), avec une couverture de code (Coverage) supérieure ou égale à 85% sur les branches logiques critiques." },
      { letter: 'C', text: "Zéro test nécessaire si le développeur affirme que ça marche." },
      { letter: 'D', text: "Un fichier de test d'au moins 10 mégaoctets." },
    ],
    correctAnswers: ['B'],
    explanation: "La robustesse logicielle repose sur des critères d'acceptation chiffrés et vérifiables : taux de passage absolu (0 échec) et couverture minimale mesurée par l'outil de test.",
  },
  {
    id: 11,
    question: "Quel rôle tient l'Agent Documentaliste dans la clôture d'un sprint du projet final ?",
    options: [
      { letter: 'A', text: "Supprimer les fichiers .ts pour ne laisser que les fichiers .md." },
      { letter: 'B', text: "Générer la documentation OpenAPI à jour, synchroniser le README, documenter les variables d'environnement dans `.env.example` et rédiger la note de version dans CHANGELOG.md." },
      { letter: 'C', text: "Envoyer des emails publicitaires aux clients de l'entreprise." },
      { letter: 'D', text: "Changer les mots de passe de tous les développeurs." },
    ],
    correctAnswers: ['B'],
    explanation: "La mission du documentaliste assure la pérennité et la maintenabilité du système : un code de production sans documentation à jour est une dette technique immédiate.",
  },
  {
    id: 12,
    codeSnippet: `Format du compte rendu d'audit de l'Agent Sécurité :
| Règle OWASP | Statut | Fichier | Remédiation requise |
| A01: Broken Access Control | CONFORME | src/controllers/user.ts | N/A |
| A03: Injection | VULNÉRABLE | src/services/search.ts | Remplacer la concaténation par une requête préparée Prisma |
| A07: Auth Failures | CONFORME | src/services/auth.ts | N/A |`,
    question: "En quoi ce tableau standardisé facilite-t-il l'intervention corrective de l'Agent Développeur ?",
    options: [
      { letter: 'A', text: "Le développeur identifie instantanément le fichier cible, la nature de la faille et la recommandation d'implémentation exacte sans ambiguïté." },
      { letter: 'B', text: "Il oblige le développeur à démissionner." },
      { letter: 'C', text: "Il transforme automatiquement le fichier en TypeScript." },
      { letter: 'D', text: "Il supprime la table vulnérable de la base de données." },
    ],
    correctAnswers: ['A'],
    explanation: "La clarté tabulaire réduit le délai moyen de remédiation (MTTR) : l'anomalie est localisée précisément et la consigne de correction est prête à l'emploi.",
  },
  {
    id: 13,
    question: "Comment l'Agent Architecte s'assure-t-il que le modèle de données PostgreSQL conçu dans Prisma supporte la scalabilité attendue ?",
    options: [
      { letter: 'A', text: "En demandant à l'agent de prier très fort." },
      { letter: 'B', text: "En déclarant des index B-Tree explicites sur les clés étrangères et les champs de recherche fréquente (`@@index([userId])`), ainsi que des contraintes d'unicité (`@unique`)." },
      { letter: 'C', text: "En supprimant toutes les relations entre les tables." },
      { letter: 'D', text: "En augmentant la taille de la police de caractères dans schema.prisma." },
    ],
    correctAnswers: ['B'],
    explanation: "L'expertise d'architecture relationnelle impose la pose méthodique d'index et de contraintes d'intégrité pour garantir des performances optimales lors de montées en charge.",
  },
  {
    id: 14,
    question: "Pourquoi l'Agent QA doit-il obligatoirement tester les cas d'erreurs (Negative Testing / Sad Paths) et pas seulement les cas nominaux (Happy Paths) ?",
    options: [
      { letter: 'A', text: "Parce que dans le monde réel, les utilisateurs saisissent des données invalides, les réseaux coupent et les tokens expirent ; le système doit réagir gracieusement sans crasher." },
      { letter: 'B', text: "Pour faire échouer le projet exprès." },
      { letter: 'C', text: "Parce que les cas nominaux sont interdits par l'architecture REST." },
      { letter: 'D', text: "Pour utiliser plus de papier d'impression." },
    ],
    correctAnswers: ['A'],
    explanation: "La robustesse d'une application professionnelle se juge à sa capacité à gérer sereinement les anomalies (codes HTTP 400, 401, 403, 404, 422) sans fuite de stack trace ni plantage du serveur.",
  },

  // -------------------------------------------------------------
  // SECTION 3 : Protocoles de Communication & Flux de Travail (Q15-Q22)
  // -------------------------------------------------------------
  {
    id: 15,
    codeSnippet: `Cycle de développement complet du Projet Final :
Étape 1 : Spécification & Interfaces (Architecte)
Étape 2 : Validation Humaine du Cahier des Charges (HITL)
Étape 3 : Implémentation du Code Métier (Développeur)
Étape 4 : Audit de Sécurité & Conformité (Sécurité)
Étape 5 : Écriture et Exécution des Tests (QA / Tests)
Étape 6 : Documentation & Notes de Version (Documentaliste)
Étape 7 : Revue Finale & Synthèse Globale (Coordinateur -> Humain)`,
    question: "Pourquoi l'Étape 2 (Validation Humaine du Cahier des Charges) est-elle positionnée AVANT l'implémentation du code métier ?",
    options: [
      { letter: 'A', text: "Pour aligner formellement l'ingénieur humain sur les choix d'architecture avant que des milliers de lignes de code ne soient produites sur des bases potentiellement erronées (Shift-Left Validation)." },
      { letter: 'B', text: "Pour permettre au développeur d'aller boire un café." },
      { letter: 'C', text: "Parce que l'IDE refuse d'ouvrir deux fichiers le même jour." },
      { letter: 'D', text: "Pour que le compilateur prenne le temps de se réchauffer." },
    ],
    correctAnswers: ['A'],
    explanation: "Le principe 'Shift-Left' préconise de valider au plus tôt : corriger une erreur de conception dans un document d'architecture coûte 100 fois moins cher que de refactoriser du code déjà implémenté.",
  },
  {
    id: 16,
    question: "Dans le protocole de communication inter-agents, quel statut doit renvoyer un agent qui a rencontré une impossibilité technique insurmontable dans sa mission ?",
    options: [
      { letter: 'A', text: "`status: 'SUCCESS'` en espérant que personne ne remarque le problème." },
      { letter: 'B', text: "`status: 'BLOCKED'` assorti d'un diagnostic circonstancié de la cause de blocage, des tentatives effectuées et de 2 propositions de déblocage pour le Coordinateur." },
      { letter: 'C', text: "Ne rien renvoyer et attendre 24 heures." },
      { letter: 'D', text: "`status: 'DELETE_PROJECT'`" },
    ],
    correctAnswers: ['B'],
    explanation: "La transparence sur les blocages fait partie intégrante de l'ingénierie résiliente : signaler immédiatement l'impasse avec des pistes alternatives permet au chef d'orchestre d'arbitrer sans délai.",
  },
  {
    id: 17,
    codeSnippet: `// Scénario de boucle de régression :
L'Agent Sécurité demande de remplacer une fonction rapide par une fonction chiffrée lourde.
L'Agent Testeur rejette la modification car le temps de réponse dépasse la limite autorisée de 200 ms.`,
    question: "Comment ce conflit d'objectifs contradictoires (Sécurité vs Performance) doit-il être résolu dans le système multi-agents ?",
    options: [
      { letter: 'A', text: "Les deux agents doivent continuer à se renvoyer la balle en boucle infinie." },
      { letter: 'B', text: "L'incident est escaladé au Coordinateur qui formalise le dilemme (compromis Sécurité/Performance) et sollicite l'arbitrage décisionnel de l'Architecte humain (HITL Decision Gate)." },
      { letter: 'C', text: "Désactiver à la fois la sécurité et les tests de performance." },
      { letter: 'D', text: "Supprimer la fonctionnalité du produit." },
    ],
    correctAnswers: ['B'],
    explanation: "Les arbitrages stratégiques entre attributs de qualité orthogonaux (sécurité vs latence) appartiennent au jugement de l'ingénieur humain. L'agent expose les options et attend la décision humaine.",
  },
  {
    id: 18,
    question: "Pourquoi est-il crucial que chaque sous-agent s'exécute dans un contexte de conversation indépendant (Thread isolé) plutôt que dans un fil unique géant ?",
    options: [
      { letter: 'A', text: "Pour éviter la pollution croisée des mémoires de travail : l'agent de test n'a pas besoin de l'historique complet des débats d'architecture pour exécuter sa suite de tests." },
      { letter: 'B', text: "Parce que Windows n'autorise qu'un seul fil de discussion par utilisateur." },
      { letter: 'C', text: "Pour forcer l'ordinateur à utiliser plusieurs écrans." },
      { letter: 'D', text: "Pour rendre les logs illisibles aux développeurs." },
    ],
    correctAnswers: ['A'],
    explanation: "L'isolation contextuelle maintient chaque agent au sommet de son acuité cognitive, libéré du bruit des échanges des autres spécialistes.",
  },
  {
    id: 19,
    question: "Qu'est-ce qu'un 'Handoff Artifact' dans le passage de témoin entre deux étapes du cycle de développement ?",
    options: [
      { letter: 'A', text: "Un objet magique dans un jeu vidéo de rôle." },
      { letter: 'B', text: "Un livrable formel, versionné et auto-porteur (ex: un contrat OpenAPI ou un rapport de couverture) qui transmet l'intégralité du contexte nécessaire à l'étape suivante sans nécessiter de transférer tout l'historique de chat." },
      { letter: 'C', text: "Un câble réseau débranché à la main." },
      { letter: 'D', text: "Une capture d'écran envoyée par messagerie instantanée." },
    ],
    correctAnswers: ['B'],
    explanation: "L'artefact de passage de relais découple les étapes : le fichier produit fait foi et suffit à amorcer la phase suivante avec un contexte frais, propre et rigoureusement documenté.",
  },
  {
    id: 20,
    codeSnippet: `Payload de livraison de l'Agent Développeur au Coordinateur :
{
  "taskId": "FEATURE-AUTH-01",
  "status": "READY_FOR_AUDIT",
  "filesModified": ["src/controllers/auth.ts", "src/services/jwt.ts"],
  "compilationStatus": "PASS (0 errors, 0 warnings)",
  "smokeTestStatus": "PASS (local ping 200 OK)",
  "dependenciesAdded": ["jsonwebtoken@9.0.2", "bcrypt@5.1.1"]
}`,
    question: "Quelle information présente dans ce compte rendu déclenchera obligatoirement une alerte de sécurité préalable ?",
    options: [
      { letter: 'A', text: "La mention 'READY_FOR_AUDIT'." },
      { letter: 'B', text: "Le champ 'dependenciesAdded' signalant l'ajout de nouveaux packages tiers externes qui devront être audités contre les vulnérabilités de dépendances." },
      { letter: 'C', text: "Le statut de compilation à zéro erreur." },
      { letter: 'D', text: "Le code de retour HTTP 200." },
    ],
    correctAnswers: ['B'],
    explanation: "L'introduction de nouveaux paquets (`jsonwebtoken`, `bcrypt`) modifie l'arbre de dépendances et impose un contrôle de licence et de vulnérabilités (via `npm audit`) par l'Agent Sécurité.",
  },
  {
    id: 21,
    question: "Comment le Coordinateur garantit-il la cohérence des versions de bibliothèques entre le Frontend React et le Backend Node.js ?",
    options: [
      { letter: 'A', text: "En demandant à l'Architecte de figer les versions majeures des packages partagés (ex: TypeScript, Zod, ESLint) dans le fichier racine de l'espace de travail ou monorepo." },
      { letter: 'B', text: "En installant toujours la version 'latest' non verrouillée à chaque minute." },
      { letter: 'C', text: "En supprimant TypeScript pour utiliser uniquement du code non typé." },
      { letter: 'D', text: "En ne reliant jamais le frontend et le backend." },
    ],
    correctAnswers: ['A'],
    explanation: "Figer les versions contractuelles partagées (ex: schémas Zod partagés entre client et serveur) prévient les ruptures de contrat à l'exécution.",
  },
  {
    id: 22,
    question: "Que doit faire le système multi-agents lorsque la suite de tests finaux révèle un échec sur 1 seul test unitaire sur 120 ?",
    options: [
      { letter: 'A', text: "Valider la release en affirmant que 119/120 est une note largement suffisante." },
      { letter: 'B', text: "Refuser la release : la politique de qualité impose le zéro défaut (120/120) ; la tâche est renvoyée au Développeur avec le log exact de l'assertion défaillante pour correction immédiate." },
      { letter: 'C', text: "Supprimer le test défaillant." },
      { letter: 'D', text: "Éteindre les serveurs de tests." },
    ],
    correctAnswers: ['B'],
    explanation: "En environnement professionnel, un seul test défaillant peut cacher une régression critique de sécurité ou de calcul. L'exigence de conformité à 100% est non négociable.",
  },

  // -------------------------------------------------------------
  // SECTION 4 : Sécurité & Gouvernance Appliquée au Projet (Q23-Q28)
  // -------------------------------------------------------------
  {
    id: 23,
    question: "Dans le projet final, comment est configurée la protection des secrets de la base de données et des clés JWT ?",
    options: [
      { letter: 'A', text: "Les clés sont écrites en clair au milieu du fichier package.json." },
      { letter: 'B', text: "Un fichier `.env` réel local exclu de Git et interdit en lecture aux agents, accompagné d'un fichier `.env.example` anonymisé servant de référence structurelle pour le code." },
      { letter: 'C', text: "Les secrets sont stockés dans les commentaires du code source." },
      { letter: 'D', text: "Il n'y a aucun mot de passe sur la base de données pour faciliter le travail des agents." },
    ],
    correctAnswers: ['B'],
    explanation: "C'est la règle d'or de la gouvernance des secrets : isolation totale des valeurs réelles hors de portée des agents, et documentation des noms de variables via `.env.example`.",
  },
  {
    id: 24,
    codeSnippet: `// Tentative observée lors du développement :
L'Agent Développeur génère une route de débogage temporaire :
app.get('/api/debug/dump-memory', (req, res) => res.json(process.env));`,
    question: "Comment l'Agent Auditeur de Sécurité doit-il impérativement sanctionner ce code lors de sa revue ?",
    options: [
      { letter: 'A', text: "Féliciter le Développeur pour son ingéniosité." },
      { letter: 'B', text: "Émettre un refus immédiat de conformité (Veto Sécurité) : exposer `process.env` sur un endpoint HTTP constitue une faille majeure d'exfiltration de secrets et viole la politique de gouvernance." },
      { letter: 'C', text: "Tester l'endpoint sur un réseau public." },
      { letter: 'D', text: "Ajouter le mot 'secret' dans l'URL pour la protéger." },
    ],
    correctAnswers: ['B'],
    explanation: "Exposer l'environnement d'exécution via une API REST divulgue toutes les clés d'API et identifiants du système aux attaquants. C'est une faute de sécurité éliminatoire.",
  },
  {
    id: 25,
    question: "Qu'est-ce que le principe du 'Bac à Sable Éphémère' (Ephemeral Sandboxing) mis en œuvre pour l'exécution des tests du projet final ?",
    options: [
      { letter: 'A', text: "Jouer avec du sable sur la plage." },
      { letter: 'B', text: "Exécuter les suites de tests et les migrations dans un conteneur ou un espace mémoire temporaire isolé qui est totalement détruit et réinitialisé après chaque exécution pour garantir une reproductibilité parfaite sans résidu d'état." },
      { letter: 'C', text: "Supprimer le disque dur tous les soirs à 18h." },
      { letter: 'D', text: "Désactiver les pare-feux pour que les tests tournent plus vite." },
    ],
    correctAnswers: ['B'],
    explanation: "Les bacs à sable éphémères garantissent des tests sans effets de bord (side effects) : chaque test s'exécute sur une base de données propre et un état vierge.",
  },
  {
    id: 26,
    question: "Comment l'équipe d'agents neutralise-t-elle le risque d'injection SQL dans les requêtes de recherche de produits ?",
    options: [
      { letter: 'A', text: "En demandant aux utilisateurs de ne pas taper de guillemets dans la barre de recherche." },
      { letter: 'B', text: "En s'appuyant exclusivement sur l'ORM Prisma avec requêtes typées et paramétrées nativement, ou en utilisant des déclarations préparées (`Prisma.$queryRaw\`...\``) interdisant toute concaténation de chaînes brutes." },
      { letter: 'C', text: "En convertissant la base relationnelle en fichier texte non indexé." },
      { letter: 'D', text: "En interdisant les recherches de plus de 3 lettres." },
    ],
    correctAnswers: ['B'],
    explanation: "La paramétrisation universelle des requêtes délègue au moteur de base de données le traitement des données utilisateur comme des valeurs pures et non comme du code exécutable.",
  },
  {
    id: 27,
    question: "Dans le cadre de la protection des données personnelles (RGPD), quelle règle l'Architecte et l'Agent Sécurité imposent-ils sur le stockage des mots de passe des utilisateurs ?",
    options: [
      { letter: 'A', text: "Les stocker en clair pour que les administrateurs puissent les retrouver en cas d'oubli." },
      { letter: 'B', text: "Les hacher obligatoirement avec un algorithme robuste et ralenti intégrant un sel cryptographique aléatoire (ex: bcrypt ou Argon2id avec facteur de coût approprié)." },
      { letter: 'C', text: "Les chiffrer avec du code César (décalage de 3 lettres)." },
      { letter: 'D', text: "Les encoder en Base64." },
    ],
    correctAnswers: ['B'],
    explanation: "Bcrypt ou Argon2id avec salage rendent les attaques par tables arc-en-ciel et force brute inopérantes, garantissant la conformité aux normes de protection de l'identité.",
  },
  {
    id: 28,
    question: "Pourquoi l'Agent Développeur doit-il neutraliser l'en-tête `X-Powered-By: Express` sur le serveur backend ?",
    options: [
      { letter: 'A', text: "Pour masquer la technologie sous-jacente aux scanners de vulnérabilités automatisés (sécurité par obscurcissement complémentaire / Banner Grabbing Mitigation)." },
      { letter: 'B', text: "Parce qu'Express n'a plus le droit d'utiliser son logo." },
      { letter: 'C', text: "Pour économiser 2 octets de bande passante par requête." },
      { letter: 'D', text: "Pour faire croire aux clients que le serveur est écrit en C++." },
    ],
    correctAnswers: ['A'],
    explanation: "Supprimer les bannières de technologies empêche les attaquants de cibler immédiatement les failles spécifiques à une version donnée du framework Express.",
  },

  // -------------------------------------------------------------
  // SECTION 5 : Construction des Prompts Réutilisables (Golden Prompts) (Q29-Q34)
  // -------------------------------------------------------------
  {
    id: 29,
    question: "Qu'est-ce qui caractérise un 'Golden Prompt' de conception de composant React dans la bibliothèque de prompts de l'équipe ?",
    options: [
      { letter: 'A', text: "Un prompt certifié qui spécifie d'office : le typage strict des Props TypeScript, la gestion des états de chargement (Loading Skeleton) et d'erreur (Error Boundary), l'accessibilité ARIA et les classes Tailwind standardisées." },
      { letter: 'B', text: "Un prompt qui coûte plus de 10 dollars par exécution." },
      { letter: 'C', text: "Un prompt écrit par le président de la société." },
      { letter: 'D', text: "Un prompt qui désactive React." },
    ],
    correctAnswers: ['A'],
    explanation: "Le Golden Prompt encapsule toute la maturité technique de l'équipe : chaque composant généré embarque dès l'origine la robustesse, l'accessibilité et les conventions de design.",
  },
  {
    id: 30,
    codeSnippet: `Golden Prompt de Contrôleur Express :
"Génère le contrôleur pour la ressource \${ResourceName}.
Contraintes :
1. Valide req.body via le schéma Zod \${ResourceName}Schema.
2. Enveloppe la logique dans un bloc try/catch déléguant les erreurs au middleware centralisé (next(err)).
3. Renvoie un code HTTP 201 en cas de création avec corps JSON typé.
4. Aucun console.log de débogage."`,
    question: "Quel avantage déterminant ce modèle de prompt offre-t-il sur l'ensemble des 20 routes de l'API ?",
    options: [
      { letter: 'A', text: "Une uniformité architecturale absolue : toutes les routes gèrent la validation, les codes HTTP et les erreurs exactement de la même manière prévisible." },
      { letter: 'B', text: "Il permet de coder sans allumer son écran." },
      { letter: 'C', text: "Il supprime le besoin de compiler le code TypeScript." },
      { letter: 'D', text: "Il réduit la taille de la base de données de 50%." },
    ],
    correctAnswers: ['A'],
    explanation: "La standardisation des prompts produit un code homogène et lisible. N'importe quel développeur ou auditeur retrouve instantanément la même structure sur tous les endpoints.",
  },
  {
    id: 31,
    question: "Comment intègre-t-on la technique de 'Few-shot Prompting' dans le Golden Prompt de test unitaire de l'Agent QA ?",
    options: [
      { letter: 'A', text: "En fournissant un exemple modèle complet d'un test existant de haute qualité (montrant le mock de Prisma, l'appel de service et les assertions expect) pour fixer le style de test attendu." },
      { letter: 'B', text: "En copiant 50 fois le mot 'test' dans le prompt." },
      { letter: 'C', text: "En demandant à l'agent de chercher des exemples sur Google." },
      { letter: 'D', text: "En écrivant les tests sous forme de bande dessinée." },
    ],
    correctAnswers: ['A'],
    explanation: "Un exemple canonique de test montre à l'agent le pattern exact d'isolation (mocking, arrange-act-assert) attendu dans ce projet, éliminant les styles hétéroclites.",
  },
  {
    id: 32,
    question: "Pourquoi est-il préconisé de paramétrer les Golden Prompts avec des variables de substitution (ex: `\${Entity}`, `\${FilePath}`) ?",
    options: [
      { letter: 'A', text: "Pour en faire des templates réutilisables et automatisables par des scripts d'orchestration ou des raccourcis de commande sans réécriture manuelle." },
      { letter: 'B', text: "Parce que le compilateur C++ exige des variables avec des dollars." },
      { letter: 'C', text: "Pour faire planter le terminal de l'IDE." },
      { letter: 'D', text: "Pour rendre le texte plus joli graphiquement." },
    ],
    correctAnswers: ['A'],
    explanation: "La paramétrisation transforme un prompt artisanal en une fonction d'ingénierie logicielle industrialisable, instanciable à volonté sur n'importe quel module du projet.",
  },
  {
    id: 33,
    question: "Quel danger prévient l'interdiction formelle des 'console.log()' de débogage dans les Golden Prompts de production ?",
    options: [
      { letter: 'A', text: "La pollution des flux stdout du serveur en production et la fuite involontaire d'objets métiers ou de données personnelles (PII) dans les journaux système." },
      { letter: 'B', text: "La panne immédiate de la carte mère de l'ordinateur." },
      { letter: 'C', text: "L'incompatibilité avec le navigateur Safari." },
      { letter: 'D', text: "La suppression du dossier node_modules." },
    ],
    correctAnswers: ['A'],
    explanation: "Les logs de débogage sauvages dégradent les performances I/O et exposent fréquemment des données sensibles dans les consoles de serveurs. Des loggers structurés (Pino, Winston) doivent être utilisés.",
  },
  {
    id: 34,
    question: "Où la bibliothèque de Golden Prompts du projet final doit-elle être stockée et maintenue ?",
    options: [
      { letter: 'A', text: "Dans un carnet secret gardé au coffre-fort." },
      { letter: 'B', text: "Dans un dossier dédié et versionné du dépôt (ex: `.agent/prompts/` ou `docs/prompts/`), partagé avec toute l'équipe et soumis à revue de code." },
      { letter: 'C', text: "Sur un post-it collé sur le moniteur de l'ordinateur." },
      { letter: 'D', text: "Dans la corbeille de Windows." },
    ],
    correctAnswers: ['B'],
    explanation: "Les prompts constituent du code à part entière. Ils doivent être partagés, versionnés dans Git, revus par les pairs et améliorés au fil des sprints.",
  },

  // -------------------------------------------------------------
  // SECTION 6 : Validation Finale & Démonstration dans Antigravity (Q35-Q40)
  // -------------------------------------------------------------
  {
    id: 35,
    codeSnippet: `Banc d'essai de validation finale (Module 8) :
1. Test de compilation : 'npm run build' -> Succès (0 warning, 0 error)
2. Test de typage : 'npx tsc --noEmit' -> Succès
3. Tests unitaires et d'intégration : 'npm test' -> 100% de succès
4. Audit de sécurité des dépendances : 'npm audit' -> 0 vulnérabilité haute/critique
5. Audit de sécurité du code : Rapport de l'Agent Sécurité -> 0 non-conformité`,
    question: "Lorsque l'ensemble de ces 5 conditions est réuni, que représente cet état pour le livrable du projet final ?",
    options: [
      { letter: 'A', text: "La certification formelle de 'Production Readiness' (Prêt pour la Production) avec garantie de conformité logicielle, d'intégrité architecturale et de sécurité." },
      { letter: 'B', text: "Un coup de chance statistique sans valeur." },
      { letter: 'C', text: "Une invitation à recommencer le projet depuis le début." },
      { letter: 'D', text: "La fin de validité de la licence de l'ordinateur." },
    ],
    correctAnswers: ['A'],
    explanation: "C'est l'objectif suprême du cursus : prouver qu'une chaîne multi-agents pilotée avec rigueur produit un logiciel répondant aux exigences les plus strictes de l'industrie logicielle.",
  },
  {
    id: 36,
    question: "Lors de la démonstration finale dans Antigravity, comment le Coordinateur orchestre-t-il la réponse face à une demande impromptue de l'examinateur (ex: 'Ajoute un filtre par tranche de prix sur la liste des produits') ?",
    options: [
      { letter: 'A', text: "L'agent panique et efface les fichiers existants." },
      { letter: 'B', text: "Le Coordinateur active méthodiquement la chaîne : mise à jour du contrat par l'Architecte -> implémentation par le Développeur -> tests unitaires par l'Agent QA -> contrôle de sécurité -> validation finale en direct." },
      { letter: 'C', text: "L'agent prétend que la fonctionnalité est déjà codée sans rien faire." },
      { letter: 'D', text: "L'agent demande à l'examinateur de coder lui-même." },
    ],
    correctAnswers: ['B'],
    explanation: "La démonstration prouve la fluidité de la chaîne opérationnelle : même face à une évolution imprévue, le protocole méthodologique s'exécute avec rigueur et vélocité.",
  },
  {
    id: 37,
    question: "Quel indicateur d'efficience permet de mesurer la rentabilité économique du système multi-agents mis en place pour ce projet final ?",
    options: [
      { letter: 'A', text: "Le temps de développement total pour livrer la fonctionnalité complète (ex: 2 heures d'orchestration d'agents vs 3 jours de codage manuel traditionnel) rapporté au coût en tokens d'API." },
      { letter: 'B', text: "Le nombre de clics de souris effectués pendant la journée." },
      { letter: 'C', text: "Le poids en grammes de l'ordinateur portable." },
      { letter: 'D', text: "La quantité d'électricité consommée par la souris." },
    ],
    correctAnswers: ['A'],
    explanation: "Le retour sur investissement (ROI) de l'ingénierie d'agents compare le coût infime des tokens d'API et le temps de supervision humaine face au coût en jours/homme d'un développement manuel équivalent.",
  },
  {
    id: 38,
    codeSnippet: `Rapport de soutenance finale (Extrait) :
- Heures de développement humain requises : 3 heures (Architecture, supervision HITL, validation)
- Temps d'exécution autonome des agents : 28 minutes
- Nombre de tests unitaires générés et passés : 48 tests
- Failles de sécurité bloquées en amont par l'Agent Sécurité : 3 failles (1 injection SQL potentielle, 1 secret mal isolé, 1 boucle infinie)`,
    question: "Que démontrent ces résultats quant au rôle de l'ingénieur humain dans l'ère de l'intelligence artificielle agentique ?",
    options: [
      { letter: 'A', text: "L'ingénieur n'écrit plus de code ligne par ligne mais opère comme un chef de mission, un architecte de haut niveau et un garant de la conformité et de la sécurité des systèmes autonomes." },
      { letter: 'B', text: "L'ingénieur est devenu totalement inutile et doit changer de métier." },
      { letter: 'C', text: "L'ordinateur a remplacé toute l'entreprise." },
      { letter: 'D', text: "Que les tests unitaires ne servent à rien." },
    ],
    correctAnswers: ['A'],
    explanation: "Le rôle de l'ingénieur s'élève vers la stratégie, la conception de garde-fous et la gouvernance. L'agent décuple sa force de production tout en restant sous son contrôle éclairé.",
  },
  {
    id: 39,
    question: "Quelle est la règle d'archivage et de livraison finale du projet multi-agents sur le dépôt Git d'entreprise ?",
    options: [
      { letter: 'A', text: "Livrer uniquement le code exécutable compilé dans /dist sans les sources ni les tests." },
      { letter: 'B', text: "Livrer une Pull Request propre contenant le code source typé, les tests automatisés, les règles de gouvernance d'agents (`.agent/`), la documentation technique à jour et l'historique clair des commits de jalon." },
      { letter: 'C', text: "Effacer le dépôt Git et envoyer une archive ZIP par messagerie privée." },
      { letter: 'D', text: "Faire un commit géant intitulé 'fix all'." },
    ],
    correctAnswers: ['B'],
    explanation: "Une livraison professionnelle est un ensemble cohérent et pérenne : le code, les tests, la documentation et les règles de gouvernance des agents qui ont permis de le bâtir.",
  },
  {
    id: 40,
    question: "En conclusion ultime de ce cursus de Prompt Engineering pour les Agents IA dans les IDE, quelle est la conviction fondamentale acquise par un professionnel certifié ?",
    options: [
      { letter: 'A', text: "Que les prompts sont de simples phrases magiques où l'intuition et la chance suffisent." },
      { letter: 'B', text: "Que le Prompt Engineering appliqué aux agents est une discipline d'ingénierie logicielle rigoureuse, fondée sur des architectures formelles, la délimitation stricte des privilèges, la validation par des oracles déterministes et la supervision humaine continue pour délivrer des logiciels fiables, sécurisés et pérennes." },
      { letter: 'C', text: "Que l'intelligence artificielle n'a aucun avenir dans le développement logiciel." },
      { letter: 'D', text: "Qu'il ne faut plus jamais écrire de tests automatisés." },
    ],
    correctAnswers: ['B'],
    explanation: "Le Prompt Engineering pour agents de développement est une véritable science de l'architecture logicielle : maîtriser la synergie entre modèles probabilistes et contraintes logicielles déterministes transforme l'ingénieur en développeur 10x hautement qualifié.",
  },
];

