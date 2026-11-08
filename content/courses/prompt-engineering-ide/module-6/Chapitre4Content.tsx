'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Autorisation de lecture et d&apos;écriture (Read vs Write)
        </h1>
      </div>

      {/* 1. Proposer vs Appliquer */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. La frontière vitale : Proposer vs Appliquer
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Avoir le droit de lire un fichier n&apos;implique <strong>jamais</strong> le droit de le modifier. Dans le dialogue avec un agent, il existe une différence absolue entre suggérer une correction et écrire physiquement sur le disque dur :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="document-text" className="w-5 h-5" />
              <span>Cas A : Proposition dans le chat</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              L&apos;agent génère le bloc de code corrigé dans sa réponse textuelle. Le fichier physique sur votre disque reste <strong>strictement inchangé</strong>. Risque d&apos;altération : zéro.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-amber-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
              <Icon name="pencil-square" className="w-5 h-5" />
              <span>Cas B : Modification physique (Write)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              L&apos;agent appelle l&apos;outil d&apos;édition (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">edit_file</code>), remplace le contenu sur le disque et crée un commit potentiel. Risque d&apos;effet de bord immédiat.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Procédure d'autorisation en 5 étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. La procédure d&apos;autorisation en 5 étapes
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs font-bold">
          <div className="bg-white p-2.5 rounded-lg border border-slate-300 w-full sm:w-auto">1. Réception de mission</div>
          <span>→</span>
          <div className="bg-white p-2.5 rounded-lg border border-slate-300 w-full sm:w-auto">2. Fichiers ciblés</div>
          <span>→</span>
          <div className="bg-white p-2.5 rounded-lg border border-slate-300 w-full sm:w-auto">3. Présentation du Diff</div>
          <span>→</span>
          <div className="bg-white p-2.5 rounded-lg border border-indigo-300 text-indigo-700 w-full sm:w-auto">4. Accord humain</div>
          <span>→</span>
          <div className="bg-white p-2.5 rounded-lg border border-slate-300 w-full sm:w-auto">5. Écriture bornée</div>
        </div>
      </section>

      {/* 3. Les 4 paramètres d'une autorisation valide */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 4 paramètres obligatoires d&apos;une autorisation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Paramètre</th>
                <th className="p-3 border border-slate-200">Mauvaise pratique (Vague &amp; Dangereux)</th>
                <th className="p-3 border border-slate-200">Bonne pratique (Précis &amp; Sécurisé)</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold">1. Fichier</td>
                <td className="p-3 border border-slate-200 text-rose-700">« Modifie le projet pour régler le bug »</td>
                <td className="p-3 border border-slate-200 text-emerald-700 font-bold font-mono">src/components/Projects.jsx uniquement</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">2. Action</td>
                <td className="p-3 border border-slate-200 text-rose-700">« Fais ce qu&apos;il faut »</td>
                <td className="p-3 border border-slate-200 text-emerald-700 font-bold">Remplacement de la fonction filterProjects()</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">3. Objectif</td>
                <td className="p-3 border border-slate-200 text-rose-700">« Amélioration générale »</td>
                <td className="p-3 border border-slate-200 text-emerald-700 font-bold">Prise en compte de l&apos;insensibilité à la casse</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">4. Durée</td>
                <td className="p-3 border border-slate-200 text-rose-700">Autorisation permanente indéterminée</td>
                <td className="p-3 border border-slate-200 text-emerald-700 font-bold">Valable uniquement pour cette opération immédiate</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Instructions de politique d'écriture */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Instructions principales : Politique d&apos;écriture
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-normal">
          <pre>{`[POLITIQUE_D_AUTORISATION_READ_WRITE]
1. LECTURE SANS ÉCRITURE :
   La consultation d'un fichier n'emporte JAMAIS le droit de le modifier.

2. INTERDICTION D'ÉCRITURE PAR DÉFAUT :
   Tu ne dois créer, modifier, renommer ou supprimer AUCUN fichier sans autorisation explicite.

3. PROCÉDURE OBLIGATOIRE DU DIFF :
   Avant toute écriture, présente à l'utilisateur :
   - Le chemin exact du fichier.
   - Les lignes précises à modifier (Diff avant/après).
   - L'explication des conséquences techniques.
   Attends son accord formel avant d'appliquer l'outil d'édition.

4. NON-PROPAGATION DES ACCORDS :
   L'accord accordé pour le fichier A ne constitue JAMAIS une autorisation de toucher au fichier B.`}</pre>
        </div>

        <Callout type="tip" title="Astuce d'ingénierie de prompt">
          En précisant dans vos instructions système : <em>&quot;Génère toujours un aperçu unifié diff (git format) avant de solliciter l&apos;approbation d&apos;écriture&quot;</em>, vous réduisez de plus de 90% les risques de modifications intempestives ou de suppressions accidentelles de code.
        </Callout>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Read vs Write
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 4"
          questions={[
            {
              id: 1,
              question: "Si vous autorisez un agent à modifier 'src/components/Login.jsx', a-t-il le droit de corriger également une fonction dans 'src/services/api.js' ?",
              options: [
                "Oui, car les deux fichiers sont liés dans la même mission.",
                "Non, l'autorisation concerne exclusivement le fichier expressément validé ; modifier un second fichier exige une nouvelle demande formelle.",
                "Oui, si la modification fait moins de 3 lignes.",
                "Non, sauf si le développeur est absent."
              ],
              correctIndex: 1,
              explanation: "Une autorisation est strictement délimitée au fichier visé. Toute modification collatérale constitue une violation du mandat."
            },
            {
              id: 2,
              question: "Quelle est la méthode la plus sûre avant d'autoriser une écriture de fichier par un agent IA ?",
              options: [
                "Lui faire confiance aveuglément.",
                "Exiger la présentation préalable du Diff (lignes ajoutées / supprimées) et valider manuellement l'absence d'effets de bord.",
                "Supprimer Git pour éviter les conflits.",
                "Fermer les yeux."
              ],
              correctIndex: 1,
              explanation: "L'inspection du Diff permet de vérifier que l'agent n'a touché qu'aux lignes nécessaires sans supprimer de code périphérique indispensable."
            }
          ]}
        />
      </section>
    </div>
  );
};
