import React from "react";
import { Icon } from "@/components/common/Icon";

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-300">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Débogage des routes Express.js
        </h1>
      </div>

      {/* 1. Comment fonctionne le routeur Express */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="layout" className="w-5 h-5 text-emerald-400" />
          1. Mécanisme de résolution des routes
        </h3>
        <p className="leading-relaxed">
          Express évalue les routes enregistrées séquentiellement, dans l&apos;ordre exact où elles ont été déclarées dans le code avec <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">app.use()</code>, <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">app.get()</code>, <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">app.post()</code>, etc. Dès qu&apos;une route correspond à la méthode HTTP et au pattern d&apos;URL, son gestionnaire est exécuté.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-300">
                <th className="py-3 px-4 font-semibold">Requête Client</th>
                <th className="py-3 px-4 font-semibold">Méthode Express attendue</th>
                <th className="py-3 px-4 font-semibold">Risque de confusion fréquent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">GET /api/products</td>
                <td className="py-2.5 px-4 text-slate-200">app.get(&quot;/api/products&quot;, ...)</td>
                <td className="py-2.5 px-4 text-amber-400">Oubli du slash initial ou pluriel erroné (/product)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-sky-400 font-bold">POST /api/products</td>
                <td className="py-2.5 px-4 text-slate-200">app.post(&quot;/api/products&quot;, ...)</td>
                <td className="py-2.5 px-4 text-amber-400">Le client envoie un GET -&gt; retourne 404 (Cannot GET)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-purple-400 font-bold">PUT /api/products/:id</td>
                <td className="py-2.5 px-4 text-slate-200">app.put(&quot;/api/products/:id&quot;, ...)</td>
                <td className="py-2.5 px-4 text-amber-400">Utilisation d&apos;un PATCH côté front sans route PATCH</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-red-400 font-bold">DELETE /api/products/:id</td>
                <td className="py-2.5 px-4 text-slate-200">app.delete(&quot;/api/products/:id&quot;, ...)</td>
                <td className="py-2.5 px-4 text-amber-400">Envoi de DELETE sans ID dans l&apos;URL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Le piège classique : Ordre de déclaration Statique vs Dynamique */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="bug" className="w-5 h-5 text-amber-400" />
          2. Le piège classique : Statique avant Dynamique
        </h3>
        <p className="leading-relaxed">
          C&apos;est l&apos;un des bugs les plus fréquents en Express.js : lorsqu&apos;un segment dynamique comme <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">:id</code> est déclaré avant une route textuelle statique comme <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">/profile</code> ou <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">/search</code>, la route dynamique intercepte la requête en interprétant le mot statique comme un ID.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/10 space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <Icon name="bug" className="w-4 h-4" />
              Code Buggé : Interception erronée
            </div>
            <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-red-300 overflow-x-auto">
{`// ❌ ERREUR : La route dynamique intercepte tout
app.get("/api/users/:id", (req, res) => {
  // req.params.id vaut "profile" !
  // Tente SELECT * FROM users WHERE id = "profile"
  // Retourne 400 ou 404 au lieu du profil !
  res.json({ userId: req.params.id });
});

app.get("/api/users/profile", (req, res) => {
  // ⛔ Jamais atteint pour GET /api/users/profile !
  res.json({ message: "Mon profil" });
});`}
            </pre>
            <p className="text-xs text-red-300/80">
              Pour <code className="text-white">GET /api/users/profile</code>, Express associe <code className="text-white">:id = &quot;profile&quot;</code> et exécute la première route.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Icon name="check-circle" className="w-4 h-4" />
              Correction : Du plus spécifique au plus générique
            </div>
            <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✅ SOLUTION : Déclarer la route spécifique d'abord
app.get("/api/users/profile", (req, res) => {
  res.json({ message: "Mon profil utilisateur" });
});

// La route générique paramétrée vient ensuite
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }
  res.json({ userId: id });
});`}
            </pre>
            <p className="text-xs text-emerald-300/80">
              Règle d&apos;or : toujours placer les routes littérales fixes avant les routes contenant des paramètres variables.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Validation et typage des paramètres */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-emerald-400" />
          3. Typage et pièges de req.params vs req.query
        </h3>
        <p className="leading-relaxed">
          Toutes les valeurs extraites de <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">req.params</code> et <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">req.query</code> sont des <strong>chaînes de caractères</strong> (string). Les comparer avec une égalité stricte <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">===</code> à un nombre sans conversion est une source majeure de bugs silencieux.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
          <div className="text-slate-400 font-bold text-sm font-sans mb-1">Validation robuste d&apos;un identifiant de route :</div>
          <pre className="text-slate-200 overflow-x-auto">
{`router.get("/products/:id", async (req, res) => {
  const rawId = req.params.id;
  const productId = parseInt(rawId, 10);

  // 1. Détection de NaN ou identifiant négatif / nul
  if (isNaN(productId) || productId <= 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: \`L'identifiant produit "\${rawId}" doit être un entier positif.\`
    });
  }

  // 2. Recherche sûre avec comparaison numérique
  const product = await db.findProductById(productId);
  if (!product) {
    return res.status(404).json({ error: "Produit introuvable" });
  }

  return res.json(product);
});`}
          </pre>
        </div>
      </div>

      {/* 4. Modularisation avec express.Router() et inspection des routes */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="server" className="w-5 h-5 text-emerald-400" />
          4. Structuration modulaire et traçage automatique des routes
        </h3>
        <p className="leading-relaxed">
          Dans une architecture scalable, regroupez les routes par domaine dans des fichiers dédiés à l&apos;aide d&apos;<code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">express.Router()</code>. Le préfixe global est défini au moment du montage avec <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">app.use(&quot;/api/v1/products&quot;, productRouter)</code>.
        </p>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Icon name="arrow-right" className="w-4 h-4 text-emerald-400" />
            Script de débogage : Lister toutes les routes actives au démarrage
          </h4>
          <p className="text-sm text-slate-300">
            Pour vérifier exactement quelles routes sont enregistrées par Express et dans quel ordre, inspectez la pile interne <code className="text-emerald-300 bg-slate-950 px-1 py-0.5 rounded text-xs">app._router.stack</code> :
          </p>
          <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-emerald-300 overflow-x-auto">
{`// Helper de diagnostic pour afficher l'arborescence des routes Express
function printRoutes(app) {
  console.log("=== ROUTES EXPRESS ENREGISTRÉES ===");
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes déclarées directement sur app
      const methods = Object.keys(middleware.route.methods).join(", ").toUpperCase();
      console.log(\`[\${methods}] \${middleware.route.path}\`);
    } else if (middleware.name === "router") {
      // Sous-routeurs montés via app.use()
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).join(", ").toUpperCase();
          console.log(\`[\${methods}] \${handler.route.path}\`);
        }
      });
    }
  });
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};
export default Chapitre5Content;
