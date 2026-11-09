'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Configuration des agents dans Google Antigravity
        </h1>
      </div>

      {/* 1. Emplacement des fichiers */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Arborescence normalisée des sous-agents Antigravity
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans la documentation officielle de Google Antigravity, les sous-agents spécialisés dédiés à un workspace sont déclarés sous la forme de fichiers <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs font-bold">agent.md</code> organisés dans le dossier caché du projet :
        </p>

        <div className="p-5 bg-slate-950 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`MON-PROJET/
│
├── .agents/
│   └── agents/
│       ├── architecte/
│       │   └── agent.md        <-- Profil Conception
│       ├── developpeur/
│       │   └── agent.md        <-- Profil Implémentation
│       ├── auditeur/
│       │   └── agent.md        <-- Profil Qualité (Read-Only)
│       ├── securite/
│       │   └── agent.md        <-- Profil Vulnérabilités (Read-Only)
│       ├── testeur/
│       │   └── agent.md        <-- Profil QA
│       └── documentaliste/
│           └── agent.md        <-- Profil Docs
│
├── src/
├── package.json
└── README.md`}</pre>
        </div>
      </section>

      {/* 2. Anatomie d'un agent.md */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Anatomie d&apos;un fichier agent.md (YAML Frontmatter + Markdown)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Chaque fichier <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">agent.md</code> combine un en-tête de configuration YAML au sommet, suivi des directives textuelles en Markdown :
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Paramètre YAML</th>
                <th className="p-3 border border-slate-200">Valeur type</th>
                <th className="p-3 border border-slate-200">Rôle dans Google Antigravity</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-indigo-700">name</td>
                <td className="p-3 border border-slate-200 font-mono">architecte</td>
                <td className="p-3 border border-slate-200">Identifiant unique utilisé pour invoquer l&apos;agent.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-indigo-700">description</td>
                <td className="p-3 border border-slate-200">Analyse les besoins...</td>
                <td className="p-3 border border-slate-200">Courte description permettant au modèle parent de choisir cet agent.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-indigo-700">tools</td>
                <td className="p-3 border border-slate-200 font-mono">[view_file, grep_search]</td>
                <td className="p-3 border border-slate-200">Liste fermée des outils auxquels le sous-agent a accès.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-indigo-700">subagent</td>
                <td className="p-3 border border-slate-200 font-mono">true</td>
                <td className="p-3 border border-slate-200">Autorise l&apos;orchestrateur à déléguer des tâches à ce profil.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-indigo-700">mainAgent</td>
                <td className="p-3 border border-slate-200 font-mono">false</td>
                <td className="p-3 border border-slate-200">Empêche de le sélectionner par erreur comme agent généraliste.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-indigo-700">model</td>
                <td className="p-3 border border-slate-200 font-mono">inherit</td>
                <td className="p-3 border border-slate-200">Hérite du niveau de modèle du parent (ex: Gemini 2.5 Flash/Pro).</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-indigo-700">commandExecutionPolicy</td>
                <td className="p-3 border border-slate-200 font-mono">off</td>
                <td className="p-3 border border-slate-200">Désactive formellement l&apos;exécution automatique de commandes shell.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Déclarations YAML concrètes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Exemples concrets de fichiers de configuration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">.agents/agents/developpeur/agent.md</span>
            <div className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              <pre>{`---
name: developpeur
description: Développe les fonctionnalités React selon les spécifications.
tools:
  - view_file
  - grep_search
  - replace_file_content
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: off
---
# IDENTITÉ
Développeur React & Node.js expérimenté.
# MISSION
Réaliser les fonctionnalités validées par l'utilisateur.
# LIMITES
Ne modifie que les fichiers explicitement approuvés.`}</pre>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800">.agents/agents/securite/agent.md</span>
            <div className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              <pre>{`---
name: securite
description: Examine les vulnérabilités et risques de sécurité applicative.
tools:
  - view_file
  - grep_search
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: off
---
# IDENTITÉ
Spécialiste sécurité applicative web.
# MISSION
Identifier les failles potentielles sans les exploiter.
# LIMITES
Mode lecture seule. Ne modifie aucun fichier. Ne révèle aucun secret.`}</pre>
            </div>
          </div>
        </div>

        <Callout type="note">
          <strong>Différence d&apos;outillage :</strong> Notez que l&apos;agent développeur dispose de <code className="font-mono text-xs">replace_file_content</code> pour éditer du code, alors que l&apos;agent sécurité en est privé pour garantir techniquement son statut de lecture seule.
        </Callout>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Configuration Antigravity
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 5"
          questions={[
            {
              id: 1,
              question: "Dans quel sous-dossier standard de projet sont configurés les sous-agents d'un workspace Google Antigravity ?",
              options: [
                "node_modules/agents/",
                ".agents/agents/<nom_agent>/agent.md",
                "public/images/",
                "dist/config/"
              ],
              correctIndex: 1,
              explanation: "L'arborescence officielle d'Antigravity situe les sous-agents locaux dans .agents/agents/<nom_agent>/agent.md."
            },
            {
              id: 2,
              question: "Pourquoi configure-t-on 'commandExecutionPolicy: off' pour les agents d'audit et d'analyse ?",
              options: [
                "Pour empêcher ces agents d'exécuter des commandes terminal à l'insu de l'utilisateur.",
                "Pour accélérer la connexion Wi-Fi.",
                "Parce qu'Antigravity ne supporte pas le terminal.",
                "Pour forcer l'utilisation de bash."
              ],
              correctIndex: 0,
              explanation: "Cette directive désactive le terminal automatique, sanctuarisant le système contre tout appel de commande involontaire."
            }
          ]}
        />
      </section>
    </div>
  );
};

