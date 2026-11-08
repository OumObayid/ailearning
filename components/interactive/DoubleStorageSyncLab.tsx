'use client';

import React, { useState } from 'react';

interface DocumentRecord {
  id: number;
  userId: number;
  title: string;
  status: 'pending' | 'processing' | 'indexed' | 'failed';
  errorMessage?: string;
}

interface ChunkRecord {
  id: number;
  documentId: number;
  index: number;
  content: string;
  qdrantPointId?: string;
}

interface QdrantPoint {
  id: string;
  vectorPreview: string;
  payload: {
    userId: number;
    documentId: number;
    chunkId: number;
  };
}

export const DoubleStorageSyncLab: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [simulateQdrantFailure, setSimulateQdrantFailure] = useState<boolean>(false);
  const [mysqlDoc, setMysqlDoc] = useState<DocumentRecord | null>(null);
  const [mysqlChunks, setMysqlChunks] = useState<ChunkRecord[]>([]);
  const [qdrantPoints, setQdrantPoints] = useState<QdrantPoint[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  };

  const runFullPipeline = async () => {
    // Étape 1 : Init MySQL
    setCurrentStep(1);
    setMysqlDoc({
      id: 101,
      userId: 42,
      title: 'politique_remboursement_2026.pdf',
      status: 'pending',
    });
    setMysqlChunks([]);
    setQdrantPoints([]);
    setLogs(['[MySQL] 📄 INSERT INTO documents (user_id, title, status) VALUES (42, "politique...", "pending")']);

    await new Promise((r) => setTimeout(r, 700));

    // Étape 2 : Extraction & Chunks
    setCurrentStep(2);
    setMysqlDoc((prev) => (prev ? { ...prev, status: 'processing' } : null));
    const sampleChunks: ChunkRecord[] = [
      { id: 501, documentId: 101, index: 1, content: 'Article 1 : Délais de réclamation sous 14 jours ouvrés.' },
      { id: 502, documentId: 101, index: 2, content: 'Article 2 : Pièces justificatives requises (facture, photo colis).' },
    ];
    setMysqlChunks(sampleChunks);
    addLog('[MySQL] ✂️ 2 fragments insérés dans document_chunks (qdrant_point_id encore NULL)');

    await new Promise((r) => setTimeout(r, 800));

    // Étape 3 : Calcul Embeddings & Upsert Qdrant
    setCurrentStep(3);
    addLog('[Gemini] 🧠 Calcul des embeddings 768 dimensions pour 2 chunks...');

    await new Promise((r) => setTimeout(r, 600));

    if (simulateQdrantFailure) {
      // Échec de la base vectorielle
      addLog('[Qdrant] ❌ Connexion refusée (ECONNREFUSED 127.0.0.1:6333) !');
      setMysqlDoc((prev) =>
        prev
          ? {
              ...prev,
              status: 'failed',
              errorMessage: 'Échec de synchronisation vectorielle Qdrant',
            }
          : null
      );
      addLog('[MySQL] 🛡️ UPDATE documents SET status = "failed" — Rollback des fragments incomplets.');
      setCurrentStep(4);
      return;
    }

    const createdPoints: QdrantPoint[] = [
      {
        id: 'c8a14b29-9e81-432a-bc91-23d91f4a0001',
        vectorPreview: '[0.042, -0.128, 0.089, ... 768d]',
        payload: { userId: 42, documentId: 101, chunkId: 501 },
      },
      {
        id: 'c8a14b29-9e81-432a-bc91-23d91f4a0002',
        vectorPreview: '[-0.015, 0.204, -0.052, ... 768d]',
        payload: { userId: 42, documentId: 101, chunkId: 502 },
      },
    ];

    setQdrantPoints(createdPoints);
    addLog('[Qdrant] 🎯 2 points vectoriels upsertés avec succès dans la collection "documents"');

    await new Promise((r) => setTimeout(r, 600));

    // Étape 4 : Validation finale MySQL
    setCurrentStep(4);
    setMysqlDoc((prev) => (prev ? { ...prev, status: 'indexed' } : null));
    setMysqlChunks((prev) =>
      prev.map((chunk, idx) => ({
        ...chunk,
        qdrantPointId: createdPoints[idx].id,
      }))
    );
    addLog('[MySQL] ✅ UPDATE documents SET status = "indexed" — Double stockage synchronisé avec succès !');
  };

  const resetAll = () => {
    setCurrentStep(0);
    setMysqlDoc(null);
    setMysqlChunks([]);
    setQdrantPoints([]);
    setLogs([]);
  };

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Double Stockage Synchronisé (MySQL ↔ Qdrant)
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez la machine à états de l&apos;ingestion qui synchronise la source de vérité relationnelle et l&apos;index vectoriel.
          </p>
        </div>
        <button
          onClick={resetAll}
          className="self-start rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          Réinitialiser
        </button>
      </div>

      {/* Barre d'état d'ingestion */}
      <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-4">
        {[
          { step: 1, label: '1. Inscription MySQL', desc: 'status: pending' },
          { step: 2, label: '2. Découpage Chunks', desc: 'status: processing' },
          { step: 3, label: '3. Embeddings & Qdrant', desc: 'Points HNSW 768d' },
          { step: 4, label: '4. Validation Finale', desc: 'status: indexed' },
        ].map((item) => (
          <div
            key={item.step}
            className={`rounded-lg border p-3 transition ${
              currentStep === item.step
                ? 'border-indigo-600 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/40 ring-2 ring-indigo-500'
                : currentStep > item.step
                ? 'border-emerald-300 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300'
                : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 opacity-60'
            }`}
          >
            <div className="font-bold text-sm">{item.label}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Boutons d'action et toggle d'erreur */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <button
          onClick={runFullPipeline}
          disabled={currentStep > 0 && currentStep < 4}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {currentStep > 0 && currentStep < 4
            ? 'Synchronisation en cours...'
            : '▶ Téléverser et synchroniser un document'}
        </button>

        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={simulateQdrantFailure}
            onChange={(e) => setSimulateQdrantFailure(e.target.checked)}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Simuler panne Qdrant (Test de résilience &amp; gestion des états)
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Source de Vérité MySQL */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              🐬 Base MySQL (Source de Vérité)
            </span>
            {mysqlDoc && (
              <span
                className={`rounded px-2 py-0.5 text-sm font-bold capitalize ${
                  mysqlDoc.status === 'indexed'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                    : mysqlDoc.status === 'failed'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                }`}
              >
                status: {mysqlDoc.status}
              </span>
            )}
          </div>

          {mysqlDoc ? (
            <div className="space-y-3">
              <div className="rounded bg-slate-50 p-2.5 text-sm font-mono dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div><strong>Table documents :</strong></div>
                <div>id: {mysqlDoc.id} | user_id: {mysqlDoc.userId}</div>
                <div>title: &ldquo;{mysqlDoc.title}&rdquo;</div>
                {mysqlDoc.errorMessage && (
                  <div className="text-rose-600 dark:text-rose-400 font-semibold mt-1">
                    error_message: &ldquo;{mysqlDoc.errorMessage}&rdquo;
                  </div>
                )}
              </div>

              <div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                  Table document_chunks ({mysqlChunks.length} enregistrements) :
                </span>
                <div className="space-y-1.5">
                  {mysqlChunks.map((c) => (
                    <div
                      key={c.id}
                      className="rounded border border-slate-200 bg-slate-50 p-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                    >
                      <div className="flex justify-between font-mono text-sm text-indigo-600 dark:text-indigo-400">
                        <span>Chunk #{c.id} (index: {c.index})</span>
                        <span>qdrant_id: {c.qdrantPointId ? c.qdrantPointId.slice(0, 8) + '...' : 'NULL'}</span>
                      </div>
                      <p className="mt-1 line-clamp-1 text-slate-600 dark:text-slate-400 font-mono text-sm">
                        {c.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-500 italic py-8 text-center">
              Cliquez sur le bouton ci-dessus pour initialiser la transaction documentaire.
            </div>
          )}
        </div>

        {/* Index d'Orientation Qdrant */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-sm font-semibold text-slate-300">
              🎯 Qdrant (Index Vectoriel HNSW)
            </span>
            <span className="text-sm text-slate-500">Collection &ldquo;documents&rdquo;</span>
          </div>

          <div className="flex-1 space-y-2 font-mono text-sm">
            {qdrantPoints.length === 0 ? (
              <div className="text-slate-500 italic py-8 text-center">
                Aucun point vectoriel inséré.
              </div>
            ) : (
              qdrantPoints.map((p) => (
                <div key={p.id} className="rounded border border-indigo-900/60 bg-indigo-950/30 p-2.5">
                  <div className="flex justify-between text-indigo-300 font-bold">
                    <span>Point ID: {p.id.slice(0, 14)}...</span>
                    <span className="text-emerald-400">Dim: 768</span>
                  </div>
                  <div className="text-slate-400 mt-1">Vector: {p.vectorPreview}</div>
                  <div className="text-amber-300 mt-1">
                    Payload: {JSON.stringify(p.payload)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Console de traces d'événements */}
          <div className="mt-4 border-t border-slate-800 pt-2 font-mono text-sm text-slate-400 max-h-24 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx} className={log.includes('❌') ? 'text-rose-400 font-bold' : log.includes('✅') ? 'text-emerald-400' : ''}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

