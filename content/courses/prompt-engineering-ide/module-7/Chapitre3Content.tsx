'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Réduire les ambiguïtés dans les prompts
        </h1>
      </div>

      {/* 1. Les 5 types d'ambiguïtés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 5 types majeurs d&apos;ambiguïtés
        </h2>
        <p className="text-slate-700">
          Une consigne peut être parfaitement correcte sur le plan grammatical tout en étant désastreuse pour un agent d&apos;IDE, car elle ouvre plusieurs branches d&apos;interprétation :
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-amber-800">1. Ambiguïté sur la mission</span>
            <p className="text-slate-600">
              <span className="text-rose-700 font-mono font-bold">Vague :</span> &quot;Optimise mon système de connexion.&quot; (S&apos;agit-il de la rapidité, de la sécurité des mots de passe, ou de l&apos;UI ?)<br />
              <span className="text-emerald-700 font-mono font-bold">Précis :</span> &quot;Analyse la validation des identifiants dans auth.ts et propose des corrections sans toucher aux fichiers.&quot;
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-amber-800">2. Ambiguïté sur le périmètre</span>
            <p className="text-slate-600">
              <span className="text-rose-700 font-mono font-bold">Vague :</span> &quot;Consulte les fichiers nécessaires pour comprendre la recherche.&quot;<br />
              <span className="text-emerald-700 font-mono font-bold">Précis :</span> &quot;Utilise exclusivement les extraits de Projects.jsx et projects.js. Ne recherche aucun autre fichier.&quot;
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-amber-800">3. Ambiguïté sur les autorisations</span>
            <p className="text-slate-600">
              <span className="text-rose-700 font-mono font-bold">Vague :</span> &quot;Tu peux corriger les problèmes importants.&quot; (Écriture permise ? Package installable ?)<br />
              <span className="text-emerald-700 font-mono font-bold">Précis :</span> &quot;Propose les corrections sous forme de texte. Aucune écriture de fichier sans accord explicite préalable.&quot;
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-amber-800">4. Ambiguïté sur le résultat attendu</span>
            <p className="text-slate-600">
              <span className="text-rose-700 font-mono font-bold">Vague :</span> &quot;Donne-moi une analyse complète.&quot; (Quels critères définissent la complétude ?)<br />
              <span className="text-emerald-700 font-mono font-bold">Précis :</span> &quot;Présente le rapport avec 5 sections obligatoires : Problèmes, Causes, Preuves, Recommandations, Inconnues.&quot;
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-amber-800">5. Ambiguïté temporelle ou d&apos;ordre</span>
            <p className="text-slate-600">
              <span className="text-rose-700 font-mono font-bold">Vague :</span> &quot;Teste le code avant de terminer.&quot;<br />
              <span className="text-emerald-700 font-mono font-bold">Précis :</span> &quot;Propose une liste de cas de tests à la fin du rapport ; ne les exécute pas dans le terminal sans accord.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* 2. Tableau des mots piégés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les mots piégés à bannir ou à encadrer
        </h2>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Mot ou expression</th>
                <th className="p-3">Risque technique</th>
                <th className="p-3">Formulation alternative rigoureuse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-mono font-bold text-rose-700">Améliore / Corrige</td>
                <td className="p-3">Peut déclencher une réécriture totale du code</td>
                <td className="p-3 font-mono text-xs">Identifie et propose des optimisations en diff</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-700">Tout / Tous</td>
                <td className="p-3">Périmètre infini, exploration massive</td>
                <td className="p-3 font-mono text-xs">Liste limitative des éléments cibles</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-700">Nécessaire / Utile</td>
                <td className="p-3">Laisse l&apos;agent seul juge des ressources</td>
                <td className="p-3 font-mono text-xs">Fichiers explicitement nommés ou fournis</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-700">Automatiquement</td>
                <td className="p-3">Bypass du contrôle humain (HITL)</td>
                <td className="p-3 font-mono text-xs">Définir les actions nécessitant approbation</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-700">Sécurisé</td>
                <td className="p-3">Notion trop vaste et non mesurable</td>
                <td className="p-3 font-mono text-xs">Préciser les menaces ciblées (XSS, injections SQL)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. La méthode des 4 dimensions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La méthode de clarification en 4 dimensions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-indigo-700">1. L&apos;ACTION</span>
            <p className="text-slate-600">Que doit faire exactement l&apos;agent ? (Analyser, synthétiser, comparer...)</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-indigo-700">2. LA CIBLE</span>
            <p className="text-slate-600">Sur quel composant, route API ou fichier précis porte l&apos;intervention ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-indigo-700">3. LES LIMITES</span>
            <p className="text-slate-600">Quelles opérations sont formellement exclues ? (Pas d&apos;écriture, pas de terminal...)</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-indigo-700">4. LE LIVRABLE</span>
            <p className="text-slate-600">Sous quelle forme restituer le résultat ? (Tableau markdown, diff, liste à puces...)</p>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-2">
          <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
            # DIRECTIVE SYSTÈME DE DÉTECTION ET TRAITEMENT DES AMBIGUÏTÉS
          </div>
          <p className="text-slate-300">
            &lt;ambiguity_resolution_policy&gt;
          </p>
          <p className="pl-4 text-slate-200">
            - Avant de démarrer toute tâche : vérifie si la demande comporte des termes flous ou des choix d&apos;implémentation contradictoires.
          </p>
          <p className="pl-4 text-rose-300">
            - Si deux interprétations modifient les fichiers cibles ou le niveau d&apos;autorisation : NE CHOISIS PAS SEUL. Arrête l&apos;action et pose une question courte à l&apos;utilisateur.
          </p>
          <p className="pl-4 text-emerald-300">
            - Une absence de précision ne constitue JAMAIS une autorisation implicite d&apos;élargir le périmètre.
          </p>
          <p className="text-slate-300">
            &lt;/ambiguity_resolution_policy&gt;
          </p>
        </div>

        <Callout type="tip" title="Attention à la sur-restriction">
          Préciser ne veut pas dire interdire tout raisonnement. Ne dites pas : <em>&quot;Ne fais aucune déduction&quot;</em>, mais plutôt : <em>&quot;Tu peux émettre des hypothèses à condition de les étiqueter explicitement comme telles et d&apos;indiquer qu&apos;elles restent à valider.&quot;</em>
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Réduction des ambiguïtés
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle formulation est la plus précise et exempte d'ambiguïté pour un agent d'IDE ?",
              options: [
                "Améliore mon projet React.",
                "Analyse uniquement Projects.jsx et propose des améliorations en texte sans modifier le fichier.",
                "Fais tout ce qui est nécessaire pour optimiser la sécurité.",
                "Vérifie que mon code est propre."
              ],
              correctIndex: 1,
              explanation: "La deuxième formulation délimite l'action (analyser), la cible unique (Projects.jsx), la limite (sans modifier) et le livrable (propositions en texte)."
            },
            {
              id: 2,
              question: "Que doit faire un agent lorsque deux interprétations divergentes d'une demande changent la liste des fichiers à modifier ?",
              options: [
                "Choisir celle qui lui paraît la plus probable",
                "Modifier les fichiers des deux options pour être complet",
                "Poser une question de clarification à l'utilisateur avant d'agir",
                "Supprimer les fichiers en conflit"
              ],
              correctIndex: 2,
              explanation: "Dès lors qu'une ambiguïté a un impact direct sur le périmètre ou les autorisations, l'agent doit solliciter un arbitrage humain."
            }
          ]}
        />
      </section>
    </div>
  );
};

