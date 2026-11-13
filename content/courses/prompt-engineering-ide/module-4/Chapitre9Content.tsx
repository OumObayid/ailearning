'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 9 — Validation des résultats par un agent IA
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Distinguer une simple promesse textuelle d&apos;une preuve technique formelle : le triptyque Déclaré vs Exécuté vs Vérifié.
        </p>
      </div>

      {/* 1. Introduction & Analogie */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;analogie du contrôle technique : Terminer n&apos;est pas réussir</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Imaginez que vous déposiez votre voiture au garage pour faire réparer les freins. Une heure plus tard, le mécanicien vous sourit et vous dit : <em className="text-slate-800 font-semibold">« C&apos;est bon, j&apos;ai terminé ! »</em>.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Repartiriez-vous sur l&apos;autoroute à 130 km/h sur sa simple parole ? Évidemment non ! Vous voulez savoir s&apos;il a réellement appuyé sur la pédale, purgé le liquide et testé le freinage sur le banc de contrôle.
        </p>
        <Callout type="warning">
          <strong>Le piège de la confiance aveugle :</strong> Un agent IA peut écrire un composant sans générer de faute de frappe et vous annoncer avec un enthousiasme parfait : <em className="text-indigo-900">« Le bouton de suppression est prêt et fonctionnel ! »</em>. Mais sans validation formelle, ce bouton peut ne rien faire au clic, ou pire, effacer le compte de l&apos;utilisateur au lieu de supprimer un simple produit.
        </Callout>
      </section>

      {/* 2. Les 4 niveaux de validation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 niveaux de validation indispensables
        </h2>
        <p className="text-sm sm:text-base text-slate-700">
          Pour qu&apos;une tâche soit certifiée complète, elle doit franchir successivement ces 4 filtres de contrôle :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-slate-950 text-base">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              <span>Niveau 1 : Validation Structurelle</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Le fichier a-t-il été créé au bon endroit ? L&apos;agent vérifie que le composant <code className="bg-slate-100 px-1 rounded font-mono text-xs">src/components/DeleteModal.tsx</code> existe physiquement sur le disque et qu&apos;il est correctement exporté.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-slate-950 text-base">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
              <span>Niveau 2 : Validation Technique (Build &amp; Lint)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Le code compile-t-il sans erreur ? L&apos;agent exécute <code className="bg-slate-100 px-1 rounded font-mono text-xs">npm run build</code> et s&apos;assure que TypeScript ne signale aucune incohérence de typage (Exit Code 0).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-slate-950 text-base">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
              <span>Niveau 3 : Validation Fonctionnelle (Comportement)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Le bouton fait-il vraiment ce qu&apos;on lui demande ? L&apos;agent exécute les tests unitaires (<code className="bg-slate-100 px-1 rounded font-mono text-xs">npm test</code>) pour prouver que le clic supprime l&apos;élément et affiche une notification de succès.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-slate-950 text-base">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">4</span>
              <span>Niveau 4 : Validation de Conformité</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Les règles de l&apos;équipe ont-elles été respectées ? Aucun fichier hors périmètre n&apos;a été modifié, les conventions de style sont respectées et aucun secret <code className="bg-slate-100 px-1 rounded font-mono text-xs">.env</code> n&apos;a été touché.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Déclaré vs Exécuté vs Vérifié */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Déclaré vs Exécuté vs Vérifié : Le triptyque de la vérité
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Voici la distinction la plus essentielle pour quiconque utilise un agent de développement :
        </p>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border border-slate-200 w-1/4">Statut</th>
                <th className="p-3.5 border border-slate-200">Ce que l&apos;agent affirme</th>
                <th className="p-3.5 border border-slate-200 text-indigo-900">Niveau de preuve exigé</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-amber-700">1. DÉCLARÉ</td>
                <td className="p-3.5 border border-slate-200">« J&apos;ai corrigé le bug du panier et tout marche parfaitement. »</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">Zéro preuve (simple texte généré dans le chat).</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">2. EXÉCUTÉ</td>
                <td className="p-3.5 border border-slate-200">L&apos;outil d&apos;édition a modifié <code className="bg-slate-100 px-1 rounded font-mono text-xs">Cart.tsx</code>.</td>
                <td className="p-3.5 border border-slate-200 text-indigo-900 font-bold">Le fichier a été modifié, mais on ignore encore s&apos;il compile ou s&apos;il plante.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-800">3. VÉRIFIÉ</td>
                <td className="p-3.5 border border-slate-200">Le build a réussi (Exit Code 0) et les tests Vitest sont verts.</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Preuve formelle irréfutable attestée par les logs système.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-3.5 bg-white border border-amber-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-amber-700 uppercase">1. Statut Déclaré</span>
            <p className="text-xs text-slate-700">Simple promesse textuelle dans le chat sans aucune preuve technique.</p>
          </div>
          <div className="p-3.5 bg-white border border-indigo-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">2. Statut Exécuté</span>
            <p className="text-xs text-slate-700">L&apos;outil a bien modifié le code, mais on ne sait pas encore si ça compile.</p>
          </div>
          <div className="p-3.5 bg-white border border-emerald-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase">3. Statut Vérifié</span>
            <p className="text-xs text-slate-700">Preuve formelle : commande de build ou suite de tests réussie avec Exit Code 0.</p>
          </div>
        </div>
      </section>

      {/* 4. Prompt de validation rigoureux (Sans scrollbar) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Prompt professionnel : Exiger un audit de validation complet
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dès qu&apos;un agent vous annonce avoir terminé une intervention, copiez ce prompt de vérification :
        </p>

        {/* Bloc structuré sans scrollbar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 shadow-xl space-y-3 break-words min-w-0 max-w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-indigo-400">[MISSION D&apos;AUDIT &amp; VALIDATION DU LIVRABLE]</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">À copier dans Antigravity</span>
          </div>

          <div className="space-y-2 text-slate-300 leading-relaxed">
            <div>1. AUDIT DU DIFF : Dresse la liste exacte des fichiers modifiés et prouve qu&apos;aucun fichier hors sujet n&apos;a été touché.</div>
            <div>2. CONTRÔLE TECHNIQUE : Propose la commande de build ou de test pour certifier la conformité syntaxique.</div>
            <div>3. CONFRONTATION AUX CRITÈRES : Compare le résultat aux consignes initiales en séparant ce qui est testé par commande de ce qui doit être vérifié à l&apos;œil.</div>
            <div>4. RÈGLE D&apos;OR : Ne déclare JAMAIS un résultat &quot;Vérifié&quot; sans preuve observable dans les retours du terminal.</div>
          </div>
        </div>
      </section>

      {/* 5. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.9) : Le protocole de certification
        </h2>
        <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">TP 4.9 — Exiger la preuve par les faits</span>
          <h4 className="font-extrabold text-slate-950 text-base">Validation d&apos;un composant de carte produit</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Demandez à l&apos;agent d&apos;ajouter un bouton « Voir les détails » sur une carte produit. Avant de considérer la mission comme close :
          </p>
          <div className="grid gap-2.5 pt-1 text-xs grid-cols-1 sm:grid-cols-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong>Étape A :</strong> Inspectez le Diff pour vérifier que seules 5 à 10 lignes ont été modifiées.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong>Étape B :</strong> Autorisez l&apos;exécution de <code className="font-mono text-indigo-700">npm run build</code> et vérifiez l&apos;Exit Code 0.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong>Étape C :</strong> Ouvrez la page dans votre navigateur et cliquez sur le bouton pour constater le rendu visuel.
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quiz d'évaluation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vos acquis sur la Validation
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 9 (Validation des résultats)"
          questions={[
            {
              id: 1,
              question: "Quelle différence fondamentale sépare un résultat 'déclaré' d'un résultat 'vérifié' ?",
              options: [
                "Le résultat déclaré est plus long à afficher.",
                "Le résultat déclaré est une simple affirmation textuelle de l'agent dans le chat, alors que le résultat vérifié repose sur des preuves observables (tests réussis, build sans erreur, diff contrôlé).",
                "Le résultat vérifié est toujours négatif.",
                "Il n'y a aucune différence technique entre les deux."
              ],
              correctIndex: 1,
              explanation: "Un agent peut déclarer de bonne foi que tout fonctionne ; seule une vérification par commande (tests, build, assertions) fournit la preuve tangible de la réussite."
            },
            {
              id: 2,
              question: "Pourquoi une compilation réussie (Exit Code 0) ne suffit-elle pas à garantir qu'un bouton fonctionne ?",
              options: [
                "Parce que le compilateur vérifie seulement que le code est bien écrit, mais pas que le clic déclenche le bon comportement utilisateur attendu.",
                "Parce que les compilateurs refusent les boutons.",
                "Parce que TypeScript efface le code après la compilation.",
                "Parce que le navigateur internet ignore les compilations."
              ],
              correctIndex: 0,
              explanation: "La validation technique (build) garantit l'absence d'erreurs de syntaxe, mais seule la validation fonctionnelle (tests ou test manuel) prouve que la logique métier fonctionne."
            },
            {
              id: 3,
              question: "Quel réflexe devez-vous adopter quand un agent vous dit : « J'ai fini ! » sans avoir exécuté le moindre test ?",
              options: [
                "Le croire sur parole et fermer son ordinateur.",
                "Lui demander de prouver son affirmation en exécutant un build ou un test unitaire sous votre contrôle.",
                "Supprimer tout le projet.",
                "Recommencer le cours depuis le début."
              ],
              correctIndex: 1,
              explanation: "Ne vous contentez jamais d'un résultat simplement déclaré : exigez toujours la preuve par l'exécution d'un test ou d'un build."
            }
          ]}
        />
      </section>
    </div>
  );
};
