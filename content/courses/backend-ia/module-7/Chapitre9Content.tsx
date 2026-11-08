'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — Tests, débogage et optimisation globale de l&apos;application
        </h1>
      </div>

      {/* 1. Objectifs du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectif du chapitre
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Tous les composants de notre application d&apos;analyse intelligente sont assemblés (React, Express, Gemini, MySQL, Redis, SSE, Workers). Nous allons valider leur bon fonctionnement conjoint, traquer les goulots d&apos;étranglement et préparer le passage en production.
        </p>
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            À la fin de ce chapitre, vous serez capable de :
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Définir et exécuter une stratégie de tests (Unitaires, Intégration, E2E).</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Écrire des tests automatisés avec Vitest et Supertest.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Diagnostiquer les erreurs de production (ECONNREFUSED, ETIMEDOUT, 429).</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Optimiser globalement la mémoire, le CPU et les index MySQL.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Auditer les règles de sécurité et valider la résistance par test de charge k6.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Stratégie de tests */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Définir une stratégie de tests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <h3 className="font-bold text-slate-950 text-sm">1. Tests unitaires</h3>
            <p className="text-xs text-slate-700">Validation des fonctions isolées : validation de prompt, calcul de hash, sanitisation.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <h3 className="font-bold text-slate-950 text-sm">2. Tests d&apos;intégration</h3>
            <p className="text-xs text-slate-700">Vérification de la communication : routes Express, pool MySQL, client Redis, client Gemini.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <h3 className="font-bold text-slate-950 text-sm">3. Tests E2E</h3>
            <p className="text-xs text-slate-700">Parcours utilisateur complet : saisie React, diffusion SSE, écriture SQL et historique.</p>
          </div>
        </div>
      </section>

      {/* 3. Installer Vitest & Supertest */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Installer les outils de tests
        </h2>
        <CodeBlock
          filename="Installation des dépendances de test"
          language="bash"
          code={`npm install -D vitest supertest @types/supertest`}
        />
        <CodeBlock
          filename="backend/src/services/validation.test.ts"
          language="typescript"
          code={`import { describe, it, expect } from "vitest";

function validatePrompt(prompt: string): boolean {
  return typeof prompt === "string" && prompt.trim().length > 0 && prompt.length <= 10000;
}

describe("validatePrompt", () => {
  it("accepte un prompt valide", () => {
    expect(validatePrompt("Explique Node.js")).toBe(true);
  });
  it("refuse un prompt vide", () => {
    expect(validatePrompt("")).toBe(false);
  });
  it("refuse un prompt dépassant 10 000 caractères", () => {
    expect(validatePrompt("a".repeat(10001))).toBe(false);
  });
});`}
        />
      </section>

      {/* 4. Tester une route Express avec Supertest */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Tester une route Express avec Supertest
        </h2>
        <CodeBlock
          filename="backend/src/app.test.ts"
          language="typescript"
          code={`import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./app.js";

describe("GET /api/health", () => {
  it("retourne un statut OK et HTTP 200", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
  });
});`}
        />
      </section>

      {/* 5. Déboguer les erreurs fréquentes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Déboguer les erreurs fréquentes du backend
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Erreur rencontrée</th>
                <th className="py-2.5 px-4">Causes à examiner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-rose-700">ECONNREFUSED</td>
                <td className="py-2 px-4">MySQL ou Redis arrêté, conteneur Docker éteint ou mauvais port.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-rose-700">401 / 403</td>
                <td className="py-2 px-4">Clé Gemini API révoquée, absente de .env ou permissions insuffisantes.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-amber-700">429 Too Many Requests</td>
                <td className="py-2 px-4">Rate Limiting de notre middleware ou quota d&apos;appels Google dépassé.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-slate-700">CORS error</td>
                <td className="py-2 px-4">Origine du frontend (ex: port 5173) non autorisée dans app.use(cors()).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Optimisation globale */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Optimiser les performances globales
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Composant</th>
                <th className="py-2.5 px-4">Optimisation clé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Node.js</td>
                <td className="py-2 px-4">Éviter tout traitement synchrone bloquant l&apos;Event Loop.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Worker Threads</td>
                <td className="py-2 px-4">Déléguer les calculs lourds (regex, hachage, parsing) à d&apos;autres cœurs.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">MySQL</td>
                <td className="py-2 px-4">Créer des index composites et réutiliser les connexions via le pool.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Redis</td>
                <td className="py-2 px-4">Mettre en cache les requêtes fréquentes avec un TTL adapté.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">SSE</td>
                <td className="py-2 px-4">Diffuser mot par mot sans bloquer et intercepter les déconnexions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Checklist sécurité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Checklist de sécurité avant production
        </h2>
        <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/50 space-y-2 text-sm text-slate-900">
          <p>✔ La clé <code className="font-mono font-bold">GEMINI_API_KEY</code> reste hermétique côté backend.</p>
          <p>✔ Le fichier <code className="font-mono font-bold">.env</code> est ignoré par Git via <code className="font-mono">.gitignore</code>.</p>
          <p>✔ Toutes les requêtes SQL utilisent des paramètres préparés (<code className="font-mono font-bold">?</code>).</p>
          <p>✔ Les entrées utilisateur sont validées et limitées en taille.</p>
          <p>✔ Le Rate Limiting empêche la saturation des quotas et les dénis de service.</p>
        </div>
      </section>

      {/* 8. Test de charge avec k6 */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Test de charge avec k6
        </h2>
        <CodeBlock
          filename="load-test.js"
          language="javascript"
          code={`import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,       // 10 utilisateurs simultanés
  duration: "30s"
};

export default function () {
  const response = http.get("http://localhost:3000/api/health");
  check(response, { "statut HTTP 200": (r) => r.status === 200 });
  sleep(1);
}`}
        />
        <CodeBlock
          filename="Lancement k6"
          language="bash"
          code={`k6 run load-test.js`}
        />
      </section>

      {/* 9. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Travaux pratiques — Audit final de l&apos;application
        </h2>
        <PracticalWork
          title="Recette complète et audit de charge"
          objective="Exécuter la batterie de tests et valider l'étanchéité du système complet."
          duration="60 min"
          steps={[
            "Installez Vitest et écrivez les tests de validation de prompt et de santé.",
            "Lancez npm run test et vérifiez que tous les tests passent au vert.",
            "Simulez un arrêt de MySQL et de Redis pour vérifier la robustesse des messages d'erreur.",
            "Exécutez le script k6 pour vérifier la tenue sous charge simultanée.",
            "Vérifiez que le build de production (npm run build) génère le dossier dist sans erreur TypeScript."
          ]}
        />
      </section>

      {/* 10. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Synthèse
        </h2>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-2 text-sm text-slate-900 font-medium">
          <p>⬢ Les tests automatisés sécurisent les déploiements continus.</p>
          <p>⬢ Supertest valide le comportement des routes HTTP sans démarrer manuellement un serveur.</p>
          <p>⬢ L&apos;optimisation globale combine MySQL, Redis, Worker Threads et SSE.</p>
          <p>⬢ La sécurité et la maîtrise des coûts sont indispensables en production d&apos;applications d&apos;IA.</p>
        </div>
      </section>
    </div>
  );
};

