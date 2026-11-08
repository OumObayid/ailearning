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
          Chapitre 1 — Qu&apos;est-ce qu&apos;une instruction principale ?
        </h1>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base font-semibold text-slate-950">
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Définir précisément ce qu&apos;est une instruction principale.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Distinguer une règle durable d&apos;un prompt ponctuel de tâche.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser les 4 fonctions fondamentales (Identité, Mission, Limites, Comportement).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Construire une première version d&apos;instructions pour Antigravity.</span>
          </li>
        </ul>
      </section>

      {/* 2. Définition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Définition : le cadre de travail permanent
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une <strong>instruction principale</strong> est un ensemble de règles permanentes qui définit le comportement attendu d&apos;un agent IA pendant toute la durée de son activité. Elle constitue son <em>contrat de collaboration</em> et son cadre d&apos;exercice.
        </p>

        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-3">
          <h3 className="text-base font-black text-indigo-950">Une instruction principale indique notamment :</h3>
          <ul className="space-y-1.5 text-sm font-medium text-slate-800 list-disc list-inside">
            <li>Qui est l&apos;agent et quel est son rôle fonctionnel exact.</li>
            <li>Quelle est sa mission générale et ses responsabilités de base.</li>
            <li>Ce qu&apos;il est expressément autorisé à faire.</li>
            <li>Ce qu&apos;il lui est strictement interdit de faire.</li>
            <li>Comment il doit communiquer et réagir en cas d&apos;information manquante.</li>
            <li>Dans quelles conditions obligatoires il doit solliciter l&apos;accord de l&apos;utilisateur.</li>
          </ul>
        </div>
      </section>

      {/* 3. Instruction principale vs Prompt ponctuel */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Instruction principale vs Prompt ponctuel
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Instruction principale</th>
                <th className="p-3.5 border border-slate-200">Prompt ponctuel</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Fonction</td>
                <td className="p-3.5 border border-slate-200">Encadrer durablement l&apos;agent</td>
                <td className="p-3.5 border border-slate-200">Confier une mission immédiate</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Durée de vie</td>
                <td className="p-3.5 border border-slate-200">Durable (persiste sur toutes les sessions)</td>
                <td className="p-3.5 border border-slate-200">Éphémère (liée à la tâche en cours)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Contenu</td>
                <td className="p-3.5 border border-slate-200">Règles générales, posture et sécurité</td>
                <td className="p-3.5 border border-slate-200">Consignes ciblées sur un fichier ou une route</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">Exemple</td>
                <td className="p-3.5 border border-slate-200">« Ne jamais modifier un fichier sans accord »</td>
                <td className="p-3.5 border border-slate-200">« Analyse le fichier server.js »</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Les 4 fonctions fondamentales */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Les quatre fonctions fondamentales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">1. Identité</span>
            <p className="text-sm font-bold text-slate-950">Qui est l&apos;agent ?</p>
            <p className="text-xs text-slate-600">Définir sa fonction technique et sa spécialité professionnelle.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">2. Mission</span>
            <p className="text-sm font-bold text-slate-950">Que doit-il faire ?</p>
            <p className="text-xs text-slate-600">Définir son objectif global d&apos;accompagnement ou d&apos;audit.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">3. Limites</span>
            <p className="text-sm font-bold text-slate-950">Jusqu&apos;où peut-il aller ?</p>
            <p className="text-xs text-slate-600">Délimiter les actions permises, conditionnelles et interdites.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-white shadow-sm space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">4. Comportement</span>
            <p className="text-sm font-bold text-slate-950">Comment réagir ?</p>
            <p className="text-xs text-slate-600">Définir les règles de communication et de gestion du doute.</p>
          </div>
        </div>
      </section>

      {/* 5. Exemple de configuration minimale */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Premier exemple : Structure d&apos;instructions minimale
        </h2>
        <div className="rounded-2xl border-2 border-slate-300 bg-slate-900 text-slate-100 p-6 font-mono text-sm space-y-4">
          <p className="text-xs uppercase font-extrabold text-indigo-400">[INSTRUCTIONS PRINCIPALES — GOOGLE ANTIGRAVITY]</p>
          <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
{`## 1. IDENTITÉ
Tu es un agent IA spécialisé dans l'analyse et le développement d'applications web (React, Node.js, Express.js).

## 2. MISSION
Ta mission est d'accompagner l'utilisateur dans l'audit technique et l'amélioration de son code.

## 3. PÉRIMÈTRE
Travaille exclusivement dans le projet ouvert. N'explore aucun autre dossier de l'ordinateur. Attends que l'utilisateur fournisse manuellement les documents à analyser.

## 4. AUTORISATIONS
Tu peux analyser les éléments explicitement autorisés. Tu ne peux modifier, créer ou supprimer aucun fichier sans autorisation préalable.

## 5. DOCUMENTS FOURNIS
Analyse les documents transmis sans intégrer automatiquement leur contenu dans le projet.

## 6. COMMUNICATION
Explique les problèmes avec rigueur. Distingue les faits des suppositions. Demande confirmation avant toute action sensible.`}
          </pre>
        </div>

        <Callout type="warning" title="Consigne écrite vs Permission système">
          Une instruction principale décrit le comportement attendu. Elle ne remplace pas les mécanismes de bac à sable (sandbox) et de confirmation d&apos;exécution d&apos;outils de l&apos;IDE.
        </Callout>
      </section>

      {/* 6. Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz de compréhension
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Rôle de l'instruction principale"
            question="Quelle est la fonction principale d'un fichier d'instructions permanentes ?"
            options={[
              'Demander une tâche immédiate sur un fichier spécifique',
              'Définir le cadre durable, les règles de sécurité et les autorisations de travail de l’agent',
              'Compiler le code JavaScript en binaire machine',
            ]}
            correctIndex={1}
            explanation="L'instruction principale définit les règles durables qui encadrent toutes les interactions futures de l'agent."
          />

          <QuickQuiz
            title="Question 2 — Analyse de document vs intégration"
            question="Si vous transmettez un document PDF de cours à un agent configuré, quelle action est autorisée par défaut ?"
            options={[
              'Copier son contenu dans les fichiers de code du projet',
              'Analyser son contenu et présenter des observations dans la conversation sans modifier le projet',
              'Parcourir le disque dur pour chercher les versions antérieures',
            ]}
            correctIndex={1}
            explanation="L'analyse d'un document transmis manuellement n'autorise jamais son intégration ni sa copie dans les fichiers sources."
          />
        </div>
      </section>
    </div>
  );
};

