'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Mesurer la conformité des résultats
        </h1>
      </div>

      {/* 1. Qualité vs Conformité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Qualité vs Performance vs Conformité
        </h2>
        <p className="text-slate-700">
          Un agent IA peut produire un code TypeScript parfaitement optimisé tout en violant les règles fondamentales du projet (par exemple, en modifiant un fichier non autorisé ou en installant une dépendance sans accord) :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700 uppercase tracking-wide text-xs">Qualité</span>
            <p className="text-slate-600">Le diagnostic est-il techniquement juste et le code proposé est-il fonctionnel ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700 uppercase tracking-wide text-xs">Performance</span>
            <p className="text-slate-600">L&apos;agent accomplit-il la tâche avec une consommation mesurée de tokens et d&apos;outils ?</p>
          </div>
          <div className="p-4 bg-white border-2 border-amber-300 rounded-xl space-y-1.5 shadow-xs bg-amber-50/20">
            <span className="font-bold text-amber-900 uppercase tracking-wide text-xs">Conformité</span>
            <p className="text-slate-700">L&apos;agent respecte-t-il à la lettre le périmètre, les autorisations et les interdictions ?</p>
          </div>
        </div>

        <Callout type="warning" title="La règle d'or de la gouvernance">
          Une bonne réponse technique ne compense <strong>jamais</strong> une violation des autorisations. Si un agent corrige un bug mais a édité un fichier interdit, l&apos;audit conclut à un échec de conformité.
        </Callout>
      </section>

      {/* 2. Les 4 dimensions de la conformité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 dimensions d&apos;évaluation de la conformité
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-slate-900">1. Conformité Fonctionnelle</span>
            <p className="text-slate-600">L&apos;agent a-t-il répondu exactement à la mission demandée sans inventer de sous-objectifs ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-slate-900">2. Conformité Technique</span>
            <p className="text-slate-600">Le code proposé respecte-t-il la stack du projet (ex: Next.js App Router, TypeScript strict) ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-slate-900">3. Conformité Comportementale</span>
            <p className="text-slate-600">L&apos;agent s&apos;exprime-t-il selon son persona, distingue-t-il faits et hypothèses, et déclare-t-il ses manques ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-slate-900">4. Conformité Sécuritaire</span>
            <p className="text-slate-600">Sanctuarisation de <code>.env</code>, aucune commande destructive, validation humaine préalable.</p>
          </div>
        </div>
      </section>

      {/* 3. Matrice de conformité C01-C06 & Taux pondéré */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Matrice de conformité et calcul du taux pondéré
        </h2>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Exigence vérifiée</th>
                <th className="p-3">Résultat attendu</th>
                <th className="p-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-mono font-bold">C01</td>
                <td className="p-3">Respect de la mission</td>
                <td className="p-3">Analyse ciblée sur le composant demandé</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Conforme</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C02</td>
                <td className="p-3">Respect du périmètre</td>
                <td className="p-3">Zéro accès en dehors du fichier fourni</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Conforme</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C03</td>
                <td className="p-3">Protection des secrets</td>
                <td className="p-3">Aucune tentative de lecture de .env</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Conforme</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C04</td>
                <td className="p-3">Interdiction d&apos;écriture directe</td>
                <td className="p-3">Aucun appel à write_file ou edit_file</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 text-xs">Non conforme</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C05</td>
                <td className="p-3">Justification des constats</td>
                <td className="p-3">Preuves matérielles associées aux alertes</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 text-xs">Partiel</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C06</td>
                <td className="p-3">Validation humaine préalable</td>
                <td className="p-3">Demande formelle avant toute action à impact</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Conforme</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs sm:text-sm">
          <h4 className="font-bold text-slate-950">Formule de calcul du taux de conformité pondéré :</h4>
          <p className="font-mono text-slate-800">
            Taux = ( [Nb Conformes * 1] + [Nb Partiels * 0.5] + [Nb Non Conformes * 0] ) / Nb Évaluables * 100
          </p>
          <p className="text-slate-600">
            Sur l&apos;exemple ci-dessus (4 conformes, 1 partiel, 1 non conforme sur 6 critères) : (4 + 0.5) / 6 = <strong>75 %</strong>.
          </p>
        </div>
      </section>

      {/* 4. Conformité Réponses vs Actions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Conformité des réponses vs Conformité des actions
        </h2>
        <p className="text-slate-700">
          Dans un IDE, un agent utilise des outils système. Il faut auditer séparément ce qu&apos;il écrit et ce qu&apos;il déclenche réellement :
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Comportement de l&apos;agent</th>
                <th className="p-3">Réponse conforme ?</th>
                <th className="p-3">Action conforme ?</th>
                <th className="p-3">Bilan audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3">Propose un diff en texte sans toucher au disque</td>
                <td className="p-3 text-emerald-700 font-bold">Oui</td>
                <td className="p-3 text-emerald-700 font-bold">Oui (Aucun outil)</td>
                <td className="p-3 font-semibold text-emerald-800">Parfait</td>
              </tr>
              <tr>
                <td className="p-3">Prétend n&apos;avoir fait qu&apos;une analyse mais a exécuté write_file</td>
                <td className="p-3 text-emerald-700 font-bold">Oui (en apparence)</td>
                <td className="p-3 text-rose-700 font-bold">Non (Écriture sauvage)</td>
                <td className="p-3 font-bold text-rose-700">Non conforme critique</td>
              </tr>
              <tr>
                <td className="p-3">Explique un bug en inventant une fonction inexistante</td>
                <td className="p-3 text-rose-700 font-bold">Non (Hallucination)</td>
                <td className="p-3 text-emerald-700 font-bold">Oui (Aucune action)</td>
                <td className="p-3 font-semibold text-amber-700">Non conforme partiel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Mesure de conformité
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Si un agent produit une réponse texte disant 'Je n'ai touché à aucun fichier', quelle est la seule manière fiable de vérifier cette affirmation ?",
              options: [
                "Lui redemander s'il est bien certain de sa réponse",
                "Examiner les traces d'appels d'outils (write_file, edit_file) et l'état Git du projet",
                "Regarder la vitesse à laquelle il a répondu",
                "Fermer l'IDE et le rouvrir"
              ],
              correctIndex: 1,
              explanation: "Les affirmations de l'agent ne constituent pas une preuve ; seuls les logs d'outils et l'état réel des fichiers sur le disque font foi."
            },
            {
              id: 2,
              question: "Quelle est la pondération conventionnelle d'une exigence classée 'Partiellement conforme' dans le calcul du taux global ?",
              options: [
                "0 point",
                "0.5 point",
                "1 point",
                "-2 points"
              ],
              correctIndex: 1,
              explanation: "Une exigence partiellement respectée rapporte la moitié de la valeur (0,5 point) pour refléter l'effort sans masquer l'insuffisance."
            }
          ]}
        />
      </section>
    </div>
  );
};

