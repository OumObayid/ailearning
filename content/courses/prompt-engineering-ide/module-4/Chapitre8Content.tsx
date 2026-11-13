'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 8 — Exécution des commandes par un agent IA
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Comprendre comment l&apos;agent interprète les retours de commandes (stdout, stderr, exit code) et diagnostique méthodiquement les pannes.
        </p>
      </div>

      {/* 1. stdout, stderr et Exit Code */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="command-line" className="w-5 h-5 text-indigo-600" />
          <span>1. Les 3 flux d&apos;information vitaux d&apos;une commande exécutée</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Lorsqu&apos;un agent lance une commande comme <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-700 font-bold">npm run build</code>, il ne se fie pas à son intuition : il écoute 3 canaux de retour formels renvoyés par votre système d&apos;exploitation :
        </p>

        <div className="grid gap-4 pt-1 grid-cols-1 sm:grid-cols-2">
          {/* stdout */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Canal 1</span>
                <span className="text-xl">📄</span>
              </div>
              <h3 className="font-extrabold text-slate-950 text-base">stdout (Sortie Standard)</h3>
              <div className="text-xs font-semibold text-indigo-600 mb-1">Le reçu de caisse normal</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Le flux textuel habituel : liste des fichiers générés, durée de compilation, URL locale du serveur. C&apos;est le journal de bord du bon fonctionnement.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
              Ex : &quot;✓ built in 420ms&quot;
            </div>
          </div>

          {/* stderr */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">Canal 2</span>
                <span className="text-xl">⚠️</span>
              </div>
              <h3 className="font-extrabold text-slate-950 text-base">stderr (Sortie d&apos;Erreur)</h3>
              <div className="text-xs font-semibold text-rose-600 mb-1">Le voyant orange ou rouge</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Le flux dédié aux alertes, avertissements (warnings) et messages d&apos;échec. <em>Attention :</em> certains outils y écrivent de simples alertes informatives sans que la commande n&apos;ait échoué !
              </p>
            </div>
            <div className="text-[11px] font-mono text-rose-800 bg-rose-50 p-2 rounded-lg border border-rose-200">
              Ex : &quot;Cannot find module &apos;zod&apos;&quot;
            </div>
          </div>

          {/* exit code */}
          <div className="p-5 bg-white border-2 border-emerald-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">Canal 3</span>
                <span className="text-xl">🚦</span>
              </div>
              <h3 className="font-extrabold text-slate-950 text-base">Exit Code (Code de retour)</h3>
              <div className="text-xs font-semibold text-emerald-700 mb-1">Le feu tricolore numérique</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Le chiffre final officiel renvoyé par le système :
                <br />
                • <strong className="text-emerald-700">Code 0</strong> = Feu Vert (Succès absolu).
                <br />
                • <strong className="text-rose-700">Code &gt; 0</strong> (1, 127, etc.) = Feu Rouge (Échec d&apos;exécution).
              </p>
            </div>
            <div className="text-[11px] font-mono text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
              Le seul verdict juridique du système.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Commandes ponctuelles vs Daemons */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Commandes ponctuelles vs Processus persistants (Daemons)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Pour un agent, toutes les commandes ne se comportent pas de la même manière dans le temps :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Type A</span>
            <h4 className="font-extrabold text-slate-950 text-base">Commande ponctuelle (Synchrone)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Exemples : <code className="bg-slate-100 px-1 rounded font-mono text-xs">npm run build</code>, <code className="bg-slate-100 px-1 rounded font-mono text-xs">git status</code>, <code className="bg-slate-100 px-1 rounded font-mono text-xs">npm test</code>.
            </p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Le programme démarre, exécute sa tâche en quelques secondes, renvoie son Exit Code (0 ou 1) et s&apos;arrête. L&apos;agent attend sagement la fin et lit le compte rendu complet.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-amber-200 rounded-2xl space-y-2 shadow-sm">
            <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">Type B</span>
            <h4 className="font-extrabold text-slate-950 text-base">Processus persistant (Daemon / Arrière-plan)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Exemples : <code className="bg-slate-100 px-1 rounded font-mono text-xs">npm run dev</code>, <code className="bg-slate-100 px-1 rounded font-mono text-xs">next dev</code>.
            </p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Le serveur web démarre et <strong>ne s&apos;arrête jamais</strong> : il reste éveillé pour servir vos pages aux utilisateurs. Si l&apos;agent attendait la fin de la commande, il resterait bloqué indéfiniment ! L&apos;IDE doit donc lancer ce processus en arrière-plan.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Diagnostic méthodique des erreurs courantes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Guide de diagnostic méthodique face aux 3 pannes les plus courantes
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border border-slate-200 w-1/3">Message d&apos;erreur rencontré</th>
                <th className="p-3.5 border border-slate-200">Cause profonde réelle</th>
                <th className="p-3.5 border border-slate-200 text-indigo-900">Réflexe méthodique de l&apos;agent</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-mono text-xs font-bold text-rose-700">Missing script: &quot;build&quot;</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Le terminal est dans le mauvais dossier (mauvais cwd) ou la clé n&apos;existe pas dans package.json.</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Exécuter <code className="font-mono text-xs">pwd</code> pour vérifier son emplacement avant de relancer.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-mono text-xs font-bold text-rose-700">Cannot find module &apos;express&apos;</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">La bibliothèque n&apos;a pas été téléchargée dans <code className="font-mono text-xs">node_modules/</code>.</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Demander l&apos;autorisation d&apos;exécuter <code className="font-mono text-xs">npm install express</code>.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-mono text-xs font-bold text-rose-700">listen EADDRINUSE: :::3000</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Le port réseau 3000 est déjà squatté par un autre serveur qui tourne en arrière-plan.</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Changer le port (ex: 3001) ou fermer l&apos;ancien processus en double.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-3.5 bg-white border border-rose-200 rounded-xl space-y-1">
            <span className="font-mono text-xs font-bold text-rose-700">Missing script: &quot;build&quot;</span>
            <p className="text-xs text-slate-700"><strong>Cause :</strong> Mauvais dossier de travail (cwd) ou script absent.</p>
            <p className="text-xs text-indigo-900 font-semibold"><strong>Solution :</strong> Vérifier son dossier avec <code className="font-mono text-xs">pwd</code>.</p>
          </div>
          <div className="p-3.5 bg-white border border-rose-200 rounded-xl space-y-1">
            <span className="font-mono text-xs font-bold text-rose-700">Cannot find module &apos;...&apos;</span>
            <p className="text-xs text-slate-700"><strong>Cause :</strong> Bibliothèque non installée dans node_modules.</p>
            <p className="text-xs text-indigo-900 font-semibold"><strong>Solution :</strong> Lancer <code className="font-mono text-xs">npm install &lt;paquet&gt;</code>.</p>
          </div>
          <div className="p-3.5 bg-white border border-rose-200 rounded-xl space-y-1">
            <span className="font-mono text-xs font-bold text-rose-700">listen EADDRINUSE: :::3000</span>
            <p className="text-xs text-slate-700"><strong>Cause :</strong> Le port 3000 est déjà occupé par un autre serveur.</p>
            <p className="text-xs text-indigo-900 font-semibold"><strong>Solution :</strong> Choisir le port 3001 ou fermer l&apos;ancien terminal.</p>
          </div>
        </div>
      </section>

      {/* 4. Idempotence : Le danger des relances aveugles */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Idempotence : Pourquoi il ne faut pas relancer une commande à l&apos;aveugle
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le mot <strong>idempotence</strong> peut sembler barbare aux débutants. Voici pourtant l&apos;analogie la plus simple pour le retenir :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">✅ Commande Idempotente</span>
            <h4 className="font-extrabold text-slate-950 text-base">L&apos;interrupteur de lumière</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Si la lumière est allumée et que vous rappuyez sur « Allumer », elle reste allumée. Vous pouvez relancer la commande 10 fois sans aucun risque d&apos;effet de bord (ex: <code className="bg-slate-100 px-1 rounded font-mono text-xs">npm run build</code>, <code className="bg-slate-100 px-1 rounded font-mono text-xs">git status</code>).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-rose-200 rounded-2xl space-y-2 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">❌ Commande Non-Idempotente</span>
            <h4 className="font-extrabold text-slate-950 text-base">Le bouton « Débiter 50 € »</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Si la connexion Internet hésite et que vous appuyez 3 fois d&apos;affilée par énervement, vous serez débité de 150 € ! En programmation, relancer brutalement une création de table ou une insertion de données crée des doublons corrompus.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.8) : Valider un build
        </h2>
        <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">TP 4.8 — Le juge de paix de la compilation</span>
          <h4 className="font-extrabold text-slate-950 text-base">Faire exécuter et analyser un build</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Dans Google Antigravity, demandez :
          </p>
          <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs break-words border border-slate-800 min-w-0 max-w-full">
            « Exécute la commande &quot;npm run build&quot; pour vérifier la compilation de notre projet. Vérifie l&apos;Exit Code renvoyé et explique-moi en français si le build est un succès total ou s&apos;il y a des erreurs dans stdout ou stderr. »
          </div>
          <p className="text-xs text-slate-600 italic">
            → Constatez que l&apos;agent vérifie l&apos;Exit Code 0 avant de vous féliciter.
          </p>
        </div>
      </section>

      {/* 6. Quiz d'évaluation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vos acquis sur l&apos;Exécution
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 8 (Exécution des commandes)"
          questions={[
            {
              id: 1,
              question: "Quel Exit Code garantit de manière universelle que la commande s'est terminée avec un succès total ?",
              options: [
                "Code 404",
                "Code 0",
                "Code 1",
                "Code 500"
              ],
              correctIndex: 1,
              explanation: "Dans les conventions Unix et Windows, le code 0 est universellement réservé au succès. Toute valeur supérieure à 0 signale une erreur."
            },
            {
              id: 2,
              question: "Pourquoi une commande comme « npm run dev » ne doit-elle pas être exécutée de manière synchrone classique par l'agent ?",
              options: [
                "Parce qu'elle consomme trop d'électricité.",
                "Parce qu'il s'agit d'un processus persistant (daemon) qui reste éveillé en continu, ce qui bloquerait l'agent indéfiniment.",
                "Parce que npm refuse de démarrer si une IA est connectée.",
                "Parce que Vite ne fonctionne que le week-end."
              ],
              correctIndex: 1,
              explanation: "Un serveur de développement écoute en continu et ne rend jamais la main : il doit donc tourner en arrière-plan sans bloquer la conversation."
            },
            {
              id: 3,
              question: "Qu'est-ce qu'une opération « idempotente » en informatique ?",
              options: [
                "Une opération qui s'arrête dès qu'il y a du soleil.",
                "Une opération que l'on peut exécuter plusieurs fois de suite sans provoquer d'effets secondaires cumulatifs indésirables.",
                "Une commande réservée aux super-utilisateurs Linux.",
                "Une commande qui s'auto-détruit après 10 secondes."
              ],
              correctIndex: 1,
              explanation: "Une commande idempotente (comme un build ou une lecture) produit le même résultat quel que soit le nombre d'exécutions successives."
            }
          ]}
        />
      </section>
    </div>
  );
};
