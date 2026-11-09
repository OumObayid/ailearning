'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Validation humaine avant les actions sensibles (HITL)
        </h1>
      </div>

      {/* 1. Le paradigme Human-in-the-Loop */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi l&apos;autonomie totale est une illusion dangereuse
        </h2>
        <p className="text-slate-700">
          Un agent IA dans un IDE possède la vitesse de frappe d&apos;une machine et la capacité d&apos;appeler directement des outils du système d&apos;exploitation. Sans supervision humaine explicite sur les opérations critiques, une simple hallucination de nom de variable ou une mauvaise interprétation d&apos;un chemin de dossier peut détruire des semaines de travail.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Autonomie Totale (Niveau 0)</h4>
            <p className="text-xs text-slate-600">
              L&apos;agent lit, écrit, efface et pousse sur Git sans jamais demander d&apos;accord. Risque maximal d&apos;accident irréversible.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Supervision Passive (Niveau 1)</h4>
            <p className="text-xs text-slate-600">
              L&apos;agent agit et envoie un résumé a posteriori. Trop tard en cas de suppression ou de fuite de secret.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-emerald-400 rounded-xl space-y-2 shadow-sm bg-emerald-50/20">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h4 className="font-bold text-emerald-950 text-sm">HITL Contrôlé (Recommandé)</h4>
            <p className="text-xs text-slate-700">
              L&apos;agent analyse, conçoit le diff ou la commande, présente l&apos;impact et <strong>attend le clic ou le feu vert explicite</strong> avant exécution.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 4 phases d'une action contrôlée */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 phases obligatoires d&apos;une action contrôlée
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">PHASE 1</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Évaluation du périmètre d&apos;impact</h4>
              <p className="text-xs text-slate-600">L&apos;agent identifie les fichiers cibles, les dépendances impactées et le type d&apos;opération (création, écrasement, suppression).</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">PHASE 2</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Formulation de la proposition (Diff &amp; Commande)</h4>
              <p className="text-xs text-slate-600">L&apos;agent prépare le changement sous forme visuelle intelligible : diff unifié clair ou ligne de commande complète exacte avec arguments.</p>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-rose-300 rounded-xl flex items-start gap-3 shadow-sm bg-rose-50/20">
            <span className="font-mono font-bold text-xs bg-rose-100 text-rose-800 px-2 py-1 rounded">PHASE 3</span>
            <div>
              <h4 className="font-bold text-rose-950 text-sm">Arrêt &amp; Demande explicite de validation</h4>
              <p className="text-xs text-slate-700">L&apos;agent suspend son exécution. Il expose les conséquences possibles (ex: &quot;Attention : cette migration modifie la table users&quot;) et pose la question binaire.</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">PHASE 4</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Exécution et confirmation post-action</h4>
              <p className="text-xs text-slate-600">Seulement après réception de la confirmation, l&apos;action est exécutée, le code retour est vérifié et un compte-rendu d&apos;audit est produit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bloc de consignes HITL */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Bloc de consignes HITL pour prompt système
        </h2>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-2">
          <div className="text-rose-400 font-bold border-b border-slate-800 pb-1">
            # DIRECTIVE SYSTÈME DE GOUVERNANCE HUMAN-IN-THE-LOOP (HITL)
          </div>
          <p className="text-slate-300">
            &lt;human_validation_protocol&gt;
          </p>
          <p className="pl-4 text-emerald-400">
            1. ACTIONS SOUMISES À ACCORD PRÉALABLE OBLIGATOIRE :
          </p>
          <p className="pl-8 text-slate-300">
            - Écriture ou écrasement de tout fichier existant (hors proposition de diff).
          </p>
          <p className="pl-8 text-slate-300">
            - Suppression de fichiers ou de répertoires.
          </p>
          <p className="pl-8 text-slate-300">
            - Commandes shell d&apos;installation de paquets (npm install, pip install).
          </p>
          <p className="pl-8 text-slate-300">
            - Commandes Git modifiant l&apos;historique (commit, push, rebase, checkout -f).
          </p>
          <p className="pl-8 text-slate-300">
            - Opérations de migration de base de données.
          </p>
          <p className="pl-4 text-rose-300">
            2. PROTOCOLE D&apos;ATTENTE :
          </p>
          <p className="pl-8 text-slate-300">
            Lorsque l&apos;une de ces actions est requise, TU DOIS t&apos;arrêter, détailler l&apos;action et demander :
          </p>
          <p className="pl-8 text-amber-300">
            &quot;Souhaitez-vous que j&apos;exécute cette modification ? (Oui / Non / Modifier)&quot;
          </p>
          <p className="pl-8 text-rose-400">
            IL EST STRICTEMENT INTERDIT d&apos;enchaîner l&apos;action dans la même réponse sans attendre le message de confirmation de l&apos;utilisateur.
          </p>
          <p className="text-slate-300">
            &lt;/human_validation_protocol&gt;
          </p>
        </div>

        <Callout type="note" title="Pas d'élargissement tacite">
          Si un utilisateur valide la commande <code>npm install zod</code>, cela ne donne pas le droit à l&apos;agent d&apos;exécuter ensuite <code>npm run build</code> ou <code>git commit</code> sans une nouvelle approbation distincte.
        </Callout>
      </section>

      {/* 4. TP Pratique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Exercice pratique : Formulation d&apos;un point d&apos;arrêt
        </h2>
        <p className="text-slate-700 text-sm">
          L&apos;agent doit refactoriser le modèle de base de données Prisma pour renommer un champ. Comparez les deux approches :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-2">
            <span className="font-bold text-rose-800">Comportement Dangereux (Sans HITL)</span>
            <p className="text-slate-700">L&apos;agent modifie <code>schema.prisma</code>, exécute <code>npx prisma db push --force-reset</code> dans le terminal et efface toutes les données de développement sans demander confirmation.</p>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2">
            <span className="font-bold text-emerald-800">Comportement Maîtrisé (Avec HITL)</span>
            <p className="text-slate-700">L&apos;agent affiche le diff du schéma Prisma, prévient que le renommage nécessite une migration, présente la commande <code>npx prisma migrate dev --name rename_field</code> et demande : <em>&quot;Confirmez-vous l&apos;exécution de cette migration sur votre base locale ?&quot;</em></p>
          </div>
        </div>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Validation humaine
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il interdit à l'agent d'élargir implicitement une autorisation accordée pour une action précise ?",
              options: [
                "Parce que cela ralentit la vitesse d'inférence de l'IDE",
                "Parce qu'une permission pour une tâche bénigne pourrait être détournée pour effectuer une action destructrice non prévue",
                "Parce que Git refuserait d'enregistrer le commit",
                "Parce que les clés d'API expirent au bout de 5 minutes"
              ],
              correctIndex: 1,
              explanation: "Une autorisation n'est valable que pour l'action unitaire et délimitée qui a été approuvée ; tout élargissement tacite brise la gouvernance et le contrôle humain."
            },
            {
              id: 2,
              question: "Quelle phase du protocole HITL précède obligatoirement l'exécution d'une action à fort impact ?",
              options: [
                "La suspension d'exécution avec présentation du diff/de la commande et demande explicite d'accord",
                "L'exécution silencieuse puis l'envoi d'un e-mail",
                "Le redémarrage immédiat de l'IDE",
                "La compression de tout le projet en archive ZIP"
              ],
              correctIndex: 0,
              explanation: "L'agent doit impérativement marquer un point d'arrêt, exposer l'action envisagée et son impact, et attendre la confirmation explicite de l'opérateur humain."
            }
          ]}
        />
      </section>
    </div>
  );
};

