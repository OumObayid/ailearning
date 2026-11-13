'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type SqlScenarioKey =
  | 'dup_entry'
  | 'foreign_key_orphan'
  | 'sql_injection_defense'
  | 'wrong_join_clause'
  | 'explain_full_scan';

interface SqlScenario {
  title: string;
  badge: string;
  badgeColor: string;
  errorCode: string;
  symptom: string;
  buggySql: string;
  fixedSql: string;
  httpStatusMapping: string;
  explanation: string;
}

const SQL_SCENARIOS: Record<SqlScenarioKey, SqlScenario> = {
  dup_entry: {
    title: '1. Violation de contrainte UNIQUE (ER_DUP_ENTRY 1062)',
    badge: 'Code 1062 / UNIQUE',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    errorCode: 'ER_DUP_ENTRY (errno: 1062)',
    symptom: 'Le client soumet un formulaire d\'inscription. Le serveur crash avec : "Duplicate entry \'sarah@domain.com\' for key \'users.email\'".',
    buggySql: `// ❌ Mauvaise pratique : Laisser l'exception crasher en HTTP 500
await pool.execute(
  'INSERT INTO users (name, email) VALUES (?, ?)',
  [name, email]
);`,
    fixedSql: `// ✅ Pratique robuste : Intercepter l'erreur 1062 et renvoyer HTTP 409 Conflict
try {
  await pool.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  return res.status(201).json({ success: true });
} catch (error: any) {
  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      type: 'https://api.eshop.fr/errors/conflict',
      title: 'Conflit de ressource',
      status: 409,
      detail: 'Cette adresse email est déjà associée à un compte existant.'
    });
  }
  throw error;
}`,
    httpStatusMapping: 'Mapper impérativement ER_DUP_ENTRY vers HTTP 409 Conflict (ou 422 Unprocessable Content), JAMAIS vers HTTP 500.',
    explanation: 'Le moteur relationnel garantit l\'unicité de la colonne grâce à un index UNIQUE B-Tree. Le code applicatif doit traduire cette contrainte relationnelle en statut REST compréhensible par l\'utilisateur.'
  },
  foreign_key_orphan: {
    title: '2. Clé étrangère orpheline (ER_NO_REFERENCED_ROW_2 1452)',
    badge: 'Code 1452 / Foreign Key',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    errorCode: 'ER_NO_REFERENCED_ROW_2 (errno: 1452)',
    symptom: 'Tentative d\'insertion d\'une commande avec un customer_id qui n\'existe pas dans la table customers : "Cannot add or update a child row: a foreign key constraint fails".',
    buggySql: `// Insertion aveugle sans valider la dépendance parente
const [result] = await pool.execute(
  'INSERT INTO orders (customer_id, amount) VALUES (?, ?)',
  [req.body.customerId, req.body.amount] // Si customerId = 99999 -> CRASH 1452 !
);`,
    fixedSql: `// Vérification préalable ou capture fine de l'erreur relationnelle
try {
  await pool.execute(
    'INSERT INTO orders (customer_id, amount) VALUES (?, ?)',
    [customerId, amount]
  );
} catch (error: any) {
  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(422).json({
      error: 'PARENT_RESOURCE_NOT_FOUND',
      message: \`Le client #\${customerId} n'existe pas. Impossible de créer la commande.\`
    });
  }
  throw error;
}`,
    httpStatusMapping: 'Mapper vers HTTP 422 Unprocessable Content (données incohérentes) ou HTTP 404 (ressource liée introuvable).',
    explanation: 'La contrainte de clé étrangère (FOREIGN KEY) empêche la création de tuples orphelins. Si l\'enregistrement parent n\'existe pas, MySQL bloque l\'écriture.'
  },
  sql_injection_defense: {
    title: '3. Injection SQL vs Requête Préparée Paramétrée',
    badge: 'Faille Critique / Invalidation',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    errorCode: 'Vulnérabilité OWASP A03:2021',
    symptom: 'Un utilisateur envoie comme mot de passe : "\' OR \'1\'=\'1" ou un nom avec apostrophe "L\'Oréal" qui casse la syntaxe SQL.',
    buggySql: `// ❌ CODE VULNÉRABLE ET INSTABLE : Concaténation de chaîne
const sql = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
// Si email = "test' OR '1'='1" -> Renvoie le premier compte de la base (Admin) !
const [rows] = await pool.query(sql);`,
    fixedSql: `// ✅ STANDARD PROFESSIONNEL : Requête préparée avec placeholder '?'
const sql = "SELECT id, name, email FROM users WHERE email = ?";
// Le driver mysql2 sépare strictement le code SQL des valeurs littérales
const [rows] = await pool.execute(sql, [req.body.email]);`,
    httpStatusMapping: 'Protection native : les caractères spéciaux (\', ", ;, --) sont traités comme des données littérales pures, neutralisant l\'attaque.',
    explanation: 'Dans une requête préparée, MySQL compile d\'abord l\'arbre syntaxique SQL, puis insère les valeurs dans des registres séparés. Une injection SQL est mathématiquement impossible par conception.'
  },
  wrong_join_clause: {
    title: '4. Clause de jointure erronée (users.id = orders.id)',
    badge: 'Bug Logique / 0 Résultat',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    errorCode: 'Anomalie Sémantique Silencieuse',
    symptom: 'La requête ne lève aucune erreur SQL mais renvoie un tableau vide [] alors que la base contient 500 commandes.',
    buggySql: `// ❌ ERREUR DE DÉBUTANT : Jointure sur les deux clés primaires
SELECT u.name, o.total, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.id; -- 💥 Compare users.id (1, 2, 3) avec orders.id (101, 102...) !`,
    fixedSql: `// ✅ BONNE JOINTURE : Clé primaire liée à la Clé Étrangère
SELECT u.name, o.total, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id; -- Lie la PK de l'utilisateur à la FK de la commande`,
    httpStatusMapping: 'Ce bug logique ne déclenche aucun code d\'erreur SQL : il produit un 200 OK avec tableau vide, trompant le développeur.',
    explanation: 'Une jointure relationnelle doit toujours relier la clé primaire du parent (users.id) à la colonne clé étrangère correspondante dans la table enfant (orders.user_id).'
  },
  explain_full_scan: {
    title: '5. Diagnostic de lenteur extrême avec EXPLAIN (Full Table Scan)',
    badge: 'Performance / Indexation',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    errorCode: 'Scan type: ALL (Full Table Scan)',
    symptom: 'La requête SELECT * FROM products WHERE sku = \'ABC-123\' prend 1,4 seconde et fait chauffer le CPU du serveur MySQL.',
    buggySql: `// Analyse via EXPLAIN dans MySQL :
EXPLAIN SELECT * FROM products WHERE sku = 'ABC-123';
-- Résultat :
-- type: ALL (Full Scan)
-- rows: 450 000 (MySQL lit 450 000 lignes sur le disque !)
-- key: NULL (Aucun index utilisé)`,
    fixedSql: `// Solution : Créer un index B-Tree sur la colonne de filtrage :
CREATE INDEX idx_products_sku ON products(sku);

// Nouvelle analyse EXPLAIN :
EXPLAIN SELECT * FROM products WHERE sku = 'ABC-123';
-- Résultat après index :
-- type: ref / const
-- rows: 1 (Accès direct en 0.2 milliseconde !)
-- key: idx_products_sku`,
    httpStatusMapping: 'Le temps de réponse de l\'API passe de 1400 ms à 3 ms, évitant l\'épuisement des connexions du pool.',
    explanation: 'Sans index, MySQL doit charger et parcourir toutes les pages du disque dur pour trouver un enregistrement. L\'index B-Tree permet un ciblage logarithmique O(log N).'
  }
};

export const Chapitre10Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<SqlScenarioKey>('dup_entry');
  const scenario = SQL_SCENARIOS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 10 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            SQL &amp; Database Diagnostics
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Analyse des requêtes SQL et des erreurs de base de données : Intégrité relationnelle, requêtes préparées et EXPLAIN
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Une base de données relationnelle MySQL n&apos;est pas un simple conteneur de données : c&apos;est un arbitre strict
          d&apos;intégrité. Ses contraintes d&apos;unicité (<code>UNIQUE</code>), ses clés étrangères (<code>FOREIGN KEY</code>)
          et ses types de colonnes protègent votre système. Comprendre ses codes d&apos;erreurs permet de traduire instantanément
          un rejet de base de données en une réponse API REST limpide, sans jamais exposer de crash 500 opaque.
        </p>
      </div>

      {/* 1. Matrice des codes d'erreurs MySQL */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Matrice des codes d&apos;erreurs MySQL les plus répandus
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-bold">
                <th className="py-3 px-4">Code d&apos;erreur MySQL</th>
                <th className="py-3 px-4">Code Numérique</th>
                <th className="py-3 px-4">Nature de l&apos;Anomalie</th>
                <th className="py-3 px-4">Traduction HTTP REST recommandée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              <tr>
                <td className="py-3 px-4 text-rose-600 font-mono font-bold">ER_NO_SUCH_TABLE</td>
                <td className="py-3 px-4 font-mono text-slate-600">1146</td>
                <td className="py-3 px-4 text-slate-800">Table absente ou faute de casse (ex: <code>Users</code> vs <code>users</code> sous Linux).</td>
                <td className="py-3 px-4 text-slate-700"><code>500 Server Bug</code> (Corriger le nom de table)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-rose-600 font-mono font-bold">ER_BAD_FIELD_ERROR</td>
                <td className="py-3 px-4 font-mono text-slate-600">1054</td>
                <td className="py-3 px-4 text-slate-800">Colonne inexistante dans la table (faute de frappe dans SELECT / WHERE).</td>
                <td className="py-3 px-4 text-slate-700"><code>500 Server Bug</code> (Vérifier DESCRIBE table)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-amber-600 font-mono font-bold">ER_DUP_ENTRY</td>
                <td className="py-3 px-4 font-mono text-slate-600">1062</td>
                <td className="py-3 px-4 text-slate-800">Violation de contrainte UNIQUE (email ou identifiant déjà pris).</td>
                <td className="py-3 px-4 text-slate-700 font-bold text-amber-800"><code>409 Conflict</code></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-purple-600 font-mono font-bold">ER_NO_REFERENCED_ROW_2</td>
                <td className="py-3 px-4 font-mono text-slate-600">1452</td>
                <td className="py-3 px-4 text-slate-800">Clé étrangère parente inexistante lors d&apos;un INSERT (ex: userId orphelin).</td>
                <td className="py-3 px-4 text-slate-700 font-bold text-purple-800"><code>422 Unprocessable Content</code></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-blue-600 font-mono font-bold">ER_ROW_IS_REFERENCED_2</td>
                <td className="py-3 px-4 font-mono text-slate-600">1451</td>
                <td className="py-3 px-4 text-slate-800">Suppression impossible : des enregistrements enfants sont liés par contrainte.</td>
                <td className="py-3 px-4 text-slate-700 font-bold text-blue-800"><code>409 Conflict</code></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-teal-600 font-mono font-bold">ER_DATA_TOO_LONG</td>
                <td className="py-3 px-4 font-mono text-slate-600">1406</td>
                <td className="py-3 px-4 text-slate-800">Longueur du texte excédant la capacité de la colonne (ex: &gt; VARCHAR(50)).</td>
                <td className="py-3 px-4 text-slate-700 font-bold text-teal-800"><code>422 Unprocessable Content</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Requêtes Préparées : pool.execute vs Concaténation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Requêtes préparées (pool.execute) vs Concaténation : L&apos;imperméabilité absolue
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          La concaténation de variables dans une chaîne SQL est la première source de failles de sécurité dans le monde.
          Voyez comment <code>pool.execute(&apos;... WHERE id = ?&apos;, [id])</code> protège votre application :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border-2 border-rose-200 bg-rose-50/50 space-y-2">
            <div className="font-bold text-rose-800 text-sm">❌ Concaténation naïve (Vulnérable &amp; Fragile)</div>
            <CodeBlock
              language="typescript"
              code={`// Concaténation : LE SCRIPT ET LA DONNÉE SONT MÉLANGÉS
const sql = \`SELECT * FROM users WHERE email = '\${req.body.email}'\`;
// Si email = "l'hopital@mail.com" -> Erreur de syntaxe SQL sur le guillemet !
// Si email = "admin' OR '1'='1" -> Injection SQL fatale !`}
            />
            <p className="text-xs text-rose-950">
              Le moteur MySQL interprète les guillemets de l&apos;utilisateur comme des instructions de structure.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="font-bold text-emerald-800 text-sm">✅ Requête Préparée Paramétrée (Sûre &amp; Typée)</div>
            <CodeBlock
              language="typescript"
              code={`// Requête préparée : PLAN D'EXÉCUTION SÉPARÉ DES DONNÉES
const sql = "SELECT id, name, email FROM users WHERE email = ?";
// MySQL compile d'abord la commande, puis injecte la valeur en binaire pur :
const [rows] = await pool.execute(sql, [req.body.email]);`}
            />
            <p className="text-xs text-emerald-950">
              Les caractères spéciaux (guillemets, points-virgules, tirets) sont traités comme de simples octets de données.
            </p>
          </div>
        </div>

        <Callout type="warning" title="Atomicité et Transactions : Le piège des opérations multi-tables">
          <p className="text-xs sm:text-sm">
            Si une commande e-commerce effectue un <code>INSERT INTO orders</code> suivi d&apos;un <code>UPDATE products SET stock = stock - 1</code>,
            une panne sur la deuxième opération laissera votre base dans un état corrompu.
            Encapsulez toujours ces opérations dans une transaction (<code>START TRANSACTION</code> / <code>COMMIT</code> / <code>ROLLBACK</code>)
            pour garantir la cohérence des données.
          </p>
        </Callout>
      </section>

      {/* 3. Laboratoire Interactif SQL */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Diagnostic des Incidents SQL &amp; Base de Données
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Sélectionnez un scénario pour inspecter l&apos;erreur SQL, la clause défaillante et la stratégie de correction :
        </p>

        {/* Boutons Sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {(Object.keys(SQL_SCENARIOS) as SqlScenarioKey[]).map((key) => {
            const item = SQL_SCENARIOS[key];
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
                <h3 className="text-lg sm:text-xl font-black text-slate-950">{scenario.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
              </div>
              <div className="mt-1 font-mono text-xs text-rose-700 font-bold">
                Code signal : {scenario.errorCode}
              </div>
            </div>

            <div className="text-xs bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 font-semibold">
              {scenario.httpStatusMapping}
            </div>
          </div>

          {/* Symptôme constaté */}
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950">
            <span className="font-bold">Symptôme d&apos;incident : </span>
            {scenario.symptom}
          </div>

          {/* Code fautif vs Code résolu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-rose-600 mb-1.5">
                ❌ Code Fautif ou Vulnérable
              </div>
              <CodeBlock language="typescript" code={scenario.buggySql} />
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-600 mb-1.5">
                ✅ Code Résolu &amp; Protégé
              </div>
              <CodeBlock language="typescript" code={scenario.fixedSql} />
            </div>
          </div>

          {/* Explication */}
          <div className="p-4 rounded-xl bg-lime-50 border border-lime-300 flex items-start gap-3">
            <Icon name="sparkles" className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-lime-950">
              <span className="font-bold">Principe d&apos;ingénierie : </span>
              {scenario.explanation}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TP : Triage automatique des erreurs SQL dans un contrôleur REST */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Implémenter le Mapper d&apos;erreurs SQL vers HTTP
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Ce helper Express convertit automatiquement n&apos;importe quelle exception MySQL en une réponse RFC 9457
          conforme et adaptée, sans jamais laisser fuiter d&apos;erreur 500 :
        </p>

        <CodeBlock
          language="typescript"
          code={`import { Response } from 'express';

export function handleDatabaseError(error: any, res: Response) {
  console.error('[DATABASE ERROR]', {
    code: error.code,
    errno: error.errno,
    sqlMessage: error.sqlMessage
  });

  switch (error.code) {
    case 'ER_DUP_ENTRY':
      return res.status(409).json({
        type: 'https://api.eshop.fr/errors/conflict',
        title: 'Doublon détecté',
        status: 409,
        detail: 'Un enregistrement possédant cette valeur unique existe déjà.'
      });

    case 'ER_NO_REFERENCED_ROW_2':
      return res.status(422).json({
        type: 'https://api.eshop.fr/errors/invalid-reference',
        title: 'Entité parente introuvable',
        status: 422,
        detail: 'L\\x27identifiant lié en clé étrangère n\\x27existe pas.'
      });

    case 'ER_ROW_IS_REFERENCED_2':
      return res.status(409).json({
        type: 'https://api.eshop.fr/errors/dependent-records',
        title: 'Suppression impossible',
        status: 409,
        detail: 'Cet enregistrement est référencé par d\\x27autres données actives.'
      });

    case 'ER_DATA_TOO_LONG':
      return res.status(422).json({
        type: 'https://api.eshop.fr/errors/data-too-long',
        title: 'Donnée trop longue',
        status: 422,
        detail: 'La valeur soumise dépasse la taille maximale autorisée.'
      });

    default:
      // Tout autre incident (table manquante, crash syntaxique) -> 500 sans fuite de code
      return res.status(500).json({
        type: 'https://api.eshop.fr/errors/database-error',
        title: 'Erreur interne de persistance',
        status: 500,
        detail: 'Une anomalie de base de données a été enregistrée.'
      });
  }
}`}
        />
      </section>

      {/* 5. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.10
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Vérifiez vos compétences en diagnostic des requêtes SQL et résolution d&apos;anomalies de persistance :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel code de statut HTTP une API REST doit-elle idéalement renvoyer lorsque MySQL émet une erreur ER_DUP_ENTRY (errno: 1062) lors de la création d'un utilisateur ?",
              options: [
                "HTTP 500 Internal Server Error",
                "HTTP 409 Conflict (ou 422 Unprocessable Content)",
                "HTTP 404 Not Found",
                "HTTP 200 OK avec { error: true }"
              ],
              correctIndex: 1,
              explanation: "ER_DUP_ENTRY signale une tentative de créer une ressource avec une clé déjà existante (conflit d'unicité). Le statut standard RFC est HTTP 409 Conflict (ou 422). Renvoyer 500 est une mauvaise pratique car cela fait croire à un crash serveur."
            },
            {
              id: 2,
              question: "Pourquoi les requêtes préparées (pool.execute('SELECT ... WHERE id = ?', [id])) rendent-elles les injections SQL impossibles ?",
              options: [
                "Parce qu'elles chiffrent la base de données en AES-256.",
                "Parce que le moteur MySQL précompile la structure syntaxique de la requête avant d'injecter les paramètres : les caractères spéciaux sont traités comme de la donnée brute et non comme des commandes SQL.",
                "Parce qu'elles interdisent l'utilisation des chiffres.",
                "Parce qu'elles suppriment les espaces dans les textes."
              ],
              correctIndex: 1,
              explanation: "Dans une requête préparée, le plan d'exécution est figé lors de la phase PREPARE. Les valeurs transmises lors de la phase EXECUTE ne peuvent en aucun cas modifier la structure syntaxique du code, annihilant tout vecteur d'injection."
            },
            {
              id: 3,
              question: "Quelle est la cause de l'erreur MySQL ER_NO_REFERENCED_ROW_2 (errno: 1452) ?",
              options: [
                "La table n'a pas été indexée.",
                "Tentative d'insertion d'un enregistrement dont la clé étrangère pointe vers un ID inexistant dans la table parente.",
                "Le disque dur du serveur MySQL est plein.",
                "La connexion TCP a été coupée par le pare-feu."
              ],
              correctIndex: 1,
              explanation: "Cette contrainte d'intégrité référentielle protège contre les enregistrements orphelins : par exemple, créer une facture avec un customer_id = 450 alors qu'aucun client #450 n'existe dans la table customers."
            },
            {
              id: 4,
              question: "Vous écrivez une requête avec INNER JOIN orders ON users.id = orders.id. La requête s'exécute sans erreur mais retourne 0 résultat alors qu'il y a 200 commandes. Pourquoi ?",
              options: [
                "Parce qu'INNER JOIN est obsolète.",
                "La condition de jointure lie la clé primaire de l'utilisateur (id) à la clé primaire de la commande (id) au lieu de lier users.id à orders.user_id.",
                "Parce que MySQL est éteint.",
                "Parce que la table est trop grande."
              ],
              correctIndex: 1,
              explanation: "C'est l'un des bugs logiques les plus fréquents : joindre id sur id compare deux clés primaires indépendantes. La jointure correcte doit être : ON users.id = orders.user_id."
            },
            {
              id: 5,
              question: "Dans le résultat de la commande EXPLAIN, que signifie un résultat avec 'type: ALL' ?",
              options: [
                "Que la requête est optimisée à 100%.",
                "Que MySQL effectue un Full Table Scan : il lit l'intégralité des lignes de la table sur le disque car aucun index n'a pu être exploité.",
                "Que toutes les tables sont connectées.",
                "Que la requête renvoie toutes les colonnes."
              ],
              correctIndex: 1,
              explanation: "type: ALL indique l'absence d'index pour cette condition WHERE : le moteur est forcé de scanner ligne par ligne toute la table. Sur une table de 1 million de lignes, cela cause des ralentissements majeurs et sature les I/O du disque."
            },
            {
              id: 6,
              question: "Pourquoi une table nommée 'UserTasks' fonctionne-t-elle sur votre machine Windows mais génère une erreur ER_NO_SUCH_TABLE une fois déployée sur un serveur Ubuntu Linux ?",
              options: [
                "Parce que Linux ne supporte pas MySQL.",
                "Parce que sous Windows, les systèmes de fichiers sont insensibles à la casse (case-insensitive), alors que sous Linux les noms de tables respectent strictement les majuscules et minuscules.",
                "Parce que Windows convertit tout en majuscules.",
                "Parce qu'Ubuntu exige des tables en JSON."
              ],
              correctIndex: 1,
              explanation: "Le paramètre système lower_case_table_names de MySQL dépend du système de fichiers sous-jacent. Sous Windows/macOS, la casse est ignorée par défaut, alors que sous Linux 'UserTasks' et 'usertasks' sont deux fichiers totalement distincts."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre10Content;
