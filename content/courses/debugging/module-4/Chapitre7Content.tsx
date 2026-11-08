import React from "react";
import Image from "next/image";
import { Icon } from "@/components/common/Icon";

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-300">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Analyse des problèmes CORS
        </h1>
      </div>

      {/* Diagramme CORS officiel */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Icon name="layout" className="w-5 h-5 text-emerald-400" />
            Schéma d&apos;architecture du protocole CORS et requête Preflight
          </h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
            Figure 4.7
          </span>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex justify-center p-4">
          <Image
            src="/images/cours/debugging/module-4/image1.jpeg"
            alt="Schéma explicatif du fonctionnement de CORS et de la requête Preflight"
            width={850}
            height={480}
            className="rounded-lg object-contain max-h-[460px] w-auto shadow-2xl"
          />
        </div>
        <p className="text-xs text-slate-400 italic text-center">
          Flux de négociation CORS : le navigateur expédie d&apos;abord une requête préliminaire HTTP OPTIONS (Preflight) avant d&apos;autoriser la requête applicative finale.
        </p>
      </div>

      {/* 1. Définition d'une Origine */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-emerald-400" />
          1. Qu&apos;est-ce qu&apos;une origine au sens du standard W3C ?
        </h3>
        <p className="leading-relaxed">
          Une origine est strictement définie par le triplet : <strong>Protocole + Domaine + Port</strong>. Si l&apos;un de ces trois éléments diffère, la requête est considérée comme cross-origin :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-center">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-1">Protocole</span>
            <span className="text-sm font-bold text-emerald-400">http:// vs https://</span>
            <p className="text-xs text-slate-400 mt-1">Origines différentes</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-center">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-1">Domaine</span>
            <span className="text-sm font-bold text-emerald-400">api.site.com vs site.com</span>
            <p className="text-xs text-slate-400 mt-1">Sous-domaines distincts</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-center">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-1">Port local</span>
            <span className="text-sm font-bold text-emerald-400">:5173 vs :3000</span>
            <p className="text-xs text-slate-400 mt-1">Frontend Vite et API Express</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-xs text-amber-300">
          <strong>Important :</strong> Postman, cURL ou votre terminal ne sont pas soumis à CORS car ils ne respectent pas la <em>Same-Origin Policy</em> des navigateurs. Tester une API dans Postman fonctionne toujours, même si CORS bloque votre SPA React !
        </div>
      </div>

      {/* 2. Décortiquer le Preflight OPTIONS */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="arrow-right" className="w-5 h-5 text-emerald-400" />
          2. Anatomie de la négociation Preflight (OPTIONS)
        </h3>
        <p className="leading-relaxed">
          Lorsqu&apos;une requête n&apos;est pas &quot;simple&quot; (utilisation de <code className="text-emerald-300 font-mono">Content-Type: application/json</code>, méthode PUT/DELETE/PATCH ou en-tête <code className="text-emerald-300 font-mono">Authorization</code>), le navigateur émet automatiquement un ping préliminaire <code className="text-emerald-300 font-mono">OPTIONS</code>.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
          <div className="text-slate-400 font-sans font-bold text-sm">En-têtes échangés lors du Preflight :</div>
          <div className="text-sky-300">
            <div>&gt; OPTIONS /api/tasks HTTP/1.1</div>
            <div>&gt; Origin: http://localhost:5173</div>
            <div>&gt; Access-Control-Request-Method: POST</div>
            <div>&gt; Access-Control-Request-Headers: Content-Type, Authorization</div>
          </div>
          <div className="text-emerald-300 pt-2 border-t border-slate-800">
            <div>&lt; HTTP/1.1 204 No Content</div>
            <div>&lt; Access-Control-Allow-Origin: http://localhost:5173</div>
            <div>&lt; Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS</div>
            <div>&lt; Access-Control-Allow-Headers: Content-Type, Authorization</div>
            <div>&lt; Access-Control-Max-Age: 86400</div>
          </div>
        </div>
      </div>

      {/* 3. Configuration Express et piège des Credentials */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-400" />
          3. Configuration propre avec le package cors
        </h3>

        <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/10 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
            <Icon name="bug" className="w-4 h-4" />
            L&apos;incompatibilité fatale : Wildcard (*) et Credentials
          </div>
          <p className="text-xs text-red-300/90 leading-relaxed">
            Si votre application transmet des cookies ou l&apos;en-tête d&apos;authentification de session via <code className="font-mono bg-red-900/50 px-1 py-0.5 rounded">credentials: &quot;include&quot;</code>, la spécification CORS <strong>interdit strictement</strong> l&apos;utilisation du caractère générique <code className="font-mono bg-red-900/50 px-1 py-0.5 rounded">Access-Control-Allow-Origin: *</code>. Le navigateur rejettera immédiatement la réponse.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
          <div className="text-slate-400 font-sans font-bold text-sm mb-2">Configuration Express prête pour la production :</div>
          <pre className="text-emerald-300 overflow-x-auto">
{`const express = require("express");
const cors = require("cors");
const app = express();

const whitelist = ["http://localhost:5173", "https://app.monprojet.com"];

const corsOptions = {
  origin: (origin, callback) => {
    // Permettre les outils internes ou vérifier dans la whitelist
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Accès refusé par la politique CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true, // Autorise les cookies et sessions
  maxAge: 86400 // Cache le preflight pendant 24h
};

// ⚠️ À monter en tout premier avant les routes !
app.use(cors(corsOptions));`}
          </pre>
        </div>
      </div>
    </div>
  );
};
export default Chapitre7Content;
