'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

interface PhaseStep {
  step: number;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  forbiddenAction: string;
  requiredDeliverable: string;
}

const INVESTIGATION_PHASES: PhaseStep[] = [
  {
    step: 1,
    name: 'Phase 1 : Inventaire des Faits Confirmés',
    badge: 'Faits Purs',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Recensement exclusif des données attestées par les logs, les métriques et les traces réelles, sans aucune extrapolation.',
    forbiddenAction: 'Interdiction de supposer ("Je pense que le serveur est surchargé").',
    requiredDeliverable: 'Liste à puces des faits prouvés (ex: L\'exception TypeError survient à la ligne 42 lors du déréférencement de user.id).',
  },
  {
    step: 2,
    name: 'Phase 2 : Formulation d\'Hypothèses Réfutables',
    badge: 'Hypothèses',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Élaboration de 2 à 3 scénarios explicatifs plausibles, ordonnés par probabilité technique décroissante.',
    forbiddenAction: 'Interdiction d\'écrire la moindre ligne de code de correction.',
    requiredDeliverable: 'Matrice de 3 hypothèses avec probabilité (Élevée, Moyenne, Faible) et justification causale.',
  },
  {
    step: 3,
    name: 'Phase 3 : Conception du Protocole de Preuve',
    badge: 'Vérification',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Définition de l\'expérience minimale (requête SQL directe, test unitaire Vitest, log temporaire) capable de valider ou d\'invalider chaque hypothèse.',
    forbiddenAction: 'Interdiction d\'appliquer un patch pour "voir si ça marche".',
    requiredDeliverable: 'Script de test de reproduction minimal produisant un échec franc (Test Rouge).',
  },
  {
    step: 4,
    name: 'Phase 4 : Validation de la Cause Racine (RCA)',
    badge: 'Cause Racine',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Identification certaine du mécanisme défaillant sous-jacent. Une fois la cause racine prouvée, l\'autorisation de correction est débloquée.',
    forbiddenAction: 'Interdiction de conserver des patchs de surface ou des masquages d\'erreurs.',
    requiredDeliverable: 'Rapport technique concluant et spécification formelle du plan de remédiation.',
  },
];

export const Chapitre6Content: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentPhase = INVESTIGATION_PHASES.find((p) => p.step === activeStep)!;

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 6 • Chapitre 6 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Méthodologie d&apos;Investigation & Étanchéité Diagnostic / Action
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Faire analyser une erreur sans demander immédiatement sa correction : Le principe d&apos;étanchéité de l&apos;enquête technique
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Dans la pratique médicale hospitalière, un chirurgien qui prescrirait une ablation d&apos;organe dès qu&apos;un patient se plaint d&apos;un mal de ventre,
          sans avoir réalisé d&apos;échographie, de prise de sang ni confirmé la pathologie, commettrait <strong>une faute professionnelle impardonnable</strong>.
          En ingénierie logicielle, demander directement à une IA : <em>&quot;Voici mon erreur, corrige mon code&quot;</em> relève exactement de la même erreur déontologique.
          Le réflexe de l&apos;ingénieur consiste à <strong>interdire formellement toute modification de code</strong> tant que l&apos;instruction du dossier n&apos;a pas isolé et prouvé factuellement la cause racine.
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
            <span>Comprendre les dangers systémiques de la correction immédiate par LLM (patchs anesthésiants, dette technique, régressions cachées).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser le protocole d&apos;enquête en 4 phases étanches : Faits $\rightarrow$ Hypothèses $\rightarrow$ Épreuves $\rightarrow$ Cause Racine.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Formuler des directives de garde-fous explicites pour brider le comportement spontané des agents IA dans l&apos;IDE (Google Antigravity).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Produire des tests de reproduction minimaux (Failing Tests) qui attestent de l&apos;existence du bug avant toute remédiation.</span>
          </li>
        </ul>
      </section>

      {/* 2. Pourquoi la précipitation de la correction détruit le code */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Pourquoi la demande de correction prématurée détruit la qualité logicielle
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Les modèles de langage sont entraînés pour maximiser la satisfaction immédiate de l&apos;utilisateur.
          Lorsque vous leur demandez de &quot;corriger&quot; un crash, ils choisissent systématiquement <strong>la trajectoire de moindre résistance mathématique</strong> :
          supprimer le symptôme visible le plus vite possible, sans se soucier des effets de bord à long terme.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">1. Le Patch d&apos;Anesthésie</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              L&apos;IA remplace <code>order.user.email</code> par <code>order?.user?.email</code>. L&apos;application ne crashe plus immédiatement,
              mais envoie un email à <code>undefined</code>, déclenchant une défaillance silencieuse chez le client.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">2. Le Catch Silencieux Destructeur</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              L&apos;IA encapsule le service dans un bloc <code>try &#123; ... &#125; catch (e) &#123; return null; &#125;</code>.
              L&apos;erreur 500 disparaît des logs, mais les commandes ne s&apos;enregistrent plus jamais en base de données.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">3. La Déformation d&apos;Architecture</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Ne comprenant pas pourquoi le repository renvoie null, l&apos;IA injecte une connexion SQL directe dans le composant React ou dans le contrôleur HTTP,
              créant une violation flagrante des principes de Clean Architecture.
            </p>
          </div>
        </div>

        <Callout type="warning" title="Le théorème de la séparation étanche">
          <p className="text-xs sm:text-sm">
            <strong>Tant que vous ne pouvez pas expliquer en une phrase claire pourquoi le bug s&apos;est produit et comment le reproduire avec un test déterministe, vous n&apos;avez pas le droit d&apos;écrire du code de correction.</strong>
            Demandez d&apos;abord à l&apos;IA d&apos;expliquer le mécanisme. Validez ses arguments. Puis seulement, autorisez la phase de remédiation.
          </p>
        </Callout>
      </section>

      {/* 3. Le Protocole en 4 Phases Étanches */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Le Protocole d&apos;Investigation en 4 Phases Étanches
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Cliquez sur chaque étape du protocole pour visualiser les règles strictes d&apos;exécution et les livrables attendus :
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {INVESTIGATION_PHASES.map((p) => (
            <button
              key={p.step}
              onClick={() => setActiveStep(p.step)}
              className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                activeStep === p.step
                  ? 'bg-lime-500 text-slate-950 border-lime-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Étape {p.step}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-950 text-base">{currentPhase.name}</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentPhase.badgeColor}`}>
              {currentPhase.badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700">{currentPhase.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
              <span className="font-bold text-rose-800 uppercase tracking-wider">Interdiction Formelle :</span>
              <p className="text-slate-700">{currentPhase.forbiddenAction}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wider">Livrable Exigé de l&apos;IA :</span>
              <p className="text-slate-700">{currentPhase.requiredDeliverable}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Exemple Concret : Diagnostic d'une erreur de commande e-commerce */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Démonstration : Appliquer le prompt d&apos;étanchéité à un crash réel
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Voici le code d&apos;un contrôleur de consultation de commande sur une plateforme marchande :
        </p>

        <CodeBlock
          filename="src/controllers/orderController.ts"
          language="typescript"
          code={`export async function getOrderSummary(req: Request, res: Response) {
  const orderId = Number(req.params.id);

  // Recherche en base SQL via le repository
  const [rows] = await db.execute<RowDataPacket[]>(
    'SELECT id, customer_id, total_amount, status FROM orders WHERE id = ?',
    [orderId]
  );

  const order = rows[0];

  // Crash si order est undefined : TypeError: Cannot read properties of undefined (reading 'id')
  return res.json({
    orderId: order.id,
    customerId: order.customer_id,
    total: order.total_amount,
    status: order.status,
  });
}`}
        />

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-950 text-sm">Le prompt d&apos;investigation pure (Zéro modification autorisée) :</h4>
          <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed space-y-2 border border-slate-800">
            <p className="text-lime-400 font-bold">PROMPT DE DIAGNOSTIC ÉTANCHE :</p>
            <p>Tu es un expert en diagnostic backend. Analyse le code ci-dessus sans proposer aucune modification de fichier.</p>
            <p>1. Formule les faits certains observés.</p>
            <p>2. Émets 2 hypothèses distinctes expliquant pourquoi rows[0] est undefined.</p>
            <p>3. Décris l&apos;instruction MySQL exacte à exécuter dans le terminal pour confirmer ou infirmer chaque hypothèse.</p>
            <p className="text-rose-400 font-bold">CONTRAINTE : Ne génère aucun code de remplacement pour getOrderSummary.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h4 className="font-bold text-slate-950 text-sm flex items-center gap-2">
            <Icon name="sparkles" className="w-4 h-4 text-emerald-700" />
            <span>Réponse analytique obtenue (Raisonnement pur sans bricolage) :</span>
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
            <p>
              <strong>Faits avérés :</strong> L&apos;accès à <code>order.id</code> a échoué car <code>rows</code> est un tableau vide (<code>length === 0</code>).
            </p>
            <p>
              <strong>Hypothèse A :</strong> L&apos;identifiant de commande demandé (ex: 5000) n&apos;existe pas dans la table <code>orders</code>.
            </p>
            <p>
              <strong>Hypothèse B :</strong> L&apos;identifiant existe, mais la transaction courante tourne sous un niveau d&apos;isolation <code>REPEATABLE READ</code> qui ne voit pas encore les commits concurrents.
            </p>
            <p>
              <strong>Vérification déterministe :</strong> Exécuter dans la console MySQL : <code>SELECT COUNT(*) FROM orders WHERE id = 5000;</code>.
              Si le résultat est 0, l&apos;hypothèse A est confirmée.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz de certification (6 questions) */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de certification — Chapitre 6.6 : Analyser une Erreur sans Correction Immédiate"
          questions={[
            {
              id: 1,
              question: "Quel est le risque technique majeur lorsqu'un ingénieur demande à une IA de 'corriger directement' une erreur 500 sans exiger de diagnostic préalable ?",
              options: [
                "L'IA va saturer la bande passante de la connexion Wi-Fi de l'entreprise.",
                "L'IA risque d'appliquer un correctif superficiel (patch d'anesthésie comme un chaînage optionnel ou un try/catch vide) qui étouffe le symptôme sans résoudre la défaillance de fond.",
                "Le compilateur TypeScript refusera de s'exécuter pendant 48 heures.",
                "Les disques durs des serveurs MySQL se verrouillent automatiquement en mode lecture seule."
              ],
              correctIndex: 1,
              explanation: "Demander une correction immédiate incite le LLM à supprimer le crash le plus facilement possible. Il appliquera des pansements qui masquent la panne et propagent des données corrompues dans le système."
            },
            {
              id: 2,
              question: "Dans le protocole d'investigation en 4 phases, que doit contenir obligatoirement la 'Phase 1 : Faits Confirmés' ?",
              options: [
                "Les intuitions subjectives et suppositions non vérifiées de l'équipe de développement.",
                "Uniquement les éléments factuels tangibles attestés par les Stack Traces, les logs d'exécution réels et les numéros de versions vérifiés.",
                "Le devis estimatif du coût de réécriture complète de l'application.",
                "Une liste de nouvelles bibliothèques à installer avec npm."
              ],
              correctIndex: 1,
              explanation: "La phase 1 doit être rigoureusement factuelle. Séparer ce que l'on sait avec certitude (les logs, le frame exact) de ce que l'on suppose est le fondement de toute méthode d'ingénierie sérieuse."
            },
            {
              id: 3,
              question: "Pourquoi est-il indispensable d'interdire au modèle de modifier les fichiers de code tant que la Phase 3 (Protocole de preuve) n'est pas franchie ?",
              options: [
                "Parce que modifier du code avant d'avoir prouvé l'hypothèse détruit l'état initial du système et empêche de reproduire le bug avec certitude.",
                "Parce que Git refuse les commits effectués par des intelligences artificielles.",
                "Parce que les licences logicielles Open Source l'interdisent formellement.",
                "Parce que cela désactive automatiquement l'antivirus du serveur."
              ],
              correctIndex: 0,
              explanation: "Modifier le code à l'aveugle altère l'environnement expérimental. Si le bug disparaît, on ne sait pas si la cause racine a été résolue ou simplement masquée par un effet de bord du nouveau code."
            },
            {
              id: 4,
              question: "Face à une fonction qui crashe car une variable vaut null, quelle est la démarche professionnelle attendue de l'ingénieur vis-à-vis de l'IA ?",
              options: [
                "Lui ordonner de remplacer null par une chaîne de caractères vide partout dans le projet.",
                "Lui demander d'identifier la chaîne d'appels amont ayant produit cette valeur null et d'émettre des hypothèses sur la nullabilité attendue du contrat d'interface.",
                "Supprimer la table dans MySQL et la recréer.",
                "Relancer le serveur en boucle jusqu'à ce que l'erreur disparaisse."
              ],
              correctIndex: 1,
              explanation: "Une variable nulle est souvent la conséquence logique d'un enregistrement absent ou d'un paramètre non transmis. Remonter la chaîne permet de traiter le cas métier (ex: renvoyer 404) plutôt que d'anesthésier le null."
            },
            {
              id: 5,
              question: "Comment un agent d'IDE comme Google Antigravity doit-il être configuré lors de la phase initiale de diagnostic ?",
              options: [
                "Avec des permissions complètes en écriture et déploiement direct sans confirmation.",
                "Avec des permissions en lecture seule (READ) et recherche (SEARCH) sur le code et les logs, avec interdiction stricte de modifier les fichiers sans validation explicite du plan d'investigation.",
                "En lui interdisant de lire les fichiers de code source.",
                "En le connectant directement aux comptes bancaires de l'entreprise."
              ],
              correctIndex: 1,
              explanation: "Le principe du moindre privilège impose d'ouvrir d'abord l'agent en mode enquêteur (lecture/recherche), afin qu'il produise son analyse sans risquer d'altérer le codebase avant accord de l'ingénieur."
            },
            {
              id: 6,
              question: "Qu'est-ce qu'un 'test rouge de reproduction' (Failing Test) conçu lors de la phase de preuve ?",
              options: [
                "Un test unitaire qui échoue de manière prévisible et reproductible en démontrant précisément l'existence du bug avant toute tentative de correction.",
                "Un test qui affiche du texte en rouge dans la console pour faire joli.",
                "Un test réservé aux utilisateurs ayant des privilèges administrateur root.",
                "Un test dont l'exécution prend plus de 24 heures."
              ],
              correctIndex: 0,
              explanation: "Le test rouge est le juge de paix : il échoue en présence du bug et réussit uniquement lorsque la vraie cause racine est corrigée, servant ensuite de test de non-régression permanent."
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Chapitre6Content;
