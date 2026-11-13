'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 3 — Définition du rôle et de l&apos;identité fonctionnelle
        </h1>
      </div>

      {/* 1. Ne pas confondre Rôle, Identité et Mission */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Rôle, Identité fonctionnelle et Mission
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Notion</th>
                <th className="p-3.5 border border-slate-200">Question résolue</th>
                <th className="p-3.5 border border-slate-200">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Rôle</td>
                <td className="p-3.5 border border-slate-200">Quelle fonction exerces-tu ?</td>
                <td className="p-3.5 border border-slate-200">« Développeur backend »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Identité fonctionnelle</td>
                <td className="p-3.5 border border-slate-200">Quelle spécialité et quelle posture as-tu ?</td>
                <td className="p-3.5 border border-slate-200">« Ingénieur backend spécialisé en API REST sécurisées et performance Node.js »</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Mission</td>
                <td className="p-3.5 border border-slate-200">Quel travail dois-tu accomplir ?</td>
                <td className="p-3.5 border border-slate-200">« Auditer les routes d&apos;inférence Gemini et vérifier les flux d&apos;erreurs »</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Les 6 composantes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les six composantes d&apos;une identité professionnelle
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">1. Métier / Fonction</span>
            <p className="text-xs text-slate-700">Développeur frontend, auditeur de sécurité, analyste documentaire.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">2. Spécialité</span>
            <p className="text-xs text-slate-700">Domaine d&apos;expertise pointu (ex: API REST, architecture flux temps réel).</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">3. Compétences</span>
            <p className="text-xs text-slate-700">Outils et concepts maîtrisés (Express, Zod, JWT, V8, TypeScript).</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">4. Responsabilité</span>
            <p className="text-xs text-slate-700">Ce dont il doit s&apos;occuper précisément dans le projet.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">5. Méthode</span>
            <p className="text-xs text-slate-700">Examiner &rarr; Diagnostiquer &rarr; Justifier &rarr; Recommander.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">6. Limites</span>
            <p className="text-xs text-slate-700">Ce qui est exclu de son intervention (ne pas modifier sans accord).</p>
          </div>
        </div>
      </section>

      {/* 3. Rôle != Permissions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Règle fondamentale : Le rôle ne confère aucune permission implicite
        </h2>
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-6 space-y-3">
          <p className="text-sm font-black text-rose-950 uppercase tracking-wide">
            Piège fréquent : « Tu es un développeur senior » &ne; « Tu as le droit de tout modifier »
          </p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            Définir un agent comme ingénieur senior oriente son style de raisonnement et son niveau d&apos;analyse critique. Cela ne lui donne en aucun cas le droit de supprimer des dossiers, d&apos;installer des packages ou de modifier du code sans autorisation explicite.
          </p>
        </div>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz d&apos;identité
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Rôle vs Autorisation"
            question="Si vous donnez le rôle de « Développeur Senior », l'agent peut-il réécrire automatiquement les composants React ?"
            options={[
              'Oui, car le titre senior lui donne toute liberté d’action',
              'Non, le rôle définit l’expertise, pas les permissions d’écriture',
            ]}
            correctIndex={1}
            explanation="Les autorisations de modification doivent être accordées explicitement et séparément du rôle professionnel."
          />

          <QuickQuiz
            title="Question 2 — Profil à compétences multiples"
            question="Quelle est la bonne pratique lorsqu'un agent doit maîtriser à la fois le frontend et le backend ?"
            options={[
              'Lui donner 8 métiers différents sans hiérarchie',
              'Définir un rôle principal clair et des compétences secondaires complémentaires',
            ]}
            correctIndex={1}
            explanation="Un rôle principal ciblé garantit la cohérence des priorités et évite les réponses éparpillées."
          />
        </div>
      </section>
    </div>
  );
};
