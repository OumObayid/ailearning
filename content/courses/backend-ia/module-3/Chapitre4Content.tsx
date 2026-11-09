'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { RealtimeProtocolsLab } from '@/components/interactive/RealtimeProtocolsLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — SSE (Server-Sent Events) —— Communication en flux continu
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
            <span>Comprendre le modèle unidirectionnel (Serveur → Client) de SSE.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser les en-têtes HTTP clés : text/event-stream, no-cache et keep-alive.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Différencier l&apos;écriture partielle avec res.write() et la clôture avec res.end().</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Consommer un flux SSE avec l&apos;API native EventSource (requêtes GET).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Consommer un flux SSE sur une requête POST avec fetch(), ReadableStream et TextDecoder.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Gérer le découpage de fragments (chunks) et le tampon de reconstitution des lignes.</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que SSE ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que SSE (Server-Sent Events) ?
        </h2>
        <p className="text-base text-slate-950 font-medium">
          <strong>Server-Sent Events (SSE)</strong> est une norme W3C permettant au serveur de pousser des messages textuels vers le client à travers une simple requête HTTP maintenue ouverte.
        </p>

        <Callout type="info" title="Pourquoi SSE est parfait pour l'IA générative">
          Lorsqu&apos;un utilisateur pose une question à un LLM (comme Gemini), l&apos;échange suit un schéma simple : le client envoie un prompt une seule fois, puis le modèle émet une série continue de tokens. Établir un WebSocket complet (avec ping/pong, heartbeat et framing binaire) est surdimensionné. SSE résout ce besoin avec une élégance et une légèreté incomparables.
        </Callout>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Format textuel normalisé d&apos;un événement SSE</h3>
          <p className="text-sm font-semibold text-slate-800">
            Chaque bloc SSE est constitué de clés suivies de deux-points, et se conclut <strong>obligatoirement par un double saut de ligne (\n\n)</strong> :
          </p>
          <pre className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-300 leading-relaxed">
{`id: 101
event: token
data: {"text": "Node.js"}

id: 102
event: token
data: {"text": " est un environnement"}

event: completed
data: {"finishReason": "STOP"}`}
          </pre>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs">
            <div className="rounded border bg-slate-50 p-2"><strong className="text-indigo-900">data :</strong> Données utiles (texte ou JSON).</div>
            <div className="rounded border bg-slate-50 p-2"><strong className="text-indigo-900">event :</strong> Nom de l&apos;événement personnalisé.</div>
            <div className="rounded border bg-slate-50 p-2"><strong className="text-indigo-900">id :</strong> Identifiant pour la reprise sur déconnexion.</div>
            <div className="rounded border bg-slate-50 p-2"><strong className="text-indigo-900">retry :</strong> Délai de reconnexion en ms en cas de coupure.</div>
          </div>
        </div>
      </section>

      {/* 3. Comparatif : Polling vs SSE vs WebSocket */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Matrice de décision : Polling vs SSE vs WebSocket
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Critère</th>
                <th className="p-3">Polling</th>
                <th className="p-3">SSE (Server-Sent Events)</th>
                <th className="p-3">WebSocket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-bold">Direction du flux</td>
                <td className="p-3">Client → Serveur (requêtes)</td>
                <td className="p-3 font-black text-indigo-700">Serveur → Client (unidirectionnel)</td>
                <td className="p-3 font-black text-emerald-700">Bidirectionnel (Full-Duplex)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Protocole de transport</td>
                <td className="p-3">HTTP standard</td>
                <td className="p-3">HTTP standard (text/event-stream)</td>
                <td className="p-3">Protocole WebSocket (ws:// ou wss://)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Compatibilité proxies &amp; firewalls</td>
                <td className="p-3 font-bold text-emerald-700">Excellente (port 80/443 standard)</td>
                <td className="p-3 font-bold text-emerald-700">Excellente (traverse les proxies HTTP/2)</td>
                <td className="p-3 text-amber-700">Parfois bloqué par des proxies d&apos;entreprise</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Reconnexion automatique</td>
                <td className="p-3">Manuelle (dans le code)</td>
                <td className="p-3 font-bold text-emerald-700">Native par le navigateur (EventSource)</td>
                <td className="p-3">Manuelle en natif</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Cas d&apos;usage d&apos;élection</td>
                <td className="p-3">Vérification de jobs de plusieurs heures</td>
                <td className="p-3 font-bold text-indigo-900">Streaming LLM, notifications, flux boursier</td>
                <td className="p-3 font-bold text-emerald-900">Jeux multijoueurs, tableaux blancs partagés</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Expérimentation dans le Laboratoire Interactif
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Sélectionnez l&apos;onglet <strong>&quot;SSE &amp; Streaming IA&quot;</strong> pour visualiser la désérialisation progressive des tokens et mesurer le débit de transmission :
        </p>
        <RealtimeProtocolsLab />
      </section>

      {/* 5. Implémentation Backend Express */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation Backend : Créer un flux SSE avec Express
        </h2>
        <p className="text-base text-slate-950 font-medium">
          La mécanique repose sur trois directives cruciales : déclarer <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">text/event-stream</code>, envoyer immédiatement les en-têtes avec <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">res.flushHeaders()</code> et écrire avec <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">res.write()</code> :
        </p>

        <CodeBlock
          language="javascript"
          filename="server-sse.js"
          code={`const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint SSE en GET (compatible EventSource)
app.get('/api/stream-clock', (req, res) => {
  // 1. Déclarer les en-têtes SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Désactive le tampon Nginx

  // 2. Envoyer immédiatement les en-têtes
  res.flushHeaders();

  console.log('[SSE] Client connecté au flux');

  let tick = 0;
  const interval = setInterval(() => {
    tick++;

    // Format strict : 'data: ...\\n\\n'
    const payload = JSON.stringify({ tick, time: new Date().toLocaleTimeString() });
    res.write(\`data: \${payload}\\n\\n\`);

    if (tick >= 10) {
      clearInterval(interval);
      res.write('event: done\\ndata: "Fin du flux"\\n\\n');
      res.end(); // Fermeture du flux
    }
  }, 1000);

  // 3. Détecter l'abandon du client pour libérer l'intervalle et la RAM
  req.on('close', () => {
    clearInterval(interval);
    console.log('[SSE] Client déconnecté, intervalle nettoyé.');
  });
});

app.listen(3000, () => console.log('Serveur SSE sur http://localhost:3000'));`}
        />
      </section>

      {/* 6. Consommation React : EventSource vs fetch() */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Consommation côté React : EventSource (GET) vs fetch() (POST)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="font-black text-indigo-950 text-sm">Approche A : EventSource natif (GET)</h4>
            <p className="mt-1 text-xs text-slate-800 leading-relaxed">
              Ultra simple, gère la reconnexion tout seul. Mais <strong>impossible d&apos;envoyer un corps JSON en POST</strong> ni d&apos;ajouter un header <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">Authorization: Bearer</code> personnalisé.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="font-black text-indigo-950 text-sm">Approche B : fetch() + ReadableStream (POST)</h4>
            <p className="mt-1 text-xs text-slate-800 leading-relaxed">
              C&apos;est la norme absolue pour l&apos;IA ! Permet d&apos;envoyer le prompt dans le corps POST, d&apos;authentifier la requête et de décoder le flux avec <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">response.body.getReader()</code>.
            </p>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          filename="StreamReader.tsx"
          code={`import React, { useState } from 'react';

export const StreamReader: React.FC = () => {
  const [output, setOutput] = useState('');
  const [isReading, setIsReading] = useState(false);

  const startStreaming = async () => {
    setOutput('');
    setIsReading(true);

    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'Pourquoi Node.js est si rapide ?' }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Flux indisponible');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // Décoder les octets reçus
        buffer += decoder.decode(value, { stream: true });

        // Découper sur les délimiteurs SSE '\\n\\n'
        const parts = buffer.split('\\n\\n');
        // Le dernier élément peut être incomplet : on le conserve dans buffer
        buffer = parts.pop() || '';

        for (const part of parts) {
          const lines = part.split('\\n');
          for (const line of lines) {
            if (line.startsWith('data:')) {
              const dataText = line.slice(5).trim();
              if (dataText) {
                const parsed = JSON.parse(dataText);
                setOutput((prev) => prev + (parsed.text || ''));
              }
            }
          }
        }
      }
    } catch (err: any) {
      console.error('Erreur lecture stream:', err);
    } finally {
      setIsReading(false);
    }
  };

  return (
    <div className="rounded-xl border p-5 bg-white space-y-4">
      <button
        onClick={startStreaming}
        disabled={isReading}
        className="rounded bg-indigo-600 px-4 py-2 font-bold text-white disabled:bg-slate-300"
      >
        {isReading ? 'Réception en cours...' : 'Lancer la lecture de flux'}
      </button>

      <div className="min-h-24 rounded bg-slate-950 p-4 font-mono text-sm text-emerald-400 whitespace-pre-wrap">
        {output || 'En attente de données...'}
      </div>
    </div>
  );
};`}
        />
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Serveur SSE de progression d'entraînement IA"
        objective="Concevoir une route SSE émettant des pourcentages d'avancement d'un job de Machine Learning (0% à 100%) et les afficher dans une jauge React fluide."
        steps={[
          "Créer la route Express GET /api/training-progress avec les headers text/event-stream.",
          "Émettre un événement nommé 'epoch' toutes les 800 ms contenant { epoch: i, loss: 0.42 - i * 0.03 }.",
          "Côté React, écouter avec new EventSource('/api/training-progress') et addEventListener('epoch').",
          "Mettre à jour une barre de progression dynamique et clore la connexion dès réception de 'done'.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Server-Sent Events"
          questions={[
            {
              id: 1,
              question: "Quel en-tête Content-Type signale au navigateur que la réponse est un flux Server-Sent Events ?",
              options: [
                "text/event-stream",
                "application/json",
                "multipart/form-data",
                "application/x-stream",
              ],
              correctIndex: 0,
              explanation: "Le standard SSE exige obligatoirement l'en-tête 'Content-Type: text/event-stream'.",
            },
            {
              id: 2,
              question: "Quelle méthode Node.js Express permet d'envoyer un morceau de données sur le flux sans clôturer la réponse HTTP ?",
              options: [
                "res.write()",
                "res.json()",
                "res.send()",
                "res.end()",
              ],
              correctIndex: 0,
              explanation: "res.write() écrit sur le flux de sortie TCP sans envoyer de bit de fin de flux (FIN), maintenant la connexion ouverte pour les événements suivants.",
            },
            {
              id: 3,
              question: "Quelle séquence de caractères marque obligatoirement la fin d'un bloc d'événement SSE selon la spécification ?",
              options: [
                "Une double fin de ligne (\\n\\n)",
                "Un point-virgule (;)",
                "La chaîne 'EOF'",
                "Une balise XML </event>",
              ],
              correctIndex: 0,
              explanation: "La spécification W3C impose qu'un événement complet se termine par deux sauts de ligne consécutifs (\\n\\n).",
            },
            {
              id: 4,
              question: "Pourquoi l'API native EventSource est-elle parfois remplacée par fetch() dans les applications d'IA ?",
              options: [
                "Car EventSource ne supporte que la méthode GET et ne permet pas d'envoyer un corps JSON en POST",
                "Car EventSource est payant",
                "Car EventSource ne fonctionne pas sur Chrome",
                "Car EventSource est limité à 256 octets",
              ],
              correctIndex: 0,
              explanation: "EventSource ne permet pas de configurer un verbe POST ni d'attacher un body JSON complexe contenant le prompt et les paramètres d'inférence.",
            },
            {
              id: 5,
              question: "Pourquoi conserve-t-on le dernier élément de buffer.split('\\n\\n') dans une variable tampon ?",
              options: [
                "Car un paquet réseau (chunk) TCP peut être fragmenté au milieu d'un événement SSE",
                "Pour calculer une clé de hachage SHA-256",
                "Pour inverser l'ordre des caractères",
                "Pour chiffrer la connexion avec TLS",
              ],
              correctIndex: 0,
              explanation: "La couche réseau TCP transmet des paquets d'octets de taille variable. Un chunk peut s'arrêter au milieu d'un mot ou d'une clé JSON. Conserver le reliquat garantit de reconstituer des messages entiers valides.",
            },
          ]}
        />
      </section>

      {/* 9. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Checklist de validation des compétences
        </h2>
        <InteractiveChecklist
          title="Compétences validées pour le Chapitre 4"
          items={[
            "Je maîtrise la syntaxe d'un message SSE (data, event, id et double saut de ligne \\n\\n).",
            "Je sais configurer res.setHeader('Content-Type', 'text/event-stream') et res.flushHeaders() dans Express.",
            "Je gère systématiquement l'événement req.on('close') pour annuler les traitements en cours.",
            "Je sais décoder un flux POST avec response.body.getReader() et TextDecoder.",
            "Je comprends le fonctionnement du tampon de reconstitution des chunks incomplets.",
          ]}
        />
      </section>
    </div>
  );
};

