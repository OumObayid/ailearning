'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { RealtimeProtocolsLab } from '@/components/interactive/RealtimeProtocolsLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 w-full max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words [overflow-wrap:anywhere] min-w-0">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Réseau, HTTP &amp; Protocoles</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 3 — WebSocket : Communication bidirectionnelle en temps réel
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base font-semibold text-slate-950">
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le modèle bidirectionnel (Full-Duplex) du protocole WebSocket.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Décortiquer la négociation initiale Handshake et le code HTTP 101 Switching Protocols.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer le standard WebSocket natif et la surcouche logicielle Socket.IO.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Créer un serveur WebSocket Node.js avec le paquet haute performance ws.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Implémenter un client React résilient gérant les états de connexion (readyState).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser la diffusion de messages (Broadcast) vers plusieurs clients connectés.</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que WebSocket ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que WebSocket et comment fonctionne le Handshake ?
        </h2>
        <p className="text-base text-slate-950 font-medium">
          <strong>WebSocket</strong> est un protocole réseau standardisé par l&apos;IETF (RFC 6455). Contrairement à HTTP qui fonctionne en requêtes/réponses isolées, WebSocket établit un canal <strong>bidirectionnel permanent</strong> (Full-Duplex) sur une unique connexion TCP.
        </p>

        <Callout type="warning" title="Sécurité en production : Protocole wss:// et contrôle d'origine">
          En environnement de production, utilisez exclusivement <code>wss://</code> (chiffrement TLS). Vérifiez systématiquement l&apos;en-tête <code>Origin</code> lors du Handshake pour empêcher les attaques de détournement de session inter-sites (CSWSH : <em>Cross-Site WebSocket Hijacking</em>).
        </Callout>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-4 min-w-0 max-w-full">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Les 3 étapes du Handshake HTTP 101</h3>
          <div className="space-y-3 text-sm min-w-0 max-w-full">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 min-w-0 max-w-full">
              <span className="font-black text-indigo-950 block text-xs sm:text-sm mb-2">
                1. Demande d&apos;élévation du client (HTTP Upgrade) :
              </span>
              <div className="rounded-xl bg-slate-950 p-3.5 font-mono text-xs text-indigo-300 space-y-1 break-words [overflow-wrap:anywhere] min-w-0 leading-relaxed">
                <div className="break-words">GET /chat HTTP/1.1</div>
                <div className="break-words">Host: localhost:3000</div>
                <div className="break-words">Upgrade: websocket</div>
                <div className="break-words">Connection: Upgrade</div>
                <div className="break-all text-indigo-200 font-semibold">Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==</div>
                <div className="break-words">Sec-WebSocket-Version: 13</div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 min-w-0 max-w-full">
              <span className="font-black text-emerald-950 block text-xs sm:text-sm mb-2">
                2. Accord du serveur Node.js (Statut 101) :
              </span>
              <div className="rounded-xl bg-slate-950 p-3.5 font-mono text-xs text-emerald-300 space-y-1 break-words [overflow-wrap:anywhere] min-w-0 leading-relaxed">
                <div className="break-words font-black text-emerald-400">HTTP/1.1 101 Switching Protocols</div>
                <div className="break-words">Upgrade: websocket</div>
                <div className="break-words">Connection: Upgrade</div>
                <div className="break-all text-emerald-200 font-semibold">Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=</div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 min-w-0 max-w-full">
              <span className="font-black text-sky-950 block text-xs sm:text-sm">3. Canal Full-Duplex actif :</span>
              <p className="mt-1 text-xs text-slate-800 leading-relaxed break-words">
                La connexion TCP reste ouverte indéfiniment. Chaque message n&apos;est plus encadré par 1 Ko d&apos;en-têtes HTTP, mais seulement par <strong>2 à 10 octets de framing</strong> binaire !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WebSocket vs Socket.IO */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. WebSocket natif vs Socket.IO : Quel choix opérer ?
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Fonctionnalité</th>
                <th className="p-3">WebSocket natif (ws)</th>
                <th className="p-3">Socket.IO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-bold">Nature</td>
                <td className="p-3">Protocole réseau officiel W3C / IETF</td>
                <td className="p-3">Bibliothèque JavaScript de haut niveau</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Poids &amp; Empreinte mémoire</td>
                <td className="p-3 font-black text-emerald-700">Ultra-léger, performances maximales</td>
                <td className="p-3">Plus volumineux (client + serveur)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Reconnexion automatique</td>
                <td className="p-3">ì coder manuellement côté client</td>
                <td className="p-3 font-black text-emerald-700">Intégrée nativement</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Salons virtuels (Rooms)</td>
                <td className="p-3">ì gérer soi-même avec des sets/maps</td>
                <td className="p-3 font-black text-emerald-700">Fournis d&apos;office (<code>socket.join()</code>)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Fallback Long-Polling</td>
                <td className="p-3">Non (échoue si WS bloqué par un proxy)</td>
                <td className="p-3 font-black text-emerald-700">Oui (bascule automatique)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Cas d'utilisation concrets avec les illustrations du cours */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Panorama des cas d&apos;utilisation idéaux
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Distinguez quand WebSocket est indispensable et quand une approche plus simple (comme le Polling ou SSE) est préférable :
        </p>

        <div className="space-y-6 my-6 min-w-0">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-4 break-words [overflow-wrap:anywhere] min-w-0">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src="/images/cours/backend-ia/module-3/use-case-gaming.jpg"
                alt="Jeu multijoueur nécessitant WebSocket"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h4 className="font-black text-slate-950 text-base sm:text-lg">1. Jeux &amp; Collaboration 3D</h4>
                <span className="inline-block self-start sm:self-auto rounded bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-900 border border-emerald-300">
                  WebSocket Indispensable
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Positions des joueurs, collisions et actions synchronisées à 60 Hz. WebSocket est obligatoire en raison de la latence inférieure à 15 ms.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-4 break-words [overflow-wrap:anywhere] min-w-0">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src="/images/cours/backend-ia/module-3/use-case-chat.jpg"
                alt="Messagerie instantanée de groupe"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h4 className="font-black text-slate-950 text-base sm:text-lg">2. Messagerie Instantanée</h4>
                <span className="inline-block self-start sm:self-auto rounded bg-sky-100 px-3 py-1 text-xs font-black text-sky-900 border border-sky-300">
                  WebSocket Très Adapté
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Envoi et réception instantanés entre plusieurs interlocuteurs connectés, indicateurs de saisie en direct et accusés de lecture.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-4 break-words [overflow-wrap:anywhere] min-w-0">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src="/images/cours/backend-ia/module-3/use-case-dashboard.jpg"
                alt="Tableau de bord de suivi de tâches et jobs"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h4 className="font-black text-slate-950 text-base sm:text-lg">3. Suivi de Jobs &amp; Tâches IA</h4>
                <span className="inline-block self-start sm:self-auto rounded bg-amber-100 px-3 py-1 text-xs font-black text-amber-900 border border-amber-300">
                  Polling ou SSE Suffisants
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Vérification ponctuelle de barres de progression ou de rapports en arrière-plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Laboratoire Interactif : Testez le duplex WebSocket
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Ouvrez l&apos;onglet <strong>&quot;WebSocket Duplex&quot;</strong> pour négocier la poignée de main et échanger des paquets sans interruption :
        </p>
        <RealtimeProtocolsLab />
      </section>

      {/* 6. Implémentation Backend Node.js avec ws et Broadcast */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Implémentation du Serveur WebSocket Node.js avec diffusion Broadcast
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Nous couplons le serveur HTTP Express avec l&apos;instance <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">WebSocket.Server</code> pour écouter sur le même port 3000 :
        </p>

        <CodeBlock
          language="javascript"
          filename="server-ws.js"
          code={`const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// Attacher le serveur WebSocket à l'instance HTTP
const wss = new WebSocket.Server({ server });

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

wss.on('connection', (socket, request) => {
  const clientIp = request.socket.remoteAddress;
  console.log(\`[WebSocket] Nouveau client connecté (\${clientIp})\`);

  // 1. Message de bienvenue envoyé uniquement au client connecté
  socket.send(JSON.stringify({
    type: 'system',
    text: 'Connexion WebSocket établie avec le serveur Node.js.',
    clientsCount: wss.clients.size,
  }));

  // 2. Réception d'un message entrant
  socket.on('message', (rawData) => {
    try {
      const payload = JSON.parse(rawData.toString());
      console.log('Message reçu :', payload);

      const broadcastMessage = JSON.stringify({
        type: 'chat',
        user: payload.user || 'Anonyme',
        text: payload.text,
        timestamp: new Date().toLocaleTimeString(),
      });

      // 3. DIFFUSION (Broadcast) à tous les clients connectés et ouverts
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          // On peut exclure l'émetteur avec (client !== socket)
          client.send(broadcastMessage);
        }
      });
    } catch (err) {
      console.error('Erreur parsing payload WS:', err.message);
    }
  });

  // 4. Déconnexion
  socket.on('close', (code, reason) => {
    console.log(\`[WebSocket] Client déconnecté (code \${code})\`);
  });

  // 5. Gestion des anomalies de socket
  socket.on('error', (err) => {
    console.error('[WebSocket] Erreur socket:', err.message);
  });
});

server.listen(3000, () => {
  console.log('Serveur HTTP + WebSocket à l\\'écoute sur http://localhost:3000');
});`}
        />
      </section>

      {/* 7. Implémentation Client React avec WebSocket natif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Composant Client React avec gestion des états readyState
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Constante</th>
                <th className="p-3">Valeur numérique</th>
                <th className="p-3">Signification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-mono font-bold">WebSocket.CONNECTING</td>
                <td className="p-3">0</td>
                <td className="p-3">La poignée de main Handshake HTTP est en cours.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-700">WebSocket.OPEN</td>
                <td className="p-3 text-emerald-700 font-bold">1</td>
                <td className="p-3 font-semibold text-emerald-900">La socket est prête à envoyer et recevoir des données.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">WebSocket.CLOSING</td>
                <td className="p-3">2</td>
                <td className="p-3">Fermeture ordonnée initiée (trame de clôture en vol).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-700">WebSocket.CLOSED</td>
                <td className="p-3 text-rose-700 font-bold">3</td>
                <td className="p-3">Connexion totalement terminée ou impossible à établir.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock
          language="tsx"
          filename="LiveChat.tsx"
          code={`import React, { useState, useEffect, useRef } from 'react';

export const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 1. Ouvrir la connexion vers le backend Node.js
    const ws = new WebSocket('ws://localhost:3000');
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('Connecté au serveur WebSocket !');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    ws.onclose = () => {
      console.log('Connexion WebSocket terminée.');
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error('Erreur sur le canal WebSocket:', err);
    };

    // 2. Nettoyage strict au démontage
    return () => {
      ws.close();
    };
  }, []);

  const handleSend = () => {
    if (!inputText.trim() || socketRef.current?.readyState !== WebSocket.OPEN) return;

    socketRef.current.send(JSON.stringify({
      user: 'Étudiant IA',
      text: inputText.trim(),
    }));

    setInputText('');
  };

  return (
    <div className="rounded-xl border p-5 bg-white space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <span className="font-black text-slate-950">Salon WebSocket</span>
        <span className={\`text-xs font-black px-2 py-0.5 rounded \${isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}\`}>
          {isConnected ? 'CONNECTÉ (OPEN)' : 'DÉCONNECTÉ'}
        </span>
      </div>

      <div className="h-48 overflow-y-auto rounded bg-slate-50 p-3 space-y-2 text-xs">
        {messages.map((m, i) => (
          <div key={i} className="p-2 rounded bg-white border">
            <strong className="text-indigo-900">{m.user || 'Système'} :</strong> {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Message à diffuser..."
          className="flex-1 rounded border p-2 text-sm text-slate-900"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} disabled={!isConnected} className="bg-slate-950 text-white px-4 py-2 rounded font-bold">
          Envoyer
        </button>
      </div>
    </div>
  );
};`}
        />
      </section>

      {/* 8. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Salle de discussion multi-utilisateurs avec WebSocket"
        objective="Construire un serveur de messagerie avec Express et ws, tester la synchronisation instantanée entre 2 onglets de navigation et gérer la déconnexion gracieuse."
        steps={[
          "Créer le serveur Node.js en combinant http.createServer(app) et new WebSocket.Server({ server }).",
          "Mettre en place la boucle wss.clients.forEach pour retransmettre chaque message à tous les clients.",
          "Ouvrir deux fenêtres de navigateur distinctes pointant vers le composant React.",
          "Vérifier qu'un message saisi dans la fenêtre A s'affiche instantanément dans la fenêtre B sans aucune latence.",
        ]}
      />

      {/* 9. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Protocole WebSocket"
          questions={[
            {
              id: 1,
              question: "Quel code de statut HTTP indique que le serveur valide le Handshake et bascule vers le protocole WebSocket ?",
              options: [
                "200 OK",
                "101 Switching Protocols",
                "204 No Content",
                "301 Moved Permanently",
              ],
              correctIndex: 1,
              explanation: "Le code 101 Switching Protocols est la réponse conventionnelle du serveur acceptant de transformer la connexion HTTP en liaison WebSocket persistante.",
            },
            {
              id: 2,
              question: "Quelle valeur de readyState garantit que le client peut émettre un message avec socket.send() sans déclencher d'exception ?",
              options: [
                "WebSocket.CONNECTING (0)",
                "WebSocket.OPEN (1)",
                "WebSocket.CLOSING (2)",
                "WebSocket.CLOSED (3)",
              ],
              correctIndex: 1,
              explanation: "La méthode send() nécessite impérativement un état OPEN (valeur 1). Appeler send() sur un socket CLOSED ou CONNECTING provoque une erreur.",
            },
            {
              id: 3,
              question: "Quelle est la principale différence architecturale entre WebSocket et le Polling ?",
              options: [
                "WebSocket permet au serveur d'envoyer spontanément des messages au client sur une connexion ouverte permanente",
                "WebSocket nécessite obligatoirement une base de données relationnelle",
                "Le Polling est plus rapide que WebSocket pour les jeux d'action 3D",
                "WebSocket ne fonctionne pas en JavaScript",
              ],
              correctIndex: 0,
              explanation: "WebSocket maintient une connexion full-duplex où les deux parties peuvent émettre à n'importe quel instant, sans attendre de requête préalable.",
            },
            {
              id: 4,
              question: "Que représente wss:// par rapport à ws:// ?",
              options: [
                "Une version chiffrée avec le protocole TLS (sécurisée de la même manière que HTTPS par rapport à HTTP)",
                "Une version fonctionnant uniquement sous Windows",
                "Un protocole sans fil réservé au Wi-Fi",
                "Un framework frontend pour React",
              ],
              correctIndex: 0,
              explanation: "wss:// (WebSocket Secure) encaspule les trames WebSocket dans un tunnel de chiffrement TLS, protégeant l'intégrité et la confidentialité des échanges.",
            },
            {
              id: 5,
              question: "Pourquoi Socket.IO ne peut-il pas communiquer directement avec un serveur WebSocket natif 'ws' pur sans adaptation ?",
              options: [
                "Parce que Socket.IO ajoute son propre protocole applicatif et d'encapsulation de paquets (Engine.IO) au-dessus de la couche de transport",
                "Parce que Socket.IO est écrit en Python",
                "Car le port 3000 est interdit pour Socket.IO",
                "Parce que React refuse de charger des sockets natifs",
              ],
              correctIndex: 0,
              explanation: "Socket.IO utilise sa propre spécification de messages (Engine.IO / Socket.IO protocol) incluant identifiants, types d'événements et acquittements, ce qui le rend incompatible avec un flux WebSocket brut non parsé.",
            },
          ]}
        />
      </section>

      {/* 10. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Checklist de validation des compétences
        </h2>
        <InteractiveChecklist
          title="Compétences validées pour le Chapitre 3"
          items={[
            "Je comprends le fonctionnement du Handshake HTTP Upgrade 101.",
            "Je sais monter un serveur WebSocket avec le paquet ws et le greffer sur une application Express.",
            "Je maîtrise la diffusion de messages (Broadcast) en vérifiant l'état readyState === WebSocket.OPEN.",
            "Je sais concevoir un hook ou composant React qui écoute onmessage et libère la connexion avec close().",
            "Je sais choisir entre WebSocket natif (légèreté) et Socket.IO (fonctionnalités avancées).",
          ]}
        />
      </section>
    </div>
  );
};

