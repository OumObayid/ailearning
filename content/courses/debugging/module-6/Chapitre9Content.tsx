'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface AgentStep {
  step: number;
  type: 'thought' | 'tool_call' | 'tool_output' | 'reflection';
  label: string;
  detail: string;
  codeSnippet?: string;
  badgeColor: string;
}

const AGENT_WORKFLOW_STEPS: AgentStep[] = [
  {
    step: 1,
    type: 'thought',
    label: 'Raisonnement & Analyse du symptôme',
    detail: "L'utilisateur signale une erreur HTTP 400 Bad Request lors de la connexion (/api/auth/login). Je dois d'abord identifier le schéma de validation backend et la requête frontend correspondante.",
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    step: 2,
    type: 'tool_call',
    label: 'Outil 1 : search_codebase("auth/login")',
    detail: "L'agent scanne le workspace et localise le contrôleur backend ainsi que le hook d'authentification frontend.",
    codeSnippet: `// Appel d'outil émis par l'agent :
search_codebase({
  query: "/api/auth/login",
  filePatterns: ["src/**/*.ts", "src/**/*.tsx"]
})`,
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    step: 3,
    type: 'tool_output',
    label: 'Sortie d\'outil : 2 fichiers identifiés',
    detail: 'Résultats trouvés : "src/backend/controllers/auth.controller.ts" et "src/frontend/hooks/useAuth.ts".',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200'
  },
  {
    step: 4,
    type: 'tool_call',
    label: 'Outil 2 : read_file("src/backend/controllers/auth.controller.ts")',
    detail: "L'agent inspecte le contrôleur backend pour analyser le destructuré du corps de requête (req.body).",
    codeSnippet: `// Code lu dans auth.controller.ts :
export async function loginHandler(req: Request, res: Response) {
  const { email, passwordUser } = req.body;
  if (!email || !passwordUser) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }
  // ...
}`,
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    step: 5,
    type: 'tool_call',
    label: 'Outil 3 : read_file("src/frontend/hooks/useAuth.ts")',
    detail: "L'agent inspecte la fonction d'envoi frontend pour comparer le payload JSON envoyé.",
    codeSnippet: `// Code lu dans useAuth.ts :
export async function submitLogin(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }) // ⚠️ Propriété 'password' envoyée au lieu de 'passwordUser'
  });
  return response.json();
}`,
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    step: 6,
    type: 'reflection',
    label: 'Synthèse d\'écart (Schema Mismatch)',
    detail: "L'incohérence est identifiée : le backend attend 'passwordUser' alors que le frontend transmet 'password'. Selon la convention de nommage du projet, c'est le contrôleur backend qui comporte une anomalie de nommage non standard. Je vais proposer un patch ciblé avec test de validation.",
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }
];

export const Chapitre9Content: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [executionMode, setExecutionMode] = useState<'chatbot' | 'agent'>('agent');

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-linear-to-r from-indigo-50 via-sky-50 to-indigo-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span>Module 6 — Diagnostic assisté par IA & Agents Autonomes • Section 6.9</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Exploiter les Agents IA Intégrés aux IDE (Google Antigravity, Copilot, Cursor)
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Un chatbot passif attend vos copier-coller de code ; un <strong>agent IA d&apos;IDE</strong> explore activement votre arborescence, interroge le Language Server Protocol (LSP), exécute vos suites de tests et applique des correctifs précis sous votre supervision. Maîtrisez le cycle agentique pour décupler votre efficacité d&apos;enquête.
        </p>
      </div>

      {/* Section 1: Chatbot vs Agent d'IDE */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Rupture Technologique</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. De la complétion passive à l&apos;action agentique : Chatbot vs Agent d&apos;IDE
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          L&apos;intégration des modèles de langage au cœur des environnements de développement a franchi trois générations successives :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">Génération 1</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">Inline Autocomplete</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complétion de la ligne suivante (Ghost text) basée uniquement sur les 50 lignes précédentes du fichier actif.
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded-lg">Portée : 1 ligne</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black">Génération 2</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">Chatbot Sidecar</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fenêtre latérale de discussion. L&apos;ingénieur doit copier-coller manuellement le code, les logs et la stack trace pour obtenir une réponse textuelle.
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-amber-800 bg-amber-50 p-2 rounded-lg">Portée : Copier-coller manuel</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-indigo-200 shadow-xs flex flex-col justify-between ring-2 ring-indigo-500/20">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-black">Génération 3 (Moderne)</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">Agent Autonome à Outils (ReAct)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                L&apos;agent reçoit un objectif haut niveau, explore le repository, lit les fichiers nécessaires, lance les commandes terminal et vérifie les résultats par lui-même.
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-indigo-700 bg-indigo-50 p-2 rounded-lg font-bold">Portée : Tout le workspace + Terminal</div>
          </div>
        </div>

        {/* Tableau comparatif d'ingénierie */}
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Critère d&apos;ingénierie</th>
                <th className="px-4 py-3 text-amber-900 bg-amber-50/50">Chatbot Traditionnel (Web / Panel simple)</th>
                <th className="px-4 py-3 text-indigo-900 bg-indigo-50/50">Agent d&apos;IDE (Google Antigravity, Cursor, etc.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-bold">Accès au système de fichiers</td>
                <td className="px-4 py-3 text-rose-700 font-medium">❌ Aucun (limité à ce que vous collez)</td>
                <td className="px-4 py-3 text-emerald-700 font-bold"> Lecture/écriture native via outils d&apos;environnement</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-bold">Compréhension de l&apos;architecture</td>
                <td className="px-4 py-3 text-amber-700 font-medium">⚠️ Fragmentaire et myope</td>
                <td className="px-4 py-3 text-emerald-700 font-bold"> Indexation sémantique (Embeddings) + graphe AST</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-bold">Exécution de tests et diagnostics</td>
                <td className="px-4 py-3 text-rose-700 font-medium">❌ Impossible (environnement fermé)</td>
                <td className="px-4 py-3 text-emerald-700 font-bold"> Exécute Vitest / Jest / npx tsc et lit le retour d&apos;erreur</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-bold">Application des patchs</td>
                <td className="px-4 py-3 text-slate-600 font-medium">L&apos;humain doit copier et remplacer les blocs</td>
                <td className="px-4 py-3 text-emerald-700 font-bold"> Diff interactif intégré directement dans l&apos;éditeur</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: La boucle ReAct & L'Arsenal d'Outils */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Architecture Interne</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. La boucle ReAct (Reasoning + Acting) et le manifeste des outils
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Un agent ne devine pas votre code : il dialogue avec l&apos;IDE à travers un protocole standardisé d&apos;appels d&apos;outils (Tool Calling). Chaque cycle itératif suit le schéma <strong>Thought $\rightarrow$ Action $\rightarrow$ Observation</strong> :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-mono font-bold text-indigo-700 mb-1">1. READ_FILE</div>
            <p className="text-xs text-slate-600">
              Permet à l&apos;agent de charger des tranches de code spécifiques sans saturer la fenêtre de contexte.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-mono font-bold text-indigo-700 mb-1">2. SEARCH_CODEBASE</div>
            <p className="text-xs text-slate-600">
              Recherche combinée par regex, symboles syntaxiques et recherche vectorielle dense.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-mono font-bold text-indigo-700 mb-1">3. EDIT_FILE / PATCH</div>
            <p className="text-xs text-slate-600">
              Remplacement ciblé ligne par ligne (Target/Replacement) préservant l&apos;intégrité du fichier.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-mono font-bold text-indigo-700 mb-1">4. RUN_COMMAND</div>
            <p className="text-xs text-slate-600">
              Exécution de commandes shell sous sandbox (linter, suite de tests, compilateur).
            </p>
          </div>
        </div>

        <Callout type="info" title="Pourquoi les agents d'IDE échouent rarement sur les imports de fichiers">
          À la différence d&apos;une IA sur navigateur web qui invente souvent les chemins de répertoires, l&apos;agent d&apos;IDE utilise <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">search_codebase</code> pour découvrir les vrais chemins sur votre disque. Il élimine ainsi 95% des erreurs d&apos;importation fantômes.
        </Callout>
      </section>

      {/* Section 3: Simulateur interactif de diagnostic agentique */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Laboratoire Pratique</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Simulateur Interactif : Observer un Agent d&apos;IDE Résoudre un Bug Multicouche
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Comparez la résolution d&apos;un désalignement d&apos;API entre un <strong>Chatbot classique</strong> et un <strong>Agent d&apos;IDE autonome</strong> doté de la boucle Tool-Use.
        </p>

        {/* Sélecteur de mode */}
        <div className="flex gap-3">
          <button
            onClick={() => setExecutionMode('chatbot')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              executionMode === 'chatbot'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Approche Chatbot Classique (Copier-coller)
          </button>
          <button
            onClick={() => setExecutionMode('agent')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              executionMode === 'agent'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Approche Agent d&apos;IDE (Google Antigravity / Cursor)
          </button>
        </div>

        {/* Affichage du mode sélectionné */}
        {executionMode === 'chatbot' ? (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-4">
            <div className="font-extrabold text-sm text-amber-900 flex items-center gap-2">
              <span>⚠️ Limitation du modèle isolé de l&apos;environnement :</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              Vous soumettez le message : <em>&laquo; Mon login me renvoie HTTP 400 Bad Request, aide-moi &raquo;</em>.
            </p>
            <div className="p-4 bg-white rounded-xl border border-amber-200 text-xs font-mono text-slate-800 space-y-2">
              <div className="text-slate-500 font-bold">{`// Réponse typique d'un chatbot sans accès projet :`}</div>
              <p>&laquo; Une erreur 400 peut avoir plusieurs causes :</p>
              <p>1. Vérifiez que votre serveur Express a configuré express.json().</p>
              <p>2. Vérifiez que vos identifiants ne sont pas vides.</p>
              <p>3. Affichez console.log(req.body) pour voir ce qui arrive... &raquo;</p>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-rose-800">
              Résultat : 20 minutes perdues en devinettes manuelles parce que l&apos;IA n&apos;a pas pu inspecter le code réel de votre projet.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-300 shadow-sm overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Fil d&apos;exécution ReAct</span>
                <h4 className="text-sm font-bold text-slate-200">Investigation automatique du crash HTTP 400</h4>
              </div>
              <div className="flex items-center gap-1.5">
                {AGENT_WORKFLOW_STEPS.map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                      activeStep === s.step
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.step}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenu de l'étape active */}
            {(() => {
              const current = AGENT_WORKFLOW_STEPS.find((s) => s.step === activeStep) || AGENT_WORKFLOW_STEPS[0];
              return (
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${current.badgeColor}`}>
                      Étape {current.step} / {AGENT_WORKFLOW_STEPS.length} : {current.label}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Status: SUCCESS</span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                    {current.detail}
                  </p>

                  {current.codeSnippet && (
                    <div className="mt-2">
                      <CodeBlock language="typescript">{current.codeSnippet}</CodeBlock>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <button
                      disabled={activeStep === 1}
                      onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 disabled:opacity-40"
                    >
                      ← Étape précédente
                    </button>
                    <button
                      disabled={activeStep === AGENT_WORKFLOW_STEPS.length}
                      onClick={() => setActiveStep((prev) => Math.min(AGENT_WORKFLOW_STEPS.length, prev + 1))}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-40"
                    >
                      Étape suivante →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* Section 4: Bonnes pratiques de pilotage d'un agent */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Méthodologie Opérationnelle</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Comment piloter efficacement un agent d&apos;IDE sans dérapage
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Déléguer du travail à un agent autonome nécessite de respecter trois règles cardinales de contrôle :
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              Le Cadrage de Départ (Scoping)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Ne lancez jamais un agent avec une consigne vague comme <em>&laquo; Répare le projet &raquo;</em>. Spécifiez toujours le fichier suspect initial ou la route concernée (ex: <em>&laquo; Commence par examiner src/auth/login.ts et exécute vitest run test/auth &raquo;</em>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
              La Règle du Plan Préalable (/plan)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Exigez de l&apos;agent qu&apos;il formule son diagnostic et soumette un plan d&apos;action en 3 points <strong>avant d&apos;effectuer la moindre modification de fichier</strong>. Cela évite qu&apos;il ne réécrive prématurément 12 composants.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
              Le Droit de Veto Terminal
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Conservez toujours l&apos;approbation manuelle active pour les commandes de terminal à fort impact (migrations de base de données, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">git reset</code>, installation de paquets système ou commandes réseau).
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Validation des Compétences</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            5. Quiz : Maîtrise des agents IA intégrés aux environnements de développement
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 6.9 — Agents d'IDE, Tool Use et Diagnostic Autonome"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence fondamentale entre un chatbot IA classique et un agent IA d'IDE ?",
              options: [
                "Le chatbot ne fonctionne que la nuit alors que l'agent fonctionne le jour.",
                "L'agent d'IDE dispose d'outils lui permettant d'interagir directement avec le workspace (lire des fichiers, exécuter des commandes, chercher dans l'AST, modifier du code) dans une boucle autonome de raisonnement (ReAct).",
                "Le chatbot est écrit en C++ et l'agent est écrit en HTML.",
                "L'agent d'IDE est uniquement capable de traduire des textes en espagnol."
              ],
              correctIndex: 1,
              explanation: "Un agent d'IDE n'est pas un simple générateur de texte : il possède des capacités d'action (Tool-Use) qui lui permettent de lire, chercher, tester et éditer des fichiers directement sur votre machine sous votre contrôle."
            },
            {
              id: 2,
              question: "Dans le pattern ReAct utilisé par les agents de développement, à quoi correspondent les trois étapes fondamentales ?",
              options: [
                "Reboot, Annule, Confirme.",
                "Thought (Raisonnement / Hypothèse), Action (Appel d'outil comme lire ou chercher), Observation (Analyse du résultat retourné par l'outil).",
                "React, Angular, Vue.",
                "Recharge, Attends, Coupe."
              ],
              correctIndex: 1,
              explanation: "Le cycle ReAct structure la progression de l'agent : il formule d'abord une réflexion (Thought), choisit et exécute un outil adéquat (Action), puis analyse la réponse du système (Observation) pour décider de la suite."
            },
            {
              id: 3,
              question: "Comment un agent d'IDE moderne localise-t-il les fichiers pertinents sans être submergé par la taille colossale d'un projet ?",
              options: [
                "En copiant l'intégralité du disque dur sur un serveur distant.",
                "En combinant la recherche sémantique vectorielle (Embeddings du code), la recherche lexicale par expressions régulières et l'analyse de l'arbre syntaxique (AST / LSP).",
                "En supprimant tous les fichiers qui n'ont pas été modifiés depuis 2 jours.",
                "En demandant au système d'exploitation de masquer les dossiers non utilisés."
              ],
              correctIndex: 1,
              explanation: "Pour respecter la limite de contexte du modèle, l'agent utilise des index vectoriels et des requêtes ciblées de recherche de symboles au lieu d'ingérer l'intégralité du repository."
            },
            {
              id: 4,
              question: "Pourquoi est-il crucial d'activer la confirmation humaine (human-in-the-loop) sur les outils de terminal d'un agent ?",
              options: [
                "Pour faire patienter le modèle de langage.",
                "Pour éviter que l'agent n'exécute accidentellement des commandes destructrices (ex: git reset --hard, suppression de volumes Docker, migration SQL destructive).",
                "Parce que le terminal Linux refuse d'exécuter des requêtes envoyées par des programmes tiers.",
                "Pour permettre à l'IDE de recharger ses polices de caractères."
              ],
              correctIndex: 1,
              explanation: "L'ingénieur reste le garant de la sécurité de son poste et de son infrastructure. La validation explicite des commandes shell à risque prévient tout dérapage irréversible."
            },
            {
              id: 5,
              question: "Quel est l'intérêt de demander à un agent d'établir un plan (/plan) avant toute modification de code ?",
              options: [
                "Cela permet de vérifier sa compréhension du problème et d'approuver sa stratégie avant qu'il ne modifie des fichiers de façon désordonnée.",
                "Cela permet d'imprimer le code sur papier avant de l'exécuter.",
                "Cela oblige l'agent à traduire le projet en TypeScript strict.",
                "Cela accélère la vitesse de téléchargement de l'IDE."
              ],
              correctIndex: 0,
              explanation: "Exiger un plan force l'agent à synthétiser sa compréhension et permet à l'ingénieur de corriger une mauvaise hypothèse avant que le moindre fichier source ne soit altéré."
            },
            {
              id: 6,
              question: "Face à une anomalie complexe entre frontend et backend, quel est l'avantage décisif d'un agent par rapport à une inspection manuelle isolée ?",
              options: [
                "L'agent peut lire simultanément les contrats d'interface côté client (fetch / hooks) et côté serveur (contrôleurs / validation Zod) pour repérer immédiatement les divergences de typage.",
                "L'agent peut forcer le navigateur client à ignorer les protocoles HTTP.",
                "L'agent remplace automatiquement la base de données PostgreSQL par un fichier texte.",
                "L'agent supprime les pare-feu de l'entreprise pour simplifier les tests."
              ],
              correctIndex: 0,
              explanation: "L'agent d'IDE excelle dans l'analyse multicouche : en quelques secondes, il compare le schéma attendu par l'API backend et l'objet JSON envoyé par le client frontend, détectant les désalignements de contrat."
            }
          ]}
        />
      </section>
    </div>
  );
};
