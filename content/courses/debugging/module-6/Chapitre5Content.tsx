'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

interface ContextCategory {
  id: string;
  name: string;
  impact: string;
  riskIfOmitted: string;
  concreteExample: string;
}

const CONTEXT_CATEGORIES: ContextCategory[] = [
  {
    id: 'versions',
    name: '1. Versions exactes des runtimes & packages',
    impact: 'Conditionne le choix des APIs supportées et les comportements du compilateur.',
    riskIfOmitted: 'L\'IA suggère des syntaxes dépréciées (ex: Express 4 middleware) causant des blocages sur Express 5.',
    concreteExample: 'Node.js v22.11 LTS, Express v5.0.1, TypeScript v5.6, MySQL v8.0.36, mysql2 v3.11.0.',
  },
  {
    id: 'architecture',
    name: '2. Cartographie de l\'architecture logicielle',
    impact: 'Expose les couches applicatives (Contrôleurs, Services Métier, Repositories, BDD).',
    riskIfOmitted: 'L\'IA mélange les responsabilités en injectant des requêtes SQL brutes dans les contrôleurs UI.',
    concreteExample: 'Architecture en couches : Controller (HTTP) -> Service (Métier) -> Repository (MySQL Pool).',
  },
  {
    id: 'behavior',
    name: '3. Contrat de comportement (Attendu vs Observé)',
    impact: 'Définit précisément la frontière entre le fonctionnement normal et l\'anomalie.',
    riskIfOmitted: 'L\'IA interprète un comportement métier normal comme un bug et altère la mauvaise fonction.',
    concreteExample: 'Attendu : HTTP 404 avec message JSON. Observé : HTTP 500 avec crash TypeError sur user.id.',
  },
  {
    id: 'schema',
    name: '4. Schémas de données DDL & Contraintes',
    impact: 'Révèle les contraintes de nullabilité (NULL / NOT NULL), clés étrangères et index B-Tree.',
    riskIfOmitted: 'L\'IA suppose qu\'un champ existe toujours en base alors que la colonne autorise la valeur NULL.',
    concreteExample: 'CREATE TABLE orders (id INT PRIMARY KEY, user_id INT NOT NULL, coupon_id INT NULL);',
  },
  {
    id: 'payload',
    name: '5. Données d\'entrée réelles (Payload entrant)',
    impact: 'Permet de reconstituer les types de données effectivement transmis par le client.',
    riskIfOmitted: 'Invisibilité des problèmes de coercition de types (ex: "42" chaîne de caractères au lieu du nombre 42).',
    concreteExample: 'Headers : Content-Type: application/json. Body : { "orderId": "ORD-99", "quantity": 0 }.',
  },
  {
    id: 'gitdiff',
    name: '6. Historique Git & Dernières modifications',
    impact: 'Isole le commit exact ayant introduit la régression par analyse différentielle.',
    riskIfOmitted: 'Recherche aveugle dans 50 000 lignes de code au lieu de cibler les 15 lignes modifiées hier.',
    concreteExample: 'git diff HEAD~1 src/services/authService.ts (passage de sha256 à argon2id).',
  },
  {
    id: 'infrastructure',
    name: '7. Environnement d\'exécution & Réseau',
    impact: 'Précise si le code tourne en local, conteneur Docker, serverless AWS Lambda ou cluster Kubernetes.',
    riskIfOmitted: 'Conseils inapplicables (ex: suggérer d\'écrire un fichier local sur un système éphémère Read-Only).',
    concreteExample: 'Conteneur Docker Alpine Linux en lecture seule avec volume monté sur /tmp.',
  },
];

export const Chapitre5Content: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('versions');
  const activeCategory = CONTEXT_CATEGORIES.find((c) => c.id === activeCategoryId)!;

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 6 • Chapitre 5 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Cartographie Contextuelle & Déterminisme du Diagnostic
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Fournir le contexte technique nécessaire à une analyse fiable : Les 7 piliers d&apos;information et la cartographie d&apos;architecture
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Dans une enquête d&apos;ingénierie logicielle, l&apos;IA est comparable à <strong>un détective arrivant sur une scène de crime complexe</strong> :
          si vous lui montrez uniquement un verre brisé sans lui révéler s&apos;il s&apos;agit d&apos;une banque ultra-sécurisée ou d&apos;une cabane de jardin,
          sans lui fournir les plans des issues de secours, sans lui dire qui détenait les clés d&apos;accès et sans lui donner le rapport des travaux effectués la veille,
          il formulera des conclusions absurdes et accusera le premier venu. En ingénierie, <strong>fournir le contexte technique n&apos;est pas une option de confort : c&apos;est la condition mathématique sine qua non de la justesse du diagnostic</strong>.
        </p>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Objectifs d&apos;apprentissage du chapitre
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser les 7 catégories indispensables d&apos;informations techniques à inclure dans un dossier d&apos;incident.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Présenter l&apos;architecture multicouche et les flux de communication à l&apos;aide d&apos;une cartographie normalisée.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Exploiter l&apos;historique de versions Git (<code>git diff</code>) pour isoler les régressions avec une précision chirurgicale.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Définir sans ambiguïté le contrat de comportement (Expected vs Observed Behavior) pour guider le modèle vers la cause racine.</span>
          </li>
        </ul>
      </section>

      {/* 2. Pourquoi un message d'erreur isolé conduit à l'échec */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Pourquoi transmettre un message d&apos;erreur isolé conduit inévitablement à l&apos;échec
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Considérons le message d&apos;erreur le plus commun du monde JavaScript :
        </p>

        <CodeBlock
          filename="logs/isolated-error.log"
          language="bash"
          code={`TypeError: Cannot read properties of undefined (reading 'email')`}
        />

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Transmis seul sans contexte technique, ce message ne permet pas de diagnostiquer la cause racine. Le modèle IA se trouve dans l&apos;impossibilité de répondre aux questions vitales :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-rose-700">Où ?</span>
            <p className="text-xs text-slate-600">Dans quel fichier, quel composant ou quelle route Express l&apos;erreur a-t-elle eu lieu ?</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-rose-700">D&apos;où ?</span>
            <p className="text-xs text-slate-600">L&apos;objet undefined devait-il provenir d&apos;une table MySQL, d&apos;un jeton JWT décodé ou du payload client ?</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-rose-700">Comment ?</span>
            <p className="text-xs text-slate-600">Quelle est la structure normale de la table en BDD ? La colonne est-elle nullable ?</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-rose-700">Pourquoi maintenant ?</span>
            <p className="text-xs text-slate-600">Qu&apos;est-ce qui a changé récemment dans le dépôt Git ou dans la configuration du serveur ?</p>
          </div>
        </div>

        <Callout type="warning" title="Le danger de l'inférence sans contexte">
          <p className="text-xs sm:text-sm">
            Privé de contexte, le LLM remplit les vides en inventant un scénario statistique par défaut : il supposera que vous utilisez un ORM populaire comme Prisma alors que vous utilisez <code>mysql2/promise</code> natif,
            ou il proposera de modifier une variable de session alors que votre API est strictement sans état (stateless JWT).
          </p>
        </Callout>
      </section>

      {/* 3. Les 7 Piliers du Contexte Technique */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les 7 catégories critiques d&apos;informations contextuelles
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Cliquez sur chaque catégorie pour examiner son impact technique, le risque encouru en cas d&apos;omission et un exemple d&apos;implémentation :
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {CONTEXT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                activeCategoryId === cat.id
                  ? 'bg-lime-500 text-slate-950 border-lime-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.name.split(' ')[0]} {cat.name.split(' ')[1]}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-950 text-base">{activeCategory.name}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-lime-100 text-lime-900 border border-lime-300">
              Pilier d&apos;Ingénierie
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wider">Impact sur le diagnostic :</span>
              <p className="text-slate-700">{activeCategory.impact}</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-rose-800 uppercase tracking-wider">Risque en cas d&apos;omission :</span>
              <p className="text-slate-700">{activeCategory.riskIfOmitted}</p>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Exemple concret à intégrer dans le prompt :</span>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 mt-1">
              {activeCategory.concreteExample}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Cartographie d'Architecture avec image7.jpeg */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Cartographier l&apos;architecture logicielle et les flux de communication
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          L&apos;IA doit visualiser les frontières de responsabilité entre les modules pour ne pas proposer de correctif brisant l&apos;architecture en couches (Clean Architecture / Hexagonale) :
        </p>

        {/* Visuel Technique : image7.jpeg */}
        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-3 my-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Icon name="database" className="w-4 h-4 text-emerald-700" />
              <span>Cartographie des flux de données et architecture multicouche</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-900 border border-sky-300">
              Système Distribué
            </span>
          </div>

          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
            <Image
              src="/images/cours/debugging/module-6/image7.jpeg"
              alt="Cartographie globale de l'architecture logicielle : Frontend React, Backend Express, Pool MySQL et Service IA"
              fill
              className="object-contain p-2"
            />
          </div>
          <p className="text-xs text-slate-600 italic">
            Figure 6.5.1 — Flux de communication d&apos;une architecture moderne : la requête traverse successivement le routeur, les middlewares de sécurité (Helmet, JWT), le contrôleur HTTP, le service métier, la couche de persistance (Repository / Connection Pool) et le moteur de base de données relationnelle.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="font-bold text-slate-900 text-sm">Règle de séparation des responsabilités :</h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            Lorsque vous fournissez le contexte d&apos;architecture, indiquez explicitement la règle de votre codebase :
            <em>&quot;Les contrôleurs ne contiennent aucune logique SQL ; les services ne manipulent jamais les objets <code>req</code> ou <code>res</code> d&apos;Express ; les repositories retournent des entités pures ou lèvent des erreurs de domaine.&quot;</em>
            Cette contrainte interdit au modèle de produire du code brouillon violant les principes SOLID.
          </p>
        </div>
      </section>

      {/* 5. Cas pratique : Régression induite par un commit récent */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Cas pratique : Dépister une régression subtile grâce au Git Diff
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Une méthode extrêmement puissante consiste à adjoindre au prompt le diff du dernier commit Git.
          Imaginons qu&apos;une route d&apos;inscription crashe mystérieusement depuis le déploiement de ce matin :
        </p>

        <CodeBlock
          filename="git diff HEAD~1 src/controllers/authController.ts"
          language="diff"
          code={`@@ -14,7 +14,7 @@ export async function registerUser(req: Request, res: Response) {
   const { email, password, role } = req.body;
   
-  const hashedPassword = await bcrypt.hash(password, 10);
+  const hashedPassword = bcrypt.hashSync(password, 12);
   
   const newUser = await userRepository.create({
     email,
@@ -23,4 +23,5 @@ export async function registerUser(req: Request, res: Response) {
   });
   
   return res.status(201).json(newUser);
 }`}
        />

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-950 text-sm flex items-center gap-2">
            <Icon name="sparkles" className="w-4 h-4 text-emerald-700" />
            <span>Ce que l&apos;IA détecte immédiatement grâce au Git Diff :</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Le passage de <code>await bcrypt.hash(..., 10)</code> (asynchrone, non bloquant) à <code>bcrypt.hashSync(..., 12)</code> (synchrone avec un facteur de coût élevé de 12)
            monopolise le thread JavaScript pendant plus de 250 ms par requête.
            Sous une charge de 50 inscriptions concurrentes, l&apos;Event Loop de Node.js est totalement gelée, provoquant des timeouts en cascade (HTTP 504 Gateway Timeout) sur toutes les autres routes du serveur.
          </p>
        </div>
      </section>

      {/* Quiz de certification (6 questions) */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de certification — Chapitre 6.5 : Fournir le Contexte Technique Nécessaire"
          questions={[
            {
              id: 1,
              question: "Pourquoi l'omission des numéros de versions majeurs dans le contexte technique (ex: spécifier simplement 'Express' au lieu de 'Express 5.0') entraîne-t-elle souvent des diagnostics erronés ?",
              options: [
                "Parce que les LLMs refusent de répondre si les versions ne comportent pas trois chiffres.",
                "Parce que des versions majeures différentes introduisent des ruptures d'architecture fondamentales (par exemple, Express 5 résout nativement les promesses rejetées, éliminant le besoin de middlewares d'interception manuels obligatoires en Express 4).",
                "Parce que les serveurs de bases de données bloquent les connexions si la version du client n'est pas écrite en majuscules.",
                "Parce que TypeScript ne compile que les versions paires de Node.js."
              ],
              correctIndex: 1,
              explanation: "Les comportements internes et signatures de méthodes changent radicalement entre versions majeures. Préciser les versions exactes ancre le modèle dans les spécifications et contrats d'API correspondants."
            },
            {
              id: 2,
              question: "Quelle est l'utilité première de transmettre le schéma DDL de la table MySQL (CREATE TABLE) lors de l'investigation d'un bug d'insertion ou de lecture ?",
              options: [
                "Remplacer le disque dur du serveur par un espace de stockage cloud.",
                "Permettre à l'IA de connaître la nullabilité des colonnes (NULL vs NOT NULL), les contraintes d'unicité, les types stricts et les valeurs par défaut.",
                "Créer automatiquement des graphiques statistiques dans Excel.",
                "Empêcher les utilisateurs de se connecter pendant la nuit."
              ],
              correctIndex: 1,
              explanation: "Le code JavaScript peut manipuler un objet avec des champs optionnels, mais si la colonne SQL correspondante est NOT NULL sans valeur par défaut, l'insertion échoue avec ER_NO_DEFAULT_FOR_FIELD. Le schéma DDL apporte la vérité sur le stockage."
            },
            {
              id: 3,
              question: "Dans la description d'un incident, pourquoi la distinction entre 'Comportement attendu' et 'Comportement observé' est-elle indispensable ?",
              options: [
                "Pour permettre à l'IA d'estimer la charge de la batterie de l'ordinateur.",
                "Pour formaliser l'écart (delta) précis entre la spécification métier normale et l'anomalie réelle, évitant que le modèle ne considère un comportement normal comme un bug.",
                "Pour convertir le projet en architecture microservices sans intervention humaine.",
                "Pour activer le mode plein écran dans Visual Studio Code."
              ],
              correctIndex: 1,
              explanation: "Un modèle de langage ne connaît pas vos règles métier privées. Définir ce qui aurait dû se produire (ex: renvoyer 404 avec message JSON) permet au LLM de mesurer exactement la divergence provoquée par le bug."
            },
            {
              id: 4,
              question: "Quel avantage déterminant offre l'inclusion du diff Git récent ('git diff HEAD~1') lors de l'investigation d'une régression apparue après un déploiement ?",
              options: [
                "Il force le modèle à réécrire tout l'historique des commits depuis l'origine du projet.",
                "Il focalise immédiatement l'attention du modèle sur le sous-ensemble réduit de lignes modifiées ayant altéré le comportement du système, éliminant des heures de recherche aveugle dans le reste du projet.",
                "Il réduit la taille des paquets réseau TCP.",
                "Il permet d'exécuter le code sans installer Node.js."
              ],
              correctIndex: 1,
              explanation: "Le Git Diff applique le principe du rasoir d'Ockham : si le système fonctionnait hier et qu'il plante aujourd'hui, l'anomalie se situe quasi-certainement dans les quelques lignes modifiées dans le commit récent."
            },
            {
              id: 5,
              question: "Pourquoi est-il crucial de préciser les contraintes d'infrastructure dans le contexte (ex: conteneur Docker en système de fichiers Read-Only) ?",
              options: [
                "Pour empêcher le LLM de proposer des corrections incompatibles avec l'environnement d'exécution (comme tenter d'écrire un fichier temporaire sur un disque inaccessible).",
                "Pour chiffrer les requêtes HTTP avec TLS 1.3.",
                "Parce que Docker interdit l'utilisation de l'intelligence artificielle.",
                "Pour forcer le serveur à utiliser un processeur ARM64 au lieu d'Intel x86."
              ],
              correctIndex: 0,
              explanation: "Si l'environnement de production interdit l'écriture sur disque (système immuable ou serverless Lambda), une proposition de correction basée sur fs.writeFileSync() provoquera un crash EROFS immédiat."
            },
            {
              id: 6,
              question: "Comment un ingénieur doit-il formuler les données d'entrée (Payload) lorsqu'il transmet le contexte d'une requête HTTP ayant provoqué une erreur 500 ?",
              options: [
                "En copiant-collant une capture d'écran illisible prise avec son smartphone.",
                "En fournissant la charge utile JSON exacte ou les paramètres d'URL réels, préalablement expurgés de toute donnée confidentielle (PII / mots de passe / cartes bancaires).",
                "En remplaçant tous les chiffres par des lettres majuscules.",
                "En omettant le Content-Type pour simplifier le prompt."
              ],
              correctIndex: 1,
              explanation: "Les données d'entrée réelles permettent au modèle de reproduire mentalement le flux d'exécution et de détecter des cas limites (valeur null, chaîne vide, nombre négatif) tout en respectant la sécurité des données."
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Chapitre5Content;
