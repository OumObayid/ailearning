'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { RedisCacheRateLimitLab } from '@/components/interactive/RedisCacheRateLimitLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Cache avec expiration (TTL) et invalidation de données
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
            <span>Comprendre le phénomène de cache obsolète (Stale Data) et son risque applicatif.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser le concept de TTL (Time To Live) en secondes et en millisecondes (PTTL).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer formellement l&apos;expiration automatique et l&apos;invalidation manuelle proactive.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre le fonctionnement interne de Redis (éviction passive et active par échantillonnage).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Implémenter un endpoint PATCH synchronisant la mise à jour SQL avec la suppression immédiate de la clé Redis.</span>
          </li>
        </ul>
      </section>

      {/* 2. Le problème du Cache Obsolète */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Le danger du cache obsolète (Stale Cache)
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Mettre une donnée en cache est facile ; <strong>savoir quand la supprimer</strong> constitue l&apos;un des problèmes les plus réputés de l&apos;informatique.
        </p>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Chronologie d&apos;une incohérence sans invalidation :</h3>
          <div className="space-y-3 text-xs font-semibold text-slate-800">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="rounded bg-indigo-600 px-2 py-0.5 font-mono text-white font-bold">10:00</span>
              <span>L&apos;utilisateur 12 consulte son profil. MySQL renvoie <code>nom: &quot;Oumaima&quot;</code>. Redis enregistre la valeur.</span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="rounded bg-indigo-600 px-2 py-0.5 font-mono text-white font-bold">10:02</span>
              <span>L&apos;utilisateur modifie son profil en <code>nom: &quot;Sara&quot;</code> dans MySQL.</span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-rose-300 bg-rose-50 p-3 text-rose-900 font-bold">
              <span className="rounded bg-rose-600 px-2 py-0.5 font-mono text-white font-bold">10:03</span>
              <span>BUG : L&apos;application consulte Redis qui contient encore l&apos;ancien nom &quot;Oumaima&quot;. L&apos;interface affiche une information périmée !</span>
            </div>
          </div>
        </div>

        <Callout type="warning" title="La règle d'or : Expiration + Invalidation Proactive">
          Le <strong>TTL</strong> est un filet de sécurité qui limite la durée maximale d&apos;incohérence si l&apos;invalidation échoue. Mais dans le flux normal, dès qu&apos;une route <code>POST</code>, <code>PUT</code>, <code>PATCH</code> ou <code>DELETE</code> modifie une ressource dans MySQL, le backend doit <strong>immédiatement supprimer la clé de cache correspondante</strong> (<code>await redisClient.del(...)</code>).
        </Callout>
      </section>

      {/* 3. Les commandes TTL dans Redis */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les commandes primitives de gestion du cycle de vie
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-left text-sm font-medium">
            <thead className="border-b border-slate-300 bg-slate-100 text-slate-900 font-black">
              <tr>
                <th className="p-3">Commande</th>
                <th className="p-3">Rôle</th>
                <th className="p-3">Valeur de retour / Effet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-950">
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-700">SET cle val EX 60</td>
                <td className="p-3">Création avec TTL de 60 secondes</td>
                <td className="p-3 font-semibold text-emerald-800">Opération atomique recommandée</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-700">EXPIRE cle 120</td>
                <td className="p-3">Définit ou réinitialise le délai d&apos;une clé existante</td>
                <td className="p-3">1 si la clé existe, 0 sinon</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-700">TTL cle</td>
                <td className="p-3">Consulte le nombre de secondes restantes</td>
                <td className="p-3">
                  <strong>&gt; 0</strong> : secondes restantes<br />
                  <strong className="text-amber-700">-1</strong> : clé persistante sans TTL<br />
                  <strong className="text-rose-700">-2</strong> : clé expirée ou inexistante
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-700">PERSIST cle</td>
                <td className="p-3">Supprime le compte à rebours d&apos;expiration</td>
                <td className="p-3">La clé devient permanente (TTL repasse à -1)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-700">DEL cle</td>
                <td className="p-3 font-semibold">Invalidation manuelle immédiate</td>
                <td className="p-3 text-rose-800 font-bold">1 si supprimée, 0 sinon</td>
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
          Observez le compte à rebours du TTL diminuer en temps réel et testez le bouton d&apos;invalidation immédiate <code>DEL</code> :
        </p>
        <RedisCacheRateLimitLab />
      </section>

      {/* 5. Implémentation complète Node.js Express avec Invalidation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation : Architecture robuste avec invalidation automatique
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Ce code met en �uvre le cycle complet : lecture rapide avec TTL de 60 secondes et invalidation instantanée sur la route de mise à jour <code>PATCH</code> :
        </p>

        <CodeBlock
          language="javascript"
          filename="server-cache-invalidation.js"
          code={`const express = require('express');
const { createClient } = require('redis');

const app = express();
app.use(express.json());

const redisClient = createClient({ url: 'redis://localhost:6379' });

// Base de données simulée (remplacée par pool MySQL en production)
const usersDb = new Map([
  [1, { id: 1, nom: 'Oumaima', ville: 'Casablanca' }],
  [2, { id: 2, nom: 'Sara', ville: 'Rabat' }],
]);

// 1. Lecture avec Cache-Aside et TTL de 60s
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const cacheKey = \`user:\${userId}\`;

    // �0tape A : Recherche dans Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData !== null) {
      return res.json({ source: 'Redis (Cache Hit)', data: JSON.parse(cachedData) });
    }

    // �0tape B : Cache Miss -> Lecture MySQL
    const user = usersDb.get(userId);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });

    // �0tape C : �0criture dans Redis avec TTL de 60 secondes
    await redisClient.set(cacheKey, JSON.stringify(user), { EX: 60 });

    res.json({ source: 'MySQL (Cache Miss)', data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Mutation PATCH : Mise à jour MySQL ET Invalidation immédiate du cache !
app.patch('/api/users/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { nom, ville } = req.body;
    const user = usersDb.get(userId);

    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });

    // �0tape 1 : Mettre à jour la base de données relationnelle
    const updatedUser = {
      ...user,
      ...(nom !== undefined ? { nom } : {}),
      ...(ville !== undefined ? { ville } : {}),
    };
    usersDb.set(userId, updatedUser);

    // �0tape 2 : INVALIDATION IMM�0DIATE DU CACHE REDIS
    await redisClient.del(\`user:\${userId}\`);
    console.log(\`[Cache] Clé user:\${userId} invalidée avec succès.\`);

    res.json({ success: true, message: 'Profil mis à jour et cache invalidé', data: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Inspection du TTL en direct
app.get('/api/cache/:id/ttl', async (req, res) => {
  const ttl = await redisClient.ttl(\`user:\${req.params.id}\`);
  res.json({ key: \`user:\${req.params.id}\`, ttlSeconds: ttl });
});

async function run() {
  await redisClient.connect();
  app.listen(3000, () => console.log('Serveur actif sur http://localhost:3000'));
}
run();`}
        />
      </section>

      {/* 6. Comment Redis nettoie-t-il la mémoire sous le capot ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Mécanique interne : Expiration passive vs active dans Redis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="font-black text-indigo-950 text-sm">1. Expiration Passive (Lazy Eviction)</h4>
            <p className="mt-2 text-xs text-slate-800 leading-relaxed font-medium">
              Lorsqu&apos;un client exécute <code>GET cle</code>, Redis consulte le timestamp d&apos;expiration associé. Si le délai est dépassé, Redis détruit la clé sur-le-champ et renvoie <code>null</code>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="font-black text-indigo-950 text-sm">2. Expiration Active (Sampling)</h4>
            <p className="mt-2 text-xs text-slate-800 leading-relaxed font-medium">
              10 fois par seconde, Redis sélectionne un échantillon aléatoire de clés dotées d&apos;un TTL et élimine toutes les clés périmées. Cela évite que des clés jamais consultées n&apos;encombrent inutilement la mémoire RAM.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Cycle complet d'invalidation de cache après mise à jour"
        objective="Vérifier expérimentalement qu'une mise à jour de profil avec PATCH purge le cache Redis, et observer le retour du Cache Miss garantissant la fraîcheur des données."
        steps={[
          "Lancer le serveur server-cache-invalidation.js.",
          "Consulter GET /api/users/1 (Cache Miss initial puis Cache Hit à l'appel suivant avec nom 'Oumaima').",
          "Envoyer un appel PATCH /api/users/1 avec { nom: 'Sara' } et vérifier que la clé est purgée via DEL.",
          "Re-consulter immédiatement GET /api/users/1 et constater le retour du nouveau nom 'Sara' sans aucune désynchronisation.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Expiration TTL & Invalidation"
          questions={[
            {
              id: 1,
              question: "Quelle valeur numérique la commande 'TTL ma_cle' renvoie-t-elle si la clé demandée n'existe pas ou est déjà expirée ?",
              options: [
                "-2",
                "-1",
                "0",
                "null",
              ],
              correctIndex: 0,
              explanation: "La convention Redis est : un entier positif = secondes restantes, -1 = la clé existe sans expiration, et -2 = la clé n'existe pas (expirée ou supprimée).",
            },
            {
              id: 2,
              question: "Pourquoi ne doit-on pas compter uniquement sur le TTL pour garder les données du cache à jour ?",
              options: [
                "Parce qu'entre le moment de la modification en base et la fin du TTL, l'application afficherait des informations périmées (Stale Data)",
                "Car le TTL est désactivé le soir",
                "Car le TTL consomme trop d'électricité",
                "Parce que Redis refuse les TTL supérieurs à 10 secondes",
              ],
              correctIndex: 0,
              explanation: "Le TTL n'est qu'un délai d'expiration passif. Dès qu'une modification survient dans la source de vérité (MySQL), le backend doit invalider immédiatement le cache avec DEL.",
            },
            {
              id: 3,
              question: "Quelle commande Redis permet d'annuler l'expiration d'une clé pour la rendre permanente ?",
              options: [
                "PERSIST cle",
                "STOP EXPIRE cle",
                "FREEZE cle",
                "KEEP cle",
              ],
              correctIndex: 0,
              explanation: "PERSIST supprime le délai d'expiration d'une clé. Son TTL repasse à -1 et elle ne sera plus supprimée automatiquement.",
            },
            {
              id: 4,
              question: "Que se passe-t-il si un utilisateur tente de lire une clé dont le délai d'expiration est atteint depuis 2 secondes (Expiration passive) ?",
              options: [
                "Redis détecte l'expiration au moment du GET, détruit la clé en RAM et retourne null",
                "Redis redémarre le serveur",
                "La requête reste bloquée pendant 1 minute",
                "L'ancienne donnée est quand même renvoyée",
              ],
              correctIndex: 0,
              explanation: "C'est l'expiration passive (Lazy Expiration) : Redis teste le timestamp au moment de l'accès et détruit la clé immédiatement.",
            },
            {
              id: 5,
              question: "Quelle est la bonne pratique de nommage pour structurer logiquement les clés dans Redis ?",
              options: [
                "Utiliser des deux-points comme séparateurs de domaines : ex: user:12:profile ou ai:explanation:hash",
                "Mettre toutes les clés en minuscules sans séparateur",
                "Utiliser des espaces dans les noms de clés",
                "Ne donner que des numéros aléatoires",
              ],
              correctIndex: 0,
              explanation: "La convention universelle Redis utilise le symbole deux-points ':' pour créer des espaces de noms hiérarchiques clairs et faciles à filtrer avec SCAN.",
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
          title="Compétences validées pour le Chapitre 3"
          items={[
            "Je comprends le problème de désynchronisation de données (Stale Cache) et le rôle du TTL.",
            "Je maîtrise la commande SET cle val EX sec et la consultation avec TTL cle.",
            "Je connais la signification exacte des retours de TTL (> 0, -1, -2).",
            "J'applique l'invalidation proactive avec redisClient.del() lors de chaque mutation de données.",
            "Je structure mes clés Redis selon les conventions de namespaces (domaine:id:attribut).",
          ]}
        />
      </section>
    </div>
  );
};

