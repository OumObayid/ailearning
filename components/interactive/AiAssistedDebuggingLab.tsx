'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type TabKey = 'prompt' | 'audit' | 'sandbox';

interface PromptComponent {
  key: string;
  name: string;
  role: string;
  included: boolean;
  content: string;
}

interface AuditCase {
  id: string;
  title: string;
  context: string;
  aiProposal: string;
  isHallucination: boolean;
  verdict: 'acceptable' | 'hallucination' | 'superficial';
  analysis: string;
}

export const AiAssistedDebuggingLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('prompt');

  // Tab 1: Prompt Builder State
  const [promptComponents, setPromptComponents] = useState<PromptComponent[]>([
    { key: 'role', name: '1. ROLE (Expertise)', role: 'Ingénieur backend senior spécialisé Node.js, Express, TypeScript & MySQL', included: true, content: 'Tu es un ingénieur logiciel spécialisé dans le diagnostic et l\'investigation de bugs backend.' },
    { key: 'objective', name: '2. OBJECTIVE (Mission)', role: 'Résultat technique recherché sans ambiguïté', included: true, content: 'Identifier la cause racine d\'une erreur HTTP 500 sur GET /users/:id sans modifier de fichier.' },
    { key: 'context', name: '3. CONTEXT (Environnement)', role: 'Versions, stack et architecture du projet', included: true, content: 'Node.js 22, Express 5, TypeScript 5, MySQL 8 avec mysql2/promise.' },
    { key: 'data', name: '4. DATA (Logs & Code)', role: 'Stack Trace, extrait de code et requête HTTP', included: true, content: 'TypeError: Cannot read properties of null (reading "id") at getUserProfile (src/services/userService.ts:15).' },
    { key: 'tasks', name: '5. TASKS (Étapes)', role: 'Décomposition séquentielle du raisonnement', included: true, content: '1. Suivre le parcours de la requête. 2. Formuler 3 hypothèses. 3. Classer par probabilité. 4. Proposer des tests.' },
    { key: 'constraints', name: '6. CONSTRAINTS (Garde-fous)', role: 'Interdiction de modifier le code ou d\'inventer', included: true, content: 'NE MODIFIE AUCUN FICHIER. Ne crée aucun patch. Ne fais aucune supposition sans preuve dans le code.' },
    { key: 'output', name: '7. OUTPUT FORMAT (Livrable)', role: 'Structure stricte du rapport de diagnostic', included: true, content: 'Format : Symptôme, Faits confirmés, Hypothèses, Cause racine probable, Tests à exécuter.' },
  ]);

  // Tab 2: Hallucination & Audit Cases
  const auditCases: AuditCase[] = [
    {
      id: 'case-1',
      title: 'Méthode magique inexistante',
      context: 'Application utilisant la bibliothèque native mysql2/promise.',
      aiProposal: 'const [user] = await db.findUserById(req.params.id);',
      isHallucination: true,
      verdict: 'hallucination',
      analysis: 'Hallucination d\'API : l\'objet Pool de mysql2/promise ne possède pas de méthode "findUserById()". Il faut utiliser db.execute("SELECT ...", [id]).',
    },
    {
      id: 'case-2',
      title: 'Contournement superficiel (Optional Chaining)',
      context: 'Contrôleur Express retournant le profil d\'un utilisateur inexistant.',
      aiProposal: 'return res.json({ id: user?.id, email: user?.email });',
      isHallucination: false,
      verdict: 'superficial',
      analysis: 'Correction superficielle : elle empêche le crash immédiat mais renvoie { id: null, email: null } en HTTP 200, violant le contrat API qui exige un statut HTTP 404 Not Found.',
    },
    {
      id: 'case-3',
      title: 'Accusation erronée de la base de données',
      context: 'La route déclare router.get("/users/:id") mais le contrôleur lit req.params.userId.',
      aiProposal: 'L\'erreur 500 provient d\'un timeout de connexion MySQL, vérifiez les identifiants dans .env.',
      isHallucination: true,
      verdict: 'hallucination',
      analysis: 'Fausse cause racine : req.params.userId vaut undefined car le paramètre s\'appelle :id. L\'IA invente un problème de base de données sans examiner le contrat de routage.',
    },
  ];
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1');
  const [userAuditVerdict, setUserAuditVerdict] = useState<string | null>(null);

  // Tab 3: Sandbox & Test Runner
  const [sandboxPermissions, setSandboxPermissions] = useState({
    canReadSource: true,
    canReadEnv: false,
    canWriteController: true,
    canWriteService: false,
    canRunTerminal: true,
  });
  const [testPhase, setTestPhase] = useState<'initial' | 'red' | 'green'>('initial');

  const toggleComponent = (key: string) => {
    setPromptComponents((prev) =>
      prev.map((c) => (c.key === key ? { ...c, included: !c.included } : c))
    );
  };

  const currentAuditCase = auditCases.find((c) => c.id === selectedCaseId)!;
  const isAllIncluded = promptComponents.every((c) => c.included);

  return (
    <div className="rounded-3xl border-2 border-emerald-300 bg-white shadow-xl overflow-hidden text-slate-900 font-sans my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Icon name="sparkles" className="w-3.5 h-3.5" /> Laboratoire Interactif Module 7
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-1">
              Atelier Pratique : Ingénierie du Débogage Assistée par IA
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Expérimentez la construction de prompts stricts, le démasquage des hallucinations et l&apos;encadrement de permissions pour agent IDE sous test automatisé.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'prompt'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Icon name="terminal" className="w-4 h-4" />
            1. Constructeur de Prompt (7 Piliers)
          </button>
          <button
            onClick={() => {
              setActiveTab('audit');
              setUserAuditVerdict(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Icon name="shield-check" className="w-4 h-4" />
            2. Audit Critique &amp; Hallucinations
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'sandbox'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Icon name="server" className="w-4 h-4" />
            3. Bac à Sable Agent &amp; Tests Vitest
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* TAB 1: PROMPT BUILDER */}
        {activeTab === 'prompt' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-4 border-slate-200">
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-slate-950">
                  Composition des 7 Piliers d&apos;un Prompt Professionnel
                </h4>
                <p className="text-xs text-slate-600">
                  Activez ou désactivez les blocs pour observer l&apos;impact sur la rigueur du diagnostic.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  isAllIncluded
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}>
                  {promptComponents.filter((c) => c.included).length} / 7 piliers activés
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Toggles */}
              <div className="space-y-3">
                {promptComponents.map((comp) => (
                  <div
                    key={comp.key}
                    onClick={() => toggleComponent(comp.key)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      comp.included
                        ? 'border-emerald-500 bg-emerald-50/60'
                        : 'border-slate-200 bg-slate-50 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="font-black text-sm text-slate-900">{comp.name}</div>
                      <div className="text-xs text-slate-600 font-medium">{comp.role}</div>
                    </div>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      comp.included ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                    }`}>
                      {comp.included ? '✓' : '✕'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live Preview */}
              <div className="space-y-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-slate-500">
                    Aperçu du Prompt Généré
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">
                    {promptComponents.find((c) => c.key === 'constraints')?.included
                      ? '🛡️ Garde-fous actifs (Diagnostic seul)'
                      : '⚠️ Risque : l\'agent risque de modifier les fichiers'}
                  </span>
                </div>
                <div className="bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-xs overflow-y-auto max-h-[380px] space-y-3 leading-relaxed border border-slate-800 flex-1 shadow-inner">
                  {promptComponents.filter((c) => c.included).map((c) => (
                    <div key={c.key} className="space-y-1">
                      <div className="text-emerald-400 font-bold tracking-wider">{`[${c.name.toUpperCase()}]`}</div>
                      <p className="text-slate-300 pl-2 border-l border-emerald-500/40">{c.content}</p>
                    </div>
                  ))}
                  {promptComponents.filter((c) => c.included).length === 0 && (
                    <p className="text-rose-400 italic">Veuillez activer au moins un pilier pour générer un prompt.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUDIT CRITIQUE */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="border-b pb-4 border-slate-200">
              <h4 className="font-extrabold text-base sm:text-lg text-slate-950">
                Détecteur d&apos;Hallucinations et Corrections Trompeuses
              </h4>
              <p className="text-xs text-slate-600">
                Sélectionnez une réponse générée par une IA et qualifiez sa pertinence technique avant tout déploiement.
              </p>
            </div>

            {/* Case Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {auditCases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCaseId(c.id);
                    setUserAuditVerdict(null);
                  }}
                  className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                    selectedCaseId === c.id
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="font-black text-xs text-slate-950">{c.title}</div>
                  <div className="text-xs text-slate-600 mt-1 line-clamp-2">{c.context}</div>
                </button>
              ))}
            </div>

            {/* Active Case Review */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-500">Contexte Réel</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">{currentAuditCase.context}</p>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-500">Proposition de l&apos;IA</span>
                <div className="mt-1 bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-xs">
                  {currentAuditCase.aiProposal}
                </div>
              </div>

              {/* User Voting */}
              <div>
                <div className="text-xs font-bold text-slate-800 mb-2">Votre évaluation de cette réponse :</div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setUserAuditVerdict('hallucination')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      userAuditVerdict === 'hallucination'
                        ? 'bg-rose-600 text-white border-rose-700'
                        : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    }`}
                  >
                    🚨 Hallucination d&apos;API / Inexistante
                  </button>
                  <button
                    onClick={() => setUserAuditVerdict('superficial')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      userAuditVerdict === 'superficial'
                        ? 'bg-amber-500 text-slate-950 border-amber-600'
                        : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    }`}
                  >
                    ⚠️ Patch superficiel (Masque le bug)
                  </button>
                  <button
                    onClick={() => setUserAuditVerdict('acceptable')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      userAuditVerdict === 'acceptable'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    }`}
                  >
                    ✓ Correction valide &amp; rigoureuse
                  </button>
                </div>
              </div>

              {/* Verification Feedback */}
              {userAuditVerdict && (
                <div className={`p-4 rounded-xl border-2 text-xs sm:text-sm font-medium ${
                  userAuditVerdict === currentAuditCase.verdict
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="font-black flex items-center gap-2 mb-1">
                    {userAuditVerdict === currentAuditCase.verdict ? '✓ Verdict Exact !' : '✕ Analyse inexacte'}
                  </div>
                  <p>{currentAuditCase.analysis}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SANDBOX & TESTS */}
        {activeTab === 'sandbox' && (
          <div className="space-y-6">
            <div className="border-b pb-4 border-slate-200">
              <h4 className="font-extrabold text-base sm:text-lg text-slate-950">
                Périmètre de Sécurité &amp; Cycle Red - Green - Refactor
              </h4>
              <p className="text-xs text-slate-600">
                Contrôlez les autorisations d&apos;accès de l&apos;agent (Moindre Privilège) et validez la correction avec Vitest &amp; Supertest.
              </p>
            </div>

            {/* Permissions Toggles */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-3">
                Matrice des Permissions de l&apos;Agent (Principe du Moindre Privilège)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sandboxPermissions.canReadSource}
                    onChange={(e) => setSandboxPermissions({ ...sandboxPermissions, canReadSource: e.target.checked })}
                    className="accent-emerald-600 w-4 h-4 cursor-pointer"
                  />
                  <span>Lecture src/controllers/ (READ)</span>
                </label>
                <label className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sandboxPermissions.canReadEnv}
                    onChange={(e) => setSandboxPermissions({ ...sandboxPermissions, canReadEnv: e.target.checked })}
                    className="accent-rose-600 w-4 h-4 cursor-pointer"
                  />
                  <span className={sandboxPermissions.canReadEnv ? 'text-rose-600 font-black' : 'text-slate-700'}>
                    Accès .env &amp; Secrets {sandboxPermissions.canReadEnv ? '(DANGER)' : '(PROTÉGÉ)'}
                  </span>
                </label>
                <label className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sandboxPermissions.canWriteController}
                    onChange={(e) => setSandboxPermissions({ ...sandboxPermissions, canWriteController: e.target.checked })}
                    className="accent-emerald-600 w-4 h-4 cursor-pointer"
                  />
                  <span>Écriture ciblée userController.ts (WRITE)</span>
                </label>
              </div>
            </div>

            {/* Test Execution Simulator */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-600">
                  Suite de tests automatisés : tests/userController.test.ts
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTestPhase('red')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300 transition-all cursor-pointer"
                  >
                    1. Échec avant patch (RED)
                  </button>
                  <button
                    onClick={() => setTestPhase('green')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 transition-all cursor-pointer"
                  >
                    2. Succès après patch (GREEN)
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 font-mono text-xs border border-slate-800 shadow-md space-y-3">
                <div className="text-slate-400">
                  $ npm run test -- userController.test.ts
                </div>

                {testPhase === 'initial' && (
                  <div className="text-slate-400 italic">
                    Cliquez sur l&apos;un des boutons ci-dessus pour simuler le cycle de validation automatique.
                  </div>
                )}

                {testPhase === 'red' && (
                  <div className="space-y-2">
                    <div className="text-emerald-400 font-bold">✓ GET /users/15 (Utilisateur existant) -&gt; 200 OK</div>
                    <div className="text-rose-400 font-bold">✕ GET /users/99999 (Utilisateur absent) -&gt; Attendu 404, Reçu 500</div>
                    <div className="text-slate-400 text-xs pl-4 border-l-2 border-rose-500">
                      TypeError: Cannot read properties of null (reading &apos;id&apos;)
                      <br />at getUserProfile (src/services/userService.ts:15:22)
                    </div>
                    <div className="text-rose-400 font-bold pt-2 border-t border-slate-800">
                      Tests: 1 failed, 1 passed, 2 total (Cycle RED confirmé : le test détecte bien le bug initial).
                    </div>
                  </div>
                )}

                {testPhase === 'green' && (
                  <div className="space-y-2">
                    <div className="text-emerald-400 font-bold">✓ GET /users/15 (Utilisateur existant) -&gt; 200 OK</div>
                    <div className="text-emerald-400 font-bold">✓ GET /users/99999 (Utilisateur absent) -&gt; 404 Not Found</div>
                    <div className="text-emerald-400 font-bold">✓ GET /users/15 (Erreur SQL db.execute) -&gt; 500 Internal Server Error</div>
                    <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                      Tests: 3 passed, 3 total (Cycle GREEN validé : la correction traite la cause racine sans régression).
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistedDebuggingLab;

