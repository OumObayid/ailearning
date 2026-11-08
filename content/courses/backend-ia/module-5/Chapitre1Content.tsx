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

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Comprendre le cache et ses avantages en Backend IA
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
            <span>Définir précisément le concept de cache et la stratégie Cache-Aside (Lazy Loading).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer les événements Cache Hit (succès immédiat) et Cache Miss (recalcul requis).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comparer le stockage en mémoire vive (RAM) et le stockage sur disque persistant.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier les limites strictes d&apos;un cache en variable JavaScript locale dans Node.js.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre les conditions strictes permettant de réutiliser une réponse générée par l&apos;IA.</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que le cache ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que le cache et le pattern Cache-Aside ?
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Le <strong>cache</strong> est une couche de stockage temporaire à haute vitesse (généralement en mémoire vive RAM) qui conserve les résultats de requêtes ou de calculs coûteux pour les restituer instantanément lors des sollicitations futures.
        </p>

        <Callout type="info" title="Le principe fondamental : �0viter le travail redondant">
          Si 1 000 utilisateurs posent à votre API la question <em>« Résume-moi le fonctionnement de Node.js en 5 lignes »</em>, appeler le modèle Gemini 1 000 fois est un gaspillage colossal de quotas, d&apos;argent et de temps (1 000 x 1.8s = 30 minutes de temps cumulé). Avec le cache, le LLM n&apos;est appelé <strong>qu&apos;une seule fois</strong>, et les 999 requêtes suivantes sont servies en 2 millisecondes depuis la mémoire vive !
        </Callout>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src="/images/cours/backend-ia/module-5/ram-memory-hardware.jpg"
                alt="Modules de mémoire vive RAM à accès ultra-rapide"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-center text-xs font-bold text-slate-700">
              Figure 1.1 : La mémoire vive (RAM) offre des temps d&apos;accès de l&apos;ordre de 10 à 50 nanosecondes, soit des milliers de fois plus rapide qu&apos;un disque dur ou un appel réseau distant.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-5/redis-in-memory-datastore.jpg"
                alt="Architecture du store en mémoire Redis entre l'API et la base de données"
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-center text-xs font-bold text-slate-700">
              Figure 1.2 : Schéma du Cache-Aside. L&apos;API consulte Redis en premier : si la clé est présente (Cache Hit), la réponse est immédiate. En cas d&apos;absence (Cache Miss), la base est consultée et Redis est peuplé.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Analyse des données d'impact du cache */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Analyse des données d&apos;impact sur les performances et les coûts
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Examinons les données chiffrées mesurées sur une application de production traitant 10 000 requêtes d&apos;IA avec un taux de réutilisation (Hit Ratio) de 82% :
        </p>

        {/* SVG Diagram: Cache Hit Ratio Data Analysis */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm my-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-5/cache-hit-ratio-data-analysis.svg"
              alt="Analyse des données d'impact du cache Redis sur une API d'IA"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-center text-xs font-bold text-slate-700">
            Figure 1.3 : Tableau de bord analytique. Avec 82% de Cache Hits, 8 240 appels API vers Google Gemini sont économisés, et la latence moyenne passe de 1 850 ms à seulement 2.4 ms.
          </p>
        </div>
      </section>

      {/* 4. Laboratoire Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Expérimentation dans le Laboratoire Interactif
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Ouvrez l&apos;onglet <strong>&quot;Cache-Aside Gemini&quot;</strong> pour déclencher un premier appel (Cache Miss simulé à 1 500 ms), puis relancez le même prompt pour constater la réponse instantanée du cache en 2 ms :
        </p>
        <RedisCacheRateLimitLab />
      </section>

      {/* 5. Cache en variable locale : Pourquoi est-ce insuffisant ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Les limites critiques d&apos;un cache en variable JavaScript locale
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Un développeur débutant stocke souvent le cache dans un simple objet <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">const cache = {}</code>. Voici pourquoi cette pratique est bannie en architecture d&apos;entreprise :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/50 p-4">
            <h4 className="font-black text-rose-950 text-sm">1. Volatilité au redémarrage</h4>
            <p className="mt-2 text-xs text-slate-800 leading-relaxed font-medium">
              Chaque fois que Node.js redémarre (déploiement CI/CD, crash ou mise à jour), la variable s&apos;efface et le cache repart à zéro, provoquant une tempête d&apos;appels simultanés sur MySQL et Gemini.
            </p>
          </div>

          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/50 p-4">
            <h4 className="font-black text-rose-950 text-sm">2. Non partagé en cluster</h4>
            <p className="mt-2 text-xs text-slate-800 leading-relaxed font-medium">
              En production, vous exécutez 4 à 8 workers Node.js (PM2 ou Kubernetes). Chaque worker possède sa propre mémoire isolée : un utilisateur aura un Cache Hit sur le worker 1 et un Cache Miss sur le worker 2 !
            </p>
          </div>

          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/50 p-4">
            <h4 className="font-black text-rose-950 text-sm">3. Risque d&apos;OOM (Out Of Memory)</h4>
            <p className="mt-2 text-xs text-slate-800 leading-relaxed font-medium">
              Sans politique d&apos;éviction automatique (LRU) ni expiration programmée (TTL), l&apos;objet JavaScript grossit indéfiniment jusqu&apos;à saturer la Heap V8 (1.4 Go) et faire crasher le processus.
            </p>
          </div>
        </div>

        <Callout type="tip" title="La solution d'architecture : Redis comme service dédié">
          <strong>Redis</strong> résout ces 3 limites d&apos;un coup : c&apos;est un serveur indépendant en RAM partagé par tous vos processus Node.js, doté d&apos;expiration automatique (TTL) et de politiques d&apos;éviction robustes.
        </Callout>
      </section>

      {/* 6. Démonstration de base en Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Démonstration du mécanisme Cache-Aside en code Express
        </h2>
        <p className="text-base text-slate-950 font-medium">
          Ce serveur illustre le cheminement algorithmique du Cache-Aside avant notre passage à Redis dans le chapitre suivant :
        </p>

        <CodeBlock
          language="javascript"
          filename="cache_aside_demo.js"
          code={`const express = require('express');
const app = express();
app.use(express.json());

// Structure en mémoire temporaire
const memoryCache = new Map();

// Simulation d'une requête MySQL coûteuse de 2 secondes
async function fetchUserFromMySQL(id) {
  console.log(\`[MySQL] Requête SQL SELECT * FROM utilisateurs WHERE id = \${id}...\`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { id, nom: 'Oumaima', role: 'Ingénieur IA', updatedAt: new Date().toISOString() };
}

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  // �0tape 1 : Vérifier la présence dans le cache (Cache-Aside)
  if (memoryCache.has(id)) {
    console.log(\`[Cache HIT] Donnée servie instantanément pour l'id \${id}\`);
    return res.json({
      source: 'Cache en mémoire (0 ms)',
      data: memoryCache.get(id),
    });
  }

  // �0tape 2 : Cache MISS -> Lecture depuis la source de vérité
  console.log(\`[Cache MISS] Récupération requise auprès de MySQL pour l'id \${id}\`);
  const user = await fetchUserFromMySQL(id);

  // �0tape 3 : Enregistrement dans le cache pour les prochains visiteurs
  memoryCache.set(id, user);

  // �0tape 4 : Réponse au client
  res.json({
    source: 'Base de données MySQL (2 000 ms)',
    data: user,
  });
});

app.listen(3000, () => console.log('Serveur Cache-Aside sur http://localhost:3000'));`}
        />
      </section>

      {/* 7. Travaux pratiques */}
      <PracticalWork
        title="Atelier pratique : Implémenter et benchmarker le Cache-Aside"
        objective="Construire l'API de démonstration, effectuer des mesures de temps avec console.time() et Postman, et tester le comportement lors d'une invalidation manuelle."
        steps={[
          "Lancer le serveur cache_aside_demo.js sur le port 3000.",
          "Effectuer un premier appel GET /api/users/10 dans Postman et constater la latence de ~2 000 ms (Cache Miss).",
          "Relancer immédiatement le même appel et constater la réponse instantanée en ~2 ms (Cache Hit).",
          "Ajouter une route DELETE /api/cache/clear vidant le Map avec memoryCache.clear() et vérifier le retour du Cache Miss.",
        ]}
      />

      {/* 8. Quiz */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz d&apos;auto-évaluation
        </h2>
        <QuickQuiz
          title="Validation des acquis : Notions de Cache"
          questions={[
            {
              id: 1,
              question: "Que désigne un 'Cache Hit' dans une architecture logicielle ?",
              options: [
                "L'information demandée est immédiatement trouvée dans le cache sans devoir consulter la base de données ou l'IA",
                "Une cyberattaque ciblant la mémoire du serveur",
                "Une erreur réseau provoquant un échec de connexion",
                "L'effacement complet des données du disque dur",
              ],
              correctIndex: 0,
              explanation: "Un Cache Hit survient lorsque la clé recherchée est déjà présente et valide dans le cache, permettant une réponse quasi-instantanée en mémoire RAM.",
            },
            {
              id: 2,
              question: "Pourquoi est-il déconseillé d'utiliser un simple objet JavaScript global (const cache = {}) comme cache en production ?",
              options: [
                "Car la mémoire n'est pas partagée entre plusieurs processus Node.js et s'efface totalement à chaque redémarrage",
                "Car JavaScript interdit la manipulation d'objets en mémoire",
                "Car les variables globales ralentissent le réseau Wi-Fi",
                "Car cela désactive automatiquement le moteur V8",
              ],
              correctIndex: 0,
              explanation: "Chaque processus Node.js dispose de son propre espace d'adressage Heap mémoire isolé. Un cache en variable locale est invisible pour les autres workers et ne survit à aucun redémarrage.",
            },
            {
              id: 3,
              question: "Comment fonctionne la stratégie de cache 'Cache-Aside' (ou Lazy Loading) ?",
              options: [
                "L'application vérifie d'abord le cache ; si la donnée manque (Cache Miss), elle la lit dans la base et l'écrit dans le cache",
                "La base de données écrit automatiquement dans le cache à chaque milliseconde",
                "Le cache supprime toutes les données dès qu'un utilisateur se connecte",
                "Les données sont conservées uniquement sur le navigateur client",
              ],
              correctIndex: 0,
              explanation: "En Cache-Aside, l'application est maîtresse du flux : elle consulte le cache en priorité et ne sollicite la source lourde qu'en cas d'absence.",
            },
            {
              id: 4,
              question: "Quel est l'impact majeur de la mise en cache des réponses générées par un LLM comme Gemini ?",
              options: [
                "Réduction drastique des coûts d'API, préservation des quotas et latence réduite de plusieurs secondes à quelques millisecondes",
                "Amélioration de la créativité du modèle d'IA",
                "Traduction automatique en toutes les langues",
                "Chiffrement matériel de la carte graphique",
              ],
              correctIndex: 0,
              explanation: "�0viter d'appeler l'API Google pour des requêtes identiques supprime les coûts en tokens et élimine le délai d'inférence (1.5s à 4s).",
            },
            {
              id: 5,
              question: "Dans quelle mémoire matérielle les caches rapides comme Redis stockent-ils leurs données par défaut ?",
              options: [
                "Dans la mémoire vive (RAM)",
                "Sur des bandes magnétiques d'archivage",
                "Sur des disques durs mécaniques 5400 RPM",
                "Dans le BIOS de la carte mère",
              ],
              correctIndex: 0,
              explanation: "La RAM offre des débits de plusieurs dizaines de gigaoctets par seconde et des temps de latence nanométriques, éliminant les lenteurs d'I/O disque.",
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
          title="Compétences validées pour le Chapitre 1"
          items={[
            "Je sais expliquer le principe du cache et le motif d'architecture Cache-Aside.",
            "Je comprends la différence fondamentale entre Cache Hit et Cache Miss.",
            "Je connais les limites critiques d'un cache en variable locale JavaScript (volatilité, isolation cluster, OOM).",
            "J'identifie les gains économiques et de latence apportés par le cache sur les modèles d'IA.",
            "Je comprends pourquoi Redis est le standard de facto pour un cache backend partagé.",
          ]}
        />
      </section>
    </div>
  );
};

