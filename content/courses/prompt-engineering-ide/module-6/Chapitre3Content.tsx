'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Contrôle des accès aux fichiers (File Access Control)
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi contrôler les fichiers à l&apos;intérieur du projet ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Limiter un agent à son dossier de projet est nécessaire, mais insuffisant. Au sein même d&apos;une application React ou Node.js, certains fichiers ne doivent <strong>jamais</strong> être consultés par l&apos;agent : secrets d&apos;environnement (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">.env</code>), clés privées SSH ou TLS (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">*.pem</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">*.key</code>), ou dossiers de métadonnées Git (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">.git/</code>).
        </p>
        <Callout type="warning">
          <strong>Règle de granularité :</strong> Un fichier n&apos;est pas autorisé simplement parce qu&apos;il se trouve dans l&apos;arborescence du projet. Chaque ressource consultée doit répondre à un mandat d&apos;analyse justifié.
        </Callout>
      </section>

      {/* 2. Liste blanche vs Liste noire */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Liste blanche (Allowlist) vs Liste noire (Denylist)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-emerald-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-extrabold text-emerald-950 text-base">La Liste Blanche (Recommandée)</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Définir expressément ce qui est autorisé. Tout le reste est réputé interdit par défaut :
            </p>
            <div className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <pre>{`Fichiers autorisés :
- src/components/Projects.jsx
- src/data/projects.js
- src/App.jsx
(Tout autre fichier est bloqué)`}</pre>
            </div>
            <p className="text-xs text-emerald-800 font-bold">Sécurité maximale : même si un nouveau secret apparaît, il reste protégé.</p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-extrabold text-slate-950 text-base">La Liste Noire (Complémentaire)</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Énumérer les fichiers expressément proscrits :
            </p>
            <div className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <pre>{`Fichiers interdits :
- .env*
- *.pem, *.key
- .git/**
- node_modules/**`}</pre>
            </div>
            <p className="text-xs text-rose-800 font-bold">Faiblesse : si un secret est stocké dans un fichier non listé (ex: secret.json), il risque d&apos;être exposé.</p>
          </div>
        </div>
      </section>

      {/* 3. Motifs de filtrage Glob */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Règles de filtrage par motifs (Glob Patterns)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Motif Glob</th>
                <th className="p-3 border border-slate-200">Règle de filtrage</th>
                <th className="p-3 border border-slate-200">Explication de sécurité</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-indigo-700">src/components/**</td>
                <td className="p-3 border border-slate-200 text-emerald-700 font-bold">LECTURE AUTORISÉE</td>
                <td className="p-3 border border-slate-200">Accès ouvert à tous les sous-composants React de l&apos;UI.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-rose-700">**/.env*</td>
                <td className="p-3 border border-slate-200 text-rose-700 font-bold">ACCÈS STRICTEMENT INTERDIT</td>
                <td className="p-3 border border-slate-200">Bloque .env, .env.local, .env.production dans toute l&apos;arborescence.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-rose-700">**/*.{'{pem,key}'}</td>
                <td className="p-3 border border-slate-200 text-rose-700 font-bold">ACCÈS STRICTEMENT INTERDIT</td>
                <td className="p-3 border border-slate-200">Bloque les certificats TLS et clés privées de signature.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-mono font-bold text-amber-700">**/node_modules/**</td>
                <td className="p-3 border border-slate-200 text-slate-500 font-bold">EXPLORATION BLOQUÉE</td>
                <td className="p-3 border border-slate-200">Évite le gaspillage de tokens et les fausses pistes dans les dépendances tierces.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Instructions de contrôle d'accès */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Instructions principales : Contrôle granulaire des fichiers
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-normal">
          <pre>{`[REGLES_DE_CONTROLE_DES_ACCES_AUX_FICHIERS]
1. LISTE BLANCHE STRICTE :
   Consulte exclusivement les fichiers expressément désignés pour la mission.
   Ne présume jamais d'une autorisation implicite sur les autres fichiers du projet.

2. SANCTUARISATION DES SECRETS :
   Interdiction absolue de consulter, ouvrir ou inspecter :
   - Tout fichier débutant par .env
   - Tout fichier d'extension .pem, .key, .p12
   - Les dossiers .git/ et .ssh/

3. DÉMARCHE EN CAS DE FICHIER INACCESSIBLE :
   Si l'analyse d'un fichier hors liste blanche semble nécessaire :
   - N'essaie pas d'y accéder.
   - Explique la justification technique à l'utilisateur.
   - Attends son approbation formelle avant toute lecture.`}</pre>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Contrôle des accès aux fichiers
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 3"
          questions={[
            {
              id: 1,
              question: "Pourquoi la méthode de la Liste Blanche (Allowlist) est-elle supérieure à la Liste Noire pour sécuriser l'accès aux fichiers ?",
              options: [
                "Parce qu'elle autorise par défaut tous les fichiers.",
                "Parce qu'elle bloque automatiquement tout fichier inconnu ou nouvellement créé, garantissant qu'un secret imprévu ne sera jamais accessible par défaut.",
                "Parce qu'elle réduit la taille du disque dur.",
                "Parce que les listes noires ne fonctionnent pas en JavaScript."
              ],
              correctIndex: 1,
              explanation: "La liste blanche applique une sécurité par défaut : seules les ressources explicitement déclarées sont accessibles, éliminant tout oubli de configuration."
            },
            {
              id: 2,
              question: "L'agent peut-il ouvrir le fichier .env si l'utilisateur lui demande d'analyser la connexion à la base de données ?",
              options: [
                "Oui, car la base de données nécessite un mot de passe.",
                "Non, l'agent peut analyser le code source de connexion sans jamais avoir besoin de lire le mot de passe réel stocké dans .env.",
                "Oui, s'il promet de ne pas le répéter.",
                "Non, sauf si le fichier .env fait moins de 10 lignes."
              ],
              correctIndex: 1,
              explanation: "Comprendre le mécanisme de connexion n'exige en aucun cas de connaître les secrets de production."
            }
          ]}
        />
      </section>
    </div>
  );
};
