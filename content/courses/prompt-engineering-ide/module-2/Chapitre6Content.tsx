'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Gestion des fichiers autorisés et interdits
        </h1>
      </div>

      {/* 1. Les 3 Catégories de fichiers */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Fichiers autorisés, conditionnels et interdits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-emerald-700">A. Fichiers autorisés</span>
            <p className="text-xs font-mono text-slate-800">
              src/components/<br />
              src/services/<br />
              package.json<br />
              vite.config.js
            </p>
            <p className="text-xs text-slate-600">Lecture et analyse permises d&apos;office dans le cadre du projet.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-amber-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-amber-700">B. Fichiers conditionnels</span>
            <p className="text-xs font-mono text-slate-800">
              .env<br />
              .env.local<br />
              config/database.php<br />
              backup.sql
            </p>
            <p className="text-xs text-slate-600">Secrets ou données sensibles. Accès strictement soumis à approbation écrite.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-rose-700">C. Fichiers interdits</span>
            <p className="text-xs font-mono text-slate-800">
              C:\Users\Documents\<br />
              C:\Users\Desktop\<br />
              ../autre-projet/<br />
              Fichiers personnels
            </p>
            <p className="text-xs text-slate-600">Accès et exploration totalement proscrits. Sanctuarisation absolue.</p>
          </div>
        </div>
      </section>

      {/* 2. Documents fournis manuellement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Règle clé : Les documents fournis manuellement par l&apos;utilisateur
        </h2>
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-6 space-y-3">
          <p className="text-sm font-black text-indigo-950 uppercase">
            Le principe d&apos;injection manuelle obligatoire :
          </p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            L&apos;agent ne doit <strong>jamais</strong> chercher lui-même un document sur votre machine. C&apos;est l&apos;utilisateur qui attache ou colle explicitement le document dans la conversation.
            <br />
            De plus, l&apos;autorisation d&apos;analyser un document n&apos;autorise en aucun cas sa copie, son intégration dans le code ou sa diffusion.
          </p>
        </div>
      </section>

      {/* 3. Bloc de règles Antigravity */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Bloc de règles pour les instructions principales
        </h2>
        <div className="rounded-2xl border-2 border-slate-300 bg-slate-900 text-slate-100 p-6 font-mono text-sm space-y-2">
          <p className="text-xs uppercase font-extrabold text-indigo-400">[GESTION DU SYSTÈME DE FICHIERS]</p>
          <pre className="whitespace-pre-wrap text-slate-200">
{`1. Périmètre : Travaille exclusivement dans le dossier du workspace ouvert. Ne remonte jamais aux dossiers parents.
2. Documents : Analyse uniquement les documents explicitement attachés par l'utilisateur. Ne recherche aucun fichier personnel sur le disque.
3. Secrets : Ne lis jamais les fichiers .env* ni les clés d'API sans demande explicite. Ne les reproduis jamais dans tes réponses.
4. Fichiers inconnus : N'ouvre aucun fichier suspect découvert dans le projet sans en informer l'utilisateur.`}
          </pre>
        </div>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz d&apos;accès aux fichiers
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Exploration extérieure"
            question="L'utilisateur dit : « Cherche dans mes documents personnels le cours sur Express ». Que doit répondre l'agent ?"
            options={[
              'Parcourir le dossier Documents pour trouver le fichier',
              'Refuser l’exploration et demander à l’utilisateur de joindre lui-même le document dans le chat',
            ]}
            correctIndex={1}
            explanation="L'agent a l'interdiction formelle de fouiller le disque dur. Il exige une transmission manuelle par l'utilisateur."
          />

          <QuickQuiz
            title="Question 2 — Traitement des fichiers .env"
            question="Pendant un audit de sécurité, l'agent peut-il afficher en clair le contenu du fichier .env dans son rapport ?"
            options={[
              'Oui, pour prouver qu’il a bien lu le fichier',
              'Non, les secrets et clés d’API ne doivent jamais être reproduits ou divulgués',
            ]}
            correctIndex={1}
            explanation="La protection des secrets impose de signaler la présence ou l'absence d'une variable sans jamais copier sa valeur secrète."
          />
        </div>
      </section>
    </div>
  );
};
