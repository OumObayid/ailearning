'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Interaction entre l&apos;utilisateur et l&apos;agent IA
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. L&apos;agent comme partenaire de binôme (Pair Programmer)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un agent IA ne doit pas être un « trou noir » dans lequel on jette une consigne pour attendre passivement le résultat final. Le développement logiciel moderne exige une <strong>collaboration itérative</strong> où l&apos;humain conserve le contrôle de l&apos;architecture, des choix critiques et de la validation des livrables.
        </p>
      </section>

      {/* 2. Les 4 niveaux d'autonomie */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 niveaux d&apos;autonomie opérationnelle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700 block mb-1">NIVEAU 1</span>
            <h4 className="font-extrabold text-slate-950 text-base">Mode Observation (Read-Only)</h4>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              L&apos;agent inspecte les fichiers, trace les dépendances et produit des analyses techniques sans jamais solliciter d&apos;écriture. Risque zéro d&apos;altération.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700 block mb-1">NIVEAU 2</span>
            <h4 className="font-extrabold text-slate-950 text-base">Mode Préparation (Drafting)</h4>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              L&apos;agent conçoit les snippets de code, prépare les commandes terminal et rédige le plan complet, mais attend votre feu vert explicite avant toute application.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700 block mb-1">NIVEAU 3</span>
            <h4 className="font-extrabold text-slate-950 text-base">Mode Assisté (Supervised)</h4>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              L&apos;agent applique des modifications ciblées déjà approuvées, mais s&apos;arrête dès qu&apos;une décision structurante se présente (ajout de dépendance, modification de schéma).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700 block mb-1">NIVEAU 4</span>
            <h4 className="font-extrabold text-slate-950 text-base">Mode Autonome Encadré</h4>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              L&apos;agent enchaîne analyse, édition et tests au sein d&apos;un bac à sable strictement borné par les règles de l&apos;organisation.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Checkpoints */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les points de contrôle obligatoires (Checkpoints)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Point de contrôle</th>
                <th className="p-3 border border-slate-200">Travail réalisé par l&apos;agent</th>
                <th className="p-3 border border-slate-200">Décision attendue du développeur</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-700">Checkpoint 1 : Diagnostic</td>
                <td className="p-3 border border-slate-200">Cartographie des fichiers et identification de la cause.</td>
                <td className="p-3 border border-slate-200">Valider la compréhension du problème.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-700">Checkpoint 2 : Plan technique</td>
                <td className="p-3 border border-slate-200">Découpage en étapes et liste des fichiers à modifier.</td>
                <td className="p-3 border border-slate-200">Accepter, refuser ou amender le plan d&apos;action.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-700">Checkpoint 3 : Édition</td>
                <td className="p-3 border border-slate-200">Application chirurgicale de la modification.</td>
                <td className="p-3 border border-slate-200">Inspecter le Diff ligne par ligne.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-700">Checkpoint 4 : Validation</td>
                <td className="p-3 border border-slate-200">Exécution de npm run build et des tests de régression.</td>
                <td className="p-3 border border-slate-200">Homologuer la livraison ou demander une passe corrective.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Recadrage immédiat */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Savoir recadrer immédiatement un agent qui dérive
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Si l&apos;agent commence à réécrire des fichiers non sollicités ou à refondre tout le style CSS, vous devez intervenir sans attendre :
        </p>

        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`[MESSAGE_DE_RECADRAGE_IMMEDIAT]
Arrête immédiatement les opérations en cours.
Tu dépasses le périmètre strict de ma demande.
Je t'ai demandé uniquement de corriger l'affichage dans ProductCard.jsx.

CONSIGNES STRICTES :
1. Ne modifie aucun autre fichier.
2. N'installe aucune nouvelle dépendance.
3. Ne touche pas au CSS global.
4. Présente-moi la liste exacte des modifications déjà appliquées.
5. Attends mes instructions avant toute nouvelle action.`}</pre>
        </div>
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.10)
        </h2>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 4.10 — Pilotage interactif complet</span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Ajoutez une recherche par nom dans la liste des projets du portfolio.<br />
            Pendant l&apos;exercice : (1) formulez une demande volontairement concise, (2) observez si l&apos;agent vous pose des questions de clarification, (3) validez son plan, (4) simulez une dérive en lui ordonnant un recadrage ferme, et (5) exigez le compte rendu final normé.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Interaction utilisateur-agent
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 10"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il sain qu'un agent pose une question de clarification face à une consigne ambiguë ?",
              options: [
                "Parce qu'il cherche à retarder le projet.",
                "Pour éviter de prendre des décisions architecturales arbitraires qui ne correspondraient pas au besoin réel du développeur.",
                "Parce qu'il ne connaît pas le langage JavaScript.",
                "Pour réinitialiser le compte utilisateur."
              ],
              correctIndex: 1,
              explanation: "Poser une clarification ciblée évite le gaspillage de tokens et les modifications incompatibles fondées sur des hypothèses erronées."
            },
            {
              id: 2,
              question: "Quelle est la conduite à tenir si l'agent commence à modifier des fichiers en dehors du périmètre convenu ?",
              options: [
                "Le laisser faire en espérant qu'il arrange les choses.",
                "Interrompre les opérations en cours, lui ordonner un recadrage strict et exiger l'état des modifications déjà appliquées.",
                "Désinstaller l'IDE immédiatement.",
                "Couper la connexion Internet de l'immeuble."
              ],
              correctIndex: 1,
              explanation: "Un recadrage immédiat rétablit les limites d'intervention avant que des régressions majeures ne se propagent dans le workspace."
            }
          ]}
        />
      </section>
    </div>
  );
};

