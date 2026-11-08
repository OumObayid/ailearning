'use client';

import React, { useState } from 'react';

interface PoolSlot {
  id: number;
  status: 'idle' | 'busy';
  currentUser?: string;
  query?: string;
}

interface MessageRecord {
  id: number;
  userId: number;
  role: 'user' | 'assistant';
  content: string;
}

export const MySQLPoolIsolationSimulator: React.FC = () => {
  const [poolSlots, setPoolSlots] = useState<PoolSlot[]>([
    { id: 1, status: 'idle' },
    { id: 2, status: 'idle' },
    { id: 3, status: 'idle' },
    { id: 4, status: 'idle' },
  ]);

  const [activeUser, setActiveUser] = useState<1 | 2>(1);
  const [strictIsolation, setStrictIsolation] = useState<boolean>(true);
  const [leakMode, setLeakMode] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [retrievedMessages, setRetrievedMessages] = useState<MessageRecord[]>([]);

  // Base de données simulée
  const mockDatabase: MessageRecord[] = [
    { id: 1, userId: 1, role: 'user', content: 'Génère un contrat confidentiel pour le client Dupont SAS.' },
    { id: 2, userId: 1, role: 'assistant', content: 'Voici la clause de confidentialité stricte pour Dupont SAS...' },
    { id: 3, userId: 2, role: 'user', content: 'Comment fonctionne la photosynthèse ?' },
    { id: 4, userId: 2, role: 'assistant', content: 'La photosynthèse transforme l\'énergie lumineuse en glucides...' },
  ];

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 7)]);
  };

  const executeQuery = (userId: 1 | 2) => {
    // Chercher un slot libre
    const freeSlotIndex = poolSlots.findIndex((s) => s.status === 'idle');

    if (freeSlotIndex === -1) {
      addLog(`[Pool] ⚠️ Pool saturé (4/4 occupés) ! Requête de l'Utilisateur ${userId} mise en file d'attente...`);
      return;
    }

    const slotId = poolSlots[freeSlotIndex].id;
    const queryStr = strictIsolation
      ? `SELECT * FROM messages WHERE user_id = ${userId} AND conversation_id = 101`
      : `SELECT * FROM messages WHERE conversation_id = 101 -- SANS FILTRE user_id !`;

    // Occupe le slot
    setPoolSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId
          ? { id: slot.id, status: 'busy', currentUser: `User ${userId}`, query: queryStr }
          : slot
      )
    );

    addLog(`[Pool] 🔌 Connexion #${slotId} allouée à Utilisateur ${userId}`);

    // Exécution de la requête
    setTimeout(() => {
      let results: MessageRecord[] = [];
      if (strictIsolation) {
        results = mockDatabase.filter((m) => m.userId === userId);
        addLog(`[SQL] ✅ Exécution isolée : ${results.length} message(s) propre(s) à User ${userId} retourné(s).`);
      } else {
        // Fuite transversale : retourne tout sans distinction
        results = mockDatabase;
        addLog(`[SQL] 🚨 VULNÉRABILITÉ : User ${userId} accède aux données confidentielles de tous les utilisateurs !`);
      }

      setRetrievedMessages(results);

      // Si leakMode = false, on libère la connexion proprement
      if (!leakMode) {
        setTimeout(() => {
          setPoolSlots((prev) =>
            prev.map((slot) =>
              slot.id === slotId ? { id: slot.id, status: 'idle' } : slot
            )
          );
          addLog(`[Pool] ♻️ Connexion #${slotId} relâchée dans le pool (connection.release()).`);
        }, 1200);
      } else {
        addLog(`[Pool:Leak] 💥 connection.release() oubliée ! La connexion #${slotId} reste bloquée à jamais.`);
      }
    }, 600);
  };

  const simulateBurst = () => {
    addLog(`[Traffic] 🚀 Lancement d'une salve de 6 requêtes simultanées...`);
    // Lancer 6 requêtes rapprochées
    [1, 2, 1, 2, 1, 2].forEach((uid, index) => {
      setTimeout(() => {
        executeQuery(uid as 1 | 2);
      }, index * 180);
    });
  };

  const resetPool = () => {
    setPoolSlots([
      { id: 1, status: 'idle' },
      { id: 2, status: 'idle' },
      { id: 3, status: 'idle' },
      { id: 4, status: 'idle' },
    ]);
    setLogs([]);
    setRetrievedMessages([]);
  };

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Pool MySQL &amp; Isolation Multi-Tenant
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Observez la gestion des slots de connexion du pool et l&apos;impact sécuritaire critique du filtrage par <code>user_id</code>.
          </p>
        </div>
        <button
          onClick={resetPool}
          className="self-start rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          Réinitialiser le Pool
        </button>
      </div>

      {/* Contrôles du banc d'essai */}
      <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg bg-slate-50 p-4 md:grid-cols-3 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            1. Utilisateur actif
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveUser(1)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeUser === 1
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              👤 User 1 (Entreprise)
            </button>
            <button
              onClick={() => setActiveUser(2)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeUser === 2
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              👤 User 2 (Visiteur)
            </button>
          </div>
        </div>

        <div>
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            2. Politique de sécurité
          </span>
          <button
            onClick={() => setStrictIsolation(!strictIsolation)}
            className={`w-full rounded-lg px-3 py-2 text-sm font-semibold transition flex items-center justify-center gap-2 ${
              strictIsolation
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-rose-600 text-white animate-pulse shadow'
            }`}
          >
            {strictIsolation ? '🛡️ Isolation stricte (user_id = ?)' : '⚠️ Omission WHERE user_id'}
          </button>
        </div>

        <div>
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            3. Simulation de fuite mémoire
          </span>
          <button
            onClick={() => setLeakMode(!leakMode)}
            className={`w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
              leakMode
                ? 'bg-amber-600 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {leakMode ? '🚨 Oubli de connection.release()' : '✅ Libération automatique (release)'}
          </button>
        </div>
      </div>

      {/* Déclenchement d'actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => executeQuery(activeUser)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          ▶ Exécuter requête (User {activeUser})
        </button>
        <button
          onClick={simulateBurst}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          ⚡ Salve de 6 requêtes concurrentes (Test de saturation)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Visualisation des 4 connexions du pool */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              🗄️ État du Pool MySQL (<code>connectionLimit: 4</code>)
            </span>
            <span className="text-sm text-slate-500">
              {poolSlots.filter((s) => s.status === 'busy').length}/4 en cours
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {poolSlots.map((slot) => (
              <div
                key={slot.id}
                className={`rounded-lg border p-3 transition ${
                  slot.status === 'idle'
                    ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20'
                    : 'border-amber-400 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Slot #{slot.id}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-sm font-semibold ${
                      slot.status === 'idle'
                        ? 'bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
                        : 'bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    }`}
                  >
                    {slot.status === 'idle' ? 'DISPONIBLE' : 'OCCUPÉ'}
                  </span>
                </div>
                {slot.status === 'busy' ? (
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <div className="font-semibold text-amber-700 dark:text-amber-400">{slot.currentUser}</div>
                    <div className="truncate font-mono text-slate-600 dark:text-slate-400">{slot.query}</div>
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 italic">Connexion prête dans le pool</div>
                )}
              </div>
            ))}
          </div>

          {/* Résultats de la requête reçus par l'utilisateur */}
          <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
            <span className="text-sm font-semibold text-slate-900 dark:text-white block mb-2">
              📥 Données renvoyées au client (User {activeUser}) :
            </span>
            {retrievedMessages.length === 0 ? (
              <div className="text-sm text-slate-500 italic">Aucune requête exécutée pour le moment.</div>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {retrievedMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`rounded p-2 text-sm border ${
                      msg.userId === activeUser
                        ? 'border-indigo-200 bg-indigo-50/50 dark:border-indigo-900 dark:bg-indigo-950/20'
                        : 'border-rose-400 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <div className="flex justify-between font-semibold">
                      <span>Propriétaire : User {msg.userId} ({msg.role})</span>
                      {msg.userId !== activeUser && <span className="font-bold text-rose-600">🚨 FUITE DE DONNÉES !</span>}
                    </div>
                    <p className="mt-1 font-mono">{msg.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Console d'audit serveur */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-sm font-semibold text-slate-400">
              Journal d&apos;activité MySQL (pool &amp; queries)
            </span>
          </div>

          <div className="flex-1 min-h-[220px] overflow-y-auto font-mono text-sm space-y-1.5 p-2 bg-slate-900/60 rounded">
            {logs.length === 0 ? (
              <p className="text-slate-500 italic">En attente de commandes...</p>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className={`${
                    log.includes('🚨') || log.includes('⚠️') || log.includes('💥')
                      ? 'text-rose-400 font-semibold'
                      : log.includes('✅') || log.includes('♻️')
                      ? 'text-emerald-400'
                      : 'text-indigo-300'
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>

          <div className="mt-3 rounded-md border border-slate-800 bg-slate-900/80 p-2.5 text-sm text-slate-300">
            <span className="font-semibold text-indigo-400">Règle d&apos;or de production :</span> Toujours envelopper vos requêtes SQL dans un bloc <code>try / finally</code> pour garantir l&apos;appel à <code>connection.release()</code> même en cas d&apos;exception.
          </div>
        </div>
      </div>
    </div>
  );
};

