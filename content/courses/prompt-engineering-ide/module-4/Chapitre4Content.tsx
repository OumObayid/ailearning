'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — Planification des tâches
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Pourquoi un bon agent réfléchit et structure son plan d&apos;attaque avant de toucher à la première ligne de code.
        </p>
      </div>

      {/* 1. Introduction & Analogie */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;analogie du chantier : L&apos;architecte avant le marteau-piqueur</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Imaginez un maçon à qui vous demandez de créer une ouverture entre le salon et la cuisine. S&apos;il commence immédiatement à abattre le mur sans vérifier les plans, il risque d&apos;écrouler le plafond s&apos;il s&apos;agit d&apos;un mur porteur ou de sectionner une canalisation d&apos;eau cachée.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          En développement, c&apos;est exactement la même chose ! Lorsqu&apos;un développeur demande : <em className="text-indigo-900 font-medium">« Ajoute un système d&apos;authentification avec token JWT et sauvegarde dans la base »</em>, un agent non entraîné se jetterait sur le code, oublierait la gestion des erreurs et casserait la session utilisateur.
        </p>
        <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl text-xs sm:text-sm text-indigo-950 font-medium">
          📌 <strong>La règle d&apos;or du Task Planning :</strong> L&apos;agent commence toujours par une phase d&apos;ingénierie préliminaire en lecture seule : il dresse la carte des dépendances, anticipe les risques et soumet son plan à votre validation avant toute écriture.
        </div>
      </section>

      {/* 2. Les 5 questions de la planification */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 5 questions fondamentales de la planification
        </h2>
        <p className="text-sm sm:text-base text-slate-700">
          Avant de démarrer la moindre modification, le planificateur de l&apos;agent répond méthodiquement à ces 5 questions :
        </p>

        <div className="grid gap-3.5 pt-1 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm text-center flex flex-col justify-between space-y-2">
            <div>
              <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 1</span>
              <div className="font-extrabold text-slate-950 text-sm">Résultat visé</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">À quoi ressemblera exactement l&apos;application une fois le travail terminé ?</p>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 p-1.5 rounded-lg">Cahier des charges</span>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm text-center flex flex-col justify-between space-y-2">
            <div>
              <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 2</span>
              <div className="font-extrabold text-slate-950 text-sm">Fichiers à explorer</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">Quels composants existants doivent être lus pour comprendre l&apos;état actuel ?</p>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 p-1.5 rounded-lg">Périmètre d&apos;inspection</span>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm text-center flex flex-col justify-between space-y-2">
            <div>
              <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 3</span>
              <div className="font-extrabold text-slate-950 text-sm">Actions chirurgicales</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">Quels fichiers précis seront créés ou modifiés sans toucher au reste ?</p>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 p-1.5 rounded-lg">Changements ciblés</span>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm text-center flex flex-col justify-between space-y-2">
            <div>
              <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 4</span>
              <div className="font-extrabold text-slate-950 text-sm">Ordre logique</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">Dans quel ordre chronologique exécuter les étapes (dépendances) ?</p>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 p-1.5 rounded-lg">Ordonnancement</span>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm text-center flex flex-col justify-between space-y-2">
            <div>
              <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 5</span>
              <div className="font-extrabold text-slate-950 text-sm">Critères de succès</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">Quel test ou commande prouvera sans ambiguïté que tout fonctionne ?</p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 p-1.5 rounded-lg">Preuve de validation</span>
          </div>
        </div>
      </section>

      {/* 3. Les 4 stratégies de planification */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 4 grandes stratégies de planification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Stratégie 1</span>
            <h4 className="font-extrabold text-slate-950 text-base">Planification séquentielle (Linéaire)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Chaque étape attend la fin de la précédente : <em>Étape 1 → Étape 2 → Étape 3</em>. Idéal lorsque chaque opération dépend directement de la précédente (ex: créer le schéma de base de données avant d&apos;écrire la route d&apos;API, puis brancher le bouton React).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">Stratégie 2</span>
            <h4 className="font-extrabold text-slate-950 text-base">Planification parallèle (Simultanée)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              L&apos;agent lance plusieurs inspections indépendantes en même temps pour gagner du temps : par exemple, vérifier la conformité TypeScript d&apos;un côté et vérifier les classes CSS de l&apos;autre, avant de faire la synthèse finale.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">Stratégie 3</span>
            <h4 className="font-extrabold text-slate-950 text-base">Planification conditionnelle (Aiguillage)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              La suite de la feuille de route dépend du résultat d&apos;un test : <em>« Si la commande npm test passe → déployer la fonction ; si elle échoue → analyser la stack trace et générer un correctif ciblé »</em>.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">Stratégie 4</span>
            <h4 className="font-extrabold text-slate-950 text-base">Planification adaptative (Auto-révision)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              L&apos;agent met à jour son propre plan s&apos;il découvre en chemin un imprévu (ex: il pensait que l&apos;application utilisait un state Redux, mais découvre en lisant les fichiers qu&apos;elle utilise Zustand).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Planification vs Exécution */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Planification vs Exécution : Deux univers étanches
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans Google Antigravity, la séparation entre planifier et agir est une garantie de sécurité absolue :
        </p>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border border-slate-200 w-1/4">Critère</th>
                <th className="p-3.5 border border-slate-200 text-indigo-900">Phase de Planification</th>
                <th className="p-3.5 border border-slate-200 text-amber-900">Phase d&apos;Exécution</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Nature</td>
                <td className="p-3.5 border border-slate-200">Réflexion stratégique et proposition</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Actions concrètes sur vos fichiers</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Outils autorisés</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Lecture seule (read_file, list_dir, search)</td>
                <td className="p-3.5 border border-slate-200 text-amber-700 font-bold">Écriture et Terminal (edit_file, run_command)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Risque pour votre code</td>
                <td className="p-3.5 border border-slate-200 text-emerald-800 font-bold">Zéro risque (aucun fichier modifié)</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Modifications réelles soumises à votre approbation</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Rôle du développeur</td>
                <td className="p-3.5 border border-slate-200">Revue du plan et validation du découpage</td>
                <td className="p-3.5 border border-slate-200">Surveillance des résultats et contrôle des tests</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Phase de Planification</span>
            <div className="text-xs text-emerald-800 font-semibold">• Lecture seule stricte.</div>
            <div className="text-xs text-slate-700">• Zéro risque de casse pour votre projet.</div>
            <div className="text-xs text-indigo-900 font-semibold">• Présentation de la feuille de route dans le chat.</div>
          </div>
          <div className="p-4 bg-white border border-amber-200 rounded-xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Phase d&apos;Exécution</span>
            <div className="text-xs text-amber-900 font-semibold">• Déclenchée uniquement après votre clic de validation.</div>
            <div className="text-xs text-slate-700">• Édition ciblée des fichiers et exécution des commandes.</div>
          </div>
        </div>

        <Callout type="tip">
          <strong>Bon réflexe professionnel :</strong> Si un agent commence à modifier du code sans vous avoir présenté un plan d&apos;action clair, stoppez-le et exigez : <em>« Présente d&apos;abord ton plan étape par étape avant d&apos;écrire la moindre ligne »</em>.
        </Callout>
      </section>

      {/* 5. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.4) : Piloter la planification
        </h2>
        <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">TP 4.4 — Exiger un plan parfait</span>
          <h4 className="font-extrabold text-slate-950 text-base">Mission : Ajout d&apos;une barre de recherche de produits</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Transmettez à Google Antigravity l&apos;instruction de cadrage suivante :
          </p>
          <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs break-words border border-slate-800 min-w-0 max-w-full">
            « Je souhaite ajouter un champ de recherche instantané dans la liste de nos produits. Avant toute intervention, produis un plan détaillé : (1) composants à analyser, (2) modifications prévues, (3) risques d&apos;incompatibilité, (4) tests de validation. CONSIGNES STRICTES : Ne modifie aucun fichier et n&apos;exécute aucune commande dans le terminal. »
          </div>
          <p className="text-xs text-slate-600 italic">
            → Examinez le plan produit : s&apos;assure-t-il de gérer le cas où aucun produit ne correspond à la recherche ? Si non, demandez-lui d&apos;ajuster son plan avant de valider.
          </p>
        </div>
      </section>

      {/* 6. Quiz d'évaluation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vos acquis sur la Planification
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 4 (Planification des tâches)"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial de séparer formellement la planification de l'exécution dans un IDE ?",
              options: [
                "Pour permettre au développeur d'auditer et d'ajuster la démarche avant qu'une modification irréversible ne soit appliquée sur les fichiers.",
                "Parce que les serveurs refusent de planifier et d'écrire du code pendant la même heure.",
                "Pour forcer l'ordinateur à se mettre en veille prolongée.",
                "Pour masquer les erreurs de syntaxe au développeur."
              ],
              correctIndex: 0,
              explanation: "Valider le plan en amont permet d'éliminer les étapes inutiles, de vérifier les fichiers ciblés et de prévenir les régressions avant toute écriture sur le disque."
            },
            {
              id: 2,
              question: "Qu'est-ce que la « planification adaptative » chez un agent IA ?",
              options: [
                "Un plan qui change de langue à chaque phrase.",
                "La capacité de l'agent à mettre à jour sa feuille de route lorsqu'une découverte technique imprévue survient pendant l'observation.",
                "L'interdiction formelle d'utiliser des conditions if/else.",
                "Un plan réservé aux ordinateurs portables."
              ],
              correctIndex: 1,
              explanation: "L'adaptabilité permet à l'agent de corriger sa stratégie dès qu'un constat réel (ex: un fichier manquant ou une bibliothèque différente) contredit son hypothèse de départ."
            },
            {
              id: 3,
              question: "Pendant la phase de planification, quels types d'outils l'agent a-t-il le droit d'utiliser ?",
              options: [
                "Uniquement des outils de suppression de fichiers.",
                "Uniquement des outils de lecture seule et de recherche (read_file, search) pour explorer le projet sans risque.",
                "Tous les outils sans aucune restriction de sécurité.",
                "Aucun outil, l'agent doit deviner le code par télépathie."
              ],
              correctIndex: 1,
              explanation: "Durant la planification, l'agent se limite à des outils d'inspection en lecture seule afin de garantir un risque zéro pour votre code existant."
            }
          ]}
        />
      </section>
    </div>
  );
};
