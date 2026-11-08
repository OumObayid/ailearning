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
          Chapitre 3 — Compréhension du contexte du projet
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi la maîtrise du contexte est-elle déterminante ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Lorsqu&apos;on demande à Antigravity : <em>« Ajoute une fonctionnalité de connexion à mon application React »</em>, l&apos;agent ne peut pas se contenter d&apos;écrire du code générique. Il doit impérativement savoir si le projet utilise Vite ou Next.js, où sont stockées les routes, comment les services API communiquent avec le backend, et quelles conventions de nommage sont déjà en vigueur.
        </p>
        <Callout type="danger">
          <strong>Le piège du code hors-sol :</strong> Un agent qui travaille avec un mauvais contexte peut produire du code techniquement irréprochable et sans erreur de syntaxe, mais <strong>totalement inadapté et incompatible</strong> avec votre architecture existante.
        </Callout>
      </section>

      {/* 2. Les 5 dimensions du contexte */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 5 dimensions du contexte d&apos;un projet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="cpu-chip" className="w-5 h-5" />
              <span>1. Contexte technique</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Les technologies fondamentales : React 19, Vite, Express, MySQL, Axios, TailwindCSS. Empêche l&apos;agent de proposer des solutions incompatibles (ex: du code Next.js dans une SPA Vite).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="folder" className="w-5 h-5" />
              <span>2. Contexte structurel</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              L&apos;arborescence des dossiers (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">src/components</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">src/pages</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">src/services</code>). Permet de savoir exactement où chercher et où créer les composants.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="bolt" className="w-5 h-5" />
              <span>3. Contexte fonctionnel</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Ce que fait réellement l&apos;application : catalogue de produits, panier, espace membre, back-office. L&apos;agent doit comprendre les liens logiques entre les écrans.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="scale" className="w-5 h-5" />
              <span>4. Contexte métier</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Les règles de gestion particulières de l&apos;entreprise (ex: un produit en rupture ne peut être commandé, un client ne peut accéder aux routes d&apos;administration).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="shield-check" className="w-5 h-5" />
              <span>5. Contexte des instructions et contraintes</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Les directives données à l&apos;agent : n&apos;utiliser que JavaScript (pas de TypeScript), interdiction d&apos;installer de nouveaux packages npm, obligation de préserver les feuilles de style existantes et confirmation obligatoire avant édition.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Découverte du contexte */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comment l&apos;agent découvre-t-il le contexte ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un projet comprenant des centaines de fichiers, l&apos;agent ne lit pas tout d&apos;un coup : il procède par <strong>exploration ciblée</strong> :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">A. Lecture des fichiers pivots</h4>
            <p className="text-xs text-slate-700">
              Inspection de <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">package.json</code> (dépendances et scripts), <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">vite.config.js</code> et <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">src/main.jsx</code> pour cerner le point d&apos;entrée.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">B. Recherche de symboles et imports</h4>
            <p className="text-xs text-slate-700">
              Traçage des imports et exports : comprendre que <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">App.jsx</code> importe <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">Login.jsx</code>, qui fait lui-même appel aux méthodes de <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">authService.js</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Contexte vs Mémoire */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Comparaison essentielle : Contexte vs Mémoire
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Contexte (Context)</th>
                <th className="p-3.5 border border-slate-200">Mémoire (Memory)</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Définition</td>
                <td className="p-3.5 border border-slate-200">Informations actives utiles à la tâche immédiate</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Informations persistantes conservées entre sessions</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Durée de vie</td>
                <td className="p-3.5 border border-slate-200">Éphémère (durée de la session ou de la tâche)</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Durable (fichiers de configuration, profil développeur)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Rôle principal</td>
                <td className="p-3.5 border border-slate-200">Comprendre la situation actuelle du code</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Éviter d&apos;avoir à réexpliquer les préférences récurrentes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Prompt d'audit du contexte */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Prompt professionnel : Audit de contexte sous Antigravity
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`[MISSION]
Tu dois effectuer une analyse de compréhension du projet React actuellement ouvert.
Objectif : comprendre son architecture avant toute proposition d'intervention.

[ELEMENTS A IDENTIFIER]
1. Contexte technique : Framework, bundler, bibliothèques principales.
2. Contexte structurel : Rôle des dossiers, point d'entrée, composants majeurs.
3. Contexte fonctionnel : Objectif de l'application et parcours utilisateur.
4. Contexte des dépendances : Utilité de chaque dépendance dans package.json.
5. INFORMATIONS MANQUANTES : Liste les fichiers inaccessibles ou points flous.

[CONTRAINTES OBLIGATOIRES]
- Ne modifie et ne crée aucun fichier.
- N'exécute aucune commande dans le terminal.
- Distingue rigoureusement les informations vérifiées de tes suppositions.`}</pre>
        </div>
      </section>

      {/* 6. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Travaux pratiques guidés (TP 4.3)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice 1</span>
            <h4 className="font-bold text-slate-950">Découverte passive</h4>
            <p className="text-xs text-slate-700">Demandez à Antigravity d&apos;identifier les technologies et les dossiers clés d&apos;un projet sans modifier aucun fichier.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice 2</span>
            <h4 className="font-bold text-slate-950">Traçage de composants</h4>
            <p className="text-xs text-slate-700">Demandez à l&apos;agent d&apos;expliquer comment une page est reliée à ses sous-composants et services API.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice 3</span>
            <h4 className="font-bold text-slate-950">Détection des limites</h4>
            <p className="text-xs text-slate-700">Interrogez-le : <em>« Quelles informations te manquent pour comprendre complètement cette application ? »</em></p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice 4</span>
            <h4 className="font-bold text-slate-950">Enrichissement du contexte</h4>
            <p className="text-xs text-slate-700">Fournissez une contrainte métier nouvelle et observez l&apos;ajustement immédiat de son analyse.</p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Contexte de projet
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 3"
          questions={[
            {
              id: 1,
              question: "Quelle est la conséquence probable d'un agent IA qui intervient avec un contexte incomplet ?",
              options: [
                "L'ordinateur redémarre instantanément.",
                "L'agent risque de produire du code techniquement valide mais totalement inadapté à l'architecture du projet (ex: mélanger Next.js et Vite).",
                "Le projet devient automatiquement bilingue.",
                "L'agent refuse catégoriquement d'écrire la moindre ligne."
              ],
              correctIndex: 1,
              explanation: "Un contexte défaillant conduit à des solutions hors-sol qui violent les conventions et l'architecture établie du projet."
            },
            {
              id: 2,
              question: "Quelle est la différence fondamentale entre Contexte et Mémoire persistante ?",
              options: [
                "Le contexte est réinitialisé à chaque tâche ou session, tandis que la mémoire conserve des préférences ou règles à travers le temps.",
                "La mémoire ne peut stocker que des nombres entiers.",
                "Le contexte est payant, la mémoire est gratuite.",
                "Il n'y a aucune différence, ce sont deux synonymes parfaits."
              ],
              correctIndex: 0,
              explanation: "Le contexte représente l'ensemble des informations actives à un instant t, tandis que la mémoire persiste d'une session à l'autre."
            }
          ]}
        />
      </section>
    </div>
  );
};

