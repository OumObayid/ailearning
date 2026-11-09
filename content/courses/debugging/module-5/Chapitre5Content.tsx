'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type ConcurrencyMode = 'naive_race' | 'atomic_update' | 'pessimistic_lock' | 'deadlock_cycle';

interface ConcurrencyScenario {
  title: string;
  badge: string;
  badgeColor: string;
  initialStock: number;
  concurrentRequests: number;
  finalStock: number;
  successOrders: number;
  rejectedOrders: number;
  oversellingDetected: boolean;
  deadlockTriggered: boolean;
  statusText: string;
  explanation: string;
  codeSnippet: string;
}

const CONCURRENCY_SCENARIOS: Record<ConcurrencyMode, ConcurrencyScenario> = {
  naive_race: {
    title: '1. Approche Naïve : Check-Then-Act (Anti-Pattern TOCTOU)',
    badge: 'Survente Critique (-9)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    initialStock: 1,
    concurrentRequests: 10,
    finalStock: -9,
    successOrders: 10,
    rejectedOrders: 0,
    oversellingDetected: true,
    deadlockTriggered: false,
    statusText: 'CATASTROPHE : 10 clients ont payé pour 1 seul article physique en stock !',
    explanation: 'Le code lit `stock = 1` en BDD pour les 10 requêtes simultanées AVANT qu\'aucune d\'entre elles n\'ait eu le temps d\'exécuter l\'UPDATE. Le contrôle `if (stock > 0)` réussit pour tout le monde en mémoire JavaScript.',
    codeSnippet: `// ❌ CODE VULNÉRABLE (Check-Then-Act)
app.post('/api/buy', async (req, res) => {
  const [rows] = await db.query('SELECT stock FROM products WHERE id = 1');
  if (rows[0].stock > 0) {
    // ⚠️ FENÊTRE DE VULNÉRABILITÉ : Pendant le paiement asynchrone,
    // 9 autres requêtes lisent aussi stock = 1 !
    await chargeCreditCard(req.body.userId);
    await db.query('UPDATE products SET stock = stock - 1 WHERE id = 1');
    return res.json({ success: true, message: 'Commande validée' });
  }
  res.status(409).json({ error: 'Rupture de stock' });
});`,
  },
  atomic_update: {
    title: '2. Solution Idéale : Mise à Jour Atomique Conditionnelle',
    badge: 'Atomique & Robuste',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    initialStock: 1,
    concurrentRequests: 10,
    finalStock: 0,
    successOrders: 1,
    rejectedOrders: 9,
    oversellingDetected: false,
    deadlockTriggered: false,
    statusText: 'SUCCÈS : 1 seule commande honorée, 9 rejets propres (409 Conflict).',
    explanation: 'La vérification et la décrémentation sont fusionnées dans une seule instruction SQL atomique exécutée sous verrou de ligne InnoDB. MySQL garantit que seules les requêtes respectant `stock >= 1` incrémentent `affectedRows`.',
    codeSnippet: `// ✅ SOLUTION 1 : UPDATE Atomique avec condition stricte
app.post('/api/buy', async (req, res) => {
  // L'UPDATE décrémente UNIQUEMENT si le stock est strictement supérieur à 0
  const [result] = await db.query(
    'UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0',
    [productId]
  );

  // Si affectedRows === 0, cela signifie qu'un concurrent a pris le dernier article
  if (result.affectedRows === 0) {
    return res.status(409).json({ error: 'Rupture de stock immédiate' });
  }

  await chargeCreditCard(req.body.userId);
  res.json({ success: true, message: 'Article réservé avec succès' });
});`,
  },
  pessimistic_lock: {
    title: '3. Verrouillage Pessimiste : Transaction avec SELECT FOR UPDATE',
    badge: 'Verrou Exclusif (Row-Level)',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    initialStock: 1,
    concurrentRequests: 10,
    finalStock: 0,
    successOrders: 1,
    rejectedOrders: 9,
    oversellingDetected: false,
    deadlockTriggered: false,
    statusText: 'SÉCURISÉ : Les transactions concurrentes font la queue sur la ligne verrouillée.',
    explanation: '`SELECT ... FOR UPDATE` place un verrou exclusif en écriture (X-Lock) sur la ligne ciblée. Les 9 autres transactions sont suspendues par InnoDB. Dès que la 1ère commit, la 2ème lit `stock = 0` et rollback immédiatement.',
    codeSnippet: `// ✅ SOLUTION 2 : Verrouillage Pessimiste ACID
const connection = await pool.getConnection();
try {
  await connection.beginTransaction();

  // Verrouille la ligne : personne d'autre ne peut lire ou écrire cette ligne
  const [rows] = await connection.query(
    'SELECT stock FROM products WHERE id = ? FOR UPDATE',
    [productId]
  );

  if (rows[0].stock < 1) {
    await connection.rollback();
    return res.status(409).json({ error: 'Rupture de stock' });
  }

  await connection.query(
    'UPDATE products SET stock = stock - 1 WHERE id = ?',
    [productId]
  );
  await connection.commit();
  res.json({ success: true });
} catch (err) {
  await connection.rollback();
  throw err;
} finally {
  connection.release();
}`,
  },
  deadlock_cycle: {
    title: '4. Interblocage Cyclique : Deadlock MySQL (Erreur 1213)',
    badge: 'Deadlock Détecté (Rollback 1213)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    initialStock: 1,
    concurrentRequests: 2,
    finalStock: 1,
    successOrders: 1,
    rejectedOrders: 1,
    oversellingDetected: false,
    deadlockTriggered: true,
    statusText: 'DEADLOCK : Tx1 verrouille A puis veut B. Tx2 verrouille B puis veut A. InnoDB sacrifie Tx2.',
    explanation: 'Deux transactions imbriquées tentent de verrouiller deux lignes dans un ordre inversé. InnoDB détecte le cycle d\'attente mortel via son graphe de dépendance et tue automatiquement la transaction la moins coûteuse.',
    codeSnippet: `// ❌ ORDRE INVERSÉ QUI DÉCLENCHE UN DEADLOCK :
// Transaction 1 (Virement de Alice -> Bob) :
await tx1.query('SELECT * FROM accounts WHERE id = 1 FOR UPDATE'); // Lock Alice
await tx1.query('SELECT * FROM accounts WHERE id = 2 FOR UPDATE'); // Attente Lock Bob...

// Transaction 2 (Simultanée : Virement de Bob -> Alice) :
await tx2.query('SELECT * FROM accounts WHERE id = 2 FOR UPDATE'); // Lock Bob
await tx2.query('SELECT * FROM accounts WHERE id = 1 FOR UPDATE'); // Attente Lock Alice...
// 💥 BOOM : ER_LOCK_DEADLOCK: Deadlock found when trying to get lock; try restarting transaction`,
  },
};

export const Chapitre5Content: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ConcurrencyMode>('naive_race');
  const scenario = CONCURRENCY_SCENARIOS[activeMode];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="activity" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Détecter les Problèmes de Concurrence : Race Conditions & Deadlocks
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Pourquoi Node.js subit des conditions de course malgré son thread unique, comment neutraliser les surventes avec les écritures atomiques, maîtriser les transactions <code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">SELECT FOR UPDATE</code> et résoudre les deadlocks InnoDB.
        </p>
      </div>

      {/* Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Comprendre le piège du faux sentiment de sécurité lié au modèle monothread de Node.js.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Identifier les failles TOCTOU (Time of Check to Time of Use) et les écritures perdues (Lost Updates).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Appliquer les 3 boucliers : UPDATE atomique conditionnel, verrous pessimistes et verrous optimistes.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Diagnostiquer et prévenir les Deadlocks BDD (InnoDB Lock Graph, ordre canonique des verrous).</span>
          </div>
        </div>
      </section>

      {/* 1. Le Paradoxe de la Concurrence dans Node.js */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="shuffle" className="w-5 h-5 text-indigo-600" />
          1. Le Mythe du Monothread : Pourquoi Node.js subit des Race Conditions
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Une idée reçue très répandue chez les développeurs débutants affirme que <em>&quot;Node.js étant monothread, il est impossible d&apos;avoir des Race Conditions&quot;</em>. C&apos;est une erreur critique !
        </p>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Si deux blocs de code synchrone ne peuvent effectivement pas s&apos;exécuter en même temps sur le thread V8, toute instruction <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">await</code> <strong>interrompt la fonction</strong> et rend la main à l&apos;Event Loop. 
          Pendant que la première requête attend le retour du réseau ou de la base de données, <strong>des dizaines d&apos;autres requêtes s&apos;exécutent et modifient l&apos;état sous-jacent</strong> !
        </p>

        {/* Figure 5.5 - Preserving image7.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image7.jpeg"
              alt="Diagramme séquentiel de Race Condition entre deux clients simultanés achetant le dernier produit en stock (Figure 6.5)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 5.5 — Déroulement d&apos;une Condition de Course (Race Condition) : Deux lectures simultanées de stock = 1 entraînent une survente.
          </div>
        </div>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Étape</th>
                <th className="px-4 py-3">Requête Client A (Alice)</th>
                <th className="px-4 py-3">Requête Client B (Bob)</th>
                <th className="px-4 py-3">Stock réel en BDD</th>
                <th className="px-4 py-3">Conséquence métier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono">T1</td>
                <td className="px-4 py-2.5 font-medium text-indigo-700 font-semibold">Lit le stock : 1 unité</td>
                <td className="px-4 py-2.5 text-slate-400 font-mono">-</td>
                <td className="px-4 py-2.5 font-bold font-mono">1</td>
                <td className="px-4 py-2.5 text-slate-600">Alice passe le test : stock &gt; 0</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono">T2</td>
                <td className="px-4 py-2.5 text-slate-400 font-mono">Attente réponse Stripe (await)</td>
                <td className="px-4 py-2.5 font-medium text-amber-700 font-semibold">Lit le stock : 1 unité</td>
                <td className="px-4 py-2.5 font-bold font-mono">1</td>
                <td className="px-4 py-2.5 text-slate-600">Bob lit l&apos;ancienne valeur non modifiée !</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono">T3</td>
                <td className="px-4 py-2.5 font-medium text-indigo-700 font-semibold">Décrémente : stock = 0</td>
                <td className="px-4 py-2.5 text-slate-400 font-mono">Paiement en cours...</td>
                <td className="px-4 py-2.5 font-bold font-mono text-emerald-600">0</td>
                <td className="px-4 py-2.5 text-slate-600">Commande Alice validée</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono">T4</td>
                <td className="px-4 py-2.5 text-slate-400 font-mono">-</td>
                <td className="px-4 py-2.5 font-medium text-amber-700 font-semibold">Décrémente : stock = -1</td>
                <td className="px-4 py-2.5 font-bold font-mono text-rose-600">-1</td>
                <td className="px-4 py-2.5 text-rose-700 font-bold">Survente ! 2 paiements encaissés pour 1 seul article physique</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Les 3 Stratégies de Protection */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="shield" className="w-5 h-5 text-emerald-600" />
          2. Les 3 Armes d&apos;Ingénierie contre les Race Conditions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 shadow-xs space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Arme 1 : Atomique
            </span>
            <h3 className="text-sm font-bold text-slate-900">UPDATE Conditionnel</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              La solution la plus rapide et sans état. On déporte la condition au niveau de la requête SQL : <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-xs">UPDATE ... WHERE stock &gt; 0</code>. Si <code className="font-mono text-xs">affectedRows === 0</code>, l&apos;opération a échoué.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 shadow-xs space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
              Arme 2 : Pessimiste
            </span>
            <h3 className="text-sm font-bold text-slate-900">SELECT ... FOR UPDATE</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Indispensable lorsque l&apos;opération nécessite de lire plusieurs tables liées ou d&apos;exécuter un calcul complexe. InnoDB pose un verrou exclusif sur la ligne jusqu&apos;au <code className="font-mono text-xs">COMMIT</code> ou <code className="font-mono text-xs">ROLLBACK</code>.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 shadow-xs space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
              Arme 3 : Optimiste
            </span>
            <h3 className="text-sm font-bold text-slate-900">Numéro de Version</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Idéal pour les applications à forte lecture. La table possède une colonne <code className="font-mono text-xs">version INT</code>. Lors de l&apos;UPDATE, on filtre par <code className="font-mono text-xs">WHERE version = v</code> et on incrémente. Si un concurrent a modifié la ligne entre-temps, la requête échoue et l&apos;application rejoue.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deadlocks : Anatomie de l'Interblocage */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="lock" className="w-5 h-5 text-rose-600" />
          3. Déboguer les Deadlocks MySQL (Erreur ER_LOCK_DEADLOCK 1213)
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Un <strong>Deadlock</strong> (ou étreinte fatale) survient lorsque deux transactions détiennent chacune un verrou sur une ressource et attendent mutuellement que l&apos;autre libère la seconde ressource. 
          Aucune ne pouvant progresser, elles resteraient figées indéfiniment si le moteur de stockage n&apos;intervenait pas.
        </p>

        <CodeBlock
          code={`-- Pour inspecter le dernier Deadlock survenu sur votre serveur MySQL :
SHOW ENGINE INNODB STATUS;

-- Cherchez la section "LATEST DETECTED DEADLOCK" dans la sortie :
-- *** (1) TRANSACTION:
-- TRANSACTION 48291, ACTIVE 0 sec starting index read
-- mysql tables in use 1, locked 1
-- LOCK WAIT 2 lock struct(s), heap size 1128, 1 row lock(s)
-- RECORD LOCKS space id 42 page no 3 n bits 72 index PRIMARY of table orders
-- 
-- *** (2) TRANSACTION:
-- TRANSACTION 48292, ACTIVE 0 sec updating or deleting
-- ...
-- *** WE ROLL BACK TRANSACTION (2)`}
          language="sql"
        />

        <Callout type="warning" title="Règle d'or pour éradiquer 100% des Deadlocks">
          <p className="text-xs sm:text-sm">
            Les deadlocks sont mathématiquement impossibles si <strong>toutes les transactions de votre code accèdent aux ressources dans le même ordre déterministe</strong>. 
            Par exemple, lors d&apos;un transfert entre deux comptes, verrouillez toujours en premier le compte dont l&apos;identifiant est le plus petit :
            <br />
            <code className="font-mono text-xs font-bold text-slate-900">
              const [firstId, secondId] = [fromId, toId].sort((a, b) =&gt; a - b);
            </code>
          </p>
        </Callout>
      </section>

      {/* 4. Simulateur Interactif : ConcurrencySimulatorLab */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          4. Simulateur Interactif : Laboratoire de Concurrence & Verrous
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Testez le comportement de 10 requêtes simultanées tentant d&apos;acheter le tout dernier article en stock (<code className="font-mono font-bold">Stock initial = 1</code>) selon différentes architectures logicielles :
        </p>

        {/* Boutons sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(CONCURRENCY_SCENARIOS) as ConcurrencyMode[]).map((mode) => {
            const sc = CONCURRENCY_SCENARIOS[mode];
            const isSelected = activeMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setActiveMode(mode)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-lime-500 bg-lime-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${sc.badgeColor} inline-block mb-1`}>
                    {sc.badge}
                  </span>
                  <div className="text-xs font-bold text-slate-950 leading-tight">
                    {sc.title.split(':')[0]}
                  </div>
                </div>
                <div className="mt-2 text-[11px] font-mono text-slate-600">
                  Stock fin : {sc.finalStock} | Succès : {sc.successOrders}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tableau de bord de télémétrie */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scénario de Concurrence</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{scenario.title}</h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${scenario.badgeColor}`}>
              {scenario.oversellingDetected ? 'SURVENTE DÉTECTÉE' : scenario.deadlockTriggered ? 'DEADLOCK INNODB' : 'INTÉGRITÉ PRÉSERVÉE'}
            </span>
          </div>

          {/* Jauges d'état */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Stock Initial</div>
              <div className="text-lg sm:text-xl font-mono font-black text-slate-900">
                {scenario.initialStock} unité
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">{scenario.concurrentRequests} req simultanées</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Commandes Honorées</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${scenario.successOrders > scenario.initialStock ? 'text-rose-600' : 'text-emerald-600'}`}>
                {scenario.successOrders} validée{scenario.successOrders > 1 ? 's' : ''}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Rejets : {scenario.rejectedOrders}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Stock Final Réel</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${scenario.finalStock < 0 ? 'text-rose-600 font-black' : 'text-slate-900'}`}>
                {scenario.finalStock}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">{scenario.finalStock < 0 ? 'Déficit stock !' : 'Zéro anomalie'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Résultat Métier</div>
              <div className={`text-xs sm:text-sm font-black mt-2 ${scenario.oversellingDetected ? 'text-rose-600' : 'text-emerald-600'}`}>
                {scenario.oversellingDetected ? 'DÉSASTRE FINANCIER' : 'PARFAIT'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1">
            <div className="font-bold text-slate-900">Constat : {scenario.statusText}</div>
            <div className="text-slate-700">{scenario.explanation}</div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Icon name="code" className="w-3.5 h-3.5 text-indigo-600" />
              <span>Implémentation technique :</span>
            </div>
            <CodeBlock code={scenario.codeSnippet} language="typescript" />
          </div>
        </div>
      </section>

      {/* 5. Cas Réel Entreprise : Vente Flash chez TicketingPro */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          5. Étude de Cas Réelle : Le Scandale des Billets de Concert chez TicketingPro
        </h2>
        <div className="border-2 border-rose-200 bg-rose-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-1 rounded-md">
              Incident Production Critique
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Survente de 3 400 places</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>L&apos;Événement :</strong> Mise en vente de 10 000 places pour un festival international. En 4 secondes, l&apos;API Express a validé et encaissé <strong>13 400 billets</strong> pour une salle ne pouvant accueillir que 10 000 spectateurs.
            </p>
            <p>
              <strong>La Cause Racine :</strong> Le contrôleur utilisait une variable mémoire locale pour mettre en cache le stock et faisait un simple <code className="bg-slate-800 text-slate-100 px-1 py-0.5 rounded font-mono text-xs">if (cachedStock &gt; 0)</code>. L&apos;application tournait sur 8 conteneurs Docker derrière un load balancer : chaque conteneur avait sa propre variable locale désynchronisée !
            </p>
            <p>
              <strong>La Solution Adoptée :</strong> Abandon des variables locales au profit d&apos;un script Lua atomique sur Redis (<code className="font-mono text-emerald-800 font-bold">redis.call(&apos;DECRBY&apos;, key, qty)</code>) combiné à un <code className="font-mono text-emerald-800 font-bold">UPDATE products SET stock = stock - 1 WHERE id = ? AND stock &gt; 0</code> en BDD. Coût du dédommagement des 3 400 spectateurs refoulés : 240 000 €.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Concurrence & Deadlocks (Chapitre 5.5)"
          questions={[
            {
              id: 1,
              question: "Pourquoi une application Node.js peut-elle subir des Race Conditions alors que JavaScript s'exécute sur un seul thread ?",
              options: [
                "Parce que le compilateur V8 génère du code assembleur multithread sans prévenir le développeur.",
                "Parce que l'exécution des fonctions asynchrones est suspendue à chaque mot-clé 'await', permettant à d'autres requêtes concurrentes de s'intercaler et de modifier l'état partagé.",
                "Parce que la mémoire RAM des serveurs Linux est partagée avec d'autres machines virtuelles.",
                "Parce qu'Express exécute chaque middleware dans un conteneur Docker séparé."
              ],
              correctIndex: 1,
              explanation: "Le modèle monothread garantit uniquement que deux blocs synchrones ne s'exécutent pas simultanément. Dès qu'un 'await' intervient (attente réseau, I/O), le thread principal traite d'autres requêtes entrantes qui peuvent altérer les mêmes données.",
            },
            {
              id: 2,
              question: "Quelle requête SQL permet d'éviter avec certitude une survente sans avoir besoin d'ouvrir une transaction complexe ?",
              options: [
                "SELECT stock FROM products WHERE id = 1;",
                "UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock > 0;",
                "ALTER TABLE products DISABLE KEYS;",
                "INSERT INTO products (stock) VALUES (0);"
              ],
              correctIndex: 1,
              explanation: "Cette instruction est atomique : MySQL vérifie la condition 'stock > 0' et effectue la décrémentation sous le même verrou interne de ligne. Si affectedRows vaut 0, le stock était déjà épuisé.",
            },
            {
              id: 3,
              question: "À quoi sert la clause 'SELECT ... FOR UPDATE' au sein d'une transaction InnoDB ?",
              options: [
                "À effacer définitivement les lignes sélectionnées.",
                "À poser un verrou exclusif en écriture (X-Lock) sur les lignes sélectionnées, forçant les autres transactions à attendre la fin du commit pour y accéder.",
                "À exporter la table au format CSV pour Excel.",
                "À accélérer la vitesse de lecture en désactivant le cache."
              ],
              correctIndex: 1,
              explanation: "'FOR UPDATE' verrouille immédiatement les lignes pour empêcher toute autre transaction concurrente de les lire avec un verrou ou de les modifier jusqu'à ce que la transaction courante soit validée ou annulée.",
            },
            {
              id: 4,
              question: "Comment se manifeste un Deadlock dans une application Node.js utilisant le driver mysql2 ?",
              options: [
                "Le serveur Node.js plante instantanément avec un Kernel Panic.",
                "MySQL rejette l'une des requêtes avec l'erreur ER_LOCK_DEADLOCK (code 1213) : 'Deadlock found when trying to get lock; try restarting transaction'.",
                "Toutes les données de la base sont réinitialisées à zéro.",
                "La requête HTTP renvoie un code 200 OK mais sans données."
              ],
              correctIndex: 1,
              explanation: "InnoDB détecte le cycle d'attente circulaire entre transactions et en annule automatiquement une en levant l'erreur MySQL 1213 (ER_LOCK_DEADLOCK). L'application doit alors intercepter l'erreur et retenter l'opération.",
            },
            {
              id: 5,
              question: "Quelle commande MySQL permet d'inspecter l'historique et la cause exacte du dernier Deadlock intervenu sur le serveur ?",
              options: [
                "SHOW PROCESSLIST;",
                "SHOW ENGINE INNODB STATUS;",
                "SELECT * FROM deadlocks;",
                "EXPLAIN ANALYZE ALL;"
              ],
              correctIndex: 1,
              explanation: "La commande 'SHOW ENGINE INNODB STATUS' affiche un rapport interne complet de l'état du moteur InnoDB, incluant la section 'LATEST DETECTED DEADLOCK' avec les requêtes SQL et les verrous impliqués.",
            },
            {
              id: 6,
              question: "Quelle méthode préventive garantit qu'un Deadlock ne se produira JAMAIS lors de transferts d'argent entre deux comptes A et B ?",
              options: [
                "Désactiver toutes les transactions dans l'application.",
                "Trier systématiquement les identifiants de comptes par ordre croissant avant de poser les verrous afin de verrouiller toujours dans le même ordre.",
                "Augmenter la mémoire vive du serveur MySQL à 128 Go.",
                "Utiliser setTimeout() de 5 secondes entre chaque virement."
              ],
              correctIndex: 1,
              explanation: "Si toutes les transactions acquièrent les verrous dans le même ordre déterministe (ex: toujours le plus petit ID d'abord), un cycle circulaire d'attente (A attend B et B attend A) devient mathématiquement impossible.",
            },
          ]}
        />
      </div>
    </div>
  );
};
