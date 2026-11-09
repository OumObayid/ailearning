'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Concevoir l&apos;architecture globale du système multi-agents
        </h1>
      </div>

      {/* 1. Architecture Hiérarchique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. L&apos;Architecture Hiérarchique sous Souveraineté Humaine
        </h2>
        <p className="text-slate-700">
          Une équipe de 5 agents ne doit jamais fonctionner en réseau pair-à-pair anarchique où chacun interpelle n&apos;importe qui. Nous mettons en œuvre une architecture en étoile hiérarchisée centrée sur l&apos;agent coordinateur :
        </p>

        <div className="p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-inner space-y-4 text-xs font-mono">
          <div className="text-center font-bold text-emerald-400 border-b border-slate-800 pb-2 text-sm">
            UTILISATEUR / DÉVELOPPEUR HUMAIN (Validation Souveraine HITL)
          </div>
          <div className="text-center text-slate-400">↓ [Demandes &amp; Arbitrages]</div>
          <div className="p-3 bg-purple-950/80 border-2 border-purple-400 rounded-xl text-center text-purple-200 font-bold">
            AGENT COORDINATEUR (Planifie • Décompose • Attribue • Synthétise)
          </div>
          <div className="text-center text-slate-400">↓ [Délégation de missions ciblées]</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-slate-800 border border-blue-400/40 rounded-lg text-blue-200">
              <span className="font-bold">Développeur</span><br />React / Express
            </div>
            <div className="p-2.5 bg-slate-800 border border-rose-400/40 rounded-lg text-rose-200">
              <span className="font-bold">Sécurité</span><br />Audit &amp; Risques
            </div>
            <div className="p-2.5 bg-slate-800 border border-amber-400/40 rounded-lg text-amber-200">
              <span className="font-bold">Testeur</span><br />QA &amp; Preuves
            </div>
            <div className="p-2.5 bg-slate-800 border border-emerald-400/40 rounded-lg text-emerald-200">
              <span className="font-bold">Documentaliste</span><br />Docs API &amp; Guides
            </div>
          </div>
          <div className="text-center text-slate-400">↑ [Comptes-rendus structurés]</div>
          <div className="text-center text-emerald-300 font-bold pt-2 border-t border-slate-800">
            RAPPORT FINAL DE CONFORMITÉ → SOUMIS AU DÉVELOPPEUR HUMAIN
          </div>
        </div>
      </section>

      {/* 2. Format standardisé de transmission de mission */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Structure standard d&apos;une mission déléguée
        </h2>
        <p className="text-slate-700">
          Le coordinateur ne transmet jamais une phrase lapidaire. Chaque ordre de mission est un contrat technique autonome :
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-1">
          <div className="text-purple-400 font-bold border-b border-slate-800 pb-1">
            # CONTRAT DE MISSION TYPE (DEV-001 / SEC-001 / TEST-001 / DOC-001)
          </div>
          <pre>{`1. MISSION_ID : DEV-001
2. AGENT DESTINATAIRE : Agent Développeur
3. OBJECTIF PREMIER : Concevoir la solution technique du CRUD projets
4. PÉRIMÈTRE AUTORISÉ : src/components/Projects/ et src/api/routes/projects.js
5. TRAVAIL ATTENDU : Identifier les endpoints REST, définir les payloads et diffs
6. RESTRICTIONS STRICTES : Mode lecture seule, aucune écriture sans diff validé
7. DÉPENDANCES PRÉALABLES : Schéma de données MySQL validé
8. LIVRABLE REQUIS : Proposition technique avec aperçu de code unifié
9. CRITÈRE D'ACCEPTATION : Cohérence avec l'architecture Express existante
10. STATUT INITIAL : À FAIRE`}</pre>
        </div>
      </section>

      {/* 3. Dépendances et prévention des conflits */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Dépendances logiques et prévention des conflits
        </h2>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Risque de conflit</th>
                <th className="p-3">Conséquence sur le projet</th>
                <th className="p-3">Règle de gouvernance obligatoire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-semibold">Deux agents éditent le même fichier</td>
                <td className="p-3 text-rose-700">Écrasement de code, perte de logique</td>
                <td className="p-3">Un seul agent responsable des modifications (Développeur)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Le testeur valide avant livraison</td>
                <td className="p-3 text-rose-700">Faux rapports de réussite</td>
                <td className="p-3">Le testeur attend une version implémentée disponible</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Le documentaliste invente des routes</td>
                <td className="p-3 text-rose-700">Documentation trompeuse</td>
                <td className="p-3">La documentation ne traite que des éléments confirmés</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Les 6 statuts de mission */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le cycle de vie d&apos;une mission à 6 statuts
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs text-center font-mono font-bold">
          <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-700">À FAIRE</div>
          <div className="p-3 bg-blue-100 border border-blue-300 rounded-xl text-blue-800">EN COURS</div>
          <div className="p-3 bg-amber-100 border border-amber-300 rounded-xl text-amber-800">EN ATTENTE</div>
          <div className="p-3 bg-rose-100 border border-rose-300 rounded-xl text-rose-800">BLOQUÉE</div>
          <div className="p-3 bg-indigo-100 border border-indigo-300 rounded-xl text-indigo-800">TERMINÉE</div>
          <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900">VALIDÉE</div>
        </div>

        <Callout type="warning" title="Terminée vs Validée">
          Une mission n&apos;est pas automatiquement validée parce qu&apos;un agent annonce qu&apos;elle est <em>terminée</em>. Le coordinateur et l&apos;utilisateur doivent vérifier les preuves matérielles avant d&apos;accorder le statut <strong>VALIDÉE</strong>.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Architecture globale
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il primordial de désigner un agent unique responsable de l'écriture sur une zone de code donnée ?",
              options: [
                "Pour accélérer le téléchargement des packages npm",
                "Pour éviter les écrasements de code, les réécritures contradictoires et la perte de travail",
                "Pour désactiver le serveur MySQL",
                "Pour satisfaire les règles de Google Antigravity"
              ],
              correctIndex: 1,
              explanation: "L'unicité de responsabilité d'écriture garantit qu'aucune modification simultanée ne viendra corrompre le code source."
            },
            {
              id: 2,
              question: "Quel statut attribuer à une mission dont le code a été proposé par l'agent mais n'a pas encore fait l'objet d'un contrôle de conformité ?",
              options: [
                "VALIDÉE",
                "TERMINÉE (en attente de contrôle/validation)",
                "BLOQUÉE",
                "À FAIRE"
              ],
              correctIndex: 1,
              explanation: "L'agent a achevé son travail (TERMINÉE), mais la validation n'intervient qu'après vérification des preuves par le coordinateur et l'humain."
            }
          ]}
        />
      </section>
    </div>
  );
};

