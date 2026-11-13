'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 w-full max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words [overflow-wrap:anywhere] min-w-0">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Réseau, HTTP &amp; Protocoles</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Fonctionnement du HTTP et cycle requête/réponse
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
            <span>Définir précisément HTTP et le chiffrement HTTPS (TLS).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le rôle asymétrique du client et du serveur.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Détailler le cycle complet d&apos;une requête (DNS, TCP, TLS, Request, Response).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser les méthodes REST (GET, POST, PUT, PATCH, DELETE) et la différence PUT vs PATCH.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier et employer les bons codes de statut HTTP (200, 201, 204, 400, 401, 404, 500).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Créer une API Express robuste avec validation et la consommer depuis React avec fetch().</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que HTTP ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que le protocole HTTP ?
        </h2>
        <p className="text-base text-slate-950 font-medium">
          <strong>HTTP</strong> signifie <em>HyperText Transfer Protocol</em>. C&apos;est un protocole de communication de la couche application qui régit les échanges d&apos;informations entre un client (navigateur, application mobile, script Node.js) et un serveur web.
        </p>

        <Callout type="info" title="HTTP n'est ni un langage ni un logiciel">
          HTTP n&apos;est ni JavaScript, ni Express, ni Apache. C&apos;est un <strong>ensemble de règles standardisées (RFC)</strong> précisant la syntaxe des messages, les en-têtes et les statuts que les deux machines doivent impérativement respecter pour se comprendre.
        </Callout>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Exemple d&apos;architecture moderne à 3 niveaux</h3>
          <p className="text-sm font-semibold text-slate-800">
            Dans une application web de production, React ne discute <strong>jamais</strong> directement avec la base de données MySQL :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center pt-2 min-w-0">
            <div className="rounded-xl border-2 border-sky-300 bg-sky-50 p-4 break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-black uppercase text-sky-800">Client Frontend</span>
              <p className="mt-1 text-base font-black text-slate-950">React (Vite / Next.js)</p>
              <p className="mt-1 text-xs text-slate-700">Envoie Requête HTTP GET /api/projects</p>
            </div>
            <div className="rounded-xl border-2 border-indigo-300 bg-indigo-50 p-4 break-words [overflow-wrap:anywhere] min-w-0">
              <span className="text-xs font-black uppercase text-indigo-800">Serveur Backend</span>
              <p className="mt-1 text-base font-black text-slate-950">Node.js / Express</p>
              <p className="mt-1 text-xs text-slate-700">Contrôle auth, valide, interroge la BDD ou l&apos;IA</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 break-words [overflow-wrap:anywhere] min-w-0 sm:col-span-2">
              <span className="text-xs font-black uppercase text-emerald-800">Stockage / IA</span>
              <p className="mt-1 text-base font-black text-slate-950">MySQL / Gemini</p>
              <p className="mt-1 text-xs text-slate-700">Exécute les requêtes SQL ou modèles LLM</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cycle complet d'une requête HTTP */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Le cycle complet d&apos;une requête HTTP
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Chaque fois qu&apos;une action utilisateur déclenche un appel réseau dans React, une séquence ordonnée d&apos;étapes se produit :
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">1</span>
            <div>
              <h4 className="font-black text-slate-950">Déclenchement côté React</h4>
              <p className="text-sm font-medium text-slate-800">L&apos;utilisateur clique sur un bouton ou soumet un formulaire. Le code React appelle <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">fetch()</code> ou Axios.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">2</span>
            <div>
              <h4 className="font-black text-slate-950">Résolution DNS &amp; Connexion TCP/TLS</h4>
              <p className="text-sm font-medium text-slate-800">Le navigateur résout le nom de domaine en adresse IP et initialise la négociation sécurisée TLS.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">3</span>
            <div>
              <h4 className="font-black text-slate-950">Routage dans Express</h4>
              <p className="text-sm font-medium text-slate-800">Express reçoit les en-têtes et le corps JSON grâce au middleware <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">express.json()</code>.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">4</span>
            <div>
              <h4 className="font-black text-slate-950">Traitement métier &amp; Construction de la réponse</h4>
              <p className="text-sm font-medium text-slate-800">Le backend vérifie les droits, appelle MySQL ou Gemini, puis émet un code de statut et des en-têtes JSON (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">res.status(200).json(...)</code>).</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">5</span>
            <div>
              <h4 className="font-black text-slate-950">Désérialisation côté React &amp; Rendu graphique</h4>
              <p className="text-sm font-medium text-slate-800">React lit la promesse résolue, met à jour son état local (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">useState</code>) et affiche les nouvelles données sans rechargement de page.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Méthodes HTTP & Différence PUT vs PATCH */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Méthodes HTTP et différence fondamentale entre PUT et PATCH
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Méthode</th>
                <th className="p-3">Sémantique REST</th>
                <th className="p-3">Idempotence</th>
                <th className="p-3">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-mono font-black text-emerald-700">GET</td>
                <td className="p-3 font-semibold">Lecture de ressources (sans effet de bord)</td>
                <td className="p-3">Oui (sûr)</td>
                <td className="p-3 font-mono text-xs">GET /api/projects</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-black text-indigo-700">POST</td>
                <td className="p-3 font-semibold">Création d&apos;une ressource ou déclenchement d&apos;un traitement IA</td>
                <td className="p-3 text-rose-700 font-bold">Non</td>
                <td className="p-3 font-mono text-xs">POST /api/generate</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-black text-amber-700">PUT</td>
                <td className="p-3 font-semibold">Remplacement complet d&apos;une ressource existante</td>
                <td className="p-3">Oui</td>
                <td className="p-3 font-mono text-xs">PUT /api/users/42</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-black text-purple-700">PATCH</td>
                <td className="p-3 font-semibold">Modification partielle d&apos;une ressource (quelques champs ciblés)</td>
                <td className="p-3">Généralement non</td>
                <td className="p-3 font-mono text-xs">PATCH /api/users/42</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-black text-rose-700">DELETE</td>
                <td className="p-3 font-semibold">Suppression d&apos;une ressource</td>
                <td className="p-3">Oui</td>
                <td className="p-3 font-mono text-xs">DELETE /api/projects/12</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="La règle d'or PUT vs PATCH">
          Si votre ressource possède 10 champs et que vous utilisez <strong>PUT</strong> en ne transmettant que <code>{`{ "city": "Rabat" }`}</code>, une implémentation stricte remplacera toute l&apos;entité et écrasera les 9 autres champs par <code>null</code>. Pour une modification ciblée, privilégiez toujours <strong>PATCH</strong>.
        </Callout>
      </section>

      {/* 5. Codes de statut essentiels */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Les codes de statut HTTP indispensables en ingénierie Backend
        </h2>
        <div className="space-y-4 min-w-0">
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/50 p-4.5 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="rounded bg-emerald-200 px-2.5 py-0.5 text-xs font-black text-emerald-900">2xx Succès</span>
            <ul className="mt-2.5 space-y-2 text-xs sm:text-sm font-bold text-slate-900">
              <li><strong className="text-emerald-800">200 OK :</strong> Requête traitée avec succès.</li>
              <li><strong className="text-emerald-800">201 Created :</strong> Ressource créée (POST).</li>
              <li><strong className="text-emerald-800">202 Accepted :</strong> Tâche asynchrone acceptée.</li>
              <li><strong className="text-emerald-800">204 No Content :</strong> Succès sans données à retourner (DELETE).</li>
            </ul>
          </div>

          <div className="rounded-xl border-2 border-amber-300 bg-amber-50/50 p-4.5 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="rounded bg-amber-200 px-2.5 py-0.5 text-xs font-black text-amber-900">4xx Erreurs Client</span>
            <ul className="mt-2.5 space-y-2 text-xs sm:text-sm font-bold text-slate-900">
              <li><strong className="text-amber-800">400 Bad Request :</strong> Payload invalide ou champs manquants.</li>
              <li><strong className="text-amber-800">401 Unauthorized :</strong> Jeton JWT ou authentification manquant.</li>
              <li><strong className="text-amber-800">403 Forbidden :</strong> Identité connue mais droits insuffisants.</li>
              <li><strong className="text-amber-800">404 Not Found :</strong> Ressource ou URL inexistante.</li>
              <li><strong className="text-amber-800">429 Too Many Requests :</strong> Quota ou Rate Limiting dépassé.</li>
            </ul>
          </div>

          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/50 p-4.5 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="rounded bg-rose-200 px-2.5 py-0.5 text-xs font-black text-rose-900">5xx Erreurs Serveur</span>
            <ul className="mt-2.5 space-y-2 text-xs sm:text-sm font-bold text-slate-900">
              <li><strong className="text-rose-800">500 Internal Error :</strong> Exception non interceptée dans Node.js.</li>
              <li><strong className="text-rose-800">502 Bad Gateway :</strong> Mauvaise réponse d&apos;un proxy ou de Gemini.</li>
              <li><strong className="text-rose-800">503 Unavailable :</strong> Surcharge ou maintenance momentanée.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. HTTP vs HTTPS & Chiffrement TLS */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. HTTP et HTTPS : sécurité et chiffrement TLS
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Sur un réseau public ou un réseau Wi-Fi d&apos;hôtel, les paquets HTTP circulent en clair. N&apos;importe quel intermédiaire (sniffer de paquets, routeur compromis) peut intercepter les identifiants, cookies de session et clés d&apos;API.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src="/images/cours/backend-ia/module-3/http-vs-https.jpg"
                alt="Comparaison connexion HTTP non sécurisée vs connexion HTTPS chiffrée"
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-center text-xs font-bold text-slate-700">
              Figure 1.1 : Connexion non chiffrée vulnérable aux écoutes passives (HTTP) vs tunnel sécurisé avec certificat SSL/TLS (HTTPS).
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src="/images/cours/backend-ia/module-3/https-tls-encryption.jpg"
                alt="Chiffrement des données en transit par clé de session TLS"
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-center text-xs font-bold text-slate-700">
              Figure 1.2 : Le protocole TLS négocie une clé asymétrique pour établir un canal chiffré symétrique ultra-rapide.
            </p>
          </div>
        </div>

        <Callout type="tip" title="HTTPS est obligatoire pour les API d'IA">
          Les navigateurs modernes refusent d&apos;activer certaines fonctionnalités (comme les Service Workers, le presse-papier sécurisé et WebRTC) sur des origines non sécurisées. En production, votre API Node.js doit impérativement être servie derrière un proxy HTTPS (Nginx, Caddy ou Cloudflare).
        </Callout>
      </section>

      {/* 7. Atelier pratique : API Express & Consommation React */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Atelier pratique : API Express et intégration React
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Implémentons le backend Express avec validation des requêtes et le composant React correspondant.
        </p>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-indigo-900 tracking-wider">Backend · server.js</span>
          <CodeBlock
            language="javascript"
            filename="server.js"
            code={`const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 1. Autoriser le frontend React et parser le JSON
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// 2. Route de statut santé (Health check)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// 3. Route POST pour analyser un prompt utilisateur
app.post('/api/analyze', (req, res) => {
  const { prompt } = req.body;

  // Validation rigoureuse
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Le champ "prompt" est obligatoire et doit être une chaîne non vide.',
    });
  }

  // Traitement simulé (sera remplacé par Gemini au Chapitre 5)
  res.status(200).json({
    success: true,
    promptLength: prompt.length,
    receivedPrompt: prompt.trim(),
    processedAt: new Date().toISOString(),
  });
});

// 4. Gestionnaire 404 pour toutes les routes inconnues
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable sur cette API' });
});

app.listen(PORT, () => {
  console.log(\`Serveur API actif sur http://localhost:\${PORT}\`);
});`}
          />
        </div>

        <div className="space-y-2 pt-4">
          <span className="text-xs font-black uppercase text-indigo-900 tracking-wider">Frontend · React / Vite</span>
          <CodeBlock
            language="tsx"
            filename="PromptAnalyzer.tsx"
            code={`import React, { useState } from 'react';

export const PromptAnalyzer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      // Vérifier le statut 2xx
      if (!res.ok) {
        throw new Error(data.error || \`Erreur serveur (\${res.status})\`);
      }

      setResponse(\`Analyse reçue : "\${data.receivedPrompt}" (\${data.promptLength} caractères)\`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Impossible de joindre le serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-5 bg-white">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Saisissez une invite à analyser..."
        className="w-full rounded border p-2 text-sm text-slate-900"
      />
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="rounded bg-indigo-600 px-4 py-2 text-white font-bold disabled:bg-slate-300"
      >
        {isLoading ? 'Envoi en cours...' : 'Envoyer la requête'}
      </button>

      {response && <p className="text-emerald-700 font-bold text-sm">{response}</p>}
      {errorMessage && <p className="text-rose-600 font-bold text-sm">{errorMessage}</p>}
    </form>
  );
};`}
          />
        </div>
      </section>

      {/* 8. Travaux pratiques guidés */}
      <PracticalWork
        title="Atelier pratique : Construire une API REST sécurisée pour prompts d'IA"
        objective="Mettre en œuvre une API Express avec gestion des méthodes HTTP, validation des types de données, gestion de codes d'erreur 400 et 404, et intégration Postman."
        steps={[
          "Créer le projet Node.js avec npm init -y et installer express et cors.",
          "Déclarer une route GET /api/status renvoyant { server: 'ok', timestamp: Date.now() }.",
          "Déclarer une route POST /api/message acceptant un corps JSON { message: string, priority: number }.",
          "Valider que priority est un nombre compris entre 1 et 5 et que message n'est pas vide. Renvoyer 400 si la condition échoue.",
          "Tester les cas de succès (statut 201 Created) et d'erreur dans Postman ou curl.",
        ]}
      />

      {/* 9. Quiz d'auto-évaluation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : HTTP et cycle requête/réponse"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal de HTTP ?",
              options: [
                "Définir les règles formelles de communication et d'échange entre client et serveur",
                "Compiler du code JavaScript en binaire machine",
                "Créer des bases de données relationnelles MySQL",
                "Gérer le routage matériel des câbles de fibre optique",
              ],
              correctIndex: 0,
              explanation: "HTTP est un protocole applicatif qui spécifie le format des messages, des en-têtes et des méthodes permettant à deux systèmes de dialoguer.",
            },
            {
              id: 2,
              question: "Quelle méthode HTTP utilise-t-on pour modifier uniquement la ville d'un utilisateur sans toucher à son mot de passe ni à son adresse email ?",
              options: [
                "PUT",
                "PATCH",
                "POST",
                "DELETE",
              ],
              correctIndex: 1,
              explanation: "PATCH applique une modification partielle ciblée, alors que PUT remplace conceptuellement l'intégralité de l'enregistrement.",
            },
            {
              id: 3,
              question: "Quel code de statut indique qu'une ressource a été créée avec succès côté serveur ?",
              options: [
                "200 OK",
                "201 Created",
                "204 No Content",
                "202 Accepted",
              ],
              correctIndex: 1,
              explanation: "201 Created est le code officiel REST pour signifier qu'une nouvelle entité a été insérée ou générée avec succès.",
            },
            {
              id: 4,
              question: "ì quoi sert express.json() dans une application Express ?",
              options: [
                "ì chiffrer les données de la base de données",
                "ì parser le corps d'une requête HTTP au format JSON et l'affecter à req.body",
                "ì générer des certificats SSL/TLS automatiquement",
                "ì créer une connexion WebSocket persistante",
              ],
              correctIndex: 1,
              explanation: "express.json() est un middleware qui intercepte les flux d'octets entrants avec le header 'application/json' et les transforme en objet JavaScript accessible dans req.body.",
            },
            {
              id: 5,
              question: "Où doit impérativement résider la clé d'API Google Gemini dans une architecture professionnelle ?",
              options: [
                "Dans le code source React du navigateur",
                "Dans une balise meta du fichier index.html",
                "Dans le backend Node.js, stockée dans des variables d'environnement non exposées (.env)",
                "Dans les paramètres de requête de l'URL publique",
              ],
              correctIndex: 2,
              explanation: "Toute clé d'API placée côté client est visible par n'importe quel internaute via les outils de développement (F12). Elle doit toujours rester protégée côté backend.",
            },
          ]}
        />
      </section>

      {/* 10. Checklist de validation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Checklist de validation des compétences
        </h2>
        <InteractiveChecklist
          title="Compétences validées pour le Chapitre 1"
          items={[
            "Je sais expliquer la différence entre le protocole HTTP et le protocole sécurisé HTTPS (TLS).",
            "Je maîtrise le rôle asymétrique du client qui émet la requête et du serveur qui produit la réponse.",
            "Je sais choisir judicieusement entre GET, POST, PUT, PATCH et DELETE.",
            "J'utilise systématiquement les codes de statut HTTP appropriés (200, 201, 204, 400, 401, 403, 404, 500).",
            "Je sais configurer express.json() et gérer les requêtes invalides avec des messages d'erreur explicites.",
          ]}
        />
      </section>
    </div>
  );
};

