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
          Chapitre 1 — Le principe du moindre privilège (PoLP)
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi limiter impérativement les pouvoirs d&apos;un agent IA ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un IDE comme Google Antigravity, un agent IA peut techniquement lire des fichiers, modifier le code source, exécuter des commandes shell, installer des paquets npm ou appeler des API externes. Mais capacité technique ne doit jamais rimer avec licence illimitée.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Si vous demandez à un agent : <em>« Analyse le fonctionnement de mon formulaire de connexion et identifie les bugs »</em>, a-t-il besoin de modifier le code ? De supprimer des fichiers ? De lire vos clés API privées dans <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">.env</code> ? <strong>Absolument pas.</strong> Ces opérations sont hors de propos pour un simple audit.
        </p>
        <Callout type="warning">
          <strong>Principe du moindre privilège (PoLP) :</strong> Un agent ne doit disposer à aucun moment de plus de privilèges ou d&apos;accès que le strict minimum vital requis par sa mission immédiate.
        </Callout>
      </section>

      {/* 2. L'échelle des 5 niveaux de privilèges */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. L&apos;échelle des 5 niveaux de privilèges
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700">NIVEAU 1 — PRIVILÈGE MINIMAL</span>
              <h4 className="font-bold text-slate-950 text-sm">Consultation (Lecture seule)</h4>
              <p className="text-xs text-slate-600">L&apos;agent peut uniquement lire les fichiers explicitement désignés et produire une analyse.</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">Faible risque</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-700">NIVEAU 2</span>
              <h4 className="font-bold text-slate-950 text-sm">Préparation &amp; Propositions textuelles</h4>
              <p className="text-xs text-slate-600">L&apos;agent prépare des plans de travail et propose du code dans le chat sans modifier le projet.</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-800 rounded">Zéro altération</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-amber-700">NIVEAU 3</span>
              <h4 className="font-bold text-slate-950 text-sm">Modification contrôlée de fichiers</h4>
              <p className="text-xs text-slate-600">L&apos;agent peut éditer certains fichiers bornés, uniquement après validation explicite du Diff.</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded">Validation requise</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-rose-700">NIVEAU 4</span>
              <h4 className="font-bold text-slate-950 text-sm">Exécution de commandes &amp; Tests</h4>
              <p className="text-xs text-slate-600">L&apos;agent peut déclencher des commandes validées dans le terminal (build, lint, test).</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-rose-100 text-rose-800 rounded">Surveillance active</span>
          </div>

          <div className="p-4 bg-white border border-rose-200 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono font-bold text-rose-700">NIVEAU 5 — PRIVILÈGE CRITIQUE</span>
              <h4 className="font-bold text-rose-950 text-sm">Administration &amp; Déploiement</h4>
              <p className="text-xs text-rose-800">Installation de paquets globaux, suppression récursive ou publication. Interdit par défaut.</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-rose-200 text-rose-900 rounded">Haut risque</span>
          </div>
        </div>
      </section>

      {/* 3. Mission vs Permission vs Autorisation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Triptyque fondamental : Mission vs Permission vs Autorisation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Notion</th>
                <th className="p-3.5 border border-slate-200">Définition exacte</th>
                <th className="p-3.5 border border-slate-200">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Mission</td>
                <td className="p-3.5 border border-slate-200">Ce que l&apos;agent doit accomplir selon l&apos;utilisateur</td>
                <td className="p-3.5 border border-slate-200">« Corriger le bug de calcul dans le panier »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-700">Permission</td>
                <td className="p-3.5 border border-slate-200">Ce que l&apos;environnement technique lui rend possible</td>
                <td className="p-3.5 border border-slate-200">Outil <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">replace_file_content</code> activé dans l&apos;IDE</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-amber-700">Autorisation</td>
                <td className="p-3.5 border border-slate-200">L&apos;accord ponctuel et explicite donné pour une action</td>
                <td className="p-3.5 border border-slate-200">« Oui, applique cette modification dans <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">Cart.jsx</code> uniquement »</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Prompt de cadrage PoLP */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Directive d&apos;instruction universelle du moindre privilège
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`[DIRECTIVE_SECURITE_MOINDRE_PRIVILEGE]
1. NIVEAU D'ACCÈS MINIMAL :
   Tu dois toujours utiliser le niveau de privilège le plus faible permettant d'accomplir la tâche.
   Si une mission peut être résolue par une simple consultation, tu ne demandes aucune écriture.

2. SANCTUARISATION DU PÉRIMÈTRE :
   - N'explore aucun dossier extérieur au projet assigné.
   - Ne lis jamais les fichiers .env, .env.local ou certificats privés.
   - N'affiche et ne copie jamais de secrets (clés d'API, jetons JWT, mots de passe).

3. DEMANDES D'ÉLÉVATION DE PRIVILÈGES :
   Si une opération requiert une permission supérieure (écriture ou terminal) :
   - Arrête-toi immédiatement.
   - Explique la nécessité technique et liste les fichiers concernés.
   - Attends l'autorisation explicite de l'utilisateur avant toute action.`}</pre>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Principe du moindre privilège
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 1"
          questions={[
            {
              id: 1,
              question: "Quelle est la définition exacte du Principe du Moindre Privilège (PoLP) pour un agent IA ?",
              options: [
                "L'agent doit faire le moins d'efforts possible pour répondre vite.",
                "Accorder à l'agent uniquement et strictement les permissions et ressources minimales indispensables à sa mission immédiate.",
                "Interdire systématiquement à l'agent de parler en français.",
                "Donner un accès administrateur à tous les sous-agents."
              ],
              correctIndex: 1,
              explanation: "Le PoLP garantit que même en cas de dérive ou d'erreur, l'agent ne dispose pas des droits techniques nécessaires pour causer des dégâts majeurs."
            },
            {
              id: 2,
              question: "Un agent qui dispose techniquement d'un outil d'édition de fichier est-il automatiquement autorisé à modifier n'importe quel fichier du projet ?",
              options: [
                "Oui, car la permission technique vaut autorisation implicite.",
                "Non, la capacité technique ne constitue jamais une autorisation : chaque modification nécessite un mandat ou un accord explicite.",
                "Oui, mais uniquement pour les fichiers JavaScript.",
                "Non, sauf s'il travaille la nuit."
              ],
              correctIndex: 1,
              explanation: "Il y a une différence capitale entre le pouvoir technique (permission) et le droit effectif d'agir (autorisation humaine)."
            }
          ]}
        />
      </section>
    </div>
  );
};

