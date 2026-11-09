'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type InjectionPayloadKey = 'auth_bypass' | 'union_extraction' | 'time_blind' | 'order_by_injection';

interface InjectionScenario {
  title: string;
  badge: string;
  badgeColor: string;
  injectionType: string;
  payloadInput: string;
  vulnerableSqlQuery: string;
  vulnerableExecutionResult: string;
  securedSqlQuery: string;
  securedExecutionResult: string;
  technicalExplanation: string;
  defenseCode: string;
}

const INJECTION_SCENARIOS: Record<InjectionPayloadKey, InjectionScenario> = {
  auth_bypass: {
    title: '1. Contournement d\'Authentification par Tautologie (\' OR 1=1 --)',
    badge: 'Auth Bypass Critique',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    injectionType: 'In-Band Tautology (CWE-89)',
    payloadInput: `admin' OR '1'='1' -- `,
    vulnerableSqlQuery: `SELECT * FROM users WHERE email = 'admin' OR '1'='1' -- ' AND password = 'hash';`,
    vulnerableExecutionResult: 'Authentification réussie en tant qu\'Administrateur sans mot de passe ! La clause OR 1=1 rend la condition toujours vraie et le commentaire -- ignore le reste de la requête.',
    securedSqlQuery: `SELECT * FROM users WHERE email = ? AND password = ?; (Paramètre 1 = "admin' OR '1'='1' -- ")`,
    securedExecutionResult: 'Échec de connexion (HTTP 401). MySQL recherche littéralement un utilisateur dont l\'email contient la chaîne brute "admin\' OR \'1\'=\'1\' --", qui n\'existe pas.',
    technicalExplanation: 'Dans la version vulnérable, la chaîne injectée brise le délimiteur apostrophe et injecte un nouvel opérateur logique OR dans l\'Abstract Syntax Tree (AST) du parseur SQL.',
    defenseCode: `// ✅ SÉCURISATION AVEC REQUÊTE PRÉPARÉE (mysql2)
const [users] = await db.execute(
  'SELECT id, email, role FROM users WHERE email = ? AND password_hash = ?',
  [inputEmail, hashedInputPassword]
);

if (users.length === 0) {
  return res.status(401).json({ error: 'Identifiants invalides' });
}`,
  },
  union_extraction: {
    title: '2. Fuite de Données par UNION SELECT (Exfiltration de Hashs)',
    badge: 'Fuite Massive BDD',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    injectionType: 'UNION-based SQLi',
    payloadInput: `' UNION SELECT id, username, password_hash, email FROM admin_users -- `,
    vulnerableSqlQuery: `SELECT id, name, description, price FROM products WHERE name = '' UNION SELECT id, username, password_hash, email FROM admin_users -- ';`,
    vulnerableExecutionResult: 'La réponse API renvoie les enregistrements de la table secrète admin_users sous forme d\'articles du catalogue e-commerce !',
    securedSqlQuery: `SELECT id, name, description, price FROM products WHERE name = ?;`,
    securedExecutionResult: 'Résultat : [] (Aucun produit ne possède ce nom). La commande UNION n\'est pas exécutée car elle est traitée comme une chaîne de caractères inoffensive.',
    technicalExplanation: 'L\'opérateur UNION permet de concaténer les résultats d\'une requête arbitraire avec la requête d\'origine si le nombre et les types de colonnes concordent.',
    defenseCode: `// ✅ PROJECTION SÉLECTIONNÉE + PARAMÈTRE LIÉ
const [products] = await db.execute(
  'SELECT id, name, price FROM products WHERE name LIKE ?',
  [\`%\${searchQuery}%\`] // Le joker LIKE est intégré dans la valeur, pas dans le SQL
);`,
  },
  time_blind: {
    title: '3. Injection Aveugle Temporelle (Blind Time-based avec SLEEP)',
    badge: 'Inférence Temporelle',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    injectionType: 'Blind Time-based SQLi',
    payloadInput: `x' OR IF(SUBSTRING(VERSION(),1,1)='8', SLEEP(4), 0) -- `,
    vulnerableSqlQuery: `SELECT * FROM articles WHERE slug = 'x' OR IF(SUBSTRING(VERSION(),1,1)='8', SLEEP(4), 0) -- ';`,
    vulnerableExecutionResult: 'L\'API met exactement 4 020 ms à répondre ! Même si aucun message d\'erreur n\'apparaît, le pirate sait avec certitude que la version de MySQL est 8.x.',
    securedSqlQuery: `SELECT * FROM articles WHERE slug = ?;`,
    securedExecutionResult: 'L\'API répond en 12 ms avec un 404 Not Found. La fonction SLEEP(4) n\'est jamais évaluée par le moteur SQL.',
    technicalExplanation: 'Lorsque l\'application ne retourne aucune donnée à l\'écran, un attaquant peut mesurer le temps d\'attente de la réponse HTTP pour inférer la valeur de chaque caractère de la BDD un par un.',
    defenseCode: `// ✅ AUCUNE POSSIBILITÉ D'EXÉCUTION DYNAMIQUE
const [articles] = await db.execute(
  'SELECT id, title, content FROM articles WHERE slug = ? LIMIT 1',
  [req.params.slug]
);`,
  },
  order_by_injection: {
    title: '4. Injection dans les Clauses Dynamiques (ORDER BY sans Index)',
    badge: 'Tri Non Paramétrable',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    injectionType: 'Dynamic Identifier SQLi (CWE-89)',
    payloadInput: `(CASE WHEN (SELECT 1) THEN price ELSE id END)`,
    vulnerableSqlQuery: `SELECT id, name, price FROM products ORDER BY (CASE WHEN (SELECT 1) THEN price ELSE id END);`,
    vulnerableExecutionResult: 'L\'attaquant injecte du SQL conditionnel directement dans la clause de tri ORDER BY, contournant les protections usuelles.',
    securedSqlQuery: `SELECT id, name, price FROM products ORDER BY price ASC;`,
    securedExecutionResult: 'Tri validé et appliqué selon une liste blanche stricte prédéfinie.',
    technicalExplanation: 'Dans le standard SQL, les identifiants (noms de tables, noms de colonnes, sens de tri ASC/DESC) NE PEUVENT PAS être remplacés par le paramètre ?. Seule une liste blanche (Whitelisting) garantit la sécurité.',
    defenseCode: `// ✅ PROTECTION ABSOLUE PAR LISTE BLANCHE (WHITELISTING)
const ALLOWED_SORT_COLUMNS = ['price', 'name', 'created_at', 'id'] as const;
type SortColumn = typeof ALLOWED_SORT_COLUMNS[number];

const sortBy: SortColumn = ALLOWED_SORT_COLUMNS.includes(req.query.sort as SortColumn)
  ? (req.query.sort as SortColumn)
  : 'created_at';

const orderDirection = req.query.order === 'desc' ? 'DESC' : 'ASC';

// La colonne provient d'une liste blanche inviolable, le paramètre LIMIT est préparé
const [rows] = await db.execute(
  \`SELECT id, name, price FROM products ORDER BY \${sortBy} \${orderDirection} LIMIT ?\`,
  [20]
);`,
  },
};

export const Chapitre9Content: React.FC = () => {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<InjectionPayloadKey>('auth_bypass');
  const [isProtectedMode, setIsProtectedMode] = useState<boolean>(false);
  const activeScenario = INJECTION_SCENARIOS[selectedScenarioKey];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="shield" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — Détecter et Neutraliser les Injections SQL (Prepared Statements & Whitelisting)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Pourquoi la concaténation de chaînes détruit la frontière Code/Données, maîtriser les requêtes préparées avec le driver <code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">mysql2</code>, déjouer les Blind SQLi et sécuriser les clauses de tri dynamiques.
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
            <span>Comprendre le principe fondamental de séparation entre l&apos;arbre syntaxique SQL et les paramètres littéraux.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Reconnaître les différents vecteurs : Tautologie (OR 1=1), UNION Select et Blind Time-based (SLEEP).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Mettre en œuvre systématiquement les Requêtes Préparées (<code className="text-xs bg-slate-200 px-1 py-0.5 rounded">db.execute()</code>).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Sécuriser les clauses non paramétrables (<code className="text-xs bg-slate-200 px-1 py-0.5 rounded">ORDER BY</code>, noms de tables) par liste blanche stricte.</span>
          </div>
        </div>
      </section>

      {/* 1. Pourquoi l'injection SQL existe-t-elle ? */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-indigo-600" />
          1. Le Mécanisme Intime de l&apos;Injection SQL : La Confusion Code vs Données
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Une base de données relationnelle comme MySQL analyse les requêtes textuelles à travers un <strong>analyseur syntaxique (Lexer / Parser)</strong>. 
          Lorsque vous construisez une requête SQL par concaténation de chaînes (<code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">`SELECT * FROM users WHERE email = &apos;${'{email}'}&apos;`</code>), 
          les données utilisateur non fiables sont mélangées directement avec les mots-clés du langage SQL.
        </p>

        <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 space-y-3">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
            Ce qui se passe dans le moteur de base de données :
          </h3>
          <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
            <p>
              1. <strong>Si l&apos;utilisateur entre :</strong> <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-xs">alice@test.com</code><br />
              MySQL compile : <code className="bg-slate-800 text-emerald-400 px-1 py-0.5 rounded font-mono text-xs">WHERE email = &apos;alice@test.com&apos;</code> (Comportement normal).
            </p>
            <p>
              2. <strong>Si l&apos;attaquant injecte :</strong> <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-xs">admin&apos; OR 1=1 -- </code><br />
              MySQL compile : <code className="bg-slate-800 text-rose-400 px-1 py-0.5 rounded font-mono text-xs">WHERE email = &apos;admin&apos; OR 1=1 -- &apos;</code>.<br />
              L&apos;apostrophe <strong>ferme prématurément le littéral de chaîne</strong>. Le mot-clé <code className="font-mono font-bold text-rose-600">OR</code> devient une instruction logique dans l&apos;arbre de calcul. Le commentaire <code className="font-mono font-bold text-slate-400">-- </code> désactive le reste de la requête !
            </p>
          </div>
        </div>

        <Callout type="warning" title="Le piège des fonctions d'échappement faites maison">
          <p className="text-xs sm:text-sm">
            N&apos;essayez JAMAIS de remplacer les apostrophes avec un <code className="font-mono text-xs">input.replace(&quot;&apos;&quot;, &quot;\\&apos;&quot;)</code> ! 
            Les attaquants contournent ces filtres avec des encodages multiniveaux, des caractères Unicode ou des jeux de caractères exotiques (ex: GBK / Big5 SQL Injection). 
            La <strong>seule et unique solution fiable</strong> est l&apos;utilisation des Requêtes Préparées.
          </p>
        </Callout>
      </section>

      {/* 2. Le Rempart Absolu : Les Requêtes Préparées (Prepared Statements) */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="shield" className="w-5 h-5 text-emerald-600" />
          2. Comment les Requêtes Préparées Neutralisent 100% des Injections
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Dans une requête préparée (<code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">db.execute(sql, [params])</code>), l&apos;échange avec MySQL se déroule en deux étapes étanches :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
              Étape 1 : Compilation du Squelette
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le serveur envoie le modèle de requête avec des marqueurs de position (<code className="font-mono text-xs">?</code>) : <br />
              <code className="font-mono text-xs text-slate-900 bg-slate-200 px-1 py-0.5 rounded">SELECT * FROM users WHERE email = ?</code>.<br />
              MySQL compile l&apos;arbre syntaxique une fois pour toutes. <strong>La structure de la requête est gravée dans le marbre</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Étape 2 : Envoi Binaire des Paramètres
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le driver transmet les valeurs des paramètres dans un paquet réseau binaire séparé. Même si la valeur injectée contient <code className="font-mono text-xs">&apos; OR 1=1 --</code>, MySQL ne réévalue pas le code : il recherche littéralement un utilisateur dont l&apos;email correspond à cette chaîne brute.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Simulateur Interactif d'Injection SQL */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          3. Laboratoire Interactif : Testeur d&apos;Injections & Comparateur de Mode
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Testez différentes charges utiles malveillantes et basculez entre le mode vulnérable (concaténation) et le mode sécurisé (requête préparée) :
        </p>

        {/* Boutons sélecteurs de payload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(INJECTION_SCENARIOS) as InjectionPayloadKey[]).map((key) => {
            const sc = INJECTION_SCENARIOS[key];
            const isSelected = selectedScenarioKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedScenarioKey(key)}
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
                <div className="mt-2 text-[10px] font-mono text-slate-500">
                  {sc.injectionType.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Panneau de simulation */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{activeScenario.injectionType}</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{activeScenario.title}</h3>
            </div>
            
            {/* Toggle de protection */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setIsProtectedMode(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !isProtectedMode
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mode Concaténation (Vulnérable)
              </button>
              <button
                type="button"
                onClick={() => setIsProtectedMode(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isProtectedMode
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mode Requête Préparée (Sécurisé)
              </button>
            </div>
          </div>

          {/* Charge utile injectée */}
          <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Entrée Utilisateur Injectée dans la Requête :</span>
            <div className="text-amber-200 break-all">{activeScenario.payloadInput}</div>
          </div>

          {/* Visualisation SQL compilée */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              Requête Reçue et Compilée par MySQL :
            </span>
            <CodeBlock
              code={isProtectedMode ? activeScenario.securedSqlQuery : activeScenario.vulnerableSqlQuery}
              language="sql"
            />
          </div>

          {/* Résultat d'exécution */}
          <div className={`p-4 rounded-xl border text-xs sm:text-sm font-medium ${
            isProtectedMode
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="font-bold mb-1">
              {isProtectedMode ? '🛡️ Comportement Sécurisé :' : '💥 Brèche de Sécurité Exécutée :'}
            </div>
            <div>
              {isProtectedMode ? activeScenario.securedExecutionResult : activeScenario.vulnerableExecutionResult}
            </div>
          </div>

          {/* Solution & Code de défense */}
          <div>
            <div className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600" />
              <span>Implémentation du Rempart d&apos;Ingénierie :</span>
            </div>
            <CodeBlock code={activeScenario.defenseCode} language="typescript" />
          </div>
        </div>
      </section>

      {/* 4. Cas Réel Entreprise : L'Incident de la Billetterie FestiPass */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          4. Étude de Cas Réelle : La Faille ORDER BY chez FestiPass
        </h2>
        <div className="border-2 border-rose-200 bg-rose-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-1 rounded-md">
              Fuite de Base de Données Complète
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Outil utilisé : sqlmap</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>Le Contexte :</strong> Les développeurs de FestiPass avaient consciencieusement utilisé des requêtes préparées avec <code className="bg-slate-800 text-slate-100 px-1 py-0.5 rounded font-mono text-xs">?</code> sur toutes les clauses <code className="font-mono text-xs">WHERE</code> de leur API. Ils se croyaient 100% protégés contre les injections SQL.
            </p>
            <p>
              <strong>L&apos;Angle Mort :</strong> Pour permettre aux utilisateurs de trier les concerts, ils avaient écrit : <br />
              <code className="bg-slate-800 text-rose-300 px-1.5 py-0.5 rounded font-mono text-xs">
                db.query(`SELECT * FROM events ORDER BY ${'{req.query.sort}'}`)
              </code>.<br />
              Comme MySQL ne permet pas de paramétrer les noms de colonnes avec un <code className="font-mono text-xs">?</code>, ils ont naïvement utilisé une interpolation de template string.
            </p>
            <p>
              <strong>L&apos;Attaque :</strong> Un pirate a détecté la faille en injectant <code className="bg-slate-800 text-slate-100 px-1 py-0.5 rounded font-mono text-xs">?sort=(CASE WHEN 1=1 THEN id ELSE name END)</code>. Avec l&apos;outil automatisé <strong>sqlmap</strong>, il a extrait la totalité des tables de paiements et les mots de passe hachés des 180 000 utilisateurs du festival en moins de 30 minutes.
            </p>
            <p>
              <strong>La Correction :</strong> Application d&apos;une liste blanche stricte vérifiant que <code className="font-mono text-xs text-emerald-800 font-bold">req.query.sort</code> appartient à un tableau fermé de chaînes autorisées (<code className="font-mono text-xs">[&apos;date&apos;, &apos;price&apos;, &apos;title&apos;]</code>).
            </p>
          </div>
        </div>
      </section>

      {/* 5. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Injections SQL & Requêtes Préparées (Chapitre 5.9)"
          questions={[
            {
              id: 1,
              question: "Pourquoi une requête préparée utilisant le marqueur '?' protège-t-elle contre les injections SQL ?",
              options: [
                "Parce qu'elle chiffre les tables de la base de données avec l'algorithme AES-256.",
                "Parce que la structure syntaxique (AST) de la requête est compilée avant l'injection des paramètres, forçant le moteur BDD à traiter les entrées utilisateur exclusivement comme des littéraux et jamais comme du code exécutable.",
                "Parce qu'elle supprime automatiquement toutes les apostrophes envoyées par le client.",
                "Parce qu'elle désactive le moteur InnoDB de MySQL."
              ],
              correctIndex: 1,
              explanation: "Dans une requête préparée, le compilateur SQL fige la logique de la requête lors de la phase 'prepare'. Même si le paramètre contient ' OR 1=1 --, il ne peut plus modifier l'arbre syntaxique.",
            },
            {
              id: 2,
              question: "Pourquoi ne peut-on PAS utiliser un marqueur '?' pour paramétrer le nom d'une colonne dans une clause ORDER BY ?",
              options: [
                "Parce que les développeurs de MySQL ont oublié d'implémenter cette fonctionnalité.",
                "Parce que le standard SQL exige que les identifiants de schéma (tables, colonnes) soient connus dès la phase de compilation pour déterminer les index et plans d'accès, alors que '?' ne remplace que des valeurs de données (littéraux).",
                "Parce que le mot-clé ORDER BY est obsolète depuis SQL-92.",
                "Parce que cela ferait planter la carte réseau du serveur."
              ],
              correctIndex: 1,
              explanation: "Les paramètres préparés '?' ne s'appliquent qu'aux valeurs scalaires (chaînes, nombres, dates). Les identifiants structurels (colonnes, tables) doivent être validés en amont via une liste blanche stricte côté Node.js.",
            },
            {
              id: 3,
              question: "Quelle est la meilleure technique pour sécuriser une clause 'ORDER BY' dynamique contrôlée par l'utilisateur ?",
              options: [
                "Échapper les caractères spéciaux avec encodeURIComponent().",
                "Utiliser une liste blanche stricte (Whitelisting) comparant le paramètre reçu à un tableau de colonnes autorisées prédéfinies.",
                "Ajouter des guillemets doubles autour du paramètre.",
                "Augmenter le délai de timeout de la requête."
              ],
              correctIndex: 1,
              explanation: "La liste blanche garantit que seules les colonnes expressément autorisées par le développeur peuvent être injectées dans la requête, éliminant tout risque d'injection de sous-requête SQL.",
            },
            {
              id: 4,
              question: "En quoi consiste une attaque par injection SQL aveugle temporelle (Blind Time-based SQLi) ?",
              options: [
                "Une attaque menée les yeux fermés sans regarder l'écran.",
                "Une technique où l'attaquant injecte une fonction de temporisation (comme SLEEP(5)) conditionnée à une vérité logique pour déduire le contenu de la base de données lettre par lettre en observant le temps de réponse HTTP du serveur.",
                "Une attaque qui modifie l'heure du serveur d'application.",
                "Une coupure de courant provoquée sur le serveur MySQL."
              ],
              correctIndex: 1,
              explanation: "Lorsque l'API ne renvoie aucun message d'erreur ni aucune donnée visible, l'attaquant utilise des conditions booléennes associées à un SLEEP() pour inférer les données grâce à la latence réseau.",
            },
            {
              id: 5,
              question: "Pourquoi est-il dangereux de renvoyer le message 'error.message' ou 'error.sql' brut dans la réponse HTTP 500 en cas d'erreur de base de données ?",
              options: [
                "Parce que cela ralentit la vitesse d'affichage du navigateur.",
                "Parce que les messages d'erreurs SQL détaillés révèlent la structure interne des tables, les noms des colonnes et parfois des fragments de requêtes, facilitant considérablement le travail d'exploitation d'un pirate (Error-based SQLi).",
                "Parce que Google Chrome bloque les pages contenant des erreurs.",
                "Parce que cela annule la transaction courante."
              ],
              correctIndex: 1,
              explanation: "L'affichage des erreurs internes de BDD offre à l'attaquant une radiographie de votre schéma. En production, journalisez l'erreur côté serveur et ne renvoyez au client qu'un message générique (ex: 'Erreur interne du serveur').",
            },
            {
              id: 6,
              question: "Dans le driver 'mysql2/promise', quelle est la différence entre pool.query() et pool.execute() ?",
              options: [
                "pool.query() est payant alors que pool.execute() est gratuit.",
                "pool.execute() prépare la requête au niveau du serveur MySQL (véritable Prepared Statement côté serveur avec mise en cache du plan d'exécution), offrant des garanties de sécurité et de performances optimales.",
                "pool.execute() supprime la base de données après exécution.",
                "Il n'y a absolument aucune différence entre les deux méthodes."
              ],
              correctIndex: 1,
              explanation: "pool.execute() utilise le protocole binaire natif de MySQL pour préparer la requête sur le serveur, garantissant une protection mathématique absolue contre les injections et réutilisant le plan d'exécution compilé.",
            },
          ]}
        />
      </div>
    </div>
  );
};
