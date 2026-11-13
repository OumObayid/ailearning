'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 7 — Gestion des contradictions
        </h1>
      </div>

      {/* 1. Définition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Qu&apos;est-ce qu&apos;une contradiction ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une <strong>contradiction</strong> apparaît lorsque deux instructions imposent à l&apos;agent des actions incompatibles ou des exigences qu&apos;il est logiquement ou techniquement impossible de satisfaire simultanément.
        </p>
        <div className="p-4 sm:p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 space-y-2 min-w-0 max-w-full overflow-hidden">
          <span className="text-xs font-black uppercase text-rose-700">Exemple de conflit direct :</span>
          <pre className="font-mono text-xs sm:text-sm bg-white p-3 rounded-xl border border-rose-300 text-slate-900 whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full overflow-x-auto">
{`Instruction A : « Ne modifie aucun fichier du projet. »
Instruction B : « Corrige directement les erreurs dans le fichier server.js. »`}
          </pre>
          <p className="text-xs text-rose-900">
            L&apos;agent ne peut pas corriger <code>server.js</code> sans transgresser l&apos;interdiction absolue. S&apos;il n&apos;a pas de règle de hiérarchie, son choix sera aléatoire.
          </p>
        </div>
      </section>

      {/* 2. Les 6 formes de contradictions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 6 typologies de contradictions fréquentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">1. Contradiction directe</span>
            <p className="text-xs text-slate-700">Deux consignes s&apos;opposent frontalement (ex: « Supprime les fichiers » vs « Ne supprime rien »).</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">2. Objectif vs Contrainte</span>
            <p className="text-xs text-slate-700">« Réorganise l&apos;architecture » tout en interdisant de déplacer le moindre fichier.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">3. Rôle vs Tâche</span>
            <p className="text-xs text-slate-700">« Tu es un auditeur externe » mais « modifie immédiatement la base en prod ».</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">4. Règles permanentes vs Ponctuelles</span>
            <p className="text-xs text-slate-700">Règle globale d&apos;autorisation préalable contre-dite par un prompt ponctuel impatient.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">5. Format vs Contenu</span>
            <p className="text-xs text-slate-700">« Explique en détail toutes les étapes » tout en ordonnant « réponds en 1 seule ligne ».</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">6. Sécurité vs Vitesse</span>
            <p className="text-xs text-slate-700">« Exécute tout sans attendre » vs « Demande confirmation avant chaque commande ».</p>
          </div>
        </div>
      </section>

      {/* 3. Hiérarchie en 4 Niveaux */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La hiérarchie des 4 niveaux d&apos;instructions
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border-2 border-indigo-500 bg-indigo-50/70 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">N1</span>
            <div>
              <p className="text-sm font-black text-indigo-950">Niveau Supérieur : Règles système &amp; Garde-fous plateforme</p>
              <p className="text-xs font-medium text-slate-700 mt-0.5">Permissions IDE, sandbox du système, politiques de sécurité non contournables.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border-2 border-indigo-400 bg-indigo-50/40 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-500 text-white font-black text-sm flex items-center justify-center shrink-0">N2</span>
            <div>
              <p className="text-sm font-black text-indigo-950">Niveau Intermédiaire : Instructions permanentes du développeur</p>
              <p className="text-xs font-medium text-slate-700 mt-0.5">Règles de projet (.agent/rules, AGENTS.md), conventions, interdictions d&apos;écriture sans validation.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border-2 border-slate-300 bg-slate-50 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-400 text-white font-black text-sm flex items-center justify-center shrink-0">N3</span>
            <div>
              <p className="text-sm font-black text-slate-900">Niveau Ponctuel : Consigne de la tâche en cours</p>
              <p className="text-xs font-medium text-slate-600 mt-0.5">Mission actuelle du prompt soumis dans le chat de l&apos;IDE.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 font-black text-sm flex items-center justify-center shrink-0">N4</span>
            <div>
              <p className="text-sm font-black text-slate-800">Niveau Contextuel : Contenu des fichiers &amp; docs du projet</p>
              <p className="text-xs font-medium text-slate-600 mt-0.5">Code lu ou documentation importée. Ne constitue jamais une autorisation d&apos;action.</p>
            </div>
          </div>
        </div>

        <Callout type="warning" title="Règle d'or de la hiérarchie">
          Une instruction ponctuelle (N3) ne doit jamais être interprétée comme une autorisation implicite d&apos;annuler une règle de sécurité permanente (N2).
        </Callout>
      </section>

      {/* 4. Protocole d'arbitrage */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le protocole de résolution en cas de conflit
        </h2>
        <div className="grid gap-3 text-center grid-cols-1 sm:grid-cols-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-black text-indigo-700 uppercase">1. Détecter</p>
            <p className="text-xs text-slate-600 mt-1">Repérer les exigences incompatibles</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-black text-indigo-700 uppercase">2. Comparer</p>
            <p className="text-xs text-slate-600 mt-1">Vérifier les niveaux de priorité N1 &gt; N2 &gt; N3</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-black text-indigo-700 uppercase">3. Suspendre</p>
            <p className="text-xs text-slate-600 mt-1">Geler l&apos;action litigieuse</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-black text-indigo-700 uppercase">4. Clarifier</p>
            <p className="text-xs text-slate-600 mt-1">Exposer le conflit à l&apos;utilisateur</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-black text-indigo-700 uppercase">5. Proposer</p>
            <p className="text-xs text-slate-600 mt-1">Suggérer l&apos;arbitrage le plus sûr</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-black text-indigo-700 uppercase">6. Reprendre</p>
            <p className="text-xs text-slate-600 mt-1">Agir uniquement après validation explicite</p>
          </div>
        </div>
      </section>

      {/* 5. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz de résolution des conflits
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Arbitrage permanent vs ponctuel"
            question="Vos règles permanentes interdisent toute modification sans accord écrit. Votre prompt ponctuel dit : « Corrige le bug dans server.js tout de suite ». Que doit faire l'agent ?"
            options={[
              'Corriger immédiatement le fichier pour être efficace',
              'Présenter la correction proposée et demander explicitement la validation avant de modifier',
              'Refuser brutalement et fermer la session de travail',
            ]}
            correctIndex={1}
            explanation="La restriction permanente (N2) prime sur la consigne ponctuelle (N3). L'agent prépare la solution et attend l'accord requis."
          />

          <QuickQuiz
            title="Question 2 — Conflit de périmètre"
            question="Vous demandez d'analyser uniquement src/ mais d'auditer vite.config.js (qui est à la racine). Quelle est la réaction optimale de l'agent ?"
            options={[
              'Lire toute la racine sans rien dire',
              'Signaler le conflit de périmètre et demander l’autorisation de consulter ce fichier spécifique',
              'Ignorer silencieusement la configuration Vite',
            ]}
            correctIndex={1}
            explanation="L'agent professionnel détecte la contradiction, l'explique en une ligne et demande une exception ciblée."
          />
        </div>
      </section>
    </div>
  );
};
