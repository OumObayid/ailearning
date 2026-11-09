'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Concevoir les instructions principales de chaque agent
        </h1>
      </div>

      {/* 1. Structure en 6 piliers */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. L&apos;architecture d&apos;instruction en 6 piliers
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Attribuer un simple label comme <em>« Tu es un agent de sécurité »</em> est totalement insuffisant : cela ne précise ni le périmètre de recherche, ni les outils autorisés, ni la conduite à tenir face à un secret. Les instructions principales d&apos;un agent spécialisé doivent toujours s&apos;articuler autour de 6 composantes rigoureuses :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700">PILIER 1</span>
            <div className="font-bold text-slate-950 text-sm">Identité (Rôle)</div>
            <p className="text-xs text-slate-700">Le profil métier exact et le niveau de séniorité technique attendu.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700">PILIER 2</span>
            <div className="font-bold text-slate-950 text-sm">Mission principale</div>
            <p className="text-xs text-slate-700">L&apos;objectif cardinal que l&apos;agent cherche à atteindre.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700">PILIER 3</span>
            <div className="font-bold text-slate-950 text-sm">Responsabilités</div>
            <p className="text-xs text-slate-700">La liste explicite des tâches relevant de sa compétence.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700">PILIER 4</span>
            <div className="font-bold text-slate-950 text-sm">Limites &amp; Interdits</div>
            <p className="text-xs text-slate-700">Ce que l&apos;agent n&apos;a formellement pas le droit de faire.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700">PILIER 5</span>
            <div className="font-bold text-slate-950 text-sm">Autorisations &amp; Outils</div>
            <p className="text-xs text-slate-700">Outils activés (lecture seule, édition, terminal) et régime d&apos;accord.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-mono font-bold text-indigo-700">PILIER 6</span>
            <div className="font-bold text-slate-950 text-sm">Format des résultats</div>
            <p className="text-xs text-slate-700">La structure obligatoire du livrable (JSON, rapport Markdown normé).</p>
          </div>
        </div>
      </section>

      {/* 2. Fiches d'instructions des 6 agents */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Fiches d&apos;instructions complètes des 6 agents
        </h2>

        <div className="space-y-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-bold text-indigo-900 text-base">Agent 1 — Architecte Logiciel</h4>
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
              <pre>{`[ROLE] Architecte logiciel senior spécialisé React, Node.js et bases relationnelles.
[MISSION] Concevoir l'organisation technique, les flux de données et l'arborescence du projet.
[RESPONSABILITÉS] Identifier les composants, définir les interfaces de communication, justifier les choix de bibliothèques.
[LIMITES] Ne développe aucune fonctionnalité, ne modifie aucun fichier, n'installe aucune dépendance.
[LIVRABLE] Dossier de conception technique avec arborescence et spécifications d'interfaces.`}</pre>
            </div>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-bold text-indigo-900 text-base">Agent 2 — Développeur d&apos;Implémentation</h4>
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
              <pre>{`[ROLE] Développeur React & Node.js spécialisé dans l'implémentation de code robuste.
[MISSION] Transformer les spécifications validées de l'architecte en code source fonctionnel.
[RESPONSABILITÉS] Coder les composants, gérer l'état local et les erreurs, respecter les conventions.
[LIMITES] Ne redéfinit pas l'architecture, ne modifie pas les fichiers hors périmètre, n'installe rien sans accord.
[LIVRABLE] Code fonctionnel prêt pour audit et rapport des modifications appliquées.`}</pre>
            </div>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-bold text-indigo-900 text-base">Agent 3 — Auditeur Technique &amp; Qualité</h4>
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
              <pre>{`[ROLE] Auditeur technique indépendant et expert en maintenabilité logicielle.
[MISSION] Examiner le code source pour y détecter la duplication, les anti-patterns et les dettes techniques.
[RESPONSABILITÉS] Inspecter les imports, évaluer la lisibilité, repérer les faiblesses architecturales.
[LIMITES] Mode LECTURE SEULE STRICT : ne modifie aucun fichier, ne corrige pas directement le code.
[LIVRABLE] Rapport d'audit qualité avec classification des constats par criticité et pistes d'amélioration.`}</pre>
            </div>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-bold text-indigo-900 text-base">Agent 4 — Spécialiste Sécurité Applicative</h4>
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
              <pre>{`[ROLE] Ingénieur sécurité applicative spécialisé OWASP Top 10 pour le Web.
[MISSION] Identifier les vulnérabilités potentielles dans les flux d'entrées, les routes et l'authentification.
[RESPONSABILITÉS] Traquer les injections SQL/NoSQL, vérifier la protection des secrets (.env) et les tokens JWT.
[LIMITES] Ne tente aucune attaque destructive, ne divulgue aucun secret, ne modifie aucun fichier.
[LIVRABLE] Rapport de sécurité avec matrice des risques (Impact / Probabilité) et contre-mesures.`}</pre>
            </div>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-bold text-indigo-900 text-base">Agent 5 — Ingénieur Testeur (QA)</h4>
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
              <pre>{`[ROLE] Ingénieur en assurance qualité logicielle (QA).
[MISSION] Vérifier la conformité du comportement applicatif par rapport aux critères d'acceptation.
[RESPONSABILITÉS] Élaborer les scénarios de test (nominaux et aux limites), exécuter les tests autorisés.
[LIMITES] Ne modifie pas le code source pour forcer un test à passer. Ne déclare JAMAIS un test réussi sans preuve.
[LIVRABLE] Plan de test exhaustif et matrice des résultats (Pass / Fail / Untested).`}</pre>
            </div>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-bold text-indigo-900 text-base">Agent 6 — Documentaliste Technique</h4>
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
              <pre>{`[ROLE] Rédacteur technique spécialisé en documentation pour développeurs.
[MISSION] Rédiger la documentation officielle d'installation, d'API et d'architecture.
[RESPONSABILITÉS] Documenter les endpoints, variables requises (sans secrets), formats d'échange et prérequis.
[LIMITES] N'invente aucune fonction inexistante, ne documente que ce qui est validé par les tests, ne modifie pas le code.
[LIVRABLE] Documentation technique au format Markdown prête à être intégrée au dépôt.`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Instructions permanentes vs Prompt de mission */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Instructions permanentes vs Prompt de mission
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Instructions principales (System Instructions)</th>
                <th className="p-3.5 border border-slate-200">Prompt de mission (User Prompt)</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Temporalité</td>
                <td className="p-3.5 border border-slate-200 text-indigo-700 font-bold">Permanente (définit la nature de l&apos;agent)</td>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-700">Ponctuelle (liée à une tâche précise)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Rôle</td>
                <td className="p-3.5 border border-slate-200">Fixer les limites, responsabilités et interdits</td>
                <td className="p-3.5 border border-slate-200">Donner la consigne immédiate et le contexte d&apos;entrée</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Exemple</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">« Tu es l&apos;agent sécurité. Mode lecture seule stricte. »</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">« Analyse la route /api/login pour vérifier l&apos;injection SQL. »</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Conception des instructions
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 2"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il indispensable de stipuler explicitement les 'Limites et Interdits' dans les instructions d'un agent spécialisé ?",
              options: [
                "Pour éviter que l'agent n'empiète sur le travail des autres profils (ex: un auditeur qui commence à réécrire le code au lieu de rapporter ses constats).",
                "Pour empêcher l'agent de parler français.",
                "Pour réduire la taille de la mémoire vive.",
                "Pour désactiver la compilation du projet."
              ],
              correctIndex: 0,
              explanation: "Sans limites précises, un modèle LLM a naturellement tendance à tenter de tout résoudre lui-même, rompant la séparation des responsabilités."
            },
            {
              id: 2,
              question: "Sur quelles informations l'agent documentaliste doit-il appuyer la rédaction de sa documentation ?",
              options: [
                "Sur les fonctionnalités qu'il espère voir développées plus tard.",
                "Exclusivement sur le code source réel et les fonctionnalités formellement validées par les tests de l'agent testeur.",
                "Sur la documentation d'un autre projet trouvé sur Google.",
                "Sur des suppositions non vérifiées."
              ],
              correctIndex: 1,
              explanation: "Documenter des fonctionnalités hypothétiques ou non testées produit une documentation mensongère qui induit en erreur les utilisateurs."
            }
          ]}
        />
      </section>
    </div>
  );
};

