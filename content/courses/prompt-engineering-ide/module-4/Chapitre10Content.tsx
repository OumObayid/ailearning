'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 10 — Interaction entre l&apos;utilisateur et l&apos;agent IA
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Passer du simple monologue à un véritable binôme de développement (Pair Programming) : niveaux d&apos;autonomie, points de contrôle et recadrage d&apos;urgence.
        </p>
      </div>

      {/* 1. L'agent comme binôme (Pair Programmer) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="user" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;agent comme binôme de développement (Pair Programming)</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Travailler avec un agent IA ne consiste pas à jeter une consigne floue dans une boîte noire en espérant qu&apos;un miracle se produise. C&apos;est une collaboration en temps réel, exactement comme la pratique du <strong>Pair Programming</strong> en entreprise :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <h4 className="font-extrabold text-slate-950 text-base">Vous = Le Pilote (Driver / Architecte)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Vous gardez la vision d&apos;ensemble, définissez les besoins métier, fixez les contraintes et validez chaque étape clé avant son application.
            </p>
          </div>
          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-2 shadow-sm">
            <h4 className="font-extrabold text-indigo-950 text-base">L&apos;Agent = Le Copilote outillé (Navigator)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Il parcourt rapidement des centaines de lignes de code, propose des plans ordonnés, rédige les fonctions répétitives et exécute les vérifications dans le terminal sous votre supervision.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 4 niveaux d'autonomie */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 niveaux d&apos;autonomie opérationnelle
        </h2>
        <p className="text-sm sm:text-base text-slate-700">
          Selon votre degré de confiance et la criticité de votre projet, vous pouvez ajuster la liberté d&apos;action accordée à l&apos;agent :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Niveau 1</span>
            <h4 className="font-extrabold text-slate-950 text-base">Mode Observation (Lecture seule)</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              L&apos;agent inspecte les fichiers et produit des analyses techniques sans jamais rien modifier. <strong>Risque zéro pour votre projet</strong> : idéal pour démarrer en toute sérénité.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Niveau 2</span>
            <h4 className="font-extrabold text-slate-950 text-base">Mode Préparation (Proposition de plan)</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              L&apos;agent conçoit le code et prépare les commandes terminal, mais ne touche à rien : il attend votre feu vert explicite dans le chat pour chaque action.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Niveau 3</span>
            <h4 className="font-extrabold text-slate-950 text-base">Mode Assisté (Supervisé)</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              L&apos;agent applique les modifications courantes autorisées, mais marque une pause dès qu&apos;une décision structurante se présente (installer un nouveau paquet, modifier la base).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Niveau 4</span>
            <h4 className="font-extrabold text-slate-950 text-base">Mode Autonome Encadré</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              L&apos;agent enchaîne analyse, modifications et tests au sein d&apos;un périmètre de fichiers strictement défini, puis vous présente le compte rendu final avec les preuves.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Les points de contrôle (Checkpoints) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 4 points de contrôle obligatoires (Checkpoints)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Sur une mission complète, l&apos;interaction se découpe en 4 temps d&apos;arbitrage incontournables :
        </p>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border border-slate-200 w-1/4">Point de contrôle</th>
                <th className="p-3.5 border border-slate-200">Ce que l&apos;agent prépare</th>
                <th className="p-3.5 border border-slate-200 text-indigo-900">Votre rôle en tant que développeur</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">1. Le Diagnostic</td>
                <td className="p-3.5 border border-slate-200">Recherche des fichiers concernés et explication de la cause du problème.</td>
                <td className="p-3.5 border border-slate-200">Valider que l&apos;agent a bien compris votre besoin réel.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">2. Le Plan technique</td>
                <td className="p-3.5 border border-slate-200">Découpage en étapes chronologiques et liste des fichiers à toucher.</td>
                <td className="p-3.5 border border-slate-200">Accepter le plan ou demander de retirer les fichiers hors sujet.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">3. L&apos;Édition du code</td>
                <td className="p-3.5 border border-slate-200">Application chirurgicale des modifications ciblées.</td>
                <td className="p-3.5 border border-slate-200">Inspecter le Diff pour vérifier la propreté du code.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-800">4. La Validation finale</td>
                <td className="p-3.5 border border-slate-200">Exécution de <code className="font-mono text-xs">npm run build</code> et rapport de tests.</td>
                <td className="p-3.5 border border-slate-200">Homologuer la tâche et committer dans Git.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">1. Diagnostic</span>
            <p className="text-xs text-slate-700">L&apos;agent explique le problème &rarr; Vous validez sa compréhension.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">2. Plan technique</span>
            <p className="text-xs text-slate-700">L&apos;agent propose sa feuille de route &rarr; Vous donnez le feu vert.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">3. Édition</span>
            <p className="text-xs text-slate-700">L&apos;agent applique la retouche &rarr; Vous inspectez le Diff.</p>
          </div>
          <div className="p-3.5 bg-white border border-emerald-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase">4. Validation</span>
            <p className="text-xs text-slate-700">L&apos;agent lance les tests &rarr; Vous certifiez la tâche terminée.</p>
          </div>
        </div>
      </section>

      {/* 4. Recadrage d'urgence (Sans scrollbar) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le réflexe de sécurité : Savoir recadrer immédiatement un agent qui dérive
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Si l&apos;agent commence à modifier des fichiers non sollicités, à installer des bibliothèques imprévues ou à réécrire tout votre style CSS, <strong>stoppez-le sur-le-champ</strong> avec ce prompt de recadrage d&apos;urgence :
        </p>

        {/* Bloc structuré sans scrollbar */}
        <div className="rounded-2xl border border-rose-800 bg-slate-950 p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 shadow-xl space-y-3 break-words min-w-0 max-w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-900/60 text-xs text-rose-400">
            <span className="font-semibold text-rose-300">[MESSAGE DE RECADRAGE D&apos;URGENCE]</span>
            <span className="bg-rose-950 px-2 py-0.5 rounded text-[11px] text-rose-300 border border-rose-800">À copier en cas de dérive</span>
          </div>

          <div className="space-y-2 text-slate-300 leading-relaxed">
            <div className="text-rose-400 font-bold">ARRÊTE IMMÉDIATEMENT LES OPÉRATIONS EN COURS.</div>
            <div>Tu dépasses le périmètre strict de ma demande initiale.</div>
            <div className="pt-1 text-slate-400 font-semibold">ORDRES STRICTS :</div>
            <div>1. Ne modifie aucun nouveau fichier.</div>
            <div>2. N&apos;installe aucune nouvelle dépendance npm.</div>
            <div>3. Ne touche pas au CSS global ni aux fichiers de configuration.</div>
            <div>4. Dresse la liste exacte des lignes que tu as déjà modifiées.</div>
            <div>5. Attends mes instructions précises avant de faire quoi que ce soit d&apos;autre.</div>
          </div>
        </div>
      </section>

      {/* 5. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.10) : Le pilotage interactif
        </h2>
        <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">TP 4.10 — L&apos;art du feedback</span>
          <h4 className="font-extrabold text-slate-950 text-base">Tester les questions de clarification</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Donnez une consigne volontairement vague à l&apos;agent :
          </p>
          <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs break-words border border-slate-800 min-w-0 max-w-full">
            « Ajoute une fonction de tri sur ma liste de projets. »
          </div>
          <p className="text-xs text-slate-600 italic">
            → Observez s&apos;il se précipite pour inventer un tri au hasard, ou s&apos;il a l&apos;intelligence de vous demander : <em>« Souhaitez-vous trier par date, par ordre alphabétique ou par popularité ? »</em>. Répondez-lui et validez son plan.
          </p>
        </div>
      </section>

      {/* 6. Quiz d'évaluation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vos acquis sur l&apos;Interaction
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 10 (Interaction utilisateur-agent)"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il bénéfique qu'un agent IA pose une question de clarification face à une consigne ambiguë ?",
              options: [
                "Parce qu'il refuse de travailler.",
                "Pour éviter de prendre des décisions d'architecture arbitraires qui ne correspondraient pas au besoin réel du développeur.",
                "Pour faire planter l'IDE.",
                "Pour demander un pourboire."
              ],
              correctIndex: 1,
              explanation: "Poser une question ciblée évite le gaspillage de tokens et les modifications incompatibles fondées sur des suppositions erronées."
            },
            {
              id: 2,
              question: "Quelle est la conduite à tenir si l'agent commence à modifier des fichiers en dehors du périmètre convenu ?",
              options: [
                "Le laisser continuer en espérant qu'il arrange la situation.",
                "Interrompre immédiatement les opérations en cours, lui ordonner un recadrage strict et exiger l'état des modifications déjà appliquées.",
                "Éteindre l'écran et partir en vacances.",
                "Supprimer son projet Git."
              ],
              correctIndex: 1,
              explanation: "Un recadrage immédiat rétablit les limites d'intervention avant que des régressions majeures ne se propagent dans votre code."
            },
            {
              id: 3,
              question: "Dans le mode 'Observation (Read-Only)', quel est le niveau de risque pour vos fichiers de code existants ?",
              options: [
                "Risque maximal.",
                "Risque zéro, car aucun outil d'écriture ou d'édition n'est autorisé dans ce mode.",
                "Risque uniquement pour les images PNG.",
                "Risque de supprimer Windows."
              ],
              correctIndex: 1,
              explanation: "Le mode observation limite strictement l'agent à la lecture de fichiers et à la recherche, garantissant une absence totale de modification sur le disque."
            }
          ]}
        />
      </section>
    </div>
  );
};
