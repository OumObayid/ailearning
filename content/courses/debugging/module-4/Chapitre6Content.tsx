import React from "react";
import { Icon } from "@/components/common/Icon";

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-300">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Diagnostic des erreurs Middleware
        </h1>
      </div>

      {/* 1. La mécanique des middlewares */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="arrow-right" className="w-5 h-5 text-emerald-400" />
          1. Le contrat fondamental d&apos;un middleware
        </h3>
        <p className="leading-relaxed">
          Chaque middleware Express reçoit <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">(req, res, next)</code> et a une obligation stricte : <strong>soit terminer la requête</strong> en envoyant une réponse (ex: <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">res.json(...)</code>), <strong>soit passer la main</strong> au maillon suivant via <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">next()</code>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">Passer au suivant</span>
            <code className="text-xs text-slate-300">next()</code>
            <p className="text-xs text-slate-400 mt-2">La requête poursuit son chemin vers le middleware ou contrôleur suivant.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">Terminer la réponse</span>
            <code className="text-xs text-slate-300">return res.status(...).json(...)</code>
            <p className="text-xs text-slate-400 mt-2">Interrompt le flux et répond au client (ex: 401 Unauthorized ou validation échouée).</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">Déclencher l&apos;erreur</span>
            <code className="text-xs text-slate-300">next(error)</code>
            <p className="text-xs text-slate-400 mt-2">Court-circuite tous les middlewares réguliers et saute directement au gestionnaire d&apos;erreurs.</p>
          </div>
        </div>
      </div>

      {/* 2. Les 3 pièges majeurs */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="bug" className="w-5 h-5 text-red-400" />
          2. Les 3 anomalies middleware les plus redoutables
        </h3>

        <div className="space-y-4">
          {/* Piège 1 */}
          <div className="p-5 rounded-xl border border-red-500/20 bg-red-950/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-400 text-sm">Piège 1 : Le next() manquant (Requête suspendue)</span>
              <span className="text-xs bg-red-900/40 text-red-300 px-2 py-0.5 rounded font-mono">Symptôme : Timeout client</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Si une branche de code ne retourne pas de réponse et n&apos;appelle pas <code className="text-emerald-300 font-mono">next()</code>, Express reste en attente. Le navigateur tourne indéfiniment jusqu&apos;à dépasser le timeout réseau (Gateway Timeout 504).
            </p>
            <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-red-300 overflow-x-auto">
{`// ❌ ERREUR : Si req.headers.authorization existe, next() n'est jamais appelé !
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Token manquant" });
  }
  // Oups ! next() a été oublié ici. La requête reste bloquée pour toujours.
});`}
            </pre>
          </div>

          {/* Piège 2 */}
          <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-950/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Piège 2 : Double réponse et ERR_HTTP_HEADERS_SENT</span>
              <span className="text-xs bg-amber-900/40 text-amber-300 px-2 py-0.5 rounded font-mono">Crash serveur ou log d&apos;exception</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Appeler <code className="text-white font-mono">res.json()</code> ne stoppe pas l&apos;exécution JavaScript. Sans <code className="text-white font-mono">return</code>, la ligne <code className="text-white font-mono">next()</code> s&apos;exécute, le contrôleur suivant tente à son tour d&apos;écrire des en-têtes et Node.js lève l&apos;erreur.
            </p>
            <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-amber-300 overflow-x-auto">
{`// ❌ ERREUR SANS RETURN : res.json() n'arrête pas la fonction
function checkRole(req, res, next) {
  if (req.user.role !== "admin") {
    res.status(403).json({ error: "Accès refusé" });
    // Sans 'return', l'interpréteur continue et exécute la ligne suivante !
  }
  next(); // 💥 Exécute le contrôleur qui tente un res.json() -> CRASH !
}

// ✅ CORRECTION : Toujours utiliser 'return res...'
function checkRoleFixed(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Accès refusé" });
  }
  return next();
}`}
            </pre>
          </div>

          {/* Piège 3 */}
          <div className="p-5 rounded-xl border border-sky-500/20 bg-sky-950/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-400 text-sm">Piège 3 : Ordre d&apos;enregistrement de express.json()</span>
              <span className="text-xs bg-sky-900/40 text-sky-300 px-2 py-0.5 rounded font-mono">Symptôme : req.body === undefined</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Les routes déclarées avant <code className="text-white font-mono">app.use(express.json())</code> ne bénéficient pas du décodeur de corps. Leur <code className="text-white font-mono">req.body</code> sera toujours indéfini.
            </p>
            <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-sky-300 overflow-x-auto">
{`// ❌ ERREUR D'ORDRE :
app.post("/api/login", loginController); // req.body est undefined ici !
app.use(express.json()); // Arrive trop tard !

// ✅ ORDRE CONFORME :
app.use(express.json()); // Parsé en premier pour toutes les routes descendantes
app.post("/api/login", loginController); // req.body contient { email, password }`}
            </pre>
          </div>
        </div>
      </div>

      {/* 3. Le Middleware Global d'Erreur (4 arguments) */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-emerald-400" />
          3. Le Middleware d&apos;Erreur Centralisé (Arity = 4)
        </h3>
        <p className="leading-relaxed">
          Express détecte les middlewares d&apos;erreurs par l&apos;arité de leur fonction (le nombre de paramètres déclarés). Un gestionnaire d&apos;erreurs <strong>doit obligatoirement posséder 4 paramètres</strong> : <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">(err, req, res, next)</code>. Si vous omettez <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">next</code>, Express le traitera comme un middleware normal à 3 paramètres et l&apos;ignorera lors d&apos;un crash !
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Icon name="check-circle" className="w-4 h-4" />
            Implémentation de référence du Middleware d&apos;Erreurs
          </div>
          <pre className="p-3 bg-slate-900 rounded text-xs font-mono text-slate-200 overflow-x-auto">
{`// ⚠️ Doit être placé TOUT À LA FIN du fichier server.js, après toutes les routes !
app.use((err, req, res, next) => {
  // Log complet de l'erreur côté serveur
  console.error(\`[\${new Date().toISOString()}] Erreur sur \${req.method} \${req.url}:\`, err.stack);

  // Détermination du code HTTP
  const statusCode = err.statusCode || 500;

  // Réponse normalisée (en cachant la stack trace en production)
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Erreur interne du serveur",
      status: statusCode,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    }
  });
});`}
          </pre>
        </div>
      </div>
    </div>
  );
};
export default Chapitre6Content;
