'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type PoolScenarioMode = 'safe_auto_release' | 'leak_unreleased' | 'idle_timeout_loss' | 'healthcheck_healing';

interface PoolScenario {
  title: string;
  badge: string;
  badgeColor: string;
  poolLimit: number;
  activeConnections: number;
  idleConnections: number;
  waitingQueueLength: number;
  healthState: 'HEALTHY' | 'LEAK_SATURATION' | 'DISCONNECTED' | 'SELF_HEALED';
  description: string;
  diagnosticInsight: string;
  correctiveCode: string;
}

const POOL_SCENARIOS: Record<PoolScenarioMode, PoolScenario> = {
  safe_auto_release: {
    title: '1. Utilisation Saine du Pool (pool.query() avec libération automatique)',
    badge: 'Pool Sain & Stable',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    poolLimit: 10,
    activeConnections: 2,
    idleConnections: 8,
    waitingQueueLength: 0,
    healthState: 'HEALTHY',
    description: 'En utilisant directement `pool.query()`, le driver mysql2 emprunte une connexion libre du pool, exécute la requête SQL et la restitue immédiatement au pool dans le même tick d\'exécution.',
    diagnosticInsight: 'La charge est parfaitement absorbée. Le pool conserve 8 connexions dormantes prêtes à répondre aux pics d\'affluence sans créer de nouvelles connexions TCP avec le serveur MySQL.',
    correctiveCode: `// ✅ BONNE PRATIQUE : pool.query gère automatiquement l'emprunt et la libération
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD,
  database: 'shop_production',
  waitForConnections: true,
  connectionLimit: 10, // Maximum 10 sockets TCP simultanées
  queueLimit: 0        // File d'attente illimitée en mémoire
});

app.get('/api/products', async (req, res) => {
  // Pas besoin de getConnection() ni de release() manuel !
  const [products] = await pool.query('SELECT id, name, price FROM products LIMIT 50');
  res.json({ products });
});`,
  },
  leak_unreleased: {
    title: '2. Fuite de Connexion Critique (Oubli de release() dans un Catch)',
    badge: 'Pool Asphyxié (10/10 Saturation)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    poolLimit: 10,
    activeConnections: 10,
    idleConnections: 0,
    waitingQueueLength: 47,
    healthState: 'LEAK_SATURATION',
    description: 'Une route acquiert manuellement une connexion avec `pool.getConnection()`. Une erreur SQL ou une exception JavaScript survient avant d\'atteindre `connection.release()`. La connexion reste bloquée indéfiniment.',
    diagnosticInsight: 'Après seulement 10 erreurs en production, les 10 connexions du pool sont verrouillées pour toujours. Toutes les requêtes suivantes s\'entassent dans la file d\'attente jusqu\'à déclencher un Timeout HTTP 504 général.',
    correctiveCode: `// ❌ CODE VULNÉRABLE : Fuite en cas d'erreur
// const conn = await pool.getConnection();
// await conn.query('MALFORMED SQL QUERY'); // Lance une erreur !
// conn.release(); // ⚠️ JAMAIS EXÉCUTÉ ! La connexion est perdue.

// ✅ CODE CORRIGÉ : Toujours libérer dans le bloc "finally"
app.get('/api/transaction', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query('UPDATE accounts SET balance = balance - 100 WHERE id = ?', [1]);
    await connection.commit();
    res.json({ success: true });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: 'Transaction échouée' });
  } finally {
    // 🛡️ GARANTIE ABSOLUE : Exécuté quoi qu'il arrive (succès ou erreur)
    connection.release();
  }
});`,
  },
  idle_timeout_loss: {
    title: '3. Connexion Interrompue par Inactivité (PROTOCOL_CONNECTION_LOST)',
    badge: 'Socket Coupée (Wait Timeout)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    poolLimit: 10,
    activeConnections: 0,
    idleConnections: 0,
    waitingQueueLength: 0,
    healthState: 'DISCONNECTED',
    description: 'La nuit, le trafic faiblit. Les connexions ouvertes dans le pool restent inactives plus longtemps que le paramètre `wait_timeout` de MySQL (par défaut 28 800 secondes, souvent réduit à 300s sur RDS/Cloud). MySQL ferme la socket unilatéralement.',
    diagnosticInsight: 'Au premier appel du matin, Node.js tente d\'écrire dans une socket morte et lève l\'erreur : "PROTOCOL_CONNECTION_LOST : The server closed the connection".',
    correctiveCode: `// ✅ SOLUTION : Activer keepAlive et configurer enableKeepAlive dans mysql2
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'shop',
  enableKeepAlive: true,       // Maintient la socket active avec des paquets TCP keepalive
  keepAliveInitialDelay: 10000, // 10 secondes
  connectionLimit: 10,
  maxIdle: 5,                  // Ferme les connexions dormantes excédentaires
  idleTimeout: 60000           // Déconnecte proprement après 60s d'inactivité avant que MySQL ne coupe
});`,
  },
  healthcheck_healing: {
    title: '4. Surveillance & Auto-Guérison (Readiness Check avec Ping SQL)',
    badge: 'Auto-Healing Actif',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    poolLimit: 10,
    activeConnections: 1,
    idleConnections: 9,
    waitingQueueLength: 0,
    healthState: 'SELF_HEALED',
    description: 'Une sonde de préparation (Readiness Probe) interroge périodiquement le pool avec `SELECT 1`. Si la base devient inaccessible, le pool recycle les connexions mortes et le trafic est dérouté par le Load Balancer.',
    diagnosticInsight: 'Permet à Kubernetes et aux Load Balancers d\'éviter d\'envoyer des requêtes vers une instance Node.js dont la liaison BDD est momentanément interrompue.',
    correctiveCode: `// ✅ ENDPOINT DE HEALTHCHECK POUR KUBERNETES / DOCKER / AWS ALB
app.get('/health/ready', async (req, res) => {
  try {
    // Vérification légère ultra-rapide (< 2 ms)
    await pool.query('SELECT 1 AS alive');
    res.status(200).json({
      status: 'UP',
      database: 'CONNECTED',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Base de données injoignable :', error);
    res.status(503).json({
      status: 'DOWN',
      database: 'UNREACHABLE',
      error: (error as Error).message
    });
  }
});`,
  },
};

export const Chapitre7Content: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PoolScenarioMode>('safe_auto_release');
  const scenario = POOL_SCENARIOS[activeMode];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="activity" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Déboguer les Problèmes de Connexion BDD : Pool MySQL, Fuites & Healthchecks
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Déchiffrer les erreurs de socket (<code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">ECONNREFUSED</code>, <code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">PROTOCOL_CONNECTION_LOST</code>), éradiquer les fuites de connexions dans les pools et implémenter des sondes Liveness/Readiness robustes.
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
            <span>Identifier immédiatement la cause d&apos;un échec réseau MySQL via les codes d&apos;erreur standard.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Comprendre le rôle architectural d&apos;un Connection Pool et éviter l&apos;anti-pattern de la connexion unique.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Traquer et éliminer les fuites de connexions avec le pattern try/finally.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Construire un endpoint de Readiness Check pour la supervision en production.</span>
          </div>
        </div>
      </section>

      {/* 1. Les 5 Erreurs Critiques de Connexion MySQL */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          1. Les 5 Codes d&apos;Erreur de Connexion et leur Diagnostic
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Lorsqu&apos;une application Node.js échoue à communiquer avec sa base de données, le message d&apos;erreur retourné par le driver <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">mysql2</code> indique précisément l&apos;étage matériel ou logiciel défaillant :
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Code d&apos;erreur</th>
                <th className="px-4 py-3">Signification physique</th>
                <th className="px-4 py-3">Cause racine fréquente</th>
                <th className="px-4 py-3">Action de correction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-rose-700">ECONNREFUSED</td>
                <td className="px-4 py-2.5 font-medium">Port 3306 fermé ou inaccessible</td>
                <td className="px-4 py-2.5 font-medium">MySQL éteint, mauvais port ou <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">bind-address = 127.0.0.1</code> dans Docker</td>
                <td className="px-4 py-2.5 font-medium">Vérifier le service (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">systemctl status mysql</code>) et le réseau Docker</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-amber-700">ETIMEDOUT</td>
                <td className="px-4 py-2.5 font-medium">Aucune réponse TCP reçue</td>
                <td className="px-4 py-2.5 font-medium">Security Group AWS bloquant, pare-feu ufw ou IP du serveur incorrecte</td>
                <td className="px-4 py-2.5 font-medium">Ouvrir le flux TCP 3306 dans le pare-feu réseau</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-indigo-700">ER_ACCESS_DENIED_ERROR (1045)</td>
                <td className="px-4 py-2.5 font-medium">Authentification rejetée</td>
                <td className="px-4 py-2.5 font-medium">Mauvais mot de passe ou utilisateur non autorisé depuis l&apos;hôte distant (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">&apos;user&apos;@&apos;%&apos;</code>)</td>
                <td className="px-4 py-2.5 font-medium">Vérifier <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">.env</code> et privilèges MySQL (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">GRANT ALL ON ...</code>)</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-purple-700">ER_BAD_DB_ERROR (1049)</td>
                <td className="px-4 py-2.5 font-medium">Base de données inconnue</td>
                <td className="px-4 py-2.5 font-medium">La base configurée dans la variable <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">DB_NAME</code> n&apos;a pas été créée</td>
                <td className="px-4 py-2.5 font-medium">Exécuter <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">CREATE DATABASE IF NOT EXISTS shop;</code></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-emerald-700">PROTOCOL_CONNECTION_LOST</td>
                <td className="px-4 py-2.5 font-medium">Connexion coupée brutalement</td>
                <td className="px-4 py-2.5 font-medium">Inactivité prolongée (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">wait_timeout</code>) ou MySQL a redémarré</td>
                <td className="px-4 py-2.5 font-medium">Activer <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">enableKeepAlive: true</code> dans les options du Pool</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Pourquoi un Connection Pool est indispensable */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="database" className="w-5 h-5 text-indigo-600" />
          2. L&apos;Architecture d&apos;un Connection Pool
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Créer une connexion à chaque requête HTTP (<code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">mysql.createConnection()</code>) est l&apos;un des pires anti-patterns du développement web : 
          chaque connexion nécessite une négociation TCP, un handshake TLS/SSL et un échange d&apos;authentification cryptographique (soit 30 à 60 ms perdus à chaque clic utilisateur).
        </p>

        {/* Figure 5.7 - Preserving image12.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image12.jpeg"
              alt="Architecture de Connection Pool réutilisant des connexions persistantes vers MySQL (Figure 6.7)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 5.7 — Architecture d&apos;un Connection Pool : Recyclage de connexions TCP persistantes entre l&apos;API Node.js et MySQL.
          </div>
        </div>

        <Callout type="warning" title="Le Danger Mortel : La Fuite de Connexion (Connection Leak)">
          <p className="text-xs sm:text-sm">
            Si vous utilisez <code className="font-mono text-xs font-bold text-slate-900">pool.getConnection()</code>, vous DEVEZ obligatoirement appeler <code className="font-mono text-xs font-bold text-slate-900">connection.release()</code> dans un bloc <code className="font-mono text-xs font-bold text-slate-900">finally</code>. 
            Si une exception survient et que le <code className="font-mono text-xs font-bold text-slate-900">release()</code> est sauté, la connexion ne revient jamais dans le pool. Après 10 requêtes échouées, tout votre site Web se fige !
          </p>
        </Callout>
      </section>

      {/* 3. Simulateur Interactif : DatabasePoolSimulatorLab */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          3. Simulateur Interactif : Laboratoire de Gestion du Pool BDD
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Observez le comportement d&apos;un pool MySQL de 10 connexions sous différents scénarios d&apos;ingénierie :
        </p>

        {/* Boutons sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(POOL_SCENARIOS) as PoolScenarioMode[]).map((mode) => {
            const sc = POOL_SCENARIOS[mode];
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
                    {sc.title.split('(')[0]}
                  </div>
                </div>
                <div className="mt-2 text-[11px] font-mono text-slate-600">
                  Actives : {sc.activeConnections}/{sc.poolLimit} | File : {sc.waitingQueueLength}
                </div>
              </button>
            );
          })}
        </div>

        {/* Panneau de télémétrie */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scénario de Pool</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{scenario.title}</h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${scenario.badgeColor}`}>
              Statut : {scenario.healthState}
            </span>
          </div>

          {/* Jauges d'état */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Connexions Actives</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${scenario.activeConnections >= scenario.poolLimit ? 'text-rose-600' : 'text-slate-900'}`}>
                {scenario.activeConnections} / {scenario.poolLimit}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Capacité maximale</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Connexions Libres</div>
              <div className="text-lg sm:text-xl font-mono font-black text-emerald-600">
                {scenario.idleConnections}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Prêtes en cache</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Requêtes en Attente</div>
              <div className={`text-lg sm:text-xl font-mono font-black ${scenario.waitingQueueLength > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                {scenario.waitingQueueLength}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">File d&apos;attente RAM</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold mb-1">Santé du Service</div>
              <div className={`text-xs sm:text-sm font-black mt-2 ${scenario.healthState === 'LEAK_SATURATION' ? 'text-rose-600' : 'text-emerald-600'}`}>
                {scenario.healthState === 'LEAK_SATURATION' ? 'PANNE TOTALE' : 'OPÉRATIONNEL'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1.5">
            <div>
              <span className="font-bold text-slate-900">Constat technique : </span>
              <span className="text-slate-700">{scenario.description}</span>
            </div>
            <div>
              <span className="font-bold text-rose-800">Diagnostic d&apos;expert : </span>
              <span className="text-slate-700">{scenario.diagnosticInsight}</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Icon name="code" className="w-3.5 h-3.5 text-indigo-600" />
              <span>Implémentation robuste recommandée :</span>
            </div>
            <CodeBlock code={scenario.correctiveCode} language="typescript" />
          </div>
        </div>
      </section>

      {/* 4. Cas Réel Entreprise : Le Mystère des Mardis Matin */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          4. Étude de Cas Réelle : Le Crash Hebdomadaire chez PayFlow
        </h2>
        <div className="border-2 border-rose-200 bg-rose-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-1 rounded-md">
              Incident de Production Récurrent
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Récurrence : Tous les mardis à 09h15</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>Le Mystère :</strong> Tous les mardis matin à 09h15, le service d&apos;API de PayFlow cessait de répondre à toute requête, retournant des erreurs <code className="bg-rose-100 text-rose-900 px-1 py-0.5 rounded font-mono text-xs">504 Gateway Timeout</code>. Le serveur ne plantait pas, le CPU était à 2%, mais aucune requête n&apos;aboutissait.
            </p>
            <p>
              <strong>L&apos;Enquête :</strong> La commande <code className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">SHOW PROCESSLIST;</code> dans MySQL a révélé 20 connexions en état <code className="font-mono text-amber-800 font-bold">Sleep</code> provenant du serveur Node.js. Le pool avait une limite stricte de 20 connexions.
            </p>
            <p>
              <strong>La Cause :</strong> À 09h00, le service comptable lançait un script d&apos;exportation hebdomadaire. Ce script appelait une route qui effectuait un <code className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">pool.getConnection()</code>, mais contenait un bug qui levait une exception en cas de client sans IBAN. Le bloc <code className="font-mono text-rose-800 font-bold">connection.release()</code> n&apos;était jamais appelé ! Après 20 clients sans IBAN, les 20 connexions du pool étaient épuisées pour toujours.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Connexions BDD & Pools (Chapitre 5.7)"
          questions={[
            {
              id: 1,
              question: "Que signifie l'erreur Node.js 'ECONNREFUSED' lors d'une tentative de connexion à MySQL ?",
              options: [
                "L'utilisateur a fourni un mot de passe incorrect.",
                "Le serveur cible a activement rejeté la connexion TCP car aucun processus n'écoute sur le port spécifié (ex: port 3306 fermé ou MySQL éteint).",
                "La base de données contient trop de tables.",
                "La requête SQL envoyée comporte une erreur de syntaxe."
              ],
              correctIndex: 1,
              explanation: "ECONNREFUSED (Connection Refused) est une erreur réseau de couche transport (TCP) : la machine cible est joignable, mais aucun service n'accepte de paquets sur le port demandé.",
            },
            {
              id: 2,
              question: "Pourquoi est-il crucial de placer l'instruction connection.release() dans un bloc 'finally' ?",
              options: [
                "Pour accélérer la vitesse de calcul du processeur.",
                "Pour garantir que la connexion soit restituée au pool même si une erreur SQL ou une exception JavaScript survient pendant le traitement.",
                "Pour effacer les logs de debug de la console.",
                "Pour forcer MySQL à redémarrer automatiquement."
              ],
              correctIndex: 1,
              explanation: "Le bloc 'finally' est garanti d'être exécuté quoi qu'il arrive (succès ou exception levée). Sans cela, toute erreur survenue dans le bloc 'try' saute le release et provoque une fuite de connexion définitive.",
            },
            {
              id: 3,
              question: "Quelle commande MySQL permet de visualiser en direct toutes les connexions actives et les requêtes en cours d'exécution ?",
              options: [
                "SHOW PROCESSLIST;",
                "SELECT * FROM connections;",
                "SHOW DATABASE STATUS;",
                "EXPLAIN ANALYZE ALL;"
              ],
              correctIndex: 0,
              explanation: "La commande 'SHOW PROCESSLIST;' affiche la liste de tous les threads clients connectés à l'instance MySQL, avec leur ID, leur utilisateur, leur état (Sleep, Query) et la commande en cours.",
            },
            {
              id: 4,
              question: "Quelle est la cause principale de l'erreur 'PROTOCOL_CONNECTION_LOST' survenant après une longue période d'inactivité du serveur ?",
              options: [
                "Un câble réseau a été débranché physiquement.",
                "Le serveur MySQL a fermé la socket TCP unilatéralement après dépassement du délai d'inactivité configuré (paramètre wait_timeout).",
                "Le disque dur du serveur est plein.",
                "L'application a dépassé la limite de RAM allouée par V8."
              ],
              correctIndex: 1,
              explanation: "Par mesure de sécurité et d'économie de ressources, MySQL termine les connexions inactives depuis plus de wait_timeout secondes. Si le client tente d'écrire dessus sans avoir configuré de keepalive, l'erreur survient.",
            },
            {
              id: 5,
              question: "Quelle est la différence fondamentale entre une sonde de Liveness et une sonde de Readiness dans Kubernetes ?",
              options: [
                "Il n'y a aucune différence, ce sont deux synonymes.",
                "La Liveness vérifie si le processus Node.js est vivant (s'il doit être redémarré) ; la Readiness vérifie si l'application est prête à traiter du trafic avec ses dépendances telles que MySQL.",
                "La Liveness vérifie MySQL et la Readiness vérifie le CSS du Frontend.",
                "La Readiness sert uniquement pendant la compilation du code TypeScript."
              ],
              correctIndex: 1,
              explanation: "Si MySQL est temporairement indisponible, la sonde de Readiness échoue : Kubernetes arrête d'envoyer du trafic HTTP à cette instance, mais ne la tue pas inutilement (contrairement à la Liveness qui provoquerait un cycle infini de redémarrages).",
            },
            {
              id: 6,
              question: "Pourquoi l'utilisation directe de pool.query() est-elle généralement plus sûre que pool.getConnection() ?",
              options: [
                "Parce que pool.query() n'utilise pas de mot de passe.",
                "Parce que pool.query() gère automatiquement l'emprunt et la restitution de la connexion au pool en interne, éliminant tout risque de fuite de connexion.",
                "Parce que pool.query() désactive les transactions SQL.",
                "Parce que pool.query() est réservé aux utilisateurs administrateurs."
              ],
              correctIndex: 1,
              explanation: "pool.query() est un raccourci haut niveau qui fait en interne l'acquisition de la connexion, l'exécution et sa libération immédiate garantie, ce qui évite les oublis manuels de release().",
            },
          ]}
        />
      </div>
    </div>
  );
};
