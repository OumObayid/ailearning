'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { RealtimeProtocolsLab } from '@/components/interactive/RealtimeProtocolsLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 w-full max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words [overflow-wrap:anywhere] min-w-0">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Réseau, HTTP &amp; Protocoles</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Le Polling : Interroger régulièrement un serveur
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
            <span>Comprendre le principe du Polling et quand l&apos;appliquer.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comparer méthodiquement Short Polling et Long Polling.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Gérer des tâches en arrière-plan avec le statut HTTP 202 Accepted.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Éviter le chevauchement de requêtes réseau avec le motif setTimeout récursif.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier les impacts sur les ressources serveur et les seuils de rupture.</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que le Polling ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que le Polling ?
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Dans le modèle HTTP classique, le serveur ne peut <strong>jamais</strong> prendre l&apos;initiative de contacter le client de manière spontanée. Le client est donc contraint de demander périodiquement des nouvelles.
        </p>

        <Callout type="warning" title="Attention à la persistance en mémoire">
          Dans notre atelier pédagogique, les tâches sont conservées dans une structure JavaScript <code>Map</code> en RAM. Si le serveur redémarre ou si vous lancez plusieurs processus Node.js en cluster, ces tâches disparaissent. En production, les statuts de jobs asynchrones sont systématiquement persistés dans <strong>Redis</strong> ou <strong>MySQL</strong>.
        </Callout>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Analogie de la salle d&apos;attente</h3>
          <p className="text-sm font-semibold text-slate-800">
            Imaginez que vous déposez une analyse de sang au laboratoire. Deux options s&apos;offrent à vous :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <span className="font-black text-amber-900 text-sm">Short Polling</span>
              <p className="mt-1 text-xs text-slate-800">
                Vous venez à l&apos;accueil toutes les 5 minutes pour demander : <em>« Les résultats sont-ils prêts ? »</em> L&apos;employé répond immédiatement <em>« Non »</em> ou <em>« Oui »</em>. Cela génère des allers-retours constants même quand rien n&apos;a changé.
              </p>
            </div>
            <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-4">
              <span className="font-black text-orange-900 text-sm">Long Polling</span>
              <p className="mt-1 text-xs text-slate-800">
                Vous posez la question à l&apos;accueil, et l&apos;employé vous retient au guichet jusqu&apos;à ce que l&apos;imprimante sorte le document, puis vous le remet avant de libérer le guichet. Moins de déplacements, mais le guichet reste immobilisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Short Polling vs Long Polling */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comparaison technique approfondie
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Critère</th>
                <th className="p-3">Short Polling</th>
                <th className="p-3">Long Polling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-bold">Fréquence d&apos;émission</td>
                <td className="p-3">Intervalle fixe régulier (ex: toutes les 3 secondes)</td>
                <td className="p-3">Réémission immédiate dès la clôture de la réponse précédente</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Comportement serveur</td>
                <td className="p-3">Réponse instantanée (statut <code>processing</code> ou <code>done</code>)</td>
                <td className="p-3">Maintient la socket ouverte en attente d&apos;un événement ou d&apos;un timeout</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Requêtes superflues</td>
                <td className="p-3 text-rose-700 font-bold">Très nombreuses (95% des requêtes renvoient &apos;en cours&apos;)</td>
                <td className="p-3 text-emerald-700 font-bold">Très faibles (uniquement lors de transitions)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Latence perçue</td>
                <td className="p-3">Jusqu&apos;à l&apos;intervalle choisi (jusqu&apos;à 3 s de délai)</td>
                <td className="p-3 font-bold text-emerald-700">Quasi-instantanée dès l&apos;apparition du résultat</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Pression sur le serveur</td>
                <td className="p-3">Nombreuses requêtes courtes, overhead HTTP/TCP constant</td>
                <td className="p-3">Consommation de sockets ouvertes simultanées</td>
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
          Testez le comportement du polling sous différents modes et observez le volume de requêtes émises vers le serveur :
        </p>
        <RealtimeProtocolsLab />
      </section>

      {/* 5. Implémentation Backend Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation Backend : Gestion de tâches asynchrones avec statut 202
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Voici le serveur Express orchestrant une tâche longue simulée (15 secondes) avec persistance temporaire dans une structure <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">Map</code> :
        </p>

        <CodeBlock
          language="javascript"
          filename="server-polling.js"
          code={`const express = require('express');
const cors = require('cors');
const { randomUUID } = require('node:crypto');

const app = express();
app.use(cors());
app.use(express.json());

// Stockage mémoire des tâches (Map taskId => objet tâche)
const tasks = new Map();

// 1. Déclencher une tâche lourde (POST)
app.post('/api/tasks', (req, res) => {
  const taskId = randomUUID();

  // Enregistrement immédiat au statut 'processing'
  tasks.set(taskId, {
    id: taskId,
    status: 'processing',
    result: null,
    createdAt: Date.now(),
  });

  console.log(\`[Tâche \${taskId}] Lancée en arrière-plan...\`);

  // Simulation d'un traitement IA asynchrone de 15 secondes
  setTimeout(() => {
    const task = tasks.get(taskId);
    if (task) {
      task.status = 'completed';
      task.result = 'Rapport d\\'analyse généré : 142 anomalies détectées avec succès.';
      task.completedAt = Date.now();
      console.log(\`[Tâche \${taskId}] Terminée avec succès.\`);
    }
  }, 15000);

  // 202 Accepted : La demande est valide et prise en charge, mais pas encore terminée
  res.status(202).json({
    success: true,
    taskId,
    status: 'processing',
    checkUrl: \`/api/tasks/\${taskId}\`,
  });
});

// 2. Interrogation périodique de l'état d'avancement (GET)
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.get(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: 'Tâche inconnue ou expirée.' });
  }

  // Si terminée, 200 OK avec le résultat
  res.status(200).json({
    success: true,
    taskId: task.id,
    status: task.status,
    result: task.result,
  });
});

app.listen(3000, () => console.log('Serveur Polling sur http://localhost:3000'));`}
        />
      </section>

      {/* 6. Implémentation React : Pourquoi setTimeout récursif plutôt que setInterval ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Le piège de setInterval vs le motif setTimeout récursif dans React
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/50 p-4">
            <h4 className="font-black text-rose-900 text-sm flex items-center gap-2">
              <Icon name="alert-triangle" className="w-4 h-4 text-rose-700" />
              Pourquoi setInterval est dangereux
            </h4>
            <p className="mt-2 text-xs text-slate-800 leading-relaxed">
              Si votre intervalle est de 2 secondes mais qu&apos;une requête met 3,5 secondes à répondre (ralentissement réseau, pic de charge), <strong>les requêtes vont se chevaucher</strong>. Le client émettra la requête 2 avant que la 1 ne soit revenue, créant une tempête d&apos;appels concurrents.
            </p>
          </div>

          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/50 p-4">
            <h4 className="font-black text-emerald-900 text-sm flex items-center gap-2">
              <Icon name="check-circle" className="w-4 h-4 text-emerald-700" />
              La bonne pratique : setTimeout récursif
            </h4>
            <p className="mt-2 text-xs text-slate-800 leading-relaxed">
              On ne programme la requête suivante <strong>qu&apos;une fois la réponse de la précédente reçue et traitée</strong>. Même si le réseau ralentit fortement, il n&apos;y aura jamais plus d&apos;une seule requête de sondage en vol à la fois.
            </p>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          filename="TaskTracker.tsx"
          code={`import React, { useState, useRef, useEffect } from 'react';

export const TaskTracker: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const [result, setResult] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopPolling = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const pollTask = async (taskId: string, currentAttempt = 1) => {
    // Garde-fou : arrêt après 25 tentatives (ex: 75 secondes max)
    if (currentAttempt > 25) {
      setStatus('error');
      setResult('Délai maximal dépassé (timeout client)');
      return;
    }

    setAttempts(currentAttempt);

    try {
      const res = await fetch(\`http://localhost:3000/api/tasks/\${taskId}\`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erreur lors du suivi');

      if (data.status === 'completed') {
        setStatus('completed');
        setResult(data.result);
        stopPolling();
      } else {
        // Programmer la vérification suivante après 3000 ms
        timerRef.current = setTimeout(() => {
          pollTask(taskId, currentAttempt + 1);
        }, 3000);
      }
    } catch (err: any) {
      setStatus('error');
      setResult(err.message);
      stopPolling();
    }
  };

  const startAnalysis = async () => {
    stopPolling();
    setStatus('processing');
    setResult(null);
    setAttempts(0);

    try {
      const res = await fetch('http://localhost:3000/api/tasks', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error('Impossible de lancer la tâche');

      // Première vérification après 2 secondes
      timerRef.current = setTimeout(() => {
        pollTask(data.taskId, 1);
      }, 2000);
    } catch (err: any) {
      setStatus('error');
      setResult(err.message);
    }
  };

  // Nettoyage impératif lors du démontage du composant
  useEffect(() => {
    return () => stopPolling();
  }, []);

  return (
    <div className="rounded-xl border p-5 bg-white space-y-3">
      <button
        onClick={startAnalysis}
        disabled={status === 'processing'}
        className="rounded bg-amber-600 px-4 py-2 font-bold text-white disabled:bg-slate-300"
      >
        {status === 'processing' ? \`Analyse en cours (essai \${attempts})...\` : 'Démarrer tâche IA'}
      </button>

      {status === 'completed' && <p className="text-emerald-700 font-bold">{result}</p>}
      {status === 'error' && <p className="text-rose-600 font-bold">{result}</p>}
    </div>
  );
};`}
        />
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Polling résilient avec expiration automatique"
        objective="Construire un cycle complet de suivi de traitement IA, gérer un compteur d'essais maximal, empêcher les lancements multiples et libérer la mémoire."
        steps={[
          "Créer le serveur Express avec Map en mémoire pour enregistrer les tâches asynchrones.",
          "Ajouter une route DELETE /api/tasks/:id permettant de nettoyer manuellement une tâche achevée.",
          "Dans le client React, ajouter un bouton 'Arrêter le suivi' qui invoque clearTimeout.",
          "Tester le comportement lorsque le serveur met plus de 10 secondes à terminer le calcul.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Le Polling"
          questions={[
            {
              id: 1,
              question: "Qui est toujours à l'initiative de l'échange dans une architecture basée sur le Polling ?",
              options: [
                "Le client (navigateur React)",
                "Le serveur Node.js",
                "Le moteur de base de données MySQL",
                "L'API externe de Google",
              ],
              correctIndex: 0,
              explanation: "Avec le Polling, le serveur ne peut jamais pousser spontanément des données. C'est toujours le client qui doit envoyer une requête pour demander s'il y a du nouveau.",
            },
            {
              id: 2,
              question: "Quelle est la caractéristique distinctive du Long Polling par rapport au Short Polling ?",
              options: [
                "Le serveur conserve la requête en attente jusqu'à l'arrivée d'une nouvelle donnée ou d'un timeout",
                "Le client utilise le protocole UDP au lieu de TCP",
                "Les données sont transmises sous forme de fichiers ZIP compressés",
                "Il ne fonctionne que sur les ordinateurs de bureau",
              ],
              correctIndex: 0,
              explanation: "En Long Polling, la requête reste suspendue côté serveur tant que l'événement attendu ne s'est pas produit.",
            },
            {
              id: 3,
              question: "Pourquoi est-il fortement recommandé d'utiliser setTimeout récursif plutôt que setInterval pour le Polling ?",
              options: [
                "Pour éviter que plusieurs requêtes ne se chevauchent si le serveur met du temps à répondre",
                "Car setInterval est déprécié en JavaScript",
                "Pour forcer le navigateur à ouvrir un nouveau thread système",
                "Car setTimeout consomme moins de mémoire RAM",
              ],
              correctIndex: 0,
              explanation: "setTimeout récursif garantit que la requête N+1 ne sera programmée qu'après la réception complète de la requête N, évitant tout empilement catastrophique en cas de lag.",
            },
            {
              id: 4,
              question: "Que signifie le code de statut HTTP 202 dans une architecture orientée tâches asynchrones ?",
              options: [
                "La requête a été acceptée et enregistrée, mais son traitement est encore en cours d'exécution",
                "La tâche a échoué avec une erreur fatale",
                "Le client doit immédiatement s'authentifier",
                "Le contenu a été supprimé définitivement",
              ],
              correctIndex: 0,
              explanation: "Le statut 202 Accepted est la norme REST pour signifier qu'un job long est mis en file d'attente ou en cours de traitement.",
            },
            {
              id: 5,
              question: "Quel est l'inconvénient majeur du Polling lorsque le nombre d'utilisateurs simultanés augmente fortement (ex: 50 000 utilisateurs) ?",
              options: [
                "Une tempête de requêtes répétitives qui sature inutilement la bande passante et le CPU du serveur",
                "Une corruption automatique des disques durs",
                "Une incompatibilité totale avec le navigateur Chrome",
                "L'obligation de migrer obligatoirement vers le langage C++",
              ],
              correctIndex: 0,
              explanation: "50 000 clients interrogeant toutes les 2 secondes représentent 25 000 requêtes/seconde sur le serveur, dont 99% ne renverront aucune nouvelle donnée.",
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
          title="Compétences validées pour le Chapitre 2"
          items={[
            "Je sais expliquer la différence fondamentale entre Short Polling et Long Polling.",
            "Je sais concevoir une route de démarrage de tâche renvoyant un statut 202 Accepted et un identifiant unique.",
            "Je sais structurer un polling récursif propre dans React avec useRef et setTimeout.",
            "Je n'oublie jamais de nettoyer les timers (clearTimeout) lors du démontage du composant.",
            "J'identifie les limites de charge du Polling et sais quand passer à WebSocket ou SSE.",
          ]}
        />
      </section>
    </div>
  );
};

