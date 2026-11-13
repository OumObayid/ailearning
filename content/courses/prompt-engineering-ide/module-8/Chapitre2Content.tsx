'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>Module 8 — Projet Final &amp; Système Multi-Agents</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Concevoir l&apos;architecture globale du système multi-agents
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Pourquoi le modèle en étoile (Star Topology) surpasse le réseau pair-à-pair anarchique, comment prévenir les conflits de réécriture et suivre le cycle de vie d&apos;une mission à 6 statuts.
        </p>
      </div>

      {/* 1. L'analogie de la tour de contrôle aérien */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>1. L&apos;analogie de la tour de contrôle aérien : Étoile vs Anarchie</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Dans un aéroport international, cinquante avions volent dans le ciel en même temps. Imaginez la catastrophe si chaque pilote discutait au hasard avec les autres pour décider tout seul de sa piste d&apos;atterrissage ! Le ciel deviendrait un chaos mortel en quelques minutes.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour éviter cela, tous les pilotes communiquent <strong>exclusivement avec la tour de contrôle</strong>. L&apos;aiguilleur du ciel centralise les données, attribue les créneaux, vérifie les distances de sécurité et prévient les collisions.
        </p>

        {/* Schéma architectural en étoile */}
        <div className="p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-inner space-y-4 text-xs font-mono break-words min-w-0 max-w-full">
          <div className="text-center font-bold text-emerald-400 border-b border-slate-800 pb-2 text-xs sm:text-sm">
            DÉVELOPPEUR HUMAIN (Autorité Souveraine &amp; Décision HITL)
          </div>
          <div className="text-center text-slate-400">↓ [Demandes de fonctionnalités &amp; Validations formelles]</div>
          <div className="p-3 bg-purple-950/80 border-2 border-purple-400 rounded-2xl text-center text-purple-200 font-bold">
            AGENT COORDINATEUR (Planifie • Décompose • Attribue • Vérifie • Synthétise)
          </div>
          <div className="text-center text-slate-400">↓ [Ordres de mission étanches avec contrat technique]</div>
          <div className="grid gap-2 text-center grid-cols-1 sm:grid-cols-2">
            <div className="p-2.5 bg-slate-800 border border-blue-400/40 rounded-xl text-blue-200">
              <span className="font-bold">Développeur</span><br />React / Node.js
            </div>
            <div className="p-2.5 bg-slate-800 border border-rose-400/40 rounded-xl text-rose-200">
              <span className="font-bold">Sécurité</span><br />Audit &amp; Risques
            </div>
            <div className="p-2.5 bg-slate-800 border border-amber-400/40 rounded-xl text-amber-200">
              <span className="font-bold">Testeur</span><br />QA &amp; Preuves
            </div>
            <div className="p-2.5 bg-slate-800 border border-emerald-400/40 rounded-xl text-emerald-200">
              <span className="font-bold">Documentaliste</span><br />OpenAPI &amp; Guides
            </div>
          </div>
          <div className="text-center text-slate-400">↑ [Comptes-rendus structurés avec preuves matérielles]</div>
          <div className="text-center text-emerald-300 font-bold pt-2 border-t border-slate-800 text-xs">
            RAPPORT DE SYNTHÈSE GLOBAL REVENANT AU DÉVELOPPEUR HUMAIN
          </div>
        </div>
      </section>

      {/* 2. Format standardisé d'un ordre de mission */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>2. Structure standard d&apos;un ordre de mission déléguée</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Le coordinateur ne transmet jamais une phrase floue du style <em>&quot;Développe les projets&quot;</em>. Chaque tâche est formalisée par un contrat technique rigoureux :
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
          <div className="text-purple-400 font-bold border-b border-slate-800 pb-1">
            # CONTRAT DE MISSION TYPE (DEV-001 / SEC-001 / TEST-001 / DOC-001)
          </div>
          <p className="text-slate-300">1. MISSION_ID : DEV-001</p>
          <p className="text-slate-300">2. AGENT DESTINATAIRE : Agent Développeur</p>
          <p className="text-slate-300">3. OBJECTIF PREMIER : Concevoir la solution technique du CRUD des projets</p>
          <p className="text-slate-300">4. PÉRIMÈTRE AUTORISÉ : src/components/Projects/ et src/api/routes/projects.js</p>
          <p className="text-slate-300">5. TRAVAIL ATTENDU : Identifier les endpoints REST, définir les payloads et diffs</p>
          <p className="text-rose-400">6. RESTRICTIONS STRICTES : Mode lecture seule, aucune écriture sans diff validé par l&apos;humain</p>
          <p className="text-slate-300">7. DÉPENDANCES PRÉALABLES : Schéma de données MySQL validé</p>
          <p className="text-slate-300">8. LIVRABLE REQUIS : Proposition technique avec aperçu de code unifié</p>
          <p className="text-slate-300">9. CRITÈRE D&apos;ACCEPTATION : Cohérence avec l&apos;architecture Express existante</p>
          <p className="text-amber-400">10. STATUT INITIAL : À FAIRE</p>
        </div>
      </section>

      {/* 3. Dépendances et prévention des conflits */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>3. Dépendances logiques et prévention des conflits</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour éviter les collisions destructrices sur le code, l&apos;architecture applique 3 règles de gouvernance immuables :
        </p>

        {/* Table Desktop / Tablet */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
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
                <td className="p-3 font-semibold">Deux agents éditent le même fichier en simultané</td>
                <td className="p-3 text-rose-700">Écrasement de logique, code cassé et régression</td>
                <td className="p-3 font-bold text-emerald-800">Principe de l&apos;auteur unique : seul l&apos;agent Développeur a le droit de proposer des diffs.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Le testeur valide une route avant son implémentation</td>
                <td className="p-3 text-rose-700">Faux rapports de réussite et tests fantômes</td>
                <td className="p-3 font-bold text-emerald-800">Ordonnancement strict : le testeur prépare ses tests, mais n&apos;exécute qu&apos;après le déploiement du code.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Le documentaliste rédige sur des suppositions</td>
                <td className="p-3 text-rose-700">Documentation trompeuse et mensongère</td>
                <td className="p-3 font-bold text-emerald-800">Ancrage factuel : la documentation ne traite que des éléments matériellement confirmés dans le code.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card Stack */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-xs">Conflit 1 : Écriture concurrente</span>
            <p className="text-slate-600 text-xs">Règle : Seul l&apos;agent Développeur prépare les diffs de code pour éviter tout écrasement.</p>
            <div className="border-t pt-2">
              <span className="font-bold text-slate-900 text-xs">Conflit 2 : Test anticipé sur du vide</span>
              <p className="text-slate-600 text-xs">Règle : L&apos;exécution des tests intervient exclusivement après l&apos;application du code.</p>
            </div>
            <div className="border-t pt-2">
              <span className="font-bold text-slate-900 text-xs">Conflit 3 : Documentation imaginaire</span>
              <p className="text-slate-600 text-xs">Règle : Le documentaliste ne documente que les routes réelles existantes sur le disque.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Les 6 statuts de mission */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>4. Le cycle de vie d&apos;une mission à 6 statuts</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour savoir exactement où en est le projet à chaque seconde, chaque tâche évolue selon ces 6 états stricts :
        </p>

        <div className="grid gap-2 text-xs text-center font-mono font-bold grid-cols-1 sm:grid-cols-2">
          <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-700">
            1. À FAIRE
            <span className="block font-normal text-[10px] text-slate-500 mt-0.5">En attente</span>
          </div>
          <div className="p-3 bg-blue-100 border border-blue-300 rounded-xl text-blue-800">
            2. EN COURS
            <span className="block font-normal text-[10px] text-blue-600 mt-0.5">Prise en charge</span>
          </div>
          <div className="p-3 bg-amber-100 border border-amber-300 rounded-xl text-amber-800">
            3. EN ATTENTE
            <span className="block font-normal text-[10px] text-amber-700 mt-0.5">Dépendance/HITL</span>
          </div>
          <div className="p-3 bg-rose-100 border border-rose-300 rounded-xl text-rose-800">
            4. BLOQUÉE
            <span className="block font-normal text-[10px] text-rose-600 mt-0.5">Anomalie/Refus</span>
          </div>
          <div className="p-3 bg-purple-100 border border-purple-300 rounded-xl text-purple-800">
            5. TERMINÉE
            <span className="block font-normal text-[10px] text-purple-600 mt-0.5">Livrable soumis</span>
          </div>
          <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900">
            6. VALIDÉE
            <span className="block font-normal text-[10px] text-emerald-700 mt-0.5">Approuvée HITL</span>
          </div>
        </div>

        <Callout type="warning" title="Distinction fondamentale : TERMINÉE vs VALIDÉE">
          Une mission n&apos;est pas automatiquement validée parce qu&apos;un agent annonce qu&apos;elle est <em>terminée</em>. Le coordinateur et le développeur humain doivent vérifier les preuves matérielles et les résultats de tests avant d&apos;accorder le statut <strong>VALIDÉE</strong>.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-purple-700" />
          <span>Validation des acquis : Architecture globale</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'architecture hiérarchique en étoile centrée sur le coordinateur est-elle supérieure à un réseau où les agents s'interpellent librement ?",
              options: [
                "Elle canalise les flux, centralise l'état d'avancement et évite les boucles de discussion infinies et les réécritures chaotiques de code",
                "Elle permet de désactiver le compilateur React",
                "Elle divise par dix la facture d'électricité de l'ordinateur",
                "Elle supprime automatiquement les bases de données inutiles"
              ],
              correctIndex: 0,
              explanation: "À l'image de la tour de contrôle, la topologie en étoile évite le chaos des échanges bilatéraux désordonnés et maintient une vision d'ensemble cohérente sous contrôle humain."
            },
            {
              id: 2,
              question: "Quel principe de gouvernance évite que deux agents IA n'écrasent mutuellement leur code sur le même fichier ?",
              options: [
                "Laisser le dernier agent qui parle écraser le travail de l'autre",
                "Le principe de l'auteur unique : seul l'agent Développeur a la responsabilité de préparer les diffs de code",
                "Demander à l'agent sécurité d'écrire le code en premier",
                "Supprimer Git du projet"
              ],
              correctIndex: 1,
              explanation: "Attribuer la responsabilité exclusive des diffs d'écriture à un agent unique (le Développeur) élimine tout risque de conflit de fusion ou d'écrasement silencieux."
            },
            {
              id: 3,
              question: "Quelle condition doit être satisfaite pour qu'une mission passe du statut 'TERMINÉE' au statut 'VALIDÉE' ?",
              options: [
                "L'agent doit affirmer trois fois de suite qu'il a bien travaillé",
                "Le coordinateur et le développeur humain doivent contrôler les preuves matérielles, les tests et l'absence de régression",
                "Il faut attendre 24 heures sans toucher à l'IDE",
                "Le projet doit être redémarré en mode sans échec"
              ],
              correctIndex: 1,
              explanation: "Le statut 'TERMINÉE' signifie que l'agent a remis son livrable ; seul l'audit des preuves par le coordinateur et la validation humaine confèrent le statut définitif 'VALIDÉE'."
            }
          ]}
        />
      </section>
    </div>
  );
};
