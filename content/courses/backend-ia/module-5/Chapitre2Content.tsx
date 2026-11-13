'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { RedisCacheRateLimitLab } from '@/components/interactive/RedisCacheRateLimitLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 w-full max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words [overflow-wrap:anywhere] min-w-0">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Caching &amp; Performance Redis</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Redis : Installation, commandes clés et connexion Node.js
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
            <span>Comprendre le rôle de Redis en complémentarité avec MySQL.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Déployer un conteneur Redis officiel avec Docker sur le port standard 6379.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser les commandes en ligne de commande redis-cli (PING, SET, GET, DEL, EXISTS).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Connecter Node.js avec le client npm officiel redis et gérer le cycle de vie de connexion.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Sérialiser et désérialiser des objets JavaScript complexes avec JSON.stringify et JSON.parse.</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que Redis & Comparatif avec MySQL */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que Redis et quelle est sa différence avec MySQL ?
        </h2>
        <div className="space-y-4 my-4 min-w-0 max-w-full">
          {/* Bloc 1 : Logo & présentation Redis */}
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm flex flex-col items-center justify-center text-center break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            <div className="relative aspect-square w-32 overflow-hidden rounded-xl bg-slate-50">
              <Image
                src="/images/cours/backend-ia/module-5/redis-logo-cube.jpg"
                alt="Logo officiel Redis"
                fill
                className="object-contain p-2"
              />
            </div>
            <h4 className="mt-3 font-black text-slate-950 text-base">Redis In-Memory</h4>
            <p className="mt-1 text-xs text-slate-700 font-medium">Remote Dictionary Server — Structure Clé-Valeur en RAM</p>
          </div>

          {/* Bloc 2 : Tableau comparatif Redis vs MySQL */}
          <div className="overflow-x-auto rounded-xl border border-slate-300 min-w-0 max-w-full bg-white shadow-sm">
            <table className="w-full text-left text-xs font-medium table-auto break-words [overflow-wrap:anywhere]">
              <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
                <tr>
                  <th className="p-3">Critère</th>
                  <th className="p-3">Redis</th>
                  <th className="p-3">MySQL (InnoDB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
                <tr>
                  <td className="p-3 font-bold">Emplacement primaire</td>
                  <td className="p-3 font-black text-emerald-700">Mémoire vive (RAM)</td>
                  <td className="p-3 font-semibold">Disque dur (SSD / NVMe)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Latence d&apos;accès</td>
                  <td className="p-3 font-black text-emerald-700">&lt; 1 milliseconde</td>
                  <td className="p-3 font-semibold">1 à 50 millisecondes</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Modèle de données</td>
                  <td className="p-3">Clés, chaînes, listes, sets, hash</td>
                  <td className="p-3">Tables relationnelles, schémas typés</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Requêtes complexes</td>
                  <td className="p-3 text-amber-700">Accès direct par clé (Pas de SQL)</td>
                  <td className="p-3 font-black text-emerald-700">SQL complet, JOIN, agrégations</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Rôle dans le projet</td>
                  <td className="p-3 font-black text-indigo-700">Cache accélérateur &amp; Rate Limiting</td>
                  <td className="p-3 font-black text-indigo-700">Source de vérité permanente (BDD)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Déploiement avec Docker Desktop */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Déploiement local de Redis avec Docker Desktop
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Sous Windows, la méthode la plus propre et la plus robuste pour faire tourner Redis consiste à exécuter le conteneur officiel via Docker :
        </p>

        <CodeBlock
          language="bash"
          filename="docker_redis_start.sh"
          code={`# 1. Télécharger et démarrer le conteneur officiel Redis sur le port 6379
docker run -d --name redis-formation -p 6379:6379 redis:latest

# 2. Vérifier que le conteneur est en état de fonctionnement ("Up")
docker ps

# 3. Ouvrir le terminal interactif redis-cli à l'intérieur du conteneur
docker exec -it redis-formation redis-cli`}
        />

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm my-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
            <Image
              src="/images/cours/backend-ia/module-5/docker-desktop-redis.jpg"
              alt="Interface Docker Desktop montrant le conteneur Redis en cours d'exécution sur le port 6379"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-center text-xs font-bold text-slate-700">
            Figure 2.1 : Tableau de bord Docker Desktop. Le conteneur Redis est actif et écoute sur le port local 6379.
          </p>
        </div>
      </section>

      {/* 4. Les commandes clés dans redis-cli */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Guide des commandes indispensables dans redis-cli
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Commande</th>
                <th className="p-3">Rôle</th>
                <th className="p-3">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-700">PING</td>
                <td className="p-3 font-semibold">Vérifie la santé de la liaison réseau</td>
                <td className="p-3 font-mono text-xs">PING $\rightarrow$ PONG</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-700">SET clé valeur</td>
                <td className="p-3 font-semibold">Enregistre ou remplace une clé</td>
                <td className="p-3 font-mono text-xs">SET user:1 &quot;Oumaima&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-700">GET clé</td>
                <td className="p-3 font-semibold">Récupère la valeur associée</td>
                <td className="p-3 font-mono text-xs">GET user:1 $\rightarrow$ &quot;Oumaima&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-700">EXISTS clé</td>
                <td className="p-3 font-semibold">Teste l&apos;existence (1 = oui, 0 = non)</td>
                <td className="p-3 font-mono text-xs">EXISTS user:1 $\rightarrow$ (integer) 1</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-700">DEL clé</td>
                <td className="p-3 font-semibold">Supprime immédiatement la clé (Invalidation)</td>
                <td className="p-3 font-mono text-xs">DEL user:1 $\rightarrow$ (integer) 1</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-amber-700">SET ... EX sec</td>
                <td className="p-3 font-semibold">Définit la valeur et le TTL en une opération atomique</td>
                <td className="p-3 font-mono text-xs">SET token:abc &quot;valid&quot; EX 300</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="Évitez KEYS * en production !">
          La commande <code>KEYS *</code> parcourt la totalité de la base Redis de manière synchrone. Si votre cache contient 500 000 clés, cela <strong>gèle l&apos;Event Loop de Redis</strong> pendant plusieurs secondes. En environnement de production, privilégiez toujours la commande non bloquante <code>SCAN 0 MATCH motif* COUNT 100</code>.
        </Callout>
      </section>

      {/* 5. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Expérimentation dans le Laboratoire Interactif
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Testez le comportement de stockage et d&apos;expiration des clés dans notre simulateur interactif :
        </p>
        <RedisCacheRateLimitLab />
      </section>

      {/* 6. Intégration Express avec le client npm redis */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Création d&apos;une API Express connectée à Redis
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Voici le serveur Express de production exploitant le client officiel <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">redis</code> (version 4+) avec promesses natives :
        </p>

        <CodeBlock
          language="javascript"
          filename="server-redis-crud.js"
          code={`const express = require('express');
const dotenv = require('dotenv');
const { createClient } = require('redis');

dotenv.config();
const app = express();
app.use(express.json());

// 1. Initialisation du client Redis
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('[Redis] Erreur client:', err.message));
redisClient.on('reconnecting', () => console.log('[Redis] Reconnexion au serveur en cours...'));

// 2. Route POST : Enregistrer une donnée en cache
app.post('/api/cache', async (req, res) => {
  try {
    const { key, value, ttlSeconds } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ success: false, message: 'La clé et la valeur sont requises.' });
    }

    // Sérialisation obligatoire en chaîne JSON
    const payload = JSON.stringify(value);

    if (ttlSeconds && Number(ttlSeconds) > 0) {
      // Écriture avec TTL atomique (EX)
      await redisClient.set(key, payload, { EX: Number(ttlSeconds) });
    } else {
      await redisClient.set(key, payload);
    }

    res.json({ success: true, message: \`Clé \${key} enregistrée dans Redis\` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erreur d\\'écriture Redis' });
  }
});

// 3. Route GET : Récupérer une donnée du cache
app.get('/api/cache/:key', async (req, res) => {
  try {
    const rawData = await redisClient.get(req.params.key);

    if (rawData === null) {
      return res.status(404).json({ success: false, message: 'Clé absente du cache (Cache Miss)' });
    }

    // Désérialisation inverse
    res.json({
      success: true,
      source: 'Redis RAM',
      data: JSON.parse(rawData),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erreur de lecture Redis' });
  }
});

// 4. Route DELETE : Invalider manuellement une clé
app.delete('/api/cache/:key', async (req, res) => {
  try {
    const deletedCount = await redisClient.del(req.params.key);
    res.json({ success: true, deleted: deletedCount === 1 });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erreur de suppression Redis' });
  }
});

// 5. Démarrage asynchrone sécurisé
async function start() {
  try {
    await redisClient.connect();
    console.log('Connexion établie avec le serveur Redis sur le port 6379');
    app.listen(3000, () => console.log('API opérationnelle sur http://localhost:3000'));
  } catch (err) {
    console.error('Échec critique de démarrage:', err);
    process.exit(1);
  }
}

start();`}
        />
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Déploiement et tests CRUD complets avec redis-cli"
        objective="Lancer Redis dans Docker, manipuler les structures en console redis-cli, tester l'API Express avec Postman et vérifier la disparition d'une clé après expiration."
        steps={[
          "Lancer le conteneur Docker avec docker run -d --name redis-formation -p 6379:6379 redis:latest.",
          "Ouvrir redis-cli avec docker exec -it redis-formation redis-cli et taper PING.",
          "Enregistrer une clé test avec SET formation 'Backend IA' EX 30 et surveiller son décompte avec TTL formation.",
          "Tester l'API Express avec Postman en envoyant un POST /api/cache puis un GET /api/cache/formation.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Fondamentaux de Redis"
          questions={[
            {
              id: 1,
              question: "Quel est le port réseau standard par défaut utilisé par le serveur Redis ?",
              options: [
                "6379",
                "3306",
                "8080",
                "27017",
              ],
              correctIndex: 0,
              explanation: "6379 est le port par défaut de Redis (3306 est celui de MySQL et 27017 celui de MongoDB).",
            },
            {
              id: 2,
              question: "Quelle commande Redis permet d'enregistrer une valeur et de lui attribuer une expiration de 60 secondes en une seule commande atomique ?",
              options: [
                "SET cle valeur EX 60",
                "EXPIRE cle 60",
                "PUT cle valeur 60s",
                "SAVE cle valeur --ttl 60",
              ],
              correctIndex: 0,
              explanation: "SET ... EX 60 garantit que la clé et son délai d'expiration sont écrits en une seule opération atomique.",
            },
            {
              id: 3,
              question: "Que retourne la commande 'GET cle' dans le client Node.js si la clé demandée n'existe pas ou est expirée ?",
              options: [
                "null",
                "undefined",
                "Une erreur fatale qui fait crasher le serveur",
                "Un objet vide {}",
              ],
              correctIndex: 0,
              explanation: "Le client officiel Node.js renvoie la valeur primitive 'null' lorsque la clé n'existe pas dans la base Redis.",
            },
            {
              id: 4,
              question: "Pourquoi sérialise-t-on les objets JavaScript avec JSON.stringify() avant de les passer à redisClient.set() ?",
              options: [
                "Parce que Redis stocke les chaînes de texte brutes et ne gère pas nativement les objets d'exécution JavaScript",
                "Pour chiffrer les données",
                "Pour changer la police de texte",
                "Pour créer une table SQL",
              ],
              correctIndex: 0,
              explanation: "Redis est agnostique du langage : il stocke des chaînes d'octets ou de texte. Il faut donc sérialiser en JSON avant l'écriture et faire JSON.parse() à la lecture.",
            },
            {
              id: 5,
              question: "Pourquoi déconseille-t-on formellement l'utilisation de 'KEYS *' sur un serveur de production ?",
              options: [
                "Parce qu'elle bloque le thread principal de Redis le temps de parcourir toutes les clés, paralysant toutes les requêtes en vol",
                "Car la commande supprime les données",
                "Car elle coûte cher sur la facture électrique",
                "Car elle n'est disponible que sous Linux",
              ],
              correctIndex: 0,
              explanation: "Redis est mono-threadé pour le traitement des commandes. KEYS * est bloquante et gèle le serveur. Il faut toujours utiliser la commande itérative non bloquante SCAN.",
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
            "Je sais lancer et gérer un serveur Redis avec Docker Desktop sous Windows.",
            "Je maîtrise les commandes essentielles dans redis-cli (PING, SET, GET, DEL, EXISTS, TTL).",
            "Je comprends pourquoi Redis stocke en mémoire RAM et complète la base MySQL.",
            "Je sais connecter le package officiel redis à une application Express.",
            "Je maîtrise la sérialisation JSON pour stocker des objets structurés complexes dans Redis.",
          ]}
        />
      </section>
    </div>
  );
};

