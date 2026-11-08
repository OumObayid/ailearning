'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Exécution des commandes par un agent IA
        </h1>
      </div>

      {/* 1. stdout, stderr et Exit Code */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 3 flux d&apos;information d&apos;une commande exécutée
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="document-text" className="w-5 h-5" />
              <span>stdout (Sortie standard)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le flux textuel normal émis lors du bon déroulement : modules compilés, durée de transpilation, liens locaux du serveur.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
              <Icon name="exclamation-circle" className="w-5 h-5" />
              <span>stderr (Sortie d&apos;erreur)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Les messages de dysfonctionnement ou avertissements (warnings). <em>Attention :</em> certains outils écrivent des logs informatifs dans stderr sans que la commande ait échoué.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
              <Icon name="check-badge" className="w-5 h-5" />
              <span>Exit Code (Code de retour)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              La valeur numérique finale renvoyée au système : <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold text-emerald-700">0</code> signifie succès, toute valeur supérieure à 0 signale une erreur d&apos;exécution.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Processus ponctuels vs persistants */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Commandes ponctuelles vs Processus persistants (Daemons)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-bold text-slate-950 text-base mb-1">Commande ponctuelle (Synchrone)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Exemple : <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">npm run build</code>.<br />
              Le programme réalise son travail, retourne son Exit Code et s&apos;arrête immédiatement. L&apos;agent peut lire directement le résultat.
            </p>
          </div>
          <div className="p-5 bg-white border-2 border-amber-200 rounded-2xl shadow-sm">
            <h4 className="font-bold text-amber-950 text-base mb-1">Processus persistant (Asynchrone / Daemon)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Exemple : <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">npm run dev</code>.<br />
              Le serveur de développement reste actif en arrière-plan pour écouter les requêtes HTTP. L&apos;agent ne doit pas attendre indéfiniment qu&apos;il se termine.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Diagnostic des erreurs courantes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Démarche de diagnostic méthodique face à une erreur
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Message d&apos;erreur type</th>
                <th className="p-3 border border-slate-200">Cause profonde</th>
                <th className="p-3 border border-slate-200">Réaction attendue de l&apos;agent</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-rose-700">Missing script: &quot;build&quot;</td>
                <td className="p-3 border border-slate-200">Mauvais dossier de travail (cwd) ou script absent de package.json.</td>
                <td className="p-3 border border-slate-200">Vérifier <code className="font-mono">pwd</code> et inspecter la section <code className="font-mono">&quot;scripts&quot;</code> avant de retenter.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-rose-700">Cannot find module &apos;express&apos;</td>
                <td className="p-3 border border-slate-200">Dépendance non installée dans le <code className="font-mono">node_modules</code> local.</td>
                <td className="p-3 border border-slate-200">Demander l&apos;autorisation explicite d&apos;exécuter <code className="font-mono">npm install express</code>.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-rose-700">listen EADDRINUSE: :::3000</td>
                <td className="p-3 border border-slate-200">Le port 3000 est déjà occupé par un autre processus serveur.</td>
                <td className="p-3 border border-slate-200">Identifier le processus occupant ou configurer un port alternatif (ex: 3001).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Idempotence et relances */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Idempotence et dangers des relances aveugles (Retry)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une opération est dite <strong>idempotente</strong> si son exécution répétée produit exactement le même résultat sans effet secondaire cumulatif (ex: une commande de lecture ou de build).
        </p>
        <Callout type="danger">
          <strong>Non-idempotence des commandes de modification :</strong> Si une commande de création de données échoue à cause d&apos;un timeout réseau, la relancer brutalement risque d&apos;insérer des doublons en base ou de corrompre l&apos;état applicatif. L&apos;agent doit d&apos;abord inspecter l&apos;état réel avant de décider d&apos;une relance.
        </Callout>
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.8)
        </h2>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 4.8 — Autorisation et analyse du build</span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Dans Google Antigravity, vérifiez que le script build existe dans votre <code className="font-mono text-xs">package.json</code>, puis autorisez <strong>uniquement</strong> l&apos;exécution de :<br />
            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm font-bold text-indigo-700">npm run build</code>
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800">
            Examinez la restitution de l&apos;agent : vérifie-t-il l&apos;Exit Code ? Distingue-t-il une compilation technique réussie du bon fonctionnement fonctionnel de toutes les fonctionnalités de l&apos;application ?
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Exécution des commandes
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 8"
          questions={[
            {
              id: 1,
              question: "Que représente généralement un Exit Code égal à 0 après l'exécution d'une commande ?",
              options: [
                "Une erreur de syntaxe fatale.",
                "L'exécution s'est terminée avec succès sans erreur signalée par le système.",
                "Le terminal est planté.",
                "Le disque dur est saturé."
              ],
              correctIndex: 1,
              explanation: "Dans les conventions Unix et Windows, le code 0 est universellement réservé au succès de l'exécution."
            },
            {
              id: 2,
              question: "Pourquoi une compilation réussie (npm run build) ne garantit-elle pas qu'une application est exempte de bugs ?",
              options: [
                "Parce que npm ne vérifie que la syntaxe et le packaging technique, sans tester la logique métier ni le comportement utilisateur.",
                "Parce que Vite supprime automatiquement les composants après le build.",
                "Parce que les tests unitaires sont interdits lors du build.",
                "Parce que le navigateur ne lit jamais les fichiers du build."
              ],
              correctIndex: 0,
              explanation: "Le compilateur vérifie la validité syntaxique et assemble les modules, mais il ne peut pas deviner si votre algorithme répond fidèlement aux besoins fonctionnels."
            }
          ]}
        />
      </section>
    </div>
  );
};

