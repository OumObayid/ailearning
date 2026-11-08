'use client';

import React, { useState } from 'react';

type UserRole = 'guest' | 'editor' | 'admin';

interface EndpointTest {
  method: 'GET' | 'POST' | 'DELETE';
  path: string;
  label: string;
  requiredPermission: string;
}

const ENDPOINTS: EndpointTest[] = [
  {
    method: 'POST',
    path: '/api/chat',
    label: 'Poser une question à l\'assistant RAG',
    requiredPermission: 'CHAT_USE',
  },
  {
    method: 'POST',
    path: '/api/documents/upload',
    label: 'Téléverser et indexer un PDF dans Qdrant',
    requiredPermission: 'DOCUMENTS_WRITE',
  },
  {
    method: 'POST',
    path: '/api/admin/reindex',
    label: 'Déclencher la réindexation globale Qdrant',
    requiredPermission: 'ADMIN_REINDEX',
  },
  {
    method: 'DELETE',
    path: '/api/users/84',
    label: 'Supprimer un compte utilisateur',
    requiredPermission: 'USERS_DELETE',
  },
];

export const RBACPermissionMatrixLab: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('editor');
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [isSignatureCorrupt, setIsSignatureCorrupt] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{
    httpCode: number;
    statusText: string;
    message: string;
    allowed: boolean;
  } | null>(null);

  const rolePermissions: Record<UserRole, string[]> = {
    guest: ['CHAT_USE'],
    editor: ['CHAT_USE', 'DOCUMENTS_WRITE'],
    admin: ['CHAT_USE', 'DOCUMENTS_WRITE', 'ADMIN_REINDEX', 'USERS_DELETE'],
  };

  const handleTestEndpoint = (endpoint: EndpointTest) => {
    // 1. Contrôle d'expiration
    if (isTokenExpired) {
      setTestResult({
        httpCode: 401,
        statusText: 'Unauthorized',
        message: 'TokenExpiredError: Le jeton JWT a expiré il y a 14 minutes. Veuillez vous réauthentifier.',
        allowed: false,
      });
      return;
    }

    // 2. Contrôle de signature
    if (isSignatureCorrupt) {
      setTestResult({
        httpCode: 401,
        statusText: 'Unauthorized',
        message: 'JsonWebTokenError: Signature JWT invalide (invalid signature). La clé secrète ne correspond pas.',
        allowed: false,
      });
      return;
    }

    // 3. Contrôle RBAC des privilèges
    const permissions = rolePermissions[selectedRole];
    const hasPermission = permissions.includes(endpoint.requiredPermission);

    if (hasPermission) {
      setTestResult({
        httpCode: 200,
        statusText: 'OK',
        message: `Accès autorisé : Le rôle '${selectedRole}' détient le privilège '${endpoint.requiredPermission}'. Requête exécutée avec succès.`,
        allowed: true,
      });
    } else {
      setTestResult({
        httpCode: 403,
        statusText: 'Forbidden',
        message: `Refus d'autorisation : Le rôle '${selectedRole}' n'a pas le privilège requis '${endpoint.requiredPermission}' pour accéder à ${endpoint.path}.`,
        allowed: false,
      });
    }
  };

  const simulatedJwt = {
    header: { alg: 'HS256', typ: 'JWT' },
    payload: {
      sub: selectedRole === 'admin' ? 1 : selectedRole === 'editor' ? 42 : 108,
      email: `${selectedRole}@enterprise.com`,
      role: selectedRole,
      permissions: rolePermissions[selectedRole],
      iat: 1774900000,
      exp: isTokenExpired ? 1774900100 : 1774936000,
    },
  };

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Matrice RBAC &amp; Validation de Jetons JWT
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Basculez entre différents profils d&apos;utilisateurs et testez les accès protégés sur l&apos;API Express.
          </p>
        </div>
      </div>

      {/* Sélection de l'identité active */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { role: 'guest' as UserRole, label: '👤 Invité (guest)', desc: 'Accès consultation chat uniquement' },
          { role: 'editor' as UserRole, label: '✍️ Éditeur Métier (editor)', desc: 'Indexation & téléversement documentaire' },
          { role: 'admin' as UserRole, label: '👑 Administrateur (admin)', desc: 'Droits complets (purges, gestion comptes)' },
        ].map((item) => (
          <button
            key={item.role}
            onClick={() => {
              setSelectedRole(item.role);
              setTestResult(null);
            }}
            className={`rounded-lg border p-3.5 text-left transition ${
              selectedRole === item.role
                ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-white ring-2 ring-indigo-500 shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
            }`}
          >
            <div className="font-bold text-sm">{item.label}</div>
            <div className="text-sm text-slate-500 mt-0.5">{item.desc}</div>
          </button>
        ))}
      </div>

      {/* Toggles d'anomalies de jeton */}
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Simuler anomalies de sécurité :
        </span>

        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={isTokenExpired}
            onChange={(e) => {
              setIsTokenExpired(e.target.checked);
              setTestResult(null);
            }}
            className="rounded text-rose-600 focus:ring-rose-500"
          />
          Jeton JWT expiré (TokenExpiredError)
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={isSignatureCorrupt}
            onChange={(e) => {
              setIsSignatureCorrupt(e.target.checked);
              setTestResult(null);
            }}
            className="rounded text-rose-600 focus:ring-rose-500"
          />
          Signature HMAC corrompue (401 Unauthorized)
        </label>
      </div>

      {/* Matrice de test des endpoints */}
      <div className="mb-6">
        <span className="font-bold text-sm text-slate-900 dark:text-white block mb-2">
          Cliquez sur une route pour déclencher le middleware de contrôle d&apos;accès :
        </span>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {ENDPOINTS.map((ep, idx) => (
            <button
              key={idx}
              onClick={() => handleTestEndpoint(ep)}
              className="rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-600"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {ep.method} {ep.path}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-sm font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {ep.requiredPermission}
                </span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {ep.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Charge utile JWT décodée & Résultat du test */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* JWT Décodé */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Charge utile JWT transmise (Authorization: Bearer ...)
            </span>
            <span className="text-sm font-mono text-emerald-600 font-semibold">
              alg: HS256
            </span>
          </div>

          <pre className="rounded bg-slate-950 p-3 font-mono text-sm text-indigo-300 overflow-x-auto">
            {JSON.stringify(simulatedJwt.payload, null, 2)}
          </pre>
        </div>

        {/* Verdict du middleware Express */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-sm font-semibold text-slate-300">
              Verdict du Middleware <code>requirePermission()</code>
            </span>
            {testResult && (
              <span
                className={`rounded px-2 py-0.5 text-sm font-bold ${
                  testResult.allowed
                    ? 'bg-emerald-950 text-emerald-400'
                    : 'bg-rose-950 text-rose-400'
                }`}
              >
                HTTP {testResult.httpCode} {testResult.statusText}
              </span>
            )}
          </div>

          <div className="flex-1 min-h-[140px] flex items-center justify-center p-3 font-mono text-sm">
            {testResult ? (
              <div
                className={`w-full rounded p-3 text-sm leading-relaxed ${
                  testResult.allowed
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900'
                    : 'bg-rose-950/40 text-rose-300 border border-rose-900'
                }`}
              >
                {testResult.message}
              </div>
            ) : (
              <span className="text-slate-500 italic">
                Sélectionnez une route ci-dessus pour observer le verdict de sécurité.
              </span>
            )}
          </div>

          <div className="mt-2 text-sm text-slate-400 border-t border-slate-800 pt-2">
            💡 En production, les privilèges sont dérivés du rôle utilisateur et vérifiés en mémoire sans recalcul SQL coûteux.
          </div>
        </div>
      </div>
    </div>
  );
};

