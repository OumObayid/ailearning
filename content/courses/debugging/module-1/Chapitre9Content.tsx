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
    question: "Lorsqu'un bouton de validation de commande génère deux prélèvements en cas de clic répété d'un utilisateur impatient, quelle est la protection d'architecture indispensable côté serveur ?",
    options: [
      "Augmenter le timeout de la passerelle HTTP de 5 à 30 secondes.",
      "Implémenter une clé d'idempotence (Idempotency-Key) unique par transaction et désactiver le bouton côté client dès le premier clic.",
      "Supprimer les transactions SQL pour que l'écriture soit asynchrone.",
      "Demander au client de recharger sa page avant de payer.",
    ],
    correctAnswer: 1,
    explanation: "La combinaison de la désactivation du bouton (côté client UX) et d'un mécanisme de clé d'idempotence (Idempotency-Key transmise à Stripe ou stockée temporairement) garantit qu'une même requête rejouée ne déclenchera jamais deux débits financiers.",
  },
  {
    id: 2,
    question: "Dans le cas de stocks qui tombent en négatif lors de ventes flash simultanées (Race condition), quelle technique SQL est indispensable ?",
    options: [
      "Faire un SELECT stock FROM products puis calculer la soustraction en JavaScript et faire un UPDATE.",
      "Une transaction ACID avec verrouillage pessimiste (SELECT ... FOR UPDATE) ou une mise à jour atomique conditionnelle (UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?).",
      "Exécuter la requête MySQL sans clause WHERE.",
      "Remplacer MySQL par un fichier JSON partagé.",
    ],
    correctAnswer: 1,
    explanation: "Sans mise à jour conditionnelle atomique (AND stock >= ?), deux requêtes concurrentes lisent la même quantité en stock au même instant et décrémentent chacune leur tour, provoquant des stocks négatifs et des surventes physiques.",
  },
  {
    id: 3,
    question: "Pourquoi l'écriture 'coupon?.items?.length ?? 0' protège-t-elle l'écran React contre un écran blanc ?",
    options: [
      "Parce qu'elle accélère la vitesse de téléchargement de la page.",
      "Parce que l'optional chaining (?.) évite de lire une propriété sur une valeur undefined ou null, empêchant le crash brutal du composant.",
      "Parce qu'elle supprime le code promo.",
      "Parce qu'elle désactive JavaScript dans le navigateur.",
    ],
    correctAnswer: 1,
    explanation: "L'optional chaining (?.) combiné au nullish coalescing (??) constitue la programmation défensive par excellence : si l'API renvoie un objet incomplet, React affiche 0 sans faire planter toute l'application.",
  },
  {
    id: 4,
    question: "Quel livrable professionnel doit obligatoirement être rédigé à l'issue de la résolution d'une anomalie critique P1 ?",
    options: [
      "Un simple message Slack anonyme : 'C'est réglé'.",
      "Un rapport de Post-Mortem / RCA (Root Cause Analysis) détaillant la chronologie, l'impact métier, la cause racine et les actions préventives.",
      "Une capture d'écran du code source sans explication.",
      "Un redémarrage du serveur planifié toutes les heures.",
    ],
    correctAnswer: 1,
    explanation: "Le Post-Mortem (ou RCA) formalise les enseignements techniques, évite les récidives dans d'autres projets de l'entreprise et consolide la mémoire collective de l'équipe d'ingénierie.",
  },
];

export const Chapitre9Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contexte' | 'diagnostic' | 'correctifs' | 'rapport'>('contexte');
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
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-lime-200 bg-gradient-to-br from-lime-50/90 via-emerald-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider bg-lime-100/80 px-3 py-1 rounded-full border border-lime-300">
            <Icon name="bug" className="w-4 h-4 text-lime-800" />
            <span>Ingénierie du Débogage • Module 1 • Grand TP Final</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Atelier pratique : ~15 min</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-3">
          Chapitre 9 — TP de Synthèse : Diagnostic d&apos;Incident Majeur sur Plateforme E-Commerce
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          Mettez en pratique l&apos;intégralité des 8 chapitres précédents sur une crise réelle de Black Friday : 3 pannes simultanées (Frontend, Concurrence SQL et Passerelle Stripe).
        </p>

        {/* Objectifs du TP */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Enquêter sur les 3 couches (Front, Back, SQL)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Appliquer les correctifs professionnels</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Rédiger le Post-Mortem officiel (RCA)</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          NAVIGATION DES ONGLETS DU TP
         ========================================================================= */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('contexte')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'contexte'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Icon name="info" className="w-4 h-4" /> 1. Contexte &amp; Incident P1
        </button>
        <button
          onClick={() => setActiveTab('diagnostic')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'diagnostic'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Icon name="search" className="w-4 h-4" /> 2. Investigation Multi-Niveaux
        </button>
        <button
          onClick={() => setActiveTab('correctifs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'correctifs'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Icon name="code" className="w-4 h-4" /> 3. Correctifs de Code
        </button>
        <button
          onClick={() => setActiveTab('rapport')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'rapport'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Icon name="document-text" className="w-4 h-4" /> 4. Rapport d&apos;Incident (RCA)
        </button>
      </div>

      {/* =========================================================================
          ONGLET 1 : CONTEXTE DE L'INCIDENT P1
         ========================================================================= */}
      {activeTab === 'contexte' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm uppercase tracking-wider">
              <Icon name="shield-check" className="w-5 h-5 text-rose-600" />
              <span>Fiche d&apos;Alerte Opérationnelle : Incident INC-8924</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-950">
                <span className="block text-slate-500 font-sans text-[11px]">Niveau de Sévérité :</span>
                <strong className="text-rose-700 text-sm">P1 — CRITIQUE (Blocage Ventes)</strong>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                <span className="block text-slate-500 font-sans text-[11px]">Composant affecté :</span>
                <strong>Tunnel d&apos;Achat &amp; Checkout Stripe</strong>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                <span className="block text-slate-500 font-sans text-[11px]">Heure de déclenchement :</span>
                <strong>Lancement des soldes flash (12h02 UTC)</strong>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-950 mb-3">
                Les 3 symptômes critiques remontés en même temps :
              </h3>
              <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-rose-950 block mb-0.5">Écran blanc lors de l&apos;application du coupon :</strong>
                    <span className="text-slate-700 font-medium">Les utilisateurs tapant le code promo <code className="text-rose-700 bg-rose-100 font-mono px-1 py-0.5 rounded font-bold">BLACKFRIDAY</code> voient l&apos;écran geler et planter avec une erreur JavaScript invisible.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-amber-950 block mb-0.5">Survente de stocks physiques :</strong>
                    <span className="text-slate-700 font-medium">L&apos;entrepôt signale 42 consoles vendues alors qu&apos;il n&apos;y en avait que 10 en stock réel ! La base de données affiche un stock corrompu de <code className="text-amber-800 bg-amber-100 font-mono px-1 py-0.5 rounded font-bold">-32</code>.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-blue-950 block mb-0.5">Doubles prélèvements Stripe :</strong>
                    <span className="text-slate-700 font-medium">Des clients impatients qui cliquent 2 ou 3 fois sur le bouton de paiement ont été débités deux fois pour la même commande.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <strong className="text-xs sm:text-sm font-bold text-emerald-950 block">Votre Mission d&apos;Ingénieur :</strong>
                <span className="text-xs text-emerald-800 font-medium">Ne touchez pas au code en aveugle ! Ouvrez les consoles d&apos;inspection dans l&apos;onglet 2 pour collecter les traces factuelles.</span>
              </div>
              <button 
                onClick={() => setActiveTab('diagnostic')}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm"
              >
                Passer à l&apos;investigation <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ONGLET 2 : INVESTIGATION MULTI-NIVEAUX (TERMINAUX)
         ========================================================================= */}
      {activeTab === 'diagnostic' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white space-y-5">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm uppercase tracking-wider mb-1">
                <Icon name="code" className="w-5 h-5 text-cyan-400" />
                <span>Console d&apos;Inspection Multi-Niveaux</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Basculez entre les 3 terminaux pour examiner les traces brutes générées par chaque couche lors de l&apos;incident :
              </p>
            </div>

            {/* Stepper Buttons for Terminals */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTerminalTab('front')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTerminalTab === 'front' 
                    ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon name="layout" className="w-3.5 h-3.5" /> Frontend (DevTools Console)
              </button>
              <button
                onClick={() => setActiveTerminalTab('back')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTerminalTab === 'back' 
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon name="server" className="w-3.5 h-3.5" /> Backend (Logs Node.js)
              </button>
              <button
                onClick={() => setActiveTerminalTab('sql')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTerminalTab === 'sql' 
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon name="database" className="w-3.5 h-3.5" /> Base de Données (MySQL Log)
              </button>
            </div>

            {/* Terminal Window Display */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
              {activeTerminalTab === 'front' && (
                <div className="space-y-2 text-rose-300">
                  <div className="text-slate-500">[12:02:14.210] DevTools Console Log :</div>
                  <div className="text-emerald-400">&gt; User entered coupon code: &quot;BLACKFRIDAY&quot;</div>
                  <div className="text-slate-400">&gt; POST /api/cart/apply-coupon 200 OK</div>
                  <div className="text-rose-400 font-bold bg-rose-950/40 p-3.5 rounded-xl border border-rose-800/40">
                    Uncaught TypeError: Cannot read properties of undefined (reading &apos;length&apos;)<br/>
                    &nbsp;&nbsp;at CouponBadge (CouponBadge.jsx:18:27)<br/>
                    &nbsp;&nbsp;at renderWithHooks (react-dom.development.js:15486:18)
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-slate-300 text-xs font-sans">
                    <strong className="text-cyan-400">🔍 Diagnostic Expert :</strong> L&apos;API renvoie <code className="text-emerald-300 font-mono">{`{ discount: 0.20, items: undefined }`}</code>. Le composant React fait <code className="text-rose-300 font-mono">coupon.items.length</code>. Dès que <code className="text-rose-300 font-mono">items</code> est absent, React crash brutalement avec un écran blanc !
                  </div>
                </div>
              )}

              {activeTerminalTab === 'back' && (
                <div className="space-y-2 text-amber-300">
                  <div className="text-slate-500">[12:02:18.450] Express Access Log :</div>
                  <div className="text-slate-300">[REQ-101] POST /api/checkout/pay - User #42 (12:02:18.100)</div>
                  <div className="text-slate-300">[REQ-102] POST /api/checkout/pay - User #42 (12:02:18.400 - 300ms plus tard !)</div>
                  <div className="text-amber-400 bg-amber-950/40 p-3.5 rounded-xl border border-amber-800/40">
                    [12:02:21.890] Stripe API Response REQ-101: Charge ch_3N5b2k succeeded: 499.00 €<br/>
                    [12:02:21.910] Stripe API Response REQ-102: Charge ch_3N5b2m succeeded: 499.00 €
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-slate-300 text-xs font-sans">
                    <strong className="text-cyan-400">🔍 Diagnostic Expert :</strong> L&apos;utilisateur impatient a double-cliqué. L&apos;API Express a transmis deux charges distinctes à Stripe sans <code className="text-emerald-300 font-mono">Idempotency-Key</code>. Le bouton frontend n&apos;était pas non plus désactivé dès le premier clic !
                  </div>
                </div>
              )}

              {activeTerminalTab === 'sql' && (
                <div className="space-y-2 text-cyan-300">
                  <div className="text-slate-500">[12:02:15.100] MySQL Query Log (Thread 42 &amp; Thread 43 en concurrence) :</div>
                  <div className="text-slate-400"># Thread 42 (Client A) : SELECT stock FROM products WHERE id = 99; -- Renvoie 1</div>
                  <div className="text-slate-400"># Thread 43 (Client B) : SELECT stock FROM products WHERE id = 99; -- Renvoie 1 (Car pas de verrou !)</div>
                  <div className="text-rose-400 bg-rose-950/40 p-3.5 rounded-xl border border-rose-800/40">
                    [12:02:15.180] Thread 42 : UPDATE products SET stock = 0 WHERE id = 99; -- Succès<br/>
                    [12:02:15.195] Thread 43 : UPDATE products SET stock = -1 WHERE id = 99; -- Succès ! Stock corrompu à -32 !
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-slate-300 text-xs font-sans">
                    <strong className="text-cyan-400">🔍 Diagnostic Expert :</strong> Race Condition pure (Condition de concurrence). La lecture et la soustraction sont séparées sans transaction ni clause atomique <code className="text-emerald-300 font-mono">WHERE stock &gt;= quantity</code>.
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setActiveTab('correctifs')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                Passer aux correctifs de code <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ONGLET 3 : COMPARATIF DES CORRECTIFS DE CODE
         ========================================================================= */}
      {activeTab === 'correctifs' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm uppercase tracking-wider mb-1">
                <Icon name="code" className="w-5 h-5 text-emerald-600" />
                <span>Comparatif Avant / Après des 3 Correctifs</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Voici comment chaque bug est éliminé à la racine selon les standards professionnels :
              </p>
            </div>

            {/* Correctif 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs">1</span>
                <span>Correctif UI Crash : Programmation Défensive (Optional Chaining &amp; Nullish Coalescing)</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/40 text-slate-200 space-y-2">
                  <div className="text-rose-400 font-bold font-sans text-xs">❌ Code Vulnérable :</div>
                  <pre>{`export function CouponBadge({ coupon }) {
  // CRASH si items est undefined !
  return (
    <div className="badge">
      Remise: {coupon.discount * 100}%
      <span>({coupon.items.length} articles)</span>
    </div>
  );
}`}</pre>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/40 text-slate-200 space-y-2">
                  <div className="text-emerald-400 font-bold font-sans text-xs">✅ Code Robuste &amp; Défensif :</div>
                  <pre>{`export function CouponBadge({ coupon }) {
  // ✅ Protection totale contre undefined ou null
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
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-800 font-bold text-sm">
                <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-xs">2</span>
                <span>Correctif Race Condition : Requête Atomique Conditionnelle MySQL</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/40 text-slate-200 space-y-2">
                  <div className="text-rose-400 font-bold font-sans text-xs">❌ Code Vulnérable (Soustraction séparée) :</div>
                  <pre>{`const [prod] = await db.query(
  'SELECT stock FROM products WHERE id = ?', [id]
);
if (prod.stock >= quantity) {
  // Deux requêtes séparées = faille de concurrence !
  await db.query(
    'UPDATE products SET stock = ? WHERE id = ?',
    [prod.stock - quantity, id]
  );
}`}</pre>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/40 text-slate-200 space-y-2">
                  <div className="text-emerald-400 font-bold font-sans text-xs">✅ Décrémentation Atomique en 1 instruction :</div>
                  <pre>{`// ✅ Le moteur SQL verrouille et vérifie en même temps :
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
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">3</span>
                <span>Correctif Double Paiement : Clé d&apos;Idempotence &amp; Désactivation du Bouton</span>
              </div>
              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/40 text-slate-200 space-y-2 text-xs font-mono">
                <div className="text-emerald-400 font-bold font-sans text-xs">✅ Double Barrière Client + Serveur :</div>
                <pre className="overflow-x-auto leading-relaxed">{`// 1. Côté Frontend : désactivation immédiate + UUID unique
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

// 2. Côté Backend Express : Stripe reçoit la clé d'idempotence
const paymentIntent = await stripe.paymentIntents.create({
  amount: req.body.amount,
  currency: 'eur',
}, {
  idempotencyKey: req.headers['idempotency-key'] // Stripe ignore automatiquement les doublons !
});`}</pre>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setActiveTab('rapport')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                Consulter le Rapport d&apos;Incident Post-Mortem <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ONGLET 4 : LE RAPPORT D'INCIDENT OFFICIEL (POST-MORTEM / RCA)
         ========================================================================= */}
      {activeTab === 'rapport' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-purple-700 font-extrabold text-sm uppercase tracking-wider mb-1">
                <Icon name="document-text" className="w-5 h-5 text-purple-600" />
                <span>Modèle Officiel de Rapport d&apos;Incident Technique (RCA)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Ce livrable standardisé est remis à la direction technique à l&apos;issue d&apos;un incident critique :
              </p>
            </div>

            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 text-xs sm:text-sm leading-relaxed">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">Document Confidentiel Interne</span>
                <h3 className="text-lg font-black text-white mt-1">Post-Mortem : Incident Vente Flash INC-8924</h3>
                <span className="text-xs text-slate-400 font-mono">Auteurs : Équipe Ingénierie &amp; Débogage • Date : Novembre 2026</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5 font-mono">1. Résumé Exécutif</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  À 12h02 UTC, lors de l&apos;ouverture des soldes flash, un afflux de 14 000 requêtes/minute a déclenché trois dysfonctionnements majeurs : crash UI lors de la saisie de coupons, survente de 32 consoles en rupture de stock et 18 doublons de prélèvement bancaire. L&apos;incident a été endigué à 12h28 UTC suite au déploiement des 3 patchs chirurgicaux.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5 font-mono">2. Analyse de la Cause Racine (RCA)</h4>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-300 space-y-1.5">
                  <li><strong>Bug UI :</strong> Absence d&apos;optional chaining sur la réponse de l&apos;API coupon (<code className="text-rose-300 font-mono">items: undefined</code>).</li>
                  <li><strong>Bug SQL :</strong> Concurrence non maîtrisée (Time-of-Check to Time-of-Use) sans clause atomique <code className="text-cyan-300 font-mono">WHERE stock &gt;= quantity</code>.</li>
                  <li><strong>Bug API :</strong> Absence d&apos;en-tête d&apos;idempotence sur la passerelle de paiement et pas de blocage du clic sur le bouton client.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">3. Bilan d&apos;Impact Métier</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Paiements doublons :</span>
                    <strong className="text-amber-300 text-sm">18 (Remboursés)</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Surventes physiques :</span>
                    <strong className="text-rose-400 text-sm">32 consoles</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Durée d&apos;interruption :</span>
                    <strong className="text-slate-200 text-sm">26 minutes</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Perte estimée :</span>
                    <strong className="text-slate-200 text-sm">~ 4 200 €</strong>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 font-mono">4. Plan d&apos;Actions Préventives (CAPA)</h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Déploiement obligatoire des clés d&apos;idempotence sur tous les endpoints financiers.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Règle d&apos;architecture stricte : toute modification de stock doit être atomique conditionnelle.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ajout de tests de charge de concurrence automatisés dans la pipeline CI/CD avant chaque solde.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION ATELIER INTERACTIF BUG TRIAGE LAB
         ========================================================================= */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-slate-950">
            Atelier Interactif : Investigation d&apos;Incidents Réels en Direct
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Mettez en application le protocole d&apos;enquête sur des incidents réels : inspectez les requêtes HTTP, décortiquez les stack traces serveur, choisissez le correctif optimal et testez-le en direct :
        </p>
        <BugTriageLab />
      </section>

      {/* =========================================================================
          SECTION QUIZ DE SYNTHÈSE DU MODULE 1
         ========================================================================= */}
      <section className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <Icon name="info" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950">Quiz d&apos;Évaluation Pratique du Grand TP</h2>
              <p className="text-xs text-slate-600 font-medium">Vérifiez votre compréhension méthodologique avant de passer l&apos;examen final du module</p>
            </div>
          </div>
          {showResults && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <Icon name="rotate-ccw" className="w-3.5 h-3.5" /> Recommencer
            </button>
          )}
        </div>

        <div className="space-y-5">
          {quizQuestions.map((q) => {
            const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

            return (
              <div key={q.id} className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <p className="text-sm font-bold text-slate-900">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    let btnStyle = "bg-white border-slate-300 text-slate-700 hover:bg-slate-100";
                    if (showResults) {
                      if (optIndex === q.correctAnswer) {
                        btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                      } else if (selectedAnswers[q.id] === optIndex) {
                        btnStyle = "bg-rose-100 border-rose-400 text-rose-950";
                      }
                    } else if (selectedAnswers[q.id] === optIndex) {
                      btnStyle = "bg-emerald-600 text-white font-bold border-emerald-700 shadow-sm";
                    }

                    return (
                      <button
                        key={optIndex}
                        disabled={showResults}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className={`mt-3 p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
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
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              Valider les réponses du TP
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-900">
                Score du TP : <strong className="text-emerald-700 text-base">{score} / {quizQuestions.length}</strong>
              </span>
              <span className="text-xs text-slate-600 font-medium">
                ({score === quizQuestions.length ? 'Excellente maîtrise !' : 'Revoyez les étapes d\'investigation.'})
              </span>
            </div>
          )}

          <Link
            href="/examens/debugging/module-1"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
          >
            Passer l&apos;Examen du Module 1 <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
