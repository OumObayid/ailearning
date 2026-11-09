'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type RaceDemoKey = 'search_input' | 'inventory_oversell' | 'double_click_payment' | 'promise_queue';

interface RaceScenario {
  title: string;
  domain: 'Frontend UI' | 'Backend API' | 'Sécurité & Paiement' | 'Architecture';
  badgeColor: string;
  problemCode: string;
  explanation: string;
  consequence: string;
  safeCode: string;
}

const RACE_SCENARIOS: Record<RaceDemoKey, RaceScenario> = {
  search_input: {
    title: '1. Recherche Frontend écrasée par une réponse obsolète',
    domain: 'Frontend UI',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    problemCode: `// L'utilisateur tape "ca", puis "café" dans la barre de recherche :
function onSearchChange(query) {
  // Requête 1 ("ca") part avec 800ms de latence serveur
  // Requête 2 ("café") part avec 200ms de latence serveur
  fetch("/api/search?q=" + query)
    .then(res => res.json())
    .then(data => {
      // 💥 Requête 2 arrive à 200ms -> affiche "café"
      // 💥 Requête 1 arrive à 800ms -> ÉCRASE l'écran avec "ca" !
      renderResults(data);
    });
}`,
    explanation: 'Le réseau Internet n\'offre aucune garantie de FIFO (First-In, First-Out). Une requête envoyée plus tôt peut être ralentie par un routage DNS ou une charge serveur et terminer après une requête envoyée plus tard.',
    consequence: 'L\'utilisateur tape "café", mais le composant affiche finalement les résultats de "ca", rendant l\'interface incompréhensible.',
    safeCode: `let currentController = null;

function onSearchChangeSafe(query) {
  // 1. Annuler la requête précédente si elle est encore en vol :
  if (currentController) {
    currentController.abort();
  }
  currentController = new AbortController();

  fetch("/api/search?q=" + query, { signal: currentController.signal })
    .then(res => res.json())
    .then(data => renderResults(data))
    .catch(err => {
      if (err.name === "AbortError") return; // Ignorer volontairement l'annulation
      console.error(err);
    });
}`
  },
  inventory_oversell: {
    title: '2. Sur-réservation de stock e-commerce (Check-Then-Act)',
    domain: 'Backend API',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    problemCode: `// Stock initial = 5 places. Deux clients commandent 4 places simultanément :
async function reserveTickets(userId, requestedSeats) {
  // ÉTAPE 1 (Check) : Lecture synchrone du stock
  const currentStock = await db.getStock(); // 5 places disponibles

  if (currentStock >= requestedSeats) { // 5 >= 4 -> VRAI pour Client 1 ET Client 2 !
    // ÉTAPE 2 (Latence) : Appel passerelle bancaire (prend 500ms)
    await paymentGateway.chargeUser(userId);

    // ÉTAPE 3 (Act) : Décrémentation séparée
    await db.setStock(currentStock - requestedSeats); // 5 - 4 = 1 pour les deux !
    // 💥 Résultat : 8 places vendues pour 5 réelles !
  }
}`,
    explanation: 'C\'est l\'anti-pattern classique "Tester-Puis-Agir" (Check-Then-Act). Pendant le temps de latence de l\'appel bancaire, l\'Event Loop cède la main à la deuxième requête qui lit la même valeur obsolète de stock.',
    consequence: 'Sur-réservation critique en base de données, litiges clients et rupture d\'inventaire.',
    safeCode: `async function reserveTicketsSafe(userId, requestedSeats) {
  // MISE À JOUR ATOMIQUE EN BASE DE DONNÉES :
  // Le contrôle et la décrémentation sont exécutés dans le même verrou de ligne SQL
  const result = await db.query(
    "UPDATE events SET stock = stock - ? WHERE id = ? AND stock >= ?",
    [requestedSeats, eventId, requestedSeats]
  );

  if (result.affectedRows === 0) {
    throw new Error("Stock épuisé : réservation refusée.");
  }

  // La place est garantie, nous pouvons prélever le paiement en toute sérénité :
  await paymentGateway.chargeUser(userId);
}`
  },
  double_click_payment: {
    title: '3. Double-débit bancaire par double-clic simultané',
    domain: 'Sécurité & Paiement',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    problemCode: `// Bouton sans désactivation immédiate ni clé d'idempotence :
async function handlePayClick() {
  const token = await stripe.createToken();
  // 💥 Si l'utilisateur clique 2 fois rapidement :
  // Deux requêtes POST partent en parallèle vers /api/checkout !
  await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ token, amount: 99 })
  });
}`,
    explanation: 'Un utilisateur impatient double-clique sur le bouton de paiement. Les deux requêtes HTTP voyagent simultanément vers le backend et créent deux débits bancaires distincts avant que l\'UI n\'ait pu réagir.',
    consequence: 'Double prélèvement sur la carte du client et frais de rétrofacturation bancaire.',
    safeCode: `// Utilisation d'une clé d'idempotence unique par intention d'achat :
const idempotencyKey = crypto.randomUUID();

async function handlePayClickSafe() {
  // Désactivation immédiate de l'interface graphique :
  payButton.disabled = true;

  await fetch("/api/checkout", {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey },
    body: JSON.stringify({ amount: 99 })
  });
}`
  },
  promise_queue: {
    title: '4. File de Promises en mémoire (Sequential Mutex Queue)',
    domain: 'Architecture',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    problemCode: `// Plusieurs requêtes asynchrones écrivent dans le même fichier local :
async function writeLog(entry) {
  const logs = await fs.readFile("audit.log", "utf8");
  // 💥 Deux requêtes lisent 'logs' en même temps et s'écrasent mutuellement !
  await fs.writeFile("audit.log", logs + "\\n" + entry);
}`,
    explanation: 'En Node.js mono-processus, plusieurs requêtes asynchrones en vol peuvent tenter de manipuler la même ressource partagée (fichier disque, tampon en RAM).',
    consequence: 'Lignes de journal perdues ou corruption pure et simple du fichier.',
    safeCode: `let writeQueue = Promise.resolve();

function writeLogSafe(entry) {
  // Chaque écriture s'enchaîne à la suite de la précédente dans la file :
  writeQueue = writeQueue.then(async () => {
    await fs.appendFile("audit.log", entry + "\\n", "utf8");
  }).catch(err => console.error("Erreur log:", err));

  return writeQueue;
}`
  }
};

export const Chapitre7Content: React.FC = () => {
  const [selectedDemoKey, setSelectedDemoKey] = useState<RaceDemoKey>('search_input');
  const activeScenario = RACE_SCENARIOS[selectedDemoKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Déboguer les Race Conditions et erreurs de synchronisation
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi une recherche d&apos;utilisateur affiche-t-elle subitement les résultats d&apos;une frappe antérieure ? Pourquoi un stock de 5 places se retrouve-t-il vendu à 8 personnes différentes sous forte affluence ? Comment un simple double-clic sur un bouton de paiement prélève-t-il deux fois la carte d&apos;un client ? Plongez dans l&apos;univers non déterministe des <strong>Race Conditions</strong> et découvrez les solutions d&apos;ingénierie : <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">AbortController</code>, verrous atomiques SQL et files de sérialisation.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le non-déterminisme de l&apos;ordre d&apos;arrivée réseau (l&apos;ordre de fin diffère de l&apos;ordre de départ).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Neutraliser les Race Conditions d&apos;interfaces graphiques frontend avec <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">AbortController</code>.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Éradiquer l&apos;anti-pattern serveur &quot;Check-Then-Act&quot; via des mises à jour atomiques conditionnelles SQL.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Sérialiser les opérations concurrentes locales avec une file de Promises (Sequential Mutex Queue) et clés d&apos;idempotence.</span>
          </div>
        </div>
      </section>

      {/* 2. Anatomie d'une Race Condition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Anatomie d&apos;une Race Condition : Le piège &quot;Check-Then-Act&quot;
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Une <strong>Race Condition</strong> (ou condition de concurrence) survient lorsque l&apos;état final d&apos;un système dépend de l&apos;ordre temporel imprévisible d&apos;exécution ou d&apos;arrivée d&apos;événements asynchrones concurrents accédant à une même ressource partagée.
        </p>

        {/* Métaphore pédagogique */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 text-sm text-slate-900 space-y-2">
          <div className="flex items-center gap-2 font-black text-rose-900 uppercase text-xs tracking-wider">
            <Icon name="alert" className="w-4 h-4 text-rose-600" />
            <span>Métaphore du dernier siège d&apos;avion disponible</span>
          </div>
          <p className="leading-relaxed text-slate-800">
            Imaginez deux voyageurs, Alice et Bob, connectés en même temps sur un site de réservation. Il ne reste qu&apos;<strong>un seul siège</strong> dans l&apos;avion.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
            <li><strong>t = 0ms :</strong> Alice vérifie : <em>&quot;Le siège est libre !&quot;</em>. Elle est redirigée vers la page de saisie de carte bancaire.</li>
            <li><strong>t = 50ms :</strong> Bob vérifie à son tour : <em>&quot;Le siège est libre !&quot;</em> (la réservation d&apos;Alice n&apos;est pas encore validée).</li>
            <li><strong>t = 200ms :</strong> Bob saisit ses coordonnées bancaires très vite et valide son achat. Le siège lui est attribué.</li>
            <li><strong>t = 300ms :</strong> Alice valide son paiement. Le système décrémente aveuglément le stock. <strong>Catastrophe : le même siège a été vendu deux fois !</strong></li>
          </ul>
        </div>

        {/* Pourquoi JavaScript est vulnérable malgré son single-thread */}
        <Callout type="warning" title="JavaScript est mono-thread, mais hautement asynchrone !">
          <p className="text-sm leading-relaxed">
            Beaucoup de développeurs croient à tort que l&apos;exécution mono-thread de JavaScript (un seul appel en cours sur la Call Stack à la fois) protège contre les Race Conditions. C&apos;est faux ! <strong>Dès que votre code contient un mot-clé <code className="font-mono font-bold">await</code></strong>, l&apos;Event Loop suspend votre fonction et peut exécuter 50 autres requêtes concurrentes entre votre ligne de vérification (Check) et votre ligne d&apos;écriture (Act) !
          </p>
        </Callout>
      </section>

      {/* 3. Les deux grands théâtres d'affrontement : Frontend vs Backend */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les deux grands théâtres d&apos;affrontement : Frontend vs Backend
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Frontend */}
          <div className="p-5 rounded-2xl border-2 border-sky-200 bg-sky-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-sky-800 uppercase px-2 py-0.5 rounded bg-sky-200">Front-End</span>
              <span className="text-xs text-sky-700 font-bold">Désynchronisation UI</span>
            </div>
            <h3 className="font-black text-sky-950 text-base">Recherche &amp; Pagination désordonnées</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              L&apos;utilisateur tape rapidement dans un champ ou clique sur des onglets. Une requête antérieure lente répond après une requête postérieure rapide, écrasant l&apos;affichage avec des données périmées.
            </p>
            <div className="pt-2 border-t border-sky-200 font-mono text-xs text-emerald-800 font-bold">
              Solution : <code className="bg-white px-1.5 py-0.5 rounded border border-sky-300">AbortController.abort()</code>
            </div>
          </div>

          {/* Backend */}
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-rose-800 uppercase px-2 py-0.5 rounded bg-rose-200">Back-End</span>
              <span className="text-xs text-rose-700 font-bold">Corruption de Données</span>
            </div>
            <h3 className="font-black text-rose-950 text-base">Double dépense &amp; Rupture de stock</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Deux requêtes concurrentes lisent le même solde bancaire ou stock en base, attendent l&apos;accord de la passerelle de paiement, puis décrémentent le stock, autorisant plus de dépenses que le montant autorisé.
            </p>
            <div className="pt-2 border-t border-rose-200 font-mono text-xs text-emerald-800 font-bold">
              Solution : <code className="bg-white px-1.5 py-0.5 rounded border border-rose-300">Mise à jour conditionnelle atomique SQL</code>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Simulateur Interactif : Laboratoire de Race Conditions */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5 text-lime-700" />
              <span>4. Laboratoire Interactif : Diagnostic des Conditions de Concurrence</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sélectionnez un scénario de concurrence réelle pour visualiser la chronologie du bogue et son correctif d&apos;ingénierie.
            </p>
          </div>
        </div>

        {/* Boutons sélecteurs de scénarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {(Object.keys(RACE_SCENARIOS) as RaceDemoKey[]).map((key) => {
            const scenario = RACE_SCENARIOS[key];
            const isSelected = selectedDemoKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDemoKey(key)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-lime-300 border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border inline-block mb-1 ${scenario.badgeColor}`}>
                  {scenario.domain}
                </span>
                <div className="text-xs font-mono font-bold truncate">{scenario.title}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'inspection en direct */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Scénario actif :</span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activeScenario.title}
              </h3>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${activeScenario.badgeColor}`}>
              Domaine : {activeScenario.domain}
            </span>
          </div>

          {/* Grille Code Vulnérable vs Explication */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Code vulnérable à la concurrence :
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-rose-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {activeScenario.problemCode}
              </pre>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                  Mécanisme de la désynchronisation :
                </span>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  {activeScenario.explanation}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block font-sans">
                  Conséquence critique constatée :
                </span>
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-200 font-sans">
                  {activeScenario.consequence}
                </div>
              </div>
            </div>
          </div>

          {/* Solution robuste */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Icon name="check" className="w-4 h-4 text-emerald-400" />
              <span>Solution robuste d&apos;ingénierie :</span>
            </div>
            <pre className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/80 font-mono text-xs text-emerald-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {activeScenario.safeCode}
            </pre>
          </div>
        </div>
      </section>

      {/* 5. Travaux Pratiques : Système de Billetterie Concurrent */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            5. Travaux Pratiques — Audit et refactorisation d&apos;une billetterie concurrente
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Le module ci-dessous gère les réservations de places de concert. Lors de l&apos;ouverture des ventes à midi, des milliers d&apos;utilisateurs cliquent simultanément sur le bouton de réservation. En production, pour un concert de 500 places, <strong>740 billets ont été émis et confirmés</strong>, provoquant un scandale à l&apos;entrée de la salle.
        </p>

        {/* Code source bogué */}
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase text-rose-700 flex items-center gap-2">
            <Icon name="alert" className="w-4 h-4 text-rose-600" />
            <span>Code source défaillant (Check-Then-Act non synchronisé)</span>
          </h3>
          <CodeBlock
            language="javascript"
            filename="buggy-ticket-service.js"
            code={`// STOCK INITIAL EN MÉMOIRE PARTAGÉE :
let availableSeats = 500;

async function bookTickets(userId, requestedCount) {
  // 1. VÉRIFICATION SÉPARÉE :
  if (availableSeats >= requestedCount) {
    // 2. TEMPS DE LATENCE ASYNCHRONE (Vérification carte bancaire 300ms) :
    await paymentGateway.verifyFunds(userId);

    // 💥 PENDANT CES 300ms, DES CENTAINES DE REQUÊTES EN VOL SONT ENTRÉES DANS LE IF !
    availableSeats = availableSeats - requestedCount;
    
    return { success: true, remaining: availableSeats };
  }

  return { success: false, reason: "Complet" };
}`}
          />
        </div>

        {/* Code source refactorisé */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Solution d&apos;ingénierie avec file d&apos;attente séquentielle (Mutex Queue)</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="safe-ticket-service.ts"
            code={`interface BookingResult {
  success: boolean;
  userId: string;
  seatsBooked: number;
  remainingSeats: number;
  reason?: string;
}

// État protégé encapsulé
let currentAvailableSeats = 500;

// File de Promises partagée formant un verrou d'exclusion mutuelle (Mutex Queue)
let bookingQueue: Promise<void> = Promise.resolve();

export function bookTicketsThreadSafe(userId: string, requestedCount: number): Promise<BookingResult> {
  // On chaîne chaque nouvelle demande à la suite de la file existante
  const operation = bookingQueue.then(async () => {
    // SECTION CRITIQUE SÉRIALISÉE : Une seule réservation s'exécute à la fois ici !
    if (currentAvailableSeats < requestedCount) {
      return {
        success: false,
        userId,
        seatsBooked: 0,
        remainingSeats: currentAvailableSeats,
        reason: "Stock insuffisant au moment du traitement."
      };
    }

    // Décrémentation immédiate atomique de la réservation :
    currentAvailableSeats -= requestedCount;

    try {
      // Débit bancaire sécurisé
      await paymentGateway.verifyFunds(userId);
      return {
        success: true,
        userId,
        seatsBooked: requestedCount,
        remainingSeats: currentAvailableSeats
      };
    } catch (paymentError) {
      // En cas de refus bancaire : restitution immédiate des places dans le stock !
      currentAvailableSeats += requestedCount;
      throw paymentError;
    }
  });

  // On maintient la file vivante même si une opération échoue
  bookingQueue = operation.then(() => {}, () => {});

  return operation;
}`}
          />
        </div>
      </section>

      {/* 6. Synthèse : La Check-list Anti-Race-Condition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Synthèse : Les 4 Règles d&apos;Or de Synchronisation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : AbortController pour toute UI dynamique</span>
            <p className="text-xs text-slate-700">Pour tout champ de saisie asynchrone (recherche, autocomplétion, filtres), annulez immédiatement la requête précédente avant de déclencher la nouvelle.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : Éradiquer le Check-Then-Act</span>
            <p className="text-xs text-slate-700">Ne faites jamais de <code className="font-mono">if (stock &gt;= qty) await ... stock -= qty</code>. Utilisez une requête atomique en base avec clause conditionnelle <code className="font-mono">WHERE stock &gt;= qty</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : Clés d&apos;Idempotence pour les paiements</span>
            <p className="text-xs text-slate-700">Générez un UUID unique côté client pour chaque intention d&apos;achat et transmettez-le dans le header <code className="font-mono">Idempotency-Key</code> pour interdire tout double prélèvement.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : Sérialiser avec une Promise Queue</span>
            <p className="text-xs text-slate-700">Pour coordonner l&apos;accès à une ressource locale partagée en mémoire, chaînez vos opérations sur une Promise racine pour garantir une exécution strictement séquentielle.</p>
          </div>
        </div>
      </section>

      {/* 7. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          7. Quiz de validation — Chapitre 3.7
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'une Race Condition (condition de concurrence) en programmation ?",
              options: [
                "Une erreur où le processeur surchauffe",
                "Une anomalie où l'état final d'un système dépend de l'ordre d'arrivée temporel imprévisible d'opérations asynchrones concurrentes",
                "Un dépassement de pile dans la Call Stack",
                "Une syntaxe dépréciée dans ES6"
              ],
              correctIndex: 1,
              explanation: "Une Race Condition survient lorsque plusieurs processus ou requêtes lisent et écrivent sur une même ressource partagée sans synchronisation mutuelle stricte."
            },
            {
              id: 2,
              question: "Pourquoi JavaScript est-il vulnérable aux Race Conditions alors qu'il est mono-thread ?",
              options: [
                "C'est faux, le mono-thread empêche toute Race Condition",
                "Dès qu'un mot-clé await est rencontré, la fonction est suspendue et l'Event Loop intercale d'autres requêtes qui peuvent modifier les données partagées",
                "Parce que le navigateur crée un thread par onglet",
                "Parce que la mémoire RAM est partagée avec le système d'exploitation"
              ],
              correctIndex: 1,
              explanation: "Bien que le code synchrone s'exécute sur un seul thread, les pauses asynchrones induites par await permettent à d'autres requêtes d'altérer l'état entre la phase de vérification et la phase d'écriture."
            },
            {
              id: 3,
              question: "Comment empêcher une réponse HTTP lente d'écraser une réponse rapide plus récente dans une barre de recherche frontend ?",
              options: [
                "En ajoutant un sleep(1000)",
                "En utilisant l'API standard AbortController pour annuler la requête précédente dès qu'une nouvelle saisie commence",
                "En supprimant les balises input",
                "En utilisant JSON.stringify"
              ],
              correctIndex: 1,
              explanation: "AbortController permet d'annuler les requêtes en vol avec fetch(). Dès que l'utilisateur tape un nouveau caractère, la requête précédente est abortée et ne peut plus écraser l'UI."
            },
            {
              id: 4,
              question: "Quel est le risque majeur du patron 'Check-Then-Act' (Tester puis agir) sur un stock de produits ?",
              options: [
                "Une fuite de mémoire",
                "Deux requêtes concurrentes lisent la même disponibilité avant qu'aucune n'ait décrémenté, provoquant une sur-vente (overselling)",
                "Une conversion automatique en chaîne de caractères",
                "Le blocage du Garbage Collector"
              ],
              correctIndex: 1,
              explanation: "Si deux clients lisent le stock au même moment (Check), les deux conditions sont validées. Ils décrémentent ensuite séparément (Act), vendant plus d'articles qu'il n'en existe en réalité."
            },
            {
              id: 5,
              question: "Comment garantir au niveau d'une base de données SQL qu'un stock ne devienne jamais négatif sous forte charge ?",
              options: [
                "En augmentant la taille de la RAM",
                "En effectuant une mise à jour conditionnelle atomique : UPDATE products SET stock = stock - qty WHERE id = 1 AND stock >= qty",
                "En désactivant les index de la table",
                "En utilisant console.time()"
              ],
              correctIndex: 1,
              explanation: "La mise à jour conditionnelle atomique confie le verrou de ligne au moteur SQL. Si stock < qty, aucune ligne n'est affectée (affectedRows === 0), rejetant la vente de façon infaillible."
            },
            {
              id: 6,
              question: "Qu'est-ce qu'une clé d'idempotence (Idempotency Key) dans une API de paiement ?",
              options: [
                "Un mot de passe administrateur",
                "Un identifiant unique généré par le client pour garantir qu'une même transaction exécutée plusieurs fois n'est débitée qu'une seule fois",
                "Une clé de chiffrement SSL",
                "Un cookie de session de 24 heures"
              ],
              correctIndex: 1,
              explanation: "L'idempotence garantit qu'appeler une opération plusieurs fois produit exactement le même effet qu'un appel unique. En cas de double-clic, le serveur détecte la même clé et refuse le double prélèvement."
            }
          ]}
        />
      </section>
    </div>
  );
};
