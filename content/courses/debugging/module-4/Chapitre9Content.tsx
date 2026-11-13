'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type MySqlIncidentKey =
  | 'econnrefused'
  | 'access_denied'
  | 'pool_exhaustion_leak'
  | 'ipv6_localhost_trap';

interface MySqlIncident {
  title: string;
  badge: string;
  badgeColor: string;
  errorSignal: string;
  rootCause: string;
  symptomInProduction: string;
  poolState: { active: number; idle: number; queued: number; max: number };
  remedyCode: string;
  checklist: string[];
}

const MYSQL_INCIDENTS: Record<MySqlIncidentKey, MySqlIncident> = {
  econnrefused: {
    title: '1. ECONNREFUSED sur le port 3306',
    badge: 'Daemon Éteint / Port Bloqué',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    errorSignal: `Error: connect ECONNREFUSED 127.0.0.1:3306
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16)
  errno: -4078,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 3306`,
    rootCause: 'Le service MySQL n\'est pas démarré, ou il écoute sur un autre port, ou Docker/XAMPP est à l\'arrêt.',
    symptomInProduction: 'Dès le lancement du serveur Node.js, l\'application plante immédiatement au démarrage ou renvoie 500 sur toutes les requêtes.',
    poolState: { active: 0, idle: 0, queued: 0, max: 10 },
    remedyCode: `# Vérifier et démarrer le service MySQL :
# Windows (Services ou XAMPP / Laragon) :
net start MySQL80
# Linux / Docker :
sudo systemctl start mysql
docker start mysql_container`,
    checklist: [
      'Vérifier que le port 3306 est bien à l\'écoute via : netstat -an | findstr 3306',
      'Confirmer que XAMPP ou le conteneur Docker MySQL est en statut "Running".',
      'Vérifier la variable DB_PORT dans votre fichier .env.'
    ]
  },
  access_denied: {
    title: '2. ER_ACCESS_DENIED_ERROR (Authentification SQL)',
    badge: 'Identifiants / Permissions',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    errorSignal: `Error: Access denied for user 'app_user'@'localhost' (using password: YES)
  code: 'ER_ACCESS_DENIED_ERROR',
  errno: 1045,
  sqlState: '28000'`,
    rootCause: 'Le mot de passe dans .env est erroné, l\'utilisateur n\'existe pas, ou ses privilèges sont limités à un autre hôte (\'app_user\'@\'%\' vs \'app_user\'@\'127.0.0.1\').',
    symptomInProduction: 'Le serveur Express démarre mais chaque tentative de requête échoue avec un code 1045.',
    poolState: { active: 0, idle: 0, queued: 0, max: 10 },
    remedyCode: `-- Réinitialiser ou accorder les privilèges en root MySQL :
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'SuperSecretPass123!';
GRANT ALL PRIVILEGES ON taskflow.* TO 'app_user'@'%';
FLUSH PRIVILEGES;`,
    checklist: [
      'Tester la connexion directement dans le terminal : mysql -u app_user -p',
      'Vérifier les guillemets ou caractères spéciaux dans le mot de passe du fichier .env.',
      'S\'assurer que l\'hôte de l\'utilisateur MySQL autorise la connexion depuis votre client.'
    ]
  },
  pool_exhaustion_leak: {
    title: '3. Fuite de Connexion et Saturation du Pool (connectionLimit)',
    badge: 'Fuite Critique / Hang',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    errorSignal: `[ALERTE POOL] Connexions actives : 10/10. File d'attente : 45 requêtes bloquées.
Toutes les requêtes suivantes sont en attente infinie de libération de socket...`,
    rootCause: 'Le développeur a appelé pool.getConnection() sans jamais invoquer connection.release() dans un bloc finally. Les 10 slots sont verrouillés à tout jamais.',
    symptomInProduction: 'Les 10 premières requêtes fonctionnent à merveille, puis le site se fige complètement pour tous les utilisateurs.',
    poolState: { active: 10, idle: 0, queued: 45, max: 10 },
    remedyCode: `// ✅ Solution 1 : Utiliser pool.query() (restitution automatique garantie) :
const [rows] = await pool.query('SELECT * FROM users');

// ✅ Solution 2 : Si vous gérez manuellement la connexion (Transaction) :
const conn = await pool.getConnection();
try {
  await conn.beginTransaction();
  // requêtes...
  await conn.commit();
} catch (err) {
  await conn.rollback();
  throw err;
} finally {
  conn.release(); // ⚠️ INDISPENSABLE dans le finally !
}`,
    checklist: [
      'Toujours placer connection.release() dans un bloc finally.',
      'Privilégier pool.query() dès qu\'une transaction multi-requêtes n\'est pas nécessaire.',
      'Configurer queueLimit: 50 pour refuser rapidement (Fail Fast) au lieu de freezer indéfiniment.'
    ]
  },
  ipv6_localhost_trap: {
    title: '4. Piège IPv6 : localhost (::1) vs 127.0.0.1 (IPv4)',
    badge: 'Résolution DNS / Socket',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    errorSignal: `Error: connect ECONNREFUSED ::1:3306
  code: 'ECONNREFUSED',
  address: '::1',
  port: 3306`,
    rootCause: 'Node.js v18+ résout "localhost" vers l\'adresse IPv6 ::1 en priorité, alors que le serveur MySQL local n\'écoute que sur l\'interface IPv4 127.0.0.1.',
    symptomInProduction: 'La commande CLI mysql -h 127.0.0.1 fonctionne, mais l\'application Node.js échoue avec ECONNREFUSED ::1:3306.',
    poolState: { active: 0, idle: 0, queued: 0, max: 10 },
    remedyCode: `# Dans votre fichier .env :
# ❌ À ÉVITER en local si MySQL n'écoute pas en IPv6 :
DB_HOST=localhost

# ✅ RECOMMANDÉ : Forcer explicitement l'adresse IPv4 :
DB_HOST=127.0.0.1`,
    checklist: [
      'Remplacer systématiquement DB_HOST=localhost par DB_HOST=127.0.0.1 dans le .env de développement.',
      'Vérifier le fichier hosts du système d\'exploitation.',
      'Vérifier la directive bind-address = 0.0.0.0 dans my.cnf si vous utilisez Docker.'
    ]
  }
};

export const Chapitre9Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<MySqlIncidentKey>('econnrefused');
  const incident = MYSQL_INCIDENTS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 9 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            MySQL &amp; Connection Pool Engineering
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Débogage des connexions MySQL : Connection Pools, gestion des fuites, codes POSIX/SQL et diagnostics réseau
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Établir une connexion TCP vers MySQL avec handshake TLS et négociation d&apos;authentification est une opération
          extrêmement coûteuse (50 à 150 ms). Pour préserver les performances, les architectures modernes utilisent un{' '}
          <strong>Pool de connexions</strong> avec <code>mysql2/promise</code>.
          Mais un pool mal configuré ou une fuite de libération de socket (<code>connection.release()</code>)
          peut paralyser une application entière sous charge.
        </p>
      </div>

      {/* 1. Tableau des codes d'erreurs MySQL */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les 5 codes d&apos;erreurs de connexion MySQL indispensables
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-bold">
                <th className="py-3 px-4">Code d&apos;erreur</th>
                <th className="py-3 px-4">Diagnostic immédiat</th>
                <th className="py-3 px-4">Action corrective certifiée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              <tr>
                <td className="py-3 px-4 text-rose-600 font-mono font-bold">ECONNREFUSED</td>
                <td className="py-3 px-4 text-slate-800">Le serveur MySQL n&apos;écoute pas sur le port spécifié (généralement 3306).</td>
                <td className="py-3 px-4 text-slate-700">Démarrer le service MySQL (XAMPP, Docker ou <code>systemctl start mysql</code>).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-amber-600 font-mono font-bold">ER_ACCESS_DENIED_ERROR</td>
                <td className="py-3 px-4 text-slate-800">Nom d&apos;utilisateur ou mot de passe invalide pour l&apos;hôte distant.</td>
                <td className="py-3 px-4 text-slate-700">Vérifier <code>DB_USER</code> et <code>DB_PASSWORD</code> dans le fichier <code>.env</code>.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-blue-600 font-mono font-bold">ER_BAD_DB_ERROR</td>
                <td className="py-3 px-4 text-slate-800">La base de données déclarée dans le pool n&apos;existe pas sur le serveur.</td>
                <td className="py-3 px-4 text-slate-700">Exécuter <code>CREATE DATABASE [nom];</code> ou corriger <code>DB_NAME</code>.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-purple-600 font-mono font-bold">ETIMEDOUT / ENOTFOUND</td>
                <td className="py-3 px-4 text-slate-800">Résolution DNS impossible ou pare-feu bloquant le flux réseau.</td>
                <td className="py-3 px-4 text-slate-700">Vérifier <code>DB_HOST</code> (tester <code>127.0.0.1</code> au lieu de <code>localhost</code>).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-teal-600 font-mono font-bold">PROTOCOL_CONNECTION_LOST</td>
                <td className="py-3 px-4 text-slate-800">Le serveur MySQL a fermé la connexion inactive (wait_timeout dépassé).</td>
                <td className="py-3 px-4 text-slate-700">Utiliser un Connection Pool au lieu d&apos;une connexion unique persistante.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Le Connection Pool et Image 3 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Architecture et cycle de vie d&apos;un Connection Pool avec mysql2/promise
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Créer une connexion TCP à chaque requête HTTP est lent et sature les sockets du système d&apos;exploitation.
          Un <strong>Pool de connexions</strong> maintient un groupe de sockets pré-établis et les recycle dès la libération :
        </p>

        {/* Diagramme Image 3 */}
        <div className="p-6 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
              <Icon name="server" className="w-5 h-5 text-emerald-600" />
              <span>Cycle de vie des connexions dans un Pool MySQL</span>
            </h3>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full">
              Figure 4.9-A
            </span>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex justify-center p-4">
            <Image
              src="/images/cours/debugging/module-4/image3.jpeg"
              alt="Schéma de fonctionnement d'un Connection Pool MySQL"
              width={850}
              height={440}
              className="rounded-xl object-contain max-h-[420px] w-auto shadow-md"
            />
          </div>
          <p className="text-xs text-slate-600 italic text-center">
            Le Pool réutilise intelligemment les sockets établis : chaque requête applicative emprunte une connexion libre,
            exécute sa requête SQL, puis la remet immédiatement à disposition dans le pool.
          </p>
        </div>

        <Callout type="danger" title="La fuite critique : L'oubli de connection.release()">
          <p className="text-xs sm:text-sm">
            Si vous appelez manuellement <code>const conn = await pool.getConnection()</code> sans exécuter{' '}
            <code>conn.release()</code> dans un bloc <code>finally</code>, le socket reste monopolisé à tout jamais.
            Dès que 10 requêtes ont fuité, <strong>le pool est totalement saturé</strong> :
            toutes les requêtes suivantes sont mises en attente infinie et le site ne répond plus !
          </p>
        </Callout>
      </section>

      {/* 3. Diagnostic indépendant : CLI & phpMyAdmin (Image 4) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Isoler le serveur MySQL : Terminal et interfaces phpMyAdmin
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Avant de chercher des bogues dans vos contrôleurs Express, appliquez le protocole d&apos;isolation :
          vérifiez que la base MySQL est saine en dehors de Node.js via le terminal ou phpMyAdmin :
        </p>

        {/* Capture phpMyAdmin Image 4 */}
        <div className="p-6 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
              <Icon name="database" className="w-5 h-5 text-emerald-600" />
              <span>Vérification de l&apos;état des bases et tables via phpMyAdmin</span>
            </h3>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full">
              Figure 4.9-B
            </span>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex justify-center p-4">
            <Image
              src="/images/cours/debugging/module-4/image4.jpeg"
              alt="Interface phpMyAdmin montrant l'état des tables et bases de données"
              width={850}
              height={440}
              className="rounded-xl object-contain max-h-[440px] w-auto shadow-md"
            />
          </div>
          <p className="text-xs text-slate-600 italic text-center">
            Vérification de l&apos;existence de la base de données et de la structure des tables dans phpMyAdmin pour confirmer
            que l&apos;utilisateur de l&apos;API dispose des privilèges de lecture et d&apos;écriture.
          </p>
        </div>
      </section>

      {/* 4. Laboratoire Interactif : Diagnostic des Incidents MySQL */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Diagnostic des Incidents de Connexion MySQL
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Sélectionnez un cas d&apos;incident pour inspecter le signal d&apos;erreur, l&apos;état du pool et la procédure de résolution :
        </p>

        {/* Boutons Sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(Object.keys(MYSQL_INCIDENTS) as MySqlIncidentKey[]).map((key) => {
            const item = MYSQL_INCIDENTS[key];
            const isSelected = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`p-3 text-left rounded-xl border text-xs font-bold transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className={`text-[10px] px-1.5 py-0.5 rounded w-fit mb-1.5 ${
                  isSelected ? 'bg-lime-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 font-bold'
                }`}>
                  {item.badge}
                </span>
                <span className="truncate text-xs font-semibold leading-snug">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Panneau de détail */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-950">{incident.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${incident.badgeColor}`}>
                  {incident.badge}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">{incident.rootCause}</p>
            </div>

            {/* Jauge d'état du pool */}
            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Actives</span>
                <span className={`font-mono font-bold ${incident.poolState.active === incident.poolState.max ? 'text-rose-600' : 'text-slate-900'}`}>
                  {incident.poolState.active} / {incident.poolState.max}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-3">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">En attente</span>
                <span className={`font-mono font-bold ${incident.poolState.queued > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {incident.poolState.queued}
                </span>
              </div>
            </div>
          </div>

          {/* Signal d'Erreur Console */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-rose-700 mb-1.5 flex items-center gap-1.5">
              <Icon name="bug" className="w-3.5 h-3.5 text-rose-600" />
              <span>Signal d&apos;Erreur émis dans le terminal Node.js</span>
            </div>
            <div className="rounded-xl bg-slate-950 p-3.5 text-rose-400 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
              {incident.errorSignal}
            </div>
          </div>

          {/* Checklist d'investigation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
              <span>Protocole d&apos;Investigation Recommandé</span>
            </div>
            <ul className="text-xs text-slate-800 space-y-1">
              {incident.checklist.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">▸</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code de remédiation */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-1.5">
              Solution Technique Certifiée
            </div>
            <CodeBlock language="typescript" code={incident.remedyCode} />
          </div>
        </div>
      </section>

      {/* 5. TP : Module de Connexion Résilient avec HealthCheck */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Implémenter le Singleton de Pool avec HealthCheck (/health/db)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Ce module de production configure un pool robuste avec timeout de connexion et expose un endpoint de diagnostic
          permettant à Docker ou Kubernetes de vérifier la santé de la base :
        </p>

        <CodeBlock
          language="typescript"
          code={`import mysql from 'mysql2/promise';
import { Request, Response } from 'express';

// 1. Initialisation Singleton du Pool de Connexions
export const db = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1', // ⚠️ Forcer IPv4 pour éviter le piège IPv6
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'taskflow',
  waitForConnections: true,
  connectionLimit: 10,       // Maximum de 10 connexions simultanées
  queueLimit: 50,            // Rejette après 50 requêtes en attente (Fail Fast)
  connectTimeout: 5000       // Timeout de 5s pour détecter rapidement une coupure réseau
});

// 2. Endpoint de HealthCheck pour orchestrateur (Kubernetes, Docker)
export async function databaseHealthCheck(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    // Requête "ping" ultra-légère
    await db.query('SELECT 1');
    const latencyMs = Date.now() - startTime;

    return res.status(200).json({
      status: 'UP',
      database: 'MySQL',
      latency: \`\${latencyMs}ms\`,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[DATABASE HEALTHCHECK FAILED]', error.message);
    return res.status(503).json({
      status: 'DOWN',
      error: error.code || 'UNKNOWN_DB_ERROR',
      message: 'Impossible de joindre la base de données'
    });
  }
}`}
        />
      </section>

      {/* 6. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            6
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.9
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Évaluez votre compréhension du diagnostic des bases de données MySQL et des pools de connexions :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est l'impact d'un oubli systématique de 'connection.release()' lorsque vous utilisez const conn = await pool.getConnection() ?",
              options: [
                "Aucun impact, Node.js libère la connexion dès la fin de la fonction.",
                "Chaque requête consomme un slot du pool sans jamais le rendre : une fois la limite (connectionLimit) atteinte, toutes les requêtes suivantes sont bloquées indéfiniment.",
                "MySQL supprime automatiquement la table ciblée.",
                "Express relance automatiquement le serveur."
              ],
              correctIndex: 1,
              explanation: "Le pool ne sait pas quand vous avez fini d'utiliser une connexion empruntée via getConnection(). Sans appel explicite à connection.release() dans un bloc finally, les sockets restent verrouillés, entraînant une fuite de connexion et le gel complet de l'API."
            },
            {
              id: 2,
              question: "Quelle est la cause de l'erreur Node.js 'Error: connect ECONNREFUSED 127.0.0.1:3306' ?",
              options: [
                "Le mot de passe de l'utilisateur est erroné.",
                "Le service MySQL n'est pas démarré, le port 3306 n'est pas à l'écoute ou un pare-feu bloque la connexion socket locale.",
                "La table SQL demandée n'existe pas.",
                "La requête SQL contient une faute de syntaxe."
              ],
              correctIndex: 1,
              explanation: "ECONNREFUSED est une erreur réseau du système d'exploitation indiquant qu'aucun processus n'écoute sur le port cible (3306). Cela signifie que MySQL est éteint ou que le port spécifié est incorrect."
            },
            {
              id: 3,
              question: "Pourquoi est-il fortement recommandé d'utiliser '127.0.0.1' au lieu de 'localhost' pour DB_HOST sous Node.js v18+ ?",
              options: [
                "Parce que 'localhost' est un mot interdit dans le standard ECMAScript.",
                "Parce que Node.js résout 'localhost' en IPv6 (::1) par défaut, alors que beaucoup de serveurs MySQL locaux n'écoutent que sur l'interface IPv4 (127.0.0.1), provoquant un ECONNREFUSED ::1:3306.",
                "Parce que '127.0.0.1' crypte les paquets automatiquement.",
                "Parce que MySQL refuse les connexions textuelles."
              ],
              correctIndex: 1,
              explanation: "Depuis Node.js v18, la résolution DNS respecte l'ordonnancement Happy Eyeballs et tente d'abord l'IPv6 (::1). Si MySQL n'est configuré que pour IPv4, la connexion échoue alors même que MySQL fonctionne parfaitement."
            },
            {
              id: 4,
              question: "Pourquoi l'utilisation de pool.query() est-elle plus sûre que pool.getConnection() pour des requêtes SELECT ou UPDATE simples ?",
              options: [
                "Parce que pool.query() est 100 fois plus rapide.",
                "Parce que pool.query() emprunte automatiquement une connexion libre du pool, exécute la requête, et garantit sa libération immédiate même en cas d'erreur SQL, éliminant tout risque de fuite de connexion.",
                "Parce que pool.query() n'a pas besoin de base de données.",
                "Parce que pool.query() désactive les injections SQL."
              ],
              correctIndex: 1,
              explanation: "pool.query() encapsule l'emprunt et la restitution (release) dans son implémentation interne. Il est donc impossible d'oublier de libérer la connexion, ce qui protège votre application contre les fuites de ressources."
            },
            {
              id: 5,
              question: "Quelle commande MySQL CLI permet d'isoler et de tester immédiatement la présence et l'accès à une base de données sans passer par Node.js ?",
              options: [
                "npm test mysql",
                "mysql -h 127.0.0.1 -P 3306 -u root -p",
                "ping www.mysql.com",
                "docker logs nodejs"
              ],
              correctIndex: 1,
              explanation: "Se connecter directement en ligne de commande avec le client natif 'mysql' permet de vérifier immédiatement si le problème provient des identifiants/réseau ou de votre code Node.js."
            },
            {
              id: 6,
              question: "Quel code d'erreur MySQL signale que le serveur a fermé une connexion inactive suite au dépassement du délai de repos (wait_timeout) ?",
              options: [
                "ER_DUP_ENTRY",
                "PROTOCOL_CONNECTION_LOST",
                "ER_NO_SUCH_TABLE",
                "ECONNRESET_BUFFER_FULL"
              ],
              correctIndex: 1,
              explanation: "PROTOCOL_CONNECTION_LOST survient lorsqu'une connexion TCP persistante unique reste ouverte sans activité pendant trop longtemps : le serveur MySQL coupe le socket unilatéralement. L'utilisation d'un Connection Pool évite ce problème grâce au renouvellement automatique des connexions."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre9Content;
