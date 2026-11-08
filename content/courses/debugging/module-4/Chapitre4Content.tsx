'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Analyse des requêtes et réponses JSON
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les erreurs de syntaxe stricte JSON (trailing commas, guillemets).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Résoudre le bogue où req.body vaut undefined dans Express.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Aligner rigoureusement les noms et types de propriétés envoyés par le client.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déceler les erreurs de parsing frontend (ex: data.map is not a function).</span>
          </li>
        </ul>
      </section>

      {/* 2. Les 4 erreurs JSON classiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les quatre anomalies JSON les plus répandues
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <span className="font-bold text-rose-400 font-sans uppercase">1. Virgule traînante (Trailing Comma)</span>
            <pre className="text-slate-300">{`{
  "name": "Ahmed",
  "email": "ahmed@mail.com", // 💥 Interdit en JSON strict !
}`}</pre>
            <p className="text-slate-400 font-sans text-xs">Le parser d&apos;Express rejette immédiatement avec un statut 400 Bad Request.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <span className="font-bold text-amber-400 font-sans uppercase">2. Typage string au lieu de number</span>
            <pre className="text-slate-300">{`// Le backend attend un entier pour un calcul :
{
  "age": "25" // Reçu en string au lieu de 25
}`}</pre>
            <p className="text-slate-400 font-sans text-xs">Peut déclencher des concaténations accidentelles ou des rejets de validateurs de schéma.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <span className="font-bold text-purple-400 font-sans uppercase">3. Rupture de nom de clé (Mapping)</span>
            <pre className="text-slate-300">{`// Le frontend React envoie :
{ "productName": "Clavier" }

// Mais le backend Express recherche :
const { name } = req.body; // ➔ name vaut undefined !`}</pre>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1.5">
            <span className="font-bold text-blue-400 font-sans uppercase">4. Discordance de structure de réponse</span>
            <pre className="text-slate-300">{`// L'API retourne un objet enveloppe :
{ "users": [{ "id": 1, "name": "Ali" }] }

// Si React fait : data.map(...) ➔ 💥 TypeError !
// Solution : data.users.map(...)`}</pre>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi req.body vaut undefined */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Pourquoi req.body vaut-il undefined ?
        </h2>
        <Callout type="danger">
          <strong>L&apos;oubli du middleware express.json() :</strong> Par défaut, Node.js reçoit le corps HTTP sous forme de flux binaire (stream de buffers). Express ne sait pas lire le JSON tant que le middleware <code className="font-mono font-bold">app.use(express.json())</code> n&apos;a pas été instancié <strong>AVANT</strong> la déclaration des routes ! De plus, le client doit impérativement envoyer l&apos;en-tête <code className="font-mono font-bold">Content-Type: application/json</code>.
        </Callout>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-emerald-400 font-bold">{`// Ordre impératif de déclaration dans Express :`}</div>
          <div>{`const express = require("express");
const app = express();

// 1. Activer le parser JSON au sommet de la pile middleware :
app.use(express.json());

// 2. Déclarer ensuite les routes POST / PUT :
app.post("/api/products", (req, res) => {
  console.log("Corps analysé avec succès :", req.body); // Objet JS disponible !
  res.status(201).json({ success: true, data: req.body });
});`}</div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 4.4
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel middleware natif d'Express doit être déclaré avant les routes pour désérialiser les corps de requêtes JSON ?",
              options: [
                "express.static()",
                "express.json()",
                "express.urlencoded()",
                "express.router()"
              ],
              correctIndex: 1,
              explanation: "express.json() intercepte les streams HTTP entrants ayant le header application/json et peuple la propriété req.body."
            },
            {
              id: 2,
              question: "Une application React affiche l'erreur 'data.map is not a function' après un fetch. Quelle est l'explication la plus probable ?",
              options: [
                "JavaScript ne supporte plus les tableaux",
                "L'API a retourné un objet enveloppant (ex: { data: [...] }) au lieu d'un tableau brut",
                "La base de données MySQL est éteinte",
                "Le port 3000 est saturé"
              ],
              correctIndex: 1,
              explanation: "Array.prototype.map n'existe que sur les tableaux. Si l'API retourne un objet racine { users: [] }, appeler data.map lève une TypeError."
            },
            {
              id: 3,
              question: "Quel en-tête HTTP le client React doit-il impérativement inclure dans un POST fetch() avec JSON.stringify() ?",
              options: [
                "Accept: text/html",
                "Content-Type: application/json",
                "Connection: keep-alive",
                "User-Agent: React"
              ],
              correctIndex: 1,
              explanation: "Sans Content-Type: application/json, le middleware express.json() ignore le corps de la requête, laissant req.body vide ou non parsé."
            }
          ]}
        />
      </section>
    </div>
  );
};

