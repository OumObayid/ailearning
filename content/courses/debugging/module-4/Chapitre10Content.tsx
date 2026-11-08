import React from "react";
import { Icon } from "@/components/common/Icon";

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-300">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Analyse des requêtes SQL et des erreurs de base de données
        </h1>
      </div>

      {/* 1. Matrice des erreurs SQL courantes */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="bug" className="w-5 h-5 text-amber-400" />
          1. Les codes d&apos;erreurs SQL les plus fréquents
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-300">
                <th className="py-3 px-4 font-semibold">Code d&apos;erreur MySQL</th>
                <th className="py-3 px-4 font-semibold">Nature du problème</th>
                <th className="py-3 px-4 font-semibold">Exemple &amp; Cause racine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr>
                <td className="py-2.5 px-4 text-red-400 font-bold">ER_NO_SUCH_TABLE</td>
                <td className="py-2.5 px-4 text-slate-300">Table inexistante</td>
                <td className="py-2.5 px-4 text-slate-400">Faute de frappe (<code className="text-amber-300">FROM user</code> au lieu de <code className="text-emerald-300">users</code>) ou casse sensible sous Linux.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-amber-400 font-bold">ER_BAD_FIELD_ERROR</td>
                <td className="py-2.5 px-4 text-slate-300">Colonne inconnue</td>
                <td className="py-2.5 px-4 text-slate-400">Sélection d&apos;un champ absent (<code className="text-amber-300">username</code> au lieu de <code className="text-emerald-300">name</code>). Vérifier avec DESCRIBE.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-sky-400 font-bold">ER_DUP_ENTRY</td>
                <td className="py-2.5 px-4 text-slate-300">Violation contrainte UNIQUE</td>
                <td className="py-2.5 px-4 text-slate-400">Tentative d&apos;insertion d&apos;un email ou identifiant déjà existant.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-purple-400 font-bold">ER_NO_REFERENCED_ROW_2</td>
                <td className="py-2.5 px-4 text-slate-300">Clé étrangère orpheline</td>
                <td className="py-2.5 px-4 text-slate-400">Insertion d&apos;une commande avec un <code className="text-amber-300">user_id: 999</code> qui n&apos;existe pas dans la table <code className="text-emerald-300">users</code>.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-pink-400 font-bold">ER_ROW_IS_REFERENCED_2</td>
                <td className="py-2.5 px-4 text-slate-300">Suppression bloquée</td>
                <td className="py-2.5 px-4 text-slate-400">Suppression d&apos;un utilisateur possédant encore des commandes actives liées par contrainte.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Requêtes préparées et sécurité */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-emerald-400" />
          2. Requêtes préparées : Sécurité et élimination des bugs de typage
        </h3>
        <p className="leading-relaxed">
          Concaténer des chaînes de caractères pour injecter des variables dans vos requêtes SQL est une faute professionnelle majeure : cela ouvre des vulnérabilités critiques d&apos;injection SQL et génère des erreurs de guillemets dès qu&apos;une chaîne contient une apostrophe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/10 space-y-2">
            <span className="font-bold text-red-400 text-sm">❌ Anti-pattern dangereux (Concaténation)</span>
            <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-red-300 overflow-x-auto">
{`// 🚨 Vulnérable aux injections SQL et casse si le nom contient un quote
const query = \`SELECT * FROM users WHERE email = '\${req.body.email}'\`;
const [rows] = await pool.query(query);`}
            </pre>
            <p className="text-xs text-red-300/80">Si l&apos;email vaut &quot;admin&apos; --&quot;, la clause WHERE est neutralisée.</p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-2">
            <span className="font-bold text-emerald-400 text-sm">✅ Standard Professionnel (Requête préparée)</span>
            <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-emerald-300 overflow-x-auto">
{`// 🛡️ Sûr : Le pilote sépare le plan d'exécution des paramètres
const sql = "SELECT id, name, email FROM users WHERE email = ?";
const [rows] = await pool.execute(sql, [req.body.email]);`}
            </pre>
            <p className="text-xs text-emerald-300/80">Les valeurs sont échappées et typées automatiquement par le moteur MySQL.</p>
          </div>
        </div>
      </div>

      {/* 3. Débogage des jointures relationnelles */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-emerald-400" />
          3. Diagnostic des jointures erronées
        </h3>
        <p className="leading-relaxed">
          Lors d&apos;un <code className="text-emerald-300 font-mono">INNER JOIN</code> ou <code className="text-emerald-300 font-mono">LEFT JOIN</code>, une erreur fréquente consiste à joindre deux tables sur leurs clés primaires respectives au lieu de lier la clé primaire à la clé étrangère.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
          <div className="text-red-400 font-bold">
            {`-- ❌ MAUVAISE JOINTURE : Compare users.id (1, 2) avec orders.id (101, 102) -> 0 résultat !`}
          </div>
          <pre className="text-red-300 overflow-x-auto">
{`SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.id;`}
          </pre>
          <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
            {`-- ✅ BONNE JOINTURE : Compare users.id avec la clé étrangère orders.user_id`}
          </div>
          <pre className="text-emerald-300 overflow-x-auto">
{`SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;`}
          </pre>
        </div>
      </div>

      {/* 4. Optimisation EXPLAIN */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="sparkles" className="w-5 h-5 text-emerald-400" />
          4. Diagnostic des requêtes lentes avec EXPLAIN
        </h3>
        <p className="leading-relaxed">
          Une requête syntaxiquement valide peut bloquer le serveur si elle effectue un scan complet de table (<em>Full Table Scan</em>). En préfixant votre requête de <code className="text-emerald-300 font-mono">EXPLAIN</code> dans le terminal ou phpMyAdmin, MySQL révèle sa stratégie d&apos;exécution.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
          <div className="text-slate-400 font-sans font-bold text-sm">Exemple d&apos;analyse EXPLAIN :</div>
          <pre className="text-slate-200 overflow-x-auto">
{`EXPLAIN SELECT * FROM users WHERE email = 'client@domaine.com';`}
          </pre>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs">
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-amber-400 font-bold block">type: ALL</span>
              <span className="text-slate-400">Alerte : scanne 100% de la table, très lent sur de grands volumes.</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-emerald-400 font-bold block">type: ref / const</span>
              <span className="text-slate-400">Optimal : utilise un index direct B-Tree pour cibler les lignes.</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-sky-400 font-bold block">Solution d&apos;indexation</span>
              <span className="text-slate-400">CREATE INDEX idx_users_email ON users(email);</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chapitre10Content;
