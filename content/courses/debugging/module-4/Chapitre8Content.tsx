import React from "react";
import Image from "next/image";
import { Icon } from "@/components/common/Icon";

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-300">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Diagnostic des erreurs d&apos;authentification et d&apos;autorisation
        </h1>
      </div>

      {/* Diagramme Anatomie JWT */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Icon name="code" className="w-5 h-5 text-emerald-400" />
            Structure cryptographique d&apos;un JSON Web Token (JWT)
          </h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
            Figure 4.8
          </span>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex justify-center p-4">
          <Image
            src="/images/cours/debugging/module-4/image2.jpeg"
            alt="Structure d'un JWT : Header, Payload et Signature"
            width={850}
            height={480}
            className="rounded-lg object-contain max-h-[440px] w-auto shadow-2xl"
          />
        </div>
        <p className="text-xs text-slate-400 italic text-center">
          Décomposition d&apos;un jeton JWT : le Header (algorithme), le Payload (données de session) et la Signature cryptographique HMAC-SHA256 validée par le secret serveur.
        </p>
      </div>

      {/* 1. Distinction fondamentale 401 vs 403 */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-emerald-400" />
          1. Différence sémantique : 401 Unauthorized vs 403 Forbidden
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-950/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">401 Unauthorized (Non authentifié)</span>
              <span className="text-xs bg-amber-900/50 text-amber-300 px-2 py-0.5 rounded font-mono">Manque d&apos;identité</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Le client n&apos;a pas prouvé qui il est. Soit aucun token n&apos;a été envoyé, soit le token est corrompu, expiré ou la signature est fausse.
            </p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li>Header <code className="text-slate-300">Authorization</code> absent</li>
              <li>Token JWT expiré (<code className="text-amber-300">jwt expired</code>)</li>
              <li>Signature invalide (<code className="text-amber-300">invalid signature</code>)</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-red-500/30 bg-red-950/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-400 text-sm">403 Forbidden (Accès interdit)</span>
              <span className="text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded font-mono">Manque de droits</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Le serveur sait exactement qui est le client (l&apos;identité est vérifiée avec succès), mais ce profil ne possède pas les permissions requises pour cette action.
            </p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li>Un utilisateur standard tente de supprimer un compte admin</li>
              <li>Un abonné gratuit tente d&apos;accéder à une ressource VIP</li>
              <li>Tentative de modification d&apos;une ressource appartenant à un tiers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Les 3 bugs majeurs de validation JWT */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="bug" className="w-5 h-5 text-amber-400" />
          2. Les 3 bugs majeurs dans l&apos;implémentation d&apos;un middleware JWT
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <span className="font-semibold text-sm text-red-400">Bug A : Oubli du préfixe &quot;Bearer &quot;</span>
            <p className="text-xs text-slate-300">
              L&apos;en-tête HTTP contient la chaîne littérale <code className="text-emerald-300 font-mono">Bearer eyJhbG...</code>. Si vous passez cette chaîne brute à <code className="text-white font-mono">jwt.verify()</code>, la librairie déclenchera l&apos;erreur fatale <code className="text-red-400 font-mono">jwt malformed</code> car le mot &quot;Bearer&quot; n&apos;est pas du Base64 valide.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <span className="font-semibold text-sm text-red-400">Bug B : Absence de try / catch autour de jwt.verify()</span>
            <p className="text-xs text-slate-300">
              Contrairement aux fonctions asynchrones qui retournent une promesse, <code className="text-white font-mono">jwt.verify(token, secret)</code> est une méthode synchrone qui <strong>lève une exception</strong> (throw) dès qu&apos;un token est invalide ou expiré. Sans bloc try/catch, l&apos;exception non interceptée provoque une erreur 500 au lieu d&apos;un code 401 propre.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <span className="font-semibold text-sm text-red-400">Bug C : Désynchronisation de la variable d&apos;environnement JWT_SECRET</span>
            <p className="text-xs text-slate-300">
              Si le contrôleur de connexion signe le token avec une clé différente (ou si <code className="text-white font-mono">process.env.JWT_SECRET</code> est indéfini et replié sur une valeur par défaut différente), chaque requête échouera systématiquement avec l&apos;erreur <code className="text-red-400 font-mono">invalid signature</code>.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Implémentation certifiée du Middleware Auth */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="user" className="w-5 h-5 text-emerald-400" />
          3. Implémentation robuste du Middleware d&apos;authentification et RBAC
        </h3>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
          <div className="text-slate-400 font-sans font-bold text-sm mb-2 flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
            Middleware d&apos;authentification Express prêt pour la production :
          </div>
          <pre className="text-emerald-300 overflow-x-auto">
{`const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  // 1. Vérification de la présence du header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentification requise : header Authorization 'Bearer <token>' manquant."
    });
  }

  // 2. Extraction sûre du jeton
  const token = authHeader.split(" ")[1];

  // 3. Vérification cryptographique sous try / catch
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On attache l'utilisateur décodé à req
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "TOKEN_EXPIRED",
        message: "Votre session a expiré. Veuillez vous reconnecter."
      });
    }
    return res.status(401).json({
      success: false,
      error: "INVALID_TOKEN",
      message: "Jeton de sécurité invalide ou altéré."
    });
  }
}

// Middleware d'autorisation RBAC (Role-Based Access Control)
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Accès refusé : privilèges insuffisants pour cette ressource."
      });
    }
    return next();
  };
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};
export default Chapitre8Content;
