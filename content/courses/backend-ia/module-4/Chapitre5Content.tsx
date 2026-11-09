'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { DatabaseOptimizationLab } from '@/components/interactive/DatabaseOptimizationLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Gestion des connexions, pool de connexions et transactions SQL
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base font-semibold text-slate-950">
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le surcoût de handshake d&apos;une connexion MySQL unique par requête.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Configurer un pool de connexions professionnel avec mysql2 (connectionLimit, timeouts).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer pool.execute() (auto-restitution) et pool.getConnection() (réservation dédiée).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser la libération impérative avec connection.release() (et non connection.end()).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Sécuriser les opérations multi-tables avec les transactions ACID (beginTransaction, commit, rollback).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Découpler la rétention de socket SQL du streaming de l&apos;API Gemini pour éviter la famine du pool.</span>
          </li>
        </ul>
      </section>

      {/* 2. Le problème : Connexion unique vs Pool */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Pourquoi ouvrir une connexion par requête est un anti-pattern en production
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5">
            <h4 className="font-black text-rose-950 text-base flex items-center gap-2">
              <Icon name="x-circle" className="w-5 h-5 text-rose-600" />
              Mauvaise pratique : createConnection() par requête
            </h4>
            <p className="mt-2 text-xs font-semibold text-slate-800 leading-relaxed">
              ì chaque appel HTTP entrant, Node.js négocie une nouvelle poignée de main TCP, authentifie l&apos;utilisateur MySQL et alloue des descripteurs de fichiers système. Dès 100 requêtes concurrentes, le serveur MySQL sature son quota <code>max_connections</code> et rejette toutes les connexions suivantes.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5">
            <h4 className="font-black text-emerald-950 text-base flex items-center gap-2">
              <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
              Bonne pratique : Pool de connexions réutilisables
            </h4>
            <p className="mt-2 text-xs font-semibold text-slate-800 leading-relaxed">
              Un pool maintient un ensemble fixe de sockets ouverts et prêts à l&apos;emploi. Lorsqu&apos;une requête arrive, elle emprunte un socket disponible, exécute la commande SQL en quelques microsecondes et le restitue immédiatement au pool pour servir les autres utilisateurs.
            </p>
          </div>
        </div>

        {/* Original Document Pool Diagram */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm my-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-950">
            <Image
              src="/images/cours/backend-ia/module-4/database-connection-pool.jpg"
              alt="Architecture d'un pool de connexions à une base de données relationnelle"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-center text-xs font-bold text-slate-700">
            Figure 5.1 : Fonctionnement du Database Pool. Les requêtes applicatives empruntent les connexions établies (Borrow) et les restituent au pool (Return) sans jamais détruire les sockets physiques.
          </p>
        </div>
      </section>

      {/* 3. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Expérimentation dans le Laboratoire Interactif
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Ouvrez l&apos;onglet <strong>&quot;Pool &amp; Transactions&quot;</strong> pour déclencher des rafales de requêtes simultanées et simuler l&apos;annulation atomique d&apos;une transaction :
        </p>
        <DatabaseOptimizationLab />
      </section>

      {/* 4. Configuration mysql2 avec createPool */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Configuration de production du Pool avec mysql2/promise
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Voici le fichier central <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">db.js</code> à déployer dans vos microservices Backend :
        </p>

        <CodeBlock
          language="javascript"
          filename="db.js"
          code={`const mysql = require('mysql2/promise');
require('dotenv').config();

// Création d'un pool de connexions partagé
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'formation_db',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,  // Met les requêtes en file si le pool est plein
  connectionLimit: 10,       // Max 10 sockets physiques ouverts
  maxIdle: 10,               // Garder 10 sockets inactifs prêts en mémoire
  idleTimeout: 60000,        // Clore un socket s'il est inactif depuis 60s
  queueLimit: 0,             // 0 = file d'attente non bornée
});

module.exports = pool;`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="font-black text-indigo-950 text-sm">pool.execute(sql, params)</h4>
            <p className="mt-1 text-slate-800 font-semibold leading-relaxed">
              ì utiliser pour 95% de vos requêtes indépendantes. Emprunte, prépare, exécute et libère le socket en un seul appel. Vous n&apos;avez rien à clore à la main.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="font-black text-indigo-950 text-sm">pool.getConnection()</h4>
            <p className="mt-1 text-slate-800 font-semibold leading-relaxed">
              Réservé aux <strong>transactions multi-requêtes</strong>. Vous obtenez un socket exclusif que vous devez obligatoirement libérer dans un bloc <code>finally</code> avec <code>connection.release()</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Transactions Atomiques ACID */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Maîtriser les Transactions ACID (Tout ou Rien)
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Lorsqu&apos;une action modifie plusieurs tables (ex: débiter des crédits IA et enregistrer le prompt généré), l&apos;opération doit être <strong>atomique</strong> :
        </p>

        <CodeBlock
          language="javascript"
          filename="atomic_transaction.js"
          code={`app.post('/api/charge-and-create-prompt', async (req, res) => {
  const { userId, prompt, tokenCost } = req.body;
  let connection;

  try {
    // 1. Emprunter une connexion exclusive du pool
    connection = await pool.getConnection();

    // 2. Début de la transaction ACID
    await connection.beginTransaction();

    // 3. Débiter le solde utilisateur (vérification atomique)
    const [debitResult] = await connection.execute(
      \`UPDATE utilisateurs 
       SET credits = credits - ? 
       WHERE id = ? AND credits >= ?\`,
      [tokenCost, userId, tokenCost]
    );

    if (debitResult.affectedRows !== 1) {
      throw new Error('Crédits insuffisants pour lancer cette génération IA.');
    }

    // 4. Insérer la nouvelle conversation
    const [insertResult] = await connection.execute(
      \`INSERT INTO conversations (user_id, titre, contenu) 
       VALUES (?, ?, ?)\`,
      [userId, 'Nouvelle session', prompt]
    );

    // 5. Tout s'est bien déroulé : VALIDATION DÉFINITIVE (COMMIT)
    await connection.commit();

    res.json({ success: true, conversationId: insertResult.insertId });
  } catch (err) {
    // 6. En cas d'erreur : ANNULATION TOTALE (ROLLBACK)
    if (connection) {
      try {
        await connection.rollback();
      } catch (rbErr) {
        console.error('Erreur rollback:', rbErr);
      }
    }
    res.status(400).json({ success: false, message: err.message });
  } finally {
    // 7. RESTITUTION IMPÉRATIVE au pool (jamais connection.end() !)
    if (connection) {
      connection.release();
    }
  }
});`}
        />
      </section>

      {/* 6. Découplage Rétention SQL vs Inférence Gemini */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Règle d&apos;or pour le Backend IA : Découpler la rétention SQL de l&apos;appel Gemini
        </h2>
        <Callout type="warning" title="Ne jamais retenir une connexion MySQL pendant un appel LLM !">
          Une inférence de modèle de langage (Gemini) peut durer <strong>3 à 8 secondes</strong>. Si votre code réserve une connexion MySQL avant d&apos;appeler Gemini et ne la libère qu&apos;après avoir reçu la réponse de l&apos;IA, 10 utilisateurs simultanés monopoliseront les 10 connexions de votre pool pendant 8 secondes entières, <strong>paralysant instantanément l&apos;ensemble de votre application pour tous les autres visiteurs</strong>.
        </Callout>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-3">
          <h3 className="text-base font-black text-slate-950">Le bon pipeline temporel en 3 phases distinctes :</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3">
              <span className="font-black text-indigo-900 block">Phase 1 : Lecture SQL (~2 ms)</span>
              Lecture des crédits ou du contexte de conversation. Restitution immédiate au pool.
            </div>
            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-3">
              <span className="font-black text-purple-900 block">Phase 2 : Streaming IA (~4 000 ms)</span>
              Échange réseau pur avec l&apos;API Google Gemini en streaming SSE. <strong>0 connexion MySQL réservée</strong>.
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
              <span className="font-black text-emerald-900 block">Phase 3 : Écriture SQL (~2 ms)</span>
              Une fois le streaming achevé, un socket est ré-emprunté 2 millisecondes pour enregistrer la réponse dans la table.
            </div>
          </div>
        </div>
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Transaction bancaire de crédits IA et arrêt propre"
        objective="Construire un endpoint de transfert atomique avec beginTransaction/commit/rollback et programmer l'extinction gracieuse du pool (graceful shutdown) avec pool.end()."
        steps={[
          "Créer la table comptes (id, user_id, credits) dans formation_db.",
          "Développer la route POST /api/transfert exécutant le débit du compte A et le crédit du compte B dans une transaction.",
          "Tester un solde insuffisant et constater que le compte B n'a reçu aucun crédit parasite (Rollback vérifié).",
          "Attacher la méthode async pool.end() aux événements SIGINT et SIGTERM de Node.js pour fermer proprement les sockets à l'arrêt du serveur.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Pool de connexions & Transactions"
          questions={[
            {
              id: 1,
              question: "Quel est l'avantage principal d'un pool de connexions par rapport à mysql.createConnection() ?",
              options: [
                "Il réutilise un ensemble de sockets MySQL déjà ouverts, évitant le surcoût de handshake TCP répété pour chaque requête",
                "Il augmente la taille du disque dur",
                "Il convertit automatiquement le SQL en MongoDB",
                "Il remplace les clés primaires",
              ],
              correctIndex: 0,
              explanation: "Un pool maintient des connexions pré-établies. Les requêtes s'exécutent immédiatement sans devoir négocier une nouvelle liaison réseau TCP/TLS à chaque appel.",
            },
            {
              id: 2,
              question: "Quelle méthode doit-on appeler sur une connexion empruntée avec pool.getConnection() pour la restituer au pool ?",
              options: [
                "connection.release()",
                "connection.end()",
                "connection.destroy()",
                "connection.closeSocket()",
              ],
              correctIndex: 0,
              explanation: "release() remet la connexion à disposition du pool. Appeler end() détruirait physiquement la socket sous-jacente du pool.",
            },
            {
              id: 3,
              question: "Pourquoi est-il indispensable d'encadrer une transaction multi-tables par try / catch / finally ?",
              options: [
                "Pour exécuter rollback() en cas d'erreur et garantir la libération de la connexion avec release() dans le bloc finally",
                "Car le compilateur TypeScript refuse d'exécuter du SQL sans try/catch",
                "Pour chiffrer les données en mémoire",
                "Pour accélérer la vitesse de l'horloge système",
              ],
              correctIndex: 0,
              explanation: "Si une erreur survient au milieu de la transaction, le bloc catch effectue le rollback et le bloc finally garantit que la connexion retourne au pool, évitant une fuite de sockets.",
            },
            {
              id: 4,
              question: "Pourquoi ne faut-il JAMAIS retenir une connexion MySQL ouverte pendant qu'on attend la génération de réponse de Google Gemini ?",
              options: [
                "Parce que la latence de Gemini (plusieurs secondes) monopoliserait inutilement les connexions du pool et priverait les autres utilisateurs de base de données",
                "Car MySQL et Gemini sont programmés par la même équipe",
                "Car cela désactive les index de la table",
                "Car cela supprime les fichiers .env",
              ],
              correctIndex: 0,
              explanation: "Les sockets SQL sont des ressources rares. Les conserver inactives pendant une longue attente réseau externe asphyxie le pool et bloque toutes les autres routes de l'API.",
            },
            {
              id: 5,
              question: "Quelle instruction permet de clore proprement toutes les connexions du pool lors de l'arrêt du serveur Node.js (SIGINT) ?",
              options: [
                "await pool.end();",
                "pool.killAll();",
                "process.destroyPool();",
                "mysql.disconnect();",
              ],
              correctIndex: 0,
              explanation: "await pool.end() attend la fin des requêtes en vol et ferme proprement chaque socket avec le serveur MySQL (Graceful Shutdown).",
            },
          ]}
        />
      </section>

      {/* 9. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Checklist de validation des compétences
        </h2>
        <InteractiveChecklist
          title="Compétences validées pour le Chapitre 5"
          items={[
            "Je sais configurer un pool de connexions mysql2 avec connectionLimit et idleTimeout.",
            "Je sais quand utiliser pool.execute() et quand recourir à pool.getConnection().",
            "J'utilise systématiquement connection.release() dans un bloc finally pour restituer les sockets.",
            "Je maîtrise la syntaxe des transactions ACID (beginTransaction, commit, rollback).",
            "Je découple rigoureusement mes opérations SQL des appels réseau longs vers Google Gemini.",
          ]}
        />
      </section>
    </div>
  );
};

