'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Collaboration et communication entre agents IA
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 3 piliers de la collaboration multi-agents
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Avoir six agents spécialisés ne sert à rien si chacun travaille en vase clos sans synchronisation. La collaboration multi-agents (<em>Multi-Agent Collaboration</em>) exige trois mécanismes fondamentaux :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="chat-bubble-left-right" className="w-5 h-5" />
              <span>1. La Communication</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              La capacité de transmettre le contexte pertinent d&apos;un agent à l&apos;autre sans déperdition d&apos;informations ni bruit parasite.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="document-duplicate" className="w-5 h-5" />
              <span>2. La Transmission (Handoff)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              La production de livrables formels et exploitables (spécifications, diffs, matrices de tests, rapports d&apos;audit).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="arrows-pointing-in" className="w-5 h-5" />
              <span>3. La Coordination</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              L&apos;ordonnancement des passages de relais, la gestion des dépendances et les validations humaines indispensables.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 3 modèles de collaboration */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 3 grands modèles de collaboration
        </h2>
        <div className="space-y-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-extrabold text-slate-950 text-base">Modèle 1 : Collaboration Séquentielle (Pipeline)</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Les agents interviennent l&apos;un après l&apos;autre : <em>Architecte → Développeur → Auditeur/Sécurité → Testeur → Documentaliste</em>. Chaque étape attend la validation formelle de la précédente. Idéal pour les chantiers neufs.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-extrabold text-slate-950 text-base">Modèle 2 : Collaboration Parallèle (Fan-Out / Fan-In)</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Une fois le code produit par le développeur, l&apos;auditeur technique et le spécialiste sécurité examinent simultanément le même commit sous deux prismes différents. Réduit considérablement la latence de revue de code.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-extrabold text-indigo-950 text-base">Modèle 3 : Collaboration Coordonnée par Orchestrateur</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Un agent coordinateur centralisé reçoit les requêtes de l&apos;utilisateur, décompose la mission, distribue les ordres aux agents spécialisés, centralise leurs rapports et sollicite les arbitrages humains aux points de contrôle.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Fiche de transmission de contexte */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Le contrat de transmission (Context Handoff)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Pour éviter l&apos;effet « téléphone arabe » ou l&apos;oubli de contraintes entre deux étapes, chaque passage de relais doit employer une <strong>fiche de transmission normée</strong> :
        </p>

        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`FICHE DE TRANSMISSION DE CONTEXTE (CONTEXT HANDOFF)
==================================================
ÉMETTEUR      : Agent Architecte
DESTINATAIRE  : Agent Développeur
OBJECTIF      : Implémenter la recherche textuelle dans le portfolio React.

DÉCISIONS D'ARCHITECTURE VALIDÉES :
1. Composant dédié : src/components/SearchBar.jsx
2. Filtrage en mémoire côté client sur le state des projets.
3. Insensibilité stricte à la casse (majuscules/minuscules).
4. Affichage d'un composant EmptyState si 0 résultat.

CONTRAINTES IMPÉRATIVES :
- Ne pas modifier le composant parent App.jsx en dehors de l'insertion de SearchBar.
- Zéro installation de dépendance externe (utiliser les hooks React natifs).
- Ne pas toucher aux fichiers de styles globaux.

LIVRABLE EXIGÉ EN RETOUR :
Code de SearchBar.jsx et Diff unifié des modifications.`}</pre>
        </div>
      </section>

      {/* 4. Gestion des anomalies */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Résolution des incidents de collaboration
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Incident rencontré</th>
                <th className="p-3 border border-slate-200">Conséquence sur le projet</th>
                <th className="p-3 border border-slate-200">Parade méthodologique</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-rose-700">Conflit d&apos;édition simultanée</td>
                <td className="p-3 border border-slate-200">Deux agents écrivent dans le même fichier en même temps.</td>
                <td className="p-3 border border-slate-200">Un seul agent autorisé en écriture (Développeur) ; les auditeurs restent en lecture seule.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-amber-700">Divergence d&apos;appréciation</td>
                <td className="p-3 border border-slate-200">L&apos;auditeur veut refactorer, la sécurité juge le code critique.</td>
                <td className="p-3 border border-slate-200">Arbitrage humain obligatoire soumis à l&apos;utilisateur avec arguments chiffrés.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-indigo-700">Test sur version obsolète</td>
                <td className="p-3 border border-slate-200">Le testeur valide un commit antérieur à une correction.</td>
                <td className="p-3 border border-slate-200">Numérotation systématique des versions de livrables dans la fiche de transmission.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Collaboration multi-agents
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 4"
          questions={[
            {
              id: 1,
              question: "Quel est l'intérêt principal d'une fiche de transmission de contexte (Context Handoff) entre deux agents ?",
              options: [
                "Ralentir le développement pour économiser de la mémoire.",
                "Garantir que le développeur reçoit l'ensemble des contraintes et spécifications validées sans devoir réanalyser tout le projet à l'aveugle.",
                "Supprimer automatiquement les fichiers temporaires.",
                "Convertir le code TypeScript en binaire."
              ],
              correctIndex: 1,
              explanation: "Le Handoff formalise le passage de témoin : il élimine les ambiguïtés et verrouille le périmètre d'intervention de l'étape suivante."
            },
            {
              id: 2,
              question: "Quand doit-on privilégier une collaboration parallèle entre l'auditeur et l'agent sécurité ?",
              options: [
                "Lorsque le code a été figé par le développeur et doit subir des revues d'expertise indépendantes sans dépendance mutuelle.",
                "Lorsque le projet n'a pas encore de code source.",
                "Uniquement si l'ordinateur possède deux écrans.",
                "Quand on souhaite que les deux modifient le fichier en même temps."
              ],
              correctIndex: 0,
              explanation: "Dès lors que le code est stable, lancer les revues qualité et sécurité en parallèle fait gagner un temps précieux tout en évitant les conflits d'écriture."
            }
          ]}
        />
      </section>
    </div>
  );
};

