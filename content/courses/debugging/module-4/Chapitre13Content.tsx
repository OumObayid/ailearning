'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';
import { BugTriageLab } from '@/components/interactive/BugTriageLab';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Dans server.js, pourquoi le montage des routes applicatives AVANT express.json() provoquait-il des erreurs critiques ?",
    options: [
      "Parce qu'Express interdit de déclarer plus de 2 routes",
      "Le corps des requêtes POST/PUT restait non parsé (req.body valait undefined), empêchant les contrôleurs de lire les données JSON",
      "Cela empêchait MySQL de démarrer",
      "Le port 3000 était automatiquement fermé par Node.js"
    ],
    correctAnswer: 1,
    explanation: "Les middlewares s'exécutent séquentiellement. Si les routes sont déclarées avant express.json(), la requête atteint le contrôleur avant que le flux textuel HTTP n'ait été désérialisé en objet JavaScript dans req.body."
  },
  {
    id: 2,
    question: "Quelle pratique d'écriture SQL dans taskController.js a ouvert une faille critique d'injection SQL ?",
    options: [
      "L'utilisation de mysql2/promise",
      "L'interpolation directe de la variable id dans la chaîne SQL (\`WHERE id = \${id}\`) au lieu d'utiliser des paramètres préparés (?)",
      "L'utilisation de la clause ORDER BY",
      "La définition d'une clé primaire AUTO_INCREMENT"
    ],
    correctAnswer: 1,
    explanation: "La concaténation directe de données utilisateur dans une requête SQL permet à un attaquant d'injecter du code arbitraire (ex: 1 OR 1=1). L'usage de requêtes préparées avec des points d'interrogation (?) délègue l'échappement au moteur MySQL."
  },
  {
    id: 3,
    question: "Pourquoi le middleware d'authentification déclenchait-il systématiquement une erreur 'jwt malformed' ?",
    options: [
      "Le token JWT avait expiré depuis plus d'un an",
      "Le code passait la chaîne complète de l'en-tête (ex: 'Bearer eyJhbGciOi...') directement à jwt.verify() sans retirer le mot 'Bearer '",
      "La clé secrète JWT_SECRET était trop courte",
      "L'en-tête Authorization est refusé par Express"
    ],
    correctAnswer: 1,
    explanation: "Le standard HTTP Authorization envoie le format 'Bearer <token>'. La fonction jwt.verify() attend uniquement la chaîne cryptographique codée en Base64Url sans le mot-clé Bearer."
  },
  {
    id: 4,
    question: "Quelle omission dans un middleware Express provoque l'erreur fatale 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client' ?",
    options: [
      "Oublier de fermer la connexion MySQL",
      "Oublier l'instruction return après res.status(401).json(...), laissant le flux poursuivre son exécution jusqu'à next() ou un deuxième res.json()",
      "Utiliser async/await",
      "Activer le middleware cors()"
    ],
    correctAnswer: 1,
    explanation: "res.json() envoie la réponse HTTP au client mais n'arrête pas l'exécution de la fonction JavaScript. Sans return res.status(401).json(...), le middleware continue et tente d'appeler next() ou un second res.send(), provoquant un crash d'en-tête déjà expédié."
  },
  {
    id: 5,
    question: "Qu'est-ce qu'un statut HTTP 'menteur' dans un gestionnaire d'erreurs d'API ?",
    options: [
      "Un statut 404 renvoyé pour une ressource qui existe",
      "Un gestionnaire qui intercepte un crash serveur ou une exception SQL mais répond au client avec un code HTTP 200 OK en mettant le message d'erreur dans le corps JSON",
      "Un statut 500 retourné sur une erreur de syntaxe",
      "Une redirection 301 automatique"
    ],
    correctAnswer: 1,
    explanation: "Renvoyer HTTP 200 OK lors d'une panne est une aberration d'ingénierie : fetch() juge la requête réussie (response.ok === true) et les outils de monitoring réseau ne détectent aucun incident."
  },
  {
    id: 6,
    question: "Quelle méthode permet de valider de façon défensive un identifiant passé dans l'URL (/api/tasks/:id) avant d'interroger MySQL ?",
    options: [
      "Vérifier if (req.params.id) sans conversion",
      "Transtyper avec const id = Number(req.params.id); et vérifier if (!Number.isInteger(id) || id <= 0) throw new AppError(..., 400)",
      "Appliquer encodeURIComponent sur la chaîne",
      "Lancer une requête SQL pour voir si elle plante"
    ],
    correctAnswer: 1,
    explanation: "Les paramètres d'URL sont toujours reçus en type chaîne (string). Il faut impérativement convertir en nombre, vérifier la finitude avec Number.isInteger() et s'assurer que l'ID est strictement positif avant tout appel BDD."
  }
];

export const Chapitre13Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'anomalies' | 'server' | 'tests' | 'checklist'>('anomalies');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ans]) => {
    const q = quizQuestions.find(item => item.id === Number(qId));
    return q && q.correctAnswer === ans ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-lime-700" />
          <span>Module 4 — Atelier Pratique de Synthèse &amp; Examen</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 13 — TP Final : Diagnostic complet d&apos;une API Express connectée à MySQL (TaskFlow)
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Mission intégrale d&apos;ingénierie backend : l&apos;API de gestion de tâches <strong>TaskFlow</strong> présente 8 anomalies critiques en pré-production. Conflit d&apos;ordre de middlewares, injections SQL par concaténation, malformation de jetons JWT, erreurs <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">ERR_HTTP_HEADERS_SENT</code>, contraintes nulles MySQL bafouées, statuts menteurs HTTP 200 et absence de traçabilité. Auditez, refactorisez, validez avec Postman et certifiez vos compétences.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('anomalies')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'anomalies'
              ? 'bg-slate-900 text-lime-300 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          1. Les 8 Anomalies Identifiées
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('server')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'server'
              ? 'bg-slate-900 text-lime-300 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          2. Code Source Corrigé (TaskFlow API)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'tests'
              ? 'bg-slate-900 text-lime-300 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          3. Tirs de Validation Postman
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'checklist'
              ? 'bg-slate-900 text-lime-300 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          4. Grille d&apos;Évaluation (10 Compétences)
        </button>
      </div>

      {/* Tab 1: Les 8 Anomalies */}
      {activeTab === 'anomalies' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-700">
            Voici la matrice diagnostique complète des 8 anomalies techniques découvertes lors de l&apos;audit d&apos;ingénierie de TaskFlow :
          </p>
          <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
                <tr>
                  <th className="p-3.5 border-b border-slate-200">Défaut</th>
                  <th className="p-3.5 border-b border-slate-200">Composant</th>
                  <th className="p-3.5 border-b border-slate-200">Symptôme observé</th>
                  <th className="p-3.5 border-b border-slate-200">Cause racine d&apos;ingénierie</th>
                  <th className="p-3.5 border-b border-slate-200">Correctif requis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 font-sans">
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-rose-700 font-bold font-mono">Défaut A</td>
                  <td className="p-3.5 font-bold font-mono text-xs">server.js</td>
                  <td className="p-3.5 font-medium"><code className="font-mono text-xs">req.body undefined</code> &amp; blocage CORS</td>
                  <td className="p-3.5 text-slate-600">Routes applicatives montées avant <code className="font-mono text-xs">express.json()</code> et <code className="font-mono text-xs">cors()</code></td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">Déclarer cors() et json() en tête</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-rose-700 font-bold font-mono">Défaut B</td>
                  <td className="p-3.5 font-bold font-mono text-xs">database.js</td>
                  <td className="p-3.5 font-medium"><code className="font-mono text-xs">ER_BAD_DB_ERROR</code> au boot</td>
                  <td className="p-3.5 text-slate-600">Base &quot;taskflow_test&quot; codée en dur au lieu de <code className="font-mono text-xs">process.env.DB_NAME</code></td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">Configuration dynamique via .env</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-rose-700 font-bold font-mono">Défaut C</td>
                  <td className="p-3.5 font-bold font-mono text-xs">taskController.js</td>
                  <td className="p-3.5 font-medium">Faille d&apos;injection SQL critique</td>
                  <td className="p-3.5 text-slate-600">Concaténation textuelle de l&apos;ID dans la requête SQL</td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">Requête préparée avec paramètre (?)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-amber-700 font-bold font-mono">Défaut D</td>
                  <td className="p-3.5 font-bold font-mono text-xs">middlewares/auth.js</td>
                  <td className="p-3.5 font-medium"><code className="font-mono text-xs">jwt malformed</code> systématique</td>
                  <td className="p-3.5 text-slate-600">Oubli d&apos;extraire le préfixe &quot;Bearer &quot; avant <code className="font-mono text-xs">jwt.verify()</code></td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">authHeader.split(&quot; &quot;)[1]</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-amber-700 font-bold font-mono">Défaut E</td>
                  <td className="p-3.5 font-bold font-mono text-xs">middlewares/auth.js</td>
                  <td className="p-3.5 font-medium"><code className="font-mono text-xs">ERR_HTTP_HEADERS_SENT</code></td>
                  <td className="p-3.5 text-slate-600">Absence de <code className="font-mono text-xs">return</code> après <code className="font-mono text-xs">res.status(401).json()</code></td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">return res.status(401).json(...)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-purple-700 font-bold font-mono">Défaut F</td>
                  <td className="p-3.5 font-bold font-mono text-xs">taskController.js</td>
                  <td className="p-3.5 font-medium"><code className="font-mono text-xs">ER_BAD_NULL_ERROR</code> sur INSERT</td>
                  <td className="p-3.5 text-slate-600">Absence de validation du champ <code className="font-mono text-xs">title</code> requis avant l&apos;insertion</td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">Validation 400 Bad Request</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-purple-700 font-bold font-mono">Défaut G</td>
                  <td className="p-3.5 font-bold font-mono text-xs">taskController.js</td>
                  <td className="p-3.5 font-medium">Crashs sur ID non numériques (<code className="font-mono text-xs">NaN</code>)</td>
                  <td className="p-3.5 text-slate-600"><code className="font-mono text-xs">req.params.id</code> non converti ni validé en entier strictement positif</td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">Number.isInteger() &amp;&amp; id &gt; 0</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-sky-700 font-bold font-mono">Défaut H</td>
                  <td className="p-3.5 font-bold font-mono text-xs">errorHandler.js</td>
                  <td className="p-3.5 font-medium">Statut menteur HTTP 200 sur crash</td>
                  <td className="p-3.5 text-slate-600">Middleware répondant en 200 avec message d&apos;erreur masqué dans le body</td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">res.status(statusCode).json(...)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Code Corrigé */}
      {activeTab === 'server' && (
        <div className="space-y-6">
          <p className="text-sm text-slate-700">
            Voici les 3 modules de référence refactorisés et blindés contre les 8 défaillances identifiées :
          </p>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Icon name="code" className="w-4 h-4 text-emerald-600" />
              <span>1. server.js — Configuration et Ordre Rigoureux des Middlewares</span>
            </h3>
            <CodeBlock
              language="javascript"
              filename="server.js"
              code={`const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// 1. DÉCODEURS & CORS TOUJOURS EN PREMIER :
app.use(cors({ 
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true 
}));
app.use(express.json());

// 2. ROUTES APPLICATIVES :
app.use("/api/tasks", taskRoutes);

// 3. GESTIONNAIRE D'ERREURS CENTRALISÉ EN TOUT DERNIER :
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Serveur TaskFlow démarré sur http://localhost:\${PORT}\`);
});`}
            />
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Icon name="code" className="w-4 h-4 text-emerald-600" />
              <span>2. middlewares/auth.js — Validation de Jeton JWT Robuste et Défensive</span>
            </h3>
            <CodeBlock
              language="javascript"
              filename="middlewares/auth.js"
              code={`const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Contrôle du format du header Authorization :
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentification requise : Jeton manquant ou mal formaté."
    });
  }

  // 2. Extraction du token pur sans le mot 'Bearer ' :
  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "default_dev_secret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    return next(); // ⚠️ 'return' impératif pour empêcher la poursuite du script !
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Jeton d'authentification invalide ou expiré."
    });
  }
};`}
            />
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Icon name="code" className="w-4 h-4 text-emerald-600" />
              <span>3. controllers/taskController.js — Requêtes Préparées MySQL et Validation Stricte</span>
            </h3>
            <CodeBlock
              language="javascript"
              filename="controllers/taskController.js"
              code={`const pool = require("../config/database");

// GET /api/tasks/:id — Avec validation d'ID et requête préparée anti-injection SQL :
exports.getTaskById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ success: false, message: "Identifiant de tâche invalide." });
    }

    // Requête préparée (?) immunisée contre les injections SQL :
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, req.user.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Tâche introuvable." });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// POST /api/tasks — Avec validation des champs obligatoires (anti ER_BAD_NULL_ERROR) :
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Le titre de la tâche est obligatoire." });
    }

    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, user_id, completed) VALUES (?, ?, ?, false)",
      [title.trim(), description || null, req.user.id]
    );

    res.status(201).json({
      success: true,
      data: { id: result.insertId, title: title.trim(), completed: false }
    });
  } catch (err) {
    next(err);
  }
};`}
            />
          </div>
        </div>
      )}

      {/* Tab 3: Tests Postman */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-700">
            Voici les 5 scénarios de validation d&apos;API exécutés sous Postman pour certifier la robustesse du backend :
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-700">Test 1 : POST /api/tasks (sans token JWT)</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300">Attendu : 401 Unauthorized</span>
              </div>
              <p className="text-xs text-slate-600">Vérifie que la barrière d&apos;authentification rejette immédiatement les requêtes anonymes en moins de 30ms.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-700">Test 2 : POST /api/tasks (avec token, mais title vide)</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">Attendu : 400 Bad Request</span>
              </div>
              <p className="text-xs text-slate-600">Vérifie la barrière de validation de payload avant toute écriture en base MySQL (évite l&apos;erreur <code className="font-mono">ER_BAD_NULL_ERROR</code>).</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-700">Test 3 : POST /api/tasks (corps complet et token valide)</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">Attendu : 201 Created</span>
              </div>
              <p className="text-xs text-slate-600">Retourne le nouvel objet tâche avec son <code className="font-mono">insertId</code> généré automatiquement par MySQL.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-700">Test 4 : GET /api/tasks/abc (ID non numérique)</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">Attendu : 400 Bad Request</span>
              </div>
              <p className="text-xs text-slate-600">Empêche les paramètres non numériques d&apos;atteindre la base de données et de provoquer des plantages 500 silencieux.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-700">Test 5 : GET /api/tasks/1 OR 1=1 (Attaque par injection SQL)</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-300">Attendu : 400 Bad Request (Neutralisé)</span>
              </div>
              <p className="text-xs text-slate-600">Prouve que l&apos;injection SQL est immédiatement rejetée par la validation d&apos;entier et neutralisée par la requête préparée.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Grille d'Évaluation */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Grille d&apos;évaluation des 10 compétences clés de débogage d&apos;API du Module 4 :
            </h3>
            <ul className="space-y-2.5 text-slate-800">
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 1.</span>
                <span><strong>Cycle de Requête HTTP :</strong> Comprendre le trajet complet Client → Middlewares → Routeur → Contrôleur → MySQL → Client.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 2.</span>
                <span><strong>Codes de Statut HTTP :</strong> Émettre les codes sémantiques exacts (200, 201, 400, 401, 403, 404, 409, 500) et bannir les statuts menteurs.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 3.</span>
                <span><strong>Ordre des Middlewares :</strong> Monter les décodeurs de payload (<code className="font-mono text-xs">express.json()</code>) et CORS avant les routes applicatives.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 4.</span>
                <span><strong>Contrôle de Flux :</strong> Éviter <code className="font-mono text-xs">ERR_HTTP_HEADERS_SENT</code> grâce à des instructions <code className="font-mono text-xs">return res.status(...)</code> strictes.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 5.</span>
                <span><strong>Sécurité CORS :</strong> Configurer les origines autorisées, méthodes et autoriser les credentials en environnement multi-origines.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 6.</span>
                <span><strong>Authentification JWT :</strong> Extraire fidèlement le préfixe &quot;Bearer &quot;, vérifier la signature et distinguer 401 (non authentifié) et 403 (non autorisé).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 7.</span>
                <span><strong>Sécurité SQL :</strong> Bannir toute concaténation de variables dans les requêtes et utiliser exclusivement des requêtes préparées avec paramètres (?).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 8.</span>
                <span><strong>Validation Défensive :</strong> Valider le typage et les contraintes non nulles des données d&apos;entrée avant tout appel en base de données.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 9.</span>
                <span><strong>Gestionnaire d&apos;Erreur Centralisé :</strong> Déployer un middleware global à 4 arguments <code className="font-mono text-xs">(err, req, res, next)</code> pour assainir les réponses client.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 10.</span>
                <span><strong>Automatisation des Tests :</strong> Valider l&apos;ensemble des routes et scénarios d&apos;erreurs avec Postman et assertions automatisées.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Laboratoire Interactif BugTriageLab */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            Atelier Interactif : Laboratoire de Triage de Bugs
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Entraînez-vous à trier et corriger les pannes en direct : examinez les logs du serveur, les traces de la pile d&apos;appels, les en-têtes HTTP et sélectionnez la correction d&apos;ingénierie optimale :
        </p>
        <BugTriageLab />
      </section>

      {/* Callout de synthèse */}
      <Callout type="tip" title="Prêt pour la certification officielle du Module 4">
        <p className="text-sm leading-relaxed">
          Analysez attentivement les questions du quiz de validation ci-dessous. Les thématiques abordées (injections SQL, cycle de middlewares, sécurité JWT et gestion des statuts HTTP) constituent les piliers de l&apos;examen officiel du Module 4.
        </p>
      </Callout>

      {/* Quiz de Synthèse */}
      <section className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Icon name="info" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Quiz de Validation Pratique du TP TaskFlow</h2>
              <p className="text-xs text-slate-400">Validez vos acquis avant de débloquer l&apos;examen officiel du Module 4</p>
            </div>
          </div>
          {showResults && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors self-start sm:self-auto"
            >
              <Icon name="rocket" className="w-3.5 h-3.5" /> Recommencer
            </button>
          )}
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q) => {
            const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

            return (
              <div key={q.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <p className="text-sm font-semibold text-slate-200">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800";
                    if (showResults) {
                      if (optIndex === q.correctAnswer) {
                        btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                      } else if (selectedAnswers[q.id] === optIndex) {
                        btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                      }
                    } else if (selectedAnswers[q.id] === optIndex) {
                      btnStyle = "bg-emerald-900/40 border-emerald-500 text-emerald-300 font-bold";
                    }

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        disabled={showResults}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                    isCorrect ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
                  }`}>
                    <strong>{isCorrect ? '✓ Exact ! ' : '✗ Incorrect. '}</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          {!showResults ? (
            <button
              type="button"
              onClick={() => setShowResults(true)}
              disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md transition-all"
            >
              Valider les réponses du TP TaskFlow
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-300">
                Score TP : <strong className="text-emerald-400">{score} / {quizQuestions.length}</strong>
              </span>
              <span className="text-xs text-slate-400">
                ({score === quizQuestions.length ? 'Excellente maîtrise technique du Backend et des API !' : 'Revoyez les anomalies avant l\'examen de certification.'})
              </span>
            </div>
          )}

          <Link
            href="/examens/debugging/module-4"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition-all"
          >
            Passer l&apos;Examen du Module 4 <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Chapitre13Content;
