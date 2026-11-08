'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Comprendre le principe des agents IA spécialisés
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Le piège de l&apos;agent généraliste « touche-à-tout »
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un projet informatique réel, toutes les tâches ne mobilisent ni les mêmes compétences, ni la même posture intellectuelle. Développer une application complète avec React, Node.js et MySQL exige de concevoir l&apos;architecture, coder les fonctionnalités, auditer la propreté du code, traquer les failles de sécurité, exécuter des tests rigoureux et rédiger la documentation.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Confier l&apos;ensemble de ces missions à un seul prompt généraliste conduit à des dérives bien connues : les priorités entrent en conflit, les contrôles de sécurité sont bâclés pour aller plus vite, et le modèle modifie des fichiers sans recul. La solution d&apos;ingénierie consiste à <strong>diviser le travail entre agents IA spécialisés</strong>.
        </p>
      </section>

      {/* 2. Organisation comparée */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Organisation centralisée vs Équipe d&apos;agents spécialisés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-extrabold text-rose-900 text-base">Modèle A : Agent Généraliste Unique</h4>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 font-mono text-center">
              Agent Généraliste<br />
              (Architecture • Code • Sécurité • Tests • Docs)
            </div>
            <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4 pt-1">
              <li>Missions mélangées et instructions saturées en tokens.</li>
              <li>Tendance à s&apos;auto-valider avec complaisance.</li>
              <li>Aucune étanchéité des autorisations d&apos;écriture.</li>
            </ul>
          </div>

          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-extrabold text-indigo-950 text-base">Modèle B : Équipe Spécialisée Coordonnée</h4>
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-xs text-indigo-950 font-mono text-center">
              Coordinateur / Orchestrateur<br />
              ↳ [Architecte] ↳ [Développeur] ↳ [Auditeur]<br />
              ↳ [Sécurité] ↳ [Testeur] ↳ [Documentaliste]
            </div>
            <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4 pt-1">
              <li>Chaque agent a une responsabilité claire et exclusive.</li>
              <li>Les auditeurs travaillent en lecture seule stricte.</li>
              <li>Traçabilité totale des livrables transmis entre étapes.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Présentation des 6 agents */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 6 agents spécialisés de référence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="cpu-chip" className="w-5 h-5" />
              <span>1. Agent Architecte</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Mission :</strong> Concevoir avant de coder. Il étudie les besoins, structure les composants, définit l&apos;arborescence et justifie les choix techniques. <em>Interdiction formelle de coder ou d&apos;éditer les fichiers.</em>
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="code" className="w-5 h-5" />
              <span>2. Agent Développeur</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Mission :</strong> Transformer les spécifications validées en code. Il écrit les fonctions et composants dans le périmètre autorisé sans redéfinir l&apos;architecture de son propre chef.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="magnifying-glass" className="w-5 h-5" />
              <span>3. Agent Auditeur</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Mission :</strong> Évaluer la qualité technique. Il traque les duplications de code, la maintenabilité et les violations de conventions. <em>Travaille en lecture seule et ne modifie aucun fichier.</em>
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="shield-check" className="w-5 h-5" />
              <span>4. Agent Sécurité</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Mission :</strong> Détecter les vulnérabilités applicatives (injections SQL, XSS, exposition de secrets dans .env, contrôle d&apos;accès). Il formule des recommandations sans tenter d&apos;attaques destructrices.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="beaker" className="w-5 h-5" />
              <span>5. Agent Testeur</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Mission :</strong> Valider le comportement du système. Il prépare les scénarios de test (cas nominaux et cas limites) et vérifie les résultats d&apos;exécution sans jamais affirmer un succès sans preuve.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="document-text" className="w-5 h-5" />
              <span>6. Agent Documentaliste</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Mission :</strong> Expliquer le fonctionnement réel. Il documente l&apos;architecture, les endpoints de l&apos;API et le déploiement en se basant exclusivement sur ce qui a été effectivement validé par les tests.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Règle fondamentale */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La règle fondamentale : Rôle vs Mission vs Autorisation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Concept</th>
                <th className="p-3.5 border border-slate-200">Question clé</th>
                <th className="p-3.5 border border-slate-200">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Rôle</td>
                <td className="p-3.5 border border-slate-200">Qui est l&apos;agent ?</td>
                <td className="p-3.5 border border-slate-200 text-indigo-700 font-bold">Agent Développeur React &amp; Node.js</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Mission</td>
                <td className="p-3.5 border border-slate-200">Quel travail précis doit-il accomplir ?</td>
                <td className="p-3.5 border border-slate-200">Développer le formulaire de recherche selon les spécifications</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Autorisations</td>
                <td className="p-3.5 border border-slate-200">Quelles actions réelles a-t-il le droit de mener ?</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Modifier uniquement <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">src/components/Search.jsx</code> après accord</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning">
          <strong>Non-chevauchement des rôles :</strong> L&apos;auditeur et l&apos;agent sécurité examinent tous les deux le code source, mais avec deux prismes différents : l&apos;un recherche la maintenabilité et la lisibilité, l&apos;autre la surface d&apos;attaque et les risques d&apos;injection.
        </Callout>
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 5.1)
        </h2>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 5.1 — Distribution des responsabilités</span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Pour une application de gestion des utilisateurs avec React et Node.js, associez chaque responsabilité à son agent attitré :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <strong>1. Proposer l&apos;arborescence des routes API :</strong> Agent Architecte
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <strong>2. Coder le composant formulaire d&apos;inscription :</strong> Agent Développeur
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <strong>3. Traquer les risques d&apos;injection SQL :</strong> Agent Sécurité
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <strong>4. Vérifier les cas de validation avec inputs invalides :</strong> Agent Testeur
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <strong>5. Détecter les fonctions dupliquées et code mort :</strong> Agent Auditeur
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <strong>6. Rédiger le guide d&apos;installation OpenAPI/Swagger :</strong> Agent Documentaliste
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Principes des agents spécialisés
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 1"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il risqué de confier l'architecture, le développement, la sécurité et les tests à un seul et unique agent généraliste ?",
              options: [
                "Parce que le modèle IA risque d'entrer en conflit de priorités, de négliger des vérifications critiques et de s'auto-valider avec complaisance.",
                "Parce que les ordinateurs ne peuvent exécuter qu'un seul mot à la fois.",
                "Parce que le JavaScript ne supporte pas les agents uniques.",
                "Pour augmenter le nombre d'abonnements au service."
              ],
              correctIndex: 0,
              explanation: "Séparer les rôles crée une saine séparation des pouvoirs : les auditeurs et testeurs évaluent en toute indépendance le code produit par le développeur."
            },
            {
              id: 2,
              question: "L'agent auditeur a-t-il vocation à modifier directement le code pour corriger les défauts qu'il relève ?",
              options: [
                "Oui, pour gagner du temps.",
                "Non, sa mission est d'auditer et de consigner des recommandations objectives ; la modification incombe au développeur après accord humain.",
                "Oui, mais uniquement le week-end.",
                "Non, car l'auditeur ne sait pas lire le code."
              ],
              correctIndex: 1,
              explanation: "Un auditeur doit rester en lecture seule pour éviter les conflits d'édition et garantir l'impartialité de ses constats."
            }
          ]}
        />
      </section>
    </div>
  );
};

