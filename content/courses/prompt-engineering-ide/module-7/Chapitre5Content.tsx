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
          Chapitre 5 — Éviter les instructions redondantes
        </h1>
      </div>

      {/* 1. Le piège de l'empilement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Le piège de l&apos;empilement compulsif d&apos;instructions
        </h2>
        <p className="text-slate-700">
          Face à une erreur d&apos;un agent, le réflexe courant consiste à rajouter une ligne d&apos;interdiction en bas du prompt. Au fil des semaines, le fichier système enfle jusqu&apos;à 200 lignes désordonnées où la même consigne est répétée six fois sous des angles divergents.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
            <span className="font-bold text-rose-800">Répétition stérile (À éliminer)</span>
            <div className="bg-slate-900 text-slate-200 p-3 rounded font-mono text-xs space-y-1">
              <p>- Tu ne dois pas modifier les fichiers.</p>
              <p>- Il est interdit de changer le contenu des fichiers.</p>
              <p>- Ne réalise aucune modification dans le projet.</p>
              <p>- Tu ne dois jamais écrire dans les fichiers.</p>
            </div>
            <p className="text-slate-600 text-xs">Ces 4 lignes disent exactement la même chose et gaspillent 45 tokens sans apporter de valeur.</p>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
            <span className="font-bold text-emerald-800">Factorisation rigoureuse (Recommandé)</span>
            <div className="bg-slate-900 text-emerald-300 p-3 rounded font-mono text-xs space-y-1">
              <p>MODE LECTURE SEULE :</p>
              <p>Tu peux consulter uniquement les ressources autorisées.</p>
              <p>Toute création, modification, suppression, copie, déplacement ou renommage de fichier est formellement interdit sans autorisation explicite préalable.</p>
            </div>
            <p className="text-slate-600 text-xs">Une seule instruction claire, concise et englobant l&apos;ensemble des opérations d&apos;écriture.</p>
          </div>
        </div>
      </section>

      {/* 2. Répétition stérile vs Rappel stratégique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Répétition inutile vs Rappel stratégique
        </h2>
        <p className="text-slate-700">
          Attention : toute réitération n&apos;est pas mauvaise. Une règle critique de sécurité peut être rappelée au moment précis où une procédure sensible s&apos;enclenche :
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Répétition stérile (Nuisible)</th>
                <th className="p-3">Rappel stratégique (Bénéfique)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3">Répéter mot pour mot la même règle dans plusieurs paragraphes</td>
                <td className="p-3 font-semibold text-emerald-800">Rappeler la règle générale dans la procédure opérationnelle</td>
              </tr>
              <tr>
                <td className="p-3">Ajouter des adjectifs flatteurs (&quot;sois très intelligent, très pro&quot;)</td>
                <td className="p-3 font-semibold text-emerald-800">Préciser le critère de vérification d&apos;une étape critique</td>
              </tr>
              <tr>
                <td className="p-3">Augmenter la taille du prompt sans gain de précision</td>
                <td className="p-3 font-semibold text-emerald-800">Renforcer l&apos;arrêt obligatoire avant l&apos;appel d&apos;un outil d&apos;écriture</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Les 5 techniques de factorisation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 5 techniques pour nettoyer un prompt
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700">1. Regrouper par thème</span>
            <p className="text-slate-600">Rapprocher toutes les règles concernant les fichiers sous une seule section dédiée <code>## Gestion des fichiers</code>.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700">2. Règle générale + Exceptions</span>
            <p className="text-slate-600">Poser le mode lecture seule par défaut, et stipuler que l&apos;écriture est l&apos;unique exception soumise à accord formel.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700">3. Séparer règles et procédures</span>
            <p className="text-slate-600">La règle dit ce qui est interdit ; la procédure détaille comment préparer le diff avant de demander l&apos;approbation.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700">4. Supprimer le bruit flatteur</span>
            <p className="text-slate-600">Éliminer les <em>&quot;Tu es le meilleur codeur&quot;</em> pour se concentrer sur des exigences mesurables.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-indigo-700">5. Architecture en 8 sections</span>
            <p className="text-slate-600">Structurer chaque agent avec un canevas prévisible et compartimenté.</p>
          </div>
        </div>
      </section>

      {/* 4. Architecture en 8 sections */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. L&apos;architecture standard en 8 sections d&apos;instructions
        </h2>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-1.5">
          <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
            # CANEVAS MODULAIRE D&apos;INSTRUCTIONS PRINCIPALES
          </div>
          <p className="text-emerald-400">1. IDENTITÉ &amp; RÔLE : Métier exact et spécialisation technique.</p>
          <p className="text-emerald-400">2. MISSION : Objectif premier et valeur produite pour l&apos;utilisateur.</p>
          <p className="text-emerald-400">3. PÉRIMÈTRE AUTORISÉ : Dossiers et types de fichiers accessibles.</p>
          <p className="text-emerald-400">4. PERMISSIONS &amp; SÉCURITÉ : Mode lecture seule, protection de .env et du terminal.</p>
          <p className="text-emerald-400">5. MÉTHODE DE TRAVAIL : Étapes logiques à suivre pour chaque tâche.</p>
          <p className="text-emerald-400">6. FIABILITÉ &amp; PREUVES : Interdiction d&apos;halluciner, distinction faits / hypothèses.</p>
          <p className="text-emerald-400">7. GESTION DES ERREURS : Que faire en cas de donnée manquante ou de blocage.</p>
          <p className="text-emerald-400">8. FORMAT DU RAPPORT : Canevas imposé pour les réponses de synthèse.</p>
        </div>

        <Callout type="tip" title="Règle d'or de concision">
          La priorité d&apos;une refactorisation est la cohérence et la vérifiabilité des règles, jamais la brièveté pour le plaisir d&apos;écrire court. Ne supprimez jamais une règle de sécurité critique dans le seul but de gagner 10 tokens !
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Éviter les redondances
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'accumulation de phrases interdisant l'écriture rédigées de cinq manières différentes est-elle contre-productive ?",
              options: [
                "Elle sature le contexte, complique la maintenance et peut créer des ambiguïtés sémantiques",
                "Elle ralentit la vitesse de la carte réseau",
                "Elle désactive automatiquement le terminal",
                "Elle empêche le LLM de parler français"
              ],
              correctIndex: 0,
              explanation: "Des règles répétées de façon désordonnée diluent l'attention du modèle et augmentent le risque d'oublier de mettre à jour une des variantes lors d'un changement."
            },
            {
              id: 2,
              question: "Qu'est-ce qui distingue un rappel stratégique d'une répétition stérile ?",
              options: [
                "Le rappel stratégique est écrit en lettres capitales",
                "Le rappel stratégique réarticule la règle au moment précis d'une procédure sensible pour guider l'action immédiate",
                "Le rappel stratégique est généré par un autre sous-agent",
                "Le rappel stratégique contient des émoticônes"
              ],
              correctIndex: 1,
              explanation: "Un rappel stratégique précise l'application d'une règle générale au sein d'une procédure concrète (ex: vérifier l'autorisation juste avant d'appeler l'outil d'écriture)."
            }
          ]}
        />
      </section>
    </div>
  );
};

