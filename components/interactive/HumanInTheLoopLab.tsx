'use client';

import React, { useState } from 'react';

interface OperationRequest {
  id: string;
  client: string;
  amount: number;
  reason: string;
  riskLevel: 'LOW' | 'CRITICAL';
  proposedAction: string;
}

export const HumanInTheLoopLab: React.FC = () => {
  const [selectedOperation, setSelectedOperation] = useState<OperationRequest>({
    id: 'OP-84920',
    client: 'Société Dupont SAS',
    amount: 380,
    reason: 'Erreur de double facturation suite à un incident de connecteur Stripe.',
    riskLevel: 'CRITICAL',
    proposedAction: 'Émettre un remboursement bancaire de 380,00 € via API Stripe',
  });

  const [workflowStatus, setWorkflowStatus] = useState<
    'idle' | 'evaluating' | 'auto_approved' | 'waiting_human' | 'human_approved' | 'human_rejected'
  >('idle');

  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  };

  const startWorkflow = () => {
    setWorkflowStatus('evaluating');
    setLogs([
      `[Workflow] 🚀 Démarrage de l'opération ${selectedOperation.id} pour ${selectedOperation.client}`,
      `[AI Agent] Évaluation de l'action : ${selectedOperation.proposedAction}`,
    ]);

    setTimeout(() => {
      // Si montant <= 50€, approbation automatique sans intervention humaine
      if (selectedOperation.amount <= 50) {
        setWorkflowStatus('auto_approved');
        addLog(`[Policy] 🟢 Montant (${selectedOperation.amount}€) inférieur au seuil de sécurité (50€).`);
        addLog(`[Action] ✅ Remboursement exécuté automatiquement sans blocage.`);
      } else {
        // Seuil dépassé : déclenchement du Human-in-the-Loop
        setWorkflowStatus('waiting_human');
        addLog(`[Policy] ⚠️ SEUIL DE SÉCURITÉ DÉPASSÉ : ${selectedOperation.amount}€ > 50€ !`);
        addLog(`[HITL] ⏸️ Workflow mis en pause. Nœud d'attente Webhook généré (resumeUrl).`);
        addLog(`[Slack/Email] 📩 Notification d'approbation transmise au gestionnaire financier.`);
      }
    }, 700);
  };

  const handleApprove = () => {
    setWorkflowStatus('human_approved');
    addLog(`[Auditor] 👤 Gestionnaire 'admin_finance@entreprise.com' : APPROBATION VALIDÉE.`);
    addLog(`[Webhook] 🔑 Reprise du workflow via token de reprise chiffré.`);
    addLog(`[Stripe API] 💸 Virement de ${selectedOperation.amount}€ exécuté avec succès.`);
    addLog(`[MySQL] 📝 Ligne d'audit consignée : status = 'approved', approved_by = 'admin_finance'.`);
  };

  const handleReject = () => {
    setWorkflowStatus('human_rejected');
    addLog(`[Auditor] 🛑 Gestionnaire : REJET DE L'ACTION (Motif: ${rejectionReason || 'Non spécifié'}).`);
    addLog(`[Action] ❌ Remboursement annulé. Notification de rejet transmise au client.`);
    addLog(`[MySQL] 📝 Ligne d'audit consignée : status = 'rejected'.`);
  };

  const resetLab = () => {
    setWorkflowStatus('idle');
    setLogs([]);
    setRejectionReason('');
  };

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Human-in-the-Loop &amp; Garde-Fou Financier
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez la mise en pause d&apos;un workflow pour validation humaine lors d&apos;actions à impact financier ou destructif.
          </p>
        </div>
        <button
          onClick={resetLab}
          className="self-start rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          Réinitialiser
        </button>
      </div>

      {/* Choix du scénario d'action */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        <button
          disabled={workflowStatus !== 'idle'}
          onClick={() => {
            setSelectedOperation({
              id: 'OP-10291',
              client: 'Jean Petit (Particulier)',
              amount: 29,
              reason: 'Geste commercial pour retard de livraison de 24h.',
              riskLevel: 'LOW',
              proposedAction: 'Émettre un avoir de 29,00 €',
            });
            resetLab();
          }}
          className={`rounded-lg border p-3 text-left transition ${
            selectedOperation.amount <= 50
              ? 'border-emerald-600 bg-emerald-50/60 dark:border-emerald-500 dark:bg-emerald-950/30'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'
          }`}
        >
          <div className="flex justify-between font-bold text-sm">
            <span>Scénario 1 : Montant Faible (29 €)</span>
            <span className="text-emerald-600 dark:text-emerald-400">Risque Faible</span>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Inférieur au seuil de 50 € : le workflow s&apos;exécute de façon autonome.
          </p>
        </button>

        <button
          disabled={workflowStatus !== 'idle'}
          onClick={() => {
            setSelectedOperation({
              id: 'OP-84920',
              client: 'Société Dupont SAS',
              amount: 380,
              reason: 'Erreur de double facturation suite à un incident Stripe.',
              riskLevel: 'CRITICAL',
              proposedAction: 'Émettre un remboursement bancaire de 380,00 € via API Stripe',
            });
            resetLab();
          }}
          className={`rounded-lg border p-3 text-left transition ${
            selectedOperation.amount > 50
              ? 'border-rose-600 bg-rose-50/60 dark:border-rose-500 dark:bg-rose-950/30'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'
          }`}
        >
          <div className="flex justify-between font-bold text-sm">
            <span>Scénario 2 : Montant Élevé (380 €)</span>
            <span className="text-rose-600 dark:text-rose-400">Risque Élevé</span>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Dépasse le seuil de 50 € : pause obligatoire et demande d&apos;approbation humaine.
          </p>
        </button>
      </div>

      {/* Déclenchement */}
      {workflowStatus === 'idle' && (
        <div className="mb-6">
          <button
            onClick={startWorkflow}
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            ▶ Lancer l&apos;opération ({selectedOperation.amount} €)
          </button>
        </div>
      )}

      {/* Carte d'intervention humaine (Human-in-the-Loop) */}
      {workflowStatus === 'waiting_human' && (
        <div className="mb-6 rounded-xl border-2 border-amber-500 bg-amber-50/70 p-5 shadow-md dark:border-amber-600 dark:bg-amber-950/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⏸️</span>
            <h5 className="text-lg font-bold text-amber-950 dark:text-amber-200">
              Intervention requise : Approbation Manuelle d&apos;Opération
            </h5>
          </div>

          <p className="text-sm text-amber-900 dark:text-amber-300 mb-4">
            L&apos;IA a formulé une action dépassant le seuil de délégation autonome. Le workflow n8n est actuellement suspendu sur son nœud <code>Wait for Webhook</code> en attente de votre signature.
          </p>

          <div className="rounded-lg bg-white p-3.5 dark:bg-slate-900 border border-amber-200 dark:border-amber-900 text-sm space-y-1 mb-4">
            <div><strong>Client concerné :</strong> {selectedOperation.client}</div>
            <div><strong>Montant demandé :</strong> <span className="font-bold text-rose-600">{selectedOperation.amount},00 €</span></div>
            <div><strong>Justification :</strong> {selectedOperation.reason}</div>
            <div><strong>Action proposée :</strong> {selectedOperation.proposedAction}</div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleApprove}
              className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-bold text-white shadow hover:bg-emerald-700"
            >
              ✅ Approuver et Débloquer le Workflow
            </button>

            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Motif de rejet (facultatif)..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
              <button
                onClick={handleReject}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white shadow hover:bg-rose-700"
              >
                ❌ Rejeter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bilan et journal d'audit */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <span className="font-bold text-sm text-slate-900 dark:text-white block mb-2 border-b border-slate-200 pb-2 dark:border-slate-800">
            État du Workflow &amp; Sécurité
          </span>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Statut du flux :</span>
              <span className="font-bold capitalize text-indigo-600 dark:text-indigo-400">
                {workflowStatus.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Seuil de délégation autonome :</span>
              <span className="font-semibold">50,00 €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Contrôle cryptographique :</span>
              <span className="font-semibold text-emerald-600">HMAC-SHA256 Token</span>
            </div>
          </div>

          {workflowStatus === 'human_approved' && (
            <div className="mt-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-900 font-semibold">
              Action approuvée par l&apos;auditeur humain. Le virement a été émis et audité en base.
            </div>
          )}

          {workflowStatus === 'human_rejected' && (
            <div className="mt-4 rounded-md bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-300 dark:border-rose-900 font-semibold">
              Action rejetée. Aucun mouvement de fonds n&apos;a été exécuté.
            </div>
          )}

          {workflowStatus === 'auto_approved' && (
            <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-300 dark:border-blue-900 font-semibold">
              Exécution autonome fluide : le montant respectait les règles de moindre risque.
            </div>
          )}
        </div>

        {/* Console de traces d'audit */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <span className="font-mono text-sm font-semibold text-slate-300 mb-2 border-b border-slate-800 pb-2">
            Journal d&apos;audit légal (Traçabilité des décisions)
          </span>

          <div className="flex-1 min-h-[140px] font-mono text-sm space-y-1.5 p-2 bg-slate-900/60 rounded overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-slate-500 italic">En attente de déclenchement...</p>
            ) : (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes('⚠️') || log.includes('REJET')
                      ? 'text-amber-400 font-semibold'
                      : log.includes('✅') || log.includes('🟢')
                      ? 'text-emerald-400'
                      : log.includes('🛑')
                      ? 'text-rose-400'
                      : 'text-indigo-300'
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

