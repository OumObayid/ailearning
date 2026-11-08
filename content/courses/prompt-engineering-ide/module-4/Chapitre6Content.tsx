'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Lecture et modification des fichiers
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi la manipulation de fichiers doit-elle être chirurgicale ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans le quotidien d&apos;un développeur, la lecture et l&apos;écriture de fichiers représentent l&apos;essentiel des interactions avec le projet. Lorsqu&apos;un agent intervient, une modification maladroite peut altérer des composants partagés, supprimer des imports essentiels ou effacer des fichiers de configuration indispensables.
        </p>
        <Callout type="warning">
          <strong>Règle d&apos;or :</strong> Lire, comprendre l&apos;architecture, vérifier les dépendances, préparer la modification, obtenir l&apos;autorisation, appliquer le changement ciblé, contrôler le Diff et valider.
        </Callout>
      </section>

      {/* 2. Traçage des dépendances */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Traçage des dépendances et imports croisés
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un fichier n&apos;est jamais une île isolée. Dans une application React, une modification dans un service partagé se répercute sur toute la chaîne de composants :
        </p>

        <div className="p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl font-mono text-xs sm:text-sm">
          <div className="text-slate-600 mb-2 font-sans font-semibold">Exemple : Chaîne de dépendance type dans une application React :</div>
          <p className="text-indigo-800 font-bold">src/services/authService.js (définit loginUser)</p>
          <p className="pl-4 text-slate-700">↳ importé par src/components/LoginForm.jsx (gère le formulaire)</p>
          <p className="pl-8 text-slate-700">↳ importé par src/pages/Login.jsx (structure la page)</p>
          <p className="pl-12 text-slate-900 font-bold">↳ importé par src/App.jsx (routeur principal)</p>
        </div>

        <p className="text-sm text-slate-800">
          Avant de toucher à la signature de <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">loginUser()</code>, l&apos;agent doit obligatoirement recenser tous les fichiers appelants pour éviter les régressions silencieuses.
        </p>
      </section>

      {/* 3. Modification ciblée vs réécriture globale */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Modification ciblée vs Réécriture globale
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Modification Ciblée (Chirurgicale)</th>
                <th className="p-3.5 border border-slate-200">Réécriture Globale</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Périmètre</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Quelques lignes ou fonction précise</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Remplacement de l&apos;intégralité du fichier</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Risque de régression</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Très faible</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">Élevé (perte de fonctions existantes)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Auditabilité (Diff)</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Immédiatement lisible</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Diff massif difficile à vérifier</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Usage recommandé</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Corrections, ajouts de props, refactoring ciblé</td>
                <td className="p-3.5 border border-slate-200 text-slate-500">Création initiale ou refonte intégrale actée</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Le Diff et Git */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Contrôle par Diff et protection par Git
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le <strong>Diff</strong> permet de visualiser avec exactitude chaque caractère modifié par l&apos;agent :
        </p>

        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`--- a/src/components/Welcome.jsx
+++ b/src/components/Welcome.jsx
@@ -1,5 +1,5 @@
 function Welcome() {
-  return <h1>Bonjour</h1>;
+  return <h1>Bienvenue sur mon application</h1>;
 }
 export default Welcome;`}</pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
              <Icon name="command-line" className="w-4 h-4 text-indigo-600" />
              git status
            </h4>
            <p className="text-xs text-slate-700">Affiche la liste exacte des fichiers modifiés, créés ou supprimés par l&apos;agent.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
              <Icon name="command-line" className="w-4 h-4 text-indigo-600" />
              git diff
            </h4>
            <p className="text-xs text-slate-700">Permet d&apos;auditer ligne par ligne les ajouts (verts) et suppressions (rouges).</p>
          </div>
        </div>
      </section>

      {/* 5. Protection des fichiers sensibles */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Fichiers sanctuarisés et secrets industriels
        </h2>
        <div className="p-5 bg-rose-50 border-2 border-rose-200 rounded-2xl space-y-2">
          <h4 className="font-bold text-rose-900 text-base">Fichiers sensibles à protéger impérativement :</h4>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-rose-950 space-y-1">
            <li><code className="bg-rose-100 px-1 py-0.5 rounded font-mono font-bold">.env</code> : contient les clés d&apos;API Gemini, tokens JWT et identifiants de base de données. L&apos;agent ne doit ni les modifier sans accord ni les afficher en clair dans le chat.</li>
            <li><code className="bg-rose-100 px-1 py-0.5 rounded font-mono font-bold">package-lock.json</code> : garantit la reproductibilité des builds. Ne pas le modifier manuellement.</li>
            <li>Fichiers de configuration sensibles (<code className="bg-rose-100 px-1 py-0.5 rounded font-mono">tsconfig.json</code>, <code className="bg-rose-100 px-1 py-0.5 rounded font-mono">vite.config.js</code>).</li>
          </ul>
        </div>
      </section>

      {/* 6. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Travaux pratiques guidés (TP 4.6)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Étape 1</span>
            <h4 className="font-bold text-slate-950 text-sm">Lecture ciblée</h4>
            <p className="text-xs text-slate-700">Demandez à Antigravity d&apos;examiner un composant et de cartographier tous ses imports sans rien modifier.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Étape 2</span>
            <h4 className="font-bold text-slate-950 text-sm">Édition ciblée</h4>
            <p className="text-xs text-slate-700">Autorisez le changement d&apos;un seul titre et vérifiez qu&apos;aucune autre ligne n&apos;a été altérée.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Étape 3</span>
            <h4 className="font-bold text-slate-950 text-sm">Contrôle Diff</h4>
            <p className="text-xs text-slate-700">Exécutez <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">git diff</code> pour certifier la propreté de la modification.</p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Gestion des fichiers
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 6"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il généralement préférable d'opter pour une modification ciblée plutôt qu'une réécriture complète de fichier ?",
              options: [
                "Parce que la réécriture complète consomme moins de tokens.",
                "Parce que la modification ciblée limite drastiquement le risque de régressions et préserve les fonctionnalités existantes non concernées.",
                "Parce que Git refuse les réécritures complètes.",
                "Pour obliger l'agent à travailler plus lentement."
              ],
              correctIndex: 1,
              explanation: "Remplacer tout le fichier risque d'effacer silencieusement des imports ou fonctions périphériques indispensables au projet."
            },
            {
              id: 2,
              question: "Quel outil permet de vérifier avec certitude les lignes ajoutées et supprimées par un agent ?",
              options: [
                "Le fichier README.md.",
                "La commande git diff ou l'affichage de Diff dans l'IDE.",
                "L'explorateur Windows.",
                "Le navigateur Chrome."
              ],
              correctIndex: 1,
              explanation: "Le Diff affiche la comparaison unifiée exacte entre la version initiale et la version modifiée."
            }
          ]}
        />
      </section>
    </div>
  );
};

