'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Diagnostic des codes de statut HTTP : 400, 401, 403, 404, 405, 422, 429 et 500
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Classifier les 5 grandes familles de statuts HTTP (1xx à 5xx).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Différencier formellement 401 (non authentifié) et 403 (permissions interdites).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer 400 (Bad Request structurel) de 422 (Unprocessable Content métier).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Isoler la cause racine des erreurs 500 via les logs du serveur.</span>
          </li>
        </ul>
      </section>

      {/* 2. Les 8 codes d'erreurs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Guide de diagnostic des 8 codes d&apos;erreurs clés
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-rose-400 font-bold font-sans text-sm">HTTP 400 • Bad Request</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">Client</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Requête mal formée, JSON syntaxiquement invalide ou champ obligatoire absent.</p>
            <div className="text-slate-400">Diagnostic : Vérifier le body JSON et la présence de express.json().</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-bold font-sans text-sm">HTTP 401 • Unauthorized</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Auth</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Identité non prouvée : token JWT absent, mal formé ou expiré.</p>
            <div className="text-slate-400">Diagnostic : Vérifier l&apos;en-tête Authorization: Bearer &lt;token&gt;.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-purple-400 font-bold font-sans text-sm">HTTP 403 • Forbidden</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">Droits</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Identité validée mais permissions insuffisantes (ex: compte utilisateur sur route admin).</p>
            <div className="text-slate-400">Diagnostic : Vérifier req.user.role et la table des permissions (RBAC).</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-bold font-sans text-sm">HTTP 404 • Not Found</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Ressource</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Route inexistante dans Express OU ressource absente en base MySQL (ex: /products/999).</p>
            <div className="text-slate-400">Diagnostic : Distinguer URL fautive d&apos;un enregistrement SQL absent.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-teal-400 font-bold font-sans text-sm">HTTP 405 • Method Not Allowed</span>
              <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">Méthode</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">La ressource existe mais ne supporte pas cette méthode (ex: DELETE sur /api/products).</p>
            <div className="text-slate-400">Diagnostic : Vérifier l&apos;en-tête Allow: GET, POST retourné par le serveur.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-bold font-sans text-sm">HTTP 422 • Unprocessable Content</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">Métier</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Le JSON est bien formé mais son contenu viole une règle métier (ex: email sans @, âge négatif).</p>
            <div className="text-slate-400">Diagnostic : Examiner les validateurs de schéma (Zod, Joi).</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-amber-300 font-bold font-sans text-sm">HTTP 429 • Too Many Requests</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Quota</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Le client a dépassé son quota d&apos;appels sur une fenêtre de temps (Rate Limiting).</p>
            <div className="text-slate-400">Diagnostic : Vérifier la configuration express-rate-limit et l&apos;en-tête Retry-After.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-rose-500 font-bold font-sans text-sm">HTTP 500 • Internal Server Error</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">Crash</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Crash non intercepté côté serveur : crash MySQL, TypeError sur undefined, défaillance réseau interne.</p>
            <div className="text-slate-400">Diagnostic : Consulter la Stack Trace dans les logs du serveur (Winston).</div>
          </div>
        </div>
      </section>

      {/* 3. Différence cruciale 401 vs 403 */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La distinction d&apos;or : 401 Unauthorized vs 403 Forbidden
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50/70 space-y-2">
            <h3 className="font-bold text-amber-950 text-sm">401 Unauthorized = &quot;Qui êtes-vous ?&quot;</h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              Le client n&apos;est pas authentifié. Il n&apos;a fourni aucun token, ou le token est expiré ou corrompu. La solution consiste à se reconnecter pour obtenir un nouveau JWT valide.
            </p>
          </div>
          <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50/70 space-y-2">
            <h3 className="font-bold text-purple-950 text-sm">403 Forbidden = &quot;Je sais qui vous êtes, mais c&apos;est NON.&quot;</h3>
            <p className="text-xs text-purple-900 leading-relaxed">
              L&apos;identité est parfaitement authentifiée (le JWT est valide), mais le rôle ou les droits associés ne permettent pas d&apos;exécuter cette action. Se reconnecter ne changera rien : il faut des privilèges supérieurs.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TP Pratique */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          4. Travaux Pratiques — Corriger un middleware d&apos;autorisation défaillant
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Observez comment ce middleware Express vérifie d&apos;abord le token (401), puis inspecte le rôle administrateur (403), et enfin valide les données JSON (422) :
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-emerald-400 font-bold">{`// Pattern défensif complet :`}</div>
          <div>{`function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token absent ou invalide" });
  }
  // Décoder et vérifier le token...
  req.user = verifyToken(token.split(" ")[1]);
  next();
}

function authorizeAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }
  next();
}

app.post("/api/admin/users", authenticate, authorizeAdmin, (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(422).json({ message: "Format d'email invalide" });
  }
  res.status(201).json({ success: true });
});`}</div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 4.2
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Un utilisateur connecté avec un rôle 'collaborateur' tente de supprimer une facture. L'action lui est interdite. Quel code HTTP renvoyer ?",
              options: [
                "401 Unauthorized",
                "403 Forbidden",
                "404 Not Found",
                "500 Internal Error"
              ],
              correctIndex: 1,
              explanation: "403 Forbidden s'applique car l'utilisateur est identifié mais ne dispose pas des droits nécessaires pour cette ressource."
            },
            {
              id: 2,
              question: "Un client envoie un corps JSON avec une virgule en trop provoquant un échec de parsing. Quel code HTTP le middleware renvoie-t-il ?",
              options: [
                "400 Bad Request",
                "422 Unprocessable Content",
                "502 Bad Gateway",
                "405 Method Not Allowed"
              ],
              correctIndex: 0,
              explanation: "Un JSON syntaxiquement invalide rend la requête impossible à parser : le serveur doit répondre par un 400 Bad Request."
            },
            {
              id: 3,
              question: "Quelle est la cause d'une réponse HTTP 429 Too Many Requests ?",
              options: [
                "Le disque dur du serveur est saturé",
                "Le client a dépassé le seuil de requêtes autorisées sur une période donnée (Rate Limiting)",
                "La base de données MySQL a planté",
                "Le token JWT est expiré"
              ],
              correctIndex: 1,
              explanation: "429 signale que le rate limiter (ex: express-rate-limit) a bloqué le client temporairement pour prévenir les abus ou attaques par force brute."
            }
          ]}
        />
      </section>
    </div>
  );
};

