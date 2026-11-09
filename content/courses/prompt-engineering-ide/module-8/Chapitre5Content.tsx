'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Définir la communication et la délégation des missions
        </h1>
      </div>

      {/* 1. Communication vs Délégation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Différence fondamentale entre Communication et Délégation
        </h2>
        <p className="text-slate-700">
          Dans une équipe d&apos;agents, échanger des données informatives ne confère aucun pouvoir d&apos;intervention. La distinction est vitale pour la gouvernance :
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Communication d&apos;information</th>
                <th className="p-3">Délégation de mission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3">Transmettre un extrait de code ou une précision</td>
                <td className="p-3 font-semibold text-purple-900">Confier la responsabilité d&apos;un livrable précis</td>
              </tr>
              <tr>
                <td className="p-3">Signaler une anomalie observée</td>
                <td className="p-3 font-semibold text-purple-900">Attribuer des droits d&apos;analyse ou de proposition de diff</td>
              </tr>
              <tr>
                <td className="p-3">Partager un statut d&apos;avancement</td>
                <td className="p-3 font-semibold text-purple-900">Définir des contraintes et des critères d&apos;acceptation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Le contrat de mission à 11 paramètres */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Le contrat de mission type à 11 paramètres
        </h2>
        <p className="text-slate-700">
          Chaque mission confiée par le coordinateur doit renseigner l&apos;intégralité des 11 champs pour empêcher toute dérive :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">1. Identifiant unique (MISSION_ID)</span>
            <p className="text-slate-600 font-mono text-xs">Exemple : DEV-003, SEC-003, TEST-003</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">2. Agent destinataire</span>
            <p className="text-slate-600 font-mono text-xs">Nom exact du spécialiste concerné</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">3. Objectif premier</span>
            <p className="text-slate-600">Résultat attendu clair, concis et mesurable</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">4. Contexte technique</span>
            <p className="text-slate-600">Composants, frameworks et routes nécessaires</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">5. Périmètre autorisé</span>
            <p className="text-slate-600">Liste limitative des fichiers consultables</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">6. Travail attendu</span>
            <p className="text-slate-600">Actions concrètes demandées pas à pas</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">7. Restrictions formelles</span>
            <p className="text-slate-600">Interdictions d&apos;écriture sans accord, zéro terminal</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">8. Dépendances amont</span>
            <p className="text-slate-600">Résultats préalables indispensables pour débuter</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">9. Livrable obligatoire</span>
            <p className="text-slate-600">Format de sortie (tableau, diff, plan de test)</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">10. Critères de validation</span>
            <p className="text-slate-600">Conditions précises pour considérer le travail recevable</p>
          </div>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 text-xs sm:text-sm">
          <span className="font-bold text-purple-800">11. Priorité et Statut initial</span>
          <p className="text-slate-600 font-mono text-xs">Niveau d&apos;urgence (Critique, Élevé, Normal) et statut (À FAIRE)</p>
        </div>
      </section>

      {/* 3. Statuts et Résolution des désaccords */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Arbitrage des désaccords techniques entre agents
        </h2>
        <p className="text-slate-700">
          Lorsqu&apos;un désaccord survient (par exemple, le développeur propose de stocker un token dans <code>localStorage</code> alors que l&apos;agent sécurité exige un cookie HTTP-only <code>Secure</code>) :
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs sm:text-sm">
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
            <li><strong>Le coordinateur</strong> ne tranche jamais seul de façon arbitraire.</li>
            <li>Il confronte les deux argumentaires techniques et extrait les risques et bénéfices respectifs.</li>
            <li>Il prépare une fiche d&apos;arbitrage soumise au <strong>développeur humain</strong> qui prend la décision finale en toute connaissance de cause.</li>
          </ol>
        </div>

        <Callout type="tip" title="Véracité des délégations">
          Si votre version de Google Antigravity n&apos;exécute pas automatiquement les sous-agents en tâche de fond, préparez les messages au format texte pour une <strong>transmission manuelle guidée</strong>. Ne prétendez jamais qu&apos;une délégation magique s&apos;est produite sans retour matériel.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Communication &amp; Délégation
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la différence fondamentale entre une mission ayant le statut 'En préparation' et une mission ayant le statut 'Transmise' ?",
              options: [
                "Aucune, ce sont des synonymes",
                "Une mission 'En préparation' est rédigée par le coordinateur, tandis qu'une mission 'Transmise' a réellement été envoyée à l'agent",
                "Une mission 'Transmise' est déjà validée par l'humain",
                "La mission 'En préparation' est en lecture seule"
              ],
              correctIndex: 1,
              explanation: "Le coordinateur doit distinguer ce qu'il a planifié mentalement de ce qui a matériellement été communiqué à un agent tiers."
            },
            {
              id: 2,
              question: "Que doit faire le coordinateur lorsque le développeur et l'agent sécurité sont en désaccord sur la manière de stocker un secret ?",
              options: [
                "Choisir la solution la plus rapide sans rien dire",
                "Supprimer le rapport de sécurité",
                "Comparer les arguments techniques et soumettre l'arbitrage au développeur humain",
                "Supprimer le fichier concerné"
              ],
              correctIndex: 2,
              explanation: "Un désaccord de conception révèle une décision d'architecture sensible : l'arbitrage revient obligatoirement au responsable humain."
            }
          ]}
        />
      </section>
    </div>
  );
};

