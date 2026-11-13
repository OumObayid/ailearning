'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type HttpScenarioKey = 'post_created' | 'missing_content_type' | 'fake_200_error' | 'wrong_method';

interface HttpScenario {
  title: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  badge: string;
  badgeColor: string;
  requestRaw: string;
  responseRaw: string;
  analysis: string;
  debuggingTip: string;
}

const HTTP_SCENARIOS: Record<HttpScenarioKey, HttpScenario> = {
  post_created: {
    title: '1. Création nominale de ressource (POST 201 Created)',
    method: 'POST',
    endpoint: '/api/users',
    badge: 'Nominal REST',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    requestRaw: `POST /api/users HTTP/1.1
Host: api.monsite.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...
Accept: application/json

{
  "name": "Sarah",
  "email": "sarah@example.com"
}`,
    responseRaw: `HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Location: /api/users/42
Date: Mon, 09 Nov 2026 09:30:00 GMT

{
  "success": true,
  "data": {
    "id": 42,
    "name": "Sarah",
    "email": "sarah@example.com",
    "createdAt": "2026-11-09T09:30:00.000Z"
  }
}`,
    analysis: 'La transaction respecte scrupuleusement les règles de l\'art REST : méthode POST pour la création, Content-Type explicite pour que Express.json() décode le body, et code HTTP 201 Created avec l\'en-tête Location pointant vers le nouvel enregistrement.',
    debuggingTip: 'En mode nominal, inspectez toujours l\'onglet Network de DevTools pour vous assurer que le payload JSON émis correspond exactement aux types attendus par le validateur backend.'
  },
  missing_content_type: {
    title: '2. Le piège du Content-Type manquant (req.body undefined)',
    method: 'POST',
    endpoint: '/api/orders',
    badge: 'Bogue Frontend Récurrent',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    requestRaw: `POST /api/orders HTTP/1.1
Host: api.monsite.com
User-Agent: Mozilla/5.0...
Authorization: Bearer eyJhbGciOi...
/* 💥 Oubli du header 'Content-Type: application/json' ! */

{"productId": 101, "quantity": 2}`,
    responseRaw: `HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "success": false,
  "error": "TypeError: Cannot read properties of undefined (reading 'productId')"
}`,
    analysis: 'Le client fetch a envoyé un corps textuel sans déclarer "Content-Type: application/json". Par conséquent, le middleware express.json() du backend a ignoré le flux. Dans le contrôleur Express, req.body valait undefined !',
    debuggingTip: 'Dans votre code client (React, Vue, mobile), veillez à toujours ajouter headers: { "Content-Type": "application/json" } dès que vous transmettez un objet via JSON.stringify().'
  },
  fake_200_error: {
    title: '3. Le statut HTTP "menteur" (200 OK avec échec métier)',
    method: 'POST',
    endpoint: '/api/checkout',
    badge: 'Anti-Pattern d\'Ingénierie',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    requestRaw: `POST /api/checkout HTTP/1.1
Host: api.monsite.com
Content-Type: application/json

{"amount": 500, "accountId": "acc-99"}`,
    responseRaw: `HTTP/1.1 200 OK   <-- 💥 STATUT MENTEUR !
Content-Type: application/json

{
  "success": false,
  "error": "Solde insuffisant pour finaliser le débit"
}`,
    analysis: 'Le serveur a intercepté une erreur métier (fonds insuffisants) mais a répondu avec le statut HTTP 200 OK au lieu de 400 ou 402 ! Côté client, response.ok vaut true et les intercepteurs d\'erreurs réseau ne se déclenchent pas.',
    debuggingTip: 'Bannissez les statuts HTTP menteurs. Si une transaction échoue, le serveur doit obligatoirement émettre un code 4xx ou 5xx correspondant pour que le monitoring et le frontend puissent réagir fidèlement.'
  },
  wrong_method: {
    title: '4. Erreur de méthode sémantique (GET au lieu de DELETE)',
    method: 'GET',
    endpoint: '/api/users/delete/42',
    badge: 'Violation REST',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    requestRaw: `GET /api/users/delete/42 HTTP/1.1
Host: api.monsite.com
Accept: text/html,application/json

/* 💥 Utilisation d'un verbe dans l'URL avec méthode GET ! */`,
    responseRaw: `HTTP/1.1 404 Not Found  (ou 405 Method Not Allowed)
Content-Type: application/json

{
  "success": false,
  "message": "Cannot GET /api/users/delete/42"
}`,
    analysis: 'L\'API suit les conventions REST où l\'URI identifie la ressource (/api/users/42) et la méthode HTTP porte l\'action (DELETE). Envoyer un GET avec le mot "delete" dans l\'URL déclenche un 404 car la route n\'existe pas.',
    debuggingTip: 'Utilisez la méthode standard : DELETE /api/users/42. Les méthodes GET doivent rester "safe" (en lecture seule sans altération de l\'état de la base de données).'
  }
};

export const Chapitre1Content: React.FC = () => {
  const [activeScenarioKey, setActiveScenarioKey] = useState<HttpScenarioKey>('post_created');
  const activeScenario = HTTP_SCENARIOS[activeScenarioKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 4 — Débogage des API et du Backend</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Comprendre le fonctionnement des requêtes HTTP : Du Client au Backend
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Pourquoi une requête qui semble parfaite dans le composant React ne déclenche-t-elle aucune route dans Express ? Pourquoi l&apos;omission d&apos;un simple en-tête <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">Content-Type</code> laisse-t-il <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">req.body</code> totalement indéfini ? Comment isoler avec certitude l&apos;origine d&apos;une panne entre le code client, le réseau, le reverse proxy et le serveur MySQL ? Maîtrisez le cycle de vie complet d&apos;une transaction HTTP.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le parcours physique et logique d&apos;une transaction HTTP (React → Nginx → Express → MySQL).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Disséquer l&apos;anatomie des 4 blocs d&apos;une requête et des 3 blocs d&apos;une réponse (RFC 9112).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser la sémantique REST et les règles d&apos;idempotence (GET, POST, PUT, PATCH, DELETE).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déceler les statuts menteurs HTTP 200 et isoler l&apos;origine d&apos;une panne en 3 étapes de diagnostic.</span>
          </div>
        </div>
      </section>

      {/* 2. Trajet complet de la communication HTTP */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Trajet complet d&apos;une communication HTTP : Du navigateur à MySQL
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Dans une architecture logicielle moderne, le navigateur web ne communique <strong>jamais directement</strong> avec la base de données relationnelle. Le serveur Node.js / Express fait office de frontière sécurisée, d&apos;authentificateur et de coordinateur de données.
        </p>

        {/* Parcours architectural en 5 étapes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-mono text-xs">1</span>
              <span>Client (React / Vue)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              L&apos;application frontend déclenche <code className="font-mono text-xs font-bold text-emerald-800">fetch()</code> ou Axios. Elle sérialise l&apos;objet en JSON et forge les en-têtes HTTP (Authorization, Content-Type).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-mono text-xs">2</span>
              <span>Réseau &amp; Reverse Proxy</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Résolution DNS, terminaison TLS (HTTPS), négociation CORS et répartition de charge (Nginx, Cloudflare) avant d&apos;atteindre le serveur d&apos;application.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center font-mono text-xs">3</span>
              <span>Backend (Express.js)</span>
            </div>
            <p className="text-emerald-900 leading-relaxed">
              Le flux passe dans la chaîne des middlewares : validation de session JWT, décodage du corps avec <code className="font-mono text-xs">express.json()</code> et logique métier.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-mono text-xs">4</span>
              <span>Base (MySQL / Pool)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Le pilote <code className="font-mono text-xs">mysql2/promise</code> emprunte une connexion dans le pool, exécute la requête préparée et retourne les lignes persistées.
            </p>
          </div>
        </div>

        {/* Métaphore du coursier et du sas */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-sm text-amber-950 space-y-1 mt-4">
          <span className="font-bold text-xs uppercase tracking-wider text-amber-900 block font-sans">
            Métaphore pédagogique du coursier et du bâtiment sécurisé :
          </span>
          <p className="leading-relaxed">
            Considérez la requête HTTP comme un colis postal remis par un coursier à l&apos;accueil d&apos;une banque (le serveur Express). L&apos;accueil vérifie d&apos;abord le badge du coursier (Header Authorization), examine le bon de livraison (Header Content-Type), inspecte le contenu du colis (req.body), puis demande au coffre-fort souterrain (MySQL) de ranger la marchandise. L&apos;accueil tamponne ensuite un accusé de réception officiel (Code 201 Created) et remet le paquet scellé au coursier.
          </p>
        </div>
      </section>

      {/* 3. Anatomie détaillée Requête vs Réponse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Anatomie détaillée d&apos;une Requête et d&apos;une Réponse HTTP (RFC 9112)
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Le protocole HTTP est textuel et sans état (<em>stateless</em>). Chaque échange respecte une structure standardisée divisée en blocs stricts séparés par des sauts de ligne spécifiques (<code className="font-mono text-xs">\r\n</code>).
        </p>

        {/* Les 2 blocs Requête vs Réponse */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Requête */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-emerald-400 uppercase text-xs">Les 4 Blocs d&apos;une Requête HTTP :</span>
              <span className="text-[11px] text-emerald-300 font-bold">Émis par le Client</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto leading-relaxed">{`// 1. LIGNE DE COMMANDE (Méthode + URI + Version) :
POST /api/users HTTP/1.1

// 2. EN-TÊTES (Headers) Clé: Valeur :
Host: api.monsite.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...
Accept: application/json

// 3. LIGNE VIDE SÉPARATRICE (Obligatoire !)

// 4. CORPS DU MESSAGE (Body / Payload) :
{
  "name": "Sarah",
  "email": "sarah@example.com"
}`}</pre>
          </div>

          {/* Réponse */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-sky-400 uppercase text-xs">Les 3 Blocs d&apos;une Réponse HTTP :</span>
              <span className="text-[11px] text-sky-300 font-bold">Retourné par le Serveur</span>
            </div>
            <pre className="text-slate-300 text-xs overflow-x-auto leading-relaxed">{`// 1. LIGNE DE STATUT (Version + Code + Raison) :
HTTP/1.1 201 Created

// 2. EN-TÊTES DE RÉPONSE :
Content-Type: application/json; charset=utf-8
Location: /api/users/42
Date: Mon, 09 Nov 2026 09:30:00 GMT

// 3. CORPS DE RÉPONSE (Body JSON) :
{
  "success": true,
  "data": { "id": 42, "name": "Sarah" }
}`}</pre>
          </div>
        </div>

        {/* Le piège du statut menteur */}
        <Callout type="danger" title="L'illusion toxique du statut HTTP '200 OK'">
          <p className="text-sm leading-relaxed">
            Un code HTTP <code className="font-mono font-bold">200 OK</code> signifie uniquement que le serveur web a pu router le paquet et envoyer une réponse réseau. Si le contrôleur intercepte un crash ou un solde insuffisant et répond <code className="font-mono font-bold">res.status(200).json(&#123; success: false, error: &quot;Solde épuisé&quot; &#125;)</code>, vous trompez vos outils de monitoring et le frontend ! Pour le navigateur, <code className="font-mono font-bold">response.ok</code> vaut <code className="font-mono text-emerald-700 font-bold">true</code>, et aucune alerte d&apos;incident n&apos;est déclenchée.
          </p>
        </Callout>
      </section>

      {/* 4. Matrice sémantique REST et Idempotence */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Matrice sémantique des méthodes HTTP et règles d&apos;idempotence
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          En architecture REST, les URI désignent des <strong>ressources</strong> (noms au pluriel, ex: <code className="font-mono text-xs">/api/orders</code>) tandis que la <strong>méthode HTTP</strong> dicte l&apos;action à accomplir. Deux critères fondamentaux régissent ces méthodes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 font-mono text-xs uppercase text-emerald-800 block">Propriété 1 : Sécurité (Safe)</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Une méthode est dite <em>sûre</em> si son invocation n&apos;altère en aucun cas l&apos;état du serveur (lecture pure). Les navigateurs et moteurs de recherche peuvent les pré-charger ou les relancer en toute sécurité.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 font-mono text-xs uppercase text-emerald-800 block">Propriété 2 : Idempotence (Idempotent)</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Une méthode est dite <em>idempotente</em> si exécuter $N$ fois la même requête produit <strong>exactement le même état final</strong> sur le serveur qu&apos;une seule exécution (ex: supprimer la ressource 42 dix fois de suite laisse la ressource 42 supprimée).
            </p>
          </div>
        </div>

        {/* Tableau comparatif des méthodes */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm mt-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Méthode</th>
                <th className="p-3.5 border-b border-slate-200">Action sémantique</th>
                <th className="p-3.5 border-b border-slate-200">Sécurité (Safe)</th>
                <th className="p-3.5 border-b border-slate-200">Idempotence</th>
                <th className="p-3.5 border-b border-slate-200">Présence de Body JSON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-blue-700">GET</td>
                <td className="p-3.5 font-sans">Lecture sans modification</td>
                <td className="p-3.5 text-emerald-700 font-bold">Oui</td>
                <td className="p-3.5 text-emerald-700 font-bold">Oui</td>
                <td className="p-3.5 text-rose-700 font-sans">Non recommandé (Ignoré)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-emerald-700">POST</td>
                <td className="p-3.5 font-sans">Création d&apos;une nouvelle ressource</td>
                <td className="p-3.5 text-rose-700 font-bold">Non</td>
                <td className="p-3.5 text-rose-700 font-bold">Non (Effet de bord cumulatif)</td>
                <td className="p-3.5 text-emerald-700 font-sans font-bold">Oui (Obligatoire)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-amber-700">PUT</td>
                <td className="p-3.5 font-sans">Remplacement complet d&apos;une ressource existante</td>
                <td className="p-3.5 text-rose-700 font-bold">Non</td>
                <td className="p-3.5 text-emerald-700 font-bold">Oui</td>
                <td className="p-3.5 text-emerald-700 font-sans font-bold">Oui (Payload exhaustif)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-purple-700">PATCH</td>
                <td className="p-3.5 font-sans">Modification partielle d&apos;un ou plusieurs champs</td>
                <td className="p-3.5 text-rose-700 font-bold">Non</td>
                <td className="p-3.5 text-amber-700 font-bold">Non garanti</td>
                <td className="p-3.5 text-emerald-700 font-sans font-bold">Oui (Diff partiel)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-rose-700">DELETE</td>
                <td className="p-3.5 font-sans">Suppression définitive d&apos;une ressource</td>
                <td className="p-3.5 text-rose-700 font-bold">Non</td>
                <td className="p-3.5 text-emerald-700 font-bold">Oui</td>
                <td className="p-3.5 text-slate-500 font-sans">Optionnel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Simulateur Interactif : Inspecteur de Flux HTTP */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5 text-lime-700" />
              <span>5. Laboratoire Interactif : Inspecteur de Transactions HTTP</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sélectionnez une transaction client-serveur pour disséquer les en-têtes bruts émis et la réponse HTTP correspondante.
            </p>
          </div>
        </div>

        {/* Boutons sélecteurs de scénarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {(Object.keys(HTTP_SCENARIOS) as HttpScenarioKey[]).map((key) => {
            const sc = HTTP_SCENARIOS[key];
            const isSelected = activeScenarioKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveScenarioKey(key)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-lime-300 border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border inline-block mb-1 ${sc.badgeColor}`}>
                  {sc.method}
                </span>
                <div className="text-xs font-mono font-bold truncate">{sc.title}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'inspection en direct */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Transaction inspectée :</span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activeScenario.title}
              </h3>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${activeScenario.badgeColor}`}>
              {activeScenario.badge}
            </span>
          </div>

          {/* Grille Requête brute vs Réponse brute */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Trame Requête Client (Headers + Body) :
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {activeScenario.requestRaw}
              </pre>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Trame Réponse Serveur (Status + Headers + Body) :
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {activeScenario.responseRaw}
              </pre>
            </div>
          </div>

          {/* Analyse et Conseil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-sans text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[11px] block">Analyse du comportement réseau :</span>
              <p className="text-slate-300 leading-relaxed">{activeScenario.analysis}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-1">
              <span className="text-emerald-400 font-bold uppercase text-[11px] block flex items-center gap-1.5">
                <Icon name="check" className="w-3.5 h-3.5 text-emerald-400" />
                <span>Règle d&apos;ingénierie et diagnostic :</span>
              </span>
              <p className="text-emerald-200 leading-relaxed">{activeScenario.debuggingTip}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Travaux Pratiques : Méthode d'isolation d'une panne en 3 étapes */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            6. Travaux Pratiques — Protocole d&apos;isolation d&apos;une panne API en 3 étapes
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Lorsqu&apos;un utilisateur rapporte : <em>&quot;Le bouton de paiement ne fonctionne pas&quot;</em>, un ingénieur ne se contente pas de lire le code au hasard. Il applique un protocole d&apos;entonnoir en trois étapes pour localiser immédiatement le maillon défaillant :
        </p>

        {/* Les 3 étapes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-mono text-xs">Étape 1</span>
              <span>Inspecter DevTools Network</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Ouvrez l&apos;onglet <strong>Network</strong> de Chrome. La requête part-elle ? Quel est son statut ? Si le statut est <code className="font-mono text-rose-700 font-bold">(failed) net::ERR_CONNECTION_REFUSED</code>, le serveur Express est éteint. Si elle renvoie 400 ou 401, lisez le corps JSON de la réponse.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-mono text-xs">Étape 2</span>
              <span>Isoler l&apos;API avec Postman / cURL</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Rejouez la même requête directement dans Postman ou via <code className="font-mono text-xs">curl</code>. Si Postman réussit mais que le navigateur échoue, le bogue réside dans le code frontend React (CORS, token non injecté, Content-Type absent).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-mono text-xs">Étape 3</span>
              <span>Inspecter les logs serveur &amp; SQL</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Consultez le terminal du serveur Node.js ou vos fichiers de logs Winston. La requête est-elle arrivée au routeur ? Une exception SQL (syntaxe, contrainte) a-t-elle été rejetée par le pool MySQL ?
            </p>
          </div>
        </div>

        {/* Code source de test défensif */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Exemple de client HTTP défensif en TypeScript (React)</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="safe-api-client.ts"
            code={`interface OrderPayload {
  productId: number;
  quantity: number;
}

export async function submitOrder(orderData: OrderPayload) {
  try {
    // 1. Forge rigoureuse des en-têtes et du payload sérialisé :
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": \`Bearer \${localStorage.getItem("jwt_token")}\`
      },
      body: JSON.stringify(orderData)
    });

    // 2. Détection immédiate des échecs HTTP (codes 4xx et 5xx) :
    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({ message: "Erreur serveur inconnue" }));
      throw new Error(\`Erreur HTTP \${response.status} : \${errorResponse.message || response.statusText}\`);
    }

    // 3. Extraction sécurisée du résultat JSON :
    return await response.json();
  } catch (error) {
    console.error("[ÉCHEC COMMANDE]", error);
    throw error;
  }
}`}
          />
        </div>
      </section>

      {/* 7. Synthèse : La Check-list Anti-Bogue HTTP */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Synthèse : Les 4 Règles d&apos;Or des Transactions HTTP
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : Toujours déclarer Content-Type: application/json</span>
            <p className="text-xs text-slate-700">Sans cet en-tête, Express ne décode pas le corps de votre requête et <code className="font-mono">req.body</code> reste <code className="font-mono">undefined</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : Aucun statut HTTP menteur</span>
            <p className="text-xs text-slate-700">Ne renvoyez jamais <code className="font-mono">200 OK</code> pour une opération rejetée. Utilisez les codes sémantiques réels (<code className="font-mono">400</code>, <code className="font-mono">401</code>, <code className="font-mono">403</code>, <code className="font-mono">404</code>, <code className="font-mono">409</code>, <code className="font-mono">500</code>).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : Respecter l&apos;Idempotence</span>
            <p className="text-xs text-slate-700">Réservez <code className="font-mono">GET</code> à la lecture sans effet de bord, et sachez que <code className="font-mono">PUT</code> et <code className="font-mono">DELETE</code> doivent pouvoir être relancés sans altérer l&apos;état final.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : Isoler avec Postman</span>
            <p className="text-xs text-slate-700">Avant de soupçonner votre base de données ou votre code backend, rejouez la requête dans Postman pour éliminer les bogues côté navigateur (CORS, cache, DOM).</p>
          </div>
        </div>
      </section>

      {/* 8. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          8. Quiz de validation — Chapitre 4.1
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'application React dans le navigateur ne doit-elle JAMAIS se connecter directement au serveur MySQL ?",
              options: [
                "Parce que le navigateur ne sait pas interpréter le langage JavaScript",
                "Pour des raisons de sécurité critique : exposer les identifiants MySQL dans le code client permettrait à n'importe qui de détruire ou voler la base de données",
                "Parce que le protocole TCP est interdit sur Internet",
                "Pour accélérer la vitesse de frappe au clavier"
              ],
              correctIndex: 1,
              explanation: "Le code client React est entièrement public dans le navigateur. Seul le backend Express doit détenir les secrets de connexion à la base de données."
            },
            {
              id: 2,
              question: "Que se passe-t-il dans une API Express si le client omet l'en-tête 'Content-Type: application/json' lors d'un POST ?",
              options: [
                "Express convertit automatiquement le texte en nombre",
                "Le middleware express.json() ignore le corps de la requête, et req.body vaut undefined dans le contrôleur",
                "Le serveur redémarre instantanément",
                "La base de données MySQL est réinitialisée"
              ],
              correctIndex: 1,
              explanation: "express.json() filtre les requêtes selon leur Content-Type. Si l'en-tête est manquant ou text/plain, il ne désérialise pas le JSON et laisse req.body à undefined."
            },
            {
              id: 3,
              question: "Quelle méthode HTTP doit être utilisée selon la sémantique REST pour remplacer intégralement une ressource existante ?",
              options: [
                "POST",
                "GET",
                "PUT",
                "PATCH"
              ],
              correctIndex: 2,
              explanation: "PUT est idempotent et remplace la ressource complète. Pour ne modifier que quelques champs spécifiques sans écraser le reste, on utilise PATCH."
            },
            {
              id: 4,
              question: "Qu'est-ce qu'une méthode HTTP 'Idempotente' ?",
              options: [
                "Une méthode qui s'exécute en moins de 10 millisecondes",
                "Une méthode dont l'exécution répétée N fois produit exactement le même état sur le serveur qu'une seule exécution (ex: GET, PUT, DELETE)",
                "Une méthode qui ne renvoie jamais de code 500",
                "Une requête réservée aux utilisateurs administrateurs"
              ],
              correctIndex: 1,
              explanation: "L'idempotence garantit qu'appeler l'opération plusieurs fois n'a pas d'effets de bord supplémentaires après la première exécution réussie."
            },
            {
              id: 5,
              question: "Pourquoi renvoyer un statut HTTP 200 OK avec le corps '{ success: false, error: \"Solde insuffisant\" }' est-il un anti-pattern ?",
              options: [
                "Parce que cela ralentit la bande passante",
                "Parce que les outils de monitoring réseau et le booléen fetch response.ok considèrent la transaction comme un succès, masquant l'incident réel",
                "Parce que le JSON devient invalide",
                "Parce que MySQL refuse les codes 200"
              ],
              correctIndex: 1,
              explanation: "Un statut menteur 200 OK empêche les outils de surveillance et le code client de détecter l'échec de la requête, brisant la gestion des erreurs réseau."
            },
            {
              id: 6,
              question: "Dans quel panneau de Chrome DevTools un ingénieur doit-il inspecter en premier les en-têtes et le code statut d'une requête échouée ?",
              options: [
                "Console",
                "Elements",
                "Network (Réseau)",
                "Performance"
              ],
              correctIndex: 2,
              explanation: "Le panneau Network enregistre toutes les communications HTTP, affiche les codes de statut réels, les en-têtes de requête et de réponse ainsi que la charge utile brute."
            }
          ]}
        />
      </section>
    </div>
  );
};
