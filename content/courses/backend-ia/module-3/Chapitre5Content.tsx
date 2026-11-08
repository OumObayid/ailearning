'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { RealtimeProtocolsLab } from '@/components/interactive/RealtimeProtocolsLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Streaming des réponses IA vers React avec Gemini
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
            <span>Comprendre les gains d&apos;UX majeurs apportés par le streaming (Time to First Token).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Configurer le SDK Google GenAI avec l&apos;option stream: true et le modèle gemini-2.5-flash.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Parcourir le flux asynchrone avec for await...of et filtrer les step.delta.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Retransmettre chaque fragment vers le client React via des événements SSE tokenisés.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Implémenter un bouton d&apos;arrêt immédiat avec l&apos;API standard AbortController.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Sécuriser rigoureusement les variables d&apos;environnement et contourner les tampons de proxy (X-Accel-Buffering).</span>
          </li>
        </ul>
      </section>

      {/* 2. Le problème : Temps d'attente sans streaming vs UX fluide avec streaming */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Pourquoi le streaming est indispensable pour l&apos;IA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5">
            <h4 className="font-black text-rose-950 text-base flex items-center gap-2">
              <Icon name="x-circle" className="w-5 h-5 text-rose-600" />
              Sans Streaming (Requête synchrone bloquante)
            </h4>
            <p className="mt-2 text-xs font-semibold text-slate-800 leading-relaxed">
              Pour un texte de 500 mots, Gemini peut mettre 6 à 10 secondes à terminer son raisonnement complet. L&apos;utilisateur fait face à un spinner immobile pendant 10 secondes. La latence perçue est catastrophique.
            </p>
            <div className="mt-3 rounded bg-white p-2.5 font-mono text-[11px] text-slate-700 border border-rose-200">
              TTFT (Time To First Token) : <strong>8 500 ms</strong> �xܴ
            </div>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5">
            <h4 className="font-black text-emerald-950 text-base flex items-center gap-2">
              <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
              Avec Streaming (SSE token par token)
            </h4>
            <p className="mt-2 text-xs font-semibold text-slate-800 leading-relaxed">
              Dès que Gemini a produit les 3 premiers mots (au bout de 400 ms), le backend les relaie immédiatement à React qui commence à les afficher à l&apos;écran comme une machine à écrire.
            </p>
            <div className="mt-3 rounded bg-white p-2.5 font-mono text-[11px] text-emerald-800 border border-emerald-200">
              TTFT (Time To First Token) : <strong>~350 ms</strong> �a�
            </div>
          </div>
        </div>

        <Callout type="tip" title="Bénéfice psychologique de l'UX progressive">
          L&apos;affichage mot par mot réduit le taux d&apos;abandon de plus de 70% sur les interfaces d&apos;agents conversationnels. L&apos;attention de l&apos;utilisateur est captée dès le premier token sans qu&apos;il ne perçoive la durée totale de génération.
        </Callout>
      </section>

      {/* 3. Schéma du double pipeline de streaming */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Architecture : Le double flux successif
        </h2>
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm font-semibold text-slate-800">
            Une incompréhension fréquente consiste à croire que le navigateur communique directement avec Gemini. Dans une architecture professionnelle, Node.js sert de passerelle d&apos;orchestration et de sécurité :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/60 p-4">
              <span className="text-xs font-black uppercase text-indigo-900">1. Client React</span>
              <p className="mt-1 text-sm font-bold text-slate-950">fetch POST /api/generate</p>
              <p className="mt-2 text-xs text-slate-700">Envoie {`{ "prompt": "..." }`} et lit le flux avec getReader()</p>
            </div>

            <div className="rounded-xl border-2 border-purple-200 bg-purple-50/60 p-4">
              <span className="text-xs font-black uppercase text-purple-900">2. Backend Node.js / Express</span>
              <p className="mt-1 text-sm font-bold text-slate-950">Relais &amp; Sécurité</p>
              <p className="mt-2 text-xs text-slate-700">Valide le prompt, injecte la clé API secrète, écrit avec res.write()</p>
            </div>

            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/60 p-4">
              <span className="text-xs font-black uppercase text-emerald-900">3. API Google Gemini</span>
              <p className="mt-1 text-sm font-bold text-slate-950">Inférence LLM</p>
              <p className="mt-2 text-xs text-slate-700">Génère les tokens et les pousse vers le stream Node.js</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Test en conditions réelles dans le Laboratoire Interactif
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Expérimentez le streaming interactif, testez le bouton d&apos;interruption d&apos;urgence avec <strong>AbortController</strong> et observez le débit mesuré en tokens/seconde :
        </p>
        <RealtimeProtocolsLab />
      </section>

      {/* 5. Implémentation Backend Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation Backend complète avec @google/genai
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Voici le serveur Express de production. Notez le traitement des fermetures intempestives de connexion et la gestion d&apos;erreurs spécifique à SSE :
        </p>

        <CodeBlock
          language="javascript"
          filename="server-gemini-stream.js"
          code={`const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialiser le client Google GenAI avec la clé protégée
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY_GEMINI,
});

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  // 1. Validation du prompt entrant
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Le champ "prompt" est obligatoire et ne peut pas être vide.',
    });
  }

  // 2. Initialisation du flux SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Empêche la mise en tampon par Nginx
  res.flushHeaders();

  let clientDisconnected = false;

  // 3. Détecter si l'utilisateur quitte la page ou clique sur "Arrêter"
  res.on('close', () => {
    if (!res.writableEnded) {
      clientDisconnected = true;
      console.log('[SSE] Le client a fermé la connexion, interruption du streaming.');
    }
  });

  try {
    // 4. Appel du modèle avec l'option stream: true
    const stream = await ai.interactions.create({
      model: 'gemini-2.5-flash',
      input: prompt,
      stream: true,
    });

    // 5. Parcourir les événements générés par le LLM
    for await (const event of stream) {
      if (clientDisconnected) {
        break; // Arrêter la boucle immédiatement pour économiser le CPU
      }

      // Filtrer pour n'extraire que les nouveaux fragments textuels
      if (event.event_type === 'step.delta' && event.delta?.type === 'text') {
        const chunk = event.delta.text;

        // �0mission de l'événement SSE token
        res.write(
          \`event: token\\n\` +
          \`data: \${JSON.stringify({ text: chunk })}\\n\\n\`
        );
      }
    }

    // 6. Signaler la fin propre du traitement
    if (!clientDisconnected) {
      res.write('event: completed\\ndata: {}\\n\\n');
      res.end();
    }
  } catch (error) {
    console.error('Erreur streaming Gemini:', error);

    // Attention : les en-têtes HTTP étant déjà partis, on ne peut pas faire res.status(500)
    if (!clientDisconnected && !res.writableEnded) {
      res.write(
        \`event: error\\n\` +
        \`data: \${JSON.stringify({ message: 'Une erreur est survenue pendant la génération.' })}\\n\\n\`
      );
      res.end();
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Serveur Gemini Streaming démarré sur http://localhost:\${PORT}\`);
});`}
        />
      </section>

      {/* 6. Implémentation Frontend React */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Implémentation Frontend React avec AbortController
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Ce composant React gère la saisie, l&apos;affichage mot par mot, le décodage avec <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">TextDecoder</code> et la possibilité d&apos;interrompre la requête à tout moment :
        </p>

        <CodeBlock
          language="tsx"
          filename="GeminiStreamChat.tsx"
          code={`import React, { useState, useRef } from 'react';

export const GeminiStreamChat: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receivedChars, setReceivedChars] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setResponse('');
    setErrorMessage(null);
    setReceivedChars(0);
    setIsLoading(true);

    // Initialiser l'AbortController pour permettre l'arrêt
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: controller.signal, // Lier le signal d'annulation
      });

      if (!res.ok) throw new Error(\`Erreur HTTP: \${res.status}\`);
      if (!res.body) throw new Error('Flux réseau non disponible.');

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        buffer = buffer.replace(/\\r\\n/g, '\\n'); // Normalisation

        const events = buffer.split('\\n\\n');
        buffer = events.pop() || '';

        for (const event of events) {
          const lines = event.split('\\n');
          let eventName = 'message';
          const dataLines: string[] = [];

          for (const line of lines) {
            if (line.startsWith('event:')) eventName = line.slice(6).trim();
            if (line.startsWith('data:')) dataLines.push(line.slice(5).trimStart());
          }

          const rawData = dataLines.join('\\n');
          if (!rawData) continue;

          if (eventName === 'token') {
            const parsed = JSON.parse(rawData);
            setResponse((prev) => prev + parsed.text);
            setReceivedChars((prev) => prev + parsed.text.length);
          } else if (eventName === 'error') {
            const parsed = JSON.parse(rawData);
            setErrorMessage(parsed.message);
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setErrorMessage('Génération interrompue par l\\'utilisateur.');
      } else {
        setErrorMessage(err.message || 'Erreur inattendue.');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Posez votre question à Gemini..."
        rows={3}
        className="w-full rounded-xl border-2 border-slate-300 p-3 text-sm text-slate-900 outline-none focus:border-indigo-600"
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="rounded-lg bg-indigo-600 px-5 py-2 font-black text-white hover:bg-indigo-700 disabled:bg-slate-300"
          >
            {isLoading ? 'Génération...' : 'Générer la réponse'}
          </button>
          <button
            onClick={handleStop}
            disabled={!isLoading}
            className="rounded-lg border-2 border-rose-600 px-4 py-2 font-black text-rose-600 hover:bg-rose-50 disabled:border-slate-300 disabled:text-slate-300"
          >
            Arrêter
          </button>
        </div>

        {isLoading && (
          <span className="text-xs font-bold text-slate-600">
            Caractères reçus : <strong className="text-indigo-700">{receivedChars}</strong>
          </span>
        )}
      </div>

      {errorMessage && (
        <p className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs font-bold text-rose-800">
          {errorMessage}
        </p>
      )}

      <div className="min-h-32 rounded-xl bg-slate-950 p-4 font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed shadow-inner">
        {response || <span className="text-slate-600 italic">La réponse s&apos;affichera ici mot par mot...</span>}
      </div>
    </div>
  );
};`}
        />
      </section>

      {/* 7. Pièges et Erreurs critiques en production */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Les pièges critiques à éviter en environnement de production
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Erreur courante</th>
                <th className="p-3">Conséquence en production</th>
                <th className="p-3">Solution technique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-bold text-rose-700">Clé API dans le bundle React</td>
                <td className="p-3">Vol immédiat de la clé et facturation abusive</td>
                <td className="p-3 font-semibold text-emerald-900">Isoler la clé dans <code>process.env</code> côté backend uniquement</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-700">Buffering Nginx / Proxy Cloud</td>
                <td className="p-3">Le proxy retient tous les chunks et les délivre d&apos;un bloc</td>
                <td className="p-3 font-semibold text-emerald-900">Positionner le header <code>X-Accel-Buffering: no</code></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-700">Appel à res.status(500) après flushHeaders</td>
                <td className="p-3">Crash du serveur : <em>ERR_HTTP_HEADERS_SENT</em></td>
                <td className="p-3 font-semibold text-emerald-900">�0mettre un événement SSE d&apos;erreur (<code>event: error</code>)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-700">Ignorer l&apos;abandon du client</td>
                <td className="p-3">Gaspillage de crédits de tokens Gemini dans le vide</td>
                <td className="p-3 font-semibold text-emerald-900">Interrompre la boucle de lecture avec <code>res.on(&apos;close&apos;)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Application complète Gemini Streaming avec compteur en direct"
        objective="Assembler le backend Express et le frontend React, connecter votre clé Gemini, tester le débit en direct et vérifier l'interruption AbortController."
        steps={[
          "Créer le fichier .env avec votre clé API_KEY_GEMINI valide.",
          "Démarrer le backend Express et tester la route POST /api/generate avec curl ou Postman.",
          "Dans React, ajouter un compteur dynamique du nombre de caractères reçus mis à jour à chaque événement token.",
          "Cliquer sur 'Arrêter' au milieu d'une longue génération et vérifier dans les logs Node.js que la boucle s'arrête immédiatement.",
        ]}
      />

      {/* 9. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Streaming Gemini & React"
          questions={[
            {
              id: 1,
              question: "Quelle option active le mode streaming dans le SDK @google/genai lors de la création d'une interaction ?",
              options: [
                "stream: true",
                "streaming: true",
                "chunks: true",
                "mode: 'progressive'",
              ],
              correctIndex: 0,
              explanation: "L'option officielle du SDK pour recevoir un flux asynchrone itérable est 'stream: true'.",
            },
            {
              id: 2,
              question: "Quelle structure JavaScript permet d'itérer sur un flux d'événements asynchrones émis par le SDK Gemini ?",
              options: [
                "for await (const event of stream)",
                "stream.forEachSync()",
                "while (true) thread.sleep()",
                "Array.from(stream).map()",
              ],
              correctIndex: 0,
              explanation: "for await...of est la boucle native JavaScript dédiée à la consommation d'objets implémentant Symbol.asyncIterator.",
            },
            {
              id: 3,
              question: "Pourquoi est-il impossible de faire 'res.status(500).json()' si une erreur survient au milieu du streaming ?",
              options: [
                "Car les en-têtes HTTP (status 200) ont déjà été expédiés au client via flushHeaders()",
                "Car le statut 500 est réservé aux bases de données",
                "Car Express interdit les erreurs en streaming",
                "Car Gemini bloque le serveur",
              ],
              correctIndex: 0,
              explanation: "Une fois que la réponse HTTP a commencé à être envoyée (en-têtes et premiers octets), le statut HTTP est définitivement gravé pour cette connexion. Il faut signaler l'anomalie dans le flux lui-même (event: error).",
            },
            {
              id: 4,
              question: "ì quoi sert le header 'X-Accel-Buffering: no' envoyé par le serveur Node.js ?",
              options: [
                "ì ordonner aux proxys inverses comme Nginx de ne pas retenir les données en tampon mémoire",
                "ì accélérer la carte graphique",
                "ì désactiver le pare-feu Windows",
                "ì chiffrer les requêtes en SSL",
              ],
              correctIndex: 0,
              explanation: "Nginx met par défaut en mémoire tampon les réponses pour les optimiser. L'en-tête X-Accel-Buffering: no force Nginx à délivrer immédiatement chaque morceau de texte au navigateur.",
            },
            {
              id: 5,
              question: "Quel objet standard du navigateur permet d'interrompre une requête fetch() en cours ?",
              options: [
                "AbortController",
                "ThreadKiller",
                "SocketDestroyer",
                "ProcessExit",
              ],
              correctIndex: 0,
              explanation: "AbortController fournit un signal relié à l'option 'signal' de fetch(). Appeler abort() coupe instantanément la liaison réseau côté client.",
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
          title="Compétences validées pour le Chapitre 5"
          items={[
            "Je sais intégrer l'API Google GenAI avec stream: true et consommer les événements step.delta.",
            "Je maîtrise la retransmission SSE de fragments textuels vers React avec res.write().",
            "Je gère proprement la rupture de liaison (res.on('close')) pour éviter le gaspillage de calcul.",
            "Je sais décoder et concaténer le flux côté React sans figer l'interface.",
            "J'utilise AbortController pour donner à l'utilisateur le contrôle total sur l'interruption.",
          ]}
        />
      </section>
    </div>
  );
};

