'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Tests unitaires et tests d&apos;intégration
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chapitre 8 — 8.8. Tests unitaires et tests d&apos;intégration
      </p>
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        À la fin de ce chapitre, vous serez capable de :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre la différence entre tests unitaires et tests d&apos;intégration.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tester les fonctions indépendamment.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tester les interactions entre frontend, backend et base de données.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tester les API REST avec Supertest.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tester les composants et services avec Vitest.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les erreurs révélées par les tests.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier qu&apos;une correction respecte le comportement attendu.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Pourquoi tester après une correction ?
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une modification du code ne garantit pas que le problème est résolu.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous corrigez le contrôleur de commandes pour retourner HTTP 404 lorsqu&apos;une commande n&apos;existe pas.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous devez vérifier au minimum :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Commande existante : HTTP 200.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Commande inexistante : HTTP 404.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Erreur de base de données : HTTP 500 ou gestion d&apos;erreur adaptée.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Sans ces tests, vous ne savez pas si la correction fonctionne dans tous les scénarios importants.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les tests unitaires
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un test unitaire vérifie une petite unité de code indépendamment du reste de l&apos;application.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une fonction de validation.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une fonction de calcul.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une fonction de transformation de données.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une fonction de service métier.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple avec TypeScript et Vitest
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installation :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npm install -D vitest`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Fonction :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`export function calculateTotal(
price: number,
quantity: number
): number {
return price * quantity;
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Fichier de test :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import { describe, it, expect } from "vitest";
import { calculateTotal } from "./calculateTotal";

describe("calculateTotal", () =&gt; {
it("calcule correctement le total", () =&gt; {
expect(calculateTotal(100, 3)).toBe(300);
});

it("retourne zéro si la quantité est zéro", () =&gt; {
expect(calculateTotal(100, 0)).toBe(0);
});
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exécution :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npx vitest run`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Résultat attendu :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`✓ calculateTotal
✓ calcule correctement le total
✓ retourne zéro si la quantité est zéro

Test Files  1 passed
Tests       2 passed`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ce test vérifie le comportement de la fonction sans appeler MySQL ni une API externe.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Les tests d&apos;intégration
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un test d&apos;intégration vérifie la collaboration entre plusieurs éléments du système.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Route Express + contrôleur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Contrôleur + service.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Service + repository.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>API + base de données de test.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Authentification + middleware + route protégée.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Contrairement au test unitaire, le test d&apos;intégration vérifie plusieurs composants ensemble.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple avec Supertest
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installation :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npm install -D supertest @types/supertest
Supposons que l'application Express soit exportée depuis app.ts :
import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) =&gt; {
return res.status(200).json({
status: "ok"
});
});

export default app;`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Test :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./app";

describe("GET /api/health", () =&gt; {
it("retourne HTTP 200", async () =&gt; {
const response = await request(app)
.get("/api/health");

expect(response.status).toBe(200);

expect(response.body).toEqual({
status: "ok"
});
});
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exécution :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npx vitest run`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ce test vérifie réellement le traitement HTTP par Express, sans démarrer nécessairement un serveur sur un port réseau.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Tester les corrections de l&apos;application
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Reprenons les trois anomalies.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        BUG-001 — Connexion
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Comportements à tester :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Scénario</th>
              <th className="px-4 py-3">Résultat attendu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Identifiants valides</td>
              <td className="px-4 py-2.5 font-medium">Connexion réussie</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Mot de passe incorrect</td>
              <td className="px-4 py-2.5 font-medium">HTTP 401</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Email absent</td>
              <td className="px-4 py-2.5 font-medium">HTTP 400</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Données mal formées</td>
              <td className="px-4 py-2.5 font-medium">HTTP 400</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le test doit également vérifier que le frontend envoie le bon nom de champ.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        BUG-002 — Commande inexistante
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Scénario</th>
              <th className="px-4 py-3">Résultat attendu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Commande existante</td>
              <td className="px-4 py-2.5 font-medium">HTTP 200</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Commande inexistante</td>
              <td className="px-4 py-2.5 font-medium">HTTP 404</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Identifiant invalide</td>
              <td className="px-4 py-2.5 font-medium">HTTP 400</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Erreur SQL</td>
              <td className="px-4 py-2.5 font-medium">Erreur serveur gérée</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple de test d&apos;intégration :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`it("retourne 404 si la commande n'existe pas", async () =&gt; {
const response = await request(app)
.get("/api/orders/999999");

expect(response.status).toBe(404);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ce test suppose que l&apos;environnement de test contient un jeu de données maîtrisé dans lequel cette commande est absente.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        BUG-003 — Service Gemini
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il faut éviter d&apos;appeler réellement le fournisseur IA dans les tests unitaires ordinaires.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        On simule le service externe.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Scénarios :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Réponse IA réussie.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Timeout.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Erreur API.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Réponse invalide.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Erreur de configuration.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple conceptuel avec une fonction isolée :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`export async function analyzeDocument(
generate: (prompt: string) =&gt; Promise&lt;string&gt;,
prompt: string
): Promise&lt;string&gt; {
return generate(prompt);
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Test :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import { describe, it, expect, vi } from "vitest";
import { analyzeDocument } from "./analyzeDocument";

describe("analyzeDocument", () =&gt; {
it("retourne le résultat du service IA", async () =&gt; {
const generate = vi.fn()
.mockResolvedValue("Analyse terminée");

const result = await analyzeDocument(
generate,
"Analyse ce document"
);

expect(result).toBe("Analyse terminée");
expect(generate).toHaveBeenCalledOnce();
});

it("propage une erreur du service IA", async () =&gt; {
const generate = vi.fn()
.mockRejectedValue(new Error("API indisponible"));

await expect(
analyzeDocument(generate, "Analyse")
).rejects.toThrow("API indisponible");
});
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le traitement du timeout doit également être testé au niveau du service qui configure et contrôle le délai d&apos;attente.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Tests unitaires et intégration : comparaison
        </h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Critère</th>
              <th className="px-4 py-3">Test unitaire</th>
              <th className="px-4 py-3">Test d&apos;intégration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Périmètre</td>
              <td className="px-4 py-2.5 font-medium">Une unité</td>
              <td className="px-4 py-2.5 font-medium">Plusieurs composants</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Vitesse</td>
              <td className="px-4 py-2.5 font-medium">Généralement rapide</td>
              <td className="px-4 py-2.5 font-medium">Généralement plus lent</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Dépendances</td>
              <td className="px-4 py-2.5 font-medium">Simulées ou isolées</td>
              <td className="px-4 py-2.5 font-medium">Certaines réelles</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Exemple</td>
              <td className="px-4 py-2.5 font-medium">Fonction TypeScript</td>
              <td className="px-4 py-2.5 font-medium">Route Express + service</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Objectif</td>
              <td className="px-4 py-2.5 font-medium">Vérifier une logique</td>
              <td className="px-4 py-2.5 font-medium">Vérifier une collaboration</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les deux types de tests sont complémentaires.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Organiser les tests dans le projet
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple d&apos;organisation :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`backend/
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   └── middlewares/
│
└── tests/
├── unit/
│   ├── calculateTotal.test.ts
│   └── analyzeDocument.test.ts
│
└── integration/
├── auth.test.ts
├── orders.test.ts
└── health.test.ts`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cette organisation est indicative. Il faut respecter les conventions déjà adoptées dans le projet.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Tests et base de données MySQL
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les tests impliquant MySQL doivent utiliser un environnement de test isolé.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Production :
application_db

Développement :
application_dev

Tests :
application_test`}</code></pre>
      </div>
      <Callout type="tip" title="Bonnes pratiques ">
        <p className="text-xs sm:text-sm"></p>
      </Callout>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne jamais exécuter des tests destructifs sur la base de production.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Préparer des données de test reproductibles.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Nettoyer les données après les tests.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier les migrations dans un environnement adapté.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Simuler les erreurs SQL lorsque le test porte uniquement sur la logique métier.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Prompt professionnel pour l&apos;agent IA
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        MISSION — TESTS UNITAIRES ET D&apos;INTÉGRATION
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ROLE
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Tu es un ingénieur QA spécialisé en TypeScript, Vitest, Supertest, React, Node.js et Express.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        OBJECTIVE
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vérifier les corrections apportées à l&apos;application en créant et exécutant des tests adaptés.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TASKS
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Examiner les tests existants.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les fonctionnalités modifiées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déterminer les tests unitaires nécessaires.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déterminer les tests d&apos;intégration nécessaires.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier les cas normaux et les cas d&apos;erreur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ajouter les tests manquants dans le périmètre autorisé.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Exécuter les tests.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Analyser les échecs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Produire un rapport de validation.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TESTS À COUVRIR
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Authentification et validation des données.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Consultation des commandes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Gestion des commandes inexistantes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Gestion des erreurs MySQL.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Gestion des erreurs et timeouts du service IA.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Protection des routes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Contrôle des autorisations.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CONSTRAINTS
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Respecter les outils et conventions du projet.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas appeler un véritable service IA lorsque sa simulation suffit.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne jamais utiliser la base de production.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas modifier les données réelles.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas modifier les dépendances sans autorisation.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas supprimer les tests existants.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas masquer un test échoué.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Signaler les tests non exécutés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Demander une autorisation avant toute modification hors périmètre.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        OUTPUT
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Présenter :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les tests existants examinés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les tests ajoutés ou modifiés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les commandes exécutées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le nombre de tests réussis et échoués.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les erreurs rencontrées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les anomalies restantes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les risques non couverts.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ne jamais déclarer une fonctionnalité validée sur la seule base d&apos;une analyse statique du code.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. TP — Tester les corrections
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Mission : écrire et exécuter les tests correspondant aux trois anomalies corrigées.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tester la connexion avec des identifiants valides et invalides.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tester une commande existante et une commande inexistante.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Simuler une réponse IA réussie et une erreur du service IA.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier les codes HTTP.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Analyser les échecs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Produire un rapport de tests.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Corrigé : rapport attendu
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`RAPPORT DE TESTS

BUG-001 — Authentification
Tests unitaires : réussis
Tests d'intégration : réussis

BUG-002 — Commandes
Tests unitaires : réussis
Tests d'intégration : réussis

BUG-003 — Service IA
Tests unitaires : réussis
Tests timeout : à vérifier
Tests d'intégration : réussis

Conclusion :
Toutes les corrections ne peuvent être déclarées
validées que lorsque les tests restants sont exécutés.`}</code></pre>
      </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          11. Bonnes pratiques
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Écrire des tests qui vérifient le comportement attendu, pas seulement l&apos;existence du code.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tester les cas normaux, limites et erreurs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Isoler les services externes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser une base de test distincte.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Exécuter les tests après chaque correction.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne jamais masquer les tests échoués.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Conserver les tests de non-régression.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Documenter les scénarios non couverts.</span>
          </li>
        </ul>
      </section>

      {/* Quiz de révision */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de révision — Chapitre 8.8"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif d'un test unitaire ?",
              options: ["Tester toute l'application.", "Vérifier une unité de code indépendamment.", "Tester uniquement la base de données."],
              correctIndex: 1,
              explanation: "Vérifiez la démarche d'audit et les principes exposés dans ce chapitre.",
            },
            {
              id: 2,
              question: "Quel outil permet de tester une API Express avec Supertest ?",
              options: ["request(app).get(...)", "git diff", "console.log"],
              correctIndex: 0,
              explanation: "Vérifiez la démarche d'audit et les principes exposés dans ce chapitre.",
            },
            {
              id: 3,
              question: "Pourquoi simuler le service Gemini dans un test unitaire ?",
              options: ["Pour éviter les dépendances à un service externe.", "Pour supprimer l'", "Pour accélérer la connexion MySQL."],
              correctIndex: 0,
              explanation: "Vérifiez la démarche d'audit et les principes exposés dans ce chapitre.",
            },
            {
              id: 4,
              question: "Quelle base de données utiliser pour les tests ?",
              options: ["La base de production.", "Une base de test isolée.", "La base d'un autre projet."],
              correctIndex: 1,
              explanation: "Vérifiez la démarche d'audit et les principes exposés dans ce chapitre.",
            },
            {
              id: 5,
              question: "Un test échoué doit-il être ignoré pour obtenir un résultat positif ?",
              options: ["Oui.", "Non."],
              correctIndex: 1,
              explanation: "Vérifiez la démarche d'audit et les principes exposés dans ce chapitre.",
            },
          ]}
        />
      </div>
    </div>
  );
};
