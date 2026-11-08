'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type StepKey = 'mapping' | 'rca' | 'patch' | 'report';

interface AuditBug {
  id: string;
  component: string;
  title: string;
  symptom: string;
  immediateCause: string;
  rootCause: string;
  patchSummary: string;
  testStatus: 'pending' | 'passed';
}

export const FullStackAuditCapstoneLab: React.FC = () => {
  const [activeStep, setActiveStep] = useState<StepKey>('mapping');

  const [bugs, setBugs] = useState<AuditBug[]>([
    {
      id: 'BUG-001',
      component: 'Auth / Frontend',
      title: 'Échec de connexion (Contrat JSON)',
      symptom: 'Connexion impossible alors que les identifiants sont valides (HTTP 400).',
      immediateCause: 'Le backend attend req.body.password mais reçoit undefined.',
      rootCause: 'Le formulaire React transmet passwordUser au lieu de password.',
      patchSummary: 'Harmoniser le payload React : { email, password: passwordUser }.',
      testStatus: 'pending',
    },
    {
      id: 'BUG-002',
      component: 'Backend Express',
      title: 'Crash HTTP 500 sur commande absente',
      symptom: 'GET /api/orders/999999 retourne HTTP 500 au lieu de HTTP 404.',
      immediateCause: 'TypeError: Cannot read properties of undefined (reading "id").',
      rootCause: 'Le contrôleur accède directement à order.id sans vérifier si le repository retourne un résultat.',
      patchSummary: 'Ajouter if (!order) return res.status(404).json({ message: "Commande introuvable" });',
      testStatus: 'pending',
    },
    {
      id: 'BUG-003',
      component: 'Intégration IA',
      title: 'Blocage requête sur timeout Gemini',
      symptom: 'Requête d\'analyse suspendue indéfiniment lors d\'un ralentissement réseau du fournisseur.',
      immediateCause: 'Aucun AbortController ou timeout configuré sur le client de l\'API IA.',
      rootCause: 'Absence de contrôle de délai d\'attente (timeout) et de circuit breaker sur les services tiers.',
      patchSummary: 'Envelopper l\'appel dans une promesse avec AbortSignal (timeout 8000ms) et gestion d\'erreur 504.',
      testStatus: 'pending',
    },
    {
      id: 'BUG-004',
      component: 'Stockage Fichiers',
      title: 'Upload sans restriction de type/taille',
      symptom: 'Téléversement possible de fichiers exécutables ou arbitrairement volumineux.',
      immediateCause: 'Configuration Multer par défaut sans filtre fileFilter ni limits.fileSize.',
      rootCause: 'Vulnérabilité de téléversement : absence de liste blanche d\'extensions MIME et de quota mémoire.',
      patchSummary: 'Configurer Multer : limits: { fileSize: 5MB }, fileFilter pour n\'autoriser que PDF et images.',
      testStatus: 'pending',
    },
    {
      id: 'BUG-005',
      component: 'Sécurité / Autorisation',
      title: 'Faille IDOR / BOLA sur les commandes',
      symptom: 'Un utilisateur connecté peut consulter les commandes privées d\'un autre client.',
      immediateCause: 'La route vérifie le JWT mais n\'effectue aucun contrôle d\'appartenance de la commande.',
      rootCause: 'Contrôle d\'accès au niveau objet absent (Broken Object Level Authorization).',
      patchSummary: 'Vérifier dans le contrôleur : if (order.user_id !== req.user.id) return res.status(403).json(...);',
      testStatus: 'pending',
    },
  ]);

  const [selectedBugId, setSelectedBugId] = useState<string>('BUG-001');
  const [suiteRunState, setSuiteRunState] = useState<'idle' | 'running' | 'done'>('idle');

  const currentBug = bugs.find((b) => b.id === selectedBugId)!;

  const runAllTests = () => {
    setSuiteRunState('running');
    setTimeout(() => {
      setBugs((prev) => prev.map((b) => ({ ...b, testStatus: 'passed' })));
      setSuiteRunState('done');
    }, 1200);
  };

  const allPassed = bugs.every((b) => b.testStatus === 'passed');

  return (
    <div className="rounded-3xl border-2 border-emerald-300 bg-white shadow-xl overflow-hidden text-slate-900 font-sans my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 p-6 sm:p-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Icon name="rocket" className="w-3.5 h-3.5" /> Projet de Synthèse Capstone • Module 8
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-2">
              Console d&apos;Audit, Diagnostic &amp; Remédiation Multi-Couches
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Mettez en pratique les 10 étapes d&apos;ingénierie sur l&apos;application documentaire : inspection architecturale, analyse des causes racines (RCA), planification de patchs et validation par tests automatisés.
            </p>
          </div>
        </div>

        {/* Steps Navigation Bar */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActiveStep('mapping')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeStep === 'mapping'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Icon name="layout" className="w-4 h-4" />
            1. Cartographie (5 Anomalies)
          </button>
          <button
            onClick={() => setActiveStep('rca')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeStep === 'rca'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Icon name="search" className="w-4 h-4" />
            2. Diagnostic &amp; Causes Racines (RCA)
          </button>
          <button
            onClick={() => setActiveStep('patch')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeStep === 'patch'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Icon name="code" className="w-4 h-4" />
            3. Plan de Patch &amp; Git Diff
          </button>
          <button
            onClick={() => setActiveStep('report')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeStep === 'report'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Icon name="check-circle" className="w-4 h-4" />
            4. Tests Vitest &amp; Rapport d&apos;Audit
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* STEP 1: MAPPING */}
        {activeStep === 'mapping' && (
          <div className="space-y-6">
            <div className="border-b pb-4 border-slate-200">
              <h4 className="font-extrabold text-base sm:text-lg text-slate-950">
                Inventaire des 5 Anomalies Critiques de l&apos;Application
              </h4>
              <p className="text-xs text-slate-600">
                Explorez l&apos;architecture distribuée : React (Frontend), Express (Backend), MySQL (Persistance) et Gemini (Service IA).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bugs.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    setSelectedBugId(b.id);
                    setActiveStep('rca');
                  }}
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/30 transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">{b.id}</span>
                      <span>{b.component}</span>
                    </div>
                    <div className="font-black text-sm text-slate-950 mt-2">{b.title}</div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{b.symptom}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 pt-2 border-t border-slate-200">
                    <span>Analyser la cause racine</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: RCA */}
        {activeStep === 'rca' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-4 border-slate-200">
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-slate-950">
                  Décomposition Causale (Méthode des 5 Pourquoi)
                </h4>
                <p className="text-xs text-slate-600">
                  Distinguez le symptôme observable, l&apos;erreur technique immédiate et la cause racine de conception.
                </p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {bugs.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBugId(b.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      selectedBugId === b.id
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    }`}
                  >
                    {b.id}
                  </button>
                ))}
              </div>
            </div>

            {/* RCA Card */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {currentBug.id} • {currentBug.component}
                </span>
                <span className="text-xs font-bold text-slate-500">Dossier technique d&apos;investigation</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-xs font-mono font-bold uppercase text-amber-700">1. Symptôme Observable</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">{currentBug.symptom}</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-xs font-mono font-bold uppercase text-rose-700">2. Cause Immédiate</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">{currentBug.immediateCause}</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
                  <span className="text-xs font-mono font-bold uppercase text-emerald-900">3. Cause Racine (RCA)</span>
                  <p className="text-xs sm:text-sm font-bold text-emerald-950 mt-1">{currentBug.rootCause}</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveStep('patch')}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer flex items-center gap-2"
                >
                  Passer au Plan de Patch &amp; Git Diff →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PATCH & GIT DIFF */}
        {activeStep === 'patch' && (
          <div className="space-y-6">
            <div className="border-b pb-4 border-slate-200">
              <h4 className="font-extrabold text-base sm:text-lg text-slate-950">
                Plan de Correction &amp; Revue du Git Diff
              </h4>
              <p className="text-xs text-slate-600">
                Vérifiez que le correctif cible strictement la cause racine sans toucher aux fichiers sensibles (.env).
              </p>
            </div>

            <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 font-mono text-xs border border-slate-800 shadow-md space-y-3 leading-relaxed">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                <span>$ git diff -- {currentBug.id}</span>
                <span className="text-emerald-400">Périmètre autorisé : 1 fichier ciblé</span>
              </div>
              <div className="text-slate-300">
                <span className="text-amber-400"># Action corrective validée pour {currentBug.title}</span>
                <br />
                <span className="text-emerald-400 font-bold">{currentBug.patchSummary}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto">
                <span className="text-slate-500">{"//"} Statut de sécurité :</span>
                <br />
                <span className="text-emerald-400">✓ Aucun fichier .env modifié</span>
                <br />
                <span className="text-emerald-400">✓ Aucune dépendance externe arbitraire ajoutée</span>
                <br />
                <span className="text-emerald-400">✓ Contrat d&apos;API restauré conformément aux spécifications</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStep('report')}
                className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer flex items-center gap-2"
              >
                Passer aux Tests Automatisés (Vitest) →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REPORT & TESTS */}
        {activeStep === 'report' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-4 border-slate-200">
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-slate-950">
                  Validation Automatisée &amp; Rapport d&apos;Audit Final
                </h4>
                <p className="text-xs text-slate-600">
                  Exécutez la suite complète de non-régression avec Vitest et Supertest.
                </p>
              </div>
              <button
                onClick={runAllTests}
                disabled={suiteRunState === 'running'}
                className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Icon name="check-circle" className="w-4 h-4" />
                {suiteRunState === 'running' ? 'Exécution des tests...' : 'Lancer les tests Vitest'}
              </button>
            </div>

            {/* Test Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Anomalie</th>
                    <th className="px-4 py-3">Composant</th>
                    <th className="px-4 py-3">Statut Test</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
                  {bugs.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-emerald-800">{b.id}</td>
                      <td className="px-4 py-3 font-semibold">{b.title}</td>
                      <td className="px-4 py-3 text-slate-600">{b.component}</td>
                      <td className="px-4 py-3">
                        {b.testStatus === 'passed' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                            ✓ Réussi (100%)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                            ⏳ En attente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Final Verdict Banner */}
            {allPassed && (
              <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Statut Officiel de l&apos;Audit Final
                  </span>
                  <h4 className="text-lg font-black text-emerald-950 mt-1">
                    APPLICATION HOMOLOGUÉE — STATUT : VALIDÉ
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-900 mt-1 font-medium">
                    Toutes les anomalies (BUG-001 à BUG-005) sont traitées à la racine. Aucun fichier sensible n&apos;a été altéré et la matrice de non-régression affiche 100 % de succès.
                  </p>
                </div>
                <div className="bg-emerald-600 text-white text-xs font-black px-4 py-2 rounded-xl text-center shadow-xs">
                  Couverture : 94.2%
                  <br />
                  5/5 Validés
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullStackAuditCapstoneLab;
