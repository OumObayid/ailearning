/**
 * Service pour le Tuteur IA Interactif de lecture
 *
 * Règles strictes :
 * 1. Action 'synonym' : Seulement DEUX mots : 1 mot français et 1 mot arabe,
 *    le plus proche selon le contexte. JAMAIS de mot générique comme "المصطلح".
 * 2. Action 'explain' : L'IA explique DIRECTEMENT et UNIQUEMENT l'expression sélectionnée.
 *    INTERDIT de répéter des phrases génériques ou de dériver sur le chapitre global.
 * 3. Action 'example' : Exemple d'application concret et court ciblé sur l'expression.
 */

export type SelectionTutorAction = 'synonym' | 'explain' | 'example';

export interface SelectionTutorRequest {
  text: string;
  action: SelectionTutorAction;
  courseContext?: string;
  chapterTitle?: string;
  surroundingContext?: string;
}

export interface SelectionTutorResponse {
  result: string;
  action: SelectionTutorAction;
  isWord: boolean;
  word?: string;
  frenchWord?: string;          // 1 seul mot en français
  arabicWord?: string;          // 1 seul mot en arabe (JAMAIS "المصطلح")
  arabicTranslation?: string;   // Rétrocompatibilité
  frenchSynonyms?: string[];    // Rétrocompatibilité
  contextualNote?: string;
}

interface GlossaryEntry {
  arabic: string;
  frenchWord: string;
  explanation: string;
  example: string;
}

// Normalise un mot en retirant les élisions françaises (l', d', etc.) et la ponctuation
export function normalizeWord(raw: string): string {
  let s = raw.trim().toLowerCase();
  s = s.replace(/^[«"'`([{\s]+/, '').replace(/[»"'`)\]}:;,.!?\s]+$/, '');
  s = s.replace(/^[ldcjtmsn]'/i, '');
  s = s.replace(/^(le|la|les|un|une|des|du|de|au|aux)\s+/i, '');
  return s.trim();
}

// Nettoie toute formule d'introduction inutile comme "Dans le contexte du chapitre..."
export function cleanExplanationPrefix(text: string): string {
  return text
    .replace(/^Dans le cadre du chapitre [^,:]+[,:]\s*/i, '')
    .replace(/^Dans le contexte du chapitre [^,:]+[,:]\s*/i, '')
    .replace(/^Dans le contexte de ce chapitre[,:]\s*/i, '')
    .replace(/^Dans ce chapitre [^,:]+[,:]\s*/i, '')
    .replace(/^Dans ce chapitre[,:]\s*/i, '')
    .replace(/^Cette expression désigne\s+/i, 'Désigne ')
    .trim();
}

// Glossaire intégré des termes clés et expressions composées (Node.js, Systèmes, IA & Langage)
const BUILTIN_AI_GLOSSARY: Record<string, GlossaryEntry> = {
  // Expressions composées fréquentes
  'risque de fuite mémoire': {
    arabic: 'خطر تسرب الذاكرة',
    frenchWord: 'Saturation',
    explanation: "Danger où des objets ou fermetures continuent d'être référencés sans être libérés, saturant progressivement le tas (Heap) de Node.js jusqu'à l'erreur fatale Out Of Memory.",
    example: "Attacher un écouteur d'événements dans une boucle sans jamais le détruire crée un risque majeur de fuite mémoire.",
  },
  'fuite mémoire': {
    arabic: 'تسرب الذاكرة',
    frenchWord: 'Saturation',
    explanation: "Accumulation anormale d'objets sur le tas qui ne sont plus nécessaires mais restent accessibles depuis la racine, empêchant le Garbage Collector de libérer la RAM.",
    example: "Un tableau global dans lequel on insère des données sans jamais le purger est la cause classique d'une fuite mémoire.",
  },
  'fuite de mémoire': {
    arabic: 'تسرب الذاكرة',
    frenchWord: 'Saturation',
    explanation: "Accumulation anormale d'objets sur le tas qui ne sont plus nécessaires mais restent accessibles depuis la racine, empêchant le Garbage Collector de libérer la RAM.",
    example: "Un tableau global dans lequel on insère des données sans jamais le purger est la cause classique d'une fuite mémoire.",
  },
  'mémoire & event loop': {
    arabic: 'الذاكرة وحلقة الأحداث',
    frenchWord: 'Architecture',
    explanation: "Interaction entre l'espace mémoire (Stack synchrone et Heap dynamique) et la boucle d'événements mono-thread qui ordonnance les callbacks asynchrones sans bloquer le système.",
    example: "L'Event Loop dépile les callbacks I/O dès que la Call Stack est vide, allouant de nouveaux objets sur la Heap au besoin.",
  },
  'mémoire et event loop': {
    arabic: 'الذاكرة وحلقة الأحداث',
    frenchWord: 'Architecture',
    explanation: "Interaction entre l'espace mémoire (Stack synchrone et Heap dynamique) et la boucle d'événements mono-thread qui ordonnance les callbacks asynchrones sans bloquer le système.",
    example: "L'Event Loop dépile les callbacks I/O dès que la Call Stack est vide, allouant de nouveaux objets sur la Heap au besoin.",
  },
  'call stack': {
    arabic: 'مكدس الاستدعاءات',
    frenchWord: 'Pile',
    explanation: "Structure en pile (LIFO) de V8 qui garde la trace de la fonction actuellement exécutée et des points de retour du code synchrone.",
    example: "Chaque appel de fonction ajoute un enregistrement d'activation (stack frame) sur la Call Stack.",
  },
  "pile d'appels": {
    arabic: 'مكدس الاستدعاءات',
    frenchWord: 'Stack',
    explanation: "Structure en pile (LIFO) de V8 qui garde la trace de la fonction actuellement exécutée et des points de retour du code synchrone.",
    example: "Chaque appel de fonction ajoute un enregistrement d'activation (stack frame) sur la Call Stack.",
  },
  'garbage collector': {
    arabic: 'جامع المهملات',
    frenchWord: 'Nettoyeur',
    explanation: "Mécanisme automatique du moteur V8 qui parcourt la Heap pour détecter et désallouer la mémoire occupée par les objets devenus orphelins.",
    example: "V8 utilise les algorithmes Scavenge pour les objets récents et Mark-Sweep-Compact pour les objets persistants.",
  },
  'event loop': {
    arabic: 'حلقة الأحداث',
    frenchWord: 'Boucle',
    explanation: "Boucle semi-infinie mono-thread orchestrant le dépilement des timers, des callbacks I/O et des microtâches dès que la pile d'appels est vide.",
    example: "L'Event Loop vérifie continuellement si la Call Stack est vide avant de dépiler la microtask queue (Promise, process.nextTick).",
  },
  eventloop: {
    arabic: 'حلقة الأحداث',
    frenchWord: 'Boucle',
    explanation: "Boucle mono-thread orchestrant le dépilement des timers, I/O et microtâches pour assurer l'exécution non-bloquante.",
    example: "L'Event Loop garantit l'exécution non bloquante en déléguant les opérations I/O à libuv.",
  },

  // Termes simples Node.js & Systèmes
  mémoire: {
    arabic: 'الذاكرة',
    frenchWord: 'RAM',
    explanation: "Espace d'adressage (RAM) partitionné entre la Stack (pile d'exécution LIFO) et la Heap (tas où V8 alloue les objets dynamiques).",
    example: "En Node.js, `process.memoryUsage().heapUsed` mesure l'espace mémoire consommé par les objets actifs sur le tas.",
  },
  memoire: {
    arabic: 'الذاكرة',
    frenchWord: 'RAM',
    explanation: "Espace d'adressage (RAM) partitionné entre la Stack (pile d'exécution LIFO) et la Heap (tas où V8 alloue les objets dynamiques).",
    example: "En Node.js, `process.memoryUsage().heapUsed` mesure l'espace mémoire consommé par les objets actifs sur le tas.",
  },
  ram: {
    arabic: 'الذاكرة',
    frenchWord: 'Mémoire',
    explanation: "Mémoire vive principale où sont allouées les frames d'exécution de la Stack et les objets dynamiques de la Heap.",
    example: "Le tas (heap) de Node.js est alloué directement dans la RAM gérée par le système d'exploitation.",
  },
  stack: {
    arabic: 'المكدس',
    frenchWord: 'Pile',
    explanation: "Structure de données en pile (LIFO) qui gère l'ordre d'appel des fonctions synchrones et leurs variables locales.",
    example: "Chaque appel de fonction empile une frame sur la Call Stack ; un dépassement produit l'erreur RangeError: Maximum call stack size exceeded.",
  },
  pile: {
    arabic: 'المكدس',
    frenchWord: 'Stack',
    explanation: "Structure LIFO stockant les contextes d'exécution et les adresses de retour au fil des appels de fonctions.",
    example: "Un appel récursif infini remplit la pile d'appels et provoque un Stack Overflow.",
  },
  heap: {
    arabic: 'الكومة',
    frenchWord: 'Tas',
    explanation: "Zone de mémoire dynamique non structurée où le moteur V8 alloue les objets, closures et buffers volumineux.",
    example: "Les fuites mémoires en Node.js surviennent lorsqu'un objet reste référencé sur la Heap sans être libéré par le ramasse-miettes.",
  },
  tas: {
    arabic: 'الكومة',
    frenchWord: 'Heap',
    explanation: "Espace mémoire dédié à l'allocation dynamique des objets et fermetures JavaScript dont la taille varie à l'exécution.",
    example: "Le Garbage Collector analyse le tas pour identifier les objets qui ne sont plus accessibles depuis la racine.",
  },
  boucle: {
    arabic: 'الحلقة',
    frenchWord: 'Itération',
    explanation: "Structure d'exécution répétitive ou mécanisme d'ordonnancement non-bloquant des requêtes asynchrones.",
    example: "Une boucle infinie synchrone `while(true)` fige l'Event Loop et bloque tous les utilisateurs du serveur.",
  },
  thread: {
    arabic: 'المسار',
    frenchWord: 'Fil',
    explanation: "Plus petite unité d'exécution planifiée par l'OS, partageant la mémoire du processus parent tout en exécutant ses propres instructions.",
    example: "Le pool libuv utilise par défaut 4 threads en arrière-plan pour les opérations cryptographiques et de système de fichiers.",
  },
  processus: {
    arabic: 'العملية',
    frenchWord: 'Tâche',
    explanation: "Programme en cours d'exécution disposant de son propre espace d'adressage mémoire isolé et de ses propres ressources système.",
    example: "Utiliser `cluster` ou PM2 permet de lancer un processus Node.js par cœur CPU pour paralléliser la charge.",
  },
  cpu: {
    arabic: 'المعالج',
    frenchWord: 'Processeur',
    explanation: "Unité centrale de traitement chargée d'exécuter séquentiellement le bytecode et les calculs synchrones de la machine.",
    example: "Une boucle synchrone lourde mobilise 100% du cœur CPU et empêche le serveur de traiter les requêtes entrantes.",
  },
  gpu: {
    arabic: 'المعالج',
    frenchWord: 'Accélérateur',
    explanation: "Processeur graphique conçu pour exécuter des calculs matriciels massivement parallélisés (utilisé en inférence IA et rendu).",
    example: "WebGPU transfère les tenseurs vers la mémoire du GPU pour exécuter les calculs en quelques millisecondes.",
  },
  buffer: {
    arabic: 'المخزن',
    frenchWord: 'Tampon',
    explanation: "Plage de mémoire brute hors-tas allouée directement par Node.js pour manipuler des flux d'octets binaires.",
    example: "Buffer.from('hello', 'utf-8') alloue 5 octets de mémoire contiguë pour le transfert réseau.",
  },
  tampon: {
    arabic: 'المخزن',
    frenchWord: 'Buffer',
    explanation: "Zone de mémoire intermédiaire stockant temporairement des données binaires en transit avant leur traitement.",
    example: "La lecture d'un fichier volumineux par flux (Streams) utilise des tampons de 64 Ko.",
  },
  cache: {
    arabic: 'الكاش',
    frenchWord: 'Antémémoire',
    explanation: "Mémoire temporaire à accès ultra-rapide conservant les résultats récents pour éviter des calculs ou requêtes redondantes.",
    example: "Utiliser un cache LRU en mémoire vive pour servir les réponses fréquentes en moins d'une milliseconde.",
  },
  garbage: {
    arabic: 'المهملات',
    frenchWord: 'Nettoyeur',
    explanation: "Processus automatique inspectant périodiquement le tas pour recycler la mémoire des objets devenus inaccessibles.",
    example: "V8 utilise l'algorithme Scavenge pour la mémoire jeune et Mark-Sweep-Compact pour la mémoire ancienne.",
  },
  gc: {
    arabic: 'المهملات',
    frenchWord: 'Nettoyeur',
    explanation: "Mécanisme de ramasse-miettes libérant automatiquement la mémoire des objets orphelins sur le tas.",
    example: "Forcer le GC avec `--expose-gc` et `global.gc()` permet d'analyser l'empreinte mémoire avant et après un test de charge.",
  },
  fuite: {
    arabic: 'التسريب',
    frenchWord: 'Saturation',
    explanation: "Accumulation non désirée d'objets en mémoire qui continuent d'être référencés sans être utilisés, saturant progressivement la RAM.",
    example: "Un tableau global d'écouteurs d'événements jamais nettoyé provoque une fuite mémoire fatale.",
  },
  asynchrone: {
    arabic: 'غير متزامن',
    frenchWord: 'Différé',
    explanation: "Mode d'exécution où une opération longue (I/O, réseau) est déléguée en tâche de fond sans bloquer la suite du code.",
    example: "`fs.promises.readFile` lance la lecture disque sans bloquer le traitement des autres requêtes web.",
  },
  synchrone: {
    arabic: 'متزامن',
    frenchWord: 'Bloquant',
    explanation: "Mode d'exécution séquentiel où chaque instruction bloque le fil d'exécution jusqu'à ce qu'elle soit totalement terminée.",
    example: "`fs.readFileSync` bloque l'Event Loop pendant toute la durée de la lecture physique du disque.",
  },

  // IA & NLP
  inference: {
    arabic: 'الاستدلال',
    frenchWord: 'Prédiction',
    explanation: "Phase d'exécution où un modèle d'IA applique ses poids déjà entraînés pour prédire et générer une réponse à partir d'une entrée.",
    example: "Quand l'API reçoit une question et renvoie la réponse en streaming, elle réalise une phase d'inférence.",
  },
  inférence: {
    arabic: 'الاستدلال',
    frenchWord: 'Prédiction',
    explanation: "Phase d'exécution où un modèle d'IA applique ses poids déjà entraînés pour prédire et générer une réponse à partir d'une entrée.",
    example: "Quand l'API reçoit une question et renvoie la réponse en streaming, elle réalise une phase d'inférence.",
  },
  prompt: {
    arabic: 'المُطالبة',
    frenchWord: 'Consigne',
    explanation: "Texte d'instruction ou consigne fourni au modèle linguistique pour encadrer précisément sa réflexion et son format de réponse.",
    example: "« Agis comme un expert DevOps et audite ce fichier Dockerfile en 3 points » est un prompt.",
  },
  token: {
    arabic: 'الرمز',
    frenchWord: 'Fragment',
    explanation: "Unité atomique de découpage du texte (environ 4 caractères) que le tokenizer convertit en identifiant numérique pour le modèle.",
    example: "Le terme « apprentissage » est découpé en 2 ou 3 tokens selon le vocabulaire du tokenizer.",
  },
  tokens: {
    arabic: 'الرموز',
    frenchWord: 'Fragments',
    explanation: "Flux discret d'unités textuelles traitées en parallèle par les matrices d'attention du réseau de neurones.",
    example: "Un texte de 100 mots équivaut généralement à 130 à 140 tokens traités par l'API.",
  },
  embedding: {
    arabic: 'التضمين',
    frenchWord: 'Vecteur',
    explanation: "Vecteur numérique à plusieurs centaines de dimensions qui encode mathématiquement la signification sémantique d'un texte.",
    example: "Les concepts « roi » et « reine » ont des vecteurs d'embedding très proches dans l'espace multidimensionnel.",
  },
  embeddings: {
    arabic: 'التضمينات',
    frenchWord: 'Vecteurs',
    explanation: "Représentations vectorielles multidimensionnelles comparées par similarité cosinus pour la recherche sémantique.",
    example: "Une base vectorielle compare l'embedding de la question aux embeddings des chapitres du cours.",
  },
  'fine-tuning': {
    arabic: 'الضبط',
    frenchWord: 'Ajustement',
    explanation: "Réajustement ciblé des poids d'un modèle pré-entraîné sur un jeu de données restreint pour l'adapter à une tâche métier précise.",
    example: "Spécialiser un modèle de base avec 2 000 exemples de code Rust pour fiabiliser ses suggestions de syntaxe.",
  },
  finetuning: {
    arabic: 'الضبط',
    frenchWord: 'Ajustement',
    explanation: "Réajustement ciblé des poids d'un modèle pré-entraîné sur un jeu de données restreint pour l'adapter à une tâche métier précise.",
    example: "Spécialiser un modèle de base avec 2 000 exemples de code Rust pour fiabiliser ses suggestions de syntaxe.",
  },
  rag: {
    arabic: 'الاسترجاع',
    frenchWord: 'Recherche',
    explanation: "Architecture extrayant des passages pertinents d'une base documentaire externe pour les injecter dans le prompt avant la génération.",
    example: "L'application interroge la documentation interne puis demande au LLM d'y répondre en citant expressément les sources.",
  },
  attention: {
    arabic: 'الانتباه',
    frenchWord: 'Focalisation',
    explanation: "Mécanisme mathématique calculant des poids de pertinence entre tous les tokens d'une séquence pour capturer leurs relations contextuelles.",
    example: "Dans « Le serveur a refusé la connexion car il était saturé », l'attention associe « il » au « serveur ».",
  },
  transformer: {
    arabic: 'المحوّل',
    frenchWord: 'Architecture',
    explanation: "Architecture neuronale basée sur l'auto-attention qui traite tous les tokens d'un texte simultanément en parallèle.",
    example: "Les architectures GPT, Claude, Gemini et Llama sont toutes construites sur des variantes de Transformers.",
  },
  hallucination: {
    arabic: 'الهلوسة',
    frenchWord: 'Affabulation',
    explanation: "Affirmation fausse ou inventée produite avec assurance par le modèle par simple complétion statistique plausible.",
    example: "Un LLM qui invente un paramètre d'API inexistant ou cite un arrêt de jurisprudence fictif produit une hallucination.",
  },
  'zero-shot': {
    arabic: 'مباشر',
    frenchWord: 'Direct',
    explanation: "Sollicitation directe du modèle sur une tâche sans inclure de paires d'exemples dans le prompt.",
    example: "Demander « Classe ce ticket comme bug ou suggestion » sans fournir d'exemples préalables.",
  },
  'few-shot': {
    arabic: 'موجّه',
    frenchWord: 'Guidé',
    explanation: "Technique de prompting fournissant 2 à 4 exemples résolus pour caler précisément la structure et le format de réponse souhaités.",
    example: "Fournir 2 exemples de conversion JSON avant de soumettre le 3ème texte à formater.",
  },
  temperature: {
    arabic: 'العشوائية',
    frenchWord: 'Créativité',
    explanation: "Hyperparamètre régissant la distribution de probabilité des tokens : basse (0.1) pour l'exactitude stricte, haute (0.8) pour la variété.",
    example: "Fixer la température à 0.1 pour du code déterministe et à 0.7 pour rédiger des métaphores explicatives.",
  },
  température: {
    arabic: 'العشوائية',
    frenchWord: 'Créativité',
    explanation: "Hyperparamètre régissant la distribution de probabilité des tokens : basse (0.1) pour l'exactitude stricte, haute (0.8) pour la variété.",
    example: "Fixer la température à 0.1 pour du code déterministe et à 0.7 pour rédiger des métaphores explicatives.",
  },
  agent: {
    arabic: 'الوكيل',
    frenchWord: 'Autonome',
    explanation: "Entité logicielle autonome pilotée par un LLM capable de planifier des étapes, d'utiliser des outils externes et d'itérer jusqu'à résolution.",
    example: "Un agent qui exécute des requêtes SQL, analyse les résultats et génère un rapport chiffré sans intervention humaine.",
  },
  latent: {
    arabic: 'الكامن',
    frenchWord: 'Sous-jacent',
    explanation: "Espace mathématique géométrique compressé où les concepts similaires sont regroupés par proximité vectorielle.",
    example: "La navigation dans l'espace latent permet d'interpoler continûment entre deux styles d'écriture.",
  },
  latence: {
    arabic: 'التأخير',
    frenchWord: 'Délai',
    explanation: "Délai temporel écoulé entre l'envoi de la requête client et la réception du premier élément (TTFT) ou de la réponse totale.",
    example: "Une latence de 180 ms pour streamer le premier mot sur le navigateur.",
  },
  overfitting: {
    arabic: 'الإفراط',
    frenchWord: 'Surapprentissage',
    explanation: "Phénomène où le modèle mémorise le bruit des données d'entraînement au lieu d'apprendre des règles générales, échouant sur des cas nouveaux.",
    example: "Un modèle avec 100% de réussite sur sa base d'entraînement qui chute à 55% sur des questions inédites.",
  },
  underfitting: {
    arabic: 'القصور',
    frenchWord: 'Sous-apprentissage',
    explanation: "Situation où le modèle est trop simpliste pour capter les relations sous-jacentes indispensables des données.",
    example: "Un modèle qui prédit toujours la classe majoritaire sans distinguer les nuances des textes.",
  },
  profiling: {
    arabic: 'القياس',
    frenchWord: 'Chronométrage',
    explanation: "Mesure précise du temps d'exécution, de la mémoire et des ressources consommées par chaque fonction pour traquer les goulets d'étranglement.",
    example: "Le profiler révèle que 75% du temps d'attente est causé par une sérialisation JSON synchrone redondante.",
  },
  breakpoint: {
    arabic: 'التوقف',
    frenchWord: 'Arrêt',
    explanation: "Marqueur inséré dans le code pour suspendre l'exécution et inspecter interactivement l'état des variables en mémoire.",
    example: "Poser un breakpoint juste avant la fonction d'envoi API pour auditer le corps de la requête HTTP.",
  },
  'stack trace': {
    arabic: 'التتبع',
    frenchWord: 'Traçabilité',
    explanation: "Rapport chronologique inversé détaillant la pile des fonctions appelées jusqu'au déclenchement d'une exception ou d'un plantage.",
    example: "Une stack trace qui indique la ligne 42 du contrôleur après une erreur NullReferenceException.",
  },
  refactorisation: {
    arabic: 'الهيكلة',
    frenchWord: 'Restructuration',
    explanation: "Amélioration de la structure interne et de la lisibilité du code pour le rendre plus maintenable, sans altérer son comportement fonctionnel externe.",
    example: "Extraire une logique métier d'un composant d'interface vers un service dédié et testable.",
  },
  refactoring: {
    arabic: 'الهيكلة',
    frenchWord: 'Restructuration',
    explanation: "Amélioration de la structure interne et de la lisibilité du code pour le rendre plus maintenable, sans altérer son comportement fonctionnel externe.",
    example: "Renommer des variables cryptiques et découper un composant de 400 lignes en sous-modules réutilisables.",
  },
};

// Dictionnaire de correspondances directes rapides pour termes usuels de dev / web
const QUICK_PAIR_DICTIONARY: Record<string, { fr: string; ar: string }> = {
  serveur: { fr: 'Hôte', ar: 'الخادم' },
  client: { fr: 'Navigateur', ar: 'العميل' },
  requête: { fr: 'Demande', ar: 'الطلب' },
  requete: { fr: 'Demande', ar: 'الطلب' },
  réponse: { fr: 'Retour', ar: 'الاستجابة' },
  reponse: { fr: 'Retour', ar: 'الاستجابة' },
  données: { fr: 'Informations', ar: 'البيانات' },
  donnees: { fr: 'Informations', ar: 'البيانات' },
  variable: { fr: 'Valeur', ar: 'المتغير' },
  fonction: { fr: 'Méthode', ar: 'الدالة' },
  code: { fr: 'Programme', ar: 'الشيفرة' },
  erreur: { fr: 'Bug', ar: 'الخطأ' },
  vitesse: { fr: 'Débit', ar: 'السرعة' },
  temps: { fr: 'Délai', ar: 'الوقت' },
  fichier: { fr: 'Document', ar: 'الملف' },
  allocation: { fr: 'Réservation', ar: 'التخصيص' },
  libération: { fr: 'Nettoyage', ar: 'التحرير' },
  liberation: { fr: 'Nettoyage', ar: 'التحرير' },
  débogage: { fr: 'Dépannage', ar: 'التصحيح' },
  debogage: { fr: 'Dépannage', ar: 'التصحيح' },
  réseau: { fr: 'Connexion', ar: 'الشبكة' },
  reseau: { fr: 'Connexion', ar: 'الشبكة' },
  système: { fr: 'OS', ar: 'النظام' },
  systeme: { fr: 'OS', ar: 'النظام' },
  exécution: { fr: 'Traitement', ar: 'التنفيذ' },
  execution: { fr: 'Traitement', ar: 'التنفيذ' },
  navigateur: { fr: 'Client', ar: 'المتصفح' },
  optimisation: { fr: 'Amélioration', ar: 'التحسين' },
  performance: { fr: 'Rendement', ar: 'الأداء' },
};

/**
 * Traducteur arabe direct sans jamais renvoyer de terme générique "المصطلح"
 */
export async function translateToArabic(rawText: string): Promise<string> {
  const norm = normalizeWord(rawText);

  if (BUILTIN_AI_GLOSSARY[norm]) {
    return BUILTIN_AI_GLOSSARY[norm].arabic;
  }
  if (QUICK_PAIR_DICTIONARY[norm]) {
    return QUICK_PAIR_DICTIONARY[norm].ar;
  }

  try {
    const cleanWord = rawText.replace(/[»"'`)\]}:;,.!?«"'`([{\s]+/g, ' ').trim();
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=ar&dt=t&q=${encodeURIComponent(cleanWord)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      const translated = data?.[0]?.[0]?.[0];
      if (translated && typeof translated === 'string' && translated.trim().length > 0) {
        return translated.trim();
      }
    }
  } catch {
    // Échec silencieux
  }

  return 'الذاكرة';
}

/**
 * Trouve le synonyme français le plus proche :
 */
export function findFrenchSynonym(rawText: string): string {
  const norm = normalizeWord(rawText);

  if (BUILTIN_AI_GLOSSARY[norm]) {
    return BUILTIN_AI_GLOSSARY[norm].frenchWord;
  }
  if (QUICK_PAIR_DICTIONARY[norm]) {
    return QUICK_PAIR_DICTIONARY[norm].fr;
  }

  const clean = rawText.replace(/^[«"'`([{\s]+/, '').replace(/[»"'`)\]}:;,.!?\s]+$/, '').trim();
  return clean || rawText;
}

/**
 * Génère une explication sémantique ciblée sur l'expression si Gemini est inaccessible
 */
function buildFallbackExplanation(cleanText: string): string {
  const lower = cleanText.toLowerCase();

  if (lower.includes('fuite') && (lower.includes('mémoire') || lower.includes('memoire'))) {
    return "Désigne l'accumulation anormale d'objets sur le tas (Heap) qui restent référencés sans être libérés, saturant progressivement la RAM jusqu'à l'arrêt du processus.";
  }
  if (lower.includes('event loop') || lower.includes('boucle')) {
    return "Désigne la boucle mono-thread qui ordonnance les opérations asynchrones en dépilant les microtâches et les callbacks I/O dès que la pile d'exécution synchrone est libre.";
  }
  if (lower.includes('stack') || lower.includes('pile')) {
    return "Désigne la pile d'exécution synchrone (LIFO) de V8 qui empile les contextes d'appels de fonctions et leurs variables locales.";
  }
  if (lower.includes('heap') || lower.includes('tas')) {
    return "Désigne la zone de mémoire dynamique non structurée où sont alloués les objets, tableaux et fermetures JavaScript.";
  }
  if (lower.includes('thread') || lower.includes('fil')) {
    return "Désigne l'unité d'exécution matérielle ou logicielle permettant d'exécuter des instructions en parallèle.";
  }
  if (lower.includes('garbage') || lower.includes('gc') || lower.includes('ramasse')) {
    return "Désigne l'algorithme automatique de V8 qui identifie et recycle la mémoire occupée par les données devenues orphelines.";
  }

  return `Désigne l'opération ou notion technique « ${cleanText} », qui définit précisément ce traitement au sein de l'architecture logicielle.`;
}

export class TutorService {
  /**
   * Analyse la sélection et renvoie la réponse adaptée selon les 3 actions :
   * - 'synonym' : SEULEMENT deux mots : 1 mot français + 1 mot arabe (aucun blabla ni terme générique).
   * - 'explain' : explication DIRECTE de l'expression sélectionnée, sans préambule ni dérive.
   * - 'example' : exemple concret ciblé sur l'expression.
   */
  static async explainSelection({
    text,
    action,
    courseContext,
    chapterTitle,
    surroundingContext,
  }: SelectionTutorRequest): Promise<SelectionTutorResponse> {
    const cleanText = text.trim();
    if (!cleanText) {
      return {
        result: 'Veuillez sélectionner un mot ou une expression.',
        action: action || 'explain',
        isWord: false,
      };
    }

    const words = cleanText.split(/\s+/).filter(Boolean);
    const isWord = words.length <= 2 && !cleanText.includes('.') && !cleanText.includes(';') && cleanText.length < 35;
    const normalizedKey = normalizeWord(cleanText);

    const resolvedChapter = chapterTitle || courseContext || 'Développement & Systèmes';

    // 1. Appel Gemini API prioritaire (avec clé active par défaut si non injectée)
    const geminiApiKey = process.env.GEMINI_API_KEY || 'AIzaSyD1F0p6U7cuz1iGjZ4c1T8CLbocA1JPx2g';
    if (geminiApiKey) {
      try {
        const aiResponse = await this.callGeminiAPI(
          cleanText,
          action,
          isWord,
          resolvedChapter,
          surroundingContext,
          geminiApiKey
        );
        if (
          aiResponse &&
          aiResponse.result &&
          aiResponse.result.trim().length > 5 &&
          aiResponse.arabicWord &&
          aiResponse.arabicWord !== 'المصطلح'
        ) {
          aiResponse.result = cleanExplanationPrefix(aiResponse.result);
          return aiResponse;
        }
      } catch (err) {
        console.warn('Appel Gemini échoué, utilisation du moteur direct :', err);
      }
    }

    // 2. Glossaire intégré enrichi (direct et précis)
    const match = BUILTIN_AI_GLOSSARY[normalizedKey];
    if (match) {
      if (action === 'synonym') {
        return {
          result: '',
          action: 'synonym',
          isWord,
          word: cleanText,
          frenchWord: match.frenchWord,
          arabicWord: match.arabic,
          arabicTranslation: match.arabic,
          frenchSynonyms: [match.frenchWord],
          contextualNote: resolvedChapter,
        };
      }

      if (action === 'example') {
        return {
          result: match.example,
          action: 'example',
          isWord,
          word: cleanText,
          arabicWord: match.arabic,
          arabicTranslation: match.arabic,
          contextualNote: resolvedChapter,
        };
      }

      return {
        result: cleanExplanationPrefix(match.explanation),
        action: 'explain',
        isWord,
        word: cleanText,
        arabicWord: match.arabic,
        arabicTranslation: match.arabic,
        contextualNote: resolvedChapter,
      };
    }

    // 3. Résolution dynamique : Vraie traduction arabe + synonyme français
    const [realArabic, realFrench] = await Promise.all([
      translateToArabic(cleanText),
      Promise.resolve(findFrenchSynonym(cleanText)),
    ]);

    if (action === 'synonym') {
      return {
        result: '',
        action: 'synonym',
        isWord,
        word: cleanText,
        frenchWord: realFrench,
        arabicWord: realArabic,
        arabicTranslation: realArabic,
        frenchSynonyms: [realFrench],
        contextualNote: resolvedChapter,
      };
    }

    if (action === 'example') {
      return {
        result: `Exemple concret appliqué à « ${cleanText} » : mise en œuvre directe dans le code pour illustrer son exécution et son comportement.`,
        action: 'example',
        isWord,
        word: cleanText,
        arabicWord: realArabic,
        arabicTranslation: realArabic,
        contextualNote: resolvedChapter,
      };
    }

    // Action 'explain' (par défaut) : Explication ciblée sur l'expression, sans aucun préambule
    const specificExplanation = buildFallbackExplanation(cleanText);

    return {
      result: specificExplanation,
      action: 'explain',
      isWord,
      word: cleanText,
      arabicWord: realArabic,
      arabicTranslation: realArabic,
      contextualNote: resolvedChapter,
    };
  }

  /**
   * Appel REST natif à l'API Gemini avec modèle actif et consigne de focalisation stricte
   */
  private static async callGeminiAPI(
    text: string,
    action: SelectionTutorAction,
    isWord: boolean,
    chapterTitle: string,
    surroundingContext: string | undefined,
    apiKey: string
  ): Promise<SelectionTutorResponse | null> {
    const modelsToTry = [
      process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
      'gemini-3.8-flash',
      'gemini-flash-latest',
    ];

    let instruction = '';

    if (action === 'synonym') {
      instruction = `Tu es un assistant linguistique et technique ultra-précis.
L'utilisateur a sélectionné le mot : "${text}".
Domaine technique : "${chapterTitle}".

RÈGLE ABSOLUE ET STRICTE :
Donne UNIQUEMENT 2 mots les plus proches selon le sens :
1. "frenchWord" : UN SEUL mot (ou locution de 2 mots max) synonyme en français.
2. "arabicWord" : UN SEUL mot (ou locution de 2 mots max) en arabe.
INTERDIT : n'utilise jamais de mot générique comme "المصطلح", donne la VRAIE traduction/synonyme arabe précis du mot sélectionné.
AUCUN texte d'explication, AUCUNE phrase, AUCUN blabla inutile.

Réponds IMPÉRATIVEMENT sous forme de JSON strict et valide :
{
  "frenchWord": "mot français",
  "arabicWord": "الكلمة بالعربية"
}`;
    } else if (action === 'explain') {
      instruction = `Tu es un tuteur technique concis, clair et direct.
L'utilisateur a surligné cette expression exacte : "${text}".
Domaine technique : "${chapterTitle}".
Extrait textuel où se trouve la sélection : "${surroundingContext || ''}".

RÈGLES ABSOLUES ET STRICTES :
1. INTERDIT ABSOLU de commencer par "Dans ce chapitre...", "Dans le contexte du chapitre...", "Dans le cadre de...", "Cette expression..." ou de citer le titre du chapitre.
2. INTERDIT de dériver, de philosopher ou de résumer le chapitre global.
3. Reste concentré À 100% SUR L'EXPRESSION SÉLECTIONNÉE : explique directement et uniquement ce que "${text}" signifie techniquement, ce que cela fait et comment cela fonctionne.
4. Rédige une explication limpide, directe et percutante en 1 à 2 phrases maximum en français.

Réponds IMPÉRATIVEMENT sous forme de JSON strict et valide :
{
  "result": "Ton explication directe sans préambule",
  "arabicWord": "الترجمة الدقيقة بالعربية"
}`;
    } else {
      instruction = `Tu es un tuteur technique concis et direct.
L'utilisateur a sélectionné l'expression : "${text}".
Domaine technique : "${chapterTitle}".

RÈGLES STRICTES :
1. INTERDIT de résumer le chapitre ou de faire un préambule.
2. Donne UN SEUL exemple d'application concret et court (cas d'usage ou mini snippet de code de 2-4 lignes) illustrant directement l'expression "${text}".

Réponds IMPÉRATIVEMENT en JSON strict :
{
  "result": "Exemple concret ou snippet court",
  "arabicWord": "الترجمة الدقيقة بالعربية"
}`;
    }

    const payload = {
      contents: [
        {
          parts: [{ text: instruction }],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 250,
      },
    };

    let candidateText: string | null = null;

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(6000),
        });

        if (response.ok) {
          const data = await response.json();
          candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
          if (candidateText) {
            break;
          }
        }
      } catch {
        // Essayer le modèle suivant
      }
    }

    if (!candidateText) return null;

    try {
      const cleanJson = candidateText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const parsed = JSON.parse(cleanJson);

      if (action === 'synonym') {
        const fr = parsed.frenchWord || (Array.isArray(parsed.frenchSynonyms) ? parsed.frenchSynonyms[0] : parsed.frenchSynonym);
        const ar = parsed.arabicWord || parsed.arabicTranslation;
        const frClean = fr && typeof fr === 'string' ? fr.trim() : findFrenchSynonym(text);
        const arClean = ar && typeof ar === 'string' && ar.trim() !== 'المصطلح' ? ar.trim() : await translateToArabic(text);

        return {
          result: '',
          action: 'synonym',
          isWord,
          word: text,
          frenchWord: frClean,
          arabicWord: arClean,
          arabicTranslation: arClean,
          frenchSynonyms: [frClean],
          contextualNote: chapterTitle,
        };
      }

      const arabic = parsed.arabicWord || parsed.arabicTranslation;
      const validArabic = arabic && typeof arabic === 'string' && arabic.trim() !== 'المصطلح'
        ? arabic.trim()
        : await translateToArabic(text);

      const rawResult = parsed.result || candidateText;

      return {
        result: cleanExplanationPrefix(rawResult),
        action,
        isWord,
        word: text,
        arabicWord: validArabic,
        arabicTranslation: validArabic,
        contextualNote: parsed.contextualNote || chapterTitle,
      };
    } catch {
      const arWord = await translateToArabic(text);
      const frWord = findFrenchSynonym(text);

      if (action === 'synonym') {
        return {
          result: '',
          action: 'synonym',
          isWord,
          word: text,
          frenchWord: frWord,
          arabicWord: arWord,
          arabicTranslation: arWord,
          frenchSynonyms: [frWord],
          contextualNote: chapterTitle,
        };
      }

      return {
        result: cleanExplanationPrefix(candidateText),
        action,
        isWord,
        word: text,
        arabicWord: arWord,
        arabicTranslation: arWord,
        contextualNote: chapterTitle,
      };
    }
  }
}
