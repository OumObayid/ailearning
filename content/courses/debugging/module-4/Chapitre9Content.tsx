import React from "react";
import Image from "next/image";
import { Icon } from "@/components/common/Icon";

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-300">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — Débogage des connexions MySQL
        </h1>
      </div>

      {/* 1. Tableau des codes d'erreurs MySQL */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="bug" className="w-5 h-5 text-emerald-400" />
          1. Codes d&apos;erreurs de connexion MySQL indispensables
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-300">
                <th className="py-3 px-4 font-semibold">Code d&apos;erreur</th>
                <th className="py-3 px-4 font-semibold">Diagnostic immédiat</th>
                <th className="py-3 px-4 font-semibold">Action corrective</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr>
                <td className="py-2.5 px-4 text-red-400 font-bold">ECONNREFUSED</td>
                <td className="py-2.5 px-4 text-slate-300">Le serveur MySQL n&apos;écoute pas sur le port spécifié (souvent 3306).</td>
                <td className="py-2.5 px-4 text-emerald-400">Démarrer le service MySQL (XAMPP, Docker ou `systemctl start mysql`).</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-amber-400 font-bold">ER_ACCESS_DENIED_ERROR</td>
                <td className="py-2.5 px-4 text-slate-300">Nom d&apos;utilisateur ou mot de passe invalide pour l&apos;hôte distant.</td>
                <td className="py-2.5 px-4 text-emerald-400">Vérifier DB_USER et DB_PASSWORD dans le fichier .env.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-sky-400 font-bold">ER_BAD_DB_ERROR</td>
                <td className="py-2.5 px-4 text-slate-300">La base de données déclarée dans le pool n&apos;existe pas sur le serveur.</td>
                <td className="py-2.5 px-4 text-emerald-400">Exécuter `CREATE DATABASE [nom];` ou corriger DB_NAME.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-purple-400 font-bold">ETIMEDOUT / ENOTFOUND</td>
                <td className="py-2.5 px-4 text-slate-300">Résolution DNS impossible ou pare-feu bloquant le flux réseau.</td>
                <td className="py-2.5 px-4 text-emerald-400">Vérifier DB_HOST (tester `127.0.0.1` au lieu de `localhost`).</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-pink-400 font-bold">PROTOCOL_CONNECTION_LOST</td>
                <td className="py-2.5 px-4 text-slate-300">Le serveur MySQL a fermé la connexion inactive (wait_timeout dépassé).</td>
                <td className="py-2.5 px-4 text-emerald-400">Utiliser un Connection Pool au lieu d&apos;une connexion unique persistante.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Le Connection Pool et Image 3 */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="server" className="w-5 h-5 text-emerald-400" />
          2. Architecture du Connection Pool avec mysql2
        </h3>
        <p className="leading-relaxed">
          Créer une connexion TCP à chaque requête HTTP est lent et sature les sockets. Un <strong>Pool de connexions</strong> maintient un groupe de connexions prêtes à l&apos;emploi et les recycle dès la libération.
        </p>

        {/* Diagramme Image 3 */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="server" className="w-5 h-5 text-emerald-400" />
              Cycle de vie des connexions dans un Pool MySQL
            </h4>
            <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              Figure 4.9-A
            </span>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex justify-center p-4">
            <Image
              src="/images/cours/debugging/module-4/image3.jpeg"
              alt="Schéma de fonctionnement d'un Connection Pool MySQL"
              width={850}
              height={440}
              className="rounded-lg object-contain max-h-[420px] w-auto shadow-2xl"
            />
          </div>
          <p className="text-xs text-slate-400 italic text-center">
            Le Pool réutilise intelligemment les sockets établis : chaque requête emprunte une connexion libre puis la remet immédiatement dans la file d&apos;attente.
          </p>
        </div>

        {/* Le piège de la fuite de connexion */}
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/10 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
            <Icon name="bug" className="w-4 h-4" />
            Fuite critique : Oubli de connection.release()
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Si vous appelez manuellement <code className="text-white font-mono">await pool.getConnection()</code> sans exécuter <code className="text-white font-mono">connection.release()</code> dans un bloc <code className="text-white font-mono">finally</code>, le slot reste bloqué indéfiniment. Dès que le nombre maximal de requêtes (<code className="text-white font-mono">connectionLimit: 10</code>) est atteint, <strong>toutes les requêtes suivantes sont bloquées</strong> !
          </p>
          <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✅ APPROCHE RECOMMANDÉE : pool.query() gère automatiquement l'emprunt et la restitution
const [users] = await pool.query("SELECT id, name, email FROM users");

// OU si vous gérez manuellement une transaction :
const conn = await pool.getConnection();
try {
  await conn.beginTransaction();
  await conn.query("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
  await conn.query("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
  await conn.commit();
} catch (err) {
  await conn.rollback();
  throw err;
} finally {
  conn.release(); // ⚠️ Libération vitale même en cas d'erreur !
}`}
          </pre>
        </div>
      </div>

      {/* 3. Diagnostic indépendant et Image 4 (phpMyAdmin) */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-400" />
          3. Isoler le serveur MySQL : Terminal et interfaces d&apos;administration
        </h3>
        <p className="leading-relaxed">
          Avant de chercher des bugs dans votre contrôleur Express, isolez la base de données. Si la connexion échoue en ligne de commande ou via phpMyAdmin, le code JavaScript est hors de cause.
        </p>

        {/* Capture phpMyAdmin Image 4 */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="database" className="w-5 h-5 text-emerald-400" />
              Vérification de l&apos;état des bases via phpMyAdmin
            </h4>
            <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              Figure 4.9-B
            </span>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex justify-center p-4">
            <Image
              src="/images/cours/debugging/module-4/image4.jpeg"
              alt="Interface phpMyAdmin montrant l'état des tables et bases de données"
              width={850}
              height={440}
              className="rounded-lg object-contain max-h-[440px] w-auto shadow-2xl"
            />
          </div>
          <p className="text-xs text-slate-400 italic text-center">
            Vérification de l&apos;existence de la base et de la structure des tables dans phpMyAdmin pour confirmer les privilèges accordés à l&apos;utilisateur de l&apos;API.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
          <div className="text-slate-400 font-sans font-bold text-sm mb-2 flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
            Checklist de test CLI direct :
          </div>
          <div className="text-slate-300">
            <div># 1. Tester la connexion socket locale</div>
            <div className="text-emerald-300">mysql -h 127.0.0.1 -P 3306 -u root -p</div>
            <div className="mt-2"># 2. Confirmer que la base cible existe</div>
            <div className="text-emerald-300">SHOW DATABASES;</div>
            <div className="text-emerald-300">USE taskflow;</div>
            <div className="mt-2"># 3. Lister les tables</div>
            <div className="text-emerald-300">SHOW TABLES;</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chapitre9Content;
