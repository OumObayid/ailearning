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
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 7 — Utilisation du terminal
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Démystifier le terminal, comprendre le répertoire de travail (cwd) et encadrer les commandes de l&apos;agent pour une sécurité sans faille.
        </p>
      </div>

      {/* 1. Analogie Terminal, Shell et IDE */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;analogie du véhicule : Distinguer IDE, Terminal, Shell et Commande</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Les débutants mélangent souvent les mots <em className="text-indigo-900">terminal</em>, <em className="text-indigo-900">console</em>, <em className="text-indigo-900">shell</em> et <em className="text-indigo-900">invite de commande</em>. Pour ne plus jamais hésiter, voici l&apos;analogie du véhicule :
        </p>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border border-slate-200 w-1/4">Terme</th>
                <th className="p-3.5 border border-slate-200 text-indigo-900">Analogie automobile</th>
                <th className="p-3.5 border border-slate-200">Rôle réel dans votre projet</th>
                <th className="p-3.5 border border-slate-200">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">1. L&apos;IDE</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">La voiture tout entière</td>
                <td className="p-3.5 border border-slate-200">L&apos;environnement complet qui rassemble vos fichiers, l&apos;agent et le terminal</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Google Antigravity</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">2. Le Terminal</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Le tableau de bord avec les cadrans</td>
                <td className="p-3.5 border border-slate-200">La fenêtre noire ou volet inférieur qui affiche le texte et les messages</td>
                <td className="p-3.5 border border-slate-200">Le panneau du bas dans l&apos;IDE</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">3. Le Shell</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Le moteur sous le capot</td>
                <td className="p-3.5 border border-slate-200">Le programme système qui comprend la syntaxe et exécute les ordres</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs text-indigo-900">PowerShell (Windows) ou Bash (Mac/Linux)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">4. La Commande</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">L&apos;action d&apos;appuyer sur l&apos;accélérateur</td>
                <td className="p-3.5 border border-slate-200">L&apos;instruction textuelle tapée et envoyée au shell</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs text-emerald-800 font-bold">npm run build</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">1. IDE (Google Antigravity)</span>
            <p className="text-xs text-slate-700">L&apos;environnement complet (la voiture) qui réunit l&apos;éditeur, l&apos;agent et la console.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">2. Le Terminal</span>
            <p className="text-xs text-slate-700">La fenêtre d&apos;affichage texte (le tableau de bord) pour lire les logs.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">3. Le Shell (PowerShell / Bash)</span>
            <p className="text-xs text-slate-700">L&apos;interpréteur système (le moteur) qui exécute techniquement chaque mot-clé.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase">4. La Commande (npm run build)</span>
            <p className="text-xs text-slate-700">L&apos;instruction textuelle transmise pour lancer la compilation ou les tests.</p>
          </div>
        </div>
      </section>

      {/* 2. Le répertoire de travail (cwd) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Le piège numéro 1 : Le Répertoire de Travail (cwd)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le répertoire courant (en anglais : <strong>Current Working Directory</strong> ou <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-700 font-bold">cwd</code>) est l&apos;adresse du dossier exact où le terminal se trouve lorsqu&apos;il exécute une commande.
        </p>

        <div className="p-5 bg-amber-50/70 border-2 border-amber-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-950 text-base">
            <span>📍</span>
            <span>L&apos;analogie de l&apos;adresse postale :</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Si vous cherchez votre paquet livré chez votre voisin au numéro 14 au lieu du numéro 12, vous ne le trouverez jamais. Dans le terminal, c&apos;est pareil :
          </p>
          <div className="p-3 bg-white rounded-xl border border-amber-200 font-mono text-xs space-y-1">
            <div className="text-rose-700 font-bold">❌ Mauvais cwd : D:\projets\</div>
            <div className="text-slate-600">Commande : npm run dev &rarr; Résultat : « Error: Missing script dev » (package.json introuvable ici !)</div>
            <div className="text-emerald-700 font-bold pt-1">✅ Bon cwd : D:\projets\mon-application\</div>
            <div className="text-slate-600">Commande : npm run dev &rarr; Résultat : « VITE v5 ready at http://localhost:5173 »</div>
          </div>
        </div>

        <Callout type="tip">
          <strong>Premier réflexe à exiger de l&apos;agent :</strong> Toujours vérifier son emplacement avec la commande <code className="font-mono">pwd</code> (Print Working Directory) avant de lancer le moindre script npm.
        </Callout>
      </section>

      {/* 3. Les commandes fondamentales Node & React */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 4 commandes indispensables à connaître
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">pwd</span>
              <span className="text-xs text-slate-500 font-semibold">Inspection</span>
            </div>
            <h4 className="font-bold text-slate-950 text-sm">Où suis-je ?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Affiche le chemin absolu du dossier courant. Fonctionne de manière identique sous Windows PowerShell et Linux/macOS.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">npm install</span>
              <span className="text-xs text-slate-500 font-semibold">Dépendances</span>
            </div>
            <h4 className="font-bold text-slate-950 text-sm">Télécharger les modules</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lit le fichier <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">package.json</code> et télécharge toutes les bibliothèques requises dans <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">node_modules/</code>.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">npm run build</span>
              <span className="text-xs text-slate-500 font-semibold">Compilation</span>
            </div>
            <h4 className="font-bold text-slate-950 text-sm">Le juge de paix</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compile tout le code TypeScript/React. S&apos;il y a la moindre faute de typage ou un import cassé, cette commande échoue immédiatement avec l&apos;explication exacte.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">git status</span>
              <span className="text-xs text-slate-500 font-semibold">Contrôle</span>
            </div>
            <h4 className="font-bold text-slate-950 text-sm">Le contrôle qualité</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vérifie en un coup d&apos;œil tous les fichiers modifiés par l&apos;agent avant de committer.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Encadrement strict du terminal (Sans scrollbar) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Prompt de cadrage : Interdire les commandes sauvages
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Ne laissez jamais un agent exécuter des commandes dans le terminal sans lui fixer des règles de sécurité explicites. Voici le prompt de garde-fou à lui transmettre :
        </p>

        {/* Bloc structuré sans scrollbar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 shadow-xl space-y-3 break-words min-w-0 max-w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-indigo-400">[RÈGLES D&apos;USAGE DU TERMINAL]</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">À copier dans Antigravity</span>
          </div>

          <div className="space-y-2 text-slate-300 leading-relaxed">
            <div>1. Vérifie obligatoirement ton répertoire de travail (cwd) avec &quot;pwd&quot; avant toute autre commande.</div>
            <div>2. Explique en français pourquoi la commande est nécessaire avant de la proposer.</div>
            <div>3. N&apos;exécute AUCUNE commande destructive (rm -rf, git reset --hard, drop database) sans ma permission formelle.</div>
            <div>4. Ne consulte et n&apos;affiche JAMAIS le contenu des fichiers .env dans le chat.</div>
            <div>5. MODE DE TRAVAIL : Prépare la commande sous forme textuelle et attends mon clic de confirmation avant de lancer l&apos;exécution.</div>
          </div>
        </div>
      </section>

      {/* 5. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.7) : L&apos;autorisation chirurgicale
        </h2>
        <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">TP 4.7 — Audit avant action</span>
          <h4 className="font-extrabold text-slate-950 text-base">Exercice de retenue pour l&apos;agent</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Demandez à Google Antigravity :
          </p>
          <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs break-words border border-slate-800 min-w-0 max-w-full">
            « Quelles commandes seraient utiles pour vérifier que mon projet compile correctement ? Présente la commande exacte et ses conséquences, mais NE LANCE RIEN pour le moment. »
          </div>
          <p className="text-xs text-slate-600 italic">
            → Une fois qu&apos;il vous a proposé la commande <code className="bg-slate-100 px-1 rounded font-mono text-xs">npm run build</code>, répondez simplement : <em>« D&apos;accord, tu as l&apos;autorisation d&apos;exécuter uniquement cette commande. »</em> Constatez le respect scrupuleux de votre consigne.
          </p>
        </div>
      </section>

      {/* 6. Quiz d'évaluation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vos acquis sur le Terminal
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 7 (Utilisation du terminal)"
          questions={[
            {
              id: 1,
              question: "Que désigne le terme technique 'cwd' (Current Working Directory) ?",
              options: [
                "Le nom de la marque de l'ordinateur.",
                "L'emplacement (chemin de dossier) où le terminal se trouve actuellement pour exécuter les commandes.",
                "Le mot de passe secret de la session Windows.",
                "La vitesse de téléchargement de la connexion Internet."
              ],
              correctIndex: 1,
              explanation: "Le cwd est le répertoire de travail courant ; si la commande npm run dev est lancée dans le mauvais dossier, elle échouera car package.json y sera introuvable."
            },
            {
              id: 2,
              question: "Quel rôle joue le Shell (ex: PowerShell ou Bash) par rapport au Terminal visuel ?",
              options: [
                "C'est la même chose, aucune différence.",
                "Le Shell est le moteur d'interprétation qui analyse la syntaxe et donne les ordres au système d'exploitation, tandis que le terminal est la fenêtre d'affichage.",
                "Le Shell sert uniquement à regarder des vidéos.",
                "Le Shell est une marque de disques durs."
              ],
              correctIndex: 1,
              explanation: "Le terminal est l'interface graphique d'entrée/sortie, tandis que le shell est le programme sous-jacent qui comprend et exécute les commandes textuelles."
            },
            {
              id: 3,
              question: "Suffit-il d'écrire dans un prompt « N'efface rien » pour être protégé à 100 % contre les erreurs d'un agent ?",
              options: [
                "Oui, car les IA respectent toujours les règles à la lettre sans jamais se tromper.",
                "Non, il faut impérativement associer les consignes de prompt aux barrières techniques et au système de permissions de l'IDE qui intercepte chaque commande sensible.",
                "Oui, mais uniquement si on écrit en lettres majuscules.",
                "Non, car le terminal ignore les instructions écrites en français."
              ],
              correctIndex: 1,
              explanation: "Un prompt est une consigne de guidage mais ne constitue pas une barrière infaillible. Seul le système d'autorisations technique de l'IDE assure une sécurité inviolable."
            }
          ]}
        />
      </section>
    </div>
  );
};
