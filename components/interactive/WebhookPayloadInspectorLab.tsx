'use client';

import React, { useState } from 'react';

export const WebhookPayloadInspectorLab: React.FC = () => {
  const [httpMethod, setHttpMethod] = useState<'POST' | 'GET'>('POST');
  const [webhookSecret] = useState<string>('sec_prod_98741abcdef');
  const [clientSecretInput, setClientSecretInput] = useState<string>('sec_prod_98741abcdef');
  const [responseMode, setResponseMode] = useState<'immediate' | 'last_node'>('immediate');
  const [requestPayload, setRequestPayload] = useState<string>(
    JSON.stringify(
      {
        event: 'order.created',
        orderId: 'CMD-9941',
        customer: {
          name: 'Alice Dubois',
          email: 'alice@example.com',
        },
        amount: 89.5,
      },
      null,
      2
    )
  );

  const [responseLog, setResponseLog] = useState<{
    httpCode: number;
    body: Record<string, unknown>;
    n8nContext?: {
      itemCount: number;
      jsonStructure: Record<string, unknown>;
    };
  } | null>(null);

  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSendWebhook = () => {
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);

      // Vérification de sécurité de l'en-tête X-Webhook-Secret
      if (clientSecretInput !== webhookSecret) {
        setResponseLog({
          httpCode: 403,
          body: {
            error: 'Forbidden',
            message: 'Rejet du webhook : En-tête X-Webhook-Secret invalide ou absent.',
          },
        });
        return;
      }

      let parsedBody: Record<string, unknown> = {};
      try {
        parsedBody = JSON.parse(requestPayload);
      } catch {
        parsedBody = { raw: requestPayload };
      }

      if (responseMode === 'immediate') {
        setResponseLog({
          httpCode: 200,
          body: {
            message: 'Workflow was started',
            executionId: 'exec_749104',
          },
          n8nContext: {
            itemCount: 1,
            jsonStructure: {
              headers: {
                'x-webhook-secret': '***' + clientSecretInput.slice(-4),
                'content-type': 'application/json',
              },
              params: {},
              query: {},
              body: parsedBody,
            },
          },
        });
      } else {
        // Mode 'last_node'
        setResponseLog({
          httpCode: 200,
          body: {
            success: true,
            status: 'processed',
            orderId: (parsedBody.orderId as string) || 'CMD-9941',
            invoiceGenerated: true,
          },
          n8nContext: {
            itemCount: 1,
            jsonStructure: {
              body: parsedBody,
            },
          },
        });
      }
    }, 450);
  };

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            🧪 Laboratoire Interactif : Banc d&apos;Essai Webhook n8n &amp; Authentification
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Simulez l&apos;émission de requêtes HTTP vers un déclencheur Webhook n8n et observez la transformation en tableau d&apos;items <code>$json</code>.
          </p>
        </div>
      </div>

      {/* Configuration du Webhook */}
      <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg bg-slate-50 p-4 md:grid-cols-3 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Méthode HTTP
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setHttpMethod('POST')}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
                httpMethod === 'POST'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              POST (Payload JSON)
            </button>
            <button
              onClick={() => setHttpMethod('GET')}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
                httpMethod === 'GET'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              GET (Query params)
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Mode de Réponse (Respond Mode)
          </label>
          <select
            value={responseMode}
            onChange={(e) => setResponseMode(e.target.value as 'immediate' | 'last_node')}
            className="w-full rounded-md border border-slate-300 bg-white p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="immediate">Immediately (HTTP 200/202 asynchrone)</option>
            <option value="last_node">When Last Node Finishes (Synchrone)</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              En-tête X-Webhook-Secret
            </label>
            <button
              onClick={() => setClientSecretInput(clientSecretInput === webhookSecret ? 'secret_corrompu_faux' : webhookSecret)}
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {clientSecretInput === webhookSecret ? 'Simuler secret invalide' : 'Restaurer secret valide'}
            </button>
          </div>
          <input
            type="text"
            value={clientSecretInput}
            onChange={(e) => setClientSecretInput(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Édition du corps JSON */}
      <div className="mb-6">
        <label className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Corps de la requête HTTP émise (JSON Payload) :
        </label>
        <textarea
          rows={5}
          value={requestPayload}
          onChange={(e) => setRequestPayload(e.target.value)}
          className="w-full rounded-md border border-slate-300 p-3 font-mono text-sm text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        />
      </div>

      <div className="mb-6">
        <button
          onClick={handleSendWebhook}
          disabled={isSending}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSending ? 'Transmission...' : '🚀 Envoyer la requête au Webhook n8n'}
        </button>
      </div>

      {/* Résultats et transformation dans n8n */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Réponse HTTP retournée à l'émetteur */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Réponse HTTP reçue par le client
            </span>
            {responseLog && (
              <span
                className={`rounded px-2 py-0.5 text-sm font-bold ${
                  responseLog.httpCode === 200
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400'
                }`}
              >
                HTTP {responseLog.httpCode}
              </span>
            )}
          </div>

          {responseLog ? (
            <pre className="rounded bg-slate-950 p-3 font-mono text-sm text-emerald-400 overflow-x-auto">
              {JSON.stringify(responseLog.body, null, 2)}
            </pre>
          ) : (
            <div className="text-sm text-slate-500 italic py-6 text-center">
              Cliquez sur le bouton ci-dessus pour envoyer le webhook.
            </div>
          )}
        </div>

        {/* Structure injectée dans le workflow n8n */}
        <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 p-4 text-slate-200">
          <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-sm font-semibold text-slate-300">
              Données injectées dans le nœud n8n (<code>$json</code>)
            </span>
            {responseLog?.n8nContext && (
              <span className="text-sm font-mono text-indigo-400">
                Item [0] sur {responseLog.n8nContext.itemCount}
              </span>
            )}
          </div>

          <div className="flex-1 min-h-[140px] font-mono text-sm p-2 bg-slate-900/60 rounded overflow-x-auto">
            {responseLog?.n8nContext ? (
              <pre className="text-indigo-300">
                {JSON.stringify(responseLog.n8nContext.jsonStructure, null, 2)}
              </pre>
            ) : responseLog?.httpCode === 403 ? (
              <div className="text-rose-400 font-semibold p-4 text-center">
                🛑 Le webhook a été rejeté à la frontière réseau. Le workflow ne s&apos;est jamais déclenché.
              </div>
            ) : (
              <div className="text-slate-500 italic py-6 text-center">
                En attente d&apos;amorce...
              </div>
            )}
          </div>

          <div className="mt-3 rounded-md border border-slate-800 bg-slate-900/80 p-2 text-sm text-slate-300">
            <span className="font-semibold text-indigo-400">Syntaxe d&apos;accès n8n :</span> Les nœuds suivants accèdent directement au client avec l&apos;expression <code>{`{{ $json.body.customer.email }}`}</code>.
          </div>
        </div>
      </div>
    </div>
  );
};
