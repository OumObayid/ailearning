'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre12Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 12 — TP 2.2 : Création et configuration dans Antigravity
        </h1>
      </div>

      {/* 1. Matrice de configuration */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Matrice de configuration de l&apos;agent
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Paramètre</th>
                <th className="p-3.5 border border-slate-200">Valeur appliquée dans Antigravity</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Nom</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">Agent Analyste Documentaire</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Rôle &amp; Mission</td>
                <td className="p-3.5 border border-slate-200">Analyste technique et documentaire • Analyse exclusive des documents fournis</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Autonomie</td>
                <td className="p-3.5 border border-slate-200 text-indigo-700 font-bold">Limitée (Human-in-the-loop strict)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Écritures / Modifications</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">Interdites sans approbation explicite</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Exploration du disque</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">Interdite (restreint au workspace autorisé)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Processus séquentiel de travail */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Le cycle de vie d&apos;une mission d&apos;analyse
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs inline-flex items-center justify-center">1</span>
            <p className="text-xs font-black text-slate-950">Attente</p>
            <p className="text-[11px] text-slate-600">L&apos;humain joint le document</p>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs inline-flex items-center justify-center">2</span>
            <p className="text-xs font-black text-slate-950">Vérification</p>
            <p className="text-[11px] text-slate-600">Contrôle de lisibilité</p>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs inline-flex items-center justify-center">3</span>
            <p className="text-xs font-black text-slate-950">Analyse</p>
            <p className="text-[11px] text-slate-600">Audit pédagogique &amp; tech</p>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs inline-flex items-center justify-center">4</span>
            <p className="text-xs font-black text-slate-950">Rapport</p>
            <p className="text-[11px] text-slate-600">Restitution dans le chat</p>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs inline-flex items-center justify-center">5</span>
            <p className="text-xs font-black text-slate-950">Arrêt</p>
            <p className="text-[11px] text-slate-600">Aucune action sans demande</p>
          </div>
        </div>
      </section>

      {/* 3. Test de configuration */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Test de configuration initial à soumettre dans le chat
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-2">
          <p className="text-xs font-black uppercase text-indigo-700">Prompt de vérification d&apos;amorçage :</p>
          <pre className="font-mono text-xs sm:text-sm bg-white p-4 rounded-xl border border-slate-200 text-slate-900 whitespace-pre-wrap">
{`Présente ta configuration actuelle :
- Ton identité et ton rôle exact
- Ta mission principale et tes responsabilités
- Les documents auxquels tu es autorisé à accéder
- Les actions nécessitant mon autorisation et celles qui te sont strictement interdites
- La méthode suivie pour analyser un document et le format de ton rapport
Ne réalise aucune opération sur les fichiers. Réponds uniquement à partir de tes instructions.`}
          </pre>
        </div>

        <Callout type="tip" title="Critère de réussite du TP 2.2">
          L&apos;agent doit restituer exactement le cadre fixé dans le TP 2.1 sans revendiquer de permissions magiques et sans tenter de lire le système de fichiers.
        </Callout>
      </section>

      {/* 4. Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Validation du TP 2.2
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Persistance des instructions"
            question="Pourquoi doit-on enregistrer les instructions de l'agent dans le mécanisme de configuration persistant plutôt que dans un simple message de chat ?"
            options={[
              'Pour qu’elles restent actives sur toutes les sessions et ne soient pas oubliées lors du défilement du contexte',
              'Pour accélérer la vitesse de frappe du modèle',
            ]}
            correctIndex={0}
            explanation="La configuration persistante de l'IDE garantit que l'agent est instancié avec son cadre de sécurité à chaque nouvelle conversation."
          />
        </div>
      </section>
    </div>
  );
};

