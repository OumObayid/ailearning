'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Débogage des API REST
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
            <span>Retracer les 5 étapes du parcours d&apos;une requête dans Express.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Corriger le bogue de comparaison stricte (===) entre req.params (string) et ID (number).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Valider et nettoyer les Query Parameters facultatifs (pagination, filtres).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Séparer rigoureusement la logique de route, de validation et d&apos;accès aux données.</span>
          </li>
        </ul>
      </section>

      {/* 2. Le parcours d'une requête REST */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Le parcours en 5 couches d&apos;une requête REST
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Lorsqu&apos;un client appelle <code className="font-mono font-bold">GET /api/products/15</code>, la requête traverse plusieurs modules d&apos;architecture. Déboguer consiste à vérifier à quelle frontière le flux s&apos;interrompt :
        </p>

        <div className="space-y-2 text-xs font-mono">
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-950 font-sans">1. Routeur (Router)</span>
            <span className="text-slate-500 font-sans">Aiguille la méthode GET et le pattern /:id</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-950 font-sans">2. Middlewares</span>
            <span className="text-slate-500 font-sans">Vérifie l&apos;authentification JWT et parse le JSON</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-950 font-sans">3. Contrôleur (Controller)</span>
            <span className="text-slate-500 font-sans">Extrait req.params.id et contrôle son type</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-950 font-sans">4. Service &amp; Base (Model/MySQL)</span>
            <span className="text-slate-500 font-sans">Exécute la requête préparée SELECT ... WHERE id = ?</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-950 font-sans">5. Réponse HTTP</span>
            <span className="text-slate-500 font-sans">Retourne le statut 200 OK et le payload sérialisé</span>
          </div>
        </div>
      </section>

      {/* 3. Pièges fréquents sur req.params */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Pièges majeurs sur les paramètres de route
        </h2>
        <Callout type="danger">
          <strong>Tout paramètre d&apos;URL est une chaîne de caractères :</strong> Si vous interrogez <code className="font-mono">GET /api/products/15</code>, <code className="font-mono">req.params.id</code> vaut la chaîne <code className="font-mono font-bold">&quot;15&quot;</code> ! Une comparaison stricte <code className="font-mono">product.id === req.params.id</code> échouera toujours si l&apos;identifiant de votre base de données est un entier numérique (<code className="font-mono">15 === &quot;15&quot; ➔ false</code>).
        </Callout>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-emerald-400 font-bold">{`// Extraction et validation sécurisée d'un identifiant numérique :`}</div>
          <div>{`app.get("/api/products/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // Rejeter immédiatement les valeurs non entières ou négatives :
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ success: false, message: "L'identifiant doit être un entier positif" });
    }

    const product = await findProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Produit introuvable" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});`}</div>
        </div>
      </section>

      {/* 4. TP Pratique : Corriger les bugs d'une API REST */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          4. Travaux Pratiques — Corriger un endpoint REST e-commerce
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-2">
            <span className="font-bold text-rose-400 font-sans uppercase">❌ Code Vulnérable :</span>
            <pre className="text-slate-300">{`// Échoue silencieusement et additionne le prix et la qty :
app.post("/api/orders", (req, res) => {
  const { price, quantity } = req.body;
  const total = price + quantity; // Faux !
  res.json({ total });
});`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 font-sans uppercase">✅ Code Robuste et Validé :</span>
            <pre className="text-slate-300">{`app.post("/api/orders", (req, res) => {
  const { price, quantity } = req.body;
  if (typeof price !== "number" || typeof quantity !== "number" || price <= 0 || quantity <= 0) {
    return res.status(422).json({ message: "Prix ou quantité invalide" });
  }
  const total = price * quantity;
  res.status(201).json({ success: true, total });
});`}</pre>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 4.3
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Où se récupère la valeur 15 dans une requête appelée sur GET /api/products/15 avec la route déclarée /api/products/:id ?",
              options: [
                "req.body.id",
                "req.params.id",
                "req.query.id",
                "req.headers.id"
              ],
              correctIndex: 1,
              explanation: "Les segments dynamiques préfixés par deux-points (:id) dans le chemin de route sont extraits par Express dans l'objet req.params."
            },
            {
              id: 2,
              question: "Quel est le type primitif de la valeur stockée dans req.params.id avant toute conversion manuelle ?",
              options: [
                "number",
                "string",
                "boolean",
                "undefined"
              ],
              correctIndex: 1,
              explanation: "Tout segment d'URL est par essence une chaîne de caractères (string). Une conversion explicite via Number() est indispensable pour des comparaisons d'ID numériques."
            },
            {
              id: 3,
              question: "Comment extraire les paramètres d'une requête GET /api/products?category=pc&page=2 ?",
              options: [
                "req.query.category et req.query.page",
                "req.params.category",
                "req.body.page",
                "req.headers.query"
              ],
              correctIndex: 0,
              explanation: "Les paramètres passés après le point d'interrogation (?) sont parsés par Express dans l'objet req.query."
            }
          ]}
        />
      </section>
    </div>
  );
};

