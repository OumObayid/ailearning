'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — Gérer les tâches longues et complexes
        </h1>
      </div>

      {/* 1. Les 8 défis d'une mission longue */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 8 écueils majeurs des tâches longues
        </h2>
        <p className="text-slate-700">
          Lorsqu&apos;une mission s&apos;étale sur plusieurs heures et dizaines d&apos;échanges, un agent IA sans méthode rigoureuse est exposé à des défaillances systémiques :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">1. Perte de contexte</span>
            <p className="text-slate-600">Oubli des contraintes de sécurité posées au premier échange.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">2. Répétition stérile</span>
            <p className="text-slate-600">L&apos;agent recommence des analyses déjà effectuées trois messages plus tôt.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">3. Dérive de mission</span>
            <p className="text-slate-600">Il entreprend de réécrire des fonctions périphériques non demandées.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">4. Bypass de validation</span>
            <p className="text-slate-600">Il enchaîne l&apos;écriture sans attendre l&apos;arbitrage de l&apos;utilisateur.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">5. Désordre logique</span>
            <p className="text-slate-600">Il commence à écrire du code avant d&apos;avoir validé l&apos;architecture.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">6. Absence de suivi</span>
            <p className="text-slate-600">Incapacité de dire ce qui est fait et ce qui reste à faire.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">7. Masquage d&apos;erreur</span>
            <p className="text-slate-600">Il poursuit son plan malgré l&apos;échec d&apos;un build ou d&apos;un test.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">8. Tâche infinie</span>
            <p className="text-slate-600">Boucle d&apos;analyse perpétuelle sans livrable final tranché.</p>
          </div>
        </div>
      </section>

      {/* 2. Task Decomposition & Points de contrôle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Décomposition en sous-tâches et Points de Contrôle (Checkpoints)
        </h2>
        <p className="text-slate-700">
          Chaque mission complexe doit être fractionnée en étapes linéaires dont chacune exige un statut d&apos;avancement strict :
        </p>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-slate-500">01</span>
              <div>
                <h4 className="font-bold text-slate-900">Compréhension &amp; Cadrage</h4>
                <p className="text-xs text-slate-500">Identifier le besoin exact et lister les informations nécessaires</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Terminée</span>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-slate-500">02</span>
              <div>
                <h4 className="font-bold text-slate-900">Analyse du code fourni</h4>
                <p className="text-xs text-slate-500">Inspecter les composants autorisés en lecture seule</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs">Terminée</span>
          </div>

          <div className="p-3 bg-white border-2 border-amber-300 rounded-xl flex items-center justify-between bg-amber-50/20">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-amber-700">03</span>
              <div>
                <h4 className="font-bold text-slate-950">Proposition de solution &amp; Diff</h4>
                <p className="text-xs text-slate-600">Préparer le diff en texte et l&apos;explication d&apos;impact</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded font-bold bg-amber-200 text-amber-900 text-xs">Point de contrôle (HITL)</span>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-slate-500">04</span>
              <div>
                <h4 className="font-bold text-slate-900">Application contrôlée &amp; Tests</h4>
                <p className="text-xs text-slate-500">Édition sur le disque après approbation formelle</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-600 text-xs">En attente</span>
          </div>
        </div>
      </section>

      {/* 3. Résumé intermédiaire d'état */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Le Résumé Intermédiaire d&apos;État (State Snapshot)
        </h2>
        <p className="text-slate-700">
          À chaque fin d&apos;étape clé ou avant toute interruption, l&apos;agent doit synthétiser sa progression selon ce format standardisé pour permettre une reprise instantanée sans amnésie :
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-1">
          <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
            # ÉTAT D&apos;AVANCEMENT DE LA MISSION (SNAPSHOT)
          </div>
          <pre>{`1. MISSION INITIALE : Intégration de la recherche plein texte sur les projets React
2. CONTRAINTES PERMANENTES : Aucune écriture sans accord, zéro modification de .env
3. FAITS CONFIRMÉS : Le tableau de données "projects" est statique dans projects.js
4. DÉCISIONS VALIDÉES : Filtrage côté client retenu par l'utilisateur
5. ÉTAPES TERMINÉES : Étape 1 (Cadrage), Étape 2 (Audit de Projects.jsx)
6. AUTORISATION EN ATTENTE : Accord pour appliquer le diff sur Projects.jsx
7. PROCHAINE ACTION UNIQUE : Attendre la validation de l'utilisateur`}</pre>
        </div>

        <Callout type="tip" title="Definition of Done (Critères d'achèvement)">
          Une mission n&apos;est jamais &quot;finie&quot; par intuition. Elle est terminée uniquement lorsque les 5 conditions de sortie (Definition of Done) sont réunies : code écrit validé, linting passé, rapport remis, absence d&apos;action pendante et validation utilisateur.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Tâches longues
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial qu'un agent génère un résumé intermédiaire structuré lors d'une tâche longue ?",
              options: [
                "Pour permettre de reprendre la session sans perte de contexte ni amnésie des contraintes après une interruption",
                "Pour supprimer automatiquement le code source existant",
                "Pour vider la mémoire vive de l'ordinateur",
                "Pour changer de modèle d'IA en cours de route"
              ],
              correctIndex: 0,
              explanation: "Le snapshot d'état conserve la trajectoire, les décisions validées et les contraintes de sécurité, immunisant l'agent contre la dilution de contexte."
            },
            {
              id: 2,
              question: "Que doit faire un agent lorsqu'une étape intermédiaire d'un plan complexe échoue (par exemple, un test en échec) ?",
              options: [
                "Masquer l'échec et passer directement aux étapes suivantes",
                "Arrêter immédiatement les actions dépendantes, expliquer le problème factuel et attendre l'arbitrage humain",
                "Effacer le disque dur",
                "Affirmer que le test est réussi pour ne pas inquiéter l'utilisateur"
              ],
              correctIndex: 1,
              explanation: "L'agent ne doit jamais progresser à l'aveugle après un échec : il suspend les opérations en aval et signale l'anomalie."
            }
          ]}
        />
      </section>
    </div>
  );
};

