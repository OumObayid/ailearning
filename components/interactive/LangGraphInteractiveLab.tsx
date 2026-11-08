'use client';

import React, { useState } from 'react';

interface NodeStatus {
  id: string;
  label: string;
  type: 'agent' | 'tool' | 'condition' | 'hitl';
  description: string;
}

export const LangGraphInteractiveLab: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('agent');
  const [humanApproved, setHumanApproved] = useState<boolean | null>(null);
  const [executionLog, setExecutionLog] = useState<string[]>([
    "Initialisation du graphe StateGraph avec l'intention utilisateur.",
    "Nœud 1 (agentModelNode) : Gemini analyse le message...",
  ]);

  const nodes: NodeStatus[] = [
    {
      id: 'agent',
      label: '1. Modèle Agent (Gemini)',
      type: 'agent',
      description: 'Gemini examine le message utilisateur et décide s’il a besoin d’un outil ou s’il peut répondre directement.',
    },
    {
      id: 'condition',
      label: '2. Branche conditionnelle',
      type: 'condition',
      description: 'Aiguillage selon la nature de l’action : outil standard, outil critique avec validation humaine, ou fin de graphe.',
    },
    {
      id: 'hitl',
      label: '3. Suspension Human-in-the-Loop',
      type: 'hitl',
      description: 'Action sensible détectée (ex: annulation commande). Le graphe s’interrompt avec interrupt() et attend la décision humaine.',
    },
    {
      id: 'tool',
      label: '4. Exécution de l’outil',
      type: 'tool',
      description: 'L’outil autorisé s’exécute sur MySQL ou Qdrant et retourne le résultat dans le state du graphe.',
    },
    {
      id: 'end',
      label: '5. Nœud final (END)',
      type: 'agent',
      description: 'Gemini formule la réponse conclusive à l’utilisateur et le cycle s’achève proprement.',
    },
  ];

  const handleNextStep = (target: string, logMsg: string) => {
    setCurrentNodeId(target);
    setExecutionLog((prev) => [...prev, logMsg]);
  };

  const handleHumanDecision = (approved: boolean) => {
    setHumanApproved(approved);
    if (approved) {
      handleNextStep(
        'tool',
        "Approbation humaine accordée via Command({ resume: true }). Exécution de l'annulation de commande..."
      );
    } else {
      handleNextStep(
        'end',
        "Refus humain notifié via Command({ resume: false }). Gemini formule un message expliquant le refus d'annulation."
      );
    }
  };

  const resetGraph = () => {
    setCurrentNodeId('agent');
    setHumanApproved(null);
    setExecutionLog([
      "Réinitialisation du graphe.",
      "Nœud 1 (agentModelNode) : Gemini analyse le message : 'Annule ma commande 402'...",
    ]);
  };

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-rose-50 px-2.5 py-0.5 text-sm font-bold text-rose-700">
              Lab Graphes d&apos;État
            </span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-0.5 text-sm font-bold text-indigo-700">
              LangGraph.js & HITL
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
            Simulateur de Cycle de Graphe avec Suspension Human-in-the-Loop
          </h4>
        </div>

        <button
          onClick={resetGraph}
          className="px-3.5 py-1.5 text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
        >
          🔄 Recommencer le cycle
        </button>
      </div>

      {/* Représentation visuelle des nœuds du graphe */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-5 gap-3">
        {nodes.map((n) => {
          const isActive = currentNodeId === n.id;
          return (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-all text-center flex flex-col justify-between ${
                isActive
                  ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-md'
                  : 'border-slate-200 bg-slate-50 opacity-70'
              }`}
            >
              <div>
                <span className={`w-3 h-3 rounded-full mx-auto block mb-2 ${
                  isActive ? 'bg-indigo-600 animate-pulse' : 'bg-slate-300'
                }`} />
                <span className="text-sm font-extrabold text-slate-900 block leading-tight">{n.label}</span>
              </div>
              <span className={`text-sm mt-2 px-1.5 py-0.5 rounded font-bold ${
                isActive ? 'bg-indigo-200 text-indigo-900' : 'bg-slate-200 text-slate-600'
              }`}>
                {isActive ? 'En cours' : 'En attente'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Zone de contrôle et d'action interactive */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-2xl border border-slate-200 p-5 bg-white space-y-4 shadow-sm">
          <span className="text-sm font-bold text-slate-700 block">Scénario en cours d&apos;exécution :</span>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-800">
            <strong>Demande utilisateur :</strong> <em>« Annulez immédiatement ma commande #402 passée hier. »</em>
          </div>

          {/* Actions conditionnelles selon le nœud actif */}
          {currentNodeId === 'agent' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                Gemini a détecté une intention d&apos;annulation nécessitant l&apos;outil critique <code>cancelOrder</code>.
              </p>
              <button
                onClick={() => handleNextStep('condition', "Transition vers la branche conditionnelle : détection de l'outil sensible cancelOrder.")}
                className="w-full py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700"
              >
                Passer à l&apos;évaluation conditionnelle ➔
              </button>
            </div>
          )}

          {currentNodeId === 'condition' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                L&apos;outil <code>cancelOrder</code> est classé comme sensible. Le graphe déclenche la suspension humaine.
              </p>
              <button
                onClick={() => handleNextStep('hitl', "Appel de interrupt() : Graphe suspendu en attente d'approbation d'un opérateur.")}
                className="w-full py-2.5 bg-amber-600 text-white font-bold text-sm rounded-xl hover:bg-amber-700"
              >
                Déclencher interrupt() (Suspension) ➔
              </button>
            </div>
          )}

          {currentNodeId === 'hitl' && (
            <div className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50/70 space-y-3">
              <span className="text-sm font-extrabold text-amber-900 block">
                ⚠️ Interruption Human-in-the-Loop : Validation requise
              </span>
              <p className="text-sm text-amber-800">
                Un opérateur humain doit confirmer ou refuser l&apos;annulation de la commande avant toute écriture en BDD.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleHumanDecision(true)}
                  className="flex-1 py-2 bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-emerald-700"
                >
                  ✅ Approuver l&apos;action
                </button>
                <button
                  onClick={() => handleHumanDecision(false)}
                  className="flex-1 py-2 bg-rose-600 text-white font-bold text-sm rounded-lg hover:bg-rose-700"
                >
                  ❌ Refuser l&apos;action
                </button>
              </div>
            </div>
          )}

          {currentNodeId === 'tool' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                La commande #402 a été annulée dans MySQL. Le statut est renvoyé à Gemini pour la réponse finale.
              </p>
              <button
                onClick={() => handleNextStep('end', "Gemini rédige la confirmation définitive pour l'utilisateur.")}
                className="w-full py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700"
              >
                Générer la réponse finale (END) ➔
              </button>
            </div>
          )}

          {currentNodeId === 'end' && (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-sm text-emerald-950 space-y-1">
              <span className="font-bold block">🎉 Cycle du graphe terminé avec succès :</span>
              <p>
                {humanApproved
                  ? "« Votre commande #402 a bien été annulée après validation managériale. Vous recevrez un remboursement sous 48h. »"
                  : "« Votre demande d'annulation n'a pas pu être validée par le service gestionnaire car le colis a déjà été expédié. »"}
              </p>
            </div>
          )}
        </div>

        {/* Console d'exécution en temps réel */}
        <div className="rounded-2xl border border-slate-200 p-5 bg-slate-900 text-slate-100 flex flex-col justify-between shadow-inner h-full min-h-[260px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-sm font-mono font-bold text-slate-400">Journal d&apos;exécution StateGraph</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-1.5 font-mono text-sm max-h-48 overflow-y-auto">
              {executionLog.map((log, idx) => (
                <div key={idx} className="flex gap-2 text-slate-300">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800 text-sm text-slate-500 font-mono flex justify-between">
            <span>État persistant : Checkpoint ID validé</span>
            <span>Thread : sess_981a</span>
          </div>
        </div>
      </div>
    </div>
  );
};
