'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
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
      "Le tableau products était vide en mémoire",
      "getProduct() est une fonction asynchrone qui renvoie une Promise, et createOrder avait omis le mot-clé await",
      "JavaScript interdit formellement de lire les propriétés d'objets",
      "Le port réseau 3000 était bloqué"
    ],
    correctAnswer: 1,
    explanation: "Sans await, la variable product stockait l'instance de l'objet Promise. Tenter d'accéder à product.stock renvoie undefined, puis déclenche un crash lors des comparaisons ultérieures."
  },
  {
    id: 2,
    question: "Quelle anomalie de calcul arithmétique faussait gravement le total de la commande pour un laptop à 800 € et 2 unités ?",
    options: [
      "Une division par zéro",
      "Une addition par mégarde (price + quantity = 802) au lieu d'une multiplication (price * quantity = 1600)",
      "Une conversion en hexadécimal",
      "Un arrondi inférieur systématique avec Math.floor"
    ],
    correctAnswer: 1,
    explanation: "La formule de facturation utilisait par inadvertance l'opérateur + arithmétique au lieu du produit *, produisant 802 € au lieu des 1 600 € attendus."
  },
  {
    id: 3,
    question: "Comment le code corrigé empêche-t-il la Race Condition où deux clients commandent 4 articles alors qu'il n'en reste que 5 ?",
    options: [
      "En redémarrant le serveur Node.js toutes les secondes",
      "En sérialisant les opérations de vérification et décrémentation dans une file d'attente de Promises (reservationQueue)",
      "En désactivant le verbe HTTP POST",
      "En supprimant la propriété stock du catalogue"
    ],
    correctAnswer: 1,
    explanation: "En enchaînant chaque réservation via reservationQueue = reservationQueue.then(...), la seconde requête attend impérativement la fin de la première avant d'évaluer la disponibilité restante."
  },
  {
    id: 4,
    question: "Quel mécanisme garantit la traçabilité complète d'une requête asynchrone à travers tous les modules sans polluer les arguments ?",
    options: [
      "L'utilisation d'AsyncLocalStorage avec injection d'un Request ID (UUID) dès le middleware d'entrée",
      "L'insertion d'un commentaire en tête de fichier",
      "Le recours systématique à console.log",
      "La création d'un thread worker par fonction"
    ],
    correctAnswer: 0,
    explanation: "AsyncLocalStorage propage automatiquement le contexte (Request ID, IP, horodatage) à travers l'Event Loop, permettant au logger de l'inclure dans chaque log sans altérer la signature des fonctions."
  },
  {
    id: 5,
    question: "Pourquoi est-il indispensable que le middleware global d'erreur d'Express déclare rigoureusement 4 paramètres (err, req, res, next) ?",
    options: [
      "Pour être compatible avec le protocole HTTP/2",
      "Parce qu'Express examine la propriété fn.length pour distinguer les middlewares classiques (3 args) des gestionnaires d'erreurs (4 args)",
      "Pour pouvoir envoyer des emails d'alerte",
      "Pour éviter les blocages de la boucle Event Loop"
    ],
    correctAnswer: 1,
    explanation: "Express inspecte fn.length lors de l'enregistrement. Une fonction à 4 arguments est reconnue comme un Error Handling Middleware et reçoit toutes les exceptions transmises via next(err)."
  },
  {
    id: 6,
    question: "Quelle méthode HTTP et quel statut doivent être retournés lors d'un conflit de stock insuffisant sur une commande POST ?",
    options: [
      "Statut HTTP 200 OK avec un message d'erreur",
      "Statut HTTP 409 Conflict (ou 400 Bad Request) avec un message d'explication clair en JSON",
      "Statut HTTP 500 Internal Server Error",
      "Statut HTTP 301 Moved Permanently"
    ],
    correctAnswer: 1,
    explanation: "Le code HTTP 409 Conflict signale précisément que la requête ne peut pas être traitée en raison d'un conflit d'état avec la ressource actuelle (stock insuffisant), évitant de faire passer une erreur métier pour un crash serveur 500."
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
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Atelier Pratique de Synthèse &amp; Examen</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Chapitre 11 — TP Final : Déboguer un serveur Node.js multi-anomalies
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Vous êtes d&apos;astreinte et devez intervenir en urgence sur le service de gestion des commandes d&apos;une plateforme e-commerce. Cinq anomalies critiques paralysent les ventes : un <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">TypeError</code> dû à une fonction asynchrone non attendue, une erreur de calcul silencieuse sur le montant total, une absence de validation des quantités, une sur-vente catastrophique par <strong>Race Condition</strong> et une absence totale de traçabilité dans les logs. Reconstituez, diagnostiquez et certifiez vos compétences.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('anomalies')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'anomalies'
              ? 'bg-slate-900 text-lime-300 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          1. Les 5 Anomalies Identifiées
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('server')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'server'
              ? 'bg-slate-900 text-lime-300 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          2. Code Corrigé (Architecture Sécurisée)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'tests'
              ? 'bg-slate-900 text-lime-300 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          3. Tirs de Concurrence &amp; Logs
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'checklist'
              ? 'bg-slate-900 text-lime-300 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          4. Grille d&apos;Évaluation (10 Compétences)
        </button>
      </div>

      {/* Tab 1: Anomalies */}
      {activeTab === 'anomalies' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-700">
            Voici la matrice diagnostique détaillée des 5 défaillances découvertes lors de l&apos;audit de l&apos;API de commande :
          </p>
          <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
                <tr>
                  <th className="p-3.5 border-b border-slate-200">Anomalie</th>
                  <th className="p-3.5 border-b border-slate-200">Symptôme constaté</th>
                  <th className="p-3.5 border-b border-slate-200">Cause racine V8</th>
                  <th className="p-3.5 border-b border-slate-200">Correctif appliqué</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 font-sans">
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-rose-700 font-bold font-mono">1. TypeError</td>
                  <td className="p-3.5 font-medium">Crash du serveur lors de la lecture de <code className="font-mono text-xs">product.stock</code></td>
                  <td className="p-3.5 text-slate-600"><code className="font-mono text-xs">getProduct()</code> retourne une Promise, et <code className="font-mono text-xs">await</code> a été omis !</td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">const product = await getProduct(...)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-amber-700 font-bold font-mono">2. Calcul Faux</td>
                  <td className="p-3.5 font-medium">Total de 802 € au lieu de 1 600 € pour 2 laptops à 800 €</td>
                  <td className="p-3.5 text-slate-600">Formule utilisant l&apos;opérateur <code className="font-mono text-xs">+</code> (addition) au lieu de <code className="font-mono text-xs">*</code> (multiplication)</td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">product.price * quantity</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-purple-700 font-bold font-mono">3. Validation</td>
                  <td className="p-3.5 font-medium">Quantité négative (<code className="font-mono text-xs">-2</code>) acceptée, augmentant artificiellement le stock</td>
                  <td className="p-3.5 text-slate-600">Absence de filtrage des entrées utilisateurs du corps JSON</td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">Number.isInteger(qty) &amp;&amp; qty &gt; 0</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-rose-700 font-bold font-mono">4. Race Condition</td>
                  <td className="p-3.5 font-medium">Deux commandes simultanées de 4 unités sont acceptées alors que le stock est de 5</td>
                  <td className="p-3.5 text-slate-600">Anti-pattern Check-Then-Act : lecture et écriture séparées par un <code className="font-mono text-xs">await</code></td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">File de Promises (reservationQueue)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 text-sky-700 font-bold font-mono">5. Observabilité</td>
                  <td className="p-3.5 font-medium">Logs en vrac dans <code className="font-mono text-xs">console.log</code> sans corrélation</td>
                  <td className="p-3.5 text-slate-600">Absence d&apos;identifiant de requête (<code className="font-mono text-xs">requestId</code>) et de formatage JSON structuré</td>
                  <td className="p-3.5 text-emerald-700 font-bold font-mono text-xs">Winston JSON + Request ID (UUID)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Code Corrigé */}
      {activeTab === 'server' && (
        <div className="space-y-6">
          <p className="text-sm text-slate-700">
            Voici l&apos;architecture de référence corrigée, structurée et prête pour la production :
          </p>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Icon name="code" className="w-4 h-4 text-emerald-600" />
              <span>1. logger.js — Observabilité structurée au format JSON Winston</span>
            </h3>
            <CodeBlock
              language="javascript"
              filename="logger.js"
              code={`const winston = require("winston");
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

module.exports = logger;`}
            />
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Icon name="code" className="w-4 h-4 text-emerald-600" />
              <span>2. app.js — Serveur Express résilient, défensif et thread-safe</span>
            </h3>
            <CodeBlock
              language="javascript"
              filename="app.js"
              code={`const express = require("express");
const { randomUUID } = require("node:crypto");
const logger = require("./logger");

const app = express();
app.use(express.json());

// Base de données simulée en mémoire :
const products = [
  { id: 1, name: "Laptop Ultra Pro", price: 800, stock: 5 },
  { id: 2, name: "Souris Ergonomique", price: 20, stock: 10 }
];

// File de réservation pour éliminer les Race Conditions (Mutex Queue) :
let reservationQueue = Promise.resolve();

// Classe d'erreur métier typée :
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

// Middleware de Request ID & traçabilité :
app.use((req, res, next) => {
  req.requestId = randomUUID();
  const start = Date.now();
  logger.info("Requête entrante", { requestId: req.requestId, method: req.method, path: req.path });
  
  res.on("finish", () => {
    logger.info("Requête traitée", { 
      requestId: req.requestId, 
      status: res.statusCode, 
      durationMs: Date.now() - start 
    });
  });
  next();
});

// Récupération asynchrone avec contrôle d'existence :
async function getProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) throw new AppError("Produit introuvable dans le catalogue", 404);
  return product;
}

// Réservation sérialisée garantissant l'absence de sur-vente :
function reserveStock(product, quantity) {
  const operation = reservationQueue.then(() => {
    if (product.stock < quantity) {
      throw new AppError(\`Stock insuffisant : \${product.stock} disponibles, \${quantity} demandés\`, 409);
    }
    product.stock -= quantity;
    return product.stock;
  });
  reservationQueue = operation.catch(() => {});
  return operation;
}

// Orchestrateur de commande défensif :
async function createOrder(productId, quantity) {
  // 1. Validation stricte des entrées :
  if (!Number.isInteger(productId) || productId <= 0) {
    throw new AppError("L'identifiant produit doit être un entier positif", 400);
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new AppError("La quantité commandée doit être un entier strictement positif", 400);
  }

  // 2. Résolution asynchrone sécurisée avec await :
  const product = await getProduct(productId);
  await reserveStock(product, quantity);

  // 3. Calcul arithmétique exact (multiplication) :
  const total = product.price * quantity;

  return {
    productName: product.name,
    quantity,
    unitPrice: product.price,
    total,
    remainingStock: product.stock
  };
}

// Route de commande :
app.post("/api/orders", async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const order = await createOrder(productId, quantity);
    res.status(201).json({ requestId: req.requestId, ...order });
  } catch (err) {
    next(err);
  }
});

// Middleware d'erreur centralisé à 4 arguments :
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error("Erreur d'exécution", { 
    requestId: req.requestId, 
    message: err.message, 
    stack: err.stack 
  });
  res.status(statusCode).json({ 
    requestId: req.requestId, 
    success: false, 
    message: err.message 
  });
});

app.listen(3000, () => logger.info("Serveur API e-commerce démarré sur http://localhost:3000"));`}
            />
          </div>
        </div>
      )}

      {/* Tab 3: Tests */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-700">
            Ce script de test envoie deux requêtes concurrentes simultanées demandant chacune 4 articles alors que le stock initial est de 5 :
          </p>
          <CodeBlock
            language="javascript"
            filename="test-concurrency.js"
            code={`async function testConcurrency() {
  console.log("Lancement de 2 commandes simultanées de 4 unités (Stock initial: 5)...");

  const requests = [1, 2].map((clientId) =>
    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: 1, quantity: 4 })
    }).then(async (res) => ({
      clientId,
      status: res.status,
      body: await res.json()
    }))
  );

  const results = await Promise.all(requests);

  for (const r of results) {
    console.log(\`Client \${r.clientId} -> Statut HTTP \${r.status} :\`, r.body);
  }
}

testConcurrency();

/* RÉSULTAT OBTENU DANS LA CONSOLE :
Client 1 -> Statut HTTP 201 Created :
{
  requestId: '7c81a29f-8182-4112-9c10-21a4812f8a11',
  productName: 'Laptop Ultra Pro',
  quantity: 4,
  unitPrice: 800,
  total: 3200,
  remainingStock: 1
}

Client 2 -> Statut HTTP 409 Conflict :
{
  requestId: 'fa204918-1002-45a1-8e01-20921098fa01',
  success: false,
  message: 'Stock insuffisant : 1 disponibles, 4 demandés'
}
*/`}
          />
        </div>
      )}

      {/* Tab 4: Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Grille d&apos;évaluation des 10 compétences clés de débogage du Module 3 :
            </h3>
            <ul className="space-y-2.5 text-slate-800">
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 1.</span>
                <span><strong>Typage &amp; Variables :</strong> Distinguer <code className="font-mono text-xs">undefined</code>, <code className="font-mono text-xs">null</code>, <code className="font-mono text-xs">NaN</code> et manipuler les objets par référence immuable.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 2.</span>
                <span><strong>Scope &amp; Hoisting :</strong> Diagnostiquer la Temporal Dead Zone (TDZ) et le masquage de variable (Shadowing).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 3.</span>
                <span><strong>Logique Conditionnelle :</strong> Déjouer le piège de l&apos;ASI après <code className="font-mono text-xs">return</code> et maîtriser la coalescence des nuls (<code className="font-mono text-xs">??</code>).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 4.</span>
                <span><strong>Promises &amp; Fetch :</strong> Vérifier systématiquement <code className="font-mono text-xs">response.ok</code> et arbitrer entre <code className="font-mono text-xs">Promise.all()</code> et <code className="font-mono text-xs">allSettled()</code>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 5.</span>
                <span><strong>Async / Await :</strong> Éliminer les oublis de <code className="font-mono text-xs">await</code> dans les conditions <code className="font-mono text-xs">if</code> et proscrire <code className="font-mono text-xs">forEach</code> avec async.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 6.</span>
                <span><strong>Race Conditions :</strong> Éradiquer l&apos;anti-pattern Check-Then-Act grâce aux verrous atomiques et files de Promises.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 7.</span>
                <span><strong>Exceptions d&apos;entreprise :</strong> Structurer des classes dérivées d&apos;<code className="font-mono text-xs">AppError</code> avec chaînage <code className="font-mono text-xs">error.cause</code>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 8.</span>
                <span><strong>Inspecteur Node.js :</strong> Maîtriser <code className="font-mono text-xs">--inspect</code>, <code className="font-mono text-xs">--inspect-brk</code> et la navigation au pas à pas dans VS Code.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 9.</span>
                <span><strong>Architecture launch.json :</strong> Savoir configurer les Source Maps pour TypeScript et blackboxer avec <code className="font-mono text-xs">skipFiles</code>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓ 10.</span>
                <span><strong>Observabilité &amp; RGPD :</strong> Structurer les journaux en JSON avec Request ID et assainir les données sensibles (PII).</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Laboratoire Interactif de Triage de Bugs */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            Atelier Interactif : Investigation d&apos;Incidents en Direct
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Enquêtez sur deux incidents de production réels : examinez le rapport, inspectez la réponse HTTP, déchiffrez la stack trace du serveur et appliquez le correctif adapté :
        </p>
        <BugTriageLab />
      </section>

      {/* Callout de synthèse */}
      <Callout type="tip" title="Conseil d'ingénierie pour l'examen de certification">
        <p className="text-sm leading-relaxed">
          Prenez le temps d&apos;analyser chaque question du quiz ci-dessous. Les concepts abordés (Stack Unwinding, gestion de la concurrence, propagation d&apos;erreurs asynchrones et validation des entrées) constituent le cœur de l&apos;examen officiel du Module 3.
        </p>
      </Callout>

      {/* Quiz de Synthèse */}
      <section className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Icon name="info" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Quiz de Validation Pratique du TP</h2>
              <p className="text-xs text-slate-400">Validez vos acquis avant de débloquer l&apos;examen officiel du Module 3</p>
            </div>
          </div>
          {showResults && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors self-start sm:self-auto"
            >
              <Icon name="rocket" className="w-3.5 h-3.5" /> Recommencer
            </button>
          )}
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q) => {
            const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

            return (
              <div key={q.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <p className="text-sm font-semibold text-slate-200">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800";
                    if (showResults) {
                      if (optIndex === q.correctAnswer) {
                        btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                      } else if (selectedAnswers[q.id] === optIndex) {
                        btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                      }
                    } else if (selectedAnswers[q.id] === optIndex) {
                      btnStyle = "bg-emerald-900/40 border-emerald-500 text-emerald-300 font-bold";
                    }

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        disabled={showResults}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                    isCorrect ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
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
              type="button"
              onClick={() => setShowResults(true)}
              disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md transition-all"
            >
              Valider les réponses du TP
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-300">
                Score TP : <strong className="text-emerald-400">{score} / {quizQuestions.length}</strong>
              </span>
              <span className="text-xs text-slate-400">
                ({score === quizQuestions.length ? 'Excellente maîtrise technique ! Félicitations !' : 'Revoyez les étapes d\'analyse des anomalies avant l\'examen.'})
              </span>
            </div>
          )}

          <Link
            href="/examens/debugging/module-3"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition-all"
          >
            Passer l&apos;Examen du Module 3 <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
