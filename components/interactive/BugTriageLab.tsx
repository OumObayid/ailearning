'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface BugCase {
  id: string;
  title: string;
  badge: string;
  difficulty: 'Intermédiaire' | 'Avancé';
  symptom: string;
  network: {
    method: string;
    url: string;
    status: number;
    timing: string;
    requestPayload: string;
    responseBody: string;
  };
  serverLog: string;
  stackTrace: string[];
  options: {
    id: string;
    label: string;
    code: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const BUG_CASES: BugCase[] = [
  {
    id: 'case-1',
    title: 'Incident #104 : Erreur 500 lors du paiement d\'un panier avec réduction',
    badge: 'Backend Express & Stripe',
    difficulty: 'Intermédiaire',
    symptom: 'Les utilisateurs avec un coupon VIP reçoivent une erreur serveur "500 Internal Server Error" au moment de valider leur commande. Les commandes sans coupon fonctionnent normalement.',
    network: {
      method: 'POST',
      url: 'https://api.shop.com/v1/checkout/pay',
      status: 500,
      timing: '240ms',
      requestPayload: JSON.stringify(
        {
          cartId: 'cart_9921',
          coupon: 'VIP50',
          amount: 150,
          user: { id: 'usr_42' }, // Missing stripeCustomerId
        },
        null,
        2
      ),
      responseBody: JSON.stringify(
        {
          error: 'Internal Server Error',
          message: 'Cannot read properties of undefined (reading \'id\')',
        },
        null,
        2
      ),
    },
    serverLog: '[ERROR] 14:02:11 - Échec du traitement de paiement cartId: cart_9921',
    stackTrace: [
      'TypeError: Cannot read properties of undefined (reading \'id\')',
      '    at applyDiscountAndCharge (/src/services/payment.js:44:28)',
      '    at handleCheckout (/src/controllers/orderController.js:19:11)',
      '    at Layer.handle [as handle_request] (/node_modules/express/lib/router/layer.js:95:5)',
    ],
    options: [
      {
        id: 'opt-a',
        label: 'A. Forcer le montant à zéro si un coupon existe',
        code: `if (coupon) {\n  amount = 0;\n}\nreturn stripe.charges.create({ amount });`,
        isCorrect: false,
        explanation: 'Incorrect : Cela rendrait toutes les commandes gratuites sans résoudre l\'accès à l\'objet Stripe client non défini.',
      },
      {
        id: 'opt-b',
        label: 'B. Sécuriser l\'accès avec optional chaining et fallback de création client',
        code: `const customerId = user?.stripeCustomerId ?? (await createStripeCustomer(user));\nconst finalAmount = coupon ? calculateDiscount(amount, coupon) : amount;\nreturn stripe.charges.create({ customer: customerId, amount: finalAmount });`,
        isCorrect: true,
        explanation: 'Parfait ! L\'opérateur d\'enchaînement optionnel (?.) et le fallback de création évitent le crash, tout en appliquant correctement le calcul de remise.',
      },
      {
        id: 'opt-c',
        label: 'C. Supprimer la vérification du coupon dans le contrôleur',
        code: `// On ignore le coupon pour éviter le crash\nreturn stripe.charges.create({ amount });`,
        isCorrect: false,
        explanation: 'Incorrect : Le coupon est ignoré, le client ne reçoit plus sa réduction et l\'erreur de client manquant surviendra toujours.',
      },
    ],
  },
  {
    id: 'case-2',
    title: 'Incident #105 : Fuite mémoire Node.js sur écouteurs d\'événements',
    badge: 'Node.js & EventEmitter',
    difficulty: 'Avancé',
    symptom: 'Après 2 heures de production sous fort trafic, le processus Node.js s\'arrête brusquement avec "FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory".',
    network: {
      method: 'GET',
      url: 'https://api.shop.com/v1/metrics/events',
      status: 200,
      timing: '8500ms (Dégradé)',
      requestPayload: '{}',
      responseBody: '{"warning": "MaxListenersExceededWarning: Possible EventEmitter memory leak detected"}',
    },
    serverLog: '(node:492) MaxListenersExceededWarning: 11 data listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit',
    stackTrace: [
      'MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 data listeners added',
      '    at _addListener (node:events:571:17)',
      '    at addListener (node:events:587:10)',
      '    at onStockUpdate (/src/services/inventoryWatcher.js:31:16)',
      '    at /src/controllers/productController.js:52:7',
    ],
    options: [
      {
        id: 'opt-a',
        label: 'A. Augmenter emitter.setMaxListeners(100000) pour masquer le warning',
        code: `emitter.setMaxListeners(100000); // Supprime l'alerte console`,
        isCorrect: false,
        explanation: 'Danger ! Masquer le warning ne résout pas la fuite : les écouteurs continueront de s\'accumuler jusqu\'au crash total de la mémoire.',
      },
      {
        id: 'opt-b',
        label: 'B. Détacher le listener avec once() ou un cleanup removeListener() dans le cycle de vie',
        code: `// Nettoyage systématique de l'écouteur à la fin de la requête\nconst onUpdate = (data) => res.write(data);\ninventoryEmitter.on('update', onUpdate);\nres.on('close', () => {\n  inventoryEmitter.removeListener('update', onUpdate);\n});`,
        isCorrect: true,
        explanation: 'Excellente réponse ! Lier le détachement de l\'écouteur à l\'événement "close" de la réponse HTTP libère immédiatement la mémoire du heap V8 dès que le client se déconnecte.',
      },
      {
        id: 'opt-c',
        label: 'C. Redémarrer le serveur toutes les 15 minutes avec un cron',
        code: `// cron.schedule('*/15 * * * *', () => process.exit(0));`,
        isCorrect: false,
        explanation: 'Incorrect : Un contournement opérationnel fragile qui interrompt les connexions actives sans traiter la cause racine.',
      },
    ],
  },
];

export const BugTriageLab: React.FC = () => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'symptoms' | 'network' | 'logs' | 'fix'>('symptoms');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isTested, setIsTested] = useState<boolean>(false);

  const currentCase = BUG_CASES[selectedCaseIdx];
  const selectedOption = currentCase.options.find((o) => o.id === selectedOptionId);

  const handleSelectCase = (idx: number) => {
    setSelectedCaseIdx(idx);
    setActiveTab('symptoms');
    setSelectedOptionId(null);
    setIsTested(false);
  };

  const handleTestFix = () => {
    if (selectedOptionId) {
      setIsTested(true);
    }
  };

  return (
    <div className="rounded-3xl border-2 border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden font-sans my-8">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
            Laboratoire d&apos;Investigation & Triage d&apos;Incidents
          </span>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center gap-2">
          {BUG_CASES.map((bc, idx) => (
            <button
              key={bc.id}
              onClick={() => handleSelectCase(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedCaseIdx === idx
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Incident #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Case Overview Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 mr-2">
            {currentCase.badge}
          </span>
          <span className="text-sm font-bold text-slate-100">{currentCase.title}</span>
        </div>
        <span className="text-xs text-slate-400 font-mono">Difficulté : {currentCase.difficulty}</span>
      </div>

      {/* Investigation Tabs */}
      <div className="bg-slate-900/30 border-b border-slate-800 px-4 flex gap-1 text-xs">
        <button
          onClick={() => setActiveTab('symptoms')}
          className={`px-3 py-2.5 font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'symptoms'
              ? 'border-rose-400 text-rose-300 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Icon name="document-text" className="w-4 h-4" />
          <span>1. Symptômes</span>
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`px-3 py-2.5 font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'network'
              ? 'border-cyan-400 text-cyan-300 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Icon name="server" className="w-4 h-4" />
          <span>2. Réseau & HTTP</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-3 py-2.5 font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'logs'
              ? 'border-amber-400 text-amber-300 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Icon name="code" className="w-4 h-4" />
          <span>3. Stack Trace</span>
        </button>
        <button
          onClick={() => setActiveTab('fix')}
          className={`px-3 py-2.5 font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'fix'
              ? 'border-emerald-400 text-emerald-300 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Icon name="check-circle" className="w-4 h-4" />
          <span>4. Diagnostic & Patch</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-4 sm:p-6 min-h-[320px]">
        {/* Tab 1: Symptoms */}
        {activeTab === 'symptoms' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-slate-400 font-mono">
              Rapport d&apos;incident & Description du Bug
            </h4>
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 text-sm text-slate-200 leading-relaxed">
              {currentCase.symptom}
            </div>
            <div className="rounded-xl bg-amber-950/30 border border-amber-900/40 p-3 text-xs text-amber-300 flex items-start gap-2">
              <Icon name="info" className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Action recommandée :</strong> Allez dans l&apos;onglet <em>2. Réseau & HTTP</em> pour inspecter le payload envoyé et le code de statut retourné par l&apos;API.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Network */}
        {activeTab === 'network' && (
          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold">{currentCase.network.method}</span>
                <span className="text-slate-200">{currentCase.network.url}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-rose-400 font-bold">Status: {currentCase.network.status}</span>
                <span className="text-slate-400">Latence: {currentCase.network.timing}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-slate-400 uppercase text-[11px] font-sans font-bold">Request Payload (JSON)</div>
                <pre className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto text-xs">
                  {currentCase.network.requestPayload}
                </pre>
              </div>
              <div className="space-y-1">
                <div className="text-slate-400 uppercase text-[11px] font-sans font-bold">Response Body (Serveur)</div>
                <pre className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-rose-300 overflow-x-auto text-xs">
                  {currentCase.network.responseBody}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Logs */}
        {activeTab === 'logs' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <div className="text-slate-400 uppercase text-[11px] font-sans font-bold">Journal d&apos;exécution Serveur</div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-amber-300">
                {currentCase.serverLog}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-slate-400 uppercase text-[11px] font-sans font-bold">Stack Trace Décompilée</div>
              <div className="bg-rose-950/20 p-3.5 rounded-xl border border-rose-900/50 space-y-1 text-rose-200">
                {currentCase.stackTrace.map((frame, i) => (
                  <div key={i} className={i === 0 ? 'font-bold text-rose-300' : 'pl-4 text-slate-300'}>
                    {frame}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Fix */}
        {activeTab === 'fix' && (
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold text-slate-200">
                Choisissez le correctif professionnel pour résoudre cet incident :
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Sélectionnez le patch qui traite la cause racine sans introduire de régression.
              </p>
            </div>

            <div className="space-y-3">
              {currentCase.options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedOptionId(opt.id);
                    setIsTested(false);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedOptionId === opt.id
                      ? 'border-emerald-500 bg-emerald-950/20 shadow-md shadow-emerald-900/20'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-slate-200">{opt.label}</span>
                    <input
                      type="radio"
                      name="fixOption"
                      checked={selectedOptionId === opt.id}
                      onChange={() => {}}
                      className="text-emerald-500"
                    />
                  </div>
                  <pre className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                    {opt.code}
                  </pre>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                disabled={!selectedOptionId}
                onClick={handleTestFix}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Icon name="rocket" className="w-4 h-4" />
                <span>Déployer et tester le patch</span>
              </button>
            </div>

            {/* Test result feedback */}
            {isTested && selectedOption && (
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  selectedOption.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                }`}
              >
                <div className="font-bold font-sans text-sm mb-1 flex items-center gap-2">
                  {selectedOption.isCorrect ? (
                    <>
                      <span className="text-emerald-400 text-base">✓</span>
                      <span className="text-emerald-300">Incident Résolu avec Succès !</span>
                    </>
                  ) : (
                    <>
                      <span className="text-rose-400 text-base">✕</span>
                      <span className="text-rose-300">Régression ou Échec Détecté</span>
                    </>
                  )}
                </div>
                <p>{selectedOption.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

