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
    question: "Dans l'API de gestion des commandes, lorsqu'un produit inexistant (ID 99) est demandé, quelle est la bonne pratique de code pour éviter le crash en TypeError du serveur ?",
    options: [
      "Laisser le serveur crasher et redémarrer Node.js avec nodemon",
      "Vérifier explicitement si le produit retourné par find() est falsy, et lancer une exception contrôlée avec un statut HTTP 404",
      "Remplacer find() par une boucle while infinie",
      "Retourner un prix de 0 DH sans prévenir le client"
    ],
    correctAnswer: 1,
    explanation: "Si le produit n'existe pas, find() renvoie undefined. Tenter d'accéder à product.price sans vérification provoque un TypeError. Il faut vérifier if (!product) et répondre avec un code HTTP 404 (Not Found)."
  },
  {
    id: 2,
    question: "Pourquoi le code frontend 'data.data.product' provoquait-il une erreur JavaScript lors d'une réponse d'erreur de l'API ?",
    options: [
      "Parce que le navigateur n'accepte pas le format JSON",
      "Parce que le backend en échec renvoie '{ success: false, message: ... }' sans champ 'data', et le frontend n'a pas vérifié response.ok avant d'extraire les données",
      "Parce que la variable data était déclarée avec const au lieu de var",
      "Parce que le port 3000 était bloqué"
    ],
    correctAnswer: 1,
    explanation: "Comme fetch() résout sa Promise même en cas d'erreur HTTP 404/500, le frontend essayait de lire data.data.product sur une charge utile d'erreur qui ne contenait pas de propriété data."
  },
  {
    id: 3,
    question: "Quelle commande de débogueur dans VS Code a permis d'observer précisément que la fonction applyDiscount soustrayait 10 au lieu de 10% ?",
    options: [
      "Stop (Shift + F5)",
      "Step Into (F11) pour entrer dans le corps de la fonction applyDiscount et observer ses variables",
      "Restart (Ctrl + Shift + F5)",
      "Fermer VS Code"
    ],
    correctAnswer: 1,
    explanation: "Step Into (F11) permet de descendre à l'intérieur de la fonction appelée pour inspecter les arguments réels reçus et l'instruction de calcul return subtotal - discount."
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
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 11 — TP Final : Diagnostic et Résolution d&apos;Anomalies avec Chrome DevTools et VS Code
        </h1>
      </div>

      {/* Navigation Onglets du TP */}
      <div className="flex flex-wrap gap-2 border-b border-slate-700/60 pb-3">
        <button
          onClick={() => setActiveTab('mission')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'mission'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Icon name="info" className="w-4 h-4 text-amber-400" /> 1. Mission &amp; Code Initial
        </button>
        <button
          onClick={() => setActiveTab('investigation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'investigation'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Icon name="search" className="w-4 h-4 text-cyan-400" /> 2. Démarche de Diagnostic
        </button>
        <button
          onClick={() => setActiveTab('correctifs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'correctifs'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Icon name="code" className="w-4 h-4 text-emerald-400" /> 3. Code Intégral Corrigé
        </button>
        <button
          onClick={() => setActiveTab('validation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'validation'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Icon name="check-circle" className="w-4 h-4 text-purple-400" /> 4. Plan de Validation
        </button>
      </div>

      {/* Contenu de l'onglet actif */}
      {activeTab === 'mission' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6 text-white">
            <h2 className="text-[19px] font-bold flex items-center gap-2 mb-2">
              <Icon name="bug" className="w-6 h-6 text-red-400" /> Cahier des charges de la mission
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Vous intervenez sur une plateforme de gestion des commandes composée d&apos;un frontend JavaScript autonome et d&apos;une API Node.js / Express. Trois dysfonctionnements majeurs ont été signalés par le support :
            </p>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg">
                <strong className="text-red-300 block mb-1">Anomalie 1 — Montant total erroné :</strong>
                Une commande de 3 souris à 100 DH avec 10 % de remise affiche un total de <strong>290 DH au lieu de 270 DH</strong>.
              </div>
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg">
                <strong className="text-red-300 block mb-1">Anomalie 2 — Crash sur produit inexistant :</strong>
                Lorsqu&apos;un client commande un produit ayant l&apos;identifiant 99, l&apos;API plante avec une erreur HTTP 500 et le serveur lève un TypeError.
              </div>
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg">
                <strong className="text-red-300 block mb-1">Anomalie 3 — Crash en cascade du frontend :</strong>
                Le navigateur affiche &quot;undefined&quot; ou crashe lorsqu&apos;une erreur survient au lieu d&apos;afficher un message utilisateur clair.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'investigation' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6 text-white space-y-4">
            <h2 className="text-[19px] font-bold flex items-center gap-2">
              <Icon name="search" className="w-6 h-6 text-cyan-400" /> Protocole d&apos;investigation outillée
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold font-sans">Étape 1 — Isolation du calcul de remise (VS Code Debugger) :</div>
                <div className="text-slate-300">1. Placer un breakpoint dans <code className="text-emerald-300">calculateOrder()</code>.</div>
                <div className="text-slate-300">2. Lancer la session de débogage Node.js (F5).</div>
                <div className="text-slate-300">3. Utiliser <strong className="text-emerald-400">Step Into (F11)</strong> pour entrer dans <code className="text-emerald-300">calculateDiscount()</code>.</div>
                <div className="text-slate-400"># Constat : <code className="text-rose-400">return subtotal - discount;</code> soustrait la valeur brute 10 au lieu d&apos;appliquer 10% (30 DH) !</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold font-sans">Étape 2 — Diagnostic du produit inexistant (DevTools Network + VS Code) :</div>
                <div className="text-slate-300">1. Envoyer une requête avec <code className="text-emerald-300">productId: 99</code>.</div>
                <div className="text-slate-300">2. DevTools Network indique <strong className="text-red-400">500 Internal Server Error</strong>.</div>
                <div className="text-slate-300">3. Le breakpoint dans VS Code révèle que <code className="text-rose-400">product = undefined</code>.</div>
                <div className="text-slate-400"># Constat : <code className="text-rose-400">product.price</code> tente de lire .price sur undefined ! Cause racine : absence de contrôle d&apos;existence.</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold font-sans">Étape 3 — Diagnostic du client Fetch (Chrome DevTools Console) :</div>
                <div className="text-slate-300">1. Le frontend effectue <code className="text-emerald-300">data.data.product</code> sans vérifier <code className="text-emerald-300">response.ok</code>.</div>
                <div className="text-slate-400"># Constat : fetch() résout la Promise même en cas d&apos;erreur 404/500. Le frontend doit obligatoirement tester <code className="text-emerald-400">if (!response.ok)</code>.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'correctifs' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6 text-white space-y-6">
            <h2 className="text-[19px] font-bold flex items-center gap-2">
              <Icon name="code" className="w-6 h-6 text-emerald-400" /> Correctifs Intégaux Frontend &amp; Backend
            </h2>

            <div>
              <h3 className="text-sm font-bold text-emerald-300 mb-2 font-mono">1. Backend corrigé avec validations rigoureuses (server.js) :</h3>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto">
                <pre className="text-slate-300">{`// Calcul robuste de la remise en pourcentage :
function calculateDiscount(subtotal, discount) {
  const discountAmount = subtotal * (discount / 100);
  return subtotal - discountAmount;
}

// Contrôle strict de l'existence du produit :
function calculateOrder(order) {
  const product = findProduct(order.productId);
  if (!product) {
    const error = new Error("Produit introuvable");
    error.statusCode = 404; // Code HTTP adéquat
    throw error;
  }
  const subtotal = calculateSubtotal(product, order.quantity);
  const total = calculateDiscount(subtotal, order.discount);
  return { product: product.name, quantity: order.quantity, subtotal, total };
}`}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-cyan-300 mb-2 font-mono">2. Frontend défensif avec contrôle HTTP (index.html) :</h3>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto">
                <pre className="text-slate-300">{`const response = await fetch("http://localhost:3000/api/orders", { ... });
const data = await response.json();

// Vérification impérative du statut HTTP :
if (!response.ok) {
  throw new Error(data.message || \`Erreur HTTP \${response.status}\`);
}
if (!data.success || !data.data) {
  throw new Error("Structure de réponse API invalide");
}

resultElement.textContent = \`Produit : \${data.data.product} | Total : \${data.data.total} DH\`;`}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'validation' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6 text-white space-y-4">
            <h2 className="text-[19px] font-bold flex items-center gap-2">
              <Icon name="check-circle" className="w-6 h-6 text-emerald-400" /> Plan de validation fonctionnelle et technique
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-800/80 text-emerald-300">
                  <tr>
                    <th className="p-3">Scénario de test</th>
                    <th className="p-3">Entrées fournies</th>
                    <th className="p-3">Code HTTP</th>
                    <th className="p-3">Résultat attendu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-3">Commande standard avec remise</td>
                    <td className="p-3">Souris (100 DH), qté 3, 10%</td>
                    <td className="p-3 text-emerald-400">200 OK</td>
                    <td className="p-3 text-emerald-400">Total : 270 DH</td>
                  </tr>
                  <tr>
                    <td className="p-3">Commande sans remise</td>
                    <td className="p-3">Clavier (200 DH), qté 2, 0%</td>
                    <td className="p-3 text-emerald-400">200 OK</td>
                    <td className="p-3 text-emerald-400">Total : 400 DH</td>
                  </tr>
                  <tr>
                    <td className="p-3">Produit inexistant</td>
                    <td className="p-3">ID 99, qté 1, 0%</td>
                    <td className="p-3 text-amber-400">404 Not Found</td>
                    <td className="p-3 text-amber-400">Message : &quot;Produit introuvable&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-3">Quantité invalide (zéro)</td>
                    <td className="p-3">ID 1, qté 0, 0%</td>
                    <td className="p-3 text-rose-400">400 Bad Request</td>
                    <td className="p-3 text-rose-400">Message : &quot;Quantité invalide&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-3">Remise négative ou &gt; 100%</td>
                    <td className="p-3">ID 1, qté 1, 120%</td>
                    <td className="p-3 text-rose-400">400 Bad Request</td>
                    <td className="p-3 text-rose-400">Message : &quot;Remise hors limites&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Laboratoire Interactif de Triage de Bugs Réels */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-400" />
          <h2 className="text-[19px] font-bold text-white">
            Atelier Interactif : Investigation d&apos;Incidents Réels en Direct
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          Mettez en pratique vos compétences d&apos;enquêteur technique sur des cas réels : inspectez la requête HTTP, décodez la stack trace du serveur, choisissez le correctif optimal et lancez le test de validation :
        </p>
        <BugTriageLab />
      </section>

      {/* Quiz de Synthèse du Module 2 */}
      <section className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6 text-white space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <Icon name="info" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Quiz d&apos;Évaluation Pratique du TP</h2>
              <p className="text-xs text-slate-400">Validez votre maîtrise méthodologique des outils avant l&apos;examen officiel du Module 2</p>
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

        <div className="space-y-6">
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
                ({score === quizQuestions.length ? 'Excellente maîtrise technique !' : 'Revoyez les étapes d&apos;investigation.'})
              </span>
            </div>
          )}

          <Link
            href="/examens/debugging/module-2"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all"
          >
            Passer l&apos;Examen du Module 2 <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
