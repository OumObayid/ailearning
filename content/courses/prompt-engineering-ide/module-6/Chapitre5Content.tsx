'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Protection des variables d&apos;environnement (.env)
        </h1>
      </div>

      {/* 1. Pourquoi .env est ultrasensible */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi les variables d&apos;environnement sont-elles ultrasensibles ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans une application Node.js ou React, les fichiers <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs font-bold">.env</code> contiennent les secrets industriels de l&apos;application : clés d&apos;API Google Gemini payantes, clés Stripe de facturation, mots de passe de bases de données MySQL et clés secrètes de signature de tokens JWT.
        </p>
        <Callout type="danger">
          <strong>Principe d&apos;étanchéité des secrets :</strong> Comprendre comment un programme consomme une variable d&apos;environnement n&apos;exige <strong>jamais</strong> de connaître sa véritable valeur. L&apos;agent peut analyser l&apos;architecture sans ouvrir le fichier <code className="font-mono">.env</code>.
        </Callout>
      </section>

      {/* 2. .env vs .env.example */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. .env (Confidentiel) vs .env.example (Modèle public)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-rose-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-extrabold text-rose-950 text-base">Fichier .env (STRICTEMENT INTERDIT)</h4>
            <div className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <pre>{`PORT=3000
API_KEY_GEMINI=AIzaSyAbc123_CLE_SECRETE_REELLE
DB_PASSWORD=mot_de_passe_super_secret`}</pre>
            </div>
            <p className="text-xs text-rose-900 font-bold">Ne doit JAMAIS être ouvert, lu, recopié ou affiché par l&apos;agent.</p>
          </div>

          <div className="p-5 bg-white border-2 border-emerald-200 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-extrabold text-emerald-950 text-base">Fichier .env.example (AUTORISÉ)</h4>
            <div className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <pre>{`PORT=3000
API_KEY_GEMINI=
DB_PASSWORD=`}</pre>
            </div>
            <p className="text-xs text-emerald-900 font-bold">Modèle partageable documentant les noms de variables sans aucune donnée secrète.</p>
          </div>
        </div>
      </section>

      {/* 3. Vérifier sans divulguer */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Analyser la présence d&apos;une clé sans exposer sa valeur
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Si l&apos;agent doit aider à diagnostiquer pourquoi l&apos;API Gemini échoue au démarrage, voici la distinction entre une mauvaise et une bonne pratique de log :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-rose-800 uppercase">À PROSCRIRE ABSOLUMENT</span>
            <div className="bg-slate-950 text-slate-100 p-2.5 rounded font-mono text-xs">
              <pre>{`// Danger : divulgue la clé dans les logs
console.log("Clé API :", process.env.API_KEY_GEMINI);`}</pre>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase">BONNE PRATIQUE SÉCURISÉE</span>
            <div className="bg-slate-950 text-slate-100 p-2.5 rounded font-mono text-xs">
              <pre>{`// Sûr : vérifie la présence booléenne
console.log("Clé API configurée :", Boolean(process.env.API_KEY_GEMINI));`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Instructions de protection */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Instructions principales : Sanctuarisation des variables d&apos;environnement
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-normal">
          <pre>{`[POLITIQUE_DE_PROTECTION_DES_VARIABLES_D_ENVIRONNEMENT]
1. INTERDICTION DE LECTURE :
   Ne consulte, n'ouvre et n'extrais JAMAIS les fichiers :
   .env, .env.local, .env.development, .env.production, .env.test.

2. ANALYSE DU CODE SOURCE :
   Tu as le droit d'analyser l'usage de process.env.<NOM> dans le code JavaScript :
   - Vérifier si dotenv.config() est appelé au démarrage.
   - Vérifier si les cas où la variable est absente sont traités par des erreurs explicites.
   Tu ne dois JAMAIS tenter de découvrir la valeur réelle.

3. AUCUNE DIVULGATION :
   Ne reproduis jamais de mot de passe, de chaîne secrète ou de clé dans tes réponses textuelles.
   Remplace systématiquement par <REDACTED_SECRET>.`}</pre>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Protection des variables d&apos;environnement
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 5"
          questions={[
            {
              id: 1,
              question: "Pourquoi l'agent peut-il analyser une application utilisant Google Gemini sans jamais avoir besoin d'ouvrir le fichier .env ?",
              options: [
                "Parce qu'il peut vérifier la syntaxe et l'architecture du code (ex: process.env.API_KEY) sans avoir besoin de connaître la valeur secrète de production.",
                "Parce que Gemini fonctionne sans clé API.",
                "Parce que le fichier .env s'efface automatiquement.",
                "Parce que l'agent devine la clé par magie."
              ],
              correctIndex: 0,
              explanation: "Le code source manipule des variables abstraites. L'audit porte sur la présence des vérifications d'erreurs et des imports, jamais sur la clé réelle."
            },
            {
              id: 2,
              question: "Le fichier .gitignore protège-t-il techniquement le fichier .env contre la lecture par un agent IA local dans l'IDE ?",
              options: [
                "Oui, .gitignore rend les fichiers invisibles pour tout le système.",
                "Non, .gitignore empêche uniquement le suivi par Git lors des commits ; il ne bloque en rien la lecture par un processus ou agent s'exécutant en local.",
                "Oui, sous Windows uniquement.",
                "Non, .gitignore sert uniquement pour le CSS."
              ],
              correctIndex: 1,
              explanation: ".gitignore concerne uniquement Git. Pour bloquer l'agent, il faut des règles de sandbox et des instructions de contrôle d'accès au niveau de l'IDE."
            }
          ]}
        />
      </section>
    </div>
  );
};

