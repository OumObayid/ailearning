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
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Architecture générale d&apos;un agent IA
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Découvrir les 7 rouages internes qui permettent à un agent de réfléchir, manipuler des fichiers et s&apos;auto-corriger en toute sécurité.
        </p>
      </div>

      {/* 1. Introduction : Au-delà du modèle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-600" />
          <span>1. Que se passe-t-il vraiment quand vous donnez un ordre à l&apos;agent ?</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Lorsque vous écrivez à Google Antigravity : <em className="text-indigo-900">« Analyse mon application React, trouve les erreurs et propose des corrections sans modifier les fichiers »</em>, il ne s&apos;agit pas d&apos;un simple aller-retour texte avec un modèle d&apos;IA.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un modèle d&apos;IA (LLM) seul est <strong>incapable</strong> de toucher au disque dur ou d&apos;exécuter une commande. Pour transformer la pensée en action dans votre IDE, l&apos;agent s&apos;appuie sur une <strong>architecture de 7 organes interconnectés</strong>.
        </p>
      </section>

      {/* 2. Les 7 organes de l'agent */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 7 composants interconnectés d&apos;un agent IA
        </h2>
        <p className="text-sm sm:text-base text-slate-700">
          Chaque composant a une responsabilité vitale. Pour bien les retenir, voici leurs équivalents humains et techniques :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Composant 1 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Composant 1</span>
                <span className="text-xl">📜</span>
              </div>
              <h3 className="font-extrabold text-slate-950 text-base">Instructions Système (System Prompt)</h3>
              <div className="text-xs font-semibold text-indigo-600 mb-1.5">Analogie : Le contrat de travail &amp; la déontologie</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Le cadre permanent invisible qui dicte la personnalité de l&apos;agent, sa langue, ses règles de sécurité absolues (ex: <em className="text-slate-800">« Ne supprime jamais la base de données »</em>) et l&apos;obligation d&apos;obtenir une validation humaine avant toute modification sensible.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
              Rôle technique : Fixe le comportement avant le premier message.
            </div>
          </div>

          {/* Composant 2 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Composant 2</span>
                <span className="text-xl">🧠</span>
              </div>
              <h3 className="font-extrabold text-slate-950 text-base">Le Modèle LLM (ex: Gemini 2.5 / 3.5)</h3>
              <div className="text-xs font-semibold text-indigo-600 mb-1.5">Analogie : Le cerveau qui raisonne</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Le moteur d&apos;intelligence pure. Il lit votre demande, analyse le code source fourni et décide de la prochaine démarche logique à entreprendre. Il produit des réflexions et des requêtes d&apos;outils, mais ne touche jamais au disque lui-même.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
              Rôle technique : Inférence, compréhension du langage et choix d&apos;outils.
            </div>
          </div>

          {/* Composant 3 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Composant 3</span>
                <span className="text-xl">📚</span>
              </div>
              <h3 className="font-extrabold text-slate-950 text-base">Le Contexte Dynamique (Context Window)</h3>
              <div className="text-xs font-semibold text-indigo-600 mb-1.5">Analogie : Les dossiers posés sur le bureau</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Toutes les informations que l&apos;agent &quot;garde à l&apos;esprit&quot; à un instant t : l&apos;historique de conversation, la liste des fichiers du projet, le code ouvert dans l&apos;éditeur et les résultats retournés par les commandes récentes.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
              Rôle technique : Injecté dans chaque invite envoyée au modèle.
            </div>
          </div>

          {/* Composant 4 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Composant 4</span>
                <span className="text-xl">🗺️</span>
              </div>
              <h3 className="font-extrabold text-slate-950 text-base">Le Planificateur (Planner)</h3>
              <div className="text-xs font-semibold text-indigo-600 mb-1.5">Analogie : La feuille de route par étapes</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Il empêche l&apos;agent d&apos;agir dans le désordre. Face à une mission complexe, il génère un plan séquentiel (1. Explorer <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">package.json</code> → 2. Détecter le bug → 3. Rédiger le correctif → 4. Tester) et coche les étapes une par une.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
              Rôle technique : Maintient le fil conducteur et évite les dérives.
            </div>
          </div>

          {/* Composant 5 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Composant 5</span>
                <span className="text-xl">🛠️</span>
              </div>
              <h3 className="font-extrabold text-slate-950 text-base">La Boîte à Outils (Tools)</h3>
              <div className="text-xs font-semibold text-indigo-600 mb-1.5">Analogie : Les mains et les yeux</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Les fonctions techniques réelles que l&apos;agent peut invoquer : <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">read_file</code> (lire), <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">edit_file</code> (modifier), <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">run_command</code> (terminal), <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">search_web</code> (recherche en ligne).
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
              Rôle technique : Mécanisme standard de Tool Calling (Function Calling).
            </div>
          </div>

          {/* Composant 6 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Composant 6</span>
                <span className="text-xl">🛡️</span>
              </div>
              <h3 className="font-extrabold text-slate-950 text-base">Le Système d&apos;Autorisations (Permissions)</h3>
              <div className="text-xs font-semibold text-indigo-600 mb-1.5">Analogie : Le vigile et le pare-feu de sécurité</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                La barrière de sécurité entre l&apos;agent et votre machine. Même si l&apos;agent décide d&apos;appeler un outil destructeur, le système intercepte l&apos;appel et exige un clic de confirmation explicite de votre part avant d&apos;exécuter l&apos;action.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
              Rôle technique : Gardien des droits d&apos;écriture et d&apos;exécution locale.
            </div>
          </div>

          {/* Composant 7 (Pleine largeur) */}
          <div className="p-5 bg-white border-2 border-emerald-200 rounded-2xl space-y-2 shadow-sm md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">Composant 7</span>
              <span className="text-xl">🔍</span>
            </div>
            <h3 className="font-extrabold text-slate-950 text-base">Observation &amp; Validation (Feedback Loop)</h3>
            <div className="text-xs font-semibold text-emerald-700 mb-1.5">Analogie : Regarder si la clé a bien ouvert la porte</div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Après chaque action outillée, l&apos;agent inspecte le retour réel (code d&apos;erreur dans le terminal, logs de compilation, message de succès). Si une erreur survient, il la lit, comprend la cause et réajuste immédiatement son plan sans attendre que vous lui fassiez la remarque !
            </p>
          </div>
        </div>
      </section>

      {/* 3. La boucle opérationnelle ReAct */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La boucle opérationnelle : Comprendre → Planifier → Agir → Observer
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Ce qui rend un agent véritablement autonome, c&apos;est son fonctionnement en <strong>boucle itérative</strong> (souvent appelée boucle <em className="text-indigo-800 font-semibold">ReAct : Reason + Act</em>) :
        </p>

        {/* Workflow en cartes étapes sans scrollbar */}
        <div className="grid gap-4 pt-1 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border-2 border-indigo-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Étape 1</span>
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">1</span>
              </div>
              <h4 className="font-bold text-slate-950 text-sm">Comprendre</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Analyse du prompt de l&apos;utilisateur face au contexte actuel du projet.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-indigo-600 flex items-center gap-1 border-t border-indigo-100">
              <span>Sortie : Objectif ciblé</span>
              <span aria-hidden="true">→</span>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-purple-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Étape 2</span>
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center">2</span>
              </div>
              <h4 className="font-bold text-slate-950 text-sm">Planifier</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Choix du bon outil à invoquer et préparation des paramètres exacts.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-purple-600 flex items-center gap-1 border-t border-purple-100">
              <span>Sortie : Appel d&apos;outil</span>
              <span aria-hidden="true">→</span>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-amber-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Étape 3</span>
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center">3</span>
              </div>
              <h4 className="font-bold text-slate-950 text-sm">Agir (sous contrôle)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Validation des permissions et exécution technique de l&apos;outil sur l&apos;IDE.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-amber-600 flex items-center gap-1 border-t border-amber-100">
              <span>Sortie : Données brutes</span>
              <span aria-hidden="true">→</span>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-emerald-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Étape 4</span>
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">4</span>
              </div>
              <h4 className="font-bold text-slate-950 text-sm">Observer &amp; Boucler</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Analyse du retour : si réussi, passe à l&apos;étape suivante ; sinon, s&apos;auto-corrige.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-emerald-600 flex items-center gap-1 border-t border-emerald-100">
              <span>Sortie : Succès ou itération</span>
              <span aria-hidden="true">✓</span>
            </div>
          </div>
        </div>

        <Callout type="note">
          <strong>Principe d&apos;auto-adaptation :</strong> Si l&apos;agent cherche à ouvrir un fichier nommé <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">Navbar.js</code> et reçoit une erreur <em>« File not found »</em>, il ne capitule pas : il observe l&apos;erreur, réalise que le projet utilise TypeScript, cherche <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">Navbar.tsx</code> et continue sa mission.
        </Callout>
      </section>

      {/* 4. Exemple concret d'orchestration */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Exemple appliqué : Diagnostic d&apos;un crash de page d&apos;accueil React
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Voyons comment les 7 organes interviennent concrètement lorsque vous demandez : <em className="text-indigo-900">« Pourquoi la page d&apos;accueil plante-t-elle au démarrage ? »</em>
        </p>

        {/* Version Desktop : Tableau aéré */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3 border border-slate-200 w-1/4">Organe intervenant</th>
                <th className="p-3 border border-slate-200">Action concrète dans ce diagnostic</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-900">1. Instructions Système</td>
                <td className="p-3 border border-slate-200">Rappellent à l&apos;agent : <em>« Tu es en mode diagnostic. Ne modifie aucun fichier pour l&apos;instant. »</em></td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-900">2. Modèle LLM</td>
                <td className="p-3 border border-slate-200">Formule l&apos;hypothèse qu&apos;une erreur de rendu provient souvent d&apos;un import manquant ou d&apos;un hook mal initialisé.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-900">3. Contexte Dynamique</td>
                <td className="p-3 border border-slate-200">Charge la trace d&apos;erreur affichée dans la console de l&apos;IDE et le chemin du fichier d&apos;entrée <code className="bg-slate-100 px-1 rounded font-mono text-xs">src/App.tsx</code>.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-900">4. Planificateur</td>
                <td className="p-3 border border-slate-200">Ordonne : Étape 1 : lire <code className="bg-slate-100 px-1 rounded font-mono text-xs">src/App.tsx</code> → Étape 2 : vérifier <code className="bg-slate-100 px-1 rounded font-mono text-xs">package.json</code> → Étape 3 : synthétiser.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-900">5. Outils (Tools)</td>
                <td className="p-3 border border-slate-200">Déclenche l&apos;outil <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs text-indigo-700">read_file(path: &quot;src/App.tsx&quot;)</code>.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-900">6. Permissions</td>
                <td className="p-3 border border-slate-200">Valide immédiatement la lecture (opération sans risque), mais bloquerait une suppression de dossier.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-emerald-800">7. Observation</td>
                <td className="p-3 border border-slate-200">L&apos;agent examine le fichier lu et constate qu&apos;un fichier CSS inexistant est importé à la ligne 4. Il rédige l&apos;explication claire pour l&apos;utilisateur.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Version Mobile : Cartes empilées sans scrollbar */}
        <div className="sm:hidden space-y-3">
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">1. Instructions Système</span>
            <p className="text-xs text-slate-700">Imposent le mode diagnostic en lecture seule sans modifier le projet.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">2. Modèle LLM</span>
            <p className="text-xs text-slate-700">Émet l&apos;hypothèse d&apos;un composant ou d&apos;un hook cassé à l&apos;initialisation.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">3. Contexte</span>
            <p className="text-xs text-slate-700">Fournit le chemin de <code className="bg-slate-100 px-1 rounded font-mono text-xs">src/App.tsx</code> et les logs du terminal.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">4. Planificateur</span>
            <p className="text-xs text-slate-700">Définit la feuille de route : lire le code d&apos;entrée avant de regarder les dépendances.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">5. Outils (Tools)</span>
            <p className="text-xs text-slate-700">Exécute la lecture effective du fichier via <code className="bg-slate-100 px-1 rounded font-mono text-xs">read_file</code>.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">6. Permissions</span>
            <p className="text-xs text-slate-700">Valide l&apos;opération de lecture sécurisée en tâche de fond.</p>
          </div>
          <div className="p-3.5 bg-white border border-emerald-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase">7. Observation</span>
            <p className="text-xs text-slate-700">Découvre que la ligne 4 référence un fichier CSS introuvable et formule la solution.</p>
          </div>
        </div>
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.2)
        </h2>
        <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">TP 4.2 — Déconstruction de l&apos;architecture en direct</span>
          <h4 className="font-extrabold text-slate-950 text-base">Faire expliciter son architecture interne par Antigravity</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Dans Google Antigravity, soumettez le prompt d&apos;introspection suivant :
          </p>
          <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs break-words border border-slate-800 min-w-0 max-w-full">
            « Explique comment tu organiserais l&apos;analyse de mon projet. Détaille séparément : (1) tes instructions permanentes, (2) ton raisonnement LLM, (3) les données de contexte requises, (4) les étapes de ton planificateur, (5) les outils techniques nécessaires, (6) les permissions à valider et (7) ta boucle d&apos;observation. Ne modifie aucun fichier. »
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 font-medium">
            💡 <strong>À méditer :</strong> Pourquoi un modèle d&apos;intelligence artificielle ne peut-il jamais modifier directement un fichier sur votre disque sans passer par un outil technique externe contrôlé par l&apos;IDE ?
          </div>
        </div>
      </section>

      {/* 6. Quiz d'évaluation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Maîtrise de l&apos;Architecture
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 2 (Architecture d'un agent IA)"
          questions={[
            {
              id: 1,
              question: "Quel composant de l'agent est responsable de découper une mission complexe en sous-étapes logiques ordonnées ?",
              options: [
                "Le système de fichiers.",
                "Le Planificateur (Planner).",
                "Le terminal de commandes système.",
                "Le compilateur JavaScript."
              ],
              correctIndex: 1,
              explanation: "Le planificateur structure la mission en étapes successives pour éviter les oublis et organiser les appels d'outils de façon cohérente."
            },
            {
              id: 2,
              question: "Pourquoi l'étape d'« Observation et Validation » est-elle indispensable après l'appel d'un outil ?",
              options: [
                "Pour permettre à l'agent de constater le résultat concret de son action (succès ou code d'erreur) et adapter sa suite en cas d'imprévu.",
                "Pour forcer la fermeture immédiate de l'IDE.",
                "Parce que le modèle LLM oublie automatiquement ce qu'il a écrit dès qu'un outil démarre.",
                "Pour supprimer l'historique de discussion Git."
              ],
              correctIndex: 0,
              explanation: "Sans observation, l'agent avancerait à l'aveugle. Constater le résultat réel lui permet de s'auto-corriger immédiatement lorsqu'une commande échoue."
            },
            {
              id: 3,
              question: "Quel organe garantit que l'agent ne pourra pas supprimer des fichiers système critiques à votre insu ?",
              options: [
                "Le Modèle LLM lui-même.",
                "Le Système d'Autorisations et de Permissions de l'IDE.",
                "Le navigateur Web de l'ordinateur.",
                "L'historique des commits Git."
              ],
              correctIndex: 1,
              explanation: "Le système de permissions de l'IDE intercepte tout appel d'outil sensible et exige la confirmation explicite de l'utilisateur avant d'autoriser l'exécution."
            }
          ]}
        />
      </section>
    </div>
  );
};
