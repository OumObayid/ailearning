'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 9 — Demander une réponse ou demander une action
        </h1>
      </div>

      {/* 1. Différence Fondamentale */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Réponse vs Action : Deux responsabilités distinctes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">Demande de Réponse</span>
            <p className="font-mono text-sm bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-900">
              « Explique-moi comment fonctionne le système d&apos;authentification. »
            </p>
            <p className="text-xs text-slate-700">
              L&apos;agent examine les fichiers autorisés et restitue une explication ou un diagnostic. Aucune modification du projet n&apos;est entreprise.
            </p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">Demande d&apos;Action</span>
            <p className="font-mono text-sm bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-900">
              « Modifie le système d&apos;authentification pour intégrer Google OAuth. »
            </p>
            <p className="text-xs text-slate-700">
              L&apos;agent déclenche des outils d&apos;écriture de fichiers, manipule le code et peut modifier l&apos;architecture de l&apos;application.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 4 Niveaux d'intervention */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 4 niveaux d&apos;intervention d&apos;un agent IA
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Niveau</th>
                <th className="p-3.5 border border-slate-200">Action de l&apos;agent</th>
                <th className="p-3.5 border border-slate-200">Modification du code</th>
                <th className="p-3.5 border border-slate-200">Exemple de verbe</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">1. Expliquer</td>
                <td className="p-3.5 border border-slate-200">Fournit des connaissances théoriques ou conceptuelles</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Non</td>
                <td className="p-3.5 border border-slate-200"><code>Explique, Décris, Compare</code></td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">2. Analyser</td>
                <td className="p-3.5 border border-slate-200">Examine le code source et dresse un diagnostic</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Non</td>
                <td className="p-3.5 border border-slate-200"><code>Analyse, Identifie, Vérifie</code></td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">3. Proposer</td>
                <td className="p-3.5 border border-slate-200">Prépare la solution technique sans l&apos;appliquer</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Non</td>
                <td className="p-3.5 border border-slate-200"><code>Propose, Recommande, Planifie</code></td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-slate-900">4. Exécuter</td>
                <td className="p-3.5 border border-slate-200">Modifie concrètement les fichiers du projet</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">Oui (sous contrôle)</td>
                <td className="p-3.5 border border-slate-200"><code>Crée, Modifie, Corrige, Réfracte</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Générer du code vs l'intégrer au projet */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Générer du code vs l&apos;intégrer au projet
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">A. Générer uniquement du code dans la réponse</span>
            <p className="text-xs font-mono text-slate-800">« Présente un exemple complet de formulaire de connexion. Fournis le code dans ta réponse. Ne crée aucun fichier dans le projet. »</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">B. Préparer une proposition d&apos;intégration</span>
            <p className="text-xs font-mono text-slate-800">« Analyse l&apos;arborescence React et propose les fichiers nécessaires. Présente leur contenu dans ta réponse sans créer ni modifier de fichier. »</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">C. Intégrer réellement sous validation humaine</span>
            <p className="text-xs font-mono text-slate-800">« Présente d&apos;abord le diff et le plan d&apos;action. Attends ma validation écrite avant d&apos;appliquer la modification dans les fichiers. »</p>
          </div>
        </div>
      </section>

      {/* 4. Le Workflow Human-in-the-loop */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le workflow professionnel à validation humaine (Human-in-the-Loop)
        </h2>
        <div className="grid gap-3 text-center grid-cols-1 sm:grid-cols-2">
          <div className="p-3.5 rounded-2xl border-2 border-slate-200 bg-white space-y-1">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 font-black text-xs inline-flex items-center justify-center">1</span>
            <p className="text-xs font-black text-slate-950">Analyse</p>
            <p className="text-[11px] text-slate-600">Diagnostic en lecture seule</p>
          </div>
          <div className="p-3.5 rounded-2xl border-2 border-slate-200 bg-white space-y-1">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 font-black text-xs inline-flex items-center justify-center">2</span>
            <p className="text-xs font-black text-slate-950">Proposition</p>
            <p className="text-[11px] text-slate-600">Plan &amp; diff sans écriture</p>
          </div>
          <div className="p-3.5 rounded-2xl border-2 border-indigo-400 bg-indigo-50/80 space-y-1 shadow-sm">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs inline-flex items-center justify-center">3</span>
            <p className="text-xs font-black text-indigo-950">Validation</p>
            <p className="text-[11px] text-indigo-800 font-bold">Accord explicite humain</p>
          </div>
          <div className="p-3.5 rounded-2xl border-2 border-slate-200 bg-white space-y-1">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 font-black text-xs inline-flex items-center justify-center">4</span>
            <p className="text-xs font-black text-slate-950">Exécution</p>
            <p className="text-[11px] text-slate-600">Écriture ciblée autorisée</p>
          </div>
          <div className="p-3.5 rounded-2xl border-2 border-slate-200 bg-white space-y-1">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 font-black text-xs inline-flex items-center justify-center">5</span>
            <p className="text-xs font-black text-slate-950">Vérification</p>
            <p className="text-[11px] text-slate-600">Compte rendu d&apos;impact</p>
          </div>
        </div>
      </section>

      {/* 5. Synthèse Générale du Module 1 */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Synthèse générale du Module 1
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Ce module 1 vous a doté des compétences d&apos;ingénierie indispensables pour concevoir et piloter des agents IA sans risque :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3 border border-slate-200">Séquence</th>
                <th className="p-3 border border-slate-200">Compétence clé acquise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
              <tr><td className="p-3 border border-slate-200 font-bold">1.1</td><td className="p-3 border border-slate-200">Distinguer prompt, instruction, contexte et commande.</td></tr>
              <tr><td className="p-3 border border-slate-200 font-bold">1.2</td><td className="p-3 border border-slate-200">Structurer un prompt professionnel en 7 composants indispensables.</td></tr>
              <tr><td className="p-3 border border-slate-200 font-bold">1.3</td><td className="p-3 border border-slate-200">Définir un rôle, un objectif mesurable, des contraintes et des livrables prouvés.</td></tr>
              <tr><td className="p-3 border border-slate-200 font-bold">1.4</td><td className="p-3 border border-slate-200">Maîtriser les tokens, la fenêtre de contexte et éviter l&apos;amnésie.</td></tr>
              <tr><td className="p-3 border border-slate-200 font-bold">1.5</td><td className="p-3 border border-slate-200">Combiner consignes positives et interdictions négatives strictes.</td></tr>
              <tr><td className="p-3 border border-slate-200 font-bold">1.6</td><td className="p-3 border border-slate-200">Éradiquer les ambiguïtés et forcer l&apos;agent à clarifier avant d&apos;agir.</td></tr>
              <tr><td className="p-3 border border-slate-200 font-bold">1.7</td><td className="p-3 border border-slate-200">Résoudre les contradictions via la hiérarchie d&apos;instructions en 4 niveaux.</td></tr>
              <tr><td className="p-3 border border-slate-200 font-bold">1.8</td><td className="p-3 border border-slate-200">Organiser l&apos;architecture en 8 parties (permanentes vs ponctuelles).</td></tr>
              <tr><td className="p-3 border border-slate-200 font-bold">1.9</td><td className="p-3 border border-slate-200">Contrôler les 4 niveaux d&apos;intervention et le workflow human-in-the-loop.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50/70 p-6 sm:p-8 text-center space-y-2">
          <Icon name="academic-cap" className="w-8 h-8 text-emerald-700 mx-auto" />
          <h3 className="text-sm sm:text-base font-bold text-emerald-950">Félicitations, Module 1 complété !</h3>
          <p className="text-sm sm:text-base font-semibold text-emerald-900 max-w-2xl mx-auto">
            Vous maîtrisez désormais les fondamentaux avancés du Prompt Engineering pour agents de développement. Vous êtes prêt à concevoir des prompts robustes et sécurisés dans n&apos;importe quel environnement de développement moderne.
          </p>
        </div>
      </section>

      {/* 6. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Identifier le niveau d&apos;intervention
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Classifier la demande"
            question="« Examine mon fichier server.js et identifie les failles de sécurité sans rien modifier » est une demande de :"
            options={['Explication', 'Analyse', 'Proposition', 'Exécution']}
            correctIndex={1}
            explanation="L'agent inspecte le code existant pour établir un diagnostic sans action d'écriture : niveau 2 (Analyser)."
          />

          <QuickQuiz
            title="Question 2 — Classifier la demande"
            question="« Propose une architecture pour intégrer Stripe et présente les fichiers nécessaires dans ta réponse » est une demande de :"
            options={['Explication', 'Analyse', 'Proposition', 'Exécution']}
            correctIndex={2}
            explanation="L'agent conçoit la solution complète et la présente sans l'injecter dans le code : niveau 3 (Proposer)."
          />

          <QuickQuiz
            title="Question 3 — Classifier la demande"
            question="« Ajoute une route /api/payment dans server.js après avoir validé avec moi » relève du niveau :"
            options={['Explication', 'Analyse', 'Proposition', 'Exécution (sous validation)']}
            correctIndex={3}
            explanation="La demande vise une modification effective du code source du projet : niveau 4 (Exécuter)."
          />
        </div>
      </section>
    </div>
  );
};
