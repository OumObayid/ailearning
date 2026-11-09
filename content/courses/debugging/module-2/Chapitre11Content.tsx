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
    question: "Dans l'API de commande, lorsqu'un produit inexistant (ID 99) est demandé, quelle est la bonne pratique défensive pour éviter le crash en TypeError du serveur ?",
    options: [
      "Laisser le serveur crasher et compter sur le redémarrage automatique de nodemon",
      "Vérifier explicitement if (!product) et répondre avec un statut HTTP 404 (Not Found) sans tenter de lire product.price",
      "Remplacer find() par une boucle while infinie",
      "Retourner un prix de 0 € sans avertir le client"
    ],
    correctAnswer: 1,
    explanation: "Si le produit n'existe pas en base, find() renvoie undefined. Tenter d'accéder à product.price lève un TypeError bloquant. Il faut impérativement vérifier if (!product) et répondre avec le code HTTP 404 approprié."
  },
  {
    id: 2,
    question: "Pourquoi l'instruction frontend 'data.data.product' provoquait-elle une erreur JavaScript lors d'une réponse d'échec du serveur ?",
    options: [
      "Parce que le navigateur n'accepte pas le format JSON",
      "Parce que fetch() résout sa Promise même en cas d'erreur HTTP 404/500, et le frontend n'a pas vérifié response.ok avant d'accéder à une propriété inexistante",
      "Parce que la variable data était déclarée avec const au lieu de var",
      "Parce que le port 3000 était bloqué par le pare-feu"
    ],
    correctAnswer: 1,
    explanation: "fetch() ne rejette pas en cas d'erreur HTTP 404 ou 500. Le backend renvoyait { success: false, message: ... } sans champ data, causant un TypeError sur data.data.product. Il faut toujours vérifier if (!response.ok)."
  },
  {
    id: 3,
    question: "Quelle commande de débogueur dans VS Code a permis d'observer que la fonction calculateDiscount() soustrayait 10 € au lieu de 10 % ?",
    options: [
      "Stop (Shift + F5)",
      "Step Into (F11) pour entrer à l'intérieur de calculateDiscount() et inspecter la variable discount",
      "Restart (Ctrl + Shift + F5)",
      "Fermer VS Code"
    ],
    correctAnswer: 1,
    explanation: "Step Into (F11) permet de descendre à l'intérieur de la fonction appelée pour inspecter les arguments réels reçus et repérer la formule erronée return subtotal - discount."
  },
  {
    id: 4,
    question: "Comment configurer VS Code pour qu'il ignore les fichiers internes de Node.js lors des commandes Step Into ?",
    options: [
      "En supprimant le dossier node_modules",
      "En ajoutant la directive 'skipFiles': ['<node_internals>/**', '**/node_modules/**'] dans launch.json",
      "En réinstallant Windows",
      "En désactivant le débogueur"
    ],
    correctAnswer: 1,
    explanation: "La propriété skipFiles de launch.json indique au débogueur de sauter automatiquement la plomberie interne de Node.js et des bibliothèques externes."
  },
  {
    id: 5,
    question: "Dans Chrome DevTools, quelle option essentielle du panneau Network empêche l'effacement de l'historique lors d'une soumission de formulaire ?",
    options: [
      "Disable Cache",
      "Preserve Log",
      "Throttling Slow 3G",
      "Clear Site Data"
    ],
    correctAnswer: 1,
    explanation: "Cocher 'Preserve log' conserve l'ensemble des requêtes même si la page est rechargée après l'envoi d'un formulaire."
  },
  {
    id: 6,
    question: "Que se passe-t-il lorsque vous cliquez sur un cadre parent (Stack Frame) dans le volet Call Stack de VS Code ou DevTools ?",
    options: [
      "La fonction parent est ré-exécutée depuis le début",
      "L'inspecteur de variables (Scope) affiche l'état exact des variables de la fonction parent au moment de son appel",
      "Le serveur plante immédiatement",
      "Tous les breakpoints sont supprimés"
    ],
    correctAnswer: 1,
    explanation: "Naviguer dans les Stack Frames permet de remonter dans le temps logique et d'inspecter les variables de l'appelant sans modifier l'exécution."
  }
];

export const Chapitre11Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'investigation' | 'correctifs' | 'validation'>('mission');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = Object.keys(selectedAnswers).reduce((acc, qId) => {
    const q = quizQuestions.find(item => item.id === parseInt(qId));
    return q && selectedAnswers[parseInt(qId)] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Atelier Pratique de Synthèse</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Chapitre 11 — TP Final : Diagnostic et Résolution d&apos;Anomalies avec Chrome DevTools et VS Code
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Mettez en pratique l&apos;ensemble de la boîte à outils acquise au cours du Module 2. Vous intervenez en tant qu&apos;ingénieur dépanneur sur une plateforme e-commerce en panne. Votre mission : isoler les erreurs HTTP dans Network, traquer un bug de calcul sournois pas à pas dans VS Code et sécuriser le frontend contre les plantages en cascade.
        </p>
      </div>

      {/* Navigation Onglets du TP */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200 rounded-2xl border border-slate-300">
        <button
          onClick={() => setActiveTab('mission')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'mission'
              ? 'bg-white text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Icon name="info" className="w-4 h-4 text-amber-600" />
          <span>1. Mission &amp; Code Initial</span>
        </button>
        <button
          onClick={() => setActiveTab('investigation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'investigation'
              ? 'bg-white text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Icon name="search" className="w-4 h-4 text-cyan-600" />
          <span>2. Démarche d&apos;Investigation</span>
        </button>
        <button
          onClick={() => setActiveTab('correctifs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'correctifs'
              ? 'bg-white text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Icon name="code" className="w-4 h-4 text-emerald-600" />
          <span>3. Code Intégral Corrigé</span>
        </button>
        <button
          onClick={() => setActiveTab('validation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'validation'
              ? 'bg-white text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Icon name="check-circle" className="w-4 h-4 text-purple-600" />
          <span>4. Plan de Validation &amp; Tests</span>
        </button>
      </div>

      {/* Onglet 1 : Mission */}
      {activeTab === 'mission' && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                <Icon name="bug" className="w-6 h-6 text-rose-600" />
                <span>Cahier des charges de l&apos;incident technique (INC-2048)</span>
              </h2>
              <p className="text-sm text-slate-700 font-medium mt-1">
                Le service support et la comptabilité signalent trois anomalies critiques sur le panier de commande d&apos;un client :
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                  <strong className="text-rose-950 text-sm">Anomalie 1 — Calcul de remise faux</strong>
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  Une commande de 3 souris à 100 € avec une remise de 10 % affiche un total de <strong>290 € au lieu de 270 €</strong> (le système a soustrait 10 € au lieu de 10 % = 30 € !).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                  <strong className="text-rose-950 text-sm">Anomalie 2 — Crash HTTP 500 sur produit</strong>
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  Lorsqu&apos;un client passe commande avec un produit ayant l&apos;ID 99 (produit archivé ou inexistant), l&apos;API plante net avec un <code className="font-mono text-rose-700">TypeError: Cannot read properties of undefined</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                  <strong className="text-rose-950 text-sm">Anomalie 3 — Crash en cascade du frontend</strong>
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  Dès que l&apos;API renvoie une erreur, la page web gèle avec un écran blanc au lieu d&apos;afficher un message convivial, car elle tente de lire <code className="font-mono text-rose-700">data.data.product</code> sur un payload d&apos;échec.
                </p>
              </div>
            </div>

            <Callout type="tip" title="La règle d'or de l'investigation fullstack">
              <p className="text-sm leading-relaxed">
                Avant de modifier quoi que ce soit dans l&apos;interface utilisateur ou dans le code Node.js, <strong>isolez toujours la responsabilité</strong> : testez d&apos;abord l&apos;API indépendamment via Postman ou le panneau Network de Chrome DevTools. Si l&apos;API retourne un code 500, le bug est côté serveur ; si l&apos;API répond 200 mais que l&apos;affichage est cassé, le bug réside dans le composant frontend !
              </p>
            </Callout>

            {/* Code Initial Défectueux */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">
                Code initial défectueux du backend (<code className="text-emerald-700 font-mono">server.js</code>) :
              </h3>
              <CodeBlock
                language="javascript"
                code={`const express = require('express');
const app = express();
app.use(express.json());

const products = [
  { id: 1, name: "Souris Ergonomique", price: 100 },
  { id: 2, name: "Clavier Mécanique", price: 200 }
];

// ❌ BUG 1 : Soustrait la valeur brute au lieu d'un pourcentage !
function calculateDiscount(subtotal, discount) {
  return subtotal - discount; // Si subtotal=300 et discount=10, donne 290 au lieu de 270 !
}

app.post('/api/orders', (req, res) => {
  const { productId, quantity, discount } = req.body;
  const product = products.find(p => p.id === productId);

  // ❌ BUG 2 : Aucun contrôle si product est undefined (ex: productId = 99) !
  const subtotal = product.price * quantity; // 💥 TypeError si product n'existe pas !
  const total = calculateDiscount(subtotal, discount);

  res.json({ success: true, data: { product: product.name, total } });
});`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Onglet 2 : Investigation */}
      {activeTab === 'investigation' && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                <Icon name="search" className="w-6 h-6 text-cyan-600" />
                <span>Protocole d&apos;investigation outillée en 3 étapes</span>
              </h2>
              <p className="text-sm text-slate-700 font-medium mt-1">
                Suivez la démarche méthodique d&apos;un ingénieur pour démasquer chaque cause racine sans jamais modifier le code à l&apos;aveugle :
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              {/* Étape 1 */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2 border border-slate-800">
                <div className="text-emerald-400 font-bold font-sans text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
                  <span>Isolation du calcul de remise (VS Code Debugger)</span>
                </div>
                <div className="text-slate-300 pl-4 space-y-1">
                  <div>1. Ouvrez <code className="text-emerald-300">server.js</code> dans VS Code et posez un breakpoint sur la ligne <code className="text-amber-300">calculateDiscount(subtotal, discount)</code>.</div>
                  <div>2. Lancez le débogage avec <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white border border-slate-700">F5</kbd>.</div>
                  <div>3. Envoyez la commande depuis Postman : <code className="text-cyan-300">&#123; productId: 1, quantity: 3, discount: 10 &#125;</code>.</div>
                  <div>4. VS Code se fige. Appuyez sur <strong className="text-emerald-400">Step Into (F11)</strong> pour entrer dans la fonction.</div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-rose-300 font-sans mt-2">
                    🎯 <strong>Constat dans le Scope :</strong> <code className="font-mono">subtotal = 300</code>, <code className="font-mono">discount = 10</code>. L&apos;instruction <code className="font-mono text-white">return subtotal - discount</code> retourne 290. La formule mathématique a confondu un montant forfaitaire en euros avec un pourcentage !
                  </div>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2 border border-slate-800">
                <div className="text-cyan-400 font-bold font-sans text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs">2</span>
                  <span>Diagnostic du produit inexistant (DevTools Network + Console)</span>
                </div>
                <div className="text-slate-300 pl-4 space-y-1">
                  <div>1. Dans le frontend, sélectionnez le produit ID 99 et cliquez sur Commander.</div>
                  <div>2. Ouvrez l&apos;onglet <strong>Network</strong> de Chrome DevTools : la requête s&apos;affiche en rouge vif avec le code <strong className="text-rose-400">500 Internal Server Error</strong>.</div>
                  <div>3. L&apos;onglet Response indique : <code className="text-rose-300">&quot;TypeError: Cannot read properties of undefined (reading &apos;price&apos;)&quot;</code>.</div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-rose-300 font-sans mt-2">
                    🎯 <strong>Cause racine :</strong> <code className="font-mono">products.find()</code> a retourné <code className="font-mono text-white">undefined</code> car l&apos;ID 99 n&apos;existe pas. Le serveur doit répondre avec un code <strong>404 Not Found</strong> au lieu de crasher.
                  </div>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2 border border-slate-800">
                <div className="text-amber-400 font-bold font-sans text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">3</span>
                  <span>Diagnostic du crash en cascade frontend (Chrome Sources)</span>
                </div>
                <div className="text-slate-300 pl-4 space-y-1">
                  <div>1. Dans le fichier client <code className="text-emerald-300">index.html</code>, le code exécute aveuglément :</div>
                  <div className="pl-2 text-rose-300 font-mono">const data = await response.json();<br />resultDiv.textContent = data.data.product;</div>
                  <div>2. Or, sur une erreur 500 ou 404, le backend renvoie <code className="text-amber-300">&#123; success: false, message: ... &#125;</code> (sans propriété data !).</div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-amber-300 font-sans mt-2">
                    🎯 <strong>Le piège Fetch révélé :</strong> <code className="font-mono">fetch()</code> ne rejette pas sa Promise lors d&apos;une erreur HTTP 404 ou 500. Le frontend doit impérativement tester <code className="font-mono text-white">if (!response.ok)</code> avant de manipuler les données.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onglet 3 : Correctifs */}
      {activeTab === 'correctifs' && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                <Icon name="code" className="w-6 h-6 text-emerald-600" />
                <span>Code Intégral Corrigé : Backend Express &amp; Frontend Défensif</span>
              </h2>
              <p className="text-sm text-slate-700 font-medium mt-1">
                Voici les implémentations conformes aux standards de production :
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-700 block mb-1">
                  1. Backend robuste avec gestion d&apos;erreurs HTTP (<code className="font-mono">server.js</code>) :
                </span>
                <CodeBlock
                  language="javascript"
                  code={`const express = require('express');
const app = express();
app.use(express.json());

const products = [
  { id: 1, name: "Souris Ergonomique", price: 100 },
  { id: 2, name: "Clavier Mécanique", price: 200 }
];

// ✓ CORRECTION 1 : Calcul en pourcentage rigoureux
function calculateDiscount(subtotal, discountPercent = 0) {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Le pourcentage de remise doit être compris entre 0 et 100.");
  }
  const discountAmount = subtotal * (discountPercent / 100);
  return subtotal - discountAmount;
}

app.post('/api/orders', (req, res) => {
  try {
    const { productId, quantity, discount } = req.body;

    // Validation des entrées
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Quantité invalide (doit être >= 1)." });
    }

    const product = products.find(p => p.id === productId);

    // ✓ CORRECTION 2 : Contrôle d'existence et code HTTP 404
    if (!product) {
      return res.status(404).json({
        success: false,
        message: \`Le produit avec l'identifiant \${productId} est introuvable.\`
      });
    }

    const subtotal = product.price * quantity;
    const total = calculateDiscount(subtotal, discount);

    return res.status(201).json({
      success: true,
      data: {
        product: product.name,
        quantity,
        subtotal,
        discountPercent: discount || 0,
        total
      }
    });
  } catch (error) {
    console.error("[OrderService] Erreur interne :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});`}
                />
              </div>

              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold uppercase text-cyan-700 block mb-1">
                  2. Frontend défensif avec contrôle response.ok (<code className="font-mono">app.js</code>) :
                </span>
                <CodeBlock
                  language="javascript"
                  code={`async function commanderProduit(productId, quantity, discount) {
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error-banner");

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, discount })
    });

    const payload = await response.json();

    // ✓ CORRECTION 3 : Contrôle systématique du statut HTTP
    if (!response.ok) {
      throw new Error(payload.message || \`Erreur HTTP \${response.status}\`);
    }

    // Affichage sécurisé des données
    resultDiv.textContent = \`✓ Commande validée : \${payload.data.product} - Total : \${payload.data.total} €\`;
    errorDiv.classList.add("hidden");
  } catch (error) {
    console.error("[Frontend] Échec de la commande :", error.message);
    errorDiv.textContent = \`⚠️ \${error.message}\`;
    errorDiv.classList.remove("hidden");
  }
}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onglet 4 : Validation */}
      {activeTab === 'validation' && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
              <Icon name="check-circle" className="w-6 h-6 text-purple-600" />
              <span>Matrice de Validation &amp; Recette Technique</span>
            </h2>
            <p className="text-sm text-slate-700 font-medium">
              Vérifiez le comportement de l&apos;application sur les 5 cas limites avec les codes HTTP correspondants :
            </p>

            <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm font-mono">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold">
                  <tr>
                    <th className="p-3.5">Scénario de test</th>
                    <th className="p-3.5">Données envoyées (Payload)</th>
                    <th className="p-3.5">Statut HTTP</th>
                    <th className="p-3.5">Résultat attendu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-950">Commande 3 souris à 10%</td>
                    <td className="p-3.5">&#123; productId: 1, quantity: 3, discount: 10 &#125;</td>
                    <td className="p-3.5 text-emerald-700 font-bold">201 Created</td>
                    <td className="p-3.5 text-emerald-700 font-bold">Total = 270 € (300 - 30)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-950">Commande sans remise</td>
                    <td className="p-3.5">&#123; productId: 2, quantity: 2, discount: 0 &#125;</td>
                    <td className="p-3.5 text-emerald-700 font-bold">201 Created</td>
                    <td className="p-3.5 text-emerald-700 font-bold">Total = 400 €</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-amber-50/50">
                    <td className="p-3.5 font-bold text-slate-950">Produit inexistant (ID 99)</td>
                    <td className="p-3.5">&#123; productId: 99, quantity: 1, discount: 0 &#125;</td>
                    <td className="p-3.5 text-amber-700 font-bold">404 Not Found</td>
                    <td className="p-3.5 text-amber-800">Bannière &quot;Produit introuvable&quot;</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-rose-50/50">
                    <td className="p-3.5 font-bold text-slate-950">Quantité nulle ou négative</td>
                    <td className="p-3.5">&#123; productId: 1, quantity: 0, discount: 0 &#125;</td>
                    <td className="p-3.5 text-rose-700 font-bold">400 Bad Request</td>
                    <td className="p-3.5 text-rose-800">Bannière &quot;Quantité invalide&quot;</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-rose-50/50">
                    <td className="p-3.5 font-bold text-slate-950">Remise illégale (&gt; 100%)</td>
                    <td className="p-3.5">&#123; productId: 1, quantity: 1, discount: 150 &#125;</td>
                    <td className="p-3.5 text-rose-700 font-bold">400 Bad Request</td>
                    <td className="p-3.5 text-rose-800">Bannière &quot;Remise hors limites&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Laboratoire Interactif de Triage de Bugs Réels */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[20px] font-bold text-slate-900">
            Atelier Interactif : Investigation d&apos;Incidents Réels en Direct
          </h2>
        </div>
        <p className="text-sm text-slate-700 font-medium">
          Mettez en pratique vos compétences d&apos;enquêteur technique sur des cas réels : inspectez la requête HTTP, décodez la stack trace du serveur, choisissez le correctif optimal et lancez le test de validation :
        </p>
        <BugTriageLab />
      </section>

      {/* Quiz de Synthèse du Module 2 */}
      <section className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <Icon name="academic-cap" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950">Quiz d&apos;Évaluation Pratique du TP</h2>
              <p className="text-xs text-slate-600 font-medium">Validez votre maîtrise méthodologique des outils avant l&apos;examen officiel du Module 2</p>
            </div>
          </div>
          {showResults && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Icon name="refresh" className="w-3.5 h-3.5" /> Recommencer
            </button>
          )}
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q) => {
            const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

            return (
              <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <p className="text-sm font-bold text-slate-950">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    let btnStyle = "bg-white border-slate-200 text-slate-800 hover:bg-slate-100";
                    if (showResults) {
                      if (optIndex === q.correctAnswer) {
                        btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                      } else if (selectedAnswers[q.id] === optIndex) {
                        btnStyle = "bg-rose-100 border-rose-400 text-rose-950 font-bold";
                      }
                    } else if (selectedAnswers[q.id] === optIndex) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                    }

                    return (
                      <button
                        key={optIndex}
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
                    isCorrect ? 'bg-emerald-50 border border-emerald-300 text-emerald-950' : 'bg-rose-50 border border-rose-300 text-rose-950'
                  }`}>
                    <strong>{isCorrect ? '✓ Exact ! ' : '✗ Incorrect. '}</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md transition-all"
            >
              Valider les réponses du TP
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-800">
                Score TP : <strong className="text-emerald-700 font-black">{score} / {quizQuestions.length}</strong>
              </span>
              <span className="text-xs text-slate-600">
                ({score === quizQuestions.length ? 'Excellente maîtrise technique !' : 'Revoyez les étapes d\'investigation.'})
              </span>
            </div>
          )}

          <Link
            href="/examens/debugging/module-2"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
          >
            <span>Passer l&apos;Examen du Module 2</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
