'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { BugTriageLab } from '@/components/interactive/BugTriageLab';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Dans le serveur Node.js initial, pourquoi l'instruction product.stock provoquait-elle un crash TypeError immédiat ?",
    options: [
      "Le tableau products était vide",
      "getProduct() est une fonction asynchrone qui renvoie une Promise, et createOrder avait omis le mot-clé await",
      "JavaScript interdit de lire les propriétés d'objets",
      "Le port 3000 était bloqué"
    ],
    correctAnswer: 1,
    explanation: "Sans await, la variable product stockait l'objet Promise. Tenter d'accéder à product.stock renvoie undefined, puis fait crasher les comparaisons."
  },
  {
    id: 2,
    question: "Quelle anomalie de calcul faussait gravement le total de la commande pour un laptop à 800 € et 2 unités ?",
    options: [
      "Une division par zéro",
      "Une addition (price + quantity = 802) au lieu d'une multiplication (price * quantity = 1600)",
      "Une conversion en hexadécimal",
      "Un arrondi inférieur systématique"
    ],
    correctAnswer: 1,
    explanation: "La formule utilisait par mégarde l'opérateur + arithmétique au lieu du produit *, produisant 802 au lieu de 1 600 €."
  },
  {
    id: 3,
    question: "Comment le code corrigé empêche-t-il la Race Condition où deux clients commandent 4 articles alors qu'il n'en reste que 5 ?",
    options: [
      "En redémarrant le serveur toutes les secondes",
      "En sérialisant les opérations de vérification et décrémentation dans une file d'attente de Promises (reservationQueue)",
      "En interdisant les requêtes POST",
      "En supprimant le stock de l'objet"
    ],
    correctAnswer: 1,
    explanation: "En enchaînant chaque réservation via reservationQueue.then(), la seconde requête n'est évaluée qu'après la décrémentation du stock par la première."
  },
  {
    id: 4,
    question: "Quel composant Express garantit la traçabilité complète d'une requête dans les logs Winston ?",
    options: [
      "Un middleware d'en-tête qui assigne un identifiant unique req.requestId via randomUUID()",
      "Un fichier CSS",
      "L'inspecteur Chrome",
      "Le port 9229"
    ],
    correctAnswer: 0,
    explanation: "Générer un UUID unique et le rattacher à req.requestId permet de logger chaque étape et erreur avec une référence de corrélation infalsifiable."
  }
];

export const Chapitre11Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'anomalies' | 'server' | 'tests' | 'checklist'>('anomalies');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ans]) => {
    const q = quizQuestions.find(item => item.id === Number(qId));
    return q && q.correctAnswer === ans ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-10 text-slate-100 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 11 — TP Final : Déboguer un serveur Node.js multi-anomalies
        </h1>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('anomalies')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'anomalies'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          1. Les 5 Anomalies identifiées
        </button>
        <button
          onClick={() => setActiveTab('server')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'server'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          2. Code Corrigé (app.js &amp; logger.js)
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'tests'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          3. Tests de Concurrence &amp; Logs
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'checklist'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          4. Grille d&apos;Évaluation (10 pts)
        </button>
      </div>

      {/* Tab 1: Anomalies */}
      {activeTab === 'anomalies' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead className="bg-slate-800/80 text-emerald-400 font-bold uppercase text-xs">
                <tr>
                  <th className="p-3.5 border-b border-slate-700">Anomalie</th>
                  <th className="p-3.5 border-b border-slate-700">Symptôme constaté</th>
                  <th className="p-3.5 border-b border-slate-700">Cause racine V8</th>
                  <th className="p-3.5 border-b border-slate-700">Correctif appliqué</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 text-rose-400 font-bold">1. TypeError</td>
                  <td className="p-3.5">Crash sur product.stock</td>
                  <td className="p-3.5">getProduct() retourne une Promise non attendue</td>
                  <td className="p-3.5 text-emerald-300">const product = await getProduct(...)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 text-amber-400 font-bold">2. Calcul Faux</td>
                  <td className="p-3.5">Total = 802 € au lieu de 1 600 €</td>
                  <td className="p-3.5">Addition au lieu d&apos;une multiplication</td>
                  <td className="p-3.5 text-emerald-300">product.price * quantity</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 text-purple-400 font-bold">3. Validation</td>
                  <td className="p-3.5">Quantité négative (-2) acceptée</td>
                  <td className="p-3.5">Absence de filtrage des entrées de requête</td>
                  <td className="p-3.5 text-emerald-300">Number.isInteger() &amp;&amp; qty &gt; 0</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 text-rose-400 font-bold">4. Race Condition</td>
                  <td className="p-3.5">2 commandes de 4 passent (stock 5)</td>
                  <td className="p-3.5">Lecture et soustraction concurrentes sur await</td>
                  <td className="p-3.5 text-emerald-300">File de réservation (reservationQueue)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 text-blue-400 font-bold">5. Observabilité</td>
                  <td className="p-3.5">Logs console.log confus sans trace</td>
                  <td className="p-3.5">Pas d&apos;identifiant de requête ni d&apos;horodatage</td>
                  <td className="p-3.5 text-emerald-300">Winston JSON + Request ID (UUID)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Code Corrigé */}
      {activeTab === 'server' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-3">
            <span className="font-bold text-emerald-400 font-sans text-sm">1. logger.js — Observabilité structurée Winston</span>
            <pre className="text-slate-300 overflow-x-auto">{`const winston = require("winston");
const fs = require("node:fs");

fs.mkdirSync("logs", { recursive: true });

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" })
  ]
});

module.exports = logger;`}</pre>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-3">
            <span className="font-bold text-cyan-400 font-sans text-sm">2. app.js — Serveur Express sécurisé et défensif</span>
            <pre className="text-slate-300 overflow-x-auto">{`const express = require("express");
const { randomUUID } = require("node:crypto");
const logger = require("./logger");

const app = express();
app.use(express.json());

const products = [
  { id: 1, name: "Laptop", price: 800, stock: 5 },
  { id: 2, name: "Mouse", price: 20, stock: 10 }
];

let reservationQueue = Promise.resolve();

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

// Middleware de Request ID & Métriques
app.use((req, res, next) => {
  req.requestId = randomUUID();
  const start = Date.now();
  logger.info("Requête reçue", { requestId: req.requestId, method: req.method, path: req.path });
  res.on("finish", () => {
    logger.info("Requête traitée", { requestId: req.requestId, status: res.statusCode, durationMs: Date.now() - start });
  });
  next();
});

async function getProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) throw new AppError("Produit introuvable", 404);
  return product;
}

function reserveStock(product, quantity) {
  const operation = reservationQueue.then(() => {
    if (product.stock < quantity) throw new AppError("Stock insuffisant", 409);
    product.stock -= quantity;
    return product.stock;
  });
  reservationQueue = operation.catch(() => {});
  return operation;
}

async function createOrder(productId, quantity) {
  if (!Number.isInteger(productId) || productId <= 0) throw new AppError("ID produit invalide", 400);
  if (!Number.isInteger(quantity) || quantity <= 0) throw new AppError("Quantité invalide", 400);

  const product = await getProduct(productId);
  await reserveStock(product, quantity);
  const total = product.price * quantity;

  return {
    product: product.name,
    quantity,
    unitPrice: product.price,
    total,
    remainingStock: product.stock
  };
}

app.post("/api/orders", async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const order = await createOrder(productId, quantity);
    res.status(201).json({ requestId: req.requestId, ...order });
  } catch (err) {
    next(err);
  }
});

// Middleware d'erreur centralisé
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error("Erreur serveur", { requestId: req.requestId, message: err.message, stack: err.stack });
  res.status(statusCode).json({ requestId: req.requestId, message: err.message });
});

app.listen(3000, () => logger.info("Serveur démarré sur le port 3000"));`}</pre>
          </div>
        </div>
      )}

      {/* Tab 3: Tests */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-3">
            <span className="font-bold text-amber-400 font-sans text-sm">test-concurrency.js — Script de tir simultané</span>
            <pre className="text-slate-300 overflow-x-auto">{`async function testConcurrency() {
  const requests = [1, 2].map(() =>
    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: 1, quantity: 4 })
    })
  );

  const responses = await Promise.all(requests);
  for (const res of responses) {
    console.log("Status HTTP:", res.status);
    console.log(await res.json());
  }
}

testConcurrency();
// Résultat garanti :
// Commande 1 -> 201 Created (reste 1 unité)
// Commande 2 -> 409 Conflict ("Stock insuffisant")`}</pre>
          </div>
        </div>
      )}

      {/* Tab 4: Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-3">
            <h3 className="font-bold text-emerald-400 font-sans text-sm">Grille d&apos;évaluation des 10 compétences de débogage :</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">✓ 1. Identifier les erreurs de variables et types (undefined, null, NaN)</li>
              <li className="flex items-center gap-2">✓ 2. Corriger les oublis critiques de await sur fonctions asynchrones</li>
              <li className="flex items-center gap-2">✓ 3. Corriger les anomalies de calcul et de formules de logique</li>
              <li className="flex items-center gap-2">✓ 4. Valider rigoureusement les données d&apos;entrée de l&apos;API</li>
              <li className="flex items-center gap-2">✓ 5. Résoudre les Race Conditions par sérialisation de Promises</li>
              <li className="flex items-center gap-2">✓ 6. Propager proprement les exceptions via throw et next(err)</li>
              <li className="flex items-center gap-2">✓ 7. Créer une classe d&apos;erreur métier spécialisée avec statusCode</li>
              <li className="flex items-center gap-2">✓ 8. Déboguer pas à pas avec points d&apos;arrêt dans VS Code</li>
              <li className="flex items-center gap-2">✓ 9. Analyser les frames de la Call Stack et du Scope</li>
              <li className="flex items-center gap-2">✓ 10. Mettre en œuvre des journaux JSON structurés corrélés par Request ID</li>
            </ul>
          </div>
        </div>
      )}

      {/* Laboratoire Interactif de Triage de Bugs */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-400" />
          <h2 className="text-[19px] font-bold text-white">
            Atelier Interactif : Investigation d&apos;Incidents en Direct
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          Enquêtez sur deux incidents de production réels : examinez le rapport, inspectez la réponse HTTP, déchiffrez la stack trace du serveur et appliquez le correctif adapté :
        </p>
        <BugTriageLab />
      </section>

      {/* Quiz de Synthèse */}
      <section className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6 text-white space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <Icon name="info" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Quiz d&apos;Évaluation Pratique du TP</h2>
              <p className="text-xs text-slate-400">Validez vos acquis avant l&apos;examen de certification officiel du Module 3</p>
            </div>
          </div>
          {showResults && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              <Icon name="rocket" className="w-3.5 h-3.5" /> Recommencer
            </button>
          )}
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q) => {
            const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

            return (
              <div key={q.id} className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                <p className="text-sm font-semibold text-slate-200 mb-3">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    let btnStyle = "bg-slate-900/70 border-slate-700/60 text-slate-300 hover:bg-slate-800";
                    if (showResults) {
                      if (optIndex === q.correctAnswer) {
                        btnStyle = "bg-emerald-950/60 border-emerald-500/60 text-emerald-200";
                      } else if (selectedAnswers[q.id] === optIndex) {
                        btnStyle = "bg-rose-950/60 border-rose-500/60 text-rose-200";
                      }
                    } else if (selectedAnswers[q.id] === optIndex) {
                      btnStyle = "bg-emerald-900/40 border-emerald-500/50 text-emerald-300";
                    }

                    return (
                      <button
                        key={optIndex}
                        disabled={showResults}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                    isCorrect ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300' : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
                  }`}>
                    <strong>{isCorrect ? '✓ Exact ! ' : '✗ Incorrect. '}</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md transition-all"
            >
              Valider les réponses du TP
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-300">
                Score TP : <strong className="text-emerald-400">{score} / {quizQuestions.length}</strong>
              </span>
              <span className="text-xs text-slate-400">
                ({score === quizQuestions.length ? 'Excellente maîtrise technique !' : 'Revoyez les étapes d\'analyse des anomalies.'})
              </span>
            </div>
          )}

          <Link
            href="/examens/debugging/module-3"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all"
          >
            Passer l&apos;Examen du Module 3 <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

