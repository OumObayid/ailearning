'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type PostmanScenarioKey =
  | 'login_chaining'
  | 'missing_header_postman'
  | 'latency_assertion_fail'
  | 'browser_cors_vs_postman';

interface PostmanScenario {
  title: string;
  badge: string;
  badgeColor: string;
  requestConfig: { method: string; url: string; headers: string; body: string };
  responsePreview: { status: string; time: string; body: string };
  testScript: string;
  testResult: { name: string; passed: boolean; message: string }[];
  diagnosticTakeaway: string;
}

const POSTMAN_SCENARIOS: Record<PostmanScenarioKey, PostmanScenario> = {
  login_chaining: {
    title: '1. Authentification & Extraction dynamique de token (Chaining)',
    badge: 'Variables d\'Environnement',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    requestConfig: {
      method: 'POST',
      url: '{{baseUrl}}/api/v1/auth/login',
      headers: 'Content-Type: application/json',
      body: `{
  "email": "sarah@eshop.fr",
  "password": "Password123!"
}`
    },
    responsePreview: {
      status: '200 OK',
      time: '42 ms',
      body: `{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 42, "role": "admin" }
}`
    },
    testScript: `pm.test("Connexion réussie (200 OK)", () => {
  pm.response.to.have.status(200);
});

// Extraction automatique du token dans les variables d'environnement :
const data = pm.response.json();
pm.environment.set("jwtToken", data.token);
console.log("Token sauvegardé pour les requêtes suivantes !");`,
    testResult: [
      { name: 'Statut HTTP est 200 OK', passed: true, message: 'Code 200 validé' },
      { name: 'Présence du token dans la réponse', passed: true, message: 'data.token existe' },
      { name: 'Sauvegarde de {{jwtToken}}', passed: true, message: 'Variable d\'environnement mise à jour' }
    ],
    diagnosticTakeaway: 'Le chaining de variables évite de copier-coller manuellement des tokens expirés toutes les 15 minutes.'
  },
  missing_header_postman: {
    title: '2. Oubli du header Content-Type dans Postman',
    badge: 'req.body Vide',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    requestConfig: {
      method: 'POST',
      url: '{{baseUrl}}/api/v1/tasks',
      headers: '# Aucun Content-Type défini ! (text/plain par défaut)',
      body: `{ "title": "Finir le rapport", "priority": "high" }`
    },
    responsePreview: {
      status: '500 Internal Server Error',
      time: '18 ms',
      body: `{
  "error": "TypeError: Cannot read properties of undefined (reading 'title')"
}`
    },
    testScript: `pm.test("Création réussie (201 Created)", () => {
  pm.response.to.have.status(201); // 💥 ÉCHEC : statut reçu = 500
});`,
    testResult: [
      { name: 'Statut HTTP 201 Created', passed: false, message: 'Attendu 201 mais reçu 500' }
    ],
    diagnosticTakeaway: 'Dans Postman, assurez-vous de choisir le mode "raw" puis de sélectionner "JSON" dans la liste déroulante : cela force l\'en-tête Content-Type: application/json.'
  },
  latency_assertion_fail: {
    title: '3. Détection de goulot d\'étranglement (SLA Latency > 300ms)',
    badge: 'Alerte Performance',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    requestConfig: {
      method: 'GET',
      url: '{{baseUrl}}/api/v1/analytics/reports',
      headers: 'Authorization: Bearer {{jwtToken}}',
      body: '(vide)'
    },
    responsePreview: {
      status: '200 OK',
      time: '1240 ms (Lenteur critique)',
      body: `{ "reportCount": 50, "totalSales": 94820 }`
    },
    testScript: `pm.test("Temps de réponse acceptable (< 300ms)", () => {
  pm.expect(pm.response.responseTime).to.be.below(300);
});`,
    testResult: [
      { name: 'Statut HTTP 200 OK', passed: true, message: 'Réponse valide' },
      { name: 'Temps de réponse sous 300ms', passed: false, message: 'Temps mesuré : 1240ms (> 300ms). Full table scan suspecté !' }
    ],
    diagnosticTakeaway: 'Postman permet d\'automatiser la détection des régressions de performance avant la mise en production.'
  },
  browser_cors_vs_postman: {
    title: '4. Postman fonctionne mais React échoue : Le syndrome CORS',
    badge: 'Isolation Front / Back',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    requestConfig: {
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users',
      headers: 'Accept: application/json',
      body: '(vide)'
    },
    responsePreview: {
      status: 'Dans Postman : 200 OK | Dans React : Failed to fetch (CORS Error)',
      time: '12 ms',
      body: `Postman reçoit : [ { "id": 1, "name": "Ali" } ]
React reçoit : TypeError: NetworkError when attempting to fetch resource.`
    },
    testScript: `pm.test("L'API répond sans encombre à Postman", () => {
  pm.response.to.have.status(200);
});`,
    testResult: [
      { name: 'Postman exécute sans restriction SOP', passed: true, message: 'Le backend fonctionne parfaitement' },
      { name: 'Origine React (localhost:5173)', passed: false, message: 'Bloquée par la Same-Origin Policy du navigateur' }
    ],
    diagnosticTakeaway: 'Si une requête fonctionne dans Postman mais échoue dans le navigateur avec un message réseau, le backend est hors de cause : configurez les en-têtes CORS.'
  }
};

export const Chapitre11Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<PostmanScenarioKey>('login_chaining');
  const scenario = POSTMAN_SCENARIOS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 11 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            API Isolation with Postman
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Utilisation de Postman pour isoler les problèmes : Méthodologie binaire Front/Back, variables et tests automatisés
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Face à une anomalie web, l&apos;erreur fatale du développeur junior est de fixer son composant React
          en se demandant pourquoi les données ne s&apos;affichent pas.
          Postman est votre banc d&apos;essai d&apos;ingénierie : en envoyant la requête directement à l&apos;API hors de tout navigateur,
          il permet d&apos;appliquer une <strong>méthode d&apos;isolation binaire</strong> en quelques secondes :
          le bogue est-il imputable au serveur ou au client frontend ?
        </p>
      </div>

      {/* Interface Postman Image 5 */}
      <div className="p-6 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
            <Icon name="search" className="w-5 h-5 text-emerald-600" />
            <span>Environnement de travail et diagnostic dans Postman</span>
          </h2>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full">
            Figure 4.11
          </span>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex justify-center p-4">
          <Image
            src="/images/cours/debugging/module-4/image5.jpeg"
            alt="Interface de test et débogage d'une API avec Postman"
            width={850}
            height={480}
            className="rounded-xl object-contain max-h-[440px] w-auto shadow-md"
          />
        </div>
        <p className="text-xs text-slate-600 italic text-center">
          Inspection ciblée dans Postman : choix de la méthode HTTP, onglet Headers, body JSON brut et examen du statut de retour,
          de la latence et du payload sérialisé.
        </p>
      </div>

      {/* 1. L'arbre de décision d'isolation binaire */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            L&apos;arbre de décision d&apos;isolation binaire Front / Back
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          En croisant le résultat d&apos;un appel dans Postman et dans votre navigateur, vous localisez immédiatement le compartiment en faute :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-950 text-sm">Postman ✅ / React ❌</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">Faute Frontend</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Le backend fonctionne impeccablement. Le problème réside à 100% côté client : politique <strong>CORS</strong>, mauvaise URL de base (ex: port 5173 au lieu de 3000), absence de <code>Content-Type: application/json</code> ou bug d&apos;état React.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-rose-300 bg-rose-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-rose-950 text-sm">Postman ❌ / React ❌</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-bold">Faute Backend</span>
            </div>
            <p className="text-xs text-rose-900 leading-relaxed">
              L&apos;infrastructure serveur est en panne : serveur Express arrêté, crash de base de données MySQL, port en conflit (<code>EADDRINUSE</code>) ou exception non catchée. Inutile de toucher au code React.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-blue-300 bg-blue-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-blue-950 text-sm">Statut 200 / Données ❌</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-200 text-blue-900 font-bold">Bug Logique Métier</span>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed">
              Le protocole réseau et le serveur fonctionnent, mais la requête renvoie un tableau vide <code>[]</code> ou de mauvaises valeurs : clause SQL <code>WHERE</code> fautive, jointure erronée ou filtre dans le contrôleur.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 3 réglages indispensables dans Postman */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les trois règles de configuration indispensables dans Postman
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <div className="text-xs font-black uppercase text-indigo-700">Règle 1</div>
            <div className="font-bold text-slate-950 text-sm">Onglet Headers</div>
            <p className="text-xs text-slate-600">
              Vérifier la présence de <code>Content-Type: application/json</code>. Sans lui, Express ne décode pas le corps et <code>req.body</code> reste <code>undefined</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <div className="text-xs font-black uppercase text-indigo-700">Règle 2</div>
            <div className="font-bold text-slate-950 text-sm">Onglet Body (raw + JSON)</div>
            <p className="text-xs text-slate-600">
              Toujours cocher le mode <strong>raw</strong> puis sélectionner <strong>JSON</strong> dans la liste. Ne pas utiliser <em>form-data</em> ou <em>x-www-form-urlencoded</em>.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <div className="text-xs font-black uppercase text-indigo-700">Règle 3</div>
            <div className="font-bold text-slate-950 text-sm">Variables d&apos;environnement</div>
            <p className="text-xs text-slate-600">
              Utiliser <code>{`{{baseUrl}}`}</code> pour basculer facilement entre <code>localhost:3000</code> et votre serveur de staging en un clic.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Laboratoire Interactif Postman */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Diagnostic et Scripts d&apos;Assertion Postman
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Sélectionnez un scénario de test pour observer la requête émise, les scripts d&apos;assertion JavaScript (<code>pm.test</code>) et les résultats :
        </p>

        {/* Boutons Sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(Object.keys(POSTMAN_SCENARIOS) as PostmanScenarioKey[]).map((key) => {
            const item = POSTMAN_SCENARIOS[key];
            const isSelected = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`p-3 text-left rounded-xl border text-xs font-bold transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className={`text-[10px] px-1.5 py-0.5 rounded w-fit mb-1.5 ${
                  isSelected ? 'bg-lime-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 font-bold'
                }`}>
                  {item.badge}
                </span>
                <span className="truncate text-xs font-semibold leading-snug">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Panneau de détail */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-950">{scenario.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
              </div>
            </div>

            <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-lime-400">
              {scenario.requestConfig.method} {scenario.requestConfig.url}
            </div>
          </div>

          {/* Configuration et Réponse */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                Configuration de la Requête dans Postman
              </div>
              <div className="rounded-xl bg-slate-950 p-3.5 text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
                <div className="text-slate-400">{`// Headers :`}</div>
                <div>{scenario.requestConfig.headers}</div>
                <div className="text-slate-400 mt-2">{`// Body :`}</div>
                <div>{scenario.requestConfig.body}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-1.5 flex items-center justify-between">
                <span>Réponse Reçue</span>
                <span className="text-[11px] font-mono text-slate-500">{scenario.responsePreview.time}</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-3.5 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
                <div className="text-slate-400">{`// Status : ${scenario.responsePreview.status}`}</div>
                <div>{scenario.responsePreview.body}</div>
              </div>
            </div>
          </div>

          {/* Script de test JavaScript */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-indigo-700 mb-1.5">
              Script d&apos;assertion exécuté dans l&apos;onglet Tests (pm.test)
            </div>
            <CodeBlock language="javascript" code={scenario.testScript} />
          </div>

          {/* Résultats des tests Postman */}
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500">
              Résultats de la console de Test Postman (Test Results) :
            </div>
            <div className="space-y-1.5">
              {scenario.testResult.map((t, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                    t.passed
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-black ${t.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {t.passed ? '✓ PASS' : '✗ FAIL'}
                    </span>
                    <span className="font-bold">{t.name}</span>
                  </div>
                  <span className="text-xs opacity-75">{t.message}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-lime-50 border border-lime-300 flex items-start gap-3">
            <Icon name="sparkles" className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-lime-950">
              <span className="font-bold">Bonne pratique industrielle : </span>
              {scenario.diagnosticTakeaway}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TP : Suite d'Assertions Automatisées pour CRUD API */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Rédiger la Suite d&apos;Assertions Automatisées Complète
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Ce script Postman vérifie le code HTTP, le format JSON, la latence et enregistre dynamiquement
          les identifiants pour alimenter les requêtes suivantes de votre collection :
        </p>

        <CodeBlock
          language="javascript"
          code={`// 1. Validation du code de statut HTTP nominal (201 Created)
pm.test("Statut HTTP est 201 Created", () => {
  pm.response.to.have.status(201);
});

// 2. Vérification du temps de réponse (SLA Performance < 250ms)
pm.test("Temps de réponse inférieur à 250ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(250);
});

// 3. Validation de l'en-tête Content-Type
pm.test("En-tête Content-Type est application/json", () => {
  pm.response.to.have.header("Content-Type");
  pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// 4. Validation du schéma de la charge utile (Payload)
pm.test("Payload contient un identifiant valide et les champs requis", () => {
  const json = pm.response.json();
  pm.expect(json).to.be.an("object");
  pm.expect(json).to.have.property("id");
  pm.expect(json).to.have.property("title");
  
  // Chaînage dynamique : Sauvegarder l'ID créé dans l'environnement Postman
  pm.environment.set("lastCreatedTaskId", json.id);
});`}
        />

        <Callout type="info" title="Automatisation en intégration continue (CI/CD) avec Newman">
          <p className="text-xs sm:text-sm">
            Toutes vos collections Postman peuvent être exécutées automatiquement dans vos pipelines GitHub Actions ou GitLab CI
            grâce à l&apos;outil CLI <strong>Newman</strong> : <code>newman run ma-collection.json -e dev-env.json</code>.
          </p>
        </Callout>
      </section>

      {/* 5. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.11
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Évaluez votre maîtrise de l&apos;outil Postman et de la méthodologie de test d&apos;API :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Si une requête fonctionne parfaitement dans Postman mais échoue dans votre application React avec l'erreur 'Failed to fetch', quel est le diagnostic immédiat ?",
              options: [
                "Le serveur Node.js est éteint.",
                "Le problème est strictement côté client (frontend) : blocage par la politique CORS du navigateur, URL d'API incorrecte ou port mal ciblé.",
                "La base de données MySQL a corrompu ses tables.",
                "Postman ne gère pas les requêtes asynchrones."
              ],
              correctIndex: 1,
              explanation: "Postman n'applique pas la Same-Origin Policy du navigateur. Si la requête réussit dans Postman, le serveur et la base de données fonctionnent. L'échec dans React provient des mécanismes propres au navigateur (CORS, certificat TLS local ou URL de fetch erronée)."
            },
            {
              id: 2,
              question: "Dans Postman, pourquoi devez-vous choisir 'raw' puis 'JSON' dans l'onglet Body plutôt que de laisser le mode par défaut ?",
              options: [
                "Parce que Postman compresse le texte en zip.",
                "Parce que sélectionner 'JSON' ajoute automatiquement l'en-tête HTTP 'Content-Type: application/json', indispensable pour qu'Express active son middleware express.json() et peuple req.body.",
                "Parce que les autres formats sont payants.",
                "Parce que le format JSON crypte le mot de passe."
              ],
              correctIndex: 1,
              explanation: "Sans le MIME-type 'application/json', le middleware express.json() ignore le corps de la requête, laissant req.body vide ou non parsé côté serveur."
            },
            {
              id: 3,
              question: "À quoi sert l'instruction 'pm.environment.set(\"jwtToken\", data.token)' dans l'onglet Tests de Postman ?",
              options: [
                "À imprimer le token sur l'imprimante par défaut.",
                "À sauvegarder automatiquement le jeton dans les variables d'environnement de Postman pour l'injecter dynamiquement dans les requêtes suivantes via {{jwtToken}} (chaînage).",
                "À supprimer le compte de l'utilisateur.",
                "À forcer l'expiration du jeton."
              ],
              correctIndex: 1,
              explanation: "Le chaînage dynamique permet d'automatiser vos flux de travail : après la requête de login, le jeton est immédiatement stocké et réutilisé par toutes les requêtes authentifiées sans aucune intervention manuelle."
            },
            {
              id: 4,
              question: "Quelle assertion JavaScript valide que le temps de réponse d'un endpoint Express reste inférieur à 200 millisecondes dans Postman ?",
              options: [
                "pm.test('Vitesse', () => { pm.expect(pm.response.responseTime).to.be.below(200); });",
                "pm.speed(200);",
                "assert(time < 200);",
                "pm.validateLatency(200);"
              ],
              correctIndex: 0,
              explanation: "L'objet pm.response.responseTime contient la latence aller-retour mesurée en millisecondes. La syntaxe Chai pm.expect(...).to.be.below(200) permet de valider le respect des SLAs de performance."
            },
            {
              id: 5,
              question: "Quel outil en ligne de commande (CLI) permet d'exécuter des collections Postman de façon automatisée dans un pipeline d'intégration continue (CI/CD) ?",
              options: [
                "Newman",
                "Postman-CLI-Browser",
                "Curl-Runner",
                "Express-Test-Agent"
              ],
              correctIndex: 0,
              explanation: "Newman est l'exécuteur officiel en ligne de commande pour Postman. Il permet de lancer des suites de tests automatisées sur n'importe quel serveur CI/CD (GitHub Actions, Jenkins, GitLab CI) sans interface graphique."
            },
            {
              id: 6,
              question: "Si Postman et le navigateur renvoient tous les deux une erreur de connexion (ECONNREFUSED ou 'Could not get response'), quelle est la conclusion ?",
              options: [
                "C'est un bug dans le composant React.",
                "Le serveur backend Express n'est pas démarré, le port ciblé n'écoute pas ou le réseau est coupé : le problème est 100% côté infrastructure serveur.",
                "Le navigateur a besoin d'être mis à jour.",
                "La requête a été bloquée par CORS."
              ],
              correctIndex: 1,
              explanation: "Si Postman lui-même ne peut pas joindre l'API, le problème ne dépend pas du navigateur : le service Node.js est arrêté, crashé ou mal configuré au niveau de l'adresse IP et du port."
            }
          ]}
        />
      </section>
    </div>
  );
};

export default Chapitre11Content;
