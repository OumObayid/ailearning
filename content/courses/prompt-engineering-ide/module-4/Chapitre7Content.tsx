'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Utilisation du terminal
        </h1>
      </div>

      {/* 1. Terminal, Shell et IDE */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Distinguer Terminal, Shell et IDE
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Composant</th>
                <th className="p-3.5 border border-slate-200">Rôle précis</th>
                <th className="p-3.5 border border-slate-200">Exemple sous Windows / Antigravity</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">IDE</td>
                <td className="p-3.5 border border-slate-200">L&apos;environnement de développement global</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Google Antigravity</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Terminal</td>
                <td className="p-3.5 border border-slate-200">L&apos;interface visuelle d&apos;entrée/sortie textuelle</td>
                <td className="p-3.5 border border-slate-200">Le volet inférieur de l&apos;IDE</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Shell</td>
                <td className="p-3.5 border border-slate-200">L&apos;interpréteur de commandes du système</td>
                <td className="p-3.5 border border-slate-200">PowerShell (ou bash sous Linux/macOS)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Commande</td>
                <td className="p-3.5 border border-slate-200">L&apos;instruction textuelle exécutée</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">npm run build</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Le répertoire de travail */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. L&apos;importance cruciale du répertoire de travail (cwd)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le répertoire de travail (<em>Current Working Directory</em> ou <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs text-indigo-700">cwd</code>) désigne le dossier physique dans lequel le terminal se situe lorsqu&apos;il exécute une instruction.
        </p>
        <Callout type="danger">
          <strong>L&apos;erreur classique :</strong> Si le terminal se trouve dans <code className="font-mono">D:\cours\react</code> au lieu de <code className="font-mono">D:\cours\react\mon-projet</code>, la commande <code className="font-mono">npm run dev</code> échouera lamentablement avec le message <em>« Missing script: dev »</em> parce que le fichier <code className="font-mono">package.json</code> est absent du dossier courant.
        </Callout>
      </section>

      {/* 3. Commandes clés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Commandes clés dans un projet Node.js &amp; React
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="font-mono text-indigo-700 font-bold text-sm">pwd</div>
            <p className="text-xs text-slate-700">Affiche le chemin absolu du répertoire de travail courant (Windows PowerShell et Linux/macOS).</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="font-mono text-indigo-700 font-bold text-sm">npm install</div>
            <p className="text-xs text-slate-700">Télécharge et installe les modules déclarés dans package.json.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="font-mono text-indigo-700 font-bold text-sm">npm run build</div>
            <p className="text-xs text-slate-700">Compile et transpile le projet React en bundle de production dans le dossier dist/.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="font-mono text-indigo-700 font-bold text-sm">npm run lint</div>
            <p className="text-xs text-slate-700">Déclenche l&apos;analyseur statique ESLint pour valider la qualité du code.</p>
          </div>
        </div>
      </section>

      {/* 4. Encadrement du terminal dans un prompt */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Prompt de cadrage strict pour l&apos;usage du terminal
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`[REGLES_D_UTILISATION_DU_TERMINAL]
Avant toute utilisation du terminal :
1. Vérifie ton répertoire de travail (cwd) pour être certain d'être à la racine du projet.
2. Explique pourquoi la commande est strictement indispensable.
3. Présente la commande exacte et son impact prévisible.
4. N'exécute AUCUNE commande destructive sans confirmation expresse de ma part.
5. Ne consulte et n'affiche jamais les secrets du fichier .env.
6. MODE PAR DÉFAUT : Prépare les commandes textuellement sans les lancer.
7. Attends mon accord formel avant toute exécution.`}</pre>
        </div>
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.7)
        </h2>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 4.7 — Audit et autorisation chirurgicale</span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Dans Google Antigravity, demandez :<br />
            <em>« Explique quelles commandes seraient utiles pour analyser et compiler mon projet React. Présente les commandes et leurs risques, mais n&apos;en lance aucune. »</em>
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800">
            Une fois l&apos;explication validée, autorisez <strong>uniquement</strong> la commande <code className="bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">pwd</code>. Observez que l&apos;agent n&apos;exécute que cette commande et aucune autre.
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Utilisation du terminal
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 7"
          questions={[
            {
              id: 1,
              question: "Quel composant interprète réellement les instructions saisies dans le terminal ?",
              options: [
                "Le fichier package.json.",
                "Le Shell (ex: PowerShell ou Bash).",
                "L'écran de l'ordinateur.",
                "Le navigateur web."
              ],
              correctIndex: 1,
              explanation: "Le shell est le programme sous-jacent qui interprète la syntaxe des commandes et les transmet au système d'exploitation."
            },
            {
              id: 2,
              question: "Une instruction dans un prompt interdisant les suppressions constitue-t-elle à elle seule une barrière technique infranchissable ?",
              options: [
                "Oui, l'IA est toujours infaillible.",
                "Non, des contrôles techniques et des permissions d'exécution de l'IDE restent impératifs pour garantir la sécurité.",
                "Oui, mais uniquement sous Windows.",
                "Non, car le prompt efface automatiquement le disque dur."
              ],
              correctIndex: 1,
              explanation: "Une instruction est une consigne comportementale. La vraie sécurité technique repose sur les permissions matérielles et logicielles du bac à sable (sandbox)."
            }
          ]}
        />
      </section>
    </div>
  );
};

