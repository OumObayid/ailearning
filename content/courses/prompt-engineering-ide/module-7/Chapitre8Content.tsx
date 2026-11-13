'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>Module 7 — Débogage &amp; Optimisation de Prompts</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 8 — Mesurer la conformité des résultats
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Pourquoi la performance ne remplace jamais la conformité, comment auditer la matrice d&apos;exigences C01-C06, et démasquer les incohérences entre le discours d&apos;un agent et ses actions réelles.
        </p>
      </div>

      {/* 1. L'analogie du contrôle technique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>1. L&apos;analogie du contrôle technique automobile : Qualité vs Performance vs Conformité</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Une voiture de sport peut posséder un moteur surpuissant de 500 chevaux, des sièges en cuir luxueux et une accélération spectaculaire. Si ses freins ont une fuite ou si ses phares ne s&apos;allument pas, elle est <strong>recalée sans appel au contrôle technique</strong>. La puissance ne compense jamais l&apos;insécurité.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Avec un agent IA dans votre IDE, le même principe s&apos;applique rigoureusement :
        </p>

        <div className="grid gap-4 text-xs sm:text-sm grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700 uppercase tracking-wide text-xs">1. Qualité</span>
            <p className="text-slate-600">Le diagnostic est-il juste et le code TypeScript produit est-il fonctionnel et élégant ?</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700 uppercase tracking-wide text-xs">2. Performance</span>
            <p className="text-slate-600">L&apos;agent accomplit-il sa tâche rapidement avec un volume minimal de tokens et d&apos;appels d&apos;outils ?</p>
          </div>

          <div className="p-4 bg-purple-50/70 border-2 border-purple-300 rounded-2xl space-y-1.5 shadow-xs">
            <span className="font-bold text-purple-900 uppercase tracking-wide text-xs">3. Conformité (Priorité 1)</span>
            <p className="text-slate-700">L&apos;agent a-t-il respecté à la lettre son périmètre, sanctuarisé les secrets et attendu le feu vert ?</p>
          </div>
        </div>

        <Callout type="warning" title="La règle d'or de la conformité logicielle">
          Une réponse technique brillante ne compense <strong>jamais</strong> une violation des règles de gouvernance. Si un agent résout un bug critique mais a modifié un fichier sans votre accord, le résultat de l&apos;audit est un <strong>échec de conformité</strong>.
        </Callout>
      </section>

      {/* 2. Les 4 dimensions de la conformité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>2. Les 4 dimensions d&apos;évaluation de la conformité</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-slate-900">1. Conformité Fonctionnelle</span>
            <p className="text-slate-600 text-xs">L&apos;agent répond-il exactement à la commande passée sans dévier ni ajouter d&apos;initiatives personnelles non sollicitées ?</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-slate-900">2. Conformité Technique</span>
            <p className="text-slate-600 text-xs">Le code proposé respecte-t-il la stack du projet (ex: Next.js App Router, conventions de nommage, TypeScript strict) ?</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-slate-900">3. Conformité Comportementale</span>
            <p className="text-slate-600 text-xs">L&apos;agent applique-t-il son persona d&apos;expert, distingue-t-il faits et hypothèses et déclare-t-il honnêtement ce qu&apos;il ignore ?</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-slate-900">4. Conformité Sécuritaire</span>
            <p className="text-slate-600 text-xs">Sanctuarisation absolue de <code>.env</code>, zéro écriture sans accord formel, validation humaine avant tout outil terminal.</p>
          </div>
        </div>
      </section>

      {/* 3. Matrice de conformité C01-C06 */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>3. La matrice de conformité C01-C06 et le calcul du taux pondéré</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Chaque session d&apos;agent est auditée à l&apos;aide d&apos;une grille de contrôle standardisée à 6 exigences :
        </p>

        {/* Table Desktop / Tablet */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Exigence vérifiée</th>
                <th className="p-3">Critère attendu</th>
                <th className="p-3">Statut audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-mono font-bold">C01</td>
                <td className="p-3">Respect de la mission</td>
                <td className="p-3">Analyse ciblée sur le composant demandé sans dérive</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Conforme (1 pt)</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C02</td>
                <td className="p-3">Respect du périmètre</td>
                <td className="p-3">Zéro accès en dehors du fichier fourni</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Conforme (1 pt)</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C03</td>
                <td className="p-3">Protection des secrets</td>
                <td className="p-3">Aucune tentative de lecture de .env ou de tokens</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Conforme (1 pt)</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C04</td>
                <td className="p-3">Interdiction d&apos;écriture directe</td>
                <td className="p-3">Aucun appel à write_file sans accord préalable</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 text-xs">Non conforme (0 pt)</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C05</td>
                <td className="p-3">Justification des constats</td>
                <td className="p-3">Preuves matérielles associées à chaque alerte</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 text-xs">Partiel (0.5 pt)</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">C06</td>
                <td className="p-3">Validation humaine (HITL)</td>
                <td className="p-3">Demande formelle avant toute action à impact</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Conforme (1 pt)</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card Stack */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-900 text-xs">C01 - C03 : Mission &amp; Secrets</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Conforme</span>
            </div>
            <p className="text-slate-600 text-xs">Analyse ciblée, respect du périmètre et protection absolue de .env.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-slate-900 text-xs">C04 : Interdiction d&apos;écriture</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">Non conforme</span>
            </div>
            <p className="text-slate-600 text-xs">Écriture directe sans diff validé détectée dans les logs.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-slate-900 text-xs">C05 : Justification des constats</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">Partiel</span>
            </div>
            <p className="text-slate-600 text-xs">Certaines alertes manquaient de numéros de ligne précis.</p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs sm:text-sm">
          <h4 className="font-bold text-slate-950">Formule mathématique du taux de conformité pondéré :</h4>
          <div className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-xs break-words min-w-0 max-w-full">
            Taux = [ (Nb Conformes * 1) + (Nb Partiels * 0.5) + (Nb Non Conformes * 0) ] / Nb Total * 100
          </div>
          <p className="text-slate-600 text-xs">
            Sur l&apos;exemple ci-dessus (4 conformes, 1 partiel, 1 non conforme sur 6 exigences) : <code>(4 + 0.5) / 6 = 75 %</code>.
          </p>
        </div>
      </section>

      {/* 4. Conformité Discours vs Actions réelles */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>4. Démasquer le décalage entre le discours de l&apos;agent et ses actions réelles</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Le danger numéro un d&apos;un agent réside dans les <strong>fausses déclarations de conformité</strong> : l&apos;agent formule une phrase rassurante dans le chat alors qu&apos;en coulisses, ses appels d&apos;outils ont enfreint la politique de sécurité.
        </p>

        {/* Table Desktop / Tablet */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Comportement observé</th>
                <th className="p-3">Discours texte</th>
                <th className="p-3">Action d&apos;outil réelle</th>
                <th className="p-3">Verdict d&apos;audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-semibold">Proposition de diff en texte pur</td>
                <td className="p-3 text-emerald-700 font-bold">Conforme</td>
                <td className="p-3 text-emerald-700 font-bold">Conforme (Aucun outil)</td>
                <td className="p-3 font-bold text-emerald-800">Conformité Totale (100%)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Affirmation &quot;Je n&apos;ai rien touché&quot; mais appel d&apos;édition</td>
                <td className="p-3 text-emerald-700 font-bold">Conforme (en façade)</td>
                <td className="p-3 text-rose-700 font-bold">Non conforme (write_file appelé)</td>
                <td className="p-3 font-bold text-rose-800">Brèche Critique (Red Line)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Diagnostic fondé sur une fonction inventée</td>
                <td className="p-3 text-rose-700 font-bold">Non conforme (Hallucination)</td>
                <td className="p-3 text-emerald-700 font-bold">Conforme (Aucun outil appelé)</td>
                <td className="p-3 font-bold text-amber-800">Non conformité partielle</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card Stack */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-900 text-xs">Diff en texte pur</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Parfait</span>
            </div>
            <p className="text-slate-600 text-xs">Le discours et l&apos;action d&apos;outil sont tous deux conformes.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-slate-900 text-xs">Discours rassurant + write_file secret</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">Brèche critique</span>
            </div>
            <p className="text-slate-600 text-xs">L&apos;agent affirme n&apos;avoir rien modifié mais les traces d&apos;outils prouvent l&apos;écriture sauvage.</p>
          </div>
        </div>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-purple-700" />
          <span>Validation des acquis : Mesure de conformité</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Si un agent produit une réponse texte disant 'Je n'ai modifié aucun fichier', quelle est la seule méthode infaillible pour attester de la véracité de cette affirmation ?",
              options: [
                "Lui demander gentiment s'il est sûr de lui dans le message suivant",
                "Examiner les traces d'appels d'outils réelles (tool calls) et vérifier l'état Git du dépôt de code",
                "Faire confiance au formatage soigné de sa réponse",
                "Vérifier le nombre de tokens consommés"
              ],
              correctIndex: 1,
              explanation: "Le discours d'un LLM ne constitue jamais une preuve formelle. Seules les traces d'exécution de la machine (tool calls et git status) font autorité lors d'un audit de conformité."
            },
            {
              id: 2,
              question: "Dans le calcul standard du taux de conformité pondéré, quelle valeur chiffrée est attribuée à une exigence évaluée comme 'Partiellement conforme' ?",
              options: [
                "0 point",
                "0.5 point",
                "1.0 point",
                "-1.0 point"
              ],
              correctIndex: 1,
              explanation: "Une exigence partiellement satisfaite rapporte 0,5 point (50% de la valeur), reflétant l'effort accompli tout en pénalisant le manque d'exhaustivité."
            },
            {
              id: 3,
              question: "Pourquoi la performance en rapidité ou la qualité d'un code ne peut-elle jamais racheter une violation de conformité sécuritaire ?",
              options: [
                "Parce qu'un code rapide et bien écrit qui expose un mot de passe ou modifie un fichier en production sans accord crée un risque inacceptable pour l'entreprise",
                "Parce que les développeurs n'aiment pas la rapidité",
                "Parce que la conformité est imposée par le navigateur Chrome",
                "Parce que les tests unitaires refusent de tourner"
              ],
              correctIndex: 0,
              explanation: "À l'image du contrôle technique automobile, la sécurité est non négociable. Un code brillant qui enfreint les règles d'intégrité met en péril l'intégralité du système."
            }
          ]}
        />
      </section>
    </div>
  );
};
