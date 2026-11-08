import React from "react";
import Link from "next/link";
import { BugTriageLab } from "@/components/interactive/BugTriageLab";
import { Icon } from "@/components/common/Icon";

export const Chapitre13Content: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-300">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 13 — TP Final — Diagnostic complet d&apos;une API Express &amp; MySQL
        </h1>
      </div>

      {/* 1. Tableau des 8 défauts à traquer */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="bug" className="w-5 h-5 text-red-400" />
          1. Inventaire des 8 anomalies d&apos;ingénierie de TaskFlow
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-300">
                <th className="py-3 px-4 font-semibold">Défaut</th>
                <th className="py-3 px-4 font-semibold">Composant ciblé</th>
                <th className="py-3 px-4 font-semibold">Symptôme observé</th>
                <th className="py-3 px-4 font-semibold">Cause racine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">Défaut A</td>
                <td className="py-2.5 px-4 text-slate-200">server.js</td>
                <td className="py-2.5 px-4 text-red-400">req.body undefined &amp; CORS bloqué</td>
                <td className="py-2.5 px-4 text-slate-400">Routes montées avant express.json() et cors().</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">Défaut B</td>
                <td className="py-2.5 px-4 text-slate-200">config/database.js</td>
                <td className="py-2.5 px-4 text-red-400">ER_BAD_DB_ERROR au démarrage</td>
                <td className="py-2.5 px-4 text-slate-400">Base &quot;taskflow_test&quot; codée en dur au lieu de process.env.DB_NAME.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">Défaut C</td>
                <td className="py-2.5 px-4 text-slate-200">taskController.js</td>
                <td className="py-2.5 px-4 text-red-400">Faille d&apos;injection SQL</td>
                <td className="py-2.5 px-4 text-slate-400">Concaténation ${`{id}`} au lieu du paramètre préparé (?).</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">Défaut D</td>
                <td className="py-2.5 px-4 text-slate-200">middlewares/auth.js</td>
                <td className="py-2.5 px-4 text-red-400">jwt malformed systématique</td>
                <td className="py-2.5 px-4 text-slate-400">Oubli d&apos;extraire le préfixe &quot;Bearer &quot; avant vérification.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">Défaut E</td>
                <td className="py-2.5 px-4 text-slate-200">middlewares/auth.js</td>
                <td className="py-2.5 px-4 text-red-400">ERR_HTTP_HEADERS_SENT</td>
                <td className="py-2.5 px-4 text-slate-400">Absence de return après res.status(401).json().</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">Défaut F</td>
                <td className="py-2.5 px-4 text-slate-200">taskController.js</td>
                <td className="py-2.5 px-4 text-red-400">ER_BAD_NULL_ERROR sur INSERT</td>
                <td className="py-2.5 px-4 text-slate-400">Absence de validation du champ title avant l&apos;écriture MySQL.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">Défaut G</td>
                <td className="py-2.5 px-4 text-slate-200">taskController.js</td>
                <td className="py-2.5 px-4 text-red-400">Requêtes silencieuses ou NaN</td>
                <td className="py-2.5 px-4 text-slate-400">req.params.id non validé ni transtypé en entier positif.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">Défaut H</td>
                <td className="py-2.5 px-4 text-slate-200">errorHandler.js</td>
                <td className="py-2.5 px-4 text-red-400">Code HTTP 200 en cas de crash</td>
                <td className="py-2.5 px-4 text-slate-400">Statut HTTP menteur masquant les pannes réelles du backend.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Corrigé d'ingénierie certifié */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-emerald-400" />
          2. Implémentation corrigée et blindée de l&apos;API TaskFlow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* server.js */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs space-y-2">
            <span className="text-emerald-400 font-sans font-bold text-sm block">server.js (Ordre rigoureux)</span>
            <pre className="text-slate-300 overflow-x-auto">
{`const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// 1. Décodeurs & CORS en premier
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// 2. Routes applicatives
app.use("/api/tasks", taskRoutes);

// 3. Gestionnaire d'erreurs en tout dernier
app.use(errorHandler);

app.listen(3000, () => {
  console.log("TaskFlow running on :3000");
});`}
            </pre>
          </div>

          {/* middlewares/auth.js */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs space-y-2">
            <span className="text-emerald-400 font-sans font-bold text-sm block">middlewares/auth.js (Blindé)</span>
            <pre className="text-slate-300 overflow-x-auto">
{`const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token manquant ou format invalide."
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next(); // ⚠️ Return indispensable
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token expiré ou signature invalide."
    });
  }
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* 3. Simulateur interactif BugTriageLab */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
            <Icon name="code" className="w-5 h-5 text-emerald-400" />
            3. Simulateur d&apos;incidents : Laboratoire de Triage de Bugs
          </h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-mono">
            Interactive Debugger Lab
          </span>
        </div>
        <p className="leading-relaxed">
          Entraînez-vous à trier et corriger les pannes en direct : examinez les logs du serveur, les traces de la pile d&apos;appels, les en-têtes HTTP et sélectionnez la correction d&apos;ingénierie optimale.
        </p>

        <BugTriageLab />
      </div>

      {/* 4. Validation avec Postman */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-4">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-400" />
          4. Checklist de validation des tests Postman
        </h3>
        <ul className="text-xs text-slate-300 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span><strong>POST /api/tasks (sans token)</strong> : Doit retourner exactement <code className="text-amber-300 font-mono">401 Unauthorized</code> en moins de 50ms.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span><strong>POST /api/tasks (avec token valide, title vide)</strong> : Doit retourner <code className="text-amber-300 font-mono">400 Bad Request</code> sans toucher à MySQL.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span><strong>POST /api/tasks (avec token et body valide)</strong> : Retourne <code className="text-emerald-400 font-mono">201 Created</code> avec l&apos;ID généré.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span><strong>GET /api/tasks/abc (ID non numérique)</strong> : Retourne <code className="text-amber-300 font-mono">400 Bad Request</code> au lieu d&apos;une erreur SQL 500.</span>
          </li>
        </ul>
      </div>

      {/* 5. Passage à l'examen de certification */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
            <Icon name="sparkles" className="w-6 h-6" />
            Module 4 Terminé avec Succès !
          </div>
          <p className="text-sm text-slate-300 max-w-xl">
            Vous maîtrisez désormais le diagnostic des statuts HTTP, le cycle des middlewares Express, les autorisations JWT, le pooling MySQL et l&apos;observabilité Winston. Validez vos compétences lors de l&apos;examen final.
          </p>
        </div>
        <Link
          href="/examens/debugging-module-4"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20 whitespace-nowrap"
        >
          <span>Passer l&apos;examen du Module 4</span>
          <Icon name="arrow-right" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
export default Chapitre13Content;
