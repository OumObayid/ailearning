'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface ReproductionRecipe {
  id: string;
  title: string;
  targetEndpoint: string;
  method: 'GET' | 'POST';
  preconditions: string[];
  curlCommand: string;
  expectedStatus: number;
  actualStatus: number;
  serverOutput: string;
  diagnosis: string;
}

const REPRO_RECIPES: ReproductionRecipe[] = [
  {
    id: 'repro-idor',
    title: 'Recette 1 : Reproduction de la faille IDOR (SEC-01)',
    targetEndpoint: '/api/orders/1042',
    method: 'GET',
    preconditions: [
      'Compte utilisateur B authentifié (ID: 99, token JWT actif)',
      'Commande 1042 appartenant légitimement à l\'utilisateur A (ID: 12)'
    ],
    curlCommand: `curl -X GET http://localhost:4000/api/orders/1042 \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTksInJvbGUiOiJVU0VSIn0..." \\
  -H "Accept: application/json" -v`,
    expectedStatus: 403,
    actualStatus: 200,
    serverOutput: `{
  "id": 1042,
  "userId": 12,
  "clientName": "Société Dupont SAS",
  "totalAmount": 14500.00,
  "billingAddress": "14 Avenue Montaigne, 75008 Paris",
  "status": "PAID"
}`,
    diagnosis: 'Reproduction confirmée : le serveur renvoie HTTP 200 et divulgue les données sensibles d\'un tiers alors qu\'il devrait renvoyer HTTP 403 Forbidden.'
  },
  {
    id: 'repro-crash-500',
    title: 'Recette 2 : Reproduction du Crash Null Pointer (TECH-02)',
    targetEndpoint: '/api/orders/999999',
    method: 'GET',
    preconditions: [
      'Identifiant inexistant dans la base de données MySQL',
      'Token JWT valide'
    ],
    curlCommand: `curl -X GET http://localhost:4000/api/orders/999999 \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5..." \\
  -H "Accept: application/json" -v`,
    expectedStatus: 404,
    actualStatus: 500,
    serverOutput: `<!DOCTYPE html>
<html>
  <head><title>Internal Server Error</title></head>
  <body>
    <h1>TypeError: Cannot read properties of undefined (reading 'totalAmount')</h1>
    <pre>at getOrderById (src/backend/controllers/order.controller.ts:28:34)</pre>
  </body>
</html>`,
    diagnosis: 'Reproduction confirmée : absence de garde-fou if (!order). Le crash lève une 500 et divulgue la stack trace interne dans le HTML.'
  },
  {
    id: 'repro-ai-timeout',
    title: 'Recette 3 : Reproduction du Gel Réseau Gemini (PERF-05)',
    targetEndpoint: '/api/ai/analyze-document',
    method: 'POST',
    preconditions: [
      'Document PDF de 8 Mo contenant des scans haute résolution',
      'Simulation de latence WAN sur le endpoint Google AI Studio'
    ],
    curlCommand: `curl -X POST http://localhost:4000/api/ai/analyze-document \\
  -H "Authorization: Bearer eyJhbGci..." \\
  -F "document=@./test/fixtures/heavy_scanned_invoice.pdf" \\
  --max-time 20 -v`,
    expectedStatus: 200,
    actualStatus: 504,
    serverOutput: `curl: (28) Operation timed out after 20002 milliseconds with 0 bytes received
HTTP/1.1 504 Gateway Timeout
Content-Type: application/json

{"error": "Upstream service timeout: Gemini did not respond within limit"}`,
    diagnosis: 'Reproduction confirmée : l\'Event Loop est resté suspendu sans streaming ni AbortController, conduisant au timeout de la passerelle.'
  }
];

export const Chapitre3Content: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<ReproductionRecipe>(REPRO_RECIPES[0]);
  const [simulatedExecution, setSimulatedExecution] = useState<boolean>(false);

  const handleSelect = (r: ReproductionRecipe) => {
    setSelectedRecipe(r);
    setSimulatedExecution(false);
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.3</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Méthodologie de Reproduction Contrôlée des Bugs
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          &laquo; Ça ne marche pas &raquo; n&apos;est pas un bug : c&apos;est un bruit. Tant qu&apos;une anomalie n&apos;est pas isolée dans un <strong>script de reproduction déterministe et répétable à l&apos;infini</strong>, toute tentative de correction relève de la superstition. Maîtrisez le protocole expérimental de reproduction.
        </p>
      </div>

      {/* Section 1: La Formule Canonique de Reproduction */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Démarche Scientifique</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. L&apos;Équation Canonique de la Reproduction Logicielle
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Pour qu&apos;une anomalie soit reproductible de façon irréfutable par n&apos;importe quel membre de l&apos;équipe ou par un agent d&apos;IDE, elle doit obligatoirement réunir quatre paramètres invariables :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black mb-2">1</span>
            <div className="text-sm font-bold text-slate-900 mb-1">Préconditions</div>
            <p className="text-xs text-slate-600">État initial de la base de données, session utilisateur, variables d&apos;environnement actives.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black mb-2">2</span>
            <div className="text-sm font-bold text-slate-900 mb-1">Vecteur d&apos;Entrée</div>
            <p className="text-xs text-slate-600">Payload JSON exact, en-têtes HTTP (Content-Type, Auth Bearer), paramètres d&apos;URL et fichiers joints.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black mb-2">3</span>
            <div className="text-sm font-bold text-slate-900 mb-1">Résultat Observé</div>
            <p className="text-xs text-slate-600">Code statut réel (ex: 500 ou 200 non autorisé), stack trace, délai de réponse constaté.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black mb-2">4</span>
            <div className="text-sm font-bold text-slate-900 mb-1">Résultat Attendu</div>
            <p className="text-xs text-slate-600">Spécification contractuelle officielle (ex: HTTP 404 avec message d&apos;erreur standardisé).</p>
          </div>
        </div>

        <Callout type="warning" title="Bugs Systématiques vs Heisenbugs">
          Un bug systématique se produit à 100% dès que les préconditions sont réunies. Un <em>Heisenbug</em> (bug intermittent) dépend de conditions de course (race conditions), d&apos;un état de concurrence réseau ou du ramasse-miettes V8. Pour reproduire un Heisenbug, on utilise des outils de charge comme <code className="text-xs font-mono">autocannon</code> ou <code className="text-xs font-mono">Promise.all()</code> simulant 50 requêtes simultanées.
        </Callout>
      </section>

      {/* Section 2: Outils de Reproduction (cURL & Chrome DevTools) */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Arsenal d&apos;Ingénierie</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Les deux instruments rois : cURL et l&apos;inspection réseau DevTools
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Ne reproduisez jamais une anomalie d&apos;API en cliquant frénétiquement dans l&apos;interface React : l&apos;état graphique masque la réalité des échanges réseau. Utilisez plutôt :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">1. La commande cURL scriptable</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Permet d&apos;isoler complètement la requête en s&apos;affranchissant du navigateur. Idéal pour être transmis dans un prompt d&apos;agent ou intégré dans un script bash de test.
            </p>
            <CodeBlock language="bash">{`# Reproduction isolée sans navigateur
curl -i -X POST http://localhost:4000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "admin@corp.com", "passwordUser": "Secret123!"}'`}</CodeBlock>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">2. DevTools &laquo; Copy as cURL &raquo;</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Dans l&apos;onglet <strong>Network</strong> de Chrome DevTools, faites un clic droit sur la requête en échec $\rightarrow$ <em>Copy</em> $\rightarrow$ <em>Copy as cURL (bash)</em>. Vous capturez fidèlement tous les cookies, headers et tokens réels de la session en cours.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono border border-slate-200">
              Avantage : Capture instantanée de l&apos;état exact du client au moment précis du crash.
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Studio Interactif de Reproduction de Bugs */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Simulateur Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier : Studio de Reproduction Contrôlée du Projet Capstone
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Sélectionnez un scénario d&apos;anomalie parmi les dysfonctionnements du projet Capstone, examinez la commande de reproduction et déclenchez son exécution simulée pour observer la réponse brute du serveur :
        </p>

        {/* Sélecteur de scénario */}
        <div className="flex flex-wrap gap-2.5">
          {REPRO_RECIPES.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => handleSelect(recipe)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-left ${
                selectedRecipe.id === recipe.id
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {recipe.title}
            </button>
          ))}
        </div>

        {/* Détails de la recette */}
        <div className="rounded-2xl bg-white border border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-black bg-emerald-600 text-white">
                {selectedRecipe.method}
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-slate-200">
                {selectedRecipe.targetEndpoint}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">Attendu : <strong className="text-emerald-400">{selectedRecipe.expectedStatus}</strong></span>
              <span className="text-slate-400">Observé : <strong className="text-rose-400">{selectedRecipe.actualStatus}</strong></span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Préconditions obligatoires :</div>
              <ul className="space-y-1">
                {selectedRecipe.preconditions.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Commande de reproduction cURL :</div>
              <CodeBlock language="bash">{selectedRecipe.curlCommand}</CodeBlock>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSimulatedExecution(true)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-2"
              >
                <span>▶ Exécuter la requête dans l&apos;environnement de test</span>
              </button>
            </div>

            {simulatedExecution && (
              <div className="mt-4 space-y-3 pt-3 border-t border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  Réponse brute interceptée (Status: {selectedRecipe.actualStatus}) :
                </div>
                <CodeBlock language="json">{selectedRecipe.serverOutput}</CodeBlock>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium">
                  <strong>Diagnostic d&apos;ingénierie :</strong> {selectedRecipe.diagnosis}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Validation des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Quiz : Méthodologie et protocoles de reproduction
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.3 — Reproduction Contrôlée et Isolation de Bugs"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il interdit de tenter de corriger un bug tant qu'il n'a pas été reproduit dans un scénario déterministe ?",
              options: [
                "Pour permettre au compilateur de créer un index temporaire sur le disque.",
                "Parce que sans preuve de reproduction, il est impossible de vérifier si la modification apportée résout effectivement l'anomalie ou si elle n'a fait que masquer le problème par coïncidence.",
                "Parce que les serveurs de bases de données refusent les modifications non précédées d'un script bash.",
                "Pour respecter une obligation légale de la CNIL."
              ],
              correctIndex: 1,
              explanation: "La reproduction est la première moitié du test Red-Green : tant qu'on ne sait pas faire échouer le système de manière contrôlée, on ne peut pas prouver sa réparation."
            },
            {
              id: 2,
              question: "Dans le jargon d'ingénierie logicielle, qu'appelle-t-on un 'Heisenbug' ?",
              options: [
                "Un bug causé par une faute de frappe dans le fichier package.json.",
                "Une anomalie intermittente qui semble disparaître ou modifier son comportement dès que l'on tente de l'observer (ex: en activant le mode debug ou en ajoutant des logs console qui altèrent le timing de concurrence).",
                "Un virus informatique conçu en Allemagne dans les années 1980.",
                "Un dépassement de pile provoqué par une fonction récursive infinie."
              ],
              correctIndex: 1,
              explanation: "Nommé par analogie avec le principe d'incertitude d'Heisenberg en physique quantique, ce type de bug dépend de conditions temporelles critiques (race conditions) perturbées par l'acte même de mesure."
            },
            {
              id: 3,
              question: "Quel est l'avantage décisif d'isoler une requête de reproduction avec 'cURL' plutôt que de la relancer depuis l'interface web React ?",
              options: [
                "cURL permet d'envoyer des requêtes 1 000 fois plus volumineuses.",
                "cURL élimine tous les biais liés au navigateur (mise en cache, gestionnaires d'état Redux/Zustand, cookies tiers, extensions) et permet de scriptoriser une requête HTTP brute identique.",
                "cURL garantit que le serveur répondra en moins de 1 milliseconde.",
                "cURL supprime automatiquement les erreurs HTTP 500."
              ],
              correctIndex: 1,
              explanation: "En s'affranchissant du runtime navigateur, cURL permet de cibler directement le contrat d'interface HTTP de l'API avec des données rigoureusement contrôlées."
            },
            {
              id: 4,
              question: "Comment extraire en un clic une requête réelle en échec depuis le navigateur pour la reproduire en ligne de commande ?",
              options: [
                "Prendre une photo de l'écran avec un smartphone.",
                "Ouvrir l'onglet Network de Chrome DevTools, faire un clic droit sur la requête en rouge, puis choisir 'Copy' -> 'Copy as cURL'.",
                "Copier le code source de la page HTML dans un fichier texte.",
                "Redémarrer le navigateur en mode sans échec."
              ],
              correctIndex: 1,
              explanation: "L'option 'Copy as cURL' capture l'intégralité des en-têtes exacts, cookies de session et payloads transmis par le navigateur au moment précis de l'incident."
            },
            {
              id: 5,
              question: "Que doit contenir obligatoirement le rapport de reproduction transmis à un collègue ou à un agent IA ?",
              options: [
                "Le salaire du développeur ayant écrit le code défaillant.",
                "Les préconditions de départ, la séquence d'actions exacte (ou commande cURL), le résultat observé et le résultat contractuellement attendu.",
                "Une capture d'écran du logo de l'entreprise.",
                "La liste de tous les paquets installés dans Windows."
              ],
              correctIndex: 1,
              explanation: "Cette structure rigoureuse permet à tout ingénieur de rejouer l'incident en moins de 60 secondes et d'objectiver l'existence de la défaillance."
            },
            {
              id: 6,
              question: "Lorsque la reproduction d'un bug de timeout IA (comme l'envoi de PDF à Gemini) échoue en local faute de réseau lent, comment le provoquer de façon fiable ?",
              options: [
                "Couper le câble Ethernet à coups de ciseaux.",
                "Utiliser la fonction de bridage réseau (Throttling) de Chrome DevTools ou un middleware d'émulation de latence injectant artificiellement un délai sur le port de sortie.",
                "Attendre un jour d'orage.",
                "Remplacer le processeur par un modèle plus ancien."
              ],
              correctIndex: 1,
              explanation: "Le Network Throttling et l'injection de latence artificielle dans les tests permettent d'éprouver la résistance aux délais d'expiration (timeouts) en conditions reproductibles."
            }
          ]}
        />
      </section>
    </div>
  );
};
