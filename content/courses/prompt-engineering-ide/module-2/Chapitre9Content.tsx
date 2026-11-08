'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — Format des réponses et des rapports
        </h1>
      </div>

      {/* 1. Échelle de gravité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. L&apos;échelle de gravité standard des problèmes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Niveau</th>
                <th className="p-3.5 border border-slate-200">Signification technique</th>
                <th className="p-3.5 border border-slate-200">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-rose-700">Critique</td>
                <td className="p-3.5 border border-slate-200">Vulnérabilité majeure, fuite de données ou arrêt de service</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">Clé API Gemini exposée dans le bundle client</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-orange-600">Élevé</td>
                <td className="p-3.5 border border-slate-200">Dysfonctionnement sévère ou risque d&apos;injection SQL/XSS</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">Absence de validation Zod sur un paramètre POST</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-amber-600">Moyen</td>
                <td className="p-3.5 border border-slate-200">Incohérence technique ou exception non interceptée</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">Variables d&apos;environnement aux noms divergents</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-sky-600">Faible</td>
                <td className="p-3.5 border border-slate-200">Amélioration de lisibilité ou dette technique mineure</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">Imports inutilisés ou typage imprécis</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-600">Informatif</td>
                <td className="p-3.5 border border-slate-200">Observation d&apos;architecture sans risque direct</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">Proposition d&apos;utiliser un cache Redis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Format d'un problème */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Structure d&apos;une fiche problème standardisée
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 font-mono text-sm space-y-1.5 text-slate-900">
          <p><strong>[P01] Variable d&apos;environnement désynchronisée</strong> <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-sans font-bold">Moyen</span></p>
          <p><strong>Localisation :</strong> <code>src/services/gemini.js</code> (ligne 8)</p>
          <p><strong>Constat vérifié :</strong> Le code appelle <code>process.env.GEMINI_API_KEY</code>, or le template <code>.env.example</code> définit <code>API_KEY_GEMINI</code>.</p>
          <p><strong>Cause :</strong> Incohérence de nommage lors de l&apos;intégration du SDK.</p>
          <p><strong>Conséquence :</strong> Initialisation de l&apos;IA avec <code>undefined</code> et crash HTTP 500 à l&apos;exécution.</p>
          <p><strong>Recommandation :</strong> Uniformiser le nom en <code>GEMINI_API_KEY</code> dans l&apos;ensemble du dépôt.</p>
          <p><strong>Statut :</strong> Détecté • Correction non appliquée • Aucun test effectué.</p>
        </div>
      </section>

      {/* 3. Faits vs Hypothèses */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Séparer rigoureusement Faits, Hypothèses et Recommandations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Fait observé</span>
            <p className="text-xs text-slate-700">« Le serveur renvoie une erreur HTTP 500 sur /api/generate lors de l&apos;appel avec un body vide. » (Preuve directe)</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Hypothèse</span>
            <p className="text-xs text-slate-700">« Une exception non interceptée dans le parsing JSON de la requête pourrait causer ce crash. » (À vérifier)</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">Recommandation</span>
            <p className="text-xs text-slate-700">« Ajouter un middleware de validation Zod et un bloc try/catch global. » (Action future conseillée)</p>
          </div>
        </div>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz de restitution
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Qualification de faits"
            question="L'agent constate une erreur 500 sans avoir les logs d'erreurs du terminal. Que doit-il écrire ?"
            options={[
              '« La base de données MySQL est plantée avec certitude »',
              '« Le statut 500 est observé. L’origine exacte reste une hypothèse nécessitant la consultation des logs »',
            ]}
            correctIndex={1}
            explanation="Un agent d'ingénierie ne transforme jamais une supposition en certitude sans trace probante."
          />

          <QuickQuiz
            title="Question 2 — Compte rendu de modification"
            question="Quelles mentions sont indispensables après l'application autorisée d'un changement dans le projet ?"
            options={[
              'Un simple « OK terminé »',
              'La liste des fichiers modifiés, créés, supprimés, ainsi que les tests réellement exécutés',
            ]}
            correctIndex={1}
            explanation="La traçabilité des modifications exige de détailler l'impact exact sur chaque fichier et l'état des tests."
          />
        </div>
      </section>
    </div>
  );
};
