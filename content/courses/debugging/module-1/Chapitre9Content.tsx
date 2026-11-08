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
    question: "Lorsqu'un bouton de validation de commande génère deux prélèvements en cas de clic répété, quelle est la cause racine d'architecture recommandée pour immuniser l'API ?",
    options: [
      "Augmenter le timeout de la passerelle HTTP de 5 à 30 secondes",
      "Implémenter une clé d'idempotence (Idempotency-Key) unique par commande côté serveur et désactiver le bouton côté client dès le premier clic",
      "Supprimer les transactions SQL pour que l'écriture soit asynchrone",
      "Demander au client de recharger sa page avant de payer"
    ],
    correctAnswer: 1,
    explanation: "La combinaison de la désactivation du bouton (UX/Frontend) et d'un mécanisme de clé d'idempotence (Idempotency-Key avec stockage temporaire en Redis ou table d'idempotence SQL) garantit qu'une même requête rejouée ne déclenchera jamais deux débits financiers."
  },
  {
    id: 2,
    question: "Dans le cas de stocks qui tombent en négatif lors de ventes flash simultanées, quelle technique SQL est indispensable ?",
    options: [
      "Utiliser `SELECT stock FROM products` puis calculer en JavaScript et faire `UPDATE`",
      "Une transaction ACID avec verrouillage pessimiste (`SELECT ... FOR UPDATE`) ou une mise à jour atomique conditionnelle (`UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?`)",
      "Exécuter la requête MySQL sans clause WHERE",
      "Remplacer MySQL par un fichier JSON partagé"
    ],
    correctAnswer: 1,
    explanation: "Sans transaction avec verrouillage exclusif ou clause conditionnelle atomique (`AND stock >= ?`), deux processus concurrents lisent la même quantité en stock en même temps et effectuent des décrémentations non synchronisées, provoquant des stocks négatifs (race condition)."
  },
  {
    id: 3,
    question: "Quel livrable professionnel doit obligatoirement être produit à l'issue de la résolution d'une anomalie critique P1 ?",
    options: [
      "Un simple message Slack anonyme 'C'est réglé'",
      "Un rapport de post-mortem / RCA (Root Cause Analysis) détaillant la chronologie, l'impact métier, la cause racine, la correction immédiate et les actions préventives",
      "Une capture d'écran du code source sans explication",
      "Un redémarrage du serveur planifié toutes les heures"
    ],
    correctAnswer: 1,
    explanation: "Le Post-Mortem (ou RCA) formalise les enseignements techniques, évite les récidives dans d'autres microservices et consolide la base de connaissances collective de l'équipe d'ingénierie logicielle."
  }
];

export const Chapitre9Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contexte' | 'diagnostic' | 'rapport' | 'correctifs'>('contexte');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [activeTerminalTab, setActiveTerminalTab] = useState<'front' | 'back' | 'sql'>('back');

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
    <div className="space-y-12">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — TP de Synthèse : Diagnostic d&apos;Incident Majeur sur Plateforme E-Commerce
        </h1>
      </div>

      {/* Navigation Onglets du TP */}
      <div className="flex flex-wrap gap-2 border-b border-slate-700/60 pb-3">
        <button
          onClick={() => setActiveTab('contexte')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'contexte'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Icon name="info" className="w-4 h-4 text-amber-400" /> 1. Contexte & Incident P1
        </button>
        <button
          onClick={() => setActiveTab('diagnostic')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'diagnostic'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Icon name="search" className="w-4 h-4 text-cyan-400" /> 2. Investigation Multi-Niveaux
        </button>
        <button
          onClick={() => setActiveTab('correctifs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'correctifs'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Icon name="code" className="w-4 h-4 text-emerald-400" /> 3. Correctifs de Code
        </button>
        <button
          onClick={() => setActiveTab('rapport')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'rapport'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Icon name="document-text" className="w-4 h-4 text-purple-400" /> 4. Rapport d&apos;Incident (RCA)
        </button>
      </div>

      {/* Contenu de l'onglet actif */}
      {activeTab === 'contexte' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6">
            <h2 className="text-[19px] font-bold text-white flex items-center gap-2 mb-3">
              <Icon name="shield-check" className="w-6 h-6 text-red-400" /> Fiche d&apos;Alerte Opérationnelle : Incident INC-8924
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono mb-6">
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-red-200">
                <span className="block text-slate-400 font-sans">Sévérité :</span>
                <strong className="text-red-400 text-sm">P1 - CRITIQUE (Blocage Business)</strong>
              </div>
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-300">
                <span className="block text-slate-400 font-sans">Système affecté :</span>
                <strong>Plateforme Checkout & Tunnel d&apos;achat</strong>
              </div>
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-300">
                <span className="block text-slate-400 font-sans">Moment du déclenchement :</span>
                <strong>Lancement des soldes flash (12h02 UTC)</strong>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-emerald-300 mb-2">Les 3 symptômes remontés en temps réel :</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <div>
                  <strong className="text-white">Écran blanc &quot;Application Error&quot; pour les clients :</strong> Les utilisateurs saisissant le code promo <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded">BLACKFRIDAY</code> voient leur page se figer puis crasher sans message explicite.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <div>
                  <strong className="text-white">Anomalie comptable de survente :</strong> L&apos;entrepôt signale que 42 unités de la console &quot;PlayPro X&quot; ont été vendues alors que le stock physique n&apos;était que de 10 unités. Le stock en base affiche <code className="text-rose-400 bg-slate-900 px-1.5 py-0.5 rounded">-32</code>.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <div>
                  <strong className="text-white">Double prélèvement bancaire Stripe :</strong> Des clients se plaignent d&apos;avoir été prélevés deux fois après avoir cliqué frénétiquement sur le bouton &quot;Payer ma commande&quot; lors d&apos;un ralentissement réseau.
                </div>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-emerald-200">Votre Mission en tant qu&apos;Ingénieur :</div>
                <div className="text-xs text-slate-300">Ne sautez pas directement sur le code en production ! Suivez le protocole rigoureux en examinant d&apos;abord les journaux et traces console.</div>
              </div>
              <button 
                onClick={() => setActiveTab('diagnostic')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
              >
                Passer à l&apos;investigation <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'diagnostic' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6">
            <h2 className="text-[19px] font-bold text-white flex items-center gap-2 mb-2">
              <Icon name="code" className="w-6 h-6 text-cyan-400" /> Console d&apos;Inspection Multi-Niveaux
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Basculez entre les terminaux pour observer les traces brutes générées par chaque couche de l&apos;application.
            </p>

            <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTerminalTab('front')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTerminalTab === 'front' 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon name="layout" className="w-3.5 h-3.5" /> Frontend Console (Chrome DevTools)
              </button>
              <button
                onClick={() => setActiveTerminalTab('back')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTerminalTab === 'back' 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon name="server" className="w-3.5 h-3.5" /> Backend Logs (Node.js Express)
              </button>
              <button
                onClick={() => setActiveTerminalTab('sql')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTerminalTab === 'sql' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon name="database" className="w-3.5 h-3.5" /> Requêtes SQL (MySQL General Log)
              </button>
            </div>

            {/* Fenêtre terminal */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto shadow-inner">
              {activeTerminalTab === 'front' && (
                <div className="space-y-2 text-rose-300">
                  <div className="text-slate-500">[12:02:14.210] DevTools Console Log :</div>
                  <div className="text-emerald-400">&gt; User entered coupon code: &quot;BLACKFRIDAY&quot;</div>
                  <div className="text-slate-400">&gt; POST /api/cart/apply-coupon 200 OK (returned discount object)</div>
                  <div className="text-red-400 font-bold bg-red-950/40 p-3 rounded border border-red-800/40">
                    Uncaught TypeError: Cannot read properties of undefined (reading &apos;length&apos;)<br/>
                    &nbsp;&nbsp;at CouponBadge (CouponBadge.jsx:18:27)<br/>
                    &nbsp;&nbsp;at renderWithHooks (react-dom.development.js:15486:18)<br/>
                    &nbsp;&nbsp;at mountIndeterminateComponent (react-dom.development.js:20103:13)<br/>
                    &nbsp;&nbsp;at beginWork (react-dom.development.js:21637:16)
                  </div>
                  <div className="text-slate-400">
                    The above error occurred in the &lt;CouponBadge&gt; component: React will unmount the entire component tree.
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-slate-300">
                    <span className="text-cyan-400 font-bold font-sans">Diagnostic Expert :</span> L&apos;API renvoie un format <code className="text-emerald-300">{`{ discount: { rate: 0.20, items: undefined } }`}</code>. Le composant React fait <code className="text-rose-300">coupon.items.length</code> sans option chaining (<code className="text-emerald-300">coupon.items?.length ?? 0</code>).
                  </div>
                </div>
              )}

              {activeTerminalTab === 'back' && (
                <div className="space-y-2 text-amber-300">
                  <div className="text-slate-500">[12:02:18.450] Express Access Log :</div>
                  <div className="text-slate-300">[REQ-101] POST /api/checkout/pay - User #42 - Payload: &#123; cartId: 88, amount: 499 &#125; - Status: IN_FLIGHT (Duration: 3400ms)</div>
                  <div className="text-slate-300">[REQ-102] POST /api/checkout/pay - User #42 - Payload: &#123; cartId: 88, amount: 499 &#125; - Status: IN_FLIGHT (Duration: 3100ms)</div>
                  <div className="text-amber-400 bg-amber-950/40 p-3 rounded border border-amber-800/40">
                    [12:02:21.890] Stripe API Response REQ-101: Charge ch_3N5b2k succeeded: $499.00<br/>
                    [12:02:21.910] Stripe API Response REQ-102: Charge ch_3N5b2m succeeded: $499.00
                  </div>
                  <div className="text-slate-300">Order #7712 created for User #42. Order #7713 created for User #42.</div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-slate-300">
                    <span className="text-cyan-400 font-bold font-sans">Diagnostic Expert :</span> L&apos;utilisateur impatient a cliqué 2 fois en 300ms. L&apos;API Express a traité les 2 requêtes en parallèle et les a envoyées à Stripe sans <code className="text-emerald-300">Idempotency-Key</code>. Le bouton frontend n&apos;était pas non plus désactivé (<code className="text-emerald-300">disabled=&#123;isLoading&#125;</code>).
                  </div>
                </div>
              )}

              {activeTerminalTab === 'sql' && (
                <div className="space-y-2 text-cyan-300">
                  <div className="text-slate-500">[12:02:15.100] MySQL Query Log (Thread 42 & 43 - Concurrence pure) :</div>
                  <div className="text-slate-400"># Thread 42 (Requête Client A) :</div>
                  <div>SELECT stock FROM products WHERE id = 99; # Renvoie 1</div>
                  <div className="text-slate-400"># Thread 43 (Requête Client B quasi simultanée) :</div>
                  <div>SELECT stock FROM products WHERE id = 99; # Renvoie 1 (Car pas de verrou exclusif !)</div>
                  <div className="text-slate-400"># Les deux applications backend font : if (stock &gt; 0) stock = stock - 1;</div>
                  <div className="text-rose-400 bg-rose-950/40 p-3 rounded border border-rose-800/40">
                    [12:02:15.180] Thread 42 : UPDATE products SET stock = 0 WHERE id = 99; # Succès<br/>
                    [12:02:15.195] Thread 43 : UPDATE products SET stock = -1 WHERE id = 99; # Succès ! Stock corrompu !
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-slate-300">
                    <span className="text-cyan-400 font-bold font-sans">Diagnostic Expert :</span> Race Condition (Condition de concurrence). La lecture du stock et sa décrémentation ne sont pas encapsulées dans une transaction avec <code className="text-emerald-300">SELECT ... FOR UPDATE</code> ni dans une requête conditionnelle atomique.
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setActiveTab('correctifs')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                Voir les correctifs de code <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'correctifs' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6">
            <h2 className="text-[19px] font-bold text-white flex items-center gap-2 mb-3">
              <Icon name="code" className="w-6 h-6 text-emerald-400" /> Comparaison Avant / Après des Correctifs
            </h2>

            <div className="space-y-8">
              {/* Correctif 1 */}
              <div>
                <h3 className="text-base font-semibold text-rose-300 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs">1</span>
                  Correctif UI Crash : Defensive Programming & Optional Chaining
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-slate-950 p-4 rounded-lg border border-red-500/30">
                    <div className="text-red-400 font-bold font-sans mb-2">❌ Code Vulnérable :</div>
                    <pre className="text-slate-300">{`export function CouponBadge({ coupon }) {
  // CRASH si items est undefined !
  return (
    <div className="badge">
      Remise: {coupon.discount * 100}%
      <span>({coupon.items.length} articles)</span>
    </div>
  );
}`}</pre>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-lg border border-emerald-500/30">
                    <div className="text-emerald-400 font-bold font-sans mb-2">✅ Code Robuste :</div>
                    <pre className="text-slate-300">{`export function CouponBadge({ coupon }) {
  const itemCount = coupon?.items?.length ?? 0;
  const rate = (coupon?.discount ?? 0) * 100;

  return (
    <div className="badge">
      Remise: {rate}%
      <span>({itemCount} article{itemCount > 1 ? 's' : ''})</span>
    </div>
  );
}`}</pre>
                  </div>
                </div>
              </div>

              {/* Correctif 2 */}
              <div>
                <h3 className="text-base font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">2</span>
                  Correctif Race Condition : Requête Atomique Sécurisée MySQL
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-slate-950 p-4 rounded-lg border border-red-500/30">
                    <div className="text-red-400 font-bold font-sans mb-2">❌ Code Vulnérable :</div>
                    <pre className="text-slate-300">{`// Deux requêtes séparées sans verrou :
const [prod] = await db.query(
  'SELECT stock FROM products WHERE id = ?', [id]
);
if (prod.stock >= quantity) {
  await db.query(
    'UPDATE products SET stock = ? WHERE id = ?',
    [prod.stock - quantity, id]
  );
}`}</pre>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-lg border border-emerald-500/30">
                    <div className="text-emerald-400 font-bold font-sans mb-2">✅ Décrémentation Atomique :</div>
                    <pre className="text-slate-300">{`// Mise à jour conditionnelle atomique en 1 seule instruction :
const [result] = await db.query(\`
  UPDATE products 
  SET stock = stock - ? 
  WHERE id = ? AND stock >= ?
\`, [quantity, id, quantity]);

if (result.affectedRows === 0) {
  throw new Error('Stock insuffisant (Rupture)');
}`}</pre>
                  </div>
                </div>
              </div>

              {/* Correctif 3 */}
              <div>
                <h3 className="text-base font-semibold text-amber-300 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs">3</span>
                  Correctif Double Paiement : Idempotence & Protection Frontend
                </h3>
                <div className="bg-slate-950 p-4 rounded-lg border border-emerald-500/30 text-xs font-mono">
                  <div className="text-emerald-400 font-bold font-sans mb-2">✅ Double Barrière de Protection :</div>
                  <pre className="text-slate-300">{`// 1. Côté Client : désactivation immédiate + ID unique de transaction
const [isSubmitting, setIsSubmitting] = useState(false);
const transactionKey = useRef(crypto.randomUUID());

async function handlePay() {
  if (isSubmitting) return;
  setIsSubmitting(true);
  try {
    await api.post('/pay', { cartId, amount }, {
      headers: { 'Idempotency-Key': transactionKey.current }
    });
  } finally {
    setIsSubmitting(false);
  }
}

// 2. Côté Serveur : Stripe reçoit la clé d'idempotence
const paymentIntent = await stripe.paymentIntents.create({
  amount: req.body.amount,
  currency: 'eur',
}, {
  idempotencyKey: req.headers['idempotency-key'] // Stripe ignore les requêtes doublons identiques
});`}</pre>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setActiveTab('rapport')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                Consulter le Rapport d&apos;Incident Post-Mortem <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rapport' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6">
            <h2 className="text-[19px] font-bold text-white flex items-center gap-2 mb-3">
              <Icon name="document-text" className="w-6 h-6 text-purple-400" /> Modèle Officiel de Rapport d&apos;Incident Technique (RCA)
            </h2>
            <p className="text-sm text-slate-300 mb-6">
              Ce livrable est le standard attendu dans les équipes d&apos;ingénierie logicielle pour documenter un incident de sévérité P1.
            </p>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6 text-sm">
              <div className="border-b border-slate-800 pb-4">
                <div className="text-xs uppercase tracking-wider text-slate-500">Document interne confidentiel</div>
                <h3 className="text-lg font-bold text-white mt-1">Post-Mortem : Incident Vente Flash INC-8924</h3>
                <div className="text-xs text-slate-400 mt-1">Auteurs : Équipe Ingénierie & Débogage • Date : Novembre 2026</div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">1. Résumé Exécutif</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  À 12h02 UTC, lors de l&apos;ouverture des soldes flash, un afflux de 14 000 requêtes/minute a déclenché trois
                  dysfonctionnements concomitants : crash UI lors de la saisie de coupons, survente de 32 articles en rupture
                  et 18 doublons de prélèvement bancaire. L&apos;incident a été endigué à 12h28 UTC suite à l&apos;application des patchs d&apos;urgence.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">2. Analyse de la Cause Racine (RCA)</h4>
                <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                  <li><strong>Bug UI :</strong> Absence de validation défensive sur la payload de l&apos;API coupon (<code className="text-rose-300">items: undefined</code>).</li>
                  <li><strong>Bug SQL :</strong> Concurrence non maîtrisée (Time-of-Check to Time-of-Use) sans verrouillage pessimiste ni clause atomique.</li>
                  <li><strong>Bug API :</strong> Absence d&apos;en-tête d&apos;idempotence sur la passerelle de paiement et pas de limitation de rebond (debounce) sur le bouton client.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">3. Impact Métier</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block">Commandes doublons :</span>
                    <strong className="text-amber-300 text-sm">18 (Remboursées)</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block">Surventes physiques :</span>
                    <strong className="text-red-400 text-sm">32 consoles</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block">Temps d&apos;indisponibilité :</span>
                    <strong className="text-slate-200 text-sm">26 minutes</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block">Perte de CA estimée :</span>
                    <strong className="text-slate-200 text-sm">~ 4 200 €</strong>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">4. Plan d&apos;Actions Préventives (CAPA)</h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Déploiement systématique de clés d&apos;idempotence UUID v4 sur tous les endpoints financiers (Sprint N).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Règle d&apos;architecture obligatoire : toute mise à jour de stock doit être atomique (<code className="text-emerald-300">WHERE stock &gt;= quantity</code>).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ajout de tests de charge de concurrence (k6 / Artillery) dans le pipeline CI/CD avant chaque solde.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Laboratoire Interactif d'Investigation d'Incidents */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-400" />
          <h2 className="text-[19px] font-bold text-white">
            Atelier Interactif : Investigation d&apos;Incidents Réels en Direct
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          Mettez en application le protocole d&apos;enquête sur des incidents réels : inspectez les requêtes HTTP, décortiquez les stack traces serveur, choisissez le correctif optimal et testez-le en direct :
        </p>
        <BugTriageLab />
      </section>

      {/* Quiz de Synthèse du Module 1 */}
      <section className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <Icon name="info" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Quiz d&apos;Évaluation Pratique du TP</h2>
              <p className="text-xs text-slate-400">Vérifiez votre compréhension méthodologique avant l&apos;examen final du module</p>
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
                ({score === quizQuestions.length ? 'Excellente maîtrise !' : 'Revoyez les étapes d&apos;investigation.'})
              </span>
            </div>
          )}

          <Link
            href="/examens/debugging/module-1"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all"
          >
            Passer l&apos;Examen du Module 1 <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
